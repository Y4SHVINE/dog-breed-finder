import { BreedListResponse } from '../interfaces/breeds-response-model';
import axios, { AxiosResponse } from 'axios';
import { BreedImagesResponse } from '../interfaces/breed-images-response.model';

const baseUrl = 'https://dog.ceo/api/';

export const getAllDogBreeds = async (): Promise<AxiosResponse<
  BreedListResponse
>> => {
  return axios.get(`${baseUrl}breeds/list/all`);
};

export const getImagesByBreed = async (
  breed: string,
): Promise<AxiosResponse<BreedImagesResponse>> => {
  return axios.get(`${baseUrl}breed/${breed}/images`);
};
