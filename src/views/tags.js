import React, {Component} from 'react';
// import {artInfo} from '../info/article.js'
import {BackTop, Card} from "antd";
import './css/article.css'
import axios from "axios";
class Tags extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type:'',
            list:[]
        }

    }
    componentDidMount() {
       this.getCardList()
    }
    // 监听某个值得改变去渲染
    getCardList(){
        let arr = this.props.history.location.search.split('=')
        console.log(arr[arr.length-1])
        // 根据arr[arr.length-1]的值发送请求并赋值list
        axios.get('/classification',{
            params:{
                type:arr[arr.length-1]
            }
        }).then(req => {
            let aLink = [];
            // console.log(response.data)
            let s= setInterval(()=>{
                // console.log(1)
                if(req.data.length !== 0)  aLink.push(req.data.pop());
                else clearInterval(s)
                this.setState({
                    list:aLink
                })
            },200)
            // this.setState({
            //     list:[...req.data]
            //
            // })
            }
        )

    }
    render() {
        return (
            <div>
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
                <BackTop>
                    <div className='upStyle'>UP</div>
                </BackTop>
            </div>
        );
    }
}

export default Tags;
