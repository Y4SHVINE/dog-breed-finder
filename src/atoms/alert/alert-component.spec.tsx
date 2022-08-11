import React from 'react';
import Alert from './alert-component';
import { render } from '@testing-library/react';
import { errors } from '../../utils/messages/error-message-util';
import '@testing-library/jest-dom';

describe('alert component tests', (): void => {
  test('display error message', (): void => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <Alert
        message={errors.generalError}
        severity="error"
        onClose={onClose}
        autoHideDuration={10000}
      />,
    );
    expect(getByTestId('alert-message-container-id').textContent).toBe(
      errors.generalError,
    );
  });
});
