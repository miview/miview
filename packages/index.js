/* eslint-disable */
// This file is auto gererated by build/build-entry.js
import BackTop from './back-top';
import Cropper from './cropper';
import Dialog from './dialog';
import Drawer from './drawer';
import Ellipsis from './ellipsis';
import IndexScss from './index.scss';
import LanguageInput from './language-input';
import LoadingBar from './loading-bar';
import PasteSelect from './paste-select';
import PicturePreview from './picture-preview';
import SearchForm from './search-form';
import Select from './select';
import SimpleImgPreview from './simple-img-preview';
import SvgIcon from './svg-icon';
import Table from './table';
import Transfer from './transfer';
import TreeSelect from './tree-select';
const version = '0.3.0';
const components = [
  BackTop,
  Cropper,
  Dialog,
  Drawer,
  Ellipsis,
  IndexScss,
  LanguageInput,
  LoadingBar,
  PasteSelect,
  PicturePreview,
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
  Cropper,
  Dialog,
  Drawer,
  Ellipsis,
  IndexScss,
  LanguageInput,
  LoadingBar,
  PasteSelect,
  PicturePreview,
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
