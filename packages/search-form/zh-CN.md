## SearchForm

### 使用指南

```js
import { SearchForm } from 'miview'
Vue.use(SearchForm)
```

### 代码演示

<script>
export default {
  data () {
    return {
      formConfig: {
        labelWidth: '90px',
        formItemList: [
          {
            type: 'date-picker',
            datePickerType: "month",
            dateFormate: 'yyyy-MM',
            prop: "month",
            label: "统计月",
            placeholder: "统计月"
          },
          {
            type: "select",
            prop: "org",
            label: "运营商",
            placeholder: "运营商",
            optList: [
              {label: '中国移动', value: '中国移动'},
              {label: '中国联通', value: '中国联通'},
              {label: '中国电信', value: '中国电信'}
            ]
          },
          {
            type: 'date-picker',
            datePickerType: "date",
            prop: "startTime",
            dateFormate: 'yyyy-MM-dd',
            label: "承诺启用时间",
            placeholder: "承诺启用时间"
          },
          {
            type: 'date-picker',
            datePickerType: "date",
            prop: "endTime",
            dateFormate: 'yyyy-MM-dd',
            label: "承诺停用时间",
            placeholder: "承诺停用时间"
          },
          {type: 'input', prop: 'operateColumn', label: '自定义的form-item', slotName: 'date', operate: true, placeholder: '自定义'},
          {
            type: "select",
            prop: "direction",
            label: "话务方向",
            placeholder: "话务方向",
            optList: []
          }
        ],
        operate: [
          {
            icon: "el-icon-search",
            type: "primary",
            name: '查询',
            size: 'small',
            handleClick: this.search
          }
        ]
      },
      form: {
      },
      myOptions: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }]
    }
  },
  methods: {
    search() {
      console.log(this.form)
    }
  }
}
</script>
<div class="demo-block">
  <mi-search-form
    :formConfig="formConfig"
    :value="form"
  >
    <template slot="date">
      <el-input v-model="form.operateColumn" />
    </template>
    <template slot="formItem" style="display: none;">
      <el-form-item label="自定义label">
        <el-select v-model="form.mySelected" placeholder="请选择">
          <el-option v-for="item in myOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </template>
  </mi-search-form>
</div>

:::demo
```html
<template>
  <div class="search-form-example">
    <mi-search-form
      :formConfig="formConfig"
      :value="form"
    >
      <template slot="date">
        <el-input v-model="form.operateColumn" />
      </template>
      <template slot="formItem" style="display: none;">
        <el-form-item label="自定义label">
          <el-select v-model="form.mySelected" placeholder="请选择">
            <el-option v-for="item in myOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </template>
    </mi-search-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formConfig: {
        labelWidth: '90px',
        formItemList: [
          {
            type: 'date-picker',
            datePickerType: "month",
            dateFormate: 'yyyy-MM',
            prop: "month",
            label: "统计月",
            placeholder: "统计月"
          },
          {
            type: "select",
            prop: "org",
            label: "运营商",
            placeholder: "运营商",
            optList: [
              {label: '中国移动', value: '中国移动'},
              {label: '中国联通', value: '中国联通'},
              {label: '中国电信', value: '中国电信'}
            ]
          },
          {
            type: 'date-picker',
            datePickerType: "date",
            prop: "startTime",
            dateFormate: 'yyyy-MM-dd',
            label: "承诺启用时间",
            placeholder: "承诺启用时间"
          },
          {
            type: 'date-picker',
            datePickerType: "date",
            prop: "endTime",
            dateFormate: 'yyyy-MM-dd',
            label: "承诺停用时间",
            placeholder: "承诺停用时间"
          },
          {type: 'input', prop: 'operateColumn', label: '自定义的form-item', slotName: 'date', operate: true, placeholder: '自定义'},
          {
            type: "select",
            prop: "direction",
            label: "话务方向",
            placeholder: "话务方向",
            optList: []
          }
        ],
        operate: [
          {
            icon: "el-icon-search",
            type: "primary",
            name: '查询',
            size: 'small',
            handleClick: this.search
          }
        ]
      },
      form: {
      }
  },
  methods: {
    search() {
      console.log(this.form)
    }
  }
}
</script>
```
:::

### API

参数 | 说明 | 类型 | 可选值 | 默认值
--- | --- | --- | --- | --- |
| form-config | form表单配置信息 | Object | - | - |
| form| form表单的值 | Object | - | - |

### formItemList API参数

参数 | 说明 | 类型 | 可选值 | 默认值
--- | --- | --- | --- | --- |
| type | form-item类型 | String | input/select/date-picker | - |
| prop | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | String | 传入 Form 组件的 model 中的字段 | - |
| label | 标签文本 | String | - | - |
| placeholder | 占位符 | String | - | - |
| clearable | 是否可以清空选项 | Boolean | - | - |
| disabled | 是否禁用 | Boolean | - | - |
| multiple | 是否多选 | Boolean | - | - |
| optList | 占位符(若type="select"时，存在该属性) | Array | - | - |
| operate | 是否是定制的form-item | Boolean | - | - |
| slotName | 若operate=true时，存在该属性 | String | - | - |
| datePickerType | 日期显示类型(若type="date-picker"时，需定义该属性) | String | year/month/date/dates/week/datetime/datetimerange/daterange | - |
| dateFormate | 日期格式(若type="date-picker"时，需定义该属性) | String | 见[日期格式](http://element-cn.eleme.io/#/zh-CN/component/date-picker#ri-qi-ge-shi) | yyyy-MM-dd |

### slot

事件名称 | 说明
---|---
operate | 自定义操作栏