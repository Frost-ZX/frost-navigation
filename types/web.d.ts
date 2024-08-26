import type {
  ComputedRef, DeepReadonly, PropType,
  Ref, ShallowRef, UnwrapNestedRefs,
} from 'vue';

import type {
  RouteLocationRaw,
} from 'vue-router';

declare global {

  // window
  interface Window {
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

export { };
