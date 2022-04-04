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
// import fs from 'fs'
// import path from 'path'
const classifiedRouting = [
  {
    name: '1工程',
    router: [
      {
        path: '/about',
        name: 'about',
        component:'./App.vue'
      }
    ]
  }
]
export default function markFile(){
  //1. 整理要分类的路由,搞个数组对象分类
  console.log(classifiedRouting)
  //2. 循环解析import 找文件(如果子文件有依赖,继续找)
parseImport(classifiedRouting)
  //3. 给尾部打标记
}

function parseImport(arrs: Array<any>) {
  arrs.forEach((ele) => {
    ele.router.forEach((obj: { component: any; }) => {
      const path = obj.component
      console.log(path, '777')
      // var a = '../c/d/main.js'
      // var b = '/a/b/zhangjing/index.js'
      // let c = relativeToabsolute(a, b)
      // console.log(c, '00')
      // 加载文件
      // readFile(path)
    })
  })
}


//  function readFile(file:string) {
//    let fileStr = fs.readFileSync(file, 'utf-8')
//    let writeFlag = false // 如果啥都没改, 不更新文件
//    // fileStr = '// 我加注释 \n' + fileStr
//    const sarr = fileStr.split(/[\n]/g)
//    sarr.forEach((ele, index) => {
//      // 注释的不转,其他公共也不转
//      const ignore = ['//', '@xiwicloud/components', '@xiwicloud/lims']
//      const flag = ignore.some((item) => ele.indexOf(item) < 0)
//      if (flag) {
//        const impStr = ele.match(/import.*from [\"|\'](.*)[\'|\"]/)
//        // 没有import的不转
//        if (impStr && impStr[1]) {
//          let filePath = impStr[1]
//          // 如果有@符号的, 并且忽略文件的
//          if (filePath.indexOf('@') > -1) {

//            writeFlag = true
//          }
//        }
//      }
//    })
//    if (writeFlag) {

//    }
//  }
