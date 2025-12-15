import './PdfViewer.css'

function PdfViewer({ pdf, onClose }) {
  const baseUrl = 'https://raw.githubusercontent.com/Shripad735/Get-Placed/main/'
  const pdfUrl = `${baseUrl}${pdf.path}`
  
  // Use PDF.js viewer for preview
  const viewerUrl = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(pdfUrl)}`
  
  // Use Google Docs viewer for "Open in New Tab" (viewable, not download)
  const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=false`

  const handleDownload = () => {
    window.open(pdfUrl, '_blank')
  }

  return (
    <div className="pdf-overlay" onClick={onClose}>
      <div className="pdf-modal" onClick={e => e.stopPropagation()}>
        <header className="pdf-header">
          <h3>{pdf.name}</h3>
          <div className="pdf-actions">
            <button className="btn-download" onClick={handleDownload}>
              ⬇️ Download
            </button>
            <a 
              href={googleViewerUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-external"
            >
              ↗️ Open in New Tab
            </a>
            <button className="btn-close" onClick={onClose}>✕</button>
          </div>
        </header>
        <div className="pdf-content">
          <iframe
            src={viewerUrl}
            title={pdf.name}
          />
        </div>
      </div>
    </div>
  )
}

export default PdfViewer