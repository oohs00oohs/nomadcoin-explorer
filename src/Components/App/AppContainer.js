import React, { Component } from "react";
import { createGlobalStyle  } from "styled-components";
import AppPresenter from './AppPresenter';
import reset from "styled-reset";
import typography from "../../typography";
import flatten from "lodash.flatten";
import axios from "axios";
import {API_URL} from "../../constants";

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
        })
    }
}

export default App;