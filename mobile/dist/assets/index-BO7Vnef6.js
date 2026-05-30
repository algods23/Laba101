(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function a(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=a(r);fetch(r.href,s)}})();const Ve="modulepreload",Je=function(e){return"/"+e},$e={},Ee=function(t,a,n){let r=Promise.resolve();if(a&&a.length>0){let c=function(l){return Promise.all(l.map(p=>Promise.resolve(p).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),i=o?.nonce||o?.getAttribute("nonce");r=c(a.map(l=>{if(l=Je(l),l in $e)return;$e[l]=!0;const p=l.endsWith(".css"),h=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${h}`))return;const u=document.createElement("link");if(u.rel=p?"stylesheet":Ve,p||(u.as="script"),u.crossOrigin="",u.href=l,i&&u.setAttribute("nonce",i),document.head.appendChild(u),p)return new Promise((x,T)=>{u.addEventListener("load",x),u.addEventListener("error",()=>T(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(o){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=o,window.dispatchEvent(i),!i.defaultPrevented)throw o}return r.then(o=>{for(const i of o||[])i.status==="rejected"&&s(i.reason);return t().catch(s)})};var X;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(X||(X={}));class he extends Error{constructor(t,a,n){super(t),this.message=t,this.code=a,this.data=n}}const Qe=e=>{var t,a;return e?.androidBridge?"android":!((a=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},ze=e=>{const t=e.CapacitorCustomPlatform||null,a=e.Capacitor||{},n=a.Plugins=a.Plugins||{},r=()=>t!==null?t.name:Qe(e),s=()=>r()!=="web",o=h=>{const u=l.get(h);return!!(u?.platforms.has(r())||i(h))},i=h=>{var u;return(u=a.PluginHeaders)===null||u===void 0?void 0:u.find(x=>x.name===h)},c=h=>e.console.error(h),l=new Map,p=(h,u={})=>{const x=l.get(h);if(x)return console.warn(`Capacitor plugin "${h}" already registered. Cannot register plugins twice.`),x.proxy;const T=r(),m=i(h);let v;const b=async()=>(!v&&T in u?v=typeof u[T]=="function"?v=await u[T]():v=u[T]:t!==null&&!v&&"web"in u&&(v=typeof u.web=="function"?v=await u.web():v=u.web),v),L=(O,I)=>{var F,_;if(m){const B=m?.methods.find(U=>I===U.name);if(B)return B.rtype==="promise"?U=>a.nativePromise(h,I.toString(),U):(U,Z)=>a.nativeCallback(h,I.toString(),U,Z);if(O)return(F=O[I])===null||F===void 0?void 0:F.bind(O)}else{if(O)return(_=O[I])===null||_===void 0?void 0:_.bind(O);throw new he(`"${h}" plugin is not implemented on ${T}`,X.Unimplemented)}},N=O=>{let I;const F=(..._)=>{const B=b().then(U=>{const Z=L(U,O);if(Z){const ee=Z(..._);return I=ee?.remove,ee}else throw new he(`"${h}.${O}()" is not implemented on ${T}`,X.Unimplemented)});return O==="addListener"&&(B.remove=async()=>I()),B};return F.toString=()=>`${O.toString()}() { [capacitor code] }`,Object.defineProperty(F,"name",{value:O,writable:!1,configurable:!1}),F},y=N("addListener"),q=N("removeListener"),R=(O,I)=>{const F=y({eventName:O},I),_=async()=>{const U=await F;q({eventName:O,callbackId:U},I)},B=new Promise(U=>F.then(()=>U({remove:_})));return B.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await _()},B},g=new Proxy({},{get(O,I){switch(I){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return m?R:y;case"removeListener":return q;default:return N(I)}}});return n[h]=g,l.set(h,{name:h,proxy:g,platforms:new Set([...Object.keys(u),...m?[T]:[]])}),g};return a.convertFileSrc||(a.convertFileSrc=h=>h),a.getPlatform=r,a.handleError=c,a.isNativePlatform=s,a.isPluginAvailable=o,a.registerPlugin=p,a.Exception=he,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},Ze=e=>e.Capacitor=ze(e),E=Ze(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),Y=E.registerPlugin;class Se{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,a){let n=!1;this.listeners[t]||(this.listeners[t]=[],n=!0),this.listeners[t].push(a);const s=this.windowListeners[t];s&&!s.registered&&this.addWindowListener(s),n&&this.sendRetainedArgumentsForEvent(t);const o=async()=>this.removeListener(t,a);return Promise.resolve({remove:o})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,a,n){const r=this.listeners[t];if(!r){if(n){let s=this.retainedEventArguments[t];s||(s=[]),s.push(a),this.retainedEventArguments[t]=s}return}r.forEach(s=>s(a))}hasListeners(t){var a;return!!(!((a=this.listeners[t])===null||a===void 0)&&a.length)}registerWindowListener(t,a){this.windowListeners[a]={registered:!1,windowEventName:t,pluginEventName:a,handler:n=>{this.notifyListeners(a,n)}}}unimplemented(t="not implemented"){return new E.Exception(t,X.Unimplemented)}unavailable(t="not available"){return new E.Exception(t,X.Unavailable)}async removeListener(t,a){const n=this.listeners[t];if(!n)return;const r=n.indexOf(a);this.listeners[t].splice(r,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const a=this.retainedEventArguments[t];a&&(delete this.retainedEventArguments[t],a.forEach(n=>{this.notifyListeners(t,n)}))}}const Oe=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Re=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class et extends Se{async getCookies(){const t=document.cookie,a={};return t.split(";").forEach(n=>{if(n.length<=0)return;let[r,s]=n.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");r=Re(r).trim(),s=Re(s).trim(),a[r]=s}),a}async setCookie(t){try{const a=Oe(t.key),n=Oe(t.value),r=t.expires?`; expires=${t.expires.replace("expires=","")}`:"",s=(t.path||"/").replace("path=",""),o=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${a}=${n||""}${r}; path=${s}; ${o};`}catch(a){return Promise.reject(a)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const a of t)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}Y("CapacitorCookies",{web:()=>new et});const tt=async e=>new Promise((t,a)=>{const n=new FileReader;n.onload=()=>{const r=n.result;t(r.indexOf(",")>=0?r.split(",")[1]:r)},n.onerror=r=>a(r),n.readAsDataURL(e)}),at=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(r=>r.toLocaleLowerCase()).reduce((r,s,o)=>(r[s]=e[t[o]],r),{})},nt=(e,t=!0)=>e?Object.entries(e).reduce((n,r)=>{const[s,o]=r;let i,c;return Array.isArray(o)?(c="",o.forEach(l=>{i=t?encodeURIComponent(l):l,c+=`${s}=${i}&`}),c.slice(0,-1)):(i=t?encodeURIComponent(o):o,c=`${s}=${i}`),`${n}&${c}`},"").substr(1):null,st=(e,t={})=>{const a=Object.assign({method:e.method||"GET",headers:e.headers},t),r=at(e.headers)["content-type"]||"";if(typeof e.data=="string")a.body=e.data;else if(r.includes("application/x-www-form-urlencoded")){const s=new URLSearchParams;for(const[o,i]of Object.entries(e.data||{}))s.set(o,i);a.body=s.toString()}else if(r.includes("multipart/form-data")||e.data instanceof FormData){const s=new FormData;if(e.data instanceof FormData)e.data.forEach((i,c)=>{s.append(c,i)});else for(const i of Object.keys(e.data))s.append(i,e.data[i]);a.body=s;const o=new Headers(a.headers);o.delete("content-type"),a.headers=o}else(r.includes("application/json")||typeof e.data=="object")&&(a.body=JSON.stringify(e.data));return a};class rt extends Se{async request(t){const a=st(t,t.webFetchExtra),n=nt(t.params,t.shouldEncodeUrlParams),r=n?`${t.url}?${n}`:t.url,s=await fetch(r,a),o=s.headers.get("content-type")||"";let{responseType:i="text"}=s.ok?t:{};o.includes("application/json")&&(i="json");let c,l;switch(i){case"arraybuffer":case"blob":l=await s.blob(),c=await tt(l);break;case"json":c=await s.json();break;default:c=await s.text()}const p={};return s.headers.forEach((h,u)=>{p[u]=h}),{data:c,headers:p,status:s.status,url:s.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}Y("CapacitorHttp",{web:()=>new rt});var xe;(function(e){e.Dark="DARK",e.Light="LIGHT",e.Default="DEFAULT"})(xe||(xe={}));var Pe;(function(e){e.StatusBar="StatusBar",e.NavigationBar="NavigationBar"})(Pe||(Pe={}));class it extends Se{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}Y("SystemBars",{web:()=>new it});function ot(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,a){return new Proxy({},{get(n,r){return(s,o,i)=>{const c=e.Capacitor.Plugins[a];if(c===void 0){i(new Error(`Capacitor plugin ${a} not found`));return}if(typeof c[r]!="function"){i(new Error(`Method ${r} not found in Capacitor plugin ${a}`));return}(async()=>{try{const l=await c[r](s);o(l)}catch(l){i(l)}})()}}})}})}function ct(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,a){return e.cordova.plugins[a]}})}function lt(e=!1){typeof window>"u"||(window.CapacitorUtils=window.CapacitorUtils||{},window.Capacitor!==void 0&&!e?ot(window):window.cordova!==void 0&&ct(window))}var V;(function(e){e.Documents="DOCUMENTS",e.Data="DATA",e.Library="LIBRARY",e.Cache="CACHE",e.External="EXTERNAL",e.ExternalStorage="EXTERNAL_STORAGE",e.ExternalCache="EXTERNAL_CACHE",e.LibraryNoCloud="LIBRARY_NO_CLOUD",e.Temporary="TEMPORARY"})(V||(V={}));var ge;(function(e){e.UTF8="utf8",e.ASCII="ascii",e.UTF16="utf16"})(ge||(ge={}));const te=Y("Filesystem",{web:()=>Ee(()=>import("./web-BWuo2V_D.js"),[]).then(e=>new e.FilesystemWeb)});lt();const dt=Y("Share",{web:()=>Ee(()=>import("./web-iAzk4ref.js"),[]).then(e=>new e.ShareWeb)});class ut{constructor(t){this.sqlite=t,this._connectionDict=new Map}async initWebStore(){try{return await this.sqlite.initWebStore(),Promise.resolve()}catch(t){return Promise.reject(t)}}async saveToStore(t){try{return await this.sqlite.saveToStore({database:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async saveToLocalDisk(t){try{return await this.sqlite.saveToLocalDisk({database:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getFromLocalDiskToStore(t){const a=t??!0;try{return await this.sqlite.getFromLocalDiskToStore({overwrite:a}),Promise.resolve()}catch(n){return Promise.reject(n)}}async echo(t){try{const a=await this.sqlite.echo({value:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isSecretStored(){try{const t=await this.sqlite.isSecretStored();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async setEncryptionSecret(t){try{return await this.sqlite.setEncryptionSecret({passphrase:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async changeEncryptionSecret(t,a){try{return await this.sqlite.changeEncryptionSecret({passphrase:t,oldpassphrase:a}),Promise.resolve()}catch(n){return Promise.reject(n)}}async clearEncryptionSecret(){try{return await this.sqlite.clearEncryptionSecret(),Promise.resolve()}catch(t){return Promise.reject(t)}}async checkEncryptionSecret(t){try{const a=await this.sqlite.checkEncryptionSecret({passphrase:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async addUpgradeStatement(t,a){try{return t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.addUpgradeStatement({database:t,upgrade:a}),Promise.resolve()}catch(n){return Promise.reject(n)}}async createConnection(t,a,n,r,s){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.createConnection({database:t,encrypted:a,mode:n,version:r,readonly:s});const o=new De(t,s,this.sqlite),i=s?`RO_${t}`:`RW_${t}`;return this._connectionDict.set(i,o),Promise.resolve(o)}catch(o){return Promise.reject(o)}}async closeConnection(t,a){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.closeConnection({database:t,readonly:a});const n=a?`RO_${t}`:`RW_${t}`;return this._connectionDict.delete(n),Promise.resolve()}catch(n){return Promise.reject(n)}}async isConnection(t,a){const n={};t.endsWith(".db")&&(t=t.slice(0,-3));const r=a?`RO_${t}`:`RW_${t}`;return n.result=this._connectionDict.has(r),Promise.resolve(n)}async retrieveConnection(t,a){t.endsWith(".db")&&(t=t.slice(0,-3));const n=a?`RO_${t}`:`RW_${t}`;if(this._connectionDict.has(n)){const r=this._connectionDict.get(n);return typeof r<"u"?Promise.resolve(r):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async getNCDatabasePath(t,a){try{const n=await this.sqlite.getNCDatabasePath({path:t,database:a});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async createNCConnection(t,a){try{await this.sqlite.createNCConnection({databasePath:t,version:a});const n=new De(t,!0,this.sqlite),r=`RO_${t})`;return this._connectionDict.set(r,n),Promise.resolve(n)}catch(n){return Promise.reject(n)}}async closeNCConnection(t){try{await this.sqlite.closeNCConnection({databasePath:t});const a=`RO_${t})`;return this._connectionDict.delete(a),Promise.resolve()}catch(a){return Promise.reject(a)}}async isNCConnection(t){const a={},n=`RO_${t})`;return a.result=this._connectionDict.has(n),Promise.resolve(a)}async retrieveNCConnection(t){if(this._connectionDict.has(t)){const a=`RO_${t})`,n=this._connectionDict.get(a);return typeof n<"u"?Promise.resolve(n):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async isNCDatabase(t){try{const a=await this.sqlite.isNCDatabase({databasePath:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async retrieveAllConnections(){return this._connectionDict}async closeAllConnections(){const t=new Map;try{for(const a of this._connectionDict.keys()){const n=a.substring(3),r=a.substring(0,3)==="RO_";await this.sqlite.closeConnection({database:n,readonly:r}),t.set(a,null)}for(const a of t.keys())this._connectionDict.delete(a);return Promise.resolve()}catch(a){return Promise.reject(a)}}async checkConnectionsConsistency(){try{const t=[...this._connectionDict.keys()],a=[],n=[];for(const s of t)a.push(s.substring(0,2)),n.push(s.substring(3));const r=await this.sqlite.checkConnectionsConsistency({dbNames:n,openModes:a});return r.result||(this._connectionDict=new Map),Promise.resolve(r)}catch(t){return this._connectionDict=new Map,Promise.reject(t)}}async importFromJson(t){try{const a=await this.sqlite.importFromJson({jsonstring:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isJsonValid(t){try{const a=await this.sqlite.isJsonValid({jsonstring:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async copyFromAssets(t){const a=t??!0;try{return await this.sqlite.copyFromAssets({overwrite:a}),Promise.resolve()}catch(n){return Promise.reject(n)}}async getFromHTTPRequest(t,a){const n=a??!0;try{return await this.sqlite.getFromHTTPRequest({url:t,overwrite:n}),Promise.resolve()}catch(r){return Promise.reject(r)}}async isDatabaseEncrypted(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const a=await this.sqlite.isDatabaseEncrypted({database:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isInConfigEncryption(){try{const t=await this.sqlite.isInConfigEncryption();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isInConfigBiometricAuth(){try{const t=await this.sqlite.isInConfigBiometricAuth();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isDatabase(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const a=await this.sqlite.isDatabase({database:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async getDatabaseList(){try{const a=(await this.sqlite.getDatabaseList()).values;a.sort();const n={values:a};return Promise.resolve(n)}catch(t){return Promise.reject(t)}}async getMigratableDbList(t){const a=t||"default";try{const n=await this.sqlite.getMigratableDbList({folderPath:a});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async addSQLiteSuffix(t,a){const n=t||"default",r=a||[];try{const s=await this.sqlite.addSQLiteSuffix({folderPath:n,dbNameList:r});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async deleteOldDatabases(t,a){const n=t||"default",r=a||[];try{const s=await this.sqlite.deleteOldDatabases({folderPath:n,dbNameList:r});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async moveDatabasesAndAddSuffix(t,a){const n=t||"default",r=a||[];return this.sqlite.moveDatabasesAndAddSuffix({folderPath:n,dbNameList:r})}}class De{constructor(t,a,n){this.dbName=t,this.readonly=a,this.sqlite=n}getConnectionDBName(){return this.dbName}getConnectionReadOnly(){return this.readonly}async open(){try{return await this.sqlite.open({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async close(){try{return await this.sqlite.close({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async beginTransaction(){try{const t=await this.sqlite.beginTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async commitTransaction(){try{const t=await this.sqlite.commitTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async rollbackTransaction(){try{const t=await this.sqlite.rollbackTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTransactionActive(){try{const t=await this.sqlite.isTransactionActive({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async loadExtension(t){try{return await this.sqlite.loadExtension({database:this.dbName,path:t,readonly:this.readonly}),Promise.resolve()}catch(a){return Promise.reject(a)}}async enableLoadExtension(t){try{return await this.sqlite.enableLoadExtension({database:this.dbName,toggle:t,readonly:this.readonly}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getUrl(){try{const t=await this.sqlite.getUrl({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getVersion(){try{const t=await this.sqlite.getVersion({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getTableList(){try{const t=await this.sqlite.getTableList({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async execute(t,a=!0,n=!0){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const r=await this.sqlite.execute({database:this.dbName,statements:t,transaction:a,readonly:!1,isSQL92:n});return Promise.resolve(r)}}catch(r){return Promise.reject(r)}}async query(t,a,n=!0){let r;try{return a&&a.length>0?r=await this.sqlite.query({database:this.dbName,statement:t,values:a,readonly:this.readonly,isSQL92:!0}):r=await this.sqlite.query({database:this.dbName,statement:t,values:[],readonly:this.readonly,isSQL92:n}),r=await this.reorderRows(r),Promise.resolve(r)}catch(s){return Promise.reject(s)}}async run(t,a,n=!0,r="no",s=!0){let o;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(a&&a.length>0?o=await this.sqlite.run({database:this.dbName,statement:t,values:a,transaction:n,readonly:!1,returnMode:r,isSQL92:!0}):o=await this.sqlite.run({database:this.dbName,statement:t,values:[],transaction:n,readonly:!1,returnMode:r,isSQL92:s}),o.changes=await this.reorderRows(o.changes),Promise.resolve(o))}catch(i){return Promise.reject(i)}}async executeSet(t,a=!0,n="no",r=!0){let s;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(s=await this.sqlite.executeSet({database:this.dbName,set:t,transaction:a,readonly:!1,returnMode:n,isSQL92:r}),s.changes=await this.reorderRows(s.changes),Promise.resolve(s))}catch(o){return Promise.reject(o)}}async isExists(){try{const t=await this.sqlite.isDBExists({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTable(t){try{const a=await this.sqlite.isTableExists({database:this.dbName,table:t,readonly:this.readonly});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isDBOpen(){try{const t=await this.sqlite.isDBOpen({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async delete(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteDatabase({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async createSyncTable(){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const t=await this.sqlite.createSyncTable({database:this.dbName,readonly:!1});return Promise.resolve(t)}}catch(t){return Promise.reject(t)}}async setSyncDate(t){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.setSyncDate({database:this.dbName,syncdate:t,readonly:!1}),Promise.resolve())}catch(a){return Promise.reject(a)}}async getSyncDate(){try{const t=await this.sqlite.getSyncDate({database:this.dbName,readonly:this.readonly});let a="";return t.syncDate>0&&(a=new Date(t.syncDate*1e3).toISOString()),Promise.resolve(a)}catch(t){return Promise.reject(t)}}async exportToJson(t,a=!1){try{const n=await this.sqlite.exportToJson({database:this.dbName,jsonexportmode:t,readonly:this.readonly,encrypted:a});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async deleteExportedRows(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteExportedRows({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async executeTransaction(t,a=!0){let n=0,r=!1;if(this.readonly)return Promise.reject("not allowed in read-only mode");if(await this.sqlite.beginTransaction({database:this.dbName}),r=await this.sqlite.isTransactionActive({database:this.dbName}),!r)return Promise.reject("After Begin Transaction, no transaction active");try{for(const i of t){if(typeof i!="object"||!("statement"in i))throw new Error("Error a task.statement must be provided");if("values"in i&&i.values&&i.values.length>0){const c=i.statement.toUpperCase().includes("RETURNING")?"all":"no",l=await this.sqlite.run({database:this.dbName,statement:i.statement,values:i.values,transaction:!1,readonly:!1,returnMode:c,isSQL92:a});if(l.changes.changes<0)throw new Error("Error in transaction method run ");n+=l.changes.changes}else{const c=await this.sqlite.execute({database:this.dbName,statements:i.statement,transaction:!1,readonly:!1});if(c.changes.changes<0)throw new Error("Error in transaction method execute ");n+=c.changes.changes}}const s=await this.sqlite.commitTransaction({database:this.dbName});n+=s.changes.changes;const o={changes:{changes:n}};return Promise.resolve(o)}catch(s){const o=s.message?s.message:s;return await this.sqlite.rollbackTransaction({database:this.dbName}),Promise.reject(o)}}async reorderRows(t){const a=t;if(t?.values&&typeof t.values[0]=="object"&&Object.keys(t.values[0]).includes("ios_columns")){const n=t.values[0].ios_columns,r=[];for(let s=1;s<t.values.length;s++){const o=t.values[s],i={};for(const c of n)i[c]=o[c];r.push(i)}a.values=r}return Promise.resolve(a)}}const mt=Y("CapacitorSQLite",{web:()=>Ee(()=>import("./web-Cp9dJghx.js"),[]).then(e=>new e.CapacitorSQLiteWeb),electron:()=>window.CapacitorCustomPlatform.plugins.CapacitorSQLite});function vt(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}const ft="laba101_offline",pt=new ut(mt);let ae=null;const W=[{id:1,name:"Laba101 Admin",email:"admin@laba101.test",password:"password",role:"admin",branch:"Main Store"},{id:2,name:"Laba101 Staff",email:"staff@laba101.test",password:"password",role:"staff",branch:"Main Store"},{id:3,name:"Mintal Staff",email:"mintal@laba101.test",password:"password",role:"staff",branch:"Mintal Branch"},{id:4,name:"Gensan Staff",email:"gensan@laba101.test",password:"password",role:"staff",branch:"Gensan Branch"}],ie=[{id:1,name:"Mara Santos",phone:"0917 482 1101",address:"Bajada, Davao City"},{id:2,name:"Jun Rivera",phone:"0928 314 7720",address:"Lanang, Davao City"},{id:3,name:"Ana Cruz",phone:"0935 901 2234",address:"Matina, Davao City"}],J=[k(1,"Drop-off","Wash, dry and fold.","Drop-Off","order",185,8,40,["Wash","Dry","Fold"],0,24),k(2,"Full Service","Wash, dry, fold, detergent and Fabcon.","Full Service","order",200,8,40,["Wash","Dry","Fold","Detergent","Fabcon"],0,24),k(3,"Self Service Wash","Max of 8kg per load.","Self Service","order",60,8,null,["Wash"],0,1),k(4,"Self Service Dry","Regular time: 40 mins drying time.","Self Service","order",70,8,40,["Dry"],0,1),k(5,"Dry Only","Standard drying rate.","Dry Only","order",70,8,40,["Dry"],0,1),k(6,"Additional Dry 10 mins","Additional drying time.","Dry Only","order",30,8,10,["Dry"],0,1),k(7,"Additional Dry 20 mins","Additional drying time.","Dry Only","order",50,8,20,["Dry"],0,1),k(8,"Additional Dry 40 mins","Additional drying time.","Dry Only","order",70,8,40,["Dry"],0,1),k(9,"Additional Zonrox","Extra Zonrox bleach add-on per load.","Add-on","addon",25,0,null,["Zonrox"],0,0),k(10,"Additional Fabcon","Extra Fabcon fabric conditioner add-on per load.","Add-on","addon",25,0,null,["Fabcon"],0,0),k(11,"Comforter / Bulky Load","Comforter 4kg max per load. Thin blankets, bedsheets, bath towels, pillow cases and curtains: 6kg max per load.","Comforter","order",200,8,40,["Wash","Dry","Fold"],0,24)],Q=[{id:1,name:"Regular Clothes",maxKg:8,additionalFee:0,isActive:1},{id:2,name:"Comforter",maxKg:4,additionalFee:0,isActive:1},{id:3,name:"Thin Blankets",maxKg:6,additionalFee:0,isActive:1},{id:4,name:"Bedsheets",maxKg:6,additionalFee:0,isActive:1},{id:5,name:"Bath Towels",maxKg:6,additionalFee:0,isActive:1},{id:6,name:"Curtains",maxKg:6,additionalFee:0,isActive:1}];async function ht(e){for(const t of J)((await e.query("SELECT id FROM laundry_services WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive,t.id]):await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive]);for(const t of Q)((await e.query("SELECT id FROM item_categories WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.maxKg,t.additionalFee,t.isActive,t.id]):await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[t.id,t.name,t.maxKg,t.additionalFee,t.isActive])}const H=[{id:1,ticket:"LB260527-001",customerId:1,customer:"Mara Santos",phone:"0917 482 1101",serviceId:1,service:"Drop-off",itemCategoryId:1,itemCategory:"Regular Clothes",branch:"Main Store",status:"washing",workflowCompleted:["received","wash"],weightKg:5.75,price:185,additionalCharge:0,extraServiceAmount:0,totalAmount:185,paidAmount:185,balance:0,extras:[],notes:"Separate white uniforms.",foldedBy:null,foldedByName:null,dueAt:new Date(Date.now()+1080*60*1e3).toISOString(),createdAt:new Date().toISOString()}],oe=[{id:1,orderId:1,amount:185,method:"cash",reference:null,receivedAt:new Date().toISOString(),branch:"Main Store"}],ce=[{id:1,expenseDate:"2026-05-27",number:"DISB-01",name:"Water refill",category:"Supplies",description:"Weekly supply",amount:250},{id:2,expenseDate:"2026-05-27",number:"DISB-02",name:"Detergent",category:"Supplies",description:"Laundry detergent",amount:500}],le=[{id:1,saleDate:"2026-05-27",saleNumber:"SALE-01",cashAmount:1200,gcashAmount:500,totalAmount:1700,notes:"Seed day total"}],K=[...[1,2,3,4].map(e=>({id:e,machineName:`Washer ${e}`,machineType:"washer",status:"available",branch:"Main Store"})),...[1,2,3,4].map(e=>({id:e+4,machineName:`Dryer ${e}`,machineType:"dryer",status:"available",branch:"Main Store"}))],de=[{key:"branch",value:"Main Store"},{key:"fold_rate",value:"5"},{key:"report_email",value:"admin@laba101.test"}];function k(e,t,a,n,r,s,o,i,c,l,p){return{id:e,name:t,description:a,category:n,serviceType:r,price:s,maxKg:o,dryingMinutes:i,includes:c,additionalCharge:l,turnaroundHours:p,isActive:1}}function Te(e){return`laba101-mobile-${e}`}function S(e,t){const a=localStorage.getItem(Te(e));if(!a)return structuredClone(t);try{return JSON.parse(a)}catch{return structuredClone(t)}}function w(e,t){localStorage.setItem(Te(e),JSON.stringify(t))}function M(e){return e.reduce((t,a)=>Math.max(t,a.id),0)+1}function G(){return new Date().toISOString()}function ye(e=new Date){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${n}`}function bt(){return ye().slice(2).replaceAll("-","")}function ue(e,t){if(!e)return t;try{return JSON.parse(e)}catch{return t}}async function A(){return ae||(ae=await pt.createConnection(ft,!1,"no-encryption",1,!1),await ae.open()),ae}async function P(e,t,a,n){((await e.query(`PRAGMA table_info(${t})`)).values??[]).some(o=>o.name===a)||await e.execute(`ALTER TABLE ${t} ADD COLUMN ${a} ${n}`)}async function gt(){if(!E.isNativePlatform()){localStorage.getItem(Te("seeded_v4"))||(w("staff",W),w("customers",ie),w("services",J),w("item_categories",Q),w("orders",H),w("payments",oe),w("fold_logs",[]),w("expenses",ce),w("sales",le),w("machines",K),w("subcleanings",[]),w("settings",de),w("seeded_v4",!0));return}const e=await A();if(await e.execute(`
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
  `),await P(e,"staff","email","TEXT"),await P(e,"staff","password","TEXT"),await P(e,"staff","role","TEXT"),await P(e,"staff","isActive","INTEGER NOT NULL DEFAULT 1"),await e.run('UPDATE staff SET password = ? WHERE password IS NULL OR password = ""',["password"]),await e.run('UPDATE staff SET role = ? WHERE role IS NULL OR role = ""',["staff"]),await P(e,"orders","customerId","INTEGER NOT NULL DEFAULT 0"),await P(e,"orders","phone","TEXT"),await P(e,"orders","serviceId","INTEGER NOT NULL DEFAULT 0"),await P(e,"orders","itemCategoryId","INTEGER NOT NULL DEFAULT 0"),await P(e,"orders","itemCategory",'TEXT NOT NULL DEFAULT "Regular Clothes"'),await P(e,"orders","workflowCompleted","TEXT"),await P(e,"orders","weightKg","REAL NOT NULL DEFAULT 0"),await P(e,"orders","price","REAL NOT NULL DEFAULT 0"),await P(e,"orders","additionalCharge","REAL NOT NULL DEFAULT 0"),await P(e,"orders","extraServiceAmount","REAL NOT NULL DEFAULT 0"),await P(e,"orders","totalAmount","REAL NOT NULL DEFAULT 0"),await P(e,"orders","paidAmount","REAL NOT NULL DEFAULT 0"),await P(e,"orders","extras","TEXT"),await P(e,"orders","notes","TEXT"),await P(e,"orders","dueAt","TEXT"),await P(e,"orders","createdAt",'TEXT NOT NULL DEFAULT ""'),await P(e,"daily_sales","saleNumber","TEXT"),((await e.query("SELECT COUNT(*) as count FROM staff")).values?.[0]?.count??0)===0){for(const a of W)await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.name,a.email,a.password,a.role,a.branch,1]);for(const a of ie)await e.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[a.id,a.name,a.phone,a.address]);for(const a of J)await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[a.id,a.name,a.description,a.category,a.serviceType,a.price,a.maxKg,a.dryingMinutes,JSON.stringify(a.includes),a.additionalCharge,a.turnaroundHours,a.isActive]);for(const a of Q)await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[a.id,a.name,a.maxKg,a.additionalFee,a.isActive]);for(const a of H)await Me(e,a);for(const a of oe)await e.run("INSERT INTO payments (id, orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.orderId,a.amount,a.method,a.reference,a.receivedAt,a.branch]);for(const a of ce)await e.run("INSERT INTO disbursement_expenses (id, expenseDate, number, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.expenseDate,a.number,a.name,a.category,a.description,a.amount]);for(const a of le)await e.run("INSERT INTO daily_sales (id, saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.saleDate,a.saleNumber,a.cashAmount,a.gcashAmount,a.totalAmount,a.notes]);for(const a of K)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[a.id,a.machineName,a.machineType,a.status,a.branch]);for(const a of de)await e.run("INSERT INTO settings (key, value) VALUES (?, ?)",[a.key,a.value])}await ht(e)}async function Me(e,t){await e.run("INSERT INTO orders (id, ticket, customerId, customer, phone, serviceId, service, itemCategoryId, itemCategory, branch, status, workflowCompleted, weightKg, price, additionalCharge, extraServiceAmount, totalAmount, paidAmount, extras, notes, foldedBy, dueAt, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.ticket,t.customerId,t.customer,t.phone,t.serviceId,t.service,t.itemCategoryId,t.itemCategory,t.branch,t.status,JSON.stringify(t.workflowCompleted),t.weightKg,t.price,t.additionalCharge,t.extraServiceAmount,t.totalAmount,t.paidAmount,JSON.stringify(t.extras),t.notes,t.foldedBy,t.dueAt,t.createdAt])}function yt(e){const t=Number(e.paidAmount??0),a=Number(e.totalAmount??0),n=Number(e.foldedBy);return{id:Number(e.id),ticket:String(e.ticket),customerId:Number(e.customerId),customer:String(e.customer),phone:e.phone?String(e.phone):null,serviceId:Number(e.serviceId),service:String(e.service),itemCategoryId:Number(e.itemCategoryId),itemCategory:String(e.itemCategory),branch:String(e.branch),status:String(e.status),workflowCompleted:ue(e.workflowCompleted,[]),weightKg:Number(e.weightKg),price:Number(e.price),additionalCharge:Number(e.additionalCharge),extraServiceAmount:Number(e.extraServiceAmount),totalAmount:a,paidAmount:t,balance:Number((a-t).toFixed(2)),extras:ue(e.extras,[]),notes:e.notes?String(e.notes):null,foldedBy:Number.isFinite(n)&&n>0?n:null,foldedByName:e.foldedByName?String(e.foldedByName):null,dueAt:String(e.dueAt),createdAt:String(e.createdAt)}}async function wt(){await gt()}async function ve(){return(await Ne()).find(t=>t.key==="branch")?.value??"Main Store"}async function Et(){const e=await Ne();return Number(e.find(t=>t.key==="fold_rate")?.value??"5")}async function Fe(e){return(await Ne()).find(a=>a.key===e)?.value}async function Ne(){return E.isNativePlatform()?(await(await A()).query("SELECT key, value FROM settings ORDER BY key")).values??[]:S("settings",de)}async function se(e,t){if(!E.isNativePlatform()){const n=S("settings",de).filter(r=>r.key!==e);n.push({key:e,value:t}),w("settings",n);return}await(await A()).run("REPLACE INTO settings (key, value) VALUES (?, ?)",[e,t])}async function St(e){return E.isNativePlatform()?(await(await A()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff WHERE branch = ? ORDER BY name ASC',[e])).values??[]:S("staff",W).filter(n=>n.branch===e)}async function je(){return E.isNativePlatform()?(await(await A()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff ORDER BY name ASC')).values??[]:S("staff",W)}async function _e(e,t){const a=e.trim().toLowerCase();return(await je()).find(r=>r.email.toLowerCase()===a&&r.password===t&&r.isActive!==0)??null}async function Tt(e){if(!E.isNativePlatform()){const a=S("staff",W);a.unshift({id:M(a),...e,isActive:1}),w("staff",a);return}await(await A()).run("INSERT INTO staff (name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?)",[e.name,e.email,e.password,e.role,e.branch,1])}async function Ie(e,t){if(!E.isNativePlatform()){const s=S("staff",W),o=s.find(i=>i.id===e);o&&(Object.assign(o,t),w("staff",s));return}const a=await A(),n=[],r=[];for(const[s,o]of Object.entries(t))s!=="id"&&(n.push(`${s} = ?`),r.push(o));n.length&&(r.push(e),await a.run(`UPDATE staff SET ${n.join(", ")} WHERE id = ?`,r))}async function Nt(){return E.isNativePlatform()?(await(await A()).query("SELECT id, name, phone, address FROM customers ORDER BY name ASC")).values??[]:S("customers",ie).sort((a,n)=>a.name.localeCompare(n.name))}async function At(e){if(!E.isNativePlatform()){const r=S("customers",ie),s=e.id?r.find(i=>i.id===e.id):r.find(i=>i.name.toLowerCase()===e.name.toLowerCase()&&(e.phone?i.phone===e.phone:!0));if(s)return s.name=e.name,s.phone=e.phone??s.phone,s.address=e.address??s.address,w("customers",r),s;const o={id:M(r),name:e.name,phone:e.phone??null,address:e.address??null};return r.push(o),w("customers",r),o}const t=await A();if(e.id)return await t.run("UPDATE customers SET name = ?, phone = ?, address = ? WHERE id = ?",[e.name,e.phone??null,e.address??null,e.id]),{id:e.id,name:e.name,phone:e.phone??null,address:e.address??null};const a=await t.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM customers"),n=Number((a.values?.[0]).id);return await t.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[n,e.name,e.phone??null,e.address??null]),{id:n,name:e.name,phone:e.phone??null,address:e.address??null}}async function Ae(e){return E.isNativePlatform()?((await(await A()).query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[])).values??[]).map(n=>({...n,includes:ue(n.includes,[])})):S("services",J).filter(n=>!0)}async function qe(e){if(!E.isNativePlatform()){const a=S("services",J),n=e.id?a.find(r=>r.id===e.id):null;n?Object.assign(n,e):a.unshift({...e,id:M(a)}),w("services",a);return}const t=await A();e.id?await t.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = ? WHERE id = ?",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive,e.id]):await t.run("INSERT INTO laundry_services (name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive])}async function Be(){return E.isNativePlatform()?(await(await A()).query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC")).values??[]:S("item_categories",Q).filter(a=>a.isActive)}async function Lt(e){if(!E.isNativePlatform()){const a=S("item_categories",Q),n=e.id?a.find(r=>r.id===e.id):null;n?Object.assign(n,e):a.unshift({...e,id:M(a)}),w("item_categories",a);return}const t=await A();e.id?await t.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = ? WHERE id = ?",[e.name,e.maxKg,e.additionalFee,e.isActive,e.id]):await t.run("INSERT INTO item_categories (name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?)",[e.name,e.maxKg,e.additionalFee,e.isActive])}function we(e,t,a,n){const r=Number(t.maxKg),s=Math.max(0,a-r),o=0,i=n.reduce((p,h)=>p+Number(h.price),0),c=n.map(p=>({id:p.id,name:vt(p.name),price:Number(p.price)})),l=Number((Number(e.price)+o+i).toFixed(2));return{price:Number(e.price),additionalCharge:Number(o.toFixed(2)),extraServiceAmount:Number(i.toFixed(2)),totalAmount:l,allowedKg:r,extraKg:Number(s.toFixed(2)),warning:s>0?`Weight exceeds the ${t.name} load limit of ${r.toFixed(2)} kg.`:null,extras:c}}function Ke(e,t){const a=t.find(s=>s.id===e.serviceId),n=a?.includes??[],r=[{key:"received",label:"Received"}];return n.includes("Wash")&&r.push({key:"wash",label:"Wash"}),e.extras.length&&r.push({key:"extras",label:"Extra services"}),(n.includes("Dry")||(a?.dryingMinutes??0)>0)&&r.push({key:"dry",label:"Dry"}),n.includes("Fold")&&r.push({key:"fold",label:"Fold"}),r.push({key:"ready",label:"Ready"},{key:"claimed",label:"Claimed"}),r}function Ct(e){return e.includes("claimed")?"claimed":e.includes("ready")?"ready":e.includes("dry")?"drying":e.includes("extras")||e.includes("wash")?"washing":"received"}async function fe(e){return E.isNativePlatform()?((await(await A()).query("SELECT o.*, s.name as foldedByName FROM orders o LEFT JOIN staff s ON s.id = o.foldedBy WHERE o.branch = ? ORDER BY o.id DESC",[e])).values??[]).map(n=>yt(n)):S("orders",H).filter(n=>n.branch===e).map(n=>({...n,balance:Number((n.totalAmount-n.paidAmount).toFixed(2))}))}async function $t(e){const[t,a]=await Promise.all([Ae(),Be()]),n=t.find(T=>T.id===e.serviceId),r=a.find(T=>T.id===e.itemCategoryId);if(!n||!r)throw new Error("Service or item category is missing.");const s=t.filter(T=>e.addonIds.includes(T.id)),o=we(n,r,e.weightKg,s);if(o.extraKg>0)throw new Error(o.warning??"Weight exceeds the allowed limit.");const i=await At({id:e.customerId||void 0,name:e.customerName,phone:e.customerPhone??null}),c=Math.max(0,e.paidAmount),l=Math.min(o.totalAmount,c),p={ticket:await Ot(),customerId:i.id,customer:i.name,phone:i.phone,serviceId:n.id,service:n.name,itemCategoryId:r.id,itemCategory:r.name,branch:e.branch,status:"received",workflowCompleted:["received"],weightKg:e.weightKg,price:o.price,additionalCharge:o.additionalCharge,extraServiceAmount:o.extraServiceAmount,totalAmount:o.totalAmount,paidAmount:l,balance:Number((o.totalAmount-l).toFixed(2)),extras:o.extras,notes:[e.notes,o.warning].filter(Boolean).join(`
`)||null,foldedBy:null,foldedByName:null,dueAt:new Date(Date.now()+n.turnaroundHours*60*60*1e3).toISOString(),createdAt:G()};if(!E.isNativePlatform()){const T=S("orders",H),m={...p,id:M(T)};return T.unshift(m),w("orders",T),c>0&&await Xe(m.id,{amount:c,method:e.paymentMethod,reference:e.paymentReference??null}),m}const h=await A(),u=await h.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM orders"),x={...p,id:Number((u.values?.[0]).id)};return await Me(h,x),c>0&&await h.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[x.id,c,e.paymentMethod,e.paymentReference??null,G(),e.branch]),x}async function Ot(){const e=`LB${bt()}`,t=await ve(),n=(await fe(t)).filter(s=>s.ticket.startsWith(e)).sort((s,o)=>o.ticket.localeCompare(s.ticket))[0],r=n?Number(n.ticket.slice(-3))+1:1;return`${e}-${String(r).padStart(3,"0")}`}async function Rt(e,t){const a=await ve(),[n,r]=await Promise.all([fe(a),Ae()]),s=n.find(l=>l.id===e);if(!s)return;const i=Ke(s,r).map(l=>l.key).find(l=>!s.workflowCompleted.includes(l));if(!i)return;if(s.workflowCompleted=[...s.workflowCompleted,i],s.status=Ct(s.workflowCompleted),i==="fold"&&t&&(s.foldedBy=t),!E.isNativePlatform()){const l=S("orders",H),p=l.find(h=>h.id===s.id);p&&Object.assign(p,s),w("orders",l);return}await(await A()).run("UPDATE orders SET workflowCompleted = ?, status = ?, foldedBy = ? WHERE id = ?",[JSON.stringify(s.workflowCompleted),s.status,s.foldedBy,s.id])}async function Xe(e,t){const a=await ve();if(!(await fe(a)).find(i=>i.id===e))return;const s=Math.max(0,t.amount);if(s<=0)return;if(!E.isNativePlatform()){const i=S("payments",oe);i.unshift({id:M(i),orderId:e,amount:s,method:t.method,reference:t.reference??null,receivedAt:G(),branch:a}),w("payments",i);const c=S("orders",H),l=c.find(p=>p.id===e);l&&(l.paidAmount=Math.min(l.totalAmount,Number((l.paidAmount+s).toFixed(2)))),w("orders",c);return}const o=await A();await o.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[e,s,t.method,t.reference??null,G(),a]),await o.run("UPDATE orders SET paidAmount = MIN(totalAmount, paidAmount + ?) WHERE id = ?",[s,e])}async function xt(e){return E.isNativePlatform()?(await(await A()).query("SELECT id, orderId, amount, method, reference, receivedAt, branch FROM payments  ORDER BY receivedAt DESC",[])).values??[]:S("payments",oe).filter(n=>!0)}async function Pt(){return E.isNativePlatform()?(await(await A()).query("SELECT id, orderTicket, staffName, foldCount, rate, total, createdAt FROM fold_logs ORDER BY id DESC")).values??[]:S("fold_logs",[])}async function Dt(e){const t=Number((e.foldCount*e.rate).toFixed(2));if(!E.isNativePlatform()){const n=S("fold_logs",[]);n.unshift({id:Date.now(),...e,total:t,createdAt:G()}),w("fold_logs",n);return}await(await A()).run("INSERT INTO fold_logs (orderTicket, staffName, foldCount, rate, total, createdAt) VALUES (?, ?, ?, ?, ?, ?)",[e.orderTicket,e.staffName,e.foldCount,e.rate,t,G()])}async function It(){return E.isNativePlatform()?(await(await A()).query("SELECT id, expenseDate, number, name, category, description, amount FROM disbursement_expenses ORDER BY expenseDate DESC, id DESC")).values??[]:S("expenses",ce)}async function qt(e){if(!E.isNativePlatform()){const r=S("expenses",ce),s=M(r);r.unshift({id:s,expenseDate:e.expenseDate,number:`DISB-${String(s).padStart(2,"0")}`,name:e.name,category:e.category,description:e.description||null,amount:e.amount}),w("expenses",r);return}const t=await A(),a=await t.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM disbursement_expenses"),n=Number((a.values?.[0]).id);await t.run("INSERT INTO disbursement_expenses (expenseDate, number, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?)",[e.expenseDate,`DISB-${String(n).padStart(2,"0")}`,e.name,e.category,e.description||null,e.amount])}async function Ut(){return E.isNativePlatform()?(await(await A()).query('SELECT id, saleDate, COALESCE(saleNumber, "") as saleNumber, cashAmount, gcashAmount, totalAmount, notes FROM daily_sales ORDER BY saleDate DESC, id DESC')).values??[]:S("sales",le)}async function kt(e){const t=Number((e.cashAmount+e.gcashAmount).toFixed(2));if(!E.isNativePlatform()){const s=S("sales",le),o=s.find(i=>i.saleDate===e.saleDate);if(o)Object.assign(o,{cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null});else{const i=M(s);s.unshift({id:i,saleDate:e.saleDate,saleNumber:`SALE-${String(i).padStart(2,"0")}`,cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null})}w("sales",s);return}const a=await A(),r=(await a.query("SELECT id, saleNumber FROM daily_sales WHERE saleDate = ?",[e.saleDate])).values?.[0];if(r)await a.run("UPDATE daily_sales SET cashAmount = ?, gcashAmount = ?, totalAmount = ?, notes = ? WHERE id = ?",[e.cashAmount,e.gcashAmount,t,e.notes||null,r.id]);else{const s=await a.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM daily_sales"),o=Number((s.values?.[0]).id);await a.run("INSERT INTO daily_sales (saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?)",[e.saleDate,`SALE-${String(o).padStart(2,"0")}`,e.cashAmount,e.gcashAmount,t,e.notes||null])}}async function We(e){return E.isNativePlatform()?(await(await A()).query("SELECT id, machineName, machineType, status, branch FROM machines WHERE branch = ? ORDER BY machineType, machineName",[e])).values??[]:S("machines",K).filter(n=>n.branch===e)}async function Mt(e){if(!E.isNativePlatform()){const a=S("machines",K);a.unshift({id:M(a),...e}),w("machines",a);return}await(await A()).run("INSERT INTO machines (machineName, machineType, status, branch) VALUES (?, ?, ?, ?)",[e.machineName,e.machineType,e.status,e.branch])}async function Ft(e,t){if(!E.isNativePlatform()){const n=S("machines",K),r=n.find(s=>s.id===e);r&&(r.status=t,w("machines",n));return}await(await A()).run("UPDATE machines SET status = ? WHERE id = ?",[t,e])}async function jt(e){return E.isNativePlatform()?((await(await A()).query("SELECT id, date, machineIds, machineNames, cleaningStatus, notes, branch FROM subcleanings WHERE branch = ? ORDER BY date DESC, id DESC",[e])).values??[]).map(n=>({...n,machineIds:ue(n.machineIds,[])})):S("subcleanings",[]).filter(n=>n.branch===e)}async function _t(e){const a=(await We(e.branch)).filter(s=>e.machineIds.includes(s.id)).map(s=>s.machineName).join(", ");if(!E.isNativePlatform()){const s=S("subcleanings",[]);s.unshift({id:M(s),date:e.date,machineIds:e.machineIds,machineNames:a,cleaningStatus:e.cleaningStatus,notes:e.notes||null,branch:e.branch}),w("subcleanings",s);const o=S("machines",K);o.forEach(i=>{e.machineIds.includes(i.id)&&(i.status=e.cleaningStatus==="completed"?"available":"under_cleaning")}),w("machines",o);return}const n=await A();await n.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, notes, branch) VALUES (?, ?, ?, ?, ?, ?)",[e.date,JSON.stringify(e.machineIds),a,e.cleaningStatus,e.notes||null,e.branch]);const r=e.cleaningStatus==="completed"?"available":"under_cleaning";for(const s of e.machineIds)await n.run("UPDATE machines SET status = ? WHERE id = ?",[r,s])}async function Bt(e,t){if(!E.isNativePlatform()){const o=S("machines",K),i=o.find(p=>p.id===e);i&&(i.status="available"),w("machines",o);const c=S("subcleanings",[]),l=ye();c.unshift({id:M(c),date:l,machineIds:[e],machineNames:i?.machineName??"",cleaningStatus:"completed",notes:null,branch:t}),w("subcleanings",c);return}const a=await A(),r=(await a.query("SELECT machineName FROM machines WHERE id = ?",[e])).values?.[0]?.machineName??"";await a.run("UPDATE machines SET status = ? WHERE id = ?",["available",e]);const s=ye();await a.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, notes, branch) VALUES (?, ?, ?, ?, ?, ?)",[s,JSON.stringify([e]),r,"completed",null,t])}const Le=document.querySelector("#app");if(!Le)throw new Error("App root not found");let ne;const Ce={dashboard:"Dashboard",orders:"POS / Orders",customers:"Customers",pricing:"Pricing Services",disbursements:"Daily Report",reports:"Reports",inventory:"Inventory",maintenance:"Maintenance",staff:"Staff",settings:"Settings"},f={tab:"dashboard",receiptOrderId:0,currentUser:null,loginError:"",sidebarOpen:!1,dailyReportTab:"expenses",maintenanceTab:"cleaning"},z="laba101-mobile-session";function $(e){return new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(e||0)}function d(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function pe(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}function He(e,t){const a=new Map;return e.filter(n=>n.workflowCompleted.includes("fold")&&n.foldedByName).forEach(n=>{const r=n.foldedByName,s=a.get(r)??{staffName:r,folds:0,rate:t,total:0};s.folds+=1,s.total=Number((s.folds*s.rate).toFixed(2)),a.set(r,s)}),Array.from(a.values())}function me(e=new Date){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${n}`}function j(){return me()}function re(e){return me(new Date(e))}function Kt(e){return new Intl.DateTimeFormat("en-PH",{dateStyle:"medium",timeStyle:"short"}).format(new Date(e))}function Ge(e=new Date){return{date:new Intl.DateTimeFormat("en-PH",{weekday:"long",month:"long",day:"numeric",year:"numeric"}).format(e),time:new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",second:"2-digit",hour12:!0}).format(e)}}function Xt(e,t){return`<button class="nav-link ${t?"is-active":""}" data-tab="${e}" type="button">
    <span class="nav-icon">${Wt(e)}</span>
    <span>${Ce[e]}</span>
  </button>`}function D(e,t){return`<div class="section-head"><div><h2>${d(e)}</h2><p class="meta">${d(t)}</p></div></div>`}function Ue(){return Ce[f.tab]??"Dashboard"}function be(e){return(e?.name??"Laba101").trim().slice(0,1).toUpperCase()}function Wt(e){return{dashboard:"DB",orders:"PO",customers:"CU",pricing:"PS",disbursements:"DR",reports:"RP",inventory:"IN",maintenance:"MT",staff:"ST",settings:"SE"}[e]}async function Ht(){const e=await ve(),t=await St(e),a=await je(),n=await Nt(),r=await Ae(),s=await listAllServices(),o=await Be(),i=await fe(e),c=await xt(),l=await Pt(),p=await It(),h=await Ut(),u=await We(e),x=await jt(e),T=await Et(),m=await Fe("report_email");return{branch:e,staff:t,allStaff:a,customers:n,services:r,allServices:s,categories:o,orders:i,payments:c,foldLogs:l,expenses:p,sales:h,machines:u,subcleanings:x,foldRate:T,reportEmail:m??""}}async function C(){if(!f.currentUser){Gt(),ca();return}const e=await Ht(),t=e.orders.filter(s=>s.status!=="claimed").length,a=e.orders.filter(s=>s.status==="ready").length;e.orders.reduce((s,o)=>s+o.paidAmount,0);const n=e.orders.filter(s=>re(s.createdAt)===j()).reduce((s,o)=>s+o.paidAmount,0);e.sales.reduce((s,o)=>s+o.totalAmount,0);const r=He(e.orders,e.foldRate).reduce((s,o)=>s+o.total,0);e.expenses.reduce((s,o)=>s+o.amount,0)+r,Le.innerHTML=`
    <div class="app-frame">
      <header class="topbar">
        <div class="topbar-left">
          <img src="/laba101-logo.svg" alt="Laba101" class="topbar-logo" />
          <div>
            <p class="eyebrow">Offline mobile system</p>
            <h1>${d(Ue())}</h1>
          </div>
        </div>
        <div class="topbar-actions">
          <div class="branch-pill"><span>Branch</span><strong>${d(e.branch)}</strong></div>
          <button class="icon-button" type="button" aria-label="Notifications">!</button>
          <button class="profile-pill" type="button">
            <span>${be(f.currentUser)}</span>
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
        <nav>${Ye().map(s=>Xt(s,f.tab===s)).join("")}</nav>
        <div class="sidebar-fill">
          <div class="sidebar-branch-badge">
            <span>Active Branch</span>
            <strong>${d(e.branch)}</strong>
          </div>
          <p class="sidebar-app-name">Laba101 POS</p>
        </div>
        <div class="sidebar-user">
          <span class="avatar">${be(f.currentUser)}</span>
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
            <h2>${d(Ue())}</h2>
          </div>
          <button class="mobile-avatar" type="button">${be(f.currentUser)}</button>
        </header>

        ${f.tab==="dashboard"?Vt({openQueue:t,readyPickup:a,customerCount:e.customers.length,paidToday:n,orders:e.orders}):""}
        ${f.tab==="orders"?Jt(e.orders,e.customers,e.services,e.categories,e.staff,e.payments,e.branch):""}
        ${f.tab==="customers"?Zt(e.customers,e.orders):""}
        ${f.tab==="pricing"?ea(e.allServices,e.categories):""}
        ${f.tab==="disbursements"?ta(e.expenses,e.sales):""}
        ${f.tab==="reports"?aa(e.orders,e.sales,e.expenses,e.foldRate):""}
        ${f.tab==="inventory"?na(e.services,e.categories):""}
        ${f.tab==="maintenance"?sa(e.machines,e.subcleanings,e.branch):""}
        ${f.tab==="staff"?ra(e.allStaff,e.branch):""}
        ${f.tab==="settings"?ia(e.branch,e.foldRate,e.reportEmail):""}
      </main>
    </div>
  `,oa(),da(e),ua(e.allServices),ma(),va(e.orders,e.sales,e.expenses,e.foldRate),fa(),pa(e.allStaff),ha(),la()}function Ye(){return f.currentUser?.role==="admin"?Object.keys(Ce).filter(e=>e!=="inventory"):["orders","disbursements","reports","maintenance"]}function Gt(){Le.innerHTML=`
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
  `}function Yt(){document.querySelectorAll("[data-fill-email]").forEach(e=>{e.addEventListener("click",()=>{const t=document.querySelector('input[name="email"]'),a=document.querySelector('input[name="password"]');t&&(t.value=e.dataset.fillEmail??""),a&&(a.value=e.dataset.fillPassword??"")})})}function Vt(e){const t=e.orders.slice(0,3),a=new Date,n=Ge(a),r=Array.from({length:7},(s,o)=>{const i=new Date(a);return i.setDate(a.getDate()-(6-o)),new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric"}).format(i)});return`
    <section class="panel dashboard-clock">
      <div>
        <p class="eyebrow">Device local time</p>
        <h2 data-dashboard-time>${d(n.time)}</h2>
      </div>
      <strong data-dashboard-date>${d(n.date)}</strong>
    </section>
    <section class="grid stats">
      <div class="panel stat"><div class="card-label">Active orders</div><div class="value">${e.openQueue}</div><div class="helper">Open queue</div></div>
      <div class="panel stat"><div class="card-label">Ready pickup</div><div class="value">${e.readyPickup}</div><div class="helper">Awaiting claim</div></div>
      <div class="panel stat"><div class="card-label">Paid today</div><div class="value">${$(e.paidToday)}</div><div class="helper">Collected cash</div></div>
      <div class="panel stat"><div class="card-label">Customers</div><div class="value">${e.customerCount}</div><div class="helper">Customer records</div></div>
    </section>
    <section class="dashboard-main">
      <article class="panel revenue-panel">
        ${D("Revenue overview","Paid amount for the last 7 days.")}
        <div class="mini-chart">
          <span></span><span></span><span></span><span></span><span></span><span></span><span class="is-today"></span>
        </div>
        <div class="chart-days">${r.map(s=>`<span>${d(s)}</span>`).join("")}</div>
      </article>
      <article class="panel recent-panel">
        ${D("Recent activities","Latest tickets and workflow movements.")}
        <div class="activity-list">
          ${t.map(s=>`<div><strong>${d(s.ticket)} moved to ${d(s.status)}</strong><span>${d(s.customer)} - just now</span></div>`).join("")||'<p class="helper">No recent activity.</p>'}
        </div>
      </article>
    </section>
  `}function Jt(e,t,a,n,r,s,o){const i=a.filter(u=>u.serviceType==="order"&&u.isActive),c=a.filter(u=>u.serviceType==="addon"&&u.isActive),l=f.receiptOrderId?e.find(u=>u.id===f.receiptOrderId):null,p=new Set(e.map(u=>u.customerId)),h=t.filter(u=>p.has(u.id));return`
    <section class="grid content full">
      <article class="panel">
        ${D("New POS order","Customer, service, weight, add-ons, and initial payment")}
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
              ${i.map(u=>`<option value="${u.id}">${d(u.name)} - ${$(u.price)}</option>`).join("")}
            </select>
          </label>
          <label>Item category
            <select name="itemCategoryId" required>
              ${n.map(u=>`<option value="${u.id}">${d(u.name)} max ${u.maxKg}kg</option>`).join("")}
            </select>
            <span class="field-hint" data-category-weight></span>
          </label>
          <label>Weight (KG)<input name="weightKg" type="number" min="0.25" max="200" step="0.01" value="1" required /></label>

          <fieldset class="check-grid">
            <legend>Extra services</legend>
            ${c.length?c.map(u=>`<label class="check"><input type="checkbox" name="addonIds" value="${u.id}" /> ${d(pe(u.name))} ${$(u.price)}</label>`).join(""):'<p class="helper">No extra services configured.</p>'}
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
        <div class="table orders-table">
          <div class="table-head"><div>Ticket</div><div>Customer</div><div>Total</div><div>Status</div><div>Actions</div></div>
          ${e.map(u=>Qt(u,r,a)).join("")||'<div class="helper">No orders yet.</div>'}
        </div>
      </article>
      ${l?zt(l,s.filter(u=>u.orderId===l.id)):""}
    </section>
  `}function Qt(e,t,a){const n=Ke(e,a),r=n.find(i=>!e.workflowCompleted.includes(i.key)),s=r?.key==="fold",o=r?.key==="extras"&&e.extras.length>0;return`
    <div class="table-row">
      <div><strong>${d(e.ticket)}</strong><div class="small">${d(e.service)} / ${d(e.itemCategory)}</div></div>
      <div>${d(e.customer)}<div class="small">${d(e.phone??"")}</div></div>
      <div class="amount-cell"><strong>${$(e.totalAmount)}</strong><div class="small">Paid ${$(e.paidAmount)} / Bal ${$(e.balance)}</div></div>
      <div>
        <div class="${e.status==="ready"||e.status==="claimed"?"ok":"warn"}">${d(e.status)}</div>
        <div class="workflow-progress">
          ${n.map(i=>`<span class="${e.workflowCompleted.includes(i.key)?"is-done":r?.key===i.key?"is-next":""}">${d(i.label)}</span>`).join("")}
        </div>
      </div>
      <div class="row-actions">
        ${r?`<form class="inline-form advance-form" data-order-id="${e.id}">
          ${o?`<div class="extra-confirmation">Confirm extra service: <strong>${e.extras.map(i=>d(pe(i.name))).join(", ")}</strong></div>`:""}
          ${s?`<select name="assignedStaffId" required>
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
  `}function zt(e,t){const a=t.reduce((r,s)=>r+Number(s.amount),0),n=Math.max(0,Number((a-e.totalAmount).toFixed(2)));return`
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="receipt-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-print-receipt>Print</button>
          <button class="secondary" type="button" data-close-receipt>Close</button>
        </div>
        <div class="receipt" id="receipt-print-area">
          <div class="receipt-head">
            <h3 id="receipt-title">Laba101</h3>
            <p>${d(e.ticket)}<br>${d(Kt(e.createdAt))}</p>
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
            <div><span>Total</span><strong>${$(e.totalAmount)}</strong></div>
            <div><span>Tendered</span><strong>${$(a)}</strong></div>
            <div><span>Paid</span><strong>${$(e.paidAmount)}</strong></div>
            <div><span>Change</span><strong>${$(n)}</strong></div>
            <div><span>Balance</span><strong>${$(e.balance)}</strong></div>
          </div>
          <h3>Payments</h3>
          <div class="receipt-payments">
            ${t.map(r=>`<div><span>${d(r.method.toUpperCase())}</span><strong>${$(r.amount)}</strong>${r.reference?`<small>Ref ${d(r.reference)}</small>`:""}</div>`).join("")||'<p class="helper">No payments yet.</p>'}
          </div>
        </div>
      </div>
    </div>
  `}function Zt(e,t){return`
    <section class="grid content full">
      <article class="panel">
        ${D("Customer Management","Customer records from local offline storage")}
        <div class="summary-list">
          <div><span>Total customers</span><strong>${e.length}</strong></div>
          <div><span>Orders linked</span><strong>${t.length}</strong></div>
        </div>
      </article>
      <article class="panel">
        ${D("Customer list","Names, phones, and addresses")}
        <div class="table">
          <div class="table-head"><div>Name</div><div>Phone</div><div>Address</div><div></div><div></div></div>
          ${e.map(a=>`<div class="table-row"><div><strong>${d(a.name)}</strong></div><div>${d(a.phone??"No phone")}</div><div>${d(a.address??"No address")}</div><div></div><div></div></div>`).join("")||'<div class="helper">No customers yet.</div>'}
        </div>
      </article>
    </section>
  `}function ea(e,t){return`
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
          <div class="form-row">
            <label>Includes<input name="includes" placeholder="Wash,Dry,Fold" /></label>
            <label>Turnaround hours<input name="turnaroundHours" type="number" min="0" step="1" value="24" /></label>
          </div>
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
          <label>Additional fee per extra KG<input name="additionalFee" type="number" min="0" step="0.01" value="0" /></label>
          <button class="primary" type="submit">Save category</button>
        </form>
      </article>
      <article class="panel span-2">
        <div class="table">
          <div class="table-head"><div>Name</div><div>Type</div><div>Price</div><div>Includes</div><div>Active</div><div>Actions</div></div>
          ${e.map(a=>`<div class="table-row"><div>${d(a.name)}</div><div>${d(a.serviceType)}</div><div>${$(a.price)}</div><div>${d(a.includes.join(", "))}</div><div>${a.isActive?"Yes":"No"}</div>
          <div class="row-actions">
            <button class="secondary edit-service-btn" data-id="${a.id}">Edit</button>
            ${a.isActive?`<button class="secondary deactivate-service-btn" data-id="${a.id}">Deactivate</button>`:`<button class="secondary activate-service-btn" data-id="${a.id}">Activate</button>`}
          </div></div>`).join("")}
        </div>
        <div class="section-divider"></div>
        <div class="table">
          <div class="table-head"><div>Name</div><div>Max KG</div><div>Extra fee</div><div></div><div></div></div>
          ${t.map(a=>`<div class="table-row"><div>${d(a.name)}</div><div>${a.maxKg}</div><div>${$(a.additionalFee)}</div><div></div><div></div></div>`).join("")}
        </div>
      </article>
    </section>
  `}function ta(e,t){const a=j(),n=a.slice(0,7),r=e.filter(c=>c.expenseDate===a).reduce((c,l)=>c+l.amount,0),s=e.filter(c=>c.expenseDate.startsWith(n)).reduce((c,l)=>c+l.amount,0),o=t.filter(c=>c.saleDate===a).reduce((c,l)=>c+l.totalAmount,0),i=t.filter(c=>c.saleDate.startsWith(n)).reduce((c,l)=>c+l.totalAmount,0);return`
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
      <div class="panel stat"><div class="card-label">Daily disbursement</div><div class="value">${$(r)}</div></div>
      <div class="panel stat"><div class="card-label">Monthly disbursement</div><div class="value">${$(s)}</div></div>
      <div class="panel stat"><div class="card-label">Today sales input</div><div class="value">${$(o)}</div></div>
      <div class="panel stat"><div class="card-label">Month sales input</div><div class="value">${$(i)}</div></div>
    </section>
    ${f.dailyReportTab==="expenses"?`
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
          ${e.map(c=>`<div class="table-row"><div>${d(c.expenseDate)}</div><div>${d(c.number)}</div><div>${d(c.name)}</div><div>${d(c.category)}</div><div>${$(c.amount)}</div></div>`).join("")||'<div class="helper">No expenses yet.</div>'}
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
          ${t.map(c=>`<div class="table-row"><div>${d(c.saleNumber)}</div><div>${d(c.saleDate)}</div><div>${$(c.cashAmount)}</div><div>${$(c.gcashAmount)}</div><div><strong>${$(c.totalAmount)}</strong></div></div>`).join("")||'<div class="helper">No daily sales totals yet.</div>'}
        </div>
      </article>
    </section>
    `}
  `}function aa(e,t,a,n,r,s,o){return`
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
            <label><input type="checkbox" name="reportType" value="summary" checked /> Summary</label>
          </div>
        </div>
      </div>
      <div class="section-divider"></div>
      <div class="report-actions">
        <p>Summary computes sales minus disbursement for the selected dates.</p>
        <div>
          <button class="secondary" id="email-report" type="button">Send to Email</button>
          <button class="primary" id="export-report" type="button">Export Excel</button>
        </div>
      </div>
    </section>
  `}function na(e,t){return`
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
          ${e.map(a=>`<div class="table-row"><div><strong>${d(a.name)}</strong></div><div>${d(a.category)}</div><div>${$(a.price)}</div><div>${a.maxKg} kg</div><div>${a.isActive?"Active":"Inactive"}</div></div>`).join("")}
        </div>
      </article>
    </section>
  `}function sa(e,t,a){const n=e.filter(s=>s.status!=="under_cleaning"),r=e.filter(s=>s.status==="under_cleaning");return`
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
        ${D("Available Machines","Select machines to start cleaning.")}
        <form id="subcleaning-form" class="form">
          <input type="hidden" name="date" value="${j()}" />
          <fieldset class="machine-list">
            ${n.map(s=>`<label class="machine-card"><input type="checkbox" name="machineIds" value="${s.id}" /><span><strong>${d(s.machineName)}</strong><small>${d(s.machineType)}</small></span><em></em></label>`).join("")||'<p class="helper">All machines are currently being cleaned.</p>'}
          </fieldset>
          <input type="hidden" name="cleaningStatus" value="in_progress" />
          <label>Notes <textarea name="notes" placeholder="e.g. Deep clean filters"></textarea></label>
          <input type="hidden" name="branch" value="${d(a)}" />
          <button class="primary" type="submit">Start Cleaning</button>
        </form>
      </article>
      <article class="panel warning-panel">
        ${D("Under Cleaning","Machines currently being serviced.")}
        <div class="machine-stack">
          ${r.length?r.map(s=>`
            <div class="machine-status">
              <span><strong>${d(s.machineName)}</strong><small>${d(s.machineType)}</small></span>
              <b>In progress</b>
              <button class="secondary complete-cleaning-btn" type="button" data-machine-id="${s.id}" data-branch="${d(a)}">Mark Complete</button>
            </div>`).join(""):'<p class="helper">No machines under cleaning right now.</p>'}
        </div>
      </article>
      <article class="panel span-2">
        ${D("Daily Cleaning Checklist","Track which machines have been cleaned today.")}
        <div class="table">
          <div class="table-head"><div>Machine</div><div>Type</div><div>Status</div><div>Notes</div><div>Date</div></div>
          ${e.map(s=>{const o=t.find(i=>i.machineIds.includes(s.id)&&i.date===j());return`<div class="table-row"><div><strong>${d(s.machineName)}</strong></div><div>${d(s.machineType)}</div><div>${o?d(o.cleaningStatus.replace("_"," ")):"Not Cleaned"}</div><div>${d(o?.notes??"-")}</div><div>${j()}</div></div>`}).join("")}
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
          <input type="hidden" name="branch" value="${d(a)}" />
          <button class="primary" type="submit">Add machine</button>
        </form>
      </article>
      <article class="panel">
        ${D("Machines","Washer and dryer status")}
        <div class="table">
          <div class="table-head"><div>Name</div><div>Type</div><div>Status</div><div>Branch</div><div>Actions</div></div>
          ${e.map(s=>`<div class="table-row"><div><strong>${d(s.machineName)}</strong></div><div>${d(s.machineType)}</div><div>${d(s.status.replace("_"," "))}</div><div>${d(s.branch)}</div>
          <div class="row-actions">
            ${s.status!=="inactive"?`<button class="secondary deactivate-machine-btn" data-id="${s.id}">Deactivate</button>`:`<button class="secondary activate-machine-btn" data-id="${s.id}">Activate</button>`}
          </div></div>`).join("")||'<div class="helper">No machines found.</div>'}
        </div>
      </article>
    </section>
    `}
  `}function ra(e,t){return`
    <section class="grid">
      <div class="page-head">
        <div>
          <p class="eyebrow">Team Management</p>
          <h2>Staff Overview</h2>
        </div>
        <button class="primary" id="open-add-staff-modal" type="button">+ Add staff</button>
      </div>

      <article class="panel">
        ${D("Staff list","Branch: "+d(t))}
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
  `}function ia(e,t,a){return`
    <section class="grid content full">
      <article class="panel">
        ${D("Settings","Device-local configuration")}
        <form id="settings-form" class="form">
          <label>Current branch<select name="branch">
            ${["Main Store","Mintal Branch","Gensan Branch"].map(n=>`<option value="${n}" ${n===e?"selected":""}>${n}</option>`).join("")}
          </select></label>
          <label>Fold rate<input name="foldRate" type="number" min="0" step="0.01" value="${t}" /></label>
          <label>Report email<input name="reportEmail" type="email" placeholder="admin@laba101.test" value="${d(a)}" /></label>
          <button class="primary" type="submit">Save settings</button>
        </form>
      </article>
    </section>
  `}function oa(){const e=()=>{localStorage.removeItem(z),f.currentUser=null,f.tab="dashboard",f.receiptOrderId=0,f.sidebarOpen=!1,C()};document.querySelector("#logout-button")?.addEventListener("click",e),document.querySelector("#mobile-logout-button")?.addEventListener("click",e),document.querySelector("#mobile-menu-button")?.addEventListener("click",()=>{f.sidebarOpen=!0,C()}),document.querySelector("#sidebar-close-button")?.addEventListener("click",()=>{f.sidebarOpen=!1,C()}),document.querySelector("#sidebar-backdrop")?.addEventListener("click",()=>{f.sidebarOpen=!1,C()}),document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{f.tab=t.dataset.tab,f.receiptOrderId=0,f.sidebarOpen=!1,C()})}),document.querySelectorAll("[data-quick-tab]").forEach(t=>{t.addEventListener("click",()=>{f.tab=t.dataset.quickTab,C()})}),document.querySelectorAll("[data-receipt]").forEach(t=>{t.addEventListener("click",()=>{f.receiptOrderId=Number(t.dataset.receipt),C()})}),document.querySelector("[data-close-receipt]")?.addEventListener("click",()=>{f.receiptOrderId=0,C()}),document.querySelector("[data-print-receipt]")?.addEventListener("click",()=>{window.print()}),document.querySelectorAll("[data-report-tab]").forEach(t=>{t.addEventListener("click",()=>{f.dailyReportTab=t.dataset.reportTab,C()})}),document.querySelectorAll("[data-maintenance-tab]").forEach(t=>{t.addEventListener("click",()=>{f.maintenanceTab=t.dataset.maintenanceTab,C()})})}function ca(){Yt(),document.querySelector("#login-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget),a=document.querySelector("#login-button");a&&(a.disabled=!0,a.textContent="Signing in...");try{const n=await _e(String(t.get("email")??""),String(t.get("password")??""));if(!n){f.loginError="Invalid email or password.",await C();return}f.currentUser=n,f.loginError="",await se("branch",String(n.branch||"Main Store")),t.get("remember")?localStorage.setItem(z,JSON.stringify({email:n.email,remembered:!0})):localStorage.removeItem(z),Ye().includes(f.tab)||(f.tab="dashboard"),await C()}catch(n){alert("Login Error: "+String(n?.message||n)),a&&(a.disabled=!1,a.textContent="Sign in")}})}function la(){ne&&window.clearInterval(ne);const e=document.querySelector("[data-dashboard-time]"),t=document.querySelector("[data-dashboard-date]");if(!e||!t){ne=void 0;return}const a=()=>{const n=Ge();e.textContent=n.time,t.textContent=n.date};a(),ne=window.setInterval(a,1e3)}function da(e){const t=document.querySelector("#order-form"),a=document.querySelector("#price-preview"),n=t?.querySelector('button[type="submit"]'),r=t?.querySelector('select[name="customerId"]'),s=t?.querySelector('input[name="customerName"]'),o=t?.querySelector('input[name="customerPhone"]'),i=t?.querySelector("[data-category-weight]"),c=t?.querySelector("[data-order-error]"),l=t?.querySelector('select[name="paymentMethod"]'),p=t?.querySelector(".gcash-reference"),h=t?.querySelector('input[name="paymentReference"]'),u=()=>{if(!r||!s||!o)return;const m=r.selectedOptions[0];s.value=m?.dataset.name??"",o.value=m?.dataset.phone??""},x=()=>{const m=l?.value==="gcash";p&&(p.hidden=!m),h&&(h.required=m,m||(h.value=""))},T=()=>{if(!t||!a)return;const m=new FormData(t),v=e.services.find(R=>R.id===Number(m.get("serviceId"))),b=e.categories.find(R=>R.id===Number(m.get("itemCategoryId"))),L=e.services.filter(R=>m.getAll("addonIds").map(Number).includes(R.id));if(!v||!b)return;const N=we(v,b,Number(m.get("weightKg")??0),L);i&&(i.textContent=`Allowed item weight: ${b.maxKg} kg`);const y=L.map(R=>pe(R.name)),q=N.extraKg>0;n&&(n.disabled=q),c&&(c.hidden=!q,c.textContent=N.warning??""),a.classList.toggle("has-error",q),a.innerHTML=`
      <div class="preview-line"><span>Base price</span><strong>${$(N.price)}</strong></div>
      ${N.extraServiceAmount>0?`<div class="preview-line"><span>Extra services${y.length?` (${d(y.join(", "))})`:""}</span><strong>${$(N.extraServiceAmount)}</strong></div>`:""}
      <div class="preview-total"><span>Total amount</span><strong>${$(N.totalAmount)}</strong></div>
      ${N.warning?`<span class="warn">${d(N.warning)}</span>`:""}
    `};r?.addEventListener("change",u),l?.addEventListener("change",x),x(),t?.addEventListener("input",T),t?.addEventListener("change",T),T(),t?.addEventListener("submit",async m=>{m.preventDefault();const v=new FormData(t),b=e.services.find(y=>y.id===Number(v.get("serviceId"))),L=e.categories.find(y=>y.id===Number(v.get("itemCategoryId"))),N=e.services.filter(y=>v.getAll("addonIds").map(Number).includes(y.id));if(b&&L){const y=we(b,L,Number(v.get("weightKg")??0),N);if(y.extraKg>0){c&&(c.hidden=!1,c.textContent=y.warning??"Weight exceeds the allowed limit.");return}}try{await $t({customerId:Number(v.get("customerId"))||void 0,customerName:String(v.get("customerName")??""),customerPhone:String(v.get("customerPhone")??"")||null,serviceId:Number(v.get("serviceId")),itemCategoryId:Number(v.get("itemCategoryId")),branch:e.branch,weightKg:Number(v.get("weightKg")),addonIds:v.getAll("addonIds").map(Number),paidAmount:Number(v.get("paidAmount")??0),paymentMethod:String(v.get("paymentMethod")??"cash"),paymentReference:String(v.get("paymentReference")??"")||null,notes:String(v.get("notes")??"")||null}),await C()}catch(y){c&&(c.hidden=!1,c.textContent=y instanceof Error?y.message:"Order could not be saved.")}}),document.querySelectorAll(".advance-form").forEach(m=>{m.addEventListener("submit",async v=>{v.preventDefault();const b=new FormData(m);await Rt(Number(m.dataset.orderId),Number(b.get("assignedStaffId"))||null),await C()})}),document.querySelectorAll(".payment-form").forEach(m=>{const v=m.querySelector('select[name="method"]'),b=m.querySelector('input[name="reference"]'),L=()=>{const N=v?.value==="gcash";b&&(b.hidden=!N,b.required=N,N||(b.value=""))};v?.addEventListener("change",L),L(),m.addEventListener("submit",async N=>{N.preventDefault();const y=new FormData(m);await Xe(Number(m.dataset.orderId),{amount:Number(y.get("amount")),method:String(y.get("method")),reference:String(y.get("reference")??"")||null}),await C()})})}function ua(e){document.querySelector("#service-form")?.addEventListener("submit",async t=>{t.preventDefault();const a=new FormData(t.currentTarget),n=a.get("id")?Number(a.get("id")):void 0;await qe({id:n,name:String(a.get("name")??""),description:String(a.get("description")??"")||null,category:String(a.get("category")??""),serviceType:String(a.get("serviceType")??"order"),price:Number(a.get("price")??0),maxKg:Number(a.get("maxKg")??0),dryingMinutes:Number(a.get("dryingMinutes"))||null,includes:String(a.get("includes")??"").split(",").map(r=>r.trim()).filter(Boolean),additionalCharge:0,turnaroundHours:Number(a.get("turnaroundHours")??24),isActive:1}),await C()}),document.querySelectorAll(".edit-service-btn").forEach(t=>{t.addEventListener("click",()=>{const a=Number(t.dataset.id),n=e.find(s=>s.id===a),r=document.querySelector("#service-form");n&&r&&(r.querySelector("[name=id]").value=String(n.id),r.querySelector("[name=name]").value=n.name,r.querySelector("[name=category]").value=n.category,r.querySelector("[name=serviceType]").value=n.serviceType,r.querySelector("[name=price]").value=String(n.price),r.querySelector("[name=maxKg]").value=String(n.maxKg),r.querySelector("[name=dryingMinutes]").value=n.dryingMinutes?String(n.dryingMinutes):"",r.querySelector("[name=includes]").value=n.includes.join(", "),r.querySelector("[name=turnaroundHours]").value=String(n.turnaroundHours),r.querySelector("[name=description]").value=n.description??"",window.scrollTo({top:0,behavior:"smooth"}))})}),document.querySelectorAll(".deactivate-service-btn, .activate-service-btn").forEach(t=>{t.addEventListener("click",async()=>{const a=Number(t.dataset.id),n=e.find(r=>r.id===a);if(n){const r=n.isActive?0:1;await qe({id:n.id,name:n.name,description:n.description,category:n.category,serviceType:n.serviceType,price:n.price,maxKg:n.maxKg,dryingMinutes:n.dryingMinutes,includes:n.includes,additionalCharge:n.additionalCharge,turnaroundHours:n.turnaroundHours,isActive:r}),await C()}})}),document.querySelector("#category-form")?.addEventListener("submit",async t=>{t.preventDefault();const a=new FormData(t.currentTarget);await Lt({name:String(a.get("name")??""),maxKg:Number(a.get("maxKg")??0),additionalFee:Number(a.get("additionalFee")??0),isActive:1}),await C()})}function ma(){document.querySelector("#expense-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await qt({expenseDate:String(t.get("expenseDate")??""),name:String(t.get("name")??""),category:String(t.get("category")??""),description:String(t.get("description")??""),amount:Number(t.get("amount")??0)}),await C()}),document.querySelector("#fold-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await Dt({orderTicket:String(t.get("orderTicket")??""),staffName:String(t.get("staffName")??""),foldCount:Number(t.get("foldCount")??1),rate:Number(t.get("rate")??5)}),await C()})}function va(e,t,a,n){document.querySelector("#sales-form")?.addEventListener("submit",async m=>{m.preventDefault();const v=new FormData(m.currentTarget);await kt({saleDate:String(v.get("saleDate")??""),cashAmount:Number(v.get("cashAmount")??0),gcashAmount:Number(v.get("gcashAmount")??0),notes:String(v.get("notes")??"")}),await C()});const r=document.querySelector("[data-date-from]"),s=document.querySelector("[data-date-to]");document.querySelectorAll("[data-date-scope]").forEach(m=>{m.addEventListener("change",()=>{if(!m.checked||!r||!s)return;const v=new Date,b=me(v),L=new Date(v);m.value==="week"&&L.setDate(v.getDate()-6),m.value==="month"&&L.setDate(1),m.value!=="custom"&&(r.value=m.value==="today"?b:me(L),s.value=b)})});const o=()=>new Set(Array.from(document.querySelectorAll('input[name="reportType"]:checked')).map(m=>m.value)),i=()=>({from:r?.value||"0000-01-01",to:s?.value||"9999-12-31"}),c=m=>{const v=i();return m>=v.from&&m<=v.to},l=()=>{const m=o(),v=e.filter(g=>c(re(g.createdAt))),b=t.filter(g=>c(g.saleDate)),L=a.filter(g=>c(g.expenseDate)),N=He(e.filter(g=>c(re(g.createdAt))),n),y=v.reduce((g,O)=>g+O.paidAmount,0)+b.reduce((g,O)=>g+O.totalAmount,0),q=L.reduce((g,O)=>g+O.amount,0)+N.reduce((g,O)=>g+O.total,0),R=[["Type","Date","Number","Name","Cash","GCash","Total","Balance"]];return m.has("sales")&&(R.push(...v.map(g=>["Order",re(g.createdAt),g.ticket,g.customer,"","",g.paidAmount,g.balance])),R.push(...b.map(g=>["Manual Sale",g.saleDate,g.saleNumber,g.notes??"",g.cashAmount,g.gcashAmount,g.totalAmount,""]))),m.has("disbursement")&&(R.push(...L.map(g=>["Expense",g.expenseDate,g.number,g.name,"","",g.amount,""])),R.push(...N.map(g=>["Fold Payout",i().from,`${g.folds} fold(s)`,g.staffName,"","",g.total,""]))),m.has("summary")&&(R.push([]),R.push(["Summary",i().from,"to",i().to,"","","",""]),R.push(["Total Sales","","","","","",y,""]),R.push(["Total Disbursement","","","","","",q,""]),R.push(["Profit","","","","","",y-q,""])),R},p=m=>{const v=m.map(b=>b.length?`<tr>${b.map(L=>`<td>${d(String(L??""))}</td>`).join("")}</tr>`:'<tr><td colspan="8">&nbsp;</td></tr>').join("");return`<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; }
    table { border-collapse: collapse; }
    td { border: 1px solid #c8d3ea; padding: 6px 10px; }
    tr:first-child td { background: #061a42; color: #fff; font-weight: bold; }
  </style>
</head>
<body>
  <h1>Laba101 POS Export</h1>
  <p><strong>Date from:</strong> ${d(i().from)}</p>
  <p><strong>Date to:</strong> ${d(i().to)}</p>
  <table>${v}</table>
</body>
</html>`},h=()=>{const m=i(),v=p(l()),b=`laba101-report-${m.from}-to-${m.to}.xls`;return new File([v],b,{type:"application/vnd.ms-excel"})},u=async()=>{const m=h();if(!Capacitor.isNativePlatform())return{fileName:m.name,uri:""};await te.requestPermissions();const v=await m.text(),b="Laba101 Reports",L=`${b}/${m.name}`;await te.mkdir({path:b,directory:V.Documents,recursive:!0}),await te.writeFile({path:L,data:v,directory:V.Documents,encoding:ge.UTF8});const{uri:N}=await te.getUri({path:L,directory:V.Documents});return{fileName:m.name,uri:N}},x=()=>{const m=p(l()),v=i(),b=`laba101-report-${v.from}-to-${v.to}.xls`,L=new Blob([m],{type:"application/vnd.ms-excel"}),N=URL.createObjectURL(L),y=document.createElement("a");return y.href=N,y.download=b,document.body.appendChild(y),y.click(),setTimeout(()=>{y.remove(),URL.revokeObjectURL(N)},1e3),b},T=async m=>{const v=document.querySelector(m==="export"?"#export-report":"#email-report");v&&(v.disabled=!0,v.textContent=m==="export"?"Exporting...":"Sending...");try{if(m==="export")if(Capacitor.isNativePlatform()){const b=await u();alert(`Report saved to device storage: ${b.fileName}`)}else{const b=x();alert(`Report saved: ${b}`)}else{const b=await Fe("report_email")||"";if(!b){alert("Please configure a report email in Settings first.");return}const L=i(),N=`Laba101 report ${L.from} to ${L.to}`;if(Capacitor.isNativePlatform()){const y=await u();await dt.share({title:N,text:`Please find the attached Laba101 report file: ${y.fileName}`,files:[y.uri],dialogTitle:"Send report via email"}),alert(`Report saved and shared as "${y.fileName}".`)}else{const y=x(),q=`Hi,

Please find the attached Laba101 report file: ${y}

Date range: ${L.from} to ${L.to}`,R=`mailto:${b}?subject=${encodeURIComponent(N)}&body=${encodeURIComponent(q)}`;setTimeout(()=>{window.location.href=R},800),alert(`Report downloaded as "${y}".
Your email app will open — please attach the file and send.`)}}}catch(b){alert("Failed: "+String(b))}finally{v&&(v.disabled=!1,v.textContent=m==="export"?"Export Excel":"Send to Email")}};document.querySelector("#export-report")?.addEventListener("click",async()=>{await T("export")}),document.querySelector("#email-report")?.addEventListener("click",async()=>{await T("email")})}function fa(){document.querySelector("#machine-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await Mt({machineName:String(t.get("machineName")??""),machineType:String(t.get("machineType")),status:String(t.get("status")),branch:String(t.get("branch")??"")}),await C()}),document.querySelector("#subcleaning-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=e.currentTarget.querySelector('button[type="submit"]');t&&(t.disabled=!0,t.textContent="Starting...");const a=new FormData(e.currentTarget),n=a.getAll("machineIds").map(Number);if(!n.length){alert("Please select at least one machine to clean."),t&&(t.disabled=!1,t.textContent="Start Cleaning");return}await _t({date:String(a.get("date")??""),machineIds:n,cleaningStatus:String(a.get("cleaningStatus")??""),notes:String(a.get("notes")??""),branch:String(a.get("branch")??"")}),await C()}),document.querySelectorAll(".complete-cleaning-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.machineId),a=e.dataset.branch??"";e.disabled=!0,e.textContent="Completing...",await Bt(t,a),await C()})}),document.querySelectorAll(".deactivate-machine-btn, .activate-machine-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.id),a=e.classList.contains("deactivate-machine-btn");await Ft(t,a?"inactive":"available"),await C()})})}function pa(e){const t=document.querySelector("#add-staff-modal"),a=document.querySelector("#open-add-staff-modal"),n=document.querySelector("#close-add-staff-modal"),r=document.querySelector("#staff-form"),s=()=>{r?.reset(),r&&(r.querySelector("[name=id]").value="");const i=document.querySelector("#add-staff-title");i&&(i.textContent="Add staff member"),t?.removeAttribute("hidden")},o=()=>{t?.setAttribute("hidden",""),r?.reset()};a?.addEventListener("click",s),n?.addEventListener("click",o),t?.addEventListener("click",i=>{i.target===t&&o()}),document.querySelectorAll(".edit-staff-btn").forEach(i=>{i.addEventListener("click",()=>{const c=Number(i.dataset.id),l=e.find(p=>p.id===c);if(l&&r){r.querySelector("[name=id]").value=String(l.id),r.querySelector("[name=name]").value=l.name,r.querySelector("[name=email]").value=l.email,r.querySelector("[name=password]").value=l.password,r.querySelector("[name=role]").value=l.role,r.querySelector("[name=branch]").value=l.branch;const p=document.querySelector("#add-staff-title");p&&(p.textContent="Edit staff member"),t?.removeAttribute("hidden")}})}),document.querySelectorAll(".deactivate-staff-btn, .activate-staff-btn").forEach(i=>{i.addEventListener("click",async()=>{const c=Number(i.dataset.id),l=e.find(p=>p.id===c);l&&(await Ie(c,{isActive:l.isActive!==0?0:1}),await C())})}),r?.addEventListener("submit",async i=>{i.preventDefault();const c=document.querySelector("#staff-save-btn");c&&(c.disabled=!0,c.textContent="Saving...");const l=new FormData(r),p=l.get("id")?Number(l.get("id")):void 0,h=String(l.get("name")??"").trim(),u=String(l.get("email")??"").trim(),x=String(l.get("password")??"password")||"password",T=String(l.get("role")),m=String(l.get("branch")??"");if(!h||!u){alert("Name and email are required."),c&&(c.disabled=!1,c.textContent="Save staff member");return}try{p?await Ie(p,{name:h,email:u,password:x,role:T,branch:m}):await Tt({name:h,email:u,password:x,role:T,branch:m}),o(),await C()}catch{alert("Failed to save staff. The email may already be in use."),c&&(c.disabled=!1,c.textContent="Save staff member")}})}function ha(){document.querySelector("#settings-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await se("branch",String(t.get("branch")??"Main Store")),await se("fold_rate",String(t.get("foldRate")??"5")),String(t.get("reportEmail")??"")&&await se("report_email",String(t.get("reportEmail"))),alert("Settings saved successfully!"),await C()})}await wt();const ke=localStorage.getItem(z);if(ke)try{const e=JSON.parse(ke);if(e.email&&e.remembered){const t=await _e(e.email,"password")??null;f.currentUser=t}}catch{localStorage.removeItem(z)}await C();export{ge as E,Se as W,st as b};
