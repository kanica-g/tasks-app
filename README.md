# tasks-app

A simple full-stack task manager built with React, Express, and PostgreSQL.  
Deployed and always online via Render.

**Live App**: [https://tasks-react-app-teq7.onrender.com](https://tasks-react-app-teq7.onrender.com)

---

## Features

- Add, complete, and delete tasks
- Tasks persist via PostgreSQL
- Clean, responsive UI with Tailwind CSS

---

## Stack

- **Frontend**: React (Vite) + Tailwind
- **Backend**: Node.js + Express
- **Database**: PostgreSQL (via Render)
- **ORM**: Drizzle
- **Monorepo**: pnpm workspaces

---

## Project Structure

```
tasks-app/
├── apps/
│   ├── client/ → React + Tailwind UI
│   └── server/ → Express API + drizzle ORM
├── pnpm-workspace.yaml
```
