import axios from 'axios';

export const viewData = async(props) => {
    const options = {
        method: 'POST',
        url: '/view',
        data: props
    }
    const response = await axios(options);
    const responseData = await response.data;
    return responseData;
}

export const addItem = async(props) => {
  const options = {
        method: 'POST',
        url: '/add',
        data: props
    }
    const response = await axios(options);
    const responseData = await response.data;
    return responseData;
}

export const searchData = async(props) => {
    const options = {
        method: 'POST',
        url: '/search',
        data: props
    }
    const response = await axios(options);
    const responseData = await response.data;
    return responseData;
}

export const getFoodDropdown = async(props) => {
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

export const getWorkersDropdown = async(props) => {
    const options = {
        method: 'POST',
        url: '/view',
        data: props
    }
    const response = await axios(options);
    const responseData = await response.data;
    const responseDropdown = responseData.map((value, index) => {
        return { text: value["FIRST NAME"] + " " + value["LAST NAME"], value: value["ID"] };
    });
    return responseDropdown;
}
export const getAnimalDropdown = async(props) => {
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
    responseDropdown.sort(function(a,b) {return a.text-b.text });
    return responseDropdown;
}

export const getUpdateIdDropdown = async(props) => {
    const options = {
        method: 'POST',
        url: '/view',
        data: props
    }
    const response = await axios(options);
    const responseData = await response.data;
    const responseDropdown = responseData.map((value, index) => {
        switch (props.query) {
            case ("approvedFoods"):
                return { text: value["ENTRY ID"], value: value["ENTRY ID"] };
            case ("workerAnimal"):
                return { text: value["ENTRY ID"], value: value["ENTRY ID"] };
            case ("workerCage"):
                return { text: value["CAGE ID"], value: value["CAGE ID"] };
            default:
                return { text: value["ID"], value: value["ID"] };
        }
    });
    return responseDropdown;
}

export const getSearchDropdown = async(props) => {
    const options = {
        method: 'POST',
        url: '/view',
        data: props
    }
    const response = await axios(options);
    const responseData = await response.data;
    const responseDropdown = Object.keys(responseData[0]).map((value, index) => {
        return { text: value, value: value };
    });
    return responseDropdown;
}

