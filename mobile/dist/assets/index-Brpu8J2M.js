(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function a(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=a(r);fetch(r.href,n)}})();var K;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(K||(K={}));class fe extends Error{constructor(t,a,s){super(t),this.message=t,this.code=a,this.data=s}}const We=e=>{var t,a;return e?.androidBridge?"android":!((a=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},He=e=>{const t=e.CapacitorCustomPlatform||null,a=e.Capacitor||{},s=a.Plugins=a.Plugins||{},r=()=>t!==null?t.name:We(e),n=()=>r()!=="web",o=h=>{const u=d.get(h);return!!(u?.platforms.has(r())||i(h))},i=h=>{var u;return(u=a.PluginHeaders)===null||u===void 0?void 0:u.find(y=>y.name===h)},c=h=>e.console.error(h),d=new Map,p=(h,u={})=>{const y=d.get(h);if(y)return console.warn(`Capacitor plugin "${h}" already registered. Cannot register plugins twice.`),y.proxy;const v=r(),m=i(h);let b;const L=async()=>(!b&&v in u?b=typeof u[v]=="function"?b=await u[v]():b=u[v]:t!==null&&!b&&"web"in u&&(b=typeof u.web=="function"?b=await u.web():b=u.web),b),O=(x,I)=>{var M,j;if(m){const B=m?.methods.find(q=>I===q.name);if(B)return B.rtype==="promise"?q=>a.nativePromise(h,I.toString(),q):(q,V)=>a.nativeCallback(h,I.toString(),q,V);if(x)return(M=x[I])===null||M===void 0?void 0:M.bind(x)}else{if(x)return(j=x[I])===null||j===void 0?void 0:j.bind(x);throw new fe(`"${h}" plugin is not implemented on ${v}`,K.Unimplemented)}},$=x=>{let I;const M=(...j)=>{const B=L().then(q=>{const V=O(q,x);if(V){const J=V(...j);return I=J?.remove,J}else throw new fe(`"${h}.${x}()" is not implemented on ${v}`,K.Unimplemented)});return x==="addListener"&&(B.remove=async()=>I()),B};return M.toString=()=>`${x.toString()}() { [capacitor code] }`,Object.defineProperty(M,"name",{value:x,writable:!1,configurable:!1}),M},E=$("addListener"),g=$("removeListener"),R=(x,I)=>{const M=E({eventName:x},I),j=async()=>{const q=await M;g({eventName:x,callbackId:q},I)},B=new Promise(q=>M.then(()=>q({remove:j})));return B.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await j()},B},ve=new Proxy({},{get(x,I){switch(I){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return m?R:E;case"removeListener":return g;default:return $(I)}}});return s[h]=ve,d.set(h,{name:h,proxy:ve,platforms:new Set([...Object.keys(u),...m?[v]:[]])}),ve};return a.convertFileSrc||(a.convertFileSrc=h=>h),a.getPlatform=r,a.handleError=c,a.isNativePlatform=n,a.isPluginAvailable=o,a.registerPlugin=p,a.Exception=fe,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},Ge=e=>e.Capacitor=He(e),S=Ge(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),le=S.registerPlugin;class ye{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,a){let s=!1;this.listeners[t]||(this.listeners[t]=[],s=!0),this.listeners[t].push(a);const n=this.windowListeners[t];n&&!n.registered&&this.addWindowListener(n),s&&this.sendRetainedArgumentsForEvent(t);const o=async()=>this.removeListener(t,a);return Promise.resolve({remove:o})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,a,s){const r=this.listeners[t];if(!r){if(s){let n=this.retainedEventArguments[t];n||(n=[]),n.push(a),this.retainedEventArguments[t]=n}return}r.forEach(n=>n(a))}hasListeners(t){var a;return!!(!((a=this.listeners[t])===null||a===void 0)&&a.length)}registerWindowListener(t,a){this.windowListeners[a]={registered:!1,windowEventName:t,pluginEventName:a,handler:s=>{this.notifyListeners(a,s)}}}unimplemented(t="not implemented"){return new S.Exception(t,K.Unimplemented)}unavailable(t="not available"){return new S.Exception(t,K.Unavailable)}async removeListener(t,a){const s=this.listeners[t];if(!s)return;const r=s.indexOf(a);this.listeners[t].splice(r,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const a=this.retainedEventArguments[t];a&&(delete this.retainedEventArguments[t],a.forEach(s=>{this.notifyListeners(t,s)}))}}const Ne=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Ae=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class Ye extends ye{async getCookies(){const t=document.cookie,a={};return t.split(";").forEach(s=>{if(s.length<=0)return;let[r,n]=s.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");r=Ae(r).trim(),n=Ae(n).trim(),a[r]=n}),a}async setCookie(t){try{const a=Ne(t.key),s=Ne(t.value),r=t.expires?`; expires=${t.expires.replace("expires=","")}`:"",n=(t.path||"/").replace("path=",""),o=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${a}=${s||""}${r}; path=${n}; ${o};`}catch(a){return Promise.reject(a)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const a of t)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}le("CapacitorCookies",{web:()=>new Ye});const Ve=async e=>new Promise((t,a)=>{const s=new FileReader;s.onload=()=>{const r=s.result;t(r.indexOf(",")>=0?r.split(",")[1]:r)},s.onerror=r=>a(r),s.readAsDataURL(e)}),Je=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(r=>r.toLocaleLowerCase()).reduce((r,n,o)=>(r[n]=e[t[o]],r),{})},Qe=(e,t=!0)=>e?Object.entries(e).reduce((s,r)=>{const[n,o]=r;let i,c;return Array.isArray(o)?(c="",o.forEach(d=>{i=t?encodeURIComponent(d):d,c+=`${n}=${i}&`}),c.slice(0,-1)):(i=t?encodeURIComponent(o):o,c=`${n}=${i}`),`${s}&${c}`},"").substr(1):null,ze=(e,t={})=>{const a=Object.assign({method:e.method||"GET",headers:e.headers},t),r=Je(e.headers)["content-type"]||"";if(typeof e.data=="string")a.body=e.data;else if(r.includes("application/x-www-form-urlencoded")){const n=new URLSearchParams;for(const[o,i]of Object.entries(e.data||{}))n.set(o,i);a.body=n.toString()}else if(r.includes("multipart/form-data")||e.data instanceof FormData){const n=new FormData;if(e.data instanceof FormData)e.data.forEach((i,c)=>{n.append(c,i)});else for(const i of Object.keys(e.data))n.append(i,e.data[i]);a.body=n;const o=new Headers(a.headers);o.delete("content-type"),a.headers=o}else(r.includes("application/json")||typeof e.data=="object")&&(a.body=JSON.stringify(e.data));return a};class Ze extends ye{async request(t){const a=ze(t,t.webFetchExtra),s=Qe(t.params,t.shouldEncodeUrlParams),r=s?`${t.url}?${s}`:t.url,n=await fetch(r,a),o=n.headers.get("content-type")||"";let{responseType:i="text"}=n.ok?t:{};o.includes("application/json")&&(i="json");let c,d;switch(i){case"arraybuffer":case"blob":d=await n.blob(),c=await Ve(d);break;case"json":c=await n.json();break;default:c=await n.text()}const p={};return n.headers.forEach((h,u)=>{p[u]=h}),{data:c,headers:p,status:n.status,url:n.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}le("CapacitorHttp",{web:()=>new Ze});var Le;(function(e){e.Dark="DARK",e.Light="LIGHT",e.Default="DEFAULT"})(Le||(Le={}));var Ce;(function(e){e.StatusBar="StatusBar",e.NavigationBar="NavigationBar"})(Ce||(Ce={}));class et extends ye{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}le("SystemBars",{web:()=>new et});const tt="modulepreload",at=function(e){return"/"+e},$e={},st=function(t,a,s){let r=Promise.resolve();if(a&&a.length>0){let c=function(d){return Promise.all(d.map(p=>Promise.resolve(p).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),i=o?.nonce||o?.getAttribute("nonce");r=c(a.map(d=>{if(d=at(d),d in $e)return;$e[d]=!0;const p=d.endsWith(".css"),h=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${h}`))return;const u=document.createElement("link");if(u.rel=p?"stylesheet":tt,p||(u.as="script"),u.crossOrigin="",u.href=d,i&&u.setAttribute("nonce",i),document.head.appendChild(u),p)return new Promise((y,v)=>{u.addEventListener("load",y),u.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${d}`)))})}))}function n(o){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=o,window.dispatchEvent(i),!i.defaultPrevented)throw o}return r.then(o=>{for(const i of o||[])i.status==="rejected"&&n(i.reason);return t().catch(n)})};class nt{constructor(t){this.sqlite=t,this._connectionDict=new Map}async initWebStore(){try{return await this.sqlite.initWebStore(),Promise.resolve()}catch(t){return Promise.reject(t)}}async saveToStore(t){try{return await this.sqlite.saveToStore({database:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async saveToLocalDisk(t){try{return await this.sqlite.saveToLocalDisk({database:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getFromLocalDiskToStore(t){const a=t??!0;try{return await this.sqlite.getFromLocalDiskToStore({overwrite:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async echo(t){try{const a=await this.sqlite.echo({value:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isSecretStored(){try{const t=await this.sqlite.isSecretStored();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async setEncryptionSecret(t){try{return await this.sqlite.setEncryptionSecret({passphrase:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async changeEncryptionSecret(t,a){try{return await this.sqlite.changeEncryptionSecret({passphrase:t,oldpassphrase:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async clearEncryptionSecret(){try{return await this.sqlite.clearEncryptionSecret(),Promise.resolve()}catch(t){return Promise.reject(t)}}async checkEncryptionSecret(t){try{const a=await this.sqlite.checkEncryptionSecret({passphrase:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async addUpgradeStatement(t,a){try{return t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.addUpgradeStatement({database:t,upgrade:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async createConnection(t,a,s,r,n){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.createConnection({database:t,encrypted:a,mode:s,version:r,readonly:n});const o=new Oe(t,n,this.sqlite),i=n?`RO_${t}`:`RW_${t}`;return this._connectionDict.set(i,o),Promise.resolve(o)}catch(o){return Promise.reject(o)}}async closeConnection(t,a){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.closeConnection({database:t,readonly:a});const s=a?`RO_${t}`:`RW_${t}`;return this._connectionDict.delete(s),Promise.resolve()}catch(s){return Promise.reject(s)}}async isConnection(t,a){const s={};t.endsWith(".db")&&(t=t.slice(0,-3));const r=a?`RO_${t}`:`RW_${t}`;return s.result=this._connectionDict.has(r),Promise.resolve(s)}async retrieveConnection(t,a){t.endsWith(".db")&&(t=t.slice(0,-3));const s=a?`RO_${t}`:`RW_${t}`;if(this._connectionDict.has(s)){const r=this._connectionDict.get(s);return typeof r<"u"?Promise.resolve(r):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async getNCDatabasePath(t,a){try{const s=await this.sqlite.getNCDatabasePath({path:t,database:a});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async createNCConnection(t,a){try{await this.sqlite.createNCConnection({databasePath:t,version:a});const s=new Oe(t,!0,this.sqlite),r=`RO_${t})`;return this._connectionDict.set(r,s),Promise.resolve(s)}catch(s){return Promise.reject(s)}}async closeNCConnection(t){try{await this.sqlite.closeNCConnection({databasePath:t});const a=`RO_${t})`;return this._connectionDict.delete(a),Promise.resolve()}catch(a){return Promise.reject(a)}}async isNCConnection(t){const a={},s=`RO_${t})`;return a.result=this._connectionDict.has(s),Promise.resolve(a)}async retrieveNCConnection(t){if(this._connectionDict.has(t)){const a=`RO_${t})`,s=this._connectionDict.get(a);return typeof s<"u"?Promise.resolve(s):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async isNCDatabase(t){try{const a=await this.sqlite.isNCDatabase({databasePath:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async retrieveAllConnections(){return this._connectionDict}async closeAllConnections(){const t=new Map;try{for(const a of this._connectionDict.keys()){const s=a.substring(3),r=a.substring(0,3)==="RO_";await this.sqlite.closeConnection({database:s,readonly:r}),t.set(a,null)}for(const a of t.keys())this._connectionDict.delete(a);return Promise.resolve()}catch(a){return Promise.reject(a)}}async checkConnectionsConsistency(){try{const t=[...this._connectionDict.keys()],a=[],s=[];for(const n of t)a.push(n.substring(0,2)),s.push(n.substring(3));const r=await this.sqlite.checkConnectionsConsistency({dbNames:s,openModes:a});return r.result||(this._connectionDict=new Map),Promise.resolve(r)}catch(t){return this._connectionDict=new Map,Promise.reject(t)}}async importFromJson(t){try{const a=await this.sqlite.importFromJson({jsonstring:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isJsonValid(t){try{const a=await this.sqlite.isJsonValid({jsonstring:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async copyFromAssets(t){const a=t??!0;try{return await this.sqlite.copyFromAssets({overwrite:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async getFromHTTPRequest(t,a){const s=a??!0;try{return await this.sqlite.getFromHTTPRequest({url:t,overwrite:s}),Promise.resolve()}catch(r){return Promise.reject(r)}}async isDatabaseEncrypted(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const a=await this.sqlite.isDatabaseEncrypted({database:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isInConfigEncryption(){try{const t=await this.sqlite.isInConfigEncryption();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isInConfigBiometricAuth(){try{const t=await this.sqlite.isInConfigBiometricAuth();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isDatabase(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const a=await this.sqlite.isDatabase({database:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async getDatabaseList(){try{const a=(await this.sqlite.getDatabaseList()).values;a.sort();const s={values:a};return Promise.resolve(s)}catch(t){return Promise.reject(t)}}async getMigratableDbList(t){const a=t||"default";try{const s=await this.sqlite.getMigratableDbList({folderPath:a});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async addSQLiteSuffix(t,a){const s=t||"default",r=a||[];try{const n=await this.sqlite.addSQLiteSuffix({folderPath:s,dbNameList:r});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async deleteOldDatabases(t,a){const s=t||"default",r=a||[];try{const n=await this.sqlite.deleteOldDatabases({folderPath:s,dbNameList:r});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async moveDatabasesAndAddSuffix(t,a){const s=t||"default",r=a||[];return this.sqlite.moveDatabasesAndAddSuffix({folderPath:s,dbNameList:r})}}class Oe{constructor(t,a,s){this.dbName=t,this.readonly=a,this.sqlite=s}getConnectionDBName(){return this.dbName}getConnectionReadOnly(){return this.readonly}async open(){try{return await this.sqlite.open({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async close(){try{return await this.sqlite.close({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async beginTransaction(){try{const t=await this.sqlite.beginTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async commitTransaction(){try{const t=await this.sqlite.commitTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async rollbackTransaction(){try{const t=await this.sqlite.rollbackTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTransactionActive(){try{const t=await this.sqlite.isTransactionActive({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async loadExtension(t){try{return await this.sqlite.loadExtension({database:this.dbName,path:t,readonly:this.readonly}),Promise.resolve()}catch(a){return Promise.reject(a)}}async enableLoadExtension(t){try{return await this.sqlite.enableLoadExtension({database:this.dbName,toggle:t,readonly:this.readonly}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getUrl(){try{const t=await this.sqlite.getUrl({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getVersion(){try{const t=await this.sqlite.getVersion({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getTableList(){try{const t=await this.sqlite.getTableList({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async execute(t,a=!0,s=!0){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const r=await this.sqlite.execute({database:this.dbName,statements:t,transaction:a,readonly:!1,isSQL92:s});return Promise.resolve(r)}}catch(r){return Promise.reject(r)}}async query(t,a,s=!0){let r;try{return a&&a.length>0?r=await this.sqlite.query({database:this.dbName,statement:t,values:a,readonly:this.readonly,isSQL92:!0}):r=await this.sqlite.query({database:this.dbName,statement:t,values:[],readonly:this.readonly,isSQL92:s}),r=await this.reorderRows(r),Promise.resolve(r)}catch(n){return Promise.reject(n)}}async run(t,a,s=!0,r="no",n=!0){let o;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(a&&a.length>0?o=await this.sqlite.run({database:this.dbName,statement:t,values:a,transaction:s,readonly:!1,returnMode:r,isSQL92:!0}):o=await this.sqlite.run({database:this.dbName,statement:t,values:[],transaction:s,readonly:!1,returnMode:r,isSQL92:n}),o.changes=await this.reorderRows(o.changes),Promise.resolve(o))}catch(i){return Promise.reject(i)}}async executeSet(t,a=!0,s="no",r=!0){let n;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(n=await this.sqlite.executeSet({database:this.dbName,set:t,transaction:a,readonly:!1,returnMode:s,isSQL92:r}),n.changes=await this.reorderRows(n.changes),Promise.resolve(n))}catch(o){return Promise.reject(o)}}async isExists(){try{const t=await this.sqlite.isDBExists({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTable(t){try{const a=await this.sqlite.isTableExists({database:this.dbName,table:t,readonly:this.readonly});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isDBOpen(){try{const t=await this.sqlite.isDBOpen({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async delete(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteDatabase({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async createSyncTable(){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const t=await this.sqlite.createSyncTable({database:this.dbName,readonly:!1});return Promise.resolve(t)}}catch(t){return Promise.reject(t)}}async setSyncDate(t){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.setSyncDate({database:this.dbName,syncdate:t,readonly:!1}),Promise.resolve())}catch(a){return Promise.reject(a)}}async getSyncDate(){try{const t=await this.sqlite.getSyncDate({database:this.dbName,readonly:this.readonly});let a="";return t.syncDate>0&&(a=new Date(t.syncDate*1e3).toISOString()),Promise.resolve(a)}catch(t){return Promise.reject(t)}}async exportToJson(t,a=!1){try{const s=await this.sqlite.exportToJson({database:this.dbName,jsonexportmode:t,readonly:this.readonly,encrypted:a});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async deleteExportedRows(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteExportedRows({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async executeTransaction(t,a=!0){let s=0,r=!1;if(this.readonly)return Promise.reject("not allowed in read-only mode");if(await this.sqlite.beginTransaction({database:this.dbName}),r=await this.sqlite.isTransactionActive({database:this.dbName}),!r)return Promise.reject("After Begin Transaction, no transaction active");try{for(const i of t){if(typeof i!="object"||!("statement"in i))throw new Error("Error a task.statement must be provided");if("values"in i&&i.values&&i.values.length>0){const c=i.statement.toUpperCase().includes("RETURNING")?"all":"no",d=await this.sqlite.run({database:this.dbName,statement:i.statement,values:i.values,transaction:!1,readonly:!1,returnMode:c,isSQL92:a});if(d.changes.changes<0)throw new Error("Error in transaction method run ");s+=d.changes.changes}else{const c=await this.sqlite.execute({database:this.dbName,statements:i.statement,transaction:!1,readonly:!1});if(c.changes.changes<0)throw new Error("Error in transaction method execute ");s+=c.changes.changes}}const n=await this.sqlite.commitTransaction({database:this.dbName});s+=n.changes.changes;const o={changes:{changes:s}};return Promise.resolve(o)}catch(n){const o=n.message?n.message:n;return await this.sqlite.rollbackTransaction({database:this.dbName}),Promise.reject(o)}}async reorderRows(t){const a=t;if(t?.values&&typeof t.values[0]=="object"&&Object.keys(t.values[0]).includes("ios_columns")){const s=t.values[0].ios_columns,r=[];for(let n=1;n<t.values.length;n++){const o=t.values[n],i={};for(const c of s)i[c]=o[c];r.push(i)}a.values=r}return Promise.resolve(a)}}const rt=le("CapacitorSQLite",{web:()=>st(()=>import("./web-Bq5iE1gx.js"),[]).then(e=>new e.CapacitorSQLiteWeb),electron:()=>window.CapacitorCustomPlatform.plugins.CapacitorSQLite});function it(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}const ot="laba101_offline",ct=new nt(rt);let Q=null;const X=[{id:1,name:"Laba101 Admin",email:"admin@laba101.test",password:"password",role:"admin",branch:"Main Store"},{id:2,name:"Laba101 Staff",email:"staff@laba101.test",password:"password",role:"staff",branch:"Main Store"},{id:3,name:"Mintal Staff",email:"mintal@laba101.test",password:"password",role:"staff",branch:"Mintal Branch"},{id:4,name:"Gensan Staff",email:"gensan@laba101.test",password:"password",role:"staff",branch:"Gensan Branch"}],te=[{id:1,name:"Mara Santos",phone:"0917 482 1101",address:"Bajada, Davao City"},{id:2,name:"Jun Rivera",phone:"0928 314 7720",address:"Lanang, Davao City"},{id:3,name:"Ana Cruz",phone:"0935 901 2234",address:"Matina, Davao City"}],G=[k(1,"Drop-off","Wash, dry and fold.","Drop-Off","order",185,8,40,["Wash","Dry","Fold"],0,24),k(2,"Full Service","Wash, dry, fold, detergent and Fabcon.","Full Service","order",200,8,40,["Wash","Dry","Fold","Detergent","Fabcon"],0,24),k(3,"Self Service Wash","Max of 8kg per load.","Self Service","order",60,8,null,["Wash"],0,1),k(4,"Self Service Dry","Regular 40 mins drying time.","Self Service","order",70,8,40,["Dry"],0,1),k(5,"Dry Only","Standard drying rate.","Dry Only","order",70,8,40,["Dry"],0,1),k(6,"Additional Dry 10 mins","Additional drying time.","Dry Only","order",30,8,10,["Dry"],0,1),k(7,"Additional Dry 20 mins","Additional drying time.","Dry Only","order",50,8,20,["Dry"],0,1),k(8,"Additional Dry 40 mins","Additional drying time.","Dry Only","order",70,8,40,["Dry"],0,1),k(9,"Additional Zonrox","Extra bleach add-on per load.","Add-on","addon",25,0,null,["Zonrox"],0,0),k(10,"Additional Fabcon","Extra fabric conditioner add-on per load.","Add-on","addon",25,0,null,["Fabcon"],0,0),k(11,"Comforter / Bulky Load","Comforter and bulky item service.","Comforter","order",200,8,40,["Wash","Dry","Fold"],0,24)],ae=[{id:1,name:"Regular Clothes",maxKg:8,additionalFee:0,isActive:1},{id:2,name:"Comforter",maxKg:4,additionalFee:0,isActive:1},{id:3,name:"Thin Blankets",maxKg:6,additionalFee:0,isActive:1},{id:4,name:"Bedsheets",maxKg:6,additionalFee:0,isActive:1},{id:5,name:"Bath Towels",maxKg:6,additionalFee:0,isActive:1},{id:6,name:"Curtains",maxKg:6,additionalFee:0,isActive:1}],W=[{id:1,ticket:"LB260527-001",customerId:1,customer:"Mara Santos",phone:"0917 482 1101",serviceId:1,service:"Drop-off",itemCategoryId:1,itemCategory:"Regular Clothes",branch:"Main Store",status:"washing",workflowCompleted:["received","wash"],weightKg:5.75,price:185,additionalCharge:0,extraServiceAmount:0,totalAmount:185,paidAmount:185,balance:0,extras:[],notes:"Separate white uniforms.",foldedBy:null,foldedByName:null,dueAt:new Date(Date.now()+1080*60*1e3).toISOString(),createdAt:new Date().toISOString()}],se=[{id:1,orderId:1,amount:185,method:"cash",reference:null,receivedAt:new Date().toISOString(),branch:"Main Store"}],ne=[{id:1,expenseDate:"2026-05-27",number:"DISB-01",name:"Water refill",category:"Supplies",description:"Weekly supply",amount:250},{id:2,expenseDate:"2026-05-27",number:"DISB-02",name:"Detergent",category:"Supplies",description:"Laundry detergent",amount:500}],re=[{id:1,saleDate:"2026-05-27",saleNumber:"SALE-01",cashAmount:1200,gcashAmount:500,totalAmount:1700,notes:"Seed day total"}],_=[...[1,2,3,4].map(e=>({id:e,machineName:`Washer ${e}`,machineType:"washer",status:"available",branch:"Main Store"})),...[1,2,3,4].map(e=>({id:e+4,machineName:`Dryer ${e}`,machineType:"dryer",status:"available",branch:"Main Store"}))],ie=[{key:"branch",value:"Main Store"},{key:"fold_rate",value:"5"},{key:"report_email",value:"admin@laba101.test"}];function k(e,t,a,s,r,n,o,i,c,d,p){return{id:e,name:t,description:a,category:s,serviceType:r,price:n,maxKg:o,dryingMinutes:i,includes:c,additionalCharge:d,turnaroundHours:p,isActive:1}}function ge(e){return`laba101-mobile-${e}`}function T(e,t){const a=localStorage.getItem(ge(e));if(!a)return structuredClone(t);try{return JSON.parse(a)}catch{return structuredClone(t)}}function w(e,t){localStorage.setItem(ge(e),JSON.stringify(t))}function U(e){return e.reduce((t,a)=>Math.max(t,a.id),0)+1}function H(){return new Date().toISOString()}function pe(e=new Date){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${s}`}function lt(){return pe().slice(2).replaceAll("-","")}function oe(e,t){if(!e)return t;try{return JSON.parse(e)}catch{return t}}async function N(){return Q||(Q=await ct.createConnection(ot,!1,"no-encryption",1,!1),await Q.open()),Q}async function D(e,t,a,s){((await e.query(`PRAGMA table_info(${t})`)).values??[]).some(o=>o.name===a)||await e.execute(`ALTER TABLE ${t} ADD COLUMN ${a} ${s}`)}async function dt(){if(!S.isNativePlatform()){localStorage.getItem(ge("seeded_v3"))||(w("staff",X),w("customers",te),w("services",G),w("item_categories",ae),w("orders",W),w("payments",se),w("fold_logs",[]),w("expenses",ne),w("sales",re),w("machines",_),w("subcleanings",[]),w("settings",ie),w("seeded_v3",!0));return}const e=await N();if(await e.execute(`
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
  `),await D(e,"staff","email","TEXT"),await D(e,"staff","password","TEXT"),await D(e,"staff","role","TEXT"),await D(e,"staff","isActive","INTEGER NOT NULL DEFAULT 1"),await e.run('UPDATE staff SET password = ? WHERE password IS NULL OR password = ""',["password"]),await e.run('UPDATE staff SET role = ? WHERE role IS NULL OR role = ""',["staff"]),await D(e,"orders","customerId","INTEGER NOT NULL DEFAULT 0"),await D(e,"orders","phone","TEXT"),await D(e,"orders","serviceId","INTEGER NOT NULL DEFAULT 0"),await D(e,"orders","itemCategoryId","INTEGER NOT NULL DEFAULT 0"),await D(e,"orders","itemCategory",'TEXT NOT NULL DEFAULT "Regular Clothes"'),await D(e,"orders","workflowCompleted","TEXT"),await D(e,"orders","weightKg","REAL NOT NULL DEFAULT 0"),await D(e,"orders","price","REAL NOT NULL DEFAULT 0"),await D(e,"orders","additionalCharge","REAL NOT NULL DEFAULT 0"),await D(e,"orders","extraServiceAmount","REAL NOT NULL DEFAULT 0"),await D(e,"orders","totalAmount","REAL NOT NULL DEFAULT 0"),await D(e,"orders","paidAmount","REAL NOT NULL DEFAULT 0"),await D(e,"orders","extras","TEXT"),await D(e,"orders","notes","TEXT"),await D(e,"orders","dueAt","TEXT"),await D(e,"orders","createdAt",'TEXT NOT NULL DEFAULT ""'),await D(e,"daily_sales","saleNumber","TEXT"),((await e.query("SELECT COUNT(*) as count FROM staff")).values?.[0]?.count??0)===0){for(const a of X)await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.name,a.email,a.password,a.role,a.branch,1]);for(const a of te)await e.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[a.id,a.name,a.phone,a.address]);for(const a of G)await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[a.id,a.name,a.description,a.category,a.serviceType,a.price,a.maxKg,a.dryingMinutes,JSON.stringify(a.includes),a.additionalCharge,a.turnaroundHours,a.isActive]);for(const a of ae)await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[a.id,a.name,a.maxKg,a.additionalFee,a.isActive]);for(const a of W)await Ie(e,a);for(const a of se)await e.run("INSERT INTO payments (id, orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.orderId,a.amount,a.method,a.reference,a.receivedAt,a.branch]);for(const a of ne)await e.run("INSERT INTO disbursement_expenses (id, expenseDate, number, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.expenseDate,a.number,a.name,a.category,a.description,a.amount]);for(const a of re)await e.run("INSERT INTO daily_sales (id, saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.saleDate,a.saleNumber,a.cashAmount,a.gcashAmount,a.totalAmount,a.notes]);for(const a of _)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[a.id,a.machineName,a.machineType,a.status,a.branch]);for(const a of ie)await e.run("INSERT INTO settings (key, value) VALUES (?, ?)",[a.key,a.value])}}async function Ie(e,t){await e.run("INSERT INTO orders (id, ticket, customerId, customer, phone, serviceId, service, itemCategoryId, itemCategory, branch, status, workflowCompleted, weightKg, price, additionalCharge, extraServiceAmount, totalAmount, paidAmount, extras, notes, foldedBy, dueAt, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.ticket,t.customerId,t.customer,t.phone,t.serviceId,t.service,t.itemCategoryId,t.itemCategory,t.branch,t.status,JSON.stringify(t.workflowCompleted),t.weightKg,t.price,t.additionalCharge,t.extraServiceAmount,t.totalAmount,t.paidAmount,JSON.stringify(t.extras),t.notes,t.foldedBy,t.dueAt,t.createdAt])}function ut(e){const t=Number(e.paidAmount??0),a=Number(e.totalAmount??0),s=Number(e.foldedBy);return{id:Number(e.id),ticket:String(e.ticket),customerId:Number(e.customerId),customer:String(e.customer),phone:e.phone?String(e.phone):null,serviceId:Number(e.serviceId),service:String(e.service),itemCategoryId:Number(e.itemCategoryId),itemCategory:String(e.itemCategory),branch:String(e.branch),status:String(e.status),workflowCompleted:oe(e.workflowCompleted,[]),weightKg:Number(e.weightKg),price:Number(e.price),additionalCharge:Number(e.additionalCharge),extraServiceAmount:Number(e.extraServiceAmount),totalAmount:a,paidAmount:t,balance:Number((a-t).toFixed(2)),extras:oe(e.extras,[]),notes:e.notes?String(e.notes):null,foldedBy:Number.isFinite(s)&&s>0?s:null,foldedByName:e.foldedByName?String(e.foldedByName):null,dueAt:String(e.dueAt),createdAt:String(e.createdAt)}}async function mt(){await dt()}async function de(){return(await Ee()).find(t=>t.key==="branch")?.value??"Main Store"}async function vt(){const e=await Ee();return Number(e.find(t=>t.key==="fold_rate")?.value??"5")}async function qe(e){return(await Ee()).find(a=>a.key===e)?.value}async function Ee(){return S.isNativePlatform()?(await(await N()).query("SELECT key, value FROM settings ORDER BY key")).values??[]:T("settings",ie)}async function Z(e,t){if(!S.isNativePlatform()){const s=T("settings",ie).filter(r=>r.key!==e);s.push({key:e,value:t}),w("settings",s);return}await(await N()).run("REPLACE INTO settings (key, value) VALUES (?, ?)",[e,t])}async function ft(e){return S.isNativePlatform()?(await(await N()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff WHERE branch = ? ORDER BY name ASC',[e])).values??[]:T("staff",X).filter(s=>s.branch===e)}async function ke(){return S.isNativePlatform()?(await(await N()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff ORDER BY name ASC')).values??[]:T("staff",X)}async function Ue(e,t){const a=e.trim().toLowerCase();return(await ke()).find(r=>r.email.toLowerCase()===a&&r.password===t&&r.isActive!==0)??null}async function ht(e){if(!S.isNativePlatform()){const a=T("staff",X);a.unshift({id:U(a),...e,isActive:1}),w("staff",a);return}await(await N()).run("INSERT INTO staff (name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?)",[e.name,e.email,e.password,e.role,e.branch,1])}async function De(e,t){if(!S.isNativePlatform()){const n=T("staff",X),o=n.find(i=>i.id===e);o&&(Object.assign(o,t),w("staff",n));return}const a=await N(),s=[],r=[];for(const[n,o]of Object.entries(t))n!=="id"&&(s.push(`${n} = ?`),r.push(o));s.length&&(r.push(e),await a.run(`UPDATE staff SET ${s.join(", ")} WHERE id = ?`,r))}async function pt(){return S.isNativePlatform()?(await(await N()).query("SELECT id, name, phone, address FROM customers ORDER BY name ASC")).values??[]:T("customers",te).sort((a,s)=>a.name.localeCompare(s.name))}async function bt(e){if(!S.isNativePlatform()){const r=T("customers",te),n=e.id?r.find(i=>i.id===e.id):r.find(i=>i.name.toLowerCase()===e.name.toLowerCase()&&(e.phone?i.phone===e.phone:!0));if(n)return n.name=e.name,n.phone=e.phone??n.phone,n.address=e.address??n.address,w("customers",r),n;const o={id:U(r),name:e.name,phone:e.phone??null,address:e.address??null};return r.push(o),w("customers",r),o}const t=await N();if(e.id)return await t.run("UPDATE customers SET name = ?, phone = ?, address = ? WHERE id = ?",[e.name,e.phone??null,e.address??null,e.id]),{id:e.id,name:e.name,phone:e.phone??null,address:e.address??null};const a=await t.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM customers"),s=Number((a.values?.[0]).id);return await t.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[s,e.name,e.phone??null,e.address??null]),{id:s,name:e.name,phone:e.phone??null,address:e.address??null}}async function we(e){return S.isNativePlatform()?((await(await N()).query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services WHERE isActive = 1  ORDER BY name ASC",[])).values??[]).map(s=>({...s,includes:oe(s.includes,[])})):T("services",G).filter(s=>s.isActive&&!0)}async function Pe(e){if(!S.isNativePlatform()){const a=T("services",G),s=e.id?a.find(r=>r.id===e.id):null;s?Object.assign(s,e):a.unshift({...e,id:U(a)}),w("services",a);return}const t=await N();e.id?await t.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = ? WHERE id = ?",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive,e.id]):await t.run("INSERT INTO laundry_services (name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive])}async function yt(e){if(!S.isNativePlatform()){const a=T("services",G);w("services",a.filter(s=>s.id!==e));return}await(await N()).run("DELETE FROM laundry_services WHERE id = ?",[e])}async function Me(){return S.isNativePlatform()?(await(await N()).query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC")).values??[]:T("item_categories",ae).filter(a=>a.isActive)}async function gt(e){if(!S.isNativePlatform()){const a=T("item_categories",ae),s=e.id?a.find(r=>r.id===e.id):null;s?Object.assign(s,e):a.unshift({...e,id:U(a)}),w("item_categories",a);return}const t=await N();e.id?await t.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = ? WHERE id = ?",[e.name,e.maxKg,e.additionalFee,e.isActive,e.id]):await t.run("INSERT INTO item_categories (name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?)",[e.name,e.maxKg,e.additionalFee,e.isActive])}function be(e,t,a,s){const r=Number(t.maxKg),n=Math.max(0,a-r),o=0,i=s.reduce((p,h)=>p+Number(h.price),0),c=s.map(p=>({id:p.id,name:it(p.name),price:Number(p.price)})),d=Number((Number(e.price)+o+i).toFixed(2));return{price:Number(e.price),additionalCharge:Number(o.toFixed(2)),extraServiceAmount:Number(i.toFixed(2)),totalAmount:d,allowedKg:r,extraKg:Number(n.toFixed(2)),warning:n>0?`Weight exceeds the ${t.name} load limit of ${r.toFixed(2)} kg.`:null,extras:c}}function Fe(e,t){const a=t.find(n=>n.id===e.serviceId),s=a?.includes??[],r=[{key:"received",label:"Received"}];return s.includes("Wash")&&r.push({key:"wash",label:"Wash"}),e.extras.length&&r.push({key:"extras",label:"Extra services"}),(s.includes("Dry")||(a?.dryingMinutes??0)>0)&&r.push({key:"dry",label:"Dry"}),s.includes("Fold")&&r.push({key:"fold",label:"Fold"}),r.push({key:"ready",label:"Ready"},{key:"claimed",label:"Claimed"}),r}function Et(e){return e.includes("claimed")?"claimed":e.includes("ready")?"ready":e.includes("dry")?"drying":e.includes("extras")||e.includes("wash")?"washing":"received"}async function ue(e){return S.isNativePlatform()?((await(await N()).query("SELECT o.*, s.name as foldedByName FROM orders o LEFT JOIN staff s ON s.id = o.foldedBy WHERE o.branch = ? ORDER BY o.id DESC",[e])).values??[]).map(s=>ut(s)):T("orders",W).filter(s=>s.branch===e).map(s=>({...s,balance:Number((s.totalAmount-s.paidAmount).toFixed(2))}))}async function wt(e){const[t,a]=await Promise.all([we(),Me()]),s=t.find(v=>v.id===e.serviceId),r=a.find(v=>v.id===e.itemCategoryId);if(!s||!r)throw new Error("Service or item category is missing.");const n=t.filter(v=>e.addonIds.includes(v.id)),o=be(s,r,e.weightKg,n);if(o.extraKg>0)throw new Error(o.warning??"Weight exceeds the allowed limit.");const i=await bt({id:e.customerId||void 0,name:e.customerName,phone:e.customerPhone??null}),c=Math.max(0,e.paidAmount),d=Math.min(o.totalAmount,c),p={ticket:await St(),customerId:i.id,customer:i.name,phone:i.phone,serviceId:s.id,service:s.name,itemCategoryId:r.id,itemCategory:r.name,branch:e.branch,status:"received",workflowCompleted:["received"],weightKg:e.weightKg,price:o.price,additionalCharge:o.additionalCharge,extraServiceAmount:o.extraServiceAmount,totalAmount:o.totalAmount,paidAmount:d,balance:Number((o.totalAmount-d).toFixed(2)),extras:o.extras,notes:[e.notes,o.warning].filter(Boolean).join(`
`)||null,foldedBy:null,foldedByName:null,dueAt:new Date(Date.now()+s.turnaroundHours*60*60*1e3).toISOString(),createdAt:H()};if(!S.isNativePlatform()){const v=T("orders",W),m={...p,id:U(v)};return v.unshift(m),w("orders",v),c>0&&await je(m.id,{amount:c,method:e.paymentMethod,reference:e.paymentReference??null}),m}const h=await N(),u=await h.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM orders"),y={...p,id:Number((u.values?.[0]).id)};return await Ie(h,y),c>0&&await h.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[y.id,c,e.paymentMethod,e.paymentReference??null,H(),e.branch]),y}async function St(){const e=`LB${lt()}`,t=await de(),s=(await ue(t)).filter(n=>n.ticket.startsWith(e)).sort((n,o)=>o.ticket.localeCompare(n.ticket))[0],r=s?Number(s.ticket.slice(-3))+1:1;return`${e}-${String(r).padStart(3,"0")}`}async function Tt(e,t){const a=await de(),[s,r]=await Promise.all([ue(a),we()]),n=s.find(d=>d.id===e);if(!n)return;const i=Fe(n,r).map(d=>d.key).find(d=>!n.workflowCompleted.includes(d));if(!i)return;if(n.workflowCompleted=[...n.workflowCompleted,i],n.status=Et(n.workflowCompleted),i==="fold"&&t&&(n.foldedBy=t),!S.isNativePlatform()){const d=T("orders",W),p=d.find(h=>h.id===n.id);p&&Object.assign(p,n),w("orders",d);return}await(await N()).run("UPDATE orders SET workflowCompleted = ?, status = ?, foldedBy = ? WHERE id = ?",[JSON.stringify(n.workflowCompleted),n.status,n.foldedBy,n.id])}async function je(e,t){const a=await de();if(!(await ue(a)).find(i=>i.id===e))return;const n=Math.max(0,t.amount);if(n<=0)return;if(!S.isNativePlatform()){const i=T("payments",se);i.unshift({id:U(i),orderId:e,amount:n,method:t.method,reference:t.reference??null,receivedAt:H(),branch:a}),w("payments",i);const c=T("orders",W),d=c.find(p=>p.id===e);d&&(d.paidAmount=Math.min(d.totalAmount,Number((d.paidAmount+n).toFixed(2)))),w("orders",c);return}const o=await N();await o.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[e,n,t.method,t.reference??null,H(),a]),await o.run("UPDATE orders SET paidAmount = MIN(totalAmount, paidAmount + ?) WHERE id = ?",[n,e])}async function Nt(e){return S.isNativePlatform()?(await(await N()).query("SELECT id, orderId, amount, method, reference, receivedAt, branch FROM payments  ORDER BY receivedAt DESC",[])).values??[]:T("payments",se).filter(s=>!0)}async function At(){return S.isNativePlatform()?(await(await N()).query("SELECT id, orderTicket, staffName, foldCount, rate, total, createdAt FROM fold_logs ORDER BY id DESC")).values??[]:T("fold_logs",[])}async function Lt(e){const t=Number((e.foldCount*e.rate).toFixed(2));if(!S.isNativePlatform()){const s=T("fold_logs",[]);s.unshift({id:Date.now(),...e,total:t,createdAt:H()}),w("fold_logs",s);return}await(await N()).run("INSERT INTO fold_logs (orderTicket, staffName, foldCount, rate, total, createdAt) VALUES (?, ?, ?, ?, ?, ?)",[e.orderTicket,e.staffName,e.foldCount,e.rate,t,H()])}async function Ct(){return S.isNativePlatform()?(await(await N()).query("SELECT id, expenseDate, number, name, category, description, amount FROM disbursement_expenses ORDER BY expenseDate DESC, id DESC")).values??[]:T("expenses",ne)}async function $t(e){if(!S.isNativePlatform()){const r=T("expenses",ne),n=U(r);r.unshift({id:n,expenseDate:e.expenseDate,number:`DISB-${String(n).padStart(2,"0")}`,name:e.name,category:e.category,description:e.description||null,amount:e.amount}),w("expenses",r);return}const t=await N(),a=await t.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM disbursement_expenses"),s=Number((a.values?.[0]).id);await t.run("INSERT INTO disbursement_expenses (expenseDate, number, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?)",[e.expenseDate,`DISB-${String(s).padStart(2,"0")}`,e.name,e.category,e.description||null,e.amount])}async function Ot(){return S.isNativePlatform()?(await(await N()).query('SELECT id, saleDate, COALESCE(saleNumber, "") as saleNumber, cashAmount, gcashAmount, totalAmount, notes FROM daily_sales ORDER BY saleDate DESC, id DESC')).values??[]:T("sales",re)}async function Dt(e){const t=Number((e.cashAmount+e.gcashAmount).toFixed(2));if(!S.isNativePlatform()){const n=T("sales",re),o=n.find(i=>i.saleDate===e.saleDate);if(o)Object.assign(o,{cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null});else{const i=U(n);n.unshift({id:i,saleDate:e.saleDate,saleNumber:`SALE-${String(i).padStart(2,"0")}`,cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null})}w("sales",n);return}const a=await N(),r=(await a.query("SELECT id, saleNumber FROM daily_sales WHERE saleDate = ?",[e.saleDate])).values?.[0];if(r)await a.run("UPDATE daily_sales SET cashAmount = ?, gcashAmount = ?, totalAmount = ?, notes = ? WHERE id = ?",[e.cashAmount,e.gcashAmount,t,e.notes||null,r.id]);else{const n=await a.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM daily_sales"),o=Number((n.values?.[0]).id);await a.run("INSERT INTO daily_sales (saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?)",[e.saleDate,`SALE-${String(o).padStart(2,"0")}`,e.cashAmount,e.gcashAmount,t,e.notes||null])}}async function Be(e){return S.isNativePlatform()?(await(await N()).query("SELECT id, machineName, machineType, status, branch FROM machines WHERE branch = ? ORDER BY machineType, machineName",[e])).values??[]:T("machines",_).filter(s=>s.branch===e)}async function Pt(e){if(!S.isNativePlatform()){const a=T("machines",_);a.unshift({id:U(a),...e}),w("machines",a);return}await(await N()).run("INSERT INTO machines (machineName, machineType, status, branch) VALUES (?, ?, ?, ?)",[e.machineName,e.machineType,e.status,e.branch])}async function Rt(e,t){if(!S.isNativePlatform()){const s=T("machines",_),r=s.find(n=>n.id===e);r&&(r.status=t,w("machines",s));return}await(await N()).run("UPDATE machines SET status = ? WHERE id = ?",[t,e])}async function xt(e){return S.isNativePlatform()?((await(await N()).query("SELECT id, date, machineIds, machineNames, cleaningStatus, notes, branch FROM subcleanings WHERE branch = ? ORDER BY date DESC, id DESC",[e])).values??[]).map(s=>({...s,machineIds:oe(s.machineIds,[])})):T("subcleanings",[]).filter(s=>s.branch===e)}async function It(e){const a=(await Be(e.branch)).filter(n=>e.machineIds.includes(n.id)).map(n=>n.machineName).join(", ");if(!S.isNativePlatform()){const n=T("subcleanings",[]);n.unshift({id:U(n),date:e.date,machineIds:e.machineIds,machineNames:a,cleaningStatus:e.cleaningStatus,notes:e.notes||null,branch:e.branch}),w("subcleanings",n);const o=T("machines",_);o.forEach(i=>{e.machineIds.includes(i.id)&&(i.status=e.cleaningStatus==="completed"?"available":"under_cleaning")}),w("machines",o);return}const s=await N();await s.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, notes, branch) VALUES (?, ?, ?, ?, ?, ?)",[e.date,JSON.stringify(e.machineIds),a,e.cleaningStatus,e.notes||null,e.branch]);const r=e.cleaningStatus==="completed"?"available":"under_cleaning";for(const n of e.machineIds)await s.run("UPDATE machines SET status = ? WHERE id = ?",[r,n])}async function qt(e,t){if(!S.isNativePlatform()){const o=T("machines",_),i=o.find(p=>p.id===e);i&&(i.status="available"),w("machines",o);const c=T("subcleanings",[]),d=pe();c.unshift({id:U(c),date:d,machineIds:[e],machineNames:i?.machineName??"",cleaningStatus:"completed",notes:null,branch:t}),w("subcleanings",c);return}const a=await N(),r=(await a.query("SELECT machineName FROM machines WHERE id = ?",[e])).values?.[0]?.machineName??"";await a.run("UPDATE machines SET status = ? WHERE id = ?",["available",e]);const n=pe();await a.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, notes, branch) VALUES (?, ?, ?, ?, ?, ?)",[n,JSON.stringify([e]),r,"completed",null,t])}const Se=document.querySelector("#app");if(!Se)throw new Error("App root not found");let z;const Te={dashboard:"Dashboard",orders:"POS / Orders",customers:"Customers",pricing:"Pricing Services",disbursements:"Daily Report",reports:"Reports",inventory:"Inventory",maintenance:"Maintenance",staff:"Staff",settings:"Settings"},f={tab:"dashboard",receiptOrderId:0,currentUser:null,loginError:"",sidebarOpen:!1,dailyReportTab:"expenses",maintenanceTab:"cleaning"},Y="laba101-mobile-session";function C(e){return new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(e||0)}function l(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function me(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}function _e(e,t){const a=new Map;return e.filter(s=>s.workflowCompleted.includes("fold")&&s.foldedByName).forEach(s=>{const r=s.foldedByName,n=a.get(r)??{staffName:r,folds:0,rate:t,total:0};n.folds+=1,n.total=Number((n.folds*n.rate).toFixed(2)),a.set(r,n)}),Array.from(a.values())}function ce(e=new Date){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${s}`}function F(){return ce()}function ee(e){return ce(new Date(e))}function kt(e){return new Intl.DateTimeFormat("en-PH",{dateStyle:"medium",timeStyle:"short"}).format(new Date(e))}function Ke(e=new Date){return{date:new Intl.DateTimeFormat("en-PH",{weekday:"long",month:"long",day:"numeric",year:"numeric"}).format(e),time:new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",second:"2-digit",hour12:!0}).format(e)}}function Ut(e,t){return`<button class="nav-link ${t?"is-active":""}" data-tab="${e}" type="button">
    <span class="nav-icon">${Mt(e)}</span>
    <span>${Te[e]}</span>
  </button>`}function P(e,t){return`<div class="section-head"><div><h2>${l(e)}</h2><p class="meta">${l(t)}</p></div></div>`}function Re(){return Te[f.tab]??"Dashboard"}function he(e){return(e?.name??"Laba101").trim().slice(0,1).toUpperCase()}function Mt(e){return{dashboard:"DB",orders:"PO",customers:"CU",pricing:"PS",disbursements:"DR",reports:"RP",inventory:"IN",maintenance:"MT",staff:"ST",settings:"SE"}[e]}async function Ft(){const e=await de(),t=await ft(e),a=await ke(),s=await pt(),r=await we(),n=await Me(),o=await ue(e),i=await Nt(),c=await At(),d=await Ct(),p=await Ot(),h=await Be(e),u=await xt(e),y=await vt(),v=await qe("report_email");return{branch:e,staff:t,allStaff:a,customers:s,services:r,categories:n,orders:o,payments:i,foldLogs:c,expenses:d,sales:p,machines:h,subcleanings:u,foldRate:y,reportEmail:v??""}}async function A(){if(!f.currentUser){jt(),ta();return}const e=await Ft(),t=e.orders.filter(n=>n.status!=="claimed").length,a=e.orders.filter(n=>n.status==="ready").length;e.orders.reduce((n,o)=>n+o.paidAmount,0);const s=e.orders.filter(n=>ee(n.createdAt)===F()).reduce((n,o)=>n+o.paidAmount,0);e.sales.reduce((n,o)=>n+o.totalAmount,0);const r=_e(e.orders,e.foldRate).reduce((n,o)=>n+o.total,0);e.expenses.reduce((n,o)=>n+o.amount,0)+r,Se.innerHTML=`
    <div class="app-frame">
      <header class="topbar">
        <div class="topbar-left">
          <img src="/laba101-logo.svg" alt="Laba101" class="topbar-logo" />
          <div>
            <p class="eyebrow">Offline mobile system</p>
            <h1>${l(Re())}</h1>
          </div>
        </div>
        <div class="topbar-actions">
          <div class="branch-pill"><span>Branch</span><strong>${l(e.branch)}</strong></div>
          <button class="icon-button" type="button" aria-label="Notifications">!</button>
          <button class="profile-pill" type="button">
            <span>${he(f.currentUser)}</span>
            <strong>${l(f.currentUser.name)}</strong>
          </button>
        </div>
      </header>

      <button class="sidebar-backdrop ${f.sidebarOpen?"is-open":""}" id="sidebar-backdrop" type="button" aria-label="Close navigation"></button>

      <aside class="sidebar ${f.sidebarOpen?"is-open":""}">
        <div class="sidebar-mobile-head">
          <img src="/laba101-logo.svg" alt="Laba101" />
          <button class="sidebar-close" id="sidebar-close-button" type="button" aria-label="Close navigation">X</button>
        </div>
        <nav>${Xe().map(n=>Ut(n,f.tab===n)).join("")}</nav>
        <div class="sidebar-fill">
          <div class="sidebar-branch-badge">
            <span>Active Branch</span>
            <strong>${l(e.branch)}</strong>
          </div>
          <p class="sidebar-app-name">Laba101 POS</p>
        </div>
        <div class="sidebar-user">
          <span class="avatar">${he(f.currentUser)}</span>
          <div>
            <strong>${l(f.currentUser.name)}</strong>
            <small>${l(f.currentUser.email)} / ${l(f.currentUser.role)}</small>
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
            <h2>${l(Re())}</h2>
          </div>
          <button class="mobile-avatar" type="button">${he(f.currentUser)}</button>
        </header>

        ${f.tab==="dashboard"?_t({openQueue:t,readyPickup:a,customerCount:e.customers.length,paidToday:s,orders:e.orders}):""}
        ${f.tab==="orders"?Kt(e.orders,e.customers,e.services,e.categories,e.staff,e.payments,e.branch):""}
        ${f.tab==="customers"?Ht(e.customers,e.orders):""}
        ${f.tab==="pricing"?Gt(e.services,e.categories):""}
        ${f.tab==="disbursements"?Yt(e.expenses,e.sales):""}
        ${f.tab==="reports"?Vt(e.orders,e.sales,e.expenses,e.foldRate):""}
        ${f.tab==="inventory"?Jt(e.services,e.categories):""}
        ${f.tab==="maintenance"?Qt(e.machines,e.subcleanings,e.branch):""}
        ${f.tab==="staff"?zt(e.allStaff,e.branch):""}
        ${f.tab==="settings"?Zt(e.branch,e.foldRate,e.reportEmail):""}
      </main>
    </div>
  `,ea(),sa(e),na(e.services),ra(),ia(e.orders,e.sales,e.expenses,e.foldRate),oa(),ca(e.allStaff),la(),aa()}function Xe(){return f.currentUser?.role==="admin"?Object.keys(Te).filter(e=>e!=="inventory"):["orders","disbursements","reports","maintenance"]}function jt(){Se.innerHTML=`
    <main class="login-page">

      <section class="login-panel-wrap">
        <article class="login-panel">
          <header>
            <div class="login-mark"><img src="/laba101-logo.svg" alt="Laba101" /></div>
            <h2>Welcome back</h2>
            <p>Sign in to continue managing today&apos;s laundry operations.</p>
          </header>
          ${f.loginError?`<div class="alert">${l(f.loginError)}</div>`:""}
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
  `}function Bt(){document.querySelectorAll("[data-fill-email]").forEach(e=>{e.addEventListener("click",()=>{const t=document.querySelector('input[name="email"]'),a=document.querySelector('input[name="password"]');t&&(t.value=e.dataset.fillEmail??""),a&&(a.value=e.dataset.fillPassword??"")})})}function _t(e){const t=e.orders.slice(0,3),a=new Date,s=Ke(a),r=Array.from({length:7},(n,o)=>{const i=new Date(a);return i.setDate(a.getDate()-(6-o)),new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric"}).format(i)});return`
    <section class="panel dashboard-clock">
      <div>
        <p class="eyebrow">Device local time</p>
        <h2 data-dashboard-time>${l(s.time)}</h2>
      </div>
      <strong data-dashboard-date>${l(s.date)}</strong>
    </section>
    <section class="grid stats">
      <div class="panel stat"><div class="card-label">Active orders</div><div class="value">${e.openQueue}</div><div class="helper">Open queue</div></div>
      <div class="panel stat"><div class="card-label">Ready pickup</div><div class="value">${e.readyPickup}</div><div class="helper">Awaiting claim</div></div>
      <div class="panel stat"><div class="card-label">Paid today</div><div class="value">${C(e.paidToday)}</div><div class="helper">Collected cash</div></div>
      <div class="panel stat"><div class="card-label">Customers</div><div class="value">${e.customerCount}</div><div class="helper">Customer records</div></div>
    </section>
    <section class="dashboard-main">
      <article class="panel revenue-panel">
        ${P("Revenue overview","Paid amount for the last 7 days.")}
        <div class="mini-chart">
          <span></span><span></span><span></span><span></span><span></span><span></span><span class="is-today"></span>
        </div>
        <div class="chart-days">${r.map(n=>`<span>${l(n)}</span>`).join("")}</div>
      </article>
      <article class="panel recent-panel">
        ${P("Recent activities","Latest tickets and workflow movements.")}
        <div class="activity-list">
          ${t.map(n=>`<div><strong>${l(n.ticket)} moved to ${l(n.status)}</strong><span>${l(n.customer)} - just now</span></div>`).join("")||'<p class="helper">No recent activity.</p>'}
        </div>
      </article>
    </section>
  `}function Kt(e,t,a,s,r,n,o){const i=a.filter(u=>u.serviceType==="order"),c=a.filter(u=>u.serviceType==="addon"),d=f.receiptOrderId?e.find(u=>u.id===f.receiptOrderId):null,p=new Set(e.map(u=>u.customerId)),h=t.filter(u=>p.has(u.id));return`
    <section class="grid content full">
      <article class="panel">
        ${P("New POS order","Customer, service, weight, add-ons, and initial payment")}
        <form id="order-form" class="form">
          <div class="form-row">
            <label>Existing customer (${l(o)})
              <select name="customerId">
                <option value="">-- New customer --</option>
                ${h.map(u=>`<option value="${u.id}" data-name="${l(u.name)}" data-phone="${l(u.phone??"")}">${l(u.name)} ${u.phone?`- ${l(u.phone)}`:""}</option>`).join("")}
              </select>
            </label>
            <label>Customer name<input name="customerName" required placeholder="Customer name" /></label>
          </div>
          <div class="form-row">
            <label>Phone<input name="customerPhone" placeholder="09..." /></label>
          </div>

          <label>Service
            <select name="serviceId" required>
              ${i.map(u=>`<option value="${u.id}">${l(u.name)} - ${C(u.price)}</option>`).join("")}
            </select>
          </label>
          <label>Item category
            <select name="itemCategoryId" required>
              ${s.map(u=>`<option value="${u.id}">${l(u.name)} max ${u.maxKg}kg</option>`).join("")}
            </select>
            <span class="field-hint" data-category-weight></span>
          </label>
          <label>Weight (KG)<input name="weightKg" type="number" min="0.25" max="200" step="0.01" value="1" required /></label>

          <fieldset class="check-grid">
            <legend>Extra services</legend>
            ${c.length?c.map(u=>`<label class="check"><input type="checkbox" name="addonIds" value="${u.id}" /> ${l(me(u.name))} ${C(u.price)}</label>`).join(""):'<p class="helper">No extra services configured.</p>'}
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
        ${P("Order queue","Workflow, payment, and receipts")}
        <div class="table orders-table">
          <div class="table-head"><div>Ticket</div><div>Customer</div><div>Total</div><div>Status</div><div>Actions</div></div>
          ${e.map(u=>Xt(u,r,a)).join("")||'<div class="helper">No orders yet.</div>'}
        </div>
      </article>
      ${d?Wt(d,n.filter(u=>u.orderId===d.id)):""}
    </section>
  `}function Xt(e,t,a){const s=Fe(e,a),r=s.find(i=>!e.workflowCompleted.includes(i.key)),n=r?.key==="fold",o=r?.key==="extras"&&e.extras.length>0;return`
    <div class="table-row">
      <div><strong>${l(e.ticket)}</strong><div class="small">${l(e.service)} / ${l(e.itemCategory)}</div></div>
      <div>${l(e.customer)}<div class="small">${l(e.phone??"")}</div></div>
      <div class="amount-cell"><strong>${C(e.totalAmount)}</strong><div class="small">Paid ${C(e.paidAmount)} / Bal ${C(e.balance)}</div></div>
      <div>
        <div class="${e.status==="ready"||e.status==="claimed"?"ok":"warn"}">${l(e.status)}</div>
        <div class="workflow-progress">
          ${s.map(i=>`<span class="${e.workflowCompleted.includes(i.key)?"is-done":r?.key===i.key?"is-next":""}">${l(i.label)}</span>`).join("")}
        </div>
      </div>
      <div class="row-actions">
        ${r?`<form class="inline-form advance-form" data-order-id="${e.id}">
          ${o?`<div class="extra-confirmation">Confirm extra service: <strong>${e.extras.map(i=>l(me(i.name))).join(", ")}</strong></div>`:""}
          ${n?`<select name="assignedStaffId" required>
            <option value="">Staff</option>
            ${t.map(i=>`<option value="${i.id}">${l(i.name)}</option>`).join("")}
          </select>`:""}
          <button class="secondary" type="submit">Next: ${l(r.label)}</button>
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
  `}function Wt(e,t){const a=t.reduce((r,n)=>r+Number(n.amount),0),s=Math.max(0,Number((a-e.totalAmount).toFixed(2)));return`
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="receipt-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-print-receipt>Print</button>
          <button class="secondary" type="button" data-close-receipt>Close</button>
        </div>
        <div class="receipt" id="receipt-print-area">
          <div class="receipt-head">
            <h3 id="receipt-title">Laba101</h3>
            <p>${l(e.ticket)}<br>${l(kt(e.createdAt))}</p>
          </div>
          <div class="receipt-customer">
            <strong>${l(e.customer)}</strong>
            <span>${l(e.phone??"No phone")}</span>
          </div>
          <div class="summary-list receipt-lines">
            <div><span>Service</span><strong>${l(e.service)}</strong></div>
            <div><span>Category</span><strong>${l(e.itemCategory)}</strong></div>
            <div><span>Weight</span><strong>${e.weightKg} kg</strong></div>
            ${e.extras.length?`<div><span>Extra services</span><strong>${e.extras.map(r=>l(me(r.name))).join(", ")}</strong></div>`:""}
            <div><span>Total</span><strong>${C(e.totalAmount)}</strong></div>
            <div><span>Tendered</span><strong>${C(a)}</strong></div>
            <div><span>Paid</span><strong>${C(e.paidAmount)}</strong></div>
            <div><span>Change</span><strong>${C(s)}</strong></div>
            <div><span>Balance</span><strong>${C(e.balance)}</strong></div>
          </div>
          <h3>Payments</h3>
          <div class="receipt-payments">
            ${t.map(r=>`<div><span>${l(r.method.toUpperCase())}</span><strong>${C(r.amount)}</strong>${r.reference?`<small>Ref ${l(r.reference)}</small>`:""}</div>`).join("")||'<p class="helper">No payments yet.</p>'}
          </div>
        </div>
      </div>
    </div>
  `}function Ht(e,t){return`
    <section class="grid content full">
      <article class="panel">
        ${P("Customer Management","Customer records from local offline storage")}
        <div class="summary-list">
          <div><span>Total customers</span><strong>${e.length}</strong></div>
          <div><span>Orders linked</span><strong>${t.length}</strong></div>
        </div>
      </article>
      <article class="panel">
        ${P("Customer list","Names, phones, and addresses")}
        <div class="table">
          <div class="table-head"><div>Name</div><div>Phone</div><div>Address</div><div></div><div></div></div>
          ${e.map(a=>`<div class="table-row"><div><strong>${l(a.name)}</strong></div><div>${l(a.phone??"No phone")}</div><div>${l(a.address??"No address")}</div><div></div><div></div></div>`).join("")||'<div class="helper">No customers yet.</div>'}
        </div>
      </article>
    </section>
  `}function Gt(e,t){return`
    <section class="grid content full">
      <article class="panel">
        ${P("Services","Order services and add-ons used by POS pricing")}
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
        ${P("Item categories","Load limits and extra fees")}
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
          ${e.map(a=>`<div class="table-row"><div>${l(a.name)}</div><div>${l(a.serviceType)}</div><div>${C(a.price)}</div><div>${l(a.includes.join(", "))}</div><div>${a.isActive?"Yes":"No"}</div>
          <div class="row-actions">
            <button class="secondary edit-service-btn" data-id="${a.id}">Edit</button>
            ${a.isActive?`<button class="secondary deactivate-service-btn" data-id="${a.id}">Deactivate</button>`:`<button class="secondary activate-service-btn" data-id="${a.id}">Activate</button>`}
            <button class="secondary delete-service-btn" data-id="${a.id}">Delete</button>
          </div></div>`).join("")}
        </div>
        <div class="section-divider"></div>
        <div class="table">
          <div class="table-head"><div>Name</div><div>Max KG</div><div>Extra fee</div><div></div><div></div></div>
          ${t.map(a=>`<div class="table-row"><div>${l(a.name)}</div><div>${a.maxKg}</div><div>${C(a.additionalFee)}</div><div></div><div></div></div>`).join("")}
        </div>
      </article>
    </section>
  `}function Yt(e,t){const a=F(),s=a.slice(0,7),r=e.filter(c=>c.expenseDate===a).reduce((c,d)=>c+d.amount,0),n=e.filter(c=>c.expenseDate.startsWith(s)).reduce((c,d)=>c+d.amount,0),o=t.filter(c=>c.saleDate===a).reduce((c,d)=>c+d.totalAmount,0),i=t.filter(c=>c.saleDate.startsWith(s)).reduce((c,d)=>c+d.totalAmount,0);return`
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
      <div class="panel stat"><div class="card-label">Daily disbursement</div><div class="value">${C(r)}</div></div>
      <div class="panel stat"><div class="card-label">Monthly disbursement</div><div class="value">${C(n)}</div></div>
      <div class="panel stat"><div class="card-label">Today sales input</div><div class="value">${C(o)}</div></div>
      <div class="panel stat"><div class="card-label">Month sales input</div><div class="value">${C(i)}</div></div>
    </section>
    ${f.dailyReportTab==="expenses"?`
    <section class="grid content full">
      <article class="panel">
        ${P("Input disbursement","Supplies, utilities, and cash disbursements")}
        <form id="expense-form" class="form">
          <div class="form-row"><label>Date<input name="expenseDate" type="date" value="${F()}" required /></label><label>Amount<input name="amount" type="number" min="0" step="0.01" required /></label></div>
          <div class="form-row"><label>Name<input name="name" required /></label><label>Category<input name="category" required /></label></div>
          <label>Description<textarea name="description"></textarea></label>
          <button class="primary" type="submit">Save expense</button>
        </form>
      </article>
      <article class="panel">
        ${P("Disbursement list","Expenses only")}
        <div class="table">
          <div class="table-head"><div>Date</div><div>No.</div><div>Name</div><div>Category</div><div>Amount</div></div>
          ${e.map(c=>`<div class="table-row"><div>${l(c.expenseDate)}</div><div>${l(c.number)}</div><div>${l(c.name)}</div><div>${l(c.category)}</div><div>${C(c.amount)}</div></div>`).join("")||'<div class="helper">No expenses yet.</div>'}
        </div>
      </article>
    </section>
    `:`
    <section class="grid content full">
      <article class="panel">
        ${P("Input total sale","Manual cash and GCash totals")}
        <form id="sales-form" class="form">
          <label>Date<input name="saleDate" type="date" value="${F()}" required /></label>
          <label>Cash sales<input name="cashAmount" type="number" min="0" step="0.01" value="0" /></label>
          <label>GCash sales<input name="gcashAmount" type="number" min="0" step="0.01" value="0" /></label>
          <label>Notes<textarea name="notes" placeholder="Optional"></textarea></label>
          <button class="primary" type="submit">Save daily sale</button>
        </form>
      </article>
      <article class="panel">
        ${P("Daily sales history","Cash, GCash, total sale, notes, and updates")}
        <div class="table wide-table">
          <div class="table-head"><div>Sales #</div><div>Date</div><div>Cash</div><div>GCash</div><div>Total sale</div></div>
          ${t.map(c=>`<div class="table-row"><div>${l(c.saleNumber)}</div><div>${l(c.saleDate)}</div><div>${C(c.cashAmount)}</div><div>${C(c.gcashAmount)}</div><div><strong>${C(c.totalAmount)}</strong></div></div>`).join("")||'<div class="helper">No daily sales totals yet.</div>'}
        </div>
      </article>
    </section>
    `}
  `}function Vt(e,t,a,s,r,n,o){return`
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
            <label>From<input name="dateFrom" data-date-from type="date" value="${F()}" /></label>
            <label>To<input name="dateTo" data-date-to type="date" value="${F()}" /></label>
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
  `}function Jt(e,t){return`
    <section class="grid content full">
      <article class="panel">
        ${P("Inventory","Service catalog and item load limits")}
        <div class="summary-list">
          <div><span>Active services</span><strong>${e.filter(a=>a.isActive).length}</strong></div>
          <div><span>Item categories</span><strong>${t.length}</strong></div>
        </div>
      </article>
      <article class="panel">
        ${P("Service inventory","Current sellable laundry services")}
        <div class="table">
          <div class="table-head"><div>Name</div><div>Category</div><div>Price</div><div>Max KG</div><div>Status</div></div>
          ${e.map(a=>`<div class="table-row"><div><strong>${l(a.name)}</strong></div><div>${l(a.category)}</div><div>${C(a.price)}</div><div>${a.maxKg} kg</div><div>${a.isActive?"Active":"Inactive"}</div></div>`).join("")}
        </div>
      </article>
    </section>
  `}function Qt(e,t,a){const s=e.filter(n=>n.status!=="under_cleaning"),r=e.filter(n=>n.status==="under_cleaning");return`
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
        ${P("Available Machines","Select machines to start cleaning.")}
        <form id="subcleaning-form" class="form">
          <input type="hidden" name="date" value="${F()}" />
          <fieldset class="machine-list">
            ${s.map(n=>`<label class="machine-card"><input type="checkbox" name="machineIds" value="${n.id}" /><span><strong>${l(n.machineName)}</strong><small>${l(n.machineType)}</small></span><em></em></label>`).join("")||'<p class="helper">All machines are currently being cleaned.</p>'}
          </fieldset>
          <input type="hidden" name="cleaningStatus" value="in_progress" />
          <label>Notes <textarea name="notes" placeholder="e.g. Deep clean filters"></textarea></label>
          <input type="hidden" name="branch" value="${l(a)}" />
          <button class="primary" type="submit">Start Cleaning</button>
        </form>
      </article>
      <article class="panel warning-panel">
        ${P("Under Cleaning","Machines currently being serviced.")}
        <div class="machine-stack">
          ${r.length?r.map(n=>`
            <div class="machine-status">
              <span><strong>${l(n.machineName)}</strong><small>${l(n.machineType)}</small></span>
              <b>In progress</b>
              <button class="secondary complete-cleaning-btn" type="button" data-machine-id="${n.id}" data-branch="${l(a)}">Mark Complete</button>
            </div>`).join(""):'<p class="helper">No machines under cleaning right now.</p>'}
        </div>
      </article>
      <article class="panel span-2">
        ${P("Daily Cleaning Checklist","Track which machines have been cleaned today.")}
        <div class="table">
          <div class="table-head"><div>Machine</div><div>Type</div><div>Status</div><div>Notes</div><div>Date</div></div>
          ${e.map(n=>{const o=t.find(i=>i.machineIds.includes(n.id)&&i.date===F());return`<div class="table-row"><div><strong>${l(n.machineName)}</strong></div><div>${l(n.machineType)}</div><div>${o?l(o.cleaningStatus.replace("_"," ")):"Not Cleaned"}</div><div>${l(o?.notes??"-")}</div><div>${F()}</div></div>`}).join("")}
        </div>
      </article>
    </section>
    `:`
    <section class="grid content full">
      <article class="panel">
        ${P("Add Machine","Create washer and dryer records")}
        <form id="machine-form" class="form">
          <label>Machine Name<input name="machineName" required placeholder="e.g. Washer 5" /></label>
          <label>Type<select name="machineType"><option value="washer">Washer</option><option value="dryer">Dryer</option></select></label>
          <label>Status<select name="status"><option value="available">Available</option><option value="under_cleaning">Under Cleaning</option><option value="maintenance">Maintenance</option></select></label>
          <input type="hidden" name="branch" value="${l(a)}" />
          <button class="primary" type="submit">Add machine</button>
        </form>
      </article>
      <article class="panel">
        ${P("Machines","Washer and dryer status")}
        <div class="table">
          <div class="table-head"><div>Name</div><div>Type</div><div>Status</div><div>Branch</div><div>Actions</div></div>
          ${e.map(n=>`<div class="table-row"><div><strong>${l(n.machineName)}</strong></div><div>${l(n.machineType)}</div><div>${l(n.status.replace("_"," "))}</div><div>${l(n.branch)}</div>
          <div class="row-actions">
            ${n.status!=="inactive"?`<button class="secondary deactivate-machine-btn" data-id="${n.id}">Deactivate</button>`:`<button class="secondary activate-machine-btn" data-id="${n.id}">Activate</button>`}
          </div></div>`).join("")||'<div class="helper">No machines found.</div>'}
        </div>
      </article>
    </section>
    `}
  `}function zt(e,t){return`
    <section class="grid">
      <div class="page-head">
        <div>
          <p class="eyebrow">Team Management</p>
          <h2>Staff Overview</h2>
        </div>
        <button class="primary" id="open-add-staff-modal" type="button">+ Add staff</button>
      </div>

      <article class="panel">
        ${P("Staff list","Branch: "+l(t))}
        <div class="table">
          <div class="table-head staff-table-head"><div>Name</div><div>Email</div><div>Role</div><div>Branch</div><div>Status</div><div>Actions</div></div>
          ${e.length?e.map(a=>`<div class="table-row staff-table-row"><div><strong>${l(a.name)}</strong></div><div>${l(a.email)}</div><div class="small">${l(a.role)}</div><div>${l(a.branch)}</div><div>${a.isActive!==0?"Active":"Inactive"}</div>
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
  `}function Zt(e,t,a){return`
    <section class="grid content full">
      <article class="panel">
        ${P("Settings","Device-local configuration")}
        <form id="settings-form" class="form">
          <label>Current branch<select name="branch">
            ${["Main Store","Mintal Branch","Gensan Branch"].map(s=>`<option value="${s}" ${s===e?"selected":""}>${s}</option>`).join("")}
          </select></label>
          <label>Fold rate<input name="foldRate" type="number" min="0" step="0.01" value="${t}" /></label>
          <label>Report email<input name="reportEmail" type="email" placeholder="admin@laba101.test" value="${l(a)}" /></label>
          <button class="primary" type="submit">Save settings</button>
        </form>
      </article>
    </section>
  `}function ea(){const e=()=>{localStorage.removeItem(Y),f.currentUser=null,f.tab="dashboard",f.receiptOrderId=0,f.sidebarOpen=!1,A()};document.querySelector("#logout-button")?.addEventListener("click",e),document.querySelector("#mobile-logout-button")?.addEventListener("click",e),document.querySelector("#mobile-menu-button")?.addEventListener("click",()=>{f.sidebarOpen=!0,A()}),document.querySelector("#sidebar-close-button")?.addEventListener("click",()=>{f.sidebarOpen=!1,A()}),document.querySelector("#sidebar-backdrop")?.addEventListener("click",()=>{f.sidebarOpen=!1,A()}),document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{f.tab=t.dataset.tab,f.receiptOrderId=0,f.sidebarOpen=!1,A()})}),document.querySelectorAll("[data-quick-tab]").forEach(t=>{t.addEventListener("click",()=>{f.tab=t.dataset.quickTab,A()})}),document.querySelectorAll("[data-receipt]").forEach(t=>{t.addEventListener("click",()=>{f.receiptOrderId=Number(t.dataset.receipt),A()})}),document.querySelector("[data-close-receipt]")?.addEventListener("click",()=>{f.receiptOrderId=0,A()}),document.querySelector("[data-print-receipt]")?.addEventListener("click",()=>{window.print()}),document.querySelectorAll("[data-report-tab]").forEach(t=>{t.addEventListener("click",()=>{f.dailyReportTab=t.dataset.reportTab,A()})}),document.querySelectorAll("[data-maintenance-tab]").forEach(t=>{t.addEventListener("click",()=>{f.maintenanceTab=t.dataset.maintenanceTab,A()})})}function ta(){Bt(),document.querySelector("#login-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget),a=document.querySelector("#login-button");a&&(a.disabled=!0,a.textContent="Signing in...");try{const s=await Ue(String(t.get("email")??""),String(t.get("password")??""));if(!s){f.loginError="Invalid email or password.",await A();return}f.currentUser=s,f.loginError="",await Z("branch",String(s.branch||"Main Store")),t.get("remember")?localStorage.setItem(Y,JSON.stringify({email:s.email,remembered:!0})):localStorage.removeItem(Y),Xe().includes(f.tab)||(f.tab="dashboard"),await A()}catch(s){alert("Login Error: "+String(s?.message||s)),a&&(a.disabled=!1,a.textContent="Sign in")}})}function aa(){z&&window.clearInterval(z);const e=document.querySelector("[data-dashboard-time]"),t=document.querySelector("[data-dashboard-date]");if(!e||!t){z=void 0;return}const a=()=>{const s=Ke();e.textContent=s.time,t.textContent=s.date};a(),z=window.setInterval(a,1e3)}function sa(e){const t=document.querySelector("#order-form"),a=document.querySelector("#price-preview"),s=t?.querySelector('button[type="submit"]'),r=t?.querySelector('select[name="customerId"]'),n=t?.querySelector('input[name="customerName"]'),o=t?.querySelector('input[name="customerPhone"]'),i=t?.querySelector("[data-category-weight]"),c=t?.querySelector("[data-order-error]"),d=t?.querySelector('select[name="paymentMethod"]'),p=t?.querySelector(".gcash-reference"),h=t?.querySelector('input[name="paymentReference"]'),u=()=>{if(!r||!n||!o)return;const m=r.selectedOptions[0];n.value=m?.dataset.name??"",o.value=m?.dataset.phone??""},y=()=>{const m=d?.value==="gcash";p&&(p.hidden=!m),h&&(h.required=m,m||(h.value=""))},v=()=>{if(!t||!a)return;const m=new FormData(t),b=e.services.find(R=>R.id===Number(m.get("serviceId"))),L=e.categories.find(R=>R.id===Number(m.get("itemCategoryId"))),O=e.services.filter(R=>m.getAll("addonIds").map(Number).includes(R.id));if(!b||!L)return;const $=be(b,L,Number(m.get("weightKg")??0),O);i&&(i.textContent=`Allowed item weight: ${L.maxKg} kg`);const E=O.map(R=>me(R.name)),g=$.extraKg>0;s&&(s.disabled=g),c&&(c.hidden=!g,c.textContent=$.warning??""),a.classList.toggle("has-error",g),a.innerHTML=`
      <div class="preview-line"><span>Base price</span><strong>${C($.price)}</strong></div>
      ${$.extraServiceAmount>0?`<div class="preview-line"><span>Extra services${E.length?` (${l(E.join(", "))})`:""}</span><strong>${C($.extraServiceAmount)}</strong></div>`:""}
      <div class="preview-total"><span>Total amount</span><strong>${C($.totalAmount)}</strong></div>
      ${$.warning?`<span class="warn">${l($.warning)}</span>`:""}
    `};r?.addEventListener("change",u),d?.addEventListener("change",y),y(),t?.addEventListener("input",v),t?.addEventListener("change",v),v(),t?.addEventListener("submit",async m=>{m.preventDefault();const b=new FormData(t),L=e.services.find(E=>E.id===Number(b.get("serviceId"))),O=e.categories.find(E=>E.id===Number(b.get("itemCategoryId"))),$=e.services.filter(E=>b.getAll("addonIds").map(Number).includes(E.id));if(L&&O){const E=be(L,O,Number(b.get("weightKg")??0),$);if(E.extraKg>0){c&&(c.hidden=!1,c.textContent=E.warning??"Weight exceeds the allowed limit.");return}}try{await wt({customerId:Number(b.get("customerId"))||void 0,customerName:String(b.get("customerName")??""),customerPhone:String(b.get("customerPhone")??"")||null,serviceId:Number(b.get("serviceId")),itemCategoryId:Number(b.get("itemCategoryId")),branch:e.branch,weightKg:Number(b.get("weightKg")),addonIds:b.getAll("addonIds").map(Number),paidAmount:Number(b.get("paidAmount")??0),paymentMethod:String(b.get("paymentMethod")??"cash"),paymentReference:String(b.get("paymentReference")??"")||null,notes:String(b.get("notes")??"")||null}),await A()}catch(E){c&&(c.hidden=!1,c.textContent=E instanceof Error?E.message:"Order could not be saved.")}}),document.querySelectorAll(".advance-form").forEach(m=>{m.addEventListener("submit",async b=>{b.preventDefault();const L=new FormData(m);await Tt(Number(m.dataset.orderId),Number(L.get("assignedStaffId"))||null),await A()})}),document.querySelectorAll(".payment-form").forEach(m=>{const b=m.querySelector('select[name="method"]'),L=m.querySelector('input[name="reference"]'),O=()=>{const $=b?.value==="gcash";L&&(L.hidden=!$,L.required=$,$||(L.value=""))};b?.addEventListener("change",O),O(),m.addEventListener("submit",async $=>{$.preventDefault();const E=new FormData(m);await je(Number(m.dataset.orderId),{amount:Number(E.get("amount")),method:String(E.get("method")),reference:String(E.get("reference")??"")||null}),await A()})})}function na(e){document.querySelector("#service-form")?.addEventListener("submit",async t=>{t.preventDefault();const a=new FormData(t.currentTarget),s=a.get("id")?Number(a.get("id")):void 0;await Pe({id:s,name:String(a.get("name")??""),description:String(a.get("description")??"")||null,category:String(a.get("category")??""),serviceType:String(a.get("serviceType")??"order"),price:Number(a.get("price")??0),maxKg:Number(a.get("maxKg")??0),dryingMinutes:Number(a.get("dryingMinutes"))||null,includes:String(a.get("includes")??"").split(",").map(r=>r.trim()).filter(Boolean),additionalCharge:0,turnaroundHours:Number(a.get("turnaroundHours")??24),isActive:1}),await A()}),document.querySelectorAll(".edit-service-btn").forEach(t=>{t.addEventListener("click",()=>{const a=Number(t.dataset.id),s=e.find(n=>n.id===a),r=document.querySelector("#service-form");s&&r&&(r.querySelector("[name=id]").value=String(s.id),r.querySelector("[name=name]").value=s.name,r.querySelector("[name=category]").value=s.category,r.querySelector("[name=serviceType]").value=s.serviceType,r.querySelector("[name=price]").value=String(s.price),r.querySelector("[name=maxKg]").value=String(s.maxKg),r.querySelector("[name=dryingMinutes]").value=s.dryingMinutes?String(s.dryingMinutes):"",r.querySelector("[name=includes]").value=s.includes.join(", "),r.querySelector("[name=turnaroundHours]").value=String(s.turnaroundHours),r.querySelector("[name=description]").value=s.description??"",window.scrollTo({top:0,behavior:"smooth"}))})}),document.querySelectorAll(".deactivate-service-btn, .activate-service-btn").forEach(t=>{t.addEventListener("click",async()=>{const a=Number(t.dataset.id),s=e.find(r=>r.id===a);if(s){const r=s.isActive?0:1;await Pe({id:s.id,name:s.name,description:s.description,category:s.category,serviceType:s.serviceType,price:s.price,maxKg:s.maxKg,dryingMinutes:s.dryingMinutes,includes:s.includes,additionalCharge:s.additionalCharge,turnaroundHours:s.turnaroundHours,isActive:r}),await A()}})}),document.querySelectorAll(".delete-service-btn").forEach(t=>{t.addEventListener("click",async()=>{confirm("Are you sure you want to delete this service?")&&(await yt(Number(t.dataset.id)),await A())})}),document.querySelector("#category-form")?.addEventListener("submit",async t=>{t.preventDefault();const a=new FormData(t.currentTarget);await gt({name:String(a.get("name")??""),maxKg:Number(a.get("maxKg")??0),additionalFee:Number(a.get("additionalFee")??0),isActive:1}),await A()})}function ra(){document.querySelector("#expense-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await $t({expenseDate:String(t.get("expenseDate")??""),name:String(t.get("name")??""),category:String(t.get("category")??""),description:String(t.get("description")??""),amount:Number(t.get("amount")??0)}),await A()}),document.querySelector("#fold-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await Lt({orderTicket:String(t.get("orderTicket")??""),staffName:String(t.get("staffName")??""),foldCount:Number(t.get("foldCount")??1),rate:Number(t.get("rate")??5)}),await A()})}function ia(e,t,a,s){document.querySelector("#sales-form")?.addEventListener("submit",async y=>{y.preventDefault();const v=new FormData(y.currentTarget);await Dt({saleDate:String(v.get("saleDate")??""),cashAmount:Number(v.get("cashAmount")??0),gcashAmount:Number(v.get("gcashAmount")??0),notes:String(v.get("notes")??"")}),await A()});const r=document.querySelector("[data-date-from]"),n=document.querySelector("[data-date-to]");document.querySelectorAll("[data-date-scope]").forEach(y=>{y.addEventListener("change",()=>{if(!y.checked||!r||!n)return;const v=new Date,m=ce(v),b=new Date(v);y.value==="week"&&b.setDate(v.getDate()-6),y.value==="month"&&b.setDate(1),y.value!=="custom"&&(r.value=y.value==="today"?m:ce(b),n.value=m)})});const o=()=>new Set(Array.from(document.querySelectorAll('input[name="reportType"]:checked')).map(y=>y.value)),i=()=>({from:r?.value||"0000-01-01",to:n?.value||"9999-12-31"}),c=y=>{const v=i();return y>=v.from&&y<=v.to},d=()=>{const y=o(),v=e.filter(g=>c(ee(g.createdAt))),m=t.filter(g=>c(g.saleDate)),b=a.filter(g=>c(g.expenseDate)),L=_e(e.filter(g=>c(ee(g.createdAt))),s),O=v.reduce((g,R)=>g+R.paidAmount,0)+m.reduce((g,R)=>g+R.totalAmount,0),$=b.reduce((g,R)=>g+R.amount,0)+L.reduce((g,R)=>g+R.total,0),E=[["Type","Date","Number","Name","Cash","GCash","Total","Balance"]];return y.has("sales")&&(E.push(...v.map(g=>["Order",ee(g.createdAt),g.ticket,g.customer,"","",g.paidAmount,g.balance])),E.push(...m.map(g=>["Manual Sale",g.saleDate,g.saleNumber,g.notes??"",g.cashAmount,g.gcashAmount,g.totalAmount,""]))),y.has("disbursement")&&(E.push(...b.map(g=>["Expense",g.expenseDate,g.number,g.name,"","",g.amount,""])),E.push(...L.map(g=>["Fold Payout",i().from,`${g.folds} fold(s)`,g.staffName,"","",g.total,""]))),y.has("summary")&&(E.push([]),E.push(["Summary",i().from,"to",i().to,"","","",""]),E.push(["Total Sales","","","","","",O,""]),E.push(["Total Disbursement","","","","","",$,""]),E.push(["Profit","","","","","",O-$,""])),E},p=y=>{const v=y.map(m=>m.length?`<tr>${m.map(b=>`<td>${l(String(b??""))}</td>`).join("")}</tr>`:'<tr><td colspan="8">&nbsp;</td></tr>').join("");return`<!doctype html>
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
  <p><strong>Date from:</strong> ${l(i().from)}</p>
  <p><strong>Date to:</strong> ${l(i().to)}</p>
  <table>${v}</table>
</body>
</html>`},h=()=>{const y=p(d()),v=i(),m=`laba101-report-${v.from}-to-${v.to}.xls`,b=new Blob([y],{type:"application/vnd.ms-excel"}),L=URL.createObjectURL(b),O=document.createElement("a");return O.href=L,O.download=m,document.body.appendChild(O),O.click(),setTimeout(()=>{O.remove(),URL.revokeObjectURL(L)},1e3),m},u=async y=>{const v=document.querySelector(y==="export"?"#export-report":"#email-report");v&&(v.disabled=!0,v.textContent=y==="export"?"Exporting...":"Sending...");try{if(y==="export"){const m=h();alert(`Report saved: ${m}`)}else{const m=await qe("report_email")||"";if(!m){alert("Please configure a report email in Settings first.");return}const b=h(),L=i(),O=`Laba101 report ${L.from} to ${L.to}`,$=`Hi,

Please find the attached Laba101 report file: ${b}

Date range: ${L.from} to ${L.to}`,E=`mailto:${m}?subject=${encodeURIComponent(O)}&body=${encodeURIComponent($)}`;setTimeout(()=>{window.location.href=E},800),alert(`Report downloaded as "${b}".
Your email app will open — please attach the file and send.`)}}catch(m){alert("Failed: "+String(m))}finally{v&&(v.disabled=!1,v.textContent=y==="export"?"Export Excel":"Send to Email")}};document.querySelector("#export-report")?.addEventListener("click",async()=>{await u("export")}),document.querySelector("#email-report")?.addEventListener("click",async()=>{await u("email")})}function oa(){document.querySelector("#machine-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await Pt({machineName:String(t.get("machineName")??""),machineType:String(t.get("machineType")),status:String(t.get("status")),branch:String(t.get("branch")??"")}),await A()}),document.querySelector("#subcleaning-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=e.currentTarget.querySelector('button[type="submit"]');t&&(t.disabled=!0,t.textContent="Starting...");const a=new FormData(e.currentTarget),s=a.getAll("machineIds").map(Number);if(!s.length){alert("Please select at least one machine to clean."),t&&(t.disabled=!1,t.textContent="Start Cleaning");return}await It({date:String(a.get("date")??""),machineIds:s,cleaningStatus:String(a.get("cleaningStatus")??""),notes:String(a.get("notes")??""),branch:String(a.get("branch")??"")}),await A()}),document.querySelectorAll(".complete-cleaning-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.machineId),a=e.dataset.branch??"";e.disabled=!0,e.textContent="Completing...",await qt(t,a),await A()})}),document.querySelectorAll(".deactivate-machine-btn, .activate-machine-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.id),a=e.classList.contains("deactivate-machine-btn");await Rt(t,a?"inactive":"available"),await A()})})}function ca(e){const t=document.querySelector("#add-staff-modal"),a=document.querySelector("#open-add-staff-modal"),s=document.querySelector("#close-add-staff-modal"),r=document.querySelector("#staff-form"),n=()=>{r?.reset(),r&&(r.querySelector("[name=id]").value="");const i=document.querySelector("#add-staff-title");i&&(i.textContent="Add staff member"),t?.removeAttribute("hidden")},o=()=>{t?.setAttribute("hidden",""),r?.reset()};a?.addEventListener("click",n),s?.addEventListener("click",o),t?.addEventListener("click",i=>{i.target===t&&o()}),document.querySelectorAll(".edit-staff-btn").forEach(i=>{i.addEventListener("click",()=>{const c=Number(i.dataset.id),d=e.find(p=>p.id===c);if(d&&r){r.querySelector("[name=id]").value=String(d.id),r.querySelector("[name=name]").value=d.name,r.querySelector("[name=email]").value=d.email,r.querySelector("[name=password]").value=d.password,r.querySelector("[name=role]").value=d.role,r.querySelector("[name=branch]").value=d.branch;const p=document.querySelector("#add-staff-title");p&&(p.textContent="Edit staff member"),t?.removeAttribute("hidden")}})}),document.querySelectorAll(".deactivate-staff-btn, .activate-staff-btn").forEach(i=>{i.addEventListener("click",async()=>{const c=Number(i.dataset.id),d=e.find(p=>p.id===c);d&&(await De(c,{isActive:d.isActive!==0?0:1}),await A())})}),r?.addEventListener("submit",async i=>{i.preventDefault();const c=document.querySelector("#staff-save-btn");c&&(c.disabled=!0,c.textContent="Saving...");const d=new FormData(r),p=d.get("id")?Number(d.get("id")):void 0,h=String(d.get("name")??"").trim(),u=String(d.get("email")??"").trim(),y=String(d.get("password")??"password")||"password",v=String(d.get("role")),m=String(d.get("branch")??"");if(!h||!u){alert("Name and email are required."),c&&(c.disabled=!1,c.textContent="Save staff member");return}try{p?await De(p,{name:h,email:u,password:y,role:v,branch:m}):await ht({name:h,email:u,password:y,role:v,branch:m}),o(),await A()}catch{alert("Failed to save staff. The email may already be in use."),c&&(c.disabled=!1,c.textContent="Save staff member")}})}function la(){document.querySelector("#settings-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await Z("branch",String(t.get("branch")??"Main Store")),await Z("fold_rate",String(t.get("foldRate")??"5")),String(t.get("reportEmail")??"")&&await Z("report_email",String(t.get("reportEmail"))),alert("Settings saved successfully!"),await A()})}await mt();const xe=localStorage.getItem(Y);if(xe)try{const e=JSON.parse(xe);if(e.email&&e.remembered){const t=await Ue(e.email,"password")??null;f.currentUser=t}}catch{localStorage.removeItem(Y)}await A();export{ye as W};
