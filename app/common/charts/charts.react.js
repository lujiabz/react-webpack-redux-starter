var React = require('react');
var chartConfig = require('./charts.config');
var _ = require('underscore');

function makeConfig(defaultConfig,data){
	var config = _.extend({},defaultConfig);

	config.legend.data = [];
	config.xAxis[0].data = data.category;
	_.each(data.series,function(item,i){
		config.series[i].name = item.name;
		config.series[i].data = item.data;
		config.legend.data.push(item.name);
	})
	return config;
}
var charts = React.createClass({
	getInitialState: function() {
		return {
			chart : {} 
		};
	},
	componentDidMount: function() {
		var dom = this.refs.chart;
		var type = this.props.bsType;
		var clickHandle = this.props.onClick;
		var data = this.props.data;

		var chart = echarts.init(dom);
		chart.setOption(makeConfig(chartConfig[type],data));

		chart.on("click",function(e){
			clickHandle && clickHandle(e);
		})

		this.state.chart = chart;
	},
	componentWillReceiveProps: function(){

	},
	componentDidUpdate:function(){
		var type = this.props.bsType;
		var data = this.props.data;
		
		this.state.chart.clear();
		this.state.chart.setOption(makeConfig(chartConfig[type],data));
	},
	render: function() {

		return (
			<div className="chart-container" ref="chart"/>
		);
	}

});

module.exports = charts;