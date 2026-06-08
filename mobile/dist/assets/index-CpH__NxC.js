(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();var de;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(de||(de={}));class Pe extends Error{constructor(t,a,n){super(t),this.message=t,this.code=a,this.data=n}}const Ft=e=>{var t,a;return e?.androidBridge?"android":!((a=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},Ut=e=>{const t=e.CapacitorCustomPlatform||null,a=e.Capacitor||{},n=a.Plugins=a.Plugins||{},s=()=>t!==null?t.name:Ft(e),r=()=>s()!=="web",i=v=>{const y=l.get(v);return!!(y?.platforms.has(s())||o(v))},o=v=>{var y;return(y=a.PluginHeaders)===null||y===void 0?void 0:y.find(f=>f.name===v)},c=v=>e.console.error(v),l=new Map,u=(v,y={})=>{const f=l.get(v);if(f)return console.warn(`Capacitor plugin "${v}" already registered. Cannot register plugins twice.`),f.proxy;const $=s(),T=o(v);let g;const R=async()=>(!g&&$ in y?g=typeof y[$]=="function"?g=await y[$]():g=y[$]:t!==null&&!g&&"web"in y&&(g=typeof y.web=="function"?g=await y.web():g=y.web),g),p=(D,I)=>{var k,M;if(T){const B=T?.methods.find(W=>I===W.name);if(B)return B.rtype==="promise"?W=>a.nativePromise(v,I.toString(),W):(W,he)=>a.nativeCallback(v,I.toString(),W,he);if(D)return(k=D[I])===null||k===void 0?void 0:k.bind(D)}else{if(D)return(M=D[I])===null||M===void 0?void 0:M.bind(D);throw new Pe(`"${v}" plugin is not implemented on ${$}`,de.Unimplemented)}},E=D=>{let I;const k=(...M)=>{const B=R().then(W=>{const he=p(W,D);if(he){const h=he(...M);return I=h?.remove,h}else throw new Pe(`"${v}.${D}()" is not implemented on ${$}`,de.Unimplemented)});return D==="addListener"&&(B.remove=async()=>I()),B};return k.toString=()=>`${D.toString()}() { [capacitor code] }`,Object.defineProperty(k,"name",{value:D,writable:!1,configurable:!1}),k},b=E("addListener"),P=E("removeListener"),L=(D,I)=>{const k=b({eventName:D},I),M=async()=>{const W=await k;P({eventName:D,callbackId:W},I)},B=new Promise(W=>k.then(()=>W({remove:M})));return B.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await M()},B},x=new Proxy({},{get(D,I){switch(I){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return T?L:b;case"removeListener":return P;default:return E(I)}}});return n[v]=x,l.set(v,{name:v,proxy:x,platforms:new Set([...Object.keys(y),...T?[$]:[]])}),x};return a.convertFileSrc||(a.convertFileSrc=v=>v),a.getPlatform=s,a.handleError=c,a.isNativePlatform=r,a.isPluginAvailable=i,a.registerPlugin=u,a.Exception=Pe,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},kt=e=>e.Capacitor=Ut(e),C=kt(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),oe=C.registerPlugin;class _e{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,a){let n=!1;this.listeners[t]||(this.listeners[t]=[],n=!0),this.listeners[t].push(a);const r=this.windowListeners[t];r&&!r.registered&&this.addWindowListener(r),n&&this.sendRetainedArgumentsForEvent(t);const i=async()=>this.removeListener(t,a);return Promise.resolve({remove:i})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,a,n){const s=this.listeners[t];if(!s){if(n){let r=this.retainedEventArguments[t];r||(r=[]),r.push(a),this.retainedEventArguments[t]=r}return}s.forEach(r=>r(a))}hasListeners(t){var a;return!!(!((a=this.listeners[t])===null||a===void 0)&&a.length)}registerWindowListener(t,a){this.windowListeners[a]={registered:!1,windowEventName:t,pluginEventName:a,handler:n=>{this.notifyListeners(a,n)}}}unimplemented(t="not implemented"){return new C.Exception(t,de.Unimplemented)}unavailable(t="not available"){return new C.Exception(t,de.Unavailable)}async removeListener(t,a){const n=this.listeners[t];if(!n)return;const s=n.indexOf(a);this.listeners[t].splice(s,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const a=this.retainedEventArguments[t];a&&(delete this.retainedEventArguments[t],a.forEach(n=>{this.notifyListeners(t,n)}))}}const Qe=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Je=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class Mt extends _e{async getCookies(){const t=document.cookie,a={};return t.split(";").forEach(n=>{if(n.length<=0)return;let[s,r]=n.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=Je(s).trim(),r=Je(r).trim(),a[s]=r}),a}async setCookie(t){try{const a=Qe(t.key),n=Qe(t.value),s=t.expires?`; expires=${t.expires.replace("expires=","")}`:"",r=(t.path||"/").replace("path=",""),i=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${a}=${n||""}${s}; path=${r}; ${i};`}catch(a){return Promise.reject(a)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const a of t)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}oe("CapacitorCookies",{web:()=>new Mt});const Bt=async e=>new Promise((t,a)=>{const n=new FileReader;n.onload=()=>{const s=n.result;t(s.indexOf(",")>=0?s.split(",")[1]:s)},n.onerror=s=>a(s),n.readAsDataURL(e)}),_t=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(s=>s.toLocaleLowerCase()).reduce((s,r,i)=>(s[r]=e[t[i]],s),{})},jt=(e,t=!0)=>e?Object.entries(e).reduce((n,s)=>{const[r,i]=s;let o,c;return Array.isArray(i)?(c="",i.forEach(l=>{o=t?encodeURIComponent(l):l,c+=`${r}=${o}&`}),c.slice(0,-1)):(o=t?encodeURIComponent(i):i,c=`${r}=${o}`),`${n}&${c}`},"").substr(1):null,Ht=(e,t={})=>{const a=Object.assign({method:e.method||"GET",headers:e.headers},t),s=_t(e.headers)["content-type"]||"";if(typeof e.data=="string")a.body=e.data;else if(s.includes("application/x-www-form-urlencoded")){const r=new URLSearchParams;for(const[i,o]of Object.entries(e.data||{}))r.set(i,o);a.body=r.toString()}else if(s.includes("multipart/form-data")||e.data instanceof FormData){const r=new FormData;if(e.data instanceof FormData)e.data.forEach((o,c)=>{r.append(c,o)});else for(const o of Object.keys(e.data))r.append(o,e.data[o]);a.body=r;const i=new Headers(a.headers);i.delete("content-type"),a.headers=i}else(s.includes("application/json")||typeof e.data=="object")&&(a.body=JSON.stringify(e.data));return a};class Wt extends _e{async request(t){const a=Ht(t,t.webFetchExtra),n=jt(t.params,t.shouldEncodeUrlParams),s=n?`${t.url}?${n}`:t.url,r=await fetch(s,a),i=r.headers.get("content-type")||"";let{responseType:o="text"}=r.ok?t:{};i.includes("application/json")&&(o="json");let c,l;switch(o){case"arraybuffer":case"blob":l=await r.blob(),c=await Bt(l);break;case"json":c=await r.json();break;default:c=await r.text()}const u={};return r.headers.forEach((v,y)=>{u[y]=v}),{data:c,headers:u,status:r.status,url:r.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}oe("CapacitorHttp",{web:()=>new Wt});var ze;(function(e){e.Dark="DARK",e.Light="LIGHT",e.Default="DEFAULT"})(ze||(ze={}));var Ze;(function(e){e.StatusBar="StatusBar",e.NavigationBar="NavigationBar"})(Ze||(Ze={}));class Xt extends _e{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}oe("SystemBars",{web:()=>new Xt});const Kt="modulepreload",Gt=function(e){return"/"+e},et={},je=function(t,a,n){let s=Promise.resolve();if(a&&a.length>0){let c=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(v=>({status:"fulfilled",value:v}),v=>({status:"rejected",reason:v}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),o=i?.nonce||i?.getAttribute("nonce");s=c(a.map(l=>{if(l=Gt(l),l in et)return;et[l]=!0;const u=l.endsWith(".css"),v=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${v}`))return;const y=document.createElement("link");if(y.rel=u?"stylesheet":Kt,u||(y.as="script"),y.crossOrigin="",y.href=l,o&&y.setAttribute("nonce",o),document.head.appendChild(y),u)return new Promise((f,$)=>{y.addEventListener("load",f),y.addEventListener("error",()=>$(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(i){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=i,window.dispatchEvent(o),!o.defaultPrevented)throw i}return s.then(i=>{for(const o of i||[])o.status==="rejected"&&r(o.reason);return t().catch(r)})};function Vt(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,a){return new Proxy({},{get(n,s){return(r,i,o)=>{const c=e.Capacitor.Plugins[a];if(c===void 0){o(new Error(`Capacitor plugin ${a} not found`));return}if(typeof c[s]!="function"){o(new Error(`Method ${s} not found in Capacitor plugin ${a}`));return}(async()=>{try{const l=await c[s](r);i(l)}catch(l){o(l)}})()}}})}})}function Yt(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,a){return e.cordova.plugins[a]}})}function Qt(e=!1){typeof window>"u"||(window.CapacitorUtils=window.CapacitorUtils||{},window.Capacitor!==void 0&&!e?Vt(window):window.cordova!==void 0&&Yt(window))}var Ae;(function(e){e.Documents="DOCUMENTS",e.Data="DATA",e.Library="LIBRARY",e.Cache="CACHE",e.External="EXTERNAL",e.ExternalStorage="EXTERNAL_STORAGE",e.ExternalCache="EXTERNAL_CACHE",e.LibraryNoCloud="LIBRARY_NO_CLOUD",e.Temporary="TEMPORARY"})(Ae||(Ae={}));var Ue;(function(e){e.UTF8="utf8",e.ASCII="ascii",e.UTF16="utf16"})(Ue||(Ue={}));const tt=oe("Filesystem",{web:()=>je(()=>import("./web-CUiXzMfH.js"),[]).then(e=>new e.FilesystemWeb)});Qt();const Jt=oe("Share",{web:()=>je(()=>import("./web-BS9XF21Q.js"),[]).then(e=>new e.ShareWeb)});class zt{constructor(t){this.sqlite=t,this._connectionDict=new Map}async initWebStore(){try{return await this.sqlite.initWebStore(),Promise.resolve()}catch(t){return Promise.reject(t)}}async saveToStore(t){try{return await this.sqlite.saveToStore({database:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async saveToLocalDisk(t){try{return await this.sqlite.saveToLocalDisk({database:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getFromLocalDiskToStore(t){const a=t??!0;try{return await this.sqlite.getFromLocalDiskToStore({overwrite:a}),Promise.resolve()}catch(n){return Promise.reject(n)}}async echo(t){try{const a=await this.sqlite.echo({value:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isSecretStored(){try{const t=await this.sqlite.isSecretStored();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async setEncryptionSecret(t){try{return await this.sqlite.setEncryptionSecret({passphrase:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async changeEncryptionSecret(t,a){try{return await this.sqlite.changeEncryptionSecret({passphrase:t,oldpassphrase:a}),Promise.resolve()}catch(n){return Promise.reject(n)}}async clearEncryptionSecret(){try{return await this.sqlite.clearEncryptionSecret(),Promise.resolve()}catch(t){return Promise.reject(t)}}async checkEncryptionSecret(t){try{const a=await this.sqlite.checkEncryptionSecret({passphrase:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async addUpgradeStatement(t,a){try{return t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.addUpgradeStatement({database:t,upgrade:a}),Promise.resolve()}catch(n){return Promise.reject(n)}}async createConnection(t,a,n,s,r){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.createConnection({database:t,encrypted:a,mode:n,version:s,readonly:r});const i=new at(t,r,this.sqlite),o=r?`RO_${t}`:`RW_${t}`;return this._connectionDict.set(o,i),Promise.resolve(i)}catch(i){return Promise.reject(i)}}async closeConnection(t,a){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.closeConnection({database:t,readonly:a});const n=a?`RO_${t}`:`RW_${t}`;return this._connectionDict.delete(n),Promise.resolve()}catch(n){return Promise.reject(n)}}async isConnection(t,a){const n={};t.endsWith(".db")&&(t=t.slice(0,-3));const s=a?`RO_${t}`:`RW_${t}`;return n.result=this._connectionDict.has(s),Promise.resolve(n)}async retrieveConnection(t,a){t.endsWith(".db")&&(t=t.slice(0,-3));const n=a?`RO_${t}`:`RW_${t}`;if(this._connectionDict.has(n)){const s=this._connectionDict.get(n);return typeof s<"u"?Promise.resolve(s):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async getNCDatabasePath(t,a){try{const n=await this.sqlite.getNCDatabasePath({path:t,database:a});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async createNCConnection(t,a){try{await this.sqlite.createNCConnection({databasePath:t,version:a});const n=new at(t,!0,this.sqlite),s=`RO_${t})`;return this._connectionDict.set(s,n),Promise.resolve(n)}catch(n){return Promise.reject(n)}}async closeNCConnection(t){try{await this.sqlite.closeNCConnection({databasePath:t});const a=`RO_${t})`;return this._connectionDict.delete(a),Promise.resolve()}catch(a){return Promise.reject(a)}}async isNCConnection(t){const a={},n=`RO_${t})`;return a.result=this._connectionDict.has(n),Promise.resolve(a)}async retrieveNCConnection(t){if(this._connectionDict.has(t)){const a=`RO_${t})`,n=this._connectionDict.get(a);return typeof n<"u"?Promise.resolve(n):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async isNCDatabase(t){try{const a=await this.sqlite.isNCDatabase({databasePath:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async retrieveAllConnections(){return this._connectionDict}async closeAllConnections(){const t=new Map;try{for(const a of this._connectionDict.keys()){const n=a.substring(3),s=a.substring(0,3)==="RO_";await this.sqlite.closeConnection({database:n,readonly:s}),t.set(a,null)}for(const a of t.keys())this._connectionDict.delete(a);return Promise.resolve()}catch(a){return Promise.reject(a)}}async checkConnectionsConsistency(){try{const t=[...this._connectionDict.keys()],a=[],n=[];for(const r of t)a.push(r.substring(0,2)),n.push(r.substring(3));const s=await this.sqlite.checkConnectionsConsistency({dbNames:n,openModes:a});return s.result||(this._connectionDict=new Map),Promise.resolve(s)}catch(t){return this._connectionDict=new Map,Promise.reject(t)}}async importFromJson(t){try{const a=await this.sqlite.importFromJson({jsonstring:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isJsonValid(t){try{const a=await this.sqlite.isJsonValid({jsonstring:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async copyFromAssets(t){const a=t??!0;try{return await this.sqlite.copyFromAssets({overwrite:a}),Promise.resolve()}catch(n){return Promise.reject(n)}}async getFromHTTPRequest(t,a){const n=a??!0;try{return await this.sqlite.getFromHTTPRequest({url:t,overwrite:n}),Promise.resolve()}catch(s){return Promise.reject(s)}}async isDatabaseEncrypted(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const a=await this.sqlite.isDatabaseEncrypted({database:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isInConfigEncryption(){try{const t=await this.sqlite.isInConfigEncryption();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isInConfigBiometricAuth(){try{const t=await this.sqlite.isInConfigBiometricAuth();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isDatabase(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const a=await this.sqlite.isDatabase({database:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async getDatabaseList(){try{const a=(await this.sqlite.getDatabaseList()).values;a.sort();const n={values:a};return Promise.resolve(n)}catch(t){return Promise.reject(t)}}async getMigratableDbList(t){const a=t||"default";try{const n=await this.sqlite.getMigratableDbList({folderPath:a});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async addSQLiteSuffix(t,a){const n=t||"default",s=a||[];try{const r=await this.sqlite.addSQLiteSuffix({folderPath:n,dbNameList:s});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async deleteOldDatabases(t,a){const n=t||"default",s=a||[];try{const r=await this.sqlite.deleteOldDatabases({folderPath:n,dbNameList:s});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async moveDatabasesAndAddSuffix(t,a){const n=t||"default",s=a||[];return this.sqlite.moveDatabasesAndAddSuffix({folderPath:n,dbNameList:s})}}class at{constructor(t,a,n){this.dbName=t,this.readonly=a,this.sqlite=n}getConnectionDBName(){return this.dbName}getConnectionReadOnly(){return this.readonly}async open(){try{return await this.sqlite.open({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async close(){try{return await this.sqlite.close({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async beginTransaction(){try{const t=await this.sqlite.beginTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async commitTransaction(){try{const t=await this.sqlite.commitTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async rollbackTransaction(){try{const t=await this.sqlite.rollbackTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTransactionActive(){try{const t=await this.sqlite.isTransactionActive({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async loadExtension(t){try{return await this.sqlite.loadExtension({database:this.dbName,path:t,readonly:this.readonly}),Promise.resolve()}catch(a){return Promise.reject(a)}}async enableLoadExtension(t){try{return await this.sqlite.enableLoadExtension({database:this.dbName,toggle:t,readonly:this.readonly}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getUrl(){try{const t=await this.sqlite.getUrl({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getVersion(){try{const t=await this.sqlite.getVersion({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getTableList(){try{const t=await this.sqlite.getTableList({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async execute(t,a=!0,n=!0){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const s=await this.sqlite.execute({database:this.dbName,statements:t,transaction:a,readonly:!1,isSQL92:n});return Promise.resolve(s)}}catch(s){return Promise.reject(s)}}async query(t,a,n=!0){let s;try{return a&&a.length>0?s=await this.sqlite.query({database:this.dbName,statement:t,values:a,readonly:this.readonly,isSQL92:!0}):s=await this.sqlite.query({database:this.dbName,statement:t,values:[],readonly:this.readonly,isSQL92:n}),s=await this.reorderRows(s),Promise.resolve(s)}catch(r){return Promise.reject(r)}}async run(t,a,n=!0,s="no",r=!0){let i;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(a&&a.length>0?i=await this.sqlite.run({database:this.dbName,statement:t,values:a,transaction:n,readonly:!1,returnMode:s,isSQL92:!0}):i=await this.sqlite.run({database:this.dbName,statement:t,values:[],transaction:n,readonly:!1,returnMode:s,isSQL92:r}),i.changes=await this.reorderRows(i.changes),Promise.resolve(i))}catch(o){return Promise.reject(o)}}async executeSet(t,a=!0,n="no",s=!0){let r;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(r=await this.sqlite.executeSet({database:this.dbName,set:t,transaction:a,readonly:!1,returnMode:n,isSQL92:s}),r.changes=await this.reorderRows(r.changes),Promise.resolve(r))}catch(i){return Promise.reject(i)}}async isExists(){try{const t=await this.sqlite.isDBExists({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTable(t){try{const a=await this.sqlite.isTableExists({database:this.dbName,table:t,readonly:this.readonly});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isDBOpen(){try{const t=await this.sqlite.isDBOpen({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async delete(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteDatabase({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async createSyncTable(){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const t=await this.sqlite.createSyncTable({database:this.dbName,readonly:!1});return Promise.resolve(t)}}catch(t){return Promise.reject(t)}}async setSyncDate(t){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.setSyncDate({database:this.dbName,syncdate:t,readonly:!1}),Promise.resolve())}catch(a){return Promise.reject(a)}}async getSyncDate(){try{const t=await this.sqlite.getSyncDate({database:this.dbName,readonly:this.readonly});let a="";return t.syncDate>0&&(a=new Date(t.syncDate*1e3).toISOString()),Promise.resolve(a)}catch(t){return Promise.reject(t)}}async exportToJson(t,a=!1){try{const n=await this.sqlite.exportToJson({database:this.dbName,jsonexportmode:t,readonly:this.readonly,encrypted:a});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async deleteExportedRows(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteExportedRows({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async executeTransaction(t,a=!0){let n=0,s=!1;if(this.readonly)return Promise.reject("not allowed in read-only mode");if(await this.sqlite.beginTransaction({database:this.dbName}),s=await this.sqlite.isTransactionActive({database:this.dbName}),!s)return Promise.reject("After Begin Transaction, no transaction active");try{for(const o of t){if(typeof o!="object"||!("statement"in o))throw new Error("Error a task.statement must be provided");if("values"in o&&o.values&&o.values.length>0){const c=o.statement.toUpperCase().includes("RETURNING")?"all":"no",l=await this.sqlite.run({database:this.dbName,statement:o.statement,values:o.values,transaction:!1,readonly:!1,returnMode:c,isSQL92:a});if(l.changes.changes<0)throw new Error("Error in transaction method run ");n+=l.changes.changes}else{const c=await this.sqlite.execute({database:this.dbName,statements:o.statement,transaction:!1,readonly:!1});if(c.changes.changes<0)throw new Error("Error in transaction method execute ");n+=c.changes.changes}}const r=await this.sqlite.commitTransaction({database:this.dbName});n+=r.changes.changes;const i={changes:{changes:n}};return Promise.resolve(i)}catch(r){const i=r.message?r.message:r;return await this.sqlite.rollbackTransaction({database:this.dbName}),Promise.reject(i)}}async reorderRows(t){const a=t;if(t?.values&&typeof t.values[0]=="object"&&Object.keys(t.values[0]).includes("ios_columns")){const n=t.values[0].ios_columns,s=[];for(let r=1;r<t.values.length;r++){const i=t.values[r],o={};for(const c of n)o[c]=i[c];s.push(o)}a.values=s}return Promise.resolve(a)}}const Zt=oe("CapacitorSQLite",{web:()=>je(()=>import("./web-GxIU0fW8.js"),[]).then(e=>new e.CapacitorSQLiteWeb),electron:()=>window.CapacitorCustomPlatform.plugins.CapacitorSQLite});function ea(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}const ta="laba101_offline",Ce="fresh_start_reset_v1",aa=new zt(Zt);let Ee=null;const G=[{id:1,name:"Laba101 Admin",email:"admin@laba101.test",password:"password",role:"admin",branch:"Main Store"},{id:2,name:"Gensan Branch Staff",email:"staff@laba101.gensan",password:"password",role:"staff",branch:"Gensan Branch"}],$e=[],J=[Y(1,"Drop-off","P185. Includes wash, dry, and fold.","Drop-Off","order",185,8,40,["Wash","Dry","Fold"],0,24),Y(2,"Full Service","P200. Wash, Fabcon, detergent, dry, and fold.","Full Service","order",200,8,40,["Wash","Dry","Fold","Detergent","Fabcon"],0,24),Y(3,"Self Service Wash","P60. Self-service wash (max 8kg per load).","Self Service","order",60,8,null,["Wash"],0,1),Y(4,"Self Service Dry","P70. Self-service dry (40 mins).","Self Service","order",70,8,40,["Dry"],0,1),Y(6,"Dry 10 mins","Additional drying time (10 mins).","Add-on","addon",30,8,10,["Dry"],0,1),Y(7,"Dry 20 mins","Additional drying time (20 mins).","Add-on","addon",50,8,20,["Dry"],0,1),Y(8,"Dry 40 mins","Additional drying time (40 mins).","Add-on","addon",70,8,40,["Dry"],0,1),Y(9,"Additional Zonrox","Extra Zonrox bleach add-on per load.","Add-on","addon",25,0,null,["Zonrox"],0,0),Y(10,"Additional Fabcon","Extra Fabcon fabric conditioner add-on per load.","Add-on","addon",25,0,null,["Fabcon"],0,0)],ne=[{id:1,name:"Regular Clothes",maxKg:8,additionalFee:0,isActive:1},{id:2,name:"Comforter",maxKg:4,additionalFee:0,isActive:1},{id:3,name:"Thin Blankets",maxKg:6,additionalFee:0,isActive:1},{id:4,name:"Bedsheets",maxKg:6,additionalFee:0,isActive:1},{id:5,name:"Bath Towels",maxKg:6,additionalFee:0,isActive:1},{id:6,name:"Curtains",maxKg:6,additionalFee:0,isActive:1}];function nt(e,t){const a=A(e,[]),n=new Map(a.map(r=>[r.id,r])),s=t.map(r=>{const i=n.get(r.id);return i?{...r,...i,isActive:i.isActive??r.isActive}:r});(a.length!==s.length||s.some((r,i)=>r.id!==a[i]?.id||JSON.stringify(r)!==JSON.stringify(a[i])))&&N(e,s)}async function na(){nt("services",J),nt("item_categories",ne)}async function De(e){for(const t of J)((await e.query("SELECT id FROM laundry_services WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive,t.id]):await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive]);for(const t of ne)((await e.query("SELECT id FROM item_categories WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.maxKg,t.additionalFee,t.isActive,t.id]):await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[t.id,t.name,t.maxKg,t.additionalFee,t.isActive])}const se=[],ue=[],re=[],me=[],ve=[],z=[...[1,2,3,4].map(e=>({id:e,machineName:`Washer ${e}`,machineType:"washer",status:"available",branch:"Main Store"})),...[1,2,3,4].map(e=>({id:e+4,machineName:`Dryer ${e}`,machineType:"dryer",status:"available",branch:"Main Store"}))],pe=[{key:"branch",value:"Main Store"},{key:"fold_rate",value:"5"},{key:"report_email",value:"admin@laba101.test"}];function Y(e,t,a,n,s,r,i,o,c,l,u){return{id:e,name:t,description:a,category:n,serviceType:s,price:r,maxKg:i,dryingMinutes:o,includes:c,additionalCharge:l,turnaroundHours:u,isActive:1}}function X(e){return`laba101-mobile-${e}`}function A(e,t){const a=localStorage.getItem(X(e));if(!a)return structuredClone(t);try{return JSON.parse(a)}catch{return structuredClone(t)}}function N(e,t){localStorage.setItem(X(e),JSON.stringify(t))}function j(e){return e.reduce((t,a)=>Math.max(t,a.id),0)+1}function V(){return new Date().toISOString()}function ke(e=new Date){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${n}`}function sa(){return ke().slice(2).replaceAll("-","")}function Q(e,t){if(!e)return t;try{return JSON.parse(e)}catch{return t}}async function O(){return Ee||(Ee=await aa.createConnection(ta,!1,"no-encryption",1,!1),await Ee.open()),Ee}async function U(e,t,a,n){((await e.query(`PRAGMA table_info(${t})`)).values??[]).some(i=>i.name===a)||await e.execute(`ALTER TABLE ${t} ADD COLUMN ${a} ${n}`)}function ra(){const e=A("staff",G),t=new Map(e.map(n=>[n.id,n]));let a=!1;for(const n of G){const s=t.get(n.id);if(!s){t.set(n.id,{...n,isActive:1}),a=!0;continue}const r={...s,name:n.name,email:n.email,password:n.password,role:n.role,branch:n.branch,isActive:1};JSON.stringify(r)!==JSON.stringify(s)&&(t.set(n.id,r),a=!0)}a&&N("staff",Array.from(t.values()).sort((n,s)=>n.id-s.id))}async function ia(){localStorage.getItem(X(Ce))||(N("staff",G),N("customers",[]),N("orders",[]),N("payments",[]),N("fold_logs",[]),N("expenses",[]),N("sales",[]),localStorage.getItem(X("services"))||N("services",J),localStorage.getItem(X("item_categories"))||N("item_categories",ne),localStorage.getItem(X("machines"))||N("machines",z),localStorage.getItem(X("subcleanings"))||N("subcleanings",[]),localStorage.getItem(X("settings"))||N("settings",pe),localStorage.removeItem("laba101-mobile-session"),N(Ce,!0))}async function yt(e){for(const t of G){if(((await e.query("SELECT id FROM staff WHERE id = ?",[t.id])).values??[]).length>0){await e.run("UPDATE staff SET name = ?, email = ?, password = ?, role = ?, branch = ?, isActive = 1 WHERE id = ?",[t.name,t.email,t.password,t.role,t.branch,t.id]);continue}await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.email,t.password,t.role,t.branch,1])}}async function oa(e){if(!(((await e.query("SELECT COUNT(*) as count FROM machines")).values?.[0]?.count??0)>0))for(const a of z)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[a.id,a.machineName,a.machineType,a.status,a.branch])}async function ca(e){for(const t of pe)await e.run("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)",[t.key,t.value])}async function ft(e){for(const t of J)((await e.query("SELECT id FROM laundry_services WHERE id = ?",[t.id])).values??[]).length>0||await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive]);for(const t of ne)((await e.query("SELECT id FROM item_categories WHERE id = ?",[t.id])).values??[]).length>0||await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[t.id,t.name,t.maxKg,t.additionalFee,t.isActive])}async function la(e){((await e.query("SELECT value FROM settings WHERE key = ?",[Ce])).values??[]).length>0||(await e.execute(`
    DELETE FROM payments;
    DELETE FROM orders;
    DELETE FROM customers;
    DELETE FROM fold_logs;
    DELETE FROM disbursement_expenses;
    DELETE FROM daily_sales;
    DELETE FROM revolving_history;
    DELETE FROM staff WHERE id NOT IN (1, 2);
  `),await yt(e),await ft(e),await oa(e),await ca(e),await e.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",[Ce,V()]),localStorage.removeItem("laba101-mobile-session"))}async function da(){if(!C.isNativePlatform()){await ia(),!localStorage.getItem(X("seeded_v4"))&&!localStorage.getItem(X("services"))&&!localStorage.getItem(X("staff"))&&(N("staff",G),N("customers",$e),N("services",J),N("item_categories",ne),N("orders",se),N("payments",ue),N("fold_logs",[]),N("expenses",re),N("sales",me),N("revolving_history",ve),N("machines",z),N("subcleanings",[]),N("settings",pe),N("seeded_v4",!0)),await na(),ra(),localStorage.getItem(X("seeded_v4"))||N("seeded_v4",!0);return}const e=await O();await e.execute(`
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
    CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY NOT NULL, value TEXT NOT NULL);
  `),await U(e,"staff","email","TEXT"),await U(e,"staff","password","TEXT"),await U(e,"staff","role","TEXT"),await U(e,"staff","isActive","INTEGER NOT NULL DEFAULT 1"),await e.run('UPDATE staff SET password = ? WHERE password IS NULL OR password = ""',["password"]),await e.run('UPDATE staff SET role = ? WHERE role IS NULL OR role = ""',["staff"]),await U(e,"orders","customerId","INTEGER NOT NULL DEFAULT 0"),await U(e,"orders","phone","TEXT"),await U(e,"orders","serviceId","INTEGER NOT NULL DEFAULT 0"),await U(e,"orders","serviceLines","TEXT"),await U(e,"orders","itemCategoryId","INTEGER NOT NULL DEFAULT 0"),await U(e,"orders","itemCategory",'TEXT NOT NULL DEFAULT "Regular Clothes"'),await U(e,"orders","workflowCompleted","TEXT"),await U(e,"orders","weightKg","REAL NOT NULL DEFAULT 0"),await U(e,"orders","price","REAL NOT NULL DEFAULT 0"),await U(e,"orders","additionalCharge","REAL NOT NULL DEFAULT 0"),await U(e,"orders","extraServiceAmount","REAL NOT NULL DEFAULT 0"),await U(e,"orders","totalAmount","REAL NOT NULL DEFAULT 0"),await U(e,"orders","paidAmount","REAL NOT NULL DEFAULT 0"),await U(e,"orders","extras","TEXT"),await U(e,"orders","notes","TEXT"),await U(e,"orders","foldedByStaffIds","TEXT"),await U(e,"orders","releasedBy","INTEGER"),await U(e,"orders","dueAt","TEXT"),await U(e,"orders","createdAt",'TEXT NOT NULL DEFAULT ""'),await U(e,"daily_sales","saleNumber","TEXT"),await U(e,"daily_sales","status","TEXT"),await U(e,"daily_sales","endorsedTo","TEXT"),await U(e,"daily_sales","statusUpdatedAt","TEXT"),await U(e,"disbursement_expenses","disbursementType",'TEXT NOT NULL DEFAULT "daily"'),await U(e,"subcleanings","cleaningType",'TEXT NOT NULL DEFAULT "tube"');const a=((await e.query("SELECT COUNT(*) as count FROM staff")).values?.[0]?.count??0)===0;if(a){for(const n of G)await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[n.id,n.name,n.email,n.password,n.role,n.branch,1]);for(const n of $e)await e.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[n.id,n.name,n.phone,n.address]);for(const n of J)await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[n.id,n.name,n.description,n.category,n.serviceType,n.price,n.maxKg,n.dryingMinutes,JSON.stringify(n.includes),n.additionalCharge,n.turnaroundHours,n.isActive]);for(const n of ne)await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[n.id,n.name,n.maxKg,n.additionalFee,n.isActive]);for(const n of se)await ht(e,n);for(const n of ue)await e.run("INSERT INTO payments (id, orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?, ?)",[n.id,n.orderId,n.amount,n.method,n.reference,n.receivedAt,n.branch]);for(const n of re)await e.run("INSERT INTO disbursement_expenses (id, expenseDate, number, disbursementType, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[n.id,n.expenseDate,n.number,n.disbursementType??"daily",n.name,n.category,n.description,n.amount]);for(const n of me)await e.run("INSERT INTO daily_sales (id, saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?, ?)",[n.id,n.saleDate,n.saleNumber,n.cashAmount,n.gcashAmount,n.totalAmount,n.notes]);for(const n of ve)await e.run("INSERT INTO revolving_history (id, revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[n.id,n.revolvingNumber,n.name,n.amount,n.category,n.description,n.type,n.createdAt]);for(const n of z)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[n.id,n.machineName,n.machineType,n.status,n.branch]);for(const n of pe)await e.run("INSERT INTO settings (key, value) VALUES (?, ?)",[n.key,n.value]);await e.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",["fresh_install_defaults",V()])}await De(e),await yt(e),a||await ft(e),await la(e)}async function ht(e,t){await e.run("INSERT INTO orders (id, ticket, customerId, customer, phone, serviceId, service, serviceLines, itemCategoryId, itemCategory, branch, status, workflowCompleted, weightKg, price, additionalCharge, extraServiceAmount, totalAmount, paidAmount, extras, notes, foldedBy, foldedByStaffIds, dueAt, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.ticket,t.customerId,t.customer,t.phone,t.serviceId,t.service,JSON.stringify(t.serviceLines??[]),t.itemCategoryId,t.itemCategory,t.branch,t.status,JSON.stringify(t.workflowCompleted),t.weightKg,t.price,t.additionalCharge,t.extraServiceAmount,t.totalAmount,t.paidAmount,JSON.stringify(t.extras),t.notes,t.foldedBy,JSON.stringify(t.foldedByStaffIds??[]),t.dueAt,t.createdAt])}function ua(e){const t=Number(e.paidAmount??0),a=Number(e.totalAmount??0),n=Number(e.foldedBy),s=Number(e.releasedBy),r=Q(e.serviceLines,[]),i=Number(e.serviceId),o=String(e.service),c=Number(e.price);return{id:Number(e.id),ticket:String(e.ticket),customerId:Number(e.customerId),customer:String(e.customer),phone:e.phone?String(e.phone):null,serviceId:i,service:o,serviceLines:r.length?r:[{id:i,name:o,price:c,quantity:1,total:c}],itemCategoryId:Number(e.itemCategoryId),itemCategory:String(e.itemCategory),branch:String(e.branch),status:String(e.status),workflowCompleted:Q(e.workflowCompleted,[]),weightKg:Number(e.weightKg),price:c,additionalCharge:Number(e.additionalCharge),extraServiceAmount:Number(e.extraServiceAmount),totalAmount:a,paidAmount:t,balance:Number((a-t).toFixed(2)),extras:Q(e.extras,[]),notes:e.notes?String(e.notes):null,foldedBy:Number.isFinite(n)&&n>0?n:null,foldedByName:e.foldedByName?String(e.foldedByName):null,foldedByStaffIds:Q(e.foldedByStaffIds,[]),releasedBy:Number.isFinite(s)&&s>0?s:null,releasedByName:e.releasedByName?String(e.releasedByName):null,dueAt:String(e.dueAt),createdAt:String(e.createdAt)}}async function ma(){await da()}async function ce(){return(await He()).find(t=>t.key==="branch")?.value??"Main Store"}async function va(){const e=await He();return Number(e.find(t=>t.key==="fold_rate")?.value??"5")}async function gt(e){return(await He()).find(a=>a.key===e)?.value}async function He(){return C.isNativePlatform()?(await(await O()).query("SELECT key, value FROM settings ORDER BY key")).values??[]:A("settings",pe)}async function we(e,t){if(!C.isNativePlatform()){const n=A("settings",pe).filter(s=>s.key!==e);n.push({key:e,value:t}),N("settings",n);return}await(await O()).run("REPLACE INTO settings (key, value) VALUES (?, ?)",[e,t])}async function pa(e){return C.isNativePlatform()?(await(await O()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff WHERE branch = ? ORDER BY name ASC',[e])).values??[]:A("staff",G).filter(n=>n.branch===e)}async function bt(){return C.isNativePlatform()?(await(await O()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff ORDER BY name ASC')).values??[]:A("staff",G)}async function Et(e,t){const a=e.trim().toLowerCase();return(await bt()).find(s=>s.email.toLowerCase()===a&&s.password===t&&s.isActive!==0)??null}async function ya(e){if(!C.isNativePlatform()){const a=A("staff",G);a.unshift({id:j(a),...e,isActive:1}),N("staff",a);return}await(await O()).run("INSERT INTO staff (name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?)",[e.name,e.email,e.password,e.role,e.branch,1])}async function st(e,t){if(!C.isNativePlatform()){const r=A("staff",G),i=r.find(o=>o.id===e);i&&(Object.assign(i,t),N("staff",r));return}const a=await O(),n=[],s=[];for(const[r,i]of Object.entries(t))r!=="id"&&(n.push(`${r} = ?`),s.push(i));n.length&&(s.push(e),await a.run(`UPDATE staff SET ${n.join(", ")} WHERE id = ?`,s))}async function fa(){return C.isNativePlatform()?(await(await O()).query("SELECT id, name, phone, address FROM customers ORDER BY name ASC")).values??[]:A("customers",$e).sort((a,n)=>a.name.localeCompare(n.name))}async function ha(e){if(!C.isNativePlatform()){const s=A("customers",$e),r=e.id?s.find(o=>o.id===e.id):s.find(o=>o.name.toLowerCase()===e.name.toLowerCase()&&(e.phone?o.phone===e.phone:!0));if(r)return r.name=e.name,r.phone=e.phone??r.phone,r.address=e.address??r.address,N("customers",s),r;const i={id:j(s),name:e.name,phone:e.phone??null,address:e.address??null};return s.push(i),N("customers",s),i}const t=await O();if(e.id)return await t.run("UPDATE customers SET name = ?, phone = ?, address = ? WHERE id = ?",[e.name,e.phone??null,e.address??null,e.id]),{id:e.id,name:e.name,phone:e.phone??null,address:e.address??null};const a=await t.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM customers"),n=Number((a.values?.[0]).id);return await t.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[n,e.name,e.phone??null,e.address??null]),{id:n,name:e.name,phone:e.phone??null,address:e.address??null}}async function We(e){if(!C.isNativePlatform())return A("services",J).filter(n=>!0);const t=await O(),a=await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[]);return(a.values??[]).length===0?(await De(t),((await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[])).values??[]).map(s=>({...s,includes:Q(s.includes,[])}))):(a.values??[]).map(n=>({...n,includes:Q(n.includes,[])}))}async function ga(){if(!C.isNativePlatform())return A("services",J);const e=await O(),t=await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC");return(t.values??[]).length===0?(await De(e),((await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC")).values??[]).map(n=>({...n,includes:Q(n.includes,[])}))):(t.values??[]).map(a=>({...a,includes:Q(a.includes,[])}))}async function rt(e){if(!C.isNativePlatform()){const a=A("services",J),n=e.id?a.find(s=>s.id===e.id):null;n?Object.assign(n,e):a.unshift({...e,id:j(a)}),N("services",a);return}const t=await O();e.id?await t.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = ? WHERE id = ?",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive,e.id]):await t.run("INSERT INTO laundry_services (name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive])}async function St(){if(!C.isNativePlatform())return A("item_categories",ne).filter(a=>a.isActive);const e=await O(),t=await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC");return(t.values??[]).length===0?(await De(e),(await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC")).values??[]):t.values??[]}async function ba(e){if(!C.isNativePlatform()){const a=A("item_categories",ne),n=e.id?a.find(s=>s.id===e.id):null;n?Object.assign(n,e):a.unshift({...e,id:j(a)}),N("item_categories",a);return}const t=await O();e.id?await t.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = ? WHERE id = ?",[e.name,e.maxKg,e.additionalFee,e.isActive,e.id]):await t.run("INSERT INTO item_categories (name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?)",[e.name,e.maxKg,e.additionalFee,e.isActive])}function Ne(e,t,a,n){const s=(Array.isArray(e)?e:[e]).map(y=>{const f=Math.max(0,Number(y.quantity??1)),$=Number(y.price);return{id:y.id,name:y.name,price:$,quantity:f,total:Number(($*f).toFixed(2))}}).filter(y=>y.quantity>0),r=Number(t.maxKg),i=0,o=0,c=n.map(y=>{const f=Math.max(0,Number(y.quantity??1)),$=Number(y.price);return{id:y.id,name:ea(y.name),price:$,quantity:f,total:Number(($*f).toFixed(2))}}).filter(y=>y.quantity>0),l=s.reduce((y,f)=>y+f.total,0),u=c.reduce((y,f)=>y+f.total,0),v=Number((l+o+u).toFixed(2));return{price:Number(l.toFixed(2)),additionalCharge:Number(o.toFixed(2)),extraServiceAmount:Number(u.toFixed(2)),totalAmount:v,allowedKg:r,extraKg:Number(i.toFixed(2)),warning:null,serviceLines:s,extras:c}}function Tt(e,t){return[...(e.serviceLines&&e.serviceLines.length?e.serviceLines:e.serviceId?[{id:e.serviceId}]:[]).some(s=>{const r=t.find(i=>i.id===s.id);return Array.isArray(r?.includes)&&r.includes.includes("Fold")})?[{key:"fold",label:"Fold"}]:[],{key:"claimed",label:"Claimed"}]}function Ea(e){return e.includes("claimed")?"claimed":e.includes("fold")?"ready":"received"}async function fe(e){return C.isNativePlatform()?((await(await O()).query("SELECT o.*, folded.name as foldedByName, released.name as releasedByName FROM orders o LEFT JOIN staff folded ON folded.id = o.foldedBy LEFT JOIN staff released ON released.id = o.releasedBy WHERE o.branch = ? ORDER BY o.id DESC",[e])).values??[]).map(n=>ua(n)):A("orders",se).filter(n=>n.branch===e).map(n=>({...n,serviceLines:n.serviceLines??[{id:n.serviceId,name:n.service,price:Number(n.price),quantity:1,total:Number(n.price)}],foldedByStaffIds:n.foldedByStaffIds??[],releasedBy:n.releasedBy??null,releasedByName:n.releasedByName??null,balance:Number((n.totalAmount-n.paidAmount).toFixed(2))}))}async function Sa(e){const[t,a]=await Promise.all([We(),St()]),n=e.serviceQuantities??(e.serviceId?{[e.serviceId]:1}:{}),s=t.filter(p=>p.serviceType==="order"&&Number(n[p.id]??0)>0).map(p=>({...p,quantity:Number(n[p.id]??0)})),r=s[0],i=a.find(p=>p.id===e.itemCategoryId)??a.find(p=>p.name.toLowerCase()===(r?.category??"").toLowerCase())??a.find(p=>p.name==="Regular Clothes")??a[0],o=e.addonQuantities??Object.fromEntries((e.addonIds??[]).map(p=>[p,1])),c=t.filter(p=>p.serviceType==="addon"&&Number(o[p.id]??0)>0).map(p=>({...p,quantity:Number(o[p.id]??0)}));if(!s.length&&!c.length)throw new Error("Please select at least one service or extra service.");const l=e.weightKg??Math.max(1,Number(i?.maxKg||r?.maxKg||1)),u=Ne(s,i,l,c),v=await ha({id:e.customerId||void 0,name:e.customerName,phone:e.customerPhone??null}),y=Math.max(0,e.paidAmount),f=Math.min(u.totalAmount,y),$={ticket:await Ta(),customerId:v.id,customer:v.name,phone:v.phone,serviceId:r?.id??0,service:u.serviceLines.length?u.serviceLines.map(p=>`${p.name} x${p.quantity}`).join(", "):"Extras only",serviceLines:u.serviceLines,itemCategoryId:i.id,itemCategory:i.name,branch:e.branch,status:"received",workflowCompleted:["received"],weightKg:l,price:u.price,additionalCharge:u.additionalCharge,extraServiceAmount:u.extraServiceAmount,totalAmount:u.totalAmount,paidAmount:f,balance:Number((u.totalAmount-f).toFixed(2)),extras:u.extras,notes:e.notes||null,foldedBy:null,foldedByName:null,foldedByStaffIds:[],releasedBy:null,releasedByName:null,dueAt:new Date(Date.now()+Math.max(1,...s.map(p=>p.turnaroundHours))*60*60*1e3).toISOString(),createdAt:V()};if(!C.isNativePlatform()){const p=A("orders",se),E={...$,id:j(p)};return p.unshift(E),N("orders",p),y>0&&await Me(E.id,{amount:y,method:e.paymentMethod,reference:e.paymentReference??null}),E}const T=await O(),g=await T.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM orders"),R={...$,id:Number((g.values?.[0]).id)};return await ht(T,R),y>0&&await T.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[R.id,y,e.paymentMethod,e.paymentReference??null,V(),e.branch]),R}async function Ta(){const e=`LB${sa()}`,t=await ce(),n=(await fe(t)).filter(r=>r.ticket.startsWith(e)).sort((r,i)=>i.ticket.localeCompare(r.ticket))[0],s=n?Number(n.ticket.slice(-3))+1:1;return`${e}-${String(s).padStart(3,"0")}`}async function it(e,t){const a=await ce(),[n,s]=await Promise.all([fe(a),We()]),r=n.find(l=>l.id===e);if(!r)return;const o=Tt(r,s).map(l=>l.key).find(l=>!r.workflowCompleted.includes(l));if(!o)return;if(r.workflowCompleted=[...r.workflowCompleted,o],r.status=Ea(r.workflowCompleted),o==="fold"&&t){const l=Array.isArray(t)?t:[t];r.foldedBy=l[0]||null;const u=Array.isArray(r.foldedByStaffIds)?[...r.foldedByStaffIds]:[];u.push(...l),r.foldedByStaffIds=u}if(o==="claimed"&&t){const l=Array.isArray(t)?t:[t];r.releasedBy=l[0]||null}if(!C.isNativePlatform()){const l=A("orders",se),u=l.find(v=>v.id===r.id);u&&Object.assign(u,r),N("orders",l);return}await(await O()).run("UPDATE orders SET workflowCompleted = ?, status = ?, foldedBy = ?, foldedByStaffIds = ?, releasedBy = ? WHERE id = ?",[JSON.stringify(r.workflowCompleted),r.status,r.foldedBy,JSON.stringify(r.foldedByStaffIds??[]),r.releasedBy,r.id])}async function Me(e,t){const a=await ce();if(!(await fe(a)).find(o=>o.id===e))return;const r=Math.max(0,t.amount);if(r<=0)return;if(!C.isNativePlatform()){const o=A("payments",ue);o.unshift({id:j(o),orderId:e,amount:r,method:t.method,reference:t.reference??null,receivedAt:V(),branch:a}),N("payments",o);const c=A("orders",se),l=c.find(u=>u.id===e);l&&(l.paidAmount=Math.min(l.totalAmount,Number((l.paidAmount+r).toFixed(2)))),N("orders",c);return}const i=await O();await i.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[e,r,t.method,t.reference??null,V(),a]),await i.run("UPDATE orders SET paidAmount = MIN(totalAmount, paidAmount + ?) WHERE id = ?",[r,e])}async function wa(e){return C.isNativePlatform()?(await(await O()).query("SELECT id, orderId, amount, method, reference, receivedAt, branch FROM payments  ORDER BY receivedAt DESC",[])).values??[]:A("payments",ue).filter(n=>!0)}async function Na(e){const t=await ce(),n=(await fe(t)).find(r=>r.id===e);if(!n)return;if(n.paidAmount>0)throw new Error("Cancel is only allowed for unpaid orders. Use Delete (admin) to refund paid orders.");if(!C.isNativePlatform()){const r=A("orders",se),i=A("payments",ue),o=A("fold_logs",[]),c=r.filter(v=>v.id!==e),l=i.filter(v=>v.orderId!==e),u=o.filter(v=>v.orderTicket!==n.ticket);N("orders",c),N("payments",l),N("fold_logs",u);return}const s=await O();await s.run("DELETE FROM payments WHERE orderId = ?",[e]),await s.run("DELETE FROM fold_logs WHERE orderTicket = ?",[n.ticket]),await s.run("DELETE FROM orders WHERE id = ?",[e])}async function La(e){const t=await ce(),n=(await fe(t)).find(r=>r.id===e);if(!n)return;if(n.paidAmount<=0)throw new Error("Delete (refund) is only allowed for paid orders.");if(!C.isNativePlatform()){const r=A("orders",se),i=A("payments",ue),o=A("fold_logs",[]),c=r.filter(v=>v.id!==e),l=i.filter(v=>v.orderId!==e),u=o.filter(v=>v.orderTicket!==n.ticket);N("orders",c),N("payments",l),N("fold_logs",u);return}const s=await O();await s.run("DELETE FROM payments WHERE orderId = ?",[e]),await s.run("DELETE FROM fold_logs WHERE orderTicket = ?",[n.ticket]),await s.run("DELETE FROM orders WHERE id = ?",[e])}async function Aa(){return C.isNativePlatform()?(await(await O()).query("SELECT id, orderTicket, staffName, foldCount, rate, total, createdAt FROM fold_logs ORDER BY id DESC")).values??[]:A("fold_logs",[])}async function Ca(e){const t=Number((e.foldCount*e.rate).toFixed(2));if(!C.isNativePlatform()){const n=A("fold_logs",[]);n.unshift({id:Date.now(),...e,total:t,createdAt:V()}),N("fold_logs",n);return}await(await O()).run("INSERT INTO fold_logs (orderTicket, staffName, foldCount, rate, total, createdAt) VALUES (?, ?, ?, ?, ?, ?)",[e.orderTicket,e.staffName,e.foldCount,e.rate,t,V()])}async function $a(e){return C.isNativePlatform()?(await(await O()).query("SELECT id, timestamp, staffId, staffName, action, details, branch FROM activity_logs WHERE branch = ? ORDER BY timestamp DESC, id DESC",[e])).values??[]:A("activity_logs",[]).filter(n=>n.branch===e).sort((n,s)=>s.timestamp.localeCompare(n.timestamp))}async function Ra(e){const t={timestamp:V(),staffId:e.staffId??null,staffName:e.staffName,action:e.action,details:e.details??"",branch:e.branch};if(!C.isNativePlatform()){const n=A("activity_logs",[]);n.unshift({id:j(n),...t}),N("activity_logs",n);return}await(await O()).run("INSERT INTO activity_logs (timestamp, staffId, staffName, action, details, branch) VALUES (?, ?, ?, ?, ?, ?)",[t.timestamp,t.staffId,t.staffName,t.action,t.details,t.branch])}async function Oa(){return C.isNativePlatform()?(await(await O()).query('SELECT id, expenseDate, number, COALESCE(disbursementType, "daily") as disbursementType, name, category, description, amount FROM disbursement_expenses ORDER BY expenseDate DESC, id DESC')).values??[]:A("expenses",re).map(a=>({...a,disbursementType:a.disbursementType??"daily"}))}function Ie(e){const t=/^DISB-(\d+)$/i.exec(String(e??"").trim());return t?Number(t[1]):0}function ot(e){const t=/^REV-(\d+)$/i.exec(String(e??"").trim());return t?Number(t[1]):0}async function Da(){let e=0;if(!C.isNativePlatform()){const s=A("expenses",re),r=A("revolving_history",ve);for(const i of s)e=Math.max(e,Ie(i.number));for(const i of r)i.type==="disbursement"&&(e=Math.max(e,Ie(i.revolvingNumber)));return e}const t=await O(),a=await t.query("SELECT number FROM disbursement_expenses"),n=await t.query("SELECT revolvingNumber as number FROM revolving_history WHERE type = 'disbursement'");for(const s of[...a.values??[],...n.values??[]])e=Math.max(e,Ie(String(s.number)));return e}async function wt(){const e=await Da()+1;return`DISB-${String(e).padStart(2,"0")}`}async function xa(){let e=0;if(!C.isNativePlatform()){const n=A("revolving_history",ve);for(const s of n)s.type==="add"&&(e=Math.max(e,ot(s.revolvingNumber)));return`REV-${String(e+1).padStart(2,"0")}`}const a=await(await O()).query("SELECT revolvingNumber FROM revolving_history WHERE type = 'add'");for(const n of a.values??[])e=Math.max(e,ot(String(n.revolvingNumber)));return`REV-${String(e+1).padStart(2,"0")}`}async function Nt(e){if(!C.isNativePlatform()){const a=A("expenses",re),n=j(a);a.unshift({id:n,expenseDate:e.expenseDate,number:e.number,disbursementType:e.disbursementType??"daily",name:e.name,category:e.category,description:e.description||null,amount:e.amount}),N("expenses",a);return}await(await O()).run("INSERT INTO disbursement_expenses (expenseDate, number, disbursementType, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?, ?)",[e.expenseDate,e.number,e.disbursementType??"daily",e.name,e.category,e.description||null,e.amount])}async function Pa(e){const t=await wt();await Nt({expenseDate:e.expenseDate,number:t,disbursementType:e.disbursementType??"daily",name:e.name,category:e.category,description:e.description,amount:e.amount})}async function Ia(e,t){if(!C.isNativePlatform()){const n=A("expenses",re),s=n.find(r=>r.id===e);s&&(Object.assign(s,{expenseDate:t.expenseDate,disbursementType:t.disbursementType??"daily",name:t.name,category:t.category,description:t.description||null,amount:t.amount}),N("expenses",n));return}await(await O()).run("UPDATE disbursement_expenses SET expenseDate = ?, disbursementType = ?, name = ?, category = ?, description = ?, amount = ? WHERE id = ?",[t.expenseDate,t.disbursementType??"daily",t.name,t.category,t.description||null,t.amount,e])}async function qa(e){if(!C.isNativePlatform()){const a=A("expenses",re);N("expenses",a.filter(n=>n.id!==e));return}await(await O()).run("DELETE FROM disbursement_expenses WHERE id = ?",[e])}async function Fa(){return C.isNativePlatform()?(await(await O()).query('SELECT id, saleDate, COALESCE(saleNumber, "") as saleNumber, cashAmount, gcashAmount, totalAmount, notes, status, endorsedTo, statusUpdatedAt FROM daily_sales ORDER BY saleDate DESC, id DESC')).values??[]:A("sales",me)}async function Ua(e){const t=Number((e.cashAmount+e.gcashAmount).toFixed(2));if(!C.isNativePlatform()){const r=A("sales",me),i=e.id?r.find(o=>o.id===e.id):r.find(o=>o.saleDate===e.saleDate);if(i)Object.assign(i,{saleDate:e.saleDate,cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null});else{const o=j(r);r.unshift({id:o,saleDate:e.saleDate,saleNumber:`SALE-${String(o).padStart(2,"0")}`,cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null})}N("sales",r);return}const a=await O(),s=(e.id?await a.query("SELECT id, saleNumber FROM daily_sales WHERE id = ?",[e.id]):await a.query("SELECT id, saleNumber FROM daily_sales WHERE saleDate = ?",[e.saleDate])).values?.[0];if(s)await a.run("UPDATE daily_sales SET saleDate = ?, cashAmount = ?, gcashAmount = ?, totalAmount = ?, notes = ? WHERE id = ?",[e.saleDate,e.cashAmount,e.gcashAmount,t,e.notes||null,s.id]);else{const r=await a.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM daily_sales"),i=Number((r.values?.[0]).id);await a.run("INSERT INTO daily_sales (saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?)",[e.saleDate,`SALE-${String(i).padStart(2,"0")}`,e.cashAmount,e.gcashAmount,t,e.notes||null])}}async function ka(e){if(!C.isNativePlatform()){const a=A("sales",me);N("sales",a.filter(n=>n.id!==e));return}await(await O()).run("DELETE FROM daily_sales WHERE id = ?",[e])}async function ct(e,t,a=null,n){if(!C.isNativePlatform()){const r=A("sales",me),i=r.find(o=>o.id===e);i&&(i.status=t,i.endorsedTo=a,i.statusUpdatedAt=n,N("sales",r));return}await(await O()).run("UPDATE daily_sales SET status = ?, endorsedTo = ?, statusUpdatedAt = ? WHERE id = ?",[t,a,n,e])}async function Ma(){return C.isNativePlatform()?(await(await O()).query("SELECT id, revolvingNumber, name, amount, category, description, type, createdAt FROM revolving_history ORDER BY createdAt DESC, id DESC")).values??[]:A("revolving_history",ve).sort((a,n)=>n.createdAt.localeCompare(a.createdAt))}async function lt(e){const t=e.type==="disbursement"?await wt():await xa();if(e.type==="disbursement"){const n=e.expenseDate??e.createdAt.slice(0,10);await Nt({expenseDate:n,number:t,name:e.name,category:e.category,description:e.description??"",amount:e.amount})}if(!C.isNativePlatform()){const n=A("revolving_history",ve),s=j(n);n.unshift({id:s,revolvingNumber:t,...e}),N("revolving_history",n);return}await(await O()).run("INSERT INTO revolving_history (revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)",[t,e.name,e.amount,e.category,e.description||null,e.type,e.createdAt])}async function Lt(e){return C.isNativePlatform()?(await(await O()).query("SELECT id, machineName, machineType, status, branch FROM machines WHERE branch = ? ORDER BY machineType, machineName",[e])).values??[]:A("machines",z).filter(n=>n.branch===e)}async function Ba(e){return C.isNativePlatform()?(await(await O()).query("SELECT id, name, unit, quantity, reorderLevel, notes, branch, updatedAt FROM inventory_items WHERE branch = ? ORDER BY name ASC",[e])).values??[]:A("inventory_items",[]).filter(n=>n.branch===e).sort((n,s)=>n.name.localeCompare(s.name))}async function _a(e){const t={name:e.name,unit:e.unit,quantity:e.quantity,reorderLevel:e.reorderLevel,notes:e.notes||null,branch:e.branch,updatedAt:V()};if(!C.isNativePlatform()){const n=A("inventory_items",[]),s=e.id?n.find(r=>r.id===e.id):null;s?Object.assign(s,t):n.unshift({id:j(n),...t}),N("inventory_items",n);return}const a=await O();e.id?await a.run("UPDATE inventory_items SET name = ?, unit = ?, quantity = ?, reorderLevel = ?, notes = ?, updatedAt = ? WHERE id = ?",[t.name,t.unit,t.quantity,t.reorderLevel,t.notes,t.updatedAt,e.id]):await a.run("INSERT INTO inventory_items (name, unit, quantity, reorderLevel, notes, branch, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)",[t.name,t.unit,t.quantity,t.reorderLevel,t.notes,t.branch,t.updatedAt])}async function ja(e){if(!C.isNativePlatform()){const a=A("machines",z);a.unshift({id:j(a),...e}),N("machines",a);return}await(await O()).run("INSERT INTO machines (machineName, machineType, status, branch) VALUES (?, ?, ?, ?)",[e.machineName,e.machineType,e.status,e.branch])}async function Ha(e,t){if(!C.isNativePlatform()){const n=A("machines",z),s=n.find(r=>r.id===e);s&&(s.status=t,N("machines",n));return}await(await O()).run("UPDATE machines SET status = ? WHERE id = ?",[t,e])}async function Wa(e){return C.isNativePlatform()?((await(await O()).query('SELECT id, date, machineIds, machineNames, cleaningStatus, COALESCE(cleaningType, "tube") as cleaningType, notes, branch FROM subcleanings WHERE branch = ? ORDER BY date DESC, id DESC',[e])).values??[]).map(n=>({...n,machineIds:Q(n.machineIds,[])})):A("subcleanings",[]).filter(n=>n.branch===e).map(n=>({...n,cleaningType:n.cleaningType??"tube"}))}async function Xa(e){const a=(await Lt(e.branch)).filter(i=>e.machineIds.includes(i.id)).map(i=>i.machineName).join(", "),n=e.cleaningType??"tube";if(!C.isNativePlatform()){const i=A("subcleanings",[]);i.unshift({id:j(i),date:e.date,machineIds:e.machineIds,machineNames:a,cleaningStatus:e.cleaningStatus,cleaningType:n,notes:e.notes||null,branch:e.branch}),N("subcleanings",i);const o=A("machines",z);o.forEach(c=>{e.machineIds.includes(c.id)&&(c.status=e.cleaningStatus==="completed"?"available":"under_cleaning")}),N("machines",o);return}const s=await O();await s.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, cleaningType, notes, branch) VALUES (?, ?, ?, ?, ?, ?, ?)",[e.date,JSON.stringify(e.machineIds),a,e.cleaningStatus,n,e.notes||null,e.branch]);const r=e.cleaningStatus==="completed"?"available":"under_cleaning";for(const i of e.machineIds)await s.run("UPDATE machines SET status = ? WHERE id = ?",[r,i])}async function Ka(e,t){if(!C.isNativePlatform()){const i=A("machines",z),o=i.find(u=>u.id===e);o&&(o.status="available"),N("machines",i);const c=A("subcleanings",[]),l=ke();c.unshift({id:j(c),date:l,machineIds:[e],machineNames:o?.machineName??"",cleaningStatus:"completed",cleaningType:"tube",notes:null,branch:t}),N("subcleanings",c);return}const a=await O(),s=(await a.query("SELECT machineName FROM machines WHERE id = ?",[e])).values?.[0]?.machineName??"";await a.run("UPDATE machines SET status = ? WHERE id = ?",["available",e]);const r=ke();await a.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, cleaningType, notes, branch) VALUES (?, ?, ?, ?, ?, ?, ?)",[r,JSON.stringify([e]),s,"completed","tube",null,t])}const Xe=document.querySelector("#app");if(!Xe)throw new Error("App root not found");let Se;const ye=oe("BluetoothThermalPrinter"),Ke={dashboard:"Dashboard",pos:"POS",orders:"Orders",archived:"Archived Order",customers:"Customers",pricing:"Pricing Services",disbursements:"Daily Report",reports:"Reports",logs:"Logs",inventory:"Inventory",maintenance:"Maintenance",staff:"Staff",revolving:"Revolving Fund",settings:"Settings"},d={tab:"dashboard",receiptOrderId:0,currentUser:null,loginError:"",sidebarOpen:!1,dailyReportTab:"expenses",maintenanceTab:"cleaning",customerSearch:"",orderSearch:"",orderDateFilter:"",orderPaymentFilter:"",printerPanelOpen:!1,printerLoading:!1,printerError:"",printerStatus:"",printerPaperWidth:58,pairedPrinters:[],selectedPrinterAddress:"",archivedOrderSearch:"",paymentModalOrderId:0,reportPreview:null,endorseModalOpen:!1,endorseSaleId:0,endorseSaleDate:"",revolvingModalOpen:!1,revolvingSaleId:0,addFundModalOpen:!1,disbursementModalOpen:!1,revolvingHistoryFrom:"",revolvingHistoryTo:""},Ga=["Wash","Dry","Fold","Detergent","Fabcon","Zonrox"],Va=["Supplies","Utilities","Maintenance","Salary","Rent","Transport","Other"],be="laba101-mobile-session";function w(e){return new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(e||0)}function m(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ee(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}function xe(e,t){return Number((e-t).toFixed(2))}function At(e,t,a,n=0){const s=t.filter(i=>K(i.createdAt)===e).reduce((i,o)=>i+o.paidAmount,0),r=a.filter(i=>te(i)==="daily"&&i.expenseDate===e).reduce((i,o)=>i+o.amount,0);return xe(s+n,r)}function Ya(e,t){const a=new Map(t.map(s=>[s.id,s.name])),n=new Map;return e.filter(s=>s.workflowCompleted.includes("fold")).forEach(s=>{(Array.isArray(s.foldedByStaffIds)&&s.foldedByStaffIds.length?s.foldedByStaffIds:s.foldedBy?[s.foldedBy]:[]).forEach(i=>{if(!i)return;const o=a.get(i)??String(i),c=n.get(i)??{staffId:i,staffName:o,folds:0};c.folds+=1,n.set(i,c)})}),e.filter(s=>s.workflowCompleted.includes("fold")&&s.foldedByName&&s.foldedBy).forEach(s=>{const r=n.get(s.foldedBy);r&&r.staffName===String(s.foldedBy)&&(r.staffName=s.foldedByName)}),Array.from(n.values()).map(s=>({staffName:s.staffName,folds:s.folds}))}function ie(e=new Date){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${n}`}function H(){return ie()}function Be(){return H().slice(0,7)}function te(e){return e.disbursementType==="monthly"?"monthly":"daily"}function Ct(e){return e.slice(0,7)}function $t(e){return te(e)==="monthly"?Ct(e.expenseDate):e.expenseDate}function K(e){return ie(new Date(e))}function Re(e){return e.paidAmount<=0?"unpaid":e.balance>0?"partial":"paid"}function Rt(e,t,a){const n=new Map(t.map(i=>[i.id,i])),s=new Map(t.map(i=>[i.id,Number(i.totalAmount||0)])),r={cash:0,gcash:0,total:0};return[...e].sort((i,o)=>new Date(i.receivedAt).getTime()-new Date(o.receivedAt).getTime()||i.id-o.id).forEach(i=>{const o=n.get(i.orderId);if(!o)return;const c=s.get(o.id)??0,l=Math.min(Math.max(0,Number(i.amount||0)),c);s.set(o.id,Number((c-l).toFixed(2))),!(!a(i)||l<=0)&&(i.method==="gcash"?r.gcash+=l:r.cash+=l,r.total+=l)}),{cash:Number(r.cash.toFixed(2)),gcash:Number(r.gcash.toFixed(2)),total:Number(r.total.toFixed(2))}}function ae(e){return new Intl.DateTimeFormat("en-PH",{dateStyle:"medium",timeStyle:"short"}).format(new Date(e))}function Qa(e){const t=new Date(e),a=new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric",year:"numeric"}).format(t),n=new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",hour12:!0}).format(t);return`<div class="datetime-stack"><strong>${m(a)}</strong><span class="meta">${m(n)}</span></div>`}function Ja(e){return e?.role==="staff"&&e.branch==="Gensan Branch"}function za(e){return e?.role==="staff"&&e.branch.toLowerCase().includes("mintal")}async function Le(e,t=""){d.currentUser&&await Ra({staffId:d.currentUser.id,staffName:d.currentUser.name,action:e,details:t,branch:await ce()})}function Oe(e,t,a="data-table"){return`
    <div class="table-scroll">
      <table class="${a}">
        <thead><tr>${e.map(n=>`<th>${m(n)}</th>`).join("")}</tr></thead>
        <tbody>${t.length?t.map(n=>`<tr>${n.map(s=>`<td>${s}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${e.length}" class="table-empty">No records found.</td></tr>`}</tbody>
      </table>
    </div>
  `}function Za(e=new Date){return{date:new Intl.DateTimeFormat("en-PH",{weekday:"long",month:"long",day:"numeric",year:"numeric"}).format(e),time:new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",second:"2-digit",hour12:!0}).format(e)}}function Te(){const e=document.querySelector("[data-date-from]"),t=document.querySelector("[data-date-to]"),a=Array.from(document.querySelectorAll('input[name="reportType"]:checked')).map(n=>n.value).filter(n=>n==="sales"||n==="disbursement"||n==="fold_count"||n==="revolving_fund"||n==="summary");return{from:e?.value||"0000-01-01",to:t?.value||"9999-12-31",types:a.length?a:["summary"]}}function ge(e,t){return e>=t.from&&e<=t.to}function Ot(e,t,a,n,s,r,i,o){const c=new Set(o.types),l=e.filter(h=>ge(K(h.createdAt),o)),u=a.filter(h=>ge(h.saleDate,o)),v=n.filter(h=>ge(h.expenseDate,o)),y=Ya(l,r),f=new Map;t.filter(h=>ge(K(h.receivedAt),o)).forEach(h=>{const F=f.get(h.orderId)??{cash:0,gcash:0};h.method==="gcash"?F.gcash+=h.amount:F.cash+=h.amount,f.set(h.orderId,F)});const $=l.reduce((h,F)=>{const _=f.get(F.id);if(_){const Z=_.cash+_.gcash;if(Z>F.totalAmount){const le=F.totalAmount/Z;return h+_.cash*le}return h+_.cash}return h+F.paidAmount},0),T=u.reduce((h,F)=>h+F.cashAmount,0),g=u.reduce((h,F)=>h+F.gcashAmount,0),R=l.reduce((h,F)=>{const _=f.get(F.id);if(_){const Z=_.cash+_.gcash;if(Z>F.totalAmount){const le=F.totalAmount/Z;return h+_.gcash*le}return h+_.gcash}return h+0},0),p=$+T,E=R+g,b=p+E,P=v.reduce((h,F)=>h+F.amount,0),L=P,x=b-L,D=()=>({orderCashTotal:$,orderGcashTotal:R,manualCashTotal:T,manualGcashTotal:g,totalCash:p,totalGcash:E,totalSales:b,transactions:l.map(h=>{const F=f.get(h.id)??{cash:h.paidAmount,gcash:0},_=F.cash+F.gcash;let Z=F.cash,le=F.gcash,Ve=_;if(_>h.totalAmount){const Ye=h.totalAmount/_;Z=F.cash*Ye,le=F.gcash*Ye,Ve=h.totalAmount}return{ticket:h.ticket,customer:h.customer,cash:Z,gcash:le,total:Ve}}),manualSales:u.map(h=>({cash:h.cashAmount,gcash:h.gcashAmount,total:h.totalAmount}))}),I=()=>({totalExpenses:P,totalDisbursement:L,rows:[["Date/Month","id#","Type","Name","Category","Description","Amount"],...v.map(h=>[$t(h),h.number,te(h),h.name,h.category??"",h.description??"",h.amount]),[],["Total Disbursement","","","","","",L]]}),k=()=>({rows:[["Staff","Fold Count"],...y.map(h=>[h.staffName,h.folds]),[],["Total Folds",y.reduce((h,F)=>h+F.folds,0)]]}),M=s.filter(h=>ge(K(h.createdAt),o));return{selection:o,selectedTypes:c,salesRows:D,disbursementRows:I,foldCountRows:k,revolvingDailySummaryRows:()=>({rows:[["Date of Sales","Cash on Hand","Status","Date Update"],...u.map(h=>{const F=At(h.saleDate,e,n,h.cashAmount),_=h.status==="revolving"?"Revolving":h.status==="endorsed"?`Endorsed to ${h.endorsedTo??""}`:"Pending";return[h.saleDate,F,_,h.statusUpdatedAt?K(h.statusUpdatedAt):""]})]}),revolvingHistoryRows:()=>({rows:[["Date","Number","Name","Amount","Category","Description","Type"],...M.map(h=>[K(h.createdAt),h.revolvingNumber,h.name,h.type==="disbursement"?-h.amount:h.amount,h.category,h.description??"",h.type==="add"?"Add Revolving Fund":"Disbursement"])]}),summaryRows:()=>{const h=D(),F=I();return[["Summary",o.from,"to",o.to],[],["Total Cash:","Total GCash:","Total Sales:"],["","",""],[h.totalCash,h.totalGcash,h.totalSales],["","",""],["Total Disbursement:","Total Profit:","Cash on Hand:"],["","",""],[F.totalDisbursement,x,xe(h.totalCash,F.totalDisbursement)]]},profit:x}}function en(e,t){return`<button class="nav-link ${t?"is-active":""}" data-tab="${e}" type="button">
    <span class="nav-icon">${tn(e)}</span>
    <span>${Ke[e]}</span>
  </button>`}function q(e,t){return`<div class="section-head"><div><h2>${m(e)}</h2><p class="meta">${m(t)}</p></div></div>`}function dt(){return Ke[d.tab]??"Dashboard"}function qe(e){return(e?.name??"Laba101").trim().slice(0,1).toUpperCase()}function tn(e){return{dashboard:"DB",pos:"POS",orders:"PO",archived:"AR",customers:"CU",pricing:"PS",disbursements:"DR",reports:"RP",logs:"LG",inventory:"IN",maintenance:"MT",staff:"ST",revolving:"RV",settings:"SE"}[e]}async function Dt(){const e=await ce(),t=await pa(e),a=await bt(),n=await fa(),s=await We(),r=await ga(),i=await St(),o=await fe(e),c=await wa(),l=await Aa(),u=await Oa(),v=await Fa(),y=await Lt(e),f=await Wa(e),$=await $a(e),T=await Ba(e),g=await Ma(),R=await va(),p=await gt("report_email");return{branch:e,staff:t,allStaff:a,customers:n,services:s,allServices:r,categories:i,orders:o,payments:c,foldLogs:l,expenses:u,sales:v,machines:y,subcleanings:f,activityLogs:$,inventoryItems:T,revolvingHistory:g,foldRate:R,reportEmail:p??""}}async function S(){if(!d.currentUser){an(),Nn();return}const e=await Dt();e.orders.filter(c=>c.status!=="claimed").length,e.orders.filter(c=>c.status==="ready").length,e.orders.reduce((c,l)=>c+l.paidAmount,0);const t=H(),a=Rt(e.payments,e.orders,c=>c.branch===e.branch&&K(c.receivedAt)===t),n=a.gcash+e.sales.filter(c=>c.saleDate===t).reduce((c,l)=>c+l.gcashAmount,0),s=a.cash+e.sales.filter(c=>c.saleDate===t).reduce((c,l)=>c+l.cashAmount,0),r=s+n,i=e.expenses.filter(c=>te(c)==="daily"&&c.expenseDate===t).reduce((c,l)=>c+l.amount,0),o=xe(s,i);e.sales.reduce((c,l)=>c+l.totalAmount,0),e.expenses.reduce((c,l)=>c+l.amount,0),Xe.innerHTML=`
    <div class="app-frame">
      <header class="topbar">
        <div class="topbar-left">
          <img src="/laba101-logo.svg" alt="Laba101" class="topbar-logo" />
          <div>
            <p class="eyebrow">Offline mobile system</p>
            <h1>${m(dt())}</h1>
          </div>
        </div>
        <div class="topbar-actions">
          <div class="branch-pill"><span>Branch</span><strong>${m(e.branch)}</strong></div>
          <button class="icon-button" type="button" aria-label="Notifications">!</button>
          <button class="profile-pill" type="button">
            <span>${qe(d.currentUser)}</span>
            <strong>${m(d.currentUser.name)}</strong>
          </button>
        </div>
      </header>

      <button class="sidebar-backdrop ${d.sidebarOpen?"is-open":""}" id="sidebar-backdrop" type="button" aria-label="Close navigation"></button>

      <aside class="sidebar ${d.sidebarOpen?"is-open":""}">
        <div class="sidebar-mobile-head">
          <img src="/laba101-logo.svg" alt="Laba101" />
          <button class="sidebar-close" id="sidebar-close-button" type="button" aria-label="Close navigation">X</button>
        </div>
        <nav>${xt().map(c=>en(c,d.tab===c)).join("")}</nav>
        <div class="sidebar-fill">
          <div class="sidebar-branch-badge">
            <span>Active Branch</span>
            <strong>${m(e.branch)}</strong>
          </div>
          <p class="sidebar-app-name">Laba101 POS</p>
        </div>
        <div class="sidebar-user">
          <span class="avatar">${qe(d.currentUser)}</span>
          <div>
            <strong>${m(d.currentUser.name)}</strong>
            <small>${m(d.currentUser.email)} / ${m(d.currentUser.role)}</small>
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
            <h2>${m(dt())}</h2>
          </div>
          <div class="navbar-time">
            <strong data-navbar-time>--:--</strong>
            <span data-navbar-date>Loading...</span>
          </div>
          <button class="mobile-avatar" type="button">${qe(d.currentUser)}</button>
        </header>

        ${d.tab==="dashboard"?sn({paidToday:r,cashPaidToday:s,gcashPaidToday:n,disbursementToday:i,cashOnHandToday:o,orders:e.orders,payments:e.payments,sales:e.sales}):""}
        ${d.tab==="pos"?rn(e.orders,e.customers,e.services,e.categories,e.payments,e.branch):""}
        ${d.tab==="orders"?on(e.orders,e.staff,e.services,e.payments):""}
        ${d.tab==="archived"?cn(e.orders,e.staff,e.services,e.payments):""}
        ${d.tab==="customers"?pn(e.customers,e.orders):""}
        ${d.tab==="pricing"?yn(e.allServices,e.categories):""}
        ${d.tab==="disbursements"?fn(e.expenses,e.sales):""}
        ${d.tab==="reports"?hn(e.orders,e.payments,e.sales,e.expenses,e.revolvingHistory,e.allStaff,e.foldRate):""}
        ${d.tab==="logs"?gn(e.activityLogs):""}
        ${d.tab==="inventory"?bn(e.inventoryItems,e.branch):""}
        ${d.tab==="maintenance"?En(e.machines,e.subcleanings,e.branch):""}
        ${d.tab==="staff"?Sn(e.allStaff,e.branch):""}
        ${d.tab==="revolving"?Un(e.sales,e.revolvingHistory,e.orders,e.expenses):""}
        ${d.tab==="settings"?Tn(e.branch,e.foldRate,e.reportEmail):""}
      </main>
    </div>
  `,wn(),An(e),Cn(e.allServices),$n(e.expenses),Rn(e.orders,e.payments,e.sales,e.expenses,e.revolvingHistory,e.foldRate),On(),Dn(),xn(),Pn(e.inventoryItems,e.branch),In(e.allStaff),kn(),qn(),Ln()}function xt(){if(d.currentUser?.role==="admin")return Object.keys(Ke);const e=["dashboard","pos","orders","archived","disbursements","reports","maintenance","revolving"];return Ja(d.currentUser)?["dashboard","disbursements","reports","maintenance","revolving"]:za(d.currentUser)?e.filter(t=>t!=="revolving"):e}function an(){Xe.innerHTML=`
    <main class="login-page">

      <section class="login-panel-wrap">
        <article class="login-panel">
          <header>
            <div class="login-mark"><img src="/laba101-logo.svg" alt="Laba101" /></div>
            <h2>Welcome back</h2>
            <p>Sign in to continue managing today&apos;s laundry operations.</p>
          </header>
          ${d.loginError?`<div class="alert">${m(d.loginError)}</div>`:""}
          <form id="login-form" class="form">
            <label>Email address<input name="email" type="email" autocomplete="username" placeholder="admin@laba101.test or staff@laba101.gensan" required /></label>
            <label>Password<input name="password" type="password" autocomplete="current-password" placeholder="password" required /></label>
            <label class="remember"><input name="remember" type="checkbox" value="1" /> Remember me on this device</label>
            <button class="primary" id="login-button" type="submit">Sign in</button>
          </form>
        </article>
      </section>
    </main>
  `}function nn(){document.querySelectorAll("[data-fill-email]").forEach(e=>{e.addEventListener("click",()=>{const t=document.querySelector('input[name="email"]'),a=document.querySelector('input[name="password"]');t&&(t.value=e.dataset.fillEmail??""),a&&(a.value=e.dataset.fillPassword??"")})})}function sn(e){const t=new Date,a=Array.from({length:7},(i,o)=>{const c=new Date(t);return c.setDate(t.getDate()-(6-o)),new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric"}).format(c)}),n=Array.from({length:7},(i,o)=>{const c=new Date(t);c.setDate(t.getDate()-(6-o));const l=ie(c),u=Rt(e.payments,e.orders,y=>K(y.receivedAt)===l).total,v=e.sales.filter(y=>y.saleDate===l).reduce((y,f)=>y+f.totalAmount,0);return u+v}),s=Math.max(1,...n),r=210;return`
    <section class="dashboard-main">
      <article class="panel revenue-panel">
        ${q("Revenue overview","Paid amount for the last 7 days.")}
        <button class="secondary dashboard-print-button" type="button" data-print-daily-summary>Print Daily Summary</button>
        <div class="dashboard-summary-slip">
          <h3>Laba101 Daily Summary</h3>
          <p>${m(ie())}</p>
          <div><span>Paid today:</span><strong>${w(e.paidToday)}</strong></div>
          <div><span>Cash:</span><strong>${w(e.cashPaidToday)}</strong></div>
          <div><span>GCash:</span><strong>${w(e.gcashPaidToday)}</strong></div>
          <div><span>Disbursement:</span><strong>${w(e.disbursementToday)}</strong></div>
          <div><span>Cash-on hand:</span><strong>${w(e.cashOnHandToday)}</strong></div>
          <div class="signature-row"><span>Name of receiver and signature</span></div>
        </div>
        <div class="stats compact dashboard-stats">
          <div class="stat paid-today-stat">
            <span class="card-label">Paid Today</span>
            <div class="value">${w(e.paidToday)}</div>
            <div class="stat-breakdown"><span>Cash ${w(e.cashPaidToday)}</span><span>GCash ${w(e.gcashPaidToday)}</span></div>
          </div>
          <div class="stat"><span class="card-label">Disbursement</span><div class="value">${w(e.disbursementToday)}</div></div>
          <div class="stat"><span class="card-label">Cash on Hand</span><div class="value">${w(e.cashOnHandToday)}</div></div>
        </div>
        <div class="chart-shell">
          <div class="mini-chart revenue-chart">
            ${n.map((i,o)=>{const c=Math.max(12,Math.round(i/s*r));return`<div class="chart-bar ${o===n.length-1?"is-today":""}"><span style="height:${c}px"></span><strong>${w(i)}</strong></div>`}).join("")}
          </div>
          <div class="chart-days">${a.map(i=>`<span>${m(i)}</span>`).join("")}</div>
        </div>
        <div class="chart-footnote">Values include POS payments and Daily Report sales input.</div>
      </article>
    </section>
  `}function rn(e,t,a,n,s,r){const i=a.filter(l=>l.serviceType==="order"&&l.isActive),o=a.filter(l=>l.serviceType==="addon"&&l.isActive),c=d.receiptOrderId?e.find(l=>l.id===d.receiptOrderId):null;return`
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
            ${i.map(l=>`<div class="qty-card service-option service-quantity" data-qty-card="serviceQty-${l.id}">
              <span>
                <strong>${m(l.name)}</strong>
                <small>${m(l.description??l.category)} ${l.maxKg?` / max ${l.maxKg}kg`:""}</small>
              </span>
              <b>${w(l.price)}</b>
              <div class="qty-control">
                <button type="button" data-qty-minus="serviceQty-${l.id}" aria-label="Decrease ${m(l.name)}">-</button>
                <input type="number" name="serviceQty-${l.id}" min="0" step="1" value="0" inputmode="numeric" />
                <button type="button" data-qty-plus="serviceQty-${l.id}" aria-label="Increase ${m(l.name)}">+</button>
              </div>
            </div>`).join("")}
          </fieldset>

          <fieldset class="check-grid">
            <legend>Extra services</legend>
            ${o.length?o.map(l=>`<div class="qty-card addon-quantity" data-qty-card="addonQty-${l.id}">
              <span><strong>${m(ee(l.name))}</strong><small>${w(l.price)} each</small></span>
              <div class="qty-control">
                <button type="button" data-qty-minus="addonQty-${l.id}" aria-label="Decrease ${m(ee(l.name))}">-</button>
                <input type="number" name="addonQty-${l.id}" min="0" step="1" value="0" inputmode="numeric" />
                <button type="button" data-qty-plus="addonQty-${l.id}" aria-label="Increase ${m(ee(l.name))}">+</button>
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

      ${c?Ge(c,s.filter(l=>l.orderId===c.id)):""}
    </section>
  `}function on(e,t,a,n){const s=d.receiptOrderId?e.find(y=>y.id===d.receiptOrderId):null,r=d.orderSearch.trim().toLowerCase(),i=d.orderDateFilter.trim(),o=d.orderPaymentFilter.trim().toLowerCase(),c=e.filter(y=>{const f=!r||[y.ticket,y.customer,y.phone,y.service,y.itemCategory,y.status].some(g=>String(g??"").toLowerCase().includes(r)),$=!i||K(y.createdAt)===i,T=!o||Re(y)===o;return f&&$&&T}),u=c.filter(y=>["unpaid","partial"].includes(Re(y))).reduce((y,f)=>y+Math.max(0,Number(f.balance||0)),0),v=c.length;return`
    <section class="grid content full">
      <article class="panel span-2">
        ${q("Order queue","Workflow, payment, and receipts")}
        <form class="queue-filters" id="order-queue-filters">
          <label>
            <span>Search queue</span>
            <input name="orderSearch" type="search" placeholder="Ticket, name, service, status" value="${m(d.orderSearch)}" autocomplete="off" />
          </label>
          <label>
            <span>Filter date</span>
            <input name="orderDateFilter" type="date" value="${m(d.orderDateFilter)}" />
          </label>
          <label>
            <span>Payment</span>
            <select name="orderPaymentFilter">
              <option value="" ${d.orderPaymentFilter===""?"selected":""}>All</option>
              <option value="unpaid" ${d.orderPaymentFilter==="unpaid"?"selected":""}>Unpaid</option>
              <option value="partial" ${d.orderPaymentFilter==="partial"?"selected":""}>Partial</option>
              <option value="paid" ${d.orderPaymentFilter==="paid"?"selected":""}>Paid</option>
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
              ${c.map(y=>Pt(y,t,a)).join("")||'<tr><td colspan="5" class="table-empty">No matching orders.</td></tr>'}
            </tbody>
          </table>
        </div>
        <div class="summary-list queue-summary">
          <div><span>Total transactions</span><strong>${v}</strong></div>
          <div><span>Total unpaid amount</span><strong>${w(u)}</strong></div>
        </div>
      </article>
      ${s?Ge(s,n.filter(y=>y.orderId===s.id)):""}
      ${d.paymentModalOrderId?ln(e.find(y=>y.id===d.paymentModalOrderId)):""}
    </section>
  `}function cn(e,t,a,n){const s=e.filter(c=>c.status==="claimed"),r=d.archivedOrderSearch.trim().toLowerCase(),i=s.filter(c=>r?[c.ticket,c.customer,c.phone,c.service,c.itemCategory].some(l=>String(l??"").toLowerCase().includes(r)):!0),o=d.receiptOrderId?e.find(c=>c.id===d.receiptOrderId):null;return`
    <section class="grid content full">
      <article class="panel span-2">
        ${q("Archived orders","All claimed orders are listed here")}
        <form class="queue-filters" id="archived-order-filters">
          <label>
            <span>Search archived</span>
            <input name="archivedOrderSearch" type="search" placeholder="Ticket, name, service" value="${m(d.archivedOrderSearch)}" autocomplete="off" />
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
              ${i.map(c=>Pt(c,t,a)).join("")||'<tr><td colspan="5" class="table-empty">No archived orders found.</td></tr>'}
            </tbody>
          </table>
        </div>
      </article>
      ${o?Ge(o,n.filter(c=>c.orderId===o.id)):""}
    </section>
  `}function Pt(e,t,a){const n=Tt(e,a),s=e.workflowCompleted.includes("claimed"),r=n.find(f=>!e.workflowCompleted.includes(f.key)),i=r?.key==="fold",o=Re(e),c=e.extras.length?e.extras.map(f=>`${m(ee(f.name))} x${Number(f.quantity??1)}`).join(", "):"",l=d.currentUser?.role==="admin",u=e.status!=="claimed"&&e.paidAmount<=0,v=e.status!=="claimed"&&l&&e.paidAmount>0;let y=1;if(e.serviceLines){let f=0;e.serviceLines.forEach($=>{const T=a.find(g=>g.id===$.id);T&&Array.isArray(T.includes)&&T.includes.includes("Fold")&&(f+=$.quantity)}),f>0&&(y=f)}return`
    <tr class="order-row-main">
      <td><strong>${m(e.ticket)}</strong><div class="small">${m(ae(e.createdAt))}</div></td>
      <td>${m(e.customer)}<div class="small">${m(e.phone??"")}</div></td>
      <td>${m(e.service)}${c?`<div class="small">Extras: ${c}</div>`:""}</td>
      <td class="amount-cell"><strong>${w(e.totalAmount)}</strong><div class="payment-status status-${o}">${m(o)}${o==="paid"?"":` &middot; Bal: ${w(e.balance)}`}</div></td>
      <td>
      <div class="row-actions">
        ${r?.key==="fold"?`<form class="inline-form advance-form flex-wrap" data-order-id="${e.id}">
          ${i?Array.from({length:y}).map((f,$)=>`<select name="assignedStaffId" required>
            <option value="">-- Staff ${y>1?`(Fold ${$+1})`:""}--</option>
            ${t.map(T=>`<option value="${T.id}">${m(T.name)}</option>`).join("")}
          </select>`).join(""):""}
          <button class="secondary" type="submit">Fold</button>
        </form>`:r?.key==="claimed"&&!s?`<form class="inline-form advance-form" data-order-id="${e.id}" data-action="claim" data-balance="${e.balance}">
          <select name="releasedBy" required>
            <option value="">-- Released by --</option>
            ${t.map(f=>`<option value="${f.id}">${m(f.name)}</option>`).join("")}
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
        ${u?`<button class="secondary btn-sm" type="button" data-cancel-order="${e.id}">Cancel</button>`:""}
        ${v?`<button class="secondary btn-sm" type="button" data-delete-order="${e.id}">Delete</button>`:""}
        <button class="secondary btn-sm" data-receipt="${e.id}">Receipt</button>
      </div>
      </td>
    </tr>
  `}function ln(e){return e?`
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="payment-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-close-payment-modal>Close</button>
        </div>
        <div class="receipt" style="border: 1px solid var(--line); border-style: solid; box-shadow: none;">
          <h3 id="payment-title" style="margin-top:0">Payment Required</h3>
          <p>Please settle the remaining balance of <strong>${w(e.balance)}</strong> for ticket <strong>${m(e.ticket)}</strong> before claiming.</p>
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
  `:""}function Ge(e,t){const a=t.reduce((i,o)=>i+Number(o.amount),0),n=Math.max(0,Number((a-e.totalAmount).toFixed(2))),s=Re(e),r=s.charAt(0).toUpperCase()+s.slice(1);return`
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="receipt-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-open-printer-panel>Printer</button>
          <button class="primary" type="button" data-thermal-print>${d.printerLoading?"Printing...":"Print Receipt"}</button>
          <button class="secondary" type="button" data-close-receipt>Close</button>
        </div>
        ${d.printerPanelOpen?dn():""}
        <div class="receipt" id="receipt-print-area">
          <div class="receipt-head">
            <h3 id="receipt-title">Laba101</h3>
            <p>${m(e.ticket)}<br>${m(ae(e.createdAt))}</p>
          </div>
          ${d.currentUser?`<p class="receipt-staff">Staff: ${m(d.currentUser.name)}</p>`:""}
          <div class="receipt-customer">
            <strong>${m(e.customer)}</strong>
            <span>${m(e.phone??"No phone")}</span>
          </div>
          <div class="summary-list receipt-lines">
            <div><span>Service</span><strong>${m(e.service)}</strong></div>
            ${e.extras.length?`<div><span>Extra services</span><strong>${e.extras.map(i=>`${m(ee(i.name))} x${Number(i.quantity??1)} (${w(Number(i.total??i.price))})`).join(", ")}</strong></div>`:""}
            <div><span>Total</span><strong>${w(e.totalAmount)}</strong></div>
            <div><span>Tendered</span><strong>${w(a)}</strong></div>
            <div><span>Paid</span><strong>${w(e.paidAmount)}</strong></div>
            <div><span>Payment status</span><strong>${r}</strong></div>
            <div><span>Change</span><strong>${w(n)}</strong></div>
            <div><span>Balance</span><strong>${w(e.balance)}</strong></div>
          </div>
          <h3>Payments</h3>
          <div class="receipt-payments">
            ${t.map(i=>`<div><span>${m(i.method.toUpperCase())}</span><strong>${w(i.amount)}</strong>${i.reference?`<small>Ref ${m(i.reference)}</small>`:""}</div>`).join("")||'<p class="helper">No payments yet.</p>'}
          </div>
        </div>
      </div>
    </div>
  `}function dn(){return`
    <div class="printer-panel">
      <div class="printer-panel-head">
        <strong>Bluetooth thermal printer</strong>
        <button class="secondary" type="button" data-refresh-printers>${d.printerLoading?"Scanning...":"Scan paired"}</button>
      </div>
      <div class="printer-fields">
        <label>Printer
          <select data-printer-select>
            <option value="">Select paired printer</option>
            ${d.pairedPrinters.map(e=>`<option value="${m(e.address)}" ${d.selectedPrinterAddress===e.address?"selected":""}>${m(e.name)} - ${m(e.address)}</option>`).join("")}
          </select>
        </label>
        <label>Paper
          <select data-paper-width>
            <option value="58" ${d.printerPaperWidth===58?"selected":""}>58mm</option>
            <option value="80" ${d.printerPaperWidth===80?"selected":""}>80mm</option>
          </select>
        </label>
      </div>
      <div class="printer-actions">
        <button class="secondary" type="button" data-connect-printer>${d.printerLoading?"Connecting...":"Connect & Save"}</button>
      </div>
      ${d.printerStatus?`<p class="printer-status ok">${m(d.printerStatus)}</p>`:""}
      ${d.printerError?`<p class="printer-status warn">${m(d.printerError)}</p>`:""}
    </div>
  `}async function ut(){d.printerLoading=!0,d.printerError="",d.printerStatus="",await S();try{if(!(await ye.requestBluetoothPermissions()).granted)throw new Error("Bluetooth permission was not granted.");const t=await ye.listPairedPrinters();d.pairedPrinters=t.printers??[],d.selectedPrinterAddress=d.selectedPrinterAddress||t.savedAddress||d.pairedPrinters[0]?.address||"",d.printerStatus=d.pairedPrinters.length?"Select a printer, then connect.":"No paired printers found. Pair the printer in Android Bluetooth settings first."}catch(e){d.printerError=e instanceof Error?e.message:"Could not scan paired printers."}finally{d.printerLoading=!1,await S()}}async function un(){if(!d.selectedPrinterAddress){d.printerError="Select a paired printer first.",await S();return}d.printerLoading=!0,d.printerError="",d.printerStatus="",await S();try{await ye.savePrinter({address:d.selectedPrinterAddress}),await ye.connect({address:d.selectedPrinterAddress}),d.printerStatus="Printer connected and saved."}catch(e){d.printerError=e instanceof Error?e.message:"Printer connection failed."}finally{d.printerLoading=!1,await S()}}function mn(e){const t=(e.serviceLines?.length?e.serviceLines:[{id:e.serviceId,name:e.service,price:e.price,quantity:1,total:e.price}]).map(n=>({name:n.name,quantity:Number(n.quantity||1),price:Number(n.price||0)})),a=e.extras.map(n=>({name:ee(n.name),quantity:Number(n.quantity??1),price:Number(n.price||0)}));return[...t,...a]}async function vn(e,t){const a=t.reduce((s,r)=>s+Number(r.amount),0),n=Math.max(0,Number((a-e.totalAmount).toFixed(2)));d.printerLoading=!0,d.printerError="",d.printerStatus="",await S();try{if(!d.selectedPrinterAddress){const s=await ye.getSavedPrinter();d.selectedPrinterAddress=s.address||""}await ye.printReceipt({address:d.selectedPrinterAddress||void 0,paperWidth:d.printerPaperWidth,storeName:"Laba101",receiptNumber:e.ticket,dateTime:ae(e.createdAt),customerName:e.customer,customerPhone:e.phone?.trim()||"No phone",items:mn(e),totalAmount:e.totalAmount,paidAmount:e.paidAmount,changeAmount:n,balanceAmount:e.balance,staffName:d.currentUser?.name?.trim()||"Staff"}),d.printerStatus="Receipt sent to printer."}catch(s){d.printerPanelOpen=!0,d.printerError=s instanceof Error?s.message:"Bluetooth thermal print failed."}finally{d.printerLoading=!1,await S()}}function pn(e,t){const a=d.customerSearch.trim().toLowerCase(),n=e.filter(s=>a?s.name.toLowerCase().includes(a):!1);return`
    <section class="grid content full">
      <article class="panel">
        ${q("Customer Management","Customer records from local offline storage")}
        <form class="search-box" id="customer-search-form">
          <label>
            <span>Search customer name</span>
            <input name="customerSearch" data-customer-search type="search" placeholder="Type the customer name then tap Search" value="${m(d.customerSearch)}" autocomplete="off" />
          </label>
          <div class="search-actions">
            <button class="primary" type="submit">Search</button>
            <button class="secondary" type="button" id="customer-search-clear">Clear</button>
          </div>
        </form>
        <div class="summary-list">
          <div><span>Total customers</span><strong>${e.length}</strong></div>
          <div><span>Matching customers</span><strong>${a?n.length:0}</strong></div>
        </div>
      </article>
      <article class="panel">
        ${q("Customer list","Names, phones, addresses, and order history")}
        <div class="customer-stack">
          ${a?n.map(s=>{const r=t.filter(i=>i.customerId===s.id);return`
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
                        <strong>${w(i.totalAmount)}</strong>
                        <span>${m(i.status)}</span>
                      </div>
                    </div>`).join(""):'<p class="helper">No order records yet.</p>'}
                </div>
              </article>`}).join(""):'<div class="helper">Search a customer name to display matching records and their order history.</div>'}
        </div>
      </article>
    </section>
  `}function yn(e,t){const a=e.filter(s=>s.serviceType==="order"),n=e.filter(s=>s.serviceType==="addon");return`
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
            ${Ga.map(s=>`<label class="check"><input type="checkbox" name="includes" value="${s}" /> ${s}</label>`).join("")}
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
            ${a.map(s=>`<div class="table-row"><div><strong>${m(s.name)}</strong></div><div>${m(s.category)}</div><div>${w(s.price)}</div><div>${s.maxKg} kg</div><div>${m(s.includes.join(", ")||"none")}</div><div>${s.isActive?"Active":"Inactive"}</div><div class="row-actions"><button class="secondary edit-service-btn" data-id="${s.id}">Edit</button>${s.isActive?`<button class="secondary deactivate-service-btn" data-id="${s.id}">Deactivate</button>`:`<button class="secondary activate-service-btn" data-id="${s.id}">Activate</button>`}</div></div>`).join("")||'<div class="helper">No order services yet.</div>'}
          </div>
        </div>
        <div class="section-divider"></div>
        ${q("Extra Services Table","Add-on services")}
        <div class="table-scroll">
          <div class="table data-table extra-services-table">
            <div class="table-head"><div>Name</div><div>Category</div><div>Price</div><div>Includes</div><div>Status</div><div>Actions</div></div>
            ${n.map(s=>`<div class="table-row"><div><strong>${m(s.name)}</strong></div><div>${m(s.category)}</div><div>${w(s.price)}</div><div>${m(s.includes.join(", ")||"none")}</div><div>${s.isActive?"Active":"Inactive"}</div><div class="row-actions"><button class="secondary edit-service-btn" data-id="${s.id}">Edit</button>${s.isActive?`<button class="secondary deactivate-service-btn" data-id="${s.id}">Deactivate</button>`:`<button class="secondary activate-service-btn" data-id="${s.id}">Activate</button>`}</div></div>`).join("")||'<div class="helper">No extra services yet.</div>'}
          </div>
        </div>
      </article>
    </section>
  `}function fn(e,t){const a=H(),n=a.slice(0,7),s=d.currentUser?.role==="admin",r=Array.from(new Set([...Va,...e.map(u=>u.category).filter(Boolean)])),i=e.filter(u=>te(u)==="daily"&&u.expenseDate===a).reduce((u,v)=>u+v.amount,0),o=e.filter(u=>te(u)==="monthly"&&u.expenseDate.startsWith(n)).reduce((u,v)=>u+v.amount,0),c=t.filter(u=>u.saleDate===a).reduce((u,v)=>u+v.totalAmount,0),l=t.filter(u=>u.saleDate.startsWith(n)).reduce((u,v)=>u+v.totalAmount,0);return`
    <section class="page-head">
      <div>
        <h2>Daily Report</h2>
      </div>
      <div class="segmented">
        <button class="${d.dailyReportTab==="expenses"?"is-active":""}" data-report-tab="expenses" type="button">Disbursements</button>
        <button class="${d.dailyReportTab==="sales"?"is-active":""}" data-report-tab="sales" type="button">Daily Sales</button>
      </div>
    </section>
    <section class="grid stats compact report-stats">
      <div class="panel stat"><div class="card-label">Daily disbursement</div><div class="value">${w(i)}</div></div>
      <div class="panel stat"><div class="card-label">Monthly disbursement</div><div class="value">${w(o)}</div></div>
      <div class="panel stat"><div class="card-label">Today sales input</div><div class="value">${w(c)}</div></div>
      <div class="panel stat"><div class="card-label">Month sales input</div><div class="value">${w(l)}</div></div>
    </section>
    ${d.dailyReportTab==="expenses"?`
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
            <label class="expense-date-field">Date<input name="expenseDate" type="date" value="${H()}" required /></label>
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
            ${e.map(u=>`<div class="table-row"><div>${m($t(u))}<div class="small">${m(te(u))}</div></div><div>${m(u.number)}</div><div>${m(u.name)}</div><div>${m(u.category)}</div><div>${w(u.amount)}</div><div class="row-actions"><button class="secondary edit-expense-btn" data-id="${u.id}" type="button">Edit</button>${s?`<button class="secondary delete-expense-btn" data-id="${u.id}" type="button">Delete</button>`:""}</div></div>`).join("")||'<div class="helper">No expenses yet.</div>'}
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
          <label>Date<input name="saleDate" type="date" value="${H()}" required /></label>
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
            ${t.map(u=>`<div class="table-row"><div>${m(u.saleNumber)}</div><div>${m(u.saleDate)}</div><div>${w(u.cashAmount)}</div><div>${w(u.gcashAmount)}</div><div><strong>${w(u.totalAmount)}</strong></div><div class="row-actions"><button class="secondary edit-sale-btn" data-id="${u.id}" type="button">Edit</button>${s?`<button class="secondary delete-sale-btn" data-id="${u.id}" type="button">Delete</button>`:""}</div></div>`).join("")||'<div class="helper">No daily sales totals yet.</div>'}
          </div>
        </div>
      </article>
    </section>
    `}
  `}function hn(e,t,a,n,s,r,i,o,c,l){const u=d.reportPreview?Ot(e,t,a,n,s,r,i,d.reportPreview):null;return`
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
            <label>From<input name="dateFrom" data-date-from type="date" value="${H()}" /></label>
            <label>To<input name="dateTo" data-date-to type="date" value="${H()}" /></label>
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
              ${u.salesRows().transactions.map(v=>`<div class="table-row report-table-row"><div>${m(v.ticket)}</div><div>${m(v.customer)}</div><div>${w(v.cash)}</div><div>${w(v.gcash)}</div><div>${w(v.total)}</div></div>`).join("")}
            </div>
            <div class="sales-summary-section">
              <h3>Sales Summary</h3>
              <div class="table sales-summary-table">
                <div class="table-head"><div>Sales Type</div><div>Cash</div><div>GCash</div><div>Sales</div></div>
                <div class="table-row"><div>Orders</div><div>${w(u.salesRows().orderCashTotal)}</div><div>${w(u.salesRows().orderGcashTotal)}</div><div>${w(u.salesRows().orderCashTotal+u.salesRows().orderGcashTotal)}</div></div>
                <div class="table-row"><div>Whole Sale Day</div><div>${w(u.salesRows().manualCashTotal)}</div><div>${w(u.salesRows().manualGcashTotal)}</div><div>${w(u.salesRows().manualCashTotal+u.salesRows().manualGcashTotal)}</div></div>
                <div class="table-row total-row"><div>Total</div><div>${w(u.salesRows().totalCash)}</div><div>${w(u.salesRows().totalGcash)}</div><div>${w(u.salesRows().totalSales)}</div></div>
              </div>
            </div>
          </article>`:""}
        ${u.selectedTypes.has("disbursement")?`
          <article>
            ${q("Disbursement preview",`${u.selection.from} to ${u.selection.to}`)}
            <div class="table wide-table report-preview-table report-disbursement-table">
              <div class="table-head report-table-head"><div>ID#</div><div>Date/Month</div><div>Type</div><div>Name</div><div>Category</div><div>Amount</div></div>
              ${u.disbursementRows().rows.slice(1).filter(v=>v.length&&v[0]!=="Total Disbursement").map(v=>`<div class="table-row report-table-row"><div>${m(v[1]??"")}</div><div>${m(v[0]??"")}</div><div>${m(v[2]??"")}</div><div>${m(v[3]??"")}</div><div>${m(v[4]??"")}</div><div>${w(v[6])}</div></div>`).join("")}
            </div>
            <div class="disbursement-total">
              <strong>Total Disbursement: ${w(u.disbursementRows().totalDisbursement)}</strong>
            </div>
          </article>`:""}
        ${u.selectedTypes.has("fold_count")?`
          <article>
            ${q("Fold Count preview",`${u.selection.from} to ${u.selection.to}`)}
            <div class="table report-preview-table">
              <div class="table-head"><div>Staff</div><div>Fold Count</div></div>
              ${u.foldCountRows().rows.slice(1).map(v=>`<div class="table-row">${v.map(y=>`<div>${m(y??"")}</div>`).join("")}</div>`).join("")}
            </div>
          </article>`:""}
        ${u.selectedTypes.has("revolving_fund")?`
          <article>
            ${q("Revolving Fund — Daily Summary",`${u.selection.from} to ${u.selection.to}`)}
            ${Oe(["Date of Sales","Cash on Hand","Status","Date Update"],u.revolvingDailySummaryRows().rows.slice(1).map(v=>[m(String(v[0]??"")),m(String(v[1]??"")),m(String(v[2]??"")),m(String(v[3]??""))]),"data-table revolving-report-table")}
          </article>
          <article>
            ${q("Revolving Fund — Table History",`${u.selection.from} to ${u.selection.to}`)}
            ${Oe(["Date","Number","Name","Amount","Category","Description","Type"],u.revolvingHistoryRows().rows.slice(1).map(v=>[m(String(v[0]??"")),m(String(v[1]??"")),m(String(v[2]??"")),m(String(v[3]??"")),m(String(v[4]??"")),m(String(v[5]??"")),m(String(v[6]??""))]),"data-table revolving-report-table")}
          </article>`:""}
        ${u.selectedTypes.has("summary")?`
          <article>
            ${q("Summary preview",`${u.selection.from} to ${u.selection.to}`)}
            <div class="summary-cards-grid summary-single-row">
              <div class="summary-card"><span class="card-label">Total Sales</span><div class="card-details"><span>Total Cash: ${w(u.salesRows().totalCash)}</span><span>Total GCash: ${w(u.salesRows().totalGcash)}</span></div><strong>${w(u.salesRows().totalSales)}</strong></div>
              <div class="summary-card"><span class="card-label">Total Disbursement</span><strong>${w(u.disbursementRows().totalDisbursement)}</strong></div>
              <div class="summary-card"><span class="card-label">Cash on Hand</span><strong>${w(xe(u.salesRows().totalCash,u.disbursementRows().totalDisbursement))}</strong></div>
            </div>
          </article>`:""}
      </section>
    `:""}
  `}function gn(e){return`
    <section class="grid content full">
      <article class="panel span-2">
        ${q("Activity Logs","Recorded staff actions and timestamps")}
        <div class="table-scroll">
          <div class="table wide-table">
            <div class="table-head"><div>Timestamp</div><div>Staff</div><div>Action</div><div>Details</div></div>
            ${e.map(t=>`<div class="table-row"><div>${ae(t.timestamp)}</div><div>${m(t.staffName)}</div><div><strong>${m(t.action)}</strong></div><div>${m(t.details)}</div></div>`).join("")||'<div class="helper">No logs yet.</div>'}
          </div>
        </div>
      </article>
    </section>
  `}function bn(e,t){return`
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
          <input name="branch" type="hidden" value="${m(t)}" />
          <button class="primary" type="submit">Save item</button>
        </form>
      </article>
      <article class="panel span-2">
        ${q("Stock List","Editable branch inventory")}
        <div class="table-scroll">
          <div class="table wide-table">
            <div class="table-head"><div>Item</div><div>Qty</div><div>Unit</div><div>Reorder</div><div>Status</div><div>Updated</div><div>Action</div></div>
            ${e.map(a=>`<div class="table-row"><div><strong>${m(a.name)}</strong><div class="small">${m(a.notes??"")}</div></div><div>${a.quantity}</div><div>${m(a.unit)}</div><div>${a.reorderLevel}</div><div class="${a.quantity<=a.reorderLevel?"warn":"ok"}">${a.quantity<=a.reorderLevel?"Low stock":"OK"}</div><div>${ae(a.updatedAt)}</div><div><button class="secondary edit-inventory-btn" type="button" data-id="${a.id}">Edit</button></div></div>`).join("")||'<div class="helper">No inventory items yet.</div>'}
          </div>
        </div>
      </article>
    </section>
  `}function En(e,t,a){const n=e.filter(o=>o.status!=="under_cleaning"),s=e.filter(o=>o.status==="under_cleaning"),r=Array.from({length:14},(o,c)=>{const l=new Date;l.setDate(l.getDate()-c);const u=ie(l),v=t.filter(y=>y.date===u);return{key:u,records:v}}),i=t.some(o=>o.date===H()&&o.cleaningType==="general");return`
    <section class="page-head">
      <div>
        <h2>Maintenance & Cleaning</h2>
        <p class="meta">Manage machine tube cleaning, general cleaning, and maintenance records.</p>
      </div>
      <div class="segmented">
        <button class="${d.maintenanceTab==="cleaning"?"is-active":""}" data-maintenance-tab="cleaning" type="button">Tube Cleaning</button>
        <button class="${d.maintenanceTab==="machines"?"is-active":""}" data-maintenance-tab="machines" type="button">Machine Management</button>
      </div>
    </section>
    ${d.maintenanceTab==="cleaning"?`
    <section class="grid content full">
      <article class="panel">
        ${q("Available Machines","Select machines to start cleaning.")}
        <form id="subcleaning-form" class="form">
          <input type="hidden" name="date" value="${H()}" />
          <fieldset class="machine-list">
            ${n.map(o=>`<label class="machine-card"><input type="checkbox" name="machineIds" value="${o.id}" /><span><strong>${m(o.machineName)}</strong><small>${m(o.machineType)}</small></span><em></em></label>`).join("")||'<p class="helper">All machines are currently being cleaned.</p>'}
          </fieldset>
          <input type="hidden" name="cleaningStatus" value="in_progress" />
          <input type="hidden" name="cleaningType" value="tube" />
          <label>Notes <textarea name="notes" placeholder="e.g. Deep clean filters"></textarea></label>
          <input type="hidden" name="branch" value="${m(a)}" />
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
              <button class="secondary complete-cleaning-btn" type="button" data-machine-id="${o.id}" data-branch="${m(a)}">Mark Complete</button>
            </div>`).join(""):'<p class="helper">No machines under cleaning right now.</p>'}
        </div>
      </article>
      <article class="panel span-2">
        ${q("Tube Cleaning Checklist","Track which machines have been cleaned today.")}
        <div class="table">
          <div class="table-head"><div>Machine</div><div>Type</div><div>Status</div><div>Notes</div><div>Date</div></div>
          ${e.map(o=>{const c=t.find(l=>l.machineIds.includes(o.id)&&l.date===H());return`<div class="table-row"><div><strong>${m(o.machineName)}</strong></div><div>${m(o.machineType)}</div><div>${c?m(c.cleaningStatus.replace("_"," ")):"Not Cleaned"}</div><div>${m(c?.notes??"-")}</div><div>${H()}</div></div>`}).join("")}
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
          <input type="hidden" name="branch" value="${m(a)}" />
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
  `}function Sn(e,t){return`
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
            ${e.length?e.map(a=>`<div class="table-row"><div><strong>${m(a.name)}</strong></div><div>${m(a.email)}</div><div>${m(a.role)}</div><div>${m(a.branch)}</div><div>${a.isActive!==0?"Active":"Inactive"}</div>
            <div class="row-actions">
              <button class="secondary edit-staff-btn" data-id="${a.id}">Edit</button>
              ${a.isActive!==0?`<button class="secondary deactivate-staff-btn" data-id="${a.id}">Deactivate</button>`:`<button class="secondary activate-staff-btn" data-id="${a.id}">Activate</button>`}
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
                ${["Main Store","Mintal Branch","Gensan Branch"].map(a=>`<option value="${a}" ${a===t?"selected":""}>${a}</option>`).join("")}
              </select>
            </label>
          </div>
          <button class="primary" id="staff-save-btn" type="submit">Save staff member</button>
        </form>
      </div>
    </div>
  `}function Tn(e,t,a){return`
    <section class="grid content full">
      <article class="panel">
        ${q("Settings","Device-local configuration")}
        <form id="settings-form" class="form">
          <label>Current branch<select name="branch">
            ${["Main Store","Mintal Branch","Gensan Branch"].map(n=>`<option value="${n}" ${n===e?"selected":""}>${n}</option>`).join("")}
          </select></label>
          <label>Report email<input name="reportEmail" type="email" placeholder="admin@laba101.test" value="${m(a)}" /></label>
          <button class="primary" type="submit">Save settings</button>
        </form>
      </article>
    </section>
  `}function wn(){const e=()=>{localStorage.removeItem(be),d.currentUser=null,d.tab="dashboard",d.receiptOrderId=0,d.sidebarOpen=!1,S()};document.querySelector("#logout-button")?.addEventListener("click",e),document.querySelector("#mobile-logout-button")?.addEventListener("click",e),document.querySelector("#mobile-menu-button")?.addEventListener("click",()=>{d.sidebarOpen=!0,S()}),document.querySelector("#sidebar-close-button")?.addEventListener("click",()=>{d.sidebarOpen=!1,S()}),document.querySelector("#sidebar-backdrop")?.addEventListener("click",()=>{d.sidebarOpen=!1,S()}),document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{d.tab=t.dataset.tab,d.receiptOrderId=0,d.sidebarOpen=!1,S()})}),document.querySelectorAll("[data-quick-tab]").forEach(t=>{t.addEventListener("click",()=>{d.tab=t.dataset.quickTab,S()})}),document.querySelectorAll("[data-receipt]").forEach(t=>{t.addEventListener("click",()=>{d.receiptOrderId=Number(t.dataset.receipt),d.printerPanelOpen=!1,d.printerError="",d.printerStatus="",S()})}),document.querySelector("[data-close-receipt]")?.addEventListener("click",()=>{d.receiptOrderId=0,S()}),document.querySelector("[data-open-printer-panel]")?.addEventListener("click",()=>{d.printerPanelOpen=!d.printerPanelOpen,d.printerPanelOpen&&d.pairedPrinters.length===0?ut():S()}),document.querySelector("[data-refresh-printers]")?.addEventListener("click",()=>{ut()}),document.querySelector("[data-printer-select]")?.addEventListener("change",t=>{d.selectedPrinterAddress=t.currentTarget.value,S()}),document.querySelector("[data-paper-width]")?.addEventListener("change",t=>{d.printerPaperWidth=Number(t.currentTarget.value)===80?80:58,S()}),document.querySelector("[data-connect-printer]")?.addEventListener("click",()=>{un()}),document.querySelector("[data-thermal-print]")?.addEventListener("click",()=>{(async()=>{const t=await Dt(),a=t.orders.find(s=>s.id===d.receiptOrderId);if(!a)throw new Error("Receipt order not found.");const n=t.payments.filter(s=>s.orderId===a.id);await vn(a,n)})().catch(t=>{d.printerPanelOpen=!0,d.printerError=t instanceof Error?t.message:"Bluetooth thermal print failed.",S()})}),document.querySelector("[data-print-daily-summary]")?.addEventListener("click",()=>{window.print()}),document.querySelectorAll("[data-report-tab]").forEach(t=>{t.addEventListener("click",()=>{d.dailyReportTab=t.dataset.reportTab,S()})}),document.querySelectorAll("[data-maintenance-tab]").forEach(t=>{t.addEventListener("click",()=>{d.maintenanceTab=t.dataset.maintenanceTab,S()})})}function Nn(){nn(),document.querySelector("#login-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget),a=document.querySelector("#login-button");a&&(a.disabled=!0,a.textContent="Signing in...");try{const n=await Et(String(t.get("email")??""),String(t.get("password")??""));if(!n){d.loginError="Invalid email or password.",await S();return}d.currentUser=n,d.loginError="",await we("branch",String(n.branch||"Main Store")),t.get("remember")?localStorage.setItem(be,JSON.stringify({email:n.email,remembered:!0})):localStorage.removeItem(be),xt().includes(d.tab)||(d.tab="dashboard"),await S()}catch(n){alert("Login Error: "+String(n?.message||n)),a&&(a.disabled=!1,a.textContent="Sign in")}})}function Ln(){Se&&window.clearInterval(Se);const e=document.querySelector("[data-navbar-time]"),t=document.querySelector("[data-navbar-date]");if(!e||!t){Se=void 0;return}const a=()=>{const n=Za();e.textContent=n.time,t.textContent=n.date};a(),Se=window.setInterval(a,1e3)}function mt(e,t){return e?t.find(a=>a.name.toLowerCase()===e.category.toLowerCase())??t.find(a=>a.name==="Regular Clothes")??t[0]??null:null}function Fe(e,t){return Math.max(1,Number(t.maxKg||e.maxKg||1))}function It(e,t){return Object.fromEntries(t.filter(a=>a.serviceType==="order").map(a=>[a.id,Number(e.querySelector(`input[name="serviceQty-${a.id}"]`)?.value??0)]).filter(([,a])=>Number(a)>0))}function vt(e,t){const a=It(e,t);return t.filter(n=>n.serviceType==="order"&&Number(a[n.id]??0)>0).map(n=>({...n,quantity:Number(a[n.id])}))}function qt(e,t){return Object.fromEntries(t.filter(a=>a.serviceType==="addon").map(a=>[a.id,Number(e.querySelector(`input[name="addonQty-${a.id}"]`)?.value??0)]).filter(([,a])=>Number(a)>0))}function pt(e,t){const a=qt(e,t);return t.filter(n=>n.serviceType==="addon"&&Number(a[n.id]??0)>0).map(n=>({...n,quantity:Number(a[n.id])}))}function An(e){const t=document.querySelector("#order-form"),a=document.querySelector("#price-preview"),n=t?.querySelector('button[type="submit"]'),s=document.querySelector("#customer-name-input"),r=document.querySelector("#customer-id-input"),i=document.querySelector("#customer-phone-input"),o=document.querySelector("#customer-suggestions"),c=t?.querySelector("[data-order-error]"),l=t?.querySelector('select[name="paymentMethod"]'),u=t?.querySelector(".gcash-reference"),v=t?.querySelector('input[name="paymentReference"]');let y=!1,f;const $=p=>{if(!o||!s)return;const E=p.trim().toLowerCase();if(!E){o.hidden=!0;return}const b=e.customers.filter(x=>x.name.toLowerCase().includes(E)||(x.phone??"").includes(E)).slice(0,8),P=`<div class="ac-item ac-add" data-ac-new="true"><strong>+ Add new: "${m(p.trim())}"</strong></div>`,L=b.map(x=>`<div class="ac-item" data-ac-id="${x.id}" data-ac-name="${m(x.name)}" data-ac-phone="${m(x.phone??"")}"><strong>${m(x.name)}</strong>${x.phone?`<span>${m(x.phone)}</span>`:""}</div>`).join("");o.innerHTML=L+P,o.hidden=!1};s?.addEventListener("input",()=>{r&&(r.value=""),clearTimeout(f),f=window.setTimeout(()=>$(s.value),150)}),s?.addEventListener("focus",()=>{s.value.trim()&&$(s.value)}),o?.addEventListener("click",p=>{const E=p.target.closest(".ac-item");E&&(E.dataset.acNew==="true"?r&&(r.value=""):(s&&(s.value=E.dataset.acName??""),i&&(i.value=E.dataset.acPhone??""),r&&(r.value=E.dataset.acId??"")),o&&(o.hidden=!0))}),document.addEventListener("click",p=>{o&&!o.contains(p.target)&&p.target!==s&&(o.hidden=!0)});const T=()=>{const p=l?.value==="gcash";u&&(u.hidden=!p),v&&(v.required=p,p||(v.value=""))},g=(p,E)=>{if(!t)return;const b=t.querySelector(`input[name="${p}"]`);b&&(b.value=String(Math.max(0,Number(b.value||0)+E)),b.closest(".qty-card")?.classList.toggle("is-selected",Number(b.value)>0),b.dispatchEvent(new Event("input",{bubbles:!0})))};t?.querySelectorAll(".qty-control input").forEach(p=>{p.addEventListener("input",()=>{p.value=String(Math.max(0,Number(p.value||0))),p.closest(".qty-card")?.classList.toggle("is-selected",Number(p.value)>0)})}),t?.querySelectorAll("[data-qty-card]").forEach(p=>{p.addEventListener("click",E=>{const b=E.target;b.closest("input")||b.closest("button")||g(p.dataset.qtyCard??"",1)})}),t?.querySelectorAll("[data-qty-plus]").forEach(p=>{p.addEventListener("click",()=>g(p.dataset.qtyPlus??"",1))}),t?.querySelectorAll("[data-qty-minus]").forEach(p=>{p.addEventListener("click",()=>g(p.dataset.qtyMinus??"",-1))});const R=()=>{if(!t||!a)return;const p=vt(t,e.services),E=p[0],b=mt(E,e.categories),P=pt(t,e.services),L=p.length>0&&E&&b,x=P.length>0;if(!L&&!x){n&&(n.disabled=!0),c&&(c.hidden=!y,c.textContent=y?"Please select at least one service or extra service.":""),a.innerHTML='<div class="preview-total"><span>Total amount</span><strong>PHP 0.00</strong></div>';return}if(L){const D=Ne(p,b,Fe(E,b),P),I=D.serviceLines.map(M=>`${M.name} x${M.quantity}`),k=D.extras.map(M=>`${ee(M.name)} x${M.quantity}`);n&&(n.disabled=!1),c&&(c.hidden=!0,c.textContent=""),a.classList.remove("has-error"),a.innerHTML=`
        <div class="preview-line"><span>Services${I.length?` (${m(I.join(", "))})`:""}</span><strong>${w(D.price)}</strong></div>
        ${D.extraServiceAmount>0?`<div class="preview-line"><span>Extra services${k.length?` (${m(k.join(", "))})`:""}</span><strong>${w(D.extraServiceAmount)}</strong></div>`:""}
        <div class="preview-total"><span>Total amount</span><strong>${w(D.totalAmount)}</strong></div>
      `}else{const D=P.reduce((k,M)=>k+M.price*(M.quantity??1),0),I=P.map(k=>`${ee(k.name)} x${k.quantity??1}`);n&&(n.disabled=!1),c&&(c.hidden=!0,c.textContent=""),a.classList.remove("has-error"),a.innerHTML=`
        <div class="preview-line"><span>Extra services (${m(I.join(", "))})</span><strong>${w(D)}</strong></div>
        <div class="preview-total"><span>Total amount</span><strong>${w(D)}</strong></div>
      `}};l?.addEventListener("change",T),T(),t?.addEventListener("input",R),t?.addEventListener("change",R),R(),t?.addEventListener("submit",async p=>{p.preventDefault(),y=!0;const E=new FormData(t),b=vt(t,e.services),P=b[0],L=mt(P,e.categories),x=pt(t,e.services),D=b.length>0&&P&&L,I=x.length>0;if(!D&&!I){c&&(c.hidden=!1,c.textContent="Please select at least one service or extra service.");return}const k=b.map(B=>`${B.name} x${B.quantity}`).join(", "),M=D?Ne(b,L,Fe(P,L),x):Ne([],e.categories[0],1,x);if(confirm(`Save this order?

Services: ${k}
Total: ${w(M.totalAmount)}`))try{const B=await Sa({customerId:Number(E.get("customerId"))||void 0,customerName:String(E.get("customerName")??""),customerPhone:String(E.get("customerPhone")??"")||null,serviceQuantities:It(t,e.services),branch:e.branch,itemCategoryId:L?.id??e.categories[0].id,weightKg:P&&L?Fe(P,L):1,addonQuantities:qt(t,e.services),paidAmount:Number(E.get("paidAmount")??0),paymentMethod:String(E.get("paymentMethod")??"cash"),paymentReference:String(E.get("paymentReference")??"")||null,notes:String(E.get("notes")??"")||null});d.receiptOrderId=B.id,await S()}catch(B){c&&(c.hidden=!1,c.textContent=B instanceof Error?B.message:"Order could not be saved.")}}),document.querySelectorAll(".advance-form").forEach(p=>{p.addEventListener("submit",async E=>{E.preventDefault();const b=Number(p.dataset.orderId),P=p.dataset.action==="claim",L=Number(p.dataset.balance||0);if(P&&L>0){alert("Please complete the balance before claiming this order.");return}const x=new FormData(p),D=x.getAll("assignedStaffId").map(Number).filter(M=>M>0),I=Number(x.get("releasedBy")||0),k=D.length>0?D:I>0?I:null;await it(b,k),await Le(P?"Claim order":"Advance order",`Order ID ${b}`),await S()})}),document.querySelectorAll(".claim-payment-form").forEach(p=>{const E=p.querySelector('select[name="method"]'),b=p.querySelector('input[name="reference"]'),P=()=>{const L=E?.value==="gcash";b&&(b.closest("label").hidden=!L,b.required=L,L||(b.value=""))};E?.addEventListener("change",P),P(),p.addEventListener("submit",async L=>{L.preventDefault();const x=new FormData(p),D=Number(x.get("amount"));if(D<=0)return;const I=Number(p.dataset.orderId);await Me(I,{amount:D,method:String(x.get("method")),reference:String(x.get("reference")??"")||null}),await it(I,null),d.paymentModalOrderId=0,await S()})}),document.querySelectorAll("[data-close-payment-modal]").forEach(p=>{p.addEventListener("click",async()=>{d.paymentModalOrderId=0,await S()})}),document.querySelectorAll(".payment-form").forEach(p=>{const E=p.querySelector('select[name="method"]'),b=p.querySelector('input[name="reference"]'),P=()=>{const L=E?.value==="gcash";b&&(b.hidden=!L,b.required=L,L||(b.value=""))};E?.addEventListener("change",P),P(),p.addEventListener("submit",async L=>{L.preventDefault();const x=new FormData(p),D=Number(x.get("amount")),I=String(x.get("method")),k=String(x.get("reference")??"")||null;confirm(`Confirm payment of ${w(D)} via ${I.toUpperCase()}?`)&&(await Me(Number(p.dataset.orderId),{amount:D,method:I,reference:k}),await Le("Record payment",`${w(D)} ${I.toUpperCase()} for order ID ${p.dataset.orderId}`),await S())})}),document.querySelectorAll("[data-cancel-order]").forEach(p=>{p.addEventListener("click",async()=>{const E=Number(p.dataset.cancelOrder);if(Number.isFinite(E)&&confirm("Cancel this order? (No payment will be refunded.)"))try{d.receiptOrderId===E&&(d.receiptOrderId=0),await Na(E),await Le("Cancel order",`Order ID ${E}`),await S()}catch(b){alert(b instanceof Error?b.message:"Cancel failed.")}})}),document.querySelectorAll("[data-delete-order]").forEach(p=>{p.addEventListener("click",async()=>{const E=Number(p.dataset.deleteOrder);if(Number.isFinite(E)&&confirm("Delete this paid order and update sales?"))try{d.receiptOrderId===E&&(d.receiptOrderId=0),await La(E),await S()}catch(b){alert(b instanceof Error?b.message:"Delete failed.")}})})}function Cn(e){document.querySelector("#service-form")?.addEventListener("submit",async t=>{t.preventDefault();const a=new FormData(t.currentTarget),n=a.get("id")?Number(a.get("id")):void 0;await rt({id:n,name:String(a.get("name")??""),description:String(a.get("description")??"")||null,category:String(a.get("category")??""),serviceType:String(a.get("serviceType")??"order"),price:Number(a.get("price")??0),maxKg:Number(a.get("maxKg")??0),dryingMinutes:Number(a.get("dryingMinutes"))||null,includes:a.getAll("includes").map(String).filter(Boolean),additionalCharge:0,turnaroundHours:Number(a.get("turnaroundHours")??24),isActive:1}),await S()}),document.querySelectorAll(".edit-service-btn").forEach(t=>{t.addEventListener("click",()=>{const a=Number(t.dataset.id),n=e.find(r=>r.id===a),s=document.querySelector("#service-form");n&&s&&(s.querySelector("[name=id]").value=String(n.id),s.querySelector("[name=name]").value=n.name,s.querySelector("[name=category]").value=n.category,s.querySelector("[name=serviceType]").value=n.serviceType,s.querySelector("[name=price]").value=String(n.price),s.querySelector("[name=maxKg]").value=String(n.maxKg),s.querySelector("[name=dryingMinutes]").value=n.dryingMinutes?String(n.dryingMinutes):"",s.querySelectorAll('input[name="includes"]').forEach(r=>{r.checked=n.includes.includes(r.value)}),s.querySelector("[name=turnaroundHours]").value=String(n.turnaroundHours),s.querySelector("[name=description]").value=n.description??"",window.scrollTo({top:0,behavior:"smooth"}))})}),document.querySelectorAll(".deactivate-service-btn, .activate-service-btn").forEach(t=>{t.addEventListener("click",async()=>{const a=Number(t.dataset.id),n=e.find(s=>s.id===a);if(n){const s=n.isActive?0:1;await rt({id:n.id,name:n.name,description:n.description,category:n.category,serviceType:n.serviceType,price:n.price,maxKg:n.maxKg,dryingMinutes:n.dryingMinutes,includes:n.includes,additionalCharge:n.additionalCharge,turnaroundHours:n.turnaroundHours,isActive:s}),await S()}})}),document.querySelector("#category-form")?.addEventListener("submit",async t=>{t.preventDefault();const a=new FormData(t.currentTarget);await ba({name:String(a.get("name")??""),maxKg:Number(a.get("maxKg")??0),additionalFee:Number(a.get("additionalFee")??0),isActive:1}),await S()})}function $n(e){const t=document.querySelector("#expense-form"),a=t?.querySelector('input[name="disbursementType"]'),n=t?.querySelector(".expense-date-field"),s=t?.querySelector(".expense-month-field"),r=t?.querySelector('input[name="expenseDate"]'),i=t?.querySelector('input[name="expenseMonth"]'),o=c=>{!t||!a||!r||!i||(a.value=c,t.querySelectorAll("[data-expense-type]").forEach(l=>{l.classList.toggle("is-active",l.dataset.expenseType===c)}),n&&(n.hidden=c==="monthly"),s&&(s.hidden=c!=="monthly"),r.required=c==="daily",i.required=c==="monthly",c==="monthly"&&!i.value&&(i.value=Be()),c==="daily"&&!r.value&&(r.value=H()))};t?.querySelectorAll("[data-expense-type]").forEach(c=>{c.addEventListener("click",()=>o(c.dataset.expenseType==="monthly"?"monthly":"daily"))}),o("daily"),t?.addEventListener("submit",async c=>{c.preventDefault();const l=new FormData(c.currentTarget),u=Number(l.get("id")||0),v=String(l.get("disbursementType")??"daily")==="monthly"?"monthly":"daily",y=String(l.get("expenseMonth")??Be()),f={expenseDate:v==="monthly"?`${y}-01`:String(l.get("expenseDate")??""),disbursementType:v,name:String(l.get("name")??""),category:String(l.get("category")??""),description:String(l.get("description")??""),amount:Number(l.get("amount")??0)};u?await Ia(u,f):await Pa(f),await S()}),document.querySelectorAll(".edit-expense-btn").forEach(c=>{c.addEventListener("click",()=>{const l=e.find(v=>v.id===Number(c.dataset.id));if(!l||!t)return;t.querySelector("[name=id]").value=String(l.id),t.querySelector("[name=expenseDate]").value=l.expenseDate,t.querySelector("[name=expenseMonth]").value=Ct(l.expenseDate),o(te(l)),t.querySelector("[name=amount]").value=String(l.amount),t.querySelector("[name=name]").value=l.name,t.querySelector("[name=category]").value=l.category,t.querySelector("[name=description]").value=l.description??"";const u=t.querySelector('button[type="submit"]');u&&(u.textContent="Update expense"),t.scrollIntoView({behavior:"smooth",block:"start"})})}),document.querySelectorAll(".delete-expense-btn").forEach(c=>{c.addEventListener("click",async()=>{if(d.currentUser?.role!=="admin")return;const l=Number(c.dataset.id);!Number.isFinite(l)||!confirm("Delete this disbursement?")||(await qa(l),await S())})}),document.querySelector("#fold-form")?.addEventListener("submit",async c=>{c.preventDefault();const l=new FormData(c.currentTarget);await Ca({orderTicket:String(l.get("orderTicket")??""),staffName:String(l.get("staffName")??""),foldCount:Number(l.get("foldCount")??1),rate:Number(l.get("rate")??5)}),await S()})}function Rn(e,t,a,n,s,r){document.querySelector("#generate-report")?.addEventListener("click",()=>{d.reportPreview=Te(),S()});const i=document.querySelector("#sales-form");i?.addEventListener("submit",async T=>{T.preventDefault();const g=new FormData(T.currentTarget);await Ua({id:Number(g.get("id")||0)||void 0,saleDate:String(g.get("saleDate")??""),cashAmount:Number(g.get("cashAmount")??0),gcashAmount:Number(g.get("gcashAmount")??0),notes:String(g.get("notes")??"")}),await S()}),document.querySelectorAll(".edit-sale-btn").forEach(T=>{T.addEventListener("click",()=>{const g=a.find(p=>p.id===Number(T.dataset.id));if(!g||!i)return;i.querySelector("[name=id]").value=String(g.id),i.querySelector("[name=saleDate]").value=g.saleDate,i.querySelector("[name=cashAmount]").value=String(g.cashAmount),i.querySelector("[name=gcashAmount]").value=String(g.gcashAmount),i.querySelector("[name=notes]").value=g.notes??"";const R=i.querySelector('button[type="submit"]');R&&(R.textContent="Update daily sale"),i.scrollIntoView({behavior:"smooth",block:"start"})})}),document.querySelectorAll(".delete-sale-btn").forEach(T=>{T.addEventListener("click",async()=>{if(d.currentUser?.role!=="admin")return;const g=Number(T.dataset.id);!Number.isFinite(g)||!confirm("Delete this daily sale?")||(await ka(g),await S())})});const o=document.querySelector("[data-date-from]"),c=document.querySelector("[data-date-to]"),l=document.querySelector('[data-date-scope][value="custom"]');o&&l&&o.addEventListener("change",()=>l.checked=!0),c&&l&&c.addEventListener("change",()=>l.checked=!0),document.querySelectorAll("[data-date-scope]").forEach(T=>{T.addEventListener("change",()=>{if(!T.checked||!o||!c)return;const g=new Date,R=ie(g),p=new Date(g);T.value==="week"&&p.setDate(g.getDate()-6),T.value==="month"&&p.setDate(1),T.value!=="custom"&&(o.value=T.value==="today"?R:ie(p),c.value=R)})});const u=T=>{const g=E=>String(E??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;"),R=E=>E==="Sales Report"?[110,125,150,215,95,95,105,105]:E==="Disbursement"?[115,115,90,150,150,220,105]:E==="Fold Count"?[220,125]:E==="Revolving Daily Summary"?[115,105,120,115]:E==="Revolving History"?[115,96,140,96,110,180,120]:[155,125,125,125,95,95,115,115];return`<?xml version="1.0"?>
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
  ${T.map(E=>{const b=R(E.name).map(L=>`<Column ss:Width="${L}" ss:AutoFitWidth="0"/>`).join(""),P=E.rows.map(L=>{if(!L.length)return'<Row ss:Height="10" ss:StyleID="BorderRow"><Cell ss:StyleID="BorderCell"><Data ss:Type="String">&nbsp;</Data></Cell></Row>';const x=L[0]==="Type"||L[0]==="Summary"||L[0]==="Sales Summary"||L[0]==="Disbursement Summary"||L[0]==="Staff"||L[0]==="Date of Sales"||L[0]==="Date"||L[0]==="Date/Month",D=x?"HeaderRow":"BorderRow",I=x?"HeaderCell":"BorderCell",k=x?26:22,M=L.map(B=>`<Cell ss:StyleID="${I}"><Data ss:Type="${typeof B=="number"?"Number":"String"}">${g(B)}</Data></Cell>`).join("");return`<Row ss:Height="${k}" ss:StyleID="${D}">${M}</Row>`}).join("");return`
        <Worksheet ss:Name="${g(E.name)}">
          <Table>
            ${b}
            ${P}
          </Table>
        </Worksheet>`}).join("")}
</Workbook>`},v=()=>{const T=Te(),g=Ot(e,t,a,n,s,r),R=[];if(g.selectedTypes.has("sales")){const b=g.salesRows(),P=[["Ticket","Customer","Cash","GCash","Total Payment"],...b.transactions.map(L=>[L.ticket,L.customer,L.cash,L.gcash,L.total]),[],["Cash from Orders","GCash from Orders","Sales from Orders"],[b.orderCashTotal,b.orderGcashTotal,b.orderCashTotal+b.orderGcashTotal],[],["Cash Whole Sale","GCash Whole Sale","Whole Sale of Day"],[b.manualCashTotal,b.manualGcashTotal,b.manualCashTotal+b.manualGcashTotal],[],["Total Cash","Total GCash","Total Sales"],[b.totalCash,b.totalGcash,b.totalSales]];R.push({name:"Sales Report",rows:P})}g.selectedTypes.has("disbursement")&&R.push({name:"Disbursement",rows:g.disbursementRows().rows}),g.selectedTypes.has("fold_count")&&R.push({name:"Fold Count",rows:g.foldCountRows().rows}),g.selectedTypes.has("revolving_fund")&&(R.push({name:"Revolving Daily Summary",rows:g.revolvingDailySummaryRows().rows}),R.push({name:"Revolving History",rows:g.revolvingHistoryRows().rows})),g.selectedTypes.has("summary")&&R.push({name:"Summary",rows:g.summaryRows()});const p=u(R.length?R:[{name:"Summary",rows:g.summaryRows()}]),E=`laba101-report-${T.from}-to-${T.to}.xls`;return new File([p],E,{type:"application/vnd.ms-excel"})},y=async()=>{const T=v();if(!C.isNativePlatform())return{fileName:T.name,uri:""};const g=await T.text(),R=T.name;await tt.writeFile({path:R,data:g,directory:Ae.External,encoding:Ue.UTF8});const{uri:p}=await tt.getUri({path:R,directory:Ae.External});return{fileName:T.name,uri:p}},f=()=>{const T=v(),g=Te(),R=`laba101-report-${g.from}-to-${g.to}.xls`,p=T,E=URL.createObjectURL(p),b=document.createElement("a");return b.href=E,b.download=R,document.body.appendChild(b),b.click(),setTimeout(()=>{b.remove(),URL.revokeObjectURL(E)},1e3),R},$=async T=>{const g=document.querySelector(T==="export"?"#export-report":"#email-report");g&&(g.disabled=!0,g.textContent=T==="export"?"Exporting...":"Sending...");try{if(T==="export")if(C.isNativePlatform()){const R=await y();alert(`Report exported as "${R.fileName}".`)}else{const R=f();alert(`Report saved: ${R}`)}else{const R=await gt("report_email")||"";if(!R){alert("Please configure a report email in Settings first.");return}const p=Te(),E=`Laba101 report ${p.from} to ${p.to}`;if(C.isNativePlatform()){const b=await y();try{await Jt.share({title:E,text:`Please find the attached Laba101 report file: ${b.fileName}`,files:[b.uri],dialogTitle:"Send report via email"}),alert(`Report saved and shared as "${b.fileName}".`)}catch(P){const L=String(P).toLowerCase();if(L.includes("share canceled")||L.includes("canceled"))alert(`Report saved as "${b.fileName}".`);else throw P}}else{const b=f(),P=`Hi,

Please find the attached Laba101 report file: ${b}

Date range: ${p.from} to ${p.to}`,L=`mailto:${R}?subject=${encodeURIComponent(E)}&body=${encodeURIComponent(P)}`;setTimeout(()=>{window.location.href=L},800),alert(`Report downloaded as "${b}".
Your email app will open — please attach the file and send.`)}}}catch(R){alert("Failed: "+String(R))}finally{g&&(g.disabled=!1,g.textContent=T==="export"?"Export Excel":"Send to Email")}};document.querySelector("#export-report")?.addEventListener("click",async()=>{await $("export")}),document.querySelector("#email-report")?.addEventListener("click",async()=>{await $("email")})}function On(){document.querySelector("#order-queue-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);d.orderSearch=String(t.get("orderSearch")??"").trim(),d.orderDateFilter=String(t.get("orderDateFilter")??"").trim(),d.orderPaymentFilter=String(t.get("orderPaymentFilter")??"").trim(),S()}),document.querySelector("#order-queue-clear")?.addEventListener("click",()=>{d.orderSearch="",d.orderDateFilter="",d.orderPaymentFilter="",S()}),document.querySelector("#archived-order-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);d.archivedOrderSearch=String(t.get("archivedOrderSearch")??"").trim(),S()}),document.querySelector("#archived-order-clear")?.addEventListener("click",()=>{d.archivedOrderSearch="",S()})}function Dn(){document.querySelector("#customer-search-form")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);d.customerSearch=String(t.get("customerSearch")??"").trim(),S()}),document.querySelector("#customer-search-clear")?.addEventListener("click",()=>{d.customerSearch="",S()})}function xn(){document.querySelector("#machine-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await ja({machineName:String(t.get("machineName")??""),machineType:String(t.get("machineType")),status:String(t.get("status")),branch:String(t.get("branch")??"")}),await S()}),document.querySelector("#subcleaning-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=e.currentTarget.querySelector('button[type="submit"]');t&&(t.disabled=!0,t.textContent="Starting...");const a=new FormData(e.currentTarget),n=a.getAll("machineIds").map(Number);if(!n.length){alert("Please select at least one machine to clean."),t&&(t.disabled=!1,t.textContent="Start Cleaning");return}await Xa({date:String(a.get("date")??""),machineIds:n,cleaningStatus:String(a.get("cleaningStatus")??""),notes:String(a.get("notes")??""),branch:String(a.get("branch")??"")}),await S()}),document.querySelectorAll(".complete-cleaning-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.machineId),a=e.dataset.branch??"";e.disabled=!0,e.textContent="Completing...",await Ka(t,a),await S()})}),document.querySelectorAll(".deactivate-machine-btn, .activate-machine-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.id),a=e.classList.contains("deactivate-machine-btn");await Ha(t,a?"inactive":"available"),await S()})})}function Pn(e,t){const a=document.querySelector("#inventory-form");a?.addEventListener("submit",async n=>{n.preventDefault();const s=new FormData(n.currentTarget),r=Number(s.get("id")||0);await _a({id:r||void 0,name:String(s.get("name")??""),unit:String(s.get("unit")??""),quantity:Number(s.get("quantity")??0),reorderLevel:Number(s.get("reorderLevel")??0),notes:String(s.get("notes")??""),branch:t}),await Le(r?"Update inventory item":"Create inventory item",String(s.get("name")??"")),await S()}),document.querySelectorAll(".edit-inventory-btn").forEach(n=>{n.addEventListener("click",()=>{const s=e.find(r=>r.id===Number(n.dataset.id));!s||!a||(a.querySelector("[name=id]").value=String(s.id),a.querySelector("[name=name]").value=s.name,a.querySelector("[name=unit]").value=s.unit,a.querySelector("[name=quantity]").value=String(s.quantity),a.querySelector("[name=reorderLevel]").value=String(s.reorderLevel),a.querySelector("[name=notes]").value=s.notes??"",a.scrollIntoView({behavior:"smooth",block:"start"}))})})}function In(e){const t=document.querySelector("#add-staff-modal"),a=document.querySelector("#open-add-staff-modal"),n=document.querySelector("#close-add-staff-modal"),s=document.querySelector("#staff-form"),r=()=>{s?.reset(),s&&(s.querySelector("[name=id]").value="");const o=document.querySelector("#add-staff-title");o&&(o.textContent="Add staff member"),t?.removeAttribute("hidden")},i=()=>{t?.setAttribute("hidden",""),s?.reset()};a?.addEventListener("click",r),n?.addEventListener("click",i),t?.addEventListener("click",o=>{o.target===t&&i()}),document.querySelectorAll(".edit-staff-btn").forEach(o=>{o.addEventListener("click",()=>{const c=Number(o.dataset.id),l=e.find(u=>u.id===c);if(l&&s){s.querySelector("[name=id]").value=String(l.id),s.querySelector("[name=name]").value=l.name,s.querySelector("[name=email]").value=l.email,s.querySelector("[name=password]").value=l.password,s.querySelector("[name=role]").value=l.role,s.querySelector("[name=branch]").value=l.branch;const u=document.querySelector("#add-staff-title");u&&(u.textContent="Edit staff member"),t?.removeAttribute("hidden")}})}),document.querySelectorAll(".deactivate-staff-btn, .activate-staff-btn").forEach(o=>{o.addEventListener("click",async()=>{const c=Number(o.dataset.id),l=e.find(u=>u.id===c);l&&(await st(c,{isActive:l.isActive!==0?0:1}),await S())})}),s?.addEventListener("submit",async o=>{o.preventDefault();const c=document.querySelector("#staff-save-btn");c&&(c.disabled=!0,c.textContent="Saving...");const l=new FormData(s),u=l.get("id")?Number(l.get("id")):void 0,v=String(l.get("name")??"").trim(),y=String(l.get("email")??"").trim(),f=String(l.get("password")??"password")||"password",$=String(l.get("role")),T=String(l.get("branch")??"");if(!v||!y){alert("Name and email are required."),c&&(c.disabled=!1,c.textContent="Save staff member");return}try{u?await st(u,{name:v,email:y,password:f,role:$,branch:T}):await ya({name:v,email:y,password:f,role:$,branch:T}),i(),await S()}catch{alert("Failed to save staff. The email may already be in use."),c&&(c.disabled=!1,c.textContent="Save staff member")}})}function qn(){document.querySelector("#settings-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await we("branch",String(t.get("branch")??"Main Store")),await we("fold_rate",String(t.get("foldRate")??"5")),String(t.get("reportEmail")??"")&&await we("report_email",String(t.get("reportEmail"))),alert("Settings saved successfully!")})}async function Fn(){await ma();const e=localStorage.getItem(be);if(e)try{const t=JSON.parse(e);if(t.email&&t.remembered){const a=await Et(t.email,"password")??null;d.currentUser=a}}catch{localStorage.removeItem(be)}await S()}function Un(e,t,a,n){const s=e.filter(f=>f.status==="revolving").reduce((f,$)=>f+$.cashAmount,0),r=t.filter(f=>f.type==="add").reduce((f,$)=>f+$.amount,0),i=t.filter(f=>f.type==="disbursement").reduce((f,$)=>f+$.amount,0),o=s+r-i,c=d.revolvingHistoryFrom||"0000-01-01",l=d.revolvingHistoryTo||"9999-12-31",u=t.filter(f=>{const $=K(f.createdAt);return $>=c&&$<=l}),v=e.map(f=>{const $=At(f.saleDate,a,n,f.cashAmount),T=f.status==="revolving"?'<span class="ok">Revolving</span>':f.status==="endorsed"?`<span class="warn">Endorsed to ${m(f.endorsedTo)}</span>`:'<span class="meta">Pending</span>',g=f.status!=="revolving"&&f.status!=="endorsed"?`<div class="row-actions">
          <button class="primary revolving-btn" data-id="${f.id}">Revolving</button>
          <button class="secondary endorsed-btn" data-id="${f.id}" data-date="${ae(f.saleDate)}">Endorsed</button>
        </div>`:"";return[`<strong>${m(ae(f.saleDate))}</strong>`,`<strong class="ok">${w($)}</strong>`,T,f.statusUpdatedAt?m(ae(f.statusUpdatedAt)):"-",g]}),y=u.map(f=>[Qa(f.createdAt),`<strong>${m(f.revolvingNumber)}</strong>`,m(f.name),`<strong class="${f.type==="disbursement"?"warn":"ok"}">${f.type==="disbursement"?"-":"+"}${w(f.amount)}</strong>`,m(f.category),m(f.description||"-"),`<span class="${f.type==="add"?"ok":"warn"}">${f.type==="add"?"Add Revolving Fund":"Disbursement"}</span>`]);return`
    <section class="grid content full">
      <div class="panel-header" style="display: flex; gap: 16px; margin-bottom: 24px; align-items: center;">
        <button class="primary" id="add-revolving-fund-btn">Add Revolving Fund</button>
        <button class="secondary" id="revolving-disbursement-btn">Disbursement</button>
      </div>

      <article class="panel">
        <div style="background-color: #061a42; color: white; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
          <p style="font-size: 12px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin: 0 0 8px 0;">Revolving Fund Total</p>
          <p style="font-size: 32px; font-weight: 800; margin: 0;">${w(o)}</p>
        </div>
        ${q("Daily Summary","Cash on hand per day (order cash + manual cash − disbursements)")}
        ${Oe(["Date of Sales","Cash on Hand","Status","Date Update","Action"],v,"data-table revolving-summary-datatable")}
      </article>

      <article class="panel">
        ${q("Revolving Table History","Filter by date — DISB numbers shared with Daily Report expenses")}
        <form id="revolving-history-filters" class="form revolving-history-filters">
          <div class="form-row">
            <label>From<input name="revolvingHistoryFrom" type="date" value="${d.revolvingHistoryFrom}" /></label>
            <label>To<input name="revolvingHistoryTo" type="date" value="${d.revolvingHistoryTo}" /></label>
          </div>
          <div class="row-actions">
            <button class="primary" type="submit">Apply filter</button>
            <button class="secondary" type="button" id="revolving-history-clear">Clear</button>
          </div>
        </form>
        ${Oe(["Date","Disbursement #","Name","Amount","Category","Description","Type"],y,"data-table revolving-history-datatable")}
      </article>

      ${d.endorseModalOpen?`
        <div class="modal-backdrop" role="presentation">
          <div class="receipt-modal" role="dialog" aria-modal="true" style="max-width: 400px; width: 90%;">
            <form id="endorse-form" class="form" style="padding: 24px;">
              <h3 style="margin-top: 0;">Endorse Money</h3>
              <p class="meta" style="margin-bottom: 16px;">Endorsing cash from <strong>${m(d.endorseSaleDate)}</strong>.</p>
              <label>Endorsed to (Name)<input name="endorsedTo" type="text" placeholder="Enter name" required /></label>
              <div class="modal-actions" style="margin-top: 24px; padding: 0;">
                <button class="primary" type="submit">Submit Endorsement</button>
                <button class="secondary" type="button" id="close-endorse-modal">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      `:""}

      ${d.revolvingModalOpen?`
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

      ${d.addFundModalOpen?`
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

      ${d.disbursementModalOpen?`
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
  `}function kn(){document.querySelector("#revolving-history-filters")?.addEventListener("submit",async u=>{u.preventDefault();const v=new FormData(u.currentTarget);d.revolvingHistoryFrom=String(v.get("revolvingHistoryFrom")??"").trim(),d.revolvingHistoryTo=String(v.get("revolvingHistoryTo")??"").trim(),await S()}),document.querySelector("#revolving-history-clear")?.addEventListener("click",async()=>{d.revolvingHistoryFrom="",d.revolvingHistoryTo="",await S()}),document.querySelectorAll(".revolving-btn").forEach(u=>{u.addEventListener("click",async()=>{d.revolvingModalOpen=!0,d.revolvingSaleId=Number(u.dataset.id),await S()})});const e=document.getElementById("confirm-revolving-btn");e&&e.addEventListener("click",async()=>{await ct(d.revolvingSaleId,"revolving",null,new Date().toISOString()),d.revolvingModalOpen=!1,await S()});const t=document.getElementById("close-revolving-modal");t&&t.addEventListener("click",async()=>{d.revolvingModalOpen=!1,await S()}),document.querySelectorAll(".endorsed-btn").forEach(u=>{u.addEventListener("click",async()=>{d.endorseModalOpen=!0,d.endorseSaleId=Number(u.dataset.id),d.endorseSaleDate=u.dataset.date??"",await S()})});const a=document.getElementById("close-endorse-modal");a&&a.addEventListener("click",async()=>{d.endorseModalOpen=!1,await S()});const n=document.getElementById("endorse-form");n&&n.addEventListener("submit",async u=>{u.preventDefault();const v=new FormData(n),y=String(v.get("endorsedTo")??"").trim();y&&(await ct(d.endorseSaleId,"endorsed",y,new Date().toISOString()),d.endorseModalOpen=!1,await S())});const s=document.getElementById("add-revolving-fund-btn");s&&s.addEventListener("click",async()=>{d.addFundModalOpen=!0,await S()});const r=document.getElementById("close-add-fund-modal");r&&r.addEventListener("click",async()=>{d.addFundModalOpen=!1,await S()});const i=document.getElementById("add-fund-form");i&&i.addEventListener("submit",async u=>{u.preventDefault();const v=new FormData(i);await lt({name:String(v.get("name")??"").trim(),amount:Number(v.get("amount")??0),category:"Add Revolving Fund",description:null,type:"add",createdAt:new Date().toISOString()}),d.addFundModalOpen=!1,await S()});const o=document.getElementById("revolving-disbursement-btn");o&&o.addEventListener("click",async()=>{d.disbursementModalOpen=!0,await S()});const c=document.getElementById("close-disbursement-modal");c&&c.addEventListener("click",async()=>{d.disbursementModalOpen=!1,await S()});const l=document.getElementById("disbursement-form");l&&l.addEventListener("submit",async u=>{u.preventDefault();const v=new FormData(l);await lt({name:String(v.get("name")??"").trim(),amount:Number(v.get("amount")??0),category:String(v.get("category")??"").trim(),description:String(v.get("description")??"").trim(),type:"disbursement",expenseDate:H(),createdAt:new Date().toISOString()}),d.disbursementModalOpen=!1,await S()})}Fn();export{Ue as E,_e as W,Ht as b};
