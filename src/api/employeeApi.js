import axios from 'axios'

const EMPLOYEE_API =
  'https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee'

const COUNTRY_API =
  'https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country'

// GET ALL EMPLOYEES
export const getEmployees = async () => {
  const response = await axios.get(EMPLOYEE_API)
  return response.data
}

// GET EMPLOYEE BY ID
export const getEmployeeById = async (id) => {
  const response = await axios.get(`${EMPLOYEE_API}/${id}`)
  return response.data
}

// CREATE EMPLOYEE
export const createEmployee = async (employee) => {
  const response = await axios.post(EMPLOYEE_API, employee)
  return response.data
}

// UPDATE EMPLOYEE
export const updateEmployee = async (id, employee) => {
  const response = await axios.put(
    `${EMPLOYEE_API}/${id}`,
    employee
  )

  return response.data
}

// DELETE EMPLOYEE
export const deleteEmployee = async (id) => {
  const response = await axios.delete(
    `${EMPLOYEE_API}/${id}`
  )

  return response.data
}

// GET COUNTRIES
export const getCountries = async () => {
  const response = await axios.get(COUNTRY_API)
  return response.data
}