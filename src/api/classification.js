import axios from 'axios';
import { baseUrl } from './config';

/**
 * @function GoodsCateLists 获取种类列表
 * @returns {Promise}
 */
export function GoodsCateLists() {
    const url = '/api/GoodsCate/lists';
    const data = {};
    return axios.get(baseUrl + url, {
        params: data
    }).then(res => Promise.resolve(res.data));
}

/**
 * @function GoodsCateNclists 获取分类二级列表
 * @returns {Promise}
 */
export function GoodsCateNclists(cidD) {
    const url = '/api/GoodsCate/nc_lists';
    const data = {
        cid: cidD
    };
    return axios.get(baseUrl + url, {
        params: data
    }).then(res => Promise.resolve(res.data));
}

/**
 * @function Goodslists 获取分类二级列表
 * @returns {Promise}
 */
export function Goodslists(dataC) {
    const url = '/api/Goods/lists';
    return axios.get(baseUrl + url, {
        params: dataC
    }).then(res => Promise.resolve(res.data));
}
