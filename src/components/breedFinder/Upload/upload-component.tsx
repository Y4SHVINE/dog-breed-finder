import React, { ChangeEvent, useState } from 'react';
import './upload-component.scss';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

interface UploadProps {
  /**
   * CSS classname for the outermost element.
   */
  className?: string;
  /**
   * set uploaded Image Function
   */
  setUploadedImage: (target: EventTarget) => void;
}

const Upload = ({ className, setUploadedImage }: UploadProps): JSX.Element => {
  const [imgSrc, setImgSrc] = useState('');

  const handleClick = () => {
    fileInput.current!.click();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = event => {
      setImgSrc(event.target!.result as string);
    };
    if (event.target.files && event.target.files.length > 0) {
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleLoad = (event: ChangeEvent<HTMLImageElement>) => {
    const { target } = event;
    setUploadedImage(target);
    // console.log(target);
  };

  const fileInput = React.createRef<HTMLInputElement>();

  return (
    <div className={className}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <div className="upload-grid-item-wrapper btn-section">
            <input
              hidden
              type="file"
              ref={fileInput}
              onChange={handleChange}
              accept="image/*"
            />
            <Button
              variant="contained"
              className="upload-btn"
              id="upload"
              onClick={handleClick}
            >
              Upload Image
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="upload-grid-item-wrapper">
            {imgSrc && (
              <img
                className="uploaded-img"
                alt="dog image"
                id="img"
                src={imgSrc}
                onLoad={handleLoad}
              />
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

Upload.defaultProps = {
  className: null,
};

export default Upload;
