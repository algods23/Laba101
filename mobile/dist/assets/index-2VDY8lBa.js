(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();var ne;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(ne||(ne={}));class Ne extends Error{constructor(t,a,r){super(t),this.message=t,this.code=a,this.data=r}}const At=e=>{var t,a;return e?.androidBridge?"android":!((a=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},Lt=e=>{const t=e.CapacitorCustomPlatform||null,a=e.Capacitor||{},r=a.Plugins=a.Plugins||{},n=()=>t!==null?t.name:At(e),s=()=>n()!=="web",i=u=>{const y=l.get(u);return!!(y?.platforms.has(n())||o(u))},o=u=>{var y;return(y=a.PluginHeaders)===null||y===void 0?void 0:y.find(f=>f.name===u)},m=u=>e.console.error(u),l=new Map,d=(u,y={})=>{const f=l.get(u);if(f)return console.warn(`Capacitor plugin "${u}" already registered. Cannot register plugins twice.`),f.proxy;const b=n(),E=o(u);let p;const T=async()=>(!p&&b in y?p=typeof y[b]=="function"?p=await y[b]():p=y[b]:t!==null&&!p&&"web"in y&&(p=typeof y.web=="function"?p=await y.web():p=y.web),p),h=(x,q)=>{var k,M;if(E){const K=E?.methods.find(_=>q===_.name);if(K)return K.rtype==="promise"?_=>a.nativePromise(u,q.toString(),_):(_,g)=>a.nativeCallback(u,q.toString(),_,g);if(x)return(k=x[q])===null||k===void 0?void 0:k.bind(x)}else{if(x)return(M=x[q])===null||M===void 0?void 0:M.bind(x);throw new Ne(`"${u}" plugin is not implemented on ${b}`,ne.Unimplemented)}},C=x=>{let q;const k=(...M)=>{const K=T().then(_=>{const g=h(_,x);if(g){const D=g(...M);return q=D?.remove,D}else throw new Ne(`"${u}.${x}()" is not implemented on ${b}`,ne.Unimplemented)});return x==="addListener"&&(K.remove=async()=>q()),K};return k.toString=()=>`${x.toString()}() { [capacitor code] }`,Object.defineProperty(k,"name",{value:x,writable:!1,configurable:!1}),k},R=C("addListener"),O=C("removeListener"),U=(x,q)=>{const k=R({eventName:x},q),M=async()=>{const _=await k;O({eventName:x,callbackId:_},q)},K=new Promise(_=>k.then(()=>_({remove:M})));return K.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await M()},K},F=new Proxy({},{get(x,q){switch(q){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return E?U:R;case"removeListener":return O;default:return C(q)}}});return r[u]=F,l.set(u,{name:u,proxy:F,platforms:new Set([...Object.keys(y),...E?[b]:[]])}),F};return a.convertFileSrc||(a.convertFileSrc=u=>u),a.getPlatform=n,a.handleError=m,a.isNativePlatform=s,a.isPluginAvailable=i,a.registerPlugin=d,a.Exception=Ne,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},Ct=e=>e.Capacitor=Lt(e),A=Ct(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),ae=A.registerPlugin;class De{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,a){let r=!1;this.listeners[t]||(this.listeners[t]=[],r=!0),this.listeners[t].push(a);const s=this.windowListeners[t];s&&!s.registered&&this.addWindowListener(s),r&&this.sendRetainedArgumentsForEvent(t);const i=async()=>this.removeListener(t,a);return Promise.resolve({remove:i})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,a,r){const n=this.listeners[t];if(!n){if(r){let s=this.retainedEventArguments[t];s||(s=[]),s.push(a),this.retainedEventArguments[t]=s}return}n.forEach(s=>s(a))}hasListeners(t){var a;return!!(!((a=this.listeners[t])===null||a===void 0)&&a.length)}registerWindowListener(t,a){this.windowListeners[a]={registered:!1,windowEventName:t,pluginEventName:a,handler:r=>{this.notifyListeners(a,r)}}}unimplemented(t="not implemented"){return new A.Exception(t,ne.Unimplemented)}unavailable(t="not available"){return new A.Exception(t,ne.Unavailable)}async removeListener(t,a){const r=this.listeners[t];if(!r)return;const n=r.indexOf(a);this.listeners[t].splice(n,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const a=this.retainedEventArguments[t];a&&(delete this.retainedEventArguments[t],a.forEach(r=>{this.notifyListeners(t,r)}))}}const _e=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Be=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class $t extends De{async getCookies(){const t=document.cookie,a={};return t.split(";").forEach(r=>{if(r.length<=0)return;let[n,s]=r.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");n=Be(n).trim(),s=Be(s).trim(),a[n]=s}),a}async setCookie(t){try{const a=_e(t.key),r=_e(t.value),n=t.expires?`; expires=${t.expires.replace("expires=","")}`:"",s=(t.path||"/").replace("path=",""),i=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${a}=${r||""}${n}; path=${s}; ${i};`}catch(a){return Promise.reject(a)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const a of t)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}ae("CapacitorCookies",{web:()=>new $t});const Rt=async e=>new Promise((t,a)=>{const r=new FileReader;r.onload=()=>{const n=r.result;t(n.indexOf(",")>=0?n.split(",")[1]:n)},r.onerror=n=>a(n),r.readAsDataURL(e)}),Ot=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(n=>n.toLocaleLowerCase()).reduce((n,s,i)=>(n[s]=e[t[i]],n),{})},Dt=(e,t=!0)=>e?Object.entries(e).reduce((r,n)=>{const[s,i]=n;let o,m;return Array.isArray(i)?(m="",i.forEach(l=>{o=t?encodeURIComponent(l):l,m+=`${s}=${o}&`}),m.slice(0,-1)):(o=t?encodeURIComponent(i):i,m=`${s}=${o}`),`${r}&${m}`},"").substr(1):null,Pt=(e,t={})=>{const a=Object.assign({method:e.method||"GET",headers:e.headers},t),n=Ot(e.headers)["content-type"]||"";if(typeof e.data=="string")a.body=e.data;else if(n.includes("application/x-www-form-urlencoded")){const s=new URLSearchParams;for(const[i,o]of Object.entries(e.data||{}))s.set(i,o);a.body=s.toString()}else if(n.includes("multipart/form-data")||e.data instanceof FormData){const s=new FormData;if(e.data instanceof FormData)e.data.forEach((o,m)=>{s.append(m,o)});else for(const o of Object.keys(e.data))s.append(o,e.data[o]);a.body=s;const i=new Headers(a.headers);i.delete("content-type"),a.headers=i}else(n.includes("application/json")||typeof e.data=="object")&&(a.body=JSON.stringify(e.data));return a};class xt extends De{async request(t){const a=Pt(t,t.webFetchExtra),r=Dt(t.params,t.shouldEncodeUrlParams),n=r?`${t.url}?${r}`:t.url,s=await fetch(n,a),i=s.headers.get("content-type")||"";let{responseType:o="text"}=s.ok?t:{};i.includes("application/json")&&(o="json");let m,l;switch(o){case"arraybuffer":case"blob":l=await s.blob(),m=await Rt(l);break;case"json":m=await s.json();break;default:m=await s.text()}const d={};return s.headers.forEach((u,y)=>{d[y]=u}),{data:m,headers:d,status:s.status,url:s.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}ae("CapacitorHttp",{web:()=>new xt});var je;(function(e){e.Dark="DARK",e.Light="LIGHT",e.Default="DEFAULT"})(je||(je={}));var He;(function(e){e.StatusBar="StatusBar",e.NavigationBar="NavigationBar"})(He||(He={}));class It extends De{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}ae("SystemBars",{web:()=>new It});const qt="modulepreload",Ft=function(e){return"/"+e},We={},Pe=function(t,a,r){let n=Promise.resolve();if(a&&a.length>0){let m=function(l){return Promise.all(l.map(d=>Promise.resolve(d).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),o=i?.nonce||i?.getAttribute("nonce");n=m(a.map(l=>{if(l=Ft(l),l in We)return;We[l]=!0;const d=l.endsWith(".css"),u=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const y=document.createElement("link");if(y.rel=d?"stylesheet":qt,d||(y.as="script"),y.crossOrigin="",y.href=l,o&&y.setAttribute("nonce",o),document.head.appendChild(y),d)return new Promise((f,b)=>{y.addEventListener("load",f),y.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(i){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=i,window.dispatchEvent(o),!o.defaultPrevented)throw i}return n.then(i=>{for(const o of i||[])o.status==="rejected"&&s(o.reason);return t().catch(s)})};function kt(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,a){return new Proxy({},{get(r,n){return(s,i,o)=>{const m=e.Capacitor.Plugins[a];if(m===void 0){o(new Error(`Capacitor plugin ${a} not found`));return}if(typeof m[n]!="function"){o(new Error(`Method ${n} not found in Capacitor plugin ${a}`));return}(async()=>{try{const l=await m[n](s);i(l)}catch(l){o(l)}})()}}})}})}function Ut(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,a){return e.cordova.plugins[a]}})}function Mt(e=!1){typeof window>"u"||(window.CapacitorUtils=window.CapacitorUtils||{},window.Capacitor!==void 0&&!e?kt(window):window.cordova!==void 0&&Ut(window))}var be;(function(e){e.Documents="DOCUMENTS",e.Data="DATA",e.Library="LIBRARY",e.Cache="CACHE",e.External="EXTERNAL",e.ExternalStorage="EXTERNAL_STORAGE",e.ExternalCache="EXTERNAL_CACHE",e.LibraryNoCloud="LIBRARY_NO_CLOUD",e.Temporary="TEMPORARY"})(be||(be={}));var $e;(function(e){e.UTF8="utf8",e.ASCII="ascii",e.UTF16="utf16"})($e||($e={}));const Xe=ae("Filesystem",{web:()=>Pe(()=>import("./web-C91v_rpU.js"),[]).then(e=>new e.FilesystemWeb)});Mt();const _t=ae("Share",{web:()=>Pe(()=>import("./web-BEhjyiBG.js"),[]).then(e=>new e.ShareWeb)});class Bt{constructor(t){this.sqlite=t,this._connectionDict=new Map}async initWebStore(){try{return await this.sqlite.initWebStore(),Promise.resolve()}catch(t){return Promise.reject(t)}}async saveToStore(t){try{return await this.sqlite.saveToStore({database:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async saveToLocalDisk(t){try{return await this.sqlite.saveToLocalDisk({database:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getFromLocalDiskToStore(t){const a=t??!0;try{return await this.sqlite.getFromLocalDiskToStore({overwrite:a}),Promise.resolve()}catch(r){return Promise.reject(r)}}async echo(t){try{const a=await this.sqlite.echo({value:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isSecretStored(){try{const t=await this.sqlite.isSecretStored();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async setEncryptionSecret(t){try{return await this.sqlite.setEncryptionSecret({passphrase:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async changeEncryptionSecret(t,a){try{return await this.sqlite.changeEncryptionSecret({passphrase:t,oldpassphrase:a}),Promise.resolve()}catch(r){return Promise.reject(r)}}async clearEncryptionSecret(){try{return await this.sqlite.clearEncryptionSecret(),Promise.resolve()}catch(t){return Promise.reject(t)}}async checkEncryptionSecret(t){try{const a=await this.sqlite.checkEncryptionSecret({passphrase:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async addUpgradeStatement(t,a){try{return t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.addUpgradeStatement({database:t,upgrade:a}),Promise.resolve()}catch(r){return Promise.reject(r)}}async createConnection(t,a,r,n,s){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.createConnection({database:t,encrypted:a,mode:r,version:n,readonly:s});const i=new Ke(t,s,this.sqlite),o=s?`RO_${t}`:`RW_${t}`;return this._connectionDict.set(o,i),Promise.resolve(i)}catch(i){return Promise.reject(i)}}async closeConnection(t,a){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.closeConnection({database:t,readonly:a});const r=a?`RO_${t}`:`RW_${t}`;return this._connectionDict.delete(r),Promise.resolve()}catch(r){return Promise.reject(r)}}async isConnection(t,a){const r={};t.endsWith(".db")&&(t=t.slice(0,-3));const n=a?`RO_${t}`:`RW_${t}`;return r.result=this._connectionDict.has(n),Promise.resolve(r)}async retrieveConnection(t,a){t.endsWith(".db")&&(t=t.slice(0,-3));const r=a?`RO_${t}`:`RW_${t}`;if(this._connectionDict.has(r)){const n=this._connectionDict.get(r);return typeof n<"u"?Promise.resolve(n):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async getNCDatabasePath(t,a){try{const r=await this.sqlite.getNCDatabasePath({path:t,database:a});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async createNCConnection(t,a){try{await this.sqlite.createNCConnection({databasePath:t,version:a});const r=new Ke(t,!0,this.sqlite),n=`RO_${t})`;return this._connectionDict.set(n,r),Promise.resolve(r)}catch(r){return Promise.reject(r)}}async closeNCConnection(t){try{await this.sqlite.closeNCConnection({databasePath:t});const a=`RO_${t})`;return this._connectionDict.delete(a),Promise.resolve()}catch(a){return Promise.reject(a)}}async isNCConnection(t){const a={},r=`RO_${t})`;return a.result=this._connectionDict.has(r),Promise.resolve(a)}async retrieveNCConnection(t){if(this._connectionDict.has(t)){const a=`RO_${t})`,r=this._connectionDict.get(a);return typeof r<"u"?Promise.resolve(r):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async isNCDatabase(t){try{const a=await this.sqlite.isNCDatabase({databasePath:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async retrieveAllConnections(){return this._connectionDict}async closeAllConnections(){const t=new Map;try{for(const a of this._connectionDict.keys()){const r=a.substring(3),n=a.substring(0,3)==="RO_";await this.sqlite.closeConnection({database:r,readonly:n}),t.set(a,null)}for(const a of t.keys())this._connectionDict.delete(a);return Promise.resolve()}catch(a){return Promise.reject(a)}}async checkConnectionsConsistency(){try{const t=[...this._connectionDict.keys()],a=[],r=[];for(const s of t)a.push(s.substring(0,2)),r.push(s.substring(3));const n=await this.sqlite.checkConnectionsConsistency({dbNames:r,openModes:a});return n.result||(this._connectionDict=new Map),Promise.resolve(n)}catch(t){return this._connectionDict=new Map,Promise.reject(t)}}async importFromJson(t){try{const a=await this.sqlite.importFromJson({jsonstring:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isJsonValid(t){try{const a=await this.sqlite.isJsonValid({jsonstring:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async copyFromAssets(t){const a=t??!0;try{return await this.sqlite.copyFromAssets({overwrite:a}),Promise.resolve()}catch(r){return Promise.reject(r)}}async getFromHTTPRequest(t,a){const r=a??!0;try{return await this.sqlite.getFromHTTPRequest({url:t,overwrite:r}),Promise.resolve()}catch(n){return Promise.reject(n)}}async isDatabaseEncrypted(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const a=await this.sqlite.isDatabaseEncrypted({database:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isInConfigEncryption(){try{const t=await this.sqlite.isInConfigEncryption();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isInConfigBiometricAuth(){try{const t=await this.sqlite.isInConfigBiometricAuth();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isDatabase(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const a=await this.sqlite.isDatabase({database:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async getDatabaseList(){try{const a=(await this.sqlite.getDatabaseList()).values;a.sort();const r={values:a};return Promise.resolve(r)}catch(t){return Promise.reject(t)}}async getMigratableDbList(t){const a=t||"default";try{const r=await this.sqlite.getMigratableDbList({folderPath:a});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async addSQLiteSuffix(t,a){const r=t||"default",n=a||[];try{const s=await this.sqlite.addSQLiteSuffix({folderPath:r,dbNameList:n});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async deleteOldDatabases(t,a){const r=t||"default",n=a||[];try{const s=await this.sqlite.deleteOldDatabases({folderPath:r,dbNameList:n});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async moveDatabasesAndAddSuffix(t,a){const r=t||"default",n=a||[];return this.sqlite.moveDatabasesAndAddSuffix({folderPath:r,dbNameList:n})}}class Ke{constructor(t,a,r){this.dbName=t,this.readonly=a,this.sqlite=r}getConnectionDBName(){return this.dbName}getConnectionReadOnly(){return this.readonly}async open(){try{return await this.sqlite.open({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async close(){try{return await this.sqlite.close({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async beginTransaction(){try{const t=await this.sqlite.beginTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async commitTransaction(){try{const t=await this.sqlite.commitTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async rollbackTransaction(){try{const t=await this.sqlite.rollbackTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTransactionActive(){try{const t=await this.sqlite.isTransactionActive({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async loadExtension(t){try{return await this.sqlite.loadExtension({database:this.dbName,path:t,readonly:this.readonly}),Promise.resolve()}catch(a){return Promise.reject(a)}}async enableLoadExtension(t){try{return await this.sqlite.enableLoadExtension({database:this.dbName,toggle:t,readonly:this.readonly}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getUrl(){try{const t=await this.sqlite.getUrl({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getVersion(){try{const t=await this.sqlite.getVersion({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getTableList(){try{const t=await this.sqlite.getTableList({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async execute(t,a=!0,r=!0){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const n=await this.sqlite.execute({database:this.dbName,statements:t,transaction:a,readonly:!1,isSQL92:r});return Promise.resolve(n)}}catch(n){return Promise.reject(n)}}async query(t,a,r=!0){let n;try{return a&&a.length>0?n=await this.sqlite.query({database:this.dbName,statement:t,values:a,readonly:this.readonly,isSQL92:!0}):n=await this.sqlite.query({database:this.dbName,statement:t,values:[],readonly:this.readonly,isSQL92:r}),n=await this.reorderRows(n),Promise.resolve(n)}catch(s){return Promise.reject(s)}}async run(t,a,r=!0,n="no",s=!0){let i;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(a&&a.length>0?i=await this.sqlite.run({database:this.dbName,statement:t,values:a,transaction:r,readonly:!1,returnMode:n,isSQL92:!0}):i=await this.sqlite.run({database:this.dbName,statement:t,values:[],transaction:r,readonly:!1,returnMode:n,isSQL92:s}),i.changes=await this.reorderRows(i.changes),Promise.resolve(i))}catch(o){return Promise.reject(o)}}async executeSet(t,a=!0,r="no",n=!0){let s;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(s=await this.sqlite.executeSet({database:this.dbName,set:t,transaction:a,readonly:!1,returnMode:r,isSQL92:n}),s.changes=await this.reorderRows(s.changes),Promise.resolve(s))}catch(i){return Promise.reject(i)}}async isExists(){try{const t=await this.sqlite.isDBExists({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTable(t){try{const a=await this.sqlite.isTableExists({database:this.dbName,table:t,readonly:this.readonly});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isDBOpen(){try{const t=await this.sqlite.isDBOpen({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async delete(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteDatabase({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async createSyncTable(){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const t=await this.sqlite.createSyncTable({database:this.dbName,readonly:!1});return Promise.resolve(t)}}catch(t){return Promise.reject(t)}}async setSyncDate(t){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.setSyncDate({database:this.dbName,syncdate:t,readonly:!1}),Promise.resolve())}catch(a){return Promise.reject(a)}}async getSyncDate(){try{const t=await this.sqlite.getSyncDate({database:this.dbName,readonly:this.readonly});let a="";return t.syncDate>0&&(a=new Date(t.syncDate*1e3).toISOString()),Promise.resolve(a)}catch(t){return Promise.reject(t)}}async exportToJson(t,a=!1){try{const r=await this.sqlite.exportToJson({database:this.dbName,jsonexportmode:t,readonly:this.readonly,encrypted:a});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async deleteExportedRows(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteExportedRows({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async executeTransaction(t,a=!0){let r=0,n=!1;if(this.readonly)return Promise.reject("not allowed in read-only mode");if(await this.sqlite.beginTransaction({database:this.dbName}),n=await this.sqlite.isTransactionActive({database:this.dbName}),!n)return Promise.reject("After Begin Transaction, no transaction active");try{for(const o of t){if(typeof o!="object"||!("statement"in o))throw new Error("Error a task.statement must be provided");if("values"in o&&o.values&&o.values.length>0){const m=o.statement.toUpperCase().includes("RETURNING")?"all":"no",l=await this.sqlite.run({database:this.dbName,statement:o.statement,values:o.values,transaction:!1,readonly:!1,returnMode:m,isSQL92:a});if(l.changes.changes<0)throw new Error("Error in transaction method run ");r+=l.changes.changes}else{const m=await this.sqlite.execute({database:this.dbName,statements:o.statement,transaction:!1,readonly:!1});if(m.changes.changes<0)throw new Error("Error in transaction method execute ");r+=m.changes.changes}}const s=await this.sqlite.commitTransaction({database:this.dbName});r+=s.changes.changes;const i={changes:{changes:r}};return Promise.resolve(i)}catch(s){const i=s.message?s.message:s;return await this.sqlite.rollbackTransaction({database:this.dbName}),Promise.reject(i)}}async reorderRows(t){const a=t;if(t?.values&&typeof t.values[0]=="object"&&Object.keys(t.values[0]).includes("ios_columns")){const r=t.values[0].ios_columns,n=[];for(let s=1;s<t.values.length;s++){const i=t.values[s],o={};for(const m of r)o[m]=i[m];n.push(o)}a.values=n}return Promise.resolve(a)}}const jt=ae("CapacitorSQLite",{web:()=>Pe(()=>import("./web-CBddo9Iv.js"),[]).then(e=>new e.CapacitorSQLiteWeb),electron:()=>window.CapacitorCustomPlatform.plugins.CapacitorSQLite});function Ht(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}const Wt="laba101_offline",Ee="fresh_start_reset_v1",Xt=new Bt(jt);let fe=null;const X=[{id:1,name:"Laba101 Admin",email:"admin@laba101.test",password:"password",role:"admin",branch:"Main Store"},{id:2,name:"Gensan Branch Staff",email:"staff@laba101.gensan",password:"password",role:"staff",branch:"Gensan Branch"}],Se=[],V=[G(1,"Drop-off","P185. Includes wash, dry, and fold.","Drop-Off","order",185,8,40,["Wash","Dry","Fold"],0,24),G(2,"Full Service","P200. Wash, Fabcon, detergent, dry, and fold.","Full Service","order",200,8,40,["Wash","Dry","Fold","Detergent","Fabcon"],0,24),G(3,"Self Service Wash","P60. Self-service wash (max 8kg per load).","Self Service","order",60,8,null,["Wash"],0,1),G(4,"Self Service Dry","P70. Self-service dry (40 mins).","Self Service","order",70,8,40,["Dry"],0,1),G(6,"Dry 10 mins","Additional drying time (10 mins).","Add-on","addon",30,8,10,["Dry"],0,1),G(7,"Dry 20 mins","Additional drying time (20 mins).","Add-on","addon",50,8,20,["Dry"],0,1),G(8,"Dry 40 mins","Additional drying time (40 mins).","Add-on","addon",70,8,40,["Dry"],0,1),G(9,"Additional Zonrox","Extra Zonrox bleach add-on per load.","Add-on","addon",25,0,null,["Zonrox"],0,0),G(10,"Additional Fabcon","Extra Fabcon fabric conditioner add-on per load.","Add-on","addon",25,0,null,["Fabcon"],0,0)],z=[{id:1,name:"Regular Clothes",maxKg:8,additionalFee:0,isActive:1},{id:2,name:"Comforter",maxKg:4,additionalFee:0,isActive:1},{id:3,name:"Thin Blankets",maxKg:6,additionalFee:0,isActive:1},{id:4,name:"Bedsheets",maxKg:6,additionalFee:0,isActive:1},{id:5,name:"Bath Towels",maxKg:6,additionalFee:0,isActive:1},{id:6,name:"Curtains",maxKg:6,additionalFee:0,isActive:1}];function Ge(e,t){const a=N(e,[]),r=new Map(a.map(s=>[s.id,s])),n=t.map(s=>{const i=r.get(s.id);return i?{...s,...i,isActive:i.isActive??s.isActive}:s});(a.length!==n.length||n.some((s,i)=>s.id!==a[i]?.id||JSON.stringify(s)!==JSON.stringify(a[i])))&&w(e,n)}async function Kt(){Ge("services",V),Ge("item_categories",z)}async function Te(e){for(const t of V)((await e.query("SELECT id FROM laundry_services WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive,t.id]):await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive]);for(const t of z)((await e.query("SELECT id FROM item_categories WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.maxKg,t.additionalFee,t.isActive,t.id]):await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[t.id,t.name,t.maxKg,t.additionalFee,t.isActive])}const Z=[],se=[],te=[],ie=[],oe=[],Y=[...[1,2,3,4].map(e=>({id:e,machineName:`Washer ${e}`,machineType:"washer",status:"available",branch:"Main Store"})),...[1,2,3,4].map(e=>({id:e+4,machineName:`Dryer ${e}`,machineType:"dryer",status:"available",branch:"Main Store"}))],ce=[{key:"branch",value:"Main Store"},{key:"fold_rate",value:"5"},{key:"report_email",value:"admin@laba101.test"}];function G(e,t,a,r,n,s,i,o,m,l,d){return{id:e,name:t,description:a,category:r,serviceType:n,price:s,maxKg:i,dryingMinutes:o,includes:m,additionalCharge:l,turnaroundHours:d,isActive:1}}function B(e){return`laba101-mobile-${e}`}function N(e,t){const a=localStorage.getItem(B(e));if(!a)return structuredClone(t);try{return JSON.parse(a)}catch{return structuredClone(t)}}function w(e,t){localStorage.setItem(B(e),JSON.stringify(t))}function H(e){return e.reduce((t,a)=>Math.max(t,a.id),0)+1}function ee(){return new Date().toISOString()}function Re(e=new Date){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${r}`}function Gt(){return Re().slice(2).replaceAll("-","")}function Q(e,t){if(!e)return t;try{return JSON.parse(e)}catch{return t}}async function L(){return fe||(fe=await Xt.createConnection(Wt,!1,"no-encryption",1,!1),await fe.open()),fe}async function I(e,t,a,r){((await e.query(`PRAGMA table_info(${t})`)).values??[]).some(i=>i.name===a)||await e.execute(`ALTER TABLE ${t} ADD COLUMN ${a} ${r}`)}function Vt(){const e=N("staff",X),t=new Map(e.map(r=>[r.id,r]));let a=!1;for(const r of X){const n=t.get(r.id);if(!n){t.set(r.id,{...r,isActive:1}),a=!0;continue}const s={...n,name:r.name,email:r.email,password:r.password,role:r.role,branch:r.branch,isActive:1};JSON.stringify(s)!==JSON.stringify(n)&&(t.set(r.id,s),a=!0)}a&&w("staff",Array.from(t.values()).sort((r,n)=>r.id-n.id))}async function Yt(){localStorage.getItem(B(Ee))||(w("staff",X),w("customers",[]),w("orders",[]),w("payments",[]),w("fold_logs",[]),w("expenses",[]),w("sales",[]),localStorage.getItem(B("services"))||w("services",V),localStorage.getItem(B("item_categories"))||w("item_categories",z),localStorage.getItem(B("machines"))||w("machines",Y),localStorage.getItem(B("subcleanings"))||w("subcleanings",[]),localStorage.getItem(B("settings"))||w("settings",ce),localStorage.removeItem("laba101-mobile-session"),w(Ee,!0))}async function st(e){for(const t of X){if(((await e.query("SELECT id FROM staff WHERE id = ?",[t.id])).values??[]).length>0){await e.run("UPDATE staff SET name = ?, email = ?, password = ?, role = ?, branch = ?, isActive = 1 WHERE id = ?",[t.name,t.email,t.password,t.role,t.branch,t.id]);continue}await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.email,t.password,t.role,t.branch,1])}}async function Qt(e){if(!(((await e.query("SELECT COUNT(*) as count FROM machines")).values?.[0]?.count??0)>0))for(const a of Y)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[a.id,a.machineName,a.machineType,a.status,a.branch])}async function Jt(e){for(const t of ce)await e.run("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)",[t.key,t.value])}async function it(e){for(const t of V)((await e.query("SELECT id FROM laundry_services WHERE id = ?",[t.id])).values??[]).length>0||await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive]);for(const t of z)((await e.query("SELECT id FROM item_categories WHERE id = ?",[t.id])).values??[]).length>0||await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[t.id,t.name,t.maxKg,t.additionalFee,t.isActive])}async function zt(e){((await e.query("SELECT value FROM settings WHERE key = ?",[Ee])).values??[]).length>0||(await e.execute(`
    DELETE FROM payments;
    DELETE FROM orders;
    DELETE FROM customers;
    DELETE FROM fold_logs;
    DELETE FROM disbursement_expenses;
    DELETE FROM daily_sales;
    DELETE FROM revolving_history;
    DELETE FROM staff WHERE id NOT IN (1, 2);
  `),await st(e),await it(e),await Qt(e),await Jt(e),await e.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",[Ee,ee()]),localStorage.removeItem("laba101-mobile-session"))}async function Zt(){if(!A.isNativePlatform()){await Yt(),!localStorage.getItem(B("seeded_v4"))&&!localStorage.getItem(B("services"))&&!localStorage.getItem(B("staff"))&&(w("staff",X),w("customers",Se),w("services",V),w("item_categories",z),w("orders",Z),w("payments",se),w("fold_logs",[]),w("expenses",te),w("sales",ie),w("revolving_history",oe),w("machines",Y),w("subcleanings",[]),w("settings",ce),w("seeded_v4",!0)),await Kt(),Vt(),localStorage.getItem(B("seeded_v4"))||w("seeded_v4",!0);return}const e=await L();await e.execute(`
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
  `),await I(e,"staff","email","TEXT"),await I(e,"staff","password","TEXT"),await I(e,"staff","role","TEXT"),await I(e,"staff","isActive","INTEGER NOT NULL DEFAULT 1"),await e.run('UPDATE staff SET password = ? WHERE password IS NULL OR password = ""',["password"]),await e.run('UPDATE staff SET role = ? WHERE role IS NULL OR role = ""',["staff"]),await I(e,"orders","customerId","INTEGER NOT NULL DEFAULT 0"),await I(e,"orders","phone","TEXT"),await I(e,"orders","serviceId","INTEGER NOT NULL DEFAULT 0"),await I(e,"orders","serviceLines","TEXT"),await I(e,"orders","itemCategoryId","INTEGER NOT NULL DEFAULT 0"),await I(e,"orders","itemCategory",'TEXT NOT NULL DEFAULT "Regular Clothes"'),await I(e,"orders","workflowCompleted","TEXT"),await I(e,"orders","weightKg","REAL NOT NULL DEFAULT 0"),await I(e,"orders","price","REAL NOT NULL DEFAULT 0"),await I(e,"orders","additionalCharge","REAL NOT NULL DEFAULT 0"),await I(e,"orders","extraServiceAmount","REAL NOT NULL DEFAULT 0"),await I(e,"orders","totalAmount","REAL NOT NULL DEFAULT 0"),await I(e,"orders","paidAmount","REAL NOT NULL DEFAULT 0"),await I(e,"orders","extras","TEXT"),await I(e,"orders","notes","TEXT"),await I(e,"orders","dueAt","TEXT"),await I(e,"orders","createdAt",'TEXT NOT NULL DEFAULT ""'),await I(e,"daily_sales","saleNumber","TEXT"),await I(e,"daily_sales","status","TEXT"),await I(e,"daily_sales","endorsedTo","TEXT"),await I(e,"daily_sales","statusUpdatedAt","TEXT");const a=((await e.query("SELECT COUNT(*) as count FROM staff")).values?.[0]?.count??0)===0;if(a){for(const r of X)await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[r.id,r.name,r.email,r.password,r.role,r.branch,1]);for(const r of Se)await e.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[r.id,r.name,r.phone,r.address]);for(const r of V)await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[r.id,r.name,r.description,r.category,r.serviceType,r.price,r.maxKg,r.dryingMinutes,JSON.stringify(r.includes),r.additionalCharge,r.turnaroundHours,r.isActive]);for(const r of z)await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[r.id,r.name,r.maxKg,r.additionalFee,r.isActive]);for(const r of Z)await ot(e,r);for(const r of se)await e.run("INSERT INTO payments (id, orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?, ?)",[r.id,r.orderId,r.amount,r.method,r.reference,r.receivedAt,r.branch]);for(const r of te)await e.run("INSERT INTO disbursement_expenses (id, expenseDate, number, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?, ?)",[r.id,r.expenseDate,r.number,r.name,r.category,r.description,r.amount]);for(const r of ie)await e.run("INSERT INTO daily_sales (id, saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?, ?)",[r.id,r.saleDate,r.saleNumber,r.cashAmount,r.gcashAmount,r.totalAmount,r.notes]);for(const r of oe)await e.run("INSERT INTO revolving_history (id, revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[r.id,r.revolvingNumber,r.name,r.amount,r.category,r.description,r.type,r.createdAt]);for(const r of Y)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[r.id,r.machineName,r.machineType,r.status,r.branch]);for(const r of ce)await e.run("INSERT INTO settings (key, value) VALUES (?, ?)",[r.key,r.value]);await e.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",["fresh_install_defaults",ee()])}await Te(e),await st(e),a||await it(e),await zt(e)}async function ot(e,t){await e.run("INSERT INTO orders (id, ticket, customerId, customer, phone, serviceId, service, serviceLines, itemCategoryId, itemCategory, branch, status, workflowCompleted, weightKg, price, additionalCharge, extraServiceAmount, totalAmount, paidAmount, extras, notes, foldedBy, dueAt, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.ticket,t.customerId,t.customer,t.phone,t.serviceId,t.service,JSON.stringify(t.serviceLines??[]),t.itemCategoryId,t.itemCategory,t.branch,t.status,JSON.stringify(t.workflowCompleted),t.weightKg,t.price,t.additionalCharge,t.extraServiceAmount,t.totalAmount,t.paidAmount,JSON.stringify(t.extras),t.notes,t.foldedBy,t.dueAt,t.createdAt])}function ea(e){const t=Number(e.paidAmount??0),a=Number(e.totalAmount??0),r=Number(e.foldedBy),n=Q(e.serviceLines,[]),s=Number(e.serviceId),i=String(e.service),o=Number(e.price);return{id:Number(e.id),ticket:String(e.ticket),customerId:Number(e.customerId),customer:String(e.customer),phone:e.phone?String(e.phone):null,serviceId:s,service:i,serviceLines:n.length?n:[{id:s,name:i,price:o,quantity:1,total:o}],itemCategoryId:Number(e.itemCategoryId),itemCategory:String(e.itemCategory),branch:String(e.branch),status:String(e.status),workflowCompleted:Q(e.workflowCompleted,[]),weightKg:Number(e.weightKg),price:o,additionalCharge:Number(e.additionalCharge),extraServiceAmount:Number(e.extraServiceAmount),totalAmount:a,paidAmount:t,balance:Number((a-t).toFixed(2)),extras:Q(e.extras,[]),notes:e.notes?String(e.notes):null,foldedBy:Number.isFinite(r)&&r>0?r:null,foldedByName:e.foldedByName?String(e.foldedByName):null,dueAt:String(e.dueAt),createdAt:String(e.createdAt)}}async function ta(){await Zt()}async function de(){return(await xe()).find(t=>t.key==="branch")?.value??"Main Store"}async function aa(){const e=await xe();return Number(e.find(t=>t.key==="fold_rate")?.value??"5")}async function ct(e){return(await xe()).find(a=>a.key===e)?.value}async function xe(){return A.isNativePlatform()?(await(await L()).query("SELECT key, value FROM settings ORDER BY key")).values??[]:N("settings",ce)}async function ge(e,t){if(!A.isNativePlatform()){const r=N("settings",ce).filter(n=>n.key!==e);r.push({key:e,value:t}),w("settings",r);return}await(await L()).run("REPLACE INTO settings (key, value) VALUES (?, ?)",[e,t])}async function ra(e){return A.isNativePlatform()?(await(await L()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff WHERE branch = ? ORDER BY name ASC',[e])).values??[]:N("staff",X).filter(r=>r.branch===e)}async function lt(){return A.isNativePlatform()?(await(await L()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff ORDER BY name ASC')).values??[]:N("staff",X)}async function dt(e,t){const a=e.trim().toLowerCase();return(await lt()).find(n=>n.email.toLowerCase()===a&&n.password===t&&n.isActive!==0)??null}async function na(e){if(!A.isNativePlatform()){const a=N("staff",X);a.unshift({id:H(a),...e,isActive:1}),w("staff",a);return}await(await L()).run("INSERT INTO staff (name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?)",[e.name,e.email,e.password,e.role,e.branch,1])}async function Ve(e,t){if(!A.isNativePlatform()){const s=N("staff",X),i=s.find(o=>o.id===e);i&&(Object.assign(i,t),w("staff",s));return}const a=await L(),r=[],n=[];for(const[s,i]of Object.entries(t))s!=="id"&&(r.push(`${s} = ?`),n.push(i));r.length&&(n.push(e),await a.run(`UPDATE staff SET ${r.join(", ")} WHERE id = ?`,n))}async function sa(){return A.isNativePlatform()?(await(await L()).query("SELECT id, name, phone, address FROM customers ORDER BY name ASC")).values??[]:N("customers",Se).sort((a,r)=>a.name.localeCompare(r.name))}async function ia(e){if(!A.isNativePlatform()){const n=N("customers",Se),s=e.id?n.find(o=>o.id===e.id):n.find(o=>o.name.toLowerCase()===e.name.toLowerCase()&&(e.phone?o.phone===e.phone:!0));if(s)return s.name=e.name,s.phone=e.phone??s.phone,s.address=e.address??s.address,w("customers",n),s;const i={id:H(n),name:e.name,phone:e.phone??null,address:e.address??null};return n.push(i),w("customers",n),i}const t=await L();if(e.id)return await t.run("UPDATE customers SET name = ?, phone = ?, address = ? WHERE id = ?",[e.name,e.phone??null,e.address??null,e.id]),{id:e.id,name:e.name,phone:e.phone??null,address:e.address??null};const a=await t.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM customers"),r=Number((a.values?.[0]).id);return await t.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[r,e.name,e.phone??null,e.address??null]),{id:r,name:e.name,phone:e.phone??null,address:e.address??null}}async function Ie(e){if(!A.isNativePlatform())return N("services",V).filter(r=>!0);const t=await L(),a=await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[]);return(a.values??[]).length===0?(await Te(t),((await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[])).values??[]).map(n=>({...n,includes:Q(n.includes,[])}))):(a.values??[]).map(r=>({...r,includes:Q(r.includes,[])}))}async function oa(){if(!A.isNativePlatform())return N("services",V);const e=await L(),t=await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC");return(t.values??[]).length===0?(await Te(e),((await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC")).values??[]).map(r=>({...r,includes:Q(r.includes,[])}))):(t.values??[]).map(a=>({...a,includes:Q(a.includes,[])}))}async function Ye(e){if(!A.isNativePlatform()){const a=N("services",V),r=e.id?a.find(n=>n.id===e.id):null;r?Object.assign(r,e):a.unshift({...e,id:H(a)}),w("services",a);return}const t=await L();e.id?await t.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = ? WHERE id = ?",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive,e.id]):await t.run("INSERT INTO laundry_services (name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive])}async function ut(){if(!A.isNativePlatform())return N("item_categories",z).filter(a=>a.isActive);const e=await L(),t=await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC");return(t.values??[]).length===0?(await Te(e),(await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC")).values??[]):t.values??[]}async function ca(e){if(!A.isNativePlatform()){const a=N("item_categories",z),r=e.id?a.find(n=>n.id===e.id):null;r?Object.assign(r,e):a.unshift({...e,id:H(a)}),w("item_categories",a);return}const t=await L();e.id?await t.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = ? WHERE id = ?",[e.name,e.maxKg,e.additionalFee,e.isActive,e.id]):await t.run("INSERT INTO item_categories (name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?)",[e.name,e.maxKg,e.additionalFee,e.isActive])}function Oe(e,t,a,r){const n=(Array.isArray(e)?e:[e]).map(y=>{const f=Math.max(0,Number(y.quantity??1)),b=Number(y.price);return{id:y.id,name:y.name,price:b,quantity:f,total:Number((b*f).toFixed(2))}}).filter(y=>y.quantity>0),s=Number(t.maxKg),i=0,o=0,m=r.map(y=>{const f=Math.max(0,Number(y.quantity??1)),b=Number(y.price);return{id:y.id,name:Ht(y.name),price:b,quantity:f,total:Number((b*f).toFixed(2))}}).filter(y=>y.quantity>0),l=n.reduce((y,f)=>y+f.total,0),d=m.reduce((y,f)=>y+f.total,0),u=Number((l+o+d).toFixed(2));return{price:Number(l.toFixed(2)),additionalCharge:Number(o.toFixed(2)),extraServiceAmount:Number(d.toFixed(2)),totalAmount:u,allowedKg:s,extraKg:Number(i.toFixed(2)),warning:null,serviceLines:n,extras:m}}function mt(e,t){const a=e.serviceLines?.length?e.serviceLines.map(i=>i.id):[e.serviceId],r=t.filter(i=>a.includes(i.id)),n=Array.from(new Set(r.flatMap(i=>i.includes??[]))),s=[{key:"received",label:"Received"}];return n.includes("Wash")&&s.push({key:"wash",label:"Wash"}),e.extras.length&&s.push({key:"extras",label:"Extra services"}),(n.includes("Dry")||r.some(i=>(i.dryingMinutes??0)>0))&&s.push({key:"dry",label:"Dry"}),n.includes("Fold")&&s.push({key:"fold",label:"Fold"}),s.push({key:"ready",label:"Ready"},{key:"claimed",label:"Claimed"}),s}function la(e){return e.includes("claimed")?"claimed":e.includes("ready")?"ready":e.includes("dry")?"drying":e.includes("extras")||e.includes("wash")?"washing":"received"}async function ue(e){return A.isNativePlatform()?((await(await L()).query("SELECT o.*, s.name as foldedByName FROM orders o LEFT JOIN staff s ON s.id = o.foldedBy WHERE o.branch = ? ORDER BY o.id DESC",[e])).values??[]).map(r=>ea(r)):N("orders",Z).filter(r=>r.branch===e).map(r=>({...r,serviceLines:r.serviceLines??[{id:r.serviceId,name:r.service,price:Number(r.price),quantity:1,total:Number(r.price)}],balance:Number((r.totalAmount-r.paidAmount).toFixed(2))}))}async function da(e){const[t,a]=await Promise.all([Ie(),ut()]),r=e.serviceQuantities??(e.serviceId?{[e.serviceId]:1}:{}),n=t.filter(h=>h.serviceType==="order"&&Number(r[h.id]??0)>0).map(h=>({...h,quantity:Number(r[h.id]??0)})),s=n[0],i=a.find(h=>h.id===e.itemCategoryId)??a.find(h=>h.name.toLowerCase()===(s?.category??"").toLowerCase())??a.find(h=>h.name==="Regular Clothes")??a[0];if(!n.length||!s||!i)throw new Error("Please select at least one service.");const o=e.addonQuantities??Object.fromEntries((e.addonIds??[]).map(h=>[h,1])),m=t.filter(h=>h.serviceType==="addon"&&Number(o[h.id]??0)>0).map(h=>({...h,quantity:Number(o[h.id]??0)})),l=e.weightKg??Math.max(1,Number(i.maxKg||s.maxKg||1)),d=Oe(n,i,l,m),u=await ia({id:e.customerId||void 0,name:e.customerName,phone:e.customerPhone??null}),y=Math.max(0,e.paidAmount),f=Math.min(d.totalAmount,y),b={ticket:await ua(),customerId:u.id,customer:u.name,phone:u.phone,serviceId:s.id,service:d.serviceLines.map(h=>`${h.name} x${h.quantity}`).join(", "),serviceLines:d.serviceLines,itemCategoryId:i.id,itemCategory:i.name,branch:e.branch,status:"received",workflowCompleted:["received"],weightKg:l,price:d.price,additionalCharge:d.additionalCharge,extraServiceAmount:d.extraServiceAmount,totalAmount:d.totalAmount,paidAmount:f,balance:Number((d.totalAmount-f).toFixed(2)),extras:d.extras,notes:e.notes||null,foldedBy:null,foldedByName:null,dueAt:new Date(Date.now()+Math.max(...n.map(h=>h.turnaroundHours))*60*60*1e3).toISOString(),createdAt:ee()};if(!A.isNativePlatform()){const h=N("orders",Z),C={...b,id:H(h)};return h.unshift(C),w("orders",h),y>0&&await vt(C.id,{amount:y,method:e.paymentMethod,reference:e.paymentReference??null}),C}const E=await L(),p=await E.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM orders"),T={...b,id:Number((p.values?.[0]).id)};return await ot(E,T),y>0&&await E.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[T.id,y,e.paymentMethod,e.paymentReference??null,ee(),e.branch]),T}async function ua(){const e=`LB${Gt()}`,t=await de(),r=(await ue(t)).filter(s=>s.ticket.startsWith(e)).sort((s,i)=>i.ticket.localeCompare(s.ticket))[0],n=r?Number(r.ticket.slice(-3))+1:1;return`${e}-${String(n).padStart(3,"0")}`}async function ma(e,t){const a=await de(),[r,n]=await Promise.all([ue(a),Ie()]),s=r.find(l=>l.id===e);if(!s)return;const o=mt(s,n).map(l=>l.key).find(l=>!s.workflowCompleted.includes(l));if(!o)return;if(s.workflowCompleted=[...s.workflowCompleted,o],s.status=la(s.workflowCompleted),o==="fold"&&t&&(s.foldedBy=t),!A.isNativePlatform()){const l=N("orders",Z),d=l.find(u=>u.id===s.id);d&&Object.assign(d,s),w("orders",l);return}await(await L()).run("UPDATE orders SET workflowCompleted = ?, status = ?, foldedBy = ? WHERE id = ?",[JSON.stringify(s.workflowCompleted),s.status,s.foldedBy,s.id])}async function vt(e,t){const a=await de();if(!(await ue(a)).find(o=>o.id===e))return;const s=Math.max(0,t.amount);if(s<=0)return;if(!A.isNativePlatform()){const o=N("payments",se);o.unshift({id:H(o),orderId:e,amount:s,method:t.method,reference:t.reference??null,receivedAt:ee(),branch:a}),w("payments",o);const m=N("orders",Z),l=m.find(d=>d.id===e);l&&(l.paidAmount=Math.min(l.totalAmount,Number((l.paidAmount+s).toFixed(2)))),w("orders",m);return}const i=await L();await i.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[e,s,t.method,t.reference??null,ee(),a]),await i.run("UPDATE orders SET paidAmount = MIN(totalAmount, paidAmount + ?) WHERE id = ?",[s,e])}async function va(e){return A.isNativePlatform()?(await(await L()).query("SELECT id, orderId, amount, method, reference, receivedAt, branch FROM payments  ORDER BY receivedAt DESC",[])).values??[]:N("payments",se).filter(r=>!0)}async function pa(e){const t=await de(),r=(await ue(t)).find(s=>s.id===e);if(!r)return;if(r.paidAmount>0)throw new Error("Cancel is only allowed for unpaid orders. Use Delete (admin) to refund paid orders.");if(!A.isNativePlatform()){const s=N("orders",Z),i=N("payments",se),o=N("fold_logs",[]),m=s.filter(u=>u.id!==e),l=i.filter(u=>u.orderId!==e),d=o.filter(u=>u.orderTicket!==r.ticket);w("orders",m),w("payments",l),w("fold_logs",d);return}const n=await L();await n.run("DELETE FROM payments WHERE orderId = ?",[e]),await n.run("DELETE FROM fold_logs WHERE orderTicket = ?",[r.ticket]),await n.run("DELETE FROM orders WHERE id = ?",[e])}async function fa(e){const t=await de(),r=(await ue(t)).find(s=>s.id===e);if(!r)return;if(r.paidAmount<=0)throw new Error("Delete (refund) is only allowed for paid orders.");if(!A.isNativePlatform()){const s=N("orders",Z),i=N("payments",se),o=N("fold_logs",[]),m=s.filter(u=>u.id!==e),l=i.filter(u=>u.orderId!==e),d=o.filter(u=>u.orderTicket!==r.ticket);w("orders",m),w("payments",l),w("fold_logs",d);return}const n=await L();await n.run("DELETE FROM payments WHERE orderId = ?",[e]),await n.run("DELETE FROM fold_logs WHERE orderTicket = ?",[r.ticket]),await n.run("DELETE FROM orders WHERE id = ?",[e])}async function ya(){return A.isNativePlatform()?(await(await L()).query("SELECT id, orderTicket, staffName, foldCount, rate, total, createdAt FROM fold_logs ORDER BY id DESC")).values??[]:N("fold_logs",[])}async function ha(e){const t=Number((e.foldCount*e.rate).toFixed(2));if(!A.isNativePlatform()){const r=N("fold_logs",[]);r.unshift({id:Date.now(),...e,total:t,createdAt:ee()}),w("fold_logs",r);return}await(await L()).run("INSERT INTO fold_logs (orderTicket, staffName, foldCount, rate, total, createdAt) VALUES (?, ?, ?, ?, ?, ?)",[e.orderTicket,e.staffName,e.foldCount,e.rate,t,ee()])}async function ga(){return A.isNativePlatform()?(await(await L()).query("SELECT id, expenseDate, number, name, category, description, amount FROM disbursement_expenses ORDER BY expenseDate DESC, id DESC")).values??[]:N("expenses",te)}function Ae(e){const t=/^DISB-(\d+)$/i.exec(String(e??"").trim());return t?Number(t[1]):0}function Qe(e){const t=/^REV-(\d+)$/i.exec(String(e??"").trim());return t?Number(t[1]):0}async function ba(){let e=0;if(!A.isNativePlatform()){const n=N("expenses",te),s=N("revolving_history",oe);for(const i of n)e=Math.max(e,Ae(i.number));for(const i of s)i.type==="disbursement"&&(e=Math.max(e,Ae(i.revolvingNumber)));return e}const t=await L(),a=await t.query("SELECT number FROM disbursement_expenses"),r=await t.query("SELECT revolvingNumber as number FROM revolving_history WHERE type = 'disbursement'");for(const n of[...a.values??[],...r.values??[]])e=Math.max(e,Ae(String(n.number)));return e}async function pt(){const e=await ba()+1;return`DISB-${String(e).padStart(2,"0")}`}async function Ea(){let e=0;if(!A.isNativePlatform()){const r=N("revolving_history",oe);for(const n of r)n.type==="add"&&(e=Math.max(e,Qe(n.revolvingNumber)));return`REV-${String(e+1).padStart(2,"0")}`}const a=await(await L()).query("SELECT revolvingNumber FROM revolving_history WHERE type = 'add'");for(const r of a.values??[])e=Math.max(e,Qe(String(r.revolvingNumber)));return`REV-${String(e+1).padStart(2,"0")}`}async function ft(e){if(!A.isNativePlatform()){const a=N("expenses",te),r=H(a);a.unshift({id:r,expenseDate:e.expenseDate,number:e.number,name:e.name,category:e.category,description:e.description||null,amount:e.amount}),w("expenses",a);return}await(await L()).run("INSERT INTO disbursement_expenses (expenseDate, number, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?)",[e.expenseDate,e.number,e.name,e.category,e.description||null,e.amount])}async function Sa(e){const t=await pt();await ft({expenseDate:e.expenseDate,number:t,name:e.name,category:e.category,description:e.description,amount:e.amount})}async function wa(e,t){if(!A.isNativePlatform()){const r=N("expenses",te),n=r.find(s=>s.id===e);n&&(Object.assign(n,{expenseDate:t.expenseDate,name:t.name,category:t.category,description:t.description||null,amount:t.amount}),w("expenses",r));return}await(await L()).run("UPDATE disbursement_expenses SET expenseDate = ?, name = ?, category = ?, description = ?, amount = ? WHERE id = ?",[t.expenseDate,t.name,t.category,t.description||null,t.amount,e])}async function Ta(e){if(!A.isNativePlatform()){const a=N("expenses",te);w("expenses",a.filter(r=>r.id!==e));return}await(await L()).run("DELETE FROM disbursement_expenses WHERE id = ?",[e])}async function Na(){return A.isNativePlatform()?(await(await L()).query('SELECT id, saleDate, COALESCE(saleNumber, "") as saleNumber, cashAmount, gcashAmount, totalAmount, notes, status, endorsedTo, statusUpdatedAt FROM daily_sales ORDER BY saleDate DESC, id DESC')).values??[]:N("sales",ie)}async function Aa(e){const t=Number((e.cashAmount+e.gcashAmount).toFixed(2));if(!A.isNativePlatform()){const s=N("sales",ie),i=e.id?s.find(o=>o.id===e.id):s.find(o=>o.saleDate===e.saleDate);if(i)Object.assign(i,{saleDate:e.saleDate,cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null});else{const o=H(s);s.unshift({id:o,saleDate:e.saleDate,saleNumber:`SALE-${String(o).padStart(2,"0")}`,cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null})}w("sales",s);return}const a=await L(),n=(e.id?await a.query("SELECT id, saleNumber FROM daily_sales WHERE id = ?",[e.id]):await a.query("SELECT id, saleNumber FROM daily_sales WHERE saleDate = ?",[e.saleDate])).values?.[0];if(n)await a.run("UPDATE daily_sales SET saleDate = ?, cashAmount = ?, gcashAmount = ?, totalAmount = ?, notes = ? WHERE id = ?",[e.saleDate,e.cashAmount,e.gcashAmount,t,e.notes||null,n.id]);else{const s=await a.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM daily_sales"),i=Number((s.values?.[0]).id);await a.run("INSERT INTO daily_sales (saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?)",[e.saleDate,`SALE-${String(i).padStart(2,"0")}`,e.cashAmount,e.gcashAmount,t,e.notes||null])}}async function La(e){if(!A.isNativePlatform()){const a=N("sales",ie);w("sales",a.filter(r=>r.id!==e));return}await(await L()).run("DELETE FROM daily_sales WHERE id = ?",[e])}async function Je(e,t,a=null,r){if(!A.isNativePlatform()){const s=N("sales",ie),i=s.find(o=>o.id===e);i&&(i.status=t,i.endorsedTo=a,i.statusUpdatedAt=r,w("sales",s));return}await(await L()).run("UPDATE daily_sales SET status = ?, endorsedTo = ?, statusUpdatedAt = ? WHERE id = ?",[t,a,r,e])}async function Ca(){return A.isNativePlatform()?(await(await L()).query("SELECT id, revolvingNumber, name, amount, category, description, type, createdAt FROM revolving_history ORDER BY createdAt DESC, id DESC")).values??[]:N("revolving_history",oe).sort((a,r)=>r.createdAt.localeCompare(a.createdAt))}async function ze(e){const t=e.type==="disbursement"?await pt():await Ea();if(e.type==="disbursement"){const r=e.expenseDate??e.createdAt.slice(0,10);await ft({expenseDate:r,number:t,name:e.name,category:e.category,description:e.description??"",amount:e.amount})}if(!A.isNativePlatform()){const r=N("revolving_history",oe),n=H(r);r.unshift({id:n,revolvingNumber:t,...e}),w("revolving_history",r);return}await(await L()).run("INSERT INTO revolving_history (revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)",[t,e.name,e.amount,e.category,e.description||null,e.type,e.createdAt])}async function yt(e){return A.isNativePlatform()?(await(await L()).query("SELECT id, machineName, machineType, status, branch FROM machines WHERE branch = ? ORDER BY machineType, machineName",[e])).values??[]:N("machines",Y).filter(r=>r.branch===e)}async function $a(e){if(!A.isNativePlatform()){const a=N("machines",Y);a.unshift({id:H(a),...e}),w("machines",a);return}await(await L()).run("INSERT INTO machines (machineName, machineType, status, branch) VALUES (?, ?, ?, ?)",[e.machineName,e.machineType,e.status,e.branch])}async function Ra(e,t){if(!A.isNativePlatform()){const r=N("machines",Y),n=r.find(s=>s.id===e);n&&(n.status=t,w("machines",r));return}await(await L()).run("UPDATE machines SET status = ? WHERE id = ?",[t,e])}async function Oa(e){return A.isNativePlatform()?((await(await L()).query("SELECT id, date, machineIds, machineNames, cleaningStatus, notes, branch FROM subcleanings WHERE branch = ? ORDER BY date DESC, id DESC",[e])).values??[]).map(r=>({...r,machineIds:Q(r.machineIds,[])})):N("subcleanings",[]).filter(r=>r.branch===e)}async function Da(e){const a=(await yt(e.branch)).filter(s=>e.machineIds.includes(s.id)).map(s=>s.machineName).join(", ");if(!A.isNativePlatform()){const s=N("subcleanings",[]);s.unshift({id:H(s),date:e.date,machineIds:e.machineIds,machineNames:a,cleaningStatus:e.cleaningStatus,notes:e.notes||null,branch:e.branch}),w("subcleanings",s);const i=N("machines",Y);i.forEach(o=>{e.machineIds.includes(o.id)&&(o.status=e.cleaningStatus==="completed"?"available":"under_cleaning")}),w("machines",i);return}const r=await L();await r.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, notes, branch) VALUES (?, ?, ?, ?, ?, ?)",[e.date,JSON.stringify(e.machineIds),a,e.cleaningStatus,e.notes||null,e.branch]);const n=e.cleaningStatus==="completed"?"available":"under_cleaning";for(const s of e.machineIds)await r.run("UPDATE machines SET status = ? WHERE id = ?",[n,s])}async function Pa(e,t){if(!A.isNativePlatform()){const i=N("machines",Y),o=i.find(d=>d.id===e);o&&(o.status="available"),w("machines",i);const m=N("subcleanings",[]),l=Re();m.unshift({id:H(m),date:l,machineIds:[e],machineNames:o?.machineName??"",cleaningStatus:"completed",notes:null,branch:t}),w("subcleanings",m);return}const a=await L(),n=(await a.query("SELECT machineName FROM machines WHERE id = ?",[e])).values?.[0]?.machineName??"";await a.run("UPDATE machines SET status = ? WHERE id = ?",["available",e]);const s=Re();await a.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, notes, branch) VALUES (?, ?, ?, ?, ?, ?)",[s,JSON.stringify([e]),n,"completed",null,t])}const qe=document.querySelector("#app");if(!qe)throw new Error("App root not found");let ye;const le=ae("BluetoothThermalPrinter"),Fe={dashboard:"Dashboard",pos:"POS",orders:"Orders",archived:"Archived Order",customers:"Customers",pricing:"Pricing Services",disbursements:"Daily Report",reports:"Reports",inventory:"Inventory",maintenance:"Maintenance",staff:"Staff",revolving:"Revolving Fund",settings:"Settings"},c={tab:"dashboard",receiptOrderId:0,currentUser:null,loginError:"",sidebarOpen:!1,dailyReportTab:"expenses",maintenanceTab:"cleaning",customerSearch:"",orderSearch:"",orderDateFilter:"",orderPaymentFilter:"",printerPanelOpen:!1,printerLoading:!1,printerError:"",printerStatus:"",printerPaperWidth:58,pairedPrinters:[],selectedPrinterAddress:"",archivedOrderSearch:"",reportPreview:null,endorseModalOpen:!1,endorseSaleId:0,endorseSaleDate:"",revolvingModalOpen:!1,revolvingSaleId:0,addFundModalOpen:!1,disbursementModalOpen:!1,revolvingHistoryFrom:"",revolvingHistoryTo:""},xa=["Wash","Dry","Fold","Detergent","Fabcon","Zonrox"],ve="laba101-mobile-session";function $(e){return new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(e||0)}function v(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function J(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}function ke(e,t){return Number((e-t).toFixed(2))}function ht(e,t,a,r=0){const n=t.filter(i=>j(i.createdAt)===e).reduce((i,o)=>i+o.paidAmount,0),s=a.filter(i=>i.expenseDate===e).reduce((i,o)=>i+o.amount,0);return ke(n+r,s)}function Ia(e){const t=new Map;return e.filter(a=>a.workflowCompleted.includes("fold")&&a.foldedByName).forEach(a=>{const r=a.foldedByName,n=t.get(r)??{staffName:r,folds:0};n.folds+=1,t.set(r,n)}),Array.from(t.values())}function pe(e=new Date){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${r}`}function W(){return pe()}function j(e){return pe(new Date(e))}function Ue(e){return e.paidAmount<=0?"unpaid":e.balance>0?"partial":"paid"}function re(e){return new Intl.DateTimeFormat("en-PH",{dateStyle:"medium",timeStyle:"short"}).format(new Date(e))}function qa(e){const t=new Date(e),a=new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric",year:"numeric"}).format(t),r=new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",hour12:!0}).format(t);return`<div class="datetime-stack"><strong>${v(a)}</strong><span class="meta">${v(r)}</span></div>`}function Fa(e){return e?.role==="staff"&&e.branch==="Gensan Branch"}function ka(e){return e?.role==="staff"&&e.branch.toLowerCase().includes("mintal")}function we(e,t,a="data-table"){return`
    <div class="table-scroll">
      <table class="${a}">
        <thead><tr>${e.map(r=>`<th>${v(r)}</th>`).join("")}</tr></thead>
        <tbody>${t.length?t.map(r=>`<tr>${r.map(n=>`<td>${n}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${e.length}" class="table-empty">No records found.</td></tr>`}</tbody>
      </table>
    </div>
  `}function Ua(e=new Date){return{date:new Intl.DateTimeFormat("en-PH",{weekday:"long",month:"long",day:"numeric",year:"numeric"}).format(e),time:new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",second:"2-digit",hour12:!0}).format(e)}}function he(){const e=document.querySelector("[data-date-from]"),t=document.querySelector("[data-date-to]"),a=Array.from(document.querySelectorAll('input[name="reportType"]:checked')).map(r=>r.value).filter(r=>r==="sales"||r==="disbursement"||r==="fold_count"||r==="revolving_fund"||r==="summary");return{from:e?.value||"0000-01-01",to:t?.value||"9999-12-31",types:a.length?a:["summary"]}}function me(e,t){return e>=t.from&&e<=t.to}function gt(e,t,a,r,n,s,i){const o=new Set(i.types),m=e.filter(g=>me(j(g.createdAt),i)),l=a.filter(g=>me(g.saleDate,i)),d=r.filter(g=>me(g.expenseDate,i)),u=Ia(m),y=new Map;t.filter(g=>me(j(g.receivedAt),i)).forEach(g=>{const D=y.get(g.orderId)??{cash:0,gcash:0};g.method==="gcash"?D.gcash+=g.amount:D.cash+=g.amount,y.set(g.orderId,D)});const f=m.reduce((g,D)=>g+(y.get(D.id)?.cash??D.paidAmount),0),b=l.reduce((g,D)=>g+D.cashAmount,0),E=l.reduce((g,D)=>g+D.gcashAmount,0),p=m.reduce((g,D)=>g+(y.get(D.id)?.gcash??0),0),T=f+b,h=p+E,C=T+h,R=d.reduce((g,D)=>g+D.amount,0),O=R,U=C-O,F=()=>({orderCashTotal:f,orderGcashTotal:p,manualCashTotal:b,manualGcashTotal:E,totalCash:T,totalGcash:h,totalSales:C,rows:[["Type","Date","Number","Name","Cash","GCash","Total","Balance"],...m.map(g=>{const D=y.get(g.id)??{cash:g.paidAmount,gcash:0};return["Order",j(g.createdAt),g.ticket,g.customer,D.cash,D.gcash,D.cash+D.gcash,g.balance]}),...l.map(g=>["Manual Sale",g.saleDate,g.saleNumber,g.notes??"",g.cashAmount,g.gcashAmount,g.totalAmount,""]),[],["Sales Summary",i.from,"to",i.to,"","","",""],["Order Cash","","","","","",f,""],["Order GCash","","","","","",p,""],["Manual Cash","","","","","",b,""],["Manual GCash","","","","","",E,""],["Total Cash","","","","","",T,""],["Total GCash","","","","","",h,""],["Total Sales","","","","","",C,""]]}),x=()=>({totalExpenses:R,totalDisbursement:O,rows:[["Type","Date","Number","Name","Amount"],...d.map(g=>["Expense",g.expenseDate,g.number,g.name,g.amount]),[],["Disbursement Summary",i.from,"to",i.to,""],["Expenses","","","",R],["Total Disbursement","","","",O]]}),q=()=>({rows:[["Staff","Fold Count"],...u.map(g=>[g.staffName,g.folds]),[],["Total Folds",u.reduce((g,D)=>g+D.folds,0)]]}),k=n.filter(g=>me(j(g.createdAt),i));return{selection:i,selectedTypes:o,salesRows:F,disbursementRows:x,foldCountRows:q,revolvingDailySummaryRows:()=>({rows:[["Date of Sales","Cash on Hand","Status","Date Update"],...l.map(g=>{const D=ht(g.saleDate,e,r,g.cashAmount),Nt=g.status==="revolving"?"Revolving":g.status==="endorsed"?`Endorsed to ${g.endorsedTo??""}`:"Pending";return[g.saleDate,D,Nt,g.statusUpdatedAt?j(g.statusUpdatedAt):""]})]}),revolvingHistoryRows:()=>({rows:[["Date","Number","Name","Amount","Category","Description","Type"],...k.map(g=>[j(g.createdAt),g.revolvingNumber,g.name,g.type==="disbursement"?-g.amount:g.amount,g.category,g.description??"",g.type==="add"?"Add Revolving Fund":"Disbursement"])]}),summaryRows:()=>{const g=F(),D=x();return[["Summary",i.from,"to",i.to,"","","",""],["Order Cash","","","","","",g.orderCashTotal,""],["Order GCash","","","","","",g.orderGcashTotal,""],["Manual Cash","","","","","",g.manualCashTotal,""],["Manual GCash","","","","","",g.manualGcashTotal,""],["Total Cash","","","","","",g.totalCash,""],["Total GCash","","","","","",g.totalGcash,""],["Total Sales","","","","","",g.totalSales,""],["Total Disbursement","","","","","",D.totalDisbursement,""],["Profit","","","","","",U,""],["Cash on Hand","","","","","",ke(g.totalCash,D.totalDisbursement),""]]},profit:U}}function Ma(e,t){return`<button class="nav-link ${t?"is-active":""}" data-tab="${e}" type="button">
    <span class="nav-icon">${_a(e)}</span>
    <span>${Fe[e]}</span>
  </button>`}function P(e,t){return`<div class="section-head"><div><h2>${v(e)}</h2><p class="meta">${v(t)}</p></div></div>`}function Ze(){return Fe[c.tab]??"Dashboard"}function Le(e){return(e?.name??"Laba101").trim().slice(0,1).toUpperCase()}function _a(e){return{dashboard:"DB",pos:"POS",orders:"PO",archived:"AR",customers:"CU",pricing:"PS",disbursements:"DR",reports:"RP",inventory:"IN",maintenance:"MT",staff:"ST",revolving:"RV",settings:"SE"}[e]}async function bt(){const e=await de(),t=await ra(e),a=await lt(),r=await sa(),n=await Ie(),s=await oa(),i=await ut(),o=await ue(e),m=await va(),l=await ya(),d=await ga(),u=await Na(),y=await yt(e),f=await Oa(e),b=await Ca(),E=await aa(),p=await ct("report_email");return{branch:e,staff:t,allStaff:a,customers:r,services:n,allServices:s,categories:i,orders:o,payments:m,foldLogs:l,expenses:d,sales:u,machines:y,subcleanings:f,revolvingHistory:b,foldRate:E,reportEmail:p??""}}async function S(){if(!c.currentUser){Ba(),or();return}const e=await bt();e.orders.filter(o=>o.status!=="claimed").length,e.orders.filter(o=>o.status==="ready").length,e.orders.reduce((o,m)=>o+m.paidAmount,0);const t=W(),a=e.payments.filter(o=>o.branch===e.branch&&o.method==="gcash"&&j(o.receivedAt)===t).reduce((o,m)=>o+m.amount,0)+e.sales.filter(o=>o.saleDate===t).reduce((o,m)=>o+m.gcashAmount,0),r=e.payments.filter(o=>o.branch===e.branch&&o.method==="cash"&&j(o.receivedAt)===t).reduce((o,m)=>o+m.amount,0)+e.sales.filter(o=>o.saleDate===t).reduce((o,m)=>o+m.cashAmount,0),n=r+a,s=e.expenses.filter(o=>o.expenseDate===t).reduce((o,m)=>o+m.amount,0),i=ke(r,s);e.sales.reduce((o,m)=>o+m.totalAmount,0),e.expenses.reduce((o,m)=>o+m.amount,0),qe.innerHTML=`
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
            <span>${Le(c.currentUser)}</span>
            <strong>${v(c.currentUser.name)}</strong>
          </button>
        </div>
      </header>

      <button class="sidebar-backdrop ${c.sidebarOpen?"is-open":""}" id="sidebar-backdrop" type="button" aria-label="Close navigation"></button>

      <aside class="sidebar ${c.sidebarOpen?"is-open":""}">
        <div class="sidebar-mobile-head">
          <img src="/laba101-logo.svg" alt="Laba101" />
          <button class="sidebar-close" id="sidebar-close-button" type="button" aria-label="Close navigation">X</button>
        </div>
        <nav>${Et().map(o=>Ma(o,c.tab===o)).join("")}</nav>
        <div class="sidebar-fill">
          <div class="sidebar-branch-badge">
            <span>Active Branch</span>
            <strong>${v(e.branch)}</strong>
          </div>
          <p class="sidebar-app-name">Laba101 POS</p>
        </div>
        <div class="sidebar-user">
          <span class="avatar">${Le(c.currentUser)}</span>
          <div>
            <strong>${v(c.currentUser.name)}</strong>
            <small>${v(c.currentUser.email)} / ${v(c.currentUser.role)}</small>
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
          <button class="mobile-avatar" type="button">${Le(c.currentUser)}</button>
        </header>

        ${c.tab==="dashboard"?Ha({paidToday:n,cashPaidToday:r,gcashPaidToday:a,disbursementToday:s,cashOnHandToday:i,orders:e.orders,payments:e.payments,sales:e.sales}):""}
        ${c.tab==="pos"?Wa(e.orders,e.customers,e.services,e.categories,e.payments,e.branch):""}
        ${c.tab==="orders"?Xa(e.orders,e.staff,e.services,e.payments):""}
        ${c.tab==="archived"?Ka(e.orders,e.staff,e.services,e.payments):""}
        ${c.tab==="customers"?Ja(e.customers,e.orders):""}
        ${c.tab==="pricing"?za(e.allServices,e.categories):""}
        ${c.tab==="disbursements"?Za(e.expenses,e.sales):""}
        ${c.tab==="reports"?tr(e.orders,e.payments,e.sales,e.expenses,e.revolvingHistory,e.foldRate):""}
        ${c.tab==="inventory"?ar(e.services,e.categories):""}
        ${c.tab==="maintenance"?rr(e.machines,e.subcleanings,e.branch):""}
        ${c.tab==="staff"?nr(e.allStaff,e.branch):""}
        ${c.tab==="revolving"?gr(e.sales,e.revolvingHistory,e.orders,e.expenses):""}
        ${c.tab==="settings"?sr(e.branch,e.foldRate,e.reportEmail):""}
      </main>
    </div>
  `,ir(),lr(e),dr(e.allServices),ur(e.expenses),mr(e.orders,e.payments,e.sales,e.expenses,e.revolvingHistory,e.foldRate),vr(),pr(),fr(),yr(e.allStaff),br(),hr(),cr()}function Et(){if(c.currentUser?.role==="admin")return Object.keys(Fe).filter(t=>t!=="inventory");const e=["dashboard","pos","orders","archived","disbursements","reports","maintenance","revolving"];return Fa(c.currentUser)?["dashboard","disbursements","reports","maintenance","revolving"]:ka(c.currentUser)?e.filter(t=>t!=="revolving"):e}function Ba(){qe.innerHTML=`
    <main class="login-page">

      <section class="login-panel-wrap">
        <article class="login-panel">
          <header>
            <div class="login-mark"><img src="/laba101-logo.svg" alt="Laba101" /></div>
            <h2>Welcome back</h2>
            <p>Sign in to continue managing today&apos;s laundry operations.</p>
          </header>
          ${c.loginError?`<div class="alert">${v(c.loginError)}</div>`:""}
          <form id="login-form" class="form">
            <label>Email address<input name="email" type="email" autocomplete="username" placeholder="admin@laba101.test or staff@laba101.gensan" required /></label>
            <label>Password<input name="password" type="password" autocomplete="current-password" placeholder="password" required /></label>
            <label class="remember"><input name="remember" type="checkbox" value="1" /> Remember me on this device</label>
            <button class="primary" id="login-button" type="submit">Sign in</button>
          </form>
        </article>
      </section>
    </main>
  `}function ja(){document.querySelectorAll("[data-fill-email]").forEach(e=>{e.addEventListener("click",()=>{const t=document.querySelector('input[name="email"]'),a=document.querySelector('input[name="password"]');t&&(t.value=e.dataset.fillEmail??""),a&&(a.value=e.dataset.fillPassword??"")})})}function Ha(e){const t=new Date,a=Array.from({length:7},(i,o)=>{const m=new Date(t);return m.setDate(t.getDate()-(6-o)),new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric"}).format(m)}),r=Array.from({length:7},(i,o)=>{const m=new Date(t);m.setDate(t.getDate()-(6-o));const l=pe(m),d=e.orders.filter(y=>j(y.createdAt)===l).reduce((y,f)=>y+f.paidAmount,0),u=e.sales.filter(y=>y.saleDate===l).reduce((y,f)=>y+f.totalAmount,0);return d+u}),n=Math.max(1,...r),s=210;return`
    <section class="dashboard-main">
      <article class="panel revenue-panel">
        ${P("Revenue overview","Paid amount for the last 7 days.")}
        <div class="stats compact dashboard-stats">
          <div class="stat paid-today-stat">
            <span class="card-label">Paid Today</span>
            <div class="value">${$(e.paidToday)}</div>
            <div class="stat-breakdown"><span>Cash ${$(e.cashPaidToday)}</span><span>GCash ${$(e.gcashPaidToday)}</span></div>
          </div>
          <div class="stat"><span class="card-label">Disbursement</span><div class="value">${$(e.disbursementToday)}</div></div>
          <div class="stat"><span class="card-label">Cash on Hand</span><div class="value">${$(e.cashOnHandToday)}</div></div>
        </div>
        <div class="chart-shell">
          <div class="mini-chart revenue-chart">
            ${r.map((i,o)=>{const m=Math.max(12,Math.round(i/n*s));return`<div class="chart-bar ${o===r.length-1?"is-today":""}"><span style="height:${m}px"></span><strong>${$(i)}</strong></div>`}).join("")}
          </div>
          <div class="chart-days">${a.map(i=>`<span>${v(i)}</span>`).join("")}</div>
        </div>
        <div class="chart-footnote">Values include POS payments and Daily Report sales input.</div>
      </article>
    </section>
  `}function Wa(e,t,a,r,n,s){const i=a.filter(u=>u.serviceType==="order"&&u.isActive),o=a.filter(u=>u.serviceType==="addon"&&u.isActive),m=c.receiptOrderId?e.find(u=>u.id===c.receiptOrderId):null,l=new Set(e.map(u=>u.customerId)),d=t.filter(u=>l.has(u.id));return`
    <section class="grid content full">
      <article class="panel span-2">
        ${P("New POS order","Tap a service, add extra quantities, and confirm the total")}
        <form id="order-form" class="form">
          <div class="form-row">
            <label>Existing customer (${v(s)})
              <select name="customerId">
                <option value="">-- New customer --</option>
                ${d.map(u=>`<option value="${u.id}" data-name="${v(u.name)}" data-phone="${v(u.phone??"")}">${v(u.name)} ${u.phone?`- ${v(u.phone)}`:""}</option>`).join("")}
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
            ${o.length?o.map(u=>`<div class="qty-card addon-quantity" data-qty-card="addonQty-${u.id}">
              <span><strong>${v(J(u.name))}</strong><small>${$(u.price)} each</small></span>
              <div class="qty-control">
                <button type="button" data-qty-minus="addonQty-${u.id}" aria-label="Decrease ${v(J(u.name))}">-</button>
                <input type="number" name="addonQty-${u.id}" min="0" step="1" value="0" inputmode="numeric" />
                <button type="button" data-qty-plus="addonQty-${u.id}" aria-label="Increase ${v(J(u.name))}">+</button>
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

      ${m?Me(m,n.filter(u=>u.orderId===m.id)):""}
    </section>
  `}function Xa(e,t,a,r){const n=c.receiptOrderId?e.find(d=>d.id===c.receiptOrderId):null,s=e.filter(d=>d.status!=="claimed"),i=c.orderSearch.trim().toLowerCase(),o=c.orderDateFilter.trim(),m=c.orderPaymentFilter.trim().toLowerCase(),l=s.filter(d=>{const u=!i||[d.ticket,d.customer,d.phone,d.service,d.itemCategory,d.status].some(b=>String(b??"").toLowerCase().includes(i)),y=!o||j(d.createdAt)===o,f=!m||Ue(d)===m;return u&&y&&f});return`
    <section class="grid content full">
      <article class="panel span-2">
        ${P("Order queue","Workflow, payment, and receipts")}
        <form class="queue-filters" id="order-queue-filters">
          <label>
            <span>Search queue</span>
            <input name="orderSearch" type="search" placeholder="Ticket, name, service, status" value="${v(c.orderSearch)}" autocomplete="off" />
          </label>
          <label>
            <span>Filter date</span>
            <input name="orderDateFilter" type="date" value="${v(c.orderDateFilter)}" />
          </label>
          <label>
            <span>Payment</span>
            <select name="orderPaymentFilter">
              <option value="" ${c.orderPaymentFilter===""?"selected":""}>All</option>
              <option value="unpaid" ${c.orderPaymentFilter==="unpaid"?"selected":""}>Unpaid</option>
              <option value="partial" ${c.orderPaymentFilter==="partial"?"selected":""}>Partial</option>
              <option value="paid" ${c.orderPaymentFilter==="paid"?"selected":""}>Paid</option>
            </select>
          </label>
          <div class="search-actions queue-actions">
            <button class="primary" type="submit">Apply</button>
            <button class="secondary" type="button" id="order-queue-clear">Clear</button>
          </div>
        </form>
        <div class="summary-list queue-summary">
          <div><span>Active queue</span><strong>${l.length}</strong></div>
          <div><span>Claimed archived</span><strong>${e.filter(d=>d.status==="claimed").length}</strong></div>
        </div>
        <table class="data-table orders-data-table">
          <thead>
            <tr><th>Ticket</th><th>Customer</th><th>Service</th><th>Total Payment</th><th>Actions</th></tr>
          </thead>
          <tbody>
            ${l.map(d=>St(d,t,a)).join("")||'<tr><td colspan="5" class="table-empty">No matching active orders.</td></tr>'}
          </tbody>
        </table>
      </article>
      ${n?Me(n,r.filter(d=>d.orderId===n.id)):""}
    </section>
  `}function Ka(e,t,a,r){const n=e.filter(m=>m.status==="claimed"),s=c.archivedOrderSearch.trim().toLowerCase(),i=n.filter(m=>s?[m.ticket,m.customer,m.phone,m.service,m.itemCategory].some(l=>String(l??"").toLowerCase().includes(s)):!0),o=c.receiptOrderId?e.find(m=>m.id===c.receiptOrderId):null;return`
    <section class="grid content full">
      <article class="panel span-2">
        ${P("Archived orders","All claimed orders are listed here")}
        <form class="queue-filters" id="archived-order-filters">
          <label>
            <span>Search archived</span>
            <input name="archivedOrderSearch" type="search" placeholder="Ticket, name, service" value="${v(c.archivedOrderSearch)}" autocomplete="off" />
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
            ${i.map(m=>St(m,t,a)).join("")||'<tr><td colspan="5" class="table-empty">No archived orders found.</td></tr>'}
          </tbody>
        </table>
      </article>
      ${o?Me(o,r.filter(m=>m.orderId===o.id)):""}
    </section>
  `}function St(e,t,a){const r=mt(e,a),n=r.find(f=>!e.workflowCompleted.includes(f.key)),s=n?.key==="fold",i=n?.key==="extras"&&e.extras.length>0,o=Ue(e),m=o.charAt(0).toUpperCase()+o.slice(1),l=e.extras.length?e.extras.map(f=>`${v(J(f.name))} x${Number(f.quantity??1)}`).join(", "):"",d=c.currentUser?.role==="admin",u=e.status!=="claimed"&&e.paidAmount<=0,y=e.status!=="claimed"&&d&&e.paidAmount>0;return`
    <tr class="order-row-main">
      <td><strong>${v(e.ticket)}</strong><div class="small">${v(re(e.createdAt))}</div></td>
      <td>${v(e.customer)}<div class="small">${v(e.phone??"")}</div></td>
      <td>${v(e.service)}${l?`<div class="small">Extras: ${l}</div>`:""}</td>
      <td class="amount-cell"><strong>${$(e.totalAmount)}</strong><div class="small">${v(m)} · Paid ${$(e.paidAmount)} · Bal ${$(e.balance)}</div></td>
      <td>
      <div class="row-actions">
        ${n?`<form class="inline-form advance-form" data-order-id="${e.id}">
          ${i?`<div class="extra-confirmation">Confirm extra service: <strong>${e.extras.map(f=>`${v(J(f.name))} x${Number(f.quantity??1)}`).join(", ")}</strong></div>`:""}
          ${s?`<select name="assignedStaffId" required>
            <option value="">Staff</option>
            ${t.map(f=>`<option value="${f.id}">${v(f.name)}</option>`).join("")}
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
            ${r.map(f=>`<span class="${e.workflowCompleted.includes(f.key)?"is-done":n?.key===f.key?"is-next":""}">${v(f.label)}</span>`).join("")}
          </div>
        </div>
      </td>
    </tr>
  `}function Me(e,t){const a=t.reduce((i,o)=>i+Number(o.amount),0),r=Math.max(0,Number((a-e.totalAmount).toFixed(2))),n=Ue(e),s=n.charAt(0).toUpperCase()+n.slice(1);return`
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="receipt-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-open-printer-panel>Printer</button>
          <button class="primary" type="button" data-thermal-print>${c.printerLoading?"Printing...":"Print Receipt"}</button>
          <button class="secondary" type="button" data-close-receipt>Close</button>
        </div>
        ${c.printerPanelOpen?Ga():""}
        <div class="receipt" id="receipt-print-area">
          <div class="receipt-head">
            <h3 id="receipt-title">Laba101</h3>
            <p>${v(e.ticket)}<br>${v(re(e.createdAt))}</p>
          </div>
          ${c.currentUser?`<p class="receipt-staff">Staff: ${v(c.currentUser.name)}</p>`:""}
          <div class="receipt-customer">
            <strong>${v(e.customer)}</strong>
            <span>${v(e.phone??"No phone")}</span>
          </div>
          <div class="summary-list receipt-lines">
            <div><span>Service</span><strong>${v(e.service)}</strong></div>
            ${e.extras.length?`<div><span>Extra services</span><strong>${e.extras.map(i=>`${v(J(i.name))} x${Number(i.quantity??1)} (${$(Number(i.total??i.price))})`).join(", ")}</strong></div>`:""}
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
  `}function Ga(){return`
    <div class="printer-panel">
      <div class="printer-panel-head">
        <strong>Bluetooth thermal printer</strong>
        <button class="secondary" type="button" data-refresh-printers>${c.printerLoading?"Scanning...":"Scan paired"}</button>
      </div>
      <div class="printer-fields">
        <label>Printer
          <select data-printer-select>
            <option value="">Select paired printer</option>
            ${c.pairedPrinters.map(e=>`<option value="${v(e.address)}" ${c.selectedPrinterAddress===e.address?"selected":""}>${v(e.name)} - ${v(e.address)}</option>`).join("")}
          </select>
        </label>
        <label>Paper
          <select data-paper-width>
            <option value="58" ${c.printerPaperWidth===58?"selected":""}>58mm</option>
            <option value="80" ${c.printerPaperWidth===80?"selected":""}>80mm</option>
          </select>
        </label>
      </div>
      <div class="printer-actions">
        <button class="secondary" type="button" data-connect-printer>${c.printerLoading?"Connecting...":"Connect & Save"}</button>
      </div>
      ${c.printerStatus?`<p class="printer-status ok">${v(c.printerStatus)}</p>`:""}
      ${c.printerError?`<p class="printer-status warn">${v(c.printerError)}</p>`:""}
    </div>
  `}async function et(){c.printerLoading=!0,c.printerError="",c.printerStatus="",await S();try{if(!(await le.requestBluetoothPermissions()).granted)throw new Error("Bluetooth permission was not granted.");const t=await le.listPairedPrinters();c.pairedPrinters=t.printers??[],c.selectedPrinterAddress=c.selectedPrinterAddress||t.savedAddress||c.pairedPrinters[0]?.address||"",c.printerStatus=c.pairedPrinters.length?"Select a printer, then connect.":"No paired printers found. Pair the printer in Android Bluetooth settings first."}catch(e){c.printerError=e instanceof Error?e.message:"Could not scan paired printers."}finally{c.printerLoading=!1,await S()}}async function Va(){if(!c.selectedPrinterAddress){c.printerError="Select a paired printer first.",await S();return}c.printerLoading=!0,c.printerError="",c.printerStatus="",await S();try{await le.savePrinter({address:c.selectedPrinterAddress}),await le.connect({address:c.selectedPrinterAddress}),c.printerStatus="Printer connected and saved."}catch(e){c.printerError=e instanceof Error?e.message:"Printer connection failed."}finally{c.printerLoading=!1,await S()}}function Ya(e){const t=(e.serviceLines?.length?e.serviceLines:[{id:e.serviceId,name:e.service,price:e.price,quantity:1,total:e.price}]).map(r=>({name:r.name,quantity:Number(r.quantity||1),price:Number(r.price||0)})),a=e.extras.map(r=>({name:J(r.name),quantity:Number(r.quantity??1),price:Number(r.price||0)}));return[...t,...a]}async function Qa(e,t){const a=t.reduce((n,s)=>n+Number(s.amount),0),r=Math.max(0,Number((a-e.totalAmount).toFixed(2)));c.printerLoading=!0,c.printerError="",c.printerStatus="",await S();try{if(!c.selectedPrinterAddress){const n=await le.getSavedPrinter();c.selectedPrinterAddress=n.address||""}await le.printReceipt({address:c.selectedPrinterAddress||void 0,paperWidth:c.printerPaperWidth,storeName:"Laba101",receiptNumber:e.ticket,dateTime:re(e.createdAt),customerName:e.customer,customerPhone:e.phone?.trim()||"No phone",items:Ya(e),totalAmount:e.totalAmount,paidAmount:e.paidAmount,changeAmount:r,balanceAmount:e.balance,staffName:c.currentUser?.name?.trim()||"Staff"}),c.printerStatus="Receipt sent to printer."}catch(n){c.printerPanelOpen=!0,c.printerError=n instanceof Error?n.message:"Bluetooth thermal print failed."}finally{c.printerLoading=!1,await S()}}function Ja(e,t){const a=c.customerSearch.trim().toLowerCase(),r=e.filter(n=>a?n.name.toLowerCase().includes(a):!1);return`
    <section class="grid content full">
      <article class="panel">
        ${P("Customer Management","Customer records from local offline storage")}
        <form class="search-box" id="customer-search-form">
          <label>
            <span>Search customer name</span>
            <input name="customerSearch" data-customer-search type="search" placeholder="Type the customer name then tap Search" value="${v(c.customerSearch)}" autocomplete="off" />
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
        ${P("Customer list","Names, phones, addresses, and order history")}
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
  `}function za(e,t){return`
    <section class="grid content full">
      <article class="panel">
        ${P("Services","Order services and add-ons used by POS pricing")}
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
        ${P("Item categories","Load limits and extra fees")}
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
  `}function Za(e,t){const a=W(),r=a.slice(0,7),n=c.currentUser?.role==="admin",s=e.filter(l=>l.expenseDate===a).reduce((l,d)=>l+d.amount,0),i=e.filter(l=>l.expenseDate.startsWith(r)).reduce((l,d)=>l+d.amount,0),o=t.filter(l=>l.saleDate===a).reduce((l,d)=>l+d.totalAmount,0),m=t.filter(l=>l.saleDate.startsWith(r)).reduce((l,d)=>l+d.totalAmount,0);return`
    <section class="page-head">
      <div>
        <h2>Daily Report</h2>
      </div>
      <div class="segmented">
        <button class="${c.dailyReportTab==="expenses"?"is-active":""}" data-report-tab="expenses" type="button">Disbursements</button>
        <button class="${c.dailyReportTab==="sales"?"is-active":""}" data-report-tab="sales" type="button">Daily Sales</button>
      </div>
    </section>
    <section class="grid stats compact report-stats">
      <div class="panel stat"><div class="card-label">Daily disbursement</div><div class="value">${$(s)}</div></div>
      <div class="panel stat"><div class="card-label">Monthly disbursement</div><div class="value">${$(i)}</div></div>
      <div class="panel stat"><div class="card-label">Today sales input</div><div class="value">${$(o)}</div></div>
      <div class="panel stat"><div class="card-label">Month sales input</div><div class="value">${$(m)}</div></div>
    </section>
    ${c.dailyReportTab==="expenses"?`
    <section class="grid content full">
      <article class="panel">
        ${P("Input disbursement","Supplies, utilities, and cash disbursements")}
        <form id="expense-form" class="form">
          <input name="id" type="hidden" />
          <div class="form-row"><label>Date<input name="expenseDate" type="date" value="${W()}" required /></label><label>Amount<input name="amount" type="number" min="0" step="0.01" required /></label></div>
          <div class="form-row"><label>Name<input name="name" required /></label><label>Category<input name="category" required /></label></div>
          <label>Description<textarea name="description"></textarea></label>
          <button class="primary" type="submit">Save expense</button>
        </form>
      </article>
      <article class="panel">
        ${P("Disbursement list","Expenses only")}
        <div class="table-scroll daily-report-scroll">
          <div class="table daily-report-table">
            <div class="table-head"><div>Date</div><div>No.</div><div>Name</div><div>Category</div><div>Amount</div><div>Action</div></div>
            ${e.map(l=>`<div class="table-row"><div>${v(l.expenseDate)}</div><div>${v(l.number)}</div><div>${v(l.name)}</div><div>${v(l.category)}</div><div>${$(l.amount)}</div><div class="row-actions"><button class="secondary edit-expense-btn" data-id="${l.id}" type="button">Edit</button>${n?`<button class="secondary delete-expense-btn" data-id="${l.id}" type="button">Delete</button>`:""}</div></div>`).join("")||'<div class="helper">No expenses yet.</div>'}
          </div>
        </div>
      </article>
    </section>
    `:`
    <section class="grid content full">
      <article class="panel">
        ${P("Input total sale","Manual cash and GCash totals")}
        <form id="sales-form" class="form">
          <input name="id" type="hidden" />
          <label>Date<input name="saleDate" type="date" value="${W()}" required /></label>
          <label>Cash sales<input name="cashAmount" type="number" min="0" step="0.01" value="0" /></label>
          <label>GCash sales<input name="gcashAmount" type="number" min="0" step="0.01" value="0" /></label>
          <label>Notes<textarea name="notes" placeholder="Optional"></textarea></label>
          <button class="primary" type="submit">Save daily sale</button>
        </form>
      </article>
      <article class="panel">
        ${P("Daily sales history","Cash, GCash, total sale, notes, and updates")}
        <div class="table-scroll daily-report-scroll">
          <div class="table wide-table daily-report-table">
            <div class="table-head"><div>Sales #</div><div>Date</div><div>Cash</div><div>GCash</div><div>Total sale</div><div>Action</div></div>
            ${t.map(l=>`<div class="table-row"><div>${v(l.saleNumber)}</div><div>${v(l.saleDate)}</div><div>${$(l.cashAmount)}</div><div>${$(l.gcashAmount)}</div><div><strong>${$(l.totalAmount)}</strong></div><div class="row-actions"><button class="secondary edit-sale-btn" data-id="${l.id}" type="button">Edit</button>${n?`<button class="secondary delete-sale-btn" data-id="${l.id}" type="button">Delete</button>`:""}</div></div>`).join("")||'<div class="helper">No daily sales totals yet.</div>'}
          </div>
        </div>
      </article>
    </section>
    `}
  `}function er(e,t){return typeof e=="number"&&t>=4?$(e):v(e??"")}function tr(e,t,a,r,n,s,i,o,m){const l=c.reportPreview?gt(e,t,a,r,n,s,c.reportPreview):null;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">Exports</p>
        <h2>Report Center</h2>
      </div>
    </section>
    <section class="panel report-center">
      <div class="report-grid">
        <div class="report-date-row">
          <h3>Date to export</h3>
          <div class="form-row report-date-inputs">
            <label>From<input name="dateFrom" data-date-from type="date" value="${W()}" /></label>
            <label>To<input name="dateTo" data-date-to type="date" value="${W()}" /></label>
          </div>
        </div>
        <div class="report-scope-row">
          <div class="date-scopes">
            <label><input type="radio" name="dateScope" value="today" data-date-scope checked /> <span>Current</span></label>
            <label><input type="radio" name="dateScope" value="week" data-date-scope /> <span>Week</span></label>
            <label><input type="radio" name="dateScope" value="month" data-date-scope /> <span>Month</span></label>
            <label><input type="radio" name="dateScope" value="custom" data-date-scope /> <span>Custom</span></label>
          </div>
        </div>
        <div class="report-include-row">
          <h3>Reports to include</h3>
          <div class="report-checks">
            <label><input type="checkbox" name="reportType" value="sales" checked /> Sales Report</label>
            <label><input type="checkbox" name="reportType" value="disbursement" checked /> Disbursement Reports</label>
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
    ${l?`
      <section class="panel report-preview">
        ${l.selectedTypes.has("sales")?`
          <article>
            ${P("Sales report preview",`${l.selection.from} to ${l.selection.to}`)}
            <div class="table wide-table report-preview-table">
              <div class="table-head report-table-head"><div>Type</div><div>Date</div><div>Number</div><div>Name</div><div>Cash</div><div>GCash</div><div>Total</div><div>Balance</div></div>
              ${l.salesRows().rows.slice(1).filter(d=>d.length).map(d=>`<div class="table-row report-table-row">${d.map((u,y)=>`<div>${er(u,y)}</div>`).join("")}</div>`).join("")}
            </div>
          </article>`:""}
        ${l.selectedTypes.has("disbursement")?`
          <article>
            ${P("Disbursement preview",`${l.selection.from} to ${l.selection.to}`)}
            <div class="table wide-table report-preview-table report-disbursement-table">
              <div class="table-head report-table-head"><div>Type</div><div>Date</div><div>Number</div><div>Name</div><div>Amount</div></div>
              ${l.disbursementRows().rows.slice(1).map(d=>`<div class="table-row report-table-row">${d.map(u=>`<div>${v(u??"")}</div>`).join("")}</div>`).join("")}
            </div>
          </article>`:""}
        ${l.selectedTypes.has("fold_count")?`
          <article>
            ${P("Fold Count preview",`${l.selection.from} to ${l.selection.to}`)}
            <div class="table report-preview-table">
              <div class="table-head"><div>Staff</div><div>Fold Count</div></div>
              ${l.foldCountRows().rows.slice(1).map(d=>`<div class="table-row">${d.map(u=>`<div>${v(u??"")}</div>`).join("")}</div>`).join("")}
            </div>
          </article>`:""}
        ${l.selectedTypes.has("revolving_fund")?`
          <article>
            ${P("Revolving Fund — Daily Summary",`${l.selection.from} to ${l.selection.to}`)}
            ${we(["Date of Sales","Cash on Hand","Status","Date Update"],l.revolvingDailySummaryRows().rows.slice(1).map(d=>[v(String(d[0]??"")),v(String(d[1]??"")),v(String(d[2]??"")),v(String(d[3]??""))]),"data-table revolving-report-table")}
          </article>
          <article>
            ${P("Revolving Fund — Table History",`${l.selection.from} to ${l.selection.to}`)}
            ${we(["Date","Number","Name","Amount","Category","Description","Type"],l.revolvingHistoryRows().rows.slice(1).map(d=>[v(String(d[0]??"")),v(String(d[1]??"")),v(String(d[2]??"")),v(String(d[3]??"")),v(String(d[4]??"")),v(String(d[5]??"")),v(String(d[6]??""))]),"data-table revolving-report-table")}
          </article>`:""}
        ${l.selectedTypes.has("summary")?`
          <article>
            ${P("Summary preview",`${l.selection.from} to ${l.selection.to}`)}
            <div class="summary-list report-summary-list">
              ${l.summaryRows().map(d=>`<div><span>${v(d[0])}</span><strong>${v(String(d[6]??"0"))}</strong></div>`).join("")}
            </div>
          </article>`:""}
      </section>
    `:""}
  `}function ar(e,t){return`
    <section class="grid content full">
      <article class="panel">
        ${P("Inventory","Service catalog and item load limits")}
        <div class="summary-list">
          <div><span>Active services</span><strong>${e.filter(a=>a.isActive).length}</strong></div>
          <div><span>Item categories</span><strong>${t.length}</strong></div>
        </div>
      </article>
      <article class="panel">
        ${P("Service inventory","Current sellable laundry services")}
        <div class="table">
          <div class="table-head"><div>Name</div><div>Category</div><div>Price</div><div>Max KG</div><div>Status</div></div>
          ${e.map(a=>`<div class="table-row"><div><strong>${v(a.name)}</strong></div><div>${v(a.category)}</div><div>${$(a.price)}</div><div>${a.maxKg} kg</div><div>${a.isActive?"Active":"Inactive"}</div></div>`).join("")}
        </div>
      </article>
    </section>
  `}function rr(e,t,a){const r=e.filter(s=>s.status!=="under_cleaning"),n=e.filter(s=>s.status==="under_cleaning");return`
    <section class="page-head">
      <div>
        <h2>Maintenance & Cleaning</h2>
        <p class="meta">Manage machine subcleaning and maintenance records.</p>
      </div>
      <div class="segmented">
        <button class="${c.maintenanceTab==="cleaning"?"is-active":""}" data-maintenance-tab="cleaning" type="button">Subcleaning</button>
        <button class="${c.maintenanceTab==="machines"?"is-active":""}" data-maintenance-tab="machines" type="button">Machine Management</button>
      </div>
    </section>
    ${c.maintenanceTab==="cleaning"?`
    <section class="grid content full">
      <article class="panel">
        ${P("Available Machines","Select machines to start cleaning.")}
        <form id="subcleaning-form" class="form">
          <input type="hidden" name="date" value="${W()}" />
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
        ${P("Under Cleaning","Machines currently being serviced.")}
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
        ${P("Daily Cleaning Checklist","Track which machines have been cleaned today.")}
        <div class="table">
          <div class="table-head"><div>Machine</div><div>Type</div><div>Status</div><div>Notes</div><div>Date</div></div>
          ${e.map(s=>{const i=t.find(o=>o.machineIds.includes(s.id)&&o.date===W());return`<div class="table-row"><div><strong>${v(s.machineName)}</strong></div><div>${v(s.machineType)}</div><div>${i?v(i.cleaningStatus.replace("_"," ")):"Not Cleaned"}</div><div>${v(i?.notes??"-")}</div><div>${W()}</div></div>`}).join("")}
        </div>
      </article>
    </section>
    `:`
    <section class="grid content full">
      <article class="panel">
        ${P("Add Machine","Create washer and dryer records")}
        <form id="machine-form" class="form">
          <label>Machine Name<input name="machineName" required placeholder="e.g. Washer 5" /></label>
          <label>Type<select name="machineType"><option value="washer">Washer</option><option value="dryer">Dryer</option></select></label>
          <label>Status<select name="status"><option value="available">Available</option><option value="under_cleaning">Under Cleaning</option><option value="maintenance">Maintenance</option></select></label>
          <input type="hidden" name="branch" value="${v(a)}" />
          <button class="primary" type="submit">Add machine</button>
        </form>
      </article>
      <article class="panel">
        ${P("Machines","Washer and dryer status")}
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
  `}function nr(e,t){return`
    <section class="grid">
      <div class="page-head">
        <div>
          <p class="eyebrow">Team Management</p>
          <h2>Staff Overview</h2>
        </div>
        <button class="primary" id="open-add-staff-modal" type="button">+ Add staff</button>
      </div>

      <article class="panel">
        ${P("Staff list","Branch: "+v(t))}
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
  `}function sr(e,t,a){return`
    <section class="grid content full">
      <article class="panel">
        ${P("Settings","Device-local configuration")}
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
  `}function ir(){const e=()=>{localStorage.removeItem(ve),c.currentUser=null,c.tab="dashboard",c.receiptOrderId=0,c.sidebarOpen=!1,S()};document.querySelector("#logout-button")?.addEventListener("click",e),document.querySelector("#mobile-logout-button")?.addEventListener("click",e),document.querySelector("#mobile-menu-button")?.addEventListener("click",()=>{c.sidebarOpen=!0,S()}),document.querySelector("#sidebar-close-button")?.addEventListener("click",()=>{c.sidebarOpen=!1,S()}),document.querySelector("#sidebar-backdrop")?.addEventListener("click",()=>{c.sidebarOpen=!1,S()}),document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{c.tab=t.dataset.tab,c.receiptOrderId=0,c.sidebarOpen=!1,S()})}),document.querySelectorAll("[data-quick-tab]").forEach(t=>{t.addEventListener("click",()=>{c.tab=t.dataset.quickTab,S()})}),document.querySelectorAll("[data-receipt]").forEach(t=>{t.addEventListener("click",()=>{c.receiptOrderId=Number(t.dataset.receipt),c.printerPanelOpen=!1,c.printerError="",c.printerStatus="",S()})}),document.querySelector("[data-close-receipt]")?.addEventListener("click",()=>{c.receiptOrderId=0,S()}),document.querySelector("[data-open-printer-panel]")?.addEventListener("click",()=>{c.printerPanelOpen=!c.printerPanelOpen,c.printerPanelOpen&&c.pairedPrinters.length===0?et():S()}),document.querySelector("[data-refresh-printers]")?.addEventListener("click",()=>{et()}),document.querySelector("[data-printer-select]")?.addEventListener("change",t=>{c.selectedPrinterAddress=t.currentTarget.value,S()}),document.querySelector("[data-paper-width]")?.addEventListener("change",t=>{c.printerPaperWidth=Number(t.currentTarget.value)===80?80:58,S()}),document.querySelector("[data-connect-printer]")?.addEventListener("click",()=>{Va()}),document.querySelector("[data-thermal-print]")?.addEventListener("click",()=>{(async()=>{const t=await bt(),a=t.orders.find(n=>n.id===c.receiptOrderId);if(!a)throw new Error("Receipt order not found.");const r=t.payments.filter(n=>n.orderId===a.id);await Qa(a,r)})().catch(t=>{c.printerPanelOpen=!0,c.printerError=t instanceof Error?t.message:"Bluetooth thermal print failed.",S()})}),document.querySelectorAll("[data-report-tab]").forEach(t=>{t.addEventListener("click",()=>{c.dailyReportTab=t.dataset.reportTab,S()})}),document.querySelectorAll("[data-maintenance-tab]").forEach(t=>{t.addEventListener("click",()=>{c.maintenanceTab=t.dataset.maintenanceTab,S()})})}function or(){ja(),document.querySelector("#login-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget),a=document.querySelector("#login-button");a&&(a.disabled=!0,a.textContent="Signing in...");try{const r=await dt(String(t.get("email")??""),String(t.get("password")??""));if(!r){c.loginError="Invalid email or password.",await S();return}c.currentUser=r,c.loginError="",await ge("branch",String(r.branch||"Main Store")),t.get("remember")?localStorage.setItem(ve,JSON.stringify({email:r.email,remembered:!0})):localStorage.removeItem(ve),Et().includes(c.tab)||(c.tab="dashboard"),await S()}catch(r){alert("Login Error: "+String(r?.message||r)),a&&(a.disabled=!1,a.textContent="Sign in")}})}function cr(){ye&&window.clearInterval(ye);const e=document.querySelector("[data-navbar-time]"),t=document.querySelector("[data-navbar-date]");if(!e||!t){ye=void 0;return}const a=()=>{const r=Ua();e.textContent=r.time,t.textContent=r.date};a(),ye=window.setInterval(a,1e3)}function tt(e,t){return e?t.find(a=>a.name.toLowerCase()===e.category.toLowerCase())??t.find(a=>a.name==="Regular Clothes")??t[0]??null:null}function Ce(e,t){return Math.max(1,Number(t.maxKg||e.maxKg||1))}function wt(e,t){return Object.fromEntries(t.filter(a=>a.serviceType==="order").map(a=>[a.id,Number(e.querySelector(`input[name="serviceQty-${a.id}"]`)?.value??0)]).filter(([,a])=>Number(a)>0))}function at(e,t){const a=wt(e,t);return t.filter(r=>r.serviceType==="order"&&Number(a[r.id]??0)>0).map(r=>({...r,quantity:Number(a[r.id])}))}function Tt(e,t){return Object.fromEntries(t.filter(a=>a.serviceType==="addon").map(a=>[a.id,Number(e.querySelector(`input[name="addonQty-${a.id}"]`)?.value??0)]).filter(([,a])=>Number(a)>0))}function rt(e,t){const a=Tt(e,t);return t.filter(r=>r.serviceType==="addon"&&Number(a[r.id]??0)>0).map(r=>({...r,quantity:Number(a[r.id])}))}function lr(e){const t=document.querySelector("#order-form"),a=document.querySelector("#price-preview"),r=t?.querySelector('button[type="submit"]'),n=t?.querySelector('select[name="customerId"]'),s=t?.querySelector('input[name="customerName"]'),i=t?.querySelector('input[name="customerPhone"]'),o=t?.querySelector("[data-order-error]"),m=t?.querySelector('select[name="paymentMethod"]'),l=t?.querySelector(".gcash-reference"),d=t?.querySelector('input[name="paymentReference"]');let u=!1;const y=()=>{if(!n||!s||!i)return;const p=n.selectedOptions[0];s.value=p?.dataset.name??"",i.value=p?.dataset.phone??""},f=()=>{const p=m?.value==="gcash";l&&(l.hidden=!p),d&&(d.required=p,p||(d.value=""))},b=(p,T)=>{if(!t)return;const h=t.querySelector(`input[name="${p}"]`);h&&(h.value=String(Math.max(0,Number(h.value||0)+T)),h.closest(".qty-card")?.classList.toggle("is-selected",Number(h.value)>0),h.dispatchEvent(new Event("input",{bubbles:!0})))};t?.querySelectorAll(".qty-control input").forEach(p=>{p.addEventListener("input",()=>{p.value=String(Math.max(0,Number(p.value||0))),p.closest(".qty-card")?.classList.toggle("is-selected",Number(p.value)>0)})}),t?.querySelectorAll("[data-qty-card]").forEach(p=>{p.addEventListener("click",T=>{const h=T.target;h.closest("input")||h.closest("button")||b(p.dataset.qtyCard??"",1)})}),t?.querySelectorAll("[data-qty-plus]").forEach(p=>{p.addEventListener("click",()=>b(p.dataset.qtyPlus??"",1))}),t?.querySelectorAll("[data-qty-minus]").forEach(p=>{p.addEventListener("click",()=>b(p.dataset.qtyMinus??"",-1))});const E=()=>{if(!t||!a)return;const p=at(t,e.services),T=p[0],h=tt(T,e.categories),C=rt(t,e.services);if(!p.length||!T||!h){r&&(r.disabled=!0),o&&(o.hidden=!u,o.textContent=u?"Please select at least one service quantity.":""),a.innerHTML='<div class="preview-total"><span>Total amount</span><strong>PHP 0.00</strong></div>';return}const R=Oe(p,h,Ce(T,h),C),O=R.serviceLines.map(F=>`${F.name} x${F.quantity}`),U=R.extras.map(F=>`${J(F.name)} x${F.quantity}`);r&&(r.disabled=!1),o&&(o.hidden=!0,o.textContent=""),a.classList.remove("has-error"),a.innerHTML=`
      <div class="preview-line"><span>Services${O.length?` (${v(O.join(", "))})`:""}</span><strong>${$(R.price)}</strong></div>
      ${R.extraServiceAmount>0?`<div class="preview-line"><span>Extra services${U.length?` (${v(U.join(", "))})`:""}</span><strong>${$(R.extraServiceAmount)}</strong></div>`:""}
      <div class="preview-total"><span>Total amount</span><strong>${$(R.totalAmount)}</strong></div>
    `};n?.addEventListener("change",y),m?.addEventListener("change",f),f(),t?.addEventListener("input",E),t?.addEventListener("change",E),E(),t?.addEventListener("submit",async p=>{p.preventDefault(),u=!0;const T=new FormData(t),h=at(t,e.services),C=h[0],R=tt(C,e.categories),O=rt(t,e.services);if(!h.length||!C||!R){o&&(o.hidden=!1,o.textContent="Please select at least one service quantity.");return}const U=h.map(x=>`${x.name} x${x.quantity}`).join(", "),F=Oe(h,R,Ce(C,R),O);if(confirm(`Save this order?

Services: ${U}
Total: ${$(F.totalAmount)}`))try{await da({customerId:Number(T.get("customerId"))||void 0,customerName:String(T.get("customerName")??""),customerPhone:String(T.get("customerPhone")??"")||null,serviceQuantities:wt(t,e.services),branch:e.branch,itemCategoryId:R?.id,weightKg:C&&R?Ce(C,R):void 0,addonQuantities:Tt(t,e.services),paidAmount:Number(T.get("paidAmount")??0),paymentMethod:String(T.get("paymentMethod")??"cash"),paymentReference:String(T.get("paymentReference")??"")||null,notes:String(T.get("notes")??"")||null}),await S()}catch(x){o&&(o.hidden=!1,o.textContent=x instanceof Error?x.message:"Order could not be saved.")}}),document.querySelectorAll(".advance-form").forEach(p=>{p.addEventListener("submit",async T=>{T.preventDefault();const h=new FormData(p);await ma(Number(p.dataset.orderId),Number(h.get("assignedStaffId"))||null),await S()})}),document.querySelectorAll(".payment-form").forEach(p=>{const T=p.querySelector('select[name="method"]'),h=p.querySelector('input[name="reference"]'),C=()=>{const R=T?.value==="gcash";h&&(h.hidden=!R,h.required=R,R||(h.value=""))};T?.addEventListener("change",C),C(),p.addEventListener("submit",async R=>{R.preventDefault();const O=new FormData(p);await vt(Number(p.dataset.orderId),{amount:Number(O.get("amount")),method:String(O.get("method")),reference:String(O.get("reference")??"")||null}),await S()})}),document.querySelectorAll("[data-cancel-order]").forEach(p=>{p.addEventListener("click",async()=>{const T=Number(p.dataset.cancelOrder);if(Number.isFinite(T)&&confirm("Cancel this order? (No payment will be refunded.)"))try{c.receiptOrderId===T&&(c.receiptOrderId=0),await pa(T),await S()}catch(h){alert(h instanceof Error?h.message:"Cancel failed.")}})}),document.querySelectorAll("[data-delete-order]").forEach(p=>{p.addEventListener("click",async()=>{const T=Number(p.dataset.deleteOrder);if(Number.isFinite(T)&&confirm("Delete this paid order and update sales?"))try{c.receiptOrderId===T&&(c.receiptOrderId=0),await fa(T),await S()}catch(h){alert(h instanceof Error?h.message:"Delete failed.")}})})}function dr(e){document.querySelector("#service-form")?.addEventListener("submit",async t=>{t.preventDefault();const a=new FormData(t.currentTarget),r=a.get("id")?Number(a.get("id")):void 0;await Ye({id:r,name:String(a.get("name")??""),description:String(a.get("description")??"")||null,category:String(a.get("category")??""),serviceType:String(a.get("serviceType")??"order"),price:Number(a.get("price")??0),maxKg:Number(a.get("maxKg")??0),dryingMinutes:Number(a.get("dryingMinutes"))||null,includes:a.getAll("includes").map(String).filter(Boolean),additionalCharge:0,turnaroundHours:Number(a.get("turnaroundHours")??24),isActive:1}),await S()}),document.querySelectorAll(".edit-service-btn").forEach(t=>{t.addEventListener("click",()=>{const a=Number(t.dataset.id),r=e.find(s=>s.id===a),n=document.querySelector("#service-form");r&&n&&(n.querySelector("[name=id]").value=String(r.id),n.querySelector("[name=name]").value=r.name,n.querySelector("[name=category]").value=r.category,n.querySelector("[name=serviceType]").value=r.serviceType,n.querySelector("[name=price]").value=String(r.price),n.querySelector("[name=maxKg]").value=String(r.maxKg),n.querySelector("[name=dryingMinutes]").value=r.dryingMinutes?String(r.dryingMinutes):"",n.querySelectorAll('input[name="includes"]').forEach(s=>{s.checked=r.includes.includes(s.value)}),n.querySelector("[name=turnaroundHours]").value=String(r.turnaroundHours),n.querySelector("[name=description]").value=r.description??"",window.scrollTo({top:0,behavior:"smooth"}))})}),document.querySelectorAll(".deactivate-service-btn, .activate-service-btn").forEach(t=>{t.addEventListener("click",async()=>{const a=Number(t.dataset.id),r=e.find(n=>n.id===a);if(r){const n=r.isActive?0:1;await Ye({id:r.id,name:r.name,description:r.description,category:r.category,serviceType:r.serviceType,price:r.price,maxKg:r.maxKg,dryingMinutes:r.dryingMinutes,includes:r.includes,additionalCharge:r.additionalCharge,turnaroundHours:r.turnaroundHours,isActive:n}),await S()}})}),document.querySelector("#category-form")?.addEventListener("submit",async t=>{t.preventDefault();const a=new FormData(t.currentTarget);await ca({name:String(a.get("name")??""),maxKg:Number(a.get("maxKg")??0),additionalFee:Number(a.get("additionalFee")??0),isActive:1}),await S()})}function ur(e){const t=document.querySelector("#expense-form");t?.addEventListener("submit",async a=>{a.preventDefault();const r=new FormData(a.currentTarget),n=Number(r.get("id")||0),s={expenseDate:String(r.get("expenseDate")??""),name:String(r.get("name")??""),category:String(r.get("category")??""),description:String(r.get("description")??""),amount:Number(r.get("amount")??0)};n?await wa(n,s):await Sa(s),await S()}),document.querySelectorAll(".edit-expense-btn").forEach(a=>{a.addEventListener("click",()=>{const r=e.find(s=>s.id===Number(a.dataset.id));if(!r||!t)return;t.querySelector("[name=id]").value=String(r.id),t.querySelector("[name=expenseDate]").value=r.expenseDate,t.querySelector("[name=amount]").value=String(r.amount),t.querySelector("[name=name]").value=r.name,t.querySelector("[name=category]").value=r.category,t.querySelector("[name=description]").value=r.description??"";const n=t.querySelector('button[type="submit"]');n&&(n.textContent="Update expense"),t.scrollIntoView({behavior:"smooth",block:"start"})})}),document.querySelectorAll(".delete-expense-btn").forEach(a=>{a.addEventListener("click",async()=>{if(c.currentUser?.role!=="admin")return;const r=Number(a.dataset.id);!Number.isFinite(r)||!confirm("Delete this disbursement?")||(await Ta(r),await S())})}),document.querySelector("#fold-form")?.addEventListener("submit",async a=>{a.preventDefault();const r=new FormData(a.currentTarget);await ha({orderTicket:String(r.get("orderTicket")??""),staffName:String(r.get("staffName")??""),foldCount:Number(r.get("foldCount")??1),rate:Number(r.get("rate")??5)}),await S()})}function mr(e,t,a,r,n,s){document.querySelector("#generate-report")?.addEventListener("click",()=>{c.reportPreview=he(),S()});const i=document.querySelector("#sales-form");i?.addEventListener("submit",async b=>{b.preventDefault();const E=new FormData(b.currentTarget);await Aa({id:Number(E.get("id")||0)||void 0,saleDate:String(E.get("saleDate")??""),cashAmount:Number(E.get("cashAmount")??0),gcashAmount:Number(E.get("gcashAmount")??0),notes:String(E.get("notes")??"")}),await S()}),document.querySelectorAll(".edit-sale-btn").forEach(b=>{b.addEventListener("click",()=>{const E=a.find(T=>T.id===Number(b.dataset.id));if(!E||!i)return;i.querySelector("[name=id]").value=String(E.id),i.querySelector("[name=saleDate]").value=E.saleDate,i.querySelector("[name=cashAmount]").value=String(E.cashAmount),i.querySelector("[name=gcashAmount]").value=String(E.gcashAmount),i.querySelector("[name=notes]").value=E.notes??"";const p=i.querySelector('button[type="submit"]');p&&(p.textContent="Update daily sale"),i.scrollIntoView({behavior:"smooth",block:"start"})})}),document.querySelectorAll(".delete-sale-btn").forEach(b=>{b.addEventListener("click",async()=>{if(c.currentUser?.role!=="admin")return;const E=Number(b.dataset.id);!Number.isFinite(E)||!confirm("Delete this daily sale?")||(await La(E),await S())})});const o=document.querySelector("[data-date-from]"),m=document.querySelector("[data-date-to]");document.querySelectorAll("[data-date-scope]").forEach(b=>{b.addEventListener("change",()=>{if(!b.checked||!o||!m)return;const E=new Date,p=pe(E),T=new Date(E);b.value==="week"&&T.setDate(E.getDate()-6),b.value==="month"&&T.setDate(1),b.value!=="custom"&&(o.value=b.value==="today"?p:pe(T),m.value=p)})});const l=b=>{const E=h=>String(h??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;"),p=h=>h==="Sales Report"?[110,125,150,215,95,95,105,105]:h==="Disbursement"?[110,115,150,220,105]:h==="Fold Count"?[220,125]:h==="Revolving Daily Summary"?[115,105,120,115]:h==="Revolving History"?[115,96,140,96,110,180,120]:[155,125,125,125,95,95,115,115];return`<?xml version="1.0"?>
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
  ${b.map(h=>{const C=p(h.name).map(O=>`<Column ss:Width="${O}" ss:AutoFitWidth="0"/>`).join(""),R=h.rows.map(O=>{if(!O.length)return'<Row ss:Height="10" ss:StyleID="BorderRow"><Cell ss:StyleID="BorderCell"><Data ss:Type="String">&nbsp;</Data></Cell></Row>';const U=O[0]==="Type"||O[0]==="Summary"||O[0]==="Sales Summary"||O[0]==="Disbursement Summary"||O[0]==="Staff"||O[0]==="Date of Sales"||O[0]==="Date",F=U?"HeaderRow":"BorderRow",x=U?"HeaderCell":"BorderCell",q=U?26:22,k=O.map(M=>`<Cell ss:StyleID="${x}"><Data ss:Type="${typeof M=="number"?"Number":"String"}">${E(M)}</Data></Cell>`).join("");return`<Row ss:Height="${q}" ss:StyleID="${F}">${k}</Row>`}).join("");return`
        <Worksheet ss:Name="${E(h.name)}">
          <Table>
            ${C}
            ${R}
          </Table>
        </Worksheet>`}).join("")}
</Workbook>`},d=()=>{const b=he(),E=gt(e,t,a,r,n,s,b),p=[];E.selectedTypes.has("sales")&&p.push({name:"Sales Report",rows:E.salesRows().rows}),E.selectedTypes.has("disbursement")&&p.push({name:"Disbursement",rows:E.disbursementRows().rows}),E.selectedTypes.has("fold_count")&&p.push({name:"Fold Count",rows:E.foldCountRows().rows}),E.selectedTypes.has("revolving_fund")&&(p.push({name:"Revolving Daily Summary",rows:E.revolvingDailySummaryRows().rows}),p.push({name:"Revolving History",rows:E.revolvingHistoryRows().rows})),E.selectedTypes.has("summary")&&p.push({name:"Summary",rows:E.summaryRows()});const T=l(p.length?p:[{name:"Summary",rows:E.summaryRows()}]),h=`laba101-report-${b.from}-to-${b.to}.xls`;return new File([T],h,{type:"application/vnd.ms-excel"})},u=async()=>{const b=d();if(!A.isNativePlatform())return{fileName:b.name,uri:""};const E=await b.text(),p=b.name;await Xe.writeFile({path:p,data:E,directory:be.External,encoding:$e.UTF8});const{uri:T}=await Xe.getUri({path:p,directory:be.External});return{fileName:b.name,uri:T}},y=()=>{const b=d(),E=he(),p=`laba101-report-${E.from}-to-${E.to}.xls`,T=b,h=URL.createObjectURL(T),C=document.createElement("a");return C.href=h,C.download=p,document.body.appendChild(C),C.click(),setTimeout(()=>{C.remove(),URL.revokeObjectURL(h)},1e3),p},f=async b=>{const E=document.querySelector(b==="export"?"#export-report":"#email-report");E&&(E.disabled=!0,E.textContent=b==="export"?"Exporting...":"Sending...");try{if(b==="export")if(A.isNativePlatform()){const p=await u();alert(`Report exported as "${p.fileName}".`)}else{const p=y();alert(`Report saved: ${p}`)}else{const p=await ct("report_email")||"";if(!p){alert("Please configure a report email in Settings first.");return}const T=he(),h=`Laba101 report ${T.from} to ${T.to}`;if(A.isNativePlatform()){const C=await u();try{await _t.share({title:h,text:`Please find the attached Laba101 report file: ${C.fileName}`,files:[C.uri],dialogTitle:"Send report via email"}),alert(`Report saved and shared as "${C.fileName}".`)}catch(R){const O=String(R).toLowerCase();if(O.includes("share canceled")||O.includes("canceled"))alert(`Report saved as "${C.fileName}".`);else throw R}}else{const C=y(),R=`Hi,

Please find the attached Laba101 report file: ${C}

Date range: ${T.from} to ${T.to}`,O=`mailto:${p}?subject=${encodeURIComponent(h)}&body=${encodeURIComponent(R)}`;setTimeout(()=>{window.location.href=O},800),alert(`Report downloaded as "${C}".
Your email app will open — please attach the file and send.`)}}}catch(p){alert("Failed: "+String(p))}finally{E&&(E.disabled=!1,E.textContent=b==="export"?"Export Excel":"Send to Email")}};document.querySelector("#export-report")?.addEventListener("click",async()=>{await f("export")}),document.querySelector("#email-report")?.addEventListener("click",async()=>{await f("email")})}function vr(){document.querySelector("#order-queue-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);c.orderSearch=String(t.get("orderSearch")??"").trim(),c.orderDateFilter=String(t.get("orderDateFilter")??"").trim(),c.orderPaymentFilter=String(t.get("orderPaymentFilter")??"").trim(),S()}),document.querySelector("#order-queue-clear")?.addEventListener("click",()=>{c.orderSearch="",c.orderDateFilter="",c.orderPaymentFilter="",S()}),document.querySelector("#archived-order-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);c.archivedOrderSearch=String(t.get("archivedOrderSearch")??"").trim(),S()}),document.querySelector("#archived-order-clear")?.addEventListener("click",()=>{c.archivedOrderSearch="",S()})}function pr(){document.querySelector("#customer-search-form")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);c.customerSearch=String(t.get("customerSearch")??"").trim(),S()}),document.querySelector("#customer-search-clear")?.addEventListener("click",()=>{c.customerSearch="",S()})}function fr(){document.querySelector("#machine-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await $a({machineName:String(t.get("machineName")??""),machineType:String(t.get("machineType")),status:String(t.get("status")),branch:String(t.get("branch")??"")}),await S()}),document.querySelector("#subcleaning-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=e.currentTarget.querySelector('button[type="submit"]');t&&(t.disabled=!0,t.textContent="Starting...");const a=new FormData(e.currentTarget),r=a.getAll("machineIds").map(Number);if(!r.length){alert("Please select at least one machine to clean."),t&&(t.disabled=!1,t.textContent="Start Cleaning");return}await Da({date:String(a.get("date")??""),machineIds:r,cleaningStatus:String(a.get("cleaningStatus")??""),notes:String(a.get("notes")??""),branch:String(a.get("branch")??"")}),await S()}),document.querySelectorAll(".complete-cleaning-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.machineId),a=e.dataset.branch??"";e.disabled=!0,e.textContent="Completing...",await Pa(t,a),await S()})}),document.querySelectorAll(".deactivate-machine-btn, .activate-machine-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.id),a=e.classList.contains("deactivate-machine-btn");await Ra(t,a?"inactive":"available"),await S()})})}function yr(e){const t=document.querySelector("#add-staff-modal"),a=document.querySelector("#open-add-staff-modal"),r=document.querySelector("#close-add-staff-modal"),n=document.querySelector("#staff-form"),s=()=>{n?.reset(),n&&(n.querySelector("[name=id]").value="");const o=document.querySelector("#add-staff-title");o&&(o.textContent="Add staff member"),t?.removeAttribute("hidden")},i=()=>{t?.setAttribute("hidden",""),n?.reset()};a?.addEventListener("click",s),r?.addEventListener("click",i),t?.addEventListener("click",o=>{o.target===t&&i()}),document.querySelectorAll(".edit-staff-btn").forEach(o=>{o.addEventListener("click",()=>{const m=Number(o.dataset.id),l=e.find(d=>d.id===m);if(l&&n){n.querySelector("[name=id]").value=String(l.id),n.querySelector("[name=name]").value=l.name,n.querySelector("[name=email]").value=l.email,n.querySelector("[name=password]").value=l.password,n.querySelector("[name=role]").value=l.role,n.querySelector("[name=branch]").value=l.branch;const d=document.querySelector("#add-staff-title");d&&(d.textContent="Edit staff member"),t?.removeAttribute("hidden")}})}),document.querySelectorAll(".deactivate-staff-btn, .activate-staff-btn").forEach(o=>{o.addEventListener("click",async()=>{const m=Number(o.dataset.id),l=e.find(d=>d.id===m);l&&(await Ve(m,{isActive:l.isActive!==0?0:1}),await S())})}),n?.addEventListener("submit",async o=>{o.preventDefault();const m=document.querySelector("#staff-save-btn");m&&(m.disabled=!0,m.textContent="Saving...");const l=new FormData(n),d=l.get("id")?Number(l.get("id")):void 0,u=String(l.get("name")??"").trim(),y=String(l.get("email")??"").trim(),f=String(l.get("password")??"password")||"password",b=String(l.get("role")),E=String(l.get("branch")??"");if(!u||!y){alert("Name and email are required."),m&&(m.disabled=!1,m.textContent="Save staff member");return}try{d?await Ve(d,{name:u,email:y,password:f,role:b,branch:E}):await na({name:u,email:y,password:f,role:b,branch:E}),i(),await S()}catch{alert("Failed to save staff. The email may already be in use."),m&&(m.disabled=!1,m.textContent="Save staff member")}})}function hr(){document.querySelector("#settings-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await ge("branch",String(t.get("branch")??"Main Store")),await ge("fold_rate",String(t.get("foldRate")??"5")),String(t.get("reportEmail")??"")&&await ge("report_email",String(t.get("reportEmail"))),alert("Settings saved successfully!"),await S()})}await ta();const nt=localStorage.getItem(ve);if(nt)try{const e=JSON.parse(nt);if(e.email&&e.remembered){const t=await dt(e.email,"password")??null;c.currentUser=t}}catch{localStorage.removeItem(ve)}function gr(e,t,a,r){const n=e.filter(f=>f.status==="revolving").reduce((f,b)=>f+b.cashAmount,0),s=t.filter(f=>f.type==="add").reduce((f,b)=>f+b.amount,0),i=t.filter(f=>f.type==="disbursement").reduce((f,b)=>f+b.amount,0),o=n+s-i,m=c.revolvingHistoryFrom||"0000-01-01",l=c.revolvingHistoryTo||"9999-12-31",d=t.filter(f=>{const b=j(f.createdAt);return b>=m&&b<=l}),u=e.map(f=>{const b=ht(f.saleDate,a,r,f.cashAmount),E=f.status==="revolving"?'<span class="ok">Revolving</span>':f.status==="endorsed"?`<span class="warn">Endorsed to ${v(f.endorsedTo)}</span>`:'<span class="meta">Pending</span>',p=f.status!=="revolving"&&f.status!=="endorsed"?`<div class="row-actions">
          <button class="primary revolving-btn" data-id="${f.id}">Revolving</button>
          <button class="secondary endorsed-btn" data-id="${f.id}" data-date="${re(f.saleDate)}">Endorsed</button>
        </div>`:"";return[`<strong>${v(re(f.saleDate))}</strong>`,`<strong class="ok">${$(b)}</strong>`,E,f.statusUpdatedAt?v(re(f.statusUpdatedAt)):"-",p]}),y=d.map(f=>[qa(f.createdAt),`<strong>${v(f.revolvingNumber)}</strong>`,v(f.name),`<strong class="${f.type==="disbursement"?"warn":"ok"}">${f.type==="disbursement"?"-":"+"}${$(f.amount)}</strong>`,v(f.category),v(f.description||"-"),`<span class="${f.type==="add"?"ok":"warn"}">${f.type==="add"?"Add Revolving Fund":"Disbursement"}</span>`]);return`
    <section class="grid content full">
      <div class="panel-header" style="display: flex; gap: 16px; margin-bottom: 24px; align-items: center;">
        <button class="primary" id="add-revolving-fund-btn">Add Revolving Fund</button>
        <button class="secondary" id="revolving-disbursement-btn">Disbursement</button>
      </div>

      <article class="panel">
        <div style="background-color: #061a42; color: white; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
          <p style="font-size: 12px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin: 0 0 8px 0;">Revolving Fund Total</p>
          <p style="font-size: 32px; font-weight: 800; margin: 0;">${$(o)}</p>
        </div>
        ${P("Daily Summary","Cash on hand per day (order cash + manual cash − disbursements)")}
        ${we(["Date of Sales","Cash on Hand","Status","Date Update","Action"],u,"data-table revolving-summary-datatable")}
      </article>

      <article class="panel">
        ${P("Revolving Table History","Filter by date — DISB numbers shared with Daily Report expenses")}
        <form id="revolving-history-filters" class="form revolving-history-filters">
          <div class="form-row">
            <label>From<input name="revolvingHistoryFrom" type="date" value="${c.revolvingHistoryFrom}" /></label>
            <label>To<input name="revolvingHistoryTo" type="date" value="${c.revolvingHistoryTo}" /></label>
          </div>
          <div class="row-actions">
            <button class="primary" type="submit">Apply filter</button>
            <button class="secondary" type="button" id="revolving-history-clear">Clear</button>
          </div>
        </form>
        ${we(["Date","Disbursement #","Name","Amount","Category","Description","Type"],y,"data-table revolving-history-datatable")}
      </article>

      ${c.endorseModalOpen?`
        <div class="modal-backdrop" role="presentation">
          <div class="receipt-modal" role="dialog" aria-modal="true" style="max-width: 400px; width: 90%;">
            <form id="endorse-form" class="form" style="padding: 24px;">
              <h3 style="margin-top: 0;">Endorse Money</h3>
              <p class="meta" style="margin-bottom: 16px;">Endorsing cash from <strong>${v(c.endorseSaleDate)}</strong>.</p>
              <label>Endorsed to (Name)<input name="endorsedTo" type="text" placeholder="Enter name" required /></label>
              <div class="modal-actions" style="margin-top: 24px; padding: 0;">
                <button class="primary" type="submit">Submit Endorsement</button>
                <button class="secondary" type="button" id="close-endorse-modal">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      `:""}

      ${c.revolvingModalOpen?`
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

      ${c.addFundModalOpen?`
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

      ${c.disbursementModalOpen?`
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
  `}function br(){document.querySelector("#revolving-history-filters")?.addEventListener("submit",async d=>{d.preventDefault();const u=new FormData(d.currentTarget);c.revolvingHistoryFrom=String(u.get("revolvingHistoryFrom")??"").trim(),c.revolvingHistoryTo=String(u.get("revolvingHistoryTo")??"").trim(),await S()}),document.querySelector("#revolving-history-clear")?.addEventListener("click",async()=>{c.revolvingHistoryFrom="",c.revolvingHistoryTo="",await S()}),document.querySelectorAll(".revolving-btn").forEach(d=>{d.addEventListener("click",async()=>{c.revolvingModalOpen=!0,c.revolvingSaleId=Number(d.dataset.id),await S()})});const e=document.getElementById("confirm-revolving-btn");e&&e.addEventListener("click",async()=>{await Je(c.revolvingSaleId,"revolving",null,new Date().toISOString()),c.revolvingModalOpen=!1,await S()});const t=document.getElementById("close-revolving-modal");t&&t.addEventListener("click",async()=>{c.revolvingModalOpen=!1,await S()}),document.querySelectorAll(".endorsed-btn").forEach(d=>{d.addEventListener("click",async()=>{c.endorseModalOpen=!0,c.endorseSaleId=Number(d.dataset.id),c.endorseSaleDate=d.dataset.date??"",await S()})});const a=document.getElementById("close-endorse-modal");a&&a.addEventListener("click",async()=>{c.endorseModalOpen=!1,await S()});const r=document.getElementById("endorse-form");r&&r.addEventListener("submit",async d=>{d.preventDefault();const u=new FormData(r),y=String(u.get("endorsedTo")??"").trim();y&&(await Je(c.endorseSaleId,"endorsed",y,new Date().toISOString()),c.endorseModalOpen=!1,await S())});const n=document.getElementById("add-revolving-fund-btn");n&&n.addEventListener("click",async()=>{c.addFundModalOpen=!0,await S()});const s=document.getElementById("close-add-fund-modal");s&&s.addEventListener("click",async()=>{c.addFundModalOpen=!1,await S()});const i=document.getElementById("add-fund-form");i&&i.addEventListener("submit",async d=>{d.preventDefault();const u=new FormData(i);await ze({name:String(u.get("name")??"").trim(),amount:Number(u.get("amount")??0),category:"Add Revolving Fund",description:null,type:"add",createdAt:new Date().toISOString()}),c.addFundModalOpen=!1,await S()});const o=document.getElementById("revolving-disbursement-btn");o&&o.addEventListener("click",async()=>{c.disbursementModalOpen=!0,await S()});const m=document.getElementById("close-disbursement-modal");m&&m.addEventListener("click",async()=>{c.disbursementModalOpen=!1,await S()});const l=document.getElementById("disbursement-form");l&&l.addEventListener("submit",async d=>{d.preventDefault();const u=new FormData(l);await ze({name:String(u.get("name")??"").trim(),amount:Number(u.get("amount")??0),category:String(u.get("category")??"").trim(),description:String(u.get("description")??"").trim(),type:"disbursement",expenseDate:W(),createdAt:new Date().toISOString()}),c.disbursementModalOpen=!1,await S()})}await S();export{$e as E,De as W,Pt as b};
