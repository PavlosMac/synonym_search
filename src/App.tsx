import React from 'react';
import { Chips } from './components/chips-component';
import { SearchContainer } from './components/search-input-component';
import { CanonicalKeyword } from './components/canonical-keyword-component';
import { AddSynonymContainer } from './components/add-synonym-component';
import SynonymWordTabs from './components/main-component';

function App() {
  return (
    <div className="h-screen flex items-center justify-center">
      <SynonymWordTabs />
    </div>
  );
}

export default App;


{/* <div className="flex flex-col w-60 h-14 max-w-md p-4">
<div className="grid grid-rows-4 grid-flow-col h-32 w-100 gap-4">
  <div className="flex-nowrap items-center">
    <CanonicalKeyword />
  </div>
  <div className="flex-nowrap items-center">
    <SearchContainer />
  </div>
  <div className="flex-wrap gap-4 mt-4 h-32 w-100">
    <Chips />
  </div>
</div>
</div> */}