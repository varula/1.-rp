# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

This project is **14oz ERP** — a garment manufacturing ERP dashboard for tracking production stages (Store, Cutting, Sewing, Wash, QC, Finishing, Merchandising, Shipment) with KPI cards, bar charts, and data tables.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

- **`artifacts/14oz-erp`** — Main web frontend (React + Vite + Tailwind v3), preview path `/`
  - No Supabase — pure frontend with static/mock data
  - Uses `react-router-dom` v7 with `BrowserRouter` and `basename` for path routing
  - Dark industrial theme: indigo/copper/selvedge-red color palette
  - 9 pages: Dashboard, Store, Cutting, Sewing, Wash, QC, Finishing, Merchandising, Shipment
- **`artifacts/api-server`** — Express API server (not yet used by frontend)
- **`artifacts/mockup-sandbox`** — Design mockup environment

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
