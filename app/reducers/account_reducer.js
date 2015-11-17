import { ACCOUNT_LIST,ACCOUNT_LIST_ADD,ACCOUNT_LIST_DEL,ACCOUNT_MODAL_SHOW,ACCOUNT_MODAL_HIDE } from "../constants/account";
import _ from "underscore";

const initialState = {
	list: [],
	showModal: false
}

export default function accountReducer (state = initialState, action) {
	switch(action.type) {
		case ACCOUNT_LIST:
			return {
				list: action.value,
				showModal: false
			};xx
		case ACCOUNT_LIST_ADD:
			return {
				list: [...state.list,action.value],
				showModal: false
			};
		case ACCOUNT_LIST_DEL:
			return {
				list: _.filter(state.list,function(item){
					return item._id != action.value;
				}),
				showModal: false
			};
		case ACCOUNT_MODAL_SHOW:
			return {
				list: state.list,
				showModal: true
			};
		case ACCOUNT_MODAL_HIDE:
			return {
				list: state.list,
				showModal: false
			};
		default:
			return state;
	}
}
