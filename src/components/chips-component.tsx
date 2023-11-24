import * as React from 'react';
import { useEffect, useState } from 'react';
import { SynonymEventService } from '../services/synonym-service';


export const Chips = () => {
  const [words, setSynonymWords] = useState<string[]>([]);

  // useEffect(() => {
  //   const subscription = SynonymEventService.getSynonymsNotification().subscribe((item: SynonymUnit) => {
  //     // setSynonymWords(item.associated);
  //   });

  //   return () => {
  //     subscription.unsubscribe();
  //   }
  // }, [])

  return (
    <div className="gap-2"> {/* Set a fixed height and allow vertical scrolling */}
      {words.map((w: string, index: number) => (
        <div
          key={index}
          data-te-chip-init
          data-te-ripple-init
          className="[word-wrap: break-word] my-[5px] mr-4 flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] bg-[#eceff1] px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1] dark:bg-neutral-600 dark:text-neutral-200">

          John Doe
          <span
            data-te-chip-close
            className="float-right w-4 cursor-pointer pl-[8px] text-[16px] text-[#afafaf] opacity-[.53] transition-all duration-200 ease-in-out hover:text-[#8b8b8b] dark:text-neutral-400 dark:hover:text-neutral-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-3 w-3">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        </div>
      ))}
    </div>
  );
}

{/* <span
key={index}
className="inline-block m-1 whitespace-nowrap rounded-full bg-info-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-info-800">
{w}
</span> */}