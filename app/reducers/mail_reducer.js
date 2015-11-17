import { MAIL_SEND,MAIL_SENDING } from "../constants/mail";

const initialState = {
	form: {
		to: "lumiab@yeah.net",
		subject: "测试邮件",
		text: "这是一个测试邮件，请勿回复。"
	},
	sending: false
}

export default function mailReducer (state = initialState, action) {
	switch(action.type) {
		case MAIL_SEND:
			return {
				form: action.value,
				sending: false
			};
		case MAIL_SENDING:
			return {
				form: state.form,
				sending: true
			};
		default:
			return state;
	}
}
