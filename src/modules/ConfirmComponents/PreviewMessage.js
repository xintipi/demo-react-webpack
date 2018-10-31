import React, {Component, Fragment} from 'react';

class PreviewMessage extends Component {

    render() {
        let {preview} = this.props;
        console.log(preview);
        return (
            <Fragment>
                <div className="form-group row management-name management">
                    <label className="col-md-1 col-form-label col-form-label-lg">管理名</label>
                    <div className="col-md-11" style={{paddingRight: 0}}>
                        <input type="text" className="form-control form-control-sm" id="name-manage" value={preview.management_name} readOnly />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <div className="border left-border">
                            <h4>メッセージ内容</h4>
                            <textarea className="inner check-inner" readOnly value={preview.message} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="border right-border">
                            <h4>プレビュー</h4>
                            <div className="chat-speech">
                                <div className="chat-speech-content preview-content" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cumulative">
                    <div className="number-target target-confirm">
                        <span className="txt">対象者数</span>
                        <span className="num">000人</span>
                    </div>
                    <div className="number-transmissions transmissions-confirm">
                        <span className="txt">累計送信数</span>
                        <span className="num">{preview.total_message_sent ? preview.total_message_sent : '0000'}/5000</span>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default PreviewMessage;