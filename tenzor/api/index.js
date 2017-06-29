import axios from 'axios'
import { API_HOST, API_PORT } from '../api/config'

export const baseHost = `${API_HOST}:${API_PORT}`
export const baseURL = baseHost + '/api/'

axios.defaults.baseURL = baseURL

export function postCategory (formData) {
  return axios.post('/category/', formData)
}

export function putCategory (formData) {
  return axios.put('/category/', formData)
}

export function getCategoryById (id) {
  return axios.get('/category/' + id)
}

export function getCategoryList (data) {
  return axios.get('/category/', data)
}

export function postGoods (formData) {
  return axios.post('/goods/', formData)
}

export function putGoods (formData) {
  return axios.post('/goods/', formData)
}

export function getGoodsById (id) {
  return axios.get('/goods/' + id)
}

export function getGoodsListByCategory (data) {
  return axios.get('/goods/', {
    params: data
  })
}

export function getGoodsByField (data) {
  return axios.get('/goods/', {
    params: data
  })
}

export function getPage (url) {
  return axios.get(url)
}
