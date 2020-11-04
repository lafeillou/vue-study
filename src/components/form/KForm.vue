<template>
  <div>
       <slot></slot>
  </div>
</template>

<script>
export default {
    // provide写的是不是有问题
    provide() {
        return {
           form: this
        }
    },
    props: {
        model: {
            type: Object,
            required: true
        },
        rules: {
            type: Object
        }
    },
    methods: {
        validate(cb) {
            // 调用所有fromItem子项validate
            // 全部调用通过才算通过
            const tasks = this.$children
            .filter(item => item.prop) // 这个地方简单漂亮
            .map(item => item.validate())

            // 判断tasks是否全部通过
            Promise.all(tasks).then( () => cb(true)).catch(() => cb(false))
        }
    }
}
</script>

<style lang="scss" scoped>

</style>