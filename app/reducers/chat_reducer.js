import { CHAT_USER,CHAT_MSG } from "../constants/chat";

const initialState = {
	users: [],
    socket: "",
    message: [],
}

export default function chatReducer (state = initialState, action) {
	switch(action.type) {
		case CHAT_USER:
			
			return Object.assign({},state,{users:action.value.users});
		case CHAT_MSG:
			return Object.assign({},state,{
				message:[
					...state.message,
					action.value
				]
			});
		default:
			return state;
	}
}
