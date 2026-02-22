# StateCarPool

A carpool web application with a Java Spring Boot backend and React frontend.

## Features

### Authentication & Account
- **User registration** – Create an account with email, password, name, and optional phone
- **Secure login** – JWT-based sessions with persistent login
- **Profile management** – Update your name and phone number
- **Account dropdown** – Quick access to profile and logout; shows your name and email
- **Dark mode** – Toggle between light and dark themes (saved to preference)

### Ride Search & Discovery
- **Search rides** – Find rides by origin, destination, date, and number of seats
- **Filter & sort** – Sort by departure time, price (low/high)
- **Real-time availability** – Only rides with available seats are shown; full rides are excluded
- **Ride details** – View full trip info: route, time, price, driver, car, description

### As a Rider
- **Request seats** – Book one or more seats on any available ride with an optional message
- **My bookings** – Track all your requests (pending, accepted, rejected, cancelled)
- **Cancel bookings** – Cancel pending or accepted bookings when needed
- **View ride** – Jump to ride details from any booking

### As a Driver
- **Offer a ride** – Create rides with origin, destination, date, seats, price, car details
- **My rides** – See all your offered rides and manage them
- **Booking requests** – Accept or reject seat requests from riders
- **Accepted passengers** – View confirmed passengers in a dedicated section
- **Update/delete rides** – Edit or remove your rides before departure

### Trust & Ratings
- **Rate users** – Rate drivers or riders after completed rides (1–5 stars)
- **Ratings summary** – View average score and total ratings for any user

### User Experience
- **Responsive design** – Works on desktop, tablet, and mobile
- **Loading skeletons** – Skeleton placeholders while data loads
- **Empty states** – Helpful messages when there's no data
- **Toast notifications** – Clear feedback for actions (success, errors)
- **Protected routes** – Login required for profile, bookings, and driver features

---

## Tech Stack

### Backend
- Java 21, Spring Boot 3
- Spring Security + JWT
- MySQL 8, Spring Data JPA, Flyway
- OpenAPI/Swagger
- BCrypt, Bean Validation, layered architecture

### Frontend
- React 18, TypeScript, Vite
- Tailwind CSS, shadcn/ui (Radix)
- React Router, TanStack Query
- React Hook Form, Zod, Framer Motion, Sonner

## Prerequisites

- Java 21+
- Maven
- Node.js 18+
- MySQL 8 with database `statecarpool` created
- User `statecarpooldb` / password `ur password` (or update `application.properties`)

## Quick Start

### 1. Create MySQL database

```sql
CREATE DATABASE statecarpool;
CREATE USER 'statecarpooldb'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON statecarpool.* TO 'statecarpooldb'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

API: http://localhost:8080  
Swagger: http://localhost:8080/swagger-ui.html

### 3. Frontend

```bash
cd frontend
cp .env.example .env
# Edit .env: VITE_API_URL=http://localhost:8080/api
npm install
npm run dev
```

App: http://localhost:5173

## Demo Flow

1. **Register** at `/register` (e.g. alice@example.com / password123 for seed user)
2. **Search** rides on home; filter by origin, destination, date
3. **View ride** detail and **request seats** (when logged in)
4. **As driver** (e.g. alice@example.com): go to My Rides, Offer a ride, check Requests
5. **Accept/reject** bookings in Driver Requests
6. **My Bookings** shows your requests; cancel if needed
7. **Profile** – update name, phone; toggle dark mode

## Seed Data

- Test Users: alice@example.com, bob@example.com, carol@example.com (all: `password123`)
- Alice is driver for 3 sample rides (NYC–Boston, Boston–NYC, SF–LA)

## Project Structure

```
CarPool/
├── backend/
│   ├── src/main/java/com/statecarpool/
│   │   ├── config/      # Security, Swagger, Web, App
│   │   ├── controller/  # REST controllers
│   │   ├── dto/        # Request/response DTOs
│   │   ├── entity/     # JPA entities
│   │   ├── exception/  # Global exception handler
│   │   ├── mapper/
│   │   ├── repository/
│   │   ├── security/    # JWT, filter, UserDetails
│   │   ├── service/
│   │   └── util/
│   └── src/main/resources/
│       ├── application.properties
│       └── db/migration/ # Flyway scripts
└── frontend/
    └── src/
        ├── components/ # UI components
        ├── contexts/   # Auth
        ├── lib/        # api, utils
        ├── pages/      # Route pages
        └── types.ts
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register |
| POST | /api/auth/login | Login |
| GET | /api/me | Current user |
| PUT | /api/me | Update profile |
| POST | /api/rides | Create ride |
| GET | /api/rides/search | Search rides |
| GET | /api/rides/{id} | Get ride |
| PUT | /api/rides/{id} | Update ride |
| DELETE | /api/rides/{id} | Delete ride |
| GET | /api/rides/me | My rides |
| POST | /api/bookings | Create booking |
| GET | /api/bookings/me | My bookings |
| GET | /api/bookings/requests | Driver requests |
| PATCH | /api/bookings/{id}/accept | Accept |
| PATCH | /api/bookings/{id}/reject | Reject |
| PATCH | /api/bookings/{id}/cancel | Cancel |
| POST | /api/ratings | Create rating |
| GET | /api/users/{id}/ratings-summary | Ratings summary |
