<template>
  <div class="search-view flex-col">
    <div class="app-view-header">
      <span>搜索</span>
    </div>
    <div class="app-view-content is-transparent">

      <!-- 搜索栏 -->
      <div class="search-bar-wrapper">
        <n-input
          v-model:value="searchKeyword"
          class="search-bar-element shadow-1"
          placeholder="搜索"
          size="large"
          @keydown.enter="openSearchResult"
        >
          <template #suffix>
            <div
              class="search-btn mdi mdi-magnify"
              @click="openSearchResult"
            ></div>
          </template>
        </n-input>
      </div>

      <!-- 搜索引擎列表 -->
      <div class="search-engines-wrapper">
        <n-radio-group
          v-model:value="searchEngineName"
          class="search-engines-list"
        >
          <!-- 搜索引擎分类 -->
          <div
            v-for="categoryItem in searchEngineList"
            :key="categoryItem.title"
            class="search-engine-category"
          >
            <div class="category-title">{{ categoryItem.title }}</div>
            <div class="category-items">
              <!-- 搜索引擎项 -->
              <n-radio
                v-for="engineItem in categoryItem.list"
                :key="engineItem.name"
                :value="engineItem.name"
                class="search-engine-item shadow-1"
              >
                <img
                  class="item-icon"
                  draggable="false"
                  :src="engineItem.icon"
                />
                <span class="item-label">{{ engineItem.name }}</span>
                <span class="item-desc">{{ engineItem.desc }}</span>
              </n-radio>
            </div>
          </div>

        </n-radio-group>
      </div>

    </div>
  </div>
</template>

<script setup>
import {
  NInput, NRadio, NRadioGroup,
} from 'naive-ui';

import {
  openSearchResult,
  searchEngineList, searchEngineName, searchKeyword,
} from '@/assets/js/search-engine';
</script>

<style lang="less" scoped>
.app-view-content {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.search-bar-wrapper,
.search-engines-wrapper {
  margin: 0 auto;
  width: 100%;
}

.search-bar-wrapper {
  position: sticky;
  left: 0;
  top: 0;
  z-index: 100;
  margin-top: 64px;
  max-width: 640px;

  :deep(.search-bar-element) {
    .n-input-wrapper {
      padding-right: 0;
    }

    .n-input__border, .n-input__state-border {
      box-shadow: none;
      border: none !important;
    }

    .n-input__suffix {
      margin-left: 0;
    }
  }

  .search-btn {
    display: flex;
    width: 40px;
    height: 100%;
    font-size: 18px;
    line-height: 1;
    transition: color 0.25s;
    cursor: pointer;

    &:hover {
      color: var(--color-primary);
    }

    &::before {
      margin: auto;
    }
  }
}

.search-engines-wrapper {
  --item-margin: 12px;
  margin-top: 32px;
  padding-bottom: 64px;
  max-width: 800px;
}

.search-engine-category {
  &:not(:first-child) {
    margin-top: var(--item-margin);
  }

  .category-title {
    font-size: 16px;
    line-height: 2;
  }

  .category-items {
    line-height: 1;
  }
}

.search-engine-item {
  margin: var(--item-margin);
  width: 240px;
  height: 40px;
  border-radius: var(--border-radius);
  border-left: 4px solid transparent;
  background-color: #FFF;
  font-size: 14px;
  text-align: left;
  transition: border 0.25s;

  &.n-radio--checked {
    border-left-color: var(--color-primary);
  }

  :deep(.n-radio__dot-wrapper) {
    display: none;
  }

  :deep(.n-radio__label) {
    display: flex;
    align-items: center;
    padding: 0 12px;
    width: 100%;
    height: 100%;
  }

  .item-icon {
    width: 16px;
    height: 16px;
  }

  .item-label {
    margin-left: 8px;
  }

  .item-desc {
    margin-left: 8px;
    font-size: 12px;
    opacity: 0.5;
  }
}
</style>
