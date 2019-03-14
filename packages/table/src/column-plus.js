// 自定义内容的组件
export default {
  name: 'MiTableColumn',
  functional: true,
  props: {
    row: Object, // table-column每一行的数据
    render: Function,
    index: Number,
    column: {
      // 每一行的配置信息
      type: Object,
      default: null
    }
  },
  render (h, data) {
    const params = {
      row: data.props.row,
      index: data.props.index
    }

    if (data.props.column) params.column = data.props.column
    return data.props.render(h, params)
  }
}
