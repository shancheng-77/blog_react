import React, {Component} from 'react';

class Welcome extends Component {
    toMain = () => {
        this.props.history.push('main')
    }
    render() {
        return (
            <div style={{width:'100vw',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}
            >
                <h1>welcome to my blog</h1><br/>
                <button onClick={()=> this.toMain()}>点击跳转</button>
            </div>
        );
    }
}

export default Welcome;
