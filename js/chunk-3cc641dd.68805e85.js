(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3cc641dd"],{"8a65":function(t,n,e){"use strict";e("a703")},a703:function(t,n,e){},ef84:function(t,n,e){"use strict";e.r(n);var i=function(){var t=this,n=t._self._c;return n("div",{staticClass:"box_card"},[n("div",{staticClass:"box_card_border"},[n("span",{staticClass:"box_card_title"},[t._v("折线图")]),n("el-row",{attrs:{gutter:20}},[n("div",{staticClass:"right"},[n("el-button-group",{staticStyle:{height:"20px"}},[n("el-button",{attrs:{type:0==t.index?"primary":"",size:"mini"},on:{click:function(n){return t.showData(0)}}},[t._v("近七天")]),n("el-button",{attrs:{type:1==t.index?"primary":"",size:"mini"},on:{click:function(n){return t.showData(1)}}},[t._v("本月")]),n("el-button",{attrs:{type:2==t.index?"primary":"",size:"mini"},on:{click:function(n){return t.showData(2)}}},[t._v("本年")])],1)],1),n("div",{staticClass:"mg-top"},[0==t.index||1==t.index?n("ve-line",{attrs:{height:"350px",data:t.chartData[t.index],extend:t.chartExtend[t.index]}}):n("ve-line",{attrs:{height:"350px",data:t.chartData[t.index]}})],1)])],1)])},a=[],s={components:{},data:function(){return{index:0,chartExtend:[{series:{smooth:!1},color:["#E4004F","#64C9FA"]},{series:{smooth:!1,step:"middle"}}],chartData:[{columns:["日期","销售额-1季度","销售额-2季度"],rows:[{"日期":"1月1日","销售额-1季度":1523,"销售额-2季度":3523},{"日期":"1月2日","销售额-1季度":3533,"销售额-2季度":1232},{"日期":"1月3日","销售额-1季度":2523,"销售额-2季度":9768},{"日期":"1月4日","销售额-1季度":4588,"销售额-2季度":5252},{"日期":"1月5日","销售额-1季度":5632,"销售额-2季度":2536},{"日期":"1月6日","销售额-1季度":6773,"销售额-2季度":4454}]},{columns:["日期","销售额-1季度","销售额-2季度"],rows:[{"日期":"1月1日","销售额-1季度":2523,"销售额-2季度":1523},{"日期":"1月2日","销售额-1季度":4933,"销售额-2季度":1232},{"日期":"1月3日","销售额-1季度":9523,"销售额-2季度":3768},{"日期":"1月4日","销售额-1季度":7588,"销售额-2季度":3252},{"日期":"1月5日","销售额-1季度":5632,"销售额-2季度":2536},{"日期":"1月6日","销售额-1季度":6773,"销售额-2季度":4454}]},{columns:["支付方式","占比"],rows:[{"支付方式":"小程序","占比":25},{"支付方式":"IOS客户端","占比":39},{"支付方式":"安卓客户端","占比":50},{"支付方式":"H5移动端","占比":10},{"支付方式":"PC端","占比":5}]}]}},methods:{showData:function(t){this.index=t}}},r=s,o=(e("8a65"),e("0460")),c=Object(o["a"])(r,i,a,!1,null,"4f2bef6e",null);n["default"]=c.exports}}]);