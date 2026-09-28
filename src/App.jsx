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
} from './features/employees/employeeSlice'

import EmployeeTable from './components/EmployeeTable'
import EmployeeSearch from './components/EmployeeSearch'
import EmployeeForm from './components/EmployeeForm'


function App() {
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


  // Employee being edited
  const [editingEmployee, setEditingEmployee] = useState(null)


  // ===============================
  // LOAD EMPLOYEES & COUNTRIES
  // ===============================

  useEffect(() => {
    dispatch(fetchEmployees())
    dispatch(fetchCountries())
  }, [dispatch])


  // ===============================
  // SEARCH BY EMPLOYEE ID
  // ===============================

  const handleSearch = (searchId) => {
    const id = String(searchId).trim()

    if (!id) {
      dispatch(clearSearchResults())
      return
    }

    dispatch(fetchEmployeeById(id))
  }


  // ===============================
  // CLEAR SEARCH
  // ===============================

  const handleClear = () => {
    dispatch(clearSearchResults())
  }


  // ===============================
  // ADD / UPDATE EMPLOYEE
  // ===============================

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


  // ===============================
  // EDIT EMPLOYEE
  // ===============================

  const handleEdit = (employee) => {
    setEditingEmployee(employee)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }


  // ===============================
  // DELETE EMPLOYEE
  // ===============================

  const handleDelete = (employee) => {

    const confirmed = window.confirm(
      `Are you sure you want to delete ${employee.name}?`
    )

    if (confirmed) {
      dispatch(deleteEmployee(employee.id))
    }
  }


  // ===============================
  // CANCEL EDIT
  // ===============================

  const handleCancelEdit = () => {
    setEditingEmployee(null)
  }


  // ===============================
  // EMPLOYEES TO DISPLAY
  // ===============================

  const isSearching =
    searchResults.length > 0 ||
    searchLoading ||
    searchError

  const employeesToDisplay =
    isSearching
      ? searchResults
      : employees


  // ===============================
  // UI
  // ===============================

  return (
    <div className="container mt-5">

      <h1 className="mb-4">
        Employee Management Application
      </h1>


      {/* ===============================
          ADD / EDIT FORM
      =============================== */}

      <EmployeeForm
        employee={editingEmployee}
        countries={countries}
        countryLoading={countryLoading}
        onSubmit={handleSubmitEmployee}
        onCancel={handleCancelEdit}
      />


      {/* ===============================
          SEARCH
      =============================== */}

      <EmployeeSearch
        employees={employees}
        onSearch={handleSearch}
        onClear={handleClear}
      />


      {/* ===============================
          MAIN LOADING
      =============================== */}

      {loading && (
        <div className="alert alert-info">
          Loading...
        </div>
      )}


      {/* ===============================
          SEARCH LOADING
      =============================== */}

      {searchLoading && (
        <div className="alert alert-info">
          Searching employee...
        </div>
      )}


      {/* ===============================
          MAIN ERROR
      =============================== */}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}


      {/* ===============================
          COUNTRY ERROR
      =============================== */}

      {countryError && (
        <div className="alert alert-danger">
          {countryError}
        </div>
      )}


      {/* ===============================
          SEARCH ERROR / NOT FOUND
      =============================== */}

      {searchError && !searchLoading && (
        <div className="alert alert-warning">
          No employee found with this ID.
        </div>
      )}


      {/* ===============================
          SEARCH RESULT
      =============================== */}

      {!searchLoading &&
        !searchError &&
        searchResults.length > 0 && (
          <EmployeeTable
            employees={searchResults}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}


      {/* ===============================
          NORMAL EMPLOYEE TABLE
      =============================== */}

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


      {/* ===============================
          EMPTY EMPLOYEE LIST
      =============================== */}

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


export default App