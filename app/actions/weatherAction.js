import { WEATHER } from "../constants/weather";

export function getWeatherSync() {
	return dispatch => {
	    $.ajax({ 
	    	type:'get',
	    	url: '/api/weather'
	    })
        .done(data => {
        	data = JSON.parse(data);
        	data = data["HeWeather data service 3.0"][0];
        	
            dispatch({
			    type: WEATHER,
			    value: data
		  	});
        })
  	};
}