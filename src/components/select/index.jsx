import React,{Component} from 'react';
import './select.scss';

export class SelectBox extends Component {

    
    sendMessage=(pair)=>{
        const {websocket} = this.props // websocket instance passed as props to the child component.

        try {            
            websocket.send( JSON.stringify(
                {
                    "event": "bts:subscribe",
                    "data": {
                        "channel": `order_book_${pair}`
                    }
                }
            )) //send data to the server
        } catch (error) {
            console.log(error) // catch error
        }
    }

    set = (e) => {
        const format = e.target.value.replace('/','')
        this.setState({name: format.toLowerCase()})
        this.sendMessage(format.toLowerCase())
    }
    componentDidMount(){
       
    }
    
    render(){
        const {data} = this.props.data;
        return (
            <div className="header">
                <select onChange={this.set}>
                <option>Select Order Pair</option>
                {
                    data ?
                        data.map((data) =>
                        <option 
                            key={data.id}
                            value={data.id}
                        >
                            {data.name}
                        </option>
                    )
                    : <div>
                        No data Avaialable, Please Retry
                    </div>
                }
                </select>
                <div>Select Order Pair</div>
            </div>
        )
    }
}