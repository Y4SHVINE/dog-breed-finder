import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from './gallery-component';

const intersectionObserverMock = () => ({
  observe: () => null,
});
window.IntersectionObserver = jest
  .fn()
  .mockImplementation(intersectionObserverMock);

describe('gallery component test', (): void => {
  test('reder without crashing', (): void => {
    const div = document.createElement('div');
    ReactDOM.render(<Gallery selectedBreed="husky" />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
