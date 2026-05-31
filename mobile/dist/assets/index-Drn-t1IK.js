(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function a(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=a(r);fetch(r.href,n)}})();const Qe="modulepreload",ze=function(e){return"/"+e},Re={},Se=function(t,a,s){let r=Promise.resolve();if(a&&a.length>0){let c=function(l){return Promise.all(l.map(g=>Promise.resolve(g).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),i=o?.nonce||o?.getAttribute("nonce");r=c(a.map(l=>{if(l=ze(l),l in Re)return;Re[l]=!0;const g=l.endsWith(".css"),h=g?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${h}`))return;const u=document.createElement("link");if(u.rel=g?"stylesheet":Qe,g||(u.as="script"),u.crossOrigin="",u.href=l,i&&u.setAttribute("nonce",i),document.head.appendChild(u),g)return new Promise((P,C)=>{u.addEventListener("load",P),u.addEventListener("error",()=>C(new Error(`Unable to preload CSS for ${l}`)))})}))}function n(o){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=o,window.dispatchEvent(i),!i.defaultPrevented)throw o}return r.then(o=>{for(const i of o||[])i.status==="rejected"&&n(i.reason);return t().catch(n)})};var Y;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(Y||(Y={}));class ge extends Error{constructor(t,a,s){super(t),this.message=t,this.code=a,this.data=s}}const Ze=e=>{var t,a;return e?.androidBridge?"android":!((a=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},et=e=>{const t=e.CapacitorCustomPlatform||null,a=e.Capacitor||{},s=a.Plugins=a.Plugins||{},r=()=>t!==null?t.name:Ze(e),n=()=>r()!=="web",o=h=>{const u=l.get(h);return!!(u?.platforms.has(r())||i(h))},i=h=>{var u;return(u=a.PluginHeaders)===null||u===void 0?void 0:u.find(P=>P.name===h)},c=h=>e.console.error(h),l=new Map,g=(h,u={})=>{const P=l.get(h);if(P)return console.warn(`Capacitor plugin "${h}" already registered. Cannot register plugins twice.`),P.proxy;const C=r(),w=i(h);let E;const m=async()=>(!E&&C in u?E=typeof u[C]=="function"?E=await u[C]():E=u[C]:t!==null&&!E&&"web"in u&&(E=typeof u.web=="function"?E=await u.web():E=u.web),E),p=(N,D)=>{var S,U;if(w){const j=w?.methods.find(F=>D===F.name);if(j)return j.rtype==="promise"?F=>a.nativePromise(h,D.toString(),F):(F,W)=>a.nativeCallback(h,D.toString(),F,W);if(N)return(S=N[D])===null||S===void 0?void 0:S.bind(N)}else{if(N)return(U=N[D])===null||U===void 0?void 0:U.bind(N);throw new ge(`"${h}" plugin is not implemented on ${C}`,Y.Unimplemented)}},v=N=>{let D;const S=(...U)=>{const j=m().then(F=>{const W=p(F,N);if(W){const te=W(...U);return D=te?.remove,te}else throw new ge(`"${h}.${N}()" is not implemented on ${C}`,Y.Unimplemented)});return N==="addListener"&&(j.remove=async()=>D()),j};return S.toString=()=>`${N.toString()}() { [capacitor code] }`,Object.defineProperty(S,"name",{value:N,writable:!1,configurable:!1}),S},b=v("addListener"),$=v("removeListener"),y=(N,D)=>{const S=b({eventName:N},D),U=async()=>{const F=await S;$({eventName:N,callbackId:F},D)},j=new Promise(F=>S.then(()=>F({remove:U})));return j.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await U()},j},k=new Proxy({},{get(N,D){switch(D){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return w?y:b;case"removeListener":return $;default:return v(D)}}});return s[h]=k,l.set(h,{name:h,proxy:k,platforms:new Set([...Object.keys(u),...w?[C]:[]])}),k};return a.convertFileSrc||(a.convertFileSrc=h=>h),a.getPlatform=r,a.handleError=c,a.isNativePlatform=n,a.isPluginAvailable=o,a.registerPlugin=g,a.Exception=ge,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},tt=e=>e.Capacitor=et(e),A=tt(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),Z=A.registerPlugin;class Te{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,a){let s=!1;this.listeners[t]||(this.listeners[t]=[],s=!0),this.listeners[t].push(a);const n=this.windowListeners[t];n&&!n.registered&&this.addWindowListener(n),s&&this.sendRetainedArgumentsForEvent(t);const o=async()=>this.removeListener(t,a);return Promise.resolve({remove:o})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,a,s){const r=this.listeners[t];if(!r){if(s){let n=this.retainedEventArguments[t];n||(n=[]),n.push(a),this.retainedEventArguments[t]=n}return}r.forEach(n=>n(a))}hasListeners(t){var a;return!!(!((a=this.listeners[t])===null||a===void 0)&&a.length)}registerWindowListener(t,a){this.windowListeners[a]={registered:!1,windowEventName:t,pluginEventName:a,handler:s=>{this.notifyListeners(a,s)}}}unimplemented(t="not implemented"){return new A.Exception(t,Y.Unimplemented)}unavailable(t="not available"){return new A.Exception(t,Y.Unavailable)}async removeListener(t,a){const s=this.listeners[t];if(!s)return;const r=s.indexOf(a);this.listeners[t].splice(r,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const a=this.retainedEventArguments[t];a&&(delete this.retainedEventArguments[t],a.forEach(s=>{this.notifyListeners(t,s)}))}}const $e=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),xe=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class at extends Te{async getCookies(){const t=document.cookie,a={};return t.split(";").forEach(s=>{if(s.length<=0)return;let[r,n]=s.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");r=xe(r).trim(),n=xe(n).trim(),a[r]=n}),a}async setCookie(t){try{const a=$e(t.key),s=$e(t.value),r=t.expires?`; expires=${t.expires.replace("expires=","")}`:"",n=(t.path||"/").replace("path=",""),o=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${a}=${s||""}${r}; path=${n}; ${o};`}catch(a){return Promise.reject(a)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const a of t)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}Z("CapacitorCookies",{web:()=>new at});const st=async e=>new Promise((t,a)=>{const s=new FileReader;s.onload=()=>{const r=s.result;t(r.indexOf(",")>=0?r.split(",")[1]:r)},s.onerror=r=>a(r),s.readAsDataURL(e)}),nt=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(r=>r.toLocaleLowerCase()).reduce((r,n,o)=>(r[n]=e[t[o]],r),{})},rt=(e,t=!0)=>e?Object.entries(e).reduce((s,r)=>{const[n,o]=r;let i,c;return Array.isArray(o)?(c="",o.forEach(l=>{i=t?encodeURIComponent(l):l,c+=`${n}=${i}&`}),c.slice(0,-1)):(i=t?encodeURIComponent(o):o,c=`${n}=${i}`),`${s}&${c}`},"").substr(1):null,it=(e,t={})=>{const a=Object.assign({method:e.method||"GET",headers:e.headers},t),r=nt(e.headers)["content-type"]||"";if(typeof e.data=="string")a.body=e.data;else if(r.includes("application/x-www-form-urlencoded")){const n=new URLSearchParams;for(const[o,i]of Object.entries(e.data||{}))n.set(o,i);a.body=n.toString()}else if(r.includes("multipart/form-data")||e.data instanceof FormData){const n=new FormData;if(e.data instanceof FormData)e.data.forEach((i,c)=>{n.append(c,i)});else for(const i of Object.keys(e.data))n.append(i,e.data[i]);a.body=n;const o=new Headers(a.headers);o.delete("content-type"),a.headers=o}else(r.includes("application/json")||typeof e.data=="object")&&(a.body=JSON.stringify(e.data));return a};class ot extends Te{async request(t){const a=it(t,t.webFetchExtra),s=rt(t.params,t.shouldEncodeUrlParams),r=s?`${t.url}?${s}`:t.url,n=await fetch(r,a),o=n.headers.get("content-type")||"";let{responseType:i="text"}=n.ok?t:{};o.includes("application/json")&&(i="json");let c,l;switch(i){case"arraybuffer":case"blob":l=await n.blob(),c=await st(l);break;case"json":c=await n.json();break;default:c=await n.text()}const g={};return n.headers.forEach((h,u)=>{g[u]=h}),{data:c,headers:g,status:n.status,url:n.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}Z("CapacitorHttp",{web:()=>new ot});var Oe;(function(e){e.Dark="DARK",e.Light="LIGHT",e.Default="DEFAULT"})(Oe||(Oe={}));var Pe;(function(e){e.StatusBar="StatusBar",e.NavigationBar="NavigationBar"})(Pe||(Pe={}));class ct extends Te{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}Z("SystemBars",{web:()=>new ct});function lt(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,a){return new Proxy({},{get(s,r){return(n,o,i)=>{const c=e.Capacitor.Plugins[a];if(c===void 0){i(new Error(`Capacitor plugin ${a} not found`));return}if(typeof c[r]!="function"){i(new Error(`Method ${r} not found in Capacitor plugin ${a}`));return}(async()=>{try{const l=await c[r](n);o(l)}catch(l){i(l)}})()}}})}})}function dt(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,a){return e.cordova.plugins[a]}})}function ut(e=!1){typeof window>"u"||(window.CapacitorUtils=window.CapacitorUtils||{},window.Capacitor!==void 0&&!e?lt(window):window.cordova!==void 0&&dt(window))}var ie;(function(e){e.Documents="DOCUMENTS",e.Data="DATA",e.Library="LIBRARY",e.Cache="CACHE",e.External="EXTERNAL",e.ExternalStorage="EXTERNAL_STORAGE",e.ExternalCache="EXTERNAL_CACHE",e.LibraryNoCloud="LIBRARY_NO_CLOUD",e.Temporary="TEMPORARY"})(ie||(ie={}));var be;(function(e){e.UTF8="utf8",e.ASCII="ascii",e.UTF16="utf16"})(be||(be={}));const De=Z("Filesystem",{web:()=>Se(()=>import("./web-C1ufL15a.js"),[]).then(e=>new e.FilesystemWeb)});ut();const mt=Z("Share",{web:()=>Se(()=>import("./web-DiD3AAeX.js"),[]).then(e=>new e.ShareWeb)});class vt{constructor(t){this.sqlite=t,this._connectionDict=new Map}async initWebStore(){try{return await this.sqlite.initWebStore(),Promise.resolve()}catch(t){return Promise.reject(t)}}async saveToStore(t){try{return await this.sqlite.saveToStore({database:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async saveToLocalDisk(t){try{return await this.sqlite.saveToLocalDisk({database:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getFromLocalDiskToStore(t){const a=t??!0;try{return await this.sqlite.getFromLocalDiskToStore({overwrite:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async echo(t){try{const a=await this.sqlite.echo({value:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isSecretStored(){try{const t=await this.sqlite.isSecretStored();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async setEncryptionSecret(t){try{return await this.sqlite.setEncryptionSecret({passphrase:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async changeEncryptionSecret(t,a){try{return await this.sqlite.changeEncryptionSecret({passphrase:t,oldpassphrase:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async clearEncryptionSecret(){try{return await this.sqlite.clearEncryptionSecret(),Promise.resolve()}catch(t){return Promise.reject(t)}}async checkEncryptionSecret(t){try{const a=await this.sqlite.checkEncryptionSecret({passphrase:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async addUpgradeStatement(t,a){try{return t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.addUpgradeStatement({database:t,upgrade:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async createConnection(t,a,s,r,n){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.createConnection({database:t,encrypted:a,mode:s,version:r,readonly:n});const o=new Ie(t,n,this.sqlite),i=n?`RO_${t}`:`RW_${t}`;return this._connectionDict.set(i,o),Promise.resolve(o)}catch(o){return Promise.reject(o)}}async closeConnection(t,a){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.closeConnection({database:t,readonly:a});const s=a?`RO_${t}`:`RW_${t}`;return this._connectionDict.delete(s),Promise.resolve()}catch(s){return Promise.reject(s)}}async isConnection(t,a){const s={};t.endsWith(".db")&&(t=t.slice(0,-3));const r=a?`RO_${t}`:`RW_${t}`;return s.result=this._connectionDict.has(r),Promise.resolve(s)}async retrieveConnection(t,a){t.endsWith(".db")&&(t=t.slice(0,-3));const s=a?`RO_${t}`:`RW_${t}`;if(this._connectionDict.has(s)){const r=this._connectionDict.get(s);return typeof r<"u"?Promise.resolve(r):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async getNCDatabasePath(t,a){try{const s=await this.sqlite.getNCDatabasePath({path:t,database:a});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async createNCConnection(t,a){try{await this.sqlite.createNCConnection({databasePath:t,version:a});const s=new Ie(t,!0,this.sqlite),r=`RO_${t})`;return this._connectionDict.set(r,s),Promise.resolve(s)}catch(s){return Promise.reject(s)}}async closeNCConnection(t){try{await this.sqlite.closeNCConnection({databasePath:t});const a=`RO_${t})`;return this._connectionDict.delete(a),Promise.resolve()}catch(a){return Promise.reject(a)}}async isNCConnection(t){const a={},s=`RO_${t})`;return a.result=this._connectionDict.has(s),Promise.resolve(a)}async retrieveNCConnection(t){if(this._connectionDict.has(t)){const a=`RO_${t})`,s=this._connectionDict.get(a);return typeof s<"u"?Promise.resolve(s):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async isNCDatabase(t){try{const a=await this.sqlite.isNCDatabase({databasePath:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async retrieveAllConnections(){return this._connectionDict}async closeAllConnections(){const t=new Map;try{for(const a of this._connectionDict.keys()){const s=a.substring(3),r=a.substring(0,3)==="RO_";await this.sqlite.closeConnection({database:s,readonly:r}),t.set(a,null)}for(const a of t.keys())this._connectionDict.delete(a);return Promise.resolve()}catch(a){return Promise.reject(a)}}async checkConnectionsConsistency(){try{const t=[...this._connectionDict.keys()],a=[],s=[];for(const n of t)a.push(n.substring(0,2)),s.push(n.substring(3));const r=await this.sqlite.checkConnectionsConsistency({dbNames:s,openModes:a});return r.result||(this._connectionDict=new Map),Promise.resolve(r)}catch(t){return this._connectionDict=new Map,Promise.reject(t)}}async importFromJson(t){try{const a=await this.sqlite.importFromJson({jsonstring:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isJsonValid(t){try{const a=await this.sqlite.isJsonValid({jsonstring:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async copyFromAssets(t){const a=t??!0;try{return await this.sqlite.copyFromAssets({overwrite:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async getFromHTTPRequest(t,a){const s=a??!0;try{return await this.sqlite.getFromHTTPRequest({url:t,overwrite:s}),Promise.resolve()}catch(r){return Promise.reject(r)}}async isDatabaseEncrypted(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const a=await this.sqlite.isDatabaseEncrypted({database:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isInConfigEncryption(){try{const t=await this.sqlite.isInConfigEncryption();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isInConfigBiometricAuth(){try{const t=await this.sqlite.isInConfigBiometricAuth();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isDatabase(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const a=await this.sqlite.isDatabase({database:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async getDatabaseList(){try{const a=(await this.sqlite.getDatabaseList()).values;a.sort();const s={values:a};return Promise.resolve(s)}catch(t){return Promise.reject(t)}}async getMigratableDbList(t){const a=t||"default";try{const s=await this.sqlite.getMigratableDbList({folderPath:a});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async addSQLiteSuffix(t,a){const s=t||"default",r=a||[];try{const n=await this.sqlite.addSQLiteSuffix({folderPath:s,dbNameList:r});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async deleteOldDatabases(t,a){const s=t||"default",r=a||[];try{const n=await this.sqlite.deleteOldDatabases({folderPath:s,dbNameList:r});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async moveDatabasesAndAddSuffix(t,a){const s=t||"default",r=a||[];return this.sqlite.moveDatabasesAndAddSuffix({folderPath:s,dbNameList:r})}}class Ie{constructor(t,a,s){this.dbName=t,this.readonly=a,this.sqlite=s}getConnectionDBName(){return this.dbName}getConnectionReadOnly(){return this.readonly}async open(){try{return await this.sqlite.open({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async close(){try{return await this.sqlite.close({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async beginTransaction(){try{const t=await this.sqlite.beginTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async commitTransaction(){try{const t=await this.sqlite.commitTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async rollbackTransaction(){try{const t=await this.sqlite.rollbackTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTransactionActive(){try{const t=await this.sqlite.isTransactionActive({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async loadExtension(t){try{return await this.sqlite.loadExtension({database:this.dbName,path:t,readonly:this.readonly}),Promise.resolve()}catch(a){return Promise.reject(a)}}async enableLoadExtension(t){try{return await this.sqlite.enableLoadExtension({database:this.dbName,toggle:t,readonly:this.readonly}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getUrl(){try{const t=await this.sqlite.getUrl({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getVersion(){try{const t=await this.sqlite.getVersion({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getTableList(){try{const t=await this.sqlite.getTableList({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async execute(t,a=!0,s=!0){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const r=await this.sqlite.execute({database:this.dbName,statements:t,transaction:a,readonly:!1,isSQL92:s});return Promise.resolve(r)}}catch(r){return Promise.reject(r)}}async query(t,a,s=!0){let r;try{return a&&a.length>0?r=await this.sqlite.query({database:this.dbName,statement:t,values:a,readonly:this.readonly,isSQL92:!0}):r=await this.sqlite.query({database:this.dbName,statement:t,values:[],readonly:this.readonly,isSQL92:s}),r=await this.reorderRows(r),Promise.resolve(r)}catch(n){return Promise.reject(n)}}async run(t,a,s=!0,r="no",n=!0){let o;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(a&&a.length>0?o=await this.sqlite.run({database:this.dbName,statement:t,values:a,transaction:s,readonly:!1,returnMode:r,isSQL92:!0}):o=await this.sqlite.run({database:this.dbName,statement:t,values:[],transaction:s,readonly:!1,returnMode:r,isSQL92:n}),o.changes=await this.reorderRows(o.changes),Promise.resolve(o))}catch(i){return Promise.reject(i)}}async executeSet(t,a=!0,s="no",r=!0){let n;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(n=await this.sqlite.executeSet({database:this.dbName,set:t,transaction:a,readonly:!1,returnMode:s,isSQL92:r}),n.changes=await this.reorderRows(n.changes),Promise.resolve(n))}catch(o){return Promise.reject(o)}}async isExists(){try{const t=await this.sqlite.isDBExists({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTable(t){try{const a=await this.sqlite.isTableExists({database:this.dbName,table:t,readonly:this.readonly});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isDBOpen(){try{const t=await this.sqlite.isDBOpen({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async delete(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteDatabase({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async createSyncTable(){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const t=await this.sqlite.createSyncTable({database:this.dbName,readonly:!1});return Promise.resolve(t)}}catch(t){return Promise.reject(t)}}async setSyncDate(t){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.setSyncDate({database:this.dbName,syncdate:t,readonly:!1}),Promise.resolve())}catch(a){return Promise.reject(a)}}async getSyncDate(){try{const t=await this.sqlite.getSyncDate({database:this.dbName,readonly:this.readonly});let a="";return t.syncDate>0&&(a=new Date(t.syncDate*1e3).toISOString()),Promise.resolve(a)}catch(t){return Promise.reject(t)}}async exportToJson(t,a=!1){try{const s=await this.sqlite.exportToJson({database:this.dbName,jsonexportmode:t,readonly:this.readonly,encrypted:a});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async deleteExportedRows(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteExportedRows({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async executeTransaction(t,a=!0){let s=0,r=!1;if(this.readonly)return Promise.reject("not allowed in read-only mode");if(await this.sqlite.beginTransaction({database:this.dbName}),r=await this.sqlite.isTransactionActive({database:this.dbName}),!r)return Promise.reject("After Begin Transaction, no transaction active");try{for(const i of t){if(typeof i!="object"||!("statement"in i))throw new Error("Error a task.statement must be provided");if("values"in i&&i.values&&i.values.length>0){const c=i.statement.toUpperCase().includes("RETURNING")?"all":"no",l=await this.sqlite.run({database:this.dbName,statement:i.statement,values:i.values,transaction:!1,readonly:!1,returnMode:c,isSQL92:a});if(l.changes.changes<0)throw new Error("Error in transaction method run ");s+=l.changes.changes}else{const c=await this.sqlite.execute({database:this.dbName,statements:i.statement,transaction:!1,readonly:!1});if(c.changes.changes<0)throw new Error("Error in transaction method execute ");s+=c.changes.changes}}const n=await this.sqlite.commitTransaction({database:this.dbName});s+=n.changes.changes;const o={changes:{changes:s}};return Promise.resolve(o)}catch(n){const o=n.message?n.message:n;return await this.sqlite.rollbackTransaction({database:this.dbName}),Promise.reject(o)}}async reorderRows(t){const a=t;if(t?.values&&typeof t.values[0]=="object"&&Object.keys(t.values[0]).includes("ios_columns")){const s=t.values[0].ios_columns,r=[];for(let n=1;n<t.values.length;n++){const o=t.values[n],i={};for(const c of s)i[c]=o[c];r.push(i)}a.values=r}return Promise.resolve(a)}}const ft=Z("CapacitorSQLite",{web:()=>Se(()=>import("./web-BSl6sHdw.js"),[]).then(e=>new e.CapacitorSQLiteWeb),electron:()=>window.CapacitorCustomPlatform.plugins.CapacitorSQLite});function ht(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}const pt="laba101_offline",gt=new vt(ft);let ae=null;const V=[{id:1,name:"Laba101 Admin",email:"admin@laba101.test",password:"password",role:"admin",branch:"Main Store"},{id:2,name:"Laba101 Staff",email:"staff@laba101.test",password:"password",role:"staff",branch:"Main Store"},{id:3,name:"Mintal Staff",email:"mintal@laba101.test",password:"password",role:"staff",branch:"Mintal Branch"},{id:4,name:"Gensan Staff",email:"gensan@laba101.test",password:"password",role:"staff",branch:"Gensan Branch"}],oe=[{id:1,name:"Mara Santos",phone:"0917 482 1101",address:"Bajada, Davao City"},{id:2,name:"Jun Rivera",phone:"0928 314 7720",address:"Lanang, Davao City"},{id:3,name:"Ana Cruz",phone:"0935 901 2234",address:"Matina, Davao City"}],K=[M(1,"Drop-off","Wash, dry and fold.","Drop-Off","order",185,8,40,["Wash","Dry","Fold"],0,24),M(2,"Full Service","Wash, dry, fold, detergent and Fabcon.","Full Service","order",200,8,40,["Wash","Dry","Fold","Detergent","Fabcon"],0,24),M(3,"Self Service Wash","Max of 8kg per load.","Self Service","order",60,8,null,["Wash"],0,1),M(4,"Self Service Dry","Regular time: 40 mins drying time.","Self Service","order",70,8,40,["Dry"],0,1),M(5,"Dry Only","Standard drying rate.","Dry Only","order",70,8,40,["Dry"],0,1),M(6,"Additional Dry 10 mins","Additional drying time.","Dry Only","order",30,8,10,["Dry"],0,1),M(7,"Additional Dry 20 mins","Additional drying time.","Dry Only","order",50,8,20,["Dry"],0,1),M(8,"Additional Dry 40 mins","Additional drying time.","Dry Only","order",70,8,40,["Dry"],0,1),M(9,"Additional Zonrox","Extra Zonrox bleach add-on per load.","Add-on","addon",25,0,null,["Zonrox"],0,0),M(10,"Additional Fabcon","Extra Fabcon fabric conditioner add-on per load.","Add-on","addon",25,0,null,["Fabcon"],0,0),M(11,"Comforter / Bulky Load","Comforter 4kg max per load. Thin blankets, bedsheets, bath towels, pillow cases and curtains: 6kg max per load.","Comforter","order",200,8,40,["Wash","Dry","Fold"],0,24)],J=[{id:1,name:"Regular Clothes",maxKg:8,additionalFee:0,isActive:1},{id:2,name:"Comforter",maxKg:4,additionalFee:0,isActive:1},{id:3,name:"Thin Blankets",maxKg:6,additionalFee:0,isActive:1},{id:4,name:"Bedsheets",maxKg:6,additionalFee:0,isActive:1},{id:5,name:"Bath Towels",maxKg:6,additionalFee:0,isActive:1},{id:6,name:"Curtains",maxKg:6,additionalFee:0,isActive:1}];function qe(e,t){const a=L(e,[]),s=new Map(a.map(n=>[n.id,n])),r=t.map(n=>{const o=s.get(n.id);return o?{...n,...o,isActive:o.isActive??n.isActive}:n});(a.length!==r.length||r.some((n,o)=>n.id!==a[o]?.id||JSON.stringify(n)!==JSON.stringify(a[o])))&&T(e,r)}async function yt(){qe("services",K),qe("item_categories",J)}async function ve(e){for(const t of K)((await e.query("SELECT id FROM laundry_services WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive,t.id]):await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive]);for(const t of J)((await e.query("SELECT id FROM item_categories WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.maxKg,t.additionalFee,t.isActive,t.id]):await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[t.id,t.name,t.maxKg,t.additionalFee,t.isActive])}const Q=[{id:1,ticket:"LB260527-001",customerId:1,customer:"Mara Santos",phone:"0917 482 1101",serviceId:1,service:"Drop-off",itemCategoryId:1,itemCategory:"Regular Clothes",branch:"Main Store",status:"washing",workflowCompleted:["received","wash"],weightKg:5.75,price:185,additionalCharge:0,extraServiceAmount:0,totalAmount:185,paidAmount:185,balance:0,extras:[],notes:"Separate white uniforms.",foldedBy:null,foldedByName:null,dueAt:new Date(Date.now()+1080*60*1e3).toISOString(),createdAt:new Date().toISOString()}],ce=[{id:1,orderId:1,amount:185,method:"cash",reference:null,receivedAt:new Date().toISOString(),branch:"Main Store"}],le=[{id:1,expenseDate:"2026-05-27",number:"DISB-01",name:"Water refill",category:"Supplies",description:"Weekly supply",amount:250},{id:2,expenseDate:"2026-05-27",number:"DISB-02",name:"Detergent",category:"Supplies",description:"Laundry detergent",amount:500}],de=[{id:1,saleDate:"2026-05-27",saleNumber:"SALE-01",cashAmount:1200,gcashAmount:500,totalAmount:1700,notes:"Seed day total"}],X=[...[1,2,3,4].map(e=>({id:e,machineName:`Washer ${e}`,machineType:"washer",status:"available",branch:"Main Store"})),...[1,2,3,4].map(e=>({id:e+4,machineName:`Dryer ${e}`,machineType:"dryer",status:"available",branch:"Main Store"}))],ue=[{key:"branch",value:"Main Store"},{key:"fold_rate",value:"5"},{key:"report_email",value:"admin@laba101.test"}];function M(e,t,a,s,r,n,o,i,c,l,g){return{id:e,name:t,description:a,category:s,serviceType:r,price:n,maxKg:o,dryingMinutes:i,includes:c,additionalCharge:l,turnaroundHours:g,isActive:1}}function G(e){return`laba101-mobile-${e}`}function L(e,t){const a=localStorage.getItem(G(e));if(!a)return structuredClone(t);try{return JSON.parse(a)}catch{return structuredClone(t)}}function T(e,t){localStorage.setItem(G(e),JSON.stringify(t))}function B(e){return e.reduce((t,a)=>Math.max(t,a.id),0)+1}function z(){return new Date().toISOString()}function we(e=new Date){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${s}`}function bt(){return we().slice(2).replaceAll("-","")}function H(e,t){if(!e)return t;try{return JSON.parse(e)}catch{return t}}async function R(){return ae||(ae=await gt.createConnection(pt,!1,"no-encryption",1,!1),await ae.open()),ae}async function I(e,t,a,s){((await e.query(`PRAGMA table_info(${t})`)).values??[]).some(o=>o.name===a)||await e.execute(`ALTER TABLE ${t} ADD COLUMN ${a} ${s}`)}async function wt(){if(!A.isNativePlatform()){!localStorage.getItem(G("seeded_v4"))&&!localStorage.getItem(G("services"))&&!localStorage.getItem(G("staff"))&&(T("staff",V),T("customers",oe),T("services",K),T("item_categories",J),T("orders",Q),T("payments",ce),T("fold_logs",[]),T("expenses",le),T("sales",de),T("machines",X),T("subcleanings",[]),T("settings",ue),T("seeded_v4",!0)),await yt(),localStorage.getItem(G("seeded_v4"))||T("seeded_v4",!0);return}const e=await R();if(await e.execute(`
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
    CREATE TABLE IF NOT EXISTS machines (id INTEGER PRIMARY KEY AUTOINCREMENT, machineName TEXT NOT NULL, machineType TEXT NOT NULL, status TEXT NOT NULL, branch TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS subcleanings (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL, machineIds TEXT NOT NULL, machineNames TEXT NOT NULL, cleaningStatus TEXT NOT NULL, notes TEXT, branch TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY NOT NULL, value TEXT NOT NULL);
  `),await I(e,"staff","email","TEXT"),await I(e,"staff","password","TEXT"),await I(e,"staff","role","TEXT"),await I(e,"staff","isActive","INTEGER NOT NULL DEFAULT 1"),await e.run('UPDATE staff SET password = ? WHERE password IS NULL OR password = ""',["password"]),await e.run('UPDATE staff SET role = ? WHERE role IS NULL OR role = ""',["staff"]),await I(e,"orders","customerId","INTEGER NOT NULL DEFAULT 0"),await I(e,"orders","phone","TEXT"),await I(e,"orders","serviceId","INTEGER NOT NULL DEFAULT 0"),await I(e,"orders","itemCategoryId","INTEGER NOT NULL DEFAULT 0"),await I(e,"orders","itemCategory",'TEXT NOT NULL DEFAULT "Regular Clothes"'),await I(e,"orders","workflowCompleted","TEXT"),await I(e,"orders","weightKg","REAL NOT NULL DEFAULT 0"),await I(e,"orders","price","REAL NOT NULL DEFAULT 0"),await I(e,"orders","additionalCharge","REAL NOT NULL DEFAULT 0"),await I(e,"orders","extraServiceAmount","REAL NOT NULL DEFAULT 0"),await I(e,"orders","totalAmount","REAL NOT NULL DEFAULT 0"),await I(e,"orders","paidAmount","REAL NOT NULL DEFAULT 0"),await I(e,"orders","extras","TEXT"),await I(e,"orders","notes","TEXT"),await I(e,"orders","dueAt","TEXT"),await I(e,"orders","createdAt",'TEXT NOT NULL DEFAULT ""'),await I(e,"daily_sales","saleNumber","TEXT"),((await e.query("SELECT COUNT(*) as count FROM staff")).values?.[0]?.count??0)===0){for(const a of V)await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.name,a.email,a.password,a.role,a.branch,1]);for(const a of oe)await e.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[a.id,a.name,a.phone,a.address]);for(const a of K)await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[a.id,a.name,a.description,a.category,a.serviceType,a.price,a.maxKg,a.dryingMinutes,JSON.stringify(a.includes),a.additionalCharge,a.turnaroundHours,a.isActive]);for(const a of J)await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[a.id,a.name,a.maxKg,a.additionalFee,a.isActive]);for(const a of Q)await Be(e,a);for(const a of ce)await e.run("INSERT INTO payments (id, orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.orderId,a.amount,a.method,a.reference,a.receivedAt,a.branch]);for(const a of le)await e.run("INSERT INTO disbursement_expenses (id, expenseDate, number, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.expenseDate,a.number,a.name,a.category,a.description,a.amount]);for(const a of de)await e.run("INSERT INTO daily_sales (id, saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.saleDate,a.saleNumber,a.cashAmount,a.gcashAmount,a.totalAmount,a.notes]);for(const a of X)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[a.id,a.machineName,a.machineType,a.status,a.branch]);for(const a of ue)await e.run("INSERT INTO settings (key, value) VALUES (?, ?)",[a.key,a.value])}await ve(e)}async function Be(e,t){await e.run("INSERT INTO orders (id, ticket, customerId, customer, phone, serviceId, service, itemCategoryId, itemCategory, branch, status, workflowCompleted, weightKg, price, additionalCharge, extraServiceAmount, totalAmount, paidAmount, extras, notes, foldedBy, dueAt, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.ticket,t.customerId,t.customer,t.phone,t.serviceId,t.service,t.itemCategoryId,t.itemCategory,t.branch,t.status,JSON.stringify(t.workflowCompleted),t.weightKg,t.price,t.additionalCharge,t.extraServiceAmount,t.totalAmount,t.paidAmount,JSON.stringify(t.extras),t.notes,t.foldedBy,t.dueAt,t.createdAt])}function Et(e){const t=Number(e.paidAmount??0),a=Number(e.totalAmount??0),s=Number(e.foldedBy);return{id:Number(e.id),ticket:String(e.ticket),customerId:Number(e.customerId),customer:String(e.customer),phone:e.phone?String(e.phone):null,serviceId:Number(e.serviceId),service:String(e.service),itemCategoryId:Number(e.itemCategoryId),itemCategory:String(e.itemCategory),branch:String(e.branch),status:String(e.status),workflowCompleted:H(e.workflowCompleted,[]),weightKg:Number(e.weightKg),price:Number(e.price),additionalCharge:Number(e.additionalCharge),extraServiceAmount:Number(e.extraServiceAmount),totalAmount:a,paidAmount:t,balance:Number((a-t).toFixed(2)),extras:H(e.extras,[]),notes:e.notes?String(e.notes):null,foldedBy:Number.isFinite(s)&&s>0?s:null,foldedByName:e.foldedByName?String(e.foldedByName):null,dueAt:String(e.dueAt),createdAt:String(e.createdAt)}}async function St(){await wt()}async function fe(){return(await Ne()).find(t=>t.key==="branch")?.value??"Main Store"}async function Tt(){const e=await Ne();return Number(e.find(t=>t.key==="fold_rate")?.value??"5")}async function je(e){return(await Ne()).find(a=>a.key===e)?.value}async function Ne(){return A.isNativePlatform()?(await(await R()).query("SELECT key, value FROM settings ORDER BY key")).values??[]:L("settings",ue)}async function ne(e,t){if(!A.isNativePlatform()){const s=L("settings",ue).filter(r=>r.key!==e);s.push({key:e,value:t}),T("settings",s);return}await(await R()).run("REPLACE INTO settings (key, value) VALUES (?, ?)",[e,t])}async function Nt(e){return A.isNativePlatform()?(await(await R()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff WHERE branch = ? ORDER BY name ASC',[e])).values??[]:L("staff",V).filter(s=>s.branch===e)}async function _e(){return A.isNativePlatform()?(await(await R()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff ORDER BY name ASC')).values??[]:L("staff",V)}async function We(e,t){const a=e.trim().toLowerCase();return(await _e()).find(r=>r.email.toLowerCase()===a&&r.password===t&&r.isActive!==0)??null}async function At(e){if(!A.isNativePlatform()){const a=L("staff",V);a.unshift({id:B(a),...e,isActive:1}),T("staff",a);return}await(await R()).run("INSERT INTO staff (name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?)",[e.name,e.email,e.password,e.role,e.branch,1])}async function ke(e,t){if(!A.isNativePlatform()){const n=L("staff",V),o=n.find(i=>i.id===e);o&&(Object.assign(o,t),T("staff",n));return}const a=await R(),s=[],r=[];for(const[n,o]of Object.entries(t))n!=="id"&&(s.push(`${n} = ?`),r.push(o));s.length&&(r.push(e),await a.run(`UPDATE staff SET ${s.join(", ")} WHERE id = ?`,r))}async function Lt(){return A.isNativePlatform()?(await(await R()).query("SELECT id, name, phone, address FROM customers ORDER BY name ASC")).values??[]:L("customers",oe).sort((a,s)=>a.name.localeCompare(s.name))}async function Ct(e){if(!A.isNativePlatform()){const r=L("customers",oe),n=e.id?r.find(i=>i.id===e.id):r.find(i=>i.name.toLowerCase()===e.name.toLowerCase()&&(e.phone?i.phone===e.phone:!0));if(n)return n.name=e.name,n.phone=e.phone??n.phone,n.address=e.address??n.address,T("customers",r),n;const o={id:B(r),name:e.name,phone:e.phone??null,address:e.address??null};return r.push(o),T("customers",r),o}const t=await R();if(e.id)return await t.run("UPDATE customers SET name = ?, phone = ?, address = ? WHERE id = ?",[e.name,e.phone??null,e.address??null,e.id]),{id:e.id,name:e.name,phone:e.phone??null,address:e.address??null};const a=await t.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM customers"),s=Number((a.values?.[0]).id);return await t.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[s,e.name,e.phone??null,e.address??null]),{id:s,name:e.name,phone:e.phone??null,address:e.address??null}}async function Ae(e){if(!A.isNativePlatform())return L("services",K).filter(s=>!0);const t=await R(),a=await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[]);return(a.values??[]).length===0?(await ve(t),((await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[])).values??[]).map(r=>({...r,includes:H(r.includes,[])}))):(a.values??[]).map(s=>({...s,includes:H(s.includes,[])}))}async function Rt(){if(!A.isNativePlatform())return L("services",K);const e=await R(),t=await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC");return(t.values??[]).length===0?(await ve(e),((await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC")).values??[]).map(s=>({...s,includes:H(s.includes,[])}))):(t.values??[]).map(a=>({...a,includes:H(a.includes,[])}))}async function Ue(e){if(!A.isNativePlatform()){const a=L("services",K),s=e.id?a.find(r=>r.id===e.id):null;s?Object.assign(s,e):a.unshift({...e,id:B(a)}),T("services",a);return}const t=await R();e.id?await t.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = ? WHERE id = ?",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive,e.id]):await t.run("INSERT INTO laundry_services (name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive])}async function Ke(){if(!A.isNativePlatform())return L("item_categories",J).filter(a=>a.isActive);const e=await R(),t=await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC");return(t.values??[]).length===0?(await ve(e),(await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC")).values??[]):t.values??[]}async function $t(e){if(!A.isNativePlatform()){const a=L("item_categories",J),s=e.id?a.find(r=>r.id===e.id):null;s?Object.assign(s,e):a.unshift({...e,id:B(a)}),T("item_categories",a);return}const t=await R();e.id?await t.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = ? WHERE id = ?",[e.name,e.maxKg,e.additionalFee,e.isActive,e.id]):await t.run("INSERT INTO item_categories (name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?)",[e.name,e.maxKg,e.additionalFee,e.isActive])}function Ee(e,t,a,s){const r=Number(t.maxKg),n=Math.max(0,a-r),o=0,i=s.reduce((g,h)=>g+Number(h.price),0),c=s.map(g=>({id:g.id,name:ht(g.name),price:Number(g.price)})),l=Number((Number(e.price)+o+i).toFixed(2));return{price:Number(e.price),additionalCharge:Number(o.toFixed(2)),extraServiceAmount:Number(i.toFixed(2)),totalAmount:l,allowedKg:r,extraKg:Number(n.toFixed(2)),warning:n>0?`Weight exceeds the ${t.name} load limit of ${r.toFixed(2)} kg.`:null,extras:c}}function Xe(e,t){const a=t.find(n=>n.id===e.serviceId),s=a?.includes??[],r=[{key:"received",label:"Received"}];return s.includes("Wash")&&r.push({key:"wash",label:"Wash"}),e.extras.length&&r.push({key:"extras",label:"Extra services"}),(s.includes("Dry")||(a?.dryingMinutes??0)>0)&&r.push({key:"dry",label:"Dry"}),s.includes("Fold")&&r.push({key:"fold",label:"Fold"}),r.push({key:"ready",label:"Ready"},{key:"claimed",label:"Claimed"}),r}function xt(e){return e.includes("claimed")?"claimed":e.includes("ready")?"ready":e.includes("dry")?"drying":e.includes("extras")||e.includes("wash")?"washing":"received"}async function he(e){return A.isNativePlatform()?((await(await R()).query("SELECT o.*, s.name as foldedByName FROM orders o LEFT JOIN staff s ON s.id = o.foldedBy WHERE o.branch = ? ORDER BY o.id DESC",[e])).values??[]).map(s=>Et(s)):L("orders",Q).filter(s=>s.branch===e).map(s=>({...s,balance:Number((s.totalAmount-s.paidAmount).toFixed(2))}))}async function Ot(e){const[t,a]=await Promise.all([Ae(),Ke()]),s=t.find(C=>C.id===e.serviceId),r=a.find(C=>C.id===e.itemCategoryId);if(!s||!r)throw new Error("Service or item category is missing.");const n=t.filter(C=>e.addonIds.includes(C.id)),o=Ee(s,r,e.weightKg,n);if(o.extraKg>0)throw new Error(o.warning??"Weight exceeds the allowed limit.");const i=await Ct({id:e.customerId||void 0,name:e.customerName,phone:e.customerPhone??null}),c=Math.max(0,e.paidAmount),l=Math.min(o.totalAmount,c),g={ticket:await Pt(),customerId:i.id,customer:i.name,phone:i.phone,serviceId:s.id,service:s.name,itemCategoryId:r.id,itemCategory:r.name,branch:e.branch,status:"received",workflowCompleted:["received"],weightKg:e.weightKg,price:o.price,additionalCharge:o.additionalCharge,extraServiceAmount:o.extraServiceAmount,totalAmount:o.totalAmount,paidAmount:l,balance:Number((o.totalAmount-l).toFixed(2)),extras:o.extras,notes:[e.notes,o.warning].filter(Boolean).join(`
`)||null,foldedBy:null,foldedByName:null,dueAt:new Date(Date.now()+s.turnaroundHours*60*60*1e3).toISOString(),createdAt:z()};if(!A.isNativePlatform()){const C=L("orders",Q),w={...g,id:B(C)};return C.unshift(w),T("orders",C),c>0&&await He(w.id,{amount:c,method:e.paymentMethod,reference:e.paymentReference??null}),w}const h=await R(),u=await h.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM orders"),P={...g,id:Number((u.values?.[0]).id)};return await Be(h,P),c>0&&await h.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[P.id,c,e.paymentMethod,e.paymentReference??null,z(),e.branch]),P}async function Pt(){const e=`LB${bt()}`,t=await fe(),s=(await he(t)).filter(n=>n.ticket.startsWith(e)).sort((n,o)=>o.ticket.localeCompare(n.ticket))[0],r=s?Number(s.ticket.slice(-3))+1:1;return`${e}-${String(r).padStart(3,"0")}`}async function Dt(e,t){const a=await fe(),[s,r]=await Promise.all([he(a),Ae()]),n=s.find(l=>l.id===e);if(!n)return;const i=Xe(n,r).map(l=>l.key).find(l=>!n.workflowCompleted.includes(l));if(!i)return;if(n.workflowCompleted=[...n.workflowCompleted,i],n.status=xt(n.workflowCompleted),i==="fold"&&t&&(n.foldedBy=t),!A.isNativePlatform()){const l=L("orders",Q),g=l.find(h=>h.id===n.id);g&&Object.assign(g,n),T("orders",l);return}await(await R()).run("UPDATE orders SET workflowCompleted = ?, status = ?, foldedBy = ? WHERE id = ?",[JSON.stringify(n.workflowCompleted),n.status,n.foldedBy,n.id])}async function He(e,t){const a=await fe();if(!(await he(a)).find(i=>i.id===e))return;const n=Math.max(0,t.amount);if(n<=0)return;if(!A.isNativePlatform()){const i=L("payments",ce);i.unshift({id:B(i),orderId:e,amount:n,method:t.method,reference:t.reference??null,receivedAt:z(),branch:a}),T("payments",i);const c=L("orders",Q),l=c.find(g=>g.id===e);l&&(l.paidAmount=Math.min(l.totalAmount,Number((l.paidAmount+n).toFixed(2)))),T("orders",c);return}const o=await R();await o.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[e,n,t.method,t.reference??null,z(),a]),await o.run("UPDATE orders SET paidAmount = MIN(totalAmount, paidAmount + ?) WHERE id = ?",[n,e])}async function It(e){return A.isNativePlatform()?(await(await R()).query("SELECT id, orderId, amount, method, reference, receivedAt, branch FROM payments  ORDER BY receivedAt DESC",[])).values??[]:L("payments",ce).filter(s=>!0)}async function qt(){return A.isNativePlatform()?(await(await R()).query("SELECT id, orderTicket, staffName, foldCount, rate, total, createdAt FROM fold_logs ORDER BY id DESC")).values??[]:L("fold_logs",[])}async function kt(e){const t=Number((e.foldCount*e.rate).toFixed(2));if(!A.isNativePlatform()){const s=L("fold_logs",[]);s.unshift({id:Date.now(),...e,total:t,createdAt:z()}),T("fold_logs",s);return}await(await R()).run("INSERT INTO fold_logs (orderTicket, staffName, foldCount, rate, total, createdAt) VALUES (?, ?, ?, ?, ?, ?)",[e.orderTicket,e.staffName,e.foldCount,e.rate,t,z()])}async function Ut(){return A.isNativePlatform()?(await(await R()).query("SELECT id, expenseDate, number, name, category, description, amount FROM disbursement_expenses ORDER BY expenseDate DESC, id DESC")).values??[]:L("expenses",le)}async function Ft(e){if(!A.isNativePlatform()){const r=L("expenses",le),n=B(r);r.unshift({id:n,expenseDate:e.expenseDate,number:`DISB-${String(n).padStart(2,"0")}`,name:e.name,category:e.category,description:e.description||null,amount:e.amount}),T("expenses",r);return}const t=await R(),a=await t.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM disbursement_expenses"),s=Number((a.values?.[0]).id);await t.run("INSERT INTO disbursement_expenses (expenseDate, number, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?)",[e.expenseDate,`DISB-${String(s).padStart(2,"0")}`,e.name,e.category,e.description||null,e.amount])}async function Mt(){return A.isNativePlatform()?(await(await R()).query('SELECT id, saleDate, COALESCE(saleNumber, "") as saleNumber, cashAmount, gcashAmount, totalAmount, notes FROM daily_sales ORDER BY saleDate DESC, id DESC')).values??[]:L("sales",de)}async function Bt(e){const t=Number((e.cashAmount+e.gcashAmount).toFixed(2));if(!A.isNativePlatform()){const n=L("sales",de),o=n.find(i=>i.saleDate===e.saleDate);if(o)Object.assign(o,{cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null});else{const i=B(n);n.unshift({id:i,saleDate:e.saleDate,saleNumber:`SALE-${String(i).padStart(2,"0")}`,cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null})}T("sales",n);return}const a=await R(),r=(await a.query("SELECT id, saleNumber FROM daily_sales WHERE saleDate = ?",[e.saleDate])).values?.[0];if(r)await a.run("UPDATE daily_sales SET cashAmount = ?, gcashAmount = ?, totalAmount = ?, notes = ? WHERE id = ?",[e.cashAmount,e.gcashAmount,t,e.notes||null,r.id]);else{const n=await a.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM daily_sales"),o=Number((n.values?.[0]).id);await a.run("INSERT INTO daily_sales (saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?)",[e.saleDate,`SALE-${String(o).padStart(2,"0")}`,e.cashAmount,e.gcashAmount,t,e.notes||null])}}async function Ge(e){return A.isNativePlatform()?(await(await R()).query("SELECT id, machineName, machineType, status, branch FROM machines WHERE branch = ? ORDER BY machineType, machineName",[e])).values??[]:L("machines",X).filter(s=>s.branch===e)}async function jt(e){if(!A.isNativePlatform()){const a=L("machines",X);a.unshift({id:B(a),...e}),T("machines",a);return}await(await R()).run("INSERT INTO machines (machineName, machineType, status, branch) VALUES (?, ?, ?, ?)",[e.machineName,e.machineType,e.status,e.branch])}async function _t(e,t){if(!A.isNativePlatform()){const s=L("machines",X),r=s.find(n=>n.id===e);r&&(r.status=t,T("machines",s));return}await(await R()).run("UPDATE machines SET status = ? WHERE id = ?",[t,e])}async function Wt(e){return A.isNativePlatform()?((await(await R()).query("SELECT id, date, machineIds, machineNames, cleaningStatus, notes, branch FROM subcleanings WHERE branch = ? ORDER BY date DESC, id DESC",[e])).values??[]).map(s=>({...s,machineIds:H(s.machineIds,[])})):L("subcleanings",[]).filter(s=>s.branch===e)}async function Kt(e){const a=(await Ge(e.branch)).filter(n=>e.machineIds.includes(n.id)).map(n=>n.machineName).join(", ");if(!A.isNativePlatform()){const n=L("subcleanings",[]);n.unshift({id:B(n),date:e.date,machineIds:e.machineIds,machineNames:a,cleaningStatus:e.cleaningStatus,notes:e.notes||null,branch:e.branch}),T("subcleanings",n);const o=L("machines",X);o.forEach(i=>{e.machineIds.includes(i.id)&&(i.status=e.cleaningStatus==="completed"?"available":"under_cleaning")}),T("machines",o);return}const s=await R();await s.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, notes, branch) VALUES (?, ?, ?, ?, ?, ?)",[e.date,JSON.stringify(e.machineIds),a,e.cleaningStatus,e.notes||null,e.branch]);const r=e.cleaningStatus==="completed"?"available":"under_cleaning";for(const n of e.machineIds)await s.run("UPDATE machines SET status = ? WHERE id = ?",[r,n])}async function Xt(e,t){if(!A.isNativePlatform()){const o=L("machines",X),i=o.find(g=>g.id===e);i&&(i.status="available"),T("machines",o);const c=L("subcleanings",[]),l=we();c.unshift({id:B(c),date:l,machineIds:[e],machineNames:i?.machineName??"",cleaningStatus:"completed",notes:null,branch:t}),T("subcleanings",c);return}const a=await R(),r=(await a.query("SELECT machineName FROM machines WHERE id = ?",[e])).values?.[0]?.machineName??"";await a.run("UPDATE machines SET status = ? WHERE id = ?",["available",e]);const n=we();await a.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, notes, branch) VALUES (?, ?, ?, ?, ?, ?)",[n,JSON.stringify([e]),r,"completed",null,t])}const Le=document.querySelector("#app");if(!Le)throw new Error("App root not found");let se;const Ce={dashboard:"Dashboard",orders:"POS / Orders",customers:"Customers",pricing:"Pricing Services",disbursements:"Daily Report",reports:"Reports",inventory:"Inventory",maintenance:"Maintenance",staff:"Staff",settings:"Settings"},f={tab:"dashboard",receiptOrderId:0,currentUser:null,loginError:"",sidebarOpen:!1,dailyReportTab:"expenses",maintenanceTab:"cleaning"},Ht=["Wash","Dry","Fold","Detergent","Fabcon","Zonrox"],ee="laba101-mobile-session";function O(e){return new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(e||0)}function d(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function pe(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}function Ye(e,t){const a=new Map;return e.filter(s=>s.workflowCompleted.includes("fold")&&s.foldedByName).forEach(s=>{const r=s.foldedByName,n=a.get(r)??{staffName:r,folds:0,rate:t,total:0};n.folds+=1,n.total=Number((n.folds*n.rate).toFixed(2)),a.set(r,n)}),Array.from(a.values())}function me(e=new Date){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${s}`}function _(){return me()}function re(e){return me(new Date(e))}function Gt(e){return new Intl.DateTimeFormat("en-PH",{dateStyle:"medium",timeStyle:"short"}).format(new Date(e))}function Ve(e=new Date){return{date:new Intl.DateTimeFormat("en-PH",{weekday:"long",month:"long",day:"numeric",year:"numeric"}).format(e),time:new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",second:"2-digit",hour12:!0}).format(e)}}function Yt(e,t){return`<button class="nav-link ${t?"is-active":""}" data-tab="${e}" type="button">
    <span class="nav-icon">${Vt(e)}</span>
    <span>${Ce[e]}</span>
  </button>`}function q(e,t){return`<div class="section-head"><div><h2>${d(e)}</h2><p class="meta">${d(t)}</p></div></div>`}function Fe(){return Ce[f.tab]??"Dashboard"}function ye(e){return(e?.name??"Laba101").trim().slice(0,1).toUpperCase()}function Vt(e){return{dashboard:"DB",orders:"PO",customers:"CU",pricing:"PS",disbursements:"DR",reports:"RP",inventory:"IN",maintenance:"MT",staff:"ST",settings:"SE"}[e]}async function Jt(){const e=await fe(),t=await Nt(e),a=await _e(),s=await Lt(),r=await Ae(),n=await Rt(),o=await Ke(),i=await he(e),c=await It(),l=await qt(),g=await Ut(),h=await Mt(),u=await Ge(e),P=await Wt(e),C=await Tt(),w=await je("report_email");return{branch:e,staff:t,allStaff:a,customers:s,services:r,allServices:n,categories:o,orders:i,payments:c,foldLogs:l,expenses:g,sales:h,machines:u,subcleanings:P,foldRate:C,reportEmail:w??""}}async function x(){if(!f.currentUser){Qt(),ma();return}const e=await Jt(),t=e.orders.filter(n=>n.status!=="claimed").length,a=e.orders.filter(n=>n.status==="ready").length;e.orders.reduce((n,o)=>n+o.paidAmount,0);const s=e.orders.filter(n=>re(n.createdAt)===_()).reduce((n,o)=>n+o.paidAmount,0);e.sales.reduce((n,o)=>n+o.totalAmount,0);const r=Ye(e.orders,e.foldRate).reduce((n,o)=>n+o.total,0);e.expenses.reduce((n,o)=>n+o.amount,0)+r,Le.innerHTML=`
    <div class="app-frame">
      <header class="topbar">
        <div class="topbar-left">
          <img src="/laba101-logo.svg" alt="Laba101" class="topbar-logo" />
          <div>
            <p class="eyebrow">Offline mobile system</p>
            <h1>${d(Fe())}</h1>
          </div>
        </div>
        <div class="topbar-actions">
          <div class="branch-pill"><span>Branch</span><strong>${d(e.branch)}</strong></div>
          <button class="icon-button" type="button" aria-label="Notifications">!</button>
          <button class="profile-pill" type="button">
            <span>${ye(f.currentUser)}</span>
            <strong>${d(f.currentUser.name)}</strong>
          </button>
        </div>
      </header>

      <button class="sidebar-backdrop ${f.sidebarOpen?"is-open":""}" id="sidebar-backdrop" type="button" aria-label="Close navigation"></button>

      <aside class="sidebar ${f.sidebarOpen?"is-open":""}">
        <div class="sidebar-mobile-head">
          <img src="/laba101-logo.svg" alt="Laba101" />
          <button class="sidebar-close" id="sidebar-close-button" type="button" aria-label="Close navigation">X</button>
        </div>
        <nav>${Je().map(n=>Yt(n,f.tab===n)).join("")}</nav>
        <div class="sidebar-fill">
          <div class="sidebar-branch-badge">
            <span>Active Branch</span>
            <strong>${d(e.branch)}</strong>
          </div>
          <p class="sidebar-app-name">Laba101 POS</p>
        </div>
        <div class="sidebar-user">
          <span class="avatar">${ye(f.currentUser)}</span>
          <div>
            <strong>${d(f.currentUser.name)}</strong>
            <small>${d(f.currentUser.email)} / ${d(f.currentUser.role)}</small>
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
            <h2>${d(Fe())}</h2>
          </div>
          <button class="mobile-avatar" type="button">${ye(f.currentUser)}</button>
        </header>

        ${f.tab==="dashboard"?Zt({openQueue:t,readyPickup:a,customerCount:e.customers.length,paidToday:s,orders:e.orders}):""}
        ${f.tab==="orders"?ea(e.orders,e.customers,e.services,e.categories,e.staff,e.payments,e.branch):""}
        ${f.tab==="customers"?sa(e.customers,e.orders):""}
        ${f.tab==="pricing"?na(e.allServices,e.categories):""}
        ${f.tab==="disbursements"?ra(e.expenses,e.sales):""}
        ${f.tab==="reports"?ia(e.orders,e.sales,e.expenses,e.foldRate):""}
        ${f.tab==="inventory"?oa(e.services,e.categories):""}
        ${f.tab==="maintenance"?ca(e.machines,e.subcleanings,e.branch):""}
        ${f.tab==="staff"?la(e.allStaff,e.branch):""}
        ${f.tab==="settings"?da(e.branch,e.foldRate,e.reportEmail):""}
      </main>
    </div>
  `,ua(),fa(e),ha(e.allServices),pa(),ga(e.orders,e.sales,e.expenses,e.foldRate),ya(),ba(e.allStaff),wa(),va()}function Je(){return f.currentUser?.role==="admin"?Object.keys(Ce).filter(e=>e!=="inventory"):["orders","disbursements","reports","maintenance"]}function Qt(){Le.innerHTML=`
    <main class="login-page">

      <section class="login-panel-wrap">
        <article class="login-panel">
          <header>
            <div class="login-mark"><img src="/laba101-logo.svg" alt="Laba101" /></div>
            <h2>Welcome back</h2>
            <p>Sign in to continue managing today&apos;s laundry operations.</p>
          </header>
          ${f.loginError?`<div class="alert">${d(f.loginError)}</div>`:""}
          <form id="login-form" class="form">
            <label>Email address<input name="email" type="email" autocomplete="username" placeholder="admin@laba101.test" required /></label>
            <label>Password<input name="password" type="password" autocomplete="current-password" placeholder="Enter password" required /></label>
            <label class="remember"><input name="remember" type="checkbox" value="1" /> Remember me on this device</label>
            <button class="primary" id="login-button" type="submit">Sign in</button>
          </form>
          <aside class="demo-box">
            <p>Demo accounts</p>
            <button type="button" data-fill-email="admin@laba101.test" data-fill-password="password"><strong>Admin</strong><span>admin@laba101.test</span></button>
            <button type="button" data-fill-email="staff@laba101.test" data-fill-password="password"><strong>Staff</strong><span>staff@laba101.test</span></button>
          </aside>
        </article>
      </section>
    </main>
  `}function zt(){document.querySelectorAll("[data-fill-email]").forEach(e=>{e.addEventListener("click",()=>{const t=document.querySelector('input[name="email"]'),a=document.querySelector('input[name="password"]');t&&(t.value=e.dataset.fillEmail??""),a&&(a.value=e.dataset.fillPassword??"")})})}function Zt(e){const t=e.orders.slice(0,3),a=new Date,s=Ve(a),r=Array.from({length:7},(n,o)=>{const i=new Date(a);return i.setDate(a.getDate()-(6-o)),new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric"}).format(i)});return`
    <section class="panel dashboard-clock">
      <div>
        <p class="eyebrow">Device local time</p>
        <h2 data-dashboard-time>${d(s.time)}</h2>
      </div>
      <strong data-dashboard-date>${d(s.date)}</strong>
    </section>
    <section class="grid stats">
      <div class="panel stat"><div class="card-label">Active orders</div><div class="value">${e.openQueue}</div><div class="helper">Open queue</div></div>
      <div class="panel stat"><div class="card-label">Ready pickup</div><div class="value">${e.readyPickup}</div><div class="helper">Awaiting claim</div></div>
      <div class="panel stat"><div class="card-label">Paid today</div><div class="value">${O(e.paidToday)}</div><div class="helper">Collected cash</div></div>
      <div class="panel stat"><div class="card-label">Customers</div><div class="value">${e.customerCount}</div><div class="helper">Customer records</div></div>
    </section>
    <section class="dashboard-main">
      <article class="panel revenue-panel">
        ${q("Revenue overview","Paid amount for the last 7 days.")}
        <div class="mini-chart">
          <span></span><span></span><span></span><span></span><span></span><span></span><span class="is-today"></span>
        </div>
        <div class="chart-days">${r.map(n=>`<span>${d(n)}</span>`).join("")}</div>
      </article>
      <article class="panel recent-panel">
        ${q("Recent activities","Latest tickets and workflow movements.")}
        <div class="activity-list">
          ${t.map(n=>`<div><strong>${d(n.ticket)} moved to ${d(n.status)}</strong><span>${d(n.customer)} - just now</span></div>`).join("")||'<p class="helper">No recent activity.</p>'}
        </div>
      </article>
    </section>
  `}function ea(e,t,a,s,r,n,o){const i=a.filter(u=>u.serviceType==="order"&&u.isActive),c=a.filter(u=>u.serviceType==="addon"&&u.isActive),l=f.receiptOrderId?e.find(u=>u.id===f.receiptOrderId):null,g=new Set(e.map(u=>u.customerId)),h=t.filter(u=>g.has(u.id));return`
    <section class="grid content full">
      <article class="panel">
        ${q("New POS order","Customer, service, weight, add-ons, and initial payment")}
        <form id="order-form" class="form">
          <div class="form-row">
            <label>Existing customer (${d(o)})
              <select name="customerId">
                <option value="">-- New customer --</option>
                ${h.map(u=>`<option value="${u.id}" data-name="${d(u.name)}" data-phone="${d(u.phone??"")}">${d(u.name)} ${u.phone?`- ${d(u.phone)}`:""}</option>`).join("")}
              </select>
            </label>
            <label>Customer name<input name="customerName" required placeholder="Customer name" /></label>
          </div>
          <div class="form-row">
            <label>Phone<input name="customerPhone" placeholder="09..." /></label>
          </div>

          <label>Service
            <select name="serviceId" required>
              ${i.map(u=>`<option value="${u.id}">${d(u.name)} - ${O(u.price)}</option>`).join("")}
            </select>
          </label>
          <label>Item category
            <select name="itemCategoryId" required>
              ${s.map(u=>`<option value="${u.id}">${d(u.name)} max ${u.maxKg}kg</option>`).join("")}
            </select>
            <span class="field-hint" data-category-weight></span>
          </label>
          <label>Weight (KG)<input name="weightKg" type="number" min="0.25" max="200" step="0.01" value="1" required /></label>

          <fieldset class="check-grid">
            <legend>Extra services</legend>
            ${c.length?c.map(u=>`<label class="check"><input type="checkbox" name="addonIds" value="${u.id}" /> ${d(pe(u.name))} ${O(u.price)}</label>`).join(""):'<p class="helper">No extra services configured.</p>'}
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

      <article class="panel">
        ${q("Order queue","Workflow, payment, and receipts")}
        <div class="table orders-table">
          <div class="table-head"><div>Ticket</div><div>Customer</div><div>Total</div><div>Status</div><div>Actions</div></div>
          ${e.map(u=>ta(u,r,a)).join("")||'<div class="helper">No orders yet.</div>'}
        </div>
      </article>
      ${l?aa(l,n.filter(u=>u.orderId===l.id)):""}
    </section>
  `}function ta(e,t,a){const s=Xe(e,a),r=s.find(i=>!e.workflowCompleted.includes(i.key)),n=r?.key==="fold",o=r?.key==="extras"&&e.extras.length>0;return`
    <div class="table-row">
      <div><strong>${d(e.ticket)}</strong><div class="small">${d(e.service)} / ${d(e.itemCategory)}</div></div>
      <div>${d(e.customer)}<div class="small">${d(e.phone??"")}</div></div>
      <div class="amount-cell"><strong>${O(e.totalAmount)}</strong><div class="small">Paid ${O(e.paidAmount)} / Bal ${O(e.balance)}</div></div>
      <div>
        <div class="${e.status==="ready"||e.status==="claimed"?"ok":"warn"}">${d(e.status)}</div>
        <div class="workflow-progress">
          ${s.map(i=>`<span class="${e.workflowCompleted.includes(i.key)?"is-done":r?.key===i.key?"is-next":""}">${d(i.label)}</span>`).join("")}
        </div>
      </div>
      <div class="row-actions">
        ${r?`<form class="inline-form advance-form" data-order-id="${e.id}">
          ${o?`<div class="extra-confirmation">Confirm extra service: <strong>${e.extras.map(i=>d(pe(i.name))).join(", ")}</strong></div>`:""}
          ${n?`<select name="assignedStaffId" required>
            <option value="">Staff</option>
            ${t.map(i=>`<option value="${i.id}">${d(i.name)}</option>`).join("")}
          </select>`:""}
          <button class="secondary" type="submit">Next: ${d(r.label)}</button>
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
    </div>
  `}function aa(e,t){const a=t.reduce((r,n)=>r+Number(n.amount),0),s=Math.max(0,Number((a-e.totalAmount).toFixed(2)));return`
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="receipt-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-print-receipt>Print</button>
          <button class="secondary" type="button" data-close-receipt>Close</button>
        </div>
        <div class="receipt" id="receipt-print-area">
          <div class="receipt-head">
            <h3 id="receipt-title">Laba101</h3>
            <p>${d(e.ticket)}<br>${d(Gt(e.createdAt))}</p>
          </div>
          <div class="receipt-customer">
            <strong>${d(e.customer)}</strong>
            <span>${d(e.phone??"No phone")}</span>
          </div>
          <div class="summary-list receipt-lines">
            <div><span>Service</span><strong>${d(e.service)}</strong></div>
            <div><span>Category</span><strong>${d(e.itemCategory)}</strong></div>
            <div><span>Weight</span><strong>${e.weightKg} kg</strong></div>
            ${e.extras.length?`<div><span>Extra services</span><strong>${e.extras.map(r=>d(pe(r.name))).join(", ")}</strong></div>`:""}
            <div><span>Total</span><strong>${O(e.totalAmount)}</strong></div>
            <div><span>Tendered</span><strong>${O(a)}</strong></div>
            <div><span>Paid</span><strong>${O(e.paidAmount)}</strong></div>
            <div><span>Change</span><strong>${O(s)}</strong></div>
            <div><span>Balance</span><strong>${O(e.balance)}</strong></div>
          </div>
          <h3>Payments</h3>
          <div class="receipt-payments">
            ${t.map(r=>`<div><span>${d(r.method.toUpperCase())}</span><strong>${O(r.amount)}</strong>${r.reference?`<small>Ref ${d(r.reference)}</small>`:""}</div>`).join("")||'<p class="helper">No payments yet.</p>'}
          </div>
        </div>
      </div>
    </div>
  `}function sa(e,t){return`
    <section class="grid content full">
      <article class="panel">
        ${q("Customer Management","Customer records from local offline storage")}
        <div class="summary-list">
          <div><span>Total customers</span><strong>${e.length}</strong></div>
          <div><span>Orders linked</span><strong>${t.length}</strong></div>
        </div>
      </article>
      <article class="panel">
        ${q("Customer list","Names, phones, and addresses")}
        <div class="table">
          <div class="table-head"><div>Name</div><div>Phone</div><div>Address</div><div></div><div></div></div>
          ${e.map(a=>`<div class="table-row"><div><strong>${d(a.name)}</strong></div><div>${d(a.phone??"No phone")}</div><div>${d(a.address??"No address")}</div><div></div><div></div></div>`).join("")||'<div class="helper">No customers yet.</div>'}
        </div>
      </article>
    </section>
  `}function na(e,t){return`
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
            ${Ht.map(a=>`<label class="check"><input type="checkbox" name="includes" value="${a}" /> ${a}</label>`).join("")}
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
          <label>Additional fee per extra KG<input name="additionalFee" type="number" min="0" step="0.01" value="0" /></label>
          <button class="primary" type="submit">Save category</button>
        </form>
      </article>
      <article class="panel span-2">
        <div class="table">
          <div class="table-head"><div>Name</div><div>Type</div><div>Price</div><div>Includes</div><div>Active</div><div>Actions</div></div>
          ${e.map(a=>`<div class="table-row"><div>${d(a.name)}</div><div>${d(a.serviceType)}</div><div>${O(a.price)}</div><div>${d(a.includes.join(", "))}</div><div>${a.isActive?"Yes":"No"}</div>
          <div class="row-actions">
            <button class="secondary edit-service-btn" data-id="${a.id}">Edit</button>
            ${a.isActive?`<button class="secondary deactivate-service-btn" data-id="${a.id}">Deactivate</button>`:`<button class="secondary activate-service-btn" data-id="${a.id}">Activate</button>`}
          </div></div>`).join("")}
        </div>
        <div class="section-divider"></div>
        <div class="table">
          <div class="table-head"><div>Name</div><div>Max KG</div><div>Extra fee</div><div></div><div></div></div>
          ${t.map(a=>`<div class="table-row"><div>${d(a.name)}</div><div>${a.maxKg}</div><div>${O(a.additionalFee)}</div><div></div><div></div></div>`).join("")}
        </div>
      </article>
    </section>
  `}function ra(e,t){const a=_(),s=a.slice(0,7),r=e.filter(c=>c.expenseDate===a).reduce((c,l)=>c+l.amount,0),n=e.filter(c=>c.expenseDate.startsWith(s)).reduce((c,l)=>c+l.amount,0),o=t.filter(c=>c.saleDate===a).reduce((c,l)=>c+l.totalAmount,0),i=t.filter(c=>c.saleDate.startsWith(s)).reduce((c,l)=>c+l.totalAmount,0);return`
    <section class="page-head">
      <div>
        <h2>Daily Report</h2>
      </div>
      <div class="segmented">
        <button class="${f.dailyReportTab==="expenses"?"is-active":""}" data-report-tab="expenses" type="button">Disbursements</button>
        <button class="${f.dailyReportTab==="sales"?"is-active":""}" data-report-tab="sales" type="button">Daily Sales</button>
      </div>
    </section>
    <section class="grid stats compact report-stats">
      <div class="panel stat"><div class="card-label">Daily disbursement</div><div class="value">${O(r)}</div></div>
      <div class="panel stat"><div class="card-label">Monthly disbursement</div><div class="value">${O(n)}</div></div>
      <div class="panel stat"><div class="card-label">Today sales input</div><div class="value">${O(o)}</div></div>
      <div class="panel stat"><div class="card-label">Month sales input</div><div class="value">${O(i)}</div></div>
    </section>
    ${f.dailyReportTab==="expenses"?`
    <section class="grid content full">
      <article class="panel">
        ${q("Input disbursement","Supplies, utilities, and cash disbursements")}
        <form id="expense-form" class="form">
          <div class="form-row"><label>Date<input name="expenseDate" type="date" value="${_()}" required /></label><label>Amount<input name="amount" type="number" min="0" step="0.01" required /></label></div>
          <div class="form-row"><label>Name<input name="name" required /></label><label>Category<input name="category" required /></label></div>
          <label>Description<textarea name="description"></textarea></label>
          <button class="primary" type="submit">Save expense</button>
        </form>
      </article>
      <article class="panel">
        ${q("Disbursement list","Expenses only")}
        <div class="table">
          <div class="table-head"><div>Date</div><div>No.</div><div>Name</div><div>Category</div><div>Amount</div></div>
          ${e.map(c=>`<div class="table-row"><div>${d(c.expenseDate)}</div><div>${d(c.number)}</div><div>${d(c.name)}</div><div>${d(c.category)}</div><div>${O(c.amount)}</div></div>`).join("")||'<div class="helper">No expenses yet.</div>'}
        </div>
      </article>
    </section>
    `:`
    <section class="grid content full">
      <article class="panel">
        ${q("Input total sale","Manual cash and GCash totals")}
        <form id="sales-form" class="form">
          <label>Date<input name="saleDate" type="date" value="${_()}" required /></label>
          <label>Cash sales<input name="cashAmount" type="number" min="0" step="0.01" value="0" /></label>
          <label>GCash sales<input name="gcashAmount" type="number" min="0" step="0.01" value="0" /></label>
          <label>Notes<textarea name="notes" placeholder="Optional"></textarea></label>
          <button class="primary" type="submit">Save daily sale</button>
        </form>
      </article>
      <article class="panel">
        ${q("Daily sales history","Cash, GCash, total sale, notes, and updates")}
        <div class="table wide-table">
          <div class="table-head"><div>Sales #</div><div>Date</div><div>Cash</div><div>GCash</div><div>Total sale</div></div>
          ${t.map(c=>`<div class="table-row"><div>${d(c.saleNumber)}</div><div>${d(c.saleDate)}</div><div>${O(c.cashAmount)}</div><div>${O(c.gcashAmount)}</div><div><strong>${O(c.totalAmount)}</strong></div></div>`).join("")||'<div class="helper">No daily sales totals yet.</div>'}
        </div>
      </article>
    </section>
    `}
  `}function ia(e,t,a,s,r,n,o){return`
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
            <label>From<input name="dateFrom" data-date-from type="date" value="${_()}" /></label>
            <label>To<input name="dateTo" data-date-to type="date" value="${_()}" /></label>
          </div>
        </div>
        <div>
          <h3>Reports to include</h3>
          <div class="report-checks">
            <label><input type="checkbox" name="reportType" value="sales" checked /> Sales reports</label>
            <label><input type="checkbox" name="reportType" value="disbursement" checked /> Disbursement reports</label>
            <label><input type="checkbox" name="reportType" value="summary" checked /> Summary</label>
          </div>
        </div>
      </div>
      <div class="section-divider"></div>
      <div class="report-actions">
        <p>Summary computes sales minus disbursement for the selected dates.</p>
        <div>
          <button class="secondary" id="email-report" type="button">Send File</button>
        </div>
      </div>
    </section>
  `}function oa(e,t){return`
    <section class="grid content full">
      <article class="panel">
        ${q("Inventory","Service catalog and item load limits")}
        <div class="summary-list">
          <div><span>Active services</span><strong>${e.filter(a=>a.isActive).length}</strong></div>
          <div><span>Item categories</span><strong>${t.length}</strong></div>
        </div>
      </article>
      <article class="panel">
        ${q("Service inventory","Current sellable laundry services")}
        <div class="table">
          <div class="table-head"><div>Name</div><div>Category</div><div>Price</div><div>Max KG</div><div>Status</div></div>
          ${e.map(a=>`<div class="table-row"><div><strong>${d(a.name)}</strong></div><div>${d(a.category)}</div><div>${O(a.price)}</div><div>${a.maxKg} kg</div><div>${a.isActive?"Active":"Inactive"}</div></div>`).join("")}
        </div>
      </article>
    </section>
  `}function ca(e,t,a){const s=e.filter(n=>n.status!=="under_cleaning"),r=e.filter(n=>n.status==="under_cleaning");return`
    <section class="page-head">
      <div>
        <h2>Maintenance & Cleaning</h2>
        <p class="meta">Manage machine subcleaning and maintenance records.</p>
      </div>
      <div class="segmented">
        <button class="${f.maintenanceTab==="cleaning"?"is-active":""}" data-maintenance-tab="cleaning" type="button">Subcleaning</button>
        <button class="${f.maintenanceTab==="machines"?"is-active":""}" data-maintenance-tab="machines" type="button">Machine Management</button>
      </div>
    </section>
    ${f.maintenanceTab==="cleaning"?`
    <section class="grid content full">
      <article class="panel">
        ${q("Available Machines","Select machines to start cleaning.")}
        <form id="subcleaning-form" class="form">
          <input type="hidden" name="date" value="${_()}" />
          <fieldset class="machine-list">
            ${s.map(n=>`<label class="machine-card"><input type="checkbox" name="machineIds" value="${n.id}" /><span><strong>${d(n.machineName)}</strong><small>${d(n.machineType)}</small></span><em></em></label>`).join("")||'<p class="helper">All machines are currently being cleaned.</p>'}
          </fieldset>
          <input type="hidden" name="cleaningStatus" value="in_progress" />
          <label>Notes <textarea name="notes" placeholder="e.g. Deep clean filters"></textarea></label>
          <input type="hidden" name="branch" value="${d(a)}" />
          <button class="primary" type="submit">Start Cleaning</button>
        </form>
      </article>
      <article class="panel warning-panel">
        ${q("Under Cleaning","Machines currently being serviced.")}
        <div class="machine-stack">
          ${r.length?r.map(n=>`
            <div class="machine-status">
              <span><strong>${d(n.machineName)}</strong><small>${d(n.machineType)}</small></span>
              <b>In progress</b>
              <button class="secondary complete-cleaning-btn" type="button" data-machine-id="${n.id}" data-branch="${d(a)}">Mark Complete</button>
            </div>`).join(""):'<p class="helper">No machines under cleaning right now.</p>'}
        </div>
      </article>
      <article class="panel span-2">
        ${q("Daily Cleaning Checklist","Track which machines have been cleaned today.")}
        <div class="table">
          <div class="table-head"><div>Machine</div><div>Type</div><div>Status</div><div>Notes</div><div>Date</div></div>
          ${e.map(n=>{const o=t.find(i=>i.machineIds.includes(n.id)&&i.date===_());return`<div class="table-row"><div><strong>${d(n.machineName)}</strong></div><div>${d(n.machineType)}</div><div>${o?d(o.cleaningStatus.replace("_"," ")):"Not Cleaned"}</div><div>${d(o?.notes??"-")}</div><div>${_()}</div></div>`}).join("")}
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
          <input type="hidden" name="branch" value="${d(a)}" />
          <button class="primary" type="submit">Add machine</button>
        </form>
      </article>
      <article class="panel">
        ${q("Machines","Washer and dryer status")}
        <div class="table">
          <div class="table-head"><div>Name</div><div>Type</div><div>Status</div><div>Branch</div><div>Actions</div></div>
          ${e.map(n=>`<div class="table-row"><div><strong>${d(n.machineName)}</strong></div><div>${d(n.machineType)}</div><div>${d(n.status.replace("_"," "))}</div><div>${d(n.branch)}</div>
          <div class="row-actions">
            ${n.status!=="inactive"?`<button class="secondary deactivate-machine-btn" data-id="${n.id}">Deactivate</button>`:`<button class="secondary activate-machine-btn" data-id="${n.id}">Activate</button>`}
          </div></div>`).join("")||'<div class="helper">No machines found.</div>'}
        </div>
      </article>
    </section>
    `}
  `}function la(e,t){return`
    <section class="grid">
      <div class="page-head">
        <div>
          <p class="eyebrow">Team Management</p>
          <h2>Staff Overview</h2>
        </div>
        <button class="primary" id="open-add-staff-modal" type="button">+ Add staff</button>
      </div>

      <article class="panel">
        ${q("Staff list","Branch: "+d(t))}
        <div class="table">
          <div class="table-head staff-table-head"><div>Name</div><div>Email</div><div>Role</div><div>Branch</div><div>Status</div><div>Actions</div></div>
          ${e.length?e.map(a=>`<div class="table-row staff-table-row"><div><strong>${d(a.name)}</strong></div><div>${d(a.email)}</div><div class="small">${d(a.role)}</div><div>${d(a.branch)}</div><div>${a.isActive!==0?"Active":"Inactive"}</div>
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
  `}function da(e,t,a){return`
    <section class="grid content full">
      <article class="panel">
        ${q("Settings","Device-local configuration")}
        <form id="settings-form" class="form">
          <label>Current branch<select name="branch">
            ${["Main Store","Mintal Branch","Gensan Branch"].map(s=>`<option value="${s}" ${s===e?"selected":""}>${s}</option>`).join("")}
          </select></label>
          <label>Fold rate<input name="foldRate" type="number" min="0" step="0.01" value="${t}" /></label>
          <label>Report email<input name="reportEmail" type="email" placeholder="admin@laba101.test" value="${d(a)}" /></label>
          <button class="primary" type="submit">Save settings</button>
        </form>
      </article>
    </section>
  `}function ua(){const e=()=>{localStorage.removeItem(ee),f.currentUser=null,f.tab="dashboard",f.receiptOrderId=0,f.sidebarOpen=!1,x()};document.querySelector("#logout-button")?.addEventListener("click",e),document.querySelector("#mobile-logout-button")?.addEventListener("click",e),document.querySelector("#mobile-menu-button")?.addEventListener("click",()=>{f.sidebarOpen=!0,x()}),document.querySelector("#sidebar-close-button")?.addEventListener("click",()=>{f.sidebarOpen=!1,x()}),document.querySelector("#sidebar-backdrop")?.addEventListener("click",()=>{f.sidebarOpen=!1,x()}),document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{f.tab=t.dataset.tab,f.receiptOrderId=0,f.sidebarOpen=!1,x()})}),document.querySelectorAll("[data-quick-tab]").forEach(t=>{t.addEventListener("click",()=>{f.tab=t.dataset.quickTab,x()})}),document.querySelectorAll("[data-receipt]").forEach(t=>{t.addEventListener("click",()=>{f.receiptOrderId=Number(t.dataset.receipt),x()})}),document.querySelector("[data-close-receipt]")?.addEventListener("click",()=>{f.receiptOrderId=0,x()}),document.querySelector("[data-print-receipt]")?.addEventListener("click",()=>{window.print()}),document.querySelectorAll("[data-report-tab]").forEach(t=>{t.addEventListener("click",()=>{f.dailyReportTab=t.dataset.reportTab,x()})}),document.querySelectorAll("[data-maintenance-tab]").forEach(t=>{t.addEventListener("click",()=>{f.maintenanceTab=t.dataset.maintenanceTab,x()})})}function ma(){zt(),document.querySelector("#login-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget),a=document.querySelector("#login-button");a&&(a.disabled=!0,a.textContent="Signing in...");try{const s=await We(String(t.get("email")??""),String(t.get("password")??""));if(!s){f.loginError="Invalid email or password.",await x();return}f.currentUser=s,f.loginError="",await ne("branch",String(s.branch||"Main Store")),t.get("remember")?localStorage.setItem(ee,JSON.stringify({email:s.email,remembered:!0})):localStorage.removeItem(ee),Je().includes(f.tab)||(f.tab="dashboard"),await x()}catch(s){alert("Login Error: "+String(s?.message||s)),a&&(a.disabled=!1,a.textContent="Sign in")}})}function va(){se&&window.clearInterval(se);const e=document.querySelector("[data-dashboard-time]"),t=document.querySelector("[data-dashboard-date]");if(!e||!t){se=void 0;return}const a=()=>{const s=Ve();e.textContent=s.time,t.textContent=s.date};a(),se=window.setInterval(a,1e3)}function fa(e){const t=document.querySelector("#order-form"),a=document.querySelector("#price-preview"),s=t?.querySelector('button[type="submit"]'),r=t?.querySelector('select[name="customerId"]'),n=t?.querySelector('input[name="customerName"]'),o=t?.querySelector('input[name="customerPhone"]'),i=t?.querySelector("[data-category-weight]"),c=t?.querySelector("[data-order-error]"),l=t?.querySelector('select[name="paymentMethod"]'),g=t?.querySelector(".gcash-reference"),h=t?.querySelector('input[name="paymentReference"]'),u=()=>{if(!r||!n||!o)return;const w=r.selectedOptions[0];n.value=w?.dataset.name??"",o.value=w?.dataset.phone??""},P=()=>{const w=l?.value==="gcash";g&&(g.hidden=!w),h&&(h.required=w,w||(h.value=""))},C=()=>{if(!t||!a)return;const w=new FormData(t),E=e.services.find(y=>y.id===Number(w.get("serviceId"))),m=e.categories.find(y=>y.id===Number(w.get("itemCategoryId"))),p=e.services.filter(y=>w.getAll("addonIds").map(Number).includes(y.id));if(!E||!m)return;const v=Ee(E,m,Number(w.get("weightKg")??0),p);i&&(i.textContent=`Allowed item weight: ${m.maxKg} kg`);const b=p.map(y=>pe(y.name)),$=v.extraKg>0;s&&(s.disabled=$),c&&(c.hidden=!$,c.textContent=v.warning??""),a.classList.toggle("has-error",$),a.innerHTML=`
      <div class="preview-line"><span>Base price</span><strong>${O(v.price)}</strong></div>
      ${v.extraServiceAmount>0?`<div class="preview-line"><span>Extra services${b.length?` (${d(b.join(", "))})`:""}</span><strong>${O(v.extraServiceAmount)}</strong></div>`:""}
      <div class="preview-total"><span>Total amount</span><strong>${O(v.totalAmount)}</strong></div>
      ${v.warning?`<span class="warn">${d(v.warning)}</span>`:""}
    `};r?.addEventListener("change",u),l?.addEventListener("change",P),P(),t?.addEventListener("input",C),t?.addEventListener("change",C),C(),t?.addEventListener("submit",async w=>{w.preventDefault();const E=new FormData(t),m=e.services.find(b=>b.id===Number(E.get("serviceId"))),p=e.categories.find(b=>b.id===Number(E.get("itemCategoryId"))),v=e.services.filter(b=>E.getAll("addonIds").map(Number).includes(b.id));if(m&&p){const b=Ee(m,p,Number(E.get("weightKg")??0),v);if(b.extraKg>0){c&&(c.hidden=!1,c.textContent=b.warning??"Weight exceeds the allowed limit.");return}}try{await Ot({customerId:Number(E.get("customerId"))||void 0,customerName:String(E.get("customerName")??""),customerPhone:String(E.get("customerPhone")??"")||null,serviceId:Number(E.get("serviceId")),itemCategoryId:Number(E.get("itemCategoryId")),branch:e.branch,weightKg:Number(E.get("weightKg")),addonIds:E.getAll("addonIds").map(Number),paidAmount:Number(E.get("paidAmount")??0),paymentMethod:String(E.get("paymentMethod")??"cash"),paymentReference:String(E.get("paymentReference")??"")||null,notes:String(E.get("notes")??"")||null}),await x()}catch(b){c&&(c.hidden=!1,c.textContent=b instanceof Error?b.message:"Order could not be saved.")}}),document.querySelectorAll(".advance-form").forEach(w=>{w.addEventListener("submit",async E=>{E.preventDefault();const m=new FormData(w);await Dt(Number(w.dataset.orderId),Number(m.get("assignedStaffId"))||null),await x()})}),document.querySelectorAll(".payment-form").forEach(w=>{const E=w.querySelector('select[name="method"]'),m=w.querySelector('input[name="reference"]'),p=()=>{const v=E?.value==="gcash";m&&(m.hidden=!v,m.required=v,v||(m.value=""))};E?.addEventListener("change",p),p(),w.addEventListener("submit",async v=>{v.preventDefault();const b=new FormData(w);await He(Number(w.dataset.orderId),{amount:Number(b.get("amount")),method:String(b.get("method")),reference:String(b.get("reference")??"")||null}),await x()})})}function ha(e){document.querySelector("#service-form")?.addEventListener("submit",async t=>{t.preventDefault();const a=new FormData(t.currentTarget),s=a.get("id")?Number(a.get("id")):void 0;await Ue({id:s,name:String(a.get("name")??""),description:String(a.get("description")??"")||null,category:String(a.get("category")??""),serviceType:String(a.get("serviceType")??"order"),price:Number(a.get("price")??0),maxKg:Number(a.get("maxKg")??0),dryingMinutes:Number(a.get("dryingMinutes"))||null,includes:a.getAll("includes").map(String).filter(Boolean),additionalCharge:0,turnaroundHours:Number(a.get("turnaroundHours")??24),isActive:1}),await x()}),document.querySelectorAll(".edit-service-btn").forEach(t=>{t.addEventListener("click",()=>{const a=Number(t.dataset.id),s=e.find(n=>n.id===a),r=document.querySelector("#service-form");s&&r&&(r.querySelector("[name=id]").value=String(s.id),r.querySelector("[name=name]").value=s.name,r.querySelector("[name=category]").value=s.category,r.querySelector("[name=serviceType]").value=s.serviceType,r.querySelector("[name=price]").value=String(s.price),r.querySelector("[name=maxKg]").value=String(s.maxKg),r.querySelector("[name=dryingMinutes]").value=s.dryingMinutes?String(s.dryingMinutes):"",r.querySelectorAll('input[name="includes"]').forEach(n=>{n.checked=s.includes.includes(n.value)}),r.querySelector("[name=turnaroundHours]").value=String(s.turnaroundHours),r.querySelector("[name=description]").value=s.description??"",window.scrollTo({top:0,behavior:"smooth"}))})}),document.querySelectorAll(".deactivate-service-btn, .activate-service-btn").forEach(t=>{t.addEventListener("click",async()=>{const a=Number(t.dataset.id),s=e.find(r=>r.id===a);if(s){const r=s.isActive?0:1;await Ue({id:s.id,name:s.name,description:s.description,category:s.category,serviceType:s.serviceType,price:s.price,maxKg:s.maxKg,dryingMinutes:s.dryingMinutes,includes:s.includes,additionalCharge:s.additionalCharge,turnaroundHours:s.turnaroundHours,isActive:r}),await x()}})}),document.querySelector("#category-form")?.addEventListener("submit",async t=>{t.preventDefault();const a=new FormData(t.currentTarget);await $t({name:String(a.get("name")??""),maxKg:Number(a.get("maxKg")??0),additionalFee:Number(a.get("additionalFee")??0),isActive:1}),await x()})}function pa(){document.querySelector("#expense-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await Ft({expenseDate:String(t.get("expenseDate")??""),name:String(t.get("name")??""),category:String(t.get("category")??""),description:String(t.get("description")??""),amount:Number(t.get("amount")??0)}),await x()}),document.querySelector("#fold-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await kt({orderTicket:String(t.get("orderTicket")??""),staffName:String(t.get("staffName")??""),foldCount:Number(t.get("foldCount")??1),rate:Number(t.get("rate")??5)}),await x()})}function ga(e,t,a,s){document.querySelector("#sales-form")?.addEventListener("submit",async m=>{m.preventDefault();const p=new FormData(m.currentTarget);await Bt({saleDate:String(p.get("saleDate")??""),cashAmount:Number(p.get("cashAmount")??0),gcashAmount:Number(p.get("gcashAmount")??0),notes:String(p.get("notes")??"")}),await x()});const r=document.querySelector("[data-date-from]"),n=document.querySelector("[data-date-to]");document.querySelectorAll("[data-date-scope]").forEach(m=>{m.addEventListener("change",()=>{if(!m.checked||!r||!n)return;const p=new Date,v=me(p),b=new Date(p);m.value==="week"&&b.setDate(p.getDate()-6),m.value==="month"&&b.setDate(1),m.value!=="custom"&&(r.value=m.value==="today"?v:me(b),n.value=v)})});const o=()=>new Set(Array.from(document.querySelectorAll('input[name="reportType"]:checked')).map(m=>m.value)),i=()=>({from:r?.value||"0000-01-01",to:n?.value||"9999-12-31"}),c=()=>{const m=e.filter(S=>h(re(S.createdAt))),p=t.filter(S=>h(S.saleDate)),v=m.reduce((S,U)=>S+U.paidAmount,0),b=0,$=p.reduce((S,U)=>S+U.cashAmount,0),y=p.reduce((S,U)=>S+U.gcashAmount,0),k=v+$,N=b+y,D=k+N;return{orderCashTotal:v,orderGcashTotal:b,manualCashTotal:$,manualGcashTotal:y,totalCash:k,totalGcash:N,totalSales:D,rows:[["Type","Date","Number","Name","Cash","GCash","Total","Balance"],...m.map(S=>["Order",re(S.createdAt),S.ticket,S.customer,S.paidAmount,0,S.paidAmount,S.balance]),...p.map(S=>["Manual Sale",S.saleDate,S.saleNumber,S.notes??"",S.cashAmount,S.gcashAmount,S.totalAmount,""]),[],["Sales Summary",i().from,"to",i().to,"","","",""],["Order Cash","","","","","",v,""],["Order GCash","","","","","",b,""],["Manual Cash","","","","","",$,""],["Manual GCash","","","","","",y,""],["Total Cash","","","","","",k,""],["Total GCash","","","","","",N,""],["Total Sales","","","","","",D,""]]}},l=()=>{const m=a.filter(y=>h(y.expenseDate)),p=Ye(e.filter(y=>h(re(y.createdAt))),s),v=m.reduce((y,k)=>y+k.amount,0),b=p.reduce((y,k)=>y+k.total,0),$=v+b;return{totalExpenses:v,totalFoldPayouts:b,totalDisbursement:$,rows:[["Type","Date","Number","Name","Cash","GCash","Total","Balance"],...m.map(y=>["Expense",y.expenseDate,y.number,y.name,"","",y.amount,""]),...p.map(y=>["Fold Payout",i().from,`${y.folds} fold(s)`,y.staffName,"","",y.total,""]),[],["Disbursement Summary",i().from,"to",i().to,"","","",""],["Expenses","","","","","",v,""],["Fold Payouts","","","","","",b,""],["Total Disbursement","","","","","",$,""]]}},g=()=>{const m=c(),p=l(),v=m.totalSales-p.totalDisbursement;return[["Summary",i().from,"to",i().to,"","","",""],["Order Cash","","","","","",m.orderCashTotal,""],["Order GCash","","","","","",m.orderGcashTotal,""],["Manual Cash","","","","","",m.manualCashTotal,""],["Manual GCash","","","","","",m.manualGcashTotal,""],["Total Cash","","","","","",m.totalCash,""],["Total GCash","","","","","",m.totalGcash,""],["Total Sales","","","","","",m.totalSales,""],["Total Disbursement","","","","","",p.totalDisbursement,""],["Profit","","","","","",v,""]]},h=m=>{const p=i();return m>=p.from&&m<=p.to},u=m=>{const p=$=>String($??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;"),v=$=>$==="Sales Report"?[110,125,150,215,95,95,105,105]:$==="Disbursement"?[130,115,165,190,95,105,105,105]:[155,125,125,125,95,95,115,115];return`<?xml version="1.0"?>
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
  ${m.map($=>{const y=v($.name).map(N=>`<Column ss:Width="${N}" ss:AutoFitWidth="0"/>`).join(""),k=$.rows.map(N=>{if(!N.length)return'<Row ss:Height="10" ss:StyleID="BorderRow"><Cell ss:StyleID="BorderCell"><Data ss:Type="String">&nbsp;</Data></Cell></Row>';const D=N[0]==="Type"||N[0]==="Summary"||N[0]==="Sales Summary"||N[0]==="Disbursement Summary",S=D?"HeaderRow":"BorderRow",U=D?"HeaderCell":"BorderCell",j=D?26:22,F=N.map(W=>`<Cell ss:StyleID="${U}"><Data ss:Type="${typeof W=="number"?"Number":"String"}">${p(W)}</Data></Cell>`).join("");return`<Row ss:Height="${j}" ss:StyleID="${S}">${F}</Row>`}).join("");return`
        <Worksheet ss:Name="${p($.name)}">
          <Table>
            ${y}
            ${k}
          </Table>
        </Worksheet>`}).join("")}
</Workbook>`},P=()=>{const m=i(),p=o(),v=[];p.has("sales")&&v.push({name:"Sales Report",rows:c().rows}),p.has("disbursement")&&v.push({name:"Disbursement",rows:l().rows}),p.has("summary")&&v.push({name:"Summary",rows:g()});const b=u(v.length?v:[{name:"Summary",rows:g()}]),$=`laba101-report-${m.from}-to-${m.to}.xls`;return new File([b],$,{type:"application/vnd.ms-excel"})},C=async()=>{const m=P();if(!Capacitor.isNativePlatform())return{fileName:m.name,uri:""};const p=await m.text(),v=m.name;await De.writeFile({path:v,data:p,directory:ie.External,encoding:be.UTF8});const{uri:b}=await De.getUri({path:v,directory:ie.External});return{fileName:m.name,uri:b}},w=()=>{const m=P(),p=i(),v=`laba101-report-${p.from}-to-${p.to}.xls`,b=m,$=URL.createObjectURL(b),y=document.createElement("a");return y.href=$,y.download=v,document.body.appendChild(y),y.click(),setTimeout(()=>{y.remove(),URL.revokeObjectURL($)},1e3),v},E=async m=>{const p=document.querySelector(m==="export"?"#export-report":"#email-report");p&&(p.disabled=!0,p.textContent=m==="export"?"Exporting...":"Sending...");try{if(m==="export")if(Capacitor.isNativePlatform()){const v=await C();alert(`Report exported as "${v.fileName}".`)}else{const v=w();alert(`Report saved: ${v}`)}else{const v=await je("report_email")||"";if(!v){alert("Please configure a report email in Settings first.");return}const b=i(),$=`Laba101 report ${b.from} to ${b.to}`;if(Capacitor.isNativePlatform()){const y=await C();try{await mt.share({title:$,text:`Please find the attached Laba101 report file: ${y.fileName}`,files:[y.uri],dialogTitle:"Send report via email"}),alert(`Report saved and shared as "${y.fileName}".`)}catch(k){const N=String(k).toLowerCase();if(N.includes("share canceled")||N.includes("canceled"))alert(`Report saved as "${y.fileName}".`);else throw k}}else{const y=w(),k=`Hi,

Please find the attached Laba101 report file: ${y}

Date range: ${b.from} to ${b.to}`,N=`mailto:${v}?subject=${encodeURIComponent($)}&body=${encodeURIComponent(k)}`;setTimeout(()=>{window.location.href=N},800),alert(`Report downloaded as "${y}".
Your email app will open — please attach the file and send.`)}}}catch(v){alert("Failed: "+String(v))}finally{p&&(p.disabled=!1,p.textContent=m==="export"?"Export Excel":"Send to Email")}};document.querySelector("#export-report")?.addEventListener("click",async()=>{await E("export")}),document.querySelector("#email-report")?.addEventListener("click",async()=>{await E("email")})}function ya(){document.querySelector("#machine-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await jt({machineName:String(t.get("machineName")??""),machineType:String(t.get("machineType")),status:String(t.get("status")),branch:String(t.get("branch")??"")}),await x()}),document.querySelector("#subcleaning-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=e.currentTarget.querySelector('button[type="submit"]');t&&(t.disabled=!0,t.textContent="Starting...");const a=new FormData(e.currentTarget),s=a.getAll("machineIds").map(Number);if(!s.length){alert("Please select at least one machine to clean."),t&&(t.disabled=!1,t.textContent="Start Cleaning");return}await Kt({date:String(a.get("date")??""),machineIds:s,cleaningStatus:String(a.get("cleaningStatus")??""),notes:String(a.get("notes")??""),branch:String(a.get("branch")??"")}),await x()}),document.querySelectorAll(".complete-cleaning-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.machineId),a=e.dataset.branch??"";e.disabled=!0,e.textContent="Completing...",await Xt(t,a),await x()})}),document.querySelectorAll(".deactivate-machine-btn, .activate-machine-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.id),a=e.classList.contains("deactivate-machine-btn");await _t(t,a?"inactive":"available"),await x()})})}function ba(e){const t=document.querySelector("#add-staff-modal"),a=document.querySelector("#open-add-staff-modal"),s=document.querySelector("#close-add-staff-modal"),r=document.querySelector("#staff-form"),n=()=>{r?.reset(),r&&(r.querySelector("[name=id]").value="");const i=document.querySelector("#add-staff-title");i&&(i.textContent="Add staff member"),t?.removeAttribute("hidden")},o=()=>{t?.setAttribute("hidden",""),r?.reset()};a?.addEventListener("click",n),s?.addEventListener("click",o),t?.addEventListener("click",i=>{i.target===t&&o()}),document.querySelectorAll(".edit-staff-btn").forEach(i=>{i.addEventListener("click",()=>{const c=Number(i.dataset.id),l=e.find(g=>g.id===c);if(l&&r){r.querySelector("[name=id]").value=String(l.id),r.querySelector("[name=name]").value=l.name,r.querySelector("[name=email]").value=l.email,r.querySelector("[name=password]").value=l.password,r.querySelector("[name=role]").value=l.role,r.querySelector("[name=branch]").value=l.branch;const g=document.querySelector("#add-staff-title");g&&(g.textContent="Edit staff member"),t?.removeAttribute("hidden")}})}),document.querySelectorAll(".deactivate-staff-btn, .activate-staff-btn").forEach(i=>{i.addEventListener("click",async()=>{const c=Number(i.dataset.id),l=e.find(g=>g.id===c);l&&(await ke(c,{isActive:l.isActive!==0?0:1}),await x())})}),r?.addEventListener("submit",async i=>{i.preventDefault();const c=document.querySelector("#staff-save-btn");c&&(c.disabled=!0,c.textContent="Saving...");const l=new FormData(r),g=l.get("id")?Number(l.get("id")):void 0,h=String(l.get("name")??"").trim(),u=String(l.get("email")??"").trim(),P=String(l.get("password")??"password")||"password",C=String(l.get("role")),w=String(l.get("branch")??"");if(!h||!u){alert("Name and email are required."),c&&(c.disabled=!1,c.textContent="Save staff member");return}try{g?await ke(g,{name:h,email:u,password:P,role:C,branch:w}):await At({name:h,email:u,password:P,role:C,branch:w}),o(),await x()}catch{alert("Failed to save staff. The email may already be in use."),c&&(c.disabled=!1,c.textContent="Save staff member")}})}function wa(){document.querySelector("#settings-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await ne("branch",String(t.get("branch")??"Main Store")),await ne("fold_rate",String(t.get("foldRate")??"5")),String(t.get("reportEmail")??"")&&await ne("report_email",String(t.get("reportEmail"))),alert("Settings saved successfully!"),await x()})}await St();const Me=localStorage.getItem(ee);if(Me)try{const e=JSON.parse(Me);if(e.email&&e.remembered){const t=await We(e.email,"password")??null;f.currentUser=t}}catch{localStorage.removeItem(ee)}await x();export{be as E,Te as W,it as b};
