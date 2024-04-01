export const store = {}

export const defaultNodeList = [
  {
    id: '随机id1',
    type: 'normal',
    title: '开始',
    content: '员工1',
    configData: {},
    nodeList: []
  },
  {
    id: '随机id2',
    type: 'normal',
    title: '结束',
    content: '员工2',
    configData: {},
    nodeList: []
  }
]

export const defaultNodeTypeList = [
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
