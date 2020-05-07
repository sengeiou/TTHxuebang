import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConfig } from '../app/api.config'
@Injectable()
export class PingceApi {

    constructor(public http: HttpClient) {

    }


    public addmypingce(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'pingce/addmypingce';
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
                return ApiConfig.ErrorHandle('pingce/addmypingce', data, err);
            });
    }


    public addone(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'pingce/addone';
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
                return ApiConfig.ErrorHandle('pingce/addone', data, err);
            });
    }


    public addpingce(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'pingce/addpingce';
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
                return ApiConfig.ErrorHandle('pingce/addpingce', data, err);
            });
    }


    public indexinfo(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'pingce/indexinfo';
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
                return ApiConfig.ErrorHandle('pingce/indexinfo', data, err);
            });
    }


    public indexlist(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'pingce/indexlist';
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
                return ApiConfig.ErrorHandle('pingce/indexlist', data, err);
            });
    }


    public mypingcelist(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'pingce/mypingcelist';
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
                return ApiConfig.ErrorHandle('pingce/mypingcelist', data, err);
            });
    }


    public pingcejieguo(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'pingce/pingcejieguo';
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
                return ApiConfig.ErrorHandle('pingce/pingcejieguo', data, err);
            });
    }


    public pingcelist(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'pingce/pingcelist';
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
                return ApiConfig.ErrorHandle('pingce/pingcelist', data, err);
            });
    }


    public updatepingce(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'pingce/updatepingce';
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
                return ApiConfig.ErrorHandle('pingce/updatepingce', data, err);
            });
    }

}
