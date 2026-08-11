# Insurance Underwriter Automation

Standalone Playwright automation framework for the Insurance Underwriter application.

## Run

Start the application separately at `http://localhost:5173` and the mock API at `http://localhost:4000`, then run:

```bash
npm install
npm run test:e2e
```

For smoke coverage only:

```bash
npm run test:e2e:smoke
```

## Scope

Automation interacts with the application only through Playwright browser APIs. It does not import React components, application pages, application services, or other application source files.

Preserved automation architecture:

- UI Agent
- Requirement Agent
- Playwright Agent
- Locator Healing Agent
- Impact Analysis Agent
- Planner Agent
- Validation Agent
- Reporting Agent
- Graph Query Agent
- Knowledge Graph

## Layout

```text
tests/
pages/
components/
fixtures/
locators/
helpers/
utils/
config/
data/
models/
interfaces/
ai/
  agents/
  prompts/
  orchestrator/
knowledge-graph/
playwright.config.ts
tsconfig.json
```

