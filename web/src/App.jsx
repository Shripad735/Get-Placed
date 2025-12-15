import { useState } from 'react'
import Sidebar from './components/Sidebar'
import ContentArea from './components/ContentArea'
import PdfViewer from './components/PdfViewer'
import MarkdownViewer from './components/MarkdownViewer'
import { resources } from './data/resources'
import './App.css'

const REPO_URL = 'https://github.com/Shripad735/Get-Placed'

function App() {
  const [activeCategory, setActiveCategory] = useState('CheatSheets')
  const [selectedPdf, setSelectedPdf] = useState(null)
  const [selectedMarkdown, setSelectedMarkdown] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentPath, setCurrentPath] = useState(null)

  const handlePdfSelect = (pdf) => {
    setSelectedPdf(pdf)
  }

  const handleMarkdownSelect = (md) => {
    setSelectedMarkdown(md)
  }

  const handleClosePdf = () => {
    setSelectedPdf(null)
  }

  const handleCloseMarkdown = () => {
    setSelectedMarkdown(null)
  }

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setCurrentPath(null)
    setMobileMenuOpen(false)
  }

  const handleFolderNavigate = (folderPath) => {
    setCurrentPath(folderPath)
  }

  const handleBack = () => {
    setCurrentPath(null)
  }

  return (
    <div className="app">
      <a 
        href={REPO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="github-link"
        title="View on GitHub"
      >
        <svg height="24" viewBox="0 0 16 16" width="24" fill="currentColor">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>
      </a>
      
      <button 
        className="mobile-menu-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>
      
      <Sidebar 
        categories={resources} 
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        isOpen={mobileMenuOpen}
      />
      
      <main className="main-content">
        <ContentArea 
          category={activeCategory}
          categoryData={resources[activeCategory]}
          currentPath={currentPath}
          onPdfSelect={handlePdfSelect}
          onMarkdownSelect={handleMarkdownSelect}
          onFolderNavigate={handleFolderNavigate}
          onBack={handleBack}
        />
      </main>
      
      {selectedPdf && (
        <PdfViewer 
          pdf={selectedPdf} 
          onClose={handleClosePdf}
        />
      )}

      {selectedMarkdown && (
        <MarkdownViewer 
          file={selectedMarkdown} 
          onClose={handleCloseMarkdown}
        />
      )}
      
      <footer className="footer">
        Made by{' '}
        <a href="https://www.shripadkhandare.in" target="_blank" rel="noopener noreferrer">
          Shripad SK
        </a>
      </footer>
    </div>
  )
}

export default App