import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const expectedValue = {
    value: 1,
    next: {
      value: 'test',
      next: {
        value: true,
        next: {
          value: null,
          next: null,
        },
      },
    },
  };

  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const list = generateLinkedList([1, 'test', true]);
    expect(list).toStrictEqual(expectedValue);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const list = generateLinkedList([1, 'test', true]);
    expect(list).toMatchSnapshot(expectedValue);
  });
});
