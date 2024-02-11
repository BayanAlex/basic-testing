import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 2, b: 5, action: Action.Add, expected: 7 },
  { a: -2, b: 5, action: Action.Add, expected: 3 },
  { a: 10, b: Infinity, action: Action.Add, expected: Infinity },

  { a: 10, b: 12, action: Action.Subtract, expected: -2 },
  { a: 10, b: -12, action: Action.Subtract, expected: 22 },

  { a: 5, b: 8, action: Action.Multiply, expected: 40 },
  { a: 5, b: 0, action: Action.Multiply, expected: 0 },
  { a: 5, b: -8, action: Action.Multiply, expected: -40 },

  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 10, b: -2, action: Action.Divide, expected: -5 },
  { a: 10, b: 0, action: Action.Divide, expected: Infinity },

  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: -2, b: 3, action: Action.Exponentiate, expected: -8 },
  { a: -2, b: 4, action: Action.Exponentiate, expected: 16 },
  { a: 2, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 0, b: 3, action: Action.Exponentiate, expected: 0 },
  { a: 4, b: 0.5, action: Action.Exponentiate, expected: 2 },
  { a: 2, b: -1, action: Action.Exponentiate, expected: 0.5 },

  { a: 2, b: 3, action: 'Invalid', expected: null },
  { a: 2, b: 3, action: null, expected: null },

  { a: 'Invalid', b: 3, action: Action.Add, expected: null },
  { a: null, b: 3, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    '$a $action $b = $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
