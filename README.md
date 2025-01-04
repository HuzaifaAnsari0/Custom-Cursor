# CursorCrafts

A web application for sharing and downloading CursorCraft designs.

## Project Structure
```
cursor-showcase/
├── client/         # React+Vite frontend
├── server/         # Express backend
└── README.md
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install client and server dependencies:
```bash
npm run install:all
```

3. Create `.env` files:
   - In `client/`: Copy `.env.example` to `.env`
   - In `server/`: Copy `.env.example` to `.env`

## Development

Start both client and server:
```bash
npm run dev
```

- Client runs on: http://localhost:3000
- Server runs on: http://localhost:5000