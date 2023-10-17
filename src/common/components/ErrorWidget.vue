<template>
  <div class="error-widget">
    <img src="@/assets/warning.svg" />
    <h6 :title="errorMsg">{{ errorMsg }}</h6>
    <div v-if="!hideRetry" class="btn btn-primary" @click="retry">
      Try Again
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component
export default class ErrorWidget extends Vue {
  @Prop({ required: true, type: String })
  private readonly error!: string;

  @Prop({ required: false, default: false })
  private readonly hideRetry!: boolean;

  @Prop({ type: Boolean, default: false })
  private readonly isShowAllError!: boolean;

  @Prop({ type: Boolean, default: false })
  private readonly isHtmlError!: boolean;

  private get errorMsg(): string {
    return this.error || "Something went wrong, please try again later";
  }

  @Emit("onRetry")
  private retry(event: MouseEvent): MouseEvent {
    return event;
  }
}
</script>

<style lang="scss">
.error-widget {
  padding: 15px;
  overflow: auto;

  h6 {
    -webkit-box-orient: vertical;
    cursor: default;
    display: -webkit-box;
    flex-shrink: 1;
    font-size: 14px;
    -webkit-line-clamp: 4;
    //opacity: 0.6;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    margin-top: 24px;
  }
}
</style>
