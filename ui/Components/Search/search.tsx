'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition, useRef, useEffect } from 'react';
import { useSearchStore } from './searchStore';
import { Card, Text, Title, List, ListItem, Divider } from '@tremor/react';
import { records } from '../../../lib/test-data/testRecord';

export default function Search({ disabled }: { disabled?: boolean }) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const {
    searchTerm,
    setSearchTerm,
    isInputFocused,
    setIsInputFocused,
    isOpen,
    setIsOpen,
    searchResults,
    setSearchResults
  } = useSearchStore();

  const [isPending, startTransition] = useTransition();

  function handleSearch(term: string) {
    const filteredResults = records.filter((record) =>
      record.perf_name.toLowerCase().includes(term.toLowerCase())
    );
    const params = new URLSearchParams(window.location.search);
    if (term?.length > 2 && searchInputRef?.current) {
      params.set('q', term);
      setSearchTerm(term);
      setIsOpen(true);

      console.log(filteredResults, 'FR');
      setSearchResults({ perfs: filteredResults });
    } else {
      params.delete('q');
      setIsOpen(false);
    }

    startTransition(() => {
      setSearchResults({ perfs: filteredResults });
      replace(`${pathname}?${params.toString()}`);
    });
  }

  const handleInputFocus = () => {
    if (searchTerm.length > 2 && !isOpen) {
      setIsOpen(true);
      return;
    } else {
      setIsOpen(false);
      return;
    }
  };

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, isInputFocused]);
  console.log(searchResults);

  return (
    <div className="relative mt-5 max-w-md w-full ">
      <div>
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="rounded-md shadow-sm">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
            aria-hidden="true"
          >
            <MagnifyingGlassIcon
              className="mr-3 h-4 w-4 text-gray-400 dark:text-gray-100"
              aria-hidden="true"
            />
          </div>
          <input
            //autoFocus={false}
            autoComplete="off"
            type="text"
            name="search"
            id="search"
            disabled={disabled}
            className="h-10 block w-full rounded-md border border-gray-200 dark:border-gray-600 pl-9 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-gray-800"
            placeholder="Search by name..."
            spellCheck={false}
            ref={searchInputRef}
            onFocus={handleInputFocus}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {isPending && (
          <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="absolute z-10 pt-2 max-w-md w-full">
        {isOpen && (
          <Card>
            <List>
            {searchResults?.perfs.length > 0 ? (
              <div>  
                <Title>Performances</Title>
                <Divider>Results</Divider>

               {searchResults?.perfs.map((result) => (
                <ListItem key={result.id}>
                  <span>{result.perf_name} - {result?.theater}</span>

                </ListItem>
               ))}

              </div>
            ) : (
              <Text>No results match your search</Text>
            )}
            </List>
          </Card>
        )}
      </div>
    </div>
  );
}
