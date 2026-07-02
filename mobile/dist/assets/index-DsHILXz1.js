(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();var Se;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(Se||(Se={}));class _e extends Error{constructor(t,n,a){super(t),this.message=t,this.code=n,this.data=a}}const na=e=>{var t,n;return e?.androidBridge?"android":!((n=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||n===void 0)&&n.bridge?"ios":"web"},ra=e=>{const t=e.CapacitorCustomPlatform||null,n=e.Capacitor||{},a=n.Plugins=n.Plugins||{},r=()=>t!==null?t.name:na(e),s=()=>r()!=="web",i=f=>{const o=m.get(f);return!!(o?.platforms.has(r())||d(f))},d=f=>{var o;return(o=n.PluginHeaders)===null||o===void 0?void 0:o.find(u=>u.name===f)},y=f=>e.console.error(f),m=new Map,l=(f,o={})=>{const u=m.get(f);if(u)return console.warn(`Capacitor plugin "${f}" already registered. Cannot register plugins twice.`),u.proxy;const E=r(),P=d(f);let q;const k=async()=>(!q&&E in o?q=typeof o[E]=="function"?q=await o[E]():q=o[E]:t!==null&&!q&&"web"in o&&(q=typeof o.web=="function"?q=await o.web():q=o.web),q),v=(b,C)=>{var R,D;if(P){const U=P?.methods.find(B=>C===B.name);if(U)return U.rtype==="promise"?B=>n.nativePromise(f,C.toString(),B):(B,ee)=>n.nativeCallback(f,C.toString(),B,ee);if(b)return(R=b[C])===null||R===void 0?void 0:R.bind(b)}else{if(b)return(D=b[C])===null||D===void 0?void 0:D.bind(b);throw new _e(`"${f}" plugin is not implemented on ${E}`,Se.Unimplemented)}},N=b=>{let C;const R=(...D)=>{const U=k().then(B=>{const ee=v(B,b);if(ee){const te=ee(...D);return C=te?.remove,te}else throw new _e(`"${f}.${b}()" is not implemented on ${E}`,Se.Unimplemented)});return b==="addListener"&&(U.remove=async()=>C()),U};return R.toString=()=>`${b.toString()}() { [capacitor code] }`,Object.defineProperty(R,"name",{value:b,writable:!1,configurable:!1}),R},L=N("addListener"),F=N("removeListener"),S=(b,C)=>{const R=L({eventName:b},C),D=async()=>{const B=await R;F({eventName:b,callbackId:B},C)},U=new Promise(B=>R.then(()=>B({remove:D})));return U.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await D()},U},h=new Proxy({},{get(b,C){switch(C){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return P?S:L;case"removeListener":return F;default:return N(C)}}});return a[f]=h,m.set(f,{name:f,proxy:h,platforms:new Set([...Object.keys(o),...P?[E]:[]])}),h};return n.convertFileSrc||(n.convertFileSrc=f=>f),n.getPlatform=r,n.handleError=y,n.isNativePlatform=s,n.isPluginAvailable=i,n.registerPlugin=l,n.Exception=_e,n.DEBUG=!!n.DEBUG,n.isLoggingEnabled=!!n.isLoggingEnabled,n},sa=e=>e.Capacitor=ra(e),x=sa(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),ve=x.registerPlugin;class Ye{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,n){let a=!1;this.listeners[t]||(this.listeners[t]=[],a=!0),this.listeners[t].push(n);const s=this.windowListeners[t];s&&!s.registered&&this.addWindowListener(s),a&&this.sendRetainedArgumentsForEvent(t);const i=async()=>this.removeListener(t,n);return Promise.resolve({remove:i})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,n,a){const r=this.listeners[t];if(!r){if(a){let s=this.retainedEventArguments[t];s||(s=[]),s.push(n),this.retainedEventArguments[t]=s}return}r.forEach(s=>s(n))}hasListeners(t){var n;return!!(!((n=this.listeners[t])===null||n===void 0)&&n.length)}registerWindowListener(t,n){this.windowListeners[n]={registered:!1,windowEventName:t,pluginEventName:n,handler:a=>{this.notifyListeners(n,a)}}}unimplemented(t="not implemented"){return new x.Exception(t,Se.Unimplemented)}unavailable(t="not available"){return new x.Exception(t,Se.Unavailable)}async removeListener(t,n){const a=this.listeners[t];if(!a)return;const r=a.indexOf(n);this.listeners[t].splice(r,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const n=this.retainedEventArguments[t];n&&(delete this.retainedEventArguments[t],n.forEach(a=>{this.notifyListeners(t,a)}))}}const dt=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),ut=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class ia extends Ye{async getCookies(){const t=document.cookie,n={};return t.split(";").forEach(a=>{if(a.length<=0)return;let[r,s]=a.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");r=ut(r).trim(),s=ut(s).trim(),n[r]=s}),n}async setCookie(t){try{const n=dt(t.key),a=dt(t.value),r=t.expires?`; expires=${t.expires.replace("expires=","")}`:"",s=(t.path||"/").replace("path=",""),i=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${n}=${a||""}${r}; path=${s}; ${i};`}catch(n){return Promise.reject(n)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(n){return Promise.reject(n)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const n of t)document.cookie=n.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}ve("CapacitorCookies",{web:()=>new ia});const oa=async e=>new Promise((t,n)=>{const a=new FileReader;a.onload=()=>{const r=a.result;t(r.indexOf(",")>=0?r.split(",")[1]:r)},a.onerror=r=>n(r),a.readAsDataURL(e)}),la=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(r=>r.toLocaleLowerCase()).reduce((r,s,i)=>(r[s]=e[t[i]],r),{})},ca=(e,t=!0)=>e?Object.entries(e).reduce((a,r)=>{const[s,i]=r;let d,y;return Array.isArray(i)?(y="",i.forEach(m=>{d=t?encodeURIComponent(m):m,y+=`${s}=${d}&`}),y.slice(0,-1)):(d=t?encodeURIComponent(i):i,y=`${s}=${d}`),`${a}&${y}`},"").substr(1):null,da=(e,t={})=>{const n=Object.assign({method:e.method||"GET",headers:e.headers},t),r=la(e.headers)["content-type"]||"";if(typeof e.data=="string")n.body=e.data;else if(r.includes("application/x-www-form-urlencoded")){const s=new URLSearchParams;for(const[i,d]of Object.entries(e.data||{}))s.set(i,d);n.body=s.toString()}else if(r.includes("multipart/form-data")||e.data instanceof FormData){const s=new FormData;if(e.data instanceof FormData)e.data.forEach((d,y)=>{s.append(y,d)});else for(const d of Object.keys(e.data))s.append(d,e.data[d]);n.body=s;const i=new Headers(n.headers);i.delete("content-type"),n.headers=i}else(r.includes("application/json")||typeof e.data=="object")&&(n.body=JSON.stringify(e.data));return n};class ua extends Ye{async request(t){const n=da(t,t.webFetchExtra),a=ca(t.params,t.shouldEncodeUrlParams),r=a?`${t.url}?${a}`:t.url,s=await fetch(r,n),i=s.headers.get("content-type")||"";let{responseType:d="text"}=s.ok?t:{};i.includes("application/json")&&(d="json");let y,m;switch(d){case"arraybuffer":case"blob":m=await s.blob(),y=await oa(m);break;case"json":y=await s.json();break;default:y=await s.text()}const l={};return s.headers.forEach((f,o)=>{l[o]=f}),{data:y,headers:l,status:s.status,url:s.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}ve("CapacitorHttp",{web:()=>new ua});var mt;(function(e){e.Dark="DARK",e.Light="LIGHT",e.Default="DEFAULT"})(mt||(mt={}));var yt;(function(e){e.StatusBar="StatusBar",e.NavigationBar="NavigationBar"})(yt||(yt={}));class ma extends Ye{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}ve("SystemBars",{web:()=>new ma});const ya="modulepreload",fa=function(e){return"/"+e},ft={},Ve=function(t,n,a){let r=Promise.resolve();if(n&&n.length>0){let y=function(m){return Promise.all(m.map(l=>Promise.resolve(l).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),d=i?.nonce||i?.getAttribute("nonce");r=y(n.map(m=>{if(m=fa(m),m in ft)return;ft[m]=!0;const l=m.endsWith(".css"),f=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${m}"]${f}`))return;const o=document.createElement("link");if(o.rel=l?"stylesheet":ya,l||(o.as="script"),o.crossOrigin="",o.href=m,d&&o.setAttribute("nonce",d),document.head.appendChild(o),l)return new Promise((u,E)=>{o.addEventListener("load",u),o.addEventListener("error",()=>E(new Error(`Unable to preload CSS for ${m}`)))})}))}function s(i){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=i,window.dispatchEvent(d),!d.defaultPrevented)throw i}return r.then(i=>{for(const d of i||[])d.status==="rejected"&&s(d.reason);return t().catch(s)})};function pa(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,n){return new Proxy({},{get(a,r){return(s,i,d)=>{const y=e.Capacitor.Plugins[n];if(y===void 0){d(new Error(`Capacitor plugin ${n} not found`));return}if(typeof y[r]!="function"){d(new Error(`Method ${r} not found in Capacitor plugin ${n}`));return}(async()=>{try{const m=await y[r](s);i(m)}catch(m){d(m)}})()}}})}})}function va(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,n){return e.cordova.plugins[n]}})}function ha(e=!1){typeof window>"u"||(window.CapacitorUtils=window.CapacitorUtils||{},window.Capacitor!==void 0&&!e?pa(window):window.cordova!==void 0&&va(window))}var ge;(function(e){e.Documents="DOCUMENTS",e.Data="DATA",e.Library="LIBRARY",e.Cache="CACHE",e.External="EXTERNAL",e.ExternalStorage="EXTERNAL_STORAGE",e.ExternalCache="EXTERNAL_CACHE",e.LibraryNoCloud="LIBRARY_NO_CLOUD",e.Temporary="TEMPORARY"})(ge||(ge={}));var Ge;(function(e){e.UTF8="utf8",e.ASCII="ascii",e.UTF16="utf16"})(Ge||(Ge={}));const $e=ve("Filesystem",{web:()=>Ve(()=>import("./web-CArm9mZi.js"),[]).then(e=>new e.FilesystemWeb)});ha();const pt=ve("Share",{web:()=>Ve(()=>import("./web-C5qrngFL.js"),[]).then(e=>new e.ShareWeb)});class ga{constructor(t){this.sqlite=t,this._connectionDict=new Map}async initWebStore(){try{return await this.sqlite.initWebStore(),Promise.resolve()}catch(t){return Promise.reject(t)}}async saveToStore(t){try{return await this.sqlite.saveToStore({database:t}),Promise.resolve()}catch(n){return Promise.reject(n)}}async saveToLocalDisk(t){try{return await this.sqlite.saveToLocalDisk({database:t}),Promise.resolve()}catch(n){return Promise.reject(n)}}async getFromLocalDiskToStore(t){const n=t??!0;try{return await this.sqlite.getFromLocalDiskToStore({overwrite:n}),Promise.resolve()}catch(a){return Promise.reject(a)}}async echo(t){try{const n=await this.sqlite.echo({value:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async isSecretStored(){try{const t=await this.sqlite.isSecretStored();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async setEncryptionSecret(t){try{return await this.sqlite.setEncryptionSecret({passphrase:t}),Promise.resolve()}catch(n){return Promise.reject(n)}}async changeEncryptionSecret(t,n){try{return await this.sqlite.changeEncryptionSecret({passphrase:t,oldpassphrase:n}),Promise.resolve()}catch(a){return Promise.reject(a)}}async clearEncryptionSecret(){try{return await this.sqlite.clearEncryptionSecret(),Promise.resolve()}catch(t){return Promise.reject(t)}}async checkEncryptionSecret(t){try{const n=await this.sqlite.checkEncryptionSecret({passphrase:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async addUpgradeStatement(t,n){try{return t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.addUpgradeStatement({database:t,upgrade:n}),Promise.resolve()}catch(a){return Promise.reject(a)}}async createConnection(t,n,a,r,s){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.createConnection({database:t,encrypted:n,mode:a,version:r,readonly:s});const i=new vt(t,s,this.sqlite),d=s?`RO_${t}`:`RW_${t}`;return this._connectionDict.set(d,i),Promise.resolve(i)}catch(i){return Promise.reject(i)}}async closeConnection(t,n){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.closeConnection({database:t,readonly:n});const a=n?`RO_${t}`:`RW_${t}`;return this._connectionDict.delete(a),Promise.resolve()}catch(a){return Promise.reject(a)}}async isConnection(t,n){const a={};t.endsWith(".db")&&(t=t.slice(0,-3));const r=n?`RO_${t}`:`RW_${t}`;return a.result=this._connectionDict.has(r),Promise.resolve(a)}async retrieveConnection(t,n){t.endsWith(".db")&&(t=t.slice(0,-3));const a=n?`RO_${t}`:`RW_${t}`;if(this._connectionDict.has(a)){const r=this._connectionDict.get(a);return typeof r<"u"?Promise.resolve(r):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async getNCDatabasePath(t,n){try{const a=await this.sqlite.getNCDatabasePath({path:t,database:n});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async createNCConnection(t,n){try{await this.sqlite.createNCConnection({databasePath:t,version:n});const a=new vt(t,!0,this.sqlite),r=`RO_${t})`;return this._connectionDict.set(r,a),Promise.resolve(a)}catch(a){return Promise.reject(a)}}async closeNCConnection(t){try{await this.sqlite.closeNCConnection({databasePath:t});const n=`RO_${t})`;return this._connectionDict.delete(n),Promise.resolve()}catch(n){return Promise.reject(n)}}async isNCConnection(t){const n={},a=`RO_${t})`;return n.result=this._connectionDict.has(a),Promise.resolve(n)}async retrieveNCConnection(t){if(this._connectionDict.has(t)){const n=`RO_${t})`,a=this._connectionDict.get(n);return typeof a<"u"?Promise.resolve(a):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async isNCDatabase(t){try{const n=await this.sqlite.isNCDatabase({databasePath:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async retrieveAllConnections(){return this._connectionDict}async closeAllConnections(){const t=new Map;try{for(const n of this._connectionDict.keys()){const a=n.substring(3),r=n.substring(0,3)==="RO_";await this.sqlite.closeConnection({database:a,readonly:r}),t.set(n,null)}for(const n of t.keys())this._connectionDict.delete(n);return Promise.resolve()}catch(n){return Promise.reject(n)}}async checkConnectionsConsistency(){try{const t=[...this._connectionDict.keys()],n=[],a=[];for(const s of t)n.push(s.substring(0,2)),a.push(s.substring(3));const r=await this.sqlite.checkConnectionsConsistency({dbNames:a,openModes:n});return r.result||(this._connectionDict=new Map),Promise.resolve(r)}catch(t){return this._connectionDict=new Map,Promise.reject(t)}}async importFromJson(t){try{const n=await this.sqlite.importFromJson({jsonstring:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async isJsonValid(t){try{const n=await this.sqlite.isJsonValid({jsonstring:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async copyFromAssets(t){const n=t??!0;try{return await this.sqlite.copyFromAssets({overwrite:n}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getFromHTTPRequest(t,n){const a=n??!0;try{return await this.sqlite.getFromHTTPRequest({url:t,overwrite:a}),Promise.resolve()}catch(r){return Promise.reject(r)}}async isDatabaseEncrypted(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const n=await this.sqlite.isDatabaseEncrypted({database:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async isInConfigEncryption(){try{const t=await this.sqlite.isInConfigEncryption();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isInConfigBiometricAuth(){try{const t=await this.sqlite.isInConfigBiometricAuth();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isDatabase(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const n=await this.sqlite.isDatabase({database:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async getDatabaseList(){try{const n=(await this.sqlite.getDatabaseList()).values;n.sort();const a={values:n};return Promise.resolve(a)}catch(t){return Promise.reject(t)}}async getMigratableDbList(t){const n=t||"default";try{const a=await this.sqlite.getMigratableDbList({folderPath:n});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async addSQLiteSuffix(t,n){const a=t||"default",r=n||[];try{const s=await this.sqlite.addSQLiteSuffix({folderPath:a,dbNameList:r});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async deleteOldDatabases(t,n){const a=t||"default",r=n||[];try{const s=await this.sqlite.deleteOldDatabases({folderPath:a,dbNameList:r});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async moveDatabasesAndAddSuffix(t,n){const a=t||"default",r=n||[];return this.sqlite.moveDatabasesAndAddSuffix({folderPath:a,dbNameList:r})}}class vt{constructor(t,n,a){this.dbName=t,this.readonly=n,this.sqlite=a}getConnectionDBName(){return this.dbName}getConnectionReadOnly(){return this.readonly}async open(){try{return await this.sqlite.open({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async close(){try{return await this.sqlite.close({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async beginTransaction(){try{const t=await this.sqlite.beginTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async commitTransaction(){try{const t=await this.sqlite.commitTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async rollbackTransaction(){try{const t=await this.sqlite.rollbackTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTransactionActive(){try{const t=await this.sqlite.isTransactionActive({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async loadExtension(t){try{return await this.sqlite.loadExtension({database:this.dbName,path:t,readonly:this.readonly}),Promise.resolve()}catch(n){return Promise.reject(n)}}async enableLoadExtension(t){try{return await this.sqlite.enableLoadExtension({database:this.dbName,toggle:t,readonly:this.readonly}),Promise.resolve()}catch(n){return Promise.reject(n)}}async getUrl(){try{const t=await this.sqlite.getUrl({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getVersion(){try{const t=await this.sqlite.getVersion({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getTableList(){try{const t=await this.sqlite.getTableList({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async execute(t,n=!0,a=!0){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const r=await this.sqlite.execute({database:this.dbName,statements:t,transaction:n,readonly:!1,isSQL92:a});return Promise.resolve(r)}}catch(r){return Promise.reject(r)}}async query(t,n,a=!0){let r;try{return n&&n.length>0?r=await this.sqlite.query({database:this.dbName,statement:t,values:n,readonly:this.readonly,isSQL92:!0}):r=await this.sqlite.query({database:this.dbName,statement:t,values:[],readonly:this.readonly,isSQL92:a}),r=await this.reorderRows(r),Promise.resolve(r)}catch(s){return Promise.reject(s)}}async run(t,n,a=!0,r="no",s=!0){let i;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(n&&n.length>0?i=await this.sqlite.run({database:this.dbName,statement:t,values:n,transaction:a,readonly:!1,returnMode:r,isSQL92:!0}):i=await this.sqlite.run({database:this.dbName,statement:t,values:[],transaction:a,readonly:!1,returnMode:r,isSQL92:s}),i.changes=await this.reorderRows(i.changes),Promise.resolve(i))}catch(d){return Promise.reject(d)}}async executeSet(t,n=!0,a="no",r=!0){let s;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(s=await this.sqlite.executeSet({database:this.dbName,set:t,transaction:n,readonly:!1,returnMode:a,isSQL92:r}),s.changes=await this.reorderRows(s.changes),Promise.resolve(s))}catch(i){return Promise.reject(i)}}async isExists(){try{const t=await this.sqlite.isDBExists({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTable(t){try{const n=await this.sqlite.isTableExists({database:this.dbName,table:t,readonly:this.readonly});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async isDBOpen(){try{const t=await this.sqlite.isDBOpen({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async delete(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteDatabase({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async createSyncTable(){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const t=await this.sqlite.createSyncTable({database:this.dbName,readonly:!1});return Promise.resolve(t)}}catch(t){return Promise.reject(t)}}async setSyncDate(t){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.setSyncDate({database:this.dbName,syncdate:t,readonly:!1}),Promise.resolve())}catch(n){return Promise.reject(n)}}async getSyncDate(){try{const t=await this.sqlite.getSyncDate({database:this.dbName,readonly:this.readonly});let n="";return t.syncDate>0&&(n=new Date(t.syncDate*1e3).toISOString()),Promise.resolve(n)}catch(t){return Promise.reject(t)}}async exportToJson(t,n=!1){try{const a=await this.sqlite.exportToJson({database:this.dbName,jsonexportmode:t,readonly:this.readonly,encrypted:n});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async deleteExportedRows(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteExportedRows({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async executeTransaction(t,n=!0){let a=0,r=!1;if(this.readonly)return Promise.reject("not allowed in read-only mode");if(await this.sqlite.beginTransaction({database:this.dbName}),r=await this.sqlite.isTransactionActive({database:this.dbName}),!r)return Promise.reject("After Begin Transaction, no transaction active");try{for(const d of t){if(typeof d!="object"||!("statement"in d))throw new Error("Error a task.statement must be provided");if("values"in d&&d.values&&d.values.length>0){const y=d.statement.toUpperCase().includes("RETURNING")?"all":"no",m=await this.sqlite.run({database:this.dbName,statement:d.statement,values:d.values,transaction:!1,readonly:!1,returnMode:y,isSQL92:n});if(m.changes.changes<0)throw new Error("Error in transaction method run ");a+=m.changes.changes}else{const y=await this.sqlite.execute({database:this.dbName,statements:d.statement,transaction:!1,readonly:!1});if(y.changes.changes<0)throw new Error("Error in transaction method execute ");a+=y.changes.changes}}const s=await this.sqlite.commitTransaction({database:this.dbName});a+=s.changes.changes;const i={changes:{changes:a}};return Promise.resolve(i)}catch(s){const i=s.message?s.message:s;return await this.sqlite.rollbackTransaction({database:this.dbName}),Promise.reject(i)}}async reorderRows(t){const n=t;if(t?.values&&typeof t.values[0]=="object"&&Object.keys(t.values[0]).includes("ios_columns")){const a=t.values[0].ios_columns,r=[];for(let s=1;s<t.values.length;s++){const i=t.values[s],d={};for(const y of a)d[y]=i[y];r.push(d)}n.values=r}return Promise.resolve(n)}}const ba=ve("CapacitorSQLite",{web:()=>Ve(()=>import("./web-DAfyZn_o.js"),[]).then(e=>new e.CapacitorSQLiteWeb),electron:()=>window.CapacitorCustomPlatform.plugins.CapacitorSQLite});function Sa(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}const Ea="laba101_offline",Pe="fresh_start_reset_v1",Ta=new ga(ba);let xe=null;const Z=[{id:1,name:"Laba101 Admin",email:"admin@laba101.test",password:"password",role:"admin",branch:"Main Store"},{id:2,name:"Mintal Branch Admin",email:"admin@laba101.mintal",password:"password",role:"admin",branch:"Mintal Branch"},{id:3,name:"Gensan Branch Admin",email:"admin@laba101.gensan",password:"password",role:"admin",branch:"Gensan Branch"},{id:4,name:"Gensan Branch Staff",email:"staff@laba101.gensan",password:"password",role:"staff",branch:"Gensan Branch"},{id:5,name:"Biya",email:"biya@laba101.mintal",password:"password",role:"staff",branch:"Mintal Branch"},{id:6,name:"Jam",email:"jam@laba101.mintal",password:"password",role:"staff",branch:"Mintal Branch"}],Ie=[],ne=[z(1,"Drop-off","P185. Includes wash, dry, and fold.","Drop-Off","order",185,8,40,["Wash","Dry","Fold"],0,24),z(2,"Full Service","P200. Wash, Fabcon, detergent, dry, and fold.","Full Service","order",200,8,40,["Wash","Dry","Fold","Detergent","Fabcon"],0,24),z(3,"Self Service Wash","P60. Self-service wash (max 8kg per load).","Self Service","order",60,8,null,["Wash"],0,1),z(4,"Self Service Dry","P70. Self-service dry (40 mins).","Self Service","order",70,8,40,["Dry"],0,1),z(6,"Dry 10 mins","Additional drying time (10 mins).","Add-on","addon",30,8,10,["Dry"],0,1),z(7,"Dry 20 mins","Additional drying time (20 mins).","Add-on","addon",50,8,20,["Dry"],0,1),z(8,"Dry 40 mins","Additional drying time (40 mins).","Add-on","addon",70,8,40,["Dry"],0,1),z(9,"Additional Zonrox","Extra Zonrox bleach add-on per load.","Add-on","addon",10,0,null,["Zonrox"],0,0),z(10,"Additional Fabcon","Extra Fabcon fabric conditioner add-on per load.","Add-on","addon",10,0,null,["Fabcon"],0,0),z(11,"Additional Finishing","Extra finishing spray add-on per load.","Add-on","addon",20,0,null,["Finishing"],0,0)],ce=[{id:1,name:"Regular Clothes",maxKg:8,additionalFee:0,isActive:1},{id:2,name:"Comforter",maxKg:4,additionalFee:0,isActive:1},{id:3,name:"Thin Blankets",maxKg:6,additionalFee:0,isActive:1},{id:4,name:"Bedsheets",maxKg:6,additionalFee:0,isActive:1},{id:5,name:"Bath Towels",maxKg:6,additionalFee:0,isActive:1},{id:6,name:"Curtains",maxKg:6,additionalFee:0,isActive:1}];function ht(e,t){const n=$(e,[]),a=new Map(n.map(s=>[s.id,s])),r=t.map(s=>{const i=a.get(s.id);return i?{...s,...i,isActive:i.isActive??s.isActive}:s});(n.length!==r.length||r.some((s,i)=>s.id!==n[i]?.id||JSON.stringify(s)!==JSON.stringify(n[i])))&&A(e,r)}async function wa(){ht("services",ne),ht("item_categories",ce)}async function Ue(e){for(const t of ne)((await e.query("SELECT id FROM laundry_services WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive,t.id]):await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive]);for(const t of ce)((await e.query("SELECT id FROM item_categories WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.maxKg,t.additionalFee,t.isActive,t.id]):await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[t.id,t.name,t.maxKg,t.additionalFee,t.isActive])}const de=[],Ee=[],fe=[],Te=[],we=[],re=[...[1,2,3,4].map(e=>({id:e,machineName:`Washer ${e}`,machineType:"washer",status:"available",branch:"Main Store"})),...[1,2,3,4].map(e=>({id:e+4,machineName:`Dryer ${e}`,machineType:"dryer",status:"available",branch:"Main Store"}))],Ne=[{key:"branch",value:"Main Store"},{key:"fold_rate",value:"5"},{key:"report_email",value:"admin@laba101.test"}];function z(e,t,n,a,r,s,i,d,y,m,l){return{id:e,name:t,description:n,category:a,serviceType:r,price:s,maxKg:i,dryingMinutes:d,includes:y,additionalCharge:m,turnaroundHours:l,isActive:1}}function Y(e){return`laba101-mobile-${e}`}function $(e,t){const n=localStorage.getItem(Y(e));if(!n)return structuredClone(t);try{return JSON.parse(n)}catch{return structuredClone(t)}}function A(e,t){localStorage.setItem(Y(e),JSON.stringify(t))}function G(e){return e.reduce((t,n)=>Math.max(t,n.id),0)+1}function V(){return new Date().toISOString()}function qe(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${a}`}function Na(){return qe().slice(2).replaceAll("-","")}function ae(e,t){if(!e)return t;try{return JSON.parse(e)}catch{return t}}async function O(){return xe||(xe=await Ta.createConnection(Ea,!1,"no-encryption",1,!1),await xe.open()),xe}async function j(e,t,n,a){((await e.query(`PRAGMA table_info(${t})`)).values??[]).some(i=>i.name===n)||await e.execute(`ALTER TABLE ${t} ADD COLUMN ${n} ${a}`)}function Aa(){const e=$("staff",Z),t=new Map(e.map(a=>[a.id,a]));let n=!1;for(const a of Z){const r=t.get(a.id);if(!r){t.set(a.id,{...a,isActive:1}),n=!0;continue}const s={...r,name:a.name,email:a.email,password:a.password,role:a.role,branch:a.branch,isActive:1};JSON.stringify(s)!==JSON.stringify(r)&&(t.set(a.id,s),n=!0)}n&&A("staff",Array.from(t.values()).sort((a,r)=>a.id-r.id))}async function La(){localStorage.getItem(Y(Pe))||(A("staff",Z),A("customers",[]),A("orders",[]),A("payments",[]),A("fold_logs",[]),A("expenses",[]),A("sales",[]),localStorage.getItem(Y("services"))||A("services",ne),localStorage.getItem(Y("item_categories"))||A("item_categories",ce),localStorage.getItem(Y("machines"))||A("machines",re),localStorage.getItem(Y("subcleanings"))||A("subcleanings",[]),localStorage.getItem(Y("settings"))||A("settings",Ne),localStorage.removeItem("laba101-mobile-session"),A(Pe,!0))}async function Dt(e){for(const t of Z){if(((await e.query("SELECT id FROM staff WHERE id = ?",[t.id])).values??[]).length>0){await e.run("UPDATE staff SET name = ?, email = ?, password = ?, role = ?, branch = ?, isActive = 1 WHERE id = ?",[t.name,t.email,t.password,t.role,t.branch,t.id]);continue}await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.email,t.password,t.role,t.branch,1])}}async function Ca(e){if(!(((await e.query("SELECT COUNT(*) as count FROM machines")).values?.[0]?.count??0)>0))for(const n of re)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[n.id,n.machineName,n.machineType,n.status,n.branch])}async function $a(e){for(const t of Ne)await e.run("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)",[t.key,t.value])}async function Ot(e){for(const t of ne)((await e.query("SELECT id FROM laundry_services WHERE id = ?",[t.id])).values??[]).length>0||await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive]);for(const t of ce)((await e.query("SELECT id FROM item_categories WHERE id = ?",[t.id])).values??[]).length>0||await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[t.id,t.name,t.maxKg,t.additionalFee,t.isActive])}async function xa(e){((await e.query("SELECT value FROM settings WHERE key = ?",[Pe])).values??[]).length>0||(await e.execute(`
    DELETE FROM payments;
    DELETE FROM orders;
    DELETE FROM customers;
    DELETE FROM fold_logs;
    DELETE FROM disbursement_expenses;
    DELETE FROM daily_sales;
    DELETE FROM revolving_history;
    DELETE FROM staff WHERE id NOT IN (1, 2);
  `),await Dt(e),await Ot(e),await Ca(e),await $a(e),await e.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",[Pe,V()]),localStorage.removeItem("laba101-mobile-session"))}async function Ra(){if(!x.isNativePlatform()){await La(),!localStorage.getItem(Y("seeded_v4"))&&!localStorage.getItem(Y("services"))&&!localStorage.getItem(Y("staff"))&&(A("staff",Z),A("customers",Ie),A("services",ne),A("item_categories",ce),A("orders",de),A("payments",Ee),A("fold_logs",[]),A("expenses",fe),A("sales",Te),A("revolving_history",we),A("machines",re),A("subcleanings",[]),A("settings",Ne),A("seeded_v4",!0)),await wa(),Aa(),localStorage.getItem(Y("seeded_v4"))||A("seeded_v4",!0);return}const e=await O();await e.execute(`
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
  `),await j(e,"staff","email","TEXT"),await j(e,"staff","password","TEXT"),await j(e,"staff","role","TEXT"),await j(e,"staff","isActive","INTEGER NOT NULL DEFAULT 1"),await e.run('UPDATE staff SET password = ? WHERE password IS NULL OR password = ""',["password"]),await e.run('UPDATE staff SET role = ? WHERE role IS NULL OR role = ""',["staff"]),await j(e,"orders","customerId","INTEGER NOT NULL DEFAULT 0"),await j(e,"orders","phone","TEXT"),await j(e,"orders","serviceId","INTEGER NOT NULL DEFAULT 0"),await j(e,"orders","serviceLines","TEXT"),await j(e,"orders","itemCategoryId","INTEGER NOT NULL DEFAULT 0"),await j(e,"orders","itemCategory",'TEXT NOT NULL DEFAULT "Regular Clothes"'),await j(e,"orders","workflowCompleted","TEXT"),await j(e,"orders","weightKg","REAL NOT NULL DEFAULT 0"),await j(e,"orders","price","REAL NOT NULL DEFAULT 0"),await j(e,"orders","additionalCharge","REAL NOT NULL DEFAULT 0"),await j(e,"orders","extraServiceAmount","REAL NOT NULL DEFAULT 0"),await j(e,"orders","totalAmount","REAL NOT NULL DEFAULT 0"),await j(e,"orders","paidAmount","REAL NOT NULL DEFAULT 0"),await j(e,"orders","extras","TEXT"),await j(e,"orders","notes","TEXT"),await j(e,"orders","foldedByStaffIds","TEXT"),await j(e,"orders","foldedAt","TEXT"),await j(e,"orders","releasedBy","INTEGER"),await j(e,"orders","dueAt","TEXT"),await j(e,"orders","createdAt",'TEXT NOT NULL DEFAULT ""'),await j(e,"daily_sales","saleNumber","TEXT"),await j(e,"daily_sales","status","TEXT"),await j(e,"daily_sales","endorsedTo","TEXT"),await j(e,"daily_sales","statusUpdatedAt","TEXT"),await j(e,"disbursement_expenses","disbursementType",'TEXT NOT NULL DEFAULT "daily"'),await j(e,"subcleanings","cleaningType",'TEXT NOT NULL DEFAULT "tube"');const n=((await e.query("SELECT COUNT(*) as count FROM staff")).values?.[0]?.count??0)===0;if(n){for(const a of Z)await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.name,a.email,a.password,a.role,a.branch,1]);for(const a of Ie)await e.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[a.id,a.name,a.phone,a.address]);for(const a of ne)await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[a.id,a.name,a.description,a.category,a.serviceType,a.price,a.maxKg,a.dryingMinutes,JSON.stringify(a.includes),a.additionalCharge,a.turnaroundHours,a.isActive]);for(const a of ce)await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[a.id,a.name,a.maxKg,a.additionalFee,a.isActive]);for(const a of de)await Pt(e,a);for(const a of Ee)await e.run("INSERT INTO payments (id, orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.orderId,a.amount,a.method,a.reference,a.receivedAt,a.branch]);for(const a of fe)await e.run("INSERT INTO disbursement_expenses (id, expenseDate, number, disbursementType, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[a.id,a.expenseDate,a.number,a.disbursementType??"daily",a.name,a.category,a.description,a.amount]);for(const a of Te)await e.run("INSERT INTO daily_sales (id, saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.saleDate,a.saleNumber,a.cashAmount,a.gcashAmount,a.totalAmount,a.notes]);for(const a of we)await e.run("INSERT INTO revolving_history (id, revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[a.id,a.revolvingNumber,a.name,a.amount,a.category,a.description,a.type,a.createdAt]);for(const a of re)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[a.id,a.machineName,a.machineType,a.status,a.branch]);for(const a of Ne)await e.run("INSERT INTO settings (key, value) VALUES (?, ?)",[a.key,a.value]);await e.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",["fresh_install_defaults",V()])}await Ue(e),await Dt(e),n||await Ot(e),await xa(e)}async function Pt(e,t){await e.run("INSERT INTO orders (id, ticket, customerId, customer, phone, serviceId, service, serviceLines, itemCategoryId, itemCategory, branch, status, workflowCompleted, weightKg, price, additionalCharge, extraServiceAmount, totalAmount, paidAmount, extras, notes, foldedBy, foldedByStaffIds, foldedAt, dueAt, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.ticket,t.customerId,t.customer,t.phone,t.serviceId,t.service,JSON.stringify(t.serviceLines??[]),t.itemCategoryId,t.itemCategory,t.branch,t.status,JSON.stringify(t.workflowCompleted),t.weightKg,t.price,t.additionalCharge,t.extraServiceAmount,t.totalAmount,t.paidAmount,JSON.stringify(t.extras),t.notes,t.foldedBy,JSON.stringify(t.foldedByStaffIds??[]),t.foldedAt??null,t.dueAt,t.createdAt])}function Da(e){const t=Number(e.paidAmount??0),n=Number(e.totalAmount??0),a=Number(e.foldedBy),r=Number(e.releasedBy),s=ae(e.serviceLines,[]),i=Number(e.serviceId),d=String(e.service),y=Number(e.price);return{id:Number(e.id),ticket:String(e.ticket),customerId:Number(e.customerId),customer:String(e.customer),phone:e.phone?String(e.phone):null,serviceId:i,service:d,serviceLines:s.length?s:[{id:i,name:d,price:y,quantity:1,total:y}],itemCategoryId:Number(e.itemCategoryId),itemCategory:String(e.itemCategory),branch:String(e.branch),status:String(e.status),workflowCompleted:ae(e.workflowCompleted,[]),weightKg:Number(e.weightKg),price:y,additionalCharge:Number(e.additionalCharge),extraServiceAmount:Number(e.extraServiceAmount),totalAmount:n,paidAmount:t,balance:Number((n-t).toFixed(2)),extras:ae(e.extras,[]),notes:e.notes?String(e.notes):null,foldedBy:Number.isFinite(a)&&a>0?a:null,foldedByName:e.foldedByName?String(e.foldedByName):null,foldedByStaffIds:ae(e.foldedByStaffIds,[]),foldedAt:e.foldedAt?String(e.foldedAt):null,releasedBy:Number.isFinite(r)&&r>0?r:null,releasedByName:e.releasedByName?String(e.releasedByName):null,dueAt:String(e.dueAt),createdAt:String(e.createdAt)}}async function Oa(){await Ra()}async function me(){return(await Je()).find(t=>t.key==="branch")?.value??"Main Store"}async function Pa(){const e=await Je();return Number(e.find(t=>t.key==="fold_rate")?.value??"5")}async function It(e){return(await Je()).find(n=>n.key===e)?.value}async function Je(){return x.isNativePlatform()?(await(await O()).query("SELECT key, value FROM settings ORDER BY key")).values??[]:$("settings",Ne)}async function De(e,t){if(!x.isNativePlatform()){const a=$("settings",Ne).filter(r=>r.key!==e);a.push({key:e,value:t}),A("settings",a);return}await(await O()).run("REPLACE INTO settings (key, value) VALUES (?, ?)",[e,t])}async function Ia(e){return x.isNativePlatform()?(await(await O()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff WHERE branch = ? ORDER BY name ASC',[e])).values??[]:$("staff",Z).filter(a=>a.branch===e)}async function Qe(){return x.isNativePlatform()?(await(await O()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff ORDER BY name ASC')).values??[]:$("staff",Z)}async function qt(e,t){const n=e.trim().toLowerCase();return(await Qe()).find(r=>r.email.toLowerCase()===n&&r.password===t&&r.isActive!==0)??null}async function qa(e){if(!x.isNativePlatform()){const n=$("staff",Z);n.unshift({id:G(n),...e,isActive:1}),A("staff",n);return}await(await O()).run("INSERT INTO staff (name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?)",[e.name,e.email,e.password,e.role,e.branch,1])}async function gt(e,t){if(!x.isNativePlatform()){const s=$("staff",Z),i=s.find(d=>d.id===e);i&&(Object.assign(i,t),A("staff",s));return}const n=await O(),a=[],r=[];for(const[s,i]of Object.entries(t))s!=="id"&&(a.push(`${s} = ?`),r.push(i));a.length&&(r.push(e),await n.run(`UPDATE staff SET ${a.join(", ")} WHERE id = ?`,r))}async function Fa(){return x.isNativePlatform()?(await(await O()).query("SELECT id, name, phone, address FROM customers ORDER BY name ASC")).values??[]:$("customers",Ie).sort((n,a)=>n.name.localeCompare(a.name))}async function Ma(e){if(!x.isNativePlatform()){const r=$("customers",Ie),s=e.id?r.find(d=>d.id===e.id):r.find(d=>d.name.toLowerCase()===e.name.toLowerCase()&&(e.phone?d.phone===e.phone:!0));if(s)return s.name=e.name,s.phone=e.phone??s.phone,s.address=e.address??s.address,A("customers",r),s;const i={id:G(r),name:e.name,phone:e.phone??null,address:e.address??null};return r.push(i),A("customers",r),i}const t=await O();if(e.id)return await t.run("UPDATE customers SET name = ?, phone = ?, address = ? WHERE id = ?",[e.name,e.phone??null,e.address??null,e.id]),{id:e.id,name:e.name,phone:e.phone??null,address:e.address??null};const n=await t.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM customers"),a=Number((n.values?.[0]).id);return await t.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[a,e.name,e.phone??null,e.address??null]),{id:a,name:e.name,phone:e.phone??null,address:e.address??null}}async function Be(e){if(!x.isNativePlatform())return $("services",ne).filter(a=>!0);const t=await O(),n=await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[]);return(n.values??[]).length===0?(await Ue(t),((await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[])).values??[]).map(r=>({...r,includes:ae(r.includes,[])}))):(n.values??[]).map(a=>({...a,includes:ae(a.includes,[])}))}async function ka(){if(!x.isNativePlatform())return $("services",ne);const e=await O(),t=await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC");return(t.values??[]).length===0?(await Ue(e),((await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC")).values??[]).map(a=>({...a,includes:ae(a.includes,[])}))):(t.values??[]).map(n=>({...n,includes:ae(n.includes,[])}))}async function bt(e){if(!x.isNativePlatform()){const n=$("services",ne),a=e.id?n.find(r=>r.id===e.id):null;a?Object.assign(a,e):n.unshift({...e,id:G(n)}),A("services",n);return}const t=await O();e.id?await t.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = ? WHERE id = ?",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive,e.id]):await t.run("INSERT INTO laundry_services (name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive])}async function Ft(){if(!x.isNativePlatform())return $("item_categories",ce).filter(n=>n.isActive);const e=await O(),t=await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC");return(t.values??[]).length===0?(await Ue(e),(await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC")).values??[]):t.values??[]}async function Ua(e){if(!x.isNativePlatform()){const n=$("item_categories",ce),a=e.id?n.find(r=>r.id===e.id):null;a?Object.assign(a,e):n.unshift({...e,id:G(n)}),A("item_categories",n);return}const t=await O();e.id?await t.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = ? WHERE id = ?",[e.name,e.maxKg,e.additionalFee,e.isActive,e.id]):await t.run("INSERT INTO item_categories (name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?)",[e.name,e.maxKg,e.additionalFee,e.isActive])}function Oe(e,t,n,a){const r=(Array.isArray(e)?e:[e]).map(o=>{const u=Math.max(0,Number(o.quantity??1)),E=Number(o.price);return{id:o.id,name:o.name,price:E,quantity:u,total:Number((E*u).toFixed(2))}}).filter(o=>o.quantity>0),s=Number(t.maxKg),i=0,d=0,y=a.map(o=>{const u=Math.max(0,Number(o.quantity??1)),E=Number(o.price);return{id:o.id,name:Sa(o.name),price:E,quantity:u,total:Number((E*u).toFixed(2))}}).filter(o=>o.quantity>0),m=r.reduce((o,u)=>o+u.total,0),l=y.reduce((o,u)=>o+u.total,0),f=Number((m+d+l).toFixed(2));return{price:Number(m.toFixed(2)),additionalCharge:Number(d.toFixed(2)),extraServiceAmount:Number(l.toFixed(2)),totalAmount:f,allowedKg:s,extraKg:Number(i.toFixed(2)),warning:null,serviceLines:r,extras:y}}function ze(e,t){return[...(e.serviceLines&&e.serviceLines.length?e.serviceLines:e.serviceId?[{id:e.serviceId}]:[]).some(r=>{const s=t.find(i=>i.id===r.id);return Array.isArray(s?.includes)&&s.includes.includes("Fold")})?[{key:"fold",label:"Fold"}]:[],{key:"claimed",label:"Claimed"}]}function Mt(e){return e.includes("claimed")?"claimed":e.includes("fold")?"ready":"received"}function kt(e,t){const n=e.serviceLines?.length?e.serviceLines:e.serviceId?[{id:e.serviceId,quantity:1}]:[];let a=0;return n.forEach(r=>{const s=t.find(i=>i.id===r.id);s&&Array.isArray(s.includes)&&s.includes.includes("Fold")&&(a+=Number(r.quantity??1))}),a>0?a:1}async function Fe(e,t){if(e==="browser"){const n=$("orders",de),a=n.find(r=>r.id===t.id);a&&Object.assign(a,t),A("orders",n);return}await e.run("UPDATE orders SET workflowCompleted = ?, status = ?, foldedBy = ?, foldedByStaffIds = ?, foldedAt = ?, releasedBy = ? WHERE id = ?",[JSON.stringify(t.workflowCompleted),t.status,t.foldedBy,JSON.stringify(t.foldedByStaffIds??[]),t.foldedAt??null,t.releasedBy,t.id])}async function Ut(e,t){if(!t)return;const n=await me(),[a,r]=await Promise.all([he(n),Be()]),s=a.find(l=>l.id===e);if(!s||ze(s,r).find(l=>!s.workflowCompleted.includes(l.key))?.key!=="fold")return;const d=kt(s,r),y=Array.isArray(s.foldedByStaffIds)?[...s.foldedByStaffIds]:[];if(y.length>=d)return;if(y.push(t),s.foldedByStaffIds=y,s.foldedBy=s.foldedBy||t,s.foldedAt=s.foldedAt||V(),y.length>=d&&(s.workflowCompleted=[...s.workflowCompleted,"fold"]),s.status=Mt(s.workflowCompleted),!x.isNativePlatform()){await Fe("browser",s);return}const m=await O();await Fe(m,s)}async function he(e){return x.isNativePlatform()?((await(await O()).query("SELECT o.*, folded.name as foldedByName, released.name as releasedByName FROM orders o LEFT JOIN staff folded ON folded.id = o.foldedBy LEFT JOIN staff released ON released.id = o.releasedBy WHERE o.branch = ? ORDER BY o.id DESC",[e])).values??[]).map(a=>Da(a)):$("orders",de).filter(a=>a.branch===e).map(a=>({...a,serviceLines:a.serviceLines??[{id:a.serviceId,name:a.service,price:Number(a.price),quantity:1,total:Number(a.price)}],foldedByStaffIds:a.foldedByStaffIds??[],foldedAt:a.foldedAt??null,releasedBy:a.releasedBy??null,releasedByName:a.releasedByName??null,balance:Number((a.totalAmount-a.paidAmount).toFixed(2))}))}async function Ba(e){const[t,n]=await Promise.all([Be(),Ft()]),a=e.serviceQuantities??(e.serviceId?{[e.serviceId]:1}:{}),r=t.filter(v=>v.serviceType==="order"&&Number(a[v.id]??0)>0).map(v=>({...v,quantity:Number(a[v.id]??0)})),s=r[0],i=n.find(v=>v.id===e.itemCategoryId)??n.find(v=>v.name.toLowerCase()===(s?.category??"").toLowerCase())??n.find(v=>v.name==="Regular Clothes")??n[0],d=e.addonQuantities??Object.fromEntries((e.addonIds??[]).map(v=>[v,1])),y=t.filter(v=>v.serviceType==="addon"&&Number(d[v.id]??0)>0).map(v=>({...v,quantity:Number(d[v.id]??0)}));if(!r.length&&!y.length)throw new Error("Please select at least one service or extra service.");const m=e.weightKg??Math.max(1,Number(i?.maxKg||s?.maxKg||1)),l=Oe(r,i,m,y),f=await Ma({id:e.customerId||void 0,name:e.customerName,phone:e.customerPhone??null}),o=Math.max(0,e.paidAmount),u=Math.min(l.totalAmount,o),E={ticket:await _a(),customerId:f.id,customer:f.name,phone:f.phone,serviceId:s?.id??0,service:l.serviceLines.length?l.serviceLines.map(v=>`${v.name} x${v.quantity}`).join(", "):"Extras only",serviceLines:l.serviceLines,itemCategoryId:i.id,itemCategory:i.name,branch:e.branch,status:"received",workflowCompleted:["received"],weightKg:m,price:l.price,additionalCharge:l.additionalCharge,extraServiceAmount:l.extraServiceAmount,totalAmount:l.totalAmount,paidAmount:u,balance:Number((l.totalAmount-u).toFixed(2)),extras:l.extras,notes:e.notes||null,foldedBy:null,foldedByName:null,foldedByStaffIds:[],foldedAt:null,releasedBy:null,releasedByName:null,dueAt:new Date(Date.now()+Math.max(1,...r.map(v=>v.turnaroundHours))*60*60*1e3).toISOString(),createdAt:V()};if(!x.isNativePlatform()){const v=$("orders",de),N={...E,id:G(v)};return v.unshift(N),A("orders",v),o>0&&await Ke(N.id,{amount:o,method:e.paymentMethod,reference:e.paymentReference??null}),N}const P=await O(),q=await P.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM orders"),k={...E,id:Number((q.values?.[0]).id)};return await Pt(P,k),o>0&&await P.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[k.id,o,e.paymentMethod,e.paymentReference??null,V(),e.branch]),k}async function _a(){const e=`LB${Na()}`,t=await me(),a=(await he(t)).filter(s=>s.ticket.startsWith(e)).sort((s,i)=>i.ticket.localeCompare(s.ticket))[0],r=a?Number(a.ticket.slice(-3))+1:1;return`${e}-${String(r).padStart(3,"0")}`}async function St(e,t){const n=await me(),[a,r]=await Promise.all([he(n),Be()]),s=a.find(m=>m.id===e);if(!s)return;const d=ze(s,r).map(m=>m.key).find(m=>!s.workflowCompleted.includes(m));if(!d)return;if(d==="fold"){const m=(Array.isArray(t)?t:t?[t]:[]).map(Number).filter(l=>l>0);for(const l of m)await Ut(e,l);return}if(s.workflowCompleted=[...s.workflowCompleted,d],s.status=Mt(s.workflowCompleted),d==="claimed"&&t){const m=Array.isArray(t)?t:[t];s.releasedBy=m[0]||null}if(!x.isNativePlatform()){await Fe("browser",s);return}const y=await O();await Fe(y,s)}async function Ke(e,t){const n=await me();if(!(await he(n)).find(d=>d.id===e))return;const s=Math.max(0,t.amount);if(s<=0)return;if(!x.isNativePlatform()){const d=$("payments",Ee);d.unshift({id:G(d),orderId:e,amount:s,method:t.method,reference:t.reference??null,receivedAt:V(),branch:n}),A("payments",d);const y=$("orders",de),m=y.find(l=>l.id===e);m&&(m.paidAmount=Math.min(m.totalAmount,Number((m.paidAmount+s).toFixed(2)))),A("orders",y);return}const i=await O();await i.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[e,s,t.method,t.reference??null,V(),n]),await i.run("UPDATE orders SET paidAmount = MIN(totalAmount, paidAmount + ?) WHERE id = ?",[s,e])}async function ja(e){return x.isNativePlatform()?(await(await O()).query("SELECT id, orderId, amount, method, reference, receivedAt, branch FROM payments  ORDER BY receivedAt DESC",[])).values??[]:$("payments",Ee).filter(a=>!0)}async function Ha(e){const t=await me(),a=(await he(t)).find(s=>s.id===e);if(!a)return;if(a.paidAmount>0)throw new Error("Cancel is only allowed for unpaid orders. Use Delete (admin) to refund paid orders.");if(!x.isNativePlatform()){const s=$("orders",de),i=$("payments",Ee),d=$("fold_logs",[]),y=s.filter(f=>f.id!==e),m=i.filter(f=>f.orderId!==e),l=d.filter(f=>f.orderTicket!==a.ticket);A("orders",y),A("payments",m),A("fold_logs",l);return}const r=await O();await r.run("DELETE FROM payments WHERE orderId = ?",[e]),await r.run("DELETE FROM fold_logs WHERE orderTicket = ?",[a.ticket]),await r.run("DELETE FROM orders WHERE id = ?",[e])}async function Wa(e){const t=await me(),a=(await he(t)).find(s=>s.id===e);if(!a)return;if(a.paidAmount<=0)throw new Error("Delete (refund) is only allowed for paid orders.");if(!x.isNativePlatform()){const s=$("orders",de),i=$("payments",Ee),d=$("fold_logs",[]),y=s.filter(f=>f.id!==e),m=i.filter(f=>f.orderId!==e),l=d.filter(f=>f.orderTicket!==a.ticket);A("orders",y),A("payments",m),A("fold_logs",l);return}const r=await O();await r.run("DELETE FROM payments WHERE orderId = ?",[e]),await r.run("DELETE FROM fold_logs WHERE orderTicket = ?",[a.ticket]),await r.run("DELETE FROM orders WHERE id = ?",[e])}async function Xa(){return x.isNativePlatform()?(await(await O()).query("SELECT id, orderTicket, staffName, foldCount, rate, total, createdAt FROM fold_logs ORDER BY id DESC")).values??[]:$("fold_logs",[])}async function Ga(e){const t=Number((e.foldCount*e.rate).toFixed(2));if(!x.isNativePlatform()){const a=$("fold_logs",[]);a.unshift({id:Date.now(),...e,total:t,createdAt:V()}),A("fold_logs",a);return}await(await O()).run("INSERT INTO fold_logs (orderTicket, staffName, foldCount, rate, total, createdAt) VALUES (?, ?, ?, ?, ?, ?)",[e.orderTicket,e.staffName,e.foldCount,e.rate,t,V()])}async function Ka(e){return x.isNativePlatform()?(await(await O()).query("SELECT id, timestamp, staffId, staffName, action, details, branch FROM activity_logs WHERE branch = ? ORDER BY timestamp DESC, id DESC",[e])).values??[]:$("activity_logs",[]).filter(a=>a.branch===e).sort((a,r)=>r.timestamp.localeCompare(a.timestamp))}async function Ya(e){const t={timestamp:V(),staffId:e.staffId??null,staffName:e.staffName,action:e.action,details:e.details??"",branch:e.branch};if(!x.isNativePlatform()){const a=$("activity_logs",[]);a.unshift({id:G(a),...t}),A("activity_logs",a);return}await(await O()).run("INSERT INTO activity_logs (timestamp, staffId, staffName, action, details, branch) VALUES (?, ?, ?, ?, ?, ?)",[t.timestamp,t.staffId,t.staffName,t.action,t.details,t.branch])}async function Va(){return x.isNativePlatform()?(await(await O()).query('SELECT id, expenseDate, number, COALESCE(disbursementType, "daily") as disbursementType, name, category, description, amount FROM disbursement_expenses ORDER BY expenseDate DESC, id DESC')).values??[]:$("expenses",fe).map(n=>({...n,disbursementType:n.disbursementType??"daily"}))}function je(e){const t=/^DISB-(\d+)$/i.exec(String(e??"").trim());return t?Number(t[1]):0}function Et(e){const t=/^REV-(\d+)$/i.exec(String(e??"").trim());return t?Number(t[1]):0}async function Ja(){let e=0;if(!x.isNativePlatform()){const r=$("expenses",fe),s=$("revolving_history",we);for(const i of r)e=Math.max(e,je(i.number));for(const i of s)i.type==="disbursement"&&(e=Math.max(e,je(i.revolvingNumber)));return e}const t=await O(),n=await t.query("SELECT number FROM disbursement_expenses"),a=await t.query("SELECT revolvingNumber as number FROM revolving_history WHERE type = 'disbursement'");for(const r of[...n.values??[],...a.values??[]])e=Math.max(e,je(String(r.number)));return e}async function Bt(){const e=await Ja()+1;return`DISB-${String(e).padStart(2,"0")}`}async function Qa(){let e=0;if(!x.isNativePlatform()){const a=$("revolving_history",we);for(const r of a)r.type==="add"&&(e=Math.max(e,Et(r.revolvingNumber)));return`REV-${String(e+1).padStart(2,"0")}`}const n=await(await O()).query("SELECT revolvingNumber FROM revolving_history WHERE type = 'add'");for(const a of n.values??[])e=Math.max(e,Et(String(a.revolvingNumber)));return`REV-${String(e+1).padStart(2,"0")}`}async function _t(e){if(!x.isNativePlatform()){const n=$("expenses",fe),a=G(n);n.unshift({id:a,expenseDate:e.expenseDate,number:e.number,disbursementType:e.disbursementType??"daily",name:e.name,category:e.category,description:e.description||null,amount:e.amount}),A("expenses",n);return}await(await O()).run("INSERT INTO disbursement_expenses (expenseDate, number, disbursementType, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?, ?)",[e.expenseDate,e.number,e.disbursementType??"daily",e.name,e.category,e.description||null,e.amount])}async function za(e){const t=await Bt();await _t({expenseDate:e.expenseDate,number:t,disbursementType:e.disbursementType??"daily",name:e.name,category:e.category,description:e.description,amount:e.amount})}async function Za(e,t){if(!x.isNativePlatform()){const a=$("expenses",fe),r=a.find(s=>s.id===e);r&&(Object.assign(r,{expenseDate:t.expenseDate,disbursementType:t.disbursementType??"daily",name:t.name,category:t.category,description:t.description||null,amount:t.amount}),A("expenses",a));return}await(await O()).run("UPDATE disbursement_expenses SET expenseDate = ?, disbursementType = ?, name = ?, category = ?, description = ?, amount = ? WHERE id = ?",[t.expenseDate,t.disbursementType??"daily",t.name,t.category,t.description||null,t.amount,e])}async function en(e){if(!x.isNativePlatform()){const n=$("expenses",fe);A("expenses",n.filter(a=>a.id!==e));return}await(await O()).run("DELETE FROM disbursement_expenses WHERE id = ?",[e])}async function tn(){return x.isNativePlatform()?(await(await O()).query('SELECT id, saleDate, COALESCE(saleNumber, "") as saleNumber, cashAmount, gcashAmount, totalAmount, notes, status, endorsedTo, statusUpdatedAt FROM daily_sales ORDER BY saleDate DESC, id DESC')).values??[]:$("sales",Te)}async function an(e){const t=Number((e.cashAmount+e.gcashAmount).toFixed(2));if(!x.isNativePlatform()){const s=$("sales",Te),i=e.id?s.find(d=>d.id===e.id):s.find(d=>d.saleDate===e.saleDate);if(i)Object.assign(i,{saleDate:e.saleDate,cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null});else{const d=G(s);s.unshift({id:d,saleDate:e.saleDate,saleNumber:`SALE-${String(d).padStart(2,"0")}`,cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null})}A("sales",s);return}const n=await O(),r=(e.id?await n.query("SELECT id, saleNumber FROM daily_sales WHERE id = ?",[e.id]):await n.query("SELECT id, saleNumber FROM daily_sales WHERE saleDate = ?",[e.saleDate])).values?.[0];if(r)await n.run("UPDATE daily_sales SET saleDate = ?, cashAmount = ?, gcashAmount = ?, totalAmount = ?, notes = ? WHERE id = ?",[e.saleDate,e.cashAmount,e.gcashAmount,t,e.notes||null,r.id]);else{const s=await n.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM daily_sales"),i=Number((s.values?.[0]).id);await n.run("INSERT INTO daily_sales (saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?)",[e.saleDate,`SALE-${String(i).padStart(2,"0")}`,e.cashAmount,e.gcashAmount,t,e.notes||null])}}async function nn(e){if(!x.isNativePlatform()){const n=$("sales",Te);A("sales",n.filter(a=>a.id!==e));return}await(await O()).run("DELETE FROM daily_sales WHERE id = ?",[e])}async function Tt(e,t,n=null,a){if(!x.isNativePlatform()){const s=$("sales",Te),i=s.find(d=>d.id===e);i&&(i.status=t,i.endorsedTo=n,i.statusUpdatedAt=a,A("sales",s));return}await(await O()).run("UPDATE daily_sales SET status = ?, endorsedTo = ?, statusUpdatedAt = ? WHERE id = ?",[t,n,a,e])}async function rn(){return x.isNativePlatform()?(await(await O()).query("SELECT id, revolvingNumber, name, amount, category, description, type, createdAt FROM revolving_history ORDER BY createdAt DESC, id DESC")).values??[]:$("revolving_history",we).sort((n,a)=>a.createdAt.localeCompare(n.createdAt))}async function wt(e){const t=e.type==="disbursement"?await Bt():await Qa();if(e.type==="disbursement"){const a=e.expenseDate??e.createdAt.slice(0,10);await _t({expenseDate:a,number:t,name:e.name,category:e.category,description:e.description??"",amount:e.amount})}if(!x.isNativePlatform()){const a=$("revolving_history",we),r=G(a);a.unshift({id:r,revolvingNumber:t,...e}),A("revolving_history",a);return}await(await O()).run("INSERT INTO revolving_history (revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)",[t,e.name,e.amount,e.category,e.description||null,e.type,e.createdAt])}async function jt(e){return x.isNativePlatform()?(await(await O()).query("SELECT id, machineName, machineType, status, branch FROM machines WHERE branch = ? ORDER BY machineType, machineName",[e])).values??[]:$("machines",re).filter(a=>a.branch===e)}async function Ht(e){return x.isNativePlatform()?(await(await O()).query("SELECT id, name, unit, quantity, reorderLevel, notes, branch, updatedAt FROM inventory_items WHERE branch = ? ORDER BY name ASC",[e])).values??[]:$("inventory_items",[]).filter(a=>a.branch===e).sort((a,r)=>a.name.localeCompare(r.name))}async function sn(e){const t={name:e.name,unit:e.unit,quantity:e.quantity,reorderLevel:e.reorderLevel,notes:e.notes||null,branch:e.branch,updatedAt:V()};if(!x.isNativePlatform()){const a=$("inventory_items",[]),r=e.id?a.find(s=>s.id===e.id):null;r?Object.assign(r,t):a.unshift({id:G(a),...t}),A("inventory_items",a);return}const n=await O();e.id?await n.run("UPDATE inventory_items SET name = ?, unit = ?, quantity = ?, reorderLevel = ?, notes = ?, updatedAt = ? WHERE id = ?",[t.name,t.unit,t.quantity,t.reorderLevel,t.notes,t.updatedAt,e.id]):await n.run("INSERT INTO inventory_items (name, unit, quantity, reorderLevel, notes, branch, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)",[t.name,t.unit,t.quantity,t.reorderLevel,t.notes,t.branch,t.updatedAt])}async function on(e){return x.isNativePlatform()?(await(await O()).query("SELECT id, itemId, itemName, movementType, quantity, notes, staffName, branch, createdAt FROM inventory_movements WHERE branch = ? ORDER BY createdAt DESC, id DESC",[e])).values??[]:$("inventory_movements",[]).filter(a=>a.branch===e).sort((a,r)=>r.createdAt.localeCompare(a.createdAt))}async function ln(e){const t=Math.max(0,Number(e.quantity||0));if(t<=0)throw new Error("Quantity must be greater than zero.");const a=(await Ht(e.branch)).find(d=>d.id===e.itemId);if(!a)throw new Error("Inventory item not found.");const r=e.movementType==="in"?a.quantity+t:a.quantity-t;if(r<0)throw new Error("Stock-out quantity is greater than current stock.");const s={itemId:a.id,itemName:a.name,movementType:e.movementType,quantity:t,notes:e.notes||null,staffName:e.staffName,branch:e.branch,createdAt:V()};if(!x.isNativePlatform()){const d=$("inventory_items",[]),y=d.find(l=>l.id===a.id);y&&(y.quantity=Number(r.toFixed(2)),y.updatedAt=s.createdAt),A("inventory_items",d);const m=$("inventory_movements",[]);m.unshift({id:G(m),...s}),A("inventory_movements",m);return}const i=await O();await i.run("UPDATE inventory_items SET quantity = ?, updatedAt = ? WHERE id = ?",[Number(r.toFixed(2)),s.createdAt,a.id]),await i.run("INSERT INTO inventory_movements (itemId, itemName, movementType, quantity, notes, staffName, branch, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[s.itemId,s.itemName,s.movementType,s.quantity,s.notes,s.staffName,s.branch,s.createdAt])}async function cn(e){if(!x.isNativePlatform()){const n=$("machines",re);n.unshift({id:G(n),...e}),A("machines",n);return}await(await O()).run("INSERT INTO machines (machineName, machineType, status, branch) VALUES (?, ?, ?, ?)",[e.machineName,e.machineType,e.status,e.branch])}async function dn(e,t){if(!x.isNativePlatform()){const a=$("machines",re),r=a.find(s=>s.id===e);r&&(r.status=t,A("machines",a));return}await(await O()).run("UPDATE machines SET status = ? WHERE id = ?",[t,e])}async function un(e){return x.isNativePlatform()?((await(await O()).query('SELECT id, date, machineIds, machineNames, cleaningStatus, COALESCE(cleaningType, "tube") as cleaningType, notes, branch FROM subcleanings WHERE branch = ? ORDER BY date DESC, id DESC',[e])).values??[]).map(a=>({...a,machineIds:ae(a.machineIds,[])})):$("subcleanings",[]).filter(a=>a.branch===e).map(a=>({...a,cleaningType:a.cleaningType??"tube"}))}async function Wt(e){const n=(await jt(e.branch)).filter(i=>e.machineIds.includes(i.id)).map(i=>i.machineName).join(", "),a=e.cleaningType??"tube";if(!x.isNativePlatform()){const i=$("subcleanings",[]);i.unshift({id:G(i),date:e.date,machineIds:e.machineIds,machineNames:n,cleaningStatus:e.cleaningStatus,cleaningType:a,notes:e.notes||null,branch:e.branch}),A("subcleanings",i);const d=$("machines",re);d.forEach(y=>{e.machineIds.includes(y.id)&&(y.status=e.cleaningStatus==="completed"?"available":"under_cleaning")}),A("machines",d);return}const r=await O();await r.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, cleaningType, notes, branch) VALUES (?, ?, ?, ?, ?, ?, ?)",[e.date,JSON.stringify(e.machineIds),n,e.cleaningStatus,a,e.notes||null,e.branch]);const s=e.cleaningStatus==="completed"?"available":"under_cleaning";for(const i of e.machineIds)await r.run("UPDATE machines SET status = ? WHERE id = ?",[s,i])}async function mn(e,t){if(!x.isNativePlatform()){const i=$("machines",re),d=i.find(l=>l.id===e);d&&(d.status="available"),A("machines",i);const y=$("subcleanings",[]),m=qe();y.unshift({id:G(y),date:m,machineIds:[e],machineNames:d?.machineName??"",cleaningStatus:"completed",cleaningType:"tube",notes:null,branch:t}),A("subcleanings",y);return}const n=await O(),r=(await n.query("SELECT machineName FROM machines WHERE id = ?",[e])).values?.[0]?.machineName??"";await n.run("UPDATE machines SET status = ? WHERE id = ?",["available",e]);const s=qe();await n.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, cleaningType, notes, branch) VALUES (?, ?, ?, ?, ?, ?, ?)",[s,JSON.stringify([e]),r,"completed","tube",null,t])}async function yn(e,t){await Wt({date:qe(),machineIds:[],cleaningStatus:"completed",cleaningType:"general",notes:`Confirmed by ${t}`,branch:e})}const Ze=document.querySelector("#app");if(!Ze)throw new Error("App root not found");let Re;const ue=ve("BluetoothThermalPrinter"),et={dashboard:"Dashboard",pos:"POS",orders:"Orders",archived:"Archived Order",customers:"Customers",pricing:"Pricing Services",disbursements:"Daily Report",reports:"Reports",logs:"Logs",inventory:"Inventory",maintenance:"Maintenance",staff:"Staff",revolving:"Revolving Fund",settings:"Settings"},c={tab:"dashboard",receiptOrderId:0,currentUser:null,loginError:"",sidebarOpen:!1,dailyReportTab:"expenses",maintenanceTab:"cleaning",customerSearch:"",orderSearch:"",orderDateFilter:"",orderPaymentFilter:"",printerPanelOpen:!1,printerLoading:!1,printerError:"",printerStatus:"",printerPaperWidth:58,pairedPrinters:[],selectedPrinterAddress:"",archivedOrderSearch:"",paymentModalOrderId:0,dashboardSummaryModalOpen:!1,reportPreview:null,monthlySummaryMonth:pe(),endorseModalOpen:!1,endorseSaleId:0,endorseSaleDate:"",revolvingModalOpen:!1,revolvingSaleId:0,addFundModalOpen:!1,disbursementModalOpen:!1,revolvingHistoryFrom:"",revolvingHistoryTo:""},fn=["Wash","Dry","Fold","Detergent","Fabcon","Zonrox","Finishing"],Nt=["Supplies","Utilities","Maintenance","Salary","Rent","Transport","Other"],Ce="laba101-mobile-session";function T(e){return new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(e||0)}function p(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function oe(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}function tt(e,t){return Number((e-t).toFixed(2))}function Xt(e,t,n,a=0){const r=t.filter(i=>K(i.createdAt)===e).reduce((i,d)=>i+d.paidAmount,0),s=n.filter(i=>le(i)==="daily"&&i.expenseDate===e).reduce((i,d)=>i+d.amount,0);return tt(r+a,s)}function pn(e,t){const n=new Map(t.map(r=>[r.id,r.name])),a=new Map;return e.filter(r=>(r.foldedByStaffIds?.length??0)>0||r.workflowCompleted.includes("fold")).forEach(r=>{(Array.isArray(r.foldedByStaffIds)&&r.foldedByStaffIds.length?r.foldedByStaffIds:r.foldedBy?[r.foldedBy]:[]).forEach(i=>{if(!i)return;const d=n.get(i)??String(i),y=a.get(i)??{staffId:i,staffName:d,folds:0};y.folds+=1,a.set(i,y)})}),e.filter(r=>r.workflowCompleted.includes("fold")&&r.foldedByName&&r.foldedBy).forEach(r=>{const s=a.get(r.foldedBy);s&&s.staffName===String(r.foldedBy)&&(s.staffName=r.foldedByName)}),Array.from(a.values()).map(r=>({staffName:r.staffName,folds:r.folds}))}function vn(e){return e.foldedAt?K(e.foldedAt):K(e.createdAt)}function At(e){const t=e.match(/(\d+)$/);return t?Number(t[1]):0}function Q(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${a}`}function W(){return Q()}function pe(){return W().slice(0,7)}function Gt(e){return`${e}-01`}function hn(e){const[t,n]=e.split("-").map(a=>Number(a));return!Number.isFinite(t)||!Number.isFinite(n)?Gt(pe()):Q(new Date(t,n,0))}function at(e){const[t,n]=e.split("-").map(a=>Number(a));return!Number.isFinite(t)||!Number.isFinite(n)?e:new Intl.DateTimeFormat("en-PH",{month:"long",year:"numeric"}).format(new Date(t,n-1,1))}function nt(e){return e.toLowerCase().includes("mintal")?"Mintal, Davao City":e}function gn(e){const t=(e.category??"Uncategorized").trim();return/^other(s)?$/i.test(t)&&e.name.trim()||t}function Kt(e,t){const n=new Date(`${e}T00:00:00`),a=new Date(`${t}T00:00:00`);if(Number.isNaN(n.getTime())||Number.isNaN(a.getTime()))return!1;const r=Q(new Date(n.getFullYear(),n.getMonth(),1)),s=Q(new Date(n.getFullYear(),n.getMonth()+1,0));return e===r&&t===s}function bn(e,t,n,a,r,s,i="left"){const d=String(t??"").split(/\s+/).filter(Boolean);if(!d.length)return e.textAlign=i,e.fillText("",n,a),a+s;const y=[];let m=d.shift()??"";for(const l of d){const f=`${m} ${l}`.trim();e.measureText(f).width>r&&m?(y.push(m),m=l):m=f}return y.push(m),e.textAlign=i,y.forEach((l,f)=>e.fillText(l,n,a+f*s)),a+y.length*s}function Sn(e){return e.split(",")[1]??""}function En(e){return`laba101-monthly-summary-${e}.jpg`}function Tn(e,t,n,a,r,s,i,d,y){const m=Gt(d),l=hn(d),f=rt(e,t,n,a,r,s,i,{from:m,to:l,types:["summary"]},y),o=f.salesRows(),u=f.disbursementRows(),E=Number((o.totalSales-u.totalDisbursement).toFixed(2));return{monthValue:d,monthLabel:at(d),branchLabel:nt(y),salesData:o,disbData:u,totalDisbursement:u.totalDisbursement,netIncome:E}}function wn(e){const y=540+Math.max(e.disbData.categoryTotals.length,1)*64+260,m=document.createElement("canvas");m.width=1240,m.height=y;const l=m.getContext("2d");if(!l)throw new Error("Canvas is not available.");l.fillStyle="#ffffff",l.fillRect(0,0,1240,y),l.fillStyle="#061a42",l.font="800 58px Arial",l.textAlign="center",l.fillText("Laba 101",1240/2,106),l.fillStyle="#64748b",l.font="500 28px Arial",l.fillText(e.branchLabel,1240/2,152),l.fillText(`For the month of ${e.monthLabel}`,1240/2,192);const f=u=>{l.strokeStyle="#dbe3ef",l.lineWidth=2,l.beginPath(),l.moveTo(84,u),l.lineTo(1156,u),l.stroke()};let o=238;return f(o),o+=42,l.textAlign="left",l.fillStyle="#061a42",l.font="800 34px Arial",l.fillText("Total sales",84,o),o+=50,l.font="500 28px Arial",l.fillStyle="#475569",l.fillText("Cash:",84,o),l.textAlign="right",l.fillStyle="#061a42",l.font="700 28px Arial",l.fillText(T(e.salesData.totalCash),1156,o),o+=34,l.textAlign="left",l.fillStyle="#475569",l.font="500 28px Arial",l.fillText("GCash:",84,o),l.textAlign="right",l.fillStyle="#061a42",l.font="700 28px Arial",l.fillText(T(e.salesData.totalGcash),1156,o),o+=34,l.textAlign="left",l.fillStyle="#475569",l.font="500 28px Arial",l.fillText("Total:",84,o),l.textAlign="right",l.fillStyle="#061a42",l.font="800 34px Arial",l.fillText(T(e.salesData.totalSales),1156,o),o+=34,f(o),o+=42,l.textAlign="left",l.fillStyle="#061a42",l.font="800 34px Arial",l.fillText("Total disbursement",84,o),o+=50,l.font="500 28px Arial",e.disbData.categoryTotals.forEach(u=>{l.fillStyle="#475569",o=bn(l,`${u.category}:`,84,o,852,34),l.textAlign="right",l.fillStyle="#061a42",l.font="700 28px Arial",l.fillText(T(u.amount),1156,o-34),o+=14}),e.disbData.categoryTotals.length||(l.fillStyle="#64748b",l.textAlign="left",l.font="500 28px Arial",l.fillText("No disbursement records found.",84,o),o+=34),l.textAlign="left",l.fillStyle="#475569",l.font="500 28px Arial",l.fillText("Total:",84,o+12),l.textAlign="right",l.fillStyle="#061a42",l.font="800 34px Arial",l.fillText(T(e.totalDisbursement),1156,o+12),o+=54,f(o),o+=54,l.textAlign="left",l.fillStyle="#061a42",l.font="800 34px Arial",l.fillText("Net income",84,o),l.textAlign="right",l.fillStyle=e.netIncome>=0?"#16a34a":"#dc2626",l.font="800 44px Arial",l.fillText(T(e.netIncome),1156,o),m.toDataURL("image/jpeg",.92)}function le(e){return e.disbursementType==="monthly"?"monthly":"daily"}function Yt(e){return e.slice(0,7)}function Vt(e){return le(e)==="monthly"?Yt(e.expenseDate):e.expenseDate}function K(e){return Q(new Date(e))}function Me(e){return e.paidAmount<=0?"unpaid":e.balance>0?"partial":"paid"}function Jt(e,t,n){const a=new Map(t.map(i=>[i.id,i])),r=new Map(t.map(i=>[i.id,Number(i.totalAmount||0)])),s={cash:0,gcash:0,total:0};return[...e].sort((i,d)=>new Date(i.receivedAt).getTime()-new Date(d.receivedAt).getTime()||i.id-d.id).forEach(i=>{const d=a.get(i.orderId);if(!d)return;const y=r.get(d.id)??0,m=Math.min(Math.max(0,Number(i.amount||0)),y);r.set(d.id,Number((y-m).toFixed(2))),!(!n(i)||m<=0)&&(i.method==="gcash"?s.gcash+=m:s.cash+=m,s.total+=m)}),{cash:Number(s.cash.toFixed(2)),gcash:Number(s.gcash.toFixed(2)),total:Number(s.total.toFixed(2))}}function be(e){return new Intl.DateTimeFormat("en-PH",{dateStyle:"medium",timeStyle:"short"}).format(new Date(e))}function ke(e){const t=new Date(e),n=new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric",year:"numeric"}).format(t),a=new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",hour12:!0}).format(t);return`<div class="datetime-stack"><strong>${p(n)}</strong><span class="meta">${p(a)}</span></div>`}function Nn(e){return e?.role==="staff"&&e.branch==="Gensan Branch"}function An(e){return e?.role==="staff"&&e.branch.toLowerCase().includes("mintal")}async function J(e,t=""){c.currentUser&&await Ya({staffId:c.currentUser.id,staffName:c.currentUser.name,action:e,details:t,branch:await me()})}async function Ln(e){return(await Qe()).filter(n=>n.role==="admin"&&n.isActive!==0).some(n=>n.password===e)}function se(e,t,n="data-table"){return`
    <div class="table-scroll">
      <table class="${n}">
        <thead><tr>${e.map(a=>`<th>${p(a)}</th>`).join("")}</tr></thead>
        <tbody>${t.length?t.map(a=>`<tr>${a.map(r=>`<td>${r}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${e.length}" class="table-empty">No records found.</td></tr>`}</tbody>
      </table>
    </div>
  `}function Cn(e=new Date){return{date:new Intl.DateTimeFormat("en-PH",{weekday:"long",month:"long",day:"numeric",year:"numeric"}).format(e),time:new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",second:"2-digit",hour12:!0}).format(e)}}function He(){const e=document.querySelector("[data-date-from]"),t=document.querySelector("[data-date-to]"),n=Array.from(document.querySelectorAll('input[name="reportType"]:checked')).map(a=>a.value).filter(a=>a==="sales"||a==="disbursement"||a==="fold_count"||a==="revolving_fund"||a==="summary");return{from:e?.value||"0000-01-01",to:t?.value||"9999-12-31",types:n.length?n:["summary"]}}function ye(e,t){return e>=t.from&&e<=t.to}function rt(e,t,n,a,r,s,i,d,y=""){const m=new Set(d.types),l=n.filter(g=>ye(g.saleDate,d)),f=a.filter(g=>ye(g.expenseDate,d)),o=e.filter(g=>((g.foldedByStaffIds?.length??0)>0||g.workflowCompleted.includes("fold"))&&ye(vn(g),d)),u=pn(o,s),E=t.filter(g=>ye(K(g.receivedAt),d)),P=new Set(E.map(g=>g.orderId)),q=new Set(t.map(g=>g.orderId)),k=e.filter(g=>ye(K(g.createdAt),d)||P.has(g.id)),v=new Map;E.forEach(g=>{const I=v.get(g.orderId)??{cash:0,gcash:0};g.method==="gcash"?I.gcash+=g.amount:I.cash+=g.amount,v.set(g.orderId,I)});const N=g=>q.has(g.id)?v.get(g.id)??{cash:0,gcash:0}:ye(K(g.createdAt),d)?{cash:g.paidAmount,gcash:0}:{cash:0,gcash:0},L=k.reduce((g,I)=>{const _=N(I),X=_.cash+_.gcash;if(X>I.totalAmount&&I.totalAmount>0&&q.has(I.id)){const ie=I.totalAmount/X;return g+_.cash*ie}return g+_.cash},0),F=l.reduce((g,I)=>g+I.cashAmount,0),S=l.reduce((g,I)=>g+I.gcashAmount,0),h=k.reduce((g,I)=>{const _=N(I),X=_.cash+_.gcash;if(X>I.totalAmount&&I.totalAmount>0&&q.has(I.id)){const ie=I.totalAmount/X;return g+_.gcash*ie}return g+_.gcash},0),b=L+F,C=h+S,R=b+C,D=f.reduce((g,I)=>g+I.amount,0),U=D,B=R-U,ee=()=>({orderCashTotal:L,orderGcashTotal:h,manualCashTotal:F,manualGcashTotal:S,totalCash:b,totalGcash:C,totalSales:R,transactions:k.map(g=>{const I=N(g),_=I.cash+I.gcash;let X=I.cash,ie=I.gcash,Le=_;if(_>g.totalAmount&&g.totalAmount>0&&q.has(g.id)){const ct=g.totalAmount/_;X=I.cash*ct,ie=I.gcash*ct,Le=g.totalAmount}return{ticket:g.ticket,customer:g.customer,cash:X,gcash:ie,total:Le}}),manualSales:l.map(g=>({cash:g.cashAmount,gcash:g.gcashAmount,total:g.totalAmount}))}),te=()=>{const g=new Map;f.forEach(_=>{const X=gn(_);g.set(X,(g.get(X)??0)+_.amount)});const I=Array.from(g.entries()).map(([_,X])=>({category:_,amount:X}));return{totalExpenses:D,totalDisbursement:U,categoryTotals:I,rows:[["Date/Month","id#","Type","Name","Category","Description","Amount"],...f.map(_=>[Vt(_),_.number,le(_),_.name,_.category??"",_.description??"",_.amount]),[],["Total Disbursement","","","","","",U]]}},H=()=>({rows:[["Staff","Fold Count"],...u.map(g=>[g.staffName,g.folds]),[],["Total Folds",u.reduce((g,I)=>g+I.folds,0)]]}),Ae=r.filter(g=>ye(K(g.createdAt),d));return{selection:d,selectedTypes:m,salesRows:ee,disbursementRows:te,foldCountRows:H,revolvingDailySummaryRows:()=>({rows:[["Date of Sales","Cash on Hand","Status","Date Update"],...l.map(g=>{const I=Xt(g.saleDate,e,a,g.cashAmount),_=g.status==="revolving"?"Revolving":g.status==="endorsed"?`Endorsed to ${g.endorsedTo??""}`:"Pending";return[g.saleDate,I,_,g.statusUpdatedAt?K(g.statusUpdatedAt):""]})]}),revolvingHistoryRows:()=>({rows:[["Date","Number","Name","Amount","Category","Description","Type"],...Ae.map(g=>[K(g.createdAt),g.revolvingNumber,g.name,g.type==="disbursement"?-g.amount:g.amount,g.category,g.description??"",g.type==="add"?"Add Revolving Fund":"Disbursement"])]}),summaryRows:()=>{const g=ee(),I=te(),_=tt(g.totalCash,I.totalDisbursement),X=Number((g.totalSales-I.totalDisbursement).toFixed(2)),ie=Kt(d.from,d.to)?at(d.from.slice(0,7)):`${d.from} to ${d.to}`;return[["Laba 101"],[nt(y)],[`For the month of ${ie}`],[],["Total sales"],["Cash","",g.totalCash],["GCash","",g.totalGcash],["Total","",g.totalSales],[],["Total disbursement"],...I.categoryTotals.map(Le=>[Le.category,"",Le.amount]),["Total disbursement","",I.totalDisbursement],[],["Cash on hand","",_],["Net income","",X]]},profit:B}}function $n(e,t){return`<button class="nav-link ${t?"is-active":""}" data-tab="${e}" type="button">
    <span class="nav-icon">${xn(e)}</span>
    <span>${et[e]}</span>
  </button>`}function M(e,t){return`<div class="section-head"><div><h2>${p(e)}</h2><p class="meta">${p(t)}</p></div></div>`}function Lt(){return et[c.tab]??"Dashboard"}function We(e){return(e?.name??"Laba101").trim().slice(0,1).toUpperCase()}function xn(e){return{dashboard:"DB",pos:"POS",orders:"PO",archived:"AR",customers:"CU",pricing:"PS",disbursements:"DR",reports:"RP",logs:"LG",inventory:"IN",maintenance:"MT",staff:"ST",revolving:"RV",settings:"SE"}[e]}async function Qt(){const e=await me(),t=await Ia(e),n=await Qe(),a=await Fa(),r=await Be(),s=await ka(),i=await Ft(),d=await he(e),y=await ja(),m=await Xa(),l=await Va(),f=await tn(),o=await jt(e),u=await un(e),E=await Ka(e),P=await Ht(e),q=await on(e),k=await rn(),v=await Pa(),N=await It("report_email");return{branch:e,staff:t,allStaff:n,customers:a,services:r,allServices:s,categories:i,orders:d,payments:y,foldLogs:m,expenses:l,sales:f,machines:o,subcleanings:u,activityLogs:E,inventoryItems:P,inventoryMovements:q,revolvingHistory:k,foldRate:v,reportEmail:N??""}}async function w(){if(!c.currentUser){Rn(),zn();return}const e=await Qt();e.orders.filter(u=>u.status!=="claimed").length,e.orders.filter(u=>u.status==="ready").length;const t=e.orders.reduce((u,E)=>u+E.paidAmount,0),n=W(),a=Jt(e.payments,e.orders,u=>u.branch===e.branch&&K(u.receivedAt)===n),r=a.gcash+e.sales.filter(u=>u.saleDate===n).reduce((u,E)=>u+E.gcashAmount,0),s=a.cash+e.sales.filter(u=>u.saleDate===n).reduce((u,E)=>u+E.cashAmount,0),i=s+r,d=e.expenses.filter(u=>le(u)==="daily"&&u.expenseDate===n).reduce((u,E)=>u+E.amount,0),y=tt(s,d),m=e.sales.reduce((u,E)=>u+E.totalAmount,0),l=t+m,f=e.expenses.reduce((u,E)=>u+E.amount,0),o=l-f;Ze.innerHTML=`
    <div class="app-frame">
      <header class="topbar">
        <div class="topbar-left">
          <img src="/laba101-logo.svg" alt="Laba101" class="topbar-logo" />
          <div>
            <p class="eyebrow">Offline mobile system</p>
            <h1>${p(Lt())}</h1>
          </div>
        </div>
        <div class="topbar-actions">
          <div class="branch-pill"><span>Branch</span><strong>${p(e.branch)}</strong></div>
          <button class="icon-button" type="button" aria-label="Notifications">!</button>
          <button class="profile-pill" type="button">
            <span>${We(c.currentUser)}</span>
            <strong>${p(c.currentUser.name)}</strong>
          </button>
        </div>
      </header>

      <button class="sidebar-backdrop ${c.sidebarOpen?"is-open":""}" id="sidebar-backdrop" type="button" aria-label="Close navigation"></button>

      <aside class="sidebar ${c.sidebarOpen?"is-open":""}">
        <div class="sidebar-mobile-head">
          <img src="/laba101-logo.svg" alt="Laba101" />
          <button class="sidebar-close" id="sidebar-close-button" type="button" aria-label="Close navigation">X</button>
        </div>
        <nav>${zt().map(u=>$n(u,c.tab===u)).join("")}</nav>
        <div class="sidebar-fill">
          <div class="sidebar-branch-badge">
            <span>Active Branch</span>
            <strong>${p(e.branch)}</strong>
          </div>
          <p class="sidebar-app-name">Laba101 POS</p>
        </div>
        <div class="sidebar-user">
          <span class="avatar">${We(c.currentUser)}</span>
          <div>
            <strong>${p(c.currentUser.name)}</strong>
            <small>${p(c.currentUser.email)} / ${p(c.currentUser.role)}</small>
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
            <h2>${p(Lt())}</h2>
          </div>
          <div class="navbar-time">
            <strong data-navbar-time>--:--</strong>
            <span data-navbar-date>Loading...</span>
          </div>
          <button class="mobile-avatar" type="button">${We(c.currentUser)}</button>
        </header>

        ${c.tab==="dashboard"?On({paidToday:i,cashPaidToday:s,gcashPaidToday:r,disbursementToday:d,cashOnHandToday:y,orders:e.orders,payments:e.payments,sales:e.sales}):""}
        ${c.tab==="pos"?In(e.orders,e.customers,e.services,e.categories,e.payments,e.branch):""}
        ${c.tab==="orders"?qn(e.orders,e.staff,e.services,e.payments):""}
        ${c.tab==="archived"?Fn(e.orders,e.staff,e.services,e.payments):""}
        ${c.tab==="customers"?jn(e.customers,e.orders):""}
        ${c.tab==="pricing"?Hn(e.allServices,e.categories):""}
        ${c.tab==="disbursements"?Wn(e.expenses,e.sales):""}
        ${c.tab==="reports"?Xn(e.orders,e.payments,e.sales,e.expenses,e.revolvingHistory,e.allStaff,e.foldRate,l,f,o,e.branch):""}
        ${c.tab==="logs"?Gn(e.activityLogs):""}
        ${c.tab==="inventory"?Kn(e.inventoryItems,e.inventoryMovements,e.branch):""}
        ${c.tab==="maintenance"?Yn(e.machines,e.subcleanings,e.branch):""}
        ${c.tab==="staff"?Vn(e.allStaff,e.branch):""}
        ${c.tab==="revolving"?ur(e.sales,e.revolvingHistory,e.orders,e.expenses):""}
        ${c.tab==="settings"?Jn(e.branch,e.foldRate,e.reportEmail):""}
      </main>
    </div>
  `,Qn(),er(e),tr(e.allServices),ar(e.expenses),nr(e.orders,e.payments,e.sales,e.expenses,e.revolvingHistory,e.allStaff,e.foldRate,e.branch),rr(),sr(),ir(),or(e.inventoryItems,e.branch),lr(e.allStaff),mr(),cr(),Zn()}function zt(){if(c.currentUser?.role==="admin")return Object.keys(et);const e=["dashboard","pos","orders","archived","disbursements","reports","maintenance","revolving"];return Nn(c.currentUser)?["dashboard","disbursements","reports","maintenance","revolving"]:An(c.currentUser)?e.filter(t=>t!=="revolving"):e}function Rn(){Ze.innerHTML=`
    <main class="login-page">

      <section class="login-panel-wrap">
        <article class="login-panel">
          <header>
            <div class="login-mark"><img src="/laba101-logo.svg" alt="Laba101" /></div>
            <h2>Welcome back</h2>
            <p>Sign in to continue managing today&apos;s laundry operations.</p>
          </header>
          ${c.loginError?`<div class="alert">${p(c.loginError)}</div>`:""}
          <form id="login-form" class="form">
            <label>Email address<input name="email" type="email" autocomplete="username" placeholder="admin@laba101.test or staff@laba101.gensan" required /></label>
            <label>Password<input name="password" type="password" autocomplete="current-password" placeholder="password" required /></label>
            <label class="remember"><input name="remember" type="checkbox" value="1" /> Remember me on this device</label>
            <button class="primary" id="login-button" type="submit">Sign in</button>
          </form>
        </article>
      </section>
    </main>
  `}function Dn(){document.querySelectorAll("[data-fill-email]").forEach(e=>{e.addEventListener("click",()=>{const t=document.querySelector('input[name="email"]'),n=document.querySelector('input[name="password"]');t&&(t.value=e.dataset.fillEmail??""),n&&(n.value=e.dataset.fillPassword??"")})})}function On(e){const t=new Date,n=Array.from({length:7},(i,d)=>{const y=new Date(t);return y.setDate(t.getDate()-(6-d)),new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric"}).format(y)}),a=Array.from({length:7},(i,d)=>{const y=new Date(t);y.setDate(t.getDate()-(6-d));const m=Q(y),l=Jt(e.payments,e.orders,o=>K(o.receivedAt)===m).total,f=e.sales.filter(o=>o.saleDate===m).reduce((o,u)=>o+u.totalAmount,0);return l+f}),r=Math.max(1,...a),s=210;return`
    <section class="dashboard-main">
      <article class="panel revenue-panel">
        ${M("Revenue overview","Paid amount for the last 7 days.")}
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
            ${a.map((i,d)=>{const y=Math.max(12,Math.round(i/r*s));return`<div class="chart-bar ${d===a.length-1?"is-today":""}"><span style="height:${y}px"></span><strong>${T(i)}</strong></div>`}).join("")}
          </div>
          <div class="chart-days">${n.map(i=>`<span>${p(i)}</span>`).join("")}</div>
        </div>
        <div class="chart-footnote">Values include POS payments and Daily Report sales input.</div>
      </article>
      ${c.dashboardSummaryModalOpen?Pn(e):""}
    </section>
  `}function Pn(e){return`
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal dashboard-summary-modal" role="dialog" aria-modal="true" aria-labelledby="daily-summary-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-open-printer-panel>Printer</button>
          <button class="primary" type="button" data-print-dashboard data-metrics='${JSON.stringify(e)}'>${c.printerLoading?"Printing...":"Print"}</button>
          <button class="secondary" type="button" data-close-daily-summary>Close</button>
        </div>
        ${c.printerPanelOpen?ea():""}
        <div class="receipt dashboard-summary-slip" id="dashboard-summary-print-area">
          <h3 id="daily-summary-title">Laba101 Daily Summary</h3>
          <p>${p(Q())}</p>
          <div><span>Paid today:</span><strong>${T(e.paidToday)}</strong></div>
          <div><span>Cash:</span><strong>${T(e.cashPaidToday)}</strong></div>
          <div><span>GCash:</span><strong>${T(e.gcashPaidToday)}</strong></div>
          <div><span>Disbursement:</span><strong>${T(e.disbursementToday)}</strong></div>
          <div><span>Cash-on hand:</span><strong>${T(e.cashOnHandToday)}</strong></div>
          <div class="signature-row"><span>Name of receiver and signature</span></div>
        </div>
      </div>
    </div>
  `}function In(e,t,n,a,r,s){const i=n.filter(m=>m.serviceType==="order"&&m.isActive),d=n.filter(m=>m.serviceType==="addon"&&m.isActive),y=c.receiptOrderId?e.find(m=>m.id===c.receiptOrderId):null;return`
    <section class="grid content full">
      <article class="panel span-2">
        ${M("New POS order","Search for a customer or type a new name, pick services and confirm")}
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
            ${i.map(m=>`<div class="qty-card service-option service-quantity" data-qty-card="serviceQty-${m.id}">
              <span>
                <strong>${p(m.name)}</strong>
                <small>${p(m.description??m.category)} ${m.maxKg?` / max ${m.maxKg}kg`:""}</small>
              </span>
              <b>${T(m.price)}</b>
              <div class="qty-control">
                <button type="button" data-qty-minus="serviceQty-${m.id}" aria-label="Decrease ${p(m.name)}">-</button>
                <input type="number" name="serviceQty-${m.id}" min="0" step="1" value="0" inputmode="numeric" />
                <button type="button" data-qty-plus="serviceQty-${m.id}" aria-label="Increase ${p(m.name)}">+</button>
              </div>
            </div>`).join("")}
          </fieldset>

          <fieldset class="check-grid">
            <legend>Extra services</legend>
            ${d.length?d.map(m=>`<div class="qty-card addon-quantity" data-qty-card="addonQty-${m.id}">
              <span><strong>${p(oe(m.name))}</strong><small>${T(m.price)} each</small></span>
              <div class="qty-control">
                <button type="button" data-qty-minus="addonQty-${m.id}" aria-label="Decrease ${p(oe(m.name))}">-</button>
                <input type="number" name="addonQty-${m.id}" min="0" step="1" value="0" inputmode="numeric" />
                <button type="button" data-qty-plus="addonQty-${m.id}" aria-label="Increase ${p(oe(m.name))}">+</button>
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

      ${y?st(y,r.filter(m=>m.orderId===y.id)):""}
    </section>
  `}function qn(e,t,n,a){const r=c.receiptOrderId?e.find(u=>u.id===c.receiptOrderId):null,s=e.filter(u=>u.status!=="claimed"),i=c.orderSearch.trim().toLowerCase(),d=c.orderDateFilter.trim(),y=c.orderPaymentFilter.trim().toLowerCase(),m=s.filter(u=>{const E=!i||[u.ticket,u.customer,u.phone,u.service,u.itemCategory,u.status].some(k=>String(k??"").toLowerCase().includes(i)),P=!d||K(u.createdAt)===d,q=!y||Me(u)===y;return E&&P&&q}),f=m.filter(u=>["unpaid","partial"].includes(Me(u))).reduce((u,E)=>u+Math.max(0,Number(E.balance||0)),0),o=m.length;return`
    <section class="grid content full">
      <article class="panel span-2">
        ${M("Order queue","Workflow, payment, and receipts")}
        <form class="queue-filters" id="order-queue-filters">
          <label>
            <span>Search queue</span>
            <input name="orderSearch" type="search" placeholder="Ticket, name, service, status" value="${p(c.orderSearch)}" autocomplete="off" />
          </label>
          <label>
            <span>Filter date</span>
            <input name="orderDateFilter" type="date" value="${p(c.orderDateFilter)}" />
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
        <div style="overflow-x: auto; width: 100%; -webkit-overflow-scrolling: touch;">
          <table class="data-table orders-data-table bordered-table">
            <thead>
              <tr><th>Ticket</th><th>Customer</th><th>Service</th><th>Total Payment</th><th>Actions</th></tr>
            </thead>
            <tbody>
              ${m.map(u=>Zt(u,t,n)).join("")||'<tr><td colspan="5" class="table-empty">No matching orders.</td></tr>'}
            </tbody>
          </table>
        </div>
        <div class="summary-list queue-summary">
          <div><span>Total transactions</span><strong>${o}</strong></div>
          <div><span>Total unpaid amount</span><strong>${T(f)}</strong></div>
        </div>
      </article>
      ${r?st(r,a.filter(u=>u.orderId===r.id)):""}
      ${c.paymentModalOrderId?Mn(e.find(u=>u.id===c.paymentModalOrderId)):""}
    </section>
  `}function Fn(e,t,n,a){const r=e.filter(y=>y.status==="claimed"),s=c.archivedOrderSearch.trim().toLowerCase(),i=r.filter(y=>s?[y.ticket,y.customer,y.phone,y.service,y.itemCategory].some(m=>String(m??"").toLowerCase().includes(s)):!0),d=c.receiptOrderId?e.find(y=>y.id===c.receiptOrderId):null;return`
    <section class="grid content full">
      <article class="panel span-2">
        ${M("Archived orders","All claimed orders are listed here")}
        <form class="queue-filters" id="archived-order-filters">
          <label>
            <span>Search archived</span>
            <input name="archivedOrderSearch" type="search" placeholder="Ticket, name, service" value="${p(c.archivedOrderSearch)}" autocomplete="off" />
          </label>
          <div class="search-actions queue-actions">
            <button class="primary" type="submit">Apply</button>
            <button class="secondary" type="button" id="archived-order-clear">Clear</button>
          </div>
        </form>
        <div class="summary-list queue-summary">
          <div><span>Archived claims</span><strong>${i.length}</strong></div>
          <div><span>Total claimed</span><strong>${r.length}</strong></div>
        </div>
        <div style="overflow-x: auto; width: 100%; -webkit-overflow-scrolling: touch;">
          <table class="data-table orders-data-table archived-orders-table">
            <thead>
              <tr><th>Ticket</th><th>Customer</th><th>Service</th><th>Total Payment</th><th>Staff Actions</th><th>Actions</th></tr>
            </thead>
            <tbody>
              ${i.map(y=>Zt(y,t,n,!0)).join("")||'<tr><td colspan="6" class="table-empty">No archived orders found.</td></tr>'}
            </tbody>
          </table>
        </div>
      </article>
      ${d?st(d,a.filter(y=>y.orderId===d.id)):""}
    </section>
  `}function Zt(e,t,n,a=!1){const r=ze(e,n),s=e.workflowCompleted.includes("claimed"),i=r.find(k=>!e.workflowCompleted.includes(k.key)),d=i?.key==="fold",y=Me(e),m=y==="unpaid"?"pending":y,l=e.extras.length?e.extras.map(k=>`${p(oe(k.name))} x${Number(k.quantity??1)}`).join(", "):"",f=c.currentUser?.role==="admin",o=e.status!=="claimed"&&e.paidAmount<=0,u=e.status!=="claimed"&&f&&e.paidAmount>0,E=kt(e,n),P=Array.isArray(e.foldedByStaffIds)?e.foldedByStaffIds:[],q=Math.max(0,E-P.length);return`
    <tr class="order-row-main">
      <td><strong>${p(e.ticket)}</strong><div class="small">${p(be(e.createdAt))}</div></td>
      <td>${p(e.customer)}<div class="small">${p(e.phone??"")}</div></td>
      <td>${p(e.service)}${l?`<div class="small">Extras: ${l}</div>`:""}</td>
      <td class="amount-cell payment-cell status-${y}"><strong>${T(e.totalAmount)}</strong><div class="payment-status">${p(m)}${y==="paid"?"":` &middot; Bal: ${T(e.balance)}`}</div></td>
      ${a?`<td>
        <div class="small">Folded by: ${p(e.foldedByName??"N/A")}</div>
        <div class="small">Released by: ${p(e.releasedByName??"N/A")}</div>
      </td>`:""}
      <td>
      <div class="row-actions">
        ${i?.key==="fold"?`<div class="inline-form flex-wrap fold-actions" data-order-id="${e.id}">
          ${P.map((k,v)=>{const N=t.find(L=>L.id===k);return`<span class="fold-saved-badge">Fold ${v+1}: ${p(N?.name??"Staff")}</span>`}).join("")}
          ${d&&q>0?Array.from({length:q}).map((k,v)=>{const N=P.length+v+1;return`<select name="assignedStaffId" class="fold-staff-select" data-order-id="${e.id}" data-fold-number="${N}">
            <option value="">-- Staff ${E>1?`(Fold ${N})`:""}--</option>
            ${t.map(L=>`<option value="${L.id}">${p(L.name)}</option>`).join("")}
          </select>`}).join(""):""}
        </div>`:i?.key==="claimed"&&!s?`<form class="inline-form advance-form" data-order-id="${e.id}" data-action="claim" data-balance="${e.balance}">
          <select name="releasedBy" required>
            <option value="">-- Released by --</option>
            ${t.map(k=>`<option value="${k.id}">${p(k.name)}</option>`).join("")}
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
        ${o?`<button class="secondary btn-sm" type="button" data-cancel-order="${e.id}">Cancel</button>`:""}
        ${u?`<button class="secondary btn-sm" type="button" data-delete-order="${e.id}">Delete</button>`:""}
        <button class="secondary btn-sm" data-receipt="${e.id}">Receipt</button>
      </div>
      </td>
    </tr>
  `}function Mn(e){return e?`
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="payment-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-close-payment-modal>Close</button>
        </div>
        <div class="receipt" style="border: 1px solid var(--line); border-style: solid; box-shadow: none;">
          <h3 id="payment-title" style="margin-top:0">Payment Required</h3>
          <p>Please settle the remaining balance of <strong>${T(e.balance)}</strong> for ticket <strong>${p(e.ticket)}</strong> before claiming.</p>
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
  `:""}function st(e,t){const n=t.reduce((i,d)=>i+Number(d.amount),0),a=Math.max(0,Number((n-e.totalAmount).toFixed(2))),r=Me(e),s=r.charAt(0).toUpperCase()+r.slice(1);return`
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="receipt-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-open-printer-panel>Printer</button>
          <button class="primary" type="button" data-thermal-print>${c.printerLoading?"Printing...":"Print Receipt"}</button>
          <button class="secondary" type="button" data-close-receipt>Close</button>
        </div>
        ${c.printerPanelOpen?ea():""}
        <div class="receipt" id="receipt-print-area">
          <div class="receipt-head">
            <h3 id="receipt-title">Laba101</h3>
            <p>${p(e.ticket)}<br>${p(be(e.createdAt))}</p>
          </div>
          ${c.currentUser?`<p class="receipt-staff">Staff: ${p(c.currentUser.name)}</p>`:""}
          <div class="receipt-customer">
            <strong>${p(e.customer)}</strong>
            <span>${p(e.phone??"No phone")}</span>
          </div>
          <div class="summary-list receipt-lines">
            <div><span>Service</span><strong>${p(e.service)}</strong></div>
            ${e.extras.length?`<div><span>Extra services</span><strong>${e.extras.map(i=>`${p(oe(i.name))} x${Number(i.quantity??1)} (${T(Number(i.total??i.price))})`).join(", ")}</strong></div>`:""}
            <div><span>Total</span><strong>${T(e.totalAmount)}</strong></div>
            <div><span>Tendered</span><strong>${T(n)}</strong></div>
            <div><span>Paid</span><strong>${T(e.paidAmount)}</strong></div>
            <div><span>Payment status</span><strong>${s}</strong></div>
            <div><span>Change</span><strong>${T(a)}</strong></div>
            <div><span>Balance</span><strong>${T(e.balance)}</strong></div>
          </div>
          <h3>Payments</h3>
          <div class="receipt-payments">
            ${t.map(i=>`<div><span>${p(i.method.toUpperCase())}</span><strong>${T(i.amount)}</strong>${i.reference?`<small>Ref ${p(i.reference)}</small>`:""}</div>`).join("")||'<p class="helper">No payments yet.</p>'}
          </div>
        </div>
      </div>
    </div>
  `}function ea(){return`
    <div class="printer-panel">
      <div class="printer-panel-head">
        <strong>Bluetooth thermal printer</strong>
        <button class="secondary" type="button" data-refresh-printers>${c.printerLoading?"Scanning...":"Scan paired"}</button>
      </div>
      <div class="printer-fields">
        <label>Printer
          <select data-printer-select>
            <option value="">Select paired printer</option>
            ${c.pairedPrinters.map(e=>`<option value="${p(e.address)}" ${c.selectedPrinterAddress===e.address?"selected":""}>${p(e.name)} - ${p(e.address)}</option>`).join("")}
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
      ${c.printerStatus?`<p class="printer-status ok">${p(c.printerStatus)}</p>`:""}
      ${c.printerError?`<p class="printer-status warn">${p(c.printerError)}</p>`:""}
    </div>
  `}async function Ct(){c.printerLoading=!0,c.printerError="",c.printerStatus="",await w();try{if(!(await ue.requestBluetoothPermissions()).granted)throw new Error("Bluetooth permission was not granted.");const t=await ue.listPairedPrinters();c.pairedPrinters=t.printers??[],c.selectedPrinterAddress=c.selectedPrinterAddress||t.savedAddress||c.pairedPrinters[0]?.address||"",c.printerStatus=c.pairedPrinters.length?"Select a printer, then connect.":"No paired printers found. Pair the printer in Android Bluetooth settings first."}catch(e){c.printerError=e instanceof Error?e.message:"Could not scan paired printers."}finally{c.printerLoading=!1,await w()}}async function kn(){if(!c.selectedPrinterAddress){c.printerError="Select a paired printer first.",await w();return}c.printerLoading=!0,c.printerError="",c.printerStatus="",await w();try{await ue.savePrinter({address:c.selectedPrinterAddress}),await ue.connect({address:c.selectedPrinterAddress}),c.printerStatus="Printer connected and saved."}catch(e){c.printerError=e instanceof Error?e.message:"Printer connection failed."}finally{c.printerLoading=!1,await w()}}function Un(e){const t=(e.serviceLines?.length?e.serviceLines:[{id:e.serviceId,name:e.service,price:e.price,quantity:1,total:e.price}]).map(a=>({name:a.name,quantity:Number(a.quantity||1),price:Number(a.price||0)})),n=e.extras.map(a=>({name:oe(a.name),quantity:Number(a.quantity??1),price:Number(a.price||0)}));return[...t,...n]}async function Bn(e,t){const n=t.reduce((r,s)=>r+Number(s.amount),0),a=Math.max(0,Number((n-e.totalAmount).toFixed(2)));c.printerLoading=!0,c.printerError="",c.printerStatus="",await w();try{if(!c.selectedPrinterAddress){const r=await ue.getSavedPrinter();c.selectedPrinterAddress=r.address||""}await ue.printReceipt({address:c.selectedPrinterAddress||void 0,paperWidth:c.printerPaperWidth,storeName:"Laba101",receiptNumber:e.ticket,dateTime:be(e.createdAt),customerName:e.customer,customerPhone:e.phone?.trim()||"No phone",items:Un(e),totalAmount:e.totalAmount,paidAmount:e.paidAmount,changeAmount:a,balanceAmount:e.balance,staffName:c.currentUser?.name?.trim()||"Staff"}),c.printerStatus="Receipt sent to printer."}catch(r){c.printerPanelOpen=!0,c.printerError=r instanceof Error?r.message:"Bluetooth thermal print failed."}finally{c.printerLoading=!1,await w()}}async function _n(e){c.printerLoading=!0,c.printerError="",c.printerStatus="",await w();try{if(!c.selectedPrinterAddress){const t=await ue.getSavedPrinter();c.selectedPrinterAddress=t.address||""}await ue.printDailySummary({address:c.selectedPrinterAddress||void 0,paperWidth:c.printerPaperWidth,storeName:"Laba101",dateTime:Q(),staffName:c.currentUser?.name?.trim()||"Staff",paidToday:e.paidToday,cashPaidToday:e.cashPaidToday,gcashPaidToday:e.gcashPaidToday,disbursementToday:e.disbursementToday,cashOnHandToday:e.cashOnHandToday}),c.printerStatus="Daily summary sent to printer."}catch(t){c.printerPanelOpen=!0,c.printerError=t instanceof Error?t.message:"Bluetooth thermal print failed."}finally{c.printerLoading=!1,await w()}}function jn(e,t){const n=c.customerSearch.trim().toLowerCase(),a=e.filter(r=>n?r.name.toLowerCase().includes(n):!1);return`
    <section class="grid content full">
      <article class="panel">
        ${M("Customer Management","Customer records from local offline storage")}
        <form class="search-box" id="customer-search-form">
          <label>
            <span>Search customer name</span>
            <input name="customerSearch" data-customer-search type="search" placeholder="Type the customer name then tap Search" value="${p(c.customerSearch)}" autocomplete="off" />
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
        ${M("Customer list","Names, phones, addresses, and order history")}
        <div class="customer-stack">
          ${n?a.map(r=>{const s=t.filter(i=>i.customerId===r.id);return`
              <article class="customer-card">
                <header>
                  <div>
                    <strong>${p(r.name)}</strong>
                    <p>${p(r.phone??"No phone")} · ${p(r.address??"No address")}</p>
                  </div>
                  <span>${s.length} order(s)</span>
                </header>
                <div class="customer-orders">
                  ${s.length?s.map(i=>`
                    <div class="customer-order-row">
                      <div>
                        <strong>${p(i.ticket)}</strong>
                        <span>${p(i.service)} · ${p(i.itemCategory)}</span>
                      </div>
                      <div>
                        <strong>${T(i.totalAmount)}</strong>
                        <span>${p(i.status)}</span>
                      </div>
                    </div>`).join(""):'<p class="helper">No order records yet.</p>'}
                </div>
              </article>`}).join(""):'<div class="helper">Search a customer name to display matching records and their order history.</div>'}
        </div>
      </article>
    </section>
  `}function Hn(e,t){const n=e.filter(r=>r.serviceType==="order"),a=e.filter(r=>r.serviceType==="addon");return`
    <section class="grid content full">
      <article class="panel">
        ${M("Services","Order services and add-ons used by POS pricing")}
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
            ${fn.map(r=>`<label class="check"><input type="checkbox" name="includes" value="${r}" /> ${r}</label>`).join("")}
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
        ${M("Item categories","Load limits and extra fees")}
        <form id="category-form" class="form">
          <div class="form-row">
            <label>Name<input name="name" required /></label>
            <label>Max KG<input name="maxKg" type="number" min="0.25" step="0.01" required /></label>
          </div>
          <button class="primary" type="submit">Save category</button>
        </form>
      </article>
      <article class="panel span-2">
        ${M("Services Table","Order services")}
        <div class="table-scroll">
          <div class="table data-table">
            <div class="table-head"><div>Name</div><div>Category</div><div>Price</div><div>Max KG</div><div>Includes</div><div>Status</div><div>Actions</div></div>
            ${n.map(r=>`<div class="table-row"><div><strong>${p(r.name)}</strong></div><div>${p(r.category)}</div><div>${T(r.price)}</div><div>${r.maxKg} kg</div><div>${p(r.includes.join(", ")||"none")}</div><div>${r.isActive?"Active":"Inactive"}</div><div class="row-actions"><button class="secondary edit-service-btn" data-id="${r.id}">Edit</button>${r.isActive?`<button class="secondary deactivate-service-btn" data-id="${r.id}">Deactivate</button>`:`<button class="secondary activate-service-btn" data-id="${r.id}">Activate</button>`}</div></div>`).join("")||'<div class="helper">No order services yet.</div>'}
          </div>
        </div>
        <div class="section-divider"></div>
        ${M("Extra Services Table","Add-on services")}
        <div class="table-scroll">
          <div class="table data-table extra-services-table">
            <div class="table-head"><div>Name</div><div>Category</div><div>Price</div><div>Includes</div><div>Status</div><div>Actions</div></div>
            ${a.map(r=>`<div class="table-row"><div><strong>${p(r.name)}</strong></div><div>${p(r.category)}</div><div>${T(r.price)}</div><div>${p(r.includes.join(", ")||"none")}</div><div>${r.isActive?"Active":"Inactive"}</div><div class="row-actions"><button class="secondary edit-service-btn" data-id="${r.id}">Edit</button>${r.isActive?`<button class="secondary deactivate-service-btn" data-id="${r.id}">Deactivate</button>`:`<button class="secondary activate-service-btn" data-id="${r.id}">Activate</button>`}</div></div>`).join("")||'<div class="helper">No extra services yet.</div>'}
          </div>
        </div>
      </article>
    </section>
  `}function Wn(e,t){const n=W(),a=n.slice(0,7),r=c.currentUser?.role==="admin",s=e.map(o=>o.category).filter(o=>!!o&&o!=="Other"&&!Nt.includes(o)),i=Array.from(new Set([...Nt.filter(o=>o!=="Other"),...s,"Other"])),d=e.filter(o=>le(o)==="daily"&&o.expenseDate===n).reduce((o,u)=>o+u.amount,0),y=e.filter(o=>le(o)==="monthly"&&o.expenseDate.startsWith(a)).reduce((o,u)=>o+u.amount,0),m=t.filter(o=>o.saleDate===n).reduce((o,u)=>o+u.totalAmount,0),l=t.filter(o=>o.saleDate.startsWith(a)).reduce((o,u)=>o+u.totalAmount,0),f=[...e].sort((o,u)=>At(u.number)-At(o.number)||u.id-o.id);return`
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
      <div class="panel stat"><div class="card-label">Daily disbursement</div><div class="value">${T(d)}</div></div>
      <div class="panel stat"><div class="card-label">Monthly disbursement</div><div class="value">${T(y)}</div></div>
      <div class="panel stat"><div class="card-label">Today sales input</div><div class="value">${T(m)}</div></div>
      <div class="panel stat"><div class="card-label">Month sales input</div><div class="value">${T(l)}</div></div>
    </section>
    ${c.dailyReportTab==="expenses"?`
    <section class="grid content full">
      <article class="panel">
        ${M("Input disbursement","Supplies, utilities, and cash disbursements")}
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
            <label class="expense-month-field" hidden>Month<input name="expenseMonth" type="month" value="${pe()}" /></label>
            <label>Amount<input name="amount" type="number" min="0" step="0.01" required placeholder="0.00" /></label>
          </div>
          <div class="form-row"><label>Title / Name<input name="name" required /></label><label>Category<select name="category" data-expense-category-select required>${i.map(o=>`<option value="${p(o)}">${p(o)}</option>`).join("")}</select></label></div>
          <label class="expense-category-custom-field" data-expense-category-custom-field hidden>Specify category<input name="categoryCustom" type="text" placeholder="e.g. Office supplies" /></label>
          <button class="primary" type="submit">Save expense</button>
        </form>
      </article>
      <article class="panel">
        ${M("Disbursement list","Expenses only")}
        ${se(["Date/Month","No.","Type","Name","Category","Amount","Action"],f.map(o=>[`<strong>${p(Vt(o))}</strong>`,p(o.number),p(le(o)),p(o.name),p(o.category),T(o.amount),`<div class="row-actions"><button class="secondary edit-expense-btn" data-id="${o.id}" type="button">Edit</button>${r?`<button class="secondary delete-expense-btn" data-id="${o.id}" type="button">Delete</button>`:""}</div>`]),"data-table orders-data-table app-record-table disbursement-list-table")}
      </article>
    </section>
    `:`
    <section class="grid content full">
      <article class="panel">
        ${M("Input total sale","Manual cash and GCash totals")}
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
        ${M("Daily sales history","Cash, GCash, total sale, notes, and updates")}
        <div class="table-scroll daily-report-scroll">
          <div class="table wide-table daily-report-table">
            <div class="table-head"><div>Sales #</div><div>Date</div><div>Cash</div><div>GCash</div><div>Total sale</div><div>Action</div></div>
            ${t.map(o=>`<div class="table-row"><div>${p(o.saleNumber)}</div><div>${p(o.saleDate)}</div><div>${T(o.cashAmount)}</div><div>${T(o.gcashAmount)}</div><div><strong>${T(o.totalAmount)}</strong></div><div class="row-actions"><button class="secondary edit-sale-btn" data-id="${o.id}" type="button">Edit</button>${r?`<button class="secondary delete-sale-btn" data-id="${o.id}" type="button">Delete</button>`:""}</div></div>`).join("")||'<div class="helper">No daily sales totals yet.</div>'}
          </div>
        </div>
      </article>
    </section>
    `}
  `}function Xn(e,t,n,a,r,s,i,d,y,m,l){const f=c.reportPreview?rt(e,t,n,a,r,s,i,c.reportPreview,l):null;return`
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
            ${c.currentUser?.branch?.toLowerCase().includes("gensan")?"":'<label><input type="checkbox" name="reportType" value="fold_count" /> Fold Count</label>'}
            ${c.currentUser?.branch?.toLowerCase().includes("mintal")?"":'<label><input type="checkbox" name="reportType" value="revolving_fund" /> Revolving Fund</label>'}
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
      <div class="monthly-summary-panel">
        <div class="monthly-summary-panel-head">
          <div>
            <h3>Monthly net income summary</h3>
            <p>Generates a JPG only, ready to share through email or messenger from the device share sheet.</p>
          </div>
          <div class="report-month-controls">
            <label>Month<input type="month" data-month-summary value="${p(c.monthlySummaryMonth)}" /></label>
            <button class="primary" id="generate-monthly-summary" type="button">Generate monthly summary</button>
          </div>
        </div>
      </div>
    </section>
    ${f?`
      <section class="panel report-preview">
        ${f.selectedTypes.has("sales")?`
          <article>
            ${M("Sales report preview",`${f.selection.from} to ${f.selection.to}`)}
            <div style="overflow-x: auto; width: 100%; -webkit-overflow-scrolling: touch;">
              <table class="data-table orders-data-table bordered-table">
                <thead>
                  <tr><th>Ticket</th><th>Customer</th><th>Cash</th><th>GCash</th><th>Total Payment</th></tr>
                </thead>
                <tbody>
                  ${f.salesRows().transactions.map(o=>`<tr><td>${p(o.ticket)}</td><td>${p(o.customer)}</td><td>${T(o.cash)}</td><td>${T(o.gcash)}</td><td><strong>${T(o.total)}</strong></td></tr>`).join("")||'<tr><td colspan="5" class="table-empty">No sales records found.</td></tr>'}
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
                    <tr><td>Orders</td><td>${T(f.salesRows().orderCashTotal)}</td><td>${T(f.salesRows().orderGcashTotal)}</td><td>${T(f.salesRows().orderCashTotal+f.salesRows().orderGcashTotal)}</td></tr>
                    <tr><td>Whole Sale Day</td><td>${T(f.salesRows().manualCashTotal)}</td><td>${T(f.salesRows().manualGcashTotal)}</td><td>${T(f.salesRows().manualCashTotal+f.salesRows().manualGcashTotal)}</td></tr>
                    <tr style="font-weight: bold; background: #f8fafc;"><td>Total</td><td>${T(f.salesRows().totalCash)}</td><td>${T(f.salesRows().totalGcash)}</td><td>${T(f.salesRows().totalSales)}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </article>`:""}
        ${f.selectedTypes.has("disbursement")?(()=>{const o=f.disbursementRows();return`
          <article>
            ${M("Disbursement preview",`${f.selection.from} to ${f.selection.to}`)}
            <div style="overflow-x: auto; width: 100%; -webkit-overflow-scrolling: touch;">
              <table class="data-table orders-data-table bordered-table">
                <thead>
                  <tr><th>ID#</th><th>Date/Month</th><th>Type</th><th>Name</th><th>Category</th><th>Amount</th></tr>
                </thead>
                <tbody>
                  ${o.rows.slice(1).filter(u=>u.length&&u[0]!=="Total Disbursement").map(u=>`<tr><td>${p(String(u[1]??""))}</td><td>${p(String(u[0]??""))}</td><td>${p(String(u[2]??""))}</td><td>${p(String(u[3]??""))}</td><td>${p(String(u[4]??""))}</td><td><strong>${T(u[6])}</strong></td></tr>`).join("")||'<tr><td colspan="6" class="table-empty">No disbursements found.</td></tr>'}
                </tbody>
              </table>
            </div>
            ${o.categoryTotals.length?`
              <div class="disbursement-category-summary">
                <h4>Disbursement by Category</h4>
                <div class="category-breakdown-list">
                  ${o.categoryTotals.map(u=>`
                    <div class="category-breakdown-row">
                      <span>${p(u.category)}</span>
                      <strong>${T(u.amount)}</strong>
                    </div>
                  `).join("")}
                </div>
              </div>
            `:""}
            <div class="disbursement-total">
              <strong>Total Disbursement: ${T(o.totalDisbursement)}</strong>
            </div>
          </article>`})():""}
        ${f.selectedTypes.has("fold_count")?`
          <article>
            ${M("Fold Count preview",`${f.selection.from} to ${f.selection.to}`)}
            <div style="overflow-x: auto; width: 100%; -webkit-overflow-scrolling: touch;">
              <table class="data-table orders-data-table bordered-table">
                <thead>
                  <tr><th>Staff</th><th>Fold Count</th></tr>
                </thead>
                <tbody>
                  ${f.foldCountRows().rows.slice(1).map(o=>`<tr>${o.map(u=>`<td>${p(String(u??""))}</td>`).join("")}</tr>`).join("")||'<tr><td colspan="2" class="table-empty">No fold records found.</td></tr>'}
                </tbody>
              </table>
            </div>
          </article>`:""}
        ${f.selectedTypes.has("revolving_fund")?`
          <article>
            ${M("Revolving Fund — Daily Summary",`${f.selection.from} to ${f.selection.to}`)}
            ${se(["Date of Sales","Cash on Hand","Status","Date Update"],f.revolvingDailySummaryRows().rows.slice(1).map(o=>[p(String(o[0]??"")),p(String(o[1]??"")),p(String(o[2]??"")),p(String(o[3]??""))]),"data-table orders-data-table bordered-table")}
          </article>
          <article>
            ${M("Revolving Fund — Table History",`${f.selection.from} to ${f.selection.to}`)}
            ${se(["Date","Number","Name","Amount","Category","Description","Type"],f.revolvingHistoryRows().rows.slice(1).map(o=>[p(String(o[0]??"")),p(String(o[1]??"")),p(String(o[2]??"")),p(String(o[3]??"")),p(String(o[4]??"")),p(String(o[5]??"")),p(String(o[6]??""))]),"data-table orders-data-table bordered-table")}
          </article>`:""}
        ${f.selectedTypes.has("summary")?(()=>{const o=f.salesRows(),u=f.disbursementRows(),E=Number((o.totalSales-u.totalDisbursement).toFixed(2)),P=Kt(f.selection.from,f.selection.to)?at(f.selection.from.slice(0,7)):`${f.selection.from} to ${f.selection.to}`;return`
          <article>
            <div class="monthly-summary-slip">
              <div class="monthly-summary-title">Laba 101</div>
              <div class="monthly-summary-branch">${p(nt(l))}</div>
              <div class="monthly-summary-period">For the month of ${p(P)}</div>
              <div class="monthly-summary-divider"></div>
              <div class="monthly-summary-section">
                <div class="monthly-summary-heading">Total sales</div>
                <div class="summary-detail-row">
                  <span>Cash:</span><strong>${T(o.totalCash)}</strong>
                </div>
                <div class="summary-detail-row">
                  <span>GCash:</span><strong>${T(o.totalGcash)}</strong>
                </div>
                <div class="summary-detail-row summary-total-row">
                  <span>Total:</span><strong>${T(o.totalSales)}</strong>
                </div>
              </div>
              <div class="monthly-summary-divider"></div>
              <div class="monthly-summary-section">
                <div class="monthly-summary-heading">Total disbursement</div>
                ${u.categoryTotals.map(q=>`
                  <div class="summary-detail-row monthly-summary-category-row">
                    <span>${p(q.category)}:</span><strong>${T(q.amount)}</strong>
                  </div>
                `).join("")}
                <div class="summary-detail-row summary-total-row">
                  <span>Total:</span><strong>${T(u.totalDisbursement)}</strong>
                </div>
              </div>
              <div class="monthly-summary-divider"></div>
              <div class="monthly-summary-section">
                <div class="monthly-summary-heading">Net income</div>
                <div class="summary-detail-row summary-total-row">
                  <span></span><strong class="${E>=0?"positive":"negative"}">${T(E)}</strong>
                </div>
              </div>
            </div>
          </article>`})():""}
        })() : ''}
      </section>
    `:""}
  `}function Gn(e){return`
    <section class="grid content full">
      <article class="panel span-2">
        ${M("Activity Logs","Recorded staff actions and timestamps")}
        ${se(["Timestamp","Staff","Action","Details"],e.map(t=>[ke(t.timestamp),p(t.staffName),`<strong>${p(t.action)}</strong>`,p(t.details)]),"data-table orders-data-table app-record-table logs-table")}
      </article>
    </section>
  `}function Kn(e,t,n){return`
    <section class="grid content full">
      <article class="panel">
        ${M("Inventory Item","Custom stocks and supplies")}
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
        ${M("Stock List","Editable branch inventory")}
        ${se(["Item","Qty","Unit","Reorder","Status","Updated","Action"],e.map(a=>[`<strong>${p(a.name)}</strong><div class="small">${p(a.notes??"")}</div>`,p(a.quantity),p(a.unit),p(a.reorderLevel),`<span class="${a.quantity<=a.reorderLevel?"warn":"ok"}">${a.quantity<=a.reorderLevel?"Low stock":"OK"}</span>`,ke(a.updatedAt),`<button class="secondary edit-inventory-btn" type="button" data-id="${a.id}">Edit</button>`]),"data-table orders-data-table app-record-table inventory-stock-table")}
      </article>
      <article class="panel">
        ${M("Stock In / Stock Out","Adjust inventory quantities")}
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
        ${M("Stock Movement History","Recent stock-in and stock-out records")}
        ${se(["Date","Item","Type","Qty","Staff","Notes"],t.map(a=>[ke(a.createdAt),p(a.itemName),`<span class="${a.movementType==="in"?"ok":"warn"}">${a.movementType==="in"?"Stock-in":"Stock-out"}</span>`,p(a.quantity),p(a.staffName),p(a.notes??"")]),"data-table orders-data-table app-record-table inventory-movement-table")}
      </article>
    </section>
  `}function Yn(e,t,n){const a=e.filter(l=>l.status!=="under_cleaning"),r=e.filter(l=>l.status==="under_cleaning"),s=new Date,i=new Date(s.getFullYear(),s.getMonth(),1);i.setDate(i.getDate()-i.getDay());const d=Array.from({length:35},(l,f)=>{const o=new Date(i);o.setDate(i.getDate()+f);const u=Q(o),E=t.filter(P=>P.date===u);return{key:u,date:o,records:E,isCurrentMonth:o.getMonth()===s.getMonth(),isToday:u===W()}}),y=new Intl.DateTimeFormat("en-PH",{month:"long",year:"numeric"}).format(s),m=t.some(l=>l.date===W()&&l.cleaningType==="general");return`
    <section class="page-head">
      <div>
        <h2>Maintenance & Cleaning</h2>
        <p class="meta">Manage machine tube cleaning, general cleaning, and maintenance records.</p>
      </div>
      <div class="segmented">
        <button class="${c.maintenanceTab==="cleaning"?"is-active":""}" data-maintenance-tab="cleaning" type="button">Tube Cleaning</button>
        <button class="${c.maintenanceTab==="machines"?"is-active":""}" data-maintenance-tab="machines" type="button">Machine Management</button>
      </div>
    </section>
    ${c.maintenanceTab==="cleaning"?`
    <section class="grid content full">
      <article class="panel">
        ${M("Available Machines","Select machines to start cleaning.")}
        <form id="subcleaning-form" class="form">
          <input type="hidden" name="date" value="${W()}" />
          <fieldset class="machine-list">
            ${a.map(l=>`<label class="machine-card"><input type="checkbox" name="machineIds" value="${l.id}" /><span><strong>${p(l.machineName)}</strong><small>${p(l.machineType)}</small></span><em></em></label>`).join("")||'<p class="helper">All machines are currently being cleaned.</p>'}
          </fieldset>
          <input type="hidden" name="cleaningStatus" value="in_progress" />
          <input type="hidden" name="cleaningType" value="tube" />
          <label>Notes <textarea name="notes" placeholder="e.g. Deep clean filters"></textarea></label>
          <input type="hidden" name="branch" value="${p(n)}" />
          <button class="primary" type="submit">Start Tube Cleaning</button>
        </form>
      </article>
      <article class="panel">
        ${M("General Cleaning","Confirm general cleaning for today")}
        <div class="summary-list">
          <div><span>Today</span><strong>${m?"Confirmed":"Pending"}</strong></div>
        </div>
        <button class="primary" type="button" id="confirm-general-cleaning" ${m?"disabled":""}>Confirm General Cleaning</button>
      </article>
      <article class="panel warning-panel">
        ${M("Under Cleaning","Machines currently being serviced.")}
        <div class="machine-stack">
          ${r.length?r.map(l=>`
            <div class="machine-status">
              <span><strong>${p(l.machineName)}</strong><small>${p(l.machineType)}</small></span>
              <b>In progress</b>
              <button class="secondary complete-cleaning-btn" type="button" data-machine-id="${l.id}" data-branch="${p(n)}">Mark Complete</button>
            </div>`).join(""):'<p class="helper">No machines under cleaning right now.</p>'}
        </div>
      </article>
      <article class="panel span-2">
        ${M("Tube Cleaning Checklist","Track which machines have been cleaned today.")}
        ${se(["Machine","Type","Status","Notes","Date"],e.map(l=>{const f=t.find(o=>o.machineIds.includes(l.id)&&o.date===W());return[`<strong>${p(l.machineName)}</strong>`,p(l.machineType),`<span class="${f?"ok":"warn"}">${f?p(f.cleaningStatus.replace("_"," ")):"Not Cleaned"}</span>`,p(f?.notes??"-"),W()]}),"data-table orders-data-table app-record-table tube-checklist-table")}
      </article>
      <article class="panel span-2">
        ${M("Cleaning Calendar",y)}
        <div class="maintenance-calendar">
          <div class="calendar-weekdays">${["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(l=>`<span>${l}</span>`).join("")}</div>
          <div class="calendar-grid">
            ${d.map(l=>{const f=l.records.filter(u=>u.cleaningType!=="general").length,o=l.records.some(u=>u.cleaningType==="general");return`<div class="calendar-day ${l.records.length?"has-records":""} ${l.isCurrentMonth?"":"is-muted"} ${l.isToday?"is-today":""}">
                <strong>${l.date.getDate()}</strong>
                <span>${o?"General":""}</span>
                <small>${f?`${f} tube`:"No tube"}</small>
              </div>`}).join("")}
          </div>
        </div>
      </article>
    </section>
    `:`
    <section class="grid content full">
      <article class="panel">
        ${M("Add Machine","Create washer and dryer records")}
        <form id="machine-form" class="form">
          <label>Machine Name<input name="machineName" required placeholder="e.g. Washer 5" /></label>
          <label>Type<select name="machineType"><option value="washer">Washer</option><option value="dryer">Dryer</option></select></label>
          <label>Status<select name="status"><option value="available">Available</option><option value="under_cleaning">Under Cleaning</option><option value="maintenance">Maintenance</option></select></label>
          <input type="hidden" name="branch" value="${p(n)}" />
          <button class="primary" type="submit">Add machine</button>
        </form>
      </article>
      <article class="panel">
        ${M("Machines","Washer and dryer status")}
        <div class="table">
          <div class="table-head"><div>Name</div><div>Type</div><div>Status</div><div>Branch</div><div>Actions</div></div>
          ${e.map(l=>`<div class="table-row"><div><strong>${p(l.machineName)}</strong></div><div>${p(l.machineType)}</div><div>${p(l.status.replace("_"," "))}</div><div>${p(l.branch)}</div>
          <div class="row-actions">
            ${l.status!=="inactive"?`<button class="secondary deactivate-machine-btn" data-id="${l.id}">Deactivate</button>`:`<button class="secondary activate-machine-btn" data-id="${l.id}">Activate</button>`}
          </div></div>`).join("")||'<div class="helper">No machines found.</div>'}
        </div>
      </article>
    </section>
    `}
  `}function Vn(e,t){return`
    <section class="grid">
      <div class="page-head">
        <div>
          <p class="eyebrow">Team Management</p>
          <h2>Staff Overview</h2>
        </div>
        <button class="primary" id="open-add-staff-modal" type="button">+ Add staff</button>
      </div>

      <article class="panel">
        ${M("Staff list","Branch: "+p(t))}
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
  `}function Jn(e,t,n){return`
    <section class="grid content full">
      <article class="panel">
        ${M("Settings","Device-local configuration")}
        <form id="settings-form" class="form">
          <label>Current branch<select name="branch">
            ${["Main Store","Mintal Branch","Gensan Branch"].map(a=>`<option value="${a}" ${a===e?"selected":""}>${a}</option>`).join("")}
          </select></label>
          <label>Report email<input name="reportEmail" type="email" placeholder="admin@laba101.test" value="${p(n)}" /></label>
          <button class="primary" type="submit">Save settings</button>
        </form>
      </article>
    </section>
  `}function Qn(){const e=()=>{localStorage.removeItem(Ce),c.currentUser=null,c.tab="dashboard",c.receiptOrderId=0,c.sidebarOpen=!1,w()};document.querySelector("#logout-button")?.addEventListener("click",e),document.querySelector("#mobile-logout-button")?.addEventListener("click",e),document.querySelector("#mobile-menu-button")?.addEventListener("click",()=>{c.sidebarOpen=!0,w()}),document.querySelector("#sidebar-close-button")?.addEventListener("click",()=>{c.sidebarOpen=!1,w()}),document.querySelector("#sidebar-backdrop")?.addEventListener("click",()=>{c.sidebarOpen=!1,w()}),document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{c.tab=t.dataset.tab,c.receiptOrderId=0,c.sidebarOpen=!1,w()})}),document.querySelectorAll("[data-quick-tab]").forEach(t=>{t.addEventListener("click",()=>{c.tab=t.dataset.quickTab,w()})}),document.querySelectorAll("[data-receipt]").forEach(t=>{t.addEventListener("click",()=>{c.receiptOrderId=Number(t.dataset.receipt),c.printerPanelOpen=!1,c.printerError="",c.printerStatus="",w()})}),document.querySelector("[data-close-receipt]")?.addEventListener("click",()=>{c.receiptOrderId=0,w()}),document.querySelector("[data-open-printer-panel]")?.addEventListener("click",()=>{c.printerPanelOpen=!c.printerPanelOpen,c.printerPanelOpen&&c.pairedPrinters.length===0?Ct():w()}),document.querySelector("[data-refresh-printers]")?.addEventListener("click",()=>{Ct()}),document.querySelector("[data-printer-select]")?.addEventListener("change",t=>{c.selectedPrinterAddress=t.currentTarget.value,w()}),document.querySelector("[data-paper-width]")?.addEventListener("change",t=>{c.printerPaperWidth=Number(t.currentTarget.value)===80?80:58,w()}),document.querySelector("[data-connect-printer]")?.addEventListener("click",()=>{kn()}),document.querySelector("[data-thermal-print]")?.addEventListener("click",()=>{(async()=>{const t=await Qt(),n=t.orders.find(r=>r.id===c.receiptOrderId);if(!n)throw new Error("Receipt order not found.");const a=t.payments.filter(r=>r.orderId===n.id);await Bn(n,a)})().catch(t=>{c.printerPanelOpen=!0,c.printerError=t instanceof Error?t.message:"Bluetooth thermal print failed.",w()})}),document.querySelector("[data-open-daily-summary]")?.addEventListener("click",()=>{c.dashboardSummaryModalOpen=!0,w()}),document.querySelector("[data-close-daily-summary]")?.addEventListener("click",()=>{c.dashboardSummaryModalOpen=!1,w()}),document.querySelector("[data-print-dashboard]")?.addEventListener("click",t=>{const a=t.currentTarget.dataset.metrics;if(a)try{const r=JSON.parse(a);_n(r)}catch(r){console.error("Failed to parse dashboard metrics:",r)}}),document.querySelectorAll("[data-report-tab]").forEach(t=>{t.addEventListener("click",()=>{c.dailyReportTab=t.dataset.reportTab,w()})}),document.querySelectorAll("[data-maintenance-tab]").forEach(t=>{t.addEventListener("click",()=>{c.maintenanceTab=t.dataset.maintenanceTab,w()})})}function zn(){Dn(),document.querySelector("#login-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget),n=document.querySelector("#login-button");n&&(n.disabled=!0,n.textContent="Signing in...");try{const a=await qt(String(t.get("email")??""),String(t.get("password")??""));if(!a){c.loginError="Invalid email or password.",await w();return}c.currentUser=a,c.loginError="",await De("branch",String(a.branch||"Main Store")),t.get("remember")?localStorage.setItem(Ce,JSON.stringify({email:a.email,remembered:!0})):localStorage.removeItem(Ce),zt().includes(c.tab)||(c.tab="dashboard"),await w()}catch(a){alert("Login Error: "+String(a?.message||a)),n&&(n.disabled=!1,n.textContent="Sign in")}})}function Zn(){Re&&window.clearInterval(Re);const e=document.querySelector("[data-navbar-time]"),t=document.querySelector("[data-navbar-date]");if(!e||!t){Re=void 0;return}const n=()=>{const a=Cn();e.textContent=a.time,t.textContent=a.date};n(),Re=window.setInterval(n,1e3)}function $t(e,t){return e?t.find(n=>n.name.toLowerCase()===e.category.toLowerCase())??t.find(n=>n.name==="Regular Clothes")??t[0]??null:null}function Xe(e,t){return Math.max(1,Number(t.maxKg||e.maxKg||1))}function ta(e,t){return Object.fromEntries(t.filter(n=>n.serviceType==="order").map(n=>[n.id,Number(e.querySelector(`input[name="serviceQty-${n.id}"]`)?.value??0)]).filter(([,n])=>Number(n)>0))}function xt(e,t){const n=ta(e,t);return t.filter(a=>a.serviceType==="order"&&Number(n[a.id]??0)>0).map(a=>({...a,quantity:Number(n[a.id])}))}function aa(e,t){return Object.fromEntries(t.filter(n=>n.serviceType==="addon").map(n=>[n.id,Number(e.querySelector(`input[name="addonQty-${n.id}"]`)?.value??0)]).filter(([,n])=>Number(n)>0))}function Rt(e,t){const n=aa(e,t);return t.filter(a=>a.serviceType==="addon"&&Number(n[a.id]??0)>0).map(a=>({...a,quantity:Number(n[a.id])}))}function er(e){const t=document.querySelector("#order-form"),n=document.querySelector("#price-preview"),a=t?.querySelector('button[type="submit"]'),r=document.querySelector("#customer-name-input"),s=document.querySelector("#customer-id-input"),i=document.querySelector("#customer-phone-input"),d=document.querySelector("#customer-suggestions"),y=t?.querySelector("[data-order-error]"),m=t?.querySelector('select[name="paymentMethod"]'),l=t?.querySelector(".gcash-reference"),f=t?.querySelector('input[name="paymentReference"]');let o=!1,u;const E=v=>{if(!d||!r)return;const N=v.trim().toLowerCase();if(!N){d.hidden=!0;return}const L=e.customers.filter(h=>h.name.toLowerCase().includes(N)||(h.phone??"").includes(N)).slice(0,8),F=`<div class="ac-item ac-add" data-ac-new="true"><strong>+ Add new: "${p(v.trim())}"</strong></div>`,S=L.map(h=>`<div class="ac-item" data-ac-id="${h.id}" data-ac-name="${p(h.name)}" data-ac-phone="${p(h.phone??"")}"><strong>${p(h.name)}</strong>${h.phone?`<span>${p(h.phone)}</span>`:""}</div>`).join("");d.innerHTML=S+F,d.hidden=!1};r?.addEventListener("input",()=>{s&&(s.value=""),clearTimeout(u),u=window.setTimeout(()=>E(r.value),150)}),r?.addEventListener("focus",()=>{r.value.trim()&&E(r.value)}),d?.addEventListener("click",v=>{const N=v.target.closest(".ac-item");N&&(N.dataset.acNew==="true"?s&&(s.value=""):(r&&(r.value=N.dataset.acName??""),i&&(i.value=N.dataset.acPhone??""),s&&(s.value=N.dataset.acId??"")),d&&(d.hidden=!0))}),document.addEventListener("click",v=>{d&&!d.contains(v.target)&&v.target!==r&&(d.hidden=!0)});const P=()=>{const v=m?.value==="gcash";l&&(l.hidden=!v),f&&(f.required=v,v||(f.value=""))},q=(v,N)=>{if(!t)return;const L=t.querySelector(`input[name="${v}"]`);L&&(L.value=String(Math.max(0,Number(L.value||0)+N)),L.closest(".qty-card")?.classList.toggle("is-selected",Number(L.value)>0),L.dispatchEvent(new Event("input",{bubbles:!0})))};t?.querySelectorAll(".qty-control input").forEach(v=>{v.addEventListener("input",()=>{v.value=String(Math.max(0,Number(v.value||0))),v.closest(".qty-card")?.classList.toggle("is-selected",Number(v.value)>0)})}),t?.querySelectorAll("[data-qty-card]").forEach(v=>{v.addEventListener("click",N=>{const L=N.target;L.closest("input")||L.closest("button")||q(v.dataset.qtyCard??"",1)})}),t?.querySelectorAll("[data-qty-plus]").forEach(v=>{v.addEventListener("click",()=>q(v.dataset.qtyPlus??"",1))}),t?.querySelectorAll("[data-qty-minus]").forEach(v=>{v.addEventListener("click",()=>q(v.dataset.qtyMinus??"",-1))});const k=()=>{if(!t||!n)return;const v=xt(t,e.services),N=v[0],L=$t(N,e.categories),F=Rt(t,e.services),S=v.length>0&&N&&L,h=F.length>0;if(!S&&!h){a&&(a.disabled=!0),y&&(y.hidden=!o,y.textContent=o?"Please select at least one service or extra service.":""),n.innerHTML='<div class="preview-total"><span>Total amount</span><strong>PHP 0.00</strong></div>';return}if(S){const b=Oe(v,L,Xe(N,L),F),C=b.serviceLines.map(D=>`${D.name} x${D.quantity}`),R=b.extras.map(D=>`${oe(D.name)} x${D.quantity}`);a&&(a.disabled=!1),y&&(y.hidden=!0,y.textContent=""),n.classList.remove("has-error"),n.innerHTML=`
        <div class="preview-line"><span>Services${C.length?` (${p(C.join(", "))})`:""}</span><strong>${T(b.price)}</strong></div>
        ${b.extraServiceAmount>0?`<div class="preview-line"><span>Extra services${R.length?` (${p(R.join(", "))})`:""}</span><strong>${T(b.extraServiceAmount)}</strong></div>`:""}
        <div class="preview-total"><span>Total amount</span><strong>${T(b.totalAmount)}</strong></div>
      `}else{const b=F.reduce((R,D)=>R+D.price*(D.quantity??1),0),C=F.map(R=>`${oe(R.name)} x${R.quantity??1}`);a&&(a.disabled=!1),y&&(y.hidden=!0,y.textContent=""),n.classList.remove("has-error"),n.innerHTML=`
        <div class="preview-line"><span>Extra services (${p(C.join(", "))})</span><strong>${T(b)}</strong></div>
        <div class="preview-total"><span>Total amount</span><strong>${T(b)}</strong></div>
      `}};m?.addEventListener("change",P),P(),t?.addEventListener("input",k),t?.addEventListener("change",k),k(),t?.addEventListener("submit",async v=>{v.preventDefault(),o=!0;const N=new FormData(t),L=xt(t,e.services),F=L[0],S=$t(F,e.categories),h=Rt(t,e.services),b=L.length>0&&F&&S,C=h.length>0;if(!b&&!C){y&&(y.hidden=!1,y.textContent="Please select at least one service or extra service.");return}const R=L.map(U=>`${U.name} x${U.quantity}`).join(", "),D=b?Oe(L,S,Xe(F,S),h):Oe([],e.categories[0],1,h);if(confirm(`Save this order?

Services: ${R}
Total: ${T(D.totalAmount)}`))try{const U=await Ba({customerId:Number(N.get("customerId"))||void 0,customerName:String(N.get("customerName")??""),customerPhone:String(N.get("customerPhone")??"")||null,serviceQuantities:ta(t,e.services),branch:e.branch,itemCategoryId:S?.id??e.categories[0].id,weightKg:F&&S?Xe(F,S):1,addonQuantities:aa(t,e.services),paidAmount:Number(N.get("paidAmount")??0),paymentMethod:String(N.get("paymentMethod")??"cash"),paymentReference:String(N.get("paymentReference")??"")||null,notes:String(N.get("notes")??"")||null});await J("Create order",`${U.ticket} ${T(U.totalAmount)}`),c.receiptOrderId=U.id,await w()}catch(U){y&&(y.hidden=!1,y.textContent=U instanceof Error?U.message:"Order could not be saved.")}}),document.querySelectorAll(".advance-form").forEach(v=>{v.addEventListener("submit",async N=>{N.preventDefault();const L=Number(v.dataset.orderId),F=v.dataset.action==="claim",S=Number(v.dataset.balance||0);if(F&&S>0){alert("Please complete the balance before claiming this order.");return}const h=new FormData(v),b=h.getAll("assignedStaffId").map(Number).filter(B=>B>0),C=Number(h.get("releasedBy")||0),R=b.length>0?b:C>0?C:null;await St(L,R);const D=F&&C>0?e.staff.find(B=>B.id===C)?.name:null,U=F&&D?`Order ID ${L} (Released by: ${D})`:`Order ID ${L}`;await J(F?"Claim order":"Advance order",U),await w()})}),document.querySelectorAll(".fold-staff-select").forEach(v=>{v.addEventListener("change",async()=>{const N=Number(v.value);if(!N)return;const L=Number(v.dataset.orderId);v.disabled=!0;try{await Ut(L,N),await J("Record fold",`Order ID ${L} (Fold ${v.dataset.foldNumber??""})`),await w()}catch(F){v.disabled=!1,alert(F instanceof Error?F.message:"Could not save fold.")}})}),document.querySelectorAll(".claim-payment-form").forEach(v=>{const N=v.querySelector('select[name="method"]'),L=v.querySelector('input[name="reference"]'),F=()=>{const S=N?.value==="gcash";L&&(L.closest("label").hidden=!S,L.required=S,S||(L.value=""))};N?.addEventListener("change",F),F(),v.addEventListener("submit",async S=>{S.preventDefault();const h=new FormData(v),b=Number(h.get("amount"));if(b<=0)return;const C=Number(v.dataset.orderId);await Ke(C,{amount:b,method:String(h.get("method")),reference:String(h.get("reference")??"")||null}),await St(C,null),c.paymentModalOrderId=0,await w()})}),document.querySelectorAll("[data-close-payment-modal]").forEach(v=>{v.addEventListener("click",async()=>{c.paymentModalOrderId=0,await w()})}),document.querySelectorAll(".payment-form").forEach(v=>{const N=v.querySelector('select[name="method"]'),L=v.querySelector('input[name="reference"]'),F=()=>{const S=N?.value==="gcash";L&&(L.hidden=!S,L.required=S,S||(L.value=""))};N?.addEventListener("change",F),F(),v.addEventListener("submit",async S=>{S.preventDefault();const h=new FormData(v),b=Number(h.get("amount")),C=String(h.get("method")),R=String(h.get("reference")??"")||null;confirm(`Confirm payment of ${T(b)} via ${C.toUpperCase()}?`)&&(await Ke(Number(v.dataset.orderId),{amount:b,method:C,reference:R}),await J("Record payment",`${T(b)} ${C.toUpperCase()} for order ID ${v.dataset.orderId}`),await w())})}),document.querySelectorAll("[data-cancel-order]").forEach(v=>{v.addEventListener("click",async()=>{const N=Number(v.dataset.cancelOrder);if(Number.isFinite(N)&&confirm("Cancel this order? (No payment will be refunded.)"))try{c.receiptOrderId===N&&(c.receiptOrderId=0),await Ha(N),await J("Cancel order",`Order ID ${N}`),await w()}catch(L){alert(L instanceof Error?L.message:"Cancel failed.")}})}),document.querySelectorAll("[data-delete-order]").forEach(v=>{v.addEventListener("click",async()=>{const N=Number(v.dataset.deleteOrder);if(Number.isFinite(N)&&confirm("Delete this paid order and update sales?"))try{c.receiptOrderId===N&&(c.receiptOrderId=0),await Wa(N),await w()}catch(L){alert(L instanceof Error?L.message:"Delete failed.")}})})}function tr(e){document.querySelector("#service-form")?.addEventListener("submit",async t=>{t.preventDefault();const n=new FormData(t.currentTarget),a=n.get("id")?Number(n.get("id")):void 0;await bt({id:a,name:String(n.get("name")??""),description:String(n.get("description")??"")||null,category:String(n.get("category")??""),serviceType:String(n.get("serviceType")??"order"),price:Number(n.get("price")??0),maxKg:Number(n.get("maxKg")??0),dryingMinutes:Number(n.get("dryingMinutes"))||null,includes:n.getAll("includes").map(String).filter(Boolean),additionalCharge:0,turnaroundHours:Number(n.get("turnaroundHours")??24),isActive:1}),await w()}),document.querySelectorAll(".edit-service-btn").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.dataset.id),a=e.find(s=>s.id===n),r=document.querySelector("#service-form");a&&r&&(r.querySelector("[name=id]").value=String(a.id),r.querySelector("[name=name]").value=a.name,r.querySelector("[name=category]").value=a.category,r.querySelector("[name=serviceType]").value=a.serviceType,r.querySelector("[name=price]").value=String(a.price),r.querySelector("[name=maxKg]").value=String(a.maxKg),r.querySelector("[name=dryingMinutes]").value=a.dryingMinutes?String(a.dryingMinutes):"",r.querySelectorAll('input[name="includes"]').forEach(s=>{s.checked=a.includes.includes(s.value)}),r.querySelector("[name=turnaroundHours]").value=String(a.turnaroundHours),r.querySelector("[name=description]").value=a.description??"",window.scrollTo({top:0,behavior:"smooth"}))})}),document.querySelectorAll(".deactivate-service-btn, .activate-service-btn").forEach(t=>{t.addEventListener("click",async()=>{const n=Number(t.dataset.id),a=e.find(r=>r.id===n);if(a){const r=a.isActive?0:1;await bt({id:a.id,name:a.name,description:a.description,category:a.category,serviceType:a.serviceType,price:a.price,maxKg:a.maxKg,dryingMinutes:a.dryingMinutes,includes:a.includes,additionalCharge:a.additionalCharge,turnaroundHours:a.turnaroundHours,isActive:r}),await w()}})}),document.querySelector("#category-form")?.addEventListener("submit",async t=>{t.preventDefault();const n=new FormData(t.currentTarget);await Ua({name:String(n.get("name")??""),maxKg:Number(n.get("maxKg")??0),additionalFee:Number(n.get("additionalFee")??0),isActive:1}),await w()})}function ar(e){const t=document.querySelector("#expense-form"),n=t?.querySelector('input[name="disbursementType"]'),a=t?.querySelector(".expense-date-field"),r=t?.querySelector(".expense-month-field"),s=t?.querySelector('input[name="expenseDate"]'),i=t?.querySelector('input[name="expenseMonth"]'),d=t?.querySelector("[data-expense-category-select]"),y=t?.querySelector("[data-expense-category-custom-field]"),m=t?.querySelector('input[name="categoryCustom"]'),l=o=>{!t||!n||!s||!i||(n.value=o,t.querySelectorAll("[data-expense-type]").forEach(u=>{u.classList.toggle("is-active",u.dataset.expenseType===o)}),a&&(a.hidden=o==="monthly"),r&&(r.hidden=o!=="monthly"),s.required=o==="daily",i.required=o==="monthly",o==="monthly"&&!i.value&&(i.value=pe()),o==="daily"&&!s.value&&(s.value=W()))},f=()=>{if(!d||!y||!m)return;const o=d.value==="Other";y.hidden=!o,m.required=o,o||(m.value="")};t?.querySelectorAll("[data-expense-type]").forEach(o=>{o.addEventListener("click",()=>l(o.dataset.expenseType==="monthly"?"monthly":"daily"))}),d?.addEventListener("change",f),l("daily"),f(),t?.addEventListener("submit",async o=>{o.preventDefault();const u=new FormData(o.currentTarget),E=Number(u.get("id")||0),P=String(u.get("disbursementType")??"daily")==="monthly"?"monthly":"daily",q=String(u.get("expenseMonth")??pe()),k=String(u.get("category")??"").trim(),v=String(u.get("categoryCustom")??"").trim(),N=k==="Other"?v:k;if(!N){alert("Please enter a category name.");return}const L={expenseDate:P==="monthly"?`${q}-01`:String(u.get("expenseDate")??""),disbursementType:P,name:String(u.get("name")??""),category:N,description:"",amount:Number(u.get("amount")??0)};if(P==="daily"&&L.expenseDate!==W()){const F=prompt("Admin password is required for non-today disbursement dates.");if(!F||!await Ln(F)){alert("Admin password is incorrect. Disbursement was not saved.");return}}E?await Za(E,L):await za(L),await J(E?"Update disbursement":"Create disbursement",`${L.expenseDate} ${L.name} ${T(L.amount)}`),await w()}),document.querySelectorAll(".edit-expense-btn").forEach(o=>{o.addEventListener("click",()=>{const u=e.find(P=>P.id===Number(o.dataset.id));if(!u||!t)return;t.querySelector("[name=id]").value=String(u.id),t.querySelector("[name=expenseDate]").value=u.expenseDate,t.querySelector("[name=expenseMonth]").value=Yt(u.expenseDate),l(le(u)),d&&(d.value=u.category||"Other"),m&&(m.value=(d?.value==="Other","")),f(),t.querySelector("[name=amount]").value=String(u.amount),t.querySelector("[name=name]").value=u.name;const E=t.querySelector('button[type="submit"]');E&&(E.textContent="Update expense"),t.scrollIntoView({behavior:"smooth",block:"start"})})}),document.querySelectorAll(".delete-expense-btn").forEach(o=>{o.addEventListener("click",async()=>{if(c.currentUser?.role!=="admin")return;const u=Number(o.dataset.id);!Number.isFinite(u)||!confirm("Delete this disbursement?")||(await en(u),await w())})}),document.querySelector("#fold-form")?.addEventListener("submit",async o=>{o.preventDefault();const u=new FormData(o.currentTarget);await Ga({orderTicket:String(u.get("orderTicket")??""),staffName:String(u.get("staffName")??""),foldCount:Number(u.get("foldCount")??1),rate:Number(u.get("rate")??5)}),await w()})}function nr(e,t,n,a,r,s,i,d){document.querySelector("#generate-report")?.addEventListener("click",()=>{c.reportPreview=He(),w()});const y=document.querySelector("[data-month-summary]");y&&y.addEventListener("change",()=>{c.monthlySummaryMonth=y.value||pe()});const m=()=>{const S=y?.value||c.monthlySummaryMonth||pe();c.monthlySummaryMonth=S;const h=Tn(e,t,n,a,r,s,i,S,d);return{fileName:En(S),dataUrl:wn(h),report:h}},l=async()=>{const{fileName:S,dataUrl:h,report:b}=m();if(!x.isNativePlatform())return{fileName:S,uri:"",dataUrl:h,report:b};const C=S;await $e.writeFile({path:C,data:Sn(h),directory:ge.Cache,recursive:!0});const{uri:R}=await $e.getUri({path:C,directory:ge.Cache});return{fileName:S,uri:R,dataUrl:h,report:b}},f=()=>{const{fileName:S,dataUrl:h}=m(),b=document.createElement("a");return b.href=h,b.download=S,document.body.appendChild(b),b.click(),setTimeout(()=>{b.remove()},1e3),S},o=async()=>{const S=document.querySelector("#generate-monthly-summary");S&&(S.disabled=!0,S.textContent="Generating...");try{if(x.isNativePlatform()){const h=await l();try{await pt.share({title:`Laba101 monthly summary ${h.report.monthLabel}`,text:`Please find the attached monthly summary image: ${h.fileName}`,files:[h.uri],dialogTitle:"Share monthly summary"}),alert(`Monthly summary saved and shared as "${h.fileName}".`)}catch(b){const C=String(b).toLowerCase();if(C.includes("share canceled")||C.includes("canceled"))alert(`Monthly summary saved as "${h.fileName}".`);else throw b}}else{const h=f();alert(`Monthly summary downloaded as "${h}".`)}}catch(h){alert("Failed: "+String(h))}finally{S&&(S.disabled=!1,S.textContent="Generate monthly summary")}};document.querySelector("#generate-monthly-summary")?.addEventListener("click",async()=>{await o()});const u=document.querySelector("#sales-form");u?.addEventListener("submit",async S=>{S.preventDefault();const h=new FormData(S.currentTarget);await an({id:Number(h.get("id")||0)||void 0,saleDate:String(h.get("saleDate")??""),cashAmount:Number(h.get("cashAmount")??0),gcashAmount:Number(h.get("gcashAmount")??0),notes:""}),await w()}),document.querySelectorAll(".edit-sale-btn").forEach(S=>{S.addEventListener("click",()=>{const h=n.find(C=>C.id===Number(S.dataset.id));if(!h||!u)return;u.querySelector("[name=id]").value=String(h.id),u.querySelector("[name=saleDate]").value=h.saleDate,u.querySelector("[name=cashAmount]").value=String(h.cashAmount),u.querySelector("[name=gcashAmount]").value=String(h.gcashAmount);const b=u.querySelector('button[type="submit"]');b&&(b.textContent="Update daily sale"),u.scrollIntoView({behavior:"smooth",block:"start"})})}),document.querySelectorAll(".delete-sale-btn").forEach(S=>{S.addEventListener("click",async()=>{if(c.currentUser?.role!=="admin")return;const h=Number(S.dataset.id);!Number.isFinite(h)||!confirm("Delete this daily sale?")||(await nn(h),await w())})});const E=document.querySelector("[data-date-from]"),P=document.querySelector("[data-date-to]"),q=document.querySelector('[data-date-scope][value="custom"]');E&&q&&E.addEventListener("change",()=>q.checked=!0),P&&q&&P.addEventListener("change",()=>q.checked=!0),document.querySelectorAll("[data-date-scope]").forEach(S=>{S.addEventListener("change",()=>{if(!S.checked||!E||!P)return;const h=new Date,b=Q(h),C=new Date(h);S.value==="week"&&C.setDate(h.getDate()-6),S.value==="month"&&C.setDate(1),S.value!=="custom"&&(E.value=S.value==="today"?b:Q(C),P.value=b)})});const k=S=>{const h=R=>String(R??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;"),b=R=>R==="Sales Report"?[110,125,150,215,95,95,105,105]:R==="Disbursement"?[115,115,90,150,150,220,105]:R==="Fold Count"?[220,125]:R==="Revolving Daily Summary"?[115,105,120,115]:R==="Revolving History"?[115,96,140,96,110,180,120]:[155,125,125,125,95,95,115,115];return`<?xml version="1.0"?>
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
  ${S.map(R=>{const D=b(R.name),U=Math.max(D.length,...R.rows.map(H=>H.length),1),B=Math.max(R.rows.length,1),ee=D.map(H=>`<Column ss:Width="${H}" ss:AutoFitWidth="0"/>`).join(""),te=R.rows.map(H=>{if(!H.length)return'<Row ss:Height="10" ss:StyleID="BorderRow"><Cell ss:StyleID="BorderCell"><Data ss:Type="String">&nbsp;</Data></Cell></Row>';const Ae=H[0]==="Type"||H[0]==="Summary"||H[0]==="Sales Summary"||H[0]==="Disbursement Summary"||H[0]==="Staff"||H[0]==="Date of Sales"||H[0]==="Date"||H[0]==="Date/Month"||H[0]==="Ticket",it=Ae?"HeaderRow":"BorderRow",ot=Ae?"HeaderCell":"BorderCell",lt=Ae?26:22,g=H.map(I=>`<Cell ss:StyleID="${ot}"><Data ss:Type="${typeof I=="number"?"Number":"String"}">${h(I)}</Data></Cell>`).join("");return`<Row ss:Height="${lt}" ss:StyleID="${it}">${g}</Row>`}).join("");return`
        <Worksheet ss:Name="${h(R.name)}">
          <Table ss:ExpandedColumnCount="${U}" ss:ExpandedRowCount="${B}">
            ${ee}
            ${te}
          </Table>
        </Worksheet>`}).join("")}
</Workbook>`},v=()=>{const S=He(),h=rt(e,t,n,a,r,s,i,S,d),b=[];if(h.selectedTypes.has("sales")){const D=h.salesRows(),U=[["Ticket","Customer","Cash","GCash","Total Payment"],...D.transactions.map(B=>[B.ticket,B.customer,B.cash,B.gcash,B.total]),[],["Cash from Orders","GCash from Orders","Sales from Orders"],[D.orderCashTotal,D.orderGcashTotal,D.orderCashTotal+D.orderGcashTotal],[],["Cash Whole Sale","GCash Whole Sale","Whole Sale of Day"],[D.manualCashTotal,D.manualGcashTotal,D.manualCashTotal+D.manualGcashTotal],[],["Total Cash","Total GCash","Total Sales"],[D.totalCash,D.totalGcash,D.totalSales]];b.push({name:"Sales Report",rows:U})}h.selectedTypes.has("disbursement")&&b.push({name:"Disbursement",rows:h.disbursementRows().rows}),h.selectedTypes.has("fold_count")&&b.push({name:"Fold Count",rows:h.foldCountRows().rows}),h.selectedTypes.has("revolving_fund")&&(b.push({name:"Revolving Daily Summary",rows:h.revolvingDailySummaryRows().rows}),b.push({name:"Revolving History",rows:h.revolvingHistoryRows().rows})),h.selectedTypes.has("summary")&&b.push({name:"Summary",rows:h.summaryRows()});const C=k(b.length?b:[{name:"Summary",rows:h.summaryRows()}]);return{fileName:`laba101-report-${S.from}-to-${S.to}.xls`,content:C}},N=async()=>{const{fileName:S,content:h}=v();if(!x.isNativePlatform())return{fileName:S,uri:""};const b=S;await $e.writeFile({path:b,data:h,directory:ge.Cache,encoding:Ge.UTF8,recursive:!0});const{uri:C}=await $e.getUri({path:b,directory:ge.Cache});return{fileName:S,uri:C}},L=()=>{const{fileName:S,content:h}=v(),b=new Blob([h],{type:"application/vnd.ms-excel;charset=utf-8;"}),C=URL.createObjectURL(b),R=document.createElement("a");return R.href=C,R.download=S,document.body.appendChild(R),R.click(),setTimeout(()=>{R.remove(),URL.revokeObjectURL(C)},1e3),S},F=async S=>{const h=document.querySelector(S==="export"?"#export-report":"#email-report");h&&(h.disabled=!0,h.textContent=S==="export"?"Exporting...":"Sending...");try{if(S==="export")if(x.isNativePlatform()){const b=await N();alert(`Report exported as "${b.fileName}".`)}else{const b=L();alert(`Report saved: ${b}`)}else{const b=await It("report_email")||"";if(!b){alert("Please configure a report email in Settings first.");return}const C=He(),R=`Laba101 report ${C.from} to ${C.to}`;if(x.isNativePlatform()){const D=await N();try{await pt.share({title:R,text:`Please find the attached Laba101 report file: ${D.fileName}`,files:[D.uri],dialogTitle:"Send report via email"}),alert(`Report saved and shared as "${D.fileName}".`)}catch(U){const B=String(U).toLowerCase();if(B.includes("share canceled")||B.includes("canceled"))alert(`Report saved as "${D.fileName}".`);else throw U}}else{const D=L(),U=`Hi,

Please find the attached Laba101 report file: ${D}

Date range: ${C.from} to ${C.to}`,B=`mailto:${b}?subject=${encodeURIComponent(R)}&body=${encodeURIComponent(U)}`;setTimeout(()=>{window.location.href=B},800),alert(`Report downloaded as "${D}".
Your email app will open — please attach the file and send.`)}}}catch(b){alert("Failed: "+String(b))}finally{h&&(h.disabled=!1,h.textContent=S==="export"?"Export Excel":"Send to Email")}};document.querySelector("#export-report")?.addEventListener("click",async()=>{await F("export")}),document.querySelector("#email-report")?.addEventListener("click",async()=>{await F("email")})}function rr(){document.querySelector("#order-queue-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);c.orderSearch=String(t.get("orderSearch")??"").trim(),c.orderDateFilter=String(t.get("orderDateFilter")??"").trim(),c.orderPaymentFilter=String(t.get("orderPaymentFilter")??"").trim(),w()}),document.querySelector("#order-queue-clear")?.addEventListener("click",()=>{c.orderSearch="",c.orderDateFilter="",c.orderPaymentFilter="",w()}),document.querySelector("#archived-order-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);c.archivedOrderSearch=String(t.get("archivedOrderSearch")??"").trim(),w()}),document.querySelector("#archived-order-clear")?.addEventListener("click",()=>{c.archivedOrderSearch="",w()})}function sr(){document.querySelector("#customer-search-form")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);c.customerSearch=String(t.get("customerSearch")??"").trim(),w()}),document.querySelector("#customer-search-clear")?.addEventListener("click",()=>{c.customerSearch="",w()})}function ir(){document.querySelector("#machine-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await cn({machineName:String(t.get("machineName")??""),machineType:String(t.get("machineType")),status:String(t.get("status")),branch:String(t.get("branch")??"")}),await w()}),document.querySelector("#subcleaning-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=e.currentTarget.querySelector('button[type="submit"]');t&&(t.disabled=!0,t.textContent="Starting...");const n=new FormData(e.currentTarget),a=n.getAll("machineIds").map(Number);if(!a.length){alert("Please select at least one machine to clean."),t&&(t.disabled=!1,t.textContent="Start Cleaning");return}await Wt({date:String(n.get("date")??""),machineIds:a,cleaningStatus:String(n.get("cleaningStatus")??""),cleaningType:"tube",notes:String(n.get("notes")??""),branch:String(n.get("branch")??"")}),await J("Start tube cleaning",`${a.length} machine(s)`),await w()}),document.querySelector("#confirm-general-cleaning")?.addEventListener("click",async()=>{await yn(document.querySelector('input[name="branch"]')?.value||c.currentUser?.branch||"Main Store",c.currentUser?.name??"Unknown"),await J("Confirm general cleaning",W()),await w()}),document.querySelectorAll(".complete-cleaning-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.machineId),n=e.dataset.branch??"";e.disabled=!0,e.textContent="Completing...",await mn(t,n),await J("Complete tube cleaning",`Machine ID ${t}`),await w()})}),document.querySelectorAll(".deactivate-machine-btn, .activate-machine-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.id),n=e.classList.contains("deactivate-machine-btn");await dn(t,n?"inactive":"available"),await w()})})}function or(e,t){const n=document.querySelector("#inventory-form");n?.addEventListener("submit",async a=>{a.preventDefault();const r=new FormData(a.currentTarget),s=Number(r.get("id")||0);await sn({id:s||void 0,name:String(r.get("name")??""),unit:String(r.get("unit")??""),quantity:Number(r.get("quantity")??0),reorderLevel:Number(r.get("reorderLevel")??0),notes:String(r.get("notes")??""),branch:t}),await J(s?"Update inventory item":"Create inventory item",String(r.get("name")??"")),await w()}),document.querySelectorAll(".edit-inventory-btn").forEach(a=>{a.addEventListener("click",()=>{const r=e.find(s=>s.id===Number(a.dataset.id));!r||!n||(n.querySelector("[name=id]").value=String(r.id),n.querySelector("[name=name]").value=r.name,n.querySelector("[name=unit]").value=r.unit,n.querySelector("[name=quantity]").value=String(r.quantity),n.querySelector("[name=reorderLevel]").value=String(r.reorderLevel),n.querySelector("[name=notes]").value=r.notes??"",n.scrollIntoView({behavior:"smooth",block:"start"}))})}),document.querySelector("#inventory-movement-form")?.addEventListener("submit",async a=>{a.preventDefault();const r=new FormData(a.currentTarget),s=String(r.get("movementType")??"in")==="out"?"out":"in";try{await ln({itemId:Number(r.get("itemId")??0),movementType:s,quantity:Number(r.get("quantity")??0),notes:String(r.get("notes")??""),staffName:c.currentUser?.name??"Unknown",branch:t}),await J(s==="in"?"Stock-in":"Stock-out",`Item ID ${r.get("itemId")} qty ${r.get("quantity")}`),await w()}catch(i){alert(i instanceof Error?i.message:"Stock movement failed.")}})}function lr(e){const t=document.querySelector("#add-staff-modal"),n=document.querySelector("#open-add-staff-modal"),a=document.querySelector("#close-add-staff-modal"),r=document.querySelector("#staff-form"),s=()=>{r?.reset(),r&&(r.querySelector("[name=id]").value="");const d=document.querySelector("#add-staff-title");d&&(d.textContent="Add staff member"),t?.removeAttribute("hidden")},i=()=>{t?.setAttribute("hidden",""),r?.reset()};n?.addEventListener("click",s),a?.addEventListener("click",i),t?.addEventListener("click",d=>{d.target===t&&i()}),document.querySelectorAll(".edit-staff-btn").forEach(d=>{d.addEventListener("click",()=>{const y=Number(d.dataset.id),m=e.find(l=>l.id===y);if(m&&r){r.querySelector("[name=id]").value=String(m.id),r.querySelector("[name=name]").value=m.name,r.querySelector("[name=email]").value=m.email,r.querySelector("[name=password]").value=m.password,r.querySelector("[name=role]").value=m.role,r.querySelector("[name=branch]").value=m.branch;const l=document.querySelector("#add-staff-title");l&&(l.textContent="Edit staff member"),t?.removeAttribute("hidden")}})}),document.querySelectorAll(".deactivate-staff-btn, .activate-staff-btn").forEach(d=>{d.addEventListener("click",async()=>{const y=Number(d.dataset.id),m=e.find(l=>l.id===y);m&&(await gt(y,{isActive:m.isActive!==0?0:1}),await w())})}),r?.addEventListener("submit",async d=>{d.preventDefault();const y=document.querySelector("#staff-save-btn");y&&(y.disabled=!0,y.textContent="Saving...");const m=new FormData(r),l=m.get("id")?Number(m.get("id")):void 0,f=String(m.get("name")??"").trim(),o=String(m.get("email")??"").trim(),u=String(m.get("password")??"password")||"password",E=String(m.get("role")),P=String(m.get("branch")??"");if(!f||!o){alert("Name and email are required."),y&&(y.disabled=!1,y.textContent="Save staff member");return}try{l?await gt(l,{name:f,email:o,password:u,role:E,branch:P}):await qa({name:f,email:o,password:u,role:E,branch:P}),i(),await w()}catch{alert("Failed to save staff. The email may already be in use."),y&&(y.disabled=!1,y.textContent="Save staff member")}})}function cr(){document.querySelector("#settings-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await De("branch",String(t.get("branch")??"Main Store")),await De("fold_rate",String(t.get("foldRate")??"5")),String(t.get("reportEmail")??"")&&await De("report_email",String(t.get("reportEmail"))),alert("Settings saved successfully!")})}async function dr(){await Oa();const e=localStorage.getItem(Ce);if(e)try{const t=JSON.parse(e);if(t.email&&t.remembered){const n=await qt(t.email,"password")??null;c.currentUser=n}}catch{localStorage.removeItem(Ce)}await w()}function ur(e,t,n,a){const r=e.filter(u=>u.status==="revolving").reduce((u,E)=>u+E.cashAmount,0),s=t.filter(u=>u.type==="add").reduce((u,E)=>u+E.amount,0),i=t.filter(u=>u.type==="disbursement").reduce((u,E)=>u+E.amount,0),d=r+s-i,y=c.revolvingHistoryFrom||"0000-01-01",m=c.revolvingHistoryTo||"9999-12-31",l=t.filter(u=>{const E=K(u.createdAt);return E>=y&&E<=m}),f=e.map(u=>{const E=Xt(u.saleDate,n,a,u.cashAmount),P=u.status==="revolving"?'<span class="ok">Revolving</span>':u.status==="endorsed"?`<span class="warn">Endorsed to ${p(u.endorsedTo)}</span>`:'<span class="meta">Pending</span>',q=u.status!=="revolving"&&u.status!=="endorsed"?`<div class="row-actions">
          <button class="primary revolving-btn" data-id="${u.id}">Revolving</button>
          <button class="secondary endorsed-btn" data-id="${u.id}" data-date="${be(u.saleDate)}">Endorsed</button>
        </div>`:"";return[`<strong>${p(be(u.saleDate))}</strong>`,`<strong class="ok">${T(E)}</strong>`,P,u.statusUpdatedAt?p(be(u.statusUpdatedAt)):"-",q]}),o=l.map(u=>[ke(u.createdAt),`<strong>${p(u.revolvingNumber)}</strong>`,p(u.name),`<strong class="${u.type==="disbursement"?"warn":"ok"}">${u.type==="disbursement"?"-":"+"}${T(u.amount)}</strong>`,p(u.category),p(u.description||"-"),`<span class="${u.type==="add"?"ok":"warn"}">${u.type==="add"?"Add Revolving Fund":"Disbursement"}</span>`]);return`
    <section class="grid content full">
      <div class="panel-header" style="display: flex; gap: 16px; margin-bottom: 24px; align-items: center;">
        <button class="primary" id="add-revolving-fund-btn">Add Revolving Fund</button>
        <button class="secondary" id="revolving-disbursement-btn">Disbursement</button>
      </div>

      <article class="panel">
        <div style="background-color: #061a42; color: white; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
          <p style="font-size: 12px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin: 0 0 8px 0;">Revolving Fund Total</p>
          <p style="font-size: 32px; font-weight: 800; margin: 0;">${T(d)}</p>
        </div>
        ${M("Daily Summary","Cash on hand per day (order cash + manual cash − disbursements)")}
        ${se(["Date of Sales","Cash on Hand","Status","Date Update","Action"],f,"data-table orders-data-table bordered-table")}
      </article>

      <article class="panel">
        ${M("Revolving Table History","Filter by date — DISB numbers shared with Daily Report expenses")}
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
        ${se(["Date","Disbursement #","Name","Amount","Category","Description","Type"],o,"data-table orders-data-table bordered-table")}
      </article>

      ${c.endorseModalOpen?`
        <div class="modal-backdrop" role="presentation">
          <div class="receipt-modal" role="dialog" aria-modal="true" style="max-width: 400px; width: 90%;">
            <form id="endorse-form" class="form" style="padding: 24px;">
              <h3 style="margin-top: 0;">Endorse Money</h3>
              <p class="meta" style="margin-bottom: 16px;">Endorsing cash from <strong>${p(c.endorseSaleDate)}</strong>.</p>
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
  `}function mr(){document.querySelector("#revolving-history-filters")?.addEventListener("submit",async l=>{l.preventDefault();const f=new FormData(l.currentTarget);c.revolvingHistoryFrom=String(f.get("revolvingHistoryFrom")??"").trim(),c.revolvingHistoryTo=String(f.get("revolvingHistoryTo")??"").trim(),await w()}),document.querySelector("#revolving-history-clear")?.addEventListener("click",async()=>{c.revolvingHistoryFrom="",c.revolvingHistoryTo="",await w()}),document.querySelectorAll(".revolving-btn").forEach(l=>{l.addEventListener("click",async()=>{c.revolvingModalOpen=!0,c.revolvingSaleId=Number(l.dataset.id),await w()})});const e=document.getElementById("confirm-revolving-btn");e&&e.addEventListener("click",async()=>{await Tt(c.revolvingSaleId,"revolving",null,new Date().toISOString()),c.revolvingModalOpen=!1,await w()});const t=document.getElementById("close-revolving-modal");t&&t.addEventListener("click",async()=>{c.revolvingModalOpen=!1,await w()}),document.querySelectorAll(".endorsed-btn").forEach(l=>{l.addEventListener("click",async()=>{c.endorseModalOpen=!0,c.endorseSaleId=Number(l.dataset.id),c.endorseSaleDate=l.dataset.date??"",await w()})});const n=document.getElementById("close-endorse-modal");n&&n.addEventListener("click",async()=>{c.endorseModalOpen=!1,await w()});const a=document.getElementById("endorse-form");a&&a.addEventListener("submit",async l=>{l.preventDefault();const f=new FormData(a),o=String(f.get("endorsedTo")??"").trim();o&&(await Tt(c.endorseSaleId,"endorsed",o,new Date().toISOString()),c.endorseModalOpen=!1,await w())});const r=document.getElementById("add-revolving-fund-btn");r&&r.addEventListener("click",async()=>{c.addFundModalOpen=!0,await w()});const s=document.getElementById("close-add-fund-modal");s&&s.addEventListener("click",async()=>{c.addFundModalOpen=!1,await w()});const i=document.getElementById("add-fund-form");i&&i.addEventListener("submit",async l=>{l.preventDefault();const f=new FormData(i);await wt({name:String(f.get("name")??"").trim(),amount:Number(f.get("amount")??0),category:"Add Revolving Fund",description:null,type:"add",createdAt:new Date().toISOString()}),c.addFundModalOpen=!1,await w()});const d=document.getElementById("revolving-disbursement-btn");d&&d.addEventListener("click",async()=>{c.disbursementModalOpen=!0,await w()});const y=document.getElementById("close-disbursement-modal");y&&y.addEventListener("click",async()=>{c.disbursementModalOpen=!1,await w()});const m=document.getElementById("disbursement-form");m&&m.addEventListener("submit",async l=>{l.preventDefault();const f=new FormData(m);await wt({name:String(f.get("name")??"").trim(),amount:Number(f.get("amount")??0),category:String(f.get("category")??"").trim(),description:String(f.get("description")??"").trim(),type:"disbursement",expenseDate:W(),createdAt:new Date().toISOString()}),c.disbursementModalOpen=!1,await w()})}dr();export{Ge as E,Ye as W,da as b};
