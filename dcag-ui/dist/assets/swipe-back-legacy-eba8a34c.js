<<<<<<<< HEAD:dcag-ui/dist/assets/swipe-back-legacy-286803e5.js
<<<<<<<< HEAD:dcag-ui/dist/assets/swipe-back-legacy-286803e5.js
System.register(["./index-legacy-8ba8c1c4.js"],(function(t,e){"use strict";var n,r,i;return{setters:[function(t){n=t.i,r=t.c,i=t.a}],execute:function(){
========
System.register(["./index-legacy-25d0aeaf.js"],(function(t,e){"use strict";var n,r,i;return{setters:[function(t){n=t.i,r=t.c,i=t.a}],execute:function(){
>>>>>>>> 5e76f97 (hardcoded userid removed):dcag-ui/dist/assets/swipe-back-legacy-343ece4a.js
========
System.register(["./index-legacy-8597b37a.js"],(function(t,e){"use strict";var n,r,i;return{setters:[function(t){n=t.i,r=t.c,i=t.a}],execute:function(){
>>>>>>>> 95fc997 (code cleanup removed indexdb integration localstorage tasks data file):dcag-ui/dist/assets/swipe-back-legacy-eba8a34c.js
/*!
       * (C) Ionic http://ionicframework.com - MIT License
       */
t("createSwipeBackGesture",(function(t,e,u,a,c){var o=t.ownerDocument.defaultView,s=n(t),f=function(t){return s?-t.deltaX:t.deltaX};return r({el:t,gestureName:"goback-swipe",gesturePriority:101,threshold:10,canStart:function(r){return s=n(t),function(t){var e=t.startX;return s?e>=o.innerWidth-50:e<=50}(r)&&e()},onStart:u,onMove:function(t){var e=f(t)/o.innerWidth;a(e)},onEnd:function(t){var e=f(t),n=o.innerWidth,r=e/n,u=function(t){return s?-t.velocityX:t.velocityX}(t),a=u>=0&&(u>.2||e>n/2),d=(a?1-r:r)*n,v=0;if(d>5){var l=d/Math.abs(u);v=Math.min(l,540)}c(a,r<=0?.01:i(0,r,.9999),v)}})}))}}}));
