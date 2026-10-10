[Português](README.md) | **English**

# usage-bar

A discreet line above the Claude Code prompt with the conversation's usage (context) and the 5-hour and weekly windows, as a percentage and with the time until reset.

![usage-bar: the bar above the prompt tracks context, 5-hour and weekly usage; at 45% context a warning appears; /hide-warning hides it and /usage-bar turns the bar on and off](docs/demo-en.gif)

Texts, percentages, hours, colors and widths are all in one file (`hooks/config.ts`), so you can customize it.

## Installation

In a Claude Code terminal session, type:

```
/plugin install usage-bar --marketplace Breno-Sarcero/usage-bar
```

Answer `y` to add the marketplace, pick a scope (user scope applies to every session) and the language (`pt` or `en`, default `pt`).

Nothing else is needed beyond Claude Code: the mod runs directly.

### Alternative: from the release zip

Download the zip from [Releases](https://github.com/Breno-Sarcero/usage-bar/releases), extract it, and point the `CLAUDE_CODE_PLUGIN_DIRS` variable in your `settings.json` to the extracted folder. The language goes in `pluginConfigs`, under the `usage-bar@inline` key:

```json
{
  "env": { "CLAUDE_CODE_PLUGIN_DIRS": "C:\\path\\to\\usage-bar" },
  "pluginConfigs": { "usage-bar@inline": { "options": { "language": "en" } } }
}
```

## Commands

- `/usage-bar`: turns the bar on and off. It only controls display. In Portuguese, the command is `/barra-uso`. The name `/usage` is not used because Claude Code already has its own.
- `/hide-warning`: hides the context warning until the context drops below the limit. In Portuguese, the command is `/ocultar-aviso`.

## Context warning

From 45% context, a yellow band appears below the bar, suggesting you commit, save to memory and run `/clear`. Every 10 points above 45%, a short warning appears for 10 seconds.

To hide the band, use the hide-warning command. It comes back by itself when the context drops below 45%.

## Language

The language is chosen at install (`pt` or `en`). It affects the bar and warning texts, and the names of the toggle and hide-warning commands.

## License

MIT. See [LICENSE](LICENSE).
