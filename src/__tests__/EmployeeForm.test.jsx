import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'

import EmployeeForm from '../components/EmployeeForm'


describe('EmployeeForm', () => {

  test('renders all employee fields', () => {

    render(
      <EmployeeForm
        employee={null}
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
      />
    )

    expect(
      screen.getByPlaceholderText('Enter employee name')
    ).toBeInTheDocument()

    expect(
      screen.getByPlaceholderText('Enter email address')
    ).toBeInTheDocument()

    expect(
      screen.getByPlaceholderText(
        'Enter 10 digit mobile number'
      )
    ).toBeInTheDocument()

    expect(
  screen.getByRole('combobox', { name: /country/i })
).toBeInTheDocument()

    expect(
      screen.getByPlaceholderText('Enter state')
    ).toBeInTheDocument()

    expect(
      screen.getByPlaceholderText('Enter district')
    ).toBeInTheDocument()

  })


  test('shows validation errors when form is empty', () => {

    render(
      <EmployeeForm
        employee={null}
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
      />
    )

    const button = screen.getByRole('button', {
      name: 'Add Employee',
    })

    fireEvent.click(button)

    expect(
      screen.getByText('Name is required')
    ).toBeInTheDocument()

    expect(
      screen.getByText('Email is required')
    ).toBeInTheDocument()

    expect(
      screen.getByText('Mobile number is required')
    ).toBeInTheDocument()

    expect(
      screen.getByText('Country is required')
    ).toBeInTheDocument()

    expect(
      screen.getByText('State is required')
    ).toBeInTheDocument()

    expect(
      screen.getByText('District is required')
    ).toBeInTheDocument()

  })


  test('shows Update Employee button when editing', () => {

    const employee = {
      id: '1',
      name: 'Rahul Sharma',
      emailId: 'rahul@gmail.com',
      mobile: '9876543210',
      country: 'India',
      state: 'Maharashtra',
      district: 'Pune',
    }

    render(
      <EmployeeForm
        employee={employee}
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
      />
    )

    expect(
      screen.getByRole('button', {
        name: 'Update Employee',
      })
    ).toBeInTheDocument()

    expect(
      screen.getByDisplayValue('Rahul Sharma')
    ).toBeInTheDocument()

    expect(
      screen.getByDisplayValue('rahul@gmail.com')
    ).toBeInTheDocument()

  })

})