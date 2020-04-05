import React from 'react';
import {View, Text, StyleSheet,ImageBackground, Dimensions} from 'react-native';
import {Form, Item, Label, Input, Button} from 'native-base'

var background = require('../img/landing.jpg');
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;



class Signin extends React.Component{
    state = {
        email : "",
        password:"",
       
    }
    login = () =>{
        var email = this.state.email;
        var password = this.state.password;
        this.props.signin(email,password);

    }
    render(){
        return(
            <View style={{flex:1}}>
                <ImageBackground source={background} style={styles.backgroundImg}>
                    <View style={styles.inputStyles}>
                        <Form>
                            <Item floatingLabel>
                                <Label>Email</Label>
                                <Input
                                    style = {{}}
                                    autoCorrect = {false}
                                    onChangeText={(email) => this.setState({email})}
                                />
                            </Item>
                            <Item floatingLabel>
                                <Label>Password</Label>
                                <Input
                                    style = {{}}
                                    autoCorrect = {false}
                                    onChangeText={(password) => this.setState({password})}
                                    secureTextEntry
                                />
                            </Item>
                            <View style={{marginTop:10}}>
                                <Button
                                    primary
                                    block
                                    onPress ={this.login}
                                >
                                    <Text style={{color:'white'}}>SignIn, SignUp</Text>
                                </Button>
                            </View>
                        </Form>
                    </View>
                </ImageBackground>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImg:{
        flex:1,
        resizeMode:"cover",
        width:width,
        height:height
    },
    inputStyles:{
        flex:1,
        flexDirection: "column",
        justifyContent:"center",
        margin:10

    }
});

export default Signin;
