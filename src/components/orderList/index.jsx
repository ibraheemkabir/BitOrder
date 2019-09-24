import React,{Component} from 'react';
import './list.scss';

export class Orderlist extends Component {
    render(){
        const {data} = this.props.data;
        
        return (
            <div className="">
                 <div className="table">
                    <div className="row-header">
                        ASKS
                    </div>
                    <div className="row-header">
                        BIDS
                    </div>
            </div>
            {
                data && data.asks?
                data.asks.map(Element=> 
                <div className="table">
                    <div className="row">
                        {Element}
                    </div>
                    <div className="row">
                        {Element}
                    </div>
                </div>
                )
                : <div class="no-data">
                        No Order data Avaialable
                    </div>
            }
            </div>
        )
    }
}