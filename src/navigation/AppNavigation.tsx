import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';


import Splash from '../screen/Splash';
import Login from '../screen/Login';
import VerifyMobile from '../screen/VerifyMobile';
import Profile from '../screen/Profile';
import About from '../screen/About';
import AboutNext from '../screen/AboutNext';
import RelationAndWork from '../screen/RelationAndWork';
import StudentInfo from '../screen/StudentInfo';
import EmployeeInfo from '../screen/EmployeeInfo';
import FreelancerInfo from '../screen/FreelancerInfo';
import OtherInfo from '../screen/OtherInfo';
import HomeScreen from '../screen/HomeScreen';


export type RootStackParamList = {
  Splash:undefined;
  VerifyMobile:undefined;
  Login:undefined;
  Profile:undefined;
  About: undefined;
  AboutNext:undefined;
  RelationAndWork:undefined;
  StudentInfo:undefined;
  EmployeeInfo:undefined;
  FreelancerInfo:undefined;
  OtherInfo:undefined;
  HomeScreen:undefined;

};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigation() {
  return (
<NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name='Splash'  component={Splash} options={{headerShown:false}}/>
        <Stack.Screen name='Login'  component={Login}  options={{headerShown:false}} />
        <Stack.Screen name='VerifyMobile'  component={VerifyMobile}  options={{headerShown:false}} />
        <Stack.Screen name='Profile' component={Profile} options={{headerShown:false}}/>
        <Stack.Screen name='About' component={About} options={{headerShown:false}}/>
        <Stack.Screen name='AboutNext' component={AboutNext} options={{headerShown:false}}/>
        <Stack.Screen name='RelationAndWork' component={RelationAndWork} options={{headerShown:false}}/>
        <Stack.Screen name='StudentInfo'  component={StudentInfo} options={{headerShown:false}} />
        <Stack.Screen name='EmployeeInfo'  component={EmployeeInfo} options={{headerShown:false}} />
        <Stack.Screen name='FreelancerInfo'  component={FreelancerInfo} options={{headerShown:false}} />
        <Stack.Screen name='OtherInfo'  component={OtherInfo} options={{headerShown:false}} />
        <Stack.Screen name='HomeScreen'  component={HomeScreen} options={{headerShown:false}} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}
