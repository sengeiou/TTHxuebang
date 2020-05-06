Uploader.upload=function(url,key,module,callback){
        alert(url);
    $.ajaxFileUpload
    (
        {
            "url": url+'?module=' + module+"&field=file_" + key,
            "secureuri": false,
            "fileElementId": "file_" + key,
            "dataType": 'text',
            "success": function (data, status) {
                alert(data);
                // if (data.substring(0, 7) == "success") {
                //     str = data.substring(7, data.length);
                //     callback(str);
                // } else {
                //     //errorDialog("上传失败，请联系管理员");
                // }
            },
            "error": function (data, status, e) {
                //errorDialog("上传失败，请联系管理员");
            }
        }
    );
}
