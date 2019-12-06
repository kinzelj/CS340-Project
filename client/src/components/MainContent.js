import React from 'react'
import DataTable from './DataTable.js'
import ActionForm from './ActionForm.js'
import UpdateForm from './UpdateForm.js'
import * as ServerCall from '../scripts/ServerCall.js'
import Popup from './Popup.js'
import LoaderSpin from './Loader.js'
import RemovePopup from './RemovePopup.js'

/*******************************************************************
 * Main body component that will contain all data rendered to browser 
********************************************************************/
class MainContent extends React.Component {
    state = {
        //table headerNames is an array of strings
        headerNames: ["SELECT OPTION TO SHOW ZOO DATA"],
        //table tableData is an array of objects with keys that match headerNames
        tableData: [],
        refreshProps: [],
        showPopup: false,
      	loadingData: false,
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

    //function that sets the state of table headers and data
    updateTable = (newData) => {
        this.setState({
          	loadingData: false,
            headerNames: Object.keys(newData[0]),
            tableData: newData
        });
    }

    //function to call server that will retrieve data to populate table
    handleServerCall = (props) => {
      //show loader spinner if api call to get table data
      	if (props.calltype === 'viewSelect' || 
            props.calltype === 'addSelect' || 
            props.calltype === 'updateSelect' || 
            props.calltype === 'removeSelect' || 
            props.calltype === 'searchSelect' || 
            props.calltype === 'searchSubmit' ) {
        			this.setState({ loadingData: true });
         }
      
      	//call server to retrieve table data
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
                          .catch(err => {
                              const title = "NO SEARCH RESULTS";
                              const message = "Unable to find any database items containing search value."
                              this.handlePopup(title, message);
                          });
                      break;
                  }
              default:
                  return;
          }
    }

    //clear table if side menu option clicked
    componentDidUpdate() {
        if (this.props.clicked) {
            this.props.reset();
            this.setState({
                headerNames: ["SELECT OPTION TO SHOW ZOO DATA"],
                tableData: [{}]
            });
        }
    }

    //handle open and close popup component
    handlePopup = (title, message, callbackProps) => {
        this.setState({ showPopup: true, popupTitle: title, popupMessage: message, refreshProps: callbackProps });
    }
    handlePopupClose = () => {
        this.setState({
            headerNames: ["SELECT OPTION TO SHOW ZOO DATA"],
            tableData: [{}],
            showPopup: false,
            showRemovePopup: false,
            loadingData: false,
            popupTitle: "",
            popupMessage: ""
        }, () => {
            if(this.state.refreshProps){this.handleServerCall(this.state.refreshProps)};
        });
    }

    //handle open of update popup component
    handleUpdatePopup = (select, id, idName) => {
        const updateRefreshProps = { calltype: "updateSelect", updateSelect: select }
        this.setState({
            showUpdatePopup: true,
            updateSelect: select,
            updateId: id,
            updateIdName: idName,
            refreshProps: updateRefreshProps
        });
    }
    //handle UpdateForm close and render appropriate Popup component
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
        }, () => {
            if (statusMessage !== "close") {
                this.handlePopup(title, message, this.state.refreshProps)
                return;
            }
            this.handleServerCall(this.state.refreshProps);
        });
    }

    //handle open of remove popup component 
    handleRemovePopup = (select, id, idName) => {
        const removeRefreshProps = { calltype: "removeSelect", removeSelect: select }
        this.setState({
            showRemovePopup: true,
            removeSelect: select,
            removeId: id,
            removeIdName: idName,
            refreshProps: removeRefreshProps
        });
    }
    //handle RemovePopup close and render appropriate Popup component
    handleRemovePopupClose = (type, statusMessage) => {
        var title;
        var message;
        if (statusMessage === "success") {
            title = "SUCCESS!"
            message = type + " successfully remove from zoo database.";
        }
        else if (statusMessage === "worker") {
            title = "ERROR!";
            message = "Unable to remove worker from database, likely due to worker is assigned to a cage in the zoo.\n"
            +"Before removing, please make sure any cage assigned to this worker has been re-assigned first.";
        }
        else if (statusMessage === "cage") {
            title = "ERROR!";
            message = "Unable to remove cage from database, likely due to one or more animals are assigned to this cage."
            +"\nBefore removing, please make sure any animal assigned to this cage has been re-assigned first.";
        }
        else if (statusMessage === "approvedFoods" || statusMessage === 'food') {
            title = "ERROR!";
            message = "Unable to remove assigned food because this is the only food currently approved for this animal.\n"
            +"Before removing approved food, please assign a different food to this animal.";
        }
        else if (statusMessage === "workerAnimal") {
            title = "ERROR!";
            message = "Unable to remove assigned worker because this is the only worker currently approved for this animal.\n"
            +"Before removing worker assignment, please assign a different worker to this animal.";
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
        }, () => {
            if (statusMessage !== "close") {
                this.handlePopup(title, message, this.state.refreshProps)
            }
            this.handleServerCall(this.state.refreshProps);
        });
    }

    //render jsx for main content container depending on content prop passed to component
    render() {
        switch (this.props.content) {
            case ("view_items"):
                {
                  if (this.state.loadingData){
                     return (
                        <div>
                            <ActionForm
                                api={this.handleServerCall}
                                key="viewForm"
                                formType="view"
                                submitForm={this.submitForm} />
                       		<LoaderSpin />
                        </div>
                    );
                  }
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
                    if (this.state.loadingData){
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
                       		<LoaderSpin />
                        </div>
                      );
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
                    if (this.state.loadingData){
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
                       		<LoaderSpin />
                        </div>
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
                    if (this.state.loadingData){
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
                            <LoaderSpin />
                          </div>
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
                    if (this.state.loadingData){
                       return (
                          <div>
                            <ActionForm
                                api={this.handleServerCall}
                                key="searchForm"
                                formType="search"
                                submitForm={this.submitForm}
                                popup={this.handlePopup}
                            />
                            <LoaderSpin />
                        </div>
                      ); 
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
