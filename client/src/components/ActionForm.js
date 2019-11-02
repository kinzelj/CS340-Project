import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

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
        dropdown1: [{
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

    handleChange = (e, {name ,value, calltype}) => {
        this.setState({ [name]: value, calltype: calltype }, () => {
            if (calltype === "viewSelect" || calltype === "addSelect" || calltype === "updateSelect" || calltype === "removeSelect" || calltype === "searchSelect") {
                this.props.api(this.state);
            }
        });

    }

    handleSubmit = () => {
        // this.props.api(this.state);
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
            searchSelect,
            searchOption,
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
                                    onChange={this.handleChange}
                                />
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
                                    calltype='addSelect'
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    placeholder="Add Input 1"
                                    name='addValue1'
                                    value={addValue1}
                                    calltype='inputUpdate'
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    placeholder="Add Input 2"
                                    name='addValue2'
                                    value={addValue2}
                                    calltype='inputUpdate'
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    placeholder="Add Input 3"
                                    name='addValue3'
                                    value={addValue3}
                                    calltype='inputUpdate'
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
                                    calltype='updateSelect'
                                    onChange={this.handleChange}
                                />
                                <Form.Select
                                    options={options.update.dropdown2}
                                    placeholder="Select Update Item"
                                    name='updateOption'
                                    value={updateOption}
                                    calltype='updateOptionSelect'
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    placeholder="New Value"
                                    name='updateValue'
                                    value={updateValue}
                                    calltype='inputUpdate'
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
                                    calltype='removeSelect'
                                    onChange={this.handleChange}
                                />
                                 <Form.Input
                                    placeholder="New Value"
                                    name='updateValue'
                                    value={updateValue}
                                    calltype='inputUpdate'
                                    onChange={this.handleChange}
                                />
                                <Form.Button content='Submit' />
                            </Form.Group>
                        </Form>
                    );
                }
            case ("search"):
                {
                    return (
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Select
                                    options={options.view.dropdown1}
                                    placeholder="Select Search Option"
                                    name='searchSelect'
                                    value={searchSelect}
                                    calltype='searchSelect'
                                    // onChange={this.handleChange}
                                />
                                  <Form.Input
                                    placeholder="Search Value"
                                    name='updateValue'
                                    value={updateValue}
                                    calltype='inputUpdate'
                                    onChange={this.handleChange}
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
