import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
// import { Button, Form, Input, Select } from 'semantic-ui-react'
// import SelectDropdown from './SelectDropdown';

/*******************************************************************
 Dropdown Constants
********************************************************************/
const options = {
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
            text: "Add Animal",
            value: "Add Animal"
        },
        {
            text: "Add Worker",
            value: "Add Worker"
        },
        {
            text: "Add Food",
            value: "Add Food"
        },
        {
            text: "Add Cage",
            value: "Add Cage"
        },
        ],
    },
    update: {
        key: "dk-update",
        dropdown1: [
            {
                text: "Update Animal",
                value: "Update Animal"
            },
            {
                text: "Update Worker",
                value: "Update Worker"
            },
            {
                text: "Update Food",
                value: "Update Food"
            },
            {
                text: "Update Cage",
                value: "Update Cage"
            },
        ],
        dropdown2: [
            {
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
        dropdown1: [
            {
                text: "Remove Animal",
                value: "Remove Animal"
            },
            {
                text: "Remove Worker",
                value: "Remove Worker"
            },
            {
                text: "Remove Food",
                value: "Remove Food"
            },
            {
                text: "Remove Cage",
                value: "Remove Cage"
            },
        ],
        dropdown2: [
            {
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

        //options for View form:
        viewSelect: "",

        //options for Add form:
        addSelect: "",
        addValue1: "",
        addValue2: "",
        // addAnimalWorder: "",
        // addAnimalCage: "",
        // addFoodType: "",
        // addCageName: "",
        // addCageWorker: "",
        // addWorkerFname: "",
        // addWorkerLname: "",
        // addWorkerPosition: "",

        //options for Update form:
        updateSelect: "",
        updateOption: "",
        updateValue: "",

    }

    componentDidMount() {
        this.setState({ formType: this.props.formType })
    }

    handleChange = (e, { name, value }) => {
        console.log(name, value);
        this.setState({ [name]: value })
    }

    handleSubmit = () => {
        this.props.submitForm(this.state);
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
            addValue1,
            addValue2,
            addValue3,

            updateSelect,
            updateOption,
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
            removeOption,
            //removeAnimal
            //removeFood
            //removeCage
            //removeWorker
        } = this.state

        switch (this.state.formType) {
            case ("view"):
                {
                    console.log(viewSelect);
                    return (
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Select
                                    options={options.view.dropdown1}
                                    placeholder="Select View Option"
                                    name='viewSelect'
                                    value={viewSelect}
                                    onChange={this.handleChange}
                                />
                                <Form.Button content='Submit' />
                            </Form.Group>
                        </Form>
                    );
                }
            case ("add"):
                {
                    return (
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Select
                                    options={options.add.dropdown1}
                                    placeholder="Select Add Option"
                                    name='addSelect'
                                    value={addSelect}
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    placeholder="Add Input 1"
                                    name='addValue1'
                                    value={addValue1}
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    placeholder="Add Input 2"
                                    name='addValue2'
                                    value={addValue2}
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    placeholder="Add Input 3"
                                    name='addValue3'
                                    value={addValue3}
                                    onChange={this.handleChange}
                                />
                                <Form.Button content='Submit' />
                            </Form.Group>
                        </Form>
                    );
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
                                    onChange={this.handleChange}
                                />
                                <Form.Select
                                    options={options.update.dropdown2}
                                    placeholder="Select Update Item"
                                    name='updateOption'
                                    value={updateOption}
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    placeholder="New Value"
                                    name='updateValue'
                                    value={updateValue}
                                    onChange={this.handleChange}
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
                                    onChange={this.handleChange}
                                />
                                <Form.Select
                                    options={options.remove.dropdown2}
                                    placeholder="Select Item to Remove"
                                    name='removeOption'
                                    value={removeOption}
                                    onChange={this.handleChange}
                                />
                                <Form.Button content='Submit' />
                            </Form.Group>
                        </Form>
                    );
                }
            default: return (<div>Loading...</div>);
        }
    }
}


export default ActionForm 