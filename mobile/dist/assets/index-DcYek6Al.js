(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();var Se;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(Se||(Se={}));class je extends Error{constructor(t,n,a){super(t),this.message=t,this.code=n,this.data=a}}const ra=e=>{var t,n;return e?.androidBridge?"android":!((n=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||n===void 0)&&n.bridge?"ios":"web"},ia=e=>{const t=e.CapacitorCustomPlatform||null,n=e.Capacitor||{},a=n.Plugins=n.Plugins||{},s=()=>t!==null?t.name:ra(e),r=()=>s()!=="web",i=f=>{const o=m.get(f);return!!(o?.platforms.has(s())||d(f))},d=f=>{var o;return(o=n.PluginHeaders)===null||o===void 0?void 0:o.find(u=>u.name===f)},p=f=>e.console.error(f),m=new Map,l=(f,o={})=>{const u=m.get(f);if(u)return console.warn(`Capacitor plugin "${f}" already registered. Cannot register plugins twice.`),u.proxy;const T=s(),P=d(f);let q;const U=async()=>(!q&&T in o?q=typeof o[T]=="function"?q=await o[T]():q=o[T]:t!==null&&!q&&"web"in o&&(q=typeof o.web=="function"?q=await o.web():q=o.web),q),h=(b,$)=>{var x,D;if(P){const k=P?.methods.find(B=>$===B.name);if(k)return k.rtype==="promise"?B=>n.nativePromise(f,$.toString(),B):(B,ee)=>n.nativeCallback(f,$.toString(),B,ee);if(b)return(x=b[$])===null||x===void 0?void 0:x.bind(b)}else{if(b)return(D=b[$])===null||D===void 0?void 0:D.bind(b);throw new je(`"${f}" plugin is not implemented on ${T}`,Se.Unimplemented)}},N=b=>{let $;const x=(...D)=>{const k=U().then(B=>{const ee=h(B,b);if(ee){const te=ee(...D);return $=te?.remove,te}else throw new je(`"${f}.${b}()" is not implemented on ${T}`,Se.Unimplemented)});return b==="addListener"&&(k.remove=async()=>$()),k};return x.toString=()=>`${b.toString()}() { [capacitor code] }`,Object.defineProperty(x,"name",{value:b,writable:!1,configurable:!1}),x},L=N("addListener"),F=N("removeListener"),S=(b,$)=>{const x=L({eventName:b},$),D=async()=>{const B=await x;F({eventName:b,callbackId:B},$)},k=new Promise(B=>x.then(()=>B({remove:D})));return k.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await D()},k},v=new Proxy({},{get(b,$){switch($){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return P?S:L;case"removeListener":return F;default:return N($)}}});return a[f]=v,m.set(f,{name:f,proxy:v,platforms:new Set([...Object.keys(o),...P?[T]:[]])}),v};return n.convertFileSrc||(n.convertFileSrc=f=>f),n.getPlatform=s,n.handleError=p,n.isNativePlatform=r,n.isPluginAvailable=i,n.registerPlugin=l,n.Exception=je,n.DEBUG=!!n.DEBUG,n.isLoggingEnabled=!!n.isLoggingEnabled,n},oa=e=>e.Capacitor=ia(e),R=oa(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),he=R.registerPlugin;class Ve{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,n){let a=!1;this.listeners[t]||(this.listeners[t]=[],a=!0),this.listeners[t].push(n);const r=this.windowListeners[t];r&&!r.registered&&this.addWindowListener(r),a&&this.sendRetainedArgumentsForEvent(t);const i=async()=>this.removeListener(t,n);return Promise.resolve({remove:i})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,n,a){const s=this.listeners[t];if(!s){if(a){let r=this.retainedEventArguments[t];r||(r=[]),r.push(n),this.retainedEventArguments[t]=r}return}s.forEach(r=>r(n))}hasListeners(t){var n;return!!(!((n=this.listeners[t])===null||n===void 0)&&n.length)}registerWindowListener(t,n){this.windowListeners[n]={registered:!1,windowEventName:t,pluginEventName:n,handler:a=>{this.notifyListeners(n,a)}}}unimplemented(t="not implemented"){return new R.Exception(t,Se.Unimplemented)}unavailable(t="not available"){return new R.Exception(t,Se.Unavailable)}async removeListener(t,n){const a=this.listeners[t];if(!a)return;const s=a.indexOf(n);this.listeners[t].splice(s,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const n=this.retainedEventArguments[t];n&&(delete this.retainedEventArguments[t],n.forEach(a=>{this.notifyListeners(t,a)}))}}const yt=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),ft=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class ca extends Ve{async getCookies(){const t=document.cookie,n={};return t.split(";").forEach(a=>{if(a.length<=0)return;let[s,r]=a.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=ft(s).trim(),r=ft(r).trim(),n[s]=r}),n}async setCookie(t){try{const n=yt(t.key),a=yt(t.value),s=t.expires?`; expires=${t.expires.replace("expires=","")}`:"",r=(t.path||"/").replace("path=",""),i=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${n}=${a||""}${s}; path=${r}; ${i};`}catch(n){return Promise.reject(n)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(n){return Promise.reject(n)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const n of t)document.cookie=n.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}he("CapacitorCookies",{web:()=>new ca});const la=async e=>new Promise((t,n)=>{const a=new FileReader;a.onload=()=>{const s=a.result;t(s.indexOf(",")>=0?s.split(",")[1]:s)},a.onerror=s=>n(s),a.readAsDataURL(e)}),da=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(s=>s.toLocaleLowerCase()).reduce((s,r,i)=>(s[r]=e[t[i]],s),{})},ua=(e,t=!0)=>e?Object.entries(e).reduce((a,s)=>{const[r,i]=s;let d,p;return Array.isArray(i)?(p="",i.forEach(m=>{d=t?encodeURIComponent(m):m,p+=`${r}=${d}&`}),p.slice(0,-1)):(d=t?encodeURIComponent(i):i,p=`${r}=${d}`),`${a}&${p}`},"").substr(1):null,ma=(e,t={})=>{const n=Object.assign({method:e.method||"GET",headers:e.headers},t),s=da(e.headers)["content-type"]||"";if(typeof e.data=="string")n.body=e.data;else if(s.includes("application/x-www-form-urlencoded")){const r=new URLSearchParams;for(const[i,d]of Object.entries(e.data||{}))r.set(i,d);n.body=r.toString()}else if(s.includes("multipart/form-data")||e.data instanceof FormData){const r=new FormData;if(e.data instanceof FormData)e.data.forEach((d,p)=>{r.append(p,d)});else for(const d of Object.keys(e.data))r.append(d,e.data[d]);n.body=r;const i=new Headers(n.headers);i.delete("content-type"),n.headers=i}else(s.includes("application/json")||typeof e.data=="object")&&(n.body=JSON.stringify(e.data));return n};class pa extends Ve{async request(t){const n=ma(t,t.webFetchExtra),a=ua(t.params,t.shouldEncodeUrlParams),s=a?`${t.url}?${a}`:t.url,r=await fetch(s,n),i=r.headers.get("content-type")||"";let{responseType:d="text"}=r.ok?t:{};i.includes("application/json")&&(d="json");let p,m;switch(d){case"arraybuffer":case"blob":m=await r.blob(),p=await la(m);break;case"json":p=await r.json();break;default:p=await r.text()}const l={};return r.headers.forEach((f,o)=>{l[o]=f}),{data:p,headers:l,status:r.status,url:r.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}he("CapacitorHttp",{web:()=>new pa});var ht;(function(e){e.Dark="DARK",e.Light="LIGHT",e.Default="DEFAULT"})(ht||(ht={}));var vt;(function(e){e.StatusBar="StatusBar",e.NavigationBar="NavigationBar"})(vt||(vt={}));class ya extends Ve{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}he("SystemBars",{web:()=>new ya});const fa="modulepreload",ha=function(e){return"/"+e},gt={},Je=function(t,n,a){let s=Promise.resolve();if(n&&n.length>0){let p=function(m){return Promise.all(m.map(l=>Promise.resolve(l).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),d=i?.nonce||i?.getAttribute("nonce");s=p(n.map(m=>{if(m=ha(m),m in gt)return;gt[m]=!0;const l=m.endsWith(".css"),f=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${m}"]${f}`))return;const o=document.createElement("link");if(o.rel=l?"stylesheet":fa,l||(o.as="script"),o.crossOrigin="",o.href=m,d&&o.setAttribute("nonce",d),document.head.appendChild(o),l)return new Promise((u,T)=>{o.addEventListener("load",u),o.addEventListener("error",()=>T(new Error(`Unable to preload CSS for ${m}`)))})}))}function r(i){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=i,window.dispatchEvent(d),!d.defaultPrevented)throw i}return s.then(i=>{for(const d of i||[])d.status==="rejected"&&r(d.reason);return t().catch(r)})};function va(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,n){return new Proxy({},{get(a,s){return(r,i,d)=>{const p=e.Capacitor.Plugins[n];if(p===void 0){d(new Error(`Capacitor plugin ${n} not found`));return}if(typeof p[s]!="function"){d(new Error(`Method ${s} not found in Capacitor plugin ${n}`));return}(async()=>{try{const m=await p[s](r);i(m)}catch(m){d(m)}})()}}})}})}function ga(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,n){return e.cordova.plugins[n]}})}function ba(e=!1){typeof window>"u"||(window.CapacitorUtils=window.CapacitorUtils||{},window.Capacitor!==void 0&&!e?va(window):window.cordova!==void 0&&ga(window))}var ge;(function(e){e.Documents="DOCUMENTS",e.Data="DATA",e.Library="LIBRARY",e.Cache="CACHE",e.External="EXTERNAL",e.ExternalStorage="EXTERNAL_STORAGE",e.ExternalCache="EXTERNAL_CACHE",e.LibraryNoCloud="LIBRARY_NO_CLOUD",e.Temporary="TEMPORARY"})(ge||(ge={}));var Ke;(function(e){e.UTF8="utf8",e.ASCII="ascii",e.UTF16="utf16"})(Ke||(Ke={}));const Re=he("Filesystem",{web:()=>Je(()=>import("./web-B2TB0bo1.js"),[]).then(e=>new e.FilesystemWeb)});ba();const bt=he("Share",{web:()=>Je(()=>import("./web-el4k4Ppc.js"),[]).then(e=>new e.ShareWeb)});class Sa{constructor(t){this.sqlite=t,this._connectionDict=new Map}async initWebStore(){try{return await this.sqlite.initWebStore(),Promise.resolve()}catch(t){return Promise.reject(t)}}async saveToStore(t){try{return await this.sqlite.saveToStore({database:t}),Promise.resolve()}catch(n){return Promise.reject(n)}}async saveToLocalDisk(t){try{return await this.sqlite.saveToLocalDisk({database:t}),Promise.resolve()}catch(n){return Promise.reject(n)}}async getFromLocalDiskToStore(t){const n=t??!0;try{return await this.sqlite.getFromLocalDiskToStore({overwrite:n}),Promise.resolve()}catch(a){return Promise.reject(a)}}async echo(t){try{const n=await this.sqlite.echo({value:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async isSecretStored(){try{const t=await this.sqlite.isSecretStored();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async setEncryptionSecret(t){try{return await this.sqlite.setEncryptionSecret({passphrase:t}),Promise.resolve()}catch(n){return Promise.reject(n)}}async changeEncryptionSecret(t,n){try{return await this.sqlite.changeEncryptionSecret({passphrase:t,oldpassphrase:n}),Promise.resolve()}catch(a){return Promise.reject(a)}}async clearEncryptionSecret(){try{return await this.sqlite.clearEncryptionSecret(),Promise.resolve()}catch(t){return Promise.reject(t)}}async checkEncryptionSecret(t){try{const n=await this.sqlite.checkEncryptionSecret({passphrase:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async addUpgradeStatement(t,n){try{return t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.addUpgradeStatement({database:t,upgrade:n}),Promise.resolve()}catch(a){return Promise.reject(a)}}async createConnection(t,n,a,s,r){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.createConnection({database:t,encrypted:n,mode:a,version:s,readonly:r});const i=new St(t,r,this.sqlite),d=r?`RO_${t}`:`RW_${t}`;return this._connectionDict.set(d,i),Promise.resolve(i)}catch(i){return Promise.reject(i)}}async closeConnection(t,n){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.closeConnection({database:t,readonly:n});const a=n?`RO_${t}`:`RW_${t}`;return this._connectionDict.delete(a),Promise.resolve()}catch(a){return Promise.reject(a)}}async isConnection(t,n){const a={};t.endsWith(".db")&&(t=t.slice(0,-3));const s=n?`RO_${t}`:`RW_${t}`;return a.result=this._connectionDict.has(s),Promise.resolve(a)}async retrieveConnection(t,n){t.endsWith(".db")&&(t=t.slice(0,-3));const a=n?`RO_${t}`:`RW_${t}`;if(this._connectionDict.has(a)){const s=this._connectionDict.get(a);return typeof s<"u"?Promise.resolve(s):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async getNCDatabasePath(t,n){try{const a=await this.sqlite.getNCDatabasePath({path:t,database:n});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async createNCConnection(t,n){try{await this.sqlite.createNCConnection({databasePath:t,version:n});const a=new St(t,!0,this.sqlite),s=`RO_${t})`;return this._connectionDict.set(s,a),Promise.resolve(a)}catch(a){return Promise.reject(a)}}async closeNCConnection(t){try{await this.sqlite.closeNCConnection({databasePath:t});const n=`RO_${t})`;return this._connectionDict.delete(n),Promise.resolve()}catch(n){return Promise.reject(n)}}async isNCConnection(t){const n={},a=`RO_${t})`;return n.result=this._connectionDict.has(a),Promise.resolve(n)}async retrieveNCConnection(t){if(this._connectionDict.has(t)){const n=`RO_${t})`,a=this._connectionDict.get(n);return typeof a<"u"?Promise.resolve(a):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async isNCDatabase(t){try{const n=await this.sqlite.isNCDatabase({databasePath:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async retrieveAllConnections(){return this._connectionDict}async closeAllConnections(){const t=new Map;try{for(const n of this._connectionDict.keys()){const a=n.substring(3),s=n.substring(0,3)==="RO_";await this.sqlite.closeConnection({database:a,readonly:s}),t.set(n,null)}for(const n of t.keys())this._connectionDict.delete(n);return Promise.resolve()}catch(n){return Promise.reject(n)}}async checkConnectionsConsistency(){try{const t=[...this._connectionDict.keys()],n=[],a=[];for(const r of t)n.push(r.substring(0,2)),a.push(r.substring(3));const s=await this.sqlite.checkConnectionsConsistency({dbNames:a,openModes:n});return s.result||(this._connectionDict=new Map),Promise.resolve(s)}catch(t){return this._connectionDict=new Map,Promise.reject(t)}}async importFromJson(t){try{const n=await this.sqlite.importFromJson({jsonstring:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async isJsonValid(t){try{const n=await this.sqlite.isJsonValid({jsonstring:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async copyFromAssets(t){const n=t??!0;try{return await this.sqlite.copyFromAssets({overwrite:n}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getFromHTTPRequest(t,n){const a=n??!0;try{return await this.sqlite.getFromHTTPRequest({url:t,overwrite:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async isDatabaseEncrypted(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const n=await this.sqlite.isDatabaseEncrypted({database:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async isInConfigEncryption(){try{const t=await this.sqlite.isInConfigEncryption();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isInConfigBiometricAuth(){try{const t=await this.sqlite.isInConfigBiometricAuth();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isDatabase(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const n=await this.sqlite.isDatabase({database:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async getDatabaseList(){try{const n=(await this.sqlite.getDatabaseList()).values;n.sort();const a={values:n};return Promise.resolve(a)}catch(t){return Promise.reject(t)}}async getMigratableDbList(t){const n=t||"default";try{const a=await this.sqlite.getMigratableDbList({folderPath:n});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async addSQLiteSuffix(t,n){const a=t||"default",s=n||[];try{const r=await this.sqlite.addSQLiteSuffix({folderPath:a,dbNameList:s});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async deleteOldDatabases(t,n){const a=t||"default",s=n||[];try{const r=await this.sqlite.deleteOldDatabases({folderPath:a,dbNameList:s});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async moveDatabasesAndAddSuffix(t,n){const a=t||"default",s=n||[];return this.sqlite.moveDatabasesAndAddSuffix({folderPath:a,dbNameList:s})}}class St{constructor(t,n,a){this.dbName=t,this.readonly=n,this.sqlite=a}getConnectionDBName(){return this.dbName}getConnectionReadOnly(){return this.readonly}async open(){try{return await this.sqlite.open({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async close(){try{return await this.sqlite.close({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async beginTransaction(){try{const t=await this.sqlite.beginTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async commitTransaction(){try{const t=await this.sqlite.commitTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async rollbackTransaction(){try{const t=await this.sqlite.rollbackTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTransactionActive(){try{const t=await this.sqlite.isTransactionActive({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async loadExtension(t){try{return await this.sqlite.loadExtension({database:this.dbName,path:t,readonly:this.readonly}),Promise.resolve()}catch(n){return Promise.reject(n)}}async enableLoadExtension(t){try{return await this.sqlite.enableLoadExtension({database:this.dbName,toggle:t,readonly:this.readonly}),Promise.resolve()}catch(n){return Promise.reject(n)}}async getUrl(){try{const t=await this.sqlite.getUrl({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getVersion(){try{const t=await this.sqlite.getVersion({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getTableList(){try{const t=await this.sqlite.getTableList({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async execute(t,n=!0,a=!0){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const s=await this.sqlite.execute({database:this.dbName,statements:t,transaction:n,readonly:!1,isSQL92:a});return Promise.resolve(s)}}catch(s){return Promise.reject(s)}}async query(t,n,a=!0){let s;try{return n&&n.length>0?s=await this.sqlite.query({database:this.dbName,statement:t,values:n,readonly:this.readonly,isSQL92:!0}):s=await this.sqlite.query({database:this.dbName,statement:t,values:[],readonly:this.readonly,isSQL92:a}),s=await this.reorderRows(s),Promise.resolve(s)}catch(r){return Promise.reject(r)}}async run(t,n,a=!0,s="no",r=!0){let i;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(n&&n.length>0?i=await this.sqlite.run({database:this.dbName,statement:t,values:n,transaction:a,readonly:!1,returnMode:s,isSQL92:!0}):i=await this.sqlite.run({database:this.dbName,statement:t,values:[],transaction:a,readonly:!1,returnMode:s,isSQL92:r}),i.changes=await this.reorderRows(i.changes),Promise.resolve(i))}catch(d){return Promise.reject(d)}}async executeSet(t,n=!0,a="no",s=!0){let r;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(r=await this.sqlite.executeSet({database:this.dbName,set:t,transaction:n,readonly:!1,returnMode:a,isSQL92:s}),r.changes=await this.reorderRows(r.changes),Promise.resolve(r))}catch(i){return Promise.reject(i)}}async isExists(){try{const t=await this.sqlite.isDBExists({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTable(t){try{const n=await this.sqlite.isTableExists({database:this.dbName,table:t,readonly:this.readonly});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async isDBOpen(){try{const t=await this.sqlite.isDBOpen({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async delete(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteDatabase({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async createSyncTable(){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const t=await this.sqlite.createSyncTable({database:this.dbName,readonly:!1});return Promise.resolve(t)}}catch(t){return Promise.reject(t)}}async setSyncDate(t){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.setSyncDate({database:this.dbName,syncdate:t,readonly:!1}),Promise.resolve())}catch(n){return Promise.reject(n)}}async getSyncDate(){try{const t=await this.sqlite.getSyncDate({database:this.dbName,readonly:this.readonly});let n="";return t.syncDate>0&&(n=new Date(t.syncDate*1e3).toISOString()),Promise.resolve(n)}catch(t){return Promise.reject(t)}}async exportToJson(t,n=!1){try{const a=await this.sqlite.exportToJson({database:this.dbName,jsonexportmode:t,readonly:this.readonly,encrypted:n});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async deleteExportedRows(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteExportedRows({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async executeTransaction(t,n=!0){let a=0,s=!1;if(this.readonly)return Promise.reject("not allowed in read-only mode");if(await this.sqlite.beginTransaction({database:this.dbName}),s=await this.sqlite.isTransactionActive({database:this.dbName}),!s)return Promise.reject("After Begin Transaction, no transaction active");try{for(const d of t){if(typeof d!="object"||!("statement"in d))throw new Error("Error a task.statement must be provided");if("values"in d&&d.values&&d.values.length>0){const p=d.statement.toUpperCase().includes("RETURNING")?"all":"no",m=await this.sqlite.run({database:this.dbName,statement:d.statement,values:d.values,transaction:!1,readonly:!1,returnMode:p,isSQL92:n});if(m.changes.changes<0)throw new Error("Error in transaction method run ");a+=m.changes.changes}else{const p=await this.sqlite.execute({database:this.dbName,statements:d.statement,transaction:!1,readonly:!1});if(p.changes.changes<0)throw new Error("Error in transaction method execute ");a+=p.changes.changes}}const r=await this.sqlite.commitTransaction({database:this.dbName});a+=r.changes.changes;const i={changes:{changes:a}};return Promise.resolve(i)}catch(r){const i=r.message?r.message:r;return await this.sqlite.rollbackTransaction({database:this.dbName}),Promise.reject(i)}}async reorderRows(t){const n=t;if(t?.values&&typeof t.values[0]=="object"&&Object.keys(t.values[0]).includes("ios_columns")){const a=t.values[0].ios_columns,s=[];for(let r=1;r<t.values.length;r++){const i=t.values[r],d={};for(const p of a)d[p]=i[p];s.push(d)}n.values=s}return Promise.resolve(n)}}const Ea=he("CapacitorSQLite",{web:()=>Je(()=>import("./web-BXQD3dzP.js"),[]).then(e=>new e.CapacitorSQLiteWeb),electron:()=>window.CapacitorCustomPlatform.plugins.CapacitorSQLite});function Ta(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}const wa="laba101_offline",Pe="fresh_start_reset_v1",Na=new Sa(Ea);let xe=null;const Z=[{id:1,name:"Laba101 Admin",email:"admin@laba101.test",password:"password",role:"admin",branch:"Main Store"},{id:2,name:"Mintal Branch Admin",email:"admin@laba101.mintal",password:"password",role:"admin",branch:"Mintal Branch"},{id:3,name:"Gensan Branch Admin",email:"admin@laba101.gensan",password:"password",role:"admin",branch:"Gensan Branch"},{id:4,name:"Gensan Branch Staff",email:"staff@laba101.gensan",password:"password",role:"staff",branch:"Gensan Branch"},{id:5,name:"Biya",email:"biya@laba101.mintal",password:"password",role:"staff",branch:"Mintal Branch"},{id:6,name:"Jam",email:"jam@laba101.mintal",password:"password",role:"staff",branch:"Mintal Branch"}],Ie=[],ne=[z(1,"Drop-off","P185. Includes wash, dry, and fold.","Drop-Off","order",185,8,40,["Wash","Dry","Fold"],0,24),z(2,"Full Service","P200. Wash, Fabcon, detergent, dry, and fold.","Full Service","order",200,8,40,["Wash","Dry","Fold","Detergent","Fabcon"],0,24),z(3,"Self Service Wash","P60. Self-service wash (max 8kg per load).","Self Service","order",60,8,null,["Wash"],0,1),z(4,"Self Service Dry","P70. Self-service dry (40 mins).","Self Service","order",70,8,40,["Dry"],0,1),z(6,"Dry 10 mins","Additional drying time (10 mins).","Add-on","addon",30,8,10,["Dry"],0,1),z(7,"Dry 20 mins","Additional drying time (20 mins).","Add-on","addon",50,8,20,["Dry"],0,1),z(8,"Dry 40 mins","Additional drying time (40 mins).","Add-on","addon",70,8,40,["Dry"],0,1),z(9,"Additional Zonrox","Extra Zonrox bleach add-on per load.","Add-on","addon",10,0,null,["Zonrox"],0,0),z(10,"Additional Fabcon","Extra Fabcon fabric conditioner add-on per load.","Add-on","addon",10,0,null,["Fabcon"],0,0),z(11,"Additional Finishing","Extra finishing spray add-on per load.","Add-on","addon",20,0,null,["Finishing"],0,0)],le=[{id:1,name:"Regular Clothes",maxKg:8,additionalFee:0,isActive:1},{id:2,name:"Comforter",maxKg:4,additionalFee:0,isActive:1},{id:3,name:"Thin Blankets",maxKg:6,additionalFee:0,isActive:1},{id:4,name:"Bedsheets",maxKg:6,additionalFee:0,isActive:1},{id:5,name:"Bath Towels",maxKg:6,additionalFee:0,isActive:1},{id:6,name:"Curtains",maxKg:6,additionalFee:0,isActive:1}];function Et(e,t){const n=C(e,[]),a=new Map(n.map(r=>[r.id,r])),s=t.map(r=>{const i=a.get(r.id);return i?{...r,...i,isActive:i.isActive??r.isActive}:r});(n.length!==s.length||s.some((r,i)=>r.id!==n[i]?.id||JSON.stringify(r)!==JSON.stringify(n[i])))&&A(e,s)}async function Aa(){Et("services",ne),Et("item_categories",le)}async function Ue(e){for(const t of ne)((await e.query("SELECT id FROM laundry_services WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive,t.id]):await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive]);for(const t of le)((await e.query("SELECT id FROM item_categories WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.maxKg,t.additionalFee,t.isActive,t.id]):await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[t.id,t.name,t.maxKg,t.additionalFee,t.isActive])}const de=[],Ee=[],ye=[],Te=[],we=[],se=[...[1,2,3,4].map(e=>({id:e,machineName:`Washer ${e}`,machineType:"washer",status:"available",branch:"Main Store"})),...[1,2,3,4].map(e=>({id:e+4,machineName:`Dryer ${e}`,machineType:"dryer",status:"available",branch:"Main Store"}))],Ne=[{key:"branch",value:"Main Store"},{key:"fold_rate",value:"5"},{key:"report_email",value:"admin@laba101.test"}];function z(e,t,n,a,s,r,i,d,p,m,l){return{id:e,name:t,description:n,category:a,serviceType:s,price:r,maxKg:i,dryingMinutes:d,includes:p,additionalCharge:m,turnaroundHours:l,isActive:1}}function V(e){return`laba101-mobile-${e}`}function C(e,t){const n=localStorage.getItem(V(e));if(!n)return structuredClone(t);try{return JSON.parse(n)}catch{return structuredClone(t)}}function A(e,t){localStorage.setItem(V(e),JSON.stringify(t))}function K(e){return e.reduce((t,n)=>Math.max(t,n.id),0)+1}function J(){return new Date().toISOString()}function qe(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${a}`}function La(){return qe().slice(2).replaceAll("-","")}function ae(e,t){if(!e)return t;try{return JSON.parse(e)}catch{return t}}async function O(){return xe||(xe=await Na.createConnection(wa,!1,"no-encryption",1,!1),await xe.open()),xe}async function j(e,t,n,a){((await e.query(`PRAGMA table_info(${t})`)).values??[]).some(i=>i.name===n)||await e.execute(`ALTER TABLE ${t} ADD COLUMN ${n} ${a}`)}function $a(){const e=C("staff",Z),t=new Map(e.map(a=>[a.id,a]));let n=!1;for(const a of Z){const s=t.get(a.id);if(!s){t.set(a.id,{...a,isActive:1}),n=!0;continue}const r={...s,name:a.name,email:a.email,password:a.password,role:a.role,branch:a.branch,isActive:1};JSON.stringify(r)!==JSON.stringify(s)&&(t.set(a.id,r),n=!0)}n&&A("staff",Array.from(t.values()).sort((a,s)=>a.id-s.id))}async function Ca(){localStorage.getItem(V(Pe))||(A("staff",Z),A("customers",[]),A("orders",[]),A("payments",[]),A("fold_logs",[]),A("expenses",[]),A("sales",[]),localStorage.getItem(V("services"))||A("services",ne),localStorage.getItem(V("item_categories"))||A("item_categories",le),localStorage.getItem(V("machines"))||A("machines",se),localStorage.getItem(V("subcleanings"))||A("subcleanings",[]),localStorage.getItem(V("settings"))||A("settings",Ne),localStorage.removeItem("laba101-mobile-session"),A(Pe,!0))}async function qt(e){for(const t of Z){if(((await e.query("SELECT id FROM staff WHERE id = ?",[t.id])).values??[]).length>0){await e.run("UPDATE staff SET name = ?, email = ?, password = ?, role = ?, branch = ?, isActive = 1 WHERE id = ?",[t.name,t.email,t.password,t.role,t.branch,t.id]);continue}await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.email,t.password,t.role,t.branch,1])}}async function Ra(e){if(!(((await e.query("SELECT COUNT(*) as count FROM machines")).values?.[0]?.count??0)>0))for(const n of se)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[n.id,n.machineName,n.machineType,n.status,n.branch])}async function xa(e){for(const t of Ne)await e.run("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)",[t.key,t.value])}async function Ft(e){for(const t of ne)((await e.query("SELECT id FROM laundry_services WHERE id = ?",[t.id])).values??[]).length>0||await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive]);for(const t of le)((await e.query("SELECT id FROM item_categories WHERE id = ?",[t.id])).values??[]).length>0||await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[t.id,t.name,t.maxKg,t.additionalFee,t.isActive])}async function Da(e){((await e.query("SELECT value FROM settings WHERE key = ?",[Pe])).values??[]).length>0||(await e.execute(`
    DELETE FROM payments;
    DELETE FROM orders;
    DELETE FROM customers;
    DELETE FROM fold_logs;
    DELETE FROM disbursement_expenses;
    DELETE FROM daily_sales;
    DELETE FROM revolving_history;
    DELETE FROM staff WHERE id NOT IN (1, 2);
  `),await qt(e),await Ft(e),await Ra(e),await xa(e),await e.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",[Pe,J()]),localStorage.removeItem("laba101-mobile-session"))}async function Oa(){if(!R.isNativePlatform()){await Ca(),!localStorage.getItem(V("seeded_v4"))&&!localStorage.getItem(V("services"))&&!localStorage.getItem(V("staff"))&&(A("staff",Z),A("customers",Ie),A("services",ne),A("item_categories",le),A("orders",de),A("payments",Ee),A("fold_logs",[]),A("expenses",ye),A("sales",Te),A("revolving_history",we),A("machines",se),A("subcleanings",[]),A("settings",Ne),A("seeded_v4",!0)),await Aa(),$a(),localStorage.getItem(V("seeded_v4"))||A("seeded_v4",!0);return}const e=await O();await e.execute(`
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
  `),await j(e,"staff","email","TEXT"),await j(e,"staff","password","TEXT"),await j(e,"staff","role","TEXT"),await j(e,"staff","isActive","INTEGER NOT NULL DEFAULT 1"),await e.run('UPDATE staff SET password = ? WHERE password IS NULL OR password = ""',["password"]),await e.run('UPDATE staff SET role = ? WHERE role IS NULL OR role = ""',["staff"]),await j(e,"orders","customerId","INTEGER NOT NULL DEFAULT 0"),await j(e,"orders","phone","TEXT"),await j(e,"orders","serviceId","INTEGER NOT NULL DEFAULT 0"),await j(e,"orders","serviceLines","TEXT"),await j(e,"orders","itemCategoryId","INTEGER NOT NULL DEFAULT 0"),await j(e,"orders","itemCategory",'TEXT NOT NULL DEFAULT "Regular Clothes"'),await j(e,"orders","workflowCompleted","TEXT"),await j(e,"orders","weightKg","REAL NOT NULL DEFAULT 0"),await j(e,"orders","price","REAL NOT NULL DEFAULT 0"),await j(e,"orders","additionalCharge","REAL NOT NULL DEFAULT 0"),await j(e,"orders","extraServiceAmount","REAL NOT NULL DEFAULT 0"),await j(e,"orders","totalAmount","REAL NOT NULL DEFAULT 0"),await j(e,"orders","paidAmount","REAL NOT NULL DEFAULT 0"),await j(e,"orders","extras","TEXT"),await j(e,"orders","notes","TEXT"),await j(e,"orders","foldedByStaffIds","TEXT"),await j(e,"orders","foldedAt","TEXT"),await j(e,"orders","releasedBy","INTEGER"),await j(e,"orders","dueAt","TEXT"),await j(e,"orders","createdAt",'TEXT NOT NULL DEFAULT ""'),await j(e,"daily_sales","saleNumber","TEXT"),await j(e,"daily_sales","status","TEXT"),await j(e,"daily_sales","endorsedTo","TEXT"),await j(e,"daily_sales","statusUpdatedAt","TEXT"),await j(e,"disbursement_expenses","disbursementType",'TEXT NOT NULL DEFAULT "daily"'),await j(e,"subcleanings","cleaningType",'TEXT NOT NULL DEFAULT "tube"');const n=((await e.query("SELECT COUNT(*) as count FROM staff")).values?.[0]?.count??0)===0;if(n){for(const a of Z)await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.name,a.email,a.password,a.role,a.branch,1]);for(const a of Ie)await e.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[a.id,a.name,a.phone,a.address]);for(const a of ne)await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[a.id,a.name,a.description,a.category,a.serviceType,a.price,a.maxKg,a.dryingMinutes,JSON.stringify(a.includes),a.additionalCharge,a.turnaroundHours,a.isActive]);for(const a of le)await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[a.id,a.name,a.maxKg,a.additionalFee,a.isActive]);for(const a of de)await Mt(e,a);for(const a of Ee)await e.run("INSERT INTO payments (id, orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.orderId,a.amount,a.method,a.reference,a.receivedAt,a.branch]);for(const a of ye)await e.run("INSERT INTO disbursement_expenses (id, expenseDate, number, disbursementType, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[a.id,a.expenseDate,a.number,a.disbursementType??"daily",a.name,a.category,a.description,a.amount]);for(const a of Te)await e.run("INSERT INTO daily_sales (id, saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.saleDate,a.saleNumber,a.cashAmount,a.gcashAmount,a.totalAmount,a.notes]);for(const a of we)await e.run("INSERT INTO revolving_history (id, revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[a.id,a.revolvingNumber,a.name,a.amount,a.category,a.description,a.type,a.createdAt]);for(const a of se)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[a.id,a.machineName,a.machineType,a.status,a.branch]);for(const a of Ne)await e.run("INSERT INTO settings (key, value) VALUES (?, ?)",[a.key,a.value]);await e.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",["fresh_install_defaults",J()])}await Ue(e),await qt(e),n||await Ft(e),await Da(e)}async function Mt(e,t){await e.run("INSERT INTO orders (id, ticket, customerId, customer, phone, serviceId, service, serviceLines, itemCategoryId, itemCategory, branch, status, workflowCompleted, weightKg, price, additionalCharge, extraServiceAmount, totalAmount, paidAmount, extras, notes, foldedBy, foldedByStaffIds, foldedAt, dueAt, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.ticket,t.customerId,t.customer,t.phone,t.serviceId,t.service,JSON.stringify(t.serviceLines??[]),t.itemCategoryId,t.itemCategory,t.branch,t.status,JSON.stringify(t.workflowCompleted),t.weightKg,t.price,t.additionalCharge,t.extraServiceAmount,t.totalAmount,t.paidAmount,JSON.stringify(t.extras),t.notes,t.foldedBy,JSON.stringify(t.foldedByStaffIds??[]),t.foldedAt??null,t.dueAt,t.createdAt])}function Pa(e){const t=Number(e.paidAmount??0),n=Number(e.totalAmount??0),a=Number(e.foldedBy),s=Number(e.releasedBy),r=ae(e.serviceLines,[]),i=Number(e.serviceId),d=String(e.service),p=Number(e.price);return{id:Number(e.id),ticket:String(e.ticket),customerId:Number(e.customerId),customer:String(e.customer),phone:e.phone?String(e.phone):null,serviceId:i,service:d,serviceLines:r.length?r:[{id:i,name:d,price:p,quantity:1,total:p}],itemCategoryId:Number(e.itemCategoryId),itemCategory:String(e.itemCategory),branch:String(e.branch),status:String(e.status),workflowCompleted:ae(e.workflowCompleted,[]),weightKg:Number(e.weightKg),price:p,additionalCharge:Number(e.additionalCharge),extraServiceAmount:Number(e.extraServiceAmount),totalAmount:n,paidAmount:t,balance:Number((n-t).toFixed(2)),extras:ae(e.extras,[]),notes:e.notes?String(e.notes):null,foldedBy:Number.isFinite(a)&&a>0?a:null,foldedByName:e.foldedByName?String(e.foldedByName):null,foldedByStaffIds:ae(e.foldedByStaffIds,[]),foldedAt:e.foldedAt?String(e.foldedAt):null,releasedBy:Number.isFinite(s)&&s>0?s:null,releasedByName:e.releasedByName?String(e.releasedByName):null,dueAt:String(e.dueAt),createdAt:String(e.createdAt)}}async function Ia(){await Oa()}async function me(){return(await ze()).find(t=>t.key==="branch")?.value??"Main Store"}async function qa(){const e=await ze();return Number(e.find(t=>t.key==="fold_rate")?.value??"5")}async function Qe(e){return(await ze()).find(n=>n.key===e)?.value}async function ze(){return R.isNativePlatform()?(await(await O()).query("SELECT key, value FROM settings ORDER BY key")).values??[]:C("settings",Ne)}async function $e(e,t){if(!R.isNativePlatform()){const a=C("settings",Ne).filter(s=>s.key!==e);a.push({key:e,value:t}),A("settings",a);return}await(await O()).run("REPLACE INTO settings (key, value) VALUES (?, ?)",[e,t])}async function Fa(e){return R.isNativePlatform()?(await(await O()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff WHERE branch = ? ORDER BY name ASC',[e])).values??[]:C("staff",Z).filter(a=>a.branch===e)}async function Ze(){return R.isNativePlatform()?(await(await O()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff ORDER BY name ASC')).values??[]:C("staff",Z)}async function kt(e,t){const n=e.trim().toLowerCase();return(await Ze()).find(s=>s.email.toLowerCase()===n&&s.password===t&&s.isActive!==0)??null}async function Ma(e){if(!R.isNativePlatform()){const n=C("staff",Z);n.unshift({id:K(n),...e,isActive:1}),A("staff",n);return}await(await O()).run("INSERT INTO staff (name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?)",[e.name,e.email,e.password,e.role,e.branch,1])}async function Tt(e,t){if(!R.isNativePlatform()){const r=C("staff",Z),i=r.find(d=>d.id===e);i&&(Object.assign(i,t),A("staff",r));return}const n=await O(),a=[],s=[];for(const[r,i]of Object.entries(t))r!=="id"&&(a.push(`${r} = ?`),s.push(i));a.length&&(s.push(e),await n.run(`UPDATE staff SET ${a.join(", ")} WHERE id = ?`,s))}async function ka(){return R.isNativePlatform()?(await(await O()).query("SELECT id, name, phone, address FROM customers ORDER BY name ASC")).values??[]:C("customers",Ie).sort((n,a)=>n.name.localeCompare(a.name))}async function Ua(e){if(!R.isNativePlatform()){const s=C("customers",Ie),r=e.id?s.find(d=>d.id===e.id):s.find(d=>d.name.toLowerCase()===e.name.toLowerCase()&&(e.phone?d.phone===e.phone:!0));if(r)return r.name=e.name,r.phone=e.phone??r.phone,r.address=e.address??r.address,A("customers",s),r;const i={id:K(s),name:e.name,phone:e.phone??null,address:e.address??null};return s.push(i),A("customers",s),i}const t=await O();if(e.id)return await t.run("UPDATE customers SET name = ?, phone = ?, address = ? WHERE id = ?",[e.name,e.phone??null,e.address??null,e.id]),{id:e.id,name:e.name,phone:e.phone??null,address:e.address??null};const n=await t.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM customers"),a=Number((n.values?.[0]).id);return await t.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[a,e.name,e.phone??null,e.address??null]),{id:a,name:e.name,phone:e.phone??null,address:e.address??null}}async function Be(e){if(!R.isNativePlatform())return C("services",ne).filter(a=>!0);const t=await O(),n=await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[]);return(n.values??[]).length===0?(await Ue(t),((await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[])).values??[]).map(s=>({...s,includes:ae(s.includes,[])}))):(n.values??[]).map(a=>({...a,includes:ae(a.includes,[])}))}async function Ba(){if(!R.isNativePlatform())return C("services",ne);const e=await O(),t=await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC");return(t.values??[]).length===0?(await Ue(e),((await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC")).values??[]).map(a=>({...a,includes:ae(a.includes,[])}))):(t.values??[]).map(n=>({...n,includes:ae(n.includes,[])}))}async function wt(e){if(!R.isNativePlatform()){const n=C("services",ne),a=e.id?n.find(s=>s.id===e.id):null;a?Object.assign(a,e):n.unshift({...e,id:K(n)}),A("services",n);return}const t=await O();e.id?await t.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = ? WHERE id = ?",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive,e.id]):await t.run("INSERT INTO laundry_services (name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive])}async function Ut(){if(!R.isNativePlatform())return C("item_categories",le).filter(n=>n.isActive);const e=await O(),t=await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC");return(t.values??[]).length===0?(await Ue(e),(await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC")).values??[]):t.values??[]}async function _a(e){if(!R.isNativePlatform()){const n=C("item_categories",le),a=e.id?n.find(s=>s.id===e.id):null;a?Object.assign(a,e):n.unshift({...e,id:K(n)}),A("item_categories",n);return}const t=await O();e.id?await t.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = ? WHERE id = ?",[e.name,e.maxKg,e.additionalFee,e.isActive,e.id]):await t.run("INSERT INTO item_categories (name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?)",[e.name,e.maxKg,e.additionalFee,e.isActive])}function Oe(e,t,n,a){const s=(Array.isArray(e)?e:[e]).map(o=>{const u=Math.max(0,Number(o.quantity??1)),T=Number(o.price);return{id:o.id,name:o.name,price:T,quantity:u,total:Number((T*u).toFixed(2))}}).filter(o=>o.quantity>0),r=Number(t.maxKg),i=0,d=0,p=a.map(o=>{const u=Math.max(0,Number(o.quantity??1)),T=Number(o.price);return{id:o.id,name:Ta(o.name),price:T,quantity:u,total:Number((T*u).toFixed(2))}}).filter(o=>o.quantity>0),m=s.reduce((o,u)=>o+u.total,0),l=p.reduce((o,u)=>o+u.total,0),f=Number((m+d+l).toFixed(2));return{price:Number(m.toFixed(2)),additionalCharge:Number(d.toFixed(2)),extraServiceAmount:Number(l.toFixed(2)),totalAmount:f,allowedKg:r,extraKg:Number(i.toFixed(2)),warning:null,serviceLines:s,extras:p}}function et(e,t){return[...(e.serviceLines&&e.serviceLines.length?e.serviceLines:e.serviceId?[{id:e.serviceId}]:[]).some(s=>{const r=t.find(i=>i.id===s.id);return Array.isArray(r?.includes)&&r.includes.includes("Fold")})?[{key:"fold",label:"Fold"}]:[],{key:"claimed",label:"Claimed"}]}function Bt(e){return e.includes("claimed")?"claimed":e.includes("fold")?"ready":"received"}function _t(e,t){const n=e.serviceLines?.length?e.serviceLines:e.serviceId?[{id:e.serviceId,quantity:1}]:[];let a=0;return n.forEach(s=>{const r=t.find(i=>i.id===s.id);r&&Array.isArray(r.includes)&&r.includes.includes("Fold")&&(a+=Number(s.quantity??1))}),a>0?a:1}async function Fe(e,t){if(e==="browser"){const n=C("orders",de),a=n.find(s=>s.id===t.id);a&&Object.assign(a,t),A("orders",n);return}await e.run("UPDATE orders SET workflowCompleted = ?, status = ?, foldedBy = ?, foldedByStaffIds = ?, foldedAt = ?, releasedBy = ? WHERE id = ?",[JSON.stringify(t.workflowCompleted),t.status,t.foldedBy,JSON.stringify(t.foldedByStaffIds??[]),t.foldedAt??null,t.releasedBy,t.id])}async function jt(e,t){if(!t)return;const n=await me(),[a,s]=await Promise.all([ve(n),Be()]),r=a.find(l=>l.id===e);if(!r||et(r,s).find(l=>!r.workflowCompleted.includes(l.key))?.key!=="fold")return;const d=_t(r,s),p=Array.isArray(r.foldedByStaffIds)?[...r.foldedByStaffIds]:[];if(p.length>=d)return;if(p.push(t),r.foldedByStaffIds=p,r.foldedBy=r.foldedBy||t,r.foldedAt=r.foldedAt||J(),p.length>=d&&(r.workflowCompleted=[...r.workflowCompleted,"fold"]),r.status=Bt(r.workflowCompleted),!R.isNativePlatform()){await Fe("browser",r);return}const m=await O();await Fe(m,r)}async function ve(e){return R.isNativePlatform()?((await(await O()).query("SELECT o.*, folded.name as foldedByName, released.name as releasedByName FROM orders o LEFT JOIN staff folded ON folded.id = o.foldedBy LEFT JOIN staff released ON released.id = o.releasedBy WHERE o.branch = ? ORDER BY o.id DESC",[e])).values??[]).map(a=>Pa(a)):C("orders",de).filter(a=>a.branch===e).map(a=>({...a,serviceLines:a.serviceLines??[{id:a.serviceId,name:a.service,price:Number(a.price),quantity:1,total:Number(a.price)}],foldedByStaffIds:a.foldedByStaffIds??[],foldedAt:a.foldedAt??null,releasedBy:a.releasedBy??null,releasedByName:a.releasedByName??null,balance:Number((a.totalAmount-a.paidAmount).toFixed(2))}))}async function ja(e){const[t,n]=await Promise.all([Be(),Ut()]),a=e.serviceQuantities??(e.serviceId?{[e.serviceId]:1}:{}),s=t.filter(h=>h.serviceType==="order"&&Number(a[h.id]??0)>0).map(h=>({...h,quantity:Number(a[h.id]??0)})),r=s[0],i=n.find(h=>h.id===e.itemCategoryId)??n.find(h=>h.name.toLowerCase()===(r?.category??"").toLowerCase())??n.find(h=>h.name==="Regular Clothes")??n[0],d=e.addonQuantities??Object.fromEntries((e.addonIds??[]).map(h=>[h,1])),p=t.filter(h=>h.serviceType==="addon"&&Number(d[h.id]??0)>0).map(h=>({...h,quantity:Number(d[h.id]??0)}));if(!s.length&&!p.length)throw new Error("Please select at least one service or extra service.");const m=e.weightKg??Math.max(1,Number(i?.maxKg||r?.maxKg||1)),l=Oe(s,i,m,p),f=await Ua({id:e.customerId||void 0,name:e.customerName,phone:e.customerPhone??null}),o=Math.max(0,e.paidAmount),u=Math.min(l.totalAmount,o),T={ticket:await Ha(),customerId:f.id,customer:f.name,phone:f.phone,serviceId:r?.id??0,service:l.serviceLines.length?l.serviceLines.map(h=>`${h.name} x${h.quantity}`).join(", "):"Extras only",serviceLines:l.serviceLines,itemCategoryId:i.id,itemCategory:i.name,branch:e.branch,status:"received",workflowCompleted:["received"],weightKg:m,price:l.price,additionalCharge:l.additionalCharge,extraServiceAmount:l.extraServiceAmount,totalAmount:l.totalAmount,paidAmount:u,balance:Number((l.totalAmount-u).toFixed(2)),extras:l.extras,notes:e.notes||null,foldedBy:null,foldedByName:null,foldedByStaffIds:[],foldedAt:null,releasedBy:null,releasedByName:null,dueAt:new Date(Date.now()+Math.max(1,...s.map(h=>h.turnaroundHours))*60*60*1e3).toISOString(),createdAt:J()};if(!R.isNativePlatform()){const h=C("orders",de),N={...T,id:K(h)};return h.unshift(N),A("orders",h),o>0&&await Ye(N.id,{amount:o,method:e.paymentMethod,reference:e.paymentReference??null}),N}const P=await O(),q=await P.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM orders"),U={...T,id:Number((q.values?.[0]).id)};return await Mt(P,U),o>0&&await P.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[U.id,o,e.paymentMethod,e.paymentReference??null,J(),e.branch]),U}async function Ha(){const e=`LB${La()}`,t=await me(),a=(await ve(t)).filter(r=>r.ticket.startsWith(e)).sort((r,i)=>i.ticket.localeCompare(r.ticket))[0],s=a?Number(a.ticket.slice(-3))+1:1;return`${e}-${String(s).padStart(3,"0")}`}async function Nt(e,t){const n=await me(),[a,s]=await Promise.all([ve(n),Be()]),r=a.find(m=>m.id===e);if(!r)return;const d=et(r,s).map(m=>m.key).find(m=>!r.workflowCompleted.includes(m));if(!d)return;if(d==="fold"){const m=(Array.isArray(t)?t:t?[t]:[]).map(Number).filter(l=>l>0);for(const l of m)await jt(e,l);return}if(r.workflowCompleted=[...r.workflowCompleted,d],r.status=Bt(r.workflowCompleted),d==="claimed"&&t){const m=Array.isArray(t)?t:[t];r.releasedBy=m[0]||null}if(!R.isNativePlatform()){await Fe("browser",r);return}const p=await O();await Fe(p,r)}async function Ye(e,t){const n=await me();if(!(await ve(n)).find(d=>d.id===e))return;const r=Math.max(0,t.amount);if(r<=0)return;if(!R.isNativePlatform()){const d=C("payments",Ee);d.unshift({id:K(d),orderId:e,amount:r,method:t.method,reference:t.reference??null,receivedAt:J(),branch:n}),A("payments",d);const p=C("orders",de),m=p.find(l=>l.id===e);m&&(m.paidAmount=Math.min(m.totalAmount,Number((m.paidAmount+r).toFixed(2)))),A("orders",p);return}const i=await O();await i.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[e,r,t.method,t.reference??null,J(),n]),await i.run("UPDATE orders SET paidAmount = MIN(totalAmount, paidAmount + ?) WHERE id = ?",[r,e])}async function Wa(e){return R.isNativePlatform()?(await(await O()).query("SELECT id, orderId, amount, method, reference, receivedAt, branch FROM payments  ORDER BY receivedAt DESC",[])).values??[]:C("payments",Ee).filter(a=>!0)}async function Xa(e){const t=await me(),a=(await ve(t)).find(r=>r.id===e);if(!a)return;if(a.paidAmount>0)throw new Error("Cancel is only allowed for unpaid orders. Use Delete (admin) to refund paid orders.");if(!R.isNativePlatform()){const r=C("orders",de),i=C("payments",Ee),d=C("fold_logs",[]),p=r.filter(f=>f.id!==e),m=i.filter(f=>f.orderId!==e),l=d.filter(f=>f.orderTicket!==a.ticket);A("orders",p),A("payments",m),A("fold_logs",l);return}const s=await O();await s.run("DELETE FROM payments WHERE orderId = ?",[e]),await s.run("DELETE FROM fold_logs WHERE orderTicket = ?",[a.ticket]),await s.run("DELETE FROM orders WHERE id = ?",[e])}async function Ga(e){const t=await me(),a=(await ve(t)).find(r=>r.id===e);if(!a)return;if(a.paidAmount<=0)throw new Error("Delete (refund) is only allowed for paid orders.");if(!R.isNativePlatform()){const r=C("orders",de),i=C("payments",Ee),d=C("fold_logs",[]),p=r.filter(f=>f.id!==e),m=i.filter(f=>f.orderId!==e),l=d.filter(f=>f.orderTicket!==a.ticket);A("orders",p),A("payments",m),A("fold_logs",l);return}const s=await O();await s.run("DELETE FROM payments WHERE orderId = ?",[e]),await s.run("DELETE FROM fold_logs WHERE orderTicket = ?",[a.ticket]),await s.run("DELETE FROM orders WHERE id = ?",[e])}async function Ka(){return R.isNativePlatform()?(await(await O()).query("SELECT id, orderTicket, staffName, foldCount, rate, total, createdAt FROM fold_logs ORDER BY id DESC")).values??[]:C("fold_logs",[])}async function Ya(e){const t=Number((e.foldCount*e.rate).toFixed(2));if(!R.isNativePlatform()){const a=C("fold_logs",[]);a.unshift({id:Date.now(),...e,total:t,createdAt:J()}),A("fold_logs",a);return}await(await O()).run("INSERT INTO fold_logs (orderTicket, staffName, foldCount, rate, total, createdAt) VALUES (?, ?, ?, ?, ?, ?)",[e.orderTicket,e.staffName,e.foldCount,e.rate,t,J()])}async function Va(e){return R.isNativePlatform()?(await(await O()).query("SELECT id, timestamp, staffId, staffName, action, details, branch FROM activity_logs WHERE branch = ? ORDER BY timestamp DESC, id DESC",[e])).values??[]:C("activity_logs",[]).filter(a=>a.branch===e).sort((a,s)=>s.timestamp.localeCompare(a.timestamp))}async function Ja(e){const t={timestamp:J(),staffId:e.staffId??null,staffName:e.staffName,action:e.action,details:e.details??"",branch:e.branch};if(!R.isNativePlatform()){const a=C("activity_logs",[]);a.unshift({id:K(a),...t}),A("activity_logs",a);return}await(await O()).run("INSERT INTO activity_logs (timestamp, staffId, staffName, action, details, branch) VALUES (?, ?, ?, ?, ?, ?)",[t.timestamp,t.staffId,t.staffName,t.action,t.details,t.branch])}async function Qa(){return R.isNativePlatform()?(await(await O()).query('SELECT id, expenseDate, number, COALESCE(disbursementType, "daily") as disbursementType, name, category, description, amount FROM disbursement_expenses ORDER BY expenseDate DESC, id DESC')).values??[]:C("expenses",ye).map(n=>({...n,disbursementType:n.disbursementType??"daily"}))}function He(e){const t=/^DISB-(\d+)$/i.exec(String(e??"").trim());return t?Number(t[1]):0}function At(e){const t=/^REV-(\d+)$/i.exec(String(e??"").trim());return t?Number(t[1]):0}async function za(){let e=0;if(!R.isNativePlatform()){const s=C("expenses",ye),r=C("revolving_history",we);for(const i of s)e=Math.max(e,He(i.number));for(const i of r)i.type==="disbursement"&&(e=Math.max(e,He(i.revolvingNumber)));return e}const t=await O(),n=await t.query("SELECT number FROM disbursement_expenses"),a=await t.query("SELECT revolvingNumber as number FROM revolving_history WHERE type = 'disbursement'");for(const s of[...n.values??[],...a.values??[]])e=Math.max(e,He(String(s.number)));return e}async function Ht(){const e=await za()+1;return`DISB-${String(e).padStart(2,"0")}`}async function Za(){let e=0;if(!R.isNativePlatform()){const a=C("revolving_history",we);for(const s of a)s.type==="add"&&(e=Math.max(e,At(s.revolvingNumber)));return`REV-${String(e+1).padStart(2,"0")}`}const n=await(await O()).query("SELECT revolvingNumber FROM revolving_history WHERE type = 'add'");for(const a of n.values??[])e=Math.max(e,At(String(a.revolvingNumber)));return`REV-${String(e+1).padStart(2,"0")}`}async function Wt(e){if(!R.isNativePlatform()){const n=C("expenses",ye),a=K(n);n.unshift({id:a,expenseDate:e.expenseDate,number:e.number,disbursementType:e.disbursementType??"daily",name:e.name,category:e.category,description:e.description||null,amount:e.amount}),A("expenses",n);return}await(await O()).run("INSERT INTO disbursement_expenses (expenseDate, number, disbursementType, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?, ?)",[e.expenseDate,e.number,e.disbursementType??"daily",e.name,e.category,e.description||null,e.amount])}async function en(e){const t=await Ht();await Wt({expenseDate:e.expenseDate,number:t,disbursementType:e.disbursementType??"daily",name:e.name,category:e.category,description:e.description,amount:e.amount})}async function tn(e,t){if(!R.isNativePlatform()){const a=C("expenses",ye),s=a.find(r=>r.id===e);s&&(Object.assign(s,{expenseDate:t.expenseDate,disbursementType:t.disbursementType??"daily",name:t.name,category:t.category,description:t.description||null,amount:t.amount}),A("expenses",a));return}await(await O()).run("UPDATE disbursement_expenses SET expenseDate = ?, disbursementType = ?, name = ?, category = ?, description = ?, amount = ? WHERE id = ?",[t.expenseDate,t.disbursementType??"daily",t.name,t.category,t.description||null,t.amount,e])}async function an(e){if(!R.isNativePlatform()){const n=C("expenses",ye);A("expenses",n.filter(a=>a.id!==e));return}await(await O()).run("DELETE FROM disbursement_expenses WHERE id = ?",[e])}async function nn(){return R.isNativePlatform()?(await(await O()).query('SELECT id, saleDate, COALESCE(saleNumber, "") as saleNumber, cashAmount, gcashAmount, totalAmount, notes, status, endorsedTo, statusUpdatedAt FROM daily_sales ORDER BY saleDate DESC, id DESC')).values??[]:C("sales",Te)}async function sn(e){const t=Number((e.cashAmount+e.gcashAmount).toFixed(2));if(!R.isNativePlatform()){const r=C("sales",Te),i=e.id?r.find(d=>d.id===e.id):r.find(d=>d.saleDate===e.saleDate);if(i)Object.assign(i,{saleDate:e.saleDate,cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null});else{const d=K(r);r.unshift({id:d,saleDate:e.saleDate,saleNumber:`SALE-${String(d).padStart(2,"0")}`,cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null})}A("sales",r);return}const n=await O(),s=(e.id?await n.query("SELECT id, saleNumber FROM daily_sales WHERE id = ?",[e.id]):await n.query("SELECT id, saleNumber FROM daily_sales WHERE saleDate = ?",[e.saleDate])).values?.[0];if(s)await n.run("UPDATE daily_sales SET saleDate = ?, cashAmount = ?, gcashAmount = ?, totalAmount = ?, notes = ? WHERE id = ?",[e.saleDate,e.cashAmount,e.gcashAmount,t,e.notes||null,s.id]);else{const r=await n.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM daily_sales"),i=Number((r.values?.[0]).id);await n.run("INSERT INTO daily_sales (saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?)",[e.saleDate,`SALE-${String(i).padStart(2,"0")}`,e.cashAmount,e.gcashAmount,t,e.notes||null])}}async function rn(e){if(!R.isNativePlatform()){const n=C("sales",Te);A("sales",n.filter(a=>a.id!==e));return}await(await O()).run("DELETE FROM daily_sales WHERE id = ?",[e])}async function Lt(e,t,n=null,a){if(!R.isNativePlatform()){const r=C("sales",Te),i=r.find(d=>d.id===e);i&&(i.status=t,i.endorsedTo=n,i.statusUpdatedAt=a,A("sales",r));return}await(await O()).run("UPDATE daily_sales SET status = ?, endorsedTo = ?, statusUpdatedAt = ? WHERE id = ?",[t,n,a,e])}async function on(){return R.isNativePlatform()?(await(await O()).query("SELECT id, revolvingNumber, name, amount, category, description, type, createdAt FROM revolving_history ORDER BY createdAt DESC, id DESC")).values??[]:C("revolving_history",we).sort((n,a)=>a.createdAt.localeCompare(n.createdAt))}async function $t(e){const t=e.type==="disbursement"?await Ht():await Za();if(e.type==="disbursement"){const a=e.expenseDate??e.createdAt.slice(0,10);await Wt({expenseDate:a,number:t,name:e.name,category:e.category,description:e.description??"",amount:e.amount})}if(!R.isNativePlatform()){const a=C("revolving_history",we),s=K(a);a.unshift({id:s,revolvingNumber:t,...e}),A("revolving_history",a);return}await(await O()).run("INSERT INTO revolving_history (revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)",[t,e.name,e.amount,e.category,e.description||null,e.type,e.createdAt])}async function Xt(e){return R.isNativePlatform()?(await(await O()).query("SELECT id, machineName, machineType, status, branch FROM machines WHERE branch = ? ORDER BY machineType, machineName",[e])).values??[]:C("machines",se).filter(a=>a.branch===e)}async function Gt(e){return R.isNativePlatform()?(await(await O()).query("SELECT id, name, unit, quantity, reorderLevel, notes, branch, updatedAt FROM inventory_items WHERE branch = ? ORDER BY name ASC",[e])).values??[]:C("inventory_items",[]).filter(a=>a.branch===e).sort((a,s)=>a.name.localeCompare(s.name))}async function cn(e){const t={name:e.name,unit:e.unit,quantity:e.quantity,reorderLevel:e.reorderLevel,notes:e.notes||null,branch:e.branch,updatedAt:J()};if(!R.isNativePlatform()){const a=C("inventory_items",[]),s=e.id?a.find(r=>r.id===e.id):null;s?Object.assign(s,t):a.unshift({id:K(a),...t}),A("inventory_items",a);return}const n=await O();e.id?await n.run("UPDATE inventory_items SET name = ?, unit = ?, quantity = ?, reorderLevel = ?, notes = ?, updatedAt = ? WHERE id = ?",[t.name,t.unit,t.quantity,t.reorderLevel,t.notes,t.updatedAt,e.id]):await n.run("INSERT INTO inventory_items (name, unit, quantity, reorderLevel, notes, branch, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)",[t.name,t.unit,t.quantity,t.reorderLevel,t.notes,t.branch,t.updatedAt])}async function ln(e){return R.isNativePlatform()?(await(await O()).query("SELECT id, itemId, itemName, movementType, quantity, notes, staffName, branch, createdAt FROM inventory_movements WHERE branch = ? ORDER BY createdAt DESC, id DESC",[e])).values??[]:C("inventory_movements",[]).filter(a=>a.branch===e).sort((a,s)=>s.createdAt.localeCompare(a.createdAt))}async function dn(e){const t=Math.max(0,Number(e.quantity||0));if(t<=0)throw new Error("Quantity must be greater than zero.");const a=(await Gt(e.branch)).find(d=>d.id===e.itemId);if(!a)throw new Error("Inventory item not found.");const s=e.movementType==="in"?a.quantity+t:a.quantity-t;if(s<0)throw new Error("Stock-out quantity is greater than current stock.");const r={itemId:a.id,itemName:a.name,movementType:e.movementType,quantity:t,notes:e.notes||null,staffName:e.staffName,branch:e.branch,createdAt:J()};if(!R.isNativePlatform()){const d=C("inventory_items",[]),p=d.find(l=>l.id===a.id);p&&(p.quantity=Number(s.toFixed(2)),p.updatedAt=r.createdAt),A("inventory_items",d);const m=C("inventory_movements",[]);m.unshift({id:K(m),...r}),A("inventory_movements",m);return}const i=await O();await i.run("UPDATE inventory_items SET quantity = ?, updatedAt = ? WHERE id = ?",[Number(s.toFixed(2)),r.createdAt,a.id]),await i.run("INSERT INTO inventory_movements (itemId, itemName, movementType, quantity, notes, staffName, branch, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[r.itemId,r.itemName,r.movementType,r.quantity,r.notes,r.staffName,r.branch,r.createdAt])}async function un(e){if(!R.isNativePlatform()){const n=C("machines",se);n.unshift({id:K(n),...e}),A("machines",n);return}await(await O()).run("INSERT INTO machines (machineName, machineType, status, branch) VALUES (?, ?, ?, ?)",[e.machineName,e.machineType,e.status,e.branch])}async function mn(e,t){if(!R.isNativePlatform()){const a=C("machines",se),s=a.find(r=>r.id===e);s&&(s.status=t,A("machines",a));return}await(await O()).run("UPDATE machines SET status = ? WHERE id = ?",[t,e])}async function pn(e){return R.isNativePlatform()?((await(await O()).query('SELECT id, date, machineIds, machineNames, cleaningStatus, COALESCE(cleaningType, "tube") as cleaningType, notes, branch FROM subcleanings WHERE branch = ? ORDER BY date DESC, id DESC',[e])).values??[]).map(a=>({...a,machineIds:ae(a.machineIds,[])})):C("subcleanings",[]).filter(a=>a.branch===e).map(a=>({...a,cleaningType:a.cleaningType??"tube"}))}async function Kt(e){const n=(await Xt(e.branch)).filter(i=>e.machineIds.includes(i.id)).map(i=>i.machineName).join(", "),a=e.cleaningType??"tube";if(!R.isNativePlatform()){const i=C("subcleanings",[]);i.unshift({id:K(i),date:e.date,machineIds:e.machineIds,machineNames:n,cleaningStatus:e.cleaningStatus,cleaningType:a,notes:e.notes||null,branch:e.branch}),A("subcleanings",i);const d=C("machines",se);d.forEach(p=>{e.machineIds.includes(p.id)&&(p.status=e.cleaningStatus==="completed"?"available":"under_cleaning")}),A("machines",d);return}const s=await O();await s.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, cleaningType, notes, branch) VALUES (?, ?, ?, ?, ?, ?, ?)",[e.date,JSON.stringify(e.machineIds),n,e.cleaningStatus,a,e.notes||null,e.branch]);const r=e.cleaningStatus==="completed"?"available":"under_cleaning";for(const i of e.machineIds)await s.run("UPDATE machines SET status = ? WHERE id = ?",[r,i])}async function yn(e,t){if(!R.isNativePlatform()){const i=C("machines",se),d=i.find(l=>l.id===e);d&&(d.status="available"),A("machines",i);const p=C("subcleanings",[]),m=qe();p.unshift({id:K(p),date:m,machineIds:[e],machineNames:d?.machineName??"",cleaningStatus:"completed",cleaningType:"tube",notes:null,branch:t}),A("subcleanings",p);return}const n=await O(),s=(await n.query("SELECT machineName FROM machines WHERE id = ?",[e])).values?.[0]?.machineName??"";await n.run("UPDATE machines SET status = ? WHERE id = ?",["available",e]);const r=qe();await n.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, cleaningType, notes, branch) VALUES (?, ?, ?, ?, ?, ?, ?)",[r,JSON.stringify([e]),s,"completed","tube",null,t])}async function fn(e,t){await Kt({date:qe(),machineIds:[],cleaningStatus:"completed",cleaningType:"general",notes:`Confirmed by ${t}`,branch:e})}const tt=document.querySelector("#app");if(!tt)throw new Error("App root not found");let De;const ue=he("BluetoothThermalPrinter"),at={dashboard:"Dashboard",pos:"POS",orders:"Orders",archived:"Archived Order",customers:"Customers",pricing:"Pricing Services",disbursements:"Daily Report",reports:"Reports",logs:"Logs",inventory:"Inventory",maintenance:"Maintenance",staff:"Staff",revolving:"Revolving Fund",settings:"Settings",machines:"Machine Control"},c={tab:"dashboard",receiptOrderId:0,currentUser:null,loginError:"",sidebarOpen:!1,dailyReportTab:"expenses",maintenanceTab:"cleaning",customerSearch:"",orderSearch:"",orderDateFilter:"",orderPaymentFilter:"",printerPanelOpen:!1,printerLoading:!1,printerError:"",printerStatus:"",printerPaperWidth:58,pairedPrinters:[],selectedPrinterAddress:"",archivedOrderSearch:"",paymentModalOrderId:0,dashboardSummaryModalOpen:!1,reportPreview:null,monthlySummaryMonth:fe(),endorseModalOpen:!1,endorseSaleId:0,endorseSaleDate:"",revolvingModalOpen:!1,revolvingSaleId:0,addFundModalOpen:!1,disbursementModalOpen:!1,revolvingHistoryFrom:"",revolvingHistoryTo:"",machineControlModalOpen:!1,selectedMachineId:0,machineTimerMinutes:0,machineStatus:new Map},hn=["Wash","Dry","Fold","Detergent","Fabcon","Zonrox","Finishing"],Ct=["Supplies","Utilities","Maintenance","Salary","Rent","Transport","Other"],Ce="laba101-mobile-session",nt=new Map;async function _e(e,t,n){const a=nt.get(e);if(!a)return{success:!1,message:"Machine not configured. Please set WiFi settings first."};try{const s=`http://${a.ipAddress}:${a.port}/${t}`,r=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n||{})});if(!r.ok)throw new Error(`HTTP error! status: ${r.status}`);return{success:!0,message:(await r.json()).message||"Command sent successfully"}}catch(s){return console.error("Machine control error:",s),{success:!1,message:`Failed to connect to machine: ${s instanceof Error?s.message:"Unknown error"}`}}}async function vn(e,t,n){const a=await _e(e,"start",{duration:t,type:n});a.success?(c.machineStatus.set(e,"running"),await X("machine_start",`Started ${n} ID ${e} for ${t} minutes`)):alert(a.message),E()}async function gn(e){const t=await _e(e,"pause");t.success?(c.machineStatus.set(e,"paused"),await X("machine_pause",`Paused machine ID ${e}`)):alert(t.message),E()}async function bn(e){const t=await _e(e,"resume");t.success?(c.machineStatus.set(e,"running"),await X("machine_resume",`Resumed machine ID ${e}`)):alert(t.message),E()}async function Sn(e){const t=await _e(e,"stop");t.success?(c.machineStatus.set(e,"idle"),await X("machine_stop",`Stopped machine ID ${e}`)):alert(t.message),E()}async function En(e){c.machineStatus.set(e,"idle"),await X("machine_reset",`Reset machine ID ${e}`),E()}function w(e){return new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(e||0)}function y(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function oe(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}function st(e,t){return Number((e-t).toFixed(2))}function Yt(e,t,n,a=0){const s=t.filter(i=>Y(i.createdAt)===e).reduce((i,d)=>i+d.paidAmount,0),r=n.filter(i=>ce(i)==="daily"&&i.expenseDate===e).reduce((i,d)=>i+d.amount,0);return st(s+a,r)}function Tn(e,t){const n=new Map(t.map(s=>[s.id,s.name])),a=new Map;return e.filter(s=>(s.foldedByStaffIds?.length??0)>0||s.workflowCompleted.includes("fold")).forEach(s=>{(Array.isArray(s.foldedByStaffIds)&&s.foldedByStaffIds.length?s.foldedByStaffIds:s.foldedBy?[s.foldedBy]:[]).forEach(i=>{if(!i)return;const d=n.get(i)??String(i),p=a.get(i)??{staffId:i,staffName:d,folds:0};p.folds+=1,a.set(i,p)})}),e.filter(s=>s.workflowCompleted.includes("fold")&&s.foldedByName&&s.foldedBy).forEach(s=>{const r=a.get(s.foldedBy);r&&r.staffName===String(s.foldedBy)&&(r.staffName=s.foldedByName)}),Array.from(a.values()).map(s=>({staffName:s.staffName,folds:s.folds}))}function wn(e){return e.foldedAt?Y(e.foldedAt):Y(e.createdAt)}function Rt(e){const t=e.match(/(\d+)$/);return t?Number(t[1]):0}function Q(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${a}`}function W(){return Q()}function fe(){return W().slice(0,7)}function Vt(e){return`${e}-01`}function Nn(e){const[t,n]=e.split("-").map(a=>Number(a));return!Number.isFinite(t)||!Number.isFinite(n)?Vt(fe()):Q(new Date(t,n,0))}function rt(e){const[t,n]=e.split("-").map(a=>Number(a));return!Number.isFinite(t)||!Number.isFinite(n)?e:new Intl.DateTimeFormat("en-PH",{month:"long",year:"numeric"}).format(new Date(t,n-1,1))}function it(e){return e.toLowerCase().includes("mintal")?"Mintal, Davao City":e}function An(e){const t=(e.category??"Uncategorized").trim();return/^other(s)?$/i.test(t)&&e.name.trim()||t}function Jt(e,t){const n=new Date(`${e}T00:00:00`),a=new Date(`${t}T00:00:00`);if(Number.isNaN(n.getTime())||Number.isNaN(a.getTime()))return!1;const s=Q(new Date(n.getFullYear(),n.getMonth(),1)),r=Q(new Date(n.getFullYear(),n.getMonth()+1,0));return e===s&&t===r}function Ln(e,t,n,a,s,r,i="left"){const d=String(t??"").split(/\s+/).filter(Boolean);if(!d.length)return e.textAlign=i,e.fillText("",n,a),a+r;const p=[];let m=d.shift()??"";for(const l of d){const f=`${m} ${l}`.trim();e.measureText(f).width>s&&m?(p.push(m),m=l):m=f}return p.push(m),e.textAlign=i,p.forEach((l,f)=>e.fillText(l,n,a+f*r)),a+p.length*r}function $n(e){return e.split(",")[1]??""}function Cn(e){return`laba101-monthly-summary-${e}.jpg`}function Rn(e,t,n,a,s,r,i,d,p){const m=Vt(d),l=Nn(d),f=ot(e,t,n,a,s,r,i,{from:m,to:l,types:["summary"]},p),o=f.salesRows(),u=f.disbursementRows(),T=Number((o.totalSales-u.totalDisbursement).toFixed(2));return{monthValue:d,monthLabel:rt(d),branchLabel:it(p),salesData:o,disbData:u,totalDisbursement:u.totalDisbursement,netIncome:T}}function xn(e){const p=540+Math.max(e.disbData.categoryTotals.length,1)*64+260,m=document.createElement("canvas");m.width=1240,m.height=p;const l=m.getContext("2d");if(!l)throw new Error("Canvas is not available.");l.fillStyle="#ffffff",l.fillRect(0,0,1240,p),l.fillStyle="#061a42",l.font="800 58px Arial",l.textAlign="center",l.fillText("Laba 101",1240/2,106),l.fillStyle="#64748b",l.font="500 28px Arial",l.fillText(e.branchLabel,1240/2,152),l.fillText(`For the month of ${e.monthLabel}`,1240/2,192);const f=u=>{l.strokeStyle="#dbe3ef",l.lineWidth=2,l.beginPath(),l.moveTo(84,u),l.lineTo(1156,u),l.stroke()};let o=238;return f(o),o+=42,l.textAlign="left",l.fillStyle="#061a42",l.font="800 34px Arial",l.fillText("Total Sales",84,o),o+=50,l.font="500 28px Arial",l.fillStyle="#475569",l.fillText("Cash:",84,o),l.textAlign="right",l.fillStyle="#061a42",l.font="700 28px Arial",l.fillText(w(e.salesData.totalCash),1156,o),o+=34,l.textAlign="left",l.fillStyle="#475569",l.font="500 28px Arial",l.fillText("GCash:",84,o),l.textAlign="right",l.fillStyle="#061a42",l.font="700 28px Arial",l.fillText(w(e.salesData.totalGcash),1156,o),o+=34,l.textAlign="left",l.fillStyle="#475569",l.font="500 28px Arial",l.fillText("Total:",84,o),l.textAlign="right",l.fillStyle="#061a42",l.font="800 34px Arial",l.fillText(w(e.salesData.totalSales),1156,o),o+=34,f(o),o+=42,l.textAlign="left",l.fillStyle="#061a42",l.font="800 34px Arial",l.fillText("Total Disbursement",84,o),o+=50,l.font="500 28px Arial",e.disbData.categoryTotals.forEach(u=>{l.fillStyle="#475569",o=Ln(l,`${u.category}:`,84,o,852,34),l.textAlign="right",l.fillStyle="#061a42",l.font="700 28px Arial",l.fillText(w(u.amount),1156,o-34),o+=14}),e.disbData.categoryTotals.length||(l.fillStyle="#64748b",l.textAlign="left",l.font="500 28px Arial",l.fillText("No disbursement records found.",84,o),o+=34),l.textAlign="left",l.fillStyle="#475569",l.font="500 28px Arial",l.fillText("Total:",84,o+12),l.textAlign="right",l.fillStyle="#061a42",l.font="800 34px Arial",l.fillText(w(e.totalDisbursement),1156,o+12),o+=54,f(o),o+=54,l.textAlign="left",l.fillStyle="#061a42",l.font="800 34px Arial",l.fillText("Net Income",84,o),l.textAlign="right",l.fillStyle=e.netIncome>=0?"#16a34a":"#dc2626",l.font="800 44px Arial",l.fillText(w(e.netIncome),1156,o),m.toDataURL("image/jpeg",.92)}function ce(e){return e.disbursementType==="monthly"?"monthly":"daily"}function Qt(e){return e.slice(0,7)}function zt(e){return ce(e)==="monthly"?Qt(e.expenseDate):e.expenseDate}function Y(e){return Q(new Date(e))}function Me(e){return e.paidAmount<=0?"unpaid":e.balance>0?"partial":"paid"}function Zt(e,t,n){const a=new Map(t.map(i=>[i.id,i])),s=new Map(t.map(i=>[i.id,Number(i.totalAmount||0)])),r={cash:0,gcash:0,total:0};return[...e].sort((i,d)=>new Date(i.receivedAt).getTime()-new Date(d.receivedAt).getTime()||i.id-d.id).forEach(i=>{const d=a.get(i.orderId);if(!d)return;const p=s.get(d.id)??0,m=Math.min(Math.max(0,Number(i.amount||0)),p);s.set(d.id,Number((p-m).toFixed(2))),!(!n(i)||m<=0)&&(i.method==="gcash"?r.gcash+=m:r.cash+=m,r.total+=m)}),{cash:Number(r.cash.toFixed(2)),gcash:Number(r.gcash.toFixed(2)),total:Number(r.total.toFixed(2))}}function be(e){return new Intl.DateTimeFormat("en-PH",{dateStyle:"medium",timeStyle:"short"}).format(new Date(e))}function ke(e){const t=new Date(e),n=new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric",year:"numeric"}).format(t),a=new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",hour12:!0}).format(t);return`<div class="datetime-stack"><strong>${y(n)}</strong><span class="meta">${y(a)}</span></div>`}function Dn(e){return e?.role==="staff"&&e.branch==="Gensan Branch"}function On(e){return e?.role==="staff"&&e.branch.toLowerCase().includes("mintal")}async function X(e,t=""){c.currentUser&&await Ja({staffId:c.currentUser.id,staffName:c.currentUser.name,action:e,details:t,branch:await me()})}async function Pn(e){return(await Ze()).filter(n=>n.role==="admin"&&n.isActive!==0).some(n=>n.password===e)}function re(e,t,n="data-table"){return`
    <div class="table-scroll">
      <table class="${n}">
        <thead><tr>${e.map(a=>`<th>${y(a)}</th>`).join("")}</tr></thead>
        <tbody>${t.length?t.map(a=>`<tr>${a.map(s=>`<td>${s}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${e.length}" class="table-empty">No records found.</td></tr>`}</tbody>
      </table>
    </div>
  `}function In(e=new Date){return{date:new Intl.DateTimeFormat("en-PH",{weekday:"long",month:"long",day:"numeric",year:"numeric"}).format(e),time:new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",second:"2-digit",hour12:!0}).format(e)}}function We(){const e=document.querySelector("[data-date-from]"),t=document.querySelector("[data-date-to]"),n=Array.from(document.querySelectorAll('input[name="reportType"]:checked')).map(a=>a.value).filter(a=>a==="sales"||a==="disbursement"||a==="fold_count"||a==="revolving_fund"||a==="summary");return{from:e?.value||"0000-01-01",to:t?.value||"9999-12-31",types:n.length?n:["summary"]}}function pe(e,t){return e>=t.from&&e<=t.to}function ot(e,t,n,a,s,r,i,d,p=""){const m=new Set(d.types),l=n.filter(g=>pe(g.saleDate,d)),f=a.filter(g=>pe(g.expenseDate,d)),o=e.filter(g=>((g.foldedByStaffIds?.length??0)>0||g.workflowCompleted.includes("fold"))&&pe(wn(g),d)),u=Tn(o,r),T=t.filter(g=>pe(Y(g.receivedAt),d)),P=new Set(T.map(g=>g.orderId)),q=new Set(t.map(g=>g.orderId)),U=e.filter(g=>pe(Y(g.createdAt),d)||P.has(g.id)),h=new Map;T.forEach(g=>{const I=h.get(g.orderId)??{cash:0,gcash:0};g.method==="gcash"?I.gcash+=g.amount:I.cash+=g.amount,h.set(g.orderId,I)});const N=g=>q.has(g.id)?h.get(g.id)??{cash:0,gcash:0}:pe(Y(g.createdAt),d)?{cash:g.paidAmount,gcash:0}:{cash:0,gcash:0},L=U.reduce((g,I)=>{const _=N(I),G=_.cash+_.gcash;if(G>I.totalAmount&&I.totalAmount>0&&q.has(I.id)){const ie=I.totalAmount/G;return g+_.cash*ie}return g+_.cash},0),F=l.reduce((g,I)=>g+I.cashAmount,0),S=l.reduce((g,I)=>g+I.gcashAmount,0),v=U.reduce((g,I)=>{const _=N(I),G=_.cash+_.gcash;if(G>I.totalAmount&&I.totalAmount>0&&q.has(I.id)){const ie=I.totalAmount/G;return g+_.gcash*ie}return g+_.gcash},0),b=L+F,$=v+S,x=b+$,D=f.reduce((g,I)=>g+I.amount,0),k=D,B=x-k,ee=()=>({orderCashTotal:L,orderGcashTotal:v,manualCashTotal:F,manualGcashTotal:S,totalCash:b,totalGcash:$,totalSales:x,transactions:U.map(g=>{const I=N(g),_=I.cash+I.gcash;let G=I.cash,ie=I.gcash,Le=_;if(_>g.totalAmount&&g.totalAmount>0&&q.has(g.id)){const pt=g.totalAmount/_;G=I.cash*pt,ie=I.gcash*pt,Le=g.totalAmount}return{ticket:g.ticket,customer:g.customer,cash:G,gcash:ie,total:Le}}),manualSales:l.map(g=>({cash:g.cashAmount,gcash:g.gcashAmount,total:g.totalAmount}))}),te=()=>{const g=new Map;f.forEach(_=>{const G=An(_);g.set(G,(g.get(G)??0)+_.amount)});const I=Array.from(g.entries()).map(([_,G])=>({category:_,amount:G}));return{totalExpenses:D,totalDisbursement:k,categoryTotals:I,rows:[["Date/Month","id#","Type","Name","Category","Description","Amount"],...f.map(_=>[zt(_),_.number,ce(_),_.name,_.category??"",_.description??"",_.amount]),[],["Total Disbursement","","","","","",k]]}},H=()=>({rows:[["Staff","Fold Count"],...u.map(g=>[g.staffName,g.folds]),[],["Total Folds",u.reduce((g,I)=>g+I.folds,0)]]}),Ae=s.filter(g=>pe(Y(g.createdAt),d));return{selection:d,selectedTypes:m,salesRows:ee,disbursementRows:te,foldCountRows:H,revolvingDailySummaryRows:()=>({rows:[["Date of Sales","Cash on Hand","Status","Date Update"],...l.map(g=>{const I=Yt(g.saleDate,e,a,g.cashAmount),_=g.status==="revolving"?"Revolving":g.status==="endorsed"?`Endorsed to ${g.endorsedTo??""}`:"Pending";return[g.saleDate,I,_,g.statusUpdatedAt?Y(g.statusUpdatedAt):""]})]}),revolvingHistoryRows:()=>({rows:[["Date","Number","Name","Amount","Category","Description","Type"],...Ae.map(g=>[Y(g.createdAt),g.revolvingNumber,g.name,g.type==="disbursement"?-g.amount:g.amount,g.category,g.description??"",g.type==="add"?"Add Revolving Fund":"Disbursement"])]}),summaryRows:()=>{const g=ee(),I=te(),_=st(g.totalCash,I.totalDisbursement),G=Number((g.totalSales-I.totalDisbursement).toFixed(2)),ie=Jt(d.from,d.to)?rt(d.from.slice(0,7)):`${d.from} to ${d.to}`;return[["Laba 101"],[it(p)],[`For the month of ${ie}`],[],["Total sales"],["Cash","",g.totalCash],["GCash","",g.totalGcash],["Total","",g.totalSales],[],["Total disbursement"],...I.categoryTotals.map(Le=>[Le.category,"",Le.amount]),["Total disbursement","",I.totalDisbursement],[],["Cash on hand","",_],["Net income","",G]]},profit:B}}function qn(e,t){return`<button class="nav-link ${t?"is-active":""}" data-tab="${e}" type="button">
    <span class="nav-icon">${Fn(e)}</span>
    <span>${at[e]}</span>
  </button>`}function M(e,t){return`<div class="section-head"><div><h2>${y(e)}</h2><p class="meta">${y(t)}</p></div></div>`}function xt(){return at[c.tab]??"Dashboard"}function Xe(e){return(e?.name??"Laba101").trim().slice(0,1).toUpperCase()}function Fn(e){return{dashboard:"DB",pos:"POS",orders:"PO",archived:"AR",customers:"CU",pricing:"PS",disbursements:"DR",reports:"RP",logs:"LG",inventory:"IN",maintenance:"MT",staff:"ST",revolving:"RV",settings:"SE",machines:"MC"}[e]}async function ct(){const e=await me(),t=await Fa(e),n=await Ze(),a=await ka(),s=await Be(),r=await Ba(),i=await Ut(),d=await ve(e),p=await Wa(),m=await Ka(),l=await Qa(),f=await nn(),o=await Xt(e),u=await pn(e),T=await Va(e),P=await Gt(e),q=await ln(e),U=await on(),h=await qa(),N=await Qe("report_email");return{branch:e,staff:t,allStaff:n,customers:a,services:s,allServices:r,categories:i,orders:d,payments:p,foldLogs:m,expenses:l,sales:f,machines:o,subcleanings:u,activityLogs:T,inventoryItems:P,inventoryMovements:q,revolvingHistory:U,foldRate:h,reportEmail:N??""}}async function E(){if(!c.currentUser){Mn(),is();return}const e=await ct();e.orders.filter(u=>u.status!=="claimed").length,e.orders.filter(u=>u.status==="ready").length;const t=e.orders.reduce((u,T)=>u+T.paidAmount,0),n=W(),a=Zt(e.payments,e.orders,u=>u.branch===e.branch&&Y(u.receivedAt)===n),s=a.gcash+e.sales.filter(u=>u.saleDate===n).reduce((u,T)=>u+T.gcashAmount,0),r=a.cash+e.sales.filter(u=>u.saleDate===n).reduce((u,T)=>u+T.cashAmount,0),i=r+s,d=e.expenses.filter(u=>ce(u)==="daily"&&u.expenseDate===n).reduce((u,T)=>u+T.amount,0),p=st(r,d),m=e.sales.reduce((u,T)=>u+T.totalAmount,0),l=t+m,f=e.expenses.reduce((u,T)=>u+T.amount,0),o=l-f;tt.innerHTML=`
    <div class="app-frame">
      <header class="topbar">
        <div class="topbar-left">
          <img src="/laba101-logo.svg" alt="Laba101" class="topbar-logo" />
          <div>
            <p class="eyebrow">Offline mobile system</p>
            <h1>${y(xt())}</h1>
          </div>
        </div>
        <div class="topbar-actions">
          <div class="branch-pill"><span>Branch</span><strong>${y(e.branch)}</strong></div>
          <button class="icon-button" type="button" aria-label="Notifications">!</button>
          <button class="profile-pill" type="button">
            <span>${Xe(c.currentUser)}</span>
            <strong>${y(c.currentUser.name)}</strong>
          </button>
        </div>
      </header>

      <button class="sidebar-backdrop ${c.sidebarOpen?"is-open":""}" id="sidebar-backdrop" type="button" aria-label="Close navigation"></button>

      <aside class="sidebar ${c.sidebarOpen?"is-open":""}">
        <div class="sidebar-mobile-head">
          <img src="/laba101-logo.svg" alt="Laba101" />
          <button class="sidebar-close" id="sidebar-close-button" type="button" aria-label="Close navigation">X</button>
        </div>
        <nav>${ea().map(u=>qn(u,c.tab===u)).join("")}</nav>
        <div class="sidebar-fill">
          <div class="sidebar-branch-badge">
            <span>Active Branch</span>
            <strong>${y(e.branch)}</strong>
          </div>
          <p class="sidebar-app-name">Laba101 POS</p>
        </div>
        <div class="sidebar-user">
          <span class="avatar">${Xe(c.currentUser)}</span>
          <div>
            <strong>${y(c.currentUser.name)}</strong>
            <small>${y(c.currentUser.email)} / ${y(c.currentUser.role)}</small>
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
            <h2>${y(xt())}</h2>
          </div>
          <div class="navbar-time">
            <strong data-navbar-time>--:--</strong>
            <span data-navbar-date>Loading...</span>
          </div>
          <button class="mobile-avatar" type="button">${Xe(c.currentUser)}</button>
        </header>

        ${c.tab==="dashboard"?Un({paidToday:i,cashPaidToday:r,gcashPaidToday:s,disbursementToday:d,cashOnHandToday:p,orders:e.orders,payments:e.payments,sales:e.sales}):""}
        ${c.tab==="pos"?_n(e.orders,e.customers,e.services,e.categories,e.payments,e.branch):""}
        ${c.tab==="orders"?jn(e.orders,e.staff,e.services,e.payments):""}
        ${c.tab==="archived"?Hn(e.orders,e.staff,e.services,e.payments):""}
        ${c.tab==="customers"?Vn(e.customers,e.orders):""}
        ${c.tab==="pricing"?Jn(e.allServices,e.categories):""}
        ${c.tab==="disbursements"?Qn(e.expenses,e.sales):""}
        ${c.tab==="reports"?zn(e.orders,e.payments,e.sales,e.expenses,e.revolvingHistory,e.allStaff,e.foldRate,l,f,o,e.branch):""}
        ${c.tab==="logs"?Zn(e.activityLogs):""}
        ${c.tab==="inventory"?es(e.inventoryItems,e.inventoryMovements,e.branch):""}
        ${c.tab==="maintenance"?ts(e.machines,e.subcleanings,e.branch):""}
        ${c.tab==="staff"?as(e.allStaff,e.branch):""}
        ${c.tab==="revolving"?Ss(e.sales,e.revolvingHistory,e.orders,e.expenses):""}
        ${c.tab==="settings"?ns(e.branch,e.foldRate,e.reportEmail):""}
        ${c.tab==="machines"?ss(e.machines,e.branch):""}
      </main>
    </div>
  `,rs(),cs(e),ls(e.allServices),ds(e.expenses),us(e.orders,e.payments,e.sales,e.expenses,e.revolvingHistory,e.allStaff,e.foldRate,e.branch),ms(),ps(),ys(),fs(e.inventoryItems,e.branch),hs(e.allStaff),Es(),vs(),gs(),os()}function ea(){if(c.currentUser?.role==="admin")return Object.keys(at);const e=["dashboard","pos","orders","archived","disbursements","reports","maintenance","revolving","machines"];return Dn(c.currentUser)?["dashboard","disbursements","reports","maintenance","revolving","machines"]:On(c.currentUser)?e.filter(t=>t!=="revolving"):e}function Mn(){tt.innerHTML=`
    <main class="login-page">

      <section class="login-panel-wrap">
        <article class="login-panel">
          <header>
            <div class="login-mark"><img src="/laba101-logo.svg" alt="Laba101" /></div>
            <h2>Welcome back</h2>
            <p>Sign in to continue managing today&apos;s laundry operations.</p>
          </header>
          ${c.loginError?`<div class="alert">${y(c.loginError)}</div>`:""}
          <form id="login-form" class="form">
            <label>Email address<input name="email" type="email" autocomplete="username" placeholder="admin@laba101.test or staff@laba101.gensan" required /></label>
            <label>Password<input name="password" type="password" autocomplete="current-password" placeholder="password" required /></label>
            <label class="remember"><input name="remember" type="checkbox" value="1" /> Remember me on this device</label>
            <button class="primary" id="login-button" type="submit">Sign in</button>
          </form>
        </article>
      </section>
    </main>
  `}function kn(){document.querySelectorAll("[data-fill-email]").forEach(e=>{e.addEventListener("click",()=>{const t=document.querySelector('input[name="email"]'),n=document.querySelector('input[name="password"]');t&&(t.value=e.dataset.fillEmail??""),n&&(n.value=e.dataset.fillPassword??"")})})}function Un(e){const t=new Date,n=Array.from({length:7},(i,d)=>{const p=new Date(t);return p.setDate(t.getDate()-(6-d)),new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric"}).format(p)}),a=Array.from({length:7},(i,d)=>{const p=new Date(t);p.setDate(t.getDate()-(6-d));const m=Q(p),l=Zt(e.payments,e.orders,o=>Y(o.receivedAt)===m).total,f=e.sales.filter(o=>o.saleDate===m).reduce((o,u)=>o+u.totalAmount,0);return l+f}),s=Math.max(1,...a),r=210;return`
    <section class="dashboard-main">
      <article class="panel revenue-panel">
        ${M("Revenue overview","Paid amount for the last 7 days.")}
        <button class="secondary dashboard-print-button" type="button" data-open-daily-summary>Print Daily Summary</button>
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
            ${a.map((i,d)=>{const p=Math.max(12,Math.round(i/s*r));return`<div class="chart-bar ${d===a.length-1?"is-today":""}"><span style="height:${p}px"></span><strong>${w(i)}</strong></div>`}).join("")}
          </div>
          <div class="chart-days">${n.map(i=>`<span>${y(i)}</span>`).join("")}</div>
        </div>
        <div class="chart-footnote">Values include POS payments and Daily Report sales input.</div>
      </article>
      ${c.dashboardSummaryModalOpen?Bn(e):""}
    </section>
  `}function Bn(e){return`
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal dashboard-summary-modal" role="dialog" aria-modal="true" aria-labelledby="daily-summary-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-open-printer-panel>Printer</button>
          <button class="primary" type="button" data-print-dashboard data-metrics='${JSON.stringify(e)}'>${c.printerLoading?"Printing...":"Print"}</button>
          <button class="secondary" type="button" data-close-daily-summary>Close</button>
        </div>
        ${c.printerPanelOpen?aa():""}
        <div class="receipt dashboard-summary-slip" id="dashboard-summary-print-area">
          <h3 id="daily-summary-title">Laba101 Daily Summary</h3>
          <p>${y(Q())}</p>
          <div><span>Paid today:</span><strong>${w(e.paidToday)}</strong></div>
          <div><span>Cash:</span><strong>${w(e.cashPaidToday)}</strong></div>
          <div><span>GCash:</span><strong>${w(e.gcashPaidToday)}</strong></div>
          <div><span>Disbursement:</span><strong>${w(e.disbursementToday)}</strong></div>
          <div><span>Cash-on hand:</span><strong>${w(e.cashOnHandToday)}</strong></div>
          <div class="signature-row"><span>Name of receiver and signature</span></div>
        </div>
      </div>
    </div>
  `}function _n(e,t,n,a,s,r){const i=n.filter(m=>m.serviceType==="order"&&m.isActive),d=n.filter(m=>m.serviceType==="addon"&&m.isActive),p=c.receiptOrderId?e.find(m=>m.id===c.receiptOrderId):null;return`
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
                <strong>${y(m.name)}</strong>
                <small>${y(m.description??m.category)} ${m.maxKg?` / max ${m.maxKg}kg`:""}</small>
              </span>
              <b>${w(m.price)}</b>
              <div class="qty-control">
                <button type="button" data-qty-minus="serviceQty-${m.id}" aria-label="Decrease ${y(m.name)}">-</button>
                <input type="number" name="serviceQty-${m.id}" min="0" step="1" value="0" inputmode="numeric" />
                <button type="button" data-qty-plus="serviceQty-${m.id}" aria-label="Increase ${y(m.name)}">+</button>
              </div>
            </div>`).join("")}
          </fieldset>

          <fieldset class="check-grid">
            <legend>Extra services</legend>
            ${d.length?d.map(m=>`<div class="qty-card addon-quantity" data-qty-card="addonQty-${m.id}">
              <span><strong>${y(oe(m.name))}</strong><small>${w(m.price)} each</small></span>
              <div class="qty-control">
                <button type="button" data-qty-minus="addonQty-${m.id}" aria-label="Decrease ${y(oe(m.name))}">-</button>
                <input type="number" name="addonQty-${m.id}" min="0" step="1" value="0" inputmode="numeric" />
                <button type="button" data-qty-plus="addonQty-${m.id}" aria-label="Increase ${y(oe(m.name))}">+</button>
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

      ${p?lt(p,s.filter(m=>m.orderId===p.id)):""}
    </section>
  `}function jn(e,t,n,a){const s=c.receiptOrderId?e.find(u=>u.id===c.receiptOrderId):null,r=e.filter(u=>u.status!=="claimed"),i=c.orderSearch.trim().toLowerCase(),d=c.orderDateFilter.trim(),p=c.orderPaymentFilter.trim().toLowerCase(),m=r.filter(u=>{const T=!i||[u.ticket,u.customer,u.phone,u.service,u.itemCategory,u.status].some(U=>String(U??"").toLowerCase().includes(i)),P=!d||Y(u.createdAt)===d,q=!p||Me(u)===p;return T&&P&&q}),f=m.filter(u=>["unpaid","partial"].includes(Me(u))).reduce((u,T)=>u+Math.max(0,Number(T.balance||0)),0),o=m.length;return`
    <section class="grid content full">
      <article class="panel span-2">
        ${M("Order queue","Workflow, payment, and receipts")}
        <form class="queue-filters" id="order-queue-filters">
          <label>
            <span>Search queue</span>
            <input name="orderSearch" type="search" placeholder="Ticket, name, service, status" value="${y(c.orderSearch)}" autocomplete="off" />
          </label>
          <label>
            <span>Filter date</span>
            <input name="orderDateFilter" type="date" value="${y(c.orderDateFilter)}" />
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
              ${m.map(u=>ta(u,t,n)).join("")||'<tr><td colspan="5" class="table-empty">No matching orders.</td></tr>'}
            </tbody>
          </table>
        </div>
        <div class="summary-list queue-summary">
          <div><span>Total transactions</span><strong>${o}</strong></div>
          <div><span>Total unpaid amount</span><strong>${w(f)}</strong></div>
        </div>
      </article>
      ${s?lt(s,a.filter(u=>u.orderId===s.id)):""}
      ${c.paymentModalOrderId?Wn(e.find(u=>u.id===c.paymentModalOrderId)):""}
    </section>
  `}function Hn(e,t,n,a){const s=e.filter(p=>p.status==="claimed"),r=c.archivedOrderSearch.trim().toLowerCase(),i=s.filter(p=>r?[p.ticket,p.customer,p.phone,p.service,p.itemCategory].some(m=>String(m??"").toLowerCase().includes(r)):!0),d=c.receiptOrderId?e.find(p=>p.id===c.receiptOrderId):null;return`
    <section class="grid content full">
      <article class="panel span-2">
        ${M("Archived orders","All claimed orders are listed here")}
        <form class="queue-filters" id="archived-order-filters">
          <label>
            <span>Search archived</span>
            <input name="archivedOrderSearch" type="search" placeholder="Ticket, name, service" value="${y(c.archivedOrderSearch)}" autocomplete="off" />
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
              ${i.map(p=>ta(p,t,n,!0)).join("")||'<tr><td colspan="6" class="table-empty">No archived orders found.</td></tr>'}
            </tbody>
          </table>
        </div>
      </article>
      ${d?lt(d,a.filter(p=>p.orderId===d.id)):""}
    </section>
  `}function ta(e,t,n,a=!1){const s=et(e,n),r=e.workflowCompleted.includes("claimed"),i=s.find(U=>!e.workflowCompleted.includes(U.key)),d=i?.key==="fold",p=Me(e),m=p==="unpaid"?"pending":p,l=e.extras.length?e.extras.map(U=>`${y(oe(U.name))} x${Number(U.quantity??1)}`).join(", "):"",f=c.currentUser?.role==="admin",o=e.status!=="claimed"&&e.paidAmount<=0,u=e.status!=="claimed"&&f&&e.paidAmount>0,T=_t(e,n),P=Array.isArray(e.foldedByStaffIds)?e.foldedByStaffIds:[],q=Math.max(0,T-P.length);return`
    <tr class="order-row-main">
      <td><strong>${y(e.ticket)}</strong><div class="small">${y(be(e.createdAt))}</div></td>
      <td>${y(e.customer)}<div class="small">${y(e.phone??"")}</div></td>
      <td>${y(e.service)}${l?`<div class="small">Extras: ${l}</div>`:""}</td>
      <td class="amount-cell payment-cell status-${p}"><strong>${w(e.totalAmount)}</strong><div class="payment-status">${y(m)}${p==="paid"?"":` &middot; Bal: ${w(e.balance)}`}</div></td>
      ${a?`<td>
        <div class="small">Folded by: ${y(e.foldedByName??"N/A")}</div>
        <div class="small">Released by: ${y(e.releasedByName??"N/A")}</div>
      </td>`:""}
      <td>
      <div class="row-actions">
        ${i?.key==="fold"?`<div class="inline-form flex-wrap fold-actions" data-order-id="${e.id}">
          ${P.map((U,h)=>{const N=t.find(L=>L.id===U);return`<span class="fold-saved-badge">Fold ${h+1}: ${y(N?.name??"Staff")}</span>`}).join("")}
          ${d&&q>0?Array.from({length:q}).map((U,h)=>{const N=P.length+h+1;return`<select name="assignedStaffId" class="fold-staff-select" data-order-id="${e.id}" data-fold-number="${N}">
            <option value="">-- Staff ${T>1?`(Fold ${N})`:""}--</option>
            ${t.map(L=>`<option value="${L.id}">${y(L.name)}</option>`).join("")}
          </select>`}).join(""):""}
        </div>`:i?.key==="claimed"&&!r?`<form class="inline-form advance-form" data-order-id="${e.id}" data-action="claim" data-balance="${e.balance}">
          <select name="releasedBy" required>
            <option value="">-- Released by --</option>
            ${t.map(U=>`<option value="${U.id}">${y(U.name)}</option>`).join("")}
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
  `}function Wn(e){return e?`
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="payment-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-close-payment-modal>Close</button>
        </div>
        <div class="receipt" style="border: 1px solid var(--line); border-style: solid; box-shadow: none;">
          <h3 id="payment-title" style="margin-top:0">Payment Required</h3>
          <p>Please settle the remaining balance of <strong>${w(e.balance)}</strong> for ticket <strong>${y(e.ticket)}</strong> before claiming.</p>
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
  `:""}function lt(e,t){const n=t.reduce((i,d)=>i+Number(d.amount),0),a=Math.max(0,Number((n-e.totalAmount).toFixed(2))),s=Me(e),r=s.charAt(0).toUpperCase()+s.slice(1);return`
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="receipt-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-open-printer-panel>Printer</button>
          <button class="primary" type="button" data-thermal-print>${c.printerLoading?"Printing...":"Print Receipt"}</button>
          <button class="secondary" type="button" data-close-receipt>Close</button>
        </div>
        ${c.printerPanelOpen?aa():""}
        <div class="receipt" id="receipt-print-area">
          <div class="receipt-head">
            <h3 id="receipt-title">Laba101</h3>
            <p>${y(e.ticket)}<br>${y(be(e.createdAt))}</p>
          </div>
          ${c.currentUser?`<p class="receipt-staff">Staff: ${y(c.currentUser.name)}</p>`:""}
          <div class="receipt-customer">
            <strong>${y(e.customer)}</strong>
            <span>${y(e.phone??"No phone")}</span>
          </div>
          <div class="summary-list receipt-lines">
            <div><span>Service</span><strong>${y(e.service)}</strong></div>
            ${e.extras.length?`<div><span>Extra services</span><strong>${e.extras.map(i=>`${y(oe(i.name))} x${Number(i.quantity??1)} (${w(Number(i.total??i.price))})`).join(", ")}</strong></div>`:""}
            <div><span>Total</span><strong>${w(e.totalAmount)}</strong></div>
            <div><span>Tendered</span><strong>${w(n)}</strong></div>
            <div><span>Paid</span><strong>${w(e.paidAmount)}</strong></div>
            <div><span>Payment status</span><strong>${r}</strong></div>
            <div><span>Change</span><strong>${w(a)}</strong></div>
            <div><span>Balance</span><strong>${w(e.balance)}</strong></div>
          </div>
          <h3>Payments</h3>
          <div class="receipt-payments">
            ${t.map(i=>`<div><span>${y(i.method.toUpperCase())}</span><strong>${w(i.amount)}</strong>${i.reference?`<small>Ref ${y(i.reference)}</small>`:""}</div>`).join("")||'<p class="helper">No payments yet.</p>'}
          </div>
        </div>
      </div>
    </div>
  `}function aa(){return`
    <div class="printer-panel">
      <div class="printer-panel-head">
        <strong>Bluetooth thermal printer</strong>
        <button class="secondary" type="button" data-refresh-printers>${c.printerLoading?"Scanning...":"Scan paired"}</button>
      </div>
      <div class="printer-fields">
        <label>Printer
          <select data-printer-select>
            <option value="">Select paired printer</option>
            ${c.pairedPrinters.map(e=>`<option value="${y(e.address)}" ${c.selectedPrinterAddress===e.address?"selected":""}>${y(e.name)} - ${y(e.address)}</option>`).join("")}
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
      ${c.printerStatus?`<p class="printer-status ok">${y(c.printerStatus)}</p>`:""}
      ${c.printerError?`<p class="printer-status warn">${y(c.printerError)}</p>`:""}
    </div>
  `}async function Dt(){c.printerLoading=!0,c.printerError="",c.printerStatus="",await E();try{if(!(await ue.requestBluetoothPermissions()).granted)throw new Error("Bluetooth permission was not granted.");const t=await ue.listPairedPrinters();c.pairedPrinters=t.printers??[],c.selectedPrinterAddress=c.selectedPrinterAddress||t.savedAddress||c.pairedPrinters[0]?.address||"",c.printerStatus=c.pairedPrinters.length?"Select a printer, then connect.":"No paired printers found. Pair the printer in Android Bluetooth settings first."}catch(e){c.printerError=e instanceof Error?e.message:"Could not scan paired printers."}finally{c.printerLoading=!1,await E()}}async function Xn(){if(!c.selectedPrinterAddress){c.printerError="Select a paired printer first.",await E();return}c.printerLoading=!0,c.printerError="",c.printerStatus="",await E();try{await ue.savePrinter({address:c.selectedPrinterAddress}),await ue.connect({address:c.selectedPrinterAddress}),c.printerStatus="Printer connected and saved."}catch(e){c.printerError=e instanceof Error?e.message:"Printer connection failed."}finally{c.printerLoading=!1,await E()}}function Gn(e){const t=(e.serviceLines?.length?e.serviceLines:[{id:e.serviceId,name:e.service,price:e.price,quantity:1,total:e.price}]).map(a=>({name:a.name,quantity:Number(a.quantity||1),price:Number(a.price||0)})),n=e.extras.map(a=>({name:oe(a.name),quantity:Number(a.quantity??1),price:Number(a.price||0)}));return[...t,...n]}async function Kn(e,t){const n=t.reduce((s,r)=>s+Number(r.amount),0),a=Math.max(0,Number((n-e.totalAmount).toFixed(2)));c.printerLoading=!0,c.printerError="",c.printerStatus="",await E();try{if(!c.selectedPrinterAddress){const s=await ue.getSavedPrinter();c.selectedPrinterAddress=s.address||""}await ue.printReceipt({address:c.selectedPrinterAddress||void 0,paperWidth:c.printerPaperWidth,storeName:"Laba101",receiptNumber:e.ticket,dateTime:be(e.createdAt),customerName:e.customer,customerPhone:e.phone?.trim()||"No phone",items:Gn(e),totalAmount:e.totalAmount,paidAmount:e.paidAmount,changeAmount:a,balanceAmount:e.balance,staffName:c.currentUser?.name?.trim()||"Staff"}),c.printerStatus="Receipt sent to printer."}catch(s){c.printerPanelOpen=!0,c.printerError=s instanceof Error?s.message:"Bluetooth thermal print failed."}finally{c.printerLoading=!1,await E()}}async function Yn(e){c.printerLoading=!0,c.printerError="",c.printerStatus="",await E();try{if(!c.selectedPrinterAddress){const t=await ue.getSavedPrinter();c.selectedPrinterAddress=t.address||""}await ue.printDailySummary({address:c.selectedPrinterAddress||void 0,paperWidth:c.printerPaperWidth,storeName:"Laba101",dateTime:Q(),staffName:c.currentUser?.name?.trim()||"Staff",paidToday:e.paidToday,cashPaidToday:e.cashPaidToday,gcashPaidToday:e.gcashPaidToday,disbursementToday:e.disbursementToday,cashOnHandToday:e.cashOnHandToday}),c.printerStatus="Daily summary sent to printer."}catch(t){c.printerPanelOpen=!0,c.printerError=t instanceof Error?t.message:"Bluetooth thermal print failed."}finally{c.printerLoading=!1,await E()}}function Vn(e,t){const n=c.customerSearch.trim().toLowerCase(),a=e.filter(s=>n?s.name.toLowerCase().includes(n):!1);return`
    <section class="grid content full">
      <article class="panel">
        ${M("Customer Management","Customer records from local offline storage")}
        <form class="search-box" id="customer-search-form">
          <label>
            <span>Search customer name</span>
            <input name="customerSearch" data-customer-search type="search" placeholder="Type the customer name then tap Search" value="${y(c.customerSearch)}" autocomplete="off" />
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
          ${n?a.map(s=>{const r=t.filter(i=>i.customerId===s.id);return`
              <article class="customer-card">
                <header>
                  <div>
                    <strong>${y(s.name)}</strong>
                    <p>${y(s.phone??"No phone")} · ${y(s.address??"No address")}</p>
                  </div>
                  <span>${r.length} order(s)</span>
                </header>
                <div class="customer-orders">
                  ${r.length?r.map(i=>`
                    <div class="customer-order-row">
                      <div>
                        <strong>${y(i.ticket)}</strong>
                        <span>${y(i.service)} · ${y(i.itemCategory)}</span>
                      </div>
                      <div>
                        <strong>${w(i.totalAmount)}</strong>
                        <span>${y(i.status)}</span>
                      </div>
                    </div>`).join(""):'<p class="helper">No order records yet.</p>'}
                </div>
              </article>`}).join(""):'<div class="helper">Search a customer name to display matching records and their order history.</div>'}
        </div>
      </article>
    </section>
  `}function Jn(e,t){const n=e.filter(s=>s.serviceType==="order"),a=e.filter(s=>s.serviceType==="addon");return`
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
            ${hn.map(s=>`<label class="check"><input type="checkbox" name="includes" value="${s}" /> ${s}</label>`).join("")}
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
            ${n.map(s=>`<div class="table-row"><div><strong>${y(s.name)}</strong></div><div>${y(s.category)}</div><div>${w(s.price)}</div><div>${s.maxKg} kg</div><div>${y(s.includes.join(", ")||"none")}</div><div>${s.isActive?"Active":"Inactive"}</div><div class="row-actions"><button class="secondary edit-service-btn" data-id="${s.id}">Edit</button>${s.isActive?`<button class="secondary deactivate-service-btn" data-id="${s.id}">Deactivate</button>`:`<button class="secondary activate-service-btn" data-id="${s.id}">Activate</button>`}</div></div>`).join("")||'<div class="helper">No order services yet.</div>'}
          </div>
        </div>
        <div class="section-divider"></div>
        ${M("Extra Services Table","Add-on services")}
        <div class="table-scroll">
          <div class="table data-table extra-services-table">
            <div class="table-head"><div>Name</div><div>Category</div><div>Price</div><div>Includes</div><div>Status</div><div>Actions</div></div>
            ${a.map(s=>`<div class="table-row"><div><strong>${y(s.name)}</strong></div><div>${y(s.category)}</div><div>${w(s.price)}</div><div>${y(s.includes.join(", ")||"none")}</div><div>${s.isActive?"Active":"Inactive"}</div><div class="row-actions"><button class="secondary edit-service-btn" data-id="${s.id}">Edit</button>${s.isActive?`<button class="secondary deactivate-service-btn" data-id="${s.id}">Deactivate</button>`:`<button class="secondary activate-service-btn" data-id="${s.id}">Activate</button>`}</div></div>`).join("")||'<div class="helper">No extra services yet.</div>'}
          </div>
        </div>
      </article>
    </section>
  `}function Qn(e,t){const n=W(),a=n.slice(0,7),s=c.currentUser?.role==="admin",r=e.map(o=>o.category).filter(o=>!!o&&o!=="Other"&&!Ct.includes(o)),i=Array.from(new Set([...Ct.filter(o=>o!=="Other"),...r,"Other"])),d=e.filter(o=>ce(o)==="daily"&&o.expenseDate===n).reduce((o,u)=>o+u.amount,0),p=e.filter(o=>ce(o)==="monthly"&&o.expenseDate.startsWith(a)).reduce((o,u)=>o+u.amount,0),m=t.filter(o=>o.saleDate===n).reduce((o,u)=>o+u.totalAmount,0),l=t.filter(o=>o.saleDate.startsWith(a)).reduce((o,u)=>o+u.totalAmount,0),f=[...e].sort((o,u)=>Rt(u.number)-Rt(o.number)||u.id-o.id);return`
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
      <div class="panel stat"><div class="card-label">Daily disbursement</div><div class="value">${w(d)}</div></div>
      <div class="panel stat"><div class="card-label">Monthly disbursement</div><div class="value">${w(p)}</div></div>
      <div class="panel stat"><div class="card-label">Today sales input</div><div class="value">${w(m)}</div></div>
      <div class="panel stat"><div class="card-label">Month sales input</div><div class="value">${w(l)}</div></div>
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
            <label class="expense-month-field" hidden>Month<input name="expenseMonth" type="month" value="${fe()}" /></label>
            <label>Amount<input name="amount" type="number" min="0" step="0.01" required placeholder="0.00" /></label>
          </div>
          <div class="form-row"><label>Title / Name<input name="name" required /></label><label>Category<select name="category" data-expense-category-select required>${i.map(o=>`<option value="${y(o)}">${y(o)}</option>`).join("")}</select></label></div>
          <label class="expense-category-custom-field" data-expense-category-custom-field hidden>Specify category<input name="categoryCustom" type="text" placeholder="e.g. Office supplies" /></label>
          <button class="primary" type="submit">Save expense</button>
        </form>
      </article>
      <article class="panel">
        ${M("Disbursement list","Expenses only")}
        ${re(["Date/Month","No.","Type","Name","Category","Amount","Action"],f.map(o=>[`<strong>${y(zt(o))}</strong>`,y(o.number),y(ce(o)),y(o.name),y(o.category),w(o.amount),`<div class="row-actions"><button class="secondary edit-expense-btn" data-id="${o.id}" type="button">Edit</button>${s?`<button class="secondary delete-expense-btn" data-id="${o.id}" type="button">Delete</button>`:""}</div>`]),"data-table orders-data-table app-record-table disbursement-list-table")}
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
            ${t.map(o=>`<div class="table-row"><div>${y(o.saleNumber)}</div><div>${y(o.saleDate)}</div><div>${w(o.cashAmount)}</div><div>${w(o.gcashAmount)}</div><div><strong>${w(o.totalAmount)}</strong></div><div class="row-actions"><button class="secondary edit-sale-btn" data-id="${o.id}" type="button">Edit</button>${s?`<button class="secondary delete-sale-btn" data-id="${o.id}" type="button">Delete</button>`:""}</div></div>`).join("")||'<div class="helper">No daily sales totals yet.</div>'}
          </div>
        </div>
      </article>
    </section>
    `}
  `}function zn(e,t,n,a,s,r,i,d,p,m,l){const f=c.reportPreview?ot(e,t,n,a,s,r,i,c.reportPreview,l):null;return`
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
            <label>Month<input type="month" data-month-summary value="${y(c.monthlySummaryMonth)}" /></label>
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
                  ${f.salesRows().transactions.map(o=>`<tr><td>${y(o.ticket)}</td><td>${y(o.customer)}</td><td>${w(o.cash)}</td><td>${w(o.gcash)}</td><td><strong>${w(o.total)}</strong></td></tr>`).join("")||'<tr><td colspan="5" class="table-empty">No sales records found.</td></tr>'}
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
                    <tr><td>Orders</td><td>${w(f.salesRows().orderCashTotal)}</td><td>${w(f.salesRows().orderGcashTotal)}</td><td>${w(f.salesRows().orderCashTotal+f.salesRows().orderGcashTotal)}</td></tr>
                    <tr><td>Whole Sale Day</td><td>${w(f.salesRows().manualCashTotal)}</td><td>${w(f.salesRows().manualGcashTotal)}</td><td>${w(f.salesRows().manualCashTotal+f.salesRows().manualGcashTotal)}</td></tr>
                    <tr style="font-weight: bold; background: #f8fafc;"><td>Total</td><td>${w(f.salesRows().totalCash)}</td><td>${w(f.salesRows().totalGcash)}</td><td>${w(f.salesRows().totalSales)}</td></tr>
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
                  ${o.rows.slice(1).filter(u=>u.length&&u[0]!=="Total Disbursement").map(u=>`<tr><td>${y(String(u[1]??""))}</td><td>${y(String(u[0]??""))}</td><td>${y(String(u[2]??""))}</td><td>${y(String(u[3]??""))}</td><td>${y(String(u[4]??""))}</td><td><strong>${w(u[6])}</strong></td></tr>`).join("")||'<tr><td colspan="6" class="table-empty">No disbursements found.</td></tr>'}
                </tbody>
              </table>
            </div>
            ${o.categoryTotals.length?`
              <div class="disbursement-category-summary">
                <h4>Disbursement by Category</h4>
                <div class="category-breakdown-list">
                  ${o.categoryTotals.map(u=>`
                    <div class="category-breakdown-row">
                      <span>${y(u.category)}</span>
                      <strong>${w(u.amount)}</strong>
                    </div>
                  `).join("")}
                </div>
              </div>
            `:""}
            <div class="disbursement-total">
              <strong>Total Disbursement: ${w(o.totalDisbursement)}</strong>
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
                  ${f.foldCountRows().rows.slice(1).map(o=>`<tr>${o.map(u=>`<td>${y(String(u??""))}</td>`).join("")}</tr>`).join("")||'<tr><td colspan="2" class="table-empty">No fold records found.</td></tr>'}
                </tbody>
              </table>
            </div>
          </article>`:""}
        ${f.selectedTypes.has("revolving_fund")?`
          <article>
            ${M("Revolving Fund — Daily Summary",`${f.selection.from} to ${f.selection.to}`)}
            ${re(["Date of Sales","Cash on Hand","Status","Date Update"],f.revolvingDailySummaryRows().rows.slice(1).map(o=>[y(String(o[0]??"")),y(String(o[1]??"")),y(String(o[2]??"")),y(String(o[3]??""))]),"data-table orders-data-table bordered-table")}
          </article>
          <article>
            ${M("Revolving Fund — Table History",`${f.selection.from} to ${f.selection.to}`)}
            ${re(["Date","Number","Name","Amount","Category","Description","Type"],f.revolvingHistoryRows().rows.slice(1).map(o=>[y(String(o[0]??"")),y(String(o[1]??"")),y(String(o[2]??"")),y(String(o[3]??"")),y(String(o[4]??"")),y(String(o[5]??"")),y(String(o[6]??""))]),"data-table orders-data-table bordered-table")}
          </article>`:""}
        ${f.selectedTypes.has("summary")?(()=>{const o=f.salesRows(),u=f.disbursementRows(),T=Number((o.totalSales-u.totalDisbursement).toFixed(2)),P=Jt(f.selection.from,f.selection.to)?rt(f.selection.from.slice(0,7)):`${f.selection.from} to ${f.selection.to}`;return`
          <article>
            <div class="monthly-summary-slip">
              <div class="monthly-summary-title">Laba 101</div>
              <div class="monthly-summary-branch">${y(it(l))}</div>
              <div class="monthly-summary-period">For the month of ${y(P)}</div>
              <div class="monthly-summary-divider"></div>
              <div class="monthly-summary-section">
                <div class="monthly-summary-heading">Total Sales</div>
                <div class="summary-detail-row">
                  <span>Cash:</span><strong>${w(o.totalCash)}</strong>
                </div>
                <div class="summary-detail-row">
                  <span>GCash:</span><strong>${w(o.totalGcash)}</strong>
                </div>
                <div class="summary-detail-row summary-total-row">
                  <span>Total:</span><strong>${w(o.totalSales)}</strong>
                </div>
              </div>
              <div class="monthly-summary-divider"></div>
              <div class="monthly-summary-section">
                <div class="monthly-summary-heading">Total Disbursement</div>
                ${u.categoryTotals.map(q=>`
                  <div class="summary-detail-row monthly-summary-category-row">
                    <span>${y(q.category)}:</span><strong>${w(q.amount)}</strong>
                  </div>
                `).join("")}
                <div class="summary-detail-row summary-total-row">
                  <span>Total:</span><strong>${w(u.totalDisbursement)}</strong>
                </div>
              </div>
              <div class="monthly-summary-divider"></div>
              <div class="monthly-summary-section">
                <div class="monthly-summary-heading">Net Income</div>
                <div class="summary-detail-row summary-total-row">
                  <span></span><strong class="${T>=0?"positive":"negative"}">${w(T)}</strong>
                </div>
              </div>
            </div>
          </article>`})():""}
        })() : ''}
      </section>
    `:""}
  `}function Zn(e){return`
    <section class="grid content full">
      <article class="panel span-2">
        ${M("Activity Logs","Recorded staff actions and timestamps")}
        ${re(["Timestamp","Staff","Action","Details"],e.map(t=>[ke(t.timestamp),y(t.staffName),`<strong>${y(t.action)}</strong>`,y(t.details)]),"data-table orders-data-table app-record-table logs-table")}
      </article>
    </section>
  `}function es(e,t,n){return`
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
          <input name="branch" type="hidden" value="${y(n)}" />
          <button class="primary" type="submit">Save item</button>
        </form>
      </article>
      <article class="panel span-2">
        ${M("Stock List","Editable branch inventory")}
        ${re(["Item","Qty","Unit","Reorder","Status","Updated","Action"],e.map(a=>[`<strong>${y(a.name)}</strong><div class="small">${y(a.notes??"")}</div>`,y(a.quantity),y(a.unit),y(a.reorderLevel),`<span class="${a.quantity<=a.reorderLevel?"warn":"ok"}">${a.quantity<=a.reorderLevel?"Low stock":"OK"}</span>`,ke(a.updatedAt),`<button class="secondary edit-inventory-btn" type="button" data-id="${a.id}">Edit</button>`]),"data-table orders-data-table app-record-table inventory-stock-table")}
      </article>
      <article class="panel">
        ${M("Stock In / Stock Out","Adjust inventory quantities")}
        <form id="inventory-movement-form" class="form">
          <label>Item<select name="itemId" required>
            <option value="">Select item</option>
            ${e.map(a=>`<option value="${a.id}">${y(a.name)} (${a.quantity} ${y(a.unit)})</option>`).join("")}
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
        ${re(["Date","Item","Type","Qty","Staff","Notes"],t.map(a=>[ke(a.createdAt),y(a.itemName),`<span class="${a.movementType==="in"?"ok":"warn"}">${a.movementType==="in"?"Stock-in":"Stock-out"}</span>`,y(a.quantity),y(a.staffName),y(a.notes??"")]),"data-table orders-data-table app-record-table inventory-movement-table")}
      </article>
    </section>
  `}function ts(e,t,n){const a=e.filter(l=>l.status!=="under_cleaning"),s=e.filter(l=>l.status==="under_cleaning"),r=new Date,i=new Date(r.getFullYear(),r.getMonth(),1);i.setDate(i.getDate()-i.getDay());const d=Array.from({length:35},(l,f)=>{const o=new Date(i);o.setDate(i.getDate()+f);const u=Q(o),T=t.filter(P=>P.date===u);return{key:u,date:o,records:T,isCurrentMonth:o.getMonth()===r.getMonth(),isToday:u===W()}}),p=new Intl.DateTimeFormat("en-PH",{month:"long",year:"numeric"}).format(r),m=t.some(l=>l.date===W()&&l.cleaningType==="general");return`
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
            ${a.map(l=>`<label class="machine-card"><input type="checkbox" name="machineIds" value="${l.id}" /><span><strong>${y(l.machineName)}</strong><small>${y(l.machineType)}</small></span><em></em></label>`).join("")||'<p class="helper">All machines are currently being cleaned.</p>'}
          </fieldset>
          <input type="hidden" name="cleaningStatus" value="in_progress" />
          <input type="hidden" name="cleaningType" value="tube" />
          <label>Notes <textarea name="notes" placeholder="e.g. Deep clean filters"></textarea></label>
          <input type="hidden" name="branch" value="${y(n)}" />
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
          ${s.length?s.map(l=>`
            <div class="machine-status">
              <span><strong>${y(l.machineName)}</strong><small>${y(l.machineType)}</small></span>
              <b>In progress</b>
              <button class="secondary complete-cleaning-btn" type="button" data-machine-id="${l.id}" data-branch="${y(n)}">Mark Complete</button>
            </div>`).join(""):'<p class="helper">No machines under cleaning right now.</p>'}
        </div>
      </article>
      <article class="panel span-2">
        ${M("Tube Cleaning Checklist","Track which machines have been cleaned today.")}
        ${re(["Machine","Type","Status","Notes","Date"],e.map(l=>{const f=t.find(o=>o.machineIds.includes(l.id)&&o.date===W());return[`<strong>${y(l.machineName)}</strong>`,y(l.machineType),`<span class="${f?"ok":"warn"}">${f?y(f.cleaningStatus.replace("_"," ")):"Not Cleaned"}</span>`,y(f?.notes??"-"),W()]}),"data-table orders-data-table app-record-table tube-checklist-table")}
      </article>
      <article class="panel span-2">
        ${M("Cleaning Calendar",p)}
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
          <input type="hidden" name="branch" value="${y(n)}" />
          <button class="primary" type="submit">Add machine</button>
        </form>
      </article>
      <article class="panel">
        ${M("Machines","Washer and dryer status")}
        <div class="table">
          <div class="table-head"><div>Name</div><div>Type</div><div>Status</div><div>Branch</div><div>Actions</div></div>
          ${e.map(l=>`<div class="table-row"><div><strong>${y(l.machineName)}</strong></div><div>${y(l.machineType)}</div><div>${y(l.status.replace("_"," "))}</div><div>${y(l.branch)}</div>
          <div class="row-actions">
            ${l.status!=="inactive"?`<button class="secondary deactivate-machine-btn" data-id="${l.id}">Deactivate</button>`:`<button class="secondary activate-machine-btn" data-id="${l.id}">Activate</button>`}
          </div></div>`).join("")||'<div class="helper">No machines found.</div>'}
        </div>
      </article>
    </section>
    `}
  `}function as(e,t){return`
    <section class="grid">
      <div class="page-head">
        <div>
          <p class="eyebrow">Team Management</p>
          <h2>Staff Overview</h2>
        </div>
        <button class="primary" id="open-add-staff-modal" type="button">+ Add staff</button>
      </div>

      <article class="panel">
        ${M("Staff list","Branch: "+y(t))}
        <div class="table-scroll">
          <div class="table data-table">
            <div class="table-head"><div>Name</div><div>Email</div><div>Role</div><div>Branch</div><div>Status</div><div>Actions</div></div>
            ${e.length?e.map(n=>`<div class="table-row"><div><strong>${y(n.name)}</strong></div><div>${y(n.email)}</div><div>${y(n.role)}</div><div>${y(n.branch)}</div><div>${n.isActive!==0?"Active":"Inactive"}</div>
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
  `}function ns(e,t,n){return`
    <section class="grid content full">
      <article class="panel">
        ${M("Settings","Device-local configuration")}
        <form id="settings-form" class="form">
          <label>Current branch<select name="branch">
            ${["Main Store","Mintal Branch","Gensan Branch"].map(a=>`<option value="${a}" ${a===e?"selected":""}>${a}</option>`).join("")}
          </select></label>
          <label>Report email<input name="reportEmail" type="email" placeholder="admin@laba101.test" value="${y(n)}" /></label>
          <button class="primary" type="submit">Save settings</button>
        </form>
      </article>
    </section>
  `}function ss(e,t){const n=e.filter(s=>s.machineType==="washer"&&s.status==="available"),a=e.filter(s=>s.machineType==="dryer"&&s.status==="available");return`
    <section class="page-head">
      <div>
        <h2>Machine Control</h2>
        <p class="meta">Control washer and dryer machines via WiFi connection</p>
      </div>
    </section>
    <section class="grid content full">
      <article class="panel">
        ${M("Washers","Start and control washing machines")}
        <div class="machine-grid">
          ${n.length?n.map(s=>{const r=c.machineStatus.get(s.id)||"idle";return`
              <div class="machine-control-card ${r}">
                <div class="machine-header">
                  <strong>${y(s.machineName)}</strong>
                  <span class="machine-type">Washer</span>
                </div>
                <div class="machine-status-indicator ${r}">
                  ${r==="idle"?"Idle":r==="running"?"Running":r==="paused"?"Paused":"Completed"}
                </div>
                ${r==="idle"?`
                  <div class="machine-controls">
                    <label>Timer (minutes)
                      <input type="number" class="timer-input" data-machine-id="${s.id}" min="1" max="120" value="30" />
                    </label>
                    <button class="primary start-machine-btn" data-machine-id="${s.id}" data-machine-type="washer" type="button">Start</button>
                  </div>
                `:r==="running"?`
                  <div class="machine-controls">
                    <button class="warning pause-machine-btn" data-machine-id="${s.id}" type="button">Pause</button>
                    <button class="secondary stop-machine-btn" data-machine-id="${s.id}" type="button">Stop</button>
                  </div>
                `:r==="paused"?`
                  <div class="machine-controls">
                    <button class="primary resume-machine-btn" data-machine-id="${s.id}" type="button">Resume</button>
                    <button class="secondary stop-machine-btn" data-machine-id="${s.id}" type="button">Stop</button>
                  </div>
                `:`
                  <div class="machine-controls">
                    <button class="secondary reset-machine-btn" data-machine-id="${s.id}" type="button">Reset</button>
                  </div>
                `}
              </div>
            `}).join(""):'<p class="helper">No available washers found.</p>'}
        </div>
      </article>
      <article class="panel">
        ${M("Dryers","Start and control drying machines")}
        <div class="machine-grid">
          ${a.length?a.map(s=>{const r=c.machineStatus.get(s.id)||"idle";return`
              <div class="machine-control-card ${r}">
                <div class="machine-header">
                  <strong>${y(s.machineName)}</strong>
                  <span class="machine-type">Dryer</span>
                </div>
                <div class="machine-status-indicator ${r}">
                  ${r==="idle"?"Idle":r==="running"?"Running":r==="paused"?"Paused":"Completed"}
                </div>
                ${r==="idle"?`
                  <div class="machine-controls">
                    <label>Timer (minutes)
                      <input type="number" class="timer-input" data-machine-id="${s.id}" min="1" max="120" value="45" />
                    </label>
                    <button class="primary start-machine-btn" data-machine-id="${s.id}" data-machine-type="dryer" type="button">Start</button>
                  </div>
                `:r==="running"?`
                  <div class="machine-controls">
                    <button class="warning pause-machine-btn" data-machine-id="${s.id}" type="button">Pause</button>
                    <button class="secondary stop-machine-btn" data-machine-id="${s.id}" type="button">Stop</button>
                  </div>
                `:r==="paused"?`
                  <div class="machine-controls">
                    <button class="primary resume-machine-btn" data-machine-id="${s.id}" type="button">Resume</button>
                    <button class="secondary stop-machine-btn" data-machine-id="${s.id}" type="button">Stop</button>
                  </div>
                `:`
                  <div class="machine-controls">
                    <button class="secondary reset-machine-btn" data-machine-id="${s.id}" type="button">Reset</button>
                  </div>
                `}
              </div>
            `}).join(""):'<p class="helper">No available dryers found.</p>'}
        </div>
      </article>
      <article class="panel span-2">
        ${M("Machine Configuration","Configure WiFi settings for machines")}
        <form id="machine-config-form" class="form">
          <label>Select Machine
            <select name="machineId" required>
              <option value="">-- Select a machine --</option>
              ${e.map(s=>`<option value="${s.id}">${y(s.machineName)} (${s.machineType})</option>`).join("")}
            </select>
          </label>
          <label>WiFi IP Address
            <input type="text" name="ipAddress" placeholder="192.168.1.100" pattern="^(?:[0-9]{1,3}\\.){3}[0-9]{1,3}$" required />
          </label>
          <label>Port
            <input type="number" name="port" placeholder="8080" min="1" max="65535" value="8080" required />
          </label>
          <button class="primary" type="submit">Save Configuration</button>
        </form>
      </article>
    </section>
  `}function rs(){const e=()=>{localStorage.removeItem(Ce),c.currentUser=null,c.tab="dashboard",c.receiptOrderId=0,c.sidebarOpen=!1,E()};document.querySelector("#logout-button")?.addEventListener("click",e),document.querySelector("#mobile-logout-button")?.addEventListener("click",e),document.querySelector("#mobile-menu-button")?.addEventListener("click",()=>{c.sidebarOpen=!0,E()}),document.querySelector("#sidebar-close-button")?.addEventListener("click",()=>{c.sidebarOpen=!1,E()}),document.querySelector("#sidebar-backdrop")?.addEventListener("click",()=>{c.sidebarOpen=!1,E()}),document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{c.tab=t.dataset.tab,c.receiptOrderId=0,c.sidebarOpen=!1,E()})}),document.querySelectorAll("[data-quick-tab]").forEach(t=>{t.addEventListener("click",()=>{c.tab=t.dataset.quickTab,E()})}),document.querySelectorAll("[data-receipt]").forEach(t=>{t.addEventListener("click",()=>{c.receiptOrderId=Number(t.dataset.receipt),c.printerPanelOpen=!1,c.printerError="",c.printerStatus="",E()})}),document.querySelector("[data-close-receipt]")?.addEventListener("click",()=>{c.receiptOrderId=0,E()}),document.querySelector("[data-open-printer-panel]")?.addEventListener("click",()=>{c.printerPanelOpen=!c.printerPanelOpen,c.printerPanelOpen&&c.pairedPrinters.length===0?Dt():E()}),document.querySelector("[data-refresh-printers]")?.addEventListener("click",()=>{Dt()}),document.querySelector("[data-printer-select]")?.addEventListener("change",t=>{c.selectedPrinterAddress=t.currentTarget.value,E()}),document.querySelector("[data-paper-width]")?.addEventListener("change",t=>{c.printerPaperWidth=Number(t.currentTarget.value)===80?80:58,E()}),document.querySelector("[data-connect-printer]")?.addEventListener("click",()=>{Xn()}),document.querySelector("[data-thermal-print]")?.addEventListener("click",()=>{(async()=>{const t=await ct(),n=t.orders.find(s=>s.id===c.receiptOrderId);if(!n)throw new Error("Receipt order not found.");const a=t.payments.filter(s=>s.orderId===n.id);await Kn(n,a)})().catch(t=>{c.printerPanelOpen=!0,c.printerError=t instanceof Error?t.message:"Bluetooth thermal print failed.",E()})}),document.querySelector("[data-open-daily-summary]")?.addEventListener("click",()=>{c.dashboardSummaryModalOpen=!0,E()}),document.querySelector("[data-close-daily-summary]")?.addEventListener("click",()=>{c.dashboardSummaryModalOpen=!1,E()}),document.querySelector("[data-print-dashboard]")?.addEventListener("click",t=>{const a=t.currentTarget.dataset.metrics;if(a)try{const s=JSON.parse(a);Yn(s)}catch(s){console.error("Failed to parse dashboard metrics:",s)}}),document.querySelectorAll("[data-report-tab]").forEach(t=>{t.addEventListener("click",()=>{c.dailyReportTab=t.dataset.reportTab,E()})}),document.querySelectorAll("[data-maintenance-tab]").forEach(t=>{t.addEventListener("click",()=>{c.maintenanceTab=t.dataset.maintenanceTab,E()})})}function is(){kn(),document.querySelector("#login-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget),n=document.querySelector("#login-button");n&&(n.disabled=!0,n.textContent="Signing in...");try{const a=await kt(String(t.get("email")??""),String(t.get("password")??""));if(!a){c.loginError="Invalid email or password.",await E();return}c.currentUser=a,c.loginError="",await $e("branch",String(a.branch||"Main Store")),t.get("remember")?localStorage.setItem(Ce,JSON.stringify({email:a.email,remembered:!0})):localStorage.removeItem(Ce),ea().includes(c.tab)||(c.tab="dashboard"),await E()}catch(a){alert("Login Error: "+String(a?.message||a)),n&&(n.disabled=!1,n.textContent="Sign in")}})}function os(){De&&window.clearInterval(De);const e=document.querySelector("[data-navbar-time]"),t=document.querySelector("[data-navbar-date]");if(!e||!t){De=void 0;return}const n=()=>{const a=In();e.textContent=a.time,t.textContent=a.date};n(),De=window.setInterval(n,1e3)}function Ot(e,t){return e?t.find(n=>n.name.toLowerCase()===e.category.toLowerCase())??t.find(n=>n.name==="Regular Clothes")??t[0]??null:null}function Ge(e,t){return Math.max(1,Number(t.maxKg||e.maxKg||1))}function na(e,t){return Object.fromEntries(t.filter(n=>n.serviceType==="order").map(n=>[n.id,Number(e.querySelector(`input[name="serviceQty-${n.id}"]`)?.value??0)]).filter(([,n])=>Number(n)>0))}function Pt(e,t){const n=na(e,t);return t.filter(a=>a.serviceType==="order"&&Number(n[a.id]??0)>0).map(a=>({...a,quantity:Number(n[a.id])}))}function sa(e,t){return Object.fromEntries(t.filter(n=>n.serviceType==="addon").map(n=>[n.id,Number(e.querySelector(`input[name="addonQty-${n.id}"]`)?.value??0)]).filter(([,n])=>Number(n)>0))}function It(e,t){const n=sa(e,t);return t.filter(a=>a.serviceType==="addon"&&Number(n[a.id]??0)>0).map(a=>({...a,quantity:Number(n[a.id])}))}function cs(e){const t=document.querySelector("#order-form"),n=document.querySelector("#price-preview"),a=t?.querySelector('button[type="submit"]'),s=document.querySelector("#customer-name-input"),r=document.querySelector("#customer-id-input"),i=document.querySelector("#customer-phone-input"),d=document.querySelector("#customer-suggestions"),p=t?.querySelector("[data-order-error]"),m=t?.querySelector('select[name="paymentMethod"]'),l=t?.querySelector(".gcash-reference"),f=t?.querySelector('input[name="paymentReference"]');let o=!1,u;const T=h=>{if(!d||!s)return;const N=h.trim().toLowerCase();if(!N){d.hidden=!0;return}const L=e.customers.filter(v=>v.name.toLowerCase().includes(N)||(v.phone??"").includes(N)).slice(0,8),F=`<div class="ac-item ac-add" data-ac-new="true"><strong>+ Add new: "${y(h.trim())}"</strong></div>`,S=L.map(v=>`<div class="ac-item" data-ac-id="${v.id}" data-ac-name="${y(v.name)}" data-ac-phone="${y(v.phone??"")}"><strong>${y(v.name)}</strong>${v.phone?`<span>${y(v.phone)}</span>`:""}</div>`).join("");d.innerHTML=S+F,d.hidden=!1};s?.addEventListener("input",()=>{r&&(r.value=""),clearTimeout(u),u=window.setTimeout(()=>T(s.value),150)}),s?.addEventListener("focus",()=>{s.value.trim()&&T(s.value)}),d?.addEventListener("click",h=>{const N=h.target.closest(".ac-item");N&&(N.dataset.acNew==="true"?r&&(r.value=""):(s&&(s.value=N.dataset.acName??""),i&&(i.value=N.dataset.acPhone??""),r&&(r.value=N.dataset.acId??"")),d&&(d.hidden=!0))}),document.addEventListener("click",h=>{d&&!d.contains(h.target)&&h.target!==s&&(d.hidden=!0)});const P=()=>{const h=m?.value==="gcash";l&&(l.hidden=!h),f&&(f.required=h,h||(f.value=""))},q=(h,N)=>{if(!t)return;const L=t.querySelector(`input[name="${h}"]`);L&&(L.value=String(Math.max(0,Number(L.value||0)+N)),L.closest(".qty-card")?.classList.toggle("is-selected",Number(L.value)>0),L.dispatchEvent(new Event("input",{bubbles:!0})))};t?.querySelectorAll(".qty-control input").forEach(h=>{h.addEventListener("input",()=>{h.value=String(Math.max(0,Number(h.value||0))),h.closest(".qty-card")?.classList.toggle("is-selected",Number(h.value)>0)})}),t?.querySelectorAll("[data-qty-card]").forEach(h=>{h.addEventListener("click",N=>{const L=N.target;L.closest("input")||L.closest("button")||q(h.dataset.qtyCard??"",1)})}),t?.querySelectorAll("[data-qty-plus]").forEach(h=>{h.addEventListener("click",()=>q(h.dataset.qtyPlus??"",1))}),t?.querySelectorAll("[data-qty-minus]").forEach(h=>{h.addEventListener("click",()=>q(h.dataset.qtyMinus??"",-1))});const U=()=>{if(!t||!n)return;const h=Pt(t,e.services),N=h[0],L=Ot(N,e.categories),F=It(t,e.services),S=h.length>0&&N&&L,v=F.length>0;if(!S&&!v){a&&(a.disabled=!0),p&&(p.hidden=!o,p.textContent=o?"Please select at least one service or extra service.":""),n.innerHTML='<div class="preview-total"><span>Total amount</span><strong>PHP 0.00</strong></div>';return}if(S){const b=Oe(h,L,Ge(N,L),F),$=b.serviceLines.map(D=>`${D.name} x${D.quantity}`),x=b.extras.map(D=>`${oe(D.name)} x${D.quantity}`);a&&(a.disabled=!1),p&&(p.hidden=!0,p.textContent=""),n.classList.remove("has-error"),n.innerHTML=`
        <div class="preview-line"><span>Services${$.length?` (${y($.join(", "))})`:""}</span><strong>${w(b.price)}</strong></div>
        ${b.extraServiceAmount>0?`<div class="preview-line"><span>Extra services${x.length?` (${y(x.join(", "))})`:""}</span><strong>${w(b.extraServiceAmount)}</strong></div>`:""}
        <div class="preview-total"><span>Total amount</span><strong>${w(b.totalAmount)}</strong></div>
      `}else{const b=F.reduce((x,D)=>x+D.price*(D.quantity??1),0),$=F.map(x=>`${oe(x.name)} x${x.quantity??1}`);a&&(a.disabled=!1),p&&(p.hidden=!0,p.textContent=""),n.classList.remove("has-error"),n.innerHTML=`
        <div class="preview-line"><span>Extra services (${y($.join(", "))})</span><strong>${w(b)}</strong></div>
        <div class="preview-total"><span>Total amount</span><strong>${w(b)}</strong></div>
      `}};m?.addEventListener("change",P),P(),t?.addEventListener("input",U),t?.addEventListener("change",U),U(),t?.addEventListener("submit",async h=>{h.preventDefault(),o=!0;const N=new FormData(t),L=Pt(t,e.services),F=L[0],S=Ot(F,e.categories),v=It(t,e.services),b=L.length>0&&F&&S,$=v.length>0;if(!b&&!$){p&&(p.hidden=!1,p.textContent="Please select at least one service or extra service.");return}const x=L.map(k=>`${k.name} x${k.quantity}`).join(", "),D=b?Oe(L,S,Ge(F,S),v):Oe([],e.categories[0],1,v);if(confirm(`Save this order?

Services: ${x}
Total: ${w(D.totalAmount)}`))try{const k=await ja({customerId:Number(N.get("customerId"))||void 0,customerName:String(N.get("customerName")??""),customerPhone:String(N.get("customerPhone")??"")||null,serviceQuantities:na(t,e.services),branch:e.branch,itemCategoryId:S?.id??e.categories[0].id,weightKg:F&&S?Ge(F,S):1,addonQuantities:sa(t,e.services),paidAmount:Number(N.get("paidAmount")??0),paymentMethod:String(N.get("paymentMethod")??"cash"),paymentReference:String(N.get("paymentReference")??"")||null,notes:String(N.get("notes")??"")||null});await X("Create order",`${k.ticket} ${w(k.totalAmount)}`),c.receiptOrderId=k.id,await E()}catch(k){p&&(p.hidden=!1,p.textContent=k instanceof Error?k.message:"Order could not be saved.")}}),document.querySelectorAll(".advance-form").forEach(h=>{h.addEventListener("submit",async N=>{N.preventDefault();const L=Number(h.dataset.orderId),F=h.dataset.action==="claim",S=Number(h.dataset.balance||0);if(F&&S>0){alert("Please complete the balance before claiming this order.");return}const v=new FormData(h),b=v.getAll("assignedStaffId").map(Number).filter(B=>B>0),$=Number(v.get("releasedBy")||0),x=b.length>0?b:$>0?$:null;await Nt(L,x);const D=F&&$>0?e.staff.find(B=>B.id===$)?.name:null,k=F&&D?`Order ID ${L} (Released by: ${D})`:`Order ID ${L}`;await X(F?"Claim order":"Advance order",k),await E()})}),document.querySelectorAll(".fold-staff-select").forEach(h=>{h.addEventListener("change",async()=>{const N=Number(h.value);if(!N)return;const L=Number(h.dataset.orderId);h.disabled=!0;try{await jt(L,N),await X("Record fold",`Order ID ${L} (Fold ${h.dataset.foldNumber??""})`),await E()}catch(F){h.disabled=!1,alert(F instanceof Error?F.message:"Could not save fold.")}})}),document.querySelectorAll(".claim-payment-form").forEach(h=>{const N=h.querySelector('select[name="method"]'),L=h.querySelector('input[name="reference"]'),F=()=>{const S=N?.value==="gcash";L&&(L.closest("label").hidden=!S,L.required=S,S||(L.value=""))};N?.addEventListener("change",F),F(),h.addEventListener("submit",async S=>{S.preventDefault();const v=new FormData(h),b=Number(v.get("amount"));if(b<=0)return;const $=Number(h.dataset.orderId);await Ye($,{amount:b,method:String(v.get("method")),reference:String(v.get("reference")??"")||null}),await Nt($,null),c.paymentModalOrderId=0,await E()})}),document.querySelectorAll("[data-close-payment-modal]").forEach(h=>{h.addEventListener("click",async()=>{c.paymentModalOrderId=0,await E()})}),document.querySelectorAll(".payment-form").forEach(h=>{const N=h.querySelector('select[name="method"]'),L=h.querySelector('input[name="reference"]'),F=()=>{const S=N?.value==="gcash";L&&(L.hidden=!S,L.required=S,S||(L.value=""))};N?.addEventListener("change",F),F(),h.addEventListener("submit",async S=>{S.preventDefault();const v=new FormData(h),b=Number(v.get("amount")),$=String(v.get("method")),x=String(v.get("reference")??"")||null;confirm(`Confirm payment of ${w(b)} via ${$.toUpperCase()}?`)&&(await Ye(Number(h.dataset.orderId),{amount:b,method:$,reference:x}),await X("Record payment",`${w(b)} ${$.toUpperCase()} for order ID ${h.dataset.orderId}`),await E())})}),document.querySelectorAll("[data-cancel-order]").forEach(h=>{h.addEventListener("click",async()=>{const N=Number(h.dataset.cancelOrder);if(Number.isFinite(N)&&confirm("Cancel this order? (No payment will be refunded.)"))try{c.receiptOrderId===N&&(c.receiptOrderId=0),await Xa(N),await X("Cancel order",`Order ID ${N}`),await E()}catch(L){alert(L instanceof Error?L.message:"Cancel failed.")}})}),document.querySelectorAll("[data-delete-order]").forEach(h=>{h.addEventListener("click",async()=>{const N=Number(h.dataset.deleteOrder);if(Number.isFinite(N)&&confirm("Delete this paid order and update sales?"))try{c.receiptOrderId===N&&(c.receiptOrderId=0),await Ga(N),await E()}catch(L){alert(L instanceof Error?L.message:"Delete failed.")}})})}function ls(e){document.querySelector("#service-form")?.addEventListener("submit",async t=>{t.preventDefault();const n=new FormData(t.currentTarget),a=n.get("id")?Number(n.get("id")):void 0;await wt({id:a,name:String(n.get("name")??""),description:String(n.get("description")??"")||null,category:String(n.get("category")??""),serviceType:String(n.get("serviceType")??"order"),price:Number(n.get("price")??0),maxKg:Number(n.get("maxKg")??0),dryingMinutes:Number(n.get("dryingMinutes"))||null,includes:n.getAll("includes").map(String).filter(Boolean),additionalCharge:0,turnaroundHours:Number(n.get("turnaroundHours")??24),isActive:1}),await E()}),document.querySelectorAll(".edit-service-btn").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.dataset.id),a=e.find(r=>r.id===n),s=document.querySelector("#service-form");a&&s&&(s.querySelector("[name=id]").value=String(a.id),s.querySelector("[name=name]").value=a.name,s.querySelector("[name=category]").value=a.category,s.querySelector("[name=serviceType]").value=a.serviceType,s.querySelector("[name=price]").value=String(a.price),s.querySelector("[name=maxKg]").value=String(a.maxKg),s.querySelector("[name=dryingMinutes]").value=a.dryingMinutes?String(a.dryingMinutes):"",s.querySelectorAll('input[name="includes"]').forEach(r=>{r.checked=a.includes.includes(r.value)}),s.querySelector("[name=turnaroundHours]").value=String(a.turnaroundHours),s.querySelector("[name=description]").value=a.description??"",window.scrollTo({top:0,behavior:"smooth"}))})}),document.querySelectorAll(".deactivate-service-btn, .activate-service-btn").forEach(t=>{t.addEventListener("click",async()=>{const n=Number(t.dataset.id),a=e.find(s=>s.id===n);if(a){const s=a.isActive?0:1;await wt({id:a.id,name:a.name,description:a.description,category:a.category,serviceType:a.serviceType,price:a.price,maxKg:a.maxKg,dryingMinutes:a.dryingMinutes,includes:a.includes,additionalCharge:a.additionalCharge,turnaroundHours:a.turnaroundHours,isActive:s}),await E()}})}),document.querySelector("#category-form")?.addEventListener("submit",async t=>{t.preventDefault();const n=new FormData(t.currentTarget);await _a({name:String(n.get("name")??""),maxKg:Number(n.get("maxKg")??0),additionalFee:Number(n.get("additionalFee")??0),isActive:1}),await E()})}function ds(e){const t=document.querySelector("#expense-form"),n=t?.querySelector('input[name="disbursementType"]'),a=t?.querySelector(".expense-date-field"),s=t?.querySelector(".expense-month-field"),r=t?.querySelector('input[name="expenseDate"]'),i=t?.querySelector('input[name="expenseMonth"]'),d=t?.querySelector("[data-expense-category-select]"),p=t?.querySelector("[data-expense-category-custom-field]"),m=t?.querySelector('input[name="categoryCustom"]'),l=o=>{!t||!n||!r||!i||(n.value=o,t.querySelectorAll("[data-expense-type]").forEach(u=>{u.classList.toggle("is-active",u.dataset.expenseType===o)}),a&&(a.hidden=o==="monthly"),s&&(s.hidden=o!=="monthly"),r.required=o==="daily",i.required=o==="monthly",o==="monthly"&&!i.value&&(i.value=fe()),o==="daily"&&!r.value&&(r.value=W()))},f=()=>{if(!d||!p||!m)return;const o=d.value==="Other";p.hidden=!o,m.required=o,o||(m.value="")};t?.querySelectorAll("[data-expense-type]").forEach(o=>{o.addEventListener("click",()=>l(o.dataset.expenseType==="monthly"?"monthly":"daily"))}),d?.addEventListener("change",f),l("daily"),f(),t?.addEventListener("submit",async o=>{o.preventDefault();const u=new FormData(o.currentTarget),T=Number(u.get("id")||0),P=String(u.get("disbursementType")??"daily")==="monthly"?"monthly":"daily",q=String(u.get("expenseMonth")??fe()),U=String(u.get("category")??"").trim(),h=String(u.get("categoryCustom")??"").trim(),N=U==="Other"?h:U;if(!N){alert("Please enter a category name.");return}const L={expenseDate:P==="monthly"?`${q}-01`:String(u.get("expenseDate")??""),disbursementType:P,name:String(u.get("name")??""),category:N,description:"",amount:Number(u.get("amount")??0)};if(P==="daily"&&L.expenseDate!==W()){const F=prompt("Admin password is required for non-today disbursement dates.");if(!F||!await Pn(F)){alert("Admin password is incorrect. Disbursement was not saved.");return}}T?await tn(T,L):await en(L),await X(T?"Update disbursement":"Create disbursement",`${L.expenseDate} ${L.name} ${w(L.amount)}`),await E()}),document.querySelectorAll(".edit-expense-btn").forEach(o=>{o.addEventListener("click",()=>{const u=e.find(P=>P.id===Number(o.dataset.id));if(!u||!t)return;t.querySelector("[name=id]").value=String(u.id),t.querySelector("[name=expenseDate]").value=u.expenseDate,t.querySelector("[name=expenseMonth]").value=Qt(u.expenseDate),l(ce(u)),d&&(d.value=u.category||"Other"),m&&(m.value=(d?.value==="Other","")),f(),t.querySelector("[name=amount]").value=String(u.amount),t.querySelector("[name=name]").value=u.name;const T=t.querySelector('button[type="submit"]');T&&(T.textContent="Update expense"),t.scrollIntoView({behavior:"smooth",block:"start"})})}),document.querySelectorAll(".delete-expense-btn").forEach(o=>{o.addEventListener("click",async()=>{if(c.currentUser?.role!=="admin")return;const u=Number(o.dataset.id);!Number.isFinite(u)||!confirm("Delete this disbursement?")||(await an(u),await E())})}),document.querySelector("#fold-form")?.addEventListener("submit",async o=>{o.preventDefault();const u=new FormData(o.currentTarget);await Ya({orderTicket:String(u.get("orderTicket")??""),staffName:String(u.get("staffName")??""),foldCount:Number(u.get("foldCount")??1),rate:Number(u.get("rate")??5)}),await E()})}function us(e,t,n,a,s,r,i,d){document.querySelector("#generate-report")?.addEventListener("click",()=>{c.reportPreview=We(),E()});const p=document.querySelector("[data-month-summary]");p&&p.addEventListener("change",()=>{c.monthlySummaryMonth=p.value||fe()});const m=()=>{const S=p?.value||c.monthlySummaryMonth||fe();c.monthlySummaryMonth=S;const v=Rn(e,t,n,a,s,r,i,S,d);return{fileName:Cn(S),dataUrl:xn(v),report:v}},l=async()=>{const{fileName:S,dataUrl:v,report:b}=m();if(!R.isNativePlatform())return{fileName:S,uri:"",dataUrl:v,report:b};const $=S;await Re.writeFile({path:$,data:$n(v),directory:ge.Cache,recursive:!0});const{uri:x}=await Re.getUri({path:$,directory:ge.Cache});return{fileName:S,uri:x,dataUrl:v,report:b}},f=()=>{const{fileName:S,dataUrl:v}=m(),b=document.createElement("a");return b.href=v,b.download=S,document.body.appendChild(b),b.click(),setTimeout(()=>{b.remove()},1e3),S},o=async()=>{const S=document.querySelector("#generate-monthly-summary");S&&(S.disabled=!0,S.textContent="Generating...");try{if(R.isNativePlatform()){const v=await l();try{await bt.share({title:`Laba101 monthly summary ${v.report.monthLabel}`,text:`Please find the attached monthly summary image: ${v.fileName}`,files:[v.uri],dialogTitle:"Share monthly summary"}),alert(`Monthly summary saved and shared as "${v.fileName}".`)}catch(b){const $=String(b).toLowerCase();if($.includes("share canceled")||$.includes("canceled"))alert(`Monthly summary saved as "${v.fileName}".`);else throw b}}else{const v=f();alert(`Monthly summary downloaded as "${v}".`)}}catch(v){alert("Failed: "+String(v))}finally{S&&(S.disabled=!1,S.textContent="Generate monthly summary")}};document.querySelector("#generate-monthly-summary")?.addEventListener("click",async()=>{await o()});const u=document.querySelector("#sales-form");u?.addEventListener("submit",async S=>{S.preventDefault();const v=new FormData(S.currentTarget);await sn({id:Number(v.get("id")||0)||void 0,saleDate:String(v.get("saleDate")??""),cashAmount:Number(v.get("cashAmount")??0),gcashAmount:Number(v.get("gcashAmount")??0),notes:""}),await E()}),document.querySelectorAll(".edit-sale-btn").forEach(S=>{S.addEventListener("click",()=>{const v=n.find($=>$.id===Number(S.dataset.id));if(!v||!u)return;u.querySelector("[name=id]").value=String(v.id),u.querySelector("[name=saleDate]").value=v.saleDate,u.querySelector("[name=cashAmount]").value=String(v.cashAmount),u.querySelector("[name=gcashAmount]").value=String(v.gcashAmount);const b=u.querySelector('button[type="submit"]');b&&(b.textContent="Update daily sale"),u.scrollIntoView({behavior:"smooth",block:"start"})})}),document.querySelectorAll(".delete-sale-btn").forEach(S=>{S.addEventListener("click",async()=>{if(c.currentUser?.role!=="admin")return;const v=Number(S.dataset.id);!Number.isFinite(v)||!confirm("Delete this daily sale?")||(await rn(v),await E())})});const T=document.querySelector("[data-date-from]"),P=document.querySelector("[data-date-to]"),q=document.querySelector('[data-date-scope][value="custom"]');T&&q&&T.addEventListener("change",()=>q.checked=!0),P&&q&&P.addEventListener("change",()=>q.checked=!0),document.querySelectorAll("[data-date-scope]").forEach(S=>{S.addEventListener("change",()=>{if(!S.checked||!T||!P)return;const v=new Date,b=Q(v),$=new Date(v);S.value==="week"&&$.setDate(v.getDate()-6),S.value==="month"&&$.setDate(1),S.value!=="custom"&&(T.value=S.value==="today"?b:Q($),P.value=b)})});const U=S=>{const v=x=>String(x??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;"),b=x=>x==="Sales Report"?[110,125,150,215,95,95,105,105]:x==="Disbursement"?[115,115,90,150,150,220,105]:x==="Fold Count"?[220,125]:x==="Revolving Daily Summary"?[115,105,120,115]:x==="Revolving History"?[115,96,140,96,110,180,120]:[155,125,125,125,95,95,115,115];return`<?xml version="1.0"?>
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
  ${S.map(x=>{const D=b(x.name),k=Math.max(D.length,...x.rows.map(H=>H.length),1),B=Math.max(x.rows.length,1),ee=D.map(H=>`<Column ss:Width="${H}" ss:AutoFitWidth="0"/>`).join(""),te=x.rows.map(H=>{if(!H.length)return'<Row ss:Height="10" ss:StyleID="BorderRow"><Cell ss:StyleID="BorderCell"><Data ss:Type="String">&nbsp;</Data></Cell></Row>';const Ae=H[0]==="Type"||H[0]==="Summary"||H[0]==="Sales Summary"||H[0]==="Disbursement Summary"||H[0]==="Disbursement by Category"||H[0]==="Category"||H[0]==="Staff"||H[0]==="Date of Sales"||H[0]==="Date"||H[0]==="Date/Month"||H[0]==="Ticket",dt=Ae?"HeaderRow":"BorderRow",ut=Ae?"HeaderCell":"BorderCell",mt=Ae?26:22,g=H.map(I=>`<Cell ss:StyleID="${ut}"><Data ss:Type="${typeof I=="number"?"Number":"String"}">${v(I)}</Data></Cell>`).join("");return`<Row ss:Height="${mt}" ss:StyleID="${dt}">${g}</Row>`}).join("");return`
        <Worksheet ss:Name="${v(x.name)}">
          <Table ss:ExpandedColumnCount="${k}" ss:ExpandedRowCount="${B}">
            ${ee}
            ${te}
          </Table>
        </Worksheet>`}).join("")}
</Workbook>`},h=()=>{const S=We(),v=ot(e,t,n,a,s,r,i,S,d),b=[];if(v.selectedTypes.has("sales")){const D=v.salesRows(),k=[["Ticket","Customer","Cash","GCash","Total Payment"],...D.transactions.map(B=>[B.ticket,B.customer,B.cash,B.gcash,B.total]),[],["Cash from Orders","GCash from Orders","Sales from Orders"],[D.orderCashTotal,D.orderGcashTotal,D.orderCashTotal+D.orderGcashTotal],[],["Cash Whole Sale","GCash Whole Sale","Whole Sale of Day"],[D.manualCashTotal,D.manualGcashTotal,D.manualCashTotal+D.manualGcashTotal],[],["Total Cash","Total GCash","Total Sales"],[D.totalCash,D.totalGcash,D.totalSales]];b.push({name:"Sales Report",rows:k})}if(v.selectedTypes.has("disbursement")){const D=v.disbursementRows(),k=[...D.rows,[],["Disbursement by Category"],["Category","Amount"],...D.categoryTotals.map(B=>[B.category,B.amount])];b.push({name:"Disbursement",rows:k})}v.selectedTypes.has("fold_count")&&b.push({name:"Fold Count",rows:v.foldCountRows().rows}),v.selectedTypes.has("revolving_fund")&&(b.push({name:"Revolving Daily Summary",rows:v.revolvingDailySummaryRows().rows}),b.push({name:"Revolving History",rows:v.revolvingHistoryRows().rows})),v.selectedTypes.has("summary")&&b.push({name:"Summary",rows:v.summaryRows()});const $=U(b.length?b:[{name:"Summary",rows:v.summaryRows()}]);return{fileName:`laba101-report-${S.from}-to-${S.to}.xls`,content:$}},N=async()=>{const{fileName:S,content:v}=h();if(!R.isNativePlatform())return{fileName:S,uri:""};const b=S;await Re.writeFile({path:b,data:v,directory:ge.Cache,encoding:Ke.UTF8,recursive:!0});const{uri:$}=await Re.getUri({path:b,directory:ge.Cache});return{fileName:S,uri:$}},L=()=>{const{fileName:S,content:v}=h(),b=new Blob([v],{type:"application/vnd.ms-excel;charset=utf-8;"}),$=URL.createObjectURL(b),x=document.createElement("a");return x.href=$,x.download=S,document.body.appendChild(x),x.click(),setTimeout(()=>{x.remove(),URL.revokeObjectURL($)},1e3),S},F=async S=>{const v=document.querySelector(S==="export"?"#export-report":"#email-report");v&&(v.disabled=!0,v.textContent=S==="export"?"Exporting...":"Sending...");try{if(S==="export")if(R.isNativePlatform()){const b=await N();alert(`Report exported as "${b.fileName}".`)}else{const b=L();alert(`Report saved: ${b}`)}else{const b=await Qe("report_email")||"";if(!b){alert("Please configure a report email in Settings first.");return}const $=We(),x=`Laba101 report ${$.from} to ${$.to}`;if(R.isNativePlatform()){const D=await N();try{await bt.share({title:x,text:`Please find the attached Laba101 report file: ${D.fileName}`,files:[D.uri],dialogTitle:"Send report via email"}),alert(`Report saved and shared as "${D.fileName}".`)}catch(k){const B=String(k).toLowerCase();if(B.includes("share canceled")||B.includes("canceled"))alert(`Report saved as "${D.fileName}".`);else throw k}}else{const D=L(),k=`Hi,

Please find the attached Laba101 report file: ${D}

Date range: ${$.from} to ${$.to}`,B=`mailto:${b}?subject=${encodeURIComponent(x)}&body=${encodeURIComponent(k)}`;setTimeout(()=>{window.location.href=B},800),alert(`Report downloaded as "${D}".
Your email app will open — please attach the file and send.`)}}}catch(b){alert("Failed: "+String(b))}finally{v&&(v.disabled=!1,v.textContent=S==="export"?"Export Excel":"Send to Email")}};document.querySelector("#export-report")?.addEventListener("click",async()=>{await F("export")}),document.querySelector("#email-report")?.addEventListener("click",async()=>{await F("email")})}function ms(){document.querySelector("#order-queue-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);c.orderSearch=String(t.get("orderSearch")??"").trim(),c.orderDateFilter=String(t.get("orderDateFilter")??"").trim(),c.orderPaymentFilter=String(t.get("orderPaymentFilter")??"").trim(),E()}),document.querySelector("#order-queue-clear")?.addEventListener("click",()=>{c.orderSearch="",c.orderDateFilter="",c.orderPaymentFilter="",E()}),document.querySelector("#archived-order-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);c.archivedOrderSearch=String(t.get("archivedOrderSearch")??"").trim(),E()}),document.querySelector("#archived-order-clear")?.addEventListener("click",()=>{c.archivedOrderSearch="",E()})}function ps(){document.querySelector("#customer-search-form")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);c.customerSearch=String(t.get("customerSearch")??"").trim(),E()}),document.querySelector("#customer-search-clear")?.addEventListener("click",()=>{c.customerSearch="",E()})}function ys(){document.querySelector("#machine-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await un({machineName:String(t.get("machineName")??""),machineType:String(t.get("machineType")),status:String(t.get("status")),branch:String(t.get("branch")??"")}),await E()}),document.querySelector("#subcleaning-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=e.currentTarget.querySelector('button[type="submit"]');t&&(t.disabled=!0,t.textContent="Starting...");const n=new FormData(e.currentTarget),a=n.getAll("machineIds").map(Number);if(!a.length){alert("Please select at least one machine to clean."),t&&(t.disabled=!1,t.textContent="Start Cleaning");return}await Kt({date:String(n.get("date")??""),machineIds:a,cleaningStatus:String(n.get("cleaningStatus")??""),cleaningType:"tube",notes:String(n.get("notes")??""),branch:String(n.get("branch")??"")}),await X("Start tube cleaning",`${a.length} machine(s)`),await E()}),document.querySelector("#confirm-general-cleaning")?.addEventListener("click",async()=>{await fn(document.querySelector('input[name="branch"]')?.value||c.currentUser?.branch||"Main Store",c.currentUser?.name??"Unknown"),await X("Confirm general cleaning",W()),await E()}),document.querySelectorAll(".complete-cleaning-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.machineId),n=e.dataset.branch??"";e.disabled=!0,e.textContent="Completing...",await yn(t,n),await X("Complete tube cleaning",`Machine ID ${t}`),await E()})}),document.querySelectorAll(".deactivate-machine-btn, .activate-machine-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.id),n=e.classList.contains("deactivate-machine-btn");await mn(t,n?"inactive":"available"),await E()})})}function fs(e,t){const n=document.querySelector("#inventory-form");n?.addEventListener("submit",async a=>{a.preventDefault();const s=new FormData(a.currentTarget),r=Number(s.get("id")||0);await cn({id:r||void 0,name:String(s.get("name")??""),unit:String(s.get("unit")??""),quantity:Number(s.get("quantity")??0),reorderLevel:Number(s.get("reorderLevel")??0),notes:String(s.get("notes")??""),branch:t}),await X(r?"Update inventory item":"Create inventory item",String(s.get("name")??"")),await E()}),document.querySelectorAll(".edit-inventory-btn").forEach(a=>{a.addEventListener("click",()=>{const s=e.find(r=>r.id===Number(a.dataset.id));!s||!n||(n.querySelector("[name=id]").value=String(s.id),n.querySelector("[name=name]").value=s.name,n.querySelector("[name=unit]").value=s.unit,n.querySelector("[name=quantity]").value=String(s.quantity),n.querySelector("[name=reorderLevel]").value=String(s.reorderLevel),n.querySelector("[name=notes]").value=s.notes??"",n.scrollIntoView({behavior:"smooth",block:"start"}))})}),document.querySelector("#inventory-movement-form")?.addEventListener("submit",async a=>{a.preventDefault();const s=new FormData(a.currentTarget),r=String(s.get("movementType")??"in")==="out"?"out":"in";try{await dn({itemId:Number(s.get("itemId")??0),movementType:r,quantity:Number(s.get("quantity")??0),notes:String(s.get("notes")??""),staffName:c.currentUser?.name??"Unknown",branch:t}),await X(r==="in"?"Stock-in":"Stock-out",`Item ID ${s.get("itemId")} qty ${s.get("quantity")}`),await E()}catch(i){alert(i instanceof Error?i.message:"Stock movement failed.")}})}function hs(e){const t=document.querySelector("#add-staff-modal"),n=document.querySelector("#open-add-staff-modal"),a=document.querySelector("#close-add-staff-modal"),s=document.querySelector("#staff-form"),r=()=>{s?.reset(),s&&(s.querySelector("[name=id]").value="");const d=document.querySelector("#add-staff-title");d&&(d.textContent="Add staff member"),t?.removeAttribute("hidden")},i=()=>{t?.setAttribute("hidden",""),s?.reset()};n?.addEventListener("click",r),a?.addEventListener("click",i),t?.addEventListener("click",d=>{d.target===t&&i()}),document.querySelectorAll(".edit-staff-btn").forEach(d=>{d.addEventListener("click",()=>{const p=Number(d.dataset.id),m=e.find(l=>l.id===p);if(m&&s){s.querySelector("[name=id]").value=String(m.id),s.querySelector("[name=name]").value=m.name,s.querySelector("[name=email]").value=m.email,s.querySelector("[name=password]").value=m.password,s.querySelector("[name=role]").value=m.role,s.querySelector("[name=branch]").value=m.branch;const l=document.querySelector("#add-staff-title");l&&(l.textContent="Edit staff member"),t?.removeAttribute("hidden")}})}),document.querySelectorAll(".deactivate-staff-btn, .activate-staff-btn").forEach(d=>{d.addEventListener("click",async()=>{const p=Number(d.dataset.id),m=e.find(l=>l.id===p);m&&(await Tt(p,{isActive:m.isActive!==0?0:1}),await E())})}),s?.addEventListener("submit",async d=>{d.preventDefault();const p=document.querySelector("#staff-save-btn");p&&(p.disabled=!0,p.textContent="Saving...");const m=new FormData(s),l=m.get("id")?Number(m.get("id")):void 0,f=String(m.get("name")??"").trim(),o=String(m.get("email")??"").trim(),u=String(m.get("password")??"password")||"password",T=String(m.get("role")),P=String(m.get("branch")??"");if(!f||!o){alert("Name and email are required."),p&&(p.disabled=!1,p.textContent="Save staff member");return}try{l?await Tt(l,{name:f,email:o,password:u,role:T,branch:P}):await Ma({name:f,email:o,password:u,role:T,branch:P}),i(),await E()}catch{alert("Failed to save staff. The email may already be in use."),p&&(p.disabled=!1,p.textContent="Save staff member")}})}function vs(){document.querySelector("#settings-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await $e("branch",String(t.get("branch")??"Main Store")),await $e("fold_rate",String(t.get("foldRate")??"5")),String(t.get("reportEmail")??"")&&await $e("report_email",String(t.get("reportEmail"))),alert("Settings saved successfully!")})}function gs(){document.querySelector("#machine-config-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget),n=Number(t.get("machineId")),a=String(t.get("ipAddress")),s=Number(t.get("port"));if(!n||!a||!s){alert("Please fill in all fields");return}nt.set(n,{machineId:n,ipAddress:a,port:s}),await $e(`machine_${n}_config`,JSON.stringify({machineId:n,ipAddress:a,port:s})),alert("Machine configuration saved successfully!"),E()}),document.querySelectorAll(".start-machine-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.machineId),n=e.dataset.machineType,a=document.querySelector(`.timer-input[data-machine-id="${t}"]`),s=Number(a?.value)||30;if(s<1||s>120){alert("Please enter a valid time between 1 and 120 minutes");return}await vn(t,s,n)})}),document.querySelectorAll(".pause-machine-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.machineId);await gn(t)})}),document.querySelectorAll(".resume-machine-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.machineId);await bn(t)})}),document.querySelectorAll(".stop-machine-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.machineId);confirm("Are you sure you want to stop this machine?")&&await Sn(t)})}),document.querySelectorAll(".reset-machine-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.machineId);await En(t)})})}async function bs(){await Ia();const e=localStorage.getItem(Ce);if(e)try{const n=JSON.parse(e);if(n.email&&n.remembered){const a=await kt(n.email,"password")??null;c.currentUser=a}}catch{localStorage.removeItem(Ce)}const t=await ct();for(const n of t.machines){const a=await Qe(`machine_${n.id}_config`);if(a)try{const s=JSON.parse(a);nt.set(n.id,s)}catch{console.error(`Failed to parse config for machine ${n.id}`)}}await E()}function Ss(e,t,n,a){const s=e.filter(u=>u.status==="revolving").reduce((u,T)=>u+T.cashAmount,0),r=t.filter(u=>u.type==="add").reduce((u,T)=>u+T.amount,0),i=t.filter(u=>u.type==="disbursement").reduce((u,T)=>u+T.amount,0),d=s+r-i,p=c.revolvingHistoryFrom||"0000-01-01",m=c.revolvingHistoryTo||"9999-12-31",l=t.filter(u=>{const T=Y(u.createdAt);return T>=p&&T<=m}),f=e.map(u=>{const T=Yt(u.saleDate,n,a,u.cashAmount),P=u.status==="revolving"?'<span class="ok">Revolving</span>':u.status==="endorsed"?`<span class="warn">Endorsed to ${y(u.endorsedTo)}</span>`:'<span class="meta">Pending</span>',q=u.status!=="revolving"&&u.status!=="endorsed"?`<div class="row-actions">
          <button class="primary revolving-btn" data-id="${u.id}">Revolving</button>
          <button class="secondary endorsed-btn" data-id="${u.id}" data-date="${be(u.saleDate)}">Endorsed</button>
        </div>`:"";return[`<strong>${y(be(u.saleDate))}</strong>`,`<strong class="ok">${w(T)}</strong>`,P,u.statusUpdatedAt?y(be(u.statusUpdatedAt)):"-",q]}),o=l.map(u=>[ke(u.createdAt),`<strong>${y(u.revolvingNumber)}</strong>`,y(u.name),`<strong class="${u.type==="disbursement"?"warn":"ok"}">${u.type==="disbursement"?"-":"+"}${w(u.amount)}</strong>`,y(u.category),y(u.description||"-"),`<span class="${u.type==="add"?"ok":"warn"}">${u.type==="add"?"Add Revolving Fund":"Disbursement"}</span>`]);return`
    <section class="grid content full">
      <div class="panel-header" style="display: flex; gap: 16px; margin-bottom: 24px; align-items: center;">
        <button class="primary" id="add-revolving-fund-btn">Add Revolving Fund</button>
        <button class="secondary" id="revolving-disbursement-btn">Disbursement</button>
      </div>

      <article class="panel">
        <div style="background-color: #061a42; color: white; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
          <p style="font-size: 12px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin: 0 0 8px 0;">Revolving Fund Total</p>
          <p style="font-size: 32px; font-weight: 800; margin: 0;">${w(d)}</p>
        </div>
        ${M("Daily Summary","Cash on hand per day (order cash + manual cash − disbursements)")}
        ${re(["Date of Sales","Cash on Hand","Status","Date Update","Action"],f,"data-table orders-data-table bordered-table")}
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
        ${re(["Date","Disbursement #","Name","Amount","Category","Description","Type"],o,"data-table orders-data-table bordered-table")}
      </article>

      ${c.endorseModalOpen?`
        <div class="modal-backdrop" role="presentation">
          <div class="receipt-modal" role="dialog" aria-modal="true" style="max-width: 400px; width: 90%;">
            <form id="endorse-form" class="form" style="padding: 24px;">
              <h3 style="margin-top: 0;">Endorse Money</h3>
              <p class="meta" style="margin-bottom: 16px;">Endorsing cash from <strong>${y(c.endorseSaleDate)}</strong>.</p>
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
  `}function Es(){document.querySelector("#revolving-history-filters")?.addEventListener("submit",async l=>{l.preventDefault();const f=new FormData(l.currentTarget);c.revolvingHistoryFrom=String(f.get("revolvingHistoryFrom")??"").trim(),c.revolvingHistoryTo=String(f.get("revolvingHistoryTo")??"").trim(),await E()}),document.querySelector("#revolving-history-clear")?.addEventListener("click",async()=>{c.revolvingHistoryFrom="",c.revolvingHistoryTo="",await E()}),document.querySelectorAll(".revolving-btn").forEach(l=>{l.addEventListener("click",async()=>{c.revolvingModalOpen=!0,c.revolvingSaleId=Number(l.dataset.id),await E()})});const e=document.getElementById("confirm-revolving-btn");e&&e.addEventListener("click",async()=>{await Lt(c.revolvingSaleId,"revolving",null,new Date().toISOString()),c.revolvingModalOpen=!1,await E()});const t=document.getElementById("close-revolving-modal");t&&t.addEventListener("click",async()=>{c.revolvingModalOpen=!1,await E()}),document.querySelectorAll(".endorsed-btn").forEach(l=>{l.addEventListener("click",async()=>{c.endorseModalOpen=!0,c.endorseSaleId=Number(l.dataset.id),c.endorseSaleDate=l.dataset.date??"",await E()})});const n=document.getElementById("close-endorse-modal");n&&n.addEventListener("click",async()=>{c.endorseModalOpen=!1,await E()});const a=document.getElementById("endorse-form");a&&a.addEventListener("submit",async l=>{l.preventDefault();const f=new FormData(a),o=String(f.get("endorsedTo")??"").trim();o&&(await Lt(c.endorseSaleId,"endorsed",o,new Date().toISOString()),c.endorseModalOpen=!1,await E())});const s=document.getElementById("add-revolving-fund-btn");s&&s.addEventListener("click",async()=>{c.addFundModalOpen=!0,await E()});const r=document.getElementById("close-add-fund-modal");r&&r.addEventListener("click",async()=>{c.addFundModalOpen=!1,await E()});const i=document.getElementById("add-fund-form");i&&i.addEventListener("submit",async l=>{l.preventDefault();const f=new FormData(i);await $t({name:String(f.get("name")??"").trim(),amount:Number(f.get("amount")??0),category:"Add Revolving Fund",description:null,type:"add",createdAt:new Date().toISOString()}),c.addFundModalOpen=!1,await E()});const d=document.getElementById("revolving-disbursement-btn");d&&d.addEventListener("click",async()=>{c.disbursementModalOpen=!0,await E()});const p=document.getElementById("close-disbursement-modal");p&&p.addEventListener("click",async()=>{c.disbursementModalOpen=!1,await E()});const m=document.getElementById("disbursement-form");m&&m.addEventListener("submit",async l=>{l.preventDefault();const f=new FormData(m);await $t({name:String(f.get("name")??"").trim(),amount:Number(f.get("amount")??0),category:String(f.get("category")??"").trim(),description:String(f.get("description")??"").trim(),type:"disbursement",expenseDate:W(),createdAt:new Date().toISOString()}),c.disbursementModalOpen=!1,await E()})}bs();export{Ke as E,Ve as W,ma as b};
