import React, { useCallback, useEffect, useState } from 'react';
import { getImagesByBreed } from '../../../services/dog-service';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Grid } from '@mui/material';
import './gallery-component.scss';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { errors } from '../../../utils/messages/error-message-util';
import Alert from '../../../atoms/alert/alert-component';

interface GalleryProps {
  /**
   * CSS classname for the outermost element.
   */
  className?: string;
  /**
   * Selected Breed
   */
  selectedBreed: string;
}

const Gallery = ({ className, selectedBreed }: GalleryProps): JSX.Element => {
  const [images, setImages] = useState<string[]>([]);
  const loaderDiv = React.createRef<HTMLInputElement>();
  const [error, setError] = useState<boolean>(false);

  const fetchImages = () => {
    getImagesByBreed(selectedBreed, 20)
      .then(res => {
        const imageData = res?.data?.message || [];
        setImages(currentImages => {
          const filteredImages = imageData.filter(
            img => currentImages.indexOf(img) === -1,
          );
          return [...currentImages, ...filteredImages];
        });
      })
      .catch(() => setError(true));
  };

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && selectedBreed) {
        fetchImages();
      }
    },
    [selectedBreed],
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderDiv.current) observer.observe(loaderDiv.current);
  }, [handleObserver]);

  return (
    <div className={className}>
      {error && (
        <Alert
          message={errors.imageFetchError}
          severity="error"
          onClose={() => setError(false)}
        />
      )}
      <Grid
        container
        spacing={2}
        className="m-auto container justify-content-center image-grid-container"
      >
        {images.map((image, index) => (
          <figure key={index}>
            <LazyLoadImage alt={image} src={image} className="img-grid-item" />
          </figure>
        ))}
      </Grid>
      <div ref={loaderDiv} />
    </div>
  );
};

Gallery.defaultProps = {
  className: null,
};

export default Gallery;
