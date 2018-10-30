import React, {Component} from 'react';

class MessageForm extends Component {
    render() {
        const {message} = this.props;
        return (
            <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10">
                <div className="form-group row">
                    <label className="col-md-1 col-form-label col-form-label-lg">管理名</label>
                    <div className="col-md-11">
                        <input type="text" className="form-control form-control-sm" id="colFormLabelSm" name="line_message[management_name]" />
                        <p className="error name-error" style={{display: 'none'}}>【管理名は必須です。】</p>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6" style={{marginTop: 1}}>
                        <div className="left-border">
                            <h4>メッセージ入力</h4>
                            <textarea
                                maxLength={2000}
                                className="inner none-background-inner"
                                name="line_message[message]"
                                value={message}
                            />
                        </div>
                        <p className="error message-error" style={{display: 'none'}}>【メッセージ内容は必須です。】</p>
                        <div className="text-number">
                            <span className="txt">文字数</span>
                            <span className="dot">:</span>
                            <span className="number">000</span>
                        </div>
                        <div className="text-replace row">
                            <label className="col-md-4 col-lg-4 col-sm-4 col-xs-4 col-form-label col-form-label-lg replace">置換ワード入力</label>
                            <div className="col-md-8 col-lg-8 col-sm-8 col-xs-8 replace form-quoted">
                                <select className="form-control word-input">
                                    <option value />
                                    <option value="@##user_id@">@##user_id@</option>
                                    <option value="@##lastname@">@##lastname@</option>
                                    <option value="@##name@">@##name@</option>
                                    <option value="@##school@">@##school@</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="right-border">
                            <h4>プレビュー</h4>
                            <div className="chat-speech">
                                <div className="chat-speech-content">
                                    <div className="inner preview-message" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MessageForm;
