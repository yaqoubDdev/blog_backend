
const url = "http://localhost:8080/home/blogs"

async function getData(){
  try{
    const res = await fetch(url)
    if(!res.ok) throw new Error("network res was not ok")
    const data = await res.json()
    console.log(data)
  }
  catch(error){
    console.log('error:', error)
  }
}

async function postData(){
  try{
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        author: "JdDev",
        likes: 61
      })
    })

    if(!res.ok) throw new Error("failed to post data")
    const result = await res.json()
    console.log(result)
  }
  catch(error){}
}

getData()
//postData()
