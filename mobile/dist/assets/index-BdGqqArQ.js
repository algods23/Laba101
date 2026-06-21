(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();var he;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(he||(he={}));class Ue extends Error{constructor(t,n,a){super(t),this.message=t,this.code=n,this.data=a}}const Kt=e=>{var t,n;return e?.androidBridge?"android":!((n=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||n===void 0)&&n.bridge?"ios":"web"},Vt=e=>{const t=e.CapacitorCustomPlatform||null,n=e.Capacitor||{},a=n.Plugins=n.Plugins||{},r=()=>t!==null?t.name:Kt(e),s=()=>r()!=="web",i=m=>{const v=d.get(m);return!!(v?.platforms.has(r())||l(m))},l=m=>{var v;return(v=n.PluginHeaders)===null||v===void 0?void 0:v.find(f=>f.name===m)},c=m=>e.console.error(m),d=new Map,u=(m,v={})=>{const f=d.get(m);if(f)return console.warn(`Capacitor plugin "${m}" already registered. Cannot register plugins twice.`),f.proxy;const C=r(),q=l(m);let N;const E=async()=>(!N&&C in v?N=typeof v[C]=="function"?N=await v[C]():N=v[C]:t!==null&&!N&&"web"in v&&(N=typeof v.web=="function"?N=await v.web():N=v.web),N),y=(D,I)=>{var P,U;if(q){const B=q?.methods.find(_=>I===_.name);if(B)return B.rtype==="promise"?_=>n.nativePromise(m,I.toString(),_):(_,J)=>n.nativeCallback(m,I.toString(),_,J);if(D)return(P=D[I])===null||P===void 0?void 0:P.bind(D)}else{if(D)return(U=D[I])===null||U===void 0?void 0:U.bind(D);throw new Ue(`"${m}" plugin is not implemented on ${C}`,he.Unimplemented)}},b=D=>{let I;const P=(...U)=>{const B=E().then(_=>{const J=y(_,D);if(J){const ae=J(...U);return I=ae?.remove,ae}else throw new Ue(`"${m}.${D}()" is not implemented on ${C}`,he.Unimplemented)});return D==="addListener"&&(B.remove=async()=>I()),B};return P.toString=()=>`${D.toString()}() { [capacitor code] }`,Object.defineProperty(P,"name",{value:D,writable:!1,configurable:!1}),P},g=b("addListener"),L=b("removeListener"),x=(D,I)=>{const P=g({eventName:D},I),U=async()=>{const _=await P;L({eventName:D,callbackId:_},I)},B=new Promise(_=>P.then(()=>_({remove:U})));return B.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await U()},B},O=new Proxy({},{get(D,I){switch(I){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return q?x:g;case"removeListener":return L;default:return b(I)}}});return a[m]=O,d.set(m,{name:m,proxy:O,platforms:new Set([...Object.keys(v),...q?[C]:[]])}),O};return n.convertFileSrc||(n.convertFileSrc=m=>m),n.getPlatform=r,n.handleError=c,n.isNativePlatform=s,n.isPluginAvailable=i,n.registerPlugin=u,n.Exception=Ue,n.DEBUG=!!n.DEBUG,n.isLoggingEnabled=!!n.isLoggingEnabled,n},Yt=e=>e.Capacitor=Vt(e),$=Yt(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),pe=$.registerPlugin;class Ge{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,n){let a=!1;this.listeners[t]||(this.listeners[t]=[],a=!0),this.listeners[t].push(n);const s=this.windowListeners[t];s&&!s.registered&&this.addWindowListener(s),a&&this.sendRetainedArgumentsForEvent(t);const i=async()=>this.removeListener(t,n);return Promise.resolve({remove:i})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,n,a){const r=this.listeners[t];if(!r){if(a){let s=this.retainedEventArguments[t];s||(s=[]),s.push(n),this.retainedEventArguments[t]=s}return}r.forEach(s=>s(n))}hasListeners(t){var n;return!!(!((n=this.listeners[t])===null||n===void 0)&&n.length)}registerWindowListener(t,n){this.windowListeners[n]={registered:!1,windowEventName:t,pluginEventName:n,handler:a=>{this.notifyListeners(n,a)}}}unimplemented(t="not implemented"){return new $.Exception(t,he.Unimplemented)}unavailable(t="not available"){return new $.Exception(t,he.Unavailable)}async removeListener(t,n){const a=this.listeners[t];if(!a)return;const r=a.indexOf(n);this.listeners[t].splice(r,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const n=this.retainedEventArguments[t];n&&(delete this.retainedEventArguments[t],n.forEach(a=>{this.notifyListeners(t,a)}))}}const at=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),nt=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class Qt extends Ge{async getCookies(){const t=document.cookie,n={};return t.split(";").forEach(a=>{if(a.length<=0)return;let[r,s]=a.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");r=nt(r).trim(),s=nt(s).trim(),n[r]=s}),n}async setCookie(t){try{const n=at(t.key),a=at(t.value),r=t.expires?`; expires=${t.expires.replace("expires=","")}`:"",s=(t.path||"/").replace("path=",""),i=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${n}=${a||""}${r}; path=${s}; ${i};`}catch(n){return Promise.reject(n)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(n){return Promise.reject(n)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const n of t)document.cookie=n.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}pe("CapacitorCookies",{web:()=>new Qt});const Jt=async e=>new Promise((t,n)=>{const a=new FileReader;a.onload=()=>{const r=a.result;t(r.indexOf(",")>=0?r.split(",")[1]:r)},a.onerror=r=>n(r),a.readAsDataURL(e)}),zt=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(r=>r.toLocaleLowerCase()).reduce((r,s,i)=>(r[s]=e[t[i]],r),{})},Zt=(e,t=!0)=>e?Object.entries(e).reduce((a,r)=>{const[s,i]=r;let l,c;return Array.isArray(i)?(c="",i.forEach(d=>{l=t?encodeURIComponent(d):d,c+=`${s}=${l}&`}),c.slice(0,-1)):(l=t?encodeURIComponent(i):i,c=`${s}=${l}`),`${a}&${c}`},"").substr(1):null,ea=(e,t={})=>{const n=Object.assign({method:e.method||"GET",headers:e.headers},t),r=zt(e.headers)["content-type"]||"";if(typeof e.data=="string")n.body=e.data;else if(r.includes("application/x-www-form-urlencoded")){const s=new URLSearchParams;for(const[i,l]of Object.entries(e.data||{}))s.set(i,l);n.body=s.toString()}else if(r.includes("multipart/form-data")||e.data instanceof FormData){const s=new FormData;if(e.data instanceof FormData)e.data.forEach((l,c)=>{s.append(c,l)});else for(const l of Object.keys(e.data))s.append(l,e.data[l]);n.body=s;const i=new Headers(n.headers);i.delete("content-type"),n.headers=i}else(r.includes("application/json")||typeof e.data=="object")&&(n.body=JSON.stringify(e.data));return n};class ta extends Ge{async request(t){const n=ea(t,t.webFetchExtra),a=Zt(t.params,t.shouldEncodeUrlParams),r=a?`${t.url}?${a}`:t.url,s=await fetch(r,n),i=s.headers.get("content-type")||"";let{responseType:l="text"}=s.ok?t:{};i.includes("application/json")&&(l="json");let c,d;switch(l){case"arraybuffer":case"blob":d=await s.blob(),c=await Jt(d);break;case"json":c=await s.json();break;default:c=await s.text()}const u={};return s.headers.forEach((m,v)=>{u[v]=m}),{data:c,headers:u,status:s.status,url:s.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}pe("CapacitorHttp",{web:()=>new ta});var rt;(function(e){e.Dark="DARK",e.Light="LIGHT",e.Default="DEFAULT"})(rt||(rt={}));var st;(function(e){e.StatusBar="StatusBar",e.NavigationBar="NavigationBar"})(st||(st={}));class aa extends Ge{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}pe("SystemBars",{web:()=>new aa});const na="modulepreload",ra=function(e){return"/"+e},it={},Ke=function(t,n,a){let r=Promise.resolve();if(n&&n.length>0){let c=function(d){return Promise.all(d.map(u=>Promise.resolve(u).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),l=i?.nonce||i?.getAttribute("nonce");r=c(n.map(d=>{if(d=ra(d),d in it)return;it[d]=!0;const u=d.endsWith(".css"),m=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${m}`))return;const v=document.createElement("link");if(v.rel=u?"stylesheet":na,u||(v.as="script"),v.crossOrigin="",v.href=d,l&&v.setAttribute("nonce",l),document.head.appendChild(v),u)return new Promise((f,C)=>{v.addEventListener("load",f),v.addEventListener("error",()=>C(new Error(`Unable to preload CSS for ${d}`)))})}))}function s(i){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=i,window.dispatchEvent(l),!l.defaultPrevented)throw i}return r.then(i=>{for(const l of i||[])l.status==="rejected"&&s(l.reason);return t().catch(s)})};function sa(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,n){return new Proxy({},{get(a,r){return(s,i,l)=>{const c=e.Capacitor.Plugins[n];if(c===void 0){l(new Error(`Capacitor plugin ${n} not found`));return}if(typeof c[r]!="function"){l(new Error(`Method ${r} not found in Capacitor plugin ${n}`));return}(async()=>{try{const d=await c[r](s);i(d)}catch(d){l(d)}})()}}})}})}function ia(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,n){return e.cordova.plugins[n]}})}function oa(e=!1){typeof window>"u"||(window.CapacitorUtils=window.CapacitorUtils||{},window.Capacitor!==void 0&&!e?sa(window):window.cordova!==void 0&&ia(window))}var $e;(function(e){e.Documents="DOCUMENTS",e.Data="DATA",e.Library="LIBRARY",e.Cache="CACHE",e.External="EXTERNAL",e.ExternalStorage="EXTERNAL_STORAGE",e.ExternalCache="EXTERNAL_CACHE",e.LibraryNoCloud="LIBRARY_NO_CLOUD",e.Temporary="TEMPORARY"})($e||($e={}));var He;(function(e){e.UTF8="utf8",e.ASCII="ascii",e.UTF16="utf16"})(He||(He={}));const ot=pe("Filesystem",{web:()=>Ke(()=>import("./web-lRoDgQmB.js"),[]).then(e=>new e.FilesystemWeb)});oa();const ca=pe("Share",{web:()=>Ke(()=>import("./web-DGDBLoZ6.js"),[]).then(e=>new e.ShareWeb)});class la{constructor(t){this.sqlite=t,this._connectionDict=new Map}async initWebStore(){try{return await this.sqlite.initWebStore(),Promise.resolve()}catch(t){return Promise.reject(t)}}async saveToStore(t){try{return await this.sqlite.saveToStore({database:t}),Promise.resolve()}catch(n){return Promise.reject(n)}}async saveToLocalDisk(t){try{return await this.sqlite.saveToLocalDisk({database:t}),Promise.resolve()}catch(n){return Promise.reject(n)}}async getFromLocalDiskToStore(t){const n=t??!0;try{return await this.sqlite.getFromLocalDiskToStore({overwrite:n}),Promise.resolve()}catch(a){return Promise.reject(a)}}async echo(t){try{const n=await this.sqlite.echo({value:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async isSecretStored(){try{const t=await this.sqlite.isSecretStored();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async setEncryptionSecret(t){try{return await this.sqlite.setEncryptionSecret({passphrase:t}),Promise.resolve()}catch(n){return Promise.reject(n)}}async changeEncryptionSecret(t,n){try{return await this.sqlite.changeEncryptionSecret({passphrase:t,oldpassphrase:n}),Promise.resolve()}catch(a){return Promise.reject(a)}}async clearEncryptionSecret(){try{return await this.sqlite.clearEncryptionSecret(),Promise.resolve()}catch(t){return Promise.reject(t)}}async checkEncryptionSecret(t){try{const n=await this.sqlite.checkEncryptionSecret({passphrase:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async addUpgradeStatement(t,n){try{return t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.addUpgradeStatement({database:t,upgrade:n}),Promise.resolve()}catch(a){return Promise.reject(a)}}async createConnection(t,n,a,r,s){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.createConnection({database:t,encrypted:n,mode:a,version:r,readonly:s});const i=new ct(t,s,this.sqlite),l=s?`RO_${t}`:`RW_${t}`;return this._connectionDict.set(l,i),Promise.resolve(i)}catch(i){return Promise.reject(i)}}async closeConnection(t,n){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.closeConnection({database:t,readonly:n});const a=n?`RO_${t}`:`RW_${t}`;return this._connectionDict.delete(a),Promise.resolve()}catch(a){return Promise.reject(a)}}async isConnection(t,n){const a={};t.endsWith(".db")&&(t=t.slice(0,-3));const r=n?`RO_${t}`:`RW_${t}`;return a.result=this._connectionDict.has(r),Promise.resolve(a)}async retrieveConnection(t,n){t.endsWith(".db")&&(t=t.slice(0,-3));const a=n?`RO_${t}`:`RW_${t}`;if(this._connectionDict.has(a)){const r=this._connectionDict.get(a);return typeof r<"u"?Promise.resolve(r):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async getNCDatabasePath(t,n){try{const a=await this.sqlite.getNCDatabasePath({path:t,database:n});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async createNCConnection(t,n){try{await this.sqlite.createNCConnection({databasePath:t,version:n});const a=new ct(t,!0,this.sqlite),r=`RO_${t})`;return this._connectionDict.set(r,a),Promise.resolve(a)}catch(a){return Promise.reject(a)}}async closeNCConnection(t){try{await this.sqlite.closeNCConnection({databasePath:t});const n=`RO_${t})`;return this._connectionDict.delete(n),Promise.resolve()}catch(n){return Promise.reject(n)}}async isNCConnection(t){const n={},a=`RO_${t})`;return n.result=this._connectionDict.has(a),Promise.resolve(n)}async retrieveNCConnection(t){if(this._connectionDict.has(t)){const n=`RO_${t})`,a=this._connectionDict.get(n);return typeof a<"u"?Promise.resolve(a):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async isNCDatabase(t){try{const n=await this.sqlite.isNCDatabase({databasePath:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async retrieveAllConnections(){return this._connectionDict}async closeAllConnections(){const t=new Map;try{for(const n of this._connectionDict.keys()){const a=n.substring(3),r=n.substring(0,3)==="RO_";await this.sqlite.closeConnection({database:a,readonly:r}),t.set(n,null)}for(const n of t.keys())this._connectionDict.delete(n);return Promise.resolve()}catch(n){return Promise.reject(n)}}async checkConnectionsConsistency(){try{const t=[...this._connectionDict.keys()],n=[],a=[];for(const s of t)n.push(s.substring(0,2)),a.push(s.substring(3));const r=await this.sqlite.checkConnectionsConsistency({dbNames:a,openModes:n});return r.result||(this._connectionDict=new Map),Promise.resolve(r)}catch(t){return this._connectionDict=new Map,Promise.reject(t)}}async importFromJson(t){try{const n=await this.sqlite.importFromJson({jsonstring:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async isJsonValid(t){try{const n=await this.sqlite.isJsonValid({jsonstring:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async copyFromAssets(t){const n=t??!0;try{return await this.sqlite.copyFromAssets({overwrite:n}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getFromHTTPRequest(t,n){const a=n??!0;try{return await this.sqlite.getFromHTTPRequest({url:t,overwrite:a}),Promise.resolve()}catch(r){return Promise.reject(r)}}async isDatabaseEncrypted(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const n=await this.sqlite.isDatabaseEncrypted({database:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async isInConfigEncryption(){try{const t=await this.sqlite.isInConfigEncryption();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isInConfigBiometricAuth(){try{const t=await this.sqlite.isInConfigBiometricAuth();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isDatabase(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const n=await this.sqlite.isDatabase({database:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async getDatabaseList(){try{const n=(await this.sqlite.getDatabaseList()).values;n.sort();const a={values:n};return Promise.resolve(a)}catch(t){return Promise.reject(t)}}async getMigratableDbList(t){const n=t||"default";try{const a=await this.sqlite.getMigratableDbList({folderPath:n});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async addSQLiteSuffix(t,n){const a=t||"default",r=n||[];try{const s=await this.sqlite.addSQLiteSuffix({folderPath:a,dbNameList:r});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async deleteOldDatabases(t,n){const a=t||"default",r=n||[];try{const s=await this.sqlite.deleteOldDatabases({folderPath:a,dbNameList:r});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async moveDatabasesAndAddSuffix(t,n){const a=t||"default",r=n||[];return this.sqlite.moveDatabasesAndAddSuffix({folderPath:a,dbNameList:r})}}class ct{constructor(t,n,a){this.dbName=t,this.readonly=n,this.sqlite=a}getConnectionDBName(){return this.dbName}getConnectionReadOnly(){return this.readonly}async open(){try{return await this.sqlite.open({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async close(){try{return await this.sqlite.close({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async beginTransaction(){try{const t=await this.sqlite.beginTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async commitTransaction(){try{const t=await this.sqlite.commitTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async rollbackTransaction(){try{const t=await this.sqlite.rollbackTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTransactionActive(){try{const t=await this.sqlite.isTransactionActive({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async loadExtension(t){try{return await this.sqlite.loadExtension({database:this.dbName,path:t,readonly:this.readonly}),Promise.resolve()}catch(n){return Promise.reject(n)}}async enableLoadExtension(t){try{return await this.sqlite.enableLoadExtension({database:this.dbName,toggle:t,readonly:this.readonly}),Promise.resolve()}catch(n){return Promise.reject(n)}}async getUrl(){try{const t=await this.sqlite.getUrl({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getVersion(){try{const t=await this.sqlite.getVersion({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getTableList(){try{const t=await this.sqlite.getTableList({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async execute(t,n=!0,a=!0){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const r=await this.sqlite.execute({database:this.dbName,statements:t,transaction:n,readonly:!1,isSQL92:a});return Promise.resolve(r)}}catch(r){return Promise.reject(r)}}async query(t,n,a=!0){let r;try{return n&&n.length>0?r=await this.sqlite.query({database:this.dbName,statement:t,values:n,readonly:this.readonly,isSQL92:!0}):r=await this.sqlite.query({database:this.dbName,statement:t,values:[],readonly:this.readonly,isSQL92:a}),r=await this.reorderRows(r),Promise.resolve(r)}catch(s){return Promise.reject(s)}}async run(t,n,a=!0,r="no",s=!0){let i;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(n&&n.length>0?i=await this.sqlite.run({database:this.dbName,statement:t,values:n,transaction:a,readonly:!1,returnMode:r,isSQL92:!0}):i=await this.sqlite.run({database:this.dbName,statement:t,values:[],transaction:a,readonly:!1,returnMode:r,isSQL92:s}),i.changes=await this.reorderRows(i.changes),Promise.resolve(i))}catch(l){return Promise.reject(l)}}async executeSet(t,n=!0,a="no",r=!0){let s;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(s=await this.sqlite.executeSet({database:this.dbName,set:t,transaction:n,readonly:!1,returnMode:a,isSQL92:r}),s.changes=await this.reorderRows(s.changes),Promise.resolve(s))}catch(i){return Promise.reject(i)}}async isExists(){try{const t=await this.sqlite.isDBExists({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTable(t){try{const n=await this.sqlite.isTableExists({database:this.dbName,table:t,readonly:this.readonly});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async isDBOpen(){try{const t=await this.sqlite.isDBOpen({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async delete(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteDatabase({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async createSyncTable(){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const t=await this.sqlite.createSyncTable({database:this.dbName,readonly:!1});return Promise.resolve(t)}}catch(t){return Promise.reject(t)}}async setSyncDate(t){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.setSyncDate({database:this.dbName,syncdate:t,readonly:!1}),Promise.resolve())}catch(n){return Promise.reject(n)}}async getSyncDate(){try{const t=await this.sqlite.getSyncDate({database:this.dbName,readonly:this.readonly});let n="";return t.syncDate>0&&(n=new Date(t.syncDate*1e3).toISOString()),Promise.resolve(n)}catch(t){return Promise.reject(t)}}async exportToJson(t,n=!1){try{const a=await this.sqlite.exportToJson({database:this.dbName,jsonexportmode:t,readonly:this.readonly,encrypted:n});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async deleteExportedRows(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteExportedRows({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async executeTransaction(t,n=!0){let a=0,r=!1;if(this.readonly)return Promise.reject("not allowed in read-only mode");if(await this.sqlite.beginTransaction({database:this.dbName}),r=await this.sqlite.isTransactionActive({database:this.dbName}),!r)return Promise.reject("After Begin Transaction, no transaction active");try{for(const l of t){if(typeof l!="object"||!("statement"in l))throw new Error("Error a task.statement must be provided");if("values"in l&&l.values&&l.values.length>0){const c=l.statement.toUpperCase().includes("RETURNING")?"all":"no",d=await this.sqlite.run({database:this.dbName,statement:l.statement,values:l.values,transaction:!1,readonly:!1,returnMode:c,isSQL92:n});if(d.changes.changes<0)throw new Error("Error in transaction method run ");a+=d.changes.changes}else{const c=await this.sqlite.execute({database:this.dbName,statements:l.statement,transaction:!1,readonly:!1});if(c.changes.changes<0)throw new Error("Error in transaction method execute ");a+=c.changes.changes}}const s=await this.sqlite.commitTransaction({database:this.dbName});a+=s.changes.changes;const i={changes:{changes:a}};return Promise.resolve(i)}catch(s){const i=s.message?s.message:s;return await this.sqlite.rollbackTransaction({database:this.dbName}),Promise.reject(i)}}async reorderRows(t){const n=t;if(t?.values&&typeof t.values[0]=="object"&&Object.keys(t.values[0]).includes("ios_columns")){const a=t.values[0].ios_columns,r=[];for(let s=1;s<t.values.length;s++){const i=t.values[s],l={};for(const c of a)l[c]=i[c];r.push(l)}n.values=r}return Promise.resolve(n)}}const da=pe("CapacitorSQLite",{web:()=>Ke(()=>import("./web-CK2zsAPs.js"),[]).then(e=>new e.CapacitorSQLiteWeb),electron:()=>window.CapacitorCustomPlatform.plugins.CapacitorSQLite});function ua(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}const ma="laba101_offline",Re="fresh_start_reset_v1",pa=new la(da);let Ne=null;const Q=[{id:1,name:"Laba101 Admin",email:"admin@laba101.test",password:"password",role:"admin",branch:"Main Store"},{id:2,name:"Mintal Branch Admin",email:"admin@laba101.mintal",password:"password",role:"admin",branch:"Mintal Branch"},{id:3,name:"Gensan Branch Admin",email:"admin@laba101.gensan",password:"password",role:"admin",branch:"Gensan Branch"},{id:4,name:"Gensan Branch Staff",email:"staff@laba101.gensan",password:"password",role:"staff",branch:"Gensan Branch"},{id:5,name:"Biya",email:"biya@laba101.mintal",password:"password",role:"staff",branch:"Mintal Branch"},{id:6,name:"Jam",email:"jam@laba101.mintal",password:"password",role:"staff",branch:"Mintal Branch"}],Oe=[],Z=[Y(1,"Drop-off","P185. Includes wash, dry, and fold.","Drop-Off","order",185,8,40,["Wash","Dry","Fold"],0,24),Y(2,"Full Service","P200. Wash, Fabcon, detergent, dry, and fold.","Full Service","order",200,8,40,["Wash","Dry","Fold","Detergent","Fabcon"],0,24),Y(3,"Self Service Wash","P60. Self-service wash (max 8kg per load).","Self Service","order",60,8,null,["Wash"],0,1),Y(4,"Self Service Dry","P70. Self-service dry (40 mins).","Self Service","order",70,8,40,["Dry"],0,1),Y(6,"Dry 10 mins","Additional drying time (10 mins).","Add-on","addon",30,8,10,["Dry"],0,1),Y(7,"Dry 20 mins","Additional drying time (20 mins).","Add-on","addon",50,8,20,["Dry"],0,1),Y(8,"Dry 40 mins","Additional drying time (40 mins).","Add-on","addon",70,8,40,["Dry"],0,1),Y(9,"Additional Zonrox","Extra Zonrox bleach add-on per load.","Add-on","addon",10,0,null,["Zonrox"],0,0),Y(10,"Additional Fabcon","Extra Fabcon fabric conditioner add-on per load.","Add-on","addon",10,0,null,["Fabcon"],0,0),Y(11,"Additional Finishing","Extra finishing spray add-on per load.","Add-on","addon",20,0,null,["Finishing"],0,0)],ie=[{id:1,name:"Regular Clothes",maxKg:8,additionalFee:0,isActive:1},{id:2,name:"Comforter",maxKg:4,additionalFee:0,isActive:1},{id:3,name:"Thin Blankets",maxKg:6,additionalFee:0,isActive:1},{id:4,name:"Bedsheets",maxKg:6,additionalFee:0,isActive:1},{id:5,name:"Bath Towels",maxKg:6,additionalFee:0,isActive:1},{id:6,name:"Curtains",maxKg:6,additionalFee:0,isActive:1}];function lt(e,t){const n=A(e,[]),a=new Map(n.map(s=>[s.id,s])),r=t.map(s=>{const i=a.get(s.id);return i?{...s,...i,isActive:i.isActive??s.isActive}:s});(n.length!==r.length||r.some((s,i)=>s.id!==n[i]?.id||JSON.stringify(s)!==JSON.stringify(n[i])))&&w(e,r)}async function ya(){lt("services",Z),lt("item_categories",ie)}async function qe(e){for(const t of Z)((await e.query("SELECT id FROM laundry_services WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive,t.id]):await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive]);for(const t of ie)((await e.query("SELECT id FROM item_categories WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.maxKg,t.additionalFee,t.isActive,t.id]):await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[t.id,t.name,t.maxKg,t.additionalFee,t.isActive])}const oe=[],be=[],me=[],ge=[],Ee=[],ee=[...[1,2,3,4].map(e=>({id:e,machineName:`Washer ${e}`,machineType:"washer",status:"available",branch:"Main Store"})),...[1,2,3,4].map(e=>({id:e+4,machineName:`Dryer ${e}`,machineType:"dryer",status:"available",branch:"Main Store"}))],Se=[{key:"branch",value:"Main Store"},{key:"fold_rate",value:"5"},{key:"report_email",value:"admin@laba101.test"}];function Y(e,t,n,a,r,s,i,l,c,d,u){return{id:e,name:t,description:n,category:a,serviceType:r,price:s,maxKg:i,dryingMinutes:l,includes:c,additionalCharge:d,turnaroundHours:u,isActive:1}}function G(e){return`laba101-mobile-${e}`}function A(e,t){const n=localStorage.getItem(G(e));if(!n)return structuredClone(t);try{return JSON.parse(n)}catch{return structuredClone(t)}}function w(e,t){localStorage.setItem(G(e),JSON.stringify(t))}function W(e){return e.reduce((t,n)=>Math.max(t,n.id),0)+1}function K(){return new Date().toISOString()}function De(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${a}`}function fa(){return De().slice(2).replaceAll("-","")}function z(e,t){if(!e)return t;try{return JSON.parse(e)}catch{return t}}async function R(){return Ne||(Ne=await pa.createConnection(ma,!1,"no-encryption",1,!1),await Ne.open()),Ne}async function M(e,t,n,a){((await e.query(`PRAGMA table_info(${t})`)).values??[]).some(i=>i.name===n)||await e.execute(`ALTER TABLE ${t} ADD COLUMN ${n} ${a}`)}function va(){const e=A("staff",Q),t=new Map(e.map(a=>[a.id,a]));let n=!1;for(const a of Q){const r=t.get(a.id);if(!r){t.set(a.id,{...a,isActive:1}),n=!0;continue}const s={...r,name:a.name,email:a.email,password:a.password,role:a.role,branch:a.branch,isActive:1};JSON.stringify(s)!==JSON.stringify(r)&&(t.set(a.id,s),n=!0)}n&&w("staff",Array.from(t.values()).sort((a,r)=>a.id-r.id))}async function ha(){localStorage.getItem(G(Re))||(w("staff",Q),w("customers",[]),w("orders",[]),w("payments",[]),w("fold_logs",[]),w("expenses",[]),w("sales",[]),localStorage.getItem(G("services"))||w("services",Z),localStorage.getItem(G("item_categories"))||w("item_categories",ie),localStorage.getItem(G("machines"))||w("machines",ee),localStorage.getItem(G("subcleanings"))||w("subcleanings",[]),localStorage.getItem(G("settings"))||w("settings",Se),localStorage.removeItem("laba101-mobile-session"),w(Re,!0))}async function Tt(e){for(const t of Q){if(((await e.query("SELECT id FROM staff WHERE id = ?",[t.id])).values??[]).length>0){await e.run("UPDATE staff SET name = ?, email = ?, password = ?, role = ?, branch = ?, isActive = 1 WHERE id = ?",[t.name,t.email,t.password,t.role,t.branch,t.id]);continue}await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.email,t.password,t.role,t.branch,1])}}async function ba(e){if(!(((await e.query("SELECT COUNT(*) as count FROM machines")).values?.[0]?.count??0)>0))for(const n of ee)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[n.id,n.machineName,n.machineType,n.status,n.branch])}async function ga(e){for(const t of Se)await e.run("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)",[t.key,t.value])}async function wt(e){for(const t of Z)((await e.query("SELECT id FROM laundry_services WHERE id = ?",[t.id])).values??[]).length>0||await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive]);for(const t of ie)((await e.query("SELECT id FROM item_categories WHERE id = ?",[t.id])).values??[]).length>0||await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[t.id,t.name,t.maxKg,t.additionalFee,t.isActive])}async function Ea(e){((await e.query("SELECT value FROM settings WHERE key = ?",[Re])).values??[]).length>0||(await e.execute(`
    DELETE FROM payments;
    DELETE FROM orders;
    DELETE FROM customers;
    DELETE FROM fold_logs;
    DELETE FROM disbursement_expenses;
    DELETE FROM daily_sales;
    DELETE FROM revolving_history;
    DELETE FROM staff WHERE id NOT IN (1, 2);
  `),await Tt(e),await wt(e),await ba(e),await ga(e),await e.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",[Re,K()]),localStorage.removeItem("laba101-mobile-session"))}async function Sa(){if(!$.isNativePlatform()){await ha(),!localStorage.getItem(G("seeded_v4"))&&!localStorage.getItem(G("services"))&&!localStorage.getItem(G("staff"))&&(w("staff",Q),w("customers",Oe),w("services",Z),w("item_categories",ie),w("orders",oe),w("payments",be),w("fold_logs",[]),w("expenses",me),w("sales",ge),w("revolving_history",Ee),w("machines",ee),w("subcleanings",[]),w("settings",Se),w("seeded_v4",!0)),await ya(),va(),localStorage.getItem(G("seeded_v4"))||w("seeded_v4",!0);return}const e=await R();await e.execute(`
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
  `),await M(e,"staff","email","TEXT"),await M(e,"staff","password","TEXT"),await M(e,"staff","role","TEXT"),await M(e,"staff","isActive","INTEGER NOT NULL DEFAULT 1"),await e.run('UPDATE staff SET password = ? WHERE password IS NULL OR password = ""',["password"]),await e.run('UPDATE staff SET role = ? WHERE role IS NULL OR role = ""',["staff"]),await M(e,"orders","customerId","INTEGER NOT NULL DEFAULT 0"),await M(e,"orders","phone","TEXT"),await M(e,"orders","serviceId","INTEGER NOT NULL DEFAULT 0"),await M(e,"orders","serviceLines","TEXT"),await M(e,"orders","itemCategoryId","INTEGER NOT NULL DEFAULT 0"),await M(e,"orders","itemCategory",'TEXT NOT NULL DEFAULT "Regular Clothes"'),await M(e,"orders","workflowCompleted","TEXT"),await M(e,"orders","weightKg","REAL NOT NULL DEFAULT 0"),await M(e,"orders","price","REAL NOT NULL DEFAULT 0"),await M(e,"orders","additionalCharge","REAL NOT NULL DEFAULT 0"),await M(e,"orders","extraServiceAmount","REAL NOT NULL DEFAULT 0"),await M(e,"orders","totalAmount","REAL NOT NULL DEFAULT 0"),await M(e,"orders","paidAmount","REAL NOT NULL DEFAULT 0"),await M(e,"orders","extras","TEXT"),await M(e,"orders","notes","TEXT"),await M(e,"orders","foldedByStaffIds","TEXT"),await M(e,"orders","foldedAt","TEXT"),await M(e,"orders","releasedBy","INTEGER"),await M(e,"orders","dueAt","TEXT"),await M(e,"orders","createdAt",'TEXT NOT NULL DEFAULT ""'),await M(e,"daily_sales","saleNumber","TEXT"),await M(e,"daily_sales","status","TEXT"),await M(e,"daily_sales","endorsedTo","TEXT"),await M(e,"daily_sales","statusUpdatedAt","TEXT"),await M(e,"disbursement_expenses","disbursementType",'TEXT NOT NULL DEFAULT "daily"'),await M(e,"subcleanings","cleaningType",'TEXT NOT NULL DEFAULT "tube"');const n=((await e.query("SELECT COUNT(*) as count FROM staff")).values?.[0]?.count??0)===0;if(n){for(const a of Q)await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.name,a.email,a.password,a.role,a.branch,1]);for(const a of Oe)await e.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[a.id,a.name,a.phone,a.address]);for(const a of Z)await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[a.id,a.name,a.description,a.category,a.serviceType,a.price,a.maxKg,a.dryingMinutes,JSON.stringify(a.includes),a.additionalCharge,a.turnaroundHours,a.isActive]);for(const a of ie)await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[a.id,a.name,a.maxKg,a.additionalFee,a.isActive]);for(const a of oe)await Nt(e,a);for(const a of be)await e.run("INSERT INTO payments (id, orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.orderId,a.amount,a.method,a.reference,a.receivedAt,a.branch]);for(const a of me)await e.run("INSERT INTO disbursement_expenses (id, expenseDate, number, disbursementType, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[a.id,a.expenseDate,a.number,a.disbursementType??"daily",a.name,a.category,a.description,a.amount]);for(const a of ge)await e.run("INSERT INTO daily_sales (id, saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.saleDate,a.saleNumber,a.cashAmount,a.gcashAmount,a.totalAmount,a.notes]);for(const a of Ee)await e.run("INSERT INTO revolving_history (id, revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[a.id,a.revolvingNumber,a.name,a.amount,a.category,a.description,a.type,a.createdAt]);for(const a of ee)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[a.id,a.machineName,a.machineType,a.status,a.branch]);for(const a of Se)await e.run("INSERT INTO settings (key, value) VALUES (?, ?)",[a.key,a.value]);await e.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",["fresh_install_defaults",K()])}await qe(e),await Tt(e),n||await wt(e),await Ea(e)}async function Nt(e,t){await e.run("INSERT INTO orders (id, ticket, customerId, customer, phone, serviceId, service, serviceLines, itemCategoryId, itemCategory, branch, status, workflowCompleted, weightKg, price, additionalCharge, extraServiceAmount, totalAmount, paidAmount, extras, notes, foldedBy, foldedByStaffIds, foldedAt, dueAt, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.ticket,t.customerId,t.customer,t.phone,t.serviceId,t.service,JSON.stringify(t.serviceLines??[]),t.itemCategoryId,t.itemCategory,t.branch,t.status,JSON.stringify(t.workflowCompleted),t.weightKg,t.price,t.additionalCharge,t.extraServiceAmount,t.totalAmount,t.paidAmount,JSON.stringify(t.extras),t.notes,t.foldedBy,JSON.stringify(t.foldedByStaffIds??[]),t.foldedAt??null,t.dueAt,t.createdAt])}function Ta(e){const t=Number(e.paidAmount??0),n=Number(e.totalAmount??0),a=Number(e.foldedBy),r=Number(e.releasedBy),s=z(e.serviceLines,[]),i=Number(e.serviceId),l=String(e.service),c=Number(e.price);return{id:Number(e.id),ticket:String(e.ticket),customerId:Number(e.customerId),customer:String(e.customer),phone:e.phone?String(e.phone):null,serviceId:i,service:l,serviceLines:s.length?s:[{id:i,name:l,price:c,quantity:1,total:c}],itemCategoryId:Number(e.itemCategoryId),itemCategory:String(e.itemCategory),branch:String(e.branch),status:String(e.status),workflowCompleted:z(e.workflowCompleted,[]),weightKg:Number(e.weightKg),price:c,additionalCharge:Number(e.additionalCharge),extraServiceAmount:Number(e.extraServiceAmount),totalAmount:n,paidAmount:t,balance:Number((n-t).toFixed(2)),extras:z(e.extras,[]),notes:e.notes?String(e.notes):null,foldedBy:Number.isFinite(a)&&a>0?a:null,foldedByName:e.foldedByName?String(e.foldedByName):null,foldedByStaffIds:z(e.foldedByStaffIds,[]),foldedAt:e.foldedAt?String(e.foldedAt):null,releasedBy:Number.isFinite(r)&&r>0?r:null,releasedByName:e.releasedByName?String(e.releasedByName):null,dueAt:String(e.dueAt),createdAt:String(e.createdAt)}}async function wa(){await Sa()}async function de(){return(await Ve()).find(t=>t.key==="branch")?.value??"Main Store"}async function Na(){const e=await Ve();return Number(e.find(t=>t.key==="fold_rate")?.value??"5")}async function At(e){return(await Ve()).find(n=>n.key===e)?.value}async function Ve(){return $.isNativePlatform()?(await(await R()).query("SELECT key, value FROM settings ORDER BY key")).values??[]:A("settings",Se)}async function Le(e,t){if(!$.isNativePlatform()){const a=A("settings",Se).filter(r=>r.key!==e);a.push({key:e,value:t}),w("settings",a);return}await(await R()).run("REPLACE INTO settings (key, value) VALUES (?, ?)",[e,t])}async function Aa(e){return $.isNativePlatform()?(await(await R()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff WHERE branch = ? ORDER BY name ASC',[e])).values??[]:A("staff",Q).filter(a=>a.branch===e)}async function Ye(){return $.isNativePlatform()?(await(await R()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff ORDER BY name ASC')).values??[]:A("staff",Q)}async function Lt(e,t){const n=e.trim().toLowerCase();return(await Ye()).find(r=>r.email.toLowerCase()===n&&r.password===t&&r.isActive!==0)??null}async function La(e){if(!$.isNativePlatform()){const n=A("staff",Q);n.unshift({id:W(n),...e,isActive:1}),w("staff",n);return}await(await R()).run("INSERT INTO staff (name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?)",[e.name,e.email,e.password,e.role,e.branch,1])}async function dt(e,t){if(!$.isNativePlatform()){const s=A("staff",Q),i=s.find(l=>l.id===e);i&&(Object.assign(i,t),w("staff",s));return}const n=await R(),a=[],r=[];for(const[s,i]of Object.entries(t))s!=="id"&&(a.push(`${s} = ?`),r.push(i));a.length&&(r.push(e),await n.run(`UPDATE staff SET ${a.join(", ")} WHERE id = ?`,r))}async function Ca(){return $.isNativePlatform()?(await(await R()).query("SELECT id, name, phone, address FROM customers ORDER BY name ASC")).values??[]:A("customers",Oe).sort((n,a)=>n.name.localeCompare(a.name))}async function $a(e){if(!$.isNativePlatform()){const r=A("customers",Oe),s=e.id?r.find(l=>l.id===e.id):r.find(l=>l.name.toLowerCase()===e.name.toLowerCase()&&(e.phone?l.phone===e.phone:!0));if(s)return s.name=e.name,s.phone=e.phone??s.phone,s.address=e.address??s.address,w("customers",r),s;const i={id:W(r),name:e.name,phone:e.phone??null,address:e.address??null};return r.push(i),w("customers",r),i}const t=await R();if(e.id)return await t.run("UPDATE customers SET name = ?, phone = ?, address = ? WHERE id = ?",[e.name,e.phone??null,e.address??null,e.id]),{id:e.id,name:e.name,phone:e.phone??null,address:e.address??null};const n=await t.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM customers"),a=Number((n.values?.[0]).id);return await t.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[a,e.name,e.phone??null,e.address??null]),{id:a,name:e.name,phone:e.phone??null,address:e.address??null}}async function Fe(e){if(!$.isNativePlatform())return A("services",Z).filter(a=>!0);const t=await R(),n=await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[]);return(n.values??[]).length===0?(await qe(t),((await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[])).values??[]).map(r=>({...r,includes:z(r.includes,[])}))):(n.values??[]).map(a=>({...a,includes:z(a.includes,[])}))}async function Ra(){if(!$.isNativePlatform())return A("services",Z);const e=await R(),t=await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC");return(t.values??[]).length===0?(await qe(e),((await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC")).values??[]).map(a=>({...a,includes:z(a.includes,[])}))):(t.values??[]).map(n=>({...n,includes:z(n.includes,[])}))}async function ut(e){if(!$.isNativePlatform()){const n=A("services",Z),a=e.id?n.find(r=>r.id===e.id):null;a?Object.assign(a,e):n.unshift({...e,id:W(n)}),w("services",n);return}const t=await R();e.id?await t.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = ? WHERE id = ?",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive,e.id]):await t.run("INSERT INTO laundry_services (name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive])}async function Ct(){if(!$.isNativePlatform())return A("item_categories",ie).filter(n=>n.isActive);const e=await R(),t=await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC");return(t.values??[]).length===0?(await qe(e),(await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC")).values??[]):t.values??[]}async function Oa(e){if(!$.isNativePlatform()){const n=A("item_categories",ie),a=e.id?n.find(r=>r.id===e.id):null;a?Object.assign(a,e):n.unshift({...e,id:W(n)}),w("item_categories",n);return}const t=await R();e.id?await t.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = ? WHERE id = ?",[e.name,e.maxKg,e.additionalFee,e.isActive,e.id]):await t.run("INSERT INTO item_categories (name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?)",[e.name,e.maxKg,e.additionalFee,e.isActive])}function Ce(e,t,n,a){const r=(Array.isArray(e)?e:[e]).map(v=>{const f=Math.max(0,Number(v.quantity??1)),C=Number(v.price);return{id:v.id,name:v.name,price:C,quantity:f,total:Number((C*f).toFixed(2))}}).filter(v=>v.quantity>0),s=Number(t.maxKg),i=0,l=0,c=a.map(v=>{const f=Math.max(0,Number(v.quantity??1)),C=Number(v.price);return{id:v.id,name:ua(v.name),price:C,quantity:f,total:Number((C*f).toFixed(2))}}).filter(v=>v.quantity>0),d=r.reduce((v,f)=>v+f.total,0),u=c.reduce((v,f)=>v+f.total,0),m=Number((d+l+u).toFixed(2));return{price:Number(d.toFixed(2)),additionalCharge:Number(l.toFixed(2)),extraServiceAmount:Number(u.toFixed(2)),totalAmount:m,allowedKg:s,extraKg:Number(i.toFixed(2)),warning:null,serviceLines:r,extras:c}}function Qe(e,t){return[...(e.serviceLines&&e.serviceLines.length?e.serviceLines:e.serviceId?[{id:e.serviceId}]:[]).some(r=>{const s=t.find(i=>i.id===r.id);return Array.isArray(s?.includes)&&s.includes.includes("Fold")})?[{key:"fold",label:"Fold"}]:[],{key:"claimed",label:"Claimed"}]}function $t(e){return e.includes("claimed")?"claimed":e.includes("fold")?"ready":"received"}function Rt(e,t){const n=e.serviceLines?.length?e.serviceLines:e.serviceId?[{id:e.serviceId,quantity:1}]:[];let a=0;return n.forEach(r=>{const s=t.find(i=>i.id===r.id);s&&Array.isArray(s.includes)&&s.includes.includes("Fold")&&(a+=Number(r.quantity??1))}),a>0?a:1}async function Pe(e,t){if(e==="browser"){const n=A("orders",oe),a=n.find(r=>r.id===t.id);a&&Object.assign(a,t),w("orders",n);return}await e.run("UPDATE orders SET workflowCompleted = ?, status = ?, foldedBy = ?, foldedByStaffIds = ?, foldedAt = ?, releasedBy = ? WHERE id = ?",[JSON.stringify(t.workflowCompleted),t.status,t.foldedBy,JSON.stringify(t.foldedByStaffIds??[]),t.foldedAt??null,t.releasedBy,t.id])}async function Ot(e,t){if(!t)return;const n=await de(),[a,r]=await Promise.all([ye(n),Fe()]),s=a.find(u=>u.id===e);if(!s||Qe(s,r).find(u=>!s.workflowCompleted.includes(u.key))?.key!=="fold")return;const l=Rt(s,r),c=Array.isArray(s.foldedByStaffIds)?[...s.foldedByStaffIds]:[];if(c.length>=l)return;if(c.push(t),s.foldedByStaffIds=c,s.foldedBy=s.foldedBy||t,s.foldedAt=s.foldedAt||K(),c.length>=l&&(s.workflowCompleted=[...s.workflowCompleted,"fold"]),s.status=$t(s.workflowCompleted),!$.isNativePlatform()){await Pe("browser",s);return}const d=await R();await Pe(d,s)}async function ye(e){return $.isNativePlatform()?((await(await R()).query("SELECT o.*, folded.name as foldedByName, released.name as releasedByName FROM orders o LEFT JOIN staff folded ON folded.id = o.foldedBy LEFT JOIN staff released ON released.id = o.releasedBy WHERE o.branch = ? ORDER BY o.id DESC",[e])).values??[]).map(a=>Ta(a)):A("orders",oe).filter(a=>a.branch===e).map(a=>({...a,serviceLines:a.serviceLines??[{id:a.serviceId,name:a.service,price:Number(a.price),quantity:1,total:Number(a.price)}],foldedByStaffIds:a.foldedByStaffIds??[],foldedAt:a.foldedAt??null,releasedBy:a.releasedBy??null,releasedByName:a.releasedByName??null,balance:Number((a.totalAmount-a.paidAmount).toFixed(2))}))}async function Da(e){const[t,n]=await Promise.all([Fe(),Ct()]),a=e.serviceQuantities??(e.serviceId?{[e.serviceId]:1}:{}),r=t.filter(y=>y.serviceType==="order"&&Number(a[y.id]??0)>0).map(y=>({...y,quantity:Number(a[y.id]??0)})),s=r[0],i=n.find(y=>y.id===e.itemCategoryId)??n.find(y=>y.name.toLowerCase()===(s?.category??"").toLowerCase())??n.find(y=>y.name==="Regular Clothes")??n[0],l=e.addonQuantities??Object.fromEntries((e.addonIds??[]).map(y=>[y,1])),c=t.filter(y=>y.serviceType==="addon"&&Number(l[y.id]??0)>0).map(y=>({...y,quantity:Number(l[y.id]??0)}));if(!r.length&&!c.length)throw new Error("Please select at least one service or extra service.");const d=e.weightKg??Math.max(1,Number(i?.maxKg||s?.maxKg||1)),u=Ce(r,i,d,c),m=await $a({id:e.customerId||void 0,name:e.customerName,phone:e.customerPhone??null}),v=Math.max(0,e.paidAmount),f=Math.min(u.totalAmount,v),C={ticket:await Pa(),customerId:m.id,customer:m.name,phone:m.phone,serviceId:s?.id??0,service:u.serviceLines.length?u.serviceLines.map(y=>`${y.name} x${y.quantity}`).join(", "):"Extras only",serviceLines:u.serviceLines,itemCategoryId:i.id,itemCategory:i.name,branch:e.branch,status:"received",workflowCompleted:["received"],weightKg:d,price:u.price,additionalCharge:u.additionalCharge,extraServiceAmount:u.extraServiceAmount,totalAmount:u.totalAmount,paidAmount:f,balance:Number((u.totalAmount-f).toFixed(2)),extras:u.extras,notes:e.notes||null,foldedBy:null,foldedByName:null,foldedByStaffIds:[],foldedAt:null,releasedBy:null,releasedByName:null,dueAt:new Date(Date.now()+Math.max(1,...r.map(y=>y.turnaroundHours))*60*60*1e3).toISOString(),createdAt:K()};if(!$.isNativePlatform()){const y=A("orders",oe),b={...C,id:W(y)};return y.unshift(b),w("orders",y),v>0&&await We(b.id,{amount:v,method:e.paymentMethod,reference:e.paymentReference??null}),b}const q=await R(),N=await q.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM orders"),E={...C,id:Number((N.values?.[0]).id)};return await Nt(q,E),v>0&&await q.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[E.id,v,e.paymentMethod,e.paymentReference??null,K(),e.branch]),E}async function Pa(){const e=`LB${fa()}`,t=await de(),a=(await ye(t)).filter(s=>s.ticket.startsWith(e)).sort((s,i)=>i.ticket.localeCompare(s.ticket))[0],r=a?Number(a.ticket.slice(-3))+1:1;return`${e}-${String(r).padStart(3,"0")}`}async function mt(e,t){const n=await de(),[a,r]=await Promise.all([ye(n),Fe()]),s=a.find(d=>d.id===e);if(!s)return;const l=Qe(s,r).map(d=>d.key).find(d=>!s.workflowCompleted.includes(d));if(!l)return;if(l==="fold"){const d=(Array.isArray(t)?t:t?[t]:[]).map(Number).filter(u=>u>0);for(const u of d)await Ot(e,u);return}if(s.workflowCompleted=[...s.workflowCompleted,l],s.status=$t(s.workflowCompleted),l==="claimed"&&t){const d=Array.isArray(t)?t:[t];s.releasedBy=d[0]||null}if(!$.isNativePlatform()){await Pe("browser",s);return}const c=await R();await Pe(c,s)}async function We(e,t){const n=await de();if(!(await ye(n)).find(l=>l.id===e))return;const s=Math.max(0,t.amount);if(s<=0)return;if(!$.isNativePlatform()){const l=A("payments",be);l.unshift({id:W(l),orderId:e,amount:s,method:t.method,reference:t.reference??null,receivedAt:K(),branch:n}),w("payments",l);const c=A("orders",oe),d=c.find(u=>u.id===e);d&&(d.paidAmount=Math.min(d.totalAmount,Number((d.paidAmount+s).toFixed(2)))),w("orders",c);return}const i=await R();await i.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[e,s,t.method,t.reference??null,K(),n]),await i.run("UPDATE orders SET paidAmount = MIN(totalAmount, paidAmount + ?) WHERE id = ?",[s,e])}async function xa(e){return $.isNativePlatform()?(await(await R()).query("SELECT id, orderId, amount, method, reference, receivedAt, branch FROM payments  ORDER BY receivedAt DESC",[])).values??[]:A("payments",be).filter(a=>!0)}async function Ia(e){const t=await de(),a=(await ye(t)).find(s=>s.id===e);if(!a)return;if(a.paidAmount>0)throw new Error("Cancel is only allowed for unpaid orders. Use Delete (admin) to refund paid orders.");if(!$.isNativePlatform()){const s=A("orders",oe),i=A("payments",be),l=A("fold_logs",[]),c=s.filter(m=>m.id!==e),d=i.filter(m=>m.orderId!==e),u=l.filter(m=>m.orderTicket!==a.ticket);w("orders",c),w("payments",d),w("fold_logs",u);return}const r=await R();await r.run("DELETE FROM payments WHERE orderId = ?",[e]),await r.run("DELETE FROM fold_logs WHERE orderTicket = ?",[a.ticket]),await r.run("DELETE FROM orders WHERE id = ?",[e])}async function qa(e){const t=await de(),a=(await ye(t)).find(s=>s.id===e);if(!a)return;if(a.paidAmount<=0)throw new Error("Delete (refund) is only allowed for paid orders.");if(!$.isNativePlatform()){const s=A("orders",oe),i=A("payments",be),l=A("fold_logs",[]),c=s.filter(m=>m.id!==e),d=i.filter(m=>m.orderId!==e),u=l.filter(m=>m.orderTicket!==a.ticket);w("orders",c),w("payments",d),w("fold_logs",u);return}const r=await R();await r.run("DELETE FROM payments WHERE orderId = ?",[e]),await r.run("DELETE FROM fold_logs WHERE orderTicket = ?",[a.ticket]),await r.run("DELETE FROM orders WHERE id = ?",[e])}async function Fa(){return $.isNativePlatform()?(await(await R()).query("SELECT id, orderTicket, staffName, foldCount, rate, total, createdAt FROM fold_logs ORDER BY id DESC")).values??[]:A("fold_logs",[])}async function ka(e){const t=Number((e.foldCount*e.rate).toFixed(2));if(!$.isNativePlatform()){const a=A("fold_logs",[]);a.unshift({id:Date.now(),...e,total:t,createdAt:K()}),w("fold_logs",a);return}await(await R()).run("INSERT INTO fold_logs (orderTicket, staffName, foldCount, rate, total, createdAt) VALUES (?, ?, ?, ?, ?, ?)",[e.orderTicket,e.staffName,e.foldCount,e.rate,t,K()])}async function Ua(e){return $.isNativePlatform()?(await(await R()).query("SELECT id, timestamp, staffId, staffName, action, details, branch FROM activity_logs WHERE branch = ? ORDER BY timestamp DESC, id DESC",[e])).values??[]:A("activity_logs",[]).filter(a=>a.branch===e).sort((a,r)=>r.timestamp.localeCompare(a.timestamp))}async function Ma(e){const t={timestamp:K(),staffId:e.staffId??null,staffName:e.staffName,action:e.action,details:e.details??"",branch:e.branch};if(!$.isNativePlatform()){const a=A("activity_logs",[]);a.unshift({id:W(a),...t}),w("activity_logs",a);return}await(await R()).run("INSERT INTO activity_logs (timestamp, staffId, staffName, action, details, branch) VALUES (?, ?, ?, ?, ?, ?)",[t.timestamp,t.staffId,t.staffName,t.action,t.details,t.branch])}async function Ba(){return $.isNativePlatform()?(await(await R()).query('SELECT id, expenseDate, number, COALESCE(disbursementType, "daily") as disbursementType, name, category, description, amount FROM disbursement_expenses ORDER BY expenseDate DESC, id DESC')).values??[]:A("expenses",me).map(n=>({...n,disbursementType:n.disbursementType??"daily"}))}function Me(e){const t=/^DISB-(\d+)$/i.exec(String(e??"").trim());return t?Number(t[1]):0}function pt(e){const t=/^REV-(\d+)$/i.exec(String(e??"").trim());return t?Number(t[1]):0}async function _a(){let e=0;if(!$.isNativePlatform()){const r=A("expenses",me),s=A("revolving_history",Ee);for(const i of r)e=Math.max(e,Me(i.number));for(const i of s)i.type==="disbursement"&&(e=Math.max(e,Me(i.revolvingNumber)));return e}const t=await R(),n=await t.query("SELECT number FROM disbursement_expenses"),a=await t.query("SELECT revolvingNumber as number FROM revolving_history WHERE type = 'disbursement'");for(const r of[...n.values??[],...a.values??[]])e=Math.max(e,Me(String(r.number)));return e}async function Dt(){const e=await _a()+1;return`DISB-${String(e).padStart(2,"0")}`}async function ja(){let e=0;if(!$.isNativePlatform()){const a=A("revolving_history",Ee);for(const r of a)r.type==="add"&&(e=Math.max(e,pt(r.revolvingNumber)));return`REV-${String(e+1).padStart(2,"0")}`}const n=await(await R()).query("SELECT revolvingNumber FROM revolving_history WHERE type = 'add'");for(const a of n.values??[])e=Math.max(e,pt(String(a.revolvingNumber)));return`REV-${String(e+1).padStart(2,"0")}`}async function Pt(e){if(!$.isNativePlatform()){const n=A("expenses",me),a=W(n);n.unshift({id:a,expenseDate:e.expenseDate,number:e.number,disbursementType:e.disbursementType??"daily",name:e.name,category:e.category,description:e.description||null,amount:e.amount}),w("expenses",n);return}await(await R()).run("INSERT INTO disbursement_expenses (expenseDate, number, disbursementType, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?, ?)",[e.expenseDate,e.number,e.disbursementType??"daily",e.name,e.category,e.description||null,e.amount])}async function Ha(e){const t=await Dt();await Pt({expenseDate:e.expenseDate,number:t,disbursementType:e.disbursementType??"daily",name:e.name,category:e.category,description:e.description,amount:e.amount})}async function Wa(e,t){if(!$.isNativePlatform()){const a=A("expenses",me),r=a.find(s=>s.id===e);r&&(Object.assign(r,{expenseDate:t.expenseDate,disbursementType:t.disbursementType??"daily",name:t.name,category:t.category,description:t.description||null,amount:t.amount}),w("expenses",a));return}await(await R()).run("UPDATE disbursement_expenses SET expenseDate = ?, disbursementType = ?, name = ?, category = ?, description = ?, amount = ? WHERE id = ?",[t.expenseDate,t.disbursementType??"daily",t.name,t.category,t.description||null,t.amount,e])}async function Xa(e){if(!$.isNativePlatform()){const n=A("expenses",me);w("expenses",n.filter(a=>a.id!==e));return}await(await R()).run("DELETE FROM disbursement_expenses WHERE id = ?",[e])}async function Ga(){return $.isNativePlatform()?(await(await R()).query('SELECT id, saleDate, COALESCE(saleNumber, "") as saleNumber, cashAmount, gcashAmount, totalAmount, notes, status, endorsedTo, statusUpdatedAt FROM daily_sales ORDER BY saleDate DESC, id DESC')).values??[]:A("sales",ge)}async function Ka(e){const t=Number((e.cashAmount+e.gcashAmount).toFixed(2));if(!$.isNativePlatform()){const s=A("sales",ge),i=e.id?s.find(l=>l.id===e.id):s.find(l=>l.saleDate===e.saleDate);if(i)Object.assign(i,{saleDate:e.saleDate,cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null});else{const l=W(s);s.unshift({id:l,saleDate:e.saleDate,saleNumber:`SALE-${String(l).padStart(2,"0")}`,cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null})}w("sales",s);return}const n=await R(),r=(e.id?await n.query("SELECT id, saleNumber FROM daily_sales WHERE id = ?",[e.id]):await n.query("SELECT id, saleNumber FROM daily_sales WHERE saleDate = ?",[e.saleDate])).values?.[0];if(r)await n.run("UPDATE daily_sales SET saleDate = ?, cashAmount = ?, gcashAmount = ?, totalAmount = ?, notes = ? WHERE id = ?",[e.saleDate,e.cashAmount,e.gcashAmount,t,e.notes||null,r.id]);else{const s=await n.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM daily_sales"),i=Number((s.values?.[0]).id);await n.run("INSERT INTO daily_sales (saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?)",[e.saleDate,`SALE-${String(i).padStart(2,"0")}`,e.cashAmount,e.gcashAmount,t,e.notes||null])}}async function Va(e){if(!$.isNativePlatform()){const n=A("sales",ge);w("sales",n.filter(a=>a.id!==e));return}await(await R()).run("DELETE FROM daily_sales WHERE id = ?",[e])}async function yt(e,t,n=null,a){if(!$.isNativePlatform()){const s=A("sales",ge),i=s.find(l=>l.id===e);i&&(i.status=t,i.endorsedTo=n,i.statusUpdatedAt=a,w("sales",s));return}await(await R()).run("UPDATE daily_sales SET status = ?, endorsedTo = ?, statusUpdatedAt = ? WHERE id = ?",[t,n,a,e])}async function Ya(){return $.isNativePlatform()?(await(await R()).query("SELECT id, revolvingNumber, name, amount, category, description, type, createdAt FROM revolving_history ORDER BY createdAt DESC, id DESC")).values??[]:A("revolving_history",Ee).sort((n,a)=>a.createdAt.localeCompare(n.createdAt))}async function ft(e){const t=e.type==="disbursement"?await Dt():await ja();if(e.type==="disbursement"){const a=e.expenseDate??e.createdAt.slice(0,10);await Pt({expenseDate:a,number:t,name:e.name,category:e.category,description:e.description??"",amount:e.amount})}if(!$.isNativePlatform()){const a=A("revolving_history",Ee),r=W(a);a.unshift({id:r,revolvingNumber:t,...e}),w("revolving_history",a);return}await(await R()).run("INSERT INTO revolving_history (revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)",[t,e.name,e.amount,e.category,e.description||null,e.type,e.createdAt])}async function xt(e){return $.isNativePlatform()?(await(await R()).query("SELECT id, machineName, machineType, status, branch FROM machines WHERE branch = ? ORDER BY machineType, machineName",[e])).values??[]:A("machines",ee).filter(a=>a.branch===e)}async function It(e){return $.isNativePlatform()?(await(await R()).query("SELECT id, name, unit, quantity, reorderLevel, notes, branch, updatedAt FROM inventory_items WHERE branch = ? ORDER BY name ASC",[e])).values??[]:A("inventory_items",[]).filter(a=>a.branch===e).sort((a,r)=>a.name.localeCompare(r.name))}async function Qa(e){const t={name:e.name,unit:e.unit,quantity:e.quantity,reorderLevel:e.reorderLevel,notes:e.notes||null,branch:e.branch,updatedAt:K()};if(!$.isNativePlatform()){const a=A("inventory_items",[]),r=e.id?a.find(s=>s.id===e.id):null;r?Object.assign(r,t):a.unshift({id:W(a),...t}),w("inventory_items",a);return}const n=await R();e.id?await n.run("UPDATE inventory_items SET name = ?, unit = ?, quantity = ?, reorderLevel = ?, notes = ?, updatedAt = ? WHERE id = ?",[t.name,t.unit,t.quantity,t.reorderLevel,t.notes,t.updatedAt,e.id]):await n.run("INSERT INTO inventory_items (name, unit, quantity, reorderLevel, notes, branch, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)",[t.name,t.unit,t.quantity,t.reorderLevel,t.notes,t.branch,t.updatedAt])}async function Ja(e){return $.isNativePlatform()?(await(await R()).query("SELECT id, itemId, itemName, movementType, quantity, notes, staffName, branch, createdAt FROM inventory_movements WHERE branch = ? ORDER BY createdAt DESC, id DESC",[e])).values??[]:A("inventory_movements",[]).filter(a=>a.branch===e).sort((a,r)=>r.createdAt.localeCompare(a.createdAt))}async function za(e){const t=Math.max(0,Number(e.quantity||0));if(t<=0)throw new Error("Quantity must be greater than zero.");const a=(await It(e.branch)).find(l=>l.id===e.itemId);if(!a)throw new Error("Inventory item not found.");const r=e.movementType==="in"?a.quantity+t:a.quantity-t;if(r<0)throw new Error("Stock-out quantity is greater than current stock.");const s={itemId:a.id,itemName:a.name,movementType:e.movementType,quantity:t,notes:e.notes||null,staffName:e.staffName,branch:e.branch,createdAt:K()};if(!$.isNativePlatform()){const l=A("inventory_items",[]),c=l.find(u=>u.id===a.id);c&&(c.quantity=Number(r.toFixed(2)),c.updatedAt=s.createdAt),w("inventory_items",l);const d=A("inventory_movements",[]);d.unshift({id:W(d),...s}),w("inventory_movements",d);return}const i=await R();await i.run("UPDATE inventory_items SET quantity = ?, updatedAt = ? WHERE id = ?",[Number(r.toFixed(2)),s.createdAt,a.id]),await i.run("INSERT INTO inventory_movements (itemId, itemName, movementType, quantity, notes, staffName, branch, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[s.itemId,s.itemName,s.movementType,s.quantity,s.notes,s.staffName,s.branch,s.createdAt])}async function Za(e){if(!$.isNativePlatform()){const n=A("machines",ee);n.unshift({id:W(n),...e}),w("machines",n);return}await(await R()).run("INSERT INTO machines (machineName, machineType, status, branch) VALUES (?, ?, ?, ?)",[e.machineName,e.machineType,e.status,e.branch])}async function en(e,t){if(!$.isNativePlatform()){const a=A("machines",ee),r=a.find(s=>s.id===e);r&&(r.status=t,w("machines",a));return}await(await R()).run("UPDATE machines SET status = ? WHERE id = ?",[t,e])}async function tn(e){return $.isNativePlatform()?((await(await R()).query('SELECT id, date, machineIds, machineNames, cleaningStatus, COALESCE(cleaningType, "tube") as cleaningType, notes, branch FROM subcleanings WHERE branch = ? ORDER BY date DESC, id DESC',[e])).values??[]).map(a=>({...a,machineIds:z(a.machineIds,[])})):A("subcleanings",[]).filter(a=>a.branch===e).map(a=>({...a,cleaningType:a.cleaningType??"tube"}))}async function qt(e){const n=(await xt(e.branch)).filter(i=>e.machineIds.includes(i.id)).map(i=>i.machineName).join(", "),a=e.cleaningType??"tube";if(!$.isNativePlatform()){const i=A("subcleanings",[]);i.unshift({id:W(i),date:e.date,machineIds:e.machineIds,machineNames:n,cleaningStatus:e.cleaningStatus,cleaningType:a,notes:e.notes||null,branch:e.branch}),w("subcleanings",i);const l=A("machines",ee);l.forEach(c=>{e.machineIds.includes(c.id)&&(c.status=e.cleaningStatus==="completed"?"available":"under_cleaning")}),w("machines",l);return}const r=await R();await r.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, cleaningType, notes, branch) VALUES (?, ?, ?, ?, ?, ?, ?)",[e.date,JSON.stringify(e.machineIds),n,e.cleaningStatus,a,e.notes||null,e.branch]);const s=e.cleaningStatus==="completed"?"available":"under_cleaning";for(const i of e.machineIds)await r.run("UPDATE machines SET status = ? WHERE id = ?",[s,i])}async function an(e,t){if(!$.isNativePlatform()){const i=A("machines",ee),l=i.find(u=>u.id===e);l&&(l.status="available"),w("machines",i);const c=A("subcleanings",[]),d=De();c.unshift({id:W(c),date:d,machineIds:[e],machineNames:l?.machineName??"",cleaningStatus:"completed",cleaningType:"tube",notes:null,branch:t}),w("subcleanings",c);return}const n=await R(),r=(await n.query("SELECT machineName FROM machines WHERE id = ?",[e])).values?.[0]?.machineName??"";await n.run("UPDATE machines SET status = ? WHERE id = ?",["available",e]);const s=De();await n.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, cleaningType, notes, branch) VALUES (?, ?, ?, ?, ?, ?, ?)",[s,JSON.stringify([e]),r,"completed","tube",null,t])}async function nn(e,t){await qt({date:De(),machineIds:[],cleaningStatus:"completed",cleaningType:"general",notes:`Confirmed by ${t}`,branch:e})}const Je=document.querySelector("#app");if(!Je)throw new Error("App root not found");let Ae;const ce=pe("BluetoothThermalPrinter"),ze={dashboard:"Dashboard",pos:"POS",orders:"Orders",archived:"Archived Order",customers:"Customers",pricing:"Pricing Services",disbursements:"Daily Report",reports:"Reports",logs:"Logs",inventory:"Inventory",maintenance:"Maintenance",staff:"Staff",revolving:"Revolving Fund",settings:"Settings"},o={tab:"dashboard",receiptOrderId:0,currentUser:null,loginError:"",sidebarOpen:!1,dailyReportTab:"expenses",maintenanceTab:"cleaning",customerSearch:"",orderSearch:"",orderDateFilter:"",orderPaymentFilter:"",printerPanelOpen:!1,printerLoading:!1,printerError:"",printerStatus:"",printerPaperWidth:58,pairedPrinters:[],selectedPrinterAddress:"",archivedOrderSearch:"",paymentModalOrderId:0,dashboardSummaryModalOpen:!1,reportPreview:null,endorseModalOpen:!1,endorseSaleId:0,endorseSaleDate:"",revolvingModalOpen:!1,revolvingSaleId:0,addFundModalOpen:!1,disbursementModalOpen:!1,revolvingHistoryFrom:"",revolvingHistoryTo:""},rn=["Wash","Dry","Fold","Detergent","Fabcon","Zonrox","Finishing"],sn=["Supplies","Utilities","Maintenance","Salary","Rent","Transport","Other"],Te="laba101-mobile-session";function T(e){return new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(e||0)}function p(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function re(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}function ke(e,t){return Number((e-t).toFixed(2))}function Ft(e,t,n,a=0){const r=t.filter(i=>X(i.createdAt)===e).reduce((i,l)=>i+l.paidAmount,0),s=n.filter(i=>se(i)==="daily"&&i.expenseDate===e).reduce((i,l)=>i+l.amount,0);return ke(r+a,s)}function on(e,t){const n=new Map(t.map(r=>[r.id,r.name])),a=new Map;return e.filter(r=>(r.foldedByStaffIds?.length??0)>0||r.workflowCompleted.includes("fold")).forEach(r=>{(Array.isArray(r.foldedByStaffIds)&&r.foldedByStaffIds.length?r.foldedByStaffIds:r.foldedBy?[r.foldedBy]:[]).forEach(i=>{if(!i)return;const l=n.get(i)??String(i),c=a.get(i)??{staffId:i,staffName:l,folds:0};c.folds+=1,a.set(i,c)})}),e.filter(r=>r.workflowCompleted.includes("fold")&&r.foldedByName&&r.foldedBy).forEach(r=>{const s=a.get(r.foldedBy);s&&s.staffName===String(r.foldedBy)&&(s.staffName=r.foldedByName)}),Array.from(a.values()).map(r=>({staffName:r.staffName,folds:r.folds}))}function cn(e){return e.foldedAt?X(e.foldedAt):X(e.createdAt)}function vt(e){const t=e.match(/(\d+)$/);return t?Number(t[1]):0}function le(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${a}`}function j(){return le()}function Xe(){return j().slice(0,7)}function se(e){return e.disbursementType==="monthly"?"monthly":"daily"}function kt(e){return e.slice(0,7)}function Ut(e){return se(e)==="monthly"?kt(e.expenseDate):e.expenseDate}function X(e){return le(new Date(e))}function xe(e){return e.paidAmount<=0?"unpaid":e.balance>0?"partial":"paid"}function Mt(e,t,n){const a=new Map(t.map(i=>[i.id,i])),r=new Map(t.map(i=>[i.id,Number(i.totalAmount||0)])),s={cash:0,gcash:0,total:0};return[...e].sort((i,l)=>new Date(i.receivedAt).getTime()-new Date(l.receivedAt).getTime()||i.id-l.id).forEach(i=>{const l=a.get(i.orderId);if(!l)return;const c=r.get(l.id)??0,d=Math.min(Math.max(0,Number(i.amount||0)),c);r.set(l.id,Number((c-d).toFixed(2))),!(!n(i)||d<=0)&&(i.method==="gcash"?s.gcash+=d:s.cash+=d,s.total+=d)}),{cash:Number(s.cash.toFixed(2)),gcash:Number(s.gcash.toFixed(2)),total:Number(s.total.toFixed(2))}}function ve(e){return new Intl.DateTimeFormat("en-PH",{dateStyle:"medium",timeStyle:"short"}).format(new Date(e))}function Ie(e){const t=new Date(e),n=new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric",year:"numeric"}).format(t),a=new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",hour12:!0}).format(t);return`<div class="datetime-stack"><strong>${p(n)}</strong><span class="meta">${p(a)}</span></div>`}function ln(e){return e?.role==="staff"&&e.branch==="Gensan Branch"}function dn(e){return e?.role==="staff"&&e.branch.toLowerCase().includes("mintal")}async function V(e,t=""){o.currentUser&&await Ma({staffId:o.currentUser.id,staffName:o.currentUser.name,action:e,details:t,branch:await de()})}async function un(e){return(await Ye()).filter(n=>n.role==="admin"&&n.isActive!==0).some(n=>n.password===e)}function te(e,t,n="data-table"){return`
    <div class="table-scroll">
      <table class="${n}">
        <thead><tr>${e.map(a=>`<th>${p(a)}</th>`).join("")}</tr></thead>
        <tbody>${t.length?t.map(a=>`<tr>${a.map(r=>`<td>${r}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${e.length}" class="table-empty">No records found.</td></tr>`}</tbody>
      </table>
    </div>
  `}function mn(e=new Date){return{date:new Intl.DateTimeFormat("en-PH",{weekday:"long",month:"long",day:"numeric",year:"numeric"}).format(e),time:new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",second:"2-digit",hour12:!0}).format(e)}}function Be(){const e=document.querySelector("[data-date-from]"),t=document.querySelector("[data-date-to]"),n=Array.from(document.querySelectorAll('input[name="reportType"]:checked')).map(a=>a.value).filter(a=>a==="sales"||a==="disbursement"||a==="fold_count"||a==="revolving_fund"||a==="summary");return{from:e?.value||"0000-01-01",to:t?.value||"9999-12-31",types:n.length?n:["summary"]}}function ue(e,t){return e>=t.from&&e<=t.to}function Bt(e,t,n,a,r,s,i,l){const c=new Set(l.types),d=n.filter(h=>ue(h.saleDate,l)),u=a.filter(h=>ue(h.expenseDate,l)),m=e.filter(h=>((h.foldedByStaffIds?.length??0)>0||h.workflowCompleted.includes("fold"))&&ue(cn(h),l)),v=on(m,s),f=t.filter(h=>ue(X(h.receivedAt),l)),C=new Set(f.map(h=>h.orderId)),q=new Set(t.map(h=>h.orderId)),N=e.filter(h=>ue(X(h.createdAt),l)||C.has(h.id)),E=new Map;f.forEach(h=>{const k=E.get(h.orderId)??{cash:0,gcash:0};h.method==="gcash"?k.gcash+=h.amount:k.cash+=h.amount,E.set(h.orderId,k)});const y=h=>q.has(h.id)?E.get(h.id)??{cash:0,gcash:0}:ue(X(h.createdAt),l)?{cash:h.paidAmount,gcash:0}:{cash:0,gcash:0},b=N.reduce((h,k)=>{const H=y(k),ne=H.cash+H.gcash;if(ne>k.totalAmount&&k.totalAmount>0&&q.has(k.id)){const fe=k.totalAmount/ne;return h+H.cash*fe}return h+H.cash},0),g=d.reduce((h,k)=>h+k.cashAmount,0),L=d.reduce((h,k)=>h+k.gcashAmount,0),x=N.reduce((h,k)=>{const H=y(k),ne=H.cash+H.gcash;if(ne>k.totalAmount&&k.totalAmount>0&&q.has(k.id)){const fe=k.totalAmount/ne;return h+H.gcash*fe}return h+H.gcash},0),O=b+g,D=x+L,I=O+D,P=u.reduce((h,k)=>h+k.amount,0),U=P,B=I-U,_=()=>({orderCashTotal:b,orderGcashTotal:x,manualCashTotal:g,manualGcashTotal:L,totalCash:O,totalGcash:D,totalSales:I,transactions:N.map(h=>{const k=y(h),H=k.cash+k.gcash;let ne=k.cash,fe=k.gcash,et=H;if(H>h.totalAmount&&h.totalAmount>0&&q.has(h.id)){const tt=h.totalAmount/H;ne=k.cash*tt,fe=k.gcash*tt,et=h.totalAmount}return{ticket:h.ticket,customer:h.customer,cash:ne,gcash:fe,total:et}}),manualSales:d.map(h=>({cash:h.cashAmount,gcash:h.gcashAmount,total:h.totalAmount}))}),J=()=>({totalExpenses:P,totalDisbursement:U,rows:[["Date/Month","id#","Type","Name","Category","Description","Amount"],...u.map(h=>[Ut(h),h.number,se(h),h.name,h.category??"",h.description??"",h.amount]),[],["Total Disbursement","","","","","",U]]}),ae=()=>({rows:[["Staff","Fold Count"],...v.map(h=>[h.staffName,h.folds]),[],["Total Folds",v.reduce((h,k)=>h+k.folds,0)]]}),we=r.filter(h=>ue(X(h.createdAt),l));return{selection:l,selectedTypes:c,salesRows:_,disbursementRows:J,foldCountRows:ae,revolvingDailySummaryRows:()=>({rows:[["Date of Sales","Cash on Hand","Status","Date Update"],...d.map(h=>{const k=Ft(h.saleDate,e,a,h.cashAmount),H=h.status==="revolving"?"Revolving":h.status==="endorsed"?`Endorsed to ${h.endorsedTo??""}`:"Pending";return[h.saleDate,k,H,h.statusUpdatedAt?X(h.statusUpdatedAt):""]})]}),revolvingHistoryRows:()=>({rows:[["Date","Number","Name","Amount","Category","Description","Type"],...we.map(h=>[X(h.createdAt),h.revolvingNumber,h.name,h.type==="disbursement"?-h.amount:h.amount,h.category,h.description??"",h.type==="add"?"Add Revolving Fund":"Disbursement"])]}),summaryRows:()=>{const h=_(),k=J();return[["Summary",l.from,"to",l.to],[],["Total Cash:","Total GCash:","Total Sales:"],["","",""],[h.totalCash,h.totalGcash,h.totalSales],["","",""],["Total Disbursement:","Total Profit:","Cash on Hand:"],["","",""],[k.totalDisbursement,B,ke(h.totalCash,k.totalDisbursement)]]},profit:B}}function pn(e,t){return`<button class="nav-link ${t?"is-active":""}" data-tab="${e}" type="button">
    <span class="nav-icon">${yn(e)}</span>
    <span>${ze[e]}</span>
  </button>`}function F(e,t){return`<div class="section-head"><div><h2>${p(e)}</h2><p class="meta">${p(t)}</p></div></div>`}function ht(){return ze[o.tab]??"Dashboard"}function _e(e){return(e?.name??"Laba101").trim().slice(0,1).toUpperCase()}function yn(e){return{dashboard:"DB",pos:"POS",orders:"PO",archived:"AR",customers:"CU",pricing:"PS",disbursements:"DR",reports:"RP",logs:"LG",inventory:"IN",maintenance:"MT",staff:"ST",revolving:"RV",settings:"SE"}[e]}async function _t(){const e=await de(),t=await Aa(e),n=await Ye(),a=await Ca(),r=await Fe(),s=await Ra(),i=await Ct(),l=await ye(e),c=await xa(),d=await Fa(),u=await Ba(),m=await Ga(),v=await xt(e),f=await tn(e),C=await Ua(e),q=await It(e),N=await Ja(e),E=await Ya(),y=await Na(),b=await At("report_email");return{branch:e,staff:t,allStaff:n,customers:a,services:r,allServices:s,categories:i,orders:l,payments:c,foldLogs:d,expenses:u,sales:m,machines:v,subcleanings:f,activityLogs:C,inventoryItems:q,inventoryMovements:N,revolvingHistory:E,foldRate:y,reportEmail:b??""}}async function S(){if(!o.currentUser){fn(),kn();return}const e=await _t();e.orders.filter(c=>c.status!=="claimed").length,e.orders.filter(c=>c.status==="ready").length,e.orders.reduce((c,d)=>c+d.paidAmount,0);const t=j(),n=Mt(e.payments,e.orders,c=>c.branch===e.branch&&X(c.receivedAt)===t),a=n.gcash+e.sales.filter(c=>c.saleDate===t).reduce((c,d)=>c+d.gcashAmount,0),r=n.cash+e.sales.filter(c=>c.saleDate===t).reduce((c,d)=>c+d.cashAmount,0),s=r+a,i=e.expenses.filter(c=>se(c)==="daily"&&c.expenseDate===t).reduce((c,d)=>c+d.amount,0),l=ke(r,i);e.sales.reduce((c,d)=>c+d.totalAmount,0),e.expenses.reduce((c,d)=>c+d.amount,0),Je.innerHTML=`
    <div class="app-frame">
      <header class="topbar">
        <div class="topbar-left">
          <img src="/laba101-logo.svg" alt="Laba101" class="topbar-logo" />
          <div>
            <p class="eyebrow">Offline mobile system</p>
            <h1>${p(ht())}</h1>
          </div>
        </div>
        <div class="topbar-actions">
          <div class="branch-pill"><span>Branch</span><strong>${p(e.branch)}</strong></div>
          <button class="icon-button" type="button" aria-label="Notifications">!</button>
          <button class="profile-pill" type="button">
            <span>${_e(o.currentUser)}</span>
            <strong>${p(o.currentUser.name)}</strong>
          </button>
        </div>
      </header>

      <button class="sidebar-backdrop ${o.sidebarOpen?"is-open":""}" id="sidebar-backdrop" type="button" aria-label="Close navigation"></button>

      <aside class="sidebar ${o.sidebarOpen?"is-open":""}">
        <div class="sidebar-mobile-head">
          <img src="/laba101-logo.svg" alt="Laba101" />
          <button class="sidebar-close" id="sidebar-close-button" type="button" aria-label="Close navigation">X</button>
        </div>
        <nav>${jt().map(c=>pn(c,o.tab===c)).join("")}</nav>
        <div class="sidebar-fill">
          <div class="sidebar-branch-badge">
            <span>Active Branch</span>
            <strong>${p(e.branch)}</strong>
          </div>
          <p class="sidebar-app-name">Laba101 POS</p>
        </div>
        <div class="sidebar-user">
          <span class="avatar">${_e(o.currentUser)}</span>
          <div>
            <strong>${p(o.currentUser.name)}</strong>
            <small>${p(o.currentUser.email)} / ${p(o.currentUser.role)}</small>
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
            <h2>${p(ht())}</h2>
          </div>
          <div class="navbar-time">
            <strong data-navbar-time>--:--</strong>
            <span data-navbar-date>Loading...</span>
          </div>
          <button class="mobile-avatar" type="button">${_e(o.currentUser)}</button>
        </header>

        ${o.tab==="dashboard"?hn({paidToday:s,cashPaidToday:r,gcashPaidToday:a,disbursementToday:i,cashOnHandToday:l,orders:e.orders,payments:e.payments,sales:e.sales}):""}
        ${o.tab==="pos"?gn(e.orders,e.customers,e.services,e.categories,e.payments,e.branch):""}
        ${o.tab==="orders"?En(e.orders,e.staff,e.services,e.payments):""}
        ${o.tab==="archived"?Sn(e.orders,e.staff,e.services,e.payments):""}
        ${o.tab==="customers"?Cn(e.customers,e.orders):""}
        ${o.tab==="pricing"?$n(e.allServices,e.categories):""}
        ${o.tab==="disbursements"?Rn(e.expenses,e.sales):""}
        ${o.tab==="reports"?On(e.orders,e.payments,e.sales,e.expenses,e.revolvingHistory,e.allStaff,e.foldRate):""}
        ${o.tab==="logs"?Dn(e.activityLogs):""}
        ${o.tab==="inventory"?Pn(e.inventoryItems,e.inventoryMovements,e.branch):""}
        ${o.tab==="maintenance"?xn(e.machines,e.subcleanings,e.branch):""}
        ${o.tab==="staff"?In(e.allStaff,e.branch):""}
        ${o.tab==="revolving"?Qn(e.sales,e.revolvingHistory,e.orders,e.expenses):""}
        ${o.tab==="settings"?qn(e.branch,e.foldRate,e.reportEmail):""}
      </main>
    </div>
  `,Fn(),Mn(e),Bn(e.allServices),_n(e.expenses),jn(e.orders,e.payments,e.sales,e.expenses,e.revolvingHistory,e.allStaff,e.foldRate),Hn(),Wn(),Xn(),Gn(e.inventoryItems,e.branch),Kn(e.allStaff),Jn(),Vn(),Un()}function jt(){if(o.currentUser?.role==="admin")return Object.keys(ze);const e=["dashboard","pos","orders","archived","disbursements","reports","maintenance","revolving"];return ln(o.currentUser)?["dashboard","disbursements","reports","maintenance","revolving"]:dn(o.currentUser)?e.filter(t=>t!=="revolving"):e}function fn(){Je.innerHTML=`
    <main class="login-page">

      <section class="login-panel-wrap">
        <article class="login-panel">
          <header>
            <div class="login-mark"><img src="/laba101-logo.svg" alt="Laba101" /></div>
            <h2>Welcome back</h2>
            <p>Sign in to continue managing today&apos;s laundry operations.</p>
          </header>
          ${o.loginError?`<div class="alert">${p(o.loginError)}</div>`:""}
          <form id="login-form" class="form">
            <label>Email address<input name="email" type="email" autocomplete="username" placeholder="admin@laba101.test or staff@laba101.gensan" required /></label>
            <label>Password<input name="password" type="password" autocomplete="current-password" placeholder="password" required /></label>
            <label class="remember"><input name="remember" type="checkbox" value="1" /> Remember me on this device</label>
            <button class="primary" id="login-button" type="submit">Sign in</button>
          </form>
        </article>
      </section>
    </main>
  `}function vn(){document.querySelectorAll("[data-fill-email]").forEach(e=>{e.addEventListener("click",()=>{const t=document.querySelector('input[name="email"]'),n=document.querySelector('input[name="password"]');t&&(t.value=e.dataset.fillEmail??""),n&&(n.value=e.dataset.fillPassword??"")})})}function hn(e){const t=new Date,n=Array.from({length:7},(i,l)=>{const c=new Date(t);return c.setDate(t.getDate()-(6-l)),new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric"}).format(c)}),a=Array.from({length:7},(i,l)=>{const c=new Date(t);c.setDate(t.getDate()-(6-l));const d=le(c),u=Mt(e.payments,e.orders,v=>X(v.receivedAt)===d).total,m=e.sales.filter(v=>v.saleDate===d).reduce((v,f)=>v+f.totalAmount,0);return u+m}),r=Math.max(1,...a),s=210;return`
    <section class="dashboard-main">
      <article class="panel revenue-panel">
        ${F("Revenue overview","Paid amount for the last 7 days.")}
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
            ${a.map((i,l)=>{const c=Math.max(12,Math.round(i/r*s));return`<div class="chart-bar ${l===a.length-1?"is-today":""}"><span style="height:${c}px"></span><strong>${T(i)}</strong></div>`}).join("")}
          </div>
          <div class="chart-days">${n.map(i=>`<span>${p(i)}</span>`).join("")}</div>
        </div>
        <div class="chart-footnote">Values include POS payments and Daily Report sales input.</div>
      </article>
      ${o.dashboardSummaryModalOpen?bn(e):""}
    </section>
  `}function bn(e){return`
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal dashboard-summary-modal" role="dialog" aria-modal="true" aria-labelledby="daily-summary-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-open-printer-panel>Printer</button>
          <button class="primary" type="button" data-print-dashboard data-metrics='${JSON.stringify(e)}'>${o.printerLoading?"Printing...":"Print"}</button>
          <button class="secondary" type="button" data-close-daily-summary>Close</button>
        </div>
        ${o.printerPanelOpen?Wt():""}
        <div class="receipt dashboard-summary-slip" id="dashboard-summary-print-area">
          <h3 id="daily-summary-title">Laba101 Daily Summary</h3>
          <p>${p(le())}</p>
          <div><span>Paid today:</span><strong>${T(e.paidToday)}</strong></div>
          <div><span>Cash:</span><strong>${T(e.cashPaidToday)}</strong></div>
          <div><span>GCash:</span><strong>${T(e.gcashPaidToday)}</strong></div>
          <div><span>Disbursement:</span><strong>${T(e.disbursementToday)}</strong></div>
          <div><span>Cash-on hand:</span><strong>${T(e.cashOnHandToday)}</strong></div>
          <div class="signature-row"><span>Name of receiver and signature</span></div>
        </div>
      </div>
    </div>
  `}function gn(e,t,n,a,r,s){const i=n.filter(d=>d.serviceType==="order"&&d.isActive),l=n.filter(d=>d.serviceType==="addon"&&d.isActive),c=o.receiptOrderId?e.find(d=>d.id===o.receiptOrderId):null;return`
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
            ${i.map(d=>`<div class="qty-card service-option service-quantity" data-qty-card="serviceQty-${d.id}">
              <span>
                <strong>${p(d.name)}</strong>
                <small>${p(d.description??d.category)} ${d.maxKg?` / max ${d.maxKg}kg`:""}</small>
              </span>
              <b>${T(d.price)}</b>
              <div class="qty-control">
                <button type="button" data-qty-minus="serviceQty-${d.id}" aria-label="Decrease ${p(d.name)}">-</button>
                <input type="number" name="serviceQty-${d.id}" min="0" step="1" value="0" inputmode="numeric" />
                <button type="button" data-qty-plus="serviceQty-${d.id}" aria-label="Increase ${p(d.name)}">+</button>
              </div>
            </div>`).join("")}
          </fieldset>

          <fieldset class="check-grid">
            <legend>Extra services</legend>
            ${l.length?l.map(d=>`<div class="qty-card addon-quantity" data-qty-card="addonQty-${d.id}">
              <span><strong>${p(re(d.name))}</strong><small>${T(d.price)} each</small></span>
              <div class="qty-control">
                <button type="button" data-qty-minus="addonQty-${d.id}" aria-label="Decrease ${p(re(d.name))}">-</button>
                <input type="number" name="addonQty-${d.id}" min="0" step="1" value="0" inputmode="numeric" />
                <button type="button" data-qty-plus="addonQty-${d.id}" aria-label="Increase ${p(re(d.name))}">+</button>
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

      ${c?Ze(c,r.filter(d=>d.orderId===c.id)):""}
    </section>
  `}function En(e,t,n,a){const r=o.receiptOrderId?e.find(f=>f.id===o.receiptOrderId):null,s=e.filter(f=>f.status!=="claimed"),i=o.orderSearch.trim().toLowerCase(),l=o.orderDateFilter.trim(),c=o.orderPaymentFilter.trim().toLowerCase(),d=s.filter(f=>{const C=!i||[f.ticket,f.customer,f.phone,f.service,f.itemCategory,f.status].some(E=>String(E??"").toLowerCase().includes(i)),q=!l||X(f.createdAt)===l,N=!c||xe(f)===c;return C&&q&&N}),m=d.filter(f=>["unpaid","partial"].includes(xe(f))).reduce((f,C)=>f+Math.max(0,Number(C.balance||0)),0),v=d.length;return`
    <section class="grid content full">
      <article class="panel span-2">
        ${F("Order queue","Workflow, payment, and receipts")}
        <form class="queue-filters" id="order-queue-filters">
          <label>
            <span>Search queue</span>
            <input name="orderSearch" type="search" placeholder="Ticket, name, service, status" value="${p(o.orderSearch)}" autocomplete="off" />
          </label>
          <label>
            <span>Filter date</span>
            <input name="orderDateFilter" type="date" value="${p(o.orderDateFilter)}" />
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
        <div style="overflow-x: auto; width: 100%; -webkit-overflow-scrolling: touch;">
          <table class="data-table orders-data-table bordered-table">
            <thead>
              <tr><th>Ticket</th><th>Customer</th><th>Service</th><th>Total Payment</th><th>Actions</th></tr>
            </thead>
            <tbody>
              ${d.map(f=>Ht(f,t,n)).join("")||'<tr><td colspan="5" class="table-empty">No matching orders.</td></tr>'}
            </tbody>
          </table>
        </div>
        <div class="summary-list queue-summary">
          <div><span>Total transactions</span><strong>${v}</strong></div>
          <div><span>Total unpaid amount</span><strong>${T(m)}</strong></div>
        </div>
      </article>
      ${r?Ze(r,a.filter(f=>f.orderId===r.id)):""}
      ${o.paymentModalOrderId?Tn(e.find(f=>f.id===o.paymentModalOrderId)):""}
    </section>
  `}function Sn(e,t,n,a){const r=e.filter(c=>c.status==="claimed"),s=o.archivedOrderSearch.trim().toLowerCase(),i=r.filter(c=>s?[c.ticket,c.customer,c.phone,c.service,c.itemCategory].some(d=>String(d??"").toLowerCase().includes(s)):!0),l=o.receiptOrderId?e.find(c=>c.id===o.receiptOrderId):null;return`
    <section class="grid content full">
      <article class="panel span-2">
        ${F("Archived orders","All claimed orders are listed here")}
        <form class="queue-filters" id="archived-order-filters">
          <label>
            <span>Search archived</span>
            <input name="archivedOrderSearch" type="search" placeholder="Ticket, name, service" value="${p(o.archivedOrderSearch)}" autocomplete="off" />
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
              ${i.map(c=>Ht(c,t,n,!0)).join("")||'<tr><td colspan="6" class="table-empty">No archived orders found.</td></tr>'}
            </tbody>
          </table>
        </div>
      </article>
      ${l?Ze(l,a.filter(c=>c.orderId===l.id)):""}
    </section>
  `}function Ht(e,t,n,a=!1){const r=Qe(e,n),s=e.workflowCompleted.includes("claimed"),i=r.find(E=>!e.workflowCompleted.includes(E.key)),l=i?.key==="fold",c=xe(e),d=c==="unpaid"?"pending":c,u=e.extras.length?e.extras.map(E=>`${p(re(E.name))} x${Number(E.quantity??1)}`).join(", "):"",m=o.currentUser?.role==="admin",v=e.status!=="claimed"&&e.paidAmount<=0,f=e.status!=="claimed"&&m&&e.paidAmount>0,C=Rt(e,n),q=Array.isArray(e.foldedByStaffIds)?e.foldedByStaffIds:[],N=Math.max(0,C-q.length);return`
    <tr class="order-row-main">
      <td><strong>${p(e.ticket)}</strong><div class="small">${p(ve(e.createdAt))}</div></td>
      <td>${p(e.customer)}<div class="small">${p(e.phone??"")}</div></td>
      <td>${p(e.service)}${u?`<div class="small">Extras: ${u}</div>`:""}</td>
      <td class="amount-cell payment-cell status-${c}"><strong>${T(e.totalAmount)}</strong><div class="payment-status">${p(d)}${c==="paid"?"":` &middot; Bal: ${T(e.balance)}`}</div></td>
      ${a?`<td>
        <div class="small">Folded by: ${p(e.foldedByName??"N/A")}</div>
        <div class="small">Released by: ${p(e.releasedByName??"N/A")}</div>
      </td>`:""}
      <td>
      <div class="row-actions">
        ${i?.key==="fold"?`<div class="inline-form flex-wrap fold-actions" data-order-id="${e.id}">
          ${q.map((E,y)=>{const b=t.find(g=>g.id===E);return`<span class="fold-saved-badge">Fold ${y+1}: ${p(b?.name??"Staff")}</span>`}).join("")}
          ${l&&N>0?Array.from({length:N}).map((E,y)=>{const b=q.length+y+1;return`<select name="assignedStaffId" class="fold-staff-select" data-order-id="${e.id}" data-fold-number="${b}">
            <option value="">-- Staff ${C>1?`(Fold ${b})`:""}--</option>
            ${t.map(g=>`<option value="${g.id}">${p(g.name)}</option>`).join("")}
          </select>`}).join(""):""}
        </div>`:i?.key==="claimed"&&!s?`<form class="inline-form advance-form" data-order-id="${e.id}" data-action="claim" data-balance="${e.balance}">
          <select name="releasedBy" required>
            <option value="">-- Released by --</option>
            ${t.map(E=>`<option value="${E.id}">${p(E.name)}</option>`).join("")}
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
        ${v?`<button class="secondary btn-sm" type="button" data-cancel-order="${e.id}">Cancel</button>`:""}
        ${f?`<button class="secondary btn-sm" type="button" data-delete-order="${e.id}">Delete</button>`:""}
        <button class="secondary btn-sm" data-receipt="${e.id}">Receipt</button>
      </div>
      </td>
    </tr>
  `}function Tn(e){return e?`
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
  `:""}function Ze(e,t){const n=t.reduce((i,l)=>i+Number(l.amount),0),a=Math.max(0,Number((n-e.totalAmount).toFixed(2))),r=xe(e),s=r.charAt(0).toUpperCase()+r.slice(1);return`
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="receipt-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-open-printer-panel>Printer</button>
          <button class="primary" type="button" data-thermal-print>${o.printerLoading?"Printing...":"Print Receipt"}</button>
          <button class="secondary" type="button" data-close-receipt>Close</button>
        </div>
        ${o.printerPanelOpen?Wt():""}
        <div class="receipt" id="receipt-print-area">
          <div class="receipt-head">
            <h3 id="receipt-title">Laba101</h3>
            <p>${p(e.ticket)}<br>${p(ve(e.createdAt))}</p>
          </div>
          ${o.currentUser?`<p class="receipt-staff">Staff: ${p(o.currentUser.name)}</p>`:""}
          <div class="receipt-customer">
            <strong>${p(e.customer)}</strong>
            <span>${p(e.phone??"No phone")}</span>
          </div>
          <div class="summary-list receipt-lines">
            <div><span>Service</span><strong>${p(e.service)}</strong></div>
            ${e.extras.length?`<div><span>Extra services</span><strong>${e.extras.map(i=>`${p(re(i.name))} x${Number(i.quantity??1)} (${T(Number(i.total??i.price))})`).join(", ")}</strong></div>`:""}
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
  `}function Wt(){return`
    <div class="printer-panel">
      <div class="printer-panel-head">
        <strong>Bluetooth thermal printer</strong>
        <button class="secondary" type="button" data-refresh-printers>${o.printerLoading?"Scanning...":"Scan paired"}</button>
      </div>
      <div class="printer-fields">
        <label>Printer
          <select data-printer-select>
            <option value="">Select paired printer</option>
            ${o.pairedPrinters.map(e=>`<option value="${p(e.address)}" ${o.selectedPrinterAddress===e.address?"selected":""}>${p(e.name)} - ${p(e.address)}</option>`).join("")}
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
      ${o.printerStatus?`<p class="printer-status ok">${p(o.printerStatus)}</p>`:""}
      ${o.printerError?`<p class="printer-status warn">${p(o.printerError)}</p>`:""}
    </div>
  `}async function bt(){o.printerLoading=!0,o.printerError="",o.printerStatus="",await S();try{if(!(await ce.requestBluetoothPermissions()).granted)throw new Error("Bluetooth permission was not granted.");const t=await ce.listPairedPrinters();o.pairedPrinters=t.printers??[],o.selectedPrinterAddress=o.selectedPrinterAddress||t.savedAddress||o.pairedPrinters[0]?.address||"",o.printerStatus=o.pairedPrinters.length?"Select a printer, then connect.":"No paired printers found. Pair the printer in Android Bluetooth settings first."}catch(e){o.printerError=e instanceof Error?e.message:"Could not scan paired printers."}finally{o.printerLoading=!1,await S()}}async function wn(){if(!o.selectedPrinterAddress){o.printerError="Select a paired printer first.",await S();return}o.printerLoading=!0,o.printerError="",o.printerStatus="",await S();try{await ce.savePrinter({address:o.selectedPrinterAddress}),await ce.connect({address:o.selectedPrinterAddress}),o.printerStatus="Printer connected and saved."}catch(e){o.printerError=e instanceof Error?e.message:"Printer connection failed."}finally{o.printerLoading=!1,await S()}}function Nn(e){const t=(e.serviceLines?.length?e.serviceLines:[{id:e.serviceId,name:e.service,price:e.price,quantity:1,total:e.price}]).map(a=>({name:a.name,quantity:Number(a.quantity||1),price:Number(a.price||0)})),n=e.extras.map(a=>({name:re(a.name),quantity:Number(a.quantity??1),price:Number(a.price||0)}));return[...t,...n]}async function An(e,t){const n=t.reduce((r,s)=>r+Number(s.amount),0),a=Math.max(0,Number((n-e.totalAmount).toFixed(2)));o.printerLoading=!0,o.printerError="",o.printerStatus="",await S();try{if(!o.selectedPrinterAddress){const r=await ce.getSavedPrinter();o.selectedPrinterAddress=r.address||""}await ce.printReceipt({address:o.selectedPrinterAddress||void 0,paperWidth:o.printerPaperWidth,storeName:"Laba101",receiptNumber:e.ticket,dateTime:ve(e.createdAt),customerName:e.customer,customerPhone:e.phone?.trim()||"No phone",items:Nn(e),totalAmount:e.totalAmount,paidAmount:e.paidAmount,changeAmount:a,balanceAmount:e.balance,staffName:o.currentUser?.name?.trim()||"Staff"}),o.printerStatus="Receipt sent to printer."}catch(r){o.printerPanelOpen=!0,o.printerError=r instanceof Error?r.message:"Bluetooth thermal print failed."}finally{o.printerLoading=!1,await S()}}async function Ln(e){o.printerLoading=!0,o.printerError="",o.printerStatus="",await S();try{if(!o.selectedPrinterAddress){const t=await ce.getSavedPrinter();o.selectedPrinterAddress=t.address||""}await ce.printDailySummary({address:o.selectedPrinterAddress||void 0,paperWidth:o.printerPaperWidth,storeName:"Laba101",dateTime:le(),staffName:o.currentUser?.name?.trim()||"Staff",paidToday:e.paidToday,cashPaidToday:e.cashPaidToday,gcashPaidToday:e.gcashPaidToday,disbursementToday:e.disbursementToday,cashOnHandToday:e.cashOnHandToday}),o.printerStatus="Daily summary sent to printer."}catch(t){o.printerPanelOpen=!0,o.printerError=t instanceof Error?t.message:"Bluetooth thermal print failed."}finally{o.printerLoading=!1,await S()}}function Cn(e,t){const n=o.customerSearch.trim().toLowerCase(),a=e.filter(r=>n?r.name.toLowerCase().includes(n):!1);return`
    <section class="grid content full">
      <article class="panel">
        ${F("Customer Management","Customer records from local offline storage")}
        <form class="search-box" id="customer-search-form">
          <label>
            <span>Search customer name</span>
            <input name="customerSearch" data-customer-search type="search" placeholder="Type the customer name then tap Search" value="${p(o.customerSearch)}" autocomplete="off" />
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
        ${F("Customer list","Names, phones, addresses, and order history")}
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
  `}function $n(e,t){const n=e.filter(r=>r.serviceType==="order"),a=e.filter(r=>r.serviceType==="addon");return`
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
            ${rn.map(r=>`<label class="check"><input type="checkbox" name="includes" value="${r}" /> ${r}</label>`).join("")}
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
            ${n.map(r=>`<div class="table-row"><div><strong>${p(r.name)}</strong></div><div>${p(r.category)}</div><div>${T(r.price)}</div><div>${r.maxKg} kg</div><div>${p(r.includes.join(", ")||"none")}</div><div>${r.isActive?"Active":"Inactive"}</div><div class="row-actions"><button class="secondary edit-service-btn" data-id="${r.id}">Edit</button>${r.isActive?`<button class="secondary deactivate-service-btn" data-id="${r.id}">Deactivate</button>`:`<button class="secondary activate-service-btn" data-id="${r.id}">Activate</button>`}</div></div>`).join("")||'<div class="helper">No order services yet.</div>'}
          </div>
        </div>
        <div class="section-divider"></div>
        ${F("Extra Services Table","Add-on services")}
        <div class="table-scroll">
          <div class="table data-table extra-services-table">
            <div class="table-head"><div>Name</div><div>Category</div><div>Price</div><div>Includes</div><div>Status</div><div>Actions</div></div>
            ${a.map(r=>`<div class="table-row"><div><strong>${p(r.name)}</strong></div><div>${p(r.category)}</div><div>${T(r.price)}</div><div>${p(r.includes.join(", ")||"none")}</div><div>${r.isActive?"Active":"Inactive"}</div><div class="row-actions"><button class="secondary edit-service-btn" data-id="${r.id}">Edit</button>${r.isActive?`<button class="secondary deactivate-service-btn" data-id="${r.id}">Deactivate</button>`:`<button class="secondary activate-service-btn" data-id="${r.id}">Activate</button>`}</div></div>`).join("")||'<div class="helper">No extra services yet.</div>'}
          </div>
        </div>
      </article>
    </section>
  `}function Rn(e,t){const n=j(),a=n.slice(0,7),r=o.currentUser?.role==="admin",s=Array.from(new Set([...sn,...e.map(m=>m.category).filter(Boolean)])),i=e.filter(m=>se(m)==="daily"&&m.expenseDate===n).reduce((m,v)=>m+v.amount,0),l=e.filter(m=>se(m)==="monthly"&&m.expenseDate.startsWith(a)).reduce((m,v)=>m+v.amount,0),c=t.filter(m=>m.saleDate===n).reduce((m,v)=>m+v.totalAmount,0),d=t.filter(m=>m.saleDate.startsWith(a)).reduce((m,v)=>m+v.totalAmount,0),u=[...e].sort((m,v)=>vt(v.number)-vt(m.number)||v.id-m.id);return`
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
      <div class="panel stat"><div class="card-label">Daily disbursement</div><div class="value">${T(i)}</div></div>
      <div class="panel stat"><div class="card-label">Monthly disbursement</div><div class="value">${T(l)}</div></div>
      <div class="panel stat"><div class="card-label">Today sales input</div><div class="value">${T(c)}</div></div>
      <div class="panel stat"><div class="card-label">Month sales input</div><div class="value">${T(d)}</div></div>
    </section>
    ${o.dailyReportTab==="expenses"?`
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
            <label class="expense-date-field">Date<input name="expenseDate" type="date" value="${j()}" required /></label>
            <label class="expense-month-field" hidden>Month<input name="expenseMonth" type="month" value="${Xe()}" /></label>
            <label>Amount<input name="amount" type="number" min="0" step="0.01" required placeholder="0.00" /></label>
          </div>
          <div class="form-row"><label>Title / Name<input name="name" required /></label><label>Category<select name="category" required>${s.map(m=>`<option value="${p(m)}">${p(m)}</option>`).join("")}</select></label></div>
          <label>Description<textarea name="description"></textarea></label>
          <button class="primary" type="submit">Save expense</button>
        </form>
      </article>
      <article class="panel">
        ${F("Disbursement list","Expenses only")}
        ${te(["Date/Month","No.","Type","Name","Category","Amount","Action"],u.map(m=>[`<strong>${p(Ut(m))}</strong>`,p(m.number),p(se(m)),p(m.name),p(m.category),T(m.amount),`<div class="row-actions"><button class="secondary edit-expense-btn" data-id="${m.id}" type="button">Edit</button>${r?`<button class="secondary delete-expense-btn" data-id="${m.id}" type="button">Delete</button>`:""}</div>`]),"data-table orders-data-table app-record-table disbursement-list-table")}
      </article>
    </section>
    `:`
    <section class="grid content full">
      <article class="panel">
        ${F("Input total sale","Manual cash and GCash totals")}
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
        ${F("Daily sales history","Cash, GCash, total sale, notes, and updates")}
        <div class="table-scroll daily-report-scroll">
          <div class="table wide-table daily-report-table">
            <div class="table-head"><div>Sales #</div><div>Date</div><div>Cash</div><div>GCash</div><div>Total sale</div><div>Action</div></div>
            ${t.map(m=>`<div class="table-row"><div>${p(m.saleNumber)}</div><div>${p(m.saleDate)}</div><div>${T(m.cashAmount)}</div><div>${T(m.gcashAmount)}</div><div><strong>${T(m.totalAmount)}</strong></div><div class="row-actions"><button class="secondary edit-sale-btn" data-id="${m.id}" type="button">Edit</button>${r?`<button class="secondary delete-sale-btn" data-id="${m.id}" type="button">Delete</button>`:""}</div></div>`).join("")||'<div class="helper">No daily sales totals yet.</div>'}
          </div>
        </div>
      </article>
    </section>
    `}
  `}function On(e,t,n,a,r,s,i,l,c,d){const u=o.reportPreview?Bt(e,t,n,a,r,s,i,o.reportPreview):null;return`
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
            ${o.currentUser?.branch?.toLowerCase().includes("gensan")?"":'<label><input type="checkbox" name="reportType" value="fold_count" /> Fold Count</label>'}
            ${o.currentUser?.branch?.toLowerCase().includes("mintal")?"":'<label><input type="checkbox" name="reportType" value="revolving_fund" /> Revolving Fund</label>'}
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
            ${F("Sales report preview",`${u.selection.from} to ${u.selection.to}`)}
            <div style="overflow-x: auto; width: 100%; -webkit-overflow-scrolling: touch;">
              <table class="data-table orders-data-table bordered-table">
                <thead>
                  <tr><th>Ticket</th><th>Customer</th><th>Cash</th><th>GCash</th><th>Total Payment</th></tr>
                </thead>
                <tbody>
                  ${u.salesRows().transactions.map(m=>`<tr><td>${p(m.ticket)}</td><td>${p(m.customer)}</td><td>${T(m.cash)}</td><td>${T(m.gcash)}</td><td><strong>${T(m.total)}</strong></td></tr>`).join("")||'<tr><td colspan="5" class="table-empty">No sales records found.</td></tr>'}
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
                    <tr><td>Orders</td><td>${T(u.salesRows().orderCashTotal)}</td><td>${T(u.salesRows().orderGcashTotal)}</td><td>${T(u.salesRows().orderCashTotal+u.salesRows().orderGcashTotal)}</td></tr>
                    <tr><td>Whole Sale Day</td><td>${T(u.salesRows().manualCashTotal)}</td><td>${T(u.salesRows().manualGcashTotal)}</td><td>${T(u.salesRows().manualCashTotal+u.salesRows().manualGcashTotal)}</td></tr>
                    <tr style="font-weight: bold; background: #f8fafc;"><td>Total</td><td>${T(u.salesRows().totalCash)}</td><td>${T(u.salesRows().totalGcash)}</td><td>${T(u.salesRows().totalSales)}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </article>`:""}
        ${u.selectedTypes.has("disbursement")?`
          <article>
            ${F("Disbursement preview",`${u.selection.from} to ${u.selection.to}`)}
            <div style="overflow-x: auto; width: 100%; -webkit-overflow-scrolling: touch;">
              <table class="data-table orders-data-table bordered-table">
                <thead>
                  <tr><th>ID#</th><th>Date/Month</th><th>Type</th><th>Name</th><th>Category</th><th>Amount</th></tr>
                </thead>
                <tbody>
                  ${u.disbursementRows().rows.slice(1).filter(m=>m.length&&m[0]!=="Total Disbursement").map(m=>`<tr><td>${p(String(m[1]??""))}</td><td>${p(String(m[0]??""))}</td><td>${p(String(m[2]??""))}</td><td>${p(String(m[3]??""))}</td><td>${p(String(m[4]??""))}</td><td><strong>${T(m[6])}</strong></td></tr>`).join("")||'<tr><td colspan="6" class="table-empty">No disbursements found.</td></tr>'}
                </tbody>
              </table>
            </div>
            <div class="disbursement-total" style="margin-top: 16px;">
              <strong>Total Disbursement: ${T(u.disbursementRows().totalDisbursement)}</strong>
            </div>
          </article>`:""}
        ${u.selectedTypes.has("fold_count")?`
          <article>
            ${F("Fold Count preview",`${u.selection.from} to ${u.selection.to}`)}
            <div style="overflow-x: auto; width: 100%; -webkit-overflow-scrolling: touch;">
              <table class="data-table orders-data-table bordered-table">
                <thead>
                  <tr><th>Staff</th><th>Fold Count</th></tr>
                </thead>
                <tbody>
                  ${u.foldCountRows().rows.slice(1).map(m=>`<tr>${m.map(v=>`<td>${p(String(v??""))}</td>`).join("")}</tr>`).join("")||'<tr><td colspan="2" class="table-empty">No fold records found.</td></tr>'}
                </tbody>
              </table>
            </div>
          </article>`:""}
        ${u.selectedTypes.has("revolving_fund")?`
          <article>
            ${F("Revolving Fund — Daily Summary",`${u.selection.from} to ${u.selection.to}`)}
            ${te(["Date of Sales","Cash on Hand","Status","Date Update"],u.revolvingDailySummaryRows().rows.slice(1).map(m=>[p(String(m[0]??"")),p(String(m[1]??"")),p(String(m[2]??"")),p(String(m[3]??""))]),"data-table orders-data-table bordered-table")}
          </article>
          <article>
            ${F("Revolving Fund — Table History",`${u.selection.from} to ${u.selection.to}`)}
            ${te(["Date","Number","Name","Amount","Category","Description","Type"],u.revolvingHistoryRows().rows.slice(1).map(m=>[p(String(m[0]??"")),p(String(m[1]??"")),p(String(m[2]??"")),p(String(m[3]??"")),p(String(m[4]??"")),p(String(m[5]??"")),p(String(m[6]??""))]),"data-table orders-data-table bordered-table")}
          </article>`:""}
        ${u.selectedTypes.has("summary")?`
          <article>
            ${F("Summary preview",`${u.selection.from} to ${u.selection.to}`)}
            <div class="summary-cards-grid summary-single-row">
              <div class="summary-card"><span class="card-label">Total Sales</span><div class="card-details"><span>Total Cash: ${T(u.salesRows().totalCash)}</span><span>Total GCash: ${T(u.salesRows().totalGcash)}</span></div><strong>${T(u.salesRows().totalSales)}</strong></div>
              <div class="summary-card"><span class="card-label">Total Disbursement</span><strong>${T(u.disbursementRows().totalDisbursement)}</strong></div>
              <div class="summary-card"><span class="card-label">Cash on Hand</span><strong>${T(ke(u.salesRows().totalCash,u.disbursementRows().totalDisbursement))}</strong></div>
            </div>
          </article>`:""}
      </section>
    `:""}
  `}function Dn(e){return`
    <section class="grid content full">
      <article class="panel span-2">
        ${F("Activity Logs","Recorded staff actions and timestamps")}
        ${te(["Timestamp","Staff","Action","Details"],e.map(t=>[Ie(t.timestamp),p(t.staffName),`<strong>${p(t.action)}</strong>`,p(t.details)]),"data-table orders-data-table app-record-table logs-table")}
      </article>
    </section>
  `}function Pn(e,t,n){return`
    <section class="grid content full">
      <article class="panel">
        ${F("Inventory Item","Custom stocks and supplies")}
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
        ${F("Stock List","Editable branch inventory")}
        ${te(["Item","Qty","Unit","Reorder","Status","Updated","Action"],e.map(a=>[`<strong>${p(a.name)}</strong><div class="small">${p(a.notes??"")}</div>`,p(a.quantity),p(a.unit),p(a.reorderLevel),`<span class="${a.quantity<=a.reorderLevel?"warn":"ok"}">${a.quantity<=a.reorderLevel?"Low stock":"OK"}</span>`,Ie(a.updatedAt),`<button class="secondary edit-inventory-btn" type="button" data-id="${a.id}">Edit</button>`]),"data-table orders-data-table app-record-table inventory-stock-table")}
      </article>
      <article class="panel">
        ${F("Stock In / Stock Out","Adjust inventory quantities")}
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
        ${F("Stock Movement History","Recent stock-in and stock-out records")}
        ${te(["Date","Item","Type","Qty","Staff","Notes"],t.map(a=>[Ie(a.createdAt),p(a.itemName),`<span class="${a.movementType==="in"?"ok":"warn"}">${a.movementType==="in"?"Stock-in":"Stock-out"}</span>`,p(a.quantity),p(a.staffName),p(a.notes??"")]),"data-table orders-data-table app-record-table inventory-movement-table")}
      </article>
    </section>
  `}function xn(e,t,n){const a=e.filter(u=>u.status!=="under_cleaning"),r=e.filter(u=>u.status==="under_cleaning"),s=new Date,i=new Date(s.getFullYear(),s.getMonth(),1);i.setDate(i.getDate()-i.getDay());const l=Array.from({length:35},(u,m)=>{const v=new Date(i);v.setDate(i.getDate()+m);const f=le(v),C=t.filter(q=>q.date===f);return{key:f,date:v,records:C,isCurrentMonth:v.getMonth()===s.getMonth(),isToday:f===j()}}),c=new Intl.DateTimeFormat("en-PH",{month:"long",year:"numeric"}).format(s),d=t.some(u=>u.date===j()&&u.cleaningType==="general");return`
    <section class="page-head">
      <div>
        <h2>Maintenance & Cleaning</h2>
        <p class="meta">Manage machine tube cleaning, general cleaning, and maintenance records.</p>
      </div>
      <div class="segmented">
        <button class="${o.maintenanceTab==="cleaning"?"is-active":""}" data-maintenance-tab="cleaning" type="button">Tube Cleaning</button>
        <button class="${o.maintenanceTab==="machines"?"is-active":""}" data-maintenance-tab="machines" type="button">Machine Management</button>
      </div>
    </section>
    ${o.maintenanceTab==="cleaning"?`
    <section class="grid content full">
      <article class="panel">
        ${F("Available Machines","Select machines to start cleaning.")}
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
        ${F("General Cleaning","Confirm general cleaning for today")}
        <div class="summary-list">
          <div><span>Today</span><strong>${d?"Confirmed":"Pending"}</strong></div>
        </div>
        <button class="primary" type="button" id="confirm-general-cleaning" ${d?"disabled":""}>Confirm General Cleaning</button>
      </article>
      <article class="panel warning-panel">
        ${F("Under Cleaning","Machines currently being serviced.")}
        <div class="machine-stack">
          ${r.length?r.map(u=>`
            <div class="machine-status">
              <span><strong>${p(u.machineName)}</strong><small>${p(u.machineType)}</small></span>
              <b>In progress</b>
              <button class="secondary complete-cleaning-btn" type="button" data-machine-id="${u.id}" data-branch="${p(n)}">Mark Complete</button>
            </div>`).join(""):'<p class="helper">No machines under cleaning right now.</p>'}
        </div>
      </article>
      <article class="panel span-2">
        ${F("Tube Cleaning Checklist","Track which machines have been cleaned today.")}
        ${te(["Machine","Type","Status","Notes","Date"],e.map(u=>{const m=t.find(v=>v.machineIds.includes(u.id)&&v.date===j());return[`<strong>${p(u.machineName)}</strong>`,p(u.machineType),`<span class="${m?"ok":"warn"}">${m?p(m.cleaningStatus.replace("_"," ")):"Not Cleaned"}</span>`,p(m?.notes??"-"),j()]}),"data-table orders-data-table app-record-table tube-checklist-table")}
      </article>
      <article class="panel span-2">
        ${F("Cleaning Calendar",c)}
        <div class="maintenance-calendar">
          <div class="calendar-weekdays">${["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(u=>`<span>${u}</span>`).join("")}</div>
          <div class="calendar-grid">
            ${l.map(u=>{const m=u.records.filter(f=>f.cleaningType!=="general").length,v=u.records.some(f=>f.cleaningType==="general");return`<div class="calendar-day ${u.records.length?"has-records":""} ${u.isCurrentMonth?"":"is-muted"} ${u.isToday?"is-today":""}">
                <strong>${u.date.getDate()}</strong>
                <span>${v?"General":""}</span>
                <small>${m?`${m} tube`:"No tube"}</small>
              </div>`}).join("")}
          </div>
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
          <input type="hidden" name="branch" value="${p(n)}" />
          <button class="primary" type="submit">Add machine</button>
        </form>
      </article>
      <article class="panel">
        ${F("Machines","Washer and dryer status")}
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
  `}function In(e,t){return`
    <section class="grid">
      <div class="page-head">
        <div>
          <p class="eyebrow">Team Management</p>
          <h2>Staff Overview</h2>
        </div>
        <button class="primary" id="open-add-staff-modal" type="button">+ Add staff</button>
      </div>

      <article class="panel">
        ${F("Staff list","Branch: "+p(t))}
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
  `}function qn(e,t,n){return`
    <section class="grid content full">
      <article class="panel">
        ${F("Settings","Device-local configuration")}
        <form id="settings-form" class="form">
          <label>Current branch<select name="branch">
            ${["Main Store","Mintal Branch","Gensan Branch"].map(a=>`<option value="${a}" ${a===e?"selected":""}>${a}</option>`).join("")}
          </select></label>
          <label>Report email<input name="reportEmail" type="email" placeholder="admin@laba101.test" value="${p(n)}" /></label>
          <button class="primary" type="submit">Save settings</button>
        </form>
      </article>
    </section>
  `}function Fn(){const e=()=>{localStorage.removeItem(Te),o.currentUser=null,o.tab="dashboard",o.receiptOrderId=0,o.sidebarOpen=!1,S()};document.querySelector("#logout-button")?.addEventListener("click",e),document.querySelector("#mobile-logout-button")?.addEventListener("click",e),document.querySelector("#mobile-menu-button")?.addEventListener("click",()=>{o.sidebarOpen=!0,S()}),document.querySelector("#sidebar-close-button")?.addEventListener("click",()=>{o.sidebarOpen=!1,S()}),document.querySelector("#sidebar-backdrop")?.addEventListener("click",()=>{o.sidebarOpen=!1,S()}),document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{o.tab=t.dataset.tab,o.receiptOrderId=0,o.sidebarOpen=!1,S()})}),document.querySelectorAll("[data-quick-tab]").forEach(t=>{t.addEventListener("click",()=>{o.tab=t.dataset.quickTab,S()})}),document.querySelectorAll("[data-receipt]").forEach(t=>{t.addEventListener("click",()=>{o.receiptOrderId=Number(t.dataset.receipt),o.printerPanelOpen=!1,o.printerError="",o.printerStatus="",S()})}),document.querySelector("[data-close-receipt]")?.addEventListener("click",()=>{o.receiptOrderId=0,S()}),document.querySelector("[data-open-printer-panel]")?.addEventListener("click",()=>{o.printerPanelOpen=!o.printerPanelOpen,o.printerPanelOpen&&o.pairedPrinters.length===0?bt():S()}),document.querySelector("[data-refresh-printers]")?.addEventListener("click",()=>{bt()}),document.querySelector("[data-printer-select]")?.addEventListener("change",t=>{o.selectedPrinterAddress=t.currentTarget.value,S()}),document.querySelector("[data-paper-width]")?.addEventListener("change",t=>{o.printerPaperWidth=Number(t.currentTarget.value)===80?80:58,S()}),document.querySelector("[data-connect-printer]")?.addEventListener("click",()=>{wn()}),document.querySelector("[data-thermal-print]")?.addEventListener("click",()=>{(async()=>{const t=await _t(),n=t.orders.find(r=>r.id===o.receiptOrderId);if(!n)throw new Error("Receipt order not found.");const a=t.payments.filter(r=>r.orderId===n.id);await An(n,a)})().catch(t=>{o.printerPanelOpen=!0,o.printerError=t instanceof Error?t.message:"Bluetooth thermal print failed.",S()})}),document.querySelector("[data-open-daily-summary]")?.addEventListener("click",()=>{o.dashboardSummaryModalOpen=!0,S()}),document.querySelector("[data-close-daily-summary]")?.addEventListener("click",()=>{o.dashboardSummaryModalOpen=!1,S()}),document.querySelector("[data-print-dashboard]")?.addEventListener("click",t=>{const a=t.currentTarget.dataset.metrics;if(a)try{const r=JSON.parse(a);Ln(r)}catch(r){console.error("Failed to parse dashboard metrics:",r)}}),document.querySelectorAll("[data-report-tab]").forEach(t=>{t.addEventListener("click",()=>{o.dailyReportTab=t.dataset.reportTab,S()})}),document.querySelectorAll("[data-maintenance-tab]").forEach(t=>{t.addEventListener("click",()=>{o.maintenanceTab=t.dataset.maintenanceTab,S()})})}function kn(){vn(),document.querySelector("#login-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget),n=document.querySelector("#login-button");n&&(n.disabled=!0,n.textContent="Signing in...");try{const a=await Lt(String(t.get("email")??""),String(t.get("password")??""));if(!a){o.loginError="Invalid email or password.",await S();return}o.currentUser=a,o.loginError="",await Le("branch",String(a.branch||"Main Store")),t.get("remember")?localStorage.setItem(Te,JSON.stringify({email:a.email,remembered:!0})):localStorage.removeItem(Te),jt().includes(o.tab)||(o.tab="dashboard"),await S()}catch(a){alert("Login Error: "+String(a?.message||a)),n&&(n.disabled=!1,n.textContent="Sign in")}})}function Un(){Ae&&window.clearInterval(Ae);const e=document.querySelector("[data-navbar-time]"),t=document.querySelector("[data-navbar-date]");if(!e||!t){Ae=void 0;return}const n=()=>{const a=mn();e.textContent=a.time,t.textContent=a.date};n(),Ae=window.setInterval(n,1e3)}function gt(e,t){return e?t.find(n=>n.name.toLowerCase()===e.category.toLowerCase())??t.find(n=>n.name==="Regular Clothes")??t[0]??null:null}function je(e,t){return Math.max(1,Number(t.maxKg||e.maxKg||1))}function Xt(e,t){return Object.fromEntries(t.filter(n=>n.serviceType==="order").map(n=>[n.id,Number(e.querySelector(`input[name="serviceQty-${n.id}"]`)?.value??0)]).filter(([,n])=>Number(n)>0))}function Et(e,t){const n=Xt(e,t);return t.filter(a=>a.serviceType==="order"&&Number(n[a.id]??0)>0).map(a=>({...a,quantity:Number(n[a.id])}))}function Gt(e,t){return Object.fromEntries(t.filter(n=>n.serviceType==="addon").map(n=>[n.id,Number(e.querySelector(`input[name="addonQty-${n.id}"]`)?.value??0)]).filter(([,n])=>Number(n)>0))}function St(e,t){const n=Gt(e,t);return t.filter(a=>a.serviceType==="addon"&&Number(n[a.id]??0)>0).map(a=>({...a,quantity:Number(n[a.id])}))}function Mn(e){const t=document.querySelector("#order-form"),n=document.querySelector("#price-preview"),a=t?.querySelector('button[type="submit"]'),r=document.querySelector("#customer-name-input"),s=document.querySelector("#customer-id-input"),i=document.querySelector("#customer-phone-input"),l=document.querySelector("#customer-suggestions"),c=t?.querySelector("[data-order-error]"),d=t?.querySelector('select[name="paymentMethod"]'),u=t?.querySelector(".gcash-reference"),m=t?.querySelector('input[name="paymentReference"]');let v=!1,f;const C=y=>{if(!l||!r)return;const b=y.trim().toLowerCase();if(!b){l.hidden=!0;return}const g=e.customers.filter(O=>O.name.toLowerCase().includes(b)||(O.phone??"").includes(b)).slice(0,8),L=`<div class="ac-item ac-add" data-ac-new="true"><strong>+ Add new: "${p(y.trim())}"</strong></div>`,x=g.map(O=>`<div class="ac-item" data-ac-id="${O.id}" data-ac-name="${p(O.name)}" data-ac-phone="${p(O.phone??"")}"><strong>${p(O.name)}</strong>${O.phone?`<span>${p(O.phone)}</span>`:""}</div>`).join("");l.innerHTML=x+L,l.hidden=!1};r?.addEventListener("input",()=>{s&&(s.value=""),clearTimeout(f),f=window.setTimeout(()=>C(r.value),150)}),r?.addEventListener("focus",()=>{r.value.trim()&&C(r.value)}),l?.addEventListener("click",y=>{const b=y.target.closest(".ac-item");b&&(b.dataset.acNew==="true"?s&&(s.value=""):(r&&(r.value=b.dataset.acName??""),i&&(i.value=b.dataset.acPhone??""),s&&(s.value=b.dataset.acId??"")),l&&(l.hidden=!0))}),document.addEventListener("click",y=>{l&&!l.contains(y.target)&&y.target!==r&&(l.hidden=!0)});const q=()=>{const y=d?.value==="gcash";u&&(u.hidden=!y),m&&(m.required=y,y||(m.value=""))},N=(y,b)=>{if(!t)return;const g=t.querySelector(`input[name="${y}"]`);g&&(g.value=String(Math.max(0,Number(g.value||0)+b)),g.closest(".qty-card")?.classList.toggle("is-selected",Number(g.value)>0),g.dispatchEvent(new Event("input",{bubbles:!0})))};t?.querySelectorAll(".qty-control input").forEach(y=>{y.addEventListener("input",()=>{y.value=String(Math.max(0,Number(y.value||0))),y.closest(".qty-card")?.classList.toggle("is-selected",Number(y.value)>0)})}),t?.querySelectorAll("[data-qty-card]").forEach(y=>{y.addEventListener("click",b=>{const g=b.target;g.closest("input")||g.closest("button")||N(y.dataset.qtyCard??"",1)})}),t?.querySelectorAll("[data-qty-plus]").forEach(y=>{y.addEventListener("click",()=>N(y.dataset.qtyPlus??"",1))}),t?.querySelectorAll("[data-qty-minus]").forEach(y=>{y.addEventListener("click",()=>N(y.dataset.qtyMinus??"",-1))});const E=()=>{if(!t||!n)return;const y=Et(t,e.services),b=y[0],g=gt(b,e.categories),L=St(t,e.services),x=y.length>0&&b&&g,O=L.length>0;if(!x&&!O){a&&(a.disabled=!0),c&&(c.hidden=!v,c.textContent=v?"Please select at least one service or extra service.":""),n.innerHTML='<div class="preview-total"><span>Total amount</span><strong>PHP 0.00</strong></div>';return}if(x){const D=Ce(y,g,je(b,g),L),I=D.serviceLines.map(U=>`${U.name} x${U.quantity}`),P=D.extras.map(U=>`${re(U.name)} x${U.quantity}`);a&&(a.disabled=!1),c&&(c.hidden=!0,c.textContent=""),n.classList.remove("has-error"),n.innerHTML=`
        <div class="preview-line"><span>Services${I.length?` (${p(I.join(", "))})`:""}</span><strong>${T(D.price)}</strong></div>
        ${D.extraServiceAmount>0?`<div class="preview-line"><span>Extra services${P.length?` (${p(P.join(", "))})`:""}</span><strong>${T(D.extraServiceAmount)}</strong></div>`:""}
        <div class="preview-total"><span>Total amount</span><strong>${T(D.totalAmount)}</strong></div>
      `}else{const D=L.reduce((P,U)=>P+U.price*(U.quantity??1),0),I=L.map(P=>`${re(P.name)} x${P.quantity??1}`);a&&(a.disabled=!1),c&&(c.hidden=!0,c.textContent=""),n.classList.remove("has-error"),n.innerHTML=`
        <div class="preview-line"><span>Extra services (${p(I.join(", "))})</span><strong>${T(D)}</strong></div>
        <div class="preview-total"><span>Total amount</span><strong>${T(D)}</strong></div>
      `}};d?.addEventListener("change",q),q(),t?.addEventListener("input",E),t?.addEventListener("change",E),E(),t?.addEventListener("submit",async y=>{y.preventDefault(),v=!0;const b=new FormData(t),g=Et(t,e.services),L=g[0],x=gt(L,e.categories),O=St(t,e.services),D=g.length>0&&L&&x,I=O.length>0;if(!D&&!I){c&&(c.hidden=!1,c.textContent="Please select at least one service or extra service.");return}const P=g.map(B=>`${B.name} x${B.quantity}`).join(", "),U=D?Ce(g,x,je(L,x),O):Ce([],e.categories[0],1,O);if(confirm(`Save this order?

Services: ${P}
Total: ${T(U.totalAmount)}`))try{const B=await Da({customerId:Number(b.get("customerId"))||void 0,customerName:String(b.get("customerName")??""),customerPhone:String(b.get("customerPhone")??"")||null,serviceQuantities:Xt(t,e.services),branch:e.branch,itemCategoryId:x?.id??e.categories[0].id,weightKg:L&&x?je(L,x):1,addonQuantities:Gt(t,e.services),paidAmount:Number(b.get("paidAmount")??0),paymentMethod:String(b.get("paymentMethod")??"cash"),paymentReference:String(b.get("paymentReference")??"")||null,notes:String(b.get("notes")??"")||null});await V("Create order",`${B.ticket} ${T(B.totalAmount)}`),o.receiptOrderId=B.id,await S()}catch(B){c&&(c.hidden=!1,c.textContent=B instanceof Error?B.message:"Order could not be saved.")}}),document.querySelectorAll(".advance-form").forEach(y=>{y.addEventListener("submit",async b=>{b.preventDefault();const g=Number(y.dataset.orderId),L=y.dataset.action==="claim",x=Number(y.dataset.balance||0);if(L&&x>0){alert("Please complete the balance before claiming this order.");return}const O=new FormData(y),D=O.getAll("assignedStaffId").map(Number).filter(_=>_>0),I=Number(O.get("releasedBy")||0),P=D.length>0?D:I>0?I:null;await mt(g,P);const U=L&&I>0?e.staff.find(_=>_.id===I)?.name:null,B=L&&U?`Order ID ${g} (Released by: ${U})`:`Order ID ${g}`;await V(L?"Claim order":"Advance order",B),await S()})}),document.querySelectorAll(".fold-staff-select").forEach(y=>{y.addEventListener("change",async()=>{const b=Number(y.value);if(!b)return;const g=Number(y.dataset.orderId);y.disabled=!0;try{await Ot(g,b),await V("Record fold",`Order ID ${g} (Fold ${y.dataset.foldNumber??""})`),await S()}catch(L){y.disabled=!1,alert(L instanceof Error?L.message:"Could not save fold.")}})}),document.querySelectorAll(".claim-payment-form").forEach(y=>{const b=y.querySelector('select[name="method"]'),g=y.querySelector('input[name="reference"]'),L=()=>{const x=b?.value==="gcash";g&&(g.closest("label").hidden=!x,g.required=x,x||(g.value=""))};b?.addEventListener("change",L),L(),y.addEventListener("submit",async x=>{x.preventDefault();const O=new FormData(y),D=Number(O.get("amount"));if(D<=0)return;const I=Number(y.dataset.orderId);await We(I,{amount:D,method:String(O.get("method")),reference:String(O.get("reference")??"")||null}),await mt(I,null),o.paymentModalOrderId=0,await S()})}),document.querySelectorAll("[data-close-payment-modal]").forEach(y=>{y.addEventListener("click",async()=>{o.paymentModalOrderId=0,await S()})}),document.querySelectorAll(".payment-form").forEach(y=>{const b=y.querySelector('select[name="method"]'),g=y.querySelector('input[name="reference"]'),L=()=>{const x=b?.value==="gcash";g&&(g.hidden=!x,g.required=x,x||(g.value=""))};b?.addEventListener("change",L),L(),y.addEventListener("submit",async x=>{x.preventDefault();const O=new FormData(y),D=Number(O.get("amount")),I=String(O.get("method")),P=String(O.get("reference")??"")||null;confirm(`Confirm payment of ${T(D)} via ${I.toUpperCase()}?`)&&(await We(Number(y.dataset.orderId),{amount:D,method:I,reference:P}),await V("Record payment",`${T(D)} ${I.toUpperCase()} for order ID ${y.dataset.orderId}`),await S())})}),document.querySelectorAll("[data-cancel-order]").forEach(y=>{y.addEventListener("click",async()=>{const b=Number(y.dataset.cancelOrder);if(Number.isFinite(b)&&confirm("Cancel this order? (No payment will be refunded.)"))try{o.receiptOrderId===b&&(o.receiptOrderId=0),await Ia(b),await V("Cancel order",`Order ID ${b}`),await S()}catch(g){alert(g instanceof Error?g.message:"Cancel failed.")}})}),document.querySelectorAll("[data-delete-order]").forEach(y=>{y.addEventListener("click",async()=>{const b=Number(y.dataset.deleteOrder);if(Number.isFinite(b)&&confirm("Delete this paid order and update sales?"))try{o.receiptOrderId===b&&(o.receiptOrderId=0),await qa(b),await S()}catch(g){alert(g instanceof Error?g.message:"Delete failed.")}})})}function Bn(e){document.querySelector("#service-form")?.addEventListener("submit",async t=>{t.preventDefault();const n=new FormData(t.currentTarget),a=n.get("id")?Number(n.get("id")):void 0;await ut({id:a,name:String(n.get("name")??""),description:String(n.get("description")??"")||null,category:String(n.get("category")??""),serviceType:String(n.get("serviceType")??"order"),price:Number(n.get("price")??0),maxKg:Number(n.get("maxKg")??0),dryingMinutes:Number(n.get("dryingMinutes"))||null,includes:n.getAll("includes").map(String).filter(Boolean),additionalCharge:0,turnaroundHours:Number(n.get("turnaroundHours")??24),isActive:1}),await S()}),document.querySelectorAll(".edit-service-btn").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.dataset.id),a=e.find(s=>s.id===n),r=document.querySelector("#service-form");a&&r&&(r.querySelector("[name=id]").value=String(a.id),r.querySelector("[name=name]").value=a.name,r.querySelector("[name=category]").value=a.category,r.querySelector("[name=serviceType]").value=a.serviceType,r.querySelector("[name=price]").value=String(a.price),r.querySelector("[name=maxKg]").value=String(a.maxKg),r.querySelector("[name=dryingMinutes]").value=a.dryingMinutes?String(a.dryingMinutes):"",r.querySelectorAll('input[name="includes"]').forEach(s=>{s.checked=a.includes.includes(s.value)}),r.querySelector("[name=turnaroundHours]").value=String(a.turnaroundHours),r.querySelector("[name=description]").value=a.description??"",window.scrollTo({top:0,behavior:"smooth"}))})}),document.querySelectorAll(".deactivate-service-btn, .activate-service-btn").forEach(t=>{t.addEventListener("click",async()=>{const n=Number(t.dataset.id),a=e.find(r=>r.id===n);if(a){const r=a.isActive?0:1;await ut({id:a.id,name:a.name,description:a.description,category:a.category,serviceType:a.serviceType,price:a.price,maxKg:a.maxKg,dryingMinutes:a.dryingMinutes,includes:a.includes,additionalCharge:a.additionalCharge,turnaroundHours:a.turnaroundHours,isActive:r}),await S()}})}),document.querySelector("#category-form")?.addEventListener("submit",async t=>{t.preventDefault();const n=new FormData(t.currentTarget);await Oa({name:String(n.get("name")??""),maxKg:Number(n.get("maxKg")??0),additionalFee:Number(n.get("additionalFee")??0),isActive:1}),await S()})}function _n(e){const t=document.querySelector("#expense-form"),n=t?.querySelector('input[name="disbursementType"]'),a=t?.querySelector(".expense-date-field"),r=t?.querySelector(".expense-month-field"),s=t?.querySelector('input[name="expenseDate"]'),i=t?.querySelector('input[name="expenseMonth"]'),l=c=>{!t||!n||!s||!i||(n.value=c,t.querySelectorAll("[data-expense-type]").forEach(d=>{d.classList.toggle("is-active",d.dataset.expenseType===c)}),a&&(a.hidden=c==="monthly"),r&&(r.hidden=c!=="monthly"),s.required=c==="daily",i.required=c==="monthly",c==="monthly"&&!i.value&&(i.value=Xe()),c==="daily"&&!s.value&&(s.value=j()))};t?.querySelectorAll("[data-expense-type]").forEach(c=>{c.addEventListener("click",()=>l(c.dataset.expenseType==="monthly"?"monthly":"daily"))}),l("daily"),t?.addEventListener("submit",async c=>{c.preventDefault();const d=new FormData(c.currentTarget),u=Number(d.get("id")||0),m=String(d.get("disbursementType")??"daily")==="monthly"?"monthly":"daily",v=String(d.get("expenseMonth")??Xe()),f={expenseDate:m==="monthly"?`${v}-01`:String(d.get("expenseDate")??""),disbursementType:m,name:String(d.get("name")??""),category:String(d.get("category")??""),description:String(d.get("description")??""),amount:Number(d.get("amount")??0)};if(m==="daily"&&f.expenseDate!==j()){const C=prompt("Admin password is required for non-today disbursement dates.");if(!C||!await un(C)){alert("Admin password is incorrect. Disbursement was not saved.");return}}u?await Wa(u,f):await Ha(f),await V(u?"Update disbursement":"Create disbursement",`${f.expenseDate} ${f.name} ${T(f.amount)}`),await S()}),document.querySelectorAll(".edit-expense-btn").forEach(c=>{c.addEventListener("click",()=>{const d=e.find(m=>m.id===Number(c.dataset.id));if(!d||!t)return;t.querySelector("[name=id]").value=String(d.id),t.querySelector("[name=expenseDate]").value=d.expenseDate,t.querySelector("[name=expenseMonth]").value=kt(d.expenseDate),l(se(d)),t.querySelector("[name=amount]").value=String(d.amount),t.querySelector("[name=name]").value=d.name,t.querySelector("[name=category]").value=d.category,t.querySelector("[name=description]").value=d.description??"";const u=t.querySelector('button[type="submit"]');u&&(u.textContent="Update expense"),t.scrollIntoView({behavior:"smooth",block:"start"})})}),document.querySelectorAll(".delete-expense-btn").forEach(c=>{c.addEventListener("click",async()=>{if(o.currentUser?.role!=="admin")return;const d=Number(c.dataset.id);!Number.isFinite(d)||!confirm("Delete this disbursement?")||(await Xa(d),await S())})}),document.querySelector("#fold-form")?.addEventListener("submit",async c=>{c.preventDefault();const d=new FormData(c.currentTarget);await ka({orderTicket:String(d.get("orderTicket")??""),staffName:String(d.get("staffName")??""),foldCount:Number(d.get("foldCount")??1),rate:Number(d.get("rate")??5)}),await S()})}function jn(e,t,n,a,r,s,i){document.querySelector("#generate-report")?.addEventListener("click",()=>{o.reportPreview=Be(),S()});const l=document.querySelector("#sales-form");l?.addEventListener("submit",async N=>{N.preventDefault();const E=new FormData(N.currentTarget);await Ka({id:Number(E.get("id")||0)||void 0,saleDate:String(E.get("saleDate")??""),cashAmount:Number(E.get("cashAmount")??0),gcashAmount:Number(E.get("gcashAmount")??0),notes:String(E.get("notes")??"")}),await S()}),document.querySelectorAll(".edit-sale-btn").forEach(N=>{N.addEventListener("click",()=>{const E=n.find(b=>b.id===Number(N.dataset.id));if(!E||!l)return;l.querySelector("[name=id]").value=String(E.id),l.querySelector("[name=saleDate]").value=E.saleDate,l.querySelector("[name=cashAmount]").value=String(E.cashAmount),l.querySelector("[name=gcashAmount]").value=String(E.gcashAmount),l.querySelector("[name=notes]").value=E.notes??"";const y=l.querySelector('button[type="submit"]');y&&(y.textContent="Update daily sale"),l.scrollIntoView({behavior:"smooth",block:"start"})})}),document.querySelectorAll(".delete-sale-btn").forEach(N=>{N.addEventListener("click",async()=>{if(o.currentUser?.role!=="admin")return;const E=Number(N.dataset.id);!Number.isFinite(E)||!confirm("Delete this daily sale?")||(await Va(E),await S())})});const c=document.querySelector("[data-date-from]"),d=document.querySelector("[data-date-to]"),u=document.querySelector('[data-date-scope][value="custom"]');c&&u&&c.addEventListener("change",()=>u.checked=!0),d&&u&&d.addEventListener("change",()=>u.checked=!0),document.querySelectorAll("[data-date-scope]").forEach(N=>{N.addEventListener("change",()=>{if(!N.checked||!c||!d)return;const E=new Date,y=le(E),b=new Date(E);N.value==="week"&&b.setDate(E.getDate()-6),N.value==="month"&&b.setDate(1),N.value!=="custom"&&(c.value=N.value==="today"?y:le(b),d.value=y)})});const m=N=>{const E=g=>String(g??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;"),y=g=>g==="Sales Report"?[110,125,150,215,95,95,105,105]:g==="Disbursement"?[115,115,90,150,150,220,105]:g==="Fold Count"?[220,125]:g==="Revolving Daily Summary"?[115,105,120,115]:g==="Revolving History"?[115,96,140,96,110,180,120]:[155,125,125,125,95,95,115,115];return`<?xml version="1.0"?>
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
  ${N.map(g=>{const L=y(g.name),x=Math.max(L.length,...g.rows.map(P=>P.length),1),O=Math.max(g.rows.length,1),D=L.map(P=>`<Column ss:Width="${P}" ss:AutoFitWidth="0"/>`).join(""),I=g.rows.map(P=>{if(!P.length)return'<Row ss:Height="10" ss:StyleID="BorderRow"><Cell ss:StyleID="BorderCell"><Data ss:Type="String">&nbsp;</Data></Cell></Row>';const U=P[0]==="Type"||P[0]==="Summary"||P[0]==="Sales Summary"||P[0]==="Disbursement Summary"||P[0]==="Staff"||P[0]==="Date of Sales"||P[0]==="Date"||P[0]==="Date/Month"||P[0]==="Ticket",B=U?"HeaderRow":"BorderRow",_=U?"HeaderCell":"BorderCell",J=U?26:22,ae=P.map(we=>`<Cell ss:StyleID="${_}"><Data ss:Type="${typeof we=="number"?"Number":"String"}">${E(we)}</Data></Cell>`).join("");return`<Row ss:Height="${J}" ss:StyleID="${B}">${ae}</Row>`}).join("");return`
        <Worksheet ss:Name="${E(g.name)}">
          <Table ss:ExpandedColumnCount="${x}" ss:ExpandedRowCount="${O}">
            ${D}
            ${I}
          </Table>
        </Worksheet>`}).join("")}
</Workbook>`},v=()=>{const N=Be(),E=Bt(e,t,n,a,r,s,i,N),y=[];if(E.selectedTypes.has("sales")){const L=E.salesRows(),x=[["Ticket","Customer","Cash","GCash","Total Payment"],...L.transactions.map(O=>[O.ticket,O.customer,O.cash,O.gcash,O.total]),[],["Cash from Orders","GCash from Orders","Sales from Orders"],[L.orderCashTotal,L.orderGcashTotal,L.orderCashTotal+L.orderGcashTotal],[],["Cash Whole Sale","GCash Whole Sale","Whole Sale of Day"],[L.manualCashTotal,L.manualGcashTotal,L.manualCashTotal+L.manualGcashTotal],[],["Total Cash","Total GCash","Total Sales"],[L.totalCash,L.totalGcash,L.totalSales]];y.push({name:"Sales Report",rows:x})}E.selectedTypes.has("disbursement")&&y.push({name:"Disbursement",rows:E.disbursementRows().rows}),E.selectedTypes.has("fold_count")&&y.push({name:"Fold Count",rows:E.foldCountRows().rows}),E.selectedTypes.has("revolving_fund")&&(y.push({name:"Revolving Daily Summary",rows:E.revolvingDailySummaryRows().rows}),y.push({name:"Revolving History",rows:E.revolvingHistoryRows().rows})),E.selectedTypes.has("summary")&&y.push({name:"Summary",rows:E.summaryRows()});const b=m(y.length?y:[{name:"Summary",rows:E.summaryRows()}]);return{fileName:`laba101-report-${N.from}-to-${N.to}.xls`,content:b}},f=async()=>{const{fileName:N,content:E}=v();if(!$.isNativePlatform())return{fileName:N,uri:""};const y=N;await ot.writeFile({path:y,data:E,directory:$e.Cache,encoding:He.UTF8,recursive:!0});const{uri:b}=await ot.getUri({path:y,directory:$e.Cache});return{fileName:N,uri:b}},C=()=>{const{fileName:N,content:E}=v(),y=new Blob([E],{type:"application/vnd.ms-excel;charset=utf-8;"}),b=URL.createObjectURL(y),g=document.createElement("a");return g.href=b,g.download=N,document.body.appendChild(g),g.click(),setTimeout(()=>{g.remove(),URL.revokeObjectURL(b)},1e3),N},q=async N=>{const E=document.querySelector(N==="export"?"#export-report":"#email-report");E&&(E.disabled=!0,E.textContent=N==="export"?"Exporting...":"Sending...");try{if(N==="export")if($.isNativePlatform()){const y=await f();alert(`Report exported as "${y.fileName}".`)}else{const y=C();alert(`Report saved: ${y}`)}else{const y=await At("report_email")||"";if(!y){alert("Please configure a report email in Settings first.");return}const b=Be(),g=`Laba101 report ${b.from} to ${b.to}`;if($.isNativePlatform()){const L=await f();try{await ca.share({title:g,text:`Please find the attached Laba101 report file: ${L.fileName}`,files:[L.uri],dialogTitle:"Send report via email"}),alert(`Report saved and shared as "${L.fileName}".`)}catch(x){const O=String(x).toLowerCase();if(O.includes("share canceled")||O.includes("canceled"))alert(`Report saved as "${L.fileName}".`);else throw x}}else{const L=C(),x=`Hi,

Please find the attached Laba101 report file: ${L}

Date range: ${b.from} to ${b.to}`,O=`mailto:${y}?subject=${encodeURIComponent(g)}&body=${encodeURIComponent(x)}`;setTimeout(()=>{window.location.href=O},800),alert(`Report downloaded as "${L}".
Your email app will open — please attach the file and send.`)}}}catch(y){alert("Failed: "+String(y))}finally{E&&(E.disabled=!1,E.textContent=N==="export"?"Export Excel":"Send to Email")}};document.querySelector("#export-report")?.addEventListener("click",async()=>{await q("export")}),document.querySelector("#email-report")?.addEventListener("click",async()=>{await q("email")})}function Hn(){document.querySelector("#order-queue-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);o.orderSearch=String(t.get("orderSearch")??"").trim(),o.orderDateFilter=String(t.get("orderDateFilter")??"").trim(),o.orderPaymentFilter=String(t.get("orderPaymentFilter")??"").trim(),S()}),document.querySelector("#order-queue-clear")?.addEventListener("click",()=>{o.orderSearch="",o.orderDateFilter="",o.orderPaymentFilter="",S()}),document.querySelector("#archived-order-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);o.archivedOrderSearch=String(t.get("archivedOrderSearch")??"").trim(),S()}),document.querySelector("#archived-order-clear")?.addEventListener("click",()=>{o.archivedOrderSearch="",S()})}function Wn(){document.querySelector("#customer-search-form")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);o.customerSearch=String(t.get("customerSearch")??"").trim(),S()}),document.querySelector("#customer-search-clear")?.addEventListener("click",()=>{o.customerSearch="",S()})}function Xn(){document.querySelector("#machine-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await Za({machineName:String(t.get("machineName")??""),machineType:String(t.get("machineType")),status:String(t.get("status")),branch:String(t.get("branch")??"")}),await S()}),document.querySelector("#subcleaning-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=e.currentTarget.querySelector('button[type="submit"]');t&&(t.disabled=!0,t.textContent="Starting...");const n=new FormData(e.currentTarget),a=n.getAll("machineIds").map(Number);if(!a.length){alert("Please select at least one machine to clean."),t&&(t.disabled=!1,t.textContent="Start Cleaning");return}await qt({date:String(n.get("date")??""),machineIds:a,cleaningStatus:String(n.get("cleaningStatus")??""),cleaningType:"tube",notes:String(n.get("notes")??""),branch:String(n.get("branch")??"")}),await V("Start tube cleaning",`${a.length} machine(s)`),await S()}),document.querySelector("#confirm-general-cleaning")?.addEventListener("click",async()=>{await nn(document.querySelector('input[name="branch"]')?.value||o.currentUser?.branch||"Main Store",o.currentUser?.name??"Unknown"),await V("Confirm general cleaning",j()),await S()}),document.querySelectorAll(".complete-cleaning-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.machineId),n=e.dataset.branch??"";e.disabled=!0,e.textContent="Completing...",await an(t,n),await V("Complete tube cleaning",`Machine ID ${t}`),await S()})}),document.querySelectorAll(".deactivate-machine-btn, .activate-machine-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.id),n=e.classList.contains("deactivate-machine-btn");await en(t,n?"inactive":"available"),await S()})})}function Gn(e,t){const n=document.querySelector("#inventory-form");n?.addEventListener("submit",async a=>{a.preventDefault();const r=new FormData(a.currentTarget),s=Number(r.get("id")||0);await Qa({id:s||void 0,name:String(r.get("name")??""),unit:String(r.get("unit")??""),quantity:Number(r.get("quantity")??0),reorderLevel:Number(r.get("reorderLevel")??0),notes:String(r.get("notes")??""),branch:t}),await V(s?"Update inventory item":"Create inventory item",String(r.get("name")??"")),await S()}),document.querySelectorAll(".edit-inventory-btn").forEach(a=>{a.addEventListener("click",()=>{const r=e.find(s=>s.id===Number(a.dataset.id));!r||!n||(n.querySelector("[name=id]").value=String(r.id),n.querySelector("[name=name]").value=r.name,n.querySelector("[name=unit]").value=r.unit,n.querySelector("[name=quantity]").value=String(r.quantity),n.querySelector("[name=reorderLevel]").value=String(r.reorderLevel),n.querySelector("[name=notes]").value=r.notes??"",n.scrollIntoView({behavior:"smooth",block:"start"}))})}),document.querySelector("#inventory-movement-form")?.addEventListener("submit",async a=>{a.preventDefault();const r=new FormData(a.currentTarget),s=String(r.get("movementType")??"in")==="out"?"out":"in";try{await za({itemId:Number(r.get("itemId")??0),movementType:s,quantity:Number(r.get("quantity")??0),notes:String(r.get("notes")??""),staffName:o.currentUser?.name??"Unknown",branch:t}),await V(s==="in"?"Stock-in":"Stock-out",`Item ID ${r.get("itemId")} qty ${r.get("quantity")}`),await S()}catch(i){alert(i instanceof Error?i.message:"Stock movement failed.")}})}function Kn(e){const t=document.querySelector("#add-staff-modal"),n=document.querySelector("#open-add-staff-modal"),a=document.querySelector("#close-add-staff-modal"),r=document.querySelector("#staff-form"),s=()=>{r?.reset(),r&&(r.querySelector("[name=id]").value="");const l=document.querySelector("#add-staff-title");l&&(l.textContent="Add staff member"),t?.removeAttribute("hidden")},i=()=>{t?.setAttribute("hidden",""),r?.reset()};n?.addEventListener("click",s),a?.addEventListener("click",i),t?.addEventListener("click",l=>{l.target===t&&i()}),document.querySelectorAll(".edit-staff-btn").forEach(l=>{l.addEventListener("click",()=>{const c=Number(l.dataset.id),d=e.find(u=>u.id===c);if(d&&r){r.querySelector("[name=id]").value=String(d.id),r.querySelector("[name=name]").value=d.name,r.querySelector("[name=email]").value=d.email,r.querySelector("[name=password]").value=d.password,r.querySelector("[name=role]").value=d.role,r.querySelector("[name=branch]").value=d.branch;const u=document.querySelector("#add-staff-title");u&&(u.textContent="Edit staff member"),t?.removeAttribute("hidden")}})}),document.querySelectorAll(".deactivate-staff-btn, .activate-staff-btn").forEach(l=>{l.addEventListener("click",async()=>{const c=Number(l.dataset.id),d=e.find(u=>u.id===c);d&&(await dt(c,{isActive:d.isActive!==0?0:1}),await S())})}),r?.addEventListener("submit",async l=>{l.preventDefault();const c=document.querySelector("#staff-save-btn");c&&(c.disabled=!0,c.textContent="Saving...");const d=new FormData(r),u=d.get("id")?Number(d.get("id")):void 0,m=String(d.get("name")??"").trim(),v=String(d.get("email")??"").trim(),f=String(d.get("password")??"password")||"password",C=String(d.get("role")),q=String(d.get("branch")??"");if(!m||!v){alert("Name and email are required."),c&&(c.disabled=!1,c.textContent="Save staff member");return}try{u?await dt(u,{name:m,email:v,password:f,role:C,branch:q}):await La({name:m,email:v,password:f,role:C,branch:q}),i(),await S()}catch{alert("Failed to save staff. The email may already be in use."),c&&(c.disabled=!1,c.textContent="Save staff member")}})}function Vn(){document.querySelector("#settings-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await Le("branch",String(t.get("branch")??"Main Store")),await Le("fold_rate",String(t.get("foldRate")??"5")),String(t.get("reportEmail")??"")&&await Le("report_email",String(t.get("reportEmail"))),alert("Settings saved successfully!")})}async function Yn(){await wa();const e=localStorage.getItem(Te);if(e)try{const t=JSON.parse(e);if(t.email&&t.remembered){const n=await Lt(t.email,"password")??null;o.currentUser=n}}catch{localStorage.removeItem(Te)}await S()}function Qn(e,t,n,a){const r=e.filter(f=>f.status==="revolving").reduce((f,C)=>f+C.cashAmount,0),s=t.filter(f=>f.type==="add").reduce((f,C)=>f+C.amount,0),i=t.filter(f=>f.type==="disbursement").reduce((f,C)=>f+C.amount,0),l=r+s-i,c=o.revolvingHistoryFrom||"0000-01-01",d=o.revolvingHistoryTo||"9999-12-31",u=t.filter(f=>{const C=X(f.createdAt);return C>=c&&C<=d}),m=e.map(f=>{const C=Ft(f.saleDate,n,a,f.cashAmount),q=f.status==="revolving"?'<span class="ok">Revolving</span>':f.status==="endorsed"?`<span class="warn">Endorsed to ${p(f.endorsedTo)}</span>`:'<span class="meta">Pending</span>',N=f.status!=="revolving"&&f.status!=="endorsed"?`<div class="row-actions">
          <button class="primary revolving-btn" data-id="${f.id}">Revolving</button>
          <button class="secondary endorsed-btn" data-id="${f.id}" data-date="${ve(f.saleDate)}">Endorsed</button>
        </div>`:"";return[`<strong>${p(ve(f.saleDate))}</strong>`,`<strong class="ok">${T(C)}</strong>`,q,f.statusUpdatedAt?p(ve(f.statusUpdatedAt)):"-",N]}),v=u.map(f=>[Ie(f.createdAt),`<strong>${p(f.revolvingNumber)}</strong>`,p(f.name),`<strong class="${f.type==="disbursement"?"warn":"ok"}">${f.type==="disbursement"?"-":"+"}${T(f.amount)}</strong>`,p(f.category),p(f.description||"-"),`<span class="${f.type==="add"?"ok":"warn"}">${f.type==="add"?"Add Revolving Fund":"Disbursement"}</span>`]);return`
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
        ${F("Daily Summary","Cash on hand per day (order cash + manual cash − disbursements)")}
        ${te(["Date of Sales","Cash on Hand","Status","Date Update","Action"],m,"data-table orders-data-table bordered-table")}
      </article>

      <article class="panel">
        ${F("Revolving Table History","Filter by date — DISB numbers shared with Daily Report expenses")}
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
        ${te(["Date","Disbursement #","Name","Amount","Category","Description","Type"],v,"data-table orders-data-table bordered-table")}
      </article>

      ${o.endorseModalOpen?`
        <div class="modal-backdrop" role="presentation">
          <div class="receipt-modal" role="dialog" aria-modal="true" style="max-width: 400px; width: 90%;">
            <form id="endorse-form" class="form" style="padding: 24px;">
              <h3 style="margin-top: 0;">Endorse Money</h3>
              <p class="meta" style="margin-bottom: 16px;">Endorsing cash from <strong>${p(o.endorseSaleDate)}</strong>.</p>
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
  `}function Jn(){document.querySelector("#revolving-history-filters")?.addEventListener("submit",async u=>{u.preventDefault();const m=new FormData(u.currentTarget);o.revolvingHistoryFrom=String(m.get("revolvingHistoryFrom")??"").trim(),o.revolvingHistoryTo=String(m.get("revolvingHistoryTo")??"").trim(),await S()}),document.querySelector("#revolving-history-clear")?.addEventListener("click",async()=>{o.revolvingHistoryFrom="",o.revolvingHistoryTo="",await S()}),document.querySelectorAll(".revolving-btn").forEach(u=>{u.addEventListener("click",async()=>{o.revolvingModalOpen=!0,o.revolvingSaleId=Number(u.dataset.id),await S()})});const e=document.getElementById("confirm-revolving-btn");e&&e.addEventListener("click",async()=>{await yt(o.revolvingSaleId,"revolving",null,new Date().toISOString()),o.revolvingModalOpen=!1,await S()});const t=document.getElementById("close-revolving-modal");t&&t.addEventListener("click",async()=>{o.revolvingModalOpen=!1,await S()}),document.querySelectorAll(".endorsed-btn").forEach(u=>{u.addEventListener("click",async()=>{o.endorseModalOpen=!0,o.endorseSaleId=Number(u.dataset.id),o.endorseSaleDate=u.dataset.date??"",await S()})});const n=document.getElementById("close-endorse-modal");n&&n.addEventListener("click",async()=>{o.endorseModalOpen=!1,await S()});const a=document.getElementById("endorse-form");a&&a.addEventListener("submit",async u=>{u.preventDefault();const m=new FormData(a),v=String(m.get("endorsedTo")??"").trim();v&&(await yt(o.endorseSaleId,"endorsed",v,new Date().toISOString()),o.endorseModalOpen=!1,await S())});const r=document.getElementById("add-revolving-fund-btn");r&&r.addEventListener("click",async()=>{o.addFundModalOpen=!0,await S()});const s=document.getElementById("close-add-fund-modal");s&&s.addEventListener("click",async()=>{o.addFundModalOpen=!1,await S()});const i=document.getElementById("add-fund-form");i&&i.addEventListener("submit",async u=>{u.preventDefault();const m=new FormData(i);await ft({name:String(m.get("name")??"").trim(),amount:Number(m.get("amount")??0),category:"Add Revolving Fund",description:null,type:"add",createdAt:new Date().toISOString()}),o.addFundModalOpen=!1,await S()});const l=document.getElementById("revolving-disbursement-btn");l&&l.addEventListener("click",async()=>{o.disbursementModalOpen=!0,await S()});const c=document.getElementById("close-disbursement-modal");c&&c.addEventListener("click",async()=>{o.disbursementModalOpen=!1,await S()});const d=document.getElementById("disbursement-form");d&&d.addEventListener("submit",async u=>{u.preventDefault();const m=new FormData(d);await ft({name:String(m.get("name")??"").trim(),amount:Number(m.get("amount")??0),category:String(m.get("category")??"").trim(),description:String(m.get("description")??"").trim(),type:"disbursement",expenseDate:j(),createdAt:new Date().toISOString()}),o.disbursementModalOpen=!1,await S()})}Yn();export{He as E,Ge as W,ea as b};
