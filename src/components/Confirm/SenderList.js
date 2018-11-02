import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class SenderList extends Component {
    render() {
        return (
            <div className="table-content">
                <p>送信者名簿</p>
                <p className="error table-error" style={{display: 'none'}}>【該当するデータがありません。】</p>
                <div className="main-box">
                    <table className="table table-striped console-table list-student-message">
                        <tbody>
                        <tr className="thead">
                            <th>ID</th>
                            <th>姓名</th>
                            <th>学校名</th>
                            <th>学部</th>
                            <th>学科</th>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <nav aria-label className="set-pagination">
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                            <div className="btn-option">
                                <Link to="/"><input type="button" className="btn btn-default previous-lm" defaultValue="戻る" /></Link>
                                <input type="button" className="btn btn-primary send-lm" defaultValue="送信" />
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default SenderList;