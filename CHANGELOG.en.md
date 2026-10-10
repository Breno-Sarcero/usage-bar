[Português](CHANGELOG.md) | **English**

# Changelog

## 0.6.4

- **MIT license:** `LICENSE` file, `license` field in `plugin.json`, and a README section.

## 0.6.3

- **Animated demo in the README:** a GIF of the bar rising during a session, the context warning at 45%, and the hide-warning and on/off commands, in `docs/demo-pt.gif` and `docs/demo-en.gif`.

## 0.6.2

- **One-command install:** the repository is now a marketplace (`.claude-plugin/marketplace.json`). Install with `/plugin install usage-bar --marketplace Breno-Sarcero/usage-bar`.
- README with the new install and, as an alternative, install from the release zip.

## 0.6.1

- Removed the local marketplace. The mod loads from its folder; the language setting goes in `pluginConfigs` as `usage-bar@inline`.
- Install docs no longer mention a marketplace.

## 0.6.0

- **Command renamed:** `/usage` clashed with Claude Code's built-in `/usage`, and that stopped the whole mod at startup. It is now `/barra-uso` in Portuguese and `/usage-bar` in English.

## 0.5.0

- **New name:** the mod is now called `usage-bar` (was `uso-status`).
- **One command to turn it on and off:** `/usage` toggles the bar. The commands `/liga-uso` and `/desliga-uso` no longer exist.
- **Hide-warning command:** `/ocultar-aviso` in Portuguese, `/hide-warning` in English.
- **Language at install:** option `language` (`pt` or `en`), default `pt`. It affects the bar, the warnings, the toasts and the command names.
- Reset time in English: `now`, `resets in`.
- Documentation in Portuguese and English.

## 0.4.2

- Context warning and usage bar stack below whatever is already above the prompt, instead of replacing it (compatible with the sql-guard panel).

## 0.4.1

- Plugin description and install instructions fixed.

## 0.4.0

- Context warning from 45%, in a yellow band above the prompt, hidden with `/ocultar-aviso`.
- Full warning text from 76 columns; on narrower terminals, a short version.
- Toast every 10 points above 45%, for 10 seconds, with short text.
- Reset under 10 minutes shows minute by minute.
- Discreet separator (`·`) between context, 5h and weekly.
- Commands `/liga-uso` and `/desliga-uso` replace `/barra`.

## 0.3.0

- Layouts by terminal width: full (92 columns or more), no tokens (76), no reset time (50), and short labels below that.
- Author in `plugin.json`.

## 0.2.0

- From side panel to a band above the prompt, showing percentages only.
- Each limit shows the time to reset: under 1h it moves every 10 min, then hours, and weekly in days and hours.
- Redraws every minute so the reset time keeps moving.
- Colors: green up to 60%, yellow above 60%, red above 80%.
- Settings gathered in `hooks/config.ts`.

## 0.1.0

- First version: status line with context (tokens and %), 5-hour and weekly windows.
- 10-block bars (█░) instead of bare numbers.
- `/barra` turns it on and off, and the choice is stored in `$.store`.
