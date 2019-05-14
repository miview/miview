## Table 表格

### 使用指南

```js
import { Table } from 'miview'
Vue.use(Table)
```

### 代码演示

#### 基本用法

<style>
	.table {
		.table-msg {
			margin-left: 5px;
			color: red;
		}
	}
</style>
<div class="demo-back-top demo-block">
  <div class="table">
    <mi-table
      :table-data="tableData"
      :table-header="tableHeader"
      :is-expand="false"
      :is-expand-one="false"
      :is-index="true"
      :is-select="true"
      :fixed-height="300"
    >
      <template
        slot="date"
        slot-scope="scope"
      >
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px;">{{scope.row.date | formatDate}}</span>
      </template>
      <template
        slot="name"
        slot-scope="scope"
      >
        <el-popover
          placement="top"
          trigger="hover"
        >
          <p>姓名：{{scope.row.name}}</p>
          <p>住址：{{scope.row.address}}</p>
          <div
            slot="reference"
            class="name-wrapper"
          >
            <el-tag size="medium">{{scope.row.name}}</el-tag>
          </div>
        </el-popover>
      </template>
    </mi-table>
  </div>
</div>

<script>
import moment from 'moment'
export default {
  name: 'TableExample',
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄, 上海市普陀区金沙江路 1518 弄, 上海市普陀区金沙江路 1518 弄, 上海市普陀区金沙江路 1518 弄, 上海市普陀区金沙江路 1518 弄',
        company: '马可波罗1'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        company: '马可波罗2'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        company: '马可波罗3'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        company: '马可波罗4'
      }],
      tableHeader: [
        { label: '日期', prop: 'date', width: '200', slotName: 'date' }, // slots方式渲染
        {
          label: '姓名', prop: 'name', width: '200', render: (h, params) => { // render方式渲染
            return <el-popover
                placement="top"
                trigger="hover"
              >
                <p>姓名：{params.row.name}</p>
                <p>住址：{params.row.address}</p>
                <div
                  slot="reference"
                  class="name-wrapper"
                >
                  <el-tag size="medium">{params.row.name}</el-tag>
                </div>
              </el-popover>
          }
        },
        { label: '地址', prop: 'address', renderHeader: this.renderHeader, width: '200' }, // 普通方式渲染
        { label: '公司', prop: 'company', width: '300' }
      ],
      tableData2: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }],
      tableHeader2: [
        { label: '日期', prop: 'date', width: '200', slotName: 'date' }, // slots方式渲染
        {
          label: '姓名', prop: 'name', width: '200', render: (h, params) => { // render方式渲染
            return <el-popover
                placement="top"
                trigger="hover"
              >
                <p>姓名：{params.row.name}</p>
                <p>住址：{params.row.address}</p>
                <div
                  slot="reference"
                  class="name-wrapper"
                >
                  <el-tag size="medium">{params.row.name}</el-tag>
                </div>
              </el-popover>
          }
        },
        { label: '地址', renderHeader: this.renderHeader, width: '200',
          children: [
            { label: '省份', prop: 'province', width: '120' },
            { label: '市区', prop: 'city', width: '120' },
            { label: '地址', prop: 'address', width: '120', slotName: 'location' },
            { label: '邮编', prop: 'zip', width: '120' }
          ]
        } // 普通方式渲染
      ]
    }
  },
  methods: {
    renderHeader (h, { column, $index }) { // 原始数据表格，休息日天数标签生成函数
      return (
        <div>
          <span>地址</span>
          <el-tooltip class="item" effect="light" content="该用户目前所处的住址" placement="bottom-start">
            <i class="el-icon-info table-msg" />
          </el-tooltip>
        </div>
      );
    }
  },
  filters: {
    // 格式化时间
    formatDate (value, format = 'YYYY/MM/DD') {
      if (value) {
        return moment(value).format(format)
      }
      return value
    }
  }
}
</script>

:::demo
```html
<div class="demo-back-top demo-block">
  <div class="table">
    <mi-table
      :table-data="tableData"
      :table-header="tableHeader"
      :is-expand="false"
      :is-expand-one="false"
      :is-index="true"
      :is-select="true"
      :fixed-height="300"
    >
      <template
        slot="date"
        slot-scope="scope"
      >
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px;">{{scope.row.date | formatDate}}</span>
      </template>
      <template
        slot="name"
        slot-scope="scope"
      >
        <el-popover
          placement="top"
          trigger="hover"
        >
          <p>姓名：{{scope.row.name}}</p>
          <p>住址：{{scope.row.address}}</p>
          <div
            slot="reference"
            class="name-wrapper"
          >
            <el-tag size="medium">{{scope.row.name}}</el-tag>
          </div>
        </el-popover>
      </template>
    </mi-table>
  </div>
</div>

<script>
import moment from 'moment'
export default {
  name: 'TableExample',
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄, 上海市普陀区金沙江路 1518 弄, 上海市普陀区金沙江路 1518 弄, 上海市普陀区金沙江路 1518 弄, 上海市普陀区金沙江路 1518 弄',
        company: '马可波罗1'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        company: '马可波罗2'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        company: '马可波罗3'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        company: '马可波罗4'
      }],
      tableHeader: [
        { label: '日期', prop: 'date', width: '200', slotName: 'date' }, // slot方式渲染
        {
          label: '姓名', prop: 'name', width: '200', render: (h, params) => { // render方式渲染
            return <el-popover
                placement="top"
                trigger="hover"
              >
                <p>姓名：{params.row.name}</p>
                <p>住址：{params.row.address}</p>
                <div
                  slot="reference"
                  class="name-wrapper"
                >
                  <el-tag size="medium">{params.row.name}</el-tag>
                </div>
              </el-popover>
          }
        },
        { label: '地址', prop: 'address', width: '200', renderHeader: this.renderHeader }, // 普通方式渲染
        { label: '公司', prop: 'company', width: '300' }
      ]
    }
  },
  methods: {
    renderHeader (h, { column, $index }) { // 原始数据表格，休息日天数标签生成函数
      return (
        <div>
          <span>地址</span>
          <el-tooltip class="item" effect="light" content="该用户目前所处的住址" placement="bottom-start">
            <i class="el-icon-info table-msg" />
          </el-tooltip>
        </div>
      );
    }
  },
  filters: {
    // 格式化时间
    formatDate (value, format = 'YYYY/MM/DD') {
      if (value) {
        return moment(value).format(format)
      }
      return value
    }
  }
}
</script>

<style lang="scss">
	.table {
		.table-msg {
			margin-left: 5px;
			color: red;
		}
	}
</style>
```
:::

#### 多级表头

<style>
	.table {
		.table-msg {
			margin-left: 5px;
			color: red;
		}
	}
</style>
<div class="demo-back-top demo-block">
  <div class="table">
    <mi-table
      :table-data="tableData2"
      :table-header="tableHeader2"
      :is-expand="false"
      :is-expand-one="false"
      :is-index="true"
      :is-select="true"
      :fixed-height="300"
    >
      <template
        slot="date"
        slot-scope="scope"
      >
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px;">{{scope.row.date | formatDate}}</span>
      </template>
      <template
        slot="name"
        slot-scope="scope"
      >
        <el-popover
          placement="top"
          trigger="hover"
        >
          <p>姓名：{{scope.row.name}}</p>
          <p>住址：{{scope.row.address}}</p>
          <div
            slot="reference"
            class="name-wrapper"
          >
            <el-tag size="medium">{{scope.row.name}}</el-tag>
          </div>
        </el-popover>
      </template>
      <!-- 二级表头数据 -->
      <template
        slot="location"
        slot-scope="scope"
      >
        <i class="el-icon-location"></i>
        <span style="margin-left: 10px;">{{scope.row.address}}</span>
      </template>
    </mi-table>
  </div>
</div>

:::demo
```html
<div class="demo-back-top demo-block">
  <div class="table">
    <mi-table
      :table-data="tableData2"
      :table-header="tableHeader2"
      :is-expand="false"
      :is-expand-one="false"
      :is-index="true"
      :is-select="true"
      :fixed-height="300"
    >
      <template
        slot="date"
        slot-scope="scope"
      >
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px;">{{scope.row.date | formatDate}}</span>
      </template>
      <template
        slot="name"
        slot-scope="scope"
      >
        <el-popover
          placement="top"
          trigger="hover"
        >
          <p>姓名：{{scope.row.name}}</p>
          <p>住址：{{scope.row.address}}</p>
          <div
            slot="reference"
            class="name-wrapper"
          >
            <el-tag size="medium">{{scope.row.name}}</el-tag>
          </div>
        </el-popover>
      </template>
      <!-- 二级表头数据 -->
      <template
        slot="location"
        slot-scope="scope"
      >
        <i class="el-icon-location"></i>
        <span style="margin-left: 10px;">{{scope.row.address}}</span>
      </template>
    </mi-table>
  </div>
</div>

<script>
import moment from 'moment'
export default {
  name: 'TableExample',
  data () {
    return {
      tableData2: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }],
      tableHeader2: [
        { label: '日期', prop: 'date', width: '200', slotName: 'date' }, // slots方式渲染
        {
          label: '姓名', prop: 'name', width: '200', render: (h, params) => { // render方式渲染
            return <el-popover
                placement="top"
                trigger="hover"
              >
                <p>姓名：{params.row.name}</p>
                <p>住址：{params.row.address}</p>
                <div
                  slot="reference"
                  class="name-wrapper"
                >
                  <el-tag size="medium">{params.row.name}</el-tag>
                </div>
              </el-popover>
          }
        },
        { label: '地址', prop: 'address', renderHeader: this.renderHeader, width: '200',
          children: [
            { label: '省份', prop: 'province', width: '120' },
            { label: '市区', prop: 'city', width: '120' },
            { label: '地址', prop: 'address', width: '120', slotName: 'location' },
            { label: '邮编', prop: 'zip', width: '120' }
          ]
        } // 普通方式渲染
      ]
    }
  },
  methods: {
    renderHeader (h, { column, $index }) { // 原始数据表格，休息日天数标签生成函数
      return (
        <div>
          <span>地址</span>
          <el-tooltip class="item" effect="light" content="该用户目前所处的住址" placement="bottom-start">
            <i class="el-icon-info table-msg" />
          </el-tooltip>
        </div>
      );
    }
  },
  filters: {
    // 格式化时间
    formatDate (value, format = 'YYYY/MM/DD') {
      if (value) {
        return moment(value).format(format)
      }
      return value
    }
  }
}
</script>

<style lang="scss">
	.table {
		.table-msg {
			margin-left: 5px;
			color: red;
		}
	}
</style>
```
:::

### 参数

### API

参数 | 说明 | 类型 | 可选值 | 默认值
--- | --- | --- | --- | --- |
table-data | 表格数据列表 | Array | - | []
table-header | 表格对应名称和关键字(表头数据) | Array | - | []
is-select | 是否显示勾选框 | Boolean | - | false
is-index | 是否显示索引列 | Boolean | - | false
fixed-height | 固定高度 | Number/String | - | -
pagination | 表格分页信息 | Object | - | -

### table-header API参数

参数 | 说明 | 类型 | 可选值 | 默认值
--- | --- | --- | --- | --- |
slotName | 使用template模板(slot)渲染, slot的名称 | String | - | -
render | 使用渲染函数(render)渲染 | Functiom(h, params) | - | -
label | 对应列的标题(label) | String | - | -
prop | 对应列的字段名(prop) | String | - | -
width | 对应列的宽度 | String | - | -
min-width | 对应列的最小宽度 | String | - | -
fixed | 是否固定列 | String/Boolean | true/left/right | -
sortable | 是否启用排序 | String/Boolean | true/false/'custom'(远程排序) | false
render-header | 渲染表头 | Functiom(h, {column, $index}) | - | -

### pagination API参数

参数 | 说明 | 类型 | 可选值 | 默认值
--- | --- | --- | --- | --- |
show | 是否展示分页组件 | Boolean | - | true
currentPage | 当前页数 | Number | - | 1
pageSize | 每页显示条目个数 | Number | - | -
total | 总条目数 | Number | - | 0
layout | 组件布局，子组件名用逗号分隔 | String | - | total, sizes, prev, pager, next, jumper

<div style="display: none;">
@param:
	tableData: 表格数据列表
	tableHeader: 表格对应名称和关键字
	isExpand: 是否显示展开行(true or false)
	isExpandOne: 展开行是否只显示一行(true of false)
	isSelect: 是否显示勾选框(true or false)
	isIndex: 是否显示索引列(true or false)
	fixed-height: 固定高度
	pagination: 表格分页信息
	@sub param
		prop: 对应列名
		label: 对应列的关键字
		width: 宽度
		minWidth: 最小宽度
		fixed: 是否固定列(boolean or left or right)
		sortable: 是否启用排序(true or false or 'custom'=>服务器排序)
		renderHeader: 定制表头
</div>

### Event

事件名称 | 说明 | 回调参数
---|--- | --- |
cellClick | 点击某个单元格触发 | -
sortChange | 当表格的排序条件发生变化时触发 | -
selectionChange | 当选择项发生变化时触发 | -
handleExpandRow | 当表格中某行展开或者关闭时触发 | -

