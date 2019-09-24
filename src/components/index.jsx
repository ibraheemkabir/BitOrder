import React,{Component} from 'react';
import {SelectBox } from './select/index';
import {orderPairs } from '../apiCalls';

import {Orderlist} from './orderList/index'
import {Footer} from './footer/index'

export class Home extends Component{

    state = {
        pairs: '',
        ws: '',
        dataFromServer: {}
    }

    ws = new WebSocket('wss://ws.bitstamp.net')

    connect = () => {
        var ws = new WebSocket('wss://ws.bitstamp.net')
        let that = this; // cache the this
        var connectInterval;

        // websocket onopen event listener
        ws.onopen = () => {
            console.log("connected websocket main component");
            this.setState({ ws: ws });

            that.timeout = 250; // reset timer to 250 on open of websocket connection 
            clearTimeout(connectInterval); // clear Interval on on open of websocket connection
        };

        ws.onmessage = evt => {
            // listen to data sent from the websocket server
            const message = JSON.parse(evt.data)
            this.setState({dataFromServer: message})
            console.log(message)
        }

        // websocket onclose event listener
        ws.onclose = e => {
            console.log(
                `Socket is closed. Reconnect will be attempted in ${Math.min(
                    10000 / 1000,
                    (that.timeout + that.timeout) / 1000
                    )} second.`,
                    e.reason
                );
    
                that.timeout = that.timeout + that.timeout; //increment retry interval
                connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
            };
    
            // websocket onerror event listener
            ws.onerror = err => {
                console.error(
                    "Socket encountered error: ",
                    err.message,
                    "Closing socket"
                );
    
                ws.close();
            };
        };

        check = () => {
            const { ws } = this.state;
            if (!ws || ws.readyState == WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
        };

    async componentDidMount(){
        this.connect();            
        const orders =await orderPairs()
        console.log(orders)
        this.setState(
            {
                pairs: orders
                }
            );
    }

    render(){
        const {pairs, dataFromServer} = this.state;

        return(
            <div>
            <SelectBox data={pairs} websocket={this.state.ws}/>
            <Orderlist data={dataFromServer}/>
            </div>
        )
    }
}
