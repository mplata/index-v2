import React,{Component} from 'react';
import {Modal, View, Text, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Fumi } from 'react-native-textinput-effects';
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import Toast from 'react-native-easy-toast'
import {saveUser} from '../../services/firebase-services';

class RegisterContainer extends Component{

    state={
        email:'',
        name:'',
        password:'',
        repassword:''
    }

    onClose = () =>{
        this.props.back();
    }

    back = () =>{
        this.props.back();
    }

    onSavePress = () =>{

        let name = this.state.name;
        let password = this.state.password;
        let repassword = this.state.repassword;
        if(password !== repassword){
            this.refs.toast.show('Los passwords deben coincidir.', 1000);
            return;
        }
        if(name.trim() === ''){
            this.refs.toast.show('Favor de ingresar un nombre de usuario.', 1000);
            return;
        }
        let user = {
            email:this.state.email,
            name:this.state.name,
            password:this.state.password
        }
        saveUser(user).then(result=>{
            if(!result.success){
                let message = result.message;
                this.refs.toast.show(message, 1000);
            }else{
                this.props.onLogin();
            }
        });
    }

    onShow = () =>{

        //this.refs.toast.show('hello world!', 1000);
        
    }

    render(){
        return <Modal
            animationType="slide"
            transparent={true}
            visible={this.props.visible}
            onRequestClose={this.onClose}
            onShow={this.onShow}>
            <LinearGradient style={styles.container}
                            colors={['#3EE6C1', '#DBFF00']} 
                            start={{ x: 0.6, y: 0.6 }}
                            end={{ x: 1, y: 0 }}>
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
                <Ionicons name='ios-arrow-back' color='white' size={40} style={styles.back} onPress={this.back}/>
                <View style={styles.input}>
                    <Fumi
                        onChangeText={text =>{this.setState({email:text})}}
                        value={this.state.email}
                        style={styles.text_input}
                        label={'Correo Eléctronico'}
                        iconClass={FontAwesome}
                        iconName={'envelope-o'}
                        iconColor={'#3EE6C1'}
                        iconSize={20}
                        iconWidth={40}
                        inputPadding={16}
                        type='email'
                        keyboardType='email-address'
                        autoCapitalize='none'
                    />
                </View>
                <View style={styles.input}>
                    <Fumi
                        onChangeText={text =>{this.setState({name:text})}}
                        value={this.state.name}
                        style={styles.text_input}
                        label={'Nombre'}
                        iconClass={FontAwesome}
                        iconName={'user'}
                        iconColor={'#3EE6C1'}
                        iconSize={20}
                        iconWidth={40}
                        inputPadding={16}
                    />
                </View>
                <View style={styles.input}>
                    <Fumi
                        onChangeText={text =>{this.setState({password:text})}}
                        value={this.state.password}
                        style={styles.text_input}
                        label={'Contraseña'}
                        iconClass={FontAwesome}
                        iconName={'lock'}
                        iconColor={'#3EE6C1'}
                        iconSize={20}
                        iconWidth={40}
                        inputPadding={16}
                        type='password'
                        secureTextEntry={true}
                        autoCapitalize='none'
                    />
                </View>
                <View style={styles.input}>
                    <Fumi
                        onChangeText={text =>{this.setState({repassword:text})}}
                        value={this.state.repassword}
                        style={styles.text_input}
                        label={'Repetir contraseña'}
                        iconClass={FontAwesome}
                        iconName={'lock'}
                        iconColor={'#3EE6C1'}
                        iconSize={20}
                        iconWidth={40}
                        inputPadding={16}
                        type='password'
                        secureTextEntry={true}
                        autoCapitalize='none'
                    />
                </View>
                <TouchableOpacity style={styles.save} onPress={this.onSavePress}>
                    <Text style={styles.text_save}>Guardar</Text>
                </TouchableOpacity>
            </LinearGradient>
        </Modal>
    }
};

const styles ={
    container:{
        width:'100%',
        height:'100%',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        padding:20
    },
    input:{
        width:'90%',
        margin:10
    },
    save:{
        width:'90%',
        margin:10,
        borderRadius:25,
        padding:10,
        borderWidth:2,
        borderColor:'white',
        alignItems:'center',
        justifyContent:'center'
    },
    text_save:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        fontFamily: 'Avenir'
    },
    text_input:{
        borderRadius:25,
    },
    back:{
        position:'absolute',
        left:20,
        top:45
    }
}

export default RegisterContainer;