
export const parseText = (text, fileType) => {
  const reText = /\s+/
  const reCSV = /,\s*/
  const lines = text.split(/\r\n|\n|\r/)
  
  const sections = []
  let secNum = -1
  let flag = true 
  
  
  for(let line of lines){
    const trimLine = line.trim() 
    if(trimLine.startsWith("#")){
      continue
    }
    if(trimLine.length<1){
      flag = true
      continue    
    }
    if(flag){
      flag=false
      sections.push([])
      secNum++
    }
    const [x,y,z] = fileType =="csv" ? trimLine.split(reCSV).map(v=>parseFloat(v)):
                                       trimLine.split(reText).map(v=>parseFloat(v))
    sections[secNum].push([x,y,z])
  }

  return sections
}
  
