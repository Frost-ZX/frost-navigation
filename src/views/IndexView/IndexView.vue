<template>
  <div class="index-view flex-col">
    <div class="app-view-header">
      <span>{{ appDesc }}</span>
    </div>
    <div class="app-view-content">

      <div class="date-time">
        <div class="time-info">{{ timeInfo.time }}</div>
        <div class="date-info">
          <div class="date-info-row">
            <span>{{ timeInfo.date1 }}</span>
            <span>{{ timeInfo.week }}</span>
            <span v-show="timeInfo.festival">{{ timeInfo.festival }}</span>
            <span v-show="timeInfo.solarTerm">{{ timeInfo.solarTerm }}</span>
          </div>
          <div class="date-info-row">
            <span>{{ timeInfo.date2 }}</span>
            <span>{{ timeInfo.date3 }}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import {
  description as appDesc,
} from '@package-json';

import {
  reactive, ref,
  onBeforeMount, onBeforeUnmount,
} from 'vue';

import lunisolar from 'lunisolar';

/** 当前时间信息 */
const timeInfo = reactive({

  /** 公历 */
  date1: '',

  /** 农历 */
  date2: '',

  /** 八字 */
  date3: '',

  /** 节日 */
  festival: '',

  /** 节气 */
  solarTerm: '',

  /** 时间 */
  time: '',

  /** 星期 */
  week: '',

});

/** 时间更新定时器 */
const timeUpdater = ref(null);

/** 更新时间信息 */
function updateTime() {

  let date = lunisolar();

  let { markers, solarTerm } = date;

  // 公历
  timeInfo.date1 = date.format('YYYY 年 M 月 D 日');
  // 农历
  timeInfo.date2 = date.format('lMlD');
  // 八字
  timeInfo.date3 = date.format('cY年 cM月 cD日');
  // 节日
  timeInfo.festival = markers.list.map(v => v.name).join(' & ');
  // 节气
  timeInfo.solarTerm = solarTerm ? solarTerm.name : '';
  // 时间
  timeInfo.time = date.format('HH:mm:ss');
  // 星期
  timeInfo.week = date.format('dddd');

}

onBeforeMount(() => {
  updateTime();
  timeUpdater.value = setInterval(updateTime, 500);
});

onBeforeUnmount(() => {
  clearInterval(timeUpdater.value);
});
</script>

<style lang="less" scoped>
.app-view-content {
  display: flex;
}

.date-time {
  margin: auto;
  text-align: center;

  .time-info {
    font-size: 80px;
  }

  .date-info {
    margin-bottom: 160px;
    font-size: 16px;

    span:not(:first-child)::before {
      content: " / ";
    }
  }
}
</style>
