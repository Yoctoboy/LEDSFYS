import request from 'superagent';

const backendBaseUrl = "http://localhost:8000/"

export const updatePlainColor = (hexColor = "#000000") => {
    console.log("")

    return request.post(`${backendBaseUrl}setPlainColor`).send({ color: hexColor }).set('Accept', 'application/json')
    //return request.get(`${backendBaseUrl}hello`).query({}).set('Accept', 'application/json')
}
