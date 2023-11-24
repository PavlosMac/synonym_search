import * as React from 'react';
import { useState } from 'react';
import { SearchContainer } from './search-input-component';
import { Chips } from './chips-component';
import { CanonicalKeyword } from './canonical-keyword-component';


export default function SynonymSearch() {
    const [synonyms, setSynonyms] = useState([]);

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <div className="flex flex-col w-full max-w-md"> {/* Adjust width as needed */}
                <CanonicalKeyword />
                <SearchContainer />
                <Chips />
            </div>
        </div>
    );
}