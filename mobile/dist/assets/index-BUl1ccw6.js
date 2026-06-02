(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();var ae;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(ae||(ae={}));class Ne extends Error{constructor(t,a,r){super(t),this.message=t,this.code=a,this.data=r}}const Nt=e=>{var t,a;return e?.androidBridge?"android":!((a=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},At=e=>{const t=e.CapacitorCustomPlatform||null,a=e.Capacitor||{},r=a.Plugins=a.Plugins||{},n=()=>t!==null?t.name:Nt(e),s=()=>n()!=="web",i=u=>{const f=d.get(u);return!!(f?.platforms.has(n())||c(u))},c=u=>{var f;return(f=a.PluginHeaders)===null||f===void 0?void 0:f.find(m=>m.name===u)},l=u=>e.console.error(u),d=new Map,p=(u,f={})=>{const m=d.get(u);if(m)return console.warn(`Capacitor plugin "${u}" already registered. Cannot register plugins twice.`),m.proxy;const g=n(),y=c(u);let b;const w=async()=>(!b&&g in f?b=typeof f[g]=="function"?b=await f[g]():b=f[g]:t!==null&&!b&&"web"in f&&(b=typeof f.web=="function"?b=await f.web():b=f.web),b),T=(D,I)=>{var U,H;if(y){const h=y?.methods.find(O=>I===O.name);if(h)return h.rtype==="promise"?O=>a.nativePromise(u,I.toString(),O):(O,ee)=>a.nativeCallback(u,I.toString(),O,ee);if(D)return(U=D[I])===null||U===void 0?void 0:U.bind(D)}else{if(D)return(H=D[I])===null||H===void 0?void 0:H.bind(D);throw new Ne(`"${u}" plugin is not implemented on ${g}`,ae.Unimplemented)}},A=D=>{let I;const U=(...H)=>{const h=w().then(O=>{const ee=T(O,D);if(ee){const ve=ee(...H);return I=ve?.remove,ve}else throw new Ne(`"${u}.${D}()" is not implemented on ${g}`,ae.Unimplemented)});return D==="addListener"&&(h.remove=async()=>I()),h};return U.toString=()=>`${D.toString()}() { [capacitor code] }`,Object.defineProperty(U,"name",{value:D,writable:!1,configurable:!1}),U},x=A("addListener"),M=A("removeListener"),q=(D,I)=>{const U=x({eventName:D},I),H=async()=>{const O=await U;M({eventName:D,callbackId:O},I)},h=new Promise(O=>U.then(()=>O({remove:H})));return h.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await H()},h},z=new Proxy({},{get(D,I){switch(I){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return y?q:x;case"removeListener":return M;default:return A(I)}}});return r[u]=z,d.set(u,{name:u,proxy:z,platforms:new Set([...Object.keys(f),...y?[g]:[]])}),z};return a.convertFileSrc||(a.convertFileSrc=u=>u),a.getPlatform=n,a.handleError=l,a.isNativePlatform=s,a.isPluginAvailable=i,a.registerPlugin=p,a.Exception=Ne,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},Lt=e=>e.Capacitor=At(e),L=Lt(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),Z=L.registerPlugin;class Re{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,a){let r=!1;this.listeners[t]||(this.listeners[t]=[],r=!0),this.listeners[t].push(a);const s=this.windowListeners[t];s&&!s.registered&&this.addWindowListener(s),r&&this.sendRetainedArgumentsForEvent(t);const i=async()=>this.removeListener(t,a);return Promise.resolve({remove:i})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,a,r){const n=this.listeners[t];if(!n){if(r){let s=this.retainedEventArguments[t];s||(s=[]),s.push(a),this.retainedEventArguments[t]=s}return}n.forEach(s=>s(a))}hasListeners(t){var a;return!!(!((a=this.listeners[t])===null||a===void 0)&&a.length)}registerWindowListener(t,a){this.windowListeners[a]={registered:!1,windowEventName:t,pluginEventName:a,handler:r=>{this.notifyListeners(a,r)}}}unimplemented(t="not implemented"){return new L.Exception(t,ae.Unimplemented)}unavailable(t="not available"){return new L.Exception(t,ae.Unavailable)}async removeListener(t,a){const r=this.listeners[t];if(!r)return;const n=r.indexOf(a);this.listeners[t].splice(n,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const a=this.retainedEventArguments[t];a&&(delete this.retainedEventArguments[t],a.forEach(r=>{this.notifyListeners(t,r)}))}}const ke=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Ue=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class Ct extends Re{async getCookies(){const t=document.cookie,a={};return t.split(";").forEach(r=>{if(r.length<=0)return;let[n,s]=r.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");n=Ue(n).trim(),s=Ue(s).trim(),a[n]=s}),a}async setCookie(t){try{const a=ke(t.key),r=ke(t.value),n=t.expires?`; expires=${t.expires.replace("expires=","")}`:"",s=(t.path||"/").replace("path=",""),i=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${a}=${r||""}${n}; path=${s}; ${i};`}catch(a){return Promise.reject(a)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const a of t)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}Z("CapacitorCookies",{web:()=>new Ct});const $t=async e=>new Promise((t,a)=>{const r=new FileReader;r.onload=()=>{const n=r.result;t(n.indexOf(",")>=0?n.split(",")[1]:n)},r.onerror=n=>a(n),r.readAsDataURL(e)}),Rt=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(n=>n.toLocaleLowerCase()).reduce((n,s,i)=>(n[s]=e[t[i]],n),{})},Ot=(e,t=!0)=>e?Object.entries(e).reduce((r,n)=>{const[s,i]=n;let c,l;return Array.isArray(i)?(l="",i.forEach(d=>{c=t?encodeURIComponent(d):d,l+=`${s}=${c}&`}),l.slice(0,-1)):(c=t?encodeURIComponent(i):i,l=`${s}=${c}`),`${r}&${l}`},"").substr(1):null,Pt=(e,t={})=>{const a=Object.assign({method:e.method||"GET",headers:e.headers},t),n=Rt(e.headers)["content-type"]||"";if(typeof e.data=="string")a.body=e.data;else if(n.includes("application/x-www-form-urlencoded")){const s=new URLSearchParams;for(const[i,c]of Object.entries(e.data||{}))s.set(i,c);a.body=s.toString()}else if(n.includes("multipart/form-data")||e.data instanceof FormData){const s=new FormData;if(e.data instanceof FormData)e.data.forEach((c,l)=>{s.append(l,c)});else for(const c of Object.keys(e.data))s.append(c,e.data[c]);a.body=s;const i=new Headers(a.headers);i.delete("content-type"),a.headers=i}else(n.includes("application/json")||typeof e.data=="object")&&(a.body=JSON.stringify(e.data));return a};class Dt extends Re{async request(t){const a=Pt(t,t.webFetchExtra),r=Ot(t.params,t.shouldEncodeUrlParams),n=r?`${t.url}?${r}`:t.url,s=await fetch(n,a),i=s.headers.get("content-type")||"";let{responseType:c="text"}=s.ok?t:{};i.includes("application/json")&&(c="json");let l,d;switch(c){case"arraybuffer":case"blob":d=await s.blob(),l=await $t(d);break;case"json":l=await s.json();break;default:l=await s.text()}const p={};return s.headers.forEach((u,f)=>{p[f]=u}),{data:l,headers:p,status:s.status,url:s.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}Z("CapacitorHttp",{web:()=>new Dt});var Me;(function(e){e.Dark="DARK",e.Light="LIGHT",e.Default="DEFAULT"})(Me||(Me={}));var _e;(function(e){e.StatusBar="StatusBar",e.NavigationBar="NavigationBar"})(_e||(_e={}));class xt extends Re{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}Z("SystemBars",{web:()=>new xt});const It="modulepreload",qt=function(e){return"/"+e},Be={},Oe=function(t,a,r){let n=Promise.resolve();if(a&&a.length>0){let l=function(d){return Promise.all(d.map(p=>Promise.resolve(p).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),c=i?.nonce||i?.getAttribute("nonce");n=l(a.map(d=>{if(d=qt(d),d in Be)return;Be[d]=!0;const p=d.endsWith(".css"),u=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${u}`))return;const f=document.createElement("link");if(f.rel=p?"stylesheet":It,p||(f.as="script"),f.crossOrigin="",f.href=d,c&&f.setAttribute("nonce",c),document.head.appendChild(f),p)return new Promise((m,g)=>{f.addEventListener("load",m),f.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${d}`)))})}))}function s(i){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=i,window.dispatchEvent(c),!c.defaultPrevented)throw i}return n.then(i=>{for(const c of i||[])c.status==="rejected"&&s(c.reason);return t().catch(s)})};function Ft(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,a){return new Proxy({},{get(r,n){return(s,i,c)=>{const l=e.Capacitor.Plugins[a];if(l===void 0){c(new Error(`Capacitor plugin ${a} not found`));return}if(typeof l[n]!="function"){c(new Error(`Method ${n} not found in Capacitor plugin ${a}`));return}(async()=>{try{const d=await l[n](s);i(d)}catch(d){c(d)}})()}}})}})}function kt(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,a){return e.cordova.plugins[a]}})}function Ut(e=!1){typeof window>"u"||(window.CapacitorUtils=window.CapacitorUtils||{},window.Capacitor!==void 0&&!e?Ft(window):window.cordova!==void 0&&kt(window))}var be;(function(e){e.Documents="DOCUMENTS",e.Data="DATA",e.Library="LIBRARY",e.Cache="CACHE",e.External="EXTERNAL",e.ExternalStorage="EXTERNAL_STORAGE",e.ExternalCache="EXTERNAL_CACHE",e.LibraryNoCloud="LIBRARY_NO_CLOUD",e.Temporary="TEMPORARY"})(be||(be={}));var Ce;(function(e){e.UTF8="utf8",e.ASCII="ascii",e.UTF16="utf16"})(Ce||(Ce={}));const je=Z("Filesystem",{web:()=>Oe(()=>import("./web-3-ET4W8E.js"),[]).then(e=>new e.FilesystemWeb)});Ut();const Mt=Z("Share",{web:()=>Oe(()=>import("./web-BzqCRw2Q.js"),[]).then(e=>new e.ShareWeb)});class _t{constructor(t){this.sqlite=t,this._connectionDict=new Map}async initWebStore(){try{return await this.sqlite.initWebStore(),Promise.resolve()}catch(t){return Promise.reject(t)}}async saveToStore(t){try{return await this.sqlite.saveToStore({database:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async saveToLocalDisk(t){try{return await this.sqlite.saveToLocalDisk({database:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getFromLocalDiskToStore(t){const a=t??!0;try{return await this.sqlite.getFromLocalDiskToStore({overwrite:a}),Promise.resolve()}catch(r){return Promise.reject(r)}}async echo(t){try{const a=await this.sqlite.echo({value:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isSecretStored(){try{const t=await this.sqlite.isSecretStored();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async setEncryptionSecret(t){try{return await this.sqlite.setEncryptionSecret({passphrase:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async changeEncryptionSecret(t,a){try{return await this.sqlite.changeEncryptionSecret({passphrase:t,oldpassphrase:a}),Promise.resolve()}catch(r){return Promise.reject(r)}}async clearEncryptionSecret(){try{return await this.sqlite.clearEncryptionSecret(),Promise.resolve()}catch(t){return Promise.reject(t)}}async checkEncryptionSecret(t){try{const a=await this.sqlite.checkEncryptionSecret({passphrase:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async addUpgradeStatement(t,a){try{return t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.addUpgradeStatement({database:t,upgrade:a}),Promise.resolve()}catch(r){return Promise.reject(r)}}async createConnection(t,a,r,n,s){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.createConnection({database:t,encrypted:a,mode:r,version:n,readonly:s});const i=new He(t,s,this.sqlite),c=s?`RO_${t}`:`RW_${t}`;return this._connectionDict.set(c,i),Promise.resolve(i)}catch(i){return Promise.reject(i)}}async closeConnection(t,a){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.closeConnection({database:t,readonly:a});const r=a?`RO_${t}`:`RW_${t}`;return this._connectionDict.delete(r),Promise.resolve()}catch(r){return Promise.reject(r)}}async isConnection(t,a){const r={};t.endsWith(".db")&&(t=t.slice(0,-3));const n=a?`RO_${t}`:`RW_${t}`;return r.result=this._connectionDict.has(n),Promise.resolve(r)}async retrieveConnection(t,a){t.endsWith(".db")&&(t=t.slice(0,-3));const r=a?`RO_${t}`:`RW_${t}`;if(this._connectionDict.has(r)){const n=this._connectionDict.get(r);return typeof n<"u"?Promise.resolve(n):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async getNCDatabasePath(t,a){try{const r=await this.sqlite.getNCDatabasePath({path:t,database:a});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async createNCConnection(t,a){try{await this.sqlite.createNCConnection({databasePath:t,version:a});const r=new He(t,!0,this.sqlite),n=`RO_${t})`;return this._connectionDict.set(n,r),Promise.resolve(r)}catch(r){return Promise.reject(r)}}async closeNCConnection(t){try{await this.sqlite.closeNCConnection({databasePath:t});const a=`RO_${t})`;return this._connectionDict.delete(a),Promise.resolve()}catch(a){return Promise.reject(a)}}async isNCConnection(t){const a={},r=`RO_${t})`;return a.result=this._connectionDict.has(r),Promise.resolve(a)}async retrieveNCConnection(t){if(this._connectionDict.has(t)){const a=`RO_${t})`,r=this._connectionDict.get(a);return typeof r<"u"?Promise.resolve(r):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async isNCDatabase(t){try{const a=await this.sqlite.isNCDatabase({databasePath:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async retrieveAllConnections(){return this._connectionDict}async closeAllConnections(){const t=new Map;try{for(const a of this._connectionDict.keys()){const r=a.substring(3),n=a.substring(0,3)==="RO_";await this.sqlite.closeConnection({database:r,readonly:n}),t.set(a,null)}for(const a of t.keys())this._connectionDict.delete(a);return Promise.resolve()}catch(a){return Promise.reject(a)}}async checkConnectionsConsistency(){try{const t=[...this._connectionDict.keys()],a=[],r=[];for(const s of t)a.push(s.substring(0,2)),r.push(s.substring(3));const n=await this.sqlite.checkConnectionsConsistency({dbNames:r,openModes:a});return n.result||(this._connectionDict=new Map),Promise.resolve(n)}catch(t){return this._connectionDict=new Map,Promise.reject(t)}}async importFromJson(t){try{const a=await this.sqlite.importFromJson({jsonstring:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isJsonValid(t){try{const a=await this.sqlite.isJsonValid({jsonstring:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async copyFromAssets(t){const a=t??!0;try{return await this.sqlite.copyFromAssets({overwrite:a}),Promise.resolve()}catch(r){return Promise.reject(r)}}async getFromHTTPRequest(t,a){const r=a??!0;try{return await this.sqlite.getFromHTTPRequest({url:t,overwrite:r}),Promise.resolve()}catch(n){return Promise.reject(n)}}async isDatabaseEncrypted(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const a=await this.sqlite.isDatabaseEncrypted({database:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isInConfigEncryption(){try{const t=await this.sqlite.isInConfigEncryption();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isInConfigBiometricAuth(){try{const t=await this.sqlite.isInConfigBiometricAuth();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isDatabase(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const a=await this.sqlite.isDatabase({database:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async getDatabaseList(){try{const a=(await this.sqlite.getDatabaseList()).values;a.sort();const r={values:a};return Promise.resolve(r)}catch(t){return Promise.reject(t)}}async getMigratableDbList(t){const a=t||"default";try{const r=await this.sqlite.getMigratableDbList({folderPath:a});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async addSQLiteSuffix(t,a){const r=t||"default",n=a||[];try{const s=await this.sqlite.addSQLiteSuffix({folderPath:r,dbNameList:n});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async deleteOldDatabases(t,a){const r=t||"default",n=a||[];try{const s=await this.sqlite.deleteOldDatabases({folderPath:r,dbNameList:n});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async moveDatabasesAndAddSuffix(t,a){const r=t||"default",n=a||[];return this.sqlite.moveDatabasesAndAddSuffix({folderPath:r,dbNameList:n})}}class He{constructor(t,a,r){this.dbName=t,this.readonly=a,this.sqlite=r}getConnectionDBName(){return this.dbName}getConnectionReadOnly(){return this.readonly}async open(){try{return await this.sqlite.open({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async close(){try{return await this.sqlite.close({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async beginTransaction(){try{const t=await this.sqlite.beginTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async commitTransaction(){try{const t=await this.sqlite.commitTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async rollbackTransaction(){try{const t=await this.sqlite.rollbackTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTransactionActive(){try{const t=await this.sqlite.isTransactionActive({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async loadExtension(t){try{return await this.sqlite.loadExtension({database:this.dbName,path:t,readonly:this.readonly}),Promise.resolve()}catch(a){return Promise.reject(a)}}async enableLoadExtension(t){try{return await this.sqlite.enableLoadExtension({database:this.dbName,toggle:t,readonly:this.readonly}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getUrl(){try{const t=await this.sqlite.getUrl({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getVersion(){try{const t=await this.sqlite.getVersion({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getTableList(){try{const t=await this.sqlite.getTableList({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async execute(t,a=!0,r=!0){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const n=await this.sqlite.execute({database:this.dbName,statements:t,transaction:a,readonly:!1,isSQL92:r});return Promise.resolve(n)}}catch(n){return Promise.reject(n)}}async query(t,a,r=!0){let n;try{return a&&a.length>0?n=await this.sqlite.query({database:this.dbName,statement:t,values:a,readonly:this.readonly,isSQL92:!0}):n=await this.sqlite.query({database:this.dbName,statement:t,values:[],readonly:this.readonly,isSQL92:r}),n=await this.reorderRows(n),Promise.resolve(n)}catch(s){return Promise.reject(s)}}async run(t,a,r=!0,n="no",s=!0){let i;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(a&&a.length>0?i=await this.sqlite.run({database:this.dbName,statement:t,values:a,transaction:r,readonly:!1,returnMode:n,isSQL92:!0}):i=await this.sqlite.run({database:this.dbName,statement:t,values:[],transaction:r,readonly:!1,returnMode:n,isSQL92:s}),i.changes=await this.reorderRows(i.changes),Promise.resolve(i))}catch(c){return Promise.reject(c)}}async executeSet(t,a=!0,r="no",n=!0){let s;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(s=await this.sqlite.executeSet({database:this.dbName,set:t,transaction:a,readonly:!1,returnMode:r,isSQL92:n}),s.changes=await this.reorderRows(s.changes),Promise.resolve(s))}catch(i){return Promise.reject(i)}}async isExists(){try{const t=await this.sqlite.isDBExists({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTable(t){try{const a=await this.sqlite.isTableExists({database:this.dbName,table:t,readonly:this.readonly});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isDBOpen(){try{const t=await this.sqlite.isDBOpen({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async delete(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteDatabase({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async createSyncTable(){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const t=await this.sqlite.createSyncTable({database:this.dbName,readonly:!1});return Promise.resolve(t)}}catch(t){return Promise.reject(t)}}async setSyncDate(t){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.setSyncDate({database:this.dbName,syncdate:t,readonly:!1}),Promise.resolve())}catch(a){return Promise.reject(a)}}async getSyncDate(){try{const t=await this.sqlite.getSyncDate({database:this.dbName,readonly:this.readonly});let a="";return t.syncDate>0&&(a=new Date(t.syncDate*1e3).toISOString()),Promise.resolve(a)}catch(t){return Promise.reject(t)}}async exportToJson(t,a=!1){try{const r=await this.sqlite.exportToJson({database:this.dbName,jsonexportmode:t,readonly:this.readonly,encrypted:a});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async deleteExportedRows(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteExportedRows({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async executeTransaction(t,a=!0){let r=0,n=!1;if(this.readonly)return Promise.reject("not allowed in read-only mode");if(await this.sqlite.beginTransaction({database:this.dbName}),n=await this.sqlite.isTransactionActive({database:this.dbName}),!n)return Promise.reject("After Begin Transaction, no transaction active");try{for(const c of t){if(typeof c!="object"||!("statement"in c))throw new Error("Error a task.statement must be provided");if("values"in c&&c.values&&c.values.length>0){const l=c.statement.toUpperCase().includes("RETURNING")?"all":"no",d=await this.sqlite.run({database:this.dbName,statement:c.statement,values:c.values,transaction:!1,readonly:!1,returnMode:l,isSQL92:a});if(d.changes.changes<0)throw new Error("Error in transaction method run ");r+=d.changes.changes}else{const l=await this.sqlite.execute({database:this.dbName,statements:c.statement,transaction:!1,readonly:!1});if(l.changes.changes<0)throw new Error("Error in transaction method execute ");r+=l.changes.changes}}const s=await this.sqlite.commitTransaction({database:this.dbName});r+=s.changes.changes;const i={changes:{changes:r}};return Promise.resolve(i)}catch(s){const i=s.message?s.message:s;return await this.sqlite.rollbackTransaction({database:this.dbName}),Promise.reject(i)}}async reorderRows(t){const a=t;if(t?.values&&typeof t.values[0]=="object"&&Object.keys(t.values[0]).includes("ios_columns")){const r=t.values[0].ios_columns,n=[];for(let s=1;s<t.values.length;s++){const i=t.values[s],c={};for(const l of r)c[l]=i[l];n.push(c)}a.values=n}return Promise.resolve(a)}}const Bt=Z("CapacitorSQLite",{web:()=>Oe(()=>import("./web-mdVopGjS.js"),[]).then(e=>new e.CapacitorSQLiteWeb),electron:()=>window.CapacitorCustomPlatform.plugins.CapacitorSQLite});function jt(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}const Ht="laba101_offline",Ee="fresh_start_reset_v1",Wt=new _t(Bt);let pe=null;const j=[{id:1,name:"Laba101 Admin",email:"admin@laba101.test",password:"password",role:"admin",branch:"Main Store"},{id:2,name:"Gensan Branch Staff",email:"staff@laba101.gensan",password:"password",role:"staff",branch:"Gensan Branch"}],Se=[],X=[W(1,"Drop-off","P185. Includes wash, dry, and fold.","Drop-Off","order",185,8,40,["Wash","Dry","Fold"],0,24),W(2,"Full Service","P200. Wash, Fabcon, detergent, dry, and fold.","Full Service","order",200,8,40,["Wash","Dry","Fold","Detergent","Fabcon"],0,24),W(3,"Self Service Wash","P60. Self-service wash (max 8kg per load).","Self Service","order",60,8,null,["Wash"],0,1),W(4,"Self Service Dry","P70. Self-service dry (40 mins).","Self Service","order",70,8,40,["Dry"],0,1),W(6,"Dry 10 mins","Additional drying time (10 mins).","Add-on","addon",30,8,10,["Dry"],0,1),W(7,"Dry 20 mins","Additional drying time (20 mins).","Add-on","addon",50,8,20,["Dry"],0,1),W(8,"Dry 40 mins","Additional drying time (40 mins).","Add-on","addon",70,8,40,["Dry"],0,1),W(9,"Additional Zonrox","Extra Zonrox bleach add-on per load.","Add-on","addon",25,0,null,["Zonrox"],0,0),W(10,"Additional Fabcon","Extra Fabcon fabric conditioner add-on per load.","Add-on","addon",25,0,null,["Fabcon"],0,0)],Y=[{id:1,name:"Regular Clothes",maxKg:8,additionalFee:0,isActive:1},{id:2,name:"Comforter",maxKg:4,additionalFee:0,isActive:1},{id:3,name:"Thin Blankets",maxKg:6,additionalFee:0,isActive:1},{id:4,name:"Bedsheets",maxKg:6,additionalFee:0,isActive:1},{id:5,name:"Bath Towels",maxKg:6,additionalFee:0,isActive:1},{id:6,name:"Curtains",maxKg:6,additionalFee:0,isActive:1}];function We(e,t){const a=N(e,[]),r=new Map(a.map(s=>[s.id,s])),n=t.map(s=>{const i=r.get(s.id);return i?{...s,...i,isActive:i.isActive??s.isActive}:s});(a.length!==n.length||n.some((s,i)=>s.id!==a[i]?.id||JSON.stringify(s)!==JSON.stringify(a[i])))&&S(e,n)}async function Xt(){We("services",X),We("item_categories",Y)}async function Te(e){for(const t of X)((await e.query("SELECT id FROM laundry_services WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive,t.id]):await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive]);for(const t of Y)((await e.query("SELECT id FROM item_categories WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.maxKg,t.additionalFee,t.isActive,t.id]):await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[t.id,t.name,t.maxKg,t.additionalFee,t.isActive])}const Q=[],re=[],le=[],de=[],ne=[],K=[...[1,2,3,4].map(e=>({id:e,machineName:`Washer ${e}`,machineType:"washer",status:"available",branch:"Main Store"})),...[1,2,3,4].map(e=>({id:e+4,machineName:`Dryer ${e}`,machineType:"dryer",status:"available",branch:"Main Store"}))],se=[{key:"branch",value:"Main Store"},{key:"fold_rate",value:"5"},{key:"report_email",value:"admin@laba101.test"}];function W(e,t,a,r,n,s,i,c,l,d,p){return{id:e,name:t,description:a,category:r,serviceType:n,price:s,maxKg:i,dryingMinutes:c,includes:l,additionalCharge:d,turnaroundHours:p,isActive:1}}function F(e){return`laba101-mobile-${e}`}function N(e,t){const a=localStorage.getItem(F(e));if(!a)return structuredClone(t);try{return JSON.parse(a)}catch{return structuredClone(t)}}function S(e,t){localStorage.setItem(F(e),JSON.stringify(t))}function k(e){return e.reduce((t,a)=>Math.max(t,a.id),0)+1}function J(){return new Date().toISOString()}function $e(e=new Date){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${r}`}function Kt(){return $e().slice(2).replaceAll("-","")}function G(e,t){if(!e)return t;try{return JSON.parse(e)}catch{return t}}async function C(){return pe||(pe=await Wt.createConnection(Ht,!1,"no-encryption",1,!1),await pe.open()),pe}async function P(e,t,a,r){((await e.query(`PRAGMA table_info(${t})`)).values??[]).some(i=>i.name===a)||await e.execute(`ALTER TABLE ${t} ADD COLUMN ${a} ${r}`)}function Gt(){const e=N("staff",j),t=new Map(e.map(r=>[r.id,r]));let a=!1;for(const r of j){const n=t.get(r.id);if(!n){t.set(r.id,{...r,isActive:1}),a=!0;continue}const s={...n,name:r.name,email:r.email,password:r.password,role:r.role,branch:r.branch,isActive:1};JSON.stringify(s)!==JSON.stringify(n)&&(t.set(r.id,s),a=!0)}a&&S("staff",Array.from(t.values()).sort((r,n)=>r.id-n.id))}async function Vt(){localStorage.getItem(F(Ee))||(S("staff",j),S("customers",[]),S("orders",[]),S("payments",[]),S("fold_logs",[]),S("expenses",[]),S("sales",[]),localStorage.getItem(F("services"))||S("services",X),localStorage.getItem(F("item_categories"))||S("item_categories",Y),localStorage.getItem(F("machines"))||S("machines",K),localStorage.getItem(F("subcleanings"))||S("subcleanings",[]),localStorage.getItem(F("settings"))||S("settings",se),localStorage.removeItem("laba101-mobile-session"),S(Ee,!0))}async function rt(e){for(const t of j){if(((await e.query("SELECT id FROM staff WHERE id = ?",[t.id])).values??[]).length>0){await e.run("UPDATE staff SET name = ?, email = ?, password = ?, role = ?, branch = ?, isActive = 1 WHERE id = ?",[t.name,t.email,t.password,t.role,t.branch,t.id]);continue}await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.email,t.password,t.role,t.branch,1])}}async function Yt(e){if(!(((await e.query("SELECT COUNT(*) as count FROM machines")).values?.[0]?.count??0)>0))for(const a of K)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[a.id,a.machineName,a.machineType,a.status,a.branch])}async function Qt(e){for(const t of se)await e.run("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)",[t.key,t.value])}async function nt(e){for(const t of X)((await e.query("SELECT id FROM laundry_services WHERE id = ?",[t.id])).values??[]).length>0||await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive]);for(const t of Y)((await e.query("SELECT id FROM item_categories WHERE id = ?",[t.id])).values??[]).length>0||await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[t.id,t.name,t.maxKg,t.additionalFee,t.isActive])}async function Jt(e){((await e.query("SELECT value FROM settings WHERE key = ?",[Ee])).values??[]).length>0||(await e.execute(`
    DELETE FROM payments;
    DELETE FROM orders;
    DELETE FROM customers;
    DELETE FROM fold_logs;
    DELETE FROM disbursement_expenses;
    DELETE FROM daily_sales;
    DELETE FROM revolving_history;
    DELETE FROM staff WHERE id NOT IN (1, 2);
  `),await rt(e),await nt(e),await Yt(e),await Qt(e),await e.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",[Ee,J()]),localStorage.removeItem("laba101-mobile-session"))}async function zt(){if(!L.isNativePlatform()){await Vt(),!localStorage.getItem(F("seeded_v4"))&&!localStorage.getItem(F("services"))&&!localStorage.getItem(F("staff"))&&(S("staff",j),S("customers",Se),S("services",X),S("item_categories",Y),S("orders",Q),S("payments",re),S("fold_logs",[]),S("expenses",le),S("sales",de),S("revolving_history",ne),S("machines",K),S("subcleanings",[]),S("settings",se),S("seeded_v4",!0)),await Xt(),Gt(),localStorage.getItem(F("seeded_v4"))||S("seeded_v4",!0);return}const e=await C();await e.execute(`
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
  `),await P(e,"staff","email","TEXT"),await P(e,"staff","password","TEXT"),await P(e,"staff","role","TEXT"),await P(e,"staff","isActive","INTEGER NOT NULL DEFAULT 1"),await e.run('UPDATE staff SET password = ? WHERE password IS NULL OR password = ""',["password"]),await e.run('UPDATE staff SET role = ? WHERE role IS NULL OR role = ""',["staff"]),await P(e,"orders","customerId","INTEGER NOT NULL DEFAULT 0"),await P(e,"orders","phone","TEXT"),await P(e,"orders","serviceId","INTEGER NOT NULL DEFAULT 0"),await P(e,"orders","serviceLines","TEXT"),await P(e,"orders","itemCategoryId","INTEGER NOT NULL DEFAULT 0"),await P(e,"orders","itemCategory",'TEXT NOT NULL DEFAULT "Regular Clothes"'),await P(e,"orders","workflowCompleted","TEXT"),await P(e,"orders","weightKg","REAL NOT NULL DEFAULT 0"),await P(e,"orders","price","REAL NOT NULL DEFAULT 0"),await P(e,"orders","additionalCharge","REAL NOT NULL DEFAULT 0"),await P(e,"orders","extraServiceAmount","REAL NOT NULL DEFAULT 0"),await P(e,"orders","totalAmount","REAL NOT NULL DEFAULT 0"),await P(e,"orders","paidAmount","REAL NOT NULL DEFAULT 0"),await P(e,"orders","extras","TEXT"),await P(e,"orders","notes","TEXT"),await P(e,"orders","dueAt","TEXT"),await P(e,"orders","createdAt",'TEXT NOT NULL DEFAULT ""'),await P(e,"daily_sales","saleNumber","TEXT"),await P(e,"daily_sales","status","TEXT"),await P(e,"daily_sales","endorsedTo","TEXT"),await P(e,"daily_sales","statusUpdatedAt","TEXT");const a=((await e.query("SELECT COUNT(*) as count FROM staff")).values?.[0]?.count??0)===0;if(a){for(const r of j)await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[r.id,r.name,r.email,r.password,r.role,r.branch,1]);for(const r of Se)await e.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[r.id,r.name,r.phone,r.address]);for(const r of X)await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[r.id,r.name,r.description,r.category,r.serviceType,r.price,r.maxKg,r.dryingMinutes,JSON.stringify(r.includes),r.additionalCharge,r.turnaroundHours,r.isActive]);for(const r of Y)await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[r.id,r.name,r.maxKg,r.additionalFee,r.isActive]);for(const r of Q)await st(e,r);for(const r of re)await e.run("INSERT INTO payments (id, orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?, ?)",[r.id,r.orderId,r.amount,r.method,r.reference,r.receivedAt,r.branch]);for(const r of le)await e.run("INSERT INTO disbursement_expenses (id, expenseDate, number, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?, ?)",[r.id,r.expenseDate,r.number,r.name,r.category,r.description,r.amount]);for(const r of de)await e.run("INSERT INTO daily_sales (id, saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?, ?)",[r.id,r.saleDate,r.saleNumber,r.cashAmount,r.gcashAmount,r.totalAmount,r.notes]);for(const r of ne)await e.run("INSERT INTO revolving_history (id, revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[r.id,r.revolvingNumber,r.name,r.amount,r.category,r.description,r.type,r.createdAt]);for(const r of K)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[r.id,r.machineName,r.machineType,r.status,r.branch]);for(const r of se)await e.run("INSERT INTO settings (key, value) VALUES (?, ?)",[r.key,r.value]);await e.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",["fresh_install_defaults",J()])}await Te(e),await rt(e),a||await nt(e),await Jt(e)}async function st(e,t){await e.run("INSERT INTO orders (id, ticket, customerId, customer, phone, serviceId, service, serviceLines, itemCategoryId, itemCategory, branch, status, workflowCompleted, weightKg, price, additionalCharge, extraServiceAmount, totalAmount, paidAmount, extras, notes, foldedBy, dueAt, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.ticket,t.customerId,t.customer,t.phone,t.serviceId,t.service,JSON.stringify(t.serviceLines??[]),t.itemCategoryId,t.itemCategory,t.branch,t.status,JSON.stringify(t.workflowCompleted),t.weightKg,t.price,t.additionalCharge,t.extraServiceAmount,t.totalAmount,t.paidAmount,JSON.stringify(t.extras),t.notes,t.foldedBy,t.dueAt,t.createdAt])}function Zt(e){const t=Number(e.paidAmount??0),a=Number(e.totalAmount??0),r=Number(e.foldedBy),n=G(e.serviceLines,[]),s=Number(e.serviceId),i=String(e.service),c=Number(e.price);return{id:Number(e.id),ticket:String(e.ticket),customerId:Number(e.customerId),customer:String(e.customer),phone:e.phone?String(e.phone):null,serviceId:s,service:i,serviceLines:n.length?n:[{id:s,name:i,price:c,quantity:1,total:c}],itemCategoryId:Number(e.itemCategoryId),itemCategory:String(e.itemCategory),branch:String(e.branch),status:String(e.status),workflowCompleted:G(e.workflowCompleted,[]),weightKg:Number(e.weightKg),price:c,additionalCharge:Number(e.additionalCharge),extraServiceAmount:Number(e.extraServiceAmount),totalAmount:a,paidAmount:t,balance:Number((a-t).toFixed(2)),extras:G(e.extras,[]),notes:e.notes?String(e.notes):null,foldedBy:Number.isFinite(r)&&r>0?r:null,foldedByName:e.foldedByName?String(e.foldedByName):null,dueAt:String(e.dueAt),createdAt:String(e.createdAt)}}async function ea(){await zt()}async function oe(){return(await Pe()).find(t=>t.key==="branch")?.value??"Main Store"}async function ta(){const e=await Pe();return Number(e.find(t=>t.key==="fold_rate")?.value??"5")}async function it(e){return(await Pe()).find(a=>a.key===e)?.value}async function Pe(){return L.isNativePlatform()?(await(await C()).query("SELECT key, value FROM settings ORDER BY key")).values??[]:N("settings",se)}async function ge(e,t){if(!L.isNativePlatform()){const r=N("settings",se).filter(n=>n.key!==e);r.push({key:e,value:t}),S("settings",r);return}await(await C()).run("REPLACE INTO settings (key, value) VALUES (?, ?)",[e,t])}async function aa(e){return L.isNativePlatform()?(await(await C()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff WHERE branch = ? ORDER BY name ASC',[e])).values??[]:N("staff",j).filter(r=>r.branch===e)}async function ot(){return L.isNativePlatform()?(await(await C()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff ORDER BY name ASC')).values??[]:N("staff",j)}async function ct(e,t){const a=e.trim().toLowerCase();return(await ot()).find(n=>n.email.toLowerCase()===a&&n.password===t&&n.isActive!==0)??null}async function ra(e){if(!L.isNativePlatform()){const a=N("staff",j);a.unshift({id:k(a),...e,isActive:1}),S("staff",a);return}await(await C()).run("INSERT INTO staff (name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?)",[e.name,e.email,e.password,e.role,e.branch,1])}async function Xe(e,t){if(!L.isNativePlatform()){const s=N("staff",j),i=s.find(c=>c.id===e);i&&(Object.assign(i,t),S("staff",s));return}const a=await C(),r=[],n=[];for(const[s,i]of Object.entries(t))s!=="id"&&(r.push(`${s} = ?`),n.push(i));r.length&&(n.push(e),await a.run(`UPDATE staff SET ${r.join(", ")} WHERE id = ?`,n))}async function na(){return L.isNativePlatform()?(await(await C()).query("SELECT id, name, phone, address FROM customers ORDER BY name ASC")).values??[]:N("customers",Se).sort((a,r)=>a.name.localeCompare(r.name))}async function sa(e){if(!L.isNativePlatform()){const n=N("customers",Se),s=e.id?n.find(c=>c.id===e.id):n.find(c=>c.name.toLowerCase()===e.name.toLowerCase()&&(e.phone?c.phone===e.phone:!0));if(s)return s.name=e.name,s.phone=e.phone??s.phone,s.address=e.address??s.address,S("customers",n),s;const i={id:k(n),name:e.name,phone:e.phone??null,address:e.address??null};return n.push(i),S("customers",n),i}const t=await C();if(e.id)return await t.run("UPDATE customers SET name = ?, phone = ?, address = ? WHERE id = ?",[e.name,e.phone??null,e.address??null,e.id]),{id:e.id,name:e.name,phone:e.phone??null,address:e.address??null};const a=await t.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM customers"),r=Number((a.values?.[0]).id);return await t.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[r,e.name,e.phone??null,e.address??null]),{id:r,name:e.name,phone:e.phone??null,address:e.address??null}}async function De(e){if(!L.isNativePlatform())return N("services",X).filter(r=>!0);const t=await C(),a=await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[]);return(a.values??[]).length===0?(await Te(t),((await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[])).values??[]).map(n=>({...n,includes:G(n.includes,[])}))):(a.values??[]).map(r=>({...r,includes:G(r.includes,[])}))}async function ia(){if(!L.isNativePlatform())return N("services",X);const e=await C(),t=await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC");return(t.values??[]).length===0?(await Te(e),((await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC")).values??[]).map(r=>({...r,includes:G(r.includes,[])}))):(t.values??[]).map(a=>({...a,includes:G(a.includes,[])}))}async function Ke(e){if(!L.isNativePlatform()){const a=N("services",X),r=e.id?a.find(n=>n.id===e.id):null;r?Object.assign(r,e):a.unshift({...e,id:k(a)}),S("services",a);return}const t=await C();e.id?await t.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = ? WHERE id = ?",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive,e.id]):await t.run("INSERT INTO laundry_services (name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive])}async function lt(){if(!L.isNativePlatform())return N("item_categories",Y).filter(a=>a.isActive);const e=await C(),t=await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC");return(t.values??[]).length===0?(await Te(e),(await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC")).values??[]):t.values??[]}async function oa(e){if(!L.isNativePlatform()){const a=N("item_categories",Y),r=e.id?a.find(n=>n.id===e.id):null;r?Object.assign(r,e):a.unshift({...e,id:k(a)}),S("item_categories",a);return}const t=await C();e.id?await t.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = ? WHERE id = ?",[e.name,e.maxKg,e.additionalFee,e.isActive,e.id]):await t.run("INSERT INTO item_categories (name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?)",[e.name,e.maxKg,e.additionalFee,e.isActive])}function dt(e,t,a,r){const n=(Array.isArray(e)?e:[e]).map(f=>{const m=Math.max(0,Number(f.quantity??1)),g=Number(f.price);return{id:f.id,name:f.name,price:g,quantity:m,total:Number((g*m).toFixed(2))}}).filter(f=>f.quantity>0),s=Number(t.maxKg),i=0,c=0,l=r.map(f=>{const m=Math.max(0,Number(f.quantity??1)),g=Number(f.price);return{id:f.id,name:jt(f.name),price:g,quantity:m,total:Number((g*m).toFixed(2))}}).filter(f=>f.quantity>0),d=n.reduce((f,m)=>f+m.total,0),p=l.reduce((f,m)=>f+m.total,0),u=Number((d+c+p).toFixed(2));return{price:Number(d.toFixed(2)),additionalCharge:Number(c.toFixed(2)),extraServiceAmount:Number(p.toFixed(2)),totalAmount:u,allowedKg:s,extraKg:Number(i.toFixed(2)),warning:null,serviceLines:n,extras:l}}function ut(e,t){const a=e.serviceLines?.length?e.serviceLines.map(i=>i.id):[e.serviceId],r=t.filter(i=>a.includes(i.id)),n=Array.from(new Set(r.flatMap(i=>i.includes??[]))),s=[{key:"received",label:"Received"}];return n.includes("Wash")&&s.push({key:"wash",label:"Wash"}),e.extras.length&&s.push({key:"extras",label:"Extra services"}),(n.includes("Dry")||r.some(i=>(i.dryingMinutes??0)>0))&&s.push({key:"dry",label:"Dry"}),n.includes("Fold")&&s.push({key:"fold",label:"Fold"}),s.push({key:"ready",label:"Ready"},{key:"claimed",label:"Claimed"}),s}function ca(e){return e.includes("claimed")?"claimed":e.includes("ready")?"ready":e.includes("dry")?"drying":e.includes("extras")||e.includes("wash")?"washing":"received"}async function ce(e){return L.isNativePlatform()?((await(await C()).query("SELECT o.*, s.name as foldedByName FROM orders o LEFT JOIN staff s ON s.id = o.foldedBy WHERE o.branch = ? ORDER BY o.id DESC",[e])).values??[]).map(r=>Zt(r)):N("orders",Q).filter(r=>r.branch===e).map(r=>({...r,serviceLines:r.serviceLines??[{id:r.serviceId,name:r.service,price:Number(r.price),quantity:1,total:Number(r.price)}],balance:Number((r.totalAmount-r.paidAmount).toFixed(2))}))}async function la(e){const[t,a]=await Promise.all([De(),lt()]),r=e.serviceQuantities??(e.serviceId?{[e.serviceId]:1}:{}),n=t.filter(T=>T.serviceType==="order"&&Number(r[T.id]??0)>0).map(T=>({...T,quantity:Number(r[T.id]??0)})),s=n[0],i=a.find(T=>T.id===e.itemCategoryId)??a.find(T=>T.name.toLowerCase()===(s?.category??"").toLowerCase())??a.find(T=>T.name==="Regular Clothes")??a[0];if(!n.length||!s||!i)throw new Error("Please select at least one service.");const c=e.addonQuantities??Object.fromEntries((e.addonIds??[]).map(T=>[T,1])),l=t.filter(T=>T.serviceType==="addon"&&Number(c[T.id]??0)>0).map(T=>({...T,quantity:Number(c[T.id]??0)})),d=e.weightKg??Math.max(1,Number(i.maxKg||s.maxKg||1)),p=dt(n,i,d,l),u=await sa({id:e.customerId||void 0,name:e.customerName,phone:e.customerPhone??null}),f=Math.max(0,e.paidAmount),m=Math.min(p.totalAmount,f),g={ticket:await da(),customerId:u.id,customer:u.name,phone:u.phone,serviceId:s.id,service:p.serviceLines.map(T=>`${T.name} x${T.quantity}`).join(", "),serviceLines:p.serviceLines,itemCategoryId:i.id,itemCategory:i.name,branch:e.branch,status:"received",workflowCompleted:["received"],weightKg:d,price:p.price,additionalCharge:p.additionalCharge,extraServiceAmount:p.extraServiceAmount,totalAmount:p.totalAmount,paidAmount:m,balance:Number((p.totalAmount-m).toFixed(2)),extras:p.extras,notes:e.notes||null,foldedBy:null,foldedByName:null,dueAt:new Date(Date.now()+Math.max(...n.map(T=>T.turnaroundHours))*60*60*1e3).toISOString(),createdAt:J()};if(!L.isNativePlatform()){const T=N("orders",Q),A={...g,id:k(T)};return T.unshift(A),S("orders",T),f>0&&await mt(A.id,{amount:f,method:e.paymentMethod,reference:e.paymentReference??null}),A}const y=await C(),b=await y.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM orders"),w={...g,id:Number((b.values?.[0]).id)};return await st(y,w),f>0&&await y.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[w.id,f,e.paymentMethod,e.paymentReference??null,J(),e.branch]),w}async function da(){const e=`LB${Kt()}`,t=await oe(),r=(await ce(t)).filter(s=>s.ticket.startsWith(e)).sort((s,i)=>i.ticket.localeCompare(s.ticket))[0],n=r?Number(r.ticket.slice(-3))+1:1;return`${e}-${String(n).padStart(3,"0")}`}async function ua(e,t){const a=await oe(),[r,n]=await Promise.all([ce(a),De()]),s=r.find(d=>d.id===e);if(!s)return;const c=ut(s,n).map(d=>d.key).find(d=>!s.workflowCompleted.includes(d));if(!c)return;if(s.workflowCompleted=[...s.workflowCompleted,c],s.status=ca(s.workflowCompleted),c==="fold"&&t&&(s.foldedBy=t),!L.isNativePlatform()){const d=N("orders",Q),p=d.find(u=>u.id===s.id);p&&Object.assign(p,s),S("orders",d);return}await(await C()).run("UPDATE orders SET workflowCompleted = ?, status = ?, foldedBy = ? WHERE id = ?",[JSON.stringify(s.workflowCompleted),s.status,s.foldedBy,s.id])}async function mt(e,t){const a=await oe();if(!(await ce(a)).find(c=>c.id===e))return;const s=Math.max(0,t.amount);if(s<=0)return;if(!L.isNativePlatform()){const c=N("payments",re);c.unshift({id:k(c),orderId:e,amount:s,method:t.method,reference:t.reference??null,receivedAt:J(),branch:a}),S("payments",c);const l=N("orders",Q),d=l.find(p=>p.id===e);d&&(d.paidAmount=Math.min(d.totalAmount,Number((d.paidAmount+s).toFixed(2)))),S("orders",l);return}const i=await C();await i.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[e,s,t.method,t.reference??null,J(),a]),await i.run("UPDATE orders SET paidAmount = MIN(totalAmount, paidAmount + ?) WHERE id = ?",[s,e])}async function ma(e){return L.isNativePlatform()?(await(await C()).query("SELECT id, orderId, amount, method, reference, receivedAt, branch FROM payments  ORDER BY receivedAt DESC",[])).values??[]:N("payments",re).filter(r=>!0)}async function va(e){const t=await oe(),r=(await ce(t)).find(s=>s.id===e);if(!r)return;if(r.paidAmount>0)throw new Error("Cancel is only allowed for unpaid orders. Use Delete (admin) to refund paid orders.");if(!L.isNativePlatform()){const s=N("orders",Q),i=N("payments",re),c=N("fold_logs",[]),l=s.filter(u=>u.id!==e),d=i.filter(u=>u.orderId!==e),p=c.filter(u=>u.orderTicket!==r.ticket);S("orders",l),S("payments",d),S("fold_logs",p);return}const n=await C();await n.run("DELETE FROM payments WHERE orderId = ?",[e]),await n.run("DELETE FROM fold_logs WHERE orderTicket = ?",[r.ticket]),await n.run("DELETE FROM orders WHERE id = ?",[e])}async function pa(e){const t=await oe(),r=(await ce(t)).find(s=>s.id===e);if(!r)return;if(r.paidAmount<=0)throw new Error("Delete (refund) is only allowed for paid orders.");if(!L.isNativePlatform()){const s=N("orders",Q),i=N("payments",re),c=N("fold_logs",[]),l=s.filter(u=>u.id!==e),d=i.filter(u=>u.orderId!==e),p=c.filter(u=>u.orderTicket!==r.ticket);S("orders",l),S("payments",d),S("fold_logs",p);return}const n=await C();await n.run("DELETE FROM payments WHERE orderId = ?",[e]),await n.run("DELETE FROM fold_logs WHERE orderTicket = ?",[r.ticket]),await n.run("DELETE FROM orders WHERE id = ?",[e])}async function fa(){return L.isNativePlatform()?(await(await C()).query("SELECT id, orderTicket, staffName, foldCount, rate, total, createdAt FROM fold_logs ORDER BY id DESC")).values??[]:N("fold_logs",[])}async function ya(e){const t=Number((e.foldCount*e.rate).toFixed(2));if(!L.isNativePlatform()){const r=N("fold_logs",[]);r.unshift({id:Date.now(),...e,total:t,createdAt:J()}),S("fold_logs",r);return}await(await C()).run("INSERT INTO fold_logs (orderTicket, staffName, foldCount, rate, total, createdAt) VALUES (?, ?, ?, ?, ?, ?)",[e.orderTicket,e.staffName,e.foldCount,e.rate,t,J()])}async function ha(){return L.isNativePlatform()?(await(await C()).query("SELECT id, expenseDate, number, name, category, description, amount FROM disbursement_expenses ORDER BY expenseDate DESC, id DESC")).values??[]:N("expenses",le)}function Ae(e){const t=/^DISB-(\d+)$/i.exec(String(e??"").trim());return t?Number(t[1]):0}function Ge(e){const t=/^REV-(\d+)$/i.exec(String(e??"").trim());return t?Number(t[1]):0}async function ga(){let e=0;if(!L.isNativePlatform()){const n=N("expenses",le),s=N("revolving_history",ne);for(const i of n)e=Math.max(e,Ae(i.number));for(const i of s)i.type==="disbursement"&&(e=Math.max(e,Ae(i.revolvingNumber)));return e}const t=await C(),a=await t.query("SELECT number FROM disbursement_expenses"),r=await t.query("SELECT revolvingNumber as number FROM revolving_history WHERE type = 'disbursement'");for(const n of[...a.values??[],...r.values??[]])e=Math.max(e,Ae(String(n.number)));return e}async function vt(){const e=await ga()+1;return`DISB-${String(e).padStart(2,"0")}`}async function ba(){let e=0;if(!L.isNativePlatform()){const r=N("revolving_history",ne);for(const n of r)n.type==="add"&&(e=Math.max(e,Ge(n.revolvingNumber)));return`REV-${String(e+1).padStart(2,"0")}`}const a=await(await C()).query("SELECT revolvingNumber FROM revolving_history WHERE type = 'add'");for(const r of a.values??[])e=Math.max(e,Ge(String(r.revolvingNumber)));return`REV-${String(e+1).padStart(2,"0")}`}async function pt(e){if(!L.isNativePlatform()){const a=N("expenses",le),r=k(a);a.unshift({id:r,expenseDate:e.expenseDate,number:e.number,name:e.name,category:e.category,description:e.description||null,amount:e.amount}),S("expenses",a);return}await(await C()).run("INSERT INTO disbursement_expenses (expenseDate, number, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?)",[e.expenseDate,e.number,e.name,e.category,e.description||null,e.amount])}async function Ea(e){const t=await vt();await pt({expenseDate:e.expenseDate,number:t,name:e.name,category:e.category,description:e.description,amount:e.amount})}async function Sa(){return L.isNativePlatform()?(await(await C()).query('SELECT id, saleDate, COALESCE(saleNumber, "") as saleNumber, cashAmount, gcashAmount, totalAmount, notes, status, endorsedTo, statusUpdatedAt FROM daily_sales ORDER BY saleDate DESC, id DESC')).values??[]:N("sales",de)}async function wa(e){const t=Number((e.cashAmount+e.gcashAmount).toFixed(2));if(!L.isNativePlatform()){const s=N("sales",de),i=s.find(c=>c.saleDate===e.saleDate);if(i)Object.assign(i,{cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null});else{const c=k(s);s.unshift({id:c,saleDate:e.saleDate,saleNumber:`SALE-${String(c).padStart(2,"0")}`,cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null})}S("sales",s);return}const a=await C(),n=(await a.query("SELECT id, saleNumber FROM daily_sales WHERE saleDate = ?",[e.saleDate])).values?.[0];if(n)await a.run("UPDATE daily_sales SET cashAmount = ?, gcashAmount = ?, totalAmount = ?, notes = ? WHERE id = ?",[e.cashAmount,e.gcashAmount,t,e.notes||null,n.id]);else{const s=await a.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM daily_sales"),i=Number((s.values?.[0]).id);await a.run("INSERT INTO daily_sales (saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?)",[e.saleDate,`SALE-${String(i).padStart(2,"0")}`,e.cashAmount,e.gcashAmount,t,e.notes||null])}}async function Ve(e,t,a=null,r){if(!L.isNativePlatform()){const s=N("sales",de),i=s.find(c=>c.id===e);i&&(i.status=t,i.endorsedTo=a,i.statusUpdatedAt=r,S("sales",s));return}await(await C()).run("UPDATE daily_sales SET status = ?, endorsedTo = ?, statusUpdatedAt = ? WHERE id = ?",[t,a,r,e])}async function Ta(){return L.isNativePlatform()?(await(await C()).query("SELECT id, revolvingNumber, name, amount, category, description, type, createdAt FROM revolving_history ORDER BY createdAt DESC, id DESC")).values??[]:N("revolving_history",ne).sort((a,r)=>r.createdAt.localeCompare(a.createdAt))}async function Ye(e){const t=e.type==="disbursement"?await vt():await ba();if(e.type==="disbursement"){const r=e.expenseDate??e.createdAt.slice(0,10);await pt({expenseDate:r,number:t,name:e.name,category:e.category,description:e.description??"",amount:e.amount})}if(!L.isNativePlatform()){const r=N("revolving_history",ne),n=k(r);r.unshift({id:n,revolvingNumber:t,...e}),S("revolving_history",r);return}await(await C()).run("INSERT INTO revolving_history (revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)",[t,e.name,e.amount,e.category,e.description||null,e.type,e.createdAt])}async function ft(e){return L.isNativePlatform()?(await(await C()).query("SELECT id, machineName, machineType, status, branch FROM machines WHERE branch = ? ORDER BY machineType, machineName",[e])).values??[]:N("machines",K).filter(r=>r.branch===e)}async function Na(e){if(!L.isNativePlatform()){const a=N("machines",K);a.unshift({id:k(a),...e}),S("machines",a);return}await(await C()).run("INSERT INTO machines (machineName, machineType, status, branch) VALUES (?, ?, ?, ?)",[e.machineName,e.machineType,e.status,e.branch])}async function Aa(e,t){if(!L.isNativePlatform()){const r=N("machines",K),n=r.find(s=>s.id===e);n&&(n.status=t,S("machines",r));return}await(await C()).run("UPDATE machines SET status = ? WHERE id = ?",[t,e])}async function La(e){return L.isNativePlatform()?((await(await C()).query("SELECT id, date, machineIds, machineNames, cleaningStatus, notes, branch FROM subcleanings WHERE branch = ? ORDER BY date DESC, id DESC",[e])).values??[]).map(r=>({...r,machineIds:G(r.machineIds,[])})):N("subcleanings",[]).filter(r=>r.branch===e)}async function Ca(e){const a=(await ft(e.branch)).filter(s=>e.machineIds.includes(s.id)).map(s=>s.machineName).join(", ");if(!L.isNativePlatform()){const s=N("subcleanings",[]);s.unshift({id:k(s),date:e.date,machineIds:e.machineIds,machineNames:a,cleaningStatus:e.cleaningStatus,notes:e.notes||null,branch:e.branch}),S("subcleanings",s);const i=N("machines",K);i.forEach(c=>{e.machineIds.includes(c.id)&&(c.status=e.cleaningStatus==="completed"?"available":"under_cleaning")}),S("machines",i);return}const r=await C();await r.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, notes, branch) VALUES (?, ?, ?, ?, ?, ?)",[e.date,JSON.stringify(e.machineIds),a,e.cleaningStatus,e.notes||null,e.branch]);const n=e.cleaningStatus==="completed"?"available":"under_cleaning";for(const s of e.machineIds)await r.run("UPDATE machines SET status = ? WHERE id = ?",[n,s])}async function $a(e,t){if(!L.isNativePlatform()){const i=N("machines",K),c=i.find(p=>p.id===e);c&&(c.status="available"),S("machines",i);const l=N("subcleanings",[]),d=$e();l.unshift({id:k(l),date:d,machineIds:[e],machineNames:c?.machineName??"",cleaningStatus:"completed",notes:null,branch:t}),S("subcleanings",l);return}const a=await C(),n=(await a.query("SELECT machineName FROM machines WHERE id = ?",[e])).values?.[0]?.machineName??"";await a.run("UPDATE machines SET status = ? WHERE id = ?",["available",e]);const s=$e();await a.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, notes, branch) VALUES (?, ?, ?, ?, ?, ?)",[s,JSON.stringify([e]),n,"completed",null,t])}const xe=document.querySelector("#app");if(!xe)throw new Error("App root not found");let fe;const ie=Z("BluetoothThermalPrinter"),Ie={dashboard:"Dashboard",pos:"POS",orders:"Orders",archived:"Archived Order",customers:"Customers",pricing:"Pricing Services",disbursements:"Daily Report",reports:"Reports",inventory:"Inventory",maintenance:"Maintenance",staff:"Staff",revolving:"Revolving Fund",settings:"Settings"},o={tab:"dashboard",receiptOrderId:0,currentUser:null,loginError:"",sidebarOpen:!1,dailyReportTab:"expenses",maintenanceTab:"cleaning",customerSearch:"",orderSearch:"",orderDateFilter:"",orderPaymentFilter:"",printerPanelOpen:!1,printerLoading:!1,printerError:"",printerStatus:"",printerPaperWidth:58,pairedPrinters:[],selectedPrinterAddress:"",archivedOrderSearch:"",reportPreview:null,endorseModalOpen:!1,endorseSaleId:0,endorseSaleDate:"",revolvingModalOpen:!1,revolvingSaleId:0,addFundModalOpen:!1,disbursementModalOpen:!1,revolvingHistoryFrom:"",revolvingHistoryTo:""},Ra=["Wash","Dry","Fold","Detergent","Fabcon","Zonrox"],ue="laba101-mobile-session";function $(e){return new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(e||0)}function v(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function V(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}function yt(e,t){return Number((e-t).toFixed(2))}function ht(e,t,a,r=0){const n=t.filter(i=>_(i.createdAt)===e).reduce((i,c)=>i+c.paidAmount,0),s=a.filter(i=>i.expenseDate===e).reduce((i,c)=>i+c.amount,0);return yt(n+r,s)}function Oa(e){const t=new Map;return e.filter(a=>a.workflowCompleted.includes("fold")&&a.foldedByName).forEach(a=>{const r=a.foldedByName,n=t.get(r)??{staffName:r,folds:0};n.folds+=1,t.set(r,n)}),Array.from(t.values())}function me(e=new Date){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${r}`}function B(){return me()}function _(e){return me(new Date(e))}function qe(e){return e.paidAmount<=0?"unpaid":e.balance>0?"partial":"paid"}function te(e){return new Intl.DateTimeFormat("en-PH",{dateStyle:"medium",timeStyle:"short"}).format(new Date(e))}function Pa(e){const t=new Date(e),a=new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric",year:"numeric"}).format(t),r=new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",hour12:!0}).format(t);return`<div class="datetime-stack"><strong>${v(a)}</strong><span class="meta">${v(r)}</span></div>`}function Da(e){return e?.role==="staff"&&e.branch==="Gensan Branch"}function we(e,t,a="data-table"){return`
    <div class="table-scroll">
      <table class="${a}">
        <thead><tr>${e.map(r=>`<th>${v(r)}</th>`).join("")}</tr></thead>
        <tbody>${t.length?t.map(r=>`<tr>${r.map(n=>`<td>${n}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${e.length}" class="table-empty">No records found.</td></tr>`}</tbody>
      </table>
    </div>
  `}function xa(e=new Date){return{date:new Intl.DateTimeFormat("en-PH",{weekday:"long",month:"long",day:"numeric",year:"numeric"}).format(e),time:new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",second:"2-digit",hour12:!0}).format(e)}}function ye(){const e=document.querySelector("[data-date-from]"),t=document.querySelector("[data-date-to]"),a=Array.from(document.querySelectorAll('input[name="reportType"]:checked')).map(r=>r.value).filter(r=>r==="sales"||r==="disbursement"||r==="fold_count"||r==="revolving_fund"||r==="summary");return{from:e?.value||"0000-01-01",to:t?.value||"9999-12-31",types:a.length?a:["summary"]}}function he(e,t){return e>=t.from&&e<=t.to}function gt(e,t,a,r,n,s){const i=new Set(s.types),c=e.filter(h=>he(_(h.createdAt),s)),l=t.filter(h=>he(h.saleDate,s)),d=a.filter(h=>he(h.expenseDate,s)),p=Oa(c),u=c.reduce((h,O)=>h+O.paidAmount,0),f=l.reduce((h,O)=>h+O.cashAmount,0),m=l.reduce((h,O)=>h+O.gcashAmount,0),g=0,y=u+f,b=g+m,w=y+b,T=d.reduce((h,O)=>h+O.amount,0),A=T,x=w-A,M=()=>({orderCashTotal:u,orderGcashTotal:g,manualCashTotal:f,manualGcashTotal:m,totalCash:y,totalGcash:b,totalSales:w,rows:[["Type","Date","Number","Name","Cash","GCash","Total","Balance"],...c.map(h=>["Order",_(h.createdAt),h.ticket,h.customer,h.paidAmount,0,h.paidAmount,h.balance]),...l.map(h=>["Manual Sale",h.saleDate,h.saleNumber,h.notes??"",h.cashAmount,h.gcashAmount,h.totalAmount,""]),[],["Sales Summary",s.from,"to",s.to,"","","",""],["Order Cash","","","","","",u,""],["Order GCash","","","","","",g,""],["Manual Cash","","","","","",f,""],["Manual GCash","","","","","",m,""],["Total Cash","","","","","",y,""],["Total GCash","","","","","",b,""],["Total Sales","","","","","",w,""]]}),q=()=>({totalExpenses:T,totalDisbursement:A,rows:[["Type","Date","Number","Name","Amount"],...d.map(h=>["Expense",h.expenseDate,h.number,h.name,h.amount]),[],["Disbursement Summary",s.from,"to",s.to,""],["Expenses","","","",T],["Total Disbursement","","","",A]]}),z=()=>({rows:[["Staff","Fold Count"],...p.map(h=>[h.staffName,h.folds]),[],["Total Folds",p.reduce((h,O)=>h+O.folds,0)]]}),D=r.filter(h=>he(_(h.createdAt),s));return{selection:s,selectedTypes:i,salesRows:M,disbursementRows:q,foldCountRows:z,revolvingDailySummaryRows:()=>({rows:[["Date of Sales","Cash on Hand","Status","Date Update"],...l.map(h=>{const O=ht(h.saleDate,e,a,h.cashAmount),ee=h.status==="revolving"?"Revolving":h.status==="endorsed"?`Endorsed to ${h.endorsedTo??""}`:"Pending";return[h.saleDate,O,ee,h.statusUpdatedAt?_(h.statusUpdatedAt):""]})]}),revolvingHistoryRows:()=>({rows:[["Date","Number","Name","Amount","Category","Description","Type"],...D.map(h=>[_(h.createdAt),h.revolvingNumber,h.name,h.type==="disbursement"?-h.amount:h.amount,h.category,h.description??"",h.type==="add"?"Add Revolving Fund":"Disbursement"])]}),summaryRows:()=>{const h=M(),O=q();return[["Summary",s.from,"to",s.to,"","","",""],["Order Cash","","","","","",h.orderCashTotal,""],["Order GCash","","","","","",h.orderGcashTotal,""],["Manual Cash","","","","","",h.manualCashTotal,""],["Manual GCash","","","","","",h.manualGcashTotal,""],["Total Cash","","","","","",h.totalCash,""],["Total GCash","","","","","",h.totalGcash,""],["Total Sales","","","","","",h.totalSales,""],["Total Disbursement","","","","","",O.totalDisbursement,""],["Profit","","","","","",x,""],["Cash on Hand","","","","","",yt(h.totalCash,O.totalDisbursement),""]]},profit:x}}function Ia(e,t){return`<button class="nav-link ${t?"is-active":""}" data-tab="${e}" type="button">
    <span class="nav-icon">${qa(e)}</span>
    <span>${Ie[e]}</span>
  </button>`}function R(e,t){return`<div class="section-head"><div><h2>${v(e)}</h2><p class="meta">${v(t)}</p></div></div>`}function Qe(){return Ie[o.tab]??"Dashboard"}function Le(e){return(e?.name??"Laba101").trim().slice(0,1).toUpperCase()}function qa(e){return{dashboard:"DB",pos:"POS",orders:"PO",archived:"AR",customers:"CU",pricing:"PS",disbursements:"DR",reports:"RP",inventory:"IN",maintenance:"MT",staff:"ST",revolving:"RV",settings:"SE"}[e]}async function bt(){const e=await oe(),t=await aa(e),a=await ot(),r=await na(),n=await De(),s=await ia(),i=await lt(),c=await ce(e),l=await ma(),d=await fa(),p=await ha(),u=await Sa(),f=await ft(e),m=await La(e),g=await Ta(),y=await ta(),b=await it("report_email");return{branch:e,staff:t,allStaff:a,customers:r,services:n,allServices:s,categories:i,orders:c,payments:l,foldLogs:d,expenses:p,sales:u,machines:f,subcleanings:m,revolvingHistory:g,foldRate:y,reportEmail:b??""}}async function E(){if(!o.currentUser){Fa(),tr();return}const e=await bt();e.orders.filter(a=>a.status!=="claimed").length,e.orders.filter(a=>a.status==="ready").length,e.orders.reduce((a,r)=>a+r.paidAmount,0);const t=e.orders.filter(a=>_(a.createdAt)===B()).reduce((a,r)=>a+r.paidAmount,0);e.sales.reduce((a,r)=>a+r.totalAmount,0),e.expenses.reduce((a,r)=>a+r.amount,0),xe.innerHTML=`
    <div class="app-frame">
      <header class="topbar">
        <div class="topbar-left">
          <img src="/laba101-logo.svg" alt="Laba101" class="topbar-logo" />
          <div>
            <p class="eyebrow">Offline mobile system</p>
            <h1>${v(Qe())}</h1>
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
        <nav>${Et().map(a=>Ia(a,o.tab===a)).join("")}</nav>
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
            <h2>${v(Qe())}</h2>
          </div>
          <div class="navbar-time">
            <strong data-navbar-time>--:--</strong>
            <span data-navbar-date>Loading...</span>
          </div>
          <button class="mobile-avatar" type="button">${Le(o.currentUser)}</button>
        </header>

        ${o.tab==="dashboard"?Ua({paidToday:t,orders:e.orders}):""}
        ${o.tab==="pos"?Ma(e.orders,e.customers,e.services,e.categories,e.payments,e.branch):""}
        ${o.tab==="orders"?_a(e.orders,e.staff,e.services,e.payments):""}
        ${o.tab==="archived"?Ba(e.orders,e.staff,e.services,e.payments):""}
        ${o.tab==="customers"?Ka(e.customers,e.orders):""}
        ${o.tab==="pricing"?Ga(e.allServices,e.categories):""}
        ${o.tab==="disbursements"?Va(e.expenses,e.sales):""}
        ${o.tab==="reports"?Ya(e.orders,e.sales,e.expenses,e.revolvingHistory,e.foldRate):""}
        ${o.tab==="inventory"?Qa(e.services,e.categories):""}
        ${o.tab==="maintenance"?Ja(e.machines,e.subcleanings,e.branch):""}
        ${o.tab==="staff"?za(e.allStaff,e.branch):""}
        ${o.tab==="revolving"?mr(e.sales,e.revolvingHistory,e.orders,e.expenses):""}
        ${o.tab==="settings"?Za(e.branch,e.foldRate,e.reportEmail):""}
      </main>
    </div>
  `,er(),rr(e),nr(e.allServices),sr(),ir(e.orders,e.sales,e.expenses,e.revolvingHistory,e.foldRate),or(),cr(),lr(),dr(e.allStaff),vr(),ur(),ar()}function Et(){return o.currentUser?.role==="admin"?Object.keys(Ie).filter(e=>e!=="inventory"):Da(o.currentUser)?["disbursements","reports","maintenance","revolving"]:["pos","orders","archived","disbursements","reports","maintenance","revolving"]}function Fa(){xe.innerHTML=`
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
  `}function ka(){document.querySelectorAll("[data-fill-email]").forEach(e=>{e.addEventListener("click",()=>{const t=document.querySelector('input[name="email"]'),a=document.querySelector('input[name="password"]');t&&(t.value=e.dataset.fillEmail??""),a&&(a.value=e.dataset.fillPassword??"")})})}function Ua(e){const t=new Date,a=Array.from({length:7},(i,c)=>{const l=new Date(t);return l.setDate(t.getDate()-(6-c)),new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric"}).format(l)}),r=Array.from({length:7},(i,c)=>{const l=new Date(t);l.setDate(t.getDate()-(6-c));const d=me(l);return e.orders.filter(p=>_(p.createdAt)===d).reduce((p,u)=>p+u.paidAmount,0)}),n=Math.max(1,...r),s=210;return`
    <section class="dashboard-main">
      <article class="panel revenue-panel">
        ${R("Revenue overview","Paid amount for the last 7 days.")}
        <div class="stats compact dashboard-stats">
          <div class="stat"><span class="card-label">Paid Today</span><div class="value">${$(e.paidToday)}</div></div>
        </div>
        <div class="chart-shell">
          <div class="mini-chart revenue-chart">
            ${r.map((i,c)=>{const l=Math.max(12,Math.round(i/n*s));return`<div class="chart-bar ${c===r.length-1?"is-today":""}"><span style="height:${l}px"></span><strong>${$(i)}</strong></div>`}).join("")}
          </div>
          <div class="chart-days">${a.map(i=>`<span>${v(i)}</span>`).join("")}</div>
        </div>
        <div class="chart-footnote">Values are based on order payments for the last 7 days.</div>
      </article>
    </section>
  `}function Ma(e,t,a,r,n,s){const i=a.filter(u=>u.serviceType==="order"&&u.isActive),c=a.filter(u=>u.serviceType==="addon"&&u.isActive),l=o.receiptOrderId?e.find(u=>u.id===o.receiptOrderId):null,d=new Set(e.map(u=>u.customerId)),p=t.filter(u=>d.has(u.id));return`
    <section class="grid content full">
      <article class="panel span-2">
        ${R("New POS order","Tap a service, add extra quantities, and confirm the total")}
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
              <span><strong>${v(V(u.name))}</strong><small>${$(u.price)} each</small></span>
              <div class="qty-control">
                <button type="button" data-qty-minus="addonQty-${u.id}" aria-label="Decrease ${v(V(u.name))}">-</button>
                <input type="number" name="addonQty-${u.id}" min="0" step="1" value="0" inputmode="numeric" />
                <button type="button" data-qty-plus="addonQty-${u.id}" aria-label="Increase ${v(V(u.name))}">+</button>
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

      ${l?Fe(l,n.filter(u=>u.orderId===l.id)):""}
    </section>
  `}function _a(e,t,a,r){const n=o.receiptOrderId?e.find(p=>p.id===o.receiptOrderId):null,s=e.filter(p=>p.status!=="claimed"),i=o.orderSearch.trim().toLowerCase(),c=o.orderDateFilter.trim(),l=o.orderPaymentFilter.trim().toLowerCase(),d=s.filter(p=>{const u=!i||[p.ticket,p.customer,p.phone,p.service,p.itemCategory,p.status].some(g=>String(g??"").toLowerCase().includes(i)),f=!c||_(p.createdAt)===c,m=!l||qe(p)===l;return u&&f&&m});return`
    <section class="grid content full">
      <article class="panel span-2">
        ${R("Order queue","Workflow, payment, and receipts")}
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
          <div><span>Active queue</span><strong>${d.length}</strong></div>
          <div><span>Claimed archived</span><strong>${e.filter(p=>p.status==="claimed").length}</strong></div>
        </div>
        <table class="data-table orders-data-table">
          <thead>
            <tr><th>Ticket</th><th>Customer</th><th>Service</th><th>Total Payment</th><th>Actions</th></tr>
          </thead>
          <tbody>
            ${d.map(p=>St(p,t,a)).join("")||'<tr><td colspan="5" class="table-empty">No matching active orders.</td></tr>'}
          </tbody>
        </table>
      </article>
      ${n?Fe(n,r.filter(p=>p.orderId===n.id)):""}
    </section>
  `}function Ba(e,t,a,r){const n=e.filter(l=>l.status==="claimed"),s=o.archivedOrderSearch.trim().toLowerCase(),i=n.filter(l=>s?[l.ticket,l.customer,l.phone,l.service,l.itemCategory].some(d=>String(d??"").toLowerCase().includes(s)):!0),c=o.receiptOrderId?e.find(l=>l.id===o.receiptOrderId):null;return`
    <section class="grid content full">
      <article class="panel span-2">
        ${R("Archived orders","All claimed orders are listed here")}
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
            ${i.map(l=>St(l,t,a)).join("")||'<tr><td colspan="5" class="table-empty">No archived orders found.</td></tr>'}
          </tbody>
        </table>
      </article>
      ${c?Fe(c,r.filter(l=>l.orderId===c.id)):""}
    </section>
  `}function St(e,t,a){const r=ut(e,a),n=r.find(m=>!e.workflowCompleted.includes(m.key)),s=n?.key==="fold",i=n?.key==="extras"&&e.extras.length>0,c=qe(e),l=c.charAt(0).toUpperCase()+c.slice(1),d=e.extras.length?e.extras.map(m=>`${v(V(m.name))} x${Number(m.quantity??1)}`).join(", "):"",p=o.currentUser?.role==="admin",u=e.status!=="claimed"&&e.paidAmount<=0,f=e.status!=="claimed"&&p&&e.paidAmount>0;return`
    <tr class="order-row-main">
      <td><strong>${v(e.ticket)}</strong><div class="small">${v(te(e.createdAt))}</div></td>
      <td>${v(e.customer)}<div class="small">${v(e.phone??"")}</div></td>
      <td>${v(e.service)}${d?`<div class="small">Extras: ${d}</div>`:""}</td>
      <td class="amount-cell"><strong>${$(e.totalAmount)}</strong><div class="small">${v(l)} · Paid ${$(e.paidAmount)} · Bal ${$(e.balance)}</div></td>
      <td>
      <div class="row-actions">
        ${n?`<form class="inline-form advance-form" data-order-id="${e.id}">
          ${i?`<div class="extra-confirmation">Confirm extra service: <strong>${e.extras.map(m=>`${v(V(m.name))} x${Number(m.quantity??1)}`).join(", ")}</strong></div>`:""}
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
        ${f?`<button class="secondary" type="button" data-delete-order="${e.id}">Delete</button>`:""}
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
  `}function Fe(e,t){const a=t.reduce((i,c)=>i+Number(c.amount),0),r=Math.max(0,Number((a-e.totalAmount).toFixed(2))),n=qe(e),s=n.charAt(0).toUpperCase()+n.slice(1);return`
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="receipt-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-open-printer-panel>Printer</button>
          <button class="primary" type="button" data-thermal-print>${o.printerLoading?"Printing...":"Print Receipt"}</button>
          <button class="secondary" type="button" data-close-receipt>Close</button>
        </div>
        ${o.printerPanelOpen?ja():""}
        <div class="receipt" id="receipt-print-area">
          <div class="receipt-head">
            <h3 id="receipt-title">Laba101</h3>
            <p>${v(e.ticket)}<br>${v(te(e.createdAt))}</p>
          </div>
          ${o.currentUser?`<p class="receipt-staff">Staff: ${v(o.currentUser.name)}</p>`:""}
          <div class="receipt-customer">
            <strong>${v(e.customer)}</strong>
            <span>${v(e.phone??"No phone")}</span>
          </div>
          <div class="summary-list receipt-lines">
            <div><span>Service</span><strong>${v(e.service)}</strong></div>
            ${e.extras.length?`<div><span>Extra services</span><strong>${e.extras.map(i=>`${v(V(i.name))} x${Number(i.quantity??1)} (${$(Number(i.total??i.price))})`).join(", ")}</strong></div>`:""}
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
  `}function ja(){return`
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
  `}async function Je(){o.printerLoading=!0,o.printerError="",o.printerStatus="",await E();try{if(!(await ie.requestBluetoothPermissions()).granted)throw new Error("Bluetooth permission was not granted.");const t=await ie.listPairedPrinters();o.pairedPrinters=t.printers??[],o.selectedPrinterAddress=o.selectedPrinterAddress||t.savedAddress||o.pairedPrinters[0]?.address||"",o.printerStatus=o.pairedPrinters.length?"Select a printer, then connect.":"No paired printers found. Pair the printer in Android Bluetooth settings first."}catch(e){o.printerError=e instanceof Error?e.message:"Could not scan paired printers."}finally{o.printerLoading=!1,await E()}}async function Ha(){if(!o.selectedPrinterAddress){o.printerError="Select a paired printer first.",await E();return}o.printerLoading=!0,o.printerError="",o.printerStatus="",await E();try{await ie.savePrinter({address:o.selectedPrinterAddress}),await ie.connect({address:o.selectedPrinterAddress}),o.printerStatus="Printer connected and saved."}catch(e){o.printerError=e instanceof Error?e.message:"Printer connection failed."}finally{o.printerLoading=!1,await E()}}function Wa(e){const t=(e.serviceLines?.length?e.serviceLines:[{id:e.serviceId,name:e.service,price:e.price,quantity:1,total:e.price}]).map(r=>({name:r.name,quantity:Number(r.quantity||1),price:Number(r.price||0)})),a=e.extras.map(r=>({name:V(r.name),quantity:Number(r.quantity??1),price:Number(r.price||0)}));return[...t,...a]}async function Xa(e,t){const a=t.reduce((n,s)=>n+Number(s.amount),0),r=Math.max(0,Number((a-e.totalAmount).toFixed(2)));o.printerLoading=!0,o.printerError="",o.printerStatus="",await E();try{if(!o.selectedPrinterAddress){const n=await ie.getSavedPrinter();o.selectedPrinterAddress=n.address||""}await ie.printReceipt({address:o.selectedPrinterAddress||void 0,paperWidth:o.printerPaperWidth,storeName:"Laba101",receiptNumber:e.ticket,dateTime:te(e.createdAt),customerName:e.customer,customerPhone:e.phone?.trim()||"No phone",items:Wa(e),totalAmount:e.totalAmount,paidAmount:e.paidAmount,changeAmount:r,balanceAmount:e.balance,staffName:o.currentUser?.name?.trim()||"Staff"}),o.printerStatus="Receipt sent to printer."}catch(n){o.printerPanelOpen=!0,o.printerError=n instanceof Error?n.message:"Bluetooth thermal print failed."}finally{o.printerLoading=!1,await E()}}function Ka(e,t){const a=o.customerSearch.trim().toLowerCase(),r=e.filter(n=>a?n.name.toLowerCase().includes(a):!1);return`
    <section class="grid content full">
      <article class="panel">
        ${R("Customer Management","Customer records from local offline storage")}
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
        ${R("Customer list","Names, phones, addresses, and order history")}
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
  `}function Ga(e,t){return`
    <section class="grid content full">
      <article class="panel">
        ${R("Services","Order services and add-ons used by POS pricing")}
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
            ${Ra.map(a=>`<label class="check"><input type="checkbox" name="includes" value="${a}" /> ${a}</label>`).join("")}
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
        ${R("Item categories","Load limits and extra fees")}
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
        <div class="table">
          <div class="table-head"><div>Name</div><div>Max KG</div><div></div><div></div><div></div></div>
          ${t.map(a=>`<div class="table-row"><div>${v(a.name)}</div><div>${a.maxKg}</div><div></div><div></div><div></div></div>`).join("")}
        </div>
      </article>
    </section>
  `}function Va(e,t){const a=B(),r=a.slice(0,7),n=e.filter(l=>l.expenseDate===a).reduce((l,d)=>l+d.amount,0),s=e.filter(l=>l.expenseDate.startsWith(r)).reduce((l,d)=>l+d.amount,0),i=t.filter(l=>l.saleDate===a).reduce((l,d)=>l+d.totalAmount,0),c=t.filter(l=>l.saleDate.startsWith(r)).reduce((l,d)=>l+d.totalAmount,0);return`
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
      <div class="panel stat"><div class="card-label">Daily disbursement</div><div class="value">${$(n)}</div></div>
      <div class="panel stat"><div class="card-label">Monthly disbursement</div><div class="value">${$(s)}</div></div>
      <div class="panel stat"><div class="card-label">Today sales input</div><div class="value">${$(i)}</div></div>
      <div class="panel stat"><div class="card-label">Month sales input</div><div class="value">${$(c)}</div></div>
    </section>
    ${o.dailyReportTab==="expenses"?`
    <section class="grid content full">
      <article class="panel">
        ${R("Input disbursement","Supplies, utilities, and cash disbursements")}
        <form id="expense-form" class="form">
          <div class="form-row"><label>Date<input name="expenseDate" type="date" value="${B()}" required /></label><label>Amount<input name="amount" type="number" min="0" step="0.01" required /></label></div>
          <div class="form-row"><label>Name<input name="name" required /></label><label>Category<input name="category" required /></label></div>
          <label>Description<textarea name="description"></textarea></label>
          <button class="primary" type="submit">Save expense</button>
        </form>
      </article>
      <article class="panel">
        ${R("Disbursement list","Expenses only")}
        <div class="table">
          <div class="table-head"><div>Date</div><div>No.</div><div>Name</div><div>Category</div><div>Amount</div></div>
          ${e.map(l=>`<div class="table-row"><div>${v(l.expenseDate)}</div><div>${v(l.number)}</div><div>${v(l.name)}</div><div>${v(l.category)}</div><div>${$(l.amount)}</div></div>`).join("")||'<div class="helper">No expenses yet.</div>'}
        </div>
      </article>
    </section>
    `:`
    <section class="grid content full">
      <article class="panel">
        ${R("Input total sale","Manual cash and GCash totals")}
        <form id="sales-form" class="form">
          <label>Date<input name="saleDate" type="date" value="${B()}" required /></label>
          <label>Cash sales<input name="cashAmount" type="number" min="0" step="0.01" value="0" /></label>
          <label>GCash sales<input name="gcashAmount" type="number" min="0" step="0.01" value="0" /></label>
          <label>Notes<textarea name="notes" placeholder="Optional"></textarea></label>
          <button class="primary" type="submit">Save daily sale</button>
        </form>
      </article>
      <article class="panel">
        ${R("Daily sales history","Cash, GCash, total sale, notes, and updates")}
        <div class="table wide-table">
          <div class="table-head"><div>Sales #</div><div>Date</div><div>Cash</div><div>GCash</div><div>Total sale</div></div>
          ${t.map(l=>`<div class="table-row"><div>${v(l.saleNumber)}</div><div>${v(l.saleDate)}</div><div>${$(l.cashAmount)}</div><div>${$(l.gcashAmount)}</div><div><strong>${$(l.totalAmount)}</strong></div></div>`).join("")||'<div class="helper">No daily sales totals yet.</div>'}
        </div>
      </article>
    </section>
    `}
  `}function Ya(e,t,a,r,n,s,i,c){const l=o.reportPreview?gt(e,t,a,r,n,o.reportPreview):null;return`
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
            <label>From<input name="dateFrom" data-date-from type="date" value="${B()}" /></label>
            <label>To<input name="dateTo" data-date-to type="date" value="${B()}" /></label>
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
    ${l?`
      <section class="panel report-preview">
        ${l.selectedTypes.has("sales")?`
          <article>
            ${R("Sales report preview",`${l.selection.from} to ${l.selection.to}`)}
            <div class="table wide-table report-preview-table">
              <div class="table-head report-table-head"><div>Type</div><div>Date</div><div>Number</div><div>Name</div><div>Cash</div><div>GCash</div><div>Total</div><div>Balance</div></div>
              ${l.salesRows().rows.slice(1).map(d=>`<div class="table-row report-table-row">${d.map(p=>`<div>${v(p??"")}</div>`).join("")}</div>`).join("")}
            </div>
          </article>`:""}
        ${l.selectedTypes.has("disbursement")?`
          <article>
            ${R("Disbursement preview",`${l.selection.from} to ${l.selection.to}`)}
            <div class="table wide-table report-preview-table report-disbursement-table">
              <div class="table-head report-table-head"><div>Type</div><div>Date</div><div>Number</div><div>Name</div><div>Amount</div></div>
              ${l.disbursementRows().rows.slice(1).map(d=>`<div class="table-row report-table-row">${d.map(p=>`<div>${v(p??"")}</div>`).join("")}</div>`).join("")}
            </div>
          </article>`:""}
        ${l.selectedTypes.has("fold_count")?`
          <article>
            ${R("Fold Count preview",`${l.selection.from} to ${l.selection.to}`)}
            <div class="table report-preview-table">
              <div class="table-head"><div>Staff</div><div>Fold Count</div></div>
              ${l.foldCountRows().rows.slice(1).map(d=>`<div class="table-row">${d.map(p=>`<div>${v(p??"")}</div>`).join("")}</div>`).join("")}
            </div>
          </article>`:""}
        ${l.selectedTypes.has("revolving_fund")?`
          <article>
            ${R("Revolving Fund — Daily Summary",`${l.selection.from} to ${l.selection.to}`)}
            ${we(["Date of Sales","Cash on Hand","Status","Date Update"],l.revolvingDailySummaryRows().rows.slice(1).map(d=>[v(String(d[0]??"")),v(String(d[1]??"")),v(String(d[2]??"")),v(String(d[3]??""))]),"data-table revolving-report-table")}
          </article>
          <article>
            ${R("Revolving Fund — Table History",`${l.selection.from} to ${l.selection.to}`)}
            ${we(["Date","Number","Name","Amount","Category","Description","Type"],l.revolvingHistoryRows().rows.slice(1).map(d=>[v(String(d[0]??"")),v(String(d[1]??"")),v(String(d[2]??"")),v(String(d[3]??"")),v(String(d[4]??"")),v(String(d[5]??"")),v(String(d[6]??""))]),"data-table revolving-report-table")}
          </article>`:""}
        ${l.selectedTypes.has("summary")?`
          <article>
            ${R("Summary preview",`${l.selection.from} to ${l.selection.to}`)}
            <div class="summary-list report-summary-list">
              ${l.summaryRows().map(d=>`<div><span>${v(d[0])}</span><strong>${v(String(d[6]??"0"))}</strong></div>`).join("")}
            </div>
          </article>`:""}
      </section>
    `:""}
  `}function Qa(e,t){return`
    <section class="grid content full">
      <article class="panel">
        ${R("Inventory","Service catalog and item load limits")}
        <div class="summary-list">
          <div><span>Active services</span><strong>${e.filter(a=>a.isActive).length}</strong></div>
          <div><span>Item categories</span><strong>${t.length}</strong></div>
        </div>
      </article>
      <article class="panel">
        ${R("Service inventory","Current sellable laundry services")}
        <div class="table">
          <div class="table-head"><div>Name</div><div>Category</div><div>Price</div><div>Max KG</div><div>Status</div></div>
          ${e.map(a=>`<div class="table-row"><div><strong>${v(a.name)}</strong></div><div>${v(a.category)}</div><div>${$(a.price)}</div><div>${a.maxKg} kg</div><div>${a.isActive?"Active":"Inactive"}</div></div>`).join("")}
        </div>
      </article>
    </section>
  `}function Ja(e,t,a){const r=e.filter(s=>s.status!=="under_cleaning"),n=e.filter(s=>s.status==="under_cleaning");return`
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
        ${R("Available Machines","Select machines to start cleaning.")}
        <form id="subcleaning-form" class="form">
          <input type="hidden" name="date" value="${B()}" />
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
        ${R("Under Cleaning","Machines currently being serviced.")}
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
        ${R("Daily Cleaning Checklist","Track which machines have been cleaned today.")}
        <div class="table">
          <div class="table-head"><div>Machine</div><div>Type</div><div>Status</div><div>Notes</div><div>Date</div></div>
          ${e.map(s=>{const i=t.find(c=>c.machineIds.includes(s.id)&&c.date===B());return`<div class="table-row"><div><strong>${v(s.machineName)}</strong></div><div>${v(s.machineType)}</div><div>${i?v(i.cleaningStatus.replace("_"," ")):"Not Cleaned"}</div><div>${v(i?.notes??"-")}</div><div>${B()}</div></div>`}).join("")}
        </div>
      </article>
    </section>
    `:`
    <section class="grid content full">
      <article class="panel">
        ${R("Add Machine","Create washer and dryer records")}
        <form id="machine-form" class="form">
          <label>Machine Name<input name="machineName" required placeholder="e.g. Washer 5" /></label>
          <label>Type<select name="machineType"><option value="washer">Washer</option><option value="dryer">Dryer</option></select></label>
          <label>Status<select name="status"><option value="available">Available</option><option value="under_cleaning">Under Cleaning</option><option value="maintenance">Maintenance</option></select></label>
          <input type="hidden" name="branch" value="${v(a)}" />
          <button class="primary" type="submit">Add machine</button>
        </form>
      </article>
      <article class="panel">
        ${R("Machines","Washer and dryer status")}
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
  `}function za(e,t){return`
    <section class="grid">
      <div class="page-head">
        <div>
          <p class="eyebrow">Team Management</p>
          <h2>Staff Overview</h2>
        </div>
        <button class="primary" id="open-add-staff-modal" type="button">+ Add staff</button>
      </div>

      <article class="panel">
        ${R("Staff list","Branch: "+v(t))}
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
  `}function Za(e,t,a){return`
    <section class="grid content full">
      <article class="panel">
        ${R("Settings","Device-local configuration")}
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
  `}function er(){const e=()=>{localStorage.removeItem(ue),o.currentUser=null,o.tab="dashboard",o.receiptOrderId=0,o.sidebarOpen=!1,E()};document.querySelector("#logout-button")?.addEventListener("click",e),document.querySelector("#mobile-logout-button")?.addEventListener("click",e),document.querySelector("#mobile-menu-button")?.addEventListener("click",()=>{o.sidebarOpen=!0,E()}),document.querySelector("#sidebar-close-button")?.addEventListener("click",()=>{o.sidebarOpen=!1,E()}),document.querySelector("#sidebar-backdrop")?.addEventListener("click",()=>{o.sidebarOpen=!1,E()}),document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{o.tab=t.dataset.tab,o.receiptOrderId=0,o.sidebarOpen=!1,E()})}),document.querySelectorAll("[data-quick-tab]").forEach(t=>{t.addEventListener("click",()=>{o.tab=t.dataset.quickTab,E()})}),document.querySelectorAll("[data-receipt]").forEach(t=>{t.addEventListener("click",()=>{o.receiptOrderId=Number(t.dataset.receipt),o.printerPanelOpen=!1,o.printerError="",o.printerStatus="",E()})}),document.querySelector("[data-close-receipt]")?.addEventListener("click",()=>{o.receiptOrderId=0,E()}),document.querySelector("[data-open-printer-panel]")?.addEventListener("click",()=>{o.printerPanelOpen=!o.printerPanelOpen,o.printerPanelOpen&&o.pairedPrinters.length===0?Je():E()}),document.querySelector("[data-refresh-printers]")?.addEventListener("click",()=>{Je()}),document.querySelector("[data-printer-select]")?.addEventListener("change",t=>{o.selectedPrinterAddress=t.currentTarget.value,E()}),document.querySelector("[data-paper-width]")?.addEventListener("change",t=>{o.printerPaperWidth=Number(t.currentTarget.value)===80?80:58,E()}),document.querySelector("[data-connect-printer]")?.addEventListener("click",()=>{Ha()}),document.querySelector("[data-thermal-print]")?.addEventListener("click",()=>{(async()=>{const t=await bt(),a=t.orders.find(n=>n.id===o.receiptOrderId);if(!a)throw new Error("Receipt order not found.");const r=t.payments.filter(n=>n.orderId===a.id);await Xa(a,r)})().catch(t=>{o.printerPanelOpen=!0,o.printerError=t instanceof Error?t.message:"Bluetooth thermal print failed.",E()})}),document.querySelectorAll("[data-report-tab]").forEach(t=>{t.addEventListener("click",()=>{o.dailyReportTab=t.dataset.reportTab,E()})}),document.querySelectorAll("[data-maintenance-tab]").forEach(t=>{t.addEventListener("click",()=>{o.maintenanceTab=t.dataset.maintenanceTab,E()})})}function tr(){ka(),document.querySelector("#login-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget),a=document.querySelector("#login-button");a&&(a.disabled=!0,a.textContent="Signing in...");try{const r=await ct(String(t.get("email")??""),String(t.get("password")??""));if(!r){o.loginError="Invalid email or password.",await E();return}o.currentUser=r,o.loginError="",await ge("branch",String(r.branch||"Main Store")),t.get("remember")?localStorage.setItem(ue,JSON.stringify({email:r.email,remembered:!0})):localStorage.removeItem(ue),Et().includes(o.tab)||(o.tab="dashboard"),await E()}catch(r){alert("Login Error: "+String(r?.message||r)),a&&(a.disabled=!1,a.textContent="Sign in")}})}function ar(){fe&&window.clearInterval(fe);const e=document.querySelector("[data-navbar-time]"),t=document.querySelector("[data-navbar-date]");if(!e||!t){fe=void 0;return}const a=()=>{const r=xa();e.textContent=r.time,t.textContent=r.date};a(),fe=window.setInterval(a,1e3)}function ze(e,t){return e?t.find(a=>a.name.toLowerCase()===e.category.toLowerCase())??t.find(a=>a.name==="Regular Clothes")??t[0]??null:null}function Ze(e,t){return Math.max(1,Number(t.maxKg||e.maxKg||1))}function wt(e,t){return Object.fromEntries(t.filter(a=>a.serviceType==="order").map(a=>[a.id,Number(e.querySelector(`input[name="serviceQty-${a.id}"]`)?.value??0)]).filter(([,a])=>Number(a)>0))}function et(e,t){const a=wt(e,t);return t.filter(r=>r.serviceType==="order"&&Number(a[r.id]??0)>0).map(r=>({...r,quantity:Number(a[r.id])}))}function Tt(e,t){return Object.fromEntries(t.filter(a=>a.serviceType==="addon").map(a=>[a.id,Number(e.querySelector(`input[name="addonQty-${a.id}"]`)?.value??0)]).filter(([,a])=>Number(a)>0))}function tt(e,t){const a=Tt(e,t);return t.filter(r=>r.serviceType==="addon"&&Number(a[r.id]??0)>0).map(r=>({...r,quantity:Number(a[r.id])}))}function rr(e){const t=document.querySelector("#order-form"),a=document.querySelector("#price-preview"),r=t?.querySelector('button[type="submit"]'),n=t?.querySelector('select[name="customerId"]'),s=t?.querySelector('input[name="customerName"]'),i=t?.querySelector('input[name="customerPhone"]'),c=t?.querySelector("[data-order-error]"),l=t?.querySelector('select[name="paymentMethod"]'),d=t?.querySelector(".gcash-reference"),p=t?.querySelector('input[name="paymentReference"]'),u=()=>{if(!n||!s||!i)return;const y=n.selectedOptions[0];s.value=y?.dataset.name??"",i.value=y?.dataset.phone??""},f=()=>{const y=l?.value==="gcash";d&&(d.hidden=!y),p&&(p.required=y,y||(p.value=""))},m=(y,b)=>{if(!t)return;const w=t.querySelector(`input[name="${y}"]`);w&&(w.value=String(Math.max(0,Number(w.value||0)+b)),w.closest(".qty-card")?.classList.toggle("is-selected",Number(w.value)>0),w.dispatchEvent(new Event("input",{bubbles:!0})))};t?.querySelectorAll(".qty-control input").forEach(y=>{y.addEventListener("input",()=>{y.value=String(Math.max(0,Number(y.value||0))),y.closest(".qty-card")?.classList.toggle("is-selected",Number(y.value)>0)})}),t?.querySelectorAll("[data-qty-card]").forEach(y=>{y.addEventListener("click",b=>{const w=b.target;w.closest("input")||w.closest("button")||m(y.dataset.qtyCard??"",1)})}),t?.querySelectorAll("[data-qty-plus]").forEach(y=>{y.addEventListener("click",()=>m(y.dataset.qtyPlus??"",1))}),t?.querySelectorAll("[data-qty-minus]").forEach(y=>{y.addEventListener("click",()=>m(y.dataset.qtyMinus??"",-1))});const g=()=>{if(!t||!a)return;const y=et(t,e.services),b=y[0],w=ze(b,e.categories),T=tt(t,e.services);if(!y.length||!b||!w){r&&(r.disabled=!0),c&&(c.hidden=!1,c.textContent="Please select at least one service quantity."),a.innerHTML='<div class="preview-total"><span>Total amount</span><strong>PHP 0.00</strong></div>';return}const A=dt(y,w,Ze(b,w),T),x=A.serviceLines.map(q=>`${q.name} x${q.quantity}`),M=A.extras.map(q=>`${V(q.name)} x${q.quantity}`);r&&(r.disabled=!1),c&&(c.hidden=!0,c.textContent=""),a.classList.remove("has-error"),a.innerHTML=`
      <div class="preview-line"><span>Services${x.length?` (${v(x.join(", "))})`:""}</span><strong>${$(A.price)}</strong></div>
      ${A.extraServiceAmount>0?`<div class="preview-line"><span>Extra services${M.length?` (${v(M.join(", "))})`:""}</span><strong>${$(A.extraServiceAmount)}</strong></div>`:""}
      <div class="preview-total"><span>Total amount</span><strong>${$(A.totalAmount)}</strong></div>
    `};n?.addEventListener("change",u),l?.addEventListener("change",f),f(),t?.addEventListener("input",g),t?.addEventListener("change",g),g(),t?.addEventListener("submit",async y=>{y.preventDefault();const b=new FormData(t),w=et(t,e.services),T=w[0],A=ze(T,e.categories);if(tt(t,e.services),!w.length){c&&(c.hidden=!1,c.textContent="Please select at least one service quantity.");return}try{await la({customerId:Number(b.get("customerId"))||void 0,customerName:String(b.get("customerName")??""),customerPhone:String(b.get("customerPhone")??"")||null,serviceQuantities:wt(t,e.services),branch:e.branch,itemCategoryId:A?.id,weightKg:T&&A?Ze(T,A):void 0,addonQuantities:Tt(t,e.services),paidAmount:Number(b.get("paidAmount")??0),paymentMethod:String(b.get("paymentMethod")??"cash"),paymentReference:String(b.get("paymentReference")??"")||null,notes:String(b.get("notes")??"")||null}),await E()}catch(x){c&&(c.hidden=!1,c.textContent=x instanceof Error?x.message:"Order could not be saved.")}}),document.querySelectorAll(".advance-form").forEach(y=>{y.addEventListener("submit",async b=>{b.preventDefault();const w=new FormData(y);await ua(Number(y.dataset.orderId),Number(w.get("assignedStaffId"))||null),await E()})}),document.querySelectorAll(".payment-form").forEach(y=>{const b=y.querySelector('select[name="method"]'),w=y.querySelector('input[name="reference"]'),T=()=>{const A=b?.value==="gcash";w&&(w.hidden=!A,w.required=A,A||(w.value=""))};b?.addEventListener("change",T),T(),y.addEventListener("submit",async A=>{A.preventDefault();const x=new FormData(y);await mt(Number(y.dataset.orderId),{amount:Number(x.get("amount")),method:String(x.get("method")),reference:String(x.get("reference")??"")||null}),await E()})}),document.querySelectorAll("[data-cancel-order]").forEach(y=>{y.addEventListener("click",async()=>{const b=Number(y.dataset.cancelOrder);if(Number.isFinite(b)&&confirm("Cancel this order? (No payment will be refunded.)"))try{o.receiptOrderId===b&&(o.receiptOrderId=0),await va(b),await E()}catch(w){alert(w instanceof Error?w.message:"Cancel failed.")}})}),document.querySelectorAll("[data-delete-order]").forEach(y=>{y.addEventListener("click",async()=>{const b=Number(y.dataset.deleteOrder);if(Number.isFinite(b)&&confirm("Delete this paid order and update sales?"))try{o.receiptOrderId===b&&(o.receiptOrderId=0),await pa(b),await E()}catch(w){alert(w instanceof Error?w.message:"Delete failed.")}})})}function nr(e){document.querySelector("#service-form")?.addEventListener("submit",async t=>{t.preventDefault();const a=new FormData(t.currentTarget),r=a.get("id")?Number(a.get("id")):void 0;await Ke({id:r,name:String(a.get("name")??""),description:String(a.get("description")??"")||null,category:String(a.get("category")??""),serviceType:String(a.get("serviceType")??"order"),price:Number(a.get("price")??0),maxKg:Number(a.get("maxKg")??0),dryingMinutes:Number(a.get("dryingMinutes"))||null,includes:a.getAll("includes").map(String).filter(Boolean),additionalCharge:0,turnaroundHours:Number(a.get("turnaroundHours")??24),isActive:1}),await E()}),document.querySelectorAll(".edit-service-btn").forEach(t=>{t.addEventListener("click",()=>{const a=Number(t.dataset.id),r=e.find(s=>s.id===a),n=document.querySelector("#service-form");r&&n&&(n.querySelector("[name=id]").value=String(r.id),n.querySelector("[name=name]").value=r.name,n.querySelector("[name=category]").value=r.category,n.querySelector("[name=serviceType]").value=r.serviceType,n.querySelector("[name=price]").value=String(r.price),n.querySelector("[name=maxKg]").value=String(r.maxKg),n.querySelector("[name=dryingMinutes]").value=r.dryingMinutes?String(r.dryingMinutes):"",n.querySelectorAll('input[name="includes"]').forEach(s=>{s.checked=r.includes.includes(s.value)}),n.querySelector("[name=turnaroundHours]").value=String(r.turnaroundHours),n.querySelector("[name=description]").value=r.description??"",window.scrollTo({top:0,behavior:"smooth"}))})}),document.querySelectorAll(".deactivate-service-btn, .activate-service-btn").forEach(t=>{t.addEventListener("click",async()=>{const a=Number(t.dataset.id),r=e.find(n=>n.id===a);if(r){const n=r.isActive?0:1;await Ke({id:r.id,name:r.name,description:r.description,category:r.category,serviceType:r.serviceType,price:r.price,maxKg:r.maxKg,dryingMinutes:r.dryingMinutes,includes:r.includes,additionalCharge:r.additionalCharge,turnaroundHours:r.turnaroundHours,isActive:n}),await E()}})}),document.querySelector("#category-form")?.addEventListener("submit",async t=>{t.preventDefault();const a=new FormData(t.currentTarget);await oa({name:String(a.get("name")??""),maxKg:Number(a.get("maxKg")??0),additionalFee:Number(a.get("additionalFee")??0),isActive:1}),await E()})}function sr(){document.querySelector("#expense-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await Ea({expenseDate:String(t.get("expenseDate")??""),name:String(t.get("name")??""),category:String(t.get("category")??""),description:String(t.get("description")??""),amount:Number(t.get("amount")??0)}),await E()}),document.querySelector("#fold-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await ya({orderTicket:String(t.get("orderTicket")??""),staffName:String(t.get("staffName")??""),foldCount:Number(t.get("foldCount")??1),rate:Number(t.get("rate")??5)}),await E()})}function ir(e,t,a,r,n){document.querySelector("#generate-report")?.addEventListener("click",()=>{o.reportPreview=ye(),E()}),document.querySelector("#sales-form")?.addEventListener("submit",async f=>{f.preventDefault();const m=new FormData(f.currentTarget);await wa({saleDate:String(m.get("saleDate")??""),cashAmount:Number(m.get("cashAmount")??0),gcashAmount:Number(m.get("gcashAmount")??0),notes:String(m.get("notes")??"")}),await E()});const s=document.querySelector("[data-date-from]"),i=document.querySelector("[data-date-to]");document.querySelectorAll("[data-date-scope]").forEach(f=>{f.addEventListener("change",()=>{if(!f.checked||!s||!i)return;const m=new Date,g=me(m),y=new Date(m);f.value==="week"&&y.setDate(m.getDate()-6),f.value==="month"&&y.setDate(1),f.value!=="custom"&&(s.value=f.value==="today"?g:me(y),i.value=g)})});const c=f=>{const m=b=>String(b??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;"),g=b=>b==="Sales Report"?[110,125,150,215,95,95,105,105]:b==="Disbursement"?[110,115,150,220,105]:b==="Fold Count"?[220,125]:b==="Revolving Daily Summary"?[115,105,120,115]:b==="Revolving History"?[115,96,140,96,110,180,120]:[155,125,125,125,95,95,115,115];return`<?xml version="1.0"?>
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
  ${f.map(b=>{const w=g(b.name).map(A=>`<Column ss:Width="${A}" ss:AutoFitWidth="0"/>`).join(""),T=b.rows.map(A=>{if(!A.length)return'<Row ss:Height="10" ss:StyleID="BorderRow"><Cell ss:StyleID="BorderCell"><Data ss:Type="String">&nbsp;</Data></Cell></Row>';const x=A[0]==="Type"||A[0]==="Summary"||A[0]==="Sales Summary"||A[0]==="Disbursement Summary"||A[0]==="Staff"||A[0]==="Date of Sales"||A[0]==="Date",M=x?"HeaderRow":"BorderRow",q=x?"HeaderCell":"BorderCell",z=x?26:22,D=A.map(I=>`<Cell ss:StyleID="${q}"><Data ss:Type="${typeof I=="number"?"Number":"String"}">${m(I)}</Data></Cell>`).join("");return`<Row ss:Height="${z}" ss:StyleID="${M}">${D}</Row>`}).join("");return`
        <Worksheet ss:Name="${m(b.name)}">
          <Table>
            ${w}
            ${T}
          </Table>
        </Worksheet>`}).join("")}
</Workbook>`},l=()=>{const f=ye(),m=gt(e,t,a,r,n,f),g=[];m.selectedTypes.has("sales")&&g.push({name:"Sales Report",rows:m.salesRows().rows}),m.selectedTypes.has("disbursement")&&g.push({name:"Disbursement",rows:m.disbursementRows().rows}),m.selectedTypes.has("fold_count")&&g.push({name:"Fold Count",rows:m.foldCountRows().rows}),m.selectedTypes.has("revolving_fund")&&(g.push({name:"Revolving Daily Summary",rows:m.revolvingDailySummaryRows().rows}),g.push({name:"Revolving History",rows:m.revolvingHistoryRows().rows})),m.selectedTypes.has("summary")&&g.push({name:"Summary",rows:m.summaryRows()});const y=c(g.length?g:[{name:"Summary",rows:m.summaryRows()}]),b=`laba101-report-${f.from}-to-${f.to}.xls`;return new File([y],b,{type:"application/vnd.ms-excel"})},d=async()=>{const f=l();if(!L.isNativePlatform())return{fileName:f.name,uri:""};const m=await f.text(),g=f.name;await je.writeFile({path:g,data:m,directory:be.External,encoding:Ce.UTF8});const{uri:y}=await je.getUri({path:g,directory:be.External});return{fileName:f.name,uri:y}},p=()=>{const f=l(),m=ye(),g=`laba101-report-${m.from}-to-${m.to}.xls`,y=f,b=URL.createObjectURL(y),w=document.createElement("a");return w.href=b,w.download=g,document.body.appendChild(w),w.click(),setTimeout(()=>{w.remove(),URL.revokeObjectURL(b)},1e3),g},u=async f=>{const m=document.querySelector(f==="export"?"#export-report":"#email-report");m&&(m.disabled=!0,m.textContent=f==="export"?"Exporting...":"Sending...");try{if(f==="export")if(L.isNativePlatform()){const g=await d();alert(`Report exported as "${g.fileName}".`)}else{const g=p();alert(`Report saved: ${g}`)}else{const g=await it("report_email")||"";if(!g){alert("Please configure a report email in Settings first.");return}const y=ye(),b=`Laba101 report ${y.from} to ${y.to}`;if(L.isNativePlatform()){const w=await d();try{await Mt.share({title:b,text:`Please find the attached Laba101 report file: ${w.fileName}`,files:[w.uri],dialogTitle:"Send report via email"}),alert(`Report saved and shared as "${w.fileName}".`)}catch(T){const A=String(T).toLowerCase();if(A.includes("share canceled")||A.includes("canceled"))alert(`Report saved as "${w.fileName}".`);else throw T}}else{const w=p(),T=`Hi,

Please find the attached Laba101 report file: ${w}

Date range: ${y.from} to ${y.to}`,A=`mailto:${g}?subject=${encodeURIComponent(b)}&body=${encodeURIComponent(T)}`;setTimeout(()=>{window.location.href=A},800),alert(`Report downloaded as "${w}".
Your email app will open — please attach the file and send.`)}}}catch(g){alert("Failed: "+String(g))}finally{m&&(m.disabled=!1,m.textContent=f==="export"?"Export Excel":"Send to Email")}};document.querySelector("#export-report")?.addEventListener("click",async()=>{await u("export")}),document.querySelector("#email-report")?.addEventListener("click",async()=>{await u("email")})}function or(){document.querySelector("#order-queue-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);o.orderSearch=String(t.get("orderSearch")??"").trim(),o.orderDateFilter=String(t.get("orderDateFilter")??"").trim(),o.orderPaymentFilter=String(t.get("orderPaymentFilter")??"").trim(),E()}),document.querySelector("#order-queue-clear")?.addEventListener("click",()=>{o.orderSearch="",o.orderDateFilter="",o.orderPaymentFilter="",E()}),document.querySelector("#archived-order-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);o.archivedOrderSearch=String(t.get("archivedOrderSearch")??"").trim(),E()}),document.querySelector("#archived-order-clear")?.addEventListener("click",()=>{o.archivedOrderSearch="",E()})}function cr(){document.querySelector("#customer-search-form")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);o.customerSearch=String(t.get("customerSearch")??"").trim(),E()}),document.querySelector("#customer-search-clear")?.addEventListener("click",()=>{o.customerSearch="",E()})}function lr(){document.querySelector("#machine-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await Na({machineName:String(t.get("machineName")??""),machineType:String(t.get("machineType")),status:String(t.get("status")),branch:String(t.get("branch")??"")}),await E()}),document.querySelector("#subcleaning-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=e.currentTarget.querySelector('button[type="submit"]');t&&(t.disabled=!0,t.textContent="Starting...");const a=new FormData(e.currentTarget),r=a.getAll("machineIds").map(Number);if(!r.length){alert("Please select at least one machine to clean."),t&&(t.disabled=!1,t.textContent="Start Cleaning");return}await Ca({date:String(a.get("date")??""),machineIds:r,cleaningStatus:String(a.get("cleaningStatus")??""),notes:String(a.get("notes")??""),branch:String(a.get("branch")??"")}),await E()}),document.querySelectorAll(".complete-cleaning-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.machineId),a=e.dataset.branch??"";e.disabled=!0,e.textContent="Completing...",await $a(t,a),await E()})}),document.querySelectorAll(".deactivate-machine-btn, .activate-machine-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.id),a=e.classList.contains("deactivate-machine-btn");await Aa(t,a?"inactive":"available"),await E()})})}function dr(e){const t=document.querySelector("#add-staff-modal"),a=document.querySelector("#open-add-staff-modal"),r=document.querySelector("#close-add-staff-modal"),n=document.querySelector("#staff-form"),s=()=>{n?.reset(),n&&(n.querySelector("[name=id]").value="");const c=document.querySelector("#add-staff-title");c&&(c.textContent="Add staff member"),t?.removeAttribute("hidden")},i=()=>{t?.setAttribute("hidden",""),n?.reset()};a?.addEventListener("click",s),r?.addEventListener("click",i),t?.addEventListener("click",c=>{c.target===t&&i()}),document.querySelectorAll(".edit-staff-btn").forEach(c=>{c.addEventListener("click",()=>{const l=Number(c.dataset.id),d=e.find(p=>p.id===l);if(d&&n){n.querySelector("[name=id]").value=String(d.id),n.querySelector("[name=name]").value=d.name,n.querySelector("[name=email]").value=d.email,n.querySelector("[name=password]").value=d.password,n.querySelector("[name=role]").value=d.role,n.querySelector("[name=branch]").value=d.branch;const p=document.querySelector("#add-staff-title");p&&(p.textContent="Edit staff member"),t?.removeAttribute("hidden")}})}),document.querySelectorAll(".deactivate-staff-btn, .activate-staff-btn").forEach(c=>{c.addEventListener("click",async()=>{const l=Number(c.dataset.id),d=e.find(p=>p.id===l);d&&(await Xe(l,{isActive:d.isActive!==0?0:1}),await E())})}),n?.addEventListener("submit",async c=>{c.preventDefault();const l=document.querySelector("#staff-save-btn");l&&(l.disabled=!0,l.textContent="Saving...");const d=new FormData(n),p=d.get("id")?Number(d.get("id")):void 0,u=String(d.get("name")??"").trim(),f=String(d.get("email")??"").trim(),m=String(d.get("password")??"password")||"password",g=String(d.get("role")),y=String(d.get("branch")??"");if(!u||!f){alert("Name and email are required."),l&&(l.disabled=!1,l.textContent="Save staff member");return}try{p?await Xe(p,{name:u,email:f,password:m,role:g,branch:y}):await ra({name:u,email:f,password:m,role:g,branch:y}),i(),await E()}catch{alert("Failed to save staff. The email may already be in use."),l&&(l.disabled=!1,l.textContent="Save staff member")}})}function ur(){document.querySelector("#settings-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await ge("branch",String(t.get("branch")??"Main Store")),await ge("fold_rate",String(t.get("foldRate")??"5")),String(t.get("reportEmail")??"")&&await ge("report_email",String(t.get("reportEmail"))),alert("Settings saved successfully!"),await E()})}await ea();const at=localStorage.getItem(ue);if(at)try{const e=JSON.parse(at);if(e.email&&e.remembered){const t=await ct(e.email,"password")??null;o.currentUser=t}}catch{localStorage.removeItem(ue)}function mr(e,t,a,r){const n=e.filter(m=>m.status==="revolving").reduce((m,g)=>m+g.cashAmount,0),s=t.filter(m=>m.type==="add").reduce((m,g)=>m+g.amount,0),i=t.filter(m=>m.type==="disbursement").reduce((m,g)=>m+g.amount,0),c=n+s-i,l=o.revolvingHistoryFrom||"0000-01-01",d=o.revolvingHistoryTo||"9999-12-31",p=t.filter(m=>{const g=_(m.createdAt);return g>=l&&g<=d}),u=e.map(m=>{const g=ht(m.saleDate,a,r,m.cashAmount),y=m.status==="revolving"?'<span class="ok">Revolving</span>':m.status==="endorsed"?`<span class="warn">Endorsed to ${v(m.endorsedTo)}</span>`:'<span class="meta">Pending</span>',b=m.status!=="revolving"&&m.status!=="endorsed"?`<div class="row-actions">
          <button class="primary revolving-btn" data-id="${m.id}">Revolving</button>
          <button class="secondary endorsed-btn" data-id="${m.id}" data-date="${te(m.saleDate)}">Endorsed</button>
        </div>`:"";return[`<strong>${v(te(m.saleDate))}</strong>`,`<strong class="ok">${$(g)}</strong>`,y,m.statusUpdatedAt?v(te(m.statusUpdatedAt)):"-",b]}),f=p.map(m=>[Pa(m.createdAt),`<strong>${v(m.revolvingNumber)}</strong>`,v(m.name),`<strong class="${m.type==="disbursement"?"warn":"ok"}">${m.type==="disbursement"?"-":"+"}${$(m.amount)}</strong>`,v(m.category),v(m.description||"-"),`<span class="${m.type==="add"?"ok":"warn"}">${m.type==="add"?"Add Revolving Fund":"Disbursement"}</span>`]);return`
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
        ${R("Daily Summary","Cash on hand per day (order cash + manual cash − disbursements)")}
        ${we(["Date of Sales","Cash on Hand","Status","Date Update","Action"],u,"data-table revolving-summary-datatable")}
      </article>

      <article class="panel">
        ${R("Revolving Table History","Filter by date — DISB numbers shared with Daily Report expenses")}
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
        ${we(["Date","Disbursement #","Name","Amount","Category","Description","Type"],f,"data-table revolving-history-datatable")}
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
  `}function vr(){document.querySelector("#revolving-history-filters")?.addEventListener("submit",async p=>{p.preventDefault();const u=new FormData(p.currentTarget);o.revolvingHistoryFrom=String(u.get("revolvingHistoryFrom")??"").trim(),o.revolvingHistoryTo=String(u.get("revolvingHistoryTo")??"").trim(),await E()}),document.querySelector("#revolving-history-clear")?.addEventListener("click",async()=>{o.revolvingHistoryFrom="",o.revolvingHistoryTo="",await E()}),document.querySelectorAll(".revolving-btn").forEach(p=>{p.addEventListener("click",async()=>{o.revolvingModalOpen=!0,o.revolvingSaleId=Number(p.dataset.id),await E()})});const e=document.getElementById("confirm-revolving-btn");e&&e.addEventListener("click",async()=>{await Ve(o.revolvingSaleId,"revolving",null,new Date().toISOString()),o.revolvingModalOpen=!1,await E()});const t=document.getElementById("close-revolving-modal");t&&t.addEventListener("click",async()=>{o.revolvingModalOpen=!1,await E()}),document.querySelectorAll(".endorsed-btn").forEach(p=>{p.addEventListener("click",async()=>{o.endorseModalOpen=!0,o.endorseSaleId=Number(p.dataset.id),o.endorseSaleDate=p.dataset.date??"",await E()})});const a=document.getElementById("close-endorse-modal");a&&a.addEventListener("click",async()=>{o.endorseModalOpen=!1,await E()});const r=document.getElementById("endorse-form");r&&r.addEventListener("submit",async p=>{p.preventDefault();const u=new FormData(r),f=String(u.get("endorsedTo")??"").trim();f&&(await Ve(o.endorseSaleId,"endorsed",f,new Date().toISOString()),o.endorseModalOpen=!1,await E())});const n=document.getElementById("add-revolving-fund-btn");n&&n.addEventListener("click",async()=>{o.addFundModalOpen=!0,await E()});const s=document.getElementById("close-add-fund-modal");s&&s.addEventListener("click",async()=>{o.addFundModalOpen=!1,await E()});const i=document.getElementById("add-fund-form");i&&i.addEventListener("submit",async p=>{p.preventDefault();const u=new FormData(i);await Ye({name:String(u.get("name")??"").trim(),amount:Number(u.get("amount")??0),category:"Add Revolving Fund",description:null,type:"add",createdAt:new Date().toISOString()}),o.addFundModalOpen=!1,await E()});const c=document.getElementById("revolving-disbursement-btn");c&&c.addEventListener("click",async()=>{o.disbursementModalOpen=!0,await E()});const l=document.getElementById("close-disbursement-modal");l&&l.addEventListener("click",async()=>{o.disbursementModalOpen=!1,await E()});const d=document.getElementById("disbursement-form");d&&d.addEventListener("submit",async p=>{p.preventDefault();const u=new FormData(d);await Ye({name:String(u.get("name")??"").trim(),amount:Number(u.get("amount")??0),category:String(u.get("category")??"").trim(),description:String(u.get("description")??"").trim(),type:"disbursement",expenseDate:B(),createdAt:new Date().toISOString()}),o.disbursementModalOpen=!1,await E()})}await E();export{Ce as E,Re as W,Pt as b};
