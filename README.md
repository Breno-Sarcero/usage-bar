**Português** | [English](README.en.md)

# usage-bar

Linha discreta acima do prompt do Claude Code com o uso da conversa (contexto) e das janelas de 5 horas e semanal, em porcentagem e com o tempo até o reset.

Os textos, porcentagens, horas, cores e larguras estão em um único arquivo (`hooks/config.ts`), para quem quiser personalizar.

## Instalação

No Claude Code, instale o mod e escolha o idioma quando o Claude Code pedir (`pt` ou `en`, padrão `pt`).

Não é preciso instalar nada além do Claude Code: o mod roda direto.

## Comandos

- `/barra-uso`: liga e desliga a barra. Só exibe ou não. Em inglês, o comando é `/usage-bar`. O nome `/usage` não é usado porque o Claude Code já tem o seu.
- `/ocultar-aviso`: esconde o aviso de contexto até o contexto voltar abaixo do limite. Em inglês, o comando é `/hide-warning`.

## Aviso de contexto

A partir de 45% de contexto, uma faixa amarela aparece abaixo da barra, sugerindo commitar, salvar na memória e rodar `/clear`. A cada 10 pontos acima de 45%, um aviso curto aparece por 10 segundos.

Para esconder a faixa, use o comando de ocultar aviso. Ela volta sozinha quando o contexto cai abaixo de 45%.

## Idioma

O idioma é escolhido na instalação (`pt` ou `en`). Ele afeta os textos da barra e dos avisos, e os nomes dos comandos de barra e de ocultar aviso.
