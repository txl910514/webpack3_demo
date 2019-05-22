import echarts from 'echarts'
import 'echarts-gl'
import Axios from 'axios';
const path = 'tuopuManage1';
const menu = {"menus":[
    {
      "id": "6a6e3e10633f11e99ad857ca6a2188a9",
      "menuName": "首页",
      "menuUrl": "workbench",
      "icon": "el-icon-s-platform",
      "subMenu": null
    },
    {
      "id": "6a6e3e10633f11e99ad857ca6a2188a8",
      "menuName": "设备管理",
      "menuUrl": "",
      "icon": "el-icon-tickets",
      "subMenu": [
        {
          "id": "6a6e3e10633f11e99ad857ca6a2178a9",
          "menuName": "产品管理",
          "menuUrl": "productManage",
          "subMenu": null,
          "icon": null
        },
        {
          "id": "6a6e3e10633f11e99ad857ca6a2188a7",
          "menuName": "设备管理",
          "menuUrl": "equipList",
          "subMenu": null,
          "icon": null
        },
        {
          "id": "6a6e3e10633f11e99ad857ca6a2188a6",
          "menuName": "固件管理",
          "menuUrl": "firmware",
          "subMenu": [
            {
              "id": "6a6e3e10633f11e99ad857ca6a2188a7",
              "menuName": "运行监控",
              "menuUrl": "operationMonitoring",
              "subMenu": null,
              "icon": null
            },
            {
              "id": "6a6e3e10633f11e99ad857ca6a2188a1",
              "menuName": "拓扑管理",
              "menuUrl": "tuopuManage1",
              "subMenu": null,
              "icon": null
            }
          ],
          "icon": null
        }
      ]
    },
    {
      "id": "6a6e3e10633f11e99ad857ca6a2188a9",
      "menuName": "监控运维",
      "menuUrl": "",
      "icon": "el-icon-stopwatch",
      "subMenu": [
        {
          "id": "6a6e3e10633f11e99ad857ca6a2188a7",
          "menuName": "运行监控",
          "menuUrl": "operationMonitoring",
          "subMenu": null,
          "icon": null
        },
        {
          "id": "6a6e3e10633f11e99ad857ca6a2188a1",
          "menuName": "拓扑管理",
          "menuUrl": "tuopuManage",
          "subMenu": null,
          "icon": null
        }
      ]
    },
    {
      "id": "6a6e3e10633f11e99ad857ca6a2188a8",
      "menuName": "应用管理",
      "menuUrl": "",
      "icon": "el-icon-menu",
      "subMenu": [
        {
          "id": "6a6e3e10633f11e99ad857ca6a2188a6",
          "menuName": "创建应用",
          "menuUrl": "createrApplay",
          "subMenu": null,
          "icon": null
        },
        {
          "id": "6a6e3e10633f11e99ad857ca6a2188a7",
          "menuName": "应用商店",
          "menuUrl": "appshop",
          "subMenu": null,
          "icon": null
        },
        {
          "id": "6a6e3e10633f11e99ad857ca6a2188a6",
          "menuName": "应用升级",
          "menuUrl": "appupdate",
          "subMenu": null,
          "icon": null
        }
      ]
    },
    {
      "id": "6a6e3e10633f11e99ad857ca6a2188a8",
      "menuName": "边缘计算",
      "menuUrl": "",
      "icon": "el-icon-s-help",
      "subMenu": [
        {
          "id": "rule_chain",
          "menuName": "边缘计算",
          "menuUrl": "computing",
          "icon": "el-icon-s-operation",
          "subMenu": null
  
        }
      ]
    },
    {
      "id": "6a6e3e10633f11e99ad857ca6a2188a8",
      "menuName": "规则引擎",
      "menuUrl": "",
      "icon": "el-icon-link",
      "subMenu": [
        {
          "id": "rule_chain",
          "menuName": "规则链库",
          "menuUrl": "ruleList",
          "icon": "el-icon-s-operation",
          "subMenu": null
        }
      ]
    },
    {
      "id": "6a6e3e10633f11e99ad857ca6a2188a8",
      "menuName": "平台管理",
      "menuUrl": "",
      "icon": "el-icon-data-line",
      "subMenu": [
        {
          "id": "6a6e3e10633f11e99ad857ca6a2188a7",
          "menuName": "用户管理",
          "menuUrl": "accountManagement",
          "subMenu": null,
          "icon": null
        },
        {
          "id": "6a6e3e10633f11e99ad857ca6a2188a7",
          "menuName": "角色管理",
          "menuUrl": "",
          "subMenu": null,
          "icon": null
        },
        {
          "id": "6a6e3e10633f11e99ad857ca6a2188a7",
          "menuName": "菜单管理",
          "menuUrl": "",
          "subMenu": null,
          "icon": null
        }
      ]
    }
  ],
  "computing":"http://26.47.73.115:4000/"
  };

  function Breadcrumb (menu, path) {
    var nodes = []; 
    menu = menu || []; 
    for (var i =0; i < menu.length; i++) {
        if (path === menu[i].menuUrl && menu[i].menuUrl) {
            nodes.unshift(menu[i]);
        }
        if (menu[i].subMenu) {
            nodes = nodes.concat(Breadcrumb(menu[i].subMenu, path));
            if (menu[i].subMenu.some(v => v === nodes[0])) {
                nodes.unshift(menu[i]);
            }
        }
    }
    return nodes;
  }
$(function () {
    console.log(menu.menus);
    var Breadcrumb_arr = Breadcrumb(menu.menus, path);
    console.log(Breadcrumb_arr);
    var mapDom = document.querySelector('#Map');
    document.q
    var  echartOption =  {
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(47,170,255, 0.8)'
        },
        geo3D: {
            map: 'mianyang',
            roam: true,
            zoom: 0.5,
            itemStyle: {
                color: 'rgb(10,40,110)',
                opacity: 1,
                borderWidth: 0.8,
                borderColor: 'rgb(62,215,213)'
            },
            label: {
                show: true,
                textStyle: {
                    color: '#000', //地图初始化区域字体颜色
                    fontSize: 16,
                    opacity: 1,
                    // backgroundColor: 'rgba(0,0,0,0)'
                    backgroundColor: 'rgba(53,171,199,1)'
                },
            },
            emphasis: { //当鼠标放上去  地区区域是否显示名称
                label: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: 16,
                        backgroundColor: 'rgba(0,23,11,1)'
                    }
                }
            },
            //shading: 'lambert',
            light: { //光照阴影
                main: {
                    color: '#fff', //光照颜色
                    intensity: 1.2, //光照强度
                    //shadowQuality: 'high', //阴影亮度
                    shadow: false, //是否显示阴影
                    alpha: 55,
                    beta: 10
    
                },
                ambient: {
                    intensity: 0.3
                }
            }
        }
      }
    var echartsMapObj = echarts.init(mapDom);
    Axios.get('/static/json/510700.json').then(function (data) {
        console.log(data.data);
        echarts.registerMap('mianyang', data.data);
        echartsMapObj.setOption(echartOption)
    })
    var barDom = document.querySelector('#bar');
    var barEcharts = echarts.init(barDom);
    var barOption = {
        backgroundColor: '#0e202d',
        tooltip: {},
        xAxis: {
            data: ["企业", "农专", "个体"],
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                show: false,
                textStyle: {
                    color: '#e54035'
                }
            }
        },
        yAxis: {
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                show: false
            }
        },
        series: [{
            name: '年报上报率3',
            type: 'pictorialBar',
            symbolSize: [100, 45],
            symbolOffset: [0, -20],
            z: 12,
            itemStyle: {
                normal: {
                    color: '#14b1eb'
                }
            },
            data: [{
                value: 100,
                symbolPosition: 'end'
            }, {
                value: 50,
                symbolPosition: 'end'
            }, {
                value: 20,
                symbolPosition: 'end'
            }]
        }, {
            name: '年报上报率2',
            type: 'pictorialBar',
            symbolSize: [100, 45],
            symbolOffset: [0, 20],
            z: 12,
            itemStyle: {
                normal: {
                    color: '#14b1eb'
                }
            },
            data: [100, 50, 20]
        }, {
            name: '年报上报率1',
            type: 'pictorialBar',
            symbolSize: [150, 75],
            symbolOffset: [0, 37],
            z: 11,
            itemStyle: {
                normal: {
                    color: 'transparent',
                    borderColor: '#14b1eb',
                    borderWidth: 5
                }
            },
            data: [100, 50, 20]
        }, {
            name: '年报上报率',
            type: 'pictorialBar',
            symbolSize: [200,100],
            symbolOffset: [0, 50],
            z: 10,
            itemStyle: {
                normal: {
                    color: 'transparent',
                    borderColor: '#14b1eb',
                    borderType: 'dashed',
                    borderWidth: 5
                }
            },
            data: [100, 50, 20]
        }, {
            type: 'bar',
            itemStyle: {
                normal: {
                    color: '#14b1eb',
                    opacity: .7
                }
            },
            silent: true,
            barWidth: 100,
            barGap: '-100%', // Make series be overlap
            data: [100, 50, 20]
        }]
    };
    barEcharts.setOption(barOption)
})
