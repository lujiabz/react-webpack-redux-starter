import {combineReducers} from 'redux';

//根据功能拆分成多个子reducer
import session from "./session_reducer";
import movies from "./movies_reducer";
import weather from "./weather_reducer";
import account from "./account_reducer";
import mail from "./mail_reducer";
import chat from "./chat_reducer";

const rootReducer = combineReducers({ //合并所有reducers
  	session,
  	movies,
  	weather,
  	account,
  	mail,
  	chat
});

export default rootReducer
