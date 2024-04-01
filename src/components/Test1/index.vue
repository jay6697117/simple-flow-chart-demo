<template>
  <div class="test">
    <div>分支节点</div>
    <label>输入:<input type="text" /></label>
    <select v-model="selectedOption">
      <option disabled value="">请选择</option>
      <option>A选项</option>
      <option>B选项</option>
      <option>C选项</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedOption: ''
    }
  }
}
</script>

<style lang="less" scoped>
.test {
  padding: 20px !important;
  background-color: skyblue;
  display: flex;
  flex-direction: column;
  & > * {
    margin-bottom: 10px !important;
  }
}
</style>
