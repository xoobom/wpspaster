/*
 * @Author: lifuhai
 * @Date: 2021-04-06 15:02:59
 * @LastEditTime: 2022-10-28 17:16:52
 * @LastEditors: lifuhai
 * @FilePath: /wpspaster-vue2-demo/tests/unit/utils/param2Obj.spec.js
 * @Description: 
 */
import { param2Obj } from '@/utils/index.js';
describe('Utils:param2Obj', () => {
  const url = '';

  it('param2Obj test', () => {
    expect(param2Obj(url)).toEqual({
      name: 'bill',
      age: '29',
      sex: '1',
      field: window.btoa('test'),
      key: '测试',
    });
  });
});
