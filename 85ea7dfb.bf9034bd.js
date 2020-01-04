(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{102:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"rightToc",(function(){return l})),n.d(t,"metadata",(function(){return c})),n.d(t,"default",(function(){return b}));var a=n(1),i=n(6),r=(n(0),n(116)),o={id:"instructions",title:"Instructions",sidebar_label:"Instructions"},l=[{value:"Preparing for delivery",id:"preparing-for-delivery",children:[]}],c={id:"welcome/instructions",title:"Instructions",description:"To kick-start your own project from this boilerplate, you can fork it from its [repository](https://github.com/moxystudio/next-with-moxy).",source:"@site/docs/welcome/instructions.md",permalink:"/docs/welcome/instructions",sidebar_label:"Instructions",sidebar:"docs",previous:{title:"What is this",permalink:"/docs/welcome/what-is-this"},next:{title:"Conventions",permalink:"/docs/welcome/conventions"}},p={rightToc:l,metadata:c},s="wrapper";function b(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(r.b)(s,Object(a.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"To kick-start your own project from this boilerplate, you can fork it from its ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/moxystudio/next-with-moxy"}),"repository"),".\nAfterwards, you'll just need to install its dependencies and you're good to go! \ud83d\ude80"),Object(r.b)("h2",{id:"preparing-for-delivery"},"Preparing for delivery"),Object(r.b)("p",null,"Keep in mind, part of adapting this boilerplate into a deliverable project is also changing this document into one that's about your project in specific. There are some things you must change to clean up any evidence of using this boilerplate:"),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},Object(r.b)("p",{parentName:"li"},"Change all instances of ",Object(r.b)("inlineCode",{parentName:"p"},"{project-name}")," into the name of your project:"),Object(r.b)("p",{parentName:"li"},"You must change all instances of {project-name} into the name of your project, which you can find by using your editor to search the entire workspace for project-name."),Object(r.b)("p",{parentName:"li"},"In any case, here's a list of all places you'll find it:"),Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"package.json"),": In the ",Object(r.b)("inlineCode",{parentName:"li"},"name")," field."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"App.data.js"),": In the ",Object(r.b)("inlineCode",{parentName:"li"},"title")," field."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"Contacts.data.js"),": In the ",Object(r.b)("inlineCode",{parentName:"li"},"name")," field. This file is a sample file and you might want to delete it altogether."),Object(r.b)("li",{parentName:"ul"},"In this document, in case you want to use it."))),Object(r.b)("li",{parentName:"ol"},Object(r.b)("p",{parentName:"li"},"Change all instances of ",Object(r.b)("inlineCode",{parentName:"p"},"{project-domain}")," into the domain that will be used in production:"),Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"package.json"),": In the ",Object(r.b)("inlineCode",{parentName:"li"},"description")," field."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"App.data.js"),": In the ",Object(r.b)("inlineCode",{parentName:"li"},"url")," field."))),Object(r.b)("li",{parentName:"ol"},Object(r.b)("p",{parentName:"li"},"Delete the following files:"),Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"LICENSE")))),Object(r.b)("li",{parentName:"ol"},Object(r.b)("p",{parentName:"li"},"Tweak the root README.md file of the project:"),Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-md"}),"# {Project Name}\n\n{Brief explanation of the project}\n\n## Documentation\n\nThis project comes with a documentation web page. To view it:\n\n```bash\nnpm i --prefix docusarus\nnpm run docs\n```\n"))),Object(r.b)("li",{parentName:"ol"},Object(r.b)("p",{parentName:"li"},"Prepare the rest of the documentation website to be deliverable to your clients!"))))}b.isMDXComponent=!0},116:function(e,t,n){"use strict";n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return b}));var a=n(0),i=n.n(a),r=i.a.createContext({}),o=function(e){var t=i.a.useContext(r),n=t;return e&&(n="function"==typeof e?e(t):Object.assign({},t,e)),n},l=function(e){var t=o(e.components);return i.a.createElement(r.Provider,{value:t},e.children)};var c="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},s=Object(a.forwardRef)((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,l=e.parentName,c=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&-1===t.indexOf(a)&&(n[a]=e[a]);return n}(e,["components","mdxType","originalType","parentName"]),s=o(n),b=a,m=s[l+"."+b]||s[b]||p[b]||r;return n?i.a.createElement(m,Object.assign({},{ref:t},c,{components:n})):i.a.createElement(m,Object.assign({},{ref:t},c))}));function b(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,o=new Array(r);o[0]=s;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[c]="string"==typeof e?e:a,o[1]=l;for(var b=2;b<r;b++)o[b]=n[b];return i.a.createElement.apply(null,o)}return i.a.createElement.apply(null,n)}s.displayName="MDXCreateElement"}}]);