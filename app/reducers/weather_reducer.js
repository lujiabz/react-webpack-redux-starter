import { WEATHER } from "../constants/weather";

const initialState = {
	"daily_forecast":[],
	"now": {
		"wind":{}
    },
    "hourly_forecast":[]
}

export default function weatherReducer (state = initialState, action) {
	switch(action.type) {
		case WEATHER:
			return action.value
		default:
			return state;
	}
}
