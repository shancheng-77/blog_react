import React, {Component} from 'react';
import { withRouter} from 'react-router-dom'
// import ReactMarkdown from 'react-markdown/with-html'
// import zxMd from '../info/md/some.md'
// import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import './css/content.css'
import 'github-markdown-css'
import {Anchor, Spin} from 'antd';
import axios from "axios";
const { Link } = Anchor;
class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: Number.parseInt(this.props.match.params.id),
            str:'',
            tables:[],
            loading:true,
            delay:700,
        }
    }

    // 页面渲染完成后进行初始化
    componentDidMount(){
        // 读取markdown所用
        // fetch(zxMd)
        //     .then(res => res.text())
        //     .then(text => this.setState({ markdown: text }));
        this.getArticles()
    }
    getArticles(){
        axios.post('/articles',{
            id:this.state.id
        }).then(req => {
            var tables = []
            var arr=req.data
            // 将返回的html字符串中的h标签替换为带a标签
            var a= arr.replace(/<(h\d)[^>]*>.*?<\/h\d>/g, (match, tag) => {
                const hash = match.replace(/<.*?>/g, '')
                tables.push({ hash, tag })
                return `<a class="blog-content-anchor" href="#${hash}" id="${hash}">${match}</a>`
            })
            // console.log(req)
            // console.log(a)
            this.setState({
                str:a,
                // 由于技术原因，此处只能展示h3
                tables:tables.filter(table => (table.tag === 'h3')||table.tag === 'h2')
            })
            this.setState({
                loading:false
            })
            // console.log(req)
        })
    }

    render() {
        return (
            <div style={{minWidth:800}}>
                <Spin size="large" delay={this.state.delay} spinning={this.state.loading} style={{position:"fixed",top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}>
                    <div>
                        {/*对html标签进行渲染*/}
                        <div className='markdown-body' style={{display:'float',float:'left',width:"70%",padding:'0 30px'}} dangerouslySetInnerHTML={{__html: this.state.str}}/>
                        {/*此处为对mark文档解析并渲染，*/}
                        <div style={{display:'float',float:'left',width:'15%',height:500}}>
                            <Anchor target={() => document.querySelector('.markdown-body')}>
                                <div className="markNav-title" style={{textAlign:'center',marginTop:10}}>文章目录</div>
                                {this.state.tables.map(({ hash, tag }, index) => (
                                    <Link key={index}  href={'#' + hash} title={hash} className={tag} offsetTop={10}/>
                                ))}
                            </Anchor>,
                        </div>
                    </div>
                </Spin>
            </div>
        );
    }
}

export default withRouter(Content);
