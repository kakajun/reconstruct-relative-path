/**
*================================================
*@date:2022/04/04
*@author:mj
*@desc:整个文件主要把绝对路径修改为相对路径
*
*================================================
*/
import { ItemType } from './get-file'
import fs from 'fs'
import path from 'path'
// const file = 'D:\\gitwork\\reconstruct-relative-path\\unuse\\App.vue'
/**
 * @desc: 递归循环所有文件
 * @author: majun
 * @param {Array} nodes      整个文件的nodes
 * @param {string} rootPath  根路径
 */
export function changePath(nodes: Array<ItemType>, rootPath: string) {
  function getNode(nodes: Array<ItemType>) {
    nodes.forEach((ele) => {
      if (ele.children) {
        getNode(ele.children)
      } else {
        witeFile(rootPath, ele.fullPath)
      }
    })
  }
  getNode(nodes)
}

/**
 * @desc:  写文件
 * @author: majun
 * @param {string} rootPath  根地址
 * @param {string} file  目标地址
 */
function witeFile(rootPath: string, file: string, isRelative?:Boolean) {
  let fileStr = fs.readFileSync(file, 'utf-8')
  let writeFlag = false // 如果啥都没改, 不更新文件
  // fileStr = '// 我加注释 \n' + fileStr
  const sarr = fileStr.split(/[\n]/g)
  sarr.forEach((ele, index) => {
    // 注释的不转,其他公共也不转
    const ignore = ['//', '@xiwicloud/components', '@xiwicloud/lims']
    const flag=ignore.some((item) => ele.indexOf(item) < 0)
    if (flag) {
      const impStr = ele.match(/import.*from [\"|\'](.*)[\'|\"]/)
      // 没有import的不转
      if (impStr && impStr[1]) {
        let filePath = impStr[1]
        // 如果有@符号的, 并且忽略文件的
        if (isRelative) {
               if (filePath.indexOf('@') > -1) {
                 // console.log(filePath)
                 let relative = filePath.replace('@', rootPath)
                 let relatPath = absoluteTorelative(relative, file)
                 // console.log(relatPath)
                 // 把改好的替换回去
                 sarr[index] = ele.replace(filePath, relatPath)
                 writeFlag = true
               }
        } else {
          if (filePath.indexOf('@') === -1 && (filePath.indexOf('./') > -1 || filePath.indexOf('../') > -1)) {
            let absolutetPath = relativeToabsolute(filePath, file)
            // console.log(relatPath)
            // 把改好的替换回去
            sarr[index] = ele.replace(filePath, absolutetPath)
            writeFlag = true
          }
        }
      }
    }
  })
  if (writeFlag) {
    fileStr = sarr.join('\n')
    // 异步写入数据到文件
    // console.log(str)
    fs.writeFile(file, fileStr, { encoding: 'utf8' }, () => {
      console.log('Write successful-------' + file)
    })
  }
}

/**
 * @desc: 绝对路径转相对路径
 * @author: majun
 * @param {*} relative
 * @param {*} absolute
 */
function absoluteTorelative(relative: string, absolute: string) {
  let rela = relative.split('/')
  rela.shift()
  let abso = absolute.split('/')
  abso.shift()
  let num = 0
  for (let i = 0; i < rela.length; i++) {
    if (rela[i] === abso[i]) {
      num++
    } else {
      break
    }
  }
  rela.splice(0, num)
  abso.splice(0, num)
  let str = ''
  for (let j = 0; j < abso.length - 1; j++) {
    str += '../'
  }
  if (!str) {
    str += './'
  }
  str += rela.join('/')
  return str
}


/**
 * @desc: 相对路径转绝对路径
 * @author: majun
 *     let a = '../c/d/main.js'
    let b = '/a/b/zhangjing/index.js'
 * @param {string} relative
 * @param {string} absolute
 */
export function relativeToabsolute(relative: string, absolute: string) {
  let rela = relative.split('/')
  let abso = absolute.split('/')
  for (let j = 0; j < rela.length - 1; j++) {
  if (rela[j] === '..') {
     abso.pop()
     abso.pop()
    rela.shift()
  } else if (rela[j] === '.') {
    abso.pop()
    rela.shift();
    break
  }
}
  let str =abso.join('/')+'/' +rela.join('/')
  return str
}


/**
 * @description: Write the result to JS file 把结果写入到js文件
 * @param {data}  要写的数据
 * @return {fileName}  要写入文件地址
 */
export function wirteJsNodes(data: string, filePath: string) {
  const file = path.resolve(__dirname, filePath)
  const pre = 'export default'
  // 异步写入数据到文件
  fs.writeFile(file, pre + data, { encoding: 'utf8' }, (err) => {
    console.error(err)
  })
}
