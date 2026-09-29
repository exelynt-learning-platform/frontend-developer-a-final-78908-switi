
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  fetchEmployees,
  fetchEmployeeById,
  fetchCountries,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  clearSearchResults,
} from '../features/employees/employeeSlice'

import EmployeeTable from './EmployeeTable'
import EmployeeSearch from './EmployeeSearch'
import EmployeeForm from './EmployeeForm'

function EmployeesPage() {
  const dispatch = useDispatch()

  const {
    employees,
    countries,
    loading,
    error,
    countryLoading,
    countryError,
    searchResults,
    searchLoading,
    searchError,
  } = useSelector((state) => state.employees)

  const [editingEmployee, setEditingEmployee] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    dispatch(fetchEmployees())
    dispatch(fetchCountries())
  }, [dispatch])

  const handleSearch = (searchId) => {
    const id = String(searchId).trim()

    if (!id) {
      setHasSearched(false)
      dispatch(clearSearchResults())
      return
    }

    setHasSearched(true)
    dispatch(fetchEmployeeById(id))
  }

  const handleClear = () => {
    setHasSearched(false)
    dispatch(clearSearchResults())
  }


const handleSubmitEmployee = (employee) => {
  setHasSearched(false)
  dispatch(clearSearchResults())

  if (editingEmployee) {
    dispatch(
      updateEmployee({
        id: editingEmployee.id,
        employee,
      })
    )

    setEditingEmployee(null)
  } else {
    dispatch(addEmployee(employee))
  }
}



  const handleEdit = (employee) => {
    setEditingEmployee(employee)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleDelete = (employee) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${employee.name}?`
    )

  
if (confirmed) {
  setHasSearched(false)
  dispatch(clearSearchResults())
  dispatch(deleteEmployee(employee.id))
}


  }

  const handleCancelEdit = () => {
    setEditingEmployee(null)
  }

  const showSearchResults =
    hasSearched &&
    !searchLoading &&
    !searchError &&
    searchResults.length > 0

  const showSearchEmpty =
    hasSearched &&
    !searchLoading &&
    !searchError &&
    searchResults.length === 0

  const showFullTable =
    !hasSearched &&
    !loading &&
    !error &&
    employees.length > 0

  const showEmptyState =
    !hasSearched &&
    !loading &&
    !error &&
    employees.length === 0

  return (
    <div className="container mt-5">
      <h1 className="mb-4">
        Employee Management Application
      </h1>

      <EmployeeForm
        employee={editingEmployee}
        countries={countries}
        countryLoading={countryLoading}
        onSubmit={handleSubmitEmployee}
        onCancel={handleCancelEdit}
      />

      <EmployeeSearch
  onSearch={handleSearch}
  onClear={handleClear}
/>

      {loading && (
        <div className="alert alert-info">
          Loading...
        </div>
      )}

      {searchLoading && (
        <div className="alert alert-info">
          Searching employee...
        </div>
      )}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {countryError && (
        <div className="alert alert-danger">
          {countryError}
        </div>
      )}

      {searchError && !searchLoading && (
        <div className="alert alert-warning">
          No employee found with this ID.
        </div>
      )}

      {showSearchEmpty && (
        <div className="alert alert-warning">
          No employee found with this ID.
        </div>
      )}

      {showSearchResults && (
        <EmployeeTable
          employees={searchResults}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {showFullTable && (
        <EmployeeTable
          employees={employees}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {showEmptyState && (
        <div className="alert alert-secondary text-center">
          No employees available.
        </div>
      )}
    </div>
  )
}

export default EmployeesPage;

