(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{102:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return s})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return p}));var r=n(1),o=n(6),a=(n(0),n(115)),i={id:"css-modules",title:"CSS Modules with PostCSS",sidebar_label:"CSS Modules with PostCSS"},s={id:"what-is-included/css-modules",title:"CSS Modules with PostCSS",description:"CSS Modules are `.css` files that can be locally scoped.",source:"@site/docs/what-is-included/css-modules.md",permalink:"/docs/what-is-included/css-modules",sidebar_label:"CSS Modules with PostCSS",sidebar:"docs",previous:{title:"ESLint & Stylelint",permalink:"/docs/what-is-included/eslint-stylelint"},next:{title:"Internationalization",permalink:"/docs/what-is-included/internationalization"}},c=[],l={rightToc:c};function p(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"CSS Modules are ",Object(a.b)("inlineCode",{parentName:"p"},".css")," files that can be locally scoped."),Object(a.b)("p",null,"This boilerplate is configured so all ",Object(a.b)("inlineCode",{parentName:"p"},".css")," files can be used as modules by default using the official CSS plugin from Zeit: ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/zeit/next-plugins/tree/master/packages/next-css"}),Object(a.b)("inlineCode",{parentName:"a"},"@zeit/next-css")),"."),Object(a.b)("p",null,"Our configuration is set so that during development, the names of the classes will be ",Object(a.b)("inlineCode",{parentName:"p"},"<Filename>__<Class>___<Hash>")," so it's easier to debug.\nIn production all classes are minified to a unique hash."),Object(a.b)("p",null,"We also use ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://postcss.org/"}),Object(a.b)("strong",{parentName:"a"},"PostCSS"))," to transform the styles according our browser targets defined in ",Object(a.b)("inlineCode",{parentName:"p"},"package.json"),". To do so, we apply our own preset: ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/moxystudio/postcss-preset-moxy"}),Object(a.b)("inlineCode",{parentName:"a"},"postcss-preset-moxy")),"."))}p.isMDXComponent=!0},115:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return f}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=o.a.createContext({}),p=function(e){var t=o.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s({},t,{},e)),n},u=function(e){var t=p(e.components);return o.a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},b=Object(r.forwardRef)((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,i=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),u=p(n),b=r,f=u["".concat(i,".").concat(b)]||u[b]||d[b]||a;return n?o.a.createElement(f,s({ref:t},l,{components:n})):o.a.createElement(f,s({ref:t},l))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=b;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var l=2;l<a;l++)i[l]=n[l];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);