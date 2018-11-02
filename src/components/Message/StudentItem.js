import React, {Component, Fragment} from 'react';

window.tmp = [];

class StudentItem extends Component {
    constructor(props) {
        super(props);
    }

    onChange = (event) => {
        let checked = event.target.value;
        if (event.target.checked) {
            tmp.push(checked);
        } else {
            tmp.splice($.inArray(checked, tmp), 1);
        }
        this.props.onGetId(tmp);
    };

    render() {
        const {student, index} = this.props;
        const formatDate = student.sent_date.replace(/-/g, '/');
        return (
            <Fragment>
                <tr className="seminar">
                    <td>{index + 1}</td>
                    <td>
                        <input
                            type="checkbox"
                            name='line_messages[]'
                            value={student.id}
                            onChange={this.onChange}
                        />
                    </td>
                    <td>{formatDate}</td>
                    <td>{student.management_name}</td>
                    <td/>
                </tr>
            </Fragment>
        );
    }
}

export default StudentItem;
