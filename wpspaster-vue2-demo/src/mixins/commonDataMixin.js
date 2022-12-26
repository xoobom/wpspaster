/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
/**
 *
 * @param {*} v
 * @returns 生成千分位
 */
function format(v) {
  // return Number(v).toLocaleString();
  const reg = /\d{1,3}(?=(\d{3})+$)/g;
  // const w = 1234567890;
  // 1 234 567
  return String(v).replace(reg, '$&,');
}

export default {
  computed: {
    mapData() {
      return this.getMapData();
    },
  },
  methods: {
    format(v) {
      return format(v);
    },
  },
  filters: {
    format(v) {
      return format(v);
    },
  },
  inject: ['getMapData'],
};
