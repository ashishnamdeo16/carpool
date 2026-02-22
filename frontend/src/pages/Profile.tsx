import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { User } from 'lucide-react'

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export default function Profile() {
  const { user, refreshUser } = useAuth()
  const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains('dark'))

  const updateMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const { data: res } = await api.put('/me', data)
      return res
    },
    onSuccess: async (data) => {
      localStorage.setItem('user', JSON.stringify(data))
      await refreshUser()
    },
  })

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
    },
  })

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone ?? '',
      })
    }
  }, [user, reset])

  const toggleDark = () => {
    const next = !darkMode
    setDarkMode(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  if (!user) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-xl mx-auto space-y-8"
    >
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your account</p>
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-6 w-6" />
            Personal info
          </CardTitle>
          <CardDescription>Update your profile details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit((d) => updateMutation.mutate(d))} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>First name</Label>
                <Input {...register('firstName')} />
                {errors.firstName && (
                  <p className="text-sm text-destructive">{errors.firstName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Last name</Label>
                <Input {...register('lastName')} />
                {errors.lastName && (
                  <p className="text-sm text-destructive">{errors.lastName.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={user.email} disabled className="opacity-70" />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input {...register('phone')} />
            </div>
            <Button type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? 'Saving...' : 'Save changes'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Toggle dark mode</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span>Dark mode</span>
            <Switch checked={darkMode} onCheckedChange={toggleDark} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
