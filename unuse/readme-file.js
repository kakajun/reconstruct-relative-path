export default [
  { name: 'assets', isDir: true, level: 0, note: '', children: [] },
  {
    name: 'components',
    isDir: true,
    level: 0,
    note: '',
    children: [
      {
        name: 'user-ruler.vue',
        isDir: false,
        level: 1,
        note: '/* 这是vue2.0写法 */\r',
        size: 3652,
        rowSize: 204,
        imports: ['/lib/index.es.js?3242'],
        suffix: '.vue',
        fullPath: 'D:\\gitwork\\reconstruct-relative-path\\unuse\\components\\user-ruler.vue'
      },
      {
        name: 'user-rulerts.vue',
        isDir: false,
        level: 1,
        note: '/* 这是ts写法 */\r',
        size: 4219,
        rowSize: 239,
        imports: ['vue3-sketch-ruler', '../../lib/index.es', '../../src/index'],
        suffix: '.vue',
        fullPath: 'D:\\gitwork\\reconstruct-relative-path\\unuse\\components\\user-rulerts.vue'
      }
    ]
  },
  {
    name: 'App.vue',
    isDir: false,
    level: 0,
    note: '\r<script setup>\r// This starter template is using Vue 3 <script setup> SFCs\r// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup\rimport UserRuler from \'./components/user-rulerts.vue\'\r</script>\r\r<template>\r  <div>\r    <a href="https://data.avuejs.com/build/1" target="_blank" class="redlink">\r      实例地址:https://data.avuejs.com/build/1\r    </a>\r    <div>按住Ctril+鼠标滚轮可以缩放页面</div>\r  </div>\r  <UserRuler />\r</template>\r\r<style>\r#app {\r  margin-top: 60px;\r  font-family: Avenir Helvetica Arial sans-serif;\r  -webkit-font-smoothing: antialiased;\r  -moz-osx-font-smoothing: grayscale;\r  color: #2c3e50;\r  text-align: center;\r}\r</style>\r',
    size: 653,
    rowSize: 1,
    imports: ['./components/user-rulerts.vue'],
    suffix: '.vue',
    fullPath: 'D:\\gitwork\\reconstruct-relative-path\\unuse\\App.vue'
  },
  {
    name: 'main.js',
    isDir: false,
    level: 0,
    note: "import { createApp } from 'vue'import App from './App.vue'// import '../lib/style.css'import SketchRule from './unuse/component/user-ruler.vue'const app = createApp(App)app.use(SketchRule)// const MyComponent = app.component('SketchRule')// console.log(MyComponent 'MyComponentMyComponent')app.mount('#app')",
    size: 307,
    rowSize: 1,
    imports: [
      "./unuse/component/user-ruler.vue'const app = createApp(App)app.use(SketchRule)// const MyComponent = app.component('SketchRule')// console.log(MyComponent 'MyComponentMyComponent')app.mount('#app"
    ],
    suffix: '.js',
    fullPath: 'D:\\gitwork\\reconstruct-relative-path\\unuse\\main.js'
  }
]
