var React = require('react');
var Row = require('./uiRow.react');
var Head = require('./uiHead.react');
var Pagination = require('../pagination/pagination.react');
var classNames = require("classNames");
var cx = require('react/lib/cx');

var uiTable = React.createClass({
	getInitialState: function() {
		return {
			limit: this.props.limit,
			total: 0,
			url: this.props.url,
			pager: this.props.pager
		};
	},
	componentWillMount: function() {
		this.props.listener(this);
		this.getTableData();
	},
	render: function() {
		var col = this.props.col;
		var clickFun = this._trClick;
		var format = this.props.format;
		var rows = this.props.data.map(function(item){
			return (
				<Row data={item} col={col} onClick={clickFun} format={format}/>
			)
		});
		return (
			<div>
				<table className={classNames(this.props.style)}>
					<thead>
						<Head data={this.props.col} format={format}/>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
				<div className={cx({
					"hide":!this.state.pager 
				})}>
					<div className="pull-left">共{this.state.total}条</div>
					<Pagination onClick={this._paginationClick} max={5}/>
				</div>
			</div>
		);
	},
	_trClick:function(data){
		this.props.onClick && this.props.onClick(data);
	},
	_paginationClick:function(o){
		this.getTableData();
	},
	getTableData:function(){
		this.setState({
			total:1 
		});
		alert(1)
	},
	refresh:function(){
		this.getTableData();
	}

});

module.exports = uiTable;