import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConfig } from '../app/api.config'
@Injectable()
export class KehuApi {

    constructor(public http: HttpClient) {

    }


    public addkehu(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'kehu/addkehu';
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
                return ApiConfig.ErrorHandle('kehu/addkehu', data, err);
            });
    }


    public addkehuzhizi(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'kehu/addkehuzhizi';
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
                return ApiConfig.ErrorHandle('kehu/addkehuzhizi', data, err);
            });
    }


    public addworkarr(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'kehu/addworkarr';
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
                return ApiConfig.ErrorHandle('kehu/addworkarr', data, err);
            });
    }


    public deletekehu(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'kehu/deletekehu';
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
                return ApiConfig.ErrorHandle('kehu/deletekehu', data, err);
            });
    }


    public kehudetail(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'kehu/kehudetail';
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
                return ApiConfig.ErrorHandle('kehu/kehudetail', data, err);
            });
    }


    public kehulist(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'kehu/kehulist';
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
                return ApiConfig.ErrorHandle('kehu/kehulist', data, err);
            });
    }


    public searchcompany(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'kehu/searchcompany';
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
                return ApiConfig.ErrorHandle('kehu/searchcompany', data, err);
            });
    }


    public workdetail(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'kehu/workdetail';
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
                return ApiConfig.ErrorHandle('kehu/workdetail', data, err);
            });
    }


    public xiugaikehu(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'kehu/xiugaikehu';
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
                return ApiConfig.ErrorHandle('kehu/xiugaikehu', data, err);
            });
    }


    public xiugaistatus(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'kehu/xiugaistatus';
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
                return ApiConfig.ErrorHandle('kehu/xiugaistatus', data, err);
            });
    }


    public xiugaizizhi(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'kehu/xiugaizizhi';
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
                return ApiConfig.ErrorHandle('kehu/xiugaizizhi', data, err);
            });
    }

}
