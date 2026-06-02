(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function a(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(s){if(s.ep)return;s.ep=!0;const n=a(s);fetch(s.href,n)}})();var te;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(te||(te={}));class Le extends Error{constructor(t,a,r){super(t),this.message=t,this.code=a,this.data=r}}const Nt=e=>{var t,a;return e?.androidBridge?"android":!((a=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},At=e=>{const t=e.CapacitorCustomPlatform||null,a=e.Capacitor||{},r=a.Plugins=a.Plugins||{},s=()=>t!==null?t.name:Nt(e),n=()=>s()!=="web",i=u=>{const f=d.get(u);return!!(f?.platforms.has(s())||c(u))},c=u=>{var f;return(f=a.PluginHeaders)===null||f===void 0?void 0:f.find(v=>v.name===u)},l=u=>e.console.error(u),d=new Map,p=(u,f={})=>{const v=d.get(u);if(v)return console.warn(`Capacitor plugin "${u}" already registered. Cannot register plugins twice.`),v.proxy;const g=s(),y=c(u);let b;const T=async()=>(!b&&g in f?b=typeof f[g]=="function"?b=await f[g]():b=f[g]:t!==null&&!b&&"web"in f&&(b=typeof f.web=="function"?b=await f.web():b=f.web),b),w=(P,I)=>{var U,W;if(y){const h=y?.methods.find(x=>I===x.name);if(h)return h.rtype==="promise"?x=>a.nativePromise(u,I.toString(),x):(x,Z)=>a.nativeCallback(u,I.toString(),x,Z);if(P)return(U=P[I])===null||U===void 0?void 0:U.bind(P)}else{if(P)return(W=P[I])===null||W===void 0?void 0:W.bind(P);throw new Le(`"${u}" plugin is not implemented on ${g}`,te.Unimplemented)}},N=P=>{let I;const U=(...W)=>{const h=T().then(x=>{const Z=w(x,P);if(Z){const ue=Z(...W);return I=ue?.remove,ue}else throw new Le(`"${u}.${P}()" is not implemented on ${g}`,te.Unimplemented)});return P==="addListener"&&(h.remove=async()=>I()),h};return U.toString=()=>`${P.toString()}() { [capacitor code] }`,Object.defineProperty(U,"name",{value:P,writable:!1,configurable:!1}),U},D=N("addListener"),B=N("removeListener"),q=(P,I)=>{const U=D({eventName:P},I),W=async()=>{const x=await U;B({eventName:P,callbackId:x},I)},h=new Promise(x=>U.then(()=>x({remove:W})));return h.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await W()},h},Y=new Proxy({},{get(P,I){switch(I){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return y?q:D;case"removeListener":return B;default:return N(I)}}});return r[u]=Y,d.set(u,{name:u,proxy:Y,platforms:new Set([...Object.keys(f),...y?[g]:[]])}),Y};return a.convertFileSrc||(a.convertFileSrc=u=>u),a.getPlatform=s,a.handleError=l,a.isNativePlatform=n,a.isPluginAvailable=i,a.registerPlugin=p,a.Exception=Le,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},Lt=e=>e.Capacitor=At(e),A=Lt(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),z=A.registerPlugin;class xe{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,a){let r=!1;this.listeners[t]||(this.listeners[t]=[],r=!0),this.listeners[t].push(a);const n=this.windowListeners[t];n&&!n.registered&&this.addWindowListener(n),r&&this.sendRetainedArgumentsForEvent(t);const i=async()=>this.removeListener(t,a);return Promise.resolve({remove:i})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,a,r){const s=this.listeners[t];if(!s){if(r){let n=this.retainedEventArguments[t];n||(n=[]),n.push(a),this.retainedEventArguments[t]=n}return}s.forEach(n=>n(a))}hasListeners(t){var a;return!!(!((a=this.listeners[t])===null||a===void 0)&&a.length)}registerWindowListener(t,a){this.windowListeners[a]={registered:!1,windowEventName:t,pluginEventName:a,handler:r=>{this.notifyListeners(a,r)}}}unimplemented(t="not implemented"){return new A.Exception(t,te.Unimplemented)}unavailable(t="not available"){return new A.Exception(t,te.Unavailable)}async removeListener(t,a){const r=this.listeners[t];if(!r)return;const s=r.indexOf(a);this.listeners[t].splice(s,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const a=this.retainedEventArguments[t];a&&(delete this.retainedEventArguments[t],a.forEach(r=>{this.notifyListeners(t,r)}))}}const Ue=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Me=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class Ct extends xe{async getCookies(){const t=document.cookie,a={};return t.split(";").forEach(r=>{if(r.length<=0)return;let[s,n]=r.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=Me(s).trim(),n=Me(n).trim(),a[s]=n}),a}async setCookie(t){try{const a=Ue(t.key),r=Ue(t.value),s=t.expires?`; expires=${t.expires.replace("expires=","")}`:"",n=(t.path||"/").replace("path=",""),i=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${a}=${r||""}${s}; path=${n}; ${i};`}catch(a){return Promise.reject(a)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const a of t)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}z("CapacitorCookies",{web:()=>new Ct});const $t=async e=>new Promise((t,a)=>{const r=new FileReader;r.onload=()=>{const s=r.result;t(s.indexOf(",")>=0?s.split(",")[1]:s)},r.onerror=s=>a(s),r.readAsDataURL(e)}),Rt=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(s=>s.toLocaleLowerCase()).reduce((s,n,i)=>(s[n]=e[t[i]],s),{})},xt=(e,t=!0)=>e?Object.entries(e).reduce((r,s)=>{const[n,i]=s;let c,l;return Array.isArray(i)?(l="",i.forEach(d=>{c=t?encodeURIComponent(d):d,l+=`${n}=${c}&`}),l.slice(0,-1)):(c=t?encodeURIComponent(i):i,l=`${n}=${c}`),`${r}&${l}`},"").substr(1):null,Ot=(e,t={})=>{const a=Object.assign({method:e.method||"GET",headers:e.headers},t),s=Rt(e.headers)["content-type"]||"";if(typeof e.data=="string")a.body=e.data;else if(s.includes("application/x-www-form-urlencoded")){const n=new URLSearchParams;for(const[i,c]of Object.entries(e.data||{}))n.set(i,c);a.body=n.toString()}else if(s.includes("multipart/form-data")||e.data instanceof FormData){const n=new FormData;if(e.data instanceof FormData)e.data.forEach((c,l)=>{n.append(l,c)});else for(const c of Object.keys(e.data))n.append(c,e.data[c]);a.body=n;const i=new Headers(a.headers);i.delete("content-type"),a.headers=i}else(s.includes("application/json")||typeof e.data=="object")&&(a.body=JSON.stringify(e.data));return a};class Pt extends xe{async request(t){const a=Ot(t,t.webFetchExtra),r=xt(t.params,t.shouldEncodeUrlParams),s=r?`${t.url}?${r}`:t.url,n=await fetch(s,a),i=n.headers.get("content-type")||"";let{responseType:c="text"}=n.ok?t:{};i.includes("application/json")&&(c="json");let l,d;switch(c){case"arraybuffer":case"blob":d=await n.blob(),l=await $t(d);break;case"json":l=await n.json();break;default:l=await n.text()}const p={};return n.headers.forEach((u,f)=>{p[f]=u}),{data:l,headers:p,status:n.status,url:n.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}z("CapacitorHttp",{web:()=>new Pt});var Be;(function(e){e.Dark="DARK",e.Light="LIGHT",e.Default="DEFAULT"})(Be||(Be={}));var _e;(function(e){e.StatusBar="StatusBar",e.NavigationBar="NavigationBar"})(_e||(_e={}));class Dt extends xe{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}z("SystemBars",{web:()=>new Dt});const It="modulepreload",qt=function(e){return"/"+e},je={},Oe=function(t,a,r){let s=Promise.resolve();if(a&&a.length>0){let l=function(d){return Promise.all(d.map(p=>Promise.resolve(p).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),c=i?.nonce||i?.getAttribute("nonce");s=l(a.map(d=>{if(d=qt(d),d in je)return;je[d]=!0;const p=d.endsWith(".css"),u=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${u}`))return;const f=document.createElement("link");if(f.rel=p?"stylesheet":It,p||(f.as="script"),f.crossOrigin="",f.href=d,c&&f.setAttribute("nonce",c),document.head.appendChild(f),p)return new Promise((v,g)=>{f.addEventListener("load",v),f.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${d}`)))})}))}function n(i){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=i,window.dispatchEvent(c),!c.defaultPrevented)throw i}return s.then(i=>{for(const c of i||[])c.status==="rejected"&&n(c.reason);return t().catch(n)})};function Ft(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,a){return new Proxy({},{get(r,s){return(n,i,c)=>{const l=e.Capacitor.Plugins[a];if(l===void 0){c(new Error(`Capacitor plugin ${a} not found`));return}if(typeof l[s]!="function"){c(new Error(`Method ${s} not found in Capacitor plugin ${a}`));return}(async()=>{try{const d=await l[s](n);i(d)}catch(d){c(d)}})()}}})}})}function kt(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,a){return e.cordova.plugins[a]}})}function Ut(e=!1){typeof window>"u"||(window.CapacitorUtils=window.CapacitorUtils||{},window.Capacitor!==void 0&&!e?Ft(window):window.cordova!==void 0&&kt(window))}var ae;(function(e){e.Documents="DOCUMENTS",e.Data="DATA",e.Library="LIBRARY",e.Cache="CACHE",e.External="EXTERNAL",e.ExternalStorage="EXTERNAL_STORAGE",e.ExternalCache="EXTERNAL_CACHE",e.LibraryNoCloud="LIBRARY_NO_CLOUD",e.Temporary="TEMPORARY"})(ae||(ae={}));var he;(function(e){e.UTF8="utf8",e.ASCII="ascii",e.UTF16="utf16"})(he||(he={}));const ge=z("Filesystem",{web:()=>Oe(()=>import("./web--gB-S-tw.js"),[]).then(e=>new e.FilesystemWeb)});Ut();const rt=z("Share",{web:()=>Oe(()=>import("./web-DN2gA-qk.js"),[]).then(e=>new e.ShareWeb)});class Mt{constructor(t){this.sqlite=t,this._connectionDict=new Map}async initWebStore(){try{return await this.sqlite.initWebStore(),Promise.resolve()}catch(t){return Promise.reject(t)}}async saveToStore(t){try{return await this.sqlite.saveToStore({database:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async saveToLocalDisk(t){try{return await this.sqlite.saveToLocalDisk({database:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getFromLocalDiskToStore(t){const a=t??!0;try{return await this.sqlite.getFromLocalDiskToStore({overwrite:a}),Promise.resolve()}catch(r){return Promise.reject(r)}}async echo(t){try{const a=await this.sqlite.echo({value:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isSecretStored(){try{const t=await this.sqlite.isSecretStored();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async setEncryptionSecret(t){try{return await this.sqlite.setEncryptionSecret({passphrase:t}),Promise.resolve()}catch(a){return Promise.reject(a)}}async changeEncryptionSecret(t,a){try{return await this.sqlite.changeEncryptionSecret({passphrase:t,oldpassphrase:a}),Promise.resolve()}catch(r){return Promise.reject(r)}}async clearEncryptionSecret(){try{return await this.sqlite.clearEncryptionSecret(),Promise.resolve()}catch(t){return Promise.reject(t)}}async checkEncryptionSecret(t){try{const a=await this.sqlite.checkEncryptionSecret({passphrase:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async addUpgradeStatement(t,a){try{return t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.addUpgradeStatement({database:t,upgrade:a}),Promise.resolve()}catch(r){return Promise.reject(r)}}async createConnection(t,a,r,s,n){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.createConnection({database:t,encrypted:a,mode:r,version:s,readonly:n});const i=new He(t,n,this.sqlite),c=n?`RO_${t}`:`RW_${t}`;return this._connectionDict.set(c,i),Promise.resolve(i)}catch(i){return Promise.reject(i)}}async closeConnection(t,a){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.closeConnection({database:t,readonly:a});const r=a?`RO_${t}`:`RW_${t}`;return this._connectionDict.delete(r),Promise.resolve()}catch(r){return Promise.reject(r)}}async isConnection(t,a){const r={};t.endsWith(".db")&&(t=t.slice(0,-3));const s=a?`RO_${t}`:`RW_${t}`;return r.result=this._connectionDict.has(s),Promise.resolve(r)}async retrieveConnection(t,a){t.endsWith(".db")&&(t=t.slice(0,-3));const r=a?`RO_${t}`:`RW_${t}`;if(this._connectionDict.has(r)){const s=this._connectionDict.get(r);return typeof s<"u"?Promise.resolve(s):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async getNCDatabasePath(t,a){try{const r=await this.sqlite.getNCDatabasePath({path:t,database:a});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async createNCConnection(t,a){try{await this.sqlite.createNCConnection({databasePath:t,version:a});const r=new He(t,!0,this.sqlite),s=`RO_${t})`;return this._connectionDict.set(s,r),Promise.resolve(r)}catch(r){return Promise.reject(r)}}async closeNCConnection(t){try{await this.sqlite.closeNCConnection({databasePath:t});const a=`RO_${t})`;return this._connectionDict.delete(a),Promise.resolve()}catch(a){return Promise.reject(a)}}async isNCConnection(t){const a={},r=`RO_${t})`;return a.result=this._connectionDict.has(r),Promise.resolve(a)}async retrieveNCConnection(t){if(this._connectionDict.has(t)){const a=`RO_${t})`,r=this._connectionDict.get(a);return typeof r<"u"?Promise.resolve(r):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async isNCDatabase(t){try{const a=await this.sqlite.isNCDatabase({databasePath:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async retrieveAllConnections(){return this._connectionDict}async closeAllConnections(){const t=new Map;try{for(const a of this._connectionDict.keys()){const r=a.substring(3),s=a.substring(0,3)==="RO_";await this.sqlite.closeConnection({database:r,readonly:s}),t.set(a,null)}for(const a of t.keys())this._connectionDict.delete(a);return Promise.resolve()}catch(a){return Promise.reject(a)}}async checkConnectionsConsistency(){try{const t=[...this._connectionDict.keys()],a=[],r=[];for(const n of t)a.push(n.substring(0,2)),r.push(n.substring(3));const s=await this.sqlite.checkConnectionsConsistency({dbNames:r,openModes:a});return s.result||(this._connectionDict=new Map),Promise.resolve(s)}catch(t){return this._connectionDict=new Map,Promise.reject(t)}}async importFromJson(t){try{const a=await this.sqlite.importFromJson({jsonstring:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isJsonValid(t){try{const a=await this.sqlite.isJsonValid({jsonstring:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async copyFromAssets(t){const a=t??!0;try{return await this.sqlite.copyFromAssets({overwrite:a}),Promise.resolve()}catch(r){return Promise.reject(r)}}async getFromHTTPRequest(t,a){const r=a??!0;try{return await this.sqlite.getFromHTTPRequest({url:t,overwrite:r}),Promise.resolve()}catch(s){return Promise.reject(s)}}async isDatabaseEncrypted(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const a=await this.sqlite.isDatabaseEncrypted({database:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isInConfigEncryption(){try{const t=await this.sqlite.isInConfigEncryption();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isInConfigBiometricAuth(){try{const t=await this.sqlite.isInConfigBiometricAuth();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isDatabase(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{const a=await this.sqlite.isDatabase({database:t});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async getDatabaseList(){try{const a=(await this.sqlite.getDatabaseList()).values;a.sort();const r={values:a};return Promise.resolve(r)}catch(t){return Promise.reject(t)}}async getMigratableDbList(t){const a=t||"default";try{const r=await this.sqlite.getMigratableDbList({folderPath:a});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async addSQLiteSuffix(t,a){const r=t||"default",s=a||[];try{const n=await this.sqlite.addSQLiteSuffix({folderPath:r,dbNameList:s});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async deleteOldDatabases(t,a){const r=t||"default",s=a||[];try{const n=await this.sqlite.deleteOldDatabases({folderPath:r,dbNameList:s});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async moveDatabasesAndAddSuffix(t,a){const r=t||"default",s=a||[];return this.sqlite.moveDatabasesAndAddSuffix({folderPath:r,dbNameList:s})}}class He{constructor(t,a,r){this.dbName=t,this.readonly=a,this.sqlite=r}getConnectionDBName(){return this.dbName}getConnectionReadOnly(){return this.readonly}async open(){try{return await this.sqlite.open({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async close(){try{return await this.sqlite.close({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async beginTransaction(){try{const t=await this.sqlite.beginTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async commitTransaction(){try{const t=await this.sqlite.commitTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async rollbackTransaction(){try{const t=await this.sqlite.rollbackTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTransactionActive(){try{const t=await this.sqlite.isTransactionActive({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async loadExtension(t){try{return await this.sqlite.loadExtension({database:this.dbName,path:t,readonly:this.readonly}),Promise.resolve()}catch(a){return Promise.reject(a)}}async enableLoadExtension(t){try{return await this.sqlite.enableLoadExtension({database:this.dbName,toggle:t,readonly:this.readonly}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getUrl(){try{const t=await this.sqlite.getUrl({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getVersion(){try{const t=await this.sqlite.getVersion({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getTableList(){try{const t=await this.sqlite.getTableList({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async execute(t,a=!0,r=!0){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const s=await this.sqlite.execute({database:this.dbName,statements:t,transaction:a,readonly:!1,isSQL92:r});return Promise.resolve(s)}}catch(s){return Promise.reject(s)}}async query(t,a,r=!0){let s;try{return a&&a.length>0?s=await this.sqlite.query({database:this.dbName,statement:t,values:a,readonly:this.readonly,isSQL92:!0}):s=await this.sqlite.query({database:this.dbName,statement:t,values:[],readonly:this.readonly,isSQL92:r}),s=await this.reorderRows(s),Promise.resolve(s)}catch(n){return Promise.reject(n)}}async run(t,a,r=!0,s="no",n=!0){let i;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(a&&a.length>0?i=await this.sqlite.run({database:this.dbName,statement:t,values:a,transaction:r,readonly:!1,returnMode:s,isSQL92:!0}):i=await this.sqlite.run({database:this.dbName,statement:t,values:[],transaction:r,readonly:!1,returnMode:s,isSQL92:n}),i.changes=await this.reorderRows(i.changes),Promise.resolve(i))}catch(c){return Promise.reject(c)}}async executeSet(t,a=!0,r="no",s=!0){let n;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(n=await this.sqlite.executeSet({database:this.dbName,set:t,transaction:a,readonly:!1,returnMode:r,isSQL92:s}),n.changes=await this.reorderRows(n.changes),Promise.resolve(n))}catch(i){return Promise.reject(i)}}async isExists(){try{const t=await this.sqlite.isDBExists({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTable(t){try{const a=await this.sqlite.isTableExists({database:this.dbName,table:t,readonly:this.readonly});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async isDBOpen(){try{const t=await this.sqlite.isDBOpen({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async delete(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteDatabase({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async createSyncTable(){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const t=await this.sqlite.createSyncTable({database:this.dbName,readonly:!1});return Promise.resolve(t)}}catch(t){return Promise.reject(t)}}async setSyncDate(t){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.setSyncDate({database:this.dbName,syncdate:t,readonly:!1}),Promise.resolve())}catch(a){return Promise.reject(a)}}async getSyncDate(){try{const t=await this.sqlite.getSyncDate({database:this.dbName,readonly:this.readonly});let a="";return t.syncDate>0&&(a=new Date(t.syncDate*1e3).toISOString()),Promise.resolve(a)}catch(t){return Promise.reject(t)}}async exportToJson(t,a=!1){try{const r=await this.sqlite.exportToJson({database:this.dbName,jsonexportmode:t,readonly:this.readonly,encrypted:a});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async deleteExportedRows(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteExportedRows({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async executeTransaction(t,a=!0){let r=0,s=!1;if(this.readonly)return Promise.reject("not allowed in read-only mode");if(await this.sqlite.beginTransaction({database:this.dbName}),s=await this.sqlite.isTransactionActive({database:this.dbName}),!s)return Promise.reject("After Begin Transaction, no transaction active");try{for(const c of t){if(typeof c!="object"||!("statement"in c))throw new Error("Error a task.statement must be provided");if("values"in c&&c.values&&c.values.length>0){const l=c.statement.toUpperCase().includes("RETURNING")?"all":"no",d=await this.sqlite.run({database:this.dbName,statement:c.statement,values:c.values,transaction:!1,readonly:!1,returnMode:l,isSQL92:a});if(d.changes.changes<0)throw new Error("Error in transaction method run ");r+=d.changes.changes}else{const l=await this.sqlite.execute({database:this.dbName,statements:c.statement,transaction:!1,readonly:!1});if(l.changes.changes<0)throw new Error("Error in transaction method execute ");r+=l.changes.changes}}const n=await this.sqlite.commitTransaction({database:this.dbName});r+=n.changes.changes;const i={changes:{changes:r}};return Promise.resolve(i)}catch(n){const i=n.message?n.message:n;return await this.sqlite.rollbackTransaction({database:this.dbName}),Promise.reject(i)}}async reorderRows(t){const a=t;if(t?.values&&typeof t.values[0]=="object"&&Object.keys(t.values[0]).includes("ios_columns")){const r=t.values[0].ios_columns,s=[];for(let n=1;n<t.values.length;n++){const i=t.values[n],c={};for(const l of r)c[l]=i[l];s.push(c)}a.values=s}return Promise.resolve(a)}}const Bt=z("CapacitorSQLite",{web:()=>Oe(()=>import("./web-Bu5gKuX1.js"),[]).then(e=>new e.CapacitorSQLiteWeb),electron:()=>window.CapacitorCustomPlatform.plugins.CapacitorSQLite});function _t(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}const jt="laba101_offline",be="fresh_start_reset_v1",Ht=new Mt(Bt);let me=null;const H=[{id:1,name:"Laba101 Admin",email:"admin@laba101.test",password:"password",role:"admin",branch:"Main Store"},{id:2,name:"Gensan Staff",email:"staff@laba101.gensan",password:"password",role:"staff",branch:"Gensan Branch"}],Se=[],V=[M(1,"Drop-off","Wash, dry and fold.","Drop-Off","order",185,8,40,["Wash","Dry","Fold"],0,24),M(2,"Full Service","Wash, dry, fold, detergent and Fabcon.","Full Service","order",200,8,40,["Wash","Dry","Fold","Detergent","Fabcon"],0,24),M(3,"Self Service Wash","Max of 8kg per load.","Self Service","order",60,8,null,["Wash"],0,1),M(4,"Self Service Dry","Regular time: 40 mins drying time.","Self Service","order",70,8,40,["Dry"],0,1),M(5,"Dry Only","Standard drying rate.","Dry Only","order",70,8,40,["Dry"],0,1),M(6,"Additional Dry 10 mins","Additional drying time.","Add-on","addon",30,8,10,["Dry"],0,1),M(7,"Additional Dry 20 mins","Additional drying time.","Add-on","addon",50,8,20,["Dry"],0,1),M(8,"Additional Dry 40 mins","Additional drying time.","Add-on","addon",70,8,40,["Dry"],0,1),M(9,"Additional Zonrox","Extra Zonrox bleach add-on per load.","Add-on","addon",25,0,null,["Zonrox"],0,0),M(10,"Additional Fabcon","Extra Fabcon fabric conditioner add-on per load.","Add-on","addon",25,0,null,["Fabcon"],0,0),M(11,"Comforter / Bulky Load","Comforter 4kg max per load. Thin blankets, bedsheets, bath towels, pillow cases and curtains: 6kg max per load.","Comforter","order",200,8,40,["Wash","Dry","Fold"],0,24)],Q=[{id:1,name:"Regular Clothes",maxKg:8,additionalFee:0,isActive:1},{id:2,name:"Comforter",maxKg:4,additionalFee:0,isActive:1},{id:3,name:"Thin Blankets",maxKg:6,additionalFee:0,isActive:1},{id:4,name:"Bedsheets",maxKg:6,additionalFee:0,isActive:1},{id:5,name:"Bath Towels",maxKg:6,additionalFee:0,isActive:1},{id:6,name:"Curtains",maxKg:6,additionalFee:0,isActive:1}];function We(e,t){const a=L(e,[]),r=new Map(a.map(n=>[n.id,n])),s=t.map(n=>{const i=r.get(n.id);return i?{...n,...i,isActive:i.isActive??n.isActive}:n});(a.length!==s.length||s.some((n,i)=>n.id!==a[i]?.id||JSON.stringify(n)!==JSON.stringify(a[i])))&&E(e,s)}async function Wt(){We("services",V),We("item_categories",Q)}async function Te(e){for(const t of V)((await e.query("SELECT id FROM laundry_services WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive,t.id]):await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.description,t.category,t.serviceType,t.price,t.maxKg,t.dryingMinutes,JSON.stringify(t.includes),t.additionalCharge,t.turnaroundHours,t.isActive]);for(const t of Q)((await e.query("SELECT id FROM item_categories WHERE id = ?",[t.id])).values??[]).length>0?await e.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = COALESCE(isActive, ?) WHERE id = ?",[t.name,t.maxKg,t.additionalFee,t.isActive,t.id]):await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[t.id,t.name,t.maxKg,t.additionalFee,t.isActive])}const re=[],Ee=[],oe=[],ce=[],ne=[],X=[...[1,2,3,4].map(e=>({id:e,machineName:`Washer ${e}`,machineType:"washer",status:"available",branch:"Main Store"})),...[1,2,3,4].map(e=>({id:e+4,machineName:`Dryer ${e}`,machineType:"dryer",status:"available",branch:"Main Store"}))],se=[{key:"branch",value:"Main Store"},{key:"fold_rate",value:"5"},{key:"report_email",value:"admin@laba101.test"}];function M(e,t,a,r,s,n,i,c,l,d,p){return{id:e,name:t,description:a,category:r,serviceType:s,price:n,maxKg:i,dryingMinutes:c,includes:l,additionalCharge:d,turnaroundHours:p,isActive:1}}function F(e){return`laba101-mobile-${e}`}function L(e,t){const a=localStorage.getItem(F(e));if(!a)return structuredClone(t);try{return JSON.parse(a)}catch{return structuredClone(t)}}function E(e,t){localStorage.setItem(F(e),JSON.stringify(t))}function k(e){return e.reduce((t,a)=>Math.max(t,a.id),0)+1}function J(){return new Date().toISOString()}function Re(e=new Date){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${r}`}function Xt(){return Re().slice(2).replaceAll("-","")}function K(e,t){if(!e)return t;try{return JSON.parse(e)}catch{return t}}async function C(){return me||(me=await Ht.createConnection(jt,!1,"no-encryption",1,!1),await me.open()),me}async function O(e,t,a,r){((await e.query(`PRAGMA table_info(${t})`)).values??[]).some(i=>i.name===a)||await e.execute(`ALTER TABLE ${t} ADD COLUMN ${a} ${r}`)}function Kt(){const e=L("staff",H),t=new Map(e.map(r=>[r.id,r]));let a=!1;for(const r of H){const s=t.get(r.id);if(!s){t.set(r.id,{...r,isActive:1}),a=!0;continue}const n={...s,name:r.name,email:r.email,password:r.password,role:r.role,branch:r.branch,isActive:1};JSON.stringify(n)!==JSON.stringify(s)&&(t.set(r.id,n),a=!0)}a&&E("staff",Array.from(t.values()).sort((r,s)=>r.id-s.id))}async function Gt(){localStorage.getItem(F(be))||(E("staff",H),E("customers",[]),E("orders",[]),E("payments",[]),E("fold_logs",[]),E("expenses",[]),E("sales",[]),localStorage.getItem(F("services"))||E("services",V),localStorage.getItem(F("item_categories"))||E("item_categories",Q),localStorage.getItem(F("machines"))||E("machines",X),localStorage.getItem(F("subcleanings"))||E("subcleanings",[]),localStorage.getItem(F("settings"))||E("settings",se),localStorage.removeItem("laba101-mobile-session"),E(be,!0))}async function nt(e){for(const t of H){if(((await e.query("SELECT id FROM staff WHERE id = ?",[t.id])).values??[]).length>0){await e.run("UPDATE staff SET name = ?, email = ?, password = ?, role = ?, branch = ?, isActive = 1 WHERE id = ?",[t.name,t.email,t.password,t.role,t.branch,t.id]);continue}await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[t.id,t.name,t.email,t.password,t.role,t.branch,1])}}async function Vt(e){if(!(((await e.query("SELECT COUNT(*) as count FROM machines")).values?.[0]?.count??0)>0))for(const a of X)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[a.id,a.machineName,a.machineType,a.status,a.branch])}async function Yt(e){for(const t of se)await e.run("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)",[t.key,t.value])}async function Qt(e){((await e.query("SELECT value FROM settings WHERE key = ?",[be])).values??[]).length>0||(await e.execute(`
    DELETE FROM payments;
    DELETE FROM orders;
    DELETE FROM customers;
    DELETE FROM fold_logs;
    DELETE FROM disbursement_expenses;
    DELETE FROM daily_sales;
    DELETE FROM revolving_history;
    DELETE FROM staff WHERE id NOT IN (1, 2);
  `),await nt(e),await Vt(e),await Yt(e),await e.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",[be,J()]),localStorage.removeItem("laba101-mobile-session"))}async function Jt(){if(!A.isNativePlatform()){await Gt(),!localStorage.getItem(F("seeded_v4"))&&!localStorage.getItem(F("services"))&&!localStorage.getItem(F("staff"))&&(E("staff",H),E("customers",Se),E("services",V),E("item_categories",Q),E("orders",re),E("payments",Ee),E("fold_logs",[]),E("expenses",oe),E("sales",ce),E("revolving_history",ne),E("machines",X),E("subcleanings",[]),E("settings",se),E("seeded_v4",!0)),await Wt(),Kt(),localStorage.getItem(F("seeded_v4"))||E("seeded_v4",!0);return}const e=await C();if(await e.execute(`
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
  `),await O(e,"staff","email","TEXT"),await O(e,"staff","password","TEXT"),await O(e,"staff","role","TEXT"),await O(e,"staff","isActive","INTEGER NOT NULL DEFAULT 1"),await e.run('UPDATE staff SET password = ? WHERE password IS NULL OR password = ""',["password"]),await e.run('UPDATE staff SET role = ? WHERE role IS NULL OR role = ""',["staff"]),await O(e,"orders","customerId","INTEGER NOT NULL DEFAULT 0"),await O(e,"orders","phone","TEXT"),await O(e,"orders","serviceId","INTEGER NOT NULL DEFAULT 0"),await O(e,"orders","serviceLines","TEXT"),await O(e,"orders","itemCategoryId","INTEGER NOT NULL DEFAULT 0"),await O(e,"orders","itemCategory",'TEXT NOT NULL DEFAULT "Regular Clothes"'),await O(e,"orders","workflowCompleted","TEXT"),await O(e,"orders","weightKg","REAL NOT NULL DEFAULT 0"),await O(e,"orders","price","REAL NOT NULL DEFAULT 0"),await O(e,"orders","additionalCharge","REAL NOT NULL DEFAULT 0"),await O(e,"orders","extraServiceAmount","REAL NOT NULL DEFAULT 0"),await O(e,"orders","totalAmount","REAL NOT NULL DEFAULT 0"),await O(e,"orders","paidAmount","REAL NOT NULL DEFAULT 0"),await O(e,"orders","extras","TEXT"),await O(e,"orders","notes","TEXT"),await O(e,"orders","dueAt","TEXT"),await O(e,"orders","createdAt",'TEXT NOT NULL DEFAULT ""'),await O(e,"daily_sales","saleNumber","TEXT"),await O(e,"daily_sales","status","TEXT"),await O(e,"daily_sales","endorsedTo","TEXT"),await O(e,"daily_sales","statusUpdatedAt","TEXT"),((await e.query("SELECT COUNT(*) as count FROM staff")).values?.[0]?.count??0)===0){for(const a of H)await e.run("INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.name,a.email,a.password,a.role,a.branch,1]);for(const a of Se)await e.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[a.id,a.name,a.phone,a.address]);for(const a of V)await e.run("INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[a.id,a.name,a.description,a.category,a.serviceType,a.price,a.maxKg,a.dryingMinutes,JSON.stringify(a.includes),a.additionalCharge,a.turnaroundHours,a.isActive]);for(const a of Q)await e.run("INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)",[a.id,a.name,a.maxKg,a.additionalFee,a.isActive]);for(const a of re)await st(e,a);for(const a of Ee)await e.run("INSERT INTO payments (id, orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.orderId,a.amount,a.method,a.reference,a.receivedAt,a.branch]);for(const a of oe)await e.run("INSERT INTO disbursement_expenses (id, expenseDate, number, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.expenseDate,a.number,a.name,a.category,a.description,a.amount]);for(const a of ce)await e.run("INSERT INTO daily_sales (id, saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?, ?)",[a.id,a.saleDate,a.saleNumber,a.cashAmount,a.gcashAmount,a.totalAmount,a.notes]);for(const a of ne)await e.run("INSERT INTO revolving_history (id, revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[a.id,a.revolvingNumber,a.name,a.amount,a.category,a.description,a.type,a.createdAt]);for(const a of X)await e.run("INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)",[a.id,a.machineName,a.machineType,a.status,a.branch]);for(const a of se)await e.run("INSERT INTO settings (key, value) VALUES (?, ?)",[a.key,a.value])}await Te(e),await nt(e),await Qt(e)}async function st(e,t){await e.run("INSERT INTO orders (id, ticket, customerId, customer, phone, serviceId, service, serviceLines, itemCategoryId, itemCategory, branch, status, workflowCompleted, weightKg, price, additionalCharge, extraServiceAmount, totalAmount, paidAmount, extras, notes, foldedBy, dueAt, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[t.id,t.ticket,t.customerId,t.customer,t.phone,t.serviceId,t.service,JSON.stringify(t.serviceLines??[]),t.itemCategoryId,t.itemCategory,t.branch,t.status,JSON.stringify(t.workflowCompleted),t.weightKg,t.price,t.additionalCharge,t.extraServiceAmount,t.totalAmount,t.paidAmount,JSON.stringify(t.extras),t.notes,t.foldedBy,t.dueAt,t.createdAt])}function zt(e){const t=Number(e.paidAmount??0),a=Number(e.totalAmount??0),r=Number(e.foldedBy),s=K(e.serviceLines,[]),n=Number(e.serviceId),i=String(e.service),c=Number(e.price);return{id:Number(e.id),ticket:String(e.ticket),customerId:Number(e.customerId),customer:String(e.customer),phone:e.phone?String(e.phone):null,serviceId:n,service:i,serviceLines:s.length?s:[{id:n,name:i,price:c,quantity:1,total:c}],itemCategoryId:Number(e.itemCategoryId),itemCategory:String(e.itemCategory),branch:String(e.branch),status:String(e.status),workflowCompleted:K(e.workflowCompleted,[]),weightKg:Number(e.weightKg),price:c,additionalCharge:Number(e.additionalCharge),extraServiceAmount:Number(e.extraServiceAmount),totalAmount:a,paidAmount:t,balance:Number((a-t).toFixed(2)),extras:K(e.extras,[]),notes:e.notes?String(e.notes):null,foldedBy:Number.isFinite(r)&&r>0?r:null,foldedByName:e.foldedByName?String(e.foldedByName):null,dueAt:String(e.dueAt),createdAt:String(e.createdAt)}}async function Zt(){await Jt()}async function Ne(){return(await Pe()).find(t=>t.key==="branch")?.value??"Main Store"}async function ea(){const e=await Pe();return Number(e.find(t=>t.key==="fold_rate")?.value??"5")}async function it(e){return(await Pe()).find(a=>a.key===e)?.value}async function Pe(){return A.isNativePlatform()?(await(await C()).query("SELECT key, value FROM settings ORDER BY key")).values??[]:L("settings",se)}async function ye(e,t){if(!A.isNativePlatform()){const r=L("settings",se).filter(s=>s.key!==e);r.push({key:e,value:t}),E("settings",r);return}await(await C()).run("REPLACE INTO settings (key, value) VALUES (?, ?)",[e,t])}async function ta(e){return A.isNativePlatform()?(await(await C()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff WHERE branch = ? ORDER BY name ASC',[e])).values??[]:L("staff",H).filter(r=>r.branch===e)}async function ot(){return A.isNativePlatform()?(await(await C()).query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff ORDER BY name ASC')).values??[]:L("staff",H)}async function ct(e,t){const a=e.trim().toLowerCase();return(await ot()).find(s=>s.email.toLowerCase()===a&&s.password===t&&s.isActive!==0)??null}async function aa(e){if(!A.isNativePlatform()){const a=L("staff",H);a.unshift({id:k(a),...e,isActive:1}),E("staff",a);return}await(await C()).run("INSERT INTO staff (name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?)",[e.name,e.email,e.password,e.role,e.branch,1])}async function Xe(e,t){if(!A.isNativePlatform()){const n=L("staff",H),i=n.find(c=>c.id===e);i&&(Object.assign(i,t),E("staff",n));return}const a=await C(),r=[],s=[];for(const[n,i]of Object.entries(t))n!=="id"&&(r.push(`${n} = ?`),s.push(i));r.length&&(s.push(e),await a.run(`UPDATE staff SET ${r.join(", ")} WHERE id = ?`,s))}async function ra(){return A.isNativePlatform()?(await(await C()).query("SELECT id, name, phone, address FROM customers ORDER BY name ASC")).values??[]:L("customers",Se).sort((a,r)=>a.name.localeCompare(r.name))}async function na(e){if(!A.isNativePlatform()){const s=L("customers",Se),n=e.id?s.find(c=>c.id===e.id):s.find(c=>c.name.toLowerCase()===e.name.toLowerCase()&&(e.phone?c.phone===e.phone:!0));if(n)return n.name=e.name,n.phone=e.phone??n.phone,n.address=e.address??n.address,E("customers",s),n;const i={id:k(s),name:e.name,phone:e.phone??null,address:e.address??null};return s.push(i),E("customers",s),i}const t=await C();if(e.id)return await t.run("UPDATE customers SET name = ?, phone = ?, address = ? WHERE id = ?",[e.name,e.phone??null,e.address??null,e.id]),{id:e.id,name:e.name,phone:e.phone??null,address:e.address??null};const a=await t.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM customers"),r=Number((a.values?.[0]).id);return await t.run("INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)",[r,e.name,e.phone??null,e.address??null]),{id:r,name:e.name,phone:e.phone??null,address:e.address??null}}async function De(e){if(!A.isNativePlatform())return L("services",V).filter(r=>!0);const t=await C(),a=await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[]);return(a.values??[]).length===0?(await Te(t),((await t.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services  ORDER BY name ASC",[])).values??[]).map(s=>({...s,includes:K(s.includes,[])}))):(a.values??[]).map(r=>({...r,includes:K(r.includes,[])}))}async function sa(){if(!A.isNativePlatform())return L("services",V);const e=await C(),t=await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC");return(t.values??[]).length===0?(await Te(e),((await e.query("SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC")).values??[]).map(r=>({...r,includes:K(r.includes,[])}))):(t.values??[]).map(a=>({...a,includes:K(a.includes,[])}))}async function Ke(e){if(!A.isNativePlatform()){const a=L("services",V),r=e.id?a.find(s=>s.id===e.id):null;r?Object.assign(r,e):a.unshift({...e,id:k(a)}),E("services",a);return}const t=await C();e.id?await t.run("UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = ? WHERE id = ?",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive,e.id]):await t.run("INSERT INTO laundry_services (name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[e.name,e.description,e.category,e.serviceType,e.price,e.maxKg,e.dryingMinutes,JSON.stringify(e.includes),e.additionalCharge,e.turnaroundHours,e.isActive])}async function lt(){if(!A.isNativePlatform())return L("item_categories",Q).filter(a=>a.isActive);const e=await C(),t=await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC");return(t.values??[]).length===0?(await Te(e),(await e.query("SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC")).values??[]):t.values??[]}async function ia(e){if(!A.isNativePlatform()){const a=L("item_categories",Q),r=e.id?a.find(s=>s.id===e.id):null;r?Object.assign(r,e):a.unshift({...e,id:k(a)}),E("item_categories",a);return}const t=await C();e.id?await t.run("UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = ? WHERE id = ?",[e.name,e.maxKg,e.additionalFee,e.isActive,e.id]):await t.run("INSERT INTO item_categories (name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?)",[e.name,e.maxKg,e.additionalFee,e.isActive])}function dt(e,t,a,r){const s=(Array.isArray(e)?e:[e]).map(f=>{const v=Math.max(0,Number(f.quantity??1)),g=Number(f.price);return{id:f.id,name:f.name,price:g,quantity:v,total:Number((g*v).toFixed(2))}}).filter(f=>f.quantity>0),n=Number(t.maxKg),i=0,c=0,l=r.map(f=>{const v=Math.max(0,Number(f.quantity??1)),g=Number(f.price);return{id:f.id,name:_t(f.name),price:g,quantity:v,total:Number((g*v).toFixed(2))}}).filter(f=>f.quantity>0),d=s.reduce((f,v)=>f+v.total,0),p=l.reduce((f,v)=>f+v.total,0),u=Number((d+c+p).toFixed(2));return{price:Number(d.toFixed(2)),additionalCharge:Number(c.toFixed(2)),extraServiceAmount:Number(p.toFixed(2)),totalAmount:u,allowedKg:n,extraKg:Number(i.toFixed(2)),warning:null,serviceLines:s,extras:l}}function ut(e,t){const a=e.serviceLines?.length?e.serviceLines.map(i=>i.id):[e.serviceId],r=t.filter(i=>a.includes(i.id)),s=Array.from(new Set(r.flatMap(i=>i.includes??[]))),n=[{key:"received",label:"Received"}];return s.includes("Wash")&&n.push({key:"wash",label:"Wash"}),e.extras.length&&n.push({key:"extras",label:"Extra services"}),(s.includes("Dry")||r.some(i=>(i.dryingMinutes??0)>0))&&n.push({key:"dry",label:"Dry"}),s.includes("Fold")&&n.push({key:"fold",label:"Fold"}),n.push({key:"ready",label:"Ready"},{key:"claimed",label:"Claimed"}),n}function oa(e){return e.includes("claimed")?"claimed":e.includes("ready")?"ready":e.includes("dry")?"drying":e.includes("extras")||e.includes("wash")?"washing":"received"}async function Ae(e){return A.isNativePlatform()?((await(await C()).query("SELECT o.*, s.name as foldedByName FROM orders o LEFT JOIN staff s ON s.id = o.foldedBy WHERE o.branch = ? ORDER BY o.id DESC",[e])).values??[]).map(r=>zt(r)):L("orders",re).filter(r=>r.branch===e).map(r=>({...r,serviceLines:r.serviceLines??[{id:r.serviceId,name:r.service,price:Number(r.price),quantity:1,total:Number(r.price)}],balance:Number((r.totalAmount-r.paidAmount).toFixed(2))}))}async function ca(e){const[t,a]=await Promise.all([De(),lt()]),r=e.serviceQuantities??(e.serviceId?{[e.serviceId]:1}:{}),s=t.filter(w=>w.serviceType==="order"&&Number(r[w.id]??0)>0).map(w=>({...w,quantity:Number(r[w.id]??0)})),n=s[0],i=a.find(w=>w.id===e.itemCategoryId)??a.find(w=>w.name.toLowerCase()===(n?.category??"").toLowerCase())??a.find(w=>w.name==="Regular Clothes")??a[0];if(!s.length||!n||!i)throw new Error("Please select at least one service.");const c=e.addonQuantities??Object.fromEntries((e.addonIds??[]).map(w=>[w,1])),l=t.filter(w=>w.serviceType==="addon"&&Number(c[w.id]??0)>0).map(w=>({...w,quantity:Number(c[w.id]??0)})),d=e.weightKg??Math.max(1,Number(i.maxKg||n.maxKg||1)),p=dt(s,i,d,l),u=await na({id:e.customerId||void 0,name:e.customerName,phone:e.customerPhone??null}),f=Math.max(0,e.paidAmount),v=Math.min(p.totalAmount,f),g={ticket:await la(),customerId:u.id,customer:u.name,phone:u.phone,serviceId:n.id,service:p.serviceLines.map(w=>`${w.name} x${w.quantity}`).join(", "),serviceLines:p.serviceLines,itemCategoryId:i.id,itemCategory:i.name,branch:e.branch,status:"received",workflowCompleted:["received"],weightKg:d,price:p.price,additionalCharge:p.additionalCharge,extraServiceAmount:p.extraServiceAmount,totalAmount:p.totalAmount,paidAmount:v,balance:Number((p.totalAmount-v).toFixed(2)),extras:p.extras,notes:e.notes||null,foldedBy:null,foldedByName:null,dueAt:new Date(Date.now()+Math.max(...s.map(w=>w.turnaroundHours))*60*60*1e3).toISOString(),createdAt:J()};if(!A.isNativePlatform()){const w=L("orders",re),N={...g,id:k(w)};return w.unshift(N),E("orders",w),f>0&&await mt(N.id,{amount:f,method:e.paymentMethod,reference:e.paymentReference??null}),N}const y=await C(),b=await y.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM orders"),T={...g,id:Number((b.values?.[0]).id)};return await st(y,T),f>0&&await y.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[T.id,f,e.paymentMethod,e.paymentReference??null,J(),e.branch]),T}async function la(){const e=`LB${Xt()}`,t=await Ne(),r=(await Ae(t)).filter(n=>n.ticket.startsWith(e)).sort((n,i)=>i.ticket.localeCompare(n.ticket))[0],s=r?Number(r.ticket.slice(-3))+1:1;return`${e}-${String(s).padStart(3,"0")}`}async function da(e,t){const a=await Ne(),[r,s]=await Promise.all([Ae(a),De()]),n=r.find(d=>d.id===e);if(!n)return;const c=ut(n,s).map(d=>d.key).find(d=>!n.workflowCompleted.includes(d));if(!c)return;if(n.workflowCompleted=[...n.workflowCompleted,c],n.status=oa(n.workflowCompleted),c==="fold"&&t&&(n.foldedBy=t),!A.isNativePlatform()){const d=L("orders",re),p=d.find(u=>u.id===n.id);p&&Object.assign(p,n),E("orders",d);return}await(await C()).run("UPDATE orders SET workflowCompleted = ?, status = ?, foldedBy = ? WHERE id = ?",[JSON.stringify(n.workflowCompleted),n.status,n.foldedBy,n.id])}async function mt(e,t){const a=await Ne();if(!(await Ae(a)).find(c=>c.id===e))return;const n=Math.max(0,t.amount);if(n<=0)return;if(!A.isNativePlatform()){const c=L("payments",Ee);c.unshift({id:k(c),orderId:e,amount:n,method:t.method,reference:t.reference??null,receivedAt:J(),branch:a}),E("payments",c);const l=L("orders",re),d=l.find(p=>p.id===e);d&&(d.paidAmount=Math.min(d.totalAmount,Number((d.paidAmount+n).toFixed(2)))),E("orders",l);return}const i=await C();await i.run("INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)",[e,n,t.method,t.reference??null,J(),a]),await i.run("UPDATE orders SET paidAmount = MIN(totalAmount, paidAmount + ?) WHERE id = ?",[n,e])}async function ua(e){return A.isNativePlatform()?(await(await C()).query("SELECT id, orderId, amount, method, reference, receivedAt, branch FROM payments  ORDER BY receivedAt DESC",[])).values??[]:L("payments",Ee).filter(r=>!0)}async function ma(){return A.isNativePlatform()?(await(await C()).query("SELECT id, orderTicket, staffName, foldCount, rate, total, createdAt FROM fold_logs ORDER BY id DESC")).values??[]:L("fold_logs",[])}async function va(e){const t=Number((e.foldCount*e.rate).toFixed(2));if(!A.isNativePlatform()){const r=L("fold_logs",[]);r.unshift({id:Date.now(),...e,total:t,createdAt:J()}),E("fold_logs",r);return}await(await C()).run("INSERT INTO fold_logs (orderTicket, staffName, foldCount, rate, total, createdAt) VALUES (?, ?, ?, ?, ?, ?)",[e.orderTicket,e.staffName,e.foldCount,e.rate,t,J()])}async function pa(){return A.isNativePlatform()?(await(await C()).query("SELECT id, expenseDate, number, name, category, description, amount FROM disbursement_expenses ORDER BY expenseDate DESC, id DESC")).values??[]:L("expenses",oe)}function Ce(e){const t=/^DISB-(\d+)$/i.exec(String(e??"").trim());return t?Number(t[1]):0}function Ge(e){const t=/^REV-(\d+)$/i.exec(String(e??"").trim());return t?Number(t[1]):0}async function fa(){let e=0;if(!A.isNativePlatform()){const s=L("expenses",oe),n=L("revolving_history",ne);for(const i of s)e=Math.max(e,Ce(i.number));for(const i of n)i.type==="disbursement"&&(e=Math.max(e,Ce(i.revolvingNumber)));return e}const t=await C(),a=await t.query("SELECT number FROM disbursement_expenses"),r=await t.query("SELECT revolvingNumber as number FROM revolving_history WHERE type = 'disbursement'");for(const s of[...a.values??[],...r.values??[]])e=Math.max(e,Ce(String(s.number)));return e}async function vt(){const e=await fa()+1;return`DISB-${String(e).padStart(2,"0")}`}async function ya(){let e=0;if(!A.isNativePlatform()){const r=L("revolving_history",ne);for(const s of r)s.type==="add"&&(e=Math.max(e,Ge(s.revolvingNumber)));return`REV-${String(e+1).padStart(2,"0")}`}const a=await(await C()).query("SELECT revolvingNumber FROM revolving_history WHERE type = 'add'");for(const r of a.values??[])e=Math.max(e,Ge(String(r.revolvingNumber)));return`REV-${String(e+1).padStart(2,"0")}`}async function pt(e){if(!A.isNativePlatform()){const a=L("expenses",oe),r=k(a);a.unshift({id:r,expenseDate:e.expenseDate,number:e.number,name:e.name,category:e.category,description:e.description||null,amount:e.amount}),E("expenses",a);return}await(await C()).run("INSERT INTO disbursement_expenses (expenseDate, number, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?)",[e.expenseDate,e.number,e.name,e.category,e.description||null,e.amount])}async function ha(e){const t=await vt();await pt({expenseDate:e.expenseDate,number:t,name:e.name,category:e.category,description:e.description,amount:e.amount})}async function ga(){return A.isNativePlatform()?(await(await C()).query('SELECT id, saleDate, COALESCE(saleNumber, "") as saleNumber, cashAmount, gcashAmount, totalAmount, notes, status, endorsedTo, statusUpdatedAt FROM daily_sales ORDER BY saleDate DESC, id DESC')).values??[]:L("sales",ce)}async function ba(e){const t=Number((e.cashAmount+e.gcashAmount).toFixed(2));if(!A.isNativePlatform()){const n=L("sales",ce),i=n.find(c=>c.saleDate===e.saleDate);if(i)Object.assign(i,{cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null});else{const c=k(n);n.unshift({id:c,saleDate:e.saleDate,saleNumber:`SALE-${String(c).padStart(2,"0")}`,cashAmount:e.cashAmount,gcashAmount:e.gcashAmount,totalAmount:t,notes:e.notes||null})}E("sales",n);return}const a=await C(),s=(await a.query("SELECT id, saleNumber FROM daily_sales WHERE saleDate = ?",[e.saleDate])).values?.[0];if(s)await a.run("UPDATE daily_sales SET cashAmount = ?, gcashAmount = ?, totalAmount = ?, notes = ? WHERE id = ?",[e.cashAmount,e.gcashAmount,t,e.notes||null,s.id]);else{const n=await a.query("SELECT COALESCE(MAX(id), 0) + 1 as id FROM daily_sales"),i=Number((n.values?.[0]).id);await a.run("INSERT INTO daily_sales (saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?)",[e.saleDate,`SALE-${String(i).padStart(2,"0")}`,e.cashAmount,e.gcashAmount,t,e.notes||null])}}async function Ve(e,t,a=null,r){if(!A.isNativePlatform()){const n=L("sales",ce),i=n.find(c=>c.id===e);i&&(i.status=t,i.endorsedTo=a,i.statusUpdatedAt=r,E("sales",n));return}await(await C()).run("UPDATE daily_sales SET status = ?, endorsedTo = ?, statusUpdatedAt = ? WHERE id = ?",[t,a,r,e])}async function Sa(){return A.isNativePlatform()?(await(await C()).query("SELECT id, revolvingNumber, name, amount, category, description, type, createdAt FROM revolving_history ORDER BY createdAt DESC, id DESC")).values??[]:L("revolving_history",ne).sort((a,r)=>r.createdAt.localeCompare(a.createdAt))}async function Ye(e){const t=e.type==="disbursement"?await vt():await ya();if(e.type==="disbursement"){const r=e.expenseDate??e.createdAt.slice(0,10);await pt({expenseDate:r,number:t,name:e.name,category:e.category,description:e.description??"",amount:e.amount})}if(!A.isNativePlatform()){const r=L("revolving_history",ne),s=k(r);r.unshift({id:s,revolvingNumber:t,...e}),E("revolving_history",r);return}await(await C()).run("INSERT INTO revolving_history (revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)",[t,e.name,e.amount,e.category,e.description||null,e.type,e.createdAt])}async function ft(e){return A.isNativePlatform()?(await(await C()).query("SELECT id, machineName, machineType, status, branch FROM machines WHERE branch = ? ORDER BY machineType, machineName",[e])).values??[]:L("machines",X).filter(r=>r.branch===e)}async function Ea(e){if(!A.isNativePlatform()){const a=L("machines",X);a.unshift({id:k(a),...e}),E("machines",a);return}await(await C()).run("INSERT INTO machines (machineName, machineType, status, branch) VALUES (?, ?, ?, ?)",[e.machineName,e.machineType,e.status,e.branch])}async function wa(e,t){if(!A.isNativePlatform()){const r=L("machines",X),s=r.find(n=>n.id===e);s&&(s.status=t,E("machines",r));return}await(await C()).run("UPDATE machines SET status = ? WHERE id = ?",[t,e])}async function Ta(e){return A.isNativePlatform()?((await(await C()).query("SELECT id, date, machineIds, machineNames, cleaningStatus, notes, branch FROM subcleanings WHERE branch = ? ORDER BY date DESC, id DESC",[e])).values??[]).map(r=>({...r,machineIds:K(r.machineIds,[])})):L("subcleanings",[]).filter(r=>r.branch===e)}async function Na(e){const a=(await ft(e.branch)).filter(n=>e.machineIds.includes(n.id)).map(n=>n.machineName).join(", ");if(!A.isNativePlatform()){const n=L("subcleanings",[]);n.unshift({id:k(n),date:e.date,machineIds:e.machineIds,machineNames:a,cleaningStatus:e.cleaningStatus,notes:e.notes||null,branch:e.branch}),E("subcleanings",n);const i=L("machines",X);i.forEach(c=>{e.machineIds.includes(c.id)&&(c.status=e.cleaningStatus==="completed"?"available":"under_cleaning")}),E("machines",i);return}const r=await C();await r.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, notes, branch) VALUES (?, ?, ?, ?, ?, ?)",[e.date,JSON.stringify(e.machineIds),a,e.cleaningStatus,e.notes||null,e.branch]);const s=e.cleaningStatus==="completed"?"available":"under_cleaning";for(const n of e.machineIds)await r.run("UPDATE machines SET status = ? WHERE id = ?",[s,n])}async function Aa(e,t){if(!A.isNativePlatform()){const i=L("machines",X),c=i.find(p=>p.id===e);c&&(c.status="available"),E("machines",i);const l=L("subcleanings",[]),d=Re();l.unshift({id:k(l),date:d,machineIds:[e],machineNames:c?.machineName??"",cleaningStatus:"completed",notes:null,branch:t}),E("subcleanings",l);return}const a=await C(),s=(await a.query("SELECT machineName FROM machines WHERE id = ?",[e])).values?.[0]?.machineName??"";await a.run("UPDATE machines SET status = ? WHERE id = ?",["available",e]);const n=Re();await a.run("INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, notes, branch) VALUES (?, ?, ?, ?, ?, ?)",[n,JSON.stringify([e]),s,"completed",null,t])}const Ie=document.querySelector("#app");if(!Ie)throw new Error("App root not found");let ve;const ie=z("BluetoothThermalPrinter"),qe={dashboard:"Dashboard",pos:"POS",orders:"Orders",archived:"Archived Order",customers:"Customers",pricing:"Pricing Services",disbursements:"Daily Report",reports:"Reports",inventory:"Inventory",maintenance:"Maintenance",staff:"Staff",revolving:"Revolving Fund",settings:"Settings"},o={tab:"dashboard",receiptOrderId:0,currentUser:null,loginError:"",sidebarOpen:!1,dailyReportTab:"expenses",maintenanceTab:"cleaning",customerSearch:"",orderSearch:"",orderDateFilter:"",orderPaymentFilter:"",printerPanelOpen:!1,printerLoading:!1,printerError:"",printerStatus:"",printerPaperWidth:58,pairedPrinters:[],selectedPrinterAddress:"",archivedOrderSearch:"",reportPreview:null,endorseModalOpen:!1,endorseSaleId:0,endorseSaleDate:"",revolvingModalOpen:!1,revolvingSaleId:0,addFundModalOpen:!1,disbursementModalOpen:!1,revolvingHistoryFrom:"",revolvingHistoryTo:""},La=["Wash","Dry","Fold","Detergent","Fabcon","Zonrox"],le="laba101-mobile-session";function $(e){return new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(e||0)}function m(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function G(e){return e.replace(/^(add[- ]?on|additional)\s+/i,"").trim()}function yt(e,t){return Number((e-t).toFixed(2))}function ht(e,t,a,r=0){const s=t.filter(i=>_(i.createdAt)===e).reduce((i,c)=>i+c.paidAmount,0),n=a.filter(i=>i.expenseDate===e).reduce((i,c)=>i+c.amount,0);return yt(s+r,n)}function Ca(e){const t=new Map;return e.filter(a=>a.workflowCompleted.includes("fold")&&a.foldedByName).forEach(a=>{const r=a.foldedByName,s=t.get(r)??{staffName:r,folds:0};s.folds+=1,t.set(r,s)}),Array.from(t.values())}function de(e=new Date){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${r}`}function j(){return de()}function _(e){return de(new Date(e))}function Fe(e){return e.paidAmount<=0?"unpaid":e.balance>0?"partial":"paid"}function ee(e){return new Intl.DateTimeFormat("en-PH",{dateStyle:"medium",timeStyle:"short"}).format(new Date(e))}function $a(e){const t=new Date(e),a=new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric",year:"numeric"}).format(t),r=new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",hour12:!0}).format(t);return`<div class="datetime-stack"><strong>${m(a)}</strong><span class="meta">${m(r)}</span></div>`}function Ra(e){return e?.role==="staff"&&e.branch==="Gensan Branch"}function we(e,t,a="data-table"){return`
    <div class="table-scroll">
      <table class="${a}">
        <thead><tr>${e.map(r=>`<th>${m(r)}</th>`).join("")}</tr></thead>
        <tbody>${t.length?t.map(r=>`<tr>${r.map(s=>`<td>${s}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${e.length}" class="table-empty">No records found.</td></tr>`}</tbody>
      </table>
    </div>
  `}function xa(e=new Date){return{date:new Intl.DateTimeFormat("en-PH",{weekday:"long",month:"long",day:"numeric",year:"numeric"}).format(e),time:new Intl.DateTimeFormat("en-PH",{hour:"numeric",minute:"2-digit",second:"2-digit",hour12:!0}).format(e)}}function pe(){const e=document.querySelector("[data-date-from]"),t=document.querySelector("[data-date-to]"),a=Array.from(document.querySelectorAll('input[name="reportType"]:checked')).map(r=>r.value).filter(r=>r==="sales"||r==="disbursement"||r==="fold_count"||r==="revolving_fund"||r==="summary");return{from:e?.value||"0000-01-01",to:t?.value||"9999-12-31",types:a.length?a:["summary"]}}function fe(e,t){return e>=t.from&&e<=t.to}function gt(e,t,a,r,s,n){const i=new Set(n.types),c=e.filter(h=>fe(_(h.createdAt),n)),l=t.filter(h=>fe(h.saleDate,n)),d=a.filter(h=>fe(h.expenseDate,n)),p=Ca(c),u=c.reduce((h,x)=>h+x.paidAmount,0),f=l.reduce((h,x)=>h+x.cashAmount,0),v=l.reduce((h,x)=>h+x.gcashAmount,0),g=0,y=u+f,b=g+v,T=y+b,w=d.reduce((h,x)=>h+x.amount,0),N=w,D=T-N,B=()=>({orderCashTotal:u,orderGcashTotal:g,manualCashTotal:f,manualGcashTotal:v,totalCash:y,totalGcash:b,totalSales:T,rows:[["Type","Date","Number","Name","Cash","GCash","Total","Balance"],...c.map(h=>["Order",_(h.createdAt),h.ticket,h.customer,h.paidAmount,0,h.paidAmount,h.balance]),...l.map(h=>["Manual Sale",h.saleDate,h.saleNumber,h.notes??"",h.cashAmount,h.gcashAmount,h.totalAmount,""]),[],["Sales Summary",n.from,"to",n.to,"","","",""],["Order Cash","","","","","",u,""],["Order GCash","","","","","",g,""],["Manual Cash","","","","","",f,""],["Manual GCash","","","","","",v,""],["Total Cash","","","","","",y,""],["Total GCash","","","","","",b,""],["Total Sales","","","","","",T,""]]}),q=()=>({totalExpenses:w,totalDisbursement:N,rows:[["Type","Date","Number","Name","Amount"],...d.map(h=>["Expense",h.expenseDate,h.number,h.name,h.amount]),[],["Disbursement Summary",n.from,"to",n.to,""],["Expenses","","","",w],["Total Disbursement","","","",N]]}),Y=()=>({rows:[["Staff","Fold Count"],...p.map(h=>[h.staffName,h.folds]),[],["Total Folds",p.reduce((h,x)=>h+x.folds,0)]]}),P=r.filter(h=>fe(_(h.createdAt),n));return{selection:n,selectedTypes:i,salesRows:B,disbursementRows:q,foldCountRows:Y,revolvingDailySummaryRows:()=>({rows:[["Date of Sales","Cash on Hand","Status","Date Update"],...l.map(h=>{const x=ht(h.saleDate,e,a,h.cashAmount),Z=h.status==="revolving"?"Revolving":h.status==="endorsed"?`Endorsed to ${h.endorsedTo??""}`:"Pending";return[h.saleDate,x,Z,h.statusUpdatedAt?_(h.statusUpdatedAt):""]})]}),revolvingHistoryRows:()=>({rows:[["Date","Number","Name","Amount","Category","Description","Type"],...P.map(h=>[_(h.createdAt),h.revolvingNumber,h.name,h.type==="disbursement"?-h.amount:h.amount,h.category,h.description??"",h.type==="add"?"Add Revolving Fund":"Disbursement"])]}),summaryRows:()=>{const h=B(),x=q();return[["Summary",n.from,"to",n.to,"","","",""],["Order Cash","","","","","",h.orderCashTotal,""],["Order GCash","","","","","",h.orderGcashTotal,""],["Manual Cash","","","","","",h.manualCashTotal,""],["Manual GCash","","","","","",h.manualGcashTotal,""],["Total Cash","","","","","",h.totalCash,""],["Total GCash","","","","","",h.totalGcash,""],["Total Sales","","","","","",h.totalSales,""],["Total Disbursement","","","","","",x.totalDisbursement,""],["Profit","","","","","",D,""],["Cash on Hand","","","","","",yt(h.totalCash,x.totalDisbursement),""]]},profit:D}}function Oa(e,t){return`<button class="nav-link ${t?"is-active":""}" data-tab="${e}" type="button">
    <span class="nav-icon">${Pa(e)}</span>
    <span>${qe[e]}</span>
  </button>`}function R(e,t){return`<div class="section-head"><div><h2>${m(e)}</h2><p class="meta">${m(t)}</p></div></div>`}function Qe(){return qe[o.tab]??"Dashboard"}function $e(e){return(e?.name??"Laba101").trim().slice(0,1).toUpperCase()}function Pa(e){return{dashboard:"DB",pos:"POS",orders:"PO",archived:"AR",customers:"CU",pricing:"PS",disbursements:"DR",reports:"RP",inventory:"IN",maintenance:"MT",staff:"ST",revolving:"RV",settings:"SE"}[e]}async function bt(){const e=await Ne(),t=await ta(e),a=await ot(),r=await ra(),s=await De(),n=await sa(),i=await lt(),c=await Ae(e),l=await ua(),d=await ma(),p=await pa(),u=await ga(),f=await ft(e),v=await Ta(e),g=await Sa(),y=await ea(),b=await it("report_email");return{branch:e,staff:t,allStaff:a,customers:r,services:s,allServices:n,categories:i,orders:c,payments:l,foldLogs:d,expenses:p,sales:u,machines:f,subcleanings:v,revolvingHistory:g,foldRate:y,reportEmail:b??""}}async function S(){if(!o.currentUser){Da(),Za();return}const e=await bt();e.orders.filter(a=>a.status!=="claimed").length,e.orders.filter(a=>a.status==="ready").length,e.orders.reduce((a,r)=>a+r.paidAmount,0);const t=e.orders.filter(a=>_(a.createdAt)===j()).reduce((a,r)=>a+r.paidAmount,0);e.sales.reduce((a,r)=>a+r.totalAmount,0),e.expenses.reduce((a,r)=>a+r.amount,0),Ie.innerHTML=`
    <div class="app-frame">
      <header class="topbar">
        <div class="topbar-left">
          <img src="/laba101-logo.svg" alt="Laba101" class="topbar-logo" />
          <div>
            <p class="eyebrow">Offline mobile system</p>
            <h1>${m(Qe())}</h1>
          </div>
        </div>
        <div class="topbar-actions">
          <div class="branch-pill"><span>Branch</span><strong>${m(e.branch)}</strong></div>
          <button class="icon-button" type="button" aria-label="Notifications">!</button>
          <button class="profile-pill" type="button">
            <span>${$e(o.currentUser)}</span>
            <strong>${m(o.currentUser.name)}</strong>
          </button>
        </div>
      </header>

      <button class="sidebar-backdrop ${o.sidebarOpen?"is-open":""}" id="sidebar-backdrop" type="button" aria-label="Close navigation"></button>

      <aside class="sidebar ${o.sidebarOpen?"is-open":""}">
        <div class="sidebar-mobile-head">
          <img src="/laba101-logo.svg" alt="Laba101" />
          <button class="sidebar-close" id="sidebar-close-button" type="button" aria-label="Close navigation">X</button>
        </div>
        <nav>${St().map(a=>Oa(a,o.tab===a)).join("")}</nav>
        <div class="sidebar-fill">
          <div class="sidebar-branch-badge">
            <span>Active Branch</span>
            <strong>${m(e.branch)}</strong>
          </div>
          <p class="sidebar-app-name">Laba101 POS</p>
        </div>
        <div class="sidebar-user">
          <span class="avatar">${$e(o.currentUser)}</span>
          <div>
            <strong>${m(o.currentUser.name)}</strong>
            <small>${m(o.currentUser.email)} / ${m(o.currentUser.role)}</small>
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
            <h2>${m(Qe())}</h2>
          </div>
          <div class="navbar-time">
            <strong data-navbar-time>--:--</strong>
            <span data-navbar-date>Loading...</span>
          </div>
          <button class="mobile-avatar" type="button">${$e(o.currentUser)}</button>
        </header>

        ${o.tab==="dashboard"?qa({paidToday:t,orders:e.orders}):""}
        ${o.tab==="pos"?Fa(e.orders,e.customers,e.services,e.categories,e.payments,e.branch):""}
        ${o.tab==="orders"?ka(e.orders,e.staff,e.services,e.payments):""}
        ${o.tab==="archived"?Ua(e.orders,e.staff,e.services,e.payments):""}
        ${o.tab==="customers"?Wa(e.customers,e.orders):""}
        ${o.tab==="pricing"?Xa(e.allServices,e.categories):""}
        ${o.tab==="disbursements"?Ka(e.expenses,e.sales):""}
        ${o.tab==="reports"?Ga(e.orders,e.sales,e.expenses,e.revolvingHistory,e.foldRate):""}
        ${o.tab==="inventory"?Va(e.services,e.categories):""}
        ${o.tab==="maintenance"?Ya(e.machines,e.subcleanings,e.branch):""}
        ${o.tab==="staff"?Qa(e.allStaff,e.branch):""}
        ${o.tab==="revolving"?dr(e.sales,e.revolvingHistory,e.orders,e.expenses):""}
        ${o.tab==="settings"?Ja(e.branch,e.foldRate,e.reportEmail):""}
      </main>
    </div>
  `,za(),tr(e),ar(e.allServices),rr(),nr(e.orders,e.sales,e.expenses,e.revolvingHistory,e.foldRate),sr(),ir(),or(),cr(e.allStaff),ur(),lr(),er()}function St(){return o.currentUser?.role==="admin"?Object.keys(qe).filter(e=>e!=="inventory"):Ra(o.currentUser)?["disbursements","reports","maintenance","revolving"]:["pos","orders","archived","disbursements","reports","maintenance","revolving"]}function Da(){Ie.innerHTML=`
    <main class="login-page">

      <section class="login-panel-wrap">
        <article class="login-panel">
          <header>
            <div class="login-mark"><img src="/laba101-logo.svg" alt="Laba101" /></div>
            <h2>Welcome back</h2>
            <p>Sign in to continue managing today&apos;s laundry operations.</p>
          </header>
          ${o.loginError?`<div class="alert">${m(o.loginError)}</div>`:""}
          <form id="login-form" class="form">
            <label>Email address<input name="email" type="email" autocomplete="username" placeholder="admin@laba101.test" required /></label>
            <label>Password<input name="password" type="password" autocomplete="current-password" placeholder="Enter password" required /></label>
            <label class="remember"><input name="remember" type="checkbox" value="1" /> Remember me on this device</label>
            <button class="primary" id="login-button" type="submit">Sign in</button>
          </form>
        </article>
      </section>
    </main>
  `}function Ia(){document.querySelectorAll("[data-fill-email]").forEach(e=>{e.addEventListener("click",()=>{const t=document.querySelector('input[name="email"]'),a=document.querySelector('input[name="password"]');t&&(t.value=e.dataset.fillEmail??""),a&&(a.value=e.dataset.fillPassword??"")})})}function qa(e){const t=new Date,a=Array.from({length:7},(i,c)=>{const l=new Date(t);return l.setDate(t.getDate()-(6-c)),new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric"}).format(l)}),r=Array.from({length:7},(i,c)=>{const l=new Date(t);l.setDate(t.getDate()-(6-c));const d=de(l);return e.orders.filter(p=>_(p.createdAt)===d).reduce((p,u)=>p+u.paidAmount,0)}),s=Math.max(1,...r),n=210;return`
    <section class="dashboard-main">
      <article class="panel revenue-panel">
        ${R("Revenue overview","Paid amount for the last 7 days.")}
        <div class="stats compact dashboard-stats">
          <div class="stat"><span class="card-label">Paid Today</span><div class="value">${$(e.paidToday)}</div></div>
        </div>
        <div class="chart-shell">
          <div class="mini-chart revenue-chart">
            ${r.map((i,c)=>{const l=Math.max(12,Math.round(i/s*n));return`<div class="chart-bar ${c===r.length-1?"is-today":""}"><span style="height:${l}px"></span><strong>${$(i)}</strong></div>`}).join("")}
          </div>
          <div class="chart-days">${a.map(i=>`<span>${m(i)}</span>`).join("")}</div>
        </div>
        <div class="chart-footnote">Values are based on order payments for the last 7 days.</div>
      </article>
    </section>
  `}function Fa(e,t,a,r,s,n){const i=a.filter(u=>u.serviceType==="order"&&u.isActive),c=a.filter(u=>u.serviceType==="addon"&&u.isActive),l=o.receiptOrderId?e.find(u=>u.id===o.receiptOrderId):null,d=new Set(e.map(u=>u.customerId)),p=t.filter(u=>d.has(u.id));return`
    <section class="grid content full">
      <article class="panel span-2">
        ${R("New POS order","Tap a service, add extra quantities, and confirm the total")}
        <form id="order-form" class="form">
          <div class="form-row">
            <label>Existing customer (${m(n)})
              <select name="customerId">
                <option value="">-- New customer --</option>
                ${p.map(u=>`<option value="${u.id}" data-name="${m(u.name)}" data-phone="${m(u.phone??"")}">${m(u.name)} ${u.phone?`- ${m(u.phone)}`:""}</option>`).join("")}
              </select>
            </label>
            <label>Customer name<input name="customerName" required placeholder="Customer name" /></label>
          </div>
          <div class="form-row">
            <label>Phone<input name="customerPhone" placeholder="09..." /></label>
          </div>

          <fieldset class="service-picker">
            <legend>Services</legend>
            ${i.map(u=>`<div class="qty-card service-option service-quantity" data-qty-card="serviceQty-${u.id}">
              <span>
                <strong>${m(u.name)}</strong>
                <small>${m(u.description??u.category)} ${u.maxKg?` / max ${u.maxKg}kg`:""}</small>
              </span>
              <b>${$(u.price)}</b>
              <div class="qty-control">
                <button type="button" data-qty-minus="serviceQty-${u.id}" aria-label="Decrease ${m(u.name)}">-</button>
                <input type="number" name="serviceQty-${u.id}" min="0" step="1" value="0" inputmode="numeric" />
                <button type="button" data-qty-plus="serviceQty-${u.id}" aria-label="Increase ${m(u.name)}">+</button>
              </div>
            </div>`).join("")}
          </fieldset>

          <fieldset class="check-grid">
            <legend>Extra services</legend>
            ${c.length?c.map(u=>`<div class="qty-card addon-quantity" data-qty-card="addonQty-${u.id}">
              <span><strong>${m(G(u.name))}</strong><small>${$(u.price)} each</small></span>
              <div class="qty-control">
                <button type="button" data-qty-minus="addonQty-${u.id}" aria-label="Decrease ${m(G(u.name))}">-</button>
                <input type="number" name="addonQty-${u.id}" min="0" step="1" value="0" inputmode="numeric" />
                <button type="button" data-qty-plus="addonQty-${u.id}" aria-label="Increase ${m(G(u.name))}">+</button>
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

      ${l?ke(l,s.filter(u=>u.orderId===l.id)):""}
    </section>
  `}function ka(e,t,a,r){const s=o.receiptOrderId?e.find(p=>p.id===o.receiptOrderId):null,n=e.filter(p=>p.status!=="claimed"),i=o.orderSearch.trim().toLowerCase(),c=o.orderDateFilter.trim(),l=o.orderPaymentFilter.trim().toLowerCase(),d=n.filter(p=>{const u=!i||[p.ticket,p.customer,p.phone,p.service,p.itemCategory,p.status].some(g=>String(g??"").toLowerCase().includes(i)),f=!c||_(p.createdAt)===c,v=!l||Fe(p)===l;return u&&f&&v});return`
    <section class="grid content full">
      <article class="panel span-2">
        ${R("Order queue","Workflow, payment, and receipts")}
        <form class="queue-filters" id="order-queue-filters">
          <label>
            <span>Search queue</span>
            <input name="orderSearch" type="search" placeholder="Ticket, name, service, status" value="${m(o.orderSearch)}" autocomplete="off" />
          </label>
          <label>
            <span>Filter date</span>
            <input name="orderDateFilter" type="date" value="${m(o.orderDateFilter)}" />
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
        <div class="summary-list queue-summary">
          <div><span>Active queue</span><strong>${d.length}</strong></div>
          <div><span>Claimed archived</span><strong>${e.filter(p=>p.status==="claimed").length}</strong></div>
        </div>
        <div class="table-scroll">
          <table class="data-table orders-data-table">
            <thead><tr><th>Ticket</th><th>Customer</th><th>Service</th><th>Total</th><th>Payment</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              ${d.map(p=>Et(p,t,a)).join("")||'<tr><td colspan="7" class="table-empty">No matching active orders.</td></tr>'}
            </tbody>
          </table>
        </div>
      </article>
      ${s?ke(s,r.filter(p=>p.orderId===s.id)):""}
    </section>
  `}function Ua(e,t,a,r){const s=e.filter(l=>l.status==="claimed"),n=o.archivedOrderSearch.trim().toLowerCase(),i=s.filter(l=>n?[l.ticket,l.customer,l.phone,l.service,l.itemCategory].some(d=>String(d??"").toLowerCase().includes(n)):!0),c=o.receiptOrderId?e.find(l=>l.id===o.receiptOrderId):null;return`
    <section class="grid content full">
      <article class="panel span-2">
        ${R("Archived orders","All claimed orders are listed here")}
        <form class="queue-filters" id="archived-order-filters">
          <label>
            <span>Search archived</span>
            <input name="archivedOrderSearch" type="search" placeholder="Ticket, name, service" value="${m(o.archivedOrderSearch)}" autocomplete="off" />
          </label>
          <div class="search-actions queue-actions">
            <button class="primary" type="submit">Apply</button>
            <button class="secondary" type="button" id="archived-order-clear">Clear</button>
          </div>
        </form>
        <div class="summary-list queue-summary">
          <div><span>Archived claims</span><strong>${i.length}</strong></div>
          <div><span>Total claimed</span><strong>${s.length}</strong></div>
        </div>
        <div class="table-scroll">
          <table class="data-table orders-data-table archived-orders-table">
            <thead><tr><th>Ticket</th><th>Customer</th><th>Service</th><th>Total</th><th>Payment</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              ${i.map(l=>Et(l,t,a)).join("")||'<tr><td colspan="7" class="table-empty">No archived orders found.</td></tr>'}
            </tbody>
          </table>
        </div>
      </article>
      ${c?ke(c,r.filter(l=>l.orderId===c.id)):""}
    </section>
  `}function Et(e,t,a){const r=ut(e,a),s=r.find(u=>!e.workflowCompleted.includes(u.key)),n=s?.key==="fold",i=s?.key==="extras"&&e.extras.length>0,c=Fe(e),l=c.charAt(0).toUpperCase()+c.slice(1),d=c==="paid"?"ok":c==="partial"?"warn":"meta",p=e.extras.length?e.extras.map(u=>`${m(G(u.name))} x${Number(u.quantity??1)}`).join(", "):"";return`
    <tr>
      <td><strong>${m(e.ticket)}</strong><div class="small">${m(ee(e.createdAt))}</div></td>
      <td>${m(e.customer)}<div class="small">${m(e.phone??"")}</div></td>
      <td>${m(e.service)}${p?`<div class="small">Extras: ${p}</div>`:""}</td>
      <td class="amount-cell"><strong>${$(e.totalAmount)}</strong><div class="small">Bal ${$(e.balance)}</div></td>
      <td><span class="payment-status ${d}">${l}</span><div class="small">Paid ${$(e.paidAmount)}</div></td>
      <td>
        <div class="${e.status==="ready"||e.status==="claimed"?"ok":"warn"}">${m(e.status)}</div>
        <div class="workflow-progress">
          ${r.map(u=>`<span class="${e.workflowCompleted.includes(u.key)?"is-done":s?.key===u.key?"is-next":""}">${m(u.label)}</span>`).join("")}
        </div>
      </td>
      <td>
      <div class="row-actions">
        ${s?`<form class="inline-form advance-form" data-order-id="${e.id}">
          ${i?`<div class="extra-confirmation">Confirm extra service: <strong>${e.extras.map(u=>`${m(G(u.name))} x${Number(u.quantity??1)}`).join(", ")}</strong></div>`:""}
          ${n?`<select name="assignedStaffId" required>
            <option value="">Staff</option>
            ${t.map(u=>`<option value="${u.id}">${m(u.name)}</option>`).join("")}
          </select>`:""}
          <button class="secondary" type="submit">Next: ${m(s.label)}</button>
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
  `}function ke(e,t){const a=t.reduce((i,c)=>i+Number(c.amount),0),r=Math.max(0,Number((a-e.totalAmount).toFixed(2))),s=Fe(e),n=s.charAt(0).toUpperCase()+s.slice(1);return`
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="receipt-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-print-receipt>Print</button>
          <button class="secondary" type="button" data-open-printer-panel>Printer</button>
          <button class="primary" type="button" data-thermal-print>${o.printerLoading?"Printing...":"Print Receipt"}</button>
          <button class="secondary" type="button" data-close-receipt>Close</button>
        </div>
        ${o.printerPanelOpen?Ma():""}
        <div class="receipt" id="receipt-print-area">
          <div class="receipt-head">
            <h3 id="receipt-title">Laba101</h3>
            <p>${m(e.ticket)}<br>${m(ee(e.createdAt))}</p>
          </div>
          <div class="receipt-customer">
            <strong>${m(e.customer)}</strong>
            <span>${m(e.phone??"No phone")}</span>
          </div>
          <div class="summary-list receipt-lines">
            <div><span>Service</span><strong>${m(e.service)}</strong></div>
            ${e.extras.length?`<div><span>Extra services</span><strong>${e.extras.map(i=>`${m(G(i.name))} x${Number(i.quantity??1)} (${$(Number(i.total??i.price))})`).join(", ")}</strong></div>`:""}
            <div><span>Total</span><strong>${$(e.totalAmount)}</strong></div>
            <div><span>Tendered</span><strong>${$(a)}</strong></div>
            <div><span>Paid</span><strong>${$(e.paidAmount)}</strong></div>
            <div><span>Payment status</span><strong>${n}</strong></div>
            <div><span>Change</span><strong>${$(r)}</strong></div>
            <div><span>Balance</span><strong>${$(e.balance)}</strong></div>
          </div>
          <h3>Payments</h3>
          <div class="receipt-payments">
            ${t.map(i=>`<div><span>${m(i.method.toUpperCase())}</span><strong>${$(i.amount)}</strong>${i.reference?`<small>Ref ${m(i.reference)}</small>`:""}</div>`).join("")||'<p class="helper">No payments yet.</p>'}
          </div>
        </div>
      </div>
    </div>
  `}function Ma(){return`
    <div class="printer-panel">
      <div class="printer-panel-head">
        <strong>Bluetooth thermal printer</strong>
        <button class="secondary" type="button" data-refresh-printers>${o.printerLoading?"Scanning...":"Scan paired"}</button>
      </div>
      <div class="printer-fields">
        <label>Printer
          <select data-printer-select>
            <option value="">Select paired printer</option>
            ${o.pairedPrinters.map(e=>`<option value="${m(e.address)}" ${o.selectedPrinterAddress===e.address?"selected":""}>${m(e.name)} - ${m(e.address)}</option>`).join("")}
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
      ${o.printerStatus?`<p class="printer-status ok">${m(o.printerStatus)}</p>`:""}
      ${o.printerError?`<p class="printer-status warn">${m(o.printerError)}</p>`:""}
    </div>
  `}async function Ba(){const e=document.querySelector("#receipt-print-area"),t=document.querySelector("#receipt-title")?.textContent?.trim()||"Laba101 receipt";if(!e)return;if(!A.isNativePlatform()){window.print();return}const a=`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${m(t)}</title><style>
body{margin:0;background:#fff;color:#061a42;font-family:Arial,sans-serif}.receipt{width:2.2in;margin:0 auto;padding:10px;font-size:11px;line-height:1.25}.receipt-head,.receipt-customer,.summary-list div,.receipt-payments div{display:flex;justify-content:space-between;gap:10px}.receipt-head,.receipt-customer{border-bottom:1px dashed #b9c5dc;padding-bottom:10px;margin-bottom:10px}.summary-list{display:grid;gap:7px}.summary-list div,.receipt-payments div{border-bottom:1px solid #edf1fb;padding:5px 0}.receipt h3{font-size:14px;margin:10px 0 6px}.helper{color:#5c6a86}
</style></head><body>${e.outerHTML}</body></html>`,r=`laba101-receipt-${Date.now()}.html`;await ge.writeFile({path:r,data:a,directory:ae.External,encoding:he.UTF8});const{uri:s}=await ge.getUri({path:r,directory:ae.External});await rt.share({title:t,text:"Open this receipt file and choose Print from your Android print service.",files:[s],dialogTitle:"Print receipt"})}async function Je(){o.printerLoading=!0,o.printerError="",o.printerStatus="",await S();try{if(!(await ie.requestBluetoothPermissions()).granted)throw new Error("Bluetooth permission was not granted.");const t=await ie.listPairedPrinters();o.pairedPrinters=t.printers??[],o.selectedPrinterAddress=o.selectedPrinterAddress||t.savedAddress||o.pairedPrinters[0]?.address||"",o.printerStatus=o.pairedPrinters.length?"Select a printer, then connect.":"No paired printers found. Pair the printer in Android Bluetooth settings first."}catch(e){o.printerError=e instanceof Error?e.message:"Could not scan paired printers."}finally{o.printerLoading=!1,await S()}}async function _a(){if(!o.selectedPrinterAddress){o.printerError="Select a paired printer first.",await S();return}o.printerLoading=!0,o.printerError="",o.printerStatus="",await S();try{await ie.savePrinter({address:o.selectedPrinterAddress}),await ie.connect({address:o.selectedPrinterAddress}),o.printerStatus="Printer connected and saved."}catch(e){o.printerError=e instanceof Error?e.message:"Printer connection failed."}finally{o.printerLoading=!1,await S()}}function ja(e){const t=(e.serviceLines?.length?e.serviceLines:[{id:e.serviceId,name:e.service,price:e.price,quantity:1,total:e.price}]).map(r=>({name:r.name,quantity:Number(r.quantity||1),price:Number(r.price||0)})),a=e.extras.map(r=>({name:G(r.name),quantity:Number(r.quantity??1),price:Number(r.price||0)}));return[...t,...a]}async function Ha(e){o.printerLoading=!0,o.printerError="",o.printerStatus="",await S();try{if(!o.selectedPrinterAddress){const t=await ie.getSavedPrinter();o.selectedPrinterAddress=t.address||""}await ie.printReceipt({address:o.selectedPrinterAddress||void 0,paperWidth:o.printerPaperWidth,storeName:"Laba101",receiptNumber:e.ticket,dateTime:ee(e.createdAt),customerName:e.customerName||"",contactNumber:e.contactNumber||"",staffName:e.staffName||"",totalAmount:Number(e.totalAmount||0),paidAmount:Number(e.paidAmount||0),balance:Number(e.balance||0),change:Number(e.change||0),items:ja(e)}),o.printerStatus="Receipt sent to printer."}catch(t){o.printerPanelOpen=!0,o.printerError=t instanceof Error?t.message:"Bluetooth thermal print failed."}finally{o.printerLoading=!1,await S()}}function Wa(e,t){const a=o.customerSearch.trim().toLowerCase(),r=e.filter(s=>a?s.name.toLowerCase().includes(a):!1);return`
    <section class="grid content full">
      <article class="panel">
        ${R("Customer Management","Customer records from local offline storage")}
        <form class="search-box" id="customer-search-form">
          <label>
            <span>Search customer name</span>
            <input name="customerSearch" data-customer-search type="search" placeholder="Type the customer name then tap Search" value="${m(o.customerSearch)}" autocomplete="off" />
          </label>
          <div class="search-actions">
            <button class="primary" type="submit">Search</button>
            <button class="secondary" type="button" id="customer-search-clear">Clear</button>
          </div>
        </form>
        <div class="summary-list">
          <div><span>Total customers</span><strong>${e.length}</strong></div>
          <div><span>Matching customers</span><strong>${a?r.length:0}</strong></div>
        </div>
      </article>
      <article class="panel">
        ${R("Customer list","Names, phones, addresses, and order history")}
        <div class="customer-stack">
          ${a?r.map(s=>{const n=t.filter(i=>i.customerId===s.id);return`
              <article class="customer-card">
                <header>
                  <div>
                    <strong>${m(s.name)}</strong>
                    <p>${m(s.phone??"No phone")} · ${m(s.address??"No address")}</p>
                  </div>
                  <span>${n.length} order(s)</span>
                </header>
                <div class="customer-orders">
                  ${n.length?n.map(i=>`
                    <div class="customer-order-row">
                      <div>
                        <strong>${m(i.ticket)}</strong>
                        <span>${m(i.service)} · ${m(i.itemCategory)}</span>
                      </div>
                      <div>
                        <strong>${$(i.totalAmount)}</strong>
                        <span>${m(i.status)}</span>
                      </div>
                    </div>`).join(""):'<p class="helper">No order records yet.</p>'}
                </div>
              </article>`}).join(""):'<div class="helper">Search a customer name to display matching records and their order history.</div>'}
        </div>
      </article>
    </section>
  `}function Xa(e,t){return`
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
            ${La.map(a=>`<label class="check"><input type="checkbox" name="includes" value="${a}" /> ${a}</label>`).join("")}
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
                <strong>${m(a.name)}</strong>
                <span>${m(a.category)}</span>
              </header>
              <div class="service-fields">
                <div><span>price:</span><strong>${$(a.price)}</strong></div>
                <div><span>type:</span><strong>${m(a.serviceType)}</strong></div>
                <div><span>category:</span><strong>${m(a.category)}</strong></div>
                <div><span>active:</span><strong>${a.isActive?"yes":"no"}</strong></div>
              </div>
              <div class="service-meta">Includes: ${m(a.includes.join(", ")||"none")}</div>
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
          ${t.map(a=>`<div class="table-row"><div>${m(a.name)}</div><div>${a.maxKg}</div><div></div><div></div><div></div></div>`).join("")}
        </div>
      </article>
    </section>
  `}function Ka(e,t){const a=j(),r=a.slice(0,7),s=e.filter(l=>l.expenseDate===a).reduce((l,d)=>l+d.amount,0),n=e.filter(l=>l.expenseDate.startsWith(r)).reduce((l,d)=>l+d.amount,0),i=t.filter(l=>l.saleDate===a).reduce((l,d)=>l+d.totalAmount,0),c=t.filter(l=>l.saleDate.startsWith(r)).reduce((l,d)=>l+d.totalAmount,0);return`
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
      <div class="panel stat"><div class="card-label">Daily disbursement</div><div class="value">${$(s)}</div></div>
      <div class="panel stat"><div class="card-label">Monthly disbursement</div><div class="value">${$(n)}</div></div>
      <div class="panel stat"><div class="card-label">Today sales input</div><div class="value">${$(i)}</div></div>
      <div class="panel stat"><div class="card-label">Month sales input</div><div class="value">${$(c)}</div></div>
    </section>
    ${o.dailyReportTab==="expenses"?`
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
          ${e.map(l=>`<div class="table-row"><div>${m(l.expenseDate)}</div><div>${m(l.number)}</div><div>${m(l.name)}</div><div>${m(l.category)}</div><div>${$(l.amount)}</div></div>`).join("")||'<div class="helper">No expenses yet.</div>'}
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
          ${t.map(l=>`<div class="table-row"><div>${m(l.saleNumber)}</div><div>${m(l.saleDate)}</div><div>${$(l.cashAmount)}</div><div>${$(l.gcashAmount)}</div><div><strong>${$(l.totalAmount)}</strong></div></div>`).join("")||'<div class="helper">No daily sales totals yet.</div>'}
        </div>
      </article>
    </section>
    `}
  `}function Ga(e,t,a,r,s,n,i,c){const l=o.reportPreview?gt(e,t,a,r,s,o.reportPreview):null;return`
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
    ${l?`
      <section class="panel report-preview">
        ${l.selectedTypes.has("sales")?`
          <article>
            ${R("Sales report preview",`${l.selection.from} to ${l.selection.to}`)}
            <div class="table wide-table report-preview-table">
              <div class="table-head report-table-head"><div>Type</div><div>Date</div><div>Number</div><div>Name</div><div>Cash</div><div>GCash</div><div>Total</div><div>Balance</div></div>
              ${l.salesRows().rows.slice(1).map(d=>`<div class="table-row report-table-row">${d.map(p=>`<div>${m(p??"")}</div>`).join("")}</div>`).join("")}
            </div>
          </article>`:""}
        ${l.selectedTypes.has("disbursement")?`
          <article>
            ${R("Disbursement preview",`${l.selection.from} to ${l.selection.to}`)}
            <div class="table wide-table report-preview-table report-disbursement-table">
              <div class="table-head report-table-head"><div>Type</div><div>Date</div><div>Number</div><div>Name</div><div>Amount</div></div>
              ${l.disbursementRows().rows.slice(1).map(d=>`<div class="table-row report-table-row">${d.map(p=>`<div>${m(p??"")}</div>`).join("")}</div>`).join("")}
            </div>
          </article>`:""}
        ${l.selectedTypes.has("fold_count")?`
          <article>
            ${R("Fold Count preview",`${l.selection.from} to ${l.selection.to}`)}
            <div class="table report-preview-table">
              <div class="table-head"><div>Staff</div><div>Fold Count</div></div>
              ${l.foldCountRows().rows.slice(1).map(d=>`<div class="table-row">${d.map(p=>`<div>${m(p??"")}</div>`).join("")}</div>`).join("")}
            </div>
          </article>`:""}
        ${l.selectedTypes.has("revolving_fund")?`
          <article>
            ${R("Revolving Fund — Daily Summary",`${l.selection.from} to ${l.selection.to}`)}
            ${we(["Date of Sales","Cash on Hand","Status","Date Update"],l.revolvingDailySummaryRows().rows.slice(1).map(d=>[m(String(d[0]??"")),m(String(d[1]??"")),m(String(d[2]??"")),m(String(d[3]??""))]),"data-table revolving-report-table")}
          </article>
          <article>
            ${R("Revolving Fund — Table History",`${l.selection.from} to ${l.selection.to}`)}
            ${we(["Date","Number","Name","Amount","Category","Description","Type"],l.revolvingHistoryRows().rows.slice(1).map(d=>[m(String(d[0]??"")),m(String(d[1]??"")),m(String(d[2]??"")),m(String(d[3]??"")),m(String(d[4]??"")),m(String(d[5]??"")),m(String(d[6]??""))]),"data-table revolving-report-table")}
          </article>`:""}
        ${l.selectedTypes.has("summary")?`
          <article>
            ${R("Summary preview",`${l.selection.from} to ${l.selection.to}`)}
            <div class="summary-list report-summary-list">
              ${l.summaryRows().map(d=>`<div><span>${m(d[0])}</span><strong>${m(String(d[6]??"0"))}</strong></div>`).join("")}
            </div>
          </article>`:""}
      </section>
    `:""}
  `}function Va(e,t){return`
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
          ${e.map(a=>`<div class="table-row"><div><strong>${m(a.name)}</strong></div><div>${m(a.category)}</div><div>${$(a.price)}</div><div>${a.maxKg} kg</div><div>${a.isActive?"Active":"Inactive"}</div></div>`).join("")}
        </div>
      </article>
    </section>
  `}function Ya(e,t,a){const r=e.filter(n=>n.status!=="under_cleaning"),s=e.filter(n=>n.status==="under_cleaning");return`
    <section class="page-head">
      <div>
        <h2>Maintenance & Cleaning</h2>
        <p class="meta">Manage machine subcleaning and maintenance records.</p>
      </div>
      <div class="segmented">
        <button class="${o.maintenanceTab==="cleaning"?"is-active":""}" data-maintenance-tab="cleaning" type="button">Subcleaning</button>
        <button class="${o.maintenanceTab==="machines"?"is-active":""}" data-maintenance-tab="machines" type="button">Machine Management</button>
      </div>
    </section>
    ${o.maintenanceTab==="cleaning"?`
    <section class="grid content full">
      <article class="panel">
        ${R("Available Machines","Select machines to start cleaning.")}
        <form id="subcleaning-form" class="form">
          <input type="hidden" name="date" value="${j()}" />
          <fieldset class="machine-list">
            ${r.map(n=>`<label class="machine-card"><input type="checkbox" name="machineIds" value="${n.id}" /><span><strong>${m(n.machineName)}</strong><small>${m(n.machineType)}</small></span><em></em></label>`).join("")||'<p class="helper">All machines are currently being cleaned.</p>'}
          </fieldset>
          <input type="hidden" name="cleaningStatus" value="in_progress" />
          <label>Notes <textarea name="notes" placeholder="e.g. Deep clean filters"></textarea></label>
          <input type="hidden" name="branch" value="${m(a)}" />
          <button class="primary" type="submit">Start Cleaning</button>
        </form>
      </article>
      <article class="panel warning-panel">
        ${R("Under Cleaning","Machines currently being serviced.")}
        <div class="machine-stack">
          ${s.length?s.map(n=>`
            <div class="machine-status">
              <span><strong>${m(n.machineName)}</strong><small>${m(n.machineType)}</small></span>
              <b>In progress</b>
              <button class="secondary complete-cleaning-btn" type="button" data-machine-id="${n.id}" data-branch="${m(a)}">Mark Complete</button>
            </div>`).join(""):'<p class="helper">No machines under cleaning right now.</p>'}
        </div>
      </article>
      <article class="panel span-2">
        ${R("Daily Cleaning Checklist","Track which machines have been cleaned today.")}
        <div class="table">
          <div class="table-head"><div>Machine</div><div>Type</div><div>Status</div><div>Notes</div><div>Date</div></div>
          ${e.map(n=>{const i=t.find(c=>c.machineIds.includes(n.id)&&c.date===j());return`<div class="table-row"><div><strong>${m(n.machineName)}</strong></div><div>${m(n.machineType)}</div><div>${i?m(i.cleaningStatus.replace("_"," ")):"Not Cleaned"}</div><div>${m(i?.notes??"-")}</div><div>${j()}</div></div>`}).join("")}
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
          <input type="hidden" name="branch" value="${m(a)}" />
          <button class="primary" type="submit">Add machine</button>
        </form>
      </article>
      <article class="panel">
        ${R("Machines","Washer and dryer status")}
        <div class="table">
          <div class="table-head"><div>Name</div><div>Type</div><div>Status</div><div>Branch</div><div>Actions</div></div>
          ${e.map(n=>`<div class="table-row"><div><strong>${m(n.machineName)}</strong></div><div>${m(n.machineType)}</div><div>${m(n.status.replace("_"," "))}</div><div>${m(n.branch)}</div>
          <div class="row-actions">
            ${n.status!=="inactive"?`<button class="secondary deactivate-machine-btn" data-id="${n.id}">Deactivate</button>`:`<button class="secondary activate-machine-btn" data-id="${n.id}">Activate</button>`}
          </div></div>`).join("")||'<div class="helper">No machines found.</div>'}
        </div>
      </article>
    </section>
    `}
  `}function Qa(e,t){return`
    <section class="grid">
      <div class="page-head">
        <div>
          <p class="eyebrow">Team Management</p>
          <h2>Staff Overview</h2>
        </div>
        <button class="primary" id="open-add-staff-modal" type="button">+ Add staff</button>
      </div>

      <article class="panel">
        ${R("Staff list","Branch: "+m(t))}
        <div class="table">
          <div class="table-head staff-table-head"><div>Name</div><div>Email</div><div>Role</div><div>Branch</div><div>Status</div><div>Actions</div></div>
          ${e.length?e.map(a=>`<div class="table-row staff-table-row"><div><strong>${m(a.name)}</strong></div><div>${m(a.email)}</div><div class="small">${m(a.role)}</div><div>${m(a.branch)}</div><div>${a.isActive!==0?"Active":"Inactive"}</div>
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
  `}function Ja(e,t,a){return`
    <section class="grid content full">
      <article class="panel">
        ${R("Settings","Device-local configuration")}
        <form id="settings-form" class="form">
          <label>Current branch<select name="branch">
            ${["Main Store","Mintal Branch","Gensan Branch"].map(r=>`<option value="${r}" ${r===e?"selected":""}>${r}</option>`).join("")}
          </select></label>
          <label>Fold rate<input name="foldRate" type="number" min="0" step="0.01" value="${t}" /></label>
          <label>Report email<input name="reportEmail" type="email" placeholder="admin@laba101.test" value="${m(a)}" /></label>
          <button class="primary" type="submit">Save settings</button>
        </form>
      </article>
    </section>
  `}function za(){const e=()=>{localStorage.removeItem(le),o.currentUser=null,o.tab="dashboard",o.receiptOrderId=0,o.sidebarOpen=!1,S()};document.querySelector("#logout-button")?.addEventListener("click",e),document.querySelector("#mobile-logout-button")?.addEventListener("click",e),document.querySelector("#mobile-menu-button")?.addEventListener("click",()=>{o.sidebarOpen=!0,S()}),document.querySelector("#sidebar-close-button")?.addEventListener("click",()=>{o.sidebarOpen=!1,S()}),document.querySelector("#sidebar-backdrop")?.addEventListener("click",()=>{o.sidebarOpen=!1,S()}),document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{o.tab=t.dataset.tab,o.receiptOrderId=0,o.sidebarOpen=!1,S()})}),document.querySelectorAll("[data-quick-tab]").forEach(t=>{t.addEventListener("click",()=>{o.tab=t.dataset.quickTab,S()})}),document.querySelectorAll("[data-receipt]").forEach(t=>{t.addEventListener("click",()=>{o.receiptOrderId=Number(t.dataset.receipt),o.printerPanelOpen=!1,o.printerError="",o.printerStatus="",S()})}),document.querySelector("[data-close-receipt]")?.addEventListener("click",()=>{o.receiptOrderId=0,S()}),document.querySelector("[data-print-receipt]")?.addEventListener("click",()=>{Ba().catch(t=>{alert(t instanceof Error?t.message:"Receipt could not be printed.")})}),document.querySelector("[data-open-printer-panel]")?.addEventListener("click",()=>{o.printerPanelOpen=!o.printerPanelOpen,o.printerPanelOpen&&o.pairedPrinters.length===0?Je():S()}),document.querySelector("[data-refresh-printers]")?.addEventListener("click",()=>{Je()}),document.querySelector("[data-printer-select]")?.addEventListener("change",t=>{o.selectedPrinterAddress=t.currentTarget.value,S()}),document.querySelector("[data-paper-width]")?.addEventListener("change",t=>{o.printerPaperWidth=Number(t.currentTarget.value)===80?80:58,S()}),document.querySelector("[data-connect-printer]")?.addEventListener("click",()=>{_a()}),document.querySelector("[data-thermal-print]")?.addEventListener("click",()=>{(async()=>{const a=(await bt()).orders.find(r=>r.id===o.receiptOrderId);if(!a)throw new Error("Receipt order not found.");await Ha(a)})().catch(t=>{o.printerPanelOpen=!0,o.printerError=t instanceof Error?t.message:"Bluetooth thermal print failed.",S()})}),document.querySelectorAll("[data-report-tab]").forEach(t=>{t.addEventListener("click",()=>{o.dailyReportTab=t.dataset.reportTab,S()})}),document.querySelectorAll("[data-maintenance-tab]").forEach(t=>{t.addEventListener("click",()=>{o.maintenanceTab=t.dataset.maintenanceTab,S()})})}function Za(){Ia(),document.querySelector("#login-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget),a=document.querySelector("#login-button");a&&(a.disabled=!0,a.textContent="Signing in...");try{const r=await ct(String(t.get("email")??""),String(t.get("password")??""));if(!r){o.loginError="Invalid email or password.",await S();return}o.currentUser=r,o.loginError="",await ye("branch",String(r.branch||"Main Store")),t.get("remember")?localStorage.setItem(le,JSON.stringify({email:r.email,remembered:!0})):localStorage.removeItem(le),St().includes(o.tab)||(o.tab="dashboard"),await S()}catch(r){alert("Login Error: "+String(r?.message||r)),a&&(a.disabled=!1,a.textContent="Sign in")}})}function er(){ve&&window.clearInterval(ve);const e=document.querySelector("[data-navbar-time]"),t=document.querySelector("[data-navbar-date]");if(!e||!t){ve=void 0;return}const a=()=>{const r=xa();e.textContent=r.time,t.textContent=r.date};a(),ve=window.setInterval(a,1e3)}function ze(e,t){return e?t.find(a=>a.name.toLowerCase()===e.category.toLowerCase())??t.find(a=>a.name==="Regular Clothes")??t[0]??null:null}function Ze(e,t){return Math.max(1,Number(t.maxKg||e.maxKg||1))}function wt(e,t){return Object.fromEntries(t.filter(a=>a.serviceType==="order").map(a=>[a.id,Number(e.querySelector(`input[name="serviceQty-${a.id}"]`)?.value??0)]).filter(([,a])=>Number(a)>0))}function et(e,t){const a=wt(e,t);return t.filter(r=>r.serviceType==="order"&&Number(a[r.id]??0)>0).map(r=>({...r,quantity:Number(a[r.id])}))}function Tt(e,t){return Object.fromEntries(t.filter(a=>a.serviceType==="addon").map(a=>[a.id,Number(e.querySelector(`input[name="addonQty-${a.id}"]`)?.value??0)]).filter(([,a])=>Number(a)>0))}function tt(e,t){const a=Tt(e,t);return t.filter(r=>r.serviceType==="addon"&&Number(a[r.id]??0)>0).map(r=>({...r,quantity:Number(a[r.id])}))}function tr(e){const t=document.querySelector("#order-form"),a=document.querySelector("#price-preview"),r=t?.querySelector('button[type="submit"]'),s=t?.querySelector('select[name="customerId"]'),n=t?.querySelector('input[name="customerName"]'),i=t?.querySelector('input[name="customerPhone"]'),c=t?.querySelector("[data-order-error]"),l=t?.querySelector('select[name="paymentMethod"]'),d=t?.querySelector(".gcash-reference"),p=t?.querySelector('input[name="paymentReference"]'),u=()=>{if(!s||!n||!i)return;const y=s.selectedOptions[0];n.value=y?.dataset.name??"",i.value=y?.dataset.phone??""},f=()=>{const y=l?.value==="gcash";d&&(d.hidden=!y),p&&(p.required=y,y||(p.value=""))},v=(y,b)=>{if(!t)return;const T=t.querySelector(`input[name="${y}"]`);T&&(T.value=String(Math.max(0,Number(T.value||0)+b)),T.closest(".qty-card")?.classList.toggle("is-selected",Number(T.value)>0),T.dispatchEvent(new Event("input",{bubbles:!0})))};t?.querySelectorAll(".qty-control input").forEach(y=>{y.addEventListener("input",()=>{y.value=String(Math.max(0,Number(y.value||0))),y.closest(".qty-card")?.classList.toggle("is-selected",Number(y.value)>0)})}),t?.querySelectorAll("[data-qty-card]").forEach(y=>{y.addEventListener("click",b=>{const T=b.target;T.closest("input")||T.closest("button")||v(y.dataset.qtyCard??"",1)})}),t?.querySelectorAll("[data-qty-plus]").forEach(y=>{y.addEventListener("click",()=>v(y.dataset.qtyPlus??"",1))}),t?.querySelectorAll("[data-qty-minus]").forEach(y=>{y.addEventListener("click",()=>v(y.dataset.qtyMinus??"",-1))});const g=()=>{if(!t||!a)return;const y=et(t,e.services),b=y[0],T=ze(b,e.categories),w=tt(t,e.services);if(!y.length||!b||!T){r&&(r.disabled=!0),c&&(c.hidden=!1,c.textContent="Please select at least one service quantity."),a.innerHTML='<div class="preview-total"><span>Total amount</span><strong>PHP 0.00</strong></div>';return}const N=dt(y,T,Ze(b,T),w),D=N.serviceLines.map(q=>`${q.name} x${q.quantity}`),B=N.extras.map(q=>`${G(q.name)} x${q.quantity}`);r&&(r.disabled=!1),c&&(c.hidden=!0,c.textContent=""),a.classList.remove("has-error"),a.innerHTML=`
      <div class="preview-line"><span>Services${D.length?` (${m(D.join(", "))})`:""}</span><strong>${$(N.price)}</strong></div>
      ${N.extraServiceAmount>0?`<div class="preview-line"><span>Extra services${B.length?` (${m(B.join(", "))})`:""}</span><strong>${$(N.extraServiceAmount)}</strong></div>`:""}
      <div class="preview-total"><span>Total amount</span><strong>${$(N.totalAmount)}</strong></div>
    `};s?.addEventListener("change",u),l?.addEventListener("change",f),f(),t?.addEventListener("input",g),t?.addEventListener("change",g),g(),t?.addEventListener("submit",async y=>{y.preventDefault();const b=new FormData(t),T=et(t,e.services),w=T[0],N=ze(w,e.categories);if(tt(t,e.services),!T.length){c&&(c.hidden=!1,c.textContent="Please select at least one service quantity.");return}try{await ca({customerId:Number(b.get("customerId"))||void 0,customerName:String(b.get("customerName")??""),customerPhone:String(b.get("customerPhone")??"")||null,serviceQuantities:wt(t,e.services),branch:e.branch,itemCategoryId:N?.id,weightKg:w&&N?Ze(w,N):void 0,addonQuantities:Tt(t,e.services),paidAmount:Number(b.get("paidAmount")??0),paymentMethod:String(b.get("paymentMethod")??"cash"),paymentReference:String(b.get("paymentReference")??"")||null,notes:String(b.get("notes")??"")||null}),await S()}catch(D){c&&(c.hidden=!1,c.textContent=D instanceof Error?D.message:"Order could not be saved.")}}),document.querySelectorAll(".advance-form").forEach(y=>{y.addEventListener("submit",async b=>{b.preventDefault();const T=new FormData(y);await da(Number(y.dataset.orderId),Number(T.get("assignedStaffId"))||null),await S()})}),document.querySelectorAll(".payment-form").forEach(y=>{const b=y.querySelector('select[name="method"]'),T=y.querySelector('input[name="reference"]'),w=()=>{const N=b?.value==="gcash";T&&(T.hidden=!N,T.required=N,N||(T.value=""))};b?.addEventListener("change",w),w(),y.addEventListener("submit",async N=>{N.preventDefault();const D=new FormData(y);await mt(Number(y.dataset.orderId),{amount:Number(D.get("amount")),method:String(D.get("method")),reference:String(D.get("reference")??"")||null}),await S()})})}function ar(e){document.querySelector("#service-form")?.addEventListener("submit",async t=>{t.preventDefault();const a=new FormData(t.currentTarget),r=a.get("id")?Number(a.get("id")):void 0;await Ke({id:r,name:String(a.get("name")??""),description:String(a.get("description")??"")||null,category:String(a.get("category")??""),serviceType:String(a.get("serviceType")??"order"),price:Number(a.get("price")??0),maxKg:Number(a.get("maxKg")??0),dryingMinutes:Number(a.get("dryingMinutes"))||null,includes:a.getAll("includes").map(String).filter(Boolean),additionalCharge:0,turnaroundHours:Number(a.get("turnaroundHours")??24),isActive:1}),await S()}),document.querySelectorAll(".edit-service-btn").forEach(t=>{t.addEventListener("click",()=>{const a=Number(t.dataset.id),r=e.find(n=>n.id===a),s=document.querySelector("#service-form");r&&s&&(s.querySelector("[name=id]").value=String(r.id),s.querySelector("[name=name]").value=r.name,s.querySelector("[name=category]").value=r.category,s.querySelector("[name=serviceType]").value=r.serviceType,s.querySelector("[name=price]").value=String(r.price),s.querySelector("[name=maxKg]").value=String(r.maxKg),s.querySelector("[name=dryingMinutes]").value=r.dryingMinutes?String(r.dryingMinutes):"",s.querySelectorAll('input[name="includes"]').forEach(n=>{n.checked=r.includes.includes(n.value)}),s.querySelector("[name=turnaroundHours]").value=String(r.turnaroundHours),s.querySelector("[name=description]").value=r.description??"",window.scrollTo({top:0,behavior:"smooth"}))})}),document.querySelectorAll(".deactivate-service-btn, .activate-service-btn").forEach(t=>{t.addEventListener("click",async()=>{const a=Number(t.dataset.id),r=e.find(s=>s.id===a);if(r){const s=r.isActive?0:1;await Ke({id:r.id,name:r.name,description:r.description,category:r.category,serviceType:r.serviceType,price:r.price,maxKg:r.maxKg,dryingMinutes:r.dryingMinutes,includes:r.includes,additionalCharge:r.additionalCharge,turnaroundHours:r.turnaroundHours,isActive:s}),await S()}})}),document.querySelector("#category-form")?.addEventListener("submit",async t=>{t.preventDefault();const a=new FormData(t.currentTarget);await ia({name:String(a.get("name")??""),maxKg:Number(a.get("maxKg")??0),additionalFee:Number(a.get("additionalFee")??0),isActive:1}),await S()})}function rr(){document.querySelector("#expense-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await ha({expenseDate:String(t.get("expenseDate")??""),name:String(t.get("name")??""),category:String(t.get("category")??""),description:String(t.get("description")??""),amount:Number(t.get("amount")??0)}),await S()}),document.querySelector("#fold-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await va({orderTicket:String(t.get("orderTicket")??""),staffName:String(t.get("staffName")??""),foldCount:Number(t.get("foldCount")??1),rate:Number(t.get("rate")??5)}),await S()})}function nr(e,t,a,r,s){document.querySelector("#generate-report")?.addEventListener("click",()=>{o.reportPreview=pe(),S()}),document.querySelector("#sales-form")?.addEventListener("submit",async f=>{f.preventDefault();const v=new FormData(f.currentTarget);await ba({saleDate:String(v.get("saleDate")??""),cashAmount:Number(v.get("cashAmount")??0),gcashAmount:Number(v.get("gcashAmount")??0),notes:String(v.get("notes")??"")}),await S()});const n=document.querySelector("[data-date-from]"),i=document.querySelector("[data-date-to]");document.querySelectorAll("[data-date-scope]").forEach(f=>{f.addEventListener("change",()=>{if(!f.checked||!n||!i)return;const v=new Date,g=de(v),y=new Date(v);f.value==="week"&&y.setDate(v.getDate()-6),f.value==="month"&&y.setDate(1),f.value!=="custom"&&(n.value=f.value==="today"?g:de(y),i.value=g)})});const c=f=>{const v=b=>String(b??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;"),g=b=>b==="Sales Report"?[110,125,150,215,95,95,105,105]:b==="Disbursement"?[110,115,150,220,105]:b==="Fold Count"?[220,125]:b==="Revolving Daily Summary"?[115,105,120,115]:b==="Revolving History"?[115,96,140,96,110,180,120]:[155,125,125,125,95,95,115,115];return`<?xml version="1.0"?>
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
  ${f.map(b=>{const T=g(b.name).map(N=>`<Column ss:Width="${N}" ss:AutoFitWidth="0"/>`).join(""),w=b.rows.map(N=>{if(!N.length)return'<Row ss:Height="10" ss:StyleID="BorderRow"><Cell ss:StyleID="BorderCell"><Data ss:Type="String">&nbsp;</Data></Cell></Row>';const D=N[0]==="Type"||N[0]==="Summary"||N[0]==="Sales Summary"||N[0]==="Disbursement Summary"||N[0]==="Staff"||N[0]==="Date of Sales"||N[0]==="Date",B=D?"HeaderRow":"BorderRow",q=D?"HeaderCell":"BorderCell",Y=D?26:22,P=N.map(I=>`<Cell ss:StyleID="${q}"><Data ss:Type="${typeof I=="number"?"Number":"String"}">${v(I)}</Data></Cell>`).join("");return`<Row ss:Height="${Y}" ss:StyleID="${B}">${P}</Row>`}).join("");return`
        <Worksheet ss:Name="${v(b.name)}">
          <Table>
            ${T}
            ${w}
          </Table>
        </Worksheet>`}).join("")}
</Workbook>`},l=()=>{const f=pe(),v=gt(e,t,a,r,s,f),g=[];v.selectedTypes.has("sales")&&g.push({name:"Sales Report",rows:v.salesRows().rows}),v.selectedTypes.has("disbursement")&&g.push({name:"Disbursement",rows:v.disbursementRows().rows}),v.selectedTypes.has("fold_count")&&g.push({name:"Fold Count",rows:v.foldCountRows().rows}),v.selectedTypes.has("revolving_fund")&&(g.push({name:"Revolving Daily Summary",rows:v.revolvingDailySummaryRows().rows}),g.push({name:"Revolving History",rows:v.revolvingHistoryRows().rows})),v.selectedTypes.has("summary")&&g.push({name:"Summary",rows:v.summaryRows()});const y=c(g.length?g:[{name:"Summary",rows:v.summaryRows()}]),b=`laba101-report-${f.from}-to-${f.to}.xls`;return new File([y],b,{type:"application/vnd.ms-excel"})},d=async()=>{const f=l();if(!A.isNativePlatform())return{fileName:f.name,uri:""};const v=await f.text(),g=f.name;await ge.writeFile({path:g,data:v,directory:ae.External,encoding:he.UTF8});const{uri:y}=await ge.getUri({path:g,directory:ae.External});return{fileName:f.name,uri:y}},p=()=>{const f=l(),v=pe(),g=`laba101-report-${v.from}-to-${v.to}.xls`,y=f,b=URL.createObjectURL(y),T=document.createElement("a");return T.href=b,T.download=g,document.body.appendChild(T),T.click(),setTimeout(()=>{T.remove(),URL.revokeObjectURL(b)},1e3),g},u=async f=>{const v=document.querySelector(f==="export"?"#export-report":"#email-report");v&&(v.disabled=!0,v.textContent=f==="export"?"Exporting...":"Sending...");try{if(f==="export")if(A.isNativePlatform()){const g=await d();alert(`Report exported as "${g.fileName}".`)}else{const g=p();alert(`Report saved: ${g}`)}else{const g=await it("report_email")||"";if(!g){alert("Please configure a report email in Settings first.");return}const y=pe(),b=`Laba101 report ${y.from} to ${y.to}`;if(A.isNativePlatform()){const T=await d();try{await rt.share({title:b,text:`Please find the attached Laba101 report file: ${T.fileName}`,files:[T.uri],dialogTitle:"Send report via email"}),alert(`Report saved and shared as "${T.fileName}".`)}catch(w){const N=String(w).toLowerCase();if(N.includes("share canceled")||N.includes("canceled"))alert(`Report saved as "${T.fileName}".`);else throw w}}else{const T=p(),w=`Hi,

Please find the attached Laba101 report file: ${T}

Date range: ${y.from} to ${y.to}`,N=`mailto:${g}?subject=${encodeURIComponent(b)}&body=${encodeURIComponent(w)}`;setTimeout(()=>{window.location.href=N},800),alert(`Report downloaded as "${T}".
Your email app will open — please attach the file and send.`)}}}catch(g){alert("Failed: "+String(g))}finally{v&&(v.disabled=!1,v.textContent=f==="export"?"Export Excel":"Send to Email")}};document.querySelector("#export-report")?.addEventListener("click",async()=>{await u("export")}),document.querySelector("#email-report")?.addEventListener("click",async()=>{await u("email")})}function sr(){document.querySelector("#order-queue-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);o.orderSearch=String(t.get("orderSearch")??"").trim(),o.orderDateFilter=String(t.get("orderDateFilter")??"").trim(),o.orderPaymentFilter=String(t.get("orderPaymentFilter")??"").trim(),S()}),document.querySelector("#order-queue-clear")?.addEventListener("click",()=>{o.orderSearch="",o.orderDateFilter="",o.orderPaymentFilter="",S()}),document.querySelector("#archived-order-filters")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);o.archivedOrderSearch=String(t.get("archivedOrderSearch")??"").trim(),S()}),document.querySelector("#archived-order-clear")?.addEventListener("click",()=>{o.archivedOrderSearch="",S()})}function ir(){document.querySelector("#customer-search-form")?.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget);o.customerSearch=String(t.get("customerSearch")??"").trim(),S()}),document.querySelector("#customer-search-clear")?.addEventListener("click",()=>{o.customerSearch="",S()})}function or(){document.querySelector("#machine-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await Ea({machineName:String(t.get("machineName")??""),machineType:String(t.get("machineType")),status:String(t.get("status")),branch:String(t.get("branch")??"")}),await S()}),document.querySelector("#subcleaning-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=e.currentTarget.querySelector('button[type="submit"]');t&&(t.disabled=!0,t.textContent="Starting...");const a=new FormData(e.currentTarget),r=a.getAll("machineIds").map(Number);if(!r.length){alert("Please select at least one machine to clean."),t&&(t.disabled=!1,t.textContent="Start Cleaning");return}await Na({date:String(a.get("date")??""),machineIds:r,cleaningStatus:String(a.get("cleaningStatus")??""),notes:String(a.get("notes")??""),branch:String(a.get("branch")??"")}),await S()}),document.querySelectorAll(".complete-cleaning-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.machineId),a=e.dataset.branch??"";e.disabled=!0,e.textContent="Completing...",await Aa(t,a),await S()})}),document.querySelectorAll(".deactivate-machine-btn, .activate-machine-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=Number(e.dataset.id),a=e.classList.contains("deactivate-machine-btn");await wa(t,a?"inactive":"available"),await S()})})}function cr(e){const t=document.querySelector("#add-staff-modal"),a=document.querySelector("#open-add-staff-modal"),r=document.querySelector("#close-add-staff-modal"),s=document.querySelector("#staff-form"),n=()=>{s?.reset(),s&&(s.querySelector("[name=id]").value="");const c=document.querySelector("#add-staff-title");c&&(c.textContent="Add staff member"),t?.removeAttribute("hidden")},i=()=>{t?.setAttribute("hidden",""),s?.reset()};a?.addEventListener("click",n),r?.addEventListener("click",i),t?.addEventListener("click",c=>{c.target===t&&i()}),document.querySelectorAll(".edit-staff-btn").forEach(c=>{c.addEventListener("click",()=>{const l=Number(c.dataset.id),d=e.find(p=>p.id===l);if(d&&s){s.querySelector("[name=id]").value=String(d.id),s.querySelector("[name=name]").value=d.name,s.querySelector("[name=email]").value=d.email,s.querySelector("[name=password]").value=d.password,s.querySelector("[name=role]").value=d.role,s.querySelector("[name=branch]").value=d.branch;const p=document.querySelector("#add-staff-title");p&&(p.textContent="Edit staff member"),t?.removeAttribute("hidden")}})}),document.querySelectorAll(".deactivate-staff-btn, .activate-staff-btn").forEach(c=>{c.addEventListener("click",async()=>{const l=Number(c.dataset.id),d=e.find(p=>p.id===l);d&&(await Xe(l,{isActive:d.isActive!==0?0:1}),await S())})}),s?.addEventListener("submit",async c=>{c.preventDefault();const l=document.querySelector("#staff-save-btn");l&&(l.disabled=!0,l.textContent="Saving...");const d=new FormData(s),p=d.get("id")?Number(d.get("id")):void 0,u=String(d.get("name")??"").trim(),f=String(d.get("email")??"").trim(),v=String(d.get("password")??"password")||"password",g=String(d.get("role")),y=String(d.get("branch")??"");if(!u||!f){alert("Name and email are required."),l&&(l.disabled=!1,l.textContent="Save staff member");return}try{p?await Xe(p,{name:u,email:f,password:v,role:g,branch:y}):await aa({name:u,email:f,password:v,role:g,branch:y}),i(),await S()}catch{alert("Failed to save staff. The email may already be in use."),l&&(l.disabled=!1,l.textContent="Save staff member")}})}function lr(){document.querySelector("#settings-form")?.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);await ye("branch",String(t.get("branch")??"Main Store")),await ye("fold_rate",String(t.get("foldRate")??"5")),String(t.get("reportEmail")??"")&&await ye("report_email",String(t.get("reportEmail"))),alert("Settings saved successfully!"),await S()})}await Zt();const at=localStorage.getItem(le);if(at)try{const e=JSON.parse(at);if(e.email&&e.remembered){const t=await ct(e.email,"password")??null;o.currentUser=t}}catch{localStorage.removeItem(le)}function dr(e,t,a,r){const s=e.filter(v=>v.status==="revolving").reduce((v,g)=>v+g.cashAmount,0),n=t.filter(v=>v.type==="add").reduce((v,g)=>v+g.amount,0),i=t.filter(v=>v.type==="disbursement").reduce((v,g)=>v+g.amount,0),c=s+n-i,l=o.revolvingHistoryFrom||"0000-01-01",d=o.revolvingHistoryTo||"9999-12-31",p=t.filter(v=>{const g=_(v.createdAt);return g>=l&&g<=d}),u=e.map(v=>{const g=ht(v.saleDate,a,r,v.cashAmount),y=v.status==="revolving"?'<span class="ok">Revolving</span>':v.status==="endorsed"?`<span class="warn">Endorsed to ${m(v.endorsedTo)}</span>`:'<span class="meta">Pending</span>',b=v.status!=="revolving"&&v.status!=="endorsed"?`<div class="row-actions">
          <button class="primary revolving-btn" data-id="${v.id}">Revolving</button>
          <button class="secondary endorsed-btn" data-id="${v.id}" data-date="${ee(v.saleDate)}">Endorsed</button>
        </div>`:"";return[`<strong>${m(ee(v.saleDate))}</strong>`,`<strong class="ok">${$(g)}</strong>`,y,v.statusUpdatedAt?m(ee(v.statusUpdatedAt)):"-",b]}),f=p.map(v=>[$a(v.createdAt),`<strong>${m(v.revolvingNumber)}</strong>`,m(v.name),`<strong class="${v.type==="disbursement"?"warn":"ok"}">${v.type==="disbursement"?"-":"+"}${$(v.amount)}</strong>`,m(v.category),m(v.description||"-"),`<span class="${v.type==="add"?"ok":"warn"}">${v.type==="add"?"Add Revolving Fund":"Disbursement"}</span>`]);return`
    <section class="grid content full">
      <div class="panel-header" style="display: flex; gap: 16px; margin-bottom: 24px; align-items: center;">
        <button class="primary" id="add-revolving-fund-btn">Add Revolving Fund</button>
        <button class="secondary" id="revolving-disbursement-btn">Disbursement</button>
      </div>

      <article class="panel">
        <div style="background-color: #061a42; color: white; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
          <p style="font-size: 12px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin: 0 0 8px 0;">Revolving Fund Total</p>
          <p style="font-size: 32px; font-weight: 800; margin: 0;">${$(c)}</p>
        </div>
        ${R("Daily Summary","Cash on hand per day (order cash + manual cash − disbursements)")}
        ${we(["Date of Sales","Cash on Hand","Status","Date Update","Action"],u,"data-table revolving-summary-datatable")}
      </article>

      <article class="panel">
        ${R("Revolving Table History","Filter by date — DISB numbers shared with Daily Report expenses")}
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
        ${we(["Date","Disbursement #","Name","Amount","Category","Description","Type"],f,"data-table revolving-history-datatable")}
      </article>

      ${o.endorseModalOpen?`
        <div class="modal-backdrop" role="presentation">
          <div class="receipt-modal" role="dialog" aria-modal="true" style="max-width: 400px; width: 90%;">
            <form id="endorse-form" class="form" style="padding: 24px;">
              <h3 style="margin-top: 0;">Endorse Money</h3>
              <p class="meta" style="margin-bottom: 16px;">Endorsing cash from <strong>${m(o.endorseSaleDate)}</strong>.</p>
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
  `}function ur(){document.querySelector("#revolving-history-filters")?.addEventListener("submit",async p=>{p.preventDefault();const u=new FormData(p.currentTarget);o.revolvingHistoryFrom=String(u.get("revolvingHistoryFrom")??"").trim(),o.revolvingHistoryTo=String(u.get("revolvingHistoryTo")??"").trim(),await S()}),document.querySelector("#revolving-history-clear")?.addEventListener("click",async()=>{o.revolvingHistoryFrom="",o.revolvingHistoryTo="",await S()}),document.querySelectorAll(".revolving-btn").forEach(p=>{p.addEventListener("click",async()=>{o.revolvingModalOpen=!0,o.revolvingSaleId=Number(p.dataset.id),await S()})});const e=document.getElementById("confirm-revolving-btn");e&&e.addEventListener("click",async()=>{await Ve(o.revolvingSaleId,"revolving",null,new Date().toISOString()),o.revolvingModalOpen=!1,await S()});const t=document.getElementById("close-revolving-modal");t&&t.addEventListener("click",async()=>{o.revolvingModalOpen=!1,await S()}),document.querySelectorAll(".endorsed-btn").forEach(p=>{p.addEventListener("click",async()=>{o.endorseModalOpen=!0,o.endorseSaleId=Number(p.dataset.id),o.endorseSaleDate=p.dataset.date??"",await S()})});const a=document.getElementById("close-endorse-modal");a&&a.addEventListener("click",async()=>{o.endorseModalOpen=!1,await S()});const r=document.getElementById("endorse-form");r&&r.addEventListener("submit",async p=>{p.preventDefault();const u=new FormData(r),f=String(u.get("endorsedTo")??"").trim();f&&(await Ve(o.endorseSaleId,"endorsed",f,new Date().toISOString()),o.endorseModalOpen=!1,await S())});const s=document.getElementById("add-revolving-fund-btn");s&&s.addEventListener("click",async()=>{o.addFundModalOpen=!0,await S()});const n=document.getElementById("close-add-fund-modal");n&&n.addEventListener("click",async()=>{o.addFundModalOpen=!1,await S()});const i=document.getElementById("add-fund-form");i&&i.addEventListener("submit",async p=>{p.preventDefault();const u=new FormData(i);await Ye({name:String(u.get("name")??"").trim(),amount:Number(u.get("amount")??0),category:"Add Revolving Fund",description:null,type:"add",createdAt:new Date().toISOString()}),o.addFundModalOpen=!1,await S()});const c=document.getElementById("revolving-disbursement-btn");c&&c.addEventListener("click",async()=>{o.disbursementModalOpen=!0,await S()});const l=document.getElementById("close-disbursement-modal");l&&l.addEventListener("click",async()=>{o.disbursementModalOpen=!1,await S()});const d=document.getElementById("disbursement-form");d&&d.addEventListener("submit",async p=>{p.preventDefault();const u=new FormData(d);await Ye({name:String(u.get("name")??"").trim(),amount:Number(u.get("amount")??0),category:String(u.get("category")??"").trim(),description:String(u.get("description")??"").trim(),type:"disbursement",expenseDate:j(),createdAt:new Date().toISOString()}),o.disbursementModalOpen=!1,await S()})}await S();export{he as E,xe as W,Ot as b};
