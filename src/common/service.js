import axios from 'axios';
import ES6Promise from 'es6-promise';

export const RESPONSE_TIME_OUT = 10*1000;


// 임시
export const API_ROOT = 'http://dev.paymint.co.kr:9310'
export const API_PREFIX = 'U'

export function getNameCard(params) {
    ES6Promise.polyfill();

    return axios({
         method: "post"
        // ,url: sprintf("%s/%s", API_ROOT, sprintf('common_code/%s/sys_code_grp', API_PREFIX))
        ,url: 'http://dev.paymint.co.kr:9310/common_code/A/sys_code_grp'
        ,data: params
        ,timeout: RESPONSE_TIME_OUT
    })
}

export function init(params) {
    ES6Promise.polyfill();

    return axios({
        method:"post"
        ,url: ('https://intranet-api.paymint.co.kr/paymint/namecard' + params.url)
        ,data:params
        ,timeout : RESPONSE_TIME_OUT
    });
}

export function search(params) {
    ES6Promise.polyfill();

    return axios({
        method:"post"
        ,url: 'https://intranet-api.paymint.co.kr/paymint/namecard/ggogo33'
        ,data:params
        ,timeout : RESPONSE_TIME_OUT
    });
}