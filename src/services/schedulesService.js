import { URLS } from '../constants'
const axios = require('axios');

export const getSchedules = (params) => {
    return axios.get(`${URLS.SCHEDULES}`);
};

export const getRooms = (params) => {
    let url = params ? `${URLS.ROOM_INDEX}/${params}` : `${URLS.ROOM_INDEX}`;
    return axios.get(url)
}

export const addSchedules = (body) => {
    return axios.post(`${URLS.SCHEDULES}`, body)
}