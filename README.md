<p align="center">
  <img src="static/logo.png" alt="Logo" width="320">
</p>

<div align="center">
  <a alt="typescript" href="http://www.typescriptlang.org">
    <img src="https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=white" />
  </a>

  <a alt="pnpm" href="https://pnpm.io">
    <img src="https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=white" />
  </a>

  <a alt="turbo" href="https://turbo.build/repo">
    <img src="https://img.shields.io/badge/Turborepo-%230F0813.svg?logo=Turborepo&logoColor=white" />
  </a>
</div>

<div align="center">
  <a alt="conventional-commits" href="https://conventionalcommits.org">
    <img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white" />
  </a>

  <a alt="commitizen" href="https://commitizen-tools.github.io/commitizen">
    <img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" />
  </a>

  <a alt="renovate" href="https://renovatebot.com">
    <img src="https://img.shields.io/badge/renovate-enabled-brightgreen.svg?logo=renovate&logoColor=white" />
  </a>
</div>

<br/>

<div align="center">
  <a alt="codeql-status" href="https://github.com/thuyen2908/x-test/actions/workflows/github-code-scanning/codeql">
    <img src="https://img.shields.io/github/actions/workflow/status/thuyen2908/x-test/github-code-scanning%2Fcodeql?logo=github&logoColor=959DA5&label=CodeQL" />
  </a>

  <a alt="test-status" href="https://dl.circleci.com/status-badge/redirect/circleci/HdQfpoVuGR4FzjnCbAPyjr/TjMokNaF8KeQxX92w7GTKz/tree/main">
    <img src="https://dl.circleci.com/status-badge/img/circleci/HdQfpoVuGR4FzjnCbAPyjr/TjMokNaF8KeQxX92w7GTKz/tree/main.svg?style=shield" />
  </a>
</div>

---

- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
  - [For Windows](#for-windows)
    - [WSL](#wsl)
    - [Non-WSL (*not recommended*)](#non-wsl-not-recommended)
  - [For Linux, MacOS or WSL](#for-linux-macos-or-wsl)
- [Essential commands](#essential-commands)
  - [Project root](#project-root)
  - [Playwright-based E2E projects (e2e/pos-web,...)](#playwright-based-e2e-projects-e2epos-web)
- [Allure Report](#allure-report)
- [CI/CD](#cicd)
- [Report dashboards](#report-dashboards)
- [Troubleshooting](#troubleshooting)

## Prerequisites

[Node.js](https://nodejs.org/en) - any current [LTS version](https://nodejs.org/en/about/previous-releases), or using a Node Version Manager below

[mise](https://mise.jdx.dev) (optional) - recommended tool to manage Node versions (*alternatives*: [asdf](https://asdf-vm.com), [nvm](https://github.com/nvm-sh/nvm), [fnm](https://github.com/Schniz/fnm)...)

## Getting started

> [!IMPORTANT]
> For the *security* purpose, we manage all our secrets using [dotenv-vault](https://www.dotenv.org/docs). Before setting up the repository, please:
> - Ask your team to share a copy of the `.env` file with you. Place it in the root of the project
> - **Or**, request an invitation to the project vault, and follow the "**Log in .env.vault**" and "**Pull .env**" sections of this guide: https://www.dotenv.org/docs/quickstart/sync

### For Windows

#### WSL

> [!NOTE]
> The recommended way for setting up a development environment on Windows is to use the [Windows Subsystem for Linux (WSL)](https://learn.microsoft.com/en-us/windows/wsl/install)

You can follow the step-by-step guide here to setup WSL and Windows Terminal (only select the sections relevant to your needs): https://learn.microsoft.com/en-us/windows/wsl/setup/environment

After successfully setting up WSL, you can continue to the section for [Linux, MacOS or WSL](#for-linux-macos-or-wsl)

#### Non-WSL (*not recommended*)

- Install Git: https://git-scm.com/downloads/win
- Setting up an Unix-like environment: [Git Bash](https://www.gitkraken.com/blog/what-is-git-bash) or [MSYS2](https://www.msys2.org/docs/what-is-msys2)
- Install Node.js: https://nodejs.org/en/download
- Enable [Corepack](https://nodejs.org/api/corepack.html) by running `corepack enable`
- Install project's dependencies `pnpm install`

### For Linux, MacOS or WSL

> [!NOTE]
> Make sure that Git is installed. If not, you can install it via [build-essential](https://itsfoss.com/build-essential-ubuntu) on Linux, WSL or by running `xcode-select --install` on MacOS

- Setup `mise` as our Node Version Manager, just follow this guide: https://mise.jdx.dev/getting-started.html
- Open terminal at the root of the project and run `mise install` to install the corresponding Node.js version
- Enable [Corepack](https://nodejs.org/api/corepack.html) by running `corepack enable`
- Install project's dependencies `pnpm install`

## Essential commands

### Project root

- `pnpm cz` - to commit changes using [commitizen](https://commitizen-tools.github.io/commitizen)
- `pnpm playwright:install-browsers` - to install [Playwright's browsers](https://playwright.dev/docs/browsers#install-browsers)
- `pnpm e2e:test` - to run all end-to-end tests

### Playwright-based E2E projects (e2e/pos-web,...)

- `pnpm bdd:watch` - to generate BDD files in watch mode, useful for development
- `pnpm report` - to show [Playwright report](https://playwright.dev/docs/running-tests#test-reports)
- `pnpm test` - to run all tests
- `pnpm test:ui` - to run tests in [Playwright UI mode](https://playwright.dev/docs/test-ui-mode)
- `pnpm test:debug` - to run tests in [debug mode](https://playwright.dev/docs/running-tests#debugging-tests)

## Allure Report

- To install Allure Report locally, follow this instruction: https://allurereport.org/docs/install
- In Playwright-based E2E projects, to view the Allure Report, run this command: `pnpm report:allure`
- To learn more about integrating Allure Report with Playwright, check out this guide: https://allurereport.org/docs/playwright

## CI/CD

We're using [CircleCI](https://circleci.com) for our CI/CD pipelines. Each e2e project will trigger a pipeline on every commit pushed to the `main` branch and every merged PR. The pipeline is configured to run all tests on different browsers and deploy the test report to a designated dashboard.

## Report dashboards

- `pos-web`: https://thuyen2908.github.io/report-pos-web

## Troubleshooting

1. If you encounter a "cannot find matching keyid" error while installing dependencies with `pnpm`, please follow this guide here: https://vercel.com/guides/corepack-errors-github-actions
   - Upgrade `corepack` version >= `0.31.0`
   - Or, run `COREPACK_INTEGRITY_KEYS=0 pnpm install`
