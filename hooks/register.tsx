import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import type { Limit, Usage } from '../types'
import { CONFIG, TEXT } from './config'
import { detailFor, formatReset, formatTokens, levelColor } from './format'

const usage = atom({ plugin: 'usage-bar', key: 'usage' } as const, null)
const tick = atom({ plugin: 'usage-bar', key: 'tick' } as const, 0)
// Aviso de contexto: escondido pela pessoa até o contexto voltar abaixo do limite; último degrau que já gerou toast.
const dismissed = atom({ plugin: 'usage-bar', key: 'dismissed' } as const, false)
const lastStep = atom({ plugin: 'usage-bar', key: 'lastStep' } as const, -1)

const toLimit = (l: { percentUsed: number; resetsAt?: string } | undefined): Limit | undefined =>
  l === undefined ? undefined : { percent: l.percentUsed, resetsAt: l.resetsAt }

const isEnabled = async ($: { store: { get: (key: string) => Promise<unknown> } }): Promise<boolean> =>
  (await $.store.get('enabled')) !== false

export const register: Register = (on, options) => {
  // Idioma da instalação: 'pt' (padrão) ou 'en'.
  const t = options.language === 'en' ? TEXT.en : TEXT.pt
  const hide = t.hideName
  const toggle = t.toggleName

  on('session.start', async ($, e, next) => {
    await $.command.register({ name: toggle, description: t.toggleDescription })
    await $.command.register({ name: hide, description: t.hideDescription })
    // Redesenha uma vez por minuto para o tempo de reset andar sozinho.
    $.clock.every(CONFIG.refreshMs, async () => {
      await update($, tick, n => n + 1)
    })

    return next(e)
  })

  // Um comando só: liga se estiver desligada, desliga se estiver ligada.
  on('command.run', { command: toggle }, async $ => {
    const next = !(await isEnabled($))
    await $.store.set('enabled', next)
    await update($, tick, n => n + 1)
    return { text: next ? t.on : t.off }
  })

  on('command.run', { command: hide }, async $ => {
    await update($, dismissed, () => true)
    return { text: t.hidden }
  })

  on('session.measure', async ($, e, next) => {
    const measured: Usage = {
      ctxTokens: e.context.tokens,
      ctxWindow: e.context.window,
      ctxPercent: e.context.percent,
      fiveHour: toLimit(e.rateLimits.find(l => l.kind === 'five_hour')),
      sevenDay: toLimit(e.rateLimits.find(l => l.kind === 'seven_day')),
    }
    await update($, usage, () => measured)

    // Abaixo do limite, o aviso reinicia. Acima, um toast a cada degrau de `contextToastEvery` pontos.
    const pct = e.context.percent ?? 0
    if (pct < CONFIG.contextWarnAt) {
      await update($, lastStep, () => -1)
      await update($, dismissed, () => false)
    } else {
      const step = Math.floor((pct - CONFIG.contextWarnAt) / CONFIG.contextToastEvery)
      if (step > (await read($, lastStep))) {
        await update($, lastStep, () => step)
        if (await isEnabled($))
          $.ui.toast(t.toastWarning.replace('{p}', String(Math.round(pct))), { timeoutMs: CONFIG.toastMs })
      }
    }

    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    await read($, tick)
    const u = await read($, usage)
    if (e.props.hasSurvey || u === null || !(await isEnabled($))) return next(e)

    // Empilha abaixo do que já estiver acima do prompt (ex.: o painel do sql-guard), sem substituir.
    const beneath = await next(e)
    const { Box, Text } = $.ui.resolve(e)
    const now = await $.clock.now()

    const detail = detailFor(e.viewport?.columns ?? Infinity)
    const labels = detail === 'minimal' ? { ...t.labels, ...t.shortLabels } : t.labels
    const show = {
      tokens: CONFIG.show.tokens && detail === 'full',
      resets: CONFIG.show.resets && (detail === 'full' || detail === 'noTokens'),
      week: CONFIG.show.week,
    }
    const label = (text: string) => <Text dimColor>{text}</Text>
    const percent = (value: number) => (
      <Text color={levelColor(value)} bold>
        {value}%
      </Text>
    )
    const reset = (limit: Limit) =>
      !show.resets || limit.resetsAt === undefined
        ? ''
        : ` · ${labels.resetsIn} ${formatReset(Date.parse(limit.resetsAt) - now, labels.now)}`
    const tokens =
      !show.tokens || u.ctxTokens === undefined ? '' : ` (${formatTokens(u.ctxTokens)}/${formatTokens(u.ctxWindow)})`

    // Uma linha só, sem Box nem fragmento: Text com Text dentro corre na horizontal.
    const parts: ReturnType<typeof label>[] = [
      label(`${labels.context} `),
      percent(u.ctxPercent ?? 0),
      label(tokens),
    ]
    if (u.fiveHour !== undefined)
      parts.push(label(`  · ${labels.fiveHour} `), percent(u.fiveHour.percent), label(reset(u.fiveHour)))
    if (show.week && u.sevenDay !== undefined)
      parts.push(label(`  · ${labels.week} `), percent(u.sevenDay.percent), label(reset(u.sevenDay)))

    const card = <Text>{parts}</Text>
    const warn = (u.ctxPercent ?? 0) >= CONFIG.contextWarnAt && !(await read($, dismissed))
    if (!warn)
      return (
        <Box flexDirection="column">
          {card}
          {beneath}
        </Box>
      )

    // Faixa abaixo do cartão, em amarelo; some quando a pessoa roda o comando de ocultar aviso.
    const template = (e.viewport?.columns ?? Infinity) >= CONFIG.warningFullFrom ? t.warning : t.warningShort
    return (
      <Box flexDirection="column">
        {card}
        <Text color={CONFIG.colors.warn} bold>
          {template.replace('{p}', String(Math.round(u.ctxPercent ?? 0))).replace('{hide}', hide)}
        </Text>
        {beneath}
      </Box>
    )
  })
}
