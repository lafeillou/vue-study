<template>
    <div class="table-component">
        <div class="table-component__table-wrapper">
            <table :class="fullTableClass">
                <thead :class="fullTableHeadClass">
                <tr>
                    <table-column-header
                            @click="changeSorting"
                            v-for="column in columns"
                            :key="column.prop"
                            :sort="sort"
                            :column="column"
                    ></table-column-header>
                </tr>
                </thead>
                <tbody :class="fullTableBodyClass">
                <table-row
                        v-for="row in displayedRows"
                        :key="row.vueTableComponentInternalRowId"
                        :row="row"
                        :columns="columns"
						@rowClick="emitRowClick"
                ></table-row>
                </tbody>
                <tfoot>
                    <slot name="tfoot" :rows="rows"></slot>
                </tfoot>
            </table>
        </div>

        <div v-if="displayedRows.length === 0" class="table-component__message">
            无内容显示
        </div>


        <div style="display:none;">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import Column from './classes/Column.js';
    import Row from './classes/Row.js';
    import TableColumnHeader from './KTableColumnHeader';
    import TableRow from './KTableRow';
    import { classList } from './helpers/index';

    export default {
        components: {
            TableColumnHeader,
            TableRow
        },

        props: {
            // 表格数据
            data: { default: () => [], type: [Array, Function] },
            showFilter: { default: false },
            defaultSort: {
                type: Object,
                default: () => {}
            },
            cacheKey: { default: null },
            cacheLifetime: { default: 5 },
        },

        data: () => ({
            columns: [],
            rows: [],
            filter: '',
            // 当前排序状态
            sort: {
                fieldName: '',
                order: '',
            },
            localSettings: {},
        }),

        created() {
            const wordMap = {
                descending: 'desc',
                ascending: 'asc'
            }
            this.sort.fieldName = this.defaultSort.prop;
            // 转换一下
            this.sort.order = wordMap[this.defaultSort.order];
            // todo 考虑持久保存
            // this.restoreState();
        },

        async mounted() {
            const columnComponents = this.$slots.default
                .filter(column => column.componentInstance)
                .map(column => column.componentInstance);

            this.columns = columnComponents.map(
                column => new Column(column)
            );

            columnComponents.forEach(columnCom => {
                Object.keys(columnCom.$options.props).forEach(
                    prop => columnCom.$watch(prop, () => {
                        this.columns = columnComponents.map(
                            column => new Column(column)
                        );
                    })
                );
            });

            await this.mapDataToRows();
        },

        watch: {
            filter() {
                if (!this.usesLocalData) {
                    this.mapDataToRows();
                }

                this.saveState();
            },

            data() {
                if (this.usesLocalData) {
                    this.mapDataToRows();
                }
            },
        },

        computed: {
            // 默认样式
            fullTableClass() {
                return classList('table-component__table', this.tableClass);
            },

            fullTableHeadClass() {
                return classList('table-component__table__head', this.theadClass);
            },

            fullTableBodyClass() {
                return classList('table-component__table__body', this.tbodyClass);
            },

            fullFilterInputClass() {
                return classList('table-component__filter__field', this.filterInputClass);
            },

            
            // 是否使用本地数据
            usesLocalData() {
                return Array.isArray(this.data);
            },

            displayedRows() {
                if (!this.usesLocalData) {
                    return this.sortedRows;
                }

                if (!this.showFilter) {
                    return this.sortedRows;
                }

                if (!this.columns.filter(column => column.isFilterable()).length) {
                    return this.sortedRows;
                }

                return this.sortedRows.filter(row => row.passesFilter(this.filter));
            },

            sortedRows() {
                if (!this.usesLocalData) {
                    return this.rows;
                }

                if (this.sort.fieldName === '') {
                    return this.rows;
                }

                if (this.columns.length === 0) {
                    return this.rows;
                }

                const sortColumn = this.getColumn(this.sort.fieldName);

                if (!sortColumn) {
                    return this.rows;
                }

                return this.temp()
            },

            filterableColumnExists() {
                return this.columns.filter(c => c.isFilterable()).length > 0;
            },

            storageKey() {
                return this.cacheKey
                    ? `vue-table-component.${this.cacheKey}`
                    : `vue-table-component.${window.location.host}${window.location.pathname}${this.cacheKey}`;
            },
        },

        methods: {
            temp() {
                const sortColumn = this.getColumn(this.sort.fieldName);
                console.log(this.rows.sort(sortColumn.getSortPredicate(this.sort.order, this.columns)))
                console.log(this.rows.sort(sortColumn.getSortPredicate(this.sort.order, this.columns)))
                return this.rows.sort(sortColumn.getSortPredicate(this.sort.order, this.columns));
            },

            async mapDataToRows() {
                let data = null
            
                if(this.usesLocalData) {
                    data = this.prepareLocalData()
                } else {
                    // todo 远程拉取数据
                }
                let rowId = 0;

                this.rows = data
                    .map(rowData => {
                        rowData.vueTableComponentInternalRowId = rowId++;
                        return rowData;
                    })
                    .map(rowData => new Row(rowData, this.columns));
            },

            // 使用本地数据
            prepareLocalData() {
                return this.data;
            },

            // 刷新数据
            async refresh() {
                await this.mapDataToRows();
            },

            // 过滤改变
            changeSorting(column) {
                if (this.sort.fieldName !== column.prop) {
                    this.sort.fieldName = column.prop;
                    this.sort.order = 'asc';
                } else {
                    this.sort.order = (this.sort.order === 'asc' ? 'desc' : 'asc');
                }
                // 如果不是本地数据
                if (!this.usesLocalData) {
                    this.mapDataToRows();
                }

                // todo
                this.saveState();
            },

            getColumn(columnName) {
                return this.columns.find(column => column.prop === columnName);
            },

            // todo 考虑保存状态
            saveState() {
            
            },

            // todo 考虑持久保存 如本地localStorage
            restoreState() {
  
            },

			emitRowClick(row) {
				this.$emit('rowClick', row);
				this.$emit('row-click', row);
			}
        },
    };
</script>
<style>
*,
*:after,
*:before {
  position: relative;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.table-component {
  display: flex;
  flex-direction: column;
  margin: 4em 0;
}

.table-component__filter {
  align-self: flex-end;
}

.table-component__filter__field {
  padding: 0 1.25em 0 .75em;
  height: 2.5em;
  border: solid 2px #e0e0e0;
  border-radius: 2em;
  font-size: inherit;
}

.table-component__filter__clear {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2em;
  color: #007593;
  font-weight: bold;
  cursor: pointer;
}

.table-component__filter__field:focus {
  outline: 0;
  border-color: #007593;
}

.table-component__table-wrapper {
  overflow-x: auto;
  margin: 1em 0;
  width: 100%;
  border: solid 1px #ddd;
  border-bottom: none;
}

.table-component__table {
  min-width: 100%;
  border-collapse: collapse;
  border-bottom: solid 1px #ddd;
  table-layout: fixed;
}

.table-component__table__caption {
  position: absolute;
  top: auto;
  left: -10000px;
  overflow: hidden;
  width: 1px;
  height: 1px;
}

.table-component__table th,
.table-component__table td {
  padding: .75em 1.25em;
  vertical-align: top;
  text-align: left;
}

.table-component__table th {
  background-color: #e0e0e0;
  color: #999;
  text-transform: uppercase;
  white-space: nowrap;
  font-size: .85em;
}

.table-component__table tbody tr:nth-child(even) {
  background-color: #f0f0f0;
}

.table-component__table a {
  color: #007593;
}

.table-component__message {
  color: #999;
  font-style: italic;
}

.table-component__th--sort,
.table-component__th--sort-asc,
.table-component__th--sort-desc {
  text-decoration: underline;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.table-component__th--sort-asc:after,
.table-component__th--sort-desc:after {
  position: absolute;
  left: .25em;
  display: inline-block;
  color: #bbb;
}

.table-component__th--sort-asc:after {
  content: '↑';
}

.table-component__th--sort-desc:after {
  content: '↓';
}

</style>