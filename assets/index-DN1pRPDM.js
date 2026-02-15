(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();class d{constructor(){this.notes=JSON.parse(localStorage.getItem("notes"))||[],this.currentNoteId=null,this.darkMode=JSON.parse(localStorage.getItem("darkMode"))??!0,this.init()}init(){this.setTheme(),this.renderApp(),this.attachEventListeners(),this.notes.length>0&&this.selectNote(this.notes[0].id)}setTheme(){document.documentElement.setAttribute("data-theme",this.darkMode?"dark":"light")}toggleTheme(){this.darkMode=!this.darkMode,localStorage.setItem("darkMode",JSON.stringify(this.darkMode)),this.setTheme()}renderApp(){const e=document.querySelector("#app");e.innerHTML=`
      <div class="notebook-container">
        <div class="sidebar">
          <div class="sidebar-header">
            <div class="sidebar-title-section">
              <h2>📓 Notebook</h2>
            </div>
            <div class="sidebar-actions">
              <button id="themeToggle" class="btn-icon" title="Toggle Theme">🌙</button>
              <button id="newNoteBtn" class="btn-new-note" title="New Note">✚</button>
            </div>
          </div>
          <div class="notes-list" id="notesList"></div>
        </div>
        <div class="main-content">
          <div id="emptyState" class="empty-state">
            <div class="empty-state-content">
              <div class="empty-icon">📝</div>
              <p>Create a new note to get started</p>
              <p class="empty-subtext">Your notes will be saved automatically</p>
            </div>
          </div>
          <div id="noteEditor" class="note-editor" style="display: none;">
            <div class="note-header">
              <input id="noteTitle" type="text" class="note-title" placeholder="Note Title">
              <div class="note-actions">
                <span id="noteDate" class="note-date"></span>
                <button id="deleteNoteBtn" class="btn-delete" title="Delete">🗑️</button>
              </div>
            </div>
            <textarea id="noteContent" class="note-content" placeholder="Start typing your thoughts..."></textarea>
          </div>
        </div>
      </div>
    `,this.renderNotesList()}renderNotesList(){const e=document.querySelector("#notesList");if(this.notes.length===0){e.innerHTML='<div class="empty-notes"><p>No notes yet</p></div>';return}e.innerHTML=this.notes.map(s=>`
        <div class="note-item ${s.id===this.currentNoteId?"active":""}" data-id="${s.id}">
          <div class="note-item-title">${this.escapeHtml(s.title)||"📝 Untitled"}</div>
          <div class="note-item-preview">${this.escapeHtml(s.content).substring(0,60)}...</div>
          <div class="note-item-date">${new Date(s.updatedAt).toLocaleDateString()}</div>
        </div>
      `).join("")}attachEventListeners(){document.querySelector("#newNoteBtn").addEventListener("click",()=>this.createNote()),document.querySelector("#themeToggle").addEventListener("click",()=>{this.toggleTheme();const t=document.querySelector("#themeToggle");t.textContent=this.darkMode?"☀️":"🌙"}),document.querySelector("#themeToggle").textContent=this.darkMode?"☀️":"🌙",document.addEventListener("click",t=>{const o=t.target.closest(".note-item");o&&this.selectNote(o.dataset.id)});const e=document.querySelector("#noteTitle"),s=document.querySelector("#noteContent");e&&e.addEventListener("input",t=>{if(this.currentNoteId){const o=this.notes.find(n=>n.id===this.currentNoteId);o&&(o.title=t.target.value,this.saveNotes(),this.renderNotesList())}}),s&&s.addEventListener("input",t=>{if(this.currentNoteId){const o=this.notes.find(n=>n.id===this.currentNoteId);o&&(o.content=t.target.value,o.updatedAt=new Date().toISOString(),this.saveNotes(),this.renderNotesList())}});const i=document.querySelector("#deleteNoteBtn");i&&i.addEventListener("click",()=>this.deleteNote())}createNote(){const e={id:Date.now().toString(),title:"",content:"",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};this.notes.unshift(e),this.saveNotes(),this.selectNote(e.id),this.renderNotesList(),setTimeout(()=>document.querySelector("#noteTitle")?.focus(),0)}selectNote(e){this.currentNoteId=e;const s=this.notes.find(i=>i.id===e);s&&(document.querySelector("#emptyState").style.display="none",document.querySelector("#noteEditor").style.display="flex",document.querySelector("#noteTitle").value=s.title,document.querySelector("#noteContent").value=s.content,document.querySelector("#noteDate").textContent=`Updated: ${new Date(s.updatedAt).toLocaleDateString()}`,this.renderNotesList())}deleteNote(){this.currentNoteId&&confirm("Are you sure you want to delete this note?")&&(this.notes=this.notes.filter(e=>e.id!==this.currentNoteId),this.saveNotes(),this.currentNoteId=null,this.notes.length>0?this.selectNote(this.notes[0].id):this.renderApp())}saveNotes(){localStorage.setItem("notes",JSON.stringify(this.notes))}escapeHtml(e){const s=document.createElement("div");return s.textContent=e,s.innerHTML}}new d;
