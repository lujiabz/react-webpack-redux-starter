import { MOVIES_LIST } from "../constants/movies";

export function getMoviesSync(limit) {
	return dispatch => {
	    $.ajax({ 
	    	type:'get',
	    	url: '/api/movies',
	    	data:{
	    		limit:limit
	    	}
	    })
        .done(data => {
            dispatch({
			    type: MOVIES_LIST,
			    value: data
		  	});
        })
  	};
}