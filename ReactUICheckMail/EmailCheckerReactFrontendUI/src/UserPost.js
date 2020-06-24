import React, { Component } from 'react';
import './App.css';  
import axios from 'axios';
import Email from './Email3.png';
//import React, { useState } from 'react';


class UserPost extends Component {
    constructor(props) {
		super(props)

		//this.submitHandler = this.submitHandler.bind(this);

		this.state = {
			
			email: '',
            myObject: {data:0},
            imageUrl : "https://www.google.com/search?q=email+pictures&tbm=isch&ved=2ahUKEwiChYvqif3pAhUXNK0KHekgALYQ2-cCegQIABAA&oq=email+pictures&gs_lcp=CgNpbWcQAzICCAAyAggAMgYIABAFEB4yBggAEAUQHjIGCAAQBRAeMgYIABAFEB4yBggAEAUQHjIGCAAQBRAeMgYIABAFEB4yBggAEAUQHjoHCAAQsQMQQzoECAAQQzoFCAAQsQNQ7UVY7WBg2mNoAXAAeACAAV-IAekGkgECMTSYAQCgAQGqAQtnd3Mtd2l6LWltZw&sclient=img&ei=TODjXoKvDJfotAXpwYCwCw&bih=684&biw=1427&rlz=1C5CHFA_enUS773US774#imgrc=FCt0atTw4RpUqM"
           // myObject: {}
           //data : null
           //const [data, setData] = . useState(null);

            
		}

        //this.changeHandler = this.changeHandler.bind(this);

    }

    getdata()  {
    	//console.log("9999"+this.state.myObject.data)
        return this.state.myObject.data ===0 ? "Zero" : this.state.myObject.data;

        //this.myObject = this.myObject.bind(this);
         //return {data: this.state.data};
    }

    
    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
        //this.myObject = this.myObject.bind(this);
         //return {data: this.state.data};
    }

       submitHandler = (e) =>{
        e.preventDefault()
        console.log(this.state)
       // axios.post('http://ec2-52-35-138-206.us-west-2.compute.amazonaws.com:8080/checkemail',this.state)
        //axios.post('http://ec2-18-237-75-143.us-west-2.compute.amazonaws.com:8080/checkemail',this.state)
        axios.post('http://localhost:8080/checkemail',this.state)
        .then(response =>{
           // this.state.myObject.data=response.data;
            //setData(response.data);
            console.log("the respose is "+response.data)
            this.setState({ myObject : response})
            //this.setState({myObject})
            console.log("5555555hihihi "+this.state.myObject.data)
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })

    }

    

    render() { 
        let { emails,myObject } = this.state
        return ( 
            <form onSubmit={this.submitHandler}>
                <div>
                <img src= {Email} alt =""/>
                </div>

                <div >

                <text>Enter Email Address :  </text>
                <input type="text" name="emails" value={emails} onChange={this.changeHandler}></input>
                 
                </div>
                <button style ={{marginTop:20}} className ="btn btn-info btn-sm"type="submit">Check Email</button>
                <div style ={{marginTop:20}}>
                <text> Number of Unique Emails : </text>
                <span className ="badge badge-secondary">  {this.getdata()} </span>
                
                </div>
                
                
                </form>
              
               
                
            
         );
    }





  
    
}
 
export default UserPost