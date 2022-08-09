import React from 'react';
import './header-component.css';

interface HeaderProps {
  /**
   * CSS classname for the outermost element.
   */
  className?: string;
}

const Header = ({ className }: HeaderProps): JSX.Element => {
  return (
    <div className={className}>
      <div className="header-section">
        <img
          src="https://ik.imagekit.io/yashvine/dog-breed-finder/dog-vector.jpg"
          alt="logo image"
        />
        <h2>Dog Breed Finder</h2>
      </div>
    </div>
  );
};

Header.defaultProps = {
  className: null,
};

export default Header;
