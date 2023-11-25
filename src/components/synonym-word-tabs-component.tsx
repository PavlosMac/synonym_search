import React, { useState } from 'react';
import {
    TETabs,
    TETabsContent,
    TETabsItem,
    TETabsPane,
} from 'tw-elements-react';
import { SynonymEventService } from '../services/synonym-service';
import { CanonicalKeyword } from './canonical-keyword-component';
import { SearchContainer } from './search-input-component';
import { SynonymsComponent } from './synonyms-component';
import { AddSynonymContainer } from './add-synonym-component';

export default function SynonymWordTabs(): JSX.Element {
    const [basicActive, setBasicActive] = useState('tab1');

    const handleBasicClick = (value: string) => {
        resetSynonymUnit()
        if (value === basicActive) {
            return;
        }
        setBasicActive(value);
    };

    const resetSynonymUnit = () => {
        SynonymEventService.setSynonyms({ canonicalForm: '', associated: new Set([]) })
    }

    return (
        <div className="grid grid-cols-1 grid-flow-col min-h-full w-1000">
            <div className="mb-3">
                <TETabs>
                    <TETabsItem
                        onClick={() => handleBasicClick('tab1')}
                        active={basicActive === 'tab1'}
                    >
                        Search
                    </TETabsItem>
                    <TETabsItem
                        onClick={() => handleBasicClick('tab2')}
                        active={basicActive === 'tab2'}
                    >
                        Add
                    </TETabsItem>
                </TETabs>
                <div className="">
                    <CanonicalKeyword />
                </div>
                <TETabsContent>
                    <TETabsPane show={basicActive === 'tab1'}>

                        <div className="">
                            <SearchContainer />
                        </div>

                    </TETabsPane>
                    <TETabsPane show={basicActive === 'tab2'}>
                        <div className="">
                            <AddSynonymContainer />
                        </div>
                    </TETabsPane>

                    <div className="">
                        <SynonymsComponent />
                    </div>
                </TETabsContent>
            </div>
        </div >
    );
}