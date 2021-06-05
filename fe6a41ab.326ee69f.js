(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{94:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return p}));var a=n(2),i=n(6),r=(n(0),n(98)),o={id:"internationalization",title:"Internationalization",sidebar_label:"Internationalization"},l={unversionedId:"what-is-included/internationalization",id:"what-is-included/internationalization",isDocsHomePage:!1,title:"Internationalization",description:"All of our projects have I18N support built-in, even if there's no need to initially have more than one locale. By having I18N support from the very beginning, the project itself is built with that in mind, making it very easy to add new locales in the future without having to refactor a good surface of your app.",source:"@site/docs/what-is-included/internationalization.md",permalink:"/docs/what-is-included/internationalization",sidebar_label:"Internationalization",sidebar:"docs",previous:{title:"Customizable page transitions",permalink:"/docs/what-is-included/customizable-page-transitions"},next:{title:"Sitemap & robots.txt",permalink:"/docs/what-is-included/sitemap-robots"}},c=[{value:"Adding a new locale",id:"adding-a-new-locale",children:[]},{value:"Removing this feature",id:"removing-this-feature",children:[]}],s={rightToc:c};function p(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(r.b)("wrapper",Object(a.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"All of our projects have I18N support built-in, even if there's no need to initially have more than one locale. By having I18N support from the very beginning, the project itself is built with that in mind, making it very easy to add new locales in the future without having to refactor a good surface of your app."),Object(r.b)("p",null,"We have chosen ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/formatjs/react-intl/"}),Object(r.b)("inlineCode",{parentName:"a"},"react-intl"))," for internalization and localization because:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"It has a large community and is being actively maintained."),Object(r.b)("li",{parentName:"ul"},"Built on the standard ",Object(r.b)("a",Object(a.a)({parentName:"li"},{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl"}),"Intl")," API."),Object(r.b)("li",{parentName:"ul"},"It can localize strings, numbers, dates and relative dates."),Object(r.b)("li",{parentName:"ul"},"Runs in the browser and Node.js.")),Object(r.b)("p",null,"The integration of ",Object(r.b)("inlineCode",{parentName:"p"},"react-intl")," into Next.js is made with ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/moxystudio/next-intl"}),Object(r.b)("inlineCode",{parentName:"a"},"@moxy/next-intl")),"."),Object(r.b)("h2",{id:"adding-a-new-locale"},"Adding a new locale"),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},"Add the locale to the ",Object(r.b)("inlineCode",{parentName:"li"},"next.config.js")," file."),Object(r.b)("li",{parentName:"ol"},"Add the messages file to ",Object(r.b)("inlineCode",{parentName:"li"},"intl/<locale>.json"),".")),Object(r.b)("h2",{id:"removing-this-feature"},"Removing this feature"),Object(r.b)("p",null,"If you are really sure internationalization is not needed in your project, you'll want to remove all the unnecessary ",Object(r.b)("inlineCode",{parentName:"p"},"intl")," related code. Be sure to follow these steps in order to clean your project properly:"),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},"Uninstall ",Object(r.b)("inlineCode",{parentName:"li"},"react-intl"),", ",Object(r.b)("inlineCode",{parentName:"li"},"@moxy/next-intl"),"."),Object(r.b)("li",{parentName:"ol"},"Remove the ",Object(r.b)("inlineCode",{parentName:"li"},"intl")," folder."),Object(r.b)("li",{parentName:"ol"},"Search globally for ",Object(r.b)("inlineCode",{parentName:"li"},"react-intl")," and ",Object(r.b)("inlineCode",{parentName:"li"},"@moxy/next-intl")," and remove the corresponding code across the project."),Object(r.b)("li",{parentName:"ol"},"Update your unit tests if necessary so that they all pass!")))}p.isMDXComponent=!0},98:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return m}));var a=n(0),i=n.n(a);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=i.a.createContext({}),p=function(e){var t=i.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=p(e.components);return i.a.createElement(s.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},d=i.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,o=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),u=p(n),d=a,m=u["".concat(o,".").concat(d)]||u[d]||b[d]||r;return n?i.a.createElement(m,l(l({ref:t},s),{},{components:n})):i.a.createElement(m,l({ref:t},s))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,o=new Array(r);o[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var s=2;s<r;s++)o[s]=n[s];return i.a.createElement.apply(null,o)}return i.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);