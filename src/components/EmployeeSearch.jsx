import { useState } from 'react'

function EmployeeSearch({ employees, onSearch, onClear }) {
  const [searchId, setSearchId] = useState('')

  const handleSearch = () => {
    if (searchId.trim() === '') {
      return
    }

    onSearch(searchId.trim())
  }

  const handleClear = () => {
    setSearchId('')
    onClear()
  }

  return (
    <div className="row mb-4">
      <div className="col-md-6">
        <label className="form-label">
          Search Employee by ID
        </label>

        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter employee ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />

          <button
            className="btn btn-primary"
            onClick={handleSearch}
          >
            Search
          </button>

          <button
            className="btn btn-secondary"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmployeeSearch