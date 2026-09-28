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

  useEffect(() => {
    dispatch(fetchEmployees())
    dispatch(fetchCountries())
  }, [dispatch])

  const handleSearch = (searchId) => {
    const id = String(searchId).trim()

    if (!id) {
      dispatch(clearSearchResults())
      return
    }

    dispatch(fetchEmployeeById(id))
  }

  const handleClear = () => {
    dispatch(clearSearchResults())
  }

  const handleSubmitEmployee = (employee) => {
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
      dispatch(deleteEmployee(employee.id))
    }
  }

  const handleCancelEdit = () => {
    setEditingEmployee(null)
  }

  const isSearching =
    searchResults.length > 0 ||
    searchLoading ||
    searchError

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
        employees={employees}
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

      {!searchLoading &&
        !searchError &&
        searchResults.length > 0 && (
          <EmployeeTable
            employees={searchResults}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

      {!searchLoading &&
        !searchError &&
        searchResults.length === 0 &&
        !isSearching &&
        !loading &&
        !error &&
        employees.length > 0 && (
          <EmployeeTable
            employees={employees}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

      {!loading &&
        !searchLoading &&
        !error &&
        !searchError &&
        employees.length === 0 && (
          <div className="alert alert-secondary text-center">
            No employees available.
          </div>
        )}
    </div>
  )
}

export default EmployeesPage