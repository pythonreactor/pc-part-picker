import { Axios } from './conf.js';

function getAllBuilds() {
    const axios = new Axios();

    return axios.get('/build/all/', () => {}).then(
        (response) => {
            console.log(response);
        },
        (error) => {
            console.log(error);
        }
    );
}

console.log(getAllBuilds());
