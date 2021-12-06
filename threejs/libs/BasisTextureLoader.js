!function(){const e=new WeakMap;class t extends THREE.Loader{constructor(e){super(e),this.transcoderPath="",this.transcoderBinary=null,this.transcoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.workerConfig=null}setTranscoderPath(e){return this.transcoderPath=e,this}setWorkerLimit(e){return this.workerLimit=e,this}detectSupport(e){return this.workerConfig={astcSupported:e.extensions.has("WEBGL_compressed_texture_astc"),etc1Supported:e.extensions.has("WEBGL_compressed_texture_etc1"),etc2Supported:e.extensions.has("WEBGL_compressed_texture_etc"),dxtSupported:e.extensions.has("WEBGL_compressed_texture_s3tc"),bptcSupported:e.extensions.has("EXT_texture_compression_bptc"),pvrtcSupported:e.extensions.has("WEBGL_compressed_texture_pvrtc")||e.extensions.has("WEBKIT_WEBGL_compressed_texture_pvrtc")},this}load(t,r,o,a){const s=new THREE.FileLoader(this.manager);s.setResponseType("arraybuffer"),s.setWithCredentials(this.withCredentials);const i=new THREE.CompressedTexture;return s.load(t,(t=>{if(e.has(t)){return e.get(t).promise.then(r).catch(a)}this._createTexture([t]).then((function(e){i.copy(e),i.needsUpdate=!0,r&&r(i)})).catch(a)}),o,a),i}parseInternalAsync(e){const{levels:t}=e,r=new Set;for(let e=0;e<t.length;e++)r.add(t[e].data.buffer);return this._createTexture(Array.from(r),{...e,lowLevel:!0})}_createTexture(t,r={}){let o,a;const s=r;let i=0;for(let e=0;e<t.length;e++)i+=t[e].byteLength;const n=this._allocateWorker(i).then((e=>(o=e,a=this.workerNextTaskID++,new Promise(((e,r)=>{o._callbacks[a]={resolve:e,reject:r},o.postMessage({type:"transcode",id:a,buffers:t,taskConfig:s},t)}))))).then((e=>{const{mipmaps:t,width:r,height:o,format:a}=e,s=new THREE.CompressedTexture(t,r,o,a,THREE.UnsignedByteType);return s.minFilter=1===t.length?THREE.LinearFilter:THREE.LinearMipmapLinearFilter,s.magFilter=THREE.LinearFilter,s.generateMipmaps=!1,s.needsUpdate=!0,s}));return n.catch((()=>!0)).then((()=>{o&&a&&(o._taskLoad-=i,delete o._callbacks[a])})),e.set(t[0],{promise:n}),n}_initTranscoder(){if(!this.transcoderPending){const e=new THREE.FileLoader(this.manager);e.setPath(this.transcoderPath),e.setWithCredentials(this.withCredentials);const r=new Promise(((t,r)=>{e.load("basis_transcoder.js",t,void 0,r)})),o=new THREE.FileLoader(this.manager);o.setPath(this.transcoderPath),o.setResponseType("arraybuffer"),o.setWithCredentials(this.withCredentials);const a=new Promise(((e,t)=>{o.load("basis_transcoder.wasm",e,void 0,t)}));this.transcoderPending=Promise.all([r,a]).then((([e,r])=>{const o=t.BasisWorker.toString(),a=["/* constants */","let _EngineFormat = "+JSON.stringify(t.EngineFormat),"let _TranscoderFormat = "+JSON.stringify(t.TranscoderFormat),"let _BasisFormat = "+JSON.stringify(t.BasisFormat),"/* basis_transcoder.js */",e,"/* worker */",o.substring(o.indexOf("{")+1,o.lastIndexOf("}"))].join("\n");this.workerSourceURL=URL.createObjectURL(new Blob([a])),this.transcoderBinary=r}))}return this.transcoderPending}_allocateWorker(e){return this._initTranscoder().then((()=>{if(this.workerPool.length<this.workerLimit){const e=new Worker(this.workerSourceURL);e._callbacks={},e._taskLoad=0,e.postMessage({type:"init",config:this.workerConfig,transcoderBinary:this.transcoderBinary}),e.onmessage=function(t){const r=t.data;switch(r.type){case"transcode":e._callbacks[r.id].resolve(r);break;case"error":e._callbacks[r.id].reject(r);break;default:console.error('THREE.BasisTextureLoader: Unexpected message, "'+r.type+'"')}},this.workerPool.push(e)}else this.workerPool.sort((function(e,t){return e._taskLoad>t._taskLoad?-1:1}));const t=this.workerPool[this.workerPool.length-1];return t._taskLoad+=e,t}))}dispose(){for(let e=0;e<this.workerPool.length;e++)this.workerPool[e].terminate();return this.workerPool.length=0,this}}t.BasisFormat={ETC1S:0,UASTC_4x4:1},t.TranscoderFormat={ETC1:0,ETC2:1,BC1:2,BC3:3,BC4:4,BC5:5,BC7_M6_OPAQUE_ONLY:6,BC7_M5:7,PVRTC1_4_RGB:8,PVRTC1_4_RGBA:9,ASTC_4x4:10,ATC_RGB:11,ATC_RGBA_INTERPOLATED_ALPHA:12,RGBA32:13,RGB565:14,BGR565:15,RGBA4444:16},t.EngineFormat={RGBAFormat:THREE.RGBAFormat,RGBA_ASTC_4x4_Format:THREE.RGBA_ASTC_4x4_Format,RGBA_BPTC_Format:THREE.RGBA_BPTC_Format,RGBA_ETC2_EAC_Format:THREE.RGBA_ETC2_EAC_Format,RGBA_PVRTC_4BPPV1_Format:THREE.RGBA_PVRTC_4BPPV1_Format,RGBA_S3TC_DXT5_Format:THREE.RGBA_S3TC_DXT5_Format,RGB_ETC1_Format:THREE.RGB_ETC1_Format,RGB_ETC2_Format:THREE.RGB_ETC2_Format,RGB_PVRTC_4BPPV1_Format:THREE.RGB_PVRTC_4BPPV1_Format,RGB_S3TC_DXT1_Format:THREE.RGB_S3TC_DXT1_Format},t.BasisWorker=function(){let e,t,r;const o=_EngineFormat,a=_TranscoderFormat,s=_BasisFormat;onmessage=function(o){const a=o.data;switch(a.type){case"init":e=a.config,i=a.transcoderBinary,t=new Promise((e=>{r={wasmBinary:i,onRuntimeInitialized:e},BASIS(r)})).then((()=>{r.initializeBasis()}));break;case"transcode":t.then((()=>{try{const{width:e,height:t,hasAlpha:o,mipmaps:i,format:n}=a.taskConfig.lowLevel?function(e){const{basisFormat:t,width:o,height:a,hasAlpha:i}=e,{transcoderFormat:n,engineFormat:d}=c(t,o,a,i),m=r.getBytesPerBlockOrPixel(n);h(r.isFormatSupported(n),"THREE.BasisTextureLoader: Unsupported format.");const p=[];if(t===s.ETC1S){const t=new r.LowLevelETC1SImageTranscoder,{endpointCount:o,endpointsData:a,selectorCount:s,selectorsData:d,tablesData:c}=e.globalData;try{let r;r=t.decodePalettes(o,a,s,d),h(r,"THREE.BasisTextureLoader: decodePalettes() failed."),r=t.decodeTables(c),h(r,"THREE.BasisTextureLoader: decodeTables() failed.");for(let o=0;o<e.levels.length;o++){const a=e.levels[o],s=e.globalData.imageDescs[o],d=_(n,a.width,a.height),c=new Uint8Array(d);r=t.transcodeImage(n,c,d/m,a.data,T(n,a.width),l(n,a.height),a.width,a.height,a.index,s.rgbSliceByteOffset,s.rgbSliceByteLength,s.alphaSliceByteOffset,s.alphaSliceByteLength,s.imageFlags,i,!1,0,0),h(r,"THREE.BasisTextureLoader: transcodeImage() failed for level "+a.index+"."),p.push({data:c,width:a.width,height:a.height})}}finally{t.delete()}}else for(let t=0;t<e.levels.length;t++){const o=e.levels[t],a=_(n,o.width,o.height),s=new Uint8Array(a);h(r.transcodeUASTCImage(n,s,a/m,o.data,T(n,o.width),l(n,o.height),o.width,o.height,o.index,0,o.data.byteLength,0,i,!1,0,0,-1,-1),"THREE.BasisTextureLoader: transcodeUASTCImage() failed for level "+o.index+"."),p.push({data:s,width:o.width,height:o.height})}return{width:o,height:a,hasAlpha:i,mipmaps:p,format:d}}(a.taskConfig):function(e){const t=new r.BasisFile(new Uint8Array(e)),o=t.isUASTC()?s.UASTC_4x4:s.ETC1S,a=t.getImageWidth(0,0),i=t.getImageHeight(0,0),n=t.getNumLevels(0),d=t.getHasAlpha();function h(){t.close(),t.delete()}const{transcoderFormat:T,engineFormat:l}=c(o,a,i,d);if(!a||!i||!n)throw h(),new Error("THREE.BasisTextureLoader:\tInvalid texture");if(!t.startTranscoding())throw h(),new Error("THREE.BasisTextureLoader: .startTranscoding failed");const _=[];for(let e=0;e<n;e++){const r=t.getImageWidth(0,e),o=t.getImageHeight(0,e),a=new Uint8Array(t.getImageTranscodedSizeInBytes(0,e,T));if(!t.transcodeImage(a,0,e,T,0,d))throw h(),new Error("THREE.BasisTextureLoader: .transcodeImage failed.");_.push({data:a,width:r,height:o})}return h(),{width:a,height:i,hasAlpha:d,mipmaps:_,format:l}}(a.buffers[0]),d=[];for(let e=0;e<i.length;++e)d.push(i[e].data.buffer);self.postMessage({type:"transcode",id:a.id,width:e,height:t,hasAlpha:o,mipmaps:i,format:n},d)}catch(e){console.error(e),self.postMessage({type:"error",id:a.id,error:e.message})}}))}var i};const i=[{if:"astcSupported",basisFormat:[s.UASTC_4x4],transcoderFormat:[a.ASTC_4x4,a.ASTC_4x4],engineFormat:[o.RGBA_ASTC_4x4_Format,o.RGBA_ASTC_4x4_Format],priorityETC1S:1/0,priorityUASTC:1,needsPowerOfTwo:!1},{if:"bptcSupported",basisFormat:[s.ETC1S,s.UASTC_4x4],transcoderFormat:[a.BC7_M5,a.BC7_M5],engineFormat:[o.RGBA_BPTC_Format,o.RGBA_BPTC_Format],priorityETC1S:3,priorityUASTC:2,needsPowerOfTwo:!1},{if:"dxtSupported",basisFormat:[s.ETC1S,s.UASTC_4x4],transcoderFormat:[a.BC1,a.BC3],engineFormat:[o.RGB_S3TC_DXT1_Format,o.RGBA_S3TC_DXT5_Format],priorityETC1S:4,priorityUASTC:5,needsPowerOfTwo:!1},{if:"etc2Supported",basisFormat:[s.ETC1S,s.UASTC_4x4],transcoderFormat:[a.ETC1,a.ETC2],engineFormat:[o.RGB_ETC2_Format,o.RGBA_ETC2_EAC_Format],priorityETC1S:1,priorityUASTC:3,needsPowerOfTwo:!1},{if:"etc1Supported",basisFormat:[s.ETC1S,s.UASTC_4x4],transcoderFormat:[a.ETC1,a.ETC1],engineFormat:[o.RGB_ETC1_Format,o.RGB_ETC1_Format],priorityETC1S:2,priorityUASTC:4,needsPowerOfTwo:!1},{if:"pvrtcSupported",basisFormat:[s.ETC1S,s.UASTC_4x4],transcoderFormat:[a.PVRTC1_4_RGB,a.PVRTC1_4_RGBA],engineFormat:[o.RGB_PVRTC_4BPPV1_Format,o.RGBA_PVRTC_4BPPV1_Format],priorityETC1S:5,priorityUASTC:6,needsPowerOfTwo:!0}],n=i.sort((function(e,t){return e.priorityETC1S-t.priorityETC1S})),d=i.sort((function(e,t){return e.priorityUASTC-t.priorityUASTC}));function c(t,r,i,c){let h,T;const l=t===s.ETC1S?n:d;for(let o=0;o<l.length;o++){const a=l[o];if(e[a.if]&&(a.basisFormat.includes(t)&&(!a.needsPowerOfTwo||m(r)&&m(i))))return h=a.transcoderFormat[c?1:0],T=a.engineFormat[c?1:0],{transcoderFormat:h,engineFormat:T}}return console.warn("THREE.BasisTextureLoader: No suitable compressed texture format found. Decoding to RGBA32."),h=a.RGBA32,T=o.RGBAFormat,{transcoderFormat:h,engineFormat:T}}function h(e,t){if(!e)throw new Error(t)}function T(e,t){return Math.ceil(t/r.getFormatBlockWidth(e))}function l(e,t){return Math.ceil(t/r.getFormatBlockHeight(e))}function _(e,t,o){const s=r.getBytesPerBlockOrPixel(e);if(r.formatIsUncompressed(e))return t*o*s;if(e===a.PVRTC1_4_RGB||e===a.PVRTC1_4_RGBA){const e=t+3&-4,r=o+3&-4;return(Math.max(8,e)*Math.max(8,r)*4+7)/8}return T(e,t)*l(e,o)*s}function m(e){return e<=2||0==(e&e-1)&&0!==e}},THREE.BasisTextureLoader=t}();