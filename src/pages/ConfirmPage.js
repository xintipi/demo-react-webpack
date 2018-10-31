import React, {Component, Fragment} from 'react';
import PreviewMessage from './../modules/ConfirmComponents/PreviewMessage';
import SenderList from './../modules/ConfirmComponents/SenderList';

class ConfirmPage extends Component{
    render () {
        let preview = JSON.parse(localStorage.getItem('task'));
        return (
            <Fragment>
                <h2>LINEメッセージ送信：確認画面</h2>
                <div className="row">
                    <div id="confirm_detail">
                        <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10">
                            <PreviewMessage preview={preview}/>
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

export default ConfirmPage;