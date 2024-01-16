<<<<<<<< HEAD:dcag-ui/dist/assets/md.transition-legacy-f869249a.js
<<<<<<<< HEAD:dcag-ui/dist/assets/md.transition-legacy-f869249a.js
System.register(["./index-legacy-8ba8c1c4.js"],(function(n,e){"use strict";var t,i;return{setters:[function(n){t=n.g,i=n.b}],execute:function(){
========
System.register(["./index-legacy-25d0aeaf.js"],(function(n,e){"use strict";var t,i;return{setters:[function(n){t=n.g,i=n.b}],execute:function(){
>>>>>>>> 5e76f97 (hardcoded userid removed):dcag-ui/dist/assets/md.transition-legacy-995eaab7.js
========
System.register(["./index-legacy-88eae53f.js"],(function(n,e){"use strict";var t,i;return{setters:[function(n){t=n.g,i=n.b}],execute:function(){
>>>>>>>> e206636 (format date time function added):dcag-ui/dist/assets/md.transition-legacy-a39adc89.js
/*!
       * (C) Ionic http://ionicframework.com - MIT License
       */
n("mdTransitionAnimation",(function(n,e){var o,a,r,l="40px",c="back"===e.direction,s=e.enteringEl,d=e.leavingEl,u=t(s),m=u.querySelector("ion-toolbar"),f=i();if(f.addElement(u).fill("both").beforeRemoveClass("ion-page-invisible"),c?f.duration((null!==(o=e.duration)&&void 0!==o?o:0)||200).easing("cubic-bezier(0.47,0,0.745,0.715)"):f.duration((null!==(a=e.duration)&&void 0!==a?a:0)||280).easing("cubic-bezier(0.36,0.66,0.04,1)").fromTo("transform","translateY(".concat(l,")"),"translateY(".concat("0px",")")).fromTo("opacity",.01,1),m){var b=i();b.addElement(m),f.addAnimation(b)}if(d&&c){f.duration((null!==(r=e.duration)&&void 0!==r?r:0)||200).easing("cubic-bezier(0.47,0,0.745,0.715)");var g=i();g.addElement(t(d)).onFinish((function(n){1===n&&g.elements.length>0&&g.elements[0].style.setProperty("display","none")})).fromTo("transform","translateY(".concat("0px",")"),"translateY(".concat(l,")")).fromTo("opacity",1,0),f.addAnimation(g)}return f}))}}}));
