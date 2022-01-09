import loginService from '../login.service';

describe('test login service file', () => {
  test('compareHash function', () => {
    const password = '123456';
    const hash = '$2b$10$b.MuWrsshwLdIXHLCRVWYOHJ0MjmM/mSLVhcrmF97UHKXP3gXZLsa';
    const result = loginService.compareHash(password, hash);

    expect(result).toBeTruthy();
  });

  test('generateToken function', () => {
    const password = '123456';
    const hash = '$2b$10$b.MuWrsshwLdIXHLCRVWYOHJ0MjmM/mSLVhcrmF97UHKXP3gXZLsa';
    const result = loginService.compareHash(password, hash);

    expect(result).toBeTruthy();
  });
});
