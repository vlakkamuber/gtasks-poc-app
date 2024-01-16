<<<<<<< HEAD:dcag-ui/dist/assets/swipe-back-1464959d.js
<<<<<<<< HEAD:dcag-ui/dist/assets/swipe-back-32444897.js
<<<<<<<< HEAD:dcag-ui/dist/assets/swipe-back-32444897.js
import{i as h,c as D,a as M}from"./index-137485d4.js";/*!
========
import{i as h,c as D,a as M}from"./index-dff6ec07.js";/*!
>>>>>>>> 5e76f97 (hardcoded userid removed):dcag-ui/dist/assets/swipe-back-8c9518d4.js
========
import{i as h,c as D,a as M}from"./index-8fb3159b.js";/*!
>>>>>>>> 95fc997 (code cleanup removed indexdb integration localstorage tasks data file):dcag-ui/dist/assets/swipe-back-1464959d.js
=======
import{i as h,c as D,a as M}from"./index-a3090391.js";/*!
>>>>>>> 23d795e (otp incorrect validation added):dcag-ui/dist/assets/swipe-back-c6098e35.js
 * (C) Ionic http://ionicframework.com - MIT License
 */const k=(n,m,g,p,X)=>{const c=n.ownerDocument.defaultView;let s=h(n);const w=t=>{const{startX:e}=t;return s?e>=c.innerWidth-50:e<=50},a=t=>s?-t.deltaX:t.deltaX,v=t=>s?-t.velocityX:t.velocityX;return D({el:n,gestureName:"goback-swipe",gesturePriority:101,threshold:10,canStart:t=>(s=h(n),w(t)&&m()),onStart:g,onMove:t=>{const e=a(t)/c.innerWidth;p(e)},onEnd:t=>{const o=a(t),e=c.innerWidth,r=o/e,i=v(t),y=e/2,l=i>=0&&(i>.2||o>y),u=(l?1-r:r)*e;let d=0;if(u>5){const f=u/Math.abs(i);d=Math.min(f,540)}X(l,r<=0?.01:M(0,r,.9999),d)}})};export{k as createSwipeBackGesture};
