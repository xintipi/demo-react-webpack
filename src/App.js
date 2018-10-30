import React, {Component} from 'react';
import _ from 'lodash';
import './App.css';
import Quote from './modules/MessageComponents/Quote';
import MessageForm from './modules/MessageComponents/MessageForm';
import StudentList from './modules/MessageComponents/StudentList';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            management_name: '',
            total_message_sent: '',
            sent_date: '',
            message: '',
        }
    }

    onReceiveStudent = (name, students) => {
        let splitName = name.slName.split(' ')[1].split('[').join('').split(']').join('');
        let index = _.findIndex(students, function(student) { return student.management_name === splitName; });
        this.setState({
            id: _.values(students[index])[0],
            management_name: _.values(students[index])[1],
            total_message_sent: _.values(students[index])[2],
            sent_date: _.values(students[index])[3],
            message: _.values(students[index])[4]
        })
    };

    render() {
        let {message, total_message_sent} = this.state;
        return (
            <div className="main">
                <h2>LINEメッセージ送信：入力画面</h2>
                <div className="row">
                    <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10">
                        <Quote onReceiveStudent={this.onReceiveStudent}/>
                    </div>
                    {/* Form to send data from message.html page to confirmation.html page */}
                    <div id="frm_details">
                        <input type="hidden" name="user_ids" defaultValue="@%%user_ids@" />
                        <MessageForm message={message} totalMessage={total_message_sent}/>
                        <StudentList />
                    </div>
                    {/* End form to send data from message.html page to confirmation.html page */}
                </div>
            </div>
        );
    }
}

export default App;
