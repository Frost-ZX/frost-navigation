import type {
  ComputedRef, DeepReadonly, PropType,
  Ref, ShallowRef, UnwrapNestedRefs,
} from 'vue';

import type {
  RouteLocationRaw,
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
  };

  // window
  interface Window {

    /** 导航链接列表 */
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

}

declare module 'vue-router' {
  interface RouteMeta {
    iconClass?: string;
    showInAside?: boolean;
    title?: string;
  }
}

export { };
