import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Registration from './src/screens/auth/Registration';
import ForgetPassword from './src/screens/auth/ForgetPassword';
import CitySelect from './src/screens/auth/CitySelect';
import HomeScreen from './src/screens/HomeScreen';

type Page = 'login' | 'registration' | 'forgot' | 'city' | 'home';

export default function App() {
  const [page, setPage] = useState<Page>('login');
  const [userName, setUserName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const goLogin = () => {
    setPage('login');
  };

  const handleLogin = () => {
    if (!phone.trim() || !password.trim()) {
      Alert.alert(
        'Заполните поля',
        'Введите номер телефона и пароль.'
      );
      return;
    }

    setPage('home');
  };

  const handleRegistrationComplete = () => {
    setPage('city');
  };

  const handleCityContinue = () => {
    setPage('home');
  };

  if (page === 'registration') {
    return (
      <Registration
      onBack={goLogin}
      onContinue={handleRegistrationComplete}
/>
    );
  }

  if (page === 'forgot') {
    return <ForgetPassword onBack={goLogin} />;
  }

  if (page === 'city') {
    return (
      <CitySelect
        onBack={goLogin}
        onContinue={handleCityContinue}
      />
    );
  }

  if (page === 'home') {
  return (
    <HomeScreen
      userName={userName}
      city={city}
      onLogout={goLogin}
    />
  );
}

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>✓</Text>
          </View>

          <Text style={styles.title}>Planner</Text>

          <Text style={styles.subtitle}>
            Планируй. Выполняй. Достигай.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.formTitle}>Вход</Text>

          <Text style={styles.label}>Номер телефона</Text>

          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="+7 700 000 00 00"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Пароль</Text>

          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Введите пароль"
            placeholderTextColor="#999"
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.forgotButton}
            onPress={() => setPage('forgot')}
          >
            <Text style={styles.forgotText}>
              Забыли пароль?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>
              Войти
            </Text>
          </TouchableOpacity>

          <View style={styles.registrationRow}>
            <Text style={styles.registrationText}>
              Нет аккаунта?
            </Text>

            <TouchableOpacity
              onPress={() => setPage('registration')}
            >
              <Text style={styles.registrationLink}>
                Зарегистрироваться
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },

  logoCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#A900E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: '700',
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#222222',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: '#777777',
    textAlign: 'center',
  },

  form: {
    width: '100%',
  },

  formTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#222222',
    marginBottom: 24,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },

  input: {
    height: 54,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#222222',
    backgroundColor: '#FAFAFA',
    marginBottom: 16,
  },

  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 22,
  },

  forgotText: {
    color: '#A900E8',
    fontSize: 14,
    fontWeight: '600',
  },

  loginButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#A900E8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },

  registrationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },

  registrationText: {
    color: '#777777',
    fontSize: 14,
  },

  registrationLink: {
    color: '#A900E8',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 5,
  },
});