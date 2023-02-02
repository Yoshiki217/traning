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

    let iterator = 0
    let last_weight = null
    const r_data = []
    for(let i=1; i<=lastDateOfMonth; i++){
        let dform = `${i<10? `0${i}`: i}`
        let date = `${year}-${month}-${dform}`
        if(iterator<data.length && date == data[iterator].date){
            r_data.push(data[iterator])
            last_weight = data[iterator].weight
            iterator++;
        } else {
            let weight = null
            if(last_weight!=null && iterator<data.length){
                const f_weight = data[iterator].weight
                const f_date = data[iterator].date.slice(8, 10)
                weight = last_weight+(f_weight-last_weight)/(f_date-i+1)
                last_weight = weight
            }
            r_data.push({date: date, weight: weight})
        }
    }

    return {r_data, year, month, maxY, minY}
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

function drawFirstData(canvas, data, linearData, year, month, maxY, minY){
    let chart = new Chart(
        canvas,
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

function utilDraw(canvas, rawData){
    const cloneData = []

    for(let d of rawData){
        cloneData.push({
            date: d.date,
            weight: d.weight
        })
    }

    let {r_data, year, month, maxY, minY} = prepareData(cloneData)

    let canvav = document.createElement("canvas")

    let toDate = cloneData
    let fromDate = cloneData - 5
    if(fromDate<1){
        fromDate = 1
    }

    let dataForLinnear = prepareDataForLinear(r_data, fromDate, toDate)

    drawFirstData(canvav, r_data, dataForLinnear, year, month, maxY, minY)

    canvas.innerHTML = ''

    canvas.appendChild(canvav)
}