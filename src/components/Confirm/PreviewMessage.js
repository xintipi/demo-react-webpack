import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Parse from 'html-react-parser';

class PreviewMessage extends Component {

    componentDidMount() {
        this.node = ReactDOM.findDOMNode(this);
        this.child = this.node.querySelector('.preview-content');
        ReactDOM.render(Parse(JSON.parse(this.props.previewMessage)), this.child);
    }

    render() {
        let {preview, totalStudentSent} = this.props;
        return (
            <div>
                <div className="form-group row management-name management">
                    <label className="col-md-1 col-form-label col-form-label-lg">管理名<span style={{color: 'red'}}>※必須</span></label>
                    <div className="col-md-11" style={{paddingRight: 0}}>
                        <input type="text" className="form-control form-control-sm" id="name-manage" value={preview.management_name} readOnly />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <div className="border left-border">
                            <h4>メッセージ内容<span style={{color: 'red'}}>※必須</span></h4>
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
                        <span className="num">{JSON.parse(totalStudentSent).length === 0 ? '000' : JSON.parse(totalStudentSent).length}人</span>
                    </div>
                    <div className="number-transmissions transmissions-confirm">
                        <span className="txt">月間累計送信数</span>
                        <span className="num">{preview.total_message_sent ? preview.total_message_sent : '0000'}/5000</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default PreviewMessage;