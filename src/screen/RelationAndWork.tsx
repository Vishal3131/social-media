import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigation'
import Icon from 'react-native-vector-icons/Ionicons'; 

const genders = ['Male', 'Female', 'Other'];
const Relations = ['Single', 'In A Realtionship', 'Prefer Not To Say'];
const Roles= ['Student','Employee','Freelancer', 'Other']

type RelationAndWorkScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RelationAndWork'>;

const RelationAndWork = () => {
    const navigation = useNavigation<RelationAndWorkScreenNavigationProp>();

  const [dob, setDob] = useState({ day: '', month: '', year: '' });
  const [selectedGender, setSelectedGender] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('');
  const [role, setRole]=useState('')

  const handleContinue = () => {
   // console.log(dob,'\n',selectedGender,'\n' ,location)
   if(role==='Student') navigation.navigate('StudentInfo');
   if(role==='Employee') navigation.navigate('EmployeeInfo');
   if(role==='Freelancer') navigation.navigate('FreelancerInfo');
   if(role==='Other') navigation.navigate('OtherInfo');
  };

  return (
    <View style={styles.container}>

     <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Let's understand who you're looking for and where you're at</Text>

      {/* Gender */}
      <Text style={styles.label}>Interested In</Text>
      <View style={styles.genderRow}>
        {genders.map((gender) => (
          <TouchableOpacity
            key={gender}
            style={[
              styles.genderBox,
              selectedGender === gender && styles.selectedBox,
            ]}
            onPress={() => setSelectedGender(gender)}
          >
            <Text
              style={[
                styles.genderText,
                selectedGender === gender && styles.selectedText,
              ]}
            >
              {gender}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Relationship */}
   <Text style={styles.label}>Relationship Status</Text>
    <View style={styles.gridContainer}>
      {Relations.map((item) => (
        <TouchableOpacity
          key={item}
          style={[
            styles.box,
            status === item && styles.selectedBox,
          ]}
          onPress={() => setStatus(item)}
        >
          <Text
            style={[
              styles.boxText,
              status === item && styles.selectedText,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>

   {/* Roles */}

    <Text style={styles.label}>Are You</Text>
    <View style={styles.gridContainer}>
      {Roles.map((item) => (
        <TouchableOpacity
          key={item}
          style={[
            styles.box,
            role === item && styles.selectedBox,
          ]}
          onPress={() => setRole(item)}
        >
          <Text
            style={[
              styles.boxText,
              role === item && styles.selectedText,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>Your very first vibe</Text>

      <TouchableOpacity onPress={()=>navigation.navigate('HomeScreen')}>
         <Text style={styles.footerText}>Skip For Now</Text>
      </TouchableOpacity>
       
    </View>
  );
};

export default RelationAndWork;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3EC7A9',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20,
    color:'black'
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: '500',
    color:'black'
  },
  backArrow: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
    },
  dobRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dobInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    width: '30%',
    textAlign: 'center',
  },
  genderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  genderBox: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  box: {
    width: '48%',
    backgroundColor: '#fff',
    paddingVertical: 12,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
   boxText: {
    color: '#000',
    fontWeight: '500',
  },
  selectedBox: {
    backgroundColor: '#000',
  },
  genderText: {
    color: '#000',
  },
  selectedText: {
    color: '#fff',
    fontWeight: '600',
  },
  locationInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
  },
  useLocationText: {
    color: '#000',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  continueBtn: {
    backgroundColor: '#2D2D2D',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  continueText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 12,
    color:'black'
  },
});
