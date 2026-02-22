import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { api } from '@/lib/api'
import { Booking } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Calendar, XCircle } from 'lucide-react'

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  ACCEPTED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  REJECTED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  CANCELLED: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400',
}

export default function Bookings() {
  const queryClient = useQueryClient()

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings', 'me'],
    queryFn: async () => {
      const { data } = await api.get<Booking[]>('/bookings/me')
      return data
    },
  })

  const cancelMutation = useMutation({
    mutationFn: (id: number) => api.patch(`/bookings/${id}/cancel`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings', 'me'] })
    },
  })

  const list = bookings ?? []

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto space-y-8"
    >
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">My bookings</h1>
        <p className="text-muted-foreground mt-1">Track your ride requests</p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-36 rounded-2xl" />
          ))}
        </div>
      ) : list.length === 0 ? (
        <Card className="rounded-2xl p-12 text-center">
          <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No bookings yet</h3>
          <p className="text-muted-foreground mt-1">Find a ride and request seats</p>
          <Link to="/">
            <Button className="mt-4">Search rides</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {list.map((booking, i) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">
                          {booking.ride.origin} → {booking.ride.destination}
                        </h3>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            statusColors[booking.status] ?? 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {format(new Date(booking.ride.departureTime), 'PPP p')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {booking.requestedSeats} seat(s) • ${booking.ride.pricePerSeat * booking.requestedSeats} total
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link to={`/rides/${booking.ride.id}`}>
                        <Button variant="outline" size="sm">View ride</Button>
                      </Link>
                      {(booking.status === 'PENDING' || booking.status === 'ACCEPTED') && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive"
                          onClick={() => cancelMutation.mutate(booking.id)}
                          disabled={cancelMutation.isPending}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      )}
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
