/* eslint-disable */
const version = require('../../package.json').version

module.exports = {
  'zh-CN': {
    header: {
      logo: {
        image: 'https://img.yzcdn.cn/public_files/2017/12/18/fd78cf6bb5d12e2a119d0576bedfd230.png',
        title: 'miview',
        version,
        href: '#/'
      },
      nav: {
        'Vue 组件': 'https://github.com/ly2011/miview',
        lang: {
          text: 'En',
          from: 'zh-CN',
          to: 'en-US'
        },
        github: 'https://github.com/ly2011/miview'
      }
    },
    nav: [
      {
        name: '开发指南',
        groups: [
          {
            list: [
              {
                path: '/intro',
                title: '介绍'
              },
              { path: '/install', title: '安装' },
              {
                path: '/quickstart',
                title: '快速上手'
              },
              {
                name: 'index',
                path: '/',
                type: 'pages'
              }
            ]
          }
        ]
      },
      {
        name: '组件',
        showInMobile: true,
        groups: [
          {
            groupName: '基础组件',
            list: [
              {
                path: '/dialog',
                title: 'Dialog 弹框'
              },
              {
                path: '/back-top',
                title: 'BackTop 回到顶部'
              }
            ]
          },
          {
            groupName: '表单组件',
            list: [
              { path: '/paste-select', title: 'PasteSelect 复制粘贴器' },
              { path: '/select', title: 'Select 选择器' },
              { path: '/language-input', title: 'LanguageInput 多语言' },
              { path: '/search-form', title: 'SearchForm' }
            ]
          },
          {
            groupName: '反馈组件',
            list: [
              {
                path: '/loading-bar',
                title: 'LoadingBar 加载'
              }
            ]
          },
          {
            groupName: '展示组件',
            list: [
              {
                path: '/simple-img-preview',
                title: 'SimpleImgPreview 图片预览'
              },
              {
                path: '/table',
                title: 'Table 表格'
              },
              {
                path: '/drawer',
                title: 'Drawer 抽屉'
              },
              {
                path: '/ellipsis',
                title: 'Ellipsis 文本自动省略号'
              },
              {
                path: '/picture-preview',
                title: 'PicturePreview 图片查看器'
              }
            ]
          },
          {
            groupName: '导航组件',
            list: [
              {
                path: '/tree-select',
                title: 'TreeSelect 树选择'
              }
            ]
          }
        ]
      }
    ]
  }
}
