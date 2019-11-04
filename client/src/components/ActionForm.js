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
        ],
    },

    addUpdateFood: {
        key: "dk-updateFood",
        foodDropdown: [{}],
    },

    addUpdateWorkers: {
        key: "dk-updateWorkers",
        workerDropdown: [{}],
    },

    updateId: {
        key: "dk-updateId",
        idDropdown: [{}],
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
        ],
    },
    removeId: {
        key: "dk-updateId",
        idDropdown: [{}],
    },
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

        //options for Update form:
        updateSelect: "",
        updateId: "",
        updateValue: "",
        
        removeSelect: "",
        removeId: "",

        searchValue: "",

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
                            console.log(res);
                            options.addUpdateFood.foodDropdown = res;
                            this.setState(this.state);
                        })
                        .catch(err => console.log(err));
                        break;
                    }
                case ("cage"):
                    {
                        ServerCall.getWorkersDropdown({ query: "worker" })
                        .then(res => {
                            console.log(res);
                            options.addUpdateWorkers.workerDropdown = res;
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
                    console.log(res);
                    options.removeId.idDropdown = res;
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

    handleSubmit = (e, { calltype }) => {
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

            updateSelect,
            updateId,
            updateValue,

            removeSelect,
            removeId,
            searchSelect,
            searchValue,
        } = this.state

        switch (this.state.formType) {
            case ("view"):
                {
                    return (
                        <Form onSubmit={this.handleSubmit}>
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
                                    <Form onSubmit={this.handleSubmit} >
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
                                                onChange={this.handleTextInput}
                                            />
                                            <Form.Input
                                                placeholder="Cage No."
                                                name='addAnimalCage'
                                                value={addAnimalCage}
                                                calltype='inputUpdate'
                                                onChange={this.handleTextInput}
                                            />
                                            <Form.Select
                                                options={options.addUpdateFood.foodDropdown}
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
                                    <Form onSubmit={this.handleSubmit}>
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
                                    <Form onSubmit={this.handleSubmit}>
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
                                    <Form onSubmit={this.handleSubmit}>
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
                                            options={options.addUpdateWorkers.workerDropdown}
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
                        default:
                            return;
                    }
                }
            case ("update"):
                {
                    return (
                        <Form onSubmit={this.handleSubmit}>
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
                        <Form onSubmit={this.handleSubmit}>
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
                        <Form onSubmit={this.handleSubmit} calltype="searchSubmit">
                            <Form.Group>
                                <Form.Select
                                    options={options.view.dropdown1}
                                    placeholder="Select Search Option"
                                    name='searchSelect'
                                    value={searchSelect}
                                    calltype='searchSelect'
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
