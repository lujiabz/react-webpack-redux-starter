import { SESSION_USER } from "../constants/session";

export function getUserSync() {
	return dispatch => {
	    $.ajax({ 
	    	type:'get',
	    	url: '/api/userinfo' 
	    })
        .done(data => {
            dispatch({
			    type: SESSION_USER,
			    value: data
		  	});
        })
  	};
}