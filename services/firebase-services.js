import firebase from '../firebase';
import moment from 'moment';

export function loadImage(type,img){
    let storage = firebase.storage();
    let ref = storage.ref(type);
    let child = ref.child(img);
    return child.getDownloadURL();
}

export function saveUser(user){

    let auth = firebase.auth();
    return auth.createUserWithEmailAndPassword(user.email, user.password).then(result =>{

        let firestore = firebase.firestore();
        let userData ={
            email : user.email,
            uid : result.user.uid,
            name : user.name
        }
        return firestore.collection('users').add(userData);
    }).then(docRef =>{
        return {success:true};
    }).catch(err =>{
        let message = '';
        if(err.code === 'auth/invalid-email'){
            message = 'Correo electrónico invalido';
        }
        else if(err.code === 'auth/weak-password'){
            message = 'El password debe ser de 6 caracateres minimo';
        }
        else if(err.code === 'auth/email-already-in-use'){
            message = 'El correo ya esta en uso.';
        }
        else{
            message = err.message;
        }
        return {success:false, message:message};
    });
}

export function login(email, password){

    let auth = firebase.auth();
    return auth.signInWithEmailAndPassword(email, password).then(result =>{
        return {success:true,user:result.user};
    }).catch(err =>{
        let message = '';
        if(err.code === 'auth/invalid-email'){
            message = 'Correo electrónico invalido';
        }
        else if(err.code === 'auth/weak-password'){
            message = 'El password debe ser de 6 caracateres minimo';
        }
        else if(err.code === 'auth/wrong-password'){
            message = 'Password incorrecto';
        }
        else if(err.code === 'user-not-found'){
            message = '!No tenemos registrado ese correo!';
        }
        else{
            message = err.message;
        }
        return {success:false, message:message};
    });
}

export async function addFav(userId, eventId){
     
    let firestore = firebase.firestore();
    let favData ={
        user_id : userId,
        event_id : eventId,
        created_at: firebase.database.ServerValue.TIMESTAMP 
    }
    const docRef = await firestore.collection('favs').add(favData);
    return { success: true };
}