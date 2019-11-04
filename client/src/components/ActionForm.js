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
            // {
            //     text: "",
            //     value: ""
            // }
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
            // {
            //     text: "Animal - Approved Foods",
            //     value: "approvedFoods"
            // },
            // {
            //     text: "Worker - Animal Assignments",
            //     value: "workerAnimal"
            // },
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
        dropdown2: [{
            text: "updateOption1",
            value: "updateOption1"
        },
        {
            text: "updateOption2",
            value: "updateOption2"
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
        dropdown2: [{
            text: "removeOption1",
            value: "removeOption1"
        },
        {
            text: "removeOption2",
            value: "removeOption2"
        },
        ]

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

        //options for Update form:
        updateSelect: "",
        updateValue: "",

        searchValue: "",

    }

    componentDidMount() {
        this.setState({ formType: this.props.formType })
    }

    componentDidUpdate = () => {
        console.log(this.state);
        switch (this.state.addSelect) {
            case ("animal"): {
                ServerCall.getFood({ query: "food" })
                    .then(res => {
                        console.log(res);
                        options.addUpdateFood.foodDropdown = res;
                    })
                    .catch(err => console.log(err));
                break;
            }
            case ("cage"): {
                ServerCall.getWorkers({ query: "worker" })
                    .then(res => {
                        console.log(res);
                        options.addUpdateWorkers.workerDropdown = res;
                    })
                    .catch(err => console.log(err));
                break;
            }
            default:
                return;
        }
    }

    handleSelectChange = (e, { name, value, calltype }) => {
        this.setState({ [name]: value, calltype: calltype }, () => {
            this.props.api(this.state);
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
            // addAnimalWorder
            // addAnimalCage
            // addFoodType
            // addCageName
            // addCageWorker
            // addWorkerFname
            // addWorkerLname
            // addWorkerPosition
            addAnimalType,
            addAnimalCage,
            addAnimalFood,
            addWorkerFirst,
            addWorkerLast,
            addWorkerPosition,
            addCageName,
            addCageSize,
            addCageWorker,

            updateSelect,
            // updateAnimalWorder
            // updateAnimalCage
            // updateFoodType
            // updateCageName
            // updateCageWorker
            // updateWorkerFname
            // updateWorkerLname
            // updateWorkerPosition
            updateValue,

            removeSelect,
            // removeOption,
            //removeAnimal
            //removeFood
            //removeCage
            //removeWorker
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
                                                onChange={this.handleSelectChange}
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
                                                onChange={this.handleSelectChange}
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
                                                placeholder="Aniaml Approved Food"
                                                name='addAnimalFood'
                                                value={addAnimalFood}
                                                calltype='addSelect'
                                                onChange={this.handleSelectChange}
                                            />
                                            <Form.Button content='Add Item' />
                                        </Form.Group>
                                    </Form>
                                );
                            }
                        case ("worker"): {
                            return (
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group>
                                        <Form.Select
                                            options={options.add.selectDropdown}
                                            placeholder="Select Add Option"
                                            name='addSelect'
                                            value={addSelect}
                                            calltype='addSelect'
                                            onChange={this.handleSelectChange}
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
                                        <Form.Button content='Add Item' />
                                    </Form.Group>
                                </Form>
                            );

                        }
                        case ("cage"): {
                            return (
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group>
                                        <Form.Select
                                            options={options.add.selectDropdown}
                                            placeholder="Select Add Option"
                                            name='addSelect'
                                            value={addSelect}
                                            calltype='addSelect'
                                            onChange={this.handleSelectChange}
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
                                            placeholder="Cage Worker ID"
                                            name='addCageWorker'
                                            value={addCageWorker}
                                            calltype='addSelect'
                                            onChange={this.handleSelectChange}
                                        />
                                        <Form.Button content='Add Item' />
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
                                    placeholder="Select Update Option"
                                    name='updateSelect'
                                    value={updateSelect}
                                    calltype='updateSelect'
                                    onChange={this.handleSelectChange}
                                />
                                <Form.Input
                                    placeholder="New Value"
                                    name='updateValue'
                                    value={updateValue}
                                    calltype='inputUpdate'
                                    onChange={this.handleTextInput}
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
                                    onChange={this.handleSelectChange}
                                />
                                <Form.Input
                                    placeholder="New Value"
                                    name='updateValue'
                                    value={updateValue}
                                    calltype='inputUpdate'
                                    onChange={this.handleTextInput}
                                />
                                <Form.Button content='Submit' />
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
