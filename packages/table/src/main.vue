<template>
  <div class="i-table">
    <el-table
      class="table-box"
      :data="tableData"
      ref="table"
      :stripe="true"
      :height="fixedHeight"
      @cell-click="cellClick"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
      @expand-change="handleExpandRow"
    >
      <!-- expand -->
      <el-table-column v-if="isExpand" type="expand">
        <template slot-scope="scope">
          <slot name="expand" :$index="scope.$index" :row="scope.row"></slot>
        </template>
      </el-table-column>

      <!-- selection -->
      <el-table-column v-if="isSelect" type="selection" width="60" align="center"></el-table-column>

      <!-- index -->
      <el-table-column label="序号" v-if="isIndex" type="index" width="50" align="center"></el-table-column>

      <el-table-column
        v-for="(col, index) in tableHeader"
        :key="index"
        align="center"
        :type="col.type"
        :prop="col.prop"
        :label="col.label"
        :width="col.width"
        :min-width="col.minWidth"
        :fixed="col.fixed"
        :sortable="col.sortable"
        :render-header="col.renderHeader"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <!-- slot渲染 -->
          <slot v-if="col.slotName" :name="col.slotName" :$index="scope.$index" :row="scope.row" :prop="col.prop" :label="col.label"></slot>
          <!-- render函数渲染 -->
          <table-column-plus v-else-if="col.render" :render="col.render" :row="scope.row" :index="index" :column="col"></table-column-plus>
          <!-- 普通渲染 -->
          <span v-else>{{scope.row[col.prop]}}</span>
        </template>

        <template v-if="col.children && col.children.length">
          <el-table-column
            v-for="(child, j) in col.children"
            :key="`child${index+j+1}`"
            align="center"
            :type="child.type"
            :prop="child.prop"
            :label="child.label"
            :width="child.width"
            :min-width="child.minWidth"
            :fixed="child.fixed"
            :sortable="child.sortable"
            :render-header="child.renderHeader"
            show-overflow-tooltip
          >
            <template slot-scope="childScope">
              <!-- slot渲染 -->
              <slot
                v-if="child.slotName"
                :name="child.slotName"
                :$index="childScope.$index"
                :row="childScope.row"
                :prop="child.prop"
                :label="child.label"
              ></slot>
              <!-- render函数渲染 -->
              <table-column-plus v-else-if="child.render" :render="child.render" :row="childScope.row" :index="j" :column="child"></table-column-plus>
              <!-- 普通渲染 -->
              <span v-else>{{childScope.row[child.prop]}}</span>
            </template>
          </el-table-column>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 支持render渲染列表和简单数据渲染
import TableColumnPlus from './column-plus'
export default {
  name: 'MiTable',
  components: {
    TableColumnPlus
  },
  props: {
    tableData: { // 表格列表数据
      type: Array,
      default: () => [],
      required: true
    },
    tableHeader: { // 表头数据
      type: Array,
      default: () => [],
      required: true
    },
    isSelect: { // 是否显示勾选框
      type: Boolean,
      default: false
    },
    isExpand: { // 是否显示展开行
      type: Boolean,
      default: false
    },
    isExpandOne: { // 展示行是的只显示一行
      type: Boolean,
      default: false
    },
    isIndex: { // 是否显示索引列
      type: Boolean,
      default: false
    },
    fixedHeight: { // 固定高度
      type: [Number, String]
    },
    pagination: { // 分页信息
      type: Object,
      default: () => ({
        show: true, // 是否展示分页组件
        currentPage: 1,
        pageSize: 10,
        total: 0,
        layout: 'total, sizes, prev, pager, next, jumper'
      })
    }
  },
  methods: {
    sortChange (args) {
      this.$emit('sortChange', args)
    },
    cellClick (row, col, cell) {
      this.$emit('cellClick', { row, col, cell })
    },
    handleSelectionChange (list) {
      this.$emit('selectionChange', list)
    },
    handleExpandRow (row, expandRows) {
      if (this.isExpandOne) {
        this.$refs.table.store.states.expandRows = expandRows.length !== 0 ? [row] : [];
      }
      this.$emit('handleExpandRow', row, expandRows)
    },
    sizeChange (e) {
      this.$emit('size-change', e);
    },
    currentChange (e) {
      this.$emit('current-change', e);
    }
  }
}
</script>

