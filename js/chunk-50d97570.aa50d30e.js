(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-50d97570"],{"2e20":function(t,e,a){},"46a0":function(t,e,a){"use strict";a("2e20")},8988:function(t,e,a){"use strict";a.r(e);a("3324");var o=function(){var t=this,e=t._self._c;return e("el-card",{staticClass:"box-card"},[t.userData.id?e("el-row",[e("el-col",{attrs:{sm:24,md:10}},[e("el-image",{staticClass:"image",attrs:{src:t.$host+t.userData.avatar}}),e("p",{staticClass:"uname"},[e("b",[t._v(t._s(t.userData.nickName||t.userData.userAccount))])]),e("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"upload",expression:"'upload'"}],attrs:{type:"",size:"mini"},on:{click:function(e){t.avatarShow=!0}}},[t._v("修改头像")]),e("ImageCropper",{attrs:{title:"裁剪头像",dialogVisible:t.avatarShow},on:{"update:dialogVisible":function(e){t.avatarShow=e},"update:dialog-visible":function(e){t.avatarShow=e},close:t.closeAvatarShow}}),e("el-divider",[t._v(" 信息绑定 ")]),e("div",{staticClass:"user_info"},[e("div",[e("span",[t._v("手机：")]),e("span",[t._v(t._s(t.userData.phone))]),e("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"phone",expression:"'phone'"}],attrs:{type:"success",icon:"el-icon-mobile-phone",size:"mini"},on:{click:function(e){return t.checkCode(!t.userData.phone,!0)}}},[t._v(t._s(t.userData.phone?"修改":"绑定")+"手机")])],1),e("div",[e("span",[t._v("邮箱：")]),e("span",[t._v(t._s(t.userData.email))]),e("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"email",expression:"'email'"}],attrs:{type:"warning",icon:"el-icon-message",size:"mini"},on:{click:function(e){return t.checkCode(!t.userData.email,!1)}}},[t._v(t._s(t.userData.email?"修改":"绑定")+"邮箱")])],1)]),e("el-button",{staticStyle:{width:"80%"},attrs:{type:"danger",icon:"el-icon-lock"},on:{click:t.dialogFormVisibleClose}},[t._v("修改密码")])],1),e("el-col",{attrs:{sm:24,md:14}},[e("el-form",{ref:"userForm",staticStyle:{width:"80%"},attrs:{model:t.userData,"label-width":"120px"}},[e("el-form-item",[e("el-divider",[t._v(" 个人信息 ")])],1),e("el-form-item",{attrs:{label:"账号："}},[e("div",{staticStyle:{"text-align":"left"}},[t._v(t._s(t.userData.userAccount))])]),e("el-form-item",{attrs:{label:"最后登录时间："}},[e("div",{staticStyle:{"text-align":"left"}},[t._v(" "+t._s(t._f("dateFormat")(t.userData.loginAt))+" ")])]),e("el-form-item",{attrs:{label:"真实姓名：",prop:"nickName"}},[e("el-input",{model:{value:t.userData.nickName,callback:function(e){t.$set(t.userData,"nickName","string"===typeof e?e.trim():e)},expression:"userData.nickName"}})],1),e("el-form-item",{attrs:{label:"个人描述："}},[e("el-input",{attrs:{type:"textarea",rows:"5",placeholder:"简单描述一下自己~"},model:{value:t.userData.introduction,callback:function(e){t.$set(t.userData,"introduction","string"===typeof e?e.trim():e)},expression:"userData.introduction"}})],1),e("el-form-item",{attrs:{label:""}},[e("el-button",{staticStyle:{width:"100%"},attrs:{type:"success",icon:"el-icon-circle-check"},on:{click:t.userData_serve}},[t._v("保存")])],1)],1)],1)],1):t._e(),e("el-dialog",{attrs:{title:t.contact.title,visible:t.contact.dialog,"close-on-click-modal":!1,width:"500px"},on:{"update:visible":function(e){return t.$set(t.contact,"dialog",e)}}},[e("el-form",{ref:"ruleForm2",attrs:{model:t.contact,"label-width":"80px",rules:t.rules}},[t.contact.phone?e("el-form-item",{attrs:{label:"手机：",prop:"content"}},[e("el-input",{attrs:{placeholder:"请输入您的手机号"},model:{value:t.contact.content,callback:function(e){t.$set(t.contact,"content","string"===typeof e?e.trim():e)},expression:"contact.content"}})],1):e("el-form-item",{attrs:{label:"邮箱：",prop:"content"}},[e("el-input",{attrs:{placeholder:"请输入您的邮箱"},model:{value:t.contact.content,callback:function(e){t.$set(t.contact,"content","string"===typeof e?e.trim():e)},expression:"contact.content"}})],1),e("el-form-item",{attrs:{label:"验证码："}},[e("el-input",{attrs:{placeholder:"请输入验证码"},model:{value:t.contact.code,callback:function(e){t.$set(t.contact,"code","string"===typeof e?e.trim():e)},expression:"contact.code"}},[e("el-button",{attrs:{slot:"append",icon:"el-icon-thumb",disabled:!!t.contact.time},on:{click:t.setCode},slot:"append"},[t._v(t._s(t.contact.time?t.contact.time:"获取验证码"))])],1)],1)],1),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:t.closeDialog}},[t._v("取 消")]),e("el-button",{attrs:{type:"primary",disabled:!t.contact.code},on:{click:t.setContact}},[t._v("确 定")])],1)],1),e("ModifyPass",{attrs:{show:t.dialogFormVisible},on:{_close:t.dialogFormVisibleClose}})],1)},n=[],i=a("7c3e"),c=a("00f8"),s=a("6730"),r=(a("5a60"),a("6eef")),l=a("ed08"),u=a("10f1"),m={name:"userInfo",data:function(){var t=this,e=function(e,a,o){var n=t.contact.phone?"手机号":"邮箱";return a?t.contact.phone&&!Object(u["c"])(a)?o("请正确输入您的手机号"):t.contact.phone||Object(u["a"])(a)?void o():o("请正确输入您的邮箱"):o(new Error("请输入".concat(n)))};return{dialogFormVisible:!1,avatarShow:!1,contact:{dialog:!1,title:"修改手机",phone:!0,content:"",code:"",time:0},rules:{content:[{validator:e,trigger:"blur"}]},userData:{},fileList:[]}},mounted:function(){this._getUserInfo()},methods:Object(s["a"])(Object(s["a"])(Object(s["a"])(Object(s["a"])({},Object(r["b"])("user",["resetToken"])),Object(r["b"])("home",["getUserInfo","setUserInfo","reclassify","setEmail","checkCodeAdd"])),Object(r["b"])("resources",["imageAvatarUpload"])),{},{_getUserInfo:function(){var t=this;return Object(c["a"])(Object(i["a"])().mark((function e(){return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getUserInfo();case 2:t.userData=e.sent;case 3:case"end":return e.stop()}}),e)})))()},closeAvatarShow:function(t){var e=this;return Object(c["a"])(Object(i["a"])().mark((function a(){return Object(i["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(!t){a.next=5;break}return Object(l["d"])("上传中。。。"),a.next=4,e.imageAvatarUpload({file:t,type:"avatar"});case 4:e._getUserInfo();case 5:e.avatarShow=!1;case 6:case"end":return a.stop()}}),a)})))()},checkCode:function(t,e){if(this.contact.dialog=!0,this.contact.phone=e,this.contact.title=t?"绑定":"修改",e)return this.contact.title+="手机";this.contact.title+="邮箱"},setCode:function(){var t=this;this.$refs.ruleForm2.validate((function(e,a){if(!e)return!1;t.contact.time=60,t.mySetTimeout(),t.contact.phone?setTimeout((function(){t.$notify({title:"手机验证码",message:"未开通短信业务，验证码可随意填写",offset:100})}),2e3):setTimeout((function(){t.setEmail({email:t.contact.content})}),2e3)}))},setContact:function(){var t=this;this.$refs["ruleForm2"].validate(function(){var e=Object(c["a"])(Object(i["a"])().mark((function e(a){return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a){e.next=2;break}return e.abrupt("return",!1);case 2:return Object(l["d"])("正在".concat(t.contact.title)),e.next=5,t.checkCodeAdd(Object(s["a"])({},t.contact));case 5:t.closeDialog(),t._getUserInfo();case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},mySetTimeout:function(){var t=this;setTimeout((function(){t.contact.time--,t.contact.time&&t.mySetTimeout()}),1e3)},closeDialog:function(){this.contact.dialog=!1,this.contact.content="",this.contact.code=""},userData_serve:function(){var t=this;this.$refs.userForm.validate(function(){var e=Object(c["a"])(Object(i["a"])().mark((function e(a){return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a){e.next=2;break}return e.abrupt("return",!1);case 2:return Object(l["d"])("正在保存"),e.next=5,t.setUserInfo(Object(s["a"])({},t.userData));case 5:t.$notify({title:"保存成功",message:"将在下次登录后生效！",offset:100}),t._getUserInfo();case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},dialogFormVisibleClose:function(){this.dialogFormVisible=!this.dialogFormVisible}})},d=m,f=(a("46a0"),a("0460")),p=Object(f["a"])(d,o,n,!1,null,"441d5d8e",null);e["default"]=p.exports}}]);