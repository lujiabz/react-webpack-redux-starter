import { ACCOUNT_LIST,ACCOUNT_LIST_ADD,ACCOUNT_LIST_DEL,ACCOUNT_MODAL_SHOW,ACCOUNT_MODAL_HIDE } from "../constants/account";

export function getListSync() {
	return dispatch => {
	    $.ajax({ 
	    	type:'get',
	    	url: '/api/account'
	    })
        .done(data => {
            dispatch({
			    type: ACCOUNT_LIST,
			    value: data
		  	});
        })
  	};
}
export function addCountSync(value) {
	return dispatch => {
	    $.ajax({ 
	    	url: '/api/account/add',
            type: 'post',
            data: value,
	    })
        .done(data => {
        	if(data.code === 0){
                dispatch({
				    type: ACCOUNT_LIST_ADD,
				    value: data.data
			  	});
                toastr.success("新增成功！");
            }else{
                toastr.error("新增不成功！");
            }
        })
  	};
}
export function delCountSync(id) {
	return dispatch => {
	    $.ajax({ 
	    	url:"/api/account/del",
            type:"post",
            data:{
                id:id
            }
	    })
        .done(data => {
        	if(data.code === 0){
                dispatch({
				    type: ACCOUNT_LIST_DEL,
				    value: id
			  	});
                toastr.success("删除成功！");
            }else{
                toastr.error("删除不成功！");
            }
        })
  	};
}

export function showModal() {
    return {
        type: ACCOUNT_MODAL_SHOW
    }
}

export function hideModal() {
    return {
        type: ACCOUNT_MODAL_HIDE
    }
}