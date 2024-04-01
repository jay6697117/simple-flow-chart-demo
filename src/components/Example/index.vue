<template>
  <div class="flowChartContainer">
    <SimpleFlowChart
      ref="SimpleFlowChart"
      v-model="data"
      :initFit="true"
      :enableDrag="false"
      :showScrollBar="false"
      :readonly="true"
      :beforeDeleteNode="beforeDeleteNode"
      :nodeTypeList="nodeTypeList"
      :vertical="true"
      @node-content-click="onNodeContentClick"
    >
    </SimpleFlowChart>
    <el-drawer :visible.sync="showNodeEdit" :with-header="false">
      <div class="nodeEditBox" v-if="showNodeEdit">
        <div class="nodeEditTitle">
          <div class="editTitle" v-if="isEditingTitle">
            <el-input v-model="editNodeData.title" @keyup.native.enter="isEditingTitle = false" @blur="isEditingTitle = false"></el-input>
          </div>
          <div class="showTitle" v-else>
            <div class="title">{{ editNodeData.title }}</div>
            <div class="icon el-icon-edit" @click="isEditingTitle = true"></div>
          </div>
        </div>
        <div class="nodeEditContent">
          <el-input type="textarea" :rows="3" v-model="editNodeData.content"> </el-input>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { Drawer, Dialog, Icon, Input, MessageBox } from 'element-ui'
import Test from '@/components/Test/index'
import Test1 from '@/components/Test1/index'
import mock from './test.json'
console.log('mock', mock)
export default {
  name: 'Example',
  components: {
    [Drawer.name]: Drawer,
    [Dialog.name]: Dialog,
    [Icon.name]: Icon,
    [Input.name]: Input,
    Test1
  },
  data() {
    return {
      data: [],
      showNodeEdit: false,
      editNodeData: null,
      isEditingTitle: false,
      nodeTypeList: [
        {
          name: '普通节点',
          list: [
            {
              type: 'normal',
              name: '普通节点'
            }
          ]
        },
        {
          name: '分支节点',
          list: [
            {
              type: 'condition',
              name: '条件分支'
            }
          ]
        }
      ]
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize)


    this.data = this.transformArr(mock.data)
    console.log(' this.data', this.data)

      // 删除nodeList防止干扰
      this.data.forEach(element => {
    delete element.nodeList
  })
  },
  methods: {
    transformArr(arr) {
      let newArr = []
      arr.forEach(item => {
        if (item.nodeList && item.nodeList.length === 1) {
          // if (deleteNodes.includes(item.data?.nodeName)) {
          //   const nodeList = cloneDeep(item.nodeList)
          //   deleteArr.push(...nodeList)
          //   item.nodeList = []
          // } else {
          newArr.push(item)
          newArr = newArr.concat(this.transformArr(item.nodeList))
          // }
        } else if (item.nodeList && item.nodeList.length > 1) {
          newArr.push(item)
          const temp = {
            id: item.id + '-' + 'a',
            type: 'condition',
            title: null,
            content: null,
            configData: null,
            nodeList: [],
            children: item.nodeList,
            component: null,
            data: null
          }
          this.transformArr(temp.children)
          newArr.push(temp)
        } else {
          newArr.push(item)
        }
      })
      console.log('--------------');
      console.log('newArr', newArr)
      return newArr
    },
    beforeDeleteNode(...args) {
      console.log(args)
      return MessageBox.confirm('确定删除该节点？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
    },
    onNodeContentClick(node) {
      console.log(node)
      this.editNodeData = node
      // this.showNodeEdit = true
    },
    onResize() {
      this.$refs.SimpleFlowChart.fit()
    }
  }
}
</script>

<style lang="less" scoped>
.flowChartContainer {
  width: 100%;
  height: 100%;
}

.nodeEditBox {
  padding: 20px;

  .nodeEditTitle {
    margin-bottom: 20px;

    .showTitle {
      display: flex;
      align-items: center;

      .title {
        color: rgba(0, 0, 0, 0.85);
        font-size: 20px;
        font-weight: bold;
        margin-right: 5px;
      }

      .icon {
        cursor: pointer;
      }
    }
  }

  // .nodeEditContent {
  // }
}
</style>
./default./exampleData-bak../exampleData
