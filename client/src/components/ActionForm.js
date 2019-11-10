import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import * as ServerCall from '../scripts/ServerCall.js'

/*******************************************************************
 Dropdown Constants
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
        {
            text: "Worker - Cage Assignments",
            value: "workerCage"
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
        key: "dk-addWorkers",
        workerDropdown: [{ key: "" }],
    },
    addAnimal: {
        key: "dk-addAnimals",
        animalDropdown: [{ key: "" }],
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
        {
            text: "Worker - Cage Assignments",
            value: "workerCage"
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
        {
            text: "Worker - Cage Assignments",
            value: "workerCage"
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

        removeSelect: "",
        removeId: "",

        searchValue: "",
        searchSelect: "",
        searchAttributeSelect: ""
    }

    componentDidMount() {
        this.setState({ formType: this.props.formType })
    }

    handleSelectChange = (e, { name, value, calltype }) => {
        this.setState({
            [name]: value,
            calltype: calltype
        }, () => {
            this.props.api(this.state);
        });

    }

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
                                options.addFood.foodDropdown = res;
                                this.setState(this.state);
                            })
                            .catch(err => console.log(err));
                        break;
                    }
                case ("cage"):
                    {
                        ServerCall.getWorkersDropdown({ query: "worker" })
                            .then(res => {
                                options.addWorkers.workerDropdown = res;
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

    handleUpdateSelectChange = (e, { name, value, calltype }) => {
        this.setState({
            [name]: value,
            calltype: calltype
        }, () => {
            this.props.api(this.state)
            ServerCall.getUpdateIdDropdown({ query: this.state.updateSelect })
                .then(res => {
                    console.log(res);
                    options.updateId.idDropdown = res;
                    this.setState(this.state);
                })
                .catch(err => console.log(err));
        });
    }

    handleRemoveSelectChange = (e, { name, value, calltype }) => {
        this.setState({
            [name]: value,
            calltype: calltype
        }, () => {
            this.props.api(this.state)
            ServerCall.getUpdateIdDropdown({ query: this.state.removeSelect })
                .then(res => {
                    options.removeId.idDropdown = res;
                    console.log(options.removeId.idDropdown);
                    this.setState(this.state);
                })
                .catch(err => console.log(err));
        });
    }

    handleTextInput = (e, { name, value }) => {
        this.setState({
            [name]: value.toUpperCase()
        })
    }

    handleAddSubmit = (e, { calltype }) => {
        this.setState({ calltype: calltype }, () => {
            switch (calltype) {
                //validate form input, then submit to api callback
                case ("addAnimal"):
                    {
                        console.log(this.state);
                        break;
                    }
                case ("addWorker"):
                    {
                        console.log(this.state);
                        break;
                    }
                case ("addCage"):
                    {
                        console.log(this.state);
                        break;
                    }
                case ("addFood"):
                    {
                        console.log(this.state);
                        break;
                    }
                case ("addWorkerAnimal"):
                    {
                        console.log(this.state);
                        break;
                    }
                case ("addApprovedFood"):
                    {
                        console.log(this.state);
                        break;
                    }
                default: return;
            }
            this.props.api(this.state);
        })
    }
    handleUpdateSubmit = (e, { calltype }) => {
        this.setState({ calltype: calltype }, () => {
            this.props.api(this.state);
        })
    }
    handleRemoveSubmit = (e, { calltype }) => {
        this.setState({ calltype: calltype }, () => {
            this.props.api(this.state);
        })
    }
    handleSearchSubmit = (e, { calltype }) => {
        this.setState({ calltype: calltype }, () => {
            this.props.api(this.state);
        })
    }

    render() {
        //controlled inputs
        const {
            viewSelect,

            addSelect,
            addAnimalType,
            addAnimalCage,
            addAnimalFood,
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
                                            <Form.Input
                                                placeholder="Cage No."
                                                name='addAnimalCage'
                                                value={addAnimalCage}
                                                calltype='inputUpdate'
                                                required
                                                onChange={this.handleTextInput}
                                            />
                                            <Form.Select
                                                options={options.addFood.foodDropdown}
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
                                                options={options.addWorkers.workerDropdown}
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
                                    <Form onSubmit={this.handleAddSubmit} calltype='addWorkerAnimal'>
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
                                    <Form onSubmit={this.handleAddSubmit} calltype='addApprovedFood'>
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
