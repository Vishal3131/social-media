import { useState } from "react";
import { View,Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigation'

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

const {height,width}= Dimensions.get('window')

const Profile=()=>{
    const navigation = useNavigation<ProfileScreenNavigationProp>();
    
    const [input, setInput]= useState('')

    const handleSubmit=()=>{
         if(input === '') return Alert.alert('Name is required !')
            
      navigation.navigate('About');
    }

    return(
       <View style={{flex:1, backgroundColor:'#0ecaad'}}>
          <View style={{marginTop:'40%', marginHorizontal:40}}>
            <View style={{alignSelf:'center'}}>
                <Image 
                 source={require('../assets/images/logo.png')}
                />
            </View>

             <Text style={style.heading}>What should we call you?</Text>

             <View style={{marginTop:'20%'}}>
                <Text style={{color:'black'}}>Full Name</Text>
                <TextInput style={style.input} value={input} placeholder="Your Name" onChangeText={(value)=>setInput(value)}/>
             </View>

              <View style={{flexDirection:'row',justifyContent:'center'}}>
               <TouchableOpacity  onPress={handleSubmit}>
                 <View style={[style.btn,]}>
                   <Text style={{color:'white',padding:10,alignSelf:'center'}}>Let's Get To Know You</Text>
                 </View>
               </TouchableOpacity>
             </View>

             <Text style={style.msg}>Your safety is our priority</Text>

          </View>
       </View>
    )
}
export default Profile;

const style= StyleSheet.create({
    heading:{
        fontSize:18,
        fontWeight:'600',
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