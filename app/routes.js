import React from "react";
import {Router, Route } from "react-router";
import SideMenu from "./components/sideMenu";
import menu from "./menu.config";
import Menu from "./components/menu.react";
import Movies from "./components/movies.react";
import Weather from "./components/weather.react";
import Account from "./components/account.react";
import Chat from "./components/chat.react";
import Mail from "./components/mail.react";

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div className="g-doc">
                <div className="g-sd">
                    <div className="home-logo">HOME SYSTEM</div>
                    <SideMenu data={menu}/>
                </div>
                <div className="g-mn">
                    <Menu />
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default (
    <Route component={App}>
        <Route path='/' component={Movies} />
        <Route path="/weather" component={Weather}/>
        <Route path="/account" component={Account}/>
        <Route path="/chat" component={Chat}/>
        <Route path="/mail" component={Mail}/>
    </Route>
)

