import { MAIL_SEND,MAIL_SENDING } from "../constants/mail";

export function sendMailSync(formData) {
	return dispatch => {
	    $.ajax({ 
	    	type:'post',
	    	url: '/api/mail',
	    	data:formData
	    })
        .done(data => {
		  	if(data.code){
                toastr.error(data.message);
            }else{
            	dispatch({
				    type: MAIL_SEND,
				    value: formData
			  	});
                toastr.success(data.message);
            }
        })
  	};
}

export function mailSending() {
	return {
		type: MAIL_SENDING
	}
}