(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-348a926d"],{"26d3":function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-container",{staticClass:"settings"},[i("div",{staticClass:"wrapper shadow-2"},[i("el-form",{attrs:{"label-position":"left","label-width":"7rem"}},[i("el-form-item",{attrs:{label:"字体大小"}},[i("el-input-number",{attrs:{min:12,max:32,label:"字体大小",size:"small"},model:{value:e.config.fontSize,callback:function(t){e.$set(e.config,"fontSize",t)},expression:"config.fontSize"}})],1),i("el-form-item",{attrs:{label:"显示网站标题"}},[i("el-switch",{model:{value:e.config.showSiteTitle,callback:function(t){e.$set(e.config,"showSiteTitle",t)},expression:"config.showSiteTitle"}})],1),i("el-form-item",{attrs:{label:"折叠侧边菜单"}},[i("el-switch",{model:{value:e.config.sideMenuCollapse,callback:function(t){e.$set(e.config,"sideMenuCollapse",t)},expression:"config.sideMenuCollapse"}})],1)],1)],1)])},l=[],o={name:"Settings",data:function(){return{config:this.$root.config.storage,utils:this.$root.utils}},beforeRouteEnter:function(e,t,i){i((function(e){e.utils.changeTitle("设置")}))}},s=o,a=(i("540b"),i("2877")),c=Object(a["a"])(s,n,l,!1,null,"2a0b5a8a",null);t["default"]=c.exports},"540b":function(e,t,i){"use strict";i("bddd")},bddd:function(e,t,i){}}]);