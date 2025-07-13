import { useState } from "react";
import { View,Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigation'

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const {height,width}= Dimensions.get('window')

const Login=()=>{
    const navigation = useNavigation<LoginScreenNavigationProp>();

    const [input, setInput]= useState({ email:''})

    const handleInput=(val:string,name:string)=>{
        setInput({
            ...input,
            [name]:val
        })
    }

    const handleSubmit=()=>{
         if(input.email === '') return Alert.alert('Phone Number are required !')
         navigation.navigate('VerifyMobile')
    }

    return(
       <View style={{flex:1, backgroundColor:'#0ecaad'}}>
          <View style={{marginTop:'10%', marginHorizontal:40}}>
            <View style={{alignSelf:'center',marginBottom:20}}>
             <Text style={{alignSelf:'center',fontSize:28,fontWeight:'600',color:'black'}}>Welcome to okaBoka</Text>
             <Text style={{color:'black'}}>connect with emotionally similar people</Text>
            </View>
            <View style={{alignSelf:'center'}}>
                <Image 
                 source={require('../assets/images/logo.png')}
                />
            </View>

             <Text style={style.heading}>Let's start with your number your world begins here.</Text>

             <View style={{marginTop:'20%'}}>
                <Text style={{color:'black'}}>Phone Number</Text>
                <TextInput style={style.input} value={input.email} onChangeText={(value)=>handleInput(value,'email')}/>
             </View>

             <Text style={{alignSelf:'center',marginTop:15}}>or</Text>

             <View style={[style.input,{marginTop:20}]}>
                <Text style={{alignSelf:'center',color:'black',marginTop:5}} >Continue with whatsapp</Text>
             </View>

              <View style={{flexDirection:'row',justifyContent:'center'}}>
               <TouchableOpacity  onPress={handleSubmit}>
                 <View style={[style.btn,]}>
                   <Text style={{color:'white',padding:10,alignSelf:'center'}}>Send Me The Code</Text>
                 </View>
               </TouchableOpacity>
             </View>

             <Text style={style.msg}>We'll never share your number</Text>

          </View>
       </View>
    )
}
export default Login;

const style= StyleSheet.create({
    heading:{
        fontSize:14,
        fontWeight:'500',
        color:'black',
        marginTop:20,
        alignSelf:'center'
    },
    input:{
        borderWidth:0.8,
        borderColor:'grey',
        borderRadius:5,
        height: height* 0.04,
        paddingHorizontal:10,
        marginTop:5,
        backgroundColor:'white',
        color:'black'
    },
    btn:{
        backgroundColor:'black',
        borderRadius:5,
        marginTop:20,
        width: width * 0.5,

    },
    msg:{
        color:'black',
        alignSelf:'center',
        marginTop:10
    }
})