import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConfig } from '../app/api.config'
@Injectable()
export class HaibaoApi {

    constructor(public http: HttpClient) {

    }


    public fenxiaohaibao1(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'haibao/fenxiaohaibao1';
        var headers = ApiConfig.GetHeader(url, data);
        let options = { headers: headers };
        let body = ApiConfig.ParamUrlencoded(data);
        let loading = null;

        if (showLoadingModal) {
            loading = ApiConfig.GetLoadingModal();
        }

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
                return res;
            })
            .catch(err => {
                console.error(err);
                return ApiConfig.ErrorHandle('haibao/fenxiaohaibao1', data, err);
            });
    }


    public fenxiaohaibao2(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'haibao/fenxiaohaibao2';
        var headers = ApiConfig.GetHeader(url, data);
        let options = { headers: headers };
        let body = ApiConfig.ParamUrlencoded(data);
        let loading = null;

        if (showLoadingModal) {
            loading = ApiConfig.GetLoadingModal();
        }

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
                return res;
            })
            .catch(err => {
                console.error(err);
                return ApiConfig.ErrorHandle('haibao/fenxiaohaibao2', data, err);
            });
    }


    public haibao(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'haibao/haibao';
        var headers = ApiConfig.GetHeader(url, data);
        let options = { headers: headers };
        let body = ApiConfig.ParamUrlencoded(data);
        let loading = null;

        if (showLoadingModal) {
            loading = ApiConfig.GetLoadingModal();
        }

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
                return res;
            })
            .catch(err => {
                console.error(err);
                return ApiConfig.ErrorHandle('haibao/haibao', data, err);
            });
    }


    public haibao1(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'haibao/haibao1';
        var headers = ApiConfig.GetHeader(url, data);
        let options = { headers: headers };
        let body = ApiConfig.ParamUrlencoded(data);
        let loading = null;

        if (showLoadingModal) {
            loading = ApiConfig.GetLoadingModal();
        }

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
                return res;
            })
            .catch(err => {
                console.error(err);
                return ApiConfig.ErrorHandle('haibao/haibao1', data, err);
            });
    }


    public haibao2(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'haibao/haibao2';
        var headers = ApiConfig.GetHeader(url, data);
        let options = { headers: headers };
        let body = ApiConfig.ParamUrlencoded(data);
        let loading = null;

        if (showLoadingModal) {
            loading = ApiConfig.GetLoadingModal();
        }

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
                return res;
            })
            .catch(err => {
                console.error(err);
                return ApiConfig.ErrorHandle('haibao/haibao2', data, err);
            });
    }

}
