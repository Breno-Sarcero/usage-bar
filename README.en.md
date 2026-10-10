[Português](README.md) | **English**

# usage-bar

A discreet line above the Claude Code prompt with the conversation's usage (context) and the 5-hour and weekly windows, as a percentage and with the time until reset.

Texts, percentages, hours, colors and widths are all in one file (`hooks/config.ts`), so you can customize it.

## Installation

In Claude Code, install the mod and choose the language when Claude Code asks (`pt` or `en`, default `pt`).

Nothing else is needed beyond Claude Code: the mod runs directly.

## Commands

- `/usage-bar`: turns the bar on and off. It only controls display. In Portuguese, the command is `/barra-uso`. The name `/usage` is not used because Claude Code already has its own.
- `/hide-warning`: hides the context warning until the context drops below the limit. In Portuguese, the command is `/ocultar-aviso`.

## Context warning

From 45% context, a yellow band appears below the bar, suggesting you commit, save to memory and run `/clear`. Every 10 points above 45%, a short warning appears for 10 seconds.

To hide the band, use the hide-warning command. It comes back by itself when the context drops below 45%.

## Language

The language is chosen at install (`pt` or `en`). It affects the bar and warning texts, and the names of the toggle and hide-warning commands.
