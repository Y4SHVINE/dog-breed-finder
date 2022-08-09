import React from 'react';
import BreedFinder from '../breedFinder/breed-fInder-component';
import './app.css';

export const App = (): JSX.Element => {
  return (
    <div className="breed-finder-background">
      <BreedFinder />
    </div>
  );
};
