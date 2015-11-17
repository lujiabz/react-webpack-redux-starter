import React from "react";
import {Router,Link,IndexLink} from "react-router";
import {Glyphicon} from "react-bootstrap";

class accordionItem extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {};
	    this.clickHead = this.clickHead.bind(this);
  	}
  	componentDidMount() {

  	}
  	componentWillUnmount() {
	   
  	}

  	render() {
		var head = this.props.head;
		var data = this.props.data;
		var menus = [];

		for (var i = 0; i < data.length; i++) {
			if(data[i].href == "movies"){
				menus.push(<li key={i}><Link to="/" activeClassName="active"><Glyphicon glyph="grain" className="item-logo"/>{data[i].name}</Link></li>)
			}else{
				menus.push(<li key={i}><Link to={"/" + data[i].href} activeClassName="active"><Glyphicon glyph="grain" className="item-logo"/>{data[i].name}</Link></li>);
			}
		};

		return (
			
			<div className={ this.props.active ? "open accordion-item" : "accordion-item" }>
				<div className="accordion-item-head" onClick={this.clickHead}>
					<Glyphicon glyph="th-list" className="item-logo"/>
					{head}
					{
						this.props.active ? <Glyphicon glyph="menu-up" className="f-fr"/> : <Glyphicon glyph="menu-down" className="f-fr"/>
					}
				</div>
				<ul className='accordion-item-content'>
					{menus}
				</ul>
			</div>
			
		);
	}
  	clickHead(){
		var active = !this.props.active;

		var head = active ? this.props.head : null;
		this.props.onclick({
			head:head
		});
	}

}

export default accordionItem;