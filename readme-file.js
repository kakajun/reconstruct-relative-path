export default [
  {
    name: 'script',
    isDir: true,
    level: 0,
    note: '',
    children: [
      {
        name: 'cli',
        isDir: true,
        level: 1,
        note: '',
        children: [
          {
            name: 'handle.ts',
            isDir: false,
            level: 2,
            note: '',
            size: 681,
            rowSize: 30,
            imports: ['../help', '../../package.json'],
            suffix: '.ts',
            fullPath: 'D:\\gitwork\\reconstruct-relative-path\\script\\cli\\handle.ts'
          },
          {
            name: 'index.ts',
            isDir: false,
            level: 2,
            note: '',
            size: 539,
            rowSize: 38,
            imports: ['arg'],
            suffix: '.ts',
            fullPath: 'D:\\gitwork\\reconstruct-relative-path\\script\\cli\\index.ts'
          }
        ]
      },
      {
        name: 'help',
        isDir: true,
        level: 1,
        note: '',
        children: [
          {
            name: 'index.ts',
            isDir: false,
            level: 2,
            note: '',
            size: 640,
            rowSize: 38,
            imports: [],
            suffix: '.ts',
            fullPath: 'D:\\gitwork\\reconstruct-relative-path\\script\\help\\index.ts'
          }
        ]
      },
      {
        name: 'build.js',
        isDir: false,
        level: 1,
        note: '',
        size: 172,
        rowSize: 8,
        imports: [],
        suffix: '.js',
        fullPath: 'D:\\gitwork\\reconstruct-relative-path\\script\\build.js'
      },
      {
        name: 'builder.js',
        isDir: false,
        level: 1,
        note: '',
        size: 1239,
        rowSize: 74,
        imports: [],
        suffix: '.js',
        fullPath: 'D:\\gitwork\\reconstruct-relative-path\\script\\builder.js'
      }
    ]
  },
  {
    name: 'src',
    isDir: true,
    level: 0,
    note: '',
    children: [
      {
        name: 'agmd.ts',
        isDir: false,
        level: 1,
        note: '',
        size: 790,
        rowSize: 35,
        imports: ['path', '../script/cli', '../script/cli/handle'],
        suffix: '.ts',
        fullPath: 'D:\\gitwork\\reconstruct-relative-path\\src\\agmd.ts'
      },
      {
        name: 'index.ts',
        isDir: false,
        level: 1,
        note: '',
        size: 9372,
        rowSize: 420,
        imports: ['fs', 'path'],
        suffix: '.ts',
        fullPath: 'D:\\gitwork\\reconstruct-relative-path\\src\\index.ts'
      },
      {
        name: 'path.ts',
        isDir: false,
        level: 1,
        note: '',
        size: 747,
        rowSize: 47,
        imports: [],
        suffix: '.ts',
        fullPath: 'D:\\gitwork\\reconstruct-relative-path\\src\\path.ts'
      }
    ]
  },
  {
    name: 'test',
    isDir: true,
    level: 0,
    note: '',
    children: [
      {
        name: 'index.js',
        isDir: false,
        level: 1,
        note: '',
        size: 88,
        rowSize: 4,
        imports: [],
        suffix: '.js',
        fullPath: 'D:\\gitwork\\reconstruct-relative-path\\test\\index.js'
      }
    ]
  },
  {
    name: 'unuse',
    isDir: true,
    level: 0,
    note: '',
    children: [
      { name: 'assets', isDir: true, level: 1, note: '', children: [] },
      {
        name: 'components',
        isDir: true,
        level: 1,
        note: '',
        children: [
          {
            name: 'user-ruler.vue',
            isDir: false,
            level: 2,
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
            level: 2,
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
        level: 1,
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
        level: 1,
        note: '// 我加注释 ',
        size: 458,
        rowSize: 27,
        imports: ['vue', './App.vue', '@/unuse/component/user-ruler.vue'],
        suffix: '.js',
        fullPath: 'D:\\gitwork\\reconstruct-relative-path\\unuse\\main.js'
      }
    ]
  },
  {
    name: '.eslintrc.js',
    isDir: false,
    level: 0,
    note: '',
    size: 938,
    rowSize: 67,
    imports: [],
    suffix: '.js',
    fullPath: 'D:\\gitwork\\reconstruct-relative-path\\.eslintrc.js'
  }
]
