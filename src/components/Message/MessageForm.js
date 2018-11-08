import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import Parser from 'html-react-parser';

class MessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            management_name: '',
            message: '',
            preview_message: '',
            total_message_sent: '',
            alternation_name: '',
            string_number: 0
        };
    }

    componentWillMount() {
        if (JSON.parse(sessionStorage.getItem('old-data'))) {
            this.setState({
                management_name: JSON.parse(sessionStorage.getItem('old-data')).management_name,
                message: JSON.parse(sessionStorage.getItem('old-data')).message,
                preview_message: JSON.parse(sessionStorage.getItem('old-data')).preview_message,
                total_message_sent: JSON.parse(sessionStorage.getItem('old-data')).total_message_sent,
                alternation_name: JSON.parse(sessionStorage.getItem('old-data')).alternation_name,
                string_number: JSON.parse(sessionStorage.getItem('old-data')).string_number
            })
        }
    }

    componentDidMount() {
        this.node = ReactDOM.findDOMNode(this);
        this.message = this.node.querySelector('.none-background-inner');
        this.child = this.node.querySelector('.preview-message');
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.message) {
            ReactDOM.render(Parser(`<p>${nextProps.message}</p>`), this.child);
            this.onAddMessageWithNewline(nextProps.message);
            this.setState({
                message: nextProps.message,
                preview_message: `<p>${nextProps.message}</p>`,
                string_number: nextProps.message.length,
            });
        }
    }

    onHandleKeyUp = (e) => {
        // Get child nodes
        ReactDOM.render(Parser(`<p>${e.target.value}</p>`), this.child);
        this.onAddMessageWithNewline(e.target.value);
        this.setState({
            message: e.target.value,
            preview_message: `<p>${e.target.value}</p>`,
            string_number: e.target.value.length,
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
                alternation_name: e.target.value,
                string_number: before.length + e.target.value.length + after.length
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

    onHandleName = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        });
    };

    render() {
        sessionStorage.setItem('data', JSON.stringify(this.state));
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
                               onChange={this.onHandleName}
                               value={this.state.management_name}
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
                                onChange={this.onHandleName}
                                onInput={this.onHandleKeyUp}
                                value={this.state.message}
                            />
                        </div>
                        <p className="error message-error"
                           style={{display: 'none'}}>【メッセージ内容は必須です。】</p>
                        <div className="text-number">
                            <span className="txt">文字数</span>
                            <span className="dot">:</span>
                            <span className="number">{this.state.string_number}</span>
                        </div>
                        <div className="text-replace row">
                            <label className="col-md-4 col-lg-4 col-sm-4 col-xs-4 col-form-label col-form-label-lg replace">置換ワード入力</label>
                            <div
                                className="col-md-8 col-lg-8 col-sm-8 col-xs-8 replace form-quoted">
                                <select className="form-control word-input"
                                        name="alternation_name"
                                        onChange={this.onHandleChangeOption}
                                        value={this.state.alternation_name}
                                >
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
                                    <div
                                        className="inner preview-message"
                                        dangerouslySetInnerHTML={{ __html: sessionStorage.getItem('old-preview-message') ? JSON.parse(sessionStorage.getItem('old-preview-message')) : '' }}>
                                    </div>
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
