import { SESSION_USER } from "../constants/session";

const initialState = {
	username: ""
}

export default function sessionReducer (state = initialState, action) {
	switch(action.type) {
		case SESSION_USER:
			state.username = action.value;
			return state;
			//return { username: action.value }
		default:
			return state;
	}
}
