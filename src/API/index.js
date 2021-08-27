import axios from 'axios';
import {BASE_URL} from "./Constants";

const API = {
	getPhotos: async ({
						  start = '0',
						  limit = '10',
						  album = '',
						  title = ''
					  }, params) => {
		let albums = ''
		album.forEach(i => albums = albums + 'albumId=' + i + "&" )
		return axios.get(`${BASE_URL}?_start=${start}&_limit=${limit}&${albums}&${title ? 'title=' + title : ''}`, params)
	},
	getPhoto: async (id, params) => axios.get(`${BASE_URL}${id}`, params)
}

export default API;
