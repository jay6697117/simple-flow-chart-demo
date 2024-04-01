<template>
  <div class="sfcNodeContainer" @mouseenter.stop="onMouseenter" @mouseleave.stop="onMouseleave">
    <!-- 分支节点 -->
    <ConditionNode v-if="data.type === 'condition'" :nodeList="nodeList" :data="data" :isMouseEnter="isMouseEnter || isCurrentMouseEnter">
      <template #condition>
        <slot name="condition"></slot>
      </template>
    </ConditionNode>
    <!-- 普通节点 -->
    <NormalNode
      v-else
      :nodeList="nodeList"
      :childrenList="childrenList"
      :data="data"
      :belongConditionNodeData="belongConditionNodeData"
      :isMouseEnter="isMouseEnter || isCurrentMouseEnter"
    >
    </NormalNode>
  </div>
</template>

<script>
/**
 * @Author: 王林25
 * @Date: 2022-12-15 09:33:17
 * @Desc: 节点
 */
export default {
  name: 'Node',
  props: {
    nodeList: {
      type: [Array, null],
      default() {
        return null
      }
    },
    childrenList: {
      type: [Array, null],
      default() {
        return null
      }
    },
    data: {
      type: Object,
      default: null
    },
    belongConditionNodeData: {
      type: Object,
      default: null
    },
    isMouseEnter: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isCurrentMouseEnter: false
    }
  },
  methods: {
    onMouseenter() {
      this.isCurrentMouseEnter = true
    },

    onMouseleave() {
      this.isCurrentMouseEnter = false
    }
  }
}
</script>

<style lang="less" scoped>
.sfcNodeContainer {
  // flex-shrink: 0;
  position: relative;
}
</style>
