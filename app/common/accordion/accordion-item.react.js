var React = require('react');
var cx = require('react/lib/cx');

var accordionItem = React.createClass({
	getInitialState: function() {
		return {
			
		};
	},
	componentWillMount: function() {

	},
	componentWillUnmount: function() {

	},
	render: function() {
		var head = this.props.head;
		var data = this.props.data;

		var menus = [];

		for (var i = 0; i < data.length; i++) {
			menus.push(<li>{data[i].name}</li>);
		};

		return (
			<div className='accordion-item'>
				<div className='accordion-item-head' onClick={this._clickHead}>{head}</div>
				<ul className={cx({
					'accordion-item-content': true,
					'v-enter':this.props.active,
					'v-leave':!this.props.active,
				})}>
					{menus}
				</ul>
			</div>
		);
	},

	_clickHead:function(){
		var active = !this.props.active;

		var head = active ? this.props.head : null;
		this.props.onclick({
			head:head
		});
	}

});

module.exports = accordionItem;