/**
 * @requires axios ajax库
 * @requires jsonp 引入封装好的jsonp函数
 * @requires commonParam,options 引入公共参数和配置
 */
import axios from 'axios';
// import jsonp from '@/assets/js/jsonp';
import { commonParam, baseUrl } from './config';

/**
 * @function getRecommend 获取推荐数据(Banner)
 * @returns {Promise}
 */
// export function getRecommend() {
//     const url =
//         'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
//     /**
//      * @description 合并请求数据
//      */
//     const data = Object.assign({}, commonParam, {
//         platform: 'h5',
//         uin: 0,
//         needNewCode: 1
//     });
//     return jsonp(url, data, options);
// }

/**
 * @function getRecommend 获取(Banner)
 * @returns {Promise}
 */
export function getRecommend() {
    const url = '/api/GoodsCate/syList';
    const data = {};
    // return axios.post(url, {
    //     params: data
    // }).then(res => Promise.resolve(res.data));
    return axios.get(baseUrl + url, {
        params: data
    }).then(res => Promise.resolve(res.data));
}

/**
 * @function getDiscList 获取推荐数据
 */
export function getDiscList(isnew, sort2, desc2, size2) {
    // const url = '/api/getDiscList';
    // const data = Object.assign({}, commonParam, {
    //     platform: 'yqq',
    //     hostUin: 0,
    //     sin: 0,
    //     ein: 29,
    //     sortId: 5,
    //     needNewCode: 0,
    //     categoryId: 10000000,
    //     rnd: Math.random(),
    //     format: 'json'
    // });
    const isrecommend = isnew ? 0 : 1;
    const url = '/api/Goods/lists';
    const data = {
        is_recommend: isrecommend,
        is_new: isnew,
        sort: sort2,
        desc: desc2,
        size: size2
    };
    return axios
        .get(baseUrl + url, {
            params: data
        })
        .then(res => Promise.resolve(res.data));
}

/**
 * @function getSongList 获取推荐歌单里的歌曲数据
 * @param {String} disstid 歌单id
 */
export function getSongList(disstid) {
    const url = '/api/getSongList';

    const data = Object.assign({}, commonParam, {
        disstid,
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        platform: 'yqq',
        hostUin: 0,
        needNewCode: 0
    });
    return axios
        .get(url, {
            params: data
        })
        .then(res => Promise.resolve(res.data));
}
