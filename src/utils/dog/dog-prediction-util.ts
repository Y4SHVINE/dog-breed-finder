import { BreedList } from '../../interfaces/breeds-response-model';
import { Prediction } from '../../interfaces/prediction-model';

const isPredictionABreed = (
  predictedName: string,
  allBreeds: BreedList,
): boolean => {
  const allNameCategories = predictedName.toLowerCase().split(' ');
  const breedKeys = Object.keys(allBreeds);

  // sticking to two sub categories for initial implementation
  const mainBreedName = allNameCategories.pop();
  const subBreedName =
    allNameCategories.length > 0 ? allNameCategories.pop() : '';

  let breed = breedKeys.find(
    bk =>
      bk === `${mainBreedName}${subBreedName}` ||
      bk === `${subBreedName}${mainBreedName}`,
  );

  if (breed !== undefined) return true;

  if (subBreedName !== '') breed = breedKeys.find(bn => bn === mainBreedName);

  if (breed !== undefined && subBreedName !== '') {
    if (allBreeds[breed].length > 0) {
      const subBreed = allBreeds[breed].find(sbn => sbn === subBreedName);
      return subBreed !== undefined;
    }
    return false;
  }
  return breed !== undefined;
};

export const mostReleventPrediction = (
  predictions: Prediction[],
  allBreeds: BreedList,
): Prediction | undefined => {
  return predictions.find((prediction: Prediction): boolean => {
    const predictedNames: string[] = prediction.className.split(', ');
    return (
      predictedNames.find(name => isPredictionABreed(name, allBreeds)) !==
      undefined
    );
  });
};

export const findSpecificBreed = (
  prediction: Prediction | undefined,
  allBreeds: BreedList,
): string => {
  const nameList = prediction!.className.toLowerCase().split(', ');
  const breedKeys = Object.keys(allBreeds);
  let breedKey: string = '';

  for (let i = 0; i < nameList.length; i++) {
    const nameItem = nameList[i];
    const allNameCategories = nameItem.toLowerCase().split(' ');

    // for joined names
    const jNameBreed = breedKeys.find(jn => jn === allNameCategories.join(''));
    if (jNameBreed !== undefined) {
      breedKey = jNameBreed;
      break;
    }

    // for name categories
    for (let i = 0; i < allNameCategories.length; i++) {
      const nameElement = allNameCategories[i];
      const keyBreed = breedKeys.find(bk => bk === nameElement);
      if (keyBreed !== undefined) {
        breedKey = keyBreed;
        break;
      }
    }
    if (breedKey !== '') break;
  }
  return breedKey;
};
