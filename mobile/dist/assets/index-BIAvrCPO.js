(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();var ve;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(ve||(ve={}));class Fe extends Error{constructor(t,n,a){super(t),this.message=t,this.code=n,this.data=a}}const jt=e=>{var t,n;return e?.androidBridge?"android":!((n=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||n===void 0)&&n.bridge?"ios":"web"},Ht=e=>{const t=e.CapacitorCustomPlatform||null,n=e.Capacitor||{},a=n.Plugins=n.Plugins||{},s=()=>t!==null?t.name:jt(e),r=()=>s()!=="web",i=m=>{const f=c.get(m);return!!(f?.platforms.has(s())||d(m))},d=m=>{var f;return(f=n.PluginHeaders)===null||f===void 0?void 0:f.find(v=>v.name===m)},o=m=>e.console.error(m),c=new Map,u=(m,f={})=>{const v=c.get(m);if(v)return console.warn(`Capacitor plugin "${m}" already registered. Cannot register plugins twice.`),v.proxy;const $=s(),x=d(m);let w;const b=async()=>(!w&&$ in f?w=typeof f[$]=="function"?w=await f[$]():w=f[$]:t!==null&&!w&&"web"in f&&(w=typeof f.web=="function"?w=await f.web():w=f.web),w),y=(D,I)=>{var U,M;if(x){const B=x?.methods.find(_=>I===_.name);if(B)return B.rtype==="promise"?_=>n.nativePromise(m,I.toString(),_):(_,ie)=>n.nativeCallback(m,I.toString(),_,ie);if(D)return(U=D[I])===null||U===void 0?void 0:U.bind(D)}else{if(D)return(M=D[I])===null||M===void 0?void 0:M.bind(D);throw new Fe(`"${m}" plugin is not implemented on ${$}`,ve.Unimplemented)}},g=D=>{let I;const U=(...M)=>{const B=b().then(_=>{const ie=y(_,D);if(ie){const me=ie(...M);return I=me?.remove,me}else throw new Fe(`"${m}.${D}()" is not implemented on ${$}`,ve.Unimplemented)});return D==="addListener"&&(B.remove=async()=>I()),B};return U.toString=()=>`${D.toString()}() { [capacitor code] }`,Object.defineProperty(U,"name",{value:D,writable:!1,configurable:!1}),U},T=g("addListener"),A=g("removeListener"),P=(D,I)=>{const U=T({eventName:D},I),M=async()=>{const _=await U;A({eventName:D,callbackId:_},I)},B=new Promise(_=>U.then(()=>_({remove:M})));return B.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await M()},B},L=new Proxy({},{get(D,I){switch(I){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return x?P:T;case"removeListener":return A;default:return g(I)}}});return a[m]=L,c.set(m,{name:m,proxy:L,platforms:new Set([...Object.keys(f),...x?[$]:[]])}),L};return n.convertFileSrc||(n.convertFileSrc=m=>m),n.getPlatform=s,n.handleError=o,n.isNativePlatform=r,n.isPluginAvailable=i,n.registerPlugin=u,n.Exception=Fe,n.DEBUG=!!n.DEBUG,n.isLoggingEnabled=!!n.isLoggingEnabled,n},Wt=e=>e.Capacitor=Ht(e),R=Wt(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),de=R.registerPlugin;class He{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,n){let a=!1;this.listeners[t]||(this.listeners[t]=[],a=!0),this.listeners[t].push(n);const r=this.windowListeners[t];r&&!r.registered&&this.addWindowListener(r),a&&this.sendRetainedArgumentsForEvent(t);const i=async()=>this.removeListener(t,n);return Promise.resolve({remove:i})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,n,a){const s=this.listeners[t];if(!s){if(a){let r=this.retainedEventArguments[t];r||(r=[]),r.push(n),this.retainedEventArguments[t]=r}return}s.forEach(r=>r(n))}hasListeners(t){var n;return!!(!((n=this.listeners[t])===null||n===void 0)&&n.length)}registerWindowListener(t,n){this.windowListeners[n]={registered:!1,windowEventName:t,pluginEventName:n,handler:a=>{this.notifyListeners(n,a)}}}unimplemented(t="not implemented"){return new R.Exception(t,ve.Unimplemented)}unavailable(t="not available"){return new R.Exception(t,ve.Unavailable)}async removeListener(t,n){const a=this.listeners[t];if(!a)return;const s=a.indexOf(n);this.listeners[t].splice(s,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const n=this.retainedEventArguments[t];n&&(delete this.retainedEventArguments[t],n.forEach(a=>{this.notifyListeners(t,a)}))}}const Ze=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),et=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class Xt extends He{async getCookies(){const t=document.cookie,n={};return t.split(";").forEach(a=>{if(a.length<=0)return;let[s,r]=a.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=et(s).trim(),r=et(r).trim(),n[s]=r}),n}async setCookie(t){try{const n=Ze(t.key),a=Ze(t.value),s=t.expires?`; expires=${t.expires.replace("expires=","")}`:"",r=(t.path||"/").replace("path=",""),i=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${n}=${a||""}${s}; path=${r}; ${i};`}catch(n){return Promise.reject(n)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(n){return Promise.reject(n)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const n of t)document.cookie=n.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}de("CapacitorCookies",{web:()=>new Xt});const Gt=async e=>new Promise((t,n)=>{const a=new FileReader;a.onload=()=>{const s=a.result;t(s.indexOf(",")>=0?s.split(",")[1]:s)},a.onerror=s=>n(s),a.readAsDataURL(e)}),Kt=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(s=>s.toLocaleLowerCase()).reduce((s,r,i)=>(s[r]=e[t[i]],s),{})},Vt=(e,t=!0)=>e?Object.entries(e).reduce((a,s)=>{const[r,i]=s;let d,o;return Array.isArray(i)?(o="",i.forEach(c=>{d=t?encodeURIComponent(c):c,o+=`${r}=${d}&`}),o.slice(0,-1)):(d=t?encodeURIComponent(i):i,o=`${r}=${d}`),`${a}&${o}`},"").substr(1):null,Yt=(e,t={})=>{const n=Object.assign({method:e.method||"GET",headers:e.headers},t),s=Kt(e.headers)["content-type"]||"";if(typeof e.data=="string")n.body=e.data;else if(s.includes("application/x-www-form-urlencoded")){const r=new URLSearchParams;for(const[i,d]of Object.entries(e.data||{}))r.set(i,d);n.body=r.toString()}else if(s.includes("multipart/form-data")||e.data instanceof FormData){const r=new FormData;if(e.data instanceof FormData)e.data.forEach((d,o)=>{r.append(o,d)});else for(const d of Object.keys(e.data))r.append(d,e.data[d]);n.body=r;const i=new Headers(n.headers);i.delete("content-type"),n.headers=i}else(s.includes("application/json")||typeof e.data=="object")&&(n.body=JSON.stringify(e.data));return n};class Qt extends He{async request(t){const n=Yt(t,t.webFetchExtra),a=Vt(t.params,t.shouldEncodeUrlParams),s=a?`${t.url}?${a}`:t.url,r=await fetch(s,n),i=r.headers.get("content-type")||"";let{responseType:d="text"}=r.ok?t:{};i.includes("application/json")&&(d="json");let o,c;switch(d){case"arraybuffer":case"blob":c=await r.blob(),o=await Gt(c);break;case"json":o=await r.json();break;default:o=await r.text()}const u={};return r.headers.forEach((m,f)=>{u[f]=m}),{data:o,headers:u,status:r.status,url:r.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}de("CapacitorHttp",{web:()=>new Qt});var tt;(function(e){e.Dark="DARK",e.Light="LIGHT",e.Default="DEFAULT"})(tt||(tt={}));var at;(function(e){e.StatusBar="StatusBar",e.NavigationBar="NavigationBar"})(at||(at={}));class Jt extends He{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}de("SystemBars",{web:()=>new Jt});const zt="modulepreload",Zt=function(e){return"/"+e},nt={},We=function(t,n,a){let s=Promise.resolve();if(n&&n.length>0){let o=function(c){return Promise.all(c.map(u=>Promise.resolve(u).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),d=i?.nonce||i?.getAttribute("nonce");s=o(n.map(c=>{if(c=Zt(c),c in nt)return;nt[c]=!0;const u=c.endsWith(".css"),m=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${m}`))return;const f=document.createElement("link");if(f.rel=u?"stylesheet":zt,u||(f.as="script"),f.crossOrigin="",f.href=c,d&&f.setAttribute("nonce",d),document.head.appendChild(f),u)return new Promise((v,$)=>{f.addEventListener("load",v),f.addEventListener("error",()=>$(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(i){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=i,window.dispatchEvent(d),!d.defaultPrevented)throw i}return s.then(i=>{for(const d of i||[])d.status==="rejected"&&r(d.reason);return t().catch(r)})};function ea(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,n){return new Proxy({},{get(a,s){return(r,i,d)=>{const o=e.Capacitor.Plugins[n];if(o===void 0){d(new Error(`Capacitor plugin ${n} not found`));return}if(typeof o[s]!="function"){d(new Error(`Method ${s} not found in Capacitor plugin ${n}`));return}(async()=>{try{const c=await o[s](r);i(c)}catch(c){d(c)}})()}}})}})}function ta(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,n){return e.cordova.plugins[n]}})}function aa(e=!1){typeof window>"u"||(window.CapacitorUtils=window.CapacitorUtils||{},window.Capacitor!==void 0&&!e?ea(window):window.cordova!==void 0&&ta(window))}var $e;(function(e){e.Documents="DOCUMENTS",e.Data="DATA",e.Library="LIBRARY",e.Cache="CACHE",e.External="EXTERNAL",e.ExternalStorage="EXTERNAL_STORAGE",e.ExternalCache="EXTERNAL_CACHE",e.LibraryNoCloud="LIBRARY_NO_CLOUD",e.Temporary="TEMPORARY"})($e||($e={}));var Be;(function(e){e.UTF8="utf8",e.ASCII="ascii",e.UTF16="utf16"})(Be||(Be={}));const st=de("Filesystem",{web:()=>We(()=>import("./web-f9wczSn4.js"),[]).then(e=>new e.FilesystemWeb)});aa();const na=de("Share",{web:()=>We(()=>import("./web-QNXk0jEd.js"),[]).then(e=>new e.ShareWeb)});class sa{constructor(t){this.sqlite=t,this._connectionDict=new Map}async initWebStore(){try{return await this.sqlite.initWebStore(),Promise.resolve()}catch(t){return Promise.reject(t)}}async saveToStore(t){try{return await this.sqlite.saveToStore({database:t}),Promise.resolve()}catch(n){return Promise.reject(n)}}async saveToLocalDisk(t){try{return await this.sqlite.saveToLocalDisk({database:t}),Promise.resolve()}catch(n){return Promise.reject(n)}}async getFromLocalDiskToStore(t){const n=t??!0;try{return await this.sqlite.getFromLocalDiskToStore({overwrite:n}),Promise.resolve()}catch(a){return Promise.reject(a)}}async echo(t){try{const n=await this.sqlite.echo({value:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async isSecretStored(){try{const t=await this.sqlite.isSecretStored();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async setEncryptionSecret(t){try{return await this.sqlite.setEncryptionSecret({passphrase:t}),Promise.resolve()}catch(n){return Promise.reject(n)}}async changeEncryptionSecret(t,n){try{return await this.sqlite.changeEncryptionSecret({passphrase:t,oldpassphrase:n}),Promise.resolve()}catch(a){return Promise.reject(a)}}async clearEncryptionSecret(){try{return await this.sqlite.clearEncryptionSecret(),Promise.resolve()}catch(t){return Promise.reject(t)}}async checkEncryptionSecret(t){try{const n=await this.sqlite.checkEncryptionSecret({passphrase:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async addUpgradeStatement(t,n){try{return t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.addUpgradeStatement({database:t,upgrade:n}),Promise.resolve()}catch(a){return Promise.reject(a)}}async createConnection(t,n,a,s,r){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.createConnection({database:t,encrypted:n,mode:a,version:s,readonly:r});const i=new rt(t,r,this.sqlite),d=r?`RO_${t}`:`RW_${t}`;return this._connectionDict.set(d,i),Promise.resolve(i)}catch(i){return Promise.reject(i)}}async closeConnection(t,n){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.closeConnection({database:t,readonly:n});const a=n?`RO_${t}`:`RW_${t}`;return this._connectionDict.delete(a),Promise.resolve()}catch(a){return Promise.reject(a)}}async isConnection(t,n){const a={};t.endsWith(".db")&&(t=t.slice(0,-3));const s=n?`RO_${t}`:`RW_${t}`;return a.result=this._connectionDict.has(s),Promise.resolve(a)}async retrieveConnection(t,n){t.endsWith(".db")&&(t=t.slice(0,-3));const a=n?`RO_${t}`:`RW_${t}`;if(this._connectionDict.has(a)){const s=this._connectionDict.get(a);return typeof s<"u"?Promise.resolve(s):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async getNCDatabasePath(t,n){try{const a=await this.sqlite.getNCDatabasePath({path:t,database:n});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async createNCConnection(t,n){try{await this.sqlite.createNCConnection({databasePath:t,version:n});const a=new rt(t,!0,this.sqlite),s=`RO_${t})`;return this._connectionDict.set(s,a),Promise.resolve(a)}catch(a){return Promise.reject(a)}}async closeNCConnection(t){try{await this.sqlite.closeNCConnection({databasePath:t});const n=`RO_${t})`;return this._connectionDict.delete(n),Promise.resolve()}catch(n){return Promise.reject(n)}}async isNCConnection(t){const n={},a=`RO_${t})`;return n.result=this._connectionDict.has(a),Promise.resolve(n)}async retrieveNCConnection(t){if(this._connectionDict.has(t)){const n=`RO_${t})`,a=this._connectionDict.get(n);return typeof a<"u"?Promise.resolve(a):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async isNCDatabase(t){try{const n=await this.sqlite.isNCDatabase({databasePath:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async retrieveAllConnections(){return this._connectionDict}async closeAllConnections(){const t=new Map;try{for(const n of this._connectionDict.keys()){const a=n.substring(3),s=n.substring(0,3)==="RO_";await this.sqlite.closeConnection({database:a,readonly:s}),t.set(n,null)}for(const n of t.keys())this._connectionDict.delete(n);return Promise.resolve()}catch(n){return Promise.reject(n)}}async checkConnectionsConsistency(){try{const t=[...this._connectionDict.keys()],n=[],a=[];for(const r of t)n.push(r.substring(0,2)),a.push(r.substring(3));const s=await this.sqlite.checkConnectionsConsistency({dbNames:a,openModes:n});return s.result||(this._connectionDict=new Map),Promise.resolve(s)}catch(t){return this._connectionDict=new Map,Promise.reject(t)}}async importFromJson(t){try{const n=await this.sqlite.importFromJson({jsonstring:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async isJsonValid(t){try{const n=await this.sqlite.isJsonValid({jsonstring:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async copyFromAssets(t){const n=t??!0;try{return await this.sqlite.copyFromAssets({overwrite:n}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getFromHTTPRequest(t,n){const a=n??!0;try{return await this.sqlite.getFromHTTPRequest({url:t,overwrite:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async isDatabaseEncrypted(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const n=await this.sqlite.isDatabaseEncrypted({database:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async isInConfigEncryption(){try{const t=await this.sqlite.isInConfigEncryption();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isInConfigBiometricAuth(){try{const t=await this.sqlite.isInConfigBiometricAuth();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isDatabase(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const n=await this.sqlite.isDatabase({database:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async getDatabaseList(){try{const n=(await this.sqlite.getDatabaseList()).values;n.sort();const a={values:n};return Promise.resolve(a)}catch(t){return Promise.reject(t)}}async getMigratableDbList(t){const n=t||"default";try{const a=await this.sqlite.getMigratableDbList({folderPath:n});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async addSQLiteSuffix(t,n){const a=t||"default",s=n||[];try{const r=await this.sqlite.addSQLiteSuffix({folderPath:a,dbNameList:s});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async deleteOldDatabases(t,n){const a=t||"default",s=n||[];try{const r=await this.sqlite.deleteOldDatabases({folderPath:a,dbNameList:s});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async moveDatabasesAndAddSuffix(t,n){const a=t||"default",s=n||[];return this.sqlite.moveDatabasesAndAddSuffix({folderPath:a,dbNameList:s})}}class rt{constructor(t,n,a){this.dbName=t,this.readonly=n,this.sqlite=a}getConnectionDBName(){return this.dbName}getConnectionReadOnly(){return this.readonly}async open(){try{return await this.sqlite.open({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async close(){try{return await this.sqlite.close({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async beginTransaction(){try{const t=await this.sqlite.beginTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async commitTransaction(){try{const t=await this.sqlite.commitTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async rollbackTransaction(){try{const t=await this.sqlite.rollbackTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTransactionActive(){try{const t=await this.sqlite.isTransactionActive({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async loadExtension(t){try{return await this.sqlite.loadExtension({database:this.dbName,path:t,readonly:this.readonly}),Promise.resolve()}catch(n){return Promise.reject(n)}}async enableLoadExtension(t){try{return await this.sqlite.enableLoadExtension({database:this.dbName,toggle:t,readonly:this.readonly}),Promise.resolve()}catch(n){return Promise.reject(n)}}async getUrl(){try{const t=await this.sqlite.getUrl({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getVersion(){try{const t=await this.sqlite.getVersion({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getTableList(){try{const t=await this.sqlite.getTableList({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async execute(t,n=!0,a=!0){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const s=await this.sqlite.execute({database:this.dbName,statements:t,transaction:n,readonly:!1,isSQL92:a});return Promise.resolve(s)}}catch(s){return Promise.reject(s)}}async query(t,n,a=!0){let s;try{return n&&n.length>0?s=await this.sqlite.query({database:this.dbName,statement:t,values:n,readonly:this.readonly,isSQL92:!0}):s=await this.sqlite.query({database:this.dbName,statement:t,values:[],readonly:this.readonly,isSQL92:a}),s=await this.reorderRows(s),Promise.resolve(s)}catch(r){return Promise.reject(r)}}async run(t,n,a=!0,s="no",r=!0){let i;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(n&&n.length>0?i=await this.sqlite.run({database:this.dbName,statement:t,values:n,transaction:a,readonly:!1,returnMode:s,isSQL92:!0}):i=await this.sqlite.run({database:this.dbName,statement:t,values:[],transaction:a,readonly:!1,returnMode:s,isSQL92:r}),i.changes=await this.reorderRows(i.changes),Promise.resolve(i))}catch(d){return Promise.reject(d)}}async executeSet(t,n=!0,a="no",s=!0){let r;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(r=await this.sqlite.executeSet({database:this.dbName,set:t,transaction:n,readonly:!1,returnMode:a,isSQL92:s}),r.changes=await this.reorderRows(r.changes),Promise.resolve(r))}catch(i){return Promise.reject(i)}}async isExists(){try{const t=await this.sqlite.isDBExists({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTable(t){try{const n=await this.sqlite.isTableExists({database:this.dbName,table:t,readonly:this.readonly});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async isDBOpen(){try{const t=await this.sqlite.isDBOpen({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async delete(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteDatabase({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async createSyncTable(){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const t=await this.sqlite.createSyncTable({database:this.dbName,readonly:!1});return Promise.resolve(t)}}catch(t){return Promise.reject(t)}}async setSyncDate(t){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.setSyncDate({database:this.dbName,syncdate:t,readonly:!1}),Promise.resolve())}catch(n){return Promise.reject(n)}}async getSyncDate(){try{const t=await this.sqlite.getSyncDate({database:this.dbName,readonly:this.readonly});let n="";return t.syncDate>0&&(n=new Date(t.syncDate*1e3).toISOString()),Promise.resolve(n)}catch(t){return Promise.reject(t)}}async exportToJson(t,n=!1){try{const a=await this.sqlite.exportToJson({database:this.dbName,jsonexportmode:t,readonly:this.readonly,encrypted:n});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async deleteExportedRows(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteExportedRows({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async executeTransaction(t,n=!0){let a=0,s=!1;if(this.readonly)return Promise.reject("not allowed in read-only mode");if(await this.sqlite.beginTransaction({database:this.dbName}),s=await this.sqlite.isTransactionActive({database:this.dbName}),!s)return Promise.reject("After Begin Transaction, no transaction active");try{for(const d of t){if(typeof d!="object"||!("statement"in d))throw new Error("Error a task.statement must be provided");if("values"in d&&d.values&&d.values.length>0){const o=d.statement.toUpperCase().includes("RETURNING")?"all":"no",c=await this.sqlite.run({database:this.dbName,statement:d.statement,values:d.values,transaction:!1,readonly:!1,returnMode:o,isSQL92:n});if(c.changes.changes<0)throw new Error("Error in transaction method run ");a+=c.changes.changes}else{const o=await this.sqlite.execute({database:this.dbName,statements:d.statement,transaction:!1,readonly:!1});if(o.changes.changes<0)throw new Error("Error in transaction method execute ");a+=o.changes.changes}}const r=await this.sqlite.commitTransaction({database:this.dbName});a+=r.changes.changes;const i={changes:{changes:a}};return Promise.resolve(i)}catch(r){const i=r.message?r.message:r;return await this.sqlite.rollbackTransaction({database:this.dbName}),Promise.reject(i)}}async reorderRows(t){const n=t;if(t?.values&&typeof t.values[0]=="object"&&Object.keys(t.values[0]).includes("ios_columns")){const a=t.values[0].ios_columns,s=[];for(let r=1;r<t.values.length;r++){const i=t.values[r],d={};for(const o of a)d[o]=i[o];s.push(d)}n.values=s}return Promise.resolve(n)}}const ra=de("CapacitorSQLite",{web:()=>We(()=>import("./web-BRKZUYI9.js"),[]).then(e=>new e.CapacitorSQLiteWeb),electron:()=>window.CapacitorCustomPlatform.plugins.CapacitorSQLite});function ia(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}const oa="laba101_offline",Re="fresh_start_reset_v1",ca=new sa(ra);let we=null;const Q=[{id:1,name:"Laba101 Admin",email:"admin@laba101.test",password:"password",role:"admin",branch:"Main Store"},{id:2,name:"Gensan Branch Staff",email:"staff@laba101.gensan",password:"password",role:"staff",branch:"Gensan Branch"}],Oe=[],z=[V(1,"Drop-off","P185. Includes wash, dry, and fold.","Drop-Off","order",185,8,40,["Wash","Dry","Fold"],0,24),V(2,"Full Service","P200. Wash, Fabcon, detergent, dry, and fold.","Full Service","order",200,8,40,["Wash","Dry","Fold","Detergent","Fabcon"],0,24),V(3,"Self Service Wash","P60. Self-service wash (max 8kg per load).","Self Service","order",60,8,null,["Wash"],0,1),V(4,"Self Service Dry","P70. Self-service dry (40 mins).","Self Service","order",70,8,40,["Dry"],0,1),V(6,"Dry 10 mins","Additional drying time (10 mins).","Add-on","addon",30,8,10,["Dry"],0,1),V(7,"Dry 20 mins","Additional drying time (20 mins).","Add-on","addon",50,8,20,["Dry"],0,1),V(8,"Dry 40 mins","Additional drying time (40 mins).","Add-on","addon",70,8,40,["Dry"],0,1),V(9,"Additional Zonrox","Extra Zonrox bleach add-on per load.","Add-on","addon",10,0,null,["Zonrox"],0,0),V(10,"Additional Fabcon","Extra Fabcon fabric conditioner add-on per load.","Add-on","addon",10,0,null,["Fabcon"],0,0),V(11,"Additional Finishing","Extra finishing spray add-on per load.","Add-on","addon",20,0,null,["Finishing"],0,0)],se=[{id:1,name:"Regular Clothes",maxKg:8,additionalFee:0,isActive:1},{id:2,name:"Comforter",maxKg:4,additionalFee:0,isActive:1},{id:3,name:"Thin Blankets",maxKg:6,additionalFee:0,isActive:1},{id:4,name:"Bedsheets",maxKg:6,additionalFee:0,isActive:1},{id:5,name:"Bath Towels",maxKg:6,additionalFee:0,isActive:1},{id:6,name:"Curtains",maxKg:6,additionalFee:0,isActive:1}];function it(e,t){const n=C(e,[]),a=new Map(n.map(r=>[r.id,r])),s=t.map(r=>{const i=a.get(r.id);return i?{...r,...i,isActive:i.isActive??r.isActive}:r});(n.length!==s.length||s.some((r,i)=>r.id!==n[i]?.id||JSON.stringify(r)!==JSON.stringify(n[i])))&&N(e,s)}async function la(){it("services",z),it("item_categories",se)}async function Ie(e){for(const t of z)((await e.query("SELECT id FROM laundry_services WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive,t.id]):await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive]);for(const t of se)((await e.query("SELECT id FROM item_categories WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.maxKg,t.additionalFee,t.isActive,t.id]):await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[t.id,t.name,t.maxKg,t.additionalFee,t.isActive])}const re=[],fe=[],ce=[],he=[],ge=[],Z=[...[1,2,3,4].map(e=>({id:e,machineName:`Washer ${e}`,machineType:"washer",status:"available",branch:"Main Store"})),...[1,2,3,4].map(e=>({id:e+4,machineName:`Dryer ${e}`,machineType:"dryer",status:"available",branch:"Main Store"}))],be=[{key:"branch",value:"Main Store"},{key:"fold_rate",value:"5"},{key:"report_email",value:"admin@laba101.test"}];function V(e,t,n,a,s,r,i,d,o,c,u){return{id:e,name:t,description:n,category:a,serviceType:s,price:r,maxKg:i,dryingMinutes:d,includes:o,additionalCharge:c,turnaroundHours:u,isActive:1}}function G(e){return`laba101-mobile-${e}`}function C(e,t){const n=localStorage.getItem(G(e));if(!n)return structuredClone(t);try{return JSON.parse(n)}catch{return structuredClone(t)}}function N(e,t){localStorage.setItem(G(e),JSON.stringify(t))}function W(e){return e.reduce((t,n)=>Math.max(t,n.id),0)+1}function K(){return new Date().toISOString()}function De(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${a}`}function da(){return De().slice(2).replaceAll("-","")}function J(e,t){if(!e)return t;try{return JSON.parse(e)}catch{return t}}async function O(){return we||(we=await ca.createConnection(oa,!1,"no-encryption",1,!1),await we.open()),we}async function k(e,t,n,a){((await e.query(`PRAGMA table_info(${t})`)).values??[]).some(i=>i.name===n)||await e.execute(`ALTER TABLE ${t} ADD COLUMN ${n} ${a}`)}function ua(){const e=C("staff",Q),t=new Map(e.map(a=>[a.id,a]));let n=!1;for(const a of Q){const s=t.get(a.id);if(!s){t.set(a.id,{...a,isActive:1}),n=!0;continue}const r={...s,name:a.name,email:a.email,password:a.password,role:a.role,branch:a.branch,isActive:1};JSON.stringify(r)!==JSON.stringify(s)&&(t.set(a.id,r),n=!0)}n&&N("staff",Array.from(t.values()).sort((a,s)=>a.id-s.id))}async function ma(){localStorage.getItem(G(Re))||(N("staff",Q),N("customers",[]),N("orders",[]),N("payments",[]),N("fold_logs",[]),N("expenses",[]),N("sales",[]),localStorage.getItem(G("services"))||N("services",z),localStorage.getItem(G("item_categories"))||N("item_categories",se),localStorage.getItem(G("machines"))||N("machines",Z),localStorage.getItem(G("subcleanings"))||N("subcleanings",[]),localStorage.getItem(G("settings"))||N("settings",be),localStorage.removeItem("laba101-mobile-session"),N(Re,!0))}async function bt(e){for(const t of Q){if(((await e.query("SELECT id FROM staff WHERE id = ?",[t.id])).values??[]).length>0){await e.run("UPDATE staff SET name = ?, email = ?, password = ?, role = ?, branch = ?, isActive = 1 WHERE id = ?",[t.name,t.email,t.password,t.role,t.branch,t.id]);continue}await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.email,t.password,t.role,t.branch,1])}}async function pa(e){if(!(((await e.query("SELECT COUNT(*) as count FROM machines")).values?.[0]?.count??0)>0))for(const n of Z)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[n.id,n.machineName,n.machineType,n.status,n.branch])}async function ya(e){for(const t of be)await e.run("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)",[t.key,t.value])}async function Et(e){for(const t of z)((await e.query("SELECT id FROM laundry_services WHERE id = ?",[t.id])).values??[]).length>0||await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive]);for(const t of se)((await e.query("SELECT id FROM item_categories WHERE id = ?",[t.id])).values??[]).length>0||await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[t.id,t.name,t.maxKg,t.additionalFee,t.isActive])}async function va(e){((await e.query("SELECT value FROM settings WHERE key = ?",[Re])).values??[]).length>0||(await e.execute(`
    DELETE FROM payments;
    DELETE FROM orders;
    DELETE FROM customers;
    DELETE FROM fold_logs;
    DELETE FROM disbursement_expenses;
    DELETE FROM daily_sales;
    DELETE FROM revolving_history;
    DELETE FROM staff WHERE id NOT IN (1, 2);
  `),await bt(e),await Et(e),await pa(e),await ya(e),await e.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",[Re,K()]),localStorage.removeItem("laba101-mobile-session"))}async function fa(){if(!R.isNativePlatform()){await ma(),!localStorage.getItem(G("seeded_v4"))&&!localStorage.getItem(G("services"))&&!localStorage.getItem(G("staff"))&&(N("staff",Q),N("customers",Oe),N("services",z),N("item_categories",se),N("orders",re),N("payments",fe),N("fold_logs",[]),N("expenses",ce),N("sales",he),N("revolving_history",ge),N("machines",Z),N("subcleanings",[]),N("settings",be),N("seeded_v4",!0)),await la(),ua(),localStorage.getItem(G("seeded_v4"))||N("seeded_v4",!0);return}const e=await O();await e.execute(`
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
      foldedAt TEXT,
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
  `),await k(e,"staff","email","TEXT"),await k(e,"staff","password","TEXT"),await k(e,"staff","role","TEXT"),await k(e,"staff","isActive","INTEGER NOT NULL DEFAULT 1"),await e.run('UPDATE staff SET password = ? WHERE password IS NULL OR password = ""',["password"]),await e.run('UPDATE staff SET role = ? WHERE role IS NULL OR role = ""',["staff"]),await k(e,"orders","customerId","INTEGER NOT NULL DEFAULT 0"),await k(e,"orders","phone","TEXT"),await k(e,"orders","serviceId","INTEGER NOT NULL DEFAULT 0"),await k(e,"orders","serviceLines","TEXT"),await k(e,"orders","itemCategoryId","INTEGER NOT NULL DEFAULT 0"),await k(e,"orders","itemCategory",'TEXT NOT NULL DEFAULT "Regular Clothes"'),await k(e,"orders","workflowCompleted","TEXT"),await k(e,"orders","weightKg","REAL NOT NULL DEFAULT 0"),await k(e,"orders","price","REAL NOT NULL DEFAULT 0"),await k(e,"orders","additionalCharge","REAL NOT NULL DEFAULT 0"),await k(e,"orders","extraServiceAmount","REAL NOT NULL DEFAULT 0"),await k(e,"orders","totalAmount","REAL NOT NULL DEFAULT 0"),await k(e,"orders","paidAmount","REAL NOT NULL DEFAULT 0"),await k(e,"orders","extras","TEXT"),await k(e,"orders","notes","TEXT"),await k(e,"orders","foldedByStaffIds","TEXT"),await k(e,"orders","foldedAt","TEXT"),await k(e,"orders","releasedBy","INTEGER"),await k(e,"orders","dueAt","TEXT"),await k(e,"orders","createdAt",'TEXT NOT NULL DEFAULT ""'),await k(e,"daily_sales","saleNumber","TEXT"),await k(e,"daily_sales","status","TEXT"),await k(e,"daily_sales","endorsedTo","TEXT"),await k(e,"daily_sales","statusUpdatedAt","TEXT"),await k(e,"disbursement_expenses","disbursementType",'TEXT NOT NULL DEFAULT "daily"'),await k(e,"subcleanings","cleaningType",'TEXT NOT NULL DEFAULT "tube"');const n=((await e.query("SELECT COUNT(*) as count FROM staff")).values?.[0]?.count??0)===0;if(n){for(const a of Q)await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.name,a.email,a.password,a.role,a.branch,1]);for(const a of Oe)await e.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[a.id,a.name,a.phone,a.address]);for(const a of z)await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[a.id,a.name,a.description,a.category,a.serviceType,a.price,a.maxKg,a.dryingMinutes,JSON.stringify(a.includes),a.additionalCharge,a.turnaroundHours,a.isActive]);for(const a of se)await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[a.id,a.name,a.maxKg,a.additionalFee,a.isActive]);for(const a of re)await St(e,a);for(const a of fe)await e.run("INSERT INTO payments (id, orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.orderId,a.amount,a.method,a.reference,a.receivedAt,a.branch]);for(const a of ce)await e.run("INSERT INTO disbursement_expenses (id, expenseDate, number, disbursementType, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[a.id,a.expenseDate,a.number,a.disbursementType??"daily",a.name,a.category,a.description,a.amount]);for(const a of he)await e.run("INSERT INTO daily_sales (id, saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.saleDate,a.saleNumber,a.cashAmount,a.gcashAmount,a.totalAmount,a.notes]);for(const a of ge)await e.run("INSERT INTO revolving_history (id, revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[a.id,a.revolvingNumber,a.name,a.amount,a.category,a.description,a.type,a.createdAt]);for(const a of Z)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[a.id,a.machineName,a.machineType,a.status,a.branch]);for(const a of be)await e.run("INSERT INTO settings (key, value) VALUES (?, ?)",[a.key,a.value]);await e.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",["fresh_install_defaults",K()])}await Ie(e),await bt(e),n||await Et(e),await va(e)}async function St(e,t){await e.run("INSERT INTO orders (id, ticket, customerId, customer, phone, serviceId, service, serviceLines, itemCategoryId, itemCategory, branch, status, workflowCompleted, weightKg, price, additionalCharge, extraServiceAmount, totalAmount, paidAmount, extras, notes, foldedBy, foldedByStaffIds, foldedAt, dueAt, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.ticket,t.customerId,t.customer,t.phone,t.serviceId,t.service,JSON.stringify(t.serviceLines??[]),t.itemCategoryId,t.itemCategory,t.branch,t.status,JSON.stringify(t.workflowCompleted),t.weightKg,t.price,t.additionalCharge,t.extraServiceAmount,t.totalAmount,t.paidAmount,JSON.stringify(t.extras),t.notes,t.foldedBy,JSON.stringify(t.foldedByStaffIds??[]),t.foldedAt??null,t.dueAt,t.createdAt])}function ha(e){const t=Number(e.paidAmount??0),n=Number(e.totalAmount??0),a=Number(e.foldedBy),s=Number(e.releasedBy),r=J(e.serviceLines,[]),i=Number(e.serviceId),d=String(e.service),o=Number(e.price);return{id:Number(e.id),ticket:String(e.ticket),customerId:Number(e.customerId),customer:String(e.customer),phone:e.phone?String(e.phone):null,serviceId:i,service:d,serviceLines:r.length?r:[{id:i,name:d,price:o,quantity:1,total:o}],itemCategoryId:Number(e.itemCategoryId),itemCategory:String(e.itemCategory),branch:String(e.branch),status:String(e.status),workflowCompleted:J(e.workflowCompleted,[]),weightKg:Number(e.weightKg),price:o,additionalCharge:Number(e.additionalCharge),extraServiceAmount:Number(e.extraServiceAmount),totalAmount:n,paidAmount:t,balance:Number((n-t).toFixed(2)),extras:J(e.extras,[]),notes:e.notes?String(e.notes):null,foldedBy:Number.isFinite(a)&&a>0?a:null,foldedByName:e.foldedByName?String(e.foldedByName):null,foldedByStaffIds:J(e.foldedByStaffIds,[]),foldedAt:e.foldedAt?String(e.foldedAt):null,releasedBy:Number.isFinite(s)&&s>0?s:null,releasedByName:e.releasedByName?String(e.releasedByName):null,dueAt:String(e.dueAt),createdAt:String(e.createdAt)}}async function ga(){await fa()}async function ue(){return(await Xe()).find(t=>t.key==="branch")?.value??"Main Store"}async function ba(){const e=await Xe();return Number(e.find(t=>t.key==="fold_rate")?.value??"5")}async function Tt(e){return(await Xe()).find(n=>n.key===e)?.value}async function Xe(){return R.isNativePlatform()?(await(await O()).query("SELECT key, value FROM settings ORDER BY key")).values??[]:C("settings",be)}async function Le(e,t){if(!R.isNativePlatform()){const a=C("settings",be).filter(s=>s.key!==e);a.push({key:e,value:t}),N("settings",a);return}await(await O()).run("REPLACE INTO settings (key, value) VALUES (?, ?)",[e,t])}async function Ea(e){return R.isNativePlatform()?(await(await O()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff WHERE branch = ? ORDER BY name ASC',[e])).values??[]:C("staff",Q).filter(a=>a.branch===e)}async function Ge(){return R.isNativePlatform()?(await(await O()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff ORDER BY name ASC')).values??[]:C("staff",Q)}async function wt(e,t){const n=e.trim().toLowerCase();return(await Ge()).find(s=>s.email.toLowerCase()===n&&s.password===t&&s.isActive!==0)??null}async function Sa(e){if(!R.isNativePlatform()){const n=C("staff",Q);n.unshift({id:W(n),...e,isActive:1}),N("staff",n);return}await(await O()).run("INSERT INTO staff (name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?)",[e.name,e.email,e.password,e.role,e.branch,1])}async function ot(e,t){if(!R.isNativePlatform()){const r=C("staff",Q),i=r.find(d=>d.id===e);i&&(Object.assign(i,t),N("staff",r));return}const n=await O(),a=[],s=[];for(const[r,i]of Object.entries(t))r!=="id"&&(a.push(`${r} = ?`),s.push(i));a.length&&(s.push(e),await n.run(`UPDATE staff SET ${a.join(", ")} WHERE id = ?`,s))}async function Ta(){return R.isNativePlatform()?(await(await O()).query("SELECT id, name, phone, address FROM customers ORDER BY name ASC")).values??[]:C("customers",Oe).sort((n,a)=>n.name.localeCompare(a.name))}async function wa(e){if(!R.isNativePlatform()){const s=C("customers",Oe),r=e.id?s.find(d=>d.id===e.id):s.find(d=>d.name.toLowerCase()===e.name.toLowerCase()&&(e.phone?d.phone===e.phone:!0));if(r)return r.name=e.name,r.phone=e.phone??r.phone,r.address=e.address??r.address,N("customers",s),r;const i={id:W(s),name:e.name,phone:e.phone??null,address:e.address??null};return s.push(i),N("customers",s),i}const t=await O();if(e.id)return await t.run("UPDATE customers SET name = ?, phone = ?, address = ? WHERE id = ?",[e.name,e.phone??null,e.address??null,e.id]),{id:e.id,name:e.name,phone:e.phone??null,address:e.address??null};const n=await t.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM customers"),a=Number((n.values?.[0]).id);return await t.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[a,e.name,e.phone??null,e.address??null]),{id:a,name:e.name,phone:e.phone??null,address:e.address??null}}async function Ke(e){if(!R.isNativePlatform())return C("services",z).filter(a=>!0);const t=await O(),n=await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[]);return(n.values??[]).length===0?(await Ie(t),((await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[])).values??[]).map(s=>({...s,includes:J(s.includes,[])}))):(n.values??[]).map(a=>({...a,includes:J(a.includes,[])}))}async function Na(){if(!R.isNativePlatform())return C("services",z);const e=await O(),t=await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC");return(t.values??[]).length===0?(await Ie(e),((await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC")).values??[]).map(a=>({...a,includes:J(a.includes,[])}))):(t.values??[]).map(n=>({...n,includes:J(n.includes,[])}))}async function ct(e){if(!R.isNativePlatform()){const n=C("services",z),a=e.id?n.find(s=>s.id===e.id):null;a?Object.assign(a,e):n.unshift({...e,id:W(n)}),N("services",n);return}const t=await O();e.id?await t.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = ? WHERE id = ?",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive,e.id]):await t.run("INSERT INTO laundry_services (name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive])}async function Nt(){if(!R.isNativePlatform())return C("item_categories",se).filter(n=>n.isActive);const e=await O(),t=await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC");return(t.values??[]).length===0?(await Ie(e),(await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC")).values??[]):t.values??[]}async function Aa(e){if(!R.isNativePlatform()){const n=C("item_categories",se),a=e.id?n.find(s=>s.id===e.id):null;a?Object.assign(a,e):n.unshift({...e,id:W(n)}),N("item_categories",n);return}const t=await O();e.id?await t.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = ? WHERE id = ?",[e.name,e.maxKg,e.additionalFee,e.isActive,e.id]):await t.run("INSERT INTO item_categories (name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?)",[e.name,e.maxKg,e.additionalFee,e.isActive])}function Ce(e,t,n,a){const s=(Array.isArray(e)?e:[e]).map(f=>{const v=Math.max(0,Number(f.quantity??1)),$=Number(f.price);return{id:f.id,name:f.name,price:$,quantity:v,total:Number(($*v).toFixed(2))}}).filter(f=>f.quantity>0),r=Number(t.maxKg),i=0,d=0,o=a.map(f=>{const v=Math.max(0,Number(f.quantity??1)),$=Number(f.price);return{id:f.id,name:ia(f.name),price:$,quantity:v,total:Number(($*v).toFixed(2))}}).filter(f=>f.quantity>0),c=s.reduce((f,v)=>f+v.total,0),u=o.reduce((f,v)=>f+v.total,0),m=Number((c+d+u).toFixed(2));return{price:Number(c.toFixed(2)),additionalCharge:Number(d.toFixed(2)),extraServiceAmount:Number(u.toFixed(2)),totalAmount:m,allowedKg:r,extraKg:Number(i.toFixed(2)),warning:null,serviceLines:s,extras:o}}function At(e,t){return[...(e.serviceLines&&e.serviceLines.length?e.serviceLines:e.serviceId?[{id:e.serviceId}]:[]).some(s=>{const r=t.find(i=>i.id===s.id);return Array.isArray(r?.includes)&&r.includes.includes("Fold")})?[{key:"fold",label:"Fold"}]:[],{key:"claimed",label:"Claimed"}]}function La(e){return e.includes("claimed")?"claimed":e.includes("fold")?"ready":"received"}async function Se(e){return R.isNativePlatform()?((await(await O()).query("SELECT o.*, folded.name as foldedByName, released.name as releasedByName FROM orders o LEFT JOIN staff folded ON folded.id = o.foldedBy LEFT JOIN staff released ON released.id = o.releasedBy WHERE o.branch = ? ORDER BY o.id DESC",[e])).values??[]).map(a=>ha(a)):C("orders",re).filter(a=>a.branch===e).map(a=>({...a,serviceLines:a.serviceLines??[{id:a.serviceId,name:a.service,price:Number(a.price),quantity:1,total:Number(a.price)}],foldedByStaffIds:a.foldedByStaffIds??[],foldedAt:a.foldedAt??null,releasedBy:a.releasedBy??null,releasedByName:a.releasedByName??null,balance:Number((a.totalAmount-a.paidAmount).toFixed(2))}))}async function Ca(e){const[t,n]=await Promise.all([Ke(),Nt()]),a=e.serviceQuantities??(e.serviceId?{[e.serviceId]:1}:{}),s=t.filter(y=>y.serviceType==="order"&&Number(a[y.id]??0)>0).map(y=>({...y,quantity:Number(a[y.id]??0)})),r=s[0],i=n.find(y=>y.id===e.itemCategoryId)??n.find(y=>y.name.toLowerCase()===(r?.category??"").toLowerCase())??n.find(y=>y.name==="Regular Clothes")??n[0],d=e.addonQuantities??Object.fromEntries((e.addonIds??[]).map(y=>[y,1])),o=t.filter(y=>y.serviceType==="addon"&&Number(d[y.id]??0)>0).map(y=>({...y,quantity:Number(d[y.id]??0)}));if(!s.length&&!o.length)throw new Error("Please select at least one service or extra service.");const c=e.weightKg??Math.max(1,Number(i?.maxKg||r?.maxKg||1)),u=Ce(s,i,c,o),m=await wa({id:e.customerId||void 0,name:e.customerName,phone:e.customerPhone??null}),f=Math.max(0,e.paidAmount),v=Math.min(u.totalAmount,f),$={ticket:await $a(),customerId:m.id,customer:m.name,phone:m.phone,serviceId:r?.id??0,service:u.serviceLines.length?u.serviceLines.map(y=>`${y.name} x${y.quantity}`).join(", "):"Extras only",serviceLines:u.serviceLines,itemCategoryId:i.id,itemCategory:i.name,branch:e.branch,status:"received",workflowCompleted:["received"],weightKg:c,price:u.price,additionalCharge:u.additionalCharge,extraServiceAmount:u.extraServiceAmount,totalAmount:u.totalAmount,paidAmount:v,balance:Number((u.totalAmount-v).toFixed(2)),extras:u.extras,notes:e.notes||null,foldedBy:null,foldedByName:null,foldedByStaffIds:[],foldedAt:null,releasedBy:null,releasedByName:null,dueAt:new Date(Date.now()+Math.max(1,...s.map(y=>y.turnaroundHours))*60*60*1e3).toISOString(),createdAt:K()};if(!R.isNativePlatform()){const y=C("orders",re),g={...$,id:W(y)};return y.unshift(g),N("orders",y),f>0&&await _e(g.id,{amount:f,method:e.paymentMethod,reference:e.paymentReference??null}),g}const x=await O(),w=await x.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM orders"),b={...$,id:Number((w.values?.[0]).id)};return await St(x,b),f>0&&await x.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[b.id,f,e.paymentMethod,e.paymentReference??null,K(),e.branch]),b}async function $a(){const e=`LB${da()}`,t=await ue(),a=(await Se(t)).filter(r=>r.ticket.startsWith(e)).sort((r,i)=>i.ticket.localeCompare(r.ticket))[0],s=a?Number(a.ticket.slice(-3))+1:1;return`${e}-${String(s).padStart(3,"0")}`}async function lt(e,t){const n=await ue(),[a,s]=await Promise.all([Se(n),Ke()]),r=a.find(c=>c.id===e);if(!r)return;const d=At(r,s).map(c=>c.key).find(c=>!r.workflowCompleted.includes(c));if(!d)return;if(r.workflowCompleted=[...r.workflowCompleted,d],r.status=La(r.workflowCompleted),d==="fold"&&t){const c=Array.isArray(t)?t:[t];r.foldedBy=c[0]||null,r.foldedAt=K();const u=Array.isArray(r.foldedByStaffIds)?[...r.foldedByStaffIds]:[];u.push(...c),r.foldedByStaffIds=u}if(d==="claimed"&&t){const c=Array.isArray(t)?t:[t];r.releasedBy=c[0]||null}if(!R.isNativePlatform()){const c=C("orders",re),u=c.find(m=>m.id===r.id);u&&Object.assign(u,r),N("orders",c);return}await(await O()).run("UPDATE orders SET workflowCompleted = ?, status = ?, foldedBy = ?, foldedByStaffIds = ?, foldedAt = ?, releasedBy = ? WHERE id = ?",[JSON.stringify(r.workflowCompleted),r.status,r.foldedBy,JSON.stringify(r.foldedByStaffIds??[]),r.foldedAt??null,r.releasedBy,r.id])}async function _e(e,t){const n=await ue();if(!(await Se(n)).find(d=>d.id===e))return;const r=Math.max(0,t.amount);if(r<=0)return;if(!R.isNativePlatform()){const d=C("payments",fe);d.unshift({id:W(d),orderId:e,amount:r,method:t.method,reference:t.reference??null,receivedAt:K(),branch:n}),N("payments",d);const o=C("orders",re),c=o.find(u=>u.id===e);c&&(c.paidAmount=Math.min(c.totalAmount,Number((c.paidAmount+r).toFixed(2)))),N("orders",o);return}const i=await O();await i.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[e,r,t.method,t.reference??null,K(),n]),await i.run("UPDATE orders SET paidAmount = MIN(totalAmount, paidAmount + ?) WHERE id = ?",[r,e])}async function Ra(e){return R.isNativePlatform()?(await(await O()).query("SELECT id, orderId, amount, method, reference, receivedAt, branch FROM payments  ORDER BY receivedAt DESC",[])).values??[]:C("payments",fe).filter(a=>!0)}async function Oa(e){const t=await ue(),a=(await Se(t)).find(r=>r.id===e);if(!a)return;if(a.paidAmount>0)throw new Error("Cancel is only allowed for unpaid orders. Use Delete (admin) to refund paid orders.");if(!R.isNativePlatform()){const r=C("orders",re),i=C("payments",fe),d=C("fold_logs",[]),o=r.filter(m=>m.id!==e),c=i.filter(m=>m.orderId!==e),u=d.filter(m=>m.orderTicket!==a.ticket);N("orders",o),N("payments",c),N("fold_logs",u);return}const s=await O();await s.run("DELETE FROM payments WHERE orderId = ?",[e]),await s.run("DELETE FROM fold_logs WHERE orderTicket = ?",[a.ticket]),await s.run("DELETE FROM orders WHERE id = ?",[e])}async function Da(e){const t=await ue(),a=(await Se(t)).find(r=>r.id===e);if(!a)return;if(a.paidAmount<=0)throw new Error("Delete (refund) is only allowed for paid orders.");if(!R.isNativePlatform()){const r=C("orders",re),i=C("payments",fe),d=C("fold_logs",[]),o=r.filter(m=>m.id!==e),c=i.filter(m=>m.orderId!==e),u=d.filter(m=>m.orderTicket!==a.ticket);N("orders",o),N("payments",c),N("fold_logs",u);return}const s=await O();await s.run("DELETE FROM payments WHERE orderId = ?",[e]),await s.run("DELETE FROM fold_logs WHERE orderTicket = ?",[a.ticket]),await s.run("DELETE FROM orders WHERE id = ?",[e])}async function xa(){return R.isNativePlatform()?(await(await O()).query("SELECT id, orderTicket, staffName, foldCount, rate, total, createdAt FROM fold_logs ORDER BY id DESC")).values??[]:C("fold_logs",[])}async function Pa(e){const t=Number((e.foldCount*e.rate).toFixed(2));if(!R.isNativePlatform()){const a=C("fold_logs",[]);a.unshift({id:Date.now(),...e,total:t,createdAt:K()}),N("fold_logs",a);return}await(await O()).run("INSERT INTO fold_logs (orderTicket, staffName, foldCount, rate, total, createdAt) VALUES (?, ?, ?, ?, ?, ?)",[e.orderTicket,e.staffName,e.foldCount,e.rate,t,K()])}async function Ia(e){return R.isNativePlatform()?(await(await O()).query("SELECT id, timestamp, staffId, staffName, action, details, branch FROM activity_logs WHERE branch = ? ORDER BY timestamp DESC, id DESC",[e])).values??[]:C("activity_logs",[]).filter(a=>a.branch===e).sort((a,s)=>s.timestamp.localeCompare(a.timestamp))}async function qa(e){const t={timestamp:K(),staffId:e.staffId??null,staffName:e.staffName,action:e.action,details:e.details??"",branch:e.branch};if(!R.isNativePlatform()){const a=C("activity_logs",[]);a.unshift({id:W(a),...t}),N("activity_logs",a);return}await(await O()).run("INSERT INTO activity_logs (timestamp, staffId, staffName, action, details, branch) VALUES (?, ?, ?, ?, ?, ?)",[t.timestamp,t.staffId,t.staffName,t.action,t.details,t.branch])}async function Fa(){return R.isNativePlatform()?(await(await O()).query('SELECT id, expenseDate, number, COALESCE(disbursementType, "daily") as disbursementType, name, category, description, amount FROM disbursement_expenses ORDER BY expenseDate DESC, id DESC')).values??[]:C("expenses",ce).map(n=>({...n,disbursementType:n.disbursementType??"daily"}))}function ke(e){const t=/^DISB-(\d+)$/i.exec(String(e??"").trim());return t?Number(t[1]):0}function dt(e){const t=/^REV-(\d+)$/i.exec(String(e??"").trim());return t?Number(t[1]):0}async function ka(){let e=0;if(!R.isNativePlatform()){const s=C("expenses",ce),r=C("revolving_history",ge);for(const i of s)e=Math.max(e,ke(i.number));for(const i of r)i.type==="disbursement"&&(e=Math.max(e,ke(i.revolvingNumber)));return e}const t=await O(),n=await t.query("SELECT number FROM disbursement_expenses"),a=await t.query("SELECT revolvingNumber as number FROM revolving_history WHERE type = 'disbursement'");for(const s of[...n.values??[],...a.values??[]])e=Math.max(e,ke(String(s.number)));return e}async function Lt(){const e=await ka()+1;return`DISB-${String(e).padStart(2,"0")}`}async function Ua(){let e=0;if(!R.isNativePlatform()){const a=C("revolving_history",ge);for(const s of a)s.type==="add"&&(e=Math.max(e,dt(s.revolvingNumber)));return`REV-${String(e+1).padStart(2,"0")}`}const n=await(await O()).query("SELECT revolvingNumber FROM revolving_history WHERE type = 'add'");for(const a of n.values??[])e=Math.max(e,dt(String(a.revolvingNumber)));return`REV-${String(e+1).padStart(2,"0")}`}async function Ct(e){if(!R.isNativePlatform()){const n=C("expenses",ce),a=W(n);n.unshift({id:a,expenseDate:e.expenseDate,number:e.number,disbursementType:e.disbursementType??"daily",name:e.name,category:e.category,description:e.description||null,amount:e.amount}),N("expenses",n);return}await(await O()).run("INSERT INTO disbursement_expenses (expenseDate, number, disbursementType, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?, ?)",[e.expenseDate,e.number,e.disbursementType??"daily",e.name,e.category,e.description||null,e.amount])}async function Ma(e){const t=await Lt();await Ct({expenseDate:e.expenseDate,number:t,disbursementType:e.disbursementType??"daily",name:e.name,category:e.category,description:e.description,amount:e.amount})}async function Ba(e,t){if(!R.isNativePlatform()){const a=C("expenses",ce),s=a.find(r=>r.id===e);s&&(Object.assign(s,{expenseDate:t.expenseDate,disbursementType:t.disbursementType??"daily",name:t.name,category:t.category,description:t.description||null,amount:t.amount}),N("expenses",a));return}await(await O()).run("UPDATE disbursement_expenses SET expenseDate = ?, disbursementType = ?, name = ?, category = ?, description = ?, amount = ? WHERE id = ?",[t.expenseDate,t.disbursementType??"daily",t.name,t.category,t.description||null,t.amount,e])}async function _a(e){if(!R.isNativePlatform()){const n=C("expenses",ce);N("expenses",n.filter(a=>a.id!==e));return}await(await O()).run("DELETE FROM disbursement_expenses WHERE id = ?",[e])}async function ja(){return R.isNativePlatform()?(await(await O()).query('SELECT id, saleDate, COALESCE(saleNumber, "") as saleNumber, cashAmount, gcashAmount, totalAmount, notes, status, endorsedTo, statusUpdatedAt FROM daily_sales ORDER BY saleDate DESC, id DESC')).values??[]:C("sales",he)}async function Ha(e){const t=Number((e.cashAmount+e.gcashAmount).toFixed(2));if(!R.isNativePlatform()){const r=C("sales",he),i=e.id?r.find(d=>d.id===e.id):r.find(d=>d.saleDate===e.saleDate);if(i)Object.assign(i,{saleDate:e.saleDate,cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null});else{const d=W(r);r.unshift({id:d,saleDate:e.saleDate,saleNumber:`SALE-${String(d).padStart(2,"0")}`,cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null})}N("sales",r);return}const n=await O(),s=(e.id?await n.query("SELECT id, saleNumber FROM daily_sales WHERE id = ?",[e.id]):await n.query("SELECT id, saleNumber FROM daily_sales WHERE saleDate = ?",[e.saleDate])).values?.[0];if(s)await n.run("UPDATE daily_sales SET saleDate = ?, cashAmount = ?, gcashAmount = ?, totalAmount = ?, notes = ? WHERE id = ?",[e.saleDate,e.cashAmount,e.gcashAmount,t,e.notes||null,s.id]);else{const r=await n.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM daily_sales"),i=Number((r.values?.[0]).id);await n.run("INSERT INTO daily_sales (saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?)",[e.saleDate,`SALE-${String(i).padStart(2,"0")}`,e.cashAmount,e.gcashAmount,t,e.notes||null])}}async function Wa(e){if(!R.isNativePlatform()){const n=C("sales",he);N("sales",n.filter(a=>a.id!==e));return}await(await O()).run("DELETE FROM daily_sales WHERE id = ?",[e])}async function ut(e,t,n=null,a){if(!R.isNativePlatform()){const r=C("sales",he),i=r.find(d=>d.id===e);i&&(i.status=t,i.endorsedTo=n,i.statusUpdatedAt=a,N("sales",r));return}await(await O()).run("UPDATE daily_sales SET status = ?, endorsedTo = ?, statusUpdatedAt = ? WHERE id = ?",[t,n,a,e])}async function Xa(){return R.isNativePlatform()?(await(await O()).query("SELECT id, revolvingNumber, name, amount, category, description, type, createdAt FROM revolving_history ORDER BY createdAt DESC, id DESC")).values??[]:C("revolving_history",ge).sort((n,a)=>a.createdAt.localeCompare(n.createdAt))}async function mt(e){const t=e.type==="disbursement"?await Lt():await Ua();if(e.type==="disbursement"){const a=e.expenseDate??e.createdAt.slice(0,10);await Ct({expenseDate:a,number:t,name:e.name,category:e.category,description:e.description??"",amount:e.amount})}if(!R.isNativePlatform()){const a=C("revolving_history",ge),s=W(a);a.unshift({id:s,revolvingNumber:t,...e}),N("revolving_history",a);return}await(await O()).run("INSERT INTO revolving_history (revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)",[t,e.name,e.amount,e.category,e.description||null,e.type,e.createdAt])}async function $t(e){return R.isNativePlatform()?(await(await O()).query("SELECT id, machineName, machineType, status, branch FROM machines WHERE branch = ? ORDER BY machineType, machineName",[e])).values??[]:C("machines",Z).filter(a=>a.branch===e)}async function Rt(e){return R.isNativePlatform()?(await(await O()).query("SELECT id, name, unit, quantity, reorderLevel, notes, branch, updatedAt FROM inventory_items WHERE branch = ? ORDER BY name ASC",[e])).values??[]:C("inventory_items",[]).filter(a=>a.branch===e).sort((a,s)=>a.name.localeCompare(s.name))}async function Ga(e){const t={name:e.name,unit:e.unit,quantity:e.quantity,reorderLevel:e.reorderLevel,notes:e.notes||null,branch:e.branch,updatedAt:K()};if(!R.isNativePlatform()){const a=C("inventory_items",[]),s=e.id?a.find(r=>r.id===e.id):null;s?Object.assign(s,t):a.unshift({id:W(a),...t}),N("inventory_items",a);return}const n=await O();e.id?await n.run("UPDATE inventory_items SET name = ?, unit = ?, quantity = ?, reorderLevel = ?, notes = ?, updatedAt = ? WHERE id = ?",[t.name,t.unit,t.quantity,t.reorderLevel,t.notes,t.updatedAt,e.id]):await n.run("INSERT INTO inventory_items (name, unit, quantity, reorderLevel, notes, branch, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)",[t.name,t.unit,t.quantity,t.reorderLevel,t.notes,t.branch,t.updatedAt])}async function Ka(e){return R.isNativePlatform()?(await(await O()).query("SELECT id, itemId, itemName, movementType, quantity, notes, staffName, branch, createdAt FROM inventory_movements WHERE branch = ? ORDER BY createdAt DESC, id DESC",[e])).values??[]:C("inventory_movements",[]).filter(a=>a.branch===e).sort((a,s)=>s.createdAt.localeCompare(a.createdAt))}async function Va(e){const t=Math.max(0,Number(e.quantity||0));if(t<=0)throw new Error("Quantity must be greater than zero.");const a=(await Rt(e.branch)).find(d=>d.id===e.itemId);if(!a)throw new Error("Inventory item not found.");const s=e.movementType==="in"?a.quantity+t:a.quantity-t;if(s<0)throw new Error("Stock-out quantity is greater than current stock.");const r={itemId:a.id,itemName:a.name,movementType:e.movementType,quantity:t,notes:e.notes||null,staffName:e.staffName,branch:e.branch,createdAt:K()};if(!R.isNativePlatform()){const d=C("inventory_items",[]),o=d.find(u=>u.id===a.id);o&&(o.quantity=Number(s.toFixed(2)),o.updatedAt=r.createdAt),N("inventory_items",d);const c=C("inventory_movements",[]);c.unshift({id:W(c),...r}),N("inventory_movements",c);return}const i=await O();await i.run("UPDATE inventory_items SET quantity = ?, updatedAt = ? WHERE id = ?",[Number(s.toFixed(2)),r.createdAt,a.id]),await i.run("INSERT INTO inventory_movements (itemId, itemName, movementType, quantity, notes, staffName, branch, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[r.itemId,r.itemName,r.movementType,r.quantity,r.notes,r.staffName,r.branch,r.createdAt])}async function Ya(e){if(!R.isNativePlatform()){const n=C("machines",Z);n.unshift({id:W(n),...e}),N("machines",n);return}await(await O()).run("INSERT INTO machines (machineName, machineType, status, branch) VALUES (?, ?, ?, ?)",[e.machineName,e.machineType,e.status,e.branch])}async function Qa(e,t){if(!R.isNativePlatform()){const a=C("machines",Z),s=a.find(r=>r.id===e);s&&(s.status=t,N("machines",a));return}await(await O()).run("UPDATE machines SET status = ? WHERE id = ?",[t,e])}async function Ja(e){return R.isNativePlatform()?((await(await O()).query('SELECT id, date, machineIds, machineNames, cleaningStatus, COALESCE(cleaningType, "tube") as cleaningType, notes, branch FROM subcleanings WHERE branch = ? ORDER BY date DESC, id DESC',[e])).values??[]).map(a=>({...a,machineIds:J(a.machineIds,[])})):C("subcleanings",[]).filter(a=>a.branch===e).map(a=>({...a,cleaningType:a.cleaningType??"tube"}))}async function Ot(e){const n=(await $t(e.branch)).filter(i=>e.machineIds.includes(i.id)).map(i=>i.machineName).join(", "),a=e.cleaningType??"tube";if(!R.isNativePlatform()){const i=C("subcleanings",[]);i.unshift({id:W(i),date:e.date,machineIds:e.machineIds,machineNames:n,cleaningStatus:e.cleaningStatus,cleaningType:a,notes:e.notes||null,branch:e.branch}),N("subcleanings",i);const d=C("machines",Z);d.forEach(o=>{e.machineIds.includes(o.id)&&(o.status=e.cleaningStatus==="completed"?"available":"under_cleaning")}),N("machines",d);return}const s=await O();await s.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, cleaningType, notes, branch) VALUES (?, ?, ?, ?, ?, ?, ?)",[e.date,JSON.stringify(e.machineIds),n,e.cleaningStatus,a,e.notes||null,e.branch]);const r=e.cleaningStatus==="completed"?"available":"under_cleaning";for(const i of e.machineIds)await s.run("UPDATE machines SET status = ? WHERE id = ?",[r,i])}async function za(e,t){if(!R.isNativePlatform()){const i=C("machines",Z),d=i.find(u=>u.id===e);d&&(d.status="available"),N("machines",i);const o=C("subcleanings",[]),c=De();o.unshift({id:W(o),date:c,machineIds:[e],machineNames:d?.machineName??"",cleaningStatus:"completed",cleaningType:"tube",notes:null,branch:t}),N("subcleanings",o);return}const n=await O(),s=(await n.query("SELECT machineName FROM machines WHERE id = ?",[e])).values?.[0]?.machineName??"";await n.run("UPDATE machines SET status = ? WHERE id = ?",["available",e]);const r=De();await n.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, cleaningType, notes, branch) VALUES (?, ?, ?, ?, ?, ?, ?)",[r,JSON.stringify([e]),s,"completed","tube",null,t])}async function Za(e,t){await Ot({date:De(),machineIds:[],cleaningStatus:"completed",cleaningType:"general",notes:`Confirmed by ${t}`,branch:e})}const Ve=document.querySelector("#app");if(!Ve)throw new Error("App root not found");let Ne;const Ee=de("BluetoothThermalPrinter"),Ye={dashboard:"Dashboard",pos:"POS",orders:"Orders",archived:"Archived Order",customers:"Customers",pricing:"Pricing Services",disbursements:"Daily Report",reports:"Reports",logs:"Logs",inventory:"Inventory",maintenance:"Maintenance",staff:"Staff",revolving:"Revolving Fund",settings:"Settings"},l={tab:"dashboard",receiptOrderId:0,currentUser:null,loginError:"",sidebarOpen:!1,dailyReportTab:"expenses",maintenanceTab:"cleaning",customerSearch:"",orderSearch:"",orderDateFilter:"",orderPaymentFilter:"",printerPanelOpen:!1,printerLoading:!1,printerError:"",printerStatus:"",printerPaperWidth:58,pairedPrinters:[],selectedPrinterAddress:"",archivedOrderSearch:"",paymentModalOrderId:0,dashboardSummaryModalOpen:!1,reportPreview:null,endorseModalOpen:!1,endorseSaleId:0,endorseSaleDate:"",revolvingModalOpen:!1,revolvingSaleId:0,addFundModalOpen:!1,disbursementModalOpen:!1,revolvingHistoryFrom:"",revolvingHistoryTo:""},en=["Wash","Dry","Fold","Detergent","Fabcon","Zonrox","Finishing"],tn=["Supplies","Utilities","Maintenance","Salary","Rent","Transport","Other"],Te="laba101-mobile-session";function S(e){return new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(e||0)}function p(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ae(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}function qe(e,t){return Number((e-t).toFixed(2))}function Dt(e,t,n,a=0){const s=t.filter(i=>X(i.createdAt)===e).reduce((i,d)=>i+d.paidAmount,0),r=n.filter(i=>ne(i)==="daily"&&i.expenseDate===e).reduce((i,d)=>i+d.amount,0);return qe(s+a,r)}function an(e,t){const n=new Map(t.map(s=>[s.id,s.name])),a=new Map;return e.filter(s=>s.workflowCompleted.includes("fold")).forEach(s=>{(Array.isArray(s.foldedByStaffIds)&&s.foldedByStaffIds.length?s.foldedByStaffIds:s.foldedBy?[s.foldedBy]:[]).forEach(i=>{if(!i)return;const d=n.get(i)??String(i),o=a.get(i)??{staffId:i,staffName:d,folds:0};o.folds+=1,a.set(i,o)})}),e.filter(s=>s.workflowCompleted.includes("fold")&&s.foldedByName&&s.foldedBy).forEach(s=>{const r=a.get(s.foldedBy);r&&r.staffName===String(s.foldedBy)&&(r.staffName=s.foldedByName)}),Array.from(a.values()).map(s=>({staffName:s.staffName,folds:s.folds}))}function nn(e){return e.foldedAt?X(e.foldedAt):X(e.createdAt)}function pt(e){const t=e.match(/(\d+)$/);return t?Number(t[1]):0}function le(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${a}`}function j(){return le()}function je(){return j().slice(0,7)}function ne(e){return e.disbursementType==="monthly"?"monthly":"daily"}function xt(e){return e.slice(0,7)}function Pt(e){return ne(e)==="monthly"?xt(e.expenseDate):e.expenseDate}function X(e){return le(new Date(e))}function xe(e){return e.paidAmount<=0?"unpaid":e.balance>0?"partial":"paid"}function It(e,t,n){const a=new Map(t.map(i=>[i.id,i])),s=new Map(t.map(i=>[i.id,Number(i.totalAmount||0)])),r={cash:0,gcash:0,total:0};return[...e].sort((i,d)=>new Date(i.receivedAt).getTime()-new Date(d.receivedAt).getTime()||i.id-d.id).forEach(i=>{const d=a.get(i.orderId);if(!d)return;const o=s.get(d.id)??0,c=Math.min(Math.max(0,Number(i.amount||0)),o);s.set(d.id,Number((o-c).toFixed(2))),!(!n(i)||c<=0)&&(i.method==="gcash"?r.gcash+=c:r.cash+=c,r.total+=c)}),{cash:Number(r.cash.toFixed(2)),gcash:Number(r.gcash.toFixed(2)),total:Number(r.total.toFixed(2))}}function ye(e){return new Intl.DateTimeFormat("en-PH",{dateStyle:"medium",timeStyle:"short"}).format(new Date(e))}function Pe(e){const t=new Date(e),n=new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric",year:"numeric"}).format(t),a=new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",hour12:!0}).format(t);return`<div class="datetime-stack"><strong>${p(n)}</strong><span class="meta">${p(a)}</span></div>`}function sn(e){return e?.role==="staff"&&e.branch==="Gensan Branch"}function rn(e){return e?.role==="staff"&&e.branch.toLowerCase().includes("mintal")}async function Y(e,t=""){l.currentUser&&await qa({staffId:l.currentUser.id,staffName:l.currentUser.name,action:e,details:t,branch:await ue()})}async function on(e){return(await Ge()).filter(n=>n.role==="admin"&&n.isActive!==0).some(n=>n.password===e)}function ee(e,t,n="data-table"){return`
    <div class="table-scroll">
      <table class="${n}">
        <thead><tr>${e.map(a=>`<th>${p(a)}</th>`).join("")}</tr></thead>
        <tbody>${t.length?t.map(a=>`<tr>${a.map(s=>`<td>${s}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${e.length}" class="table-empty">No records found.</td></tr>`}</tbody>
      </table>
    </div>
  `}function cn(e=new Date){return{date:new Intl.DateTimeFormat("en-PH",{weekday:"long",month:"long",day:"numeric",year:"numeric"}).format(e),time:new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",second:"2-digit",hour12:!0}).format(e)}}function Ae(){const e=document.querySelector("[data-date-from]"),t=document.querySelector("[data-date-to]"),n=Array.from(document.querySelectorAll('input[name="reportType"]:checked')).map(a=>a.value).filter(a=>a==="sales"||a==="disbursement"||a==="fold_count"||a==="revolving_fund"||a==="summary");return{from:e?.value||"0000-01-01",to:t?.value||"9999-12-31",types:n.length?n:["summary"]}}function oe(e,t){return e>=t.from&&e<=t.to}function qt(e,t,n,a,s,r,i,d){const o=new Set(d.types),c=n.filter(h=>oe(h.saleDate,d)),u=a.filter(h=>oe(h.expenseDate,d)),m=e.filter(h=>h.workflowCompleted.includes("fold")&&oe(nn(h),d)),f=an(m,r),v=t.filter(h=>oe(X(h.receivedAt),d)),$=new Set(v.map(h=>h.orderId)),x=new Set(t.map(h=>h.orderId)),w=e.filter(h=>oe(X(h.createdAt),d)||$.has(h.id)),b=new Map;v.forEach(h=>{const F=b.get(h.orderId)??{cash:0,gcash:0};h.method==="gcash"?F.gcash+=h.amount:F.cash+=h.amount,b.set(h.orderId,F)});const y=h=>x.has(h.id)?b.get(h.id)??{cash:0,gcash:0}:oe(X(h.createdAt),d)?{cash:h.paidAmount,gcash:0}:{cash:0,gcash:0},g=w.reduce((h,F)=>{const H=y(F),te=H.cash+H.gcash;if(te>F.totalAmount&&F.totalAmount>0&&x.has(F.id)){const pe=F.totalAmount/te;return h+H.cash*pe}return h+H.cash},0),T=c.reduce((h,F)=>h+F.cashAmount,0),A=c.reduce((h,F)=>h+F.gcashAmount,0),P=w.reduce((h,F)=>{const H=y(F),te=H.cash+H.gcash;if(te>F.totalAmount&&F.totalAmount>0&&x.has(F.id)){const pe=F.totalAmount/te;return h+H.gcash*pe}return h+H.gcash},0),L=g+T,D=P+A,I=L+D,U=u.reduce((h,F)=>h+F.amount,0),M=U,B=I-M,_=()=>({orderCashTotal:g,orderGcashTotal:P,manualCashTotal:T,manualGcashTotal:A,totalCash:L,totalGcash:D,totalSales:I,transactions:w.map(h=>{const F=y(h),H=F.cash+F.gcash;let te=F.cash,pe=F.gcash,Je=H;if(H>h.totalAmount&&h.totalAmount>0&&x.has(h.id)){const ze=h.totalAmount/H;te=F.cash*ze,pe=F.gcash*ze,Je=h.totalAmount}return{ticket:h.ticket,customer:h.customer,cash:te,gcash:pe,total:Je}}),manualSales:c.map(h=>({cash:h.cashAmount,gcash:h.gcashAmount,total:h.totalAmount}))}),ie=()=>({totalExpenses:U,totalDisbursement:M,rows:[["Date/Month","id#","Type","Name","Category","Description","Amount"],...u.map(h=>[Pt(h),h.number,ne(h),h.name,h.category??"",h.description??"",h.amount]),[],["Total Disbursement","","","","","",M]]}),me=()=>({rows:[["Staff","Fold Count"],...f.map(h=>[h.staffName,h.folds]),[],["Total Folds",f.reduce((h,F)=>h+F.folds,0)]]}),_t=s.filter(h=>oe(X(h.createdAt),d));return{selection:d,selectedTypes:o,salesRows:_,disbursementRows:ie,foldCountRows:me,revolvingDailySummaryRows:()=>({rows:[["Date of Sales","Cash on Hand","Status","Date Update"],...c.map(h=>{const F=Dt(h.saleDate,e,a,h.cashAmount),H=h.status==="revolving"?"Revolving":h.status==="endorsed"?`Endorsed to ${h.endorsedTo??""}`:"Pending";return[h.saleDate,F,H,h.statusUpdatedAt?X(h.statusUpdatedAt):""]})]}),revolvingHistoryRows:()=>({rows:[["Date","Number","Name","Amount","Category","Description","Type"],..._t.map(h=>[X(h.createdAt),h.revolvingNumber,h.name,h.type==="disbursement"?-h.amount:h.amount,h.category,h.description??"",h.type==="add"?"Add Revolving Fund":"Disbursement"])]}),summaryRows:()=>{const h=_(),F=ie();return[["Summary",d.from,"to",d.to],[],["Total Cash:","Total GCash:","Total Sales:"],["","",""],[h.totalCash,h.totalGcash,h.totalSales],["","",""],["Total Disbursement:","Total Profit:","Cash on Hand:"],["","",""],[F.totalDisbursement,B,qe(h.totalCash,F.totalDisbursement)]]},profit:B}}function ln(e,t){return`<button class="nav-link ${t?"is-active":""}" data-tab="${e}" type="button">
    <span class="nav-icon">${dn(e)}</span>
    <span>${Ye[e]}</span>
  </button>`}function q(e,t){return`<div class="section-head"><div><h2>${p(e)}</h2><p class="meta">${p(t)}</p></div></div>`}function yt(){return Ye[l.tab]??"Dashboard"}function Ue(e){return(e?.name??"Laba101").trim().slice(0,1).toUpperCase()}function dn(e){return{dashboard:"DB",pos:"POS",orders:"PO",archived:"AR",customers:"CU",pricing:"PS",disbursements:"DR",reports:"RP",logs:"LG",inventory:"IN",maintenance:"MT",staff:"ST",revolving:"RV",settings:"SE"}[e]}async function Ft(){const e=await ue(),t=await Ea(e),n=await Ge(),a=await Ta(),s=await Ke(),r=await Na(),i=await Nt(),d=await Se(e),o=await Ra(),c=await xa(),u=await Fa(),m=await ja(),f=await $t(e),v=await Ja(e),$=await Ia(e),x=await Rt(e),w=await Ka(e),b=await Xa(),y=await ba(),g=await Tt("report_email");return{branch:e,staff:t,allStaff:n,customers:a,services:s,allServices:r,categories:i,orders:d,payments:o,foldLogs:c,expenses:u,sales:m,machines:f,subcleanings:v,activityLogs:$,inventoryItems:x,inventoryMovements:w,revolvingHistory:b,foldRate:y,reportEmail:g??""}}async function E(){if(!l.currentUser){un(),Pn();return}const e=await Ft();e.orders.filter(o=>o.status!=="claimed").length,e.orders.filter(o=>o.status==="ready").length,e.orders.reduce((o,c)=>o+c.paidAmount,0);const t=j(),n=It(e.payments,e.orders,o=>o.branch===e.branch&&X(o.receivedAt)===t),a=n.gcash+e.sales.filter(o=>o.saleDate===t).reduce((o,c)=>o+c.gcashAmount,0),s=n.cash+e.sales.filter(o=>o.saleDate===t).reduce((o,c)=>o+c.cashAmount,0),r=s+a,i=e.expenses.filter(o=>ne(o)==="daily"&&o.expenseDate===t).reduce((o,c)=>o+c.amount,0),d=qe(s,i);e.sales.reduce((o,c)=>o+c.totalAmount,0),e.expenses.reduce((o,c)=>o+c.amount,0),Ve.innerHTML=`
    <div class="app-frame">
      <header class="topbar">
        <div class="topbar-left">
          <img src="/laba101-logo.svg" alt="Laba101" class="topbar-logo" />
          <div>
            <p class="eyebrow">Offline mobile system</p>
            <h1>${p(yt())}</h1>
          </div>
        </div>
        <div class="topbar-actions">
          <div class="branch-pill"><span>Branch</span><strong>${p(e.branch)}</strong></div>
          <button class="icon-button" type="button" aria-label="Notifications">!</button>
          <button class="profile-pill" type="button">
            <span>${Ue(l.currentUser)}</span>
            <strong>${p(l.currentUser.name)}</strong>
          </button>
        </div>
      </header>

      <button class="sidebar-backdrop ${l.sidebarOpen?"is-open":""}" id="sidebar-backdrop" type="button" aria-label="Close navigation"></button>

      <aside class="sidebar ${l.sidebarOpen?"is-open":""}">
        <div class="sidebar-mobile-head">
          <img src="/laba101-logo.svg" alt="Laba101" />
          <button class="sidebar-close" id="sidebar-close-button" type="button" aria-label="Close navigation">X</button>
        </div>
        <nav>${kt().map(o=>ln(o,l.tab===o)).join("")}</nav>
        <div class="sidebar-fill">
          <div class="sidebar-branch-badge">
            <span>Active Branch</span>
            <strong>${p(e.branch)}</strong>
          </div>
          <p class="sidebar-app-name">Laba101 POS</p>
        </div>
        <div class="sidebar-user">
          <span class="avatar">${Ue(l.currentUser)}</span>
          <div>
            <strong>${p(l.currentUser.name)}</strong>
            <small>${p(l.currentUser.email)} / ${p(l.currentUser.role)}</small>
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
            <h2>${p(yt())}</h2>
          </div>
          <div class="navbar-time">
            <strong data-navbar-time>--:--</strong>
            <span data-navbar-date>Loading...</span>
          </div>
          <button class="mobile-avatar" type="button">${Ue(l.currentUser)}</button>
        </header>

        ${l.tab==="dashboard"?pn({paidToday:r,cashPaidToday:s,gcashPaidToday:a,disbursementToday:i,cashOnHandToday:d,orders:e.orders,payments:e.payments,sales:e.sales}):""}
        ${l.tab==="pos"?vn(e.orders,e.customers,e.services,e.categories,e.payments,e.branch):""}
        ${l.tab==="orders"?fn(e.orders,e.staff,e.services,e.payments):""}
        ${l.tab==="archived"?hn(e.orders,e.staff,e.services,e.payments):""}
        ${l.tab==="customers"?wn(e.customers,e.orders):""}
        ${l.tab==="pricing"?Nn(e.allServices,e.categories):""}
        ${l.tab==="disbursements"?An(e.expenses,e.sales):""}
        ${l.tab==="reports"?Ln(e.orders,e.payments,e.sales,e.expenses,e.revolvingHistory,e.allStaff,e.foldRate):""}
        ${l.tab==="logs"?Cn(e.activityLogs):""}
        ${l.tab==="inventory"?$n(e.inventoryItems,e.inventoryMovements,e.branch):""}
        ${l.tab==="maintenance"?Rn(e.machines,e.subcleanings,e.branch):""}
        ${l.tab==="staff"?On(e.allStaff,e.branch):""}
        ${l.tab==="revolving"?Gn(e.sales,e.revolvingHistory,e.orders,e.expenses):""}
        ${l.tab==="settings"?Dn(e.branch,e.foldRate,e.reportEmail):""}
      </main>
    </div>
  `,xn(),qn(e),Fn(e.allServices),kn(e.expenses),Un(e.orders,e.payments,e.sales,e.expenses,e.revolvingHistory,e.allStaff,e.foldRate),Mn(),Bn(),_n(),jn(e.inventoryItems,e.branch),Hn(e.allStaff),Kn(),Wn(),In()}function kt(){if(l.currentUser?.role==="admin")return Object.keys(Ye);const e=["dashboard","pos","orders","archived","disbursements","reports","maintenance","revolving"];return sn(l.currentUser)?["dashboard","disbursements","reports","maintenance","revolving"]:rn(l.currentUser)?e.filter(t=>t!=="revolving"):e}function un(){Ve.innerHTML=`
    <main class="login-page">

      <section class="login-panel-wrap">
        <article class="login-panel">
          <header>
            <div class="login-mark"><img src="/laba101-logo.svg" alt="Laba101" /></div>
            <h2>Welcome back</h2>
            <p>Sign in to continue managing today&apos;s laundry operations.</p>
          </header>
          ${l.loginError?`<div class="alert">${p(l.loginError)}</div>`:""}
          <form id="login-form" class="form">
            <label>Email address<input name="email" type="email" autocomplete="username" placeholder="admin@laba101.test or staff@laba101.gensan" required /></label>
            <label>Password<input name="password" type="password" autocomplete="current-password" placeholder="password" required /></label>
            <label class="remember"><input name="remember" type="checkbox" value="1" /> Remember me on this device</label>
            <button class="primary" id="login-button" type="submit">Sign in</button>
          </form>
        </article>
      </section>
    </main>
  `}function mn(){document.querySelectorAll("[data-fill-email]").forEach(e=>{e.addEventListener("click",()=>{const t=document.querySelector('input[name="email"]'),n=document.querySelector('input[name="password"]');t&&(t.value=e.dataset.fillEmail??""),n&&(n.value=e.dataset.fillPassword??"")})})}function pn(e){const t=new Date,n=Array.from({length:7},(i,d)=>{const o=new Date(t);return o.setDate(t.getDate()-(6-d)),new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric"}).format(o)}),a=Array.from({length:7},(i,d)=>{const o=new Date(t);o.setDate(t.getDate()-(6-d));const c=le(o),u=It(e.payments,e.orders,f=>X(f.receivedAt)===c).total,m=e.sales.filter(f=>f.saleDate===c).reduce((f,v)=>f+v.totalAmount,0);return u+m}),s=Math.max(1,...a),r=210;return`
    <section class="dashboard-main">
      <article class="panel revenue-panel">
        ${q("Revenue overview","Paid amount for the last 7 days.")}
        <button class="secondary dashboard-print-button" type="button" data-open-daily-summary>Print Daily Summary</button>
        <div class="stats compact dashboard-stats">
          <div class="stat paid-today-stat">
            <span class="card-label">Paid Today</span>
            <div class="value">${S(e.paidToday)}</div>
            <div class="stat-breakdown"><span>Cash ${S(e.cashPaidToday)}</span><span>GCash ${S(e.gcashPaidToday)}</span></div>
          </div>
          <div class="stat"><span class="card-label">Disbursement</span><div class="value">${S(e.disbursementToday)}</div></div>
          <div class="stat"><span class="card-label">Cash on Hand</span><div class="value">${S(e.cashOnHandToday)}</div></div>
        </div>
        <div class="chart-shell">
          <div class="mini-chart revenue-chart">
            ${a.map((i,d)=>{const o=Math.max(12,Math.round(i/s*r));return`<div class="chart-bar ${d===a.length-1?"is-today":""}"><span style="height:${o}px"></span><strong>${S(i)}</strong></div>`}).join("")}
          </div>
          <div class="chart-days">${n.map(i=>`<span>${p(i)}</span>`).join("")}</div>
        </div>
        <div class="chart-footnote">Values include POS payments and Daily Report sales input.</div>
      </article>
      ${l.dashboardSummaryModalOpen?yn(e):""}
    </section>
  `}function yn(e){return`
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal dashboard-summary-modal" role="dialog" aria-modal="true" aria-labelledby="daily-summary-title">
        <div class="modal-actions">
          <button class="primary" type="button" data-print-modal>Print</button>
          <button class="secondary" type="button" data-close-daily-summary>Close</button>
        </div>
        <div class="receipt dashboard-summary-slip">
          <h3 id="daily-summary-title">Laba101 Daily Summary</h3>
          <p>${p(le())}</p>
          <div><span>Paid today:</span><strong>${S(e.paidToday)}</strong></div>
          <div><span>Cash:</span><strong>${S(e.cashPaidToday)}</strong></div>
          <div><span>GCash:</span><strong>${S(e.gcashPaidToday)}</strong></div>
          <div><span>Disbursement:</span><strong>${S(e.disbursementToday)}</strong></div>
          <div><span>Cash-on hand:</span><strong>${S(e.cashOnHandToday)}</strong></div>
          <div class="signature-row"><span>Name of receiver and signature</span></div>
        </div>
      </div>
    </div>
  `}function vn(e,t,n,a,s,r){const i=n.filter(c=>c.serviceType==="order"&&c.isActive),d=n.filter(c=>c.serviceType==="addon"&&c.isActive),o=l.receiptOrderId?e.find(c=>c.id===l.receiptOrderId):null;return`
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
            ${i.map(c=>`<div class="qty-card service-option service-quantity" data-qty-card="serviceQty-${c.id}">
              <span>
                <strong>${p(c.name)}</strong>
                <small>${p(c.description??c.category)} ${c.maxKg?` / max ${c.maxKg}kg`:""}</small>
              </span>
              <b>${S(c.price)}</b>
              <div class="qty-control">
                <button type="button" data-qty-minus="serviceQty-${c.id}" aria-label="Decrease ${p(c.name)}">-</button>
                <input type="number" name="serviceQty-${c.id}" min="0" step="1" value="0" inputmode="numeric" />
                <button type="button" data-qty-plus="serviceQty-${c.id}" aria-label="Increase ${p(c.name)}">+</button>
              </div>
            </div>`).join("")}
          </fieldset>

          <fieldset class="check-grid">
            <legend>Extra services</legend>
            ${d.length?d.map(c=>`<div class="qty-card addon-quantity" data-qty-card="addonQty-${c.id}">
              <span><strong>${p(ae(c.name))}</strong><small>${S(c.price)} each</small></span>
              <div class="qty-control">
                <button type="button" data-qty-minus="addonQty-${c.id}" aria-label="Decrease ${p(ae(c.name))}">-</button>
                <input type="number" name="addonQty-${c.id}" min="0" step="1" value="0" inputmode="numeric" />
                <button type="button" data-qty-plus="addonQty-${c.id}" aria-label="Increase ${p(ae(c.name))}">+</button>
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

      ${o?Qe(o,s.filter(c=>c.orderId===o.id)):""}
    </section>
  `}function fn(e,t,n,a){const s=l.receiptOrderId?e.find(v=>v.id===l.receiptOrderId):null,r=e.filter(v=>v.status!=="claimed"),i=l.orderSearch.trim().toLowerCase(),d=l.orderDateFilter.trim(),o=l.orderPaymentFilter.trim().toLowerCase(),c=r.filter(v=>{const $=!i||[v.ticket,v.customer,v.phone,v.service,v.itemCategory,v.status].some(b=>String(b??"").toLowerCase().includes(i)),x=!d||X(v.createdAt)===d,w=!o||xe(v)===o;return $&&x&&w}),m=c.filter(v=>["unpaid","partial"].includes(xe(v))).reduce((v,$)=>v+Math.max(0,Number($.balance||0)),0),f=c.length;return`
    <section class="grid content full">
      <article class="panel span-2">
        ${q("Order queue","Workflow, payment, and receipts")}
        <form class="queue-filters" id="order-queue-filters">
          <label>
            <span>Search queue</span>
            <input name="orderSearch" type="search" placeholder="Ticket, name, service, status" value="${p(l.orderSearch)}" autocomplete="off" />
          </label>
          <label>
            <span>Filter date</span>
            <input name="orderDateFilter" type="date" value="${p(l.orderDateFilter)}" />
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
              ${c.map(v=>Ut(v,t,n)).join("")||'<tr><td colspan="5" class="table-empty">No matching orders.</td></tr>'}
            </tbody>
          </table>
        </div>
        <div class="summary-list queue-summary">
          <div><span>Total transactions</span><strong>${f}</strong></div>
          <div><span>Total unpaid amount</span><strong>${S(m)}</strong></div>
        </div>
      </article>
      ${s?Qe(s,a.filter(v=>v.orderId===s.id)):""}
      ${l.paymentModalOrderId?gn(e.find(v=>v.id===l.paymentModalOrderId)):""}
    </section>
  `}function hn(e,t,n,a){const s=e.filter(o=>o.status==="claimed"),r=l.archivedOrderSearch.trim().toLowerCase(),i=s.filter(o=>r?[o.ticket,o.customer,o.phone,o.service,o.itemCategory].some(c=>String(c??"").toLowerCase().includes(r)):!0),d=l.receiptOrderId?e.find(o=>o.id===l.receiptOrderId):null;return`
    <section class="grid content full">
      <article class="panel span-2">
        ${q("Archived orders","All claimed orders are listed here")}
        <form class="queue-filters" id="archived-order-filters">
          <label>
            <span>Search archived</span>
            <input name="archivedOrderSearch" type="search" placeholder="Ticket, name, service" value="${p(l.archivedOrderSearch)}" autocomplete="off" />
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
              <tr><th>Ticket</th><th>Customer</th><th>Service</th><th>Total Payment</th><th>Staff Actions</th><th>Actions</th></tr>
            </thead>
            <tbody>
              ${i.map(o=>Ut(o,t,n,!0)).join("")||'<tr><td colspan="6" class="table-empty">No archived orders found.</td></tr>'}
            </tbody>
          </table>
        </div>
      </article>
      ${d?Qe(d,a.filter(o=>o.orderId===d.id)):""}
    </section>
  `}function Ut(e,t,n,a=!1){const s=At(e,n),r=e.workflowCompleted.includes("claimed"),i=s.find(x=>!e.workflowCompleted.includes(x.key)),d=i?.key==="fold",o=xe(e),c=o==="unpaid"?"pending":o,u=e.extras.length?e.extras.map(x=>`${p(ae(x.name))} x${Number(x.quantity??1)}`).join(", "):"",m=l.currentUser?.role==="admin",f=e.status!=="claimed"&&e.paidAmount<=0,v=e.status!=="claimed"&&m&&e.paidAmount>0;let $=1;if(e.serviceLines){let x=0;e.serviceLines.forEach(w=>{const b=n.find(y=>y.id===w.id);b&&Array.isArray(b.includes)&&b.includes.includes("Fold")&&(x+=w.quantity)}),x>0&&($=x)}return`
    <tr class="order-row-main">
      <td><strong>${p(e.ticket)}</strong><div class="small">${p(ye(e.createdAt))}</div></td>
      <td>${p(e.customer)}<div class="small">${p(e.phone??"")}</div></td>
      <td>${p(e.service)}${u?`<div class="small">Extras: ${u}</div>`:""}</td>
      <td class="amount-cell payment-cell status-${o}"><strong>${S(e.totalAmount)}</strong><div class="payment-status">${p(c)}${o==="paid"?"":` &middot; Bal: ${S(e.balance)}`}</div></td>
      ${a?`<td>
        <div class="small">Folded by: ${p(e.foldedByName??"N/A")}</div>
        <div class="small">Released by: ${p(e.releasedByName??"N/A")}</div>
      </td>`:""}
      <td>
      <div class="row-actions">
        ${i?.key==="fold"?`<form class="inline-form advance-form flex-wrap" data-order-id="${e.id}">
          ${d?Array.from({length:$}).map((x,w)=>`<select name="assignedStaffId" required>
            <option value="">-- Staff ${$>1?`(Fold ${w+1})`:""}--</option>
            ${t.map(b=>`<option value="${b.id}">${p(b.name)}</option>`).join("")}
          </select>`).join(""):""}
          <button class="secondary" type="submit">Fold</button>
        </form>`:i?.key==="claimed"&&!r?`<form class="inline-form advance-form" data-order-id="${e.id}" data-action="claim" data-balance="${e.balance}">
          <select name="releasedBy" required>
            <option value="">-- Released by --</option>
            ${t.map(x=>`<option value="${x.id}">${p(x.name)}</option>`).join("")}
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
        ${f?`<button class="secondary btn-sm" type="button" data-cancel-order="${e.id}">Cancel</button>`:""}
        ${v?`<button class="secondary btn-sm" type="button" data-delete-order="${e.id}">Delete</button>`:""}
        <button class="secondary btn-sm" data-receipt="${e.id}">Receipt</button>
      </div>
      </td>
    </tr>
  `}function gn(e){return e?`
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="payment-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-close-payment-modal>Close</button>
        </div>
        <div class="receipt" style="border: 1px solid var(--line); border-style: solid; box-shadow: none;">
          <h3 id="payment-title" style="margin-top:0">Payment Required</h3>
          <p>Please settle the remaining balance of <strong>${S(e.balance)}</strong> for ticket <strong>${p(e.ticket)}</strong> before claiming.</p>
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
  `:""}function Qe(e,t){const n=t.reduce((i,d)=>i+Number(d.amount),0),a=Math.max(0,Number((n-e.totalAmount).toFixed(2))),s=xe(e),r=s.charAt(0).toUpperCase()+s.slice(1);return`
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="receipt-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-open-printer-panel>Printer</button>
          <button class="primary" type="button" data-thermal-print>${l.printerLoading?"Printing...":"Print Receipt"}</button>
          <button class="secondary" type="button" data-close-receipt>Close</button>
        </div>
        ${l.printerPanelOpen?bn():""}
        <div class="receipt" id="receipt-print-area">
          <div class="receipt-head">
            <h3 id="receipt-title">Laba101</h3>
            <p>${p(e.ticket)}<br>${p(ye(e.createdAt))}</p>
          </div>
          ${l.currentUser?`<p class="receipt-staff">Staff: ${p(l.currentUser.name)}</p>`:""}
          <div class="receipt-customer">
            <strong>${p(e.customer)}</strong>
            <span>${p(e.phone??"No phone")}</span>
          </div>
          <div class="summary-list receipt-lines">
            <div><span>Service</span><strong>${p(e.service)}</strong></div>
            ${e.extras.length?`<div><span>Extra services</span><strong>${e.extras.map(i=>`${p(ae(i.name))} x${Number(i.quantity??1)} (${S(Number(i.total??i.price))})`).join(", ")}</strong></div>`:""}
            <div><span>Total</span><strong>${S(e.totalAmount)}</strong></div>
            <div><span>Tendered</span><strong>${S(n)}</strong></div>
            <div><span>Paid</span><strong>${S(e.paidAmount)}</strong></div>
            <div><span>Payment status</span><strong>${r}</strong></div>
            <div><span>Change</span><strong>${S(a)}</strong></div>
            <div><span>Balance</span><strong>${S(e.balance)}</strong></div>
          </div>
          <h3>Payments</h3>
          <div class="receipt-payments">
            ${t.map(i=>`<div><span>${p(i.method.toUpperCase())}</span><strong>${S(i.amount)}</strong>${i.reference?`<small>Ref ${p(i.reference)}</small>`:""}</div>`).join("")||'<p class="helper">No payments yet.</p>'}
          </div>
        </div>
      </div>
    </div>
  `}function bn(){return`
    <div class="printer-panel">
      <div class="printer-panel-head">
        <strong>Bluetooth thermal printer</strong>
        <button class="secondary" type="button" data-refresh-printers>${l.printerLoading?"Scanning...":"Scan paired"}</button>
      </div>
      <div class="printer-fields">
        <label>Printer
          <select data-printer-select>
            <option value="">Select paired printer</option>
            ${l.pairedPrinters.map(e=>`<option value="${p(e.address)}" ${l.selectedPrinterAddress===e.address?"selected":""}>${p(e.name)} - ${p(e.address)}</option>`).join("")}
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
      ${l.printerStatus?`<p class="printer-status ok">${p(l.printerStatus)}</p>`:""}
      ${l.printerError?`<p class="printer-status warn">${p(l.printerError)}</p>`:""}
    </div>
  `}async function vt(){l.printerLoading=!0,l.printerError="",l.printerStatus="",await E();try{if(!(await Ee.requestBluetoothPermissions()).granted)throw new Error("Bluetooth permission was not granted.");const t=await Ee.listPairedPrinters();l.pairedPrinters=t.printers??[],l.selectedPrinterAddress=l.selectedPrinterAddress||t.savedAddress||l.pairedPrinters[0]?.address||"",l.printerStatus=l.pairedPrinters.length?"Select a printer, then connect.":"No paired printers found. Pair the printer in Android Bluetooth settings first."}catch(e){l.printerError=e instanceof Error?e.message:"Could not scan paired printers."}finally{l.printerLoading=!1,await E()}}async function En(){if(!l.selectedPrinterAddress){l.printerError="Select a paired printer first.",await E();return}l.printerLoading=!0,l.printerError="",l.printerStatus="",await E();try{await Ee.savePrinter({address:l.selectedPrinterAddress}),await Ee.connect({address:l.selectedPrinterAddress}),l.printerStatus="Printer connected and saved."}catch(e){l.printerError=e instanceof Error?e.message:"Printer connection failed."}finally{l.printerLoading=!1,await E()}}function Sn(e){const t=(e.serviceLines?.length?e.serviceLines:[{id:e.serviceId,name:e.service,price:e.price,quantity:1,total:e.price}]).map(a=>({name:a.name,quantity:Number(a.quantity||1),price:Number(a.price||0)})),n=e.extras.map(a=>({name:ae(a.name),quantity:Number(a.quantity??1),price:Number(a.price||0)}));return[...t,...n]}async function Tn(e,t){const n=t.reduce((s,r)=>s+Number(r.amount),0),a=Math.max(0,Number((n-e.totalAmount).toFixed(2)));l.printerLoading=!0,l.printerError="",l.printerStatus="",await E();try{if(!l.selectedPrinterAddress){const s=await Ee.getSavedPrinter();l.selectedPrinterAddress=s.address||""}await Ee.printReceipt({address:l.selectedPrinterAddress||void 0,paperWidth:l.printerPaperWidth,storeName:"Laba101",receiptNumber:e.ticket,dateTime:ye(e.createdAt),customerName:e.customer,customerPhone:e.phone?.trim()||"No phone",items:Sn(e),totalAmount:e.totalAmount,paidAmount:e.paidAmount,changeAmount:a,balanceAmount:e.balance,staffName:l.currentUser?.name?.trim()||"Staff"}),l.printerStatus="Receipt sent to printer."}catch(s){l.printerPanelOpen=!0,l.printerError=s instanceof Error?s.message:"Bluetooth thermal print failed."}finally{l.printerLoading=!1,await E()}}function wn(e,t){const n=l.customerSearch.trim().toLowerCase(),a=e.filter(s=>n?s.name.toLowerCase().includes(n):!1);return`
    <section class="grid content full">
      <article class="panel">
        ${q("Customer Management","Customer records from local offline storage")}
        <form class="search-box" id="customer-search-form">
          <label>
            <span>Search customer name</span>
            <input name="customerSearch" data-customer-search type="search" placeholder="Type the customer name then tap Search" value="${p(l.customerSearch)}" autocomplete="off" />
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
                    <strong>${p(s.name)}</strong>
                    <p>${p(s.phone??"No phone")} · ${p(s.address??"No address")}</p>
                  </div>
                  <span>${r.length} order(s)</span>
                </header>
                <div class="customer-orders">
                  ${r.length?r.map(i=>`
                    <div class="customer-order-row">
                      <div>
                        <strong>${p(i.ticket)}</strong>
                        <span>${p(i.service)} · ${p(i.itemCategory)}</span>
                      </div>
                      <div>
                        <strong>${S(i.totalAmount)}</strong>
                        <span>${p(i.status)}</span>
                      </div>
                    </div>`).join(""):'<p class="helper">No order records yet.</p>'}
                </div>
              </article>`}).join(""):'<div class="helper">Search a customer name to display matching records and their order history.</div>'}
        </div>
      </article>
    </section>
  `}function Nn(e,t){const n=e.filter(s=>s.serviceType==="order"),a=e.filter(s=>s.serviceType==="addon");return`
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
            ${en.map(s=>`<label class="check"><input type="checkbox" name="includes" value="${s}" /> ${s}</label>`).join("")}
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
            ${n.map(s=>`<div class="table-row"><div><strong>${p(s.name)}</strong></div><div>${p(s.category)}</div><div>${S(s.price)}</div><div>${s.maxKg} kg</div><div>${p(s.includes.join(", ")||"none")}</div><div>${s.isActive?"Active":"Inactive"}</div><div class="row-actions"><button class="secondary edit-service-btn" data-id="${s.id}">Edit</button>${s.isActive?`<button class="secondary deactivate-service-btn" data-id="${s.id}">Deactivate</button>`:`<button class="secondary activate-service-btn" data-id="${s.id}">Activate</button>`}</div></div>`).join("")||'<div class="helper">No order services yet.</div>'}
          </div>
        </div>
        <div class="section-divider"></div>
        ${q("Extra Services Table","Add-on services")}
        <div class="table-scroll">
          <div class="table data-table extra-services-table">
            <div class="table-head"><div>Name</div><div>Category</div><div>Price</div><div>Includes</div><div>Status</div><div>Actions</div></div>
            ${a.map(s=>`<div class="table-row"><div><strong>${p(s.name)}</strong></div><div>${p(s.category)}</div><div>${S(s.price)}</div><div>${p(s.includes.join(", ")||"none")}</div><div>${s.isActive?"Active":"Inactive"}</div><div class="row-actions"><button class="secondary edit-service-btn" data-id="${s.id}">Edit</button>${s.isActive?`<button class="secondary deactivate-service-btn" data-id="${s.id}">Deactivate</button>`:`<button class="secondary activate-service-btn" data-id="${s.id}">Activate</button>`}</div></div>`).join("")||'<div class="helper">No extra services yet.</div>'}
          </div>
        </div>
      </article>
    </section>
  `}function An(e,t){const n=j(),a=n.slice(0,7),s=l.currentUser?.role==="admin",r=Array.from(new Set([...tn,...e.map(m=>m.category).filter(Boolean)])),i=e.filter(m=>ne(m)==="daily"&&m.expenseDate===n).reduce((m,f)=>m+f.amount,0),d=e.filter(m=>ne(m)==="monthly"&&m.expenseDate.startsWith(a)).reduce((m,f)=>m+f.amount,0),o=t.filter(m=>m.saleDate===n).reduce((m,f)=>m+f.totalAmount,0),c=t.filter(m=>m.saleDate.startsWith(a)).reduce((m,f)=>m+f.totalAmount,0),u=[...e].sort((m,f)=>pt(f.number)-pt(m.number)||f.id-m.id);return`
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
      <div class="panel stat"><div class="card-label">Daily disbursement</div><div class="value">${S(i)}</div></div>
      <div class="panel stat"><div class="card-label">Monthly disbursement</div><div class="value">${S(d)}</div></div>
      <div class="panel stat"><div class="card-label">Today sales input</div><div class="value">${S(o)}</div></div>
      <div class="panel stat"><div class="card-label">Month sales input</div><div class="value">${S(c)}</div></div>
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
            <label class="expense-month-field" hidden>Month<input name="expenseMonth" type="month" value="${je()}" /></label>
            <label>Amount<input name="amount" type="number" min="0" step="0.01" required placeholder="0.00" /></label>
          </div>
          <div class="form-row"><label>Title / Name<input name="name" required /></label><label>Category<select name="category" required>${r.map(m=>`<option value="${p(m)}">${p(m)}</option>`).join("")}</select></label></div>
          <label>Description<textarea name="description"></textarea></label>
          <button class="primary" type="submit">Save expense</button>
        </form>
      </article>
      <article class="panel">
        ${q("Disbursement list","Expenses only")}
        ${ee(["Date/Month","No.","Type","Name","Category","Amount","Action"],u.map(m=>[`<strong>${p(Pt(m))}</strong>`,p(m.number),p(ne(m)),p(m.name),p(m.category),S(m.amount),`<div class="row-actions"><button class="secondary edit-expense-btn" data-id="${m.id}" type="button">Edit</button>${s?`<button class="secondary delete-expense-btn" data-id="${m.id}" type="button">Delete</button>`:""}</div>`]),"data-table orders-data-table app-record-table disbursement-list-table")}
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
            ${t.map(m=>`<div class="table-row"><div>${p(m.saleNumber)}</div><div>${p(m.saleDate)}</div><div>${S(m.cashAmount)}</div><div>${S(m.gcashAmount)}</div><div><strong>${S(m.totalAmount)}</strong></div><div class="row-actions"><button class="secondary edit-sale-btn" data-id="${m.id}" type="button">Edit</button>${s?`<button class="secondary delete-sale-btn" data-id="${m.id}" type="button">Delete</button>`:""}</div></div>`).join("")||'<div class="helper">No daily sales totals yet.</div>'}
          </div>
        </div>
      </article>
    </section>
    `}
  `}function Ln(e,t,n,a,s,r,i,d,o,c){const u=l.reportPreview?qt(e,t,n,a,s,r,i,l.reportPreview):null;return`
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
            <div style="overflow-x: auto; width: 100%; -webkit-overflow-scrolling: touch;">
              <table class="data-table orders-data-table bordered-table">
                <thead>
                  <tr><th>Ticket</th><th>Customer</th><th>Cash</th><th>GCash</th><th>Total Payment</th></tr>
                </thead>
                <tbody>
                  ${u.salesRows().transactions.map(m=>`<tr><td>${p(m.ticket)}</td><td>${p(m.customer)}</td><td>${S(m.cash)}</td><td>${S(m.gcash)}</td><td><strong>${S(m.total)}</strong></td></tr>`).join("")||'<tr><td colspan="5" class="table-empty">No sales records found.</td></tr>'}
                </tbody>
              </table>
            </div>
            <div class="sales-summary-section" style="margin-top: 16px;">
              <h3>Sales Summary</h3>
              <div style="overflow-x: auto; width: 100%; -webkit-overflow-scrolling: touch; margin-top: 16px;">
                <table class="data-table orders-data-table bordered-table">
                  <thead>
                    <tr><th>Sales Type</th><th>Cash</th><th>GCash</th><th>Sales</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Orders</td><td>${S(u.salesRows().orderCashTotal)}</td><td>${S(u.salesRows().orderGcashTotal)}</td><td>${S(u.salesRows().orderCashTotal+u.salesRows().orderGcashTotal)}</td></tr>
                    <tr><td>Whole Sale Day</td><td>${S(u.salesRows().manualCashTotal)}</td><td>${S(u.salesRows().manualGcashTotal)}</td><td>${S(u.salesRows().manualCashTotal+u.salesRows().manualGcashTotal)}</td></tr>
                    <tr style="font-weight: bold; background: #f8fafc;"><td>Total</td><td>${S(u.salesRows().totalCash)}</td><td>${S(u.salesRows().totalGcash)}</td><td>${S(u.salesRows().totalSales)}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </article>`:""}
        ${u.selectedTypes.has("disbursement")?`
          <article>
            ${q("Disbursement preview",`${u.selection.from} to ${u.selection.to}`)}
            <div style="overflow-x: auto; width: 100%; -webkit-overflow-scrolling: touch;">
              <table class="data-table orders-data-table bordered-table">
                <thead>
                  <tr><th>ID#</th><th>Date/Month</th><th>Type</th><th>Name</th><th>Category</th><th>Amount</th></tr>
                </thead>
                <tbody>
                  ${u.disbursementRows().rows.slice(1).filter(m=>m.length&&m[0]!=="Total Disbursement").map(m=>`<tr><td>${p(String(m[1]??""))}</td><td>${p(String(m[0]??""))}</td><td>${p(String(m[2]??""))}</td><td>${p(String(m[3]??""))}</td><td>${p(String(m[4]??""))}</td><td><strong>${S(m[6])}</strong></td></tr>`).join("")||'<tr><td colspan="6" class="table-empty">No disbursements found.</td></tr>'}
                </tbody>
              </table>
            </div>
            <div class="disbursement-total" style="margin-top: 16px;">
              <strong>Total Disbursement: ${S(u.disbursementRows().totalDisbursement)}</strong>
            </div>
          </article>`:""}
        ${u.selectedTypes.has("fold_count")?`
          <article>
            ${q("Fold Count preview",`${u.selection.from} to ${u.selection.to}`)}
            <div style="overflow-x: auto; width: 100%; -webkit-overflow-scrolling: touch;">
              <table class="data-table orders-data-table bordered-table">
                <thead>
                  <tr><th>Staff</th><th>Fold Count</th></tr>
                </thead>
                <tbody>
                  ${u.foldCountRows().rows.slice(1).map(m=>`<tr>${m.map(f=>`<td>${p(String(f??""))}</td>`).join("")}</tr>`).join("")||'<tr><td colspan="2" class="table-empty">No fold records found.</td></tr>'}
                </tbody>
              </table>
            </div>
          </article>`:""}
        ${u.selectedTypes.has("revolving_fund")?`
          <article>
            ${q("Revolving Fund — Daily Summary",`${u.selection.from} to ${u.selection.to}`)}
            ${ee(["Date of Sales","Cash on Hand","Status","Date Update"],u.revolvingDailySummaryRows().rows.slice(1).map(m=>[p(String(m[0]??"")),p(String(m[1]??"")),p(String(m[2]??"")),p(String(m[3]??""))]),"data-table orders-data-table bordered-table")}
          </article>
          <article>
            ${q("Revolving Fund — Table History",`${u.selection.from} to ${u.selection.to}`)}
            ${ee(["Date","Number","Name","Amount","Category","Description","Type"],u.revolvingHistoryRows().rows.slice(1).map(m=>[p(String(m[0]??"")),p(String(m[1]??"")),p(String(m[2]??"")),p(String(m[3]??"")),p(String(m[4]??"")),p(String(m[5]??"")),p(String(m[6]??""))]),"data-table orders-data-table bordered-table")}
          </article>`:""}
        ${u.selectedTypes.has("summary")?`
          <article>
            ${q("Summary preview",`${u.selection.from} to ${u.selection.to}`)}
            <div class="summary-cards-grid summary-single-row">
              <div class="summary-card"><span class="card-label">Total Sales</span><div class="card-details"><span>Total Cash: ${S(u.salesRows().totalCash)}</span><span>Total GCash: ${S(u.salesRows().totalGcash)}</span></div><strong>${S(u.salesRows().totalSales)}</strong></div>
              <div class="summary-card"><span class="card-label">Total Disbursement</span><strong>${S(u.disbursementRows().totalDisbursement)}</strong></div>
              <div class="summary-card"><span class="card-label">Cash on Hand</span><strong>${S(qe(u.salesRows().totalCash,u.disbursementRows().totalDisbursement))}</strong></div>
            </div>
          </article>`:""}
      </section>
    `:""}
  `}function Cn(e){return`
    <section class="grid content full">
      <article class="panel span-2">
        ${q("Activity Logs","Recorded staff actions and timestamps")}
        ${ee(["Timestamp","Staff","Action","Details"],e.map(t=>[Pe(t.timestamp),p(t.staffName),`<strong>${p(t.action)}</strong>`,p(t.details)]),"data-table orders-data-table app-record-table logs-table")}
      </article>
    </section>
  `}function $n(e,t,n){return`
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
          <input name="branch" type="hidden" value="${p(n)}" />
          <button class="primary" type="submit">Save item</button>
        </form>
      </article>
      <article class="panel span-2">
        ${q("Stock List","Editable branch inventory")}
        ${ee(["Item","Qty","Unit","Reorder","Status","Updated","Action"],e.map(a=>[`<strong>${p(a.name)}</strong><div class="small">${p(a.notes??"")}</div>`,p(a.quantity),p(a.unit),p(a.reorderLevel),`<span class="${a.quantity<=a.reorderLevel?"warn":"ok"}">${a.quantity<=a.reorderLevel?"Low stock":"OK"}</span>`,Pe(a.updatedAt),`<button class="secondary edit-inventory-btn" type="button" data-id="${a.id}">Edit</button>`]),"data-table orders-data-table app-record-table inventory-stock-table")}
      </article>
      <article class="panel">
        ${q("Stock In / Stock Out","Adjust inventory quantities")}
        <form id="inventory-movement-form" class="form">
          <label>Item<select name="itemId" required>
            <option value="">Select item</option>
            ${e.map(a=>`<option value="${a.id}">${p(a.name)} (${a.quantity} ${p(a.unit)})</option>`).join("")}
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
        ${ee(["Date","Item","Type","Qty","Staff","Notes"],t.map(a=>[Pe(a.createdAt),p(a.itemName),`<span class="${a.movementType==="in"?"ok":"warn"}">${a.movementType==="in"?"Stock-in":"Stock-out"}</span>`,p(a.quantity),p(a.staffName),p(a.notes??"")]),"data-table orders-data-table app-record-table inventory-movement-table")}
      </article>
    </section>
  `}function Rn(e,t,n){const a=e.filter(u=>u.status!=="under_cleaning"),s=e.filter(u=>u.status==="under_cleaning"),r=new Date,i=new Date(r.getFullYear(),r.getMonth(),1);i.setDate(i.getDate()-i.getDay());const d=Array.from({length:35},(u,m)=>{const f=new Date(i);f.setDate(i.getDate()+m);const v=le(f),$=t.filter(x=>x.date===v);return{key:v,date:f,records:$,isCurrentMonth:f.getMonth()===r.getMonth(),isToday:v===j()}}),o=new Intl.DateTimeFormat("en-PH",{month:"long",year:"numeric"}).format(r),c=t.some(u=>u.date===j()&&u.cleaningType==="general");return`
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
            ${a.map(u=>`<label class="machine-card"><input type="checkbox" name="machineIds" value="${u.id}" /><span><strong>${p(u.machineName)}</strong><small>${p(u.machineType)}</small></span><em></em></label>`).join("")||'<p class="helper">All machines are currently being cleaned.</p>'}
          </fieldset>
          <input type="hidden" name="cleaningStatus" value="in_progress" />
          <input type="hidden" name="cleaningType" value="tube" />
          <label>Notes <textarea name="notes" placeholder="e.g. Deep clean filters"></textarea></label>
          <input type="hidden" name="branch" value="${p(n)}" />
          <button class="primary" type="submit">Start Tube Cleaning</button>
        </form>
      </article>
      <article class="panel">
        ${q("General Cleaning","Confirm general cleaning for today")}
        <div class="summary-list">
          <div><span>Today</span><strong>${c?"Confirmed":"Pending"}</strong></div>
        </div>
        <button class="primary" type="button" id="confirm-general-cleaning" ${c?"disabled":""}>Confirm General Cleaning</button>
      </article>
      <article class="panel warning-panel">
        ${q("Under Cleaning","Machines currently being serviced.")}
        <div class="machine-stack">
          ${s.length?s.map(u=>`
            <div class="machine-status">
              <span><strong>${p(u.machineName)}</strong><small>${p(u.machineType)}</small></span>
              <b>In progress</b>
              <button class="secondary complete-cleaning-btn" type="button" data-machine-id="${u.id}" data-branch="${p(n)}">Mark Complete</button>
            </div>`).join(""):'<p class="helper">No machines under cleaning right now.</p>'}
        </div>
      </article>
      <article class="panel span-2">
        ${q("Tube Cleaning Checklist","Track which machines have been cleaned today.")}
        ${ee(["Machine","Type","Status","Notes","Date"],e.map(u=>{const m=t.find(f=>f.machineIds.includes(u.id)&&f.date===j());return[`<strong>${p(u.machineName)}</strong>`,p(u.machineType),`<span class="${m?"ok":"warn"}">${m?p(m.cleaningStatus.replace("_"," ")):"Not Cleaned"}</span>`,p(m?.notes??"-"),j()]}),"data-table orders-data-table app-record-table tube-checklist-table")}
      </article>
      <article class="panel span-2">
        ${q("Cleaning Calendar",o)}
        <div class="maintenance-calendar">
          <div class="calendar-weekdays">${["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(u=>`<span>${u}</span>`).join("")}</div>
          <div class="calendar-grid">
            ${d.map(u=>{const m=u.records.filter(v=>v.cleaningType!=="general").length,f=u.records.some(v=>v.cleaningType==="general");return`<div class="calendar-day ${u.records.length?"has-records":""} ${u.isCurrentMonth?"":"is-muted"} ${u.isToday?"is-today":""}">
                <strong>${u.date.getDate()}</strong>
                <span>${f?"General":""}</span>
                <small>${m?`${m} tube`:"No tube"}</small>
              </div>`}).join("")}
          </div>
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
          <input type="hidden" name="branch" value="${p(n)}" />
          <button class="primary" type="submit">Add machine</button>
        </form>
      </article>
      <article class="panel">
        ${q("Machines","Washer and dryer status")}
        <div class="table">
          <div class="table-head"><div>Name</div><div>Type</div><div>Status</div><div>Branch</div><div>Actions</div></div>
          ${e.map(u=>`<div class="table-row"><div><strong>${p(u.machineName)}</strong></div><div>${p(u.machineType)}</div><div>${p(u.status.replace("_"," "))}</div><div>${p(u.branch)}</div>
          <div class="row-actions">
            ${u.status!=="inactive"?`<button class="secondary deactivate-machine-btn" data-id="${u.id}">Deactivate</button>`:`<button class="secondary activate-machine-btn" data-id="${u.id}">Activate</button>`}
          </div></div>`).join("")||'<div class="helper">No machines found.</div>'}
        </div>
      </article>
    </section>
    `}
  `}function On(e,t){return`
    <section class="grid">
      <div class="page-head">
        <div>
          <p class="eyebrow">Team Management</p>
          <h2>Staff Overview</h2>
        </div>
        <button class="primary" id="open-add-staff-modal" type="button">+ Add staff</button>
      </div>

      <article class="panel">
        ${q("Staff list","Branch: "+p(t))}
        <div class="table-scroll">
          <div class="table data-table">
            <div class="table-head"><div>Name</div><div>Email</div><div>Role</div><div>Branch</div><div>Status</div><div>Actions</div></div>
            ${e.length?e.map(n=>`<div class="table-row"><div><strong>${p(n.name)}</strong></div><div>${p(n.email)}</div><div>${p(n.role)}</div><div>${p(n.branch)}</div><div>${n.isActive!==0?"Active":"Inactive"}</div>
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
  `}function Dn(e,t,n){return`
    <section class="grid content full">
      <article class="panel">
        ${q("Settings","Device-local configuration")}
        <form id="settings-form" class="form">
          <label>Current branch<select name="branch">
            ${["Main Store","Mintal Branch","Gensan Branch"].map(a=>`<option value="${a}" ${a===e?"selected":""}>${a}</option>`).join("")}
          </select></label>
          <label>Report email<input name="reportEmail" type="email" placeholder="admin@laba101.test" value="${p(n)}" /></label>
          <button class="primary" type="submit">Save settings</button>
        </form>
      </article>
    </section>
  `}function xn(){const e=()=>{localStorage.removeItem(Te),l.currentUser=null,l.tab="dashboard",l.receiptOrderId=0,l.sidebarOpen=!1,E()};document.querySelector("#logout-button")?.addEventListener("click",e),document.querySelector("#mobile-logout-button")?.addEventListener("click",e),document.querySelector("#mobile-menu-button")?.addEventListener("click",()=>{l.sidebarOpen=!0,E()}),document.querySelector("#sidebar-close-button")?.addEventListener("click",()=>{l.sidebarOpen=!1,E()}),document.querySelector("#sidebar-backdrop")?.addEventListener("click",()=>{l.sidebarOpen=!1,E()}),document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{l.tab=t.dataset.tab,l.receiptOrderId=0,l.sidebarOpen=!1,E()})}),document.querySelectorAll("[data-quick-tab]").forEach(t=>{t.addEventListener("click",()=>{l.tab=t.dataset.quickTab,E()})}),document.querySelectorAll("[data-receipt]").forEach(t=>{t.addEventListener("click",()=>{l.receiptOrderId=Number(t.dataset.receipt),l.printerPanelOpen=!1,l.printerError="",l.printerStatus="",E()})}),document.querySelector("[data-close-receipt]")?.addEventListener("click",()=>{l.receiptOrderId=0,E()}),document.querySelector("[data-open-printer-panel]")?.addEventListener("click",()=>{l.printerPanelOpen=!l.printerPanelOpen,l.printerPanelOpen&&l.pairedPrinters.length===0?vt():E()}),document.querySelector("[data-refresh-printers]")?.addEventListener("click",()=>{vt()}),document.querySelector("[data-printer-select]")?.addEventListener("change",t=>{l.selectedPrinterAddress=t.currentTarget.value,E()}),document.querySelector("[data-paper-width]")?.addEventListener("change",t=>{l.printerPaperWidth=Number(t.currentTarget.value)===80?80:58,E()}),document.querySelector("[data-connect-printer]")?.addEventListener("click",()=>{En()}),document.querySelector("[data-thermal-print]")?.addEventListener("click",()=>{(async()=>{const t=await Ft(),n=t.orders.find(s=>s.id===l.receiptOrderId);if(!n)throw new Error("Receipt order not found.");const a=t.payments.filter(s=>s.orderId===n.id);await Tn(n,a)})().catch(t=>{l.printerPanelOpen=!0,l.printerError=t instanceof Error?t.message:"Bluetooth thermal print failed.",E()})}),document.querySelector("[data-open-daily-summary]")?.addEventListener("click",()=>{l.dashboardSummaryModalOpen=!0,E()}),document.querySelector("[data-close-daily-summary]")?.addEventListener("click",()=>{l.dashboardSummaryModalOpen=!1,E()}),document.querySelector("[data-print-modal]")?.addEventListener("click",()=>{window.print()}),document.querySelectorAll("[data-report-tab]").forEach(t=>{t.addEventListener("click",()=>{l.dailyReportTab=t.dataset.reportTab,E()})}),document.querySelectorAll("[data-maintenance-tab]").forEach(t=>{t.addEventListener("click",()=>{l.maintenanceTab=t.dataset.maintenanceTab,E()})})}function Pn(){mn(),document.querySelector("#login-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget),n=document.querySelector("#login-button");n&&(n.disabled=!0,n.textContent="Signing in...");try{const a=await wt(String(t.get("email")??""),String(t.get("password")??""));if(!a){l.loginError="Invalid email or password.",await E();return}l.currentUser=a,l.loginError="",await Le("branch",String(a.branch||"Main Store")),t.get("remember")?localStorage.setItem(Te,JSON.stringify({email:a.email,remembered:!0})):localStorage.removeItem(Te),kt().includes(l.tab)||(l.tab="dashboard"),await E()}catch(a){alert("Login Error: "+String(a?.message||a)),n&&(n.disabled=!1,n.textContent="Sign in")}})}function In(){Ne&&window.clearInterval(Ne);const e=document.querySelector("[data-navbar-time]"),t=document.querySelector("[data-navbar-date]");if(!e||!t){Ne=void 0;return}const n=()=>{const a=cn();e.textContent=a.time,t.textContent=a.date};n(),Ne=window.setInterval(n,1e3)}function ft(e,t){return e?t.find(n=>n.name.toLowerCase()===e.category.toLowerCase())??t.find(n=>n.name==="Regular Clothes")??t[0]??null:null}function Me(e,t){return Math.max(1,Number(t.maxKg||e.maxKg||1))}function Mt(e,t){return Object.fromEntries(t.filter(n=>n.serviceType==="order").map(n=>[n.id,Number(e.querySelector(`input[name="serviceQty-${n.id}"]`)?.value??0)]).filter(([,n])=>Number(n)>0))}function ht(e,t){const n=Mt(e,t);return t.filter(a=>a.serviceType==="order"&&Number(n[a.id]??0)>0).map(a=>({...a,quantity:Number(n[a.id])}))}function Bt(e,t){return Object.fromEntries(t.filter(n=>n.serviceType==="addon").map(n=>[n.id,Number(e.querySelector(`input[name="addonQty-${n.id}"]`)?.value??0)]).filter(([,n])=>Number(n)>0))}function gt(e,t){const n=Bt(e,t);return t.filter(a=>a.serviceType==="addon"&&Number(n[a.id]??0)>0).map(a=>({...a,quantity:Number(n[a.id])}))}function qn(e){const t=document.querySelector("#order-form"),n=document.querySelector("#price-preview"),a=t?.querySelector('button[type="submit"]'),s=document.querySelector("#customer-name-input"),r=document.querySelector("#customer-id-input"),i=document.querySelector("#customer-phone-input"),d=document.querySelector("#customer-suggestions"),o=t?.querySelector("[data-order-error]"),c=t?.querySelector('select[name="paymentMethod"]'),u=t?.querySelector(".gcash-reference"),m=t?.querySelector('input[name="paymentReference"]');let f=!1,v;const $=y=>{if(!d||!s)return;const g=y.trim().toLowerCase();if(!g){d.hidden=!0;return}const T=e.customers.filter(L=>L.name.toLowerCase().includes(g)||(L.phone??"").includes(g)).slice(0,8),A=`<div class="ac-item ac-add" data-ac-new="true"><strong>+ Add new: "${p(y.trim())}"</strong></div>`,P=T.map(L=>`<div class="ac-item" data-ac-id="${L.id}" data-ac-name="${p(L.name)}" data-ac-phone="${p(L.phone??"")}"><strong>${p(L.name)}</strong>${L.phone?`<span>${p(L.phone)}</span>`:""}</div>`).join("");d.innerHTML=P+A,d.hidden=!1};s?.addEventListener("input",()=>{r&&(r.value=""),clearTimeout(v),v=window.setTimeout(()=>$(s.value),150)}),s?.addEventListener("focus",()=>{s.value.trim()&&$(s.value)}),d?.addEventListener("click",y=>{const g=y.target.closest(".ac-item");g&&(g.dataset.acNew==="true"?r&&(r.value=""):(s&&(s.value=g.dataset.acName??""),i&&(i.value=g.dataset.acPhone??""),r&&(r.value=g.dataset.acId??"")),d&&(d.hidden=!0))}),document.addEventListener("click",y=>{d&&!d.contains(y.target)&&y.target!==s&&(d.hidden=!0)});const x=()=>{const y=c?.value==="gcash";u&&(u.hidden=!y),m&&(m.required=y,y||(m.value=""))},w=(y,g)=>{if(!t)return;const T=t.querySelector(`input[name="${y}"]`);T&&(T.value=String(Math.max(0,Number(T.value||0)+g)),T.closest(".qty-card")?.classList.toggle("is-selected",Number(T.value)>0),T.dispatchEvent(new Event("input",{bubbles:!0})))};t?.querySelectorAll(".qty-control input").forEach(y=>{y.addEventListener("input",()=>{y.value=String(Math.max(0,Number(y.value||0))),y.closest(".qty-card")?.classList.toggle("is-selected",Number(y.value)>0)})}),t?.querySelectorAll("[data-qty-card]").forEach(y=>{y.addEventListener("click",g=>{const T=g.target;T.closest("input")||T.closest("button")||w(y.dataset.qtyCard??"",1)})}),t?.querySelectorAll("[data-qty-plus]").forEach(y=>{y.addEventListener("click",()=>w(y.dataset.qtyPlus??"",1))}),t?.querySelectorAll("[data-qty-minus]").forEach(y=>{y.addEventListener("click",()=>w(y.dataset.qtyMinus??"",-1))});const b=()=>{if(!t||!n)return;const y=ht(t,e.services),g=y[0],T=ft(g,e.categories),A=gt(t,e.services),P=y.length>0&&g&&T,L=A.length>0;if(!P&&!L){a&&(a.disabled=!0),o&&(o.hidden=!f,o.textContent=f?"Please select at least one service or extra service.":""),n.innerHTML='<div class="preview-total"><span>Total amount</span><strong>PHP 0.00</strong></div>';return}if(P){const D=Ce(y,T,Me(g,T),A),I=D.serviceLines.map(M=>`${M.name} x${M.quantity}`),U=D.extras.map(M=>`${ae(M.name)} x${M.quantity}`);a&&(a.disabled=!1),o&&(o.hidden=!0,o.textContent=""),n.classList.remove("has-error"),n.innerHTML=`
        <div class="preview-line"><span>Services${I.length?` (${p(I.join(", "))})`:""}</span><strong>${S(D.price)}</strong></div>
        ${D.extraServiceAmount>0?`<div class="preview-line"><span>Extra services${U.length?` (${p(U.join(", "))})`:""}</span><strong>${S(D.extraServiceAmount)}</strong></div>`:""}
        <div class="preview-total"><span>Total amount</span><strong>${S(D.totalAmount)}</strong></div>
      `}else{const D=A.reduce((U,M)=>U+M.price*(M.quantity??1),0),I=A.map(U=>`${ae(U.name)} x${U.quantity??1}`);a&&(a.disabled=!1),o&&(o.hidden=!0,o.textContent=""),n.classList.remove("has-error"),n.innerHTML=`
        <div class="preview-line"><span>Extra services (${p(I.join(", "))})</span><strong>${S(D)}</strong></div>
        <div class="preview-total"><span>Total amount</span><strong>${S(D)}</strong></div>
      `}};c?.addEventListener("change",x),x(),t?.addEventListener("input",b),t?.addEventListener("change",b),b(),t?.addEventListener("submit",async y=>{y.preventDefault(),f=!0;const g=new FormData(t),T=ht(t,e.services),A=T[0],P=ft(A,e.categories),L=gt(t,e.services),D=T.length>0&&A&&P,I=L.length>0;if(!D&&!I){o&&(o.hidden=!1,o.textContent="Please select at least one service or extra service.");return}const U=T.map(B=>`${B.name} x${B.quantity}`).join(", "),M=D?Ce(T,P,Me(A,P),L):Ce([],e.categories[0],1,L);if(confirm(`Save this order?

Services: ${U}
Total: ${S(M.totalAmount)}`))try{const B=await Ca({customerId:Number(g.get("customerId"))||void 0,customerName:String(g.get("customerName")??""),customerPhone:String(g.get("customerPhone")??"")||null,serviceQuantities:Mt(t,e.services),branch:e.branch,itemCategoryId:P?.id??e.categories[0].id,weightKg:A&&P?Me(A,P):1,addonQuantities:Bt(t,e.services),paidAmount:Number(g.get("paidAmount")??0),paymentMethod:String(g.get("paymentMethod")??"cash"),paymentReference:String(g.get("paymentReference")??"")||null,notes:String(g.get("notes")??"")||null});await Y("Create order",`${B.ticket} ${S(B.totalAmount)}`),l.receiptOrderId=B.id,await E()}catch(B){o&&(o.hidden=!1,o.textContent=B instanceof Error?B.message:"Order could not be saved.")}}),document.querySelectorAll(".advance-form").forEach(y=>{y.addEventListener("submit",async g=>{g.preventDefault();const T=Number(y.dataset.orderId),A=y.dataset.action==="claim",P=Number(y.dataset.balance||0);if(A&&P>0){alert("Please complete the balance before claiming this order.");return}const L=new FormData(y),D=L.getAll("assignedStaffId").map(Number).filter(_=>_>0),I=Number(L.get("releasedBy")||0),U=D.length>0?D:I>0?I:null;await lt(T,U);const M=A&&I>0?e.staff.find(_=>_.id===I)?.name:null,B=A&&M?`Order ID ${T} (Released by: ${M})`:`Order ID ${T}`;await Y(A?"Claim order":"Advance order",B),await E()})}),document.querySelectorAll(".claim-payment-form").forEach(y=>{const g=y.querySelector('select[name="method"]'),T=y.querySelector('input[name="reference"]'),A=()=>{const P=g?.value==="gcash";T&&(T.closest("label").hidden=!P,T.required=P,P||(T.value=""))};g?.addEventListener("change",A),A(),y.addEventListener("submit",async P=>{P.preventDefault();const L=new FormData(y),D=Number(L.get("amount"));if(D<=0)return;const I=Number(y.dataset.orderId);await _e(I,{amount:D,method:String(L.get("method")),reference:String(L.get("reference")??"")||null}),await lt(I,null),l.paymentModalOrderId=0,await E()})}),document.querySelectorAll("[data-close-payment-modal]").forEach(y=>{y.addEventListener("click",async()=>{l.paymentModalOrderId=0,await E()})}),document.querySelectorAll(".payment-form").forEach(y=>{const g=y.querySelector('select[name="method"]'),T=y.querySelector('input[name="reference"]'),A=()=>{const P=g?.value==="gcash";T&&(T.hidden=!P,T.required=P,P||(T.value=""))};g?.addEventListener("change",A),A(),y.addEventListener("submit",async P=>{P.preventDefault();const L=new FormData(y),D=Number(L.get("amount")),I=String(L.get("method")),U=String(L.get("reference")??"")||null;confirm(`Confirm payment of ${S(D)} via ${I.toUpperCase()}?`)&&(await _e(Number(y.dataset.orderId),{amount:D,method:I,reference:U}),await Y("Record payment",`${S(D)} ${I.toUpperCase()} for order ID ${y.dataset.orderId}`),await E())})}),document.querySelectorAll("[data-cancel-order]").forEach(y=>{y.addEventListener("click",async()=>{const g=Number(y.dataset.cancelOrder);if(Number.isFinite(g)&&confirm("Cancel this order? (No payment will be refunded.)"))try{l.receiptOrderId===g&&(l.receiptOrderId=0),await Oa(g),await Y("Cancel order",`Order ID ${g}`),await E()}catch(T){alert(T instanceof Error?T.message:"Cancel failed.")}})}),document.querySelectorAll("[data-delete-order]").forEach(y=>{y.addEventListener("click",async()=>{const g=Number(y.dataset.deleteOrder);if(Number.isFinite(g)&&confirm("Delete this paid order and update sales?"))try{l.receiptOrderId===g&&(l.receiptOrderId=0),await Da(g),await E()}catch(T){alert(T instanceof Error?T.message:"Delete failed.")}})})}function Fn(e){document.querySelector("#service-form")?.addEventListener("submit",async t=>{t.preventDefault();const n=new FormData(t.currentTarget),a=n.get("id")?Number(n.get("id")):void 0;await ct({id:a,name:String(n.get("name")??""),description:String(n.get("description")??"")||null,category:String(n.get("category")??""),serviceType:String(n.get("serviceType")??"order"),price:Number(n.get("price")??0),maxKg:Number(n.get("maxKg")??0),dryingMinutes:Number(n.get("dryingMinutes"))||null,includes:n.getAll("includes").map(String).filter(Boolean),additionalCharge:0,turnaroundHours:Number(n.get("turnaroundHours")??24),isActive:1}),await E()}),document.querySelectorAll(".edit-service-btn").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.dataset.id),a=e.find(r=>r.id===n),s=document.querySelector("#service-form");a&&s&&(s.querySelector("[name=id]").value=String(a.id),s.querySelector("[name=name]").value=a.name,s.querySelector("[name=category]").value=a.category,s.querySelector("[name=serviceType]").value=a.serviceType,s.querySelector("[name=price]").value=String(a.price),s.querySelector("[name=maxKg]").value=String(a.maxKg),s.querySelector("[name=dryingMinutes]").value=a.dryingMinutes?String(a.dryingMinutes):"",s.querySelectorAll('input[name="includes"]').forEach(r=>{r.checked=a.includes.includes(r.value)}),s.querySelector("[name=turnaroundHours]").value=String(a.turnaroundHours),s.querySelector("[name=description]").value=a.description??"",window.scrollTo({top:0,behavior:"smooth"}))})}),document.querySelectorAll(".deactivate-service-btn, .activate-service-btn").forEach(t=>{t.addEventListener("click",async()=>{const n=Number(t.dataset.id),a=e.find(s=>s.id===n);if(a){const s=a.isActive?0:1;await ct({id:a.id,name:a.name,description:a.description,category:a.category,serviceType:a.serviceType,price:a.price,maxKg:a.maxKg,dryingMinutes:a.dryingMinutes,includes:a.includes,additionalCharge:a.additionalCharge,turnaroundHours:a.turnaroundHours,isActive:s}),await E()}})}),document.querySelector("#category-form")?.addEventListener("submit",async t=>{t.preventDefault();const n=new FormData(t.currentTarget);await Aa({name:String(n.get("name")??""),maxKg:Number(n.get("maxKg")??0),additionalFee:Number(n.get("additionalFee")??0),isActive:1}),await E()})}function kn(e){const t=document.querySelector("#expense-form"),n=t?.querySelector('input[name="disbursementType"]'),a=t?.querySelector(".expense-date-field"),s=t?.querySelector(".expense-month-field"),r=t?.querySelector('input[name="expenseDate"]'),i=t?.querySelector('input[name="expenseMonth"]'),d=o=>{!t||!n||!r||!i||(n.value=o,t.querySelectorAll("[data-expense-type]").forEach(c=>{c.classList.toggle("is-active",c.dataset.expenseType===o)}),a&&(a.hidden=o==="monthly"),s&&(s.hidden=o!=="monthly"),r.required=o==="daily",i.required=o==="monthly",o==="monthly"&&!i.value&&(i.value=je()),o==="daily"&&!r.value&&(r.value=j()))};t?.querySelectorAll("[data-expense-type]").forEach(o=>{o.addEventListener("click",()=>d(o.dataset.expenseType==="monthly"?"monthly":"daily"))}),d("daily"),t?.addEventListener("submit",async o=>{o.preventDefault();const c=new FormData(o.currentTarget),u=Number(c.get("id")||0),m=String(c.get("disbursementType")??"daily")==="monthly"?"monthly":"daily",f=String(c.get("expenseMonth")??je()),v={expenseDate:m==="monthly"?`${f}-01`:String(c.get("expenseDate")??""),disbursementType:m,name:String(c.get("name")??""),category:String(c.get("category")??""),description:String(c.get("description")??""),amount:Number(c.get("amount")??0)};if(m==="daily"&&v.expenseDate!==j()){const $=prompt("Admin password is required for non-today disbursement dates.");if(!$||!await on($)){alert("Admin password is incorrect. Disbursement was not saved.");return}}u?await Ba(u,v):await Ma(v),await Y(u?"Update disbursement":"Create disbursement",`${v.expenseDate} ${v.name} ${S(v.amount)}`),await E()}),document.querySelectorAll(".edit-expense-btn").forEach(o=>{o.addEventListener("click",()=>{const c=e.find(m=>m.id===Number(o.dataset.id));if(!c||!t)return;t.querySelector("[name=id]").value=String(c.id),t.querySelector("[name=expenseDate]").value=c.expenseDate,t.querySelector("[name=expenseMonth]").value=xt(c.expenseDate),d(ne(c)),t.querySelector("[name=amount]").value=String(c.amount),t.querySelector("[name=name]").value=c.name,t.querySelector("[name=category]").value=c.category,t.querySelector("[name=description]").value=c.description??"";const u=t.querySelector('button[type="submit"]');u&&(u.textContent="Update expense"),t.scrollIntoView({behavior:"smooth",block:"start"})})}),document.querySelectorAll(".delete-expense-btn").forEach(o=>{o.addEventListener("click",async()=>{if(l.currentUser?.role!=="admin")return;const c=Number(o.dataset.id);!Number.isFinite(c)||!confirm("Delete this disbursement?")||(await _a(c),await E())})}),document.querySelector("#fold-form")?.addEventListener("submit",async o=>{o.preventDefault();const c=new FormData(o.currentTarget);await Pa({orderTicket:String(c.get("orderTicket")??""),staffName:String(c.get("staffName")??""),foldCount:Number(c.get("foldCount")??1),rate:Number(c.get("rate")??5)}),await E()})}function Un(e,t,n,a,s,r,i){document.querySelector("#generate-report")?.addEventListener("click",()=>{l.reportPreview=Ae(),E()});const d=document.querySelector("#sales-form");d?.addEventListener("submit",async w=>{w.preventDefault();const b=new FormData(w.currentTarget);await Ha({id:Number(b.get("id")||0)||void 0,saleDate:String(b.get("saleDate")??""),cashAmount:Number(b.get("cashAmount")??0),gcashAmount:Number(b.get("gcashAmount")??0),notes:String(b.get("notes")??"")}),await E()}),document.querySelectorAll(".edit-sale-btn").forEach(w=>{w.addEventListener("click",()=>{const b=n.find(g=>g.id===Number(w.dataset.id));if(!b||!d)return;d.querySelector("[name=id]").value=String(b.id),d.querySelector("[name=saleDate]").value=b.saleDate,d.querySelector("[name=cashAmount]").value=String(b.cashAmount),d.querySelector("[name=gcashAmount]").value=String(b.gcashAmount),d.querySelector("[name=notes]").value=b.notes??"";const y=d.querySelector('button[type="submit"]');y&&(y.textContent="Update daily sale"),d.scrollIntoView({behavior:"smooth",block:"start"})})}),document.querySelectorAll(".delete-sale-btn").forEach(w=>{w.addEventListener("click",async()=>{if(l.currentUser?.role!=="admin")return;const b=Number(w.dataset.id);!Number.isFinite(b)||!confirm("Delete this daily sale?")||(await Wa(b),await E())})});const o=document.querySelector("[data-date-from]"),c=document.querySelector("[data-date-to]"),u=document.querySelector('[data-date-scope][value="custom"]');o&&u&&o.addEventListener("change",()=>u.checked=!0),c&&u&&c.addEventListener("change",()=>u.checked=!0),document.querySelectorAll("[data-date-scope]").forEach(w=>{w.addEventListener("change",()=>{if(!w.checked||!o||!c)return;const b=new Date,y=le(b),g=new Date(b);w.value==="week"&&g.setDate(b.getDate()-6),w.value==="month"&&g.setDate(1),w.value!=="custom"&&(o.value=w.value==="today"?y:le(g),c.value=y)})});const m=w=>{const b=T=>String(T??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;"),y=T=>T==="Sales Report"?[110,125,150,215,95,95,105,105]:T==="Disbursement"?[115,115,90,150,150,220,105]:T==="Fold Count"?[220,125]:T==="Revolving Daily Summary"?[115,105,120,115]:T==="Revolving History"?[115,96,140,96,110,180,120]:[155,125,125,125,95,95,115,115];return`<?xml version="1.0"?>
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
  ${w.map(T=>{const A=y(T.name).map(L=>`<Column ss:Width="${L}" ss:AutoFitWidth="0"/>`).join(""),P=T.rows.map(L=>{if(!L.length)return'<Row ss:Height="10" ss:StyleID="BorderRow"><Cell ss:StyleID="BorderCell"><Data ss:Type="String">&nbsp;</Data></Cell></Row>';const D=L[0]==="Type"||L[0]==="Summary"||L[0]==="Sales Summary"||L[0]==="Disbursement Summary"||L[0]==="Staff"||L[0]==="Date of Sales"||L[0]==="Date"||L[0]==="Date/Month",I=D?"HeaderRow":"BorderRow",U=D?"HeaderCell":"BorderCell",M=D?26:22,B=L.map(_=>`<Cell ss:StyleID="${U}"><Data ss:Type="${typeof _=="number"?"Number":"String"}">${b(_)}</Data></Cell>`).join("");return`<Row ss:Height="${M}" ss:StyleID="${I}">${B}</Row>`}).join("");return`
        <Worksheet ss:Name="${b(T.name)}">
          <Table>
            ${A}
            ${P}
          </Table>
        </Worksheet>`}).join("")}
</Workbook>`},f=()=>{const w=Ae(),b=qt(e,t,n,a,s,r,i,w),y=[];if(b.selectedTypes.has("sales")){const A=b.salesRows(),P=[["Ticket","Customer","Cash","GCash","Total Payment"],...A.transactions.map(L=>[L.ticket,L.customer,L.cash,L.gcash,L.total]),[],["Cash from Orders","GCash from Orders","Sales from Orders"],[A.orderCashTotal,A.orderGcashTotal,A.orderCashTotal+A.orderGcashTotal],[],["Cash Whole Sale","GCash Whole Sale","Whole Sale of Day"],[A.manualCashTotal,A.manualGcashTotal,A.manualCashTotal+A.manualGcashTotal],[],["Total Cash","Total GCash","Total Sales"],[A.totalCash,A.totalGcash,A.totalSales]];y.push({name:"Sales Report",rows:P})}b.selectedTypes.has("disbursement")&&y.push({name:"Disbursement",rows:b.disbursementRows().rows}),b.selectedTypes.has("fold_count")&&y.push({name:"Fold Count",rows:b.foldCountRows().rows}),b.selectedTypes.has("revolving_fund")&&(y.push({name:"Revolving Daily Summary",rows:b.revolvingDailySummaryRows().rows}),y.push({name:"Revolving History",rows:b.revolvingHistoryRows().rows})),b.selectedTypes.has("summary")&&y.push({name:"Summary",rows:b.summaryRows()});const g=m(y.length?y:[{name:"Summary",rows:b.summaryRows()}]),T=`laba101-report-${w.from}-to-${w.to}.xls`;return new File([g],T,{type:"application/vnd.ms-excel"})},v=async()=>{const w=f();if(!R.isNativePlatform())return{fileName:w.name,uri:""};const b=await w.text(),y=w.name;await st.writeFile({path:y,data:b,directory:$e.External,encoding:Be.UTF8});const{uri:g}=await st.getUri({path:y,directory:$e.External});return{fileName:w.name,uri:g}},$=()=>{const w=f(),b=Ae(),y=`laba101-report-${b.from}-to-${b.to}.xls`,g=w,T=URL.createObjectURL(g),A=document.createElement("a");return A.href=T,A.download=y,document.body.appendChild(A),A.click(),setTimeout(()=>{A.remove(),URL.revokeObjectURL(T)},1e3),y},x=async w=>{const b=document.querySelector(w==="export"?"#export-report":"#email-report");b&&(b.disabled=!0,b.textContent=w==="export"?"Exporting...":"Sending...");try{if(w==="export")if(R.isNativePlatform()){const y=await v();alert(`Report exported as "${y.fileName}".`)}else{const y=$();alert(`Report saved: ${y}`)}else{const y=await Tt("report_email")||"";if(!y){alert("Please configure a report email in Settings first.");return}const g=Ae(),T=`Laba101 report ${g.from} to ${g.to}`;if(R.isNativePlatform()){const A=await v();try{await na.share({title:T,text:`Please find the attached Laba101 report file: ${A.fileName}`,files:[A.uri],dialogTitle:"Send report via email"}),alert(`Report saved and shared as "${A.fileName}".`)}catch(P){const L=String(P).toLowerCase();if(L.includes("share canceled")||L.includes("canceled"))alert(`Report saved as "${A.fileName}".`);else throw P}}else{const A=$(),P=`Hi,

Please find the attached Laba101 report file: ${A}

Date range: ${g.from} to ${g.to}`,L=`mailto:${y}?subject=${encodeURIComponent(T)}&body=${encodeURIComponent(P)}`;setTimeout(()=>{window.location.href=L},800),alert(`Report downloaded as "${A}".
Your email app will open — please attach the file and send.`)}}}catch(y){alert("Failed: "+String(y))}finally{b&&(b.disabled=!1,b.textContent=w==="export"?"Export Excel":"Send to Email")}};document.querySelector("#export-report")?.addEventListener("click",async()=>{await x("export")}),document.querySelector("#email-report")?.addEventListener("click",async()=>{await x("email")})}function Mn(){document.querySelector("#order-queue-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);l.orderSearch=String(t.get("orderSearch")??"").trim(),l.orderDateFilter=String(t.get("orderDateFilter")??"").trim(),l.orderPaymentFilter=String(t.get("orderPaymentFilter")??"").trim(),E()}),document.querySelector("#order-queue-clear")?.addEventListener("click",()=>{l.orderSearch="",l.orderDateFilter="",l.orderPaymentFilter="",E()}),document.querySelector("#archived-order-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);l.archivedOrderSearch=String(t.get("archivedOrderSearch")??"").trim(),E()}),document.querySelector("#archived-order-clear")?.addEventListener("click",()=>{l.archivedOrderSearch="",E()})}function Bn(){document.querySelector("#customer-search-form")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);l.customerSearch=String(t.get("customerSearch")??"").trim(),E()}),document.querySelector("#customer-search-clear")?.addEventListener("click",()=>{l.customerSearch="",E()})}function _n(){document.querySelector("#machine-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await Ya({machineName:String(t.get("machineName")??""),machineType:String(t.get("machineType")),status:String(t.get("status")),branch:String(t.get("branch")??"")}),await E()}),document.querySelector("#subcleaning-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=e.currentTarget.querySelector('button[type="submit"]');t&&(t.disabled=!0,t.textContent="Starting...");const n=new FormData(e.currentTarget),a=n.getAll("machineIds").map(Number);if(!a.length){alert("Please select at least one machine to clean."),t&&(t.disabled=!1,t.textContent="Start Cleaning");return}await Ot({date:String(n.get("date")??""),machineIds:a,cleaningStatus:String(n.get("cleaningStatus")??""),cleaningType:"tube",notes:String(n.get("notes")??""),branch:String(n.get("branch")??"")}),await Y("Start tube cleaning",`${a.length} machine(s)`),await E()}),document.querySelector("#confirm-general-cleaning")?.addEventListener("click",async()=>{await Za(document.querySelector('input[name="branch"]')?.value||l.currentUser?.branch||"Main Store",l.currentUser?.name??"Unknown"),await Y("Confirm general cleaning",j()),await E()}),document.querySelectorAll(".complete-cleaning-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.machineId),n=e.dataset.branch??"";e.disabled=!0,e.textContent="Completing...",await za(t,n),await Y("Complete tube cleaning",`Machine ID ${t}`),await E()})}),document.querySelectorAll(".deactivate-machine-btn, .activate-machine-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.id),n=e.classList.contains("deactivate-machine-btn");await Qa(t,n?"inactive":"available"),await E()})})}function jn(e,t){const n=document.querySelector("#inventory-form");n?.addEventListener("submit",async a=>{a.preventDefault();const s=new FormData(a.currentTarget),r=Number(s.get("id")||0);await Ga({id:r||void 0,name:String(s.get("name")??""),unit:String(s.get("unit")??""),quantity:Number(s.get("quantity")??0),reorderLevel:Number(s.get("reorderLevel")??0),notes:String(s.get("notes")??""),branch:t}),await Y(r?"Update inventory item":"Create inventory item",String(s.get("name")??"")),await E()}),document.querySelectorAll(".edit-inventory-btn").forEach(a=>{a.addEventListener("click",()=>{const s=e.find(r=>r.id===Number(a.dataset.id));!s||!n||(n.querySelector("[name=id]").value=String(s.id),n.querySelector("[name=name]").value=s.name,n.querySelector("[name=unit]").value=s.unit,n.querySelector("[name=quantity]").value=String(s.quantity),n.querySelector("[name=reorderLevel]").value=String(s.reorderLevel),n.querySelector("[name=notes]").value=s.notes??"",n.scrollIntoView({behavior:"smooth",block:"start"}))})}),document.querySelector("#inventory-movement-form")?.addEventListener("submit",async a=>{a.preventDefault();const s=new FormData(a.currentTarget),r=String(s.get("movementType")??"in")==="out"?"out":"in";try{await Va({itemId:Number(s.get("itemId")??0),movementType:r,quantity:Number(s.get("quantity")??0),notes:String(s.get("notes")??""),staffName:l.currentUser?.name??"Unknown",branch:t}),await Y(r==="in"?"Stock-in":"Stock-out",`Item ID ${s.get("itemId")} qty ${s.get("quantity")}`),await E()}catch(i){alert(i instanceof Error?i.message:"Stock movement failed.")}})}function Hn(e){const t=document.querySelector("#add-staff-modal"),n=document.querySelector("#open-add-staff-modal"),a=document.querySelector("#close-add-staff-modal"),s=document.querySelector("#staff-form"),r=()=>{s?.reset(),s&&(s.querySelector("[name=id]").value="");const d=document.querySelector("#add-staff-title");d&&(d.textContent="Add staff member"),t?.removeAttribute("hidden")},i=()=>{t?.setAttribute("hidden",""),s?.reset()};n?.addEventListener("click",r),a?.addEventListener("click",i),t?.addEventListener("click",d=>{d.target===t&&i()}),document.querySelectorAll(".edit-staff-btn").forEach(d=>{d.addEventListener("click",()=>{const o=Number(d.dataset.id),c=e.find(u=>u.id===o);if(c&&s){s.querySelector("[name=id]").value=String(c.id),s.querySelector("[name=name]").value=c.name,s.querySelector("[name=email]").value=c.email,s.querySelector("[name=password]").value=c.password,s.querySelector("[name=role]").value=c.role,s.querySelector("[name=branch]").value=c.branch;const u=document.querySelector("#add-staff-title");u&&(u.textContent="Edit staff member"),t?.removeAttribute("hidden")}})}),document.querySelectorAll(".deactivate-staff-btn, .activate-staff-btn").forEach(d=>{d.addEventListener("click",async()=>{const o=Number(d.dataset.id),c=e.find(u=>u.id===o);c&&(await ot(o,{isActive:c.isActive!==0?0:1}),await E())})}),s?.addEventListener("submit",async d=>{d.preventDefault();const o=document.querySelector("#staff-save-btn");o&&(o.disabled=!0,o.textContent="Saving...");const c=new FormData(s),u=c.get("id")?Number(c.get("id")):void 0,m=String(c.get("name")??"").trim(),f=String(c.get("email")??"").trim(),v=String(c.get("password")??"password")||"password",$=String(c.get("role")),x=String(c.get("branch")??"");if(!m||!f){alert("Name and email are required."),o&&(o.disabled=!1,o.textContent="Save staff member");return}try{u?await ot(u,{name:m,email:f,password:v,role:$,branch:x}):await Sa({name:m,email:f,password:v,role:$,branch:x}),i(),await E()}catch{alert("Failed to save staff. The email may already be in use."),o&&(o.disabled=!1,o.textContent="Save staff member")}})}function Wn(){document.querySelector("#settings-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await Le("branch",String(t.get("branch")??"Main Store")),await Le("fold_rate",String(t.get("foldRate")??"5")),String(t.get("reportEmail")??"")&&await Le("report_email",String(t.get("reportEmail"))),alert("Settings saved successfully!")})}async function Xn(){await ga();const e=localStorage.getItem(Te);if(e)try{const t=JSON.parse(e);if(t.email&&t.remembered){const n=await wt(t.email,"password")??null;l.currentUser=n}}catch{localStorage.removeItem(Te)}await E()}function Gn(e,t,n,a){const s=e.filter(v=>v.status==="revolving").reduce((v,$)=>v+$.cashAmount,0),r=t.filter(v=>v.type==="add").reduce((v,$)=>v+$.amount,0),i=t.filter(v=>v.type==="disbursement").reduce((v,$)=>v+$.amount,0),d=s+r-i,o=l.revolvingHistoryFrom||"0000-01-01",c=l.revolvingHistoryTo||"9999-12-31",u=t.filter(v=>{const $=X(v.createdAt);return $>=o&&$<=c}),m=e.map(v=>{const $=Dt(v.saleDate,n,a,v.cashAmount),x=v.status==="revolving"?'<span class="ok">Revolving</span>':v.status==="endorsed"?`<span class="warn">Endorsed to ${p(v.endorsedTo)}</span>`:'<span class="meta">Pending</span>',w=v.status!=="revolving"&&v.status!=="endorsed"?`<div class="row-actions">
          <button class="primary revolving-btn" data-id="${v.id}">Revolving</button>
          <button class="secondary endorsed-btn" data-id="${v.id}" data-date="${ye(v.saleDate)}">Endorsed</button>
        </div>`:"";return[`<strong>${p(ye(v.saleDate))}</strong>`,`<strong class="ok">${S($)}</strong>`,x,v.statusUpdatedAt?p(ye(v.statusUpdatedAt)):"-",w]}),f=u.map(v=>[Pe(v.createdAt),`<strong>${p(v.revolvingNumber)}</strong>`,p(v.name),`<strong class="${v.type==="disbursement"?"warn":"ok"}">${v.type==="disbursement"?"-":"+"}${S(v.amount)}</strong>`,p(v.category),p(v.description||"-"),`<span class="${v.type==="add"?"ok":"warn"}">${v.type==="add"?"Add Revolving Fund":"Disbursement"}</span>`]);return`
    <section class="grid content full">
      <div class="panel-header" style="display: flex; gap: 16px; margin-bottom: 24px; align-items: center;">
        <button class="primary" id="add-revolving-fund-btn">Add Revolving Fund</button>
        <button class="secondary" id="revolving-disbursement-btn">Disbursement</button>
      </div>

      <article class="panel">
        <div style="background-color: #061a42; color: white; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
          <p style="font-size: 12px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin: 0 0 8px 0;">Revolving Fund Total</p>
          <p style="font-size: 32px; font-weight: 800; margin: 0;">${S(d)}</p>
        </div>
        ${q("Daily Summary","Cash on hand per day (order cash + manual cash − disbursements)")}
        ${ee(["Date of Sales","Cash on Hand","Status","Date Update","Action"],m,"data-table revolving-summary-datatable")}
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
        ${ee(["Date","Disbursement #","Name","Amount","Category","Description","Type"],f,"data-table revolving-history-datatable")}
      </article>

      ${l.endorseModalOpen?`
        <div class="modal-backdrop" role="presentation">
          <div class="receipt-modal" role="dialog" aria-modal="true" style="max-width: 400px; width: 90%;">
            <form id="endorse-form" class="form" style="padding: 24px;">
              <h3 style="margin-top: 0;">Endorse Money</h3>
              <p class="meta" style="margin-bottom: 16px;">Endorsing cash from <strong>${p(l.endorseSaleDate)}</strong>.</p>
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
  `}function Kn(){document.querySelector("#revolving-history-filters")?.addEventListener("submit",async u=>{u.preventDefault();const m=new FormData(u.currentTarget);l.revolvingHistoryFrom=String(m.get("revolvingHistoryFrom")??"").trim(),l.revolvingHistoryTo=String(m.get("revolvingHistoryTo")??"").trim(),await E()}),document.querySelector("#revolving-history-clear")?.addEventListener("click",async()=>{l.revolvingHistoryFrom="",l.revolvingHistoryTo="",await E()}),document.querySelectorAll(".revolving-btn").forEach(u=>{u.addEventListener("click",async()=>{l.revolvingModalOpen=!0,l.revolvingSaleId=Number(u.dataset.id),await E()})});const e=document.getElementById("confirm-revolving-btn");e&&e.addEventListener("click",async()=>{await ut(l.revolvingSaleId,"revolving",null,new Date().toISOString()),l.revolvingModalOpen=!1,await E()});const t=document.getElementById("close-revolving-modal");t&&t.addEventListener("click",async()=>{l.revolvingModalOpen=!1,await E()}),document.querySelectorAll(".endorsed-btn").forEach(u=>{u.addEventListener("click",async()=>{l.endorseModalOpen=!0,l.endorseSaleId=Number(u.dataset.id),l.endorseSaleDate=u.dataset.date??"",await E()})});const n=document.getElementById("close-endorse-modal");n&&n.addEventListener("click",async()=>{l.endorseModalOpen=!1,await E()});const a=document.getElementById("endorse-form");a&&a.addEventListener("submit",async u=>{u.preventDefault();const m=new FormData(a),f=String(m.get("endorsedTo")??"").trim();f&&(await ut(l.endorseSaleId,"endorsed",f,new Date().toISOString()),l.endorseModalOpen=!1,await E())});const s=document.getElementById("add-revolving-fund-btn");s&&s.addEventListener("click",async()=>{l.addFundModalOpen=!0,await E()});const r=document.getElementById("close-add-fund-modal");r&&r.addEventListener("click",async()=>{l.addFundModalOpen=!1,await E()});const i=document.getElementById("add-fund-form");i&&i.addEventListener("submit",async u=>{u.preventDefault();const m=new FormData(i);await mt({name:String(m.get("name")??"").trim(),amount:Number(m.get("amount")??0),category:"Add Revolving Fund",description:null,type:"add",createdAt:new Date().toISOString()}),l.addFundModalOpen=!1,await E()});const d=document.getElementById("revolving-disbursement-btn");d&&d.addEventListener("click",async()=>{l.disbursementModalOpen=!0,await E()});const o=document.getElementById("close-disbursement-modal");o&&o.addEventListener("click",async()=>{l.disbursementModalOpen=!1,await E()});const c=document.getElementById("disbursement-form");c&&c.addEventListener("submit",async u=>{u.preventDefault();const m=new FormData(c);await mt({name:String(m.get("name")??"").trim(),amount:Number(m.get("amount")??0),category:String(m.get("category")??"").trim(),description:String(m.get("description")??"").trim(),type:"disbursement",expenseDate:j(),createdAt:new Date().toISOString()}),l.disbursementModalOpen=!1,await E()})}Xn();export{Be as E,He as W,Yt as b};
