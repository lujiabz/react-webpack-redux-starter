var React = require('react');

var pagination = React.createClass({
	getInitialState: function() {
		return {
			start: 0
		};
	},
	render: function() {
		return (
			<nav>
				<ul className="pagination pull-right">
				    <li>
				        <a href="javascript://" data-val="first" onClick={this._firstClick}>
				        	<span aria-hidden="true">&laquo;</span>
				        </a>
				    </li>
				    <li>
				        <a href="javascript://" data-val="pre" onClick={this._preClick}>
				        	<span aria-hidden="true">&lt;</span>
				        </a>
				    </li>
				    <li>
				        <a href="javascript://" data-val="next" onClick={this._nextClick}>
				        	<span aria-hidden="true">&gt;</span>
				        </a>
				    </li>
				    
				    <li>
				        <a href="javascript://" data-val="last" onClick={this._lastClick}>
				          <span aria-hidden="true">&raquo;</span>
				        </a>
				    </li>
				</ul>
				<div className="pull-right" style={{width:50,marginRight:10,fontSize:16,marginTop:5}}> /&nbsp;{this.props.max + 1}</div>
				   
				
				<div className="form-group pull-right" style={{width:50,marginRight:10}}>
				    <input type="text" className="form-control" value={this.state.start + 1}/>
				</div>
			</nav>
		);
	},
	_firstClick:function(){
		this.state.start = 0;
		this._btnClick();
	},
	_preClick:function(){
		this.state.start--;
		if(this.state.start < 0){
			this.state.start = 0;
		}
		this._btnClick();
	},
	_nextClick:function(){
		this.state.start++;
		if(this.state.start > this.props.max){
			this.state.start = this.props.max;
		}
		this._btnClick();
	},
	_lastClick:function(){
		this.state.start = this.props.max;
		this._btnClick();
	},
	_btnClick:function(){
		this.props.onClick && this.props.onClick(this.state.start);
		this.forceUpdate()
	}

});

module.exports = pagination;