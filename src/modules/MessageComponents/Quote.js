import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

class Quote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slName: ''
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
        this.setState({
            [name]: value
        })
    };

    onApplyQuote = (students) => {
        this.props.onReceiveStudent(this.state, students);
    };

    render() {
        const {students} = this.props;
        return (
            <form>
                <div className="form-group row">
                    <label id="quoted"
                           className="col-md-2 col-form-label col-form-label-lg form-quoted">送信履歴から引用</label>
                    <div className="col-md-6 form-quoted">
                        <select
                            className="form-control message-quote"
                            name="slName"
                            onChange={this.onChange}
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
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        students: state.students,
    };
};

export default connect(mapStateToProps, null)(Quote);
