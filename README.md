# CH-Save-Manager

[Live Demo](https://chsavemanager.hobbycode.link/)

# CHProfile — Clicker Heroes Save Manager

A web application for managing, analyzing, and converting **Clicker Heroes** save files. Upload your save, inspect detailed statistics in a human-readable format, and convert your save between platforms — including mobile.

---

## What is this?

CHProfile is a full-stack save management tool built for Clicker Heroes players. It lets you upload your encoded game save, decode and parse its contents, and browse your progress through a clean, structured UI. Every uploaded save is stored in a database, so your history is always accessible.

Key capabilities:

- **Save decoding & parsing** — Uploads are decompressed (via `pako`) and parsed from the game's Base64-encoded format into structured data
- **Mobile conversion** — Convert a PC save to a mobile-compatible format and download it directly
- **Statistics dashboard** — View your save's data in a readable layout: hero levels, ancients, relics, transcendence progress, gold, DPS, and more — rendered with formatted numbers so large values stay legible
- **Save history** — Every uploaded save is persisted to MongoDB, so you can track changes over time or revisit previous states
- **Authentication** — User accounts with secure login (NextAuth + bcrypt) keep your saves private and tied to your profile

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| UI | Material UI (MUI v5) + Emotion |
| Data fetching | SWR |
| Forms & validation | Formik + Joi |
| Auth | NextAuth v5 + MongoDB Adapter |
| Database | MongoDB + Mongoose |
| Save parsing | pako (zlib), BigNumber.js |
| Number formatting | numeral, dayjs |

---

## Features at a Glance

- 📁 Upload and decode Clicker Heroes save files (PC & mobile formats)
- 📊 Browse statistics in a structured, human-readable dashboard
- 📱 Convert saves to mobile format for cross-platform play
- 🗂️ Persistent save history stored per user account
- 🔐 Secure authentication with hashed passwords
