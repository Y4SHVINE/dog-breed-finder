import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getImagesByBreed } from '../../../services/dog-service';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './gallery-component.scss';
import { Grid } from '@mui/material';

interface GalleryProps {
  /**
   * CSS classname for the outermost element.
   */
  className?: string;
  /**
   * Selected Breed
   */
  selectedBreed?: string;
}

const Gallery = ({ className, selectedBreed }: GalleryProps): JSX.Element => {
  const [images, setImages] = useState<string[]>([]);
  const loader = useRef(null);

  const fetchImages = () => {
    getImagesByBreed(selectedBreed || '').then(res => {
      const imageData = res?.data?.message || [];
      setImages(currentImages => [...currentImages, ...imageData]);
    });
  };

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        selectedBreed !== null &&
        selectedBreed !== ''
      ) {
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
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <div className={className}>
      <Grid container spacing={2} className="image-grid-container">
        {images.map((image, index) => (
          <Grid item xs={12} md={6} className="img-grid-item" key={index}>
            <LazyLoadImage
              alt={image}
              height="100%"
              src={image}
              width="100%"
              placeholder={<h4>Loading...</h4>}
            />
          </Grid>
        ))}
      </Grid>
      <div ref={loader} />
    </div>
  );
};

Gallery.defaultProps = {
  className: null,
};

export default Gallery;
