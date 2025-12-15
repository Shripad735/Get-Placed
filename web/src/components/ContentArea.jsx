import { useState, useEffect } from 'react'
import './ContentArea.css'

const BASE_URL = 'https://api.github.com/repos/Shripad735/Get-Placed/contents/'

function ContentArea({ category, categoryData, currentPath, onPdfSelect, onMarkdownSelect, onFolderNavigate, onBack }) {
  const [folderContents, setFolderContents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (currentPath) {
      fetchFolderContents(currentPath)
    }
  }, [currentPath])

  const fetchFolderContents = async (path) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${BASE_URL}${encodeURIComponent(path)}`)
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setFolderContents(data)
    } catch (err) {
      setError('Failed to load folder contents')
      console.error(err)
    }
    setLoading(false)
  }

  const getFileIcon = (type, name = '') => {
    if (type === 'folder' || type === 'dir') return '📁'
    if (name.endsWith('.pdf')) return '📕'
    if (name.endsWith('.md')) return '📝'
    if (name.endsWith('.webp') || name.endsWith('.png') || name.endsWith('.jpg')) return '🖼️'
    return '📄'
  }

  const getFileType = (name) => {
    if (name.endsWith('.pdf')) return 'pdf'
    if (name.endsWith('.md')) return 'markdown'
    if (name.endsWith('.webp') || name.endsWith('.png') || name.endsWith('.jpg')) return 'image'
    return 'file'
  }

  const handleItemClick = (item) => {
    if (item.type === 'folder') {
      onFolderNavigate(item.path)
    } else if (item.type === 'pdf') {
      onPdfSelect(item)
    } else if (item.type === 'image') {
      window.open(`https://raw.githubusercontent.com/Shripad735/Get-Placed/main/${item.path}`, '_blank')
    }
  }

  const handleGitHubItemClick = (item) => {
    const fileType = getFileType(item.name)
    
    if (item.type === 'dir') {
      onFolderNavigate(item.path)
    } else if (fileType === 'pdf') {
      onPdfSelect({ name: item.name.replace('.pdf', ''), path: item.path, type: 'pdf' })
    } else if (fileType === 'markdown') {
      onMarkdownSelect({ name: item.name, path: item.path, type: 'markdown' })
    } else if (fileType === 'image') {
      window.open(item.download_url, '_blank')
    } else {
      window.open(item.html_url, '_blank')
    }
  }

  // Show folder contents if navigating inside a folder
  if (currentPath) {
    const filteredContents = folderContents.filter(item => 
      !item.name.endsWith('.license') && item.name !== '.gitkeep'
    )

    return (
      <div className="content-area">
        <header className="content-header">
          <button className="back-btn" onClick={onBack}>
            ← Back
          </button>
          <h2>{currentPath.split('/').pop()}</h2>
        </header>
        
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
        
        {!loading && filteredContents.length === 0 && (
          <div className="empty">No files found in this folder</div>
        )}
        
        <div className="resource-grid">
          {filteredContents.map((item, index) => (
            <div 
              key={index} 
              className="resource-item"
              onClick={() => handleGitHubItemClick(item)}
            >
              <span className="item-icon">{getFileIcon(item.type, item.name)}</span>
              <div className="item-info">
                <h3>{item.name.replace('.pdf', '').replace('.md', '').replace(/[_+]/g, ' ')}</h3>
              </div>
              <span className="item-type">
                {item.type === 'dir' ? 'FOLDER' : item.name.split('.').pop().toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Show category items
  return (
    <div className="content-area">
      <header className="content-header">
        <h2>{categoryData?.label?.replace(/^[^\s]+\s/, '') || category}</h2>
        <span className="item-count">{categoryData?.items?.length || 0} resources</span>
      </header>
      
      <div className="resource-grid">
        {categoryData?.items?.map((item, index) => (
          <div 
            key={index} 
            className="resource-item"
            onClick={() => handleItemClick(item)}
          >
            <span className="item-icon">{getFileIcon(item.type, item.name)}</span>
            <div className="item-info">
              <h3>{item.name}</h3>
            </div>
            <span className="item-type">{item.type.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContentArea