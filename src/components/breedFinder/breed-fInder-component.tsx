import React from 'react';
import './breed-fInder-component.css';
import Header from './Header/header-component';

interface BreedFinderProps {
  /**
   * CSS classname for the outermost element.
   */
  className?: string;
}

const BreedFinder = ({ className }: BreedFinderProps): JSX.Element => {
  return (
    <div className={className}>
      <Header />
    </div>
  );
};

BreedFinder.defaultProps = {
  className: null,
};

export default BreedFinder;
