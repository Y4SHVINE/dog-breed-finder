import fetchMock from 'fetch-mock';
import { BreedList } from '../interfaces/breeds-response-model';
import { getAllDogBreeds, getImagesByBreed } from './dog-service';

describe('testing getAllBreedList function', (): void => {
  afterEach((): void => {
    fetchMock.restore();
  });
  test('returns list of breeds', async (): Promise<void> => {
    expect.assertions(2);
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
    fetchMock.getOnce('https://dog.ceo/api/breeds/list/all', {
      message: breedList,
    });
    const response = await getAllDogBreeds();
    expect(response.data.message['dhole']).toMatchObject(breedList['dhole']);
    expect(response.data.message['finnish']).toMatchObject(
      breedList['finnish'],
    );
  });
});

describe('testing getImagesByBreed function', (): void => {
  afterEach((): void => {
    fetchMock.restore();
  });
  test('returns 5 images for the given breed', async (): Promise<void> => {
    expect.assertions(1);
    const images = ['pug', 'pug', 'pug', 'pug', 'pug'];
    fetchMock.getOnce('https://dog.ceo/api/breed/pug/images/random/5', {
      message: images,
    });
    const response = await getImagesByBreed('germanshepherd', 5);
    expect(response.data.message.length).toStrictEqual(images.length);
  });
});
