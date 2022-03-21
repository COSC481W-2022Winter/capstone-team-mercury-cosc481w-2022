import React, { Component } from 'react';
import axios from 'axios';
import { ReactSession } from 'react-client-session';
import profilecss from './profile.css';
import Logout from '../components/logout';
import Navigation from '../components/Navigation';
import { Navigate } from 'react-router-dom';


class profile extends Component {
    constructor(props) {
        super(props);
        this.state = 
        {
            username: ReactSession.get("username"),
            bio: '',
            name: '',
            website: '',
            redir: false
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleBioChange = this.handleBioChange.bind(this);
        this.handleWebsiteChange = this.handleWebsiteChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


          handleNameChange(event) {
           this.setState({name: event.target.value});
          }
          handleBioChange(event) {
           this.setState({bio: event.target.value});
         }
         handleWebsiteChange(event) {
             var weblink = event.target.value;
           this.setState({website: weblink});
         }

         handleSubmit(event) {
            axios.post('/api/profileAPI/editProfile',  {
                username: this.state.username,
                bio: this.state.bio,
                name: this.state.name,
                website: this.state.website,

            }).then((response) => {
            })
                    .catch(() => {
                            console.log('An error occoured');
                    });
                alert("Your changes have been saved");
                this.setState({redir: true});

         }
    

    componentDidMount() {

        axios.post('/api/userAPI/checkUser',  {
            username: this.state.username
        }).then((response) => {
            if(!response.data) {
                alert("This user does not exist!");
                this.setState({redir: true});
            }
        })
                .catch(() => {
                        console.log('An error occoured');
                });

        axios.post('/api/profileAPI/getUserDetails',  {
            username: this.state.username
        }).then((response) => {
            console.log(response)
            console.log(response.data[0].username);
            this.setState({bio: response.data[0].bio,name: response.data[0].name, website: response.data[0].website});
        })
                .catch(() => {
                        console.log('An error occoured');
                });
       }
	
	
	//rendering
	render() {
        if(this.state.redir) 
            return (<Navigate  to={"../user/"+this.state.username}  />);
        else 
            return (  
                <div>
                    <Navigation />;
                    <div className='userRelatedPosts'>
                        <label>
                        name: &nbsp;
                            <input type="text" className='inform' value={this.state.name} onChange={this.handleNameChange} />
                        </label>
                        <br />
                        <label>
                        bio: &nbsp;
                            <textarea rows="10" cols="50" placeholder="Tell us about yourself..." className='inform' value={this.state.bio} onChange={this.handleBioChange} />
                        </label>
                        <br />
                        <label>
                        website: &nbsp;
                            <input type="text" className='inform' value={this.state.website} onChange={this.handleWebsiteChange} />
                        </label>
                        <br />
                        <input type="submit" value="Save Changes" onClick={this.handleSubmit} />
                    </div>
                    <div className='profile'>
                        <h2 className ='editPreview'>Preview</h2>
                        <h2>{this.state.username}</h2>
                        <h3>{this.state.name}</h3>
                        <p>{this.state.bio}</p>
                        {this.state.website !=undefined? (<p><a href={this.state.website} target="_blank">Website</a></p>) : null}
                    </div> 
                </div>
		);
	}
}
export default profile;