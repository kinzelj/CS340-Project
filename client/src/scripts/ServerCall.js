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