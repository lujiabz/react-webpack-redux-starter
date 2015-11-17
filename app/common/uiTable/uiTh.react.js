var React = require('react');

var uiTd = React.createClass({

	render: function() {
		return (
			<th data-val={this.props.val} width={this.props.width}>{this.props.label}</th>
		);
	},
	_tdClick:function(){
		this.props.onClick && this.props.onClick();
	}

});

module.exports = uiTd;