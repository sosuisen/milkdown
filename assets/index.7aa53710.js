var e=Object.defineProperty,t=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,a=(t,n,r)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r,s=(e,s)=>{for(var i in s||(s={}))n.call(s,i)&&a(e,i,s[i]);if(t)for(var i of t(s))r.call(s,i)&&a(e,i,s[i]);return e};import{r as i,R as o,u as l,L as c,N as m,S as d,_ as u,a as _,H as p,b as g}from"./vendor.526d0975.js";let h;const E={},x=function(e,t){if(!t||0===t.length)return e();if(void 0===h){const e=document.createElement("link").relList;h=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(t.map((e=>{if((e=`/milkdown/${e}`)in E)return;E[e]=!0;const t=e.endsWith(".css"),n=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${n}`))return;const r=document.createElement("link");return r.rel=t?"stylesheet":h,t||(r.as="script",r.crossOrigin=""),r.href=e,document.head.appendChild(r),t?new Promise(((e,t)=>{r.addEventListener("load",e),r.addEventListener("error",t)})):void 0}))).then((()=>e()))},v=[{dir:"guide",items:["why-milkdown","getting-started","interacting-with-editor","commands","styling","keyboard-shortcuts"]},{dir:"integrations",items:["react","vue"]},{dir:"plugins",items:["using-plugins","integrating-plugins","example-custom-syntax","writing-plugins"]},{dir:"internals",items:["node-and-mark","parser","serializer","internal-plugins"]}],f=new Map([["guide",{en:"Guide","zh-hans":"引导"}],["why-milkdown",{en:"Why Milkdown","zh-hans":"为什么使用Milkdown"}],["getting-started",{en:"Getting Started","zh-hans":"开始使用"}],["interacting-with-editor",{en:"Interacting With Editor","zh-hans":"与编辑器交互"}],["commands",{en:"Commands","zh-hans":"命令"}],["styling",{en:"Styling","zh-hans":"样式"}],["keyboard-shortcuts",{en:"Keyboard Shortcuts","zh-hans":"快捷键"}],["integrations",{en:"Integrations","zh-hans":"集成"}],["react",{en:"React","zh-hans":"React"}],["vue",{en:"Vue","zh-hans":"Vue"}],["plugins",{en:"Plugins","zh-hans":"插件"}],["using-plugins",{en:"Using Plugins","zh-hans":"使用插件"}],["integrating-plugins",{en:"Integrating Plugins","zh-hans":"集成插件"}],["example-custom-syntax",{en:"Example: Custom Syntax","zh-hans":"示例：自定义语法"}],["writing-plugins",{en:"Writing Plugins","zh-hans":"编写插件"}],["internals",{en:"Internals","zh-hans":"内部"}],["node-and-mark",{en:"Node & Mark","zh-hans":"Node & Mark"}],["parser",{en:"Parser","zh-hans":"解析器"}],["serializer",{en:"Serializer","zh-hans":"序列化"}],["internal-plugins",{en:"Internal Plugins","zh-hans":"内置插件"}]]),y=(e,t)=>{var n,r;return null!=(r=null==(n=f.get(e))?void 0:n[t])?r:"Not Found"};const w=(e,t,n)=>{const r="index"+("en"===n?"":`.${n}`);return{title:y(t,n),link:"en"===n?"/"+t:`/${n}/${t}`,content:()=>function(e){switch(e){case"../pages/guide/commands/index.md":return x((()=>import("./index.291f9141.js")),[]);case"../pages/guide/getting-started/index.md":return x((()=>import("./index.91ee67f1.js")),[]);case"../pages/guide/getting-started/index.zh-hans.md":return x((()=>import("./index.zh-hans.2e14d123.js")),[]);case"../pages/guide/interacting-with-editor/index.md":return x((()=>import("./index.57705263.js")),[]);case"../pages/guide/keyboard-shortcuts/index.md":return x((()=>import("./index.707c7b46.js")),[]);case"../pages/guide/styling/index.md":return x((()=>import("./index.8940238f.js")),[]);case"../pages/guide/why-milkdown/index.md":return x((()=>import("./index.b97014e8.js")),[]);case"../pages/guide/why-milkdown/index.zh-hans.md":return x((()=>import("./index.zh-hans.0126b792.js")),[]);case"../pages/integrations/react/index.md":return x((()=>import("./index.d022f4df.js")),[]);case"../pages/integrations/vue/index.md":return x((()=>import("./index.c4423b39.js")),[]);case"../pages/internals/internal-plugins/index.md":return x((()=>import("./index.45a3c1ee.js")),[]);case"../pages/internals/internal-plugins/index.zh-hans.md":return x((()=>import("./index.zh-hans.542927a4.js")),[]);case"../pages/internals/node-and-mark/index.md":return x((()=>import("./index.a515b4ea.js")),[]);case"../pages/internals/node-and-mark/index.zh-hans.md":return x((()=>import("./index.zh-hans.edebc4c1.js")),[]);case"../pages/internals/parser/index.md":return x((()=>import("./index.da7f19e2.js")),[]);case"../pages/internals/parser/index.zh-hans.md":return x((()=>import("./index.zh-hans.44fe1903.js")),[]);case"../pages/internals/serializer/index.md":return x((()=>import("./index.eb5c03fb.js")),[]);case"../pages/internals/serializer/index.zh-hans.md":return x((()=>import("./index.zh-hans.95add1c5.js")),[]);case"../pages/plugins/example-custom-syntax/index.md":return x((()=>import("./index.0c84f845.js")),[]);case"../pages/plugins/integrating-plugins/index.md":return x((()=>import("./index.7133b61b.js")),[]);case"../pages/plugins/using-plugins/index.md":return x((()=>import("./index.eb089145.js")),[]);case"../pages/plugins/writing-plugins/index.md":return x((()=>import("./index.54845d79.js")),[]);default:return new Promise((function(t,n){("function"==typeof queueMicrotask?queueMicrotask:setTimeout)(n.bind(null,new Error("Unknown variable dynamic import: "+e)))}))}}(`../pages/${e}/${t}/${r}.md`)}},k=(e,t)=>e.map((e=>(({dir:e,items:t},n)=>({title:y(e,n),items:t.map((t=>w(e,t,n)))}))(e,t))),P={en:k(v,"en"),"zh-hans":k(v,"zh-hans")};var b,z;(z=b||(b={}))[z.Default=0]="Default",z[z.TwoSide=1]="TwoSide";const C=i.exports.createContext(!1),T=i.exports.createContext(!1),D=i.exports.createContext(b.Default),I=i.exports.createContext(!1),L=i.exports.createContext("en"),j=i.exports.createContext([]),N=i.exports.createContext((()=>{})),O=i.exports.createContext((()=>{})),R=i.exports.createContext((()=>{})),V=i.exports.createContext((()=>{})),A=i.exports.createContext((()=>{})),S=({children:e})=>{const[t,n]=o.useState(!1);return o.createElement(C.Provider,{value:t},o.createElement(N.Provider,{value:n},e))},M=({children:e})=>{const[t,n]=o.useState(b.Default);return o.createElement(D.Provider,{value:t},o.createElement(R.Provider,{value:n},e))},$=({children:e})=>{const[t,n]=o.useState(!1);return o.createElement(T.Provider,{value:t},o.createElement(O.Provider,{value:n},e))},q=({children:e})=>{const[t,n]=o.useState(!1);return o.createElement(I.Provider,{value:t},o.createElement(V.Provider,{value:n},e))},H=({children:e})=>{const[t,n]=o.useState("en"),r=o.useMemo((()=>P[t]),[t]);return o.createElement(j.Provider,{value:r},o.createElement(L.Provider,{value:t},o.createElement(A.Provider,{value:n},e)))},W=({children:e})=>o.createElement(H,null,o.createElement(q,null,o.createElement($,null,o.createElement(S,null,o.createElement(M,null,e))))),B="https://unpkg.com/prism-themes/themes/prism-material-light.css",G="https://unpkg.com/prism-themes/themes/prism-nord.css",Y=(e,t)=>{i.exports.useEffect((()=>{var e;const n=Boolean(null==(e=window.matchMedia)?void 0:e.call(window,"(prefers-color-scheme: dark)").matches);t(n)}),[t]),i.exports.useEffect((()=>{document.documentElement.setAttribute("data-theme",e?"dark":"light");(()=>{const e=document.querySelector("#prism-theme");if(e)return e;const t=document.createElement("link");return t.id="prism-theme",t.setAttribute("rel","stylesheet"),document.head.appendChild(t),t})().setAttribute("href",e?G:B)}),[e])};var U,F;(F=U||(U={}))[F.Home=0]="Home",F[F.Demo=1]="Demo",F[F.Page=2]="Page";const K=e=>"/"===e.pathname?0:"/online-demo"===e.pathname?1:2;function Z(){const e=l();return[K(e),e]}var J={container:"_container_1vq7s_1",fold:"_fold_1vq7s_11",header:"_header_1vq7s_16",homepage:"_homepage_1vq7s_37",part:"_part_1vq7s_41",icon:"_icon_1vq7s_45",logo:"_logo_1vq7s_58",mode:"_mode_1vq7s_92"};const Q=`${J.icon} material-icons-outlined`,X=()=>{const e=o.useContext(D),t=o.useContext(I),n=o.useContext(R),r=o.useContext(V),a=(()=>{const[e]=Z(),[t,n]=o.useState(!1);return o.useEffect((()=>{n(e===U.Demo)}),[e]),t})();return o.createElement("div",{className:J.part},a&&o.createElement("span",{onClick:()=>n((e=>e===b.Default?b.TwoSide:b.Default)),className:[Q,J.mode].join(" ")},e===b.Default?"chrome_reader_mode":"wysiwyg"),o.createElement("span",{onClick:()=>r(!t),className:Q},t?"light_mode":"dark_mode"),o.createElement("a",{href:"https://github.com/Saul-Mirone/milkdown",target:"_blank",className:J.github},o.createElement("span",{className:Q},"open_in_new")))},ee=`${J.icon} material-icons-outlined`,te=()=>{const e=o.useContext(T);return o.createElement(c,{to:"/",className:J.logo},o.createElement("img",{src:"/milkdown/milkdown-mini.svg"}),o.createElement("span",{style:{opacity:e?0:1,transition:"opacity, color, background 0.4s ease-in-out"}},"Milkdown"))},ne=()=>{const e=o.useContext(I),t=o.useContext(V),n=o.useContext(N),r=o.useContext(T),{showToggle:a,fold:s,isHomePage:i}=(()=>{const[e,t]=o.useState(!0),n=o.useContext(C),[r]=Z();return o.useEffect((()=>{r!==U.Page?t(!1):t(!0)}),[r]),{showToggle:e,fold:n,isHomePage:r===U.Home}})();Y(e,t);const l=[J.container,i||!r?J.homepage:"",s?J.fold:""].join(" ");return o.createElement("div",{id:"header",className:l},o.createElement("header",{className:J.header},o.createElement("div",{className:J.part},a&&o.createElement("span",{className:ee,onClick:e=>{n((e=>!e)),e.stopPropagation()}},"menu"),o.createElement(te,null)),o.createElement(X,null)))},re=document.createElement("div");let ae;re.style.position="fixed",re.style.right="0",re.style.top="0",re.style.bottom="0",re.style.background="rgba(var(--background), 1)",re.style.zIndex="99";const se=()=>{ae&&window.clearTimeout(ae);const{body:e}=document,t=document.getElementById("header"),n=window.innerWidth-e.clientWidth;e.style.marginRight=`${n}px`,e.style.overflow="hidden",e.style.transition="none",re.style.width=n+"px",t&&(t.style.marginRight=`${n}px`,t.style.transition="none"),re.style.display="block"},ie=()=>{const{body:e}=document,t=document.getElementById("header");e.style.overflow="",e.style.marginRight="",t&&(t.style.marginRight=""),ae=window.setTimeout((()=>{e.style.transition="",t&&(t.style.transition="")}),400),re.style.display="none"};var oe={sidebar:"_sidebar_3fzld_1",fold:"_fold_3fzld_13",hr:"_hr_3fzld_28",sectionTitle:"_sectionTitle_3fzld_35",link:"_link_3fzld_44",active:"_active_3fzld_56"};const le=({title:e,link:t})=>o.createElement(m,{className:oe.link,activeClassName:oe.active,to:t},e),ce=({title:e,items:t})=>o.createElement("section",{className:oe.section},o.createElement("section",{className:oe.sectionTitle},e),t.map(((e,t)=>o.createElement(le,s({key:t.toString()},e))))),me=()=>{const e=o.useContext(j),t=o.useContext(C),n=(()=>{const e=o.useContext(N),t=o.useRef(null),[n,r]=Z();return o.useEffect((()=>{const r=document.documentElement.clientWidth<1080;if(n!==U.Page||r)return void e(!1);e(!0);const{current:a}=t;return a?(document.body.appendChild(re),a.addEventListener("mouseenter",se),a.addEventListener("mouseleave",ie),()=>{document.body.removeChild(re),a.removeEventListener("mouseleave",ie),a.removeEventListener("mouseenter",se)}):void 0}),[n,e,r]),t})(),r=o.useMemo((()=>`${oe.sidebar} ${t?"":oe.fold}`),[t]);return o.createElement("nav",{ref:n,className:r},e.map(((t,n)=>o.createElement("section",{key:n.toString()},o.createElement(ce,s({key:n.toString()},t)),n<e.length-1&&o.createElement("hr",{className:oe.hr})))))};var de={footer:"_footer_tx00c_1",homepage:"_homepage_tx00c_12"};const ue=()=>{const[e]=Z(),t=[de.footer,e===U.Home?de.homepage:""].join(" ");return o.createElement("footer",{className:t},"MIT Licensed | Copyright © 2021-present Mirone ♡ Meo")};var _e="_body_1pnu5_1",pe="_main_1pnu5_11",ge="_content_1pnu5_20",he="_container_1pnu5_30",Ee="_title_1pnu5_41",xe="_desc_1pnu5_50",ve="_logo_1pnu5_58",fe="_buttons_1pnu5_65",ye="_curve_1pnu5_100";const we=()=>o.createElement("section",{className:_e},o.createElement("section",{className:pe},o.createElement("div",{className:he},o.createElement("div",{className:ge},o.createElement("h1",{className:Ee},"Milkdown"),o.createElement("p",{className:xe},"Plugin Based WYSIWYG Markdown Editor"),o.createElement("section",{className:fe},o.createElement(c,{to:"/getting-started"},"Get Started"),o.createElement(c,{to:"/online-demo"},"Try Online"))),o.createElement("section",{className:ve},o.createElement("img",{src:"/milkdown/milkdown-homepage.svg"})))),o.createElement("div",{className:ye},o.createElement("svg",{viewBox:"0 0 1152 73"},o.createElement("path",{d:"M99.0331 0.252716C59.2655 0.284556 0 25.2197 0 25.2197V0.252716H99.0331C99.0585 0.252696 99.0839 0.252686 99.1093 0.252686C99.1538 0.252686 99.1982 0.252696 99.2427 0.252716H1152V73C1018.73 21.6667 957.818 24.4226 819.692 22.7693C672.54 21.008 573.085 73 427.919 73C308.414 73 218.068 0.307089 99.2427 0.252716H99.0331Z"}))));var ke={right:"_right_1xevo_1",fold:"_fold_1xevo_24",main:"_main_1xevo_33",loading:"_loading_1xevo_39",container:"_container_1xevo_48",homepage:"_homepage_1xevo_73"};const Pe=o.lazy((()=>x((()=>import("./index.e00a88ee.js").then((function(e){return e.i}))),["assets/index.e00a88ee.js","assets/index.1e79df0e.css","assets/vendor.526d0975.js"]).then((e=>({default:e.MilkdownEditor}))))),be=o.lazy((()=>x((()=>import("./index.6b9f716f.js")),["assets/index.6b9f716f.js","assets/index.b1653f16.css","assets/vendor.526d0975.js","assets/index.e00a88ee.js","assets/index.1e79df0e.css"]).then((e=>({default:e.Demo}))))),ze=()=>{const[e]=Z(),t=o.useContext(D),n=o.useContext(I),r=o.useContext(j),a=[ke.container,e===U.Home?ke.homepage:""].join(" ");(()=>{const e=o.useContext(O);o.useEffect((()=>{const t=()=>{e(window.pageYOffset>0)};return document.addEventListener("scroll",t),()=>{document.removeEventListener("scroll",t)}}),[e])})();const s=r.flatMap((e=>e.items));return o.createElement("div",{className:a},o.createElement("article",null,o.createElement(d,null,o.createElement(o.Suspense,{fallback:o.createElement("div",{className:ke.loading},o.createElement(u,{color:"rgba(var(--primary), 1)",loading:!0,size:150}))},o.createElement(_,{exact:!0,path:"/"},o.createElement(we,null)),o.createElement(_,{exact:!0,path:"/online-demo"},o.createElement(be,{mode:t,isDarkMode:n})),s.map(((e,t)=>o.createElement(_,{key:t.toString(),path:e.link},o.createElement(Pe,{content:e.content,readOnly:!0}))))))),o.createElement(ue,null))};const Ce=()=>{const e=o.useContext(N),t=o.useContext(C);return o.createElement("div",{onClick:()=>{document.documentElement.clientWidth<1142&&e(!1)},className:t?ke.right:[ke.right,ke.fold].join(" ")},o.createElement(ne,null),o.createElement("main",{className:ke.main},o.createElement(ze,null)))},Te=()=>o.createElement(p,null,o.createElement(W,null,o.createElement(me,null),o.createElement(Ce,null)));const De=document.getElementById("app");g.exports.render(o.createElement(Te,null),De);export{b as M};
