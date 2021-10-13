import React, {Component} from 'react';
import { List } from 'antd';
import axios from "axios";
import {connect} from 'react-redux'
import Pubsub from "pubsub-js";
import './css/animation.css'
class Materials extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[{
                title:'redux中文文档',
                link:'',
                describe:'redux中文文档'
            }],
            type:''
        }
        // 接收广播方法
        Pubsub.unsubscribe('head_change')
        // 接受广播时间并更改数据
        Pubsub.subscribe('head_change',(msg,data) => {
            if (data === 'materials'){
                this.getData('all')
            }
        })
    }
    componentDidMount() {
        this.getData('all')
        // 监听路由的变化,如果路由发生变化则进行相应操作
    }

    componentDidUpdate(prevProps) {
        if (this.props.linkType !== prevProps.linkType) {
            this.getData(this.props.linkType);
        }
        // if(this.props.sideType !== prevProps.sideType) {
        //     console.log(1)
        // }
    }
    getData = (type) =>{
        axios.get('/links',{
            params:{
                type
            }
        }).then(res => {
            let aLink = []
            // if(res.data.length !== 0)  aLink.push(res.data.pop());
            // console.log(response.data)
            let s= setInterval(()=>{
                if(res.data.length !== 0)  aLink.push(res.data.pop());
                else {
                    clearInterval(s)
                }
                this.setState({
                    data:aLink
                })
            },300)
            // this.setState({
            //     data:res.data
            // })
        })
    }
    render() {
        return (
            <div style={{margin:20,minHeight:700}}>
                {/*{this.props.linkType}*/}
                <List style={{padding:0,border:'1px solid #eee',width:'80%',minWidth:600}}
                    itemLayout="horizontal"
                    dataSource={this.state.data}
                    locale='null'
                    renderItem={item => (
                        <List.Item className='item' style={{padding:20}}>
                            <List.Item.Meta
                                title={<a href={item.link} rel="noreferrer" target={'_blank'}>{item.title}</a>}
                                description={item.describe}
                            />
                        </List.Item>
                    )}
                />,
            </div>
        );
    }
}
const mapStateToProps = (state,ownProps) => {
    return state
}
export default connect(mapStateToProps)(Materials);
