import { BreedList } from '../../interfaces/breeds-response-model';
import { Prediction } from '../../interfaces/prediction-model';
import {
  findSpecificBreed,
  mostReleventPrediction,
} from './dog-prediction-util';

describe('mostReleventPrediction function tests', (): void => {
  test('correct prediction should be returned', (): void => {
    expect.assertions(3);
    const breedList: BreedList = {
      dhole: [],
      dingo: [],
      doberman: [],
      elkhound: ['norwegian'],
      entlebucher: [],
      eskimo: [],
      finnish: ['lapphund'],
      germanshepherd: [],
    };
    const predictionList1: Prediction[] = [
      {
        className: 'dingo',
        probability: 0.985,
      },
      {
        className: 'pug',
        probability: 0.985,
      },
      {
        className: 'finnish',
        probability: 0.985,
      },
    ];
    const predictionList2: Prediction[] = [
      {
        className: 'computer',
        probability: 0.985,
      },
      {
        className: 'house',
        probability: 0.985,
      },
      {
        className: 'german shepherd',
        probability: 0.985,
      },
    ];
    const predictionList3: Prediction[] = [
      {
        className: 'computer',
        probability: 0.985,
      },
      {
        className: 'house',
        probability: 0.985,
      },
      {
        className: 'bottle',
        probability: 0.985,
      },
    ];
    expect(mostReleventPrediction(predictionList1, breedList)).toBe(
      predictionList1[0],
    );
    expect(mostReleventPrediction(predictionList2, breedList)).toBe(
      predictionList2[2],
    );
    expect(mostReleventPrediction(predictionList3, breedList)).toBe(undefined);
  });
});

describe('findSpecificBreed function tests', (): void => {
  test('correct breed should be returned', (): void => {
    expect.assertions(3);
    const breedList: BreedList = {
      dhole: [],
      dingo: [],
      doberman: [],
      elkhound: ['norwegian'],
      entlebucher: [],
      eskimo: [],
      finnish: ['lapphund'],
      germanshepherd: [],
    };
    const prediction1: Prediction = {
      className: 'dingo',
      probability: 0.985,
    };
    const prediction2: Prediction = {
      className: 'german shepherd',
      probability: 0.985,
    };
    const prediction3: Prediction = {
      className: 'computer',
      probability: 0.985,
    };

    expect(findSpecificBreed(prediction1, breedList)).toBe('dingo');
    expect(findSpecificBreed(prediction2, breedList)).toBe('germanshepherd');
    expect(findSpecificBreed(prediction3, breedList)).toBe('');
  });
});
