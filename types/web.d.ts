import type {
  ComputedRef, DeepReadonly, PropType,
  Ref, ShallowRef, UnwrapNestedRefs,
} from 'vue';

import type {
  RouteLocationRaw, RouteRecordRaw,
} from 'vue-router';

declare global {

  /** 导航链接项 */
  interface NavLinkItem {
    /** 链接分类标题 / 链接项标题 */
    title: string;
    /** 子链接列表 */
    children?: NavLinkItem[];
    /** 链接项更新日期 */
    date?: string,
    /** 链接项简介 */
    desc?: string;
    /** 链接分类图标 class */
    icon?: string;
    /** 链接是否已失效 */
    isInvalid?: boolean;
    /** 是否只显示详情，不跳转 */
    showOnly?: boolean;
    /** 链接项 URL */
    url?: string;
    /** 自身数据，备用 */
    _data?: NavLinkItem;
    /** 处理后生成的唯一 ID */
    _key?: string;
  };

  /** 工具箱分类 */
  interface ToolboxCategory {
    /** 分类唯一 ID */
    id: string;
    /** 分类名称 */
    title: string;
    /** 是否启用 */
    enabled: boolean;
    /** 工具列表 */
    items: ToolboxItem[];
  }

  /** 工具箱工具信息 */
  interface ToolboxItem {
    /** 工具唯一 ID */
    id: string;
    /** 工具名称 */
    title: string;
    /** 工具简介 */
    desc: string;
    /** 图标 */
    iconClass: string;
    /** 组件路径 */
    component: string;
    /** 创建日期 */
    createdAt: string;
    /** 更新日期 */
    updatedAt: string;
    /** 版本号 */
    version: string;
    /** 是否启用 */
    enabled: boolean;
  }

  // window
  interface Window {

    /** 导航链接列表更新日期 */
    NAV_LINK_DATE: string;

    /** 导航链接列表数据 */
    NAV_LINK_LIST: NavLinkItem[];

  }

  // Vue
  type VueComputedRef<T> = ComputedRef<T>;
  type VuePropType<T> = PropType<T>;
  type VueReactive<T> = UnwrapNestedRefs<T>;
  type VueReadonly<T> = DeepReadonly<UnwrapNestedRefs<T>>;
  type VueRef<T> = Ref<T>;
  type VueShallowRef<T> = ShallowRef<T>;

  // Vue Router
  type VueRouteLocationRaw = RouteLocationRaw;
  type VueRouteRecordRaw = RouteRecordRaw;

}

declare module 'vue-router' {
  interface RouteMeta {

    /** 主界面侧边栏图标 class */
    iconClass?: string;

    /** 是否为工具页面 */
    isToolDetail?: boolean;

    /** 是否在主界面侧边栏显示 */
    showInAside?: boolean;

    /** 页面标题 */
    title?: string;

  }
}

export { };
