import * as React from 'react';
import { TERipple, TEToast, TETooltip } from 'tw-elements-react';
import { BehaviorSubject, Observable, Subject, debounceTime, from, of, takeUntil, tap } from 'rxjs';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { SynonymEventService } from '../services/synonym-service';
import { SynonymUnit } from '../types/synonym';
import { BASE_URI } from '../config';

export function AddSynonymContainer() {
    const [word, setWord] = useState('');
    const [open, setOpen] = useState(false);
    const [others, setOthers] = useState('');
    const destory$ = new Subject<void>();

    const createNewAssociation = async (): Promise<void> => {
        const { canonicalForm, associated } = SynonymEventService.getSynonyms();
        const response = await axios.post<{ canonicalForm: string, associated: string[] }>(`${BASE_URI}/api/synonym/new`, { canonicalForm, associated: Array.from(associated) });
        if (response.status === 201) {
            setWord(response.data.canonicalForm);
            setOthers(response.data.associated.join(', '));
            setOpen(true);
        }

    };

    useEffect(() => {
        return () => {
            destory$.next();
            destory$.complete();
        }
    }, []);

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setWord(evt.target.value);
    };

    const handleToastClose = (): void => {
        setOthers('');
        setWord('');
        SynonymEventService.setSynonyms({ canonicalForm: '', associated: new Set([]) });
    }

    const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        if (['Space', 'Tab', ' '].includes(evt.key)) {
            evt.preventDefault();
            const term = word.trim();
            const sysonymUnit = SynonymEventService.getSynonyms();
            if (term) {
                if (sysonymUnit.canonicalForm) {
                    SynonymEventService.setSynonyms({
                        ...sysonymUnit,
                        associated: new Set([...sysonymUnit.associated, term])
                    });
                } else {
                    SynonymEventService.setSynonyms({ ...SynonymEventService.getSynonyms(), canonicalForm: word });
                }

            }
            setWord('');
        }
    };

    return (
        <div className="mb-3 md:w-96">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <input
                    id="add-synonym"
                    className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                    placeholder="add word to bank with space"
                    aria-label="Add"
                    aria-describedby="button-addon1"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    value={word}
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

            <TEToast open={open} autohide={true} delay={4000} setOpen={setOpen} onClose={handleToastClose}>
                <div className="flex items-center justify-between rounded-t-lg border-b-2 border-neutral-100 border-opacity-100 bg-clip-padding px-4 pb-2 pt-2.5">
                    <p className="font-bold text-neutral-500 dark:text-neutral-400">
                        New Word Bank:
                    </p>
                    <p className="text-neutral-300 dark:text-neutral-400">
                        New Word Bank:
                    </p>
                    <div className="flex items-center">
                        <button
                            type="button"
                            className="ml-2 box-content rounded-none border-none opacity-80 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                            onClick={() => setOpen(false)}
                            aria-label="Close"
                        >
                            <span className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
                <div className="break-words rounded-b-lg px-4 py-4 text-neutral-700 dark:text-neutral-200">
                    {others}
                </div>
            </TEToast>
        </div>
    );
}