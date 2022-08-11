import React from 'react';
import './header-component.scss';
import logo from '../../../assets/logo.png';

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
        <img src={logo} alt="Dog Breed Finder" />
        <h2>Dog Breed Finder</h2>
      </div>
    </div>
  );
};

Header.defaultProps = {
  className: null,
};

export default Header;
