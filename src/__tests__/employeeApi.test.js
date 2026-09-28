import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'

import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getCountries,
} from '../api/employeeApi'

vi.mock('axios')

describe('employeeApi', () => {

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('gets all employees', async () => {
    const employees = [
      {
        id: '1',
        name: 'John',
        emailId: 'john@gmail.com',
      },
    ]

    axios.get.mockResolvedValue({
      data: employees,
    })

    const result = await getEmployees()

    expect(result).toEqual(employees)
    expect(axios.get).toHaveBeenCalledWith(
      'https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee'
    )
  })

  it('gets employee by ID', async () => {
    const employee = {
      id: '1',
      name: 'John',
    }

    axios.get.mockResolvedValue({
      data: employee,
    })

    const result = await getEmployeeById('1')

    expect(result).toEqual(employee)
    expect(axios.get).toHaveBeenCalledWith(
      'https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/1'
    )
  })

  it('creates an employee', async () => {
    const employee = {
      name: 'John',
      emailId: 'john@gmail.com',
      mobile: '9876543210',
      country: 'India',
      state: 'Maharashtra',
      district: 'Pune',
    }

    const createdEmployee = {
      id: '10',
      ...employee,
    }

    axios.post.mockResolvedValue({
      data: createdEmployee,
    })

    const result = await createEmployee(employee)

    expect(result).toEqual(createdEmployee)
    expect(axios.post).toHaveBeenCalledWith(
      'https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee',
      employee
    )
  })

  it('updates an employee', async () => {
    const employee = {
      name: 'John Updated',
      emailId: 'john@gmail.com',
    }

    const updatedEmployee = {
      id: '1',
      ...employee,
    }

    axios.put.mockResolvedValue({
      data: updatedEmployee,
    })

    const result = await updateEmployee('1', employee)

    expect(result).toEqual(updatedEmployee)
    expect(axios.put).toHaveBeenCalledWith(
      'https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/1',
      employee
    )
  })

  it('deletes an employee', async () => {
    axios.delete.mockResolvedValue({
      data: {},
    })

    const result = await deleteEmployee('1')

    expect(result).toEqual({})
    expect(axios.delete).toHaveBeenCalledWith(
      'https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/1'
    )
  })

  it('gets all countries', async () => {
    const countries = [
      {
        id: '1',
        country: 'India',
      },
      {
        id: '2',
        country: 'Singapore',
      },
    ]

    axios.get.mockResolvedValue({
      data: countries,
    })

    const result = await getCountries()

    expect(result).toEqual(countries)
    expect(axios.get).toHaveBeenCalledWith(
      'https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country'
    )
  })

})