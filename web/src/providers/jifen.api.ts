import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConfig } from '../app/api.config'
@Injectable()
export class JifenApi {

    constructor(public http: HttpClient) {

    }


    public addjifen(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jifen/addjifen';
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
                return ApiConfig.ErrorHandle('jifen/addjifen', data, err);
            });
    }


    public addjifenorder(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jifen/addjifenorder';
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
                return ApiConfig.ErrorHandle('jifen/addjifenorder', data, err);
            });
    }


    public commodityinfo(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jifen/commodityinfo';
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
                return ApiConfig.ErrorHandle('jifen/commodityinfo', data, err);
            });
    }


    public commoditylist(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jifen/commoditylist';
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
                return ApiConfig.ErrorHandle('jifen/commoditylist', data, err);
            });
    }


    public daka(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jifen/daka';
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
                return ApiConfig.ErrorHandle('jifen/daka', data, err);
            });
    }


    public dakalist(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jifen/dakalist';
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
                return ApiConfig.ErrorHandle('jifen/dakalist', data, err);
            });
    }


    public deduction(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jifen/deduction';
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
                return ApiConfig.ErrorHandle('jifen/deduction', data, err);
            });
    }


    public jifenorderinfo(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jifen/jifenorderinfo';
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
                return ApiConfig.ErrorHandle('jifen/jifenorderinfo', data, err);
            });
    }


    public jifenorderlist(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jifen/jifenorderlist';
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
                return ApiConfig.ErrorHandle('jifen/jifenorderlist', data, err);
            });
    }


    public jilulist(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jifen/jilulist';
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
                return ApiConfig.ErrorHandle('jifen/jilulist', data, err);
            });
    }


    public shanchu(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jifen/shanchu';
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
                return ApiConfig.ErrorHandle('jifen/shanchu', data, err);
            });
    }


    public shouhuo(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jifen/shouhuo';
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
                return ApiConfig.ErrorHandle('jifen/shouhuo', data, err);
            });
    }


    public updatejifen(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jifen/updatejifen';
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
                return ApiConfig.ErrorHandle('jifen/updatejifen', data, err);
            });
    }


    public updatekucun(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jifen/updatekucun';
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
                return ApiConfig.ErrorHandle('jifen/updatekucun', data, err);
            });
    }


    public wuliu(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jifen/wuliu';
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
                return ApiConfig.ErrorHandle('jifen/wuliu', data, err);
            });
    }

}
