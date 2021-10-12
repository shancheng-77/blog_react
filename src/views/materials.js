import React, {Component} from 'react';
import { List } from 'antd';
import axios from "axios";
import {connect} from 'react-redux'
class Materials extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[]
        }
    }
    componentDidMount() {
        this.getData('all')
    }
    componentDidUpdate(prevProps: Readonly<P>) {
        if (this.props.linkType !== prevProps.linkType) {
            this.getData(this.props.linkType);
        }
    }
    getData = (type) =>{
        console.log(1)
        axios.get('/links',{
            params:{
                type
            }
        }).then(res => {
            console.log(res)
            this.setState({
                data:res.data
            })
        })
    }
    render() {
        return (
            <div style={{margin:20}}>
                {/*{this.props.linkType}*/}
                <List style={{padding:20,border:'1px solid #eee',width:'80%',minWidth:600}}
                    itemLayout="horizontal"
                    dataSource={this.state.data}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={<a href={item.link} target={'_blank'}>{item.title}</a>}
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
