'use client';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const DarkModeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <div className="relative place-content-center place-items-center">
      <input
        type="checkbox"
        id="darkModeSwitch"
        className="sr-only items-center flex"
        checked={currentTheme === 'dark'}
        onChange={() => {
          setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        }}
      />
      <label
        htmlFor="darkModeSwitch"
        className="flex items-center cursor-pointer"
      >
        <div className="sm:text-sm text-gray-800 dark:text-gray-100">
          {currentTheme === 'dark' ? (
            <div className="flex space-x-2 items-center">
              <p>Dark Mode</p>
              <MoonIcon className="h-5 w-5" />
            </div>
          ) : (
            <div className="flex space-x-2 items-center">
              <p>Light Mode</p>
              <SunIcon className="h-5 w-5" />
            </div>
          )}
        </div>
        <div className="relative ml-2 w-10 h-4 bg-gray-600 dark:bg-gray-200 rounded-full shadow-inner items-center">
          <div
            className={`absolute left-0 top-0 w-4 h-4 border-gray-600 border bg-white rounded-full transition-transform duration-300 ease-in-out transform ${
              currentTheme === 'dark' ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </div>
      </label>
    </div>
  );
};

export default DarkModeSwitch;
