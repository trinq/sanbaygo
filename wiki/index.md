# Wiki Index

The wiki is auto-curated knowledge derived from raw sources in this repo.
Last updated entries appear first; the lint script (`npm run wiki:lint`)
flags pages whose sources have drifted since `last_verified`.

## Pages

| Page | Summary |
|------|---------|
| [project-overview](./pages/project-overview.md) | What SanBayGo is, the problem it solves, and what is/isn't in MVP. |
| [architecture](./pages/architecture.md) | Monorepo layout (`core/`, `web/`, `api/`) and how data flows from form input to result. |
| [domain-model](./pages/domain-model.md) | Canonical vocabulary: Actual Arrival, Catchable Trip, Route Coverage, Bus Departure Countdown, etc. |
| [data-sources](./pages/data-sources.md) | Static data files (`core/data/*`) — airports, bus schedules, exit times, destinations. |
| [sessions-history](./pages/sessions-history.md) | High-level chronology of agent sessions; raw detail lives in `wiki/log.md`. |
| [decisions](./pages/decisions.md) | Index of ADRs and other project decisions, with links to the raw decision records. |
| [conventions](./pages/conventions.md) | Coding, naming, UI-language (Vietnamese), commit, and PR conventions. |
| [tooling](./pages/tooling.md) | Build/test/lint commands, deployment scripts, and CI. |
| [seo-content-strategy](./pages/seo-content-strategy.md) | SEO keyword targets and content language split — frylane.com (EN intl primary) vs sanbaygo.app (VN secondary). |

## Logs

- [log.md](./log.md) — one-line entries per session (source: which files changed).

## Diagram

The `./wiki-diagram.svg` at the repo root visualises the relationships
between sources, wiki pages, and the diagram itself. Regenerate with
`npm run wiki:render`.