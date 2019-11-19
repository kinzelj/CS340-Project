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

export const addItem = async (props) => {
    const options = {
        method: 'POST',
        url: '/add',
        data: props
    }
    const response = await axios(options);
    const responseData = await response.data;
    return responseData;
}

export const updateItem = async (props) => {
    const options = {
        method: 'POST',
        url: '/update',
        data: props
    }
    const response = await axios(options);
    const responseData = await response.data;
    return responseData;
}

export const removeItem = async (props) => {
    const options = {
        method: 'POST',
        url: '/remove',
        data: props
    }
    const response = await axios(options);
    const responseData = await response.data;
    return responseData;
}

export const refreshId = async (props) => {
    const options = {
        method: 'POST',
        url: '/refreshId',
        data: props
    }
    const response = await axios(options);
    const responseData = await response.data;
    return responseData;
}

export const searchData = async (props) => {
    const options = {
        method: 'POST',
        url: '/search',
        data: props
    }
    const response = await axios(options);
    const responseData = await response.data;
    return responseData;
}

export const getFoodDropdown = async (props) => {
    const options = {
        method: 'POST',
        url: '/view',
        data: props
    }
    const response = await axios(options);
    const responseData = await response.data;
    const responseDropdown = responseData.map((value, index) => {
        return { text: value["FOOD TYPE"], value: value["FOOD ID"] };
    });
    return responseDropdown;
}

export const getWorkersDropdown = async (props) => {
    const options = {
        method: 'POST',
        url: '/view',
        data: props
    }
    const response = await axios(options);
    const responseData = await response.data;
    const responseDropdown = responseData.map((value, index) => {
        return { key: "dk-" + value["LAST NAME"] + index, text: value["FIRST NAME"] + " " + value["LAST NAME"], value: value["WORKER ID"] };
    });
    return responseDropdown;
}
export const getAnimalDropdown = async (props) => {
    const options = {
        method: 'POST',
        url: '/view',
        data: props
    }
    const response = await axios(options);
    const responseData = await response.data;
    const responseDropdown = responseData.map((value, index) => {
        return { key: "dk-" + value["ANIMAL TYPE"] + index, text: value["ANIMAL ID"], value: value["ANIMAL ID"] };
    });
    responseDropdown.sort(function (a, b) { return a.text - b.text });
    return responseDropdown;
}

export const getCageDropdown = async (props) => {
    const options = {
        method: 'POST',
        url: '/view',
        data: props
    }
    const response = await axios(options);
    const responseData = await response.data;
    const responseDropdown = responseData.map((value, index) => {
        return { text: value["CAGE NAME"], value: value["CAGE NUMBER"] };
    });
    responseDropdown.sort(function (a, b) { return a.text - b.text });
    return responseDropdown;
}

export const getUpdateIdDropdown = async (props) => {
    const options = {
        method: 'POST',
        url: '/view',
        data: props
    }
    const response = await axios(options);
    const responseData = await response.data;
    var results = { resonseDropdown: {}, idName: "" }
    results.responseDropdown = responseData.map((value, index) => {
        switch (props.query) {
            case ("animal"):
                return { key: "uk-" + value["ANIMAL TYPE"] + index, text: value["ANIMAL ID"], value: value["ANIMAL ID"] };
            case ("worker"):
                return { key: "uk-" + value["LAST NAME"] + index, text: value["WORKER ID"], value: value["WORKER ID"] };
            case ("food"):
                return { key: "uk-" + value["FOOD TYPE"] + index, text: value["FOOD ID"], value: value["FOOD ID"] };
            case ("cage"):
                return { key: "uk-" + value["CAGE NAME"] + index, text: value["CAGE NUMBER"], value: value["CAGE NUMBER"] };
            case ("approvedFoods"):
                return { key: "uk-" + value["ANIMAL TYPE"] + index, text: value["ENTRY ID"], value: value["ENTRY ID"] };
            case ("workerAnimal"):
                return { key: "uk-" + value["ANIMAL TYPE"] + index, text: value["ENTRY ID"], value: value["ENTRY ID"] };
            case ("workerCage"):
                return { key: "uk-" + value["CAGE NAME"] + index, text: value["CAGE NUMBER"], value: value["CAGE NUMBER"] };
            default: return {};
        }
    });
    switch (props.query) {
        case ("animal"): { results.idName = "ANIMAL ID"; break; }
        case ("worker"): { results.idName = "WORKER ID"; break; }
        case ("food"): { results.idName = "FOOD ID"; break; }
        case ("cage"): { results.idName = "CAGE NUMBER"; break; }
        case ("approvedFoods"): { results.idName = "ENTRY ID"; break; }
        case ("workerAnimal"): { results.idName = "ENTRY ID"; break; }
        case ("workerCage"): { results.idName = "CAGE NUMBER"; break; }
        default: return {};
    }
    return results;
}

export const getSearchDropdown = async (props) => {
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

