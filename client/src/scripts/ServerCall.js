import axios from 'axios';

export const viewData = async (props) => {
    const options = {
        method: 'POST',
        url: '/view',
        data: props 
    }
    const response = await axios(options);
    const responseData = await response.data;

    if (response && response.status === 200 && response.statusText === 'OK') {
        return responseData;
    }
    else Error(responseData.message);
}

// export const newPostRequest = async (props) => {
//     const options = {
//         method: 'POST',
//         url: '',
//         data: props 
//     }
//     const response = await axios(options);
//     const responseData = await response.data;

//     if (response && response.status === 200 && response.statusText === 'OK') {
//         return responseData;
//     }
//     else Error(responseData.message);
// }