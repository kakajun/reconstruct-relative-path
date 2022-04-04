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
 * @desc:
 * @author: majun
 * @param {ItemType} nodes
 * @param {string} name
 * @param {string} path
 * @param {string} path
 */
export  function markWriteFile(nodes: ItemType[], name: string, path: string, rootPath: string) {
  debug('入参: ', name, path)
  // 通过文件地址, 找到nodes的依赖地址, 把依赖文件也打标记
  const node = findNodes(nodes, path)
  // debug('查找的node: ', node)
  if (node && node.imports) {
    // 得到标记
    const belongTo = node.belongTo
    if (belongTo.length > 0) {
      setDispFile(node,  name,rootPath)
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
 * @desc: 这里创建文件夹和写文件
 * @author: majun
 * @param {ItemType} nodes
 * @param {string} name
 * @param {string} rootPath
 */
function setDispFile(node: ItemType,name: string, path: string) {
    debug('setDispFile入参: ', name, path)
  // 1. 依次找到最外层文件夹
  const relative = node.fullPath.replace(path + '\\', '')
  const foldName=relative.split('\\')
  debug('relative: ', relative)
  // 文件, copy文件
  if (foldName.indexOf('.') > -1) {
    copyFile(node.fullPath, name, path)
  } else {
    // 文件夹创建
    setFolder(path + '\\' + name, foldName[0])
    path = path + '\\' + name+foldName[0]
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
  if (!fs.existsSync(path + '\\' + name)) {
    fs.mkdirSync(path + '\\' + name)
  }
}
