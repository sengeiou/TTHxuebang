import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConfig } from '../app/api.config'
@Injectable()
export class JigouApi {

    constructor(public http: HttpClient) {

    }


    public aboutus(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/aboutus';
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
                return ApiConfig.ErrorHandle('jigou/aboutus', data, err);
            });
    }


    public activecity(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/activecity';
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
                return ApiConfig.ErrorHandle('jigou/activecity', data, err);
            });
    }


    public activedistrictlist(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/activedistrictlist';
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
                return ApiConfig.ErrorHandle('jigou/activedistrictlist', data, err);
            });
    }


    public addgroup(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/addgroup';
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
                return ApiConfig.ErrorHandle('jigou/addgroup', data, err);
            });
    }


    public addguankancishu(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/addguankancishu';
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
                return ApiConfig.ErrorHandle('jigou/addguankancishu', data, err);
            });
    }


    public addjigou(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/addjigou';
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
                return ApiConfig.ErrorHandle('jigou/addjigou', data, err);
            });
    }


    public addshenqing(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/addshenqing';
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
                return ApiConfig.ErrorHandle('jigou/addshenqing', data, err);
            });
    }


    public addxueyuan(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/addxueyuan';
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
                return ApiConfig.ErrorHandle('jigou/addxueyuan', data, err);
            });
    }


    public buyshow(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/buyshow';
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
                return ApiConfig.ErrorHandle('jigou/buyshow', data, err);
            });
    }


    public checkcanbuy(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/checkcanbuy';
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
                return ApiConfig.ErrorHandle('jigou/checkcanbuy', data, err);
            });
    }


    public courseage(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/courseage';
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
                return ApiConfig.ErrorHandle('jigou/courseage', data, err);
            });
    }


    public coursefav(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/coursefav';
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
                return ApiConfig.ErrorHandle('jigou/coursefav', data, err);
            });
    }


    public courseinfo(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/courseinfo';
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
                return ApiConfig.ErrorHandle('jigou/courseinfo', data, err);
            });
    }


    public courselist(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/courselist';
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
                return ApiConfig.ErrorHandle('jigou/courselist', data, err);
            });
    }


    public coursetype(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/coursetype';
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
                return ApiConfig.ErrorHandle('jigou/coursetype', data, err);
            });
    }


    public fabuxitonxiaoxi(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/fabuxitonxiaoxi';
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
                return ApiConfig.ErrorHandle('jigou/fabuxitonxiaoxi', data, err);
            });
    }


    public fenxiaoinfo(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/fenxiaoinfo';
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
                return ApiConfig.ErrorHandle('jigou/fenxiaoinfo', data, err);
            });
    }


    public fenxiaoshenhe(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/fenxiaoshenhe';
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
                return ApiConfig.ErrorHandle('jigou/fenxiaoshenhe', data, err);
            });
    }


    public gongaolist(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/gongaolist';
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
                return ApiConfig.ErrorHandle('jigou/gongaolist', data, err);
            });
    }


    public huiyuan(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/huiyuan';
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
                return ApiConfig.ErrorHandle('jigou/huiyuan', data, err);
            });
    }


    public jginfo(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/jginfo';
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
                return ApiConfig.ErrorHandle('jigou/jginfo', data, err);
            });
    }


    public jglist(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/jglist';
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
                return ApiConfig.ErrorHandle('jigou/jglist', data, err);
            });
    }


    public jianchapintuan(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/jianchapintuan';
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
                return ApiConfig.ErrorHandle('jigou/jianchapintuan', data, err);
            });
    }


    public jigoufav(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/jigoufav';
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
                return ApiConfig.ErrorHandle('jigou/jigoufav', data, err);
            });
    }


    public jigouimg(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/jigouimg';
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
                return ApiConfig.ErrorHandle('jigou/jigouimg', data, err);
            });
    }


    public kechenlunbo(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/kechenlunbo';
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
                return ApiConfig.ErrorHandle('jigou/kechenlunbo', data, err);
            });
    }


    public kechenzhanjie(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/kechenzhanjie';
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
                return ApiConfig.ErrorHandle('jigou/kechenzhanjie', data, err);
            });
    }


    public ketanglist(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/ketanglist';
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
                return ApiConfig.ErrorHandle('jigou/ketanglist', data, err);
            });
    }


    public ketangshoucanglist(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/ketangshoucanglist';
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
                return ApiConfig.ErrorHandle('jigou/ketangshoucanglist', data, err);
            });
    }


    public ketanpinlun(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/ketanpinlun';
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
                return ApiConfig.ErrorHandle('jigou/ketanpinlun', data, err);
            });
    }


    public ketanpinlunlist(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/ketanpinlunlist';
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
                return ApiConfig.ErrorHandle('jigou/ketanpinlunlist', data, err);
            });
    }


    public keywordlist(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/keywordlist';
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
                return ApiConfig.ErrorHandle('jigou/keywordlist', data, err);
            });
    }


    public latestbuy(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/latestbuy';
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
                return ApiConfig.ErrorHandle('jigou/latestbuy', data, err);
            });
    }


    public liuchen(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/liuchen';
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
                return ApiConfig.ErrorHandle('jigou/liuchen', data, err);
            });
    }


    public myxiaoxi(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/myxiaoxi';
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
                return ApiConfig.ErrorHandle('jigou/myxiaoxi', data, err);
            });
    }


    public newkcinfo(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/newkcinfo';
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
                return ApiConfig.ErrorHandle('jigou/newkcinfo', data, err);
            });
    }


    public newkclist(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/newkclist';
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
                return ApiConfig.ErrorHandle('jigou/newkclist', data, err);
            });
    }


    public opengroup(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/opengroup';
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
                return ApiConfig.ErrorHandle('jigou/opengroup', data, err);
            });
    }


    public orderstatus(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/orderstatus';
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
                return ApiConfig.ErrorHandle('jigou/orderstatus', data, err);
            });
    }


    public pinlundianzan(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/pinlundianzan';
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
                return ApiConfig.ErrorHandle('jigou/pinlundianzan', data, err);
            });
    }


    public pinlunhuifudianzan(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/pinlunhuifudianzan';
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
                return ApiConfig.ErrorHandle('jigou/pinlunhuifudianzan', data, err);
            });
    }


    public pintuaninfo(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/pintuaninfo';
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
                return ApiConfig.ErrorHandle('jigou/pintuaninfo', data, err);
            });
    }


    public pintuanlist(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/pintuanlist';
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
                return ApiConfig.ErrorHandle('jigou/pintuanlist', data, err);
            });
    }


    public problemlist(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/problemlist';
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
                return ApiConfig.ErrorHandle('jigou/problemlist', data, err);
            });
    }


    public qrcode(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/qrcode';
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
                return ApiConfig.ErrorHandle('jigou/qrcode', data, err);
            });
    }


    public quanyilist(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/quanyilist';
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
                return ApiConfig.ErrorHandle('jigou/quanyilist', data, err);
            });
    }


    public shanchuxiaoxi(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/shanchuxiaoxi';
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
                return ApiConfig.ErrorHandle('jigou/shanchuxiaoxi', data, err);
            });
    }


    public shanchuxueyuan(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/shanchuxueyuan';
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
                return ApiConfig.ErrorHandle('jigou/shanchuxueyuan', data, err);
            });
    }


    public shenhebutonguo(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/shenhebutonguo';
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
                return ApiConfig.ErrorHandle('jigou/shenhebutonguo', data, err);
            });
    }


    public shenhetonguo(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/shenhetonguo';
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
                return ApiConfig.ErrorHandle('jigou/shenhetonguo', data, err);
            });
    }


    public tgjilu(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/tgjilu';
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
                return ApiConfig.ErrorHandle('jigou/tgjilu', data, err);
            });
    }


    public tiaokuan(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/tiaokuan';
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
                return ApiConfig.ErrorHandle('jigou/tiaokuan', data, err);
            });
    }


    public updateprice(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/updateprice';
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
                return ApiConfig.ErrorHandle('jigou/updateprice', data, err);
            });
    }


    public videofav(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/videofav';
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
                return ApiConfig.ErrorHandle('jigou/videofav', data, err);
            });
    }


    public xiaoxiinfo(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/xiaoxiinfo';
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
                return ApiConfig.ErrorHandle('jigou/xiaoxiinfo', data, err);
            });
    }


    public xieyi(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/xieyi';
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
                return ApiConfig.ErrorHandle('jigou/xieyi', data, err);
            });
    }


    public xuebang(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/xuebang';
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
                return ApiConfig.ErrorHandle('jigou/xuebang', data, err);
            });
    }


    public xueyuaninfo(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/xueyuaninfo';
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
                return ApiConfig.ErrorHandle('jigou/xueyuaninfo', data, err);
            });
    }


    public xueyuanlist(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/xueyuanlist';
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
                return ApiConfig.ErrorHandle('jigou/xueyuanlist', data, err);
            });
    }


    public yaoqin(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/yaoqin';
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
                return ApiConfig.ErrorHandle('jigou/yaoqin', data, err);
            });
    }


    public zaixiankechenfenlei(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/zaixiankechenfenlei';
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
                return ApiConfig.ErrorHandle('jigou/zaixiankechenfenlei', data, err);
            });
    }


    public zaixiankecheninfo(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/zaixiankecheninfo';
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
                return ApiConfig.ErrorHandle('jigou/zaixiankecheninfo', data, err);
            });
    }


    public zaixiankechenlist(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/zaixiankechenlist';
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
                return ApiConfig.ErrorHandle('jigou/zaixiankechenlist', data, err);
            });
    }


    public zaixiankechenshoucan(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/zaixiankechenshoucan';
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
                return ApiConfig.ErrorHandle('jigou/zaixiankechenshoucan', data, err);
            });
    }


    public zaixianketanlunbo(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/zaixianketanlunbo';
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
                return ApiConfig.ErrorHandle('jigou/zaixianketanlunbo', data, err);
            });
    }


    public zuixinzaixiankechen(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'jigou/zuixinzaixiankechen';
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
                return ApiConfig.ErrorHandle('jigou/zuixinzaixiankechen', data, err);
            });
    }

}
