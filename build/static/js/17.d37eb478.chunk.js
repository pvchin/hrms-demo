(this.webpackJsonphrms=this.webpackJsonphrms||[]).push([[17],{1081:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return h}));var n=a(4),r=a(9),i=a(1),l=a(27),c=a.n(l),s=a(87),o=a(50),d=a(349),u=a(348),m=a(102),j=a(845),b=a(2),p={name:"",date:"",purchased_from:"",description:"",status:"Pending",amount:0,attachment1_name:"",attachment1_url:"",attachment2_name:"",attachment2_url:"",attachment3_name:"",attachment3_url:""};function h(){var e=O(),t=Object(d.a)().expenses,a=Object(i.useState)(p),l=Object(r.a)(a,2),s=l[0],h=l[1],f=Object(i.useState)(!1),x=Object(r.a)(f,2),g=x[0],v=x[1],C=Object(m.b)(),S=(C.editExpenseID,C.setEditExpenseID),w=C.setIsExpenseEditingOn,y=(C.setIsExpenseEditingOff,Object(i.useMemo)((function(){return[{title:"Name",field:"name"},{title:"Date",field:"date",type:"date",dateSetting:{locale:"en-GB"}},{title:"Description",field:"description"},{title:"Amount",field:"amount",type:"currency"},{title:"Status",field:"status"}]}),[])),_=function(){v(!0)},F=function(){v(!1)};return Object(b.jsxs)("div",{className:e.root,children:[Object(b.jsx)("div",{style:{maxWidth:"100%",paddingTop:"5px"},children:Object(b.jsx)(c.a,{columns:y,data:t.filter((function(e){return"Pending"===e.status})).map((function(e){return Object(n.a)({},e)})),title:"Expenses Claims Application",actions:[function(e){return{icon:function(){return Object(b.jsx)(u.a,{size:"33px"})},tooltip:"View",onClick:function(e,t){!function(e){var t=e.id;h(Object(n.a)({},e)),h((function(t){return Object(n.a)({},e)})),S(t),w(),_()}(t)}}}],options:{filtering:!1,search:!1,toolbar:!1,headerStyle:{backgroundColor:"#90CDF4",color:"primary"},showTitle:!1}})}),Object(b.jsx)(o.a,{isOpen:g,handleClose:F,title:"",showButton:!0,isFullscreen:!1,isFullwidth:!1,children:Object(b.jsx)(j.a,{formdata:s,setFormdata:h,handleDialogClose:F})})]})}var O=Object(s.a)((function(e){return{root:{padding:0}}}))},845:function(e,t,a){"use strict";var n=a(25),r=(a(47),a(4)),i=a(9),l=a(1),c=a.n(l),s=a(98),o=a(88),d=a(133),u=a(87),m=a(23),j=(a(163),a(26),a(457)),b=a.n(j),p=a(459),h=a.n(p),O=a(75),f=a(404),x=a(579),g=a(405),v=a(212),C=a(296),S=a(30),w=a(102),y=a(29),_=a(19),F=a(464),E=a(320),k=a(321),V=a(323),D=a(2),I=c.a.lazy((function(){return Promise.all([a.e(6),a.e(7)]).then(a.bind(null,874))})),N=Object(u.a)((function(e){return{button:{margin:e.spacing(1)},leftIcon:{marginRight:e.spacing(1)},rightIcon:{marginLeft:e.spacing(1)},iconSmall:{fontSize:20},root:{padding:e.spacing(3,2)},container:{display:"flex",flexWrap:"wrap"},textField:{marginLeft:e.spacing(1),marginRight:e.spacing(1),width:400}}}));t.a=function(e){var t=e.formdata,a=(e.setFormdata,e.handleDialogClose),c=N(),u=(Object(_.a)(),Object(k.a)()),j=Object(F.a)(),p=(Object(E.a)(),Object(V.a)()),P=p.expensesattachments,T=p.setAttachmentId,z=Object(m.c)(S.f),A=Object(i.a)(z,2),R=A[0],L=(A[1],Object(w.b)()),M=L.isExpenseEditing,q=L.editExpenseID,B=Object(l.useState)([]),G=Object(i.a)(B,2),J=G[0],U=G[1],W=Object(l.useState)(""),X=Object(i.a)(W,2),$=(X[0],X[1],Object(l.useState)({})),H=Object(i.a)($,2),K=(H[0],H[1],Object(m.c)(S.m)),Q=Object(i.a)(K,2),Y=Q[0],Z=Q[1],ee=Object(O.e)(),te=ee.isOpen,ae=ee.onOpen,ne=ee.onClose,re=Object(y.b)({defaultValues:Object(r.a)({},t)}),ie=re.handleSubmit,le=re.control;re.setValue;return Object(l.useEffect)((function(){if(M){T(t.attachmentid);var e=P.filter((function(e){return e.attachmentid===t.attachmentid})).map((function(e){return{name:e.name,preview:e.url}}));U(e)}else U([])}),[P]),Object(D.jsxs)("div",{children:[Object(D.jsxs)(f.b,{size:"x1",children:[Object(D.jsx)(s.a,{variant:"h5",component:"h3",children:"EXPENSES CLAIM FORM"}),Object(D.jsx)(s.a,{component:"p",children:"Expense Claim Application"}),Object(D.jsx)("form",{onSubmit:ie((function(e,t){t.preventDefault();var i=Object(r.a)(Object(r.a)({},e),{},{attachment1_name:J.length>=1?J[0].name:"",attachment1_url:J.length>=1?J[0].preview:"",attachment2_name:J.length>=2?J[1].name:"",attachment2_url:J.length>=2?J[1].preview:"",attachment3_name:J.length>=3?J[2].name:"",attachment3_url:J.length>=3?J[2].preview:""});if(console.log("newdata",i),console.log("isEditing",M),M){i.rec_id,i.tableData;var l=Object(n.a)(i,["rec_id","tableData"]);u(Object(r.a)({id:q},l))}else j(Object(r.a)(Object(r.a)({},i),{},{empid:R.loginUserId,name:R.loginUser}));a()})),children:Object(D.jsxs)(f.f,{templateColumns:"repeat(3, 1fr)",gap:4,children:[Object(D.jsxs)(f.g,{colSpan:1,children:[Object(D.jsx)("div",{children:Object(D.jsx)(y.a,{name:"name",control:le,defaultValue:t.name,render:function(e){var a=e.field,n=a.onChange,r=(a.value,e.fieldState.error);return Object(D.jsx)(o.a,{label:"Name",id:"margin-normal1",name:"name",defaultValue:t.name,className:c.textField,onChange:n,error:!!r,helperText:r?r.message:null,InputProps:{readOnly:!0}})}})}),Object(D.jsx)("div",{children:Object(D.jsx)(y.a,{name:"date",control:le,defaultValue:t.date,render:function(e){var t=e.field,a=t.onChange,n=t.value,r=e.fieldState.error;return Object(D.jsx)(o.a,{label:"Date",type:"date",id:"margin-normal2",name:"formdata.date",value:n,className:c.textField,onChange:a,error:!!r,helperText:r?r.message:null,InputLabelProps:{shrink:!0}})},rules:{required:"From Date is required"}})}),Object(D.jsx)("div",{children:Object(D.jsx)(y.a,{name:"purchased_from",control:le,defaultValue:t.purchased_from,render:function(e){var a=e.field,n=a.onChange,r=(a.value,e.fieldState.error);return Object(D.jsx)(o.a,{label:"Purchased From",id:"margin-normal3",name:"purchased_from",defaultValue:t.purchased_from,className:c.textField,onChange:n,error:!!r,helperText:r?r.message:null})}})}),Object(D.jsx)("div",{children:Object(D.jsx)(y.a,{name:"description",control:le,defaultValue:t.description,render:function(e){var a=e.field,n=a.onChange,r=(a.value,e.fieldState.error);return Object(D.jsx)(o.a,{label:"Description",id:"margin-normal4",name:"description",defaultValue:t.description,className:c.textField,onChange:n,error:!!r,helperText:r?r.message:null})}})}),Object(D.jsx)("div",{children:Object(D.jsx)(y.a,{name:"amount",control:le,defaultValue:t.amount,render:function(e){var a=e.field,n=a.onChange,r=(a.value,e.fieldState.error);return Object(D.jsx)(h.a,{label:"Amount",variant:"standard",value:t.amount,currencySymbol:"$",outputFormat:"string",decimalCharacter:".",digitGroupSeparator:",",decimalPlaces:"2",className:c.textField,id:"standard-amount",name:"amount",style:{width:100},onChange:function(e){n(parseFloat(b()(e.target.value),10))},error:!!r,helperText:r?r.message:null})}})}),Object(D.jsx)("div",{children:Object(D.jsx)(y.a,{name:"remark",control:le,defaultValue:t.remark,render:function(e){var a=e.field,n=a.onChange,r=(a.value,e.fieldState.error);return Object(D.jsx)(o.a,{label:"Remark",id:"margin-normal5",name:"remark",defaultValue:t.remark,className:c.textField,onChange:n,error:!!r,helperText:r?r.message:null})}})}),Object(D.jsx)("div",{children:Object(D.jsx)(y.a,{name:"status",control:le,defaultValue:t.status,render:function(e){var a=e.field,n=a.onChange,r=(a.value,e.fieldState.error);return Object(D.jsx)(o.a,{label:"Status",id:"margin-normal6",name:"status",defaultValue:t.status,className:c.textField,onChange:n,error:!!r,helperText:r?r.message:null,InputProps:{readOnly:!0}})}})}),Object(D.jsx)("div",{})]}),Object(D.jsx)(f.g,{colSpan:2,children:J.filter((function(e){return void 0!==e.name&&null!==e.name})).map((function(e){return Object(D.jsx)(f.b,{display:"inline-flex",w:"50%",h:150,mb:8,mr:8,p:4,border:"1px solid #eaeaea",borderRadius:2,children:Object(D.jsxs)(f.h,{p:5,children:[Object(D.jsx)(x.a,{src:e.preview,alt:e.name,display:"block",w:"auto",h:"100%"}),Object(D.jsx)(f.o,{children:Object(D.jsx)(g.b,{size:"sm","aria-label":"view image",icon:Object(D.jsx)(C.b,{}),onClick:function(){return function(e){var t={url:e.preview,name:e.name};Z((function(e){return t})),ae()}({preview:e.preview,name:e.name,type:e.preview.split(".").pop()})}})})]})},e.name)}))})]})})]}),Object(D.jsxs)(v.g,{closeOnOverlayClick:!1,isOpen:te,onClose:ne,size:"3xl",children:[Object(D.jsx)(v.m,{}),Object(D.jsxs)(v.j,{children:[Object(D.jsx)(v.l,{children:Y.name}),Object(D.jsx)(v.i,{}),Object(D.jsx)(v.h,{pb:6,children:Object(D.jsx)(f.b,{display:"inline-flex",w:"100%",h:"800",mb:8,mr:8,p:4,border:"1px solid #eaeaea",borderRadius:2,children:Object(D.jsx)(I,{imagefile:Y})})}),Object(D.jsx)(v.k,{children:Object(D.jsx)(d.a,{onClick:ne,children:"Close"})})]})]})]})}}}]);
//# sourceMappingURL=17.d37eb478.chunk.js.map