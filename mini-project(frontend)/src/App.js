import React from 'react';
import axios from "axios";
import Waiter from "./waiter/App"
import Managment from "./managment/App"
import Chef from "./chef/App"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import {Provider} from "react-redux";
import {store} from "./managment/store";
import {store2} from "./waiter/store";
import {store3} from "./chef/store"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      role: "",
      login: false,
      name: "",
      password: ""
    }
    this.changeRole=this.changeRole.bind(this)
    this.logout=this.logout.bind(this)
   // this.page=this.page.bind(this)
  }
changeRole(){
  axios.get(`http://localhost:8080/login/${this.state.name}/${this.state.password}`).then((res)=>{
    console.log(res.data);
      this.setState({login:true,role:res.data})
     })
}
logout(){
  this.setState({login:false,role:"",name:"",password:""})
}
  render() {

    const page = () => {
      //console.log(this)
      if (!this.state.login) {
        return (<Box component="div" display="flex" justifyContent="center" alignItems="center">
        <Grid container
            direction="column"
            justify="center"
            alignItems="center">
            <TextField
                id="outlined-name"
                label="Name"
                margin="normal"
                variant="outlined"
                onChange={(e) => { this.setState({name:e.target.value}) }}
            />
            <br></br>
            <TextField
                type="password"
                id="outlined-name"
                label="Password"
                margin="normal"
                variant="outlined"
                onChange={(e) => {this.setState({password:e.target.value})}}
            />
            <br></br>
            <Button variant="contained" color="primary" onClick={() => {
                this.changeRole();
            }}>
                LOGIN
            </Button>
        </Grid>
    </Box>)
      }
      else if (this.state.role == "chef") {
         return <Provider store={store3}><Chef logout={this.logout} /></Provider>
      }
      else if (this.state.role == "waiter") {
        return <Provider store={store2}><Waiter logout={this.logout} /></Provider>
      }
      else {
        return <Provider store={store}><Managment logout={this.logout}/></Provider>
      }
    }
    return (<Box component="div"
        >
        {page}
    </Box>)
  }
}

export default App;
