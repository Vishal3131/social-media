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

type AboutNextScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AboutNext'>;

const AboutNext = () => {
    const navigation = useNavigation<AboutNextScreenNavigationProp>();
    
  const [dob, setDob] = useState({ day: '', month: '', year: '' });
  const [selectedGender, setSelectedGender] = useState('');
  const [description, setDescription]=useState('')
  const [location, setLocation] = useState('');

  const handleContinue = () => {
    if (!dob.day || !dob.month || !dob.year || !selectedGender || !location) {
      Alert.alert('Please fill all the fields');
      return;
    }
   // console.log(dob,'\n',selectedGender,'\n' ,location)
   navigation.navigate('RelationAndWork');
  };

  return (
    <View style={styles.container}>

     <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>A little about you so we match better</Text>

      {/* DOB */}
      <Text style={styles.label}>Date of Birth</Text>
      <View style={styles.dobRow}>
        <TextInput
          placeholder="DD"
          style={styles.dobInput}
          keyboardType="numeric"
          maxLength={2}
          value={dob.day}
          onChangeText={(text) => setDob({ ...dob, day: text })}
        />
        <TextInput
          placeholder="MM"
          style={styles.dobInput}
          keyboardType="numeric"
          maxLength={2}
          value={dob.month}
          onChangeText={(text) => setDob({ ...dob, month: text })}
        />
        <TextInput
          placeholder="YYYY"
          style={styles.dobInput}
          keyboardType="numeric"
          maxLength={4}
          value={dob.year}
          onChangeText={(text) => setDob({ ...dob, year: text })}
        />
      </View>

      {/* Gender */}
      <Text style={styles.label}>Gender</Text>
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
      
      <View>
        <TextInput
           placeholder="Write here..."
           style={styles.locationInput}
           value={description}
           onChangeText={(value)=>setDescription(value)}
         />
      </View>

      {/* Location */}
      <Text style={styles.label}>Location (City, Country)</Text>
      <TextInput
        placeholder="Enter your location"
        style={styles.locationInput}
        value={location}
        onChangeText={setLocation}
      />
      <TouchableOpacity>
        <Text style={styles.useLocationText}>📍 Use current location</Text>
      </TouchableOpacity>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>Who are you open to connecting with?</Text>
    </View>
  );
};

export default AboutNext;

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
