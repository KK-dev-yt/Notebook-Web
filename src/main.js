import './style.css'

// Notebook App - Outlook Style
class NotebookApp {
  constructor() {
    this.notes = JSON.parse(localStorage.getItem('notes')) || []
    this.currentNoteId = null
    this.darkMode = JSON.parse(localStorage.getItem('darkMode')) ?? true
    this.init()
  }

  init() {
    this.setTheme()
    this.renderApp()
    this.attachEventListeners()
    if (this.notes.length > 0) {
      this.selectNote(this.notes[0].id)
    }
  }

  setTheme() {
    document.documentElement.setAttribute('data-theme', this.darkMode ? 'dark' : 'light')
  }

  toggleTheme() {
    this.darkMode = !this.darkMode
    localStorage.setItem('darkMode', JSON.stringify(this.darkMode))
    this.setTheme()
  }

  renderApp() {
    const app = document.querySelector('#app')
    app.innerHTML = `
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
    `
    this.renderNotesList()
  }

  renderNotesList() {
    const notesList = document.querySelector('#notesList')
    if (this.notes.length === 0) {
      notesList.innerHTML = '<div class="empty-notes"><p>No notes yet</p></div>'
      return
    }

    notesList.innerHTML = this.notes
      .map(note => `
        <div class="note-item ${note.id === this.currentNoteId ? 'active' : ''}" data-id="${note.id}">
          <div class="note-item-title">${this.escapeHtml(note.title) || '📝 Untitled'}</div>
          <div class="note-item-preview">${this.escapeHtml(note.content).substring(0, 60)}...</div>
          <div class="note-item-date">${new Date(note.updatedAt).toLocaleDateString()}</div>
        </div>
      `)
      .join('')
  }

  attachEventListeners() {
    document.querySelector('#newNoteBtn').addEventListener('click', () => this.createNote())
    document.querySelector('#themeToggle').addEventListener('click', () => {
      this.toggleTheme()
      const btn = document.querySelector('#themeToggle')
      btn.textContent = this.darkMode ? '☀️' : '🌙'
    })
    
    // Set initial theme button
    document.querySelector('#themeToggle').textContent = this.darkMode ? '☀️' : '🌙'
    
    document.addEventListener('click', (e) => {
      const noteItem = e.target.closest('.note-item')
      if (noteItem) {
        this.selectNote(noteItem.dataset.id)
      }
    })

    const titleInput = document.querySelector('#noteTitle')
    const contentInput = document.querySelector('#noteContent')
    
    if (titleInput) {
      titleInput.addEventListener('input', (e) => {
        if (this.currentNoteId) {
          const note = this.notes.find(n => n.id === this.currentNoteId)
          if (note) {
            note.title = e.target.value
            this.saveNotes()
            this.renderNotesList()
          }
        }
      })
    }

    if (contentInput) {
      contentInput.addEventListener('input', (e) => {
        if (this.currentNoteId) {
          const note = this.notes.find(n => n.id === this.currentNoteId)
          if (note) {
            note.content = e.target.value
            note.updatedAt = new Date().toISOString()
            this.saveNotes()
            this.renderNotesList()
          }
        }
      })
    }

    const deleteBtn = document.querySelector('#deleteNoteBtn')
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => this.deleteNote())
    }
  }

  createNote() {
    const note = {
      id: Date.now().toString(),
      title: '',
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    this.notes.unshift(note)
    this.saveNotes()
    this.selectNote(note.id)
    this.renderNotesList()
    setTimeout(() => document.querySelector('#noteTitle')?.focus(), 0)
  }

  selectNote(noteId) {
    this.currentNoteId = noteId
    const note = this.notes.find(n => n.id === noteId)
    
    if (note) {
      document.querySelector('#emptyState').style.display = 'none'
      document.querySelector('#noteEditor').style.display = 'flex'
      document.querySelector('#noteTitle').value = note.title
      document.querySelector('#noteContent').value = note.content
      document.querySelector('#noteDate').textContent = `Updated: ${new Date(note.updatedAt).toLocaleDateString()}`
      this.renderNotesList()
    }
  }

  deleteNote() {
    if (!this.currentNoteId) return
    
    if (confirm('Are you sure you want to delete this note?')) {
      this.notes = this.notes.filter(n => n.id !== this.currentNoteId)
      this.saveNotes()
      this.currentNoteId = null
      
      if (this.notes.length > 0) {
        this.selectNote(this.notes[0].id)
      } else {
        this.renderApp()
      }
    }
  }

  saveNotes() {
    localStorage.setItem('notes', JSON.stringify(this.notes))
  }

  escapeHtml(text) {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }
}

// Initialize the app
new NotebookApp()
