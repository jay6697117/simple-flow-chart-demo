import Index from './src/index.vue'
import ConditionNode from './src/components/ConditionNode.vue'
import Node from './src/components/Node.vue'
import NormalNode from './src/components/NormalNode.vue'
import NodeContent from './src/components/NodeContent.vue'
import NodeTypeContent from './src/components/NodeTypeContent.vue'
import DeleteNode from './src/components/DeleteNode.vue'

const install = function (
  Vue,
  { notRegisterNodeContent, notRegisterNodeTypeContent } = {}
) {
  Vue.component(ConditionNode.name, ConditionNode)
  Vue.component(Node.name, Node)
  Vue.component(NormalNode.name, NormalNode)
  Vue.component(DeleteNode.name, DeleteNode)
  Vue.component(Index.name, Index)
  if (!notRegisterNodeContent) {
    Vue.component(NodeContent.name, NodeContent)
  }
  if (!notRegisterNodeTypeContent) {
    Vue.component(NodeTypeContent.name, NodeTypeContent)
  }
}

export default {
  install
}
