import { ref } from "vue";

export const IMAGE_BASE = `https://c.frost-zx.top/data/static/image/genshin-impact-clock`;
export const IMAGE_CLOCK_BG_INNER = `url("${IMAGE_BASE}/clock_bg_inner.png")`;
export const IMAGE_CLOCK_BG_OUTER = `url("${IMAGE_BASE}/clock_bg_outer.png")`;
export const IMAGE_CLOCK_DIAL = `url("${IMAGE_BASE}/clock_dial.png")`;
export const IMAGE_CLOCK_GEAR_1 = `url("${IMAGE_BASE}/clock_gear_1.png")`;
export const IMAGE_CLOCK_GEAR_4 = `url("${IMAGE_BASE}/clock_gear_4.png")`;
export const IMAGE_CLOCK_GEAR_5 = `url("${IMAGE_BASE}/clock_gear_5.png")`;
export const IMAGE_CLOCK_GEAR_6 = `url("${IMAGE_BASE}/clock_gear_6.png")`;
export const IMAGE_CLOCK_PARTICLES = `url("${IMAGE_BASE}/clock_particles.gif")`;
export const IMAGE_POINTER_LOWER = `url("${IMAGE_BASE}/pointer_lower.png")`;
export const IMAGE_POINTER_UPPER = `url("${IMAGE_BASE}/pointer_upper.png")`;
export const IMAGE_TIME_ICON_DUSK = `url("${IMAGE_BASE}/time_icon_dusk.png")`;
export const IMAGE_TIME_ICON_MORNING = `url("${IMAGE_BASE}/time_icon_morning.png")`;
export const IMAGE_TIME_ICON_NIGHT = `url("${IMAGE_BASE}/time_icon_night.png")`;
export const IMAGE_TIME_ICON_NOON = `url("${IMAGE_BASE}/time_icon_noon.png")`;
export const IMAGE_TIME_INFO_ARROW = `url("${IMAGE_BASE}/time_info_arrow.png")`;
export const IMAGE_TIME_ZONE_COLOR = `${IMAGE_BASE}/time_zone_color.png`;

/** 是否正在自动旋转 */
export const isAutoRotating = ref(false);

/** 是否时间少于 30 分钟 */
export const isTimeTooEarly = ref(false);

/** 是否时间到达上限 */
export const isTimeExceeded = ref(false);

/** 当前时 */
export const timeCurrHour = ref('00');

/** 当前分 */
export const timeCurrMinute = ref('00');

/** 时间差（动态）*/
export const timeDiffLabel = ref('');

/** 时间差（固定）*/
export const timeDiffLabelStill = ref('');

/** 新的时 */
export const timeNewHour = ref('00');

/** 新的分 */
export const timeNewMinute = ref('00');
