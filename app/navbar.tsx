'use client';
import SiteLogo from '@/ui/Components/SiteLogo';
import { Button } from '@/ui/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/ui/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/ui/ui/sheet';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import DarkModeButton from '../ui/Buttons/DarkModeButton/DarkModeButton';
import Clock from '../ui/Components/Clock';

const navigation = [
  { name: 'DASHBOARD', href: '/', hidden: false }
  // { name: 'Playground', href: '/playground' , hidden: true}
];

export default function Navbar({ user }: { user: any }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  {
    console.log(user);
  }

  return (
    <nav
      style={{ backgroundColor: '#80298F' }}
      className="shadow-sm bg-card border-b border-border"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex shrink-0 items-center">
              <SiteLogo />
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8 font-bold">
              {user &&
                navigation.map((item) => {
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold transition-colors ${
                        pathname === item.href
                          ? 'border-slate-500 text-gray-100'
                          : 'border-transparent text-gray-500 hover:text-gray-200 hover:border-gray-300'
                      }`}
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  );
                })}
            </div>
          </div>

          <div className={`${user && 'sm:mr-28'}`}>
            <Clock />
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full p-0 hover:ring-2 hover:ring-ring hover:ring-offset-2"
                  >
                    <Image
                      className="h-10 w-10 rounded-full object-cover"
                      src={user?.image || 'https://avatar.vercel.sh/leerob'}
                      height={40}
                      width={40}
                      alt={`${user?.name || 'placeholder'} avatar`}
                      priority
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 dark:bg-gray-900 bg-gray-200 text-popover-foreground border border-border shadow-lg"
                  align="end"
                  forceMount
                >
                  {user ? (
                    <>
                      <div className="flex items-center justify-start gap-2 p-2">
                        <Image
                          className="h-8 w-8 rounded-full"
                          src={user?.image || 'https://avatar.vercel.sh/leerob'}
                          height={32}
                          width={32}
                          alt={`${user?.name || 'placeholder'} avatar`}
                        />
                        <div className="flex flex-col space-y-0">
                          <p className="text-sm font-medium leading-none">
                            {user.name}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => signOut()}
                        className="text-destructive focus:text-destructive"
                      >
                        Sign out
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <div className="flex w-full justify-center px-2 py-1">
                        <DarkModeButton />
                      </div>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem onClick={() => signIn('google')}>
                        Sign in with Google
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <div className="flex w-full justify-center px-2 py-1">
                        <DarkModeButton />
                      </div>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-400">
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="space-y-1 pt-6 pb-3">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors ${
                        pathname === item.href
                          ? 'bg-muted border-primary text-primary'
                          : 'border-transparent text-muted-foreground hover:bg-muted hover:border-border hover:text-foreground'
                      }`}
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="border-t border-border pt-4 pb-3">
                  {user ? (
                    <>
                      <div className="flex items-center px-4">
                        <div className="shrink-0">
                          <Image
                            priority
                            className="h-10 w-10 rounded-full object-cover"
                            src={
                              user?.image || 'https://avatar.vercel.sh/leerob'
                            }
                            height={40}
                            width={40}
                            alt={`${user?.name || 'User'} avatar`}
                          />
                        </div>
                        <div className="ml-3">
                          <div className="text-base font-medium text-foreground">
                            {user.name}
                          </div>
                          <div className="text-sm font-medium text-muted-foreground">
                            {user.email}
                          </div>
                        </div>
                      </div>

                      <div className="flex w-full px-4 py-2 mt-4">
                        <DarkModeButton />
                      </div>

                      <div className="mt-3 space-y-1">
                        <Button
                          variant="ghost"
                          onClick={() => signOut()}
                          className="w-full justify-start"
                        >
                          Sign out
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="mt-3 space-y-1">
                      <Button
                        variant="ghost"
                        onClick={() => signIn('google')}
                        className="w-full justify-start"
                      >
                        Sign in
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
