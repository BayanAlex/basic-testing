import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    jest.runAllTimers();
    expect(setTimeout).toHaveBeenLastCalledWith(callback, 1000);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    jest.runOnlyPendingTimers();
    expect(setInterval).toHaveBeenLastCalledWith(callback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledTimes(1);
    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledTimes(2);
    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = './file.txt';

  test('should call join with pathToFile', async () => {
    jest.spyOn(fs, 'existsSync').mockImplementation(() => false);
    const spy = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(spy).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockImplementation(() => false);
    expect(readFileAsynchronously(pathToFile)).resolves.toBe(null);
  });

  test('should return file content if file exists', async () => {
    const testContent = 'test content';
    jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
    jest
      .spyOn(fsPromises, 'readFile')
      .mockImplementation(async () => testContent);
    expect(readFileAsynchronously(pathToFile)).resolves.toBe(testContent);
  });
});
