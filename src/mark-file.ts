/**
 *================================================
 *@date:2022/04/04
 *@author:mj
 *@desc:给路由文件打标记, 把标记打到最后,因为头部已经给了注释
 *
 *================================================
 */
// import { getFileNodes } from './get-file'
// import { relativeToabsolute } from './change-path'
import fs from 'fs'

import { ItemType } from './get-file'
import createDebugger from 'debug'
const debug = createDebugger('mark-file')
debug.enabled = true
//1. 整理要分类的路由,搞个数组对象分类
const classifiedRouting = [
  {
    name: '1工程',
    router: [
      {
        path: '/about',
        name: 'about',
        // 路由必须都是绝对路径
        component: '@/App.vue'
      }
    ]
  }
]
/**
 * @desc: 标记文件主程序
 * @author: majun
 * @param {ItemType} nodes
 * @param {string} rootPath
 */
export default function markFile(nodes: ItemType[], rootPath: string) {
  // 外层循环要分类的路由
  classifiedRouting.forEach((ele) => {
    // 这里循环打标记的路由
    ele.router.forEach((obj: { component: any }) => {
      const path = obj.component
      // 路径转绝对路径
      let absolutePath = path.replace('@', rootPath)
      // 打标记
      setmark(absolutePath, ele.name)
      // 通过文件地址, 找到nodes的依赖地址, 把依赖文件也打标记
      const node = findNodes(nodes, absolutePath)
      if (node && node.imports) {
        // 找到有子文件了,循环它
        debug(node.imports, '8888')
        node.imports.forEach((element) => {
          debug(element, '777222')
          // 打标记
          setmark(element, ele.name)
        })
      }
    })
  })

}

/**
 * @desc: 递归通过文件全名找节点
 * @author: majun
 * @param {*} nodes
 * @param {*} path
 */
function findNodes(nodes: Array<ItemType>, path: string): ItemType | null {
  let node = null
  // 里面有/符号的要替换为\, 不然后面全等不了
  const renamePath = path.replace('/', '\\')
  function find(nodes: Array<ItemType>) {
    for (let index = 0; index < nodes.length; index++) {
      const element = nodes[index]
      if (element.children) find(element.children)
      // console.log(element.fullPath, '=====', renamePath)
      if (element.fullPath === renamePath) node = element
    }
  }
  find(nodes)
  return node
}

/**
 * @desc: 给文件标记
 * @author: majun
 * @param {string} file
 * @param {string} name
 */
function setmark(file: string, name: string) {
  console.log(file, name)
  let fileStr = fs.readFileSync(file, 'utf-8')
  //  console.log(fileStr)
  fileStr = fileStr + '//' + name+'\n'
  fs.writeFile(file, fileStr, { encoding: 'utf8' }, () => {
    console.log('mark successful-------' + file)
  })
}
