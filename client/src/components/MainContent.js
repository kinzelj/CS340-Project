import React from 'react'
import DataTable from './DataTable.js'
import ActionForm from './ActionForm.js'
import * as ServerCall from '../scripts/ServerCall.js'
import ErrorPopup from './ErrorPopup.js'

/*******************************************************************
 Main body component that will contain all data rendered to browser 
********************************************************************/
class MainContent extends React.Component {
    state = {
        //table headerNames is an array of strings
        headerNames: ["SELECT OPTION TO SHOW ZOO DATA"],
        //table tableData is an array of objects with keys that match headerNames
        tableData: [],
        invalidInput: false,
    };

    submitForm = (formData) => {
        console.log(formData);
    }

    updateTable = (newData) => {
        this.setState({
            headerNames: Object.keys(newData[0]),
            tableData: newData
        });
    }

    handleServerCall = (props) => {
        switch (props.calltype) {
            case ('viewSelect'):
                {
                    ServerCall.viewData({ query: props.viewSelect })
                        .then(res => {
                            this.updateTable(res);
                            return res;
                        })
                        .catch(err => console.log(err));
                    break;
                }
            case ('addSelect'):
                {
                    ServerCall.viewData({ query: props.addSelect })
                        .then(res => {
                            this.updateTable(res);
                        })
                        .catch(err => console.log(err));
                    break;
                }
            case ('updateSelect'):
                {
                    ServerCall.viewData({ query: props.updateSelect })
                        .then(res => {
                            this.updateTable(res);
                        })
                        .catch(err => console.log(err));
                    break;
                }
            case ('removeSelect'):
                {
                    ServerCall.viewData({ query: props.removeSelect })
                        .then(res => {
                            this.updateTable(res);
                        })
                        .catch(err => console.log(err));
                    break;
                }
            case ('searchSelect'):
                {
                    ServerCall.viewData({ query: props.searchSelect })
                        .then(res => {
                            this.updateTable(res);
                        })
                        .catch(err => console.log(err));
                    break;
                }
            case ('searchSubmit'):
                {
                    ServerCall.searchData(props)
                        .then(res => {
                            this.updateTable(res);
                        })
                        .catch(err => console.log(err));
                    break;
                }
            default:
                return;
        }
    }

    componentDidUpdate() {
        //clear table if side menu option clicked
        if (this.props.clicked) {
            this.props.reset();
            this.setState({
                headerNames: ["SELECT OPTION TO SHOW ZOO DATA"],
                tableData: [{}]
            });
        }
    }

    handleInvalidInput = () => {
        this.setState({ invalidInput: true });
    }
    handlePopupClose = () => {
        this.setState({
            headerNames: ["SELECT OPTION TO SHOW ZOO DATA"],
            tableData: [{}],
            invalidInput: false
        });
    }

    render() {
        switch (this.props.content) {
            case ("view_items"):
                {
                    return (
                        <div>
                            <ActionForm api={this.handleServerCall} key="viewForm" formType="view" submitForm={this.submitForm} />
                            <DataTable header={this.state.headerNames} data={this.state.tableData} />
                        </div>
                    );
                }
            case ("add_item"):
                {
                    if (this.state.invalidInput) {
                        return <ErrorPopup closePopup={this.handlePopupClose} message="Invalid Input, please try again."/>
                    }
                    return (
                        <div>
                            <ActionForm
                                getFood={this.handleServerCall}
                                api={this.handleServerCall}
                                key="addForm"
                                formType="add"
                                submitForm={this.submitForm}
                                invalidInput={this.handleInvalidInput}
                            />
                            <DataTable header={this.state.headerNames} data={this.state.tableData} />
                        </div>
                    );
                }
            case ("update_item"):
                {
                    if (this.state.invalidInput) {
                        return <ErrorPopup closePopup={this.handlePopupClose} message="Unable to update this item, please try again." />
                    }
                    return (
                        <div>
                            <ActionForm api={this.handleServerCall} key="updateForm" formType="update" submitForm={this.submitForm} />
                            <DataTable header={this.state.headerNames} data={this.state.tableData} />
                        </div>
                    );
                }
            case ("remove_item"):
                {
                    if (this.state.invalidInput) {
                        return <ErrorPopup closePopup={this.handlePopupClose} message="Cannot remove this item, please try again."/>
                    }
                    return (
                        <div>
                            <ActionForm api={this.handleServerCall} key="removeForm" formType="remove" submitForm={this.submitForm} />
                            <DataTable header={this.state.headerNames} data={this.state.tableData} />
                        </div>
                    );
                }
            case ("search_item"):
                {
                    if (this.state.invalidInput) {
                        return <ErrorPopup closePopup={this.handlePopupClose} message="Search returned zero results, please try again." />
                    }
                    return (
                        <div>
                            <ActionForm api={this.handleServerCall} key="searchForm" formType="search" submitForm={this.submitForm} />
                            <DataTable header={this.state.headerNames} data={this.state.tableData} />
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
