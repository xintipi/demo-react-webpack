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
            stringNumber: 0
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
            this.onAddMessageWithNewline(nextProps.message);
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
                stringNumber: before.length + e.target.value.length + after.length
            });
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
        let student = this.state;
        student[e.target.name] = e.target.value;
        this.setState({student})
    };

    render() {
        localStorage.setItem('data', JSON.stringify(this.state));
        return (
            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                <div className="form-group row">
                    <label
                        className="col-md-1 col-form-label col-form-label-lg">管理名<span style={{color: 'red'}}>※必須</span></label>
                    <div className="col-md-11">
                        <input type="text"
                               className="form-control form-control-sm"
                               id="colFormLabelSm"
                               name="management_name"
                               onChange={this.onChange}
                               ref="managementName"
                        />
                        <p className="error name-error"
                           style={{display: 'none'}}>【管理名は必須です。】</p>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6" style={{marginTop: 1}}>
                        <div className="left-border">
                            <h4>メッセージ入力<span style={{color: 'red'}}>※必須</span></h4>
                            <textarea
                                maxLength={2000}
                                className="inner none-background-inner"
                                name="message"
                                onChange={this.onChange}
                                onInput={this.onHandleKeyUp}
                                value={this.state.message}
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
                                    <option value="@##user_id@">ユーザID：@##user_id@</option>
                                    <option value="@##lastname@">氏名（姓）：@##lastname@</option>
                                    <option value="@##name@">氏名（姓・名）：@##name@</option>
                                    <option value="@##school@">学校：@##school@</option>
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
