import React, {Component} from 'react';
import { Layout,Menu } from 'antd';
import {Route, Switch, withRouter} from 'react-router-dom'
import {mainRouter} from "../routes";
import Pubsub from 'pubsub-js'
import { createFromIconfontCN } from '@ant-design/icons';
import SilderInfo from "./silderInfo";
import  {connect} from 'react-redux';
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2463236_whv0btsk0la.js',
});
const { Header, Footer, Sider, Content} = Layout;
const routers = mainRouter.filter(value => value.isShow)
class Main extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    tabChange =()=>{
        console.log(this.props)
        this.props.history.listen(location => {
            // 最新路由的 location 对象，可以通过比较 pathname 是否相同来判断路由的变化情况
            if (this.props.location.pathname !== location.pathname) {
                // 路由发生了变化
                let arr = this.props.history.location.pathname.split('/')
                // 修改tab选中状态以及路由跳转
                this.setState({ current: arr[arr.length-1] });
            }
        })
        // console.log(this.state.current)
    }
    handleClick = (route) => {
        // 修改侧边栏属性
        this.props.sendAction('side_change',route.key)
        sessionStorage.setItem('sideType',route.key)
        // 路由跳转
        this.props.history.push(route.path)
    }
    // 组件创建后执行
    componentDidMount() {
        this.tabChange()
    }

    render() {
        return (
            <Layout className="layout">
                <Sider className='sider' width='250px'>
                    <SilderInfo />
                </Sider>
                <Layout >
                    <Header className='header'>
                        <Menu  mode="horizontal"  selectedKeys={[this.props.sideType]} >
                            {/*循环生成菜单*/}
                            {/*p => this.props.history.push(route.path)*/}
                            {/**/}
                            {
                                routers.map(route => {
                                    return (
                                        <Menu.Item key={route.key} onClick={()=>this.handleClick(route)}>
                                            <IconFont type={route.icon?route.icon:" "}/>
                                            {route.name}
                                        </Menu.Item>
                                    )
                                })
                            }
                        </Menu>
                    </Header>
                    <Content style={{backgroundColor:'#fff',minHeight:'800'}}>
                        <Switch>
                            {mainRouter.map((route,i)=> {
                                return <Route key={i} path={route.path} exact={route.exact} render={routeProps => {
                                    return(
                                        <route.component key={i} {...routeProps}/>
                                    )
                                }
                                }/>
                            })}
                        </Switch>
                    </Content>
                    <Footer className='footer'>Footer</Footer>
                </Layout>
            </Layout>
        );
    }
}
const  mapDispatchToProps = (dispatch)=>{
    return {
        sendAction:(type,msg)=>{
            dispatch({
                type,
                msg
            })
        }
    }
}
const mapStateToProps = (state,ownProps) => {
    return state
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Main));
