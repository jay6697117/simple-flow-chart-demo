<template>
  <div
    class="sfcContainer"
    ref="sfcContainer"
    :style="{ background: background }"
    :class="{ showScrollBar: showScrollBar }"
    @mousedown="onMousedown"
  >
    <ActionBar :scale.sync="scale" v-if="showScaleBar"></ActionBar>
    <div
      ref="sfcContent"
      class="sfcContent"
      :class="{ vertical: vertical, transformOriginCenter: scale <= 100 }"
      :style="{ transform: `scale(${scale / 100})` }"
    >
      <Node v-for="node in data" :key="node.id" :nodeList="data" :data="node">
      </Node>
    </div>
    <div v-if="showHideDiv"></div>
  </div>
</template>

<script>
import emitter from './emit'
import { generateNode } from './utils'
import { store, defaultNodeList } from './constant'
import ActionBar from './components/ActionBar.vue'

export default {
  name: 'SimpleFlowChart',
  components: {
    [ActionBar.name]: ActionBar
  },
  model: {
    prop: 'data',
    event: 'change'
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    customCreateNode: {
      type: Function
    },
    customCreateConditionBranchNode: {
      type: Function
    },
    beforeDeleteNode: {
      type: Function
    },
    background: {
      type: String,
      default: 'rgba(0, 0, 0, 0.03)'
    },
    readonly: {
      type: Boolean,
      default: false
    },
    nodeTypeList: {
      type: Array
    },
    vertical: {
      type: Boolean,
      default: false
    },
    showScaleBar: {
      type: Boolean,
      default: true
    },
    customCreateNodeId: {
      type: Function
    },
    enableDrag: {
      type: Boolean,
      default: true
    },
    initFit: {
      type: Boolean,
      default: false
    },
    showScrollBar: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      scale: 100,
      showHideDiv: true,
      isMousedown: false,
      mousedownPos: {
        x: 0,
        y: 0
      },
      mousedownScrollPos: {
        x: 0,
        y: 0
      }
    }
  },
  watch: {
    scale() {
      this.showHideDiv = !this.showHideDiv
    }
  },
  created() {
    store.readonly = this.readonly
    store.nodeTypeList = this.nodeTypeList
    store.vertical = this.vertical
    store.customCreateNodeId = this.customCreateNodeId
    if (this.data.length <= 0) {
      this.data.push(...defaultNodeList)
    }
    emitter.on('add-node-type-click', this.onAddNodeTypeClick)
    emitter.on('delete-node-click', this.onNodeDeleteClick)
    emitter.on('add-condition-branch-click', this.onAddConditionBranchClick)
    emitter.on('node-content-click', this.onNodeContentClick)
    window.addEventListener('mousemove', this.onMousemove)
    window.addEventListener('mouseup', this.onMouseup)
  },
  mounted() {
    if (this.initFit) {
      this.fit()
    }
  },
  beforeDestroy() {
    emitter.off('add-node-type-click', this.onAddNodeTypeClick)
    emitter.off('delete-node-click', this.onNodeDeleteClick)
    emitter.off('add-condition-branch-click', this.onAddConditionBranchClick)
    emitter.off('node-content-click', this.onNodeContentClick)
    window.removeEventListener('mousemove', this.onMousemove)
    window.removeEventListener('mouseup', this.onMouseup)
  },
  methods: {
    // 缩放至全部显示
    fit() {
      this.scale = 100
      this.$nextTick(() => {
        const containerSize = this.$refs.sfcContainer.getBoundingClientRect()
        const containerRatio = containerSize.width / containerSize.height
        const contentSize = this.$refs.sfcContent.getBoundingClientRect()
        const contentRatio = contentSize.width / contentSize.height
        let w, h
        if (containerRatio > contentRatio) {
          // 以容器的高为准
          h = containerSize.height
          w = contentRatio * h
        } else {
          // 以容器的宽为准
          w = containerSize.width
          h = w / contentRatio
        }
        this.scale = (w / contentSize.width) * 100
        console.log(contentSize.width, containerSize.width)
        const x = (contentSize.width - containerSize.width) / 2
        const y = (contentSize.height - containerSize.height) / 2
        this.$refs.sfcContainer.scrollTo(x, y)
      })
    },

    onAddNodeTypeClick(nodeList, nodeData, type) {
      let newNode = null
      if (this.customCreateNode) {
        newNode = this.customCreateNode(nodeList, nodeData, type)
      }
      if (!newNode) {
        newNode = generateNode(type.type)
      }
      this.addNode(nodeList, nodeData, newNode)
      this.$emit('add-node', newNode)
    },

    addNode(nodeList, nodeData, newNode) {
      if (nodeList) {
        let index = this.findNodeIndex(nodeList, nodeData)
        nodeList.splice(index + 1, 0, newNode)
      } else {
        nodeData.nodeList.unshift(newNode)
      }
    },

    onNodeDeleteClick(...args) {
      if (this.beforeDeleteNode) {
        this.beforeDeleteNode(...args).then(() => {
          this.deleteNode(...args)
        })
      } else {
        this.deleteNode(...args)
        this.$emit('delete-node', args[3])
      }
    },

    deleteNode(nodeList, childrenList, belongConditionNodeData, nodeData) {
      if (nodeList) {
        let index = this.findNodeIndex(nodeList, nodeData)
        nodeList.splice(index, 1)
      } else if (childrenList) {
        let index = this.findNodeIndex(childrenList, nodeData)
        childrenList.splice(index, 1)
        if (childrenList.length <= 1) {
          this.removeNodeFromData(belongConditionNodeData)
        }
      }
    },

    onAddConditionBranchClick(nodeData) {
      let newNode = null
      if (this.customCreateConditionBranchNode) {
        newNode = this.customCreateConditionBranchNode(nodeData)
      }
      if (!newNode) {
        newNode = generateNode('normal', '条件', '条件内容')
      }
      nodeData.children.push(newNode)
      this.$emit('add-condition-branch', newNode)
    },

    onNodeContentClick(...args) {
      this.$emit('node-content-click', ...args)
    },

    findNodeIndex(list, node) {
      return list.findIndex(item => {
        return item === node
      })
    },

    removeNodeFromData(nodeData) {
      let walk = arr => {
        for (let i = 0; i < arr.length; i++) {
          let node = arr[i]
          if (node === nodeData) {
            arr.splice(i, 1)
            return true
          }
          let res = false
          if (node.children && node.children.length > 0) {
            res = walk(node.children)
          }
          if (!res && node.nodeList && node.nodeList.length > 0) {
            res = walk(node.nodeList)
          }
          if (res) {
            break
          }
        }
      }
      walk(this.data)
    },

    onMousedown(e) {
      this.isMousedown = true
      this.mousedownPos.x = e.clientX
      this.mousedownPos.y = e.clientY
      this.mousedownScrollPos.x = this.$refs.sfcContainer.scrollLeft
      this.mousedownScrollPos.y = this.$refs.sfcContainer.scrollTop
    },

    onMousemove(e) {
      if (!this.isMousedown || !this.$refs.sfcContainer || !this.enableDrag)
        return
      e.preventDefault()
      let nx = this.mousedownScrollPos.x - (e.clientX - this.mousedownPos.x)
      let ny = this.mousedownScrollPos.y - (e.clientY - this.mousedownPos.y)
      this.$refs.sfcContainer.scrollTo(nx, ny)
    },

    onMouseup() {
      this.isMousedown = false
    }
  }
}
</script>

<style lang="less" scoped>
.sfcContainer {
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;

  &.showScrollBar {
    overflow: auto;
  }

  // /deep/ * {
  //   box-sizing: border-box;
  //   margin: 0;
  //   padding: 0;
  // }

  .sfcContent {
    display: flex;
    align-items: center;
    padding: 20px;
    min-width: 100%;
    min-height: 100%;
    width: max-content;
    height: max-content;
    transform-origin: left top;

    &.transformOriginCenter {
      transform-origin: center center;
    }

    &.vertical {
      flex-direction: column;
      justify-content: center;
    }
  }
}
</style>
