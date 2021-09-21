import React, { Component } from 'react';
import axios from 'axios';

class UserPage extends Component {
state = {
userData: []
}
    componentDidMount(){
        axios.get('http://localhost:5000/users')
        .then(response => {
            console.log(response.data)
            this.setState({
                
                userData: response.data
            });
        })
    }
    render() {
        return (
            <div>
               Use Me Up! 
            </div>
        );
    }
}

export default UserPage;