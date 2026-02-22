import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const schema = z.object({
  origin: z.string().min(1, 'Origin required'),
  destination: z.string().min(1, 'Destination required'),
  departureTime: z.string().min(1, 'Departure time required'),
  totalSeats: z.coerce.number().min(1),
  pricePerSeat: z.coerce.number().min(0),
  description: z.string().optional(),
  carModel: z.string().optional(),
  carPlate: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export default function CreateRide() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const payload = {
        ...data,
        departureTime: data.departureTime.length === 16 ? `${data.departureTime}:00` : data.departureTime,
      }
      const { data: res } = await api.post('/rides', payload)
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rides'] })
      navigate('/driver/rides')
    },
  })

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const minDateTime = new Date().toISOString().slice(0, 16)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-xl mx-auto space-y-6"
    >
      <Link to="/driver/rides" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to my rides
      </Link>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Offer a ride</CardTitle>
          <CardDescription>Create a new ride and share your journey</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>From</Label>
                <Input placeholder="Origin city" {...register('origin')} />
                {errors.origin && <p className="text-sm text-destructive">{errors.origin.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>To</Label>
                <Input placeholder="Destination city" {...register('destination')} />
                {errors.destination && <p className="text-sm text-destructive">{errors.destination.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Departure</Label>
              <Input type="datetime-local" min={minDateTime} {...register('departureTime')} />
              {errors.departureTime && <p className="text-sm text-destructive">{errors.departureTime.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Seats</Label>
                <Input type="number" min={1} {...register('totalSeats')} />
                {errors.totalSeats && <p className="text-sm text-destructive">{errors.totalSeats.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>Price per seat ($)</Label>
                <Input type="number" min={0} step="0.01" {...register('pricePerSeat')} />
                {errors.pricePerSeat && <p className="text-sm text-destructive">{errors.pricePerSeat.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description (optional)</Label>
              <Input placeholder="Comfortable ride, AC on..." {...register('description')} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Car model (optional)</Label>
                <Input placeholder="Toyota Camry" {...register('carModel')} />
              </div>
              <div className="space-y-2">
                <Label>License plate (optional)</Label>
                <Input placeholder="ABC-1234" {...register('carPlate')} />
              </div>
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={mutation.isPending}>
              {mutation.isPending ? 'Creating...' : 'Create ride'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
