import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Parser from 'html-react-parser';

class MessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            management_name: '',
            message: '',
            previewMessage: '',
            total_message_sent: '',
            stringNumber: 0,
            sltOptionName: ''
        };
    }

    componentDidMount() {
        this.node = ReactDOM.findDOMNode(this);
        this.message = this.node.querySelector('.none-background-inner');
        this.child = this.node.querySelector('.preview-message');
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.message && nextProps.totalMessage) {
            ReactDOM.render(Parser(`<p>${nextProps.message}</p>`), this.child);
            this.setState({
                message: nextProps.message,
                total_message_sent: nextProps.totalMessage,
                stringNumber: nextProps.message.length,
            });
        } else {
            this.setState({
                message: '',
                stringNumber: '000',
            });
            ReactDOM.render('', this.child);
        }
    }

    onHandleKeyUp = (e) => {
        // Get child nodes
        ReactDOM.render(Parser(`<p>${e.target.value}</p>`), this.child);
        this.onAddMessageWithNewline(e.target.value);
        this.setState({
            message: e.target.value,
            previewMessage: `<p>${e.target.value}</p>`,
            stringNumber: e.target.value.length,
        });
        localStorage.setItem('task', JSON.stringify(this.state));
    };

    onHandleChangeOption = (e) => {
        const backgroundInner = this.node.getElementsByClassName('none-background-inner')[0];
        if (e.target.value) {
            const start = backgroundInner.selectionStart;
            const end = backgroundInner.selectionEnd;
            const text = backgroundInner.defaultValue;
            const before = text.substring(0, start);
            const after = text.substring(end, text.length);

            ReactDOM.render(Parser(`<p>${before + e.target.value + after}</p>`), this.child);
            this.onAddMessageWithNewline(before + e.target.value + after);

            backgroundInner.selectionStart = backgroundInner.selectionEnd = start + e.target.value.length;
            backgroundInner.focus();

            this.setState({
                message: before + e.target.value + after,
                stringNumber: before.length + e.target.value.length + after.length,
                sltOptionName: e.target.value
            });

            localStorage.setItem('task', JSON.stringify({
                ...this.state,
                message: before + e.target.value + after,
                previewMessage: `<p>${before + e.target.value + after}</p>`,
                stringNumber: before.length + e.target.value.length + after.length,
                sltOptionName: e.target.value
            }));

        }
    };

    onAddMessageWithNewline = (txtMessage) => {
        const match = /\n/.exec(txtMessage);
        const arrayParagraph = [];
        if (match) {
            const arrayText = txtMessage.split('\n');
            arrayText.forEach((value, index) => {
                let temp = (<p key={index}>{value}</p>);
                arrayParagraph.push(temp);
            });
            ReactDOM.render(arrayParagraph, this.child);
        }
    };

    onChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value,
        });
        localStorage.setItem('task', JSON.stringify(this.state));
    };

    render() {
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
                            <span
                                className="number">{this.state.stringNumber}</span>
                        </div>
                        <div className="text-replace row">
                            <label
                                className="col-md-4 col-lg-4 col-sm-4 col-xs-4 col-form-label col-form-label-lg replace">置換ワード入力</label>
                            <div
                                className="col-md-8 col-lg-8 col-sm-8 col-xs-8 replace form-quoted">
                                <select className="form-control word-input"
                                        name="sltOptionName"
                                        onChange={this.onHandleChangeOption}>
                                    <option value=""/>
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
