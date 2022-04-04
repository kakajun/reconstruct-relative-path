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

import { ItemType } from "./get-file";

// import path from 'path'
const classifiedRouting = [
  {
    name: '1工程',
    router: [
      {
        path: '/about',
        name: 'about',
        // 路由必须都是绝对路径
        component:'@/App.vue'
      }
    ]
  }
]
export default function markFile(nodes: ItemType[], rootPath: string) {
  //1. 整理要分类的路由,搞个数组对象分类
  console.log(classifiedRouting)
  //2. 循环解析import 找文件(如果子文件有依赖,继续找)
  parseImport(nodes, rootPath,classifiedRouting)
  //3. 给尾部打标记
}

function parseImport(nodes: ItemType[], rootPath: any,arrs: Array<any>) {
  arrs.forEach((ele) => {
    ele.router.forEach((obj: { component: any }) => {
      const path = obj.component
      // 路径转绝对路径
      let absolutePath = path.replace('@', rootPath)
      // 打标记
      setmark(absolutePath, ele.name)
      // 通过文件地址, 找到nodes的依赖地址, 把依赖文件也打标记
      const node = findNodes(nodes, absolutePath)
      if (node) {
      }
      // console.log(path, '777')
      // var a = '../c/d/main.js'
      // var b = '/a/b/zhangjing/index.js'
      // let c = relativeToabsolute(a, b)
      // console.log(c, '00')

    })
  })
}

/**
 * @desc: 递归通过文件全名找节点
 * @author: majun
 * @param {*} nodes
 * @param {*} path
 */
function findNodes(nodes: Array<ItemType>, path: string) {
   let node=null
  function find(nodes: Array<ItemType>){
    for (let index = 0; index < nodes.length; index++) {
      const element = nodes[index]
      if (element.children) find(element.children)
      if (element.fullPath === path) node= element
      else continue
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
 function setmark(file:string,name:string) {
   let fileStr = fs.readFileSync(file, 'utf-8')
  fileStr + '//' + name
    fs.writeFile(file, fileStr, { encoding: 'utf8' }, () => {
      console.log('mark successful-------' + file)
    })
 }
