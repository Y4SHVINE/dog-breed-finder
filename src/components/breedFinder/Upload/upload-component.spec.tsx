import { render, waitFor } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import Upload from './upload-component';
import '@testing-library/jest-dom';

describe('upload component tests', (): void => {
  const setUploadedImage = jest.fn();

  test('render without crashing', (): void => {
    const div = document.createElement('div');
    ReactDOM.render(<Upload setUploadedImage={setUploadedImage} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('is upload/update image button visible', async (): Promise<void> => {
    const { getByTestId } = render(
      <Upload setUploadedImage={setUploadedImage} />,
    );
    await waitFor(() => {
      expect(getByTestId('upload-image')).toBeInTheDocument();
    });
  });
});
