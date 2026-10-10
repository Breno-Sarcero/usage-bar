export type Limit = { percent: number; resetsAt?: string }

export type Usage = {
  ctxTokens?: number
  ctxWindow: number
  ctxPercent?: number
  fiveHour?: Limit
  sevenDay?: Limit
}

declare module 'claude-code' {
  interface PluginState {
    'usage-bar': { usage: Usage | null; tick: number; dismissed: boolean; lastStep: number }
  }
}
