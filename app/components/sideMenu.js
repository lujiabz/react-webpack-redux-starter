import React from "react";
import AccordionItem from "./sideMenu-item.react";
import menu from "../menu.config";
import _ from "underscore";

function getInit(){
	var path = window.location.pathname.slice(1);

	for(var i in menu){
		if(path == ""){
			return i;
		}
		var arr = [];

		_.each(menu[i],function(item){
			arr.push(item.href);
		})

		if(_.contains(arr,path)){
			return i;
		}
	}
}

class sideMenu extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	now: ""
	    }
	    this.clickHead = this.clickHead.bind(this);
  	}
  	componentDidMount() {
	    this.setState({
	    	now: getInit() 
	    });
  	}
  	componentWillUnmount() {
	   
  	}
  	render(){
  		var menu = this.props.data;
		var menus = [];
		var now = this.state.now;

		for(var k in menu){
			menus.push(<AccordionItem key={k} head={k} data={menu[k]} onclick={this.clickHead} active={now == k?true:false}/>)
		}
		return (
			<div className='accordion'>
				{menus}
			</div>
		);
  	}
  	clickHead(o){
		this.setState({
			now:o.head 
		});
	}
}

export default sideMenu;