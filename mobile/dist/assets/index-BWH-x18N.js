(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=a(n);fetch(n.href,r)}})();var ce;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(ce||(ce={}));class Re extends Error{constructor(t,a,s){super(t),this.message=t,this.code=a,this.data=s}}const It=e=>{var t,a;return e?.androidBridge?"android":!((a=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},qt=e=>{const t=e.CapacitorCustomPlatform||null,a=e.Capacitor||{},s=a.Plugins=a.Plugins||{},n=()=>t!==null?t.name:It(e),r=()=>n()!=="web",i=m=>{const p=o.get(m);return!!(p?.platforms.has(n())||l(m))},l=m=>{var p;return(p=a.PluginHeaders)===null||p===void 0?void 0:p.find(g=>g.name===m)},u=m=>e.console.error(m),o=new Map,d=(m,p={})=>{const g=o.get(m);if(g)return console.warn(`Capacitor plugin "${m}" already registered. Cannot register plugins twice.`),g.proxy;const b=n(),E=l(m);let y;const N=async()=>(!y&&b in p?y=typeof p[b]=="function"?y=await p[b]():y=p[b]:t!==null&&!y&&"web"in p&&(y=typeof p.web=="function"?y=await p.web():y=p.web),y),f=(x,F)=>{var M,_;if(E){const G=E?.methods.find(B=>F===B.name);if(G)return G.rtype==="promise"?B=>a.nativePromise(m,F.toString(),B):(B,h)=>a.nativeCallback(m,F.toString(),B,h);if(x)return(M=x[F])===null||M===void 0?void 0:M.bind(x)}else{if(x)return(_=x[F])===null||_===void 0?void 0:_.bind(x);throw new Re(`"${m}" plugin is not implemented on ${b}`,ce.Unimplemented)}},A=x=>{let F;const M=(..._)=>{const G=N().then(B=>{const h=f(B,x);if(h){const D=h(..._);return F=D?.remove,D}else throw new Re(`"${m}.${x}()" is not implemented on ${b}`,ce.Unimplemented)});return x==="addListener"&&(G.remove=async()=>F()),G};return M.toString=()=>`${x.toString()}() { [capacitor code] }`,Object.defineProperty(M,"name",{value:x,writable:!1,configurable:!1}),M},O=A("addListener"),R=A("removeListener"),U=(x,F)=>{const M=O({eventName:x},F),_=async()=>{const B=await M;R({eventName:x,callbackId:B},F)},G=new Promise(B=>M.then(()=>B({remove:_})));return G.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await _()},G},q=new Proxy({},{get(x,F){switch(F){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return E?U:O;case"removeListener":return R;default:return A(F)}}});return s[m]=q,o.set(m,{name:m,proxy:q,platforms:new Set([...Object.keys(p),...E?[b]:[]])}),q};return a.convertFileSrc||(a.convertFileSrc=m=>m),a.getPlatform=n,a.handleError=u,a.isNativePlatform=r,a.isPluginAvailable=i,a.registerPlugin=d,a.Exception=Re,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},Ft=e=>e.Capacitor=qt(e),C=Ft(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),re=C.registerPlugin;class ke{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,a){let s=!1;this.listeners[t]||(this.listeners[t]=[],s=!0),this.listeners[t].push(a);const r=this.windowListeners[t];r&&!r.registered&&this.addWindowListener(r),s&&this.sendRetainedArgumentsForEvent(t);const i=async()=>this.removeListener(t,a);return Promise.resolve({remove:i})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,a,s){const n=this.listeners[t];if(!n){if(s){let r=this.retainedEventArguments[t];r||(r=[]),r.push(a),this.retainedEventArguments[t]=r}return}n.forEach(r=>r(a))}hasListeners(t){var a;return!!(!((a=this.listeners[t])===null||a===void 0)&&a.length)}registerWindowListener(t,a){this.windowListeners[a]={registered:!1,windowEventName:t,pluginEventName:a,handler:s=>{this.notifyListeners(a,s)}}}unimplemented(t="not implemented"){return new C.Exception(t,ce.Unimplemented)}unavailable(t="not available"){return new C.Exception(t,ce.Unavailable)}async removeListener(t,a){const s=this.listeners[t];if(!s)return;const n=s.indexOf(a);this.listeners[t].splice(n,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const a=this.retainedEventArguments[t];a&&(delete this.retainedEventArguments[t],a.forEach(s=>{this.notifyListeners(t,s)}))}}const Ge=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Ve=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class kt extends ke{async getCookies(){const t=document.cookie,a={};return t.split(";").forEach(s=>{if(s.length<=0)return;let[n,r]=s.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");n=Ve(n).trim(),r=Ve(r).trim(),a[n]=r}),a}async setCookie(t){try{const a=Ge(t.key),s=Ge(t.value),n=t.expires?`; expires=${t.expires.replace("expires=","")}`:"",r=(t.path||"/").replace("path=",""),i=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${a}=${s||""}${n}; path=${r}; ${i};`}catch(a){return Promise.reject(a)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const a of t)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}re("CapacitorCookies",{web:()=>new kt});const Ut=async e=>new Promise((t,a)=>{const s=new FileReader;s.onload=()=>{const n=s.result;t(n.indexOf(",")>=0?n.split(",")[1]:n)},s.onerror=n=>a(n),s.readAsDataURL(e)}),Mt=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(n=>n.toLocaleLowerCase()).reduce((n,r,i)=>(n[r]=e[t[i]],n),{})},_t=(e,t=!0)=>e?Object.entries(e).reduce((s,n)=>{const[r,i]=n;let l,u;return Array.isArray(i)?(u="",i.forEach(o=>{l=t?encodeURIComponent(o):o,u+=`${r}=${l}&`}),u.slice(0,-1)):(l=t?encodeURIComponent(i):i,u=`${r}=${l}`),`${s}&${u}`},"").substr(1):null,Bt=(e,t={})=>{const a=Object.assign({method:e.method||"GET",headers:e.headers},t),n=Mt(e.headers)["content-type"]||"";if(typeof e.data=="string")a.body=e.data;else if(n.includes("application/x-www-form-urlencoded")){const r=new URLSearchParams;for(const[i,l]of Object.entries(e.data||{}))r.set(i,l);a.body=r.toString()}else if(n.includes("multipart/form-data")||e.data instanceof FormData){const r=new FormData;if(e.data instanceof FormData)e.data.forEach((l,u)=>{r.append(u,l)});else for(const l of Object.keys(e.data))r.append(l,e.data[l]);a.body=r;const i=new Headers(a.headers);i.delete("content-type"),a.headers=i}else(n.includes("application/json")||typeof e.data=="object")&&(a.body=JSON.stringify(e.data));return a};class jt extends ke{async request(t){const a=Bt(t,t.webFetchExtra),s=_t(t.params,t.shouldEncodeUrlParams),n=s?`${t.url}?${s}`:t.url,r=await fetch(n,a),i=r.headers.get("content-type")||"";let{responseType:l="text"}=r.ok?t:{};i.includes("application/json")&&(l="json");let u,o;switch(l){case"arraybuffer":case"blob":o=await r.blob(),u=await Ut(o);break;case"json":u=await r.json();break;default:u=await r.text()}const d={};return r.headers.forEach((m,p)=>{d[p]=m}),{data:u,headers:d,status:r.status,url:r.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}re("CapacitorHttp",{web:()=>new jt});var Ye;(function(e){e.Dark="DARK",e.Light="LIGHT",e.Default="DEFAULT"})(Ye||(Ye={}));var Qe;(function(e){e.StatusBar="StatusBar",e.NavigationBar="NavigationBar"})(Qe||(Qe={}));class Ht extends ke{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}re("SystemBars",{web:()=>new Ht});const Wt="modulepreload",Xt=function(e){return"/"+e},Je={},Ue=function(t,a,s){let n=Promise.resolve();if(a&&a.length>0){let u=function(o){return Promise.all(o.map(d=>Promise.resolve(d).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),l=i?.nonce||i?.getAttribute("nonce");n=u(a.map(o=>{if(o=Xt(o),o in Je)return;Je[o]=!0;const d=o.endsWith(".css"),m=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${m}`))return;const p=document.createElement("link");if(p.rel=d?"stylesheet":Wt,d||(p.as="script"),p.crossOrigin="",p.href=o,l&&p.setAttribute("nonce",l),document.head.appendChild(p),d)return new Promise((g,b)=>{p.addEventListener("load",g),p.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${o}`)))})}))}function r(i){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=i,window.dispatchEvent(l),!l.defaultPrevented)throw i}return n.then(i=>{for(const l of i||[])l.status==="rejected"&&r(l.reason);return t().catch(r)})};function Kt(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,a){return new Proxy({},{get(s,n){return(r,i,l)=>{const u=e.Capacitor.Plugins[a];if(u===void 0){l(new Error(`Capacitor plugin ${a} not found`));return}if(typeof u[n]!="function"){l(new Error(`Method ${n} not found in Capacitor plugin ${a}`));return}(async()=>{try{const o=await u[n](r);i(o)}catch(o){l(o)}})()}}})}})}function Gt(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,a){return e.cordova.plugins[a]}})}function Vt(e=!1){typeof window>"u"||(window.CapacitorUtils=window.CapacitorUtils||{},window.Capacitor!==void 0&&!e?Kt(window):window.cordova!==void 0&&Gt(window))}var Te;(function(e){e.Documents="DOCUMENTS",e.Data="DATA",e.Library="LIBRARY",e.Cache="CACHE",e.External="EXTERNAL",e.ExternalStorage="EXTERNAL_STORAGE",e.ExternalCache="EXTERNAL_CACHE",e.LibraryNoCloud="LIBRARY_NO_CLOUD",e.Temporary="TEMPORARY"})(Te||(Te={}));var Pe;(function(e){e.UTF8="utf8",e.ASCII="ascii",e.UTF16="utf16"})(Pe||(Pe={}));const ze=re("Filesystem",{web:()=>Ue(()=>import("./web-Znk9jxU9.js"),[]).then(e=>new e.FilesystemWeb)});Vt();const Yt=re("Share",{web:()=>Ue(()=>import("./web-YMxNlVHs.js"),[]).then(e=>new e.ShareWeb)});class Qt{constructor(t){this.sqlite=t,this._connectionDict=new Map}async initWebStore(){try{return await this.sqlite.initWebStore(),Promise.resolve()}catch(t){return Promise.reject(t)}}async saveToStore(t){try{return await this.sqlite.saveToStore({database:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async saveToLocalDisk(t){try{return await this.sqlite.saveToLocalDisk({database:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getFromLocalDiskToStore(t){const a=t??!0;try{return await this.sqlite.getFromLocalDiskToStore({overwrite:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async echo(t){try{const a=await this.sqlite.echo({value:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isSecretStored(){try{const t=await this.sqlite.isSecretStored();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async setEncryptionSecret(t){try{return await this.sqlite.setEncryptionSecret({passphrase:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async changeEncryptionSecret(t,a){try{return await this.sqlite.changeEncryptionSecret({passphrase:t,oldpassphrase:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async clearEncryptionSecret(){try{return await this.sqlite.clearEncryptionSecret(),Promise.resolve()}catch(t){return Promise.reject(t)}}async checkEncryptionSecret(t){try{const a=await this.sqlite.checkEncryptionSecret({passphrase:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async addUpgradeStatement(t,a){try{return t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.addUpgradeStatement({database:t,upgrade:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async createConnection(t,a,s,n,r){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.createConnection({database:t,encrypted:a,mode:s,version:n,readonly:r});const i=new Ze(t,r,this.sqlite),l=r?`RO_${t}`:`RW_${t}`;return this._connectionDict.set(l,i),Promise.resolve(i)}catch(i){return Promise.reject(i)}}async closeConnection(t,a){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.closeConnection({database:t,readonly:a});const s=a?`RO_${t}`:`RW_${t}`;return this._connectionDict.delete(s),Promise.resolve()}catch(s){return Promise.reject(s)}}async isConnection(t,a){const s={};t.endsWith(".db")&&(t=t.slice(0,-3));const n=a?`RO_${t}`:`RW_${t}`;return s.result=this._connectionDict.has(n),Promise.resolve(s)}async retrieveConnection(t,a){t.endsWith(".db")&&(t=t.slice(0,-3));const s=a?`RO_${t}`:`RW_${t}`;if(this._connectionDict.has(s)){const n=this._connectionDict.get(s);return typeof n<"u"?Promise.resolve(n):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async getNCDatabasePath(t,a){try{const s=await this.sqlite.getNCDatabasePath({path:t,database:a});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async createNCConnection(t,a){try{await this.sqlite.createNCConnection({databasePath:t,version:a});const s=new Ze(t,!0,this.sqlite),n=`RO_${t})`;return this._connectionDict.set(n,s),Promise.resolve(s)}catch(s){return Promise.reject(s)}}async closeNCConnection(t){try{await this.sqlite.closeNCConnection({databasePath:t});const a=`RO_${t})`;return this._connectionDict.delete(a),Promise.resolve()}catch(a){return Promise.reject(a)}}async isNCConnection(t){const a={},s=`RO_${t})`;return a.result=this._connectionDict.has(s),Promise.resolve(a)}async retrieveNCConnection(t){if(this._connectionDict.has(t)){const a=`RO_${t})`,s=this._connectionDict.get(a);return typeof s<"u"?Promise.resolve(s):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async isNCDatabase(t){try{const a=await this.sqlite.isNCDatabase({databasePath:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async retrieveAllConnections(){return this._connectionDict}async closeAllConnections(){const t=new Map;try{for(const a of this._connectionDict.keys()){const s=a.substring(3),n=a.substring(0,3)==="RO_";await this.sqlite.closeConnection({database:s,readonly:n}),t.set(a,null)}for(const a of t.keys())this._connectionDict.delete(a);return Promise.resolve()}catch(a){return Promise.reject(a)}}async checkConnectionsConsistency(){try{const t=[...this._connectionDict.keys()],a=[],s=[];for(const r of t)a.push(r.substring(0,2)),s.push(r.substring(3));const n=await this.sqlite.checkConnectionsConsistency({dbNames:s,openModes:a});return n.result||(this._connectionDict=new Map),Promise.resolve(n)}catch(t){return this._connectionDict=new Map,Promise.reject(t)}}async importFromJson(t){try{const a=await this.sqlite.importFromJson({jsonstring:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isJsonValid(t){try{const a=await this.sqlite.isJsonValid({jsonstring:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async copyFromAssets(t){const a=t??!0;try{return await this.sqlite.copyFromAssets({overwrite:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async getFromHTTPRequest(t,a){const s=a??!0;try{return await this.sqlite.getFromHTTPRequest({url:t,overwrite:s}),Promise.resolve()}catch(n){return Promise.reject(n)}}async isDatabaseEncrypted(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const a=await this.sqlite.isDatabaseEncrypted({database:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isInConfigEncryption(){try{const t=await this.sqlite.isInConfigEncryption();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isInConfigBiometricAuth(){try{const t=await this.sqlite.isInConfigBiometricAuth();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isDatabase(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const a=await this.sqlite.isDatabase({database:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async getDatabaseList(){try{const a=(await this.sqlite.getDatabaseList()).values;a.sort();const s={values:a};return Promise.resolve(s)}catch(t){return Promise.reject(t)}}async getMigratableDbList(t){const a=t||"default";try{const s=await this.sqlite.getMigratableDbList({folderPath:a});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async addSQLiteSuffix(t,a){const s=t||"default",n=a||[];try{const r=await this.sqlite.addSQLiteSuffix({folderPath:s,dbNameList:n});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async deleteOldDatabases(t,a){const s=t||"default",n=a||[];try{const r=await this.sqlite.deleteOldDatabases({folderPath:s,dbNameList:n});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async moveDatabasesAndAddSuffix(t,a){const s=t||"default",n=a||[];return this.sqlite.moveDatabasesAndAddSuffix({folderPath:s,dbNameList:n})}}class Ze{constructor(t,a,s){this.dbName=t,this.readonly=a,this.sqlite=s}getConnectionDBName(){return this.dbName}getConnectionReadOnly(){return this.readonly}async open(){try{return await this.sqlite.open({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async close(){try{return await this.sqlite.close({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async beginTransaction(){try{const t=await this.sqlite.beginTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async commitTransaction(){try{const t=await this.sqlite.commitTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async rollbackTransaction(){try{const t=await this.sqlite.rollbackTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTransactionActive(){try{const t=await this.sqlite.isTransactionActive({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async loadExtension(t){try{return await this.sqlite.loadExtension({database:this.dbName,path:t,readonly:this.readonly}),Promise.resolve()}catch(a){return Promise.reject(a)}}async enableLoadExtension(t){try{return await this.sqlite.enableLoadExtension({database:this.dbName,toggle:t,readonly:this.readonly}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getUrl(){try{const t=await this.sqlite.getUrl({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getVersion(){try{const t=await this.sqlite.getVersion({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getTableList(){try{const t=await this.sqlite.getTableList({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async execute(t,a=!0,s=!0){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const n=await this.sqlite.execute({database:this.dbName,statements:t,transaction:a,readonly:!1,isSQL92:s});return Promise.resolve(n)}}catch(n){return Promise.reject(n)}}async query(t,a,s=!0){let n;try{return a&&a.length>0?n=await this.sqlite.query({database:this.dbName,statement:t,values:a,readonly:this.readonly,isSQL92:!0}):n=await this.sqlite.query({database:this.dbName,statement:t,values:[],readonly:this.readonly,isSQL92:s}),n=await this.reorderRows(n),Promise.resolve(n)}catch(r){return Promise.reject(r)}}async run(t,a,s=!0,n="no",r=!0){let i;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(a&&a.length>0?i=await this.sqlite.run({database:this.dbName,statement:t,values:a,transaction:s,readonly:!1,returnMode:n,isSQL92:!0}):i=await this.sqlite.run({database:this.dbName,statement:t,values:[],transaction:s,readonly:!1,returnMode:n,isSQL92:r}),i.changes=await this.reorderRows(i.changes),Promise.resolve(i))}catch(l){return Promise.reject(l)}}async executeSet(t,a=!0,s="no",n=!0){let r;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(r=await this.sqlite.executeSet({database:this.dbName,set:t,transaction:a,readonly:!1,returnMode:s,isSQL92:n}),r.changes=await this.reorderRows(r.changes),Promise.resolve(r))}catch(i){return Promise.reject(i)}}async isExists(){try{const t=await this.sqlite.isDBExists({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTable(t){try{const a=await this.sqlite.isTableExists({database:this.dbName,table:t,readonly:this.readonly});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isDBOpen(){try{const t=await this.sqlite.isDBOpen({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async delete(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteDatabase({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async createSyncTable(){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const t=await this.sqlite.createSyncTable({database:this.dbName,readonly:!1});return Promise.resolve(t)}}catch(t){return Promise.reject(t)}}async setSyncDate(t){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.setSyncDate({database:this.dbName,syncdate:t,readonly:!1}),Promise.resolve())}catch(a){return Promise.reject(a)}}async getSyncDate(){try{const t=await this.sqlite.getSyncDate({database:this.dbName,readonly:this.readonly});let a="";return t.syncDate>0&&(a=new Date(t.syncDate*1e3).toISOString()),Promise.resolve(a)}catch(t){return Promise.reject(t)}}async exportToJson(t,a=!1){try{const s=await this.sqlite.exportToJson({database:this.dbName,jsonexportmode:t,readonly:this.readonly,encrypted:a});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async deleteExportedRows(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteExportedRows({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async executeTransaction(t,a=!0){let s=0,n=!1;if(this.readonly)return Promise.reject("not allowed in read-only mode");if(await this.sqlite.beginTransaction({database:this.dbName}),n=await this.sqlite.isTransactionActive({database:this.dbName}),!n)return Promise.reject("After Begin Transaction, no transaction active");try{for(const l of t){if(typeof l!="object"||!("statement"in l))throw new Error("Error a task.statement must be provided");if("values"in l&&l.values&&l.values.length>0){const u=l.statement.toUpperCase().includes("RETURNING")?"all":"no",o=await this.sqlite.run({database:this.dbName,statement:l.statement,values:l.values,transaction:!1,readonly:!1,returnMode:u,isSQL92:a});if(o.changes.changes<0)throw new Error("Error in transaction method run ");s+=o.changes.changes}else{const u=await this.sqlite.execute({database:this.dbName,statements:l.statement,transaction:!1,readonly:!1});if(u.changes.changes<0)throw new Error("Error in transaction method execute ");s+=u.changes.changes}}const r=await this.sqlite.commitTransaction({database:this.dbName});s+=r.changes.changes;const i={changes:{changes:s}};return Promise.resolve(i)}catch(r){const i=r.message?r.message:r;return await this.sqlite.rollbackTransaction({database:this.dbName}),Promise.reject(i)}}async reorderRows(t){const a=t;if(t?.values&&typeof t.values[0]=="object"&&Object.keys(t.values[0]).includes("ios_columns")){const s=t.values[0].ios_columns,n=[];for(let r=1;r<t.values.length;r++){const i=t.values[r],l={};for(const u of s)l[u]=i[u];n.push(l)}a.values=n}return Promise.resolve(a)}}const Jt=re("CapacitorSQLite",{web:()=>Ue(()=>import("./web-qsMKPnGr.js"),[]).then(e=>new e.CapacitorSQLiteWeb),electron:()=>window.CapacitorCustomPlatform.plugins.CapacitorSQLite});function zt(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}const Zt="laba101_offline",Ne="fresh_start_reset_v1",ea=new Qt(Jt);let be=null;const K=[{id:1,name:"Laba101 Admin",email:"admin@laba101.test",password:"password",role:"admin",branch:"Main Store"},{id:2,name:"Gensan Branch Staff",email:"staff@laba101.gensan",password:"password",role:"staff",branch:"Gensan Branch"}],Ae=[],Y=[V(1,"Drop-off","P185. Includes wash, dry, and fold.","Drop-Off","order",185,8,40,["Wash","Dry","Fold"],0,24),V(2,"Full Service","P200. Wash, Fabcon, detergent, dry, and fold.","Full Service","order",200,8,40,["Wash","Dry","Fold","Detergent","Fabcon"],0,24),V(3,"Self Service Wash","P60. Self-service wash (max 8kg per load).","Self Service","order",60,8,null,["Wash"],0,1),V(4,"Self Service Dry","P70. Self-service dry (40 mins).","Self Service","order",70,8,40,["Dry"],0,1),V(6,"Dry 10 mins","Additional drying time (10 mins).","Add-on","addon",30,8,10,["Dry"],0,1),V(7,"Dry 20 mins","Additional drying time (20 mins).","Add-on","addon",50,8,20,["Dry"],0,1),V(8,"Dry 40 mins","Additional drying time (40 mins).","Add-on","addon",70,8,40,["Dry"],0,1),V(9,"Additional Zonrox","Extra Zonrox bleach add-on per load.","Add-on","addon",25,0,null,["Zonrox"],0,0),V(10,"Additional Fabcon","Extra Fabcon fabric conditioner add-on per load.","Add-on","addon",25,0,null,["Fabcon"],0,0)],te=[{id:1,name:"Regular Clothes",maxKg:8,additionalFee:0,isActive:1},{id:2,name:"Comforter",maxKg:4,additionalFee:0,isActive:1},{id:3,name:"Thin Blankets",maxKg:6,additionalFee:0,isActive:1},{id:4,name:"Bedsheets",maxKg:6,additionalFee:0,isActive:1},{id:5,name:"Bath Towels",maxKg:6,additionalFee:0,isActive:1},{id:6,name:"Curtains",maxKg:6,additionalFee:0,isActive:1}];function et(e,t){const a=L(e,[]),s=new Map(a.map(r=>[r.id,r])),n=t.map(r=>{const i=s.get(r.id);return i?{...r,...i,isActive:i.isActive??r.isActive}:r});(a.length!==n.length||n.some((r,i)=>r.id!==a[i]?.id||JSON.stringify(r)!==JSON.stringify(a[i])))&&w(e,n)}async function ta(){et("services",Y),et("item_categories",te)}async function Ce(e){for(const t of Y)((await e.query("SELECT id FROM laundry_services WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive,t.id]):await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive]);for(const t of te)((await e.query("SELECT id FROM item_categories WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.maxKg,t.additionalFee,t.isActive,t.id]):await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[t.id,t.name,t.maxKg,t.additionalFee,t.isActive])}const ae=[],le=[],ne=[],de=[],ue=[],Q=[...[1,2,3,4].map(e=>({id:e,machineName:`Washer ${e}`,machineType:"washer",status:"available",branch:"Main Store"})),...[1,2,3,4].map(e=>({id:e+4,machineName:`Dryer ${e}`,machineType:"dryer",status:"available",branch:"Main Store"}))],me=[{key:"branch",value:"Main Store"},{key:"fold_rate",value:"5"},{key:"report_email",value:"admin@laba101.test"}];function V(e,t,a,s,n,r,i,l,u,o,d){return{id:e,name:t,description:a,category:s,serviceType:n,price:r,maxKg:i,dryingMinutes:l,includes:u,additionalCharge:o,turnaroundHours:d,isActive:1}}function j(e){return`laba101-mobile-${e}`}function L(e,t){const a=localStorage.getItem(j(e));if(!a)return structuredClone(t);try{return JSON.parse(a)}catch{return structuredClone(t)}}function w(e,t){localStorage.setItem(j(e),JSON.stringify(t))}function W(e){return e.reduce((t,a)=>Math.max(t,a.id),0)+1}function se(){return new Date().toISOString()}function Ie(e=new Date){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${s}`}function aa(){return Ie().slice(2).replaceAll("-","")}function z(e,t){if(!e)return t;try{return JSON.parse(e)}catch{return t}}async function $(){return be||(be=await ea.createConnection(Zt,!1,"no-encryption",1,!1),await be.open()),be}async function I(e,t,a,s){((await e.query(`PRAGMA table_info(${t})`)).values??[]).some(i=>i.name===a)||await e.execute(`ALTER TABLE ${t} ADD COLUMN ${a} ${s}`)}function sa(){const e=L("staff",K),t=new Map(e.map(s=>[s.id,s]));let a=!1;for(const s of K){const n=t.get(s.id);if(!n){t.set(s.id,{...s,isActive:1}),a=!0;continue}const r={...n,name:s.name,email:s.email,password:s.password,role:s.role,branch:s.branch,isActive:1};JSON.stringify(r)!==JSON.stringify(n)&&(t.set(s.id,r),a=!0)}a&&w("staff",Array.from(t.values()).sort((s,n)=>s.id-n.id))}async function na(){localStorage.getItem(j(Ne))||(w("staff",K),w("customers",[]),w("orders",[]),w("payments",[]),w("fold_logs",[]),w("expenses",[]),w("sales",[]),localStorage.getItem(j("services"))||w("services",Y),localStorage.getItem(j("item_categories"))||w("item_categories",te),localStorage.getItem(j("machines"))||w("machines",Q),localStorage.getItem(j("subcleanings"))||w("subcleanings",[]),localStorage.getItem(j("settings"))||w("settings",me),localStorage.removeItem("laba101-mobile-session"),w(Ne,!0))}async function mt(e){for(const t of K){if(((await e.query("SELECT id FROM staff WHERE id = ?",[t.id])).values??[]).length>0){await e.run("UPDATE staff SET name = ?, email = ?, password = ?, role = ?, branch = ?, isActive = 1 WHERE id = ?",[t.name,t.email,t.password,t.role,t.branch,t.id]);continue}await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.email,t.password,t.role,t.branch,1])}}async function ra(e){if(!(((await e.query("SELECT COUNT(*) as count FROM machines")).values?.[0]?.count??0)>0))for(const a of Q)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[a.id,a.machineName,a.machineType,a.status,a.branch])}async function ia(e){for(const t of me)await e.run("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)",[t.key,t.value])}async function vt(e){for(const t of Y)((await e.query("SELECT id FROM laundry_services WHERE id = ?",[t.id])).values??[]).length>0||await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive]);for(const t of te)((await e.query("SELECT id FROM item_categories WHERE id = ?",[t.id])).values??[]).length>0||await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[t.id,t.name,t.maxKg,t.additionalFee,t.isActive])}async function oa(e){((await e.query("SELECT value FROM settings WHERE key = ?",[Ne])).values??[]).length>0||(await e.execute(`
    DELETE FROM payments;
    DELETE FROM orders;
    DELETE FROM customers;
    DELETE FROM fold_logs;
    DELETE FROM disbursement_expenses;
    DELETE FROM daily_sales;
    DELETE FROM revolving_history;
    DELETE FROM staff WHERE id NOT IN (1, 2);
  `),await mt(e),await vt(e),await ra(e),await ia(e),await e.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",[Ne,se()]),localStorage.removeItem("laba101-mobile-session"))}async function ca(){if(!C.isNativePlatform()){await na(),!localStorage.getItem(j("seeded_v4"))&&!localStorage.getItem(j("services"))&&!localStorage.getItem(j("staff"))&&(w("staff",K),w("customers",Ae),w("services",Y),w("item_categories",te),w("orders",ae),w("payments",le),w("fold_logs",[]),w("expenses",ne),w("sales",de),w("revolving_history",ue),w("machines",Q),w("subcleanings",[]),w("settings",me),w("seeded_v4",!0)),await ta(),sa(),localStorage.getItem(j("seeded_v4"))||w("seeded_v4",!0);return}const e=await $();await e.execute(`
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
    CREATE TABLE IF NOT EXISTS disbursement_expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, expenseDate TEXT NOT NULL, number TEXT NOT NULL, disbursementType TEXT NOT NULL DEFAULT 'daily', name TEXT NOT NULL, category TEXT NOT NULL, description TEXT, amount REAL NOT NULL);
    CREATE TABLE IF NOT EXISTS daily_sales (id INTEGER PRIMARY KEY AUTOINCREMENT, saleDate TEXT NOT NULL, saleNumber TEXT, cashAmount REAL NOT NULL, gcashAmount REAL NOT NULL, totalAmount REAL NOT NULL, notes TEXT);
    CREATE TABLE IF NOT EXISTS revolving_history (id INTEGER PRIMARY KEY AUTOINCREMENT, revolvingNumber TEXT NOT NULL, name TEXT NOT NULL, amount REAL NOT NULL, category TEXT NOT NULL, description TEXT, type TEXT NOT NULL, createdAt TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS machines (id INTEGER PRIMARY KEY AUTOINCREMENT, machineName TEXT NOT NULL, machineType TEXT NOT NULL, status TEXT NOT NULL, branch TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS subcleanings (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL, machineIds TEXT NOT NULL, machineNames TEXT NOT NULL, cleaningStatus TEXT NOT NULL, notes TEXT, branch TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY NOT NULL, value TEXT NOT NULL);
  `),await I(e,"staff","email","TEXT"),await I(e,"staff","password","TEXT"),await I(e,"staff","role","TEXT"),await I(e,"staff","isActive","INTEGER NOT NULL DEFAULT 1"),await e.run('UPDATE staff SET password = ? WHERE password IS NULL OR password = ""',["password"]),await e.run('UPDATE staff SET role = ? WHERE role IS NULL OR role = ""',["staff"]),await I(e,"orders","customerId","INTEGER NOT NULL DEFAULT 0"),await I(e,"orders","phone","TEXT"),await I(e,"orders","serviceId","INTEGER NOT NULL DEFAULT 0"),await I(e,"orders","serviceLines","TEXT"),await I(e,"orders","itemCategoryId","INTEGER NOT NULL DEFAULT 0"),await I(e,"orders","itemCategory",'TEXT NOT NULL DEFAULT "Regular Clothes"'),await I(e,"orders","workflowCompleted","TEXT"),await I(e,"orders","weightKg","REAL NOT NULL DEFAULT 0"),await I(e,"orders","price","REAL NOT NULL DEFAULT 0"),await I(e,"orders","additionalCharge","REAL NOT NULL DEFAULT 0"),await I(e,"orders","extraServiceAmount","REAL NOT NULL DEFAULT 0"),await I(e,"orders","totalAmount","REAL NOT NULL DEFAULT 0"),await I(e,"orders","paidAmount","REAL NOT NULL DEFAULT 0"),await I(e,"orders","extras","TEXT"),await I(e,"orders","notes","TEXT"),await I(e,"orders","dueAt","TEXT"),await I(e,"orders","createdAt",'TEXT NOT NULL DEFAULT ""'),await I(e,"daily_sales","saleNumber","TEXT"),await I(e,"daily_sales","status","TEXT"),await I(e,"daily_sales","endorsedTo","TEXT"),await I(e,"daily_sales","statusUpdatedAt","TEXT"),await I(e,"disbursement_expenses","disbursementType",'TEXT NOT NULL DEFAULT "daily"');const a=((await e.query("SELECT COUNT(*) as count FROM staff")).values?.[0]?.count??0)===0;if(a){for(const s of K)await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[s.id,s.name,s.email,s.password,s.role,s.branch,1]);for(const s of Ae)await e.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[s.id,s.name,s.phone,s.address]);for(const s of Y)await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[s.id,s.name,s.description,s.category,s.serviceType,s.price,s.maxKg,s.dryingMinutes,JSON.stringify(s.includes),s.additionalCharge,s.turnaroundHours,s.isActive]);for(const s of te)await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[s.id,s.name,s.maxKg,s.additionalFee,s.isActive]);for(const s of ae)await pt(e,s);for(const s of le)await e.run("INSERT INTO payments (id, orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?, ?)",[s.id,s.orderId,s.amount,s.method,s.reference,s.receivedAt,s.branch]);for(const s of ne)await e.run("INSERT INTO disbursement_expenses (id, expenseDate, number, disbursementType, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[s.id,s.expenseDate,s.number,s.disbursementType??"daily",s.name,s.category,s.description,s.amount]);for(const s of de)await e.run("INSERT INTO daily_sales (id, saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?, ?)",[s.id,s.saleDate,s.saleNumber,s.cashAmount,s.gcashAmount,s.totalAmount,s.notes]);for(const s of ue)await e.run("INSERT INTO revolving_history (id, revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[s.id,s.revolvingNumber,s.name,s.amount,s.category,s.description,s.type,s.createdAt]);for(const s of Q)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[s.id,s.machineName,s.machineType,s.status,s.branch]);for(const s of me)await e.run("INSERT INTO settings (key, value) VALUES (?, ?)",[s.key,s.value]);await e.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",["fresh_install_defaults",se()])}await Ce(e),await mt(e),a||await vt(e),await oa(e)}async function pt(e,t){await e.run("INSERT INTO orders (id, ticket, customerId, customer, phone, serviceId, service, serviceLines, itemCategoryId, itemCategory, branch, status, workflowCompleted, weightKg, price, additionalCharge, extraServiceAmount, totalAmount, paidAmount, extras, notes, foldedBy, dueAt, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.ticket,t.customerId,t.customer,t.phone,t.serviceId,t.service,JSON.stringify(t.serviceLines??[]),t.itemCategoryId,t.itemCategory,t.branch,t.status,JSON.stringify(t.workflowCompleted),t.weightKg,t.price,t.additionalCharge,t.extraServiceAmount,t.totalAmount,t.paidAmount,JSON.stringify(t.extras),t.notes,t.foldedBy,t.dueAt,t.createdAt])}function la(e){const t=Number(e.paidAmount??0),a=Number(e.totalAmount??0),s=Number(e.foldedBy),n=z(e.serviceLines,[]),r=Number(e.serviceId),i=String(e.service),l=Number(e.price);return{id:Number(e.id),ticket:String(e.ticket),customerId:Number(e.customerId),customer:String(e.customer),phone:e.phone?String(e.phone):null,serviceId:r,service:i,serviceLines:n.length?n:[{id:r,name:i,price:l,quantity:1,total:l}],itemCategoryId:Number(e.itemCategoryId),itemCategory:String(e.itemCategory),branch:String(e.branch),status:String(e.status),workflowCompleted:z(e.workflowCompleted,[]),weightKg:Number(e.weightKg),price:l,additionalCharge:Number(e.additionalCharge),extraServiceAmount:Number(e.extraServiceAmount),totalAmount:a,paidAmount:t,balance:Number((a-t).toFixed(2)),extras:z(e.extras,[]),notes:e.notes?String(e.notes):null,foldedBy:Number.isFinite(s)&&s>0?s:null,foldedByName:e.foldedByName?String(e.foldedByName):null,dueAt:String(e.dueAt),createdAt:String(e.createdAt)}}async function da(){await ca()}async function pe(){return(await Me()).find(t=>t.key==="branch")?.value??"Main Store"}async function ua(){const e=await Me();return Number(e.find(t=>t.key==="fold_rate")?.value??"5")}async function yt(e){return(await Me()).find(a=>a.key===e)?.value}async function Me(){return C.isNativePlatform()?(await(await $()).query("SELECT key, value FROM settings ORDER BY key")).values??[]:L("settings",me)}async function we(e,t){if(!C.isNativePlatform()){const s=L("settings",me).filter(n=>n.key!==e);s.push({key:e,value:t}),w("settings",s);return}await(await $()).run("REPLACE INTO settings (key, value) VALUES (?, ?)",[e,t])}async function ma(e){return C.isNativePlatform()?(await(await $()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff WHERE branch = ? ORDER BY name ASC',[e])).values??[]:L("staff",K).filter(s=>s.branch===e)}async function ft(){return C.isNativePlatform()?(await(await $()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff ORDER BY name ASC')).values??[]:L("staff",K)}async function ht(e,t){const a=e.trim().toLowerCase();return(await ft()).find(n=>n.email.toLowerCase()===a&&n.password===t&&n.isActive!==0)??null}async function va(e){if(!C.isNativePlatform()){const a=L("staff",K);a.unshift({id:W(a),...e,isActive:1}),w("staff",a);return}await(await $()).run("INSERT INTO staff (name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?)",[e.name,e.email,e.password,e.role,e.branch,1])}async function tt(e,t){if(!C.isNativePlatform()){const r=L("staff",K),i=r.find(l=>l.id===e);i&&(Object.assign(i,t),w("staff",r));return}const a=await $(),s=[],n=[];for(const[r,i]of Object.entries(t))r!=="id"&&(s.push(`${r} = ?`),n.push(i));s.length&&(n.push(e),await a.run(`UPDATE staff SET ${s.join(", ")} WHERE id = ?`,n))}async function pa(){return C.isNativePlatform()?(await(await $()).query("SELECT id, name, phone, address FROM customers ORDER BY name ASC")).values??[]:L("customers",Ae).sort((a,s)=>a.name.localeCompare(s.name))}async function ya(e){if(!C.isNativePlatform()){const n=L("customers",Ae),r=e.id?n.find(l=>l.id===e.id):n.find(l=>l.name.toLowerCase()===e.name.toLowerCase()&&(e.phone?l.phone===e.phone:!0));if(r)return r.name=e.name,r.phone=e.phone??r.phone,r.address=e.address??r.address,w("customers",n),r;const i={id:W(n),name:e.name,phone:e.phone??null,address:e.address??null};return n.push(i),w("customers",n),i}const t=await $();if(e.id)return await t.run("UPDATE customers SET name = ?, phone = ?, address = ? WHERE id = ?",[e.name,e.phone??null,e.address??null,e.id]),{id:e.id,name:e.name,phone:e.phone??null,address:e.address??null};const a=await t.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM customers"),s=Number((a.values?.[0]).id);return await t.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[s,e.name,e.phone??null,e.address??null]),{id:s,name:e.name,phone:e.phone??null,address:e.address??null}}async function _e(e){if(!C.isNativePlatform())return L("services",Y).filter(s=>!0);const t=await $(),a=await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[]);return(a.values??[]).length===0?(await Ce(t),((await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[])).values??[]).map(n=>({...n,includes:z(n.includes,[])}))):(a.values??[]).map(s=>({...s,includes:z(s.includes,[])}))}async function fa(){if(!C.isNativePlatform())return L("services",Y);const e=await $(),t=await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC");return(t.values??[]).length===0?(await Ce(e),((await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC")).values??[]).map(s=>({...s,includes:z(s.includes,[])}))):(t.values??[]).map(a=>({...a,includes:z(a.includes,[])}))}async function at(e){if(!C.isNativePlatform()){const a=L("services",Y),s=e.id?a.find(n=>n.id===e.id):null;s?Object.assign(s,e):a.unshift({...e,id:W(a)}),w("services",a);return}const t=await $();e.id?await t.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = ? WHERE id = ?",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive,e.id]):await t.run("INSERT INTO laundry_services (name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive])}async function gt(){if(!C.isNativePlatform())return L("item_categories",te).filter(a=>a.isActive);const e=await $(),t=await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC");return(t.values??[]).length===0?(await Ce(e),(await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC")).values??[]):t.values??[]}async function ha(e){if(!C.isNativePlatform()){const a=L("item_categories",te),s=e.id?a.find(n=>n.id===e.id):null;s?Object.assign(s,e):a.unshift({...e,id:W(a)}),w("item_categories",a);return}const t=await $();e.id?await t.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = ? WHERE id = ?",[e.name,e.maxKg,e.additionalFee,e.isActive,e.id]):await t.run("INSERT INTO item_categories (name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?)",[e.name,e.maxKg,e.additionalFee,e.isActive])}function qe(e,t,a,s){const n=(Array.isArray(e)?e:[e]).map(p=>{const g=Math.max(0,Number(p.quantity??1)),b=Number(p.price);return{id:p.id,name:p.name,price:b,quantity:g,total:Number((b*g).toFixed(2))}}).filter(p=>p.quantity>0),r=Number(t.maxKg),i=0,l=0,u=s.map(p=>{const g=Math.max(0,Number(p.quantity??1)),b=Number(p.price);return{id:p.id,name:zt(p.name),price:b,quantity:g,total:Number((b*g).toFixed(2))}}).filter(p=>p.quantity>0),o=n.reduce((p,g)=>p+g.total,0),d=u.reduce((p,g)=>p+g.total,0),m=Number((o+l+d).toFixed(2));return{price:Number(o.toFixed(2)),additionalCharge:Number(l.toFixed(2)),extraServiceAmount:Number(d.toFixed(2)),totalAmount:m,allowedKg:r,extraKg:Number(i.toFixed(2)),warning:null,serviceLines:n,extras:u}}function bt(e,t){const a=e.serviceLines?.length?e.serviceLines.map(i=>i.id):[e.serviceId],s=t.filter(i=>a.includes(i.id)),n=Array.from(new Set(s.flatMap(i=>i.includes??[]))),r=[{key:"received",label:"Received"}];return n.includes("Wash")&&r.push({key:"wash",label:"Wash"}),e.extras.length&&r.push({key:"extras",label:"Extra services"}),(n.includes("Dry")||s.some(i=>(i.dryingMinutes??0)>0))&&r.push({key:"dry",label:"Dry"}),n.includes("Fold")&&r.push({key:"fold",label:"Fold"}),r.push({key:"ready",label:"Ready"},{key:"claimed",label:"Claimed"}),r}function ga(e){return e.includes("claimed")?"claimed":e.includes("ready")?"ready":e.includes("dry")?"drying":e.includes("extras")||e.includes("wash")?"washing":"received"}async function ye(e){return C.isNativePlatform()?((await(await $()).query("SELECT o.*, s.name as foldedByName FROM orders o LEFT JOIN staff s ON s.id = o.foldedBy WHERE o.branch = ? ORDER BY o.id DESC",[e])).values??[]).map(s=>la(s)):L("orders",ae).filter(s=>s.branch===e).map(s=>({...s,serviceLines:s.serviceLines??[{id:s.serviceId,name:s.service,price:Number(s.price),quantity:1,total:Number(s.price)}],balance:Number((s.totalAmount-s.paidAmount).toFixed(2))}))}async function ba(e){const[t,a]=await Promise.all([_e(),gt()]),s=e.serviceQuantities??(e.serviceId?{[e.serviceId]:1}:{}),n=t.filter(f=>f.serviceType==="order"&&Number(s[f.id]??0)>0).map(f=>({...f,quantity:Number(s[f.id]??0)})),r=n[0],i=a.find(f=>f.id===e.itemCategoryId)??a.find(f=>f.name.toLowerCase()===(r?.category??"").toLowerCase())??a.find(f=>f.name==="Regular Clothes")??a[0];if(!n.length||!r||!i)throw new Error("Please select at least one service.");const l=e.addonQuantities??Object.fromEntries((e.addonIds??[]).map(f=>[f,1])),u=t.filter(f=>f.serviceType==="addon"&&Number(l[f.id]??0)>0).map(f=>({...f,quantity:Number(l[f.id]??0)})),o=e.weightKg??Math.max(1,Number(i.maxKg||r.maxKg||1)),d=qe(n,i,o,u),m=await ya({id:e.customerId||void 0,name:e.customerName,phone:e.customerPhone??null}),p=Math.max(0,e.paidAmount),g=Math.min(d.totalAmount,p),b={ticket:await Ea(),customerId:m.id,customer:m.name,phone:m.phone,serviceId:r.id,service:d.serviceLines.map(f=>`${f.name} x${f.quantity}`).join(", "),serviceLines:d.serviceLines,itemCategoryId:i.id,itemCategory:i.name,branch:e.branch,status:"received",workflowCompleted:["received"],weightKg:o,price:d.price,additionalCharge:d.additionalCharge,extraServiceAmount:d.extraServiceAmount,totalAmount:d.totalAmount,paidAmount:g,balance:Number((d.totalAmount-g).toFixed(2)),extras:d.extras,notes:e.notes||null,foldedBy:null,foldedByName:null,dueAt:new Date(Date.now()+Math.max(...n.map(f=>f.turnaroundHours))*60*60*1e3).toISOString(),createdAt:se()};if(!C.isNativePlatform()){const f=L("orders",ae),A={...b,id:W(f)};return f.unshift(A),w("orders",f),p>0&&await Et(A.id,{amount:p,method:e.paymentMethod,reference:e.paymentReference??null}),A}const E=await $(),y=await E.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM orders"),N={...b,id:Number((y.values?.[0]).id)};return await pt(E,N),p>0&&await E.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[N.id,p,e.paymentMethod,e.paymentReference??null,se(),e.branch]),N}async function Ea(){const e=`LB${aa()}`,t=await pe(),s=(await ye(t)).filter(r=>r.ticket.startsWith(e)).sort((r,i)=>i.ticket.localeCompare(r.ticket))[0],n=s?Number(s.ticket.slice(-3))+1:1;return`${e}-${String(n).padStart(3,"0")}`}async function Sa(e,t){const a=await pe(),[s,n]=await Promise.all([ye(a),_e()]),r=s.find(o=>o.id===e);if(!r)return;const l=bt(r,n).map(o=>o.key).find(o=>!r.workflowCompleted.includes(o));if(!l)return;if(r.workflowCompleted=[...r.workflowCompleted,l],r.status=ga(r.workflowCompleted),l==="fold"&&t&&(r.foldedBy=t),!C.isNativePlatform()){const o=L("orders",ae),d=o.find(m=>m.id===r.id);d&&Object.assign(d,r),w("orders",o);return}await(await $()).run("UPDATE orders SET workflowCompleted = ?, status = ?, foldedBy = ? WHERE id = ?",[JSON.stringify(r.workflowCompleted),r.status,r.foldedBy,r.id])}async function Et(e,t){const a=await pe();if(!(await ye(a)).find(l=>l.id===e))return;const r=Math.max(0,t.amount);if(r<=0)return;if(!C.isNativePlatform()){const l=L("payments",le);l.unshift({id:W(l),orderId:e,amount:r,method:t.method,reference:t.reference??null,receivedAt:se(),branch:a}),w("payments",l);const u=L("orders",ae),o=u.find(d=>d.id===e);o&&(o.paidAmount=Math.min(o.totalAmount,Number((o.paidAmount+r).toFixed(2)))),w("orders",u);return}const i=await $();await i.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[e,r,t.method,t.reference??null,se(),a]),await i.run("UPDATE orders SET paidAmount = MIN(totalAmount, paidAmount + ?) WHERE id = ?",[r,e])}async function wa(e){return C.isNativePlatform()?(await(await $()).query("SELECT id, orderId, amount, method, reference, receivedAt, branch FROM payments  ORDER BY receivedAt DESC",[])).values??[]:L("payments",le).filter(s=>!0)}async function Ta(e){const t=await pe(),s=(await ye(t)).find(r=>r.id===e);if(!s)return;if(s.paidAmount>0)throw new Error("Cancel is only allowed for unpaid orders. Use Delete (admin) to refund paid orders.");if(!C.isNativePlatform()){const r=L("orders",ae),i=L("payments",le),l=L("fold_logs",[]),u=r.filter(m=>m.id!==e),o=i.filter(m=>m.orderId!==e),d=l.filter(m=>m.orderTicket!==s.ticket);w("orders",u),w("payments",o),w("fold_logs",d);return}const n=await $();await n.run("DELETE FROM payments WHERE orderId = ?",[e]),await n.run("DELETE FROM fold_logs WHERE orderTicket = ?",[s.ticket]),await n.run("DELETE FROM orders WHERE id = ?",[e])}async function Na(e){const t=await pe(),s=(await ye(t)).find(r=>r.id===e);if(!s)return;if(s.paidAmount<=0)throw new Error("Delete (refund) is only allowed for paid orders.");if(!C.isNativePlatform()){const r=L("orders",ae),i=L("payments",le),l=L("fold_logs",[]),u=r.filter(m=>m.id!==e),o=i.filter(m=>m.orderId!==e),d=l.filter(m=>m.orderTicket!==s.ticket);w("orders",u),w("payments",o),w("fold_logs",d);return}const n=await $();await n.run("DELETE FROM payments WHERE orderId = ?",[e]),await n.run("DELETE FROM fold_logs WHERE orderTicket = ?",[s.ticket]),await n.run("DELETE FROM orders WHERE id = ?",[e])}async function Aa(){return C.isNativePlatform()?(await(await $()).query("SELECT id, orderTicket, staffName, foldCount, rate, total, createdAt FROM fold_logs ORDER BY id DESC")).values??[]:L("fold_logs",[])}async function La(e){const t=Number((e.foldCount*e.rate).toFixed(2));if(!C.isNativePlatform()){const s=L("fold_logs",[]);s.unshift({id:Date.now(),...e,total:t,createdAt:se()}),w("fold_logs",s);return}await(await $()).run("INSERT INTO fold_logs (orderTicket, staffName, foldCount, rate, total, createdAt) VALUES (?, ?, ?, ?, ?, ?)",[e.orderTicket,e.staffName,e.foldCount,e.rate,t,se()])}async function Ca(){return C.isNativePlatform()?(await(await $()).query('SELECT id, expenseDate, number, COALESCE(disbursementType, "daily") as disbursementType, name, category, description, amount FROM disbursement_expenses ORDER BY expenseDate DESC, id DESC')).values??[]:L("expenses",ne).map(a=>({...a,disbursementType:a.disbursementType??"daily"}))}function De(e){const t=/^DISB-(\d+)$/i.exec(String(e??"").trim());return t?Number(t[1]):0}function st(e){const t=/^REV-(\d+)$/i.exec(String(e??"").trim());return t?Number(t[1]):0}async function $a(){let e=0;if(!C.isNativePlatform()){const n=L("expenses",ne),r=L("revolving_history",ue);for(const i of n)e=Math.max(e,De(i.number));for(const i of r)i.type==="disbursement"&&(e=Math.max(e,De(i.revolvingNumber)));return e}const t=await $(),a=await t.query("SELECT number FROM disbursement_expenses"),s=await t.query("SELECT revolvingNumber as number FROM revolving_history WHERE type = 'disbursement'");for(const n of[...a.values??[],...s.values??[]])e=Math.max(e,De(String(n.number)));return e}async function St(){const e=await $a()+1;return`DISB-${String(e).padStart(2,"0")}`}async function Ra(){let e=0;if(!C.isNativePlatform()){const s=L("revolving_history",ue);for(const n of s)n.type==="add"&&(e=Math.max(e,st(n.revolvingNumber)));return`REV-${String(e+1).padStart(2,"0")}`}const a=await(await $()).query("SELECT revolvingNumber FROM revolving_history WHERE type = 'add'");for(const s of a.values??[])e=Math.max(e,st(String(s.revolvingNumber)));return`REV-${String(e+1).padStart(2,"0")}`}async function wt(e){if(!C.isNativePlatform()){const a=L("expenses",ne),s=W(a);a.unshift({id:s,expenseDate:e.expenseDate,number:e.number,disbursementType:e.disbursementType??"daily",name:e.name,category:e.category,description:e.description||null,amount:e.amount}),w("expenses",a);return}await(await $()).run("INSERT INTO disbursement_expenses (expenseDate, number, disbursementType, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?, ?)",[e.expenseDate,e.number,e.disbursementType??"daily",e.name,e.category,e.description||null,e.amount])}async function Da(e){const t=await St();await wt({expenseDate:e.expenseDate,number:t,disbursementType:e.disbursementType??"daily",name:e.name,category:e.category,description:e.description,amount:e.amount})}async function Oa(e,t){if(!C.isNativePlatform()){const s=L("expenses",ne),n=s.find(r=>r.id===e);n&&(Object.assign(n,{expenseDate:t.expenseDate,disbursementType:t.disbursementType??"daily",name:t.name,category:t.category,description:t.description||null,amount:t.amount}),w("expenses",s));return}await(await $()).run("UPDATE disbursement_expenses SET expenseDate = ?, disbursementType = ?, name = ?, category = ?, description = ?, amount = ? WHERE id = ?",[t.expenseDate,t.disbursementType??"daily",t.name,t.category,t.description||null,t.amount,e])}async function xa(e){if(!C.isNativePlatform()){const a=L("expenses",ne);w("expenses",a.filter(s=>s.id!==e));return}await(await $()).run("DELETE FROM disbursement_expenses WHERE id = ?",[e])}async function Pa(){return C.isNativePlatform()?(await(await $()).query('SELECT id, saleDate, COALESCE(saleNumber, "") as saleNumber, cashAmount, gcashAmount, totalAmount, notes, status, endorsedTo, statusUpdatedAt FROM daily_sales ORDER BY saleDate DESC, id DESC')).values??[]:L("sales",de)}async function Ia(e){const t=Number((e.cashAmount+e.gcashAmount).toFixed(2));if(!C.isNativePlatform()){const r=L("sales",de),i=e.id?r.find(l=>l.id===e.id):r.find(l=>l.saleDate===e.saleDate);if(i)Object.assign(i,{saleDate:e.saleDate,cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null});else{const l=W(r);r.unshift({id:l,saleDate:e.saleDate,saleNumber:`SALE-${String(l).padStart(2,"0")}`,cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null})}w("sales",r);return}const a=await $(),n=(e.id?await a.query("SELECT id, saleNumber FROM daily_sales WHERE id = ?",[e.id]):await a.query("SELECT id, saleNumber FROM daily_sales WHERE saleDate = ?",[e.saleDate])).values?.[0];if(n)await a.run("UPDATE daily_sales SET saleDate = ?, cashAmount = ?, gcashAmount = ?, totalAmount = ?, notes = ? WHERE id = ?",[e.saleDate,e.cashAmount,e.gcashAmount,t,e.notes||null,n.id]);else{const r=await a.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM daily_sales"),i=Number((r.values?.[0]).id);await a.run("INSERT INTO daily_sales (saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?)",[e.saleDate,`SALE-${String(i).padStart(2,"0")}`,e.cashAmount,e.gcashAmount,t,e.notes||null])}}async function qa(e){if(!C.isNativePlatform()){const a=L("sales",de);w("sales",a.filter(s=>s.id!==e));return}await(await $()).run("DELETE FROM daily_sales WHERE id = ?",[e])}async function nt(e,t,a=null,s){if(!C.isNativePlatform()){const r=L("sales",de),i=r.find(l=>l.id===e);i&&(i.status=t,i.endorsedTo=a,i.statusUpdatedAt=s,w("sales",r));return}await(await $()).run("UPDATE daily_sales SET status = ?, endorsedTo = ?, statusUpdatedAt = ? WHERE id = ?",[t,a,s,e])}async function Fa(){return C.isNativePlatform()?(await(await $()).query("SELECT id, revolvingNumber, name, amount, category, description, type, createdAt FROM revolving_history ORDER BY createdAt DESC, id DESC")).values??[]:L("revolving_history",ue).sort((a,s)=>s.createdAt.localeCompare(a.createdAt))}async function rt(e){const t=e.type==="disbursement"?await St():await Ra();if(e.type==="disbursement"){const s=e.expenseDate??e.createdAt.slice(0,10);await wt({expenseDate:s,number:t,name:e.name,category:e.category,description:e.description??"",amount:e.amount})}if(!C.isNativePlatform()){const s=L("revolving_history",ue),n=W(s);s.unshift({id:n,revolvingNumber:t,...e}),w("revolving_history",s);return}await(await $()).run("INSERT INTO revolving_history (revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)",[t,e.name,e.amount,e.category,e.description||null,e.type,e.createdAt])}async function Tt(e){return C.isNativePlatform()?(await(await $()).query("SELECT id, machineName, machineType, status, branch FROM machines WHERE branch = ? ORDER BY machineType, machineName",[e])).values??[]:L("machines",Q).filter(s=>s.branch===e)}async function ka(e){if(!C.isNativePlatform()){const a=L("machines",Q);a.unshift({id:W(a),...e}),w("machines",a);return}await(await $()).run("INSERT INTO machines (machineName, machineType, status, branch) VALUES (?, ?, ?, ?)",[e.machineName,e.machineType,e.status,e.branch])}async function Ua(e,t){if(!C.isNativePlatform()){const s=L("machines",Q),n=s.find(r=>r.id===e);n&&(n.status=t,w("machines",s));return}await(await $()).run("UPDATE machines SET status = ? WHERE id = ?",[t,e])}async function Ma(e){return C.isNativePlatform()?((await(await $()).query("SELECT id, date, machineIds, machineNames, cleaningStatus, notes, branch FROM subcleanings WHERE branch = ? ORDER BY date DESC, id DESC",[e])).values??[]).map(s=>({...s,machineIds:z(s.machineIds,[])})):L("subcleanings",[]).filter(s=>s.branch===e)}async function _a(e){const a=(await Tt(e.branch)).filter(r=>e.machineIds.includes(r.id)).map(r=>r.machineName).join(", ");if(!C.isNativePlatform()){const r=L("subcleanings",[]);r.unshift({id:W(r),date:e.date,machineIds:e.machineIds,machineNames:a,cleaningStatus:e.cleaningStatus,notes:e.notes||null,branch:e.branch}),w("subcleanings",r);const i=L("machines",Q);i.forEach(l=>{e.machineIds.includes(l.id)&&(l.status=e.cleaningStatus==="completed"?"available":"under_cleaning")}),w("machines",i);return}const s=await $();await s.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, notes, branch) VALUES (?, ?, ?, ?, ?, ?)",[e.date,JSON.stringify(e.machineIds),a,e.cleaningStatus,e.notes||null,e.branch]);const n=e.cleaningStatus==="completed"?"available":"under_cleaning";for(const r of e.machineIds)await s.run("UPDATE machines SET status = ? WHERE id = ?",[n,r])}async function Ba(e,t){if(!C.isNativePlatform()){const i=L("machines",Q),l=i.find(d=>d.id===e);l&&(l.status="available"),w("machines",i);const u=L("subcleanings",[]),o=Ie();u.unshift({id:W(u),date:o,machineIds:[e],machineNames:l?.machineName??"",cleaningStatus:"completed",notes:null,branch:t}),w("subcleanings",u);return}const a=await $(),n=(await a.query("SELECT machineName FROM machines WHERE id = ?",[e])).values?.[0]?.machineName??"";await a.run("UPDATE machines SET status = ? WHERE id = ?",["available",e]);const r=Ie();await a.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, notes, branch) VALUES (?, ?, ?, ?, ?, ?)",[r,JSON.stringify([e]),n,"completed",null,t])}const Be=document.querySelector("#app");if(!Be)throw new Error("App root not found");let Ee;const ve=re("BluetoothThermalPrinter"),je={dashboard:"Dashboard",pos:"POS",orders:"Orders",archived:"Archived Order",customers:"Customers",pricing:"Pricing Services",disbursements:"Daily Report",reports:"Reports",inventory:"Inventory",maintenance:"Maintenance",staff:"Staff",revolving:"Revolving Fund",settings:"Settings"},c={tab:"dashboard",receiptOrderId:0,currentUser:null,loginError:"",sidebarOpen:!1,dailyReportTab:"expenses",maintenanceTab:"cleaning",customerSearch:"",orderSearch:"",orderDateFilter:"",orderPaymentFilter:"",printerPanelOpen:!1,printerLoading:!1,printerError:"",printerStatus:"",printerPaperWidth:58,pairedPrinters:[],selectedPrinterAddress:"",archivedOrderSearch:"",reportPreview:null,endorseModalOpen:!1,endorseSaleId:0,endorseSaleDate:"",revolvingModalOpen:!1,revolvingSaleId:0,addFundModalOpen:!1,disbursementModalOpen:!1,revolvingHistoryFrom:"",revolvingHistoryTo:""},ja=["Wash","Dry","Fold","Detergent","Fabcon","Zonrox"],Ha=["Supplies","Utilities","Maintenance","Salary","Rent","Transport","Other"],he="laba101-mobile-session";function T(e){return new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(e||0)}function v(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Z(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}function $e(e,t){return Number((e-t).toFixed(2))}function Nt(e,t,a,s=0){const n=t.filter(i=>X(i.createdAt)===e).reduce((i,l)=>i+l.paidAmount,0),r=a.filter(i=>ee(i)==="daily"&&i.expenseDate===e).reduce((i,l)=>i+l.amount,0);return $e(n+s,r)}function Wa(e){const t=new Map;return e.filter(a=>a.workflowCompleted.includes("fold")&&a.foldedByName).forEach(a=>{const s=a.foldedByName,n=t.get(s)??{staffName:s,folds:0};n.folds+=1,t.set(s,n)}),Array.from(t.values())}function ge(e=new Date){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${s}`}function H(){return ge()}function Fe(){return H().slice(0,7)}function ee(e){return e.disbursementType==="monthly"?"monthly":"daily"}function At(e){return e.slice(0,7)}function Lt(e){return ee(e)==="monthly"?At(e.expenseDate):e.expenseDate}function X(e){return ge(new Date(e))}function He(e){return e.paidAmount<=0?"unpaid":e.balance>0?"partial":"paid"}function Ct(e,t,a){const s=new Map(t.map(i=>[i.id,i])),n=new Map(t.map(i=>[i.id,Number(i.totalAmount||0)])),r={cash:0,gcash:0,total:0};return[...e].sort((i,l)=>new Date(i.receivedAt).getTime()-new Date(l.receivedAt).getTime()||i.id-l.id).forEach(i=>{const l=s.get(i.orderId);if(!l)return;const u=n.get(l.id)??0,o=Math.min(Math.max(0,Number(i.amount||0)),u);n.set(l.id,Number((u-o).toFixed(2))),!(!a(i)||o<=0)&&(i.method==="gcash"?r.gcash+=o:r.cash+=o,r.total+=o)}),{cash:Number(r.cash.toFixed(2)),gcash:Number(r.gcash.toFixed(2)),total:Number(r.total.toFixed(2))}}function oe(e){return new Intl.DateTimeFormat("en-PH",{dateStyle:"medium",timeStyle:"short"}).format(new Date(e))}function Xa(e){const t=new Date(e),a=new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric",year:"numeric"}).format(t),s=new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",hour12:!0}).format(t);return`<div class="datetime-stack"><strong>${v(a)}</strong><span class="meta">${v(s)}</span></div>`}function Ka(e){return e?.role==="staff"&&e.branch==="Gensan Branch"}function Ga(e){return e?.role==="staff"&&e.branch.toLowerCase().includes("mintal")}function Le(e,t,a="data-table"){return`
    <div class="table-scroll">
      <table class="${a}">
        <thead><tr>${e.map(s=>`<th>${v(s)}</th>`).join("")}</tr></thead>
        <tbody>${t.length?t.map(s=>`<tr>${s.map(n=>`<td>${n}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${e.length}" class="table-empty">No records found.</td></tr>`}</tbody>
      </table>
    </div>
  `}function Va(e=new Date){return{date:new Intl.DateTimeFormat("en-PH",{weekday:"long",month:"long",day:"numeric",year:"numeric"}).format(e),time:new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",second:"2-digit",hour12:!0}).format(e)}}function Se(){const e=document.querySelector("[data-date-from]"),t=document.querySelector("[data-date-to]"),a=Array.from(document.querySelectorAll('input[name="reportType"]:checked')).map(s=>s.value).filter(s=>s==="sales"||s==="disbursement"||s==="fold_count"||s==="revolving_fund"||s==="summary");return{from:e?.value||"0000-01-01",to:t?.value||"9999-12-31",types:a.length?a:["summary"]}}function fe(e,t){return e>=t.from&&e<=t.to}function $t(e,t,a,s,n,r,i){const l=new Set(i.types),u=e.filter(h=>fe(X(h.createdAt),i)),o=a.filter(h=>fe(h.saleDate,i)),d=s.filter(h=>fe(h.expenseDate,i)),m=Wa(u),p=new Map;t.filter(h=>fe(X(h.receivedAt),i)).forEach(h=>{const D=p.get(h.orderId)??{cash:0,gcash:0};h.method==="gcash"?D.gcash+=h.amount:D.cash+=h.amount,p.set(h.orderId,D)});const g=u.reduce((h,D)=>{const k=p.get(D.id);if(k){const J=k.cash+k.gcash;if(J>D.totalAmount){const ie=D.totalAmount/J;return h+k.cash*ie}return h+k.cash}return h+D.paidAmount},0),b=o.reduce((h,D)=>h+D.cashAmount,0),E=o.reduce((h,D)=>h+D.gcashAmount,0),y=u.reduce((h,D)=>{const k=p.get(D.id);if(k){const J=k.cash+k.gcash;if(J>D.totalAmount){const ie=D.totalAmount/J;return h+k.gcash*ie}return h+k.gcash}return h+0},0),N=g+b,f=y+E,A=N+f,O=d.reduce((h,D)=>h+D.amount,0),R=O,U=A-R,q=()=>({orderCashTotal:g,orderGcashTotal:y,manualCashTotal:b,manualGcashTotal:E,totalCash:N,totalGcash:f,totalSales:A,transactions:u.map(h=>{const D=p.get(h.id)??{cash:h.paidAmount,gcash:0},k=D.cash+D.gcash;let J=D.cash,ie=D.gcash,Xe=k;if(k>h.totalAmount){const Ke=h.totalAmount/k;J=D.cash*Ke,ie=D.gcash*Ke,Xe=h.totalAmount}return{ticket:h.ticket,customer:h.customer,cash:J,gcash:ie,total:Xe}}),manualSales:o.map(h=>({cash:h.cashAmount,gcash:h.gcashAmount,total:h.totalAmount}))}),x=()=>({totalExpenses:O,totalDisbursement:R,rows:[["Date/Month","id#","Type","Name","Category","Description","Amount"],...d.map(h=>[Lt(h),h.number,ee(h),h.name,h.category??"",h.description??"",h.amount]),[],["Total Disbursement","","","","","",R]]}),F=()=>({rows:[["Staff","Fold Count"],...m.map(h=>[h.staffName,h.folds]),[],["Total Folds",m.reduce((h,D)=>h+D.folds,0)]]}),M=n.filter(h=>fe(X(h.createdAt),i));return{selection:i,selectedTypes:l,salesRows:q,disbursementRows:x,foldCountRows:F,revolvingDailySummaryRows:()=>({rows:[["Date of Sales","Cash on Hand","Status","Date Update"],...o.map(h=>{const D=Nt(h.saleDate,e,s,h.cashAmount),k=h.status==="revolving"?"Revolving":h.status==="endorsed"?`Endorsed to ${h.endorsedTo??""}`:"Pending";return[h.saleDate,D,k,h.statusUpdatedAt?X(h.statusUpdatedAt):""]})]}),revolvingHistoryRows:()=>({rows:[["Date","Number","Name","Amount","Category","Description","Type"],...M.map(h=>[X(h.createdAt),h.revolvingNumber,h.name,h.type==="disbursement"?-h.amount:h.amount,h.category,h.description??"",h.type==="add"?"Add Revolving Fund":"Disbursement"])]}),summaryRows:()=>{const h=q(),D=x();return[["Summary",i.from,"to",i.to],[],["Total Cash:","Total GCash:","Total Sales:"],["","",""],[h.totalCash,h.totalGcash,h.totalSales],["","",""],["Total Disbursement:","Total Profit:","Cash on Hand:"],["","",""],[D.totalDisbursement,U,$e(h.totalCash,D.totalDisbursement)]]},profit:U}}function Ya(e,t){return`<button class="nav-link ${t?"is-active":""}" data-tab="${e}" type="button">
    <span class="nav-icon">${Qa(e)}</span>
    <span>${je[e]}</span>
  </button>`}function P(e,t){return`<div class="section-head"><div><h2>${v(e)}</h2><p class="meta">${v(t)}</p></div></div>`}function it(){return je[c.tab]??"Dashboard"}function Oe(e){return(e?.name??"Laba101").trim().slice(0,1).toUpperCase()}function Qa(e){return{dashboard:"DB",pos:"POS",orders:"PO",archived:"AR",customers:"CU",pricing:"PS",disbursements:"DR",reports:"RP",inventory:"IN",maintenance:"MT",staff:"ST",revolving:"RV",settings:"SE"}[e]}async function Rt(){const e=await pe(),t=await ma(e),a=await ft(),s=await pa(),n=await _e(),r=await fa(),i=await gt(),l=await ye(e),u=await wa(),o=await Aa(),d=await Ca(),m=await Pa(),p=await Tt(e),g=await Ma(e),b=await Fa(),E=await ua(),y=await yt("report_email");return{branch:e,staff:t,allStaff:a,customers:s,services:n,allServices:r,categories:i,orders:l,payments:u,foldLogs:o,expenses:d,sales:m,machines:p,subcleanings:g,revolvingHistory:b,foldRate:E,reportEmail:y??""}}async function S(){if(!c.currentUser){Ja(),fs();return}const e=await Rt();e.orders.filter(u=>u.status!=="claimed").length,e.orders.filter(u=>u.status==="ready").length,e.orders.reduce((u,o)=>u+o.paidAmount,0);const t=H(),a=Ct(e.payments,e.orders,u=>u.branch===e.branch&&X(u.receivedAt)===t),s=a.gcash+e.sales.filter(u=>u.saleDate===t).reduce((u,o)=>u+o.gcashAmount,0),n=a.cash+e.sales.filter(u=>u.saleDate===t).reduce((u,o)=>u+o.cashAmount,0),r=n+s,i=e.expenses.filter(u=>ee(u)==="daily"&&u.expenseDate===t).reduce((u,o)=>u+o.amount,0),l=$e(n,i);e.sales.reduce((u,o)=>u+o.totalAmount,0),e.expenses.reduce((u,o)=>u+o.amount,0),Be.innerHTML=`
    <div class="app-frame">
      <header class="topbar">
        <div class="topbar-left">
          <img src="/laba101-logo.svg" alt="Laba101" class="topbar-logo" />
          <div>
            <p class="eyebrow">Offline mobile system</p>
            <h1>${v(it())}</h1>
          </div>
        </div>
        <div class="topbar-actions">
          <div class="branch-pill"><span>Branch</span><strong>${v(e.branch)}</strong></div>
          <button class="icon-button" type="button" aria-label="Notifications">!</button>
          <button class="profile-pill" type="button">
            <span>${Oe(c.currentUser)}</span>
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
        <nav>${Dt().map(u=>Ya(u,c.tab===u)).join("")}</nav>
        <div class="sidebar-fill">
          <div class="sidebar-branch-badge">
            <span>Active Branch</span>
            <strong>${v(e.branch)}</strong>
          </div>
          <p class="sidebar-app-name">Laba101 POS</p>
        </div>
        <div class="sidebar-user">
          <span class="avatar">${Oe(c.currentUser)}</span>
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
            <h2>${v(it())}</h2>
          </div>
          <div class="navbar-time">
            <strong data-navbar-time>--:--</strong>
            <span data-navbar-date>Loading...</span>
          </div>
          <button class="mobile-avatar" type="button">${Oe(c.currentUser)}</button>
        </header>

        ${c.tab==="dashboard"?Za({paidToday:r,cashPaidToday:n,gcashPaidToday:s,disbursementToday:i,cashOnHandToday:l,orders:e.orders,payments:e.payments,sales:e.sales}):""}
        ${c.tab==="pos"?es(e.orders,e.customers,e.services,e.categories,e.payments,e.branch):""}
        ${c.tab==="orders"?ts(e.orders,e.staff,e.services,e.payments):""}
        ${c.tab==="archived"?as(e.orders,e.staff,e.services,e.payments):""}
        ${c.tab==="customers"?os(e.customers,e.orders):""}
        ${c.tab==="pricing"?cs(e.allServices,e.categories):""}
        ${c.tab==="disbursements"?ls(e.expenses,e.sales):""}
        ${c.tab==="reports"?ds(e.orders,e.payments,e.sales,e.expenses,e.revolvingHistory,e.foldRate):""}
        ${c.tab==="inventory"?us(e.services,e.categories):""}
        ${c.tab==="maintenance"?ms(e.machines,e.subcleanings,e.branch):""}
        ${c.tab==="staff"?vs(e.allStaff,e.branch):""}
        ${c.tab==="revolving"?Cs(e.sales,e.revolvingHistory,e.orders,e.expenses):""}
        ${c.tab==="settings"?ps(e.branch,e.foldRate,e.reportEmail):""}
      </main>
    </div>
  `,ys(),gs(e),bs(e.allServices),Es(e.expenses),Ss(e.orders,e.payments,e.sales,e.expenses,e.revolvingHistory,e.foldRate),ws(),Ts(),Ns(),As(e.allStaff),$s(),Ls(),hs()}function Dt(){if(c.currentUser?.role==="admin")return Object.keys(je).filter(t=>t!=="inventory");const e=["dashboard","pos","orders","archived","disbursements","reports","maintenance","revolving"];return Ka(c.currentUser)?["dashboard","disbursements","reports","maintenance","revolving"]:Ga(c.currentUser)?e.filter(t=>t!=="revolving"):e}function Ja(){Be.innerHTML=`
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
  `}function za(){document.querySelectorAll("[data-fill-email]").forEach(e=>{e.addEventListener("click",()=>{const t=document.querySelector('input[name="email"]'),a=document.querySelector('input[name="password"]');t&&(t.value=e.dataset.fillEmail??""),a&&(a.value=e.dataset.fillPassword??"")})})}function Za(e){const t=new Date,a=Array.from({length:7},(i,l)=>{const u=new Date(t);return u.setDate(t.getDate()-(6-l)),new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric"}).format(u)}),s=Array.from({length:7},(i,l)=>{const u=new Date(t);u.setDate(t.getDate()-(6-l));const o=ge(u),d=Ct(e.payments,e.orders,p=>X(p.receivedAt)===o).total,m=e.sales.filter(p=>p.saleDate===o).reduce((p,g)=>p+g.totalAmount,0);return d+m}),n=Math.max(1,...s),r=210;return`
    <section class="dashboard-main">
      <article class="panel revenue-panel">
        ${P("Revenue overview","Paid amount for the last 7 days.")}
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
            ${s.map((i,l)=>{const u=Math.max(12,Math.round(i/n*r));return`<div class="chart-bar ${l===s.length-1?"is-today":""}"><span style="height:${u}px"></span><strong>${T(i)}</strong></div>`}).join("")}
          </div>
          <div class="chart-days">${a.map(i=>`<span>${v(i)}</span>`).join("")}</div>
        </div>
        <div class="chart-footnote">Values include POS payments and Daily Report sales input.</div>
      </article>
    </section>
  `}function es(e,t,a,s,n,r){const i=a.filter(m=>m.serviceType==="order"&&m.isActive),l=a.filter(m=>m.serviceType==="addon"&&m.isActive),u=c.receiptOrderId?e.find(m=>m.id===c.receiptOrderId):null,o=new Set(e.map(m=>m.customerId)),d=t.filter(m=>o.has(m.id));return`
    <section class="grid content full">
      <article class="panel span-2">
        ${P("New POS order","Tap a service, add extra quantities, and confirm the total")}
        <form id="order-form" class="form">
          <div class="form-row">
            <label>Existing customer (${v(r)})
              <select name="customerId">
                <option value="">-- New customer --</option>
                ${d.map(m=>`<option value="${m.id}" data-name="${v(m.name)}" data-phone="${v(m.phone??"")}">${v(m.name)} ${m.phone?`- ${v(m.phone)}`:""}</option>`).join("")}
              </select>
            </label>
            <label>Customer name<input name="customerName" required placeholder="Customer name" /></label>
          </div>
          <div class="form-row">
            <label>Phone<input name="customerPhone" placeholder="09..." /></label>
          </div>

          <fieldset class="service-picker">
            <legend>Services</legend>
            ${i.map(m=>`<div class="qty-card service-option service-quantity" data-qty-card="serviceQty-${m.id}">
              <span>
                <strong>${v(m.name)}</strong>
                <small>${v(m.description??m.category)} ${m.maxKg?` / max ${m.maxKg}kg`:""}</small>
              </span>
              <b>${T(m.price)}</b>
              <div class="qty-control">
                <button type="button" data-qty-minus="serviceQty-${m.id}" aria-label="Decrease ${v(m.name)}">-</button>
                <input type="number" name="serviceQty-${m.id}" min="0" step="1" value="0" inputmode="numeric" />
                <button type="button" data-qty-plus="serviceQty-${m.id}" aria-label="Increase ${v(m.name)}">+</button>
              </div>
            </div>`).join("")}
          </fieldset>

          <fieldset class="check-grid">
            <legend>Extra services</legend>
            ${l.length?l.map(m=>`<div class="qty-card addon-quantity" data-qty-card="addonQty-${m.id}">
              <span><strong>${v(Z(m.name))}</strong><small>${T(m.price)} each</small></span>
              <div class="qty-control">
                <button type="button" data-qty-minus="addonQty-${m.id}" aria-label="Decrease ${v(Z(m.name))}">-</button>
                <input type="number" name="addonQty-${m.id}" min="0" step="1" value="0" inputmode="numeric" />
                <button type="button" data-qty-plus="addonQty-${m.id}" aria-label="Increase ${v(Z(m.name))}">+</button>
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

      ${u?We(u,n.filter(m=>m.orderId===u.id)):""}
    </section>
  `}function ts(e,t,a,s){const n=c.receiptOrderId?e.find(d=>d.id===c.receiptOrderId):null,r=e.filter(d=>d.status!=="claimed"),i=c.orderSearch.trim().toLowerCase(),l=c.orderDateFilter.trim(),u=c.orderPaymentFilter.trim().toLowerCase(),o=r.filter(d=>{const m=!i||[d.ticket,d.customer,d.phone,d.service,d.itemCategory,d.status].some(b=>String(b??"").toLowerCase().includes(i)),p=!l||X(d.createdAt)===l,g=!u||He(d)===u;return m&&p&&g});return`
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
          <div><span>Active queue</span><strong>${o.length}</strong></div>
          <div><span>Claimed archived</span><strong>${e.filter(d=>d.status==="claimed").length}</strong></div>
        </div>
        <table class="data-table orders-data-table">
          <thead>
            <tr><th>Ticket</th><th>Customer</th><th>Service</th><th>Total Payment</th><th>Actions</th></tr>
          </thead>
          <tbody>
            ${o.map(d=>Ot(d,t,a)).join("")||'<tr><td colspan="5" class="table-empty">No matching active orders.</td></tr>'}
          </tbody>
        </table>
      </article>
      ${n?We(n,s.filter(d=>d.orderId===n.id)):""}
    </section>
  `}function as(e,t,a,s){const n=e.filter(u=>u.status==="claimed"),r=c.archivedOrderSearch.trim().toLowerCase(),i=n.filter(u=>r?[u.ticket,u.customer,u.phone,u.service,u.itemCategory].some(o=>String(o??"").toLowerCase().includes(r)):!0),l=c.receiptOrderId?e.find(u=>u.id===c.receiptOrderId):null;return`
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
            ${i.map(u=>Ot(u,t,a)).join("")||'<tr><td colspan="5" class="table-empty">No archived orders found.</td></tr>'}
          </tbody>
        </table>
      </article>
      ${l?We(l,s.filter(u=>u.orderId===l.id)):""}
    </section>
  `}function Ot(e,t,a){const s=bt(e,a),n=s.find(p=>!e.workflowCompleted.includes(p.key)),r=n?.key==="fold",i=n?.key==="extras"&&e.extras.length>0,l=He(e),u=e.extras.length?e.extras.map(p=>`${v(Z(p.name))} x${Number(p.quantity??1)}`).join(", "):"",o=c.currentUser?.role==="admin",d=e.status!=="claimed"&&e.paidAmount<=0,m=e.status!=="claimed"&&o&&e.paidAmount>0;return`
    <tr class="order-row-main">
      <td><strong>${v(e.ticket)}</strong><div class="small">${v(oe(e.createdAt))}</div></td>
      <td>${v(e.customer)}<div class="small">${v(e.phone??"")}</div></td>
      <td>${v(e.service)}${u?`<div class="small">Extras: ${u}</div>`:""}</td>
      <td class="amount-cell"><strong>${T(e.totalAmount)}(${v(l)})</strong><div class="small">Paid: ${T(e.paidAmount)}, Bal: ${T(e.balance)}</div></td>
      <td>
      <div class="row-actions">
        ${n?`<form class="inline-form advance-form" data-order-id="${e.id}">
          ${i?`<div class="extra-confirmation">Confirm extra service: <strong>${e.extras.map(p=>`${v(Z(p.name))} x${Number(p.quantity??1)}`).join(", ")}</strong></div>`:""}
          ${r?`<select name="assignedStaffId" required>
            <option value="">Staff</option>
            ${t.map(p=>`<option value="${p.id}">${v(p.name)}</option>`).join("")}
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
        ${d?`<button class="secondary" type="button" data-cancel-order="${e.id}">Cancel</button>`:""}
        ${m?`<button class="secondary" type="button" data-delete-order="${e.id}">Delete</button>`:""}
        <button class="secondary" data-receipt="${e.id}">Receipt</button>
      </div>
      </td>
    </tr>
    <tr class="order-row-detail">
      <td colspan="5">
        <div class="order-detail-row">
          <div class="${e.status==="ready"||e.status==="claimed"?"ok":"warn"}">${v(e.status)}</div>
          <div class="workflow-progress order-workflow-progress">
            ${s.map(p=>`<span class="${e.workflowCompleted.includes(p.key)?"is-done":n?.key===p.key?"is-next":""}">${v(p.label)}</span>`).join("")}
          </div>
        </div>
      </td>
    </tr>
  `}function We(e,t){const a=t.reduce((i,l)=>i+Number(l.amount),0),s=Math.max(0,Number((a-e.totalAmount).toFixed(2))),n=He(e),r=n.charAt(0).toUpperCase()+n.slice(1);return`
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="receipt-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-open-printer-panel>Printer</button>
          <button class="primary" type="button" data-thermal-print>${c.printerLoading?"Printing...":"Print Receipt"}</button>
          <button class="secondary" type="button" data-close-receipt>Close</button>
        </div>
        ${c.printerPanelOpen?ss():""}
        <div class="receipt" id="receipt-print-area">
          <div class="receipt-head">
            <h3 id="receipt-title">Laba101</h3>
            <p>${v(e.ticket)}<br>${v(oe(e.createdAt))}</p>
          </div>
          ${c.currentUser?`<p class="receipt-staff">Staff: ${v(c.currentUser.name)}</p>`:""}
          <div class="receipt-customer">
            <strong>${v(e.customer)}</strong>
            <span>${v(e.phone??"No phone")}</span>
          </div>
          <div class="summary-list receipt-lines">
            <div><span>Service</span><strong>${v(e.service)}</strong></div>
            ${e.extras.length?`<div><span>Extra services</span><strong>${e.extras.map(i=>`${v(Z(i.name))} x${Number(i.quantity??1)} (${T(Number(i.total??i.price))})`).join(", ")}</strong></div>`:""}
            <div><span>Total</span><strong>${T(e.totalAmount)}</strong></div>
            <div><span>Tendered</span><strong>${T(a)}</strong></div>
            <div><span>Paid</span><strong>${T(e.paidAmount)}</strong></div>
            <div><span>Payment status</span><strong>${r}</strong></div>
            <div><span>Change</span><strong>${T(s)}</strong></div>
            <div><span>Balance</span><strong>${T(e.balance)}</strong></div>
          </div>
          <h3>Payments</h3>
          <div class="receipt-payments">
            ${t.map(i=>`<div><span>${v(i.method.toUpperCase())}</span><strong>${T(i.amount)}</strong>${i.reference?`<small>Ref ${v(i.reference)}</small>`:""}</div>`).join("")||'<p class="helper">No payments yet.</p>'}
          </div>
        </div>
      </div>
    </div>
  `}function ss(){return`
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
  `}async function ot(){c.printerLoading=!0,c.printerError="",c.printerStatus="",await S();try{if(!(await ve.requestBluetoothPermissions()).granted)throw new Error("Bluetooth permission was not granted.");const t=await ve.listPairedPrinters();c.pairedPrinters=t.printers??[],c.selectedPrinterAddress=c.selectedPrinterAddress||t.savedAddress||c.pairedPrinters[0]?.address||"",c.printerStatus=c.pairedPrinters.length?"Select a printer, then connect.":"No paired printers found. Pair the printer in Android Bluetooth settings first."}catch(e){c.printerError=e instanceof Error?e.message:"Could not scan paired printers."}finally{c.printerLoading=!1,await S()}}async function ns(){if(!c.selectedPrinterAddress){c.printerError="Select a paired printer first.",await S();return}c.printerLoading=!0,c.printerError="",c.printerStatus="",await S();try{await ve.savePrinter({address:c.selectedPrinterAddress}),await ve.connect({address:c.selectedPrinterAddress}),c.printerStatus="Printer connected and saved."}catch(e){c.printerError=e instanceof Error?e.message:"Printer connection failed."}finally{c.printerLoading=!1,await S()}}function rs(e){const t=(e.serviceLines?.length?e.serviceLines:[{id:e.serviceId,name:e.service,price:e.price,quantity:1,total:e.price}]).map(s=>({name:s.name,quantity:Number(s.quantity||1),price:Number(s.price||0)})),a=e.extras.map(s=>({name:Z(s.name),quantity:Number(s.quantity??1),price:Number(s.price||0)}));return[...t,...a]}async function is(e,t){const a=t.reduce((n,r)=>n+Number(r.amount),0),s=Math.max(0,Number((a-e.totalAmount).toFixed(2)));c.printerLoading=!0,c.printerError="",c.printerStatus="",await S();try{if(!c.selectedPrinterAddress){const n=await ve.getSavedPrinter();c.selectedPrinterAddress=n.address||""}await ve.printReceipt({address:c.selectedPrinterAddress||void 0,paperWidth:c.printerPaperWidth,storeName:"Laba101",receiptNumber:e.ticket,dateTime:oe(e.createdAt),customerName:e.customer,customerPhone:e.phone?.trim()||"No phone",items:rs(e),totalAmount:e.totalAmount,paidAmount:e.paidAmount,changeAmount:s,balanceAmount:e.balance,staffName:c.currentUser?.name?.trim()||"Staff"}),c.printerStatus="Receipt sent to printer."}catch(n){c.printerPanelOpen=!0,c.printerError=n instanceof Error?n.message:"Bluetooth thermal print failed."}finally{c.printerLoading=!1,await S()}}function os(e,t){const a=c.customerSearch.trim().toLowerCase(),s=e.filter(n=>a?n.name.toLowerCase().includes(a):!1);return`
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
          <div><span>Matching customers</span><strong>${a?s.length:0}</strong></div>
        </div>
      </article>
      <article class="panel">
        ${P("Customer list","Names, phones, addresses, and order history")}
        <div class="customer-stack">
          ${a?s.map(n=>{const r=t.filter(i=>i.customerId===n.id);return`
              <article class="customer-card">
                <header>
                  <div>
                    <strong>${v(n.name)}</strong>
                    <p>${v(n.phone??"No phone")} · ${v(n.address??"No address")}</p>
                  </div>
                  <span>${r.length} order(s)</span>
                </header>
                <div class="customer-orders">
                  ${r.length?r.map(i=>`
                    <div class="customer-order-row">
                      <div>
                        <strong>${v(i.ticket)}</strong>
                        <span>${v(i.service)} · ${v(i.itemCategory)}</span>
                      </div>
                      <div>
                        <strong>${T(i.totalAmount)}</strong>
                        <span>${v(i.status)}</span>
                      </div>
                    </div>`).join(""):'<p class="helper">No order records yet.</p>'}
                </div>
              </article>`}).join(""):'<div class="helper">Search a customer name to display matching records and their order history.</div>'}
        </div>
      </article>
    </section>
  `}function cs(e,t){const a=e.filter(n=>n.serviceType==="order"),s=e.filter(n=>n.serviceType==="addon");return`
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
            ${ja.map(n=>`<label class="check"><input type="checkbox" name="includes" value="${n}" /> ${n}</label>`).join("")}
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
        ${P("Services Table","Order services")}
        <div class="table-scroll">
          <div class="table data-table">
            <div class="table-head"><div>Name</div><div>Category</div><div>Price</div><div>Max KG</div><div>Includes</div><div>Status</div><div>Actions</div></div>
            ${a.map(n=>`<div class="table-row"><div><strong>${v(n.name)}</strong></div><div>${v(n.category)}</div><div>${T(n.price)}</div><div>${n.maxKg} kg</div><div>${v(n.includes.join(", ")||"none")}</div><div>${n.isActive?"Active":"Inactive"}</div><div class="row-actions"><button class="secondary edit-service-btn" data-id="${n.id}">Edit</button>${n.isActive?`<button class="secondary deactivate-service-btn" data-id="${n.id}">Deactivate</button>`:`<button class="secondary activate-service-btn" data-id="${n.id}">Activate</button>`}</div></div>`).join("")||'<div class="helper">No order services yet.</div>'}
          </div>
        </div>
        <div class="section-divider"></div>
        ${P("Extra Services Table","Add-on services")}
        <div class="table-scroll">
          <div class="table data-table extra-services-table">
            <div class="table-head"><div>Name</div><div>Category</div><div>Price</div><div>Includes</div><div>Status</div><div>Actions</div></div>
            ${s.map(n=>`<div class="table-row"><div><strong>${v(n.name)}</strong></div><div>${v(n.category)}</div><div>${T(n.price)}</div><div>${v(n.includes.join(", ")||"none")}</div><div>${n.isActive?"Active":"Inactive"}</div><div class="row-actions"><button class="secondary edit-service-btn" data-id="${n.id}">Edit</button>${n.isActive?`<button class="secondary deactivate-service-btn" data-id="${n.id}">Deactivate</button>`:`<button class="secondary activate-service-btn" data-id="${n.id}">Activate</button>`}</div></div>`).join("")||'<div class="helper">No extra services yet.</div>'}
          </div>
        </div>
      </article>
    </section>
  `}function ls(e,t){const a=H(),s=a.slice(0,7),n=c.currentUser?.role==="admin",r=Array.from(new Set([...Ha,...e.map(d=>d.category).filter(Boolean)])),i=e.filter(d=>ee(d)==="daily"&&d.expenseDate===a).reduce((d,m)=>d+m.amount,0),l=e.filter(d=>ee(d)==="monthly"&&d.expenseDate.startsWith(s)).reduce((d,m)=>d+m.amount,0),u=t.filter(d=>d.saleDate===a).reduce((d,m)=>d+m.totalAmount,0),o=t.filter(d=>d.saleDate.startsWith(s)).reduce((d,m)=>d+m.totalAmount,0);return`
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
      <div class="panel stat"><div class="card-label">Daily disbursement</div><div class="value">${T(i)}</div></div>
      <div class="panel stat"><div class="card-label">Monthly disbursement</div><div class="value">${T(l)}</div></div>
      <div class="panel stat"><div class="card-label">Today sales input</div><div class="value">${T(u)}</div></div>
      <div class="panel stat"><div class="card-label">Month sales input</div><div class="value">${T(o)}</div></div>
    </section>
    ${c.dailyReportTab==="expenses"?`
    <section class="grid content full">
      <article class="panel">
        ${P("Input disbursement","Supplies, utilities, and cash disbursements")}
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
            <label class="expense-month-field" hidden>Month<input name="expenseMonth" type="month" value="${Fe()}" /></label>
            <label>Amount<input name="amount" type="number" min="0" step="0.01" required placeholder="0.00" /></label>
          </div>
          <div class="form-row"><label>Title / Name<input name="name" required /></label><label>Category<select name="category" required>${r.map(d=>`<option value="${v(d)}">${v(d)}</option>`).join("")}</select></label></div>
          <label>Description<textarea name="description"></textarea></label>
          <button class="primary" type="submit">Save expense</button>
        </form>
      </article>
      <article class="panel">
        ${P("Disbursement list","Expenses only")}
        <div class="table-scroll daily-report-scroll">
          <div class="table daily-report-table">
            <div class="table-head"><div>Date/Month</div><div>No.</div><div>Name</div><div>Category</div><div>Amount</div><div>Action</div></div>
            ${e.map(d=>`<div class="table-row"><div>${v(Lt(d))}<div class="small">${v(ee(d))}</div></div><div>${v(d.number)}</div><div>${v(d.name)}</div><div>${v(d.category)}</div><div>${T(d.amount)}</div><div class="row-actions"><button class="secondary edit-expense-btn" data-id="${d.id}" type="button">Edit</button>${n?`<button class="secondary delete-expense-btn" data-id="${d.id}" type="button">Delete</button>`:""}</div></div>`).join("")||'<div class="helper">No expenses yet.</div>'}
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
          <label>Date<input name="saleDate" type="date" value="${H()}" required /></label>
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
            ${t.map(d=>`<div class="table-row"><div>${v(d.saleNumber)}</div><div>${v(d.saleDate)}</div><div>${T(d.cashAmount)}</div><div>${T(d.gcashAmount)}</div><div><strong>${T(d.totalAmount)}</strong></div><div class="row-actions"><button class="secondary edit-sale-btn" data-id="${d.id}" type="button">Edit</button>${n?`<button class="secondary delete-sale-btn" data-id="${d.id}" type="button">Delete</button>`:""}</div></div>`).join("")||'<div class="helper">No daily sales totals yet.</div>'}
          </div>
        </div>
      </article>
    </section>
    `}
  `}function ds(e,t,a,s,n,r,i,l,u){const o=c.reportPreview?$t(e,t,a,s,n,r,c.reportPreview):null;return`
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
    ${o?`
      <section class="panel report-preview">
        ${o.selectedTypes.has("sales")?`
          <article>
            ${P("Sales report preview",`${o.selection.from} to ${o.selection.to}`)}
            <div class="table wide-table report-preview-table sales-table">
              <div class="table-head report-table-head"><div>Ticket</div><div>Customer</div><div>Cash</div><div>GCash</div><div>Total Payment</div></div>
              ${o.salesRows().transactions.map(d=>`<div class="table-row report-table-row"><div>${v(d.ticket)}</div><div>${v(d.customer)}</div><div>${T(d.cash)}</div><div>${T(d.gcash)}</div><div>${T(d.total)}</div></div>`).join("")}
            </div>
            <div class="sales-summary-section">
              <h3>Sales Summary</h3>
              <div class="table sales-summary-table">
                <div class="table-head"><div>Sales Type</div><div>Cash</div><div>GCash</div><div>Sales</div></div>
                <div class="table-row"><div>Orders</div><div>${T(o.salesRows().orderCashTotal)}</div><div>${T(o.salesRows().orderGcashTotal)}</div><div>${T(o.salesRows().orderCashTotal+o.salesRows().orderGcashTotal)}</div></div>
                <div class="table-row"><div>Whole Sale Day</div><div>${T(o.salesRows().manualCashTotal)}</div><div>${T(o.salesRows().manualGcashTotal)}</div><div>${T(o.salesRows().manualCashTotal+o.salesRows().manualGcashTotal)}</div></div>
                <div class="table-row total-row"><div>Total</div><div>${T(o.salesRows().totalCash)}</div><div>${T(o.salesRows().totalGcash)}</div><div>${T(o.salesRows().totalSales)}</div></div>
              </div>
            </div>
          </article>`:""}
        ${o.selectedTypes.has("disbursement")?`
          <article>
            ${P("Disbursement preview",`${o.selection.from} to ${o.selection.to}`)}
            <div class="table wide-table report-preview-table report-disbursement-table">
              <div class="table-head report-table-head"><div>ID#</div><div>Date/Month</div><div>Type</div><div>Name</div><div>Category</div><div>Amount</div></div>
              ${o.disbursementRows().rows.slice(1).filter(d=>d.length&&d[0]!=="Total Disbursement").map(d=>`<div class="table-row report-table-row"><div>${v(d[1]??"")}</div><div>${v(d[0]??"")}</div><div>${v(d[2]??"")}</div><div>${v(d[3]??"")}</div><div>${v(d[4]??"")}</div><div>${T(d[6])}</div></div>`).join("")}
            </div>
            <div class="disbursement-total">
              <strong>Total Disbursement: ${T(o.disbursementRows().totalDisbursement)}</strong>
            </div>
          </article>`:""}
        ${o.selectedTypes.has("fold_count")?`
          <article>
            ${P("Fold Count preview",`${o.selection.from} to ${o.selection.to}`)}
            <div class="table report-preview-table">
              <div class="table-head"><div>Staff</div><div>Fold Count</div></div>
              ${o.foldCountRows().rows.slice(1).map(d=>`<div class="table-row">${d.map(m=>`<div>${v(m??"")}</div>`).join("")}</div>`).join("")}
            </div>
          </article>`:""}
        ${o.selectedTypes.has("revolving_fund")?`
          <article>
            ${P("Revolving Fund — Daily Summary",`${o.selection.from} to ${o.selection.to}`)}
            ${Le(["Date of Sales","Cash on Hand","Status","Date Update"],o.revolvingDailySummaryRows().rows.slice(1).map(d=>[v(String(d[0]??"")),v(String(d[1]??"")),v(String(d[2]??"")),v(String(d[3]??""))]),"data-table revolving-report-table")}
          </article>
          <article>
            ${P("Revolving Fund — Table History",`${o.selection.from} to ${o.selection.to}`)}
            ${Le(["Date","Number","Name","Amount","Category","Description","Type"],o.revolvingHistoryRows().rows.slice(1).map(d=>[v(String(d[0]??"")),v(String(d[1]??"")),v(String(d[2]??"")),v(String(d[3]??"")),v(String(d[4]??"")),v(String(d[5]??"")),v(String(d[6]??""))]),"data-table revolving-report-table")}
          </article>`:""}
        ${o.selectedTypes.has("summary")?`
          <article>
            ${P("Summary preview",`${o.selection.from} to ${o.selection.to}`)}
            <div class="summary-cards-grid summary-single-row">
              <div class="summary-card"><span class="card-label">Total Sales</span><div class="card-details"><span>Total Cash: ${T(o.salesRows().totalCash)}</span><span>Total GCash: ${T(o.salesRows().totalGcash)}</span></div><strong>${T(o.salesRows().totalSales)}</strong></div>
              <div class="summary-card"><span class="card-label">Total Disbursement</span><strong>${T(o.disbursementRows().totalDisbursement)}</strong></div>
              <div class="summary-card"><span class="card-label">Cash on Hand</span><strong>${T($e(o.salesRows().totalCash,o.disbursementRows().totalDisbursement))}</strong></div>
            </div>
          </article>`:""}
      </section>
    `:""}
  `}function us(e,t){return`
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
          ${e.map(a=>`<div class="table-row"><div><strong>${v(a.name)}</strong></div><div>${v(a.category)}</div><div>${T(a.price)}</div><div>${a.maxKg} kg</div><div>${a.isActive?"Active":"Inactive"}</div></div>`).join("")}
        </div>
      </article>
    </section>
  `}function ms(e,t,a){const s=e.filter(r=>r.status!=="under_cleaning"),n=e.filter(r=>r.status==="under_cleaning");return`
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
          <input type="hidden" name="date" value="${H()}" />
          <fieldset class="machine-list">
            ${s.map(r=>`<label class="machine-card"><input type="checkbox" name="machineIds" value="${r.id}" /><span><strong>${v(r.machineName)}</strong><small>${v(r.machineType)}</small></span><em></em></label>`).join("")||'<p class="helper">All machines are currently being cleaned.</p>'}
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
          ${n.length?n.map(r=>`
            <div class="machine-status">
              <span><strong>${v(r.machineName)}</strong><small>${v(r.machineType)}</small></span>
              <b>In progress</b>
              <button class="secondary complete-cleaning-btn" type="button" data-machine-id="${r.id}" data-branch="${v(a)}">Mark Complete</button>
            </div>`).join(""):'<p class="helper">No machines under cleaning right now.</p>'}
        </div>
      </article>
      <article class="panel span-2">
        ${P("Daily Cleaning Checklist","Track which machines have been cleaned today.")}
        <div class="table">
          <div class="table-head"><div>Machine</div><div>Type</div><div>Status</div><div>Notes</div><div>Date</div></div>
          ${e.map(r=>{const i=t.find(l=>l.machineIds.includes(r.id)&&l.date===H());return`<div class="table-row"><div><strong>${v(r.machineName)}</strong></div><div>${v(r.machineType)}</div><div>${i?v(i.cleaningStatus.replace("_"," ")):"Not Cleaned"}</div><div>${v(i?.notes??"-")}</div><div>${H()}</div></div>`}).join("")}
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
          ${e.map(r=>`<div class="table-row"><div><strong>${v(r.machineName)}</strong></div><div>${v(r.machineType)}</div><div>${v(r.status.replace("_"," "))}</div><div>${v(r.branch)}</div>
          <div class="row-actions">
            ${r.status!=="inactive"?`<button class="secondary deactivate-machine-btn" data-id="${r.id}">Deactivate</button>`:`<button class="secondary activate-machine-btn" data-id="${r.id}">Activate</button>`}
          </div></div>`).join("")||'<div class="helper">No machines found.</div>'}
        </div>
      </article>
    </section>
    `}
  `}function vs(e,t){return`
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
        <div class="table-scroll">
          <div class="table data-table">
            <div class="table-head"><div>Name</div><div>Email</div><div>Role</div><div>Branch</div><div>Status</div><div>Actions</div></div>
            ${e.length?e.map(a=>`<div class="table-row"><div><strong>${v(a.name)}</strong></div><div>${v(a.email)}</div><div>${v(a.role)}</div><div>${v(a.branch)}</div><div>${a.isActive!==0?"Active":"Inactive"}</div>
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
  `}function ps(e,t,a){return`
    <section class="grid content full">
      <article class="panel">
        ${P("Settings","Device-local configuration")}
        <form id="settings-form" class="form">
          <label>Current branch<select name="branch">
            ${["Main Store","Mintal Branch","Gensan Branch"].map(s=>`<option value="${s}" ${s===e?"selected":""}>${s}</option>`).join("")}
          </select></label>
          <label>Report email<input name="reportEmail" type="email" placeholder="admin@laba101.test" value="${v(a)}" /></label>
          <button class="primary" type="submit">Save settings</button>
        </form>
      </article>
    </section>
  `}function ys(){const e=()=>{localStorage.removeItem(he),c.currentUser=null,c.tab="dashboard",c.receiptOrderId=0,c.sidebarOpen=!1,S()};document.querySelector("#logout-button")?.addEventListener("click",e),document.querySelector("#mobile-logout-button")?.addEventListener("click",e),document.querySelector("#mobile-menu-button")?.addEventListener("click",()=>{c.sidebarOpen=!0,S()}),document.querySelector("#sidebar-close-button")?.addEventListener("click",()=>{c.sidebarOpen=!1,S()}),document.querySelector("#sidebar-backdrop")?.addEventListener("click",()=>{c.sidebarOpen=!1,S()}),document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{c.tab=t.dataset.tab,c.receiptOrderId=0,c.sidebarOpen=!1,S()})}),document.querySelectorAll("[data-quick-tab]").forEach(t=>{t.addEventListener("click",()=>{c.tab=t.dataset.quickTab,S()})}),document.querySelectorAll("[data-receipt]").forEach(t=>{t.addEventListener("click",()=>{c.receiptOrderId=Number(t.dataset.receipt),c.printerPanelOpen=!1,c.printerError="",c.printerStatus="",S()})}),document.querySelector("[data-close-receipt]")?.addEventListener("click",()=>{c.receiptOrderId=0,S()}),document.querySelector("[data-open-printer-panel]")?.addEventListener("click",()=>{c.printerPanelOpen=!c.printerPanelOpen,c.printerPanelOpen&&c.pairedPrinters.length===0?ot():S()}),document.querySelector("[data-refresh-printers]")?.addEventListener("click",()=>{ot()}),document.querySelector("[data-printer-select]")?.addEventListener("change",t=>{c.selectedPrinterAddress=t.currentTarget.value,S()}),document.querySelector("[data-paper-width]")?.addEventListener("change",t=>{c.printerPaperWidth=Number(t.currentTarget.value)===80?80:58,S()}),document.querySelector("[data-connect-printer]")?.addEventListener("click",()=>{ns()}),document.querySelector("[data-thermal-print]")?.addEventListener("click",()=>{(async()=>{const t=await Rt(),a=t.orders.find(n=>n.id===c.receiptOrderId);if(!a)throw new Error("Receipt order not found.");const s=t.payments.filter(n=>n.orderId===a.id);await is(a,s)})().catch(t=>{c.printerPanelOpen=!0,c.printerError=t instanceof Error?t.message:"Bluetooth thermal print failed.",S()})}),document.querySelectorAll("[data-report-tab]").forEach(t=>{t.addEventListener("click",()=>{c.dailyReportTab=t.dataset.reportTab,S()})}),document.querySelectorAll("[data-maintenance-tab]").forEach(t=>{t.addEventListener("click",()=>{c.maintenanceTab=t.dataset.maintenanceTab,S()})})}function fs(){za(),document.querySelector("#login-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget),a=document.querySelector("#login-button");a&&(a.disabled=!0,a.textContent="Signing in...");try{const s=await ht(String(t.get("email")??""),String(t.get("password")??""));if(!s){c.loginError="Invalid email or password.",await S();return}c.currentUser=s,c.loginError="",await we("branch",String(s.branch||"Main Store")),t.get("remember")?localStorage.setItem(he,JSON.stringify({email:s.email,remembered:!0})):localStorage.removeItem(he),Dt().includes(c.tab)||(c.tab="dashboard"),await S()}catch(s){alert("Login Error: "+String(s?.message||s)),a&&(a.disabled=!1,a.textContent="Sign in")}})}function hs(){Ee&&window.clearInterval(Ee);const e=document.querySelector("[data-navbar-time]"),t=document.querySelector("[data-navbar-date]");if(!e||!t){Ee=void 0;return}const a=()=>{const s=Va();e.textContent=s.time,t.textContent=s.date};a(),Ee=window.setInterval(a,1e3)}function ct(e,t){return e?t.find(a=>a.name.toLowerCase()===e.category.toLowerCase())??t.find(a=>a.name==="Regular Clothes")??t[0]??null:null}function xe(e,t){return Math.max(1,Number(t.maxKg||e.maxKg||1))}function xt(e,t){return Object.fromEntries(t.filter(a=>a.serviceType==="order").map(a=>[a.id,Number(e.querySelector(`input[name="serviceQty-${a.id}"]`)?.value??0)]).filter(([,a])=>Number(a)>0))}function lt(e,t){const a=xt(e,t);return t.filter(s=>s.serviceType==="order"&&Number(a[s.id]??0)>0).map(s=>({...s,quantity:Number(a[s.id])}))}function Pt(e,t){return Object.fromEntries(t.filter(a=>a.serviceType==="addon").map(a=>[a.id,Number(e.querySelector(`input[name="addonQty-${a.id}"]`)?.value??0)]).filter(([,a])=>Number(a)>0))}function dt(e,t){const a=Pt(e,t);return t.filter(s=>s.serviceType==="addon"&&Number(a[s.id]??0)>0).map(s=>({...s,quantity:Number(a[s.id])}))}function gs(e){const t=document.querySelector("#order-form"),a=document.querySelector("#price-preview"),s=t?.querySelector('button[type="submit"]'),n=t?.querySelector('select[name="customerId"]'),r=t?.querySelector('input[name="customerName"]'),i=t?.querySelector('input[name="customerPhone"]'),l=t?.querySelector("[data-order-error]"),u=t?.querySelector('select[name="paymentMethod"]'),o=t?.querySelector(".gcash-reference"),d=t?.querySelector('input[name="paymentReference"]');let m=!1;const p=()=>{if(!n||!r||!i)return;const y=n.selectedOptions[0];r.value=y?.dataset.name??"",i.value=y?.dataset.phone??""},g=()=>{const y=u?.value==="gcash";o&&(o.hidden=!y),d&&(d.required=y,y||(d.value=""))},b=(y,N)=>{if(!t)return;const f=t.querySelector(`input[name="${y}"]`);f&&(f.value=String(Math.max(0,Number(f.value||0)+N)),f.closest(".qty-card")?.classList.toggle("is-selected",Number(f.value)>0),f.dispatchEvent(new Event("input",{bubbles:!0})))};t?.querySelectorAll(".qty-control input").forEach(y=>{y.addEventListener("input",()=>{y.value=String(Math.max(0,Number(y.value||0))),y.closest(".qty-card")?.classList.toggle("is-selected",Number(y.value)>0)})}),t?.querySelectorAll("[data-qty-card]").forEach(y=>{y.addEventListener("click",N=>{const f=N.target;f.closest("input")||f.closest("button")||b(y.dataset.qtyCard??"",1)})}),t?.querySelectorAll("[data-qty-plus]").forEach(y=>{y.addEventListener("click",()=>b(y.dataset.qtyPlus??"",1))}),t?.querySelectorAll("[data-qty-minus]").forEach(y=>{y.addEventListener("click",()=>b(y.dataset.qtyMinus??"",-1))});const E=()=>{if(!t||!a)return;const y=lt(t,e.services),N=y[0],f=ct(N,e.categories),A=dt(t,e.services);if(!y.length||!N||!f){s&&(s.disabled=!0),l&&(l.hidden=!m,l.textContent=m?"Please select at least one service quantity.":""),a.innerHTML='<div class="preview-total"><span>Total amount</span><strong>PHP 0.00</strong></div>';return}const O=qe(y,f,xe(N,f),A),R=O.serviceLines.map(q=>`${q.name} x${q.quantity}`),U=O.extras.map(q=>`${Z(q.name)} x${q.quantity}`);s&&(s.disabled=!1),l&&(l.hidden=!0,l.textContent=""),a.classList.remove("has-error"),a.innerHTML=`
      <div class="preview-line"><span>Services${R.length?` (${v(R.join(", "))})`:""}</span><strong>${T(O.price)}</strong></div>
      ${O.extraServiceAmount>0?`<div class="preview-line"><span>Extra services${U.length?` (${v(U.join(", "))})`:""}</span><strong>${T(O.extraServiceAmount)}</strong></div>`:""}
      <div class="preview-total"><span>Total amount</span><strong>${T(O.totalAmount)}</strong></div>
    `};n?.addEventListener("change",p),u?.addEventListener("change",g),g(),t?.addEventListener("input",E),t?.addEventListener("change",E),E(),t?.addEventListener("submit",async y=>{y.preventDefault(),m=!0;const N=new FormData(t),f=lt(t,e.services),A=f[0],O=ct(A,e.categories),R=dt(t,e.services);if(!f.length||!A||!O){l&&(l.hidden=!1,l.textContent="Please select at least one service quantity.");return}const U=f.map(x=>`${x.name} x${x.quantity}`).join(", "),q=qe(f,O,xe(A,O),R);if(confirm(`Save this order?

Services: ${U}
Total: ${T(q.totalAmount)}`))try{const x=await ba({customerId:Number(N.get("customerId"))||void 0,customerName:String(N.get("customerName")??""),customerPhone:String(N.get("customerPhone")??"")||null,serviceQuantities:xt(t,e.services),branch:e.branch,itemCategoryId:O?.id,weightKg:A&&O?xe(A,O):void 0,addonQuantities:Pt(t,e.services),paidAmount:Number(N.get("paidAmount")??0),paymentMethod:String(N.get("paymentMethod")??"cash"),paymentReference:String(N.get("paymentReference")??"")||null,notes:String(N.get("notes")??"")||null});c.receiptOrderId=x.id,await S()}catch(x){l&&(l.hidden=!1,l.textContent=x instanceof Error?x.message:"Order could not be saved.")}}),document.querySelectorAll(".advance-form").forEach(y=>{y.addEventListener("submit",async N=>{N.preventDefault();const f=new FormData(y);await Sa(Number(y.dataset.orderId),Number(f.get("assignedStaffId"))||null),await S()})}),document.querySelectorAll(".payment-form").forEach(y=>{const N=y.querySelector('select[name="method"]'),f=y.querySelector('input[name="reference"]'),A=()=>{const O=N?.value==="gcash";f&&(f.hidden=!O,f.required=O,O||(f.value=""))};N?.addEventListener("change",A),A(),y.addEventListener("submit",async O=>{O.preventDefault();const R=new FormData(y),U=Number(R.get("amount")),q=String(R.get("method")),x=String(R.get("reference")??"")||null;confirm(`Confirm payment of ${T(U)} via ${q.toUpperCase()}?`)&&(await Et(Number(y.dataset.orderId),{amount:U,method:q,reference:x}),await S())})}),document.querySelectorAll("[data-cancel-order]").forEach(y=>{y.addEventListener("click",async()=>{const N=Number(y.dataset.cancelOrder);if(Number.isFinite(N)&&confirm("Cancel this order? (No payment will be refunded.)"))try{c.receiptOrderId===N&&(c.receiptOrderId=0),await Ta(N),await S()}catch(f){alert(f instanceof Error?f.message:"Cancel failed.")}})}),document.querySelectorAll("[data-delete-order]").forEach(y=>{y.addEventListener("click",async()=>{const N=Number(y.dataset.deleteOrder);if(Number.isFinite(N)&&confirm("Delete this paid order and update sales?"))try{c.receiptOrderId===N&&(c.receiptOrderId=0),await Na(N),await S()}catch(f){alert(f instanceof Error?f.message:"Delete failed.")}})})}function bs(e){document.querySelector("#service-form")?.addEventListener("submit",async t=>{t.preventDefault();const a=new FormData(t.currentTarget),s=a.get("id")?Number(a.get("id")):void 0;await at({id:s,name:String(a.get("name")??""),description:String(a.get("description")??"")||null,category:String(a.get("category")??""),serviceType:String(a.get("serviceType")??"order"),price:Number(a.get("price")??0),maxKg:Number(a.get("maxKg")??0),dryingMinutes:Number(a.get("dryingMinutes"))||null,includes:a.getAll("includes").map(String).filter(Boolean),additionalCharge:0,turnaroundHours:Number(a.get("turnaroundHours")??24),isActive:1}),await S()}),document.querySelectorAll(".edit-service-btn").forEach(t=>{t.addEventListener("click",()=>{const a=Number(t.dataset.id),s=e.find(r=>r.id===a),n=document.querySelector("#service-form");s&&n&&(n.querySelector("[name=id]").value=String(s.id),n.querySelector("[name=name]").value=s.name,n.querySelector("[name=category]").value=s.category,n.querySelector("[name=serviceType]").value=s.serviceType,n.querySelector("[name=price]").value=String(s.price),n.querySelector("[name=maxKg]").value=String(s.maxKg),n.querySelector("[name=dryingMinutes]").value=s.dryingMinutes?String(s.dryingMinutes):"",n.querySelectorAll('input[name="includes"]').forEach(r=>{r.checked=s.includes.includes(r.value)}),n.querySelector("[name=turnaroundHours]").value=String(s.turnaroundHours),n.querySelector("[name=description]").value=s.description??"",window.scrollTo({top:0,behavior:"smooth"}))})}),document.querySelectorAll(".deactivate-service-btn, .activate-service-btn").forEach(t=>{t.addEventListener("click",async()=>{const a=Number(t.dataset.id),s=e.find(n=>n.id===a);if(s){const n=s.isActive?0:1;await at({id:s.id,name:s.name,description:s.description,category:s.category,serviceType:s.serviceType,price:s.price,maxKg:s.maxKg,dryingMinutes:s.dryingMinutes,includes:s.includes,additionalCharge:s.additionalCharge,turnaroundHours:s.turnaroundHours,isActive:n}),await S()}})}),document.querySelector("#category-form")?.addEventListener("submit",async t=>{t.preventDefault();const a=new FormData(t.currentTarget);await ha({name:String(a.get("name")??""),maxKg:Number(a.get("maxKg")??0),additionalFee:Number(a.get("additionalFee")??0),isActive:1}),await S()})}function Es(e){const t=document.querySelector("#expense-form"),a=t?.querySelector('input[name="disbursementType"]'),s=t?.querySelector(".expense-date-field"),n=t?.querySelector(".expense-month-field"),r=t?.querySelector('input[name="expenseDate"]'),i=t?.querySelector('input[name="expenseMonth"]'),l=u=>{!t||!a||!r||!i||(a.value=u,t.querySelectorAll("[data-expense-type]").forEach(o=>{o.classList.toggle("is-active",o.dataset.expenseType===u)}),s&&(s.hidden=u==="monthly"),n&&(n.hidden=u!=="monthly"),r.required=u==="daily",i.required=u==="monthly",u==="monthly"&&!i.value&&(i.value=Fe()),u==="daily"&&!r.value&&(r.value=H()))};t?.querySelectorAll("[data-expense-type]").forEach(u=>{u.addEventListener("click",()=>l(u.dataset.expenseType==="monthly"?"monthly":"daily"))}),l("daily"),t?.addEventListener("submit",async u=>{u.preventDefault();const o=new FormData(u.currentTarget),d=Number(o.get("id")||0),m=String(o.get("disbursementType")??"daily")==="monthly"?"monthly":"daily",p=String(o.get("expenseMonth")??Fe()),g={expenseDate:m==="monthly"?`${p}-01`:String(o.get("expenseDate")??""),disbursementType:m,name:String(o.get("name")??""),category:String(o.get("category")??""),description:String(o.get("description")??""),amount:Number(o.get("amount")??0)};d?await Oa(d,g):await Da(g),await S()}),document.querySelectorAll(".edit-expense-btn").forEach(u=>{u.addEventListener("click",()=>{const o=e.find(m=>m.id===Number(u.dataset.id));if(!o||!t)return;t.querySelector("[name=id]").value=String(o.id),t.querySelector("[name=expenseDate]").value=o.expenseDate,t.querySelector("[name=expenseMonth]").value=At(o.expenseDate),l(ee(o)),t.querySelector("[name=amount]").value=String(o.amount),t.querySelector("[name=name]").value=o.name,t.querySelector("[name=category]").value=o.category,t.querySelector("[name=description]").value=o.description??"";const d=t.querySelector('button[type="submit"]');d&&(d.textContent="Update expense"),t.scrollIntoView({behavior:"smooth",block:"start"})})}),document.querySelectorAll(".delete-expense-btn").forEach(u=>{u.addEventListener("click",async()=>{if(c.currentUser?.role!=="admin")return;const o=Number(u.dataset.id);!Number.isFinite(o)||!confirm("Delete this disbursement?")||(await xa(o),await S())})}),document.querySelector("#fold-form")?.addEventListener("submit",async u=>{u.preventDefault();const o=new FormData(u.currentTarget);await La({orderTicket:String(o.get("orderTicket")??""),staffName:String(o.get("staffName")??""),foldCount:Number(o.get("foldCount")??1),rate:Number(o.get("rate")??5)}),await S()})}function Ss(e,t,a,s,n,r){document.querySelector("#generate-report")?.addEventListener("click",()=>{c.reportPreview=Se(),S()});const i=document.querySelector("#sales-form");i?.addEventListener("submit",async b=>{b.preventDefault();const E=new FormData(b.currentTarget);await Ia({id:Number(E.get("id")||0)||void 0,saleDate:String(E.get("saleDate")??""),cashAmount:Number(E.get("cashAmount")??0),gcashAmount:Number(E.get("gcashAmount")??0),notes:String(E.get("notes")??"")}),await S()}),document.querySelectorAll(".edit-sale-btn").forEach(b=>{b.addEventListener("click",()=>{const E=a.find(N=>N.id===Number(b.dataset.id));if(!E||!i)return;i.querySelector("[name=id]").value=String(E.id),i.querySelector("[name=saleDate]").value=E.saleDate,i.querySelector("[name=cashAmount]").value=String(E.cashAmount),i.querySelector("[name=gcashAmount]").value=String(E.gcashAmount),i.querySelector("[name=notes]").value=E.notes??"";const y=i.querySelector('button[type="submit"]');y&&(y.textContent="Update daily sale"),i.scrollIntoView({behavior:"smooth",block:"start"})})}),document.querySelectorAll(".delete-sale-btn").forEach(b=>{b.addEventListener("click",async()=>{if(c.currentUser?.role!=="admin")return;const E=Number(b.dataset.id);!Number.isFinite(E)||!confirm("Delete this daily sale?")||(await qa(E),await S())})});const l=document.querySelector("[data-date-from]"),u=document.querySelector("[data-date-to]");document.querySelectorAll("[data-date-scope]").forEach(b=>{b.addEventListener("change",()=>{if(!b.checked||!l||!u)return;const E=new Date,y=ge(E),N=new Date(E);b.value==="week"&&N.setDate(E.getDate()-6),b.value==="month"&&N.setDate(1),b.value!=="custom"&&(l.value=b.value==="today"?y:ge(N),u.value=y)})});const o=b=>{const E=f=>String(f??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;"),y=f=>f==="Sales Report"?[110,125,150,215,95,95,105,105]:f==="Disbursement"?[115,115,90,150,150,220,105]:f==="Fold Count"?[220,125]:f==="Revolving Daily Summary"?[115,105,120,115]:f==="Revolving History"?[115,96,140,96,110,180,120]:[155,125,125,125,95,95,115,115];return`<?xml version="1.0"?>
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
  ${b.map(f=>{const A=y(f.name).map(R=>`<Column ss:Width="${R}" ss:AutoFitWidth="0"/>`).join(""),O=f.rows.map(R=>{if(!R.length)return'<Row ss:Height="10" ss:StyleID="BorderRow"><Cell ss:StyleID="BorderCell"><Data ss:Type="String">&nbsp;</Data></Cell></Row>';const U=R[0]==="Type"||R[0]==="Summary"||R[0]==="Sales Summary"||R[0]==="Disbursement Summary"||R[0]==="Staff"||R[0]==="Date of Sales"||R[0]==="Date"||R[0]==="Date/Month",q=U?"HeaderRow":"BorderRow",x=U?"HeaderCell":"BorderCell",F=U?26:22,M=R.map(_=>`<Cell ss:StyleID="${x}"><Data ss:Type="${typeof _=="number"?"Number":"String"}">${E(_)}</Data></Cell>`).join("");return`<Row ss:Height="${F}" ss:StyleID="${q}">${M}</Row>`}).join("");return`
        <Worksheet ss:Name="${E(f.name)}">
          <Table>
            ${A}
            ${O}
          </Table>
        </Worksheet>`}).join("")}
</Workbook>`},d=()=>{const b=Se(),E=$t(e,t,a,s,n,r,b),y=[];if(E.selectedTypes.has("sales")){const A=E.salesRows(),O=[["Ticket","Customer","Cash","GCash","Total Payment"],...A.transactions.map(R=>[R.ticket,R.customer,R.cash,R.gcash,R.total]),[],["Cash from Orders","GCash from Orders","Sales from Orders"],[A.orderCashTotal,A.orderGcashTotal,A.orderCashTotal+A.orderGcashTotal],[],["Cash Whole Sale","GCash Whole Sale","Whole Sale of Day"],[A.manualCashTotal,A.manualGcashTotal,A.manualCashTotal+A.manualGcashTotal],[],["Total Cash","Total GCash","Total Sales"],[A.totalCash,A.totalGcash,A.totalSales]];y.push({name:"Sales Report",rows:O})}E.selectedTypes.has("disbursement")&&y.push({name:"Disbursement",rows:E.disbursementRows().rows}),E.selectedTypes.has("fold_count")&&y.push({name:"Fold Count",rows:E.foldCountRows().rows}),E.selectedTypes.has("revolving_fund")&&(y.push({name:"Revolving Daily Summary",rows:E.revolvingDailySummaryRows().rows}),y.push({name:"Revolving History",rows:E.revolvingHistoryRows().rows})),E.selectedTypes.has("summary")&&y.push({name:"Summary",rows:E.summaryRows()});const N=o(y.length?y:[{name:"Summary",rows:E.summaryRows()}]),f=`laba101-report-${b.from}-to-${b.to}.xls`;return new File([N],f,{type:"application/vnd.ms-excel"})},m=async()=>{const b=d();if(!C.isNativePlatform())return{fileName:b.name,uri:""};const E=await b.text(),y=b.name;await ze.writeFile({path:y,data:E,directory:Te.External,encoding:Pe.UTF8});const{uri:N}=await ze.getUri({path:y,directory:Te.External});return{fileName:b.name,uri:N}},p=()=>{const b=d(),E=Se(),y=`laba101-report-${E.from}-to-${E.to}.xls`,N=b,f=URL.createObjectURL(N),A=document.createElement("a");return A.href=f,A.download=y,document.body.appendChild(A),A.click(),setTimeout(()=>{A.remove(),URL.revokeObjectURL(f)},1e3),y},g=async b=>{const E=document.querySelector(b==="export"?"#export-report":"#email-report");E&&(E.disabled=!0,E.textContent=b==="export"?"Exporting...":"Sending...");try{if(b==="export")if(C.isNativePlatform()){const y=await m();alert(`Report exported as "${y.fileName}".`)}else{const y=p();alert(`Report saved: ${y}`)}else{const y=await yt("report_email")||"";if(!y){alert("Please configure a report email in Settings first.");return}const N=Se(),f=`Laba101 report ${N.from} to ${N.to}`;if(C.isNativePlatform()){const A=await m();try{await Yt.share({title:f,text:`Please find the attached Laba101 report file: ${A.fileName}`,files:[A.uri],dialogTitle:"Send report via email"}),alert(`Report saved and shared as "${A.fileName}".`)}catch(O){const R=String(O).toLowerCase();if(R.includes("share canceled")||R.includes("canceled"))alert(`Report saved as "${A.fileName}".`);else throw O}}else{const A=p(),O=`Hi,

Please find the attached Laba101 report file: ${A}

Date range: ${N.from} to ${N.to}`,R=`mailto:${y}?subject=${encodeURIComponent(f)}&body=${encodeURIComponent(O)}`;setTimeout(()=>{window.location.href=R},800),alert(`Report downloaded as "${A}".
Your email app will open — please attach the file and send.`)}}}catch(y){alert("Failed: "+String(y))}finally{E&&(E.disabled=!1,E.textContent=b==="export"?"Export Excel":"Send to Email")}};document.querySelector("#export-report")?.addEventListener("click",async()=>{await g("export")}),document.querySelector("#email-report")?.addEventListener("click",async()=>{await g("email")})}function ws(){document.querySelector("#order-queue-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);c.orderSearch=String(t.get("orderSearch")??"").trim(),c.orderDateFilter=String(t.get("orderDateFilter")??"").trim(),c.orderPaymentFilter=String(t.get("orderPaymentFilter")??"").trim(),S()}),document.querySelector("#order-queue-clear")?.addEventListener("click",()=>{c.orderSearch="",c.orderDateFilter="",c.orderPaymentFilter="",S()}),document.querySelector("#archived-order-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);c.archivedOrderSearch=String(t.get("archivedOrderSearch")??"").trim(),S()}),document.querySelector("#archived-order-clear")?.addEventListener("click",()=>{c.archivedOrderSearch="",S()})}function Ts(){document.querySelector("#customer-search-form")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);c.customerSearch=String(t.get("customerSearch")??"").trim(),S()}),document.querySelector("#customer-search-clear")?.addEventListener("click",()=>{c.customerSearch="",S()})}function Ns(){document.querySelector("#machine-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await ka({machineName:String(t.get("machineName")??""),machineType:String(t.get("machineType")),status:String(t.get("status")),branch:String(t.get("branch")??"")}),await S()}),document.querySelector("#subcleaning-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=e.currentTarget.querySelector('button[type="submit"]');t&&(t.disabled=!0,t.textContent="Starting...");const a=new FormData(e.currentTarget),s=a.getAll("machineIds").map(Number);if(!s.length){alert("Please select at least one machine to clean."),t&&(t.disabled=!1,t.textContent="Start Cleaning");return}await _a({date:String(a.get("date")??""),machineIds:s,cleaningStatus:String(a.get("cleaningStatus")??""),notes:String(a.get("notes")??""),branch:String(a.get("branch")??"")}),await S()}),document.querySelectorAll(".complete-cleaning-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.machineId),a=e.dataset.branch??"";e.disabled=!0,e.textContent="Completing...",await Ba(t,a),await S()})}),document.querySelectorAll(".deactivate-machine-btn, .activate-machine-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.id),a=e.classList.contains("deactivate-machine-btn");await Ua(t,a?"inactive":"available"),await S()})})}function As(e){const t=document.querySelector("#add-staff-modal"),a=document.querySelector("#open-add-staff-modal"),s=document.querySelector("#close-add-staff-modal"),n=document.querySelector("#staff-form"),r=()=>{n?.reset(),n&&(n.querySelector("[name=id]").value="");const l=document.querySelector("#add-staff-title");l&&(l.textContent="Add staff member"),t?.removeAttribute("hidden")},i=()=>{t?.setAttribute("hidden",""),n?.reset()};a?.addEventListener("click",r),s?.addEventListener("click",i),t?.addEventListener("click",l=>{l.target===t&&i()}),document.querySelectorAll(".edit-staff-btn").forEach(l=>{l.addEventListener("click",()=>{const u=Number(l.dataset.id),o=e.find(d=>d.id===u);if(o&&n){n.querySelector("[name=id]").value=String(o.id),n.querySelector("[name=name]").value=o.name,n.querySelector("[name=email]").value=o.email,n.querySelector("[name=password]").value=o.password,n.querySelector("[name=role]").value=o.role,n.querySelector("[name=branch]").value=o.branch;const d=document.querySelector("#add-staff-title");d&&(d.textContent="Edit staff member"),t?.removeAttribute("hidden")}})}),document.querySelectorAll(".deactivate-staff-btn, .activate-staff-btn").forEach(l=>{l.addEventListener("click",async()=>{const u=Number(l.dataset.id),o=e.find(d=>d.id===u);o&&(await tt(u,{isActive:o.isActive!==0?0:1}),await S())})}),n?.addEventListener("submit",async l=>{l.preventDefault();const u=document.querySelector("#staff-save-btn");u&&(u.disabled=!0,u.textContent="Saving...");const o=new FormData(n),d=o.get("id")?Number(o.get("id")):void 0,m=String(o.get("name")??"").trim(),p=String(o.get("email")??"").trim(),g=String(o.get("password")??"password")||"password",b=String(o.get("role")),E=String(o.get("branch")??"");if(!m||!p){alert("Name and email are required."),u&&(u.disabled=!1,u.textContent="Save staff member");return}try{d?await tt(d,{name:m,email:p,password:g,role:b,branch:E}):await va({name:m,email:p,password:g,role:b,branch:E}),i(),await S()}catch{alert("Failed to save staff. The email may already be in use."),u&&(u.disabled=!1,u.textContent="Save staff member")}})}function Ls(){document.querySelector("#settings-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await we("branch",String(t.get("branch")??"Main Store")),await we("fold_rate",String(t.get("foldRate")??"5")),String(t.get("reportEmail")??"")&&await we("report_email",String(t.get("reportEmail"))),alert("Settings saved successfully!"),await S()})}await da();const ut=localStorage.getItem(he);if(ut)try{const e=JSON.parse(ut);if(e.email&&e.remembered){const t=await ht(e.email,"password")??null;c.currentUser=t}}catch{localStorage.removeItem(he)}function Cs(e,t,a,s){const n=e.filter(g=>g.status==="revolving").reduce((g,b)=>g+b.cashAmount,0),r=t.filter(g=>g.type==="add").reduce((g,b)=>g+b.amount,0),i=t.filter(g=>g.type==="disbursement").reduce((g,b)=>g+b.amount,0),l=n+r-i,u=c.revolvingHistoryFrom||"0000-01-01",o=c.revolvingHistoryTo||"9999-12-31",d=t.filter(g=>{const b=X(g.createdAt);return b>=u&&b<=o}),m=e.map(g=>{const b=Nt(g.saleDate,a,s,g.cashAmount),E=g.status==="revolving"?'<span class="ok">Revolving</span>':g.status==="endorsed"?`<span class="warn">Endorsed to ${v(g.endorsedTo)}</span>`:'<span class="meta">Pending</span>',y=g.status!=="revolving"&&g.status!=="endorsed"?`<div class="row-actions">
          <button class="primary revolving-btn" data-id="${g.id}">Revolving</button>
          <button class="secondary endorsed-btn" data-id="${g.id}" data-date="${oe(g.saleDate)}">Endorsed</button>
        </div>`:"";return[`<strong>${v(oe(g.saleDate))}</strong>`,`<strong class="ok">${T(b)}</strong>`,E,g.statusUpdatedAt?v(oe(g.statusUpdatedAt)):"-",y]}),p=d.map(g=>[Xa(g.createdAt),`<strong>${v(g.revolvingNumber)}</strong>`,v(g.name),`<strong class="${g.type==="disbursement"?"warn":"ok"}">${g.type==="disbursement"?"-":"+"}${T(g.amount)}</strong>`,v(g.category),v(g.description||"-"),`<span class="${g.type==="add"?"ok":"warn"}">${g.type==="add"?"Add Revolving Fund":"Disbursement"}</span>`]);return`
    <section class="grid content full">
      <div class="panel-header" style="display: flex; gap: 16px; margin-bottom: 24px; align-items: center;">
        <button class="primary" id="add-revolving-fund-btn">Add Revolving Fund</button>
        <button class="secondary" id="revolving-disbursement-btn">Disbursement</button>
      </div>

      <article class="panel">
        <div style="background-color: #061a42; color: white; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
          <p style="font-size: 12px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin: 0 0 8px 0;">Revolving Fund Total</p>
          <p style="font-size: 32px; font-weight: 800; margin: 0;">${T(l)}</p>
        </div>
        ${P("Daily Summary","Cash on hand per day (order cash + manual cash − disbursements)")}
        ${Le(["Date of Sales","Cash on Hand","Status","Date Update","Action"],m,"data-table revolving-summary-datatable")}
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
        ${Le(["Date","Disbursement #","Name","Amount","Category","Description","Type"],p,"data-table revolving-history-datatable")}
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
  `}function $s(){document.querySelector("#revolving-history-filters")?.addEventListener("submit",async d=>{d.preventDefault();const m=new FormData(d.currentTarget);c.revolvingHistoryFrom=String(m.get("revolvingHistoryFrom")??"").trim(),c.revolvingHistoryTo=String(m.get("revolvingHistoryTo")??"").trim(),await S()}),document.querySelector("#revolving-history-clear")?.addEventListener("click",async()=>{c.revolvingHistoryFrom="",c.revolvingHistoryTo="",await S()}),document.querySelectorAll(".revolving-btn").forEach(d=>{d.addEventListener("click",async()=>{c.revolvingModalOpen=!0,c.revolvingSaleId=Number(d.dataset.id),await S()})});const e=document.getElementById("confirm-revolving-btn");e&&e.addEventListener("click",async()=>{await nt(c.revolvingSaleId,"revolving",null,new Date().toISOString()),c.revolvingModalOpen=!1,await S()});const t=document.getElementById("close-revolving-modal");t&&t.addEventListener("click",async()=>{c.revolvingModalOpen=!1,await S()}),document.querySelectorAll(".endorsed-btn").forEach(d=>{d.addEventListener("click",async()=>{c.endorseModalOpen=!0,c.endorseSaleId=Number(d.dataset.id),c.endorseSaleDate=d.dataset.date??"",await S()})});const a=document.getElementById("close-endorse-modal");a&&a.addEventListener("click",async()=>{c.endorseModalOpen=!1,await S()});const s=document.getElementById("endorse-form");s&&s.addEventListener("submit",async d=>{d.preventDefault();const m=new FormData(s),p=String(m.get("endorsedTo")??"").trim();p&&(await nt(c.endorseSaleId,"endorsed",p,new Date().toISOString()),c.endorseModalOpen=!1,await S())});const n=document.getElementById("add-revolving-fund-btn");n&&n.addEventListener("click",async()=>{c.addFundModalOpen=!0,await S()});const r=document.getElementById("close-add-fund-modal");r&&r.addEventListener("click",async()=>{c.addFundModalOpen=!1,await S()});const i=document.getElementById("add-fund-form");i&&i.addEventListener("submit",async d=>{d.preventDefault();const m=new FormData(i);await rt({name:String(m.get("name")??"").trim(),amount:Number(m.get("amount")??0),category:"Add Revolving Fund",description:null,type:"add",createdAt:new Date().toISOString()}),c.addFundModalOpen=!1,await S()});const l=document.getElementById("revolving-disbursement-btn");l&&l.addEventListener("click",async()=>{c.disbursementModalOpen=!0,await S()});const u=document.getElementById("close-disbursement-modal");u&&u.addEventListener("click",async()=>{c.disbursementModalOpen=!1,await S()});const o=document.getElementById("disbursement-form");o&&o.addEventListener("submit",async d=>{d.preventDefault();const m=new FormData(o);await rt({name:String(m.get("name")??"").trim(),amount:Number(m.get("amount")??0),category:String(m.get("category")??"").trim(),description:String(m.get("description")??"").trim(),type:"disbursement",expenseDate:H(),createdAt:new Date().toISOString()}),c.disbursementModalOpen=!1,await S()})}await S();export{Pe as E,ke as W,Bt as b};
