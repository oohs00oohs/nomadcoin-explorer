import React, { Component } from "react";
import { createGlobalStyle  } from "styled-components";
import AppPresenter from './AppPresenter';
import reset from "styled-reset";
import typography from "../../typography";

const baseStyles = () => createGlobalStyle`
    ${reset};
    ${typography}
`;

class App extends Component {
    render() {
        baseStyles();
        return <AppPresenter/>;
    }
}

export default App;