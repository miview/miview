# miview
> 基于element-ui二次开发的公共组件库

## package.json 说明文档

### scripts

- `yarn run bootstrap`: 安装依赖

- `yarn run dev`: 本地开发模式

- `yarn run dev:site`: 本地site站点生成预览

- `yarn run build:entry`: 自动生成 `packages/index.js`

- `yarn run build:site`: 线上site站点生成并部署

## 未来计划

- [x] calendar 日历
- [x] picture 预览器(https://github.com/faimaklg/vue-viewerjs)
- [x] pdf 预览器(https://pdfobject.com/)

## 项目构建参考

1. [mu-ui](https://github.com/mu-ui/mu-ui)
2. [VV-UI](https://github.com/VV-UI/VV-UI)
3. [vant](https://github.com/youzan/vant)

## Bug

1. element-ui@2.6.1上 LanguageInput 多语言组件在弹出框内输入内容，导致数据没法监听
2. element-ui@2.6.1/vue2.6上 TreeSelect 树选择器在多选上没法弹出(暂不确定是vue还是element 高版本引起的)