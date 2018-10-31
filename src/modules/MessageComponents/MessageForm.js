import React, {Component} from 'react';

class MessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            management_name: '',
            message: '',
            total_message_sent: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.message) {
            $('.none-background-inner').val(nextProps.message);
            $('.preview-message').html(`<p>${nextProps.message}</p>`);
            $('.text-number .number').text(nextProps.message.length);
            this.setState({
                message: nextProps.message,
                total_message_sent: nextProps.totalMessage
            })
        } else {
            $('.none-background-inner').val('');
            $('.preview-message').html('');
            $('.text-number .number').text('000');
        }
    }

    onHandleKeyUp = (e) => {
        $('.none-background-inner').val(e.target.value);
        $('.preview-message').html(`<p>${e.target.value}</p>`);
        $('.text-number .number').text(e.target.value.length);
        this.onAddMessageWithNewline();
        this.setState({message: e.target.value})
    };

    onHandleChangeOption = (e) => {
        const backgroundInner = $('.none-background-inner');
        const previewMessage = $('.preview-message');
        const textNumber =  $('.text-number .number');
        if (e.target.value) {

            const start = backgroundInner.prop('selectionStart');
            const end = backgroundInner.prop('selectionEnd');
            const text = backgroundInner.val();
            const before = text.substring(0, start);
            const after = text.substring(end, text.length);

            backgroundInner.val(before + e.target.value + after);
            previewMessage.html(`<p>${before + e.target.value + after}</p>`);
            this.onAddMessageWithNewline();
            backgroundInner[0].selectionStart = backgroundInner[0].selectionEnd = start + e.target.value.length;
            backgroundInner.focus();
            textNumber.text(before.length + e.target.value.length + after.length);

            this.setState({message: before + e.target.value + after})
        }
    };

    onAddMessageWithNewline = () => {
        const backgroundInner = $('.none-background-inner');
        const text = backgroundInner.val();
        const match = /\n/.exec(text);
        if (match) {
            // Check if exist new line when compose message
            const arrayText = backgroundInner.val().split('\n');
            $('.preview-message p:first').remove();
            arrayText.forEach((value) => {
                $('.preview-message').append(`<p>${value}</p>`);
            });
        }
    };

    onChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        });
    };

    render() {
        localStorage.setItem('task', JSON.stringify(this.state));
        return (
            <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10">
                <div className="form-group row">
                    <label
                        className="col-md-1 col-form-label col-form-label-lg">管理名</label>
                    <div className="col-md-11">
                        <input type="text"
                               className="form-control form-control-sm"
                               id="colFormLabelSm"
                               name="management_name"
                               onChange={this.onChange}
                        />
                        <p className="error name-error"
                           style={{display: 'none'}}>【管理名は必須です。】</p>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6" style={{marginTop: 1}}>
                        <div className="left-border">
                            <h4>メッセージ入力</h4>
                            <textarea
                                maxLength={2000}
                                className="inner none-background-inner"
                                name="message"
                                onChange={this.onChange}
                                onKeyUp={this.onHandleKeyUp}
                            />
                        </div>
                        <p className="error message-error"
                           style={{display: 'none'}}>【メッセージ内容は必須です。】</p>
                        <div className="text-number">
                            <span className="txt">文字数</span>
                            <span className="dot">:</span>
                            <span className="number">000</span>
                        </div>
                        <div className="text-replace row">
                            <label
                                className="col-md-4 col-lg-4 col-sm-4 col-xs-4 col-form-label col-form-label-lg replace">置換ワード入力</label>
                            <div
                                className="col-md-8 col-lg-8 col-sm-8 col-xs-8 replace form-quoted">
                                <select className="form-control word-input"
                                        onChange={this.onHandleChangeOption}>
                                    <option value/>
                                    <option value="@##user_id@">@##user_id@
                                    </option>
                                    <option value="@##lastname@">@##lastname@
                                    </option>
                                    <option value="@##name@">@##name@</option>
                                    <option value="@##school@">@##school@
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="right-border">
                            <h4>プレビュー</h4>
                            <div className="chat-speech">
                                <div className="chat-speech-content">
                                    <div className="inner preview-message"/>
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
