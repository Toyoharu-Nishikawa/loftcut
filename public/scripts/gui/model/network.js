export const makeCADFile = async (sections2) => {
  try{
    const url = "./node/make"
    const data = {
      sections2: sections2,
    }
    const obj = {
      method:'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // 本文のデータ型は "Content-Type" ヘッダーと一致する必要があります
    } 

    const res = await fetch(url, obj)
    if(res.status !==200){
      throw new Error(`status is not 200 but ${res.status}`)
    }

     const blob = await res.blob()
     return blob
  }
  catch(e){
    console.log(e.message)
    throw new Error("makeCADFile failed")
  }

}
