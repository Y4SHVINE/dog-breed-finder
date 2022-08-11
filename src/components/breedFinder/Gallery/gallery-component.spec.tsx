import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from './gallery-component';

const intersectionObserverMock = () => ({
  observe: () => null,
});

describe('gallery component test', (): void => {
  beforeAll(() => {
    window.IntersectionObserver = jest
      .fn()
      .mockImplementation(intersectionObserverMock);
  });

  test('render without crashing', (): void => {
    const div = document.createElement('div');
    ReactDOM.render(<Gallery selectedBreed="pug" />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
