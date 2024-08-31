// Naive UI 配置

import { dateZhCN, zhCN } from 'naive-ui';

/** @type { import('naive-ui').ConfigProviderProps } */
export const configProviderProps = {

  // 语言
  dateLocale: dateZhCN,
  locale: zhCN,

  // 禁用 inline 主题
  inlineThemeDisabled: true,

  // 调整主题变量
  themeOverrides: {
    common: {
      borderRadius: '4px',
      borderRadiusSmall: '2px',
      errorColor: '#E34D59',
      errorColorHover: '#F36D78',
      errorColorPressed: '#C9353F',
      errorColorSuppl: '#F36D78',
      fontFamily: '"HarmonyOS Sans SC", sans-serif',
      fontFamilyMono: '"Sarasa Mono", "Sarasa Mono SC", monospace',
      infoColor: '#0052D9',
      infoColorHover: '#366EF4',
      infoColorPressed: '#003CAB',
      infoColorSuppl: '#366EF4',
      lineHeight: 1.6,
      primaryColor: '#0894FA',
      primaryColorHover: '#6BB2FF',
      primaryColorPressed: '#007AD3',
      primaryColorSuppl: '#6BB2FF',
      successColor: '#00A870',
      successColorHover: '#48C79C',
      successColorPressed: '#078D5C',
      successColorSuppl: '#48C79C',
      warningColor: '#ED7B2F',
      warningColorHover: '#F2995F',
      warningColorPressed: '#D35A21',
      warningColorSuppl: '#F2995F',
    },
  },

};
