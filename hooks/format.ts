import { CONFIG } from './config'

export const formatTokens = (n: number): string =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1000 ? `${Math.round(n / 1000)}k` : String(n)

export const levelColor = (percent: number): string =>
  percent > CONFIG.colors.dangerAbove
    ? CONFIG.colors.danger
    : percent > CONFIG.colors.warnAbove
      ? CONFIG.colors.warn
      : CONFIG.colors.ok

// Até 1h: minutos em degraus (50min, 40min...). Acima: horas; a partir de 24h: dias e horas.
export const formatReset = (ms: number, now = 'agora'): string => {
  if (ms <= 0) return now

  const step = CONFIG.resetStepMinutes
  const minutes = Math.ceil(ms / 60_000)
  if (minutes < step) return `${minutes}min`
  if (minutes <= 60) return `${Math.ceil(minutes / step) * step}min`

  const hours = Math.ceil(minutes / 60)
  if (hours < 24) return `${hours}h`

  const days = Math.floor(hours / 24)
  const rest = hours % 24
  return rest === 0 ? `${days}d` : `${days}d ${rest}h`
}

export type Detail = 'full' | 'noTokens' | 'noResets' | 'minimal'

// Quanto do cartão cabe na largura do terminal.
export const detailFor = (columns: number): Detail =>
  columns >= CONFIG.widths.full
    ? 'full'
    : columns >= CONFIG.widths.noTokens
      ? 'noTokens'
      : columns >= CONFIG.widths.noResets
        ? 'noResets'
        : 'minimal'
