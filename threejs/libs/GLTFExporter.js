!function(){class e{constructor(){this.pluginCallbacks=[],this.register((function(e){return new L(e)})),this.register((function(e){return new S(e)})),this.register((function(e){return new F(e)})),this.register((function(e){return new N(e)})),this.register((function(e){return new H(e)}))}register(e){return-1===this.pluginCallbacks.indexOf(e)&&this.pluginCallbacks.push(e),this}unregister(e){return-1!==this.pluginCallbacks.indexOf(e)&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,s){const n=new v,r=[];for(let e=0,t=this.pluginCallbacks.length;e<t;e++)r.push(this.pluginCallbacks[e](n));n.setPlugins(r),n.write(e,t,s)}}const t=0,s=1,n=2,r=3,i=4,a=5121,o=5123,l=5126,c=5125,u=34962,h=34963,p=9728,m=9729,f=9984,g=9985,d=9986,T=9987,b=33071,y=33648,x=10497,E={};E[THREE.NearestFilter]=p,E[THREE.NearestMipmapNearestFilter]=f,E[THREE.NearestMipmapLinearFilter]=d,E[THREE.LinearFilter]=m,E[THREE.LinearMipmapNearestFilter]=g,E[THREE.LinearMipmapLinearFilter]=T,E[THREE.ClampToEdgeWrapping]=b,E[THREE.RepeatWrapping]=x,E[THREE.MirroredRepeatWrapping]=y;const w={scale:"scale",position:"translation",quaternion:"rotation",morphTargetInfluences:"weights"};function M(e,t){return e.length===t.length&&e.every((function(e,s){return e===t[s]}))}function R(e){return 4*Math.ceil(e/4)}function A(e,t=0){const s=R(e.byteLength);if(s!==e.byteLength){const n=new Uint8Array(s);if(n.set(new Uint8Array(e)),0!==t)for(let r=e.byteLength;r<s;r++)n[r]=t;return n.buffer}return e}let I=null;class v{constructor(){this.plugins=[],this.options={},this.pending=[],this.buffers=[],this.byteOffset=0,this.buffers=[],this.nodeMap=new Map,this.skins=[],this.extensionsUsed={},this.uids=new Map,this.uid=0,this.json={asset:{version:"2.0",generator:"THREE.GLTFExporter"}},this.cache={meshes:new Map,attributes:new Map,attributesNormalized:new Map,materials:new Map,textures:new Map,images:new Map}}setPlugins(e){this.plugins=e}write(e,t,s){this.options=Object.assign({},{binary:!1,trs:!1,onlyVisible:!0,truncateDrawRange:!0,embedImages:!0,maxTextureSize:1/0,animations:[],includeCustomExtensions:!1},s),this.options.animations.length>0&&(this.options.trs=!0),this.processInput(e);const n=this;Promise.all(this.pending).then((function(){const e=n.buffers,s=n.json,r=n.options,i=n.extensionsUsed,a=new Blob(e,{type:"application/octet-stream"}),o=Object.keys(i);if(o.length>0&&(s.extensionsUsed=o),s.buffers&&s.buffers.length>0&&(s.buffers[0].byteLength=a.size),!0===r.binary){const e=new window.FileReader;e.readAsArrayBuffer(a),e.onloadend=function(){const n=A(e.result),r=new DataView(new ArrayBuffer(8));r.setUint32(0,n.byteLength,!0),r.setUint32(4,5130562,!0);const i=A(function(e){if(void 0!==window.TextEncoder)return(new TextEncoder).encode(e).buffer;const t=new Uint8Array(new ArrayBuffer(e.length));for(let s=0,n=e.length;s<n;s++){const n=e.charCodeAt(s);t[s]=n>255?32:n}return t.buffer}(JSON.stringify(s)),32),a=new DataView(new ArrayBuffer(8));a.setUint32(0,i.byteLength,!0),a.setUint32(4,1313821514,!0);const o=new ArrayBuffer(12),l=new DataView(o);l.setUint32(0,1179937895,!0),l.setUint32(4,2,!0);const c=12+a.byteLength+i.byteLength+r.byteLength+n.byteLength;l.setUint32(8,c,!0);const u=new Blob([o,a,i,r,n],{type:"application/octet-stream"}),h=new window.FileReader;h.readAsArrayBuffer(u),h.onloadend=function(){t(h.result)}}}else if(s.buffers&&s.buffers.length>0){const e=new window.FileReader;e.readAsDataURL(a),e.onloadend=function(){const n=e.result;s.buffers[0].uri=n,t(s)}}else t(s)}))}serializeUserData(e,t){if(0===Object.keys(e.userData).length)return;const s=this.options,n=this.extensionsUsed;try{const r=JSON.parse(JSON.stringify(e.userData));if(s.includeCustomExtensions&&r.gltfExtensions){void 0===t.extensions&&(t.extensions={});for(const e in r.gltfExtensions)t.extensions[e]=r.gltfExtensions[e],n[e]=!0;delete r.gltfExtensions}Object.keys(r).length>0&&(t.extras=r)}catch(t){console.warn("THREE.GLTFExporter: userData of '"+e.name+"' won't be serialized because of JSON.stringify error - "+t.message)}}getUID(e){return this.uids.has(e)||this.uids.set(e,this.uid++),this.uids.get(e)}isNormalizedNormalAttribute(e){if(this.cache.attributesNormalized.has(e))return!1;const t=new THREE.Vector3;for(let s=0,n=e.count;s<n;s++)if(Math.abs(t.fromBufferAttribute(e,s).length()-1)>5e-4)return!1;return!0}createNormalizedNormalAttribute(e){const t=this.cache;if(t.attributesNormalized.has(e))return t.attributesNormalized.get(e);const s=e.clone(),n=new THREE.Vector3;for(let e=0,t=s.count;e<t;e++)n.fromBufferAttribute(s,e),0===n.x&&0===n.y&&0===n.z?n.setX(1):n.normalize(),s.setXYZ(e,n.x,n.y,n.z);return t.attributesNormalized.set(e,s),s}applyTextureTransform(e,t){let s=!1;const n={};0===t.offset.x&&0===t.offset.y||(n.offset=t.offset.toArray(),s=!0),0!==t.rotation&&(n.rotation=t.rotation,s=!0),1===t.repeat.x&&1===t.repeat.y||(n.scale=t.repeat.toArray(),s=!0),s&&(e.extensions=e.extensions||{},e.extensions.KHR_texture_transform=n,this.extensionsUsed.KHR_texture_transform=!0)}processBuffer(e){const t=this.json,s=this.buffers;return t.buffers||(t.buffers=[{byteLength:0}]),s.push(e),0}processBufferView(e,t,s,n,r){const i=this.json;let h;i.bufferViews||(i.bufferViews=[]),h=t===a?1:t===o?2:4;const p=R(n*e.itemSize*h),m=new DataView(new ArrayBuffer(p));let f=0;for(let r=s;r<s+n;r++)for(let s=0;s<e.itemSize;s++){let n;e.itemSize>4?n=e.array[r*e.itemSize+s]:0===s?n=e.getX(r):1===s?n=e.getY(r):2===s?n=e.getZ(r):3===s&&(n=e.getW(r)),t===l?m.setFloat32(f,n,!0):t===c?m.setUint32(f,n,!0):t===o?m.setUint16(f,n,!0):t===a&&m.setUint8(f,n),f+=h}const g={buffer:this.processBuffer(m.buffer),byteOffset:this.byteOffset,byteLength:p};void 0!==r&&(g.target=r),r===u&&(g.byteStride=e.itemSize*h),this.byteOffset+=p,i.bufferViews.push(g);return{id:i.bufferViews.length-1,byteLength:0}}processBufferViewImage(e){const t=this,s=t.json;return s.bufferViews||(s.bufferViews=[]),new Promise((function(n){const r=new window.FileReader;r.readAsArrayBuffer(e),r.onloadend=function(){const e=A(r.result),i={buffer:t.processBuffer(e),byteOffset:t.byteOffset,byteLength:e.byteLength};t.byteOffset+=e.byteLength,n(s.bufferViews.push(i)-1)}}))}processAccessor(e,t,s,n){const r=this.options,i=this.json;let p;if(e.array.constructor===Float32Array)p=l;else if(e.array.constructor===Uint32Array)p=c;else if(e.array.constructor===Uint16Array)p=o;else{if(e.array.constructor!==Uint8Array)throw new Error("THREE.GLTFExporter: Unsupported bufferAttribute component type.");p=a}if(void 0===s&&(s=0),void 0===n&&(n=e.count),r.truncateDrawRange&&void 0!==t&&null===t.index){const r=s+n,i=t.drawRange.count===1/0?e.count:t.drawRange.start+t.drawRange.count;s=Math.max(s,t.drawRange.start),(n=Math.min(r,i)-s)<0&&(n=0)}if(0===n)return null;const m=function(e,t,s){const n={min:new Array(e.itemSize).fill(Number.POSITIVE_INFINITY),max:new Array(e.itemSize).fill(Number.NEGATIVE_INFINITY)};for(let r=t;r<t+s;r++)for(let t=0;t<e.itemSize;t++){let s;e.itemSize>4?s=e.array[r*e.itemSize+t]:0===t?s=e.getX(r):1===t?s=e.getY(r):2===t?s=e.getZ(r):3===t&&(s=e.getW(r)),n.min[t]=Math.min(n.min[t],s),n.max[t]=Math.max(n.max[t],s)}return n}(e,s,n);let f;void 0!==t&&(f=e===t.index?h:u);const g=this.processBufferView(e,p,s,n,f),d={bufferView:g.id,byteOffset:g.byteOffset,componentType:p,count:n,max:m.max,min:m.min,type:{1:"SCALAR",2:"VEC2",3:"VEC3",4:"VEC4",16:"MAT4"}[e.itemSize]};return!0===e.normalized&&(d.normalized=!0),i.accessors||(i.accessors=[]),i.accessors.push(d)-1}processImage(e,t,s){const n=this,r=n.cache,i=n.json,a=n.options,o=n.pending;r.images.has(e)||r.images.set(e,{});const l=r.images.get(e),c=t===THREE.RGBAFormat?"image/png":"image/jpeg",u=c+":flipY/"+s.toString();if(void 0!==l[u])return l[u];i.images||(i.images=[]);const h={mimeType:c};if(a.embedImages){const r=I=I||document.createElement("canvas");r.width=Math.min(e.width,a.maxTextureSize),r.height=Math.min(e.height,a.maxTextureSize);const i=r.getContext("2d");if(!0===s&&(i.translate(0,r.height),i.scale(1,-1)),"undefined"!=typeof HTMLImageElement&&e instanceof HTMLImageElement||"undefined"!=typeof HTMLCanvasElement&&e instanceof HTMLCanvasElement||"undefined"!=typeof OffscreenCanvas&&e instanceof OffscreenCanvas||"undefined"!=typeof ImageBitmap&&e instanceof ImageBitmap)i.drawImage(e,0,0,r.width,r.height);else{t!==THREE.RGBAFormat&&t!==THREE.RGBFormat&&console.error("GLTFExporter: Only RGB and RGBA formats are supported."),(e.width>a.maxTextureSize||e.height>a.maxTextureSize)&&console.warn("GLTFExporter: Image size is bigger than maxTextureSize",e);const s=new Uint8ClampedArray(e.height*e.width*4);if(t===THREE.RGBAFormat)for(let t=0;t<s.length;t+=4)s[t+0]=e.data[t+0],s[t+1]=e.data[t+1],s[t+2]=e.data[t+2],s[t+3]=e.data[t+3];else for(let t=0,n=0;t<s.length;t+=4,n+=3)s[t+0]=e.data[n+0],s[t+1]=e.data[n+1],s[t+2]=e.data[n+2],s[t+3]=255;i.putImageData(new ImageData(s,e.width,e.height),0,0)}!0===a.binary?o.push(new Promise((function(e){r.toBlob((function(t){n.processBufferViewImage(t).then((function(t){h.bufferView=t,e()}))}),c)}))):h.uri=r.toDataURL(c)}else h.uri=e.src;const p=i.images.push(h)-1;return l[u]=p,p}processSampler(e){const t=this.json;t.samplers||(t.samplers=[]);const s={magFilter:E[e.magFilter],minFilter:E[e.minFilter],wrapS:E[e.wrapS],wrapT:E[e.wrapT]};return t.samplers.push(s)-1}processTexture(e){const t=this.cache,s=this.json;if(t.textures.has(e))return t.textures.get(e);s.textures||(s.textures=[]);const n={sampler:this.processSampler(e),source:this.processImage(e.image,e.format,e.flipY)};e.name&&(n.name=e.name),this._invokeAll((function(t){t.writeTexture&&t.writeTexture(e,n)}));const r=s.textures.push(n)-1;return t.textures.set(e,r),r}processMaterial(e){const t=this.cache,s=this.json;if(t.materials.has(e))return t.materials.get(e);if(e.isShaderMaterial)return console.warn("GLTFExporter: THREE.ShaderMaterial not supported."),null;s.materials||(s.materials=[]);const n={pbrMetallicRoughness:{}};!0!==e.isMeshStandardMaterial&&!0!==e.isMeshBasicMaterial&&console.warn("GLTFExporter: Use MeshStandardMaterial or MeshBasicMaterial for best results.");const r=e.color.toArray().concat([e.opacity]);if(M(r,[1,1,1,1])||(n.pbrMetallicRoughness.baseColorFactor=r),e.isMeshStandardMaterial?(n.pbrMetallicRoughness.metallicFactor=e.metalness,n.pbrMetallicRoughness.roughnessFactor=e.roughness):(n.pbrMetallicRoughness.metallicFactor=.5,n.pbrMetallicRoughness.roughnessFactor=.5),e.metalnessMap||e.roughnessMap)if(e.metalnessMap===e.roughnessMap){const t={index:this.processTexture(e.metalnessMap)};this.applyTextureTransform(t,e.metalnessMap),n.pbrMetallicRoughness.metallicRoughnessTexture=t}else console.warn("THREE.GLTFExporter: Ignoring metalnessMap and roughnessMap because they are not the same Texture.");if(e.map){const t={index:this.processTexture(e.map)};this.applyTextureTransform(t,e.map),n.pbrMetallicRoughness.baseColorTexture=t}if(e.emissive){const t=e.emissive.clone().multiplyScalar(e.emissiveIntensity),s=Math.max(t.r,t.g,t.b);if(s>1&&(t.multiplyScalar(1/s),console.warn("THREE.GLTFExporter: Some emissive components exceed 1; emissive has been limited")),s>0&&(n.emissiveFactor=t.toArray()),e.emissiveMap){const t={index:this.processTexture(e.emissiveMap)};this.applyTextureTransform(t,e.emissiveMap),n.emissiveTexture=t}}if(e.normalMap){const t={index:this.processTexture(e.normalMap)};e.normalScale&&1!==e.normalScale.x&&(t.scale=e.normalScale.x),this.applyTextureTransform(t,e.normalMap),n.normalTexture=t}if(e.aoMap){const t={index:this.processTexture(e.aoMap),texCoord:1};1!==e.aoMapIntensity&&(t.strength=e.aoMapIntensity),this.applyTextureTransform(t,e.aoMap),n.occlusionTexture=t}e.transparent?n.alphaMode="BLEND":e.alphaTest>0&&(n.alphaMode="MASK",n.alphaCutoff=e.alphaTest),e.side===THREE.DoubleSide&&(n.doubleSided=!0),""!==e.name&&(n.name=e.name),this.serializeUserData(e,n),this._invokeAll((function(t){t.writeMaterial&&t.writeMaterial(e,n)}));const i=s.materials.push(n)-1;return t.materials.set(e,i),i}processMesh(e){const a=this.cache,o=this.json,l=[e.geometry.uuid];if(Array.isArray(e.material))for(let t=0,s=e.material.length;t<s;t++)l.push(e.material[t].uuid);else l.push(e.material.uuid);const c=l.join(":");if(a.meshes.has(c))return a.meshes.get(c);const u=e.geometry;let h;if(h=e.isLineSegments?s:e.isLineLoop?n:e.isLine?r:e.isPoints?t:e.material.wireframe?s:i,!0!==u.isBufferGeometry)throw new Error("THREE.GLTFExporter: Geometry is not of type THREE.BufferGeometry.");const p={},m={},f=[],g=[],d={uv:"TEXCOORD_0",uv2:"TEXCOORD_1",color:"COLOR_0",skinWeight:"WEIGHTS_0",skinIndex:"JOINTS_0"},T=u.getAttribute("normal");void 0===T||this.isNormalizedNormalAttribute(T)||(console.warn("THREE.GLTFExporter: Creating normalized normal attribute from the non-normalized one."),u.setAttribute("normal",this.createNormalizedNormalAttribute(T)));let b=null;for(let e in u.attributes){if("morph"===e.substr(0,5))continue;const t=u.attributes[e];e=d[e]||e.toUpperCase();if(/^(POSITION|NORMAL|TANGENT|TEXCOORD_\d+|COLOR_\d+|JOINTS_\d+|WEIGHTS_\d+)$/.test(e)||(e="_"+e),a.attributes.has(this.getUID(t))){m[e]=a.attributes.get(this.getUID(t));continue}b=null;const s=t.array;"JOINTS_0"!==e||s instanceof Uint16Array||s instanceof Uint8Array||(console.warn('GLTFExporter: Attribute "skinIndex" converted to type UNSIGNED_SHORT.'),b=new THREE.BufferAttribute(new Uint16Array(s),t.itemSize,t.normalized));const n=this.processAccessor(b||t,u);null!==n&&(m[e]=n,a.attributes.set(this.getUID(t),n))}if(void 0!==T&&u.setAttribute("normal",T),0===Object.keys(m).length)return null;if(void 0!==e.morphTargetInfluences&&e.morphTargetInfluences.length>0){const t=[],s=[],n={};if(void 0!==e.morphTargetDictionary)for(const t in e.morphTargetDictionary)n[e.morphTargetDictionary[t]]=t;for(let r=0;r<e.morphTargetInfluences.length;++r){const i={};let o=!1;for(const e in u.morphAttributes){if("position"!==e&&"normal"!==e){o||(console.warn("GLTFExporter: Only POSITION and NORMAL morph are supported."),o=!0);continue}const t=u.morphAttributes[e][r],s=e.toUpperCase(),n=u.attributes[e];if(a.attributes.has(this.getUID(t))){i[s]=a.attributes.get(this.getUID(t));continue}const l=t.clone();if(!u.morphTargetsRelative)for(let e=0,s=t.count;e<s;e++)l.setXYZ(e,t.getX(e)-n.getX(e),t.getY(e)-n.getY(e),t.getZ(e)-n.getZ(e));i[s]=this.processAccessor(l,u),a.attributes.set(this.getUID(n),i[s])}g.push(i),t.push(e.morphTargetInfluences[r]),void 0!==e.morphTargetDictionary&&s.push(n[r])}p.weights=t,s.length>0&&(p.extras={},p.extras.targetNames=s)}const y=Array.isArray(e.material);if(y&&0===u.groups.length)return null;const x=y?e.material:[e.material],E=y?u.groups:[{materialIndex:0,start:void 0,count:void 0}];for(let e=0,t=E.length;e<t;e++){const t={mode:h,attributes:m};if(this.serializeUserData(u,t),g.length>0&&(t.targets=g),null!==u.index){let s=this.getUID(u.index);void 0===E[e].start&&void 0===E[e].count||(s+=":"+E[e].start+":"+E[e].count),a.attributes.has(s)?t.indices=a.attributes.get(s):(t.indices=this.processAccessor(u.index,u,E[e].start,E[e].count),a.attributes.set(s,t.indices)),null===t.indices&&delete t.indices}const s=this.processMaterial(x[E[e].materialIndex]);null!==s&&(t.material=s),f.push(t)}p.primitives=f,o.meshes||(o.meshes=[]),this._invokeAll((function(t){t.writeMesh&&t.writeMesh(e,p)}));const w=o.meshes.push(p)-1;return a.meshes.set(c,w),w}processCamera(e){const t=this.json;t.cameras||(t.cameras=[]);const s=e.isOrthographicCamera,n={type:s?"orthographic":"perspective"};return s?n.orthographic={xmag:2*e.right,ymag:2*e.top,zfar:e.far<=0?.001:e.far,znear:e.near<0?0:e.near}:n.perspective={aspectRatio:e.aspect,yfov:THREE.MathUtils.degToRad(e.fov),zfar:e.far<=0?.001:e.far,znear:e.near<0?0:e.near},""!==e.name&&(n.name=e.type),t.cameras.push(n)-1}processAnimation(t,s){const n=this.json,r=this.nodeMap;n.animations||(n.animations=[]);const i=(t=e.Utils.mergeMorphTargetTracks(t.clone(),s)).tracks,a=[],o=[];for(let e=0;e<i.length;++e){const t=i[e],n=THREE.PropertyBinding.parseTrackName(t.name);let l=THREE.PropertyBinding.findNode(s,n.nodeName);const c=w[n.propertyName];if("bones"===n.objectName&&(l=!0===l.isSkinnedMesh?l.skeleton.getBoneByName(n.objectIndex):void 0),!l||!c)return console.warn('THREE.GLTFExporter: Could not export animation track "%s".',t.name),null;const u=1;let h,p=t.values.length/t.times.length;c===w.morphTargetInfluences&&(p/=l.morphTargetInfluences.length),!0===t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline?(h="CUBICSPLINE",p/=3):h=t.getInterpolation()===THREE.InterpolateDiscrete?"STEP":"LINEAR",o.push({input:this.processAccessor(new THREE.BufferAttribute(t.times,u)),output:this.processAccessor(new THREE.BufferAttribute(t.values,p)),interpolation:h}),a.push({sampler:o.length-1,target:{node:r.get(l),path:c}})}return n.animations.push({name:t.name||"clip_"+n.animations.length,samplers:o,channels:a}),n.animations.length-1}processSkin(e){const t=this.json,s=this.nodeMap,n=t.nodes[s.get(e)],r=e.skeleton;if(void 0===r)return null;const i=e.skeleton.bones[0];if(void 0===i)return null;const a=[],o=new Float32Array(16*r.bones.length),l=new THREE.Matrix4;for(let t=0;t<r.bones.length;++t)a.push(s.get(r.bones[t])),l.copy(r.boneInverses[t]),l.multiply(e.bindMatrix).toArray(o,16*t);void 0===t.skins&&(t.skins=[]),t.skins.push({inverseBindMatrices:this.processAccessor(new THREE.BufferAttribute(o,16)),joints:a,skeleton:s.get(i)});return n.skin=t.skins.length-1}processNode(e){const t=this.json,s=this.options,n=this.nodeMap;t.nodes||(t.nodes=[]);const r={};if(s.trs){const t=e.quaternion.toArray(),s=e.position.toArray(),n=e.scale.toArray();M(t,[0,0,0,1])||(r.rotation=t),M(s,[0,0,0])||(r.translation=s),M(n,[1,1,1])||(r.scale=n)}else e.matrixAutoUpdate&&e.updateMatrix(),!1===M(e.matrix.elements,[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])&&(r.matrix=e.matrix.elements);if(""!==e.name&&(r.name=String(e.name)),this.serializeUserData(e,r),e.isMesh||e.isLine||e.isPoints){const t=this.processMesh(e);null!==t&&(r.mesh=t)}else e.isCamera&&(r.camera=this.processCamera(e));if(e.isSkinnedMesh&&this.skins.push(e),e.children.length>0){const t=[];for(let n=0,r=e.children.length;n<r;n++){const r=e.children[n];if(r.visible||!1===s.onlyVisible){const e=this.processNode(r);null!==e&&t.push(e)}}t.length>0&&(r.children=t)}this._invokeAll((function(t){t.writeNode&&t.writeNode(e,r)}));const i=t.nodes.push(r)-1;return n.set(e,i),i}processScene(e){const t=this.json,s=this.options;t.scenes||(t.scenes=[],t.scene=0);const n={};""!==e.name&&(n.name=e.name),t.scenes.push(n);const r=[];for(let t=0,n=e.children.length;t<n;t++){const n=e.children[t];if(n.visible||!1===s.onlyVisible){const e=this.processNode(n);null!==e&&r.push(e)}}r.length>0&&(n.nodes=r),this.serializeUserData(e,n)}processObjects(e){const t=new THREE.Scene;t.name="AuxScene";for(let s=0;s<e.length;s++)t.children.push(e[s]);this.processScene(t)}processInput(e){const t=this.options;e=e instanceof Array?e:[e],this._invokeAll((function(t){t.beforeParse&&t.beforeParse(e)}));const s=[];for(let t=0;t<e.length;t++)e[t]instanceof THREE.Scene?this.processScene(e[t]):s.push(e[t]);s.length>0&&this.processObjects(s);for(let e=0;e<this.skins.length;++e)this.processSkin(this.skins[e]);for(let s=0;s<t.animations.length;++s)this.processAnimation(t.animations[s],e[0]);this._invokeAll((function(t){t.afterParse&&t.afterParse(e)}))}_invokeAll(e){for(let t=0,s=this.plugins.length;t<s;t++)e(this.plugins[t])}}class L{constructor(e){this.writer=e,this.name="KHR_lights_punctual"}writeNode(e,t){if(!e.isLight)return;if(!e.isDirectionalLight&&!e.isPointLight&&!e.isSpotLight)return void console.warn("THREE.GLTFExporter: Only directional, point, and spot lights are supported.",e);const s=this.writer,n=s.json,r=s.extensionsUsed,i={};e.name&&(i.name=e.name),i.color=e.color.toArray(),i.intensity=e.intensity,e.isDirectionalLight?i.type="directional":e.isPointLight?(i.type="point",e.distance>0&&(i.range=e.distance)):e.isSpotLight&&(i.type="spot",e.distance>0&&(i.range=e.distance),i.spot={},i.spot.innerConeAngle=(e.penumbra-1)*e.angle*-1,i.spot.outerConeAngle=e.angle),void 0!==e.decay&&2!==e.decay&&console.warn("THREE.GLTFExporter: Light decay may be lost. glTF is physically-based, and expects light.decay=2."),!e.target||e.target.parent===e&&0===e.target.position.x&&0===e.target.position.y&&-1===e.target.position.z||console.warn("THREE.GLTFExporter: Light direction may be lost. For best results, make light.target a child of the light with position 0,0,-1."),r[this.name]||(n.extensions=n.extensions||{},n.extensions[this.name]={lights:[]},r[this.name]=!0);const a=n.extensions[this.name].lights;a.push(i),t.extensions=t.extensions||{},t.extensions[this.name]={light:a.length-1}}}class S{constructor(e){this.writer=e,this.name="KHR_materials_unlit"}writeMaterial(e,t){if(!e.isMeshBasicMaterial)return;const s=this.writer.extensionsUsed;t.extensions=t.extensions||{},t.extensions[this.name]={},s[this.name]=!0,t.pbrMetallicRoughness.metallicFactor=0,t.pbrMetallicRoughness.roughnessFactor=.9}}class F{constructor(e){this.writer=e,this.name="KHR_materials_pbrSpecularGlossiness"}writeMaterial(e,t){if(!e.isGLTFSpecularGlossinessMaterial)return;const s=this.writer,n=s.extensionsUsed,r={};t.pbrMetallicRoughness.baseColorFactor&&(r.diffuseFactor=t.pbrMetallicRoughness.baseColorFactor);const i=[1,1,1];if(e.specular.toArray(i,0),r.specularFactor=i,r.glossinessFactor=e.glossiness,t.pbrMetallicRoughness.baseColorTexture&&(r.diffuseTexture=t.pbrMetallicRoughness.baseColorTexture),e.specularMap){const t={index:s.processTexture(e.specularMap)};s.applyTextureTransform(t,e.specularMap),r.specularGlossinessTexture=t}t.extensions=t.extensions||{},t.extensions[this.name]=r,n[this.name]=!0}}class N{constructor(e){this.writer=e,this.name="KHR_materials_transmission"}writeMaterial(e,t){if(!e.isMeshPhysicalMaterial||0===e.transmission)return;const s=this.writer,n=s.extensionsUsed,r={};if(r.transmissionFactor=e.transmission,e.transmissionMap){const t={index:s.processTexture(e.transmissionMap)};s.applyTextureTransform(t,e.transmissionMap),r.transmissionTexture=t}t.extensions=t.extensions||{},t.extensions[this.name]=r,n[this.name]=!0}}class H{constructor(e){this.writer=e,this.name="KHR_materials_volume"}writeMaterial(e,t){if(!e.isMeshPhysicalMaterial||0===e.thickness)return;const s=this.writer,n=s.extensionsUsed,r={};if(r.thicknessFactor=e.thickness,e.thicknessMap){const t={index:s.processTexture(e.thicknessMap)};s.applyTextureTransform(t,e.thicknessMap),r.thicknessTexture=t}r.attenuationDistance=e.attenuationDistance,r.attenuationColor=e.attenuationTint.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=r,n[this.name]=!0}}e.Utils={insertKeyframe:function(e,t){const s=.001,n=e.getValueSize(),r=new e.TimeBufferType(e.times.length+1),i=new e.ValueBufferType(e.values.length+n),a=e.createInterpolant(new e.ValueBufferType(n));let o;if(0===e.times.length){r[0]=t;for(let e=0;e<n;e++)i[e]=0;o=0}else if(t<e.times[0]){if(Math.abs(e.times[0]-t)<s)return 0;r[0]=t,r.set(e.times,1),i.set(a.evaluate(t),0),i.set(e.values,n),o=0}else if(t>e.times[e.times.length-1]){if(Math.abs(e.times[e.times.length-1]-t)<s)return e.times.length-1;r[r.length-1]=t,r.set(e.times,0),i.set(e.values,0),i.set(a.evaluate(t),e.values.length),o=r.length-1}else for(let l=0;l<e.times.length;l++){if(Math.abs(e.times[l]-t)<s)return l;if(e.times[l]<t&&e.times[l+1]>t){r.set(e.times.slice(0,l+1),0),r[l+1]=t,r.set(e.times.slice(l+1),l+2),i.set(e.values.slice(0,(l+1)*n),0),i.set(a.evaluate(t),(l+1)*n),i.set(e.values.slice((l+1)*n),(l+2)*n),o=l+1;break}}return e.times=r,e.values=i,o},mergeMorphTargetTracks:function(e,t){const s=[],n={},r=e.tracks;for(let e=0;e<r.length;++e){let i=r[e];const a=THREE.PropertyBinding.parseTrackName(i.name),o=THREE.PropertyBinding.findNode(t,a.nodeName);if("morphTargetInfluences"!==a.propertyName||void 0===a.propertyIndex){s.push(i);continue}if(i.createInterpolant!==i.InterpolantFactoryMethodDiscrete&&i.createInterpolant!==i.InterpolantFactoryMethodLinear){if(i.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline)throw new Error("THREE.GLTFExporter: Cannot merge tracks with glTF CUBICSPLINE interpolation.");console.warn("THREE.GLTFExporter: Morph target interpolation mode not yet supported. Using LINEAR instead."),i=i.clone(),i.setInterpolation(THREE.InterpolateLinear)}const l=o.morphTargetInfluences.length,c=o.morphTargetDictionary[a.propertyIndex];if(void 0===c)throw new Error("THREE.GLTFExporter: Morph target name not found: "+a.propertyIndex);let u;if(void 0===n[o.uuid]){u=i.clone();const e=new u.ValueBufferType(l*u.times.length);for(let t=0;t<u.times.length;t++)e[t*l+c]=u.values[t];u.name=(a.nodeName||"")+".morphTargetInfluences",u.values=e,n[o.uuid]=u,s.push(u);continue}const h=i.createInterpolant(new i.ValueBufferType(1));u=n[o.uuid];for(let e=0;e<u.times.length;e++)u.values[e*l+c]=h.evaluate(u.times[e]);for(let e=0;e<i.times.length;e++){const t=this.insertKeyframe(u,i.times[e]);u.values[t*l+c]=i.values[e]}}return e.tracks=s,e}},THREE.GLTFExporter=e}();