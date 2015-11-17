var React = require('react');
var Th = require('./uiTh.react');

var uiHead = React.createClass({

	render: function() {
		var th = this.props.data.map(function(item){
			return (
				<Th label={item.label} val={item.val} width={item.width || ""}/>
			)
		});
		return (
			<tr>
				{th}
			</tr>
		);
	}

});

module.exports = uiHead;