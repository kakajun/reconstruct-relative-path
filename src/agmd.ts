#!/usr/bin/env node
'use strict'
import path from 'path'
import fs from 'fs'
import { getMd, wirteMd, wirteJs } from './index'
import stringToArgs from '../script/cli'
import handle from '../script/cli/handle'
const options = stringToArgs(process.argv)
const { ignores: ignore, includes: include } = handle(options)
/**
 * @description:Automatic generation of the whole process  自动生成全流程
 * @param {*}
 * @return {*}
 */
function agmd() {
  const { md, nodes } = getMd({ ignore, include })
  // 得到md文档
  console.log('\x1B[36m%s\x1B[0m', '*** location: ', `${path.resolve('./')}\\readme-md.md`)
  wirteMd(md, `${path.resolve('./')}\\readme-md.md`)
  // 得到md对象
  wirteJs(JSON.stringify(nodes), path.resolve('./') + '\\readme-file.js')
  witeFile()
}

/**
 * @desc: 写文件
 * @author: majun
 */
function witeFile() {
  const file = 'D:\\gitwork\\reconstruct-relative-path\\unuse\\main.js'
  let fileStr = fs.readFileSync(file, 'utf-8')
  fileStr = '// 我加注释 \n' + fileStr
  const sarr = fileStr.split(/[\n,]/g)
   let rootPath = path.resolve('./')
  sarr.forEach((ele) => {
    // 注释的不转
    if (ele.indexOf('//') < 0) {
      const impStr = ele.match(/import.*from [\"|\'](.*)[\'|\"]/)
      // 没有import的不转
      if (impStr && impStr[1]) {
        let filePath = impStr[1]
        // 如果有@符号的
        if (filePath.indexOf('@')>-1) {
          console.log(filePath)

          console.log()
        }

        }

    }
  })
  // const file = path.resolve(__dirname, file)
  // 异步写入数据到文件
  // console.log(str)
  fs.writeFile(file, fileStr, { encoding: 'utf8' }, () => {
    console.log('Write successful')
  })
}
agmd()
