import { useState, useEffect } from 'react'
import './MarkdownViewer.css'

function MarkdownViewer({ file, onClose }) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  const baseUrl = 'https://raw.githubusercontent.com/Shripad735/Get-Placed/main/'
  const fileUrl = `${baseUrl}${file.path}`

  useEffect(() => {
    fetchMarkdown()
  }, [file.path])

  const fetchMarkdown = async () => {
    setLoading(true)
    try {
      const response = await fetch(fileUrl)
      const text = await response.text()
      setContent(parseMarkdown(text))
    } catch (err) {
      setContent('<p>Failed to load content</p>')
    }
    setLoading(false)
  }

  // Simple markdown parser
  const parseMarkdown = (md) => {
    // Remove license header comments
    md = md.replace(/<!--[\s\S]*?-->/g, '')
    
    return md
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      // Images
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      // Unordered lists
      .replace(/^\s*[-*]\s+(.*)$/gim, '<li>$1</li>')
      // Ordered lists
      .replace(/^\d+\.\s+(.*)$/gim, '<li>$1</li>')
      // Line breaks
      .replace(/\n\n/g, '</p><p>')
      // Wrap in paragraphs
      .replace(/^(?!<[hluop])/gim, '<p>')
  }

  return (
    <div className="md-overlay" onClick={onClose}>
      <div className="md-modal" onClick={e => e.stopPropagation()}>
        <header className="md-header">
          <h3>{file.name}</h3>
          <div className="md-actions">
            <a 
              href={fileUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-external"
            >
              ↗️ View Raw
            </a>
            <button className="btn-close" onClick={onClose}>✕</button>
          </div>
        </header>
        <div className="md-content">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <div 
              className="markdown-body"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default MarkdownViewer