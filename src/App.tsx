import React from 'react';
import SynonymWordTabs from './components/synonym-word-tabs-component';
import { BASE_URI } from './config';

function App() {
  console.log(BASE_URI)
  return (
    <div className="h-screen flex items-center justify-center">
      <SynonymWordTabs />
    </div>
  );
}

export default App;