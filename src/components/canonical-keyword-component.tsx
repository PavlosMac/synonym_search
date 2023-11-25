import * as React from 'react';
import { useEffect, useState } from 'react';
import { SynonymEventService } from '../services/synonym-service';
import { SynonymUnit } from '../types/synonym';


export const CanonicalKeyword = () => {
    const [canonical, setCanonical] = useState<string>('')

    useEffect(() => {
        const subscription = SynonymEventService.getSynonym$().subscribe((item: SynonymUnit) => {
            setCanonical(item.canonicalForm);
        });

        return () => {
            subscription.unsubscribe();
        }
    }, [])

    return (
        <div className="min-h-20">
            <h1 className="font-semibold">Canonical Keyword: {canonical} </h1>
        </div>
    );
}


