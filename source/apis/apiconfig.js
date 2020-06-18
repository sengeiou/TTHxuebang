export class ApiConfig {

  static GetApiUrl() {
    return "https://tthxb2.artxb.cn/api/";
  }

  static GetUploadPath() {
    return "https://tthxboss.oss-cn-shenzhen.aliyuncs.com/";
  }
  static GetFileUploadAPI() {
    return "https://tthxb2.artxb.cn/fileupload";
  }

  // static GetApiUrl() {
  //   return "https://cmsdev.app-link.org/alucard263096/tthxb/api/";
  // }

  // static GetUploadPath() {
  //   return "https://alioss.app-link.org/alucard263096/tthxb/";
  // }
  // static GetFileUploadAPI() {
  //   return "https://cmsdev.app-link.org/alucard263096/tthxb/fileupload";
  // }

  static GetUploadurl(){
    return "https://tthxb2.artxb.cn/upload/tthxb/";
    // return "https://cmsdev.app-link.org/alucard263096/tthxb/upload/tthxb/";
  }
  
  
  // static GetApiUrl() {
  //    return "https://cmsdev.app-link.org/alucard263096/tthxb/api/";
  //   // return "https://tthxb2.artxb.cn/api/";
  // }
  


  // //tthxb.artxb.cn/api
  // // https://cmsdev.app-link.org/alucard263096/tthxb/api

  // static GetUploadPath() {
  //   return "https://tthxboss.oss-cn-shenzhen.aliyuncs.com/";
  // }

  // static GetFileUploadAPI() {
  //   return "https://tthxb2.artxb.cn/fileupload";
  // }
  
  static GetHeader() {
    var headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'UNICODE': ApiConfig.UNICODE,
      'TOKEN': ApiConfig.TOKEN,
      'TOKENKEY':ApiConfig.TOKENKEY
    };
    return headers;
  } 
  static UNICODE = "";
  static SetUnicode(unicode) {
    ApiConfig.UNICODE = unicode;
  }
  static TOKEN = "";
  static SetToken(token) {
    ApiConfig.TOKEN = token;
  }
  static TOKENKEY = "";
  static SetTokenKey(tokenkey) {
    ApiConfig.TOKENKEY = tokenkey;
  }

  static showLoadingCounter = 0;
  
  static ShowLoading = function () {
    return;
    if (ApiConfig.showLoadingCounter == 0) {
      wx.showLoading({
        title: '加载中',
      });
    }
    ApiConfig.showLoadingCounter = ApiConfig.showLoadingCounter + 1;
  }

  static CloseLoading = function () {
    return;
    ApiConfig.showLoadingCounter = ApiConfig.showLoadingCounter - 1;
    if (ApiConfig.showLoadingCounter == 0) {
      console.log(ApiConfig.showLoadingCounter);
      wx.hideLoading();
    }
  }




}