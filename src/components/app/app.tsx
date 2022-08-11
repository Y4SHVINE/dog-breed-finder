import React, { useEffect } from 'react';
import BreedFinder from '../breedFinder/breed-fInder-component';
import './app.scss';

export const App = (): JSX.Element => {
  return (
    <div className="breed-finder-background">
      <BreedFinder />
    </div>
  );
};
