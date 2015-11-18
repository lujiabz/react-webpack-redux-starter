import React, {Component}    from "react";
import ReactDOM              from "react-dom";
import {Router, Route, Link} from "react-router";
import createBrowserHistory from 'history/lib/createBrowserHistory';
// import createHashHistory     from "history/lib/createHashHistory";
import {Provider}            from "react-redux";
import renderRoutes          from "./routes";
import configureStore        from "./store";

var initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState); //创建Redux Store实例

//定义一个根组件
class Root extends Component {

  	constructor(props) {
    	super(props);
    	this.history = createBrowserHistory(); 
  //   	this.history = createHashHistory({
		//   	queryKey: false
		// });
 	}

  	render () {
	    return (
	      	<Provider store={store}>
	      	 	<Router history={this.history}>
	        		{renderRoutes}
        		</Router>
	      	</Provider>
	    )
  	}
}

//todo 注意这里使用的是ReactDOM？ 将应用组件注入到指定dom中
ReactDOM.render(<Root/>, document.getElementById("app"));
        
     


