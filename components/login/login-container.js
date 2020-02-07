import React,{Component} from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Madoka } from 'react-native-textinput-effects';
import RegisterContainer from '../register/register-container';
import {login} from '../../services/firebase-services';
import Toast from 'react-native-easy-toast'

class LoginContainer extends Component{

    state = {
        showRegister:false,
        email:'el.marcoss@gmail.com',
        password:'qwerty'
    }

    onLogin = (user) =>{
        this.setState({
            showRegister:false
        });
        this.props.navigation.navigate('Nav',user);
    }

    onRegister = () =>{
        this.setState({
            showRegister:true
        });
    }

    closeModal = () =>{
        this.setState({
            showRegister:false
        });
    }

    onPressLogin = ()=>{
        let email = this.state.email;
        let password = this.state.password;
        login(email,password).then(result=>{
            if(!result.success){
                let message = result.message;
                this.refs.toast.show(message, 1000);
            }else{
                this.onLogin(result.user);
            }
        });
    }

    render(){
        return <LinearGradient style={styles.container}
                            colors={['#3EE6C1', '#DBFF00']} 
                            start={{ x: 0.6, y: 0.6 }}
                            end={{ x: 1, y: 0 }}>
            <RegisterContainer onLogin={this.onLogin} visible={this.state.showRegister} back={this.closeModal}/>
            <Toast 
                    ref="toast"
                    style={{backgroundColor:'black',width:'90%'}}
                    position='top'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={1}
                    textStyle={{color:'white'}}
                />
            <Image
                style={styles.logo}
                source={require('../../assets/images/logo.png')}
            />
            <View style={styles.inputs}>
                <Madoka
                    label={'Correo electrónico'}
                    onChangeText={text =>{this.setState({email:text})}}
                    value={this.state.email}
                    // this is used as active and passive border color
                    borderColor={'white'}
                    inputPadding={16}
                    labelHeight={24}
                    labelStyle={{ color: 'white' }}
                    inputStyle={{ color: 'white' }}
                    autoCapitalize='none'
                />
                <Madoka
                    label={'Contraseña'}
                    onChangeText={text =>{this.setState({password:text})}}
                    value={this.state.password}
                    // this is used as active and passive border color
                    borderColor={'white'}
                    inputPadding={16}
                    labelHeight={24}
                    labelStyle={{ color: 'white' }}
                    inputStyle={{ color: 'white' }}
                    type='password'
                    secureTextEntry={true}
                    autoCapitalize='none'
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={this.onPressLogin}>
                <Text style={styles.text_button}>INICIAR SESIÓN</Text>
            </TouchableOpacity>
            <View></View>
            <Text onPress={this.onRegister} style={styles.footer}>¿No tienes una cuenta? Ingresa aquí.</Text>
        </LinearGradient>
    }
};

const styles = {
    container:{
        justifyContent:'flex-start',
        alignItems:'center',
        height:'100%',
        paddingTop:70
    },
    logo:{
        width:60,
        height:60,
        marginBottom:10
    },
    inputs:{
        width:'80%'
    },
    footer:{
        color:'white',
        fontSize:11,
        fontWeight:'bold',
        fontFamily: 'Avenir',
        position:'absolute',
        bottom:20
    },
    button:{
        borderColor:'white',
        borderRadius:20,
        margin:10,
        padding:10,
        width:'80%',
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center'
    },
    text_button:{
        color:'white',
        fontSize:16,
        fontWeight:'bold',
        fontFamily: 'Avenir'
    }
}
export default LoginContainer;