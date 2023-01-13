// データ処理
function prepareData(data){
    let maxY = 0
    let minY = 100000

    let year = data[0].date.slice(0,4)
    let month = data[0].date.slice(5,7)
    let d = new Date(year, month, 0)
    let lastDateOfMonth = d.getDate()

    data.forEach(d=>{
        let weight = d.weight
        if(weight>maxY){
            maxY = weight
        }
        if(weight<minY){
            minY = weight
        }
    })

    maxY = Math.ceil(maxY)+1
    minY = Math.floor(minY)-1

    if(data.length < lastDateOfMonth){
        for(let i=data.length+1; i<=lastDateOfMonth; i++){
            data.push({date: `${year}-${month}-${i}`, weight: null})
        }
    }

    return {data, year, month, maxY, minY}
}

function prepareDataForLinear(data, fromDate, toDate){
    let dataForLinnear = []

    let X = []
    let y = []

    data.forEach(d=>{
        let currentDate = Number(d.date.slice(8,10))
        if(fromDate<=currentDate && currentDate<=toDate && d.weight!=null){
            y.push([Number(d.weight)])
            X.push([1, Number(currentDate)])
        }
    })

    if (X.length != 0){
        let firstDate = X[0][1]
        let lastDate = X[X.length-1][1]

        X = math.matrix(X)
        y = math.matrix(y)
        let A = math.multiply(math.transpose(X),X)
        let b = math.multiply(math.transpose(X),y)
        let w = math.multiply(math.pinv(A),b)

        data.forEach(d=>{
            let currentDate = Number(d.date.slice(8,10))
            if(firstDate<=currentDate && currentDate<=lastDate && d.weight!=null){
                let num = Number(w._data[0][0]+w._data[1][0]*(currentDate)).toFixed(3)
                dataForLinnear.push(num)
            }else{
                dataForLinnear.push(null)
            }
        })

        return dataForLinnear
    }else{
        return dataForLinnear
    }
}

function drawFirstData(doc, data, linearData, year, month, maxY, minY){
    let chart = new Chart(
        doc,
        {
            data:{
                labels: data.map(row => row.date.slice(8,10)),
                datasets:[
                    {
                        type: "line",
                        label: `${year}年${month}月`,
                        data: data.map(row => row.weight),
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                        borderWidth:3
                    },
                    {
                        type: "line",
                        label : "",
                        tension: 0,
                        borderColor: 'rgb(75, 92, 92)',
                        borderWidth:3,
                        data: linearData,
                        pointBorderWidth: 0,
                        pointHitRadius: 0
                      }
                ]
            },
            options:{
              scales:{
                y:{
                  min: minY,
                  max: maxY
                }
              }
            }
        }
    )
    return chart
}

function drawPredictData(chart, data){
    console.log("dark magician")
    chart.data.datasets.push(
      {
        type: "line",
        label : "トレンド",
        tension: 0,
        borderColor: 'rgb(75, 92, 92)',
        borderWidth:3,
        data: data,
        pointBorderWidth: 0,
        pointHitRadius: 0
      }
    )
}

function utilDraw(chart, rawData){
    let {data, year, month, maxY, minY} = prepareData(rawData)

    let toDate = rawData
    let fromDate = rawData - 5
    if(fromDate<1){
        fromDate = 1
    }

    let dataForLinnear = prepareDataForLinear(data, fromDate, toDate)

    let graph = drawFirstData(chart, data, dataForLinnear, year, month, maxY, minY)
}