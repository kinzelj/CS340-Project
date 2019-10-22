import React from 'react'
import DataTable from './DataTable.js'
import SelectDropdown from './SelectDropdown.js'

const optionProps = {
    view: {
        key: "dk-view",
        dropdown1: [{
                text: "Animals",
                value: "Animals"
            },
            {
                text: "Workers",
                value: "Workers"
            },
            {
                text: "Cages",
                value: "Cages"
            },
            {
                text: "All Animal Foods",
                value: "All Animal Foods"
            },
            {
                text: "Animal - Approved Foods",
                value: "Animal - Approved Foods"
            },
            {
                text: "Worker - Animal Assignments",
                value: "Worker - Animal Assignments"
            },
            {
                text: "Worker - Cage Assignments",
                value: "Worker - Cage Assignments"
            },
            // {
            //     text: "",
            //     value: ""
            // }
        ],

    },
    add: {
        key: "dk-add",
        dropdown1: [{
            text: "add1",
            value: "add1"
        }, ],

    },
    update: {
        key: "dk-update",
        dropdown1: [{
            text: "update1",
            value: "update1"
        }, ],

    },
    remove: {
        key: "dk-remove",
        dropdown1: [{
            text: "remove1",
            value: "remove1"
        }, ],

    }
};

class ColumnContent extends React.Component {
    viewData = (props) => {
        console.log(props);
    }
    
    render() {
        switch (this.props.content) {
            case ("view_items"):
            {
                return (
                    <div>
                    <label>SELECT OPTION TO VIEW ZOO DATA</label>
                    <SelectDropdown 
                        key={optionProps.view.key} 
                        options={optionProps.view.dropdown1} 
                        changeDataTable={this.viewData}
                    />          
                    <DataTable />
                </div>
                );
            }
            case ("add_item"):
            {
                return (
                    <div>
                    <DataTable />
                </div>
                );
            }
            case ("update_item"):
            {
                return (
                    <div>
                    <SelectDropdown 
                        label="Select Option"
                        key={optionProps.update.key} 
                        options={optionProps.update.dropdown1}          
                    />
                </div>
                );
            }
            case ("remove_item"):
            {
                return (
                    <div>
                    <SelectDropdown
                        label="Select Option"
                        key={optionProps.remove.key} 
                        options={optionProps.remove.dropdown1} 
                    />          
                </div>
                );
            }
            default:
            {
                return
            }
        }
    }
}
export default ColumnContent
