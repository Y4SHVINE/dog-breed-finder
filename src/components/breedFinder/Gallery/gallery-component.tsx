import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getImagesByBreed } from '../../../services/dog-service';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Grid } from '@mui/material';
import './gallery-component.scss';
import 'react-lazy-load-image-component/src/effects/blur.css';

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
  const loaderDiv = useRef(null);

  const fetchImages = () => {
    getImagesByBreed(selectedBreed, 10).then(res => {
      const imageData = res?.data?.message || [];
      setImages(currentImages => {
        const filteredImages = imageData.filter(
          img => currentImages.indexOf(img) === -1,
        );
        return [...currentImages, ...filteredImages];
      });
    });
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
      <Grid container spacing={2} className="image-grid-container">
        {images.map((image, index) => (
          <Grid item xs={12} md={6} className="img-grid-item" key={index}>
            <LazyLoadImage
              alt={image}
              height="100%"
              src={image}
              width="100%"
              effect="blur"
              placeholderSrc="https://ik.imagekit.io/yashvine/dog-breed-finder/dog-vector.jpg"
            />
          </Grid>
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
