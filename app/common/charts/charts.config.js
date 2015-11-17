var React = require('react');

var config = {
	line:{
	    tooltip : {
	        trigger: 'axis'
	    },
		grid : {
			y : 20,
			x : 50,
			x2 : 50
		},
		
	    legend: {
			y:"bottom",
	        data:[
				
			]
	    },

	    xAxis : [
	        {
	            type : 'category',
	            boundaryGap : false,
	            data :  ["1","2"]         
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
				axisLabel : {
	                formatter: '{value} '
	            }
	        }
	    ],
        series : [
	        {
	            name:"绍兴银行",
				symbol:'none',
				smooth:true,
	            type:"line",
		        data:[
		        	"100","200"			
				]
	        },
	    ]
	},
	bar: {
		grid:{
			y2:100,
			borderWidth:0
		},
		title : {
	        text: '',
	        subtext: ''
	    },
	    tooltip : {
	        trigger: 'axis'
	    },
	    legend: {
	        data:[]
	    },
	    // toolbox: {
	    //     show : true,
	    //     feature : {
	    //         mark : {show: true},
	    //         dataView : {show: true, readOnly: false},
	    //         magicType : {show: true, type: ['line', 'bar']},
	    //         restore : {show: true},
	    //         saveAsImage : {show: true}
	    //     }
	    // },
	    color:["#69eaa5","#54C2F5"],
	    // calculable : true,
	    xAxis : [
	        {
	            type : 'category',
	            data : ['进出口押款','贴现','垫款','逾期贷款','中长期抵押质押贷款','中长期保证贷款','中长期信用贷款','短期抵押质押贷款','短期信用贷款','个人消费贷款'],
	            axisLabel:{
	            	rotate:45,
	            	textStyle:{
		            	color:"#000",
		            	fontWeight:"bold"
		            }
	            },
	            splitLine:{
	            	show:false
	            },
	            axisTick:{
	            	onGap:true
	            },
	            
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	            splitLine:{
	            	show: true
	            },
	            axisLine:{
	            	show:false
	            }
	        }
	    ],
	    series : [
	        {
	            name:'',
	            type:'bar',
	            data:[75.0, 50.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0]
	        }
	        
	    ]
	}	     
}

module.exports = config;