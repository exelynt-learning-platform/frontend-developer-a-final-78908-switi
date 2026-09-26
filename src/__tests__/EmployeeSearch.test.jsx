import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'

import EmployeeSearch from '../components/EmployeeSearch'

describe('EmployeeSearch', () => {
  const employees = [
    {
      id: '1',
      name: 'Rahul Sharma',
    },
    {
      id: '2',
      name: 'Priya Patil',
    },
  ]

  test('renders search input and buttons', () => {
    render(
      <EmployeeSearch
        employees={employees}
        onSearch={vi.fn()}
        onClear={vi.fn()}
      />
    )

    expect(
      screen.getByPlaceholderText('Enter employee ID')
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: 'Search' })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: 'Clear' })
    ).toBeInTheDocument()
  })

  test('calls onSearch with employee ID', () => {
    const handleSearch = vi.fn()

    render(
      <EmployeeSearch
        employees={employees}
        onSearch={handleSearch}
        onClear={vi.fn()}
      />
    )

    const input = screen.getByPlaceholderText('Enter employee ID')

    fireEvent.change(input, {
      target: { value: '1' },
    })

    fireEvent.click(
      screen.getByRole('button', { name: 'Search' })
    )

    expect(handleSearch).toHaveBeenCalledWith('1')
  })

  test('calls onClear when Clear button is clicked', () => {
    const handleClear = vi.fn()

    render(
      <EmployeeSearch
        employees={employees}
        onSearch={vi.fn()}
        onClear={handleClear}
      />
    )

    fireEvent.click(
      screen.getByRole('button', { name: 'Clear' })
    )

    expect(handleClear).toHaveBeenCalled()
  })
})