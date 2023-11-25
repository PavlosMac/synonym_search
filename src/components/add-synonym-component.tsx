import * as React from 'react';
// Initialization for ES Users
import { TERipple } from 'tw-elements-react';
import { BehaviorSubject, Subject, debounceTime, distinctUntilChanged, of, takeUntil, tap } from 'rxjs';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { SynonymEventService } from '../services/synonym-service';

const grouping$ = new BehaviorSubject<boolean>(false);

export function AddSynonymContainer() {
    const [word, setWord] = useState('');
    const destory$ = new Subject<void>();

    const createNewAssociation = async (): Promise<AxiosResponse<void>> => {
        const { canonicalForm, associated } = SynonymEventService.getSynonyms();
        return axios.post<void>('http://localhost:4000/api/synonym/new', { canonicalForm, associated: Array.from(associated) });
    };

    useEffect(() => {
        return () => {
            destory$.next();
            destory$.complete();
        }
    }, []);

    //handlChange event handler with dom event type will be used to get the value of the input and setWord
    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        console.log('evt.target.value', evt.target.value)
        setWord(evt.target.value);
        of(evt.target.value.trim())
            .pipe(
                takeUntil(destory$),
                debounceTime(1000), distinctUntilChanged(),
                tap((word: string) => {
                    console.log('doununced word ', word)
                    if (!grouping$.getValue()) {
                        SynonymEventService.setSynonyms({ ...SynonymEventService.getSynonyms(), canonicalForm: word });
                    }
                    return of(word);
                }),
            ).subscribe()
    };

    const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        if (['Space', 'Tab', ' '].includes(evt.key)) {
            evt.preventDefault();
            const term = word.trim();
            const sysonymUnit = SynonymEventService.getSynonyms();
            if (term) {
                SynonymEventService.setSynonyms({
                    ...sysonymUnit,
                    associated: new Set([...sysonymUnit.associated, term])
                });
            }
            grouping$.next(true);
            setWord('');
        }
    };

    return (
        <div className="mb-3 md:w-96">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <input
                    id="add-synonym"
                    className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                    placeholder="Add"
                    aria-label="Add"
                    aria-describedby="button-addon1"
                    value={word}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />

                {/* <!--Search button--> */}
                <TERipple color="light">
                    <button
                        onClick={(e) => { e.preventDefault(); createNewAssociation() }}
                        className="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                        type="button"
                        id="button-addon1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                </TERipple>
            </div>
        </div>
    );
}