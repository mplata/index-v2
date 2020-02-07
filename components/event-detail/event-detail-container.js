import React,{Component} from 'react';
import {View, Text, ImageBackground, ScrollView, Linking, Platform, Alert} from 'react-native';
import {Calendar, Permissions} from 'expo';
import { loadImage, addFav } from '../../services/firebase-services';
import Separator from '../separator/separator';
import { Ionicons, MaterialCommunityIcons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';

class EventDetailContainer extends Component{

    state ={
        uris:[],
        currentUriIndex:0
    }

    months = {
        0:"ENERO",1:"FEBRERO",2:"MARZO",3:"ABRIL",4:'MAYO',5:"JUNIO",6:'JULIO',
        7:"AGOSTO",8:"SEPTIEMBRE",9:"OCTUBRE",10:"NOVIEMBRE",11:'DICIEMBRE'
    };

    componentDidMount(){
        let event = this.props.navigation.state.params;
        console.log(this.props.navigation);
        let images = event.images;
        let promises = [];
        let imagesPromises = images.map(imgName =>{
            let promise = loadImage("events",imgName);
            promises.push(promise);
        });
        Promise.all(promises).then(uris =>{
            this.setState({uris:uris});
        });
    }

    onLeftPress = () =>{
        let index = this.state.currentUriIndex -1;
        this.setState({currentUriIndex: index});
    }

    onRightPress = () =>{
        let index = this.state.currentUriIndex + 1;
        this.setState({currentUriIndex: index});
    }

    
    addToCalendar = async () =>{

        let evt = this.props.navigation.state.params;
        let date = evt.date.toDate();
        let details = {
            title:evt.name,
            startDate:date,
            url:evt.website,
            notes:evt.description,
            timeZone: "GMT-7"
        };
        const { status, permissions } = await Permissions.askAsync(Permissions.CALENDAR);
        if (status === 'granted') {
            console.log('details',details);
            console.log('Calendar Default',Calendar.DEFAULT)
            let id = await Calendar.createEventAsync(Calendar.DEFAULT,details);
            console.log('id',id);
        } else {
            this.addToCalendar();
        }
    }

    askAddToCalendar = () =>{
        Alert.alert(
            'Agregar a calendario',
            '¿Desea agregar este evento a su calendario?',
            [
                {text: 'Despues', onPress: () => {}},
                {text: 'Aceptar', onPress: ()=>{ this.addToCalendar() }},
            ],
            {cancelable: false},
        );
    }

    addToFavs = () =>{

        console.log(this.props);
    }

    createImage = () =>{
        if(this.state.uris.length === 0){
            return <View>
                <Text>Cargando...</Text>
            </View>
        }else{
            let currentUriIndex = this.state.currentUriIndex;
            let evt = this.props.navigation.state.params;
            let index = this.state.currentUriIndex;

            let leftButton = index === 0?<View></View>:
                                <Ionicons name='ios-arrow-dropleft' onPress={this.onLeftPress} size={45} color={'white'}/>;

            let rightButton = index === this.state.uris.length-1?
                                        null:
                                <Ionicons name='ios-arrow-dropright' onPress={this.onRightPress} size={45} color={'white'}/>

            return <ImageBackground imageStyle={{resizeMode: 'stretch',height: '100%'}} 
                            source={{uri: this.state.uris[currentUriIndex]}}
                            style={styles.top_container}
                            >
                    <View style={styles.arrows_container}>
                        {leftButton}
                        {rightButton}
                    </View>
                    <View style={styles.top}>
                        <View>
                            <Text style={styles.text_name}>{evt.name}</Text>
                            <Text style={styles.text_place}>{evt.place}</Text>
                        </View>
                        <FontAwesome name='calendar-plus-o' size={45} color={'white'} onPress={this.askAddToCalendar}/>
                    </View>
                </ImageBackground>
        }
    }

    openFacebook = () =>{

        let evt = this.props.navigation.state.params;
        let facebookPage = evt.facebook_page;
        if(facebookPage && facebookPage.trim() !== ''){
            Linking.openURL(facebookPage);
        }
    }

    openInstagram = () =>{

        let evt = this.props.navigation.state.params;
        let instagramPage = evt.instagram_page;
        if(instagramPage && instagramPage.trim() !== ''){
            Linking.openURL(instagramPage);
        }

    }

    openWeb = () =>{
        
        let evt = this.props.navigation.state.params;
        let website = evt.website;
        if(website && website.trim() !== ''){
            Linking.openURL(website);
        }

    }

    openMaps = () =>{

        let evt = this.props.navigation.state.params;
        let label = evt.name;
        let latitude = evt.latitude;
        let longitude = evt.longitude;
        const url = Platform.select({
            ios: "maps:" + latitude + "," + longitude + "?q=" + label,
            android: "geo:" + latitude + "," + longitude + "?q=" + label
        });
        Linking.openURL(url);
    }

    back = () =>{
        this.props.navigation.navigate('list');
    }

    render(){

        let evt = this.props.navigation.state.params;
        if(!evt){
            return null;
        }
        let date = evt.date.toDate();
        let momentDate = moment(date);
        let monthName = this.months[momentDate.month()];
        let format = "DD [DE] ["+monthName+"] [DE] YYYY";
        let formattedDate = momentDate.format(format);
        return <ScrollView contentContainerStyle={styles.container}>
            {this.createImage()}
            <Separator/>
            <View style={styles.bottom}>
                <View>
                    <View>
                    <Text style={styles.date_desc}>
                        {formattedDate}
                    </Text>
                    <Text style={styles.text_desc}>
                        {evt.from} A {evt.to} HRS.
                    </Text>
                    </View>
                    <MaterialIcons name='favorite-border' size={50} color={'#3EE661'} style={styles.fav} onPress={this.addToFavs}/>
                </View>
                <View style={styles.icons}>
                    <MaterialCommunityIcons onPress={this.openWeb} name={'web'} color='black' size={25}/>
                    <MaterialCommunityIcons onPress={this.openFacebook} name={'facebook-box'} color='black' size={25}/>
                    <MaterialCommunityIcons onPress={this.openInstagram} name={'instagram'} color='black' size={25}/>
                    <MaterialCommunityIcons onPress={this.openMaps} name={'map-marker'} color='black' size={25}/>
                </View>
                <Text style={styles.text_desc}>
                    {evt.description}
                </Text>
            </View>
            <Ionicons onPress={this.back} name='ios-arrow-back' size={40} color='white' style={styles.back}/>
        </ScrollView>;
    }
}

const styles = {
    container:{
        paddingTop:0
    },
    top_container:{
        width:'100%',
        height: 400,
        justifyContent:'flex-end'
    },
    arrows_container:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:10,
        paddingRight:10,
        marginBottom:110
    },
    top:{
        width:'100%',
        justifyContent:'space-between',
        alignItems:'flex-start',
        padding:10,
        flexDirection:'row'
    },
    bottom:{
        paddingLeft:20,
        paddingRight:20,
        paddingBottom:10,
        paddingTop:10
    },
    text_name:{
        color:'white',
        fontSize:24,
        fontWeight:'bold',
        fontFamily: 'Avenir'
    },
    text_place:{
        color:'white',
        fontSize:16,
        fontWeight:'bold',
        fontFamily: 'Avenir'
    },
    text_desc:{
        color:'black',
        fontSize:18,
        fontFamily: 'Avenir'
    },
    date_desc:{
        color:'black',
        fontSize:18,
        fontFamily: 'Avenir',
        fontWeight:'bold'
    },
    icons:{
        flexDirection:'row',
        marginTop:10,
        marginBottom:10,
        justifyContent:'space-evenly',
        width:'100%'
    },
    back:{
        position:'absolute',
        top:40,
        left:20
    },
    fav:{
        position:'absolute',
        bottom:0,
        right:20
    }
}

export default EventDetailContainer;