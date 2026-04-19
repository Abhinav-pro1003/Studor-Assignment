import { useState, useEffect } from 'react'

const CATEGORIES = ['Academic', 'Technical', 'Cultural', 'Sports']

function App() {
  const [activities, setActivities] = useState([])
  const [filter, setFilter] = useState('All')
  const [formData, setFormData] = useState({
    name: '',
    category: 'Academic',
    date: new Date().toISOString().split('T')[0]
  })

  // Load activities from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('pathcredit-activities')
    if (saved) {
      try {
        setActivities(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load activities:', e)
      }
    }
  }, [])

  // Save activities to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('pathcredit-activities', JSON.stringify(activities))
  }, [activities])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.name.trim()) {
      alert('Please enter an activity name')
      return
    }

    // Add new activity
    const newActivity = {
      id: Date.now(),
      name: formData.name.trim(),
      category: formData.category,
      date: formData.date
    }

    setActivities([newActivity, ...activities])

    // Reset form
    setFormData({
      name: '',
      category: 'Academic',
      date: new Date().toISOString().split('T')[0]
    })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const filteredActivities = filter === 'All' 
    ? activities 
    : activities.filter(activity => activity.category === filter)

  return (
    <div className="container">
      <header>
        <h1>PathCredit Logger</h1>
        <p>Track your student activities and milestones</p>
      </header>

      <main>
        {/* Log Activity Form */}
        <section className="form-section">
          <h2>Log an Activity</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Activity Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Completed Python course"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-primary">
              Log Activity
            </button>
          </form>
        </section>

        {/* Activity Feed */}
        <section className="feed-section">
          <div className="feed-header">
            <h2>Activity Feed</h2>
            <div className="filter-group">
              <label htmlFor="filter">Filter:</label>
              <select
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">All Categories</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {filteredActivities.length === 0 ? (
            <div className="empty-state">
              {filter === 'All' 
                ? 'No activities logged yet. Start by adding one above!'
                : `No ${filter} activities found. Try a different filter.`
              }
            </div>
          ) : (
            <div className="activity-list">
              {filteredActivities.map(activity => (
                <div key={activity.id} className="activity-card">
                  <div className="activity-header">
                    <h3>{activity.name}</h3>
                    <span className={`badge badge-${activity.category.toLowerCase()}`}>
                      {activity.category}
                    </span>
                  </div>
                  <div className="activity-date">
                    {new Date(activity.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
