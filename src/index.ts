#!/usr/bin/env node
'use strict'
import path from 'path'
import { wirteMd, getMd } from './wirte-md'
import { changePath, wirteJsNodes } from './change-path'
import stringToArgs from '../script/cli'
import handle from '../script/cli/handle'
import markFile from './mark-file'
const options = stringToArgs(process.argv)
const { ignores: ignore, includes: include } = handle(options)
/**
 * @description:Automatic generation of the whole process  自动生成全流程
 * @param {*}
 * @return {*}
 */
function agmd() {
  let rootPath = path.resolve('./unuse')
  const { md, nodes } = getMd(rootPath,{ ignore, include })
  // 得到md文档
  console.log('\x1B[36m%s\x1B[0m', '*** location: ', `${path.resolve('./')}\\readme-md.md`)
  wirteMd(md, `${rootPath}\\readme-md.md`)
  // 得到md对象
  wirteJsNodes(JSON.stringify(nodes), rootPath + '\\readme-file.js')
  // 更改所有绝对路径
  changePath(nodes, rootPath)
  // 打标记
  markFile()
}
agmd()
