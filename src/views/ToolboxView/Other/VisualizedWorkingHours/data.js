import { useLocalStorage } from '@vueuse/core';
import { KEY_PREFIX } from '@/assets/js/local-storage';

/** 模块名称 */
const STORAGE_PREFIX = KEY_PREFIX + 'visualized-working-hours/';

/** 配置参数 */
export const configData = {

  /** 收入币种 */
  currencyOfIncome: useLocalStorage(STORAGE_PREFIX + 'currencyOfIncome', ''),

  /** 日薪 */
  dailyWage: useLocalStorage(STORAGE_PREFIX + 'dailyWage', 100),

  /** 午休时长 */
  lunchBreakDuration: useLocalStorage(STORAGE_PREFIX + 'lunchBreakDuration', 1),

  /** 工作开始时间 */
  workTimeStart: useLocalStorage(STORAGE_PREFIX + 'workTimeStart', ''),

  /** 工作结束时间 */
  workTimeStop: useLocalStorage(STORAGE_PREFIX + 'workTimeStop', ''),

};

/** 初始化数据 */
export function initData() {

  let {
    currencyOfIncome,
    workTimeStart,
    workTimeStop,
  } = configData;

  let timeRegExp = new RegExp(/^\d{2}:\d{2}$/);

  if (!currencyOfIncome.value) {
    currencyOfIncome.value = '￥';
  }

  if (!workTimeStart.value.match(timeRegExp)) {
    workTimeStart.value = '09:00';
  }

  if (!workTimeStop.value.match(timeRegExp)) {
    workTimeStop.value = '18:00';
  }

}
