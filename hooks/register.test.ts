import { expect, test } from 'claude-code/testing'
import { detailFor, formatReset, formatTokens, levelColor } from './format'

const min = (n: number) => n * 60_000

test('formata tokens', () => {
  expect(formatTokens(850)).toBe('850')
  expect(formatTokens(42_300)).toBe('42k')
  expect(formatTokens(1_500_000)).toBe('1.5M')
})

test('cor: ate 60 verde, acima de 60 amarelo, acima de 80 vermelho', () => {
  expect(levelColor(5)).toBe('green')
  expect(levelColor(60)).toBe('green')
  expect(levelColor(61)).toBe('yellow')
  expect(levelColor(80)).toBe('yellow')
  expect(levelColor(81)).toBe('red')
})

test('reset abaixo de 1h anda de 10 em 10 minutos, e de minuto em minuto abaixo de 10', () => {
  expect(formatReset(min(50))).toBe('50min')
  expect(formatReset(min(41))).toBe('50min')
  expect(formatReset(min(40))).toBe('40min')
  expect(formatReset(min(19))).toBe('20min')
  expect(formatReset(min(10))).toBe('10min')
  expect(formatReset(min(9))).toBe('9min')
  expect(formatReset(min(3))).toBe('3min')
  expect(formatReset(min(60))).toBe('60min')
})

test('reset acima de 1h em horas, e dias na semanal', () => {
  expect(formatReset(min(61))).toBe('2h')
  expect(formatReset(min(150))).toBe('3h')
  expect(formatReset(min(60 * 24 * 3 + 60 * 5))).toBe('3d 5h')
  expect(formatReset(0)).toBe('agora')
})

test('cartão encurta conforme a largura', () => {
  expect(detailFor(200)).toBe('full')
  expect(detailFor(92)).toBe('full')
  expect(detailFor(80)).toBe('noTokens')
  expect(detailFor(60)).toBe('noResets')
  expect(detailFor(30)).toBe('minimal')
})
