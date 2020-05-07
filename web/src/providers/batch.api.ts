import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConfig } from '../app/api.config'
@Injectable()
export class BatchApi {

    constructor(public http: HttpClient) {

    }


    public autocancelpurchase(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'batch/autocancelpurchase';
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
                return ApiConfig.ErrorHandle('batch/autocancelpurchase', data, err);
            });
    }


    public closeorder(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'batch/closeorder';
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
                return ApiConfig.ErrorHandle('batch/closeorder', data, err);
            });
    }


    public deleteorder(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'batch/deleteorder';
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
                return ApiConfig.ErrorHandle('batch/deleteorder', data, err);
            });
    }


    public fulljobs(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'batch/fulljobs';
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
                return ApiConfig.ErrorHandle('batch/fulljobs', data, err);
            });
    }


    public jgqrcodeimport(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'batch/jgqrcodeimport';
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
                return ApiConfig.ErrorHandle('batch/jgqrcodeimport', data, err);
            });
    }


    public jianchapintuan(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'batch/jianchapintuan';
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
                return ApiConfig.ErrorHandle('batch/jianchapintuan', data, err);
            });
    }


    public monipintuan(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'batch/monipintuan';
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
                return ApiConfig.ErrorHandle('batch/monipintuan', data, err);
            });
    }


    public tuikuan(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'batch/tuikuan';
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
                return ApiConfig.ErrorHandle('batch/tuikuan', data, err);
            });
    }


    public updateage(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'batch/updateage';
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
                return ApiConfig.ErrorHandle('batch/updateage', data, err);
            });
    }

}
