import React, {Component} from 'react';
import { Card, Col, Row } from 'antd';
import {
    CloudDownloadOutlined,
    createFromIconfontCN,
    EllipsisOutlined,
    GithubOutlined,
    HeartOutlined,
} from '@ant-design/icons';
import axios from "axios";
import {connect} from 'react-redux'
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2235904_qnzuizwv51.js',
});
class Other extends Component {
    constructor(props) {
        super(props);
        this.state = {
            main:[],
            info:[]
        }
    }
    componentDidMount() {
        this.getInfo()
    }
    getInfo = () => {
        axios.get('/project').then(res => {
            console.log(res.data.Info)
            this.setState({
                info:res.data.Info,
                main:res.data.Info,
            })
        })
    }
    componentDidUpdate(prevProps: Readonly<P>) {
        console.log('1')
        if (this.props.linkType !== prevProps.linkType) {
            console.log(this.props.linkType)
            this.setState({
                info:this.state.main.filter(v => v.type === this.props.linkType)
            })
        }
    }
    render() {
        return (
            <div  className="site-card-wrapper" style={{padding:20}}>
                <Row gutter={16}  wrap={true}>
                    {this.state.info.map((v,i) => {
                       return (
                           <Col span={8} style={{minWidth:300,marginBottom:20}} key={v.link}>
                               <Card title={<a href={v.link} target={'_blank'}>v.title</a>}
                                     hoverable
                                     extra={v.type === 'github'?<GithubOutlined />:<IconFont type={'icon-gitee2'}/>}
                                     actions={[
                                         <HeartOutlined />,
                                         <CloudDownloadOutlined />,
                                         <EllipsisOutlined key="ellipsis" />,
                                     ]}
                               >
                                   {v.content}
                               </Card>
                           </Col>
                       )
                    })}
                </Row>
            </div>
        );
    }
}
const mapStateToProps = (state,ownProps) => {
    return state
}
export default connect(mapStateToProps)( Other);
