(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();var ue;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(ue||(ue={}));class Ie extends Error{constructor(t,n,a){super(t),this.message=t,this.code=n,this.data=a}}const kt=e=>{var t,n;return e?.androidBridge?"android":!((n=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||n===void 0)&&n.bridge?"ios":"web"},Mt=e=>{const t=e.CapacitorCustomPlatform||null,n=e.Capacitor||{},a=n.Plugins=n.Plugins||{},s=()=>t!==null?t.name:kt(e),r=()=>s()!=="web",i=v=>{const f=d.get(v);return!!(f?.platforms.has(s())||o(v))},o=v=>{var f;return(f=n.PluginHeaders)===null||f===void 0?void 0:f.find(y=>y.name===v)},c=v=>e.console.error(v),d=new Map,u=(v,f={})=>{const y=d.get(v);if(y)return console.warn(`Capacitor plugin "${v}" already registered. Cannot register plugins twice.`),y.proxy;const N=s(),A=o(v);let g;const R=async()=>(!g&&N in f?g=typeof f[N]=="function"?g=await f[N]():g=f[N]:t!==null&&!g&&"web"in f&&(g=typeof f.web=="function"?g=await f.web():g=f.web),g),p=(D,I)=>{var k,M;if(A){const B=A?.methods.find(W=>I===W.name);if(B)return B.rtype==="promise"?W=>n.nativePromise(v,I.toString(),W):(W,ge)=>n.nativeCallback(v,I.toString(),W,ge);if(D)return(k=D[I])===null||k===void 0?void 0:k.bind(D)}else{if(D)return(M=D[I])===null||M===void 0?void 0:M.bind(D);throw new Ie(`"${v}" plugin is not implemented on ${N}`,ue.Unimplemented)}},b=D=>{let I;const k=(...M)=>{const B=R().then(W=>{const ge=p(W,D);if(ge){const h=ge(...M);return I=h?.remove,h}else throw new Ie(`"${v}.${D}()" is not implemented on ${N}`,ue.Unimplemented)});return D==="addListener"&&(B.remove=async()=>I()),B};return k.toString=()=>`${D.toString()}() { [capacitor code] }`,Object.defineProperty(k,"name",{value:D,writable:!1,configurable:!1}),k},E=b("addListener"),P=b("removeListener"),$=(D,I)=>{const k=E({eventName:D},I),M=async()=>{const W=await k;P({eventName:D,callbackId:W},I)},B=new Promise(W=>k.then(()=>W({remove:M})));return B.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await M()},B},x=new Proxy({},{get(D,I){switch(I){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return A?$:E;case"removeListener":return P;default:return b(I)}}});return a[v]=x,d.set(v,{name:v,proxy:x,platforms:new Set([...Object.keys(f),...A?[N]:[]])}),x};return n.convertFileSrc||(n.convertFileSrc=v=>v),n.getPlatform=s,n.handleError=c,n.isNativePlatform=r,n.isPluginAvailable=i,n.registerPlugin=u,n.Exception=Ie,n.DEBUG=!!n.DEBUG,n.isLoggingEnabled=!!n.isLoggingEnabled,n},Bt=e=>e.Capacitor=Mt(e),C=Bt(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),ce=C.registerPlugin;class _e{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,n){let a=!1;this.listeners[t]||(this.listeners[t]=[],a=!0),this.listeners[t].push(n);const r=this.windowListeners[t];r&&!r.registered&&this.addWindowListener(r),a&&this.sendRetainedArgumentsForEvent(t);const i=async()=>this.removeListener(t,n);return Promise.resolve({remove:i})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,n,a){const s=this.listeners[t];if(!s){if(a){let r=this.retainedEventArguments[t];r||(r=[]),r.push(n),this.retainedEventArguments[t]=r}return}s.forEach(r=>r(n))}hasListeners(t){var n;return!!(!((n=this.listeners[t])===null||n===void 0)&&n.length)}registerWindowListener(t,n){this.windowListeners[n]={registered:!1,windowEventName:t,pluginEventName:n,handler:a=>{this.notifyListeners(n,a)}}}unimplemented(t="not implemented"){return new C.Exception(t,ue.Unimplemented)}unavailable(t="not available"){return new C.Exception(t,ue.Unavailable)}async removeListener(t,n){const a=this.listeners[t];if(!a)return;const s=a.indexOf(n);this.listeners[t].splice(s,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const n=this.retainedEventArguments[t];n&&(delete this.retainedEventArguments[t],n.forEach(a=>{this.notifyListeners(t,a)}))}}const Je=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),ze=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class _t extends _e{async getCookies(){const t=document.cookie,n={};return t.split(";").forEach(a=>{if(a.length<=0)return;let[s,r]=a.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=ze(s).trim(),r=ze(r).trim(),n[s]=r}),n}async setCookie(t){try{const n=Je(t.key),a=Je(t.value),s=t.expires?`; expires=${t.expires.replace("expires=","")}`:"",r=(t.path||"/").replace("path=",""),i=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${n}=${a||""}${s}; path=${r}; ${i};`}catch(n){return Promise.reject(n)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(n){return Promise.reject(n)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const n of t)document.cookie=n.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}ce("CapacitorCookies",{web:()=>new _t});const jt=async e=>new Promise((t,n)=>{const a=new FileReader;a.onload=()=>{const s=a.result;t(s.indexOf(",")>=0?s.split(",")[1]:s)},a.onerror=s=>n(s),a.readAsDataURL(e)}),Ht=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(s=>s.toLocaleLowerCase()).reduce((s,r,i)=>(s[r]=e[t[i]],s),{})},Wt=(e,t=!0)=>e?Object.entries(e).reduce((a,s)=>{const[r,i]=s;let o,c;return Array.isArray(i)?(c="",i.forEach(d=>{o=t?encodeURIComponent(d):d,c+=`${r}=${o}&`}),c.slice(0,-1)):(o=t?encodeURIComponent(i):i,c=`${r}=${o}`),`${a}&${c}`},"").substr(1):null,Xt=(e,t={})=>{const n=Object.assign({method:e.method||"GET",headers:e.headers},t),s=Ht(e.headers)["content-type"]||"";if(typeof e.data=="string")n.body=e.data;else if(s.includes("application/x-www-form-urlencoded")){const r=new URLSearchParams;for(const[i,o]of Object.entries(e.data||{}))r.set(i,o);n.body=r.toString()}else if(s.includes("multipart/form-data")||e.data instanceof FormData){const r=new FormData;if(e.data instanceof FormData)e.data.forEach((o,c)=>{r.append(c,o)});else for(const o of Object.keys(e.data))r.append(o,e.data[o]);n.body=r;const i=new Headers(n.headers);i.delete("content-type"),n.headers=i}else(s.includes("application/json")||typeof e.data=="object")&&(n.body=JSON.stringify(e.data));return n};class Kt extends _e{async request(t){const n=Xt(t,t.webFetchExtra),a=Wt(t.params,t.shouldEncodeUrlParams),s=a?`${t.url}?${a}`:t.url,r=await fetch(s,n),i=r.headers.get("content-type")||"";let{responseType:o="text"}=r.ok?t:{};i.includes("application/json")&&(o="json");let c,d;switch(o){case"arraybuffer":case"blob":d=await r.blob(),c=await jt(d);break;case"json":c=await r.json();break;default:c=await r.text()}const u={};return r.headers.forEach((v,f)=>{u[f]=v}),{data:c,headers:u,status:r.status,url:r.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}ce("CapacitorHttp",{web:()=>new Kt});var Ze;(function(e){e.Dark="DARK",e.Light="LIGHT",e.Default="DEFAULT"})(Ze||(Ze={}));var et;(function(e){e.StatusBar="StatusBar",e.NavigationBar="NavigationBar"})(et||(et={}));class Gt extends _e{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}ce("SystemBars",{web:()=>new Gt});const Vt="modulepreload",Yt=function(e){return"/"+e},tt={},je=function(t,n,a){let s=Promise.resolve();if(n&&n.length>0){let c=function(d){return Promise.all(d.map(u=>Promise.resolve(u).then(v=>({status:"fulfilled",value:v}),v=>({status:"rejected",reason:v}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),o=i?.nonce||i?.getAttribute("nonce");s=c(n.map(d=>{if(d=Yt(d),d in tt)return;tt[d]=!0;const u=d.endsWith(".css"),v=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${v}`))return;const f=document.createElement("link");if(f.rel=u?"stylesheet":Vt,u||(f.as="script"),f.crossOrigin="",f.href=d,o&&f.setAttribute("nonce",o),document.head.appendChild(f),u)return new Promise((y,N)=>{f.addEventListener("load",y),f.addEventListener("error",()=>N(new Error(`Unable to preload CSS for ${d}`)))})}))}function r(i){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=i,window.dispatchEvent(o),!o.defaultPrevented)throw i}return s.then(i=>{for(const o of i||[])o.status==="rejected"&&r(o.reason);return t().catch(r)})};function Qt(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,n){return new Proxy({},{get(a,s){return(r,i,o)=>{const c=e.Capacitor.Plugins[n];if(c===void 0){o(new Error(`Capacitor plugin ${n} not found`));return}if(typeof c[s]!="function"){o(new Error(`Method ${s} not found in Capacitor plugin ${n}`));return}(async()=>{try{const d=await c[s](r);i(d)}catch(d){o(d)}})()}}})}})}function Jt(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,n){return e.cordova.plugins[n]}})}function zt(e=!1){typeof window>"u"||(window.CapacitorUtils=window.CapacitorUtils||{},window.Capacitor!==void 0&&!e?Qt(window):window.cordova!==void 0&&Jt(window))}var Le;(function(e){e.Documents="DOCUMENTS",e.Data="DATA",e.Library="LIBRARY",e.Cache="CACHE",e.External="EXTERNAL",e.ExternalStorage="EXTERNAL_STORAGE",e.ExternalCache="EXTERNAL_CACHE",e.LibraryNoCloud="LIBRARY_NO_CLOUD",e.Temporary="TEMPORARY"})(Le||(Le={}));var ke;(function(e){e.UTF8="utf8",e.ASCII="ascii",e.UTF16="utf16"})(ke||(ke={}));const at=ce("Filesystem",{web:()=>je(()=>import("./web-CBO2rUFI.js"),[]).then(e=>new e.FilesystemWeb)});zt();const Zt=ce("Share",{web:()=>je(()=>import("./web-JS1I044D.js"),[]).then(e=>new e.ShareWeb)});class ea{constructor(t){this.sqlite=t,this._connectionDict=new Map}async initWebStore(){try{return await this.sqlite.initWebStore(),Promise.resolve()}catch(t){return Promise.reject(t)}}async saveToStore(t){try{return await this.sqlite.saveToStore({database:t}),Promise.resolve()}catch(n){return Promise.reject(n)}}async saveToLocalDisk(t){try{return await this.sqlite.saveToLocalDisk({database:t}),Promise.resolve()}catch(n){return Promise.reject(n)}}async getFromLocalDiskToStore(t){const n=t??!0;try{return await this.sqlite.getFromLocalDiskToStore({overwrite:n}),Promise.resolve()}catch(a){return Promise.reject(a)}}async echo(t){try{const n=await this.sqlite.echo({value:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async isSecretStored(){try{const t=await this.sqlite.isSecretStored();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async setEncryptionSecret(t){try{return await this.sqlite.setEncryptionSecret({passphrase:t}),Promise.resolve()}catch(n){return Promise.reject(n)}}async changeEncryptionSecret(t,n){try{return await this.sqlite.changeEncryptionSecret({passphrase:t,oldpassphrase:n}),Promise.resolve()}catch(a){return Promise.reject(a)}}async clearEncryptionSecret(){try{return await this.sqlite.clearEncryptionSecret(),Promise.resolve()}catch(t){return Promise.reject(t)}}async checkEncryptionSecret(t){try{const n=await this.sqlite.checkEncryptionSecret({passphrase:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async addUpgradeStatement(t,n){try{return t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.addUpgradeStatement({database:t,upgrade:n}),Promise.resolve()}catch(a){return Promise.reject(a)}}async createConnection(t,n,a,s,r){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.createConnection({database:t,encrypted:n,mode:a,version:s,readonly:r});const i=new nt(t,r,this.sqlite),o=r?`RO_${t}`:`RW_${t}`;return this._connectionDict.set(o,i),Promise.resolve(i)}catch(i){return Promise.reject(i)}}async closeConnection(t,n){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.closeConnection({database:t,readonly:n});const a=n?`RO_${t}`:`RW_${t}`;return this._connectionDict.delete(a),Promise.resolve()}catch(a){return Promise.reject(a)}}async isConnection(t,n){const a={};t.endsWith(".db")&&(t=t.slice(0,-3));const s=n?`RO_${t}`:`RW_${t}`;return a.result=this._connectionDict.has(s),Promise.resolve(a)}async retrieveConnection(t,n){t.endsWith(".db")&&(t=t.slice(0,-3));const a=n?`RO_${t}`:`RW_${t}`;if(this._connectionDict.has(a)){const s=this._connectionDict.get(a);return typeof s<"u"?Promise.resolve(s):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async getNCDatabasePath(t,n){try{const a=await this.sqlite.getNCDatabasePath({path:t,database:n});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async createNCConnection(t,n){try{await this.sqlite.createNCConnection({databasePath:t,version:n});const a=new nt(t,!0,this.sqlite),s=`RO_${t})`;return this._connectionDict.set(s,a),Promise.resolve(a)}catch(a){return Promise.reject(a)}}async closeNCConnection(t){try{await this.sqlite.closeNCConnection({databasePath:t});const n=`RO_${t})`;return this._connectionDict.delete(n),Promise.resolve()}catch(n){return Promise.reject(n)}}async isNCConnection(t){const n={},a=`RO_${t})`;return n.result=this._connectionDict.has(a),Promise.resolve(n)}async retrieveNCConnection(t){if(this._connectionDict.has(t)){const n=`RO_${t})`,a=this._connectionDict.get(n);return typeof a<"u"?Promise.resolve(a):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async isNCDatabase(t){try{const n=await this.sqlite.isNCDatabase({databasePath:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async retrieveAllConnections(){return this._connectionDict}async closeAllConnections(){const t=new Map;try{for(const n of this._connectionDict.keys()){const a=n.substring(3),s=n.substring(0,3)==="RO_";await this.sqlite.closeConnection({database:a,readonly:s}),t.set(n,null)}for(const n of t.keys())this._connectionDict.delete(n);return Promise.resolve()}catch(n){return Promise.reject(n)}}async checkConnectionsConsistency(){try{const t=[...this._connectionDict.keys()],n=[],a=[];for(const r of t)n.push(r.substring(0,2)),a.push(r.substring(3));const s=await this.sqlite.checkConnectionsConsistency({dbNames:a,openModes:n});return s.result||(this._connectionDict=new Map),Promise.resolve(s)}catch(t){return this._connectionDict=new Map,Promise.reject(t)}}async importFromJson(t){try{const n=await this.sqlite.importFromJson({jsonstring:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async isJsonValid(t){try{const n=await this.sqlite.isJsonValid({jsonstring:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async copyFromAssets(t){const n=t??!0;try{return await this.sqlite.copyFromAssets({overwrite:n}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getFromHTTPRequest(t,n){const a=n??!0;try{return await this.sqlite.getFromHTTPRequest({url:t,overwrite:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async isDatabaseEncrypted(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const n=await this.sqlite.isDatabaseEncrypted({database:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async isInConfigEncryption(){try{const t=await this.sqlite.isInConfigEncryption();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isInConfigBiometricAuth(){try{const t=await this.sqlite.isInConfigBiometricAuth();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isDatabase(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const n=await this.sqlite.isDatabase({database:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async getDatabaseList(){try{const n=(await this.sqlite.getDatabaseList()).values;n.sort();const a={values:n};return Promise.resolve(a)}catch(t){return Promise.reject(t)}}async getMigratableDbList(t){const n=t||"default";try{const a=await this.sqlite.getMigratableDbList({folderPath:n});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async addSQLiteSuffix(t,n){const a=t||"default",s=n||[];try{const r=await this.sqlite.addSQLiteSuffix({folderPath:a,dbNameList:s});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async deleteOldDatabases(t,n){const a=t||"default",s=n||[];try{const r=await this.sqlite.deleteOldDatabases({folderPath:a,dbNameList:s});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async moveDatabasesAndAddSuffix(t,n){const a=t||"default",s=n||[];return this.sqlite.moveDatabasesAndAddSuffix({folderPath:a,dbNameList:s})}}class nt{constructor(t,n,a){this.dbName=t,this.readonly=n,this.sqlite=a}getConnectionDBName(){return this.dbName}getConnectionReadOnly(){return this.readonly}async open(){try{return await this.sqlite.open({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async close(){try{return await this.sqlite.close({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async beginTransaction(){try{const t=await this.sqlite.beginTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async commitTransaction(){try{const t=await this.sqlite.commitTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async rollbackTransaction(){try{const t=await this.sqlite.rollbackTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTransactionActive(){try{const t=await this.sqlite.isTransactionActive({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async loadExtension(t){try{return await this.sqlite.loadExtension({database:this.dbName,path:t,readonly:this.readonly}),Promise.resolve()}catch(n){return Promise.reject(n)}}async enableLoadExtension(t){try{return await this.sqlite.enableLoadExtension({database:this.dbName,toggle:t,readonly:this.readonly}),Promise.resolve()}catch(n){return Promise.reject(n)}}async getUrl(){try{const t=await this.sqlite.getUrl({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getVersion(){try{const t=await this.sqlite.getVersion({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getTableList(){try{const t=await this.sqlite.getTableList({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async execute(t,n=!0,a=!0){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const s=await this.sqlite.execute({database:this.dbName,statements:t,transaction:n,readonly:!1,isSQL92:a});return Promise.resolve(s)}}catch(s){return Promise.reject(s)}}async query(t,n,a=!0){let s;try{return n&&n.length>0?s=await this.sqlite.query({database:this.dbName,statement:t,values:n,readonly:this.readonly,isSQL92:!0}):s=await this.sqlite.query({database:this.dbName,statement:t,values:[],readonly:this.readonly,isSQL92:a}),s=await this.reorderRows(s),Promise.resolve(s)}catch(r){return Promise.reject(r)}}async run(t,n,a=!0,s="no",r=!0){let i;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(n&&n.length>0?i=await this.sqlite.run({database:this.dbName,statement:t,values:n,transaction:a,readonly:!1,returnMode:s,isSQL92:!0}):i=await this.sqlite.run({database:this.dbName,statement:t,values:[],transaction:a,readonly:!1,returnMode:s,isSQL92:r}),i.changes=await this.reorderRows(i.changes),Promise.resolve(i))}catch(o){return Promise.reject(o)}}async executeSet(t,n=!0,a="no",s=!0){let r;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(r=await this.sqlite.executeSet({database:this.dbName,set:t,transaction:n,readonly:!1,returnMode:a,isSQL92:s}),r.changes=await this.reorderRows(r.changes),Promise.resolve(r))}catch(i){return Promise.reject(i)}}async isExists(){try{const t=await this.sqlite.isDBExists({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTable(t){try{const n=await this.sqlite.isTableExists({database:this.dbName,table:t,readonly:this.readonly});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async isDBOpen(){try{const t=await this.sqlite.isDBOpen({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async delete(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteDatabase({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async createSyncTable(){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const t=await this.sqlite.createSyncTable({database:this.dbName,readonly:!1});return Promise.resolve(t)}}catch(t){return Promise.reject(t)}}async setSyncDate(t){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.setSyncDate({database:this.dbName,syncdate:t,readonly:!1}),Promise.resolve())}catch(n){return Promise.reject(n)}}async getSyncDate(){try{const t=await this.sqlite.getSyncDate({database:this.dbName,readonly:this.readonly});let n="";return t.syncDate>0&&(n=new Date(t.syncDate*1e3).toISOString()),Promise.resolve(n)}catch(t){return Promise.reject(t)}}async exportToJson(t,n=!1){try{const a=await this.sqlite.exportToJson({database:this.dbName,jsonexportmode:t,readonly:this.readonly,encrypted:n});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async deleteExportedRows(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteExportedRows({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async executeTransaction(t,n=!0){let a=0,s=!1;if(this.readonly)return Promise.reject("not allowed in read-only mode");if(await this.sqlite.beginTransaction({database:this.dbName}),s=await this.sqlite.isTransactionActive({database:this.dbName}),!s)return Promise.reject("After Begin Transaction, no transaction active");try{for(const o of t){if(typeof o!="object"||!("statement"in o))throw new Error("Error a task.statement must be provided");if("values"in o&&o.values&&o.values.length>0){const c=o.statement.toUpperCase().includes("RETURNING")?"all":"no",d=await this.sqlite.run({database:this.dbName,statement:o.statement,values:o.values,transaction:!1,readonly:!1,returnMode:c,isSQL92:n});if(d.changes.changes<0)throw new Error("Error in transaction method run ");a+=d.changes.changes}else{const c=await this.sqlite.execute({database:this.dbName,statements:o.statement,transaction:!1,readonly:!1});if(c.changes.changes<0)throw new Error("Error in transaction method execute ");a+=c.changes.changes}}const r=await this.sqlite.commitTransaction({database:this.dbName});a+=r.changes.changes;const i={changes:{changes:a}};return Promise.resolve(i)}catch(r){const i=r.message?r.message:r;return await this.sqlite.rollbackTransaction({database:this.dbName}),Promise.reject(i)}}async reorderRows(t){const n=t;if(t?.values&&typeof t.values[0]=="object"&&Object.keys(t.values[0]).includes("ios_columns")){const a=t.values[0].ios_columns,s=[];for(let r=1;r<t.values.length;r++){const i=t.values[r],o={};for(const c of a)o[c]=i[c];s.push(o)}n.values=s}return Promise.resolve(n)}}const ta=ce("CapacitorSQLite",{web:()=>je(()=>import("./web-pTzPUlw2.js"),[]).then(e=>new e.CapacitorSQLiteWeb),electron:()=>window.CapacitorCustomPlatform.plugins.CapacitorSQLite});function aa(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}const na="laba101_offline",$e="fresh_start_reset_v1",sa=new ea(ta);let Se=null;const Q=[{id:1,name:"Laba101 Admin",email:"admin@laba101.test",password:"password",role:"admin",branch:"Main Store"},{id:2,name:"Gensan Branch Staff",email:"staff@laba101.gensan",password:"password",role:"staff",branch:"Gensan Branch"}],Ce=[],Z=[G(1,"Drop-off","P185. Includes wash, dry, and fold.","Drop-Off","order",185,8,40,["Wash","Dry","Fold"],0,24),G(2,"Full Service","P200. Wash, Fabcon, detergent, dry, and fold.","Full Service","order",200,8,40,["Wash","Dry","Fold","Detergent","Fabcon"],0,24),G(3,"Self Service Wash","P60. Self-service wash (max 8kg per load).","Self Service","order",60,8,null,["Wash"],0,1),G(4,"Self Service Dry","P70. Self-service dry (40 mins).","Self Service","order",70,8,40,["Dry"],0,1),G(6,"Dry 10 mins","Additional drying time (10 mins).","Add-on","addon",30,8,10,["Dry"],0,1),G(7,"Dry 20 mins","Additional drying time (20 mins).","Add-on","addon",50,8,20,["Dry"],0,1),G(8,"Dry 40 mins","Additional drying time (40 mins).","Add-on","addon",70,8,40,["Dry"],0,1),G(9,"Additional Zonrox","Extra Zonrox bleach add-on per load.","Add-on","addon",10,0,null,["Zonrox"],0,0),G(10,"Additional Fabcon","Extra Fabcon fabric conditioner add-on per load.","Add-on","addon",10,0,null,["Fabcon"],0,0),G(11,"Additional Finishing","Extra finishing spray add-on per load.","Add-on","addon",20,0,null,["Finishing"],0,0)],se=[{id:1,name:"Regular Clothes",maxKg:8,additionalFee:0,isActive:1},{id:2,name:"Comforter",maxKg:4,additionalFee:0,isActive:1},{id:3,name:"Thin Blankets",maxKg:6,additionalFee:0,isActive:1},{id:4,name:"Bedsheets",maxKg:6,additionalFee:0,isActive:1},{id:5,name:"Bath Towels",maxKg:6,additionalFee:0,isActive:1},{id:6,name:"Curtains",maxKg:6,additionalFee:0,isActive:1}];function st(e,t){const n=L(e,[]),a=new Map(n.map(r=>[r.id,r])),s=t.map(r=>{const i=a.get(r.id);return i?{...r,...i,isActive:i.isActive??r.isActive}:r});(n.length!==s.length||s.some((r,i)=>r.id!==n[i]?.id||JSON.stringify(r)!==JSON.stringify(n[i])))&&w(e,s)}async function ra(){st("services",Z),st("item_categories",se)}async function xe(e){for(const t of Z)((await e.query("SELECT id FROM laundry_services WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive,t.id]):await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive]);for(const t of se)((await e.query("SELECT id FROM item_categories WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.maxKg,t.additionalFee,t.isActive,t.id]):await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[t.id,t.name,t.maxKg,t.additionalFee,t.isActive])}const re=[],me=[],ie=[],ve=[],pe=[],ee=[...[1,2,3,4].map(e=>({id:e,machineName:`Washer ${e}`,machineType:"washer",status:"available",branch:"Main Store"})),...[1,2,3,4].map(e=>({id:e+4,machineName:`Dryer ${e}`,machineType:"dryer",status:"available",branch:"Main Store"}))],ye=[{key:"branch",value:"Main Store"},{key:"fold_rate",value:"5"},{key:"report_email",value:"admin@laba101.test"}];function G(e,t,n,a,s,r,i,o,c,d,u){return{id:e,name:t,description:n,category:a,serviceType:s,price:r,maxKg:i,dryingMinutes:o,includes:c,additionalCharge:d,turnaroundHours:u,isActive:1}}function X(e){return`laba101-mobile-${e}`}function L(e,t){const n=localStorage.getItem(X(e));if(!n)return structuredClone(t);try{return JSON.parse(n)}catch{return structuredClone(t)}}function w(e,t){localStorage.setItem(X(e),JSON.stringify(t))}function H(e){return e.reduce((t,n)=>Math.max(t,n.id),0)+1}function K(){return new Date().toISOString()}function Re(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${a}`}function ia(){return Re().slice(2).replaceAll("-","")}function J(e,t){if(!e)return t;try{return JSON.parse(e)}catch{return t}}async function O(){return Se||(Se=await sa.createConnection(na,!1,"no-encryption",1,!1),await Se.open()),Se}async function U(e,t,n,a){((await e.query(`PRAGMA table_info(${t})`)).values??[]).some(i=>i.name===n)||await e.execute(`ALTER TABLE ${t} ADD COLUMN ${n} ${a}`)}function oa(){const e=L("staff",Q),t=new Map(e.map(a=>[a.id,a]));let n=!1;for(const a of Q){const s=t.get(a.id);if(!s){t.set(a.id,{...a,isActive:1}),n=!0;continue}const r={...s,name:a.name,email:a.email,password:a.password,role:a.role,branch:a.branch,isActive:1};JSON.stringify(r)!==JSON.stringify(s)&&(t.set(a.id,r),n=!0)}n&&w("staff",Array.from(t.values()).sort((a,s)=>a.id-s.id))}async function ca(){localStorage.getItem(X($e))||(w("staff",Q),w("customers",[]),w("orders",[]),w("payments",[]),w("fold_logs",[]),w("expenses",[]),w("sales",[]),localStorage.getItem(X("services"))||w("services",Z),localStorage.getItem(X("item_categories"))||w("item_categories",se),localStorage.getItem(X("machines"))||w("machines",ee),localStorage.getItem(X("subcleanings"))||w("subcleanings",[]),localStorage.getItem(X("settings"))||w("settings",ye),localStorage.removeItem("laba101-mobile-session"),w($e,!0))}async function ft(e){for(const t of Q){if(((await e.query("SELECT id FROM staff WHERE id = ?",[t.id])).values??[]).length>0){await e.run("UPDATE staff SET name = ?, email = ?, password = ?, role = ?, branch = ?, isActive = 1 WHERE id = ?",[t.name,t.email,t.password,t.role,t.branch,t.id]);continue}await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.email,t.password,t.role,t.branch,1])}}async function da(e){if(!(((await e.query("SELECT COUNT(*) as count FROM machines")).values?.[0]?.count??0)>0))for(const n of ee)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[n.id,n.machineName,n.machineType,n.status,n.branch])}async function la(e){for(const t of ye)await e.run("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)",[t.key,t.value])}async function ht(e){for(const t of Z)((await e.query("SELECT id FROM laundry_services WHERE id = ?",[t.id])).values??[]).length>0||await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive]);for(const t of se)((await e.query("SELECT id FROM item_categories WHERE id = ?",[t.id])).values??[]).length>0||await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[t.id,t.name,t.maxKg,t.additionalFee,t.isActive])}async function ua(e){((await e.query("SELECT value FROM settings WHERE key = ?",[$e])).values??[]).length>0||(await e.execute(`
    DELETE FROM payments;
    DELETE FROM orders;
    DELETE FROM customers;
    DELETE FROM fold_logs;
    DELETE FROM disbursement_expenses;
    DELETE FROM daily_sales;
    DELETE FROM revolving_history;
    DELETE FROM staff WHERE id NOT IN (1, 2);
  `),await ft(e),await ht(e),await da(e),await la(e),await e.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",[$e,K()]),localStorage.removeItem("laba101-mobile-session"))}async function ma(){if(!C.isNativePlatform()){await ca(),!localStorage.getItem(X("seeded_v4"))&&!localStorage.getItem(X("services"))&&!localStorage.getItem(X("staff"))&&(w("staff",Q),w("customers",Ce),w("services",Z),w("item_categories",se),w("orders",re),w("payments",me),w("fold_logs",[]),w("expenses",ie),w("sales",ve),w("revolving_history",pe),w("machines",ee),w("subcleanings",[]),w("settings",ye),w("seeded_v4",!0)),await ra(),oa(),localStorage.getItem(X("seeded_v4"))||w("seeded_v4",!0);return}const e=await O();await e.execute(`
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
      foldedByStaffIds TEXT,
      releasedBy INTEGER,
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
    CREATE TABLE IF NOT EXISTS disbursement_expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, expenseDate TEXT NOT NULL, number TEXT NOT NULL, disbursementType TEXT NOT NULL DEFAULT 'daily', name TEXT NOT NULL, category TEXT NOT NULL, description TEXT, amount REAL NOT NULL);
    CREATE TABLE IF NOT EXISTS daily_sales (id INTEGER PRIMARY KEY AUTOINCREMENT, saleDate TEXT NOT NULL, saleNumber TEXT, cashAmount REAL NOT NULL, gcashAmount REAL NOT NULL, totalAmount REAL NOT NULL, notes TEXT);
    CREATE TABLE IF NOT EXISTS revolving_history (id INTEGER PRIMARY KEY AUTOINCREMENT, revolvingNumber TEXT NOT NULL, name TEXT NOT NULL, amount REAL NOT NULL, category TEXT NOT NULL, description TEXT, type TEXT NOT NULL, createdAt TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS machines (id INTEGER PRIMARY KEY AUTOINCREMENT, machineName TEXT NOT NULL, machineType TEXT NOT NULL, status TEXT NOT NULL, branch TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS subcleanings (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL, machineIds TEXT NOT NULL, machineNames TEXT NOT NULL, cleaningStatus TEXT NOT NULL, cleaningType TEXT NOT NULL DEFAULT 'tube', notes TEXT, branch TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS activity_logs (id INTEGER PRIMARY KEY AUTOINCREMENT, timestamp TEXT NOT NULL, staffId INTEGER, staffName TEXT NOT NULL, action TEXT NOT NULL, details TEXT, branch TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS inventory_items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, unit TEXT NOT NULL, quantity REAL NOT NULL DEFAULT 0, reorderLevel REAL NOT NULL DEFAULT 0, notes TEXT, branch TEXT NOT NULL, updatedAt TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS inventory_movements (id INTEGER PRIMARY KEY AUTOINCREMENT, itemId INTEGER NOT NULL, itemName TEXT NOT NULL, movementType TEXT NOT NULL, quantity REAL NOT NULL, notes TEXT, staffName TEXT NOT NULL, branch TEXT NOT NULL, createdAt TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY NOT NULL, value TEXT NOT NULL);
  `),await U(e,"staff","email","TEXT"),await U(e,"staff","password","TEXT"),await U(e,"staff","role","TEXT"),await U(e,"staff","isActive","INTEGER NOT NULL DEFAULT 1"),await e.run('UPDATE staff SET password = ? WHERE password IS NULL OR password = ""',["password"]),await e.run('UPDATE staff SET role = ? WHERE role IS NULL OR role = ""',["staff"]),await U(e,"orders","customerId","INTEGER NOT NULL DEFAULT 0"),await U(e,"orders","phone","TEXT"),await U(e,"orders","serviceId","INTEGER NOT NULL DEFAULT 0"),await U(e,"orders","serviceLines","TEXT"),await U(e,"orders","itemCategoryId","INTEGER NOT NULL DEFAULT 0"),await U(e,"orders","itemCategory",'TEXT NOT NULL DEFAULT "Regular Clothes"'),await U(e,"orders","workflowCompleted","TEXT"),await U(e,"orders","weightKg","REAL NOT NULL DEFAULT 0"),await U(e,"orders","price","REAL NOT NULL DEFAULT 0"),await U(e,"orders","additionalCharge","REAL NOT NULL DEFAULT 0"),await U(e,"orders","extraServiceAmount","REAL NOT NULL DEFAULT 0"),await U(e,"orders","totalAmount","REAL NOT NULL DEFAULT 0"),await U(e,"orders","paidAmount","REAL NOT NULL DEFAULT 0"),await U(e,"orders","extras","TEXT"),await U(e,"orders","notes","TEXT"),await U(e,"orders","foldedByStaffIds","TEXT"),await U(e,"orders","releasedBy","INTEGER"),await U(e,"orders","dueAt","TEXT"),await U(e,"orders","createdAt",'TEXT NOT NULL DEFAULT ""'),await U(e,"daily_sales","saleNumber","TEXT"),await U(e,"daily_sales","status","TEXT"),await U(e,"daily_sales","endorsedTo","TEXT"),await U(e,"daily_sales","statusUpdatedAt","TEXT"),await U(e,"disbursement_expenses","disbursementType",'TEXT NOT NULL DEFAULT "daily"'),await U(e,"subcleanings","cleaningType",'TEXT NOT NULL DEFAULT "tube"');const n=((await e.query("SELECT COUNT(*) as count FROM staff")).values?.[0]?.count??0)===0;if(n){for(const a of Q)await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.name,a.email,a.password,a.role,a.branch,1]);for(const a of Ce)await e.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[a.id,a.name,a.phone,a.address]);for(const a of Z)await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[a.id,a.name,a.description,a.category,a.serviceType,a.price,a.maxKg,a.dryingMinutes,JSON.stringify(a.includes),a.additionalCharge,a.turnaroundHours,a.isActive]);for(const a of se)await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[a.id,a.name,a.maxKg,a.additionalFee,a.isActive]);for(const a of re)await gt(e,a);for(const a of me)await e.run("INSERT INTO payments (id, orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.orderId,a.amount,a.method,a.reference,a.receivedAt,a.branch]);for(const a of ie)await e.run("INSERT INTO disbursement_expenses (id, expenseDate, number, disbursementType, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[a.id,a.expenseDate,a.number,a.disbursementType??"daily",a.name,a.category,a.description,a.amount]);for(const a of ve)await e.run("INSERT INTO daily_sales (id, saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.saleDate,a.saleNumber,a.cashAmount,a.gcashAmount,a.totalAmount,a.notes]);for(const a of pe)await e.run("INSERT INTO revolving_history (id, revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[a.id,a.revolvingNumber,a.name,a.amount,a.category,a.description,a.type,a.createdAt]);for(const a of ee)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[a.id,a.machineName,a.machineType,a.status,a.branch]);for(const a of ye)await e.run("INSERT INTO settings (key, value) VALUES (?, ?)",[a.key,a.value]);await e.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",["fresh_install_defaults",K()])}await xe(e),await ft(e),n||await ht(e),await ua(e)}async function gt(e,t){await e.run("INSERT INTO orders (id, ticket, customerId, customer, phone, serviceId, service, serviceLines, itemCategoryId, itemCategory, branch, status, workflowCompleted, weightKg, price, additionalCharge, extraServiceAmount, totalAmount, paidAmount, extras, notes, foldedBy, foldedByStaffIds, dueAt, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.ticket,t.customerId,t.customer,t.phone,t.serviceId,t.service,JSON.stringify(t.serviceLines??[]),t.itemCategoryId,t.itemCategory,t.branch,t.status,JSON.stringify(t.workflowCompleted),t.weightKg,t.price,t.additionalCharge,t.extraServiceAmount,t.totalAmount,t.paidAmount,JSON.stringify(t.extras),t.notes,t.foldedBy,JSON.stringify(t.foldedByStaffIds??[]),t.dueAt,t.createdAt])}function va(e){const t=Number(e.paidAmount??0),n=Number(e.totalAmount??0),a=Number(e.foldedBy),s=Number(e.releasedBy),r=J(e.serviceLines,[]),i=Number(e.serviceId),o=String(e.service),c=Number(e.price);return{id:Number(e.id),ticket:String(e.ticket),customerId:Number(e.customerId),customer:String(e.customer),phone:e.phone?String(e.phone):null,serviceId:i,service:o,serviceLines:r.length?r:[{id:i,name:o,price:c,quantity:1,total:c}],itemCategoryId:Number(e.itemCategoryId),itemCategory:String(e.itemCategory),branch:String(e.branch),status:String(e.status),workflowCompleted:J(e.workflowCompleted,[]),weightKg:Number(e.weightKg),price:c,additionalCharge:Number(e.additionalCharge),extraServiceAmount:Number(e.extraServiceAmount),totalAmount:n,paidAmount:t,balance:Number((n-t).toFixed(2)),extras:J(e.extras,[]),notes:e.notes?String(e.notes):null,foldedBy:Number.isFinite(a)&&a>0?a:null,foldedByName:e.foldedByName?String(e.foldedByName):null,foldedByStaffIds:J(e.foldedByStaffIds,[]),releasedBy:Number.isFinite(s)&&s>0?s:null,releasedByName:e.releasedByName?String(e.releasedByName):null,dueAt:String(e.dueAt),createdAt:String(e.createdAt)}}async function pa(){await ma()}async function de(){return(await He()).find(t=>t.key==="branch")?.value??"Main Store"}async function ya(){const e=await He();return Number(e.find(t=>t.key==="fold_rate")?.value??"5")}async function bt(e){return(await He()).find(n=>n.key===e)?.value}async function He(){return C.isNativePlatform()?(await(await O()).query("SELECT key, value FROM settings ORDER BY key")).values??[]:L("settings",ye)}async function Ne(e,t){if(!C.isNativePlatform()){const a=L("settings",ye).filter(s=>s.key!==e);a.push({key:e,value:t}),w("settings",a);return}await(await O()).run("REPLACE INTO settings (key, value) VALUES (?, ?)",[e,t])}async function fa(e){return C.isNativePlatform()?(await(await O()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff WHERE branch = ? ORDER BY name ASC',[e])).values??[]:L("staff",Q).filter(a=>a.branch===e)}async function We(){return C.isNativePlatform()?(await(await O()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff ORDER BY name ASC')).values??[]:L("staff",Q)}async function Et(e,t){const n=e.trim().toLowerCase();return(await We()).find(s=>s.email.toLowerCase()===n&&s.password===t&&s.isActive!==0)??null}async function ha(e){if(!C.isNativePlatform()){const n=L("staff",Q);n.unshift({id:H(n),...e,isActive:1}),w("staff",n);return}await(await O()).run("INSERT INTO staff (name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?)",[e.name,e.email,e.password,e.role,e.branch,1])}async function rt(e,t){if(!C.isNativePlatform()){const r=L("staff",Q),i=r.find(o=>o.id===e);i&&(Object.assign(i,t),w("staff",r));return}const n=await O(),a=[],s=[];for(const[r,i]of Object.entries(t))r!=="id"&&(a.push(`${r} = ?`),s.push(i));a.length&&(s.push(e),await n.run(`UPDATE staff SET ${a.join(", ")} WHERE id = ?`,s))}async function ga(){return C.isNativePlatform()?(await(await O()).query("SELECT id, name, phone, address FROM customers ORDER BY name ASC")).values??[]:L("customers",Ce).sort((n,a)=>n.name.localeCompare(a.name))}async function ba(e){if(!C.isNativePlatform()){const s=L("customers",Ce),r=e.id?s.find(o=>o.id===e.id):s.find(o=>o.name.toLowerCase()===e.name.toLowerCase()&&(e.phone?o.phone===e.phone:!0));if(r)return r.name=e.name,r.phone=e.phone??r.phone,r.address=e.address??r.address,w("customers",s),r;const i={id:H(s),name:e.name,phone:e.phone??null,address:e.address??null};return s.push(i),w("customers",s),i}const t=await O();if(e.id)return await t.run("UPDATE customers SET name = ?, phone = ?, address = ? WHERE id = ?",[e.name,e.phone??null,e.address??null,e.id]),{id:e.id,name:e.name,phone:e.phone??null,address:e.address??null};const n=await t.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM customers"),a=Number((n.values?.[0]).id);return await t.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[a,e.name,e.phone??null,e.address??null]),{id:a,name:e.name,phone:e.phone??null,address:e.address??null}}async function Xe(e){if(!C.isNativePlatform())return L("services",Z).filter(a=>!0);const t=await O(),n=await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[]);return(n.values??[]).length===0?(await xe(t),((await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[])).values??[]).map(s=>({...s,includes:J(s.includes,[])}))):(n.values??[]).map(a=>({...a,includes:J(a.includes,[])}))}async function Ea(){if(!C.isNativePlatform())return L("services",Z);const e=await O(),t=await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC");return(t.values??[]).length===0?(await xe(e),((await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC")).values??[]).map(a=>({...a,includes:J(a.includes,[])}))):(t.values??[]).map(n=>({...n,includes:J(n.includes,[])}))}async function it(e){if(!C.isNativePlatform()){const n=L("services",Z),a=e.id?n.find(s=>s.id===e.id):null;a?Object.assign(a,e):n.unshift({...e,id:H(n)}),w("services",n);return}const t=await O();e.id?await t.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = ? WHERE id = ?",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive,e.id]):await t.run("INSERT INTO laundry_services (name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive])}async function St(){if(!C.isNativePlatform())return L("item_categories",se).filter(n=>n.isActive);const e=await O(),t=await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC");return(t.values??[]).length===0?(await xe(e),(await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC")).values??[]):t.values??[]}async function Sa(e){if(!C.isNativePlatform()){const n=L("item_categories",se),a=e.id?n.find(s=>s.id===e.id):null;a?Object.assign(a,e):n.unshift({...e,id:H(n)}),w("item_categories",n);return}const t=await O();e.id?await t.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = ? WHERE id = ?",[e.name,e.maxKg,e.additionalFee,e.isActive,e.id]):await t.run("INSERT INTO item_categories (name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?)",[e.name,e.maxKg,e.additionalFee,e.isActive])}function Ae(e,t,n,a){const s=(Array.isArray(e)?e:[e]).map(f=>{const y=Math.max(0,Number(f.quantity??1)),N=Number(f.price);return{id:f.id,name:f.name,price:N,quantity:y,total:Number((N*y).toFixed(2))}}).filter(f=>f.quantity>0),r=Number(t.maxKg),i=0,o=0,c=a.map(f=>{const y=Math.max(0,Number(f.quantity??1)),N=Number(f.price);return{id:f.id,name:aa(f.name),price:N,quantity:y,total:Number((N*y).toFixed(2))}}).filter(f=>f.quantity>0),d=s.reduce((f,y)=>f+y.total,0),u=c.reduce((f,y)=>f+y.total,0),v=Number((d+o+u).toFixed(2));return{price:Number(d.toFixed(2)),additionalCharge:Number(o.toFixed(2)),extraServiceAmount:Number(u.toFixed(2)),totalAmount:v,allowedKg:r,extraKg:Number(i.toFixed(2)),warning:null,serviceLines:s,extras:c}}function Tt(e,t){return[...(e.serviceLines&&e.serviceLines.length?e.serviceLines:e.serviceId?[{id:e.serviceId}]:[]).some(s=>{const r=t.find(i=>i.id===s.id);return Array.isArray(r?.includes)&&r.includes.includes("Fold")})?[{key:"fold",label:"Fold"}]:[],{key:"claimed",label:"Claimed"}]}function Ta(e){return e.includes("claimed")?"claimed":e.includes("fold")?"ready":"received"}async function he(e){return C.isNativePlatform()?((await(await O()).query("SELECT o.*, folded.name as foldedByName, released.name as releasedByName FROM orders o LEFT JOIN staff folded ON folded.id = o.foldedBy LEFT JOIN staff released ON released.id = o.releasedBy WHERE o.branch = ? ORDER BY o.id DESC",[e])).values??[]).map(a=>va(a)):L("orders",re).filter(a=>a.branch===e).map(a=>({...a,serviceLines:a.serviceLines??[{id:a.serviceId,name:a.service,price:Number(a.price),quantity:1,total:Number(a.price)}],foldedByStaffIds:a.foldedByStaffIds??[],releasedBy:a.releasedBy??null,releasedByName:a.releasedByName??null,balance:Number((a.totalAmount-a.paidAmount).toFixed(2))}))}async function wa(e){const[t,n]=await Promise.all([Xe(),St()]),a=e.serviceQuantities??(e.serviceId?{[e.serviceId]:1}:{}),s=t.filter(p=>p.serviceType==="order"&&Number(a[p.id]??0)>0).map(p=>({...p,quantity:Number(a[p.id]??0)})),r=s[0],i=n.find(p=>p.id===e.itemCategoryId)??n.find(p=>p.name.toLowerCase()===(r?.category??"").toLowerCase())??n.find(p=>p.name==="Regular Clothes")??n[0],o=e.addonQuantities??Object.fromEntries((e.addonIds??[]).map(p=>[p,1])),c=t.filter(p=>p.serviceType==="addon"&&Number(o[p.id]??0)>0).map(p=>({...p,quantity:Number(o[p.id]??0)}));if(!s.length&&!c.length)throw new Error("Please select at least one service or extra service.");const d=e.weightKg??Math.max(1,Number(i?.maxKg||r?.maxKg||1)),u=Ae(s,i,d,c),v=await ba({id:e.customerId||void 0,name:e.customerName,phone:e.customerPhone??null}),f=Math.max(0,e.paidAmount),y=Math.min(u.totalAmount,f),N={ticket:await Na(),customerId:v.id,customer:v.name,phone:v.phone,serviceId:r?.id??0,service:u.serviceLines.length?u.serviceLines.map(p=>`${p.name} x${p.quantity}`).join(", "):"Extras only",serviceLines:u.serviceLines,itemCategoryId:i.id,itemCategory:i.name,branch:e.branch,status:"received",workflowCompleted:["received"],weightKg:d,price:u.price,additionalCharge:u.additionalCharge,extraServiceAmount:u.extraServiceAmount,totalAmount:u.totalAmount,paidAmount:y,balance:Number((u.totalAmount-y).toFixed(2)),extras:u.extras,notes:e.notes||null,foldedBy:null,foldedByName:null,foldedByStaffIds:[],releasedBy:null,releasedByName:null,dueAt:new Date(Date.now()+Math.max(1,...s.map(p=>p.turnaroundHours))*60*60*1e3).toISOString(),createdAt:K()};if(!C.isNativePlatform()){const p=L("orders",re),b={...N,id:H(p)};return p.unshift(b),w("orders",p),f>0&&await Me(b.id,{amount:f,method:e.paymentMethod,reference:e.paymentReference??null}),b}const A=await O(),g=await A.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM orders"),R={...N,id:Number((g.values?.[0]).id)};return await gt(A,R),f>0&&await A.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[R.id,f,e.paymentMethod,e.paymentReference??null,K(),e.branch]),R}async function Na(){const e=`LB${ia()}`,t=await de(),a=(await he(t)).filter(r=>r.ticket.startsWith(e)).sort((r,i)=>i.ticket.localeCompare(r.ticket))[0],s=a?Number(a.ticket.slice(-3))+1:1;return`${e}-${String(s).padStart(3,"0")}`}async function ot(e,t){const n=await de(),[a,s]=await Promise.all([he(n),Xe()]),r=a.find(d=>d.id===e);if(!r)return;const o=Tt(r,s).map(d=>d.key).find(d=>!r.workflowCompleted.includes(d));if(!o)return;if(r.workflowCompleted=[...r.workflowCompleted,o],r.status=Ta(r.workflowCompleted),o==="fold"&&t){const d=Array.isArray(t)?t:[t];r.foldedBy=d[0]||null;const u=Array.isArray(r.foldedByStaffIds)?[...r.foldedByStaffIds]:[];u.push(...d),r.foldedByStaffIds=u}if(o==="claimed"&&t){const d=Array.isArray(t)?t:[t];r.releasedBy=d[0]||null}if(!C.isNativePlatform()){const d=L("orders",re),u=d.find(v=>v.id===r.id);u&&Object.assign(u,r),w("orders",d);return}await(await O()).run("UPDATE orders SET workflowCompleted = ?, status = ?, foldedBy = ?, foldedByStaffIds = ?, releasedBy = ? WHERE id = ?",[JSON.stringify(r.workflowCompleted),r.status,r.foldedBy,JSON.stringify(r.foldedByStaffIds??[]),r.releasedBy,r.id])}async function Me(e,t){const n=await de();if(!(await he(n)).find(o=>o.id===e))return;const r=Math.max(0,t.amount);if(r<=0)return;if(!C.isNativePlatform()){const o=L("payments",me);o.unshift({id:H(o),orderId:e,amount:r,method:t.method,reference:t.reference??null,receivedAt:K(),branch:n}),w("payments",o);const c=L("orders",re),d=c.find(u=>u.id===e);d&&(d.paidAmount=Math.min(d.totalAmount,Number((d.paidAmount+r).toFixed(2)))),w("orders",c);return}const i=await O();await i.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[e,r,t.method,t.reference??null,K(),n]),await i.run("UPDATE orders SET paidAmount = MIN(totalAmount, paidAmount + ?) WHERE id = ?",[r,e])}async function Aa(e){return C.isNativePlatform()?(await(await O()).query("SELECT id, orderId, amount, method, reference, receivedAt, branch FROM payments  ORDER BY receivedAt DESC",[])).values??[]:L("payments",me).filter(a=>!0)}async function La(e){const t=await de(),a=(await he(t)).find(r=>r.id===e);if(!a)return;if(a.paidAmount>0)throw new Error("Cancel is only allowed for unpaid orders. Use Delete (admin) to refund paid orders.");if(!C.isNativePlatform()){const r=L("orders",re),i=L("payments",me),o=L("fold_logs",[]),c=r.filter(v=>v.id!==e),d=i.filter(v=>v.orderId!==e),u=o.filter(v=>v.orderTicket!==a.ticket);w("orders",c),w("payments",d),w("fold_logs",u);return}const s=await O();await s.run("DELETE FROM payments WHERE orderId = ?",[e]),await s.run("DELETE FROM fold_logs WHERE orderTicket = ?",[a.ticket]),await s.run("DELETE FROM orders WHERE id = ?",[e])}async function $a(e){const t=await de(),a=(await he(t)).find(r=>r.id===e);if(!a)return;if(a.paidAmount<=0)throw new Error("Delete (refund) is only allowed for paid orders.");if(!C.isNativePlatform()){const r=L("orders",re),i=L("payments",me),o=L("fold_logs",[]),c=r.filter(v=>v.id!==e),d=i.filter(v=>v.orderId!==e),u=o.filter(v=>v.orderTicket!==a.ticket);w("orders",c),w("payments",d),w("fold_logs",u);return}const s=await O();await s.run("DELETE FROM payments WHERE orderId = ?",[e]),await s.run("DELETE FROM fold_logs WHERE orderTicket = ?",[a.ticket]),await s.run("DELETE FROM orders WHERE id = ?",[e])}async function Ca(){return C.isNativePlatform()?(await(await O()).query("SELECT id, orderTicket, staffName, foldCount, rate, total, createdAt FROM fold_logs ORDER BY id DESC")).values??[]:L("fold_logs",[])}async function Ra(e){const t=Number((e.foldCount*e.rate).toFixed(2));if(!C.isNativePlatform()){const a=L("fold_logs",[]);a.unshift({id:Date.now(),...e,total:t,createdAt:K()}),w("fold_logs",a);return}await(await O()).run("INSERT INTO fold_logs (orderTicket, staffName, foldCount, rate, total, createdAt) VALUES (?, ?, ?, ?, ?, ?)",[e.orderTicket,e.staffName,e.foldCount,e.rate,t,K()])}async function Oa(e){return C.isNativePlatform()?(await(await O()).query("SELECT id, timestamp, staffId, staffName, action, details, branch FROM activity_logs WHERE branch = ? ORDER BY timestamp DESC, id DESC",[e])).values??[]:L("activity_logs",[]).filter(a=>a.branch===e).sort((a,s)=>s.timestamp.localeCompare(a.timestamp))}async function Da(e){const t={timestamp:K(),staffId:e.staffId??null,staffName:e.staffName,action:e.action,details:e.details??"",branch:e.branch};if(!C.isNativePlatform()){const a=L("activity_logs",[]);a.unshift({id:H(a),...t}),w("activity_logs",a);return}await(await O()).run("INSERT INTO activity_logs (timestamp, staffId, staffName, action, details, branch) VALUES (?, ?, ?, ?, ?, ?)",[t.timestamp,t.staffId,t.staffName,t.action,t.details,t.branch])}async function xa(){return C.isNativePlatform()?(await(await O()).query('SELECT id, expenseDate, number, COALESCE(disbursementType, "daily") as disbursementType, name, category, description, amount FROM disbursement_expenses ORDER BY expenseDate DESC, id DESC')).values??[]:L("expenses",ie).map(n=>({...n,disbursementType:n.disbursementType??"daily"}))}function qe(e){const t=/^DISB-(\d+)$/i.exec(String(e??"").trim());return t?Number(t[1]):0}function ct(e){const t=/^REV-(\d+)$/i.exec(String(e??"").trim());return t?Number(t[1]):0}async function Pa(){let e=0;if(!C.isNativePlatform()){const s=L("expenses",ie),r=L("revolving_history",pe);for(const i of s)e=Math.max(e,qe(i.number));for(const i of r)i.type==="disbursement"&&(e=Math.max(e,qe(i.revolvingNumber)));return e}const t=await O(),n=await t.query("SELECT number FROM disbursement_expenses"),a=await t.query("SELECT revolvingNumber as number FROM revolving_history WHERE type = 'disbursement'");for(const s of[...n.values??[],...a.values??[]])e=Math.max(e,qe(String(s.number)));return e}async function wt(){const e=await Pa()+1;return`DISB-${String(e).padStart(2,"0")}`}async function Ia(){let e=0;if(!C.isNativePlatform()){const a=L("revolving_history",pe);for(const s of a)s.type==="add"&&(e=Math.max(e,ct(s.revolvingNumber)));return`REV-${String(e+1).padStart(2,"0")}`}const n=await(await O()).query("SELECT revolvingNumber FROM revolving_history WHERE type = 'add'");for(const a of n.values??[])e=Math.max(e,ct(String(a.revolvingNumber)));return`REV-${String(e+1).padStart(2,"0")}`}async function Nt(e){if(!C.isNativePlatform()){const n=L("expenses",ie),a=H(n);n.unshift({id:a,expenseDate:e.expenseDate,number:e.number,disbursementType:e.disbursementType??"daily",name:e.name,category:e.category,description:e.description||null,amount:e.amount}),w("expenses",n);return}await(await O()).run("INSERT INTO disbursement_expenses (expenseDate, number, disbursementType, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?, ?)",[e.expenseDate,e.number,e.disbursementType??"daily",e.name,e.category,e.description||null,e.amount])}async function qa(e){const t=await wt();await Nt({expenseDate:e.expenseDate,number:t,disbursementType:e.disbursementType??"daily",name:e.name,category:e.category,description:e.description,amount:e.amount})}async function Fa(e,t){if(!C.isNativePlatform()){const a=L("expenses",ie),s=a.find(r=>r.id===e);s&&(Object.assign(s,{expenseDate:t.expenseDate,disbursementType:t.disbursementType??"daily",name:t.name,category:t.category,description:t.description||null,amount:t.amount}),w("expenses",a));return}await(await O()).run("UPDATE disbursement_expenses SET expenseDate = ?, disbursementType = ?, name = ?, category = ?, description = ?, amount = ? WHERE id = ?",[t.expenseDate,t.disbursementType??"daily",t.name,t.category,t.description||null,t.amount,e])}async function Ua(e){if(!C.isNativePlatform()){const n=L("expenses",ie);w("expenses",n.filter(a=>a.id!==e));return}await(await O()).run("DELETE FROM disbursement_expenses WHERE id = ?",[e])}async function ka(){return C.isNativePlatform()?(await(await O()).query('SELECT id, saleDate, COALESCE(saleNumber, "") as saleNumber, cashAmount, gcashAmount, totalAmount, notes, status, endorsedTo, statusUpdatedAt FROM daily_sales ORDER BY saleDate DESC, id DESC')).values??[]:L("sales",ve)}async function Ma(e){const t=Number((e.cashAmount+e.gcashAmount).toFixed(2));if(!C.isNativePlatform()){const r=L("sales",ve),i=e.id?r.find(o=>o.id===e.id):r.find(o=>o.saleDate===e.saleDate);if(i)Object.assign(i,{saleDate:e.saleDate,cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null});else{const o=H(r);r.unshift({id:o,saleDate:e.saleDate,saleNumber:`SALE-${String(o).padStart(2,"0")}`,cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null})}w("sales",r);return}const n=await O(),s=(e.id?await n.query("SELECT id, saleNumber FROM daily_sales WHERE id = ?",[e.id]):await n.query("SELECT id, saleNumber FROM daily_sales WHERE saleDate = ?",[e.saleDate])).values?.[0];if(s)await n.run("UPDATE daily_sales SET saleDate = ?, cashAmount = ?, gcashAmount = ?, totalAmount = ?, notes = ? WHERE id = ?",[e.saleDate,e.cashAmount,e.gcashAmount,t,e.notes||null,s.id]);else{const r=await n.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM daily_sales"),i=Number((r.values?.[0]).id);await n.run("INSERT INTO daily_sales (saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?)",[e.saleDate,`SALE-${String(i).padStart(2,"0")}`,e.cashAmount,e.gcashAmount,t,e.notes||null])}}async function Ba(e){if(!C.isNativePlatform()){const n=L("sales",ve);w("sales",n.filter(a=>a.id!==e));return}await(await O()).run("DELETE FROM daily_sales WHERE id = ?",[e])}async function dt(e,t,n=null,a){if(!C.isNativePlatform()){const r=L("sales",ve),i=r.find(o=>o.id===e);i&&(i.status=t,i.endorsedTo=n,i.statusUpdatedAt=a,w("sales",r));return}await(await O()).run("UPDATE daily_sales SET status = ?, endorsedTo = ?, statusUpdatedAt = ? WHERE id = ?",[t,n,a,e])}async function _a(){return C.isNativePlatform()?(await(await O()).query("SELECT id, revolvingNumber, name, amount, category, description, type, createdAt FROM revolving_history ORDER BY createdAt DESC, id DESC")).values??[]:L("revolving_history",pe).sort((n,a)=>a.createdAt.localeCompare(n.createdAt))}async function lt(e){const t=e.type==="disbursement"?await wt():await Ia();if(e.type==="disbursement"){const a=e.expenseDate??e.createdAt.slice(0,10);await Nt({expenseDate:a,number:t,name:e.name,category:e.category,description:e.description??"",amount:e.amount})}if(!C.isNativePlatform()){const a=L("revolving_history",pe),s=H(a);a.unshift({id:s,revolvingNumber:t,...e}),w("revolving_history",a);return}await(await O()).run("INSERT INTO revolving_history (revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)",[t,e.name,e.amount,e.category,e.description||null,e.type,e.createdAt])}async function At(e){return C.isNativePlatform()?(await(await O()).query("SELECT id, machineName, machineType, status, branch FROM machines WHERE branch = ? ORDER BY machineType, machineName",[e])).values??[]:L("machines",ee).filter(a=>a.branch===e)}async function Lt(e){return C.isNativePlatform()?(await(await O()).query("SELECT id, name, unit, quantity, reorderLevel, notes, branch, updatedAt FROM inventory_items WHERE branch = ? ORDER BY name ASC",[e])).values??[]:L("inventory_items",[]).filter(a=>a.branch===e).sort((a,s)=>a.name.localeCompare(s.name))}async function ja(e){const t={name:e.name,unit:e.unit,quantity:e.quantity,reorderLevel:e.reorderLevel,notes:e.notes||null,branch:e.branch,updatedAt:K()};if(!C.isNativePlatform()){const a=L("inventory_items",[]),s=e.id?a.find(r=>r.id===e.id):null;s?Object.assign(s,t):a.unshift({id:H(a),...t}),w("inventory_items",a);return}const n=await O();e.id?await n.run("UPDATE inventory_items SET name = ?, unit = ?, quantity = ?, reorderLevel = ?, notes = ?, updatedAt = ? WHERE id = ?",[t.name,t.unit,t.quantity,t.reorderLevel,t.notes,t.updatedAt,e.id]):await n.run("INSERT INTO inventory_items (name, unit, quantity, reorderLevel, notes, branch, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)",[t.name,t.unit,t.quantity,t.reorderLevel,t.notes,t.branch,t.updatedAt])}async function Ha(e){return C.isNativePlatform()?(await(await O()).query("SELECT id, itemId, itemName, movementType, quantity, notes, staffName, branch, createdAt FROM inventory_movements WHERE branch = ? ORDER BY createdAt DESC, id DESC",[e])).values??[]:L("inventory_movements",[]).filter(a=>a.branch===e).sort((a,s)=>s.createdAt.localeCompare(a.createdAt))}async function Wa(e){const t=Math.max(0,Number(e.quantity||0));if(t<=0)throw new Error("Quantity must be greater than zero.");const a=(await Lt(e.branch)).find(o=>o.id===e.itemId);if(!a)throw new Error("Inventory item not found.");const s=e.movementType==="in"?a.quantity+t:a.quantity-t;if(s<0)throw new Error("Stock-out quantity is greater than current stock.");const r={itemId:a.id,itemName:a.name,movementType:e.movementType,quantity:t,notes:e.notes||null,staffName:e.staffName,branch:e.branch,createdAt:K()};if(!C.isNativePlatform()){const o=L("inventory_items",[]),c=o.find(u=>u.id===a.id);c&&(c.quantity=Number(s.toFixed(2)),c.updatedAt=r.createdAt),w("inventory_items",o);const d=L("inventory_movements",[]);d.unshift({id:H(d),...r}),w("inventory_movements",d);return}const i=await O();await i.run("UPDATE inventory_items SET quantity = ?, updatedAt = ? WHERE id = ?",[Number(s.toFixed(2)),r.createdAt,a.id]),await i.run("INSERT INTO inventory_movements (itemId, itemName, movementType, quantity, notes, staffName, branch, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[r.itemId,r.itemName,r.movementType,r.quantity,r.notes,r.staffName,r.branch,r.createdAt])}async function Xa(e){if(!C.isNativePlatform()){const n=L("machines",ee);n.unshift({id:H(n),...e}),w("machines",n);return}await(await O()).run("INSERT INTO machines (machineName, machineType, status, branch) VALUES (?, ?, ?, ?)",[e.machineName,e.machineType,e.status,e.branch])}async function Ka(e,t){if(!C.isNativePlatform()){const a=L("machines",ee),s=a.find(r=>r.id===e);s&&(s.status=t,w("machines",a));return}await(await O()).run("UPDATE machines SET status = ? WHERE id = ?",[t,e])}async function Ga(e){return C.isNativePlatform()?((await(await O()).query('SELECT id, date, machineIds, machineNames, cleaningStatus, COALESCE(cleaningType, "tube") as cleaningType, notes, branch FROM subcleanings WHERE branch = ? ORDER BY date DESC, id DESC',[e])).values??[]).map(a=>({...a,machineIds:J(a.machineIds,[])})):L("subcleanings",[]).filter(a=>a.branch===e).map(a=>({...a,cleaningType:a.cleaningType??"tube"}))}async function $t(e){const n=(await At(e.branch)).filter(i=>e.machineIds.includes(i.id)).map(i=>i.machineName).join(", "),a=e.cleaningType??"tube";if(!C.isNativePlatform()){const i=L("subcleanings",[]);i.unshift({id:H(i),date:e.date,machineIds:e.machineIds,machineNames:n,cleaningStatus:e.cleaningStatus,cleaningType:a,notes:e.notes||null,branch:e.branch}),w("subcleanings",i);const o=L("machines",ee);o.forEach(c=>{e.machineIds.includes(c.id)&&(c.status=e.cleaningStatus==="completed"?"available":"under_cleaning")}),w("machines",o);return}const s=await O();await s.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, cleaningType, notes, branch) VALUES (?, ?, ?, ?, ?, ?, ?)",[e.date,JSON.stringify(e.machineIds),n,e.cleaningStatus,a,e.notes||null,e.branch]);const r=e.cleaningStatus==="completed"?"available":"under_cleaning";for(const i of e.machineIds)await s.run("UPDATE machines SET status = ? WHERE id = ?",[r,i])}async function Va(e,t){if(!C.isNativePlatform()){const i=L("machines",ee),o=i.find(u=>u.id===e);o&&(o.status="available"),w("machines",i);const c=L("subcleanings",[]),d=Re();c.unshift({id:H(c),date:d,machineIds:[e],machineNames:o?.machineName??"",cleaningStatus:"completed",cleaningType:"tube",notes:null,branch:t}),w("subcleanings",c);return}const n=await O(),s=(await n.query("SELECT machineName FROM machines WHERE id = ?",[e])).values?.[0]?.machineName??"";await n.run("UPDATE machines SET status = ? WHERE id = ?",["available",e]);const r=Re();await n.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, cleaningType, notes, branch) VALUES (?, ?, ?, ?, ?, ?, ?)",[r,JSON.stringify([e]),s,"completed","tube",null,t])}async function Ya(e,t){await $t({date:Re(),machineIds:[],cleaningStatus:"completed",cleaningType:"general",notes:`Confirmed by ${t}`,branch:e})}const Ke=document.querySelector("#app");if(!Ke)throw new Error("App root not found");let Te;const fe=ce("BluetoothThermalPrinter"),Ge={dashboard:"Dashboard",pos:"POS",orders:"Orders",archived:"Archived Order",customers:"Customers",pricing:"Pricing Services",disbursements:"Daily Report",reports:"Reports",logs:"Logs",inventory:"Inventory",maintenance:"Maintenance",staff:"Staff",revolving:"Revolving Fund",settings:"Settings"},l={tab:"dashboard",receiptOrderId:0,currentUser:null,loginError:"",sidebarOpen:!1,dailyReportTab:"expenses",maintenanceTab:"cleaning",customerSearch:"",orderSearch:"",orderDateFilter:"",orderPaymentFilter:"",printerPanelOpen:!1,printerLoading:!1,printerError:"",printerStatus:"",printerPaperWidth:58,pairedPrinters:[],selectedPrinterAddress:"",archivedOrderSearch:"",paymentModalOrderId:0,dashboardSummaryModalOpen:!1,reportPreview:null,endorseModalOpen:!1,endorseSaleId:0,endorseSaleDate:"",revolvingModalOpen:!1,revolvingSaleId:0,addFundModalOpen:!1,disbursementModalOpen:!1,revolvingHistoryFrom:"",revolvingHistoryTo:""},Qa=["Wash","Dry","Fold","Detergent","Fabcon","Zonrox","Finishing"],Ja=["Supplies","Utilities","Maintenance","Salary","Rent","Transport","Other"],Ee="laba101-mobile-session";function T(e){return new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(e||0)}function m(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ae(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}function Pe(e,t){return Number((e-t).toFixed(2))}function Ct(e,t,n,a=0){const s=t.filter(i=>V(i.createdAt)===e).reduce((i,o)=>i+o.paidAmount,0),r=n.filter(i=>ne(i)==="daily"&&i.expenseDate===e).reduce((i,o)=>i+o.amount,0);return Pe(s+a,r)}function za(e,t){const n=new Map(t.map(s=>[s.id,s.name])),a=new Map;return e.filter(s=>s.workflowCompleted.includes("fold")).forEach(s=>{(Array.isArray(s.foldedByStaffIds)&&s.foldedByStaffIds.length?s.foldedByStaffIds:s.foldedBy?[s.foldedBy]:[]).forEach(i=>{if(!i)return;const o=n.get(i)??String(i),c=a.get(i)??{staffId:i,staffName:o,folds:0};c.folds+=1,a.set(i,c)})}),e.filter(s=>s.workflowCompleted.includes("fold")&&s.foldedByName&&s.foldedBy).forEach(s=>{const r=a.get(s.foldedBy);r&&r.staffName===String(s.foldedBy)&&(r.staffName=s.foldedByName)}),Array.from(a.values()).map(s=>({staffName:s.staffName,folds:s.folds}))}function oe(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${a}`}function j(){return oe()}function Be(){return j().slice(0,7)}function ne(e){return e.disbursementType==="monthly"?"monthly":"daily"}function Rt(e){return e.slice(0,7)}function Ot(e){return ne(e)==="monthly"?Rt(e.expenseDate):e.expenseDate}function V(e){return oe(new Date(e))}function Oe(e){return e.paidAmount<=0?"unpaid":e.balance>0?"partial":"paid"}function Dt(e,t,n){const a=new Map(t.map(i=>[i.id,i])),s=new Map(t.map(i=>[i.id,Number(i.totalAmount||0)])),r={cash:0,gcash:0,total:0};return[...e].sort((i,o)=>new Date(i.receivedAt).getTime()-new Date(o.receivedAt).getTime()||i.id-o.id).forEach(i=>{const o=a.get(i.orderId);if(!o)return;const c=s.get(o.id)??0,d=Math.min(Math.max(0,Number(i.amount||0)),c);s.set(o.id,Number((c-d).toFixed(2))),!(!n(i)||d<=0)&&(i.method==="gcash"?r.gcash+=d:r.cash+=d,r.total+=d)}),{cash:Number(r.cash.toFixed(2)),gcash:Number(r.gcash.toFixed(2)),total:Number(r.total.toFixed(2))}}function z(e){return new Intl.DateTimeFormat("en-PH",{dateStyle:"medium",timeStyle:"short"}).format(new Date(e))}function Za(e){const t=new Date(e),n=new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric",year:"numeric"}).format(t),a=new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",hour12:!0}).format(t);return`<div class="datetime-stack"><strong>${m(n)}</strong><span class="meta">${m(a)}</span></div>`}function en(e){return e?.role==="staff"&&e.branch==="Gensan Branch"}function tn(e){return e?.role==="staff"&&e.branch.toLowerCase().includes("mintal")}async function Y(e,t=""){l.currentUser&&await Da({staffId:l.currentUser.id,staffName:l.currentUser.name,action:e,details:t,branch:await de()})}async function an(e){return(await We()).filter(n=>n.role==="admin"&&n.isActive!==0).some(n=>n.password===e)}function De(e,t,n="data-table"){return`
    <div class="table-scroll">
      <table class="${n}">
        <thead><tr>${e.map(a=>`<th>${m(a)}</th>`).join("")}</tr></thead>
        <tbody>${t.length?t.map(a=>`<tr>${a.map(s=>`<td>${s}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${e.length}" class="table-empty">No records found.</td></tr>`}</tbody>
      </table>
    </div>
  `}function nn(e=new Date){return{date:new Intl.DateTimeFormat("en-PH",{weekday:"long",month:"long",day:"numeric",year:"numeric"}).format(e),time:new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",second:"2-digit",hour12:!0}).format(e)}}function we(){const e=document.querySelector("[data-date-from]"),t=document.querySelector("[data-date-to]"),n=Array.from(document.querySelectorAll('input[name="reportType"]:checked')).map(a=>a.value).filter(a=>a==="sales"||a==="disbursement"||a==="fold_count"||a==="revolving_fund"||a==="summary");return{from:e?.value||"0000-01-01",to:t?.value||"9999-12-31",types:n.length?n:["summary"]}}function be(e,t){return e>=t.from&&e<=t.to}function xt(e,t,n,a,s,r,i,o){const c=new Set(o.types),d=e.filter(h=>be(V(h.createdAt),o)),u=n.filter(h=>be(h.saleDate,o)),v=a.filter(h=>be(h.expenseDate,o)),f=za(d,r),y=new Map;t.filter(h=>be(V(h.receivedAt),o)).forEach(h=>{const F=y.get(h.orderId)??{cash:0,gcash:0};h.method==="gcash"?F.gcash+=h.amount:F.cash+=h.amount,y.set(h.orderId,F)});const N=d.reduce((h,F)=>{const _=y.get(F.id);if(_){const te=_.cash+_.gcash;if(te>F.totalAmount){const le=F.totalAmount/te;return h+_.cash*le}return h+_.cash}return h+F.paidAmount},0),A=u.reduce((h,F)=>h+F.cashAmount,0),g=u.reduce((h,F)=>h+F.gcashAmount,0),R=d.reduce((h,F)=>{const _=y.get(F.id);if(_){const te=_.cash+_.gcash;if(te>F.totalAmount){const le=F.totalAmount/te;return h+_.gcash*le}return h+_.gcash}return h+0},0),p=N+A,b=R+g,E=p+b,P=v.reduce((h,F)=>h+F.amount,0),$=P,x=E-$,D=()=>({orderCashTotal:N,orderGcashTotal:R,manualCashTotal:A,manualGcashTotal:g,totalCash:p,totalGcash:b,totalSales:E,transactions:d.map(h=>{const F=y.get(h.id)??{cash:h.paidAmount,gcash:0},_=F.cash+F.gcash;let te=F.cash,le=F.gcash,Ye=_;if(_>h.totalAmount){const Qe=h.totalAmount/_;te=F.cash*Qe,le=F.gcash*Qe,Ye=h.totalAmount}return{ticket:h.ticket,customer:h.customer,cash:te,gcash:le,total:Ye}}),manualSales:u.map(h=>({cash:h.cashAmount,gcash:h.gcashAmount,total:h.totalAmount}))}),I=()=>({totalExpenses:P,totalDisbursement:$,rows:[["Date/Month","id#","Type","Name","Category","Description","Amount"],...v.map(h=>[Ot(h),h.number,ne(h),h.name,h.category??"",h.description??"",h.amount]),[],["Total Disbursement","","","","","",$]]}),k=()=>({rows:[["Staff","Fold Count"],...f.map(h=>[h.staffName,h.folds]),[],["Total Folds",f.reduce((h,F)=>h+F.folds,0)]]}),M=s.filter(h=>be(V(h.createdAt),o));return{selection:o,selectedTypes:c,salesRows:D,disbursementRows:I,foldCountRows:k,revolvingDailySummaryRows:()=>({rows:[["Date of Sales","Cash on Hand","Status","Date Update"],...u.map(h=>{const F=Ct(h.saleDate,e,a,h.cashAmount),_=h.status==="revolving"?"Revolving":h.status==="endorsed"?`Endorsed to ${h.endorsedTo??""}`:"Pending";return[h.saleDate,F,_,h.statusUpdatedAt?V(h.statusUpdatedAt):""]})]}),revolvingHistoryRows:()=>({rows:[["Date","Number","Name","Amount","Category","Description","Type"],...M.map(h=>[V(h.createdAt),h.revolvingNumber,h.name,h.type==="disbursement"?-h.amount:h.amount,h.category,h.description??"",h.type==="add"?"Add Revolving Fund":"Disbursement"])]}),summaryRows:()=>{const h=D(),F=I();return[["Summary",o.from,"to",o.to],[],["Total Cash:","Total GCash:","Total Sales:"],["","",""],[h.totalCash,h.totalGcash,h.totalSales],["","",""],["Total Disbursement:","Total Profit:","Cash on Hand:"],["","",""],[F.totalDisbursement,x,Pe(h.totalCash,F.totalDisbursement)]]},profit:x}}function sn(e,t){return`<button class="nav-link ${t?"is-active":""}" data-tab="${e}" type="button">
    <span class="nav-icon">${rn(e)}</span>
    <span>${Ge[e]}</span>
  </button>`}function q(e,t){return`<div class="section-head"><div><h2>${m(e)}</h2><p class="meta">${m(t)}</p></div></div>`}function ut(){return Ge[l.tab]??"Dashboard"}function Fe(e){return(e?.name??"Laba101").trim().slice(0,1).toUpperCase()}function rn(e){return{dashboard:"DB",pos:"POS",orders:"PO",archived:"AR",customers:"CU",pricing:"PS",disbursements:"DR",reports:"RP",logs:"LG",inventory:"IN",maintenance:"MT",staff:"ST",revolving:"RV",settings:"SE"}[e]}async function Pt(){const e=await de(),t=await fa(e),n=await We(),a=await ga(),s=await Xe(),r=await Ea(),i=await St(),o=await he(e),c=await Aa(),d=await Ca(),u=await xa(),v=await ka(),f=await At(e),y=await Ga(e),N=await Oa(e),A=await Lt(e),g=await Ha(e),R=await _a(),p=await ya(),b=await bt("report_email");return{branch:e,staff:t,allStaff:n,customers:a,services:s,allServices:r,categories:i,orders:o,payments:c,foldLogs:d,expenses:u,sales:v,machines:f,subcleanings:y,activityLogs:N,inventoryItems:A,inventoryMovements:g,revolvingHistory:R,foldRate:p,reportEmail:b??""}}async function S(){if(!l.currentUser){on(),Rn();return}const e=await Pt();e.orders.filter(c=>c.status!=="claimed").length,e.orders.filter(c=>c.status==="ready").length,e.orders.reduce((c,d)=>c+d.paidAmount,0);const t=j(),n=Dt(e.payments,e.orders,c=>c.branch===e.branch&&V(c.receivedAt)===t),a=n.gcash+e.sales.filter(c=>c.saleDate===t).reduce((c,d)=>c+d.gcashAmount,0),s=n.cash+e.sales.filter(c=>c.saleDate===t).reduce((c,d)=>c+d.cashAmount,0),r=s+a,i=e.expenses.filter(c=>ne(c)==="daily"&&c.expenseDate===t).reduce((c,d)=>c+d.amount,0),o=Pe(s,i);e.sales.reduce((c,d)=>c+d.totalAmount,0),e.expenses.reduce((c,d)=>c+d.amount,0),Ke.innerHTML=`
    <div class="app-frame">
      <header class="topbar">
        <div class="topbar-left">
          <img src="/laba101-logo.svg" alt="Laba101" class="topbar-logo" />
          <div>
            <p class="eyebrow">Offline mobile system</p>
            <h1>${m(ut())}</h1>
          </div>
        </div>
        <div class="topbar-actions">
          <div class="branch-pill"><span>Branch</span><strong>${m(e.branch)}</strong></div>
          <button class="icon-button" type="button" aria-label="Notifications">!</button>
          <button class="profile-pill" type="button">
            <span>${Fe(l.currentUser)}</span>
            <strong>${m(l.currentUser.name)}</strong>
          </button>
        </div>
      </header>

      <button class="sidebar-backdrop ${l.sidebarOpen?"is-open":""}" id="sidebar-backdrop" type="button" aria-label="Close navigation"></button>

      <aside class="sidebar ${l.sidebarOpen?"is-open":""}">
        <div class="sidebar-mobile-head">
          <img src="/laba101-logo.svg" alt="Laba101" />
          <button class="sidebar-close" id="sidebar-close-button" type="button" aria-label="Close navigation">X</button>
        </div>
        <nav>${It().map(c=>sn(c,l.tab===c)).join("")}</nav>
        <div class="sidebar-fill">
          <div class="sidebar-branch-badge">
            <span>Active Branch</span>
            <strong>${m(e.branch)}</strong>
          </div>
          <p class="sidebar-app-name">Laba101 POS</p>
        </div>
        <div class="sidebar-user">
          <span class="avatar">${Fe(l.currentUser)}</span>
          <div>
            <strong>${m(l.currentUser.name)}</strong>
            <small>${m(l.currentUser.email)} / ${m(l.currentUser.role)}</small>
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
            <h2>${m(ut())}</h2>
          </div>
          <div class="navbar-time">
            <strong data-navbar-time>--:--</strong>
            <span data-navbar-date>Loading...</span>
          </div>
          <button class="mobile-avatar" type="button">${Fe(l.currentUser)}</button>
        </header>

        ${l.tab==="dashboard"?dn({paidToday:r,cashPaidToday:s,gcashPaidToday:a,disbursementToday:i,cashOnHandToday:o,orders:e.orders,payments:e.payments,sales:e.sales}):""}
        ${l.tab==="pos"?un(e.orders,e.customers,e.services,e.categories,e.payments,e.branch):""}
        ${l.tab==="orders"?mn(e.orders,e.staff,e.services,e.payments):""}
        ${l.tab==="archived"?vn(e.orders,e.staff,e.services,e.payments):""}
        ${l.tab==="customers"?bn(e.customers,e.orders):""}
        ${l.tab==="pricing"?En(e.allServices,e.categories):""}
        ${l.tab==="disbursements"?Sn(e.expenses,e.sales):""}
        ${l.tab==="reports"?Tn(e.orders,e.payments,e.sales,e.expenses,e.revolvingHistory,e.allStaff,e.foldRate):""}
        ${l.tab==="logs"?wn(e.activityLogs):""}
        ${l.tab==="inventory"?Nn(e.inventoryItems,e.inventoryMovements,e.branch):""}
        ${l.tab==="maintenance"?An(e.machines,e.subcleanings,e.branch):""}
        ${l.tab==="staff"?Ln(e.allStaff,e.branch):""}
        ${l.tab==="revolving"?jn(e.sales,e.revolvingHistory,e.orders,e.expenses):""}
        ${l.tab==="settings"?$n(e.branch,e.foldRate,e.reportEmail):""}
      </main>
    </div>
  `,Cn(),Dn(e),xn(e.allServices),Pn(e.expenses),In(e.orders,e.payments,e.sales,e.expenses,e.revolvingHistory,e.foldRate),qn(),Fn(),Un(),kn(e.inventoryItems,e.branch),Mn(e.allStaff),Hn(),Bn(),On()}function It(){if(l.currentUser?.role==="admin")return Object.keys(Ge);const e=["dashboard","pos","orders","archived","disbursements","reports","maintenance","revolving"];return en(l.currentUser)?["dashboard","disbursements","reports","maintenance","revolving"]:tn(l.currentUser)?e.filter(t=>t!=="revolving"):e}function on(){Ke.innerHTML=`
    <main class="login-page">

      <section class="login-panel-wrap">
        <article class="login-panel">
          <header>
            <div class="login-mark"><img src="/laba101-logo.svg" alt="Laba101" /></div>
            <h2>Welcome back</h2>
            <p>Sign in to continue managing today&apos;s laundry operations.</p>
          </header>
          ${l.loginError?`<div class="alert">${m(l.loginError)}</div>`:""}
          <form id="login-form" class="form">
            <label>Email address<input name="email" type="email" autocomplete="username" placeholder="admin@laba101.test or staff@laba101.gensan" required /></label>
            <label>Password<input name="password" type="password" autocomplete="current-password" placeholder="password" required /></label>
            <label class="remember"><input name="remember" type="checkbox" value="1" /> Remember me on this device</label>
            <button class="primary" id="login-button" type="submit">Sign in</button>
          </form>
        </article>
      </section>
    </main>
  `}function cn(){document.querySelectorAll("[data-fill-email]").forEach(e=>{e.addEventListener("click",()=>{const t=document.querySelector('input[name="email"]'),n=document.querySelector('input[name="password"]');t&&(t.value=e.dataset.fillEmail??""),n&&(n.value=e.dataset.fillPassword??"")})})}function dn(e){const t=new Date,n=Array.from({length:7},(i,o)=>{const c=new Date(t);return c.setDate(t.getDate()-(6-o)),new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric"}).format(c)}),a=Array.from({length:7},(i,o)=>{const c=new Date(t);c.setDate(t.getDate()-(6-o));const d=oe(c),u=Dt(e.payments,e.orders,f=>V(f.receivedAt)===d).total,v=e.sales.filter(f=>f.saleDate===d).reduce((f,y)=>f+y.totalAmount,0);return u+v}),s=Math.max(1,...a),r=210;return`
    <section class="dashboard-main">
      <article class="panel revenue-panel">
        ${q("Revenue overview","Paid amount for the last 7 days.")}
        <button class="secondary dashboard-print-button" type="button" data-open-daily-summary>Print Daily Summary</button>
        <div class="stats compact dashboard-stats">
          <div class="stat paid-today-stat">
            <span class="card-label">Paid Today</span>
            <div class="value">${T(e.paidToday)}</div>
            <div class="stat-breakdown"><span>Cash ${T(e.cashPaidToday)}</span><span>GCash ${T(e.gcashPaidToday)}</span></div>
          </div>
          <div class="stat"><span class="card-label">Disbursement</span><div class="value">${T(e.disbursementToday)}</div></div>
          <div class="stat"><span class="card-label">Cash on Hand</span><div class="value">${T(e.cashOnHandToday)}</div></div>
        </div>
        <div class="chart-shell">
          <div class="mini-chart revenue-chart">
            ${a.map((i,o)=>{const c=Math.max(12,Math.round(i/s*r));return`<div class="chart-bar ${o===a.length-1?"is-today":""}"><span style="height:${c}px"></span><strong>${T(i)}</strong></div>`}).join("")}
          </div>
          <div class="chart-days">${n.map(i=>`<span>${m(i)}</span>`).join("")}</div>
        </div>
        <div class="chart-footnote">Values include POS payments and Daily Report sales input.</div>
      </article>
      ${l.dashboardSummaryModalOpen?ln(e):""}
    </section>
  `}function ln(e){return`
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal dashboard-summary-modal" role="dialog" aria-modal="true" aria-labelledby="daily-summary-title">
        <div class="modal-actions">
          <button class="primary" type="button" data-print-modal>Print</button>
          <button class="secondary" type="button" data-close-daily-summary>Close</button>
        </div>
        <div class="receipt dashboard-summary-slip">
          <h3 id="daily-summary-title">Laba101 Daily Summary</h3>
          <p>${m(oe())}</p>
          <div><span>Paid today:</span><strong>${T(e.paidToday)}</strong></div>
          <div><span>Cash:</span><strong>${T(e.cashPaidToday)}</strong></div>
          <div><span>GCash:</span><strong>${T(e.gcashPaidToday)}</strong></div>
          <div><span>Disbursement:</span><strong>${T(e.disbursementToday)}</strong></div>
          <div><span>Cash-on hand:</span><strong>${T(e.cashOnHandToday)}</strong></div>
          <div class="signature-row"><span>Name of receiver and signature</span></div>
        </div>
      </div>
    </div>
  `}function un(e,t,n,a,s,r){const i=n.filter(d=>d.serviceType==="order"&&d.isActive),o=n.filter(d=>d.serviceType==="addon"&&d.isActive),c=l.receiptOrderId?e.find(d=>d.id===l.receiptOrderId):null;return`
    <section class="grid content full">
      <article class="panel span-2">
        ${q("New POS order","Search for a customer or type a new name, pick services and confirm")}
        <form id="order-form" class="form">
          <div class="customer-autocomplete-wrap">
            <label>Customer name
              <div class="autocomplete-field">
                <input
                  id="customer-name-input"
                  name="customerName"
                  required
                  placeholder="Type to search or add new customer…"
                  autocomplete="off"
                />
                <div id="customer-suggestions" class="autocomplete-dropdown" hidden></div>
              </div>
            </label>
            <input type="hidden" name="customerId" id="customer-id-input" value="" />
          </div>
          <div class="form-row">
            <label>Phone<input name="customerPhone" id="customer-phone-input" placeholder="09…" /></label>
          </div>

          <fieldset class="service-picker">
            <legend>Services</legend>
            ${i.map(d=>`<div class="qty-card service-option service-quantity" data-qty-card="serviceQty-${d.id}">
              <span>
                <strong>${m(d.name)}</strong>
                <small>${m(d.description??d.category)} ${d.maxKg?` / max ${d.maxKg}kg`:""}</small>
              </span>
              <b>${T(d.price)}</b>
              <div class="qty-control">
                <button type="button" data-qty-minus="serviceQty-${d.id}" aria-label="Decrease ${m(d.name)}">-</button>
                <input type="number" name="serviceQty-${d.id}" min="0" step="1" value="0" inputmode="numeric" />
                <button type="button" data-qty-plus="serviceQty-${d.id}" aria-label="Increase ${m(d.name)}">+</button>
              </div>
            </div>`).join("")}
          </fieldset>

          <fieldset class="check-grid">
            <legend>Extra services</legend>
            ${o.length?o.map(d=>`<div class="qty-card addon-quantity" data-qty-card="addonQty-${d.id}">
              <span><strong>${m(ae(d.name))}</strong><small>${T(d.price)} each</small></span>
              <div class="qty-control">
                <button type="button" data-qty-minus="addonQty-${d.id}" aria-label="Decrease ${m(ae(d.name))}">-</button>
                <input type="number" name="addonQty-${d.id}" min="0" step="1" value="0" inputmode="numeric" />
                <button type="button" data-qty-plus="addonQty-${d.id}" aria-label="Increase ${m(ae(d.name))}">+</button>
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

      ${c?Ve(c,s.filter(d=>d.orderId===c.id)):""}
    </section>
  `}function mn(e,t,n,a){const s=l.receiptOrderId?e.find(y=>y.id===l.receiptOrderId):null,r=e.filter(y=>y.status!=="claimed"),i=l.orderSearch.trim().toLowerCase(),o=l.orderDateFilter.trim(),c=l.orderPaymentFilter.trim().toLowerCase(),d=r.filter(y=>{const N=!i||[y.ticket,y.customer,y.phone,y.service,y.itemCategory,y.status].some(R=>String(R??"").toLowerCase().includes(i)),A=!o||V(y.createdAt)===o,g=!c||Oe(y)===c;return N&&A&&g}),v=d.filter(y=>["unpaid","partial"].includes(Oe(y))).reduce((y,N)=>y+Math.max(0,Number(N.balance||0)),0),f=d.length;return`
    <section class="grid content full">
      <article class="panel span-2">
        ${q("Order queue","Workflow, payment, and receipts")}
        <form class="queue-filters" id="order-queue-filters">
          <label>
            <span>Search queue</span>
            <input name="orderSearch" type="search" placeholder="Ticket, name, service, status" value="${m(l.orderSearch)}" autocomplete="off" />
          </label>
          <label>
            <span>Filter date</span>
            <input name="orderDateFilter" type="date" value="${m(l.orderDateFilter)}" />
          </label>
          <label>
            <span>Payment</span>
            <select name="orderPaymentFilter">
              <option value="" ${l.orderPaymentFilter===""?"selected":""}>All</option>
              <option value="unpaid" ${l.orderPaymentFilter==="unpaid"?"selected":""}>Unpaid</option>
              <option value="partial" ${l.orderPaymentFilter==="partial"?"selected":""}>Partial</option>
              <option value="paid" ${l.orderPaymentFilter==="paid"?"selected":""}>Paid</option>
            </select>
          </label>
          <div class="search-actions queue-actions">
            <button class="primary" type="submit">Apply</button>
            <button class="secondary" type="button" id="order-queue-clear">Clear</button>
          </div>
        </form>
        <div style="overflow-x: auto; width: 100%; -webkit-overflow-scrolling: touch;">
          <table class="data-table orders-data-table bordered-table">
            <thead>
              <tr><th>Ticket</th><th>Customer</th><th>Service</th><th>Total Payment</th><th>Actions</th></tr>
            </thead>
            <tbody>
              ${d.map(y=>qt(y,t,n)).join("")||'<tr><td colspan="5" class="table-empty">No matching orders.</td></tr>'}
            </tbody>
          </table>
        </div>
        <div class="summary-list queue-summary">
          <div><span>Total transactions</span><strong>${f}</strong></div>
          <div><span>Total unpaid amount</span><strong>${T(v)}</strong></div>
        </div>
      </article>
      ${s?Ve(s,a.filter(y=>y.orderId===s.id)):""}
      ${l.paymentModalOrderId?pn(e.find(y=>y.id===l.paymentModalOrderId)):""}
    </section>
  `}function vn(e,t,n,a){const s=e.filter(c=>c.status==="claimed"),r=l.archivedOrderSearch.trim().toLowerCase(),i=s.filter(c=>r?[c.ticket,c.customer,c.phone,c.service,c.itemCategory].some(d=>String(d??"").toLowerCase().includes(r)):!0),o=l.receiptOrderId?e.find(c=>c.id===l.receiptOrderId):null;return`
    <section class="grid content full">
      <article class="panel span-2">
        ${q("Archived orders","All claimed orders are listed here")}
        <form class="queue-filters" id="archived-order-filters">
          <label>
            <span>Search archived</span>
            <input name="archivedOrderSearch" type="search" placeholder="Ticket, name, service" value="${m(l.archivedOrderSearch)}" autocomplete="off" />
          </label>
          <div class="search-actions queue-actions">
            <button class="primary" type="submit">Apply</button>
            <button class="secondary" type="button" id="archived-order-clear">Clear</button>
          </div>
        </form>
        <div class="summary-list queue-summary">
          <div><span>Archived claims</span><strong>${i.length}</strong></div>
          <div><span>Total claimed</span><strong>${s.length}</strong></div>
        </div>
        <div style="overflow-x: auto; width: 100%; -webkit-overflow-scrolling: touch;">
          <table class="data-table orders-data-table archived-orders-table">
            <thead>
              <tr><th>Ticket</th><th>Customer</th><th>Service</th><th>Total Payment</th><th>Actions</th></tr>
            </thead>
            <tbody>
              ${i.map(c=>qt(c,t,n)).join("")||'<tr><td colspan="5" class="table-empty">No archived orders found.</td></tr>'}
            </tbody>
          </table>
        </div>
      </article>
      ${o?Ve(o,a.filter(c=>c.orderId===o.id)):""}
    </section>
  `}function qt(e,t,n){const a=Tt(e,n),s=e.workflowCompleted.includes("claimed"),r=a.find(N=>!e.workflowCompleted.includes(N.key)),i=r?.key==="fold",o=Oe(e),c=o==="unpaid"?"pending":o,d=e.extras.length?e.extras.map(N=>`${m(ae(N.name))} x${Number(N.quantity??1)}`).join(", "):"",u=l.currentUser?.role==="admin",v=e.status!=="claimed"&&e.paidAmount<=0,f=e.status!=="claimed"&&u&&e.paidAmount>0;let y=1;if(e.serviceLines){let N=0;e.serviceLines.forEach(A=>{const g=n.find(R=>R.id===A.id);g&&Array.isArray(g.includes)&&g.includes.includes("Fold")&&(N+=A.quantity)}),N>0&&(y=N)}return`
    <tr class="order-row-main">
      <td><strong>${m(e.ticket)}</strong><div class="small">${m(z(e.createdAt))}</div></td>
      <td>${m(e.customer)}<div class="small">${m(e.phone??"")}</div></td>
      <td>${m(e.service)}${d?`<div class="small">Extras: ${d}</div>`:""}</td>
      <td class="amount-cell payment-cell status-${o}"><strong>${T(e.totalAmount)}</strong><div class="payment-status">${m(c)}${o==="paid"?"":` &middot; Bal: ${T(e.balance)}`}</div></td>
      <td>
      <div class="row-actions">
        ${r?.key==="fold"?`<form class="inline-form advance-form flex-wrap" data-order-id="${e.id}">
          ${i?Array.from({length:y}).map((N,A)=>`<select name="assignedStaffId" required>
            <option value="">-- Staff ${y>1?`(Fold ${A+1})`:""}--</option>
            ${t.map(g=>`<option value="${g.id}">${m(g.name)}</option>`).join("")}
          </select>`).join(""):""}
          <button class="secondary" type="submit">Fold</button>
        </form>`:r?.key==="claimed"&&!s?`<form class="inline-form advance-form" data-order-id="${e.id}" data-action="claim" data-balance="${e.balance}">
          <select name="releasedBy" required>
            <option value="">-- Released by --</option>
            ${t.map(N=>`<option value="${N.id}">${m(N.name)}</option>`).join("")}
          </select>
          <button class="secondary" type="submit">Claim</button>
        </form>`:""}
        ${e.balance>0?`
          <form class="inline-form payment-form" data-order-id="${e.id}">
            <input name="amount" type="number" min="0.01" step="0.01" value="${e.balance}" />
            <select name="method"><option value="cash">Cash</option><option value="gcash">GCash</option></select>
            <input name="reference" placeholder="GCash ref" hidden />
            <button class="secondary" type="submit">Pay</button>
          </form>
        `:""}
        ${v?`<button class="secondary btn-sm" type="button" data-cancel-order="${e.id}">Cancel</button>`:""}
        ${f?`<button class="secondary btn-sm" type="button" data-delete-order="${e.id}">Delete</button>`:""}
        <button class="secondary btn-sm" data-receipt="${e.id}">Receipt</button>
      </div>
      </td>
    </tr>
  `}function pn(e){return e?`
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="payment-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-close-payment-modal>Close</button>
        </div>
        <div class="receipt" style="border: 1px solid var(--line); border-style: solid; box-shadow: none;">
          <h3 id="payment-title" style="margin-top:0">Payment Required</h3>
          <p>Please settle the remaining balance of <strong>${T(e.balance)}</strong> for ticket <strong>${m(e.ticket)}</strong> before claiming.</p>
          <form class="claim-payment-form" style="display:flex; flex-direction:column; gap:8px;" data-order-id="${e.id}">
            <label style="display:flex; flex-direction:column; gap:4px; font-weight:bold;">Amount to Pay
              <input name="amount" type="number" min="${e.balance}" step="0.01" value="${e.balance}" required />
            </label>
            <label style="display:flex; flex-direction:column; gap:4px; font-weight:bold;">Payment Method
              <select name="method">
                <option value="cash">Cash</option>
                <option value="gcash">GCash</option>
              </select>
            </label>
            <label style="display:flex; flex-direction:column; gap:4px; font-weight:bold;" hidden>GCash Reference
              <input name="reference" placeholder="Required for GCash" />
            </label>
            <button class="primary" type="submit" style="margin-top:8px">Pay & Claim</button>
          </form>
        </div>
      </div>
    </div>
  `:""}function Ve(e,t){const n=t.reduce((i,o)=>i+Number(o.amount),0),a=Math.max(0,Number((n-e.totalAmount).toFixed(2))),s=Oe(e),r=s.charAt(0).toUpperCase()+s.slice(1);return`
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="receipt-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-open-printer-panel>Printer</button>
          <button class="primary" type="button" data-thermal-print>${l.printerLoading?"Printing...":"Print Receipt"}</button>
          <button class="secondary" type="button" data-close-receipt>Close</button>
        </div>
        ${l.printerPanelOpen?yn():""}
        <div class="receipt" id="receipt-print-area">
          <div class="receipt-head">
            <h3 id="receipt-title">Laba101</h3>
            <p>${m(e.ticket)}<br>${m(z(e.createdAt))}</p>
          </div>
          ${l.currentUser?`<p class="receipt-staff">Staff: ${m(l.currentUser.name)}</p>`:""}
          <div class="receipt-customer">
            <strong>${m(e.customer)}</strong>
            <span>${m(e.phone??"No phone")}</span>
          </div>
          <div class="summary-list receipt-lines">
            <div><span>Service</span><strong>${m(e.service)}</strong></div>
            ${e.extras.length?`<div><span>Extra services</span><strong>${e.extras.map(i=>`${m(ae(i.name))} x${Number(i.quantity??1)} (${T(Number(i.total??i.price))})`).join(", ")}</strong></div>`:""}
            <div><span>Total</span><strong>${T(e.totalAmount)}</strong></div>
            <div><span>Tendered</span><strong>${T(n)}</strong></div>
            <div><span>Paid</span><strong>${T(e.paidAmount)}</strong></div>
            <div><span>Payment status</span><strong>${r}</strong></div>
            <div><span>Change</span><strong>${T(a)}</strong></div>
            <div><span>Balance</span><strong>${T(e.balance)}</strong></div>
          </div>
          <h3>Payments</h3>
          <div class="receipt-payments">
            ${t.map(i=>`<div><span>${m(i.method.toUpperCase())}</span><strong>${T(i.amount)}</strong>${i.reference?`<small>Ref ${m(i.reference)}</small>`:""}</div>`).join("")||'<p class="helper">No payments yet.</p>'}
          </div>
        </div>
      </div>
    </div>
  `}function yn(){return`
    <div class="printer-panel">
      <div class="printer-panel-head">
        <strong>Bluetooth thermal printer</strong>
        <button class="secondary" type="button" data-refresh-printers>${l.printerLoading?"Scanning...":"Scan paired"}</button>
      </div>
      <div class="printer-fields">
        <label>Printer
          <select data-printer-select>
            <option value="">Select paired printer</option>
            ${l.pairedPrinters.map(e=>`<option value="${m(e.address)}" ${l.selectedPrinterAddress===e.address?"selected":""}>${m(e.name)} - ${m(e.address)}</option>`).join("")}
          </select>
        </label>
        <label>Paper
          <select data-paper-width>
            <option value="58" ${l.printerPaperWidth===58?"selected":""}>58mm</option>
            <option value="80" ${l.printerPaperWidth===80?"selected":""}>80mm</option>
          </select>
        </label>
      </div>
      <div class="printer-actions">
        <button class="secondary" type="button" data-connect-printer>${l.printerLoading?"Connecting...":"Connect & Save"}</button>
      </div>
      ${l.printerStatus?`<p class="printer-status ok">${m(l.printerStatus)}</p>`:""}
      ${l.printerError?`<p class="printer-status warn">${m(l.printerError)}</p>`:""}
    </div>
  `}async function mt(){l.printerLoading=!0,l.printerError="",l.printerStatus="",await S();try{if(!(await fe.requestBluetoothPermissions()).granted)throw new Error("Bluetooth permission was not granted.");const t=await fe.listPairedPrinters();l.pairedPrinters=t.printers??[],l.selectedPrinterAddress=l.selectedPrinterAddress||t.savedAddress||l.pairedPrinters[0]?.address||"",l.printerStatus=l.pairedPrinters.length?"Select a printer, then connect.":"No paired printers found. Pair the printer in Android Bluetooth settings first."}catch(e){l.printerError=e instanceof Error?e.message:"Could not scan paired printers."}finally{l.printerLoading=!1,await S()}}async function fn(){if(!l.selectedPrinterAddress){l.printerError="Select a paired printer first.",await S();return}l.printerLoading=!0,l.printerError="",l.printerStatus="",await S();try{await fe.savePrinter({address:l.selectedPrinterAddress}),await fe.connect({address:l.selectedPrinterAddress}),l.printerStatus="Printer connected and saved."}catch(e){l.printerError=e instanceof Error?e.message:"Printer connection failed."}finally{l.printerLoading=!1,await S()}}function hn(e){const t=(e.serviceLines?.length?e.serviceLines:[{id:e.serviceId,name:e.service,price:e.price,quantity:1,total:e.price}]).map(a=>({name:a.name,quantity:Number(a.quantity||1),price:Number(a.price||0)})),n=e.extras.map(a=>({name:ae(a.name),quantity:Number(a.quantity??1),price:Number(a.price||0)}));return[...t,...n]}async function gn(e,t){const n=t.reduce((s,r)=>s+Number(r.amount),0),a=Math.max(0,Number((n-e.totalAmount).toFixed(2)));l.printerLoading=!0,l.printerError="",l.printerStatus="",await S();try{if(!l.selectedPrinterAddress){const s=await fe.getSavedPrinter();l.selectedPrinterAddress=s.address||""}await fe.printReceipt({address:l.selectedPrinterAddress||void 0,paperWidth:l.printerPaperWidth,storeName:"Laba101",receiptNumber:e.ticket,dateTime:z(e.createdAt),customerName:e.customer,customerPhone:e.phone?.trim()||"No phone",items:hn(e),totalAmount:e.totalAmount,paidAmount:e.paidAmount,changeAmount:a,balanceAmount:e.balance,staffName:l.currentUser?.name?.trim()||"Staff"}),l.printerStatus="Receipt sent to printer."}catch(s){l.printerPanelOpen=!0,l.printerError=s instanceof Error?s.message:"Bluetooth thermal print failed."}finally{l.printerLoading=!1,await S()}}function bn(e,t){const n=l.customerSearch.trim().toLowerCase(),a=e.filter(s=>n?s.name.toLowerCase().includes(n):!1);return`
    <section class="grid content full">
      <article class="panel">
        ${q("Customer Management","Customer records from local offline storage")}
        <form class="search-box" id="customer-search-form">
          <label>
            <span>Search customer name</span>
            <input name="customerSearch" data-customer-search type="search" placeholder="Type the customer name then tap Search" value="${m(l.customerSearch)}" autocomplete="off" />
          </label>
          <div class="search-actions">
            <button class="primary" type="submit">Search</button>
            <button class="secondary" type="button" id="customer-search-clear">Clear</button>
          </div>
        </form>
        <div class="summary-list">
          <div><span>Total customers</span><strong>${e.length}</strong></div>
          <div><span>Matching customers</span><strong>${n?a.length:0}</strong></div>
        </div>
      </article>
      <article class="panel">
        ${q("Customer list","Names, phones, addresses, and order history")}
        <div class="customer-stack">
          ${n?a.map(s=>{const r=t.filter(i=>i.customerId===s.id);return`
              <article class="customer-card">
                <header>
                  <div>
                    <strong>${m(s.name)}</strong>
                    <p>${m(s.phone??"No phone")} · ${m(s.address??"No address")}</p>
                  </div>
                  <span>${r.length} order(s)</span>
                </header>
                <div class="customer-orders">
                  ${r.length?r.map(i=>`
                    <div class="customer-order-row">
                      <div>
                        <strong>${m(i.ticket)}</strong>
                        <span>${m(i.service)} · ${m(i.itemCategory)}</span>
                      </div>
                      <div>
                        <strong>${T(i.totalAmount)}</strong>
                        <span>${m(i.status)}</span>
                      </div>
                    </div>`).join(""):'<p class="helper">No order records yet.</p>'}
                </div>
              </article>`}).join(""):'<div class="helper">Search a customer name to display matching records and their order history.</div>'}
        </div>
      </article>
    </section>
  `}function En(e,t){const n=e.filter(s=>s.serviceType==="order"),a=e.filter(s=>s.serviceType==="addon");return`
    <section class="grid content full">
      <article class="panel">
        ${q("Services","Order services and add-ons used by POS pricing")}
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
            ${Qa.map(s=>`<label class="check"><input type="checkbox" name="includes" value="${s}" /> ${s}</label>`).join("")}
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
        ${q("Item categories","Load limits and extra fees")}
        <form id="category-form" class="form">
          <div class="form-row">
            <label>Name<input name="name" required /></label>
            <label>Max KG<input name="maxKg" type="number" min="0.25" step="0.01" required /></label>
          </div>
          <button class="primary" type="submit">Save category</button>
        </form>
      </article>
      <article class="panel span-2">
        ${q("Services Table","Order services")}
        <div class="table-scroll">
          <div class="table data-table">
            <div class="table-head"><div>Name</div><div>Category</div><div>Price</div><div>Max KG</div><div>Includes</div><div>Status</div><div>Actions</div></div>
            ${n.map(s=>`<div class="table-row"><div><strong>${m(s.name)}</strong></div><div>${m(s.category)}</div><div>${T(s.price)}</div><div>${s.maxKg} kg</div><div>${m(s.includes.join(", ")||"none")}</div><div>${s.isActive?"Active":"Inactive"}</div><div class="row-actions"><button class="secondary edit-service-btn" data-id="${s.id}">Edit</button>${s.isActive?`<button class="secondary deactivate-service-btn" data-id="${s.id}">Deactivate</button>`:`<button class="secondary activate-service-btn" data-id="${s.id}">Activate</button>`}</div></div>`).join("")||'<div class="helper">No order services yet.</div>'}
          </div>
        </div>
        <div class="section-divider"></div>
        ${q("Extra Services Table","Add-on services")}
        <div class="table-scroll">
          <div class="table data-table extra-services-table">
            <div class="table-head"><div>Name</div><div>Category</div><div>Price</div><div>Includes</div><div>Status</div><div>Actions</div></div>
            ${a.map(s=>`<div class="table-row"><div><strong>${m(s.name)}</strong></div><div>${m(s.category)}</div><div>${T(s.price)}</div><div>${m(s.includes.join(", ")||"none")}</div><div>${s.isActive?"Active":"Inactive"}</div><div class="row-actions"><button class="secondary edit-service-btn" data-id="${s.id}">Edit</button>${s.isActive?`<button class="secondary deactivate-service-btn" data-id="${s.id}">Deactivate</button>`:`<button class="secondary activate-service-btn" data-id="${s.id}">Activate</button>`}</div></div>`).join("")||'<div class="helper">No extra services yet.</div>'}
          </div>
        </div>
      </article>
    </section>
  `}function Sn(e,t){const n=j(),a=n.slice(0,7),s=l.currentUser?.role==="admin",r=Array.from(new Set([...Ja,...e.map(u=>u.category).filter(Boolean)])),i=e.filter(u=>ne(u)==="daily"&&u.expenseDate===n).reduce((u,v)=>u+v.amount,0),o=e.filter(u=>ne(u)==="monthly"&&u.expenseDate.startsWith(a)).reduce((u,v)=>u+v.amount,0),c=t.filter(u=>u.saleDate===n).reduce((u,v)=>u+v.totalAmount,0),d=t.filter(u=>u.saleDate.startsWith(a)).reduce((u,v)=>u+v.totalAmount,0);return`
    <section class="page-head">
      <div>
        <h2>Daily Report</h2>
      </div>
      <div class="segmented">
        <button class="${l.dailyReportTab==="expenses"?"is-active":""}" data-report-tab="expenses" type="button">Disbursements</button>
        <button class="${l.dailyReportTab==="sales"?"is-active":""}" data-report-tab="sales" type="button">Daily Sales</button>
      </div>
    </section>
    <section class="grid stats compact report-stats">
      <div class="panel stat"><div class="card-label">Daily disbursement</div><div class="value">${T(i)}</div></div>
      <div class="panel stat"><div class="card-label">Monthly disbursement</div><div class="value">${T(o)}</div></div>
      <div class="panel stat"><div class="card-label">Today sales input</div><div class="value">${T(c)}</div></div>
      <div class="panel stat"><div class="card-label">Month sales input</div><div class="value">${T(d)}</div></div>
    </section>
    ${l.dailyReportTab==="expenses"?`
    <section class="grid content full">
      <article class="panel">
        ${q("Input disbursement","Supplies, utilities, and cash disbursements")}
        <form id="expense-form" class="form">
          <input name="id" type="hidden" />
          <label>Disbursement Type
            <div class="segmented disbursement-type-toggle">
              <button class="is-active" data-expense-type="daily" type="button">Daily</button>
              <button data-expense-type="monthly" type="button">Monthly</button>
            </div>
            <input name="disbursementType" type="hidden" value="daily" />
          </label>
          <div class="form-row">
            <label class="expense-date-field">Date<input name="expenseDate" type="date" value="${j()}" required /></label>
            <label class="expense-month-field" hidden>Month<input name="expenseMonth" type="month" value="${Be()}" /></label>
            <label>Amount<input name="amount" type="number" min="0" step="0.01" required placeholder="0.00" /></label>
          </div>
          <div class="form-row"><label>Title / Name<input name="name" required /></label><label>Category<select name="category" required>${r.map(u=>`<option value="${m(u)}">${m(u)}</option>`).join("")}</select></label></div>
          <label>Description<textarea name="description"></textarea></label>
          <button class="primary" type="submit">Save expense</button>
        </form>
      </article>
      <article class="panel">
        ${q("Disbursement list","Expenses only")}
        <div class="table-scroll daily-report-scroll">
          <div class="table daily-report-table">
            <div class="table-head"><div>Date/Month</div><div>No.</div><div>Name</div><div>Category</div><div>Amount</div><div>Action</div></div>
            ${e.map(u=>`<div class="table-row"><div>${m(Ot(u))}<div class="small">${m(ne(u))}</div></div><div>${m(u.number)}</div><div>${m(u.name)}</div><div>${m(u.category)}</div><div>${T(u.amount)}</div><div class="row-actions"><button class="secondary edit-expense-btn" data-id="${u.id}" type="button">Edit</button>${s?`<button class="secondary delete-expense-btn" data-id="${u.id}" type="button">Delete</button>`:""}</div></div>`).join("")||'<div class="helper">No expenses yet.</div>'}
          </div>
        </div>
      </article>
    </section>
    `:`
    <section class="grid content full">
      <article class="panel">
        ${q("Input total sale","Manual cash and GCash totals")}
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
        ${q("Daily sales history","Cash, GCash, total sale, notes, and updates")}
        <div class="table-scroll daily-report-scroll">
          <div class="table wide-table daily-report-table">
            <div class="table-head"><div>Sales #</div><div>Date</div><div>Cash</div><div>GCash</div><div>Total sale</div><div>Action</div></div>
            ${t.map(u=>`<div class="table-row"><div>${m(u.saleNumber)}</div><div>${m(u.saleDate)}</div><div>${T(u.cashAmount)}</div><div>${T(u.gcashAmount)}</div><div><strong>${T(u.totalAmount)}</strong></div><div class="row-actions"><button class="secondary edit-sale-btn" data-id="${u.id}" type="button">Edit</button>${s?`<button class="secondary delete-sale-btn" data-id="${u.id}" type="button">Delete</button>`:""}</div></div>`).join("")||'<div class="helper">No daily sales totals yet.</div>'}
          </div>
        </div>
      </article>
    </section>
    `}
  `}function Tn(e,t,n,a,s,r,i,o,c,d){const u=l.reportPreview?xt(e,t,n,a,s,r,i,l.reportPreview):null;return`
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
            <label>From<input name="dateFrom" data-date-from type="date" value="${j()}" /></label>
            <label>To<input name="dateTo" data-date-to type="date" value="${j()}" /></label>
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
    ${u?`
      <section class="panel report-preview">
        ${u.selectedTypes.has("sales")?`
          <article>
            ${q("Sales report preview",`${u.selection.from} to ${u.selection.to}`)}
            <div class="table wide-table report-preview-table sales-table">
              <div class="table-head report-table-head"><div>Ticket</div><div>Customer</div><div>Cash</div><div>GCash</div><div>Total Payment</div></div>
              ${u.salesRows().transactions.map(v=>`<div class="table-row report-table-row"><div>${m(v.ticket)}</div><div>${m(v.customer)}</div><div>${T(v.cash)}</div><div>${T(v.gcash)}</div><div>${T(v.total)}</div></div>`).join("")}
            </div>
            <div class="sales-summary-section">
              <h3>Sales Summary</h3>
              <div class="table sales-summary-table">
                <div class="table-head"><div>Sales Type</div><div>Cash</div><div>GCash</div><div>Sales</div></div>
                <div class="table-row"><div>Orders</div><div>${T(u.salesRows().orderCashTotal)}</div><div>${T(u.salesRows().orderGcashTotal)}</div><div>${T(u.salesRows().orderCashTotal+u.salesRows().orderGcashTotal)}</div></div>
                <div class="table-row"><div>Whole Sale Day</div><div>${T(u.salesRows().manualCashTotal)}</div><div>${T(u.salesRows().manualGcashTotal)}</div><div>${T(u.salesRows().manualCashTotal+u.salesRows().manualGcashTotal)}</div></div>
                <div class="table-row total-row"><div>Total</div><div>${T(u.salesRows().totalCash)}</div><div>${T(u.salesRows().totalGcash)}</div><div>${T(u.salesRows().totalSales)}</div></div>
              </div>
            </div>
          </article>`:""}
        ${u.selectedTypes.has("disbursement")?`
          <article>
            ${q("Disbursement preview",`${u.selection.from} to ${u.selection.to}`)}
            <div class="table wide-table report-preview-table report-disbursement-table">
              <div class="table-head report-table-head"><div>ID#</div><div>Date/Month</div><div>Type</div><div>Name</div><div>Category</div><div>Amount</div></div>
              ${u.disbursementRows().rows.slice(1).filter(v=>v.length&&v[0]!=="Total Disbursement").map(v=>`<div class="table-row report-table-row"><div>${m(v[1]??"")}</div><div>${m(v[0]??"")}</div><div>${m(v[2]??"")}</div><div>${m(v[3]??"")}</div><div>${m(v[4]??"")}</div><div>${T(v[6])}</div></div>`).join("")}
            </div>
            <div class="disbursement-total">
              <strong>Total Disbursement: ${T(u.disbursementRows().totalDisbursement)}</strong>
            </div>
          </article>`:""}
        ${u.selectedTypes.has("fold_count")?`
          <article>
            ${q("Fold Count preview",`${u.selection.from} to ${u.selection.to}`)}
            <div class="table report-preview-table">
              <div class="table-head"><div>Staff</div><div>Fold Count</div></div>
              ${u.foldCountRows().rows.slice(1).map(v=>`<div class="table-row">${v.map(f=>`<div>${m(f??"")}</div>`).join("")}</div>`).join("")}
            </div>
          </article>`:""}
        ${u.selectedTypes.has("revolving_fund")?`
          <article>
            ${q("Revolving Fund — Daily Summary",`${u.selection.from} to ${u.selection.to}`)}
            ${De(["Date of Sales","Cash on Hand","Status","Date Update"],u.revolvingDailySummaryRows().rows.slice(1).map(v=>[m(String(v[0]??"")),m(String(v[1]??"")),m(String(v[2]??"")),m(String(v[3]??""))]),"data-table revolving-report-table")}
          </article>
          <article>
            ${q("Revolving Fund — Table History",`${u.selection.from} to ${u.selection.to}`)}
            ${De(["Date","Number","Name","Amount","Category","Description","Type"],u.revolvingHistoryRows().rows.slice(1).map(v=>[m(String(v[0]??"")),m(String(v[1]??"")),m(String(v[2]??"")),m(String(v[3]??"")),m(String(v[4]??"")),m(String(v[5]??"")),m(String(v[6]??""))]),"data-table revolving-report-table")}
          </article>`:""}
        ${u.selectedTypes.has("summary")?`
          <article>
            ${q("Summary preview",`${u.selection.from} to ${u.selection.to}`)}
            <div class="summary-cards-grid summary-single-row">
              <div class="summary-card"><span class="card-label">Total Sales</span><div class="card-details"><span>Total Cash: ${T(u.salesRows().totalCash)}</span><span>Total GCash: ${T(u.salesRows().totalGcash)}</span></div><strong>${T(u.salesRows().totalSales)}</strong></div>
              <div class="summary-card"><span class="card-label">Total Disbursement</span><strong>${T(u.disbursementRows().totalDisbursement)}</strong></div>
              <div class="summary-card"><span class="card-label">Cash on Hand</span><strong>${T(Pe(u.salesRows().totalCash,u.disbursementRows().totalDisbursement))}</strong></div>
            </div>
          </article>`:""}
      </section>
    `:""}
  `}function wn(e){return`
    <section class="grid content full">
      <article class="panel span-2">
        ${q("Activity Logs","Recorded staff actions and timestamps")}
        <div class="table-scroll">
          <div class="table wide-table">
            <div class="table-head"><div>Timestamp</div><div>Staff</div><div>Action</div><div>Details</div></div>
            ${e.map(t=>`<div class="table-row"><div>${z(t.timestamp)}</div><div>${m(t.staffName)}</div><div><strong>${m(t.action)}</strong></div><div>${m(t.details)}</div></div>`).join("")||'<div class="helper">No logs yet.</div>'}
          </div>
        </div>
      </article>
    </section>
  `}function Nn(e,t,n){return`
    <section class="grid content full">
      <article class="panel">
        ${q("Inventory Item","Custom stocks and supplies")}
        <form id="inventory-form" class="form">
          <input name="id" type="hidden" />
          <label>Item name<input name="name" required placeholder="e.g. Finishing Spray 60ml" /></label>
          <div class="form-row">
            <label>Unit<input name="unit" required placeholder="pcs, bottle, pack" /></label>
            <label>Quantity<input name="quantity" type="number" step="0.01" min="0" required value="0" /></label>
          </div>
          <label>Reorder level<input name="reorderLevel" type="number" step="0.01" min="0" value="0" /></label>
          <label>Notes<textarea name="notes" placeholder="Supplier, storage, or remarks"></textarea></label>
          <input name="branch" type="hidden" value="${m(n)}" />
          <button class="primary" type="submit">Save item</button>
        </form>
      </article>
      <article class="panel span-2">
        ${q("Stock List","Editable branch inventory")}
        <div class="table-scroll">
          <div class="table wide-table">
            <div class="table-head"><div>Item</div><div>Qty</div><div>Unit</div><div>Reorder</div><div>Status</div><div>Updated</div><div>Action</div></div>
            ${e.map(a=>`<div class="table-row"><div><strong>${m(a.name)}</strong><div class="small">${m(a.notes??"")}</div></div><div>${a.quantity}</div><div>${m(a.unit)}</div><div>${a.reorderLevel}</div><div class="${a.quantity<=a.reorderLevel?"warn":"ok"}">${a.quantity<=a.reorderLevel?"Low stock":"OK"}</div><div>${z(a.updatedAt)}</div><div><button class="secondary edit-inventory-btn" type="button" data-id="${a.id}">Edit</button></div></div>`).join("")||'<div class="helper">No inventory items yet.</div>'}
          </div>
        </div>
      </article>
      <article class="panel">
        ${q("Stock In / Stock Out","Adjust inventory quantities")}
        <form id="inventory-movement-form" class="form">
          <label>Item<select name="itemId" required>
            <option value="">Select item</option>
            ${e.map(a=>`<option value="${a.id}">${m(a.name)} (${a.quantity} ${m(a.unit)})</option>`).join("")}
          </select></label>
          <div class="segmented">
            <label><input type="radio" name="movementType" value="in" checked /> Stock-in</label>
            <label><input type="radio" name="movementType" value="out" /> Stock-out</label>
          </div>
          <label>Quantity<input name="quantity" type="number" step="0.01" min="0.01" required /></label>
          <label>Notes<textarea name="notes" placeholder="Reason, supplier, or usage"></textarea></label>
          <button class="primary" type="submit">Save movement</button>
        </form>
      </article>
      <article class="panel span-2">
        ${q("Stock Movement History","Recent stock-in and stock-out records")}
        <div class="table-scroll">
          <div class="table wide-table">
            <div class="table-head"><div>Date</div><div>Item</div><div>Type</div><div>Qty</div><div>Staff</div><div>Notes</div></div>
            ${t.map(a=>`<div class="table-row"><div>${z(a.createdAt)}</div><div>${m(a.itemName)}</div><div class="${a.movementType==="in"?"ok":"warn"}">${a.movementType==="in"?"Stock-in":"Stock-out"}</div><div>${a.quantity}</div><div>${m(a.staffName)}</div><div>${m(a.notes??"")}</div></div>`).join("")||'<div class="helper">No stock movements yet.</div>'}
          </div>
        </div>
      </article>
    </section>
  `}function An(e,t,n){const a=e.filter(o=>o.status!=="under_cleaning"),s=e.filter(o=>o.status==="under_cleaning"),r=Array.from({length:14},(o,c)=>{const d=new Date;d.setDate(d.getDate()-c);const u=oe(d),v=t.filter(f=>f.date===u);return{key:u,records:v}}),i=t.some(o=>o.date===j()&&o.cleaningType==="general");return`
    <section class="page-head">
      <div>
        <h2>Maintenance & Cleaning</h2>
        <p class="meta">Manage machine tube cleaning, general cleaning, and maintenance records.</p>
      </div>
      <div class="segmented">
        <button class="${l.maintenanceTab==="cleaning"?"is-active":""}" data-maintenance-tab="cleaning" type="button">Tube Cleaning</button>
        <button class="${l.maintenanceTab==="machines"?"is-active":""}" data-maintenance-tab="machines" type="button">Machine Management</button>
      </div>
    </section>
    ${l.maintenanceTab==="cleaning"?`
    <section class="grid content full">
      <article class="panel">
        ${q("Available Machines","Select machines to start cleaning.")}
        <form id="subcleaning-form" class="form">
          <input type="hidden" name="date" value="${j()}" />
          <fieldset class="machine-list">
            ${a.map(o=>`<label class="machine-card"><input type="checkbox" name="machineIds" value="${o.id}" /><span><strong>${m(o.machineName)}</strong><small>${m(o.machineType)}</small></span><em></em></label>`).join("")||'<p class="helper">All machines are currently being cleaned.</p>'}
          </fieldset>
          <input type="hidden" name="cleaningStatus" value="in_progress" />
          <input type="hidden" name="cleaningType" value="tube" />
          <label>Notes <textarea name="notes" placeholder="e.g. Deep clean filters"></textarea></label>
          <input type="hidden" name="branch" value="${m(n)}" />
          <button class="primary" type="submit">Start Tube Cleaning</button>
        </form>
      </article>
      <article class="panel">
        ${q("General Cleaning","Confirm general cleaning for today")}
        <div class="summary-list">
          <div><span>Today</span><strong>${i?"Confirmed":"Pending"}</strong></div>
        </div>
        <button class="primary" type="button" id="confirm-general-cleaning" ${i?"disabled":""}>Confirm General Cleaning</button>
      </article>
      <article class="panel warning-panel">
        ${q("Under Cleaning","Machines currently being serviced.")}
        <div class="machine-stack">
          ${s.length?s.map(o=>`
            <div class="machine-status">
              <span><strong>${m(o.machineName)}</strong><small>${m(o.machineType)}</small></span>
              <b>In progress</b>
              <button class="secondary complete-cleaning-btn" type="button" data-machine-id="${o.id}" data-branch="${m(n)}">Mark Complete</button>
            </div>`).join(""):'<p class="helper">No machines under cleaning right now.</p>'}
        </div>
      </article>
      <article class="panel span-2">
        ${q("Tube Cleaning Checklist","Track which machines have been cleaned today.")}
        <div class="table">
          <div class="table-head"><div>Machine</div><div>Type</div><div>Status</div><div>Notes</div><div>Date</div></div>
          ${e.map(o=>{const c=t.find(d=>d.machineIds.includes(o.id)&&d.date===j());return`<div class="table-row"><div><strong>${m(o.machineName)}</strong></div><div>${m(o.machineType)}</div><div>${c?m(c.cleaningStatus.replace("_"," ")):"Not Cleaned"}</div><div>${m(c?.notes??"-")}</div><div>${j()}</div></div>`}).join("")}
        </div>
      </article>
      <article class="panel span-2">
        ${q("Cleaning Calendar","Recent days with tube or general cleaning")}
        <div class="maintenance-calendar">
          ${r.map(o=>`<div class="calendar-day ${o.records.length?"has-records":""}"><strong>${m(o.key)}</strong><span>${o.records.some(c=>c.cleaningType==="general")?"General cleaning":""}</span><small>${o.records.filter(c=>c.cleaningType!=="general").length?`${o.records.filter(c=>c.cleaningType!=="general").length} tube record(s)`:"No tube records"}</small></div>`).join("")}
        </div>
      </article>
    </section>
    `:`
    <section class="grid content full">
      <article class="panel">
        ${q("Add Machine","Create washer and dryer records")}
        <form id="machine-form" class="form">
          <label>Machine Name<input name="machineName" required placeholder="e.g. Washer 5" /></label>
          <label>Type<select name="machineType"><option value="washer">Washer</option><option value="dryer">Dryer</option></select></label>
          <label>Status<select name="status"><option value="available">Available</option><option value="under_cleaning">Under Cleaning</option><option value="maintenance">Maintenance</option></select></label>
          <input type="hidden" name="branch" value="${m(n)}" />
          <button class="primary" type="submit">Add machine</button>
        </form>
      </article>
      <article class="panel">
        ${q("Machines","Washer and dryer status")}
        <div class="table">
          <div class="table-head"><div>Name</div><div>Type</div><div>Status</div><div>Branch</div><div>Actions</div></div>
          ${e.map(o=>`<div class="table-row"><div><strong>${m(o.machineName)}</strong></div><div>${m(o.machineType)}</div><div>${m(o.status.replace("_"," "))}</div><div>${m(o.branch)}</div>
          <div class="row-actions">
            ${o.status!=="inactive"?`<button class="secondary deactivate-machine-btn" data-id="${o.id}">Deactivate</button>`:`<button class="secondary activate-machine-btn" data-id="${o.id}">Activate</button>`}
          </div></div>`).join("")||'<div class="helper">No machines found.</div>'}
        </div>
      </article>
    </section>
    `}
  `}function Ln(e,t){return`
    <section class="grid">
      <div class="page-head">
        <div>
          <p class="eyebrow">Team Management</p>
          <h2>Staff Overview</h2>
        </div>
        <button class="primary" id="open-add-staff-modal" type="button">+ Add staff</button>
      </div>

      <article class="panel">
        ${q("Staff list","Branch: "+m(t))}
        <div class="table-scroll">
          <div class="table data-table">
            <div class="table-head"><div>Name</div><div>Email</div><div>Role</div><div>Branch</div><div>Status</div><div>Actions</div></div>
            ${e.length?e.map(n=>`<div class="table-row"><div><strong>${m(n.name)}</strong></div><div>${m(n.email)}</div><div>${m(n.role)}</div><div>${m(n.branch)}</div><div>${n.isActive!==0?"Active":"Inactive"}</div>
            <div class="row-actions">
              <button class="secondary edit-staff-btn" data-id="${n.id}">Edit</button>
              ${n.isActive!==0?`<button class="secondary deactivate-staff-btn" data-id="${n.id}">Deactivate</button>`:`<button class="secondary activate-staff-btn" data-id="${n.id}">Activate</button>`}
            </div></div>`).join(""):'<div class="helper" style="padding:18px 0">No staff records yet. Click <strong>+ Add staff</strong> to create one.</div>'}
          </div>
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
                ${["Main Store","Mintal Branch","Gensan Branch"].map(n=>`<option value="${n}" ${n===t?"selected":""}>${n}</option>`).join("")}
              </select>
            </label>
          </div>
          <button class="primary" id="staff-save-btn" type="submit">Save staff member</button>
        </form>
      </div>
    </div>
  `}function $n(e,t,n){return`
    <section class="grid content full">
      <article class="panel">
        ${q("Settings","Device-local configuration")}
        <form id="settings-form" class="form">
          <label>Current branch<select name="branch">
            ${["Main Store","Mintal Branch","Gensan Branch"].map(a=>`<option value="${a}" ${a===e?"selected":""}>${a}</option>`).join("")}
          </select></label>
          <label>Report email<input name="reportEmail" type="email" placeholder="admin@laba101.test" value="${m(n)}" /></label>
          <button class="primary" type="submit">Save settings</button>
        </form>
      </article>
    </section>
  `}function Cn(){const e=()=>{localStorage.removeItem(Ee),l.currentUser=null,l.tab="dashboard",l.receiptOrderId=0,l.sidebarOpen=!1,S()};document.querySelector("#logout-button")?.addEventListener("click",e),document.querySelector("#mobile-logout-button")?.addEventListener("click",e),document.querySelector("#mobile-menu-button")?.addEventListener("click",()=>{l.sidebarOpen=!0,S()}),document.querySelector("#sidebar-close-button")?.addEventListener("click",()=>{l.sidebarOpen=!1,S()}),document.querySelector("#sidebar-backdrop")?.addEventListener("click",()=>{l.sidebarOpen=!1,S()}),document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{l.tab=t.dataset.tab,l.receiptOrderId=0,l.sidebarOpen=!1,S()})}),document.querySelectorAll("[data-quick-tab]").forEach(t=>{t.addEventListener("click",()=>{l.tab=t.dataset.quickTab,S()})}),document.querySelectorAll("[data-receipt]").forEach(t=>{t.addEventListener("click",()=>{l.receiptOrderId=Number(t.dataset.receipt),l.printerPanelOpen=!1,l.printerError="",l.printerStatus="",S()})}),document.querySelector("[data-close-receipt]")?.addEventListener("click",()=>{l.receiptOrderId=0,S()}),document.querySelector("[data-open-printer-panel]")?.addEventListener("click",()=>{l.printerPanelOpen=!l.printerPanelOpen,l.printerPanelOpen&&l.pairedPrinters.length===0?mt():S()}),document.querySelector("[data-refresh-printers]")?.addEventListener("click",()=>{mt()}),document.querySelector("[data-printer-select]")?.addEventListener("change",t=>{l.selectedPrinterAddress=t.currentTarget.value,S()}),document.querySelector("[data-paper-width]")?.addEventListener("change",t=>{l.printerPaperWidth=Number(t.currentTarget.value)===80?80:58,S()}),document.querySelector("[data-connect-printer]")?.addEventListener("click",()=>{fn()}),document.querySelector("[data-thermal-print]")?.addEventListener("click",()=>{(async()=>{const t=await Pt(),n=t.orders.find(s=>s.id===l.receiptOrderId);if(!n)throw new Error("Receipt order not found.");const a=t.payments.filter(s=>s.orderId===n.id);await gn(n,a)})().catch(t=>{l.printerPanelOpen=!0,l.printerError=t instanceof Error?t.message:"Bluetooth thermal print failed.",S()})}),document.querySelector("[data-open-daily-summary]")?.addEventListener("click",()=>{l.dashboardSummaryModalOpen=!0,S()}),document.querySelector("[data-close-daily-summary]")?.addEventListener("click",()=>{l.dashboardSummaryModalOpen=!1,S()}),document.querySelector("[data-print-modal]")?.addEventListener("click",()=>{window.print()}),document.querySelectorAll("[data-report-tab]").forEach(t=>{t.addEventListener("click",()=>{l.dailyReportTab=t.dataset.reportTab,S()})}),document.querySelectorAll("[data-maintenance-tab]").forEach(t=>{t.addEventListener("click",()=>{l.maintenanceTab=t.dataset.maintenanceTab,S()})})}function Rn(){cn(),document.querySelector("#login-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget),n=document.querySelector("#login-button");n&&(n.disabled=!0,n.textContent="Signing in...");try{const a=await Et(String(t.get("email")??""),String(t.get("password")??""));if(!a){l.loginError="Invalid email or password.",await S();return}l.currentUser=a,l.loginError="",await Ne("branch",String(a.branch||"Main Store")),t.get("remember")?localStorage.setItem(Ee,JSON.stringify({email:a.email,remembered:!0})):localStorage.removeItem(Ee),It().includes(l.tab)||(l.tab="dashboard"),await S()}catch(a){alert("Login Error: "+String(a?.message||a)),n&&(n.disabled=!1,n.textContent="Sign in")}})}function On(){Te&&window.clearInterval(Te);const e=document.querySelector("[data-navbar-time]"),t=document.querySelector("[data-navbar-date]");if(!e||!t){Te=void 0;return}const n=()=>{const a=nn();e.textContent=a.time,t.textContent=a.date};n(),Te=window.setInterval(n,1e3)}function vt(e,t){return e?t.find(n=>n.name.toLowerCase()===e.category.toLowerCase())??t.find(n=>n.name==="Regular Clothes")??t[0]??null:null}function Ue(e,t){return Math.max(1,Number(t.maxKg||e.maxKg||1))}function Ft(e,t){return Object.fromEntries(t.filter(n=>n.serviceType==="order").map(n=>[n.id,Number(e.querySelector(`input[name="serviceQty-${n.id}"]`)?.value??0)]).filter(([,n])=>Number(n)>0))}function pt(e,t){const n=Ft(e,t);return t.filter(a=>a.serviceType==="order"&&Number(n[a.id]??0)>0).map(a=>({...a,quantity:Number(n[a.id])}))}function Ut(e,t){return Object.fromEntries(t.filter(n=>n.serviceType==="addon").map(n=>[n.id,Number(e.querySelector(`input[name="addonQty-${n.id}"]`)?.value??0)]).filter(([,n])=>Number(n)>0))}function yt(e,t){const n=Ut(e,t);return t.filter(a=>a.serviceType==="addon"&&Number(n[a.id]??0)>0).map(a=>({...a,quantity:Number(n[a.id])}))}function Dn(e){const t=document.querySelector("#order-form"),n=document.querySelector("#price-preview"),a=t?.querySelector('button[type="submit"]'),s=document.querySelector("#customer-name-input"),r=document.querySelector("#customer-id-input"),i=document.querySelector("#customer-phone-input"),o=document.querySelector("#customer-suggestions"),c=t?.querySelector("[data-order-error]"),d=t?.querySelector('select[name="paymentMethod"]'),u=t?.querySelector(".gcash-reference"),v=t?.querySelector('input[name="paymentReference"]');let f=!1,y;const N=p=>{if(!o||!s)return;const b=p.trim().toLowerCase();if(!b){o.hidden=!0;return}const E=e.customers.filter(x=>x.name.toLowerCase().includes(b)||(x.phone??"").includes(b)).slice(0,8),P=`<div class="ac-item ac-add" data-ac-new="true"><strong>+ Add new: "${m(p.trim())}"</strong></div>`,$=E.map(x=>`<div class="ac-item" data-ac-id="${x.id}" data-ac-name="${m(x.name)}" data-ac-phone="${m(x.phone??"")}"><strong>${m(x.name)}</strong>${x.phone?`<span>${m(x.phone)}</span>`:""}</div>`).join("");o.innerHTML=$+P,o.hidden=!1};s?.addEventListener("input",()=>{r&&(r.value=""),clearTimeout(y),y=window.setTimeout(()=>N(s.value),150)}),s?.addEventListener("focus",()=>{s.value.trim()&&N(s.value)}),o?.addEventListener("click",p=>{const b=p.target.closest(".ac-item");b&&(b.dataset.acNew==="true"?r&&(r.value=""):(s&&(s.value=b.dataset.acName??""),i&&(i.value=b.dataset.acPhone??""),r&&(r.value=b.dataset.acId??"")),o&&(o.hidden=!0))}),document.addEventListener("click",p=>{o&&!o.contains(p.target)&&p.target!==s&&(o.hidden=!0)});const A=()=>{const p=d?.value==="gcash";u&&(u.hidden=!p),v&&(v.required=p,p||(v.value=""))},g=(p,b)=>{if(!t)return;const E=t.querySelector(`input[name="${p}"]`);E&&(E.value=String(Math.max(0,Number(E.value||0)+b)),E.closest(".qty-card")?.classList.toggle("is-selected",Number(E.value)>0),E.dispatchEvent(new Event("input",{bubbles:!0})))};t?.querySelectorAll(".qty-control input").forEach(p=>{p.addEventListener("input",()=>{p.value=String(Math.max(0,Number(p.value||0))),p.closest(".qty-card")?.classList.toggle("is-selected",Number(p.value)>0)})}),t?.querySelectorAll("[data-qty-card]").forEach(p=>{p.addEventListener("click",b=>{const E=b.target;E.closest("input")||E.closest("button")||g(p.dataset.qtyCard??"",1)})}),t?.querySelectorAll("[data-qty-plus]").forEach(p=>{p.addEventListener("click",()=>g(p.dataset.qtyPlus??"",1))}),t?.querySelectorAll("[data-qty-minus]").forEach(p=>{p.addEventListener("click",()=>g(p.dataset.qtyMinus??"",-1))});const R=()=>{if(!t||!n)return;const p=pt(t,e.services),b=p[0],E=vt(b,e.categories),P=yt(t,e.services),$=p.length>0&&b&&E,x=P.length>0;if(!$&&!x){a&&(a.disabled=!0),c&&(c.hidden=!f,c.textContent=f?"Please select at least one service or extra service.":""),n.innerHTML='<div class="preview-total"><span>Total amount</span><strong>PHP 0.00</strong></div>';return}if($){const D=Ae(p,E,Ue(b,E),P),I=D.serviceLines.map(M=>`${M.name} x${M.quantity}`),k=D.extras.map(M=>`${ae(M.name)} x${M.quantity}`);a&&(a.disabled=!1),c&&(c.hidden=!0,c.textContent=""),n.classList.remove("has-error"),n.innerHTML=`
        <div class="preview-line"><span>Services${I.length?` (${m(I.join(", "))})`:""}</span><strong>${T(D.price)}</strong></div>
        ${D.extraServiceAmount>0?`<div class="preview-line"><span>Extra services${k.length?` (${m(k.join(", "))})`:""}</span><strong>${T(D.extraServiceAmount)}</strong></div>`:""}
        <div class="preview-total"><span>Total amount</span><strong>${T(D.totalAmount)}</strong></div>
      `}else{const D=P.reduce((k,M)=>k+M.price*(M.quantity??1),0),I=P.map(k=>`${ae(k.name)} x${k.quantity??1}`);a&&(a.disabled=!1),c&&(c.hidden=!0,c.textContent=""),n.classList.remove("has-error"),n.innerHTML=`
        <div class="preview-line"><span>Extra services (${m(I.join(", "))})</span><strong>${T(D)}</strong></div>
        <div class="preview-total"><span>Total amount</span><strong>${T(D)}</strong></div>
      `}};d?.addEventListener("change",A),A(),t?.addEventListener("input",R),t?.addEventListener("change",R),R(),t?.addEventListener("submit",async p=>{p.preventDefault(),f=!0;const b=new FormData(t),E=pt(t,e.services),P=E[0],$=vt(P,e.categories),x=yt(t,e.services),D=E.length>0&&P&&$,I=x.length>0;if(!D&&!I){c&&(c.hidden=!1,c.textContent="Please select at least one service or extra service.");return}const k=E.map(B=>`${B.name} x${B.quantity}`).join(", "),M=D?Ae(E,$,Ue(P,$),x):Ae([],e.categories[0],1,x);if(confirm(`Save this order?

Services: ${k}
Total: ${T(M.totalAmount)}`))try{const B=await wa({customerId:Number(b.get("customerId"))||void 0,customerName:String(b.get("customerName")??""),customerPhone:String(b.get("customerPhone")??"")||null,serviceQuantities:Ft(t,e.services),branch:e.branch,itemCategoryId:$?.id??e.categories[0].id,weightKg:P&&$?Ue(P,$):1,addonQuantities:Ut(t,e.services),paidAmount:Number(b.get("paidAmount")??0),paymentMethod:String(b.get("paymentMethod")??"cash"),paymentReference:String(b.get("paymentReference")??"")||null,notes:String(b.get("notes")??"")||null});await Y("Create order",`${B.ticket} ${T(B.totalAmount)}`),l.receiptOrderId=B.id,await S()}catch(B){c&&(c.hidden=!1,c.textContent=B instanceof Error?B.message:"Order could not be saved.")}}),document.querySelectorAll(".advance-form").forEach(p=>{p.addEventListener("submit",async b=>{b.preventDefault();const E=Number(p.dataset.orderId),P=p.dataset.action==="claim",$=Number(p.dataset.balance||0);if(P&&$>0){alert("Please complete the balance before claiming this order.");return}const x=new FormData(p),D=x.getAll("assignedStaffId").map(Number).filter(M=>M>0),I=Number(x.get("releasedBy")||0),k=D.length>0?D:I>0?I:null;await ot(E,k),await Y(P?"Claim order":"Advance order",`Order ID ${E}`),await S()})}),document.querySelectorAll(".claim-payment-form").forEach(p=>{const b=p.querySelector('select[name="method"]'),E=p.querySelector('input[name="reference"]'),P=()=>{const $=b?.value==="gcash";E&&(E.closest("label").hidden=!$,E.required=$,$||(E.value=""))};b?.addEventListener("change",P),P(),p.addEventListener("submit",async $=>{$.preventDefault();const x=new FormData(p),D=Number(x.get("amount"));if(D<=0)return;const I=Number(p.dataset.orderId);await Me(I,{amount:D,method:String(x.get("method")),reference:String(x.get("reference")??"")||null}),await ot(I,null),l.paymentModalOrderId=0,await S()})}),document.querySelectorAll("[data-close-payment-modal]").forEach(p=>{p.addEventListener("click",async()=>{l.paymentModalOrderId=0,await S()})}),document.querySelectorAll(".payment-form").forEach(p=>{const b=p.querySelector('select[name="method"]'),E=p.querySelector('input[name="reference"]'),P=()=>{const $=b?.value==="gcash";E&&(E.hidden=!$,E.required=$,$||(E.value=""))};b?.addEventListener("change",P),P(),p.addEventListener("submit",async $=>{$.preventDefault();const x=new FormData(p),D=Number(x.get("amount")),I=String(x.get("method")),k=String(x.get("reference")??"")||null;confirm(`Confirm payment of ${T(D)} via ${I.toUpperCase()}?`)&&(await Me(Number(p.dataset.orderId),{amount:D,method:I,reference:k}),await Y("Record payment",`${T(D)} ${I.toUpperCase()} for order ID ${p.dataset.orderId}`),await S())})}),document.querySelectorAll("[data-cancel-order]").forEach(p=>{p.addEventListener("click",async()=>{const b=Number(p.dataset.cancelOrder);if(Number.isFinite(b)&&confirm("Cancel this order? (No payment will be refunded.)"))try{l.receiptOrderId===b&&(l.receiptOrderId=0),await La(b),await Y("Cancel order",`Order ID ${b}`),await S()}catch(E){alert(E instanceof Error?E.message:"Cancel failed.")}})}),document.querySelectorAll("[data-delete-order]").forEach(p=>{p.addEventListener("click",async()=>{const b=Number(p.dataset.deleteOrder);if(Number.isFinite(b)&&confirm("Delete this paid order and update sales?"))try{l.receiptOrderId===b&&(l.receiptOrderId=0),await $a(b),await S()}catch(E){alert(E instanceof Error?E.message:"Delete failed.")}})})}function xn(e){document.querySelector("#service-form")?.addEventListener("submit",async t=>{t.preventDefault();const n=new FormData(t.currentTarget),a=n.get("id")?Number(n.get("id")):void 0;await it({id:a,name:String(n.get("name")??""),description:String(n.get("description")??"")||null,category:String(n.get("category")??""),serviceType:String(n.get("serviceType")??"order"),price:Number(n.get("price")??0),maxKg:Number(n.get("maxKg")??0),dryingMinutes:Number(n.get("dryingMinutes"))||null,includes:n.getAll("includes").map(String).filter(Boolean),additionalCharge:0,turnaroundHours:Number(n.get("turnaroundHours")??24),isActive:1}),await S()}),document.querySelectorAll(".edit-service-btn").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.dataset.id),a=e.find(r=>r.id===n),s=document.querySelector("#service-form");a&&s&&(s.querySelector("[name=id]").value=String(a.id),s.querySelector("[name=name]").value=a.name,s.querySelector("[name=category]").value=a.category,s.querySelector("[name=serviceType]").value=a.serviceType,s.querySelector("[name=price]").value=String(a.price),s.querySelector("[name=maxKg]").value=String(a.maxKg),s.querySelector("[name=dryingMinutes]").value=a.dryingMinutes?String(a.dryingMinutes):"",s.querySelectorAll('input[name="includes"]').forEach(r=>{r.checked=a.includes.includes(r.value)}),s.querySelector("[name=turnaroundHours]").value=String(a.turnaroundHours),s.querySelector("[name=description]").value=a.description??"",window.scrollTo({top:0,behavior:"smooth"}))})}),document.querySelectorAll(".deactivate-service-btn, .activate-service-btn").forEach(t=>{t.addEventListener("click",async()=>{const n=Number(t.dataset.id),a=e.find(s=>s.id===n);if(a){const s=a.isActive?0:1;await it({id:a.id,name:a.name,description:a.description,category:a.category,serviceType:a.serviceType,price:a.price,maxKg:a.maxKg,dryingMinutes:a.dryingMinutes,includes:a.includes,additionalCharge:a.additionalCharge,turnaroundHours:a.turnaroundHours,isActive:s}),await S()}})}),document.querySelector("#category-form")?.addEventListener("submit",async t=>{t.preventDefault();const n=new FormData(t.currentTarget);await Sa({name:String(n.get("name")??""),maxKg:Number(n.get("maxKg")??0),additionalFee:Number(n.get("additionalFee")??0),isActive:1}),await S()})}function Pn(e){const t=document.querySelector("#expense-form"),n=t?.querySelector('input[name="disbursementType"]'),a=t?.querySelector(".expense-date-field"),s=t?.querySelector(".expense-month-field"),r=t?.querySelector('input[name="expenseDate"]'),i=t?.querySelector('input[name="expenseMonth"]'),o=c=>{!t||!n||!r||!i||(n.value=c,t.querySelectorAll("[data-expense-type]").forEach(d=>{d.classList.toggle("is-active",d.dataset.expenseType===c)}),a&&(a.hidden=c==="monthly"),s&&(s.hidden=c!=="monthly"),r.required=c==="daily",i.required=c==="monthly",c==="monthly"&&!i.value&&(i.value=Be()),c==="daily"&&!r.value&&(r.value=j()))};t?.querySelectorAll("[data-expense-type]").forEach(c=>{c.addEventListener("click",()=>o(c.dataset.expenseType==="monthly"?"monthly":"daily"))}),o("daily"),t?.addEventListener("submit",async c=>{c.preventDefault();const d=new FormData(c.currentTarget),u=Number(d.get("id")||0),v=String(d.get("disbursementType")??"daily")==="monthly"?"monthly":"daily",f=String(d.get("expenseMonth")??Be()),y={expenseDate:v==="monthly"?`${f}-01`:String(d.get("expenseDate")??""),disbursementType:v,name:String(d.get("name")??""),category:String(d.get("category")??""),description:String(d.get("description")??""),amount:Number(d.get("amount")??0)};if(v==="daily"&&y.expenseDate!==j()){const N=prompt("Admin password is required for non-today disbursement dates.");if(!N||!await an(N)){alert("Admin password is incorrect. Disbursement was not saved.");return}}u?await Fa(u,y):await qa(y),await Y(u?"Update disbursement":"Create disbursement",`${y.expenseDate} ${y.name} ${T(y.amount)}`),await S()}),document.querySelectorAll(".edit-expense-btn").forEach(c=>{c.addEventListener("click",()=>{const d=e.find(v=>v.id===Number(c.dataset.id));if(!d||!t)return;t.querySelector("[name=id]").value=String(d.id),t.querySelector("[name=expenseDate]").value=d.expenseDate,t.querySelector("[name=expenseMonth]").value=Rt(d.expenseDate),o(ne(d)),t.querySelector("[name=amount]").value=String(d.amount),t.querySelector("[name=name]").value=d.name,t.querySelector("[name=category]").value=d.category,t.querySelector("[name=description]").value=d.description??"";const u=t.querySelector('button[type="submit"]');u&&(u.textContent="Update expense"),t.scrollIntoView({behavior:"smooth",block:"start"})})}),document.querySelectorAll(".delete-expense-btn").forEach(c=>{c.addEventListener("click",async()=>{if(l.currentUser?.role!=="admin")return;const d=Number(c.dataset.id);!Number.isFinite(d)||!confirm("Delete this disbursement?")||(await Ua(d),await S())})}),document.querySelector("#fold-form")?.addEventListener("submit",async c=>{c.preventDefault();const d=new FormData(c.currentTarget);await Ra({orderTicket:String(d.get("orderTicket")??""),staffName:String(d.get("staffName")??""),foldCount:Number(d.get("foldCount")??1),rate:Number(d.get("rate")??5)}),await S()})}function In(e,t,n,a,s,r){document.querySelector("#generate-report")?.addEventListener("click",()=>{l.reportPreview=we(),S()});const i=document.querySelector("#sales-form");i?.addEventListener("submit",async A=>{A.preventDefault();const g=new FormData(A.currentTarget);await Ma({id:Number(g.get("id")||0)||void 0,saleDate:String(g.get("saleDate")??""),cashAmount:Number(g.get("cashAmount")??0),gcashAmount:Number(g.get("gcashAmount")??0),notes:String(g.get("notes")??"")}),await S()}),document.querySelectorAll(".edit-sale-btn").forEach(A=>{A.addEventListener("click",()=>{const g=n.find(p=>p.id===Number(A.dataset.id));if(!g||!i)return;i.querySelector("[name=id]").value=String(g.id),i.querySelector("[name=saleDate]").value=g.saleDate,i.querySelector("[name=cashAmount]").value=String(g.cashAmount),i.querySelector("[name=gcashAmount]").value=String(g.gcashAmount),i.querySelector("[name=notes]").value=g.notes??"";const R=i.querySelector('button[type="submit"]');R&&(R.textContent="Update daily sale"),i.scrollIntoView({behavior:"smooth",block:"start"})})}),document.querySelectorAll(".delete-sale-btn").forEach(A=>{A.addEventListener("click",async()=>{if(l.currentUser?.role!=="admin")return;const g=Number(A.dataset.id);!Number.isFinite(g)||!confirm("Delete this daily sale?")||(await Ba(g),await S())})});const o=document.querySelector("[data-date-from]"),c=document.querySelector("[data-date-to]"),d=document.querySelector('[data-date-scope][value="custom"]');o&&d&&o.addEventListener("change",()=>d.checked=!0),c&&d&&c.addEventListener("change",()=>d.checked=!0),document.querySelectorAll("[data-date-scope]").forEach(A=>{A.addEventListener("change",()=>{if(!A.checked||!o||!c)return;const g=new Date,R=oe(g),p=new Date(g);A.value==="week"&&p.setDate(g.getDate()-6),A.value==="month"&&p.setDate(1),A.value!=="custom"&&(o.value=A.value==="today"?R:oe(p),c.value=R)})});const u=A=>{const g=b=>String(b??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;"),R=b=>b==="Sales Report"?[110,125,150,215,95,95,105,105]:b==="Disbursement"?[115,115,90,150,150,220,105]:b==="Fold Count"?[220,125]:b==="Revolving Daily Summary"?[115,105,120,115]:b==="Revolving History"?[115,96,140,96,110,180,120]:[155,125,125,125,95,95,115,115];return`<?xml version="1.0"?>
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
  ${A.map(b=>{const E=R(b.name).map($=>`<Column ss:Width="${$}" ss:AutoFitWidth="0"/>`).join(""),P=b.rows.map($=>{if(!$.length)return'<Row ss:Height="10" ss:StyleID="BorderRow"><Cell ss:StyleID="BorderCell"><Data ss:Type="String">&nbsp;</Data></Cell></Row>';const x=$[0]==="Type"||$[0]==="Summary"||$[0]==="Sales Summary"||$[0]==="Disbursement Summary"||$[0]==="Staff"||$[0]==="Date of Sales"||$[0]==="Date"||$[0]==="Date/Month",D=x?"HeaderRow":"BorderRow",I=x?"HeaderCell":"BorderCell",k=x?26:22,M=$.map(B=>`<Cell ss:StyleID="${I}"><Data ss:Type="${typeof B=="number"?"Number":"String"}">${g(B)}</Data></Cell>`).join("");return`<Row ss:Height="${k}" ss:StyleID="${D}">${M}</Row>`}).join("");return`
        <Worksheet ss:Name="${g(b.name)}">
          <Table>
            ${E}
            ${P}
          </Table>
        </Worksheet>`}).join("")}
</Workbook>`},v=()=>{const A=we(),g=xt(e,t,n,a,s,r),R=[];if(g.selectedTypes.has("sales")){const E=g.salesRows(),P=[["Ticket","Customer","Cash","GCash","Total Payment"],...E.transactions.map($=>[$.ticket,$.customer,$.cash,$.gcash,$.total]),[],["Cash from Orders","GCash from Orders","Sales from Orders"],[E.orderCashTotal,E.orderGcashTotal,E.orderCashTotal+E.orderGcashTotal],[],["Cash Whole Sale","GCash Whole Sale","Whole Sale of Day"],[E.manualCashTotal,E.manualGcashTotal,E.manualCashTotal+E.manualGcashTotal],[],["Total Cash","Total GCash","Total Sales"],[E.totalCash,E.totalGcash,E.totalSales]];R.push({name:"Sales Report",rows:P})}g.selectedTypes.has("disbursement")&&R.push({name:"Disbursement",rows:g.disbursementRows().rows}),g.selectedTypes.has("fold_count")&&R.push({name:"Fold Count",rows:g.foldCountRows().rows}),g.selectedTypes.has("revolving_fund")&&(R.push({name:"Revolving Daily Summary",rows:g.revolvingDailySummaryRows().rows}),R.push({name:"Revolving History",rows:g.revolvingHistoryRows().rows})),g.selectedTypes.has("summary")&&R.push({name:"Summary",rows:g.summaryRows()});const p=u(R.length?R:[{name:"Summary",rows:g.summaryRows()}]),b=`laba101-report-${A.from}-to-${A.to}.xls`;return new File([p],b,{type:"application/vnd.ms-excel"})},f=async()=>{const A=v();if(!C.isNativePlatform())return{fileName:A.name,uri:""};const g=await A.text(),R=A.name;await at.writeFile({path:R,data:g,directory:Le.External,encoding:ke.UTF8});const{uri:p}=await at.getUri({path:R,directory:Le.External});return{fileName:A.name,uri:p}},y=()=>{const A=v(),g=we(),R=`laba101-report-${g.from}-to-${g.to}.xls`,p=A,b=URL.createObjectURL(p),E=document.createElement("a");return E.href=b,E.download=R,document.body.appendChild(E),E.click(),setTimeout(()=>{E.remove(),URL.revokeObjectURL(b)},1e3),R},N=async A=>{const g=document.querySelector(A==="export"?"#export-report":"#email-report");g&&(g.disabled=!0,g.textContent=A==="export"?"Exporting...":"Sending...");try{if(A==="export")if(C.isNativePlatform()){const R=await f();alert(`Report exported as "${R.fileName}".`)}else{const R=y();alert(`Report saved: ${R}`)}else{const R=await bt("report_email")||"";if(!R){alert("Please configure a report email in Settings first.");return}const p=we(),b=`Laba101 report ${p.from} to ${p.to}`;if(C.isNativePlatform()){const E=await f();try{await Zt.share({title:b,text:`Please find the attached Laba101 report file: ${E.fileName}`,files:[E.uri],dialogTitle:"Send report via email"}),alert(`Report saved and shared as "${E.fileName}".`)}catch(P){const $=String(P).toLowerCase();if($.includes("share canceled")||$.includes("canceled"))alert(`Report saved as "${E.fileName}".`);else throw P}}else{const E=y(),P=`Hi,

Please find the attached Laba101 report file: ${E}

Date range: ${p.from} to ${p.to}`,$=`mailto:${R}?subject=${encodeURIComponent(b)}&body=${encodeURIComponent(P)}`;setTimeout(()=>{window.location.href=$},800),alert(`Report downloaded as "${E}".
Your email app will open — please attach the file and send.`)}}}catch(R){alert("Failed: "+String(R))}finally{g&&(g.disabled=!1,g.textContent=A==="export"?"Export Excel":"Send to Email")}};document.querySelector("#export-report")?.addEventListener("click",async()=>{await N("export")}),document.querySelector("#email-report")?.addEventListener("click",async()=>{await N("email")})}function qn(){document.querySelector("#order-queue-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);l.orderSearch=String(t.get("orderSearch")??"").trim(),l.orderDateFilter=String(t.get("orderDateFilter")??"").trim(),l.orderPaymentFilter=String(t.get("orderPaymentFilter")??"").trim(),S()}),document.querySelector("#order-queue-clear")?.addEventListener("click",()=>{l.orderSearch="",l.orderDateFilter="",l.orderPaymentFilter="",S()}),document.querySelector("#archived-order-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);l.archivedOrderSearch=String(t.get("archivedOrderSearch")??"").trim(),S()}),document.querySelector("#archived-order-clear")?.addEventListener("click",()=>{l.archivedOrderSearch="",S()})}function Fn(){document.querySelector("#customer-search-form")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);l.customerSearch=String(t.get("customerSearch")??"").trim(),S()}),document.querySelector("#customer-search-clear")?.addEventListener("click",()=>{l.customerSearch="",S()})}function Un(){document.querySelector("#machine-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await Xa({machineName:String(t.get("machineName")??""),machineType:String(t.get("machineType")),status:String(t.get("status")),branch:String(t.get("branch")??"")}),await S()}),document.querySelector("#subcleaning-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=e.currentTarget.querySelector('button[type="submit"]');t&&(t.disabled=!0,t.textContent="Starting...");const n=new FormData(e.currentTarget),a=n.getAll("machineIds").map(Number);if(!a.length){alert("Please select at least one machine to clean."),t&&(t.disabled=!1,t.textContent="Start Cleaning");return}await $t({date:String(n.get("date")??""),machineIds:a,cleaningStatus:String(n.get("cleaningStatus")??""),cleaningType:"tube",notes:String(n.get("notes")??""),branch:String(n.get("branch")??"")}),await Y("Start tube cleaning",`${a.length} machine(s)`),await S()}),document.querySelector("#confirm-general-cleaning")?.addEventListener("click",async()=>{await Ya(document.querySelector('input[name="branch"]')?.value||l.currentUser?.branch||"Main Store",l.currentUser?.name??"Unknown"),await Y("Confirm general cleaning",j()),await S()}),document.querySelectorAll(".complete-cleaning-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.machineId),n=e.dataset.branch??"";e.disabled=!0,e.textContent="Completing...",await Va(t,n),await Y("Complete tube cleaning",`Machine ID ${t}`),await S()})}),document.querySelectorAll(".deactivate-machine-btn, .activate-machine-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.id),n=e.classList.contains("deactivate-machine-btn");await Ka(t,n?"inactive":"available"),await S()})})}function kn(e,t){const n=document.querySelector("#inventory-form");n?.addEventListener("submit",async a=>{a.preventDefault();const s=new FormData(a.currentTarget),r=Number(s.get("id")||0);await ja({id:r||void 0,name:String(s.get("name")??""),unit:String(s.get("unit")??""),quantity:Number(s.get("quantity")??0),reorderLevel:Number(s.get("reorderLevel")??0),notes:String(s.get("notes")??""),branch:t}),await Y(r?"Update inventory item":"Create inventory item",String(s.get("name")??"")),await S()}),document.querySelectorAll(".edit-inventory-btn").forEach(a=>{a.addEventListener("click",()=>{const s=e.find(r=>r.id===Number(a.dataset.id));!s||!n||(n.querySelector("[name=id]").value=String(s.id),n.querySelector("[name=name]").value=s.name,n.querySelector("[name=unit]").value=s.unit,n.querySelector("[name=quantity]").value=String(s.quantity),n.querySelector("[name=reorderLevel]").value=String(s.reorderLevel),n.querySelector("[name=notes]").value=s.notes??"",n.scrollIntoView({behavior:"smooth",block:"start"}))})}),document.querySelector("#inventory-movement-form")?.addEventListener("submit",async a=>{a.preventDefault();const s=new FormData(a.currentTarget),r=String(s.get("movementType")??"in")==="out"?"out":"in";try{await Wa({itemId:Number(s.get("itemId")??0),movementType:r,quantity:Number(s.get("quantity")??0),notes:String(s.get("notes")??""),staffName:l.currentUser?.name??"Unknown",branch:t}),await Y(r==="in"?"Stock-in":"Stock-out",`Item ID ${s.get("itemId")} qty ${s.get("quantity")}`),await S()}catch(i){alert(i instanceof Error?i.message:"Stock movement failed.")}})}function Mn(e){const t=document.querySelector("#add-staff-modal"),n=document.querySelector("#open-add-staff-modal"),a=document.querySelector("#close-add-staff-modal"),s=document.querySelector("#staff-form"),r=()=>{s?.reset(),s&&(s.querySelector("[name=id]").value="");const o=document.querySelector("#add-staff-title");o&&(o.textContent="Add staff member"),t?.removeAttribute("hidden")},i=()=>{t?.setAttribute("hidden",""),s?.reset()};n?.addEventListener("click",r),a?.addEventListener("click",i),t?.addEventListener("click",o=>{o.target===t&&i()}),document.querySelectorAll(".edit-staff-btn").forEach(o=>{o.addEventListener("click",()=>{const c=Number(o.dataset.id),d=e.find(u=>u.id===c);if(d&&s){s.querySelector("[name=id]").value=String(d.id),s.querySelector("[name=name]").value=d.name,s.querySelector("[name=email]").value=d.email,s.querySelector("[name=password]").value=d.password,s.querySelector("[name=role]").value=d.role,s.querySelector("[name=branch]").value=d.branch;const u=document.querySelector("#add-staff-title");u&&(u.textContent="Edit staff member"),t?.removeAttribute("hidden")}})}),document.querySelectorAll(".deactivate-staff-btn, .activate-staff-btn").forEach(o=>{o.addEventListener("click",async()=>{const c=Number(o.dataset.id),d=e.find(u=>u.id===c);d&&(await rt(c,{isActive:d.isActive!==0?0:1}),await S())})}),s?.addEventListener("submit",async o=>{o.preventDefault();const c=document.querySelector("#staff-save-btn");c&&(c.disabled=!0,c.textContent="Saving...");const d=new FormData(s),u=d.get("id")?Number(d.get("id")):void 0,v=String(d.get("name")??"").trim(),f=String(d.get("email")??"").trim(),y=String(d.get("password")??"password")||"password",N=String(d.get("role")),A=String(d.get("branch")??"");if(!v||!f){alert("Name and email are required."),c&&(c.disabled=!1,c.textContent="Save staff member");return}try{u?await rt(u,{name:v,email:f,password:y,role:N,branch:A}):await ha({name:v,email:f,password:y,role:N,branch:A}),i(),await S()}catch{alert("Failed to save staff. The email may already be in use."),c&&(c.disabled=!1,c.textContent="Save staff member")}})}function Bn(){document.querySelector("#settings-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await Ne("branch",String(t.get("branch")??"Main Store")),await Ne("fold_rate",String(t.get("foldRate")??"5")),String(t.get("reportEmail")??"")&&await Ne("report_email",String(t.get("reportEmail"))),alert("Settings saved successfully!")})}async function _n(){await pa();const e=localStorage.getItem(Ee);if(e)try{const t=JSON.parse(e);if(t.email&&t.remembered){const n=await Et(t.email,"password")??null;l.currentUser=n}}catch{localStorage.removeItem(Ee)}await S()}function jn(e,t,n,a){const s=e.filter(y=>y.status==="revolving").reduce((y,N)=>y+N.cashAmount,0),r=t.filter(y=>y.type==="add").reduce((y,N)=>y+N.amount,0),i=t.filter(y=>y.type==="disbursement").reduce((y,N)=>y+N.amount,0),o=s+r-i,c=l.revolvingHistoryFrom||"0000-01-01",d=l.revolvingHistoryTo||"9999-12-31",u=t.filter(y=>{const N=V(y.createdAt);return N>=c&&N<=d}),v=e.map(y=>{const N=Ct(y.saleDate,n,a,y.cashAmount),A=y.status==="revolving"?'<span class="ok">Revolving</span>':y.status==="endorsed"?`<span class="warn">Endorsed to ${m(y.endorsedTo)}</span>`:'<span class="meta">Pending</span>',g=y.status!=="revolving"&&y.status!=="endorsed"?`<div class="row-actions">
          <button class="primary revolving-btn" data-id="${y.id}">Revolving</button>
          <button class="secondary endorsed-btn" data-id="${y.id}" data-date="${z(y.saleDate)}">Endorsed</button>
        </div>`:"";return[`<strong>${m(z(y.saleDate))}</strong>`,`<strong class="ok">${T(N)}</strong>`,A,y.statusUpdatedAt?m(z(y.statusUpdatedAt)):"-",g]}),f=u.map(y=>[Za(y.createdAt),`<strong>${m(y.revolvingNumber)}</strong>`,m(y.name),`<strong class="${y.type==="disbursement"?"warn":"ok"}">${y.type==="disbursement"?"-":"+"}${T(y.amount)}</strong>`,m(y.category),m(y.description||"-"),`<span class="${y.type==="add"?"ok":"warn"}">${y.type==="add"?"Add Revolving Fund":"Disbursement"}</span>`]);return`
    <section class="grid content full">
      <div class="panel-header" style="display: flex; gap: 16px; margin-bottom: 24px; align-items: center;">
        <button class="primary" id="add-revolving-fund-btn">Add Revolving Fund</button>
        <button class="secondary" id="revolving-disbursement-btn">Disbursement</button>
      </div>

      <article class="panel">
        <div style="background-color: #061a42; color: white; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
          <p style="font-size: 12px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin: 0 0 8px 0;">Revolving Fund Total</p>
          <p style="font-size: 32px; font-weight: 800; margin: 0;">${T(o)}</p>
        </div>
        ${q("Daily Summary","Cash on hand per day (order cash + manual cash − disbursements)")}
        ${De(["Date of Sales","Cash on Hand","Status","Date Update","Action"],v,"data-table revolving-summary-datatable")}
      </article>

      <article class="panel">
        ${q("Revolving Table History","Filter by date — DISB numbers shared with Daily Report expenses")}
        <form id="revolving-history-filters" class="form revolving-history-filters">
          <div class="form-row">
            <label>From<input name="revolvingHistoryFrom" type="date" value="${l.revolvingHistoryFrom}" /></label>
            <label>To<input name="revolvingHistoryTo" type="date" value="${l.revolvingHistoryTo}" /></label>
          </div>
          <div class="row-actions">
            <button class="primary" type="submit">Apply filter</button>
            <button class="secondary" type="button" id="revolving-history-clear">Clear</button>
          </div>
        </form>
        ${De(["Date","Disbursement #","Name","Amount","Category","Description","Type"],f,"data-table revolving-history-datatable")}
      </article>

      ${l.endorseModalOpen?`
        <div class="modal-backdrop" role="presentation">
          <div class="receipt-modal" role="dialog" aria-modal="true" style="max-width: 400px; width: 90%;">
            <form id="endorse-form" class="form" style="padding: 24px;">
              <h3 style="margin-top: 0;">Endorse Money</h3>
              <p class="meta" style="margin-bottom: 16px;">Endorsing cash from <strong>${m(l.endorseSaleDate)}</strong>.</p>
              <label>Endorsed to (Name)<input name="endorsedTo" type="text" placeholder="Enter name" required /></label>
              <div class="modal-actions" style="margin-top: 24px; padding: 0;">
                <button class="primary" type="submit">Submit Endorsement</button>
                <button class="secondary" type="button" id="close-endorse-modal">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      `:""}

      ${l.revolvingModalOpen?`
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

      ${l.addFundModalOpen?`
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

      ${l.disbursementModalOpen?`
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
  `}function Hn(){document.querySelector("#revolving-history-filters")?.addEventListener("submit",async u=>{u.preventDefault();const v=new FormData(u.currentTarget);l.revolvingHistoryFrom=String(v.get("revolvingHistoryFrom")??"").trim(),l.revolvingHistoryTo=String(v.get("revolvingHistoryTo")??"").trim(),await S()}),document.querySelector("#revolving-history-clear")?.addEventListener("click",async()=>{l.revolvingHistoryFrom="",l.revolvingHistoryTo="",await S()}),document.querySelectorAll(".revolving-btn").forEach(u=>{u.addEventListener("click",async()=>{l.revolvingModalOpen=!0,l.revolvingSaleId=Number(u.dataset.id),await S()})});const e=document.getElementById("confirm-revolving-btn");e&&e.addEventListener("click",async()=>{await dt(l.revolvingSaleId,"revolving",null,new Date().toISOString()),l.revolvingModalOpen=!1,await S()});const t=document.getElementById("close-revolving-modal");t&&t.addEventListener("click",async()=>{l.revolvingModalOpen=!1,await S()}),document.querySelectorAll(".endorsed-btn").forEach(u=>{u.addEventListener("click",async()=>{l.endorseModalOpen=!0,l.endorseSaleId=Number(u.dataset.id),l.endorseSaleDate=u.dataset.date??"",await S()})});const n=document.getElementById("close-endorse-modal");n&&n.addEventListener("click",async()=>{l.endorseModalOpen=!1,await S()});const a=document.getElementById("endorse-form");a&&a.addEventListener("submit",async u=>{u.preventDefault();const v=new FormData(a),f=String(v.get("endorsedTo")??"").trim();f&&(await dt(l.endorseSaleId,"endorsed",f,new Date().toISOString()),l.endorseModalOpen=!1,await S())});const s=document.getElementById("add-revolving-fund-btn");s&&s.addEventListener("click",async()=>{l.addFundModalOpen=!0,await S()});const r=document.getElementById("close-add-fund-modal");r&&r.addEventListener("click",async()=>{l.addFundModalOpen=!1,await S()});const i=document.getElementById("add-fund-form");i&&i.addEventListener("submit",async u=>{u.preventDefault();const v=new FormData(i);await lt({name:String(v.get("name")??"").trim(),amount:Number(v.get("amount")??0),category:"Add Revolving Fund",description:null,type:"add",createdAt:new Date().toISOString()}),l.addFundModalOpen=!1,await S()});const o=document.getElementById("revolving-disbursement-btn");o&&o.addEventListener("click",async()=>{l.disbursementModalOpen=!0,await S()});const c=document.getElementById("close-disbursement-modal");c&&c.addEventListener("click",async()=>{l.disbursementModalOpen=!1,await S()});const d=document.getElementById("disbursement-form");d&&d.addEventListener("submit",async u=>{u.preventDefault();const v=new FormData(d);await lt({name:String(v.get("name")??"").trim(),amount:Number(v.get("amount")??0),category:String(v.get("category")??"").trim(),description:String(v.get("description")??"").trim(),type:"disbursement",expenseDate:j(),createdAt:new Date().toISOString()}),l.disbursementModalOpen=!1,await S()})}_n();export{ke as E,_e as W,Xt as b};
