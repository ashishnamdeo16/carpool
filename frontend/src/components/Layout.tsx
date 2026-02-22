import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Car, User, LogOut, Menu, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

export default function Layout() {
  const { user, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-semibold text-xl">
            <Car className="h-7 w-7" />
            StateCarPool
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Search</Link>
            {user ? (
              <>
                <Link to="/driver/rides" className="text-muted-foreground hover:text-foreground transition-colors">My Rides</Link>
                <Link to="/driver/requests" className="text-muted-foreground hover:text-foreground transition-colors">Requests</Link>
                <Link to="/bookings" className="text-muted-foreground hover:text-foreground transition-colors">Bookings</Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "rounded-full h-9 w-9 p-0 transition-all duration-200",
                        "hover:ring-2 hover:ring-primary/20 hover:scale-105",
                        "active:scale-95 focus-visible:ring-2 focus-visible:ring-primary/30"
                      )}
                      aria-label="Open account menu"
                    >
                      {user.avatarUrl ? (
                        <img
                          src={user.avatarUrl}
                          alt=""
                          className="h-9 w-9 rounded-full object-cover"
                        />
                      ) : (
                        <span
                          className={cn(
                            'flex h-9 w-9 items-center justify-center rounded-full',
                            'bg-primary/10 text-primary font-semibold text-sm',
                            'ring-2 ring-background'
                          )}
                        >
                          {getInitials(user.firstName, user.lastName)}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-72 p-0" sideOffset={12}>
                    {/* Identity block — avatar, name, email */}
                    <div className="px-5 py-4 border-b border-border">
                      <div className="flex items-center gap-4">
                        {user.avatarUrl ? (
                          <img
                            src={user.avatarUrl}
                            alt=""
                            className="h-12 w-12 rounded-full object-cover ring-2 ring-border shadow-sm"
                          />
                        ) : (
                          <span
                            className={cn(
                              'flex h-12 w-12 shrink-0 items-center justify-center rounded-full',
                              'bg-muted text-foreground font-semibold text-base',
                              'ring-2 ring-border shadow-sm'
                            )}
                          >
                            {getInitials(user.firstName, user.lastName)}
                          </span>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-foreground text-base truncate">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-sm truncate mt-0.5 text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu items */}
                    <div className="px-2 py-2">
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="flex items-center gap-3 cursor-pointer">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/50">
                            <User className="h-4 w-4 text-muted-foreground" />
                          </span>
                          <span className="font-medium">View profile</span>
                          <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground/50" />
                        </Link>
                      </DropdownMenuItem>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mx-3" />

                    {/* Logout — deliberately separated */}
                    <div className="px-2 py-2">
                      <DropdownMenuItem
                        onClick={logout}
                        className="text-destructive/90 focus:text-destructive focus:bg-destructive/5 hover:bg-destructive/5 cursor-pointer rounded-xl"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10">
                          <LogOut className="h-4 w-4" />
                        </span>
                        <span className="font-medium">Log out</span>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login"><Button variant="ghost">Login</Button></Link>
                <Link to="/register"><Button>Sign up</Button></Link>
              </div>
            )}
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t py-4 px-4 flex flex-col gap-1">
            <Link to="/" onClick={() => setMobileOpen(false)} className="py-2 px-2 rounded-lg hover:bg-accent">Search</Link>
            {user && (
              <>
                <div className="px-2 py-3 border-b border-border/50 mb-2">
                  <p className="font-semibold text-sm">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                <Link to="/driver/rides" onClick={() => setMobileOpen(false)} className="py-2 px-2 rounded-lg hover:bg-accent">My Rides</Link>
                <Link to="/driver/requests" onClick={() => setMobileOpen(false)} className="py-2 px-2 rounded-lg hover:bg-accent">Requests</Link>
                <Link to="/bookings" onClick={() => setMobileOpen(false)} className="py-2 px-2 rounded-lg hover:bg-accent">Bookings</Link>
                <Link to="/profile" onClick={() => setMobileOpen(false)} className="py-2 px-2 rounded-lg hover:bg-accent">View profile</Link>
                <div className="border-t border-border/50 mt-2 pt-2">
                  <Button variant="ghost" className="w-full justify-start text-destructive hover:bg-destructive/10" onClick={() => { logout(); setMobileOpen(false); }}>Log out</Button>
                </div>
              </>
            )}
          </div>
        )}
      </header>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
