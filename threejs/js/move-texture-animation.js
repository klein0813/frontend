/*! For license information please see move-texture-animation.js.LICENSE.txt */
(()=>{let e,t,n,i,o,a;const r=[];let s,d,w=0;const c=[{img:"/threejs/textures/spriteshg_1.png",col:3,total:15},{img:"/threejs/textures/spriteshg_2.png",col:3,total:15},{img:"/threejs/textures/spriteshg_3.png",col:1,total:1}];let l=0,p=0;e=new THREE.WebGLRenderer({alpha:!0,antialias:!0}),e.setSize(window.innerWidth,window.innerHeight),e.setPixelRatio(window.devicePixelRatio),document.body.appendChild(e.domElement),a=new THREE.Clock,n=new THREE.Scene,t=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.1,1e3),t.position.z=5,function(){new dat.GUI,o=new THREE.OrbitControls(t,e.domElement),o.minDistance=1,o.maxDistance=200;const a=new THREE.AxisHelper(250);n.add(a),i=new Stats,document.body.appendChild(i.dom)}(),function(){new THREE.CylinderBufferGeometry(1,1,1*Math.PI,16,4,!0,-Math.PI/2,Math.PI).name="hg";const e=new THREE.MeshBasicMaterial;e.transparent=!0,e.opacity=0;const t=new THREE.Group;for(let n=0,{length:i}=c;n<i;n++){const o=new THREE.CylinderBufferGeometry(1,1,1*Math.PI,16,4,!0,-Math.PI/2,Math.PI),a=e.clone(),{img:w,col:l,total:p}=c[n],h=(new THREE.TextureLoader).load(w);h.wrapS=h.wrapT=THREE.RepeatWrapping;const E=Math.ceil(p/l);c[n].row=E,h.repeat.set(1/l,n<i?1/E:1),h.offset.set(0,n<i?(E-1)/E:1),a.map=h,0===n&&(a.opacity=1,s=0,d=E-1);const m=new THREE.Mesh(o,a);m.name=`ms_${n}`,m.renderOrder=n,r.push(a),t.add(m)}n.add(t)}(),function h(){i.update(),o.update(),requestAnimationFrame(h),function(){l+=1e3*a.getDelta();const e=Math.floor(.025*l);if(e<=p)return;p=e;const{col:t,row:n,total:i}=c[w];r[w].map.offset.x=s++/t,r[w].map.offset.y=d/n,(n-d-1)*t+s===i?(r[w].opacity=0,w=w===r.length-1?0:w+1,s=0,d=c[w].row-1,r[w].opacity=1):s===t&&(s=0,d--)}(),e.render(n,t)}(),window.onresize=function(){t.aspect=window.innerWidth/window.innerHeight,t.updateProjectionMatrix(),e.setSize(window.innerWidth,window.innerHeight)}})();