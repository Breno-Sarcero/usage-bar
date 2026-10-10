import type { On } from 'claude-code'
import type { Engine } from 'claude-code/testing'
import { describe, expect, mock, test } from 'claude-code/testing'

// Contexto em `percent`; os limites de 5h e semanal ficam de fora, só o aviso de contexto está em jogo.
const measure = (percent: number) => ({
  context: { tokens: Math.round(percent * 10_000), window: 1_000_000, percent },
  rateLimits: [],
  changed: ['context' as const],
})

// O que fica por baixo do plugin: memória para store e relógio, a medição respondida pelo próprio teste,
// e uma faixa vazia, porque a barra agora empilha abaixo do que já estiver acima do prompt.
const world = (on: On) => {
  mock.store(on)
  mock.clock(on)
  on('session.measure', (_$, e) => ({ changed: e.changed }))
  on('ui.render', { component: 'AbovePrompt' }, ($, e) => {
    const { Box } = $.ui.resolve(e)
    return <Box />
  })
}

const toasts = (on: On) => {
  const seen: string[] = []
  on('ui.toast', ($, e, next) => {
    seen.push(e.text)
    return next(e)
  })
  return seen
}

const mountCard = ($: Engine) =>
  $.ui.mount({ plugin: 'usage-bar', surface: 'terminal', component: 'AbovePrompt', props: { hasSurvey: false, isWorking: false, maxRows: 40, bodyColumns: 120, scroll: { offset: 0, bodyRows: 40 }, view: {} } })

describe('aviso de contexto', () => {
  test('abaixo de 45%: sem faixa e sem toast', async ($, on) => {
    world(on)
    const seen = toasts(on)

    await $.session.measure(measure(30))
    const ui = await mountCard($)

    expect(await ui.find({ type: 'Text', text: /ocultar-aviso/ })).toBeUndefined()
    expect(seen).toEqual([])
    await ui.unmount()
  })

  test('em 50%: faixa com o comando e um toast', async ($, on) => {
    world(on)
    const seen = toasts(on)

    await $.session.measure(measure(50))
    const ui = await mountCard($)

    expect(await ui.find({ type: 'Text', text: /Contexto em 50%/ })).toBeDefined()
    expect(await ui.find({ type: 'Text', text: /\/ocultar-aviso/ })).toBeDefined()
    expect(seen.length).toBe(1)
    await ui.unmount()
  })

  test('toast só a cada 10 pontos acima de 45%', async ($, on) => {
    world(on)
    const seen = toasts(on)

    await $.session.measure(measure(46))
    await $.session.measure(measure(53))
    expect(seen.length).toBe(1)
    await $.session.measure(measure(56))
    expect(seen.length).toBe(2)
    await $.session.measure(measure(58))
    expect(seen.length).toBe(2)
  })

  test('/ocultar-aviso tira a faixa; ela volta só depois de cair abaixo de 45%', async ($, on) => {
    world(on)
    toasts(on)

    await $.session.measure(measure(50))
    await $.command.run({ command: 'ocultar-aviso', args: '', origin: { kind: 'plugin', name: 'usage-bar' }, presentation: { isFullscreen: false, columns: 80 } })
    let ui = await mountCard($)
    expect(await ui.find({ type: 'Text', text: /ocultar-aviso/ })).toBeUndefined()
    await ui.unmount()

    await $.session.measure(measure(20))
    await $.session.measure(measure(50))
    ui = await mountCard($)
    expect(await ui.find({ type: 'Text', text: /ocultar-aviso/ })).toBeDefined()
    await ui.unmount()
  })
})
