(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function a(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=a(r);fetch(r.href,n)}})();var J;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(J||(J={}));class be extends Error{constructor(t,a,s){super(t),this.message=t,this.code=a,this.data=s}}const st=e=>{var t,a;return e?.androidBridge?"android":!((a=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},rt=e=>{const t=e.CapacitorCustomPlatform||null,a=e.Capacitor||{},s=a.Plugins=a.Plugins||{},r=()=>t!==null?t.name:st(e),n=()=>r()!=="web",o=v=>{const f=l.get(v);return!!(f?.platforms.has(r())||i(v))},i=v=>{var f;return(f=a.PluginHeaders)===null||f===void 0?void 0:f.find(y=>y.name===v)},c=v=>e.console.error(v),l=new Map,g=(v,f={})=>{const y=l.get(v);if(y)return console.warn(`Capacitor plugin "${v}" already registered. Cannot register plugins twice.`),y.proxy;const b=r(),p=i(v);let d;const $=async()=>(!d&&b in f?d=typeof f[b]=="function"?d=await f[b]():d=f[b]:t!==null&&!d&&"web"in f&&(d=typeof f.web=="function"?d=await f.web():d=f.web),d),A=(h,O)=>{var M,_;if(p){const W=p?.methods.find(F=>O===F.name);if(W)return W.rtype==="promise"?F=>a.nativePromise(v,O.toString(),F):(F,re)=>a.nativeCallback(v,O.toString(),F,re);if(h)return(M=h[O])===null||M===void 0?void 0:M.bind(h)}else{if(h)return(_=h[O])===null||_===void 0?void 0:_.bind(h);throw new be(`"${v}" plugin is not implemented on ${b}`,J.Unimplemented)}},L=h=>{let O;const M=(..._)=>{const W=$().then(F=>{const re=A(F,h);if(re){const ne=re(..._);return O=ne?.remove,ne}else throw new be(`"${v}.${h}()" is not implemented on ${b}`,J.Unimplemented)});return h==="addListener"&&(W.remove=async()=>O()),W};return M.toString=()=>`${h.toString()}() { [capacitor code] }`,Object.defineProperty(M,"name",{value:h,writable:!1,configurable:!1}),M},R=L("addListener"),q=L("removeListener"),P=(h,O)=>{const M=R({eventName:h},O),_=async()=>{const F=await M;q({eventName:h,callbackId:F},O)},W=new Promise(F=>M.then(()=>F({remove:_})));return W.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await _()},W},Y=new Proxy({},{get(h,O){switch(O){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return p?P:R;case"removeListener":return q;default:return L(O)}}});return s[v]=Y,l.set(v,{name:v,proxy:Y,platforms:new Set([...Object.keys(f),...p?[b]:[]])}),Y};return a.convertFileSrc||(a.convertFileSrc=v=>v),a.getPlatform=r,a.handleError=c,a.isNativePlatform=n,a.isPluginAvailable=o,a.registerPlugin=g,a.Exception=be,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},nt=e=>e.Capacitor=rt(e),S=nt(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),Z=S.registerPlugin;class Le{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,a){let s=!1;this.listeners[t]||(this.listeners[t]=[],s=!0),this.listeners[t].push(a);const n=this.windowListeners[t];n&&!n.registered&&this.addWindowListener(n),s&&this.sendRetainedArgumentsForEvent(t);const o=async()=>this.removeListener(t,a);return Promise.resolve({remove:o})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,a,s){const r=this.listeners[t];if(!r){if(s){let n=this.retainedEventArguments[t];n||(n=[]),n.push(a),this.retainedEventArguments[t]=n}return}r.forEach(n=>n(a))}hasListeners(t){var a;return!!(!((a=this.listeners[t])===null||a===void 0)&&a.length)}registerWindowListener(t,a){this.windowListeners[a]={registered:!1,windowEventName:t,pluginEventName:a,handler:s=>{this.notifyListeners(a,s)}}}unimplemented(t="not implemented"){return new S.Exception(t,J.Unimplemented)}unavailable(t="not available"){return new S.Exception(t,J.Unavailable)}async removeListener(t,a){const s=this.listeners[t];if(!s)return;const r=s.indexOf(a);this.listeners[t].splice(r,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const a=this.retainedEventArguments[t];a&&(delete this.retainedEventArguments[t],a.forEach(s=>{this.notifyListeners(t,s)}))}}const xe=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Pe=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class it extends Le{async getCookies(){const t=document.cookie,a={};return t.split(";").forEach(s=>{if(s.length<=0)return;let[r,n]=s.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");r=Pe(r).trim(),n=Pe(n).trim(),a[r]=n}),a}async setCookie(t){try{const a=xe(t.key),s=xe(t.value),r=t.expires?`; expires=${t.expires.replace("expires=","")}`:"",n=(t.path||"/").replace("path=",""),o=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${a}=${s||""}${r}; path=${n}; ${o};`}catch(a){return Promise.reject(a)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const a of t)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}Z("CapacitorCookies",{web:()=>new it});const ot=async e=>new Promise((t,a)=>{const s=new FileReader;s.onload=()=>{const r=s.result;t(r.indexOf(",")>=0?r.split(",")[1]:r)},s.onerror=r=>a(r),s.readAsDataURL(e)}),ct=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(r=>r.toLocaleLowerCase()).reduce((r,n,o)=>(r[n]=e[t[o]],r),{})},lt=(e,t=!0)=>e?Object.entries(e).reduce((s,r)=>{const[n,o]=r;let i,c;return Array.isArray(o)?(c="",o.forEach(l=>{i=t?encodeURIComponent(l):l,c+=`${n}=${i}&`}),c.slice(0,-1)):(i=t?encodeURIComponent(o):o,c=`${n}=${i}`),`${s}&${c}`},"").substr(1):null,dt=(e,t={})=>{const a=Object.assign({method:e.method||"GET",headers:e.headers},t),r=ct(e.headers)["content-type"]||"";if(typeof e.data=="string")a.body=e.data;else if(r.includes("application/x-www-form-urlencoded")){const n=new URLSearchParams;for(const[o,i]of Object.entries(e.data||{}))n.set(o,i);a.body=n.toString()}else if(r.includes("multipart/form-data")||e.data instanceof FormData){const n=new FormData;if(e.data instanceof FormData)e.data.forEach((i,c)=>{n.append(c,i)});else for(const i of Object.keys(e.data))n.append(i,e.data[i]);a.body=n;const o=new Headers(a.headers);o.delete("content-type"),a.headers=o}else(r.includes("application/json")||typeof e.data=="object")&&(a.body=JSON.stringify(e.data));return a};class ut extends Le{async request(t){const a=dt(t,t.webFetchExtra),s=lt(t.params,t.shouldEncodeUrlParams),r=s?`${t.url}?${s}`:t.url,n=await fetch(r,a),o=n.headers.get("content-type")||"";let{responseType:i="text"}=n.ok?t:{};o.includes("application/json")&&(i="json");let c,l;switch(i){case"arraybuffer":case"blob":l=await n.blob(),c=await ot(l);break;case"json":c=await n.json();break;default:c=await n.text()}const g={};return n.headers.forEach((v,f)=>{g[f]=v}),{data:c,headers:g,status:n.status,url:n.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}Z("CapacitorHttp",{web:()=>new ut});var Ie;(function(e){e.Dark="DARK",e.Light="LIGHT",e.Default="DEFAULT"})(Ie||(Ie={}));var qe;(function(e){e.StatusBar="StatusBar",e.NavigationBar="NavigationBar"})(qe||(qe={}));class mt extends Le{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}Z("SystemBars",{web:()=>new mt});const vt="modulepreload",ft=function(e){return"/"+e},Fe={},Ce=function(t,a,s){let r=Promise.resolve();if(a&&a.length>0){let c=function(l){return Promise.all(l.map(g=>Promise.resolve(g).then(v=>({status:"fulfilled",value:v}),v=>({status:"rejected",reason:v}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),i=o?.nonce||o?.getAttribute("nonce");r=c(a.map(l=>{if(l=ft(l),l in Fe)return;Fe[l]=!0;const g=l.endsWith(".css"),v=g?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${v}`))return;const f=document.createElement("link");if(f.rel=g?"stylesheet":vt,g||(f.as="script"),f.crossOrigin="",f.href=l,i&&f.setAttribute("nonce",i),document.head.appendChild(f),g)return new Promise((y,b)=>{f.addEventListener("load",y),f.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${l}`)))})}))}function n(o){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=o,window.dispatchEvent(i),!i.defaultPrevented)throw o}return r.then(o=>{for(const i of o||[])i.status==="rejected"&&n(i.reason);return t().catch(n)})};function ht(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,a){return new Proxy({},{get(s,r){return(n,o,i)=>{const c=e.Capacitor.Plugins[a];if(c===void 0){i(new Error(`Capacitor plugin ${a} not found`));return}if(typeof c[r]!="function"){i(new Error(`Method ${r} not found in Capacitor plugin ${a}`));return}(async()=>{try{const l=await c[r](n);o(l)}catch(l){i(l)}})()}}})}})}function pt(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,a){return e.cordova.plugins[a]}})}function gt(e=!1){typeof window>"u"||(window.CapacitorUtils=window.CapacitorUtils||{},window.Capacitor!==void 0&&!e?ht(window):window.cordova!==void 0&&pt(window))}var de;(function(e){e.Documents="DOCUMENTS",e.Data="DATA",e.Library="LIBRARY",e.Cache="CACHE",e.External="EXTERNAL",e.ExternalStorage="EXTERNAL_STORAGE",e.ExternalCache="EXTERNAL_CACHE",e.LibraryNoCloud="LIBRARY_NO_CLOUD",e.Temporary="TEMPORARY"})(de||(de={}));var Se;(function(e){e.UTF8="utf8",e.ASCII="ascii",e.UTF16="utf16"})(Se||(Se={}));const ke=Z("Filesystem",{web:()=>Ce(()=>import("./web-cmW2qvg3.js"),[]).then(e=>new e.FilesystemWeb)});gt();const yt=Z("Share",{web:()=>Ce(()=>import("./web-CpSR-E0a.js"),[]).then(e=>new e.ShareWeb)});class bt{constructor(t){this.sqlite=t,this._connectionDict=new Map}async initWebStore(){try{return await this.sqlite.initWebStore(),Promise.resolve()}catch(t){return Promise.reject(t)}}async saveToStore(t){try{return await this.sqlite.saveToStore({database:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async saveToLocalDisk(t){try{return await this.sqlite.saveToLocalDisk({database:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getFromLocalDiskToStore(t){const a=t??!0;try{return await this.sqlite.getFromLocalDiskToStore({overwrite:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async echo(t){try{const a=await this.sqlite.echo({value:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isSecretStored(){try{const t=await this.sqlite.isSecretStored();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async setEncryptionSecret(t){try{return await this.sqlite.setEncryptionSecret({passphrase:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async changeEncryptionSecret(t,a){try{return await this.sqlite.changeEncryptionSecret({passphrase:t,oldpassphrase:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async clearEncryptionSecret(){try{return await this.sqlite.clearEncryptionSecret(),Promise.resolve()}catch(t){return Promise.reject(t)}}async checkEncryptionSecret(t){try{const a=await this.sqlite.checkEncryptionSecret({passphrase:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async addUpgradeStatement(t,a){try{return t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.addUpgradeStatement({database:t,upgrade:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async createConnection(t,a,s,r,n){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.createConnection({database:t,encrypted:a,mode:s,version:r,readonly:n});const o=new Ue(t,n,this.sqlite),i=n?`RO_${t}`:`RW_${t}`;return this._connectionDict.set(i,o),Promise.resolve(o)}catch(o){return Promise.reject(o)}}async closeConnection(t,a){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.closeConnection({database:t,readonly:a});const s=a?`RO_${t}`:`RW_${t}`;return this._connectionDict.delete(s),Promise.resolve()}catch(s){return Promise.reject(s)}}async isConnection(t,a){const s={};t.endsWith(".db")&&(t=t.slice(0,-3));const r=a?`RO_${t}`:`RW_${t}`;return s.result=this._connectionDict.has(r),Promise.resolve(s)}async retrieveConnection(t,a){t.endsWith(".db")&&(t=t.slice(0,-3));const s=a?`RO_${t}`:`RW_${t}`;if(this._connectionDict.has(s)){const r=this._connectionDict.get(s);return typeof r<"u"?Promise.resolve(r):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async getNCDatabasePath(t,a){try{const s=await this.sqlite.getNCDatabasePath({path:t,database:a});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async createNCConnection(t,a){try{await this.sqlite.createNCConnection({databasePath:t,version:a});const s=new Ue(t,!0,this.sqlite),r=`RO_${t})`;return this._connectionDict.set(r,s),Promise.resolve(s)}catch(s){return Promise.reject(s)}}async closeNCConnection(t){try{await this.sqlite.closeNCConnection({databasePath:t});const a=`RO_${t})`;return this._connectionDict.delete(a),Promise.resolve()}catch(a){return Promise.reject(a)}}async isNCConnection(t){const a={},s=`RO_${t})`;return a.result=this._connectionDict.has(s),Promise.resolve(a)}async retrieveNCConnection(t){if(this._connectionDict.has(t)){const a=`RO_${t})`,s=this._connectionDict.get(a);return typeof s<"u"?Promise.resolve(s):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async isNCDatabase(t){try{const a=await this.sqlite.isNCDatabase({databasePath:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async retrieveAllConnections(){return this._connectionDict}async closeAllConnections(){const t=new Map;try{for(const a of this._connectionDict.keys()){const s=a.substring(3),r=a.substring(0,3)==="RO_";await this.sqlite.closeConnection({database:s,readonly:r}),t.set(a,null)}for(const a of t.keys())this._connectionDict.delete(a);return Promise.resolve()}catch(a){return Promise.reject(a)}}async checkConnectionsConsistency(){try{const t=[...this._connectionDict.keys()],a=[],s=[];for(const n of t)a.push(n.substring(0,2)),s.push(n.substring(3));const r=await this.sqlite.checkConnectionsConsistency({dbNames:s,openModes:a});return r.result||(this._connectionDict=new Map),Promise.resolve(r)}catch(t){return this._connectionDict=new Map,Promise.reject(t)}}async importFromJson(t){try{const a=await this.sqlite.importFromJson({jsonstring:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isJsonValid(t){try{const a=await this.sqlite.isJsonValid({jsonstring:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async copyFromAssets(t){const a=t??!0;try{return await this.sqlite.copyFromAssets({overwrite:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async getFromHTTPRequest(t,a){const s=a??!0;try{return await this.sqlite.getFromHTTPRequest({url:t,overwrite:s}),Promise.resolve()}catch(r){return Promise.reject(r)}}async isDatabaseEncrypted(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const a=await this.sqlite.isDatabaseEncrypted({database:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isInConfigEncryption(){try{const t=await this.sqlite.isInConfigEncryption();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isInConfigBiometricAuth(){try{const t=await this.sqlite.isInConfigBiometricAuth();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isDatabase(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const a=await this.sqlite.isDatabase({database:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async getDatabaseList(){try{const a=(await this.sqlite.getDatabaseList()).values;a.sort();const s={values:a};return Promise.resolve(s)}catch(t){return Promise.reject(t)}}async getMigratableDbList(t){const a=t||"default";try{const s=await this.sqlite.getMigratableDbList({folderPath:a});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async addSQLiteSuffix(t,a){const s=t||"default",r=a||[];try{const n=await this.sqlite.addSQLiteSuffix({folderPath:s,dbNameList:r});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async deleteOldDatabases(t,a){const s=t||"default",r=a||[];try{const n=await this.sqlite.deleteOldDatabases({folderPath:s,dbNameList:r});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async moveDatabasesAndAddSuffix(t,a){const s=t||"default",r=a||[];return this.sqlite.moveDatabasesAndAddSuffix({folderPath:s,dbNameList:r})}}class Ue{constructor(t,a,s){this.dbName=t,this.readonly=a,this.sqlite=s}getConnectionDBName(){return this.dbName}getConnectionReadOnly(){return this.readonly}async open(){try{return await this.sqlite.open({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async close(){try{return await this.sqlite.close({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async beginTransaction(){try{const t=await this.sqlite.beginTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async commitTransaction(){try{const t=await this.sqlite.commitTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async rollbackTransaction(){try{const t=await this.sqlite.rollbackTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTransactionActive(){try{const t=await this.sqlite.isTransactionActive({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async loadExtension(t){try{return await this.sqlite.loadExtension({database:this.dbName,path:t,readonly:this.readonly}),Promise.resolve()}catch(a){return Promise.reject(a)}}async enableLoadExtension(t){try{return await this.sqlite.enableLoadExtension({database:this.dbName,toggle:t,readonly:this.readonly}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getUrl(){try{const t=await this.sqlite.getUrl({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getVersion(){try{const t=await this.sqlite.getVersion({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getTableList(){try{const t=await this.sqlite.getTableList({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async execute(t,a=!0,s=!0){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const r=await this.sqlite.execute({database:this.dbName,statements:t,transaction:a,readonly:!1,isSQL92:s});return Promise.resolve(r)}}catch(r){return Promise.reject(r)}}async query(t,a,s=!0){let r;try{return a&&a.length>0?r=await this.sqlite.query({database:this.dbName,statement:t,values:a,readonly:this.readonly,isSQL92:!0}):r=await this.sqlite.query({database:this.dbName,statement:t,values:[],readonly:this.readonly,isSQL92:s}),r=await this.reorderRows(r),Promise.resolve(r)}catch(n){return Promise.reject(n)}}async run(t,a,s=!0,r="no",n=!0){let o;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(a&&a.length>0?o=await this.sqlite.run({database:this.dbName,statement:t,values:a,transaction:s,readonly:!1,returnMode:r,isSQL92:!0}):o=await this.sqlite.run({database:this.dbName,statement:t,values:[],transaction:s,readonly:!1,returnMode:r,isSQL92:n}),o.changes=await this.reorderRows(o.changes),Promise.resolve(o))}catch(i){return Promise.reject(i)}}async executeSet(t,a=!0,s="no",r=!0){let n;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(n=await this.sqlite.executeSet({database:this.dbName,set:t,transaction:a,readonly:!1,returnMode:s,isSQL92:r}),n.changes=await this.reorderRows(n.changes),Promise.resolve(n))}catch(o){return Promise.reject(o)}}async isExists(){try{const t=await this.sqlite.isDBExists({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTable(t){try{const a=await this.sqlite.isTableExists({database:this.dbName,table:t,readonly:this.readonly});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isDBOpen(){try{const t=await this.sqlite.isDBOpen({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async delete(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteDatabase({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async createSyncTable(){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const t=await this.sqlite.createSyncTable({database:this.dbName,readonly:!1});return Promise.resolve(t)}}catch(t){return Promise.reject(t)}}async setSyncDate(t){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.setSyncDate({database:this.dbName,syncdate:t,readonly:!1}),Promise.resolve())}catch(a){return Promise.reject(a)}}async getSyncDate(){try{const t=await this.sqlite.getSyncDate({database:this.dbName,readonly:this.readonly});let a="";return t.syncDate>0&&(a=new Date(t.syncDate*1e3).toISOString()),Promise.resolve(a)}catch(t){return Promise.reject(t)}}async exportToJson(t,a=!1){try{const s=await this.sqlite.exportToJson({database:this.dbName,jsonexportmode:t,readonly:this.readonly,encrypted:a});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async deleteExportedRows(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteExportedRows({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async executeTransaction(t,a=!0){let s=0,r=!1;if(this.readonly)return Promise.reject("not allowed in read-only mode");if(await this.sqlite.beginTransaction({database:this.dbName}),r=await this.sqlite.isTransactionActive({database:this.dbName}),!r)return Promise.reject("After Begin Transaction, no transaction active");try{for(const i of t){if(typeof i!="object"||!("statement"in i))throw new Error("Error a task.statement must be provided");if("values"in i&&i.values&&i.values.length>0){const c=i.statement.toUpperCase().includes("RETURNING")?"all":"no",l=await this.sqlite.run({database:this.dbName,statement:i.statement,values:i.values,transaction:!1,readonly:!1,returnMode:c,isSQL92:a});if(l.changes.changes<0)throw new Error("Error in transaction method run ");s+=l.changes.changes}else{const c=await this.sqlite.execute({database:this.dbName,statements:i.statement,transaction:!1,readonly:!1});if(c.changes.changes<0)throw new Error("Error in transaction method execute ");s+=c.changes.changes}}const n=await this.sqlite.commitTransaction({database:this.dbName});s+=n.changes.changes;const o={changes:{changes:s}};return Promise.resolve(o)}catch(n){const o=n.message?n.message:n;return await this.sqlite.rollbackTransaction({database:this.dbName}),Promise.reject(o)}}async reorderRows(t){const a=t;if(t?.values&&typeof t.values[0]=="object"&&Object.keys(t.values[0]).includes("ios_columns")){const s=t.values[0].ios_columns,r=[];for(let n=1;n<t.values.length;n++){const o=t.values[n],i={};for(const c of s)i[c]=o[c];r.push(i)}a.values=r}return Promise.resolve(a)}}const Et=Z("CapacitorSQLite",{web:()=>Ce(()=>import("./web-DeGpg3rP.js"),[]).then(e=>new e.CapacitorSQLiteWeb),electron:()=>window.CapacitorCustomPlatform.plugins.CapacitorSQLite});function wt(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}const St="laba101_offline",ue="fresh_start_reset_v1",Tt=new bt(Et);let ie=null;const K=[{id:1,name:"Laba101 Admin",email:"admin@laba101.test",password:"password",role:"admin",branch:"Main Store"}],me=[],X=[k(1,"Drop-off","Wash, dry and fold.","Drop-Off","order",185,8,40,["Wash","Dry","Fold"],0,24),k(2,"Full Service","Wash, dry, fold, detergent and Fabcon.","Full Service","order",200,8,40,["Wash","Dry","Fold","Detergent","Fabcon"],0,24),k(3,"Self Service Wash","Max of 8kg per load.","Self Service","order",60,8,null,["Wash"],0,1),k(4,"Self Service Dry","Regular time: 40 mins drying time.","Self Service","order",70,8,40,["Dry"],0,1),k(5,"Dry Only","Standard drying rate.","Dry Only","order",70,8,40,["Dry"],0,1),k(6,"Additional Dry 10 mins","Additional drying time.","Dry Only","order",30,8,10,["Dry"],0,1),k(7,"Additional Dry 20 mins","Additional drying time.","Dry Only","order",50,8,20,["Dry"],0,1),k(8,"Additional Dry 40 mins","Additional drying time.","Dry Only","order",70,8,40,["Dry"],0,1),k(9,"Additional Zonrox","Extra Zonrox bleach add-on per load.","Add-on","addon",25,0,null,["Zonrox"],0,0),k(10,"Additional Fabcon","Extra Fabcon fabric conditioner add-on per load.","Add-on","addon",25,0,null,["Fabcon"],0,0),k(11,"Comforter / Bulky Load","Comforter 4kg max per load. Thin blankets, bedsheets, bath towels, pillow cases and curtains: 6kg max per load.","Comforter","order",200,8,40,["Wash","Dry","Fold"],0,24)],H=[{id:1,name:"Regular Clothes",maxKg:8,additionalFee:0,isActive:1},{id:2,name:"Comforter",maxKg:4,additionalFee:0,isActive:1},{id:3,name:"Thin Blankets",maxKg:6,additionalFee:0,isActive:1},{id:4,name:"Bedsheets",maxKg:6,additionalFee:0,isActive:1},{id:5,name:"Bath Towels",maxKg:6,additionalFee:0,isActive:1},{id:6,name:"Curtains",maxKg:6,additionalFee:0,isActive:1}];function Me(e,t){const a=T(e,[]),s=new Map(a.map(n=>[n.id,n])),r=t.map(n=>{const o=s.get(n.id);return o?{...n,...o,isActive:o.isActive??n.isActive}:n});(a.length!==r.length||r.some((n,o)=>n.id!==a[o]?.id||JSON.stringify(n)!==JSON.stringify(a[o])))&&E(e,r)}async function Nt(){Me("services",X),Me("item_categories",H)}async function he(e){for(const t of X)((await e.query("SELECT id FROM laundry_services WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive,t.id]):await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive]);for(const t of H)((await e.query("SELECT id FROM item_categories WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.maxKg,t.additionalFee,t.isActive,t.id]):await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[t.id,t.name,t.maxKg,t.additionalFee,t.isActive])}const Q=[],ve=[],fe=[],ee=[],B=[...[1,2,3,4].map(e=>({id:e,machineName:`Washer ${e}`,machineType:"washer",status:"available",branch:"Main Store"})),...[1,2,3,4].map(e=>({id:e+4,machineName:`Dryer ${e}`,machineType:"dryer",status:"available",branch:"Main Store"}))],z=[{key:"branch",value:"Main Store"},{key:"fold_rate",value:"5"},{key:"report_email",value:"admin@laba101.test"}];function k(e,t,a,s,r,n,o,i,c,l,g){return{id:e,name:t,description:a,category:s,serviceType:r,price:n,maxKg:o,dryingMinutes:i,includes:c,additionalCharge:l,turnaroundHours:g,isActive:1}}function I(e){return`laba101-mobile-${e}`}function T(e,t){const a=localStorage.getItem(I(e));if(!a)return structuredClone(t);try{return JSON.parse(a)}catch{return structuredClone(t)}}function E(e,t){localStorage.setItem(I(e),JSON.stringify(t))}function U(e){return e.reduce((t,a)=>Math.max(t,a.id),0)+1}function G(){return new Date().toISOString()}function Te(e=new Date){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${s}`}function At(){return Te().slice(2).replaceAll("-","")}function V(e,t){if(!e)return t;try{return JSON.parse(e)}catch{return t}}async function N(){return ie||(ie=await Tt.createConnection(St,!1,"no-encryption",1,!1),await ie.open()),ie}async function x(e,t,a,s){((await e.query(`PRAGMA table_info(${t})`)).values??[]).some(o=>o.name===a)||await e.execute(`ALTER TABLE ${t} ADD COLUMN ${a} ${s}`)}async function Lt(){localStorage.getItem(I(ue))||(E("staff",K),E("customers",[]),E("orders",[]),E("payments",[]),E("fold_logs",[]),E("expenses",[]),E("sales",[]),localStorage.getItem(I("services"))||E("services",X),localStorage.getItem(I("item_categories"))||E("item_categories",H),localStorage.getItem(I("machines"))||E("machines",B),localStorage.getItem(I("subcleanings"))||E("subcleanings",[]),localStorage.getItem(I("settings"))||E("settings",z),localStorage.removeItem("laba101-mobile-session"),E(ue,!0))}async function Ct(e){const t=K[0];if(((await e.query("SELECT id FROM staff WHERE id = ?",[t.id])).values??[]).length>0){await e.run('UPDATE staff SET name = ?, email = ?, password = COALESCE(NULLIF(password, ""), ?), role = ?, branch = ?, isActive = 1 WHERE id = ?',[t.name,t.email,t.password,t.role,t.branch,t.id]);return}await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.email,t.password,t.role,t.branch,1])}async function $t(e){if(!(((await e.query("SELECT COUNT(*) as count FROM machines")).values?.[0]?.count??0)>0))for(const a of B)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[a.id,a.machineName,a.machineType,a.status,a.branch])}async function Rt(e){for(const t of z)await e.run("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)",[t.key,t.value])}async function Ot(e){((await e.query("SELECT value FROM settings WHERE key = ?",[ue])).values??[]).length>0||(await e.execute(`
    DELETE FROM payments;
    DELETE FROM orders;
    DELETE FROM customers;
    DELETE FROM fold_logs;
    DELETE FROM disbursement_expenses;
    DELETE FROM daily_sales;
    DELETE FROM staff WHERE id <> 1;
  `),await Ct(e),await $t(e),await Rt(e),await e.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",[ue,G()]),localStorage.removeItem("laba101-mobile-session"))}async function Dt(){if(!S.isNativePlatform()){await Lt(),!localStorage.getItem(I("seeded_v4"))&&!localStorage.getItem(I("services"))&&!localStorage.getItem(I("staff"))&&(E("staff",K),E("customers",me),E("services",X),E("item_categories",H),E("orders",Q),E("payments",ve),E("fold_logs",[]),E("expenses",fe),E("sales",ee),E("machines",B),E("subcleanings",[]),E("settings",z),E("seeded_v4",!0)),await Nt(),localStorage.getItem(I("seeded_v4"))||E("seeded_v4",!0);return}const e=await N();if(await e.execute(`
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
  `),await x(e,"staff","email","TEXT"),await x(e,"staff","password","TEXT"),await x(e,"staff","role","TEXT"),await x(e,"staff","isActive","INTEGER NOT NULL DEFAULT 1"),await e.run('UPDATE staff SET password = ? WHERE password IS NULL OR password = ""',["password"]),await e.run('UPDATE staff SET role = ? WHERE role IS NULL OR role = ""',["staff"]),await x(e,"orders","customerId","INTEGER NOT NULL DEFAULT 0"),await x(e,"orders","phone","TEXT"),await x(e,"orders","serviceId","INTEGER NOT NULL DEFAULT 0"),await x(e,"orders","itemCategoryId","INTEGER NOT NULL DEFAULT 0"),await x(e,"orders","itemCategory",'TEXT NOT NULL DEFAULT "Regular Clothes"'),await x(e,"orders","workflowCompleted","TEXT"),await x(e,"orders","weightKg","REAL NOT NULL DEFAULT 0"),await x(e,"orders","price","REAL NOT NULL DEFAULT 0"),await x(e,"orders","additionalCharge","REAL NOT NULL DEFAULT 0"),await x(e,"orders","extraServiceAmount","REAL NOT NULL DEFAULT 0"),await x(e,"orders","totalAmount","REAL NOT NULL DEFAULT 0"),await x(e,"orders","paidAmount","REAL NOT NULL DEFAULT 0"),await x(e,"orders","extras","TEXT"),await x(e,"orders","notes","TEXT"),await x(e,"orders","dueAt","TEXT"),await x(e,"orders","createdAt",'TEXT NOT NULL DEFAULT ""'),await x(e,"daily_sales","saleNumber","TEXT"),await x(e,"daily_sales","status","TEXT"),await x(e,"daily_sales","endorsedTo","TEXT"),((await e.query("SELECT COUNT(*) as count FROM staff")).values?.[0]?.count??0)===0){for(const a of K)await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.name,a.email,a.password,a.role,a.branch,1]);for(const a of me)await e.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[a.id,a.name,a.phone,a.address]);for(const a of X)await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[a.id,a.name,a.description,a.category,a.serviceType,a.price,a.maxKg,a.dryingMinutes,JSON.stringify(a.includes),a.additionalCharge,a.turnaroundHours,a.isActive]);for(const a of H)await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[a.id,a.name,a.maxKg,a.additionalFee,a.isActive]);for(const a of Q)await Xe(e,a);for(const a of ve)await e.run("INSERT INTO payments (id, orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.orderId,a.amount,a.method,a.reference,a.receivedAt,a.branch]);for(const a of fe)await e.run("INSERT INTO disbursement_expenses (id, expenseDate, number, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.expenseDate,a.number,a.name,a.category,a.description,a.amount]);for(const a of ee)await e.run("INSERT INTO daily_sales (id, saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.saleDate,a.saleNumber,a.cashAmount,a.gcashAmount,a.totalAmount,a.notes]);for(const a of B)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[a.id,a.machineName,a.machineType,a.status,a.branch]);for(const a of z)await e.run("INSERT INTO settings (key, value) VALUES (?, ?)",[a.key,a.value])}await he(e),await Ot(e)}async function Xe(e,t){await e.run("INSERT INTO orders (id, ticket, customerId, customer, phone, serviceId, service, itemCategoryId, itemCategory, branch, status, workflowCompleted, weightKg, price, additionalCharge, extraServiceAmount, totalAmount, paidAmount, extras, notes, foldedBy, dueAt, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.ticket,t.customerId,t.customer,t.phone,t.serviceId,t.service,t.itemCategoryId,t.itemCategory,t.branch,t.status,JSON.stringify(t.workflowCompleted),t.weightKg,t.price,t.additionalCharge,t.extraServiceAmount,t.totalAmount,t.paidAmount,JSON.stringify(t.extras),t.notes,t.foldedBy,t.dueAt,t.createdAt])}function xt(e){const t=Number(e.paidAmount??0),a=Number(e.totalAmount??0),s=Number(e.foldedBy);return{id:Number(e.id),ticket:String(e.ticket),customerId:Number(e.customerId),customer:String(e.customer),phone:e.phone?String(e.phone):null,serviceId:Number(e.serviceId),service:String(e.service),itemCategoryId:Number(e.itemCategoryId),itemCategory:String(e.itemCategory),branch:String(e.branch),status:String(e.status),workflowCompleted:V(e.workflowCompleted,[]),weightKg:Number(e.weightKg),price:Number(e.price),additionalCharge:Number(e.additionalCharge),extraServiceAmount:Number(e.extraServiceAmount),totalAmount:a,paidAmount:t,balance:Number((a-t).toFixed(2)),extras:V(e.extras,[]),notes:e.notes?String(e.notes):null,foldedBy:Number.isFinite(s)&&s>0?s:null,foldedByName:e.foldedByName?String(e.foldedByName):null,dueAt:String(e.dueAt),createdAt:String(e.createdAt)}}async function Pt(){await Dt()}async function pe(){return(await $e()).find(t=>t.key==="branch")?.value??"Main Store"}async function It(){const e=await $e();return Number(e.find(t=>t.key==="fold_rate")?.value??"5")}async function He(e){return(await $e()).find(a=>a.key===e)?.value}async function $e(){return S.isNativePlatform()?(await(await N()).query("SELECT key, value FROM settings ORDER BY key")).values??[]:T("settings",z)}async function le(e,t){if(!S.isNativePlatform()){const s=T("settings",z).filter(r=>r.key!==e);s.push({key:e,value:t}),E("settings",s);return}await(await N()).run("REPLACE INTO settings (key, value) VALUES (?, ?)",[e,t])}async function qt(e){return S.isNativePlatform()?(await(await N()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff WHERE branch = ? ORDER BY name ASC',[e])).values??[]:T("staff",K).filter(s=>s.branch===e)}async function Ge(){return S.isNativePlatform()?(await(await N()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff ORDER BY name ASC')).values??[]:T("staff",K)}async function Ve(e,t){const a=e.trim().toLowerCase();return(await Ge()).find(r=>r.email.toLowerCase()===a&&r.password===t&&r.isActive!==0)??null}async function Ft(e){if(!S.isNativePlatform()){const a=T("staff",K);a.unshift({id:U(a),...e,isActive:1}),E("staff",a);return}await(await N()).run("INSERT INTO staff (name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?)",[e.name,e.email,e.password,e.role,e.branch,1])}async function je(e,t){if(!S.isNativePlatform()){const n=T("staff",K),o=n.find(i=>i.id===e);o&&(Object.assign(o,t),E("staff",n));return}const a=await N(),s=[],r=[];for(const[n,o]of Object.entries(t))n!=="id"&&(s.push(`${n} = ?`),r.push(o));s.length&&(r.push(e),await a.run(`UPDATE staff SET ${s.join(", ")} WHERE id = ?`,r))}async function kt(){return S.isNativePlatform()?(await(await N()).query("SELECT id, name, phone, address FROM customers ORDER BY name ASC")).values??[]:T("customers",me).sort((a,s)=>a.name.localeCompare(s.name))}async function Ut(e){if(!S.isNativePlatform()){const r=T("customers",me),n=e.id?r.find(i=>i.id===e.id):r.find(i=>i.name.toLowerCase()===e.name.toLowerCase()&&(e.phone?i.phone===e.phone:!0));if(n)return n.name=e.name,n.phone=e.phone??n.phone,n.address=e.address??n.address,E("customers",r),n;const o={id:U(r),name:e.name,phone:e.phone??null,address:e.address??null};return r.push(o),E("customers",r),o}const t=await N();if(e.id)return await t.run("UPDATE customers SET name = ?, phone = ?, address = ? WHERE id = ?",[e.name,e.phone??null,e.address??null,e.id]),{id:e.id,name:e.name,phone:e.phone??null,address:e.address??null};const a=await t.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM customers"),s=Number((a.values?.[0]).id);return await t.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[s,e.name,e.phone??null,e.address??null]),{id:s,name:e.name,phone:e.phone??null,address:e.address??null}}async function Re(e){if(!S.isNativePlatform())return T("services",X).filter(s=>!0);const t=await N(),a=await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[]);return(a.values??[]).length===0?(await he(t),((await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[])).values??[]).map(r=>({...r,includes:V(r.includes,[])}))):(a.values??[]).map(s=>({...s,includes:V(s.includes,[])}))}async function Mt(){if(!S.isNativePlatform())return T("services",X);const e=await N(),t=await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC");return(t.values??[]).length===0?(await he(e),((await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC")).values??[]).map(s=>({...s,includes:V(s.includes,[])}))):(t.values??[]).map(a=>({...a,includes:V(a.includes,[])}))}async function Be(e){if(!S.isNativePlatform()){const a=T("services",X),s=e.id?a.find(r=>r.id===e.id):null;s?Object.assign(s,e):a.unshift({...e,id:U(a)}),E("services",a);return}const t=await N();e.id?await t.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = ? WHERE id = ?",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive,e.id]):await t.run("INSERT INTO laundry_services (name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive])}async function Ye(){if(!S.isNativePlatform())return T("item_categories",H).filter(a=>a.isActive);const e=await N(),t=await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC");return(t.values??[]).length===0?(await he(e),(await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC")).values??[]):t.values??[]}async function jt(e){if(!S.isNativePlatform()){const a=T("item_categories",H),s=e.id?a.find(r=>r.id===e.id):null;s?Object.assign(s,e):a.unshift({...e,id:U(a)}),E("item_categories",a);return}const t=await N();e.id?await t.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = ? WHERE id = ?",[e.name,e.maxKg,e.additionalFee,e.isActive,e.id]):await t.run("INSERT INTO item_categories (name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?)",[e.name,e.maxKg,e.additionalFee,e.isActive])}function Ne(e,t,a,s){const r=Number(t.maxKg),n=Math.max(0,a-r),o=0,i=s.reduce((g,v)=>g+Number(v.price),0),c=s.map(g=>({id:g.id,name:wt(g.name),price:Number(g.price)})),l=Number((Number(e.price)+o+i).toFixed(2));return{price:Number(e.price),additionalCharge:Number(o.toFixed(2)),extraServiceAmount:Number(i.toFixed(2)),totalAmount:l,allowedKg:r,extraKg:Number(n.toFixed(2)),warning:n>0?`Weight exceeds the ${t.name} load limit of ${r.toFixed(2)} kg.`:null,extras:c}}function Je(e,t){const a=t.find(n=>n.id===e.serviceId),s=a?.includes??[],r=[{key:"received",label:"Received"}];return s.includes("Wash")&&r.push({key:"wash",label:"Wash"}),e.extras.length&&r.push({key:"extras",label:"Extra services"}),(s.includes("Dry")||(a?.dryingMinutes??0)>0)&&r.push({key:"dry",label:"Dry"}),s.includes("Fold")&&r.push({key:"fold",label:"Fold"}),r.push({key:"ready",label:"Ready"},{key:"claimed",label:"Claimed"}),r}function Bt(e){return e.includes("claimed")?"claimed":e.includes("ready")?"ready":e.includes("dry")?"drying":e.includes("extras")||e.includes("wash")?"washing":"received"}async function ge(e){return S.isNativePlatform()?((await(await N()).query("SELECT o.*, s.name as foldedByName FROM orders o LEFT JOIN staff s ON s.id = o.foldedBy WHERE o.branch = ? ORDER BY o.id DESC",[e])).values??[]).map(s=>xt(s)):T("orders",Q).filter(s=>s.branch===e).map(s=>({...s,balance:Number((s.totalAmount-s.paidAmount).toFixed(2))}))}async function _t(e){const[t,a]=await Promise.all([Re(),Ye()]),s=t.find(b=>b.id===e.serviceId),r=a.find(b=>b.id===e.itemCategoryId);if(!s||!r)throw new Error("Service or item category is missing.");const n=t.filter(b=>e.addonIds.includes(b.id)),o=Ne(s,r,e.weightKg,n);if(o.extraKg>0)throw new Error(o.warning??"Weight exceeds the allowed limit.");const i=await Ut({id:e.customerId||void 0,name:e.customerName,phone:e.customerPhone??null}),c=Math.max(0,e.paidAmount),l=Math.min(o.totalAmount,c),g={ticket:await Wt(),customerId:i.id,customer:i.name,phone:i.phone,serviceId:s.id,service:s.name,itemCategoryId:r.id,itemCategory:r.name,branch:e.branch,status:"received",workflowCompleted:["received"],weightKg:e.weightKg,price:o.price,additionalCharge:o.additionalCharge,extraServiceAmount:o.extraServiceAmount,totalAmount:o.totalAmount,paidAmount:l,balance:Number((o.totalAmount-l).toFixed(2)),extras:o.extras,notes:[e.notes,o.warning].filter(Boolean).join(`
`)||null,foldedBy:null,foldedByName:null,dueAt:new Date(Date.now()+s.turnaroundHours*60*60*1e3).toISOString(),createdAt:G()};if(!S.isNativePlatform()){const b=T("orders",Q),p={...g,id:U(b)};return b.unshift(p),E("orders",b),c>0&&await Qe(p.id,{amount:c,method:e.paymentMethod,reference:e.paymentReference??null}),p}const v=await N(),f=await v.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM orders"),y={...g,id:Number((f.values?.[0]).id)};return await Xe(v,y),c>0&&await v.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[y.id,c,e.paymentMethod,e.paymentReference??null,G(),e.branch]),y}async function Wt(){const e=`LB${At()}`,t=await pe(),s=(await ge(t)).filter(n=>n.ticket.startsWith(e)).sort((n,o)=>o.ticket.localeCompare(n.ticket))[0],r=s?Number(s.ticket.slice(-3))+1:1;return`${e}-${String(r).padStart(3,"0")}`}async function Kt(e,t){const a=await pe(),[s,r]=await Promise.all([ge(a),Re()]),n=s.find(l=>l.id===e);if(!n)return;const i=Je(n,r).map(l=>l.key).find(l=>!n.workflowCompleted.includes(l));if(!i)return;if(n.workflowCompleted=[...n.workflowCompleted,i],n.status=Bt(n.workflowCompleted),i==="fold"&&t&&(n.foldedBy=t),!S.isNativePlatform()){const l=T("orders",Q),g=l.find(v=>v.id===n.id);g&&Object.assign(g,n),E("orders",l);return}await(await N()).run("UPDATE orders SET workflowCompleted = ?, status = ?, foldedBy = ? WHERE id = ?",[JSON.stringify(n.workflowCompleted),n.status,n.foldedBy,n.id])}async function Qe(e,t){const a=await pe();if(!(await ge(a)).find(i=>i.id===e))return;const n=Math.max(0,t.amount);if(n<=0)return;if(!S.isNativePlatform()){const i=T("payments",ve);i.unshift({id:U(i),orderId:e,amount:n,method:t.method,reference:t.reference??null,receivedAt:G(),branch:a}),E("payments",i);const c=T("orders",Q),l=c.find(g=>g.id===e);l&&(l.paidAmount=Math.min(l.totalAmount,Number((l.paidAmount+n).toFixed(2)))),E("orders",c);return}const o=await N();await o.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[e,n,t.method,t.reference??null,G(),a]),await o.run("UPDATE orders SET paidAmount = MIN(totalAmount, paidAmount + ?) WHERE id = ?",[n,e])}async function Xt(e){return S.isNativePlatform()?(await(await N()).query("SELECT id, orderId, amount, method, reference, receivedAt, branch FROM payments  ORDER BY receivedAt DESC",[])).values??[]:T("payments",ve).filter(s=>!0)}async function Ht(){return S.isNativePlatform()?(await(await N()).query("SELECT id, orderTicket, staffName, foldCount, rate, total, createdAt FROM fold_logs ORDER BY id DESC")).values??[]:T("fold_logs",[])}async function Gt(e){const t=Number((e.foldCount*e.rate).toFixed(2));if(!S.isNativePlatform()){const s=T("fold_logs",[]);s.unshift({id:Date.now(),...e,total:t,createdAt:G()}),E("fold_logs",s);return}await(await N()).run("INSERT INTO fold_logs (orderTicket, staffName, foldCount, rate, total, createdAt) VALUES (?, ?, ?, ?, ?, ?)",[e.orderTicket,e.staffName,e.foldCount,e.rate,t,G()])}async function Vt(){return S.isNativePlatform()?(await(await N()).query("SELECT id, expenseDate, number, name, category, description, amount FROM disbursement_expenses ORDER BY expenseDate DESC, id DESC")).values??[]:T("expenses",fe)}async function Yt(e){if(!S.isNativePlatform()){const r=T("expenses",fe),n=U(r);r.unshift({id:n,expenseDate:e.expenseDate,number:`DISB-${String(n).padStart(2,"0")}`,name:e.name,category:e.category,description:e.description||null,amount:e.amount}),E("expenses",r);return}const t=await N(),a=await t.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM disbursement_expenses"),s=Number((a.values?.[0]).id);await t.run("INSERT INTO disbursement_expenses (expenseDate, number, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?)",[e.expenseDate,`DISB-${String(s).padStart(2,"0")}`,e.name,e.category,e.description||null,e.amount])}async function Jt(){return S.isNativePlatform()?(await(await N()).query('SELECT id, saleDate, COALESCE(saleNumber, "") as saleNumber, cashAmount, gcashAmount, totalAmount, notes, status, endorsedTo FROM daily_sales ORDER BY saleDate DESC, id DESC')).values??[]:T("sales",ee)}async function Qt(e){const t=Number((e.cashAmount+e.gcashAmount).toFixed(2));if(!S.isNativePlatform()){const n=T("sales",ee),o=n.find(i=>i.saleDate===e.saleDate);if(o)Object.assign(o,{cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null});else{const i=U(n);n.unshift({id:i,saleDate:e.saleDate,saleNumber:`SALE-${String(i).padStart(2,"0")}`,cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null})}E("sales",n);return}const a=await N(),r=(await a.query("SELECT id, saleNumber FROM daily_sales WHERE saleDate = ?",[e.saleDate])).values?.[0];if(r)await a.run("UPDATE daily_sales SET cashAmount = ?, gcashAmount = ?, totalAmount = ?, notes = ? WHERE id = ?",[e.cashAmount,e.gcashAmount,t,e.notes||null,r.id]);else{const n=await a.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM daily_sales"),o=Number((n.values?.[0]).id);await a.run("INSERT INTO daily_sales (saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?)",[e.saleDate,`SALE-${String(o).padStart(2,"0")}`,e.cashAmount,e.gcashAmount,t,e.notes||null])}}async function _e(e,t,a=null){if(!S.isNativePlatform()){const r=T("sales",ee),n=r.find(o=>o.id===e);n&&(n.status=t,n.endorsedTo=a,E("sales",r));return}await(await N()).run("UPDATE daily_sales SET status = ?, endorsedTo = ? WHERE id = ?",[t,a,e])}async function ze(e){return S.isNativePlatform()?(await(await N()).query("SELECT id, machineName, machineType, status, branch FROM machines WHERE branch = ? ORDER BY machineType, machineName",[e])).values??[]:T("machines",B).filter(s=>s.branch===e)}async function zt(e){if(!S.isNativePlatform()){const a=T("machines",B);a.unshift({id:U(a),...e}),E("machines",a);return}await(await N()).run("INSERT INTO machines (machineName, machineType, status, branch) VALUES (?, ?, ?, ?)",[e.machineName,e.machineType,e.status,e.branch])}async function Zt(e,t){if(!S.isNativePlatform()){const s=T("machines",B),r=s.find(n=>n.id===e);r&&(r.status=t,E("machines",s));return}await(await N()).run("UPDATE machines SET status = ? WHERE id = ?",[t,e])}async function ea(e){return S.isNativePlatform()?((await(await N()).query("SELECT id, date, machineIds, machineNames, cleaningStatus, notes, branch FROM subcleanings WHERE branch = ? ORDER BY date DESC, id DESC",[e])).values??[]).map(s=>({...s,machineIds:V(s.machineIds,[])})):T("subcleanings",[]).filter(s=>s.branch===e)}async function ta(e){const a=(await ze(e.branch)).filter(n=>e.machineIds.includes(n.id)).map(n=>n.machineName).join(", ");if(!S.isNativePlatform()){const n=T("subcleanings",[]);n.unshift({id:U(n),date:e.date,machineIds:e.machineIds,machineNames:a,cleaningStatus:e.cleaningStatus,notes:e.notes||null,branch:e.branch}),E("subcleanings",n);const o=T("machines",B);o.forEach(i=>{e.machineIds.includes(i.id)&&(i.status=e.cleaningStatus==="completed"?"available":"under_cleaning")}),E("machines",o);return}const s=await N();await s.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, notes, branch) VALUES (?, ?, ?, ?, ?, ?)",[e.date,JSON.stringify(e.machineIds),a,e.cleaningStatus,e.notes||null,e.branch]);const r=e.cleaningStatus==="completed"?"available":"under_cleaning";for(const n of e.machineIds)await s.run("UPDATE machines SET status = ? WHERE id = ?",[r,n])}async function aa(e,t){if(!S.isNativePlatform()){const o=T("machines",B),i=o.find(g=>g.id===e);i&&(i.status="available"),E("machines",o);const c=T("subcleanings",[]),l=Te();c.unshift({id:U(c),date:l,machineIds:[e],machineNames:i?.machineName??"",cleaningStatus:"completed",notes:null,branch:t}),E("subcleanings",c);return}const a=await N(),r=(await a.query("SELECT machineName FROM machines WHERE id = ?",[e])).values?.[0]?.machineName??"";await a.run("UPDATE machines SET status = ? WHERE id = ?",["available",e]);const n=Te();await a.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, notes, branch) VALUES (?, ?, ?, ?, ?, ?)",[n,JSON.stringify([e]),r,"completed",null,t])}const Oe=document.querySelector("#app");if(!Oe)throw new Error("App root not found");let oe;const De={dashboard:"Dashboard",orders:"POS / Orders",archived:"Archived Order",customers:"Customers",pricing:"Pricing Services",disbursements:"Daily Report",reports:"Reports",inventory:"Inventory",maintenance:"Maintenance",staff:"Staff",revolving:"Revolving Fund",settings:"Settings"},m={tab:"dashboard",receiptOrderId:0,currentUser:null,loginError:"",sidebarOpen:!1,dailyReportTab:"expenses",maintenanceTab:"cleaning",customerSearch:"",orderSearch:"",orderDateFilter:"",archivedOrderSearch:"",reportPreview:null,endorseModalOpen:!1,endorseSaleId:0,endorseSaleDate:""},sa=["Wash","Dry","Fold","Detergent","Fabcon","Zonrox"],te="laba101-mobile-session";function C(e){return new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(e||0)}function u(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ye(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}function ra(e){const t=new Map;return e.filter(a=>a.workflowCompleted.includes("fold")&&a.foldedByName).forEach(a=>{const s=a.foldedByName,r=t.get(s)??{staffName:s,folds:0};r.folds+=1,t.set(s,r)}),Array.from(t.values())}function ae(e=new Date){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${s}`}function j(){return ae()}function se(e){return ae(new Date(e))}function Ae(e){return new Intl.DateTimeFormat("en-PH",{dateStyle:"medium",timeStyle:"short"}).format(new Date(e))}function na(e=new Date){return{date:new Intl.DateTimeFormat("en-PH",{weekday:"long",month:"long",day:"numeric",year:"numeric"}).format(e),time:new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",second:"2-digit",hour12:!0}).format(e)}}function ce(){const e=document.querySelector("[data-date-from]"),t=document.querySelector("[data-date-to]"),a=Array.from(document.querySelectorAll('input[name="reportType"]:checked')).map(s=>s.value).filter(s=>s==="sales"||s==="disbursement"||s==="fold_count"||s==="summary");return{from:e?.value||"0000-01-01",to:t?.value||"9999-12-31",types:a.length?a:["summary"]}}function Ee(e,t){return e>=t.from&&e<=t.to}function Ze(e,t,a,s,r){const n=new Set(r.types),o=e.filter(h=>Ee(se(h.createdAt),r)),i=t.filter(h=>Ee(h.saleDate,r)),c=a.filter(h=>Ee(h.expenseDate,r)),l=ra(o),g=o.reduce((h,O)=>h+O.paidAmount,0),v=i.reduce((h,O)=>h+O.cashAmount,0),f=i.reduce((h,O)=>h+O.gcashAmount,0),y=0,b=g+v,p=y+f,d=b+p,$=c.reduce((h,O)=>h+O.amount,0),A=$,L=d-A,R=()=>({orderCashTotal:g,orderGcashTotal:y,manualCashTotal:v,manualGcashTotal:f,totalCash:b,totalGcash:p,totalSales:d,rows:[["Type","Date","Number","Name","Cash","GCash","Total","Balance"],...o.map(h=>["Order",se(h.createdAt),h.ticket,h.customer,h.paidAmount,0,h.paidAmount,h.balance]),...i.map(h=>["Manual Sale",h.saleDate,h.saleNumber,h.notes??"",h.cashAmount,h.gcashAmount,h.totalAmount,""]),[],["Sales Summary",r.from,"to",r.to,"","","",""],["Order Cash","","","","","",g,""],["Order GCash","","","","","",y,""],["Manual Cash","","","","","",v,""],["Manual GCash","","","","","",f,""],["Total Cash","","","","","",b,""],["Total GCash","","","","","",p,""],["Total Sales","","","","","",d,""]]}),q=()=>({totalExpenses:$,totalDisbursement:A,rows:[["Type","Date","Number","Name","Cash","GCash","Total","Balance"],...c.map(h=>["Expense",h.expenseDate,h.number,h.name,"","",h.amount,""]),[],["Disbursement Summary",r.from,"to",r.to,"","","",""],["Expenses","","","","","",$,""],["Total Disbursement","","","","","",A,""]]});return{selection:r,selectedTypes:n,salesRows:R,disbursementRows:q,foldCountRows:()=>({rows:[["Staff","Fold Count"],...l.map(h=>[h.staffName,h.folds]),[],["Total Folds",l.reduce((h,O)=>h+O.folds,0)]]}),summaryRows:()=>{const h=R(),O=q();return[["Summary",r.from,"to",r.to,"","","",""],["Order Cash","","","","","",h.orderCashTotal,""],["Order GCash","","","","","",h.orderGcashTotal,""],["Manual Cash","","","","","",h.manualCashTotal,""],["Manual GCash","","","","","",h.manualGcashTotal,""],["Total Cash","","","","","",h.totalCash,""],["Total GCash","","","","","",h.totalGcash,""],["Total Sales","","","","","",h.totalSales,""],["Total Disbursement","","","","","",O.totalDisbursement,""],["Profit","","","","","",L,""]]},profit:L}}function ia(e,t){return`<button class="nav-link ${t?"is-active":""}" data-tab="${e}" type="button">
    <span class="nav-icon">${oa(e)}</span>
    <span>${De[e]}</span>
  </button>`}function D(e,t){return`<div class="section-head"><div><h2>${u(e)}</h2><p class="meta">${u(t)}</p></div></div>`}function We(){return De[m.tab]??"Dashboard"}function we(e){return(e?.name??"Laba101").trim().slice(0,1).toUpperCase()}function oa(e){return{dashboard:"DB",orders:"PO",archived:"AR",customers:"CU",pricing:"PS",disbursements:"DR",reports:"RP",inventory:"IN",maintenance:"MT",staff:"ST",revolving:"RV",settings:"SE"}[e]}async function ca(){const e=await pe(),t=await qt(e),a=await Ge(),s=await kt(),r=await Re(),n=await Mt(),o=await Ye(),i=await ge(e),c=await Xt(),l=await Ht(),g=await Vt(),v=await Jt(),f=await ze(e),y=await ea(e),b=await It(),p=await He("report_email");return{branch:e,staff:t,allStaff:a,customers:s,services:r,allServices:n,categories:o,orders:i,payments:c,foldLogs:l,expenses:g,sales:v,machines:f,subcleanings:y,foldRate:b,reportEmail:p??""}}async function w(){if(!m.currentUser){la(),Ta();return}const e=await ca();e.orders.filter(a=>a.status!=="claimed").length,e.orders.filter(a=>a.status==="ready").length,e.orders.reduce((a,s)=>a+s.paidAmount,0);const t=e.orders.filter(a=>se(a.createdAt)===j()).reduce((a,s)=>a+s.paidAmount,0);e.sales.reduce((a,s)=>a+s.totalAmount,0),e.expenses.reduce((a,s)=>a+s.amount,0),Oe.innerHTML=`
    <div class="app-frame">
      <header class="topbar">
        <div class="topbar-left">
          <img src="/laba101-logo.svg" alt="Laba101" class="topbar-logo" />
          <div>
            <p class="eyebrow">Offline mobile system</p>
            <h1>${u(We())}</h1>
          </div>
        </div>
        <div class="topbar-actions">
          <div class="branch-pill"><span>Branch</span><strong>${u(e.branch)}</strong></div>
          <button class="icon-button" type="button" aria-label="Notifications">!</button>
          <button class="profile-pill" type="button">
            <span>${we(m.currentUser)}</span>
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
        <nav>${et().map(a=>ia(a,m.tab===a)).join("")}</nav>
        <div class="sidebar-fill">
          <div class="sidebar-branch-badge">
            <span>Active Branch</span>
            <strong>${u(e.branch)}</strong>
          </div>
          <p class="sidebar-app-name">Laba101 POS</p>
        </div>
        <div class="sidebar-user">
          <span class="avatar">${we(m.currentUser)}</span>
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
            <h2>${u(We())}</h2>
          </div>
          <div class="navbar-time">
            <strong data-navbar-time>--:--</strong>
            <span data-navbar-date>Loading...</span>
          </div>
          <button class="mobile-avatar" type="button">${we(m.currentUser)}</button>
        </header>

        ${m.tab==="dashboard"?ua({paidToday:t,orders:e.orders}):""}
        ${m.tab==="orders"?ma(e.orders,e.customers,e.services,e.categories,e.staff,e.payments,e.branch):""}
        ${m.tab==="archived"?va(e.orders,e.staff,e.services,e.payments):""}
        ${m.tab==="customers"?fa(e.customers,e.orders):""}
        ${m.tab==="pricing"?ha(e.allServices,e.categories):""}
        ${m.tab==="disbursements"?pa(e.expenses,e.sales):""}
        ${m.tab==="reports"?ga(e.orders,e.sales,e.expenses,e.foldRate):""}
        ${m.tab==="inventory"?ya(e.services,e.categories):""}
        ${m.tab==="maintenance"?ba(e.machines,e.subcleanings,e.branch):""}
        ${m.tab==="staff"?Ea(e.allStaff,e.branch):""}
        ${m.tab==="revolving"?Ia(e.sales):""}
        ${m.tab==="settings"?wa(e.branch,e.foldRate,e.reportEmail):""}
      </main>
    </div>
  `,Sa(),Aa(e),La(e.allServices),Ca(),$a(e.orders,e.sales,e.expenses,e.foldRate),Ra(),Oa(),Da(),xa(e.allStaff),qa(),Pa(),Na()}function et(){return m.currentUser?.role==="admin"?Object.keys(De).filter(e=>e!=="inventory"):["orders","archived","disbursements","reports","maintenance","revolving"]}function la(){Oe.innerHTML=`
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
  `}function da(){document.querySelectorAll("[data-fill-email]").forEach(e=>{e.addEventListener("click",()=>{const t=document.querySelector('input[name="email"]'),a=document.querySelector('input[name="password"]');t&&(t.value=e.dataset.fillEmail??""),a&&(a.value=e.dataset.fillPassword??"")})})}function ua(e){const t=new Date,a=Array.from({length:7},(o,i)=>{const c=new Date(t);return c.setDate(t.getDate()-(6-i)),new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric"}).format(c)}),s=Array.from({length:7},(o,i)=>{const c=new Date(t);c.setDate(t.getDate()-(6-i));const l=ae(c);return e.orders.filter(g=>se(g.createdAt)===l).reduce((g,v)=>g+v.paidAmount,0)}),r=Math.max(1,...s),n=210;return`
    <section class="dashboard-main">
      <article class="panel revenue-panel">
        ${D("Revenue overview","Paid amount for the last 7 days.")}
        <div class="stats compact dashboard-stats">
          <div class="stat"><span class="card-label">Paid Today</span><div class="value">${C(e.paidToday)}</div></div>
        </div>
        <div class="chart-shell">
          <div class="mini-chart revenue-chart">
            ${s.map((o,i)=>{const c=Math.max(12,Math.round(o/r*n));return`<div class="chart-bar ${i===s.length-1?"is-today":""}"><span style="height:${c}px"></span><strong>${C(o)}</strong></div>`}).join("")}
          </div>
          <div class="chart-days">${a.map(o=>`<span>${u(o)}</span>`).join("")}</div>
        </div>
        <div class="chart-footnote">Values are based on order payments for the last 7 days.</div>
      </article>
    </section>
  `}function ma(e,t,a,s,r,n,o){const i=a.filter(d=>d.serviceType==="order"&&d.isActive),c=a.filter(d=>d.serviceType==="addon"&&d.isActive),l=m.receiptOrderId?e.find(d=>d.id===m.receiptOrderId):null,g=e.filter(d=>d.status!=="claimed"),v=m.orderSearch.trim().toLowerCase(),f=m.orderDateFilter.trim(),y=g.filter(d=>{const $=!v||[d.ticket,d.customer,d.phone,d.service,d.itemCategory,d.status].some(L=>String(L??"").toLowerCase().includes(v)),A=!f||se(d.createdAt)===f;return $&&A}),b=new Set(e.map(d=>d.customerId)),p=t.filter(d=>b.has(d.id));return`
    <section class="grid content full">
      <article class="panel">
        ${D("New POS order","Customer, service, weight, add-ons, and initial payment")}
        <form id="order-form" class="form">
          <div class="form-row">
            <label>Existing customer (${u(o)})
              <select name="customerId">
                <option value="">-- New customer --</option>
                ${p.map(d=>`<option value="${d.id}" data-name="${u(d.name)}" data-phone="${u(d.phone??"")}">${u(d.name)} ${d.phone?`- ${u(d.phone)}`:""}</option>`).join("")}
              </select>
            </label>
            <label>Customer name<input name="customerName" required placeholder="Customer name" /></label>
          </div>
          <div class="form-row">
            <label>Phone<input name="customerPhone" placeholder="09..." /></label>
          </div>

          <label>Service
            <select name="serviceId" required>
              ${i.map(d=>`<option value="${d.id}">${u(d.name)} - ${C(d.price)}</option>`).join("")}
            </select>
          </label>
          <label>Item category
            <select name="itemCategoryId" required>
              ${s.map(d=>`<option value="${d.id}">${u(d.name)} max ${d.maxKg}kg</option>`).join("")}
            </select>
            <span class="field-hint" data-category-weight></span>
          </label>
          <label>Weight (KG)<input name="weightKg" type="number" min="0.25" max="200" step="0.01" value="1" required /></label>

          <fieldset class="check-grid">
            <legend>Extra services</legend>
            ${c.length?c.map(d=>`<label class="check"><input type="checkbox" name="addonIds" value="${d.id}" /> ${u(ye(d.name))} ${C(d.price)}</label>`).join(""):'<p class="helper">No extra services configured.</p>'}
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
        ${D("Order queue","Workflow, payment, and receipts")}
        <form class="queue-filters" id="order-queue-filters">
          <label>
            <span>Search queue</span>
            <input name="orderSearch" type="search" placeholder="Ticket, name, service, status" value="${u(m.orderSearch)}" autocomplete="off" />
          </label>
          <label>
            <span>Filter date</span>
            <input name="orderDateFilter" type="date" value="${u(m.orderDateFilter)}" />
          </label>
          <div class="search-actions queue-actions">
            <button class="primary" type="submit">Apply</button>
            <button class="secondary" type="button" id="order-queue-clear">Clear</button>
          </div>
        </form>
        <div class="summary-list queue-summary">
          <div><span>Active queue</span><strong>${y.length}</strong></div>
          <div><span>Claimed archived</span><strong>${e.filter(d=>d.status==="claimed").length}</strong></div>
        </div>
        <div class="table orders-table">
          <div class="table-head"><div>Ticket</div><div>Customer</div><div>Total</div><div>Status</div><div>Actions</div></div>
          ${y.map(d=>tt(d,r,a)).join("")||'<div class="helper">No matching active orders.</div>'}
        </div>
      </article>
      ${l?at(l,n.filter(d=>d.orderId===l.id)):""}
    </section>
  `}function va(e,t,a,s){const r=e.filter(c=>c.status==="claimed"),n=m.archivedOrderSearch.trim().toLowerCase(),o=r.filter(c=>n?[c.ticket,c.customer,c.phone,c.service,c.itemCategory].some(l=>String(l??"").toLowerCase().includes(n)):!0),i=m.receiptOrderId?e.find(c=>c.id===m.receiptOrderId):null;return`
    <section class="grid content full">
      <article class="panel span-2">
        ${D("Archived orders","All claimed orders are listed here")}
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
          <div><span>Archived claims</span><strong>${o.length}</strong></div>
          <div><span>Total claimed</span><strong>${r.length}</strong></div>
        </div>
        <div class="table orders-table archived-orders-table">
          <div class="table-head"><div>Ticket</div><div>Customer</div><div>Total</div><div>Status</div><div>Actions</div></div>
          ${o.map(c=>tt(c,t,a)).join("")||'<div class="helper">No archived orders found.</div>'}
        </div>
      </article>
      ${i?at(i,s.filter(c=>c.orderId===i.id)):""}
    </section>
  `}function tt(e,t,a){const s=Je(e,a),r=s.find(i=>!e.workflowCompleted.includes(i.key)),n=r?.key==="fold",o=r?.key==="extras"&&e.extras.length>0;return`
    <div class="table-row">
      <div><strong>${u(e.ticket)}</strong><div class="small">${u(e.service)} / ${u(e.itemCategory)}</div></div>
      <div>${u(e.customer)}<div class="small">${u(e.phone??"")}</div></div>
      <div class="amount-cell"><strong>${C(e.totalAmount)}</strong><div class="small">Paid ${C(e.paidAmount)} / Bal ${C(e.balance)}</div></div>
      <div>
        <div class="${e.status==="ready"||e.status==="claimed"?"ok":"warn"}">${u(e.status)}</div>
        <div class="workflow-progress">
          ${s.map(i=>`<span class="${e.workflowCompleted.includes(i.key)?"is-done":r?.key===i.key?"is-next":""}">${u(i.label)}</span>`).join("")}
        </div>
      </div>
      <div class="row-actions">
        ${r?`<form class="inline-form advance-form" data-order-id="${e.id}">
          ${o?`<div class="extra-confirmation">Confirm extra service: <strong>${e.extras.map(i=>u(ye(i.name))).join(", ")}</strong></div>`:""}
          ${n?`<select name="assignedStaffId" required>
            <option value="">Staff</option>
            ${t.map(i=>`<option value="${i.id}">${u(i.name)}</option>`).join("")}
          </select>`:""}
          <button class="secondary" type="submit">Next: ${u(r.label)}</button>
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
  `}function at(e,t){const a=t.reduce((r,n)=>r+Number(n.amount),0),s=Math.max(0,Number((a-e.totalAmount).toFixed(2)));return`
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="receipt-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-print-receipt>Print</button>
          <button class="secondary" type="button" data-close-receipt>Close</button>
        </div>
        <div class="receipt" id="receipt-print-area">
          <div class="receipt-head">
            <h3 id="receipt-title">Laba101</h3>
            <p>${u(e.ticket)}<br>${u(Ae(e.createdAt))}</p>
          </div>
          <div class="receipt-customer">
            <strong>${u(e.customer)}</strong>
            <span>${u(e.phone??"No phone")}</span>
          </div>
          <div class="summary-list receipt-lines">
            <div><span>Service</span><strong>${u(e.service)}</strong></div>
            <div><span>Category</span><strong>${u(e.itemCategory)}</strong></div>
            <div><span>Weight</span><strong>${e.weightKg} kg</strong></div>
            ${e.extras.length?`<div><span>Extra services</span><strong>${e.extras.map(r=>u(ye(r.name))).join(", ")}</strong></div>`:""}
            <div><span>Total</span><strong>${C(e.totalAmount)}</strong></div>
            <div><span>Tendered</span><strong>${C(a)}</strong></div>
            <div><span>Paid</span><strong>${C(e.paidAmount)}</strong></div>
            <div><span>Change</span><strong>${C(s)}</strong></div>
            <div><span>Balance</span><strong>${C(e.balance)}</strong></div>
          </div>
          <h3>Payments</h3>
          <div class="receipt-payments">
            ${t.map(r=>`<div><span>${u(r.method.toUpperCase())}</span><strong>${C(r.amount)}</strong>${r.reference?`<small>Ref ${u(r.reference)}</small>`:""}</div>`).join("")||'<p class="helper">No payments yet.</p>'}
          </div>
        </div>
      </div>
    </div>
  `}function fa(e,t){const a=m.customerSearch.trim().toLowerCase(),s=e.filter(r=>a?r.name.toLowerCase().includes(a):!1);return`
    <section class="grid content full">
      <article class="panel">
        ${D("Customer Management","Customer records from local offline storage")}
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
        ${D("Customer list","Names, phones, addresses, and order history")}
        <div class="customer-stack">
          ${a?s.map(r=>{const n=t.filter(o=>o.customerId===r.id);return`
              <article class="customer-card">
                <header>
                  <div>
                    <strong>${u(r.name)}</strong>
                    <p>${u(r.phone??"No phone")} · ${u(r.address??"No address")}</p>
                  </div>
                  <span>${n.length} order(s)</span>
                </header>
                <div class="customer-orders">
                  ${n.length?n.map(o=>`
                    <div class="customer-order-row">
                      <div>
                        <strong>${u(o.ticket)}</strong>
                        <span>${u(o.service)} · ${u(o.itemCategory)}</span>
                      </div>
                      <div>
                        <strong>${C(o.totalAmount)}</strong>
                        <span>${u(o.status)}</span>
                      </div>
                    </div>`).join(""):'<p class="helper">No order records yet.</p>'}
                </div>
              </article>`}).join(""):'<div class="helper">Search a customer name to display matching records and their order history.</div>'}
        </div>
      </article>
    </section>
  `}function ha(e,t){return`
    <section class="grid content full">
      <article class="panel">
        ${D("Services","Order services and add-ons used by POS pricing")}
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
            ${sa.map(a=>`<label class="check"><input type="checkbox" name="includes" value="${a}" /> ${a}</label>`).join("")}
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
        ${D("Item categories","Load limits and extra fees")}
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
                <div><span>price:</span><strong>${C(a.price)}</strong></div>
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
  `}function pa(e,t){const a=j(),s=a.slice(0,7),r=e.filter(c=>c.expenseDate===a).reduce((c,l)=>c+l.amount,0),n=e.filter(c=>c.expenseDate.startsWith(s)).reduce((c,l)=>c+l.amount,0),o=t.filter(c=>c.saleDate===a).reduce((c,l)=>c+l.totalAmount,0),i=t.filter(c=>c.saleDate.startsWith(s)).reduce((c,l)=>c+l.totalAmount,0);return`
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
      <div class="panel stat"><div class="card-label">Daily disbursement</div><div class="value">${C(r)}</div></div>
      <div class="panel stat"><div class="card-label">Monthly disbursement</div><div class="value">${C(n)}</div></div>
      <div class="panel stat"><div class="card-label">Today sales input</div><div class="value">${C(o)}</div></div>
      <div class="panel stat"><div class="card-label">Month sales input</div><div class="value">${C(i)}</div></div>
    </section>
    ${m.dailyReportTab==="expenses"?`
    <section class="grid content full">
      <article class="panel">
        ${D("Input disbursement","Supplies, utilities, and cash disbursements")}
        <form id="expense-form" class="form">
          <div class="form-row"><label>Date<input name="expenseDate" type="date" value="${j()}" required /></label><label>Amount<input name="amount" type="number" min="0" step="0.01" required /></label></div>
          <div class="form-row"><label>Name<input name="name" required /></label><label>Category<input name="category" required /></label></div>
          <label>Description<textarea name="description"></textarea></label>
          <button class="primary" type="submit">Save expense</button>
        </form>
      </article>
      <article class="panel">
        ${D("Disbursement list","Expenses only")}
        <div class="table">
          <div class="table-head"><div>Date</div><div>No.</div><div>Name</div><div>Category</div><div>Amount</div></div>
          ${e.map(c=>`<div class="table-row"><div>${u(c.expenseDate)}</div><div>${u(c.number)}</div><div>${u(c.name)}</div><div>${u(c.category)}</div><div>${C(c.amount)}</div></div>`).join("")||'<div class="helper">No expenses yet.</div>'}
        </div>
      </article>
    </section>
    `:`
    <section class="grid content full">
      <article class="panel">
        ${D("Input total sale","Manual cash and GCash totals")}
        <form id="sales-form" class="form">
          <label>Date<input name="saleDate" type="date" value="${j()}" required /></label>
          <label>Cash sales<input name="cashAmount" type="number" min="0" step="0.01" value="0" /></label>
          <label>GCash sales<input name="gcashAmount" type="number" min="0" step="0.01" value="0" /></label>
          <label>Notes<textarea name="notes" placeholder="Optional"></textarea></label>
          <button class="primary" type="submit">Save daily sale</button>
        </form>
      </article>
      <article class="panel">
        ${D("Daily sales history","Cash, GCash, total sale, notes, and updates")}
        <div class="table wide-table">
          <div class="table-head"><div>Sales #</div><div>Date</div><div>Cash</div><div>GCash</div><div>Total sale</div></div>
          ${t.map(c=>`<div class="table-row"><div>${u(c.saleNumber)}</div><div>${u(c.saleDate)}</div><div>${C(c.cashAmount)}</div><div>${C(c.gcashAmount)}</div><div><strong>${C(c.totalAmount)}</strong></div></div>`).join("")||'<div class="helper">No daily sales totals yet.</div>'}
        </div>
      </article>
    </section>
    `}
  `}function ga(e,t,a,s,r,n,o){const i=m.reportPreview?Ze(e,t,a,s,m.reportPreview):null;return`
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
    ${i?`
      <section class="panel report-preview">
        ${i.selectedTypes.has("sales")?`
          <article>
            ${D("Sales report preview",`${i.selection.from} to ${i.selection.to}`)}
            <div class="table wide-table report-preview-table">
              <div class="table-head report-table-head"><div>Type</div><div>Date</div><div>Number</div><div>Name</div><div>Cash</div><div>GCash</div><div>Total</div><div>Balance</div></div>
              ${i.salesRows().rows.slice(1).map(c=>`<div class="table-row report-table-row">${c.map(l=>`<div>${u(l??"")}</div>`).join("")}</div>`).join("")}
            </div>
          </article>`:""}
        ${i.selectedTypes.has("disbursement")?`
          <article>
            ${D("Disbursement preview",`${i.selection.from} to ${i.selection.to}`)}
            <div class="table wide-table report-preview-table">
              <div class="table-head report-table-head"><div>Type</div><div>Date</div><div>Number</div><div>Name</div><div>Cash</div><div>GCash</div><div>Total</div><div>Balance</div></div>
              ${i.disbursementRows().rows.slice(1).map(c=>`<div class="table-row report-table-row">${c.map(l=>`<div>${u(l??"")}</div>`).join("")}</div>`).join("")}
            </div>
          </article>`:""}
        ${i.selectedTypes.has("fold_count")?`
          <article>
            ${D("Fold Count preview",`${i.selection.from} to ${i.selection.to}`)}
            <div class="table report-preview-table">
              <div class="table-head"><div>Staff</div><div>Fold Count</div></div>
              ${i.foldCountRows().rows.slice(1).map(c=>`<div class="table-row">${c.map(l=>`<div>${u(l??"")}</div>`).join("")}</div>`).join("")}
            </div>
          </article>`:""}
        ${i.selectedTypes.has("summary")?`
          <article>
            ${D("Summary preview",`${i.selection.from} to ${i.selection.to}`)}
            <div class="summary-list report-summary-list">
              ${i.summaryRows().map(c=>`<div><span>${u(c[0])}</span><strong>${u(String(c[6]??"0"))}</strong></div>`).join("")}
            </div>
          </article>`:""}
      </section>
    `:""}
  `}function ya(e,t){return`
    <section class="grid content full">
      <article class="panel">
        ${D("Inventory","Service catalog and item load limits")}
        <div class="summary-list">
          <div><span>Active services</span><strong>${e.filter(a=>a.isActive).length}</strong></div>
          <div><span>Item categories</span><strong>${t.length}</strong></div>
        </div>
      </article>
      <article class="panel">
        ${D("Service inventory","Current sellable laundry services")}
        <div class="table">
          <div class="table-head"><div>Name</div><div>Category</div><div>Price</div><div>Max KG</div><div>Status</div></div>
          ${e.map(a=>`<div class="table-row"><div><strong>${u(a.name)}</strong></div><div>${u(a.category)}</div><div>${C(a.price)}</div><div>${a.maxKg} kg</div><div>${a.isActive?"Active":"Inactive"}</div></div>`).join("")}
        </div>
      </article>
    </section>
  `}function ba(e,t,a){const s=e.filter(n=>n.status!=="under_cleaning"),r=e.filter(n=>n.status==="under_cleaning");return`
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
        ${D("Available Machines","Select machines to start cleaning.")}
        <form id="subcleaning-form" class="form">
          <input type="hidden" name="date" value="${j()}" />
          <fieldset class="machine-list">
            ${s.map(n=>`<label class="machine-card"><input type="checkbox" name="machineIds" value="${n.id}" /><span><strong>${u(n.machineName)}</strong><small>${u(n.machineType)}</small></span><em></em></label>`).join("")||'<p class="helper">All machines are currently being cleaned.</p>'}
          </fieldset>
          <input type="hidden" name="cleaningStatus" value="in_progress" />
          <label>Notes <textarea name="notes" placeholder="e.g. Deep clean filters"></textarea></label>
          <input type="hidden" name="branch" value="${u(a)}" />
          <button class="primary" type="submit">Start Cleaning</button>
        </form>
      </article>
      <article class="panel warning-panel">
        ${D("Under Cleaning","Machines currently being serviced.")}
        <div class="machine-stack">
          ${r.length?r.map(n=>`
            <div class="machine-status">
              <span><strong>${u(n.machineName)}</strong><small>${u(n.machineType)}</small></span>
              <b>In progress</b>
              <button class="secondary complete-cleaning-btn" type="button" data-machine-id="${n.id}" data-branch="${u(a)}">Mark Complete</button>
            </div>`).join(""):'<p class="helper">No machines under cleaning right now.</p>'}
        </div>
      </article>
      <article class="panel span-2">
        ${D("Daily Cleaning Checklist","Track which machines have been cleaned today.")}
        <div class="table">
          <div class="table-head"><div>Machine</div><div>Type</div><div>Status</div><div>Notes</div><div>Date</div></div>
          ${e.map(n=>{const o=t.find(i=>i.machineIds.includes(n.id)&&i.date===j());return`<div class="table-row"><div><strong>${u(n.machineName)}</strong></div><div>${u(n.machineType)}</div><div>${o?u(o.cleaningStatus.replace("_"," ")):"Not Cleaned"}</div><div>${u(o?.notes??"-")}</div><div>${j()}</div></div>`}).join("")}
        </div>
      </article>
    </section>
    `:`
    <section class="grid content full">
      <article class="panel">
        ${D("Add Machine","Create washer and dryer records")}
        <form id="machine-form" class="form">
          <label>Machine Name<input name="machineName" required placeholder="e.g. Washer 5" /></label>
          <label>Type<select name="machineType"><option value="washer">Washer</option><option value="dryer">Dryer</option></select></label>
          <label>Status<select name="status"><option value="available">Available</option><option value="under_cleaning">Under Cleaning</option><option value="maintenance">Maintenance</option></select></label>
          <input type="hidden" name="branch" value="${u(a)}" />
          <button class="primary" type="submit">Add machine</button>
        </form>
      </article>
      <article class="panel">
        ${D("Machines","Washer and dryer status")}
        <div class="table">
          <div class="table-head"><div>Name</div><div>Type</div><div>Status</div><div>Branch</div><div>Actions</div></div>
          ${e.map(n=>`<div class="table-row"><div><strong>${u(n.machineName)}</strong></div><div>${u(n.machineType)}</div><div>${u(n.status.replace("_"," "))}</div><div>${u(n.branch)}</div>
          <div class="row-actions">
            ${n.status!=="inactive"?`<button class="secondary deactivate-machine-btn" data-id="${n.id}">Deactivate</button>`:`<button class="secondary activate-machine-btn" data-id="${n.id}">Activate</button>`}
          </div></div>`).join("")||'<div class="helper">No machines found.</div>'}
        </div>
      </article>
    </section>
    `}
  `}function Ea(e,t){return`
    <section class="grid">
      <div class="page-head">
        <div>
          <p class="eyebrow">Team Management</p>
          <h2>Staff Overview</h2>
        </div>
        <button class="primary" id="open-add-staff-modal" type="button">+ Add staff</button>
      </div>

      <article class="panel">
        ${D("Staff list","Branch: "+u(t))}
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
  `}function wa(e,t,a){return`
    <section class="grid content full">
      <article class="panel">
        ${D("Settings","Device-local configuration")}
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
  `}function Sa(){const e=()=>{localStorage.removeItem(te),m.currentUser=null,m.tab="dashboard",m.receiptOrderId=0,m.sidebarOpen=!1,w()};document.querySelector("#logout-button")?.addEventListener("click",e),document.querySelector("#mobile-logout-button")?.addEventListener("click",e),document.querySelector("#mobile-menu-button")?.addEventListener("click",()=>{m.sidebarOpen=!0,w()}),document.querySelector("#sidebar-close-button")?.addEventListener("click",()=>{m.sidebarOpen=!1,w()}),document.querySelector("#sidebar-backdrop")?.addEventListener("click",()=>{m.sidebarOpen=!1,w()}),document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{m.tab=t.dataset.tab,m.receiptOrderId=0,m.sidebarOpen=!1,w()})}),document.querySelectorAll("[data-quick-tab]").forEach(t=>{t.addEventListener("click",()=>{m.tab=t.dataset.quickTab,w()})}),document.querySelectorAll("[data-receipt]").forEach(t=>{t.addEventListener("click",()=>{m.receiptOrderId=Number(t.dataset.receipt),w()})}),document.querySelector("[data-close-receipt]")?.addEventListener("click",()=>{m.receiptOrderId=0,w()}),document.querySelector("[data-print-receipt]")?.addEventListener("click",()=>{window.print()}),document.querySelectorAll("[data-report-tab]").forEach(t=>{t.addEventListener("click",()=>{m.dailyReportTab=t.dataset.reportTab,w()})}),document.querySelectorAll("[data-maintenance-tab]").forEach(t=>{t.addEventListener("click",()=>{m.maintenanceTab=t.dataset.maintenanceTab,w()})})}function Ta(){da(),document.querySelector("#login-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget),a=document.querySelector("#login-button");a&&(a.disabled=!0,a.textContent="Signing in...");try{const s=await Ve(String(t.get("email")??""),String(t.get("password")??""));if(!s){m.loginError="Invalid email or password.",await w();return}m.currentUser=s,m.loginError="",await le("branch",String(s.branch||"Main Store")),t.get("remember")?localStorage.setItem(te,JSON.stringify({email:s.email,remembered:!0})):localStorage.removeItem(te),et().includes(m.tab)||(m.tab="dashboard"),await w()}catch(s){alert("Login Error: "+String(s?.message||s)),a&&(a.disabled=!1,a.textContent="Sign in")}})}function Na(){oe&&window.clearInterval(oe);const e=document.querySelector("[data-navbar-time]"),t=document.querySelector("[data-navbar-date]");if(!e||!t){oe=void 0;return}const a=()=>{const s=na();e.textContent=s.time,t.textContent=s.date};a(),oe=window.setInterval(a,1e3)}function Aa(e){const t=document.querySelector("#order-form"),a=document.querySelector("#price-preview"),s=t?.querySelector('button[type="submit"]'),r=t?.querySelector('select[name="customerId"]'),n=t?.querySelector('input[name="customerName"]'),o=t?.querySelector('input[name="customerPhone"]'),i=t?.querySelector("[data-category-weight]"),c=t?.querySelector("[data-order-error]"),l=t?.querySelector('select[name="paymentMethod"]'),g=t?.querySelector(".gcash-reference"),v=t?.querySelector('input[name="paymentReference"]'),f=()=>{if(!r||!n||!o)return;const p=r.selectedOptions[0];n.value=p?.dataset.name??"",o.value=p?.dataset.phone??""},y=()=>{const p=l?.value==="gcash";g&&(g.hidden=!p),v&&(v.required=p,p||(v.value=""))},b=()=>{if(!t||!a)return;const p=new FormData(t),d=e.services.find(P=>P.id===Number(p.get("serviceId"))),$=e.categories.find(P=>P.id===Number(p.get("itemCategoryId"))),A=e.services.filter(P=>p.getAll("addonIds").map(Number).includes(P.id));if(!d||!$)return;const L=Ne(d,$,Number(p.get("weightKg")??0),A);i&&(i.textContent=`Allowed item weight: ${$.maxKg} kg`);const R=A.map(P=>ye(P.name)),q=L.extraKg>0;s&&(s.disabled=q),c&&(c.hidden=!q,c.textContent=L.warning??""),a.classList.toggle("has-error",q),a.innerHTML=`
      <div class="preview-line"><span>Base price</span><strong>${C(L.price)}</strong></div>
      ${L.extraServiceAmount>0?`<div class="preview-line"><span>Extra services${R.length?` (${u(R.join(", "))})`:""}</span><strong>${C(L.extraServiceAmount)}</strong></div>`:""}
      <div class="preview-total"><span>Total amount</span><strong>${C(L.totalAmount)}</strong></div>
      ${L.warning?`<span class="warn">${u(L.warning)}</span>`:""}
    `};r?.addEventListener("change",f),l?.addEventListener("change",y),y(),t?.addEventListener("input",b),t?.addEventListener("change",b),b(),t?.addEventListener("submit",async p=>{p.preventDefault();const d=new FormData(t),$=e.services.find(R=>R.id===Number(d.get("serviceId"))),A=e.categories.find(R=>R.id===Number(d.get("itemCategoryId"))),L=e.services.filter(R=>d.getAll("addonIds").map(Number).includes(R.id));if($&&A){const R=Ne($,A,Number(d.get("weightKg")??0),L);if(R.extraKg>0){c&&(c.hidden=!1,c.textContent=R.warning??"Weight exceeds the allowed limit.");return}}try{await _t({customerId:Number(d.get("customerId"))||void 0,customerName:String(d.get("customerName")??""),customerPhone:String(d.get("customerPhone")??"")||null,serviceId:Number(d.get("serviceId")),itemCategoryId:Number(d.get("itemCategoryId")),branch:e.branch,weightKg:Number(d.get("weightKg")),addonIds:d.getAll("addonIds").map(Number),paidAmount:Number(d.get("paidAmount")??0),paymentMethod:String(d.get("paymentMethod")??"cash"),paymentReference:String(d.get("paymentReference")??"")||null,notes:String(d.get("notes")??"")||null}),await w()}catch(R){c&&(c.hidden=!1,c.textContent=R instanceof Error?R.message:"Order could not be saved.")}}),document.querySelectorAll(".advance-form").forEach(p=>{p.addEventListener("submit",async d=>{d.preventDefault();const $=new FormData(p);await Kt(Number(p.dataset.orderId),Number($.get("assignedStaffId"))||null),await w()})}),document.querySelectorAll(".payment-form").forEach(p=>{const d=p.querySelector('select[name="method"]'),$=p.querySelector('input[name="reference"]'),A=()=>{const L=d?.value==="gcash";$&&($.hidden=!L,$.required=L,L||($.value=""))};d?.addEventListener("change",A),A(),p.addEventListener("submit",async L=>{L.preventDefault();const R=new FormData(p);await Qe(Number(p.dataset.orderId),{amount:Number(R.get("amount")),method:String(R.get("method")),reference:String(R.get("reference")??"")||null}),await w()})})}function La(e){document.querySelector("#service-form")?.addEventListener("submit",async t=>{t.preventDefault();const a=new FormData(t.currentTarget),s=a.get("id")?Number(a.get("id")):void 0;await Be({id:s,name:String(a.get("name")??""),description:String(a.get("description")??"")||null,category:String(a.get("category")??""),serviceType:String(a.get("serviceType")??"order"),price:Number(a.get("price")??0),maxKg:Number(a.get("maxKg")??0),dryingMinutes:Number(a.get("dryingMinutes"))||null,includes:a.getAll("includes").map(String).filter(Boolean),additionalCharge:0,turnaroundHours:Number(a.get("turnaroundHours")??24),isActive:1}),await w()}),document.querySelectorAll(".edit-service-btn").forEach(t=>{t.addEventListener("click",()=>{const a=Number(t.dataset.id),s=e.find(n=>n.id===a),r=document.querySelector("#service-form");s&&r&&(r.querySelector("[name=id]").value=String(s.id),r.querySelector("[name=name]").value=s.name,r.querySelector("[name=category]").value=s.category,r.querySelector("[name=serviceType]").value=s.serviceType,r.querySelector("[name=price]").value=String(s.price),r.querySelector("[name=maxKg]").value=String(s.maxKg),r.querySelector("[name=dryingMinutes]").value=s.dryingMinutes?String(s.dryingMinutes):"",r.querySelectorAll('input[name="includes"]').forEach(n=>{n.checked=s.includes.includes(n.value)}),r.querySelector("[name=turnaroundHours]").value=String(s.turnaroundHours),r.querySelector("[name=description]").value=s.description??"",window.scrollTo({top:0,behavior:"smooth"}))})}),document.querySelectorAll(".deactivate-service-btn, .activate-service-btn").forEach(t=>{t.addEventListener("click",async()=>{const a=Number(t.dataset.id),s=e.find(r=>r.id===a);if(s){const r=s.isActive?0:1;await Be({id:s.id,name:s.name,description:s.description,category:s.category,serviceType:s.serviceType,price:s.price,maxKg:s.maxKg,dryingMinutes:s.dryingMinutes,includes:s.includes,additionalCharge:s.additionalCharge,turnaroundHours:s.turnaroundHours,isActive:r}),await w()}})}),document.querySelector("#category-form")?.addEventListener("submit",async t=>{t.preventDefault();const a=new FormData(t.currentTarget);await jt({name:String(a.get("name")??""),maxKg:Number(a.get("maxKg")??0),additionalFee:Number(a.get("additionalFee")??0),isActive:1}),await w()})}function Ca(){document.querySelector("#expense-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await Yt({expenseDate:String(t.get("expenseDate")??""),name:String(t.get("name")??""),category:String(t.get("category")??""),description:String(t.get("description")??""),amount:Number(t.get("amount")??0)}),await w()}),document.querySelector("#fold-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await Gt({orderTicket:String(t.get("orderTicket")??""),staffName:String(t.get("staffName")??""),foldCount:Number(t.get("foldCount")??1),rate:Number(t.get("rate")??5)}),await w()})}function $a(e,t,a,s){document.querySelector("#generate-report")?.addEventListener("click",()=>{m.reportPreview=ce(),w()}),document.querySelector("#sales-form")?.addEventListener("submit",async v=>{v.preventDefault();const f=new FormData(v.currentTarget);await Qt({saleDate:String(f.get("saleDate")??""),cashAmount:Number(f.get("cashAmount")??0),gcashAmount:Number(f.get("gcashAmount")??0),notes:String(f.get("notes")??"")}),await w()});const r=document.querySelector("[data-date-from]"),n=document.querySelector("[data-date-to]");document.querySelectorAll("[data-date-scope]").forEach(v=>{v.addEventListener("change",()=>{if(!v.checked||!r||!n)return;const f=new Date,y=ae(f),b=new Date(f);v.value==="week"&&b.setDate(f.getDate()-6),v.value==="month"&&b.setDate(1),v.value!=="custom"&&(r.value=v.value==="today"?y:ae(b),n.value=y)})});const o=v=>{const f=p=>String(p??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;"),y=p=>p==="Sales Report"?[110,125,150,215,95,95,105,105]:p==="Disbursement"?[130,115,165,190,95,105,105,105]:p==="Fold Count"?[220,125]:[155,125,125,125,95,95,115,115];return`<?xml version="1.0"?>
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
  ${v.map(p=>{const d=y(p.name).map(A=>`<Column ss:Width="${A}" ss:AutoFitWidth="0"/>`).join(""),$=p.rows.map(A=>{if(!A.length)return'<Row ss:Height="10" ss:StyleID="BorderRow"><Cell ss:StyleID="BorderCell"><Data ss:Type="String">&nbsp;</Data></Cell></Row>';const L=A[0]==="Type"||A[0]==="Summary"||A[0]==="Sales Summary"||A[0]==="Disbursement Summary"||A[0]==="Staff",R=L?"HeaderRow":"BorderRow",q=L?"HeaderCell":"BorderCell",P=L?26:22,Y=A.map(h=>`<Cell ss:StyleID="${q}"><Data ss:Type="${typeof h=="number"?"Number":"String"}">${f(h)}</Data></Cell>`).join("");return`<Row ss:Height="${P}" ss:StyleID="${R}">${Y}</Row>`}).join("");return`
        <Worksheet ss:Name="${f(p.name)}">
          <Table>
            ${d}
            ${$}
          </Table>
        </Worksheet>`}).join("")}
</Workbook>`},i=()=>{const v=ce(),f=Ze(e,t,a,s,v),y=[];f.selectedTypes.has("sales")&&y.push({name:"Sales Report",rows:f.salesRows().rows}),f.selectedTypes.has("disbursement")&&y.push({name:"Disbursement",rows:f.disbursementRows().rows}),f.selectedTypes.has("fold_count")&&y.push({name:"Fold Count",rows:f.foldCountRows().rows}),f.selectedTypes.has("summary")&&y.push({name:"Summary",rows:f.summaryRows()});const b=o(y.length?y:[{name:"Summary",rows:f.summaryRows()}]),p=`laba101-report-${v.from}-to-${v.to}.xls`;return new File([b],p,{type:"application/vnd.ms-excel"})},c=async()=>{const v=i();if(!S.isNativePlatform())return{fileName:v.name,uri:""};const f=await v.text(),y=v.name;await ke.writeFile({path:y,data:f,directory:de.External,encoding:Se.UTF8});const{uri:b}=await ke.getUri({path:y,directory:de.External});return{fileName:v.name,uri:b}},l=()=>{const v=i(),f=ce(),y=`laba101-report-${f.from}-to-${f.to}.xls`,b=v,p=URL.createObjectURL(b),d=document.createElement("a");return d.href=p,d.download=y,document.body.appendChild(d),d.click(),setTimeout(()=>{d.remove(),URL.revokeObjectURL(p)},1e3),y},g=async v=>{const f=document.querySelector(v==="export"?"#export-report":"#email-report");f&&(f.disabled=!0,f.textContent=v==="export"?"Exporting...":"Sending...");try{if(v==="export")if(S.isNativePlatform()){const y=await c();alert(`Report exported as "${y.fileName}".`)}else{const y=l();alert(`Report saved: ${y}`)}else{const y=await He("report_email")||"";if(!y){alert("Please configure a report email in Settings first.");return}const b=ce(),p=`Laba101 report ${b.from} to ${b.to}`;if(S.isNativePlatform()){const d=await c();try{await yt.share({title:p,text:`Please find the attached Laba101 report file: ${d.fileName}`,files:[d.uri],dialogTitle:"Send report via email"}),alert(`Report saved and shared as "${d.fileName}".`)}catch($){const A=String($).toLowerCase();if(A.includes("share canceled")||A.includes("canceled"))alert(`Report saved as "${d.fileName}".`);else throw $}}else{const d=l(),$=`Hi,

Please find the attached Laba101 report file: ${d}

Date range: ${b.from} to ${b.to}`,A=`mailto:${y}?subject=${encodeURIComponent(p)}&body=${encodeURIComponent($)}`;setTimeout(()=>{window.location.href=A},800),alert(`Report downloaded as "${d}".
Your email app will open — please attach the file and send.`)}}}catch(y){alert("Failed: "+String(y))}finally{f&&(f.disabled=!1,f.textContent=v==="export"?"Export Excel":"Send to Email")}};document.querySelector("#export-report")?.addEventListener("click",async()=>{await g("export")}),document.querySelector("#email-report")?.addEventListener("click",async()=>{await g("email")})}function Ra(){document.querySelector("#order-queue-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);m.orderSearch=String(t.get("orderSearch")??"").trim(),m.orderDateFilter=String(t.get("orderDateFilter")??"").trim(),w()}),document.querySelector("#order-queue-clear")?.addEventListener("click",()=>{m.orderSearch="",m.orderDateFilter="",w()}),document.querySelector("#archived-order-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);m.archivedOrderSearch=String(t.get("archivedOrderSearch")??"").trim(),w()}),document.querySelector("#archived-order-clear")?.addEventListener("click",()=>{m.archivedOrderSearch="",w()})}function Oa(){document.querySelector("#customer-search-form")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);m.customerSearch=String(t.get("customerSearch")??"").trim(),w()}),document.querySelector("#customer-search-clear")?.addEventListener("click",()=>{m.customerSearch="",w()})}function Da(){document.querySelector("#machine-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await zt({machineName:String(t.get("machineName")??""),machineType:String(t.get("machineType")),status:String(t.get("status")),branch:String(t.get("branch")??"")}),await w()}),document.querySelector("#subcleaning-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=e.currentTarget.querySelector('button[type="submit"]');t&&(t.disabled=!0,t.textContent="Starting...");const a=new FormData(e.currentTarget),s=a.getAll("machineIds").map(Number);if(!s.length){alert("Please select at least one machine to clean."),t&&(t.disabled=!1,t.textContent="Start Cleaning");return}await ta({date:String(a.get("date")??""),machineIds:s,cleaningStatus:String(a.get("cleaningStatus")??""),notes:String(a.get("notes")??""),branch:String(a.get("branch")??"")}),await w()}),document.querySelectorAll(".complete-cleaning-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.machineId),a=e.dataset.branch??"";e.disabled=!0,e.textContent="Completing...",await aa(t,a),await w()})}),document.querySelectorAll(".deactivate-machine-btn, .activate-machine-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.id),a=e.classList.contains("deactivate-machine-btn");await Zt(t,a?"inactive":"available"),await w()})})}function xa(e){const t=document.querySelector("#add-staff-modal"),a=document.querySelector("#open-add-staff-modal"),s=document.querySelector("#close-add-staff-modal"),r=document.querySelector("#staff-form"),n=()=>{r?.reset(),r&&(r.querySelector("[name=id]").value="");const i=document.querySelector("#add-staff-title");i&&(i.textContent="Add staff member"),t?.removeAttribute("hidden")},o=()=>{t?.setAttribute("hidden",""),r?.reset()};a?.addEventListener("click",n),s?.addEventListener("click",o),t?.addEventListener("click",i=>{i.target===t&&o()}),document.querySelectorAll(".edit-staff-btn").forEach(i=>{i.addEventListener("click",()=>{const c=Number(i.dataset.id),l=e.find(g=>g.id===c);if(l&&r){r.querySelector("[name=id]").value=String(l.id),r.querySelector("[name=name]").value=l.name,r.querySelector("[name=email]").value=l.email,r.querySelector("[name=password]").value=l.password,r.querySelector("[name=role]").value=l.role,r.querySelector("[name=branch]").value=l.branch;const g=document.querySelector("#add-staff-title");g&&(g.textContent="Edit staff member"),t?.removeAttribute("hidden")}})}),document.querySelectorAll(".deactivate-staff-btn, .activate-staff-btn").forEach(i=>{i.addEventListener("click",async()=>{const c=Number(i.dataset.id),l=e.find(g=>g.id===c);l&&(await je(c,{isActive:l.isActive!==0?0:1}),await w())})}),r?.addEventListener("submit",async i=>{i.preventDefault();const c=document.querySelector("#staff-save-btn");c&&(c.disabled=!0,c.textContent="Saving...");const l=new FormData(r),g=l.get("id")?Number(l.get("id")):void 0,v=String(l.get("name")??"").trim(),f=String(l.get("email")??"").trim(),y=String(l.get("password")??"password")||"password",b=String(l.get("role")),p=String(l.get("branch")??"");if(!v||!f){alert("Name and email are required."),c&&(c.disabled=!1,c.textContent="Save staff member");return}try{g?await je(g,{name:v,email:f,password:y,role:b,branch:p}):await Ft({name:v,email:f,password:y,role:b,branch:p}),o(),await w()}catch{alert("Failed to save staff. The email may already be in use."),c&&(c.disabled=!1,c.textContent="Save staff member")}})}function Pa(){document.querySelector("#settings-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await le("branch",String(t.get("branch")??"Main Store")),await le("fold_rate",String(t.get("foldRate")??"5")),String(t.get("reportEmail")??"")&&await le("report_email",String(t.get("reportEmail"))),alert("Settings saved successfully!"),await w()})}await Pt();const Ke=localStorage.getItem(te);if(Ke)try{const e=JSON.parse(Ke);if(e.email&&e.remembered){const t=await Ve(e.email,"password")??null;m.currentUser=t}}catch{localStorage.removeItem(te)}function Ia(e){const t=e.filter(a=>a.status==="revolving").reduce((a,s)=>a+s.cashAmount,0);return`
    <section class="grid content full">
      <article class="panel">
        <div style="background-color: #061a42; color: white; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
          <p style="font-size: 12px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin: 0 0 8px 0;">Revolving Fund Total</p>
          <p style="font-size: 32px; font-weight: 800; margin: 0;">${C(t)}</p>
        </div>
        ${D("Daily Summary","Daily sales history with status tracking")}
        
        <div class="table">
          <div class="table-head"><div>Date of Sales</div><div>Cash-on Hand</div><div>Status</div><div>Action</div></div>
          ${e.length===0?'<div class="helper">No daily sales found.</div>':""}
          ${e.map(a=>`
            <div class="table-row">
              <div><strong>${Ae(a.saleDate)}</strong></div>
              <div><strong style="color: #15803d;">${C(a.cashAmount)}</strong></div>
              <div>
                ${a.status==="revolving"?'<span class="ok">Revolving</span>':a.status==="endorsed"?`<span class="warn">Endorsed to ${u(a.endorsedTo)}</span>`:'<span class="meta">Pending</span>'}
              </div>
              <div class="row-actions">
                ${a.status!=="revolving"?`<button class="primary revolving-btn" data-id="${a.id}">Revolving</button>`:""}
                ${a.status!=="endorsed"?`<button class="secondary endorsed-btn" data-id="${a.id}" data-date="${Ae(a.saleDate)}">Endorsed</button>`:""}
              </div>
            </div>
          `).join("")}
        </div>
      </article>

      ${m.endorseModalOpen?`
        <div class="modal-backdrop" role="presentation">
          <div class="receipt-modal" role="dialog" aria-modal="true" style="max-width: 400px; width: 90%;">
            <form id="endorse-form" class="form" style="padding: 24px;">
              <h3 style="margin-top: 0;">Endorse Money</h3>
              <p class="meta" style="margin-bottom: 16px;">Endorsing cash from <strong>${u(m.endorseSaleDate)}</strong>.</p>
              
              <label>Endorsed to (Name)
                <input name="endorsedTo" type="text" placeholder="Enter name" required />
              </label>
              
              <div class="modal-actions" style="margin-top: 24px; padding: 0;">
                <button class="primary" type="submit">Submit Endorsement</button>
                <button class="secondary" type="button" id="close-endorse-modal">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      `:""}
    </section>
  `}function qa(){document.querySelectorAll(".revolving-btn").forEach(a=>{a.addEventListener("click",async()=>{const s=Number(a.dataset.id);await _e(s,"revolving"),await w()})}),document.querySelectorAll(".endorsed-btn").forEach(a=>{a.addEventListener("click",async()=>{m.endorseModalOpen=!0,m.endorseSaleId=Number(a.dataset.id),m.endorseSaleDate=a.dataset.date??"",await w()})});const e=document.getElementById("close-endorse-modal");e&&e.addEventListener("click",async()=>{m.endorseModalOpen=!1,await w()});const t=document.getElementById("endorse-form");t&&t.addEventListener("submit",async a=>{a.preventDefault();const s=new FormData(t),r=String(s.get("endorsedTo")??"").trim();r&&(await _e(m.endorseSaleId,"endorsed",r),m.endorseModalOpen=!1,await w())})}await w();export{Se as E,Le as W,dt as b};
