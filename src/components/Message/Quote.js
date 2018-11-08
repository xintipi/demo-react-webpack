import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import * as action from './../../actions/index';

class Quote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slName: ''
        }
    }

    componentWillMount() {
        if (sessionStorage.getItem('old-sl-name')) {
            this.setState({slName: sessionStorage.getItem('old-sl-name')})
        }
    }

    showOption = (students) => {
        let result = null;
        let newFormatDate = null;
        if (students.length > 0) {
            let newStudentList = _.orderBy(students, ['sent_date'], ['desc']);
            result = newStudentList.map((student, index) => {
                newFormatDate = student.sent_date.replace(/-/g, '/');
                return (
                    <option key={index}
                            value={`${newFormatDate} [${student.management_name}]`}>
                        {`${newFormatDate} [${student.management_name}]`}
                    </option>
                );
            });
        }
        return result;
    };

    onChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        sessionStorage.setItem('sl-name', target.value);
        this.setState({
            [name]: value
        });
    };

    onApplyQuote = (students) => {
        let splitName = this.state.slName ? this.state.slName.split(' ')[1].replace(/[\[\]']+/g, '') : '';
        let index = _.findIndex(students, (student) => { return student.management_name === splitName; });
        this.props.applyQuote(students[index]);
    };

    render() {
        const {students} = this.props;
        return (
            <Fragment>
                <div className="form-group row">
                    <label id="quoted"
                           className="col-md-2 col-form-label col-form-label-lg form-quoted">送信履歴から引用</label>
                    <div className="col-md-6 form-quoted">
                        <select
                            className="form-control message-quote"
                            name="slName"
                            onChange={this.onChange}
                            value={this.state.slName}
                        >
                            <option value=""/>
                            {this.showOption(students)}
                        </select>
                    </div>
                    <div className="col-md-4 form-quoted">
                        <button
                            type="button"
                            className="btn btn-primary downloadcsv"
                            onClick={() => {this.onApplyQuote(students)}}
                        >引用
                        </button>
                    </div>
                </div>
            </Fragment>
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
        applyQuote: (student) => {
            dispatch(action.actApplyQuote(student))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Quote);
