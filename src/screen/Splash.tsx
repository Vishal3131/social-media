import {Image, StyleSheet, Text, View} from 'react-native'

const Splash=()=>{
    return(
       <View style={{flex:1, backgroundColor:'#0ecaad'}}>
         <View style={styles.main}>
          <Image
             source={require('../assets/images/logo.png')}
             style={styles.img}
              />
             </View>
              <View>
                <Text style={{fontSize:22, fontWeight:600, color:'black',alignSelf:'center'}}>okaBoka</Text>
              </View>
       </View>
    )
}
export default Splash;

const styles= StyleSheet.create({
    main:{  
       flexDirection:'row',
       justifyContent:'center',
       marginTop:200
    },
     img:{
         width: 200,
         height: 200,
         borderRadius: 10,
         resizeMode: 'contain',
     }
})