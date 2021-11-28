import request from 'superagent';

const backendBaseUrl = "http://192.168.1.48:8000/"

export const updatePlainColor = (hexColor: string = "#000000") => {
    console.log("")
    return request.post(`${backendBaseUrl}setPlainColor`).send({ color: hexColor }).set('Accept', 'application/json')
    //return request.get(`${backendBaseUrl}hello`).query({}).set('Accept', 'application/json')
}
