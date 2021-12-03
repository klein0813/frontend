(()=>{"use strict";var e={"./threejs/js/utils.js":
/*!*****************************!*\
  !*** ./threejs/js/utils.js ***!
  \*****************************/(e,n,t)=>{function i(){const e=new THREE.WebGLRenderer({alpha:!0,antialias:!0});e.setSize(window.innerWidth,window.innerHeight),e.setPixelRatio(window.devicePixelRatio),document.body.appendChild(e.domElement);const n=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,.1,1e3);n.position.set(0,0,36);return{renderer:e,camera:n,scene:new THREE.Scene}}function r(e,n,t,i,r){new e.GUI;const o=new THREE.OrbitControls(n,t.domElement);o.enableDamping=!0,o.enableZoom=!0,o.autoRotate=!1,o.autoRotateSpeed=.5,o.minDistance=1,o.maxDistance=2e3,o.enablePan=!0;const a=new i;return document.body.appendChild(a.dom),{stats:a,controls:o}}function o(e,n){return()=>{e.aspect=window.innerWidth/window.innerHeight,e.updateProjectionMatrix(),n.setSize(window.innerWidth,window.innerHeight)}}t.r(n),t.d(n,{initScene:()=>i,initHelper:()=>r,onWindowResize:()=>o})}},n={};function t(i){var r=n[i];if(void 0!==r)return r.exports;var o=n[i]={exports:{}};return e[i](o,o.exports,t),o.exports}t.d=(e,n)=>{for(var i in n)t.o(n,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:n[i]})},t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var i={};(()=>{
/*!************************************!*\
  !*** ./threejs/js/export-model.js ***!
  \************************************/
t.r(i);var e=t(/*! ./utils.js */"./threejs/js/utils.js");let n,r;const o=new THREE.Clock,{renderer:a,camera:d,scene:s}=(0,e.initScene)(),{stats:c,controls:l}=(0,e.initHelper)(dat,d,a,Stats);function p(){c.update(),l.update(),a.render(s,d),requestAnimationFrame(p),n.update(o.getDelta())}function w(e,n){!function(e,n){var t=document.createElement("a");t.style.display="none",t.href=URL.createObjectURL(e),t.download=n||"data.json",t.click()}(new Blob([e],{type:"text/plain"}),n)}function u(e,n={}){(new THREE.GLTFExporter).parse(e,(e=>{const t=n.binary?".glb":".gltf";w(n.binary?e:JSON.stringify(e),`model${t}`)}),n)}window.onresize=(0,e.onWindowResize)(d,a),function(){const e=new THREE.CylinderBufferGeometry(4,4,4*Math.PI,16,4,!0,-Math.PI/2,Math.PI),t=(new THREE.TextureLoader).load("/frontend/threejs/textures/spriteshg_3.png");t.wrapS=t.wrapT=THREE.RepeatWrapping,t.minFilter=THREE.LinearFilter;const i=new THREE.MeshBasicMaterial({map:t}),o=new THREE.Group,a=new THREE.Mesh(e,i);a.name="Cylinder",o.add(a);const d=new THREE.KeyframeTrack("Cylinder.position",[0,80],[0,0,0,10,0,0]);r=new THREE.AnimationClip("default",100,[d]),n=new THREE.AnimationMixer(o);const c=n.clipAction(r);c.timeScale=20,c.play(),s.add(o)}(),p(),document.getElementById("gltf-btn").addEventListener("click",(()=>{u(s,{animations:[r]})})),document.getElementById("glb-btn").addEventListener("click",(()=>{u(s,{binary:!0})}))})()})();