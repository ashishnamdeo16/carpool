import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { api } from '@/lib/api'
import { Ride, Page } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Search as SearchIcon, MapPin, Calendar, Users } from 'lucide-react'

export default function Search() {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState('')
  const [seats, setSeats] = useState('')
  const [sort, setSort] = useState('departure')

  const { data, isLoading } = useQuery({
    queryKey: ['rides', 'search', origin, destination, date, seats, sort],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (origin) params.set('origin', origin)
      if (destination) params.set('destination', destination)
      if (date) params.set('date', date)
      if (seats) params.set('seats', seats)
      params.set('sort', sort)
      params.set('size', '20')
      const { data } = await api.get<Page<Ride>>(`/rides/search?${params}`)
      return data
    },
  })

  const rides = (data?.content ?? []).filter((r) => r.availableSeats > 0)

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h1 className="text-3xl font-semibold tracking-tight">Find a ride</h1>
        <p className="text-muted-foreground">Share the journey, share the cost</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="rounded-2xl p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div>
              <label className="text-sm font-medium mb-1 block">From</label>
              <Input
                placeholder="City or location"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">To</label>
              <Input
                placeholder="City or location"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Date</label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Seats</label>
              <Input
                type="number"
                min="1"
                placeholder="Min"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Sort by</label>
              <select
                className="flex h-11 w-full rounded-xl border border-input bg-background px-4"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="departure">Departure</option>
                <option value="departure_desc">Departure (newest)</option>
                <option value="price">Price (low)</option>
                <option value="price_desc">Price (high)</option>
              </select>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold">Available rides</h2>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 rounded-2xl" />
            ))}
          </div>
        ) : rides.length === 0 ? (
          <Card className="rounded-2xl p-12 text-center">
            <SearchIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No rides found</h3>
            <p className="text-muted-foreground mt-1">Try adjusting your search filters</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {rides.map((ride, i) => (
              <motion.div
                key={ride.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/rides/${ride.id}`}>
                  <Card className="rounded-2xl p-6 hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 text-lg font-semibold">
                            <MapPin className="h-5 w-5 text-muted-foreground" />
                            {ride.origin} → {ride.destination}
                          </div>
                          <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {format(new Date(ride.departureTime), 'PPP p')}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {ride.availableSeats} of {ride.totalSeats} seats available
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            {ride.driver.firstName} {ride.driver.lastName} • {ride.carModel || 'Car'}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-semibold">${ride.pricePerSeat}</span>
                          <p className="text-sm text-muted-foreground">per seat</p>
                          <Button className="mt-2">View</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
