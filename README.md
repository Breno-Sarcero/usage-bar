**Português** | [English](README.en.md)

# usage-bar

Linha discreta acima do prompt do Claude Code com o uso da conversa (contexto) e das janelas de 5 horas e semanal, em porcentagem e com o tempo até o reset.

Os textos, porcentagens, horas, cores e larguras estão em um único arquivo (`hooks/config.ts`), para quem quiser personalizar.

## Instalação

No terminal do Claude Code, digite:

```
/plugin install usage-bar --marketplace Breno-Sarcero/usage-bar
```

Responda `y` para adicionar o marketplace, escolha o escopo (o de usuário vale para todas as sessões) e o idioma (`pt` ou `en`, padrão `pt`).

Não é preciso instalar nada além do Claude Code: o mod roda direto.

### Alternativa: pelo zip da release

Baixe o zip em [Releases](https://github.com/Breno-Sarcero/usage-bar/releases), extraia e aponte a variável `CLAUDE_CODE_PLUGIN_DIRS` do seu `settings.json` para a pasta extraída. O idioma fica em `pluginConfigs`, na chave `usage-bar@inline`:

```json
{
  "env": { "CLAUDE_CODE_PLUGIN_DIRS": "C:\\caminho\\para\\usage-bar" },
  "pluginConfigs": { "usage-bar@inline": { "options": { "language": "pt" } } }
}
```

## Comandos

- `/barra-uso`: liga e desliga a barra. Só exibe ou não. Em inglês, o comando é `/usage-bar`. O nome `/usage` não é usado porque o Claude Code já tem o seu.
- `/ocultar-aviso`: esconde o aviso de contexto até o contexto voltar abaixo do limite. Em inglês, o comando é `/hide-warning`.

## Aviso de contexto

A partir de 45% de contexto, uma faixa amarela aparece abaixo da barra, sugerindo commitar, salvar na memória e rodar `/clear`. A cada 10 pontos acima de 45%, um aviso curto aparece por 10 segundos.

Para esconder a faixa, use o comando de ocultar aviso. Ela volta sozinha quando o contexto cai abaixo de 45%.

## Idioma

O idioma é escolhido na instalação (`pt` ou `en`). Ele afeta os textos da barra e dos avisos, e os nomes dos comandos de barra e de ocultar aviso.
