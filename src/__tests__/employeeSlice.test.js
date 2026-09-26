import { describe, it, expect } from 'vitest'

import reducer, {
  clearError,
  setSelectedEmployee,
  clearSelectedEmployee,
} from '../features/employees/employeeSlice'

describe('employeeSlice', () => {

  const initialState = {
    employees: [],
    countries: [],
    loading: false,
    error: null,
    countryLoading: false,
    countryError: null,
    selectedEmployee: null,
  }

  it('returns the initial state', () => {
    const state = reducer(undefined, { type: 'unknown' })

    expect(state).toEqual(initialState)
  })

  it('sets selected employee', () => {
    const employee = {
      id: '1',
      name: 'John',
      emailId: 'john@gmail.com',
    }

    const state = reducer(
      initialState,
      setSelectedEmployee(employee)
    )

    expect(state.selectedEmployee).toEqual(employee)
  })

  it('clears selected employee', () => {
    const stateWithEmployee = {
      ...initialState,
      selectedEmployee: {
        id: '1',
        name: 'John',
      },
    }

    const state = reducer(
      stateWithEmployee,
      clearSelectedEmployee()
    )

    expect(state.selectedEmployee).toBeNull()
  })

  it('clears employee error', () => {
    const stateWithError = {
      ...initialState,
      error: 'Something went wrong',
    }

    const state = reducer(
      stateWithError,
      clearError()
    )

    expect(state.error).toBeNull()
  })

})
