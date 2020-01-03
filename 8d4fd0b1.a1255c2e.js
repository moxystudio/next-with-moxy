(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{103:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return o})),t.d(n,"metadata",(function(){return l})),t.d(n,"rightToc",(function(){return c})),t.d(n,"default",(function(){return s}));var r=t(1),i=t(6),a=(t(0),t(115)),o={id:"available-scripts",title:"Available Scripts",sidebar_label:"Available Scripts"},l={id:"what-is-included/available-scripts",title:"Available Scripts",description:"Here you'll find scripts that we have defined in our `package.json`.",source:"@site/docs/what-is-included/available-scripts.md",permalink:"/docs/what-is-included/available-scripts",sidebar_label:"Available Scripts",sidebar:"docs",previous:{title:"Conventions",permalink:"/docs/welcome/conventions"},next:{title:"ESLint & Stylelint",permalink:"/docs/what-is-included/eslint-stylelint"}},c=[{value:"<code>npm run start</code>",id:"npm-run-start",children:[]},{value:"<code>npm run build</code>",id:"npm-run-build",children:[]},{value:"<code>npm run test</code>",id:"npm-run-test",children:[]},{value:"<code>npm run dev</code>",id:"npm-run-dev",children:[]},{value:"<code>npm run docs</code>",id:"npm-run-docs",children:[]},{value:"<code>npm run release</code>",id:"npm-run-release",children:[]},{value:"<code>npm run lint</code>",id:"npm-run-lint",children:[{value:"<code>npm run lint:eslint</code>",id:"npm-run-linteslint",children:[]},{value:"<code>npm run lint:stylelint</code>",id:"npm-run-lintstylelint",children:[]}]}],p={rightToc:c};function s(e){var n=e.components,t=Object(i.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},p,t,{components:n,mdxType:"MDXLayout"}),Object(a.b)("p",null,"Here you'll find scripts that we have defined in our ",Object(a.b)("inlineCode",{parentName:"p"},"package.json"),"."),Object(a.b)("p",null,"You can run any of these commands using ",Object(a.b)("inlineCode",{parentName:"p"},"npm run {script}")," from the project's folder."),Object(a.b)("h2",{id:"npm-run-start"},Object(a.b)("inlineCode",{parentName:"h2"},"npm run start")),Object(a.b)("p",null,"This script runs your application in a production environment, which will then be available at ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"http://localhost:3000"}),"http://localhost:3000"),".\nIf you need to use another port, please follow the instructions in the dev script above."),Object(a.b)("p",null,"Keep in mind, you must run the build script before running this script!"),Object(a.b)("h2",{id:"npm-run-build"},Object(a.b)("inlineCode",{parentName:"h2"},"npm run build")),Object(a.b)("p",null,"This script will build your application to be production ready, and you'll find the bundle afterwards in the ",Object(a.b)("inlineCode",{parentName:"p"},".next")," folder.\nThis will be an optimized build, with hashed filenames."),Object(a.b)("p",null,"This command also runs a pre-script called ",Object(a.b)("inlineCode",{parentName:"p"},"prebuild")," that will clean assets created with the build script, namely the ",Object(a.b)("inlineCode",{parentName:"p"},".next")," folder."),Object(a.b)("h2",{id:"npm-run-test"},Object(a.b)("inlineCode",{parentName:"h2"},"npm run test")),Object(a.b)("p",null,"This script will run your tests.\nOur configuration shows coverage reports for all tests.\nPlease refer to the ",Object(a.b)("inlineCode",{parentName:"p"},"jest.config.js")," file for more configuration details."),Object(a.b)("h2",{id:"npm-run-dev"},Object(a.b)("inlineCode",{parentName:"h2"},"npm run dev")),Object(a.b)("p",null,"This script runs your application in a development environment.\nYou application will then be available at ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"http://localhost:3000"}),"http://localhost:3000"),".\nHowever, if you need to use a different port, you can set the PORT environment variable with the command line, using the following script and changing ",Object(a.b)("inlineCode",{parentName:"p"},"{PORT_NUMBER}")," with the port you wish to use:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-bash"}),"npm run dev -- --port={PORT_NUMBER}\n")),Object(a.b)("p",null,"When running in a development environment, Next.js will only build pages as they're requested to reduce the impact of this process on your computer's performance.\nIn this environment, it's normal that when changing to another page the styles are not yet applied.\nYou have to refresh the page, because Next.js might have been unable to compile the new page applying Hot Module Replacement styles.\nThis will not happen in a production environment, because all pages will have already been built before the start of the application."),Object(a.b)("h2",{id:"npm-run-docs"},Object(a.b)("inlineCode",{parentName:"h2"},"npm run docs")),Object(a.b)("p",null,"This script prepares the documentation for reading.\nThis script will automatically open the documentation in your default browser."),Object(a.b)("p",null,"Keep in mind, you must have your documentation's dependencies installed before running this script!\nTo to so, please run ",Object(a.b)("inlineCode",{parentName:"p"},"npm install --prefix docusaurus")," first."),Object(a.b)("h2",{id:"npm-run-release"},Object(a.b)("inlineCode",{parentName:"h2"},"npm run release")),Object(a.b)("p",null,"This script updates your CHANGELOG.md file, following ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://semver.org/"}),"Semantic Versioning")," and ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"conventionalcommits.org"}),"Conventional Commits")," conventions and generates a new git tag (to read more about this process, you can read through the standard-version documentation.)"),Object(a.b)("p",null,"This command also runs a post-script called ",Object(a.b)("inlineCode",{parentName:"p"},"postrelease")," that will push your release (git tag) to your master branch."),Object(a.b)("h2",{id:"npm-run-lint"},Object(a.b)("inlineCode",{parentName:"h2"},"npm run lint")),Object(a.b)("p",null,"This script lints your javascript and CSS files."),Object(a.b)("h3",{id:"npm-run-linteslint"},Object(a.b)("inlineCode",{parentName:"h3"},"npm run lint:eslint")),Object(a.b)("p",null,"This script lints only your Javascript files."),Object(a.b)("h3",{id:"npm-run-lintstylelint"},Object(a.b)("inlineCode",{parentName:"h3"},"npm run lint:stylelint")),Object(a.b)("p",null,"This script lints only your CSS files."))}s.isMDXComponent=!0},115:function(e,n,t){"use strict";t.d(n,"a",(function(){return u})),t.d(n,"b",(function(){return m}));var r=t(0),i=t.n(r);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var p=i.a.createContext({}),s=function(e){var n=i.a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):l({},n,{},e)),t},u=function(e){var n=s(e.components);return i.a.createElement(p.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return i.a.createElement(i.a.Fragment,{},n)}},b=Object(r.forwardRef)((function(e,n){var t=e.components,r=e.mdxType,a=e.originalType,o=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),u=s(t),b=r,m=u["".concat(o,".").concat(b)]||u[b]||d[b]||a;return t?i.a.createElement(m,l({ref:n},p,{components:t})):i.a.createElement(m,l({ref:n},p))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var a=t.length,o=new Array(a);o[0]=b;var l={};for(var c in n)hasOwnProperty.call(n,c)&&(l[c]=n[c]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var p=2;p<a;p++)o[p]=t[p];return i.a.createElement.apply(null,o)}return i.a.createElement.apply(null,t)}b.displayName="MDXCreateElement"}}]);