<template>
<!--暗号：杨哥喊你来搬砖 -->
  <div style="margin:0 40px;">
    <k-table :data="tableData" :default-sort="{prop: 'date', order: 'descending'}">
      <k-table-column prop="date" label="日期" sortable></k-table-column>
      <k-table-column prop="num" label="序号" sortable></k-table-column>
      <k-table-column prop="name" label="姓名"></k-table-column>
      <k-table-column prop="addr" label="地址"></k-table-column>
      <k-table-column prop="tel" label="电话"></k-table-column>
      <k-table-column label="操作">
          <template v-slot="scope">
              <button>编辑</button><button>删除</button>
          </template>
      </k-table-column>
    </k-table>
  </div>
</template>

<script>
import KTable from "./KTable";
import KTableColumn from "./KTableColumn";

export default {
  components: {
    KTable,
    KTableColumn,
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          num: 1,
          name: "王小虎",
          addr: "上海市普陀区金沙江路 1518弄",
          tel: "18177653094"
        },
        {
          date: "2016-05-01",
          name: "李天霸",
          num: 2,
          addr: "湖北省武汉市洪山区关山大道108号",
          tel: "18927278686"
        },
        {
          date: "2016-05-03",
          name: "白丽明",
          num: 3,
          addr: "广东省广州市花都区白岭街道69号",
          tel: "18547473838"
        },
        {
          date: "2016-05-04",
          num: 4,
          name: "曹东明",
          addr: "湖北省麻城市白果镇王命咨湾6号",
          tel: "13487671280"
        },
        {
          date: "2016-05-05",
          name: "李德",
          num: 5,
          addr: "四川省资阳市老街105号",
          tel: "18878785656"
        },
        {
          date: "2016-05-06",
          name: "刘传序",
          num: 6,
          addr: "台湾省台北市中环路99号",
          tel: "13572307856"
        },
      ],
    };
  },
};
</script>

<style>
</style>