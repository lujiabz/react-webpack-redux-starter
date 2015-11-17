import { MOVIES_LIST } from "../constants/movies";

const initialState = {
	list: []
}

export default function moviesReducer (state = initialState, action) {
	switch(action.type) {
		case MOVIES_LIST:
			return {
				list: action.value
			};
		default:
			return state;
	}
}
