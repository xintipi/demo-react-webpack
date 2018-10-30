import React, {Component, Fragment} from 'react';

class StudentItem extends Component {
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
