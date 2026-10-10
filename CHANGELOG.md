**Português** | [English](CHANGELOG.en.md)

# Changelog

## 0.6.5

- README: exemplo de caminho no macOS e no Linux para a instalação pelo zip.

## 0.6.4

- **Licença MIT:** arquivo `LICENSE`, campo `license` no `plugin.json` e seção no README.

## 0.6.3

- **Demo animada no README:** GIF da barra subindo durante uma sessão, do aviso de contexto aos 45% e dos comandos de ocultar aviso e de ligar e desligar, em `docs/demo-pt.gif` e `docs/demo-en.gif`.

## 0.6.2

- **Instalação em um comando:** o repositório agora é um marketplace (`.claude-plugin/marketplace.json`). Instale com `/plugin install usage-bar --marketplace Breno-Sarcero/usage-bar`.
- README com a instalação nova e, como alternativa, a instalação pelo zip da release.

## 0.6.1

- Removido o marketplace local. O mod é carregado pela pasta; a configuração de idioma vai em `pluginConfigs` como `usage-bar@inline`.
- Docs de instalação sem referência a marketplace.

## 0.6.0

- **Comando renomeado:** `/usage` colidia com o `/usage` nativo do Claude Code, e isso fazia o mod inteiro parar na inicialização. Agora é `/barra-uso` em português e `/usage-bar` em inglês.

## 0.5.0

- **Nome novo:** o mod passa a se chamar `usage-bar` (antes `uso-status`).
- **Um comando para ligar e desligar:** `/usage` alterna a barra. Os comandos `/liga-uso` e `/desliga-uso` deixam de existir.
- **Comando de ocultar aviso:** `/ocultar-aviso` em português, `/hide-warning` em inglês.
- **Idioma na instalação:** opção `language` (`pt` ou `en`), com padrão `pt`. Afeta a barra, os avisos, os toasts e os nomes dos comandos.
- Tempo de reset em inglês: `now`, `resets in`.
- Documentação em português e inglês.

## 0.4.2

- Aviso de contexto e faixa de uso empilham abaixo do que já estiver acima do prompt, em vez de substituir (compatível com o painel do sql-guard).

## 0.4.1

- Descrição do plugin e instruções de instalação corrigidas.

## 0.4.0

- Aviso de contexto a partir de 45%, em faixa amarela acima do prompt, que some com `/ocultar-aviso`.
- Aviso com texto completo a partir de 76 colunas; em terminais mais estreitos, versão curta.
- Toast a cada 10 pontos acima de 45%, por 10 segundos, com texto curto.
- Reset abaixo de 10 minutos mostra minuto a minuto.
- Separador discreto (`·`) entre contexto, 5h e semana.
- Comandos `/liga-uso` e `/desliga-uso` substituem `/barra`.

## 0.3.0

- Níveis por largura do terminal: completo (92 colunas ou mais), sem tokens (76), sem tempo de reset (50), e rótulos curtos abaixo disso.
- Autor no `plugin.json`.

## 0.2.0

- De painel lateral para faixa acima do prompt, só com porcentagens.
- Cada limite mostra o tempo para reset: abaixo de 1h anda de 10 em 10 min, depois horas, e na semana dias e horas.
- Redesenho a cada minuto para o tempo de reset andar sozinho.
- Cores: verde até 60%, amarelo acima de 60%, vermelho acima de 80%.
- Configurações reunidas em `hooks/config.ts`.

## 0.1.0

- Primeira versão: linha de status com contexto (tokens e %), janela de 5h e semana.
- Barras de 10 blocos (█░) no lugar do número puro.
- `/barra` liga e desliga, e a escolha fica gravada em `$.store`.
