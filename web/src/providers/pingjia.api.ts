import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConfig } from '../app/api.config'
@Injectable()
export class PingjiaApi {

    constructor(public http: HttpClient) {

    }


    public addpingjia(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'pingjia/addpingjia';
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
                return ApiConfig.ErrorHandle('pingjia/addpingjia', data, err);
            });
    }


    public addpinjialike(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'pingjia/addpinjialike';
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
                return ApiConfig.ErrorHandle('pingjia/addpinjialike', data, err);
            });
    }


    public pingjialist(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'pingjia/pingjialist';
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
                return ApiConfig.ErrorHandle('pingjia/pingjialist', data, err);
            });
    }

}
