(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=a(r);fetch(r.href,n)}})();var oe;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(oe||(oe={}));class $e extends Error{constructor(t,a,s){super(t),this.message=t,this.code=a,this.data=s}}const Rt=e=>{var t,a;return e?.androidBridge?"android":!((a=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},Dt=e=>{const t=e.CapacitorCustomPlatform||null,a=e.Capacitor||{},s=a.Plugins=a.Plugins||{},r=()=>t!==null?t.name:Rt(e),n=()=>r()!=="web",i=m=>{const y=l.get(m);return!!(y?.platforms.has(r())||o(m))},o=m=>{var y;return(y=a.PluginHeaders)===null||y===void 0?void 0:y.find(f=>f.name===m)},u=m=>e.console.error(m),l=new Map,d=(m,y={})=>{const f=l.get(m);if(f)return console.warn(`Capacitor plugin "${m}" already registered. Cannot register plugins twice.`),f.proxy;const b=r(),E=o(m);let p;const T=async()=>(!p&&b in y?p=typeof y[b]=="function"?p=await y[b]():p=y[b]:t!==null&&!p&&"web"in y&&(p=typeof y.web=="function"?p=await y.web():p=y.web),p),h=(P,F)=>{var M,_;if(E){const G=E?.methods.find(B=>F===B.name);if(G)return G.rtype==="promise"?B=>a.nativePromise(m,F.toString(),B):(B,g)=>a.nativeCallback(m,F.toString(),B,g);if(P)return(M=P[F])===null||M===void 0?void 0:M.bind(P)}else{if(P)return(_=P[F])===null||_===void 0?void 0:_.bind(P);throw new $e(`"${m}" plugin is not implemented on ${b}`,oe.Unimplemented)}},A=P=>{let F;const M=(..._)=>{const G=T().then(B=>{const g=h(B,P);if(g){const D=g(..._);return F=D?.remove,D}else throw new $e(`"${m}.${P}()" is not implemented on ${b}`,oe.Unimplemented)});return P==="addListener"&&(G.remove=async()=>F()),G};return M.toString=()=>`${P.toString()}() { [capacitor code] }`,Object.defineProperty(M,"name",{value:P,writable:!1,configurable:!1}),M},O=A("addListener"),R=A("removeListener"),U=(P,F)=>{const M=O({eventName:P},F),_=async()=>{const B=await M;R({eventName:P,callbackId:B},F)},G=new Promise(B=>M.then(()=>B({remove:_})));return G.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await _()},G},q=new Proxy({},{get(P,F){switch(F){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return E?U:O;case"removeListener":return R;default:return A(F)}}});return s[m]=q,l.set(m,{name:m,proxy:q,platforms:new Set([...Object.keys(y),...E?[b]:[]])}),q};return a.convertFileSrc||(a.convertFileSrc=m=>m),a.getPlatform=r,a.handleError=u,a.isNativePlatform=n,a.isPluginAvailable=i,a.registerPlugin=d,a.Exception=$e,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},Ot=e=>e.Capacitor=Dt(e),C=Ot(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),re=C.registerPlugin;class qe{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,a){let s=!1;this.listeners[t]||(this.listeners[t]=[],s=!0),this.listeners[t].push(a);const n=this.windowListeners[t];n&&!n.registered&&this.addWindowListener(n),s&&this.sendRetainedArgumentsForEvent(t);const i=async()=>this.removeListener(t,a);return Promise.resolve({remove:i})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,a,s){const r=this.listeners[t];if(!r){if(s){let n=this.retainedEventArguments[t];n||(n=[]),n.push(a),this.retainedEventArguments[t]=n}return}r.forEach(n=>n(a))}hasListeners(t){var a;return!!(!((a=this.listeners[t])===null||a===void 0)&&a.length)}registerWindowListener(t,a){this.windowListeners[a]={registered:!1,windowEventName:t,pluginEventName:a,handler:s=>{this.notifyListeners(a,s)}}}unimplemented(t="not implemented"){return new C.Exception(t,oe.Unimplemented)}unavailable(t="not available"){return new C.Exception(t,oe.Unavailable)}async removeListener(t,a){const s=this.listeners[t];if(!s)return;const r=s.indexOf(a);this.listeners[t].splice(r,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const a=this.retainedEventArguments[t];a&&(delete this.retainedEventArguments[t],a.forEach(s=>{this.notifyListeners(t,s)}))}}const Xe=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Ke=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class Pt extends qe{async getCookies(){const t=document.cookie,a={};return t.split(";").forEach(s=>{if(s.length<=0)return;let[r,n]=s.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");r=Ke(r).trim(),n=Ke(n).trim(),a[r]=n}),a}async setCookie(t){try{const a=Xe(t.key),s=Xe(t.value),r=t.expires?`; expires=${t.expires.replace("expires=","")}`:"",n=(t.path||"/").replace("path=",""),i=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${a}=${s||""}${r}; path=${n}; ${i};`}catch(a){return Promise.reject(a)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const a of t)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}re("CapacitorCookies",{web:()=>new Pt});const xt=async e=>new Promise((t,a)=>{const s=new FileReader;s.onload=()=>{const r=s.result;t(r.indexOf(",")>=0?r.split(",")[1]:r)},s.onerror=r=>a(r),s.readAsDataURL(e)}),It=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(r=>r.toLocaleLowerCase()).reduce((r,n,i)=>(r[n]=e[t[i]],r),{})},qt=(e,t=!0)=>e?Object.entries(e).reduce((s,r)=>{const[n,i]=r;let o,u;return Array.isArray(i)?(u="",i.forEach(l=>{o=t?encodeURIComponent(l):l,u+=`${n}=${o}&`}),u.slice(0,-1)):(o=t?encodeURIComponent(i):i,u=`${n}=${o}`),`${s}&${u}`},"").substr(1):null,Ft=(e,t={})=>{const a=Object.assign({method:e.method||"GET",headers:e.headers},t),r=It(e.headers)["content-type"]||"";if(typeof e.data=="string")a.body=e.data;else if(r.includes("application/x-www-form-urlencoded")){const n=new URLSearchParams;for(const[i,o]of Object.entries(e.data||{}))n.set(i,o);a.body=n.toString()}else if(r.includes("multipart/form-data")||e.data instanceof FormData){const n=new FormData;if(e.data instanceof FormData)e.data.forEach((o,u)=>{n.append(u,o)});else for(const o of Object.keys(e.data))n.append(o,e.data[o]);a.body=n;const i=new Headers(a.headers);i.delete("content-type"),a.headers=i}else(r.includes("application/json")||typeof e.data=="object")&&(a.body=JSON.stringify(e.data));return a};class kt extends qe{async request(t){const a=Ft(t,t.webFetchExtra),s=qt(t.params,t.shouldEncodeUrlParams),r=s?`${t.url}?${s}`:t.url,n=await fetch(r,a),i=n.headers.get("content-type")||"";let{responseType:o="text"}=n.ok?t:{};i.includes("application/json")&&(o="json");let u,l;switch(o){case"arraybuffer":case"blob":l=await n.blob(),u=await xt(l);break;case"json":u=await n.json();break;default:u=await n.text()}const d={};return n.headers.forEach((m,y)=>{d[y]=m}),{data:u,headers:d,status:n.status,url:n.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}re("CapacitorHttp",{web:()=>new kt});var Ge;(function(e){e.Dark="DARK",e.Light="LIGHT",e.Default="DEFAULT"})(Ge||(Ge={}));var Ve;(function(e){e.StatusBar="StatusBar",e.NavigationBar="NavigationBar"})(Ve||(Ve={}));class Ut extends qe{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}re("SystemBars",{web:()=>new Ut});const Mt="modulepreload",_t=function(e){return"/"+e},Ye={},Fe=function(t,a,s){let r=Promise.resolve();if(a&&a.length>0){let u=function(l){return Promise.all(l.map(d=>Promise.resolve(d).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),o=i?.nonce||i?.getAttribute("nonce");r=u(a.map(l=>{if(l=_t(l),l in Ye)return;Ye[l]=!0;const d=l.endsWith(".css"),m=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${m}`))return;const y=document.createElement("link");if(y.rel=d?"stylesheet":Mt,d||(y.as="script"),y.crossOrigin="",y.href=l,o&&y.setAttribute("nonce",o),document.head.appendChild(y),d)return new Promise((f,b)=>{y.addEventListener("load",f),y.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${l}`)))})}))}function n(i){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=i,window.dispatchEvent(o),!o.defaultPrevented)throw i}return r.then(i=>{for(const o of i||[])o.status==="rejected"&&n(o.reason);return t().catch(n)})};function Bt(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,a){return new Proxy({},{get(s,r){return(n,i,o)=>{const u=e.Capacitor.Plugins[a];if(u===void 0){o(new Error(`Capacitor plugin ${a} not found`));return}if(typeof u[r]!="function"){o(new Error(`Method ${r} not found in Capacitor plugin ${a}`));return}(async()=>{try{const l=await u[r](n);i(l)}catch(l){o(l)}})()}}})}})}function jt(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,a){return e.cordova.plugins[a]}})}function Ht(e=!1){typeof window>"u"||(window.CapacitorUtils=window.CapacitorUtils||{},window.Capacitor!==void 0&&!e?Bt(window):window.cordova!==void 0&&jt(window))}var we;(function(e){e.Documents="DOCUMENTS",e.Data="DATA",e.Library="LIBRARY",e.Cache="CACHE",e.External="EXTERNAL",e.ExternalStorage="EXTERNAL_STORAGE",e.ExternalCache="EXTERNAL_CACHE",e.LibraryNoCloud="LIBRARY_NO_CLOUD",e.Temporary="TEMPORARY"})(we||(we={}));var Pe;(function(e){e.UTF8="utf8",e.ASCII="ascii",e.UTF16="utf16"})(Pe||(Pe={}));const Qe=re("Filesystem",{web:()=>Fe(()=>import("./web-WP3cMo-W.js"),[]).then(e=>new e.FilesystemWeb)});Ht();const Wt=re("Share",{web:()=>Fe(()=>import("./web-C4g5lNa7.js"),[]).then(e=>new e.ShareWeb)});class Xt{constructor(t){this.sqlite=t,this._connectionDict=new Map}async initWebStore(){try{return await this.sqlite.initWebStore(),Promise.resolve()}catch(t){return Promise.reject(t)}}async saveToStore(t){try{return await this.sqlite.saveToStore({database:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async saveToLocalDisk(t){try{return await this.sqlite.saveToLocalDisk({database:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getFromLocalDiskToStore(t){const a=t??!0;try{return await this.sqlite.getFromLocalDiskToStore({overwrite:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async echo(t){try{const a=await this.sqlite.echo({value:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isSecretStored(){try{const t=await this.sqlite.isSecretStored();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async setEncryptionSecret(t){try{return await this.sqlite.setEncryptionSecret({passphrase:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async changeEncryptionSecret(t,a){try{return await this.sqlite.changeEncryptionSecret({passphrase:t,oldpassphrase:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async clearEncryptionSecret(){try{return await this.sqlite.clearEncryptionSecret(),Promise.resolve()}catch(t){return Promise.reject(t)}}async checkEncryptionSecret(t){try{const a=await this.sqlite.checkEncryptionSecret({passphrase:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async addUpgradeStatement(t,a){try{return t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.addUpgradeStatement({database:t,upgrade:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async createConnection(t,a,s,r,n){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.createConnection({database:t,encrypted:a,mode:s,version:r,readonly:n});const i=new Je(t,n,this.sqlite),o=n?`RO_${t}`:`RW_${t}`;return this._connectionDict.set(o,i),Promise.resolve(i)}catch(i){return Promise.reject(i)}}async closeConnection(t,a){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.closeConnection({database:t,readonly:a});const s=a?`RO_${t}`:`RW_${t}`;return this._connectionDict.delete(s),Promise.resolve()}catch(s){return Promise.reject(s)}}async isConnection(t,a){const s={};t.endsWith(".db")&&(t=t.slice(0,-3));const r=a?`RO_${t}`:`RW_${t}`;return s.result=this._connectionDict.has(r),Promise.resolve(s)}async retrieveConnection(t,a){t.endsWith(".db")&&(t=t.slice(0,-3));const s=a?`RO_${t}`:`RW_${t}`;if(this._connectionDict.has(s)){const r=this._connectionDict.get(s);return typeof r<"u"?Promise.resolve(r):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async getNCDatabasePath(t,a){try{const s=await this.sqlite.getNCDatabasePath({path:t,database:a});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async createNCConnection(t,a){try{await this.sqlite.createNCConnection({databasePath:t,version:a});const s=new Je(t,!0,this.sqlite),r=`RO_${t})`;return this._connectionDict.set(r,s),Promise.resolve(s)}catch(s){return Promise.reject(s)}}async closeNCConnection(t){try{await this.sqlite.closeNCConnection({databasePath:t});const a=`RO_${t})`;return this._connectionDict.delete(a),Promise.resolve()}catch(a){return Promise.reject(a)}}async isNCConnection(t){const a={},s=`RO_${t})`;return a.result=this._connectionDict.has(s),Promise.resolve(a)}async retrieveNCConnection(t){if(this._connectionDict.has(t)){const a=`RO_${t})`,s=this._connectionDict.get(a);return typeof s<"u"?Promise.resolve(s):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async isNCDatabase(t){try{const a=await this.sqlite.isNCDatabase({databasePath:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async retrieveAllConnections(){return this._connectionDict}async closeAllConnections(){const t=new Map;try{for(const a of this._connectionDict.keys()){const s=a.substring(3),r=a.substring(0,3)==="RO_";await this.sqlite.closeConnection({database:s,readonly:r}),t.set(a,null)}for(const a of t.keys())this._connectionDict.delete(a);return Promise.resolve()}catch(a){return Promise.reject(a)}}async checkConnectionsConsistency(){try{const t=[...this._connectionDict.keys()],a=[],s=[];for(const n of t)a.push(n.substring(0,2)),s.push(n.substring(3));const r=await this.sqlite.checkConnectionsConsistency({dbNames:s,openModes:a});return r.result||(this._connectionDict=new Map),Promise.resolve(r)}catch(t){return this._connectionDict=new Map,Promise.reject(t)}}async importFromJson(t){try{const a=await this.sqlite.importFromJson({jsonstring:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isJsonValid(t){try{const a=await this.sqlite.isJsonValid({jsonstring:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async copyFromAssets(t){const a=t??!0;try{return await this.sqlite.copyFromAssets({overwrite:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async getFromHTTPRequest(t,a){const s=a??!0;try{return await this.sqlite.getFromHTTPRequest({url:t,overwrite:s}),Promise.resolve()}catch(r){return Promise.reject(r)}}async isDatabaseEncrypted(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const a=await this.sqlite.isDatabaseEncrypted({database:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isInConfigEncryption(){try{const t=await this.sqlite.isInConfigEncryption();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isInConfigBiometricAuth(){try{const t=await this.sqlite.isInConfigBiometricAuth();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isDatabase(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const a=await this.sqlite.isDatabase({database:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async getDatabaseList(){try{const a=(await this.sqlite.getDatabaseList()).values;a.sort();const s={values:a};return Promise.resolve(s)}catch(t){return Promise.reject(t)}}async getMigratableDbList(t){const a=t||"default";try{const s=await this.sqlite.getMigratableDbList({folderPath:a});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async addSQLiteSuffix(t,a){const s=t||"default",r=a||[];try{const n=await this.sqlite.addSQLiteSuffix({folderPath:s,dbNameList:r});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async deleteOldDatabases(t,a){const s=t||"default",r=a||[];try{const n=await this.sqlite.deleteOldDatabases({folderPath:s,dbNameList:r});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async moveDatabasesAndAddSuffix(t,a){const s=t||"default",r=a||[];return this.sqlite.moveDatabasesAndAddSuffix({folderPath:s,dbNameList:r})}}class Je{constructor(t,a,s){this.dbName=t,this.readonly=a,this.sqlite=s}getConnectionDBName(){return this.dbName}getConnectionReadOnly(){return this.readonly}async open(){try{return await this.sqlite.open({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async close(){try{return await this.sqlite.close({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async beginTransaction(){try{const t=await this.sqlite.beginTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async commitTransaction(){try{const t=await this.sqlite.commitTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async rollbackTransaction(){try{const t=await this.sqlite.rollbackTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTransactionActive(){try{const t=await this.sqlite.isTransactionActive({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async loadExtension(t){try{return await this.sqlite.loadExtension({database:this.dbName,path:t,readonly:this.readonly}),Promise.resolve()}catch(a){return Promise.reject(a)}}async enableLoadExtension(t){try{return await this.sqlite.enableLoadExtension({database:this.dbName,toggle:t,readonly:this.readonly}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getUrl(){try{const t=await this.sqlite.getUrl({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getVersion(){try{const t=await this.sqlite.getVersion({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getTableList(){try{const t=await this.sqlite.getTableList({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async execute(t,a=!0,s=!0){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const r=await this.sqlite.execute({database:this.dbName,statements:t,transaction:a,readonly:!1,isSQL92:s});return Promise.resolve(r)}}catch(r){return Promise.reject(r)}}async query(t,a,s=!0){let r;try{return a&&a.length>0?r=await this.sqlite.query({database:this.dbName,statement:t,values:a,readonly:this.readonly,isSQL92:!0}):r=await this.sqlite.query({database:this.dbName,statement:t,values:[],readonly:this.readonly,isSQL92:s}),r=await this.reorderRows(r),Promise.resolve(r)}catch(n){return Promise.reject(n)}}async run(t,a,s=!0,r="no",n=!0){let i;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(a&&a.length>0?i=await this.sqlite.run({database:this.dbName,statement:t,values:a,transaction:s,readonly:!1,returnMode:r,isSQL92:!0}):i=await this.sqlite.run({database:this.dbName,statement:t,values:[],transaction:s,readonly:!1,returnMode:r,isSQL92:n}),i.changes=await this.reorderRows(i.changes),Promise.resolve(i))}catch(o){return Promise.reject(o)}}async executeSet(t,a=!0,s="no",r=!0){let n;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(n=await this.sqlite.executeSet({database:this.dbName,set:t,transaction:a,readonly:!1,returnMode:s,isSQL92:r}),n.changes=await this.reorderRows(n.changes),Promise.resolve(n))}catch(i){return Promise.reject(i)}}async isExists(){try{const t=await this.sqlite.isDBExists({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTable(t){try{const a=await this.sqlite.isTableExists({database:this.dbName,table:t,readonly:this.readonly});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isDBOpen(){try{const t=await this.sqlite.isDBOpen({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async delete(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteDatabase({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async createSyncTable(){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const t=await this.sqlite.createSyncTable({database:this.dbName,readonly:!1});return Promise.resolve(t)}}catch(t){return Promise.reject(t)}}async setSyncDate(t){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.setSyncDate({database:this.dbName,syncdate:t,readonly:!1}),Promise.resolve())}catch(a){return Promise.reject(a)}}async getSyncDate(){try{const t=await this.sqlite.getSyncDate({database:this.dbName,readonly:this.readonly});let a="";return t.syncDate>0&&(a=new Date(t.syncDate*1e3).toISOString()),Promise.resolve(a)}catch(t){return Promise.reject(t)}}async exportToJson(t,a=!1){try{const s=await this.sqlite.exportToJson({database:this.dbName,jsonexportmode:t,readonly:this.readonly,encrypted:a});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async deleteExportedRows(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteExportedRows({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async executeTransaction(t,a=!0){let s=0,r=!1;if(this.readonly)return Promise.reject("not allowed in read-only mode");if(await this.sqlite.beginTransaction({database:this.dbName}),r=await this.sqlite.isTransactionActive({database:this.dbName}),!r)return Promise.reject("After Begin Transaction, no transaction active");try{for(const o of t){if(typeof o!="object"||!("statement"in o))throw new Error("Error a task.statement must be provided");if("values"in o&&o.values&&o.values.length>0){const u=o.statement.toUpperCase().includes("RETURNING")?"all":"no",l=await this.sqlite.run({database:this.dbName,statement:o.statement,values:o.values,transaction:!1,readonly:!1,returnMode:u,isSQL92:a});if(l.changes.changes<0)throw new Error("Error in transaction method run ");s+=l.changes.changes}else{const u=await this.sqlite.execute({database:this.dbName,statements:o.statement,transaction:!1,readonly:!1});if(u.changes.changes<0)throw new Error("Error in transaction method execute ");s+=u.changes.changes}}const n=await this.sqlite.commitTransaction({database:this.dbName});s+=n.changes.changes;const i={changes:{changes:s}};return Promise.resolve(i)}catch(n){const i=n.message?n.message:n;return await this.sqlite.rollbackTransaction({database:this.dbName}),Promise.reject(i)}}async reorderRows(t){const a=t;if(t?.values&&typeof t.values[0]=="object"&&Object.keys(t.values[0]).includes("ios_columns")){const s=t.values[0].ios_columns,r=[];for(let n=1;n<t.values.length;n++){const i=t.values[n],o={};for(const u of s)o[u]=i[u];r.push(o)}a.values=r}return Promise.resolve(a)}}const Kt=re("CapacitorSQLite",{web:()=>Fe(()=>import("./web-DpPqEkqs.js"),[]).then(e=>new e.CapacitorSQLiteWeb),electron:()=>window.CapacitorCustomPlatform.plugins.CapacitorSQLite});function Gt(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}const Vt="laba101_offline",Te="fresh_start_reset_v1",Yt=new Xt(Kt);let ge=null;const K=[{id:1,name:"Laba101 Admin",email:"admin@laba101.test",password:"password",role:"admin",branch:"Main Store"},{id:2,name:"Gensan Branch Staff",email:"staff@laba101.gensan",password:"password",role:"staff",branch:"Gensan Branch"}],Ne=[],Y=[V(1,"Drop-off","P185. Includes wash, dry, and fold.","Drop-Off","order",185,8,40,["Wash","Dry","Fold"],0,24),V(2,"Full Service","P200. Wash, Fabcon, detergent, dry, and fold.","Full Service","order",200,8,40,["Wash","Dry","Fold","Detergent","Fabcon"],0,24),V(3,"Self Service Wash","P60. Self-service wash (max 8kg per load).","Self Service","order",60,8,null,["Wash"],0,1),V(4,"Self Service Dry","P70. Self-service dry (40 mins).","Self Service","order",70,8,40,["Dry"],0,1),V(6,"Dry 10 mins","Additional drying time (10 mins).","Add-on","addon",30,8,10,["Dry"],0,1),V(7,"Dry 20 mins","Additional drying time (20 mins).","Add-on","addon",50,8,20,["Dry"],0,1),V(8,"Dry 40 mins","Additional drying time (40 mins).","Add-on","addon",70,8,40,["Dry"],0,1),V(9,"Additional Zonrox","Extra Zonrox bleach add-on per load.","Add-on","addon",25,0,null,["Zonrox"],0,0),V(10,"Additional Fabcon","Extra Fabcon fabric conditioner add-on per load.","Add-on","addon",25,0,null,["Fabcon"],0,0)],ee=[{id:1,name:"Regular Clothes",maxKg:8,additionalFee:0,isActive:1},{id:2,name:"Comforter",maxKg:4,additionalFee:0,isActive:1},{id:3,name:"Thin Blankets",maxKg:6,additionalFee:0,isActive:1},{id:4,name:"Bedsheets",maxKg:6,additionalFee:0,isActive:1},{id:5,name:"Bath Towels",maxKg:6,additionalFee:0,isActive:1},{id:6,name:"Curtains",maxKg:6,additionalFee:0,isActive:1}];function ze(e,t){const a=L(e,[]),s=new Map(a.map(n=>[n.id,n])),r=t.map(n=>{const i=s.get(n.id);return i?{...n,...i,isActive:i.isActive??n.isActive}:n});(a.length!==r.length||r.some((n,i)=>n.id!==a[i]?.id||JSON.stringify(n)!==JSON.stringify(a[i])))&&w(e,r)}async function Qt(){ze("services",Y),ze("item_categories",ee)}async function Le(e){for(const t of Y)((await e.query("SELECT id FROM laundry_services WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive,t.id]):await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive]);for(const t of ee)((await e.query("SELECT id FROM item_categories WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.maxKg,t.additionalFee,t.isActive,t.id]):await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[t.id,t.name,t.maxKg,t.additionalFee,t.isActive])}const te=[],ce=[],se=[],le=[],de=[],Q=[...[1,2,3,4].map(e=>({id:e,machineName:`Washer ${e}`,machineType:"washer",status:"available",branch:"Main Store"})),...[1,2,3,4].map(e=>({id:e+4,machineName:`Dryer ${e}`,machineType:"dryer",status:"available",branch:"Main Store"}))],ue=[{key:"branch",value:"Main Store"},{key:"fold_rate",value:"5"},{key:"report_email",value:"admin@laba101.test"}];function V(e,t,a,s,r,n,i,o,u,l,d){return{id:e,name:t,description:a,category:s,serviceType:r,price:n,maxKg:i,dryingMinutes:o,includes:u,additionalCharge:l,turnaroundHours:d,isActive:1}}function j(e){return`laba101-mobile-${e}`}function L(e,t){const a=localStorage.getItem(j(e));if(!a)return structuredClone(t);try{return JSON.parse(a)}catch{return structuredClone(t)}}function w(e,t){localStorage.setItem(j(e),JSON.stringify(t))}function H(e){return e.reduce((t,a)=>Math.max(t,a.id),0)+1}function ae(){return new Date().toISOString()}function xe(e=new Date){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${s}`}function Jt(){return xe().slice(2).replaceAll("-","")}function z(e,t){if(!e)return t;try{return JSON.parse(e)}catch{return t}}async function $(){return ge||(ge=await Yt.createConnection(Vt,!1,"no-encryption",1,!1),await ge.open()),ge}async function I(e,t,a,s){((await e.query(`PRAGMA table_info(${t})`)).values??[]).some(i=>i.name===a)||await e.execute(`ALTER TABLE ${t} ADD COLUMN ${a} ${s}`)}function zt(){const e=L("staff",K),t=new Map(e.map(s=>[s.id,s]));let a=!1;for(const s of K){const r=t.get(s.id);if(!r){t.set(s.id,{...s,isActive:1}),a=!0;continue}const n={...r,name:s.name,email:s.email,password:s.password,role:s.role,branch:s.branch,isActive:1};JSON.stringify(n)!==JSON.stringify(r)&&(t.set(s.id,n),a=!0)}a&&w("staff",Array.from(t.values()).sort((s,r)=>s.id-r.id))}async function Zt(){localStorage.getItem(j(Te))||(w("staff",K),w("customers",[]),w("orders",[]),w("payments",[]),w("fold_logs",[]),w("expenses",[]),w("sales",[]),localStorage.getItem(j("services"))||w("services",Y),localStorage.getItem(j("item_categories"))||w("item_categories",ee),localStorage.getItem(j("machines"))||w("machines",Q),localStorage.getItem(j("subcleanings"))||w("subcleanings",[]),localStorage.getItem(j("settings"))||w("settings",ue),localStorage.removeItem("laba101-mobile-session"),w(Te,!0))}async function dt(e){for(const t of K){if(((await e.query("SELECT id FROM staff WHERE id = ?",[t.id])).values??[]).length>0){await e.run("UPDATE staff SET name = ?, email = ?, password = ?, role = ?, branch = ?, isActive = 1 WHERE id = ?",[t.name,t.email,t.password,t.role,t.branch,t.id]);continue}await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.email,t.password,t.role,t.branch,1])}}async function ea(e){if(!(((await e.query("SELECT COUNT(*) as count FROM machines")).values?.[0]?.count??0)>0))for(const a of Q)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[a.id,a.machineName,a.machineType,a.status,a.branch])}async function ta(e){for(const t of ue)await e.run("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)",[t.key,t.value])}async function ut(e){for(const t of Y)((await e.query("SELECT id FROM laundry_services WHERE id = ?",[t.id])).values??[]).length>0||await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive]);for(const t of ee)((await e.query("SELECT id FROM item_categories WHERE id = ?",[t.id])).values??[]).length>0||await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[t.id,t.name,t.maxKg,t.additionalFee,t.isActive])}async function aa(e){((await e.query("SELECT value FROM settings WHERE key = ?",[Te])).values??[]).length>0||(await e.execute(`
    DELETE FROM payments;
    DELETE FROM orders;
    DELETE FROM customers;
    DELETE FROM fold_logs;
    DELETE FROM disbursement_expenses;
    DELETE FROM daily_sales;
    DELETE FROM revolving_history;
    DELETE FROM staff WHERE id NOT IN (1, 2);
  `),await dt(e),await ut(e),await ea(e),await ta(e),await e.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",[Te,ae()]),localStorage.removeItem("laba101-mobile-session"))}async function sa(){if(!C.isNativePlatform()){await Zt(),!localStorage.getItem(j("seeded_v4"))&&!localStorage.getItem(j("services"))&&!localStorage.getItem(j("staff"))&&(w("staff",K),w("customers",Ne),w("services",Y),w("item_categories",ee),w("orders",te),w("payments",ce),w("fold_logs",[]),w("expenses",se),w("sales",le),w("revolving_history",de),w("machines",Q),w("subcleanings",[]),w("settings",ue),w("seeded_v4",!0)),await Qt(),zt(),localStorage.getItem(j("seeded_v4"))||w("seeded_v4",!0);return}const e=await $();await e.execute(`
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
  `),await I(e,"staff","email","TEXT"),await I(e,"staff","password","TEXT"),await I(e,"staff","role","TEXT"),await I(e,"staff","isActive","INTEGER NOT NULL DEFAULT 1"),await e.run('UPDATE staff SET password = ? WHERE password IS NULL OR password = ""',["password"]),await e.run('UPDATE staff SET role = ? WHERE role IS NULL OR role = ""',["staff"]),await I(e,"orders","customerId","INTEGER NOT NULL DEFAULT 0"),await I(e,"orders","phone","TEXT"),await I(e,"orders","serviceId","INTEGER NOT NULL DEFAULT 0"),await I(e,"orders","serviceLines","TEXT"),await I(e,"orders","itemCategoryId","INTEGER NOT NULL DEFAULT 0"),await I(e,"orders","itemCategory",'TEXT NOT NULL DEFAULT "Regular Clothes"'),await I(e,"orders","workflowCompleted","TEXT"),await I(e,"orders","weightKg","REAL NOT NULL DEFAULT 0"),await I(e,"orders","price","REAL NOT NULL DEFAULT 0"),await I(e,"orders","additionalCharge","REAL NOT NULL DEFAULT 0"),await I(e,"orders","extraServiceAmount","REAL NOT NULL DEFAULT 0"),await I(e,"orders","totalAmount","REAL NOT NULL DEFAULT 0"),await I(e,"orders","paidAmount","REAL NOT NULL DEFAULT 0"),await I(e,"orders","extras","TEXT"),await I(e,"orders","notes","TEXT"),await I(e,"orders","dueAt","TEXT"),await I(e,"orders","createdAt",'TEXT NOT NULL DEFAULT ""'),await I(e,"daily_sales","saleNumber","TEXT"),await I(e,"daily_sales","status","TEXT"),await I(e,"daily_sales","endorsedTo","TEXT"),await I(e,"daily_sales","statusUpdatedAt","TEXT");const a=((await e.query("SELECT COUNT(*) as count FROM staff")).values?.[0]?.count??0)===0;if(a){for(const s of K)await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[s.id,s.name,s.email,s.password,s.role,s.branch,1]);for(const s of Ne)await e.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[s.id,s.name,s.phone,s.address]);for(const s of Y)await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[s.id,s.name,s.description,s.category,s.serviceType,s.price,s.maxKg,s.dryingMinutes,JSON.stringify(s.includes),s.additionalCharge,s.turnaroundHours,s.isActive]);for(const s of ee)await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[s.id,s.name,s.maxKg,s.additionalFee,s.isActive]);for(const s of te)await mt(e,s);for(const s of ce)await e.run("INSERT INTO payments (id, orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?, ?)",[s.id,s.orderId,s.amount,s.method,s.reference,s.receivedAt,s.branch]);for(const s of se)await e.run("INSERT INTO disbursement_expenses (id, expenseDate, number, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?, ?)",[s.id,s.expenseDate,s.number,s.name,s.category,s.description,s.amount]);for(const s of le)await e.run("INSERT INTO daily_sales (id, saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?, ?)",[s.id,s.saleDate,s.saleNumber,s.cashAmount,s.gcashAmount,s.totalAmount,s.notes]);for(const s of de)await e.run("INSERT INTO revolving_history (id, revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[s.id,s.revolvingNumber,s.name,s.amount,s.category,s.description,s.type,s.createdAt]);for(const s of Q)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[s.id,s.machineName,s.machineType,s.status,s.branch]);for(const s of ue)await e.run("INSERT INTO settings (key, value) VALUES (?, ?)",[s.key,s.value]);await e.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",["fresh_install_defaults",ae()])}await Le(e),await dt(e),a||await ut(e),await aa(e)}async function mt(e,t){await e.run("INSERT INTO orders (id, ticket, customerId, customer, phone, serviceId, service, serviceLines, itemCategoryId, itemCategory, branch, status, workflowCompleted, weightKg, price, additionalCharge, extraServiceAmount, totalAmount, paidAmount, extras, notes, foldedBy, dueAt, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.ticket,t.customerId,t.customer,t.phone,t.serviceId,t.service,JSON.stringify(t.serviceLines??[]),t.itemCategoryId,t.itemCategory,t.branch,t.status,JSON.stringify(t.workflowCompleted),t.weightKg,t.price,t.additionalCharge,t.extraServiceAmount,t.totalAmount,t.paidAmount,JSON.stringify(t.extras),t.notes,t.foldedBy,t.dueAt,t.createdAt])}function ra(e){const t=Number(e.paidAmount??0),a=Number(e.totalAmount??0),s=Number(e.foldedBy),r=z(e.serviceLines,[]),n=Number(e.serviceId),i=String(e.service),o=Number(e.price);return{id:Number(e.id),ticket:String(e.ticket),customerId:Number(e.customerId),customer:String(e.customer),phone:e.phone?String(e.phone):null,serviceId:n,service:i,serviceLines:r.length?r:[{id:n,name:i,price:o,quantity:1,total:o}],itemCategoryId:Number(e.itemCategoryId),itemCategory:String(e.itemCategory),branch:String(e.branch),status:String(e.status),workflowCompleted:z(e.workflowCompleted,[]),weightKg:Number(e.weightKg),price:o,additionalCharge:Number(e.additionalCharge),extraServiceAmount:Number(e.extraServiceAmount),totalAmount:a,paidAmount:t,balance:Number((a-t).toFixed(2)),extras:z(e.extras,[]),notes:e.notes?String(e.notes):null,foldedBy:Number.isFinite(s)&&s>0?s:null,foldedByName:e.foldedByName?String(e.foldedByName):null,dueAt:String(e.dueAt),createdAt:String(e.createdAt)}}async function na(){await sa()}async function ve(){return(await ke()).find(t=>t.key==="branch")?.value??"Main Store"}async function ia(){const e=await ke();return Number(e.find(t=>t.key==="fold_rate")?.value??"5")}async function vt(e){return(await ke()).find(a=>a.key===e)?.value}async function ke(){return C.isNativePlatform()?(await(await $()).query("SELECT key, value FROM settings ORDER BY key")).values??[]:L("settings",ue)}async function Se(e,t){if(!C.isNativePlatform()){const s=L("settings",ue).filter(r=>r.key!==e);s.push({key:e,value:t}),w("settings",s);return}await(await $()).run("REPLACE INTO settings (key, value) VALUES (?, ?)",[e,t])}async function oa(e){return C.isNativePlatform()?(await(await $()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff WHERE branch = ? ORDER BY name ASC',[e])).values??[]:L("staff",K).filter(s=>s.branch===e)}async function pt(){return C.isNativePlatform()?(await(await $()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff ORDER BY name ASC')).values??[]:L("staff",K)}async function ft(e,t){const a=e.trim().toLowerCase();return(await pt()).find(r=>r.email.toLowerCase()===a&&r.password===t&&r.isActive!==0)??null}async function ca(e){if(!C.isNativePlatform()){const a=L("staff",K);a.unshift({id:H(a),...e,isActive:1}),w("staff",a);return}await(await $()).run("INSERT INTO staff (name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?)",[e.name,e.email,e.password,e.role,e.branch,1])}async function Ze(e,t){if(!C.isNativePlatform()){const n=L("staff",K),i=n.find(o=>o.id===e);i&&(Object.assign(i,t),w("staff",n));return}const a=await $(),s=[],r=[];for(const[n,i]of Object.entries(t))n!=="id"&&(s.push(`${n} = ?`),r.push(i));s.length&&(r.push(e),await a.run(`UPDATE staff SET ${s.join(", ")} WHERE id = ?`,r))}async function la(){return C.isNativePlatform()?(await(await $()).query("SELECT id, name, phone, address FROM customers ORDER BY name ASC")).values??[]:L("customers",Ne).sort((a,s)=>a.name.localeCompare(s.name))}async function da(e){if(!C.isNativePlatform()){const r=L("customers",Ne),n=e.id?r.find(o=>o.id===e.id):r.find(o=>o.name.toLowerCase()===e.name.toLowerCase()&&(e.phone?o.phone===e.phone:!0));if(n)return n.name=e.name,n.phone=e.phone??n.phone,n.address=e.address??n.address,w("customers",r),n;const i={id:H(r),name:e.name,phone:e.phone??null,address:e.address??null};return r.push(i),w("customers",r),i}const t=await $();if(e.id)return await t.run("UPDATE customers SET name = ?, phone = ?, address = ? WHERE id = ?",[e.name,e.phone??null,e.address??null,e.id]),{id:e.id,name:e.name,phone:e.phone??null,address:e.address??null};const a=await t.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM customers"),s=Number((a.values?.[0]).id);return await t.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[s,e.name,e.phone??null,e.address??null]),{id:s,name:e.name,phone:e.phone??null,address:e.address??null}}async function Ue(e){if(!C.isNativePlatform())return L("services",Y).filter(s=>!0);const t=await $(),a=await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[]);return(a.values??[]).length===0?(await Le(t),((await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[])).values??[]).map(r=>({...r,includes:z(r.includes,[])}))):(a.values??[]).map(s=>({...s,includes:z(s.includes,[])}))}async function ua(){if(!C.isNativePlatform())return L("services",Y);const e=await $(),t=await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC");return(t.values??[]).length===0?(await Le(e),((await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC")).values??[]).map(s=>({...s,includes:z(s.includes,[])}))):(t.values??[]).map(a=>({...a,includes:z(a.includes,[])}))}async function et(e){if(!C.isNativePlatform()){const a=L("services",Y),s=e.id?a.find(r=>r.id===e.id):null;s?Object.assign(s,e):a.unshift({...e,id:H(a)}),w("services",a);return}const t=await $();e.id?await t.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = ? WHERE id = ?",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive,e.id]):await t.run("INSERT INTO laundry_services (name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive])}async function yt(){if(!C.isNativePlatform())return L("item_categories",ee).filter(a=>a.isActive);const e=await $(),t=await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC");return(t.values??[]).length===0?(await Le(e),(await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC")).values??[]):t.values??[]}async function ma(e){if(!C.isNativePlatform()){const a=L("item_categories",ee),s=e.id?a.find(r=>r.id===e.id):null;s?Object.assign(s,e):a.unshift({...e,id:H(a)}),w("item_categories",a);return}const t=await $();e.id?await t.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = ? WHERE id = ?",[e.name,e.maxKg,e.additionalFee,e.isActive,e.id]):await t.run("INSERT INTO item_categories (name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?)",[e.name,e.maxKg,e.additionalFee,e.isActive])}function Ie(e,t,a,s){const r=(Array.isArray(e)?e:[e]).map(y=>{const f=Math.max(0,Number(y.quantity??1)),b=Number(y.price);return{id:y.id,name:y.name,price:b,quantity:f,total:Number((b*f).toFixed(2))}}).filter(y=>y.quantity>0),n=Number(t.maxKg),i=0,o=0,u=s.map(y=>{const f=Math.max(0,Number(y.quantity??1)),b=Number(y.price);return{id:y.id,name:Gt(y.name),price:b,quantity:f,total:Number((b*f).toFixed(2))}}).filter(y=>y.quantity>0),l=r.reduce((y,f)=>y+f.total,0),d=u.reduce((y,f)=>y+f.total,0),m=Number((l+o+d).toFixed(2));return{price:Number(l.toFixed(2)),additionalCharge:Number(o.toFixed(2)),extraServiceAmount:Number(d.toFixed(2)),totalAmount:m,allowedKg:n,extraKg:Number(i.toFixed(2)),warning:null,serviceLines:r,extras:u}}function ht(e,t){const a=e.serviceLines?.length?e.serviceLines.map(i=>i.id):[e.serviceId],s=t.filter(i=>a.includes(i.id)),r=Array.from(new Set(s.flatMap(i=>i.includes??[]))),n=[{key:"received",label:"Received"}];return r.includes("Wash")&&n.push({key:"wash",label:"Wash"}),e.extras.length&&n.push({key:"extras",label:"Extra services"}),(r.includes("Dry")||s.some(i=>(i.dryingMinutes??0)>0))&&n.push({key:"dry",label:"Dry"}),r.includes("Fold")&&n.push({key:"fold",label:"Fold"}),n.push({key:"ready",label:"Ready"},{key:"claimed",label:"Claimed"}),n}function va(e){return e.includes("claimed")?"claimed":e.includes("ready")?"ready":e.includes("dry")?"drying":e.includes("extras")||e.includes("wash")?"washing":"received"}async function pe(e){return C.isNativePlatform()?((await(await $()).query("SELECT o.*, s.name as foldedByName FROM orders o LEFT JOIN staff s ON s.id = o.foldedBy WHERE o.branch = ? ORDER BY o.id DESC",[e])).values??[]).map(s=>ra(s)):L("orders",te).filter(s=>s.branch===e).map(s=>({...s,serviceLines:s.serviceLines??[{id:s.serviceId,name:s.service,price:Number(s.price),quantity:1,total:Number(s.price)}],balance:Number((s.totalAmount-s.paidAmount).toFixed(2))}))}async function pa(e){const[t,a]=await Promise.all([Ue(),yt()]),s=e.serviceQuantities??(e.serviceId?{[e.serviceId]:1}:{}),r=t.filter(h=>h.serviceType==="order"&&Number(s[h.id]??0)>0).map(h=>({...h,quantity:Number(s[h.id]??0)})),n=r[0],i=a.find(h=>h.id===e.itemCategoryId)??a.find(h=>h.name.toLowerCase()===(n?.category??"").toLowerCase())??a.find(h=>h.name==="Regular Clothes")??a[0];if(!r.length||!n||!i)throw new Error("Please select at least one service.");const o=e.addonQuantities??Object.fromEntries((e.addonIds??[]).map(h=>[h,1])),u=t.filter(h=>h.serviceType==="addon"&&Number(o[h.id]??0)>0).map(h=>({...h,quantity:Number(o[h.id]??0)})),l=e.weightKg??Math.max(1,Number(i.maxKg||n.maxKg||1)),d=Ie(r,i,l,u),m=await da({id:e.customerId||void 0,name:e.customerName,phone:e.customerPhone??null}),y=Math.max(0,e.paidAmount),f=Math.min(d.totalAmount,y),b={ticket:await fa(),customerId:m.id,customer:m.name,phone:m.phone,serviceId:n.id,service:d.serviceLines.map(h=>`${h.name} x${h.quantity}`).join(", "),serviceLines:d.serviceLines,itemCategoryId:i.id,itemCategory:i.name,branch:e.branch,status:"received",workflowCompleted:["received"],weightKg:l,price:d.price,additionalCharge:d.additionalCharge,extraServiceAmount:d.extraServiceAmount,totalAmount:d.totalAmount,paidAmount:f,balance:Number((d.totalAmount-f).toFixed(2)),extras:d.extras,notes:e.notes||null,foldedBy:null,foldedByName:null,dueAt:new Date(Date.now()+Math.max(...r.map(h=>h.turnaroundHours))*60*60*1e3).toISOString(),createdAt:ae()};if(!C.isNativePlatform()){const h=L("orders",te),A={...b,id:H(h)};return h.unshift(A),w("orders",h),y>0&&await gt(A.id,{amount:y,method:e.paymentMethod,reference:e.paymentReference??null}),A}const E=await $(),p=await E.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM orders"),T={...b,id:Number((p.values?.[0]).id)};return await mt(E,T),y>0&&await E.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[T.id,y,e.paymentMethod,e.paymentReference??null,ae(),e.branch]),T}async function fa(){const e=`LB${Jt()}`,t=await ve(),s=(await pe(t)).filter(n=>n.ticket.startsWith(e)).sort((n,i)=>i.ticket.localeCompare(n.ticket))[0],r=s?Number(s.ticket.slice(-3))+1:1;return`${e}-${String(r).padStart(3,"0")}`}async function ya(e,t){const a=await ve(),[s,r]=await Promise.all([pe(a),Ue()]),n=s.find(l=>l.id===e);if(!n)return;const o=ht(n,r).map(l=>l.key).find(l=>!n.workflowCompleted.includes(l));if(!o)return;if(n.workflowCompleted=[...n.workflowCompleted,o],n.status=va(n.workflowCompleted),o==="fold"&&t&&(n.foldedBy=t),!C.isNativePlatform()){const l=L("orders",te),d=l.find(m=>m.id===n.id);d&&Object.assign(d,n),w("orders",l);return}await(await $()).run("UPDATE orders SET workflowCompleted = ?, status = ?, foldedBy = ? WHERE id = ?",[JSON.stringify(n.workflowCompleted),n.status,n.foldedBy,n.id])}async function gt(e,t){const a=await ve();if(!(await pe(a)).find(o=>o.id===e))return;const n=Math.max(0,t.amount);if(n<=0)return;if(!C.isNativePlatform()){const o=L("payments",ce);o.unshift({id:H(o),orderId:e,amount:n,method:t.method,reference:t.reference??null,receivedAt:ae(),branch:a}),w("payments",o);const u=L("orders",te),l=u.find(d=>d.id===e);l&&(l.paidAmount=Math.min(l.totalAmount,Number((l.paidAmount+n).toFixed(2)))),w("orders",u);return}const i=await $();await i.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[e,n,t.method,t.reference??null,ae(),a]),await i.run("UPDATE orders SET paidAmount = MIN(totalAmount, paidAmount + ?) WHERE id = ?",[n,e])}async function ha(e){return C.isNativePlatform()?(await(await $()).query("SELECT id, orderId, amount, method, reference, receivedAt, branch FROM payments  ORDER BY receivedAt DESC",[])).values??[]:L("payments",ce).filter(s=>!0)}async function ga(e){const t=await ve(),s=(await pe(t)).find(n=>n.id===e);if(!s)return;if(s.paidAmount>0)throw new Error("Cancel is only allowed for unpaid orders. Use Delete (admin) to refund paid orders.");if(!C.isNativePlatform()){const n=L("orders",te),i=L("payments",ce),o=L("fold_logs",[]),u=n.filter(m=>m.id!==e),l=i.filter(m=>m.orderId!==e),d=o.filter(m=>m.orderTicket!==s.ticket);w("orders",u),w("payments",l),w("fold_logs",d);return}const r=await $();await r.run("DELETE FROM payments WHERE orderId = ?",[e]),await r.run("DELETE FROM fold_logs WHERE orderTicket = ?",[s.ticket]),await r.run("DELETE FROM orders WHERE id = ?",[e])}async function ba(e){const t=await ve(),s=(await pe(t)).find(n=>n.id===e);if(!s)return;if(s.paidAmount<=0)throw new Error("Delete (refund) is only allowed for paid orders.");if(!C.isNativePlatform()){const n=L("orders",te),i=L("payments",ce),o=L("fold_logs",[]),u=n.filter(m=>m.id!==e),l=i.filter(m=>m.orderId!==e),d=o.filter(m=>m.orderTicket!==s.ticket);w("orders",u),w("payments",l),w("fold_logs",d);return}const r=await $();await r.run("DELETE FROM payments WHERE orderId = ?",[e]),await r.run("DELETE FROM fold_logs WHERE orderTicket = ?",[s.ticket]),await r.run("DELETE FROM orders WHERE id = ?",[e])}async function Ea(){return C.isNativePlatform()?(await(await $()).query("SELECT id, orderTicket, staffName, foldCount, rate, total, createdAt FROM fold_logs ORDER BY id DESC")).values??[]:L("fold_logs",[])}async function Sa(e){const t=Number((e.foldCount*e.rate).toFixed(2));if(!C.isNativePlatform()){const s=L("fold_logs",[]);s.unshift({id:Date.now(),...e,total:t,createdAt:ae()}),w("fold_logs",s);return}await(await $()).run("INSERT INTO fold_logs (orderTicket, staffName, foldCount, rate, total, createdAt) VALUES (?, ?, ?, ?, ?, ?)",[e.orderTicket,e.staffName,e.foldCount,e.rate,t,ae()])}async function wa(){return C.isNativePlatform()?(await(await $()).query("SELECT id, expenseDate, number, name, category, description, amount FROM disbursement_expenses ORDER BY expenseDate DESC, id DESC")).values??[]:L("expenses",se)}function Re(e){const t=/^DISB-(\d+)$/i.exec(String(e??"").trim());return t?Number(t[1]):0}function tt(e){const t=/^REV-(\d+)$/i.exec(String(e??"").trim());return t?Number(t[1]):0}async function Ta(){let e=0;if(!C.isNativePlatform()){const r=L("expenses",se),n=L("revolving_history",de);for(const i of r)e=Math.max(e,Re(i.number));for(const i of n)i.type==="disbursement"&&(e=Math.max(e,Re(i.revolvingNumber)));return e}const t=await $(),a=await t.query("SELECT number FROM disbursement_expenses"),s=await t.query("SELECT revolvingNumber as number FROM revolving_history WHERE type = 'disbursement'");for(const r of[...a.values??[],...s.values??[]])e=Math.max(e,Re(String(r.number)));return e}async function bt(){const e=await Ta()+1;return`DISB-${String(e).padStart(2,"0")}`}async function Na(){let e=0;if(!C.isNativePlatform()){const s=L("revolving_history",de);for(const r of s)r.type==="add"&&(e=Math.max(e,tt(r.revolvingNumber)));return`REV-${String(e+1).padStart(2,"0")}`}const a=await(await $()).query("SELECT revolvingNumber FROM revolving_history WHERE type = 'add'");for(const s of a.values??[])e=Math.max(e,tt(String(s.revolvingNumber)));return`REV-${String(e+1).padStart(2,"0")}`}async function Et(e){if(!C.isNativePlatform()){const a=L("expenses",se),s=H(a);a.unshift({id:s,expenseDate:e.expenseDate,number:e.number,name:e.name,category:e.category,description:e.description||null,amount:e.amount}),w("expenses",a);return}await(await $()).run("INSERT INTO disbursement_expenses (expenseDate, number, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?)",[e.expenseDate,e.number,e.name,e.category,e.description||null,e.amount])}async function Aa(e){const t=await bt();await Et({expenseDate:e.expenseDate,number:t,name:e.name,category:e.category,description:e.description,amount:e.amount})}async function La(e,t){if(!C.isNativePlatform()){const s=L("expenses",se),r=s.find(n=>n.id===e);r&&(Object.assign(r,{expenseDate:t.expenseDate,name:t.name,category:t.category,description:t.description||null,amount:t.amount}),w("expenses",s));return}await(await $()).run("UPDATE disbursement_expenses SET expenseDate = ?, name = ?, category = ?, description = ?, amount = ? WHERE id = ?",[t.expenseDate,t.name,t.category,t.description||null,t.amount,e])}async function Ca(e){if(!C.isNativePlatform()){const a=L("expenses",se);w("expenses",a.filter(s=>s.id!==e));return}await(await $()).run("DELETE FROM disbursement_expenses WHERE id = ?",[e])}async function $a(){return C.isNativePlatform()?(await(await $()).query('SELECT id, saleDate, COALESCE(saleNumber, "") as saleNumber, cashAmount, gcashAmount, totalAmount, notes, status, endorsedTo, statusUpdatedAt FROM daily_sales ORDER BY saleDate DESC, id DESC')).values??[]:L("sales",le)}async function Ra(e){const t=Number((e.cashAmount+e.gcashAmount).toFixed(2));if(!C.isNativePlatform()){const n=L("sales",le),i=e.id?n.find(o=>o.id===e.id):n.find(o=>o.saleDate===e.saleDate);if(i)Object.assign(i,{saleDate:e.saleDate,cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null});else{const o=H(n);n.unshift({id:o,saleDate:e.saleDate,saleNumber:`SALE-${String(o).padStart(2,"0")}`,cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null})}w("sales",n);return}const a=await $(),r=(e.id?await a.query("SELECT id, saleNumber FROM daily_sales WHERE id = ?",[e.id]):await a.query("SELECT id, saleNumber FROM daily_sales WHERE saleDate = ?",[e.saleDate])).values?.[0];if(r)await a.run("UPDATE daily_sales SET saleDate = ?, cashAmount = ?, gcashAmount = ?, totalAmount = ?, notes = ? WHERE id = ?",[e.saleDate,e.cashAmount,e.gcashAmount,t,e.notes||null,r.id]);else{const n=await a.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM daily_sales"),i=Number((n.values?.[0]).id);await a.run("INSERT INTO daily_sales (saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?)",[e.saleDate,`SALE-${String(i).padStart(2,"0")}`,e.cashAmount,e.gcashAmount,t,e.notes||null])}}async function Da(e){if(!C.isNativePlatform()){const a=L("sales",le);w("sales",a.filter(s=>s.id!==e));return}await(await $()).run("DELETE FROM daily_sales WHERE id = ?",[e])}async function at(e,t,a=null,s){if(!C.isNativePlatform()){const n=L("sales",le),i=n.find(o=>o.id===e);i&&(i.status=t,i.endorsedTo=a,i.statusUpdatedAt=s,w("sales",n));return}await(await $()).run("UPDATE daily_sales SET status = ?, endorsedTo = ?, statusUpdatedAt = ? WHERE id = ?",[t,a,s,e])}async function Oa(){return C.isNativePlatform()?(await(await $()).query("SELECT id, revolvingNumber, name, amount, category, description, type, createdAt FROM revolving_history ORDER BY createdAt DESC, id DESC")).values??[]:L("revolving_history",de).sort((a,s)=>s.createdAt.localeCompare(a.createdAt))}async function st(e){const t=e.type==="disbursement"?await bt():await Na();if(e.type==="disbursement"){const s=e.expenseDate??e.createdAt.slice(0,10);await Et({expenseDate:s,number:t,name:e.name,category:e.category,description:e.description??"",amount:e.amount})}if(!C.isNativePlatform()){const s=L("revolving_history",de),r=H(s);s.unshift({id:r,revolvingNumber:t,...e}),w("revolving_history",s);return}await(await $()).run("INSERT INTO revolving_history (revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)",[t,e.name,e.amount,e.category,e.description||null,e.type,e.createdAt])}async function St(e){return C.isNativePlatform()?(await(await $()).query("SELECT id, machineName, machineType, status, branch FROM machines WHERE branch = ? ORDER BY machineType, machineName",[e])).values??[]:L("machines",Q).filter(s=>s.branch===e)}async function Pa(e){if(!C.isNativePlatform()){const a=L("machines",Q);a.unshift({id:H(a),...e}),w("machines",a);return}await(await $()).run("INSERT INTO machines (machineName, machineType, status, branch) VALUES (?, ?, ?, ?)",[e.machineName,e.machineType,e.status,e.branch])}async function xa(e,t){if(!C.isNativePlatform()){const s=L("machines",Q),r=s.find(n=>n.id===e);r&&(r.status=t,w("machines",s));return}await(await $()).run("UPDATE machines SET status = ? WHERE id = ?",[t,e])}async function Ia(e){return C.isNativePlatform()?((await(await $()).query("SELECT id, date, machineIds, machineNames, cleaningStatus, notes, branch FROM subcleanings WHERE branch = ? ORDER BY date DESC, id DESC",[e])).values??[]).map(s=>({...s,machineIds:z(s.machineIds,[])})):L("subcleanings",[]).filter(s=>s.branch===e)}async function qa(e){const a=(await St(e.branch)).filter(n=>e.machineIds.includes(n.id)).map(n=>n.machineName).join(", ");if(!C.isNativePlatform()){const n=L("subcleanings",[]);n.unshift({id:H(n),date:e.date,machineIds:e.machineIds,machineNames:a,cleaningStatus:e.cleaningStatus,notes:e.notes||null,branch:e.branch}),w("subcleanings",n);const i=L("machines",Q);i.forEach(o=>{e.machineIds.includes(o.id)&&(o.status=e.cleaningStatus==="completed"?"available":"under_cleaning")}),w("machines",i);return}const s=await $();await s.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, notes, branch) VALUES (?, ?, ?, ?, ?, ?)",[e.date,JSON.stringify(e.machineIds),a,e.cleaningStatus,e.notes||null,e.branch]);const r=e.cleaningStatus==="completed"?"available":"under_cleaning";for(const n of e.machineIds)await s.run("UPDATE machines SET status = ? WHERE id = ?",[r,n])}async function Fa(e,t){if(!C.isNativePlatform()){const i=L("machines",Q),o=i.find(d=>d.id===e);o&&(o.status="available"),w("machines",i);const u=L("subcleanings",[]),l=xe();u.unshift({id:H(u),date:l,machineIds:[e],machineNames:o?.machineName??"",cleaningStatus:"completed",notes:null,branch:t}),w("subcleanings",u);return}const a=await $(),r=(await a.query("SELECT machineName FROM machines WHERE id = ?",[e])).values?.[0]?.machineName??"";await a.run("UPDATE machines SET status = ? WHERE id = ?",["available",e]);const n=xe();await a.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, notes, branch) VALUES (?, ?, ?, ?, ?, ?)",[n,JSON.stringify([e]),r,"completed",null,t])}const Me=document.querySelector("#app");if(!Me)throw new Error("App root not found");let be;const me=re("BluetoothThermalPrinter"),_e={dashboard:"Dashboard",pos:"POS",orders:"Orders",archived:"Archived Order",customers:"Customers",pricing:"Pricing Services",disbursements:"Daily Report",reports:"Reports",inventory:"Inventory",maintenance:"Maintenance",staff:"Staff",revolving:"Revolving Fund",settings:"Settings"},c={tab:"dashboard",receiptOrderId:0,currentUser:null,loginError:"",sidebarOpen:!1,dailyReportTab:"expenses",maintenanceTab:"cleaning",customerSearch:"",orderSearch:"",orderDateFilter:"",orderPaymentFilter:"",printerPanelOpen:!1,printerLoading:!1,printerError:"",printerStatus:"",printerPaperWidth:58,pairedPrinters:[],selectedPrinterAddress:"",archivedOrderSearch:"",reportPreview:null,endorseModalOpen:!1,endorseSaleId:0,endorseSaleDate:"",revolvingModalOpen:!1,revolvingSaleId:0,addFundModalOpen:!1,disbursementModalOpen:!1,revolvingHistoryFrom:"",revolvingHistoryTo:""},ka=["Wash","Dry","Fold","Detergent","Fabcon","Zonrox"],ye="laba101-mobile-session";function N(e){return new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(e||0)}function v(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Z(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}function Ce(e,t){return Number((e-t).toFixed(2))}function wt(e,t,a,s=0){const r=t.filter(i=>W(i.createdAt)===e).reduce((i,o)=>i+o.paidAmount,0),n=a.filter(i=>i.expenseDate===e).reduce((i,o)=>i+o.amount,0);return Ce(r+s,n)}function Ua(e){const t=new Map;return e.filter(a=>a.workflowCompleted.includes("fold")&&a.foldedByName).forEach(a=>{const s=a.foldedByName,r=t.get(s)??{staffName:s,folds:0};r.folds+=1,t.set(s,r)}),Array.from(t.values())}function he(e=new Date){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${s}`}function X(){return he()}function W(e){return he(new Date(e))}function Be(e){return e.paidAmount<=0?"unpaid":e.balance>0?"partial":"paid"}function ie(e){return new Intl.DateTimeFormat("en-PH",{dateStyle:"medium",timeStyle:"short"}).format(new Date(e))}function Ma(e){const t=new Date(e),a=new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric",year:"numeric"}).format(t),s=new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",hour12:!0}).format(t);return`<div class="datetime-stack"><strong>${v(a)}</strong><span class="meta">${v(s)}</span></div>`}function _a(e){return e?.role==="staff"&&e.branch==="Gensan Branch"}function Ba(e){return e?.role==="staff"&&e.branch.toLowerCase().includes("mintal")}function Ae(e,t,a="data-table"){return`
    <div class="table-scroll">
      <table class="${a}">
        <thead><tr>${e.map(s=>`<th>${v(s)}</th>`).join("")}</tr></thead>
        <tbody>${t.length?t.map(s=>`<tr>${s.map(r=>`<td>${r}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${e.length}" class="table-empty">No records found.</td></tr>`}</tbody>
      </table>
    </div>
  `}function ja(e=new Date){return{date:new Intl.DateTimeFormat("en-PH",{weekday:"long",month:"long",day:"numeric",year:"numeric"}).format(e),time:new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",second:"2-digit",hour12:!0}).format(e)}}function Ee(){const e=document.querySelector("[data-date-from]"),t=document.querySelector("[data-date-to]"),a=Array.from(document.querySelectorAll('input[name="reportType"]:checked')).map(s=>s.value).filter(s=>s==="sales"||s==="disbursement"||s==="fold_count"||s==="revolving_fund"||s==="summary");return{from:e?.value||"0000-01-01",to:t?.value||"9999-12-31",types:a.length?a:["summary"]}}function fe(e,t){return e>=t.from&&e<=t.to}function Tt(e,t,a,s,r,n,i){const o=new Set(i.types),u=e.filter(g=>fe(W(g.createdAt),i)),l=a.filter(g=>fe(g.saleDate,i)),d=s.filter(g=>fe(g.expenseDate,i)),m=Ua(u),y=new Map;t.filter(g=>fe(W(g.receivedAt),i)).forEach(g=>{const D=y.get(g.orderId)??{cash:0,gcash:0};g.method==="gcash"?D.gcash+=g.amount:D.cash+=g.amount,y.set(g.orderId,D)});const f=u.reduce((g,D)=>{const k=y.get(D.id);if(k){const J=k.cash+k.gcash;if(J>D.totalAmount){const ne=D.totalAmount/J;return g+k.cash*ne}return g+k.cash}return g+D.paidAmount},0),b=l.reduce((g,D)=>g+D.cashAmount,0),E=l.reduce((g,D)=>g+D.gcashAmount,0),p=u.reduce((g,D)=>{const k=y.get(D.id);if(k){const J=k.cash+k.gcash;if(J>D.totalAmount){const ne=D.totalAmount/J;return g+k.gcash*ne}return g+k.gcash}return g+0},0),T=f+b,h=p+E,A=T+h,O=d.reduce((g,D)=>g+D.amount,0),R=O,U=A-R,q=()=>({orderCashTotal:f,orderGcashTotal:p,manualCashTotal:b,manualGcashTotal:E,totalCash:T,totalGcash:h,totalSales:A,transactions:u.map(g=>{const D=y.get(g.id)??{cash:g.paidAmount,gcash:0},k=D.cash+D.gcash;let J=D.cash,ne=D.gcash,He=k;if(k>g.totalAmount){const We=g.totalAmount/k;J=D.cash*We,ne=D.gcash*We,He=g.totalAmount}return{ticket:g.ticket,customer:g.customer,cash:J,gcash:ne,total:He}}),manualSales:l.map(g=>({cash:g.cashAmount,gcash:g.gcashAmount,total:g.totalAmount}))}),P=()=>({totalExpenses:O,totalDisbursement:R,rows:[["Date","id#","Name","Category","Description","Amount"],...d.map(g=>[g.expenseDate,g.number,g.name,g.category??"",g.description??"",g.amount]),[],["Total Disbursement","","","","",R]]}),F=()=>({rows:[["Staff","Fold Count"],...m.map(g=>[g.staffName,g.folds]),[],["Total Folds",m.reduce((g,D)=>g+D.folds,0)]]}),M=r.filter(g=>fe(W(g.createdAt),i));return{selection:i,selectedTypes:o,salesRows:q,disbursementRows:P,foldCountRows:F,revolvingDailySummaryRows:()=>({rows:[["Date of Sales","Cash on Hand","Status","Date Update"],...l.map(g=>{const D=wt(g.saleDate,e,s,g.cashAmount),k=g.status==="revolving"?"Revolving":g.status==="endorsed"?`Endorsed to ${g.endorsedTo??""}`:"Pending";return[g.saleDate,D,k,g.statusUpdatedAt?W(g.statusUpdatedAt):""]})]}),revolvingHistoryRows:()=>({rows:[["Date","Number","Name","Amount","Category","Description","Type"],...M.map(g=>[W(g.createdAt),g.revolvingNumber,g.name,g.type==="disbursement"?-g.amount:g.amount,g.category,g.description??"",g.type==="add"?"Add Revolving Fund":"Disbursement"])]}),summaryRows:()=>{const g=q(),D=P();return[["Summary",i.from,"to",i.to],[],["Total Cash:","Total GCash:","Total Sales:"],["","",""],[g.totalCash,g.totalGcash,g.totalSales],["","",""],["Total Disbursement:","Total Profit:","Cash on Hand:"],["","",""],[D.totalDisbursement,U,Ce(g.totalCash,D.totalDisbursement)]]},profit:U}}function Ha(e,t){return`<button class="nav-link ${t?"is-active":""}" data-tab="${e}" type="button">
    <span class="nav-icon">${Wa(e)}</span>
    <span>${_e[e]}</span>
  </button>`}function x(e,t){return`<div class="section-head"><div><h2>${v(e)}</h2><p class="meta">${v(t)}</p></div></div>`}function rt(){return _e[c.tab]??"Dashboard"}function De(e){return(e?.name??"Laba101").trim().slice(0,1).toUpperCase()}function Wa(e){return{dashboard:"DB",pos:"POS",orders:"PO",archived:"AR",customers:"CU",pricing:"PS",disbursements:"DR",reports:"RP",inventory:"IN",maintenance:"MT",staff:"ST",revolving:"RV",settings:"SE"}[e]}async function Nt(){const e=await ve(),t=await oa(e),a=await pt(),s=await la(),r=await Ue(),n=await ua(),i=await yt(),o=await pe(e),u=await ha(),l=await Ea(),d=await wa(),m=await $a(),y=await St(e),f=await Ia(e),b=await Oa(),E=await ia(),p=await vt("report_email");return{branch:e,staff:t,allStaff:a,customers:s,services:r,allServices:n,categories:i,orders:o,payments:u,foldLogs:l,expenses:d,sales:m,machines:y,subcleanings:f,revolvingHistory:b,foldRate:E,reportEmail:p??""}}async function S(){if(!c.currentUser){Xa(),ds();return}const e=await Nt();e.orders.filter(o=>o.status!=="claimed").length,e.orders.filter(o=>o.status==="ready").length,e.orders.reduce((o,u)=>o+u.paidAmount,0);const t=X(),a=e.payments.filter(o=>o.branch===e.branch&&o.method==="gcash"&&W(o.receivedAt)===t).reduce((o,u)=>o+u.amount,0)+e.sales.filter(o=>o.saleDate===t).reduce((o,u)=>o+u.gcashAmount,0),s=e.payments.filter(o=>o.branch===e.branch&&o.method==="cash"&&W(o.receivedAt)===t).reduce((o,u)=>o+u.amount,0)+e.sales.filter(o=>o.saleDate===t).reduce((o,u)=>o+u.cashAmount,0),r=s+a,n=e.expenses.filter(o=>o.expenseDate===t).reduce((o,u)=>o+u.amount,0),i=Ce(s,n);e.sales.reduce((o,u)=>o+u.totalAmount,0),e.expenses.reduce((o,u)=>o+u.amount,0),Me.innerHTML=`
    <div class="app-frame">
      <header class="topbar">
        <div class="topbar-left">
          <img src="/laba101-logo.svg" alt="Laba101" class="topbar-logo" />
          <div>
            <p class="eyebrow">Offline mobile system</p>
            <h1>${v(rt())}</h1>
          </div>
        </div>
        <div class="topbar-actions">
          <div class="branch-pill"><span>Branch</span><strong>${v(e.branch)}</strong></div>
          <button class="icon-button" type="button" aria-label="Notifications">!</button>
          <button class="profile-pill" type="button">
            <span>${De(c.currentUser)}</span>
            <strong>${v(c.currentUser.name)}</strong>
          </button>
        </div>
      </header>

      <button class="sidebar-backdrop ${c.sidebarOpen?"is-open":""}" id="sidebar-backdrop" type="button" aria-label="Close navigation"></button>

      <aside class="sidebar ${c.sidebarOpen?"is-open":""}">
        <div class="sidebar-mobile-head">
          <img src="/laba101-logo.svg" alt="Laba101" />
          <button class="sidebar-close" id="sidebar-close-button" type="button" aria-label="Close navigation">X</button>
        </div>
        <nav>${At().map(o=>Ha(o,c.tab===o)).join("")}</nav>
        <div class="sidebar-fill">
          <div class="sidebar-branch-badge">
            <span>Active Branch</span>
            <strong>${v(e.branch)}</strong>
          </div>
          <p class="sidebar-app-name">Laba101 POS</p>
        </div>
        <div class="sidebar-user">
          <span class="avatar">${De(c.currentUser)}</span>
          <div>
            <strong>${v(c.currentUser.name)}</strong>
            <small>${v(c.currentUser.email)} / ${v(c.currentUser.role)}</small>
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
            <h2>${v(rt())}</h2>
          </div>
          <div class="navbar-time">
            <strong data-navbar-time>--:--</strong>
            <span data-navbar-date>Loading...</span>
          </div>
          <button class="mobile-avatar" type="button">${De(c.currentUser)}</button>
        </header>

        ${c.tab==="dashboard"?Ga({paidToday:r,cashPaidToday:s,gcashPaidToday:a,disbursementToday:n,cashOnHandToday:i,orders:e.orders,payments:e.payments,sales:e.sales}):""}
        ${c.tab==="pos"?Va(e.orders,e.customers,e.services,e.categories,e.payments,e.branch):""}
        ${c.tab==="orders"?Ya(e.orders,e.staff,e.services,e.payments):""}
        ${c.tab==="archived"?Qa(e.orders,e.staff,e.services,e.payments):""}
        ${c.tab==="customers"?ts(e.customers,e.orders):""}
        ${c.tab==="pricing"?as(e.allServices,e.categories):""}
        ${c.tab==="disbursements"?ss(e.expenses,e.sales):""}
        ${c.tab==="reports"?rs(e.orders,e.payments,e.sales,e.expenses,e.revolvingHistory,e.foldRate):""}
        ${c.tab==="inventory"?ns(e.services,e.categories):""}
        ${c.tab==="maintenance"?is(e.machines,e.subcleanings,e.branch):""}
        ${c.tab==="staff"?os(e.allStaff,e.branch):""}
        ${c.tab==="revolving"?Ss(e.sales,e.revolvingHistory,e.orders,e.expenses):""}
        ${c.tab==="settings"?cs(e.branch,e.foldRate,e.reportEmail):""}
      </main>
    </div>
  `,ls(),ms(e),vs(e.allServices),ps(e.expenses),fs(e.orders,e.payments,e.sales,e.expenses,e.revolvingHistory,e.foldRate),ys(),hs(),gs(),bs(e.allStaff),ws(),Es(),us()}function At(){if(c.currentUser?.role==="admin")return Object.keys(_e).filter(t=>t!=="inventory");const e=["dashboard","pos","orders","archived","disbursements","reports","maintenance","revolving"];return _a(c.currentUser)?["dashboard","disbursements","reports","maintenance","revolving"]:Ba(c.currentUser)?e.filter(t=>t!=="revolving"):e}function Xa(){Me.innerHTML=`
    <main class="login-page">

      <section class="login-panel-wrap">
        <article class="login-panel">
          <header>
            <div class="login-mark"><img src="/laba101-logo.svg" alt="Laba101" /></div>
            <h2>Welcome back</h2>
            <p>Sign in to continue managing today&apos;s laundry operations.</p>
          </header>
          ${c.loginError?`<div class="alert">${v(c.loginError)}</div>`:""}
          <form id="login-form" class="form">
            <label>Email address<input name="email" type="email" autocomplete="username" placeholder="admin@laba101.test or staff@laba101.gensan" required /></label>
            <label>Password<input name="password" type="password" autocomplete="current-password" placeholder="password" required /></label>
            <label class="remember"><input name="remember" type="checkbox" value="1" /> Remember me on this device</label>
            <button class="primary" id="login-button" type="submit">Sign in</button>
          </form>
        </article>
      </section>
    </main>
  `}function Ka(){document.querySelectorAll("[data-fill-email]").forEach(e=>{e.addEventListener("click",()=>{const t=document.querySelector('input[name="email"]'),a=document.querySelector('input[name="password"]');t&&(t.value=e.dataset.fillEmail??""),a&&(a.value=e.dataset.fillPassword??"")})})}function Ga(e){const t=new Date,a=Array.from({length:7},(i,o)=>{const u=new Date(t);return u.setDate(t.getDate()-(6-o)),new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric"}).format(u)}),s=Array.from({length:7},(i,o)=>{const u=new Date(t);u.setDate(t.getDate()-(6-o));const l=he(u),d=e.orders.filter(y=>W(y.createdAt)===l).reduce((y,f)=>y+f.paidAmount,0),m=e.sales.filter(y=>y.saleDate===l).reduce((y,f)=>y+f.totalAmount,0);return d+m}),r=Math.max(1,...s),n=210;return`
    <section class="dashboard-main">
      <article class="panel revenue-panel">
        ${x("Revenue overview","Paid amount for the last 7 days.")}
        <div class="stats compact dashboard-stats">
          <div class="stat paid-today-stat">
            <span class="card-label">Paid Today</span>
            <div class="value">${N(e.paidToday)}</div>
            <div class="stat-breakdown"><span>Cash ${N(e.cashPaidToday)}</span><span>GCash ${N(e.gcashPaidToday)}</span></div>
          </div>
          <div class="stat"><span class="card-label">Disbursement</span><div class="value">${N(e.disbursementToday)}</div></div>
          <div class="stat"><span class="card-label">Cash on Hand</span><div class="value">${N(e.cashOnHandToday)}</div></div>
        </div>
        <div class="chart-shell">
          <div class="mini-chart revenue-chart">
            ${s.map((i,o)=>{const u=Math.max(12,Math.round(i/r*n));return`<div class="chart-bar ${o===s.length-1?"is-today":""}"><span style="height:${u}px"></span><strong>${N(i)}</strong></div>`}).join("")}
          </div>
          <div class="chart-days">${a.map(i=>`<span>${v(i)}</span>`).join("")}</div>
        </div>
        <div class="chart-footnote">Values include POS payments and Daily Report sales input.</div>
      </article>
    </section>
  `}function Va(e,t,a,s,r,n){const i=a.filter(m=>m.serviceType==="order"&&m.isActive),o=a.filter(m=>m.serviceType==="addon"&&m.isActive),u=c.receiptOrderId?e.find(m=>m.id===c.receiptOrderId):null,l=new Set(e.map(m=>m.customerId)),d=t.filter(m=>l.has(m.id));return`
    <section class="grid content full">
      <article class="panel span-2">
        ${x("New POS order","Tap a service, add extra quantities, and confirm the total")}
        <form id="order-form" class="form">
          <div class="form-row">
            <label>Existing customer (${v(n)})
              <select name="customerId">
                <option value="">-- New customer --</option>
                ${d.map(m=>`<option value="${m.id}" data-name="${v(m.name)}" data-phone="${v(m.phone??"")}">${v(m.name)} ${m.phone?`- ${v(m.phone)}`:""}</option>`).join("")}
              </select>
            </label>
            <label>Customer name<input name="customerName" required placeholder="Customer name" /></label>
          </div>
          <div class="form-row">
            <label>Phone<input name="customerPhone" placeholder="09..." /></label>
          </div>

          <fieldset class="service-picker">
            <legend>Services</legend>
            ${i.map(m=>`<div class="qty-card service-option service-quantity" data-qty-card="serviceQty-${m.id}">
              <span>
                <strong>${v(m.name)}</strong>
                <small>${v(m.description??m.category)} ${m.maxKg?` / max ${m.maxKg}kg`:""}</small>
              </span>
              <b>${N(m.price)}</b>
              <div class="qty-control">
                <button type="button" data-qty-minus="serviceQty-${m.id}" aria-label="Decrease ${v(m.name)}">-</button>
                <input type="number" name="serviceQty-${m.id}" min="0" step="1" value="0" inputmode="numeric" />
                <button type="button" data-qty-plus="serviceQty-${m.id}" aria-label="Increase ${v(m.name)}">+</button>
              </div>
            </div>`).join("")}
          </fieldset>

          <fieldset class="check-grid">
            <legend>Extra services</legend>
            ${o.length?o.map(m=>`<div class="qty-card addon-quantity" data-qty-card="addonQty-${m.id}">
              <span><strong>${v(Z(m.name))}</strong><small>${N(m.price)} each</small></span>
              <div class="qty-control">
                <button type="button" data-qty-minus="addonQty-${m.id}" aria-label="Decrease ${v(Z(m.name))}">-</button>
                <input type="number" name="addonQty-${m.id}" min="0" step="1" value="0" inputmode="numeric" />
                <button type="button" data-qty-plus="addonQty-${m.id}" aria-label="Increase ${v(Z(m.name))}">+</button>
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

      ${u?je(u,r.filter(m=>m.orderId===u.id)):""}
    </section>
  `}function Ya(e,t,a,s){const r=c.receiptOrderId?e.find(d=>d.id===c.receiptOrderId):null,n=e.filter(d=>d.status!=="claimed"),i=c.orderSearch.trim().toLowerCase(),o=c.orderDateFilter.trim(),u=c.orderPaymentFilter.trim().toLowerCase(),l=n.filter(d=>{const m=!i||[d.ticket,d.customer,d.phone,d.service,d.itemCategory,d.status].some(b=>String(b??"").toLowerCase().includes(i)),y=!o||W(d.createdAt)===o,f=!u||Be(d)===u;return m&&y&&f});return`
    <section class="grid content full">
      <article class="panel span-2">
        ${x("Order queue","Workflow, payment, and receipts")}
        <form class="queue-filters" id="order-queue-filters">
          <label>
            <span>Search queue</span>
            <input name="orderSearch" type="search" placeholder="Ticket, name, service, status" value="${v(c.orderSearch)}" autocomplete="off" />
          </label>
          <label>
            <span>Filter date</span>
            <input name="orderDateFilter" type="date" value="${v(c.orderDateFilter)}" />
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
        <div class="summary-list queue-summary">
          <div><span>Active queue</span><strong>${l.length}</strong></div>
          <div><span>Claimed archived</span><strong>${e.filter(d=>d.status==="claimed").length}</strong></div>
        </div>
        <table class="data-table orders-data-table">
          <thead>
            <tr><th>Ticket</th><th>Customer</th><th>Service</th><th>Total Payment</th><th>Actions</th></tr>
          </thead>
          <tbody>
            ${l.map(d=>Lt(d,t,a)).join("")||'<tr><td colspan="5" class="table-empty">No matching active orders.</td></tr>'}
          </tbody>
        </table>
      </article>
      ${r?je(r,s.filter(d=>d.orderId===r.id)):""}
    </section>
  `}function Qa(e,t,a,s){const r=e.filter(u=>u.status==="claimed"),n=c.archivedOrderSearch.trim().toLowerCase(),i=r.filter(u=>n?[u.ticket,u.customer,u.phone,u.service,u.itemCategory].some(l=>String(l??"").toLowerCase().includes(n)):!0),o=c.receiptOrderId?e.find(u=>u.id===c.receiptOrderId):null;return`
    <section class="grid content full">
      <article class="panel span-2">
        ${x("Archived orders","All claimed orders are listed here")}
        <form class="queue-filters" id="archived-order-filters">
          <label>
            <span>Search archived</span>
            <input name="archivedOrderSearch" type="search" placeholder="Ticket, name, service" value="${v(c.archivedOrderSearch)}" autocomplete="off" />
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
        <table class="data-table orders-data-table archived-orders-table">
          <thead>
            <tr><th>Ticket</th><th>Customer</th><th>Service</th><th>Total Payment</th><th>Actions</th></tr>
          </thead>
          <tbody>
            ${i.map(u=>Lt(u,t,a)).join("")||'<tr><td colspan="5" class="table-empty">No archived orders found.</td></tr>'}
          </tbody>
        </table>
      </article>
      ${o?je(o,s.filter(u=>u.orderId===o.id)):""}
    </section>
  `}function Lt(e,t,a){const s=ht(e,a),r=s.find(f=>!e.workflowCompleted.includes(f.key)),n=r?.key==="fold",i=r?.key==="extras"&&e.extras.length>0,o=Be(e),u=o.charAt(0).toUpperCase()+o.slice(1),l=e.extras.length?e.extras.map(f=>`${v(Z(f.name))} x${Number(f.quantity??1)}`).join(", "):"",d=c.currentUser?.role==="admin",m=e.status!=="claimed"&&e.paidAmount<=0,y=e.status!=="claimed"&&d&&e.paidAmount>0;return`
    <tr class="order-row-main">
      <td><strong>${v(e.ticket)}</strong><div class="small">${v(ie(e.createdAt))}</div></td>
      <td>${v(e.customer)}<div class="small">${v(e.phone??"")}</div></td>
      <td>${v(e.service)}${l?`<div class="small">Extras: ${l}</div>`:""}</td>
      <td class="amount-cell"><strong>${N(e.totalAmount)}</strong><div class="small">${v(u)} · Paid ${N(e.paidAmount)} · Bal PHP ***</div></td>
      <td>
      <div class="row-actions">
        ${r?`<form class="inline-form advance-form" data-order-id="${e.id}">
          ${i?`<div class="extra-confirmation">Confirm extra service: <strong>${e.extras.map(f=>`${v(Z(f.name))} x${Number(f.quantity??1)}`).join(", ")}</strong></div>`:""}
          ${n?`<select name="assignedStaffId" required>
            <option value="">Staff</option>
            ${t.map(f=>`<option value="${f.id}">${v(f.name)}</option>`).join("")}
          </select>`:""}
          <button class="secondary" type="submit">Next: ${v(r.label)}</button>
        </form>`:""}
        ${e.balance>0?`
          <form class="inline-form payment-form" data-order-id="${e.id}">
            <input name="amount" type="number" min="0.01" step="0.01" value="${e.balance}" />
            <select name="method"><option value="cash">Cash</option><option value="gcash">GCash</option></select>
            <input name="reference" placeholder="GCash ref" hidden />
            <button class="secondary" type="submit">Pay</button>
          </form>
        `:""}
        ${m?`<button class="secondary" type="button" data-cancel-order="${e.id}">Cancel</button>`:""}
        ${y?`<button class="secondary" type="button" data-delete-order="${e.id}">Delete</button>`:""}
        <button class="secondary" data-receipt="${e.id}">Receipt</button>
      </div>
      </td>
    </tr>
    <tr class="order-row-detail">
      <td colspan="5">
        <div class="order-detail-row">
          <div class="${e.status==="ready"||e.status==="claimed"?"ok":"warn"}">${v(e.status)}</div>
          <div class="workflow-progress order-workflow-progress">
            ${s.map(f=>`<span class="${e.workflowCompleted.includes(f.key)?"is-done":r?.key===f.key?"is-next":""}">${v(f.label)}</span>`).join("")}
          </div>
        </div>
      </td>
    </tr>
  `}function je(e,t){const a=t.reduce((i,o)=>i+Number(o.amount),0),s=Math.max(0,Number((a-e.totalAmount).toFixed(2))),r=Be(e),n=r.charAt(0).toUpperCase()+r.slice(1);return`
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="receipt-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-open-printer-panel>Printer</button>
          <button class="primary" type="button" data-thermal-print>${c.printerLoading?"Printing...":"Print Receipt"}</button>
          <button class="secondary" type="button" data-close-receipt>Close</button>
        </div>
        ${c.printerPanelOpen?Ja():""}
        <div class="receipt" id="receipt-print-area">
          <div class="receipt-head">
            <h3 id="receipt-title">Laba101</h3>
            <p>${v(e.ticket)}<br>${v(ie(e.createdAt))}</p>
          </div>
          ${c.currentUser?`<p class="receipt-staff">Staff: ${v(c.currentUser.name)}</p>`:""}
          <div class="receipt-customer">
            <strong>${v(e.customer)}</strong>
            <span>${v(e.phone??"No phone")}</span>
          </div>
          <div class="summary-list receipt-lines">
            <div><span>Service</span><strong>${v(e.service)}</strong></div>
            ${e.extras.length?`<div><span>Extra services</span><strong>${e.extras.map(i=>`${v(Z(i.name))} x${Number(i.quantity??1)} (${N(Number(i.total??i.price))})`).join(", ")}</strong></div>`:""}
            <div><span>Total</span><strong>${N(e.totalAmount)}</strong></div>
            <div><span>Tendered</span><strong>${N(a)}</strong></div>
            <div><span>Paid</span><strong>${N(e.paidAmount)}</strong></div>
            <div><span>Payment status</span><strong>${n}</strong></div>
            <div><span>Change</span><strong>${N(s)}</strong></div>
            <div><span>Balance</span><strong>${N(e.balance)}</strong></div>
          </div>
          <h3>Payments</h3>
          <div class="receipt-payments">
            ${t.map(i=>`<div><span>${v(i.method.toUpperCase())}</span><strong>${N(i.amount)}</strong>${i.reference?`<small>Ref ${v(i.reference)}</small>`:""}</div>`).join("")||'<p class="helper">No payments yet.</p>'}
          </div>
        </div>
      </div>
    </div>
  `}function Ja(){return`
    <div class="printer-panel">
      <div class="printer-panel-head">
        <strong>Bluetooth thermal printer</strong>
        <button class="secondary" type="button" data-refresh-printers>${c.printerLoading?"Scanning...":"Scan paired"}</button>
      </div>
      <div class="printer-fields">
        <label>Printer
          <select data-printer-select>
            <option value="">Select paired printer</option>
            ${c.pairedPrinters.map(e=>`<option value="${v(e.address)}" ${c.selectedPrinterAddress===e.address?"selected":""}>${v(e.name)} - ${v(e.address)}</option>`).join("")}
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
      ${c.printerStatus?`<p class="printer-status ok">${v(c.printerStatus)}</p>`:""}
      ${c.printerError?`<p class="printer-status warn">${v(c.printerError)}</p>`:""}
    </div>
  `}async function nt(){c.printerLoading=!0,c.printerError="",c.printerStatus="",await S();try{if(!(await me.requestBluetoothPermissions()).granted)throw new Error("Bluetooth permission was not granted.");const t=await me.listPairedPrinters();c.pairedPrinters=t.printers??[],c.selectedPrinterAddress=c.selectedPrinterAddress||t.savedAddress||c.pairedPrinters[0]?.address||"",c.printerStatus=c.pairedPrinters.length?"Select a printer, then connect.":"No paired printers found. Pair the printer in Android Bluetooth settings first."}catch(e){c.printerError=e instanceof Error?e.message:"Could not scan paired printers."}finally{c.printerLoading=!1,await S()}}async function za(){if(!c.selectedPrinterAddress){c.printerError="Select a paired printer first.",await S();return}c.printerLoading=!0,c.printerError="",c.printerStatus="",await S();try{await me.savePrinter({address:c.selectedPrinterAddress}),await me.connect({address:c.selectedPrinterAddress}),c.printerStatus="Printer connected and saved."}catch(e){c.printerError=e instanceof Error?e.message:"Printer connection failed."}finally{c.printerLoading=!1,await S()}}function Za(e){const t=(e.serviceLines?.length?e.serviceLines:[{id:e.serviceId,name:e.service,price:e.price,quantity:1,total:e.price}]).map(s=>({name:s.name,quantity:Number(s.quantity||1),price:Number(s.price||0)})),a=e.extras.map(s=>({name:Z(s.name),quantity:Number(s.quantity??1),price:Number(s.price||0)}));return[...t,...a]}async function es(e,t){const a=t.reduce((r,n)=>r+Number(n.amount),0),s=Math.max(0,Number((a-e.totalAmount).toFixed(2)));c.printerLoading=!0,c.printerError="",c.printerStatus="",await S();try{if(!c.selectedPrinterAddress){const r=await me.getSavedPrinter();c.selectedPrinterAddress=r.address||""}await me.printReceipt({address:c.selectedPrinterAddress||void 0,paperWidth:c.printerPaperWidth,storeName:"Laba101",receiptNumber:e.ticket,dateTime:ie(e.createdAt),customerName:e.customer,customerPhone:e.phone?.trim()||"No phone",items:Za(e),totalAmount:e.totalAmount,paidAmount:e.paidAmount,changeAmount:s,balanceAmount:e.balance,staffName:c.currentUser?.name?.trim()||"Staff"}),c.printerStatus="Receipt sent to printer."}catch(r){c.printerPanelOpen=!0,c.printerError=r instanceof Error?r.message:"Bluetooth thermal print failed."}finally{c.printerLoading=!1,await S()}}function ts(e,t){const a=c.customerSearch.trim().toLowerCase(),s=e.filter(r=>a?r.name.toLowerCase().includes(a):!1);return`
    <section class="grid content full">
      <article class="panel">
        ${x("Customer Management","Customer records from local offline storage")}
        <form class="search-box" id="customer-search-form">
          <label>
            <span>Search customer name</span>
            <input name="customerSearch" data-customer-search type="search" placeholder="Type the customer name then tap Search" value="${v(c.customerSearch)}" autocomplete="off" />
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
          ${a?s.map(r=>{const n=t.filter(i=>i.customerId===r.id);return`
              <article class="customer-card">
                <header>
                  <div>
                    <strong>${v(r.name)}</strong>
                    <p>${v(r.phone??"No phone")} · ${v(r.address??"No address")}</p>
                  </div>
                  <span>${n.length} order(s)</span>
                </header>
                <div class="customer-orders">
                  ${n.length?n.map(i=>`
                    <div class="customer-order-row">
                      <div>
                        <strong>${v(i.ticket)}</strong>
                        <span>${v(i.service)} · ${v(i.itemCategory)}</span>
                      </div>
                      <div>
                        <strong>${N(i.totalAmount)}</strong>
                        <span>${v(i.status)}</span>
                      </div>
                    </div>`).join(""):'<p class="helper">No order records yet.</p>'}
                </div>
              </article>`}).join(""):'<div class="helper">Search a customer name to display matching records and their order history.</div>'}
        </div>
      </article>
    </section>
  `}function as(e,t){return`
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
            ${ka.map(a=>`<label class="check"><input type="checkbox" name="includes" value="${a}" /> ${a}</label>`).join("")}
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
        <div class="service-card-grid">
          ${e.map(a=>`
            <article class="service-card">
              <header>
                <strong>${v(a.name)}</strong>
                <span>${v(a.category)}</span>
              </header>
              <div class="service-fields">
                <div><span>price:</span><strong>${N(a.price)}</strong></div>
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
        <div class="table daily-report-table">
          <div class="table-head"><div>Name</div><div>Max KG</div><div></div><div></div><div></div></div>
          ${t.map(a=>`<div class="table-row"><div>${v(a.name)}</div><div>${a.maxKg}</div><div></div><div></div><div></div></div>`).join("")}
        </div>
      </article>
    </section>
  `}function ss(e,t){const a=X(),s=a.slice(0,7),r=c.currentUser?.role==="admin",n=e.filter(l=>l.expenseDate===a).reduce((l,d)=>l+d.amount,0),i=e.filter(l=>l.expenseDate.startsWith(s)).reduce((l,d)=>l+d.amount,0),o=t.filter(l=>l.saleDate===a).reduce((l,d)=>l+d.totalAmount,0),u=t.filter(l=>l.saleDate.startsWith(s)).reduce((l,d)=>l+d.totalAmount,0);return`
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
      <div class="panel stat"><div class="card-label">Daily disbursement</div><div class="value">${N(n)}</div></div>
      <div class="panel stat"><div class="card-label">Monthly disbursement</div><div class="value">${N(i)}</div></div>
      <div class="panel stat"><div class="card-label">Today sales input</div><div class="value">${N(o)}</div></div>
      <div class="panel stat"><div class="card-label">Month sales input</div><div class="value">${N(u)}</div></div>
    </section>
    ${c.dailyReportTab==="expenses"?`
    <section class="grid content full">
      <article class="panel">
        ${x("Input disbursement","Supplies, utilities, and cash disbursements")}
        <form id="expense-form" class="form">
          <input name="id" type="hidden" />
          <div class="form-row"><label>Date<input name="expenseDate" type="date" value="${X()}" required /></label><label>Amount<input name="amount" type="number" min="0" step="0.01" required /></label></div>
          <div class="form-row"><label>Name<input name="name" required /></label><label>Category<input name="category" required /></label></div>
          <label>Description<textarea name="description"></textarea></label>
          <button class="primary" type="submit">Save expense</button>
        </form>
      </article>
      <article class="panel">
        ${x("Disbursement list","Expenses only")}
        <div class="table-scroll daily-report-scroll">
          <div class="table daily-report-table">
            <div class="table-head"><div>Date</div><div>No.</div><div>Name</div><div>Category</div><div>Amount</div><div>Action</div></div>
            ${e.map(l=>`<div class="table-row"><div>${v(l.expenseDate)}</div><div>${v(l.number)}</div><div>${v(l.name)}</div><div>${v(l.category)}</div><div>${N(l.amount)}</div><div class="row-actions"><button class="secondary edit-expense-btn" data-id="${l.id}" type="button">Edit</button>${r?`<button class="secondary delete-expense-btn" data-id="${l.id}" type="button">Delete</button>`:""}</div></div>`).join("")||'<div class="helper">No expenses yet.</div>'}
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
          <label>Date<input name="saleDate" type="date" value="${X()}" required /></label>
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
            ${t.map(l=>`<div class="table-row"><div>${v(l.saleNumber)}</div><div>${v(l.saleDate)}</div><div>${N(l.cashAmount)}</div><div>${N(l.gcashAmount)}</div><div><strong>${N(l.totalAmount)}</strong></div><div class="row-actions"><button class="secondary edit-sale-btn" data-id="${l.id}" type="button">Edit</button>${r?`<button class="secondary delete-sale-btn" data-id="${l.id}" type="button">Delete</button>`:""}</div></div>`).join("")||'<div class="helper">No daily sales totals yet.</div>'}
          </div>
        </div>
      </article>
    </section>
    `}
  `}function rs(e,t,a,s,r,n,i,o,u){const l=c.reportPreview?Tt(e,t,a,s,r,n,c.reportPreview):null;return`
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
            <label>From<input name="dateFrom" data-date-from type="date" value="${X()}" /></label>
            <label>To<input name="dateTo" data-date-to type="date" value="${X()}" /></label>
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
    ${l?`
      <section class="panel report-preview">
        ${l.selectedTypes.has("sales")?`
          <article>
            ${x("Sales report preview",`${l.selection.from} to ${l.selection.to}`)}
            <div class="table wide-table report-preview-table sales-table">
              <div class="table-head report-table-head"><div>Ticket</div><div>Customer</div><div>Cash</div><div>GCash</div><div>Total Payment</div></div>
              ${l.salesRows().transactions.map(d=>`<div class="table-row report-table-row"><div>${v(d.ticket)}</div><div>${v(d.customer)}</div><div>${N(d.cash)}</div><div>${N(d.gcash)}</div><div>${N(d.total)}</div></div>`).join("")}
            </div>
            <div class="sales-summary-section">
              <h3>Sales Summary</h3>
              <div class="table sales-summary-table">
                <div class="table-head"><div>Sales Type</div><div>Cash</div><div>GCash</div><div>Sales</div></div>
                <div class="table-row"><div>Orders</div><div>${N(l.salesRows().orderCashTotal)}</div><div>${N(l.salesRows().orderGcashTotal)}</div><div>${N(l.salesRows().orderCashTotal+l.salesRows().orderGcashTotal)}</div></div>
                <div class="table-row"><div>Whole Sale Day</div><div>${N(l.salesRows().manualCashTotal)}</div><div>${N(l.salesRows().manualGcashTotal)}</div><div>${N(l.salesRows().manualCashTotal+l.salesRows().manualGcashTotal)}</div></div>
                <div class="table-row total-row"><div>Total</div><div>${N(l.salesRows().totalCash)}</div><div>${N(l.salesRows().totalGcash)}</div><div>${N(l.salesRows().totalSales)}</div></div>
              </div>
            </div>
          </article>`:""}
        ${l.selectedTypes.has("disbursement")?`
          <article>
            ${x("Disbursement preview",`${l.selection.from} to ${l.selection.to}`)}
            <div class="table wide-table report-preview-table report-disbursement-table">
              <div class="table-head report-table-head"><div>ID#</div><div>Date</div><div>Name</div><div>Category</div><div>Amount</div></div>
              ${l.disbursementRows().rows.slice(1).filter(d=>d.length&&d[0]!=="Total Disbursement").map(d=>`<div class="table-row report-table-row"><div>${v(d[1]??"")}</div><div>${v(d[0]??"")}</div><div>${v(d[2]??"")}</div><div>${v(d[3]??"")}</div><div>${N(d[5])}</div></div>`).join("")}
            </div>
            <div class="disbursement-total">
              <strong>Total Disbursement: ${N(l.disbursementRows().totalDisbursement)}</strong>
            </div>
          </article>`:""}
        ${l.selectedTypes.has("fold_count")?`
          <article>
            ${x("Fold Count preview",`${l.selection.from} to ${l.selection.to}`)}
            <div class="table report-preview-table">
              <div class="table-head"><div>Staff</div><div>Fold Count</div></div>
              ${l.foldCountRows().rows.slice(1).map(d=>`<div class="table-row">${d.map(m=>`<div>${v(m??"")}</div>`).join("")}</div>`).join("")}
            </div>
          </article>`:""}
        ${l.selectedTypes.has("revolving_fund")?`
          <article>
            ${x("Revolving Fund — Daily Summary",`${l.selection.from} to ${l.selection.to}`)}
            ${Ae(["Date of Sales","Cash on Hand","Status","Date Update"],l.revolvingDailySummaryRows().rows.slice(1).map(d=>[v(String(d[0]??"")),v(String(d[1]??"")),v(String(d[2]??"")),v(String(d[3]??""))]),"data-table revolving-report-table")}
          </article>
          <article>
            ${x("Revolving Fund — Table History",`${l.selection.from} to ${l.selection.to}`)}
            ${Ae(["Date","Number","Name","Amount","Category","Description","Type"],l.revolvingHistoryRows().rows.slice(1).map(d=>[v(String(d[0]??"")),v(String(d[1]??"")),v(String(d[2]??"")),v(String(d[3]??"")),v(String(d[4]??"")),v(String(d[5]??"")),v(String(d[6]??""))]),"data-table revolving-report-table")}
          </article>`:""}
        ${l.selectedTypes.has("summary")?`
          <article>
            ${x("Summary preview",`${l.selection.from} to ${l.selection.to}`)}
            <div class="summary-cards-grid summary-single-row">
              <div class="summary-card"><span class="card-label">Total Sales</span><div class="card-details"><span>Total Cash: ${N(l.salesRows().totalCash)}</span><span>Total GCash: ${N(l.salesRows().totalGcash)}</span></div><strong>${N(l.salesRows().totalSales)}</strong></div>
              <div class="summary-card"><span class="card-label">Total Disbursement</span><strong>${N(l.disbursementRows().totalDisbursement)}</strong></div>
              <div class="summary-card"><span class="card-label">Cash on Hand</span><strong>${N(Ce(l.salesRows().totalCash,l.disbursementRows().totalDisbursement))}</strong></div>
            </div>
          </article>`:""}
      </section>
    `:""}
  `}function ns(e,t){return`
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
          ${e.map(a=>`<div class="table-row"><div><strong>${v(a.name)}</strong></div><div>${v(a.category)}</div><div>${N(a.price)}</div><div>${a.maxKg} kg</div><div>${a.isActive?"Active":"Inactive"}</div></div>`).join("")}
        </div>
      </article>
    </section>
  `}function is(e,t,a){const s=e.filter(n=>n.status!=="under_cleaning"),r=e.filter(n=>n.status==="under_cleaning");return`
    <section class="page-head">
      <div>
        <h2>Maintenance & Cleaning</h2>
        <p class="meta">Manage machine subcleaning and maintenance records.</p>
      </div>
      <div class="segmented">
        <button class="${c.maintenanceTab==="cleaning"?"is-active":""}" data-maintenance-tab="cleaning" type="button">Subcleaning</button>
        <button class="${c.maintenanceTab==="machines"?"is-active":""}" data-maintenance-tab="machines" type="button">Machine Management</button>
      </div>
    </section>
    ${c.maintenanceTab==="cleaning"?`
    <section class="grid content full">
      <article class="panel">
        ${x("Available Machines","Select machines to start cleaning.")}
        <form id="subcleaning-form" class="form">
          <input type="hidden" name="date" value="${X()}" />
          <fieldset class="machine-list">
            ${s.map(n=>`<label class="machine-card"><input type="checkbox" name="machineIds" value="${n.id}" /><span><strong>${v(n.machineName)}</strong><small>${v(n.machineType)}</small></span><em></em></label>`).join("")||'<p class="helper">All machines are currently being cleaned.</p>'}
          </fieldset>
          <input type="hidden" name="cleaningStatus" value="in_progress" />
          <label>Notes <textarea name="notes" placeholder="e.g. Deep clean filters"></textarea></label>
          <input type="hidden" name="branch" value="${v(a)}" />
          <button class="primary" type="submit">Start Cleaning</button>
        </form>
      </article>
      <article class="panel warning-panel">
        ${x("Under Cleaning","Machines currently being serviced.")}
        <div class="machine-stack">
          ${r.length?r.map(n=>`
            <div class="machine-status">
              <span><strong>${v(n.machineName)}</strong><small>${v(n.machineType)}</small></span>
              <b>In progress</b>
              <button class="secondary complete-cleaning-btn" type="button" data-machine-id="${n.id}" data-branch="${v(a)}">Mark Complete</button>
            </div>`).join(""):'<p class="helper">No machines under cleaning right now.</p>'}
        </div>
      </article>
      <article class="panel span-2">
        ${x("Daily Cleaning Checklist","Track which machines have been cleaned today.")}
        <div class="table">
          <div class="table-head"><div>Machine</div><div>Type</div><div>Status</div><div>Notes</div><div>Date</div></div>
          ${e.map(n=>{const i=t.find(o=>o.machineIds.includes(n.id)&&o.date===X());return`<div class="table-row"><div><strong>${v(n.machineName)}</strong></div><div>${v(n.machineType)}</div><div>${i?v(i.cleaningStatus.replace("_"," ")):"Not Cleaned"}</div><div>${v(i?.notes??"-")}</div><div>${X()}</div></div>`}).join("")}
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
          <input type="hidden" name="branch" value="${v(a)}" />
          <button class="primary" type="submit">Add machine</button>
        </form>
      </article>
      <article class="panel">
        ${x("Machines","Washer and dryer status")}
        <div class="table">
          <div class="table-head"><div>Name</div><div>Type</div><div>Status</div><div>Branch</div><div>Actions</div></div>
          ${e.map(n=>`<div class="table-row"><div><strong>${v(n.machineName)}</strong></div><div>${v(n.machineType)}</div><div>${v(n.status.replace("_"," "))}</div><div>${v(n.branch)}</div>
          <div class="row-actions">
            ${n.status!=="inactive"?`<button class="secondary deactivate-machine-btn" data-id="${n.id}">Deactivate</button>`:`<button class="secondary activate-machine-btn" data-id="${n.id}">Activate</button>`}
          </div></div>`).join("")||'<div class="helper">No machines found.</div>'}
        </div>
      </article>
    </section>
    `}
  `}function os(e,t){return`
    <section class="grid">
      <div class="page-head">
        <div>
          <p class="eyebrow">Team Management</p>
          <h2>Staff Overview</h2>
        </div>
        <button class="primary" id="open-add-staff-modal" type="button">+ Add staff</button>
      </div>

      <article class="panel">
        ${x("Staff list","Branch: "+v(t))}
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
  `}function cs(e,t,a){return`
    <section class="grid content full">
      <article class="panel">
        ${x("Settings","Device-local configuration")}
        <form id="settings-form" class="form">
          <label>Current branch<select name="branch">
            ${["Main Store","Mintal Branch","Gensan Branch"].map(s=>`<option value="${s}" ${s===e?"selected":""}>${s}</option>`).join("")}
          </select></label>
          <label>Fold rate<input name="foldRate" type="number" min="0" step="0.01" value="${t}" /></label>
          <label>Report email<input name="reportEmail" type="email" placeholder="admin@laba101.test" value="${v(a)}" /></label>
          <button class="primary" type="submit">Save settings</button>
        </form>
      </article>
    </section>
  `}function ls(){const e=()=>{localStorage.removeItem(ye),c.currentUser=null,c.tab="dashboard",c.receiptOrderId=0,c.sidebarOpen=!1,S()};document.querySelector("#logout-button")?.addEventListener("click",e),document.querySelector("#mobile-logout-button")?.addEventListener("click",e),document.querySelector("#mobile-menu-button")?.addEventListener("click",()=>{c.sidebarOpen=!0,S()}),document.querySelector("#sidebar-close-button")?.addEventListener("click",()=>{c.sidebarOpen=!1,S()}),document.querySelector("#sidebar-backdrop")?.addEventListener("click",()=>{c.sidebarOpen=!1,S()}),document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{c.tab=t.dataset.tab,c.receiptOrderId=0,c.sidebarOpen=!1,S()})}),document.querySelectorAll("[data-quick-tab]").forEach(t=>{t.addEventListener("click",()=>{c.tab=t.dataset.quickTab,S()})}),document.querySelectorAll("[data-receipt]").forEach(t=>{t.addEventListener("click",()=>{c.receiptOrderId=Number(t.dataset.receipt),c.printerPanelOpen=!1,c.printerError="",c.printerStatus="",S()})}),document.querySelector("[data-close-receipt]")?.addEventListener("click",()=>{c.receiptOrderId=0,S()}),document.querySelector("[data-open-printer-panel]")?.addEventListener("click",()=>{c.printerPanelOpen=!c.printerPanelOpen,c.printerPanelOpen&&c.pairedPrinters.length===0?nt():S()}),document.querySelector("[data-refresh-printers]")?.addEventListener("click",()=>{nt()}),document.querySelector("[data-printer-select]")?.addEventListener("change",t=>{c.selectedPrinterAddress=t.currentTarget.value,S()}),document.querySelector("[data-paper-width]")?.addEventListener("change",t=>{c.printerPaperWidth=Number(t.currentTarget.value)===80?80:58,S()}),document.querySelector("[data-connect-printer]")?.addEventListener("click",()=>{za()}),document.querySelector("[data-thermal-print]")?.addEventListener("click",()=>{(async()=>{const t=await Nt(),a=t.orders.find(r=>r.id===c.receiptOrderId);if(!a)throw new Error("Receipt order not found.");const s=t.payments.filter(r=>r.orderId===a.id);await es(a,s)})().catch(t=>{c.printerPanelOpen=!0,c.printerError=t instanceof Error?t.message:"Bluetooth thermal print failed.",S()})}),document.querySelectorAll("[data-report-tab]").forEach(t=>{t.addEventListener("click",()=>{c.dailyReportTab=t.dataset.reportTab,S()})}),document.querySelectorAll("[data-maintenance-tab]").forEach(t=>{t.addEventListener("click",()=>{c.maintenanceTab=t.dataset.maintenanceTab,S()})})}function ds(){Ka(),document.querySelector("#login-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget),a=document.querySelector("#login-button");a&&(a.disabled=!0,a.textContent="Signing in...");try{const s=await ft(String(t.get("email")??""),String(t.get("password")??""));if(!s){c.loginError="Invalid email or password.",await S();return}c.currentUser=s,c.loginError="",await Se("branch",String(s.branch||"Main Store")),t.get("remember")?localStorage.setItem(ye,JSON.stringify({email:s.email,remembered:!0})):localStorage.removeItem(ye),At().includes(c.tab)||(c.tab="dashboard"),await S()}catch(s){alert("Login Error: "+String(s?.message||s)),a&&(a.disabled=!1,a.textContent="Sign in")}})}function us(){be&&window.clearInterval(be);const e=document.querySelector("[data-navbar-time]"),t=document.querySelector("[data-navbar-date]");if(!e||!t){be=void 0;return}const a=()=>{const s=ja();e.textContent=s.time,t.textContent=s.date};a(),be=window.setInterval(a,1e3)}function it(e,t){return e?t.find(a=>a.name.toLowerCase()===e.category.toLowerCase())??t.find(a=>a.name==="Regular Clothes")??t[0]??null:null}function Oe(e,t){return Math.max(1,Number(t.maxKg||e.maxKg||1))}function Ct(e,t){return Object.fromEntries(t.filter(a=>a.serviceType==="order").map(a=>[a.id,Number(e.querySelector(`input[name="serviceQty-${a.id}"]`)?.value??0)]).filter(([,a])=>Number(a)>0))}function ot(e,t){const a=Ct(e,t);return t.filter(s=>s.serviceType==="order"&&Number(a[s.id]??0)>0).map(s=>({...s,quantity:Number(a[s.id])}))}function $t(e,t){return Object.fromEntries(t.filter(a=>a.serviceType==="addon").map(a=>[a.id,Number(e.querySelector(`input[name="addonQty-${a.id}"]`)?.value??0)]).filter(([,a])=>Number(a)>0))}function ct(e,t){const a=$t(e,t);return t.filter(s=>s.serviceType==="addon"&&Number(a[s.id]??0)>0).map(s=>({...s,quantity:Number(a[s.id])}))}function ms(e){const t=document.querySelector("#order-form"),a=document.querySelector("#price-preview"),s=t?.querySelector('button[type="submit"]'),r=t?.querySelector('select[name="customerId"]'),n=t?.querySelector('input[name="customerName"]'),i=t?.querySelector('input[name="customerPhone"]'),o=t?.querySelector("[data-order-error]"),u=t?.querySelector('select[name="paymentMethod"]'),l=t?.querySelector(".gcash-reference"),d=t?.querySelector('input[name="paymentReference"]');let m=!1;const y=()=>{if(!r||!n||!i)return;const p=r.selectedOptions[0];n.value=p?.dataset.name??"",i.value=p?.dataset.phone??""},f=()=>{const p=u?.value==="gcash";l&&(l.hidden=!p),d&&(d.required=p,p||(d.value=""))},b=(p,T)=>{if(!t)return;const h=t.querySelector(`input[name="${p}"]`);h&&(h.value=String(Math.max(0,Number(h.value||0)+T)),h.closest(".qty-card")?.classList.toggle("is-selected",Number(h.value)>0),h.dispatchEvent(new Event("input",{bubbles:!0})))};t?.querySelectorAll(".qty-control input").forEach(p=>{p.addEventListener("input",()=>{p.value=String(Math.max(0,Number(p.value||0))),p.closest(".qty-card")?.classList.toggle("is-selected",Number(p.value)>0)})}),t?.querySelectorAll("[data-qty-card]").forEach(p=>{p.addEventListener("click",T=>{const h=T.target;h.closest("input")||h.closest("button")||b(p.dataset.qtyCard??"",1)})}),t?.querySelectorAll("[data-qty-plus]").forEach(p=>{p.addEventListener("click",()=>b(p.dataset.qtyPlus??"",1))}),t?.querySelectorAll("[data-qty-minus]").forEach(p=>{p.addEventListener("click",()=>b(p.dataset.qtyMinus??"",-1))});const E=()=>{if(!t||!a)return;const p=ot(t,e.services),T=p[0],h=it(T,e.categories),A=ct(t,e.services);if(!p.length||!T||!h){s&&(s.disabled=!0),o&&(o.hidden=!m,o.textContent=m?"Please select at least one service quantity.":""),a.innerHTML='<div class="preview-total"><span>Total amount</span><strong>PHP 0.00</strong></div>';return}const O=Ie(p,h,Oe(T,h),A),R=O.serviceLines.map(q=>`${q.name} x${q.quantity}`),U=O.extras.map(q=>`${Z(q.name)} x${q.quantity}`);s&&(s.disabled=!1),o&&(o.hidden=!0,o.textContent=""),a.classList.remove("has-error"),a.innerHTML=`
      <div class="preview-line"><span>Services${R.length?` (${v(R.join(", "))})`:""}</span><strong>${N(O.price)}</strong></div>
      ${O.extraServiceAmount>0?`<div class="preview-line"><span>Extra services${U.length?` (${v(U.join(", "))})`:""}</span><strong>${N(O.extraServiceAmount)}</strong></div>`:""}
      <div class="preview-total"><span>Total amount</span><strong>${N(O.totalAmount)}</strong></div>
    `};r?.addEventListener("change",y),u?.addEventListener("change",f),f(),t?.addEventListener("input",E),t?.addEventListener("change",E),E(),t?.addEventListener("submit",async p=>{p.preventDefault(),m=!0;const T=new FormData(t),h=ot(t,e.services),A=h[0],O=it(A,e.categories),R=ct(t,e.services);if(!h.length||!A||!O){o&&(o.hidden=!1,o.textContent="Please select at least one service quantity.");return}const U=h.map(P=>`${P.name} x${P.quantity}`).join(", "),q=Ie(h,O,Oe(A,O),R);if(confirm(`Save this order?

Services: ${U}
Total: ${N(q.totalAmount)}`))try{await pa({customerId:Number(T.get("customerId"))||void 0,customerName:String(T.get("customerName")??""),customerPhone:String(T.get("customerPhone")??"")||null,serviceQuantities:Ct(t,e.services),branch:e.branch,itemCategoryId:O?.id,weightKg:A&&O?Oe(A,O):void 0,addonQuantities:$t(t,e.services),paidAmount:Number(T.get("paidAmount")??0),paymentMethod:String(T.get("paymentMethod")??"cash"),paymentReference:String(T.get("paymentReference")??"")||null,notes:String(T.get("notes")??"")||null}),await S()}catch(P){o&&(o.hidden=!1,o.textContent=P instanceof Error?P.message:"Order could not be saved.")}}),document.querySelectorAll(".advance-form").forEach(p=>{p.addEventListener("submit",async T=>{T.preventDefault();const h=new FormData(p);await ya(Number(p.dataset.orderId),Number(h.get("assignedStaffId"))||null),await S()})}),document.querySelectorAll(".payment-form").forEach(p=>{const T=p.querySelector('select[name="method"]'),h=p.querySelector('input[name="reference"]'),A=()=>{const O=T?.value==="gcash";h&&(h.hidden=!O,h.required=O,O||(h.value=""))};T?.addEventListener("change",A),A(),p.addEventListener("submit",async O=>{O.preventDefault();const R=new FormData(p),U=Number(R.get("amount")),q=String(R.get("method")),P=String(R.get("reference")??"")||null;confirm(`Confirm payment of ${N(U)} via ${q.toUpperCase()}?`)&&(await gt(Number(p.dataset.orderId),{amount:U,method:q,reference:P}),await S())})}),document.querySelectorAll("[data-cancel-order]").forEach(p=>{p.addEventListener("click",async()=>{const T=Number(p.dataset.cancelOrder);if(Number.isFinite(T)&&confirm("Cancel this order? (No payment will be refunded.)"))try{c.receiptOrderId===T&&(c.receiptOrderId=0),await ga(T),await S()}catch(h){alert(h instanceof Error?h.message:"Cancel failed.")}})}),document.querySelectorAll("[data-delete-order]").forEach(p=>{p.addEventListener("click",async()=>{const T=Number(p.dataset.deleteOrder);if(Number.isFinite(T)&&confirm("Delete this paid order and update sales?"))try{c.receiptOrderId===T&&(c.receiptOrderId=0),await ba(T),await S()}catch(h){alert(h instanceof Error?h.message:"Delete failed.")}})})}function vs(e){document.querySelector("#service-form")?.addEventListener("submit",async t=>{t.preventDefault();const a=new FormData(t.currentTarget),s=a.get("id")?Number(a.get("id")):void 0;await et({id:s,name:String(a.get("name")??""),description:String(a.get("description")??"")||null,category:String(a.get("category")??""),serviceType:String(a.get("serviceType")??"order"),price:Number(a.get("price")??0),maxKg:Number(a.get("maxKg")??0),dryingMinutes:Number(a.get("dryingMinutes"))||null,includes:a.getAll("includes").map(String).filter(Boolean),additionalCharge:0,turnaroundHours:Number(a.get("turnaroundHours")??24),isActive:1}),await S()}),document.querySelectorAll(".edit-service-btn").forEach(t=>{t.addEventListener("click",()=>{const a=Number(t.dataset.id),s=e.find(n=>n.id===a),r=document.querySelector("#service-form");s&&r&&(r.querySelector("[name=id]").value=String(s.id),r.querySelector("[name=name]").value=s.name,r.querySelector("[name=category]").value=s.category,r.querySelector("[name=serviceType]").value=s.serviceType,r.querySelector("[name=price]").value=String(s.price),r.querySelector("[name=maxKg]").value=String(s.maxKg),r.querySelector("[name=dryingMinutes]").value=s.dryingMinutes?String(s.dryingMinutes):"",r.querySelectorAll('input[name="includes"]').forEach(n=>{n.checked=s.includes.includes(n.value)}),r.querySelector("[name=turnaroundHours]").value=String(s.turnaroundHours),r.querySelector("[name=description]").value=s.description??"",window.scrollTo({top:0,behavior:"smooth"}))})}),document.querySelectorAll(".deactivate-service-btn, .activate-service-btn").forEach(t=>{t.addEventListener("click",async()=>{const a=Number(t.dataset.id),s=e.find(r=>r.id===a);if(s){const r=s.isActive?0:1;await et({id:s.id,name:s.name,description:s.description,category:s.category,serviceType:s.serviceType,price:s.price,maxKg:s.maxKg,dryingMinutes:s.dryingMinutes,includes:s.includes,additionalCharge:s.additionalCharge,turnaroundHours:s.turnaroundHours,isActive:r}),await S()}})}),document.querySelector("#category-form")?.addEventListener("submit",async t=>{t.preventDefault();const a=new FormData(t.currentTarget);await ma({name:String(a.get("name")??""),maxKg:Number(a.get("maxKg")??0),additionalFee:Number(a.get("additionalFee")??0),isActive:1}),await S()})}function ps(e){const t=document.querySelector("#expense-form");t?.addEventListener("submit",async a=>{a.preventDefault();const s=new FormData(a.currentTarget),r=Number(s.get("id")||0),n={expenseDate:String(s.get("expenseDate")??""),name:String(s.get("name")??""),category:String(s.get("category")??""),description:String(s.get("description")??""),amount:Number(s.get("amount")??0)};r?await La(r,n):await Aa(n),await S()}),document.querySelectorAll(".edit-expense-btn").forEach(a=>{a.addEventListener("click",()=>{const s=e.find(n=>n.id===Number(a.dataset.id));if(!s||!t)return;t.querySelector("[name=id]").value=String(s.id),t.querySelector("[name=expenseDate]").value=s.expenseDate,t.querySelector("[name=amount]").value=String(s.amount),t.querySelector("[name=name]").value=s.name,t.querySelector("[name=category]").value=s.category,t.querySelector("[name=description]").value=s.description??"";const r=t.querySelector('button[type="submit"]');r&&(r.textContent="Update expense"),t.scrollIntoView({behavior:"smooth",block:"start"})})}),document.querySelectorAll(".delete-expense-btn").forEach(a=>{a.addEventListener("click",async()=>{if(c.currentUser?.role!=="admin")return;const s=Number(a.dataset.id);!Number.isFinite(s)||!confirm("Delete this disbursement?")||(await Ca(s),await S())})}),document.querySelector("#fold-form")?.addEventListener("submit",async a=>{a.preventDefault();const s=new FormData(a.currentTarget);await Sa({orderTicket:String(s.get("orderTicket")??""),staffName:String(s.get("staffName")??""),foldCount:Number(s.get("foldCount")??1),rate:Number(s.get("rate")??5)}),await S()})}function fs(e,t,a,s,r,n){document.querySelector("#generate-report")?.addEventListener("click",()=>{c.reportPreview=Ee(),S()});const i=document.querySelector("#sales-form");i?.addEventListener("submit",async b=>{b.preventDefault();const E=new FormData(b.currentTarget);await Ra({id:Number(E.get("id")||0)||void 0,saleDate:String(E.get("saleDate")??""),cashAmount:Number(E.get("cashAmount")??0),gcashAmount:Number(E.get("gcashAmount")??0),notes:String(E.get("notes")??"")}),await S()}),document.querySelectorAll(".edit-sale-btn").forEach(b=>{b.addEventListener("click",()=>{const E=a.find(T=>T.id===Number(b.dataset.id));if(!E||!i)return;i.querySelector("[name=id]").value=String(E.id),i.querySelector("[name=saleDate]").value=E.saleDate,i.querySelector("[name=cashAmount]").value=String(E.cashAmount),i.querySelector("[name=gcashAmount]").value=String(E.gcashAmount),i.querySelector("[name=notes]").value=E.notes??"";const p=i.querySelector('button[type="submit"]');p&&(p.textContent="Update daily sale"),i.scrollIntoView({behavior:"smooth",block:"start"})})}),document.querySelectorAll(".delete-sale-btn").forEach(b=>{b.addEventListener("click",async()=>{if(c.currentUser?.role!=="admin")return;const E=Number(b.dataset.id);!Number.isFinite(E)||!confirm("Delete this daily sale?")||(await Da(E),await S())})});const o=document.querySelector("[data-date-from]"),u=document.querySelector("[data-date-to]");document.querySelectorAll("[data-date-scope]").forEach(b=>{b.addEventListener("change",()=>{if(!b.checked||!o||!u)return;const E=new Date,p=he(E),T=new Date(E);b.value==="week"&&T.setDate(E.getDate()-6),b.value==="month"&&T.setDate(1),b.value!=="custom"&&(o.value=b.value==="today"?p:he(T),u.value=p)})});const l=b=>{const E=h=>String(h??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;"),p=h=>h==="Sales Report"?[110,125,150,215,95,95,105,105]:h==="Disbursement"?[110,115,150,220,105]:h==="Fold Count"?[220,125]:h==="Revolving Daily Summary"?[115,105,120,115]:h==="Revolving History"?[115,96,140,96,110,180,120]:[155,125,125,125,95,95,115,115];return`<?xml version="1.0"?>
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
  ${b.map(h=>{const A=p(h.name).map(R=>`<Column ss:Width="${R}" ss:AutoFitWidth="0"/>`).join(""),O=h.rows.map(R=>{if(!R.length)return'<Row ss:Height="10" ss:StyleID="BorderRow"><Cell ss:StyleID="BorderCell"><Data ss:Type="String">&nbsp;</Data></Cell></Row>';const U=R[0]==="Type"||R[0]==="Summary"||R[0]==="Sales Summary"||R[0]==="Disbursement Summary"||R[0]==="Staff"||R[0]==="Date of Sales"||R[0]==="Date",q=U?"HeaderRow":"BorderRow",P=U?"HeaderCell":"BorderCell",F=U?26:22,M=R.map(_=>`<Cell ss:StyleID="${P}"><Data ss:Type="${typeof _=="number"?"Number":"String"}">${E(_)}</Data></Cell>`).join("");return`<Row ss:Height="${F}" ss:StyleID="${q}">${M}</Row>`}).join("");return`
        <Worksheet ss:Name="${E(h.name)}">
          <Table>
            ${A}
            ${O}
          </Table>
        </Worksheet>`}).join("")}
</Workbook>`},d=()=>{const b=Ee(),E=Tt(e,t,a,s,r,n,b),p=[];if(E.selectedTypes.has("sales")){const A=E.salesRows(),O=[["Ticket","Customer","Cash","GCash","Total Payment"],...A.transactions.map(R=>[R.ticket,R.customer,R.cash,R.gcash,R.total]),[],["Cash from Orders","GCash from Orders","Sales from Orders"],[A.orderCashTotal,A.orderGcashTotal,A.orderCashTotal+A.orderGcashTotal],[],["Cash Whole Sale","GCash Whole Sale","Whole Sale of Day"],[A.manualCashTotal,A.manualGcashTotal,A.manualCashTotal+A.manualGcashTotal],[],["Total Cash","Total GCash","Total Sales"],[A.totalCash,A.totalGcash,A.totalSales]];p.push({name:"Sales Report",rows:O})}E.selectedTypes.has("disbursement")&&p.push({name:"Disbursement",rows:E.disbursementRows().rows}),E.selectedTypes.has("fold_count")&&p.push({name:"Fold Count",rows:E.foldCountRows().rows}),E.selectedTypes.has("revolving_fund")&&(p.push({name:"Revolving Daily Summary",rows:E.revolvingDailySummaryRows().rows}),p.push({name:"Revolving History",rows:E.revolvingHistoryRows().rows})),E.selectedTypes.has("summary")&&p.push({name:"Summary",rows:E.summaryRows()});const T=l(p.length?p:[{name:"Summary",rows:E.summaryRows()}]),h=`laba101-report-${b.from}-to-${b.to}.xls`;return new File([T],h,{type:"application/vnd.ms-excel"})},m=async()=>{const b=d();if(!C.isNativePlatform())return{fileName:b.name,uri:""};const E=await b.text(),p=b.name;await Qe.writeFile({path:p,data:E,directory:we.External,encoding:Pe.UTF8});const{uri:T}=await Qe.getUri({path:p,directory:we.External});return{fileName:b.name,uri:T}},y=()=>{const b=d(),E=Ee(),p=`laba101-report-${E.from}-to-${E.to}.xls`,T=b,h=URL.createObjectURL(T),A=document.createElement("a");return A.href=h,A.download=p,document.body.appendChild(A),A.click(),setTimeout(()=>{A.remove(),URL.revokeObjectURL(h)},1e3),p},f=async b=>{const E=document.querySelector(b==="export"?"#export-report":"#email-report");E&&(E.disabled=!0,E.textContent=b==="export"?"Exporting...":"Sending...");try{if(b==="export")if(C.isNativePlatform()){const p=await m();alert(`Report exported as "${p.fileName}".`)}else{const p=y();alert(`Report saved: ${p}`)}else{const p=await vt("report_email")||"";if(!p){alert("Please configure a report email in Settings first.");return}const T=Ee(),h=`Laba101 report ${T.from} to ${T.to}`;if(C.isNativePlatform()){const A=await m();try{await Wt.share({title:h,text:`Please find the attached Laba101 report file: ${A.fileName}`,files:[A.uri],dialogTitle:"Send report via email"}),alert(`Report saved and shared as "${A.fileName}".`)}catch(O){const R=String(O).toLowerCase();if(R.includes("share canceled")||R.includes("canceled"))alert(`Report saved as "${A.fileName}".`);else throw O}}else{const A=y(),O=`Hi,

Please find the attached Laba101 report file: ${A}

Date range: ${T.from} to ${T.to}`,R=`mailto:${p}?subject=${encodeURIComponent(h)}&body=${encodeURIComponent(O)}`;setTimeout(()=>{window.location.href=R},800),alert(`Report downloaded as "${A}".
Your email app will open — please attach the file and send.`)}}}catch(p){alert("Failed: "+String(p))}finally{E&&(E.disabled=!1,E.textContent=b==="export"?"Export Excel":"Send to Email")}};document.querySelector("#export-report")?.addEventListener("click",async()=>{await f("export")}),document.querySelector("#email-report")?.addEventListener("click",async()=>{await f("email")})}function ys(){document.querySelector("#order-queue-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);c.orderSearch=String(t.get("orderSearch")??"").trim(),c.orderDateFilter=String(t.get("orderDateFilter")??"").trim(),c.orderPaymentFilter=String(t.get("orderPaymentFilter")??"").trim(),S()}),document.querySelector("#order-queue-clear")?.addEventListener("click",()=>{c.orderSearch="",c.orderDateFilter="",c.orderPaymentFilter="",S()}),document.querySelector("#archived-order-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);c.archivedOrderSearch=String(t.get("archivedOrderSearch")??"").trim(),S()}),document.querySelector("#archived-order-clear")?.addEventListener("click",()=>{c.archivedOrderSearch="",S()})}function hs(){document.querySelector("#customer-search-form")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);c.customerSearch=String(t.get("customerSearch")??"").trim(),S()}),document.querySelector("#customer-search-clear")?.addEventListener("click",()=>{c.customerSearch="",S()})}function gs(){document.querySelector("#machine-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await Pa({machineName:String(t.get("machineName")??""),machineType:String(t.get("machineType")),status:String(t.get("status")),branch:String(t.get("branch")??"")}),await S()}),document.querySelector("#subcleaning-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=e.currentTarget.querySelector('button[type="submit"]');t&&(t.disabled=!0,t.textContent="Starting...");const a=new FormData(e.currentTarget),s=a.getAll("machineIds").map(Number);if(!s.length){alert("Please select at least one machine to clean."),t&&(t.disabled=!1,t.textContent="Start Cleaning");return}await qa({date:String(a.get("date")??""),machineIds:s,cleaningStatus:String(a.get("cleaningStatus")??""),notes:String(a.get("notes")??""),branch:String(a.get("branch")??"")}),await S()}),document.querySelectorAll(".complete-cleaning-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.machineId),a=e.dataset.branch??"";e.disabled=!0,e.textContent="Completing...",await Fa(t,a),await S()})}),document.querySelectorAll(".deactivate-machine-btn, .activate-machine-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.id),a=e.classList.contains("deactivate-machine-btn");await xa(t,a?"inactive":"available"),await S()})})}function bs(e){const t=document.querySelector("#add-staff-modal"),a=document.querySelector("#open-add-staff-modal"),s=document.querySelector("#close-add-staff-modal"),r=document.querySelector("#staff-form"),n=()=>{r?.reset(),r&&(r.querySelector("[name=id]").value="");const o=document.querySelector("#add-staff-title");o&&(o.textContent="Add staff member"),t?.removeAttribute("hidden")},i=()=>{t?.setAttribute("hidden",""),r?.reset()};a?.addEventListener("click",n),s?.addEventListener("click",i),t?.addEventListener("click",o=>{o.target===t&&i()}),document.querySelectorAll(".edit-staff-btn").forEach(o=>{o.addEventListener("click",()=>{const u=Number(o.dataset.id),l=e.find(d=>d.id===u);if(l&&r){r.querySelector("[name=id]").value=String(l.id),r.querySelector("[name=name]").value=l.name,r.querySelector("[name=email]").value=l.email,r.querySelector("[name=password]").value=l.password,r.querySelector("[name=role]").value=l.role,r.querySelector("[name=branch]").value=l.branch;const d=document.querySelector("#add-staff-title");d&&(d.textContent="Edit staff member"),t?.removeAttribute("hidden")}})}),document.querySelectorAll(".deactivate-staff-btn, .activate-staff-btn").forEach(o=>{o.addEventListener("click",async()=>{const u=Number(o.dataset.id),l=e.find(d=>d.id===u);l&&(await Ze(u,{isActive:l.isActive!==0?0:1}),await S())})}),r?.addEventListener("submit",async o=>{o.preventDefault();const u=document.querySelector("#staff-save-btn");u&&(u.disabled=!0,u.textContent="Saving...");const l=new FormData(r),d=l.get("id")?Number(l.get("id")):void 0,m=String(l.get("name")??"").trim(),y=String(l.get("email")??"").trim(),f=String(l.get("password")??"password")||"password",b=String(l.get("role")),E=String(l.get("branch")??"");if(!m||!y){alert("Name and email are required."),u&&(u.disabled=!1,u.textContent="Save staff member");return}try{d?await Ze(d,{name:m,email:y,password:f,role:b,branch:E}):await ca({name:m,email:y,password:f,role:b,branch:E}),i(),await S()}catch{alert("Failed to save staff. The email may already be in use."),u&&(u.disabled=!1,u.textContent="Save staff member")}})}function Es(){document.querySelector("#settings-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await Se("branch",String(t.get("branch")??"Main Store")),await Se("fold_rate",String(t.get("foldRate")??"5")),String(t.get("reportEmail")??"")&&await Se("report_email",String(t.get("reportEmail"))),alert("Settings saved successfully!"),await S()})}await na();const lt=localStorage.getItem(ye);if(lt)try{const e=JSON.parse(lt);if(e.email&&e.remembered){const t=await ft(e.email,"password")??null;c.currentUser=t}}catch{localStorage.removeItem(ye)}function Ss(e,t,a,s){const r=e.filter(f=>f.status==="revolving").reduce((f,b)=>f+b.cashAmount,0),n=t.filter(f=>f.type==="add").reduce((f,b)=>f+b.amount,0),i=t.filter(f=>f.type==="disbursement").reduce((f,b)=>f+b.amount,0),o=r+n-i,u=c.revolvingHistoryFrom||"0000-01-01",l=c.revolvingHistoryTo||"9999-12-31",d=t.filter(f=>{const b=W(f.createdAt);return b>=u&&b<=l}),m=e.map(f=>{const b=wt(f.saleDate,a,s,f.cashAmount),E=f.status==="revolving"?'<span class="ok">Revolving</span>':f.status==="endorsed"?`<span class="warn">Endorsed to ${v(f.endorsedTo)}</span>`:'<span class="meta">Pending</span>',p=f.status!=="revolving"&&f.status!=="endorsed"?`<div class="row-actions">
          <button class="primary revolving-btn" data-id="${f.id}">Revolving</button>
          <button class="secondary endorsed-btn" data-id="${f.id}" data-date="${ie(f.saleDate)}">Endorsed</button>
        </div>`:"";return[`<strong>${v(ie(f.saleDate))}</strong>`,`<strong class="ok">${N(b)}</strong>`,E,f.statusUpdatedAt?v(ie(f.statusUpdatedAt)):"-",p]}),y=d.map(f=>[Ma(f.createdAt),`<strong>${v(f.revolvingNumber)}</strong>`,v(f.name),`<strong class="${f.type==="disbursement"?"warn":"ok"}">${f.type==="disbursement"?"-":"+"}${N(f.amount)}</strong>`,v(f.category),v(f.description||"-"),`<span class="${f.type==="add"?"ok":"warn"}">${f.type==="add"?"Add Revolving Fund":"Disbursement"}</span>`]);return`
    <section class="grid content full">
      <div class="panel-header" style="display: flex; gap: 16px; margin-bottom: 24px; align-items: center;">
        <button class="primary" id="add-revolving-fund-btn">Add Revolving Fund</button>
        <button class="secondary" id="revolving-disbursement-btn">Disbursement</button>
      </div>

      <article class="panel">
        <div style="background-color: #061a42; color: white; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
          <p style="font-size: 12px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin: 0 0 8px 0;">Revolving Fund Total</p>
          <p style="font-size: 32px; font-weight: 800; margin: 0;">${N(o)}</p>
        </div>
        ${x("Daily Summary","Cash on hand per day (order cash + manual cash − disbursements)")}
        ${Ae(["Date of Sales","Cash on Hand","Status","Date Update","Action"],m,"data-table revolving-summary-datatable")}
      </article>

      <article class="panel">
        ${x("Revolving Table History","Filter by date — DISB numbers shared with Daily Report expenses")}
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
        ${Ae(["Date","Disbursement #","Name","Amount","Category","Description","Type"],y,"data-table revolving-history-datatable")}
      </article>

      ${c.endorseModalOpen?`
        <div class="modal-backdrop" role="presentation">
          <div class="receipt-modal" role="dialog" aria-modal="true" style="max-width: 400px; width: 90%;">
            <form id="endorse-form" class="form" style="padding: 24px;">
              <h3 style="margin-top: 0;">Endorse Money</h3>
              <p class="meta" style="margin-bottom: 16px;">Endorsing cash from <strong>${v(c.endorseSaleDate)}</strong>.</p>
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
  `}function ws(){document.querySelector("#revolving-history-filters")?.addEventListener("submit",async d=>{d.preventDefault();const m=new FormData(d.currentTarget);c.revolvingHistoryFrom=String(m.get("revolvingHistoryFrom")??"").trim(),c.revolvingHistoryTo=String(m.get("revolvingHistoryTo")??"").trim(),await S()}),document.querySelector("#revolving-history-clear")?.addEventListener("click",async()=>{c.revolvingHistoryFrom="",c.revolvingHistoryTo="",await S()}),document.querySelectorAll(".revolving-btn").forEach(d=>{d.addEventListener("click",async()=>{c.revolvingModalOpen=!0,c.revolvingSaleId=Number(d.dataset.id),await S()})});const e=document.getElementById("confirm-revolving-btn");e&&e.addEventListener("click",async()=>{await at(c.revolvingSaleId,"revolving",null,new Date().toISOString()),c.revolvingModalOpen=!1,await S()});const t=document.getElementById("close-revolving-modal");t&&t.addEventListener("click",async()=>{c.revolvingModalOpen=!1,await S()}),document.querySelectorAll(".endorsed-btn").forEach(d=>{d.addEventListener("click",async()=>{c.endorseModalOpen=!0,c.endorseSaleId=Number(d.dataset.id),c.endorseSaleDate=d.dataset.date??"",await S()})});const a=document.getElementById("close-endorse-modal");a&&a.addEventListener("click",async()=>{c.endorseModalOpen=!1,await S()});const s=document.getElementById("endorse-form");s&&s.addEventListener("submit",async d=>{d.preventDefault();const m=new FormData(s),y=String(m.get("endorsedTo")??"").trim();y&&(await at(c.endorseSaleId,"endorsed",y,new Date().toISOString()),c.endorseModalOpen=!1,await S())});const r=document.getElementById("add-revolving-fund-btn");r&&r.addEventListener("click",async()=>{c.addFundModalOpen=!0,await S()});const n=document.getElementById("close-add-fund-modal");n&&n.addEventListener("click",async()=>{c.addFundModalOpen=!1,await S()});const i=document.getElementById("add-fund-form");i&&i.addEventListener("submit",async d=>{d.preventDefault();const m=new FormData(i);await st({name:String(m.get("name")??"").trim(),amount:Number(m.get("amount")??0),category:"Add Revolving Fund",description:null,type:"add",createdAt:new Date().toISOString()}),c.addFundModalOpen=!1,await S()});const o=document.getElementById("revolving-disbursement-btn");o&&o.addEventListener("click",async()=>{c.disbursementModalOpen=!0,await S()});const u=document.getElementById("close-disbursement-modal");u&&u.addEventListener("click",async()=>{c.disbursementModalOpen=!1,await S()});const l=document.getElementById("disbursement-form");l&&l.addEventListener("submit",async d=>{d.preventDefault();const m=new FormData(l);await st({name:String(m.get("name")??"").trim(),amount:Number(m.get("amount")??0),category:String(m.get("category")??"").trim(),description:String(m.get("description")??"").trim(),type:"disbursement",expenseDate:X(),createdAt:new Date().toISOString()}),c.disbursementModalOpen=!1,await S()})}await S();export{Pe as E,qe as W,Ft as b};
