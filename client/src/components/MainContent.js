import React from 'react'
import DataTable from './DataTable.js'
import ActionForm from './ActionForm.js'

/*******************************************************************
 Main body component that will contain all data rendered to browser 
********************************************************************/
class MainContent extends React.Component {
    state = {
        tableNames: [{ key: "Loading..." }],
        headerNames:
            [
                "TableHeader1",
                "TableHeader2",
                "TableHeader3",
                "TableHeader4",
                "TableHeader5",
            ],
        tableData:
            [[
                { TableHeader1: "Cell00", TableHeader2: "Cell01", TableHeader3: "Cell02", TableHeader4: "Cell03", TableHeader5: "Cell04" },
                { TableHeader1: "Cell10", TableHeader2: "Cell11", TableHeader3: "Cell12", TableHeader4: "Cell13", TableHeader5: "Cell14" },
                { TableHeader1: "Cell20", TableHeader2: "Cell21", TableHeader3: "Cell22", TableHeader4: "Cell23", TableHeader5: "Cell24" },
                { TableHeader1: "Cell30", TableHeader2: "Cell31", TableHeader3: "Cell32", TableHeader4: "Cell33", TableHeader5: "Cell34" },
                { TableHeader1: "Cell40", TableHeader2: "Cell41", TableHeader3: "Cell42", TableHeader4: "Cell43", TableHeader5: "Cell44" },
            ],
            [
                { TableHeader1: "Add00", TableHeader2: "Add01", TableHeader3: "Add02", TableHeader4: "Add03", TableHeader5: "Add04" },
            ],
            [
                { TableHeader1: "Update00", TableHeader2: "Update01", TableHeader3: "Update02", TableHeader4: "Update03", TableHeader5: "Update04" },
            ],

            [
                { TableHeader1: "Remove00", TableHeader2: "Remove01", TableHeader3: "Remove02", TableHeader4: "Remove03", TableHeader5: "Remove04" },
            ]
            ],
        readTable: ""
    };

    submitForm = (formData) => {
        console.log(formData);
    }

    render() {
        switch (this.props.content) {
            case ("view_items"):
                {
                    return (
                        <div>
                            <ActionForm key="viewForm" formType="view" submitForm={this.submitForm}/>
                            <DataTable header={this.state.headerNames} data={this.state.tableData[0]} />
                        </div>
                    );
                }
            case ("add_item"):
                {
                    return (
                        <div>
                            <ActionForm key="addForm" formType="add" submitForm={this.submitForm}/>
                            <DataTable header={this.state.headerNames} data={this.state.tableData[1]} />
                        </div>
                    );
                }
            case ("update_item"):
                {
                    return (
                        <div>
                            <ActionForm key="updateForm" formType="update" submitForm={this.submitForm}/>
                            <DataTable header={this.state.headerNames} data={this.state.tableData[2]} />
                        </div>
                    );
                }
            case ("remove_item"):
                {
                    return (
                        <div>
                            <ActionForm key="removeForm" formType="remove" submitForm={this.submitForm}/>
                            <DataTable header={this.state.headerNames} data={this.state.tableData[3]} />
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


export default MainContent
