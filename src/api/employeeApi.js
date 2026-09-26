import axios from 'axios'

const EMPLOYEE_API =
  'https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee'

export const getEmployees = async () => {
  const response = await axios.get(EMPLOYEE_API)
  return response.data
}

export const createEmployee = async (employee) => {
  const response = await axios.post(EMPLOYEE_API, employee)
  return response.data
}

export const updateEmployee = async (id, employee) => {
  const response = await axios.put(
    `${EMPLOYEE_API}/${id}`,
    employee
  )

  return response.data
}