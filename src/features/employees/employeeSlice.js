import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import {
  getEmployees,
  createEmployee,
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
// UPDATE EMPLOYEE
// ===============================

export const updateEmployee = createAsyncThunk(
  'employees/updateEmployee',

  async ({ id, employee }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`,
        {
          method: 'PUT',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify(employee),
        }
      )

      if (!response.ok) {
        throw new Error('Failed to update employee')
      }

      const data = await response.json()

      return data

    } catch (error) {
      return rejectWithValue(error.message)
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
      const response = await fetch(
        `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`,
        {
          method: 'DELETE',
        }
      )

      if (!response.ok) {
        throw new Error('Failed to delete employee')
      }

      return id

    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)


// ===============================
// INITIAL STATE
// ===============================

const initialState = {
  employees: [],
  loading: false,
  error: null,
  selectedEmployee: null,
}


// ===============================
// SLICE
// ===============================

const employeeSlice = createSlice({
  name: 'employees',

  initialState,

  reducers: {

    clearError: (state) => {
      state.error = null
    },

    setSelectedEmployee: (state, action) => {
      state.selectedEmployee = action.payload
    },

    clearSelectedEmployee: (state) => {
      state.selectedEmployee = null
    },

  },


  // ===============================
  // ASYNC ACTIONS
  // ===============================

  extraReducers: (builder) => {

    builder

      // --------------------------------
      // FETCH EMPLOYEES
      // --------------------------------

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


      // --------------------------------
      // ADD EMPLOYEE
      // --------------------------------

      .addCase(addEmployee.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false

        state.employees.push(action.payload)
      })

      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })


      // --------------------------------
      // UPDATE EMPLOYEE
      // --------------------------------

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
      })

      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })


      // --------------------------------
      // DELETE EMPLOYEE
      // --------------------------------

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
} = employeeSlice.actions


// ===============================
// REDUCER
// ===============================

export default employeeSlice.reducer