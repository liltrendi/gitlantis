## Getting Started

You need to install:

- [Node.js](https://nodejs.org/en/download/)
- [pnpm](https://pnpm.io/installation)
- [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Install

```bash
nvm use
pnpm i
```

### Workspace Layout

- `apps/web`: React + Vite webview app
- `apps/extension`: VS Code extension host code and packaging manifest
- `packages/config-eslint`: shared ESLint config factory
- `packages/config-typescript`: shared TypeScript base configs
- `packages/config-tailwind`: shared Tailwind preset and PostCSS config
- `packages/types`: shared cross-app type system

### Develop

```bash
pnpm dev
```

### Build

#### Web App

```bash
pnpm --filter @gitlantis/web build
```

#### Extension

```bash
pnpm --filter @gitlantis/extension build
```

#### Both

```bash
pnpm build
```
