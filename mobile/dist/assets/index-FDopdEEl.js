(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function a(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=a(r);fetch(r.href,n)}})();var z;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(z||(z={}));class Ae extends Error{constructor(t,a,s){super(t),this.message=t,this.code=a,this.data=s}}const gt=e=>{var t,a;return e?.androidBridge?"android":!((a=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},bt=e=>{const t=e.CapacitorCustomPlatform||null,a=e.Capacitor||{},s=a.Plugins=a.Plugins||{},r=()=>t!==null?t.name:gt(e),n=()=>r()!=="web",o=v=>{const f=l.get(v);return!!(f?.platforms.has(r())||c(v))},c=v=>{var f;return(f=a.PluginHeaders)===null||f===void 0?void 0:f.find(p=>p.name===v)},i=v=>e.console.error(v),l=new Map,m=(v,f={})=>{const p=l.get(v);if(p)return console.warn(`Capacitor plugin "${v}" already registered. Cannot register plugins twice.`),p.proxy;const h=r(),b=c(v);let y;const A=async()=>(!y&&h in f?y=typeof f[h]=="function"?y=await f[h]():y=f[h]:t!==null&&!y&&"web"in f&&(y=typeof f.web=="function"?y=await f.web():y=f.web),y),$=(O,P)=>{var k,H;if(b){const g=b?.methods.find(x=>P===x.name);if(g)return g.rtype==="promise"?x=>a.nativePromise(v,P.toString(),x):(x,Q)=>a.nativeCallback(v,P.toString(),x,Q);if(O)return(k=O[P])===null||k===void 0?void 0:k.bind(O)}else{if(O)return(H=O[P])===null||H===void 0?void 0:H.bind(O);throw new Ae(`"${v}" plugin is not implemented on ${h}`,z.Unimplemented)}},N=O=>{let P;const k=(...H)=>{const g=A().then(x=>{const Q=$(x,O);if(Q){const de=Q(...H);return P=de?.remove,de}else throw new Ae(`"${v}.${O}()" is not implemented on ${h}`,z.Unimplemented)});return O==="addListener"&&(g.remove=async()=>P()),g};return k.toString=()=>`${O.toString()}() { [capacitor code] }`,Object.defineProperty(k,"name",{value:O,writable:!1,configurable:!1}),k},I=N("addListener"),q=N("removeListener"),J=(O,P)=>{const k=I({eventName:O},P),H=async()=>{const x=await k;q({eventName:O,callbackId:x},P)},g=new Promise(x=>k.then(()=>x({remove:H})));return g.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await H()},g},K=new Proxy({},{get(O,P){switch(P){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return b?J:I;case"removeListener":return q;default:return N(P)}}});return s[v]=K,l.set(v,{name:v,proxy:K,platforms:new Set([...Object.keys(f),...b?[h]:[]])}),K};return a.convertFileSrc||(a.convertFileSrc=v=>v),a.getPlatform=r,a.handleError=i,a.isNativePlatform=n,a.isPluginAvailable=o,a.registerPlugin=m,a.Exception=Ae,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},Et=e=>e.Capacitor=bt(e),w=Et(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),se=w.registerPlugin;class De{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,a){let s=!1;this.listeners[t]||(this.listeners[t]=[],s=!0),this.listeners[t].push(a);const n=this.windowListeners[t];n&&!n.registered&&this.addWindowListener(n),s&&this.sendRetainedArgumentsForEvent(t);const o=async()=>this.removeListener(t,a);return Promise.resolve({remove:o})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,a,s){const r=this.listeners[t];if(!r){if(s){let n=this.retainedEventArguments[t];n||(n=[]),n.push(a),this.retainedEventArguments[t]=n}return}r.forEach(n=>n(a))}hasListeners(t){var a;return!!(!((a=this.listeners[t])===null||a===void 0)&&a.length)}registerWindowListener(t,a){this.windowListeners[a]={registered:!1,windowEventName:t,pluginEventName:a,handler:s=>{this.notifyListeners(a,s)}}}unimplemented(t="not implemented"){return new w.Exception(t,z.Unimplemented)}unavailable(t="not available"){return new w.Exception(t,z.Unavailable)}async removeListener(t,a){const s=this.listeners[t];if(!s)return;const r=s.indexOf(a);this.listeners[t].splice(r,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const a=this.retainedEventArguments[t];a&&(delete this.retainedEventArguments[t],a.forEach(s=>{this.notifyListeners(t,s)}))}}const ke=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Me=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class St extends De{async getCookies(){const t=document.cookie,a={};return t.split(";").forEach(s=>{if(s.length<=0)return;let[r,n]=s.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");r=Me(r).trim(),n=Me(n).trim(),a[r]=n}),a}async setCookie(t){try{const a=ke(t.key),s=ke(t.value),r=t.expires?`; expires=${t.expires.replace("expires=","")}`:"",n=(t.path||"/").replace("path=",""),o=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${a}=${s||""}${r}; path=${n}; ${o};`}catch(a){return Promise.reject(a)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const a of t)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}se("CapacitorCookies",{web:()=>new St});const wt=async e=>new Promise((t,a)=>{const s=new FileReader;s.onload=()=>{const r=s.result;t(r.indexOf(",")>=0?r.split(",")[1]:r)},s.onerror=r=>a(r),s.readAsDataURL(e)}),Tt=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(r=>r.toLocaleLowerCase()).reduce((r,n,o)=>(r[n]=e[t[o]],r),{})},Nt=(e,t=!0)=>e?Object.entries(e).reduce((s,r)=>{const[n,o]=r;let c,i;return Array.isArray(o)?(i="",o.forEach(l=>{c=t?encodeURIComponent(l):l,i+=`${n}=${c}&`}),i.slice(0,-1)):(c=t?encodeURIComponent(o):o,i=`${n}=${c}`),`${s}&${i}`},"").substr(1):null,At=(e,t={})=>{const a=Object.assign({method:e.method||"GET",headers:e.headers},t),r=Tt(e.headers)["content-type"]||"";if(typeof e.data=="string")a.body=e.data;else if(r.includes("application/x-www-form-urlencoded")){const n=new URLSearchParams;for(const[o,c]of Object.entries(e.data||{}))n.set(o,c);a.body=n.toString()}else if(r.includes("multipart/form-data")||e.data instanceof FormData){const n=new FormData;if(e.data instanceof FormData)e.data.forEach((c,i)=>{n.append(i,c)});else for(const c of Object.keys(e.data))n.append(c,e.data[c]);a.body=n;const o=new Headers(a.headers);o.delete("content-type"),a.headers=o}else(r.includes("application/json")||typeof e.data=="object")&&(a.body=JSON.stringify(e.data));return a};class Lt extends De{async request(t){const a=At(t,t.webFetchExtra),s=Nt(t.params,t.shouldEncodeUrlParams),r=s?`${t.url}?${s}`:t.url,n=await fetch(r,a),o=n.headers.get("content-type")||"";let{responseType:c="text"}=n.ok?t:{};o.includes("application/json")&&(c="json");let i,l;switch(c){case"arraybuffer":case"blob":l=await n.blob(),i=await wt(l);break;case"json":i=await n.json();break;default:i=await n.text()}const m={};return n.headers.forEach((v,f)=>{m[f]=v}),{data:i,headers:m,status:n.status,url:n.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}se("CapacitorHttp",{web:()=>new Lt});var Be;(function(e){e.Dark="DARK",e.Light="LIGHT",e.Default="DEFAULT"})(Be||(Be={}));var _e;(function(e){e.StatusBar="StatusBar",e.NavigationBar="NavigationBar"})(_e||(_e={}));class Ct extends De{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}se("SystemBars",{web:()=>new Ct});const $t="modulepreload",Rt=function(e){return"/"+e},je={},Oe=function(t,a,s){let r=Promise.resolve();if(a&&a.length>0){let i=function(l){return Promise.all(l.map(m=>Promise.resolve(m).then(v=>({status:"fulfilled",value:v}),v=>({status:"rejected",reason:v}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),c=o?.nonce||o?.getAttribute("nonce");r=i(a.map(l=>{if(l=Rt(l),l in je)return;je[l]=!0;const m=l.endsWith(".css"),v=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${v}`))return;const f=document.createElement("link");if(f.rel=m?"stylesheet":$t,m||(f.as="script"),f.crossOrigin="",f.href=l,c&&f.setAttribute("nonce",c),document.head.appendChild(f),m)return new Promise((p,h)=>{f.addEventListener("load",p),f.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${l}`)))})}))}function n(o){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=o,window.dispatchEvent(c),!c.defaultPrevented)throw o}return r.then(o=>{for(const c of o||[])c.status==="rejected"&&n(c.reason);return t().catch(n)})};function xt(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,a){return new Proxy({},{get(s,r){return(n,o,c)=>{const i=e.Capacitor.Plugins[a];if(i===void 0){c(new Error(`Capacitor plugin ${a} not found`));return}if(typeof i[r]!="function"){c(new Error(`Method ${r} not found in Capacitor plugin ${a}`));return}(async()=>{try{const l=await i[r](n);o(l)}catch(l){c(l)}})()}}})}})}function Dt(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,a){return e.cordova.plugins[a]}})}function Ot(e=!1){typeof window>"u"||(window.CapacitorUtils=window.CapacitorUtils||{},window.Capacitor!==void 0&&!e?xt(window):window.cordova!==void 0&&Dt(window))}var Z;(function(e){e.Documents="DOCUMENTS",e.Data="DATA",e.Library="LIBRARY",e.Cache="CACHE",e.External="EXTERNAL",e.ExternalStorage="EXTERNAL_STORAGE",e.ExternalCache="EXTERNAL_CACHE",e.LibraryNoCloud="LIBRARY_NO_CLOUD",e.Temporary="TEMPORARY"})(Z||(Z={}));var he;(function(e){e.UTF8="utf8",e.ASCII="ascii",e.UTF16="utf16"})(he||(he={}));const ye=se("Filesystem",{web:()=>Oe(()=>import("./web-irkyEpX3.js"),[]).then(e=>new e.FilesystemWeb)});Ot();const et=se("Share",{web:()=>Oe(()=>import("./web-snqGPhuL.js"),[]).then(e=>new e.ShareWeb)});class Pt{constructor(t){this.sqlite=t,this._connectionDict=new Map}async initWebStore(){try{return await this.sqlite.initWebStore(),Promise.resolve()}catch(t){return Promise.reject(t)}}async saveToStore(t){try{return await this.sqlite.saveToStore({database:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async saveToLocalDisk(t){try{return await this.sqlite.saveToLocalDisk({database:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getFromLocalDiskToStore(t){const a=t??!0;try{return await this.sqlite.getFromLocalDiskToStore({overwrite:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async echo(t){try{const a=await this.sqlite.echo({value:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isSecretStored(){try{const t=await this.sqlite.isSecretStored();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async setEncryptionSecret(t){try{return await this.sqlite.setEncryptionSecret({passphrase:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async changeEncryptionSecret(t,a){try{return await this.sqlite.changeEncryptionSecret({passphrase:t,oldpassphrase:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async clearEncryptionSecret(){try{return await this.sqlite.clearEncryptionSecret(),Promise.resolve()}catch(t){return Promise.reject(t)}}async checkEncryptionSecret(t){try{const a=await this.sqlite.checkEncryptionSecret({passphrase:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async addUpgradeStatement(t,a){try{return t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.addUpgradeStatement({database:t,upgrade:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async createConnection(t,a,s,r,n){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.createConnection({database:t,encrypted:a,mode:s,version:r,readonly:n});const o=new He(t,n,this.sqlite),c=n?`RO_${t}`:`RW_${t}`;return this._connectionDict.set(c,o),Promise.resolve(o)}catch(o){return Promise.reject(o)}}async closeConnection(t,a){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.closeConnection({database:t,readonly:a});const s=a?`RO_${t}`:`RW_${t}`;return this._connectionDict.delete(s),Promise.resolve()}catch(s){return Promise.reject(s)}}async isConnection(t,a){const s={};t.endsWith(".db")&&(t=t.slice(0,-3));const r=a?`RO_${t}`:`RW_${t}`;return s.result=this._connectionDict.has(r),Promise.resolve(s)}async retrieveConnection(t,a){t.endsWith(".db")&&(t=t.slice(0,-3));const s=a?`RO_${t}`:`RW_${t}`;if(this._connectionDict.has(s)){const r=this._connectionDict.get(s);return typeof r<"u"?Promise.resolve(r):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async getNCDatabasePath(t,a){try{const s=await this.sqlite.getNCDatabasePath({path:t,database:a});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async createNCConnection(t,a){try{await this.sqlite.createNCConnection({databasePath:t,version:a});const s=new He(t,!0,this.sqlite),r=`RO_${t})`;return this._connectionDict.set(r,s),Promise.resolve(s)}catch(s){return Promise.reject(s)}}async closeNCConnection(t){try{await this.sqlite.closeNCConnection({databasePath:t});const a=`RO_${t})`;return this._connectionDict.delete(a),Promise.resolve()}catch(a){return Promise.reject(a)}}async isNCConnection(t){const a={},s=`RO_${t})`;return a.result=this._connectionDict.has(s),Promise.resolve(a)}async retrieveNCConnection(t){if(this._connectionDict.has(t)){const a=`RO_${t})`,s=this._connectionDict.get(a);return typeof s<"u"?Promise.resolve(s):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async isNCDatabase(t){try{const a=await this.sqlite.isNCDatabase({databasePath:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async retrieveAllConnections(){return this._connectionDict}async closeAllConnections(){const t=new Map;try{for(const a of this._connectionDict.keys()){const s=a.substring(3),r=a.substring(0,3)==="RO_";await this.sqlite.closeConnection({database:s,readonly:r}),t.set(a,null)}for(const a of t.keys())this._connectionDict.delete(a);return Promise.resolve()}catch(a){return Promise.reject(a)}}async checkConnectionsConsistency(){try{const t=[...this._connectionDict.keys()],a=[],s=[];for(const n of t)a.push(n.substring(0,2)),s.push(n.substring(3));const r=await this.sqlite.checkConnectionsConsistency({dbNames:s,openModes:a});return r.result||(this._connectionDict=new Map),Promise.resolve(r)}catch(t){return this._connectionDict=new Map,Promise.reject(t)}}async importFromJson(t){try{const a=await this.sqlite.importFromJson({jsonstring:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isJsonValid(t){try{const a=await this.sqlite.isJsonValid({jsonstring:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async copyFromAssets(t){const a=t??!0;try{return await this.sqlite.copyFromAssets({overwrite:a}),Promise.resolve()}catch(s){return Promise.reject(s)}}async getFromHTTPRequest(t,a){const s=a??!0;try{return await this.sqlite.getFromHTTPRequest({url:t,overwrite:s}),Promise.resolve()}catch(r){return Promise.reject(r)}}async isDatabaseEncrypted(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const a=await this.sqlite.isDatabaseEncrypted({database:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isInConfigEncryption(){try{const t=await this.sqlite.isInConfigEncryption();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isInConfigBiometricAuth(){try{const t=await this.sqlite.isInConfigBiometricAuth();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isDatabase(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const a=await this.sqlite.isDatabase({database:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async getDatabaseList(){try{const a=(await this.sqlite.getDatabaseList()).values;a.sort();const s={values:a};return Promise.resolve(s)}catch(t){return Promise.reject(t)}}async getMigratableDbList(t){const a=t||"default";try{const s=await this.sqlite.getMigratableDbList({folderPath:a});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async addSQLiteSuffix(t,a){const s=t||"default",r=a||[];try{const n=await this.sqlite.addSQLiteSuffix({folderPath:s,dbNameList:r});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async deleteOldDatabases(t,a){const s=t||"default",r=a||[];try{const n=await this.sqlite.deleteOldDatabases({folderPath:s,dbNameList:r});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async moveDatabasesAndAddSuffix(t,a){const s=t||"default",r=a||[];return this.sqlite.moveDatabasesAndAddSuffix({folderPath:s,dbNameList:r})}}class He{constructor(t,a,s){this.dbName=t,this.readonly=a,this.sqlite=s}getConnectionDBName(){return this.dbName}getConnectionReadOnly(){return this.readonly}async open(){try{return await this.sqlite.open({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async close(){try{return await this.sqlite.close({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async beginTransaction(){try{const t=await this.sqlite.beginTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async commitTransaction(){try{const t=await this.sqlite.commitTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async rollbackTransaction(){try{const t=await this.sqlite.rollbackTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTransactionActive(){try{const t=await this.sqlite.isTransactionActive({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async loadExtension(t){try{return await this.sqlite.loadExtension({database:this.dbName,path:t,readonly:this.readonly}),Promise.resolve()}catch(a){return Promise.reject(a)}}async enableLoadExtension(t){try{return await this.sqlite.enableLoadExtension({database:this.dbName,toggle:t,readonly:this.readonly}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getUrl(){try{const t=await this.sqlite.getUrl({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getVersion(){try{const t=await this.sqlite.getVersion({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getTableList(){try{const t=await this.sqlite.getTableList({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async execute(t,a=!0,s=!0){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const r=await this.sqlite.execute({database:this.dbName,statements:t,transaction:a,readonly:!1,isSQL92:s});return Promise.resolve(r)}}catch(r){return Promise.reject(r)}}async query(t,a,s=!0){let r;try{return a&&a.length>0?r=await this.sqlite.query({database:this.dbName,statement:t,values:a,readonly:this.readonly,isSQL92:!0}):r=await this.sqlite.query({database:this.dbName,statement:t,values:[],readonly:this.readonly,isSQL92:s}),r=await this.reorderRows(r),Promise.resolve(r)}catch(n){return Promise.reject(n)}}async run(t,a,s=!0,r="no",n=!0){let o;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(a&&a.length>0?o=await this.sqlite.run({database:this.dbName,statement:t,values:a,transaction:s,readonly:!1,returnMode:r,isSQL92:!0}):o=await this.sqlite.run({database:this.dbName,statement:t,values:[],transaction:s,readonly:!1,returnMode:r,isSQL92:n}),o.changes=await this.reorderRows(o.changes),Promise.resolve(o))}catch(c){return Promise.reject(c)}}async executeSet(t,a=!0,s="no",r=!0){let n;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(n=await this.sqlite.executeSet({database:this.dbName,set:t,transaction:a,readonly:!1,returnMode:s,isSQL92:r}),n.changes=await this.reorderRows(n.changes),Promise.resolve(n))}catch(o){return Promise.reject(o)}}async isExists(){try{const t=await this.sqlite.isDBExists({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTable(t){try{const a=await this.sqlite.isTableExists({database:this.dbName,table:t,readonly:this.readonly});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isDBOpen(){try{const t=await this.sqlite.isDBOpen({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async delete(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteDatabase({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async createSyncTable(){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const t=await this.sqlite.createSyncTable({database:this.dbName,readonly:!1});return Promise.resolve(t)}}catch(t){return Promise.reject(t)}}async setSyncDate(t){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.setSyncDate({database:this.dbName,syncdate:t,readonly:!1}),Promise.resolve())}catch(a){return Promise.reject(a)}}async getSyncDate(){try{const t=await this.sqlite.getSyncDate({database:this.dbName,readonly:this.readonly});let a="";return t.syncDate>0&&(a=new Date(t.syncDate*1e3).toISOString()),Promise.resolve(a)}catch(t){return Promise.reject(t)}}async exportToJson(t,a=!1){try{const s=await this.sqlite.exportToJson({database:this.dbName,jsonexportmode:t,readonly:this.readonly,encrypted:a});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async deleteExportedRows(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteExportedRows({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async executeTransaction(t,a=!0){let s=0,r=!1;if(this.readonly)return Promise.reject("not allowed in read-only mode");if(await this.sqlite.beginTransaction({database:this.dbName}),r=await this.sqlite.isTransactionActive({database:this.dbName}),!r)return Promise.reject("After Begin Transaction, no transaction active");try{for(const c of t){if(typeof c!="object"||!("statement"in c))throw new Error("Error a task.statement must be provided");if("values"in c&&c.values&&c.values.length>0){const i=c.statement.toUpperCase().includes("RETURNING")?"all":"no",l=await this.sqlite.run({database:this.dbName,statement:c.statement,values:c.values,transaction:!1,readonly:!1,returnMode:i,isSQL92:a});if(l.changes.changes<0)throw new Error("Error in transaction method run ");s+=l.changes.changes}else{const i=await this.sqlite.execute({database:this.dbName,statements:c.statement,transaction:!1,readonly:!1});if(i.changes.changes<0)throw new Error("Error in transaction method execute ");s+=i.changes.changes}}const n=await this.sqlite.commitTransaction({database:this.dbName});s+=n.changes.changes;const o={changes:{changes:s}};return Promise.resolve(o)}catch(n){const o=n.message?n.message:n;return await this.sqlite.rollbackTransaction({database:this.dbName}),Promise.reject(o)}}async reorderRows(t){const a=t;if(t?.values&&typeof t.values[0]=="object"&&Object.keys(t.values[0]).includes("ios_columns")){const s=t.values[0].ios_columns,r=[];for(let n=1;n<t.values.length;n++){const o=t.values[n],c={};for(const i of s)c[i]=o[i];r.push(c)}a.values=r}return Promise.resolve(a)}}const It=se("CapacitorSQLite",{web:()=>Oe(()=>import("./web-BYbiGXDv.js"),[]).then(e=>new e.CapacitorSQLiteWeb),electron:()=>window.CapacitorCustomPlatform.plugins.CapacitorSQLite});function qt(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}const Ft="laba101_offline",ge="fresh_start_reset_v1",Ut=new Pt(It);let ue=null;const j=[{id:1,name:"Laba101 Admin",email:"admin@laba101.test",password:"password",role:"admin",branch:"Main Store"},{id:2,name:"Gensan Staff",email:"staff@laba101.gensan",password:"password",role:"staff",branch:"Gensan Branch"}],be=[],X=[M(1,"Drop-off","Wash, dry and fold.","Drop-Off","order",185,8,40,["Wash","Dry","Fold"],0,24),M(2,"Full Service","Wash, dry, fold, detergent and Fabcon.","Full Service","order",200,8,40,["Wash","Dry","Fold","Detergent","Fabcon"],0,24),M(3,"Self Service Wash","Max of 8kg per load.","Self Service","order",60,8,null,["Wash"],0,1),M(4,"Self Service Dry","Regular time: 40 mins drying time.","Self Service","order",70,8,40,["Dry"],0,1),M(5,"Dry Only","Standard drying rate.","Dry Only","order",70,8,40,["Dry"],0,1),M(6,"Additional Dry 10 mins","Additional drying time.","Add-on","addon",30,8,10,["Dry"],0,1),M(7,"Additional Dry 20 mins","Additional drying time.","Add-on","addon",50,8,20,["Dry"],0,1),M(8,"Additional Dry 40 mins","Additional drying time.","Add-on","addon",70,8,40,["Dry"],0,1),M(9,"Additional Zonrox","Extra Zonrox bleach add-on per load.","Add-on","addon",25,0,null,["Zonrox"],0,0),M(10,"Additional Fabcon","Extra Fabcon fabric conditioner add-on per load.","Add-on","addon",25,0,null,["Fabcon"],0,0),M(11,"Comforter / Bulky Load","Comforter 4kg max per load. Thin blankets, bedsheets, bath towels, pillow cases and curtains: 6kg max per load.","Comforter","order",200,8,40,["Wash","Dry","Fold"],0,24)],G=[{id:1,name:"Regular Clothes",maxKg:8,additionalFee:0,isActive:1},{id:2,name:"Comforter",maxKg:4,additionalFee:0,isActive:1},{id:3,name:"Thin Blankets",maxKg:6,additionalFee:0,isActive:1},{id:4,name:"Bedsheets",maxKg:6,additionalFee:0,isActive:1},{id:5,name:"Bath Towels",maxKg:6,additionalFee:0,isActive:1},{id:6,name:"Curtains",maxKg:6,additionalFee:0,isActive:1}];function We(e,t){const a=T(e,[]),s=new Map(a.map(n=>[n.id,n])),r=t.map(n=>{const o=s.get(n.id);return o?{...n,...o,isActive:o.isActive??n.isActive}:n});(a.length!==r.length||r.some((n,o)=>n.id!==a[o]?.id||JSON.stringify(n)!==JSON.stringify(a[o])))&&E(e,r)}async function kt(){We("services",X),We("item_categories",G)}async function we(e){for(const t of X)((await e.query("SELECT id FROM laundry_services WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive,t.id]):await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive]);for(const t of G)((await e.query("SELECT id FROM item_categories WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.maxKg,t.additionalFee,t.isActive,t.id]):await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[t.id,t.name,t.maxKg,t.additionalFee,t.isActive])}const ee=[],Ee=[],re=[],ie=[],te=[],W=[...[1,2,3,4].map(e=>({id:e,machineName:`Washer ${e}`,machineType:"washer",status:"available",branch:"Main Store"})),...[1,2,3,4].map(e=>({id:e+4,machineName:`Dryer ${e}`,machineType:"dryer",status:"available",branch:"Main Store"}))],ae=[{key:"branch",value:"Main Store"},{key:"fold_rate",value:"5"},{key:"report_email",value:"admin@laba101.test"}];function M(e,t,a,s,r,n,o,c,i,l,m){return{id:e,name:t,description:a,category:s,serviceType:r,price:n,maxKg:o,dryingMinutes:c,includes:i,additionalCharge:l,turnaroundHours:m,isActive:1}}function F(e){return`laba101-mobile-${e}`}function T(e,t){const a=localStorage.getItem(F(e));if(!a)return structuredClone(t);try{return JSON.parse(a)}catch{return structuredClone(t)}}function E(e,t){localStorage.setItem(F(e),JSON.stringify(t))}function U(e){return e.reduce((t,a)=>Math.max(t,a.id),0)+1}function V(){return new Date().toISOString()}function Re(e=new Date){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${s}`}function Mt(){return Re().slice(2).replaceAll("-","")}function Y(e,t){if(!e)return t;try{return JSON.parse(e)}catch{return t}}async function L(){return ue||(ue=await Ut.createConnection(Ft,!1,"no-encryption",1,!1),await ue.open()),ue}async function D(e,t,a,s){((await e.query(`PRAGMA table_info(${t})`)).values??[]).some(o=>o.name===a)||await e.execute(`ALTER TABLE ${t} ADD COLUMN ${a} ${s}`)}function Bt(){const e=T("staff",j),t=new Map(e.map(s=>[s.id,s]));let a=!1;for(const s of j){const r=t.get(s.id);if(!r){t.set(s.id,{...s,isActive:1}),a=!0;continue}const n={...r,name:s.name,email:s.email,password:s.password,role:s.role,branch:s.branch,isActive:1};JSON.stringify(n)!==JSON.stringify(r)&&(t.set(s.id,n),a=!0)}a&&E("staff",Array.from(t.values()).sort((s,r)=>s.id-r.id))}async function _t(){localStorage.getItem(F(ge))||(E("staff",j),E("customers",[]),E("orders",[]),E("payments",[]),E("fold_logs",[]),E("expenses",[]),E("sales",[]),localStorage.getItem(F("services"))||E("services",X),localStorage.getItem(F("item_categories"))||E("item_categories",G),localStorage.getItem(F("machines"))||E("machines",W),localStorage.getItem(F("subcleanings"))||E("subcleanings",[]),localStorage.getItem(F("settings"))||E("settings",ae),localStorage.removeItem("laba101-mobile-session"),E(ge,!0))}async function tt(e){for(const t of j){if(((await e.query("SELECT id FROM staff WHERE id = ?",[t.id])).values??[]).length>0){await e.run("UPDATE staff SET name = ?, email = ?, password = ?, role = ?, branch = ?, isActive = 1 WHERE id = ?",[t.name,t.email,t.password,t.role,t.branch,t.id]);continue}await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.email,t.password,t.role,t.branch,1])}}async function jt(e){if(!(((await e.query("SELECT COUNT(*) as count FROM machines")).values?.[0]?.count??0)>0))for(const a of W)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[a.id,a.machineName,a.machineType,a.status,a.branch])}async function Ht(e){for(const t of ae)await e.run("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)",[t.key,t.value])}async function Wt(e){((await e.query("SELECT value FROM settings WHERE key = ?",[ge])).values??[]).length>0||(await e.execute(`
    DELETE FROM payments;
    DELETE FROM orders;
    DELETE FROM customers;
    DELETE FROM fold_logs;
    DELETE FROM disbursement_expenses;
    DELETE FROM daily_sales;
    DELETE FROM revolving_history;
    DELETE FROM staff WHERE id NOT IN (1, 2);
  `),await tt(e),await jt(e),await Ht(e),await e.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",[ge,V()]),localStorage.removeItem("laba101-mobile-session"))}async function Xt(){if(!w.isNativePlatform()){await _t(),!localStorage.getItem(F("seeded_v4"))&&!localStorage.getItem(F("services"))&&!localStorage.getItem(F("staff"))&&(E("staff",j),E("customers",be),E("services",X),E("item_categories",G),E("orders",ee),E("payments",Ee),E("fold_logs",[]),E("expenses",re),E("sales",ie),E("revolving_history",te),E("machines",W),E("subcleanings",[]),E("settings",ae),E("seeded_v4",!0)),await kt(),Bt(),localStorage.getItem(F("seeded_v4"))||E("seeded_v4",!0);return}const e=await L();if(await e.execute(`
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
    CREATE TABLE IF NOT EXISTS revolving_history (id INTEGER PRIMARY KEY AUTOINCREMENT, revolvingNumber TEXT NOT NULL, name TEXT NOT NULL, amount REAL NOT NULL, category TEXT NOT NULL, description TEXT, type TEXT NOT NULL, createdAt TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS machines (id INTEGER PRIMARY KEY AUTOINCREMENT, machineName TEXT NOT NULL, machineType TEXT NOT NULL, status TEXT NOT NULL, branch TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS subcleanings (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL, machineIds TEXT NOT NULL, machineNames TEXT NOT NULL, cleaningStatus TEXT NOT NULL, notes TEXT, branch TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY NOT NULL, value TEXT NOT NULL);
  `),await D(e,"staff","email","TEXT"),await D(e,"staff","password","TEXT"),await D(e,"staff","role","TEXT"),await D(e,"staff","isActive","INTEGER NOT NULL DEFAULT 1"),await e.run('UPDATE staff SET password = ? WHERE password IS NULL OR password = ""',["password"]),await e.run('UPDATE staff SET role = ? WHERE role IS NULL OR role = ""',["staff"]),await D(e,"orders","customerId","INTEGER NOT NULL DEFAULT 0"),await D(e,"orders","phone","TEXT"),await D(e,"orders","serviceId","INTEGER NOT NULL DEFAULT 0"),await D(e,"orders","itemCategoryId","INTEGER NOT NULL DEFAULT 0"),await D(e,"orders","itemCategory",'TEXT NOT NULL DEFAULT "Regular Clothes"'),await D(e,"orders","workflowCompleted","TEXT"),await D(e,"orders","weightKg","REAL NOT NULL DEFAULT 0"),await D(e,"orders","price","REAL NOT NULL DEFAULT 0"),await D(e,"orders","additionalCharge","REAL NOT NULL DEFAULT 0"),await D(e,"orders","extraServiceAmount","REAL NOT NULL DEFAULT 0"),await D(e,"orders","totalAmount","REAL NOT NULL DEFAULT 0"),await D(e,"orders","paidAmount","REAL NOT NULL DEFAULT 0"),await D(e,"orders","extras","TEXT"),await D(e,"orders","notes","TEXT"),await D(e,"orders","dueAt","TEXT"),await D(e,"orders","createdAt",'TEXT NOT NULL DEFAULT ""'),await D(e,"daily_sales","saleNumber","TEXT"),await D(e,"daily_sales","status","TEXT"),await D(e,"daily_sales","endorsedTo","TEXT"),await D(e,"daily_sales","statusUpdatedAt","TEXT"),((await e.query("SELECT COUNT(*) as count FROM staff")).values?.[0]?.count??0)===0){for(const a of j)await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.name,a.email,a.password,a.role,a.branch,1]);for(const a of be)await e.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[a.id,a.name,a.phone,a.address]);for(const a of X)await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[a.id,a.name,a.description,a.category,a.serviceType,a.price,a.maxKg,a.dryingMinutes,JSON.stringify(a.includes),a.additionalCharge,a.turnaroundHours,a.isActive]);for(const a of G)await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[a.id,a.name,a.maxKg,a.additionalFee,a.isActive]);for(const a of ee)await at(e,a);for(const a of Ee)await e.run("INSERT INTO payments (id, orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.orderId,a.amount,a.method,a.reference,a.receivedAt,a.branch]);for(const a of re)await e.run("INSERT INTO disbursement_expenses (id, expenseDate, number, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.expenseDate,a.number,a.name,a.category,a.description,a.amount]);for(const a of ie)await e.run("INSERT INTO daily_sales (id, saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.saleDate,a.saleNumber,a.cashAmount,a.gcashAmount,a.totalAmount,a.notes]);for(const a of te)await e.run("INSERT INTO revolving_history (id, revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[a.id,a.revolvingNumber,a.name,a.amount,a.category,a.description,a.type,a.createdAt]);for(const a of W)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[a.id,a.machineName,a.machineType,a.status,a.branch]);for(const a of ae)await e.run("INSERT INTO settings (key, value) VALUES (?, ?)",[a.key,a.value])}await we(e),await tt(e),await Wt(e)}async function at(e,t){await e.run("INSERT INTO orders (id, ticket, customerId, customer, phone, serviceId, service, itemCategoryId, itemCategory, branch, status, workflowCompleted, weightKg, price, additionalCharge, extraServiceAmount, totalAmount, paidAmount, extras, notes, foldedBy, dueAt, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.ticket,t.customerId,t.customer,t.phone,t.serviceId,t.service,t.itemCategoryId,t.itemCategory,t.branch,t.status,JSON.stringify(t.workflowCompleted),t.weightKg,t.price,t.additionalCharge,t.extraServiceAmount,t.totalAmount,t.paidAmount,JSON.stringify(t.extras),t.notes,t.foldedBy,t.dueAt,t.createdAt])}function Kt(e){const t=Number(e.paidAmount??0),a=Number(e.totalAmount??0),s=Number(e.foldedBy);return{id:Number(e.id),ticket:String(e.ticket),customerId:Number(e.customerId),customer:String(e.customer),phone:e.phone?String(e.phone):null,serviceId:Number(e.serviceId),service:String(e.service),itemCategoryId:Number(e.itemCategoryId),itemCategory:String(e.itemCategory),branch:String(e.branch),status:String(e.status),workflowCompleted:Y(e.workflowCompleted,[]),weightKg:Number(e.weightKg),price:Number(e.price),additionalCharge:Number(e.additionalCharge),extraServiceAmount:Number(e.extraServiceAmount),totalAmount:a,paidAmount:t,balance:Number((a-t).toFixed(2)),extras:Y(e.extras,[]),notes:e.notes?String(e.notes):null,foldedBy:Number.isFinite(s)&&s>0?s:null,foldedByName:e.foldedByName?String(e.foldedByName):null,dueAt:String(e.dueAt),createdAt:String(e.createdAt)}}async function Gt(){await Xt()}async function Te(){return(await Pe()).find(t=>t.key==="branch")?.value??"Main Store"}async function Vt(){const e=await Pe();return Number(e.find(t=>t.key==="fold_rate")?.value??"5")}async function st(e){return(await Pe()).find(a=>a.key===e)?.value}async function Pe(){return w.isNativePlatform()?(await(await L()).query("SELECT key, value FROM settings ORDER BY key")).values??[]:T("settings",ae)}async function fe(e,t){if(!w.isNativePlatform()){const s=T("settings",ae).filter(r=>r.key!==e);s.push({key:e,value:t}),E("settings",s);return}await(await L()).run("REPLACE INTO settings (key, value) VALUES (?, ?)",[e,t])}async function Yt(e){return w.isNativePlatform()?(await(await L()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff WHERE branch = ? ORDER BY name ASC',[e])).values??[]:T("staff",j).filter(s=>s.branch===e)}async function nt(){return w.isNativePlatform()?(await(await L()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff ORDER BY name ASC')).values??[]:T("staff",j)}async function rt(e,t){const a=e.trim().toLowerCase();return(await nt()).find(r=>r.email.toLowerCase()===a&&r.password===t&&r.isActive!==0)??null}async function Jt(e){if(!w.isNativePlatform()){const a=T("staff",j);a.unshift({id:U(a),...e,isActive:1}),E("staff",a);return}await(await L()).run("INSERT INTO staff (name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?)",[e.name,e.email,e.password,e.role,e.branch,1])}async function Xe(e,t){if(!w.isNativePlatform()){const n=T("staff",j),o=n.find(c=>c.id===e);o&&(Object.assign(o,t),E("staff",n));return}const a=await L(),s=[],r=[];for(const[n,o]of Object.entries(t))n!=="id"&&(s.push(`${n} = ?`),r.push(o));s.length&&(r.push(e),await a.run(`UPDATE staff SET ${s.join(", ")} WHERE id = ?`,r))}async function Qt(){return w.isNativePlatform()?(await(await L()).query("SELECT id, name, phone, address FROM customers ORDER BY name ASC")).values??[]:T("customers",be).sort((a,s)=>a.name.localeCompare(s.name))}async function zt(e){if(!w.isNativePlatform()){const r=T("customers",be),n=e.id?r.find(c=>c.id===e.id):r.find(c=>c.name.toLowerCase()===e.name.toLowerCase()&&(e.phone?c.phone===e.phone:!0));if(n)return n.name=e.name,n.phone=e.phone??n.phone,n.address=e.address??n.address,E("customers",r),n;const o={id:U(r),name:e.name,phone:e.phone??null,address:e.address??null};return r.push(o),E("customers",r),o}const t=await L();if(e.id)return await t.run("UPDATE customers SET name = ?, phone = ?, address = ? WHERE id = ?",[e.name,e.phone??null,e.address??null,e.id]),{id:e.id,name:e.name,phone:e.phone??null,address:e.address??null};const a=await t.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM customers"),s=Number((a.values?.[0]).id);return await t.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[s,e.name,e.phone??null,e.address??null]),{id:s,name:e.name,phone:e.phone??null,address:e.address??null}}async function Ie(e){if(!w.isNativePlatform())return T("services",X).filter(s=>!0);const t=await L(),a=await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[]);return(a.values??[]).length===0?(await we(t),((await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[])).values??[]).map(r=>({...r,includes:Y(r.includes,[])}))):(a.values??[]).map(s=>({...s,includes:Y(s.includes,[])}))}async function Zt(){if(!w.isNativePlatform())return T("services",X);const e=await L(),t=await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC");return(t.values??[]).length===0?(await we(e),((await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC")).values??[]).map(s=>({...s,includes:Y(s.includes,[])}))):(t.values??[]).map(a=>({...a,includes:Y(a.includes,[])}))}async function Ke(e){if(!w.isNativePlatform()){const a=T("services",X),s=e.id?a.find(r=>r.id===e.id):null;s?Object.assign(s,e):a.unshift({...e,id:U(a)}),E("services",a);return}const t=await L();e.id?await t.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = ? WHERE id = ?",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive,e.id]):await t.run("INSERT INTO laundry_services (name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive])}async function it(){if(!w.isNativePlatform())return T("item_categories",G).filter(a=>a.isActive);const e=await L(),t=await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC");return(t.values??[]).length===0?(await we(e),(await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC")).values??[]):t.values??[]}async function ea(e){if(!w.isNativePlatform()){const a=T("item_categories",G),s=e.id?a.find(r=>r.id===e.id):null;s?Object.assign(s,e):a.unshift({...e,id:U(a)}),E("item_categories",a);return}const t=await L();e.id?await t.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = ? WHERE id = ?",[e.name,e.maxKg,e.additionalFee,e.isActive,e.id]):await t.run("INSERT INTO item_categories (name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?)",[e.name,e.maxKg,e.additionalFee,e.isActive])}function xe(e,t,a,s){const r=Number(t.maxKg),n=Math.max(0,a-r),o=0,c=s.map(m=>{const v=Math.max(0,Number(m.quantity??1)),f=Number(m.price);return{id:m.id,name:qt(m.name),price:f,quantity:v,total:Number((f*v).toFixed(2))}}).filter(m=>m.quantity>0),i=c.reduce((m,v)=>m+v.total,0),l=Number((Number(e.price)+o+i).toFixed(2));return{price:Number(e.price),additionalCharge:Number(o.toFixed(2)),extraServiceAmount:Number(i.toFixed(2)),totalAmount:l,allowedKg:r,extraKg:Number(n.toFixed(2)),warning:n>0?`Weight exceeds the ${t.name} load limit of ${r.toFixed(2)} kg.`:null,extras:c}}function ot(e,t){const a=t.find(n=>n.id===e.serviceId),s=a?.includes??[],r=[{key:"received",label:"Received"}];return s.includes("Wash")&&r.push({key:"wash",label:"Wash"}),e.extras.length&&r.push({key:"extras",label:"Extra services"}),(s.includes("Dry")||(a?.dryingMinutes??0)>0)&&r.push({key:"dry",label:"Dry"}),s.includes("Fold")&&r.push({key:"fold",label:"Fold"}),r.push({key:"ready",label:"Ready"},{key:"claimed",label:"Claimed"}),r}function ta(e){return e.includes("claimed")?"claimed":e.includes("ready")?"ready":e.includes("dry")?"drying":e.includes("extras")||e.includes("wash")?"washing":"received"}async function Ne(e){return w.isNativePlatform()?((await(await L()).query("SELECT o.*, s.name as foldedByName FROM orders o LEFT JOIN staff s ON s.id = o.foldedBy WHERE o.branch = ? ORDER BY o.id DESC",[e])).values??[]).map(s=>Kt(s)):T("orders",ee).filter(s=>s.branch===e).map(s=>({...s,balance:Number((s.totalAmount-s.paidAmount).toFixed(2))}))}async function aa(e){const[t,a]=await Promise.all([Ie(),it()]),s=t.find(y=>y.id===e.serviceId),r=a.find(y=>y.id===e.itemCategoryId)??a.find(y=>y.name.toLowerCase()===(s?.category??"").toLowerCase())??a.find(y=>y.name==="Regular Clothes")??a[0];if(!s||!r)throw new Error("Service or item category is missing.");const n=e.addonQuantities??Object.fromEntries((e.addonIds??[]).map(y=>[y,1])),o=t.filter(y=>y.serviceType==="addon"&&Number(n[y.id]??0)>0).map(y=>({...y,quantity:Number(n[y.id]??0)})),c=e.weightKg??Math.max(1,Number(s.maxKg||r.maxKg||1)),i=xe(s,r,c,o);if(i.extraKg>0)throw new Error(i.warning??"Weight exceeds the allowed limit.");const l=await zt({id:e.customerId||void 0,name:e.customerName,phone:e.customerPhone??null}),m=Math.max(0,e.paidAmount),v=Math.min(i.totalAmount,m),f={ticket:await sa(),customerId:l.id,customer:l.name,phone:l.phone,serviceId:s.id,service:s.name,itemCategoryId:r.id,itemCategory:r.name,branch:e.branch,status:"received",workflowCompleted:["received"],weightKg:c,price:i.price,additionalCharge:i.additionalCharge,extraServiceAmount:i.extraServiceAmount,totalAmount:i.totalAmount,paidAmount:v,balance:Number((i.totalAmount-v).toFixed(2)),extras:i.extras,notes:[e.notes,i.warning].filter(Boolean).join(`
`)||null,foldedBy:null,foldedByName:null,dueAt:new Date(Date.now()+s.turnaroundHours*60*60*1e3).toISOString(),createdAt:V()};if(!w.isNativePlatform()){const y=T("orders",ee),A={...f,id:U(y)};return y.unshift(A),E("orders",y),m>0&&await ct(A.id,{amount:m,method:e.paymentMethod,reference:e.paymentReference??null}),A}const p=await L(),h=await p.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM orders"),b={...f,id:Number((h.values?.[0]).id)};return await at(p,b),m>0&&await p.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[b.id,m,e.paymentMethod,e.paymentReference??null,V(),e.branch]),b}async function sa(){const e=`LB${Mt()}`,t=await Te(),s=(await Ne(t)).filter(n=>n.ticket.startsWith(e)).sort((n,o)=>o.ticket.localeCompare(n.ticket))[0],r=s?Number(s.ticket.slice(-3))+1:1;return`${e}-${String(r).padStart(3,"0")}`}async function na(e,t){const a=await Te(),[s,r]=await Promise.all([Ne(a),Ie()]),n=s.find(l=>l.id===e);if(!n)return;const c=ot(n,r).map(l=>l.key).find(l=>!n.workflowCompleted.includes(l));if(!c)return;if(n.workflowCompleted=[...n.workflowCompleted,c],n.status=ta(n.workflowCompleted),c==="fold"&&t&&(n.foldedBy=t),!w.isNativePlatform()){const l=T("orders",ee),m=l.find(v=>v.id===n.id);m&&Object.assign(m,n),E("orders",l);return}await(await L()).run("UPDATE orders SET workflowCompleted = ?, status = ?, foldedBy = ? WHERE id = ?",[JSON.stringify(n.workflowCompleted),n.status,n.foldedBy,n.id])}async function ct(e,t){const a=await Te();if(!(await Ne(a)).find(c=>c.id===e))return;const n=Math.max(0,t.amount);if(n<=0)return;if(!w.isNativePlatform()){const c=T("payments",Ee);c.unshift({id:U(c),orderId:e,amount:n,method:t.method,reference:t.reference??null,receivedAt:V(),branch:a}),E("payments",c);const i=T("orders",ee),l=i.find(m=>m.id===e);l&&(l.paidAmount=Math.min(l.totalAmount,Number((l.paidAmount+n).toFixed(2)))),E("orders",i);return}const o=await L();await o.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[e,n,t.method,t.reference??null,V(),a]),await o.run("UPDATE orders SET paidAmount = MIN(totalAmount, paidAmount + ?) WHERE id = ?",[n,e])}async function ra(e){return w.isNativePlatform()?(await(await L()).query("SELECT id, orderId, amount, method, reference, receivedAt, branch FROM payments  ORDER BY receivedAt DESC",[])).values??[]:T("payments",Ee).filter(s=>!0)}async function ia(){return w.isNativePlatform()?(await(await L()).query("SELECT id, orderTicket, staffName, foldCount, rate, total, createdAt FROM fold_logs ORDER BY id DESC")).values??[]:T("fold_logs",[])}async function oa(e){const t=Number((e.foldCount*e.rate).toFixed(2));if(!w.isNativePlatform()){const s=T("fold_logs",[]);s.unshift({id:Date.now(),...e,total:t,createdAt:V()}),E("fold_logs",s);return}await(await L()).run("INSERT INTO fold_logs (orderTicket, staffName, foldCount, rate, total, createdAt) VALUES (?, ?, ?, ?, ?, ?)",[e.orderTicket,e.staffName,e.foldCount,e.rate,t,V()])}async function ca(){return w.isNativePlatform()?(await(await L()).query("SELECT id, expenseDate, number, name, category, description, amount FROM disbursement_expenses ORDER BY expenseDate DESC, id DESC")).values??[]:T("expenses",re)}function Le(e){const t=/^DISB-(\d+)$/i.exec(String(e??"").trim());return t?Number(t[1]):0}function Ge(e){const t=/^REV-(\d+)$/i.exec(String(e??"").trim());return t?Number(t[1]):0}async function la(){let e=0;if(!w.isNativePlatform()){const r=T("expenses",re),n=T("revolving_history",te);for(const o of r)e=Math.max(e,Le(o.number));for(const o of n)o.type==="disbursement"&&(e=Math.max(e,Le(o.revolvingNumber)));return e}const t=await L(),a=await t.query("SELECT number FROM disbursement_expenses"),s=await t.query("SELECT revolvingNumber as number FROM revolving_history WHERE type = 'disbursement'");for(const r of[...a.values??[],...s.values??[]])e=Math.max(e,Le(String(r.number)));return e}async function lt(){const e=await la()+1;return`DISB-${String(e).padStart(2,"0")}`}async function da(){let e=0;if(!w.isNativePlatform()){const s=T("revolving_history",te);for(const r of s)r.type==="add"&&(e=Math.max(e,Ge(r.revolvingNumber)));return`REV-${String(e+1).padStart(2,"0")}`}const a=await(await L()).query("SELECT revolvingNumber FROM revolving_history WHERE type = 'add'");for(const s of a.values??[])e=Math.max(e,Ge(String(s.revolvingNumber)));return`REV-${String(e+1).padStart(2,"0")}`}async function dt(e){if(!w.isNativePlatform()){const a=T("expenses",re),s=U(a);a.unshift({id:s,expenseDate:e.expenseDate,number:e.number,name:e.name,category:e.category,description:e.description||null,amount:e.amount}),E("expenses",a);return}await(await L()).run("INSERT INTO disbursement_expenses (expenseDate, number, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?)",[e.expenseDate,e.number,e.name,e.category,e.description||null,e.amount])}async function ua(e){const t=await lt();await dt({expenseDate:e.expenseDate,number:t,name:e.name,category:e.category,description:e.description,amount:e.amount})}async function ma(){return w.isNativePlatform()?(await(await L()).query('SELECT id, saleDate, COALESCE(saleNumber, "") as saleNumber, cashAmount, gcashAmount, totalAmount, notes, status, endorsedTo, statusUpdatedAt FROM daily_sales ORDER BY saleDate DESC, id DESC')).values??[]:T("sales",ie)}async function va(e){const t=Number((e.cashAmount+e.gcashAmount).toFixed(2));if(!w.isNativePlatform()){const n=T("sales",ie),o=n.find(c=>c.saleDate===e.saleDate);if(o)Object.assign(o,{cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null});else{const c=U(n);n.unshift({id:c,saleDate:e.saleDate,saleNumber:`SALE-${String(c).padStart(2,"0")}`,cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null})}E("sales",n);return}const a=await L(),r=(await a.query("SELECT id, saleNumber FROM daily_sales WHERE saleDate = ?",[e.saleDate])).values?.[0];if(r)await a.run("UPDATE daily_sales SET cashAmount = ?, gcashAmount = ?, totalAmount = ?, notes = ? WHERE id = ?",[e.cashAmount,e.gcashAmount,t,e.notes||null,r.id]);else{const n=await a.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM daily_sales"),o=Number((n.values?.[0]).id);await a.run("INSERT INTO daily_sales (saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?)",[e.saleDate,`SALE-${String(o).padStart(2,"0")}`,e.cashAmount,e.gcashAmount,t,e.notes||null])}}async function Ve(e,t,a=null,s){if(!w.isNativePlatform()){const n=T("sales",ie),o=n.find(c=>c.id===e);o&&(o.status=t,o.endorsedTo=a,o.statusUpdatedAt=s,E("sales",n));return}await(await L()).run("UPDATE daily_sales SET status = ?, endorsedTo = ?, statusUpdatedAt = ? WHERE id = ?",[t,a,s,e])}async function pa(){return w.isNativePlatform()?(await(await L()).query("SELECT id, revolvingNumber, name, amount, category, description, type, createdAt FROM revolving_history ORDER BY createdAt DESC, id DESC")).values??[]:T("revolving_history",te).sort((a,s)=>s.createdAt.localeCompare(a.createdAt))}async function Ye(e){const t=e.type==="disbursement"?await lt():await da();if(e.type==="disbursement"){const s=e.expenseDate??e.createdAt.slice(0,10);await dt({expenseDate:s,number:t,name:e.name,category:e.category,description:e.description??"",amount:e.amount})}if(!w.isNativePlatform()){const s=T("revolving_history",te),r=U(s);s.unshift({id:r,revolvingNumber:t,...e}),E("revolving_history",s);return}await(await L()).run("INSERT INTO revolving_history (revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)",[t,e.name,e.amount,e.category,e.description||null,e.type,e.createdAt])}async function ut(e){return w.isNativePlatform()?(await(await L()).query("SELECT id, machineName, machineType, status, branch FROM machines WHERE branch = ? ORDER BY machineType, machineName",[e])).values??[]:T("machines",W).filter(s=>s.branch===e)}async function fa(e){if(!w.isNativePlatform()){const a=T("machines",W);a.unshift({id:U(a),...e}),E("machines",a);return}await(await L()).run("INSERT INTO machines (machineName, machineType, status, branch) VALUES (?, ?, ?, ?)",[e.machineName,e.machineType,e.status,e.branch])}async function ha(e,t){if(!w.isNativePlatform()){const s=T("machines",W),r=s.find(n=>n.id===e);r&&(r.status=t,E("machines",s));return}await(await L()).run("UPDATE machines SET status = ? WHERE id = ?",[t,e])}async function ya(e){return w.isNativePlatform()?((await(await L()).query("SELECT id, date, machineIds, machineNames, cleaningStatus, notes, branch FROM subcleanings WHERE branch = ? ORDER BY date DESC, id DESC",[e])).values??[]).map(s=>({...s,machineIds:Y(s.machineIds,[])})):T("subcleanings",[]).filter(s=>s.branch===e)}async function ga(e){const a=(await ut(e.branch)).filter(n=>e.machineIds.includes(n.id)).map(n=>n.machineName).join(", ");if(!w.isNativePlatform()){const n=T("subcleanings",[]);n.unshift({id:U(n),date:e.date,machineIds:e.machineIds,machineNames:a,cleaningStatus:e.cleaningStatus,notes:e.notes||null,branch:e.branch}),E("subcleanings",n);const o=T("machines",W);o.forEach(c=>{e.machineIds.includes(c.id)&&(c.status=e.cleaningStatus==="completed"?"available":"under_cleaning")}),E("machines",o);return}const s=await L();await s.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, notes, branch) VALUES (?, ?, ?, ?, ?, ?)",[e.date,JSON.stringify(e.machineIds),a,e.cleaningStatus,e.notes||null,e.branch]);const r=e.cleaningStatus==="completed"?"available":"under_cleaning";for(const n of e.machineIds)await s.run("UPDATE machines SET status = ? WHERE id = ?",[r,n])}async function ba(e,t){if(!w.isNativePlatform()){const o=T("machines",W),c=o.find(m=>m.id===e);c&&(c.status="available"),E("machines",o);const i=T("subcleanings",[]),l=Re();i.unshift({id:U(i),date:l,machineIds:[e],machineNames:c?.machineName??"",cleaningStatus:"completed",notes:null,branch:t}),E("subcleanings",i);return}const a=await L(),r=(await a.query("SELECT machineName FROM machines WHERE id = ?",[e])).values?.[0]?.machineName??"";await a.run("UPDATE machines SET status = ? WHERE id = ?",["available",e]);const n=Re();await a.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, notes, branch) VALUES (?, ?, ?, ?, ?, ?)",[n,JSON.stringify([e]),r,"completed",null,t])}const qe=document.querySelector("#app");if(!qe)throw new Error("App root not found");let me;const Fe={dashboard:"Dashboard",pos:"POS",orders:"Orders",archived:"Archived Order",customers:"Customers",pricing:"Pricing Services",disbursements:"Daily Report",reports:"Reports",inventory:"Inventory",maintenance:"Maintenance",staff:"Staff",revolving:"Revolving Fund",settings:"Settings"},u={tab:"dashboard",receiptOrderId:0,currentUser:null,loginError:"",sidebarOpen:!1,dailyReportTab:"expenses",maintenanceTab:"cleaning",customerSearch:"",orderSearch:"",orderDateFilter:"",archivedOrderSearch:"",reportPreview:null,endorseModalOpen:!1,endorseSaleId:0,endorseSaleDate:"",revolvingModalOpen:!1,revolvingSaleId:0,addFundModalOpen:!1,disbursementModalOpen:!1,revolvingHistoryFrom:"",revolvingHistoryTo:""},Ea=["Wash","Dry","Fold","Detergent","Fabcon","Zonrox"],oe="laba101-mobile-session";function C(e){return new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(e||0)}function d(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ce(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}function mt(e,t){return Number((e-t).toFixed(2))}function vt(e,t,a,s=0){const r=t.filter(o=>B(o.createdAt)===e).reduce((o,c)=>o+c.paidAmount,0),n=a.filter(o=>o.expenseDate===e).reduce((o,c)=>o+c.amount,0);return mt(r+s,n)}function Sa(e){const t=new Map;return e.filter(a=>a.workflowCompleted.includes("fold")&&a.foldedByName).forEach(a=>{const s=a.foldedByName,r=t.get(s)??{staffName:s,folds:0};r.folds+=1,t.set(s,r)}),Array.from(t.values())}function le(e=new Date){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${s}`}function _(){return le()}function B(e){return le(new Date(e))}function ne(e){return new Intl.DateTimeFormat("en-PH",{dateStyle:"medium",timeStyle:"short"}).format(new Date(e))}function wa(e){const t=new Date(e),a=new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric",year:"numeric"}).format(t),s=new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",hour12:!0}).format(t);return`<div class="datetime-stack"><strong>${d(a)}</strong><span class="meta">${d(s)}</span></div>`}function Ta(e){return e?.role==="staff"&&e.branch==="Gensan Branch"}function Se(e,t,a="data-table"){return`
    <div class="table-scroll">
      <table class="${a}">
        <thead><tr>${e.map(s=>`<th>${d(s)}</th>`).join("")}</tr></thead>
        <tbody>${t.length?t.map(s=>`<tr>${s.map(r=>`<td>${r}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${e.length}" class="table-empty">No records found.</td></tr>`}</tbody>
      </table>
    </div>
  `}function Na(e=new Date){return{date:new Intl.DateTimeFormat("en-PH",{weekday:"long",month:"long",day:"numeric",year:"numeric"}).format(e),time:new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",second:"2-digit",hour12:!0}).format(e)}}function ve(){const e=document.querySelector("[data-date-from]"),t=document.querySelector("[data-date-to]"),a=Array.from(document.querySelectorAll('input[name="reportType"]:checked')).map(s=>s.value).filter(s=>s==="sales"||s==="disbursement"||s==="fold_count"||s==="revolving_fund"||s==="summary");return{from:e?.value||"0000-01-01",to:t?.value||"9999-12-31",types:a.length?a:["summary"]}}function pe(e,t){return e>=t.from&&e<=t.to}function pt(e,t,a,s,r,n){const o=new Set(n.types),c=e.filter(g=>pe(B(g.createdAt),n)),i=t.filter(g=>pe(g.saleDate,n)),l=a.filter(g=>pe(g.expenseDate,n)),m=Sa(c),v=c.reduce((g,x)=>g+x.paidAmount,0),f=i.reduce((g,x)=>g+x.cashAmount,0),p=i.reduce((g,x)=>g+x.gcashAmount,0),h=0,b=v+f,y=h+p,A=b+y,$=l.reduce((g,x)=>g+x.amount,0),N=$,I=A-N,q=()=>({orderCashTotal:v,orderGcashTotal:h,manualCashTotal:f,manualGcashTotal:p,totalCash:b,totalGcash:y,totalSales:A,rows:[["Type","Date","Number","Name","Cash","GCash","Total","Balance"],...c.map(g=>["Order",B(g.createdAt),g.ticket,g.customer,g.paidAmount,0,g.paidAmount,g.balance]),...i.map(g=>["Manual Sale",g.saleDate,g.saleNumber,g.notes??"",g.cashAmount,g.gcashAmount,g.totalAmount,""]),[],["Sales Summary",n.from,"to",n.to,"","","",""],["Order Cash","","","","","",v,""],["Order GCash","","","","","",h,""],["Manual Cash","","","","","",f,""],["Manual GCash","","","","","",p,""],["Total Cash","","","","","",b,""],["Total GCash","","","","","",y,""],["Total Sales","","","","","",A,""]]}),J=()=>({totalExpenses:$,totalDisbursement:N,rows:[["Type","Date","Number","Name","Amount"],...l.map(g=>["Expense",g.expenseDate,g.number,g.name,g.amount]),[],["Disbursement Summary",n.from,"to",n.to,""],["Expenses","","","",$],["Total Disbursement","","","",N]]}),K=()=>({rows:[["Staff","Fold Count"],...m.map(g=>[g.staffName,g.folds]),[],["Total Folds",m.reduce((g,x)=>g+x.folds,0)]]}),O=s.filter(g=>pe(B(g.createdAt),n));return{selection:n,selectedTypes:o,salesRows:q,disbursementRows:J,foldCountRows:K,revolvingDailySummaryRows:()=>({rows:[["Date of Sales","Cash on Hand","Status","Date Update"],...i.map(g=>{const x=vt(g.saleDate,e,a,g.cashAmount),Q=g.status==="revolving"?"Revolving":g.status==="endorsed"?`Endorsed to ${g.endorsedTo??""}`:"Pending";return[g.saleDate,x,Q,g.statusUpdatedAt?B(g.statusUpdatedAt):""]})]}),revolvingHistoryRows:()=>({rows:[["Date","Number","Name","Amount","Category","Description","Type"],...O.map(g=>[B(g.createdAt),g.revolvingNumber,g.name,g.type==="disbursement"?-g.amount:g.amount,g.category,g.description??"",g.type==="add"?"Add Revolving Fund":"Disbursement"])]}),summaryRows:()=>{const g=q(),x=J();return[["Summary",n.from,"to",n.to,"","","",""],["Order Cash","","","","","",g.orderCashTotal,""],["Order GCash","","","","","",g.orderGcashTotal,""],["Manual Cash","","","","","",g.manualCashTotal,""],["Manual GCash","","","","","",g.manualGcashTotal,""],["Total Cash","","","","","",g.totalCash,""],["Total GCash","","","","","",g.totalGcash,""],["Total Sales","","","","","",g.totalSales,""],["Total Disbursement","","","","","",x.totalDisbursement,""],["Profit","","","","","",I,""],["Cash on Hand","","","","","",mt(g.totalCash,x.totalDisbursement),""]]},profit:I}}function Aa(e,t){return`<button class="nav-link ${t?"is-active":""}" data-tab="${e}" type="button">
    <span class="nav-icon">${La(e)}</span>
    <span>${Fe[e]}</span>
  </button>`}function R(e,t){return`<div class="section-head"><div><h2>${d(e)}</h2><p class="meta">${d(t)}</p></div></div>`}function Je(){return Fe[u.tab]??"Dashboard"}function Ce(e){return(e?.name??"Laba101").trim().slice(0,1).toUpperCase()}function La(e){return{dashboard:"DB",pos:"POS",orders:"PO",archived:"AR",customers:"CU",pricing:"PS",disbursements:"DR",reports:"RP",inventory:"IN",maintenance:"MT",staff:"ST",revolving:"RV",settings:"SE"}[e]}async function Ca(){const e=await Te(),t=await Yt(e),a=await nt(),s=await Qt(),r=await Ie(),n=await Zt(),o=await it(),c=await Ne(e),i=await ra(),l=await ia(),m=await ca(),v=await ma(),f=await ut(e),p=await ya(e),h=await pa(),b=await Vt(),y=await st("report_email");return{branch:e,staff:t,allStaff:a,customers:s,services:r,allServices:n,categories:o,orders:c,payments:i,foldLogs:l,expenses:m,sales:v,machines:f,subcleanings:p,revolvingHistory:h,foldRate:b,reportEmail:y??""}}async function S(){if(!u.currentUser){$a(),Wa();return}const e=await Ca();e.orders.filter(a=>a.status!=="claimed").length,e.orders.filter(a=>a.status==="ready").length,e.orders.reduce((a,s)=>a+s.paidAmount,0);const t=e.orders.filter(a=>B(a.createdAt)===_()).reduce((a,s)=>a+s.paidAmount,0);e.sales.reduce((a,s)=>a+s.totalAmount,0),e.expenses.reduce((a,s)=>a+s.amount,0),qe.innerHTML=`
    <div class="app-frame">
      <header class="topbar">
        <div class="topbar-left">
          <img src="/laba101-logo.svg" alt="Laba101" class="topbar-logo" />
          <div>
            <p class="eyebrow">Offline mobile system</p>
            <h1>${d(Je())}</h1>
          </div>
        </div>
        <div class="topbar-actions">
          <div class="branch-pill"><span>Branch</span><strong>${d(e.branch)}</strong></div>
          <button class="icon-button" type="button" aria-label="Notifications">!</button>
          <button class="profile-pill" type="button">
            <span>${Ce(u.currentUser)}</span>
            <strong>${d(u.currentUser.name)}</strong>
          </button>
        </div>
      </header>

      <button class="sidebar-backdrop ${u.sidebarOpen?"is-open":""}" id="sidebar-backdrop" type="button" aria-label="Close navigation"></button>

      <aside class="sidebar ${u.sidebarOpen?"is-open":""}">
        <div class="sidebar-mobile-head">
          <img src="/laba101-logo.svg" alt="Laba101" />
          <button class="sidebar-close" id="sidebar-close-button" type="button" aria-label="Close navigation">X</button>
        </div>
        <nav>${ft().map(a=>Aa(a,u.tab===a)).join("")}</nav>
        <div class="sidebar-fill">
          <div class="sidebar-branch-badge">
            <span>Active Branch</span>
            <strong>${d(e.branch)}</strong>
          </div>
          <p class="sidebar-app-name">Laba101 POS</p>
        </div>
        <div class="sidebar-user">
          <span class="avatar">${Ce(u.currentUser)}</span>
          <div>
            <strong>${d(u.currentUser.name)}</strong>
            <small>${d(u.currentUser.email)} / ${d(u.currentUser.role)}</small>
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
            <h2>${d(Je())}</h2>
          </div>
          <div class="navbar-time">
            <strong data-navbar-time>--:--</strong>
            <span data-navbar-date>Loading...</span>
          </div>
          <button class="mobile-avatar" type="button">${Ce(u.currentUser)}</button>
        </header>

        ${u.tab==="dashboard"?xa({paidToday:t,orders:e.orders}):""}
        ${u.tab==="pos"?Da(e.orders,e.customers,e.services,e.categories,e.payments,e.branch):""}
        ${u.tab==="orders"?Oa(e.orders,e.staff,e.services,e.payments):""}
        ${u.tab==="archived"?Pa(e.orders,e.staff,e.services,e.payments):""}
        ${u.tab==="customers"?qa(e.customers,e.orders):""}
        ${u.tab==="pricing"?Fa(e.allServices,e.categories):""}
        ${u.tab==="disbursements"?Ua(e.expenses,e.sales):""}
        ${u.tab==="reports"?ka(e.orders,e.sales,e.expenses,e.revolvingHistory,e.foldRate):""}
        ${u.tab==="inventory"?Ma(e.services,e.categories):""}
        ${u.tab==="maintenance"?Ba(e.machines,e.subcleanings,e.branch):""}
        ${u.tab==="staff"?_a(e.allStaff,e.branch):""}
        ${u.tab==="revolving"?ts(e.sales,e.revolvingHistory,e.orders,e.expenses):""}
        ${u.tab==="settings"?ja(e.branch,e.foldRate,e.reportEmail):""}
      </main>
    </div>
  `,Ha(),Ka(e),Ga(e.allServices),Va(),Ya(e.orders,e.sales,e.expenses,e.revolvingHistory,e.foldRate),Ja(),Qa(),za(),Za(e.allStaff),as(),es(),Xa()}function ft(){return u.currentUser?.role==="admin"?Object.keys(Fe).filter(e=>e!=="inventory"):Ta(u.currentUser)?["disbursements","reports","maintenance","revolving"]:["pos","orders","archived","disbursements","reports","maintenance","revolving"]}function $a(){qe.innerHTML=`
    <main class="login-page">

      <section class="login-panel-wrap">
        <article class="login-panel">
          <header>
            <div class="login-mark"><img src="/laba101-logo.svg" alt="Laba101" /></div>
            <h2>Welcome back</h2>
            <p>Sign in to continue managing today&apos;s laundry operations.</p>
          </header>
          ${u.loginError?`<div class="alert">${d(u.loginError)}</div>`:""}
          <form id="login-form" class="form">
            <label>Email address<input name="email" type="email" autocomplete="username" placeholder="admin@laba101.test" required /></label>
            <label>Password<input name="password" type="password" autocomplete="current-password" placeholder="Enter password" required /></label>
            <label class="remember"><input name="remember" type="checkbox" value="1" /> Remember me on this device</label>
            <button class="primary" id="login-button" type="submit">Sign in</button>
          </form>
        </article>
      </section>
    </main>
  `}function Ra(){document.querySelectorAll("[data-fill-email]").forEach(e=>{e.addEventListener("click",()=>{const t=document.querySelector('input[name="email"]'),a=document.querySelector('input[name="password"]');t&&(t.value=e.dataset.fillEmail??""),a&&(a.value=e.dataset.fillPassword??"")})})}function xa(e){const t=new Date,a=Array.from({length:7},(o,c)=>{const i=new Date(t);return i.setDate(t.getDate()-(6-c)),new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric"}).format(i)}),s=Array.from({length:7},(o,c)=>{const i=new Date(t);i.setDate(t.getDate()-(6-c));const l=le(i);return e.orders.filter(m=>B(m.createdAt)===l).reduce((m,v)=>m+v.paidAmount,0)}),r=Math.max(1,...s),n=210;return`
    <section class="dashboard-main">
      <article class="panel revenue-panel">
        ${R("Revenue overview","Paid amount for the last 7 days.")}
        <div class="stats compact dashboard-stats">
          <div class="stat"><span class="card-label">Paid Today</span><div class="value">${C(e.paidToday)}</div></div>
        </div>
        <div class="chart-shell">
          <div class="mini-chart revenue-chart">
            ${s.map((o,c)=>{const i=Math.max(12,Math.round(o/r*n));return`<div class="chart-bar ${c===s.length-1?"is-today":""}"><span style="height:${i}px"></span><strong>${C(o)}</strong></div>`}).join("")}
          </div>
          <div class="chart-days">${a.map(o=>`<span>${d(o)}</span>`).join("")}</div>
        </div>
        <div class="chart-footnote">Values are based on order payments for the last 7 days.</div>
      </article>
    </section>
  `}function Da(e,t,a,s,r,n){const o=a.filter(v=>v.serviceType==="order"&&v.isActive),c=a.filter(v=>v.serviceType==="addon"&&v.isActive),i=u.receiptOrderId?e.find(v=>v.id===u.receiptOrderId):null,l=new Set(e.map(v=>v.customerId)),m=t.filter(v=>l.has(v.id));return`
    <section class="grid content full">
      <article class="panel span-2">
        ${R("New POS order","Tap a service, add extra quantities, and confirm the total")}
        <form id="order-form" class="form">
          <div class="form-row">
            <label>Existing customer (${d(n)})
              <select name="customerId">
                <option value="">-- New customer --</option>
                ${m.map(v=>`<option value="${v.id}" data-name="${d(v.name)}" data-phone="${d(v.phone??"")}">${d(v.name)} ${v.phone?`- ${d(v.phone)}`:""}</option>`).join("")}
              </select>
            </label>
            <label>Customer name<input name="customerName" required placeholder="Customer name" /></label>
          </div>
          <div class="form-row">
            <label>Phone<input name="customerPhone" placeholder="09..." /></label>
          </div>

          <fieldset class="service-picker">
            <legend>Services</legend>
            ${o.map((v,f)=>`<label class="service-option">
              <input type="radio" name="serviceId" value="${v.id}" ${f===0?"checked":""} />
              <span>
                <strong>${d(v.name)}</strong>
                <small>${d(v.description??v.category)} ${v.maxKg?` / max ${v.maxKg}kg`:""}</small>
              </span>
              <b>${C(v.price)}</b>
            </label>`).join("")}
          </fieldset>

          <fieldset class="check-grid">
            <legend>Extra services</legend>
            ${c.length?c.map(v=>`<label class="addon-quantity">
              <span><strong>${d(ce(v.name))}</strong><small>${C(v.price)} each</small></span>
              <input type="number" name="addonQty-${v.id}" min="0" step="1" value="0" inputmode="numeric" />
            </label>`).join(""):'<p class="helper">No extra services configured.</p>'}
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

      ${i?Ue(i,r.filter(v=>v.orderId===i.id)):""}
    </section>
  `}function Oa(e,t,a,s){const r=u.receiptOrderId?e.find(l=>l.id===u.receiptOrderId):null,n=e.filter(l=>l.status!=="claimed"),o=u.orderSearch.trim().toLowerCase(),c=u.orderDateFilter.trim(),i=n.filter(l=>{const m=!o||[l.ticket,l.customer,l.phone,l.service,l.itemCategory,l.status].some(f=>String(f??"").toLowerCase().includes(o)),v=!c||B(l.createdAt)===c;return m&&v});return`
    <section class="grid content full">
      <article class="panel span-2">
        ${R("Order queue","Workflow, payment, and receipts")}
        <form class="queue-filters" id="order-queue-filters">
          <label>
            <span>Search queue</span>
            <input name="orderSearch" type="search" placeholder="Ticket, name, service, status" value="${d(u.orderSearch)}" autocomplete="off" />
          </label>
          <label>
            <span>Filter date</span>
            <input name="orderDateFilter" type="date" value="${d(u.orderDateFilter)}" />
          </label>
          <div class="search-actions queue-actions">
            <button class="primary" type="submit">Apply</button>
            <button class="secondary" type="button" id="order-queue-clear">Clear</button>
          </div>
        </form>
        <div class="summary-list queue-summary">
          <div><span>Active queue</span><strong>${i.length}</strong></div>
          <div><span>Claimed archived</span><strong>${e.filter(l=>l.status==="claimed").length}</strong></div>
        </div>
        <div class="table-scroll">
          <table class="data-table orders-data-table">
            <thead><tr><th>Ticket</th><th>Customer</th><th>Service</th><th>Total</th><th>Payment</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              ${i.map(l=>ht(l,t,a)).join("")||'<tr><td colspan="7" class="table-empty">No matching active orders.</td></tr>'}
            </tbody>
          </table>
        </div>
      </article>
      ${r?Ue(r,s.filter(l=>l.orderId===r.id)):""}
    </section>
  `}function Pa(e,t,a,s){const r=e.filter(i=>i.status==="claimed"),n=u.archivedOrderSearch.trim().toLowerCase(),o=r.filter(i=>n?[i.ticket,i.customer,i.phone,i.service,i.itemCategory].some(l=>String(l??"").toLowerCase().includes(n)):!0),c=u.receiptOrderId?e.find(i=>i.id===u.receiptOrderId):null;return`
    <section class="grid content full">
      <article class="panel span-2">
        ${R("Archived orders","All claimed orders are listed here")}
        <form class="queue-filters" id="archived-order-filters">
          <label>
            <span>Search archived</span>
            <input name="archivedOrderSearch" type="search" placeholder="Ticket, name, service" value="${d(u.archivedOrderSearch)}" autocomplete="off" />
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
        <div class="table-scroll">
          <table class="data-table orders-data-table archived-orders-table">
            <thead><tr><th>Ticket</th><th>Customer</th><th>Service</th><th>Total</th><th>Payment</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              ${o.map(i=>ht(i,t,a)).join("")||'<tr><td colspan="7" class="table-empty">No archived orders found.</td></tr>'}
            </tbody>
          </table>
        </div>
      </article>
      ${c?Ue(c,s.filter(i=>i.orderId===c.id)):""}
    </section>
  `}function ht(e,t,a){const s=ot(e,a),r=s.find(m=>!e.workflowCompleted.includes(m.key)),n=r?.key==="fold",o=r?.key==="extras"&&e.extras.length>0,c=e.paidAmount<=0?"Unpaid":e.balance>0?"Partial":"Paid",i=c==="Paid"?"ok":c==="Partial"?"warn":"meta",l=e.extras.length?e.extras.map(m=>`${d(ce(m.name))} x${Number(m.quantity??1)}`).join(", "):"";return`
    <tr>
      <td><strong>${d(e.ticket)}</strong><div class="small">${d(ne(e.createdAt))}</div></td>
      <td>${d(e.customer)}<div class="small">${d(e.phone??"")}</div></td>
      <td>${d(e.service)}${l?`<div class="small">Extras: ${l}</div>`:""}</td>
      <td class="amount-cell"><strong>${C(e.totalAmount)}</strong><div class="small">Bal ${C(e.balance)}</div></td>
      <td><span class="payment-status ${i}">${c}</span><div class="small">Paid ${C(e.paidAmount)}</div></td>
      <td>
        <div class="${e.status==="ready"||e.status==="claimed"?"ok":"warn"}">${d(e.status)}</div>
        <div class="workflow-progress">
          ${s.map(m=>`<span class="${e.workflowCompleted.includes(m.key)?"is-done":r?.key===m.key?"is-next":""}">${d(m.label)}</span>`).join("")}
        </div>
      </td>
      <td>
      <div class="row-actions">
        ${r?`<form class="inline-form advance-form" data-order-id="${e.id}">
          ${o?`<div class="extra-confirmation">Confirm extra service: <strong>${e.extras.map(m=>`${d(ce(m.name))} x${Number(m.quantity??1)}`).join(", ")}</strong></div>`:""}
          ${n?`<select name="assignedStaffId" required>
            <option value="">Staff</option>
            ${t.map(m=>`<option value="${m.id}">${d(m.name)}</option>`).join("")}
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
      </td>
    </tr>
  `}function Ue(e,t){const a=t.reduce((n,o)=>n+Number(o.amount),0),s=Math.max(0,Number((a-e.totalAmount).toFixed(2))),r=e.paidAmount<=0?"Unpaid":e.balance>0?"Partial":"Paid";return`
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="receipt-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-print-receipt>Print</button>
          <button class="secondary" type="button" data-close-receipt>Close</button>
        </div>
        <div class="receipt" id="receipt-print-area">
          <div class="receipt-head">
            <h3 id="receipt-title">Laba101</h3>
            <p>${d(e.ticket)}<br>${d(ne(e.createdAt))}</p>
          </div>
          <div class="receipt-customer">
            <strong>${d(e.customer)}</strong>
            <span>${d(e.phone??"No phone")}</span>
          </div>
          <div class="summary-list receipt-lines">
            <div><span>Service</span><strong>${d(e.service)}</strong></div>
            ${e.extras.length?`<div><span>Extra services</span><strong>${e.extras.map(n=>`${d(ce(n.name))} x${Number(n.quantity??1)} (${C(Number(n.total??n.price))})`).join(", ")}</strong></div>`:""}
            <div><span>Total</span><strong>${C(e.totalAmount)}</strong></div>
            <div><span>Tendered</span><strong>${C(a)}</strong></div>
            <div><span>Paid</span><strong>${C(e.paidAmount)}</strong></div>
            <div><span>Payment status</span><strong>${r}</strong></div>
            <div><span>Change</span><strong>${C(s)}</strong></div>
            <div><span>Balance</span><strong>${C(e.balance)}</strong></div>
          </div>
          <h3>Payments</h3>
          <div class="receipt-payments">
            ${t.map(n=>`<div><span>${d(n.method.toUpperCase())}</span><strong>${C(n.amount)}</strong>${n.reference?`<small>Ref ${d(n.reference)}</small>`:""}</div>`).join("")||'<p class="helper">No payments yet.</p>'}
          </div>
        </div>
      </div>
    </div>
  `}async function Ia(){const e=document.querySelector("#receipt-print-area"),t=document.querySelector("#receipt-title")?.textContent?.trim()||"Laba101 receipt";if(!e)return;if(!w.isNativePlatform()){window.print();return}const a=`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${d(t)}</title><style>
body{margin:0;background:#fff;color:#061a42;font-family:Arial,sans-serif}.receipt{width:2.2in;margin:0 auto;padding:10px;font-size:11px;line-height:1.25}.receipt-head,.receipt-customer,.summary-list div,.receipt-payments div{display:flex;justify-content:space-between;gap:10px}.receipt-head,.receipt-customer{border-bottom:1px dashed #b9c5dc;padding-bottom:10px;margin-bottom:10px}.summary-list{display:grid;gap:7px}.summary-list div,.receipt-payments div{border-bottom:1px solid #edf1fb;padding:5px 0}.receipt h3{font-size:14px;margin:10px 0 6px}.helper{color:#5c6a86}
</style></head><body>${e.outerHTML}</body></html>`,s=`laba101-receipt-${Date.now()}.html`;await ye.writeFile({path:s,data:a,directory:Z.External,encoding:he.UTF8});const{uri:r}=await ye.getUri({path:s,directory:Z.External});await et.share({title:t,text:"Open this receipt file and choose Print from your Android print service.",files:[r],dialogTitle:"Print receipt"})}function qa(e,t){const a=u.customerSearch.trim().toLowerCase(),s=e.filter(r=>a?r.name.toLowerCase().includes(a):!1);return`
    <section class="grid content full">
      <article class="panel">
        ${R("Customer Management","Customer records from local offline storage")}
        <form class="search-box" id="customer-search-form">
          <label>
            <span>Search customer name</span>
            <input name="customerSearch" data-customer-search type="search" placeholder="Type the customer name then tap Search" value="${d(u.customerSearch)}" autocomplete="off" />
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
          ${a?s.map(r=>{const n=t.filter(o=>o.customerId===r.id);return`
              <article class="customer-card">
                <header>
                  <div>
                    <strong>${d(r.name)}</strong>
                    <p>${d(r.phone??"No phone")} · ${d(r.address??"No address")}</p>
                  </div>
                  <span>${n.length} order(s)</span>
                </header>
                <div class="customer-orders">
                  ${n.length?n.map(o=>`
                    <div class="customer-order-row">
                      <div>
                        <strong>${d(o.ticket)}</strong>
                        <span>${d(o.service)} · ${d(o.itemCategory)}</span>
                      </div>
                      <div>
                        <strong>${C(o.totalAmount)}</strong>
                        <span>${d(o.status)}</span>
                      </div>
                    </div>`).join(""):'<p class="helper">No order records yet.</p>'}
                </div>
              </article>`}).join(""):'<div class="helper">Search a customer name to display matching records and their order history.</div>'}
        </div>
      </article>
    </section>
  `}function Fa(e,t){return`
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
            ${Ea.map(a=>`<label class="check"><input type="checkbox" name="includes" value="${a}" /> ${a}</label>`).join("")}
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
                <strong>${d(a.name)}</strong>
                <span>${d(a.category)}</span>
              </header>
              <div class="service-fields">
                <div><span>price:</span><strong>${C(a.price)}</strong></div>
                <div><span>type:</span><strong>${d(a.serviceType)}</strong></div>
                <div><span>category:</span><strong>${d(a.category)}</strong></div>
                <div><span>active:</span><strong>${a.isActive?"yes":"no"}</strong></div>
              </div>
              <div class="service-meta">Includes: ${d(a.includes.join(", ")||"none")}</div>
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
          ${t.map(a=>`<div class="table-row"><div>${d(a.name)}</div><div>${a.maxKg}</div><div></div><div></div><div></div></div>`).join("")}
        </div>
      </article>
    </section>
  `}function Ua(e,t){const a=_(),s=a.slice(0,7),r=e.filter(i=>i.expenseDate===a).reduce((i,l)=>i+l.amount,0),n=e.filter(i=>i.expenseDate.startsWith(s)).reduce((i,l)=>i+l.amount,0),o=t.filter(i=>i.saleDate===a).reduce((i,l)=>i+l.totalAmount,0),c=t.filter(i=>i.saleDate.startsWith(s)).reduce((i,l)=>i+l.totalAmount,0);return`
    <section class="page-head">
      <div>
        <h2>Daily Report</h2>
      </div>
      <div class="segmented">
        <button class="${u.dailyReportTab==="expenses"?"is-active":""}" data-report-tab="expenses" type="button">Disbursements</button>
        <button class="${u.dailyReportTab==="sales"?"is-active":""}" data-report-tab="sales" type="button">Daily Sales</button>
      </div>
    </section>
    <section class="grid stats compact report-stats">
      <div class="panel stat"><div class="card-label">Daily disbursement</div><div class="value">${C(r)}</div></div>
      <div class="panel stat"><div class="card-label">Monthly disbursement</div><div class="value">${C(n)}</div></div>
      <div class="panel stat"><div class="card-label">Today sales input</div><div class="value">${C(o)}</div></div>
      <div class="panel stat"><div class="card-label">Month sales input</div><div class="value">${C(c)}</div></div>
    </section>
    ${u.dailyReportTab==="expenses"?`
    <section class="grid content full">
      <article class="panel">
        ${R("Input disbursement","Supplies, utilities, and cash disbursements")}
        <form id="expense-form" class="form">
          <div class="form-row"><label>Date<input name="expenseDate" type="date" value="${_()}" required /></label><label>Amount<input name="amount" type="number" min="0" step="0.01" required /></label></div>
          <div class="form-row"><label>Name<input name="name" required /></label><label>Category<input name="category" required /></label></div>
          <label>Description<textarea name="description"></textarea></label>
          <button class="primary" type="submit">Save expense</button>
        </form>
      </article>
      <article class="panel">
        ${R("Disbursement list","Expenses only")}
        <div class="table">
          <div class="table-head"><div>Date</div><div>No.</div><div>Name</div><div>Category</div><div>Amount</div></div>
          ${e.map(i=>`<div class="table-row"><div>${d(i.expenseDate)}</div><div>${d(i.number)}</div><div>${d(i.name)}</div><div>${d(i.category)}</div><div>${C(i.amount)}</div></div>`).join("")||'<div class="helper">No expenses yet.</div>'}
        </div>
      </article>
    </section>
    `:`
    <section class="grid content full">
      <article class="panel">
        ${R("Input total sale","Manual cash and GCash totals")}
        <form id="sales-form" class="form">
          <label>Date<input name="saleDate" type="date" value="${_()}" required /></label>
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
          ${t.map(i=>`<div class="table-row"><div>${d(i.saleNumber)}</div><div>${d(i.saleDate)}</div><div>${C(i.cashAmount)}</div><div>${C(i.gcashAmount)}</div><div><strong>${C(i.totalAmount)}</strong></div></div>`).join("")||'<div class="helper">No daily sales totals yet.</div>'}
        </div>
      </article>
    </section>
    `}
  `}function ka(e,t,a,s,r,n,o,c){const i=u.reportPreview?pt(e,t,a,s,r,u.reportPreview):null;return`
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
    ${i?`
      <section class="panel report-preview">
        ${i.selectedTypes.has("sales")?`
          <article>
            ${R("Sales report preview",`${i.selection.from} to ${i.selection.to}`)}
            <div class="table wide-table report-preview-table">
              <div class="table-head report-table-head"><div>Type</div><div>Date</div><div>Number</div><div>Name</div><div>Cash</div><div>GCash</div><div>Total</div><div>Balance</div></div>
              ${i.salesRows().rows.slice(1).map(l=>`<div class="table-row report-table-row">${l.map(m=>`<div>${d(m??"")}</div>`).join("")}</div>`).join("")}
            </div>
          </article>`:""}
        ${i.selectedTypes.has("disbursement")?`
          <article>
            ${R("Disbursement preview",`${i.selection.from} to ${i.selection.to}`)}
            <div class="table wide-table report-preview-table report-disbursement-table">
              <div class="table-head report-table-head"><div>Type</div><div>Date</div><div>Number</div><div>Name</div><div>Amount</div></div>
              ${i.disbursementRows().rows.slice(1).map(l=>`<div class="table-row report-table-row">${l.map(m=>`<div>${d(m??"")}</div>`).join("")}</div>`).join("")}
            </div>
          </article>`:""}
        ${i.selectedTypes.has("fold_count")?`
          <article>
            ${R("Fold Count preview",`${i.selection.from} to ${i.selection.to}`)}
            <div class="table report-preview-table">
              <div class="table-head"><div>Staff</div><div>Fold Count</div></div>
              ${i.foldCountRows().rows.slice(1).map(l=>`<div class="table-row">${l.map(m=>`<div>${d(m??"")}</div>`).join("")}</div>`).join("")}
            </div>
          </article>`:""}
        ${i.selectedTypes.has("revolving_fund")?`
          <article>
            ${R("Revolving Fund — Daily Summary",`${i.selection.from} to ${i.selection.to}`)}
            ${Se(["Date of Sales","Cash on Hand","Status","Date Update"],i.revolvingDailySummaryRows().rows.slice(1).map(l=>[d(String(l[0]??"")),d(String(l[1]??"")),d(String(l[2]??"")),d(String(l[3]??""))]),"data-table revolving-report-table")}
          </article>
          <article>
            ${R("Revolving Fund — Table History",`${i.selection.from} to ${i.selection.to}`)}
            ${Se(["Date","Number","Name","Amount","Category","Description","Type"],i.revolvingHistoryRows().rows.slice(1).map(l=>[d(String(l[0]??"")),d(String(l[1]??"")),d(String(l[2]??"")),d(String(l[3]??"")),d(String(l[4]??"")),d(String(l[5]??"")),d(String(l[6]??""))]),"data-table revolving-report-table")}
          </article>`:""}
        ${i.selectedTypes.has("summary")?`
          <article>
            ${R("Summary preview",`${i.selection.from} to ${i.selection.to}`)}
            <div class="summary-list report-summary-list">
              ${i.summaryRows().map(l=>`<div><span>${d(l[0])}</span><strong>${d(String(l[6]??"0"))}</strong></div>`).join("")}
            </div>
          </article>`:""}
      </section>
    `:""}
  `}function Ma(e,t){return`
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
          ${e.map(a=>`<div class="table-row"><div><strong>${d(a.name)}</strong></div><div>${d(a.category)}</div><div>${C(a.price)}</div><div>${a.maxKg} kg</div><div>${a.isActive?"Active":"Inactive"}</div></div>`).join("")}
        </div>
      </article>
    </section>
  `}function Ba(e,t,a){const s=e.filter(n=>n.status!=="under_cleaning"),r=e.filter(n=>n.status==="under_cleaning");return`
    <section class="page-head">
      <div>
        <h2>Maintenance & Cleaning</h2>
        <p class="meta">Manage machine subcleaning and maintenance records.</p>
      </div>
      <div class="segmented">
        <button class="${u.maintenanceTab==="cleaning"?"is-active":""}" data-maintenance-tab="cleaning" type="button">Subcleaning</button>
        <button class="${u.maintenanceTab==="machines"?"is-active":""}" data-maintenance-tab="machines" type="button">Machine Management</button>
      </div>
    </section>
    ${u.maintenanceTab==="cleaning"?`
    <section class="grid content full">
      <article class="panel">
        ${R("Available Machines","Select machines to start cleaning.")}
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
        ${R("Under Cleaning","Machines currently being serviced.")}
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
        ${R("Daily Cleaning Checklist","Track which machines have been cleaned today.")}
        <div class="table">
          <div class="table-head"><div>Machine</div><div>Type</div><div>Status</div><div>Notes</div><div>Date</div></div>
          ${e.map(n=>{const o=t.find(c=>c.machineIds.includes(n.id)&&c.date===_());return`<div class="table-row"><div><strong>${d(n.machineName)}</strong></div><div>${d(n.machineType)}</div><div>${o?d(o.cleaningStatus.replace("_"," ")):"Not Cleaned"}</div><div>${d(o?.notes??"-")}</div><div>${_()}</div></div>`}).join("")}
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
          <input type="hidden" name="branch" value="${d(a)}" />
          <button class="primary" type="submit">Add machine</button>
        </form>
      </article>
      <article class="panel">
        ${R("Machines","Washer and dryer status")}
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
  `}function _a(e,t){return`
    <section class="grid">
      <div class="page-head">
        <div>
          <p class="eyebrow">Team Management</p>
          <h2>Staff Overview</h2>
        </div>
        <button class="primary" id="open-add-staff-modal" type="button">+ Add staff</button>
      </div>

      <article class="panel">
        ${R("Staff list","Branch: "+d(t))}
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
  `}function ja(e,t,a){return`
    <section class="grid content full">
      <article class="panel">
        ${R("Settings","Device-local configuration")}
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
  `}function Ha(){const e=()=>{localStorage.removeItem(oe),u.currentUser=null,u.tab="dashboard",u.receiptOrderId=0,u.sidebarOpen=!1,S()};document.querySelector("#logout-button")?.addEventListener("click",e),document.querySelector("#mobile-logout-button")?.addEventListener("click",e),document.querySelector("#mobile-menu-button")?.addEventListener("click",()=>{u.sidebarOpen=!0,S()}),document.querySelector("#sidebar-close-button")?.addEventListener("click",()=>{u.sidebarOpen=!1,S()}),document.querySelector("#sidebar-backdrop")?.addEventListener("click",()=>{u.sidebarOpen=!1,S()}),document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{u.tab=t.dataset.tab,u.receiptOrderId=0,u.sidebarOpen=!1,S()})}),document.querySelectorAll("[data-quick-tab]").forEach(t=>{t.addEventListener("click",()=>{u.tab=t.dataset.quickTab,S()})}),document.querySelectorAll("[data-receipt]").forEach(t=>{t.addEventListener("click",()=>{u.receiptOrderId=Number(t.dataset.receipt),S()})}),document.querySelector("[data-close-receipt]")?.addEventListener("click",()=>{u.receiptOrderId=0,S()}),document.querySelector("[data-print-receipt]")?.addEventListener("click",()=>{Ia().catch(t=>{alert(t instanceof Error?t.message:"Receipt could not be printed.")})}),document.querySelectorAll("[data-report-tab]").forEach(t=>{t.addEventListener("click",()=>{u.dailyReportTab=t.dataset.reportTab,S()})}),document.querySelectorAll("[data-maintenance-tab]").forEach(t=>{t.addEventListener("click",()=>{u.maintenanceTab=t.dataset.maintenanceTab,S()})})}function Wa(){Ra(),document.querySelector("#login-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget),a=document.querySelector("#login-button");a&&(a.disabled=!0,a.textContent="Signing in...");try{const s=await rt(String(t.get("email")??""),String(t.get("password")??""));if(!s){u.loginError="Invalid email or password.",await S();return}u.currentUser=s,u.loginError="",await fe("branch",String(s.branch||"Main Store")),t.get("remember")?localStorage.setItem(oe,JSON.stringify({email:s.email,remembered:!0})):localStorage.removeItem(oe),ft().includes(u.tab)||(u.tab="dashboard"),await S()}catch(s){alert("Login Error: "+String(s?.message||s)),a&&(a.disabled=!1,a.textContent="Sign in")}})}function Xa(){me&&window.clearInterval(me);const e=document.querySelector("[data-navbar-time]"),t=document.querySelector("[data-navbar-date]");if(!e||!t){me=void 0;return}const a=()=>{const s=Na();e.textContent=s.time,t.textContent=s.date};a(),me=window.setInterval(a,1e3)}function Qe(e,t){return e?t.find(a=>a.name.toLowerCase()===e.category.toLowerCase())??t.find(a=>a.name==="Regular Clothes")??t[0]??null:null}function $e(e,t){return Math.max(1,Number(e.maxKg||t.maxKg||1))}function yt(e,t){return Object.fromEntries(t.filter(a=>a.serviceType==="addon").map(a=>[a.id,Number(e.querySelector(`input[name="addonQty-${a.id}"]`)?.value??0)]).filter(([,a])=>Number(a)>0))}function ze(e,t){const a=yt(e,t);return t.filter(s=>s.serviceType==="addon"&&Number(a[s.id]??0)>0).map(s=>({...s,quantity:Number(a[s.id])}))}function Ka(e){const t=document.querySelector("#order-form"),a=document.querySelector("#price-preview"),s=t?.querySelector('button[type="submit"]'),r=t?.querySelector('select[name="customerId"]'),n=t?.querySelector('input[name="customerName"]'),o=t?.querySelector('input[name="customerPhone"]'),c=t?.querySelector("[data-order-error]"),i=t?.querySelector('select[name="paymentMethod"]'),l=t?.querySelector(".gcash-reference"),m=t?.querySelector('input[name="paymentReference"]'),v=()=>{if(!r||!n||!o)return;const h=r.selectedOptions[0];n.value=h?.dataset.name??"",o.value=h?.dataset.phone??""},f=()=>{const h=i?.value==="gcash";l&&(l.hidden=!h),m&&(m.required=h,h||(m.value=""))},p=()=>{if(!t||!a)return;const h=new FormData(t),b=e.services.find(q=>q.id===Number(h.get("serviceId"))),y=Qe(b,e.categories),A=ze(t,e.services);if(!b||!y)return;const $=xe(b,y,$e(b,y),A),N=$.extras.map(q=>`${ce(q.name)} x${q.quantity}`),I=$.extraKg>0;s&&(s.disabled=I),c&&(c.hidden=!I,c.textContent=$.warning??""),a.classList.toggle("has-error",I),a.innerHTML=`
      <div class="preview-line"><span>Base price</span><strong>${C($.price)}</strong></div>
      ${$.extraServiceAmount>0?`<div class="preview-line"><span>Extra services${N.length?` (${d(N.join(", "))})`:""}</span><strong>${C($.extraServiceAmount)}</strong></div>`:""}
      <div class="preview-total"><span>Total amount</span><strong>${C($.totalAmount)}</strong></div>
      ${$.warning?`<span class="warn">${d($.warning)}</span>`:""}
    `};r?.addEventListener("change",v),i?.addEventListener("change",f),f(),t?.addEventListener("input",p),t?.addEventListener("change",p),p(),t?.addEventListener("submit",async h=>{h.preventDefault();const b=new FormData(t),y=e.services.find(N=>N.id===Number(b.get("serviceId"))),A=Qe(y,e.categories),$=ze(t,e.services);if(y&&A){const N=xe(y,A,$e(y,A),$);if(N.extraKg>0){c&&(c.hidden=!1,c.textContent=N.warning??"Weight exceeds the allowed limit.");return}}try{await aa({customerId:Number(b.get("customerId"))||void 0,customerName:String(b.get("customerName")??""),customerPhone:String(b.get("customerPhone")??"")||null,serviceId:Number(b.get("serviceId")),branch:e.branch,itemCategoryId:A?.id,weightKg:y&&A?$e(y,A):void 0,addonQuantities:yt(t,e.services),paidAmount:Number(b.get("paidAmount")??0),paymentMethod:String(b.get("paymentMethod")??"cash"),paymentReference:String(b.get("paymentReference")??"")||null,notes:String(b.get("notes")??"")||null}),await S()}catch(N){c&&(c.hidden=!1,c.textContent=N instanceof Error?N.message:"Order could not be saved.")}}),document.querySelectorAll(".advance-form").forEach(h=>{h.addEventListener("submit",async b=>{b.preventDefault();const y=new FormData(h);await na(Number(h.dataset.orderId),Number(y.get("assignedStaffId"))||null),await S()})}),document.querySelectorAll(".payment-form").forEach(h=>{const b=h.querySelector('select[name="method"]'),y=h.querySelector('input[name="reference"]'),A=()=>{const $=b?.value==="gcash";y&&(y.hidden=!$,y.required=$,$||(y.value=""))};b?.addEventListener("change",A),A(),h.addEventListener("submit",async $=>{$.preventDefault();const N=new FormData(h);await ct(Number(h.dataset.orderId),{amount:Number(N.get("amount")),method:String(N.get("method")),reference:String(N.get("reference")??"")||null}),await S()})})}function Ga(e){document.querySelector("#service-form")?.addEventListener("submit",async t=>{t.preventDefault();const a=new FormData(t.currentTarget),s=a.get("id")?Number(a.get("id")):void 0;await Ke({id:s,name:String(a.get("name")??""),description:String(a.get("description")??"")||null,category:String(a.get("category")??""),serviceType:String(a.get("serviceType")??"order"),price:Number(a.get("price")??0),maxKg:Number(a.get("maxKg")??0),dryingMinutes:Number(a.get("dryingMinutes"))||null,includes:a.getAll("includes").map(String).filter(Boolean),additionalCharge:0,turnaroundHours:Number(a.get("turnaroundHours")??24),isActive:1}),await S()}),document.querySelectorAll(".edit-service-btn").forEach(t=>{t.addEventListener("click",()=>{const a=Number(t.dataset.id),s=e.find(n=>n.id===a),r=document.querySelector("#service-form");s&&r&&(r.querySelector("[name=id]").value=String(s.id),r.querySelector("[name=name]").value=s.name,r.querySelector("[name=category]").value=s.category,r.querySelector("[name=serviceType]").value=s.serviceType,r.querySelector("[name=price]").value=String(s.price),r.querySelector("[name=maxKg]").value=String(s.maxKg),r.querySelector("[name=dryingMinutes]").value=s.dryingMinutes?String(s.dryingMinutes):"",r.querySelectorAll('input[name="includes"]').forEach(n=>{n.checked=s.includes.includes(n.value)}),r.querySelector("[name=turnaroundHours]").value=String(s.turnaroundHours),r.querySelector("[name=description]").value=s.description??"",window.scrollTo({top:0,behavior:"smooth"}))})}),document.querySelectorAll(".deactivate-service-btn, .activate-service-btn").forEach(t=>{t.addEventListener("click",async()=>{const a=Number(t.dataset.id),s=e.find(r=>r.id===a);if(s){const r=s.isActive?0:1;await Ke({id:s.id,name:s.name,description:s.description,category:s.category,serviceType:s.serviceType,price:s.price,maxKg:s.maxKg,dryingMinutes:s.dryingMinutes,includes:s.includes,additionalCharge:s.additionalCharge,turnaroundHours:s.turnaroundHours,isActive:r}),await S()}})}),document.querySelector("#category-form")?.addEventListener("submit",async t=>{t.preventDefault();const a=new FormData(t.currentTarget);await ea({name:String(a.get("name")??""),maxKg:Number(a.get("maxKg")??0),additionalFee:Number(a.get("additionalFee")??0),isActive:1}),await S()})}function Va(){document.querySelector("#expense-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await ua({expenseDate:String(t.get("expenseDate")??""),name:String(t.get("name")??""),category:String(t.get("category")??""),description:String(t.get("description")??""),amount:Number(t.get("amount")??0)}),await S()}),document.querySelector("#fold-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await oa({orderTicket:String(t.get("orderTicket")??""),staffName:String(t.get("staffName")??""),foldCount:Number(t.get("foldCount")??1),rate:Number(t.get("rate")??5)}),await S()})}function Ya(e,t,a,s,r){document.querySelector("#generate-report")?.addEventListener("click",()=>{u.reportPreview=ve(),S()}),document.querySelector("#sales-form")?.addEventListener("submit",async f=>{f.preventDefault();const p=new FormData(f.currentTarget);await va({saleDate:String(p.get("saleDate")??""),cashAmount:Number(p.get("cashAmount")??0),gcashAmount:Number(p.get("gcashAmount")??0),notes:String(p.get("notes")??"")}),await S()});const n=document.querySelector("[data-date-from]"),o=document.querySelector("[data-date-to]");document.querySelectorAll("[data-date-scope]").forEach(f=>{f.addEventListener("change",()=>{if(!f.checked||!n||!o)return;const p=new Date,h=le(p),b=new Date(p);f.value==="week"&&b.setDate(p.getDate()-6),f.value==="month"&&b.setDate(1),f.value!=="custom"&&(n.value=f.value==="today"?h:le(b),o.value=h)})});const c=f=>{const p=y=>String(y??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;"),h=y=>y==="Sales Report"?[110,125,150,215,95,95,105,105]:y==="Disbursement"?[110,115,150,220,105]:y==="Fold Count"?[220,125]:y==="Revolving Daily Summary"?[115,105,120,115]:y==="Revolving History"?[115,96,140,96,110,180,120]:[155,125,125,125,95,95,115,115];return`<?xml version="1.0"?>
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
  ${f.map(y=>{const A=h(y.name).map(N=>`<Column ss:Width="${N}" ss:AutoFitWidth="0"/>`).join(""),$=y.rows.map(N=>{if(!N.length)return'<Row ss:Height="10" ss:StyleID="BorderRow"><Cell ss:StyleID="BorderCell"><Data ss:Type="String">&nbsp;</Data></Cell></Row>';const I=N[0]==="Type"||N[0]==="Summary"||N[0]==="Sales Summary"||N[0]==="Disbursement Summary"||N[0]==="Staff"||N[0]==="Date of Sales"||N[0]==="Date",q=I?"HeaderRow":"BorderRow",J=I?"HeaderCell":"BorderCell",K=I?26:22,O=N.map(P=>`<Cell ss:StyleID="${J}"><Data ss:Type="${typeof P=="number"?"Number":"String"}">${p(P)}</Data></Cell>`).join("");return`<Row ss:Height="${K}" ss:StyleID="${q}">${O}</Row>`}).join("");return`
        <Worksheet ss:Name="${p(y.name)}">
          <Table>
            ${A}
            ${$}
          </Table>
        </Worksheet>`}).join("")}
</Workbook>`},i=()=>{const f=ve(),p=pt(e,t,a,s,r,f),h=[];p.selectedTypes.has("sales")&&h.push({name:"Sales Report",rows:p.salesRows().rows}),p.selectedTypes.has("disbursement")&&h.push({name:"Disbursement",rows:p.disbursementRows().rows}),p.selectedTypes.has("fold_count")&&h.push({name:"Fold Count",rows:p.foldCountRows().rows}),p.selectedTypes.has("revolving_fund")&&(h.push({name:"Revolving Daily Summary",rows:p.revolvingDailySummaryRows().rows}),h.push({name:"Revolving History",rows:p.revolvingHistoryRows().rows})),p.selectedTypes.has("summary")&&h.push({name:"Summary",rows:p.summaryRows()});const b=c(h.length?h:[{name:"Summary",rows:p.summaryRows()}]),y=`laba101-report-${f.from}-to-${f.to}.xls`;return new File([b],y,{type:"application/vnd.ms-excel"})},l=async()=>{const f=i();if(!w.isNativePlatform())return{fileName:f.name,uri:""};const p=await f.text(),h=f.name;await ye.writeFile({path:h,data:p,directory:Z.External,encoding:he.UTF8});const{uri:b}=await ye.getUri({path:h,directory:Z.External});return{fileName:f.name,uri:b}},m=()=>{const f=i(),p=ve(),h=`laba101-report-${p.from}-to-${p.to}.xls`,b=f,y=URL.createObjectURL(b),A=document.createElement("a");return A.href=y,A.download=h,document.body.appendChild(A),A.click(),setTimeout(()=>{A.remove(),URL.revokeObjectURL(y)},1e3),h},v=async f=>{const p=document.querySelector(f==="export"?"#export-report":"#email-report");p&&(p.disabled=!0,p.textContent=f==="export"?"Exporting...":"Sending...");try{if(f==="export")if(w.isNativePlatform()){const h=await l();alert(`Report exported as "${h.fileName}".`)}else{const h=m();alert(`Report saved: ${h}`)}else{const h=await st("report_email")||"";if(!h){alert("Please configure a report email in Settings first.");return}const b=ve(),y=`Laba101 report ${b.from} to ${b.to}`;if(w.isNativePlatform()){const A=await l();try{await et.share({title:y,text:`Please find the attached Laba101 report file: ${A.fileName}`,files:[A.uri],dialogTitle:"Send report via email"}),alert(`Report saved and shared as "${A.fileName}".`)}catch($){const N=String($).toLowerCase();if(N.includes("share canceled")||N.includes("canceled"))alert(`Report saved as "${A.fileName}".`);else throw $}}else{const A=m(),$=`Hi,

Please find the attached Laba101 report file: ${A}

Date range: ${b.from} to ${b.to}`,N=`mailto:${h}?subject=${encodeURIComponent(y)}&body=${encodeURIComponent($)}`;setTimeout(()=>{window.location.href=N},800),alert(`Report downloaded as "${A}".
Your email app will open — please attach the file and send.`)}}}catch(h){alert("Failed: "+String(h))}finally{p&&(p.disabled=!1,p.textContent=f==="export"?"Export Excel":"Send to Email")}};document.querySelector("#export-report")?.addEventListener("click",async()=>{await v("export")}),document.querySelector("#email-report")?.addEventListener("click",async()=>{await v("email")})}function Ja(){document.querySelector("#order-queue-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);u.orderSearch=String(t.get("orderSearch")??"").trim(),u.orderDateFilter=String(t.get("orderDateFilter")??"").trim(),S()}),document.querySelector("#order-queue-clear")?.addEventListener("click",()=>{u.orderSearch="",u.orderDateFilter="",S()}),document.querySelector("#archived-order-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);u.archivedOrderSearch=String(t.get("archivedOrderSearch")??"").trim(),S()}),document.querySelector("#archived-order-clear")?.addEventListener("click",()=>{u.archivedOrderSearch="",S()})}function Qa(){document.querySelector("#customer-search-form")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);u.customerSearch=String(t.get("customerSearch")??"").trim(),S()}),document.querySelector("#customer-search-clear")?.addEventListener("click",()=>{u.customerSearch="",S()})}function za(){document.querySelector("#machine-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await fa({machineName:String(t.get("machineName")??""),machineType:String(t.get("machineType")),status:String(t.get("status")),branch:String(t.get("branch")??"")}),await S()}),document.querySelector("#subcleaning-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=e.currentTarget.querySelector('button[type="submit"]');t&&(t.disabled=!0,t.textContent="Starting...");const a=new FormData(e.currentTarget),s=a.getAll("machineIds").map(Number);if(!s.length){alert("Please select at least one machine to clean."),t&&(t.disabled=!1,t.textContent="Start Cleaning");return}await ga({date:String(a.get("date")??""),machineIds:s,cleaningStatus:String(a.get("cleaningStatus")??""),notes:String(a.get("notes")??""),branch:String(a.get("branch")??"")}),await S()}),document.querySelectorAll(".complete-cleaning-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.machineId),a=e.dataset.branch??"";e.disabled=!0,e.textContent="Completing...",await ba(t,a),await S()})}),document.querySelectorAll(".deactivate-machine-btn, .activate-machine-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.id),a=e.classList.contains("deactivate-machine-btn");await ha(t,a?"inactive":"available"),await S()})})}function Za(e){const t=document.querySelector("#add-staff-modal"),a=document.querySelector("#open-add-staff-modal"),s=document.querySelector("#close-add-staff-modal"),r=document.querySelector("#staff-form"),n=()=>{r?.reset(),r&&(r.querySelector("[name=id]").value="");const c=document.querySelector("#add-staff-title");c&&(c.textContent="Add staff member"),t?.removeAttribute("hidden")},o=()=>{t?.setAttribute("hidden",""),r?.reset()};a?.addEventListener("click",n),s?.addEventListener("click",o),t?.addEventListener("click",c=>{c.target===t&&o()}),document.querySelectorAll(".edit-staff-btn").forEach(c=>{c.addEventListener("click",()=>{const i=Number(c.dataset.id),l=e.find(m=>m.id===i);if(l&&r){r.querySelector("[name=id]").value=String(l.id),r.querySelector("[name=name]").value=l.name,r.querySelector("[name=email]").value=l.email,r.querySelector("[name=password]").value=l.password,r.querySelector("[name=role]").value=l.role,r.querySelector("[name=branch]").value=l.branch;const m=document.querySelector("#add-staff-title");m&&(m.textContent="Edit staff member"),t?.removeAttribute("hidden")}})}),document.querySelectorAll(".deactivate-staff-btn, .activate-staff-btn").forEach(c=>{c.addEventListener("click",async()=>{const i=Number(c.dataset.id),l=e.find(m=>m.id===i);l&&(await Xe(i,{isActive:l.isActive!==0?0:1}),await S())})}),r?.addEventListener("submit",async c=>{c.preventDefault();const i=document.querySelector("#staff-save-btn");i&&(i.disabled=!0,i.textContent="Saving...");const l=new FormData(r),m=l.get("id")?Number(l.get("id")):void 0,v=String(l.get("name")??"").trim(),f=String(l.get("email")??"").trim(),p=String(l.get("password")??"password")||"password",h=String(l.get("role")),b=String(l.get("branch")??"");if(!v||!f){alert("Name and email are required."),i&&(i.disabled=!1,i.textContent="Save staff member");return}try{m?await Xe(m,{name:v,email:f,password:p,role:h,branch:b}):await Jt({name:v,email:f,password:p,role:h,branch:b}),o(),await S()}catch{alert("Failed to save staff. The email may already be in use."),i&&(i.disabled=!1,i.textContent="Save staff member")}})}function es(){document.querySelector("#settings-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await fe("branch",String(t.get("branch")??"Main Store")),await fe("fold_rate",String(t.get("foldRate")??"5")),String(t.get("reportEmail")??"")&&await fe("report_email",String(t.get("reportEmail"))),alert("Settings saved successfully!"),await S()})}await Gt();const Ze=localStorage.getItem(oe);if(Ze)try{const e=JSON.parse(Ze);if(e.email&&e.remembered){const t=await rt(e.email,"password")??null;u.currentUser=t}}catch{localStorage.removeItem(oe)}function ts(e,t,a,s){const r=e.filter(p=>p.status==="revolving").reduce((p,h)=>p+h.cashAmount,0),n=t.filter(p=>p.type==="add").reduce((p,h)=>p+h.amount,0),o=t.filter(p=>p.type==="disbursement").reduce((p,h)=>p+h.amount,0),c=r+n-o,i=u.revolvingHistoryFrom||"0000-01-01",l=u.revolvingHistoryTo||"9999-12-31",m=t.filter(p=>{const h=B(p.createdAt);return h>=i&&h<=l}),v=e.map(p=>{const h=vt(p.saleDate,a,s,p.cashAmount),b=p.status==="revolving"?'<span class="ok">Revolving</span>':p.status==="endorsed"?`<span class="warn">Endorsed to ${d(p.endorsedTo)}</span>`:'<span class="meta">Pending</span>',y=p.status!=="revolving"&&p.status!=="endorsed"?`<div class="row-actions">
          <button class="primary revolving-btn" data-id="${p.id}">Revolving</button>
          <button class="secondary endorsed-btn" data-id="${p.id}" data-date="${ne(p.saleDate)}">Endorsed</button>
        </div>`:"";return[`<strong>${d(ne(p.saleDate))}</strong>`,`<strong class="ok">${C(h)}</strong>`,b,p.statusUpdatedAt?d(ne(p.statusUpdatedAt)):"-",y]}),f=m.map(p=>[wa(p.createdAt),`<strong>${d(p.revolvingNumber)}</strong>`,d(p.name),`<strong class="${p.type==="disbursement"?"warn":"ok"}">${p.type==="disbursement"?"-":"+"}${C(p.amount)}</strong>`,d(p.category),d(p.description||"-"),`<span class="${p.type==="add"?"ok":"warn"}">${p.type==="add"?"Add Revolving Fund":"Disbursement"}</span>`]);return`
    <section class="grid content full">
      <div class="panel-header" style="display: flex; gap: 16px; margin-bottom: 24px; align-items: center;">
        <button class="primary" id="add-revolving-fund-btn">Add Revolving Fund</button>
        <button class="secondary" id="revolving-disbursement-btn">Disbursement</button>
      </div>

      <article class="panel">
        <div style="background-color: #061a42; color: white; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
          <p style="font-size: 12px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin: 0 0 8px 0;">Revolving Fund Total</p>
          <p style="font-size: 32px; font-weight: 800; margin: 0;">${C(c)}</p>
        </div>
        ${R("Daily Summary","Cash on hand per day (order cash + manual cash − disbursements)")}
        ${Se(["Date of Sales","Cash on Hand","Status","Date Update","Action"],v,"data-table revolving-summary-datatable")}
      </article>

      <article class="panel">
        ${R("Revolving Table History","Filter by date — DISB numbers shared with Daily Report expenses")}
        <form id="revolving-history-filters" class="form revolving-history-filters">
          <div class="form-row">
            <label>From<input name="revolvingHistoryFrom" type="date" value="${u.revolvingHistoryFrom}" /></label>
            <label>To<input name="revolvingHistoryTo" type="date" value="${u.revolvingHistoryTo}" /></label>
          </div>
          <div class="row-actions">
            <button class="primary" type="submit">Apply filter</button>
            <button class="secondary" type="button" id="revolving-history-clear">Clear</button>
          </div>
        </form>
        ${Se(["Date","Disbursement #","Name","Amount","Category","Description","Type"],f,"data-table revolving-history-datatable")}
      </article>

      ${u.endorseModalOpen?`
        <div class="modal-backdrop" role="presentation">
          <div class="receipt-modal" role="dialog" aria-modal="true" style="max-width: 400px; width: 90%;">
            <form id="endorse-form" class="form" style="padding: 24px;">
              <h3 style="margin-top: 0;">Endorse Money</h3>
              <p class="meta" style="margin-bottom: 16px;">Endorsing cash from <strong>${d(u.endorseSaleDate)}</strong>.</p>
              <label>Endorsed to (Name)<input name="endorsedTo" type="text" placeholder="Enter name" required /></label>
              <div class="modal-actions" style="margin-top: 24px; padding: 0;">
                <button class="primary" type="submit">Submit Endorsement</button>
                <button class="secondary" type="button" id="close-endorse-modal">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      `:""}

      ${u.revolvingModalOpen?`
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

      ${u.addFundModalOpen?`
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

      ${u.disbursementModalOpen?`
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
  `}function as(){document.querySelector("#revolving-history-filters")?.addEventListener("submit",async m=>{m.preventDefault();const v=new FormData(m.currentTarget);u.revolvingHistoryFrom=String(v.get("revolvingHistoryFrom")??"").trim(),u.revolvingHistoryTo=String(v.get("revolvingHistoryTo")??"").trim(),await S()}),document.querySelector("#revolving-history-clear")?.addEventListener("click",async()=>{u.revolvingHistoryFrom="",u.revolvingHistoryTo="",await S()}),document.querySelectorAll(".revolving-btn").forEach(m=>{m.addEventListener("click",async()=>{u.revolvingModalOpen=!0,u.revolvingSaleId=Number(m.dataset.id),await S()})});const e=document.getElementById("confirm-revolving-btn");e&&e.addEventListener("click",async()=>{await Ve(u.revolvingSaleId,"revolving",null,new Date().toISOString()),u.revolvingModalOpen=!1,await S()});const t=document.getElementById("close-revolving-modal");t&&t.addEventListener("click",async()=>{u.revolvingModalOpen=!1,await S()}),document.querySelectorAll(".endorsed-btn").forEach(m=>{m.addEventListener("click",async()=>{u.endorseModalOpen=!0,u.endorseSaleId=Number(m.dataset.id),u.endorseSaleDate=m.dataset.date??"",await S()})});const a=document.getElementById("close-endorse-modal");a&&a.addEventListener("click",async()=>{u.endorseModalOpen=!1,await S()});const s=document.getElementById("endorse-form");s&&s.addEventListener("submit",async m=>{m.preventDefault();const v=new FormData(s),f=String(v.get("endorsedTo")??"").trim();f&&(await Ve(u.endorseSaleId,"endorsed",f,new Date().toISOString()),u.endorseModalOpen=!1,await S())});const r=document.getElementById("add-revolving-fund-btn");r&&r.addEventListener("click",async()=>{u.addFundModalOpen=!0,await S()});const n=document.getElementById("close-add-fund-modal");n&&n.addEventListener("click",async()=>{u.addFundModalOpen=!1,await S()});const o=document.getElementById("add-fund-form");o&&o.addEventListener("submit",async m=>{m.preventDefault();const v=new FormData(o);await Ye({name:String(v.get("name")??"").trim(),amount:Number(v.get("amount")??0),category:"Add Revolving Fund",description:null,type:"add",createdAt:new Date().toISOString()}),u.addFundModalOpen=!1,await S()});const c=document.getElementById("revolving-disbursement-btn");c&&c.addEventListener("click",async()=>{u.disbursementModalOpen=!0,await S()});const i=document.getElementById("close-disbursement-modal");i&&i.addEventListener("click",async()=>{u.disbursementModalOpen=!1,await S()});const l=document.getElementById("disbursement-form");l&&l.addEventListener("submit",async m=>{m.preventDefault();const v=new FormData(l);await Ye({name:String(v.get("name")??"").trim(),amount:Number(v.get("amount")??0),category:String(v.get("category")??"").trim(),description:String(v.get("description")??"").trim(),type:"disbursement",expenseDate:_(),createdAt:new Date().toISOString()}),u.disbursementModalOpen=!1,await S()})}await S();export{he as E,De as W,At as b};
