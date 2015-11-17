import { CHAT_USER,CHAT_MSG } from "../constants/chat";

export function getUser(data) {
	return {
		type: CHAT_USER,
		value: data
	}
}
export function getMsg(data) {
	return {
		type: CHAT_MSG,
		value: data
	}
}