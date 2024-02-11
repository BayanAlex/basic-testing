import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const createOptions = {
  baseURL: 'https://jsonplaceholder.typicode.com',
};

const response = {
  data: 'Test data',
};

const path = 'posts';

let get: () => typeof response;
let instance: { get: typeof get };

beforeEach(() => {
  get = () => response;
  instance = { get };
});

jest.mock('axios', () => {
  const create = () => ({ get });
  return {
    create,
  };
});

jest.mock('lodash', () => ({
  throttle: (fn: () => unknown) => fn,
}));

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(path);
    expect(axios.create).toHaveBeenCalledWith(createOptions);
    expect(axios.create).toHaveReturnedWith(instance);
  });

  test('should perform request to correct provided url', async () => {
    get = jest.fn().mockImplementation(get);
    await throttledGetDataFromApi(path);
    expect(get).toHaveBeenCalledWith(path);
    expect(get).toHaveReturnedWith(response);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(path);
    expect(result).toBe(response.data);
  });
});
