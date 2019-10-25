import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import "../css/SelectDropdown.css"

class SelectDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { label: "", options: [{key:"default"}] };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, data) {
    this.props.changeDataTable(data.value);
  }

  componentDidMount() {
    this.setState({ label: this.props.label, options: this.props.options });
  }

  render() {
    return (
      <div className="defaultDropdown">
        <Dropdown
          label={this.state.label}
          placeholder='Select Option'
          fluid
          selection
          options={this.state.options}
          onChange={this.handleChange}
          updateTable={this.props.changeDataTable}
        />
      </div>
    );
  }
}

export default SelectDropdown
