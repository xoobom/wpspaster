// 处理基站相关数据
// 获取基站的经纬度，先从本地缓存中进行获取，缓存中不存在的，才访问api获取
// 获取
import { getJiZhanLocation } from '@/api/map';
/*
 * 0 移动 key 基站代码，value 基站的经纬度信息
 * 1 联通
 * 2 电信
 */
const defaultPointLocation = {
  0: {
    20986: { errcode: 0, lat: '40.00954', lon: '116.486137', radius: '900', address: '北京市朝阳区来广营地区壮家坟;溪阳东路与东湖渠路口北287米' },
  },
  1: {},
  2: {},
};

function setLocalStorage(mnc, lac, ci, value) {
  let pointLocation = getLocalStorage('pointData');
  pointLocation[mnc][ci] = value;
  window.localStorage.setItem('pointData', JSON.stringify(pointLocation));
}

function getLocalStorage(key, defaultValue = defaultPointLocation) {
  let pointLocation = JSON.parse(window.localStorage.getItem(key)) || defaultValue;
  return pointLocation;
}

async function getLocation(item) {
  // 1、先在缓存中进行查询，没有的话，再请求接口
  const data = getLocalStorage('pointData');
  const { mnc, lac, ci } = item;
  if (mnc in data && ci in data[mnc]) {
    // 有这个数据，可以直接返回
    return data[mnc][ci];
  } else {
    // 没有这个数据，需要调用接口获取
    // 组装数据
    const query = {
      mcc: 460,
      mnc: mnc,
      lac: lac,
      ci: ci,
      output: 'json',
      coord: 'bd09',
    };
    const res = await getJiZhanLocation(query);
    if (res.errcode == 0) {
      // 接口调用成功
      // 返回数据
    } else {
      // 接口调用失败
    }
    // 无论成功与否，都将接口调用的数据缓存到本地
    setLocalStorage(mnc, lac, ci, res);
    return res;
  }
}

let radixConvert = (num, fromRadix, toRadix) => parseInt(num, fromRadix).toString(toRadix);

// 格式化数据
function formatExcelData(item) {
  // 移动 小区代码lac 基站代码ci 需要16进制转10进制
  // 联通 小区号lac 基站号ci
  // 判断出来是移动联通还是电信
  let mnc = 2;
  let lac = item['小区号']; // 联通的是小区号对应lac
  let ci = item['基站号']; // 联通的是基站号对应ci
  if ('小区代码' in item) {
    mnc = 0;
    let xiaoqudaima = item['小区代码'];
    xiaoqudaima = xiaoqudaima.replace('[', '').replace(']', '');
    xiaoqudaima = radixConvert(xiaoqudaima, 16, 10);
    let jizhandaima = item['基站代码'];
    jizhandaima = jizhandaima.split('|')[0];
    jizhandaima = radixConvert(jizhandaima, 16, 10);
    lac = xiaoqudaima;
    ci = jizhandaima;
  } else if ('小区号' in item) {
    mnc = 1;
  }
  return { ...item, mnc, lac, ci };
}

export { getLocation, formatExcelData };
