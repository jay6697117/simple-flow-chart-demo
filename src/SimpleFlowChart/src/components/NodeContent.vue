<template>
  <div class="sfcNormalNodeContent">
    <component :is="data.component"></component>
  </div>
</template>

<script>
export default {
  name: 'NodeContent',
  props: {
    data: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="less" scoped>
.sfcNormalNodeContent {
  min-width: 200px;
  padding: 16px;
  border: 2px solid transparent;
  border-radius: 8px;
  box-shadow: 0 1px 4px 0 rgba(10, 30, 65, 0.16);
  transition: all 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
  // background-color: #fff;
  border-radius: 8px;
  cursor: pointer;
  background-color: #aaa;

  .sfcNormalNodeTitle {
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 4px 4px 0 0;
    cursor: pointer;
    font-size: 14px;
    text-align: left;
    color: #1f1f1f;
    font-weight: 600;
    word-break: break-all;
    min-height: 20px;
  }

  .sfcNormalNodeData {
    display: flex;
    min-height: 32px;
    align-items: center;
    justify-content: space-between;
    padding: 4px 8px;
    margin-top: 10px;
    background: rgba(0, 0, 0, 0.03);
    border-radius: 4px;

    .sfcNormalNodeDataText {
      color: #111f2c;
      font-size: 14px;
      line-height: 32px;
      word-break: break-all;
    }

    .sfcNormalNodeDataIcon {
      width: 20px;
    }
  }
}
</style>
