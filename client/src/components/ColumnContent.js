import React from 'react'
import DataTable from './DataTable.js'
import SelectDropdown from './SelectDropdown.js'


function ColumnContent(props) {
    switch (props.content) {
        case ("view_items"):
            {
                return (
                    <div>
                        <SelectDropdown />          
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
                        <SelectDropdown />          
                    </div>
                );
            }
        case ("remove_item"):
            {
                return (
                    <div>
                        <SelectDropdown />          
                        <SelectDropdown />          
                    </div>
                );
            }
        default:
            {
                return
            }
    }
}
export default ColumnContent
