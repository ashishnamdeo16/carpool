export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  phone?: string
  avatarUrl?: string
  createdAt: string
}

export interface Ride {
  id: number
  driver: User
  origin: string
  destination: string
  departureTime: string
  availableSeats: number
  totalSeats: number
  pricePerSeat: number
  description?: string
  carModel?: string
  carPlate?: string
  status: string
  createdAt: string
}

export interface Booking {
  id: number
  ride: Ride
  rider: User
  requestedSeats: number
  status: string
  message?: string
  createdAt: string
}

export interface AuthResponse {
  accessToken: string
  tokenType: string
  user: User
}

export interface RatingsSummary {
  userId: number
  averageScore: number | null
  totalRatings: number
}

export interface Page<T> {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number
}
