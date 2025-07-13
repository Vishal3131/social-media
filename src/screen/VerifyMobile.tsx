import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Keyboard,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigation'

type VerifyMobileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'VerifyMobile'>;
const { width } = Dimensions.get('window');

const VerifyMobile: React.FC = () => {
  const navigation = useNavigation<VerifyMobileScreenNavigationProp>();

  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [timer, setTimer] = useState<number>(30);
  const inputs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (text: string, index: number) => {
    if (text.length === 1) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      if (index < 3) inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '') {
      if (index > 0) inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    Keyboard.dismiss();
    const code = otp.join('');
    console.log('OTP entered:', code);
    navigation.navigate('Profile')
  };

  const handleResend = () => {
    setOtp(['', '', '', '']);
    setTimer(5);
    inputs.current[0]?.focus();
    // TODO: Trigger OTP resend
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Verify your number</Text>
      <Text style={styles.subtitle}>We've sent a code to your phone</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={styles.otpBox}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleBackspace(e, index)}
            autoFocus={index === 0}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>

      <Text style={styles.resendLine}>
        Didn’t receive code?{' '}
        <Text
          style={[styles.resendLink, timer > 0 && { opacity: 0.5 }]}
          onPress={timer === 0 ? handleResend : undefined}
        >
          Resend
        </Text>
      </Text>

      <Text style={styles.timerText}>
        You can request a new code in {timer} second{timer !== 1 ? 's' : ''}
      </Text>
    </View>
  );
};

const boxSize = width * 0.13;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3cc6aa',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
    borderRadius: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 13,
    color: '#000',
    marginTop: 5,
    marginBottom: 25,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '75%',
    marginBottom: 25,
  },
  otpBox: {
    width: boxSize,
    height: boxSize,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#fff',
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
  },
  verifyButton: {
    backgroundColor: '#2c2c2c',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginTop: 10,
  },
  verifyText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resendLine: {
    marginTop: 20,
    color: '#000',
    fontSize: 13,
  },
  resendLink: {
    color: '#000',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  timerText: {
    fontSize: 12,
    color: '#000',
    marginTop: 5,
  },
});

export default VerifyMobile;
