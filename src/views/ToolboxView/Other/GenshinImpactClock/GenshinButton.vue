<template>
  <div class="genshin-button">
    <span
      v-if="hasIcon"
      class="btn-icon mdi"
      :class="iconName"
      :style="{ color: iconColor }"
    ></span>
    <span class="btn-label">
      <slot></slot>
    </span>
  </div>
</template>

<script setup>
defineProps({

  hasIcon: {
    type: Boolean,
    default: true,
  },

  iconColor: {
    type: String,
    default: '#FFFFFF',
  },

  iconName: {
    type: String,
    default: 'mdi-help',
  },

});
</script>

<style lang="less" scoped>
.genshin-button {
  display: inline-block;
  position: relative;
  margin: 1rem 0.5rem;
  padding: 0.5rem;
  border-radius: 1.5rem;
  background-color: #ECE3D6;
  color: #494246;
  font-size: 1rem;
  font-weight: bold;
  line-height: 1;
  white-space: nowrap;
  opacity: 1;
  transition: opacity 0.25s;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }

  span {
    vertical-align: middle;
  }
}

.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 50%;
  background-color: #2D2D2D;
  color: #FFFFFF;
}

.btn-label {
  display: inline-block;
  padding: 0 3.5rem;
}
</style>
