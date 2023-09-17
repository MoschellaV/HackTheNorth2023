import axios from "axios";

const URL = "http://127.0.0.1:8000";

export const findPotentialTargets = (file, uid, modelId) => {
    return axios({
        method: "POST",
        url: `${URL}/api/train-upload/${uid}/${modelId}`,
        data: file,
        headers: {
            Accept: "application/json",
        },
    });
};

export const postTarget = (target, uid, modelId) => {
    return axios({
        method: "POST",
        url: `${URL}/api/train/${uid}/${modelId}`,
        data: { target: target },
        headers: {
            Accept: "application/json",
        },
    });
};

export const predictCSV = (formData, uid, modelId) => {
    return axios({
        method: "POST",
        url: `${URL}/api/predict/${uid}/${modelId}/csv`,
        data: formData,
        headers: {
            Accept: "application/json",
        },
    });
};
