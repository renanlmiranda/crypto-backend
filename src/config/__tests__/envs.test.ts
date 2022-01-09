import { envs } from '../envs';

describe('teste envs file', () => {
  test('env function', () => {
    expect(envs).toHaveProperty('jwtSecret');
    expect(envs).toHaveProperty('jwtTimeOut');
  });
});
