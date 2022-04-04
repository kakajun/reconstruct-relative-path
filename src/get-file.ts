import fs from 'fs'
import path from 'path'

/**
 * @description:Gets the header comment of the file  获取文件的头部注释
 * @param {*} file
 * @return {*}
 */
function getFile(file: fs.PathOrFileDescriptor) {
  const str = fs.readFileSync(file, 'utf-8')
  const size = str.length
  const sarr = str.split(/[\n]/g)
  const imports: string[] = []
  const rowSize = sarr.length
  // 这里获取每个文件的import路径
  sarr.forEach((ele) => {
    const str = ele.match(/import.*from [\"|\'](.*)[\'|\"]/)
    if (str && str[1]) {
      imports.push(str[1])
    }
  })
  const f =
    sarr[0].indexOf('eslint') === -1 &&
    (sarr[0].indexOf('-->') > -1 || sarr[0].indexOf('*/') > -1 || sarr[0].indexOf('//') > -1)
      ? sarr[0]
      : ''
  return { note: f, size, rowSize, imports }
}

export type ItemType = {
  name: string
  isDir: boolean
  level: number
  note: string
  size: number
  suffix: string
  rowSize: number
  fullPath: string
  import?: Array<string>
  children?: ItemType[]
}

/**
 * @description:Generate node information for all files 生成所有文件的node信息
 * @param {Array} nodes
 * @param {*} dir
 * @param {Number} level
 * @return {*}
 */
export function getFileNodes(
  option: { ignore: string[] | undefined; include: string[] | undefined } | undefined,
  dir = path.resolve('./'),
  nodes: Array<ItemType> = [],
  level = 0
): Array<ItemType> {
  //File filtering -- full name with suffix required  文件过滤--需要全称带后缀
  let ignore = [
    'img',
    'styles',
    'node_modules',
    'LICENSE',
    '.git',
    '.github',
    'dist',
    '.husky',
    '.vscode',
    'readme-file.js',
    'readme-md.js'
  ]
  //File suffix contains only  文件后缀只包含
  let include = ['.js', '.vue', '.ts']

  if (option) {
    ignore = option.ignore || ignore
    include = option.include || include
  }
  const files = fs
    .readdirSync(dir)
    .map((item) => {
      const fullPath = path.join(dir, item)
      const isDir = fs.lstatSync(fullPath).isDirectory()
      return {
        name: item,
        isDir,
        level,
        note: ''
      } as ItemType
    })
    //Sort folders and files, otherwise the generated will not correspond to the opening order of the editor 对文件夹和文件进行排序,要不然生成的和编辑器打开的顺序不对应
    .sort((a, b) => {
      if (!a.isDir && b.isDir) return 1
      if (a.isDir && !b.isDir) return -1
      if ((a.isDir && b.isDir) || (!a.isDir && !b.isDir)) return 0
      return 0
    })
  for (let index = 0; index < files.length; index += 1) {
    const item = files[index]
    //Folder filtering is handled here  这里处理文件夹过滤
    const foldFlag = ignore.findIndex((obj: string) => obj === item.name)
    if (foldFlag === -1) {
      const fullPath = path.join(dir, item.name)
      const isDir = fs.lstatSync(fullPath).isDirectory()
      if (isDir) {
        //recursion 递归
        getFileNodes(option, fullPath, (item.children = []), level + 1)
        nodes.push(item)
      } else {
        const i = fullPath.lastIndexOf('.')
        const lastName = fullPath.substring(i)
        //File filtering is handled here 这里处理文件过滤
        if (include.includes(lastName)) {
          const obj = getFile(fullPath)
          Object.assign(item, obj)
          item.suffix = lastName
          item.fullPath = fullPath
          nodes.push(item)
        }
      }
    }
  }
  return nodes
}

/**
 * @description:Recursive file name + note  递归得到文件名+note
 * @param {Array} datas
 * @param {string} keys
 * @return {*}
 */
export  function getNote(datas: Array<ItemType>, keys?: string[]) {
  const nodes = keys || []
  datas.forEach((obj: ItemType, index: Number) => {
    const last = index === datas.length - 1
    if (obj.children) {
      //fold
      getNote(obj.children, nodes)
    }
     const md = setMd(obj, last)
     nodes.push(md)
  })
  return nodes
}

/**
 * @description:One obj generates one line of text  一个obj生成一个一行文字
 * @param {ItemType} obj
 * @param {Boolean} last  Is it the last one  是不是最后一个
 * @return {*}
 */
function setMd(obj: ItemType, last: Boolean): string {
  let filesString = ''
  const blank = '│ '.repeat(obj.level) // 重复空白
  const pre = `${blank}${last ? '└──' : '├──'} ${obj.name}`
  if (obj.isDir) {
    filesString += `${pre}\n`
  } else {
    filesString += `${pre}            ${obj.note}\n`
  }
  return filesString
}
