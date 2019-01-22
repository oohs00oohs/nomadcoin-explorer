import React, { Component } from "react";
import { createGlobalStyle  } from "styled-components";
import AppPresenter from './AppPresenter';
import reset from "styled-reset";
import typography from "../../typography";
import flatten from "lodash.flatten";
import axios from "axios";
import {API_URL, WS_URL} from "../../constants";
import {parseMessage} from "../../utils";

const baseStyles = () => createGlobalStyle`
    ${reset};
    ${typography};
    a{
        text-decoration:none!important;
    }
`;

class App extends Component {
    state = {
        isLoading : true
    };

    componentDidMount = () => {
        this._getData();
        this._connectToWs();
    }

    render() {
        baseStyles();
        return <AppPresenter {...this.state}/>;
    }

    _getData = async() => {
        const request = await axios.get(`${API_URL}/blocks`);
        const blocks = request.data;
        const reversedBlocks = blocks.reverse();
        const txs = flatten(blocks.map(block => block.data));
        this.setState({
            blocks : reversedBlocks,
            transactions : txs,
            isLoading : false
        });
    }

    _connectToWs = () => {
        const ws = new WebSocket(WS_URL);
        ws.addEventListener("message", message => {
            const parsedMessage = parseMessage(message);
            if(parsedMessage !== null && parsedMessage !== undefined){
                this.setState(prevState => {
                    return{
                        ...prevState,
                        blocks: [...parsedMessage, ...prevState.blocks],
                        transactions : [...parsedMessage[0].data, ...prevState.transactions]
                    }
                })
            }
        })
    }
}

export default App;