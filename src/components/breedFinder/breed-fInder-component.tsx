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

  const loadModel = async (): Promise<mobilenet.MobileNet> => {
    return await mobilenet.load({ version, alpha });
  };

  const predictImage = async (uploadedImage):Promise<void> =>{
    return await model.classify(uploadedImage);
  }

  useEffect((): void => {
    if (model === null) {
      loadModel().then(
        (loadedModel: mobilenet.MobileNet) => {
          setModel(loadedModel);
        },
        (error): void => {
          console.error(error);
        },
      );
    }
  }, []);

  const getPredictionByImage = (uploadedImage) =>{
    if(model && uploadedImage){
      predictImage(uploadedImage).then(
        (prediction) => {
          debugger
          console.log(prediction);
        },
        (error): void => {
          debugger
          console.error(error);
        },
      );
    }
  }

  return (
    <div className={className}>
      <Header />
      <Upload setUploadedImage={getPredictionByImage} />
    </div>
  );
};

BreedFinder.defaultProps = {
  className: null,
};

export default BreedFinder;
