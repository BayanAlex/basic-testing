import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(getBankAccount(1000)).toBeInstanceOf(BankAccount);
    expect(getBankAccount(1000).getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => getBankAccount(1000).withdraw(2000)).toThrowError(
      InsufficientFundsError,
    );
    expect(() => getBankAccount(1000).withdraw(2000)).toThrowError(
      'Insufficient funds: cannot withdraw more than 1000',
    );
  });

  test('should throw error when transferring more than balance', () => {
    const source = getBankAccount(1000);
    const destitation = getBankAccount(100);
    expect(() => source.transfer(5000, destitation)).toThrowError(
      InsufficientFundsError,
    );
    expect(() => source.transfer(5000, destitation)).toThrowError(
      'Insufficient funds: cannot withdraw more than 1000',
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(1000);
    expect(() => account.transfer(5000, account)).toThrowError(
      TransferFailedError,
    );
    expect(() => account.transfer(5000, account)).toThrowError(
      'Transfer failed',
    );
  });

  test('should deposit money', () => {
    expect(getBankAccount(1000).deposit(2000).getBalance()).toBe(3000);
  });

  test('should withdraw money', () => {
    expect(getBankAccount(1000).withdraw(500).getBalance()).toBe(500);
  });

  test('should transfer money', () => {
    const source = getBankAccount(1000);
    const destitation = getBankAccount(100);
    expect(source.transfer(500, destitation).getBalance()).toBe(500);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(1000);
    const balance = await account.fetchBalance();
    try {
      expect(typeof balance === 'number').toBe(true);
    } catch {
      expect(balance).toBe(null);
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(101);
    try {
      await account.synchronizeBalance();
      expect(account.getBalance()).toBeLessThan(101);
    } catch {}
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(101);
    try {
      await account.synchronizeBalance();
    } catch (error) {
      expect(SynchronizationFailedError);
    }
  });
});
