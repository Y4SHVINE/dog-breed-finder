import React, { ChangeEvent, useState } from 'react';
import './upload-component.scss';
import Button from '@mui/material/Button';

interface UploadProps {
  /**
   * CSS classname for the outermost element.
   */
  className?: string;
  /**
   * set uploaded Image Function
   */
  setUploadedImage: (target: HTMLImageElement) => void;
}

const Upload = ({ className, setUploadedImage }: UploadProps): JSX.Element => {
  const [imgSrc, setImgSrc] = useState('');
  const fileInput = React.createRef<HTMLInputElement>();

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
  };

  return (
    <div className={className}>
      <div className="min-vh-100 d-flex align-items-center position-relative">
        <div className="upload-container">
          <div className="content">
            {!imgSrc && <h5>Selected image will appear here</h5>}
            <br />
            {imgSrc && (
              <div className="img-container">
                <img
                  data-testid="uploaded-image"
                  className="uploaded-img"
                  alt="dog image"
                  id="img"
                  src={imgSrc}
                  onLoad={handleLoad}
                />
              </div>
            )}
            <input
              hidden
              type="file"
              ref={fileInput}
              onChange={handleChange}
              accept="image/*"
            />
            <Button
              data-testid="upload-image"
              variant="contained"
              className="upload-btn"
              id="upload"
              onClick={handleClick}
            >
              {imgSrc ? 'Update' : 'Upload'} Image
            </Button>
          </div>
        </div>
        {imgSrc && (
          <h2 className="scroll-text">Scroll to see the fetched images</h2>
        )}
      </div>
    </div>
  );
};

Upload.defaultProps = {
  className: null,
};

export default Upload;
