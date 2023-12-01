
import * as React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { TERipple } from 'tw-elements-react';
import { useEffect, useState } from 'react';
import { Subject, map, distinctUntilChanged, from, filter, switchMap, takeUntil, debounceTime, throttleTime } from 'rxjs';
import axios from 'axios';
import { SynonymUnit } from '../types/synonym';
import { SynonymEventService } from '../services/synonym-service';

export function SearchContainer() {
  const [searchText, setSearchText] = useState('');
  const destory$ = new Subject<void>();

  useEffect(() => {
    SynonymEventService.getSynonym$()
      .pipe(
        takeUntil(destory$),
        map((synonymUnit: SynonymUnit) => synonymUnit.canonicalForm),
        filter((term: string) => term.length > 1),
        distinctUntilChanged(),
        switchMap((search: string) => {
          console.log(search)
          return from(getSearchTermSynonyms(search.trim()));
        })).subscribe((synonyms: SynonymUnit) => {
          const { associated } = synonyms;
          SynonymEventService.setSynonyms({ ...SynonymEventService.getSynonyms(), associated: associated ?? [] });
        });

    return () => {
      destory$.next();
      destory$.complete();
    }
  }, []);

  // get the search term results using API
  const getSearchTermSynonyms = async (search: string) => {
    const res = await axios.get<SynonymUnit>(`http://localhost:4000/api/synonyms?term=${search}`);
    return res.data;
  };

  const setFieldValue = (v: string) => {
    setSearchText(v);
  }

  const debounced = useDebouncedCallback(
    // function
    (value) => {
      changeCanonical(value)
    },
    400
  );

  const changeCanonical = (searchTerm: string) => {
    SynonymEventService.setSynonyms({ ...SynonymEventService.getSynonyms(), canonicalForm: searchTerm });
  }

  return (
    <div className="mb-3 md:w-96">
      <div className="relative mb-4 flex w-full flex-wrap items-stretch">
        <input
          id="search"
          className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-addon1"
          value={searchText}
          onChange={(e) => { debounced(e.target.value); setFieldValue(e.target.value) }}
        />
      </div>
    </div>
  );
}

