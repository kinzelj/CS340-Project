import axios from 'axios';

export const viewData = async (props) => {
    const options = {
        method: 'POST',
        url: '/view',
        data: props
    }
    const response = await axios(options);
    const responseData = await response.data;
    return responseData;
}

export const searchData = async (props) => {
    console.log(props);
}

export const getFood = async (props) => {
    // return ([{text: "food1", value: "food1"}]);
    const options = {
        method: 'POST',
        url: '/view',
        data: props
    }
    const response = await axios(options);
    const responseData = await response.data;
    const responseDropdown = responseData.map((value, index) => {
        return { text: value["FOOD TYPE"], value: value["FOOD TYPE"] };
    });
    return responseDropdown;
}
export const getWorkers = async (props) => {
    // return ([{text: "food1", value: "food1"}]);
    const options = {
        method: 'POST',
        url: '/view',
        data: props
    }
    const response = await axios(options);
    const responseData = await response.data;
    const responseDropdown = responseData.map((value, index) => {
        return { text: value["ID"], value: value["ID"] };
    });
    return responseDropdown;
}



// export const newPostRequest = async (props) => {
//     const options = {
//         method: 'POST',
//         url: '',
//         data: props 
//     }
//     const response = await axios(options);
//     const responseData = await response.data;
//     return responseData;
// }