(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();var re;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(re||(re={}));class Ne extends Error{constructor(t,a,r){super(t),this.message=t,this.code=a,this.data=r}}const Nt=e=>{var t,a;return e?.androidBridge?"android":!((a=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},At=e=>{const t=e.CapacitorCustomPlatform||null,a=e.Capacitor||{},r=a.Plugins=a.Plugins||{},n=()=>t!==null?t.name:Nt(e),s=()=>n()!=="web",i=u=>{const y=l.get(u);return!!(y?.platforms.has(n())||c(u))},c=u=>{var y;return(y=a.PluginHeaders)===null||y===void 0?void 0:y.find(m=>m.name===u)},d=u=>e.console.error(u),l=new Map,p=(u,y={})=>{const m=l.get(u);if(m)return console.warn(`Capacitor plugin "${u}" already registered. Cannot register plugins twice.`),m.proxy;const f=n(),T=c(u);let h;const w=async()=>(!h&&f in y?h=typeof y[f]=="function"?h=await y[f]():h=y[f]:t!==null&&!h&&"web"in y&&(h=typeof y.web=="function"?h=await y.web():h=y.web),h),g=(D,q)=>{var k,W;if(T){const b=T?.methods.find(x=>q===x.name);if(b)return b.rtype==="promise"?x=>a.nativePromise(u,q.toString(),x):(x,te)=>a.nativeCallback(u,q.toString(),x,te);if(D)return(k=D[q])===null||k===void 0?void 0:k.bind(D)}else{if(D)return(W=D[q])===null||W===void 0?void 0:W.bind(D);throw new Ne(`"${u}" plugin is not implemented on ${f}`,re.Unimplemented)}},R=D=>{let q;const k=(...W)=>{const b=w().then(x=>{const te=g(x,D);if(te){const ve=te(...W);return q=ve?.remove,ve}else throw new Ne(`"${u}.${D}()" is not implemented on ${f}`,re.Unimplemented)});return D==="addListener"&&(b.remove=async()=>q()),b};return k.toString=()=>`${D.toString()}() { [capacitor code] }`,Object.defineProperty(k,"name",{value:D,writable:!1,configurable:!1}),k},L=R("addListener"),I=R("removeListener"),_=(D,q)=>{const k=L({eventName:D},q),W=async()=>{const x=await k;I({eventName:D,callbackId:x},q)},b=new Promise(x=>k.then(()=>x({remove:W})));return b.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await W()},b},F=new Proxy({},{get(D,q){switch(q){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return T?_:L;case"removeListener":return I;default:return R(q)}}});return r[u]=F,l.set(u,{name:u,proxy:F,platforms:new Set([...Object.keys(y),...T?[f]:[]])}),F};return a.convertFileSrc||(a.convertFileSrc=u=>u),a.getPlatform=n,a.handleError=d,a.isNativePlatform=s,a.isPluginAvailable=i,a.registerPlugin=p,a.Exception=Ne,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},Lt=e=>e.Capacitor=At(e),A=Lt(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),ee=A.registerPlugin;class De{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,a){let r=!1;this.listeners[t]||(this.listeners[t]=[],r=!0),this.listeners[t].push(a);const s=this.windowListeners[t];s&&!s.registered&&this.addWindowListener(s),r&&this.sendRetainedArgumentsForEvent(t);const i=async()=>this.removeListener(t,a);return Promise.resolve({remove:i})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,a,r){const n=this.listeners[t];if(!n){if(r){let s=this.retainedEventArguments[t];s||(s=[]),s.push(a),this.retainedEventArguments[t]=s}return}n.forEach(s=>s(a))}hasListeners(t){var a;return!!(!((a=this.listeners[t])===null||a===void 0)&&a.length)}registerWindowListener(t,a){this.windowListeners[a]={registered:!1,windowEventName:t,pluginEventName:a,handler:r=>{this.notifyListeners(a,r)}}}unimplemented(t="not implemented"){return new A.Exception(t,re.Unimplemented)}unavailable(t="not available"){return new A.Exception(t,re.Unavailable)}async removeListener(t,a){const r=this.listeners[t];if(!r)return;const n=r.indexOf(a);this.listeners[t].splice(n,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const a=this.retainedEventArguments[t];a&&(delete this.retainedEventArguments[t],a.forEach(r=>{this.notifyListeners(t,r)}))}}const _e=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Be=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class Ct extends De{async getCookies(){const t=document.cookie,a={};return t.split(";").forEach(r=>{if(r.length<=0)return;let[n,s]=r.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");n=Be(n).trim(),s=Be(s).trim(),a[n]=s}),a}async setCookie(t){try{const a=_e(t.key),r=_e(t.value),n=t.expires?`; expires=${t.expires.replace("expires=","")}`:"",s=(t.path||"/").replace("path=",""),i=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${a}=${r||""}${n}; path=${s}; ${i};`}catch(a){return Promise.reject(a)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const a of t)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}ee("CapacitorCookies",{web:()=>new Ct});const $t=async e=>new Promise((t,a)=>{const r=new FileReader;r.onload=()=>{const n=r.result;t(n.indexOf(",")>=0?n.split(",")[1]:n)},r.onerror=n=>a(n),r.readAsDataURL(e)}),Rt=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(n=>n.toLocaleLowerCase()).reduce((n,s,i)=>(n[s]=e[t[i]],n),{})},Ot=(e,t=!0)=>e?Object.entries(e).reduce((r,n)=>{const[s,i]=n;let c,d;return Array.isArray(i)?(d="",i.forEach(l=>{c=t?encodeURIComponent(l):l,d+=`${s}=${c}&`}),d.slice(0,-1)):(c=t?encodeURIComponent(i):i,d=`${s}=${c}`),`${r}&${d}`},"").substr(1):null,Dt=(e,t={})=>{const a=Object.assign({method:e.method||"GET",headers:e.headers},t),n=Rt(e.headers)["content-type"]||"";if(typeof e.data=="string")a.body=e.data;else if(n.includes("application/x-www-form-urlencoded")){const s=new URLSearchParams;for(const[i,c]of Object.entries(e.data||{}))s.set(i,c);a.body=s.toString()}else if(n.includes("multipart/form-data")||e.data instanceof FormData){const s=new FormData;if(e.data instanceof FormData)e.data.forEach((c,d)=>{s.append(d,c)});else for(const c of Object.keys(e.data))s.append(c,e.data[c]);a.body=s;const i=new Headers(a.headers);i.delete("content-type"),a.headers=i}else(n.includes("application/json")||typeof e.data=="object")&&(a.body=JSON.stringify(e.data));return a};class xt extends De{async request(t){const a=Dt(t,t.webFetchExtra),r=Ot(t.params,t.shouldEncodeUrlParams),n=r?`${t.url}?${r}`:t.url,s=await fetch(n,a),i=s.headers.get("content-type")||"";let{responseType:c="text"}=s.ok?t:{};i.includes("application/json")&&(c="json");let d,l;switch(c){case"arraybuffer":case"blob":l=await s.blob(),d=await $t(l);break;case"json":d=await s.json();break;default:d=await s.text()}const p={};return s.headers.forEach((u,y)=>{p[y]=u}),{data:d,headers:p,status:s.status,url:s.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}ee("CapacitorHttp",{web:()=>new xt});var je;(function(e){e.Dark="DARK",e.Light="LIGHT",e.Default="DEFAULT"})(je||(je={}));var He;(function(e){e.StatusBar="StatusBar",e.NavigationBar="NavigationBar"})(He||(He={}));class Pt extends De{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}ee("SystemBars",{web:()=>new Pt});const It="modulepreload",qt=function(e){return"/"+e},We={},xe=function(t,a,r){let n=Promise.resolve();if(a&&a.length>0){let d=function(l){return Promise.all(l.map(p=>Promise.resolve(p).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),c=i?.nonce||i?.getAttribute("nonce");n=d(a.map(l=>{if(l=qt(l),l in We)return;We[l]=!0;const p=l.endsWith(".css"),u=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const y=document.createElement("link");if(y.rel=p?"stylesheet":It,p||(y.as="script"),y.crossOrigin="",y.href=l,c&&y.setAttribute("nonce",c),document.head.appendChild(y),p)return new Promise((m,f)=>{y.addEventListener("load",m),y.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(i){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=i,window.dispatchEvent(c),!c.defaultPrevented)throw i}return n.then(i=>{for(const c of i||[])c.status==="rejected"&&s(c.reason);return t().catch(s)})};function Ft(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,a){return new Proxy({},{get(r,n){return(s,i,c)=>{const d=e.Capacitor.Plugins[a];if(d===void 0){c(new Error(`Capacitor plugin ${a} not found`));return}if(typeof d[n]!="function"){c(new Error(`Method ${n} not found in Capacitor plugin ${a}`));return}(async()=>{try{const l=await d[n](s);i(l)}catch(l){c(l)}})()}}})}})}function kt(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,a){return e.cordova.plugins[a]}})}function Ut(e=!1){typeof window>"u"||(window.CapacitorUtils=window.CapacitorUtils||{},window.Capacitor!==void 0&&!e?Ft(window):window.cordova!==void 0&&kt(window))}var be;(function(e){e.Documents="DOCUMENTS",e.Data="DATA",e.Library="LIBRARY",e.Cache="CACHE",e.External="EXTERNAL",e.ExternalStorage="EXTERNAL_STORAGE",e.ExternalCache="EXTERNAL_CACHE",e.LibraryNoCloud="LIBRARY_NO_CLOUD",e.Temporary="TEMPORARY"})(be||(be={}));var $e;(function(e){e.UTF8="utf8",e.ASCII="ascii",e.UTF16="utf16"})($e||($e={}));const Xe=ee("Filesystem",{web:()=>xe(()=>import("./web-BhMkztSY.js"),[]).then(e=>new e.FilesystemWeb)});Ut();const Mt=ee("Share",{web:()=>xe(()=>import("./web-ByBUo4E-.js"),[]).then(e=>new e.ShareWeb)});class _t{constructor(t){this.sqlite=t,this._connectionDict=new Map}async initWebStore(){try{return await this.sqlite.initWebStore(),Promise.resolve()}catch(t){return Promise.reject(t)}}async saveToStore(t){try{return await this.sqlite.saveToStore({database:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async saveToLocalDisk(t){try{return await this.sqlite.saveToLocalDisk({database:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getFromLocalDiskToStore(t){const a=t??!0;try{return await this.sqlite.getFromLocalDiskToStore({overwrite:a}),Promise.resolve()}catch(r){return Promise.reject(r)}}async echo(t){try{const a=await this.sqlite.echo({value:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isSecretStored(){try{const t=await this.sqlite.isSecretStored();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async setEncryptionSecret(t){try{return await this.sqlite.setEncryptionSecret({passphrase:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async changeEncryptionSecret(t,a){try{return await this.sqlite.changeEncryptionSecret({passphrase:t,oldpassphrase:a}),Promise.resolve()}catch(r){return Promise.reject(r)}}async clearEncryptionSecret(){try{return await this.sqlite.clearEncryptionSecret(),Promise.resolve()}catch(t){return Promise.reject(t)}}async checkEncryptionSecret(t){try{const a=await this.sqlite.checkEncryptionSecret({passphrase:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async addUpgradeStatement(t,a){try{return t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.addUpgradeStatement({database:t,upgrade:a}),Promise.resolve()}catch(r){return Promise.reject(r)}}async createConnection(t,a,r,n,s){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.createConnection({database:t,encrypted:a,mode:r,version:n,readonly:s});const i=new Ke(t,s,this.sqlite),c=s?`RO_${t}`:`RW_${t}`;return this._connectionDict.set(c,i),Promise.resolve(i)}catch(i){return Promise.reject(i)}}async closeConnection(t,a){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.closeConnection({database:t,readonly:a});const r=a?`RO_${t}`:`RW_${t}`;return this._connectionDict.delete(r),Promise.resolve()}catch(r){return Promise.reject(r)}}async isConnection(t,a){const r={};t.endsWith(".db")&&(t=t.slice(0,-3));const n=a?`RO_${t}`:`RW_${t}`;return r.result=this._connectionDict.has(n),Promise.resolve(r)}async retrieveConnection(t,a){t.endsWith(".db")&&(t=t.slice(0,-3));const r=a?`RO_${t}`:`RW_${t}`;if(this._connectionDict.has(r)){const n=this._connectionDict.get(r);return typeof n<"u"?Promise.resolve(n):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async getNCDatabasePath(t,a){try{const r=await this.sqlite.getNCDatabasePath({path:t,database:a});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async createNCConnection(t,a){try{await this.sqlite.createNCConnection({databasePath:t,version:a});const r=new Ke(t,!0,this.sqlite),n=`RO_${t})`;return this._connectionDict.set(n,r),Promise.resolve(r)}catch(r){return Promise.reject(r)}}async closeNCConnection(t){try{await this.sqlite.closeNCConnection({databasePath:t});const a=`RO_${t})`;return this._connectionDict.delete(a),Promise.resolve()}catch(a){return Promise.reject(a)}}async isNCConnection(t){const a={},r=`RO_${t})`;return a.result=this._connectionDict.has(r),Promise.resolve(a)}async retrieveNCConnection(t){if(this._connectionDict.has(t)){const a=`RO_${t})`,r=this._connectionDict.get(a);return typeof r<"u"?Promise.resolve(r):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async isNCDatabase(t){try{const a=await this.sqlite.isNCDatabase({databasePath:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async retrieveAllConnections(){return this._connectionDict}async closeAllConnections(){const t=new Map;try{for(const a of this._connectionDict.keys()){const r=a.substring(3),n=a.substring(0,3)==="RO_";await this.sqlite.closeConnection({database:r,readonly:n}),t.set(a,null)}for(const a of t.keys())this._connectionDict.delete(a);return Promise.resolve()}catch(a){return Promise.reject(a)}}async checkConnectionsConsistency(){try{const t=[...this._connectionDict.keys()],a=[],r=[];for(const s of t)a.push(s.substring(0,2)),r.push(s.substring(3));const n=await this.sqlite.checkConnectionsConsistency({dbNames:r,openModes:a});return n.result||(this._connectionDict=new Map),Promise.resolve(n)}catch(t){return this._connectionDict=new Map,Promise.reject(t)}}async importFromJson(t){try{const a=await this.sqlite.importFromJson({jsonstring:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isJsonValid(t){try{const a=await this.sqlite.isJsonValid({jsonstring:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async copyFromAssets(t){const a=t??!0;try{return await this.sqlite.copyFromAssets({overwrite:a}),Promise.resolve()}catch(r){return Promise.reject(r)}}async getFromHTTPRequest(t,a){const r=a??!0;try{return await this.sqlite.getFromHTTPRequest({url:t,overwrite:r}),Promise.resolve()}catch(n){return Promise.reject(n)}}async isDatabaseEncrypted(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const a=await this.sqlite.isDatabaseEncrypted({database:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isInConfigEncryption(){try{const t=await this.sqlite.isInConfigEncryption();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isInConfigBiometricAuth(){try{const t=await this.sqlite.isInConfigBiometricAuth();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isDatabase(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const a=await this.sqlite.isDatabase({database:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async getDatabaseList(){try{const a=(await this.sqlite.getDatabaseList()).values;a.sort();const r={values:a};return Promise.resolve(r)}catch(t){return Promise.reject(t)}}async getMigratableDbList(t){const a=t||"default";try{const r=await this.sqlite.getMigratableDbList({folderPath:a});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async addSQLiteSuffix(t,a){const r=t||"default",n=a||[];try{const s=await this.sqlite.addSQLiteSuffix({folderPath:r,dbNameList:n});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async deleteOldDatabases(t,a){const r=t||"default",n=a||[];try{const s=await this.sqlite.deleteOldDatabases({folderPath:r,dbNameList:n});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async moveDatabasesAndAddSuffix(t,a){const r=t||"default",n=a||[];return this.sqlite.moveDatabasesAndAddSuffix({folderPath:r,dbNameList:n})}}class Ke{constructor(t,a,r){this.dbName=t,this.readonly=a,this.sqlite=r}getConnectionDBName(){return this.dbName}getConnectionReadOnly(){return this.readonly}async open(){try{return await this.sqlite.open({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async close(){try{return await this.sqlite.close({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async beginTransaction(){try{const t=await this.sqlite.beginTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async commitTransaction(){try{const t=await this.sqlite.commitTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async rollbackTransaction(){try{const t=await this.sqlite.rollbackTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTransactionActive(){try{const t=await this.sqlite.isTransactionActive({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async loadExtension(t){try{return await this.sqlite.loadExtension({database:this.dbName,path:t,readonly:this.readonly}),Promise.resolve()}catch(a){return Promise.reject(a)}}async enableLoadExtension(t){try{return await this.sqlite.enableLoadExtension({database:this.dbName,toggle:t,readonly:this.readonly}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getUrl(){try{const t=await this.sqlite.getUrl({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getVersion(){try{const t=await this.sqlite.getVersion({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getTableList(){try{const t=await this.sqlite.getTableList({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async execute(t,a=!0,r=!0){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const n=await this.sqlite.execute({database:this.dbName,statements:t,transaction:a,readonly:!1,isSQL92:r});return Promise.resolve(n)}}catch(n){return Promise.reject(n)}}async query(t,a,r=!0){let n;try{return a&&a.length>0?n=await this.sqlite.query({database:this.dbName,statement:t,values:a,readonly:this.readonly,isSQL92:!0}):n=await this.sqlite.query({database:this.dbName,statement:t,values:[],readonly:this.readonly,isSQL92:r}),n=await this.reorderRows(n),Promise.resolve(n)}catch(s){return Promise.reject(s)}}async run(t,a,r=!0,n="no",s=!0){let i;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(a&&a.length>0?i=await this.sqlite.run({database:this.dbName,statement:t,values:a,transaction:r,readonly:!1,returnMode:n,isSQL92:!0}):i=await this.sqlite.run({database:this.dbName,statement:t,values:[],transaction:r,readonly:!1,returnMode:n,isSQL92:s}),i.changes=await this.reorderRows(i.changes),Promise.resolve(i))}catch(c){return Promise.reject(c)}}async executeSet(t,a=!0,r="no",n=!0){let s;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(s=await this.sqlite.executeSet({database:this.dbName,set:t,transaction:a,readonly:!1,returnMode:r,isSQL92:n}),s.changes=await this.reorderRows(s.changes),Promise.resolve(s))}catch(i){return Promise.reject(i)}}async isExists(){try{const t=await this.sqlite.isDBExists({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTable(t){try{const a=await this.sqlite.isTableExists({database:this.dbName,table:t,readonly:this.readonly});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isDBOpen(){try{const t=await this.sqlite.isDBOpen({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async delete(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteDatabase({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async createSyncTable(){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const t=await this.sqlite.createSyncTable({database:this.dbName,readonly:!1});return Promise.resolve(t)}}catch(t){return Promise.reject(t)}}async setSyncDate(t){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.setSyncDate({database:this.dbName,syncdate:t,readonly:!1}),Promise.resolve())}catch(a){return Promise.reject(a)}}async getSyncDate(){try{const t=await this.sqlite.getSyncDate({database:this.dbName,readonly:this.readonly});let a="";return t.syncDate>0&&(a=new Date(t.syncDate*1e3).toISOString()),Promise.resolve(a)}catch(t){return Promise.reject(t)}}async exportToJson(t,a=!1){try{const r=await this.sqlite.exportToJson({database:this.dbName,jsonexportmode:t,readonly:this.readonly,encrypted:a});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async deleteExportedRows(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteExportedRows({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async executeTransaction(t,a=!0){let r=0,n=!1;if(this.readonly)return Promise.reject("not allowed in read-only mode");if(await this.sqlite.beginTransaction({database:this.dbName}),n=await this.sqlite.isTransactionActive({database:this.dbName}),!n)return Promise.reject("After Begin Transaction, no transaction active");try{for(const c of t){if(typeof c!="object"||!("statement"in c))throw new Error("Error a task.statement must be provided");if("values"in c&&c.values&&c.values.length>0){const d=c.statement.toUpperCase().includes("RETURNING")?"all":"no",l=await this.sqlite.run({database:this.dbName,statement:c.statement,values:c.values,transaction:!1,readonly:!1,returnMode:d,isSQL92:a});if(l.changes.changes<0)throw new Error("Error in transaction method run ");r+=l.changes.changes}else{const d=await this.sqlite.execute({database:this.dbName,statements:c.statement,transaction:!1,readonly:!1});if(d.changes.changes<0)throw new Error("Error in transaction method execute ");r+=d.changes.changes}}const s=await this.sqlite.commitTransaction({database:this.dbName});r+=s.changes.changes;const i={changes:{changes:r}};return Promise.resolve(i)}catch(s){const i=s.message?s.message:s;return await this.sqlite.rollbackTransaction({database:this.dbName}),Promise.reject(i)}}async reorderRows(t){const a=t;if(t?.values&&typeof t.values[0]=="object"&&Object.keys(t.values[0]).includes("ios_columns")){const r=t.values[0].ios_columns,n=[];for(let s=1;s<t.values.length;s++){const i=t.values[s],c={};for(const d of r)c[d]=i[d];n.push(c)}a.values=n}return Promise.resolve(a)}}const Bt=ee("CapacitorSQLite",{web:()=>xe(()=>import("./web-x2nuYHNg.js"),[]).then(e=>new e.CapacitorSQLiteWeb),electron:()=>window.CapacitorCustomPlatform.plugins.CapacitorSQLite});function jt(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}const Ht="laba101_offline",Ee="fresh_start_reset_v1",Wt=new _t(Bt);let pe=null;const H=[{id:1,name:"Laba101 Admin",email:"admin@laba101.test",password:"password",role:"admin",branch:"Main Store"},{id:2,name:"Gensan Branch Staff",email:"staff@laba101.gensan",password:"password",role:"staff",branch:"Gensan Branch"}],Se=[],K=[X(1,"Drop-off","P185. Includes wash, dry, and fold.","Drop-Off","order",185,8,40,["Wash","Dry","Fold"],0,24),X(2,"Full Service","P200. Wash, Fabcon, detergent, dry, and fold.","Full Service","order",200,8,40,["Wash","Dry","Fold","Detergent","Fabcon"],0,24),X(3,"Self Service Wash","P60. Self-service wash (max 8kg per load).","Self Service","order",60,8,null,["Wash"],0,1),X(4,"Self Service Dry","P70. Self-service dry (40 mins).","Self Service","order",70,8,40,["Dry"],0,1),X(6,"Dry 10 mins","Additional drying time (10 mins).","Add-on","addon",30,8,10,["Dry"],0,1),X(7,"Dry 20 mins","Additional drying time (20 mins).","Add-on","addon",50,8,20,["Dry"],0,1),X(8,"Dry 40 mins","Additional drying time (40 mins).","Add-on","addon",70,8,40,["Dry"],0,1),X(9,"Additional Zonrox","Extra Zonrox bleach add-on per load.","Add-on","addon",25,0,null,["Zonrox"],0,0),X(10,"Additional Fabcon","Extra Fabcon fabric conditioner add-on per load.","Add-on","addon",25,0,null,["Fabcon"],0,0)],Q=[{id:1,name:"Regular Clothes",maxKg:8,additionalFee:0,isActive:1},{id:2,name:"Comforter",maxKg:4,additionalFee:0,isActive:1},{id:3,name:"Thin Blankets",maxKg:6,additionalFee:0,isActive:1},{id:4,name:"Bedsheets",maxKg:6,additionalFee:0,isActive:1},{id:5,name:"Bath Towels",maxKg:6,additionalFee:0,isActive:1},{id:6,name:"Curtains",maxKg:6,additionalFee:0,isActive:1}];function Ge(e,t){const a=N(e,[]),r=new Map(a.map(s=>[s.id,s])),n=t.map(s=>{const i=r.get(s.id);return i?{...s,...i,isActive:i.isActive??s.isActive}:s});(a.length!==n.length||n.some((s,i)=>s.id!==a[i]?.id||JSON.stringify(s)!==JSON.stringify(a[i])))&&S(e,n)}async function Xt(){Ge("services",K),Ge("item_categories",Q)}async function Te(e){for(const t of K)((await e.query("SELECT id FROM laundry_services WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive,t.id]):await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive]);for(const t of Q)((await e.query("SELECT id FROM item_categories WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.maxKg,t.additionalFee,t.isActive,t.id]):await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[t.id,t.name,t.maxKg,t.additionalFee,t.isActive])}const J=[],ne=[],Z=[],se=[],ie=[],G=[...[1,2,3,4].map(e=>({id:e,machineName:`Washer ${e}`,machineType:"washer",status:"available",branch:"Main Store"})),...[1,2,3,4].map(e=>({id:e+4,machineName:`Dryer ${e}`,machineType:"dryer",status:"available",branch:"Main Store"}))],oe=[{key:"branch",value:"Main Store"},{key:"fold_rate",value:"5"},{key:"report_email",value:"admin@laba101.test"}];function X(e,t,a,r,n,s,i,c,d,l,p){return{id:e,name:t,description:a,category:r,serviceType:n,price:s,maxKg:i,dryingMinutes:c,includes:d,additionalCharge:l,turnaroundHours:p,isActive:1}}function U(e){return`laba101-mobile-${e}`}function N(e,t){const a=localStorage.getItem(U(e));if(!a)return structuredClone(t);try{return JSON.parse(a)}catch{return structuredClone(t)}}function S(e,t){localStorage.setItem(U(e),JSON.stringify(t))}function M(e){return e.reduce((t,a)=>Math.max(t,a.id),0)+1}function z(){return new Date().toISOString()}function Re(e=new Date){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${r}`}function Kt(){return Re().slice(2).replaceAll("-","")}function V(e,t){if(!e)return t;try{return JSON.parse(e)}catch{return t}}async function C(){return pe||(pe=await Wt.createConnection(Ht,!1,"no-encryption",1,!1),await pe.open()),pe}async function P(e,t,a,r){((await e.query(`PRAGMA table_info(${t})`)).values??[]).some(i=>i.name===a)||await e.execute(`ALTER TABLE ${t} ADD COLUMN ${a} ${r}`)}function Gt(){const e=N("staff",H),t=new Map(e.map(r=>[r.id,r]));let a=!1;for(const r of H){const n=t.get(r.id);if(!n){t.set(r.id,{...r,isActive:1}),a=!0;continue}const s={...n,name:r.name,email:r.email,password:r.password,role:r.role,branch:r.branch,isActive:1};JSON.stringify(s)!==JSON.stringify(n)&&(t.set(r.id,s),a=!0)}a&&S("staff",Array.from(t.values()).sort((r,n)=>r.id-n.id))}async function Vt(){localStorage.getItem(U(Ee))||(S("staff",H),S("customers",[]),S("orders",[]),S("payments",[]),S("fold_logs",[]),S("expenses",[]),S("sales",[]),localStorage.getItem(U("services"))||S("services",K),localStorage.getItem(U("item_categories"))||S("item_categories",Q),localStorage.getItem(U("machines"))||S("machines",G),localStorage.getItem(U("subcleanings"))||S("subcleanings",[]),localStorage.getItem(U("settings"))||S("settings",oe),localStorage.removeItem("laba101-mobile-session"),S(Ee,!0))}async function st(e){for(const t of H){if(((await e.query("SELECT id FROM staff WHERE id = ?",[t.id])).values??[]).length>0){await e.run("UPDATE staff SET name = ?, email = ?, password = ?, role = ?, branch = ?, isActive = 1 WHERE id = ?",[t.name,t.email,t.password,t.role,t.branch,t.id]);continue}await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.email,t.password,t.role,t.branch,1])}}async function Yt(e){if(!(((await e.query("SELECT COUNT(*) as count FROM machines")).values?.[0]?.count??0)>0))for(const a of G)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[a.id,a.machineName,a.machineType,a.status,a.branch])}async function Qt(e){for(const t of oe)await e.run("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)",[t.key,t.value])}async function it(e){for(const t of K)((await e.query("SELECT id FROM laundry_services WHERE id = ?",[t.id])).values??[]).length>0||await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive]);for(const t of Q)((await e.query("SELECT id FROM item_categories WHERE id = ?",[t.id])).values??[]).length>0||await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[t.id,t.name,t.maxKg,t.additionalFee,t.isActive])}async function Jt(e){((await e.query("SELECT value FROM settings WHERE key = ?",[Ee])).values??[]).length>0||(await e.execute(`
    DELETE FROM payments;
    DELETE FROM orders;
    DELETE FROM customers;
    DELETE FROM fold_logs;
    DELETE FROM disbursement_expenses;
    DELETE FROM daily_sales;
    DELETE FROM revolving_history;
    DELETE FROM staff WHERE id NOT IN (1, 2);
  `),await st(e),await it(e),await Yt(e),await Qt(e),await e.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",[Ee,z()]),localStorage.removeItem("laba101-mobile-session"))}async function zt(){if(!A.isNativePlatform()){await Vt(),!localStorage.getItem(U("seeded_v4"))&&!localStorage.getItem(U("services"))&&!localStorage.getItem(U("staff"))&&(S("staff",H),S("customers",Se),S("services",K),S("item_categories",Q),S("orders",J),S("payments",ne),S("fold_logs",[]),S("expenses",Z),S("sales",se),S("revolving_history",ie),S("machines",G),S("subcleanings",[]),S("settings",oe),S("seeded_v4",!0)),await Xt(),Gt(),localStorage.getItem(U("seeded_v4"))||S("seeded_v4",!0);return}const e=await C();await e.execute(`
    CREATE TABLE IF NOT EXISTS staff (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, email TEXT, password TEXT, role TEXT, branch TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS customers (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, phone TEXT, address TEXT);
    CREATE TABLE IF NOT EXISTS laundry_services (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      category TEXT NOT NULL,
      serviceType TEXT NOT NULL,
      price REAL NOT NULL,
      maxKg REAL NOT NULL,
      dryingMinutes INTEGER,
      includes TEXT,
      additionalCharge REAL NOT NULL DEFAULT 0,
      turnaroundHours INTEGER NOT NULL DEFAULT 24,
      isActive INTEGER NOT NULL DEFAULT 1
    );
    CREATE TABLE IF NOT EXISTS item_categories (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, maxKg REAL NOT NULL, additionalFee REAL NOT NULL DEFAULT 0, isActive INTEGER NOT NULL DEFAULT 1);
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY NOT NULL,
      ticket TEXT NOT NULL,
      customerId INTEGER NOT NULL,
      customer TEXT NOT NULL,
      phone TEXT,
      serviceId INTEGER NOT NULL,
      service TEXT NOT NULL,
      serviceLines TEXT,
      itemCategoryId INTEGER NOT NULL,
      itemCategory TEXT NOT NULL,
      branch TEXT NOT NULL,
      status TEXT NOT NULL,
      workflowCompleted TEXT,
      weightKg REAL NOT NULL,
      price REAL NOT NULL,
      additionalCharge REAL NOT NULL DEFAULT 0,
      extraServiceAmount REAL NOT NULL DEFAULT 0,
      totalAmount REAL NOT NULL,
      paidAmount REAL NOT NULL DEFAULT 0,
      extras TEXT,
      notes TEXT,
      foldedBy INTEGER,
      dueAt TEXT,
      createdAt TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      orderId INTEGER NOT NULL,
      amount REAL NOT NULL,
      method TEXT NOT NULL,
      reference TEXT,
      receivedAt TEXT NOT NULL,
      branch TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS fold_logs (id INTEGER PRIMARY KEY AUTOINCREMENT, orderTicket TEXT NOT NULL, staffName TEXT NOT NULL, foldCount INTEGER NOT NULL, rate REAL NOT NULL, total REAL NOT NULL, createdAt TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS disbursement_expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, expenseDate TEXT NOT NULL, number TEXT NOT NULL, name TEXT NOT NULL, category TEXT NOT NULL, description TEXT, amount REAL NOT NULL);
    CREATE TABLE IF NOT EXISTS daily_sales (id INTEGER PRIMARY KEY AUTOINCREMENT, saleDate TEXT NOT NULL, saleNumber TEXT, cashAmount REAL NOT NULL, gcashAmount REAL NOT NULL, totalAmount REAL NOT NULL, notes TEXT);
    CREATE TABLE IF NOT EXISTS revolving_history (id INTEGER PRIMARY KEY AUTOINCREMENT, revolvingNumber TEXT NOT NULL, name TEXT NOT NULL, amount REAL NOT NULL, category TEXT NOT NULL, description TEXT, type TEXT NOT NULL, createdAt TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS machines (id INTEGER PRIMARY KEY AUTOINCREMENT, machineName TEXT NOT NULL, machineType TEXT NOT NULL, status TEXT NOT NULL, branch TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS subcleanings (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL, machineIds TEXT NOT NULL, machineNames TEXT NOT NULL, cleaningStatus TEXT NOT NULL, notes TEXT, branch TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY NOT NULL, value TEXT NOT NULL);
  `),await P(e,"staff","email","TEXT"),await P(e,"staff","password","TEXT"),await P(e,"staff","role","TEXT"),await P(e,"staff","isActive","INTEGER NOT NULL DEFAULT 1"),await e.run('UPDATE staff SET password = ? WHERE password IS NULL OR password = ""',["password"]),await e.run('UPDATE staff SET role = ? WHERE role IS NULL OR role = ""',["staff"]),await P(e,"orders","customerId","INTEGER NOT NULL DEFAULT 0"),await P(e,"orders","phone","TEXT"),await P(e,"orders","serviceId","INTEGER NOT NULL DEFAULT 0"),await P(e,"orders","serviceLines","TEXT"),await P(e,"orders","itemCategoryId","INTEGER NOT NULL DEFAULT 0"),await P(e,"orders","itemCategory",'TEXT NOT NULL DEFAULT "Regular Clothes"'),await P(e,"orders","workflowCompleted","TEXT"),await P(e,"orders","weightKg","REAL NOT NULL DEFAULT 0"),await P(e,"orders","price","REAL NOT NULL DEFAULT 0"),await P(e,"orders","additionalCharge","REAL NOT NULL DEFAULT 0"),await P(e,"orders","extraServiceAmount","REAL NOT NULL DEFAULT 0"),await P(e,"orders","totalAmount","REAL NOT NULL DEFAULT 0"),await P(e,"orders","paidAmount","REAL NOT NULL DEFAULT 0"),await P(e,"orders","extras","TEXT"),await P(e,"orders","notes","TEXT"),await P(e,"orders","dueAt","TEXT"),await P(e,"orders","createdAt",'TEXT NOT NULL DEFAULT ""'),await P(e,"daily_sales","saleNumber","TEXT"),await P(e,"daily_sales","status","TEXT"),await P(e,"daily_sales","endorsedTo","TEXT"),await P(e,"daily_sales","statusUpdatedAt","TEXT");const a=((await e.query("SELECT COUNT(*) as count FROM staff")).values?.[0]?.count??0)===0;if(a){for(const r of H)await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[r.id,r.name,r.email,r.password,r.role,r.branch,1]);for(const r of Se)await e.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[r.id,r.name,r.phone,r.address]);for(const r of K)await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[r.id,r.name,r.description,r.category,r.serviceType,r.price,r.maxKg,r.dryingMinutes,JSON.stringify(r.includes),r.additionalCharge,r.turnaroundHours,r.isActive]);for(const r of Q)await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[r.id,r.name,r.maxKg,r.additionalFee,r.isActive]);for(const r of J)await ot(e,r);for(const r of ne)await e.run("INSERT INTO payments (id, orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?, ?)",[r.id,r.orderId,r.amount,r.method,r.reference,r.receivedAt,r.branch]);for(const r of Z)await e.run("INSERT INTO disbursement_expenses (id, expenseDate, number, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?, ?)",[r.id,r.expenseDate,r.number,r.name,r.category,r.description,r.amount]);for(const r of se)await e.run("INSERT INTO daily_sales (id, saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?, ?)",[r.id,r.saleDate,r.saleNumber,r.cashAmount,r.gcashAmount,r.totalAmount,r.notes]);for(const r of ie)await e.run("INSERT INTO revolving_history (id, revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[r.id,r.revolvingNumber,r.name,r.amount,r.category,r.description,r.type,r.createdAt]);for(const r of G)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[r.id,r.machineName,r.machineType,r.status,r.branch]);for(const r of oe)await e.run("INSERT INTO settings (key, value) VALUES (?, ?)",[r.key,r.value]);await e.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",["fresh_install_defaults",z()])}await Te(e),await st(e),a||await it(e),await Jt(e)}async function ot(e,t){await e.run("INSERT INTO orders (id, ticket, customerId, customer, phone, serviceId, service, serviceLines, itemCategoryId, itemCategory, branch, status, workflowCompleted, weightKg, price, additionalCharge, extraServiceAmount, totalAmount, paidAmount, extras, notes, foldedBy, dueAt, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.ticket,t.customerId,t.customer,t.phone,t.serviceId,t.service,JSON.stringify(t.serviceLines??[]),t.itemCategoryId,t.itemCategory,t.branch,t.status,JSON.stringify(t.workflowCompleted),t.weightKg,t.price,t.additionalCharge,t.extraServiceAmount,t.totalAmount,t.paidAmount,JSON.stringify(t.extras),t.notes,t.foldedBy,t.dueAt,t.createdAt])}function Zt(e){const t=Number(e.paidAmount??0),a=Number(e.totalAmount??0),r=Number(e.foldedBy),n=V(e.serviceLines,[]),s=Number(e.serviceId),i=String(e.service),c=Number(e.price);return{id:Number(e.id),ticket:String(e.ticket),customerId:Number(e.customerId),customer:String(e.customer),phone:e.phone?String(e.phone):null,serviceId:s,service:i,serviceLines:n.length?n:[{id:s,name:i,price:c,quantity:1,total:c}],itemCategoryId:Number(e.itemCategoryId),itemCategory:String(e.itemCategory),branch:String(e.branch),status:String(e.status),workflowCompleted:V(e.workflowCompleted,[]),weightKg:Number(e.weightKg),price:c,additionalCharge:Number(e.additionalCharge),extraServiceAmount:Number(e.extraServiceAmount),totalAmount:a,paidAmount:t,balance:Number((a-t).toFixed(2)),extras:V(e.extras,[]),notes:e.notes?String(e.notes):null,foldedBy:Number.isFinite(r)&&r>0?r:null,foldedByName:e.foldedByName?String(e.foldedByName):null,dueAt:String(e.dueAt),createdAt:String(e.createdAt)}}async function ea(){await zt()}async function le(){return(await Pe()).find(t=>t.key==="branch")?.value??"Main Store"}async function ta(){const e=await Pe();return Number(e.find(t=>t.key==="fold_rate")?.value??"5")}async function ct(e){return(await Pe()).find(a=>a.key===e)?.value}async function Pe(){return A.isNativePlatform()?(await(await C()).query("SELECT key, value FROM settings ORDER BY key")).values??[]:N("settings",oe)}async function ge(e,t){if(!A.isNativePlatform()){const r=N("settings",oe).filter(n=>n.key!==e);r.push({key:e,value:t}),S("settings",r);return}await(await C()).run("REPLACE INTO settings (key, value) VALUES (?, ?)",[e,t])}async function aa(e){return A.isNativePlatform()?(await(await C()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff WHERE branch = ? ORDER BY name ASC',[e])).values??[]:N("staff",H).filter(r=>r.branch===e)}async function lt(){return A.isNativePlatform()?(await(await C()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff ORDER BY name ASC')).values??[]:N("staff",H)}async function dt(e,t){const a=e.trim().toLowerCase();return(await lt()).find(n=>n.email.toLowerCase()===a&&n.password===t&&n.isActive!==0)??null}async function ra(e){if(!A.isNativePlatform()){const a=N("staff",H);a.unshift({id:M(a),...e,isActive:1}),S("staff",a);return}await(await C()).run("INSERT INTO staff (name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?)",[e.name,e.email,e.password,e.role,e.branch,1])}async function Ve(e,t){if(!A.isNativePlatform()){const s=N("staff",H),i=s.find(c=>c.id===e);i&&(Object.assign(i,t),S("staff",s));return}const a=await C(),r=[],n=[];for(const[s,i]of Object.entries(t))s!=="id"&&(r.push(`${s} = ?`),n.push(i));r.length&&(n.push(e),await a.run(`UPDATE staff SET ${r.join(", ")} WHERE id = ?`,n))}async function na(){return A.isNativePlatform()?(await(await C()).query("SELECT id, name, phone, address FROM customers ORDER BY name ASC")).values??[]:N("customers",Se).sort((a,r)=>a.name.localeCompare(r.name))}async function sa(e){if(!A.isNativePlatform()){const n=N("customers",Se),s=e.id?n.find(c=>c.id===e.id):n.find(c=>c.name.toLowerCase()===e.name.toLowerCase()&&(e.phone?c.phone===e.phone:!0));if(s)return s.name=e.name,s.phone=e.phone??s.phone,s.address=e.address??s.address,S("customers",n),s;const i={id:M(n),name:e.name,phone:e.phone??null,address:e.address??null};return n.push(i),S("customers",n),i}const t=await C();if(e.id)return await t.run("UPDATE customers SET name = ?, phone = ?, address = ? WHERE id = ?",[e.name,e.phone??null,e.address??null,e.id]),{id:e.id,name:e.name,phone:e.phone??null,address:e.address??null};const a=await t.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM customers"),r=Number((a.values?.[0]).id);return await t.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[r,e.name,e.phone??null,e.address??null]),{id:r,name:e.name,phone:e.phone??null,address:e.address??null}}async function Ie(e){if(!A.isNativePlatform())return N("services",K).filter(r=>!0);const t=await C(),a=await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[]);return(a.values??[]).length===0?(await Te(t),((await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[])).values??[]).map(n=>({...n,includes:V(n.includes,[])}))):(a.values??[]).map(r=>({...r,includes:V(r.includes,[])}))}async function ia(){if(!A.isNativePlatform())return N("services",K);const e=await C(),t=await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC");return(t.values??[]).length===0?(await Te(e),((await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC")).values??[]).map(r=>({...r,includes:V(r.includes,[])}))):(t.values??[]).map(a=>({...a,includes:V(a.includes,[])}))}async function Ye(e){if(!A.isNativePlatform()){const a=N("services",K),r=e.id?a.find(n=>n.id===e.id):null;r?Object.assign(r,e):a.unshift({...e,id:M(a)}),S("services",a);return}const t=await C();e.id?await t.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = ? WHERE id = ?",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive,e.id]):await t.run("INSERT INTO laundry_services (name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive])}async function ut(){if(!A.isNativePlatform())return N("item_categories",Q).filter(a=>a.isActive);const e=await C(),t=await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC");return(t.values??[]).length===0?(await Te(e),(await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC")).values??[]):t.values??[]}async function oa(e){if(!A.isNativePlatform()){const a=N("item_categories",Q),r=e.id?a.find(n=>n.id===e.id):null;r?Object.assign(r,e):a.unshift({...e,id:M(a)}),S("item_categories",a);return}const t=await C();e.id?await t.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = ? WHERE id = ?",[e.name,e.maxKg,e.additionalFee,e.isActive,e.id]):await t.run("INSERT INTO item_categories (name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?)",[e.name,e.maxKg,e.additionalFee,e.isActive])}function Oe(e,t,a,r){const n=(Array.isArray(e)?e:[e]).map(y=>{const m=Math.max(0,Number(y.quantity??1)),f=Number(y.price);return{id:y.id,name:y.name,price:f,quantity:m,total:Number((f*m).toFixed(2))}}).filter(y=>y.quantity>0),s=Number(t.maxKg),i=0,c=0,d=r.map(y=>{const m=Math.max(0,Number(y.quantity??1)),f=Number(y.price);return{id:y.id,name:jt(y.name),price:f,quantity:m,total:Number((f*m).toFixed(2))}}).filter(y=>y.quantity>0),l=n.reduce((y,m)=>y+m.total,0),p=d.reduce((y,m)=>y+m.total,0),u=Number((l+c+p).toFixed(2));return{price:Number(l.toFixed(2)),additionalCharge:Number(c.toFixed(2)),extraServiceAmount:Number(p.toFixed(2)),totalAmount:u,allowedKg:s,extraKg:Number(i.toFixed(2)),warning:null,serviceLines:n,extras:d}}function mt(e,t){const a=e.serviceLines?.length?e.serviceLines.map(i=>i.id):[e.serviceId],r=t.filter(i=>a.includes(i.id)),n=Array.from(new Set(r.flatMap(i=>i.includes??[]))),s=[{key:"received",label:"Received"}];return n.includes("Wash")&&s.push({key:"wash",label:"Wash"}),e.extras.length&&s.push({key:"extras",label:"Extra services"}),(n.includes("Dry")||r.some(i=>(i.dryingMinutes??0)>0))&&s.push({key:"dry",label:"Dry"}),n.includes("Fold")&&s.push({key:"fold",label:"Fold"}),s.push({key:"ready",label:"Ready"},{key:"claimed",label:"Claimed"}),s}function ca(e){return e.includes("claimed")?"claimed":e.includes("ready")?"ready":e.includes("dry")?"drying":e.includes("extras")||e.includes("wash")?"washing":"received"}async function de(e){return A.isNativePlatform()?((await(await C()).query("SELECT o.*, s.name as foldedByName FROM orders o LEFT JOIN staff s ON s.id = o.foldedBy WHERE o.branch = ? ORDER BY o.id DESC",[e])).values??[]).map(r=>Zt(r)):N("orders",J).filter(r=>r.branch===e).map(r=>({...r,serviceLines:r.serviceLines??[{id:r.serviceId,name:r.service,price:Number(r.price),quantity:1,total:Number(r.price)}],balance:Number((r.totalAmount-r.paidAmount).toFixed(2))}))}async function la(e){const[t,a]=await Promise.all([Ie(),ut()]),r=e.serviceQuantities??(e.serviceId?{[e.serviceId]:1}:{}),n=t.filter(g=>g.serviceType==="order"&&Number(r[g.id]??0)>0).map(g=>({...g,quantity:Number(r[g.id]??0)})),s=n[0],i=a.find(g=>g.id===e.itemCategoryId)??a.find(g=>g.name.toLowerCase()===(s?.category??"").toLowerCase())??a.find(g=>g.name==="Regular Clothes")??a[0];if(!n.length||!s||!i)throw new Error("Please select at least one service.");const c=e.addonQuantities??Object.fromEntries((e.addonIds??[]).map(g=>[g,1])),d=t.filter(g=>g.serviceType==="addon"&&Number(c[g.id]??0)>0).map(g=>({...g,quantity:Number(c[g.id]??0)})),l=e.weightKg??Math.max(1,Number(i.maxKg||s.maxKg||1)),p=Oe(n,i,l,d),u=await sa({id:e.customerId||void 0,name:e.customerName,phone:e.customerPhone??null}),y=Math.max(0,e.paidAmount),m=Math.min(p.totalAmount,y),f={ticket:await da(),customerId:u.id,customer:u.name,phone:u.phone,serviceId:s.id,service:p.serviceLines.map(g=>`${g.name} x${g.quantity}`).join(", "),serviceLines:p.serviceLines,itemCategoryId:i.id,itemCategory:i.name,branch:e.branch,status:"received",workflowCompleted:["received"],weightKg:l,price:p.price,additionalCharge:p.additionalCharge,extraServiceAmount:p.extraServiceAmount,totalAmount:p.totalAmount,paidAmount:m,balance:Number((p.totalAmount-m).toFixed(2)),extras:p.extras,notes:e.notes||null,foldedBy:null,foldedByName:null,dueAt:new Date(Date.now()+Math.max(...n.map(g=>g.turnaroundHours))*60*60*1e3).toISOString(),createdAt:z()};if(!A.isNativePlatform()){const g=N("orders",J),R={...f,id:M(g)};return g.unshift(R),S("orders",g),y>0&&await vt(R.id,{amount:y,method:e.paymentMethod,reference:e.paymentReference??null}),R}const T=await C(),h=await T.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM orders"),w={...f,id:Number((h.values?.[0]).id)};return await ot(T,w),y>0&&await T.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[w.id,y,e.paymentMethod,e.paymentReference??null,z(),e.branch]),w}async function da(){const e=`LB${Kt()}`,t=await le(),r=(await de(t)).filter(s=>s.ticket.startsWith(e)).sort((s,i)=>i.ticket.localeCompare(s.ticket))[0],n=r?Number(r.ticket.slice(-3))+1:1;return`${e}-${String(n).padStart(3,"0")}`}async function ua(e,t){const a=await le(),[r,n]=await Promise.all([de(a),Ie()]),s=r.find(l=>l.id===e);if(!s)return;const c=mt(s,n).map(l=>l.key).find(l=>!s.workflowCompleted.includes(l));if(!c)return;if(s.workflowCompleted=[...s.workflowCompleted,c],s.status=ca(s.workflowCompleted),c==="fold"&&t&&(s.foldedBy=t),!A.isNativePlatform()){const l=N("orders",J),p=l.find(u=>u.id===s.id);p&&Object.assign(p,s),S("orders",l);return}await(await C()).run("UPDATE orders SET workflowCompleted = ?, status = ?, foldedBy = ? WHERE id = ?",[JSON.stringify(s.workflowCompleted),s.status,s.foldedBy,s.id])}async function vt(e,t){const a=await le();if(!(await de(a)).find(c=>c.id===e))return;const s=Math.max(0,t.amount);if(s<=0)return;if(!A.isNativePlatform()){const c=N("payments",ne);c.unshift({id:M(c),orderId:e,amount:s,method:t.method,reference:t.reference??null,receivedAt:z(),branch:a}),S("payments",c);const d=N("orders",J),l=d.find(p=>p.id===e);l&&(l.paidAmount=Math.min(l.totalAmount,Number((l.paidAmount+s).toFixed(2)))),S("orders",d);return}const i=await C();await i.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[e,s,t.method,t.reference??null,z(),a]),await i.run("UPDATE orders SET paidAmount = MIN(totalAmount, paidAmount + ?) WHERE id = ?",[s,e])}async function ma(e){return A.isNativePlatform()?(await(await C()).query("SELECT id, orderId, amount, method, reference, receivedAt, branch FROM payments  ORDER BY receivedAt DESC",[])).values??[]:N("payments",ne).filter(r=>!0)}async function va(e){const t=await le(),r=(await de(t)).find(s=>s.id===e);if(!r)return;if(r.paidAmount>0)throw new Error("Cancel is only allowed for unpaid orders. Use Delete (admin) to refund paid orders.");if(!A.isNativePlatform()){const s=N("orders",J),i=N("payments",ne),c=N("fold_logs",[]),d=s.filter(u=>u.id!==e),l=i.filter(u=>u.orderId!==e),p=c.filter(u=>u.orderTicket!==r.ticket);S("orders",d),S("payments",l),S("fold_logs",p);return}const n=await C();await n.run("DELETE FROM payments WHERE orderId = ?",[e]),await n.run("DELETE FROM fold_logs WHERE orderTicket = ?",[r.ticket]),await n.run("DELETE FROM orders WHERE id = ?",[e])}async function pa(e){const t=await le(),r=(await de(t)).find(s=>s.id===e);if(!r)return;if(r.paidAmount<=0)throw new Error("Delete (refund) is only allowed for paid orders.");if(!A.isNativePlatform()){const s=N("orders",J),i=N("payments",ne),c=N("fold_logs",[]),d=s.filter(u=>u.id!==e),l=i.filter(u=>u.orderId!==e),p=c.filter(u=>u.orderTicket!==r.ticket);S("orders",d),S("payments",l),S("fold_logs",p);return}const n=await C();await n.run("DELETE FROM payments WHERE orderId = ?",[e]),await n.run("DELETE FROM fold_logs WHERE orderTicket = ?",[r.ticket]),await n.run("DELETE FROM orders WHERE id = ?",[e])}async function fa(){return A.isNativePlatform()?(await(await C()).query("SELECT id, orderTicket, staffName, foldCount, rate, total, createdAt FROM fold_logs ORDER BY id DESC")).values??[]:N("fold_logs",[])}async function ya(e){const t=Number((e.foldCount*e.rate).toFixed(2));if(!A.isNativePlatform()){const r=N("fold_logs",[]);r.unshift({id:Date.now(),...e,total:t,createdAt:z()}),S("fold_logs",r);return}await(await C()).run("INSERT INTO fold_logs (orderTicket, staffName, foldCount, rate, total, createdAt) VALUES (?, ?, ?, ?, ?, ?)",[e.orderTicket,e.staffName,e.foldCount,e.rate,t,z()])}async function ha(){return A.isNativePlatform()?(await(await C()).query("SELECT id, expenseDate, number, name, category, description, amount FROM disbursement_expenses ORDER BY expenseDate DESC, id DESC")).values??[]:N("expenses",Z)}function Ae(e){const t=/^DISB-(\d+)$/i.exec(String(e??"").trim());return t?Number(t[1]):0}function Qe(e){const t=/^REV-(\d+)$/i.exec(String(e??"").trim());return t?Number(t[1]):0}async function ga(){let e=0;if(!A.isNativePlatform()){const n=N("expenses",Z),s=N("revolving_history",ie);for(const i of n)e=Math.max(e,Ae(i.number));for(const i of s)i.type==="disbursement"&&(e=Math.max(e,Ae(i.revolvingNumber)));return e}const t=await C(),a=await t.query("SELECT number FROM disbursement_expenses"),r=await t.query("SELECT revolvingNumber as number FROM revolving_history WHERE type = 'disbursement'");for(const n of[...a.values??[],...r.values??[]])e=Math.max(e,Ae(String(n.number)));return e}async function pt(){const e=await ga()+1;return`DISB-${String(e).padStart(2,"0")}`}async function ba(){let e=0;if(!A.isNativePlatform()){const r=N("revolving_history",ie);for(const n of r)n.type==="add"&&(e=Math.max(e,Qe(n.revolvingNumber)));return`REV-${String(e+1).padStart(2,"0")}`}const a=await(await C()).query("SELECT revolvingNumber FROM revolving_history WHERE type = 'add'");for(const r of a.values??[])e=Math.max(e,Qe(String(r.revolvingNumber)));return`REV-${String(e+1).padStart(2,"0")}`}async function ft(e){if(!A.isNativePlatform()){const a=N("expenses",Z),r=M(a);a.unshift({id:r,expenseDate:e.expenseDate,number:e.number,name:e.name,category:e.category,description:e.description||null,amount:e.amount}),S("expenses",a);return}await(await C()).run("INSERT INTO disbursement_expenses (expenseDate, number, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?)",[e.expenseDate,e.number,e.name,e.category,e.description||null,e.amount])}async function Ea(e){const t=await pt();await ft({expenseDate:e.expenseDate,number:t,name:e.name,category:e.category,description:e.description,amount:e.amount})}async function Sa(e,t){if(!A.isNativePlatform()){const r=N("expenses",Z),n=r.find(s=>s.id===e);n&&(Object.assign(n,{expenseDate:t.expenseDate,name:t.name,category:t.category,description:t.description||null,amount:t.amount}),S("expenses",r));return}await(await C()).run("UPDATE disbursement_expenses SET expenseDate = ?, name = ?, category = ?, description = ?, amount = ? WHERE id = ?",[t.expenseDate,t.name,t.category,t.description||null,t.amount,e])}async function wa(e){if(!A.isNativePlatform()){const a=N("expenses",Z);S("expenses",a.filter(r=>r.id!==e));return}await(await C()).run("DELETE FROM disbursement_expenses WHERE id = ?",[e])}async function Ta(){return A.isNativePlatform()?(await(await C()).query('SELECT id, saleDate, COALESCE(saleNumber, "") as saleNumber, cashAmount, gcashAmount, totalAmount, notes, status, endorsedTo, statusUpdatedAt FROM daily_sales ORDER BY saleDate DESC, id DESC')).values??[]:N("sales",se)}async function Na(e){const t=Number((e.cashAmount+e.gcashAmount).toFixed(2));if(!A.isNativePlatform()){const s=N("sales",se),i=e.id?s.find(c=>c.id===e.id):s.find(c=>c.saleDate===e.saleDate);if(i)Object.assign(i,{saleDate:e.saleDate,cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null});else{const c=M(s);s.unshift({id:c,saleDate:e.saleDate,saleNumber:`SALE-${String(c).padStart(2,"0")}`,cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null})}S("sales",s);return}const a=await C(),n=(e.id?await a.query("SELECT id, saleNumber FROM daily_sales WHERE id = ?",[e.id]):await a.query("SELECT id, saleNumber FROM daily_sales WHERE saleDate = ?",[e.saleDate])).values?.[0];if(n)await a.run("UPDATE daily_sales SET saleDate = ?, cashAmount = ?, gcashAmount = ?, totalAmount = ?, notes = ? WHERE id = ?",[e.saleDate,e.cashAmount,e.gcashAmount,t,e.notes||null,n.id]);else{const s=await a.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM daily_sales"),i=Number((s.values?.[0]).id);await a.run("INSERT INTO daily_sales (saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?)",[e.saleDate,`SALE-${String(i).padStart(2,"0")}`,e.cashAmount,e.gcashAmount,t,e.notes||null])}}async function Aa(e){if(!A.isNativePlatform()){const a=N("sales",se);S("sales",a.filter(r=>r.id!==e));return}await(await C()).run("DELETE FROM daily_sales WHERE id = ?",[e])}async function Je(e,t,a=null,r){if(!A.isNativePlatform()){const s=N("sales",se),i=s.find(c=>c.id===e);i&&(i.status=t,i.endorsedTo=a,i.statusUpdatedAt=r,S("sales",s));return}await(await C()).run("UPDATE daily_sales SET status = ?, endorsedTo = ?, statusUpdatedAt = ? WHERE id = ?",[t,a,r,e])}async function La(){return A.isNativePlatform()?(await(await C()).query("SELECT id, revolvingNumber, name, amount, category, description, type, createdAt FROM revolving_history ORDER BY createdAt DESC, id DESC")).values??[]:N("revolving_history",ie).sort((a,r)=>r.createdAt.localeCompare(a.createdAt))}async function ze(e){const t=e.type==="disbursement"?await pt():await ba();if(e.type==="disbursement"){const r=e.expenseDate??e.createdAt.slice(0,10);await ft({expenseDate:r,number:t,name:e.name,category:e.category,description:e.description??"",amount:e.amount})}if(!A.isNativePlatform()){const r=N("revolving_history",ie),n=M(r);r.unshift({id:n,revolvingNumber:t,...e}),S("revolving_history",r);return}await(await C()).run("INSERT INTO revolving_history (revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)",[t,e.name,e.amount,e.category,e.description||null,e.type,e.createdAt])}async function yt(e){return A.isNativePlatform()?(await(await C()).query("SELECT id, machineName, machineType, status, branch FROM machines WHERE branch = ? ORDER BY machineType, machineName",[e])).values??[]:N("machines",G).filter(r=>r.branch===e)}async function Ca(e){if(!A.isNativePlatform()){const a=N("machines",G);a.unshift({id:M(a),...e}),S("machines",a);return}await(await C()).run("INSERT INTO machines (machineName, machineType, status, branch) VALUES (?, ?, ?, ?)",[e.machineName,e.machineType,e.status,e.branch])}async function $a(e,t){if(!A.isNativePlatform()){const r=N("machines",G),n=r.find(s=>s.id===e);n&&(n.status=t,S("machines",r));return}await(await C()).run("UPDATE machines SET status = ? WHERE id = ?",[t,e])}async function Ra(e){return A.isNativePlatform()?((await(await C()).query("SELECT id, date, machineIds, machineNames, cleaningStatus, notes, branch FROM subcleanings WHERE branch = ? ORDER BY date DESC, id DESC",[e])).values??[]).map(r=>({...r,machineIds:V(r.machineIds,[])})):N("subcleanings",[]).filter(r=>r.branch===e)}async function Oa(e){const a=(await yt(e.branch)).filter(s=>e.machineIds.includes(s.id)).map(s=>s.machineName).join(", ");if(!A.isNativePlatform()){const s=N("subcleanings",[]);s.unshift({id:M(s),date:e.date,machineIds:e.machineIds,machineNames:a,cleaningStatus:e.cleaningStatus,notes:e.notes||null,branch:e.branch}),S("subcleanings",s);const i=N("machines",G);i.forEach(c=>{e.machineIds.includes(c.id)&&(c.status=e.cleaningStatus==="completed"?"available":"under_cleaning")}),S("machines",i);return}const r=await C();await r.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, notes, branch) VALUES (?, ?, ?, ?, ?, ?)",[e.date,JSON.stringify(e.machineIds),a,e.cleaningStatus,e.notes||null,e.branch]);const n=e.cleaningStatus==="completed"?"available":"under_cleaning";for(const s of e.machineIds)await r.run("UPDATE machines SET status = ? WHERE id = ?",[n,s])}async function Da(e,t){if(!A.isNativePlatform()){const i=N("machines",G),c=i.find(p=>p.id===e);c&&(c.status="available"),S("machines",i);const d=N("subcleanings",[]),l=Re();d.unshift({id:M(d),date:l,machineIds:[e],machineNames:c?.machineName??"",cleaningStatus:"completed",notes:null,branch:t}),S("subcleanings",d);return}const a=await C(),n=(await a.query("SELECT machineName FROM machines WHERE id = ?",[e])).values?.[0]?.machineName??"";await a.run("UPDATE machines SET status = ? WHERE id = ?",["available",e]);const s=Re();await a.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, notes, branch) VALUES (?, ?, ?, ?, ?, ?)",[s,JSON.stringify([e]),n,"completed",null,t])}const qe=document.querySelector("#app");if(!qe)throw new Error("App root not found");let fe;const ce=ee("BluetoothThermalPrinter"),Fe={dashboard:"Dashboard",pos:"POS",orders:"Orders",archived:"Archived Order",customers:"Customers",pricing:"Pricing Services",disbursements:"Daily Report",reports:"Reports",inventory:"Inventory",maintenance:"Maintenance",staff:"Staff",revolving:"Revolving Fund",settings:"Settings"},o={tab:"dashboard",receiptOrderId:0,currentUser:null,loginError:"",sidebarOpen:!1,dailyReportTab:"expenses",maintenanceTab:"cleaning",customerSearch:"",orderSearch:"",orderDateFilter:"",orderPaymentFilter:"",printerPanelOpen:!1,printerLoading:!1,printerError:"",printerStatus:"",printerPaperWidth:58,pairedPrinters:[],selectedPrinterAddress:"",archivedOrderSearch:"",reportPreview:null,endorseModalOpen:!1,endorseSaleId:0,endorseSaleDate:"",revolvingModalOpen:!1,revolvingSaleId:0,addFundModalOpen:!1,disbursementModalOpen:!1,revolvingHistoryFrom:"",revolvingHistoryTo:""},xa=["Wash","Dry","Fold","Detergent","Fabcon","Zonrox"],ue="laba101-mobile-session";function $(e){return new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(e||0)}function v(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Y(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}function ke(e,t){return Number((e-t).toFixed(2))}function ht(e,t,a,r=0){const n=t.filter(i=>B(i.createdAt)===e).reduce((i,c)=>i+c.paidAmount,0),s=a.filter(i=>i.expenseDate===e).reduce((i,c)=>i+c.amount,0);return ke(n+r,s)}function Pa(e){const t=new Map;return e.filter(a=>a.workflowCompleted.includes("fold")&&a.foldedByName).forEach(a=>{const r=a.foldedByName,n=t.get(r)??{staffName:r,folds:0};n.folds+=1,t.set(r,n)}),Array.from(t.values())}function me(e=new Date){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${r}`}function j(){return me()}function B(e){return me(new Date(e))}function Ue(e){return e.paidAmount<=0?"unpaid":e.balance>0?"partial":"paid"}function ae(e){return new Intl.DateTimeFormat("en-PH",{dateStyle:"medium",timeStyle:"short"}).format(new Date(e))}function Ia(e){const t=new Date(e),a=new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric",year:"numeric"}).format(t),r=new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",hour12:!0}).format(t);return`<div class="datetime-stack"><strong>${v(a)}</strong><span class="meta">${v(r)}</span></div>`}function qa(e){return e?.role==="staff"&&e.branch==="Gensan Branch"}function Fa(e){return e?.role==="staff"&&e.branch.toLowerCase().includes("mintal")}function we(e,t,a="data-table"){return`
    <div class="table-scroll">
      <table class="${a}">
        <thead><tr>${e.map(r=>`<th>${v(r)}</th>`).join("")}</tr></thead>
        <tbody>${t.length?t.map(r=>`<tr>${r.map(n=>`<td>${n}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${e.length}" class="table-empty">No records found.</td></tr>`}</tbody>
      </table>
    </div>
  `}function ka(e=new Date){return{date:new Intl.DateTimeFormat("en-PH",{weekday:"long",month:"long",day:"numeric",year:"numeric"}).format(e),time:new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",second:"2-digit",hour12:!0}).format(e)}}function ye(){const e=document.querySelector("[data-date-from]"),t=document.querySelector("[data-date-to]"),a=Array.from(document.querySelectorAll('input[name="reportType"]:checked')).map(r=>r.value).filter(r=>r==="sales"||r==="disbursement"||r==="fold_count"||r==="revolving_fund"||r==="summary");return{from:e?.value||"0000-01-01",to:t?.value||"9999-12-31",types:a.length?a:["summary"]}}function he(e,t){return e>=t.from&&e<=t.to}function gt(e,t,a,r,n,s){const i=new Set(s.types),c=e.filter(b=>he(B(b.createdAt),s)),d=t.filter(b=>he(b.saleDate,s)),l=a.filter(b=>he(b.expenseDate,s)),p=Pa(c),u=c.reduce((b,x)=>b+x.paidAmount,0),y=d.reduce((b,x)=>b+x.cashAmount,0),m=d.reduce((b,x)=>b+x.gcashAmount,0),f=0,T=u+y,h=f+m,w=T+h,g=l.reduce((b,x)=>b+x.amount,0),R=g,L=w-R,I=()=>({orderCashTotal:u,orderGcashTotal:f,manualCashTotal:y,manualGcashTotal:m,totalCash:T,totalGcash:h,totalSales:w,rows:[["Type","Date","Number","Name","Cash","GCash","Total","Balance"],...c.map(b=>["Order",B(b.createdAt),b.ticket,b.customer,b.paidAmount,0,b.paidAmount,b.balance]),...d.map(b=>["Manual Sale",b.saleDate,b.saleNumber,b.notes??"",b.cashAmount,b.gcashAmount,b.totalAmount,""]),[],["Sales Summary",s.from,"to",s.to,"","","",""],["Order Cash","","","","","",u,""],["Order GCash","","","","","",f,""],["Manual Cash","","","","","",y,""],["Manual GCash","","","","","",m,""],["Total Cash","","","","","",T,""],["Total GCash","","","","","",h,""],["Total Sales","","","","","",w,""]]}),_=()=>({totalExpenses:g,totalDisbursement:R,rows:[["Type","Date","Number","Name","Amount"],...l.map(b=>["Expense",b.expenseDate,b.number,b.name,b.amount]),[],["Disbursement Summary",s.from,"to",s.to,""],["Expenses","","","",g],["Total Disbursement","","","",R]]}),F=()=>({rows:[["Staff","Fold Count"],...p.map(b=>[b.staffName,b.folds]),[],["Total Folds",p.reduce((b,x)=>b+x.folds,0)]]}),D=r.filter(b=>he(B(b.createdAt),s));return{selection:s,selectedTypes:i,salesRows:I,disbursementRows:_,foldCountRows:F,revolvingDailySummaryRows:()=>({rows:[["Date of Sales","Cash on Hand","Status","Date Update"],...d.map(b=>{const x=ht(b.saleDate,e,a,b.cashAmount),te=b.status==="revolving"?"Revolving":b.status==="endorsed"?`Endorsed to ${b.endorsedTo??""}`:"Pending";return[b.saleDate,x,te,b.statusUpdatedAt?B(b.statusUpdatedAt):""]})]}),revolvingHistoryRows:()=>({rows:[["Date","Number","Name","Amount","Category","Description","Type"],...D.map(b=>[B(b.createdAt),b.revolvingNumber,b.name,b.type==="disbursement"?-b.amount:b.amount,b.category,b.description??"",b.type==="add"?"Add Revolving Fund":"Disbursement"])]}),summaryRows:()=>{const b=I(),x=_();return[["Summary",s.from,"to",s.to,"","","",""],["Order Cash","","","","","",b.orderCashTotal,""],["Order GCash","","","","","",b.orderGcashTotal,""],["Manual Cash","","","","","",b.manualCashTotal,""],["Manual GCash","","","","","",b.manualGcashTotal,""],["Total Cash","","","","","",b.totalCash,""],["Total GCash","","","","","",b.totalGcash,""],["Total Sales","","","","","",b.totalSales,""],["Total Disbursement","","","","","",x.totalDisbursement,""],["Profit","","","","","",L,""],["Cash on Hand","","","","","",ke(b.totalCash,x.totalDisbursement),""]]},profit:L}}function Ua(e,t){return`<button class="nav-link ${t?"is-active":""}" data-tab="${e}" type="button">
    <span class="nav-icon">${Ma(e)}</span>
    <span>${Fe[e]}</span>
  </button>`}function O(e,t){return`<div class="section-head"><div><h2>${v(e)}</h2><p class="meta">${v(t)}</p></div></div>`}function Ze(){return Fe[o.tab]??"Dashboard"}function Le(e){return(e?.name??"Laba101").trim().slice(0,1).toUpperCase()}function Ma(e){return{dashboard:"DB",pos:"POS",orders:"PO",archived:"AR",customers:"CU",pricing:"PS",disbursements:"DR",reports:"RP",inventory:"IN",maintenance:"MT",staff:"ST",revolving:"RV",settings:"SE"}[e]}async function bt(){const e=await le(),t=await aa(e),a=await lt(),r=await na(),n=await Ie(),s=await ia(),i=await ut(),c=await de(e),d=await ma(),l=await fa(),p=await ha(),u=await Ta(),y=await yt(e),m=await Ra(e),f=await La(),T=await ta(),h=await ct("report_email");return{branch:e,staff:t,allStaff:a,customers:r,services:n,allServices:s,categories:i,orders:c,payments:d,foldLogs:l,expenses:p,sales:u,machines:y,subcleanings:m,revolvingHistory:f,foldRate:T,reportEmail:h??""}}async function E(){if(!o.currentUser){_a(),sr();return}const e=await bt();e.orders.filter(i=>i.status!=="claimed").length,e.orders.filter(i=>i.status==="ready").length,e.orders.reduce((i,c)=>i+c.paidAmount,0);const t=j(),a=e.orders.filter(i=>B(i.createdAt)===t).reduce((i,c)=>i+c.paidAmount,0)+e.sales.filter(i=>i.saleDate===t).reduce((i,c)=>i+c.totalAmount,0),r=e.payments.filter(i=>i.branch===e.branch&&i.method==="cash"&&B(i.receivedAt)===t).reduce((i,c)=>i+c.amount,0)+e.sales.filter(i=>i.saleDate===t).reduce((i,c)=>i+c.cashAmount,0),n=e.expenses.filter(i=>i.expenseDate===t).reduce((i,c)=>i+c.amount,0),s=ke(r,n);e.sales.reduce((i,c)=>i+c.totalAmount,0),e.expenses.reduce((i,c)=>i+c.amount,0),qe.innerHTML=`
    <div class="app-frame">
      <header class="topbar">
        <div class="topbar-left">
          <img src="/laba101-logo.svg" alt="Laba101" class="topbar-logo" />
          <div>
            <p class="eyebrow">Offline mobile system</p>
            <h1>${v(Ze())}</h1>
          </div>
        </div>
        <div class="topbar-actions">
          <div class="branch-pill"><span>Branch</span><strong>${v(e.branch)}</strong></div>
          <button class="icon-button" type="button" aria-label="Notifications">!</button>
          <button class="profile-pill" type="button">
            <span>${Le(o.currentUser)}</span>
            <strong>${v(o.currentUser.name)}</strong>
          </button>
        </div>
      </header>

      <button class="sidebar-backdrop ${o.sidebarOpen?"is-open":""}" id="sidebar-backdrop" type="button" aria-label="Close navigation"></button>

      <aside class="sidebar ${o.sidebarOpen?"is-open":""}">
        <div class="sidebar-mobile-head">
          <img src="/laba101-logo.svg" alt="Laba101" />
          <button class="sidebar-close" id="sidebar-close-button" type="button" aria-label="Close navigation">X</button>
        </div>
        <nav>${Et().map(i=>Ua(i,o.tab===i)).join("")}</nav>
        <div class="sidebar-fill">
          <div class="sidebar-branch-badge">
            <span>Active Branch</span>
            <strong>${v(e.branch)}</strong>
          </div>
          <p class="sidebar-app-name">Laba101 POS</p>
        </div>
        <div class="sidebar-user">
          <span class="avatar">${Le(o.currentUser)}</span>
          <div>
            <strong>${v(o.currentUser.name)}</strong>
            <small>${v(o.currentUser.email)} / ${v(o.currentUser.role)}</small>
          </div>
          <button class="logout-button" id="logout-button" type="button">Logout</button>
        </div>
      </aside>


      <main class="workspace">
        <header class="mobile-topbar">
          <button class="menu-button" id="mobile-menu-button" type="button" aria-label="Open navigation"><span></span><span></span><span></span></button>
          <img src="/laba101-logo.svg" alt="Laba101" />
          <div class="mobile-title">
            <p class="eyebrow">Laba101</p>
            <h2>${v(Ze())}</h2>
          </div>
          <div class="navbar-time">
            <strong data-navbar-time>--:--</strong>
            <span data-navbar-date>Loading...</span>
          </div>
          <button class="mobile-avatar" type="button">${Le(o.currentUser)}</button>
        </header>

        ${o.tab==="dashboard"?ja({paidToday:a,cashPaidToday:r,disbursementToday:n,cashOnHandToday:s,orders:e.orders,payments:e.payments,sales:e.sales}):""}
        ${o.tab==="pos"?Ha(e.orders,e.customers,e.services,e.categories,e.payments,e.branch):""}
        ${o.tab==="orders"?Wa(e.orders,e.staff,e.services,e.payments):""}
        ${o.tab==="archived"?Xa(e.orders,e.staff,e.services,e.payments):""}
        ${o.tab==="customers"?Qa(e.customers,e.orders):""}
        ${o.tab==="pricing"?Ja(e.allServices,e.categories):""}
        ${o.tab==="disbursements"?za(e.expenses,e.sales):""}
        ${o.tab==="reports"?Za(e.orders,e.sales,e.expenses,e.revolvingHistory,e.foldRate):""}
        ${o.tab==="inventory"?er(e.services,e.categories):""}
        ${o.tab==="maintenance"?tr(e.machines,e.subcleanings,e.branch):""}
        ${o.tab==="staff"?ar(e.allStaff,e.branch):""}
        ${o.tab==="revolving"?yr(e.sales,e.revolvingHistory,e.orders,e.expenses):""}
        ${o.tab==="settings"?rr(e.branch,e.foldRate,e.reportEmail):""}
      </main>
    </div>
  `,nr(),or(e),cr(e.allServices),lr(e.expenses),dr(e.orders,e.sales,e.expenses,e.revolvingHistory,e.foldRate),ur(),mr(),vr(),pr(e.allStaff),hr(),fr(),ir()}function Et(){if(o.currentUser?.role==="admin")return Object.keys(Fe).filter(t=>t!=="inventory");const e=["dashboard","pos","orders","archived","disbursements","reports","maintenance","revolving"];return qa(o.currentUser)?["dashboard","disbursements","reports","maintenance","revolving"]:Fa(o.currentUser)?e.filter(t=>t!=="revolving"):e}function _a(){qe.innerHTML=`
    <main class="login-page">

      <section class="login-panel-wrap">
        <article class="login-panel">
          <header>
            <div class="login-mark"><img src="/laba101-logo.svg" alt="Laba101" /></div>
            <h2>Welcome back</h2>
            <p>Sign in to continue managing today&apos;s laundry operations.</p>
          </header>
          ${o.loginError?`<div class="alert">${v(o.loginError)}</div>`:""}
          <form id="login-form" class="form">
            <label>Email address<input name="email" type="email" autocomplete="username" placeholder="admin@laba101.test or staff@laba101.gensan" required /></label>
            <label>Password<input name="password" type="password" autocomplete="current-password" placeholder="password" required /></label>
            <label class="remember"><input name="remember" type="checkbox" value="1" /> Remember me on this device</label>
            <button class="primary" id="login-button" type="submit">Sign in</button>
          </form>
        </article>
      </section>
    </main>
  `}function Ba(){document.querySelectorAll("[data-fill-email]").forEach(e=>{e.addEventListener("click",()=>{const t=document.querySelector('input[name="email"]'),a=document.querySelector('input[name="password"]');t&&(t.value=e.dataset.fillEmail??""),a&&(a.value=e.dataset.fillPassword??"")})})}function ja(e){const t=new Date,a=Array.from({length:7},(i,c)=>{const d=new Date(t);return d.setDate(t.getDate()-(6-c)),new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric"}).format(d)}),r=Array.from({length:7},(i,c)=>{const d=new Date(t);d.setDate(t.getDate()-(6-c));const l=me(d),p=e.orders.filter(y=>B(y.createdAt)===l).reduce((y,m)=>y+m.paidAmount,0),u=e.sales.filter(y=>y.saleDate===l).reduce((y,m)=>y+m.totalAmount,0);return p+u}),n=Math.max(1,...r),s=210;return`
    <section class="dashboard-main">
      <article class="panel revenue-panel">
        ${O("Revenue overview","Paid amount for the last 7 days.")}
        <div class="stats compact dashboard-stats">
          <div class="stat"><span class="card-label">Paid Today</span><div class="value">${$(e.paidToday)}</div></div>
          <div class="stat"><span class="card-label">Cash Today</span><div class="value">${$(e.cashPaidToday)}</div></div>
          <div class="stat"><span class="card-label">Disbursement</span><div class="value">${$(e.disbursementToday)}</div></div>
          <div class="stat"><span class="card-label">Cash on Hand</span><div class="value">${$(e.cashOnHandToday)}</div></div>
        </div>
        <div class="chart-shell">
          <div class="mini-chart revenue-chart">
            ${r.map((i,c)=>{const d=Math.max(12,Math.round(i/n*s));return`<div class="chart-bar ${c===r.length-1?"is-today":""}"><span style="height:${d}px"></span><strong>${$(i)}</strong></div>`}).join("")}
          </div>
          <div class="chart-days">${a.map(i=>`<span>${v(i)}</span>`).join("")}</div>
        </div>
        <div class="chart-footnote">Values include POS payments and Daily Report sales input.</div>
      </article>
    </section>
  `}function Ha(e,t,a,r,n,s){const i=a.filter(u=>u.serviceType==="order"&&u.isActive),c=a.filter(u=>u.serviceType==="addon"&&u.isActive),d=o.receiptOrderId?e.find(u=>u.id===o.receiptOrderId):null,l=new Set(e.map(u=>u.customerId)),p=t.filter(u=>l.has(u.id));return`
    <section class="grid content full">
      <article class="panel span-2">
        ${O("New POS order","Tap a service, add extra quantities, and confirm the total")}
        <form id="order-form" class="form">
          <div class="form-row">
            <label>Existing customer (${v(s)})
              <select name="customerId">
                <option value="">-- New customer --</option>
                ${p.map(u=>`<option value="${u.id}" data-name="${v(u.name)}" data-phone="${v(u.phone??"")}">${v(u.name)} ${u.phone?`- ${v(u.phone)}`:""}</option>`).join("")}
              </select>
            </label>
            <label>Customer name<input name="customerName" required placeholder="Customer name" /></label>
          </div>
          <div class="form-row">
            <label>Phone<input name="customerPhone" placeholder="09..." /></label>
          </div>

          <fieldset class="service-picker">
            <legend>Services</legend>
            ${i.map(u=>`<div class="qty-card service-option service-quantity" data-qty-card="serviceQty-${u.id}">
              <span>
                <strong>${v(u.name)}</strong>
                <small>${v(u.description??u.category)} ${u.maxKg?` / max ${u.maxKg}kg`:""}</small>
              </span>
              <b>${$(u.price)}</b>
              <div class="qty-control">
                <button type="button" data-qty-minus="serviceQty-${u.id}" aria-label="Decrease ${v(u.name)}">-</button>
                <input type="number" name="serviceQty-${u.id}" min="0" step="1" value="0" inputmode="numeric" />
                <button type="button" data-qty-plus="serviceQty-${u.id}" aria-label="Increase ${v(u.name)}">+</button>
              </div>
            </div>`).join("")}
          </fieldset>

          <fieldset class="check-grid">
            <legend>Extra services</legend>
            ${c.length?c.map(u=>`<div class="qty-card addon-quantity" data-qty-card="addonQty-${u.id}">
              <span><strong>${v(Y(u.name))}</strong><small>${$(u.price)} each</small></span>
              <div class="qty-control">
                <button type="button" data-qty-minus="addonQty-${u.id}" aria-label="Decrease ${v(Y(u.name))}">-</button>
                <input type="number" name="addonQty-${u.id}" min="0" step="1" value="0" inputmode="numeric" />
                <button type="button" data-qty-plus="addonQty-${u.id}" aria-label="Increase ${v(Y(u.name))}">+</button>
              </div>
            </div>`).join(""):'<p class="helper">No extra services configured.</p>'}
          </fieldset>

          <div id="price-preview" class="price-preview"></div>
          <p class="form-error" data-order-error hidden></p>
          <div class="form-row">
            <label>Initial payment<input name="paidAmount" type="number" min="0" step="0.01" value="0" /></label>
            <label>Payment method
              <select name="paymentMethod">
                <option value="cash">Cash</option>
                <option value="gcash">GCash</option>
              </select>
            </label>
          </div>
          <label class="gcash-reference" hidden>GCash reference<input name="paymentReference" placeholder="Required for GCash payments" /></label>
          <label>Notes<textarea name="notes" placeholder="Special instructions"></textarea></label>
          <button class="primary" type="submit">Save order</button>
        </form>
      </article>

      ${d?Me(d,n.filter(u=>u.orderId===d.id)):""}
    </section>
  `}function Wa(e,t,a,r){const n=o.receiptOrderId?e.find(p=>p.id===o.receiptOrderId):null,s=e.filter(p=>p.status!=="claimed"),i=o.orderSearch.trim().toLowerCase(),c=o.orderDateFilter.trim(),d=o.orderPaymentFilter.trim().toLowerCase(),l=s.filter(p=>{const u=!i||[p.ticket,p.customer,p.phone,p.service,p.itemCategory,p.status].some(f=>String(f??"").toLowerCase().includes(i)),y=!c||B(p.createdAt)===c,m=!d||Ue(p)===d;return u&&y&&m});return`
    <section class="grid content full">
      <article class="panel span-2">
        ${O("Order queue","Workflow, payment, and receipts")}
        <form class="queue-filters" id="order-queue-filters">
          <label>
            <span>Search queue</span>
            <input name="orderSearch" type="search" placeholder="Ticket, name, service, status" value="${v(o.orderSearch)}" autocomplete="off" />
          </label>
          <label>
            <span>Filter date</span>
            <input name="orderDateFilter" type="date" value="${v(o.orderDateFilter)}" />
          </label>
          <label>
            <span>Payment</span>
            <select name="orderPaymentFilter">
              <option value="" ${o.orderPaymentFilter===""?"selected":""}>All</option>
              <option value="unpaid" ${o.orderPaymentFilter==="unpaid"?"selected":""}>Unpaid</option>
              <option value="partial" ${o.orderPaymentFilter==="partial"?"selected":""}>Partial</option>
              <option value="paid" ${o.orderPaymentFilter==="paid"?"selected":""}>Paid</option>
            </select>
          </label>
          <div class="search-actions queue-actions">
            <button class="primary" type="submit">Apply</button>
            <button class="secondary" type="button" id="order-queue-clear">Clear</button>
          </div>
        </form>
        <div class="summary-list queue-summary">
          <div><span>Active queue</span><strong>${l.length}</strong></div>
          <div><span>Claimed archived</span><strong>${e.filter(p=>p.status==="claimed").length}</strong></div>
        </div>
        <table class="data-table orders-data-table">
          <thead>
            <tr><th>Ticket</th><th>Customer</th><th>Service</th><th>Total Payment</th><th>Actions</th></tr>
          </thead>
          <tbody>
            ${l.map(p=>St(p,t,a)).join("")||'<tr><td colspan="5" class="table-empty">No matching active orders.</td></tr>'}
          </tbody>
        </table>
      </article>
      ${n?Me(n,r.filter(p=>p.orderId===n.id)):""}
    </section>
  `}function Xa(e,t,a,r){const n=e.filter(d=>d.status==="claimed"),s=o.archivedOrderSearch.trim().toLowerCase(),i=n.filter(d=>s?[d.ticket,d.customer,d.phone,d.service,d.itemCategory].some(l=>String(l??"").toLowerCase().includes(s)):!0),c=o.receiptOrderId?e.find(d=>d.id===o.receiptOrderId):null;return`
    <section class="grid content full">
      <article class="panel span-2">
        ${O("Archived orders","All claimed orders are listed here")}
        <form class="queue-filters" id="archived-order-filters">
          <label>
            <span>Search archived</span>
            <input name="archivedOrderSearch" type="search" placeholder="Ticket, name, service" value="${v(o.archivedOrderSearch)}" autocomplete="off" />
          </label>
          <div class="search-actions queue-actions">
            <button class="primary" type="submit">Apply</button>
            <button class="secondary" type="button" id="archived-order-clear">Clear</button>
          </div>
        </form>
        <div class="summary-list queue-summary">
          <div><span>Archived claims</span><strong>${i.length}</strong></div>
          <div><span>Total claimed</span><strong>${n.length}</strong></div>
        </div>
        <table class="data-table orders-data-table archived-orders-table">
          <thead>
            <tr><th>Ticket</th><th>Customer</th><th>Service</th><th>Total Payment</th><th>Actions</th></tr>
          </thead>
          <tbody>
            ${i.map(d=>St(d,t,a)).join("")||'<tr><td colspan="5" class="table-empty">No archived orders found.</td></tr>'}
          </tbody>
        </table>
      </article>
      ${c?Me(c,r.filter(d=>d.orderId===c.id)):""}
    </section>
  `}function St(e,t,a){const r=mt(e,a),n=r.find(m=>!e.workflowCompleted.includes(m.key)),s=n?.key==="fold",i=n?.key==="extras"&&e.extras.length>0,c=Ue(e),d=c.charAt(0).toUpperCase()+c.slice(1),l=e.extras.length?e.extras.map(m=>`${v(Y(m.name))} x${Number(m.quantity??1)}`).join(", "):"",p=o.currentUser?.role==="admin",u=e.status!=="claimed"&&e.paidAmount<=0,y=e.status!=="claimed"&&p&&e.paidAmount>0;return`
    <tr class="order-row-main">
      <td><strong>${v(e.ticket)}</strong><div class="small">${v(ae(e.createdAt))}</div></td>
      <td>${v(e.customer)}<div class="small">${v(e.phone??"")}</div></td>
      <td>${v(e.service)}${l?`<div class="small">Extras: ${l}</div>`:""}</td>
      <td class="amount-cell"><strong>${$(e.totalAmount)}</strong><div class="small">${v(d)} · Paid ${$(e.paidAmount)} · Bal ${$(e.balance)}</div></td>
      <td>
      <div class="row-actions">
        ${n?`<form class="inline-form advance-form" data-order-id="${e.id}">
          ${i?`<div class="extra-confirmation">Confirm extra service: <strong>${e.extras.map(m=>`${v(Y(m.name))} x${Number(m.quantity??1)}`).join(", ")}</strong></div>`:""}
          ${s?`<select name="assignedStaffId" required>
            <option value="">Staff</option>
            ${t.map(m=>`<option value="${m.id}">${v(m.name)}</option>`).join("")}
          </select>`:""}
          <button class="secondary" type="submit">Next: ${v(n.label)}</button>
        </form>`:""}
        ${e.balance>0?`
          <form class="inline-form payment-form" data-order-id="${e.id}">
            <input name="amount" type="number" min="0.01" step="0.01" value="${e.balance}" />
            <select name="method"><option value="cash">Cash</option><option value="gcash">GCash</option></select>
            <input name="reference" placeholder="GCash ref" hidden />
            <button class="secondary" type="submit">Pay</button>
          </form>
        `:""}
        ${u?`<button class="secondary" type="button" data-cancel-order="${e.id}">Cancel</button>`:""}
        ${y?`<button class="secondary" type="button" data-delete-order="${e.id}">Delete</button>`:""}
        <button class="secondary" data-receipt="${e.id}">Receipt</button>
      </div>
      </td>
    </tr>
    <tr class="order-row-detail">
      <td colspan="5">
        <div class="order-detail-row">
          <div class="${e.status==="ready"||e.status==="claimed"?"ok":"warn"}">${v(e.status)}</div>
          <div class="workflow-progress order-workflow-progress">
            ${r.map(m=>`<span class="${e.workflowCompleted.includes(m.key)?"is-done":n?.key===m.key?"is-next":""}">${v(m.label)}</span>`).join("")}
          </div>
        </div>
      </td>
    </tr>
  `}function Me(e,t){const a=t.reduce((i,c)=>i+Number(c.amount),0),r=Math.max(0,Number((a-e.totalAmount).toFixed(2))),n=Ue(e),s=n.charAt(0).toUpperCase()+n.slice(1);return`
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="receipt-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-open-printer-panel>Printer</button>
          <button class="primary" type="button" data-thermal-print>${o.printerLoading?"Printing...":"Print Receipt"}</button>
          <button class="secondary" type="button" data-close-receipt>Close</button>
        </div>
        ${o.printerPanelOpen?Ka():""}
        <div class="receipt" id="receipt-print-area">
          <div class="receipt-head">
            <h3 id="receipt-title">Laba101</h3>
            <p>${v(e.ticket)}<br>${v(ae(e.createdAt))}</p>
          </div>
          ${o.currentUser?`<p class="receipt-staff">Staff: ${v(o.currentUser.name)}</p>`:""}
          <div class="receipt-customer">
            <strong>${v(e.customer)}</strong>
            <span>${v(e.phone??"No phone")}</span>
          </div>
          <div class="summary-list receipt-lines">
            <div><span>Service</span><strong>${v(e.service)}</strong></div>
            ${e.extras.length?`<div><span>Extra services</span><strong>${e.extras.map(i=>`${v(Y(i.name))} x${Number(i.quantity??1)} (${$(Number(i.total??i.price))})`).join(", ")}</strong></div>`:""}
            <div><span>Total</span><strong>${$(e.totalAmount)}</strong></div>
            <div><span>Tendered</span><strong>${$(a)}</strong></div>
            <div><span>Paid</span><strong>${$(e.paidAmount)}</strong></div>
            <div><span>Payment status</span><strong>${s}</strong></div>
            <div><span>Change</span><strong>${$(r)}</strong></div>
            <div><span>Balance</span><strong>${$(e.balance)}</strong></div>
          </div>
          <h3>Payments</h3>
          <div class="receipt-payments">
            ${t.map(i=>`<div><span>${v(i.method.toUpperCase())}</span><strong>${$(i.amount)}</strong>${i.reference?`<small>Ref ${v(i.reference)}</small>`:""}</div>`).join("")||'<p class="helper">No payments yet.</p>'}
          </div>
        </div>
      </div>
    </div>
  `}function Ka(){return`
    <div class="printer-panel">
      <div class="printer-panel-head">
        <strong>Bluetooth thermal printer</strong>
        <button class="secondary" type="button" data-refresh-printers>${o.printerLoading?"Scanning...":"Scan paired"}</button>
      </div>
      <div class="printer-fields">
        <label>Printer
          <select data-printer-select>
            <option value="">Select paired printer</option>
            ${o.pairedPrinters.map(e=>`<option value="${v(e.address)}" ${o.selectedPrinterAddress===e.address?"selected":""}>${v(e.name)} - ${v(e.address)}</option>`).join("")}
          </select>
        </label>
        <label>Paper
          <select data-paper-width>
            <option value="58" ${o.printerPaperWidth===58?"selected":""}>58mm</option>
            <option value="80" ${o.printerPaperWidth===80?"selected":""}>80mm</option>
          </select>
        </label>
      </div>
      <div class="printer-actions">
        <button class="secondary" type="button" data-connect-printer>${o.printerLoading?"Connecting...":"Connect & Save"}</button>
      </div>
      ${o.printerStatus?`<p class="printer-status ok">${v(o.printerStatus)}</p>`:""}
      ${o.printerError?`<p class="printer-status warn">${v(o.printerError)}</p>`:""}
    </div>
  `}async function et(){o.printerLoading=!0,o.printerError="",o.printerStatus="",await E();try{if(!(await ce.requestBluetoothPermissions()).granted)throw new Error("Bluetooth permission was not granted.");const t=await ce.listPairedPrinters();o.pairedPrinters=t.printers??[],o.selectedPrinterAddress=o.selectedPrinterAddress||t.savedAddress||o.pairedPrinters[0]?.address||"",o.printerStatus=o.pairedPrinters.length?"Select a printer, then connect.":"No paired printers found. Pair the printer in Android Bluetooth settings first."}catch(e){o.printerError=e instanceof Error?e.message:"Could not scan paired printers."}finally{o.printerLoading=!1,await E()}}async function Ga(){if(!o.selectedPrinterAddress){o.printerError="Select a paired printer first.",await E();return}o.printerLoading=!0,o.printerError="",o.printerStatus="",await E();try{await ce.savePrinter({address:o.selectedPrinterAddress}),await ce.connect({address:o.selectedPrinterAddress}),o.printerStatus="Printer connected and saved."}catch(e){o.printerError=e instanceof Error?e.message:"Printer connection failed."}finally{o.printerLoading=!1,await E()}}function Va(e){const t=(e.serviceLines?.length?e.serviceLines:[{id:e.serviceId,name:e.service,price:e.price,quantity:1,total:e.price}]).map(r=>({name:r.name,quantity:Number(r.quantity||1),price:Number(r.price||0)})),a=e.extras.map(r=>({name:Y(r.name),quantity:Number(r.quantity??1),price:Number(r.price||0)}));return[...t,...a]}async function Ya(e,t){const a=t.reduce((n,s)=>n+Number(s.amount),0),r=Math.max(0,Number((a-e.totalAmount).toFixed(2)));o.printerLoading=!0,o.printerError="",o.printerStatus="",await E();try{if(!o.selectedPrinterAddress){const n=await ce.getSavedPrinter();o.selectedPrinterAddress=n.address||""}await ce.printReceipt({address:o.selectedPrinterAddress||void 0,paperWidth:o.printerPaperWidth,storeName:"Laba101",receiptNumber:e.ticket,dateTime:ae(e.createdAt),customerName:e.customer,customerPhone:e.phone?.trim()||"No phone",items:Va(e),totalAmount:e.totalAmount,paidAmount:e.paidAmount,changeAmount:r,balanceAmount:e.balance,staffName:o.currentUser?.name?.trim()||"Staff"}),o.printerStatus="Receipt sent to printer."}catch(n){o.printerPanelOpen=!0,o.printerError=n instanceof Error?n.message:"Bluetooth thermal print failed."}finally{o.printerLoading=!1,await E()}}function Qa(e,t){const a=o.customerSearch.trim().toLowerCase(),r=e.filter(n=>a?n.name.toLowerCase().includes(a):!1);return`
    <section class="grid content full">
      <article class="panel">
        ${O("Customer Management","Customer records from local offline storage")}
        <form class="search-box" id="customer-search-form">
          <label>
            <span>Search customer name</span>
            <input name="customerSearch" data-customer-search type="search" placeholder="Type the customer name then tap Search" value="${v(o.customerSearch)}" autocomplete="off" />
          </label>
          <div class="search-actions">
            <button class="primary" type="submit">Search</button>
            <button class="secondary" type="button" id="customer-search-clear">Clear</button>
          </div>
        </form>
        <div class="summary-list">
          <div><span>Total customers</span><strong>${e.length}</strong></div>
          <div><span>Matching customers</span><strong>${a?r.length:0}</strong></div>
        </div>
      </article>
      <article class="panel">
        ${O("Customer list","Names, phones, addresses, and order history")}
        <div class="customer-stack">
          ${a?r.map(n=>{const s=t.filter(i=>i.customerId===n.id);return`
              <article class="customer-card">
                <header>
                  <div>
                    <strong>${v(n.name)}</strong>
                    <p>${v(n.phone??"No phone")} · ${v(n.address??"No address")}</p>
                  </div>
                  <span>${s.length} order(s)</span>
                </header>
                <div class="customer-orders">
                  ${s.length?s.map(i=>`
                    <div class="customer-order-row">
                      <div>
                        <strong>${v(i.ticket)}</strong>
                        <span>${v(i.service)} · ${v(i.itemCategory)}</span>
                      </div>
                      <div>
                        <strong>${$(i.totalAmount)}</strong>
                        <span>${v(i.status)}</span>
                      </div>
                    </div>`).join(""):'<p class="helper">No order records yet.</p>'}
                </div>
              </article>`}).join(""):'<div class="helper">Search a customer name to display matching records and their order history.</div>'}
        </div>
      </article>
    </section>
  `}function Ja(e,t){return`
    <section class="grid content full">
      <article class="panel">
        ${O("Services","Order services and add-ons used by POS pricing")}
        <form id="service-form" class="form">
          <input type="hidden" name="id" />
          <div class="form-row">
            <label>Name<input name="name" required /></label>
            <label>Category<input name="category" required /></label>
          </div>
          <div class="form-row">
            <label>Type<select name="serviceType"><option value="order">Order</option><option value="addon">Add-on</option></select></label>
            <label>Price<input name="price" type="number" min="0" step="0.01" required /></label>
          </div>
          <div class="form-row">
            <label>Max KG<input name="maxKg" type="number" min="0" step="0.01" value="8" /></label>
            <label>Drying mins<input name="dryingMinutes" type="number" min="0" step="1" /></label>
          </div>
          <fieldset class="check-grid">
            <legend>Includes</legend>
            ${xa.map(a=>`<label class="check"><input type="checkbox" name="includes" value="${a}" /> ${a}</label>`).join("")}
          </fieldset>
          <label>Turnaround hours<input name="turnaroundHours" type="number" min="0" step="1" value="24" /></label>
          <label>Description<textarea name="description"></textarea></label>
          <div class="form-row">
            <button class="primary" type="submit">Save service</button>
            <button class="secondary" type="button" onclick="this.form.reset(); this.form.querySelector('[name=id]').value = '';">Cancel</button>
          </div>
        </form>
      </article>
      <article class="panel">
        ${O("Item categories","Load limits and extra fees")}
        <form id="category-form" class="form">
          <div class="form-row">
            <label>Name<input name="name" required /></label>
            <label>Max KG<input name="maxKg" type="number" min="0.25" step="0.01" required /></label>
          </div>
          <button class="primary" type="submit">Save category</button>
        </form>
      </article>
      <article class="panel span-2">
        <div class="service-card-grid">
          ${e.map(a=>`
            <article class="service-card">
              <header>
                <strong>${v(a.name)}</strong>
                <span>${v(a.category)}</span>
              </header>
              <div class="service-fields">
                <div><span>price:</span><strong>${$(a.price)}</strong></div>
                <div><span>type:</span><strong>${v(a.serviceType)}</strong></div>
                <div><span>category:</span><strong>${v(a.category)}</strong></div>
                <div><span>active:</span><strong>${a.isActive?"yes":"no"}</strong></div>
              </div>
              <div class="service-meta">Includes: ${v(a.includes.join(", ")||"none")}</div>
              <div class="row-actions">
                <button class="secondary edit-service-btn" data-id="${a.id}">Edit</button>
                ${a.isActive?`<button class="secondary deactivate-service-btn" data-id="${a.id}">Deactivate</button>`:`<button class="secondary activate-service-btn" data-id="${a.id}">Activate</button>`}
              </div>
            </article>
          `).join("")}
        </div>
        <div class="section-divider"></div>
        <div class="table daily-report-table">
          <div class="table-head"><div>Name</div><div>Max KG</div><div></div><div></div><div></div></div>
          ${t.map(a=>`<div class="table-row"><div>${v(a.name)}</div><div>${a.maxKg}</div><div></div><div></div><div></div></div>`).join("")}
        </div>
      </article>
    </section>
  `}function za(e,t){const a=j(),r=a.slice(0,7),n=o.currentUser?.role==="admin",s=e.filter(l=>l.expenseDate===a).reduce((l,p)=>l+p.amount,0),i=e.filter(l=>l.expenseDate.startsWith(r)).reduce((l,p)=>l+p.amount,0),c=t.filter(l=>l.saleDate===a).reduce((l,p)=>l+p.totalAmount,0),d=t.filter(l=>l.saleDate.startsWith(r)).reduce((l,p)=>l+p.totalAmount,0);return`
    <section class="page-head">
      <div>
        <h2>Daily Report</h2>
      </div>
      <div class="segmented">
        <button class="${o.dailyReportTab==="expenses"?"is-active":""}" data-report-tab="expenses" type="button">Disbursements</button>
        <button class="${o.dailyReportTab==="sales"?"is-active":""}" data-report-tab="sales" type="button">Daily Sales</button>
      </div>
    </section>
    <section class="grid stats compact report-stats">
      <div class="panel stat"><div class="card-label">Daily disbursement</div><div class="value">${$(s)}</div></div>
      <div class="panel stat"><div class="card-label">Monthly disbursement</div><div class="value">${$(i)}</div></div>
      <div class="panel stat"><div class="card-label">Today sales input</div><div class="value">${$(c)}</div></div>
      <div class="panel stat"><div class="card-label">Month sales input</div><div class="value">${$(d)}</div></div>
    </section>
    ${o.dailyReportTab==="expenses"?`
    <section class="grid content full">
      <article class="panel">
        ${O("Input disbursement","Supplies, utilities, and cash disbursements")}
        <form id="expense-form" class="form">
          <input name="id" type="hidden" />
          <div class="form-row"><label>Date<input name="expenseDate" type="date" value="${j()}" required /></label><label>Amount<input name="amount" type="number" min="0" step="0.01" required /></label></div>
          <div class="form-row"><label>Name<input name="name" required /></label><label>Category<input name="category" required /></label></div>
          <label>Description<textarea name="description"></textarea></label>
          <button class="primary" type="submit">Save expense</button>
        </form>
      </article>
      <article class="panel">
        ${O("Disbursement list","Expenses only")}
        <div class="table">
          <div class="table-head"><div>Date</div><div>No.</div><div>Name</div><div>Category</div><div>Amount</div><div>Action</div></div>
          ${e.map(l=>`<div class="table-row"><div>${v(l.expenseDate)}</div><div>${v(l.number)}</div><div>${v(l.name)}</div><div>${v(l.category)}</div><div>${$(l.amount)}</div><div class="row-actions"><button class="secondary edit-expense-btn" data-id="${l.id}" type="button">Edit</button>${n?`<button class="secondary delete-expense-btn" data-id="${l.id}" type="button">Delete</button>`:""}</div></div>`).join("")||'<div class="helper">No expenses yet.</div>'}
        </div>
      </article>
    </section>
    `:`
    <section class="grid content full">
      <article class="panel">
        ${O("Input total sale","Manual cash and GCash totals")}
        <form id="sales-form" class="form">
          <input name="id" type="hidden" />
          <label>Date<input name="saleDate" type="date" value="${j()}" required /></label>
          <label>Cash sales<input name="cashAmount" type="number" min="0" step="0.01" value="0" /></label>
          <label>GCash sales<input name="gcashAmount" type="number" min="0" step="0.01" value="0" /></label>
          <label>Notes<textarea name="notes" placeholder="Optional"></textarea></label>
          <button class="primary" type="submit">Save daily sale</button>
        </form>
      </article>
      <article class="panel">
        ${O("Daily sales history","Cash, GCash, total sale, notes, and updates")}
        <div class="table wide-table daily-report-table">
          <div class="table-head"><div>Sales #</div><div>Date</div><div>Cash</div><div>GCash</div><div>Total sale</div><div>Action</div></div>
          ${t.map(l=>`<div class="table-row"><div>${v(l.saleNumber)}</div><div>${v(l.saleDate)}</div><div>${$(l.cashAmount)}</div><div>${$(l.gcashAmount)}</div><div><strong>${$(l.totalAmount)}</strong></div><div class="row-actions"><button class="secondary edit-sale-btn" data-id="${l.id}" type="button">Edit</button>${n?`<button class="secondary delete-sale-btn" data-id="${l.id}" type="button">Delete</button>`:""}</div></div>`).join("")||'<div class="helper">No daily sales totals yet.</div>'}
        </div>
      </article>
    </section>
    `}
  `}function Za(e,t,a,r,n,s,i,c){const d=o.reportPreview?gt(e,t,a,r,n,o.reportPreview):null;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">Exports</p>
        <h2>Report Center</h2>
      </div>
    </section>
    <section class="panel report-center">
      <div class="report-grid">
        <div>
          <h3>Date to export</h3>
          <div class="date-scopes">
            <label><input type="radio" name="dateScope" value="today" data-date-scope checked /> <span>Current</span></label>
            <label><input type="radio" name="dateScope" value="week" data-date-scope /> <span>Week</span></label>
            <label><input type="radio" name="dateScope" value="month" data-date-scope /> <span>Month</span></label>
            <label><input type="radio" name="dateScope" value="custom" data-date-scope /> <span>Custom</span></label>
          </div>
          <div class="form-row">
            <label>From<input name="dateFrom" data-date-from type="date" value="${j()}" /></label>
            <label>To<input name="dateTo" data-date-to type="date" value="${j()}" /></label>
          </div>
        </div>
        <div>
          <h3>Reports to include</h3>
          <div class="report-checks">
            <label><input type="checkbox" name="reportType" value="sales" checked /> Sales reports</label>
            <label><input type="checkbox" name="reportType" value="disbursement" checked /> Disbursement reports</label>
            <label><input type="checkbox" name="reportType" value="fold_count" /> Fold Count</label>
            <label><input type="checkbox" name="reportType" value="revolving_fund" /> Revolving Fund</label>
            <label><input type="checkbox" name="reportType" value="summary" checked /> Summary</label>
          </div>
        </div>
      </div>
      <div class="section-divider"></div>
      <div class="report-actions">
        <p>Summary computes sales minus disbursement for the selected dates.</p>
        <div>
          <button class="secondary" id="generate-report" type="button">Generate report</button>
          <button class="secondary" id="email-report" type="button">Send File</button>
        </div>
      </div>
    </section>
    ${d?`
      <section class="panel report-preview">
        ${d.selectedTypes.has("sales")?`
          <article>
            ${O("Sales report preview",`${d.selection.from} to ${d.selection.to}`)}
            <div class="table wide-table report-preview-table">
              <div class="table-head report-table-head"><div>Type</div><div>Date</div><div>Number</div><div>Name</div><div>Cash</div><div>GCash</div><div>Total</div><div>Balance</div></div>
              ${d.salesRows().rows.slice(1).map(l=>`<div class="table-row report-table-row">${l.map(p=>`<div>${v(p??"")}</div>`).join("")}</div>`).join("")}
            </div>
          </article>`:""}
        ${d.selectedTypes.has("disbursement")?`
          <article>
            ${O("Disbursement preview",`${d.selection.from} to ${d.selection.to}`)}
            <div class="table wide-table report-preview-table report-disbursement-table">
              <div class="table-head report-table-head"><div>Type</div><div>Date</div><div>Number</div><div>Name</div><div>Amount</div></div>
              ${d.disbursementRows().rows.slice(1).map(l=>`<div class="table-row report-table-row">${l.map(p=>`<div>${v(p??"")}</div>`).join("")}</div>`).join("")}
            </div>
          </article>`:""}
        ${d.selectedTypes.has("fold_count")?`
          <article>
            ${O("Fold Count preview",`${d.selection.from} to ${d.selection.to}`)}
            <div class="table report-preview-table">
              <div class="table-head"><div>Staff</div><div>Fold Count</div></div>
              ${d.foldCountRows().rows.slice(1).map(l=>`<div class="table-row">${l.map(p=>`<div>${v(p??"")}</div>`).join("")}</div>`).join("")}
            </div>
          </article>`:""}
        ${d.selectedTypes.has("revolving_fund")?`
          <article>
            ${O("Revolving Fund — Daily Summary",`${d.selection.from} to ${d.selection.to}`)}
            ${we(["Date of Sales","Cash on Hand","Status","Date Update"],d.revolvingDailySummaryRows().rows.slice(1).map(l=>[v(String(l[0]??"")),v(String(l[1]??"")),v(String(l[2]??"")),v(String(l[3]??""))]),"data-table revolving-report-table")}
          </article>
          <article>
            ${O("Revolving Fund — Table History",`${d.selection.from} to ${d.selection.to}`)}
            ${we(["Date","Number","Name","Amount","Category","Description","Type"],d.revolvingHistoryRows().rows.slice(1).map(l=>[v(String(l[0]??"")),v(String(l[1]??"")),v(String(l[2]??"")),v(String(l[3]??"")),v(String(l[4]??"")),v(String(l[5]??"")),v(String(l[6]??""))]),"data-table revolving-report-table")}
          </article>`:""}
        ${d.selectedTypes.has("summary")?`
          <article>
            ${O("Summary preview",`${d.selection.from} to ${d.selection.to}`)}
            <div class="summary-list report-summary-list">
              ${d.summaryRows().map(l=>`<div><span>${v(l[0])}</span><strong>${v(String(l[6]??"0"))}</strong></div>`).join("")}
            </div>
          </article>`:""}
      </section>
    `:""}
  `}function er(e,t){return`
    <section class="grid content full">
      <article class="panel">
        ${O("Inventory","Service catalog and item load limits")}
        <div class="summary-list">
          <div><span>Active services</span><strong>${e.filter(a=>a.isActive).length}</strong></div>
          <div><span>Item categories</span><strong>${t.length}</strong></div>
        </div>
      </article>
      <article class="panel">
        ${O("Service inventory","Current sellable laundry services")}
        <div class="table">
          <div class="table-head"><div>Name</div><div>Category</div><div>Price</div><div>Max KG</div><div>Status</div></div>
          ${e.map(a=>`<div class="table-row"><div><strong>${v(a.name)}</strong></div><div>${v(a.category)}</div><div>${$(a.price)}</div><div>${a.maxKg} kg</div><div>${a.isActive?"Active":"Inactive"}</div></div>`).join("")}
        </div>
      </article>
    </section>
  `}function tr(e,t,a){const r=e.filter(s=>s.status!=="under_cleaning"),n=e.filter(s=>s.status==="under_cleaning");return`
    <section class="page-head">
      <div>
        <h2>Maintenance & Cleaning</h2>
        <p class="meta">Manage machine subcleaning and maintenance records.</p>
      </div>
      <div class="segmented">
        <button class="${o.maintenanceTab==="cleaning"?"is-active":""}" data-maintenance-tab="cleaning" type="button">Subcleaning</button>
        <button class="${o.maintenanceTab==="machines"?"is-active":""}" data-maintenance-tab="machines" type="button">Machine Management</button>
      </div>
    </section>
    ${o.maintenanceTab==="cleaning"?`
    <section class="grid content full">
      <article class="panel">
        ${O("Available Machines","Select machines to start cleaning.")}
        <form id="subcleaning-form" class="form">
          <input type="hidden" name="date" value="${j()}" />
          <fieldset class="machine-list">
            ${r.map(s=>`<label class="machine-card"><input type="checkbox" name="machineIds" value="${s.id}" /><span><strong>${v(s.machineName)}</strong><small>${v(s.machineType)}</small></span><em></em></label>`).join("")||'<p class="helper">All machines are currently being cleaned.</p>'}
          </fieldset>
          <input type="hidden" name="cleaningStatus" value="in_progress" />
          <label>Notes <textarea name="notes" placeholder="e.g. Deep clean filters"></textarea></label>
          <input type="hidden" name="branch" value="${v(a)}" />
          <button class="primary" type="submit">Start Cleaning</button>
        </form>
      </article>
      <article class="panel warning-panel">
        ${O("Under Cleaning","Machines currently being serviced.")}
        <div class="machine-stack">
          ${n.length?n.map(s=>`
            <div class="machine-status">
              <span><strong>${v(s.machineName)}</strong><small>${v(s.machineType)}</small></span>
              <b>In progress</b>
              <button class="secondary complete-cleaning-btn" type="button" data-machine-id="${s.id}" data-branch="${v(a)}">Mark Complete</button>
            </div>`).join(""):'<p class="helper">No machines under cleaning right now.</p>'}
        </div>
      </article>
      <article class="panel span-2">
        ${O("Daily Cleaning Checklist","Track which machines have been cleaned today.")}
        <div class="table">
          <div class="table-head"><div>Machine</div><div>Type</div><div>Status</div><div>Notes</div><div>Date</div></div>
          ${e.map(s=>{const i=t.find(c=>c.machineIds.includes(s.id)&&c.date===j());return`<div class="table-row"><div><strong>${v(s.machineName)}</strong></div><div>${v(s.machineType)}</div><div>${i?v(i.cleaningStatus.replace("_"," ")):"Not Cleaned"}</div><div>${v(i?.notes??"-")}</div><div>${j()}</div></div>`}).join("")}
        </div>
      </article>
    </section>
    `:`
    <section class="grid content full">
      <article class="panel">
        ${O("Add Machine","Create washer and dryer records")}
        <form id="machine-form" class="form">
          <label>Machine Name<input name="machineName" required placeholder="e.g. Washer 5" /></label>
          <label>Type<select name="machineType"><option value="washer">Washer</option><option value="dryer">Dryer</option></select></label>
          <label>Status<select name="status"><option value="available">Available</option><option value="under_cleaning">Under Cleaning</option><option value="maintenance">Maintenance</option></select></label>
          <input type="hidden" name="branch" value="${v(a)}" />
          <button class="primary" type="submit">Add machine</button>
        </form>
      </article>
      <article class="panel">
        ${O("Machines","Washer and dryer status")}
        <div class="table">
          <div class="table-head"><div>Name</div><div>Type</div><div>Status</div><div>Branch</div><div>Actions</div></div>
          ${e.map(s=>`<div class="table-row"><div><strong>${v(s.machineName)}</strong></div><div>${v(s.machineType)}</div><div>${v(s.status.replace("_"," "))}</div><div>${v(s.branch)}</div>
          <div class="row-actions">
            ${s.status!=="inactive"?`<button class="secondary deactivate-machine-btn" data-id="${s.id}">Deactivate</button>`:`<button class="secondary activate-machine-btn" data-id="${s.id}">Activate</button>`}
          </div></div>`).join("")||'<div class="helper">No machines found.</div>'}
        </div>
      </article>
    </section>
    `}
  `}function ar(e,t){return`
    <section class="grid">
      <div class="page-head">
        <div>
          <p class="eyebrow">Team Management</p>
          <h2>Staff Overview</h2>
        </div>
        <button class="primary" id="open-add-staff-modal" type="button">+ Add staff</button>
      </div>

      <article class="panel">
        ${O("Staff list","Branch: "+v(t))}
        <div class="table">
          <div class="table-head staff-table-head"><div>Name</div><div>Email</div><div>Role</div><div>Branch</div><div>Status</div><div>Actions</div></div>
          ${e.length?e.map(a=>`<div class="table-row staff-table-row"><div><strong>${v(a.name)}</strong></div><div>${v(a.email)}</div><div class="small">${v(a.role)}</div><div>${v(a.branch)}</div><div>${a.isActive!==0?"Active":"Inactive"}</div>
          <div class="row-actions">
            <button class="secondary edit-staff-btn" data-id="${a.id}">Edit</button>
            ${a.isActive!==0?`<button class="secondary deactivate-staff-btn" data-id="${a.id}">Deactivate</button>`:`<button class="secondary activate-staff-btn" data-id="${a.id}">Activate</button>`}
          </div></div>`).join(""):'<div class="helper" style="padding:18px 0">No staff records yet. Click <strong>+ Add staff</strong> to create one.</div>'}
        </div>
      </article>
    </section>

    <div class="modal-backdrop" id="add-staff-modal" role="presentation" hidden>
      <div class="receipt-modal staff-modal" role="dialog" aria-modal="true" aria-labelledby="add-staff-title">
        <div class="modal-actions">
          <h3 id="add-staff-title" style="margin:0;flex:1;color:var(--navy)">Add staff member</h3>
          <button class="secondary" type="button" id="close-add-staff-modal">Cancel</button>
        </div>
        <form id="staff-form" class="form">
          <input type="hidden" name="id" />
          <div class="form-row">
            <label>Full name<input name="name" required placeholder="e.g. Maria Santos" /></label>
            <label>Email address<input name="email" type="email" required placeholder="staff@laba101.test" /></label>
          </div>
          <label>Password<input name="password" type="password" value="password" required /></label>
          <div class="form-row">
            <label>Role
              <select name="role">
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            <label>Branch
              <select name="branch" required>
                ${["Main Store","Mintal Branch","Gensan Branch"].map(a=>`<option value="${a}" ${a===t?"selected":""}>${a}</option>`).join("")}
              </select>
            </label>
          </div>
          <button class="primary" id="staff-save-btn" type="submit">Save staff member</button>
        </form>
      </div>
    </div>
  `}function rr(e,t,a){return`
    <section class="grid content full">
      <article class="panel">
        ${O("Settings","Device-local configuration")}
        <form id="settings-form" class="form">
          <label>Current branch<select name="branch">
            ${["Main Store","Mintal Branch","Gensan Branch"].map(r=>`<option value="${r}" ${r===e?"selected":""}>${r}</option>`).join("")}
          </select></label>
          <label>Fold rate<input name="foldRate" type="number" min="0" step="0.01" value="${t}" /></label>
          <label>Report email<input name="reportEmail" type="email" placeholder="admin@laba101.test" value="${v(a)}" /></label>
          <button class="primary" type="submit">Save settings</button>
        </form>
      </article>
    </section>
  `}function nr(){const e=()=>{localStorage.removeItem(ue),o.currentUser=null,o.tab="dashboard",o.receiptOrderId=0,o.sidebarOpen=!1,E()};document.querySelector("#logout-button")?.addEventListener("click",e),document.querySelector("#mobile-logout-button")?.addEventListener("click",e),document.querySelector("#mobile-menu-button")?.addEventListener("click",()=>{o.sidebarOpen=!0,E()}),document.querySelector("#sidebar-close-button")?.addEventListener("click",()=>{o.sidebarOpen=!1,E()}),document.querySelector("#sidebar-backdrop")?.addEventListener("click",()=>{o.sidebarOpen=!1,E()}),document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{o.tab=t.dataset.tab,o.receiptOrderId=0,o.sidebarOpen=!1,E()})}),document.querySelectorAll("[data-quick-tab]").forEach(t=>{t.addEventListener("click",()=>{o.tab=t.dataset.quickTab,E()})}),document.querySelectorAll("[data-receipt]").forEach(t=>{t.addEventListener("click",()=>{o.receiptOrderId=Number(t.dataset.receipt),o.printerPanelOpen=!1,o.printerError="",o.printerStatus="",E()})}),document.querySelector("[data-close-receipt]")?.addEventListener("click",()=>{o.receiptOrderId=0,E()}),document.querySelector("[data-open-printer-panel]")?.addEventListener("click",()=>{o.printerPanelOpen=!o.printerPanelOpen,o.printerPanelOpen&&o.pairedPrinters.length===0?et():E()}),document.querySelector("[data-refresh-printers]")?.addEventListener("click",()=>{et()}),document.querySelector("[data-printer-select]")?.addEventListener("change",t=>{o.selectedPrinterAddress=t.currentTarget.value,E()}),document.querySelector("[data-paper-width]")?.addEventListener("change",t=>{o.printerPaperWidth=Number(t.currentTarget.value)===80?80:58,E()}),document.querySelector("[data-connect-printer]")?.addEventListener("click",()=>{Ga()}),document.querySelector("[data-thermal-print]")?.addEventListener("click",()=>{(async()=>{const t=await bt(),a=t.orders.find(n=>n.id===o.receiptOrderId);if(!a)throw new Error("Receipt order not found.");const r=t.payments.filter(n=>n.orderId===a.id);await Ya(a,r)})().catch(t=>{o.printerPanelOpen=!0,o.printerError=t instanceof Error?t.message:"Bluetooth thermal print failed.",E()})}),document.querySelectorAll("[data-report-tab]").forEach(t=>{t.addEventListener("click",()=>{o.dailyReportTab=t.dataset.reportTab,E()})}),document.querySelectorAll("[data-maintenance-tab]").forEach(t=>{t.addEventListener("click",()=>{o.maintenanceTab=t.dataset.maintenanceTab,E()})})}function sr(){Ba(),document.querySelector("#login-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget),a=document.querySelector("#login-button");a&&(a.disabled=!0,a.textContent="Signing in...");try{const r=await dt(String(t.get("email")??""),String(t.get("password")??""));if(!r){o.loginError="Invalid email or password.",await E();return}o.currentUser=r,o.loginError="",await ge("branch",String(r.branch||"Main Store")),t.get("remember")?localStorage.setItem(ue,JSON.stringify({email:r.email,remembered:!0})):localStorage.removeItem(ue),Et().includes(o.tab)||(o.tab="dashboard"),await E()}catch(r){alert("Login Error: "+String(r?.message||r)),a&&(a.disabled=!1,a.textContent="Sign in")}})}function ir(){fe&&window.clearInterval(fe);const e=document.querySelector("[data-navbar-time]"),t=document.querySelector("[data-navbar-date]");if(!e||!t){fe=void 0;return}const a=()=>{const r=ka();e.textContent=r.time,t.textContent=r.date};a(),fe=window.setInterval(a,1e3)}function tt(e,t){return e?t.find(a=>a.name.toLowerCase()===e.category.toLowerCase())??t.find(a=>a.name==="Regular Clothes")??t[0]??null:null}function Ce(e,t){return Math.max(1,Number(t.maxKg||e.maxKg||1))}function wt(e,t){return Object.fromEntries(t.filter(a=>a.serviceType==="order").map(a=>[a.id,Number(e.querySelector(`input[name="serviceQty-${a.id}"]`)?.value??0)]).filter(([,a])=>Number(a)>0))}function at(e,t){const a=wt(e,t);return t.filter(r=>r.serviceType==="order"&&Number(a[r.id]??0)>0).map(r=>({...r,quantity:Number(a[r.id])}))}function Tt(e,t){return Object.fromEntries(t.filter(a=>a.serviceType==="addon").map(a=>[a.id,Number(e.querySelector(`input[name="addonQty-${a.id}"]`)?.value??0)]).filter(([,a])=>Number(a)>0))}function rt(e,t){const a=Tt(e,t);return t.filter(r=>r.serviceType==="addon"&&Number(a[r.id]??0)>0).map(r=>({...r,quantity:Number(a[r.id])}))}function or(e){const t=document.querySelector("#order-form"),a=document.querySelector("#price-preview"),r=t?.querySelector('button[type="submit"]'),n=t?.querySelector('select[name="customerId"]'),s=t?.querySelector('input[name="customerName"]'),i=t?.querySelector('input[name="customerPhone"]'),c=t?.querySelector("[data-order-error]"),d=t?.querySelector('select[name="paymentMethod"]'),l=t?.querySelector(".gcash-reference"),p=t?.querySelector('input[name="paymentReference"]');let u=!1;const y=()=>{if(!n||!s||!i)return;const h=n.selectedOptions[0];s.value=h?.dataset.name??"",i.value=h?.dataset.phone??""},m=()=>{const h=d?.value==="gcash";l&&(l.hidden=!h),p&&(p.required=h,h||(p.value=""))},f=(h,w)=>{if(!t)return;const g=t.querySelector(`input[name="${h}"]`);g&&(g.value=String(Math.max(0,Number(g.value||0)+w)),g.closest(".qty-card")?.classList.toggle("is-selected",Number(g.value)>0),g.dispatchEvent(new Event("input",{bubbles:!0})))};t?.querySelectorAll(".qty-control input").forEach(h=>{h.addEventListener("input",()=>{h.value=String(Math.max(0,Number(h.value||0))),h.closest(".qty-card")?.classList.toggle("is-selected",Number(h.value)>0)})}),t?.querySelectorAll("[data-qty-card]").forEach(h=>{h.addEventListener("click",w=>{const g=w.target;g.closest("input")||g.closest("button")||f(h.dataset.qtyCard??"",1)})}),t?.querySelectorAll("[data-qty-plus]").forEach(h=>{h.addEventListener("click",()=>f(h.dataset.qtyPlus??"",1))}),t?.querySelectorAll("[data-qty-minus]").forEach(h=>{h.addEventListener("click",()=>f(h.dataset.qtyMinus??"",-1))});const T=()=>{if(!t||!a)return;const h=at(t,e.services),w=h[0],g=tt(w,e.categories),R=rt(t,e.services);if(!h.length||!w||!g){r&&(r.disabled=!0),c&&(c.hidden=!u,c.textContent=u?"Please select at least one service quantity.":""),a.innerHTML='<div class="preview-total"><span>Total amount</span><strong>PHP 0.00</strong></div>';return}const L=Oe(h,g,Ce(w,g),R),I=L.serviceLines.map(F=>`${F.name} x${F.quantity}`),_=L.extras.map(F=>`${Y(F.name)} x${F.quantity}`);r&&(r.disabled=!1),c&&(c.hidden=!0,c.textContent=""),a.classList.remove("has-error"),a.innerHTML=`
      <div class="preview-line"><span>Services${I.length?` (${v(I.join(", "))})`:""}</span><strong>${$(L.price)}</strong></div>
      ${L.extraServiceAmount>0?`<div class="preview-line"><span>Extra services${_.length?` (${v(_.join(", "))})`:""}</span><strong>${$(L.extraServiceAmount)}</strong></div>`:""}
      <div class="preview-total"><span>Total amount</span><strong>${$(L.totalAmount)}</strong></div>
    `};n?.addEventListener("change",y),d?.addEventListener("change",m),m(),t?.addEventListener("input",T),t?.addEventListener("change",T),T(),t?.addEventListener("submit",async h=>{h.preventDefault(),u=!0;const w=new FormData(t),g=at(t,e.services),R=g[0],L=tt(R,e.categories),I=rt(t,e.services);if(!g.length||!R||!L){c&&(c.hidden=!1,c.textContent="Please select at least one service quantity.");return}const _=g.map(D=>`${D.name} x${D.quantity}`).join(", "),F=Oe(g,L,Ce(R,L),I);if(confirm(`Save this order?

Services: ${_}
Total: ${$(F.totalAmount)}`))try{await la({customerId:Number(w.get("customerId"))||void 0,customerName:String(w.get("customerName")??""),customerPhone:String(w.get("customerPhone")??"")||null,serviceQuantities:wt(t,e.services),branch:e.branch,itemCategoryId:L?.id,weightKg:R&&L?Ce(R,L):void 0,addonQuantities:Tt(t,e.services),paidAmount:Number(w.get("paidAmount")??0),paymentMethod:String(w.get("paymentMethod")??"cash"),paymentReference:String(w.get("paymentReference")??"")||null,notes:String(w.get("notes")??"")||null}),await E()}catch(D){c&&(c.hidden=!1,c.textContent=D instanceof Error?D.message:"Order could not be saved.")}}),document.querySelectorAll(".advance-form").forEach(h=>{h.addEventListener("submit",async w=>{w.preventDefault();const g=new FormData(h);await ua(Number(h.dataset.orderId),Number(g.get("assignedStaffId"))||null),await E()})}),document.querySelectorAll(".payment-form").forEach(h=>{const w=h.querySelector('select[name="method"]'),g=h.querySelector('input[name="reference"]'),R=()=>{const L=w?.value==="gcash";g&&(g.hidden=!L,g.required=L,L||(g.value=""))};w?.addEventListener("change",R),R(),h.addEventListener("submit",async L=>{L.preventDefault();const I=new FormData(h);await vt(Number(h.dataset.orderId),{amount:Number(I.get("amount")),method:String(I.get("method")),reference:String(I.get("reference")??"")||null}),await E()})}),document.querySelectorAll("[data-cancel-order]").forEach(h=>{h.addEventListener("click",async()=>{const w=Number(h.dataset.cancelOrder);if(Number.isFinite(w)&&confirm("Cancel this order? (No payment will be refunded.)"))try{o.receiptOrderId===w&&(o.receiptOrderId=0),await va(w),await E()}catch(g){alert(g instanceof Error?g.message:"Cancel failed.")}})}),document.querySelectorAll("[data-delete-order]").forEach(h=>{h.addEventListener("click",async()=>{const w=Number(h.dataset.deleteOrder);if(Number.isFinite(w)&&confirm("Delete this paid order and update sales?"))try{o.receiptOrderId===w&&(o.receiptOrderId=0),await pa(w),await E()}catch(g){alert(g instanceof Error?g.message:"Delete failed.")}})})}function cr(e){document.querySelector("#service-form")?.addEventListener("submit",async t=>{t.preventDefault();const a=new FormData(t.currentTarget),r=a.get("id")?Number(a.get("id")):void 0;await Ye({id:r,name:String(a.get("name")??""),description:String(a.get("description")??"")||null,category:String(a.get("category")??""),serviceType:String(a.get("serviceType")??"order"),price:Number(a.get("price")??0),maxKg:Number(a.get("maxKg")??0),dryingMinutes:Number(a.get("dryingMinutes"))||null,includes:a.getAll("includes").map(String).filter(Boolean),additionalCharge:0,turnaroundHours:Number(a.get("turnaroundHours")??24),isActive:1}),await E()}),document.querySelectorAll(".edit-service-btn").forEach(t=>{t.addEventListener("click",()=>{const a=Number(t.dataset.id),r=e.find(s=>s.id===a),n=document.querySelector("#service-form");r&&n&&(n.querySelector("[name=id]").value=String(r.id),n.querySelector("[name=name]").value=r.name,n.querySelector("[name=category]").value=r.category,n.querySelector("[name=serviceType]").value=r.serviceType,n.querySelector("[name=price]").value=String(r.price),n.querySelector("[name=maxKg]").value=String(r.maxKg),n.querySelector("[name=dryingMinutes]").value=r.dryingMinutes?String(r.dryingMinutes):"",n.querySelectorAll('input[name="includes"]').forEach(s=>{s.checked=r.includes.includes(s.value)}),n.querySelector("[name=turnaroundHours]").value=String(r.turnaroundHours),n.querySelector("[name=description]").value=r.description??"",window.scrollTo({top:0,behavior:"smooth"}))})}),document.querySelectorAll(".deactivate-service-btn, .activate-service-btn").forEach(t=>{t.addEventListener("click",async()=>{const a=Number(t.dataset.id),r=e.find(n=>n.id===a);if(r){const n=r.isActive?0:1;await Ye({id:r.id,name:r.name,description:r.description,category:r.category,serviceType:r.serviceType,price:r.price,maxKg:r.maxKg,dryingMinutes:r.dryingMinutes,includes:r.includes,additionalCharge:r.additionalCharge,turnaroundHours:r.turnaroundHours,isActive:n}),await E()}})}),document.querySelector("#category-form")?.addEventListener("submit",async t=>{t.preventDefault();const a=new FormData(t.currentTarget);await oa({name:String(a.get("name")??""),maxKg:Number(a.get("maxKg")??0),additionalFee:Number(a.get("additionalFee")??0),isActive:1}),await E()})}function lr(e){const t=document.querySelector("#expense-form");t?.addEventListener("submit",async a=>{a.preventDefault();const r=new FormData(a.currentTarget),n=Number(r.get("id")||0),s={expenseDate:String(r.get("expenseDate")??""),name:String(r.get("name")??""),category:String(r.get("category")??""),description:String(r.get("description")??""),amount:Number(r.get("amount")??0)};n?await Sa(n,s):await Ea(s),await E()}),document.querySelectorAll(".edit-expense-btn").forEach(a=>{a.addEventListener("click",()=>{const r=e.find(s=>s.id===Number(a.dataset.id));if(!r||!t)return;t.querySelector("[name=id]").value=String(r.id),t.querySelector("[name=expenseDate]").value=r.expenseDate,t.querySelector("[name=amount]").value=String(r.amount),t.querySelector("[name=name]").value=r.name,t.querySelector("[name=category]").value=r.category,t.querySelector("[name=description]").value=r.description??"";const n=t.querySelector('button[type="submit"]');n&&(n.textContent="Update expense"),t.scrollIntoView({behavior:"smooth",block:"start"})})}),document.querySelectorAll(".delete-expense-btn").forEach(a=>{a.addEventListener("click",async()=>{if(o.currentUser?.role!=="admin")return;const r=Number(a.dataset.id);!Number.isFinite(r)||!confirm("Delete this disbursement?")||(await wa(r),await E())})}),document.querySelector("#fold-form")?.addEventListener("submit",async a=>{a.preventDefault();const r=new FormData(a.currentTarget);await ya({orderTicket:String(r.get("orderTicket")??""),staffName:String(r.get("staffName")??""),foldCount:Number(r.get("foldCount")??1),rate:Number(r.get("rate")??5)}),await E()})}function dr(e,t,a,r,n){document.querySelector("#generate-report")?.addEventListener("click",()=>{o.reportPreview=ye(),E()});const s=document.querySelector("#sales-form");s?.addEventListener("submit",async m=>{m.preventDefault();const f=new FormData(m.currentTarget);await Na({id:Number(f.get("id")||0)||void 0,saleDate:String(f.get("saleDate")??""),cashAmount:Number(f.get("cashAmount")??0),gcashAmount:Number(f.get("gcashAmount")??0),notes:String(f.get("notes")??"")}),await E()}),document.querySelectorAll(".edit-sale-btn").forEach(m=>{m.addEventListener("click",()=>{const f=t.find(h=>h.id===Number(m.dataset.id));if(!f||!s)return;s.querySelector("[name=id]").value=String(f.id),s.querySelector("[name=saleDate]").value=f.saleDate,s.querySelector("[name=cashAmount]").value=String(f.cashAmount),s.querySelector("[name=gcashAmount]").value=String(f.gcashAmount),s.querySelector("[name=notes]").value=f.notes??"";const T=s.querySelector('button[type="submit"]');T&&(T.textContent="Update daily sale"),s.scrollIntoView({behavior:"smooth",block:"start"})})}),document.querySelectorAll(".delete-sale-btn").forEach(m=>{m.addEventListener("click",async()=>{if(o.currentUser?.role!=="admin")return;const f=Number(m.dataset.id);!Number.isFinite(f)||!confirm("Delete this daily sale?")||(await Aa(f),await E())})});const i=document.querySelector("[data-date-from]"),c=document.querySelector("[data-date-to]");document.querySelectorAll("[data-date-scope]").forEach(m=>{m.addEventListener("change",()=>{if(!m.checked||!i||!c)return;const f=new Date,T=me(f),h=new Date(f);m.value==="week"&&h.setDate(f.getDate()-6),m.value==="month"&&h.setDate(1),m.value!=="custom"&&(i.value=m.value==="today"?T:me(h),c.value=T)})});const d=m=>{const f=w=>String(w??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;"),T=w=>w==="Sales Report"?[110,125,150,215,95,95,105,105]:w==="Disbursement"?[110,115,150,220,105]:w==="Fold Count"?[220,125]:w==="Revolving Daily Summary"?[115,105,120,115]:w==="Revolving History"?[115,96,140,96,110,180,120]:[155,125,125,125,95,95,115,115];return`<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
  <Styles>
    <Style ss:ID="BorderCell">
      <Alignment ss:Vertical="Center" ss:WrapText="1" />
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" />
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" />
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" />
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" />
      </Borders>
    </Style>
    <Style ss:ID="HeaderCell">
      <Alignment ss:Vertical="Center" ss:WrapText="1" />
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" />
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" />
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" />
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" />
      </Borders>
      <Font ss:Bold="1" ss:Color="#FFFFFF" />
      <Interior ss:Color="#061a42" ss:Pattern="Solid" />
    </Style>
    <Style ss:ID="BorderRow">
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" />
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" />
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" />
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" />
      </Borders>
    </Style>
    <Style ss:ID="HeaderRow">
      <Alignment ss:Vertical="Center" ss:WrapText="1" />
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" />
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" />
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" />
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" />
      </Borders>
      <Font ss:Bold="1" ss:Color="#FFFFFF" />
      <Interior ss:Color="#061a42" ss:Pattern="Solid" />
    </Style>
  </Styles>
  ${m.map(w=>{const g=T(w.name).map(L=>`<Column ss:Width="${L}" ss:AutoFitWidth="0"/>`).join(""),R=w.rows.map(L=>{if(!L.length)return'<Row ss:Height="10" ss:StyleID="BorderRow"><Cell ss:StyleID="BorderCell"><Data ss:Type="String">&nbsp;</Data></Cell></Row>';const I=L[0]==="Type"||L[0]==="Summary"||L[0]==="Sales Summary"||L[0]==="Disbursement Summary"||L[0]==="Staff"||L[0]==="Date of Sales"||L[0]==="Date",_=I?"HeaderRow":"BorderRow",F=I?"HeaderCell":"BorderCell",D=I?26:22,q=L.map(k=>`<Cell ss:StyleID="${F}"><Data ss:Type="${typeof k=="number"?"Number":"String"}">${f(k)}</Data></Cell>`).join("");return`<Row ss:Height="${D}" ss:StyleID="${_}">${q}</Row>`}).join("");return`
        <Worksheet ss:Name="${f(w.name)}">
          <Table>
            ${g}
            ${R}
          </Table>
        </Worksheet>`}).join("")}
</Workbook>`},l=()=>{const m=ye(),f=gt(e,t,a,r,n,m),T=[];f.selectedTypes.has("sales")&&T.push({name:"Sales Report",rows:f.salesRows().rows}),f.selectedTypes.has("disbursement")&&T.push({name:"Disbursement",rows:f.disbursementRows().rows}),f.selectedTypes.has("fold_count")&&T.push({name:"Fold Count",rows:f.foldCountRows().rows}),f.selectedTypes.has("revolving_fund")&&(T.push({name:"Revolving Daily Summary",rows:f.revolvingDailySummaryRows().rows}),T.push({name:"Revolving History",rows:f.revolvingHistoryRows().rows})),f.selectedTypes.has("summary")&&T.push({name:"Summary",rows:f.summaryRows()});const h=d(T.length?T:[{name:"Summary",rows:f.summaryRows()}]),w=`laba101-report-${m.from}-to-${m.to}.xls`;return new File([h],w,{type:"application/vnd.ms-excel"})},p=async()=>{const m=l();if(!A.isNativePlatform())return{fileName:m.name,uri:""};const f=await m.text(),T=m.name;await Xe.writeFile({path:T,data:f,directory:be.External,encoding:$e.UTF8});const{uri:h}=await Xe.getUri({path:T,directory:be.External});return{fileName:m.name,uri:h}},u=()=>{const m=l(),f=ye(),T=`laba101-report-${f.from}-to-${f.to}.xls`,h=m,w=URL.createObjectURL(h),g=document.createElement("a");return g.href=w,g.download=T,document.body.appendChild(g),g.click(),setTimeout(()=>{g.remove(),URL.revokeObjectURL(w)},1e3),T},y=async m=>{const f=document.querySelector(m==="export"?"#export-report":"#email-report");f&&(f.disabled=!0,f.textContent=m==="export"?"Exporting...":"Sending...");try{if(m==="export")if(A.isNativePlatform()){const T=await p();alert(`Report exported as "${T.fileName}".`)}else{const T=u();alert(`Report saved: ${T}`)}else{const T=await ct("report_email")||"";if(!T){alert("Please configure a report email in Settings first.");return}const h=ye(),w=`Laba101 report ${h.from} to ${h.to}`;if(A.isNativePlatform()){const g=await p();try{await Mt.share({title:w,text:`Please find the attached Laba101 report file: ${g.fileName}`,files:[g.uri],dialogTitle:"Send report via email"}),alert(`Report saved and shared as "${g.fileName}".`)}catch(R){const L=String(R).toLowerCase();if(L.includes("share canceled")||L.includes("canceled"))alert(`Report saved as "${g.fileName}".`);else throw R}}else{const g=u(),R=`Hi,

Please find the attached Laba101 report file: ${g}

Date range: ${h.from} to ${h.to}`,L=`mailto:${T}?subject=${encodeURIComponent(w)}&body=${encodeURIComponent(R)}`;setTimeout(()=>{window.location.href=L},800),alert(`Report downloaded as "${g}".
Your email app will open — please attach the file and send.`)}}}catch(T){alert("Failed: "+String(T))}finally{f&&(f.disabled=!1,f.textContent=m==="export"?"Export Excel":"Send to Email")}};document.querySelector("#export-report")?.addEventListener("click",async()=>{await y("export")}),document.querySelector("#email-report")?.addEventListener("click",async()=>{await y("email")})}function ur(){document.querySelector("#order-queue-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);o.orderSearch=String(t.get("orderSearch")??"").trim(),o.orderDateFilter=String(t.get("orderDateFilter")??"").trim(),o.orderPaymentFilter=String(t.get("orderPaymentFilter")??"").trim(),E()}),document.querySelector("#order-queue-clear")?.addEventListener("click",()=>{o.orderSearch="",o.orderDateFilter="",o.orderPaymentFilter="",E()}),document.querySelector("#archived-order-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);o.archivedOrderSearch=String(t.get("archivedOrderSearch")??"").trim(),E()}),document.querySelector("#archived-order-clear")?.addEventListener("click",()=>{o.archivedOrderSearch="",E()})}function mr(){document.querySelector("#customer-search-form")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);o.customerSearch=String(t.get("customerSearch")??"").trim(),E()}),document.querySelector("#customer-search-clear")?.addEventListener("click",()=>{o.customerSearch="",E()})}function vr(){document.querySelector("#machine-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await Ca({machineName:String(t.get("machineName")??""),machineType:String(t.get("machineType")),status:String(t.get("status")),branch:String(t.get("branch")??"")}),await E()}),document.querySelector("#subcleaning-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=e.currentTarget.querySelector('button[type="submit"]');t&&(t.disabled=!0,t.textContent="Starting...");const a=new FormData(e.currentTarget),r=a.getAll("machineIds").map(Number);if(!r.length){alert("Please select at least one machine to clean."),t&&(t.disabled=!1,t.textContent="Start Cleaning");return}await Oa({date:String(a.get("date")??""),machineIds:r,cleaningStatus:String(a.get("cleaningStatus")??""),notes:String(a.get("notes")??""),branch:String(a.get("branch")??"")}),await E()}),document.querySelectorAll(".complete-cleaning-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.machineId),a=e.dataset.branch??"";e.disabled=!0,e.textContent="Completing...",await Da(t,a),await E()})}),document.querySelectorAll(".deactivate-machine-btn, .activate-machine-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.id),a=e.classList.contains("deactivate-machine-btn");await $a(t,a?"inactive":"available"),await E()})})}function pr(e){const t=document.querySelector("#add-staff-modal"),a=document.querySelector("#open-add-staff-modal"),r=document.querySelector("#close-add-staff-modal"),n=document.querySelector("#staff-form"),s=()=>{n?.reset(),n&&(n.querySelector("[name=id]").value="");const c=document.querySelector("#add-staff-title");c&&(c.textContent="Add staff member"),t?.removeAttribute("hidden")},i=()=>{t?.setAttribute("hidden",""),n?.reset()};a?.addEventListener("click",s),r?.addEventListener("click",i),t?.addEventListener("click",c=>{c.target===t&&i()}),document.querySelectorAll(".edit-staff-btn").forEach(c=>{c.addEventListener("click",()=>{const d=Number(c.dataset.id),l=e.find(p=>p.id===d);if(l&&n){n.querySelector("[name=id]").value=String(l.id),n.querySelector("[name=name]").value=l.name,n.querySelector("[name=email]").value=l.email,n.querySelector("[name=password]").value=l.password,n.querySelector("[name=role]").value=l.role,n.querySelector("[name=branch]").value=l.branch;const p=document.querySelector("#add-staff-title");p&&(p.textContent="Edit staff member"),t?.removeAttribute("hidden")}})}),document.querySelectorAll(".deactivate-staff-btn, .activate-staff-btn").forEach(c=>{c.addEventListener("click",async()=>{const d=Number(c.dataset.id),l=e.find(p=>p.id===d);l&&(await Ve(d,{isActive:l.isActive!==0?0:1}),await E())})}),n?.addEventListener("submit",async c=>{c.preventDefault();const d=document.querySelector("#staff-save-btn");d&&(d.disabled=!0,d.textContent="Saving...");const l=new FormData(n),p=l.get("id")?Number(l.get("id")):void 0,u=String(l.get("name")??"").trim(),y=String(l.get("email")??"").trim(),m=String(l.get("password")??"password")||"password",f=String(l.get("role")),T=String(l.get("branch")??"");if(!u||!y){alert("Name and email are required."),d&&(d.disabled=!1,d.textContent="Save staff member");return}try{p?await Ve(p,{name:u,email:y,password:m,role:f,branch:T}):await ra({name:u,email:y,password:m,role:f,branch:T}),i(),await E()}catch{alert("Failed to save staff. The email may already be in use."),d&&(d.disabled=!1,d.textContent="Save staff member")}})}function fr(){document.querySelector("#settings-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await ge("branch",String(t.get("branch")??"Main Store")),await ge("fold_rate",String(t.get("foldRate")??"5")),String(t.get("reportEmail")??"")&&await ge("report_email",String(t.get("reportEmail"))),alert("Settings saved successfully!"),await E()})}await ea();const nt=localStorage.getItem(ue);if(nt)try{const e=JSON.parse(nt);if(e.email&&e.remembered){const t=await dt(e.email,"password")??null;o.currentUser=t}}catch{localStorage.removeItem(ue)}function yr(e,t,a,r){const n=e.filter(m=>m.status==="revolving").reduce((m,f)=>m+f.cashAmount,0),s=t.filter(m=>m.type==="add").reduce((m,f)=>m+f.amount,0),i=t.filter(m=>m.type==="disbursement").reduce((m,f)=>m+f.amount,0),c=n+s-i,d=o.revolvingHistoryFrom||"0000-01-01",l=o.revolvingHistoryTo||"9999-12-31",p=t.filter(m=>{const f=B(m.createdAt);return f>=d&&f<=l}),u=e.map(m=>{const f=ht(m.saleDate,a,r,m.cashAmount),T=m.status==="revolving"?'<span class="ok">Revolving</span>':m.status==="endorsed"?`<span class="warn">Endorsed to ${v(m.endorsedTo)}</span>`:'<span class="meta">Pending</span>',h=m.status!=="revolving"&&m.status!=="endorsed"?`<div class="row-actions">
          <button class="primary revolving-btn" data-id="${m.id}">Revolving</button>
          <button class="secondary endorsed-btn" data-id="${m.id}" data-date="${ae(m.saleDate)}">Endorsed</button>
        </div>`:"";return[`<strong>${v(ae(m.saleDate))}</strong>`,`<strong class="ok">${$(f)}</strong>`,T,m.statusUpdatedAt?v(ae(m.statusUpdatedAt)):"-",h]}),y=p.map(m=>[Ia(m.createdAt),`<strong>${v(m.revolvingNumber)}</strong>`,v(m.name),`<strong class="${m.type==="disbursement"?"warn":"ok"}">${m.type==="disbursement"?"-":"+"}${$(m.amount)}</strong>`,v(m.category),v(m.description||"-"),`<span class="${m.type==="add"?"ok":"warn"}">${m.type==="add"?"Add Revolving Fund":"Disbursement"}</span>`]);return`
    <section class="grid content full">
      <div class="panel-header" style="display: flex; gap: 16px; margin-bottom: 24px; align-items: center;">
        <button class="primary" id="add-revolving-fund-btn">Add Revolving Fund</button>
        <button class="secondary" id="revolving-disbursement-btn">Disbursement</button>
      </div>

      <article class="panel">
        <div style="background-color: #061a42; color: white; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
          <p style="font-size: 12px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin: 0 0 8px 0;">Revolving Fund Total</p>
          <p style="font-size: 32px; font-weight: 800; margin: 0;">${$(c)}</p>
        </div>
        ${O("Daily Summary","Cash on hand per day (order cash + manual cash − disbursements)")}
        ${we(["Date of Sales","Cash on Hand","Status","Date Update","Action"],u,"data-table revolving-summary-datatable")}
      </article>

      <article class="panel">
        ${O("Revolving Table History","Filter by date — DISB numbers shared with Daily Report expenses")}
        <form id="revolving-history-filters" class="form revolving-history-filters">
          <div class="form-row">
            <label>From<input name="revolvingHistoryFrom" type="date" value="${o.revolvingHistoryFrom}" /></label>
            <label>To<input name="revolvingHistoryTo" type="date" value="${o.revolvingHistoryTo}" /></label>
          </div>
          <div class="row-actions">
            <button class="primary" type="submit">Apply filter</button>
            <button class="secondary" type="button" id="revolving-history-clear">Clear</button>
          </div>
        </form>
        ${we(["Date","Disbursement #","Name","Amount","Category","Description","Type"],y,"data-table revolving-history-datatable")}
      </article>

      ${o.endorseModalOpen?`
        <div class="modal-backdrop" role="presentation">
          <div class="receipt-modal" role="dialog" aria-modal="true" style="max-width: 400px; width: 90%;">
            <form id="endorse-form" class="form" style="padding: 24px;">
              <h3 style="margin-top: 0;">Endorse Money</h3>
              <p class="meta" style="margin-bottom: 16px;">Endorsing cash from <strong>${v(o.endorseSaleDate)}</strong>.</p>
              <label>Endorsed to (Name)<input name="endorsedTo" type="text" placeholder="Enter name" required /></label>
              <div class="modal-actions" style="margin-top: 24px; padding: 0;">
                <button class="primary" type="submit">Submit Endorsement</button>
                <button class="secondary" type="button" id="close-endorse-modal">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      `:""}

      ${o.revolvingModalOpen?`
        <div class="modal-backdrop" role="presentation">
          <div class="receipt-modal" role="dialog" aria-modal="true" style="max-width: 400px; width: 90%;">
            <div style="padding: 24px;">
              <h3 style="margin-top: 0;">Confirm Revolving Fund</h3>
              <p style="margin-bottom: 24px;">Are you sure you want to mark this daily sale as revolving?</p>
              <div class="modal-actions" style="padding: 0;">
                <button class="primary" id="confirm-revolving-btn">Confirm</button>
                <button class="secondary" id="close-revolving-modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      `:""}

      ${o.addFundModalOpen?`
        <div class="modal-backdrop" role="presentation">
          <div class="receipt-modal" role="dialog" aria-modal="true" style="max-width: 400px; width: 90%;">
            <form id="add-fund-form" class="form" style="padding: 24px;">
              <h3 style="margin-top: 0;">Add Revolving Fund</h3>
              <label>Name<input name="name" type="text" required /></label>
              <label>Amount<input name="amount" type="number" step="0.01" min="0.01" required /></label>
              <div class="modal-actions" style="margin-top: 24px; padding: 0;">
                <button class="primary" type="submit">Add Fund</button>
                <button class="secondary" type="button" id="close-add-fund-modal">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      `:""}

      ${o.disbursementModalOpen?`
        <div class="modal-backdrop" role="presentation">
          <div class="receipt-modal" role="dialog" aria-modal="true" style="max-width: 400px; width: 90%;">
            <form id="disbursement-form" class="form" style="padding: 24px;">
              <h3 style="margin-top: 0;">Disbursement</h3>
              <label>Name<input name="name" type="text" required /></label>
              <label>Amount<input name="amount" type="number" step="0.01" min="0.01" required /></label>
              <label>Category<input name="category" type="text" required /></label>
              <label>Description<input name="description" type="text" /></label>
              <div class="modal-actions" style="margin-top: 24px; padding: 0;">
                <button class="primary" type="submit">Disburse</button>
                <button class="secondary" type="button" id="close-disbursement-modal">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      `:""}
    </section>
  `}function hr(){document.querySelector("#revolving-history-filters")?.addEventListener("submit",async p=>{p.preventDefault();const u=new FormData(p.currentTarget);o.revolvingHistoryFrom=String(u.get("revolvingHistoryFrom")??"").trim(),o.revolvingHistoryTo=String(u.get("revolvingHistoryTo")??"").trim(),await E()}),document.querySelector("#revolving-history-clear")?.addEventListener("click",async()=>{o.revolvingHistoryFrom="",o.revolvingHistoryTo="",await E()}),document.querySelectorAll(".revolving-btn").forEach(p=>{p.addEventListener("click",async()=>{o.revolvingModalOpen=!0,o.revolvingSaleId=Number(p.dataset.id),await E()})});const e=document.getElementById("confirm-revolving-btn");e&&e.addEventListener("click",async()=>{await Je(o.revolvingSaleId,"revolving",null,new Date().toISOString()),o.revolvingModalOpen=!1,await E()});const t=document.getElementById("close-revolving-modal");t&&t.addEventListener("click",async()=>{o.revolvingModalOpen=!1,await E()}),document.querySelectorAll(".endorsed-btn").forEach(p=>{p.addEventListener("click",async()=>{o.endorseModalOpen=!0,o.endorseSaleId=Number(p.dataset.id),o.endorseSaleDate=p.dataset.date??"",await E()})});const a=document.getElementById("close-endorse-modal");a&&a.addEventListener("click",async()=>{o.endorseModalOpen=!1,await E()});const r=document.getElementById("endorse-form");r&&r.addEventListener("submit",async p=>{p.preventDefault();const u=new FormData(r),y=String(u.get("endorsedTo")??"").trim();y&&(await Je(o.endorseSaleId,"endorsed",y,new Date().toISOString()),o.endorseModalOpen=!1,await E())});const n=document.getElementById("add-revolving-fund-btn");n&&n.addEventListener("click",async()=>{o.addFundModalOpen=!0,await E()});const s=document.getElementById("close-add-fund-modal");s&&s.addEventListener("click",async()=>{o.addFundModalOpen=!1,await E()});const i=document.getElementById("add-fund-form");i&&i.addEventListener("submit",async p=>{p.preventDefault();const u=new FormData(i);await ze({name:String(u.get("name")??"").trim(),amount:Number(u.get("amount")??0),category:"Add Revolving Fund",description:null,type:"add",createdAt:new Date().toISOString()}),o.addFundModalOpen=!1,await E()});const c=document.getElementById("revolving-disbursement-btn");c&&c.addEventListener("click",async()=>{o.disbursementModalOpen=!0,await E()});const d=document.getElementById("close-disbursement-modal");d&&d.addEventListener("click",async()=>{o.disbursementModalOpen=!1,await E()});const l=document.getElementById("disbursement-form");l&&l.addEventListener("submit",async p=>{p.preventDefault();const u=new FormData(l);await ze({name:String(u.get("name")??"").trim(),amount:Number(u.get("amount")??0),category:String(u.get("category")??"").trim(),description:String(u.get("description")??"").trim(),type:"disbursement",expenseDate:j(),createdAt:new Date().toISOString()}),o.disbursementModalOpen=!1,await E()})}await E();export{$e as E,De as W,Dt as b};
