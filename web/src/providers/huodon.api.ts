import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConfig } from '../app/api.config'
@Injectable()
export class HuodonApi {

    constructor(public http: HttpClient) {

    }


    public addjiemu(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'huodon/addjiemu';
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
                return ApiConfig.ErrorHandle('huodon/addjiemu', data, err);
            });
    }


    public huodoninfo(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'huodon/huodoninfo';
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
                return ApiConfig.ErrorHandle('huodon/huodoninfo', data, err);
            });
    }


    public huodonlist(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'huodon/huodonlist';
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
                return ApiConfig.ErrorHandle('huodon/huodonlist', data, err);
            });
    }


    public jiemuinfo(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'huodon/jiemuinfo';
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
                return ApiConfig.ErrorHandle('huodon/jiemuinfo', data, err);
            });
    }

}
