# Full Stack Bus Booking System

A beginner-friendly but fully functional bus booking project.

- **Frontend:** React + TypeScript + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB

---

## Folder Structure

```text
ShravaniWaghmale/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── Booking.js
│   │   └── Bus.js
│   ├── routes/
│   │   ├── bookingRoutes.js
│   │   ├── busRoutes.js
│   │   └── seedRoutes.js
│   ├── scripts/
│   │   └── seedData.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BookingForm.tsx
│   │   │   ├── BookingList.tsx
│   │   │   ├── BusCard.tsx
│   │   │   └── SearchForm.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── styles.css
│   │   └── types.ts
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── .gitignore
└── README.md
```

---

## Features

- Search buses by source, destination, and date.
- View fare, timings, and available seats.
- Book seats with passenger name and email.
- Seats reduce automatically after booking.
- View recent bookings list.
- Seed sample bus data with one command.

---

## Step-by-Step Run Instructions

### 1) Start MongoDB

Make sure MongoDB is running locally on:

```text
mongodb://127.0.0.1:27017
```

### 2) Setup backend

```bash
cd backend
npm install
npm run seed
npm start
```

Backend runs on: `http://localhost:5000`

### 3) Setup frontend (new terminal)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

### 4) Use app

1. Open `http://localhost:5173`
2. Search buses (or click Search directly to list all).
3. Click **Book Now**.
4. Enter details and confirm booking.
5. Booking appears in **Recent Bookings** and available seats get updated.

---

## API Endpoints

- `GET /api/buses` - List buses (supports query params: `from`, `to`, `date`)
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - List all bookings
- `POST /api/seed` - Seed sample buses

---

## Expected Output

### Backend terminal

- `✅ MongoDB connected successfully`
- `🚀 Backend server running on http://localhost:5000`

### Frontend terminal

- `VITE v5.x.x ready`
- `Local: http://localhost:5173/`

### Browser

- Bus list cards visible.
- Booking form opens when clicking **Book Now**.
- After booking, success message appears and available seats decrease.

