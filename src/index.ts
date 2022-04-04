#!/usr/bin/env node
'use strict'
import path from 'path'
import { wirteMd, getMd } from './wirteMd'
import { witeNodeFile, wirteJs } from './path'
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
  let rootPath=path.resolve('./')
  // 得到md文档
  console.log('\x1B[36m%s\x1B[0m', '*** location: ', `${path.resolve('./')}\\readme-md.md`)
  wirteMd(md, `${rootPath}\\readme-md.md`)
  // 得到md对象
  wirteJs(JSON.stringify(nodes), rootPath + '\\readme-file.js')
 witeNodeFile(nodes,rootPath)
}
agmd()
