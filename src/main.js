import Vue from 'vue'
import App from './App.vue'
import SimpleFlowChart from './SimpleFlowChart'

Vue.config.productionTip = false
Vue.use(SimpleFlowChart, {
  notRegisterNodeContent: false, // 自定义节点内容
  notRegisterNodeTypeContent: false // 自定义添加节点的悬浮面板
})

new Vue({
  render: h => h(App)
}).$mount('#app')
