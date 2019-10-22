import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import "../css/SelectDropdown.css"

// class SelectDropdown extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { label: "", options: [""] };
//     this.handleChange = this.handleChange.bind(this);
//   }


//   handleChange(event) {
//     console.log("handleOnChange");
//     this.props.changeDataTable(event.target.value);
//   }

//   componentDidMount() {
//     this.setState({ label: this.props.label, options: this.props.options });
//   }

//   render() {
//     return (
//       <div className="defaultDropdown">
//         <Dropdown
//           label={this.state.label}
//           placeholder='Select Option'
//           fluid
//           selection
//           options={this.state.options}
//           onChange={this.handleChange}
//         />
//       </div>
//     );
//   }
// }


class SelectDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { label: "", options: [""] };
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
        />
      </div>
    );
  }
}

export default SelectDropdown
