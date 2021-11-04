!function(){const e={type:"change"},t={type:"start"},n={type:"end"};class o extends THREE.EventDispatcher{constructor(o,a){super(),void 0===a&&console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.'),a===document&&console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'),this.object=o,this.domElement=a,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new THREE.Vector3,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:THREE.MOUSE.ROTATE,MIDDLE:THREE.MOUSE.DOLLY,RIGHT:THREE.MOUSE.PAN},this.touches={ONE:THREE.TOUCH.ROTATE,TWO:THREE.TOUCH.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return l.phi},this.getAzimuthalAngle=function(){return l.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(e){e.addEventListener("keydown",K),this._domElementKeyEvents=e},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(e),i.update(),c=r.NONE},this.update=function(){const t=new THREE.Vector3,n=(new THREE.Quaternion).setFromUnitVectors(o.up,new THREE.Vector3(0,1,0)),a=n.clone().invert(),h=new THREE.Vector3,d=new THREE.Quaternion,b=2*Math.PI;return function(){const o=i.object.position;t.copy(o).sub(i.target),t.applyQuaternion(n),l.setFromVector3(t),i.autoRotate&&c===r.NONE&&v(2*Math.PI/60/60*i.autoRotateSpeed),i.enableDamping?(l.theta+=m.theta*i.dampingFactor,l.phi+=m.phi*i.dampingFactor):(l.theta+=m.theta,l.phi+=m.phi);let T=i.minAzimuthAngle,f=i.maxAzimuthAngle;return isFinite(T)&&isFinite(f)&&(T<-Math.PI?T+=b:T>Math.PI&&(T-=b),f<-Math.PI?f+=b:f>Math.PI&&(f-=b),l.theta=T<=f?Math.max(T,Math.min(f,l.theta)):l.theta>(T+f)/2?Math.max(T,l.theta):Math.min(f,l.theta)),l.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,l.phi)),l.makeSafe(),l.radius*=p,l.radius=Math.max(i.minDistance,Math.min(i.maxDistance,l.radius)),!0===i.enableDamping?i.target.addScaledVector(E,i.dampingFactor):i.target.add(E),t.setFromSpherical(l),t.applyQuaternion(a),o.copy(i.target).add(t),i.object.lookAt(i.target),!0===i.enableDamping?(m.theta*=1-i.dampingFactor,m.phi*=1-i.dampingFactor,E.multiplyScalar(1-i.dampingFactor)):(m.set(0,0,0),E.set(0,0,0)),p=1,!!(u||h.distanceToSquared(i.object.position)>s||8*(1-d.dot(i.object.quaternion))>s)&&(i.dispatchEvent(e),h.copy(i.object.position),d.copy(i.object.quaternion),u=!1,!0)}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",B),i.domElement.removeEventListener("pointerdown",_),i.domElement.removeEventListener("pointercancel",X),i.domElement.removeEventListener("wheel",Z),i.domElement.removeEventListener("pointermove",z),i.domElement.removeEventListener("pointerup",F),null!==i._domElementKeyEvents&&i._domElementKeyEvents.removeEventListener("keydown",K)};const i=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let c=r.NONE;const s=1e-6,l=new THREE.Spherical,m=new THREE.Spherical;let p=1;const E=new THREE.Vector3;let u=!1;const h=new THREE.Vector2,d=new THREE.Vector2,b=new THREE.Vector2,T=new THREE.Vector2,f=new THREE.Vector2,O=new THREE.Vector2,g=new THREE.Vector2,R=new THREE.Vector2,H=new THREE.Vector2,y=[],P={};function A(){return Math.pow(.95,i.zoomSpeed)}function v(e){m.theta-=e}function L(e){m.phi-=e}const N=function(){const e=new THREE.Vector3;return function(t,n){e.setFromMatrixColumn(n,0),e.multiplyScalar(-t),E.add(e)}}(),w=function(){const e=new THREE.Vector3;return function(t,n){!0===i.screenSpacePanning?e.setFromMatrixColumn(n,1):(e.setFromMatrixColumn(n,0),e.crossVectors(i.object.up,e)),e.multiplyScalar(t),E.add(e)}}(),M=function(){const e=new THREE.Vector3;return function(t,n){const o=i.domElement;if(i.object.isPerspectiveCamera){const a=i.object.position;e.copy(a).sub(i.target);let r=e.length();r*=Math.tan(i.object.fov/2*Math.PI/180),N(2*t*r/o.clientHeight,i.object.matrix),w(2*n*r/o.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(N(t*(i.object.right-i.object.left)/i.object.zoom/o.clientWidth,i.object.matrix),w(n*(i.object.top-i.object.bottom)/i.object.zoom/o.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function j(e){i.object.isPerspectiveCamera?p/=e:i.object.isOrthographicCamera?(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom*e)),i.object.updateProjectionMatrix(),u=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function S(e){i.object.isPerspectiveCamera?p*=e:i.object.isOrthographicCamera?(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/e)),i.object.updateProjectionMatrix(),u=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function k(e){h.set(e.clientX,e.clientY)}function C(e){T.set(e.clientX,e.clientY)}function Y(){if(1===y.length)h.set(y[0].pageX,y[0].pageY);else{const e=.5*(y[0].pageX+y[1].pageX),t=.5*(y[0].pageY+y[1].pageY);h.set(e,t)}}function x(){if(1===y.length)T.set(y[0].pageX,y[0].pageY);else{const e=.5*(y[0].pageX+y[1].pageX),t=.5*(y[0].pageY+y[1].pageY);T.set(e,t)}}function D(){const e=y[0].pageX-y[1].pageX,t=y[0].pageY-y[1].pageY,n=Math.sqrt(e*e+t*t);g.set(0,n)}function I(e){if(1==y.length)d.set(e.pageX,e.pageY);else{const t=q(e),n=.5*(e.pageX+t.x),o=.5*(e.pageY+t.y);d.set(n,o)}b.subVectors(d,h).multiplyScalar(i.rotateSpeed);const t=i.domElement;v(2*Math.PI*b.x/t.clientHeight),L(2*Math.PI*b.y/t.clientHeight),h.copy(d)}function U(e){if(1===y.length)f.set(e.pageX,e.pageY);else{const t=q(e),n=.5*(e.pageX+t.x),o=.5*(e.pageY+t.y);f.set(n,o)}O.subVectors(f,T).multiplyScalar(i.panSpeed),M(O.x,O.y),T.copy(f)}function V(e){const t=q(e),n=e.pageX-t.x,o=e.pageY-t.y,a=Math.sqrt(n*n+o*o);R.set(0,a),H.set(0,Math.pow(R.y/g.y,i.zoomSpeed)),j(H.y),g.copy(R)}function _(e){!1!==i.enabled&&(0===y.length&&(i.domElement.setPointerCapture(e.pointerId),i.domElement.addEventListener("pointermove",z),i.domElement.addEventListener("pointerup",F)),function(e){y.push(e)}(e),"touch"===e.pointerType?function(e){switch(W(e),y.length){case 1:switch(i.touches.ONE){case THREE.TOUCH.ROTATE:if(!1===i.enableRotate)return;Y(),c=r.TOUCH_ROTATE;break;case THREE.TOUCH.PAN:if(!1===i.enablePan)return;x(),c=r.TOUCH_PAN;break;default:c=r.NONE}break;case 2:switch(i.touches.TWO){case THREE.TOUCH.DOLLY_PAN:if(!1===i.enableZoom&&!1===i.enablePan)return;i.enableZoom&&D(),i.enablePan&&x(),c=r.TOUCH_DOLLY_PAN;break;case THREE.TOUCH.DOLLY_ROTATE:if(!1===i.enableZoom&&!1===i.enableRotate)return;i.enableZoom&&D(),i.enableRotate&&Y(),c=r.TOUCH_DOLLY_ROTATE;break;default:c=r.NONE}break;default:c=r.NONE}c!==r.NONE&&i.dispatchEvent(t)}(e):function(e){let n;switch(e.button){case 0:n=i.mouseButtons.LEFT;break;case 1:n=i.mouseButtons.MIDDLE;break;case 2:n=i.mouseButtons.RIGHT;break;default:n=-1}switch(n){case THREE.MOUSE.DOLLY:if(!1===i.enableZoom)return;!function(e){g.set(e.clientX,e.clientY)}(e),c=r.DOLLY;break;case THREE.MOUSE.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===i.enablePan)return;C(e),c=r.PAN}else{if(!1===i.enableRotate)return;k(e),c=r.ROTATE}break;case THREE.MOUSE.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===i.enableRotate)return;k(e),c=r.ROTATE}else{if(!1===i.enablePan)return;C(e),c=r.PAN}break;default:c=r.NONE}c!==r.NONE&&i.dispatchEvent(t)}(e))}function z(e){!1!==i.enabled&&("touch"===e.pointerType?function(e){switch(W(e),c){case r.TOUCH_ROTATE:if(!1===i.enableRotate)return;I(e),i.update();break;case r.TOUCH_PAN:if(!1===i.enablePan)return;U(e),i.update();break;case r.TOUCH_DOLLY_PAN:if(!1===i.enableZoom&&!1===i.enablePan)return;!function(e){i.enableZoom&&V(e),i.enablePan&&U(e)}(e),i.update();break;case r.TOUCH_DOLLY_ROTATE:if(!1===i.enableZoom&&!1===i.enableRotate)return;!function(e){i.enableZoom&&V(e),i.enableRotate&&I(e)}(e),i.update();break;default:c=r.NONE}}(e):function(e){if(!1!==i.enabled)switch(c){case r.ROTATE:if(!1===i.enableRotate)return;!function(e){d.set(e.clientX,e.clientY),b.subVectors(d,h).multiplyScalar(i.rotateSpeed);const t=i.domElement;v(2*Math.PI*b.x/t.clientHeight),L(2*Math.PI*b.y/t.clientHeight),h.copy(d),i.update()}(e);break;case r.DOLLY:if(!1===i.enableZoom)return;!function(e){R.set(e.clientX,e.clientY),H.subVectors(R,g),H.y>0?j(A()):H.y<0&&S(A()),g.copy(R),i.update()}(e);break;case r.PAN:if(!1===i.enablePan)return;!function(e){f.set(e.clientX,e.clientY),O.subVectors(f,T).multiplyScalar(i.panSpeed),M(O.x,O.y),T.copy(f),i.update()}(e)}}(e))}function F(e){!1!==i.enabled&&(e.pointerType,i.dispatchEvent(n),c=r.NONE,G(e),0===y.length&&(i.domElement.releasePointerCapture(e.pointerId),i.domElement.removeEventListener("pointermove",z),i.domElement.removeEventListener("pointerup",F)))}function X(e){G(e)}function Z(e){!1===i.enabled||!1===i.enableZoom||c!==r.NONE&&c!==r.ROTATE||(e.preventDefault(),i.dispatchEvent(t),function(e){e.deltaY<0?S(A()):e.deltaY>0&&j(A()),i.update()}(e),i.dispatchEvent(n))}function K(e){!1!==i.enabled&&!1!==i.enablePan&&function(e){let t=!1;switch(e.code){case i.keys.UP:M(0,i.keyPanSpeed),t=!0;break;case i.keys.BOTTOM:M(0,-i.keyPanSpeed),t=!0;break;case i.keys.LEFT:M(i.keyPanSpeed,0),t=!0;break;case i.keys.RIGHT:M(-i.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),i.update())}(e)}function B(e){!1!==i.enabled&&e.preventDefault()}function G(e){delete P[e.pointerId];for(let t=0;t<y.length;t++)if(y[t].pointerId==e.pointerId)return void y.splice(t,1)}function W(e){let t=P[e.pointerId];void 0===t&&(t=new THREE.Vector2,P[e.pointerId]=t),t.set(e.pageX,e.pageY)}function q(e){const t=e.pointerId===y[0].pointerId?y[1]:y[0];return P[t.pointerId]}i.domElement.addEventListener("contextmenu",B),i.domElement.addEventListener("pointerdown",_),i.domElement.addEventListener("pointercancel",X),i.domElement.addEventListener("wheel",Z,{passive:!1}),this.update()}}THREE.MapControls=class extends o{constructor(e,t){super(e,t),this.screenSpacePanning=!1,this.mouseButtons.LEFT=THREE.MOUSE.PAN,this.mouseButtons.RIGHT=THREE.MOUSE.ROTATE,this.touches.ONE=THREE.TOUCH.PAN,this.touches.TWO=THREE.TOUCH.DOLLY_ROTATE}},THREE.OrbitControls=o}();