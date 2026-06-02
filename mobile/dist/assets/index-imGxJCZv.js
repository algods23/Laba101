(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=a(n);fetch(n.href,r)}})();var Z;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(Z||(Z={}));class Ae extends Error{constructor(t,a,s){super(t),this.message=t,this.code=a,this.data=s}}const wt=e=>{var t,a;return e?.androidBridge?"android":!((a=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},Tt=e=>{const t=e.CapacitorCustomPlatform||null,a=e.Capacitor||{},s=a.Plugins=a.Plugins||{},n=()=>t!==null?t.name:wt(e),r=()=>n()!=="web",i=d=>{const f=l.get(d);return!!(f?.platforms.has(n())||o(d))},o=d=>{var f;return(f=a.PluginHeaders)===null||f===void 0?void 0:f.find(p=>p.name===d)},c=d=>e.console.error(d),l=new Map,v=(d,f={})=>{const p=l.get(d);if(p)return console.warn(`Capacitor plugin "${d}" already registered. Cannot register plugins twice.`),p.proxy;const g=n(),y=o(d);let b;const T=async()=>(!b&&g in f?b=typeof f[g]=="function"?b=await f[g]():b=f[g]:t!==null&&!b&&"web"in f&&(b=typeof f.web=="function"?b=await f.web():b=f.web),b),E=(O,I)=>{var U,W;if(y){const h=y?.methods.find(x=>I===x.name);if(h)return h.rtype==="promise"?x=>a.nativePromise(d,I.toString(),x):(x,z)=>a.nativeCallback(d,I.toString(),x,z);if(O)return(U=O[I])===null||U===void 0?void 0:U.bind(O)}else{if(O)return(W=O[I])===null||W===void 0?void 0:W.bind(O);throw new Ae(`"${d}" plugin is not implemented on ${g}`,Z.Unimplemented)}},N=O=>{let I;const U=(...W)=>{const h=T().then(x=>{const z=E(x,O);if(z){const de=z(...W);return I=de?.remove,de}else throw new Ae(`"${d}.${O}()" is not implemented on ${g}`,Z.Unimplemented)});return O==="addListener"&&(h.remove=async()=>I()),h};return U.toString=()=>`${O.toString()}() { [capacitor code] }`,Object.defineProperty(U,"name",{value:O,writable:!1,configurable:!1}),U},P=N("addListener"),B=N("removeListener"),q=(O,I)=>{const U=P({eventName:O},I),W=async()=>{const x=await U;B({eventName:O,callbackId:x},I)},h=new Promise(x=>U.then(()=>x({remove:W})));return h.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await W()},h},V=new Proxy({},{get(O,I){switch(I){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return y?q:P;case"removeListener":return B;default:return N(I)}}});return s[d]=V,l.set(d,{name:d,proxy:V,platforms:new Set([...Object.keys(f),...y?[g]:[]])}),V};return a.convertFileSrc||(a.convertFileSrc=d=>d),a.getPlatform=n,a.handleError=c,a.isNativePlatform=r,a.isPluginAvailable=i,a.registerPlugin=v,a.Exception=Ae,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},Nt=e=>e.Capacitor=Tt(e),A=Nt(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),re=A.registerPlugin;class Re{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,a){let s=!1;this.listeners[t]||(this.listeners[t]=[],s=!0),this.listeners[t].push(a);const r=this.windowListeners[t];r&&!r.registered&&this.addWindowListener(r),s&&this.sendRetainedArgumentsForEvent(t);const i=async()=>this.removeListener(t,a);return Promise.resolve({remove:i})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,a,s){const n=this.listeners[t];if(!n){if(s){let r=this.retainedEventArguments[t];r||(r=[]),r.push(a),this.retainedEventArguments[t]=r}return}n.forEach(r=>r(a))}hasListeners(t){var a;return!!(!((a=this.listeners[t])===null||a===void 0)&&a.length)}registerWindowListener(t,a){this.windowListeners[a]={registered:!1,windowEventName:t,pluginEventName:a,handler:s=>{this.notifyListeners(a,s)}}}unimplemented(t="not implemented"){return new A.Exception(t,Z.Unimplemented)}unavailable(t="not available"){return new A.Exception(t,Z.Unavailable)}async removeListener(t,a){const s=this.listeners[t];if(!s)return;const n=s.indexOf(a);this.listeners[t].splice(n,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const a=this.retainedEventArguments[t];a&&(delete this.retainedEventArguments[t],a.forEach(s=>{this.notifyListeners(t,s)}))}}const ke=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Ue=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class At extends Re{async getCookies(){const t=document.cookie,a={};return t.split(";").forEach(s=>{if(s.length<=0)return;let[n,r]=s.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");n=Ue(n).trim(),r=Ue(r).trim(),a[n]=r}),a}async setCookie(t){try{const a=ke(t.key),s=ke(t.value),n=t.expires?`; expires=${t.expires.replace("expires=","")}`:"",r=(t.path||"/").replace("path=",""),i=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${a}=${s||""}${n}; path=${r}; ${i};`}catch(a){return Promise.reject(a)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const a of t)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}re("CapacitorCookies",{web:()=>new At});const Lt=async e=>new Promise((t,a)=>{const s=new FileReader;s.onload=()=>{const n=s.result;t(n.indexOf(",")>=0?n.split(",")[1]:n)},s.onerror=n=>a(n),s.readAsDataURL(e)}),Ct=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(n=>n.toLocaleLowerCase()).reduce((n,r,i)=>(n[r]=e[t[i]],n),{})},$t=(e,t=!0)=>e?Object.entries(e).reduce((s,n)=>{const[r,i]=n;let o,c;return Array.isArray(i)?(c="",i.forEach(l=>{o=t?encodeURIComponent(l):l,c+=`${r}=${o}&`}),c.slice(0,-1)):(o=t?encodeURIComponent(i):i,c=`${r}=${o}`),`${s}&${c}`},"").substr(1):null,Rt=(e,t={})=>{const a=Object.assign({method:e.method||"GET",headers:e.headers},t),n=Ct(e.headers)["content-type"]||"";if(typeof e.data=="string")a.body=e.data;else if(n.includes("application/x-www-form-urlencoded")){const r=new URLSearchParams;for(const[i,o]of Object.entries(e.data||{}))r.set(i,o);a.body=r.toString()}else if(n.includes("multipart/form-data")||e.data instanceof FormData){const r=new FormData;if(e.data instanceof FormData)e.data.forEach((o,c)=>{r.append(c,o)});else for(const o of Object.keys(e.data))r.append(o,e.data[o]);a.body=r;const i=new Headers(a.headers);i.delete("content-type"),a.headers=i}else(n.includes("application/json")||typeof e.data=="object")&&(a.body=JSON.stringify(e.data));return a};class xt extends Re{async request(t){const a=Rt(t,t.webFetchExtra),s=$t(t.params,t.shouldEncodeUrlParams),n=s?`${t.url}?${s}`:t.url,r=await fetch(n,a),i=r.headers.get("content-type")||"";let{responseType:o="text"}=r.ok?t:{};i.includes("application/json")&&(o="json");let c,l;switch(o){case"arraybuffer":case"blob":l=await r.blob(),c=await Lt(l);break;case"json":c=await r.json();break;default:c=await r.text()}const v={};return r.headers.forEach((d,f)=>{v[f]=d}),{data:c,headers:v,status:r.status,url:r.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}re("CapacitorHttp",{web:()=>new xt});var Me;(function(e){e.Dark="DARK",e.Light="LIGHT",e.Default="DEFAULT"})(Me||(Me={}));var Be;(function(e){e.StatusBar="StatusBar",e.NavigationBar="NavigationBar"})(Be||(Be={}));class Dt extends Re{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}re("SystemBars",{web:()=>new Dt});const Ot="modulepreload",Pt=function(e){return"/"+e},_e={},xe=function(t,a,s){let n=Promise.resolve();if(a&&a.length>0){let c=function(l){return Promise.all(l.map(v=>Promise.resolve(v).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),o=i?.nonce||i?.getAttribute("nonce");n=c(a.map(l=>{if(l=Pt(l),l in _e)return;_e[l]=!0;const v=l.endsWith(".css"),d=v?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const f=document.createElement("link");if(f.rel=v?"stylesheet":Ot,v||(f.as="script"),f.crossOrigin="",f.href=l,o&&f.setAttribute("nonce",o),document.head.appendChild(f),v)return new Promise((p,g)=>{f.addEventListener("load",p),f.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(i){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=i,window.dispatchEvent(o),!o.defaultPrevented)throw i}return n.then(i=>{for(const o of i||[])o.status==="rejected"&&r(o.reason);return t().catch(r)})};function It(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,a){return new Proxy({},{get(s,n){return(r,i,o)=>{const c=e.Capacitor.Plugins[a];if(c===void 0){o(new Error(`Capacitor plugin ${a} not found`));return}if(typeof c[n]!="function"){o(new Error(`Method ${n} not found in Capacitor plugin ${a}`));return}(async()=>{try{const l=await c[n](r);i(l)}catch(l){o(l)}})()}}})}})}function qt(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,a){return e.cordova.plugins[a]}})}function Ft(e=!1){typeof window>"u"||(window.CapacitorUtils=window.CapacitorUtils||{},window.Capacitor!==void 0&&!e?It(window):window.cordova!==void 0&&qt(window))}var ee;(function(e){e.Documents="DOCUMENTS",e.Data="DATA",e.Library="LIBRARY",e.Cache="CACHE",e.External="EXTERNAL",e.ExternalStorage="EXTERNAL_STORAGE",e.ExternalCache="EXTERNAL_CACHE",e.LibraryNoCloud="LIBRARY_NO_CLOUD",e.Temporary="TEMPORARY"})(ee||(ee={}));var ye;(function(e){e.UTF8="utf8",e.ASCII="ascii",e.UTF16="utf16"})(ye||(ye={}));const he=re("Filesystem",{web:()=>xe(()=>import("./web-9qAm6M2V.js"),[]).then(e=>new e.FilesystemWeb)});Ft();const tt=re("Share",{web:()=>xe(()=>import("./web-Bddn8HKW.js"),[]).then(e=>new e.ShareWeb)});class kt{constructor(t){this.sqlite=t,this._connectionDict=new Map}async initWebStore(){try{return await this.sqlite.initWebStore(),Promise.resolve()}catch(t){return Promise.reject(t)}}async saveToStore(t){try{return await this.sqlite.saveToStore({database:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async saveToLocalDisk(t){try{return await this.sqlite.saveToLocalDisk({database:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getFromLocalDiskToStore(t){const a=t??!0;try{return await this.sqlite.getFromLocalDiskToStore({overwrite:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async echo(t){try{const a=await this.sqlite.echo({value:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isSecretStored(){try{const t=await this.sqlite.isSecretStored();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async setEncryptionSecret(t){try{return await this.sqlite.setEncryptionSecret({passphrase:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async changeEncryptionSecret(t,a){try{return await this.sqlite.changeEncryptionSecret({passphrase:t,oldpassphrase:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async clearEncryptionSecret(){try{return await this.sqlite.clearEncryptionSecret(),Promise.resolve()}catch(t){return Promise.reject(t)}}async checkEncryptionSecret(t){try{const a=await this.sqlite.checkEncryptionSecret({passphrase:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async addUpgradeStatement(t,a){try{return t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.addUpgradeStatement({database:t,upgrade:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async createConnection(t,a,s,n,r){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.createConnection({database:t,encrypted:a,mode:s,version:n,readonly:r});const i=new je(t,r,this.sqlite),o=r?`RO_${t}`:`RW_${t}`;return this._connectionDict.set(o,i),Promise.resolve(i)}catch(i){return Promise.reject(i)}}async closeConnection(t,a){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.closeConnection({database:t,readonly:a});const s=a?`RO_${t}`:`RW_${t}`;return this._connectionDict.delete(s),Promise.resolve()}catch(s){return Promise.reject(s)}}async isConnection(t,a){const s={};t.endsWith(".db")&&(t=t.slice(0,-3));const n=a?`RO_${t}`:`RW_${t}`;return s.result=this._connectionDict.has(n),Promise.resolve(s)}async retrieveConnection(t,a){t.endsWith(".db")&&(t=t.slice(0,-3));const s=a?`RO_${t}`:`RW_${t}`;if(this._connectionDict.has(s)){const n=this._connectionDict.get(s);return typeof n<"u"?Promise.resolve(n):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async getNCDatabasePath(t,a){try{const s=await this.sqlite.getNCDatabasePath({path:t,database:a});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async createNCConnection(t,a){try{await this.sqlite.createNCConnection({databasePath:t,version:a});const s=new je(t,!0,this.sqlite),n=`RO_${t})`;return this._connectionDict.set(n,s),Promise.resolve(s)}catch(s){return Promise.reject(s)}}async closeNCConnection(t){try{await this.sqlite.closeNCConnection({databasePath:t});const a=`RO_${t})`;return this._connectionDict.delete(a),Promise.resolve()}catch(a){return Promise.reject(a)}}async isNCConnection(t){const a={},s=`RO_${t})`;return a.result=this._connectionDict.has(s),Promise.resolve(a)}async retrieveNCConnection(t){if(this._connectionDict.has(t)){const a=`RO_${t})`,s=this._connectionDict.get(a);return typeof s<"u"?Promise.resolve(s):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async isNCDatabase(t){try{const a=await this.sqlite.isNCDatabase({databasePath:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async retrieveAllConnections(){return this._connectionDict}async closeAllConnections(){const t=new Map;try{for(const a of this._connectionDict.keys()){const s=a.substring(3),n=a.substring(0,3)==="RO_";await this.sqlite.closeConnection({database:s,readonly:n}),t.set(a,null)}for(const a of t.keys())this._connectionDict.delete(a);return Promise.resolve()}catch(a){return Promise.reject(a)}}async checkConnectionsConsistency(){try{const t=[...this._connectionDict.keys()],a=[],s=[];for(const r of t)a.push(r.substring(0,2)),s.push(r.substring(3));const n=await this.sqlite.checkConnectionsConsistency({dbNames:s,openModes:a});return n.result||(this._connectionDict=new Map),Promise.resolve(n)}catch(t){return this._connectionDict=new Map,Promise.reject(t)}}async importFromJson(t){try{const a=await this.sqlite.importFromJson({jsonstring:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isJsonValid(t){try{const a=await this.sqlite.isJsonValid({jsonstring:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async copyFromAssets(t){const a=t??!0;try{return await this.sqlite.copyFromAssets({overwrite:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async getFromHTTPRequest(t,a){const s=a??!0;try{return await this.sqlite.getFromHTTPRequest({url:t,overwrite:s}),Promise.resolve()}catch(n){return Promise.reject(n)}}async isDatabaseEncrypted(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const a=await this.sqlite.isDatabaseEncrypted({database:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isInConfigEncryption(){try{const t=await this.sqlite.isInConfigEncryption();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isInConfigBiometricAuth(){try{const t=await this.sqlite.isInConfigBiometricAuth();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isDatabase(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const a=await this.sqlite.isDatabase({database:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async getDatabaseList(){try{const a=(await this.sqlite.getDatabaseList()).values;a.sort();const s={values:a};return Promise.resolve(s)}catch(t){return Promise.reject(t)}}async getMigratableDbList(t){const a=t||"default";try{const s=await this.sqlite.getMigratableDbList({folderPath:a});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async addSQLiteSuffix(t,a){const s=t||"default",n=a||[];try{const r=await this.sqlite.addSQLiteSuffix({folderPath:s,dbNameList:n});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async deleteOldDatabases(t,a){const s=t||"default",n=a||[];try{const r=await this.sqlite.deleteOldDatabases({folderPath:s,dbNameList:n});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async moveDatabasesAndAddSuffix(t,a){const s=t||"default",n=a||[];return this.sqlite.moveDatabasesAndAddSuffix({folderPath:s,dbNameList:n})}}class je{constructor(t,a,s){this.dbName=t,this.readonly=a,this.sqlite=s}getConnectionDBName(){return this.dbName}getConnectionReadOnly(){return this.readonly}async open(){try{return await this.sqlite.open({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async close(){try{return await this.sqlite.close({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async beginTransaction(){try{const t=await this.sqlite.beginTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async commitTransaction(){try{const t=await this.sqlite.commitTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async rollbackTransaction(){try{const t=await this.sqlite.rollbackTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTransactionActive(){try{const t=await this.sqlite.isTransactionActive({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async loadExtension(t){try{return await this.sqlite.loadExtension({database:this.dbName,path:t,readonly:this.readonly}),Promise.resolve()}catch(a){return Promise.reject(a)}}async enableLoadExtension(t){try{return await this.sqlite.enableLoadExtension({database:this.dbName,toggle:t,readonly:this.readonly}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getUrl(){try{const t=await this.sqlite.getUrl({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getVersion(){try{const t=await this.sqlite.getVersion({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getTableList(){try{const t=await this.sqlite.getTableList({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async execute(t,a=!0,s=!0){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const n=await this.sqlite.execute({database:this.dbName,statements:t,transaction:a,readonly:!1,isSQL92:s});return Promise.resolve(n)}}catch(n){return Promise.reject(n)}}async query(t,a,s=!0){let n;try{return a&&a.length>0?n=await this.sqlite.query({database:this.dbName,statement:t,values:a,readonly:this.readonly,isSQL92:!0}):n=await this.sqlite.query({database:this.dbName,statement:t,values:[],readonly:this.readonly,isSQL92:s}),n=await this.reorderRows(n),Promise.resolve(n)}catch(r){return Promise.reject(r)}}async run(t,a,s=!0,n="no",r=!0){let i;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(a&&a.length>0?i=await this.sqlite.run({database:this.dbName,statement:t,values:a,transaction:s,readonly:!1,returnMode:n,isSQL92:!0}):i=await this.sqlite.run({database:this.dbName,statement:t,values:[],transaction:s,readonly:!1,returnMode:n,isSQL92:r}),i.changes=await this.reorderRows(i.changes),Promise.resolve(i))}catch(o){return Promise.reject(o)}}async executeSet(t,a=!0,s="no",n=!0){let r;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(r=await this.sqlite.executeSet({database:this.dbName,set:t,transaction:a,readonly:!1,returnMode:s,isSQL92:n}),r.changes=await this.reorderRows(r.changes),Promise.resolve(r))}catch(i){return Promise.reject(i)}}async isExists(){try{const t=await this.sqlite.isDBExists({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTable(t){try{const a=await this.sqlite.isTableExists({database:this.dbName,table:t,readonly:this.readonly});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isDBOpen(){try{const t=await this.sqlite.isDBOpen({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async delete(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteDatabase({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async createSyncTable(){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const t=await this.sqlite.createSyncTable({database:this.dbName,readonly:!1});return Promise.resolve(t)}}catch(t){return Promise.reject(t)}}async setSyncDate(t){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.setSyncDate({database:this.dbName,syncdate:t,readonly:!1}),Promise.resolve())}catch(a){return Promise.reject(a)}}async getSyncDate(){try{const t=await this.sqlite.getSyncDate({database:this.dbName,readonly:this.readonly});let a="";return t.syncDate>0&&(a=new Date(t.syncDate*1e3).toISOString()),Promise.resolve(a)}catch(t){return Promise.reject(t)}}async exportToJson(t,a=!1){try{const s=await this.sqlite.exportToJson({database:this.dbName,jsonexportmode:t,readonly:this.readonly,encrypted:a});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async deleteExportedRows(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteExportedRows({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async executeTransaction(t,a=!0){let s=0,n=!1;if(this.readonly)return Promise.reject("not allowed in read-only mode");if(await this.sqlite.beginTransaction({database:this.dbName}),n=await this.sqlite.isTransactionActive({database:this.dbName}),!n)return Promise.reject("After Begin Transaction, no transaction active");try{for(const o of t){if(typeof o!="object"||!("statement"in o))throw new Error("Error a task.statement must be provided");if("values"in o&&o.values&&o.values.length>0){const c=o.statement.toUpperCase().includes("RETURNING")?"all":"no",l=await this.sqlite.run({database:this.dbName,statement:o.statement,values:o.values,transaction:!1,readonly:!1,returnMode:c,isSQL92:a});if(l.changes.changes<0)throw new Error("Error in transaction method run ");s+=l.changes.changes}else{const c=await this.sqlite.execute({database:this.dbName,statements:o.statement,transaction:!1,readonly:!1});if(c.changes.changes<0)throw new Error("Error in transaction method execute ");s+=c.changes.changes}}const r=await this.sqlite.commitTransaction({database:this.dbName});s+=r.changes.changes;const i={changes:{changes:s}};return Promise.resolve(i)}catch(r){const i=r.message?r.message:r;return await this.sqlite.rollbackTransaction({database:this.dbName}),Promise.reject(i)}}async reorderRows(t){const a=t;if(t?.values&&typeof t.values[0]=="object"&&Object.keys(t.values[0]).includes("ios_columns")){const s=t.values[0].ios_columns,n=[];for(let r=1;r<t.values.length;r++){const i=t.values[r],o={};for(const c of s)o[c]=i[c];n.push(o)}a.values=n}return Promise.resolve(a)}}const Ut=re("CapacitorSQLite",{web:()=>xe(()=>import("./web-DDCCEWX1.js"),[]).then(e=>new e.CapacitorSQLiteWeb),electron:()=>window.CapacitorCustomPlatform.plugins.CapacitorSQLite});function Mt(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}const Bt="laba101_offline",ge="fresh_start_reset_v1",_t=new kt(Ut);let ue=null;const H=[{id:1,name:"Laba101 Admin",email:"admin@laba101.test",password:"password",role:"admin",branch:"Main Store"},{id:2,name:"Gensan Staff",email:"staff@laba101.gensan",password:"password",role:"staff",branch:"Gensan Branch"}],be=[],G=[M(1,"Drop-off","Wash, dry and fold.","Drop-Off","order",185,8,40,["Wash","Dry","Fold"],0,24),M(2,"Full Service","Wash, dry, fold, detergent and Fabcon.","Full Service","order",200,8,40,["Wash","Dry","Fold","Detergent","Fabcon"],0,24),M(3,"Self Service Wash","Max of 8kg per load.","Self Service","order",60,8,null,["Wash"],0,1),M(4,"Self Service Dry","Regular time: 40 mins drying time.","Self Service","order",70,8,40,["Dry"],0,1),M(5,"Dry Only","Standard drying rate.","Dry Only","order",70,8,40,["Dry"],0,1),M(6,"Additional Dry 10 mins","Additional drying time.","Add-on","addon",30,8,10,["Dry"],0,1),M(7,"Additional Dry 20 mins","Additional drying time.","Add-on","addon",50,8,20,["Dry"],0,1),M(8,"Additional Dry 40 mins","Additional drying time.","Add-on","addon",70,8,40,["Dry"],0,1),M(9,"Additional Zonrox","Extra Zonrox bleach add-on per load.","Add-on","addon",25,0,null,["Zonrox"],0,0),M(10,"Additional Fabcon","Extra Fabcon fabric conditioner add-on per load.","Add-on","addon",25,0,null,["Fabcon"],0,0),M(11,"Comforter / Bulky Load","Comforter 4kg max per load. Thin blankets, bedsheets, bath towels, pillow cases and curtains: 6kg max per load.","Comforter","order",200,8,40,["Wash","Dry","Fold"],0,24)],Q=[{id:1,name:"Regular Clothes",maxKg:8,additionalFee:0,isActive:1},{id:2,name:"Comforter",maxKg:4,additionalFee:0,isActive:1},{id:3,name:"Thin Blankets",maxKg:6,additionalFee:0,isActive:1},{id:4,name:"Bedsheets",maxKg:6,additionalFee:0,isActive:1},{id:5,name:"Bath Towels",maxKg:6,additionalFee:0,isActive:1},{id:6,name:"Curtains",maxKg:6,additionalFee:0,isActive:1}];function He(e,t){const a=L(e,[]),s=new Map(a.map(r=>[r.id,r])),n=t.map(r=>{const i=s.get(r.id);return i?{...r,...i,isActive:i.isActive??r.isActive}:r});(a.length!==n.length||n.some((r,i)=>r.id!==a[i]?.id||JSON.stringify(r)!==JSON.stringify(a[i])))&&S(e,n)}async function jt(){He("services",G),He("item_categories",Q)}async function we(e){for(const t of G)((await e.query("SELECT id FROM laundry_services WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive,t.id]):await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive]);for(const t of Q)((await e.query("SELECT id FROM item_categories WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.maxKg,t.additionalFee,t.isActive,t.id]):await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[t.id,t.name,t.maxKg,t.additionalFee,t.isActive])}const te=[],Se=[],ie=[],oe=[],ae=[],X=[...[1,2,3,4].map(e=>({id:e,machineName:`Washer ${e}`,machineType:"washer",status:"available",branch:"Main Store"})),...[1,2,3,4].map(e=>({id:e+4,machineName:`Dryer ${e}`,machineType:"dryer",status:"available",branch:"Main Store"}))],se=[{key:"branch",value:"Main Store"},{key:"fold_rate",value:"5"},{key:"report_email",value:"admin@laba101.test"}];function M(e,t,a,s,n,r,i,o,c,l,v){return{id:e,name:t,description:a,category:s,serviceType:n,price:r,maxKg:i,dryingMinutes:o,includes:c,additionalCharge:l,turnaroundHours:v,isActive:1}}function F(e){return`laba101-mobile-${e}`}function L(e,t){const a=localStorage.getItem(F(e));if(!a)return structuredClone(t);try{return JSON.parse(a)}catch{return structuredClone(t)}}function S(e,t){localStorage.setItem(F(e),JSON.stringify(t))}function k(e){return e.reduce((t,a)=>Math.max(t,a.id),0)+1}function J(){return new Date().toISOString()}function $e(e=new Date){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${s}`}function Ht(){return $e().slice(2).replaceAll("-","")}function K(e,t){if(!e)return t;try{return JSON.parse(e)}catch{return t}}async function C(){return ue||(ue=await _t.createConnection(Bt,!1,"no-encryption",1,!1),await ue.open()),ue}async function D(e,t,a,s){((await e.query(`PRAGMA table_info(${t})`)).values??[]).some(i=>i.name===a)||await e.execute(`ALTER TABLE ${t} ADD COLUMN ${a} ${s}`)}function Wt(){const e=L("staff",H),t=new Map(e.map(s=>[s.id,s]));let a=!1;for(const s of H){const n=t.get(s.id);if(!n){t.set(s.id,{...s,isActive:1}),a=!0;continue}const r={...n,name:s.name,email:s.email,password:s.password,role:s.role,branch:s.branch,isActive:1};JSON.stringify(r)!==JSON.stringify(n)&&(t.set(s.id,r),a=!0)}a&&S("staff",Array.from(t.values()).sort((s,n)=>s.id-n.id))}async function Xt(){localStorage.getItem(F(ge))||(S("staff",H),S("customers",[]),S("orders",[]),S("payments",[]),S("fold_logs",[]),S("expenses",[]),S("sales",[]),localStorage.getItem(F("services"))||S("services",G),localStorage.getItem(F("item_categories"))||S("item_categories",Q),localStorage.getItem(F("machines"))||S("machines",X),localStorage.getItem(F("subcleanings"))||S("subcleanings",[]),localStorage.getItem(F("settings"))||S("settings",se),localStorage.removeItem("laba101-mobile-session"),S(ge,!0))}async function at(e){for(const t of H){if(((await e.query("SELECT id FROM staff WHERE id = ?",[t.id])).values??[]).length>0){await e.run("UPDATE staff SET name = ?, email = ?, password = ?, role = ?, branch = ?, isActive = 1 WHERE id = ?",[t.name,t.email,t.password,t.role,t.branch,t.id]);continue}await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.email,t.password,t.role,t.branch,1])}}async function Kt(e){if(!(((await e.query("SELECT COUNT(*) as count FROM machines")).values?.[0]?.count??0)>0))for(const a of X)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[a.id,a.machineName,a.machineType,a.status,a.branch])}async function Gt(e){for(const t of se)await e.run("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)",[t.key,t.value])}async function Vt(e){((await e.query("SELECT value FROM settings WHERE key = ?",[ge])).values??[]).length>0||(await e.execute(`
    DELETE FROM payments;
    DELETE FROM orders;
    DELETE FROM customers;
    DELETE FROM fold_logs;
    DELETE FROM disbursement_expenses;
    DELETE FROM daily_sales;
    DELETE FROM revolving_history;
    DELETE FROM staff WHERE id NOT IN (1, 2);
  `),await at(e),await Kt(e),await Gt(e),await e.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",[ge,J()]),localStorage.removeItem("laba101-mobile-session"))}async function Yt(){if(!A.isNativePlatform()){await Xt(),!localStorage.getItem(F("seeded_v4"))&&!localStorage.getItem(F("services"))&&!localStorage.getItem(F("staff"))&&(S("staff",H),S("customers",be),S("services",G),S("item_categories",Q),S("orders",te),S("payments",Se),S("fold_logs",[]),S("expenses",ie),S("sales",oe),S("revolving_history",ae),S("machines",X),S("subcleanings",[]),S("settings",se),S("seeded_v4",!0)),await jt(),Wt(),localStorage.getItem(F("seeded_v4"))||S("seeded_v4",!0);return}const e=await C();if(await e.execute(`
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
  `),await D(e,"staff","email","TEXT"),await D(e,"staff","password","TEXT"),await D(e,"staff","role","TEXT"),await D(e,"staff","isActive","INTEGER NOT NULL DEFAULT 1"),await e.run('UPDATE staff SET password = ? WHERE password IS NULL OR password = ""',["password"]),await e.run('UPDATE staff SET role = ? WHERE role IS NULL OR role = ""',["staff"]),await D(e,"orders","customerId","INTEGER NOT NULL DEFAULT 0"),await D(e,"orders","phone","TEXT"),await D(e,"orders","serviceId","INTEGER NOT NULL DEFAULT 0"),await D(e,"orders","serviceLines","TEXT"),await D(e,"orders","itemCategoryId","INTEGER NOT NULL DEFAULT 0"),await D(e,"orders","itemCategory",'TEXT NOT NULL DEFAULT "Regular Clothes"'),await D(e,"orders","workflowCompleted","TEXT"),await D(e,"orders","weightKg","REAL NOT NULL DEFAULT 0"),await D(e,"orders","price","REAL NOT NULL DEFAULT 0"),await D(e,"orders","additionalCharge","REAL NOT NULL DEFAULT 0"),await D(e,"orders","extraServiceAmount","REAL NOT NULL DEFAULT 0"),await D(e,"orders","totalAmount","REAL NOT NULL DEFAULT 0"),await D(e,"orders","paidAmount","REAL NOT NULL DEFAULT 0"),await D(e,"orders","extras","TEXT"),await D(e,"orders","notes","TEXT"),await D(e,"orders","dueAt","TEXT"),await D(e,"orders","createdAt",'TEXT NOT NULL DEFAULT ""'),await D(e,"daily_sales","saleNumber","TEXT"),await D(e,"daily_sales","status","TEXT"),await D(e,"daily_sales","endorsedTo","TEXT"),await D(e,"daily_sales","statusUpdatedAt","TEXT"),((await e.query("SELECT COUNT(*) as count FROM staff")).values?.[0]?.count??0)===0){for(const a of H)await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.name,a.email,a.password,a.role,a.branch,1]);for(const a of be)await e.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[a.id,a.name,a.phone,a.address]);for(const a of G)await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[a.id,a.name,a.description,a.category,a.serviceType,a.price,a.maxKg,a.dryingMinutes,JSON.stringify(a.includes),a.additionalCharge,a.turnaroundHours,a.isActive]);for(const a of Q)await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[a.id,a.name,a.maxKg,a.additionalFee,a.isActive]);for(const a of te)await st(e,a);for(const a of Se)await e.run("INSERT INTO payments (id, orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.orderId,a.amount,a.method,a.reference,a.receivedAt,a.branch]);for(const a of ie)await e.run("INSERT INTO disbursement_expenses (id, expenseDate, number, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.expenseDate,a.number,a.name,a.category,a.description,a.amount]);for(const a of oe)await e.run("INSERT INTO daily_sales (id, saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.saleDate,a.saleNumber,a.cashAmount,a.gcashAmount,a.totalAmount,a.notes]);for(const a of ae)await e.run("INSERT INTO revolving_history (id, revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[a.id,a.revolvingNumber,a.name,a.amount,a.category,a.description,a.type,a.createdAt]);for(const a of X)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[a.id,a.machineName,a.machineType,a.status,a.branch]);for(const a of se)await e.run("INSERT INTO settings (key, value) VALUES (?, ?)",[a.key,a.value])}await we(e),await at(e),await Vt(e)}async function st(e,t){await e.run("INSERT INTO orders (id, ticket, customerId, customer, phone, serviceId, service, serviceLines, itemCategoryId, itemCategory, branch, status, workflowCompleted, weightKg, price, additionalCharge, extraServiceAmount, totalAmount, paidAmount, extras, notes, foldedBy, dueAt, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.ticket,t.customerId,t.customer,t.phone,t.serviceId,t.service,JSON.stringify(t.serviceLines??[]),t.itemCategoryId,t.itemCategory,t.branch,t.status,JSON.stringify(t.workflowCompleted),t.weightKg,t.price,t.additionalCharge,t.extraServiceAmount,t.totalAmount,t.paidAmount,JSON.stringify(t.extras),t.notes,t.foldedBy,t.dueAt,t.createdAt])}function Qt(e){const t=Number(e.paidAmount??0),a=Number(e.totalAmount??0),s=Number(e.foldedBy),n=K(e.serviceLines,[]),r=Number(e.serviceId),i=String(e.service),o=Number(e.price);return{id:Number(e.id),ticket:String(e.ticket),customerId:Number(e.customerId),customer:String(e.customer),phone:e.phone?String(e.phone):null,serviceId:r,service:i,serviceLines:n.length?n:[{id:r,name:i,price:o,quantity:1,total:o}],itemCategoryId:Number(e.itemCategoryId),itemCategory:String(e.itemCategory),branch:String(e.branch),status:String(e.status),workflowCompleted:K(e.workflowCompleted,[]),weightKg:Number(e.weightKg),price:o,additionalCharge:Number(e.additionalCharge),extraServiceAmount:Number(e.extraServiceAmount),totalAmount:a,paidAmount:t,balance:Number((a-t).toFixed(2)),extras:K(e.extras,[]),notes:e.notes?String(e.notes):null,foldedBy:Number.isFinite(s)&&s>0?s:null,foldedByName:e.foldedByName?String(e.foldedByName):null,dueAt:String(e.dueAt),createdAt:String(e.createdAt)}}async function Jt(){await Yt()}async function Te(){return(await De()).find(t=>t.key==="branch")?.value??"Main Store"}async function zt(){const e=await De();return Number(e.find(t=>t.key==="fold_rate")?.value??"5")}async function rt(e){return(await De()).find(a=>a.key===e)?.value}async function De(){return A.isNativePlatform()?(await(await C()).query("SELECT key, value FROM settings ORDER BY key")).values??[]:L("settings",se)}async function fe(e,t){if(!A.isNativePlatform()){const s=L("settings",se).filter(n=>n.key!==e);s.push({key:e,value:t}),S("settings",s);return}await(await C()).run("REPLACE INTO settings (key, value) VALUES (?, ?)",[e,t])}async function Zt(e){return A.isNativePlatform()?(await(await C()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff WHERE branch = ? ORDER BY name ASC',[e])).values??[]:L("staff",H).filter(s=>s.branch===e)}async function nt(){return A.isNativePlatform()?(await(await C()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff ORDER BY name ASC')).values??[]:L("staff",H)}async function it(e,t){const a=e.trim().toLowerCase();return(await nt()).find(n=>n.email.toLowerCase()===a&&n.password===t&&n.isActive!==0)??null}async function ea(e){if(!A.isNativePlatform()){const a=L("staff",H);a.unshift({id:k(a),...e,isActive:1}),S("staff",a);return}await(await C()).run("INSERT INTO staff (name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?)",[e.name,e.email,e.password,e.role,e.branch,1])}async function We(e,t){if(!A.isNativePlatform()){const r=L("staff",H),i=r.find(o=>o.id===e);i&&(Object.assign(i,t),S("staff",r));return}const a=await C(),s=[],n=[];for(const[r,i]of Object.entries(t))r!=="id"&&(s.push(`${r} = ?`),n.push(i));s.length&&(n.push(e),await a.run(`UPDATE staff SET ${s.join(", ")} WHERE id = ?`,n))}async function ta(){return A.isNativePlatform()?(await(await C()).query("SELECT id, name, phone, address FROM customers ORDER BY name ASC")).values??[]:L("customers",be).sort((a,s)=>a.name.localeCompare(s.name))}async function aa(e){if(!A.isNativePlatform()){const n=L("customers",be),r=e.id?n.find(o=>o.id===e.id):n.find(o=>o.name.toLowerCase()===e.name.toLowerCase()&&(e.phone?o.phone===e.phone:!0));if(r)return r.name=e.name,r.phone=e.phone??r.phone,r.address=e.address??r.address,S("customers",n),r;const i={id:k(n),name:e.name,phone:e.phone??null,address:e.address??null};return n.push(i),S("customers",n),i}const t=await C();if(e.id)return await t.run("UPDATE customers SET name = ?, phone = ?, address = ? WHERE id = ?",[e.name,e.phone??null,e.address??null,e.id]),{id:e.id,name:e.name,phone:e.phone??null,address:e.address??null};const a=await t.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM customers"),s=Number((a.values?.[0]).id);return await t.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[s,e.name,e.phone??null,e.address??null]),{id:s,name:e.name,phone:e.phone??null,address:e.address??null}}async function Oe(e){if(!A.isNativePlatform())return L("services",G).filter(s=>!0);const t=await C(),a=await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[]);return(a.values??[]).length===0?(await we(t),((await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[])).values??[]).map(n=>({...n,includes:K(n.includes,[])}))):(a.values??[]).map(s=>({...s,includes:K(s.includes,[])}))}async function sa(){if(!A.isNativePlatform())return L("services",G);const e=await C(),t=await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC");return(t.values??[]).length===0?(await we(e),((await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC")).values??[]).map(s=>({...s,includes:K(s.includes,[])}))):(t.values??[]).map(a=>({...a,includes:K(a.includes,[])}))}async function Xe(e){if(!A.isNativePlatform()){const a=L("services",G),s=e.id?a.find(n=>n.id===e.id):null;s?Object.assign(s,e):a.unshift({...e,id:k(a)}),S("services",a);return}const t=await C();e.id?await t.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = ? WHERE id = ?",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive,e.id]):await t.run("INSERT INTO laundry_services (name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive])}async function ot(){if(!A.isNativePlatform())return L("item_categories",Q).filter(a=>a.isActive);const e=await C(),t=await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC");return(t.values??[]).length===0?(await we(e),(await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC")).values??[]):t.values??[]}async function ra(e){if(!A.isNativePlatform()){const a=L("item_categories",Q),s=e.id?a.find(n=>n.id===e.id):null;s?Object.assign(s,e):a.unshift({...e,id:k(a)}),S("item_categories",a);return}const t=await C();e.id?await t.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = ? WHERE id = ?",[e.name,e.maxKg,e.additionalFee,e.isActive,e.id]):await t.run("INSERT INTO item_categories (name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?)",[e.name,e.maxKg,e.additionalFee,e.isActive])}function ct(e,t,a,s){const n=(Array.isArray(e)?e:[e]).map(f=>{const p=Math.max(0,Number(f.quantity??1)),g=Number(f.price);return{id:f.id,name:f.name,price:g,quantity:p,total:Number((g*p).toFixed(2))}}).filter(f=>f.quantity>0),r=Number(t.maxKg),i=0,o=0,c=s.map(f=>{const p=Math.max(0,Number(f.quantity??1)),g=Number(f.price);return{id:f.id,name:Mt(f.name),price:g,quantity:p,total:Number((g*p).toFixed(2))}}).filter(f=>f.quantity>0),l=n.reduce((f,p)=>f+p.total,0),v=c.reduce((f,p)=>f+p.total,0),d=Number((l+o+v).toFixed(2));return{price:Number(l.toFixed(2)),additionalCharge:Number(o.toFixed(2)),extraServiceAmount:Number(v.toFixed(2)),totalAmount:d,allowedKg:r,extraKg:Number(i.toFixed(2)),warning:null,serviceLines:n,extras:c}}function lt(e,t){const a=e.serviceLines?.length?e.serviceLines.map(i=>i.id):[e.serviceId],s=t.filter(i=>a.includes(i.id)),n=Array.from(new Set(s.flatMap(i=>i.includes??[]))),r=[{key:"received",label:"Received"}];return n.includes("Wash")&&r.push({key:"wash",label:"Wash"}),e.extras.length&&r.push({key:"extras",label:"Extra services"}),(n.includes("Dry")||s.some(i=>(i.dryingMinutes??0)>0))&&r.push({key:"dry",label:"Dry"}),n.includes("Fold")&&r.push({key:"fold",label:"Fold"}),r.push({key:"ready",label:"Ready"},{key:"claimed",label:"Claimed"}),r}function na(e){return e.includes("claimed")?"claimed":e.includes("ready")?"ready":e.includes("dry")?"drying":e.includes("extras")||e.includes("wash")?"washing":"received"}async function Ne(e){return A.isNativePlatform()?((await(await C()).query("SELECT o.*, s.name as foldedByName FROM orders o LEFT JOIN staff s ON s.id = o.foldedBy WHERE o.branch = ? ORDER BY o.id DESC",[e])).values??[]).map(s=>Qt(s)):L("orders",te).filter(s=>s.branch===e).map(s=>({...s,serviceLines:s.serviceLines??[{id:s.serviceId,name:s.service,price:Number(s.price),quantity:1,total:Number(s.price)}],balance:Number((s.totalAmount-s.paidAmount).toFixed(2))}))}async function ia(e){const[t,a]=await Promise.all([Oe(),ot()]),s=e.serviceQuantities??(e.serviceId?{[e.serviceId]:1}:{}),n=t.filter(E=>E.serviceType==="order"&&Number(s[E.id]??0)>0).map(E=>({...E,quantity:Number(s[E.id]??0)})),r=n[0],i=a.find(E=>E.id===e.itemCategoryId)??a.find(E=>E.name.toLowerCase()===(r?.category??"").toLowerCase())??a.find(E=>E.name==="Regular Clothes")??a[0];if(!n.length||!r||!i)throw new Error("Please select at least one service.");const o=e.addonQuantities??Object.fromEntries((e.addonIds??[]).map(E=>[E,1])),c=t.filter(E=>E.serviceType==="addon"&&Number(o[E.id]??0)>0).map(E=>({...E,quantity:Number(o[E.id]??0)})),l=e.weightKg??Math.max(1,Number(i.maxKg||r.maxKg||1)),v=ct(n,i,l,c),d=await aa({id:e.customerId||void 0,name:e.customerName,phone:e.customerPhone??null}),f=Math.max(0,e.paidAmount),p=Math.min(v.totalAmount,f),g={ticket:await oa(),customerId:d.id,customer:d.name,phone:d.phone,serviceId:r.id,service:v.serviceLines.map(E=>`${E.name} x${E.quantity}`).join(", "),serviceLines:v.serviceLines,itemCategoryId:i.id,itemCategory:i.name,branch:e.branch,status:"received",workflowCompleted:["received"],weightKg:l,price:v.price,additionalCharge:v.additionalCharge,extraServiceAmount:v.extraServiceAmount,totalAmount:v.totalAmount,paidAmount:p,balance:Number((v.totalAmount-p).toFixed(2)),extras:v.extras,notes:e.notes||null,foldedBy:null,foldedByName:null,dueAt:new Date(Date.now()+Math.max(...n.map(E=>E.turnaroundHours))*60*60*1e3).toISOString(),createdAt:J()};if(!A.isNativePlatform()){const E=L("orders",te),N={...g,id:k(E)};return E.unshift(N),S("orders",E),f>0&&await dt(N.id,{amount:f,method:e.paymentMethod,reference:e.paymentReference??null}),N}const y=await C(),b=await y.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM orders"),T={...g,id:Number((b.values?.[0]).id)};return await st(y,T),f>0&&await y.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[T.id,f,e.paymentMethod,e.paymentReference??null,J(),e.branch]),T}async function oa(){const e=`LB${Ht()}`,t=await Te(),s=(await Ne(t)).filter(r=>r.ticket.startsWith(e)).sort((r,i)=>i.ticket.localeCompare(r.ticket))[0],n=s?Number(s.ticket.slice(-3))+1:1;return`${e}-${String(n).padStart(3,"0")}`}async function ca(e,t){const a=await Te(),[s,n]=await Promise.all([Ne(a),Oe()]),r=s.find(l=>l.id===e);if(!r)return;const o=lt(r,n).map(l=>l.key).find(l=>!r.workflowCompleted.includes(l));if(!o)return;if(r.workflowCompleted=[...r.workflowCompleted,o],r.status=na(r.workflowCompleted),o==="fold"&&t&&(r.foldedBy=t),!A.isNativePlatform()){const l=L("orders",te),v=l.find(d=>d.id===r.id);v&&Object.assign(v,r),S("orders",l);return}await(await C()).run("UPDATE orders SET workflowCompleted = ?, status = ?, foldedBy = ? WHERE id = ?",[JSON.stringify(r.workflowCompleted),r.status,r.foldedBy,r.id])}async function dt(e,t){const a=await Te();if(!(await Ne(a)).find(o=>o.id===e))return;const r=Math.max(0,t.amount);if(r<=0)return;if(!A.isNativePlatform()){const o=L("payments",Se);o.unshift({id:k(o),orderId:e,amount:r,method:t.method,reference:t.reference??null,receivedAt:J(),branch:a}),S("payments",o);const c=L("orders",te),l=c.find(v=>v.id===e);l&&(l.paidAmount=Math.min(l.totalAmount,Number((l.paidAmount+r).toFixed(2)))),S("orders",c);return}const i=await C();await i.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[e,r,t.method,t.reference??null,J(),a]),await i.run("UPDATE orders SET paidAmount = MIN(totalAmount, paidAmount + ?) WHERE id = ?",[r,e])}async function la(e){return A.isNativePlatform()?(await(await C()).query("SELECT id, orderId, amount, method, reference, receivedAt, branch FROM payments  ORDER BY receivedAt DESC",[])).values??[]:L("payments",Se).filter(s=>!0)}async function da(){return A.isNativePlatform()?(await(await C()).query("SELECT id, orderTicket, staffName, foldCount, rate, total, createdAt FROM fold_logs ORDER BY id DESC")).values??[]:L("fold_logs",[])}async function ua(e){const t=Number((e.foldCount*e.rate).toFixed(2));if(!A.isNativePlatform()){const s=L("fold_logs",[]);s.unshift({id:Date.now(),...e,total:t,createdAt:J()}),S("fold_logs",s);return}await(await C()).run("INSERT INTO fold_logs (orderTicket, staffName, foldCount, rate, total, createdAt) VALUES (?, ?, ?, ?, ?, ?)",[e.orderTicket,e.staffName,e.foldCount,e.rate,t,J()])}async function ma(){return A.isNativePlatform()?(await(await C()).query("SELECT id, expenseDate, number, name, category, description, amount FROM disbursement_expenses ORDER BY expenseDate DESC, id DESC")).values??[]:L("expenses",ie)}function Le(e){const t=/^DISB-(\d+)$/i.exec(String(e??"").trim());return t?Number(t[1]):0}function Ke(e){const t=/^REV-(\d+)$/i.exec(String(e??"").trim());return t?Number(t[1]):0}async function va(){let e=0;if(!A.isNativePlatform()){const n=L("expenses",ie),r=L("revolving_history",ae);for(const i of n)e=Math.max(e,Le(i.number));for(const i of r)i.type==="disbursement"&&(e=Math.max(e,Le(i.revolvingNumber)));return e}const t=await C(),a=await t.query("SELECT number FROM disbursement_expenses"),s=await t.query("SELECT revolvingNumber as number FROM revolving_history WHERE type = 'disbursement'");for(const n of[...a.values??[],...s.values??[]])e=Math.max(e,Le(String(n.number)));return e}async function ut(){const e=await va()+1;return`DISB-${String(e).padStart(2,"0")}`}async function pa(){let e=0;if(!A.isNativePlatform()){const s=L("revolving_history",ae);for(const n of s)n.type==="add"&&(e=Math.max(e,Ke(n.revolvingNumber)));return`REV-${String(e+1).padStart(2,"0")}`}const a=await(await C()).query("SELECT revolvingNumber FROM revolving_history WHERE type = 'add'");for(const s of a.values??[])e=Math.max(e,Ke(String(s.revolvingNumber)));return`REV-${String(e+1).padStart(2,"0")}`}async function mt(e){if(!A.isNativePlatform()){const a=L("expenses",ie),s=k(a);a.unshift({id:s,expenseDate:e.expenseDate,number:e.number,name:e.name,category:e.category,description:e.description||null,amount:e.amount}),S("expenses",a);return}await(await C()).run("INSERT INTO disbursement_expenses (expenseDate, number, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?)",[e.expenseDate,e.number,e.name,e.category,e.description||null,e.amount])}async function fa(e){const t=await ut();await mt({expenseDate:e.expenseDate,number:t,name:e.name,category:e.category,description:e.description,amount:e.amount})}async function ya(){return A.isNativePlatform()?(await(await C()).query('SELECT id, saleDate, COALESCE(saleNumber, "") as saleNumber, cashAmount, gcashAmount, totalAmount, notes, status, endorsedTo, statusUpdatedAt FROM daily_sales ORDER BY saleDate DESC, id DESC')).values??[]:L("sales",oe)}async function ha(e){const t=Number((e.cashAmount+e.gcashAmount).toFixed(2));if(!A.isNativePlatform()){const r=L("sales",oe),i=r.find(o=>o.saleDate===e.saleDate);if(i)Object.assign(i,{cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null});else{const o=k(r);r.unshift({id:o,saleDate:e.saleDate,saleNumber:`SALE-${String(o).padStart(2,"0")}`,cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null})}S("sales",r);return}const a=await C(),n=(await a.query("SELECT id, saleNumber FROM daily_sales WHERE saleDate = ?",[e.saleDate])).values?.[0];if(n)await a.run("UPDATE daily_sales SET cashAmount = ?, gcashAmount = ?, totalAmount = ?, notes = ? WHERE id = ?",[e.cashAmount,e.gcashAmount,t,e.notes||null,n.id]);else{const r=await a.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM daily_sales"),i=Number((r.values?.[0]).id);await a.run("INSERT INTO daily_sales (saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?)",[e.saleDate,`SALE-${String(i).padStart(2,"0")}`,e.cashAmount,e.gcashAmount,t,e.notes||null])}}async function Ge(e,t,a=null,s){if(!A.isNativePlatform()){const r=L("sales",oe),i=r.find(o=>o.id===e);i&&(i.status=t,i.endorsedTo=a,i.statusUpdatedAt=s,S("sales",r));return}await(await C()).run("UPDATE daily_sales SET status = ?, endorsedTo = ?, statusUpdatedAt = ? WHERE id = ?",[t,a,s,e])}async function ga(){return A.isNativePlatform()?(await(await C()).query("SELECT id, revolvingNumber, name, amount, category, description, type, createdAt FROM revolving_history ORDER BY createdAt DESC, id DESC")).values??[]:L("revolving_history",ae).sort((a,s)=>s.createdAt.localeCompare(a.createdAt))}async function Ve(e){const t=e.type==="disbursement"?await ut():await pa();if(e.type==="disbursement"){const s=e.expenseDate??e.createdAt.slice(0,10);await mt({expenseDate:s,number:t,name:e.name,category:e.category,description:e.description??"",amount:e.amount})}if(!A.isNativePlatform()){const s=L("revolving_history",ae),n=k(s);s.unshift({id:n,revolvingNumber:t,...e}),S("revolving_history",s);return}await(await C()).run("INSERT INTO revolving_history (revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)",[t,e.name,e.amount,e.category,e.description||null,e.type,e.createdAt])}async function vt(e){return A.isNativePlatform()?(await(await C()).query("SELECT id, machineName, machineType, status, branch FROM machines WHERE branch = ? ORDER BY machineType, machineName",[e])).values??[]:L("machines",X).filter(s=>s.branch===e)}async function ba(e){if(!A.isNativePlatform()){const a=L("machines",X);a.unshift({id:k(a),...e}),S("machines",a);return}await(await C()).run("INSERT INTO machines (machineName, machineType, status, branch) VALUES (?, ?, ?, ?)",[e.machineName,e.machineType,e.status,e.branch])}async function Sa(e,t){if(!A.isNativePlatform()){const s=L("machines",X),n=s.find(r=>r.id===e);n&&(n.status=t,S("machines",s));return}await(await C()).run("UPDATE machines SET status = ? WHERE id = ?",[t,e])}async function Ea(e){return A.isNativePlatform()?((await(await C()).query("SELECT id, date, machineIds, machineNames, cleaningStatus, notes, branch FROM subcleanings WHERE branch = ? ORDER BY date DESC, id DESC",[e])).values??[]).map(s=>({...s,machineIds:K(s.machineIds,[])})):L("subcleanings",[]).filter(s=>s.branch===e)}async function wa(e){const a=(await vt(e.branch)).filter(r=>e.machineIds.includes(r.id)).map(r=>r.machineName).join(", ");if(!A.isNativePlatform()){const r=L("subcleanings",[]);r.unshift({id:k(r),date:e.date,machineIds:e.machineIds,machineNames:a,cleaningStatus:e.cleaningStatus,notes:e.notes||null,branch:e.branch}),S("subcleanings",r);const i=L("machines",X);i.forEach(o=>{e.machineIds.includes(o.id)&&(o.status=e.cleaningStatus==="completed"?"available":"under_cleaning")}),S("machines",i);return}const s=await C();await s.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, notes, branch) VALUES (?, ?, ?, ?, ?, ?)",[e.date,JSON.stringify(e.machineIds),a,e.cleaningStatus,e.notes||null,e.branch]);const n=e.cleaningStatus==="completed"?"available":"under_cleaning";for(const r of e.machineIds)await s.run("UPDATE machines SET status = ? WHERE id = ?",[n,r])}async function Ta(e,t){if(!A.isNativePlatform()){const i=L("machines",X),o=i.find(v=>v.id===e);o&&(o.status="available"),S("machines",i);const c=L("subcleanings",[]),l=$e();c.unshift({id:k(c),date:l,machineIds:[e],machineNames:o?.machineName??"",cleaningStatus:"completed",notes:null,branch:t}),S("subcleanings",c);return}const a=await C(),n=(await a.query("SELECT machineName FROM machines WHERE id = ?",[e])).values?.[0]?.machineName??"";await a.run("UPDATE machines SET status = ? WHERE id = ?",["available",e]);const r=$e();await a.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, notes, branch) VALUES (?, ?, ?, ?, ?, ?)",[r,JSON.stringify([e]),n,"completed",null,t])}const Pe=document.querySelector("#app");if(!Pe)throw new Error("App root not found");let me;const Ie={dashboard:"Dashboard",pos:"POS",orders:"Orders",archived:"Archived Order",customers:"Customers",pricing:"Pricing Services",disbursements:"Daily Report",reports:"Reports",inventory:"Inventory",maintenance:"Maintenance",staff:"Staff",revolving:"Revolving Fund",settings:"Settings"},m={tab:"dashboard",receiptOrderId:0,currentUser:null,loginError:"",sidebarOpen:!1,dailyReportTab:"expenses",maintenanceTab:"cleaning",customerSearch:"",orderSearch:"",orderDateFilter:"",orderPaymentFilter:"",archivedOrderSearch:"",reportPreview:null,endorseModalOpen:!1,endorseSaleId:0,endorseSaleDate:"",revolvingModalOpen:!1,revolvingSaleId:0,addFundModalOpen:!1,disbursementModalOpen:!1,revolvingHistoryFrom:"",revolvingHistoryTo:""},Na=["Wash","Dry","Fold","Detergent","Fabcon","Zonrox"],ce="laba101-mobile-session";function $(e){return new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(e||0)}function u(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Y(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}function pt(e,t){return Number((e-t).toFixed(2))}function ft(e,t,a,s=0){const n=t.filter(i=>_(i.createdAt)===e).reduce((i,o)=>i+o.paidAmount,0),r=a.filter(i=>i.expenseDate===e).reduce((i,o)=>i+o.amount,0);return pt(n+s,r)}function Aa(e){const t=new Map;return e.filter(a=>a.workflowCompleted.includes("fold")&&a.foldedByName).forEach(a=>{const s=a.foldedByName,n=t.get(s)??{staffName:s,folds:0};n.folds+=1,t.set(s,n)}),Array.from(t.values())}function le(e=new Date){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${s}`}function j(){return le()}function _(e){return le(new Date(e))}function qe(e){return e.paidAmount<=0?"unpaid":e.balance>0?"partial":"paid"}function ne(e){return new Intl.DateTimeFormat("en-PH",{dateStyle:"medium",timeStyle:"short"}).format(new Date(e))}function La(e){const t=new Date(e),a=new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric",year:"numeric"}).format(t),s=new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",hour12:!0}).format(t);return`<div class="datetime-stack"><strong>${u(a)}</strong><span class="meta">${u(s)}</span></div>`}function Ca(e){return e?.role==="staff"&&e.branch==="Gensan Branch"}function Ee(e,t,a="data-table"){return`
    <div class="table-scroll">
      <table class="${a}">
        <thead><tr>${e.map(s=>`<th>${u(s)}</th>`).join("")}</tr></thead>
        <tbody>${t.length?t.map(s=>`<tr>${s.map(n=>`<td>${n}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${e.length}" class="table-empty">No records found.</td></tr>`}</tbody>
      </table>
    </div>
  `}function $a(e=new Date){return{date:new Intl.DateTimeFormat("en-PH",{weekday:"long",month:"long",day:"numeric",year:"numeric"}).format(e),time:new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",second:"2-digit",hour12:!0}).format(e)}}function ve(){const e=document.querySelector("[data-date-from]"),t=document.querySelector("[data-date-to]"),a=Array.from(document.querySelectorAll('input[name="reportType"]:checked')).map(s=>s.value).filter(s=>s==="sales"||s==="disbursement"||s==="fold_count"||s==="revolving_fund"||s==="summary");return{from:e?.value||"0000-01-01",to:t?.value||"9999-12-31",types:a.length?a:["summary"]}}function pe(e,t){return e>=t.from&&e<=t.to}function yt(e,t,a,s,n,r){const i=new Set(r.types),o=e.filter(h=>pe(_(h.createdAt),r)),c=t.filter(h=>pe(h.saleDate,r)),l=a.filter(h=>pe(h.expenseDate,r)),v=Aa(o),d=o.reduce((h,x)=>h+x.paidAmount,0),f=c.reduce((h,x)=>h+x.cashAmount,0),p=c.reduce((h,x)=>h+x.gcashAmount,0),g=0,y=d+f,b=g+p,T=y+b,E=l.reduce((h,x)=>h+x.amount,0),N=E,P=T-N,B=()=>({orderCashTotal:d,orderGcashTotal:g,manualCashTotal:f,manualGcashTotal:p,totalCash:y,totalGcash:b,totalSales:T,rows:[["Type","Date","Number","Name","Cash","GCash","Total","Balance"],...o.map(h=>["Order",_(h.createdAt),h.ticket,h.customer,h.paidAmount,0,h.paidAmount,h.balance]),...c.map(h=>["Manual Sale",h.saleDate,h.saleNumber,h.notes??"",h.cashAmount,h.gcashAmount,h.totalAmount,""]),[],["Sales Summary",r.from,"to",r.to,"","","",""],["Order Cash","","","","","",d,""],["Order GCash","","","","","",g,""],["Manual Cash","","","","","",f,""],["Manual GCash","","","","","",p,""],["Total Cash","","","","","",y,""],["Total GCash","","","","","",b,""],["Total Sales","","","","","",T,""]]}),q=()=>({totalExpenses:E,totalDisbursement:N,rows:[["Type","Date","Number","Name","Amount"],...l.map(h=>["Expense",h.expenseDate,h.number,h.name,h.amount]),[],["Disbursement Summary",r.from,"to",r.to,""],["Expenses","","","",E],["Total Disbursement","","","",N]]}),V=()=>({rows:[["Staff","Fold Count"],...v.map(h=>[h.staffName,h.folds]),[],["Total Folds",v.reduce((h,x)=>h+x.folds,0)]]}),O=s.filter(h=>pe(_(h.createdAt),r));return{selection:r,selectedTypes:i,salesRows:B,disbursementRows:q,foldCountRows:V,revolvingDailySummaryRows:()=>({rows:[["Date of Sales","Cash on Hand","Status","Date Update"],...c.map(h=>{const x=ft(h.saleDate,e,a,h.cashAmount),z=h.status==="revolving"?"Revolving":h.status==="endorsed"?`Endorsed to ${h.endorsedTo??""}`:"Pending";return[h.saleDate,x,z,h.statusUpdatedAt?_(h.statusUpdatedAt):""]})]}),revolvingHistoryRows:()=>({rows:[["Date","Number","Name","Amount","Category","Description","Type"],...O.map(h=>[_(h.createdAt),h.revolvingNumber,h.name,h.type==="disbursement"?-h.amount:h.amount,h.category,h.description??"",h.type==="add"?"Add Revolving Fund":"Disbursement"])]}),summaryRows:()=>{const h=B(),x=q();return[["Summary",r.from,"to",r.to,"","","",""],["Order Cash","","","","","",h.orderCashTotal,""],["Order GCash","","","","","",h.orderGcashTotal,""],["Manual Cash","","","","","",h.manualCashTotal,""],["Manual GCash","","","","","",h.manualGcashTotal,""],["Total Cash","","","","","",h.totalCash,""],["Total GCash","","","","","",h.totalGcash,""],["Total Sales","","","","","",h.totalSales,""],["Total Disbursement","","","","","",x.totalDisbursement,""],["Profit","","","","","",P,""],["Cash on Hand","","","","","",pt(h.totalCash,x.totalDisbursement),""]]},profit:P}}function Ra(e,t){return`<button class="nav-link ${t?"is-active":""}" data-tab="${e}" type="button">
    <span class="nav-icon">${xa(e)}</span>
    <span>${Ie[e]}</span>
  </button>`}function R(e,t){return`<div class="section-head"><div><h2>${u(e)}</h2><p class="meta">${u(t)}</p></div></div>`}function Ye(){return Ie[m.tab]??"Dashboard"}function Ce(e){return(e?.name??"Laba101").trim().slice(0,1).toUpperCase()}function xa(e){return{dashboard:"DB",pos:"POS",orders:"PO",archived:"AR",customers:"CU",pricing:"PS",disbursements:"DR",reports:"RP",inventory:"IN",maintenance:"MT",staff:"ST",revolving:"RV",settings:"SE"}[e]}async function Da(){const e=await Te(),t=await Zt(e),a=await nt(),s=await ta(),n=await Oe(),r=await sa(),i=await ot(),o=await Ne(e),c=await la(),l=await da(),v=await ma(),d=await ya(),f=await vt(e),p=await Ea(e),g=await ga(),y=await zt(),b=await rt("report_email");return{branch:e,staff:t,allStaff:a,customers:s,services:n,allServices:r,categories:i,orders:o,payments:c,foldLogs:l,expenses:v,sales:d,machines:f,subcleanings:p,revolvingHistory:g,foldRate:y,reportEmail:b??""}}async function w(){if(!m.currentUser){Oa(),Ya();return}const e=await Da();e.orders.filter(a=>a.status!=="claimed").length,e.orders.filter(a=>a.status==="ready").length,e.orders.reduce((a,s)=>a+s.paidAmount,0);const t=e.orders.filter(a=>_(a.createdAt)===j()).reduce((a,s)=>a+s.paidAmount,0);e.sales.reduce((a,s)=>a+s.totalAmount,0),e.expenses.reduce((a,s)=>a+s.amount,0),Pe.innerHTML=`
    <div class="app-frame">
      <header class="topbar">
        <div class="topbar-left">
          <img src="/laba101-logo.svg" alt="Laba101" class="topbar-logo" />
          <div>
            <p class="eyebrow">Offline mobile system</p>
            <h1>${u(Ye())}</h1>
          </div>
        </div>
        <div class="topbar-actions">
          <div class="branch-pill"><span>Branch</span><strong>${u(e.branch)}</strong></div>
          <button class="icon-button" type="button" aria-label="Notifications">!</button>
          <button class="profile-pill" type="button">
            <span>${Ce(m.currentUser)}</span>
            <strong>${u(m.currentUser.name)}</strong>
          </button>
        </div>
      </header>

      <button class="sidebar-backdrop ${m.sidebarOpen?"is-open":""}" id="sidebar-backdrop" type="button" aria-label="Close navigation"></button>

      <aside class="sidebar ${m.sidebarOpen?"is-open":""}">
        <div class="sidebar-mobile-head">
          <img src="/laba101-logo.svg" alt="Laba101" />
          <button class="sidebar-close" id="sidebar-close-button" type="button" aria-label="Close navigation">X</button>
        </div>
        <nav>${ht().map(a=>Ra(a,m.tab===a)).join("")}</nav>
        <div class="sidebar-fill">
          <div class="sidebar-branch-badge">
            <span>Active Branch</span>
            <strong>${u(e.branch)}</strong>
          </div>
          <p class="sidebar-app-name">Laba101 POS</p>
        </div>
        <div class="sidebar-user">
          <span class="avatar">${Ce(m.currentUser)}</span>
          <div>
            <strong>${u(m.currentUser.name)}</strong>
            <small>${u(m.currentUser.email)} / ${u(m.currentUser.role)}</small>
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
            <h2>${u(Ye())}</h2>
          </div>
          <div class="navbar-time">
            <strong data-navbar-time>--:--</strong>
            <span data-navbar-date>Loading...</span>
          </div>
          <button class="mobile-avatar" type="button">${Ce(m.currentUser)}</button>
        </header>

        ${m.tab==="dashboard"?Ia({paidToday:t,orders:e.orders}):""}
        ${m.tab==="pos"?qa(e.orders,e.customers,e.services,e.categories,e.payments,e.branch):""}
        ${m.tab==="orders"?Fa(e.orders,e.staff,e.services,e.payments):""}
        ${m.tab==="archived"?ka(e.orders,e.staff,e.services,e.payments):""}
        ${m.tab==="customers"?Ba(e.customers,e.orders):""}
        ${m.tab==="pricing"?_a(e.allServices,e.categories):""}
        ${m.tab==="disbursements"?ja(e.expenses,e.sales):""}
        ${m.tab==="reports"?Ha(e.orders,e.sales,e.expenses,e.revolvingHistory,e.foldRate):""}
        ${m.tab==="inventory"?Wa(e.services,e.categories):""}
        ${m.tab==="maintenance"?Xa(e.machines,e.subcleanings,e.branch):""}
        ${m.tab==="staff"?Ka(e.allStaff,e.branch):""}
        ${m.tab==="revolving"?is(e.sales,e.revolvingHistory,e.orders,e.expenses):""}
        ${m.tab==="settings"?Ga(e.branch,e.foldRate,e.reportEmail):""}
      </main>
    </div>
  `,Va(),Ja(e),za(e.allServices),Za(),es(e.orders,e.sales,e.expenses,e.revolvingHistory,e.foldRate),ts(),as(),ss(),rs(e.allStaff),os(),ns(),Qa()}function ht(){return m.currentUser?.role==="admin"?Object.keys(Ie).filter(e=>e!=="inventory"):Ca(m.currentUser)?["disbursements","reports","maintenance","revolving"]:["pos","orders","archived","disbursements","reports","maintenance","revolving"]}function Oa(){Pe.innerHTML=`
    <main class="login-page">

      <section class="login-panel-wrap">
        <article class="login-panel">
          <header>
            <div class="login-mark"><img src="/laba101-logo.svg" alt="Laba101" /></div>
            <h2>Welcome back</h2>
            <p>Sign in to continue managing today&apos;s laundry operations.</p>
          </header>
          ${m.loginError?`<div class="alert">${u(m.loginError)}</div>`:""}
          <form id="login-form" class="form">
            <label>Email address<input name="email" type="email" autocomplete="username" placeholder="admin@laba101.test" required /></label>
            <label>Password<input name="password" type="password" autocomplete="current-password" placeholder="Enter password" required /></label>
            <label class="remember"><input name="remember" type="checkbox" value="1" /> Remember me on this device</label>
            <button class="primary" id="login-button" type="submit">Sign in</button>
          </form>
        </article>
      </section>
    </main>
  `}function Pa(){document.querySelectorAll("[data-fill-email]").forEach(e=>{e.addEventListener("click",()=>{const t=document.querySelector('input[name="email"]'),a=document.querySelector('input[name="password"]');t&&(t.value=e.dataset.fillEmail??""),a&&(a.value=e.dataset.fillPassword??"")})})}function Ia(e){const t=new Date,a=Array.from({length:7},(i,o)=>{const c=new Date(t);return c.setDate(t.getDate()-(6-o)),new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric"}).format(c)}),s=Array.from({length:7},(i,o)=>{const c=new Date(t);c.setDate(t.getDate()-(6-o));const l=le(c);return e.orders.filter(v=>_(v.createdAt)===l).reduce((v,d)=>v+d.paidAmount,0)}),n=Math.max(1,...s),r=210;return`
    <section class="dashboard-main">
      <article class="panel revenue-panel">
        ${R("Revenue overview","Paid amount for the last 7 days.")}
        <div class="stats compact dashboard-stats">
          <div class="stat"><span class="card-label">Paid Today</span><div class="value">${$(e.paidToday)}</div></div>
        </div>
        <div class="chart-shell">
          <div class="mini-chart revenue-chart">
            ${s.map((i,o)=>{const c=Math.max(12,Math.round(i/n*r));return`<div class="chart-bar ${o===s.length-1?"is-today":""}"><span style="height:${c}px"></span><strong>${$(i)}</strong></div>`}).join("")}
          </div>
          <div class="chart-days">${a.map(i=>`<span>${u(i)}</span>`).join("")}</div>
        </div>
        <div class="chart-footnote">Values are based on order payments for the last 7 days.</div>
      </article>
    </section>
  `}function qa(e,t,a,s,n,r){const i=a.filter(d=>d.serviceType==="order"&&d.isActive),o=a.filter(d=>d.serviceType==="addon"&&d.isActive),c=m.receiptOrderId?e.find(d=>d.id===m.receiptOrderId):null,l=new Set(e.map(d=>d.customerId)),v=t.filter(d=>l.has(d.id));return`
    <section class="grid content full">
      <article class="panel span-2">
        ${R("New POS order","Tap a service, add extra quantities, and confirm the total")}
        <form id="order-form" class="form">
          <div class="form-row">
            <label>Existing customer (${u(r)})
              <select name="customerId">
                <option value="">-- New customer --</option>
                ${v.map(d=>`<option value="${d.id}" data-name="${u(d.name)}" data-phone="${u(d.phone??"")}">${u(d.name)} ${d.phone?`- ${u(d.phone)}`:""}</option>`).join("")}
              </select>
            </label>
            <label>Customer name<input name="customerName" required placeholder="Customer name" /></label>
          </div>
          <div class="form-row">
            <label>Phone<input name="customerPhone" placeholder="09..." /></label>
          </div>

          <fieldset class="service-picker">
            <legend>Services</legend>
            ${i.map(d=>`<div class="qty-card service-option service-quantity" data-qty-card="serviceQty-${d.id}">
              <span>
                <strong>${u(d.name)}</strong>
                <small>${u(d.description??d.category)} ${d.maxKg?` / max ${d.maxKg}kg`:""}</small>
              </span>
              <b>${$(d.price)}</b>
              <div class="qty-control">
                <button type="button" data-qty-minus="serviceQty-${d.id}" aria-label="Decrease ${u(d.name)}">-</button>
                <input type="number" name="serviceQty-${d.id}" min="0" step="1" value="0" inputmode="numeric" />
                <button type="button" data-qty-plus="serviceQty-${d.id}" aria-label="Increase ${u(d.name)}">+</button>
              </div>
            </div>`).join("")}
          </fieldset>

          <fieldset class="check-grid">
            <legend>Extra services</legend>
            ${o.length?o.map(d=>`<div class="qty-card addon-quantity" data-qty-card="addonQty-${d.id}">
              <span><strong>${u(Y(d.name))}</strong><small>${$(d.price)} each</small></span>
              <div class="qty-control">
                <button type="button" data-qty-minus="addonQty-${d.id}" aria-label="Decrease ${u(Y(d.name))}">-</button>
                <input type="number" name="addonQty-${d.id}" min="0" step="1" value="0" inputmode="numeric" />
                <button type="button" data-qty-plus="addonQty-${d.id}" aria-label="Increase ${u(Y(d.name))}">+</button>
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

      ${c?Fe(c,n.filter(d=>d.orderId===c.id)):""}
    </section>
  `}function Fa(e,t,a,s){const n=m.receiptOrderId?e.find(v=>v.id===m.receiptOrderId):null,r=e.filter(v=>v.status!=="claimed"),i=m.orderSearch.trim().toLowerCase(),o=m.orderDateFilter.trim(),c=m.orderPaymentFilter.trim().toLowerCase(),l=r.filter(v=>{const d=!i||[v.ticket,v.customer,v.phone,v.service,v.itemCategory,v.status].some(g=>String(g??"").toLowerCase().includes(i)),f=!o||_(v.createdAt)===o,p=!c||qe(v)===c;return d&&f&&p});return`
    <section class="grid content full">
      <article class="panel span-2">
        ${R("Order queue","Workflow, payment, and receipts")}
        <form class="queue-filters" id="order-queue-filters">
          <label>
            <span>Search queue</span>
            <input name="orderSearch" type="search" placeholder="Ticket, name, service, status" value="${u(m.orderSearch)}" autocomplete="off" />
          </label>
          <label>
            <span>Filter date</span>
            <input name="orderDateFilter" type="date" value="${u(m.orderDateFilter)}" />
          </label>
          <label>
            <span>Payment</span>
            <select name="orderPaymentFilter">
              <option value="" ${m.orderPaymentFilter===""?"selected":""}>All</option>
              <option value="unpaid" ${m.orderPaymentFilter==="unpaid"?"selected":""}>Unpaid</option>
              <option value="partial" ${m.orderPaymentFilter==="partial"?"selected":""}>Partial</option>
              <option value="paid" ${m.orderPaymentFilter==="paid"?"selected":""}>Paid</option>
            </select>
          </label>
          <div class="search-actions queue-actions">
            <button class="primary" type="submit">Apply</button>
            <button class="secondary" type="button" id="order-queue-clear">Clear</button>
          </div>
        </form>
        <div class="summary-list queue-summary">
          <div><span>Active queue</span><strong>${l.length}</strong></div>
          <div><span>Claimed archived</span><strong>${e.filter(v=>v.status==="claimed").length}</strong></div>
        </div>
        <div class="table-scroll">
          <table class="data-table orders-data-table">
            <thead><tr><th>Ticket</th><th>Customer</th><th>Service</th><th>Total</th><th>Payment</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              ${l.map(v=>gt(v,t,a)).join("")||'<tr><td colspan="7" class="table-empty">No matching active orders.</td></tr>'}
            </tbody>
          </table>
        </div>
      </article>
      ${n?Fe(n,s.filter(v=>v.orderId===n.id)):""}
    </section>
  `}function ka(e,t,a,s){const n=e.filter(c=>c.status==="claimed"),r=m.archivedOrderSearch.trim().toLowerCase(),i=n.filter(c=>r?[c.ticket,c.customer,c.phone,c.service,c.itemCategory].some(l=>String(l??"").toLowerCase().includes(r)):!0),o=m.receiptOrderId?e.find(c=>c.id===m.receiptOrderId):null;return`
    <section class="grid content full">
      <article class="panel span-2">
        ${R("Archived orders","All claimed orders are listed here")}
        <form class="queue-filters" id="archived-order-filters">
          <label>
            <span>Search archived</span>
            <input name="archivedOrderSearch" type="search" placeholder="Ticket, name, service" value="${u(m.archivedOrderSearch)}" autocomplete="off" />
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
        <div class="table-scroll">
          <table class="data-table orders-data-table archived-orders-table">
            <thead><tr><th>Ticket</th><th>Customer</th><th>Service</th><th>Total</th><th>Payment</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              ${i.map(c=>gt(c,t,a)).join("")||'<tr><td colspan="7" class="table-empty">No archived orders found.</td></tr>'}
            </tbody>
          </table>
        </div>
      </article>
      ${o?Fe(o,s.filter(c=>c.orderId===o.id)):""}
    </section>
  `}function gt(e,t,a){const s=lt(e,a),n=s.find(d=>!e.workflowCompleted.includes(d.key)),r=n?.key==="fold",i=n?.key==="extras"&&e.extras.length>0,o=qe(e),c=o.charAt(0).toUpperCase()+o.slice(1),l=o==="paid"?"ok":o==="partial"?"warn":"meta",v=e.extras.length?e.extras.map(d=>`${u(Y(d.name))} x${Number(d.quantity??1)}`).join(", "):"";return`
    <tr>
      <td><strong>${u(e.ticket)}</strong><div class="small">${u(ne(e.createdAt))}</div></td>
      <td>${u(e.customer)}<div class="small">${u(e.phone??"")}</div></td>
      <td>${u(e.service)}${v?`<div class="small">Extras: ${v}</div>`:""}</td>
      <td class="amount-cell"><strong>${$(e.totalAmount)}</strong><div class="small">Bal ${$(e.balance)}</div></td>
      <td><span class="payment-status ${l}">${c}</span><div class="small">Paid ${$(e.paidAmount)}</div></td>
      <td>
        <div class="${e.status==="ready"||e.status==="claimed"?"ok":"warn"}">${u(e.status)}</div>
        <div class="workflow-progress">
          ${s.map(d=>`<span class="${e.workflowCompleted.includes(d.key)?"is-done":n?.key===d.key?"is-next":""}">${u(d.label)}</span>`).join("")}
        </div>
      </td>
      <td>
      <div class="row-actions">
        ${n?`<form class="inline-form advance-form" data-order-id="${e.id}">
          ${i?`<div class="extra-confirmation">Confirm extra service: <strong>${e.extras.map(d=>`${u(Y(d.name))} x${Number(d.quantity??1)}`).join(", ")}</strong></div>`:""}
          ${r?`<select name="assignedStaffId" required>
            <option value="">Staff</option>
            ${t.map(d=>`<option value="${d.id}">${u(d.name)}</option>`).join("")}
          </select>`:""}
          <button class="secondary" type="submit">Next: ${u(n.label)}</button>
        </form>`:""}
        ${e.balance>0?`
          <form class="inline-form payment-form" data-order-id="${e.id}">
            <input name="amount" type="number" min="0.01" step="0.01" value="${e.balance}" />
            <select name="method"><option value="cash">Cash</option><option value="gcash">GCash</option></select>
            <input name="reference" placeholder="GCash ref" hidden />
            <button class="secondary" type="submit">Pay</button>
          </form>
        `:""}
        <button class="secondary" data-receipt="${e.id}">Receipt</button>
      </div>
      </td>
    </tr>
  `}function Fe(e,t){const a=t.reduce((i,o)=>i+Number(o.amount),0),s=Math.max(0,Number((a-e.totalAmount).toFixed(2))),n=qe(e),r=n.charAt(0).toUpperCase()+n.slice(1);return`
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="receipt-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-print-receipt>Print</button>
          <button class="secondary" type="button" data-thermal-print>Thermal</button>
          <button class="secondary" type="button" data-close-receipt>Close</button>
        </div>
        <div class="receipt" id="receipt-print-area">
          <div class="receipt-head">
            <h3 id="receipt-title">Laba101</h3>
            <p>${u(e.ticket)}<br>${u(ne(e.createdAt))}</p>
          </div>
          <div class="receipt-customer">
            <strong>${u(e.customer)}</strong>
            <span>${u(e.phone??"No phone")}</span>
          </div>
          <div class="summary-list receipt-lines">
            <div><span>Service</span><strong>${u(e.service)}</strong></div>
            ${e.extras.length?`<div><span>Extra services</span><strong>${e.extras.map(i=>`${u(Y(i.name))} x${Number(i.quantity??1)} (${$(Number(i.total??i.price))})`).join(", ")}</strong></div>`:""}
            <div><span>Total</span><strong>${$(e.totalAmount)}</strong></div>
            <div><span>Tendered</span><strong>${$(a)}</strong></div>
            <div><span>Paid</span><strong>${$(e.paidAmount)}</strong></div>
            <div><span>Payment status</span><strong>${r}</strong></div>
            <div><span>Change</span><strong>${$(s)}</strong></div>
            <div><span>Balance</span><strong>${$(e.balance)}</strong></div>
          </div>
          <h3>Payments</h3>
          <div class="receipt-payments">
            ${t.map(i=>`<div><span>${u(i.method.toUpperCase())}</span><strong>${$(i.amount)}</strong>${i.reference?`<small>Ref ${u(i.reference)}</small>`:""}</div>`).join("")||'<p class="helper">No payments yet.</p>'}
          </div>
        </div>
      </div>
    </div>
  `}async function bt(){const e=document.querySelector("#receipt-print-area"),t=document.querySelector("#receipt-title")?.textContent?.trim()||"Laba101 receipt";if(!e)return;if(!A.isNativePlatform()){window.print();return}const a=`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${u(t)}</title><style>
body{margin:0;background:#fff;color:#061a42;font-family:Arial,sans-serif}.receipt{width:2.2in;margin:0 auto;padding:10px;font-size:11px;line-height:1.25}.receipt-head,.receipt-customer,.summary-list div,.receipt-payments div{display:flex;justify-content:space-between;gap:10px}.receipt-head,.receipt-customer{border-bottom:1px dashed #b9c5dc;padding-bottom:10px;margin-bottom:10px}.summary-list{display:grid;gap:7px}.summary-list div,.receipt-payments div{border-bottom:1px solid #edf1fb;padding:5px 0}.receipt h3{font-size:14px;margin:10px 0 6px}.helper{color:#5c6a86}
</style></head><body>${e.outerHTML}</body></html>`,s=`laba101-receipt-${Date.now()}.html`;await he.writeFile({path:s,data:a,directory:ee.External,encoding:ye.UTF8});const{uri:n}=await he.getUri({path:s,directory:ee.External});await tt.share({title:t,text:"Open this receipt file and choose Print from your Android print service.",files:[n],dialogTitle:"Print receipt"})}function Ua(){const e=document.querySelector("#receipt-print-area");return e?["LABA101","------------------------",...Array.from(e.querySelectorAll(".receipt-head, .receipt-customer, .receipt-lines div, .receipt-payments div")).map(a=>a.innerText.replace(/\s+/g," ").trim()).filter(Boolean),"------------------------","Thank you!","",""].join(`
`):`Laba101
`}async function Ma(){const e=navigator;if(!e.bluetooth?.requestDevice){await bt();return}const t=["0000ffe0-0000-1000-8000-00805f9b34fb","0000ff00-0000-1000-8000-00805f9b34fb","49535343-fe7d-4ae5-8fa9-9fafd205e455"],n=await(await(await e.bluetooth.requestDevice({acceptAllDevices:!0,optionalServices:t})).gatt.connect()).getPrimaryServices();let r=null;for(const l of n)if(r=(await l.getCharacteristics()).find(d=>{const f=d.properties;return f.write||f.writeWithoutResponse}),r)break;if(!r)throw new Error("No writable Bluetooth printer channel found.");const i=new TextEncoder,o=new Uint8Array([27,64,...i.encode(Ua()),29,86,0]),c=180;for(let l=0;l<o.length;l+=c){const v=o.slice(l,l+c);r.properties.writeWithoutResponse?await r.writeValueWithoutResponse(v):await r.writeValue(v)}}function Ba(e,t){const a=m.customerSearch.trim().toLowerCase(),s=e.filter(n=>a?n.name.toLowerCase().includes(a):!1);return`
    <section class="grid content full">
      <article class="panel">
        ${R("Customer Management","Customer records from local offline storage")}
        <form class="search-box" id="customer-search-form">
          <label>
            <span>Search customer name</span>
            <input name="customerSearch" data-customer-search type="search" placeholder="Type the customer name then tap Search" value="${u(m.customerSearch)}" autocomplete="off" />
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
        ${R("Customer list","Names, phones, addresses, and order history")}
        <div class="customer-stack">
          ${a?s.map(n=>{const r=t.filter(i=>i.customerId===n.id);return`
              <article class="customer-card">
                <header>
                  <div>
                    <strong>${u(n.name)}</strong>
                    <p>${u(n.phone??"No phone")} · ${u(n.address??"No address")}</p>
                  </div>
                  <span>${r.length} order(s)</span>
                </header>
                <div class="customer-orders">
                  ${r.length?r.map(i=>`
                    <div class="customer-order-row">
                      <div>
                        <strong>${u(i.ticket)}</strong>
                        <span>${u(i.service)} · ${u(i.itemCategory)}</span>
                      </div>
                      <div>
                        <strong>${$(i.totalAmount)}</strong>
                        <span>${u(i.status)}</span>
                      </div>
                    </div>`).join(""):'<p class="helper">No order records yet.</p>'}
                </div>
              </article>`}).join(""):'<div class="helper">Search a customer name to display matching records and their order history.</div>'}
        </div>
      </article>
    </section>
  `}function _a(e,t){return`
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
            ${Na.map(a=>`<label class="check"><input type="checkbox" name="includes" value="${a}" /> ${a}</label>`).join("")}
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
                <strong>${u(a.name)}</strong>
                <span>${u(a.category)}</span>
              </header>
              <div class="service-fields">
                <div><span>price:</span><strong>${$(a.price)}</strong></div>
                <div><span>type:</span><strong>${u(a.serviceType)}</strong></div>
                <div><span>category:</span><strong>${u(a.category)}</strong></div>
                <div><span>active:</span><strong>${a.isActive?"yes":"no"}</strong></div>
              </div>
              <div class="service-meta">Includes: ${u(a.includes.join(", ")||"none")}</div>
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
          ${t.map(a=>`<div class="table-row"><div>${u(a.name)}</div><div>${a.maxKg}</div><div></div><div></div><div></div></div>`).join("")}
        </div>
      </article>
    </section>
  `}function ja(e,t){const a=j(),s=a.slice(0,7),n=e.filter(c=>c.expenseDate===a).reduce((c,l)=>c+l.amount,0),r=e.filter(c=>c.expenseDate.startsWith(s)).reduce((c,l)=>c+l.amount,0),i=t.filter(c=>c.saleDate===a).reduce((c,l)=>c+l.totalAmount,0),o=t.filter(c=>c.saleDate.startsWith(s)).reduce((c,l)=>c+l.totalAmount,0);return`
    <section class="page-head">
      <div>
        <h2>Daily Report</h2>
      </div>
      <div class="segmented">
        <button class="${m.dailyReportTab==="expenses"?"is-active":""}" data-report-tab="expenses" type="button">Disbursements</button>
        <button class="${m.dailyReportTab==="sales"?"is-active":""}" data-report-tab="sales" type="button">Daily Sales</button>
      </div>
    </section>
    <section class="grid stats compact report-stats">
      <div class="panel stat"><div class="card-label">Daily disbursement</div><div class="value">${$(n)}</div></div>
      <div class="panel stat"><div class="card-label">Monthly disbursement</div><div class="value">${$(r)}</div></div>
      <div class="panel stat"><div class="card-label">Today sales input</div><div class="value">${$(i)}</div></div>
      <div class="panel stat"><div class="card-label">Month sales input</div><div class="value">${$(o)}</div></div>
    </section>
    ${m.dailyReportTab==="expenses"?`
    <section class="grid content full">
      <article class="panel">
        ${R("Input disbursement","Supplies, utilities, and cash disbursements")}
        <form id="expense-form" class="form">
          <div class="form-row"><label>Date<input name="expenseDate" type="date" value="${j()}" required /></label><label>Amount<input name="amount" type="number" min="0" step="0.01" required /></label></div>
          <div class="form-row"><label>Name<input name="name" required /></label><label>Category<input name="category" required /></label></div>
          <label>Description<textarea name="description"></textarea></label>
          <button class="primary" type="submit">Save expense</button>
        </form>
      </article>
      <article class="panel">
        ${R("Disbursement list","Expenses only")}
        <div class="table">
          <div class="table-head"><div>Date</div><div>No.</div><div>Name</div><div>Category</div><div>Amount</div></div>
          ${e.map(c=>`<div class="table-row"><div>${u(c.expenseDate)}</div><div>${u(c.number)}</div><div>${u(c.name)}</div><div>${u(c.category)}</div><div>${$(c.amount)}</div></div>`).join("")||'<div class="helper">No expenses yet.</div>'}
        </div>
      </article>
    </section>
    `:`
    <section class="grid content full">
      <article class="panel">
        ${R("Input total sale","Manual cash and GCash totals")}
        <form id="sales-form" class="form">
          <label>Date<input name="saleDate" type="date" value="${j()}" required /></label>
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
          ${t.map(c=>`<div class="table-row"><div>${u(c.saleNumber)}</div><div>${u(c.saleDate)}</div><div>${$(c.cashAmount)}</div><div>${$(c.gcashAmount)}</div><div><strong>${$(c.totalAmount)}</strong></div></div>`).join("")||'<div class="helper">No daily sales totals yet.</div>'}
        </div>
      </article>
    </section>
    `}
  `}function Ha(e,t,a,s,n,r,i,o){const c=m.reportPreview?yt(e,t,a,s,n,m.reportPreview):null;return`
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
    ${c?`
      <section class="panel report-preview">
        ${c.selectedTypes.has("sales")?`
          <article>
            ${R("Sales report preview",`${c.selection.from} to ${c.selection.to}`)}
            <div class="table wide-table report-preview-table">
              <div class="table-head report-table-head"><div>Type</div><div>Date</div><div>Number</div><div>Name</div><div>Cash</div><div>GCash</div><div>Total</div><div>Balance</div></div>
              ${c.salesRows().rows.slice(1).map(l=>`<div class="table-row report-table-row">${l.map(v=>`<div>${u(v??"")}</div>`).join("")}</div>`).join("")}
            </div>
          </article>`:""}
        ${c.selectedTypes.has("disbursement")?`
          <article>
            ${R("Disbursement preview",`${c.selection.from} to ${c.selection.to}`)}
            <div class="table wide-table report-preview-table report-disbursement-table">
              <div class="table-head report-table-head"><div>Type</div><div>Date</div><div>Number</div><div>Name</div><div>Amount</div></div>
              ${c.disbursementRows().rows.slice(1).map(l=>`<div class="table-row report-table-row">${l.map(v=>`<div>${u(v??"")}</div>`).join("")}</div>`).join("")}
            </div>
          </article>`:""}
        ${c.selectedTypes.has("fold_count")?`
          <article>
            ${R("Fold Count preview",`${c.selection.from} to ${c.selection.to}`)}
            <div class="table report-preview-table">
              <div class="table-head"><div>Staff</div><div>Fold Count</div></div>
              ${c.foldCountRows().rows.slice(1).map(l=>`<div class="table-row">${l.map(v=>`<div>${u(v??"")}</div>`).join("")}</div>`).join("")}
            </div>
          </article>`:""}
        ${c.selectedTypes.has("revolving_fund")?`
          <article>
            ${R("Revolving Fund — Daily Summary",`${c.selection.from} to ${c.selection.to}`)}
            ${Ee(["Date of Sales","Cash on Hand","Status","Date Update"],c.revolvingDailySummaryRows().rows.slice(1).map(l=>[u(String(l[0]??"")),u(String(l[1]??"")),u(String(l[2]??"")),u(String(l[3]??""))]),"data-table revolving-report-table")}
          </article>
          <article>
            ${R("Revolving Fund — Table History",`${c.selection.from} to ${c.selection.to}`)}
            ${Ee(["Date","Number","Name","Amount","Category","Description","Type"],c.revolvingHistoryRows().rows.slice(1).map(l=>[u(String(l[0]??"")),u(String(l[1]??"")),u(String(l[2]??"")),u(String(l[3]??"")),u(String(l[4]??"")),u(String(l[5]??"")),u(String(l[6]??""))]),"data-table revolving-report-table")}
          </article>`:""}
        ${c.selectedTypes.has("summary")?`
          <article>
            ${R("Summary preview",`${c.selection.from} to ${c.selection.to}`)}
            <div class="summary-list report-summary-list">
              ${c.summaryRows().map(l=>`<div><span>${u(l[0])}</span><strong>${u(String(l[6]??"0"))}</strong></div>`).join("")}
            </div>
          </article>`:""}
      </section>
    `:""}
  `}function Wa(e,t){return`
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
          ${e.map(a=>`<div class="table-row"><div><strong>${u(a.name)}</strong></div><div>${u(a.category)}</div><div>${$(a.price)}</div><div>${a.maxKg} kg</div><div>${a.isActive?"Active":"Inactive"}</div></div>`).join("")}
        </div>
      </article>
    </section>
  `}function Xa(e,t,a){const s=e.filter(r=>r.status!=="under_cleaning"),n=e.filter(r=>r.status==="under_cleaning");return`
    <section class="page-head">
      <div>
        <h2>Maintenance & Cleaning</h2>
        <p class="meta">Manage machine subcleaning and maintenance records.</p>
      </div>
      <div class="segmented">
        <button class="${m.maintenanceTab==="cleaning"?"is-active":""}" data-maintenance-tab="cleaning" type="button">Subcleaning</button>
        <button class="${m.maintenanceTab==="machines"?"is-active":""}" data-maintenance-tab="machines" type="button">Machine Management</button>
      </div>
    </section>
    ${m.maintenanceTab==="cleaning"?`
    <section class="grid content full">
      <article class="panel">
        ${R("Available Machines","Select machines to start cleaning.")}
        <form id="subcleaning-form" class="form">
          <input type="hidden" name="date" value="${j()}" />
          <fieldset class="machine-list">
            ${s.map(r=>`<label class="machine-card"><input type="checkbox" name="machineIds" value="${r.id}" /><span><strong>${u(r.machineName)}</strong><small>${u(r.machineType)}</small></span><em></em></label>`).join("")||'<p class="helper">All machines are currently being cleaned.</p>'}
          </fieldset>
          <input type="hidden" name="cleaningStatus" value="in_progress" />
          <label>Notes <textarea name="notes" placeholder="e.g. Deep clean filters"></textarea></label>
          <input type="hidden" name="branch" value="${u(a)}" />
          <button class="primary" type="submit">Start Cleaning</button>
        </form>
      </article>
      <article class="panel warning-panel">
        ${R("Under Cleaning","Machines currently being serviced.")}
        <div class="machine-stack">
          ${n.length?n.map(r=>`
            <div class="machine-status">
              <span><strong>${u(r.machineName)}</strong><small>${u(r.machineType)}</small></span>
              <b>In progress</b>
              <button class="secondary complete-cleaning-btn" type="button" data-machine-id="${r.id}" data-branch="${u(a)}">Mark Complete</button>
            </div>`).join(""):'<p class="helper">No machines under cleaning right now.</p>'}
        </div>
      </article>
      <article class="panel span-2">
        ${R("Daily Cleaning Checklist","Track which machines have been cleaned today.")}
        <div class="table">
          <div class="table-head"><div>Machine</div><div>Type</div><div>Status</div><div>Notes</div><div>Date</div></div>
          ${e.map(r=>{const i=t.find(o=>o.machineIds.includes(r.id)&&o.date===j());return`<div class="table-row"><div><strong>${u(r.machineName)}</strong></div><div>${u(r.machineType)}</div><div>${i?u(i.cleaningStatus.replace("_"," ")):"Not Cleaned"}</div><div>${u(i?.notes??"-")}</div><div>${j()}</div></div>`}).join("")}
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
          <input type="hidden" name="branch" value="${u(a)}" />
          <button class="primary" type="submit">Add machine</button>
        </form>
      </article>
      <article class="panel">
        ${R("Machines","Washer and dryer status")}
        <div class="table">
          <div class="table-head"><div>Name</div><div>Type</div><div>Status</div><div>Branch</div><div>Actions</div></div>
          ${e.map(r=>`<div class="table-row"><div><strong>${u(r.machineName)}</strong></div><div>${u(r.machineType)}</div><div>${u(r.status.replace("_"," "))}</div><div>${u(r.branch)}</div>
          <div class="row-actions">
            ${r.status!=="inactive"?`<button class="secondary deactivate-machine-btn" data-id="${r.id}">Deactivate</button>`:`<button class="secondary activate-machine-btn" data-id="${r.id}">Activate</button>`}
          </div></div>`).join("")||'<div class="helper">No machines found.</div>'}
        </div>
      </article>
    </section>
    `}
  `}function Ka(e,t){return`
    <section class="grid">
      <div class="page-head">
        <div>
          <p class="eyebrow">Team Management</p>
          <h2>Staff Overview</h2>
        </div>
        <button class="primary" id="open-add-staff-modal" type="button">+ Add staff</button>
      </div>

      <article class="panel">
        ${R("Staff list","Branch: "+u(t))}
        <div class="table">
          <div class="table-head staff-table-head"><div>Name</div><div>Email</div><div>Role</div><div>Branch</div><div>Status</div><div>Actions</div></div>
          ${e.length?e.map(a=>`<div class="table-row staff-table-row"><div><strong>${u(a.name)}</strong></div><div>${u(a.email)}</div><div class="small">${u(a.role)}</div><div>${u(a.branch)}</div><div>${a.isActive!==0?"Active":"Inactive"}</div>
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
  `}function Ga(e,t,a){return`
    <section class="grid content full">
      <article class="panel">
        ${R("Settings","Device-local configuration")}
        <form id="settings-form" class="form">
          <label>Current branch<select name="branch">
            ${["Main Store","Mintal Branch","Gensan Branch"].map(s=>`<option value="${s}" ${s===e?"selected":""}>${s}</option>`).join("")}
          </select></label>
          <label>Fold rate<input name="foldRate" type="number" min="0" step="0.01" value="${t}" /></label>
          <label>Report email<input name="reportEmail" type="email" placeholder="admin@laba101.test" value="${u(a)}" /></label>
          <button class="primary" type="submit">Save settings</button>
        </form>
      </article>
    </section>
  `}function Va(){const e=()=>{localStorage.removeItem(ce),m.currentUser=null,m.tab="dashboard",m.receiptOrderId=0,m.sidebarOpen=!1,w()};document.querySelector("#logout-button")?.addEventListener("click",e),document.querySelector("#mobile-logout-button")?.addEventListener("click",e),document.querySelector("#mobile-menu-button")?.addEventListener("click",()=>{m.sidebarOpen=!0,w()}),document.querySelector("#sidebar-close-button")?.addEventListener("click",()=>{m.sidebarOpen=!1,w()}),document.querySelector("#sidebar-backdrop")?.addEventListener("click",()=>{m.sidebarOpen=!1,w()}),document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{m.tab=t.dataset.tab,m.receiptOrderId=0,m.sidebarOpen=!1,w()})}),document.querySelectorAll("[data-quick-tab]").forEach(t=>{t.addEventListener("click",()=>{m.tab=t.dataset.quickTab,w()})}),document.querySelectorAll("[data-receipt]").forEach(t=>{t.addEventListener("click",()=>{m.receiptOrderId=Number(t.dataset.receipt),w()})}),document.querySelector("[data-close-receipt]")?.addEventListener("click",()=>{m.receiptOrderId=0,w()}),document.querySelector("[data-print-receipt]")?.addEventListener("click",()=>{bt().catch(t=>{alert(t instanceof Error?t.message:"Receipt could not be printed.")})}),document.querySelector("[data-thermal-print]")?.addEventListener("click",()=>{Ma().catch(t=>{alert(t instanceof Error?t.message:"Bluetooth thermal print failed. Use Print instead, or install a native Bluetooth printer plugin. "+t.message)})}),document.querySelectorAll("[data-report-tab]").forEach(t=>{t.addEventListener("click",()=>{m.dailyReportTab=t.dataset.reportTab,w()})}),document.querySelectorAll("[data-maintenance-tab]").forEach(t=>{t.addEventListener("click",()=>{m.maintenanceTab=t.dataset.maintenanceTab,w()})})}function Ya(){Pa(),document.querySelector("#login-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget),a=document.querySelector("#login-button");a&&(a.disabled=!0,a.textContent="Signing in...");try{const s=await it(String(t.get("email")??""),String(t.get("password")??""));if(!s){m.loginError="Invalid email or password.",await w();return}m.currentUser=s,m.loginError="",await fe("branch",String(s.branch||"Main Store")),t.get("remember")?localStorage.setItem(ce,JSON.stringify({email:s.email,remembered:!0})):localStorage.removeItem(ce),ht().includes(m.tab)||(m.tab="dashboard"),await w()}catch(s){alert("Login Error: "+String(s?.message||s)),a&&(a.disabled=!1,a.textContent="Sign in")}})}function Qa(){me&&window.clearInterval(me);const e=document.querySelector("[data-navbar-time]"),t=document.querySelector("[data-navbar-date]");if(!e||!t){me=void 0;return}const a=()=>{const s=$a();e.textContent=s.time,t.textContent=s.date};a(),me=window.setInterval(a,1e3)}function Qe(e,t){return e?t.find(a=>a.name.toLowerCase()===e.category.toLowerCase())??t.find(a=>a.name==="Regular Clothes")??t[0]??null:null}function Je(e,t){return Math.max(1,Number(t.maxKg||e.maxKg||1))}function St(e,t){return Object.fromEntries(t.filter(a=>a.serviceType==="order").map(a=>[a.id,Number(e.querySelector(`input[name="serviceQty-${a.id}"]`)?.value??0)]).filter(([,a])=>Number(a)>0))}function ze(e,t){const a=St(e,t);return t.filter(s=>s.serviceType==="order"&&Number(a[s.id]??0)>0).map(s=>({...s,quantity:Number(a[s.id])}))}function Et(e,t){return Object.fromEntries(t.filter(a=>a.serviceType==="addon").map(a=>[a.id,Number(e.querySelector(`input[name="addonQty-${a.id}"]`)?.value??0)]).filter(([,a])=>Number(a)>0))}function Ze(e,t){const a=Et(e,t);return t.filter(s=>s.serviceType==="addon"&&Number(a[s.id]??0)>0).map(s=>({...s,quantity:Number(a[s.id])}))}function Ja(e){const t=document.querySelector("#order-form"),a=document.querySelector("#price-preview"),s=t?.querySelector('button[type="submit"]'),n=t?.querySelector('select[name="customerId"]'),r=t?.querySelector('input[name="customerName"]'),i=t?.querySelector('input[name="customerPhone"]'),o=t?.querySelector("[data-order-error]"),c=t?.querySelector('select[name="paymentMethod"]'),l=t?.querySelector(".gcash-reference"),v=t?.querySelector('input[name="paymentReference"]'),d=()=>{if(!n||!r||!i)return;const y=n.selectedOptions[0];r.value=y?.dataset.name??"",i.value=y?.dataset.phone??""},f=()=>{const y=c?.value==="gcash";l&&(l.hidden=!y),v&&(v.required=y,y||(v.value=""))},p=(y,b)=>{if(!t)return;const T=t.querySelector(`input[name="${y}"]`);T&&(T.value=String(Math.max(0,Number(T.value||0)+b)),T.closest(".qty-card")?.classList.toggle("is-selected",Number(T.value)>0),T.dispatchEvent(new Event("input",{bubbles:!0})))};t?.querySelectorAll(".qty-control input").forEach(y=>{y.addEventListener("input",()=>{y.value=String(Math.max(0,Number(y.value||0))),y.closest(".qty-card")?.classList.toggle("is-selected",Number(y.value)>0)})}),t?.querySelectorAll("[data-qty-card]").forEach(y=>{y.addEventListener("click",b=>{const T=b.target;T.closest("input")||T.closest("button")||p(y.dataset.qtyCard??"",1)})}),t?.querySelectorAll("[data-qty-plus]").forEach(y=>{y.addEventListener("click",()=>p(y.dataset.qtyPlus??"",1))}),t?.querySelectorAll("[data-qty-minus]").forEach(y=>{y.addEventListener("click",()=>p(y.dataset.qtyMinus??"",-1))});const g=()=>{if(!t||!a)return;const y=ze(t,e.services),b=y[0],T=Qe(b,e.categories),E=Ze(t,e.services);if(!y.length||!b||!T){s&&(s.disabled=!0),o&&(o.hidden=!1,o.textContent="Please select at least one service quantity."),a.innerHTML='<div class="preview-total"><span>Total amount</span><strong>PHP 0.00</strong></div>';return}const N=ct(y,T,Je(b,T),E),P=N.serviceLines.map(q=>`${q.name} x${q.quantity}`),B=N.extras.map(q=>`${Y(q.name)} x${q.quantity}`);s&&(s.disabled=!1),o&&(o.hidden=!0,o.textContent=""),a.classList.remove("has-error"),a.innerHTML=`
      <div class="preview-line"><span>Services${P.length?` (${u(P.join(", "))})`:""}</span><strong>${$(N.price)}</strong></div>
      ${N.extraServiceAmount>0?`<div class="preview-line"><span>Extra services${B.length?` (${u(B.join(", "))})`:""}</span><strong>${$(N.extraServiceAmount)}</strong></div>`:""}
      <div class="preview-total"><span>Total amount</span><strong>${$(N.totalAmount)}</strong></div>
    `};n?.addEventListener("change",d),c?.addEventListener("change",f),f(),t?.addEventListener("input",g),t?.addEventListener("change",g),g(),t?.addEventListener("submit",async y=>{y.preventDefault();const b=new FormData(t),T=ze(t,e.services),E=T[0],N=Qe(E,e.categories);if(Ze(t,e.services),!T.length){o&&(o.hidden=!1,o.textContent="Please select at least one service quantity.");return}try{await ia({customerId:Number(b.get("customerId"))||void 0,customerName:String(b.get("customerName")??""),customerPhone:String(b.get("customerPhone")??"")||null,serviceQuantities:St(t,e.services),branch:e.branch,itemCategoryId:N?.id,weightKg:E&&N?Je(E,N):void 0,addonQuantities:Et(t,e.services),paidAmount:Number(b.get("paidAmount")??0),paymentMethod:String(b.get("paymentMethod")??"cash"),paymentReference:String(b.get("paymentReference")??"")||null,notes:String(b.get("notes")??"")||null}),await w()}catch(P){o&&(o.hidden=!1,o.textContent=P instanceof Error?P.message:"Order could not be saved.")}}),document.querySelectorAll(".advance-form").forEach(y=>{y.addEventListener("submit",async b=>{b.preventDefault();const T=new FormData(y);await ca(Number(y.dataset.orderId),Number(T.get("assignedStaffId"))||null),await w()})}),document.querySelectorAll(".payment-form").forEach(y=>{const b=y.querySelector('select[name="method"]'),T=y.querySelector('input[name="reference"]'),E=()=>{const N=b?.value==="gcash";T&&(T.hidden=!N,T.required=N,N||(T.value=""))};b?.addEventListener("change",E),E(),y.addEventListener("submit",async N=>{N.preventDefault();const P=new FormData(y);await dt(Number(y.dataset.orderId),{amount:Number(P.get("amount")),method:String(P.get("method")),reference:String(P.get("reference")??"")||null}),await w()})})}function za(e){document.querySelector("#service-form")?.addEventListener("submit",async t=>{t.preventDefault();const a=new FormData(t.currentTarget),s=a.get("id")?Number(a.get("id")):void 0;await Xe({id:s,name:String(a.get("name")??""),description:String(a.get("description")??"")||null,category:String(a.get("category")??""),serviceType:String(a.get("serviceType")??"order"),price:Number(a.get("price")??0),maxKg:Number(a.get("maxKg")??0),dryingMinutes:Number(a.get("dryingMinutes"))||null,includes:a.getAll("includes").map(String).filter(Boolean),additionalCharge:0,turnaroundHours:Number(a.get("turnaroundHours")??24),isActive:1}),await w()}),document.querySelectorAll(".edit-service-btn").forEach(t=>{t.addEventListener("click",()=>{const a=Number(t.dataset.id),s=e.find(r=>r.id===a),n=document.querySelector("#service-form");s&&n&&(n.querySelector("[name=id]").value=String(s.id),n.querySelector("[name=name]").value=s.name,n.querySelector("[name=category]").value=s.category,n.querySelector("[name=serviceType]").value=s.serviceType,n.querySelector("[name=price]").value=String(s.price),n.querySelector("[name=maxKg]").value=String(s.maxKg),n.querySelector("[name=dryingMinutes]").value=s.dryingMinutes?String(s.dryingMinutes):"",n.querySelectorAll('input[name="includes"]').forEach(r=>{r.checked=s.includes.includes(r.value)}),n.querySelector("[name=turnaroundHours]").value=String(s.turnaroundHours),n.querySelector("[name=description]").value=s.description??"",window.scrollTo({top:0,behavior:"smooth"}))})}),document.querySelectorAll(".deactivate-service-btn, .activate-service-btn").forEach(t=>{t.addEventListener("click",async()=>{const a=Number(t.dataset.id),s=e.find(n=>n.id===a);if(s){const n=s.isActive?0:1;await Xe({id:s.id,name:s.name,description:s.description,category:s.category,serviceType:s.serviceType,price:s.price,maxKg:s.maxKg,dryingMinutes:s.dryingMinutes,includes:s.includes,additionalCharge:s.additionalCharge,turnaroundHours:s.turnaroundHours,isActive:n}),await w()}})}),document.querySelector("#category-form")?.addEventListener("submit",async t=>{t.preventDefault();const a=new FormData(t.currentTarget);await ra({name:String(a.get("name")??""),maxKg:Number(a.get("maxKg")??0),additionalFee:Number(a.get("additionalFee")??0),isActive:1}),await w()})}function Za(){document.querySelector("#expense-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await fa({expenseDate:String(t.get("expenseDate")??""),name:String(t.get("name")??""),category:String(t.get("category")??""),description:String(t.get("description")??""),amount:Number(t.get("amount")??0)}),await w()}),document.querySelector("#fold-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await ua({orderTicket:String(t.get("orderTicket")??""),staffName:String(t.get("staffName")??""),foldCount:Number(t.get("foldCount")??1),rate:Number(t.get("rate")??5)}),await w()})}function es(e,t,a,s,n){document.querySelector("#generate-report")?.addEventListener("click",()=>{m.reportPreview=ve(),w()}),document.querySelector("#sales-form")?.addEventListener("submit",async f=>{f.preventDefault();const p=new FormData(f.currentTarget);await ha({saleDate:String(p.get("saleDate")??""),cashAmount:Number(p.get("cashAmount")??0),gcashAmount:Number(p.get("gcashAmount")??0),notes:String(p.get("notes")??"")}),await w()});const r=document.querySelector("[data-date-from]"),i=document.querySelector("[data-date-to]");document.querySelectorAll("[data-date-scope]").forEach(f=>{f.addEventListener("change",()=>{if(!f.checked||!r||!i)return;const p=new Date,g=le(p),y=new Date(p);f.value==="week"&&y.setDate(p.getDate()-6),f.value==="month"&&y.setDate(1),f.value!=="custom"&&(r.value=f.value==="today"?g:le(y),i.value=g)})});const o=f=>{const p=b=>String(b??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;"),g=b=>b==="Sales Report"?[110,125,150,215,95,95,105,105]:b==="Disbursement"?[110,115,150,220,105]:b==="Fold Count"?[220,125]:b==="Revolving Daily Summary"?[115,105,120,115]:b==="Revolving History"?[115,96,140,96,110,180,120]:[155,125,125,125,95,95,115,115];return`<?xml version="1.0"?>
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
  ${f.map(b=>{const T=g(b.name).map(N=>`<Column ss:Width="${N}" ss:AutoFitWidth="0"/>`).join(""),E=b.rows.map(N=>{if(!N.length)return'<Row ss:Height="10" ss:StyleID="BorderRow"><Cell ss:StyleID="BorderCell"><Data ss:Type="String">&nbsp;</Data></Cell></Row>';const P=N[0]==="Type"||N[0]==="Summary"||N[0]==="Sales Summary"||N[0]==="Disbursement Summary"||N[0]==="Staff"||N[0]==="Date of Sales"||N[0]==="Date",B=P?"HeaderRow":"BorderRow",q=P?"HeaderCell":"BorderCell",V=P?26:22,O=N.map(I=>`<Cell ss:StyleID="${q}"><Data ss:Type="${typeof I=="number"?"Number":"String"}">${p(I)}</Data></Cell>`).join("");return`<Row ss:Height="${V}" ss:StyleID="${B}">${O}</Row>`}).join("");return`
        <Worksheet ss:Name="${p(b.name)}">
          <Table>
            ${T}
            ${E}
          </Table>
        </Worksheet>`}).join("")}
</Workbook>`},c=()=>{const f=ve(),p=yt(e,t,a,s,n,f),g=[];p.selectedTypes.has("sales")&&g.push({name:"Sales Report",rows:p.salesRows().rows}),p.selectedTypes.has("disbursement")&&g.push({name:"Disbursement",rows:p.disbursementRows().rows}),p.selectedTypes.has("fold_count")&&g.push({name:"Fold Count",rows:p.foldCountRows().rows}),p.selectedTypes.has("revolving_fund")&&(g.push({name:"Revolving Daily Summary",rows:p.revolvingDailySummaryRows().rows}),g.push({name:"Revolving History",rows:p.revolvingHistoryRows().rows})),p.selectedTypes.has("summary")&&g.push({name:"Summary",rows:p.summaryRows()});const y=o(g.length?g:[{name:"Summary",rows:p.summaryRows()}]),b=`laba101-report-${f.from}-to-${f.to}.xls`;return new File([y],b,{type:"application/vnd.ms-excel"})},l=async()=>{const f=c();if(!A.isNativePlatform())return{fileName:f.name,uri:""};const p=await f.text(),g=f.name;await he.writeFile({path:g,data:p,directory:ee.External,encoding:ye.UTF8});const{uri:y}=await he.getUri({path:g,directory:ee.External});return{fileName:f.name,uri:y}},v=()=>{const f=c(),p=ve(),g=`laba101-report-${p.from}-to-${p.to}.xls`,y=f,b=URL.createObjectURL(y),T=document.createElement("a");return T.href=b,T.download=g,document.body.appendChild(T),T.click(),setTimeout(()=>{T.remove(),URL.revokeObjectURL(b)},1e3),g},d=async f=>{const p=document.querySelector(f==="export"?"#export-report":"#email-report");p&&(p.disabled=!0,p.textContent=f==="export"?"Exporting...":"Sending...");try{if(f==="export")if(A.isNativePlatform()){const g=await l();alert(`Report exported as "${g.fileName}".`)}else{const g=v();alert(`Report saved: ${g}`)}else{const g=await rt("report_email")||"";if(!g){alert("Please configure a report email in Settings first.");return}const y=ve(),b=`Laba101 report ${y.from} to ${y.to}`;if(A.isNativePlatform()){const T=await l();try{await tt.share({title:b,text:`Please find the attached Laba101 report file: ${T.fileName}`,files:[T.uri],dialogTitle:"Send report via email"}),alert(`Report saved and shared as "${T.fileName}".`)}catch(E){const N=String(E).toLowerCase();if(N.includes("share canceled")||N.includes("canceled"))alert(`Report saved as "${T.fileName}".`);else throw E}}else{const T=v(),E=`Hi,

Please find the attached Laba101 report file: ${T}

Date range: ${y.from} to ${y.to}`,N=`mailto:${g}?subject=${encodeURIComponent(b)}&body=${encodeURIComponent(E)}`;setTimeout(()=>{window.location.href=N},800),alert(`Report downloaded as "${T}".
Your email app will open — please attach the file and send.`)}}}catch(g){alert("Failed: "+String(g))}finally{p&&(p.disabled=!1,p.textContent=f==="export"?"Export Excel":"Send to Email")}};document.querySelector("#export-report")?.addEventListener("click",async()=>{await d("export")}),document.querySelector("#email-report")?.addEventListener("click",async()=>{await d("email")})}function ts(){document.querySelector("#order-queue-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);m.orderSearch=String(t.get("orderSearch")??"").trim(),m.orderDateFilter=String(t.get("orderDateFilter")??"").trim(),m.orderPaymentFilter=String(t.get("orderPaymentFilter")??"").trim(),w()}),document.querySelector("#order-queue-clear")?.addEventListener("click",()=>{m.orderSearch="",m.orderDateFilter="",m.orderPaymentFilter="",w()}),document.querySelector("#archived-order-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);m.archivedOrderSearch=String(t.get("archivedOrderSearch")??"").trim(),w()}),document.querySelector("#archived-order-clear")?.addEventListener("click",()=>{m.archivedOrderSearch="",w()})}function as(){document.querySelector("#customer-search-form")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);m.customerSearch=String(t.get("customerSearch")??"").trim(),w()}),document.querySelector("#customer-search-clear")?.addEventListener("click",()=>{m.customerSearch="",w()})}function ss(){document.querySelector("#machine-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await ba({machineName:String(t.get("machineName")??""),machineType:String(t.get("machineType")),status:String(t.get("status")),branch:String(t.get("branch")??"")}),await w()}),document.querySelector("#subcleaning-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=e.currentTarget.querySelector('button[type="submit"]');t&&(t.disabled=!0,t.textContent="Starting...");const a=new FormData(e.currentTarget),s=a.getAll("machineIds").map(Number);if(!s.length){alert("Please select at least one machine to clean."),t&&(t.disabled=!1,t.textContent="Start Cleaning");return}await wa({date:String(a.get("date")??""),machineIds:s,cleaningStatus:String(a.get("cleaningStatus")??""),notes:String(a.get("notes")??""),branch:String(a.get("branch")??"")}),await w()}),document.querySelectorAll(".complete-cleaning-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.machineId),a=e.dataset.branch??"";e.disabled=!0,e.textContent="Completing...",await Ta(t,a),await w()})}),document.querySelectorAll(".deactivate-machine-btn, .activate-machine-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.id),a=e.classList.contains("deactivate-machine-btn");await Sa(t,a?"inactive":"available"),await w()})})}function rs(e){const t=document.querySelector("#add-staff-modal"),a=document.querySelector("#open-add-staff-modal"),s=document.querySelector("#close-add-staff-modal"),n=document.querySelector("#staff-form"),r=()=>{n?.reset(),n&&(n.querySelector("[name=id]").value="");const o=document.querySelector("#add-staff-title");o&&(o.textContent="Add staff member"),t?.removeAttribute("hidden")},i=()=>{t?.setAttribute("hidden",""),n?.reset()};a?.addEventListener("click",r),s?.addEventListener("click",i),t?.addEventListener("click",o=>{o.target===t&&i()}),document.querySelectorAll(".edit-staff-btn").forEach(o=>{o.addEventListener("click",()=>{const c=Number(o.dataset.id),l=e.find(v=>v.id===c);if(l&&n){n.querySelector("[name=id]").value=String(l.id),n.querySelector("[name=name]").value=l.name,n.querySelector("[name=email]").value=l.email,n.querySelector("[name=password]").value=l.password,n.querySelector("[name=role]").value=l.role,n.querySelector("[name=branch]").value=l.branch;const v=document.querySelector("#add-staff-title");v&&(v.textContent="Edit staff member"),t?.removeAttribute("hidden")}})}),document.querySelectorAll(".deactivate-staff-btn, .activate-staff-btn").forEach(o=>{o.addEventListener("click",async()=>{const c=Number(o.dataset.id),l=e.find(v=>v.id===c);l&&(await We(c,{isActive:l.isActive!==0?0:1}),await w())})}),n?.addEventListener("submit",async o=>{o.preventDefault();const c=document.querySelector("#staff-save-btn");c&&(c.disabled=!0,c.textContent="Saving...");const l=new FormData(n),v=l.get("id")?Number(l.get("id")):void 0,d=String(l.get("name")??"").trim(),f=String(l.get("email")??"").trim(),p=String(l.get("password")??"password")||"password",g=String(l.get("role")),y=String(l.get("branch")??"");if(!d||!f){alert("Name and email are required."),c&&(c.disabled=!1,c.textContent="Save staff member");return}try{v?await We(v,{name:d,email:f,password:p,role:g,branch:y}):await ea({name:d,email:f,password:p,role:g,branch:y}),i(),await w()}catch{alert("Failed to save staff. The email may already be in use."),c&&(c.disabled=!1,c.textContent="Save staff member")}})}function ns(){document.querySelector("#settings-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await fe("branch",String(t.get("branch")??"Main Store")),await fe("fold_rate",String(t.get("foldRate")??"5")),String(t.get("reportEmail")??"")&&await fe("report_email",String(t.get("reportEmail"))),alert("Settings saved successfully!"),await w()})}await Jt();const et=localStorage.getItem(ce);if(et)try{const e=JSON.parse(et);if(e.email&&e.remembered){const t=await it(e.email,"password")??null;m.currentUser=t}}catch{localStorage.removeItem(ce)}function is(e,t,a,s){const n=e.filter(p=>p.status==="revolving").reduce((p,g)=>p+g.cashAmount,0),r=t.filter(p=>p.type==="add").reduce((p,g)=>p+g.amount,0),i=t.filter(p=>p.type==="disbursement").reduce((p,g)=>p+g.amount,0),o=n+r-i,c=m.revolvingHistoryFrom||"0000-01-01",l=m.revolvingHistoryTo||"9999-12-31",v=t.filter(p=>{const g=_(p.createdAt);return g>=c&&g<=l}),d=e.map(p=>{const g=ft(p.saleDate,a,s,p.cashAmount),y=p.status==="revolving"?'<span class="ok">Revolving</span>':p.status==="endorsed"?`<span class="warn">Endorsed to ${u(p.endorsedTo)}</span>`:'<span class="meta">Pending</span>',b=p.status!=="revolving"&&p.status!=="endorsed"?`<div class="row-actions">
          <button class="primary revolving-btn" data-id="${p.id}">Revolving</button>
          <button class="secondary endorsed-btn" data-id="${p.id}" data-date="${ne(p.saleDate)}">Endorsed</button>
        </div>`:"";return[`<strong>${u(ne(p.saleDate))}</strong>`,`<strong class="ok">${$(g)}</strong>`,y,p.statusUpdatedAt?u(ne(p.statusUpdatedAt)):"-",b]}),f=v.map(p=>[La(p.createdAt),`<strong>${u(p.revolvingNumber)}</strong>`,u(p.name),`<strong class="${p.type==="disbursement"?"warn":"ok"}">${p.type==="disbursement"?"-":"+"}${$(p.amount)}</strong>`,u(p.category),u(p.description||"-"),`<span class="${p.type==="add"?"ok":"warn"}">${p.type==="add"?"Add Revolving Fund":"Disbursement"}</span>`]);return`
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
        ${R("Daily Summary","Cash on hand per day (order cash + manual cash − disbursements)")}
        ${Ee(["Date of Sales","Cash on Hand","Status","Date Update","Action"],d,"data-table revolving-summary-datatable")}
      </article>

      <article class="panel">
        ${R("Revolving Table History","Filter by date — DISB numbers shared with Daily Report expenses")}
        <form id="revolving-history-filters" class="form revolving-history-filters">
          <div class="form-row">
            <label>From<input name="revolvingHistoryFrom" type="date" value="${m.revolvingHistoryFrom}" /></label>
            <label>To<input name="revolvingHistoryTo" type="date" value="${m.revolvingHistoryTo}" /></label>
          </div>
          <div class="row-actions">
            <button class="primary" type="submit">Apply filter</button>
            <button class="secondary" type="button" id="revolving-history-clear">Clear</button>
          </div>
        </form>
        ${Ee(["Date","Disbursement #","Name","Amount","Category","Description","Type"],f,"data-table revolving-history-datatable")}
      </article>

      ${m.endorseModalOpen?`
        <div class="modal-backdrop" role="presentation">
          <div class="receipt-modal" role="dialog" aria-modal="true" style="max-width: 400px; width: 90%;">
            <form id="endorse-form" class="form" style="padding: 24px;">
              <h3 style="margin-top: 0;">Endorse Money</h3>
              <p class="meta" style="margin-bottom: 16px;">Endorsing cash from <strong>${u(m.endorseSaleDate)}</strong>.</p>
              <label>Endorsed to (Name)<input name="endorsedTo" type="text" placeholder="Enter name" required /></label>
              <div class="modal-actions" style="margin-top: 24px; padding: 0;">
                <button class="primary" type="submit">Submit Endorsement</button>
                <button class="secondary" type="button" id="close-endorse-modal">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      `:""}

      ${m.revolvingModalOpen?`
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

      ${m.addFundModalOpen?`
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

      ${m.disbursementModalOpen?`
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
  `}function os(){document.querySelector("#revolving-history-filters")?.addEventListener("submit",async v=>{v.preventDefault();const d=new FormData(v.currentTarget);m.revolvingHistoryFrom=String(d.get("revolvingHistoryFrom")??"").trim(),m.revolvingHistoryTo=String(d.get("revolvingHistoryTo")??"").trim(),await w()}),document.querySelector("#revolving-history-clear")?.addEventListener("click",async()=>{m.revolvingHistoryFrom="",m.revolvingHistoryTo="",await w()}),document.querySelectorAll(".revolving-btn").forEach(v=>{v.addEventListener("click",async()=>{m.revolvingModalOpen=!0,m.revolvingSaleId=Number(v.dataset.id),await w()})});const e=document.getElementById("confirm-revolving-btn");e&&e.addEventListener("click",async()=>{await Ge(m.revolvingSaleId,"revolving",null,new Date().toISOString()),m.revolvingModalOpen=!1,await w()});const t=document.getElementById("close-revolving-modal");t&&t.addEventListener("click",async()=>{m.revolvingModalOpen=!1,await w()}),document.querySelectorAll(".endorsed-btn").forEach(v=>{v.addEventListener("click",async()=>{m.endorseModalOpen=!0,m.endorseSaleId=Number(v.dataset.id),m.endorseSaleDate=v.dataset.date??"",await w()})});const a=document.getElementById("close-endorse-modal");a&&a.addEventListener("click",async()=>{m.endorseModalOpen=!1,await w()});const s=document.getElementById("endorse-form");s&&s.addEventListener("submit",async v=>{v.preventDefault();const d=new FormData(s),f=String(d.get("endorsedTo")??"").trim();f&&(await Ge(m.endorseSaleId,"endorsed",f,new Date().toISOString()),m.endorseModalOpen=!1,await w())});const n=document.getElementById("add-revolving-fund-btn");n&&n.addEventListener("click",async()=>{m.addFundModalOpen=!0,await w()});const r=document.getElementById("close-add-fund-modal");r&&r.addEventListener("click",async()=>{m.addFundModalOpen=!1,await w()});const i=document.getElementById("add-fund-form");i&&i.addEventListener("submit",async v=>{v.preventDefault();const d=new FormData(i);await Ve({name:String(d.get("name")??"").trim(),amount:Number(d.get("amount")??0),category:"Add Revolving Fund",description:null,type:"add",createdAt:new Date().toISOString()}),m.addFundModalOpen=!1,await w()});const o=document.getElementById("revolving-disbursement-btn");o&&o.addEventListener("click",async()=>{m.disbursementModalOpen=!0,await w()});const c=document.getElementById("close-disbursement-modal");c&&c.addEventListener("click",async()=>{m.disbursementModalOpen=!1,await w()});const l=document.getElementById("disbursement-form");l&&l.addEventListener("submit",async v=>{v.preventDefault();const d=new FormData(l);await Ve({name:String(d.get("name")??"").trim(),amount:Number(d.get("amount")??0),category:String(d.get("category")??"").trim(),description:String(d.get("description")??"").trim(),type:"disbursement",expenseDate:j(),createdAt:new Date().toISOString()}),m.disbursementModalOpen=!1,await w()})}await w();export{ye as E,Re as W,Rt as b};
