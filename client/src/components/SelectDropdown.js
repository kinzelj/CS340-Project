import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import "../css/SelectDropdown.css"

const dOptions = [
  {
    key: 'Jenny Hess',
    text: 'Jenny Hess',
    value: 'Jenny Hess',
  },
  {
    key: 'Elliot Fu',
    text: 'Elliot Fu',
    value: 'Elliot Fu',
  },
  {
    key: 'Stevie Feliciano',
    text: 'Stevie Feliciano',
    value: 'Stevie Feliciano',
  }
]

const SelectDropdown = () => (
  <div className="defaultDropdown">
    <Dropdown
      placeholder='Select Option'
      fluid
      selection
      options={dOptions}
    />
  </div>
)

export default SelectDropdown