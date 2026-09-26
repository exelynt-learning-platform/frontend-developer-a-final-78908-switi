import { useEffect, useState } from 'react'

function EmployeeForm({
  employee,
  countries,
  countryLoading,
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    name: '',
    emailId: '',
    mobile: '',
    country: '',
    state: '',
    district: '',
  })

  const [errors, setErrors] = useState({})

  // When editing, fill the form with existing employee data
  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || '',
        emailId: employee.emailId || employee.email || '',
        mobile: employee.mobile || '',
        country: employee.country || '',
        state: employee.state || '',
        district: employee.district || '',
      })
    } else {
      setFormData({
        name: '',
        emailId: '',
        mobile: '',
        country: '',
        state: '',
        district: '',
      })
    }

    setErrors({})
  }, [employee])

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })

    // Remove error when user starts typing
    setErrors({
      ...errors,
      [name]: '',
    })
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length > 50) {
      newErrors.name = 'Name must not exceed 50 characters'
    }

    // Email validation
    if (!formData.emailId.trim()) {
      newErrors.emailId = 'Email is required'
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId)
    ) {
      newErrors.emailId = 'Enter a valid email address'
    } else if (formData.emailId.length > 100) {
      newErrors.emailId = 'Email must not exceed 100 characters'
    }

    // Mobile validation
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required'
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must contain 10 digits'
    }

    // Country validation
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required'
    }

    // State validation
    if (!formData.state.trim()) {
      newErrors.state = 'State is required'
    }

    // District validation
    if (!formData.district.trim()) {
      newErrors.district = 'District is required'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    onSubmit(formData)

    // Clear form only when adding
    if (!employee) {
      setFormData({
        name: '',
        emailId: '',
        mobile: '',
        country: '',
        state: '',
        district: '',
      })
    }

    setErrors({})
  }

  // Cancel edit
  const handleCancel = () => {
    setFormData({
      name: '',
      emailId: '',
      mobile: '',
      country: '',
      state: '',
      district: '',
    })

    setErrors({})

    onCancel()
  }

  return (
    <div className="card shadow-sm mb-4">

      <div className="card-header bg-primary text-white">
        <h4 className="mb-0">
          {employee ? 'Edit Employee' : 'Add Employee'}
        </h4>
      </div>

      <div className="card-body">

        <form onSubmit={handleSubmit}>

          <div className="row">

            {/* Name */}
            <div className="col-md-6 mb-3">
              <label className="form-label">
                Name <span className="text-danger">*</span>
              </label>

              <input
                type="text"
                name="name"
                className={`form-control ${
                  errors.name ? 'is-invalid' : ''
                }`}
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter employee name"
                maxLength="50"
              />

              {errors.name && (
                <div className="invalid-feedback">
                  {errors.name}
                </div>
              )}
            </div>

            {/* Email */}
            <div className="col-md-6 mb-3">
              <label className="form-label">
                Email <span className="text-danger">*</span>
              </label>

              <input
                type="email"
                name="emailId"
                className={`form-control ${
                  errors.emailId ? 'is-invalid' : ''
                }`}
                value={formData.emailId}
                onChange={handleChange}
                placeholder="Enter email address"
                maxLength="100"
              />

              {errors.emailId && (
                <div className="invalid-feedback">
                  {errors.emailId}
                </div>
              )}
            </div>

            {/* Mobile */}
            <div className="col-md-6 mb-3">
              <label className="form-label">
                Mobile <span className="text-danger">*</span>
              </label>

              <input
                type="text"
                name="mobile"
                className={`form-control ${
                  errors.mobile ? 'is-invalid' : ''
                }`}
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter 10 digit mobile number"
                maxLength="10"
              />

              {errors.mobile && (
                <div className="invalid-feedback">
                  {errors.mobile}
                </div>
              )}
            </div>

            {/* Country */}
           <div className="col-md-6 mb-3">
  <label htmlFor="country" className="form-label">
  Country <span className="text-danger">*</span>
</label>

  <select
  id="country"
  name="country"
    className={`form-select ${
      errors.country ? 'is-invalid' : ''
    }`}
    value={formData.country}
    onChange={handleChange}
  >
    <option value="">
      {countryLoading
        ? 'Loading countries...'
        : 'Select country'}
    </option>

    {countries?.map((item) => (
      <option key={item.id} value={item.country}>
        {item.country}
      </option>
    ))}
  </select>

  {errors.country && (
    <div className="invalid-feedback">
      {errors.country}
    </div>
  )}
</div>
            {/* State */}
            <div className="col-md-6 mb-3">
              <label className="form-label">
                State <span className="text-danger">*</span>
              </label>

              <input
                type="text"
                name="state"
                className={`form-control ${
                  errors.state ? 'is-invalid' : ''
                }`}
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter state"
              />

              {errors.state && (
                <div className="invalid-feedback">
                  {errors.state}
                </div>
              )}
            </div>

            {/* District */}
            <div className="col-md-6 mb-3">
              <label className="form-label">
                District <span className="text-danger">*</span>
              </label>

              <input
                type="text"
                name="district"
                className={`form-control ${
                  errors.district ? 'is-invalid' : ''
                }`}
                value={formData.district}
                onChange={handleChange}
                placeholder="Enter district"
              />

              {errors.district && (
                <div className="invalid-feedback">
                  {errors.district}
                </div>
              )}
            </div>

          </div>

          {/* Buttons */}
          <div className="mt-3">

            <button
              type="submit"
              className="btn btn-success me-2"
            >
              {employee ? 'Update Employee' : 'Add Employee'}
            </button>

            {employee && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}

          </div>

        </form>

      </div>
    </div>
  )
}

export default EmployeeForm