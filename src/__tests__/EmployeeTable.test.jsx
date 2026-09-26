import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'

import EmployeeTable from '../components/EmployeeTable'


describe('EmployeeTable', () => {

  const employees = [
    {
      id: '1',
      name: 'Rahul Sharma',
      emailId: 'rahul@gmail.com',
      mobile: '9876543210',
      country: 'India',
    },
    {
      id: '2',
      name: 'Priya Patil',
      emailId: 'priya@gmail.com',
      mobile: '9876543211',
      country: 'India',
    },
  ]


  test('renders employee data', () => {

    render(
      <EmployeeTable
        employees={employees}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    )

    expect(
      screen.getByText('Rahul Sharma')
    ).toBeInTheDocument()

    expect(
      screen.getByText('Priya Patil')
    ).toBeInTheDocument()

    expect(
      screen.getByText('rahul@gmail.com')
    ).toBeInTheDocument()

    expect(
      screen.getByText('9876543210')
    ).toBeInTheDocument()

  })


  test('renders Edit and Delete buttons', () => {

    render(
      <EmployeeTable
        employees={employees}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    )

    const editButtons = screen.getAllByRole('button', {
      name: 'Edit',
    })

    const deleteButtons = screen.getAllByRole('button', {
      name: 'Delete',
    })

    expect(editButtons).toHaveLength(2)

    expect(deleteButtons).toHaveLength(2)

  })


  test('calls onEdit when Edit button is clicked', () => {

    const handleEdit = vi.fn()

    render(
      <EmployeeTable
        employees={employees}
        onEdit={handleEdit}
        onDelete={vi.fn()}
      />
    )

    const editButtons = screen.getAllByRole('button', {
      name: 'Edit',
    })

    fireEvent.click(editButtons[0])

    expect(handleEdit).toHaveBeenCalledWith(
      employees[0]
    )

  })


  test('calls onDelete when Delete button is clicked', () => {

    const handleDelete = vi.fn()

    render(
      <EmployeeTable
        employees={employees}
        onEdit={vi.fn()}
        onDelete={handleDelete}
      />
    )

    const deleteButtons = screen.getAllByRole('button', {
      name: 'Delete',
    })

    fireEvent.click(deleteButtons[0])

    expect(handleDelete).toHaveBeenCalledWith(
      employees[0]
    )

  })

})