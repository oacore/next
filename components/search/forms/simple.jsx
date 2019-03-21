import React, { Fragment } from 'react'
import { Button, InputGroup, InputGroupAddon, Input } from 'reactstrap'

// Stupid rule does not understand it
/* eslint-disable jsx-a11y/label-has-for */

const SearchField = ({
  size = '',
  id = 'search-form-field',
  label = 'Search in CORE',
  ...fieldProps
}) => (
  <Fragment>
    <label className="sr-only" htmlFor={id}>
      {label}
    </label>
    <InputGroup size={size}>
      <Input type="search" id={id} {...fieldProps} />
      <InputGroupAddon addonType="append">
        <Button color="primary">Search</Button>
      </InputGroupAddon>
    </InputGroup>
  </Fragment>
)

const SearchForm = ({
  action,
  method,
  onSubmit,
  id = 'search-form',
  ...fieldProps
}) => (
  <form id={id} action={action} method={method} onSubmit={onSubmit}>
    <SearchField id={`${id}-field`} size="lg" {...fieldProps} />
  </form>
)

export default SearchForm
