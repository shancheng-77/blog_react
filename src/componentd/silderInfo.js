import React, {Component} from 'react';
import  {withRouter} from 'react-router-dom'
import { Menu } from 'antd';
import imgURL from '../static/logo192.png'
import imgURL1 from  '../static/1.jpg'
import {connect} from 'react-redux'
import Pubsub from 'pubsub-js'
import axios from "axios";
const { SubMenu } = Menu;
class SilderInfo extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            tagList: [],
            // tagType:this.props.sideType
        }
        // // 接收广播方法
        // Pubsub.unsubscribe('side')
        // // 接受广播时间并更改数据
        // Pubsub.subscribe('side',(msg,data) => {
        //     this.setState({
        //         tagType:data
        //     })
        //     this.getTagList()
        //     console.log(this.state.tagType)
        // })
    }
    // 组件渲染完成后获取数据
    componentDidMount() {
        console.log(this.props)
        this.getTagList(this.props.sideType);
    }
    // props更改后执行
    componentDidUpdate(prevProps) {
        // 典型用法（不要忘记比较 props）：
        if (this.props.sideType !== prevProps.sideType) {
            this.getTagList(this.props.sideType);
        }
    }
    //获取数据函数
    getTagList =(type)=> {
        console.log(this.props)
        axios.get('/tags',{
            params:{
                type
            }
        }).then(res => {
            console.log(res)
            this.setState({
                tagList:[...res.data]
            })
        })
    }
    // 定义广播的方法
    pubsub=(title)=>{
        Pubsub.publish("evt",title)
        this.props.sendsAction('link_change',title)
           if(['gongju','jiaocheng','zliao','jsBook'].includes(title)){
               this.props.history.push('/main/materials?type='+title)
           }else if(['github','gitee'].includes(title)){
               this.props.history.push('/main/project?type='+title)
           }else {
               this.props.history.push('/main/classification?type='+title)
           }
    }
    render() {
        return (
            // 此处为不舍得删的旧案
            // <div style={{display:'flex',justifyContent:'center'}}>
            //     {(this.props.type === 'main')?(
            //         <div>
            //             <img src={imgURL} alt='头像' style={{marginTop:50}}/>
            //             <div style={{width:192,height:200,border:'1px solid rgb(238, 238, 238)',marginTop:30}}>
            //                 <p>此处应该有许多的描述信息以及奇奇怪怪的东西</p>
            //             </div>
            //             <div style={{margin:'5px'}}>
            //                 <p>联系方式：110</p>
            //                 <p>qq:12345678901</p>
            //             </div>
            //             <div style={{fontSize:30,display:'flex',justifyContent:'space-between',padding:'0 15px',margin:'10px 0'}}>
            //                 <IconFont type='iconweixin'/>
            //                 <IconFont type='icongithub'/>
            //                 <IconFont type='iconqq'/>
            //             </div>
            //         </div>
            //     ):(
            //         <div >
            //             <img src={imgURL} alt='头像' style={{marginTop:80}}/>
            //             <p style={{textAlign:'center',fontSize:30,fontWeight:600}}>分类</p>
            //             <Menu style={{ width: 200,border:0 }} mode="vertical">
            //                 {
            //                     this.state.tagList.map((value)=>{
            //                         return(
            //                            <SubMenu key={value.key} title={value.title}>
            //                                {value.children.map((v)=> {
            //                                    return (
            //                                        //点击之后发送广播到content组件重新加载
            //                                        <Menu.Item key={v.key} onClick={this.pubsub.bind(this,v.key)}>
            //                                            {v.title}
            //                                        </Menu.Item>
            //                                    )
            //                                })}
            //                            </SubMenu>
            //                         )
            //                     })
            //                 }
            //             </Menu>
            //         </div>
            //     )}
            // </div>
            <div style={{display:'flex',justifyContent:'center',alignItems:"center"}}>
                {this.state.tagList.length !== 0?
                    <div>
                        <img src={imgURL} alt='头像' style={{marginTop:80}}/>
                        <p style={{textAlign:'center',fontSize:30,fontWeight:600}}>分类</p>
                        <Menu style={{ width: 200,border:0 }} mode="vertical">
                            {
                                this.state.tagList.map((value)=>{
                                    return(
                                        <SubMenu key={value.key} title={value.title}>
                                            {value.children?(value.children.map((v)=> {
                                                return (
                                                    //点击之后发送广播到content组件重新加载
                                                    <Menu.Item key={v.key} onClick={this.pubsub.bind(this,v.key)}>
                                                        {v.title}
                                                    </Menu.Item>
                                                )
                                            })):''}
                                        </SubMenu>
                                    )
                                })
                            }
                        </Menu>
                    </div>:
                    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                        <img src={imgURL1} alt='向日葵' style={{marginTop:120,width:'80%'}}/>
                        <p style={{textAlign:'center',marginTop:20}}>春暖花开，面朝大海——海子</p>
                    </div>
                }
            </div>

        );
    }
}
const mapStateToProps = (state,ownProps) => {
    return state
}
const  mapDispatchToProps = (dispatch)=>{
    return {
        sendsAction:(type,msg)=>{
            dispatch({
                type,
                msg
            })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(SilderInfo));
