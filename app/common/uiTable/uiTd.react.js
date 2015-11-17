var React = require('react');

var uiTd = React.createClass({

	render: function() {
		return (
			<td data-val={this.props.val}>{this.props.label}</td>
		);
	},
	_tdClick:function(){
		this.props.onClick && this.props.onClick();
	}

});

module.exports = uiTd;