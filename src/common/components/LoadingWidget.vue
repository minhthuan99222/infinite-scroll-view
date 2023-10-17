<template>
  <div class="loading">
    <img class="loading-container" alt="loading" src="@/assets/loading.svg" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class LoadingWidget extends Vue {}
</script>
<style lang="scss">
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  .loading-container {
    animation-name: spin;
    animation-duration: 2000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
