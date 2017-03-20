import React from 'react';
import ReactDOM from 'react-dom';
import {DatePicker, message} from 'antd';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: ""
        }
    }

    handleChange(date) {
        message.info("您选择的日期是" + date.toString());
        this.setState({date: date.toString()})
    }

    render() {
        return (
            <div style={{width: 200, height: 200, margin: '100px auto'}}>
                <DatePicker onChange={value => this.handleChange(value)}/>
                <div>
                    <p>当期日期是: {this.state.date}</p>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);