'use client';
import SiteLogo from '@/ui/Components/SiteLogo';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
import DarkModeButton from '../ui/Buttons/DarkModeButton/DarkModeButton';
import Clock from '../ui/Components/Clock';

const navigation = [
  { name: 'DASHBOARD', href: '/', hidden: false }
  // { name: 'Playground', href: '/playground' , hidden: true}
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({ user }: { user: any }) {
  const pathname = usePathname();

  return (
    <Disclosure
      style={{ backgroundColor: '#80298F' }}
      as="nav"
      className="shadow-sm -white dark:-gray-950 border-b border-gray-200 dark:border-gray-800"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <SiteLogo />
                </div>
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8 font-bold">
                  {user &&
                    navigation.map((item) => {
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            pathname === item.href
                              ? 'border-slate-500 text-gray-100'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                            'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold -white dark:-gray-950  border-gray-200 dark:border-gray-800'
                          )}
                          aria-current={
                            pathname === item.href ? 'page' : undefined
                          }
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
                <Menu as="div" className="relative ml-3 ">
                  <div>
                    <Menu.Button className="flex rounded-full -white  text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <Image
                        className="h-8 w-8 rounded-full"
                        src={user?.image || 'https://avatar.vercel.sh/leerob'}
                        height={32}
                        width={32}
                        alt={`${user?.name || 'placeholder'} avatar`}
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="border dark:border-gray-700 absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md text-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-nonebg-white bg-white dark:bg-gray-900">
                      {user ? (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? 'bg-gray-100 dark:bg-gray-800' : '',
                                'flex w-full px-4 py-2 text-sm text-gray-700 dark:text-white hover:dark:-bg-gray-700 '
                              )}
                              onClick={() => signOut()}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      ) : (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? '-gray-100 ' : '',
                                'flex w-full px-4 py-2 text-sm text-gray-700'
                              )}
                              onClick={() => signIn('google')}
                            >
                              Sign in
                            </button>
                          )}
                        </Menu.Item>
                      )}

                      <Menu.Item>
                        <div className="flex w-full px-4 py-2 text-sm text-gray-700 ">
                          <DarkModeButton />
                        </div>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md -white dark:-gray-950 border-b border-gray-200 dark:border-gray-800 dark:hover:-gray-900 p-2 text-gray-400 hover:-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? '-slate-50 border-slate-500 text-slate-700 dark:-gray-950 dark:text-slate-100'
                      : 'border-transparent text-gray-600 dark:text-slate-200 hover:-gray-50 hover:border-gray-300 hover:text-gray-800 -white dark:-gray-950 border-b border-gray-200 dark:border-gray-800',
                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                  )}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-gray-200 dark:border-gray-800 pt-4 pb-3">
              {user ? (
                <>
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <Image
                        priority
                        className="h-8 w-8 rounded-full"
                        src={user.image}
                        height={32}
                        width={32}
                        alt={`${user.name} avatar`}
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-600 dark:text-slate-200">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium text-gray-500 dark:text-slate-300">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full px-4 py-2 mt-4 text-gray-700 ">
                    <DarkModeButton />
                  </div>
                  <div className="mt-3 space-y-1 hover:-gray-100 dark:hover:-gray-900">
                    <button
                      onClick={() => signOut()}
                      className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-slate-300 0 hover:text-gray-800"
                    >
                      Sign out
                    </button>
                  </div>
                </>
              ) : (
                <div className="mt-3 space-y-1">
                  <button
                    onClick={() => signIn('google')}
                    className="flex w-full px-4 py-2 text-base font-medium text-gray-500 hover:-gray-100 hover:text-gray-800"
                  >
                    Sign in
                  </button>
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
