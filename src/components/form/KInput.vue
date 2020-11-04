<template>
  <div>
      <!--双向数据绑定 告知校验-->
      <input :type="type" :value="value" @input="onInput" v-bind="$attrs">
  </div>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        value: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        }
    },
    methods: {
        onInput(e) {
            this.$emit('input', e.target.value)
            // 通知校验
            this.$parent.$emit('validate')
        }
    }
}
</script>

<style lang="scss" scoped>

</style>