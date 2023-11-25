import * as React from 'react';
import { useEffect, useState } from 'react';
import { SynonymEventService } from '../services/synonym-service';
import { SynonymUnit } from '../types/synonym';

export const SynonymsComponent = () => {
    const [words, setSynonymWords] = useState<Set<string>>(new Set())

    useEffect(() => {
        const subscription = SynonymEventService.getSynonym$().subscribe((item: SynonymUnit) => {
            setSynonymWords(item.associated);
        });

        return () => {
            subscription.unsubscribe();
        }
    }, [])

    return (
        <React.Fragment>
            <div className="gap-2"> {/* Set a fixed height and allow vertical scrolling */}
                {Array.from(words).map((w: string, index: number) => (
                    <span
                        key={index}
                        className="inline-block m-1 whitespace-nowrap rounded-full bg-info-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-info-800">
                        {w}
                    </span>
                ))}
            </div>
        </React.Fragment>
    );
}