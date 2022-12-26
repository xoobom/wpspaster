/*
 * @Author: lifuhai
 * @Date: 2021-04-06 15:02:59
 * @LastEditTime: 2022-10-28 17:16:46
 * @LastEditors: lifuhai
 * @FilePath: /wpspaster-vue2-demo/tests/unit/utils/validate.spec.js
 * @Description: 
 */
import { validUsername, validURL, validLowerCase, validUpperCase, validAlphabets } from '@/utils/validate.js';
describe('Utils:validate', () => {
  it('validUsername', () => {
    expect(validUsername('admin')).toBe(true);
    expect(validUsername('editor')).toBe(true);
    expect(validUsername('xxxx')).toBe(false);
  });
  it('validURL', () => {
  });
  it('validLowerCase', () => {
    expect(validLowerCase('abc')).toBe(true);
    expect(validLowerCase('Abc')).toBe(false);
    expect(validLowerCase('123abc')).toBe(false);
  });
  it('validUpperCase', () => {
    expect(validUpperCase('ABC')).toBe(true);
    expect(validUpperCase('Abc')).toBe(false);
    expect(validUpperCase('123ABC')).toBe(false);
  });
  it('validAlphabets', () => {
    expect(validAlphabets('ABC')).toBe(true);
    expect(validAlphabets('Abc')).toBe(true);
    expect(validAlphabets('123aBC')).toBe(false);
  });
});
