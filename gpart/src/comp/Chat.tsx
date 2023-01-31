import React from 'react'

export const Chat = () => {
  let myId = "a"
  let myImg = "https://source.unsplash.com/L2cxSuKWbpo/600x600"

  let t = [
    {userId: "a", text: "初めまして。山本を申します。今日からよろしくお願いいたします。"},
    {userId: "Yoshiki", text: "初めまして。こちらこそよろしくお願いします。"},
  ]

  // データを取得
  const [data, setData] = useState(
    [
      {name : "Yoshiki", userId: "user1", img: "https://source.unsplash.com/_7LbC5J-jw4/600x600", isActive: false, firstText : t[t.length-1].text, currentText: t, newText : []},
      {name : "Fujishima", userId: "user2", img : "https://source.unsplash.com/otT2199XwI8/600x600", isActive: false, firstText : "", currentText : [], newText : []}
    ]
  )

  const [isActiveData, setIsActiveData] = useState({})

  const handleClick = (d) =>{
    const newD = data
    for(let i in newD){
      const a = newD[i]
      a.isActive = false
      if(a.userId == d.userId){
        a.isActive = true
        setIsActiveData(a)
      }
    }
    setData((prev)=>{
      return [
        ...newD
      ]
    })
  }
  const handleSendClick =(newText)=>{
    const newData = data
    for(let i in newData){
      const a = newData[i]
      if(a.isActive){
        a.newText.push({userId:myId , text : newText})
        a.firstText = newText
        break
      }
    }
    setData((prev)=>{
      return [
        ...newData
      ]
    })
  }
  return (
  <div class="shadow-lg rounded-lg">
    
      <div class="flex flex-row h-1000 justify-between bg-white">

        <div class="flex flex-col w-2/5 h-1000 border-r-2 overflow-y-auto">
          {/* search chatting */}
          <div class="border-b-2 py-4 px-2">
            <input
              id = "inputSe"
              type="text"
              placeholder="search chatting"
              class="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
            />
          </div>
          {/* friend list */}
          {
            data.map(d=>{
              return(
                <div key={d.userId} id={d.userId} className={"flex flex-row py-4 px-2 items-center border-b-2" + (d.isActive ? " border-l-4 border-blue-400":"")}
                  onClick={()=>{handleClick(d)}}
                >
                  <div class="w-1/4">
                    <img
                      src={d.img}
                      class="object-cover h-12 w-12 rounded-full"
                      alt=""
                    />
                  </div>
                  <div class="w-full">
                    <div class="text-lg font-semibold">{d.name}</div>
                    <span class="text-gray-500">{d.firstText}</span>
                  </div>
                </div>
              )
            })
          }
        </div>

        <div class="w-full px-5 h-1000 flex flex-col justify-between">
          {/* Conversation */}
          <div class="flex flex-col mt-5">
            {
              data.map(d=>{
                if(d.isActive && d.currentText.length != 0){
                  return(
                    d.currentText.map(t=>{
                      if(t.userId==myId){
                        return(
                          <div className={"flex justify-end mb-4"}>
                            <div className={"ml-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"}>{t.text}</div>
                            <img
                              src={myImg}
                              class="object-cover h-8 w-8 rounded-full"
                              alt=""
                            />
                          </div>
                        )
                      }else{
                        return(
                          <div className={"flex justify-start mb-4"}>
                            <img
                              src={d.img}
                              class="object-cover h-8 w-8 rounded-full"
                              alt=""
                            />
                            <div className={"ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"}>{t.text}</div>
                          </div>
                        )
                      }
                    })
                  )
                }
              })
            }
            {
              data.map(d=>{
                if(d.isActive && d.newText.length != 0){
                  return(
                    d.newText.map(t=>{
                        return(
                          <div className={"flex justify-end mb-4"}>
                            <div className={"ml-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"}>{t.text}</div>
                            <img
                              src={myImg}
                              class="object-cover h-8 w-8 rounded-full"
                              alt=""
                            />
                          </div>
                        )
                    })
                  )
                }
              })
            }
          </div>

          {/* input Conversation */}
          {
            data.map(d=>{
              if(d.isActive){
                return (
                  <div class="flex py-5">
                    <input
                      id = "inputCon"
                      class="w-full bg-gray-300 py-5 px-3 rounded-xl"
                      type="text"
                      placeholder="type your message here..."
                    />
                    <button class="w-full bg-gray-300 py-5 px-3 rounded-xl" type='button'
                      onClick={()=>{
                        let inputCon = document.getElementById("inputCon")
                        let text = inputCon.value
                        handleSendClick(text)
                        inputCon.value = ""
                      }}
                    >
                      send
                    </button>
                  </div>
                )
              }
            })
          }
        </div>
      </div>
  </div>
  )
}