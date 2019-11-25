import React from 'react'
import DataTable from './DataTable.js'
import ActionForm from './ActionForm.js'
import UpdateForm from './UpdateForm.js'
import * as ServerCall from '../scripts/ServerCall.js'
import Popup from './Popup.js'
import RemovePopup from './RemovePopup.js'

/*******************************************************************
 Main body component that will contain all data rendered to browser 
********************************************************************/
class MainContent extends React.Component {
    state = {
        //table headerNames is an array of strings
        headerNames: ["SELECT OPTION TO SHOW ZOO DATA"],
        //table tableData is an array of objects with keys that match headerNames
        tableData: [],
        showPopup: false,
        popupTitle: "",
        popupMessage: "",
        showUpdatePopup: false,
        updateSelect: "",
        updateId: "",
        updateIdName: "",
        showRemovePopup: false,
        removeSelect: "",
        removeId: "",
        removeIdName: "",
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

    handlePopup = (title, message) => {
        this.setState({ showPopup: true, popupTitle: title, popupMessage: message });
    }
    handlePopupClose = () => {
        this.setState({
            headerNames: ["SELECT OPTION TO SHOW ZOO DATA"],
            tableData: [{}],
            showPopup: false,
            showRemovePopup: false,
            popupTitle: "",
            popupMessage: ""
        });
    }

    handleUpdatePopup = (select, id, idName) => {
        this.setState({
            showUpdatePopup: true,
            updateSelect: select,
            updateId: id,
            updateIdName: idName
        });
    }
    handleUpdatePopupClose = (type, statusMessage) => {
        var title;
        var message;
        if (statusMessage === "success") {
            title = "SUCCESS!"
            message = type + " successfully updated in zoo database.";
        }
        else {
            title = "ERROR!";
            message = "Unable to update " + type + " ---> " + statusMessage;
        }
        this.setState({
            headerNames: ["SELECT OPTION TO SHOW ZOO DATA"],
            tableData: [{}],
            showUpdatePopup: false,
            updateSelect: "",
            updateId: ""
        }, () => { if (statusMessage !== "close") { this.handlePopup(title, message) } });
    }

    handleRemovePopup = (select, id, idName) => {
        this.setState({
            showRemovePopup: true,
            removeSelect: select,
            removeId: id,
            removeIdName: idName
        });
    }
    handleRemovePopupClose = (type, statusMessage) => {
        var title;
        var message;
        if (statusMessage === "success") {
            title = "SUCCESS!"
            message = type + " successfully remove from zoo database.";
        }
        else if (statusMessage === "worker") {
            title = "ERROR!";
            message = "Unable to remove worker from database, likely due to worker is assigned to a cage in the zoo.\nBefore removing, please make sure any cage assigned to this worker has been re-assigned first.";
        }
        else if (statusMessage === "cage") {
            title = "ERROR!";
            message = "Unable to remove cage from database, likely due to one or more animals are assigned to this cage.\nBefore removing, please make sure any animal assigned to this cage has been re-assigned first.";
        }
        else {
            title = "ERROR!";
            message = "Unable to remove " + type + " ---> " + statusMessage;
        }
        this.setState({
            headerNames: ["SELECT OPTION TO SHOW ZOO DATA"],
            tableData: [{}],
            showRemovePopup: false,
            removeSelect: "",
            removeId: ""
        }, () => { if (statusMessage !== "close") { this.handlePopup(title, message) } });
    }

    render() {
        switch (this.props.content) {
            case ("view_items"):
                {
                    return (
                        <div>
                            <ActionForm
                                api={this.handleServerCall}
                                key="viewForm"
                                formType="view"
                                submitForm={this.submitForm} />
                            <DataTable header={this.state.headerNames} data={this.state.tableData} />
                        </div>
                    );
                }
            case ("add_item"):
                {
                    if (this.state.showPopup) {
                        return <Popup closePopup={this.handlePopupClose} title={this.state.popupTitle} message={this.state.popupMessage} />
                    }
                    return (
                        <div>
                            <ActionForm
                                getFood={this.handleServerCall}
                                api={this.handleServerCall}
                                key="addForm"
                                formType="add"
                                submitForm={this.submitForm}
                                popup={this.handlePopup}
                            />
                            <DataTable header={this.state.headerNames} data={this.state.tableData} />
                        </div>
                    );
                }
            case ("update_item"):
                {
                    if (this.state.showPopup) {
                        return <Popup closePopup={this.handlePopupClose} title={this.state.popupTitle} message={this.state.popupMessage} />
                    }
                    if (this.state.showUpdatePopup) {
                        return (
                            <UpdateForm
                                closePopup={this.handleUpdatePopupClose}
                                select={this.state.updateSelect}
                                id={this.state.updateId}
                                idName={this.state.updateIdName}
                            />
                        );
                    }
                    return (
                        <div>
                            <ActionForm
                                api={this.handleServerCall}
                                key="updateForm"
                                formType="update"
                                submitForm={this.submitForm}
                                popup={this.handlePopup}
                                updatePopup={this.handleUpdatePopup}
                            />
                            <DataTable header={this.state.headerNames} data={this.state.tableData} />
                        </div>
                    );
                }
            case ("remove_item"):
                {
                    if (this.state.showPopup) {
                        return <Popup closePopup={this.handlePopupClose} title={this.state.popupTitle} message={this.state.popupMessage} />
                    }
                    if (this.state.showRemovePopup) {
                        return (
                            <RemovePopup
                                closePopup={this.handleRemovePopupClose}
                                select={this.state.removeSelect}
                                id={this.state.removeId}
                                idName={this.state.removeIdName}
                            />
                        );
                    }
                    return (
                        <div>
                            <ActionForm
                                api={this.handleServerCall}
                                key="removeForm"
                                formType="remove"
                                submitForm={this.submitForm}
                                popup={this.handlePopup}
                                removePopup={this.handleRemovePopup}
                            />
                            <DataTable header={this.state.headerNames} data={this.state.tableData} />
                        </div>
                    );
                }
            case ("search_item"):
                {
                    if (this.state.showPopup) {
                        return <Popup closePopup={this.handlePopupClose} title={this.state.popupTitle} message={this.state.popupMessage} />
                    }
                    return (
                        <div>
                            <ActionForm
                                api={this.handleServerCall}
                                key="searchForm"
                                formType="search"
                                submitForm={this.submitForm}
                                popup={this.handlePopup}
                            />
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
