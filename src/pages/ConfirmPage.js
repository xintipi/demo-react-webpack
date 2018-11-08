import React, {Component, Fragment} from 'react';
import PreviewMessage from '../components/Confirm/PreviewMessage';
import SenderList from '../components/Confirm/SenderList';
import {connect} from 'react-redux';

class ConfirmPage extends Component{

    componentWillMount() {
        document.title = 'E2R Line Confirmation';
    }

    render () {
        // let {studentItem} = this.props; // neu dung props khi f5 lai thi se mat du lieu hien tai
        let studentItem = JSON.parse(localStorage.getItem('data'));
        let totalStudentSent = localStorage.getItem('total-student');
        let previewMessage = localStorage.getItem('preview-message');
        return (
            <Fragment>
                <h2>LINEメッセージ送信：確認画面</h2>
                <div className="row">
                    <div id="confirm_detail">
                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                            <PreviewMessage
                                preview={studentItem}
                                totalStudentSent={totalStudentSent}
                                previewMessage={previewMessage}
                            />
                        </div>
                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                            <SenderList />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        students: state.students,
        studentItem: state.studentItem
    };
};

export default connect(mapStateToProps, null)(ConfirmPage);