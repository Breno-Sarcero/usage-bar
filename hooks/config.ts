// Tudo que se ajusta no mod fica aqui. Editar este arquivo e rodar /reload-plugins basta.

export const CONFIG = {
  // Cores das porcentagens: até `warnAbove` usa `ok`; acima, `warn`; acima de `dangerAbove`, `danger`.
  colors: { warnAbove: 60, dangerAbove: 80, ok: 'green', warn: 'yellow', danger: 'red' },

  // O que aparece no cartão.
  show: { tokens: true, resets: true, week: true },

  // Tempo de reset: abaixo de 1h anda de `resetStepMinutes` em `resetStepMinutes`; abaixo disso, minuto a minuto.
  resetStepMinutes: 10,

  // Aviso de contexto: a faixa aparece a partir de `contextWarnAt` %; cada `contextToastEvery` pontos acima dele, um toast.
  contextWarnAt: 45,
  contextToastEvery: 10,
  // Quanto tempo o toast fica na tela, em ms; um clique nele também tira.
  toastMs: 10_000,
  // Texto completo da faixa a partir desta largura (colunas); abaixo, a versão curta.
  warningFullFrom: 76,

  // Largura do terminal (em colunas) a partir da qual cada nível aparece; abaixo, o cartão encurta.
  // completo >= full; sem tokens >= noTokens; sem tempo de reset >= noResets; abaixo disso, rótulos curtos.
  widths: { full: 92, noTokens: 76, noResets: 50 },

  // De quanto em quanto tempo o cartão se redesenha, em ms.
  refreshMs: 60_000,
} as const

// Textos nos dois idiomas. A escolha vem da configuração `language` na instalação (padrão: pt).
// `{p}` é a porcentagem de contexto; `{hide}` é o nome do comando que esconde o aviso.
export const TEXT = {
  pt: {
    labels: { context: 'Contexto', fiveHour: '5h', week: 'Semana', resetsIn: 'reseta em', now: 'agora' },
    shortLabels: { context: 'ctx', fiveHour: '5h', week: 'sem' },
    warning:
      '⚠ Contexto em {p}%: o desempenho pode cair. Recomendo terminar a tarefa, commitar, salvar na memória e rodar /clear. Para esconder este aviso, digite /{hide}.',
    warningShort: '⚠ Contexto {p}%: commitar, salvar na memória, /clear · /{hide}',
    toastWarning: '⚠ Contexto em {p}%: commitar, salvar na memória e rodar /clear.',
    on: 'Barra de uso ligada.',
    off: 'Barra de uso desligada.',
    hidden: 'Aviso de contexto escondido.',
    toggleName: 'barra-uso',
    toggleDescription: 'Liga ou desliga a barra de uso (contexto, 5h e semana)',
    hideName: 'ocultar-aviso',
    hideDescription: 'Esconde o aviso de contexto até o contexto voltar abaixo do limite',
  },
  en: {
    labels: { context: 'Context', fiveHour: '5h', week: 'Week', resetsIn: 'resets in', now: 'now' },
    shortLabels: { context: 'ctx', fiveHour: '5h', week: 'wk' },
    warning:
      '⚠ Context at {p}%: performance may drop. I recommend finishing the task, committing, saving to memory and running /clear. To hide this warning, type /{hide}.',
    warningShort: '⚠ Context {p}%: commit, save to memory, /clear · /{hide}',
    toastWarning: '⚠ Context at {p}%: commit, save to memory and run /clear.',
    on: 'Usage bar on.',
    off: 'Usage bar off.',
    hidden: 'Context warning hidden.',
    toggleName: 'usage-bar',
    toggleDescription: 'Turn the usage bar on or off (context, 5h and weekly)',
    hideName: 'hide-warning',
    hideDescription: 'Hide the context warning until the context drops below the limit',
  },
} as const
