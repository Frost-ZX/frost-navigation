"use strict";(self["webpackChunkfrost_navigation"]=self["webpackChunkfrost_navigation"]||[]).push([[62],{2253:function(e,t,i){i.r(t),i.d(t,{default:function(){return f}});var s=function(){var e=this,t=e._self._c;return t("el-container",{staticClass:"settings"},[t("div",{staticClass:"wrapper shadow-2"},[t("el-form",{attrs:{"label-position":"left","label-width":"12rem"}},[t("el-form-item",{staticClass:"set-font",attrs:{label:"字体大小"}},[t("el-input-number",{attrs:{min:12,max:32,"controls-position":"right",label:"字体大小",size:"small"},model:{value:e.configFontSize,callback:function(t){e.configFontSize=t},expression:"configFontSize"}})],1),t("el-form-item",{attrs:{label:"显示网站标题"}},[t("el-switch",{model:{value:e.configShowSiteTitle,callback:function(t){e.configShowSiteTitle=t},expression:"configShowSiteTitle"}})],1),t("el-form-item",{attrs:{label:"折叠主页侧边菜单"}},[t("el-switch",{model:{value:e.configSideMenuCollapse,callback:function(t){e.configSideMenuCollapse=t},expression:"configSideMenuCollapse"}})],1),t("el-form-item",{attrs:{label:"获取搜索引擎关键词建议"}},[t("el-switch",{model:{value:e.configSearchSuggestion,callback:function(t){e.configSearchSuggestion=t},expression:"configSearchSuggestion"}})],1),t("el-form-item",{attrs:{label:"清除数据"}},[t("el-button",{attrs:{type:"danger",size:"medium"},on:{click:function(t){return e.resetDatas()}}},[e._v("清除设置")])],1)],1)],1)])},o=[],n=i(651),a={name:"SettingsView",data(){return{}},computed:{...(0,n.aH)({appConfig:"config"}),configFontSize:{get(){return this.appConfig.fontSize},set(e){this.$store.commit("setConfig",{key:"fontSize",value:e})}},configShowSiteTitle:{get(){return this.appConfig.showSiteTitle},set(e){this.$store.commit("setConfig",{key:"showSiteTitle",value:e})}},configSideMenuCollapse:{get(){return this.appConfig.sideMenuCollapse},set(e){this.$store.commit("setConfig",{key:"sideMenuCollapse",value:e})}},configSearchSuggestion:{get(){return this.appConfig.searchSuggestion},set(e){this.$store.commit("setConfig",{key:"searchSuggestion",value:e})}}},methods:{resetDatas(){this.$confirm("确定要清除吗？","",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{this.$store.commit("resetConfig"),this.$message({message:"已清除，2s 后自动刷新",type:"success"}),setTimeout((()=>{location.reload()}),2e3)})).catch((()=>{this.$message({message:"取消清除",type:"info"})}))}}},l=a,c=i(4698),r=(0,c.A)(l,s,o,!1,null,"afb2b0a4",null),f=r.exports}}]);