'use strict';

//#region App local

//var virtualDir = window.location.href.indexOf('SafeCity') >= 0 ? '/SafeCity' : '';
var urlDangNhap = '/Login/Login';
var msgHetSession = 'Phiên đăng nhập của bạn đã hết hạn, vui lòng đăng nhập lại để sử dụng chương trình';

function checkSessionExpire(e, returnPage) {
    //if (e.xhr) {
    //    if (e.xhr.responseJSON) {
    //        if (e.xhr.responseJSON.Message === 'Session expired!') {
    //            alert(msgHetSession);
    //            window.location = urlDangNhap + '?p=' + (virtualDir + returnPage).replace(/\//g, '%2f');
    //            window.location = urlDangNhap + '?p=' + (returnPage).replace(/\//g, '%2f');
    //        }
    //    }
    //}
    //else if (e.responseJSON) {
    //    if (e.responseJSON.Message === 'Session expired!') {
    //        alert(msgHetSession);
    //        window.location = urlDangNhap + '?p=' + (virtualDir + returnPage).replace(/\//g, '%2f');
    //        window.location = urlDangNhap + '?p=' + ( returnPage).replace(/\//g, '%2f');
    //    }
    //}

    if (e.msg === 'Session expired!') {
        Notify(msgHetSession, 'bottom-right', '5000', 'danger', 'fa-warning', true);       
        setTimeout(function () {
            window.location = urlDangNhap + '?p=' + (returnPage).replace(/\//g, '%2f');
        }, 3000);
    }

}

//#endregion



