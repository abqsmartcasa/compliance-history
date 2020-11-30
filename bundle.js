(()=>{"use strict";class e{constructor(e){this.emitter=e,this.tableStyle="score",this.data,this.tableHead=document.querySelector(".table__head"),this.dataRows=document.querySelectorAll(".data-row"),this.categoryRows=document.querySelectorAll(".category-row"),this.buildTable=this.buildTable.bind(this),this.filter=this.filter.bind(this),this.setTableDisplay=this.setTableDisplay.bind(this),this.hideCategoryRows=this.hideCategoryRows.bind(this),this.reset=this.reset.bind(this)}buildHead(e){const t=document.createDocumentFragment();for(const s of e.headers){const e=document.createElement("th");e.innerText=`${s}`,t.appendChild(e)}console.log(this.tableHead.querySelector(".top-row")),this.tableHead.querySelector(".top-row").children[1].setAttribute("colspan",e.headers.length-1),this.tableHead.querySelector(".top-row").children[1].style.width=25*(e.headers.length-1)+"px",this.tableHead.querySelector(".labels").appendChild(t)}buildTable(t){this.data=e.calculateChange(t),console.log(this.data),this.buildHead(this.data);[...document.querySelectorAll(".category-row")].map((e=>e.children[0].setAttribute("colspan",this.data.data[0].length)));for(let t=0;t<this.data.data.length;t++){const s=this.data.data[t],i=this.dataRows[t],a=s.shift(),n=a.split(" - ")[0],r=a.split(" - ")[1],c=document.createElement("span");c.innerText=` - ${r}`,c.classList.add("paragraph-description");const l=document.createElement("td");l.classList.add("paragraph-title"),l.innerText=n,l.appendChild(c),i.appendChild(l);for(const t of s){const s=document.createElement("td");s.setAttribute("data-score",t[0]),s.setAttribute("data-change",t[1]),s.classList.add(e.setBackground(t[0])),i.appendChild(s)}}}static calculateChange(e){const t=e.data.map((e=>e.map(((e,t,s)=>0==t?e:1==t?[e,0]:[e,s[t]-s[t-1]]))));return{headers:e.headers,data:t}}filter(t){this.reset();const s=e.setPair(t.imr),i=this.data.data.map((e=>e.filter(((e,t)=>-1!=s.indexOf(t))))).map((e=>e.reduce(((e,t)=>t[0]-e[0]))));for(let e=0;e<i.length;e++)"increase"==t.compliance&&i[e]<1&&this.dataRows[e].classList.add("data-row--hidden"),"decrease"==t.compliance&&i[e]>=0&&this.dataRows[e].classList.add("data-row--hidden"),"change"==t.compliance&&0==i[e]&&this.dataRows[e].classList.add("data-row--hidden");this.hideCategoryRows()}reset(){for(const e of this.dataRows)e.classList.remove("data-row--hidden");for(const e of this.categoryRows)e.classList.remove("category-row--hidden")}setTableDisplay(t){if(t!=this.tableStyle){this.tableStyle=t;for(const t of this.dataRows)for(let i=1;i<t.children.length;i++){const a=t.children[i];for(var s=a.classList;s.length>0;)s.remove(s.item(0));if("score"==this.tableStyle){const t=a.getAttribute("data-score");a.classList.add(e.setChangeBackground(t))}if("change"==this.tableStyle){const t=a.getAttribute("data-change");a.classList.add(e.setChangeBackground(t))}}}}hideCategoryRows(){for(let e=0;e<this.categoryRows.length;e++){const t=s(this.categoryRows[e],this.categoryRows[e+1]);let i=!1;for(const e of t)if(!e.classList.contains("data-row--hidden")){i=!0;break}i||this.categoryRows[e].classList.add("category-row--hidden")}}static setPair(e){let t=[];return t=e>=8?[e-3,e-2]:[e-2,e-1],t}static setChangeBackground(e){let t="no-change";return 1==e&&(t="increase-one"),2==e&&(t="increase-two"),3==e&&(t="increase-three"),-1==e&&(t="decrease-one"),-2==e&&(t="decrease-two"),-3==e&&(t="decrease-three"),t}static setBackground(e){let t="non-compliant";return 1==e&&(t="primary-compliance"),2==e&&(t="secondary-compliance"),3==e&&(t="operational-compliance"),t}}class t{constructor(e,t){this.emitter=e,this.elem=t,this.onClick=this.onClick.bind(this),this.addEventListeners=this.addEventListeners.bind(this),this.addEventListeners()}addEventListeners(){this.elem.addEventListener("click",this.onClick)}onClick(e){this.emitter.emit("set-table-style",e.target.value)}}function s(e,t){var s=[];for(e=e.nextElementSibling;e&&e!=t;)s.push(e),e=e.nextElementSibling;return s}class i{constructor(e){this.emitter=e,this.elem=document.querySelector(".js-clear-btn"),this.onClick=this.onClick.bind(this),this.addEventListeners=this.addEventListeners.bind(this),this.addEventListeners()}addEventListeners(){this.elem.addEventListener("click",this.onClick)}onClick(){this.emitter.emit("clear")}}class a{constructor(e,t){this.emitter=e,this.elem=t,this.onClick=this.onClick.bind(this),this.clear=this.clear.bind(this),this.addEventListeners=this.addEventListeners.bind(this),this.addEventListeners()}addEventListeners(){this.elem.addEventListener("click",this.onClick)}onClick(e){this.emitter.emit("set-filter",e.target.value)}clear(){this.elem.checked&&(this.elem.checked=!1)}}class n{constructor(e){this.elem=document.querySelector(".js-imr-select"),this.emitter=e,this.onChange=this.onChange.bind(this),this.clear=this.clear.bind(this),this.addEventListeners=this.addEventListeners.bind(this),this.addEventListeners()}buildOptions(e){const t=document.createDocumentFragment();for(const s of e){const e=document.createElement("option");e.innerText=`IMR-${s}`,e.value=s,t.appendChild(e)}this.elem.appendChild(t)}addEventListeners(){this.elem.addEventListener("change",this.onChange)}onChange(e){this.emitter.emit("set-imr-value",e.target.value)}clear(){this.elem.value="placeholder"}}class r{constructor(e){this.elem=document.querySelector(".js-filter-btn"),this.filters={},this.emitter=e,this.active=!1,this.onClick=this.onClick.bind(this),this.setImr=this.setImr.bind(this),this.setActive=this.setActive.bind(this),this.clear=this.clear.bind(this),this.checkFilters=this.checkFilters.bind(this),this.setComplianceChange=this.setComplianceChange.bind(this),this.addEventListeners=this.addEventListeners.bind(this),this.addEventListeners()}addEventListeners(){this.elem.addEventListener("click",this.onClick)}setImr(e){this.filters.imr=e,this.checkFilters()}setComplianceChange(e){this.filters.compliance=e,this.checkFilters()}checkFilters(){this.filters.hasOwnProperty("compliance")&&this.filters.hasOwnProperty("imr")&&this.setActive(!0)}clear(){this.filters={},this.setActive(!1)}setActive(e){this.active=e,this.active?(this.elem.classList.add("filter-btn--active"),this.elem.disabled=!1):(this.elem.classList.remove("filter-btn--active"),this.elem.disabled=!0)}onClick(){this.emitter.emit("filter",this.filters)}}const c=function(e){const t=document.querySelectorAll(".js-score-legend-item"),s=document.querySelectorAll(".js-change-legend-item");if("change"==e){for(const e of s)e.classList.remove("legend-item--hidden");for(const e of t)e.classList.add("legend-item--hidden")}else if("score"==e){for(const e of t)e.classList.remove("legend-item--hidden");for(const e of s)e.classList.add("legend-item--hidden")}};(async()=>{const s={all:l=l||new Map,on:function(e,t){var s=l.get(e);s&&s.push(t)||l.set(e,[t])},off:function(e,t){var s=l.get(e);s&&s.splice(s.indexOf(t)>>>0,1)},emit:function(e,t){(l.get(e)||[]).slice().map((function(e){e(t)})),(l.get("*")||[]).slice().map((function(s){s(e,t)}))}};var l;const o=new e(s),d=new n(s),h=document.querySelectorAll(".js-compliance-change-radio"),m=new a(s,h[0]),u=new a(s,h[1]),g=new a(s,h[2]);new i(s);const b=new r(s);document.querySelectorAll(".js-table-display-radio").forEach((e=>new t(s,e))),s.on("set-imr-value",b.setImr),s.on("set-filter",b.setComplianceChange),s.on("filter",o.filter),s.on("clear",b.clear),s.on("clear",u.clear),s.on("clear",m.clear),s.on("clear",g.clear),s.on("clear",d.clear),s.on("clear",o.reset),s.on("set-table-style",o.setTableDisplay),s.on("set-table-style",c),fetch("./data.json").then((e=>e.json())).then((e=>{o.buildTable(e);const t=[...e.headers.slice(1)];d.buildOptions(t)}))})()})();