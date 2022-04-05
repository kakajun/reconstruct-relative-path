/**
 *================================================
 *@date:2022/04/04
 *@author:mj
 *@desc:对打上标记的文件进行分类写入, 分步骤写方法, 虽然对于性能有影响, 但一点点算什么, 能够分步骤调试最好, 不要这个步骤, 直接注释掉这个方法就行
 *
 *================================================
 */
import createDebugger from 'debug'
import { findNodes } from './mark-file'
import fs from 'fs'
import { ItemType } from './get-file'
const debug = createDebugger('mark-write-file')
debug.enabled = true

/**
 * @desc:  递归文件子依赖创建文件- 文件外递归
 * @author: majun
 * @param {ItemType} nodes
 * @param {string} name
 * @param {string} path  绝对路径
 * @param {string} rootPath   确定哪一级开始创建文件夹
 */
export function markWriteFile(nodes: ItemType[], name: string, path: string, rootPath: string) {
  // debug('入参: ', name, path)
  // 通过文件地址, 找到nodes的依赖地址, 把依赖文件也打标记
  const node = findNodes(nodes, path)
  // debug('查找的node: ', node)
  if (node && node.imports) {
    // 得到标记
    const belongTo = node.belongTo
    if (belongTo.length > 0) {
      setDispFile(path, name, rootPath)
    }
    // 找到有子文件了,循环它
    for (let index = 0; index < node.imports.length; index++) {
      const element = node.imports[index]
      // debug('依赖文件: ', element)
      // 如果文件存在
      if (fs.existsSync(path)) {
        // 继续递归,直到子文件没有子文件
        markWriteFile(nodes, name, element, rootPath)
      } else {
        console.error('文件不存在', path)
      }
    }
  }
}

/**
 * @desc: 这里递归创建文件夹和写文件-文件内递归, 文件内处理, 不需要node
 *       怎么知道原始路径? 就是把name一级干掉即可,干掉name级别就和外面的一模一样
 * 这里就干两件事,1 创建文件夹, 2 创建文件
 *
 * @author: majun
 * @param {string} path    path 初始化时是原绝对路径, 后面就是已创建文件夹后的路径
 * @param {string} name   一直是工程名字
 * @param {string} rootPath  一直是跟路径
 * @param {string} restName  递归创建文件夹的剩余name
 */
function setDispFile(path: string, name: string, rootPath: string, restName?: string) {
  debug('setDispFile入参: ', path, name)
  let seconFlag = path.indexOf(name) > -1
  // 1. 依次找到最外层文件夹
  const relative =restName?restName: path.replace(rootPath + '\\', '')
  const foldNameArrs = relative.split('\\')
  debug('relative: ', relative)
  debug('foldNameArrs: ', foldNameArrs)
  //如果是文件, copy文件
  if (foldNameArrs[0].indexOf('.') > -1) {
    // copyFile(path, name, rootPath)
  } else {
    // 下面处理文件夹递归关系
    if (seconFlag) {
      //还不是文件, 文件夹创建
      setFolder(path, foldNameArrs[0])
    } else {
      //还不是文件, 文件夹创建--第一次
      setFolder(rootPath + '\\' + name, foldNameArrs[0])
      path = rootPath + '\\' + name + '\\' + foldNameArrs[0]
    }
    // 递归之前要去掉已建文件夹
     foldNameArrs.splice(0, 1)
    const newName = foldNameArrs.join('\\')
    debug('递归参数: ', path, newName)
    setDispFile(path, name, rootPath, newName)
  }
}

/**
 * @desc: 读取原文件,写入到新地址
 * @author: majun
 * @param {string} path
 * @param {string} name
 * @param {string} nuePath
 */
export function copyFile(path: string, name: string, newPath: string) {
  debug('copyFile入参: ', name, path, newPath)
  const str = fs.readFileSync(path, 'utf-8')
  // 异步写入数据到文件
  fs.writeFile(newPath, str, { encoding: 'utf8' }, () => {
    console.log('newfile write successful', newPath + name)
  })
}

/**
 * @desc: 给一个路径和包名,然后就创建文件夹,如果存在那就啥也不管
 * @author: majun
 * @param {type} params
 */
export function setFolder(path: string, name: string) {
  debug('setFolder入参: ', path, name)
  const foldNameArrs = path.split('\\')
  const latArr = foldNameArrs.pop()  // 最后一位和要创建的一位一样,那么就会无限创建文件夹
  if (path.indexOf('.') > -1 || latArr===name) {
    console.error('创建文件夹异常:')
    debug('name: ', name)
    debug('path: ', path)
    return
  }
  //路径最后一位有斜杆,那不处理,----------------- 这里给代码加点容错, 增加代码健壮性
  let newPath = path.substring(path.length - 1) === '\\' ? path : path + '\\'
  if (!fs.existsSync(newPath + name)) {
    fs.mkdirSync(newPath + name)
  }
}
