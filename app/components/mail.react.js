import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as mailAction from '../actions/mailAction';
import {Button,Panel} from "react-bootstrap";
var t = require('tcomb-form');
var Form = t.form.Form;

function mapStateToProps(state) {
  	return {
    	mail: state.mail
  	};
}

function mapDispatchToProps(dispatch) {
  	return bindActionCreators(mailAction, dispatch)
}

var fields = {
	to: t.Str,
    subject: t.Str,
    text: t.Str
}

var options = {
	fields: {
	    subject: {
	    	label:"邮件主题",
	        type: 'text',
	        hasError: false,
			error:function(v){
				return "不能为空"
			},							
			help:"提示：填写邮件主标题",
			id: 1
	    },
	    to: {
	    	label:"接收人",
	        type: 'email',
	        hasError: false,
			error:function(v){
				return "不能为空"
			},							
			help:"提示：填写邮件接收人",
			id:2
	    },
	    text: {
	    	label:"邮件内容",
	        type: 'textarea',
	        hasError: false,
			error:function(v){
				return "不能为空"
			},							
			help:"提示：填写邮件内容",
			id:3
	    }
	},
		
};

class mail extends React.Component {
	constructor(props) {
	    super(props);
	    this.clickHandle = this.clickHandle.bind(this);
  	}
  	componentDidMount() {
	   
  	}
  	componentWillUnmount() {
	   
  	}
  	render(){
  		var mail = t.struct(fields);
		return (
			<div className="g-cnt">
				<div className="mail">
					<Form 
						type={mail} 
						ref="form" 
						options={options} 
						value={this.props.mail.form}/>
						
	        		<Button bsStyle="primary" disabled={this.props.mail.sending == false ? false : true } onClick={this.clickHandle}>
	        			{ this.props.mail.sending == false ? "发送邮件" : "邮件发送中..."}
	        		</Button>
				</div>
			</div>
			
		);
  	}
  	clickHandle(){
  		this.props.mailSending();
		var value = this.refs.form.getValue();
		if(value){
			this.props.sendMailSync(value);
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(mail);