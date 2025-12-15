import './Sidebar.css'

function Sidebar({ categories, activeCategory, onCategoryChange, isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h1>📚 Get Placed</h1>
        <p>Resources for learning</p>
      </div>
      <nav className="sidebar-nav">
        {Object.entries(categories).map(([key, data]) => (
          <button
            key={key}
            className={`nav-item ${activeCategory === key ? 'active' : ''}`}
            onClick={() => onCategoryChange(key)}
          >
            {data.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar