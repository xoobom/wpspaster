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
