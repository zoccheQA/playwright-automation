# Playwright Automation

End-to-end test automation project built with **Playwright** and **TypeScript**, using the [Toolshop](https://practicesoftwaretesting.com/) demo application (Practice Software Testing) as the system under test.

The goal of this project is to grow from a clean, maintainable E2E foundation into a broader quality suite covering **API testing** and **testing of AI-powered features**, while exploring how AI agents can support test planning, generation and maintenance.

> 🚧 Work in progress — the project is evolving step by step.

---

## Tech stack

| Area | Tooling |
|---|---|
| Test runner | [Playwright Test](https://playwright.dev/) |
| Language | TypeScript |
| Design pattern | Page Object Model + custom fixtures |
| Test data | Factory functions with unique, synthetic data |
| AI-assisted QA | Playwright MCP + Playwright test agents (planner, generator, healer) with GitHub Copilot |
| CI | GitHub Actions |

## Project structure

```
playwright-automation/
├── .github/
│   ├── agents/            # Playwright test agents (planner, generator, healer)
│   └── workflows/         # CI pipeline
├── fixtures/
│   └── test.ts            # Custom `test` exposing ready-to-use Page Objects
├── pages/                 # Page Object Model
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── RegisterPage.ts
│   └── AccountPage.ts
├── specs/                 # Test plans (Markdown)
│   └── toolshop-test-plan.md
├── test-data/
│   └── users.ts           # Test data factories
├── tests/
│   ├── e2e/               # UI end-to-end tests
│   │   └── auth/
│   ├── api/               # API tests (planned)
│   ├── ai/                # AI feature tests (planned)
│   └── seed.spec.ts       # Seed file used by the Playwright agents
├── playwright.config.ts
└── tsconfig.json
```

## Getting started

### Prerequisites

- Node.js (LTS)
- npm

### Installation

```bash
npm ci
npx playwright install --with-deps
```

### Running the tests

| Command | Description |
|---|---|
| `npm test` | Run the full suite on Chromium, Firefox and WebKit |
| `npm run test:chromium` | Run on Chromium only |
| `npm run test:ui` | Open Playwright UI mode |
| `npm run test:headed` | Run with a visible browser |
| `npm run test:debug` | Run in debug mode |
| `npm run test:report` | Open the last HTML report |
| `npm run typecheck` | Type-check the project with `tsc` |

The base URL defaults to `https://practicesoftwaretesting.com/` and can be overridden:

```bash
BASE_URL=https://your-environment.example npm test
```

## Test coverage

| Area | Scenario | Status |
|---|---|---|
| Authentication | Reject login with unregistered credentials | ✅ |
| Registration | Create an account with valid data and log in | ✅ |
| Catalog, cart, checkout, contact | Defined in [`specs/toolshop-test-plan.md`](specs/toolshop-test-plan.md) | 🗓️ Planned |

## Design decisions

- **Page Object Model with a lean base class** — `BasePage` only handles navigation and URL assertions. Interactions live in each page's locators, so tests benefit from Playwright's auto-waiting instead of manual waits.
- **Custom fixtures** — specs receive Page Objects directly (`async ({ loginPage }) => ...`), which keeps tests short and makes it easy to add new pages, API clients or AI clients later.
- **Stable locators** — `testIdAttribute` is set to `data-test`, so elements are located with `getByTestId()`, complemented by role-based locators for user-facing assertions.
- **Independent, repeatable tests** — each run generates unique synthetic users (`randomUUID`), avoiding collisions and shared state between tests.
- **Test plan before code** — scenarios are documented in `specs/` before being automated.
- **Debuggability** — traces and screenshots are kept on failure.

## AI-assisted testing

This project uses the **Playwright MCP server** and the **Playwright test agents** inside VS Code with GitHub Copilot:

- **Planner** — explores the application and writes test plans into `specs/`.
- **Generator** — turns test plans into Playwright tests, starting from `tests/seed.spec.ts`.
- **Healer** — investigates failing tests and proposes fixes.

All generated code is reviewed and refactored to follow the project's conventions (Page Objects, fixtures and test data factories).

## Roadmap

- [x] E2E foundation: Page Objects, fixtures, test data factories
- [x] Authentication and registration scenarios
- [ ] Catalog, cart and checkout scenarios from the test plan
- [ ] API tests (`tests/api`) using Playwright's `request` context
- [ ] Tests for AI-powered features (`tests/ai`): criteria-based assertions for non-deterministic outputs, curated prompt datasets and LLM-as-a-judge evaluation
- [ ] Separate Playwright projects per layer (E2E, API, AI)
- [ ] Publish the HTML report from CI

## Author

**Caroline Zocche** — QA Engineer · ISTQB® CTFL
