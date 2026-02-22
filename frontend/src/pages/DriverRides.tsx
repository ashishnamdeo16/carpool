import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { api } from '@/lib/api'
import { Ride } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { MapPin, Calendar, Users, Plus } from 'lucide-react'

export default function DriverRides() {
  const { data: rides, isLoading } = useQuery({
    queryKey: ['rides', 'me'],
    queryFn: async () => {
      const { data } = await api.get<Ride[]>('/rides/me')
      return data
    },
  })

  const list = rides ?? []

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto space-y-8"
    >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">My rides</h1>
          <p className="text-muted-foreground mt-1">Manage your offered rides</p>
        </div>
        <Link to="/driver/rides/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Offer a ride
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
      ) : list.length === 0 ? (
        <Card className="rounded-2xl p-12 text-center">
          <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No rides yet</h3>
          <p className="text-muted-foreground mt-1">Offer a ride to get started</p>
          <Link to="/driver/rides/new">
            <Button className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Offer a ride
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {list.map((ride, i) => (
            <motion.div
              key={ride.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 font-semibold">
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
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-semibold">${ride.pricePerSeat}</span>
                      <span className="text-muted-foreground">/ seat</span>
                      <Link to={`/rides/${ride.id}`}>
                        <Button variant="outline" size="sm">View</Button>
                      </Link>
                      <Link to="/driver/requests">
                        <Button variant="ghost" size="sm">Requests</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
