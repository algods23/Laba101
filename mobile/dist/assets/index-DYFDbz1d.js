(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function a(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=a(r);fetch(r.href,n)}})();var G;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(G||(G={}));class ge extends Error{constructor(t,a,s){super(t),this.message=t,this.code=a,this.data=s}}const Ze=e=>{var t,a;return e?.androidBridge?"android":!((a=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},et=e=>{const t=e.CapacitorCustomPlatform||null,a=e.Capacitor||{},s=a.Plugins=a.Plugins||{},r=()=>t!==null?t.name:Ze(e),n=()=>r()!=="web",o=m=>{const l=d.get(m);return!!(l?.platforms.has(r())||i(m))},i=m=>{var l;return(l=a.PluginHeaders)===null||l===void 0?void 0:l.find(g=>g.name===m)},c=m=>e.console.error(m),d=new Map,p=(m,l={})=>{const g=d.get(m);if(g)return console.warn(`Capacitor plugin "${m}" already registered. Cannot register plugins twice.`),g.proxy;const b=r(),h=i(m);let y;const $=async()=>(!y&&b in l?y=typeof l[b]=="function"?y=await l[b]():y=l[b]:t!==null&&!y&&"web"in l&&(y=typeof l.web=="function"?y=await l.web():y=l.web),y),A=(v,D)=>{var F,B;if(h){const j=h?.methods.find(q=>D===q.name);if(j)return j.rtype==="promise"?q=>a.nativePromise(m,D.toString(),q):(q,te)=>a.nativeCallback(m,D.toString(),q,te);if(v)return(F=v[D])===null||F===void 0?void 0:F.bind(v)}else{if(v)return(B=v[D])===null||B===void 0?void 0:B.bind(v);throw new ge(`"${m}" plugin is not implemented on ${b}`,G.Unimplemented)}},L=v=>{let D;const F=(...B)=>{const j=$().then(q=>{const te=A(q,v);if(te){const ae=te(...B);return D=ae?.remove,ae}else throw new ge(`"${m}.${v}()" is not implemented on ${b}`,G.Unimplemented)});return v==="addListener"&&(j.remove=async()=>D()),j};return F.toString=()=>`${v.toString()}() { [capacitor code] }`,Object.defineProperty(F,"name",{value:v,writable:!1,configurable:!1}),F},R=L("addListener"),I=L("removeListener"),P=(v,D)=>{const F=R({eventName:v},D),B=async()=>{const q=await F;I({eventName:v,callbackId:q},D)},j=new Promise(q=>F.then(()=>q({remove:B})));return j.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await B()},j},X=new Proxy({},{get(v,D){switch(D){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return h?P:R;case"removeListener":return I;default:return L(D)}}});return s[m]=X,d.set(m,{name:m,proxy:X,platforms:new Set([...Object.keys(l),...h?[b]:[]])}),X};return a.convertFileSrc||(a.convertFileSrc=m=>m),a.getPlatform=r,a.handleError=c,a.isNativePlatform=n,a.isPluginAvailable=o,a.registerPlugin=p,a.Exception=ge,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},tt=e=>e.Capacitor=et(e),w=tt(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),z=w.registerPlugin;class Ne{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,a){let s=!1;this.listeners[t]||(this.listeners[t]=[],s=!0),this.listeners[t].push(a);const n=this.windowListeners[t];n&&!n.registered&&this.addWindowListener(n),s&&this.sendRetainedArgumentsForEvent(t);const o=async()=>this.removeListener(t,a);return Promise.resolve({remove:o})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,a,s){const r=this.listeners[t];if(!r){if(s){let n=this.retainedEventArguments[t];n||(n=[]),n.push(a),this.retainedEventArguments[t]=n}return}r.forEach(n=>n(a))}hasListeners(t){var a;return!!(!((a=this.listeners[t])===null||a===void 0)&&a.length)}registerWindowListener(t,a){this.windowListeners[a]={registered:!1,windowEventName:t,pluginEventName:a,handler:s=>{this.notifyListeners(a,s)}}}unimplemented(t="not implemented"){return new w.Exception(t,G.Unimplemented)}unavailable(t="not available"){return new w.Exception(t,G.Unavailable)}async removeListener(t,a){const s=this.listeners[t];if(!s)return;const r=s.indexOf(a);this.listeners[t].splice(r,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const a=this.retainedEventArguments[t];a&&(delete this.retainedEventArguments[t],a.forEach(s=>{this.notifyListeners(t,s)}))}}const De=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),xe=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class at extends Ne{async getCookies(){const t=document.cookie,a={};return t.split(";").forEach(s=>{if(s.length<=0)return;let[r,n]=s.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");r=xe(r).trim(),n=xe(n).trim(),a[r]=n}),a}async setCookie(t){try{const a=De(t.key),s=De(t.value),r=t.expires?`; expires=${t.expires.replace("expires=","")}`:"",n=(t.path||"/").replace("path=",""),o=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${a}=${s||""}${r}; path=${n}; ${o};`}catch(a){return Promise.reject(a)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const a of t)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}z("CapacitorCookies",{web:()=>new at});const st=async e=>new Promise((t,a)=>{const s=new FileReader;s.onload=()=>{const r=s.result;t(r.indexOf(",")>=0?r.split(",")[1]:r)},s.onerror=r=>a(r),s.readAsDataURL(e)}),rt=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(r=>r.toLocaleLowerCase()).reduce((r,n,o)=>(r[n]=e[t[o]],r),{})},nt=(e,t=!0)=>e?Object.entries(e).reduce((s,r)=>{const[n,o]=r;let i,c;return Array.isArray(o)?(c="",o.forEach(d=>{i=t?encodeURIComponent(d):d,c+=`${n}=${i}&`}),c.slice(0,-1)):(i=t?encodeURIComponent(o):o,c=`${n}=${i}`),`${s}&${c}`},"").substr(1):null,it=(e,t={})=>{const a=Object.assign({method:e.method||"GET",headers:e.headers},t),r=rt(e.headers)["content-type"]||"";if(typeof e.data=="string")a.body=e.data;else if(r.includes("application/x-www-form-urlencoded")){const n=new URLSearchParams;for(const[o,i]of Object.entries(e.data||{}))n.set(o,i);a.body=n.toString()}else if(r.includes("multipart/form-data")||e.data instanceof FormData){const n=new FormData;if(e.data instanceof FormData)e.data.forEach((i,c)=>{n.append(c,i)});else for(const i of Object.keys(e.data))n.append(i,e.data[i]);a.body=n;const o=new Headers(a.headers);o.delete("content-type"),a.headers=o}else(r.includes("application/json")||typeof e.data=="object")&&(a.body=JSON.stringify(e.data));return a};class ot extends Ne{async request(t){const a=it(t,t.webFetchExtra),s=nt(t.params,t.shouldEncodeUrlParams),r=s?`${t.url}?${s}`:t.url,n=await fetch(r,a),o=n.headers.get("content-type")||"";let{responseType:i="text"}=n.ok?t:{};o.includes("application/json")&&(i="json");let c,d;switch(i){case"arraybuffer":case"blob":d=await n.blob(),c=await st(d);break;case"json":c=await n.json();break;default:c=await n.text()}const p={};return n.headers.forEach((m,l)=>{p[l]=m}),{data:c,headers:p,status:n.status,url:n.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}z("CapacitorHttp",{web:()=>new ot});var Oe;(function(e){e.Dark="DARK",e.Light="LIGHT",e.Default="DEFAULT"})(Oe||(Oe={}));var Pe;(function(e){e.StatusBar="StatusBar",e.NavigationBar="NavigationBar"})(Pe||(Pe={}));class ct extends Ne{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}z("SystemBars",{web:()=>new ct});const lt="modulepreload",dt=function(e){return"/"+e},Ie={},Ae=function(t,a,s){let r=Promise.resolve();if(a&&a.length>0){let c=function(d){return Promise.all(d.map(p=>Promise.resolve(p).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),i=o?.nonce||o?.getAttribute("nonce");r=c(a.map(d=>{if(d=dt(d),d in Ie)return;Ie[d]=!0;const p=d.endsWith(".css"),m=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${m}`))return;const l=document.createElement("link");if(l.rel=p?"stylesheet":lt,p||(l.as="script"),l.crossOrigin="",l.href=d,i&&l.setAttribute("nonce",i),document.head.appendChild(l),p)return new Promise((g,b)=>{l.addEventListener("load",g),l.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${d}`)))})}))}function n(o){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=o,window.dispatchEvent(i),!i.defaultPrevented)throw o}return r.then(o=>{for(const i of o||[])i.status==="rejected"&&n(i.reason);return t().catch(n)})};function ut(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,a){return new Proxy({},{get(s,r){return(n,o,i)=>{const c=e.Capacitor.Plugins[a];if(c===void 0){i(new Error(`Capacitor plugin ${a} not found`));return}if(typeof c[r]!="function"){i(new Error(`Method ${r} not found in Capacitor plugin ${a}`));return}(async()=>{try{const d=await c[r](n);o(d)}catch(d){i(d)}})()}}})}})}function mt(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,a){return e.cordova.plugins[a]}})}function vt(e=!1){typeof window>"u"||(window.CapacitorUtils=window.CapacitorUtils||{},window.Capacitor!==void 0&&!e?ut(window):window.cordova!==void 0&&mt(window))}var oe;(function(e){e.Documents="DOCUMENTS",e.Data="DATA",e.Library="LIBRARY",e.Cache="CACHE",e.External="EXTERNAL",e.ExternalStorage="EXTERNAL_STORAGE",e.ExternalCache="EXTERNAL_CACHE",e.LibraryNoCloud="LIBRARY_NO_CLOUD",e.Temporary="TEMPORARY"})(oe||(oe={}));var Se;(function(e){e.UTF8="utf8",e.ASCII="ascii",e.UTF16="utf16"})(Se||(Se={}));const qe=z("Filesystem",{web:()=>Ae(()=>import("./web-ks64-tFe.js"),[]).then(e=>new e.FilesystemWeb)});vt();const ft=z("Share",{web:()=>Ae(()=>import("./web-CNM4MhMp.js"),[]).then(e=>new e.ShareWeb)});class ht{constructor(t){this.sqlite=t,this._connectionDict=new Map}async initWebStore(){try{return await this.sqlite.initWebStore(),Promise.resolve()}catch(t){return Promise.reject(t)}}async saveToStore(t){try{return await this.sqlite.saveToStore({database:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async saveToLocalDisk(t){try{return await this.sqlite.saveToLocalDisk({database:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getFromLocalDiskToStore(t){const a=t??!0;try{return await this.sqlite.getFromLocalDiskToStore({overwrite:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async echo(t){try{const a=await this.sqlite.echo({value:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isSecretStored(){try{const t=await this.sqlite.isSecretStored();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async setEncryptionSecret(t){try{return await this.sqlite.setEncryptionSecret({passphrase:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async changeEncryptionSecret(t,a){try{return await this.sqlite.changeEncryptionSecret({passphrase:t,oldpassphrase:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async clearEncryptionSecret(){try{return await this.sqlite.clearEncryptionSecret(),Promise.resolve()}catch(t){return Promise.reject(t)}}async checkEncryptionSecret(t){try{const a=await this.sqlite.checkEncryptionSecret({passphrase:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async addUpgradeStatement(t,a){try{return t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.addUpgradeStatement({database:t,upgrade:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async createConnection(t,a,s,r,n){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.createConnection({database:t,encrypted:a,mode:s,version:r,readonly:n});const o=new Ue(t,n,this.sqlite),i=n?`RO_${t}`:`RW_${t}`;return this._connectionDict.set(i,o),Promise.resolve(o)}catch(o){return Promise.reject(o)}}async closeConnection(t,a){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.closeConnection({database:t,readonly:a});const s=a?`RO_${t}`:`RW_${t}`;return this._connectionDict.delete(s),Promise.resolve()}catch(s){return Promise.reject(s)}}async isConnection(t,a){const s={};t.endsWith(".db")&&(t=t.slice(0,-3));const r=a?`RO_${t}`:`RW_${t}`;return s.result=this._connectionDict.has(r),Promise.resolve(s)}async retrieveConnection(t,a){t.endsWith(".db")&&(t=t.slice(0,-3));const s=a?`RO_${t}`:`RW_${t}`;if(this._connectionDict.has(s)){const r=this._connectionDict.get(s);return typeof r<"u"?Promise.resolve(r):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async getNCDatabasePath(t,a){try{const s=await this.sqlite.getNCDatabasePath({path:t,database:a});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async createNCConnection(t,a){try{await this.sqlite.createNCConnection({databasePath:t,version:a});const s=new Ue(t,!0,this.sqlite),r=`RO_${t})`;return this._connectionDict.set(r,s),Promise.resolve(s)}catch(s){return Promise.reject(s)}}async closeNCConnection(t){try{await this.sqlite.closeNCConnection({databasePath:t});const a=`RO_${t})`;return this._connectionDict.delete(a),Promise.resolve()}catch(a){return Promise.reject(a)}}async isNCConnection(t){const a={},s=`RO_${t})`;return a.result=this._connectionDict.has(s),Promise.resolve(a)}async retrieveNCConnection(t){if(this._connectionDict.has(t)){const a=`RO_${t})`,s=this._connectionDict.get(a);return typeof s<"u"?Promise.resolve(s):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async isNCDatabase(t){try{const a=await this.sqlite.isNCDatabase({databasePath:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async retrieveAllConnections(){return this._connectionDict}async closeAllConnections(){const t=new Map;try{for(const a of this._connectionDict.keys()){const s=a.substring(3),r=a.substring(0,3)==="RO_";await this.sqlite.closeConnection({database:s,readonly:r}),t.set(a,null)}for(const a of t.keys())this._connectionDict.delete(a);return Promise.resolve()}catch(a){return Promise.reject(a)}}async checkConnectionsConsistency(){try{const t=[...this._connectionDict.keys()],a=[],s=[];for(const n of t)a.push(n.substring(0,2)),s.push(n.substring(3));const r=await this.sqlite.checkConnectionsConsistency({dbNames:s,openModes:a});return r.result||(this._connectionDict=new Map),Promise.resolve(r)}catch(t){return this._connectionDict=new Map,Promise.reject(t)}}async importFromJson(t){try{const a=await this.sqlite.importFromJson({jsonstring:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isJsonValid(t){try{const a=await this.sqlite.isJsonValid({jsonstring:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async copyFromAssets(t){const a=t??!0;try{return await this.sqlite.copyFromAssets({overwrite:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async getFromHTTPRequest(t,a){const s=a??!0;try{return await this.sqlite.getFromHTTPRequest({url:t,overwrite:s}),Promise.resolve()}catch(r){return Promise.reject(r)}}async isDatabaseEncrypted(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const a=await this.sqlite.isDatabaseEncrypted({database:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isInConfigEncryption(){try{const t=await this.sqlite.isInConfigEncryption();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isInConfigBiometricAuth(){try{const t=await this.sqlite.isInConfigBiometricAuth();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isDatabase(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const a=await this.sqlite.isDatabase({database:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async getDatabaseList(){try{const a=(await this.sqlite.getDatabaseList()).values;a.sort();const s={values:a};return Promise.resolve(s)}catch(t){return Promise.reject(t)}}async getMigratableDbList(t){const a=t||"default";try{const s=await this.sqlite.getMigratableDbList({folderPath:a});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async addSQLiteSuffix(t,a){const s=t||"default",r=a||[];try{const n=await this.sqlite.addSQLiteSuffix({folderPath:s,dbNameList:r});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async deleteOldDatabases(t,a){const s=t||"default",r=a||[];try{const n=await this.sqlite.deleteOldDatabases({folderPath:s,dbNameList:r});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async moveDatabasesAndAddSuffix(t,a){const s=t||"default",r=a||[];return this.sqlite.moveDatabasesAndAddSuffix({folderPath:s,dbNameList:r})}}class Ue{constructor(t,a,s){this.dbName=t,this.readonly=a,this.sqlite=s}getConnectionDBName(){return this.dbName}getConnectionReadOnly(){return this.readonly}async open(){try{return await this.sqlite.open({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async close(){try{return await this.sqlite.close({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async beginTransaction(){try{const t=await this.sqlite.beginTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async commitTransaction(){try{const t=await this.sqlite.commitTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async rollbackTransaction(){try{const t=await this.sqlite.rollbackTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTransactionActive(){try{const t=await this.sqlite.isTransactionActive({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async loadExtension(t){try{return await this.sqlite.loadExtension({database:this.dbName,path:t,readonly:this.readonly}),Promise.resolve()}catch(a){return Promise.reject(a)}}async enableLoadExtension(t){try{return await this.sqlite.enableLoadExtension({database:this.dbName,toggle:t,readonly:this.readonly}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getUrl(){try{const t=await this.sqlite.getUrl({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getVersion(){try{const t=await this.sqlite.getVersion({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getTableList(){try{const t=await this.sqlite.getTableList({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async execute(t,a=!0,s=!0){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const r=await this.sqlite.execute({database:this.dbName,statements:t,transaction:a,readonly:!1,isSQL92:s});return Promise.resolve(r)}}catch(r){return Promise.reject(r)}}async query(t,a,s=!0){let r;try{return a&&a.length>0?r=await this.sqlite.query({database:this.dbName,statement:t,values:a,readonly:this.readonly,isSQL92:!0}):r=await this.sqlite.query({database:this.dbName,statement:t,values:[],readonly:this.readonly,isSQL92:s}),r=await this.reorderRows(r),Promise.resolve(r)}catch(n){return Promise.reject(n)}}async run(t,a,s=!0,r="no",n=!0){let o;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(a&&a.length>0?o=await this.sqlite.run({database:this.dbName,statement:t,values:a,transaction:s,readonly:!1,returnMode:r,isSQL92:!0}):o=await this.sqlite.run({database:this.dbName,statement:t,values:[],transaction:s,readonly:!1,returnMode:r,isSQL92:n}),o.changes=await this.reorderRows(o.changes),Promise.resolve(o))}catch(i){return Promise.reject(i)}}async executeSet(t,a=!0,s="no",r=!0){let n;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(n=await this.sqlite.executeSet({database:this.dbName,set:t,transaction:a,readonly:!1,returnMode:s,isSQL92:r}),n.changes=await this.reorderRows(n.changes),Promise.resolve(n))}catch(o){return Promise.reject(o)}}async isExists(){try{const t=await this.sqlite.isDBExists({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTable(t){try{const a=await this.sqlite.isTableExists({database:this.dbName,table:t,readonly:this.readonly});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isDBOpen(){try{const t=await this.sqlite.isDBOpen({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async delete(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteDatabase({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async createSyncTable(){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const t=await this.sqlite.createSyncTable({database:this.dbName,readonly:!1});return Promise.resolve(t)}}catch(t){return Promise.reject(t)}}async setSyncDate(t){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.setSyncDate({database:this.dbName,syncdate:t,readonly:!1}),Promise.resolve())}catch(a){return Promise.reject(a)}}async getSyncDate(){try{const t=await this.sqlite.getSyncDate({database:this.dbName,readonly:this.readonly});let a="";return t.syncDate>0&&(a=new Date(t.syncDate*1e3).toISOString()),Promise.resolve(a)}catch(t){return Promise.reject(t)}}async exportToJson(t,a=!1){try{const s=await this.sqlite.exportToJson({database:this.dbName,jsonexportmode:t,readonly:this.readonly,encrypted:a});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async deleteExportedRows(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteExportedRows({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async executeTransaction(t,a=!0){let s=0,r=!1;if(this.readonly)return Promise.reject("not allowed in read-only mode");if(await this.sqlite.beginTransaction({database:this.dbName}),r=await this.sqlite.isTransactionActive({database:this.dbName}),!r)return Promise.reject("After Begin Transaction, no transaction active");try{for(const i of t){if(typeof i!="object"||!("statement"in i))throw new Error("Error a task.statement must be provided");if("values"in i&&i.values&&i.values.length>0){const c=i.statement.toUpperCase().includes("RETURNING")?"all":"no",d=await this.sqlite.run({database:this.dbName,statement:i.statement,values:i.values,transaction:!1,readonly:!1,returnMode:c,isSQL92:a});if(d.changes.changes<0)throw new Error("Error in transaction method run ");s+=d.changes.changes}else{const c=await this.sqlite.execute({database:this.dbName,statements:i.statement,transaction:!1,readonly:!1});if(c.changes.changes<0)throw new Error("Error in transaction method execute ");s+=c.changes.changes}}const n=await this.sqlite.commitTransaction({database:this.dbName});s+=n.changes.changes;const o={changes:{changes:s}};return Promise.resolve(o)}catch(n){const o=n.message?n.message:n;return await this.sqlite.rollbackTransaction({database:this.dbName}),Promise.reject(o)}}async reorderRows(t){const a=t;if(t?.values&&typeof t.values[0]=="object"&&Object.keys(t.values[0]).includes("ios_columns")){const s=t.values[0].ios_columns,r=[];for(let n=1;n<t.values.length;n++){const o=t.values[n],i={};for(const c of s)i[c]=o[c];r.push(i)}a.values=r}return Promise.resolve(a)}}const pt=z("CapacitorSQLite",{web:()=>Ae(()=>import("./web-DIz_Rw1S.js"),[]).then(e=>new e.CapacitorSQLiteWeb),electron:()=>window.CapacitorCustomPlatform.plugins.CapacitorSQLite});function yt(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}const gt="laba101_offline",bt=new ht(pt);let se=null;const Y=[{id:1,name:"Laba101 Admin",email:"admin@laba101.test",password:"password",role:"admin",branch:"Main Store"},{id:2,name:"Laba101 Staff",email:"staff@laba101.test",password:"password",role:"staff",branch:"Main Store"},{id:3,name:"Mintal Staff",email:"mintal@laba101.test",password:"password",role:"staff",branch:"Mintal Branch"},{id:4,name:"Gensan Staff",email:"gensan@laba101.test",password:"password",role:"staff",branch:"Gensan Branch"}],ce=[{id:1,name:"Mara Santos",phone:"0917 482 1101",address:"Bajada, Davao City"},{id:2,name:"Jun Rivera",phone:"0928 314 7720",address:"Lanang, Davao City"},{id:3,name:"Ana Cruz",phone:"0935 901 2234",address:"Matina, Davao City"}],_=[U(1,"Drop-off","Wash, dry and fold.","Drop-Off","order",185,8,40,["Wash","Dry","Fold"],0,24),U(2,"Full Service","Wash, dry, fold, detergent and Fabcon.","Full Service","order",200,8,40,["Wash","Dry","Fold","Detergent","Fabcon"],0,24),U(3,"Self Service Wash","Max of 8kg per load.","Self Service","order",60,8,null,["Wash"],0,1),U(4,"Self Service Dry","Regular time: 40 mins drying time.","Self Service","order",70,8,40,["Dry"],0,1),U(5,"Dry Only","Standard drying rate.","Dry Only","order",70,8,40,["Dry"],0,1),U(6,"Additional Dry 10 mins","Additional drying time.","Dry Only","order",30,8,10,["Dry"],0,1),U(7,"Additional Dry 20 mins","Additional drying time.","Dry Only","order",50,8,20,["Dry"],0,1),U(8,"Additional Dry 40 mins","Additional drying time.","Dry Only","order",70,8,40,["Dry"],0,1),U(9,"Additional Zonrox","Extra Zonrox bleach add-on per load.","Add-on","addon",25,0,null,["Zonrox"],0,0),U(10,"Additional Fabcon","Extra Fabcon fabric conditioner add-on per load.","Add-on","addon",25,0,null,["Fabcon"],0,0),U(11,"Comforter / Bulky Load","Comforter 4kg max per load. Thin blankets, bedsheets, bath towels, pillow cases and curtains: 6kg max per load.","Comforter","order",200,8,40,["Wash","Dry","Fold"],0,24)],V=[{id:1,name:"Regular Clothes",maxKg:8,additionalFee:0,isActive:1},{id:2,name:"Comforter",maxKg:4,additionalFee:0,isActive:1},{id:3,name:"Thin Blankets",maxKg:6,additionalFee:0,isActive:1},{id:4,name:"Bedsheets",maxKg:6,additionalFee:0,isActive:1},{id:5,name:"Bath Towels",maxKg:6,additionalFee:0,isActive:1},{id:6,name:"Curtains",maxKg:6,additionalFee:0,isActive:1}];function ke(e,t){const a=E(e,[]),s=new Map(a.map(n=>[n.id,n])),r=t.map(n=>{const o=s.get(n.id);return o?{...n,...o,isActive:o.isActive??n.isActive}:n});(a.length!==r.length||r.some((n,o)=>n.id!==a[o]?.id||JSON.stringify(n)!==JSON.stringify(a[o])))&&S(e,r)}async function wt(){ke("services",_),ke("item_categories",V)}async function fe(e){for(const t of _)((await e.query("SELECT id FROM laundry_services WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive,t.id]):await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive]);for(const t of V)((await e.query("SELECT id FROM item_categories WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.maxKg,t.additionalFee,t.isActive,t.id]):await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[t.id,t.name,t.maxKg,t.additionalFee,t.isActive])}const J=[{id:1,ticket:"LB260527-001",customerId:1,customer:"Mara Santos",phone:"0917 482 1101",serviceId:1,service:"Drop-off",itemCategoryId:1,itemCategory:"Regular Clothes",branch:"Main Store",status:"washing",workflowCompleted:["received","wash"],weightKg:5.75,price:185,additionalCharge:0,extraServiceAmount:0,totalAmount:185,paidAmount:185,balance:0,extras:[],notes:"Separate white uniforms.",foldedBy:null,foldedByName:null,dueAt:new Date(Date.now()+1080*60*1e3).toISOString(),createdAt:new Date().toISOString()}],le=[{id:1,orderId:1,amount:185,method:"cash",reference:null,receivedAt:new Date().toISOString(),branch:"Main Store"}],de=[{id:1,expenseDate:"2026-05-27",number:"DISB-01",name:"Water refill",category:"Supplies",description:"Weekly supply",amount:250},{id:2,expenseDate:"2026-05-27",number:"DISB-02",name:"Detergent",category:"Supplies",description:"Laundry detergent",amount:500}],ue=[{id:1,saleDate:"2026-05-27",saleNumber:"SALE-01",cashAmount:1200,gcashAmount:500,totalAmount:1700,notes:"Seed day total"}],W=[...[1,2,3,4].map(e=>({id:e,machineName:`Washer ${e}`,machineType:"washer",status:"available",branch:"Main Store"})),...[1,2,3,4].map(e=>({id:e+4,machineName:`Dryer ${e}`,machineType:"dryer",status:"available",branch:"Main Store"}))],me=[{key:"branch",value:"Main Store"},{key:"fold_rate",value:"5"},{key:"report_email",value:"admin@laba101.test"}];function U(e,t,a,s,r,n,o,i,c,d,p){return{id:e,name:t,description:a,category:s,serviceType:r,price:n,maxKg:o,dryingMinutes:i,includes:c,additionalCharge:d,turnaroundHours:p,isActive:1}}function H(e){return`laba101-mobile-${e}`}function E(e,t){const a=localStorage.getItem(H(e));if(!a)return structuredClone(t);try{return JSON.parse(a)}catch{return structuredClone(t)}}function S(e,t){localStorage.setItem(H(e),JSON.stringify(t))}function k(e){return e.reduce((t,a)=>Math.max(t,a.id),0)+1}function Q(){return new Date().toISOString()}function Ee(e=new Date){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${s}`}function St(){return Ee().slice(2).replaceAll("-","")}function K(e,t){if(!e)return t;try{return JSON.parse(e)}catch{return t}}async function N(){return se||(se=await bt.createConnection(gt,!1,"no-encryption",1,!1),await se.open()),se}async function O(e,t,a,s){((await e.query(`PRAGMA table_info(${t})`)).values??[]).some(o=>o.name===a)||await e.execute(`ALTER TABLE ${t} ADD COLUMN ${a} ${s}`)}async function Et(){if(!w.isNativePlatform()){!localStorage.getItem(H("seeded_v4"))&&!localStorage.getItem(H("services"))&&!localStorage.getItem(H("staff"))&&(S("staff",Y),S("customers",ce),S("services",_),S("item_categories",V),S("orders",J),S("payments",le),S("fold_logs",[]),S("expenses",de),S("sales",ue),S("machines",W),S("subcleanings",[]),S("settings",me),S("seeded_v4",!0)),await wt(),localStorage.getItem(H("seeded_v4"))||S("seeded_v4",!0);return}const e=await N();if(await e.execute(`
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
  `),await O(e,"staff","email","TEXT"),await O(e,"staff","password","TEXT"),await O(e,"staff","role","TEXT"),await O(e,"staff","isActive","INTEGER NOT NULL DEFAULT 1"),await e.run('UPDATE staff SET password = ? WHERE password IS NULL OR password = ""',["password"]),await e.run('UPDATE staff SET role = ? WHERE role IS NULL OR role = ""',["staff"]),await O(e,"orders","customerId","INTEGER NOT NULL DEFAULT 0"),await O(e,"orders","phone","TEXT"),await O(e,"orders","serviceId","INTEGER NOT NULL DEFAULT 0"),await O(e,"orders","itemCategoryId","INTEGER NOT NULL DEFAULT 0"),await O(e,"orders","itemCategory",'TEXT NOT NULL DEFAULT "Regular Clothes"'),await O(e,"orders","workflowCompleted","TEXT"),await O(e,"orders","weightKg","REAL NOT NULL DEFAULT 0"),await O(e,"orders","price","REAL NOT NULL DEFAULT 0"),await O(e,"orders","additionalCharge","REAL NOT NULL DEFAULT 0"),await O(e,"orders","extraServiceAmount","REAL NOT NULL DEFAULT 0"),await O(e,"orders","totalAmount","REAL NOT NULL DEFAULT 0"),await O(e,"orders","paidAmount","REAL NOT NULL DEFAULT 0"),await O(e,"orders","extras","TEXT"),await O(e,"orders","notes","TEXT"),await O(e,"orders","dueAt","TEXT"),await O(e,"orders","createdAt",'TEXT NOT NULL DEFAULT ""'),await O(e,"daily_sales","saleNumber","TEXT"),((await e.query("SELECT COUNT(*) as count FROM staff")).values?.[0]?.count??0)===0){for(const a of Y)await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.name,a.email,a.password,a.role,a.branch,1]);for(const a of ce)await e.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[a.id,a.name,a.phone,a.address]);for(const a of _)await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[a.id,a.name,a.description,a.category,a.serviceType,a.price,a.maxKg,a.dryingMinutes,JSON.stringify(a.includes),a.additionalCharge,a.turnaroundHours,a.isActive]);for(const a of V)await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[a.id,a.name,a.maxKg,a.additionalFee,a.isActive]);for(const a of J)await _e(e,a);for(const a of le)await e.run("INSERT INTO payments (id, orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.orderId,a.amount,a.method,a.reference,a.receivedAt,a.branch]);for(const a of de)await e.run("INSERT INTO disbursement_expenses (id, expenseDate, number, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.expenseDate,a.number,a.name,a.category,a.description,a.amount]);for(const a of ue)await e.run("INSERT INTO daily_sales (id, saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.saleDate,a.saleNumber,a.cashAmount,a.gcashAmount,a.totalAmount,a.notes]);for(const a of W)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[a.id,a.machineName,a.machineType,a.status,a.branch]);for(const a of me)await e.run("INSERT INTO settings (key, value) VALUES (?, ?)",[a.key,a.value])}await fe(e)}async function _e(e,t){await e.run("INSERT INTO orders (id, ticket, customerId, customer, phone, serviceId, service, itemCategoryId, itemCategory, branch, status, workflowCompleted, weightKg, price, additionalCharge, extraServiceAmount, totalAmount, paidAmount, extras, notes, foldedBy, dueAt, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.ticket,t.customerId,t.customer,t.phone,t.serviceId,t.service,t.itemCategoryId,t.itemCategory,t.branch,t.status,JSON.stringify(t.workflowCompleted),t.weightKg,t.price,t.additionalCharge,t.extraServiceAmount,t.totalAmount,t.paidAmount,JSON.stringify(t.extras),t.notes,t.foldedBy,t.dueAt,t.createdAt])}function Tt(e){const t=Number(e.paidAmount??0),a=Number(e.totalAmount??0),s=Number(e.foldedBy);return{id:Number(e.id),ticket:String(e.ticket),customerId:Number(e.customerId),customer:String(e.customer),phone:e.phone?String(e.phone):null,serviceId:Number(e.serviceId),service:String(e.service),itemCategoryId:Number(e.itemCategoryId),itemCategory:String(e.itemCategory),branch:String(e.branch),status:String(e.status),workflowCompleted:K(e.workflowCompleted,[]),weightKg:Number(e.weightKg),price:Number(e.price),additionalCharge:Number(e.additionalCharge),extraServiceAmount:Number(e.extraServiceAmount),totalAmount:a,paidAmount:t,balance:Number((a-t).toFixed(2)),extras:K(e.extras,[]),notes:e.notes?String(e.notes):null,foldedBy:Number.isFinite(s)&&s>0?s:null,foldedByName:e.foldedByName?String(e.foldedByName):null,dueAt:String(e.dueAt),createdAt:String(e.createdAt)}}async function Nt(){await Et()}async function he(){return(await Le()).find(t=>t.key==="branch")?.value??"Main Store"}async function At(){const e=await Le();return Number(e.find(t=>t.key==="fold_rate")?.value??"5")}async function We(e){return(await Le()).find(a=>a.key===e)?.value}async function Le(){return w.isNativePlatform()?(await(await N()).query("SELECT key, value FROM settings ORDER BY key")).values??[]:E("settings",me)}async function ie(e,t){if(!w.isNativePlatform()){const s=E("settings",me).filter(r=>r.key!==e);s.push({key:e,value:t}),S("settings",s);return}await(await N()).run("REPLACE INTO settings (key, value) VALUES (?, ?)",[e,t])}async function Lt(e){return w.isNativePlatform()?(await(await N()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff WHERE branch = ? ORDER BY name ASC',[e])).values??[]:E("staff",Y).filter(s=>s.branch===e)}async function Ke(){return w.isNativePlatform()?(await(await N()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff ORDER BY name ASC')).values??[]:E("staff",Y)}async function Xe(e,t){const a=e.trim().toLowerCase();return(await Ke()).find(r=>r.email.toLowerCase()===a&&r.password===t&&r.isActive!==0)??null}async function Ct(e){if(!w.isNativePlatform()){const a=E("staff",Y);a.unshift({id:k(a),...e,isActive:1}),S("staff",a);return}await(await N()).run("INSERT INTO staff (name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?)",[e.name,e.email,e.password,e.role,e.branch,1])}async function Fe(e,t){if(!w.isNativePlatform()){const n=E("staff",Y),o=n.find(i=>i.id===e);o&&(Object.assign(o,t),S("staff",n));return}const a=await N(),s=[],r=[];for(const[n,o]of Object.entries(t))n!=="id"&&(s.push(`${n} = ?`),r.push(o));s.length&&(r.push(e),await a.run(`UPDATE staff SET ${s.join(", ")} WHERE id = ?`,r))}async function $t(){return w.isNativePlatform()?(await(await N()).query("SELECT id, name, phone, address FROM customers ORDER BY name ASC")).values??[]:E("customers",ce).sort((a,s)=>a.name.localeCompare(s.name))}async function Rt(e){if(!w.isNativePlatform()){const r=E("customers",ce),n=e.id?r.find(i=>i.id===e.id):r.find(i=>i.name.toLowerCase()===e.name.toLowerCase()&&(e.phone?i.phone===e.phone:!0));if(n)return n.name=e.name,n.phone=e.phone??n.phone,n.address=e.address??n.address,S("customers",r),n;const o={id:k(r),name:e.name,phone:e.phone??null,address:e.address??null};return r.push(o),S("customers",r),o}const t=await N();if(e.id)return await t.run("UPDATE customers SET name = ?, phone = ?, address = ? WHERE id = ?",[e.name,e.phone??null,e.address??null,e.id]),{id:e.id,name:e.name,phone:e.phone??null,address:e.address??null};const a=await t.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM customers"),s=Number((a.values?.[0]).id);return await t.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[s,e.name,e.phone??null,e.address??null]),{id:s,name:e.name,phone:e.phone??null,address:e.address??null}}async function Ce(e){if(!w.isNativePlatform())return E("services",_).filter(s=>!0);const t=await N(),a=await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[]);return(a.values??[]).length===0?(await fe(t),((await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[])).values??[]).map(r=>({...r,includes:K(r.includes,[])}))):(a.values??[]).map(s=>({...s,includes:K(s.includes,[])}))}async function Dt(){if(!w.isNativePlatform())return E("services",_);const e=await N(),t=await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC");return(t.values??[]).length===0?(await fe(e),((await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC")).values??[]).map(s=>({...s,includes:K(s.includes,[])}))):(t.values??[]).map(a=>({...a,includes:K(a.includes,[])}))}async function Me(e){if(!w.isNativePlatform()){const a=E("services",_),s=e.id?a.find(r=>r.id===e.id):null;s?Object.assign(s,e):a.unshift({...e,id:k(a)}),S("services",a);return}const t=await N();e.id?await t.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = ? WHERE id = ?",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive,e.id]):await t.run("INSERT INTO laundry_services (name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive])}async function He(){if(!w.isNativePlatform())return E("item_categories",V).filter(a=>a.isActive);const e=await N(),t=await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC");return(t.values??[]).length===0?(await fe(e),(await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC")).values??[]):t.values??[]}async function xt(e){if(!w.isNativePlatform()){const a=E("item_categories",V),s=e.id?a.find(r=>r.id===e.id):null;s?Object.assign(s,e):a.unshift({...e,id:k(a)}),S("item_categories",a);return}const t=await N();e.id?await t.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = ? WHERE id = ?",[e.name,e.maxKg,e.additionalFee,e.isActive,e.id]):await t.run("INSERT INTO item_categories (name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?)",[e.name,e.maxKg,e.additionalFee,e.isActive])}function Te(e,t,a,s){const r=Number(t.maxKg),n=Math.max(0,a-r),o=0,i=s.reduce((p,m)=>p+Number(m.price),0),c=s.map(p=>({id:p.id,name:yt(p.name),price:Number(p.price)})),d=Number((Number(e.price)+o+i).toFixed(2));return{price:Number(e.price),additionalCharge:Number(o.toFixed(2)),extraServiceAmount:Number(i.toFixed(2)),totalAmount:d,allowedKg:r,extraKg:Number(n.toFixed(2)),warning:n>0?`Weight exceeds the ${t.name} load limit of ${r.toFixed(2)} kg.`:null,extras:c}}function Ge(e,t){const a=t.find(n=>n.id===e.serviceId),s=a?.includes??[],r=[{key:"received",label:"Received"}];return s.includes("Wash")&&r.push({key:"wash",label:"Wash"}),e.extras.length&&r.push({key:"extras",label:"Extra services"}),(s.includes("Dry")||(a?.dryingMinutes??0)>0)&&r.push({key:"dry",label:"Dry"}),s.includes("Fold")&&r.push({key:"fold",label:"Fold"}),r.push({key:"ready",label:"Ready"},{key:"claimed",label:"Claimed"}),r}function Ot(e){return e.includes("claimed")?"claimed":e.includes("ready")?"ready":e.includes("dry")?"drying":e.includes("extras")||e.includes("wash")?"washing":"received"}async function pe(e){return w.isNativePlatform()?((await(await N()).query("SELECT o.*, s.name as foldedByName FROM orders o LEFT JOIN staff s ON s.id = o.foldedBy WHERE o.branch = ? ORDER BY o.id DESC",[e])).values??[]).map(s=>Tt(s)):E("orders",J).filter(s=>s.branch===e).map(s=>({...s,balance:Number((s.totalAmount-s.paidAmount).toFixed(2))}))}async function Pt(e){const[t,a]=await Promise.all([Ce(),He()]),s=t.find(b=>b.id===e.serviceId),r=a.find(b=>b.id===e.itemCategoryId);if(!s||!r)throw new Error("Service or item category is missing.");const n=t.filter(b=>e.addonIds.includes(b.id)),o=Te(s,r,e.weightKg,n);if(o.extraKg>0)throw new Error(o.warning??"Weight exceeds the allowed limit.");const i=await Rt({id:e.customerId||void 0,name:e.customerName,phone:e.customerPhone??null}),c=Math.max(0,e.paidAmount),d=Math.min(o.totalAmount,c),p={ticket:await It(),customerId:i.id,customer:i.name,phone:i.phone,serviceId:s.id,service:s.name,itemCategoryId:r.id,itemCategory:r.name,branch:e.branch,status:"received",workflowCompleted:["received"],weightKg:e.weightKg,price:o.price,additionalCharge:o.additionalCharge,extraServiceAmount:o.extraServiceAmount,totalAmount:o.totalAmount,paidAmount:d,balance:Number((o.totalAmount-d).toFixed(2)),extras:o.extras,notes:[e.notes,o.warning].filter(Boolean).join(`
`)||null,foldedBy:null,foldedByName:null,dueAt:new Date(Date.now()+s.turnaroundHours*60*60*1e3).toISOString(),createdAt:Q()};if(!w.isNativePlatform()){const b=E("orders",J),h={...p,id:k(b)};return b.unshift(h),S("orders",b),c>0&&await Ye(h.id,{amount:c,method:e.paymentMethod,reference:e.paymentReference??null}),h}const m=await N(),l=await m.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM orders"),g={...p,id:Number((l.values?.[0]).id)};return await _e(m,g),c>0&&await m.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[g.id,c,e.paymentMethod,e.paymentReference??null,Q(),e.branch]),g}async function It(){const e=`LB${St()}`,t=await he(),s=(await pe(t)).filter(n=>n.ticket.startsWith(e)).sort((n,o)=>o.ticket.localeCompare(n.ticket))[0],r=s?Number(s.ticket.slice(-3))+1:1;return`${e}-${String(r).padStart(3,"0")}`}async function qt(e,t){const a=await he(),[s,r]=await Promise.all([pe(a),Ce()]),n=s.find(d=>d.id===e);if(!n)return;const i=Ge(n,r).map(d=>d.key).find(d=>!n.workflowCompleted.includes(d));if(!i)return;if(n.workflowCompleted=[...n.workflowCompleted,i],n.status=Ot(n.workflowCompleted),i==="fold"&&t&&(n.foldedBy=t),!w.isNativePlatform()){const d=E("orders",J),p=d.find(m=>m.id===n.id);p&&Object.assign(p,n),S("orders",d);return}await(await N()).run("UPDATE orders SET workflowCompleted = ?, status = ?, foldedBy = ? WHERE id = ?",[JSON.stringify(n.workflowCompleted),n.status,n.foldedBy,n.id])}async function Ye(e,t){const a=await he();if(!(await pe(a)).find(i=>i.id===e))return;const n=Math.max(0,t.amount);if(n<=0)return;if(!w.isNativePlatform()){const i=E("payments",le);i.unshift({id:k(i),orderId:e,amount:n,method:t.method,reference:t.reference??null,receivedAt:Q(),branch:a}),S("payments",i);const c=E("orders",J),d=c.find(p=>p.id===e);d&&(d.paidAmount=Math.min(d.totalAmount,Number((d.paidAmount+n).toFixed(2)))),S("orders",c);return}const o=await N();await o.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[e,n,t.method,t.reference??null,Q(),a]),await o.run("UPDATE orders SET paidAmount = MIN(totalAmount, paidAmount + ?) WHERE id = ?",[n,e])}async function Ut(e){return w.isNativePlatform()?(await(await N()).query("SELECT id, orderId, amount, method, reference, receivedAt, branch FROM payments  ORDER BY receivedAt DESC",[])).values??[]:E("payments",le).filter(s=>!0)}async function kt(){return w.isNativePlatform()?(await(await N()).query("SELECT id, orderTicket, staffName, foldCount, rate, total, createdAt FROM fold_logs ORDER BY id DESC")).values??[]:E("fold_logs",[])}async function Ft(e){const t=Number((e.foldCount*e.rate).toFixed(2));if(!w.isNativePlatform()){const s=E("fold_logs",[]);s.unshift({id:Date.now(),...e,total:t,createdAt:Q()}),S("fold_logs",s);return}await(await N()).run("INSERT INTO fold_logs (orderTicket, staffName, foldCount, rate, total, createdAt) VALUES (?, ?, ?, ?, ?, ?)",[e.orderTicket,e.staffName,e.foldCount,e.rate,t,Q()])}async function Mt(){return w.isNativePlatform()?(await(await N()).query("SELECT id, expenseDate, number, name, category, description, amount FROM disbursement_expenses ORDER BY expenseDate DESC, id DESC")).values??[]:E("expenses",de)}async function Bt(e){if(!w.isNativePlatform()){const r=E("expenses",de),n=k(r);r.unshift({id:n,expenseDate:e.expenseDate,number:`DISB-${String(n).padStart(2,"0")}`,name:e.name,category:e.category,description:e.description||null,amount:e.amount}),S("expenses",r);return}const t=await N(),a=await t.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM disbursement_expenses"),s=Number((a.values?.[0]).id);await t.run("INSERT INTO disbursement_expenses (expenseDate, number, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?)",[e.expenseDate,`DISB-${String(s).padStart(2,"0")}`,e.name,e.category,e.description||null,e.amount])}async function jt(){return w.isNativePlatform()?(await(await N()).query('SELECT id, saleDate, COALESCE(saleNumber, "") as saleNumber, cashAmount, gcashAmount, totalAmount, notes FROM daily_sales ORDER BY saleDate DESC, id DESC')).values??[]:E("sales",ue)}async function _t(e){const t=Number((e.cashAmount+e.gcashAmount).toFixed(2));if(!w.isNativePlatform()){const n=E("sales",ue),o=n.find(i=>i.saleDate===e.saleDate);if(o)Object.assign(o,{cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null});else{const i=k(n);n.unshift({id:i,saleDate:e.saleDate,saleNumber:`SALE-${String(i).padStart(2,"0")}`,cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null})}S("sales",n);return}const a=await N(),r=(await a.query("SELECT id, saleNumber FROM daily_sales WHERE saleDate = ?",[e.saleDate])).values?.[0];if(r)await a.run("UPDATE daily_sales SET cashAmount = ?, gcashAmount = ?, totalAmount = ?, notes = ? WHERE id = ?",[e.cashAmount,e.gcashAmount,t,e.notes||null,r.id]);else{const n=await a.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM daily_sales"),o=Number((n.values?.[0]).id);await a.run("INSERT INTO daily_sales (saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?)",[e.saleDate,`SALE-${String(o).padStart(2,"0")}`,e.cashAmount,e.gcashAmount,t,e.notes||null])}}async function Ve(e){return w.isNativePlatform()?(await(await N()).query("SELECT id, machineName, machineType, status, branch FROM machines WHERE branch = ? ORDER BY machineType, machineName",[e])).values??[]:E("machines",W).filter(s=>s.branch===e)}async function Wt(e){if(!w.isNativePlatform()){const a=E("machines",W);a.unshift({id:k(a),...e}),S("machines",a);return}await(await N()).run("INSERT INTO machines (machineName, machineType, status, branch) VALUES (?, ?, ?, ?)",[e.machineName,e.machineType,e.status,e.branch])}async function Kt(e,t){if(!w.isNativePlatform()){const s=E("machines",W),r=s.find(n=>n.id===e);r&&(r.status=t,S("machines",s));return}await(await N()).run("UPDATE machines SET status = ? WHERE id = ?",[t,e])}async function Xt(e){return w.isNativePlatform()?((await(await N()).query("SELECT id, date, machineIds, machineNames, cleaningStatus, notes, branch FROM subcleanings WHERE branch = ? ORDER BY date DESC, id DESC",[e])).values??[]).map(s=>({...s,machineIds:K(s.machineIds,[])})):E("subcleanings",[]).filter(s=>s.branch===e)}async function Ht(e){const a=(await Ve(e.branch)).filter(n=>e.machineIds.includes(n.id)).map(n=>n.machineName).join(", ");if(!w.isNativePlatform()){const n=E("subcleanings",[]);n.unshift({id:k(n),date:e.date,machineIds:e.machineIds,machineNames:a,cleaningStatus:e.cleaningStatus,notes:e.notes||null,branch:e.branch}),S("subcleanings",n);const o=E("machines",W);o.forEach(i=>{e.machineIds.includes(i.id)&&(i.status=e.cleaningStatus==="completed"?"available":"under_cleaning")}),S("machines",o);return}const s=await N();await s.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, notes, branch) VALUES (?, ?, ?, ?, ?, ?)",[e.date,JSON.stringify(e.machineIds),a,e.cleaningStatus,e.notes||null,e.branch]);const r=e.cleaningStatus==="completed"?"available":"under_cleaning";for(const n of e.machineIds)await s.run("UPDATE machines SET status = ? WHERE id = ?",[r,n])}async function Gt(e,t){if(!w.isNativePlatform()){const o=E("machines",W),i=o.find(p=>p.id===e);i&&(i.status="available"),S("machines",o);const c=E("subcleanings",[]),d=Ee();c.unshift({id:k(c),date:d,machineIds:[e],machineNames:i?.machineName??"",cleaningStatus:"completed",notes:null,branch:t}),S("subcleanings",c);return}const a=await N(),r=(await a.query("SELECT machineName FROM machines WHERE id = ?",[e])).values?.[0]?.machineName??"";await a.run("UPDATE machines SET status = ? WHERE id = ?",["available",e]);const n=Ee();await a.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, notes, branch) VALUES (?, ?, ?, ?, ?, ?)",[n,JSON.stringify([e]),r,"completed",null,t])}const $e=document.querySelector("#app");if(!$e)throw new Error("App root not found");let re;const Re={dashboard:"Dashboard",orders:"POS / Orders",customers:"Customers",pricing:"Pricing Services",disbursements:"Daily Report",reports:"Reports",inventory:"Inventory",maintenance:"Maintenance",staff:"Staff",settings:"Settings"},f={tab:"dashboard",receiptOrderId:0,currentUser:null,loginError:"",sidebarOpen:!1,dailyReportTab:"expenses",maintenanceTab:"cleaning",customerSearch:"",reportPreview:null},Yt=["Wash","Dry","Fold","Detergent","Fabcon","Zonrox"],Z="laba101-mobile-session";function C(e){return new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(e||0)}function u(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ye(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}function Je(e,t){const a=new Map;return e.filter(s=>s.workflowCompleted.includes("fold")&&s.foldedByName).forEach(s=>{const r=s.foldedByName,n=a.get(r)??{staffName:r,folds:0,rate:t,total:0};n.folds+=1,n.total=Number((n.folds*n.rate).toFixed(2)),a.set(r,n)}),Array.from(a.values())}function ee(e=new Date){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${s}`}function M(){return ee()}function ve(e){return ee(new Date(e))}function Vt(e){return new Intl.DateTimeFormat("en-PH",{dateStyle:"medium",timeStyle:"short"}).format(new Date(e))}function Jt(e=new Date){return{date:new Intl.DateTimeFormat("en-PH",{weekday:"long",month:"long",day:"numeric",year:"numeric"}).format(e),time:new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",second:"2-digit",hour12:!0}).format(e)}}function ne(){const e=document.querySelector("[data-date-from]"),t=document.querySelector("[data-date-to]"),a=Array.from(document.querySelectorAll('input[name="reportType"]:checked')).map(s=>s.value).filter(s=>s==="sales"||s==="disbursement"||s==="summary");return{from:e?.value||"0000-01-01",to:t?.value||"9999-12-31",types:a.length?a:["summary"]}}function be(e,t){return e>=t.from&&e<=t.to}function Qe(e,t,a,s,r){const n=new Set(r.types),o=e.filter(v=>be(ve(v.createdAt),r)),i=t.filter(v=>be(v.saleDate,r)),c=a.filter(v=>be(v.expenseDate,r)),d=Je(o,s),p=o.reduce((v,D)=>v+D.paidAmount,0),m=i.reduce((v,D)=>v+D.cashAmount,0),l=i.reduce((v,D)=>v+D.gcashAmount,0),g=0,b=p+m,h=g+l,y=b+h,$=c.reduce((v,D)=>v+D.amount,0),A=d.reduce((v,D)=>v+D.total,0),L=$+A,R=y-L,I=()=>({orderCashTotal:p,orderGcashTotal:g,manualCashTotal:m,manualGcashTotal:l,totalCash:b,totalGcash:h,totalSales:y,rows:[["Type","Date","Number","Name","Cash","GCash","Total","Balance"],...o.map(v=>["Order",ve(v.createdAt),v.ticket,v.customer,v.paidAmount,0,v.paidAmount,v.balance]),...i.map(v=>["Manual Sale",v.saleDate,v.saleNumber,v.notes??"",v.cashAmount,v.gcashAmount,v.totalAmount,""]),[],["Sales Summary",r.from,"to",r.to,"","","",""],["Order Cash","","","","","",p,""],["Order GCash","","","","","",g,""],["Manual Cash","","","","","",m,""],["Manual GCash","","","","","",l,""],["Total Cash","","","","","",b,""],["Total GCash","","","","","",h,""],["Total Sales","","","","","",y,""]]}),P=()=>({totalExpenses:$,totalFoldPayouts:A,totalDisbursement:L,rows:[["Type","Date","Number","Name","Cash","GCash","Total","Balance"],...c.map(v=>["Expense",v.expenseDate,v.number,v.name,"","",v.amount,""]),[],["Fold Payout Records",r.from,"to",r.to,"","","",""],["Staff","Fold Count","Rate","Total","","","",""],...d.map(v=>[v.staffName,v.folds,v.rate,v.total,"","","",""]),[],["Disbursement Summary",r.from,"to",r.to,"","","",""],["Expenses","","","","","",$,""],["Fold Payouts","","","","","",A,""],["Total Disbursement","","","","","",L,""]]});return{selection:r,selectedTypes:n,salesRows:I,disbursementRows:P,summaryRows:()=>{const v=I(),D=P();return[["Summary",r.from,"to",r.to,"","","",""],["Order Cash","","","","","",v.orderCashTotal,""],["Order GCash","","","","","",v.orderGcashTotal,""],["Manual Cash","","","","","",v.manualCashTotal,""],["Manual GCash","","","","","",v.manualGcashTotal,""],["Total Cash","","","","","",v.totalCash,""],["Total GCash","","","","","",v.totalGcash,""],["Total Sales","","","","","",v.totalSales,""],["Total Disbursement","","","","","",D.totalDisbursement,""],["Profit","","","","","",R,""]]},profit:R}}function Qt(e,t){return`<button class="nav-link ${t?"is-active":""}" data-tab="${e}" type="button">
    <span class="nav-icon">${zt(e)}</span>
    <span>${Re[e]}</span>
  </button>`}function x(e,t){return`<div class="section-head"><div><h2>${u(e)}</h2><p class="meta">${u(t)}</p></div></div>`}function Be(){return Re[f.tab]??"Dashboard"}function we(e){return(e?.name??"Laba101").trim().slice(0,1).toUpperCase()}function zt(e){return{dashboard:"DB",orders:"PO",customers:"CU",pricing:"PS",disbursements:"DR",reports:"RP",inventory:"IN",maintenance:"MT",staff:"ST",settings:"SE"}[e]}async function Zt(){const e=await he(),t=await Lt(e),a=await Ke(),s=await $t(),r=await Ce(),n=await Dt(),o=await He(),i=await pe(e),c=await Ut(),d=await kt(),p=await Mt(),m=await jt(),l=await Ve(e),g=await Xt(e),b=await At(),h=await We("report_email");return{branch:e,staff:t,allStaff:a,customers:s,services:r,allServices:n,categories:o,orders:i,payments:c,foldLogs:d,expenses:p,sales:m,machines:l,subcleanings:g,foldRate:b,reportEmail:h??""}}async function T(){if(!f.currentUser){ea(),ha();return}const e=await Zt();e.orders.filter(s=>s.status!=="claimed").length,e.orders.filter(s=>s.status==="ready").length,e.orders.reduce((s,r)=>s+r.paidAmount,0);const t=e.orders.filter(s=>ve(s.createdAt)===M()).reduce((s,r)=>s+r.paidAmount,0);e.sales.reduce((s,r)=>s+r.totalAmount,0);const a=Je(e.orders,e.foldRate).reduce((s,r)=>s+r.total,0);e.expenses.reduce((s,r)=>s+r.amount,0)+a,$e.innerHTML=`
    <div class="app-frame">
      <header class="topbar">
        <div class="topbar-left">
          <img src="/laba101-logo.svg" alt="Laba101" class="topbar-logo" />
          <div>
            <p class="eyebrow">Offline mobile system</p>
            <h1>${u(Be())}</h1>
          </div>
        </div>
        <div class="topbar-actions">
          <div class="branch-pill"><span>Branch</span><strong>${u(e.branch)}</strong></div>
          <button class="icon-button" type="button" aria-label="Notifications">!</button>
          <button class="profile-pill" type="button">
            <span>${we(f.currentUser)}</span>
            <strong>${u(f.currentUser.name)}</strong>
          </button>
        </div>
      </header>

      <button class="sidebar-backdrop ${f.sidebarOpen?"is-open":""}" id="sidebar-backdrop" type="button" aria-label="Close navigation"></button>

      <aside class="sidebar ${f.sidebarOpen?"is-open":""}">
        <div class="sidebar-mobile-head">
          <img src="/laba101-logo.svg" alt="Laba101" />
          <button class="sidebar-close" id="sidebar-close-button" type="button" aria-label="Close navigation">X</button>
        </div>
        <nav>${ze().map(s=>Qt(s,f.tab===s)).join("")}</nav>
        <div class="sidebar-fill">
          <div class="sidebar-branch-badge">
            <span>Active Branch</span>
            <strong>${u(e.branch)}</strong>
          </div>
          <p class="sidebar-app-name">Laba101 POS</p>
        </div>
        <div class="sidebar-user">
          <span class="avatar">${we(f.currentUser)}</span>
          <div>
            <strong>${u(f.currentUser.name)}</strong>
            <small>${u(f.currentUser.email)} / ${u(f.currentUser.role)}</small>
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
            <h2>${u(Be())}</h2>
          </div>
          <div class="navbar-time">
            <strong data-navbar-time>--:--</strong>
            <span data-navbar-date>Loading...</span>
          </div>
          <button class="mobile-avatar" type="button">${we(f.currentUser)}</button>
        </header>

        ${f.tab==="dashboard"?aa({paidToday:t,orders:e.orders}):""}
        ${f.tab==="orders"?sa(e.orders,e.customers,e.services,e.categories,e.staff,e.payments,e.branch):""}
        ${f.tab==="customers"?ia(e.customers,e.orders):""}
        ${f.tab==="pricing"?oa(e.allServices,e.categories):""}
        ${f.tab==="disbursements"?ca(e.expenses,e.sales):""}
        ${f.tab==="reports"?la(e.orders,e.sales,e.expenses,e.foldRate):""}
        ${f.tab==="inventory"?da(e.services,e.categories):""}
        ${f.tab==="maintenance"?ua(e.machines,e.subcleanings,e.branch):""}
        ${f.tab==="staff"?ma(e.allStaff,e.branch):""}
        ${f.tab==="settings"?va(e.branch,e.foldRate,e.reportEmail):""}
      </main>
    </div>
  `,fa(),ya(e),ga(e.allServices),ba(),wa(e.orders,e.sales,e.expenses,e.foldRate),Sa(),Ea(),Ta(e.allStaff),Na(),pa()}function ze(){return f.currentUser?.role==="admin"?Object.keys(Re).filter(e=>e!=="inventory"):["orders","disbursements","reports","maintenance"]}function ea(){$e.innerHTML=`
    <main class="login-page">

      <section class="login-panel-wrap">
        <article class="login-panel">
          <header>
            <div class="login-mark"><img src="/laba101-logo.svg" alt="Laba101" /></div>
            <h2>Welcome back</h2>
            <p>Sign in to continue managing today&apos;s laundry operations.</p>
          </header>
          ${f.loginError?`<div class="alert">${u(f.loginError)}</div>`:""}
          <form id="login-form" class="form">
            <label>Email address<input name="email" type="email" autocomplete="username" placeholder="admin@laba101.test" required /></label>
            <label>Password<input name="password" type="password" autocomplete="current-password" placeholder="Enter password" required /></label>
            <label class="remember"><input name="remember" type="checkbox" value="1" /> Remember me on this device</label>
            <button class="primary" id="login-button" type="submit">Sign in</button>
          </form>
        </article>
      </section>
    </main>
  `}function ta(){document.querySelectorAll("[data-fill-email]").forEach(e=>{e.addEventListener("click",()=>{const t=document.querySelector('input[name="email"]'),a=document.querySelector('input[name="password"]');t&&(t.value=e.dataset.fillEmail??""),a&&(a.value=e.dataset.fillPassword??"")})})}function aa(e){const t=new Date,a=Array.from({length:7},(n,o)=>{const i=new Date(t);return i.setDate(t.getDate()-(6-o)),new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric"}).format(i)}),s=Array.from({length:7},(n,o)=>{const i=new Date(t);i.setDate(t.getDate()-(6-o));const c=ee(i);return e.orders.filter(d=>ve(d.createdAt)===c).reduce((d,p)=>d+p.paidAmount,0)}),r=Math.max(1,...s);return`
    <section class="dashboard-main">
      <article class="panel revenue-panel">
        ${x("Revenue overview","Paid amount for the last 7 days.")}
        <div class="chart-shell">
          <div class="mini-chart revenue-chart">
            ${s.map((n,o)=>{const i=Math.max(16,Math.round(n/r*100));return`<div class="chart-bar ${o===s.length-1?"is-today":""}"><span style="height:${i}%"></span><strong>${C(n)}</strong></div>`}).join("")}
          </div>
          <div class="chart-days">${a.map(n=>`<span>${u(n)}</span>`).join("")}</div>
        </div>
        <div class="summary-list" style="margin-top:16px">
          <div><span>Paid today</span><strong>${C(e.paidToday)}</strong></div>
        </div>
      </article>
    </section>
  `}function sa(e,t,a,s,r,n,o){const i=a.filter(l=>l.serviceType==="order"&&l.isActive),c=a.filter(l=>l.serviceType==="addon"&&l.isActive),d=f.receiptOrderId?e.find(l=>l.id===f.receiptOrderId):null,p=new Set(e.map(l=>l.customerId)),m=t.filter(l=>p.has(l.id));return`
    <section class="grid content full">
      <article class="panel">
        ${x("New POS order","Customer, service, weight, add-ons, and initial payment")}
        <form id="order-form" class="form">
          <div class="form-row">
            <label>Existing customer (${u(o)})
              <select name="customerId">
                <option value="">-- New customer --</option>
                ${m.map(l=>`<option value="${l.id}" data-name="${u(l.name)}" data-phone="${u(l.phone??"")}">${u(l.name)} ${l.phone?`- ${u(l.phone)}`:""}</option>`).join("")}
              </select>
            </label>
            <label>Customer name<input name="customerName" required placeholder="Customer name" /></label>
          </div>
          <div class="form-row">
            <label>Phone<input name="customerPhone" placeholder="09..." /></label>
          </div>

          <label>Service
            <select name="serviceId" required>
              ${i.map(l=>`<option value="${l.id}">${u(l.name)} - ${C(l.price)}</option>`).join("")}
            </select>
          </label>
          <label>Item category
            <select name="itemCategoryId" required>
              ${s.map(l=>`<option value="${l.id}">${u(l.name)} max ${l.maxKg}kg</option>`).join("")}
            </select>
            <span class="field-hint" data-category-weight></span>
          </label>
          <label>Weight (KG)<input name="weightKg" type="number" min="0.25" max="200" step="0.01" value="1" required /></label>

          <fieldset class="check-grid">
            <legend>Extra services</legend>
            ${c.length?c.map(l=>`<label class="check"><input type="checkbox" name="addonIds" value="${l.id}" /> ${u(ye(l.name))} ${C(l.price)}</label>`).join(""):'<p class="helper">No extra services configured.</p>'}
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
        ${x("Order queue","Workflow, payment, and receipts")}
        <div class="table orders-table">
          <div class="table-head"><div>Ticket</div><div>Customer</div><div>Total</div><div>Status</div><div>Actions</div></div>
          ${e.map(l=>ra(l,r,a)).join("")||'<div class="helper">No orders yet.</div>'}
        </div>
      </article>
      ${d?na(d,n.filter(l=>l.orderId===d.id)):""}
    </section>
  `}function ra(e,t,a){const s=Ge(e,a),r=s.find(i=>!e.workflowCompleted.includes(i.key)),n=r?.key==="fold",o=r?.key==="extras"&&e.extras.length>0;return`
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
  `}function na(e,t){const a=t.reduce((r,n)=>r+Number(n.amount),0),s=Math.max(0,Number((a-e.totalAmount).toFixed(2)));return`
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="receipt-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-print-receipt>Print</button>
          <button class="secondary" type="button" data-close-receipt>Close</button>
        </div>
        <div class="receipt" id="receipt-print-area">
          <div class="receipt-head">
            <h3 id="receipt-title">Laba101</h3>
            <p>${u(e.ticket)}<br>${u(Vt(e.createdAt))}</p>
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
  `}function ia(e,t){const a=f.customerSearch.trim().toLowerCase(),s=e.filter(r=>a?r.name.toLowerCase().includes(a):!1);return`
    <section class="grid content full">
      <article class="panel">
        ${x("Customer Management","Customer records from local offline storage")}
        <form class="search-box" id="customer-search-form">
          <label>
            <span>Search customer name</span>
            <input name="customerSearch" data-customer-search type="search" placeholder="Type the customer name then tap Search" value="${u(f.customerSearch)}" autocomplete="off" />
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
  `}function oa(e,t){return`
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
            ${Yt.map(a=>`<label class="check"><input type="checkbox" name="includes" value="${a}" /> ${a}</label>`).join("")}
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
  `}function ca(e,t){const a=M(),s=a.slice(0,7),r=e.filter(c=>c.expenseDate===a).reduce((c,d)=>c+d.amount,0),n=e.filter(c=>c.expenseDate.startsWith(s)).reduce((c,d)=>c+d.amount,0),o=t.filter(c=>c.saleDate===a).reduce((c,d)=>c+d.totalAmount,0),i=t.filter(c=>c.saleDate.startsWith(s)).reduce((c,d)=>c+d.totalAmount,0);return`
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
        ${x("Input disbursement","Supplies, utilities, and cash disbursements")}
        <form id="expense-form" class="form">
          <div class="form-row"><label>Date<input name="expenseDate" type="date" value="${M()}" required /></label><label>Amount<input name="amount" type="number" min="0" step="0.01" required /></label></div>
          <div class="form-row"><label>Name<input name="name" required /></label><label>Category<input name="category" required /></label></div>
          <label>Description<textarea name="description"></textarea></label>
          <button class="primary" type="submit">Save expense</button>
        </form>
      </article>
      <article class="panel">
        ${x("Disbursement list","Expenses only")}
        <div class="table">
          <div class="table-head"><div>Date</div><div>No.</div><div>Name</div><div>Category</div><div>Amount</div></div>
          ${e.map(c=>`<div class="table-row"><div>${u(c.expenseDate)}</div><div>${u(c.number)}</div><div>${u(c.name)}</div><div>${u(c.category)}</div><div>${C(c.amount)}</div></div>`).join("")||'<div class="helper">No expenses yet.</div>'}
        </div>
      </article>
    </section>
    `:`
    <section class="grid content full">
      <article class="panel">
        ${x("Input total sale","Manual cash and GCash totals")}
        <form id="sales-form" class="form">
          <label>Date<input name="saleDate" type="date" value="${M()}" required /></label>
          <label>Cash sales<input name="cashAmount" type="number" min="0" step="0.01" value="0" /></label>
          <label>GCash sales<input name="gcashAmount" type="number" min="0" step="0.01" value="0" /></label>
          <label>Notes<textarea name="notes" placeholder="Optional"></textarea></label>
          <button class="primary" type="submit">Save daily sale</button>
        </form>
      </article>
      <article class="panel">
        ${x("Daily sales history","Cash, GCash, total sale, notes, and updates")}
        <div class="table wide-table">
          <div class="table-head"><div>Sales #</div><div>Date</div><div>Cash</div><div>GCash</div><div>Total sale</div></div>
          ${t.map(c=>`<div class="table-row"><div>${u(c.saleNumber)}</div><div>${u(c.saleDate)}</div><div>${C(c.cashAmount)}</div><div>${C(c.gcashAmount)}</div><div><strong>${C(c.totalAmount)}</strong></div></div>`).join("")||'<div class="helper">No daily sales totals yet.</div>'}
        </div>
      </article>
    </section>
    `}
  `}function la(e,t,a,s,r,n,o){const i=f.reportPreview?Qe(e,t,a,s,f.reportPreview):null;return`
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
            <label>From<input name="dateFrom" data-date-from type="date" value="${M()}" /></label>
            <label>To<input name="dateTo" data-date-to type="date" value="${M()}" /></label>
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
          <button class="secondary" id="generate-report" type="button">Generate report</button>
          <button class="secondary" id="email-report" type="button">Send File</button>
        </div>
      </div>
    </section>
    ${i?`
      <section class="panel report-preview">
        ${i.selectedTypes.has("sales")?`
          <article>
            ${x("Sales report preview",`${i.selection.from} to ${i.selection.to}`)}
            <div class="table wide-table report-preview-table">
              <div class="table-head"><div>Type</div><div>Date</div><div>Number</div><div>Name</div><div>Cash</div><div>GCash</div><div>Total</div><div>Balance</div></div>
              ${i.salesRows().rows.slice(1).map(c=>`<div class="table-row">${c.map(d=>`<div>${u(d??"")}</div>`).join("")}</div>`).join("")}
            </div>
          </article>`:""}
        ${i.selectedTypes.has("disbursement")?`
          <article>
            ${x("Disbursement preview",`${i.selection.from} to ${i.selection.to}`)}
            <div class="table wide-table report-preview-table">
              <div class="table-head"><div>Type</div><div>Date</div><div>Number</div><div>Name</div><div>Cash</div><div>GCash</div><div>Total</div><div>Balance</div></div>
              ${i.disbursementRows().rows.slice(1).map(c=>`<div class="table-row">${c.map(d=>`<div>${u(d??"")}</div>`).join("")}</div>`).join("")}
            </div>
          </article>`:""}
        ${i.selectedTypes.has("summary")?`
          <article>
            ${x("Summary preview",`${i.selection.from} to ${i.selection.to}`)}
            <div class="summary-list report-summary-list">
              ${i.summaryRows().map(c=>`<div><span>${u(c[0])}</span><strong>${u(String(c[6]??""))}</strong></div>`).join("")}
            </div>
          </article>`:""}
      </section>
    `:""}
  `}function da(e,t){return`
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
          ${e.map(a=>`<div class="table-row"><div><strong>${u(a.name)}</strong></div><div>${u(a.category)}</div><div>${C(a.price)}</div><div>${a.maxKg} kg</div><div>${a.isActive?"Active":"Inactive"}</div></div>`).join("")}
        </div>
      </article>
    </section>
  `}function ua(e,t,a){const s=e.filter(n=>n.status!=="under_cleaning"),r=e.filter(n=>n.status==="under_cleaning");return`
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
        ${x("Available Machines","Select machines to start cleaning.")}
        <form id="subcleaning-form" class="form">
          <input type="hidden" name="date" value="${M()}" />
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
        ${x("Under Cleaning","Machines currently being serviced.")}
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
        ${x("Daily Cleaning Checklist","Track which machines have been cleaned today.")}
        <div class="table">
          <div class="table-head"><div>Machine</div><div>Type</div><div>Status</div><div>Notes</div><div>Date</div></div>
          ${e.map(n=>{const o=t.find(i=>i.machineIds.includes(n.id)&&i.date===M());return`<div class="table-row"><div><strong>${u(n.machineName)}</strong></div><div>${u(n.machineType)}</div><div>${o?u(o.cleaningStatus.replace("_"," ")):"Not Cleaned"}</div><div>${u(o?.notes??"-")}</div><div>${M()}</div></div>`}).join("")}
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
          <input type="hidden" name="branch" value="${u(a)}" />
          <button class="primary" type="submit">Add machine</button>
        </form>
      </article>
      <article class="panel">
        ${x("Machines","Washer and dryer status")}
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
  `}function ma(e,t){return`
    <section class="grid">
      <div class="page-head">
        <div>
          <p class="eyebrow">Team Management</p>
          <h2>Staff Overview</h2>
        </div>
        <button class="primary" id="open-add-staff-modal" type="button">+ Add staff</button>
      </div>

      <article class="panel">
        ${x("Staff list","Branch: "+u(t))}
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
  `}function va(e,t,a){return`
    <section class="grid content full">
      <article class="panel">
        ${x("Settings","Device-local configuration")}
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
  `}function fa(){const e=()=>{localStorage.removeItem(Z),f.currentUser=null,f.tab="dashboard",f.receiptOrderId=0,f.sidebarOpen=!1,T()};document.querySelector("#logout-button")?.addEventListener("click",e),document.querySelector("#mobile-logout-button")?.addEventListener("click",e),document.querySelector("#mobile-menu-button")?.addEventListener("click",()=>{f.sidebarOpen=!0,T()}),document.querySelector("#sidebar-close-button")?.addEventListener("click",()=>{f.sidebarOpen=!1,T()}),document.querySelector("#sidebar-backdrop")?.addEventListener("click",()=>{f.sidebarOpen=!1,T()}),document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{f.tab=t.dataset.tab,f.receiptOrderId=0,f.sidebarOpen=!1,T()})}),document.querySelectorAll("[data-quick-tab]").forEach(t=>{t.addEventListener("click",()=>{f.tab=t.dataset.quickTab,T()})}),document.querySelectorAll("[data-receipt]").forEach(t=>{t.addEventListener("click",()=>{f.receiptOrderId=Number(t.dataset.receipt),T()})}),document.querySelector("[data-close-receipt]")?.addEventListener("click",()=>{f.receiptOrderId=0,T()}),document.querySelector("[data-print-receipt]")?.addEventListener("click",()=>{window.print()}),document.querySelectorAll("[data-report-tab]").forEach(t=>{t.addEventListener("click",()=>{f.dailyReportTab=t.dataset.reportTab,T()})}),document.querySelectorAll("[data-maintenance-tab]").forEach(t=>{t.addEventListener("click",()=>{f.maintenanceTab=t.dataset.maintenanceTab,T()})})}function ha(){ta(),document.querySelector("#login-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget),a=document.querySelector("#login-button");a&&(a.disabled=!0,a.textContent="Signing in...");try{const s=await Xe(String(t.get("email")??""),String(t.get("password")??""));if(!s){f.loginError="Invalid email or password.",await T();return}f.currentUser=s,f.loginError="",await ie("branch",String(s.branch||"Main Store")),t.get("remember")?localStorage.setItem(Z,JSON.stringify({email:s.email,remembered:!0})):localStorage.removeItem(Z),ze().includes(f.tab)||(f.tab="dashboard"),await T()}catch(s){alert("Login Error: "+String(s?.message||s)),a&&(a.disabled=!1,a.textContent="Sign in")}})}function pa(){re&&window.clearInterval(re);const e=document.querySelector("[data-navbar-time]"),t=document.querySelector("[data-navbar-date]");if(!e||!t){re=void 0;return}const a=()=>{const s=Jt();e.textContent=s.time,t.textContent=s.date};a(),re=window.setInterval(a,1e3)}function ya(e){const t=document.querySelector("#order-form"),a=document.querySelector("#price-preview"),s=t?.querySelector('button[type="submit"]'),r=t?.querySelector('select[name="customerId"]'),n=t?.querySelector('input[name="customerName"]'),o=t?.querySelector('input[name="customerPhone"]'),i=t?.querySelector("[data-category-weight]"),c=t?.querySelector("[data-order-error]"),d=t?.querySelector('select[name="paymentMethod"]'),p=t?.querySelector(".gcash-reference"),m=t?.querySelector('input[name="paymentReference"]'),l=()=>{if(!r||!n||!o)return;const h=r.selectedOptions[0];n.value=h?.dataset.name??"",o.value=h?.dataset.phone??""},g=()=>{const h=d?.value==="gcash";p&&(p.hidden=!h),m&&(m.required=h,h||(m.value=""))},b=()=>{if(!t||!a)return;const h=new FormData(t),y=e.services.find(P=>P.id===Number(h.get("serviceId"))),$=e.categories.find(P=>P.id===Number(h.get("itemCategoryId"))),A=e.services.filter(P=>h.getAll("addonIds").map(Number).includes(P.id));if(!y||!$)return;const L=Te(y,$,Number(h.get("weightKg")??0),A);i&&(i.textContent=`Allowed item weight: ${$.maxKg} kg`);const R=A.map(P=>ye(P.name)),I=L.extraKg>0;s&&(s.disabled=I),c&&(c.hidden=!I,c.textContent=L.warning??""),a.classList.toggle("has-error",I),a.innerHTML=`
      <div class="preview-line"><span>Base price</span><strong>${C(L.price)}</strong></div>
      ${L.extraServiceAmount>0?`<div class="preview-line"><span>Extra services${R.length?` (${u(R.join(", "))})`:""}</span><strong>${C(L.extraServiceAmount)}</strong></div>`:""}
      <div class="preview-total"><span>Total amount</span><strong>${C(L.totalAmount)}</strong></div>
      ${L.warning?`<span class="warn">${u(L.warning)}</span>`:""}
    `};r?.addEventListener("change",l),d?.addEventListener("change",g),g(),t?.addEventListener("input",b),t?.addEventListener("change",b),b(),t?.addEventListener("submit",async h=>{h.preventDefault();const y=new FormData(t),$=e.services.find(R=>R.id===Number(y.get("serviceId"))),A=e.categories.find(R=>R.id===Number(y.get("itemCategoryId"))),L=e.services.filter(R=>y.getAll("addonIds").map(Number).includes(R.id));if($&&A){const R=Te($,A,Number(y.get("weightKg")??0),L);if(R.extraKg>0){c&&(c.hidden=!1,c.textContent=R.warning??"Weight exceeds the allowed limit.");return}}try{await Pt({customerId:Number(y.get("customerId"))||void 0,customerName:String(y.get("customerName")??""),customerPhone:String(y.get("customerPhone")??"")||null,serviceId:Number(y.get("serviceId")),itemCategoryId:Number(y.get("itemCategoryId")),branch:e.branch,weightKg:Number(y.get("weightKg")),addonIds:y.getAll("addonIds").map(Number),paidAmount:Number(y.get("paidAmount")??0),paymentMethod:String(y.get("paymentMethod")??"cash"),paymentReference:String(y.get("paymentReference")??"")||null,notes:String(y.get("notes")??"")||null}),await T()}catch(R){c&&(c.hidden=!1,c.textContent=R instanceof Error?R.message:"Order could not be saved.")}}),document.querySelectorAll(".advance-form").forEach(h=>{h.addEventListener("submit",async y=>{y.preventDefault();const $=new FormData(h);await qt(Number(h.dataset.orderId),Number($.get("assignedStaffId"))||null),await T()})}),document.querySelectorAll(".payment-form").forEach(h=>{const y=h.querySelector('select[name="method"]'),$=h.querySelector('input[name="reference"]'),A=()=>{const L=y?.value==="gcash";$&&($.hidden=!L,$.required=L,L||($.value=""))};y?.addEventListener("change",A),A(),h.addEventListener("submit",async L=>{L.preventDefault();const R=new FormData(h);await Ye(Number(h.dataset.orderId),{amount:Number(R.get("amount")),method:String(R.get("method")),reference:String(R.get("reference")??"")||null}),await T()})})}function ga(e){document.querySelector("#service-form")?.addEventListener("submit",async t=>{t.preventDefault();const a=new FormData(t.currentTarget),s=a.get("id")?Number(a.get("id")):void 0;await Me({id:s,name:String(a.get("name")??""),description:String(a.get("description")??"")||null,category:String(a.get("category")??""),serviceType:String(a.get("serviceType")??"order"),price:Number(a.get("price")??0),maxKg:Number(a.get("maxKg")??0),dryingMinutes:Number(a.get("dryingMinutes"))||null,includes:a.getAll("includes").map(String).filter(Boolean),additionalCharge:0,turnaroundHours:Number(a.get("turnaroundHours")??24),isActive:1}),await T()}),document.querySelectorAll(".edit-service-btn").forEach(t=>{t.addEventListener("click",()=>{const a=Number(t.dataset.id),s=e.find(n=>n.id===a),r=document.querySelector("#service-form");s&&r&&(r.querySelector("[name=id]").value=String(s.id),r.querySelector("[name=name]").value=s.name,r.querySelector("[name=category]").value=s.category,r.querySelector("[name=serviceType]").value=s.serviceType,r.querySelector("[name=price]").value=String(s.price),r.querySelector("[name=maxKg]").value=String(s.maxKg),r.querySelector("[name=dryingMinutes]").value=s.dryingMinutes?String(s.dryingMinutes):"",r.querySelectorAll('input[name="includes"]').forEach(n=>{n.checked=s.includes.includes(n.value)}),r.querySelector("[name=turnaroundHours]").value=String(s.turnaroundHours),r.querySelector("[name=description]").value=s.description??"",window.scrollTo({top:0,behavior:"smooth"}))})}),document.querySelectorAll(".deactivate-service-btn, .activate-service-btn").forEach(t=>{t.addEventListener("click",async()=>{const a=Number(t.dataset.id),s=e.find(r=>r.id===a);if(s){const r=s.isActive?0:1;await Me({id:s.id,name:s.name,description:s.description,category:s.category,serviceType:s.serviceType,price:s.price,maxKg:s.maxKg,dryingMinutes:s.dryingMinutes,includes:s.includes,additionalCharge:s.additionalCharge,turnaroundHours:s.turnaroundHours,isActive:r}),await T()}})}),document.querySelector("#category-form")?.addEventListener("submit",async t=>{t.preventDefault();const a=new FormData(t.currentTarget);await xt({name:String(a.get("name")??""),maxKg:Number(a.get("maxKg")??0),additionalFee:Number(a.get("additionalFee")??0),isActive:1}),await T()})}function ba(){document.querySelector("#expense-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await Bt({expenseDate:String(t.get("expenseDate")??""),name:String(t.get("name")??""),category:String(t.get("category")??""),description:String(t.get("description")??""),amount:Number(t.get("amount")??0)}),await T()}),document.querySelector("#fold-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await Ft({orderTicket:String(t.get("orderTicket")??""),staffName:String(t.get("staffName")??""),foldCount:Number(t.get("foldCount")??1),rate:Number(t.get("rate")??5)}),await T()})}function wa(e,t,a,s){document.querySelector("#generate-report")?.addEventListener("click",()=>{f.reportPreview=ne(),T()}),document.querySelector("#sales-form")?.addEventListener("submit",async m=>{m.preventDefault();const l=new FormData(m.currentTarget);await _t({saleDate:String(l.get("saleDate")??""),cashAmount:Number(l.get("cashAmount")??0),gcashAmount:Number(l.get("gcashAmount")??0),notes:String(l.get("notes")??"")}),await T()});const r=document.querySelector("[data-date-from]"),n=document.querySelector("[data-date-to]");document.querySelectorAll("[data-date-scope]").forEach(m=>{m.addEventListener("change",()=>{if(!m.checked||!r||!n)return;const l=new Date,g=ee(l),b=new Date(l);m.value==="week"&&b.setDate(l.getDate()-6),m.value==="month"&&b.setDate(1),m.value!=="custom"&&(r.value=m.value==="today"?g:ee(b),n.value=g)})});const o=m=>{const l=h=>String(h??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;"),g=h=>h==="Sales Report"?[110,125,150,215,95,95,105,105]:h==="Disbursement"?[130,115,165,190,95,105,105,105]:[155,125,125,125,95,95,115,115];return`<?xml version="1.0"?>
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
  ${m.map(h=>{const y=g(h.name).map(A=>`<Column ss:Width="${A}" ss:AutoFitWidth="0"/>`).join(""),$=h.rows.map(A=>{if(!A.length)return'<Row ss:Height="10" ss:StyleID="BorderRow"><Cell ss:StyleID="BorderCell"><Data ss:Type="String">&nbsp;</Data></Cell></Row>';const L=A[0]==="Type"||A[0]==="Summary"||A[0]==="Sales Summary"||A[0]==="Disbursement Summary",R=L?"HeaderRow":"BorderRow",I=L?"HeaderCell":"BorderCell",P=L?26:22,X=A.map(v=>`<Cell ss:StyleID="${I}"><Data ss:Type="${typeof v=="number"?"Number":"String"}">${l(v)}</Data></Cell>`).join("");return`<Row ss:Height="${P}" ss:StyleID="${R}">${X}</Row>`}).join("");return`
        <Worksheet ss:Name="${l(h.name)}">
          <Table>
            ${y}
            ${$}
          </Table>
        </Worksheet>`}).join("")}
</Workbook>`},i=()=>{const m=ne(),l=Qe(e,t,a,s,m),g=[];l.selectedTypes.has("sales")&&g.push({name:"Sales Report",rows:l.salesRows().rows}),l.selectedTypes.has("disbursement")&&g.push({name:"Disbursement",rows:l.disbursementRows().rows}),l.selectedTypes.has("summary")&&g.push({name:"Summary",rows:l.summaryRows()});const b=o(g.length?g:[{name:"Summary",rows:l.summaryRows()}]),h=`laba101-report-${m.from}-to-${m.to}.xls`;return new File([b],h,{type:"application/vnd.ms-excel"})},c=async()=>{const m=i();if(!w.isNativePlatform())return{fileName:m.name,uri:""};const l=await m.text(),g=m.name;await qe.writeFile({path:g,data:l,directory:oe.External,encoding:Se.UTF8});const{uri:b}=await qe.getUri({path:g,directory:oe.External});return{fileName:m.name,uri:b}},d=()=>{const m=i(),l=ne(),g=`laba101-report-${l.from}-to-${l.to}.xls`,b=m,h=URL.createObjectURL(b),y=document.createElement("a");return y.href=h,y.download=g,document.body.appendChild(y),y.click(),setTimeout(()=>{y.remove(),URL.revokeObjectURL(h)},1e3),g},p=async m=>{const l=document.querySelector(m==="export"?"#export-report":"#email-report");l&&(l.disabled=!0,l.textContent=m==="export"?"Exporting...":"Sending...");try{if(m==="export")if(w.isNativePlatform()){const g=await c();alert(`Report exported as "${g.fileName}".`)}else{const g=d();alert(`Report saved: ${g}`)}else{const g=await We("report_email")||"";if(!g){alert("Please configure a report email in Settings first.");return}const b=ne(),h=`Laba101 report ${b.from} to ${b.to}`;if(w.isNativePlatform()){const y=await c();try{await ft.share({title:h,text:`Please find the attached Laba101 report file: ${y.fileName}`,files:[y.uri],dialogTitle:"Send report via email"}),alert(`Report saved and shared as "${y.fileName}".`)}catch($){const A=String($).toLowerCase();if(A.includes("share canceled")||A.includes("canceled"))alert(`Report saved as "${y.fileName}".`);else throw $}}else{const y=d(),$=`Hi,

Please find the attached Laba101 report file: ${y}

Date range: ${b.from} to ${b.to}`,A=`mailto:${g}?subject=${encodeURIComponent(h)}&body=${encodeURIComponent($)}`;setTimeout(()=>{window.location.href=A},800),alert(`Report downloaded as "${y}".
Your email app will open — please attach the file and send.`)}}}catch(g){alert("Failed: "+String(g))}finally{l&&(l.disabled=!1,l.textContent=m==="export"?"Export Excel":"Send to Email")}};document.querySelector("#export-report")?.addEventListener("click",async()=>{await p("export")}),document.querySelector("#email-report")?.addEventListener("click",async()=>{await p("email")})}function Sa(){document.querySelector("#customer-search-form")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);f.customerSearch=String(t.get("customerSearch")??"").trim(),T()}),document.querySelector("#customer-search-clear")?.addEventListener("click",()=>{f.customerSearch="",T()})}function Ea(){document.querySelector("#machine-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await Wt({machineName:String(t.get("machineName")??""),machineType:String(t.get("machineType")),status:String(t.get("status")),branch:String(t.get("branch")??"")}),await T()}),document.querySelector("#subcleaning-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=e.currentTarget.querySelector('button[type="submit"]');t&&(t.disabled=!0,t.textContent="Starting...");const a=new FormData(e.currentTarget),s=a.getAll("machineIds").map(Number);if(!s.length){alert("Please select at least one machine to clean."),t&&(t.disabled=!1,t.textContent="Start Cleaning");return}await Ht({date:String(a.get("date")??""),machineIds:s,cleaningStatus:String(a.get("cleaningStatus")??""),notes:String(a.get("notes")??""),branch:String(a.get("branch")??"")}),await T()}),document.querySelectorAll(".complete-cleaning-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.machineId),a=e.dataset.branch??"";e.disabled=!0,e.textContent="Completing...",await Gt(t,a),await T()})}),document.querySelectorAll(".deactivate-machine-btn, .activate-machine-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.id),a=e.classList.contains("deactivate-machine-btn");await Kt(t,a?"inactive":"available"),await T()})})}function Ta(e){const t=document.querySelector("#add-staff-modal"),a=document.querySelector("#open-add-staff-modal"),s=document.querySelector("#close-add-staff-modal"),r=document.querySelector("#staff-form"),n=()=>{r?.reset(),r&&(r.querySelector("[name=id]").value="");const i=document.querySelector("#add-staff-title");i&&(i.textContent="Add staff member"),t?.removeAttribute("hidden")},o=()=>{t?.setAttribute("hidden",""),r?.reset()};a?.addEventListener("click",n),s?.addEventListener("click",o),t?.addEventListener("click",i=>{i.target===t&&o()}),document.querySelectorAll(".edit-staff-btn").forEach(i=>{i.addEventListener("click",()=>{const c=Number(i.dataset.id),d=e.find(p=>p.id===c);if(d&&r){r.querySelector("[name=id]").value=String(d.id),r.querySelector("[name=name]").value=d.name,r.querySelector("[name=email]").value=d.email,r.querySelector("[name=password]").value=d.password,r.querySelector("[name=role]").value=d.role,r.querySelector("[name=branch]").value=d.branch;const p=document.querySelector("#add-staff-title");p&&(p.textContent="Edit staff member"),t?.removeAttribute("hidden")}})}),document.querySelectorAll(".deactivate-staff-btn, .activate-staff-btn").forEach(i=>{i.addEventListener("click",async()=>{const c=Number(i.dataset.id),d=e.find(p=>p.id===c);d&&(await Fe(c,{isActive:d.isActive!==0?0:1}),await T())})}),r?.addEventListener("submit",async i=>{i.preventDefault();const c=document.querySelector("#staff-save-btn");c&&(c.disabled=!0,c.textContent="Saving...");const d=new FormData(r),p=d.get("id")?Number(d.get("id")):void 0,m=String(d.get("name")??"").trim(),l=String(d.get("email")??"").trim(),g=String(d.get("password")??"password")||"password",b=String(d.get("role")),h=String(d.get("branch")??"");if(!m||!l){alert("Name and email are required."),c&&(c.disabled=!1,c.textContent="Save staff member");return}try{p?await Fe(p,{name:m,email:l,password:g,role:b,branch:h}):await Ct({name:m,email:l,password:g,role:b,branch:h}),o(),await T()}catch{alert("Failed to save staff. The email may already be in use."),c&&(c.disabled=!1,c.textContent="Save staff member")}})}function Na(){document.querySelector("#settings-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await ie("branch",String(t.get("branch")??"Main Store")),await ie("fold_rate",String(t.get("foldRate")??"5")),String(t.get("reportEmail")??"")&&await ie("report_email",String(t.get("reportEmail"))),alert("Settings saved successfully!"),await T()})}await Nt();const je=localStorage.getItem(Z);if(je)try{const e=JSON.parse(je);if(e.email&&e.remembered){const t=await Xe(e.email,"password")??null;f.currentUser=t}}catch{localStorage.removeItem(Z)}await T();export{Se as E,Ne as W,it as b};
