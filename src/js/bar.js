import echarts from 'echarts'

const echartObject = {
    legend: {
        data:[],
        x: 'right',
        textStyle: {
        }
    },
    grid: {
        left: '0%',
        right: '4%',
        bottom: '3%',
        top: '4%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: [],
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#96b5ff'
            }
        },
        splitLine: {
            show: false
        },
        axisLabel: {
            interval: 0,
            fontSize: 10
        }
    },
    yAxis: {
        type: 'value',
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#96b5ff'
            }
        },
        splitLine: {
            show: false
        }
    },
    series: []
}

const echartsObj = echarts.init(document.querySelector('.item-chart'));
const barOption = {
    type:'bar',
    data:[],
    barWidth: '19px',
    itemStyle: {
        color:'red'
    }
}
const data = [
    {
        name: '201601',
        value: 500
    },
    {
        name: '201602',
        value: 500
    },
    {
        name: '201603',
        value: 500
    },
    {
        name: '201604',
        value: 500
    },
    {
        name: '201605',
        value: 500
    },
    {
        name: '201606',
        value: 500
    }
]

echartObject.xAxis.data = data.map( v => v.name)
barOption.data =  data.map( v => v.value)
echartObject.series.push(barOption)
echartsObj.setOption(echartObject)
console.log(echartObject)