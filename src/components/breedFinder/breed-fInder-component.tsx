import React, { useEffect, useState } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import './breed-fInder-component.scss';
import Header from './Header/header-component';
import Upload from './Upload/upload-component';

interface BreedFinderProps {
  /**
   * CSS classname for the outermost element.
   */
  className?: string;
}

const version = 2;
const alpha = 0.5;

const BreedFinder = ({ className }: BreedFinderProps): JSX.Element => {
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [uploadedImage, setUploadedImage] = useState<EventTarget | null>(null);

  const loadModel = async (): Promise<mobilenet.MobileNet> => {
    return await mobilenet.load({ version, alpha });
  };

  useEffect((): void => {
    if (model === null) {
      loadModel().then(
        (loadedModel: mobilenet.MobileNet) => {
          setModel(loadedModel);
        },
        (error): void => {
          console.log(error);
        },
      );
    }
  }, []);

  useEffect((): void => {
    console.log(model);
    console.log(uploadedImage);
  }, [uploadedImage]);

  return (
    <div className={className}>
      <Header />
      <Upload setUploadedImage={setUploadedImage} />
    </div>
  );
};

BreedFinder.defaultProps = {
  className: null,
};

export default BreedFinder;
