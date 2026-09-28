import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee as updateEmployeeApi,
  deleteEmployee as deleteEmployeeApi,
  getCountries,
} from '../../api/employeeApi'


// ===============================
// GET ALL EMPLOYEES
// ===============================

export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',

  async (_, { rejectWithValue }) => {
    try {
      const data = await getEmployees()

      return data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        'Failed to fetch employees'
      )
    }
  }
)


// ===============================
// GET EMPLOYEE BY ID
// ===============================

export const fetchEmployeeById = createAsyncThunk(
  'employees/fetchEmployeeById',

  async (id, { rejectWithValue }) => {
    try {
      const data = await getEmployeeById(id)

      return data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        'Employee not found'
      )
    }
  }
)


// ===============================
// ADD EMPLOYEE
// ===============================

export const addEmployee = createAsyncThunk(
  'employees/addEmployee',

  async (employee, { rejectWithValue }) => {
    try {
      const data = await createEmployee(employee)

      return data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        'Failed to add employee'
      )
    }
  }
)


// ===============================
// GET ALL COUNTRIES
// ===============================

export const fetchCountries = createAsyncThunk(
  'employees/fetchCountries',

  async (_, { rejectWithValue }) => {
    try {
      const data = await getCountries()

      return data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        'Failed to fetch countries'
      )
    }
  }
)


// ===============================
// UPDATE EMPLOYEE
// ===============================

export const updateEmployee = createAsyncThunk(
  'employees/updateEmployee',

  async ({ id, employee }, { rejectWithValue }) => {
    try {
      const data = await updateEmployeeApi(id, employee)

      return data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        'Failed to update employee'
      )
    }
  }
)


// ===============================
// DELETE EMPLOYEE
// ===============================

export const deleteEmployee = createAsyncThunk(
  'employees/deleteEmployee',

  async (id, { rejectWithValue }) => {
    try {
      await deleteEmployeeApi(id)

      return id
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        'Failed to delete employee'
      )
    }
  }
)


// ===============================
// INITIAL STATE
// ===============================

const initialState = {
  employees: [],
  countries: [],

  loading: false,
  error: null,

  countryLoading: false,
  countryError: null,

  selectedEmployee: null,

  searchResults: [],
  searchLoading: false,
  searchError: null,
}


// ===============================
// SLICE
// ===============================

const employeeSlice = createSlice({
  name: 'employees',

  initialState,

  reducers: {

    // Clear employee error
    clearError: (state) => {
      state.error = null
    },

    // Select employee
    setSelectedEmployee: (state, action) => {
      state.selectedEmployee = action.payload
    },

    // Clear selected employee
    clearSelectedEmployee: (state) => {
      state.selectedEmployee = null
    },

    // Clear search results
    clearSearchResults: (state) => {
      state.searchResults = []
      state.searchError = null
    },

  },


  // ===============================
  // ASYNC ACTIONS
  // ===============================

  extraReducers: (builder) => {

    builder

      // ==================================
      // FETCH EMPLOYEES
      // ==================================

      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false
        state.employees = action.payload
      })

      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })


      // ==================================
      // FETCH EMPLOYEE BY ID
      // ==================================

      .addCase(fetchEmployeeById.pending, (state) => {
        state.searchLoading = true
        state.searchError = null
        state.searchResults = []
      })

      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.searchLoading = false
        state.searchResults = [action.payload]
      })

      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.searchLoading = false
        state.searchError = action.payload
        state.searchResults = []
      })


      // ==================================
      // ADD EMPLOYEE
      // ==================================

      .addCase(addEmployee.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false
        state.employees.push(action.payload)

        // Clear old search results after adding
        state.searchResults = []
        state.searchError = null
      })

      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })


      // ==================================
      // FETCH COUNTRIES
      // ==================================

      .addCase(fetchCountries.pending, (state) => {
        state.countryLoading = true
        state.countryError = null
      })

      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countryLoading = false
        state.countries = action.payload
      })

      .addCase(fetchCountries.rejected, (state, action) => {
        state.countryLoading = false
        state.countryError = action.payload
      })


      // ==================================
      // UPDATE EMPLOYEE
      // ==================================

      .addCase(updateEmployee.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false

        const updatedEmployee = action.payload

        const index = state.employees.findIndex(
          (employee) =>
            String(employee.id) ===
            String(updatedEmployee.id)
        )

        if (index !== -1) {
          state.employees[index] = updatedEmployee
        }

        // Clear old search results after update
        state.searchResults = []
        state.searchError = null
      })

      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })


      // ==================================
      // DELETE EMPLOYEE
      // ==================================

      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false

        state.employees = state.employees.filter(
          (employee) =>
            String(employee.id) !==
            String(action.payload)
        )

        // Clear old search results after delete
        state.searchResults = []
        state.searchError = null
      })

      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

  },
})


// ===============================
// ACTIONS
// ===============================

export const {
  clearError,
  setSelectedEmployee,
  clearSelectedEmployee,
  clearSearchResults,
} = employeeSlice.actions


// ===============================
// REDUCER
// ===============================

export default employeeSlice.reducer