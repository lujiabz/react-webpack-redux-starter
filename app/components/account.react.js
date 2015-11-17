import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as accountAction from '../actions/accountAction';
import {Button,Modal,OverlayTrigger,Popover} from "react-bootstrap";
import moment from "moment";
var t = require('tcomb-form');
var Form = t.form.Form;

function mapStateToProps(state) {
  	return {
    	account: state.account
  	};
}

function mapDispatchToProps(dispatch) {
  	return bindActionCreators(accountAction, dispatch)
}

var fields = {
	name: t.Str,
    money: t.Number
}

var options = {
	fields: {
	    name: {
	    	label:"名称",
	        type: 'text',
	        hasError: false,
			error:function(v){
				return "不能为空"
			},							
			help:"填写用途或收入来源",
	    },
	    money: {
	    	label:"金额",
	        type: 'text',
	        hasError: false,
			error:function(v){
				if(!v){
					return "不能为空"
				}
				if(typeof v != "number"){
					return "必须为数字"
				}else{
					return ""
				}
				
			},							
			help:"填写金额大小",
	    }
	},
		
};

class account extends React.Component {
	constructor(props) {
	    super(props);
	    this.close = this.close.bind(this);
	    this.open = this.open.bind(this);
	    this.save = this.save.bind(this);
	    this.del = this.del.bind(this);
  	}
  	componentDidMount() {
	   	this.props.getListSync();
  	}
  	componentWillUnmount() {
	  
  	}
  	render(){
  		var { list,showModal } = this.props.account;

  		var del = this.del;
  		var body = list.map(function(item,i){
			return (
				<tr key={item._id}>
					<td>{ moment(item.time).format("YYYY-MM-DD HH:mm:ss")}</td>
					<td>{item.name}</td>
					<td>{item.money}</td>
					<td>
					<OverlayTrigger trigger="click" rootClose placement="left" overlay={<Popover id="popover" title="确定要删除吗" ><a href="javascript://" data-dbid={item._id} onClick={del}>确定删除</a></Popover>}>
				      	<a href="javascript://">删除</a>
				    </OverlayTrigger>
					</td>
				</tr>
			)
		});
		var a = t.struct(fields);
		return (
			<div className="g-cnt">
				<div className="account">
					<div className="account-search">
						<Button className="pull-right" bsStyle="primary" onClick={this.open}>新增</Button>
					</div>
					<div className="account-body">
						<table className="table table-hover">
							<thead>
								<tr>
									<th>创建时间</th>
									<th>名称</th>
									<th>金额</th>
									<th style={{"width":50}}>操作</th>
								</tr>
							</thead>
							<tbody>
								{body}
							</tbody>
						</table>
					</div>
					{ list.length != 0 ? "" : <div className="text-center">暂无数据！</div>}
				</div>
				<Modal id="modal" show={ showModal } onHide={this.close}>
					<Modal.Header>
		            	<Modal.Title>新增开支</Modal.Title>
		          	</Modal.Header>
	          	 	<Modal.Body>
		            <Form 
						type={a} 
						ref="form" 
						options={options} />
		          	</Modal.Body>
		          	<Modal.Footer>
		            	<Button bsStyle="primary" onClick={this.save}>保存</Button>
		            	<Button onClick={this.close}>关闭</Button>
		          	</Modal.Footer>
				</Modal>
				<div>
					
				</div>
				
			</div>
		);
  	}
  	close() {
		this.props.hideModal();
	}
	open() {
		this.props.showModal();
	}
	save() {
		var value = this.refs.form.getValue();
		if(value){
			this.props.addCountSync(value);
		}
		
	}
	del(e) {
		var target = e.target;
		var id = target.dataset.dbid;
		this.props.delCountSync(id);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(account);
