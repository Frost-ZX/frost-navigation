"use strict";(self["webpackChunkfrost_navigation"]=self["webpackChunkfrost_navigation"]||[]).push([[974],{4107:function(t,e,o){o.r(e),o.d(e,{default:function(){return c}});var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"tools-detail"},[e("div",{staticClass:"tools-header"},[e("div",{staticClass:"title"},[e("span",[t._v(t._s(t.routeMeta.title))]),e("span",{directives:[{name:"show",rawName:"v-show",value:Boolean(t.routeMeta.version),expression:"Boolean(routeMeta.version)"}]},[t._v("["+t._s(t.routeMeta.version)+"]")]),e("span",{directives:[{name:"show",rawName:"v-show",value:Boolean(t.routeMeta.update),expression:"Boolean(routeMeta.update)"}]},[t._v("["+t._s(t.routeMeta.update)+"]")])]),e("el-tooltip",{attrs:{content:"在新标签页中打开",placement:"left"}},[e("div",{staticClass:"btn el-icon-copy-document",on:{click:function(e){return t.openNewTab()}}})]),e("el-tooltip",{attrs:{content:"关闭工具",placement:"left"}},[e("div",{staticClass:"btn el-icon-close",on:{click:function(e){return t.close()}}})])],1),e("div",{staticClass:"tools-content"},[e("router-view")],1)])},a=[],s=(o(9138),{name:"ToolsDetail",data(){return{}},computed:{routeMeta(){return this.$route.meta||{}}},methods:{close(){this.$confirm("是否关闭？").then((()=>{this.$router.push({name:"Tools"})})).catch((()=>{}))},openNewTab(){const t=window.location.href;window.open(t,"_blank")}}}),i=s,l=o(4698),r=(0,l.A)(i,n,a,!1,null,"3d3d7c44",null),c=r.exports}}]);