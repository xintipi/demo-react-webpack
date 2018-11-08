import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Quote from '../components/Message/Quote';
import MessageForm from '../components/Message/MessageForm';
import StudentList from '../components/Message/StudentList';

class MessagePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            management_name: '',
            total_message_sent: '',
            sent_date: '',
            message: '',
        };
    }

    componentWillMount() {
        document.title = 'E2R Line Message';
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.studentItem) {
            this.setState({
                id: nextProps.studentItem.id,
                management_name: nextProps.studentItem.management_name,
                total_message_sent: nextProps.studentItem.total_students,
                sent_date: nextProps.studentItem.sent_date,
                message: nextProps.studentItem.message,
            });
        }
    }

    onReceiveIdWhenChecked = (id) => {
        let info = {length: this.props.students.length - id.length, id: id};
        localStorage.setItem('total-student', JSON.stringify(info));
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
                        <input type="hidden" name="user_ids" defaultValue="@%%user_ids@" />
                        <MessageForm
                            message={message}
                            totalMessage={total_message_sent}
                            totalStudentSent={total_student_sent}
                        />
                        <StudentList onReceiveIdWhenChecked={this.onReceiveIdWhenChecked}/>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        studentItem: state.studentItem,
        students: state.students
    }
};

export default connect(mapStateToProps, null)(MessagePage);