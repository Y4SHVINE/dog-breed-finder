import React, { useEffect, useState } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import './breed-fInder-component.scss';
import Header from './Header/header-component';
import Upload from './Upload/upload-component';
import Gallery from './Gallery/gallery-component';
import { Prediction } from '../../interfaces/prediction-model';
import { BreedList } from '../../interfaces/breeds-response-model';
import { getAllDogBreeds } from '../../services/dog-service';
import {
  findSpecificBreed,
  mostReleventPrediction,
} from '../../utils/dog/dog-prediction-util';
import { errors } from '../../utils/messages/error-message-util';
import Alert from '../../atoms/alert/alert-component';

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
  const [allBreeds, setAllBreeds] = useState<BreedList>({});
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  const loadModel = async (): Promise<mobilenet.MobileNet> => {
    return await mobilenet.load({ version, alpha });
  };

  const predictImage = async (
    uploadedImage: HTMLImageElement,
  ): Promise<Prediction[]> => {
    return await model!.classify(uploadedImage);
  };

  const getAllBreeds = () => {
    getAllDogBreeds().then(res => {
      setAllBreeds(res?.data?.message);
    });
  };

  useEffect((): void => {
    if (model === null) {
      loadModel().then(
        (loadedModel: mobilenet.MobileNet) => {
          setModel(loadedModel);
        },
        (_): void => {
          setError(true);
        },
      );
    }
    if (Object.keys(allBreeds).length === 0) getAllBreeds();
  }, []);

  const getPredictionByImage = (uploadedImage: HTMLImageElement) => {
    if (model && uploadedImage) {
      setSelectedBreed(null);
      predictImage(uploadedImage).then(
        predictions => {
          if (predictions) {
            const correctPrediction = mostReleventPrediction(
              predictions,
              allBreeds,
            );
            setSelectedBreed(findSpecificBreed(correctPrediction, allBreeds));
          }
        },
        (): void => {
          setError(true);
        },
      );
    }
  };

  return (
    <div className={className}>
      {error && (
        <Alert
          message={errors.generalError}
          severity="error"
          onClose={() => setError(false)}
        />
      )}
      <Header />
      <div className="selected-breed">{selectedBreed?.toUpperCase()}</div>
      <Upload setUploadedImage={getPredictionByImage} />
      {selectedBreed && <Gallery selectedBreed={selectedBreed || ''} />}
    </div>
  );
};

BreedFinder.defaultProps = {
  className: null,
};

export default BreedFinder;
