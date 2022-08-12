import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import React, { useEffect } from 'react';

interface AlertProps {
  /**
   * CSS classname for the outermost element.
   */
  className?: string;
  /**
   * Auto hide duration default - 4s
   */
  autoHideDuration?: number;
  /**
   * Alert message
   */
  message: string;
  /**
   * Alert severity
   */
  severity: 'error' | 'info' | 'warning' | 'success';
  /**
   * On allert close
   */
  onClose: () => void;
}

const Alert = ({
  className,
  autoHideDuration,
  message,
  severity,
  onClose,
}: AlertProps): JSX.Element => {
  const [open, setOpen] = React.useState(false);

  useEffect((): void => {
    setOpen(true);
  });

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    onClose();
  };

  return (
    <Snackbar
      className={className}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <MuiAlert
        data-testid="alert-message-container-id"
        className="alert-message-container"
        onClose={handleClose}
        severity={severity}
        sx={{ width: '100%' }}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

Alert.defaultProps = {
  className: null,
  autoHideDuration: 4000,
};

export default Alert;
