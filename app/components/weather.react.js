import React from "react";
import Chart from "../common/charts/charts.react";
import _ from "underscore";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as weatherAction from '../actions/weatherAction';

var wm = {
	"晴" : "sunny",
	"多云" : "duoyun",
	"阴" : "yin",
	"阵雨": "zheyu",
	"小雨": "xiaoyu"
};

function mapStateToProps(state) {
  	return {
    	weather: state.weather
  	};
}

function mapDispatchToProps(dispatch) {
  	return bindActionCreators(weatherAction, dispatch)
}


class weather extends React.Component {
	constructor(props) {
	    super(props);
  	}
  	componentDidMount() {
	  	this.props.getWeatherSync()
  	}
  	componentWillUnmount() {

  	}
  	render(){
  		var weather = this.props.weather;
		var days = weather.daily_forecast.map(function(item,i){
			return (
				<div key={i} className={ i == 0 ? "weather-days-item weather-days-enable" : "weather-days-item"}>
					<div className="weather-days-head">
						{item.date}
					</div>
					<div className="weather-days-body">
						<i className={ "weather-icon weather-" + wm[item.cond.txt_d]}></i>
						<div className="f-tac">白天：{item.cond.txt_d}</div>
						<div className="f-tac">夜间：{item.cond.txt_n}</div>
						<div className="f-tac">{item.tmp.min}~{item.tmp.max} c</div>
						<div className="f-tac">{item.wind.dir}</div>
					</div>
				</div>
			)
		})
		var now = weather.now;

		var chartData = {
			category:['20151015','20151016','20151016'],
			series:[
				{
					name:"温度",
					data:[35,23,21]
				}
			]
		}

		if(weather.hourly_forecast.length){
			chartData.category = [];
			chartData.series[0].data = [];
			_.each(weather.hourly_forecast,function(item){
				chartData.category.push(item.date);
				chartData.series[0].data.push(item.tmp);
			})
		}
		return (
			<div className="g-cnt">
				<div className="weather">
					<div className="weather-days">
						{days}
					</div>
					<div className="weather-detail">
						<div className="weather-detail-advice">
							<div className="f-fl item">体感温度：{ now.fl } ℃</div>
							<div className="f-fl item">相对湿度：{ now.hum } %</div>
							<div className="f-fl item">降水量：{ now.pcpn } mm</div>
							<div className="f-fl item">温度：{ now.tmp } ℃</div>
							<div className="f-fl item">能见度：{ now.vis }</div>
							<div className="f-fl item">风向：{ now.wind.dir}</div>
							<div className="f-fl item">风力：{ now.wind.sc} 级</div>
						</div>
						<div className="weather-detail-hour">
							<div className="head">
								今日整点天气预报（℃）
							</div>
							<div className="body">
								<Chart bsType="line" data={chartData}/>
							</div>

						</div>
					</div>
				</div>
			</div>
		);
  	}
}

export default connect(mapStateToProps, mapDispatchToProps)(weather);