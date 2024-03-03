import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 5, action: Action.Add })).toBe(7);
    expect(simpleCalculator({ a: -2, b: 5, action: Action.Add })).toBe(3);
    expect(simpleCalculator({ a: 10, b: Infinity, action: Action.Add })).toBe(
      Infinity,
    );
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 12, action: Action.Subtract })).toBe(
      -2,
    );
    expect(simpleCalculator({ a: 10, b: -12, action: Action.Subtract })).toBe(
      22,
    );
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 8, action: Action.Multiply })).toBe(40);
    expect(simpleCalculator({ a: 5, b: 0, action: Action.Multiply })).toBe(0);
    expect(simpleCalculator({ a: 5, b: -8, action: Action.Multiply })).toBe(
      -40,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 2, action: Action.Divide })).toBe(5);
    expect(simpleCalculator({ a: 10, b: -2, action: Action.Divide })).toBe(-5);
    expect(simpleCalculator({ a: 10, b: 0, action: Action.Divide })).toBe(
      Infinity,
    );
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate })).toBe(
      8,
    );
    expect(simpleCalculator({ a: -2, b: 3, action: Action.Exponentiate })).toBe(
      -8,
    );
    expect(simpleCalculator({ a: -2, b: 4, action: Action.Exponentiate })).toBe(
      16,
    );
    expect(simpleCalculator({ a: 2, b: 0, action: Action.Exponentiate })).toBe(
      1,
    );
    expect(simpleCalculator({ a: 0, b: 3, action: Action.Exponentiate })).toBe(
      0,
    );
    expect(
      simpleCalculator({ a: 4, b: 0.5, action: Action.Exponentiate }),
    ).toBe(2);
    expect(simpleCalculator({ a: 2, b: -1, action: Action.Exponentiate })).toBe(
      0.5,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: 'Invalid' })).toBe(null);
    expect(simpleCalculator({ a: 2, b: 3, action: null })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 'Invalid', b: 3, action: Action.Add })).toBe(
      null,
    );
    expect(simpleCalculator({ a: null, b: 3, action: Action.Add })).toBe(null);
  });
});
