<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <p @click="$store.commit('add')">counter: {{$store.state.counter}}</p>
    <p @click="$store.dispatch('add')">async counter: {{$store.state.counter}}</p>
    <p>{{$store.getters.doubleCounter}}</p> -->
    <!-- 组件通信 -->
    <!-- <Communication></Communication> -->
    <!-- 表单 -->
    <!-- <FormExample></FormExample> -->
    <!-- 插槽 -->
    <!-- <SlotExample></SlotExample> -->
    <!-- 递归 -->
    <!-- <TreeExample></TreeExample> -->

    <!-- 大作业 表格-->
    <TableExample></TableExample>
  </div>
</template>

<script>
import Communication from '@/components/communication';
import FormExample from '@/components/form';
import SlotExample from '@/components/slots';
import TreeExample from '@/components/recursion';
import TableExample from '@/components/table';


export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    Communication,
    FormExample,
    SlotExample,
    TreeExample,
    TableExample
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
