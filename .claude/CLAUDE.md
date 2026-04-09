# Spartacus
Spartacus is an Angular meta-framework for building e-commerce storefronts with SAP Commerce Cloud `OCC` backend.

## Tech Stack
- **Angular** 21.2 | **TypeScript** 5.9 | **NX** 22.3.1
- **Unit tests**: Karma + Jasmine (Angular libs), Jest (schematics)
- **E2E tests**: Cypress (browser), Node (SSR)
- Monorepo: `npm workspaces` + `Nx`

## Directory Quick Reference

### Libraries
- `feature-libs/` - Optional features for standard SAP Commerce backend (cart, checkout, order, etc.)
- `integration-libs/` - Features requiring special backend addons (cdc, cds, digital-payments, opf)
- `projects/core/` - Core non-UI lib
- `projects/storefrontlib/` - Core UI lib and CMS engine and some components
- `projects/storefrontstyles/` - Core styles lib and some components' styles
- `core-libs/setup/` - Core setup utilities lib
- `core-libs/setup/ssr` - Core SSR lib

### Demo App
- `projects/storefrontapp/`

### E2E Tests
- `projects/storefrontapp-e2e-cypress/` - E2E Browser tests (Cypress)
- `projects/ssr-tests/` - E2E SSR tests (Node)

## Feature Library Structure (canonical)
Every feature lib follows this layered layout:
```
feature-libs/<name>/base/
  ├── root/        # root module, feature flags, config, facades
  ├── core/        # services, NgRx store, connectors
  ├── components/  # presentational components
  ├── occ/         # OCC connector implementations
  └── public_api.ts
```

### NgRx Store Layout
```
store/
  ├── actions/
  ├── effects/
  ├── reducers/
  └── selectors/
```

## Naming Conventions
| Artifact | Pattern |
|---|---|
| Facade | `*-facade.service.ts` |
| Root module | `*-root.module.ts` |
| Feature token file | `feature-name.ts` exporting `FEATURE_NAME_FEATURE` constant |
| Spec files | Adjacent to source: `*.spec.ts` |
| All new files | Require Apache-2.0 SPDX header |

## Key Patterns
- Use `provideDefaultConfig()` for DI/config (not `forRoot()`)
- Lazy-loadable features use `featureModules` config in root module
- Public API surface controlled via `public_api.ts` barrel exports

## Build Commands
```bash
npm run build:libs           # all libraries
npm run build:<feature>      # e.g. build:cart, build:checkout
npm run build:ssr            # SSR build
npm run lint                 # lint all
npm run prettier:fix         # format all
```

## Test Commands
### All library tests
See `ci-scripts/unit-tests.sh`

### Specific tests
```bash
nx run <library-name>:test                              # single library (e.g. nx run storefrontlib:test)
nx run <library-name>:test --include="**/<spec-file>"  # specific spec file
# Useful flags: --no-watch --source-map --code-coverage --browsers ChromeHeadless
```

### SSR tests
```bash
npm run test:ssr
```

### Coverage thresholds
90% statements/lines/functions, 75% branches

## Contribution Notes
- PRs use **squash-and-merge**; commit messages follow project conventions
- DCO sign-off required; corporate contributors need CLA