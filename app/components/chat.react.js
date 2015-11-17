import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as chatAction from '../actions/chatAction';
import {Button,Glyphicon} from "react-bootstrap";

function mapStateToProps(state) {
  	return {
    	chat: state.chat,
    	session: state.session
  	};
}

function mapDispatchToProps(dispatch) {
  	return bindActionCreators(chatAction, dispatch)
}

var socket;
class chat extends React.Component {
	constructor(props) {
	    super(props);
	    this.send = this.send.bind(this);
	    this.press = this.press.bind(this);
  	}
  	componentDidMount() {
  		var props = this.props;

	    setTimeout(function(){
    		if(!socket){
	    		socket = io.connect();

	    		socket.emit('login',props.session.username)
		    	socket.on('users',function(data){
					props.getUser(data);
		    	})
		    	socket.on('message',function(data){
					props.getMsg(data);
		    	})
	    	}else{
	    		socket.connect();
	    		socket.emit('login',props.session.username)
	    	}
    	},300);
  	}
  	componentWillUnmount() {
	    socket.disconnect();
  	}
  	componentDidUpdate() {
  		var d = this.refs.room;
		d.scrollTop = d.scrollHeight;
		$(this.refs.text).val("");
  	}
  	render(){
  		var props = this.props;

  		var users = this.props.chat.users.map(function(item,i){
			return (
				<li key={i}>{ item }</li>
			)
		});
		var messages = this.props.chat.message.map(function(item,i){
			return (
				<div className="chat-room-item" key={i}>
					<span className={ props.session.username == item.name ? "pull-right" : "pull-left"}>
						<span className="msg">{item.msg}</span>
						<Glyphicon glyph="user" className="logo"/>
					</span>
				</div>
			)
		});
		return (
			<div className="g-cnt">
				<div className="chat">
					<div className="chat-list">
						<div className="chart-list-title">
							在线用户列表({this.props.chat.users.length})
						</div>
						<ul>
							{users}
						</ul>
					</div>
					<div className="chat-room">
						<div className="chat-room-body" ref="room">
							{messages}
						</div>
						<div className="chat-room-text">
							<textarea ref="text" onKeyDown={this.press}></textarea>
						</div>
						<div className="chat-room-send">
							<Button className="pull-right" onClick={this.send}>发送</Button>
							<span className="pull-right tip">可以按enter发送</span>
						</div>
					</div>
				</div>
			</div>
		);
  	}
  	send(){
		var value = $(this.refs.text).val();
		socket.emit("message",value);
	}
	press(e){
		if(e.keyCode == 13){
			this.send();
			return false;
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(chat);