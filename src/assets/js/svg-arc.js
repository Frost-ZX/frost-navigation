// 生成扇形、环形、圆形，或弧形的 SVG 路径
// 
// 修改自
//   https://github.com/svgcamp/svg-arc
// License
//   MIT

const PI = Math.PI;

/**
 * @param {number} x
 * @param {number} y
 * @param {number} r
 * @param {number} angle
 */
function point(x, y, r, angle) {
  return [
    (x + Math.sin(angle) * r).toFixed(2),
    (y - Math.cos(angle) * r).toFixed(2),
  ];
}

/**
 * @param {number} x
 * @param {number} y
 * @param {number} R
 * @param {number} r
 */
function full(x, y, R, r) {
  if (r <= 0) {
    return `M ${x - R} ${y} A ${R} ${R} 0 1 1 ${x + R} ${y} A ${R} ${R} 1 1 1 ${x - R} ${y} Z`;
  }
  return `M ${x - R} ${y} A ${R} ${R} 0 1 1 ${x + R} ${y} A ${R} ${R} 1 1 1 ${x - R} ${y} M ${x - r} ${y} A ${r} ${r} 0 1 1 ${x + r} ${y} A ${r} ${r} 1 1 1 ${x - r} ${y} Z`;
}

/**
 * @param {number} x
 * @param {number} y
 * @param {number} R
 * @param {number} r
 * @param {number} start
 * @param {number} end
 */
function part(x, y, R, r, start, end) {

  let s = (start / 360) * 2 * PI;
  let e = (end / 360) * 2 * PI;
  let P = [
    point(x, y, r, s),
    point(x, y, R, s),
    point(x, y, R, e),
    point(x, y, r, e),
  ];
  let flag = (e - s > PI ? '1' : '0');

  return `M ${P[0][0]} ${P[0][1]} L ${P[1][0]} ${P[1][1]} A ${R} ${R} 0 ${flag} 1 ${P[2][0]} ${P[2][1]} L ${P[3][0]} ${P[3][1]} A ${r} ${r}  0 ${flag} 0 ${P[0][0]} ${P[0][1]} Z`;

}

// 关于角度：
// 12 点钟方向 - 0, 360, 720, ...
//  3 点钟方向 - 90, 450, ...
//  6 点钟方向 - 180, 540, ...
//  9 点钟方向 - 270, 630, ...

// 注意事项：
// 绘制环形时，需要将 `fill-rule` 属性的值设置为 `evenodd`，否则 `fill` 可能无法正确填充颜色。

/**
 * @description 生成 SVG `<path>` 元素的 d 属性值
 * @param {object} opts       配置选项
 * @param {number} opts.x     圆心水平坐标
 * @param {number} opts.y     圆心垂直坐标
 * @param {number} opts.R     内层半径（用于圆环）
 * @param {number} opts.r     外层半径（圆形半径）
 * @param {number} opts.start 起始角度（0 ~ 360）
 * @param {number} opts.end   结束角度（0 ~ 360）
 */
function arc(opts = {}) {

  let { x = 0, y = 0 } = opts;
  let { R = 0, r = 0, start, end } = opts;

  [R, r] = [Math.max(R, r), Math.min(R, r)];

  if (R <= 0) {
    return '';
  }

  if (start !== +start || end !== +end) {
    return full(x, y, R, r);
  }

  if (Math.abs(start - end) < 0.000001) {
    return '';
  }

  if (Math.abs(start - end) % 360 < 0.000001) {
    return full(x, y, R, r);
  }

  [start, end] = [start % 360, end % 360];

  if (start > end) {
    end += 360;
  }

  return part(x, y, R, r, start, end);

}

export default arc;
