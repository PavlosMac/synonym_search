
import * as React from 'react';
// import ChipInput from './chip-container';
// Initialization for ES Users
import { TERipple } from 'tw-elements-react';
import { useEffect, useState } from 'react';
import { Subject, debounceTime, map, of, switchMap } from 'rxjs';
import axios from 'axios';

// export interface ISearchContainerProps {}


export function SearchContainer () {

  const [searchText, setSearchText] = useState('');
  const onSearch$ = new Subject<string>();

  useEffect(() => {
    onSearch$
    .pipe(
      debounceTime(1000),
      switchMap((search: string) => {
        console.log('search', search)
        getSearchTerm(search.trim());
        return of('')
      })).subscribe();
});

  // const handleSearchInput = (event: { target: { value: React.SetStateAction<string>; }; }) => {
  //   console.log(event.target.value);
  //   setSearchText(event.target.value);
  // };
 // get the search term results using API
  const getSearchTerm =async (search: string) => {
    console.log('call api');
    const res = await axios.get('http://localhost:4000/api/synonyms?term=banana');
    console.log(res);
    // axios.get(`http://localhost:4001/api/?term=${search}`)
  };

   const onSearch = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    const search = e.target.value;
    console.log(search)
    setSearchText(search);
    onSearch$.next(search as string);
  }
  
    return (
      <div className="mb-3 md:w-96">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
              <input
                  type="search"
                  className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="button-addon1"
                  value={searchText} 
                  onChange={onSearch} 
                  />

              {/* <!--Search button--> */}
              <TERipple color='light'>
              <button
                  className="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                  type="button"
                  id="button-addon1">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5">
                      <path
                          fillRule="evenodd"
                          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                          clipRule="evenodd" />
                  </svg>
              </button>
              </TERipple>
          </div>
      </div>
  );
}
function componentDidMount() {
  throw new Error('Function not implemented.');
}

