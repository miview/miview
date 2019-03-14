/* eslint-disable */
// This file is auto gererated by build/build-entry.js
import BackTop from './back-top';
import Dialog from './dialog';
import Drawer from './drawer';
import IndexScss from './index.scss';
import LanguageInput from './language-input';
import LoadingBar from './loading-bar';
import PasteSelect from './paste-select';
import SearchForm from './search-form';
import Select from './select';
import SimpleImgPreview from './simple-img-preview';
import SvgIcon from './svg-icon';
import Table from './table';
import Transfer from './transfer';
import TreeSelect from './tree-select';
const version = '0.2.23';
const components = [
  BackTop,
  Dialog,
  Drawer,
  IndexScss,
  LanguageInput,
  LoadingBar,
  PasteSelect,
  SearchForm,
  Select,
  SimpleImgPreview,
  SvgIcon,
  Table,
  Transfer,
  TreeSelect
];
const install = Vue => {
  components.forEach(Component => {
    Vue.use(Component);
  });
};
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export {
  install,
  version,
  BackTop,
  Dialog,
  Drawer,
  IndexScss,
  LanguageInput,
  LoadingBar,
  PasteSelect,
  SearchForm,
  Select,
  SimpleImgPreview,
  SvgIcon,
  Table,
  Transfer,
  TreeSelect
};
export default {
  install,
  version
};
