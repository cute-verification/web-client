import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index.js";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style/el-dark-style.css'

import 'mdui/mdui.css';
import 'mdui';

import 'element-plus/theme-chalk/dark/css-vars.css'
import {setColorScheme} from "mdui";

import './style/style.css'
import './style/table-animation.less';
import './style/material-icon.css'

import '@varlet/touch-emulator'

createApp(App).use(router).use(ElementPlus).mount('#app')
setColorScheme("#f9abff")
