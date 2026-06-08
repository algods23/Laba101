(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=a(n);fetch(n.href,r)}})();var ce;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(ce||(ce={}));class De extends Error{constructor(t,a,s){super(t),this.message=t,this.code=a,this.data=s}}const qt=e=>{var t,a;return e?.androidBridge?"android":!((a=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},Ft=e=>{const t=e.CapacitorCustomPlatform||null,a=e.Capacitor||{},s=a.Plugins=a.Plugins||{},n=()=>t!==null?t.name:qt(e),r=()=>n()!=="web",i=v=>{const y=l.get(v);return!!(y?.platforms.has(n())||d(v))},d=v=>{var y;return(y=a.PluginHeaders)===null||y===void 0?void 0:y.find(h=>h.name===v)},u=v=>e.console.error(v),l=new Map,o=(v,y={})=>{const h=l.get(v);if(h)return console.warn(`Capacitor plugin "${v}" already registered. Cannot register plugins twice.`),h.proxy;const f=n(),E=d(v);let w;const I=async()=>(!w&&f in y?w=typeof y[f]=="function"?w=await y[f]():w=y[f]:t!==null&&!w&&"web"in y&&(w=typeof y.web=="function"?w=await y.web():w=y.web),w),p=(R,O)=>{var k,U;if(E){const B=E?.methods.find(j=>O===j.name);if(B)return B.rtype==="promise"?j=>a.nativePromise(v,O.toString(),j):(j,ye)=>a.nativeCallback(v,O.toString(),j,ye);if(R)return(k=R[O])===null||k===void 0?void 0:k.bind(R)}else{if(R)return(U=R[O])===null||U===void 0?void 0:U.bind(R);throw new De(`"${v}" plugin is not implemented on ${f}`,ce.Unimplemented)}},b=R=>{let O;const k=(...U)=>{const B=I().then(j=>{const ye=p(j,R);if(ye){const g=ye(...U);return O=g?.remove,g}else throw new De(`"${v}.${R}()" is not implemented on ${f}`,ce.Unimplemented)});return R==="addListener"&&(B.remove=async()=>O()),B};return k.toString=()=>`${R.toString()}() { [capacitor code] }`,Object.defineProperty(k,"name",{value:R,writable:!1,configurable:!1}),k},A=b("addListener"),L=b("removeListener"),D=(R,O)=>{const k=A({eventName:R},O),U=async()=>{const j=await k;L({eventName:R,callbackId:j},O)},B=new Promise(j=>k.then(()=>j({remove:U})));return B.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await U()},B},P=new Proxy({},{get(R,O){switch(O){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return E?D:A;case"removeListener":return L;default:return b(O)}}});return s[v]=P,l.set(v,{name:v,proxy:P,platforms:new Set([...Object.keys(y),...E?[f]:[]])}),P};return a.convertFileSrc||(a.convertFileSrc=v=>v),a.getPlatform=n,a.handleError=u,a.isNativePlatform=r,a.isPluginAvailable=i,a.registerPlugin=o,a.Exception=De,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},kt=e=>e.Capacitor=Ft(e),$=kt(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),re=$.registerPlugin;class Ue{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,a){let s=!1;this.listeners[t]||(this.listeners[t]=[],s=!0),this.listeners[t].push(a);const r=this.windowListeners[t];r&&!r.registered&&this.addWindowListener(r),s&&this.sendRetainedArgumentsForEvent(t);const i=async()=>this.removeListener(t,a);return Promise.resolve({remove:i})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,a,s){const n=this.listeners[t];if(!n){if(s){let r=this.retainedEventArguments[t];r||(r=[]),r.push(a),this.retainedEventArguments[t]=r}return}n.forEach(r=>r(a))}hasListeners(t){var a;return!!(!((a=this.listeners[t])===null||a===void 0)&&a.length)}registerWindowListener(t,a){this.windowListeners[a]={registered:!1,windowEventName:t,pluginEventName:a,handler:s=>{this.notifyListeners(a,s)}}}unimplemented(t="not implemented"){return new $.Exception(t,ce.Unimplemented)}unavailable(t="not available"){return new $.Exception(t,ce.Unavailable)}async removeListener(t,a){const s=this.listeners[t];if(!s)return;const n=s.indexOf(a);this.listeners[t].splice(n,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const a=this.retainedEventArguments[t];a&&(delete this.retainedEventArguments[t],a.forEach(s=>{this.notifyListeners(t,s)}))}}const Ye=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Je=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class Mt extends Ue{async getCookies(){const t=document.cookie,a={};return t.split(";").forEach(s=>{if(s.length<=0)return;let[n,r]=s.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");n=Je(n).trim(),r=Je(r).trim(),a[n]=r}),a}async setCookie(t){try{const a=Ye(t.key),s=Ye(t.value),n=t.expires?`; expires=${t.expires.replace("expires=","")}`:"",r=(t.path||"/").replace("path=",""),i=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${a}=${s||""}${n}; path=${r}; ${i};`}catch(a){return Promise.reject(a)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const a of t)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}re("CapacitorCookies",{web:()=>new Mt});const Ut=async e=>new Promise((t,a)=>{const s=new FileReader;s.onload=()=>{const n=s.result;t(n.indexOf(",")>=0?n.split(",")[1]:n)},s.onerror=n=>a(n),s.readAsDataURL(e)}),Bt=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(n=>n.toLocaleLowerCase()).reduce((n,r,i)=>(n[r]=e[t[i]],n),{})},_t=(e,t=!0)=>e?Object.entries(e).reduce((s,n)=>{const[r,i]=n;let d,u;return Array.isArray(i)?(u="",i.forEach(l=>{d=t?encodeURIComponent(l):l,u+=`${r}=${d}&`}),u.slice(0,-1)):(d=t?encodeURIComponent(i):i,u=`${r}=${d}`),`${s}&${u}`},"").substr(1):null,jt=(e,t={})=>{const a=Object.assign({method:e.method||"GET",headers:e.headers},t),n=Bt(e.headers)["content-type"]||"";if(typeof e.data=="string")a.body=e.data;else if(n.includes("application/x-www-form-urlencoded")){const r=new URLSearchParams;for(const[i,d]of Object.entries(e.data||{}))r.set(i,d);a.body=r.toString()}else if(n.includes("multipart/form-data")||e.data instanceof FormData){const r=new FormData;if(e.data instanceof FormData)e.data.forEach((d,u)=>{r.append(u,d)});else for(const d of Object.keys(e.data))r.append(d,e.data[d]);a.body=r;const i=new Headers(a.headers);i.delete("content-type"),a.headers=i}else(n.includes("application/json")||typeof e.data=="object")&&(a.body=JSON.stringify(e.data));return a};class Ht extends Ue{async request(t){const a=jt(t,t.webFetchExtra),s=_t(t.params,t.shouldEncodeUrlParams),n=s?`${t.url}?${s}`:t.url,r=await fetch(n,a),i=r.headers.get("content-type")||"";let{responseType:d="text"}=r.ok?t:{};i.includes("application/json")&&(d="json");let u,l;switch(d){case"arraybuffer":case"blob":l=await r.blob(),u=await Ut(l);break;case"json":u=await r.json();break;default:u=await r.text()}const o={};return r.headers.forEach((v,y)=>{o[y]=v}),{data:u,headers:o,status:r.status,url:r.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}re("CapacitorHttp",{web:()=>new Ht});var Qe;(function(e){e.Dark="DARK",e.Light="LIGHT",e.Default="DEFAULT"})(Qe||(Qe={}));var ze;(function(e){e.StatusBar="StatusBar",e.NavigationBar="NavigationBar"})(ze||(ze={}));class Wt extends Ue{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}re("SystemBars",{web:()=>new Wt});const Xt="modulepreload",Kt=function(e){return"/"+e},Ze={},Be=function(t,a,s){let n=Promise.resolve();if(a&&a.length>0){let u=function(l){return Promise.all(l.map(o=>Promise.resolve(o).then(v=>({status:"fulfilled",value:v}),v=>({status:"rejected",reason:v}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),d=i?.nonce||i?.getAttribute("nonce");n=u(a.map(l=>{if(l=Kt(l),l in Ze)return;Ze[l]=!0;const o=l.endsWith(".css"),v=o?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${v}`))return;const y=document.createElement("link");if(y.rel=o?"stylesheet":Xt,o||(y.as="script"),y.crossOrigin="",y.href=l,d&&y.setAttribute("nonce",d),document.head.appendChild(y),o)return new Promise((h,f)=>{y.addEventListener("load",h),y.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(i){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=i,window.dispatchEvent(d),!d.defaultPrevented)throw i}return n.then(i=>{for(const d of i||[])d.status==="rejected"&&r(d.reason);return t().catch(r)})};function Gt(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,a){return new Proxy({},{get(s,n){return(r,i,d)=>{const u=e.Capacitor.Plugins[a];if(u===void 0){d(new Error(`Capacitor plugin ${a} not found`));return}if(typeof u[n]!="function"){d(new Error(`Method ${n} not found in Capacitor plugin ${a}`));return}(async()=>{try{const l=await u[n](r);i(l)}catch(l){d(l)}})()}}})}})}function Vt(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,a){return e.cordova.plugins[a]}})}function Yt(e=!1){typeof window>"u"||(window.CapacitorUtils=window.CapacitorUtils||{},window.Capacitor!==void 0&&!e?Gt(window):window.cordova!==void 0&&Vt(window))}var Ae;(function(e){e.Documents="DOCUMENTS",e.Data="DATA",e.Library="LIBRARY",e.Cache="CACHE",e.External="EXTERNAL",e.ExternalStorage="EXTERNAL_STORAGE",e.ExternalCache="EXTERNAL_CACHE",e.LibraryNoCloud="LIBRARY_NO_CLOUD",e.Temporary="TEMPORARY"})(Ae||(Ae={}));var qe;(function(e){e.UTF8="utf8",e.ASCII="ascii",e.UTF16="utf16"})(qe||(qe={}));const et=re("Filesystem",{web:()=>Be(()=>import("./web-BDbC3Eg4.js"),[]).then(e=>new e.FilesystemWeb)});Yt();const Jt=re("Share",{web:()=>Be(()=>import("./web-C0CJEm_g.js"),[]).then(e=>new e.ShareWeb)});class Qt{constructor(t){this.sqlite=t,this._connectionDict=new Map}async initWebStore(){try{return await this.sqlite.initWebStore(),Promise.resolve()}catch(t){return Promise.reject(t)}}async saveToStore(t){try{return await this.sqlite.saveToStore({database:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async saveToLocalDisk(t){try{return await this.sqlite.saveToLocalDisk({database:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getFromLocalDiskToStore(t){const a=t??!0;try{return await this.sqlite.getFromLocalDiskToStore({overwrite:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async echo(t){try{const a=await this.sqlite.echo({value:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isSecretStored(){try{const t=await this.sqlite.isSecretStored();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async setEncryptionSecret(t){try{return await this.sqlite.setEncryptionSecret({passphrase:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async changeEncryptionSecret(t,a){try{return await this.sqlite.changeEncryptionSecret({passphrase:t,oldpassphrase:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async clearEncryptionSecret(){try{return await this.sqlite.clearEncryptionSecret(),Promise.resolve()}catch(t){return Promise.reject(t)}}async checkEncryptionSecret(t){try{const a=await this.sqlite.checkEncryptionSecret({passphrase:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async addUpgradeStatement(t,a){try{return t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.addUpgradeStatement({database:t,upgrade:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async createConnection(t,a,s,n,r){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.createConnection({database:t,encrypted:a,mode:s,version:n,readonly:r});const i=new tt(t,r,this.sqlite),d=r?`RO_${t}`:`RW_${t}`;return this._connectionDict.set(d,i),Promise.resolve(i)}catch(i){return Promise.reject(i)}}async closeConnection(t,a){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.closeConnection({database:t,readonly:a});const s=a?`RO_${t}`:`RW_${t}`;return this._connectionDict.delete(s),Promise.resolve()}catch(s){return Promise.reject(s)}}async isConnection(t,a){const s={};t.endsWith(".db")&&(t=t.slice(0,-3));const n=a?`RO_${t}`:`RW_${t}`;return s.result=this._connectionDict.has(n),Promise.resolve(s)}async retrieveConnection(t,a){t.endsWith(".db")&&(t=t.slice(0,-3));const s=a?`RO_${t}`:`RW_${t}`;if(this._connectionDict.has(s)){const n=this._connectionDict.get(s);return typeof n<"u"?Promise.resolve(n):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async getNCDatabasePath(t,a){try{const s=await this.sqlite.getNCDatabasePath({path:t,database:a});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async createNCConnection(t,a){try{await this.sqlite.createNCConnection({databasePath:t,version:a});const s=new tt(t,!0,this.sqlite),n=`RO_${t})`;return this._connectionDict.set(n,s),Promise.resolve(s)}catch(s){return Promise.reject(s)}}async closeNCConnection(t){try{await this.sqlite.closeNCConnection({databasePath:t});const a=`RO_${t})`;return this._connectionDict.delete(a),Promise.resolve()}catch(a){return Promise.reject(a)}}async isNCConnection(t){const a={},s=`RO_${t})`;return a.result=this._connectionDict.has(s),Promise.resolve(a)}async retrieveNCConnection(t){if(this._connectionDict.has(t)){const a=`RO_${t})`,s=this._connectionDict.get(a);return typeof s<"u"?Promise.resolve(s):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async isNCDatabase(t){try{const a=await this.sqlite.isNCDatabase({databasePath:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async retrieveAllConnections(){return this._connectionDict}async closeAllConnections(){const t=new Map;try{for(const a of this._connectionDict.keys()){const s=a.substring(3),n=a.substring(0,3)==="RO_";await this.sqlite.closeConnection({database:s,readonly:n}),t.set(a,null)}for(const a of t.keys())this._connectionDict.delete(a);return Promise.resolve()}catch(a){return Promise.reject(a)}}async checkConnectionsConsistency(){try{const t=[...this._connectionDict.keys()],a=[],s=[];for(const r of t)a.push(r.substring(0,2)),s.push(r.substring(3));const n=await this.sqlite.checkConnectionsConsistency({dbNames:s,openModes:a});return n.result||(this._connectionDict=new Map),Promise.resolve(n)}catch(t){return this._connectionDict=new Map,Promise.reject(t)}}async importFromJson(t){try{const a=await this.sqlite.importFromJson({jsonstring:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isJsonValid(t){try{const a=await this.sqlite.isJsonValid({jsonstring:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async copyFromAssets(t){const a=t??!0;try{return await this.sqlite.copyFromAssets({overwrite:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async getFromHTTPRequest(t,a){const s=a??!0;try{return await this.sqlite.getFromHTTPRequest({url:t,overwrite:s}),Promise.resolve()}catch(n){return Promise.reject(n)}}async isDatabaseEncrypted(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const a=await this.sqlite.isDatabaseEncrypted({database:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isInConfigEncryption(){try{const t=await this.sqlite.isInConfigEncryption();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isInConfigBiometricAuth(){try{const t=await this.sqlite.isInConfigBiometricAuth();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isDatabase(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const a=await this.sqlite.isDatabase({database:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async getDatabaseList(){try{const a=(await this.sqlite.getDatabaseList()).values;a.sort();const s={values:a};return Promise.resolve(s)}catch(t){return Promise.reject(t)}}async getMigratableDbList(t){const a=t||"default";try{const s=await this.sqlite.getMigratableDbList({folderPath:a});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async addSQLiteSuffix(t,a){const s=t||"default",n=a||[];try{const r=await this.sqlite.addSQLiteSuffix({folderPath:s,dbNameList:n});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async deleteOldDatabases(t,a){const s=t||"default",n=a||[];try{const r=await this.sqlite.deleteOldDatabases({folderPath:s,dbNameList:n});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async moveDatabasesAndAddSuffix(t,a){const s=t||"default",n=a||[];return this.sqlite.moveDatabasesAndAddSuffix({folderPath:s,dbNameList:n})}}class tt{constructor(t,a,s){this.dbName=t,this.readonly=a,this.sqlite=s}getConnectionDBName(){return this.dbName}getConnectionReadOnly(){return this.readonly}async open(){try{return await this.sqlite.open({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async close(){try{return await this.sqlite.close({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async beginTransaction(){try{const t=await this.sqlite.beginTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async commitTransaction(){try{const t=await this.sqlite.commitTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async rollbackTransaction(){try{const t=await this.sqlite.rollbackTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTransactionActive(){try{const t=await this.sqlite.isTransactionActive({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async loadExtension(t){try{return await this.sqlite.loadExtension({database:this.dbName,path:t,readonly:this.readonly}),Promise.resolve()}catch(a){return Promise.reject(a)}}async enableLoadExtension(t){try{return await this.sqlite.enableLoadExtension({database:this.dbName,toggle:t,readonly:this.readonly}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getUrl(){try{const t=await this.sqlite.getUrl({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getVersion(){try{const t=await this.sqlite.getVersion({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getTableList(){try{const t=await this.sqlite.getTableList({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async execute(t,a=!0,s=!0){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const n=await this.sqlite.execute({database:this.dbName,statements:t,transaction:a,readonly:!1,isSQL92:s});return Promise.resolve(n)}}catch(n){return Promise.reject(n)}}async query(t,a,s=!0){let n;try{return a&&a.length>0?n=await this.sqlite.query({database:this.dbName,statement:t,values:a,readonly:this.readonly,isSQL92:!0}):n=await this.sqlite.query({database:this.dbName,statement:t,values:[],readonly:this.readonly,isSQL92:s}),n=await this.reorderRows(n),Promise.resolve(n)}catch(r){return Promise.reject(r)}}async run(t,a,s=!0,n="no",r=!0){let i;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(a&&a.length>0?i=await this.sqlite.run({database:this.dbName,statement:t,values:a,transaction:s,readonly:!1,returnMode:n,isSQL92:!0}):i=await this.sqlite.run({database:this.dbName,statement:t,values:[],transaction:s,readonly:!1,returnMode:n,isSQL92:r}),i.changes=await this.reorderRows(i.changes),Promise.resolve(i))}catch(d){return Promise.reject(d)}}async executeSet(t,a=!0,s="no",n=!0){let r;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(r=await this.sqlite.executeSet({database:this.dbName,set:t,transaction:a,readonly:!1,returnMode:s,isSQL92:n}),r.changes=await this.reorderRows(r.changes),Promise.resolve(r))}catch(i){return Promise.reject(i)}}async isExists(){try{const t=await this.sqlite.isDBExists({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTable(t){try{const a=await this.sqlite.isTableExists({database:this.dbName,table:t,readonly:this.readonly});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isDBOpen(){try{const t=await this.sqlite.isDBOpen({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async delete(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteDatabase({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async createSyncTable(){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const t=await this.sqlite.createSyncTable({database:this.dbName,readonly:!1});return Promise.resolve(t)}}catch(t){return Promise.reject(t)}}async setSyncDate(t){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.setSyncDate({database:this.dbName,syncdate:t,readonly:!1}),Promise.resolve())}catch(a){return Promise.reject(a)}}async getSyncDate(){try{const t=await this.sqlite.getSyncDate({database:this.dbName,readonly:this.readonly});let a="";return t.syncDate>0&&(a=new Date(t.syncDate*1e3).toISOString()),Promise.resolve(a)}catch(t){return Promise.reject(t)}}async exportToJson(t,a=!1){try{const s=await this.sqlite.exportToJson({database:this.dbName,jsonexportmode:t,readonly:this.readonly,encrypted:a});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async deleteExportedRows(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteExportedRows({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async executeTransaction(t,a=!0){let s=0,n=!1;if(this.readonly)return Promise.reject("not allowed in read-only mode");if(await this.sqlite.beginTransaction({database:this.dbName}),n=await this.sqlite.isTransactionActive({database:this.dbName}),!n)return Promise.reject("After Begin Transaction, no transaction active");try{for(const d of t){if(typeof d!="object"||!("statement"in d))throw new Error("Error a task.statement must be provided");if("values"in d&&d.values&&d.values.length>0){const u=d.statement.toUpperCase().includes("RETURNING")?"all":"no",l=await this.sqlite.run({database:this.dbName,statement:d.statement,values:d.values,transaction:!1,readonly:!1,returnMode:u,isSQL92:a});if(l.changes.changes<0)throw new Error("Error in transaction method run ");s+=l.changes.changes}else{const u=await this.sqlite.execute({database:this.dbName,statements:d.statement,transaction:!1,readonly:!1});if(u.changes.changes<0)throw new Error("Error in transaction method execute ");s+=u.changes.changes}}const r=await this.sqlite.commitTransaction({database:this.dbName});s+=r.changes.changes;const i={changes:{changes:s}};return Promise.resolve(i)}catch(r){const i=r.message?r.message:r;return await this.sqlite.rollbackTransaction({database:this.dbName}),Promise.reject(i)}}async reorderRows(t){const a=t;if(t?.values&&typeof t.values[0]=="object"&&Object.keys(t.values[0]).includes("ios_columns")){const s=t.values[0].ios_columns,n=[];for(let r=1;r<t.values.length;r++){const i=t.values[r],d={};for(const u of s)d[u]=i[u];n.push(d)}a.values=n}return Promise.resolve(a)}}const zt=re("CapacitorSQLite",{web:()=>Be(()=>import("./web-MnAm4Hj8.js"),[]).then(e=>new e.CapacitorSQLiteWeb),electron:()=>window.CapacitorCustomPlatform.plugins.CapacitorSQLite});function Zt(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}const ea="laba101_offline",Le="fresh_start_reset_v1",ta=new Qt(zt);let Ee=null;const G=[{id:1,name:"Laba101 Admin",email:"admin@laba101.test",password:"password",role:"admin",branch:"Main Store"},{id:2,name:"Gensan Branch Staff",email:"staff@laba101.gensan",password:"password",role:"staff",branch:"Gensan Branch"}],Ce=[],J=[V(1,"Drop-off","P185. Includes wash, dry, and fold.","Drop-Off","order",185,8,40,["Wash","Dry","Fold"],0,24),V(2,"Full Service","P200. Wash, Fabcon, detergent, dry, and fold.","Full Service","order",200,8,40,["Wash","Dry","Fold","Detergent","Fabcon"],0,24),V(3,"Self Service Wash","P60. Self-service wash (max 8kg per load).","Self Service","order",60,8,null,["Wash"],0,1),V(4,"Self Service Dry","P70. Self-service dry (40 mins).","Self Service","order",70,8,40,["Dry"],0,1),V(6,"Dry 10 mins","Additional drying time (10 mins).","Add-on","addon",30,8,10,["Dry"],0,1),V(7,"Dry 20 mins","Additional drying time (20 mins).","Add-on","addon",50,8,20,["Dry"],0,1),V(8,"Dry 40 mins","Additional drying time (40 mins).","Add-on","addon",70,8,40,["Dry"],0,1),V(9,"Additional Zonrox","Extra Zonrox bleach add-on per load.","Add-on","addon",25,0,null,["Zonrox"],0,0),V(10,"Additional Fabcon","Extra Fabcon fabric conditioner add-on per load.","Add-on","addon",25,0,null,["Fabcon"],0,0)],te=[{id:1,name:"Regular Clothes",maxKg:8,additionalFee:0,isActive:1},{id:2,name:"Comforter",maxKg:4,additionalFee:0,isActive:1},{id:3,name:"Thin Blankets",maxKg:6,additionalFee:0,isActive:1},{id:4,name:"Bedsheets",maxKg:6,additionalFee:0,isActive:1},{id:5,name:"Bath Towels",maxKg:6,additionalFee:0,isActive:1},{id:6,name:"Curtains",maxKg:6,additionalFee:0,isActive:1}];function at(e,t){const a=C(e,[]),s=new Map(a.map(r=>[r.id,r])),n=t.map(r=>{const i=s.get(r.id);return i?{...r,...i,isActive:i.isActive??r.isActive}:r});(a.length!==n.length||n.some((r,i)=>r.id!==a[i]?.id||JSON.stringify(r)!==JSON.stringify(a[i])))&&T(e,n)}async function aa(){at("services",J),at("item_categories",te)}async function Re(e){for(const t of J)((await e.query("SELECT id FROM laundry_services WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive,t.id]):await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive]);for(const t of te)((await e.query("SELECT id FROM item_categories WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.maxKg,t.additionalFee,t.isActive,t.id]):await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[t.id,t.name,t.maxKg,t.additionalFee,t.isActive])}const ae=[],le=[],ne=[],de=[],ue=[],Q=[...[1,2,3,4].map(e=>({id:e,machineName:`Washer ${e}`,machineType:"washer",status:"available",branch:"Main Store"})),...[1,2,3,4].map(e=>({id:e+4,machineName:`Dryer ${e}`,machineType:"dryer",status:"available",branch:"Main Store"}))],me=[{key:"branch",value:"Main Store"},{key:"fold_rate",value:"5"},{key:"report_email",value:"admin@laba101.test"}];function V(e,t,a,s,n,r,i,d,u,l,o){return{id:e,name:t,description:a,category:s,serviceType:n,price:r,maxKg:i,dryingMinutes:d,includes:u,additionalCharge:l,turnaroundHours:o,isActive:1}}function H(e){return`laba101-mobile-${e}`}function C(e,t){const a=localStorage.getItem(H(e));if(!a)return structuredClone(t);try{return JSON.parse(a)}catch{return structuredClone(t)}}function T(e,t){localStorage.setItem(H(e),JSON.stringify(t))}function X(e){return e.reduce((t,a)=>Math.max(t,a.id),0)+1}function se(){return new Date().toISOString()}function Fe(e=new Date){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${s}`}function sa(){return Fe().slice(2).replaceAll("-","")}function Y(e,t){if(!e)return t;try{return JSON.parse(e)}catch{return t}}async function x(){return Ee||(Ee=await ta.createConnection(ea,!1,"no-encryption",1,!1),await Ee.open()),Ee}async function M(e,t,a,s){((await e.query(`PRAGMA table_info(${t})`)).values??[]).some(i=>i.name===a)||await e.execute(`ALTER TABLE ${t} ADD COLUMN ${a} ${s}`)}function na(){const e=C("staff",G),t=new Map(e.map(s=>[s.id,s]));let a=!1;for(const s of G){const n=t.get(s.id);if(!n){t.set(s.id,{...s,isActive:1}),a=!0;continue}const r={...n,name:s.name,email:s.email,password:s.password,role:s.role,branch:s.branch,isActive:1};JSON.stringify(r)!==JSON.stringify(n)&&(t.set(s.id,r),a=!0)}a&&T("staff",Array.from(t.values()).sort((s,n)=>s.id-n.id))}async function ra(){localStorage.getItem(H(Le))||(T("staff",G),T("customers",[]),T("orders",[]),T("payments",[]),T("fold_logs",[]),T("expenses",[]),T("sales",[]),localStorage.getItem(H("services"))||T("services",J),localStorage.getItem(H("item_categories"))||T("item_categories",te),localStorage.getItem(H("machines"))||T("machines",Q),localStorage.getItem(H("subcleanings"))||T("subcleanings",[]),localStorage.getItem(H("settings"))||T("settings",me),localStorage.removeItem("laba101-mobile-session"),T(Le,!0))}async function pt(e){for(const t of G){if(((await e.query("SELECT id FROM staff WHERE id = ?",[t.id])).values??[]).length>0){await e.run("UPDATE staff SET name = ?, email = ?, password = ?, role = ?, branch = ?, isActive = 1 WHERE id = ?",[t.name,t.email,t.password,t.role,t.branch,t.id]);continue}await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.email,t.password,t.role,t.branch,1])}}async function ia(e){if(!(((await e.query("SELECT COUNT(*) as count FROM machines")).values?.[0]?.count??0)>0))for(const a of Q)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[a.id,a.machineName,a.machineType,a.status,a.branch])}async function oa(e){for(const t of me)await e.run("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)",[t.key,t.value])}async function ft(e){for(const t of J)((await e.query("SELECT id FROM laundry_services WHERE id = ?",[t.id])).values??[]).length>0||await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive]);for(const t of te)((await e.query("SELECT id FROM item_categories WHERE id = ?",[t.id])).values??[]).length>0||await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[t.id,t.name,t.maxKg,t.additionalFee,t.isActive])}async function ca(e){((await e.query("SELECT value FROM settings WHERE key = ?",[Le])).values??[]).length>0||(await e.execute(`
    DELETE FROM payments;
    DELETE FROM orders;
    DELETE FROM customers;
    DELETE FROM fold_logs;
    DELETE FROM disbursement_expenses;
    DELETE FROM daily_sales;
    DELETE FROM revolving_history;
    DELETE FROM staff WHERE id NOT IN (1, 2);
  `),await pt(e),await ft(e),await ia(e),await oa(e),await e.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",[Le,se()]),localStorage.removeItem("laba101-mobile-session"))}async function la(){if(!$.isNativePlatform()){await ra(),!localStorage.getItem(H("seeded_v4"))&&!localStorage.getItem(H("services"))&&!localStorage.getItem(H("staff"))&&(T("staff",G),T("customers",Ce),T("services",J),T("item_categories",te),T("orders",ae),T("payments",le),T("fold_logs",[]),T("expenses",ne),T("sales",de),T("revolving_history",ue),T("machines",Q),T("subcleanings",[]),T("settings",me),T("seeded_v4",!0)),await aa(),na(),localStorage.getItem(H("seeded_v4"))||T("seeded_v4",!0);return}const e=await x();await e.execute(`
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
  `),await M(e,"staff","email","TEXT"),await M(e,"staff","password","TEXT"),await M(e,"staff","role","TEXT"),await M(e,"staff","isActive","INTEGER NOT NULL DEFAULT 1"),await e.run('UPDATE staff SET password = ? WHERE password IS NULL OR password = ""',["password"]),await e.run('UPDATE staff SET role = ? WHERE role IS NULL OR role = ""',["staff"]),await M(e,"orders","customerId","INTEGER NOT NULL DEFAULT 0"),await M(e,"orders","phone","TEXT"),await M(e,"orders","serviceId","INTEGER NOT NULL DEFAULT 0"),await M(e,"orders","serviceLines","TEXT"),await M(e,"orders","itemCategoryId","INTEGER NOT NULL DEFAULT 0"),await M(e,"orders","itemCategory",'TEXT NOT NULL DEFAULT "Regular Clothes"'),await M(e,"orders","workflowCompleted","TEXT"),await M(e,"orders","weightKg","REAL NOT NULL DEFAULT 0"),await M(e,"orders","price","REAL NOT NULL DEFAULT 0"),await M(e,"orders","additionalCharge","REAL NOT NULL DEFAULT 0"),await M(e,"orders","extraServiceAmount","REAL NOT NULL DEFAULT 0"),await M(e,"orders","totalAmount","REAL NOT NULL DEFAULT 0"),await M(e,"orders","paidAmount","REAL NOT NULL DEFAULT 0"),await M(e,"orders","extras","TEXT"),await M(e,"orders","notes","TEXT"),await M(e,"orders","foldedByStaffIds","TEXT"),await M(e,"orders","dueAt","TEXT"),await M(e,"orders","createdAt",'TEXT NOT NULL DEFAULT ""'),await M(e,"daily_sales","saleNumber","TEXT"),await M(e,"daily_sales","status","TEXT"),await M(e,"daily_sales","endorsedTo","TEXT"),await M(e,"daily_sales","statusUpdatedAt","TEXT"),await M(e,"disbursement_expenses","disbursementType",'TEXT NOT NULL DEFAULT "daily"');const a=((await e.query("SELECT COUNT(*) as count FROM staff")).values?.[0]?.count??0)===0;if(a){for(const s of G)await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[s.id,s.name,s.email,s.password,s.role,s.branch,1]);for(const s of Ce)await e.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[s.id,s.name,s.phone,s.address]);for(const s of J)await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[s.id,s.name,s.description,s.category,s.serviceType,s.price,s.maxKg,s.dryingMinutes,JSON.stringify(s.includes),s.additionalCharge,s.turnaroundHours,s.isActive]);for(const s of te)await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[s.id,s.name,s.maxKg,s.additionalFee,s.isActive]);for(const s of ae)await yt(e,s);for(const s of le)await e.run("INSERT INTO payments (id, orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?, ?)",[s.id,s.orderId,s.amount,s.method,s.reference,s.receivedAt,s.branch]);for(const s of ne)await e.run("INSERT INTO disbursement_expenses (id, expenseDate, number, disbursementType, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[s.id,s.expenseDate,s.number,s.disbursementType??"daily",s.name,s.category,s.description,s.amount]);for(const s of de)await e.run("INSERT INTO daily_sales (id, saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?, ?)",[s.id,s.saleDate,s.saleNumber,s.cashAmount,s.gcashAmount,s.totalAmount,s.notes]);for(const s of ue)await e.run("INSERT INTO revolving_history (id, revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[s.id,s.revolvingNumber,s.name,s.amount,s.category,s.description,s.type,s.createdAt]);for(const s of Q)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[s.id,s.machineName,s.machineType,s.status,s.branch]);for(const s of me)await e.run("INSERT INTO settings (key, value) VALUES (?, ?)",[s.key,s.value]);await e.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",["fresh_install_defaults",se()])}await Re(e),await pt(e),a||await ft(e),await ca(e)}async function yt(e,t){await e.run("INSERT INTO orders (id, ticket, customerId, customer, phone, serviceId, service, serviceLines, itemCategoryId, itemCategory, branch, status, workflowCompleted, weightKg, price, additionalCharge, extraServiceAmount, totalAmount, paidAmount, extras, notes, foldedBy, foldedByStaffIds, dueAt, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.ticket,t.customerId,t.customer,t.phone,t.serviceId,t.service,JSON.stringify(t.serviceLines??[]),t.itemCategoryId,t.itemCategory,t.branch,t.status,JSON.stringify(t.workflowCompleted),t.weightKg,t.price,t.additionalCharge,t.extraServiceAmount,t.totalAmount,t.paidAmount,JSON.stringify(t.extras),t.notes,t.foldedBy,JSON.stringify(t.foldedByStaffIds??[]),t.dueAt,t.createdAt])}function da(e){const t=Number(e.paidAmount??0),a=Number(e.totalAmount??0),s=Number(e.foldedBy),n=Y(e.serviceLines,[]),r=Number(e.serviceId),i=String(e.service),d=Number(e.price);return{id:Number(e.id),ticket:String(e.ticket),customerId:Number(e.customerId),customer:String(e.customer),phone:e.phone?String(e.phone):null,serviceId:r,service:i,serviceLines:n.length?n:[{id:r,name:i,price:d,quantity:1,total:d}],itemCategoryId:Number(e.itemCategoryId),itemCategory:String(e.itemCategory),branch:String(e.branch),status:String(e.status),workflowCompleted:Y(e.workflowCompleted,[]),weightKg:Number(e.weightKg),price:d,additionalCharge:Number(e.additionalCharge),extraServiceAmount:Number(e.extraServiceAmount),totalAmount:a,paidAmount:t,balance:Number((a-t).toFixed(2)),extras:Y(e.extras,[]),notes:e.notes?String(e.notes):null,foldedBy:Number.isFinite(s)&&s>0?s:null,foldedByName:e.foldedByName?String(e.foldedByName):null,foldedByStaffIds:Y(e.foldedByStaffIds,[]),dueAt:String(e.dueAt),createdAt:String(e.createdAt)}}async function ua(){await la()}async function pe(){return(await _e()).find(t=>t.key==="branch")?.value??"Main Store"}async function ma(){const e=await _e();return Number(e.find(t=>t.key==="fold_rate")?.value??"5")}async function ht(e){return(await _e()).find(a=>a.key===e)?.value}async function _e(){return $.isNativePlatform()?(await(await x()).query("SELECT key, value FROM settings ORDER BY key")).values??[]:C("settings",me)}async function Te(e,t){if(!$.isNativePlatform()){const s=C("settings",me).filter(n=>n.key!==e);s.push({key:e,value:t}),T("settings",s);return}await(await x()).run("REPLACE INTO settings (key, value) VALUES (?, ?)",[e,t])}async function va(e){return $.isNativePlatform()?(await(await x()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff WHERE branch = ? ORDER BY name ASC',[e])).values??[]:C("staff",G).filter(s=>s.branch===e)}async function gt(){return $.isNativePlatform()?(await(await x()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff ORDER BY name ASC')).values??[]:C("staff",G)}async function bt(e,t){const a=e.trim().toLowerCase();return(await gt()).find(n=>n.email.toLowerCase()===a&&n.password===t&&n.isActive!==0)??null}async function pa(e){if(!$.isNativePlatform()){const a=C("staff",G);a.unshift({id:X(a),...e,isActive:1}),T("staff",a);return}await(await x()).run("INSERT INTO staff (name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?)",[e.name,e.email,e.password,e.role,e.branch,1])}async function st(e,t){if(!$.isNativePlatform()){const r=C("staff",G),i=r.find(d=>d.id===e);i&&(Object.assign(i,t),T("staff",r));return}const a=await x(),s=[],n=[];for(const[r,i]of Object.entries(t))r!=="id"&&(s.push(`${r} = ?`),n.push(i));s.length&&(n.push(e),await a.run(`UPDATE staff SET ${s.join(", ")} WHERE id = ?`,n))}async function fa(){return $.isNativePlatform()?(await(await x()).query("SELECT id, name, phone, address FROM customers ORDER BY name ASC")).values??[]:C("customers",Ce).sort((a,s)=>a.name.localeCompare(s.name))}async function ya(e){if(!$.isNativePlatform()){const n=C("customers",Ce),r=e.id?n.find(d=>d.id===e.id):n.find(d=>d.name.toLowerCase()===e.name.toLowerCase()&&(e.phone?d.phone===e.phone:!0));if(r)return r.name=e.name,r.phone=e.phone??r.phone,r.address=e.address??r.address,T("customers",n),r;const i={id:X(n),name:e.name,phone:e.phone??null,address:e.address??null};return n.push(i),T("customers",n),i}const t=await x();if(e.id)return await t.run("UPDATE customers SET name = ?, phone = ?, address = ? WHERE id = ?",[e.name,e.phone??null,e.address??null,e.id]),{id:e.id,name:e.name,phone:e.phone??null,address:e.address??null};const a=await t.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM customers"),s=Number((a.values?.[0]).id);return await t.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[s,e.name,e.phone??null,e.address??null]),{id:s,name:e.name,phone:e.phone??null,address:e.address??null}}async function je(e){if(!$.isNativePlatform())return C("services",J).filter(s=>!0);const t=await x(),a=await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[]);return(a.values??[]).length===0?(await Re(t),((await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[])).values??[]).map(n=>({...n,includes:Y(n.includes,[])}))):(a.values??[]).map(s=>({...s,includes:Y(s.includes,[])}))}async function ha(){if(!$.isNativePlatform())return C("services",J);const e=await x(),t=await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC");return(t.values??[]).length===0?(await Re(e),((await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC")).values??[]).map(s=>({...s,includes:Y(s.includes,[])}))):(t.values??[]).map(a=>({...a,includes:Y(a.includes,[])}))}async function nt(e){if(!$.isNativePlatform()){const a=C("services",J),s=e.id?a.find(n=>n.id===e.id):null;s?Object.assign(s,e):a.unshift({...e,id:X(a)}),T("services",a);return}const t=await x();e.id?await t.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = ? WHERE id = ?",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive,e.id]):await t.run("INSERT INTO laundry_services (name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive])}async function Et(){if(!$.isNativePlatform())return C("item_categories",te).filter(a=>a.isActive);const e=await x(),t=await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC");return(t.values??[]).length===0?(await Re(e),(await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC")).values??[]):t.values??[]}async function ga(e){if(!$.isNativePlatform()){const a=C("item_categories",te),s=e.id?a.find(n=>n.id===e.id):null;s?Object.assign(s,e):a.unshift({...e,id:X(a)}),T("item_categories",a);return}const t=await x();e.id?await t.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = ? WHERE id = ?",[e.name,e.maxKg,e.additionalFee,e.isActive,e.id]):await t.run("INSERT INTO item_categories (name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?)",[e.name,e.maxKg,e.additionalFee,e.isActive])}function Ne(e,t,a,s){const n=(Array.isArray(e)?e:[e]).map(y=>{const h=Math.max(0,Number(y.quantity??1)),f=Number(y.price);return{id:y.id,name:y.name,price:f,quantity:h,total:Number((f*h).toFixed(2))}}).filter(y=>y.quantity>0),r=Number(t.maxKg),i=0,d=0,u=s.map(y=>{const h=Math.max(0,Number(y.quantity??1)),f=Number(y.price);return{id:y.id,name:Zt(y.name),price:f,quantity:h,total:Number((f*h).toFixed(2))}}).filter(y=>y.quantity>0),l=n.reduce((y,h)=>y+h.total,0),o=u.reduce((y,h)=>y+h.total,0),v=Number((l+d+o).toFixed(2));return{price:Number(l.toFixed(2)),additionalCharge:Number(d.toFixed(2)),extraServiceAmount:Number(o.toFixed(2)),totalAmount:v,allowedKg:r,extraKg:Number(i.toFixed(2)),warning:null,serviceLines:n,extras:u}}function St(e,t){return[{key:"fold",label:"Fold"},{key:"claimed",label:"Claimed"}]}function ba(e){return e.includes("claimed")?"claimed":e.includes("fold")?"ready":"received"}async function fe(e){return $.isNativePlatform()?((await(await x()).query("SELECT o.*, s.name as foldedByName FROM orders o LEFT JOIN staff s ON s.id = o.foldedBy WHERE o.branch = ? ORDER BY o.id DESC",[e])).values??[]).map(s=>da(s)):C("orders",ae).filter(s=>s.branch===e).map(s=>({...s,serviceLines:s.serviceLines??[{id:s.serviceId,name:s.service,price:Number(s.price),quantity:1,total:Number(s.price)}],foldedByStaffIds:s.foldedByStaffIds??[],balance:Number((s.totalAmount-s.paidAmount).toFixed(2))}))}async function Ea(e){const[t,a]=await Promise.all([je(),Et()]),s=e.serviceQuantities??(e.serviceId?{[e.serviceId]:1}:{}),n=t.filter(p=>p.serviceType==="order"&&Number(s[p.id]??0)>0).map(p=>({...p,quantity:Number(s[p.id]??0)})),r=n[0],i=a.find(p=>p.id===e.itemCategoryId)??a.find(p=>p.name.toLowerCase()===(r?.category??"").toLowerCase())??a.find(p=>p.name==="Regular Clothes")??a[0],d=e.addonQuantities??Object.fromEntries((e.addonIds??[]).map(p=>[p,1])),u=t.filter(p=>p.serviceType==="addon"&&Number(d[p.id]??0)>0).map(p=>({...p,quantity:Number(d[p.id]??0)}));if(!n.length&&!u.length)throw new Error("Please select at least one service or extra service.");const l=e.weightKg??Math.max(1,Number(i?.maxKg||r?.maxKg||1)),o=Ne(n,i,l,u),v=await ya({id:e.customerId||void 0,name:e.customerName,phone:e.customerPhone??null}),y=Math.max(0,e.paidAmount),h=Math.min(o.totalAmount,y),f={ticket:await Sa(),customerId:v.id,customer:v.name,phone:v.phone,serviceId:r?.id??0,service:o.serviceLines.length?o.serviceLines.map(p=>`${p.name} x${p.quantity}`).join(", "):"Extras only",serviceLines:o.serviceLines,itemCategoryId:i.id,itemCategory:i.name,branch:e.branch,status:"received",workflowCompleted:["received"],weightKg:l,price:o.price,additionalCharge:o.additionalCharge,extraServiceAmount:o.extraServiceAmount,totalAmount:o.totalAmount,paidAmount:h,balance:Number((o.totalAmount-h).toFixed(2)),extras:o.extras,notes:e.notes||null,foldedBy:null,foldedByName:null,foldedByStaffIds:[],dueAt:new Date(Date.now()+Math.max(1,...n.map(p=>p.turnaroundHours))*60*60*1e3).toISOString(),createdAt:se()};if(!$.isNativePlatform()){const p=C("orders",ae),b={...f,id:X(p)};return p.unshift(b),T("orders",p),y>0&&await ke(b.id,{amount:y,method:e.paymentMethod,reference:e.paymentReference??null}),b}const E=await x(),w=await E.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM orders"),I={...f,id:Number((w.values?.[0]).id)};return await yt(E,I),y>0&&await E.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[I.id,y,e.paymentMethod,e.paymentReference??null,se(),e.branch]),I}async function Sa(){const e=`LB${sa()}`,t=await pe(),s=(await fe(t)).filter(r=>r.ticket.startsWith(e)).sort((r,i)=>i.ticket.localeCompare(r.ticket))[0],n=s?Number(s.ticket.slice(-3))+1:1;return`${e}-${String(n).padStart(3,"0")}`}async function rt(e,t){const a=await pe(),[s,n]=await Promise.all([fe(a),je()]),r=s.find(l=>l.id===e);if(!r)return;const d=St().map(l=>l.key).find(l=>!r.workflowCompleted.includes(l));if(!d)return;if(r.workflowCompleted=[...r.workflowCompleted,d],r.status=ba(r.workflowCompleted),d==="fold"&&t){const l=Array.isArray(t)?t:[t];r.foldedBy=l[0]||null;const o=Array.isArray(r.foldedByStaffIds)?[...r.foldedByStaffIds]:[];o.push(...l),r.foldedByStaffIds=o}if(!$.isNativePlatform()){const l=C("orders",ae),o=l.find(v=>v.id===r.id);o&&Object.assign(o,r),T("orders",l);return}await(await x()).run("UPDATE orders SET workflowCompleted = ?, status = ?, foldedBy = ?, foldedByStaffIds = ? WHERE id = ?",[JSON.stringify(r.workflowCompleted),r.status,r.foldedBy,JSON.stringify(r.foldedByStaffIds??[]),r.id])}async function ke(e,t){const a=await pe();if(!(await fe(a)).find(d=>d.id===e))return;const r=Math.max(0,t.amount);if(r<=0)return;if(!$.isNativePlatform()){const d=C("payments",le);d.unshift({id:X(d),orderId:e,amount:r,method:t.method,reference:t.reference??null,receivedAt:se(),branch:a}),T("payments",d);const u=C("orders",ae),l=u.find(o=>o.id===e);l&&(l.paidAmount=Math.min(l.totalAmount,Number((l.paidAmount+r).toFixed(2)))),T("orders",u);return}const i=await x();await i.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[e,r,t.method,t.reference??null,se(),a]),await i.run("UPDATE orders SET paidAmount = MIN(totalAmount, paidAmount + ?) WHERE id = ?",[r,e])}async function wa(e){return $.isNativePlatform()?(await(await x()).query("SELECT id, orderId, amount, method, reference, receivedAt, branch FROM payments  ORDER BY receivedAt DESC",[])).values??[]:C("payments",le).filter(s=>!0)}async function Ta(e){const t=await pe(),s=(await fe(t)).find(r=>r.id===e);if(!s)return;if(s.paidAmount>0)throw new Error("Cancel is only allowed for unpaid orders. Use Delete (admin) to refund paid orders.");if(!$.isNativePlatform()){const r=C("orders",ae),i=C("payments",le),d=C("fold_logs",[]),u=r.filter(v=>v.id!==e),l=i.filter(v=>v.orderId!==e),o=d.filter(v=>v.orderTicket!==s.ticket);T("orders",u),T("payments",l),T("fold_logs",o);return}const n=await x();await n.run("DELETE FROM payments WHERE orderId = ?",[e]),await n.run("DELETE FROM fold_logs WHERE orderTicket = ?",[s.ticket]),await n.run("DELETE FROM orders WHERE id = ?",[e])}async function Na(e){const t=await pe(),s=(await fe(t)).find(r=>r.id===e);if(!s)return;if(s.paidAmount<=0)throw new Error("Delete (refund) is only allowed for paid orders.");if(!$.isNativePlatform()){const r=C("orders",ae),i=C("payments",le),d=C("fold_logs",[]),u=r.filter(v=>v.id!==e),l=i.filter(v=>v.orderId!==e),o=d.filter(v=>v.orderTicket!==s.ticket);T("orders",u),T("payments",l),T("fold_logs",o);return}const n=await x();await n.run("DELETE FROM payments WHERE orderId = ?",[e]),await n.run("DELETE FROM fold_logs WHERE orderTicket = ?",[s.ticket]),await n.run("DELETE FROM orders WHERE id = ?",[e])}async function Aa(){return $.isNativePlatform()?(await(await x()).query("SELECT id, orderTicket, staffName, foldCount, rate, total, createdAt FROM fold_logs ORDER BY id DESC")).values??[]:C("fold_logs",[])}async function La(e){const t=Number((e.foldCount*e.rate).toFixed(2));if(!$.isNativePlatform()){const s=C("fold_logs",[]);s.unshift({id:Date.now(),...e,total:t,createdAt:se()}),T("fold_logs",s);return}await(await x()).run("INSERT INTO fold_logs (orderTicket, staffName, foldCount, rate, total, createdAt) VALUES (?, ?, ?, ?, ?, ?)",[e.orderTicket,e.staffName,e.foldCount,e.rate,t,se()])}async function Ca(){return $.isNativePlatform()?(await(await x()).query('SELECT id, expenseDate, number, COALESCE(disbursementType, "daily") as disbursementType, name, category, description, amount FROM disbursement_expenses ORDER BY expenseDate DESC, id DESC')).values??[]:C("expenses",ne).map(a=>({...a,disbursementType:a.disbursementType??"daily"}))}function Oe(e){const t=/^DISB-(\d+)$/i.exec(String(e??"").trim());return t?Number(t[1]):0}function it(e){const t=/^REV-(\d+)$/i.exec(String(e??"").trim());return t?Number(t[1]):0}async function $a(){let e=0;if(!$.isNativePlatform()){const n=C("expenses",ne),r=C("revolving_history",ue);for(const i of n)e=Math.max(e,Oe(i.number));for(const i of r)i.type==="disbursement"&&(e=Math.max(e,Oe(i.revolvingNumber)));return e}const t=await x(),a=await t.query("SELECT number FROM disbursement_expenses"),s=await t.query("SELECT revolvingNumber as number FROM revolving_history WHERE type = 'disbursement'");for(const n of[...a.values??[],...s.values??[]])e=Math.max(e,Oe(String(n.number)));return e}async function wt(){const e=await $a()+1;return`DISB-${String(e).padStart(2,"0")}`}async function Ra(){let e=0;if(!$.isNativePlatform()){const s=C("revolving_history",ue);for(const n of s)n.type==="add"&&(e=Math.max(e,it(n.revolvingNumber)));return`REV-${String(e+1).padStart(2,"0")}`}const a=await(await x()).query("SELECT revolvingNumber FROM revolving_history WHERE type = 'add'");for(const s of a.values??[])e=Math.max(e,it(String(s.revolvingNumber)));return`REV-${String(e+1).padStart(2,"0")}`}async function Tt(e){if(!$.isNativePlatform()){const a=C("expenses",ne),s=X(a);a.unshift({id:s,expenseDate:e.expenseDate,number:e.number,disbursementType:e.disbursementType??"daily",name:e.name,category:e.category,description:e.description||null,amount:e.amount}),T("expenses",a);return}await(await x()).run("INSERT INTO disbursement_expenses (expenseDate, number, disbursementType, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?, ?)",[e.expenseDate,e.number,e.disbursementType??"daily",e.name,e.category,e.description||null,e.amount])}async function xa(e){const t=await wt();await Tt({expenseDate:e.expenseDate,number:t,disbursementType:e.disbursementType??"daily",name:e.name,category:e.category,description:e.description,amount:e.amount})}async function Da(e,t){if(!$.isNativePlatform()){const s=C("expenses",ne),n=s.find(r=>r.id===e);n&&(Object.assign(n,{expenseDate:t.expenseDate,disbursementType:t.disbursementType??"daily",name:t.name,category:t.category,description:t.description||null,amount:t.amount}),T("expenses",s));return}await(await x()).run("UPDATE disbursement_expenses SET expenseDate = ?, disbursementType = ?, name = ?, category = ?, description = ?, amount = ? WHERE id = ?",[t.expenseDate,t.disbursementType??"daily",t.name,t.category,t.description||null,t.amount,e])}async function Oa(e){if(!$.isNativePlatform()){const a=C("expenses",ne);T("expenses",a.filter(s=>s.id!==e));return}await(await x()).run("DELETE FROM disbursement_expenses WHERE id = ?",[e])}async function Pa(){return $.isNativePlatform()?(await(await x()).query('SELECT id, saleDate, COALESCE(saleNumber, "") as saleNumber, cashAmount, gcashAmount, totalAmount, notes, status, endorsedTo, statusUpdatedAt FROM daily_sales ORDER BY saleDate DESC, id DESC')).values??[]:C("sales",de)}async function Ia(e){const t=Number((e.cashAmount+e.gcashAmount).toFixed(2));if(!$.isNativePlatform()){const r=C("sales",de),i=e.id?r.find(d=>d.id===e.id):r.find(d=>d.saleDate===e.saleDate);if(i)Object.assign(i,{saleDate:e.saleDate,cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null});else{const d=X(r);r.unshift({id:d,saleDate:e.saleDate,saleNumber:`SALE-${String(d).padStart(2,"0")}`,cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null})}T("sales",r);return}const a=await x(),n=(e.id?await a.query("SELECT id, saleNumber FROM daily_sales WHERE id = ?",[e.id]):await a.query("SELECT id, saleNumber FROM daily_sales WHERE saleDate = ?",[e.saleDate])).values?.[0];if(n)await a.run("UPDATE daily_sales SET saleDate = ?, cashAmount = ?, gcashAmount = ?, totalAmount = ?, notes = ? WHERE id = ?",[e.saleDate,e.cashAmount,e.gcashAmount,t,e.notes||null,n.id]);else{const r=await a.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM daily_sales"),i=Number((r.values?.[0]).id);await a.run("INSERT INTO daily_sales (saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?)",[e.saleDate,`SALE-${String(i).padStart(2,"0")}`,e.cashAmount,e.gcashAmount,t,e.notes||null])}}async function qa(e){if(!$.isNativePlatform()){const a=C("sales",de);T("sales",a.filter(s=>s.id!==e));return}await(await x()).run("DELETE FROM daily_sales WHERE id = ?",[e])}async function ot(e,t,a=null,s){if(!$.isNativePlatform()){const r=C("sales",de),i=r.find(d=>d.id===e);i&&(i.status=t,i.endorsedTo=a,i.statusUpdatedAt=s,T("sales",r));return}await(await x()).run("UPDATE daily_sales SET status = ?, endorsedTo = ?, statusUpdatedAt = ? WHERE id = ?",[t,a,s,e])}async function Fa(){return $.isNativePlatform()?(await(await x()).query("SELECT id, revolvingNumber, name, amount, category, description, type, createdAt FROM revolving_history ORDER BY createdAt DESC, id DESC")).values??[]:C("revolving_history",ue).sort((a,s)=>s.createdAt.localeCompare(a.createdAt))}async function ct(e){const t=e.type==="disbursement"?await wt():await Ra();if(e.type==="disbursement"){const s=e.expenseDate??e.createdAt.slice(0,10);await Tt({expenseDate:s,number:t,name:e.name,category:e.category,description:e.description??"",amount:e.amount})}if(!$.isNativePlatform()){const s=C("revolving_history",ue),n=X(s);s.unshift({id:n,revolvingNumber:t,...e}),T("revolving_history",s);return}await(await x()).run("INSERT INTO revolving_history (revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)",[t,e.name,e.amount,e.category,e.description||null,e.type,e.createdAt])}async function Nt(e){return $.isNativePlatform()?(await(await x()).query("SELECT id, machineName, machineType, status, branch FROM machines WHERE branch = ? ORDER BY machineType, machineName",[e])).values??[]:C("machines",Q).filter(s=>s.branch===e)}async function ka(e){if(!$.isNativePlatform()){const a=C("machines",Q);a.unshift({id:X(a),...e}),T("machines",a);return}await(await x()).run("INSERT INTO machines (machineName, machineType, status, branch) VALUES (?, ?, ?, ?)",[e.machineName,e.machineType,e.status,e.branch])}async function Ma(e,t){if(!$.isNativePlatform()){const s=C("machines",Q),n=s.find(r=>r.id===e);n&&(n.status=t,T("machines",s));return}await(await x()).run("UPDATE machines SET status = ? WHERE id = ?",[t,e])}async function Ua(e){return $.isNativePlatform()?((await(await x()).query("SELECT id, date, machineIds, machineNames, cleaningStatus, notes, branch FROM subcleanings WHERE branch = ? ORDER BY date DESC, id DESC",[e])).values??[]).map(s=>({...s,machineIds:Y(s.machineIds,[])})):C("subcleanings",[]).filter(s=>s.branch===e)}async function Ba(e){const a=(await Nt(e.branch)).filter(r=>e.machineIds.includes(r.id)).map(r=>r.machineName).join(", ");if(!$.isNativePlatform()){const r=C("subcleanings",[]);r.unshift({id:X(r),date:e.date,machineIds:e.machineIds,machineNames:a,cleaningStatus:e.cleaningStatus,notes:e.notes||null,branch:e.branch}),T("subcleanings",r);const i=C("machines",Q);i.forEach(d=>{e.machineIds.includes(d.id)&&(d.status=e.cleaningStatus==="completed"?"available":"under_cleaning")}),T("machines",i);return}const s=await x();await s.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, notes, branch) VALUES (?, ?, ?, ?, ?, ?)",[e.date,JSON.stringify(e.machineIds),a,e.cleaningStatus,e.notes||null,e.branch]);const n=e.cleaningStatus==="completed"?"available":"under_cleaning";for(const r of e.machineIds)await s.run("UPDATE machines SET status = ? WHERE id = ?",[n,r])}async function _a(e,t){if(!$.isNativePlatform()){const i=C("machines",Q),d=i.find(o=>o.id===e);d&&(d.status="available"),T("machines",i);const u=C("subcleanings",[]),l=Fe();u.unshift({id:X(u),date:l,machineIds:[e],machineNames:d?.machineName??"",cleaningStatus:"completed",notes:null,branch:t}),T("subcleanings",u);return}const a=await x(),n=(await a.query("SELECT machineName FROM machines WHERE id = ?",[e])).values?.[0]?.machineName??"";await a.run("UPDATE machines SET status = ? WHERE id = ?",["available",e]);const r=Fe();await a.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, notes, branch) VALUES (?, ?, ?, ?, ?, ?)",[r,JSON.stringify([e]),n,"completed",null,t])}const He=document.querySelector("#app");if(!He)throw new Error("App root not found");let Se;const ve=re("BluetoothThermalPrinter"),We={dashboard:"Dashboard",pos:"POS",orders:"Orders",archived:"Archived Order",customers:"Customers",pricing:"Pricing Services",disbursements:"Daily Report",reports:"Reports",inventory:"Inventory",maintenance:"Maintenance",staff:"Staff",revolving:"Revolving Fund",settings:"Settings"},c={tab:"dashboard",receiptOrderId:0,currentUser:null,loginError:"",sidebarOpen:!1,dailyReportTab:"expenses",maintenanceTab:"cleaning",customerSearch:"",orderSearch:"",orderDateFilter:"",orderPaymentFilter:"",printerPanelOpen:!1,printerLoading:!1,printerError:"",printerStatus:"",printerPaperWidth:58,pairedPrinters:[],selectedPrinterAddress:"",archivedOrderSearch:"",paymentModalOrderId:0,reportPreview:null,endorseModalOpen:!1,endorseSaleId:0,endorseSaleDate:"",revolvingModalOpen:!1,revolvingSaleId:0,addFundModalOpen:!1,disbursementModalOpen:!1,revolvingHistoryFrom:"",revolvingHistoryTo:""},ja=["Wash","Dry","Fold","Detergent","Fabcon","Zonrox"],Ha=["Supplies","Utilities","Maintenance","Salary","Rent","Transport","Other"],ge="laba101-mobile-session";function N(e){return new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(e||0)}function m(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Z(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}function xe(e,t){return Number((e-t).toFixed(2))}function At(e,t,a,s=0){const n=t.filter(i=>K(i.createdAt)===e).reduce((i,d)=>i+d.paidAmount,0),r=a.filter(i=>ee(i)==="daily"&&i.expenseDate===e).reduce((i,d)=>i+d.amount,0);return xe(n+s,r)}function Wa(e,t){const a=new Map(t.map(n=>[n.id,n.name])),s=new Map;return e.filter(n=>n.workflowCompleted.includes("fold")).forEach(n=>{(Array.isArray(n.foldedByStaffIds)&&n.foldedByStaffIds.length?n.foldedByStaffIds:n.foldedBy?[n.foldedBy]:[]).forEach(i=>{if(!i)return;const d=a.get(i)??String(i),u=s.get(i)??{staffId:i,staffName:d,folds:0};u.folds+=1,s.set(i,u)})}),e.filter(n=>n.workflowCompleted.includes("fold")&&n.foldedByName&&n.foldedBy).forEach(n=>{const r=s.get(n.foldedBy);r&&r.staffName===String(n.foldedBy)&&(r.staffName=n.foldedByName)}),Array.from(s.values()).map(n=>({staffName:n.staffName,folds:n.folds}))}function be(e=new Date){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${s}`}function W(){return be()}function Me(){return W().slice(0,7)}function ee(e){return e.disbursementType==="monthly"?"monthly":"daily"}function Lt(e){return e.slice(0,7)}function Ct(e){return ee(e)==="monthly"?Lt(e.expenseDate):e.expenseDate}function K(e){return be(new Date(e))}function Xe(e){return e.paidAmount<=0?"unpaid":e.balance>0?"partial":"paid"}function $t(e,t,a){const s=new Map(t.map(i=>[i.id,i])),n=new Map(t.map(i=>[i.id,Number(i.totalAmount||0)])),r={cash:0,gcash:0,total:0};return[...e].sort((i,d)=>new Date(i.receivedAt).getTime()-new Date(d.receivedAt).getTime()||i.id-d.id).forEach(i=>{const d=s.get(i.orderId);if(!d)return;const u=n.get(d.id)??0,l=Math.min(Math.max(0,Number(i.amount||0)),u);n.set(d.id,Number((u-l).toFixed(2))),!(!a(i)||l<=0)&&(i.method==="gcash"?r.gcash+=l:r.cash+=l,r.total+=l)}),{cash:Number(r.cash.toFixed(2)),gcash:Number(r.gcash.toFixed(2)),total:Number(r.total.toFixed(2))}}function oe(e){return new Intl.DateTimeFormat("en-PH",{dateStyle:"medium",timeStyle:"short"}).format(new Date(e))}function Xa(e){const t=new Date(e),a=new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric",year:"numeric"}).format(t),s=new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",hour12:!0}).format(t);return`<div class="datetime-stack"><strong>${m(a)}</strong><span class="meta">${m(s)}</span></div>`}function Ka(e){return e?.role==="staff"&&e.branch==="Gensan Branch"}function Ga(e){return e?.role==="staff"&&e.branch.toLowerCase().includes("mintal")}function $e(e,t,a="data-table"){return`
    <div class="table-scroll">
      <table class="${a}">
        <thead><tr>${e.map(s=>`<th>${m(s)}</th>`).join("")}</tr></thead>
        <tbody>${t.length?t.map(s=>`<tr>${s.map(n=>`<td>${n}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${e.length}" class="table-empty">No records found.</td></tr>`}</tbody>
      </table>
    </div>
  `}function Va(e=new Date){return{date:new Intl.DateTimeFormat("en-PH",{weekday:"long",month:"long",day:"numeric",year:"numeric"}).format(e),time:new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",second:"2-digit",hour12:!0}).format(e)}}function we(){const e=document.querySelector("[data-date-from]"),t=document.querySelector("[data-date-to]"),a=Array.from(document.querySelectorAll('input[name="reportType"]:checked')).map(s=>s.value).filter(s=>s==="sales"||s==="disbursement"||s==="fold_count"||s==="revolving_fund"||s==="summary");return{from:e?.value||"0000-01-01",to:t?.value||"9999-12-31",types:a.length?a:["summary"]}}function he(e,t){return e>=t.from&&e<=t.to}function Rt(e,t,a,s,n,r,i,d){const u=new Set(d.types),l=e.filter(g=>he(K(g.createdAt),d)),o=a.filter(g=>he(g.saleDate,d)),v=s.filter(g=>he(g.expenseDate,d)),y=Wa(l,r),h=new Map;t.filter(g=>he(K(g.receivedAt),d)).forEach(g=>{const q=h.get(g.orderId)??{cash:0,gcash:0};g.method==="gcash"?q.gcash+=g.amount:q.cash+=g.amount,h.set(g.orderId,q)});const f=l.reduce((g,q)=>{const _=h.get(q.id);if(_){const z=_.cash+_.gcash;if(z>q.totalAmount){const ie=q.totalAmount/z;return g+_.cash*ie}return g+_.cash}return g+q.paidAmount},0),E=o.reduce((g,q)=>g+q.cashAmount,0),w=o.reduce((g,q)=>g+q.gcashAmount,0),I=l.reduce((g,q)=>{const _=h.get(q.id);if(_){const z=_.cash+_.gcash;if(z>q.totalAmount){const ie=q.totalAmount/z;return g+_.gcash*ie}return g+_.gcash}return g+0},0),p=f+E,b=I+w,A=p+b,L=v.reduce((g,q)=>g+q.amount,0),D=L,P=A-D,R=()=>({orderCashTotal:f,orderGcashTotal:I,manualCashTotal:E,manualGcashTotal:w,totalCash:p,totalGcash:b,totalSales:A,transactions:l.map(g=>{const q=h.get(g.id)??{cash:g.paidAmount,gcash:0},_=q.cash+q.gcash;let z=q.cash,ie=q.gcash,Ge=_;if(_>g.totalAmount){const Ve=g.totalAmount/_;z=q.cash*Ve,ie=q.gcash*Ve,Ge=g.totalAmount}return{ticket:g.ticket,customer:g.customer,cash:z,gcash:ie,total:Ge}}),manualSales:o.map(g=>({cash:g.cashAmount,gcash:g.gcashAmount,total:g.totalAmount}))}),O=()=>({totalExpenses:L,totalDisbursement:D,rows:[["Date/Month","id#","Type","Name","Category","Description","Amount"],...v.map(g=>[Ct(g),g.number,ee(g),g.name,g.category??"",g.description??"",g.amount]),[],["Total Disbursement","","","","","",D]]}),k=()=>({rows:[["Staff","Fold Count"],...y.map(g=>[g.staffName,g.folds]),[],["Total Folds",y.reduce((g,q)=>g+q.folds,0)]]}),U=n.filter(g=>he(K(g.createdAt),d));return{selection:d,selectedTypes:u,salesRows:R,disbursementRows:O,foldCountRows:k,revolvingDailySummaryRows:()=>({rows:[["Date of Sales","Cash on Hand","Status","Date Update"],...o.map(g=>{const q=At(g.saleDate,e,s,g.cashAmount),_=g.status==="revolving"?"Revolving":g.status==="endorsed"?`Endorsed to ${g.endorsedTo??""}`:"Pending";return[g.saleDate,q,_,g.statusUpdatedAt?K(g.statusUpdatedAt):""]})]}),revolvingHistoryRows:()=>({rows:[["Date","Number","Name","Amount","Category","Description","Type"],...U.map(g=>[K(g.createdAt),g.revolvingNumber,g.name,g.type==="disbursement"?-g.amount:g.amount,g.category,g.description??"",g.type==="add"?"Add Revolving Fund":"Disbursement"])]}),summaryRows:()=>{const g=R(),q=O();return[["Summary",d.from,"to",d.to],[],["Total Cash:","Total GCash:","Total Sales:"],["","",""],[g.totalCash,g.totalGcash,g.totalSales],["","",""],["Total Disbursement:","Total Profit:","Cash on Hand:"],["","",""],[q.totalDisbursement,P,xe(g.totalCash,q.totalDisbursement)]]},profit:P}}function Ya(e,t){return`<button class="nav-link ${t?"is-active":""}" data-tab="${e}" type="button">
    <span class="nav-icon">${Ja(e)}</span>
    <span>${We[e]}</span>
  </button>`}function F(e,t){return`<div class="section-head"><div><h2>${m(e)}</h2><p class="meta">${m(t)}</p></div></div>`}function lt(){return We[c.tab]??"Dashboard"}function Pe(e){return(e?.name??"Laba101").trim().slice(0,1).toUpperCase()}function Ja(e){return{dashboard:"DB",pos:"POS",orders:"PO",archived:"AR",customers:"CU",pricing:"PS",disbursements:"DR",reports:"RP",inventory:"IN",maintenance:"MT",staff:"ST",revolving:"RV",settings:"SE"}[e]}async function xt(){const e=await pe(),t=await va(e),a=await gt(),s=await fa(),n=await je(),r=await ha(),i=await Et(),d=await fe(e),u=await wa(),l=await Aa(),o=await Ca(),v=await Pa(),y=await Nt(e),h=await Ua(e),f=await Fa(),E=await ma(),w=await ht("report_email");return{branch:e,staff:t,allStaff:a,customers:s,services:n,allServices:r,categories:i,orders:d,payments:u,foldLogs:l,expenses:o,sales:v,machines:y,subcleanings:h,revolvingHistory:f,foldRate:E,reportEmail:w??""}}async function S(){if(!c.currentUser){Qa(),hs();return}const e=await xt();e.orders.filter(u=>u.status!=="claimed").length,e.orders.filter(u=>u.status==="ready").length,e.orders.reduce((u,l)=>u+l.paidAmount,0);const t=W(),a=$t(e.payments,e.orders,u=>u.branch===e.branch&&K(u.receivedAt)===t),s=a.gcash+e.sales.filter(u=>u.saleDate===t).reduce((u,l)=>u+l.gcashAmount,0),n=a.cash+e.sales.filter(u=>u.saleDate===t).reduce((u,l)=>u+l.cashAmount,0),r=n+s,i=e.expenses.filter(u=>ee(u)==="daily"&&u.expenseDate===t).reduce((u,l)=>u+l.amount,0),d=xe(n,i);e.sales.reduce((u,l)=>u+l.totalAmount,0),e.expenses.reduce((u,l)=>u+l.amount,0),He.innerHTML=`
    <div class="app-frame">
      <header class="topbar">
        <div class="topbar-left">
          <img src="/laba101-logo.svg" alt="Laba101" class="topbar-logo" />
          <div>
            <p class="eyebrow">Offline mobile system</p>
            <h1>${m(lt())}</h1>
          </div>
        </div>
        <div class="topbar-actions">
          <div class="branch-pill"><span>Branch</span><strong>${m(e.branch)}</strong></div>
          <button class="icon-button" type="button" aria-label="Notifications">!</button>
          <button class="profile-pill" type="button">
            <span>${Pe(c.currentUser)}</span>
            <strong>${m(c.currentUser.name)}</strong>
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
            <strong>${m(e.branch)}</strong>
          </div>
          <p class="sidebar-app-name">Laba101 POS</p>
        </div>
        <div class="sidebar-user">
          <span class="avatar">${Pe(c.currentUser)}</span>
          <div>
            <strong>${m(c.currentUser.name)}</strong>
            <small>${m(c.currentUser.email)} / ${m(c.currentUser.role)}</small>
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
            <h2>${m(lt())}</h2>
          </div>
          <div class="navbar-time">
            <strong data-navbar-time>--:--</strong>
            <span data-navbar-date>Loading...</span>
          </div>
          <button class="mobile-avatar" type="button">${Pe(c.currentUser)}</button>
        </header>

        ${c.tab==="dashboard"?Za({paidToday:r,cashPaidToday:n,gcashPaidToday:s,disbursementToday:i,cashOnHandToday:d,orders:e.orders,payments:e.payments,sales:e.sales}):""}
        ${c.tab==="pos"?es(e.orders,e.customers,e.services,e.categories,e.payments,e.branch):""}
        ${c.tab==="orders"?ts(e.orders,e.staff,e.services,e.payments):""}
        ${c.tab==="archived"?as(e.orders,e.staff,e.services,e.payments):""}
        ${c.tab==="customers"?cs(e.customers,e.orders):""}
        ${c.tab==="pricing"?ls(e.allServices,e.categories):""}
        ${c.tab==="disbursements"?ds(e.expenses,e.sales):""}
        ${c.tab==="reports"?us(e.orders,e.payments,e.sales,e.expenses,e.revolvingHistory,e.allStaff,e.foldRate):""}
        ${c.tab==="inventory"?ms(e.services,e.categories):""}
        ${c.tab==="maintenance"?vs(e.machines,e.subcleanings,e.branch):""}
        ${c.tab==="staff"?ps(e.allStaff,e.branch):""}
        ${c.tab==="revolving"?Rs(e.sales,e.revolvingHistory,e.orders,e.expenses):""}
        ${c.tab==="settings"?fs(e.branch,e.foldRate,e.reportEmail):""}
      </main>
    </div>
  `,ys(),bs(e),Es(e.allServices),Ss(e.expenses),ws(e.orders,e.payments,e.sales,e.expenses,e.revolvingHistory,e.foldRate),Ts(),Ns(),As(),Ls(e.allStaff),xs(),Cs(),gs()}function Dt(){if(c.currentUser?.role==="admin")return Object.keys(We).filter(t=>t!=="inventory");const e=["dashboard","pos","orders","archived","disbursements","reports","maintenance","revolving"];return Ka(c.currentUser)?["dashboard","disbursements","reports","maintenance","revolving"]:Ga(c.currentUser)?e.filter(t=>t!=="revolving"):e}function Qa(){He.innerHTML=`
    <main class="login-page">

      <section class="login-panel-wrap">
        <article class="login-panel">
          <header>
            <div class="login-mark"><img src="/laba101-logo.svg" alt="Laba101" /></div>
            <h2>Welcome back</h2>
            <p>Sign in to continue managing today&apos;s laundry operations.</p>
          </header>
          ${c.loginError?`<div class="alert">${m(c.loginError)}</div>`:""}
          <form id="login-form" class="form">
            <label>Email address<input name="email" type="email" autocomplete="username" placeholder="admin@laba101.test or staff@laba101.gensan" required /></label>
            <label>Password<input name="password" type="password" autocomplete="current-password" placeholder="password" required /></label>
            <label class="remember"><input name="remember" type="checkbox" value="1" /> Remember me on this device</label>
            <button class="primary" id="login-button" type="submit">Sign in</button>
          </form>
        </article>
      </section>
    </main>
  `}function za(){document.querySelectorAll("[data-fill-email]").forEach(e=>{e.addEventListener("click",()=>{const t=document.querySelector('input[name="email"]'),a=document.querySelector('input[name="password"]');t&&(t.value=e.dataset.fillEmail??""),a&&(a.value=e.dataset.fillPassword??"")})})}function Za(e){const t=new Date,a=Array.from({length:7},(i,d)=>{const u=new Date(t);return u.setDate(t.getDate()-(6-d)),new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric"}).format(u)}),s=Array.from({length:7},(i,d)=>{const u=new Date(t);u.setDate(t.getDate()-(6-d));const l=be(u),o=$t(e.payments,e.orders,y=>K(y.receivedAt)===l).total,v=e.sales.filter(y=>y.saleDate===l).reduce((y,h)=>y+h.totalAmount,0);return o+v}),n=Math.max(1,...s),r=210;return`
    <section class="dashboard-main">
      <article class="panel revenue-panel">
        ${F("Revenue overview","Paid amount for the last 7 days.")}
        <div class="stats compact dashboard-stats">
          <div class="stat paid-today-stat">
            <span class="card-label">Paid Today</span>
            <div class="value">${N(e.paidToday)}</div>
            <div class="stat-breakdown"><span>Cash ${N(e.cashPaidToday)}</span><span>GCash ${N(e.gcashPaidToday)}</span></div>
          </div>
          <div class="stat"><span class="card-label">Disbursement</span><div class="value">${N(e.disbursementToday)}</div></div>
          <div class="stat"><span class="card-label">Cash on Hand</span><div class="value">${N(e.cashOnHandToday)}</div></div>
        </div>
        <div class="chart-shell">
          <div class="mini-chart revenue-chart">
            ${s.map((i,d)=>{const u=Math.max(12,Math.round(i/n*r));return`<div class="chart-bar ${d===s.length-1?"is-today":""}"><span style="height:${u}px"></span><strong>${N(i)}</strong></div>`}).join("")}
          </div>
          <div class="chart-days">${a.map(i=>`<span>${m(i)}</span>`).join("")}</div>
        </div>
        <div class="chart-footnote">Values include POS payments and Daily Report sales input.</div>
      </article>
    </section>
  `}function es(e,t,a,s,n,r){const i=a.filter(l=>l.serviceType==="order"&&l.isActive),d=a.filter(l=>l.serviceType==="addon"&&l.isActive),u=c.receiptOrderId?e.find(l=>l.id===c.receiptOrderId):null;return`
    <section class="grid content full">
      <article class="panel span-2">
        ${F("New POS order","Search for a customer or type a new name, pick services and confirm")}
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
              <b>${N(l.price)}</b>
              <div class="qty-control">
                <button type="button" data-qty-minus="serviceQty-${l.id}" aria-label="Decrease ${m(l.name)}">-</button>
                <input type="number" name="serviceQty-${l.id}" min="0" step="1" value="0" inputmode="numeric" />
                <button type="button" data-qty-plus="serviceQty-${l.id}" aria-label="Increase ${m(l.name)}">+</button>
              </div>
            </div>`).join("")}
          </fieldset>

          <fieldset class="check-grid">
            <legend>Extra services</legend>
            ${d.length?d.map(l=>`<div class="qty-card addon-quantity" data-qty-card="addonQty-${l.id}">
              <span><strong>${m(Z(l.name))}</strong><small>${N(l.price)} each</small></span>
              <div class="qty-control">
                <button type="button" data-qty-minus="addonQty-${l.id}" aria-label="Decrease ${m(Z(l.name))}">-</button>
                <input type="number" name="addonQty-${l.id}" min="0" step="1" value="0" inputmode="numeric" />
                <button type="button" data-qty-plus="addonQty-${l.id}" aria-label="Increase ${m(Z(l.name))}">+</button>
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

      ${u?Ke(u,n.filter(l=>l.orderId===u.id)):""}
    </section>
  `}function ts(e,t,a,s){const n=c.receiptOrderId?e.find(o=>o.id===c.receiptOrderId):null,r=e.filter(o=>o.status!=="claimed"),i=c.orderSearch.trim().toLowerCase(),d=c.orderDateFilter.trim(),u=c.orderPaymentFilter.trim().toLowerCase(),l=r.filter(o=>{const v=!i||[o.ticket,o.customer,o.phone,o.service,o.itemCategory,o.status].some(f=>String(f??"").toLowerCase().includes(i)),y=!d||K(o.createdAt)===d,h=!u||Xe(o)===u;return v&&y&&h});return`
    <section class="grid content full">
      <article class="panel span-2">
        ${F("Order queue","Workflow, payment, and receipts")}
        <form class="queue-filters" id="order-queue-filters">
          <label>
            <span>Search queue</span>
            <input name="orderSearch" type="search" placeholder="Ticket, name, service, status" value="${m(c.orderSearch)}" autocomplete="off" />
          </label>
          <label>
            <span>Filter date</span>
            <input name="orderDateFilter" type="date" value="${m(c.orderDateFilter)}" />
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
          <div><span>Claimed archived</span><strong>${e.filter(o=>o.status==="claimed").length}</strong></div>
        </div>
        <div style="overflow-x: auto; width: 100%; -webkit-overflow-scrolling: touch;">
          <table class="data-table orders-data-table">
            <thead>
              <tr><th>Ticket</th><th>Customer</th><th>Service</th><th>Total Payment</th><th>Actions</th></tr>
            </thead>
            <tbody>
              ${l.map(o=>Ot(o,t,a)).join("")||'<tr><td colspan="5" class="table-empty">No matching active orders.</td></tr>'}
            </tbody>
          </table>
        </div>
      </article>
      ${n?Ke(n,s.filter(o=>o.orderId===n.id)):""}
      ${c.paymentModalOrderId?ss(e.find(o=>o.id===c.paymentModalOrderId)):""}
    </section>
  `}function as(e,t,a,s){const n=e.filter(u=>u.status==="claimed"),r=c.archivedOrderSearch.trim().toLowerCase(),i=n.filter(u=>r?[u.ticket,u.customer,u.phone,u.service,u.itemCategory].some(l=>String(l??"").toLowerCase().includes(r)):!0),d=c.receiptOrderId?e.find(u=>u.id===c.receiptOrderId):null;return`
    <section class="grid content full">
      <article class="panel span-2">
        ${F("Archived orders","All claimed orders are listed here")}
        <form class="queue-filters" id="archived-order-filters">
          <label>
            <span>Search archived</span>
            <input name="archivedOrderSearch" type="search" placeholder="Ticket, name, service" value="${m(c.archivedOrderSearch)}" autocomplete="off" />
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
        <div style="overflow-x: auto; width: 100%; -webkit-overflow-scrolling: touch;">
          <table class="data-table orders-data-table archived-orders-table">
            <thead>
              <tr><th>Ticket</th><th>Customer</th><th>Service</th><th>Total Payment</th><th>Actions</th></tr>
            </thead>
            <tbody>
              ${i.map(u=>Ot(u,t,a)).join("")||'<tr><td colspan="5" class="table-empty">No archived orders found.</td></tr>'}
            </tbody>
          </table>
        </div>
      </article>
      ${d?Ke(d,s.filter(u=>u.orderId===d.id)):""}
    </section>
  `}function Ot(e,t,a){const s=St(),n=e.workflowCompleted.includes("fold"),r=e.workflowCompleted.includes("claimed"),i=s.find(f=>!e.workflowCompleted.includes(f.key)),d=i?.key==="fold",u=Xe(e),l=e.extras.length?e.extras.map(f=>`${m(Z(f.name))} x${Number(f.quantity??1)}`).join(", "):"",o=c.currentUser?.role==="admin",v=e.status!=="claimed"&&e.paidAmount<=0,y=e.status!=="claimed"&&o&&e.paidAmount>0;let h=1;if(e.serviceLines){let f=0;e.serviceLines.forEach(E=>{const w=a.find(I=>I.id===E.id);w&&Array.isArray(w.includes)&&w.includes.includes("Fold")&&(f+=E.quantity)}),f>0&&(h=f)}return`
    <tr class="order-row-main">
      <td><strong>${m(e.ticket)}</strong><div class="small">${m(oe(e.createdAt))}</div></td>
      <td>${m(e.customer)}<div class="small">${m(e.phone??"")}</div></td>
      <td>${m(e.service)}${l?`<div class="small">Extras: ${l}</div>`:""}</td>
      <td class="amount-cell"><strong>${N(e.totalAmount)}</strong><div class="small ${u==="paid"?"ok":u==="partial"?"warn":"meta"}">${m(u)} &middot; Bal: ${N(e.balance)}</div></td>
      <td>
      <div class="row-actions">
        ${n?r?"":`<form class="inline-form advance-form" data-order-id="${e.id}" data-action="claim" data-balance="${e.balance}">
          <button class="secondary" type="submit">Claim</button>
        </form>`:`<form class="inline-form advance-form flex-wrap" data-order-id="${e.id}">
          ${d?Array.from({length:h}).map((f,E)=>`<select name="assignedStaffId" required>
            <option value="">-- Staff ${h>1?`(Fold ${E+1})`:""}--</option>
            ${t.map(w=>`<option value="${w.id}">${m(w.name)}</option>`).join("")}
          </select>`).join(""):""}
          <button class="secondary" type="submit">Fold</button>
        </form>`}
        ${e.balance>0?`
          <form class="inline-form payment-form" data-order-id="${e.id}">
            <input name="amount" type="number" min="0.01" step="0.01" value="${e.balance}" />
            <select name="method"><option value="cash">Cash</option><option value="gcash">GCash</option></select>
            <input name="reference" placeholder="GCash ref" hidden />
            <button class="secondary" type="submit">Pay</button>
          </form>
        `:""}
        ${v?`<button class="secondary btn-sm" type="button" data-cancel-order="${e.id}">Cancel</button>`:""}
        ${y?`<button class="secondary btn-sm" type="button" data-delete-order="${e.id}">Delete</button>`:""}
        <button class="secondary btn-sm" data-receipt="${e.id}">Receipt</button>
      </div>
      </td>
    </tr>
    <tr class="order-row-detail">
      <td colspan="5">
        <div class="order-detail-row">
          <div class="${e.status==="ready"||e.status==="claimed"?"ok":"warn"}">${m(e.status)}</div>
          <div class="workflow-progress order-workflow-progress">
            ${s.map(f=>`<span class="${e.workflowCompleted.includes(f.key)?"is-done":i?.key===f.key?"is-next":""}">${m(f.label)}</span>`).join("")}
          </div>
        </div>
      </td>
    </tr>
  `}function ss(e){return e?`
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="payment-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-close-payment-modal>Close</button>
        </div>
        <div class="receipt" style="border: 1px solid var(--line); border-style: solid; box-shadow: none;">
          <h3 id="payment-title" style="margin-top:0">Payment Required</h3>
          <p>Please settle the remaining balance of <strong>${N(e.balance)}</strong> for ticket <strong>${m(e.ticket)}</strong> before claiming.</p>
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
  `:""}function Ke(e,t){const a=t.reduce((i,d)=>i+Number(d.amount),0),s=Math.max(0,Number((a-e.totalAmount).toFixed(2))),n=Xe(e),r=n.charAt(0).toUpperCase()+n.slice(1);return`
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="receipt-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-open-printer-panel>Printer</button>
          <button class="primary" type="button" data-thermal-print>${c.printerLoading?"Printing...":"Print Receipt"}</button>
          <button class="secondary" type="button" data-close-receipt>Close</button>
        </div>
        ${c.printerPanelOpen?ns():""}
        <div class="receipt" id="receipt-print-area">
          <div class="receipt-head">
            <h3 id="receipt-title">Laba101</h3>
            <p>${m(e.ticket)}<br>${m(oe(e.createdAt))}</p>
          </div>
          ${c.currentUser?`<p class="receipt-staff">Staff: ${m(c.currentUser.name)}</p>`:""}
          <div class="receipt-customer">
            <strong>${m(e.customer)}</strong>
            <span>${m(e.phone??"No phone")}</span>
          </div>
          <div class="summary-list receipt-lines">
            <div><span>Service</span><strong>${m(e.service)}</strong></div>
            ${e.extras.length?`<div><span>Extra services</span><strong>${e.extras.map(i=>`${m(Z(i.name))} x${Number(i.quantity??1)} (${N(Number(i.total??i.price))})`).join(", ")}</strong></div>`:""}
            <div><span>Total</span><strong>${N(e.totalAmount)}</strong></div>
            <div><span>Tendered</span><strong>${N(a)}</strong></div>
            <div><span>Paid</span><strong>${N(e.paidAmount)}</strong></div>
            <div><span>Payment status</span><strong>${r}</strong></div>
            <div><span>Change</span><strong>${N(s)}</strong></div>
            <div><span>Balance</span><strong>${N(e.balance)}</strong></div>
          </div>
          <h3>Payments</h3>
          <div class="receipt-payments">
            ${t.map(i=>`<div><span>${m(i.method.toUpperCase())}</span><strong>${N(i.amount)}</strong>${i.reference?`<small>Ref ${m(i.reference)}</small>`:""}</div>`).join("")||'<p class="helper">No payments yet.</p>'}
          </div>
        </div>
      </div>
    </div>
  `}function ns(){return`
    <div class="printer-panel">
      <div class="printer-panel-head">
        <strong>Bluetooth thermal printer</strong>
        <button class="secondary" type="button" data-refresh-printers>${c.printerLoading?"Scanning...":"Scan paired"}</button>
      </div>
      <div class="printer-fields">
        <label>Printer
          <select data-printer-select>
            <option value="">Select paired printer</option>
            ${c.pairedPrinters.map(e=>`<option value="${m(e.address)}" ${c.selectedPrinterAddress===e.address?"selected":""}>${m(e.name)} - ${m(e.address)}</option>`).join("")}
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
      ${c.printerStatus?`<p class="printer-status ok">${m(c.printerStatus)}</p>`:""}
      ${c.printerError?`<p class="printer-status warn">${m(c.printerError)}</p>`:""}
    </div>
  `}async function dt(){c.printerLoading=!0,c.printerError="",c.printerStatus="",await S();try{if(!(await ve.requestBluetoothPermissions()).granted)throw new Error("Bluetooth permission was not granted.");const t=await ve.listPairedPrinters();c.pairedPrinters=t.printers??[],c.selectedPrinterAddress=c.selectedPrinterAddress||t.savedAddress||c.pairedPrinters[0]?.address||"",c.printerStatus=c.pairedPrinters.length?"Select a printer, then connect.":"No paired printers found. Pair the printer in Android Bluetooth settings first."}catch(e){c.printerError=e instanceof Error?e.message:"Could not scan paired printers."}finally{c.printerLoading=!1,await S()}}async function rs(){if(!c.selectedPrinterAddress){c.printerError="Select a paired printer first.",await S();return}c.printerLoading=!0,c.printerError="",c.printerStatus="",await S();try{await ve.savePrinter({address:c.selectedPrinterAddress}),await ve.connect({address:c.selectedPrinterAddress}),c.printerStatus="Printer connected and saved."}catch(e){c.printerError=e instanceof Error?e.message:"Printer connection failed."}finally{c.printerLoading=!1,await S()}}function is(e){const t=(e.serviceLines?.length?e.serviceLines:[{id:e.serviceId,name:e.service,price:e.price,quantity:1,total:e.price}]).map(s=>({name:s.name,quantity:Number(s.quantity||1),price:Number(s.price||0)})),a=e.extras.map(s=>({name:Z(s.name),quantity:Number(s.quantity??1),price:Number(s.price||0)}));return[...t,...a]}async function os(e,t){const a=t.reduce((n,r)=>n+Number(r.amount),0),s=Math.max(0,Number((a-e.totalAmount).toFixed(2)));c.printerLoading=!0,c.printerError="",c.printerStatus="",await S();try{if(!c.selectedPrinterAddress){const n=await ve.getSavedPrinter();c.selectedPrinterAddress=n.address||""}await ve.printReceipt({address:c.selectedPrinterAddress||void 0,paperWidth:c.printerPaperWidth,storeName:"Laba101",receiptNumber:e.ticket,dateTime:oe(e.createdAt),customerName:e.customer,customerPhone:e.phone?.trim()||"No phone",items:is(e),totalAmount:e.totalAmount,paidAmount:e.paidAmount,changeAmount:s,balanceAmount:e.balance,staffName:c.currentUser?.name?.trim()||"Staff"}),c.printerStatus="Receipt sent to printer."}catch(n){c.printerPanelOpen=!0,c.printerError=n instanceof Error?n.message:"Bluetooth thermal print failed."}finally{c.printerLoading=!1,await S()}}function cs(e,t){const a=c.customerSearch.trim().toLowerCase(),s=e.filter(n=>a?n.name.toLowerCase().includes(a):!1);return`
    <section class="grid content full">
      <article class="panel">
        ${F("Customer Management","Customer records from local offline storage")}
        <form class="search-box" id="customer-search-form">
          <label>
            <span>Search customer name</span>
            <input name="customerSearch" data-customer-search type="search" placeholder="Type the customer name then tap Search" value="${m(c.customerSearch)}" autocomplete="off" />
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
        ${F("Customer list","Names, phones, addresses, and order history")}
        <div class="customer-stack">
          ${a?s.map(n=>{const r=t.filter(i=>i.customerId===n.id);return`
              <article class="customer-card">
                <header>
                  <div>
                    <strong>${m(n.name)}</strong>
                    <p>${m(n.phone??"No phone")} · ${m(n.address??"No address")}</p>
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
                        <strong>${N(i.totalAmount)}</strong>
                        <span>${m(i.status)}</span>
                      </div>
                    </div>`).join(""):'<p class="helper">No order records yet.</p>'}
                </div>
              </article>`}).join(""):'<div class="helper">Search a customer name to display matching records and their order history.</div>'}
        </div>
      </article>
    </section>
  `}function ls(e,t){const a=e.filter(n=>n.serviceType==="order"),s=e.filter(n=>n.serviceType==="addon");return`
    <section class="grid content full">
      <article class="panel">
        ${F("Services","Order services and add-ons used by POS pricing")}
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
        ${F("Item categories","Load limits and extra fees")}
        <form id="category-form" class="form">
          <div class="form-row">
            <label>Name<input name="name" required /></label>
            <label>Max KG<input name="maxKg" type="number" min="0.25" step="0.01" required /></label>
          </div>
          <button class="primary" type="submit">Save category</button>
        </form>
      </article>
      <article class="panel span-2">
        ${F("Services Table","Order services")}
        <div class="table-scroll">
          <div class="table data-table">
            <div class="table-head"><div>Name</div><div>Category</div><div>Price</div><div>Max KG</div><div>Includes</div><div>Status</div><div>Actions</div></div>
            ${a.map(n=>`<div class="table-row"><div><strong>${m(n.name)}</strong></div><div>${m(n.category)}</div><div>${N(n.price)}</div><div>${n.maxKg} kg</div><div>${m(n.includes.join(", ")||"none")}</div><div>${n.isActive?"Active":"Inactive"}</div><div class="row-actions"><button class="secondary edit-service-btn" data-id="${n.id}">Edit</button>${n.isActive?`<button class="secondary deactivate-service-btn" data-id="${n.id}">Deactivate</button>`:`<button class="secondary activate-service-btn" data-id="${n.id}">Activate</button>`}</div></div>`).join("")||'<div class="helper">No order services yet.</div>'}
          </div>
        </div>
        <div class="section-divider"></div>
        ${F("Extra Services Table","Add-on services")}
        <div class="table-scroll">
          <div class="table data-table extra-services-table">
            <div class="table-head"><div>Name</div><div>Category</div><div>Price</div><div>Includes</div><div>Status</div><div>Actions</div></div>
            ${s.map(n=>`<div class="table-row"><div><strong>${m(n.name)}</strong></div><div>${m(n.category)}</div><div>${N(n.price)}</div><div>${m(n.includes.join(", ")||"none")}</div><div>${n.isActive?"Active":"Inactive"}</div><div class="row-actions"><button class="secondary edit-service-btn" data-id="${n.id}">Edit</button>${n.isActive?`<button class="secondary deactivate-service-btn" data-id="${n.id}">Deactivate</button>`:`<button class="secondary activate-service-btn" data-id="${n.id}">Activate</button>`}</div></div>`).join("")||'<div class="helper">No extra services yet.</div>'}
          </div>
        </div>
      </article>
    </section>
  `}function ds(e,t){const a=W(),s=a.slice(0,7),n=c.currentUser?.role==="admin",r=Array.from(new Set([...Ha,...e.map(o=>o.category).filter(Boolean)])),i=e.filter(o=>ee(o)==="daily"&&o.expenseDate===a).reduce((o,v)=>o+v.amount,0),d=e.filter(o=>ee(o)==="monthly"&&o.expenseDate.startsWith(s)).reduce((o,v)=>o+v.amount,0),u=t.filter(o=>o.saleDate===a).reduce((o,v)=>o+v.totalAmount,0),l=t.filter(o=>o.saleDate.startsWith(s)).reduce((o,v)=>o+v.totalAmount,0);return`
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
      <div class="panel stat"><div class="card-label">Daily disbursement</div><div class="value">${N(i)}</div></div>
      <div class="panel stat"><div class="card-label">Monthly disbursement</div><div class="value">${N(d)}</div></div>
      <div class="panel stat"><div class="card-label">Today sales input</div><div class="value">${N(u)}</div></div>
      <div class="panel stat"><div class="card-label">Month sales input</div><div class="value">${N(l)}</div></div>
    </section>
    ${c.dailyReportTab==="expenses"?`
    <section class="grid content full">
      <article class="panel">
        ${F("Input disbursement","Supplies, utilities, and cash disbursements")}
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
            <label class="expense-date-field">Date<input name="expenseDate" type="date" value="${W()}" required /></label>
            <label class="expense-month-field" hidden>Month<input name="expenseMonth" type="month" value="${Me()}" /></label>
            <label>Amount<input name="amount" type="number" min="0" step="0.01" required placeholder="0.00" /></label>
          </div>
          <div class="form-row"><label>Title / Name<input name="name" required /></label><label>Category<select name="category" required>${r.map(o=>`<option value="${m(o)}">${m(o)}</option>`).join("")}</select></label></div>
          <label>Description<textarea name="description"></textarea></label>
          <button class="primary" type="submit">Save expense</button>
        </form>
      </article>
      <article class="panel">
        ${F("Disbursement list","Expenses only")}
        <div class="table-scroll daily-report-scroll">
          <div class="table daily-report-table">
            <div class="table-head"><div>Date/Month</div><div>No.</div><div>Name</div><div>Category</div><div>Amount</div><div>Action</div></div>
            ${e.map(o=>`<div class="table-row"><div>${m(Ct(o))}<div class="small">${m(ee(o))}</div></div><div>${m(o.number)}</div><div>${m(o.name)}</div><div>${m(o.category)}</div><div>${N(o.amount)}</div><div class="row-actions"><button class="secondary edit-expense-btn" data-id="${o.id}" type="button">Edit</button>${n?`<button class="secondary delete-expense-btn" data-id="${o.id}" type="button">Delete</button>`:""}</div></div>`).join("")||'<div class="helper">No expenses yet.</div>'}
          </div>
        </div>
      </article>
    </section>
    `:`
    <section class="grid content full">
      <article class="panel">
        ${F("Input total sale","Manual cash and GCash totals")}
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
        ${F("Daily sales history","Cash, GCash, total sale, notes, and updates")}
        <div class="table-scroll daily-report-scroll">
          <div class="table wide-table daily-report-table">
            <div class="table-head"><div>Sales #</div><div>Date</div><div>Cash</div><div>GCash</div><div>Total sale</div><div>Action</div></div>
            ${t.map(o=>`<div class="table-row"><div>${m(o.saleNumber)}</div><div>${m(o.saleDate)}</div><div>${N(o.cashAmount)}</div><div>${N(o.gcashAmount)}</div><div><strong>${N(o.totalAmount)}</strong></div><div class="row-actions"><button class="secondary edit-sale-btn" data-id="${o.id}" type="button">Edit</button>${n?`<button class="secondary delete-sale-btn" data-id="${o.id}" type="button">Delete</button>`:""}</div></div>`).join("")||'<div class="helper">No daily sales totals yet.</div>'}
          </div>
        </div>
      </article>
    </section>
    `}
  `}function us(e,t,a,s,n,r,i,d,u,l){const o=c.reportPreview?Rt(e,t,a,s,n,r,i,c.reportPreview):null;return`
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
    ${o?`
      <section class="panel report-preview">
        ${o.selectedTypes.has("sales")?`
          <article>
            ${F("Sales report preview",`${o.selection.from} to ${o.selection.to}`)}
            <div class="table wide-table report-preview-table sales-table">
              <div class="table-head report-table-head"><div>Ticket</div><div>Customer</div><div>Cash</div><div>GCash</div><div>Total Payment</div></div>
              ${o.salesRows().transactions.map(v=>`<div class="table-row report-table-row"><div>${m(v.ticket)}</div><div>${m(v.customer)}</div><div>${N(v.cash)}</div><div>${N(v.gcash)}</div><div>${N(v.total)}</div></div>`).join("")}
            </div>
            <div class="sales-summary-section">
              <h3>Sales Summary</h3>
              <div class="table sales-summary-table">
                <div class="table-head"><div>Sales Type</div><div>Cash</div><div>GCash</div><div>Sales</div></div>
                <div class="table-row"><div>Orders</div><div>${N(o.salesRows().orderCashTotal)}</div><div>${N(o.salesRows().orderGcashTotal)}</div><div>${N(o.salesRows().orderCashTotal+o.salesRows().orderGcashTotal)}</div></div>
                <div class="table-row"><div>Whole Sale Day</div><div>${N(o.salesRows().manualCashTotal)}</div><div>${N(o.salesRows().manualGcashTotal)}</div><div>${N(o.salesRows().manualCashTotal+o.salesRows().manualGcashTotal)}</div></div>
                <div class="table-row total-row"><div>Total</div><div>${N(o.salesRows().totalCash)}</div><div>${N(o.salesRows().totalGcash)}</div><div>${N(o.salesRows().totalSales)}</div></div>
              </div>
            </div>
          </article>`:""}
        ${o.selectedTypes.has("disbursement")?`
          <article>
            ${F("Disbursement preview",`${o.selection.from} to ${o.selection.to}`)}
            <div class="table wide-table report-preview-table report-disbursement-table">
              <div class="table-head report-table-head"><div>ID#</div><div>Date/Month</div><div>Type</div><div>Name</div><div>Category</div><div>Amount</div></div>
              ${o.disbursementRows().rows.slice(1).filter(v=>v.length&&v[0]!=="Total Disbursement").map(v=>`<div class="table-row report-table-row"><div>${m(v[1]??"")}</div><div>${m(v[0]??"")}</div><div>${m(v[2]??"")}</div><div>${m(v[3]??"")}</div><div>${m(v[4]??"")}</div><div>${N(v[6])}</div></div>`).join("")}
            </div>
            <div class="disbursement-total">
              <strong>Total Disbursement: ${N(o.disbursementRows().totalDisbursement)}</strong>
            </div>
          </article>`:""}
        ${o.selectedTypes.has("fold_count")?`
          <article>
            ${F("Fold Count preview",`${o.selection.from} to ${o.selection.to}`)}
            <div class="table report-preview-table">
              <div class="table-head"><div>Staff</div><div>Fold Count</div></div>
              ${o.foldCountRows().rows.slice(1).map(v=>`<div class="table-row">${v.map(y=>`<div>${m(y??"")}</div>`).join("")}</div>`).join("")}
            </div>
          </article>`:""}
        ${o.selectedTypes.has("revolving_fund")?`
          <article>
            ${F("Revolving Fund — Daily Summary",`${o.selection.from} to ${o.selection.to}`)}
            ${$e(["Date of Sales","Cash on Hand","Status","Date Update"],o.revolvingDailySummaryRows().rows.slice(1).map(v=>[m(String(v[0]??"")),m(String(v[1]??"")),m(String(v[2]??"")),m(String(v[3]??""))]),"data-table revolving-report-table")}
          </article>
          <article>
            ${F("Revolving Fund — Table History",`${o.selection.from} to ${o.selection.to}`)}
            ${$e(["Date","Number","Name","Amount","Category","Description","Type"],o.revolvingHistoryRows().rows.slice(1).map(v=>[m(String(v[0]??"")),m(String(v[1]??"")),m(String(v[2]??"")),m(String(v[3]??"")),m(String(v[4]??"")),m(String(v[5]??"")),m(String(v[6]??""))]),"data-table revolving-report-table")}
          </article>`:""}
        ${o.selectedTypes.has("summary")?`
          <article>
            ${F("Summary preview",`${o.selection.from} to ${o.selection.to}`)}
            <div class="summary-cards-grid summary-single-row">
              <div class="summary-card"><span class="card-label">Total Sales</span><div class="card-details"><span>Total Cash: ${N(o.salesRows().totalCash)}</span><span>Total GCash: ${N(o.salesRows().totalGcash)}</span></div><strong>${N(o.salesRows().totalSales)}</strong></div>
              <div class="summary-card"><span class="card-label">Total Disbursement</span><strong>${N(o.disbursementRows().totalDisbursement)}</strong></div>
              <div class="summary-card"><span class="card-label">Cash on Hand</span><strong>${N(xe(o.salesRows().totalCash,o.disbursementRows().totalDisbursement))}</strong></div>
            </div>
          </article>`:""}
      </section>
    `:""}
  `}function ms(e,t){return`
    <section class="grid content full">
      <article class="panel">
        ${F("Inventory","Service catalog and item load limits")}
        <div class="summary-list">
          <div><span>Active services</span><strong>${e.filter(a=>a.isActive).length}</strong></div>
          <div><span>Item categories</span><strong>${t.length}</strong></div>
        </div>
      </article>
      <article class="panel">
        ${F("Service inventory","Current sellable laundry services")}
        <div class="table">
          <div class="table-head"><div>Name</div><div>Category</div><div>Price</div><div>Max KG</div><div>Status</div></div>
          ${e.map(a=>`<div class="table-row"><div><strong>${m(a.name)}</strong></div><div>${m(a.category)}</div><div>${N(a.price)}</div><div>${a.maxKg} kg</div><div>${a.isActive?"Active":"Inactive"}</div></div>`).join("")}
        </div>
      </article>
    </section>
  `}function vs(e,t,a){const s=e.filter(r=>r.status!=="under_cleaning"),n=e.filter(r=>r.status==="under_cleaning");return`
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
        ${F("Available Machines","Select machines to start cleaning.")}
        <form id="subcleaning-form" class="form">
          <input type="hidden" name="date" value="${W()}" />
          <fieldset class="machine-list">
            ${s.map(r=>`<label class="machine-card"><input type="checkbox" name="machineIds" value="${r.id}" /><span><strong>${m(r.machineName)}</strong><small>${m(r.machineType)}</small></span><em></em></label>`).join("")||'<p class="helper">All machines are currently being cleaned.</p>'}
          </fieldset>
          <input type="hidden" name="cleaningStatus" value="in_progress" />
          <label>Notes <textarea name="notes" placeholder="e.g. Deep clean filters"></textarea></label>
          <input type="hidden" name="branch" value="${m(a)}" />
          <button class="primary" type="submit">Start Cleaning</button>
        </form>
      </article>
      <article class="panel warning-panel">
        ${F("Under Cleaning","Machines currently being serviced.")}
        <div class="machine-stack">
          ${n.length?n.map(r=>`
            <div class="machine-status">
              <span><strong>${m(r.machineName)}</strong><small>${m(r.machineType)}</small></span>
              <b>In progress</b>
              <button class="secondary complete-cleaning-btn" type="button" data-machine-id="${r.id}" data-branch="${m(a)}">Mark Complete</button>
            </div>`).join(""):'<p class="helper">No machines under cleaning right now.</p>'}
        </div>
      </article>
      <article class="panel span-2">
        ${F("Daily Cleaning Checklist","Track which machines have been cleaned today.")}
        <div class="table">
          <div class="table-head"><div>Machine</div><div>Type</div><div>Status</div><div>Notes</div><div>Date</div></div>
          ${e.map(r=>{const i=t.find(d=>d.machineIds.includes(r.id)&&d.date===W());return`<div class="table-row"><div><strong>${m(r.machineName)}</strong></div><div>${m(r.machineType)}</div><div>${i?m(i.cleaningStatus.replace("_"," ")):"Not Cleaned"}</div><div>${m(i?.notes??"-")}</div><div>${W()}</div></div>`}).join("")}
        </div>
      </article>
    </section>
    `:`
    <section class="grid content full">
      <article class="panel">
        ${F("Add Machine","Create washer and dryer records")}
        <form id="machine-form" class="form">
          <label>Machine Name<input name="machineName" required placeholder="e.g. Washer 5" /></label>
          <label>Type<select name="machineType"><option value="washer">Washer</option><option value="dryer">Dryer</option></select></label>
          <label>Status<select name="status"><option value="available">Available</option><option value="under_cleaning">Under Cleaning</option><option value="maintenance">Maintenance</option></select></label>
          <input type="hidden" name="branch" value="${m(a)}" />
          <button class="primary" type="submit">Add machine</button>
        </form>
      </article>
      <article class="panel">
        ${F("Machines","Washer and dryer status")}
        <div class="table">
          <div class="table-head"><div>Name</div><div>Type</div><div>Status</div><div>Branch</div><div>Actions</div></div>
          ${e.map(r=>`<div class="table-row"><div><strong>${m(r.machineName)}</strong></div><div>${m(r.machineType)}</div><div>${m(r.status.replace("_"," "))}</div><div>${m(r.branch)}</div>
          <div class="row-actions">
            ${r.status!=="inactive"?`<button class="secondary deactivate-machine-btn" data-id="${r.id}">Deactivate</button>`:`<button class="secondary activate-machine-btn" data-id="${r.id}">Activate</button>`}
          </div></div>`).join("")||'<div class="helper">No machines found.</div>'}
        </div>
      </article>
    </section>
    `}
  `}function ps(e,t){return`
    <section class="grid">
      <div class="page-head">
        <div>
          <p class="eyebrow">Team Management</p>
          <h2>Staff Overview</h2>
        </div>
        <button class="primary" id="open-add-staff-modal" type="button">+ Add staff</button>
      </div>

      <article class="panel">
        ${F("Staff list","Branch: "+m(t))}
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
  `}function fs(e,t,a){return`
    <section class="grid content full">
      <article class="panel">
        ${F("Settings","Device-local configuration")}
        <form id="settings-form" class="form">
          <label>Current branch<select name="branch">
            ${["Main Store","Mintal Branch","Gensan Branch"].map(s=>`<option value="${s}" ${s===e?"selected":""}>${s}</option>`).join("")}
          </select></label>
          <label>Report email<input name="reportEmail" type="email" placeholder="admin@laba101.test" value="${m(a)}" /></label>
          <button class="primary" type="submit">Save settings</button>
        </form>
      </article>
    </section>
  `}function ys(){const e=()=>{localStorage.removeItem(ge),c.currentUser=null,c.tab="dashboard",c.receiptOrderId=0,c.sidebarOpen=!1,S()};document.querySelector("#logout-button")?.addEventListener("click",e),document.querySelector("#mobile-logout-button")?.addEventListener("click",e),document.querySelector("#mobile-menu-button")?.addEventListener("click",()=>{c.sidebarOpen=!0,S()}),document.querySelector("#sidebar-close-button")?.addEventListener("click",()=>{c.sidebarOpen=!1,S()}),document.querySelector("#sidebar-backdrop")?.addEventListener("click",()=>{c.sidebarOpen=!1,S()}),document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{c.tab=t.dataset.tab,c.receiptOrderId=0,c.sidebarOpen=!1,S()})}),document.querySelectorAll("[data-quick-tab]").forEach(t=>{t.addEventListener("click",()=>{c.tab=t.dataset.quickTab,S()})}),document.querySelectorAll("[data-receipt]").forEach(t=>{t.addEventListener("click",()=>{c.receiptOrderId=Number(t.dataset.receipt),c.printerPanelOpen=!1,c.printerError="",c.printerStatus="",S()})}),document.querySelector("[data-close-receipt]")?.addEventListener("click",()=>{c.receiptOrderId=0,S()}),document.querySelector("[data-open-printer-panel]")?.addEventListener("click",()=>{c.printerPanelOpen=!c.printerPanelOpen,c.printerPanelOpen&&c.pairedPrinters.length===0?dt():S()}),document.querySelector("[data-refresh-printers]")?.addEventListener("click",()=>{dt()}),document.querySelector("[data-printer-select]")?.addEventListener("change",t=>{c.selectedPrinterAddress=t.currentTarget.value,S()}),document.querySelector("[data-paper-width]")?.addEventListener("change",t=>{c.printerPaperWidth=Number(t.currentTarget.value)===80?80:58,S()}),document.querySelector("[data-connect-printer]")?.addEventListener("click",()=>{rs()}),document.querySelector("[data-thermal-print]")?.addEventListener("click",()=>{(async()=>{const t=await xt(),a=t.orders.find(n=>n.id===c.receiptOrderId);if(!a)throw new Error("Receipt order not found.");const s=t.payments.filter(n=>n.orderId===a.id);await os(a,s)})().catch(t=>{c.printerPanelOpen=!0,c.printerError=t instanceof Error?t.message:"Bluetooth thermal print failed.",S()})}),document.querySelectorAll("[data-report-tab]").forEach(t=>{t.addEventListener("click",()=>{c.dailyReportTab=t.dataset.reportTab,S()})}),document.querySelectorAll("[data-maintenance-tab]").forEach(t=>{t.addEventListener("click",()=>{c.maintenanceTab=t.dataset.maintenanceTab,S()})})}function hs(){za(),document.querySelector("#login-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget),a=document.querySelector("#login-button");a&&(a.disabled=!0,a.textContent="Signing in...");try{const s=await bt(String(t.get("email")??""),String(t.get("password")??""));if(!s){c.loginError="Invalid email or password.",await S();return}c.currentUser=s,c.loginError="",await Te("branch",String(s.branch||"Main Store")),t.get("remember")?localStorage.setItem(ge,JSON.stringify({email:s.email,remembered:!0})):localStorage.removeItem(ge),Dt().includes(c.tab)||(c.tab="dashboard"),await S()}catch(s){alert("Login Error: "+String(s?.message||s)),a&&(a.disabled=!1,a.textContent="Sign in")}})}function gs(){Se&&window.clearInterval(Se);const e=document.querySelector("[data-navbar-time]"),t=document.querySelector("[data-navbar-date]");if(!e||!t){Se=void 0;return}const a=()=>{const s=Va();e.textContent=s.time,t.textContent=s.date};a(),Se=window.setInterval(a,1e3)}function ut(e,t){return e?t.find(a=>a.name.toLowerCase()===e.category.toLowerCase())??t.find(a=>a.name==="Regular Clothes")??t[0]??null:null}function Ie(e,t){return Math.max(1,Number(t.maxKg||e.maxKg||1))}function Pt(e,t){return Object.fromEntries(t.filter(a=>a.serviceType==="order").map(a=>[a.id,Number(e.querySelector(`input[name="serviceQty-${a.id}"]`)?.value??0)]).filter(([,a])=>Number(a)>0))}function mt(e,t){const a=Pt(e,t);return t.filter(s=>s.serviceType==="order"&&Number(a[s.id]??0)>0).map(s=>({...s,quantity:Number(a[s.id])}))}function It(e,t){return Object.fromEntries(t.filter(a=>a.serviceType==="addon").map(a=>[a.id,Number(e.querySelector(`input[name="addonQty-${a.id}"]`)?.value??0)]).filter(([,a])=>Number(a)>0))}function vt(e,t){const a=It(e,t);return t.filter(s=>s.serviceType==="addon"&&Number(a[s.id]??0)>0).map(s=>({...s,quantity:Number(a[s.id])}))}function bs(e){const t=document.querySelector("#order-form"),a=document.querySelector("#price-preview"),s=t?.querySelector('button[type="submit"]'),n=document.querySelector("#customer-name-input"),r=document.querySelector("#customer-id-input"),i=document.querySelector("#customer-phone-input"),d=document.querySelector("#customer-suggestions"),u=t?.querySelector("[data-order-error]"),l=t?.querySelector('select[name="paymentMethod"]'),o=t?.querySelector(".gcash-reference"),v=t?.querySelector('input[name="paymentReference"]');let y=!1,h;const f=p=>{if(!d||!n)return;const b=p.trim().toLowerCase();if(!b){d.hidden=!0;return}const A=e.customers.filter(P=>P.name.toLowerCase().includes(b)||(P.phone??"").includes(b)).slice(0,8),L=`<div class="ac-item ac-add" data-ac-new="true"><strong>+ Add new: "${m(p.trim())}"</strong></div>`,D=A.map(P=>`<div class="ac-item" data-ac-id="${P.id}" data-ac-name="${m(P.name)}" data-ac-phone="${m(P.phone??"")}"><strong>${m(P.name)}</strong>${P.phone?`<span>${m(P.phone)}</span>`:""}</div>`).join("");d.innerHTML=D+L,d.hidden=!1};n?.addEventListener("input",()=>{r&&(r.value=""),clearTimeout(h),h=window.setTimeout(()=>f(n.value),150)}),n?.addEventListener("focus",()=>{n.value.trim()&&f(n.value)}),d?.addEventListener("click",p=>{const b=p.target.closest(".ac-item");b&&(b.dataset.acNew==="true"?r&&(r.value=""):(n&&(n.value=b.dataset.acName??""),i&&(i.value=b.dataset.acPhone??""),r&&(r.value=b.dataset.acId??"")),d&&(d.hidden=!0))}),document.addEventListener("click",p=>{d&&!d.contains(p.target)&&p.target!==n&&(d.hidden=!0)});const E=()=>{const p=l?.value==="gcash";o&&(o.hidden=!p),v&&(v.required=p,p||(v.value=""))},w=(p,b)=>{if(!t)return;const A=t.querySelector(`input[name="${p}"]`);A&&(A.value=String(Math.max(0,Number(A.value||0)+b)),A.closest(".qty-card")?.classList.toggle("is-selected",Number(A.value)>0),A.dispatchEvent(new Event("input",{bubbles:!0})))};t?.querySelectorAll(".qty-control input").forEach(p=>{p.addEventListener("input",()=>{p.value=String(Math.max(0,Number(p.value||0))),p.closest(".qty-card")?.classList.toggle("is-selected",Number(p.value)>0)})}),t?.querySelectorAll("[data-qty-card]").forEach(p=>{p.addEventListener("click",b=>{const A=b.target;A.closest("input")||A.closest("button")||w(p.dataset.qtyCard??"",1)})}),t?.querySelectorAll("[data-qty-plus]").forEach(p=>{p.addEventListener("click",()=>w(p.dataset.qtyPlus??"",1))}),t?.querySelectorAll("[data-qty-minus]").forEach(p=>{p.addEventListener("click",()=>w(p.dataset.qtyMinus??"",-1))});const I=()=>{if(!t||!a)return;const p=mt(t,e.services),b=p[0],A=ut(b,e.categories),L=vt(t,e.services),D=p.length>0&&b&&A,P=L.length>0;if(!D&&!P){s&&(s.disabled=!0),u&&(u.hidden=!y,u.textContent=y?"Please select at least one service or extra service.":""),a.innerHTML='<div class="preview-total"><span>Total amount</span><strong>PHP 0.00</strong></div>';return}if(D){const R=Ne(p,A,Ie(b,A),L),O=R.serviceLines.map(U=>`${U.name} x${U.quantity}`),k=R.extras.map(U=>`${Z(U.name)} x${U.quantity}`);s&&(s.disabled=!1),u&&(u.hidden=!0,u.textContent=""),a.classList.remove("has-error"),a.innerHTML=`
        <div class="preview-line"><span>Services${O.length?` (${m(O.join(", "))})`:""}</span><strong>${N(R.price)}</strong></div>
        ${R.extraServiceAmount>0?`<div class="preview-line"><span>Extra services${k.length?` (${m(k.join(", "))})`:""}</span><strong>${N(R.extraServiceAmount)}</strong></div>`:""}
        <div class="preview-total"><span>Total amount</span><strong>${N(R.totalAmount)}</strong></div>
      `}else{const R=L.reduce((k,U)=>k+U.price*(U.quantity??1),0),O=L.map(k=>`${Z(k.name)} x${k.quantity??1}`);s&&(s.disabled=!1),u&&(u.hidden=!0,u.textContent=""),a.classList.remove("has-error"),a.innerHTML=`
        <div class="preview-line"><span>Extra services (${m(O.join(", "))})</span><strong>${N(R)}</strong></div>
        <div class="preview-total"><span>Total amount</span><strong>${N(R)}</strong></div>
      `}};l?.addEventListener("change",E),E(),t?.addEventListener("input",I),t?.addEventListener("change",I),I(),t?.addEventListener("submit",async p=>{p.preventDefault(),y=!0;const b=new FormData(t),A=mt(t,e.services),L=A[0],D=ut(L,e.categories),P=vt(t,e.services),R=A.length>0&&L&&D,O=P.length>0;if(!R&&!O){u&&(u.hidden=!1,u.textContent="Please select at least one service or extra service.");return}const k=A.map(B=>`${B.name} x${B.quantity}`).join(", "),U=R?Ne(A,D,Ie(L,D),P):Ne([],e.categories[0],1,P);if(confirm(`Save this order?

Services: ${k}
Total: ${N(U.totalAmount)}`))try{const B=await Ea({customerId:Number(b.get("customerId"))||void 0,customerName:String(b.get("customerName")??""),customerPhone:String(b.get("customerPhone")??"")||null,serviceQuantities:Pt(t,e.services),branch:e.branch,itemCategoryId:D?.id??e.categories[0].id,weightKg:L&&D?Ie(L,D):1,addonQuantities:It(t,e.services),paidAmount:Number(b.get("paidAmount")??0),paymentMethod:String(b.get("paymentMethod")??"cash"),paymentReference:String(b.get("paymentReference")??"")||null,notes:String(b.get("notes")??"")||null});c.receiptOrderId=B.id,await S()}catch(B){u&&(u.hidden=!1,u.textContent=B instanceof Error?B.message:"Order could not be saved.")}}),document.querySelectorAll(".advance-form").forEach(p=>{p.addEventListener("submit",async b=>{b.preventDefault();const A=Number(p.dataset.orderId),L=p.dataset.action==="claim",D=Number(p.dataset.balance||0);if(L&&D>0){c.paymentModalOrderId=A,await S();return}const R=new FormData(p).getAll("assignedStaffId").map(Number).filter(k=>k>0),O=R.length>0?R:null;await rt(A,O),await S()})}),document.querySelectorAll(".claim-payment-form").forEach(p=>{const b=p.querySelector('select[name="method"]'),A=p.querySelector('input[name="reference"]'),L=()=>{const D=b?.value==="gcash";A&&(A.closest("label").hidden=!D,A.required=D,D||(A.value=""))};b?.addEventListener("change",L),L(),p.addEventListener("submit",async D=>{D.preventDefault();const P=new FormData(p),R=Number(P.get("amount"));if(R<=0)return;const O=Number(p.dataset.orderId);await ke(O,{amount:R,method:String(P.get("method")),reference:String(P.get("reference")??"")||null}),await rt(O,null),c.paymentModalOrderId=0,await S()})}),document.querySelectorAll("[data-close-payment-modal]").forEach(p=>{p.addEventListener("click",async()=>{c.paymentModalOrderId=0,await S()})}),document.querySelectorAll(".payment-form").forEach(p=>{const b=p.querySelector('select[name="method"]'),A=p.querySelector('input[name="reference"]'),L=()=>{const D=b?.value==="gcash";A&&(A.hidden=!D,A.required=D,D||(A.value=""))};b?.addEventListener("change",L),L(),p.addEventListener("submit",async D=>{D.preventDefault();const P=new FormData(p),R=Number(P.get("amount")),O=String(P.get("method")),k=String(P.get("reference")??"")||null;confirm(`Confirm payment of ${N(R)} via ${O.toUpperCase()}?`)&&(await ke(Number(p.dataset.orderId),{amount:R,method:O,reference:k}),await S())})}),document.querySelectorAll("[data-cancel-order]").forEach(p=>{p.addEventListener("click",async()=>{const b=Number(p.dataset.cancelOrder);if(Number.isFinite(b)&&confirm("Cancel this order? (No payment will be refunded.)"))try{c.receiptOrderId===b&&(c.receiptOrderId=0),await Ta(b),await S()}catch(A){alert(A instanceof Error?A.message:"Cancel failed.")}})}),document.querySelectorAll("[data-delete-order]").forEach(p=>{p.addEventListener("click",async()=>{const b=Number(p.dataset.deleteOrder);if(Number.isFinite(b)&&confirm("Delete this paid order and update sales?"))try{c.receiptOrderId===b&&(c.receiptOrderId=0),await Na(b),await S()}catch(A){alert(A instanceof Error?A.message:"Delete failed.")}})})}function Es(e){document.querySelector("#service-form")?.addEventListener("submit",async t=>{t.preventDefault();const a=new FormData(t.currentTarget),s=a.get("id")?Number(a.get("id")):void 0;await nt({id:s,name:String(a.get("name")??""),description:String(a.get("description")??"")||null,category:String(a.get("category")??""),serviceType:String(a.get("serviceType")??"order"),price:Number(a.get("price")??0),maxKg:Number(a.get("maxKg")??0),dryingMinutes:Number(a.get("dryingMinutes"))||null,includes:a.getAll("includes").map(String).filter(Boolean),additionalCharge:0,turnaroundHours:Number(a.get("turnaroundHours")??24),isActive:1}),await S()}),document.querySelectorAll(".edit-service-btn").forEach(t=>{t.addEventListener("click",()=>{const a=Number(t.dataset.id),s=e.find(r=>r.id===a),n=document.querySelector("#service-form");s&&n&&(n.querySelector("[name=id]").value=String(s.id),n.querySelector("[name=name]").value=s.name,n.querySelector("[name=category]").value=s.category,n.querySelector("[name=serviceType]").value=s.serviceType,n.querySelector("[name=price]").value=String(s.price),n.querySelector("[name=maxKg]").value=String(s.maxKg),n.querySelector("[name=dryingMinutes]").value=s.dryingMinutes?String(s.dryingMinutes):"",n.querySelectorAll('input[name="includes"]').forEach(r=>{r.checked=s.includes.includes(r.value)}),n.querySelector("[name=turnaroundHours]").value=String(s.turnaroundHours),n.querySelector("[name=description]").value=s.description??"",window.scrollTo({top:0,behavior:"smooth"}))})}),document.querySelectorAll(".deactivate-service-btn, .activate-service-btn").forEach(t=>{t.addEventListener("click",async()=>{const a=Number(t.dataset.id),s=e.find(n=>n.id===a);if(s){const n=s.isActive?0:1;await nt({id:s.id,name:s.name,description:s.description,category:s.category,serviceType:s.serviceType,price:s.price,maxKg:s.maxKg,dryingMinutes:s.dryingMinutes,includes:s.includes,additionalCharge:s.additionalCharge,turnaroundHours:s.turnaroundHours,isActive:n}),await S()}})}),document.querySelector("#category-form")?.addEventListener("submit",async t=>{t.preventDefault();const a=new FormData(t.currentTarget);await ga({name:String(a.get("name")??""),maxKg:Number(a.get("maxKg")??0),additionalFee:Number(a.get("additionalFee")??0),isActive:1}),await S()})}function Ss(e){const t=document.querySelector("#expense-form"),a=t?.querySelector('input[name="disbursementType"]'),s=t?.querySelector(".expense-date-field"),n=t?.querySelector(".expense-month-field"),r=t?.querySelector('input[name="expenseDate"]'),i=t?.querySelector('input[name="expenseMonth"]'),d=u=>{!t||!a||!r||!i||(a.value=u,t.querySelectorAll("[data-expense-type]").forEach(l=>{l.classList.toggle("is-active",l.dataset.expenseType===u)}),s&&(s.hidden=u==="monthly"),n&&(n.hidden=u!=="monthly"),r.required=u==="daily",i.required=u==="monthly",u==="monthly"&&!i.value&&(i.value=Me()),u==="daily"&&!r.value&&(r.value=W()))};t?.querySelectorAll("[data-expense-type]").forEach(u=>{u.addEventListener("click",()=>d(u.dataset.expenseType==="monthly"?"monthly":"daily"))}),d("daily"),t?.addEventListener("submit",async u=>{u.preventDefault();const l=new FormData(u.currentTarget),o=Number(l.get("id")||0),v=String(l.get("disbursementType")??"daily")==="monthly"?"monthly":"daily",y=String(l.get("expenseMonth")??Me()),h={expenseDate:v==="monthly"?`${y}-01`:String(l.get("expenseDate")??""),disbursementType:v,name:String(l.get("name")??""),category:String(l.get("category")??""),description:String(l.get("description")??""),amount:Number(l.get("amount")??0)};o?await Da(o,h):await xa(h),await S()}),document.querySelectorAll(".edit-expense-btn").forEach(u=>{u.addEventListener("click",()=>{const l=e.find(v=>v.id===Number(u.dataset.id));if(!l||!t)return;t.querySelector("[name=id]").value=String(l.id),t.querySelector("[name=expenseDate]").value=l.expenseDate,t.querySelector("[name=expenseMonth]").value=Lt(l.expenseDate),d(ee(l)),t.querySelector("[name=amount]").value=String(l.amount),t.querySelector("[name=name]").value=l.name,t.querySelector("[name=category]").value=l.category,t.querySelector("[name=description]").value=l.description??"";const o=t.querySelector('button[type="submit"]');o&&(o.textContent="Update expense"),t.scrollIntoView({behavior:"smooth",block:"start"})})}),document.querySelectorAll(".delete-expense-btn").forEach(u=>{u.addEventListener("click",async()=>{if(c.currentUser?.role!=="admin")return;const l=Number(u.dataset.id);!Number.isFinite(l)||!confirm("Delete this disbursement?")||(await Oa(l),await S())})}),document.querySelector("#fold-form")?.addEventListener("submit",async u=>{u.preventDefault();const l=new FormData(u.currentTarget);await La({orderTicket:String(l.get("orderTicket")??""),staffName:String(l.get("staffName")??""),foldCount:Number(l.get("foldCount")??1),rate:Number(l.get("rate")??5)}),await S()})}function ws(e,t,a,s,n,r){document.querySelector("#generate-report")?.addEventListener("click",()=>{c.reportPreview=we(),S()});const i=document.querySelector("#sales-form");i?.addEventListener("submit",async f=>{f.preventDefault();const E=new FormData(f.currentTarget);await Ia({id:Number(E.get("id")||0)||void 0,saleDate:String(E.get("saleDate")??""),cashAmount:Number(E.get("cashAmount")??0),gcashAmount:Number(E.get("gcashAmount")??0),notes:String(E.get("notes")??"")}),await S()}),document.querySelectorAll(".edit-sale-btn").forEach(f=>{f.addEventListener("click",()=>{const E=a.find(I=>I.id===Number(f.dataset.id));if(!E||!i)return;i.querySelector("[name=id]").value=String(E.id),i.querySelector("[name=saleDate]").value=E.saleDate,i.querySelector("[name=cashAmount]").value=String(E.cashAmount),i.querySelector("[name=gcashAmount]").value=String(E.gcashAmount),i.querySelector("[name=notes]").value=E.notes??"";const w=i.querySelector('button[type="submit"]');w&&(w.textContent="Update daily sale"),i.scrollIntoView({behavior:"smooth",block:"start"})})}),document.querySelectorAll(".delete-sale-btn").forEach(f=>{f.addEventListener("click",async()=>{if(c.currentUser?.role!=="admin")return;const E=Number(f.dataset.id);!Number.isFinite(E)||!confirm("Delete this daily sale?")||(await qa(E),await S())})});const d=document.querySelector("[data-date-from]"),u=document.querySelector("[data-date-to]");document.querySelectorAll("[data-date-scope]").forEach(f=>{f.addEventListener("change",()=>{if(!f.checked||!d||!u)return;const E=new Date,w=be(E),I=new Date(E);f.value==="week"&&I.setDate(E.getDate()-6),f.value==="month"&&I.setDate(1),f.value!=="custom"&&(d.value=f.value==="today"?w:be(I),u.value=w)})});const l=f=>{const E=p=>String(p??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;"),w=p=>p==="Sales Report"?[110,125,150,215,95,95,105,105]:p==="Disbursement"?[115,115,90,150,150,220,105]:p==="Fold Count"?[220,125]:p==="Revolving Daily Summary"?[115,105,120,115]:p==="Revolving History"?[115,96,140,96,110,180,120]:[155,125,125,125,95,95,115,115];return`<?xml version="1.0"?>
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
  ${f.map(p=>{const b=w(p.name).map(L=>`<Column ss:Width="${L}" ss:AutoFitWidth="0"/>`).join(""),A=p.rows.map(L=>{if(!L.length)return'<Row ss:Height="10" ss:StyleID="BorderRow"><Cell ss:StyleID="BorderCell"><Data ss:Type="String">&nbsp;</Data></Cell></Row>';const D=L[0]==="Type"||L[0]==="Summary"||L[0]==="Sales Summary"||L[0]==="Disbursement Summary"||L[0]==="Staff"||L[0]==="Date of Sales"||L[0]==="Date"||L[0]==="Date/Month",P=D?"HeaderRow":"BorderRow",R=D?"HeaderCell":"BorderCell",O=D?26:22,k=L.map(U=>`<Cell ss:StyleID="${R}"><Data ss:Type="${typeof U=="number"?"Number":"String"}">${E(U)}</Data></Cell>`).join("");return`<Row ss:Height="${O}" ss:StyleID="${P}">${k}</Row>`}).join("");return`
        <Worksheet ss:Name="${E(p.name)}">
          <Table>
            ${b}
            ${A}
          </Table>
        </Worksheet>`}).join("")}
</Workbook>`},o=()=>{const f=we(),E=Rt(e,t,a,s,n,r),w=[];if(E.selectedTypes.has("sales")){const b=E.salesRows(),A=[["Ticket","Customer","Cash","GCash","Total Payment"],...b.transactions.map(L=>[L.ticket,L.customer,L.cash,L.gcash,L.total]),[],["Cash from Orders","GCash from Orders","Sales from Orders"],[b.orderCashTotal,b.orderGcashTotal,b.orderCashTotal+b.orderGcashTotal],[],["Cash Whole Sale","GCash Whole Sale","Whole Sale of Day"],[b.manualCashTotal,b.manualGcashTotal,b.manualCashTotal+b.manualGcashTotal],[],["Total Cash","Total GCash","Total Sales"],[b.totalCash,b.totalGcash,b.totalSales]];w.push({name:"Sales Report",rows:A})}E.selectedTypes.has("disbursement")&&w.push({name:"Disbursement",rows:E.disbursementRows().rows}),E.selectedTypes.has("fold_count")&&w.push({name:"Fold Count",rows:E.foldCountRows().rows}),E.selectedTypes.has("revolving_fund")&&(w.push({name:"Revolving Daily Summary",rows:E.revolvingDailySummaryRows().rows}),w.push({name:"Revolving History",rows:E.revolvingHistoryRows().rows})),E.selectedTypes.has("summary")&&w.push({name:"Summary",rows:E.summaryRows()});const I=l(w.length?w:[{name:"Summary",rows:E.summaryRows()}]),p=`laba101-report-${f.from}-to-${f.to}.xls`;return new File([I],p,{type:"application/vnd.ms-excel"})},v=async()=>{const f=o();if(!$.isNativePlatform())return{fileName:f.name,uri:""};const E=await f.text(),w=f.name;await et.writeFile({path:w,data:E,directory:Ae.External,encoding:qe.UTF8});const{uri:I}=await et.getUri({path:w,directory:Ae.External});return{fileName:f.name,uri:I}},y=()=>{const f=o(),E=we(),w=`laba101-report-${E.from}-to-${E.to}.xls`,I=f,p=URL.createObjectURL(I),b=document.createElement("a");return b.href=p,b.download=w,document.body.appendChild(b),b.click(),setTimeout(()=>{b.remove(),URL.revokeObjectURL(p)},1e3),w},h=async f=>{const E=document.querySelector(f==="export"?"#export-report":"#email-report");E&&(E.disabled=!0,E.textContent=f==="export"?"Exporting...":"Sending...");try{if(f==="export")if($.isNativePlatform()){const w=await v();alert(`Report exported as "${w.fileName}".`)}else{const w=y();alert(`Report saved: ${w}`)}else{const w=await ht("report_email")||"";if(!w){alert("Please configure a report email in Settings first.");return}const I=we(),p=`Laba101 report ${I.from} to ${I.to}`;if($.isNativePlatform()){const b=await v();try{await Jt.share({title:p,text:`Please find the attached Laba101 report file: ${b.fileName}`,files:[b.uri],dialogTitle:"Send report via email"}),alert(`Report saved and shared as "${b.fileName}".`)}catch(A){const L=String(A).toLowerCase();if(L.includes("share canceled")||L.includes("canceled"))alert(`Report saved as "${b.fileName}".`);else throw A}}else{const b=y(),A=`Hi,

Please find the attached Laba101 report file: ${b}

Date range: ${I.from} to ${I.to}`,L=`mailto:${w}?subject=${encodeURIComponent(p)}&body=${encodeURIComponent(A)}`;setTimeout(()=>{window.location.href=L},800),alert(`Report downloaded as "${b}".
Your email app will open — please attach the file and send.`)}}}catch(w){alert("Failed: "+String(w))}finally{E&&(E.disabled=!1,E.textContent=f==="export"?"Export Excel":"Send to Email")}};document.querySelector("#export-report")?.addEventListener("click",async()=>{await h("export")}),document.querySelector("#email-report")?.addEventListener("click",async()=>{await h("email")})}function Ts(){document.querySelector("#order-queue-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);c.orderSearch=String(t.get("orderSearch")??"").trim(),c.orderDateFilter=String(t.get("orderDateFilter")??"").trim(),c.orderPaymentFilter=String(t.get("orderPaymentFilter")??"").trim(),S()}),document.querySelector("#order-queue-clear")?.addEventListener("click",()=>{c.orderSearch="",c.orderDateFilter="",c.orderPaymentFilter="",S()}),document.querySelector("#archived-order-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);c.archivedOrderSearch=String(t.get("archivedOrderSearch")??"").trim(),S()}),document.querySelector("#archived-order-clear")?.addEventListener("click",()=>{c.archivedOrderSearch="",S()})}function Ns(){document.querySelector("#customer-search-form")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);c.customerSearch=String(t.get("customerSearch")??"").trim(),S()}),document.querySelector("#customer-search-clear")?.addEventListener("click",()=>{c.customerSearch="",S()})}function As(){document.querySelector("#machine-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await ka({machineName:String(t.get("machineName")??""),machineType:String(t.get("machineType")),status:String(t.get("status")),branch:String(t.get("branch")??"")}),await S()}),document.querySelector("#subcleaning-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=e.currentTarget.querySelector('button[type="submit"]');t&&(t.disabled=!0,t.textContent="Starting...");const a=new FormData(e.currentTarget),s=a.getAll("machineIds").map(Number);if(!s.length){alert("Please select at least one machine to clean."),t&&(t.disabled=!1,t.textContent="Start Cleaning");return}await Ba({date:String(a.get("date")??""),machineIds:s,cleaningStatus:String(a.get("cleaningStatus")??""),notes:String(a.get("notes")??""),branch:String(a.get("branch")??"")}),await S()}),document.querySelectorAll(".complete-cleaning-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.machineId),a=e.dataset.branch??"";e.disabled=!0,e.textContent="Completing...",await _a(t,a),await S()})}),document.querySelectorAll(".deactivate-machine-btn, .activate-machine-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.id),a=e.classList.contains("deactivate-machine-btn");await Ma(t,a?"inactive":"available"),await S()})})}function Ls(e){const t=document.querySelector("#add-staff-modal"),a=document.querySelector("#open-add-staff-modal"),s=document.querySelector("#close-add-staff-modal"),n=document.querySelector("#staff-form"),r=()=>{n?.reset(),n&&(n.querySelector("[name=id]").value="");const d=document.querySelector("#add-staff-title");d&&(d.textContent="Add staff member"),t?.removeAttribute("hidden")},i=()=>{t?.setAttribute("hidden",""),n?.reset()};a?.addEventListener("click",r),s?.addEventListener("click",i),t?.addEventListener("click",d=>{d.target===t&&i()}),document.querySelectorAll(".edit-staff-btn").forEach(d=>{d.addEventListener("click",()=>{const u=Number(d.dataset.id),l=e.find(o=>o.id===u);if(l&&n){n.querySelector("[name=id]").value=String(l.id),n.querySelector("[name=name]").value=l.name,n.querySelector("[name=email]").value=l.email,n.querySelector("[name=password]").value=l.password,n.querySelector("[name=role]").value=l.role,n.querySelector("[name=branch]").value=l.branch;const o=document.querySelector("#add-staff-title");o&&(o.textContent="Edit staff member"),t?.removeAttribute("hidden")}})}),document.querySelectorAll(".deactivate-staff-btn, .activate-staff-btn").forEach(d=>{d.addEventListener("click",async()=>{const u=Number(d.dataset.id),l=e.find(o=>o.id===u);l&&(await st(u,{isActive:l.isActive!==0?0:1}),await S())})}),n?.addEventListener("submit",async d=>{d.preventDefault();const u=document.querySelector("#staff-save-btn");u&&(u.disabled=!0,u.textContent="Saving...");const l=new FormData(n),o=l.get("id")?Number(l.get("id")):void 0,v=String(l.get("name")??"").trim(),y=String(l.get("email")??"").trim(),h=String(l.get("password")??"password")||"password",f=String(l.get("role")),E=String(l.get("branch")??"");if(!v||!y){alert("Name and email are required."),u&&(u.disabled=!1,u.textContent="Save staff member");return}try{o?await st(o,{name:v,email:y,password:h,role:f,branch:E}):await pa({name:v,email:y,password:h,role:f,branch:E}),i(),await S()}catch{alert("Failed to save staff. The email may already be in use."),u&&(u.disabled=!1,u.textContent="Save staff member")}})}function Cs(){document.querySelector("#settings-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await Te("branch",String(t.get("branch")??"Main Store")),await Te("fold_rate",String(t.get("foldRate")??"5")),String(t.get("reportEmail")??"")&&await Te("report_email",String(t.get("reportEmail"))),alert("Settings saved successfully!")})}async function $s(){await ua();const e=localStorage.getItem(ge);if(e)try{const t=JSON.parse(e);if(t.email&&t.remembered){const a=await bt(t.email,"password")??null;c.currentUser=a}}catch{localStorage.removeItem(ge)}await S()}function Rs(e,t,a,s){const n=e.filter(h=>h.status==="revolving").reduce((h,f)=>h+f.cashAmount,0),r=t.filter(h=>h.type==="add").reduce((h,f)=>h+f.amount,0),i=t.filter(h=>h.type==="disbursement").reduce((h,f)=>h+f.amount,0),d=n+r-i,u=c.revolvingHistoryFrom||"0000-01-01",l=c.revolvingHistoryTo||"9999-12-31",o=t.filter(h=>{const f=K(h.createdAt);return f>=u&&f<=l}),v=e.map(h=>{const f=At(h.saleDate,a,s,h.cashAmount),E=h.status==="revolving"?'<span class="ok">Revolving</span>':h.status==="endorsed"?`<span class="warn">Endorsed to ${m(h.endorsedTo)}</span>`:'<span class="meta">Pending</span>',w=h.status!=="revolving"&&h.status!=="endorsed"?`<div class="row-actions">
          <button class="primary revolving-btn" data-id="${h.id}">Revolving</button>
          <button class="secondary endorsed-btn" data-id="${h.id}" data-date="${oe(h.saleDate)}">Endorsed</button>
        </div>`:"";return[`<strong>${m(oe(h.saleDate))}</strong>`,`<strong class="ok">${N(f)}</strong>`,E,h.statusUpdatedAt?m(oe(h.statusUpdatedAt)):"-",w]}),y=o.map(h=>[Xa(h.createdAt),`<strong>${m(h.revolvingNumber)}</strong>`,m(h.name),`<strong class="${h.type==="disbursement"?"warn":"ok"}">${h.type==="disbursement"?"-":"+"}${N(h.amount)}</strong>`,m(h.category),m(h.description||"-"),`<span class="${h.type==="add"?"ok":"warn"}">${h.type==="add"?"Add Revolving Fund":"Disbursement"}</span>`]);return`
    <section class="grid content full">
      <div class="panel-header" style="display: flex; gap: 16px; margin-bottom: 24px; align-items: center;">
        <button class="primary" id="add-revolving-fund-btn">Add Revolving Fund</button>
        <button class="secondary" id="revolving-disbursement-btn">Disbursement</button>
      </div>

      <article class="panel">
        <div style="background-color: #061a42; color: white; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
          <p style="font-size: 12px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin: 0 0 8px 0;">Revolving Fund Total</p>
          <p style="font-size: 32px; font-weight: 800; margin: 0;">${N(d)}</p>
        </div>
        ${F("Daily Summary","Cash on hand per day (order cash + manual cash − disbursements)")}
        ${$e(["Date of Sales","Cash on Hand","Status","Date Update","Action"],v,"data-table revolving-summary-datatable")}
      </article>

      <article class="panel">
        ${F("Revolving Table History","Filter by date — DISB numbers shared with Daily Report expenses")}
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
        ${$e(["Date","Disbursement #","Name","Amount","Category","Description","Type"],y,"data-table revolving-history-datatable")}
      </article>

      ${c.endorseModalOpen?`
        <div class="modal-backdrop" role="presentation">
          <div class="receipt-modal" role="dialog" aria-modal="true" style="max-width: 400px; width: 90%;">
            <form id="endorse-form" class="form" style="padding: 24px;">
              <h3 style="margin-top: 0;">Endorse Money</h3>
              <p class="meta" style="margin-bottom: 16px;">Endorsing cash from <strong>${m(c.endorseSaleDate)}</strong>.</p>
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
  `}function xs(){document.querySelector("#revolving-history-filters")?.addEventListener("submit",async o=>{o.preventDefault();const v=new FormData(o.currentTarget);c.revolvingHistoryFrom=String(v.get("revolvingHistoryFrom")??"").trim(),c.revolvingHistoryTo=String(v.get("revolvingHistoryTo")??"").trim(),await S()}),document.querySelector("#revolving-history-clear")?.addEventListener("click",async()=>{c.revolvingHistoryFrom="",c.revolvingHistoryTo="",await S()}),document.querySelectorAll(".revolving-btn").forEach(o=>{o.addEventListener("click",async()=>{c.revolvingModalOpen=!0,c.revolvingSaleId=Number(o.dataset.id),await S()})});const e=document.getElementById("confirm-revolving-btn");e&&e.addEventListener("click",async()=>{await ot(c.revolvingSaleId,"revolving",null,new Date().toISOString()),c.revolvingModalOpen=!1,await S()});const t=document.getElementById("close-revolving-modal");t&&t.addEventListener("click",async()=>{c.revolvingModalOpen=!1,await S()}),document.querySelectorAll(".endorsed-btn").forEach(o=>{o.addEventListener("click",async()=>{c.endorseModalOpen=!0,c.endorseSaleId=Number(o.dataset.id),c.endorseSaleDate=o.dataset.date??"",await S()})});const a=document.getElementById("close-endorse-modal");a&&a.addEventListener("click",async()=>{c.endorseModalOpen=!1,await S()});const s=document.getElementById("endorse-form");s&&s.addEventListener("submit",async o=>{o.preventDefault();const v=new FormData(s),y=String(v.get("endorsedTo")??"").trim();y&&(await ot(c.endorseSaleId,"endorsed",y,new Date().toISOString()),c.endorseModalOpen=!1,await S())});const n=document.getElementById("add-revolving-fund-btn");n&&n.addEventListener("click",async()=>{c.addFundModalOpen=!0,await S()});const r=document.getElementById("close-add-fund-modal");r&&r.addEventListener("click",async()=>{c.addFundModalOpen=!1,await S()});const i=document.getElementById("add-fund-form");i&&i.addEventListener("submit",async o=>{o.preventDefault();const v=new FormData(i);await ct({name:String(v.get("name")??"").trim(),amount:Number(v.get("amount")??0),category:"Add Revolving Fund",description:null,type:"add",createdAt:new Date().toISOString()}),c.addFundModalOpen=!1,await S()});const d=document.getElementById("revolving-disbursement-btn");d&&d.addEventListener("click",async()=>{c.disbursementModalOpen=!0,await S()});const u=document.getElementById("close-disbursement-modal");u&&u.addEventListener("click",async()=>{c.disbursementModalOpen=!1,await S()});const l=document.getElementById("disbursement-form");l&&l.addEventListener("submit",async o=>{o.preventDefault();const v=new FormData(l);await ct({name:String(v.get("name")??"").trim(),amount:Number(v.get("amount")??0),category:String(v.get("category")??"").trim(),description:String(v.get("description")??"").trim(),type:"disbursement",expenseDate:W(),createdAt:new Date().toISOString()}),c.disbursementModalOpen=!1,await S()})}$s();export{qe as E,Ue as W,jt as b};
