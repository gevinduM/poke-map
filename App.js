import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Signin from './Src/Signin';
import PokeMap from './Src/PokeMap';
import Meteor, {Accounts} from '@xvonabur/react-native-meteor'

const SERVER_URL = 'ws://192.168.0.28:3000/websocket';

export default class App extends Component {

  state = {
    loggedIn : false,
  }
  componentDidMount(){
      Meteor.connect(SERVER_URL);
      if(Meteor.userId()){
        this.flipLogin(true);
      }
  }
  flipLogin = (x) => {
    this.setState({loggedIn:x});
  }
  signin = (email,password) =>{
    
    Meteor.loginWithPassword(email,password, (error,data) =>{
      if(error){
        if(error.reason === 'User not found'){
          console.log('There was no email');
          Accounts.createUser({email,password}, (error)=>{
            console.log(error);
          })
        }else{
          console.log(error.reason);
        }
      }else{
        console.log(email);
        this.flipLogin(true);
        //TODO
      }
      console.log(Meteor.userId());
    });
    

  }

  renderView = () => {
    if(!this.state.loggedIn){
      return(
        <Signin signin={this.signin}></Signin>
      )
    }else{
      return(
        <PokeMap flipLogin={this.flipLogin} />
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
          {this.renderView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
