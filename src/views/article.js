import React, {Component} from 'react';
import {Card, BackTop} from 'antd';
// import {artInfo} from '../info/article.js'
import {tags} from "../info/tag";
import './css/article.css'
import {createFromIconfontCN} from "@ant-design/icons";
import axios from "axios";
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2463236_whv0btsk0la.js',
});
class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'erer',
            // 文章信息
            list:[],
            tagList:[]
        }

    }
    // 页面渲染完成后进行初始化
    componentDidMount(){
        this.initialization()
    }
    // 进行数据的初始化，应该使用请求
    initialization=() =>{
       axios.get('/article').then(response => {
           console.log(response.data)
           this.setState({
               list:[...response.data],
               tagList:[...tags]
           })
       })

    }
    render() {
        return (
            <div className='box' >
                <div className='leftBox'>
                    {this.state.list.map((value) => {
                        return (
                            <Card title={value.title} bordered className='card' key={value.id} hoverable onClick={(p)=>this.props.history.push('/main/articles/'+value.id)}>
                                <p style={{height:'60px'}}>{value.description}</p>
                                <div className='cardBottom'>
                                    <p style={{display:'float',float:'right'}}>{value.createTime}</p>
                                </div>
                            </Card>
                        )
                    })}
                </div>
                <div className='rightBox'>
                    <div>
                        <div style={{width:192,height:200,border:'1px solid rgb(238, 238, 238)',marginTop:30}}>
                            <p>此处应该有许多的描述信息以及奇奇怪怪的东西</p>
                        </div>
                        <div style={{margin:'5px'}}>
                            <p>联系方式：110</p>
                            <p>qq:12345678901</p>
                        </div>
                        <div style={{fontSize:30,display:'flex',justifyContent:'space-between',padding:'0 15px',margin:'10px 0'}}>
                            <IconFont type='iconweixin'/>
                            <IconFont type='icongithub'/>
                            <IconFont type='iconqq'/>
                        </div>
                    </div>
                </div>
                <BackTop>
                    <div className='upStyle'>UP</div>
                </BackTop>
            </div>
        );
    }
}

export default Article;
