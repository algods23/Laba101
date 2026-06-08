(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=a(n);fetch(n.href,r)}})();var ce;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(ce||(ce={}));class Oe extends Error{constructor(t,a,s){super(t),this.message=t,this.code=a,this.data=s}}const It=e=>{var t,a;return e?.androidBridge?"android":!((a=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},qt=e=>{const t=e.CapacitorCustomPlatform||null,a=e.Capacitor||{},s=a.Plugins=a.Plugins||{},n=()=>t!==null?t.name:It(e),r=()=>n()!=="web",i=v=>{const y=c.get(v);return!!(y?.platforms.has(n())||l(v))},l=v=>{var y;return(y=a.PluginHeaders)===null||y===void 0?void 0:y.find(f=>f.name===v)},u=v=>e.console.error(v),c=new Map,o=(v,y={})=>{const f=c.get(v);if(f)return console.warn(`Capacitor plugin "${v}" already registered. Cannot register plugins twice.`),f.proxy;const b=n(),E=l(v);let N;const P=async()=>(!N&&b in y?N=typeof y[b]=="function"?N=await y[b]():N=y[b]:t!==null&&!N&&"web"in y&&(N=typeof y.web=="function"?N=await y.web():N=y.web),N),p=(D,I)=>{var M,U;if(E){const B=E?.methods.find(j=>I===j.name);if(B)return B.rtype==="promise"?j=>a.nativePromise(v,I.toString(),j):(j,ye)=>a.nativeCallback(v,I.toString(),j,ye);if(D)return(M=D[I])===null||M===void 0?void 0:M.bind(D)}else{if(D)return(U=D[I])===null||U===void 0?void 0:U.bind(D);throw new Oe(`"${v}" plugin is not implemented on ${b}`,ce.Unimplemented)}},g=D=>{let I;const M=(...U)=>{const B=P().then(j=>{const ye=p(j,D);if(ye){const h=ye(...U);return I=h?.remove,h}else throw new Oe(`"${v}.${D}()" is not implemented on ${b}`,ce.Unimplemented)});return D==="addListener"&&(B.remove=async()=>I()),B};return M.toString=()=>`${D.toString()}() { [capacitor code] }`,Object.defineProperty(M,"name",{value:D,writable:!1,configurable:!1}),M},L=g("addListener"),$=g("removeListener"),F=(D,I)=>{const M=L({eventName:D},I),U=async()=>{const j=await M;$({eventName:D,callbackId:j},I)},B=new Promise(j=>M.then(()=>j({remove:U})));return B.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await U()},B},q=new Proxy({},{get(D,I){switch(I){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return E?F:L;case"removeListener":return $;default:return g(I)}}});return s[v]=q,c.set(v,{name:v,proxy:q,platforms:new Set([...Object.keys(y),...E?[b]:[]])}),q};return a.convertFileSrc||(a.convertFileSrc=v=>v),a.getPlatform=n,a.handleError=u,a.isNativePlatform=r,a.isPluginAvailable=i,a.registerPlugin=o,a.Exception=Oe,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},Ft=e=>e.Capacitor=qt(e),C=Ft(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),re=C.registerPlugin;class Me{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,a){let s=!1;this.listeners[t]||(this.listeners[t]=[],s=!0),this.listeners[t].push(a);const r=this.windowListeners[t];r&&!r.registered&&this.addWindowListener(r),s&&this.sendRetainedArgumentsForEvent(t);const i=async()=>this.removeListener(t,a);return Promise.resolve({remove:i})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,a,s){const n=this.listeners[t];if(!n){if(s){let r=this.retainedEventArguments[t];r||(r=[]),r.push(a),this.retainedEventArguments[t]=r}return}n.forEach(r=>r(a))}hasListeners(t){var a;return!!(!((a=this.listeners[t])===null||a===void 0)&&a.length)}registerWindowListener(t,a){this.windowListeners[a]={registered:!1,windowEventName:t,pluginEventName:a,handler:s=>{this.notifyListeners(a,s)}}}unimplemented(t="not implemented"){return new C.Exception(t,ce.Unimplemented)}unavailable(t="not available"){return new C.Exception(t,ce.Unavailable)}async removeListener(t,a){const s=this.listeners[t];if(!s)return;const n=s.indexOf(a);this.listeners[t].splice(n,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const a=this.retainedEventArguments[t];a&&(delete this.retainedEventArguments[t],a.forEach(s=>{this.notifyListeners(t,s)}))}}const Ve=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Ye=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class kt extends Me{async getCookies(){const t=document.cookie,a={};return t.split(";").forEach(s=>{if(s.length<=0)return;let[n,r]=s.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");n=Ye(n).trim(),r=Ye(r).trim(),a[n]=r}),a}async setCookie(t){try{const a=Ve(t.key),s=Ve(t.value),n=t.expires?`; expires=${t.expires.replace("expires=","")}`:"",r=(t.path||"/").replace("path=",""),i=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${a}=${s||""}${n}; path=${r}; ${i};`}catch(a){return Promise.reject(a)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const a of t)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}re("CapacitorCookies",{web:()=>new kt});const Mt=async e=>new Promise((t,a)=>{const s=new FileReader;s.onload=()=>{const n=s.result;t(n.indexOf(",")>=0?n.split(",")[1]:n)},s.onerror=n=>a(n),s.readAsDataURL(e)}),Ut=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(n=>n.toLocaleLowerCase()).reduce((n,r,i)=>(n[r]=e[t[i]],n),{})},Bt=(e,t=!0)=>e?Object.entries(e).reduce((s,n)=>{const[r,i]=n;let l,u;return Array.isArray(i)?(u="",i.forEach(c=>{l=t?encodeURIComponent(c):c,u+=`${r}=${l}&`}),u.slice(0,-1)):(l=t?encodeURIComponent(i):i,u=`${r}=${l}`),`${s}&${u}`},"").substr(1):null,_t=(e,t={})=>{const a=Object.assign({method:e.method||"GET",headers:e.headers},t),n=Ut(e.headers)["content-type"]||"";if(typeof e.data=="string")a.body=e.data;else if(n.includes("application/x-www-form-urlencoded")){const r=new URLSearchParams;for(const[i,l]of Object.entries(e.data||{}))r.set(i,l);a.body=r.toString()}else if(n.includes("multipart/form-data")||e.data instanceof FormData){const r=new FormData;if(e.data instanceof FormData)e.data.forEach((l,u)=>{r.append(u,l)});else for(const l of Object.keys(e.data))r.append(l,e.data[l]);a.body=r;const i=new Headers(a.headers);i.delete("content-type"),a.headers=i}else(n.includes("application/json")||typeof e.data=="object")&&(a.body=JSON.stringify(e.data));return a};class jt extends Me{async request(t){const a=_t(t,t.webFetchExtra),s=Bt(t.params,t.shouldEncodeUrlParams),n=s?`${t.url}?${s}`:t.url,r=await fetch(n,a),i=r.headers.get("content-type")||"";let{responseType:l="text"}=r.ok?t:{};i.includes("application/json")&&(l="json");let u,c;switch(l){case"arraybuffer":case"blob":c=await r.blob(),u=await Mt(c);break;case"json":u=await r.json();break;default:u=await r.text()}const o={};return r.headers.forEach((v,y)=>{o[y]=v}),{data:u,headers:o,status:r.status,url:r.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}re("CapacitorHttp",{web:()=>new jt});var Je;(function(e){e.Dark="DARK",e.Light="LIGHT",e.Default="DEFAULT"})(Je||(Je={}));var Qe;(function(e){e.StatusBar="StatusBar",e.NavigationBar="NavigationBar"})(Qe||(Qe={}));class Ht extends Me{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}re("SystemBars",{web:()=>new Ht});const Wt="modulepreload",Xt=function(e){return"/"+e},ze={},Ue=function(t,a,s){let n=Promise.resolve();if(a&&a.length>0){let u=function(c){return Promise.all(c.map(o=>Promise.resolve(o).then(v=>({status:"fulfilled",value:v}),v=>({status:"rejected",reason:v}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),l=i?.nonce||i?.getAttribute("nonce");n=u(a.map(c=>{if(c=Xt(c),c in ze)return;ze[c]=!0;const o=c.endsWith(".css"),v=o?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${v}`))return;const y=document.createElement("link");if(y.rel=o?"stylesheet":Wt,o||(y.as="script"),y.crossOrigin="",y.href=c,l&&y.setAttribute("nonce",l),document.head.appendChild(y),o)return new Promise((f,b)=>{y.addEventListener("load",f),y.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(i){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=i,window.dispatchEvent(l),!l.defaultPrevented)throw i}return n.then(i=>{for(const l of i||[])l.status==="rejected"&&r(l.reason);return t().catch(r)})};function Kt(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,a){return new Proxy({},{get(s,n){return(r,i,l)=>{const u=e.Capacitor.Plugins[a];if(u===void 0){l(new Error(`Capacitor plugin ${a} not found`));return}if(typeof u[n]!="function"){l(new Error(`Method ${n} not found in Capacitor plugin ${a}`));return}(async()=>{try{const c=await u[n](r);i(c)}catch(c){l(c)}})()}}})}})}function Gt(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,a){return e.cordova.plugins[a]}})}function Vt(e=!1){typeof window>"u"||(window.CapacitorUtils=window.CapacitorUtils||{},window.Capacitor!==void 0&&!e?Kt(window):window.cordova!==void 0&&Gt(window))}var Ae;(function(e){e.Documents="DOCUMENTS",e.Data="DATA",e.Library="LIBRARY",e.Cache="CACHE",e.External="EXTERNAL",e.ExternalStorage="EXTERNAL_STORAGE",e.ExternalCache="EXTERNAL_CACHE",e.LibraryNoCloud="LIBRARY_NO_CLOUD",e.Temporary="TEMPORARY"})(Ae||(Ae={}));var qe;(function(e){e.UTF8="utf8",e.ASCII="ascii",e.UTF16="utf16"})(qe||(qe={}));const Ze=re("Filesystem",{web:()=>Ue(()=>import("./web-CGhtpJ-r.js"),[]).then(e=>new e.FilesystemWeb)});Vt();const Yt=re("Share",{web:()=>Ue(()=>import("./web-BrEkdsd1.js"),[]).then(e=>new e.ShareWeb)});class Jt{constructor(t){this.sqlite=t,this._connectionDict=new Map}async initWebStore(){try{return await this.sqlite.initWebStore(),Promise.resolve()}catch(t){return Promise.reject(t)}}async saveToStore(t){try{return await this.sqlite.saveToStore({database:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async saveToLocalDisk(t){try{return await this.sqlite.saveToLocalDisk({database:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getFromLocalDiskToStore(t){const a=t??!0;try{return await this.sqlite.getFromLocalDiskToStore({overwrite:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async echo(t){try{const a=await this.sqlite.echo({value:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isSecretStored(){try{const t=await this.sqlite.isSecretStored();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async setEncryptionSecret(t){try{return await this.sqlite.setEncryptionSecret({passphrase:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async changeEncryptionSecret(t,a){try{return await this.sqlite.changeEncryptionSecret({passphrase:t,oldpassphrase:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async clearEncryptionSecret(){try{return await this.sqlite.clearEncryptionSecret(),Promise.resolve()}catch(t){return Promise.reject(t)}}async checkEncryptionSecret(t){try{const a=await this.sqlite.checkEncryptionSecret({passphrase:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async addUpgradeStatement(t,a){try{return t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.addUpgradeStatement({database:t,upgrade:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async createConnection(t,a,s,n,r){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.createConnection({database:t,encrypted:a,mode:s,version:n,readonly:r});const i=new et(t,r,this.sqlite),l=r?`RO_${t}`:`RW_${t}`;return this._connectionDict.set(l,i),Promise.resolve(i)}catch(i){return Promise.reject(i)}}async closeConnection(t,a){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.closeConnection({database:t,readonly:a});const s=a?`RO_${t}`:`RW_${t}`;return this._connectionDict.delete(s),Promise.resolve()}catch(s){return Promise.reject(s)}}async isConnection(t,a){const s={};t.endsWith(".db")&&(t=t.slice(0,-3));const n=a?`RO_${t}`:`RW_${t}`;return s.result=this._connectionDict.has(n),Promise.resolve(s)}async retrieveConnection(t,a){t.endsWith(".db")&&(t=t.slice(0,-3));const s=a?`RO_${t}`:`RW_${t}`;if(this._connectionDict.has(s)){const n=this._connectionDict.get(s);return typeof n<"u"?Promise.resolve(n):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async getNCDatabasePath(t,a){try{const s=await this.sqlite.getNCDatabasePath({path:t,database:a});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async createNCConnection(t,a){try{await this.sqlite.createNCConnection({databasePath:t,version:a});const s=new et(t,!0,this.sqlite),n=`RO_${t})`;return this._connectionDict.set(n,s),Promise.resolve(s)}catch(s){return Promise.reject(s)}}async closeNCConnection(t){try{await this.sqlite.closeNCConnection({databasePath:t});const a=`RO_${t})`;return this._connectionDict.delete(a),Promise.resolve()}catch(a){return Promise.reject(a)}}async isNCConnection(t){const a={},s=`RO_${t})`;return a.result=this._connectionDict.has(s),Promise.resolve(a)}async retrieveNCConnection(t){if(this._connectionDict.has(t)){const a=`RO_${t})`,s=this._connectionDict.get(a);return typeof s<"u"?Promise.resolve(s):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async isNCDatabase(t){try{const a=await this.sqlite.isNCDatabase({databasePath:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async retrieveAllConnections(){return this._connectionDict}async closeAllConnections(){const t=new Map;try{for(const a of this._connectionDict.keys()){const s=a.substring(3),n=a.substring(0,3)==="RO_";await this.sqlite.closeConnection({database:s,readonly:n}),t.set(a,null)}for(const a of t.keys())this._connectionDict.delete(a);return Promise.resolve()}catch(a){return Promise.reject(a)}}async checkConnectionsConsistency(){try{const t=[...this._connectionDict.keys()],a=[],s=[];for(const r of t)a.push(r.substring(0,2)),s.push(r.substring(3));const n=await this.sqlite.checkConnectionsConsistency({dbNames:s,openModes:a});return n.result||(this._connectionDict=new Map),Promise.resolve(n)}catch(t){return this._connectionDict=new Map,Promise.reject(t)}}async importFromJson(t){try{const a=await this.sqlite.importFromJson({jsonstring:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isJsonValid(t){try{const a=await this.sqlite.isJsonValid({jsonstring:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async copyFromAssets(t){const a=t??!0;try{return await this.sqlite.copyFromAssets({overwrite:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async getFromHTTPRequest(t,a){const s=a??!0;try{return await this.sqlite.getFromHTTPRequest({url:t,overwrite:s}),Promise.resolve()}catch(n){return Promise.reject(n)}}async isDatabaseEncrypted(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const a=await this.sqlite.isDatabaseEncrypted({database:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isInConfigEncryption(){try{const t=await this.sqlite.isInConfigEncryption();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isInConfigBiometricAuth(){try{const t=await this.sqlite.isInConfigBiometricAuth();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isDatabase(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const a=await this.sqlite.isDatabase({database:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async getDatabaseList(){try{const a=(await this.sqlite.getDatabaseList()).values;a.sort();const s={values:a};return Promise.resolve(s)}catch(t){return Promise.reject(t)}}async getMigratableDbList(t){const a=t||"default";try{const s=await this.sqlite.getMigratableDbList({folderPath:a});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async addSQLiteSuffix(t,a){const s=t||"default",n=a||[];try{const r=await this.sqlite.addSQLiteSuffix({folderPath:s,dbNameList:n});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async deleteOldDatabases(t,a){const s=t||"default",n=a||[];try{const r=await this.sqlite.deleteOldDatabases({folderPath:s,dbNameList:n});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async moveDatabasesAndAddSuffix(t,a){const s=t||"default",n=a||[];return this.sqlite.moveDatabasesAndAddSuffix({folderPath:s,dbNameList:n})}}class et{constructor(t,a,s){this.dbName=t,this.readonly=a,this.sqlite=s}getConnectionDBName(){return this.dbName}getConnectionReadOnly(){return this.readonly}async open(){try{return await this.sqlite.open({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async close(){try{return await this.sqlite.close({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async beginTransaction(){try{const t=await this.sqlite.beginTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async commitTransaction(){try{const t=await this.sqlite.commitTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async rollbackTransaction(){try{const t=await this.sqlite.rollbackTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTransactionActive(){try{const t=await this.sqlite.isTransactionActive({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async loadExtension(t){try{return await this.sqlite.loadExtension({database:this.dbName,path:t,readonly:this.readonly}),Promise.resolve()}catch(a){return Promise.reject(a)}}async enableLoadExtension(t){try{return await this.sqlite.enableLoadExtension({database:this.dbName,toggle:t,readonly:this.readonly}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getUrl(){try{const t=await this.sqlite.getUrl({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getVersion(){try{const t=await this.sqlite.getVersion({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getTableList(){try{const t=await this.sqlite.getTableList({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async execute(t,a=!0,s=!0){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const n=await this.sqlite.execute({database:this.dbName,statements:t,transaction:a,readonly:!1,isSQL92:s});return Promise.resolve(n)}}catch(n){return Promise.reject(n)}}async query(t,a,s=!0){let n;try{return a&&a.length>0?n=await this.sqlite.query({database:this.dbName,statement:t,values:a,readonly:this.readonly,isSQL92:!0}):n=await this.sqlite.query({database:this.dbName,statement:t,values:[],readonly:this.readonly,isSQL92:s}),n=await this.reorderRows(n),Promise.resolve(n)}catch(r){return Promise.reject(r)}}async run(t,a,s=!0,n="no",r=!0){let i;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(a&&a.length>0?i=await this.sqlite.run({database:this.dbName,statement:t,values:a,transaction:s,readonly:!1,returnMode:n,isSQL92:!0}):i=await this.sqlite.run({database:this.dbName,statement:t,values:[],transaction:s,readonly:!1,returnMode:n,isSQL92:r}),i.changes=await this.reorderRows(i.changes),Promise.resolve(i))}catch(l){return Promise.reject(l)}}async executeSet(t,a=!0,s="no",n=!0){let r;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(r=await this.sqlite.executeSet({database:this.dbName,set:t,transaction:a,readonly:!1,returnMode:s,isSQL92:n}),r.changes=await this.reorderRows(r.changes),Promise.resolve(r))}catch(i){return Promise.reject(i)}}async isExists(){try{const t=await this.sqlite.isDBExists({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTable(t){try{const a=await this.sqlite.isTableExists({database:this.dbName,table:t,readonly:this.readonly});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isDBOpen(){try{const t=await this.sqlite.isDBOpen({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async delete(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteDatabase({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async createSyncTable(){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const t=await this.sqlite.createSyncTable({database:this.dbName,readonly:!1});return Promise.resolve(t)}}catch(t){return Promise.reject(t)}}async setSyncDate(t){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.setSyncDate({database:this.dbName,syncdate:t,readonly:!1}),Promise.resolve())}catch(a){return Promise.reject(a)}}async getSyncDate(){try{const t=await this.sqlite.getSyncDate({database:this.dbName,readonly:this.readonly});let a="";return t.syncDate>0&&(a=new Date(t.syncDate*1e3).toISOString()),Promise.resolve(a)}catch(t){return Promise.reject(t)}}async exportToJson(t,a=!1){try{const s=await this.sqlite.exportToJson({database:this.dbName,jsonexportmode:t,readonly:this.readonly,encrypted:a});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async deleteExportedRows(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteExportedRows({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async executeTransaction(t,a=!0){let s=0,n=!1;if(this.readonly)return Promise.reject("not allowed in read-only mode");if(await this.sqlite.beginTransaction({database:this.dbName}),n=await this.sqlite.isTransactionActive({database:this.dbName}),!n)return Promise.reject("After Begin Transaction, no transaction active");try{for(const l of t){if(typeof l!="object"||!("statement"in l))throw new Error("Error a task.statement must be provided");if("values"in l&&l.values&&l.values.length>0){const u=l.statement.toUpperCase().includes("RETURNING")?"all":"no",c=await this.sqlite.run({database:this.dbName,statement:l.statement,values:l.values,transaction:!1,readonly:!1,returnMode:u,isSQL92:a});if(c.changes.changes<0)throw new Error("Error in transaction method run ");s+=c.changes.changes}else{const u=await this.sqlite.execute({database:this.dbName,statements:l.statement,transaction:!1,readonly:!1});if(u.changes.changes<0)throw new Error("Error in transaction method execute ");s+=u.changes.changes}}const r=await this.sqlite.commitTransaction({database:this.dbName});s+=r.changes.changes;const i={changes:{changes:s}};return Promise.resolve(i)}catch(r){const i=r.message?r.message:r;return await this.sqlite.rollbackTransaction({database:this.dbName}),Promise.reject(i)}}async reorderRows(t){const a=t;if(t?.values&&typeof t.values[0]=="object"&&Object.keys(t.values[0]).includes("ios_columns")){const s=t.values[0].ios_columns,n=[];for(let r=1;r<t.values.length;r++){const i=t.values[r],l={};for(const u of s)l[u]=i[u];n.push(l)}a.values=n}return Promise.resolve(a)}}const Qt=re("CapacitorSQLite",{web:()=>Ue(()=>import("./web-DZvcuo02.js"),[]).then(e=>new e.CapacitorSQLiteWeb),electron:()=>window.CapacitorCustomPlatform.plugins.CapacitorSQLite});function zt(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}const Zt="laba101_offline",Le="fresh_start_reset_v1",ea=new Jt(Qt);let Ee=null;const G=[{id:1,name:"Laba101 Admin",email:"admin@laba101.test",password:"password",role:"admin",branch:"Main Store"},{id:2,name:"Gensan Branch Staff",email:"staff@laba101.gensan",password:"password",role:"staff",branch:"Gensan Branch"}],Ce=[],J=[V(1,"Drop-off","P185. Includes wash, dry, and fold.","Drop-Off","order",185,8,40,["Wash","Dry","Fold"],0,24),V(2,"Full Service","P200. Wash, Fabcon, detergent, dry, and fold.","Full Service","order",200,8,40,["Wash","Dry","Fold","Detergent","Fabcon"],0,24),V(3,"Self Service Wash","P60. Self-service wash (max 8kg per load).","Self Service","order",60,8,null,["Wash"],0,1),V(4,"Self Service Dry","P70. Self-service dry (40 mins).","Self Service","order",70,8,40,["Dry"],0,1),V(6,"Dry 10 mins","Additional drying time (10 mins).","Add-on","addon",30,8,10,["Dry"],0,1),V(7,"Dry 20 mins","Additional drying time (20 mins).","Add-on","addon",50,8,20,["Dry"],0,1),V(8,"Dry 40 mins","Additional drying time (40 mins).","Add-on","addon",70,8,40,["Dry"],0,1),V(9,"Additional Zonrox","Extra Zonrox bleach add-on per load.","Add-on","addon",25,0,null,["Zonrox"],0,0),V(10,"Additional Fabcon","Extra Fabcon fabric conditioner add-on per load.","Add-on","addon",25,0,null,["Fabcon"],0,0)],te=[{id:1,name:"Regular Clothes",maxKg:8,additionalFee:0,isActive:1},{id:2,name:"Comforter",maxKg:4,additionalFee:0,isActive:1},{id:3,name:"Thin Blankets",maxKg:6,additionalFee:0,isActive:1},{id:4,name:"Bedsheets",maxKg:6,additionalFee:0,isActive:1},{id:5,name:"Bath Towels",maxKg:6,additionalFee:0,isActive:1},{id:6,name:"Curtains",maxKg:6,additionalFee:0,isActive:1}];function tt(e,t){const a=A(e,[]),s=new Map(a.map(r=>[r.id,r])),n=t.map(r=>{const i=s.get(r.id);return i?{...r,...i,isActive:i.isActive??r.isActive}:r});(a.length!==n.length||n.some((r,i)=>r.id!==a[i]?.id||JSON.stringify(r)!==JSON.stringify(a[i])))&&w(e,n)}async function ta(){tt("services",J),tt("item_categories",te)}async function Re(e){for(const t of J)((await e.query("SELECT id FROM laundry_services WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive,t.id]):await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive]);for(const t of te)((await e.query("SELECT id FROM item_categories WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.maxKg,t.additionalFee,t.isActive,t.id]):await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[t.id,t.name,t.maxKg,t.additionalFee,t.isActive])}const ae=[],le=[],ne=[],de=[],ue=[],Q=[...[1,2,3,4].map(e=>({id:e,machineName:`Washer ${e}`,machineType:"washer",status:"available",branch:"Main Store"})),...[1,2,3,4].map(e=>({id:e+4,machineName:`Dryer ${e}`,machineType:"dryer",status:"available",branch:"Main Store"}))],me=[{key:"branch",value:"Main Store"},{key:"fold_rate",value:"5"},{key:"report_email",value:"admin@laba101.test"}];function V(e,t,a,s,n,r,i,l,u,c,o){return{id:e,name:t,description:a,category:s,serviceType:n,price:r,maxKg:i,dryingMinutes:l,includes:u,additionalCharge:c,turnaroundHours:o,isActive:1}}function H(e){return`laba101-mobile-${e}`}function A(e,t){const a=localStorage.getItem(H(e));if(!a)return structuredClone(t);try{return JSON.parse(a)}catch{return structuredClone(t)}}function w(e,t){localStorage.setItem(H(e),JSON.stringify(t))}function X(e){return e.reduce((t,a)=>Math.max(t,a.id),0)+1}function se(){return new Date().toISOString()}function Fe(e=new Date){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${s}`}function aa(){return Fe().slice(2).replaceAll("-","")}function Y(e,t){if(!e)return t;try{return JSON.parse(e)}catch{return t}}async function R(){return Ee||(Ee=await ea.createConnection(Zt,!1,"no-encryption",1,!1),await Ee.open()),Ee}async function k(e,t,a,s){((await e.query(`PRAGMA table_info(${t})`)).values??[]).some(i=>i.name===a)||await e.execute(`ALTER TABLE ${t} ADD COLUMN ${a} ${s}`)}function sa(){const e=A("staff",G),t=new Map(e.map(s=>[s.id,s]));let a=!1;for(const s of G){const n=t.get(s.id);if(!n){t.set(s.id,{...s,isActive:1}),a=!0;continue}const r={...n,name:s.name,email:s.email,password:s.password,role:s.role,branch:s.branch,isActive:1};JSON.stringify(r)!==JSON.stringify(n)&&(t.set(s.id,r),a=!0)}a&&w("staff",Array.from(t.values()).sort((s,n)=>s.id-n.id))}async function na(){localStorage.getItem(H(Le))||(w("staff",G),w("customers",[]),w("orders",[]),w("payments",[]),w("fold_logs",[]),w("expenses",[]),w("sales",[]),localStorage.getItem(H("services"))||w("services",J),localStorage.getItem(H("item_categories"))||w("item_categories",te),localStorage.getItem(H("machines"))||w("machines",Q),localStorage.getItem(H("subcleanings"))||w("subcleanings",[]),localStorage.getItem(H("settings"))||w("settings",me),localStorage.removeItem("laba101-mobile-session"),w(Le,!0))}async function mt(e){for(const t of G){if(((await e.query("SELECT id FROM staff WHERE id = ?",[t.id])).values??[]).length>0){await e.run("UPDATE staff SET name = ?, email = ?, password = ?, role = ?, branch = ?, isActive = 1 WHERE id = ?",[t.name,t.email,t.password,t.role,t.branch,t.id]);continue}await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.email,t.password,t.role,t.branch,1])}}async function ra(e){if(!(((await e.query("SELECT COUNT(*) as count FROM machines")).values?.[0]?.count??0)>0))for(const a of Q)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[a.id,a.machineName,a.machineType,a.status,a.branch])}async function ia(e){for(const t of me)await e.run("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)",[t.key,t.value])}async function vt(e){for(const t of J)((await e.query("SELECT id FROM laundry_services WHERE id = ?",[t.id])).values??[]).length>0||await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive]);for(const t of te)((await e.query("SELECT id FROM item_categories WHERE id = ?",[t.id])).values??[]).length>0||await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[t.id,t.name,t.maxKg,t.additionalFee,t.isActive])}async function oa(e){((await e.query("SELECT value FROM settings WHERE key = ?",[Le])).values??[]).length>0||(await e.execute(`
    DELETE FROM payments;
    DELETE FROM orders;
    DELETE FROM customers;
    DELETE FROM fold_logs;
    DELETE FROM disbursement_expenses;
    DELETE FROM daily_sales;
    DELETE FROM revolving_history;
    DELETE FROM staff WHERE id NOT IN (1, 2);
  `),await mt(e),await vt(e),await ra(e),await ia(e),await e.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",[Le,se()]),localStorage.removeItem("laba101-mobile-session"))}async function ca(){if(!C.isNativePlatform()){await na(),!localStorage.getItem(H("seeded_v4"))&&!localStorage.getItem(H("services"))&&!localStorage.getItem(H("staff"))&&(w("staff",G),w("customers",Ce),w("services",J),w("item_categories",te),w("orders",ae),w("payments",le),w("fold_logs",[]),w("expenses",ne),w("sales",de),w("revolving_history",ue),w("machines",Q),w("subcleanings",[]),w("settings",me),w("seeded_v4",!0)),await ta(),sa(),localStorage.getItem(H("seeded_v4"))||w("seeded_v4",!0);return}const e=await R();await e.execute(`
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
  `),await k(e,"staff","email","TEXT"),await k(e,"staff","password","TEXT"),await k(e,"staff","role","TEXT"),await k(e,"staff","isActive","INTEGER NOT NULL DEFAULT 1"),await e.run('UPDATE staff SET password = ? WHERE password IS NULL OR password = ""',["password"]),await e.run('UPDATE staff SET role = ? WHERE role IS NULL OR role = ""',["staff"]),await k(e,"orders","customerId","INTEGER NOT NULL DEFAULT 0"),await k(e,"orders","phone","TEXT"),await k(e,"orders","serviceId","INTEGER NOT NULL DEFAULT 0"),await k(e,"orders","serviceLines","TEXT"),await k(e,"orders","itemCategoryId","INTEGER NOT NULL DEFAULT 0"),await k(e,"orders","itemCategory",'TEXT NOT NULL DEFAULT "Regular Clothes"'),await k(e,"orders","workflowCompleted","TEXT"),await k(e,"orders","weightKg","REAL NOT NULL DEFAULT 0"),await k(e,"orders","price","REAL NOT NULL DEFAULT 0"),await k(e,"orders","additionalCharge","REAL NOT NULL DEFAULT 0"),await k(e,"orders","extraServiceAmount","REAL NOT NULL DEFAULT 0"),await k(e,"orders","totalAmount","REAL NOT NULL DEFAULT 0"),await k(e,"orders","paidAmount","REAL NOT NULL DEFAULT 0"),await k(e,"orders","extras","TEXT"),await k(e,"orders","notes","TEXT"),await k(e,"orders","foldedByStaffIds","TEXT"),await k(e,"orders","dueAt","TEXT"),await k(e,"orders","createdAt",'TEXT NOT NULL DEFAULT ""'),await k(e,"daily_sales","saleNumber","TEXT"),await k(e,"daily_sales","status","TEXT"),await k(e,"daily_sales","endorsedTo","TEXT"),await k(e,"daily_sales","statusUpdatedAt","TEXT"),await k(e,"disbursement_expenses","disbursementType",'TEXT NOT NULL DEFAULT "daily"');const a=((await e.query("SELECT COUNT(*) as count FROM staff")).values?.[0]?.count??0)===0;if(a){for(const s of G)await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[s.id,s.name,s.email,s.password,s.role,s.branch,1]);for(const s of Ce)await e.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[s.id,s.name,s.phone,s.address]);for(const s of J)await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[s.id,s.name,s.description,s.category,s.serviceType,s.price,s.maxKg,s.dryingMinutes,JSON.stringify(s.includes),s.additionalCharge,s.turnaroundHours,s.isActive]);for(const s of te)await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[s.id,s.name,s.maxKg,s.additionalFee,s.isActive]);for(const s of ae)await pt(e,s);for(const s of le)await e.run("INSERT INTO payments (id, orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?, ?)",[s.id,s.orderId,s.amount,s.method,s.reference,s.receivedAt,s.branch]);for(const s of ne)await e.run("INSERT INTO disbursement_expenses (id, expenseDate, number, disbursementType, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[s.id,s.expenseDate,s.number,s.disbursementType??"daily",s.name,s.category,s.description,s.amount]);for(const s of de)await e.run("INSERT INTO daily_sales (id, saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?, ?)",[s.id,s.saleDate,s.saleNumber,s.cashAmount,s.gcashAmount,s.totalAmount,s.notes]);for(const s of ue)await e.run("INSERT INTO revolving_history (id, revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[s.id,s.revolvingNumber,s.name,s.amount,s.category,s.description,s.type,s.createdAt]);for(const s of Q)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[s.id,s.machineName,s.machineType,s.status,s.branch]);for(const s of me)await e.run("INSERT INTO settings (key, value) VALUES (?, ?)",[s.key,s.value]);await e.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",["fresh_install_defaults",se()])}await Re(e),await mt(e),a||await vt(e),await oa(e)}async function pt(e,t){await e.run("INSERT INTO orders (id, ticket, customerId, customer, phone, serviceId, service, serviceLines, itemCategoryId, itemCategory, branch, status, workflowCompleted, weightKg, price, additionalCharge, extraServiceAmount, totalAmount, paidAmount, extras, notes, foldedBy, foldedByStaffIds, dueAt, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.ticket,t.customerId,t.customer,t.phone,t.serviceId,t.service,JSON.stringify(t.serviceLines??[]),t.itemCategoryId,t.itemCategory,t.branch,t.status,JSON.stringify(t.workflowCompleted),t.weightKg,t.price,t.additionalCharge,t.extraServiceAmount,t.totalAmount,t.paidAmount,JSON.stringify(t.extras),t.notes,t.foldedBy,JSON.stringify(t.foldedByStaffIds??[]),t.dueAt,t.createdAt])}function la(e){const t=Number(e.paidAmount??0),a=Number(e.totalAmount??0),s=Number(e.foldedBy),n=Y(e.serviceLines,[]),r=Number(e.serviceId),i=String(e.service),l=Number(e.price);return{id:Number(e.id),ticket:String(e.ticket),customerId:Number(e.customerId),customer:String(e.customer),phone:e.phone?String(e.phone):null,serviceId:r,service:i,serviceLines:n.length?n:[{id:r,name:i,price:l,quantity:1,total:l}],itemCategoryId:Number(e.itemCategoryId),itemCategory:String(e.itemCategory),branch:String(e.branch),status:String(e.status),workflowCompleted:Y(e.workflowCompleted,[]),weightKg:Number(e.weightKg),price:l,additionalCharge:Number(e.additionalCharge),extraServiceAmount:Number(e.extraServiceAmount),totalAmount:a,paidAmount:t,balance:Number((a-t).toFixed(2)),extras:Y(e.extras,[]),notes:e.notes?String(e.notes):null,foldedBy:Number.isFinite(s)&&s>0?s:null,foldedByName:e.foldedByName?String(e.foldedByName):null,foldedByStaffIds:Y(e.foldedByStaffIds,[]),dueAt:String(e.dueAt),createdAt:String(e.createdAt)}}async function da(){await ca()}async function pe(){return(await Be()).find(t=>t.key==="branch")?.value??"Main Store"}async function ua(){const e=await Be();return Number(e.find(t=>t.key==="fold_rate")?.value??"5")}async function ft(e){return(await Be()).find(a=>a.key===e)?.value}async function Be(){return C.isNativePlatform()?(await(await R()).query("SELECT key, value FROM settings ORDER BY key")).values??[]:A("settings",me)}async function Te(e,t){if(!C.isNativePlatform()){const s=A("settings",me).filter(n=>n.key!==e);s.push({key:e,value:t}),w("settings",s);return}await(await R()).run("REPLACE INTO settings (key, value) VALUES (?, ?)",[e,t])}async function ma(e){return C.isNativePlatform()?(await(await R()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff WHERE branch = ? ORDER BY name ASC',[e])).values??[]:A("staff",G).filter(s=>s.branch===e)}async function yt(){return C.isNativePlatform()?(await(await R()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff ORDER BY name ASC')).values??[]:A("staff",G)}async function ht(e,t){const a=e.trim().toLowerCase();return(await yt()).find(n=>n.email.toLowerCase()===a&&n.password===t&&n.isActive!==0)??null}async function va(e){if(!C.isNativePlatform()){const a=A("staff",G);a.unshift({id:X(a),...e,isActive:1}),w("staff",a);return}await(await R()).run("INSERT INTO staff (name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?)",[e.name,e.email,e.password,e.role,e.branch,1])}async function at(e,t){if(!C.isNativePlatform()){const r=A("staff",G),i=r.find(l=>l.id===e);i&&(Object.assign(i,t),w("staff",r));return}const a=await R(),s=[],n=[];for(const[r,i]of Object.entries(t))r!=="id"&&(s.push(`${r} = ?`),n.push(i));s.length&&(n.push(e),await a.run(`UPDATE staff SET ${s.join(", ")} WHERE id = ?`,n))}async function pa(){return C.isNativePlatform()?(await(await R()).query("SELECT id, name, phone, address FROM customers ORDER BY name ASC")).values??[]:A("customers",Ce).sort((a,s)=>a.name.localeCompare(s.name))}async function fa(e){if(!C.isNativePlatform()){const n=A("customers",Ce),r=e.id?n.find(l=>l.id===e.id):n.find(l=>l.name.toLowerCase()===e.name.toLowerCase()&&(e.phone?l.phone===e.phone:!0));if(r)return r.name=e.name,r.phone=e.phone??r.phone,r.address=e.address??r.address,w("customers",n),r;const i={id:X(n),name:e.name,phone:e.phone??null,address:e.address??null};return n.push(i),w("customers",n),i}const t=await R();if(e.id)return await t.run("UPDATE customers SET name = ?, phone = ?, address = ? WHERE id = ?",[e.name,e.phone??null,e.address??null,e.id]),{id:e.id,name:e.name,phone:e.phone??null,address:e.address??null};const a=await t.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM customers"),s=Number((a.values?.[0]).id);return await t.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[s,e.name,e.phone??null,e.address??null]),{id:s,name:e.name,phone:e.phone??null,address:e.address??null}}async function _e(e){if(!C.isNativePlatform())return A("services",J).filter(s=>!0);const t=await R(),a=await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[]);return(a.values??[]).length===0?(await Re(t),((await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[])).values??[]).map(n=>({...n,includes:Y(n.includes,[])}))):(a.values??[]).map(s=>({...s,includes:Y(s.includes,[])}))}async function ya(){if(!C.isNativePlatform())return A("services",J);const e=await R(),t=await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC");return(t.values??[]).length===0?(await Re(e),((await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC")).values??[]).map(s=>({...s,includes:Y(s.includes,[])}))):(t.values??[]).map(a=>({...a,includes:Y(a.includes,[])}))}async function st(e){if(!C.isNativePlatform()){const a=A("services",J),s=e.id?a.find(n=>n.id===e.id):null;s?Object.assign(s,e):a.unshift({...e,id:X(a)}),w("services",a);return}const t=await R();e.id?await t.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = ? WHERE id = ?",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive,e.id]):await t.run("INSERT INTO laundry_services (name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive])}async function gt(){if(!C.isNativePlatform())return A("item_categories",te).filter(a=>a.isActive);const e=await R(),t=await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC");return(t.values??[]).length===0?(await Re(e),(await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC")).values??[]):t.values??[]}async function ha(e){if(!C.isNativePlatform()){const a=A("item_categories",te),s=e.id?a.find(n=>n.id===e.id):null;s?Object.assign(s,e):a.unshift({...e,id:X(a)}),w("item_categories",a);return}const t=await R();e.id?await t.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = ? WHERE id = ?",[e.name,e.maxKg,e.additionalFee,e.isActive,e.id]):await t.run("INSERT INTO item_categories (name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?)",[e.name,e.maxKg,e.additionalFee,e.isActive])}function Ne(e,t,a,s){const n=(Array.isArray(e)?e:[e]).map(y=>{const f=Math.max(0,Number(y.quantity??1)),b=Number(y.price);return{id:y.id,name:y.name,price:b,quantity:f,total:Number((b*f).toFixed(2))}}).filter(y=>y.quantity>0),r=Number(t.maxKg),i=0,l=0,u=s.map(y=>{const f=Math.max(0,Number(y.quantity??1)),b=Number(y.price);return{id:y.id,name:zt(y.name),price:b,quantity:f,total:Number((b*f).toFixed(2))}}).filter(y=>y.quantity>0),c=n.reduce((y,f)=>y+f.total,0),o=u.reduce((y,f)=>y+f.total,0),v=Number((c+l+o).toFixed(2));return{price:Number(c.toFixed(2)),additionalCharge:Number(l.toFixed(2)),extraServiceAmount:Number(o.toFixed(2)),totalAmount:v,allowedKg:r,extraKg:Number(i.toFixed(2)),warning:null,serviceLines:n,extras:u}}function bt(e,t){return[{key:"fold",label:"Fold"},{key:"claimed",label:"Claimed"}]}function ga(e){return e.includes("claimed")?"claimed":e.includes("fold")?"ready":"received"}async function fe(e){return C.isNativePlatform()?((await(await R()).query("SELECT o.*, s.name as foldedByName FROM orders o LEFT JOIN staff s ON s.id = o.foldedBy WHERE o.branch = ? ORDER BY o.id DESC",[e])).values??[]).map(s=>la(s)):A("orders",ae).filter(s=>s.branch===e).map(s=>({...s,serviceLines:s.serviceLines??[{id:s.serviceId,name:s.service,price:Number(s.price),quantity:1,total:Number(s.price)}],foldedByStaffIds:s.foldedByStaffIds??[],balance:Number((s.totalAmount-s.paidAmount).toFixed(2))}))}async function ba(e){const[t,a]=await Promise.all([_e(),gt()]),s=e.serviceQuantities??(e.serviceId?{[e.serviceId]:1}:{}),n=t.filter(p=>p.serviceType==="order"&&Number(s[p.id]??0)>0).map(p=>({...p,quantity:Number(s[p.id]??0)})),r=n[0],i=a.find(p=>p.id===e.itemCategoryId)??a.find(p=>p.name.toLowerCase()===(r?.category??"").toLowerCase())??a.find(p=>p.name==="Regular Clothes")??a[0],l=e.addonQuantities??Object.fromEntries((e.addonIds??[]).map(p=>[p,1])),u=t.filter(p=>p.serviceType==="addon"&&Number(l[p.id]??0)>0).map(p=>({...p,quantity:Number(l[p.id]??0)}));if(!n.length&&!u.length)throw new Error("Please select at least one service or extra service.");const c=e.weightKg??Math.max(1,Number(i?.maxKg||r?.maxKg||1)),o=Ne(n,i,c,u),v=await fa({id:e.customerId||void 0,name:e.customerName,phone:e.customerPhone??null}),y=Math.max(0,e.paidAmount),f=Math.min(o.totalAmount,y),b={ticket:await Ea(),customerId:v.id,customer:v.name,phone:v.phone,serviceId:r?.id??0,service:o.serviceLines.length?o.serviceLines.map(p=>`${p.name} x${p.quantity}`).join(", "):"Extras only",serviceLines:o.serviceLines,itemCategoryId:i.id,itemCategory:i.name,branch:e.branch,status:"received",workflowCompleted:["received"],weightKg:c,price:o.price,additionalCharge:o.additionalCharge,extraServiceAmount:o.extraServiceAmount,totalAmount:o.totalAmount,paidAmount:f,balance:Number((o.totalAmount-f).toFixed(2)),extras:o.extras,notes:e.notes||null,foldedBy:null,foldedByName:null,foldedByStaffIds:[],dueAt:new Date(Date.now()+Math.max(1,...n.map(p=>p.turnaroundHours))*60*60*1e3).toISOString(),createdAt:se()};if(!C.isNativePlatform()){const p=A("orders",ae),g={...b,id:X(p)};return p.unshift(g),w("orders",p),y>0&&await Et(g.id,{amount:y,method:e.paymentMethod,reference:e.paymentReference??null}),g}const E=await R(),N=await E.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM orders"),P={...b,id:Number((N.values?.[0]).id)};return await pt(E,P),y>0&&await E.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[P.id,y,e.paymentMethod,e.paymentReference??null,se(),e.branch]),P}async function Ea(){const e=`LB${aa()}`,t=await pe(),s=(await fe(t)).filter(r=>r.ticket.startsWith(e)).sort((r,i)=>i.ticket.localeCompare(r.ticket))[0],n=s?Number(s.ticket.slice(-3))+1:1;return`${e}-${String(n).padStart(3,"0")}`}async function Sa(e,t){const a=await pe(),[s,n]=await Promise.all([fe(a),_e()]),r=s.find(c=>c.id===e);if(!r)return;const l=bt().map(c=>c.key).find(c=>!r.workflowCompleted.includes(c));if(!l)return;if(r.workflowCompleted=[...r.workflowCompleted,l],r.status=ga(r.workflowCompleted),l==="fold"&&t){r.foldedBy=t;const c=Array.isArray(r.foldedByStaffIds)?[...r.foldedByStaffIds]:[];c.push(t),r.foldedByStaffIds=c}if(!C.isNativePlatform()){const c=A("orders",ae),o=c.find(v=>v.id===r.id);o&&Object.assign(o,r),w("orders",c);return}await(await R()).run("UPDATE orders SET workflowCompleted = ?, status = ?, foldedBy = ?, foldedByStaffIds = ? WHERE id = ?",[JSON.stringify(r.workflowCompleted),r.status,r.foldedBy,JSON.stringify(r.foldedByStaffIds??[]),r.id])}async function Et(e,t){const a=await pe();if(!(await fe(a)).find(l=>l.id===e))return;const r=Math.max(0,t.amount);if(r<=0)return;if(!C.isNativePlatform()){const l=A("payments",le);l.unshift({id:X(l),orderId:e,amount:r,method:t.method,reference:t.reference??null,receivedAt:se(),branch:a}),w("payments",l);const u=A("orders",ae),c=u.find(o=>o.id===e);c&&(c.paidAmount=Math.min(c.totalAmount,Number((c.paidAmount+r).toFixed(2)))),w("orders",u);return}const i=await R();await i.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[e,r,t.method,t.reference??null,se(),a]),await i.run("UPDATE orders SET paidAmount = MIN(totalAmount, paidAmount + ?) WHERE id = ?",[r,e])}async function wa(e){return C.isNativePlatform()?(await(await R()).query("SELECT id, orderId, amount, method, reference, receivedAt, branch FROM payments  ORDER BY receivedAt DESC",[])).values??[]:A("payments",le).filter(s=>!0)}async function Ta(e){const t=await pe(),s=(await fe(t)).find(r=>r.id===e);if(!s)return;if(s.paidAmount>0)throw new Error("Cancel is only allowed for unpaid orders. Use Delete (admin) to refund paid orders.");if(!C.isNativePlatform()){const r=A("orders",ae),i=A("payments",le),l=A("fold_logs",[]),u=r.filter(v=>v.id!==e),c=i.filter(v=>v.orderId!==e),o=l.filter(v=>v.orderTicket!==s.ticket);w("orders",u),w("payments",c),w("fold_logs",o);return}const n=await R();await n.run("DELETE FROM payments WHERE orderId = ?",[e]),await n.run("DELETE FROM fold_logs WHERE orderTicket = ?",[s.ticket]),await n.run("DELETE FROM orders WHERE id = ?",[e])}async function Na(e){const t=await pe(),s=(await fe(t)).find(r=>r.id===e);if(!s)return;if(s.paidAmount<=0)throw new Error("Delete (refund) is only allowed for paid orders.");if(!C.isNativePlatform()){const r=A("orders",ae),i=A("payments",le),l=A("fold_logs",[]),u=r.filter(v=>v.id!==e),c=i.filter(v=>v.orderId!==e),o=l.filter(v=>v.orderTicket!==s.ticket);w("orders",u),w("payments",c),w("fold_logs",o);return}const n=await R();await n.run("DELETE FROM payments WHERE orderId = ?",[e]),await n.run("DELETE FROM fold_logs WHERE orderTicket = ?",[s.ticket]),await n.run("DELETE FROM orders WHERE id = ?",[e])}async function Aa(){return C.isNativePlatform()?(await(await R()).query("SELECT id, orderTicket, staffName, foldCount, rate, total, createdAt FROM fold_logs ORDER BY id DESC")).values??[]:A("fold_logs",[])}async function La(e){const t=Number((e.foldCount*e.rate).toFixed(2));if(!C.isNativePlatform()){const s=A("fold_logs",[]);s.unshift({id:Date.now(),...e,total:t,createdAt:se()}),w("fold_logs",s);return}await(await R()).run("INSERT INTO fold_logs (orderTicket, staffName, foldCount, rate, total, createdAt) VALUES (?, ?, ?, ?, ?, ?)",[e.orderTicket,e.staffName,e.foldCount,e.rate,t,se()])}async function Ca(){return C.isNativePlatform()?(await(await R()).query('SELECT id, expenseDate, number, COALESCE(disbursementType, "daily") as disbursementType, name, category, description, amount FROM disbursement_expenses ORDER BY expenseDate DESC, id DESC')).values??[]:A("expenses",ne).map(a=>({...a,disbursementType:a.disbursementType??"daily"}))}function xe(e){const t=/^DISB-(\d+)$/i.exec(String(e??"").trim());return t?Number(t[1]):0}function nt(e){const t=/^REV-(\d+)$/i.exec(String(e??"").trim());return t?Number(t[1]):0}async function $a(){let e=0;if(!C.isNativePlatform()){const n=A("expenses",ne),r=A("revolving_history",ue);for(const i of n)e=Math.max(e,xe(i.number));for(const i of r)i.type==="disbursement"&&(e=Math.max(e,xe(i.revolvingNumber)));return e}const t=await R(),a=await t.query("SELECT number FROM disbursement_expenses"),s=await t.query("SELECT revolvingNumber as number FROM revolving_history WHERE type = 'disbursement'");for(const n of[...a.values??[],...s.values??[]])e=Math.max(e,xe(String(n.number)));return e}async function St(){const e=await $a()+1;return`DISB-${String(e).padStart(2,"0")}`}async function Ra(){let e=0;if(!C.isNativePlatform()){const s=A("revolving_history",ue);for(const n of s)n.type==="add"&&(e=Math.max(e,nt(n.revolvingNumber)));return`REV-${String(e+1).padStart(2,"0")}`}const a=await(await R()).query("SELECT revolvingNumber FROM revolving_history WHERE type = 'add'");for(const s of a.values??[])e=Math.max(e,nt(String(s.revolvingNumber)));return`REV-${String(e+1).padStart(2,"0")}`}async function wt(e){if(!C.isNativePlatform()){const a=A("expenses",ne),s=X(a);a.unshift({id:s,expenseDate:e.expenseDate,number:e.number,disbursementType:e.disbursementType??"daily",name:e.name,category:e.category,description:e.description||null,amount:e.amount}),w("expenses",a);return}await(await R()).run("INSERT INTO disbursement_expenses (expenseDate, number, disbursementType, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?, ?)",[e.expenseDate,e.number,e.disbursementType??"daily",e.name,e.category,e.description||null,e.amount])}async function Da(e){const t=await St();await wt({expenseDate:e.expenseDate,number:t,disbursementType:e.disbursementType??"daily",name:e.name,category:e.category,description:e.description,amount:e.amount})}async function Oa(e,t){if(!C.isNativePlatform()){const s=A("expenses",ne),n=s.find(r=>r.id===e);n&&(Object.assign(n,{expenseDate:t.expenseDate,disbursementType:t.disbursementType??"daily",name:t.name,category:t.category,description:t.description||null,amount:t.amount}),w("expenses",s));return}await(await R()).run("UPDATE disbursement_expenses SET expenseDate = ?, disbursementType = ?, name = ?, category = ?, description = ?, amount = ? WHERE id = ?",[t.expenseDate,t.disbursementType??"daily",t.name,t.category,t.description||null,t.amount,e])}async function xa(e){if(!C.isNativePlatform()){const a=A("expenses",ne);w("expenses",a.filter(s=>s.id!==e));return}await(await R()).run("DELETE FROM disbursement_expenses WHERE id = ?",[e])}async function Pa(){return C.isNativePlatform()?(await(await R()).query('SELECT id, saleDate, COALESCE(saleNumber, "") as saleNumber, cashAmount, gcashAmount, totalAmount, notes, status, endorsedTo, statusUpdatedAt FROM daily_sales ORDER BY saleDate DESC, id DESC')).values??[]:A("sales",de)}async function Ia(e){const t=Number((e.cashAmount+e.gcashAmount).toFixed(2));if(!C.isNativePlatform()){const r=A("sales",de),i=e.id?r.find(l=>l.id===e.id):r.find(l=>l.saleDate===e.saleDate);if(i)Object.assign(i,{saleDate:e.saleDate,cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null});else{const l=X(r);r.unshift({id:l,saleDate:e.saleDate,saleNumber:`SALE-${String(l).padStart(2,"0")}`,cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null})}w("sales",r);return}const a=await R(),n=(e.id?await a.query("SELECT id, saleNumber FROM daily_sales WHERE id = ?",[e.id]):await a.query("SELECT id, saleNumber FROM daily_sales WHERE saleDate = ?",[e.saleDate])).values?.[0];if(n)await a.run("UPDATE daily_sales SET saleDate = ?, cashAmount = ?, gcashAmount = ?, totalAmount = ?, notes = ? WHERE id = ?",[e.saleDate,e.cashAmount,e.gcashAmount,t,e.notes||null,n.id]);else{const r=await a.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM daily_sales"),i=Number((r.values?.[0]).id);await a.run("INSERT INTO daily_sales (saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?)",[e.saleDate,`SALE-${String(i).padStart(2,"0")}`,e.cashAmount,e.gcashAmount,t,e.notes||null])}}async function qa(e){if(!C.isNativePlatform()){const a=A("sales",de);w("sales",a.filter(s=>s.id!==e));return}await(await R()).run("DELETE FROM daily_sales WHERE id = ?",[e])}async function rt(e,t,a=null,s){if(!C.isNativePlatform()){const r=A("sales",de),i=r.find(l=>l.id===e);i&&(i.status=t,i.endorsedTo=a,i.statusUpdatedAt=s,w("sales",r));return}await(await R()).run("UPDATE daily_sales SET status = ?, endorsedTo = ?, statusUpdatedAt = ? WHERE id = ?",[t,a,s,e])}async function Fa(){return C.isNativePlatform()?(await(await R()).query("SELECT id, revolvingNumber, name, amount, category, description, type, createdAt FROM revolving_history ORDER BY createdAt DESC, id DESC")).values??[]:A("revolving_history",ue).sort((a,s)=>s.createdAt.localeCompare(a.createdAt))}async function it(e){const t=e.type==="disbursement"?await St():await Ra();if(e.type==="disbursement"){const s=e.expenseDate??e.createdAt.slice(0,10);await wt({expenseDate:s,number:t,name:e.name,category:e.category,description:e.description??"",amount:e.amount})}if(!C.isNativePlatform()){const s=A("revolving_history",ue),n=X(s);s.unshift({id:n,revolvingNumber:t,...e}),w("revolving_history",s);return}await(await R()).run("INSERT INTO revolving_history (revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)",[t,e.name,e.amount,e.category,e.description||null,e.type,e.createdAt])}async function Tt(e){return C.isNativePlatform()?(await(await R()).query("SELECT id, machineName, machineType, status, branch FROM machines WHERE branch = ? ORDER BY machineType, machineName",[e])).values??[]:A("machines",Q).filter(s=>s.branch===e)}async function ka(e){if(!C.isNativePlatform()){const a=A("machines",Q);a.unshift({id:X(a),...e}),w("machines",a);return}await(await R()).run("INSERT INTO machines (machineName, machineType, status, branch) VALUES (?, ?, ?, ?)",[e.machineName,e.machineType,e.status,e.branch])}async function Ma(e,t){if(!C.isNativePlatform()){const s=A("machines",Q),n=s.find(r=>r.id===e);n&&(n.status=t,w("machines",s));return}await(await R()).run("UPDATE machines SET status = ? WHERE id = ?",[t,e])}async function Ua(e){return C.isNativePlatform()?((await(await R()).query("SELECT id, date, machineIds, machineNames, cleaningStatus, notes, branch FROM subcleanings WHERE branch = ? ORDER BY date DESC, id DESC",[e])).values??[]).map(s=>({...s,machineIds:Y(s.machineIds,[])})):A("subcleanings",[]).filter(s=>s.branch===e)}async function Ba(e){const a=(await Tt(e.branch)).filter(r=>e.machineIds.includes(r.id)).map(r=>r.machineName).join(", ");if(!C.isNativePlatform()){const r=A("subcleanings",[]);r.unshift({id:X(r),date:e.date,machineIds:e.machineIds,machineNames:a,cleaningStatus:e.cleaningStatus,notes:e.notes||null,branch:e.branch}),w("subcleanings",r);const i=A("machines",Q);i.forEach(l=>{e.machineIds.includes(l.id)&&(l.status=e.cleaningStatus==="completed"?"available":"under_cleaning")}),w("machines",i);return}const s=await R();await s.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, notes, branch) VALUES (?, ?, ?, ?, ?, ?)",[e.date,JSON.stringify(e.machineIds),a,e.cleaningStatus,e.notes||null,e.branch]);const n=e.cleaningStatus==="completed"?"available":"under_cleaning";for(const r of e.machineIds)await s.run("UPDATE machines SET status = ? WHERE id = ?",[n,r])}async function _a(e,t){if(!C.isNativePlatform()){const i=A("machines",Q),l=i.find(o=>o.id===e);l&&(l.status="available"),w("machines",i);const u=A("subcleanings",[]),c=Fe();u.unshift({id:X(u),date:c,machineIds:[e],machineNames:l?.machineName??"",cleaningStatus:"completed",notes:null,branch:t}),w("subcleanings",u);return}const a=await R(),n=(await a.query("SELECT machineName FROM machines WHERE id = ?",[e])).values?.[0]?.machineName??"";await a.run("UPDATE machines SET status = ? WHERE id = ?",["available",e]);const r=Fe();await a.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, notes, branch) VALUES (?, ?, ?, ?, ?, ?)",[r,JSON.stringify([e]),n,"completed",null,t])}const je=document.querySelector("#app");if(!je)throw new Error("App root not found");let Se;const ve=re("BluetoothThermalPrinter"),He={dashboard:"Dashboard",pos:"POS",orders:"Orders",archived:"Archived Order",customers:"Customers",pricing:"Pricing Services",disbursements:"Daily Report",reports:"Reports",inventory:"Inventory",maintenance:"Maintenance",staff:"Staff",revolving:"Revolving Fund",settings:"Settings"},d={tab:"dashboard",receiptOrderId:0,currentUser:null,loginError:"",sidebarOpen:!1,dailyReportTab:"expenses",maintenanceTab:"cleaning",customerSearch:"",orderSearch:"",orderDateFilter:"",orderPaymentFilter:"",printerPanelOpen:!1,printerLoading:!1,printerError:"",printerStatus:"",printerPaperWidth:58,pairedPrinters:[],selectedPrinterAddress:"",archivedOrderSearch:"",reportPreview:null,endorseModalOpen:!1,endorseSaleId:0,endorseSaleDate:"",revolvingModalOpen:!1,revolvingSaleId:0,addFundModalOpen:!1,disbursementModalOpen:!1,revolvingHistoryFrom:"",revolvingHistoryTo:""},ja=["Wash","Dry","Fold","Detergent","Fabcon","Zonrox"],Ha=["Supplies","Utilities","Maintenance","Salary","Rent","Transport","Other"],ge="laba101-mobile-session";function T(e){return new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(e||0)}function m(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Z(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}function De(e,t){return Number((e-t).toFixed(2))}function Nt(e,t,a,s=0){const n=t.filter(i=>K(i.createdAt)===e).reduce((i,l)=>i+l.paidAmount,0),r=a.filter(i=>ee(i)==="daily"&&i.expenseDate===e).reduce((i,l)=>i+l.amount,0);return De(n+s,r)}function Wa(e,t){const a=new Map(t.map(n=>[n.id,n.name])),s=new Map;return e.filter(n=>n.workflowCompleted.includes("fold")).forEach(n=>{(Array.isArray(n.foldedByStaffIds)&&n.foldedByStaffIds.length?n.foldedByStaffIds:n.foldedBy?[n.foldedBy]:[]).forEach(i=>{if(!i)return;const l=a.get(i)??String(i),u=s.get(i)??{staffId:i,staffName:l,folds:0};u.folds+=1,s.set(i,u)})}),e.filter(n=>n.workflowCompleted.includes("fold")&&n.foldedByName&&n.foldedBy).forEach(n=>{const r=s.get(n.foldedBy);r&&r.staffName===String(n.foldedBy)&&(r.staffName=n.foldedByName)}),Array.from(s.values()).map(n=>({staffName:n.staffName,folds:n.folds}))}function be(e=new Date){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${s}`}function W(){return be()}function ke(){return W().slice(0,7)}function ee(e){return e.disbursementType==="monthly"?"monthly":"daily"}function At(e){return e.slice(0,7)}function Lt(e){return ee(e)==="monthly"?At(e.expenseDate):e.expenseDate}function K(e){return be(new Date(e))}function We(e){return e.paidAmount<=0?"unpaid":e.balance>0?"partial":"paid"}function Ct(e,t,a){const s=new Map(t.map(i=>[i.id,i])),n=new Map(t.map(i=>[i.id,Number(i.totalAmount||0)])),r={cash:0,gcash:0,total:0};return[...e].sort((i,l)=>new Date(i.receivedAt).getTime()-new Date(l.receivedAt).getTime()||i.id-l.id).forEach(i=>{const l=s.get(i.orderId);if(!l)return;const u=n.get(l.id)??0,c=Math.min(Math.max(0,Number(i.amount||0)),u);n.set(l.id,Number((u-c).toFixed(2))),!(!a(i)||c<=0)&&(i.method==="gcash"?r.gcash+=c:r.cash+=c,r.total+=c)}),{cash:Number(r.cash.toFixed(2)),gcash:Number(r.gcash.toFixed(2)),total:Number(r.total.toFixed(2))}}function oe(e){return new Intl.DateTimeFormat("en-PH",{dateStyle:"medium",timeStyle:"short"}).format(new Date(e))}function Xa(e){const t=new Date(e),a=new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric",year:"numeric"}).format(t),s=new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",hour12:!0}).format(t);return`<div class="datetime-stack"><strong>${m(a)}</strong><span class="meta">${m(s)}</span></div>`}function Ka(e){return e?.role==="staff"&&e.branch==="Gensan Branch"}function Ga(e){return e?.role==="staff"&&e.branch.toLowerCase().includes("mintal")}function $e(e,t,a="data-table"){return`
    <div class="table-scroll">
      <table class="${a}">
        <thead><tr>${e.map(s=>`<th>${m(s)}</th>`).join("")}</tr></thead>
        <tbody>${t.length?t.map(s=>`<tr>${s.map(n=>`<td>${n}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${e.length}" class="table-empty">No records found.</td></tr>`}</tbody>
      </table>
    </div>
  `}function Va(e=new Date){return{date:new Intl.DateTimeFormat("en-PH",{weekday:"long",month:"long",day:"numeric",year:"numeric"}).format(e),time:new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",second:"2-digit",hour12:!0}).format(e)}}function we(){const e=document.querySelector("[data-date-from]"),t=document.querySelector("[data-date-to]"),a=Array.from(document.querySelectorAll('input[name="reportType"]:checked')).map(s=>s.value).filter(s=>s==="sales"||s==="disbursement"||s==="fold_count"||s==="revolving_fund"||s==="summary");return{from:e?.value||"0000-01-01",to:t?.value||"9999-12-31",types:a.length?a:["summary"]}}function he(e,t){return e>=t.from&&e<=t.to}function $t(e,t,a,s,n,r,i,l){const u=new Set(l.types),c=e.filter(h=>he(K(h.createdAt),l)),o=a.filter(h=>he(h.saleDate,l)),v=s.filter(h=>he(h.expenseDate,l)),y=Wa(c,r),f=new Map;t.filter(h=>he(K(h.receivedAt),l)).forEach(h=>{const O=f.get(h.orderId)??{cash:0,gcash:0};h.method==="gcash"?O.gcash+=h.amount:O.cash+=h.amount,f.set(h.orderId,O)});const b=c.reduce((h,O)=>{const _=f.get(O.id);if(_){const z=_.cash+_.gcash;if(z>O.totalAmount){const ie=O.totalAmount/z;return h+_.cash*ie}return h+_.cash}return h+O.paidAmount},0),E=o.reduce((h,O)=>h+O.cashAmount,0),N=o.reduce((h,O)=>h+O.gcashAmount,0),P=c.reduce((h,O)=>{const _=f.get(O.id);if(_){const z=_.cash+_.gcash;if(z>O.totalAmount){const ie=O.totalAmount/z;return h+_.gcash*ie}return h+_.gcash}return h+0},0),p=b+E,g=P+N,L=p+g,$=v.reduce((h,O)=>h+O.amount,0),F=$,q=L-F,D=()=>({orderCashTotal:b,orderGcashTotal:P,manualCashTotal:E,manualGcashTotal:N,totalCash:p,totalGcash:g,totalSales:L,transactions:c.map(h=>{const O=f.get(h.id)??{cash:h.paidAmount,gcash:0},_=O.cash+O.gcash;let z=O.cash,ie=O.gcash,Ke=_;if(_>h.totalAmount){const Ge=h.totalAmount/_;z=O.cash*Ge,ie=O.gcash*Ge,Ke=h.totalAmount}return{ticket:h.ticket,customer:h.customer,cash:z,gcash:ie,total:Ke}}),manualSales:o.map(h=>({cash:h.cashAmount,gcash:h.gcashAmount,total:h.totalAmount}))}),I=()=>({totalExpenses:$,totalDisbursement:F,rows:[["Date/Month","id#","Type","Name","Category","Description","Amount"],...v.map(h=>[Lt(h),h.number,ee(h),h.name,h.category??"",h.description??"",h.amount]),[],["Total Disbursement","","","","","",F]]}),M=()=>({rows:[["Staff","Fold Count"],...y.map(h=>[h.staffName,h.folds]),[],["Total Folds",y.reduce((h,O)=>h+O.folds,0)]]}),U=n.filter(h=>he(K(h.createdAt),l));return{selection:l,selectedTypes:u,salesRows:D,disbursementRows:I,foldCountRows:M,revolvingDailySummaryRows:()=>({rows:[["Date of Sales","Cash on Hand","Status","Date Update"],...o.map(h=>{const O=Nt(h.saleDate,e,s,h.cashAmount),_=h.status==="revolving"?"Revolving":h.status==="endorsed"?`Endorsed to ${h.endorsedTo??""}`:"Pending";return[h.saleDate,O,_,h.statusUpdatedAt?K(h.statusUpdatedAt):""]})]}),revolvingHistoryRows:()=>({rows:[["Date","Number","Name","Amount","Category","Description","Type"],...U.map(h=>[K(h.createdAt),h.revolvingNumber,h.name,h.type==="disbursement"?-h.amount:h.amount,h.category,h.description??"",h.type==="add"?"Add Revolving Fund":"Disbursement"])]}),summaryRows:()=>{const h=D(),O=I();return[["Summary",l.from,"to",l.to],[],["Total Cash:","Total GCash:","Total Sales:"],["","",""],[h.totalCash,h.totalGcash,h.totalSales],["","",""],["Total Disbursement:","Total Profit:","Cash on Hand:"],["","",""],[O.totalDisbursement,q,De(h.totalCash,O.totalDisbursement)]]},profit:q}}function Ya(e,t){return`<button class="nav-link ${t?"is-active":""}" data-tab="${e}" type="button">
    <span class="nav-icon">${Ja(e)}</span>
    <span>${He[e]}</span>
  </button>`}function x(e,t){return`<div class="section-head"><div><h2>${m(e)}</h2><p class="meta">${m(t)}</p></div></div>`}function ot(){return He[d.tab]??"Dashboard"}function Pe(e){return(e?.name??"Laba101").trim().slice(0,1).toUpperCase()}function Ja(e){return{dashboard:"DB",pos:"POS",orders:"PO",archived:"AR",customers:"CU",pricing:"PS",disbursements:"DR",reports:"RP",inventory:"IN",maintenance:"MT",staff:"ST",revolving:"RV",settings:"SE"}[e]}async function Rt(){const e=await pe(),t=await ma(e),a=await yt(),s=await pa(),n=await _e(),r=await ya(),i=await gt(),l=await fe(e),u=await wa(),c=await Aa(),o=await Ca(),v=await Pa(),y=await Tt(e),f=await Ua(e),b=await Fa(),E=await ua(),N=await ft("report_email");return{branch:e,staff:t,allStaff:a,customers:s,services:n,allServices:r,categories:i,orders:l,payments:u,foldLogs:c,expenses:o,sales:v,machines:y,subcleanings:f,revolvingHistory:b,foldRate:E,reportEmail:N??""}}async function S(){if(!d.currentUser){Qa(),ys();return}const e=await Rt();e.orders.filter(u=>u.status!=="claimed").length,e.orders.filter(u=>u.status==="ready").length,e.orders.reduce((u,c)=>u+c.paidAmount,0);const t=W(),a=Ct(e.payments,e.orders,u=>u.branch===e.branch&&K(u.receivedAt)===t),s=a.gcash+e.sales.filter(u=>u.saleDate===t).reduce((u,c)=>u+c.gcashAmount,0),n=a.cash+e.sales.filter(u=>u.saleDate===t).reduce((u,c)=>u+c.cashAmount,0),r=n+s,i=e.expenses.filter(u=>ee(u)==="daily"&&u.expenseDate===t).reduce((u,c)=>u+c.amount,0),l=De(n,i);e.sales.reduce((u,c)=>u+c.totalAmount,0),e.expenses.reduce((u,c)=>u+c.amount,0),je.innerHTML=`
    <div class="app-frame">
      <header class="topbar">
        <div class="topbar-left">
          <img src="/laba101-logo.svg" alt="Laba101" class="topbar-logo" />
          <div>
            <p class="eyebrow">Offline mobile system</p>
            <h1>${m(ot())}</h1>
          </div>
        </div>
        <div class="topbar-actions">
          <div class="branch-pill"><span>Branch</span><strong>${m(e.branch)}</strong></div>
          <button class="icon-button" type="button" aria-label="Notifications">!</button>
          <button class="profile-pill" type="button">
            <span>${Pe(d.currentUser)}</span>
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
        <nav>${Dt().map(u=>Ya(u,d.tab===u)).join("")}</nav>
        <div class="sidebar-fill">
          <div class="sidebar-branch-badge">
            <span>Active Branch</span>
            <strong>${m(e.branch)}</strong>
          </div>
          <p class="sidebar-app-name">Laba101 POS</p>
        </div>
        <div class="sidebar-user">
          <span class="avatar">${Pe(d.currentUser)}</span>
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
            <h2>${m(ot())}</h2>
          </div>
          <div class="navbar-time">
            <strong data-navbar-time>--:--</strong>
            <span data-navbar-date>Loading...</span>
          </div>
          <button class="mobile-avatar" type="button">${Pe(d.currentUser)}</button>
        </header>

        ${d.tab==="dashboard"?Za({paidToday:r,cashPaidToday:n,gcashPaidToday:s,disbursementToday:i,cashOnHandToday:l,orders:e.orders,payments:e.payments,sales:e.sales}):""}
        ${d.tab==="pos"?es(e.orders,e.customers,e.services,e.categories,e.payments,e.branch):""}
        ${d.tab==="orders"?ts(e.orders,e.staff,e.services,e.payments):""}
        ${d.tab==="archived"?as(e.orders,e.staff,e.services,e.payments):""}
        ${d.tab==="customers"?os(e.customers,e.orders):""}
        ${d.tab==="pricing"?cs(e.allServices,e.categories):""}
        ${d.tab==="disbursements"?ls(e.expenses,e.sales):""}
        ${d.tab==="reports"?ds(e.orders,e.payments,e.sales,e.expenses,e.revolvingHistory,e.allStaff,e.foldRate):""}
        ${d.tab==="inventory"?us(e.services,e.categories):""}
        ${d.tab==="maintenance"?ms(e.machines,e.subcleanings,e.branch):""}
        ${d.tab==="staff"?vs(e.allStaff,e.branch):""}
        ${d.tab==="revolving"?$s(e.sales,e.revolvingHistory,e.orders,e.expenses):""}
        ${d.tab==="settings"?ps(e.branch,e.foldRate,e.reportEmail):""}
      </main>
    </div>
  `,fs(),gs(e),bs(e.allServices),Es(e.expenses),Ss(e.orders,e.payments,e.sales,e.expenses,e.revolvingHistory,e.foldRate),ws(),Ts(),Ns(),As(e.allStaff),Rs(),Ls(),hs()}function Dt(){if(d.currentUser?.role==="admin")return Object.keys(He).filter(t=>t!=="inventory");const e=["dashboard","pos","orders","archived","disbursements","reports","maintenance","revolving"];return Ka(d.currentUser)?["dashboard","disbursements","reports","maintenance","revolving"]:Ga(d.currentUser)?e.filter(t=>t!=="revolving"):e}function Qa(){je.innerHTML=`
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
  `}function za(){document.querySelectorAll("[data-fill-email]").forEach(e=>{e.addEventListener("click",()=>{const t=document.querySelector('input[name="email"]'),a=document.querySelector('input[name="password"]');t&&(t.value=e.dataset.fillEmail??""),a&&(a.value=e.dataset.fillPassword??"")})})}function Za(e){const t=new Date,a=Array.from({length:7},(i,l)=>{const u=new Date(t);return u.setDate(t.getDate()-(6-l)),new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric"}).format(u)}),s=Array.from({length:7},(i,l)=>{const u=new Date(t);u.setDate(t.getDate()-(6-l));const c=be(u),o=Ct(e.payments,e.orders,y=>K(y.receivedAt)===c).total,v=e.sales.filter(y=>y.saleDate===c).reduce((y,f)=>y+f.totalAmount,0);return o+v}),n=Math.max(1,...s),r=210;return`
    <section class="dashboard-main">
      <article class="panel revenue-panel">
        ${x("Revenue overview","Paid amount for the last 7 days.")}
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
          <div class="chart-days">${a.map(i=>`<span>${m(i)}</span>`).join("")}</div>
        </div>
        <div class="chart-footnote">Values include POS payments and Daily Report sales input.</div>
      </article>
    </section>
  `}function es(e,t,a,s,n,r){const i=a.filter(c=>c.serviceType==="order"&&c.isActive),l=a.filter(c=>c.serviceType==="addon"&&c.isActive),u=d.receiptOrderId?e.find(c=>c.id===d.receiptOrderId):null;return`
    <section class="grid content full">
      <article class="panel span-2">
        ${x("New POS order","Search for a customer or type a new name, pick services and confirm")}
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
                <strong>${m(c.name)}</strong>
                <small>${m(c.description??c.category)} ${c.maxKg?` / max ${c.maxKg}kg`:""}</small>
              </span>
              <b>${T(c.price)}</b>
              <div class="qty-control">
                <button type="button" data-qty-minus="serviceQty-${c.id}" aria-label="Decrease ${m(c.name)}">-</button>
                <input type="number" name="serviceQty-${c.id}" min="0" step="1" value="0" inputmode="numeric" />
                <button type="button" data-qty-plus="serviceQty-${c.id}" aria-label="Increase ${m(c.name)}">+</button>
              </div>
            </div>`).join("")}
          </fieldset>

          <fieldset class="check-grid">
            <legend>Extra services</legend>
            ${l.length?l.map(c=>`<div class="qty-card addon-quantity" data-qty-card="addonQty-${c.id}">
              <span><strong>${m(Z(c.name))}</strong><small>${T(c.price)} each</small></span>
              <div class="qty-control">
                <button type="button" data-qty-minus="addonQty-${c.id}" aria-label="Decrease ${m(Z(c.name))}">-</button>
                <input type="number" name="addonQty-${c.id}" min="0" step="1" value="0" inputmode="numeric" />
                <button type="button" data-qty-plus="addonQty-${c.id}" aria-label="Increase ${m(Z(c.name))}">+</button>
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

      ${u?Xe(u,n.filter(c=>c.orderId===u.id)):""}
    </section>
  `}function ts(e,t,a,s){const n=d.receiptOrderId?e.find(o=>o.id===d.receiptOrderId):null,r=e.filter(o=>o.status!=="claimed"),i=d.orderSearch.trim().toLowerCase(),l=d.orderDateFilter.trim(),u=d.orderPaymentFilter.trim().toLowerCase(),c=r.filter(o=>{const v=!i||[o.ticket,o.customer,o.phone,o.service,o.itemCategory,o.status].some(b=>String(b??"").toLowerCase().includes(i)),y=!l||K(o.createdAt)===l,f=!u||We(o)===u;return v&&y&&f});return`
    <section class="grid content full">
      <article class="panel span-2">
        ${x("Order queue","Workflow, payment, and receipts")}
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
        <div class="summary-list queue-summary">
          <div><span>Active queue</span><strong>${c.length}</strong></div>
          <div><span>Claimed archived</span><strong>${e.filter(o=>o.status==="claimed").length}</strong></div>
        </div>
        <table class="data-table orders-data-table">
          <thead>
            <tr><th>Ticket</th><th>Customer</th><th>Service</th><th>Total Payment</th><th>Actions</th></tr>
          </thead>
          <tbody>
            ${c.map(o=>Ot(o,t)).join("")||'<tr><td colspan="5" class="table-empty">No matching active orders.</td></tr>'}
          </tbody>
        </table>
      </article>
      ${n?Xe(n,s.filter(o=>o.orderId===n.id)):""}
    </section>
  `}function as(e,t,a,s){const n=e.filter(u=>u.status==="claimed"),r=d.archivedOrderSearch.trim().toLowerCase(),i=n.filter(u=>r?[u.ticket,u.customer,u.phone,u.service,u.itemCategory].some(c=>String(c??"").toLowerCase().includes(r)):!0),l=d.receiptOrderId?e.find(u=>u.id===d.receiptOrderId):null;return`
    <section class="grid content full">
      <article class="panel span-2">
        ${x("Archived orders","All claimed orders are listed here")}
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
          <div><span>Total claimed</span><strong>${n.length}</strong></div>
        </div>
        <table class="data-table orders-data-table archived-orders-table">
          <thead>
            <tr><th>Ticket</th><th>Customer</th><th>Service</th><th>Total Payment</th><th>Actions</th></tr>
          </thead>
          <tbody>
            ${i.map(u=>Ot(u,t)).join("")||'<tr><td colspan="5" class="table-empty">No archived orders found.</td></tr>'}
          </tbody>
        </table>
      </article>
      ${l?Xe(l,s.filter(u=>u.orderId===l.id)):""}
    </section>
  `}function Ot(e,t,a){const s=bt(),n=e.workflowCompleted.includes("fold"),r=e.workflowCompleted.includes("claimed"),i=s.find(f=>!e.workflowCompleted.includes(f.key)),l=i?.key==="fold",u=We(e),c=e.extras.length?e.extras.map(f=>`${m(Z(f.name))} x${Number(f.quantity??1)}`).join(", "):"",o=d.currentUser?.role==="admin",v=e.status!=="claimed"&&e.paidAmount<=0,y=e.status!=="claimed"&&o&&e.paidAmount>0;return`
    <tr class="order-row-main">
      <td><strong>${m(e.ticket)}</strong><div class="small">${m(oe(e.createdAt))}</div></td>
      <td>${m(e.customer)}<div class="small">${m(e.phone??"")}</div></td>
      <td>${m(e.service)}${c?`<div class="small">Extras: ${c}</div>`:""}</td>
      <td class="amount-cell"><strong>${T(e.totalAmount)}</strong><div class="small ${u==="paid"?"ok":u==="partial"?"warn":"meta"}">${m(u)} &middot; Bal: ${T(e.balance)}</div></td>
      <td>
      <div class="row-actions">
        ${n?r?"":`<form class="inline-form advance-form" data-order-id="${e.id}">
          <button class="secondary" type="submit">Claim</button>
        </form>`:`<form class="inline-form advance-form" data-order-id="${e.id}">
          ${l?`<select name="assignedStaffId" required>
            <option value="">-- Staff --</option>
            ${t.map(f=>`<option value="${f.id}">${m(f.name)}</option>`).join("")}
          </select>`:""}
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
  `}function Xe(e,t){const a=t.reduce((i,l)=>i+Number(l.amount),0),s=Math.max(0,Number((a-e.totalAmount).toFixed(2))),n=We(e),r=n.charAt(0).toUpperCase()+n.slice(1);return`
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="receipt-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-open-printer-panel>Printer</button>
          <button class="primary" type="button" data-thermal-print>${d.printerLoading?"Printing...":"Print Receipt"}</button>
          <button class="secondary" type="button" data-close-receipt>Close</button>
        </div>
        ${d.printerPanelOpen?ss():""}
        <div class="receipt" id="receipt-print-area">
          <div class="receipt-head">
            <h3 id="receipt-title">Laba101</h3>
            <p>${m(e.ticket)}<br>${m(oe(e.createdAt))}</p>
          </div>
          ${d.currentUser?`<p class="receipt-staff">Staff: ${m(d.currentUser.name)}</p>`:""}
          <div class="receipt-customer">
            <strong>${m(e.customer)}</strong>
            <span>${m(e.phone??"No phone")}</span>
          </div>
          <div class="summary-list receipt-lines">
            <div><span>Service</span><strong>${m(e.service)}</strong></div>
            ${e.extras.length?`<div><span>Extra services</span><strong>${e.extras.map(i=>`${m(Z(i.name))} x${Number(i.quantity??1)} (${T(Number(i.total??i.price))})`).join(", ")}</strong></div>`:""}
            <div><span>Total</span><strong>${T(e.totalAmount)}</strong></div>
            <div><span>Tendered</span><strong>${T(a)}</strong></div>
            <div><span>Paid</span><strong>${T(e.paidAmount)}</strong></div>
            <div><span>Payment status</span><strong>${r}</strong></div>
            <div><span>Change</span><strong>${T(s)}</strong></div>
            <div><span>Balance</span><strong>${T(e.balance)}</strong></div>
          </div>
          <h3>Payments</h3>
          <div class="receipt-payments">
            ${t.map(i=>`<div><span>${m(i.method.toUpperCase())}</span><strong>${T(i.amount)}</strong>${i.reference?`<small>Ref ${m(i.reference)}</small>`:""}</div>`).join("")||'<p class="helper">No payments yet.</p>'}
          </div>
        </div>
      </div>
    </div>
  `}function ss(){return`
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
  `}async function ct(){d.printerLoading=!0,d.printerError="",d.printerStatus="",await S();try{if(!(await ve.requestBluetoothPermissions()).granted)throw new Error("Bluetooth permission was not granted.");const t=await ve.listPairedPrinters();d.pairedPrinters=t.printers??[],d.selectedPrinterAddress=d.selectedPrinterAddress||t.savedAddress||d.pairedPrinters[0]?.address||"",d.printerStatus=d.pairedPrinters.length?"Select a printer, then connect.":"No paired printers found. Pair the printer in Android Bluetooth settings first."}catch(e){d.printerError=e instanceof Error?e.message:"Could not scan paired printers."}finally{d.printerLoading=!1,await S()}}async function ns(){if(!d.selectedPrinterAddress){d.printerError="Select a paired printer first.",await S();return}d.printerLoading=!0,d.printerError="",d.printerStatus="",await S();try{await ve.savePrinter({address:d.selectedPrinterAddress}),await ve.connect({address:d.selectedPrinterAddress}),d.printerStatus="Printer connected and saved."}catch(e){d.printerError=e instanceof Error?e.message:"Printer connection failed."}finally{d.printerLoading=!1,await S()}}function rs(e){const t=(e.serviceLines?.length?e.serviceLines:[{id:e.serviceId,name:e.service,price:e.price,quantity:1,total:e.price}]).map(s=>({name:s.name,quantity:Number(s.quantity||1),price:Number(s.price||0)})),a=e.extras.map(s=>({name:Z(s.name),quantity:Number(s.quantity??1),price:Number(s.price||0)}));return[...t,...a]}async function is(e,t){const a=t.reduce((n,r)=>n+Number(r.amount),0),s=Math.max(0,Number((a-e.totalAmount).toFixed(2)));d.printerLoading=!0,d.printerError="",d.printerStatus="",await S();try{if(!d.selectedPrinterAddress){const n=await ve.getSavedPrinter();d.selectedPrinterAddress=n.address||""}await ve.printReceipt({address:d.selectedPrinterAddress||void 0,paperWidth:d.printerPaperWidth,storeName:"Laba101",receiptNumber:e.ticket,dateTime:oe(e.createdAt),customerName:e.customer,customerPhone:e.phone?.trim()||"No phone",items:rs(e),totalAmount:e.totalAmount,paidAmount:e.paidAmount,changeAmount:s,balanceAmount:e.balance,staffName:d.currentUser?.name?.trim()||"Staff"}),d.printerStatus="Receipt sent to printer."}catch(n){d.printerPanelOpen=!0,d.printerError=n instanceof Error?n.message:"Bluetooth thermal print failed."}finally{d.printerLoading=!1,await S()}}function os(e,t){const a=d.customerSearch.trim().toLowerCase(),s=e.filter(n=>a?n.name.toLowerCase().includes(a):!1);return`
    <section class="grid content full">
      <article class="panel">
        ${x("Customer Management","Customer records from local offline storage")}
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
          <div><span>Matching customers</span><strong>${a?s.length:0}</strong></div>
        </div>
      </article>
      <article class="panel">
        ${x("Customer list","Names, phones, addresses, and order history")}
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
                        <strong>${T(i.totalAmount)}</strong>
                        <span>${m(i.status)}</span>
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
        ${x("Services","Order services and add-ons used by POS pricing")}
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
        ${x("Item categories","Load limits and extra fees")}
        <form id="category-form" class="form">
          <div class="form-row">
            <label>Name<input name="name" required /></label>
            <label>Max KG<input name="maxKg" type="number" min="0.25" step="0.01" required /></label>
          </div>
          <button class="primary" type="submit">Save category</button>
        </form>
      </article>
      <article class="panel span-2">
        ${x("Services Table","Order services")}
        <div class="table-scroll">
          <div class="table data-table">
            <div class="table-head"><div>Name</div><div>Category</div><div>Price</div><div>Max KG</div><div>Includes</div><div>Status</div><div>Actions</div></div>
            ${a.map(n=>`<div class="table-row"><div><strong>${m(n.name)}</strong></div><div>${m(n.category)}</div><div>${T(n.price)}</div><div>${n.maxKg} kg</div><div>${m(n.includes.join(", ")||"none")}</div><div>${n.isActive?"Active":"Inactive"}</div><div class="row-actions"><button class="secondary edit-service-btn" data-id="${n.id}">Edit</button>${n.isActive?`<button class="secondary deactivate-service-btn" data-id="${n.id}">Deactivate</button>`:`<button class="secondary activate-service-btn" data-id="${n.id}">Activate</button>`}</div></div>`).join("")||'<div class="helper">No order services yet.</div>'}
          </div>
        </div>
        <div class="section-divider"></div>
        ${x("Extra Services Table","Add-on services")}
        <div class="table-scroll">
          <div class="table data-table extra-services-table">
            <div class="table-head"><div>Name</div><div>Category</div><div>Price</div><div>Includes</div><div>Status</div><div>Actions</div></div>
            ${s.map(n=>`<div class="table-row"><div><strong>${m(n.name)}</strong></div><div>${m(n.category)}</div><div>${T(n.price)}</div><div>${m(n.includes.join(", ")||"none")}</div><div>${n.isActive?"Active":"Inactive"}</div><div class="row-actions"><button class="secondary edit-service-btn" data-id="${n.id}">Edit</button>${n.isActive?`<button class="secondary deactivate-service-btn" data-id="${n.id}">Deactivate</button>`:`<button class="secondary activate-service-btn" data-id="${n.id}">Activate</button>`}</div></div>`).join("")||'<div class="helper">No extra services yet.</div>'}
          </div>
        </div>
      </article>
    </section>
  `}function ls(e,t){const a=W(),s=a.slice(0,7),n=d.currentUser?.role==="admin",r=Array.from(new Set([...Ha,...e.map(o=>o.category).filter(Boolean)])),i=e.filter(o=>ee(o)==="daily"&&o.expenseDate===a).reduce((o,v)=>o+v.amount,0),l=e.filter(o=>ee(o)==="monthly"&&o.expenseDate.startsWith(s)).reduce((o,v)=>o+v.amount,0),u=t.filter(o=>o.saleDate===a).reduce((o,v)=>o+v.totalAmount,0),c=t.filter(o=>o.saleDate.startsWith(s)).reduce((o,v)=>o+v.totalAmount,0);return`
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
      <div class="panel stat"><div class="card-label">Daily disbursement</div><div class="value">${T(i)}</div></div>
      <div class="panel stat"><div class="card-label">Monthly disbursement</div><div class="value">${T(l)}</div></div>
      <div class="panel stat"><div class="card-label">Today sales input</div><div class="value">${T(u)}</div></div>
      <div class="panel stat"><div class="card-label">Month sales input</div><div class="value">${T(c)}</div></div>
    </section>
    ${d.dailyReportTab==="expenses"?`
    <section class="grid content full">
      <article class="panel">
        ${x("Input disbursement","Supplies, utilities, and cash disbursements")}
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
            <label class="expense-month-field" hidden>Month<input name="expenseMonth" type="month" value="${ke()}" /></label>
            <label>Amount<input name="amount" type="number" min="0" step="0.01" required placeholder="0.00" /></label>
          </div>
          <div class="form-row"><label>Title / Name<input name="name" required /></label><label>Category<select name="category" required>${r.map(o=>`<option value="${m(o)}">${m(o)}</option>`).join("")}</select></label></div>
          <label>Description<textarea name="description"></textarea></label>
          <button class="primary" type="submit">Save expense</button>
        </form>
      </article>
      <article class="panel">
        ${x("Disbursement list","Expenses only")}
        <div class="table-scroll daily-report-scroll">
          <div class="table daily-report-table">
            <div class="table-head"><div>Date/Month</div><div>No.</div><div>Name</div><div>Category</div><div>Amount</div><div>Action</div></div>
            ${e.map(o=>`<div class="table-row"><div>${m(Lt(o))}<div class="small">${m(ee(o))}</div></div><div>${m(o.number)}</div><div>${m(o.name)}</div><div>${m(o.category)}</div><div>${T(o.amount)}</div><div class="row-actions"><button class="secondary edit-expense-btn" data-id="${o.id}" type="button">Edit</button>${n?`<button class="secondary delete-expense-btn" data-id="${o.id}" type="button">Delete</button>`:""}</div></div>`).join("")||'<div class="helper">No expenses yet.</div>'}
          </div>
        </div>
      </article>
    </section>
    `:`
    <section class="grid content full">
      <article class="panel">
        ${x("Input total sale","Manual cash and GCash totals")}
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
        ${x("Daily sales history","Cash, GCash, total sale, notes, and updates")}
        <div class="table-scroll daily-report-scroll">
          <div class="table wide-table daily-report-table">
            <div class="table-head"><div>Sales #</div><div>Date</div><div>Cash</div><div>GCash</div><div>Total sale</div><div>Action</div></div>
            ${t.map(o=>`<div class="table-row"><div>${m(o.saleNumber)}</div><div>${m(o.saleDate)}</div><div>${T(o.cashAmount)}</div><div>${T(o.gcashAmount)}</div><div><strong>${T(o.totalAmount)}</strong></div><div class="row-actions"><button class="secondary edit-sale-btn" data-id="${o.id}" type="button">Edit</button>${n?`<button class="secondary delete-sale-btn" data-id="${o.id}" type="button">Delete</button>`:""}</div></div>`).join("")||'<div class="helper">No daily sales totals yet.</div>'}
          </div>
        </div>
      </article>
    </section>
    `}
  `}function ds(e,t,a,s,n,r,i,l,u,c){const o=d.reportPreview?$t(e,t,a,s,n,r,i,d.reportPreview):null;return`
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
            ${x("Sales report preview",`${o.selection.from} to ${o.selection.to}`)}
            <div class="table wide-table report-preview-table sales-table">
              <div class="table-head report-table-head"><div>Ticket</div><div>Customer</div><div>Cash</div><div>GCash</div><div>Total Payment</div></div>
              ${o.salesRows().transactions.map(v=>`<div class="table-row report-table-row"><div>${m(v.ticket)}</div><div>${m(v.customer)}</div><div>${T(v.cash)}</div><div>${T(v.gcash)}</div><div>${T(v.total)}</div></div>`).join("")}
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
            ${x("Disbursement preview",`${o.selection.from} to ${o.selection.to}`)}
            <div class="table wide-table report-preview-table report-disbursement-table">
              <div class="table-head report-table-head"><div>ID#</div><div>Date/Month</div><div>Type</div><div>Name</div><div>Category</div><div>Amount</div></div>
              ${o.disbursementRows().rows.slice(1).filter(v=>v.length&&v[0]!=="Total Disbursement").map(v=>`<div class="table-row report-table-row"><div>${m(v[1]??"")}</div><div>${m(v[0]??"")}</div><div>${m(v[2]??"")}</div><div>${m(v[3]??"")}</div><div>${m(v[4]??"")}</div><div>${T(v[6])}</div></div>`).join("")}
            </div>
            <div class="disbursement-total">
              <strong>Total Disbursement: ${T(o.disbursementRows().totalDisbursement)}</strong>
            </div>
          </article>`:""}
        ${o.selectedTypes.has("fold_count")?`
          <article>
            ${x("Fold Count preview",`${o.selection.from} to ${o.selection.to}`)}
            <div class="table report-preview-table">
              <div class="table-head"><div>Staff</div><div>Fold Count</div></div>
              ${o.foldCountRows().rows.slice(1).map(v=>`<div class="table-row">${v.map(y=>`<div>${m(y??"")}</div>`).join("")}</div>`).join("")}
            </div>
          </article>`:""}
        ${o.selectedTypes.has("revolving_fund")?`
          <article>
            ${x("Revolving Fund — Daily Summary",`${o.selection.from} to ${o.selection.to}`)}
            ${$e(["Date of Sales","Cash on Hand","Status","Date Update"],o.revolvingDailySummaryRows().rows.slice(1).map(v=>[m(String(v[0]??"")),m(String(v[1]??"")),m(String(v[2]??"")),m(String(v[3]??""))]),"data-table revolving-report-table")}
          </article>
          <article>
            ${x("Revolving Fund — Table History",`${o.selection.from} to ${o.selection.to}`)}
            ${$e(["Date","Number","Name","Amount","Category","Description","Type"],o.revolvingHistoryRows().rows.slice(1).map(v=>[m(String(v[0]??"")),m(String(v[1]??"")),m(String(v[2]??"")),m(String(v[3]??"")),m(String(v[4]??"")),m(String(v[5]??"")),m(String(v[6]??""))]),"data-table revolving-report-table")}
          </article>`:""}
        ${o.selectedTypes.has("summary")?`
          <article>
            ${x("Summary preview",`${o.selection.from} to ${o.selection.to}`)}
            <div class="summary-cards-grid summary-single-row">
              <div class="summary-card"><span class="card-label">Total Sales</span><div class="card-details"><span>Total Cash: ${T(o.salesRows().totalCash)}</span><span>Total GCash: ${T(o.salesRows().totalGcash)}</span></div><strong>${T(o.salesRows().totalSales)}</strong></div>
              <div class="summary-card"><span class="card-label">Total Disbursement</span><strong>${T(o.disbursementRows().totalDisbursement)}</strong></div>
              <div class="summary-card"><span class="card-label">Cash on Hand</span><strong>${T(De(o.salesRows().totalCash,o.disbursementRows().totalDisbursement))}</strong></div>
            </div>
          </article>`:""}
      </section>
    `:""}
  `}function us(e,t){return`
    <section class="grid content full">
      <article class="panel">
        ${x("Inventory","Service catalog and item load limits")}
        <div class="summary-list">
          <div><span>Active services</span><strong>${e.filter(a=>a.isActive).length}</strong></div>
          <div><span>Item categories</span><strong>${t.length}</strong></div>
        </div>
      </article>
      <article class="panel">
        ${x("Service inventory","Current sellable laundry services")}
        <div class="table">
          <div class="table-head"><div>Name</div><div>Category</div><div>Price</div><div>Max KG</div><div>Status</div></div>
          ${e.map(a=>`<div class="table-row"><div><strong>${m(a.name)}</strong></div><div>${m(a.category)}</div><div>${T(a.price)}</div><div>${a.maxKg} kg</div><div>${a.isActive?"Active":"Inactive"}</div></div>`).join("")}
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
        <button class="${d.maintenanceTab==="cleaning"?"is-active":""}" data-maintenance-tab="cleaning" type="button">Subcleaning</button>
        <button class="${d.maintenanceTab==="machines"?"is-active":""}" data-maintenance-tab="machines" type="button">Machine Management</button>
      </div>
    </section>
    ${d.maintenanceTab==="cleaning"?`
    <section class="grid content full">
      <article class="panel">
        ${x("Available Machines","Select machines to start cleaning.")}
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
        ${x("Under Cleaning","Machines currently being serviced.")}
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
        ${x("Daily Cleaning Checklist","Track which machines have been cleaned today.")}
        <div class="table">
          <div class="table-head"><div>Machine</div><div>Type</div><div>Status</div><div>Notes</div><div>Date</div></div>
          ${e.map(r=>{const i=t.find(l=>l.machineIds.includes(r.id)&&l.date===W());return`<div class="table-row"><div><strong>${m(r.machineName)}</strong></div><div>${m(r.machineType)}</div><div>${i?m(i.cleaningStatus.replace("_"," ")):"Not Cleaned"}</div><div>${m(i?.notes??"-")}</div><div>${W()}</div></div>`}).join("")}
        </div>
      </article>
    </section>
    `:`
    <section class="grid content full">
      <article class="panel">
        ${x("Add Machine","Create washer and dryer records")}
        <form id="machine-form" class="form">
          <label>Machine Name<input name="machineName" required placeholder="e.g. Washer 5" /></label>
          <label>Type<select name="machineType"><option value="washer">Washer</option><option value="dryer">Dryer</option></select></label>
          <label>Status<select name="status"><option value="available">Available</option><option value="under_cleaning">Under Cleaning</option><option value="maintenance">Maintenance</option></select></label>
          <input type="hidden" name="branch" value="${m(a)}" />
          <button class="primary" type="submit">Add machine</button>
        </form>
      </article>
      <article class="panel">
        ${x("Machines","Washer and dryer status")}
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
        ${x("Staff list","Branch: "+m(t))}
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
  `}function ps(e,t,a){return`
    <section class="grid content full">
      <article class="panel">
        ${x("Settings","Device-local configuration")}
        <form id="settings-form" class="form">
          <label>Current branch<select name="branch">
            ${["Main Store","Mintal Branch","Gensan Branch"].map(s=>`<option value="${s}" ${s===e?"selected":""}>${s}</option>`).join("")}
          </select></label>
          <label>Report email<input name="reportEmail" type="email" placeholder="admin@laba101.test" value="${m(a)}" /></label>
          <button class="primary" type="submit">Save settings</button>
        </form>
      </article>
    </section>
  `}function fs(){const e=()=>{localStorage.removeItem(ge),d.currentUser=null,d.tab="dashboard",d.receiptOrderId=0,d.sidebarOpen=!1,S()};document.querySelector("#logout-button")?.addEventListener("click",e),document.querySelector("#mobile-logout-button")?.addEventListener("click",e),document.querySelector("#mobile-menu-button")?.addEventListener("click",()=>{d.sidebarOpen=!0,S()}),document.querySelector("#sidebar-close-button")?.addEventListener("click",()=>{d.sidebarOpen=!1,S()}),document.querySelector("#sidebar-backdrop")?.addEventListener("click",()=>{d.sidebarOpen=!1,S()}),document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{d.tab=t.dataset.tab,d.receiptOrderId=0,d.sidebarOpen=!1,S()})}),document.querySelectorAll("[data-quick-tab]").forEach(t=>{t.addEventListener("click",()=>{d.tab=t.dataset.quickTab,S()})}),document.querySelectorAll("[data-receipt]").forEach(t=>{t.addEventListener("click",()=>{d.receiptOrderId=Number(t.dataset.receipt),d.printerPanelOpen=!1,d.printerError="",d.printerStatus="",S()})}),document.querySelector("[data-close-receipt]")?.addEventListener("click",()=>{d.receiptOrderId=0,S()}),document.querySelector("[data-open-printer-panel]")?.addEventListener("click",()=>{d.printerPanelOpen=!d.printerPanelOpen,d.printerPanelOpen&&d.pairedPrinters.length===0?ct():S()}),document.querySelector("[data-refresh-printers]")?.addEventListener("click",()=>{ct()}),document.querySelector("[data-printer-select]")?.addEventListener("change",t=>{d.selectedPrinterAddress=t.currentTarget.value,S()}),document.querySelector("[data-paper-width]")?.addEventListener("change",t=>{d.printerPaperWidth=Number(t.currentTarget.value)===80?80:58,S()}),document.querySelector("[data-connect-printer]")?.addEventListener("click",()=>{ns()}),document.querySelector("[data-thermal-print]")?.addEventListener("click",()=>{(async()=>{const t=await Rt(),a=t.orders.find(n=>n.id===d.receiptOrderId);if(!a)throw new Error("Receipt order not found.");const s=t.payments.filter(n=>n.orderId===a.id);await is(a,s)})().catch(t=>{d.printerPanelOpen=!0,d.printerError=t instanceof Error?t.message:"Bluetooth thermal print failed.",S()})}),document.querySelectorAll("[data-report-tab]").forEach(t=>{t.addEventListener("click",()=>{d.dailyReportTab=t.dataset.reportTab,S()})}),document.querySelectorAll("[data-maintenance-tab]").forEach(t=>{t.addEventListener("click",()=>{d.maintenanceTab=t.dataset.maintenanceTab,S()})})}function ys(){za(),document.querySelector("#login-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget),a=document.querySelector("#login-button");a&&(a.disabled=!0,a.textContent="Signing in...");try{const s=await ht(String(t.get("email")??""),String(t.get("password")??""));if(!s){d.loginError="Invalid email or password.",await S();return}d.currentUser=s,d.loginError="",await Te("branch",String(s.branch||"Main Store")),t.get("remember")?localStorage.setItem(ge,JSON.stringify({email:s.email,remembered:!0})):localStorage.removeItem(ge),Dt().includes(d.tab)||(d.tab="dashboard"),await S()}catch(s){alert("Login Error: "+String(s?.message||s)),a&&(a.disabled=!1,a.textContent="Sign in")}})}function hs(){Se&&window.clearInterval(Se);const e=document.querySelector("[data-navbar-time]"),t=document.querySelector("[data-navbar-date]");if(!e||!t){Se=void 0;return}const a=()=>{const s=Va();e.textContent=s.time,t.textContent=s.date};a(),Se=window.setInterval(a,1e3)}function lt(e,t){return e?t.find(a=>a.name.toLowerCase()===e.category.toLowerCase())??t.find(a=>a.name==="Regular Clothes")??t[0]??null:null}function Ie(e,t){return Math.max(1,Number(t.maxKg||e.maxKg||1))}function xt(e,t){return Object.fromEntries(t.filter(a=>a.serviceType==="order").map(a=>[a.id,Number(e.querySelector(`input[name="serviceQty-${a.id}"]`)?.value??0)]).filter(([,a])=>Number(a)>0))}function dt(e,t){const a=xt(e,t);return t.filter(s=>s.serviceType==="order"&&Number(a[s.id]??0)>0).map(s=>({...s,quantity:Number(a[s.id])}))}function Pt(e,t){return Object.fromEntries(t.filter(a=>a.serviceType==="addon").map(a=>[a.id,Number(e.querySelector(`input[name="addonQty-${a.id}"]`)?.value??0)]).filter(([,a])=>Number(a)>0))}function ut(e,t){const a=Pt(e,t);return t.filter(s=>s.serviceType==="addon"&&Number(a[s.id]??0)>0).map(s=>({...s,quantity:Number(a[s.id])}))}function gs(e){const t=document.querySelector("#order-form"),a=document.querySelector("#price-preview"),s=t?.querySelector('button[type="submit"]'),n=document.querySelector("#customer-name-input"),r=document.querySelector("#customer-id-input"),i=document.querySelector("#customer-phone-input"),l=document.querySelector("#customer-suggestions"),u=t?.querySelector("[data-order-error]"),c=t?.querySelector('select[name="paymentMethod"]'),o=t?.querySelector(".gcash-reference"),v=t?.querySelector('input[name="paymentReference"]');let y=!1,f;const b=p=>{if(!l||!n)return;const g=p.trim().toLowerCase();if(!g){l.hidden=!0;return}const L=e.customers.filter(q=>q.name.toLowerCase().includes(g)||(q.phone??"").includes(g)).slice(0,8),$=`<div class="ac-item ac-add" data-ac-new="true"><strong>+ Add new: "${m(p.trim())}"</strong></div>`,F=L.map(q=>`<div class="ac-item" data-ac-id="${q.id}" data-ac-name="${m(q.name)}" data-ac-phone="${m(q.phone??"")}"><strong>${m(q.name)}</strong>${q.phone?`<span>${m(q.phone)}</span>`:""}</div>`).join("");l.innerHTML=F+$,l.hidden=!1};n?.addEventListener("input",()=>{r&&(r.value=""),clearTimeout(f),f=window.setTimeout(()=>b(n.value),150)}),n?.addEventListener("focus",()=>{n.value.trim()&&b(n.value)}),l?.addEventListener("click",p=>{const g=p.target.closest(".ac-item");g&&(g.dataset.acNew==="true"?r&&(r.value=""):(n&&(n.value=g.dataset.acName??""),i&&(i.value=g.dataset.acPhone??""),r&&(r.value=g.dataset.acId??"")),l&&(l.hidden=!0))}),document.addEventListener("click",p=>{l&&!l.contains(p.target)&&p.target!==n&&(l.hidden=!0)});const E=()=>{const p=c?.value==="gcash";o&&(o.hidden=!p),v&&(v.required=p,p||(v.value=""))},N=(p,g)=>{if(!t)return;const L=t.querySelector(`input[name="${p}"]`);L&&(L.value=String(Math.max(0,Number(L.value||0)+g)),L.closest(".qty-card")?.classList.toggle("is-selected",Number(L.value)>0),L.dispatchEvent(new Event("input",{bubbles:!0})))};t?.querySelectorAll(".qty-control input").forEach(p=>{p.addEventListener("input",()=>{p.value=String(Math.max(0,Number(p.value||0))),p.closest(".qty-card")?.classList.toggle("is-selected",Number(p.value)>0)})}),t?.querySelectorAll("[data-qty-card]").forEach(p=>{p.addEventListener("click",g=>{const L=g.target;L.closest("input")||L.closest("button")||N(p.dataset.qtyCard??"",1)})}),t?.querySelectorAll("[data-qty-plus]").forEach(p=>{p.addEventListener("click",()=>N(p.dataset.qtyPlus??"",1))}),t?.querySelectorAll("[data-qty-minus]").forEach(p=>{p.addEventListener("click",()=>N(p.dataset.qtyMinus??"",-1))});const P=()=>{if(!t||!a)return;const p=dt(t,e.services),g=p[0],L=lt(g,e.categories),$=ut(t,e.services),F=p.length>0&&g&&L,q=$.length>0;if(!F&&!q){s&&(s.disabled=!0),u&&(u.hidden=!y,u.textContent=y?"Please select at least one service or extra service.":""),a.innerHTML='<div class="preview-total"><span>Total amount</span><strong>PHP 0.00</strong></div>';return}if(F){const D=Ne(p,L,Ie(g,L),$),I=D.serviceLines.map(U=>`${U.name} x${U.quantity}`),M=D.extras.map(U=>`${Z(U.name)} x${U.quantity}`);s&&(s.disabled=!1),u&&(u.hidden=!0,u.textContent=""),a.classList.remove("has-error"),a.innerHTML=`
        <div class="preview-line"><span>Services${I.length?` (${m(I.join(", "))})`:""}</span><strong>${T(D.price)}</strong></div>
        ${D.extraServiceAmount>0?`<div class="preview-line"><span>Extra services${M.length?` (${m(M.join(", "))})`:""}</span><strong>${T(D.extraServiceAmount)}</strong></div>`:""}
        <div class="preview-total"><span>Total amount</span><strong>${T(D.totalAmount)}</strong></div>
      `}else{const D=$.reduce((M,U)=>M+U.price*(U.quantity??1),0),I=$.map(M=>`${Z(M.name)} x${M.quantity??1}`);s&&(s.disabled=!1),u&&(u.hidden=!0,u.textContent=""),a.classList.remove("has-error"),a.innerHTML=`
        <div class="preview-line"><span>Extra services (${m(I.join(", "))})</span><strong>${T(D)}</strong></div>
        <div class="preview-total"><span>Total amount</span><strong>${T(D)}</strong></div>
      `}};c?.addEventListener("change",E),E(),t?.addEventListener("input",P),t?.addEventListener("change",P),P(),t?.addEventListener("submit",async p=>{p.preventDefault(),y=!0;const g=new FormData(t),L=dt(t,e.services),$=L[0],F=lt($,e.categories),q=ut(t,e.services),D=L.length>0&&$&&F,I=q.length>0;if(!D&&!I){u&&(u.hidden=!1,u.textContent="Please select at least one service or extra service.");return}const M=L.map(B=>`${B.name} x${B.quantity}`).join(", "),U=D?Ne(L,F,Ie($,F),q):Ne([],e.categories[0],1,q);if(confirm(`Save this order?

Services: ${M}
Total: ${T(U.totalAmount)}`))try{const B=await ba({customerId:Number(g.get("customerId"))||void 0,customerName:String(g.get("customerName")??""),customerPhone:String(g.get("customerPhone")??"")||null,serviceQuantities:xt(t,e.services),branch:e.branch,itemCategoryId:F?.id??e.categories[0].id,weightKg:$&&F?Ie($,F):1,addonQuantities:Pt(t,e.services),paidAmount:Number(g.get("paidAmount")??0),paymentMethod:String(g.get("paymentMethod")??"cash"),paymentReference:String(g.get("paymentReference")??"")||null,notes:String(g.get("notes")??"")||null});d.receiptOrderId=B.id,await S()}catch(B){u&&(u.hidden=!1,u.textContent=B instanceof Error?B.message:"Order could not be saved.")}}),document.querySelectorAll(".advance-form").forEach(p=>{p.addEventListener("submit",async g=>{g.preventDefault();const L=new FormData(p);await Sa(Number(p.dataset.orderId),Number(L.get("assignedStaffId"))||null),await S()})}),document.querySelectorAll(".payment-form").forEach(p=>{const g=p.querySelector('select[name="method"]'),L=p.querySelector('input[name="reference"]'),$=()=>{const F=g?.value==="gcash";L&&(L.hidden=!F,L.required=F,F||(L.value=""))};g?.addEventListener("change",$),$(),p.addEventListener("submit",async F=>{F.preventDefault();const q=new FormData(p),D=Number(q.get("amount")),I=String(q.get("method")),M=String(q.get("reference")??"")||null;confirm(`Confirm payment of ${T(D)} via ${I.toUpperCase()}?`)&&(await Et(Number(p.dataset.orderId),{amount:D,method:I,reference:M}),await S())})}),document.querySelectorAll("[data-cancel-order]").forEach(p=>{p.addEventListener("click",async()=>{const g=Number(p.dataset.cancelOrder);if(Number.isFinite(g)&&confirm("Cancel this order? (No payment will be refunded.)"))try{d.receiptOrderId===g&&(d.receiptOrderId=0),await Ta(g),await S()}catch(L){alert(L instanceof Error?L.message:"Cancel failed.")}})}),document.querySelectorAll("[data-delete-order]").forEach(p=>{p.addEventListener("click",async()=>{const g=Number(p.dataset.deleteOrder);if(Number.isFinite(g)&&confirm("Delete this paid order and update sales?"))try{d.receiptOrderId===g&&(d.receiptOrderId=0),await Na(g),await S()}catch(L){alert(L instanceof Error?L.message:"Delete failed.")}})})}function bs(e){document.querySelector("#service-form")?.addEventListener("submit",async t=>{t.preventDefault();const a=new FormData(t.currentTarget),s=a.get("id")?Number(a.get("id")):void 0;await st({id:s,name:String(a.get("name")??""),description:String(a.get("description")??"")||null,category:String(a.get("category")??""),serviceType:String(a.get("serviceType")??"order"),price:Number(a.get("price")??0),maxKg:Number(a.get("maxKg")??0),dryingMinutes:Number(a.get("dryingMinutes"))||null,includes:a.getAll("includes").map(String).filter(Boolean),additionalCharge:0,turnaroundHours:Number(a.get("turnaroundHours")??24),isActive:1}),await S()}),document.querySelectorAll(".edit-service-btn").forEach(t=>{t.addEventListener("click",()=>{const a=Number(t.dataset.id),s=e.find(r=>r.id===a),n=document.querySelector("#service-form");s&&n&&(n.querySelector("[name=id]").value=String(s.id),n.querySelector("[name=name]").value=s.name,n.querySelector("[name=category]").value=s.category,n.querySelector("[name=serviceType]").value=s.serviceType,n.querySelector("[name=price]").value=String(s.price),n.querySelector("[name=maxKg]").value=String(s.maxKg),n.querySelector("[name=dryingMinutes]").value=s.dryingMinutes?String(s.dryingMinutes):"",n.querySelectorAll('input[name="includes"]').forEach(r=>{r.checked=s.includes.includes(r.value)}),n.querySelector("[name=turnaroundHours]").value=String(s.turnaroundHours),n.querySelector("[name=description]").value=s.description??"",window.scrollTo({top:0,behavior:"smooth"}))})}),document.querySelectorAll(".deactivate-service-btn, .activate-service-btn").forEach(t=>{t.addEventListener("click",async()=>{const a=Number(t.dataset.id),s=e.find(n=>n.id===a);if(s){const n=s.isActive?0:1;await st({id:s.id,name:s.name,description:s.description,category:s.category,serviceType:s.serviceType,price:s.price,maxKg:s.maxKg,dryingMinutes:s.dryingMinutes,includes:s.includes,additionalCharge:s.additionalCharge,turnaroundHours:s.turnaroundHours,isActive:n}),await S()}})}),document.querySelector("#category-form")?.addEventListener("submit",async t=>{t.preventDefault();const a=new FormData(t.currentTarget);await ha({name:String(a.get("name")??""),maxKg:Number(a.get("maxKg")??0),additionalFee:Number(a.get("additionalFee")??0),isActive:1}),await S()})}function Es(e){const t=document.querySelector("#expense-form"),a=t?.querySelector('input[name="disbursementType"]'),s=t?.querySelector(".expense-date-field"),n=t?.querySelector(".expense-month-field"),r=t?.querySelector('input[name="expenseDate"]'),i=t?.querySelector('input[name="expenseMonth"]'),l=u=>{!t||!a||!r||!i||(a.value=u,t.querySelectorAll("[data-expense-type]").forEach(c=>{c.classList.toggle("is-active",c.dataset.expenseType===u)}),s&&(s.hidden=u==="monthly"),n&&(n.hidden=u!=="monthly"),r.required=u==="daily",i.required=u==="monthly",u==="monthly"&&!i.value&&(i.value=ke()),u==="daily"&&!r.value&&(r.value=W()))};t?.querySelectorAll("[data-expense-type]").forEach(u=>{u.addEventListener("click",()=>l(u.dataset.expenseType==="monthly"?"monthly":"daily"))}),l("daily"),t?.addEventListener("submit",async u=>{u.preventDefault();const c=new FormData(u.currentTarget),o=Number(c.get("id")||0),v=String(c.get("disbursementType")??"daily")==="monthly"?"monthly":"daily",y=String(c.get("expenseMonth")??ke()),f={expenseDate:v==="monthly"?`${y}-01`:String(c.get("expenseDate")??""),disbursementType:v,name:String(c.get("name")??""),category:String(c.get("category")??""),description:String(c.get("description")??""),amount:Number(c.get("amount")??0)};o?await Oa(o,f):await Da(f),await S()}),document.querySelectorAll(".edit-expense-btn").forEach(u=>{u.addEventListener("click",()=>{const c=e.find(v=>v.id===Number(u.dataset.id));if(!c||!t)return;t.querySelector("[name=id]").value=String(c.id),t.querySelector("[name=expenseDate]").value=c.expenseDate,t.querySelector("[name=expenseMonth]").value=At(c.expenseDate),l(ee(c)),t.querySelector("[name=amount]").value=String(c.amount),t.querySelector("[name=name]").value=c.name,t.querySelector("[name=category]").value=c.category,t.querySelector("[name=description]").value=c.description??"";const o=t.querySelector('button[type="submit"]');o&&(o.textContent="Update expense"),t.scrollIntoView({behavior:"smooth",block:"start"})})}),document.querySelectorAll(".delete-expense-btn").forEach(u=>{u.addEventListener("click",async()=>{if(d.currentUser?.role!=="admin")return;const c=Number(u.dataset.id);!Number.isFinite(c)||!confirm("Delete this disbursement?")||(await xa(c),await S())})}),document.querySelector("#fold-form")?.addEventListener("submit",async u=>{u.preventDefault();const c=new FormData(u.currentTarget);await La({orderTicket:String(c.get("orderTicket")??""),staffName:String(c.get("staffName")??""),foldCount:Number(c.get("foldCount")??1),rate:Number(c.get("rate")??5)}),await S()})}function Ss(e,t,a,s,n,r){document.querySelector("#generate-report")?.addEventListener("click",()=>{d.reportPreview=we(),S()});const i=document.querySelector("#sales-form");i?.addEventListener("submit",async b=>{b.preventDefault();const E=new FormData(b.currentTarget);await Ia({id:Number(E.get("id")||0)||void 0,saleDate:String(E.get("saleDate")??""),cashAmount:Number(E.get("cashAmount")??0),gcashAmount:Number(E.get("gcashAmount")??0),notes:String(E.get("notes")??"")}),await S()}),document.querySelectorAll(".edit-sale-btn").forEach(b=>{b.addEventListener("click",()=>{const E=a.find(P=>P.id===Number(b.dataset.id));if(!E||!i)return;i.querySelector("[name=id]").value=String(E.id),i.querySelector("[name=saleDate]").value=E.saleDate,i.querySelector("[name=cashAmount]").value=String(E.cashAmount),i.querySelector("[name=gcashAmount]").value=String(E.gcashAmount),i.querySelector("[name=notes]").value=E.notes??"";const N=i.querySelector('button[type="submit"]');N&&(N.textContent="Update daily sale"),i.scrollIntoView({behavior:"smooth",block:"start"})})}),document.querySelectorAll(".delete-sale-btn").forEach(b=>{b.addEventListener("click",async()=>{if(d.currentUser?.role!=="admin")return;const E=Number(b.dataset.id);!Number.isFinite(E)||!confirm("Delete this daily sale?")||(await qa(E),await S())})});const l=document.querySelector("[data-date-from]"),u=document.querySelector("[data-date-to]");document.querySelectorAll("[data-date-scope]").forEach(b=>{b.addEventListener("change",()=>{if(!b.checked||!l||!u)return;const E=new Date,N=be(E),P=new Date(E);b.value==="week"&&P.setDate(E.getDate()-6),b.value==="month"&&P.setDate(1),b.value!=="custom"&&(l.value=b.value==="today"?N:be(P),u.value=N)})});const c=b=>{const E=p=>String(p??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;"),N=p=>p==="Sales Report"?[110,125,150,215,95,95,105,105]:p==="Disbursement"?[115,115,90,150,150,220,105]:p==="Fold Count"?[220,125]:p==="Revolving Daily Summary"?[115,105,120,115]:p==="Revolving History"?[115,96,140,96,110,180,120]:[155,125,125,125,95,95,115,115];return`<?xml version="1.0"?>
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
  ${b.map(p=>{const g=N(p.name).map($=>`<Column ss:Width="${$}" ss:AutoFitWidth="0"/>`).join(""),L=p.rows.map($=>{if(!$.length)return'<Row ss:Height="10" ss:StyleID="BorderRow"><Cell ss:StyleID="BorderCell"><Data ss:Type="String">&nbsp;</Data></Cell></Row>';const F=$[0]==="Type"||$[0]==="Summary"||$[0]==="Sales Summary"||$[0]==="Disbursement Summary"||$[0]==="Staff"||$[0]==="Date of Sales"||$[0]==="Date"||$[0]==="Date/Month",q=F?"HeaderRow":"BorderRow",D=F?"HeaderCell":"BorderCell",I=F?26:22,M=$.map(U=>`<Cell ss:StyleID="${D}"><Data ss:Type="${typeof U=="number"?"Number":"String"}">${E(U)}</Data></Cell>`).join("");return`<Row ss:Height="${I}" ss:StyleID="${q}">${M}</Row>`}).join("");return`
        <Worksheet ss:Name="${E(p.name)}">
          <Table>
            ${g}
            ${L}
          </Table>
        </Worksheet>`}).join("")}
</Workbook>`},o=()=>{const b=we(),E=$t(e,t,a,s,n,r),N=[];if(E.selectedTypes.has("sales")){const g=E.salesRows(),L=[["Ticket","Customer","Cash","GCash","Total Payment"],...g.transactions.map($=>[$.ticket,$.customer,$.cash,$.gcash,$.total]),[],["Cash from Orders","GCash from Orders","Sales from Orders"],[g.orderCashTotal,g.orderGcashTotal,g.orderCashTotal+g.orderGcashTotal],[],["Cash Whole Sale","GCash Whole Sale","Whole Sale of Day"],[g.manualCashTotal,g.manualGcashTotal,g.manualCashTotal+g.manualGcashTotal],[],["Total Cash","Total GCash","Total Sales"],[g.totalCash,g.totalGcash,g.totalSales]];N.push({name:"Sales Report",rows:L})}E.selectedTypes.has("disbursement")&&N.push({name:"Disbursement",rows:E.disbursementRows().rows}),E.selectedTypes.has("fold_count")&&N.push({name:"Fold Count",rows:E.foldCountRows().rows}),E.selectedTypes.has("revolving_fund")&&(N.push({name:"Revolving Daily Summary",rows:E.revolvingDailySummaryRows().rows}),N.push({name:"Revolving History",rows:E.revolvingHistoryRows().rows})),E.selectedTypes.has("summary")&&N.push({name:"Summary",rows:E.summaryRows()});const P=c(N.length?N:[{name:"Summary",rows:E.summaryRows()}]),p=`laba101-report-${b.from}-to-${b.to}.xls`;return new File([P],p,{type:"application/vnd.ms-excel"})},v=async()=>{const b=o();if(!C.isNativePlatform())return{fileName:b.name,uri:""};const E=await b.text(),N=b.name;await Ze.writeFile({path:N,data:E,directory:Ae.External,encoding:qe.UTF8});const{uri:P}=await Ze.getUri({path:N,directory:Ae.External});return{fileName:b.name,uri:P}},y=()=>{const b=o(),E=we(),N=`laba101-report-${E.from}-to-${E.to}.xls`,P=b,p=URL.createObjectURL(P),g=document.createElement("a");return g.href=p,g.download=N,document.body.appendChild(g),g.click(),setTimeout(()=>{g.remove(),URL.revokeObjectURL(p)},1e3),N},f=async b=>{const E=document.querySelector(b==="export"?"#export-report":"#email-report");E&&(E.disabled=!0,E.textContent=b==="export"?"Exporting...":"Sending...");try{if(b==="export")if(C.isNativePlatform()){const N=await v();alert(`Report exported as "${N.fileName}".`)}else{const N=y();alert(`Report saved: ${N}`)}else{const N=await ft("report_email")||"";if(!N){alert("Please configure a report email in Settings first.");return}const P=we(),p=`Laba101 report ${P.from} to ${P.to}`;if(C.isNativePlatform()){const g=await v();try{await Yt.share({title:p,text:`Please find the attached Laba101 report file: ${g.fileName}`,files:[g.uri],dialogTitle:"Send report via email"}),alert(`Report saved and shared as "${g.fileName}".`)}catch(L){const $=String(L).toLowerCase();if($.includes("share canceled")||$.includes("canceled"))alert(`Report saved as "${g.fileName}".`);else throw L}}else{const g=y(),L=`Hi,

Please find the attached Laba101 report file: ${g}

Date range: ${P.from} to ${P.to}`,$=`mailto:${N}?subject=${encodeURIComponent(p)}&body=${encodeURIComponent(L)}`;setTimeout(()=>{window.location.href=$},800),alert(`Report downloaded as "${g}".
Your email app will open — please attach the file and send.`)}}}catch(N){alert("Failed: "+String(N))}finally{E&&(E.disabled=!1,E.textContent=b==="export"?"Export Excel":"Send to Email")}};document.querySelector("#export-report")?.addEventListener("click",async()=>{await f("export")}),document.querySelector("#email-report")?.addEventListener("click",async()=>{await f("email")})}function ws(){document.querySelector("#order-queue-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);d.orderSearch=String(t.get("orderSearch")??"").trim(),d.orderDateFilter=String(t.get("orderDateFilter")??"").trim(),d.orderPaymentFilter=String(t.get("orderPaymentFilter")??"").trim(),S()}),document.querySelector("#order-queue-clear")?.addEventListener("click",()=>{d.orderSearch="",d.orderDateFilter="",d.orderPaymentFilter="",S()}),document.querySelector("#archived-order-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);d.archivedOrderSearch=String(t.get("archivedOrderSearch")??"").trim(),S()}),document.querySelector("#archived-order-clear")?.addEventListener("click",()=>{d.archivedOrderSearch="",S()})}function Ts(){document.querySelector("#customer-search-form")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);d.customerSearch=String(t.get("customerSearch")??"").trim(),S()}),document.querySelector("#customer-search-clear")?.addEventListener("click",()=>{d.customerSearch="",S()})}function Ns(){document.querySelector("#machine-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await ka({machineName:String(t.get("machineName")??""),machineType:String(t.get("machineType")),status:String(t.get("status")),branch:String(t.get("branch")??"")}),await S()}),document.querySelector("#subcleaning-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=e.currentTarget.querySelector('button[type="submit"]');t&&(t.disabled=!0,t.textContent="Starting...");const a=new FormData(e.currentTarget),s=a.getAll("machineIds").map(Number);if(!s.length){alert("Please select at least one machine to clean."),t&&(t.disabled=!1,t.textContent="Start Cleaning");return}await Ba({date:String(a.get("date")??""),machineIds:s,cleaningStatus:String(a.get("cleaningStatus")??""),notes:String(a.get("notes")??""),branch:String(a.get("branch")??"")}),await S()}),document.querySelectorAll(".complete-cleaning-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.machineId),a=e.dataset.branch??"";e.disabled=!0,e.textContent="Completing...",await _a(t,a),await S()})}),document.querySelectorAll(".deactivate-machine-btn, .activate-machine-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.id),a=e.classList.contains("deactivate-machine-btn");await Ma(t,a?"inactive":"available"),await S()})})}function As(e){const t=document.querySelector("#add-staff-modal"),a=document.querySelector("#open-add-staff-modal"),s=document.querySelector("#close-add-staff-modal"),n=document.querySelector("#staff-form"),r=()=>{n?.reset(),n&&(n.querySelector("[name=id]").value="");const l=document.querySelector("#add-staff-title");l&&(l.textContent="Add staff member"),t?.removeAttribute("hidden")},i=()=>{t?.setAttribute("hidden",""),n?.reset()};a?.addEventListener("click",r),s?.addEventListener("click",i),t?.addEventListener("click",l=>{l.target===t&&i()}),document.querySelectorAll(".edit-staff-btn").forEach(l=>{l.addEventListener("click",()=>{const u=Number(l.dataset.id),c=e.find(o=>o.id===u);if(c&&n){n.querySelector("[name=id]").value=String(c.id),n.querySelector("[name=name]").value=c.name,n.querySelector("[name=email]").value=c.email,n.querySelector("[name=password]").value=c.password,n.querySelector("[name=role]").value=c.role,n.querySelector("[name=branch]").value=c.branch;const o=document.querySelector("#add-staff-title");o&&(o.textContent="Edit staff member"),t?.removeAttribute("hidden")}})}),document.querySelectorAll(".deactivate-staff-btn, .activate-staff-btn").forEach(l=>{l.addEventListener("click",async()=>{const u=Number(l.dataset.id),c=e.find(o=>o.id===u);c&&(await at(u,{isActive:c.isActive!==0?0:1}),await S())})}),n?.addEventListener("submit",async l=>{l.preventDefault();const u=document.querySelector("#staff-save-btn");u&&(u.disabled=!0,u.textContent="Saving...");const c=new FormData(n),o=c.get("id")?Number(c.get("id")):void 0,v=String(c.get("name")??"").trim(),y=String(c.get("email")??"").trim(),f=String(c.get("password")??"password")||"password",b=String(c.get("role")),E=String(c.get("branch")??"");if(!v||!y){alert("Name and email are required."),u&&(u.disabled=!1,u.textContent="Save staff member");return}try{o?await at(o,{name:v,email:y,password:f,role:b,branch:E}):await va({name:v,email:y,password:f,role:b,branch:E}),i(),await S()}catch{alert("Failed to save staff. The email may already be in use."),u&&(u.disabled=!1,u.textContent="Save staff member")}})}function Ls(){document.querySelector("#settings-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await Te("branch",String(t.get("branch")??"Main Store")),await Te("fold_rate",String(t.get("foldRate")??"5")),String(t.get("reportEmail")??"")&&await Te("report_email",String(t.get("reportEmail"))),alert("Settings saved successfully!")})}async function Cs(){await da();const e=localStorage.getItem(ge);if(e)try{const t=JSON.parse(e);if(t.email&&t.remembered){const a=await ht(t.email,"password")??null;d.currentUser=a}}catch{localStorage.removeItem(ge)}await S()}function $s(e,t,a,s){const n=e.filter(f=>f.status==="revolving").reduce((f,b)=>f+b.cashAmount,0),r=t.filter(f=>f.type==="add").reduce((f,b)=>f+b.amount,0),i=t.filter(f=>f.type==="disbursement").reduce((f,b)=>f+b.amount,0),l=n+r-i,u=d.revolvingHistoryFrom||"0000-01-01",c=d.revolvingHistoryTo||"9999-12-31",o=t.filter(f=>{const b=K(f.createdAt);return b>=u&&b<=c}),v=e.map(f=>{const b=Nt(f.saleDate,a,s,f.cashAmount),E=f.status==="revolving"?'<span class="ok">Revolving</span>':f.status==="endorsed"?`<span class="warn">Endorsed to ${m(f.endorsedTo)}</span>`:'<span class="meta">Pending</span>',N=f.status!=="revolving"&&f.status!=="endorsed"?`<div class="row-actions">
          <button class="primary revolving-btn" data-id="${f.id}">Revolving</button>
          <button class="secondary endorsed-btn" data-id="${f.id}" data-date="${oe(f.saleDate)}">Endorsed</button>
        </div>`:"";return[`<strong>${m(oe(f.saleDate))}</strong>`,`<strong class="ok">${T(b)}</strong>`,E,f.statusUpdatedAt?m(oe(f.statusUpdatedAt)):"-",N]}),y=o.map(f=>[Xa(f.createdAt),`<strong>${m(f.revolvingNumber)}</strong>`,m(f.name),`<strong class="${f.type==="disbursement"?"warn":"ok"}">${f.type==="disbursement"?"-":"+"}${T(f.amount)}</strong>`,m(f.category),m(f.description||"-"),`<span class="${f.type==="add"?"ok":"warn"}">${f.type==="add"?"Add Revolving Fund":"Disbursement"}</span>`]);return`
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
        ${x("Daily Summary","Cash on hand per day (order cash + manual cash − disbursements)")}
        ${$e(["Date of Sales","Cash on Hand","Status","Date Update","Action"],v,"data-table revolving-summary-datatable")}
      </article>

      <article class="panel">
        ${x("Revolving Table History","Filter by date — DISB numbers shared with Daily Report expenses")}
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
        ${$e(["Date","Disbursement #","Name","Amount","Category","Description","Type"],y,"data-table revolving-history-datatable")}
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
  `}function Rs(){document.querySelector("#revolving-history-filters")?.addEventListener("submit",async o=>{o.preventDefault();const v=new FormData(o.currentTarget);d.revolvingHistoryFrom=String(v.get("revolvingHistoryFrom")??"").trim(),d.revolvingHistoryTo=String(v.get("revolvingHistoryTo")??"").trim(),await S()}),document.querySelector("#revolving-history-clear")?.addEventListener("click",async()=>{d.revolvingHistoryFrom="",d.revolvingHistoryTo="",await S()}),document.querySelectorAll(".revolving-btn").forEach(o=>{o.addEventListener("click",async()=>{d.revolvingModalOpen=!0,d.revolvingSaleId=Number(o.dataset.id),await S()})});const e=document.getElementById("confirm-revolving-btn");e&&e.addEventListener("click",async()=>{await rt(d.revolvingSaleId,"revolving",null,new Date().toISOString()),d.revolvingModalOpen=!1,await S()});const t=document.getElementById("close-revolving-modal");t&&t.addEventListener("click",async()=>{d.revolvingModalOpen=!1,await S()}),document.querySelectorAll(".endorsed-btn").forEach(o=>{o.addEventListener("click",async()=>{d.endorseModalOpen=!0,d.endorseSaleId=Number(o.dataset.id),d.endorseSaleDate=o.dataset.date??"",await S()})});const a=document.getElementById("close-endorse-modal");a&&a.addEventListener("click",async()=>{d.endorseModalOpen=!1,await S()});const s=document.getElementById("endorse-form");s&&s.addEventListener("submit",async o=>{o.preventDefault();const v=new FormData(s),y=String(v.get("endorsedTo")??"").trim();y&&(await rt(d.endorseSaleId,"endorsed",y,new Date().toISOString()),d.endorseModalOpen=!1,await S())});const n=document.getElementById("add-revolving-fund-btn");n&&n.addEventListener("click",async()=>{d.addFundModalOpen=!0,await S()});const r=document.getElementById("close-add-fund-modal");r&&r.addEventListener("click",async()=>{d.addFundModalOpen=!1,await S()});const i=document.getElementById("add-fund-form");i&&i.addEventListener("submit",async o=>{o.preventDefault();const v=new FormData(i);await it({name:String(v.get("name")??"").trim(),amount:Number(v.get("amount")??0),category:"Add Revolving Fund",description:null,type:"add",createdAt:new Date().toISOString()}),d.addFundModalOpen=!1,await S()});const l=document.getElementById("revolving-disbursement-btn");l&&l.addEventListener("click",async()=>{d.disbursementModalOpen=!0,await S()});const u=document.getElementById("close-disbursement-modal");u&&u.addEventListener("click",async()=>{d.disbursementModalOpen=!1,await S()});const c=document.getElementById("disbursement-form");c&&c.addEventListener("submit",async o=>{o.preventDefault();const v=new FormData(c);await it({name:String(v.get("name")??"").trim(),amount:Number(v.get("amount")??0),category:String(v.get("category")??"").trim(),description:String(v.get("description")??"").trim(),type:"disbursement",expenseDate:W(),createdAt:new Date().toISOString()}),d.disbursementModalOpen=!1,await S()})}Cs();export{qe as E,Me as W,_t as b};
