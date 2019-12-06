import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import * as ServerCall from '../scripts/ServerCall.js'

/*******************************************************************
 * ActionForm component renders the main content form depending on 
 * which sidebar menu option was selected
********************************************************************/
const options = {
    view: {
        key: "dk-view",
        dropdown1: [{
            text: "Animals",
            value: "animal"
        },
        {
            text: "Workers",
            value: "worker"
        },
        {
            text: "Cages",
            value: "cage"
        },
        {
            text: "All Animal Foods",
            value: "food"
        },
        {
            text: "Animal - Approved Foods",
            value: "approvedFoods"
        },
        {
            text: "Worker - Animal Assignments",
            value: "workerAnimal"
        },
        ],
    },
    add: {
        key: "dk-add",
        selectDropdown: [{
            text: "Add Animal",
            value: "animal"
        },
        {
            text: "Add Worker",
            value: "worker"
        },
        {
            text: "Add Food",
            value: "food"
        },
        {
            text: "Add Cage",
            value: "cage"
        },
        {
            text: "Add Worker Animal Assignment",
            value: "workerAnimal"
        },
        {
            text: "Add Animal Approved Food",
            value: "approvedFoods"
        },
        ],
    },

    addFood: {
        key: "dk-addFood",
        foodDropdown: [{ key: "" }],
    },

    addWorkers: {
        key: "dk-addWorker",
        workerDropdown: [{ key: "" }],
    },
    addAnimal: {
        key: "dk-addAnimal",
        animalDropdown: [{ key: "" }],
        foodDropdown: [{ key: "" }],
        cageDropdown: [{ key: "" }],
        workerDropdown: [{ key: "" }],
    },
    addCage: {
        key: "dk-addCage",
        workerDropdown: [{ key: "" }],
    },

    updateId: {
        key: "dk-updateId",
        idDropdown: [{ key: "" }],
    },

    update: {
        key: "dk-update",
        dropdown1: [{
            text: "Update Animal",
            value: "animal"
        },
        {
            text: "Update Worker",
            value: "worker"
        },
        {
            text: "Update Food",
            value: "food"
        },
        {
            text: "Update Cage",
            value: "cage"
        },
        {
            text: "Animal - Approved Foods",
            value: "approvedFoods"
        },
        {
            text: "Worker - Animal Assignments",
            value: "workerAnimal"
        },
        ],
    },
    remove: {
        key: "dk-remove",
        dropdown1: [{
            text: "Remove Animal",
            value: "animal"
        },
        {
            text: "Remove Worker",
            value: "worker"
        },
        {
            text: "Remove Food",
            value: "food"
        },
        {
            text: "Remove Cage",
            value: "cage"
        },
        {
            text: "Animal - Approved Foods",
            value: "approvedFoods"
        },
        {
            text: "Worker - Animal Assignments",
            value: "workerAnimal"
        },
        ],
    },
    removeId: {
        key: "dk-updateId",
        idDropdown: [{ key: "" }],
    },
    search: {
        key: "dk-search",
        dropdown1: [{ key: "" }],
    }
};

class ActionForm extends Component {
    state = {
        //formType value will determine which form is used in callback
        formType: "",

        calltype: "",

        //options for View form:
        viewSelect: "",

        //options for Add form:
        addSelect: "",
        addAnimalType: "",
        addAnimalCage: "",
        addAnimalFood: "",
        addAnimalWorker: "",
        addWorkerFirst: "",
        addWorkerLast: "",
        addWorkerPosition: "",
        addCageName: "",
        addCageWorker: "",
        addCageSize: "",
        addFoodType: "",
        assignAnimal: "",
        assignAnimalWorker: "",
        assignAnimalFood: "",
        assignFood: "",

        //options for Update form:
        updateSelect: "",
        updateId: "",
        updateIdName: "",

        removeSelect: "",
        removeId: "",
        removeIdName: "",

        searchValue: "",
        searchSelect: "",
        searchAttributeSelect: ""
    }

    componentDidMount() {
        this.setState({ formType: this.props.formType })
    }

    //call server to fetch data to populate table
    handleSelectChange = (e, { name, value, calltype }) => {
        this.setState({
            [name]: value,
            calltype: calltype
        }, () => {
            this.props.api(this.state);
        });

    }

    //handle select change for add item
    handleAddSelectChange = (e, { name, value, calltype }) => {
        this.setState({
            [name]: value,
            calltype: calltype
        }, () => {
            this.props.api(this.state)

            switch (this.state.addSelect) {
                case ("animal"):
                    {
                        ServerCall.getFoodDropdown({ query: "food" })
                            .then(res => {
                                options.addAnimal.foodDropdown = res;
                                this.setState(this.state);
                            })
                            .catch(err => console.log(err));
                        ServerCall.getWorkersDropdown({ query: "worker" })
                            .then(res => {
                                options.addAnimal.workerDropdown = res;
                                this.setState(this.state);
                            })
                            .catch(err => console.log(err));
                        ServerCall.getCageDropdown({ query: "cage" })
                            .then(res => {
                                options.addAnimal.cageDropdown = res;
                                this.setState(this.state);
                            })
                            .catch(err => console.log(err));
                        break;
                    }
                case ("cage"):
                    {
                        ServerCall.getWorkersDropdown({ query: "worker" })
                            .then(res => {
                                options.addCage.workerDropdown = res;
                                this.setState(this.state);
                            })
                            .catch(err => console.log(err));
                        break;
                    }
                case ("workerAnimal"):
                    {
                        ServerCall.getWorkersDropdown({ query: "worker" })
                            .then(res => {
                                options.addWorkers.workerDropdown = res;
                                this.setState(this.state);
                            })
                            .catch(err => console.log(err));

                        ServerCall.getAnimalDropdown({ query: "animal" })
                            .then(res => {
                                options.addAnimal.animalDropdown = res;
                                this.setState(this.state);
                            })
                            .catch(err => console.log(err));

                        break;
                    }
                case ("approvedFoods"):
                    {
                        ServerCall.getFoodDropdown({ query: "food" })
                            .then(res => {
                                options.addFood.foodDropdown = res;
                                this.setState(this.state);
                            })
                            .catch(err => console.log(err));

                        ServerCall.getAnimalDropdown({ query: "animal" })
                            .then(res => {
                                options.addAnimal.animalDropdown = res;
                                this.setState(this.state);
                            })
                            .catch(err => console.log(err));
                        break;
                    }
                default:
                    return;
            }

        });
    }

    //handle select change for item search
    handleSearchSelectChange = (e, { name, value, calltype }) => {
        this.setState({
            [name]: value,
            calltype: calltype
        }, () => {
            this.props.api(this.state)
            ServerCall.getSearchDropdown({ query: this.state.searchSelect })
                .then(res => {
                    options.search.dropdown1 = res;
                    this.setState(this.state);
                })
                .catch(err => console.log(err));
        });
    }

    //handle select change for update item
    handleUpdateSelectChange = (e, { name, value, calltype }) => {
        this.setState({
            [name]: value,
            calltype: calltype
        }, () => {
            this.props.api(this.state)
            ServerCall.getUpdateIdDropdown({ query: this.state.updateSelect })
                .then(res => {
                    options.updateId.idDropdown = res.responseDropdown;
                    this.setState({ updateIdName: res.idName });
                })
                .catch(err => console.log(err));
        });
    }

    //handle select change for remove item
    handleRemoveSelectChange = (e, { name, value, calltype }) => {
        this.setState({
            [name]: value,
            calltype: calltype
        }, () => {
            this.props.api(this.state)
            ServerCall.getUpdateIdDropdown({ query: this.state.removeSelect })
                .then(res => {
                    options.removeId.idDropdown = res.responseDropdown;
                    this.setState({ removeIdName: res.idName });
                })
                .catch(err => console.log(err));
        });
    }

    //update state for input changes
    handleTextInput = (e, { name, value }) => {
        this.setState({
            [name]: value.toUpperCase()
        })
    }

    //ADD submit form handlers
    handleAddSubmit = (e, { calltype }) => {
        this.setState({ calltype: calltype }, () => {
            switch (calltype) {
                //validate form input, then submit to api callback
                case ("addAnimal"):
                    {
                        const refreshProps = { calltype: "addSelect", addSelect: "animal" }
                        if (this.state.addAnimalFood === "") {
                            const title = "ERROR!";
                            const message = "Invalid input: At least one food type must be assigned to the new animal."
                            this.props.popup(title, message, refreshProps);
                            break;
                        }
                        if (this.state.addAnimalWorker === "") {
                            const title = "ERROR!";
                            const message = "Invalid input: At least one worker must be assigned to the new animal."
                            this.props.popup(title, message, refreshProps);
                            break;
                        }
                        if (this.state.addAnimalCage === "") {
                            const title = "ERROR!";
                            const message = "Invalid input: A cage must be assigned to the new animal."
                            this.props.popup(title, message, refreshProps);
                            break;
                        }
                        ServerCall.addItem(this.state)
                            .then(res => {
                                const title = "SUCCESS!";
                                const message = "Animal successfully added to zoo database."
                                this.props.popup(title, message, refreshProps);
                            })
                            .catch((error) => {
                                const title = "ERROR!";
                                const message = "Unable to add Animal ---> " + error;
                                this.props.popup(title, message, refreshProps);
                            });
                        break;
                    }
                case ("addWorker"):
                    {
                        const refreshProps = { calltype: "addSelect", addSelect: "worker" }
                        if (this.state.addWorkerFirst === "") {
                            const title = "ERROR!";
                            const message = "Invalid input: Worker must have First Name."
                            this.props.popup(title, message, refreshProps);
                            break;
                        }
                        if (this.state.addWorkerLast === "") {
                            const title = "ERROR!";
                            const message = "Invalid input: Worker must have Last Name."
                            this.props.popup(title, message, refreshProps);
                            break;
                        }
                        ServerCall.addItem(this.state)
                            .then(res => {
                                const title = "SUCCESS!";
                                const message = "Worker successfully added to zoo database."
                                this.props.popup(title, message, refreshProps);
                            })
                            .catch((error) => {
                                const title = "ERRROR!";
                                const message = "Unable to add Worker ---> " + error;
                                this.props.popup(title, message, refreshProps);
                            })
                        break;
                    }
                case ("addCage"):
                    {
                        const refreshProps = { calltype: "addSelect", addSelect: "cage" }
                        if (this.state.addCageName === "") {
                            const title = "ERROR!";
                            const message = "Invalid input: Cage must have a name."
                            this.props.popup(title, message, refreshProps);
                            break;
                        }
                        ServerCall.addItem(this.state)
                            .then(res => {
                                const title = "SUCCESS!";
                                const message = "Cage successfully added to zoo database."
                                this.props.popup(title, message, refreshProps);
                            })
                            .catch((error) => {
                                if(error.response.status === 501){
                                    error = "Duplicate entry, please try again.";
                                }
                                const title = "ERRROR!";
                                const message = "Unable to add Cage ---> " + error;
                                this.props.popup(title, message, refreshProps);
                            })
                        break;
                    }
                case ("addFood"):
                    {
                        const refreshProps = { calltype: "addSelect", addSelect: "food" }
                        if (this.state.addFoodType === "") {
                            const title = "ERROR!";
                            const message = "Invalid input: Food must have a Food Type."
                            this.props.popup(title, message, refreshProps);
                            break;
                        }
                        ServerCall.addItem(this.state)
                            .then(res => {
                                const title = "SUCCESS!";
                                const message = "Food successfully added to zoo database."
                                this.props.popup(title, message, refreshProps);
                            })
                            .catch((error) => {
                                if(error.response.status === 501){
                                    error = "Duplicate entry, please try again.";
                                }
                                const title = "ERRROR!";
                                const message = "Unable to add Food ---> " + error;
                                this.props.popup(title, message, refreshProps);
                            })
                        break;
                    }
                case ("addAnimalWorker"):
                    {
                        const refreshProps = { calltype: "addSelect", addSelect: "workerAnimal" }
                        if (this.state.assignAnimal === "") {
                            const title = "ERROR!";
                            const message = "Invalid input: An Animal ID must be selected."
                            this.props.popup(title, message, refreshProps);
                            break;
                        }
                        if (this.state.assignAnimalWorker === "") {
                            const title = "ERROR!";
                            const message = "Invalid input: A Worker must be selected."
                            this.props.popup(title, message, refreshProps);
                            break;
                        }
                        ServerCall.addItem(this.state)
                            .then(res => {
                                const title = "SUCCESS!";
                                const message = "Worker-Animal assignment successfully added to zoo database."
                                this.props.popup(title, message, refreshProps);
                            })
                            .catch((error) => {
                                const title = "ERRROR!";
                                const message = "Unable to add Food ---> " + error;
                                this.props.popup(title, message, refreshProps);
                            })
                        break;
                    }
                case ("addAnimalFood"):
                    {
                        const refreshProps = { calltype: "addSelect", addSelect: "approvedFoods" }
                        if (this.state.assignAnimalFood === "") {
                            const title = "ERROR!";
                            const message = "Invalid input: An Animal ID must be selected."
                            this.props.popup(title, message, refreshProps);
                            break;
                        }
                        if (this.state.assignFood === "") {
                            const title = "ERROR!";
                            const message = "Invalid input: A Food must be selected."
                            this.props.popup(title, message, refreshProps);
                            break;
                        }
                        ServerCall.addItem(this.state)
                            .then(res => {
                                const title = "SUCCESS!";
                                const message = "Food-Animal assignment successfully added to zoo database."
                                this.props.popup(title, message, refreshProps);
                            })
                            .catch((error) => {
                                const title = "ERRROR!";
                                const message = "Unable to add Food ---> " + error;
                                this.props.popup(title, message, refreshProps);
                            })
                        break;
                    }
                default: return;
            }
            this.props.api(this.state);
        })
    }

    //UPDATE submit form handler
    handleUpdateSubmit = (e, { calltype }) => {
        if (this.state.updateSelect === "") {
            const title = "ERROR!";
            const message = "Invalid input: Item to update must be selected."
            this.props.popup(title, message);
            return;
        }
        if (this.state.updateId === "") {
            const title = "ERROR!";
            const message = "Invalid input: ID of item to update must be selected."
            this.props.popup(title, message);
            return;
        }
        this.props.updatePopup(this.state.updateSelect, this.state.updateId, this.state.updateIdName);
    }

    //REMOVE submit form handler
    handleRemoveSubmit = (e, { calltype }) => {
        if (this.state.removeSelect === "") {
            const title = "ERROR!";
            const message = "Invalid input: Remove option must be selected."
            this.props.popup(title, message);
            return;
        }
        if (this.state.removeId === "") {
            const title = "ERROR!";
            const message = "Invalid input: ID of item to remove must be selected."
            this.props.popup(title, message);
            return;
        }
        this.props.removePopup(this.state.removeSelect, this.state.removeId, this.state.removeIdName);
    }

    //SEARCH submit form handler
    handleSearchSubmit = (e, { calltype }) => {
        if (this.state.searchSelect === "") {
            const title = "ERROR!";
            const message = "Invalid input: Search option must be selected."
            this.props.popup(title, message);
            return;
        }
        if (this.state.searchAttributeSelect === "") {
            const title = "ERROR!";
            const message = "Invalid input: Search critera must be selected."
            this.props.popup(title, message);
            return;
        }
        if (this.state.searchValue === "") {
            const title = "ERROR!";
            const message = "Invalid input: Search value must be defined."
            this.props.popup(title, message);
            return;
        }
        this.setState({ calltype: calltype }, () => {
            this.props.api(this.state);
        })
    }

    //render jsx depending on state.formType
    render() {
        //controlled inputs
        const {
            viewSelect,

            addSelect,
            addAnimalType,
            addAnimalCage,
            addAnimalFood,
            addAnimalWorker,
            addWorkerFirst,
            addWorkerLast,
            addWorkerPosition,
            addCageName,
            addCageSize,
            addCageWorker,
            addFoodType,
            assignAnimal,
            assignAnimalWorker,
            assignAnimalFood,
            assignFood,

            updateSelect,
            updateId,

            removeSelect,
            removeId,
            searchSelect,
            searchAttributeSelect,
            searchValue,
        } = this.state

        switch (this.state.formType) {
            case ("view"):
                {
                    return (
                        <Form>
                            <Form.Group>
                                <Form.Select
                                    options={options.view.dropdown1}
                                    placeholder="Select View Option"
                                    name='viewSelect'
                                    value={viewSelect}
                                    calltype='viewSelect'
                                    onChange={this.handleSelectChange}
                                />
                            </Form.Group>
                        </Form>
                    );
                }
            case ("add"):
                {
                    switch (this.state.addSelect) {
                        case (""):
                            {
                                return (
                                    <Form >
                                        <Form.Group>
                                            <Form.Select
                                                options={options.add.selectDropdown}
                                                placeholder="Select Item to Add"
                                                name='addSelect'
                                                value={addSelect}
                                                calltype='addSelect'
                                                onChange={this.handleAddSelectChange}
                                            />
                                        </Form.Group>
                                    </Form>
                                );
                            }
                        case ("animal"):
                            {
                                return (
                                    <Form onSubmit={this.handleAddSubmit} calltype='addAnimal'>
                                        <Form.Group>
                                            <Form.Select
                                                options={options.add.selectDropdown}
                                                placeholder="Select Add Option"
                                                name='addSelect'
                                                value={addSelect}
                                                calltype='addSelect'
                                                onChange={this.handleAddSelectChange}
                                            />
                                            <Form.Input
                                                placeholder="New Animal Type"
                                                name='addAnimalType'
                                                value={addAnimalType}
                                                calltype='inputUpdate'
                                                required
                                                onChange={this.handleTextInput}
                                            />
                                            <Form.Select
                                                options={options.addAnimal.cageDropdown}
                                                placeholder="Assign Cage for Animal"
                                                name='addAnimalCage'
                                                value={addAnimalCage}
                                                calltype='addAnimalSelect'
                                                onChange={this.handleSelectChange}
                                            />
                                            <Form.Select
                                                options={options.addAnimal.workerDropdown}
                                                placeholder="Assign Worker to Animal"
                                                name='addAnimalWorker'
                                                value={addAnimalWorker}
                                                calltype='addAnimalSelect'
                                                onChange={this.handleSelectChange}
                                            />
                                            <Form.Select
                                                options={options.addAnimal.foodDropdown}
                                                placeholder="Assign Animal Food"
                                                name='addAnimalFood'
                                                value={addAnimalFood}
                                                calltype='addAnimalSelect'
                                                onChange={this.handleSelectChange}
                                            />
                                            <Form.Button content='Add Animal' />
                                        </Form.Group>
                                    </Form>
                                );
                            }
                        case ("worker"):
                            {
                                return (
                                    <Form onSubmit={this.handleAddSubmit} calltype='addWorker'>
                                        <Form.Group>
                                            <Form.Select
                                                options={options.add.selectDropdown}
                                                placeholder="Select Add Option"
                                                name='addSelect'
                                                value={addSelect}
                                                calltype='addSelect'
                                                onChange={this.handleAddSelectChange}
                                            />
                                            <Form.Input
                                                placeholder="Worker First Name"
                                                name='addWorkerFirst'
                                                value={addWorkerFirst}
                                                calltype='inputUpdate'
                                                onChange={this.handleTextInput}
                                            />
                                            <Form.Input
                                                placeholder="Worker Last Name"
                                                name='addWorkerLast'
                                                value={addWorkerLast}
                                                calltype='inputUpdate'
                                                onChange={this.handleTextInput}
                                            />
                                            <Form.Input
                                                placeholder="Worker Position"
                                                name='addWorkerPosition'
                                                value={addWorkerPosition}
                                                calltype='inputUpdate'
                                                onChange={this.handleTextInput}
                                            />
                                            <Form.Button content='Add Worker' />
                                        </Form.Group>
                                    </Form>
                                );

                            }
                        case ("food"):
                            {
                                return (
                                    <Form onSubmit={this.handleAddSubmit} calltype='addFood'>
                                        <Form.Group>
                                            <Form.Select
                                                options={options.add.selectDropdown}
                                                placeholder="Select Add Option"
                                                name='addSelect'
                                                value={addSelect}
                                                calltype='addSelect'
                                                onChange={this.handleAddSelectChange}
                                            />
                                            <Form.Input
                                                placeholder="Food Type"
                                                name='addFoodType'
                                                value={addFoodType}
                                                calltype='inputUpdate'
                                                onChange={this.handleTextInput}
                                            />
                                            <Form.Button content='Add Food' />
                                        </Form.Group>
                                    </Form>
                                );

                            }
                        case ("cage"):
                            {
                                return (
                                    <Form onSubmit={this.handleAddSubmit} calltype='addCage'>
                                        <Form.Group>
                                            <Form.Select
                                                options={options.add.selectDropdown}
                                                placeholder="Select Add Option"
                                                name='addSelect'
                                                value={addSelect}
                                                calltype='addSelect'
                                                onChange={this.handleAddSelectChange}
                                            />
                                            <Form.Input
                                                placeholder="Cage Name"
                                                name='addCageName'
                                                value={addCageName}
                                                calltype='inputUpdate'
                                                onChange={this.handleTextInput}
                                            />
                                            <Form.Input
                                                placeholder="Cage Size"
                                                name='addCageSize'
                                                value={addCageSize}
                                                calltype='inputUpdate'
                                                onChange={this.handleTextInput}
                                            />
                                            <Form.Select
                                                options={options.addCage.workerDropdown}
                                                placeholder="Assign Cage Worker"
                                                name='addCageWorker'
                                                value={addCageWorker}
                                                calltype='addWorkerSelect'
                                                onChange={this.handleSelectChange}
                                            />
                                            <Form.Button content='Add Cage' />
                                        </Form.Group>
                                    </Form>
                                );

                            }
                        case ("workerAnimal"):
                            {
                                return (
                                    <Form onSubmit={this.handleAddSubmit} calltype='addAnimalWorker'>
                                        <Form.Group>
                                            <Form.Select
                                                options={options.add.selectDropdown}
                                                placeholder="Select Add Option"
                                                name='addSelect'
                                                value={addSelect}
                                                calltype='addSelect'
                                                onChange={this.handleAddSelectChange}
                                            />
                                            <Form.Select
                                                options={options.addAnimal.animalDropdown}
                                                placeholder="Select Animal ID"
                                                name='assignAnimal'
                                                value={assignAnimal}
                                                calltype='assignAnimalSelect'
                                                onChange={this.handleSelectChange}
                                            />
                                            <Form.Select
                                                options={options.addWorkers.workerDropdown}
                                                placeholder="Assign Cage Worker"
                                                name='assignAnimalWorker'
                                                value={assignAnimalWorker}
                                                calltype='assignAnimalWorkerSelect'
                                                onChange={this.handleSelectChange}
                                            />
                                            <Form.Button content='Assign Worker to Animal' />
                                        </Form.Group>
                                    </Form>
                                );

                            }
                        case ("approvedFoods"):
                            {
                                return (
                                    <Form onSubmit={this.handleAddSubmit} calltype='addAnimalFood'>
                                        <Form.Group>
                                            <Form.Select
                                                options={options.add.selectDropdown}
                                                placeholder="Select Add Option"
                                                name='addSelect'
                                                value={addSelect}
                                                calltype='addSelect'
                                                onChange={this.handleAddSelectChange}
                                            />
                                            <Form.Select
                                                options={options.addAnimal.animalDropdown}
                                                placeholder="Select Animal ID"
                                                name='assignAnimalFood'
                                                value={assignAnimalFood}
                                                calltype='assignAnimalFoodSelect'
                                                onChange={this.handleSelectChange}
                                            />
                                            <Form.Select
                                                options={options.addFood.foodDropdown}
                                                placeholder="Assign Animal Food"
                                                name='assignFood'
                                                value={assignFood}
                                                calltype='assignFoodSelect'
                                                onChange={this.handleSelectChange}
                                            />
                                            <Form.Button content='Approve Food for Animal' />
                                        </Form.Group>
                                    </Form>
                                );

                            }
                        default:
                            return;
                    }
                }
            case ("update"):
                {
                    return (
                        <Form onSubmit={this.handleUpdateSubmit} calltype='updateItem'>
                            <Form.Group>
                                <Form.Select
                                    options={options.update.dropdown1}
                                    placeholder="Select Item to Update"
                                    name='updateSelect'
                                    value={updateSelect}
                                    calltype='updateSelect'
                                    onChange={this.handleUpdateSelectChange}
                                />
                                <Form.Select
                                    options={options.updateId.idDropdown}
                                    placeholder="ID of Item to Update"
                                    name='updateId'
                                    value={updateId}
                                    calltype='updateIdSelect'
                                    onChange={this.handleSelectChange}
                                />
                                <Form.Button content='Submit' />
                            </Form.Group>
                        </Form>
                    );
                }
            case ("remove"):
                {
                    return (
                        <Form onSubmit={this.handleRemoveSubmit} calltype='removeItem'>
                            <Form.Group>
                                <Form.Select
                                    options={options.remove.dropdown1}
                                    placeholder="Select Remove Option"
                                    name='removeSelect'
                                    value={removeSelect}
                                    calltype='removeSelect'
                                    onChange={this.handleRemoveSelectChange}
                                />
                                <Form.Select
                                    options={options.removeId.idDropdown}
                                    placeholder="ID of Item to Remove"
                                    name='removeId'
                                    value={removeId}
                                    calltype='removeIdSelect'
                                    onChange={this.handleSelectChange}
                                />
                                <Form.Button content='Remove Item' />
                            </Form.Group>
                        </Form>
                    );
                }
            case ("search"):
                {
                    return (
                        <Form onSubmit={this.handleSearchSubmit} calltype="searchSubmit">
                            <Form.Group>
                                <Form.Select
                                    options={options.view.dropdown1}
                                    placeholder="Select Search Option"
                                    name='searchSelect'
                                    value={searchSelect}
                                    calltype='searchSelect'
                                    onChange={this.handleSearchSelectChange}
                                />
                                <Form.Select
                                    options={options.search.dropdown1}
                                    placeholder="Select Search Criteria"
                                    name='searchAttributeSelect'
                                    value={searchAttributeSelect}
                                    calltype='searchAttributeSelect'
                                    onChange={this.handleSelectChange}
                                />
                                <Form.Input
                                    placeholder="Search Value"
                                    name='searchValue'
                                    value={searchValue}
                                    onChange={this.handleTextInput}
                                />
                                <Form.Button content='Submit' />
                            </Form.Group>
                        </Form>
                    );
                }
            default:
                return (<div>Loading...</div>);
        }
    }
}


export default ActionForm
