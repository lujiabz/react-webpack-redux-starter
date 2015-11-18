var React = require('react');
var Router = require('react-router');
var ReactDOM = require('react-dom/server');
var routes = require('../app/routes');
var createStore = require('redux').createStore;
var Provider = require('react-redux').Provider;
var rootReducer = require('../app/reducers');
var swig  = require('swig');

module.exports = {
	render: function(req, res) {
	    Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
	        if (err) {
	            res.status(500).send(err.message);
	        } else if (redirectLocation) {
	            res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
	        } else if (renderProps) {
	            var store = createStore(rootReducer.default,{});

	            var html = ReactDOM.renderToString(
	                <Provider store={store}>
	                    { <Router.RoutingContext {...renderProps}/> }
	                </Provider>
	            );

	            var initialState = store.getState();
	            initialState = JSON.stringify(initialState);

	            // var ele = React.createElement(Router.RoutingContext, renderProps);
	            // var html = ReactDOM.renderToString(ele);

	            var page = swig.renderFile('public/www/index.html', { html: html,initialState: initialState });
	            res.status(200).send(page);
	        } else {
	            res.status(404).send('Page Not Found');
	        }
	    });
	}
}