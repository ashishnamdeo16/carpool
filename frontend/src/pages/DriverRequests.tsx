import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { api } from '@/lib/api'
import { Booking } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Check, X } from 'lucide-react'

export default function DriverRequests() {
  const queryClient = useQueryClient()

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings', 'requests'],
    queryFn: async () => {
      const { data } = await api.get<Booking[]>('/bookings/requests')
      return data
    },
  })

  const acceptMutation = useMutation({
    mutationFn: (id: number) => api.patch(`/bookings/${id}/accept`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings', 'requests'] })
      queryClient.invalidateQueries({ queryKey: ['rides'] })
    },
  })

  const rejectMutation = useMutation({
    mutationFn: (id: number) => api.patch(`/bookings/${id}/reject`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings', 'requests'] })
    },
  })

  const pending = (bookings ?? []).filter((b) => b.status === 'PENDING')
  const accepted = (bookings ?? []).filter((b) => b.status === 'ACCEPTED')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto space-y-8"
    >
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Booking requests</h1>
        <p className="text-muted-foreground mt-1">Accept or reject requests, and view confirmed passengers</p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
      ) : (
        <>
          <section>
            <h2 className="text-lg font-medium mb-4">Pending</h2>
            {pending.length === 0 ? (
              <Card className="rounded-2xl p-8 text-center">
                <p className="text-muted-foreground">No pending requests</p>
              </Card>
            ) : (
              <div className="space-y-4">
          {pending.map((booking, i) => (
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
                      <h3 className="font-semibold">
                        {booking.ride.origin} → {booking.ride.destination}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {booking.rider.firstName} {booking.rider.lastName} • {booking.requestedSeats} seat(s)
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(booking.createdAt), 'PPP')}
                      </p>
                      {booking.message && (
                        <p className="text-sm mt-2 italic">&quot;{booking.message}&quot;</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => rejectMutation.mutate(booking.id)}
                        disabled={rejectMutation.isPending}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => acceptMutation.mutate(booking.id)}
                        disabled={acceptMutation.isPending}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Accept
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
              </div>
            )}
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-medium mb-4">Accepted</h2>
            {accepted.length === 0 ? (
              <Card className="rounded-2xl p-8 text-center">
                <p className="text-muted-foreground">No accepted bookings yet</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {accepted.map((booking, i) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="rounded-2xl border-green-200 dark:border-green-900/50">
                      <CardContent className="p-6">
                        <div>
                          <h3 className="font-semibold">
                            {booking.ride.origin} → {booking.ride.destination}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400">
                              <Check className="h-4 w-4" />
                              {booking.rider.firstName} {booking.rider.lastName}
                            </span>
                            {' '}• {booking.requestedSeats} seat(s) • {format(new Date(booking.ride.departureTime), 'PPP')}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </motion.div>
  )
}
