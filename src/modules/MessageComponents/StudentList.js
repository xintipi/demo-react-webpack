import React, {Component} from 'react';
import StudentItem from './StudentItem';
import {connect} from 'react-redux';
import * as action from './../../actions/index';
import _ from 'lodash';

class StudentList extends Component {

    componentDidMount() {
        this.props.getAllStudents();
    };

    showStudents = (students) => {
        let result = null;
        if (students.length > 0) {
            let newStudentList = _.orderBy(students, ['sent_date'],['desc']);
            result = newStudentList.map((student, index) => {
                return (
                    <StudentItem
                        key={index}
                        student={student}
                        index={index}
                    />
                );
            });
        }
        return result;
    };

    closeWindow = () => {
        let win = window.open('location', '_self', '');
        win.close();
    };

    render() {
        let {students} = this.props;
        return (
            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                <div className="table-content">
                    <div id="loading" style={{display: 'none'}}>
                        <img id="loading-image" src="./../../loading.gif" alt="Loading..."/>
                    </div>
                    <p>送信済学生を除く</p>
                    <div className="main-box">
                        <table
                            className="table table-striped console-table list-student">
                            <tbody>
                            <tr className="thead">
                                <th>No</th>
                                <th>除外</th>
                                <th>送信日</th>
                                <th className="tac">管理名</th>
                                <th style={{width: 260}}/>
                            </tr>
                            {this.showStudents(students)}
                            </tbody>
                        </table>
                    </div>
                    <nav aria-label className="set-pagination">
                        <div className="row">
                            <div
                                className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                <div className="btn-option">
                                    <input type="button" className="btn btn-default cancel-page" defaultValue="キャンセル" onClick={this.closeWindow}/>
                                    <a href="/#"><input type="button" className="btn btn-primary next-page" defaultValue="次へ"/></a>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        students: state.students,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        getAllStudents: () => {
            dispatch(action.actFetchStudentsRequest());
            // luu du lieu tu API len store
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
