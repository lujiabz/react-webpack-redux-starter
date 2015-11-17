import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as sessionAction from '../actions/sessionAction';
import {MenuItem,DropdownButton} from "react-bootstrap";
import {Glyphicon} from "react-bootstrap";

function mapStateToProps(state) {
  	return {
    	username: state.session.username
  	};
}

function mapDispatchToProps(dispatch) {
  	return bindActionCreators(sessionAction, dispatch)
}

class menu extends React.Component {
	constructor(props) {
	    super(props);
  	}
  	componentDidMount() {
  		this.props.getUserSync();
  	}
  	componentWillUnmount() {
  		
  	}
  	render(){
  		var username = this.props.username;

  		var name = (function(){
  			return (
  				<div style ={{ display:"inline"}} >
					<Glyphicon glyph="user" className="item-logo" style={{marginRight:"3px"}}/>
	  				{username}
  				</div>
  			)
  		})()
  		return (
  			<nav className="navbar navbar-default" role="navigation">
				<div className="collapse navbar-collapse navbar-ex1-collapse">
					<ul className="nav navbar-nav navbar-right">
						<li>
							<DropdownButton 
								onSelect={this.select} 
								id="userinfo" 
								bsStyle='link' 
								title={name} 
								className="user-info">
							      	<MenuItem eventKey="1">退出</MenuItem>
							      	<MenuItem eventKey="2">关于</MenuItem>
						    </DropdownButton>
						</li>
						
					</ul>					
				</div>
			</nav>
  		)
  	}
  	select(e,key){
  		if(key == 1){
			window.location.replace("/logout");
		}
  	}
}

export default connect(mapStateToProps, mapDispatchToProps)(menu);