<template>
  <!-- http://www.codeleading.com/article/8178349502/ -->
  <div class="search-form-box">
    <el-form
      :inline="true"
      :model="value"
      label-position="right"
      :label-width="formConfig.labelWidth"
      :rules="rules"
      size="mini"
    >
      <!-- 定制的搜索框 -->
      <!-- slot="formItem" 不建议使用  -->
      <slot name="formItem"></slot>
      <template v-if="formConfig.formItemList && formConfig.formItemList.length">
        <el-form-item
          v-for="(item, index) in formConfig.formItemList"
          v-if="!item.operate"
          :key="index"
          :label="item.label"
          :prop="item.prop"
        >
          <el-input
            v-if="item.type === 'input'"
            v-model="value[item.prop]"
            :disabled="item.disabled"
            :clearable="item.clearable"
            :placeholder="item.placeholder"
          ></el-input>
          <el-select
            v-else-if="item.type === 'select'"
            v-model="value[item.prop]"
            :disabled="item.disabled"
            :clearable="item.clearable"
            :multiple="item.multiple"
            :placeholder="item.placeholder"
          >
            <el-option
              v-for="(optItem, optIndex) in item.optList"
              :key="optIndex"
              :label="optItem.label"
              :value="optItem.value"
              :disabled="optItem.disabled"
            ></el-option>
          </el-select>
          <el-date-picker
            v-else-if="item.type === 'date-picker'"
            v-model="value[item.prop]"
            :type="item.datePickerType"
            :clearable="item.clearable"
            :disabled="item.disabled"
            :value-format="item.dateFormate"
            :placeholder="item.placeholder"
          ></el-date-picker>
        </el-form-item>
        <!-- 自定义的form-item (operate)-->
        <el-form-item
          v-else
          :key="index"
          :label="item.label"
          :prop="item.prop"
        >
          <slot :name="item.slotName"></slot>
        </el-form-item>
      </template>
      <div class="search-btn">
        <!-- 定制的搜索按钮 -->
        <slot
          name="operate"
          v-if="$slots.operate"
        ></slot>
        <el-button-group v-else>
          <el-button
            v-for="(item, index) in formConfig.operate"
            :key="index"
            :type="item.type"
            :size="item.size"
            :icon="item.icon"
            @click="item.handleClick"
          >{{item.name}}</el-button>
        </el-button-group>
      </div>
    </el-form>
  </div>

</template>

<script>
export default {
  name: 'MiSearchForm',
  props: {
    formConfig: {
      type: Object,
      required: true
    },
    value: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  mounted () {
    this.setDefaultValue()
  },
  methods: {
    setDefaultValue () {
      const formData = { ...this.value }
      // 设置默认值
      this.formConfig.formItemList.forEach(({ key, value }) => {
        if (formData[key] === undefined || formData[key] === null) {
          formData[key] = value
        }
      })
      this.$emit('input', formData)
    }
  }
}
</script>
