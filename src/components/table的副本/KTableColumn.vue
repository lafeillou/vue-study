<template>
      <div v-if="false">
        <slot></slot>
      </div>
</template>

<script>
export default {
  props: {
      // 字段key
      prop: { required: false, type: String },
      // 表头显示字段名称
      label: { default: null, type: String },

      // todo 暂不考虑字段类型，目前都为text
      dataType: { default: 'string', type: String },

      // 是否可搜索
      sortable: { default: false, type: Boolean }, // 默认不可排序
      sortBy: { default: null },

      // 是否可过滤
      filterable: { default: true, type: Boolean },
      filterOn: { default: null },

      // 字段格式化
      formatter: { default: v => v, type: Function },

      // 字段是否隐藏
      hidden: { default: false, type: Boolean },

      // todo 暂不考虑样式
      // cellClass: { default: settings.cellClass },
      // headerClass: { default: settings.headerClass },
  }
}
</script>

<style>

</style>