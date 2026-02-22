import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { api } from '@/lib/api'
import { useAuth } from '@/contexts/AuthContext'
import { Ride } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { MapPin, Calendar, Users, Car, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const bookSchema = z.object({
  requestedSeats: z.coerce.number().min(1),
  message: z.string().optional(),
})

type BookFormData = z.infer<typeof bookSchema>

export default function RideDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const [showBookForm, setShowBookForm] = useState(false)

  const { data: ride, isLoading } = useQuery({
    queryKey: ['ride', id],
    queryFn: async () => {
      const { data } = await api.get<Ride>(`/rides/${id}`)
      return data
    },
    enabled: !!id,
  })

  const bookMutation = useMutation({
    mutationFn: async (payload: { rideId: number; requestedSeats: number; message?: string }) => {
      const { data } = await api.post('/bookings', payload)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ride', id] })
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      setShowBookForm(false)
      navigate('/bookings')
    },
  })

  const { register, handleSubmit, formState: { errors } } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
  })

  const onBook = (data: BookFormData) => {
    if (!ride) return
    bookMutation.mutate({
      rideId: ride.id,
      requestedSeats: data.requestedSeats,
      message: data.message,
    })
  }

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    )
  }

  if (!ride) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <p className="text-muted-foreground">Ride not found</p>
        <Link to="/"><Button className="mt-4">Back to search</Button></Link>
      </div>
    )
  }

  const isDriver = user?.id === ride.driver.id
  const canBook = user && !isDriver && ride.availableSeats > 0 && ride.status === 'ACTIVE'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to search
      </Link>

      <Card className="rounded-2xl overflow-hidden">
        <CardHeader className="bg-muted/50">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <MapPin className="h-6 w-6" />
            {ride.origin} → {ride.destination}
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {format(new Date(ride.departureTime), 'PPP p')}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {ride.availableSeats} of {ride.totalSeats} seats available
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">Driver</h3>
              <p>{ride.driver.firstName} {ride.driver.lastName}</p>
              <p className="text-sm text-muted-foreground">{ride.driver.email}</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold">${ride.pricePerSeat}</span>
              <p className="text-sm text-muted-foreground">per seat</p>
            </div>
          </div>
          {(ride.carModel || ride.carPlate) && (
            <div className="flex items-center gap-2 text-sm">
              <Car className="h-4 w-4" />
              {ride.carModel} {ride.carPlate && `• ${ride.carPlate}`}
            </div>
          )}
          {ride.description && (
            <p className="text-muted-foreground">{ride.description}</p>
          )}
        </CardContent>
      </Card>

      {canBook && (
        <Card className="rounded-2xl">
          {!showBookForm ? (
            <CardContent className="p-6">
              <Button onClick={() => setShowBookForm(true)} className="w-full" size="lg">
                Request seats
              </Button>
            </CardContent>
          ) : (
            <CardContent className="p-6">
              <form onSubmit={handleSubmit(onBook)} className="space-y-4">
                <div className="space-y-2">
                  <Label>Number of seats</Label>
                  <Input
                    type="number"
                    min={1}
                    max={ride.availableSeats}
                    {...register('requestedSeats')}
                  />
                  {errors.requestedSeats && (
                    <p className="text-sm text-destructive">{errors.requestedSeats.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Message (optional)</Label>
                  <Input placeholder="Say hello to the driver..." {...register('message')} />
                </div>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => setShowBookForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={bookMutation.isPending}>
                    {bookMutation.isPending ? 'Sending...' : 'Send request'}
                  </Button>
                </div>
              </form>
            </CardContent>
          )}
        </Card>
      )}

      {!user && (
        <p className="text-center text-muted-foreground">
          <Link to="/login" className="text-primary hover:underline">Sign in</Link> to request seats
        </p>
      )}
    </motion.div>
  )
}
