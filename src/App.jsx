import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  fetchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from './features/employees/employeeSlice'

import EmployeeTable from './components/EmployeeTable'
import EmployeeSearch from './components/EmployeeSearch'
import EmployeeForm from './components/EmployeeForm'

function App() {
  const dispatch = useDispatch()

  const {
    employees,
    loading,
    error,
  } = useSelector((state) => state.employees)

  const [searchResults, setSearchResults] = useState(null)

  // Employee being edited
  const [editingEmployee, setEditingEmployee] = useState(null)

  useEffect(() => {
    dispatch(fetchEmployees())
  }, [dispatch])

  // SEARCH
  const handleSearch = (searchId) => {
    const result = employees.filter(
      (employee) =>
        String(employee.id) === String(searchId)
    )

    setSearchResults(result)
  }

  const handleClear = () => {
    setSearchResults(null)
  }

  // ADD / UPDATE
  const handleSubmitEmployee = (employee) => {

    // UPDATE
    if (editingEmployee) {
      dispatch(
        updateEmployee({
          id: editingEmployee.id,
          employee: employee,
        })
      )

      setEditingEmployee(null)
    }

    // ADD
    else {
      dispatch(addEmployee(employee))
    }
  }

  // EDIT
  const handleEdit = (employee) => {
    setEditingEmployee(employee)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // DELETE
  const handleDelete = (employee) => {

    const confirmed = window.confirm(
      `Are you sure you want to delete ${employee.name}?`
    )

    if (confirmed) {
      dispatch(deleteEmployee(employee.id))
    }
  }

  // CANCEL EDIT
  const handleCancelEdit = () => {
    setEditingEmployee(null)
  }

  const employeesToDisplay =
    searchResults !== null
      ? searchResults
      : employees

  return (
    <div className="container mt-5">

      <h1 className="mb-4">
        Employee Management Application
      </h1>

      {/* ADD / EDIT FORM */}

      <EmployeeForm
        employee={editingEmployee}
        onSubmit={handleSubmitEmployee}
        onCancel={handleCancelEdit}
      />

      {/* SEARCH */}

      <EmployeeSearch
        employees={employees}
        onSearch={handleSearch}
        onClear={handleClear}
      />

      {/* LOADING */}

      {loading && (
        <div className="alert alert-info">
          Loading...
        </div>
      )}

      {/* ERROR */}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* SEARCH NOT FOUND */}

      {!loading &&
        !error &&
        searchResults !== null &&
        searchResults.length === 0 && (
          <div className="alert alert-warning">
            No employee found with this ID.
          </div>
        )}

      {/* EMPLOYEE TABLE */}

      {!loading &&
        !error &&
        employeesToDisplay.length > 0 && (
          <EmployeeTable
            employees={employeesToDisplay}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

    </div>
  )
}

export default App