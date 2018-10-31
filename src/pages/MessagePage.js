import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Quote from '../modules/MessageComponents/Quote';
import MessageForm from '../modules/MessageComponents/MessageForm';
import StudentList from '../modules/MessageComponents/StudentList';

class MessagePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            management_name: '',
            total_message_sent: '',
            total_student_sent: '',
            sent_date: '',
            message: '',
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.studentItem) {
            this.setState({
                id: nextProps.studentItem.id,
                management_name: nextProps.studentItem.management_name,
                total_message_sent: nextProps.studentItem.total_message_sent,
                sent_date: nextProps.studentItem.sent_date,
                message: nextProps.studentItem.message,
            })
        }
    }

    onReceiveIdWhenChecked = (id) => {
        this.setState({
            total_student_sent: id
        })
    };

    render () {
        let {message, total_message_sent, total_student_sent} = this.state;
        return (
            <Fragment>
                <h2>LINEメッセージ送信：入力画面</h2>
                <div className="row">
                    <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10">
                        <Quote />
                    </div>
                    {/* Form to send data from message.html page to confirmation.html page */}
                    <div id="frm_details">
                        <input type="hidden" name="user_ids" defaultValue="@%%user_ids@" />
                        <MessageForm message={message} totalMessage={total_message_sent} totalStudentSent={total_student_sent}/>
                        <StudentList onReceiveIdWhenChecked={this.onReceiveIdWhenChecked}/>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        studentItem: state.studentItem
    }
};

export default connect(mapStateToProps, null)(MessagePage);