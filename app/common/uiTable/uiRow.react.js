var React = require('react');
var Td = require('./uiTd.react');
var _ = require("underscore");

var uiRow = React.createClass({

	render: function() {
		var tds = [];
		var data = this.props.data;
		var format = this.props.format;

		_.each(this.props.col,function(item,i){
			var label = data[item.val];
			if(format && format[item.val]){
				label = format[item.val](data[item.val],data);
			}
			
			tds.push(
				(
					<Td label={label} val={data[item.val]} onClick={this._trClick} format={format}/>
				)
			)
		})

		return (
			<tr onClick={this._trClick} data-id={data.id}>
				{tds}
			</tr>
		);
	},
	_tdClick:function(){
		this.props.onClick && this.props.onClick();
	},
	_trClick:function(){
		this.props.onClick && this.props.onClick(this.props.data);
	}

});

module.exports = uiRow;