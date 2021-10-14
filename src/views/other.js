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
import Pubsub from "pubsub-js";
import './css/animation.css'
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2235904_qnzuizwv51.js',
});
class Other extends Component {
    constructor(props) {
        super(props);
        this.state = {
            github:[],
            gitee:[],
            main:[],
            info:[]
        }
        Pubsub.unsubscribe('head_change')
        // 接受广播时间并更改数据
        Pubsub.subscribe('head_change',(msg,data) => {
           if(data === 'project'){
               this.getInfo()
           }
        })
    }
    componentDidMount() {
        this.getInfo()
        // console.log(this.state.main)
    }
    getInfo = () => {
        axios.get('/project').then(res => {
            let data = [...res.data]
            this.setState({
               main:res.data
            })
            return data
            // console.log(res.data.Info)
            // this.setState({
            //     info:res.data.Info,
            //     main:res.data.Info,
            // })
        }).then((data) => {
            let aLink = [];
            // console.log(response.data)
            let s= setInterval(()=>{
                if(data.length !== 0)  aLink.push(data.pop());
                else {
                    clearInterval(s)
                }
                this.setState({
                    info:aLink
                })
            },300)
        })
    }
    componentDidUpdate(prevProps) {
        // console.log('1')
        if (this.props.linkType !== prevProps.linkType) {
            let data = this.state.main.filter(v => v.type === this.props.linkType)
            // console.log(this.state.main)
            let aLink = [];
            // console.log(response.data)
            let s= setInterval(()=>{
                if(data.length !== 0)  aLink.push(data.pop());
                else clearInterval(s)
                this.setState({
                    info:aLink
                })
            },300)
            // console.log(this.props.linkType)
            // this.setState({
            //     info:this.state.main.filter(v => v.type === this.props.linkType)
            // })
        }
    }
    render() {
        return (
            <div  className="site-card-wrapper" style={{padding:20,minHeight:600}}>
                <Row gutter={16}  wrap={true}>
                    {this.state.info.map((v,i) => {
                       return (
                           <Col span={8} style={{minWidth:300,marginBottom:20}} key={v.link} className='projectNode'>
                               <Card title={<a href={v.link} rel="noreferrer" target={'_blank'}>v.title</a>}
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
