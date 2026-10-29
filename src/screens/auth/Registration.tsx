import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

type RegistrationProps = {
  onBack: () => void;
  onContinue: (name: string) => void;
};

export default function Registration({
  onBack,
  onContinue,
}: RegistrationProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [agree, setAgree] = useState(false);

  const handleContinue = () => {
    if (!name.trim()) {
      return;
    }

    if (!phone.trim()) {
      return;
    }

    if (!password.trim()) {
      return;
    }

    if (password !== repeatPassword) {
      return;
    }

    if (!agree) {
      return;
    }

    onContinue(name.trim());
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Верхняя часть */}

        <View style={styles.top}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            activeOpacity={0.7}
          >
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>

          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>✓</Text>
          </View>

          <Text style={styles.title}>
            Создание аккаунта
          </Text>

          <Text style={styles.subtitle}>
            Заполните данные, чтобы начать
            пользоваться Planner
          </Text>
        </View>

        {/* Форма */}

        <View style={styles.form}>
          <Text style={styles.label}>
            Ваше имя
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Например, Канат"
            placeholderTextColor="#999999"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

          <Text style={styles.label}>
            Номер телефона
          </Text>

          <TextInput
            style={styles.input}
            placeholder="+7 777 123 45 67"
            placeholderTextColor="#999999"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>
            Пароль
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Придумайте пароль"
            placeholderTextColor="#999999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Text style={styles.label}>
            Повторите пароль
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Повторите пароль"
            placeholderTextColor="#999999"
            value={repeatPassword}
            onChangeText={setRepeatPassword}
            secureTextEntry
          />

          {/* Согласие */}

          <TouchableOpacity
            style={styles.agreement}
            onPress={() => setAgree(!agree)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.checkbox,
                agree && styles.checkboxActive,
              ]}
            >
              {agree && (
                <Text style={styles.check}>
                  ✓
                </Text>
              )}
            </View>

            <Text style={styles.agreementText}>
              Я согласен с условиями использования
              приложения
            </Text>
          </TouchableOpacity>

          {/* Кнопка */}

          <TouchableOpacity
            style={styles.button}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              Продолжить
            </Text>
          </TouchableOpacity>

          {/* Возврат ко входу */}

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>
              Уже есть аккаунт?
            </Text>

            <TouchableOpacity onPress={onBack}>
              <Text style={styles.loginLink}>
                Войти
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 30,
  },

  top: {
    alignItems: 'center',
    marginBottom: 30,
  },

  backButton: {
    alignSelf: 'flex-start',
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },

  backArrow: {
    fontSize: 32,
    lineHeight: 34,
    color: '#333333',
    marginTop: -3,
  },

  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#A900E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 31,
    fontWeight: '700',
  },

  title: {
    fontSize: 27,
    fontWeight: '800',
    color: '#222222',
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: '#777777',
    textAlign: 'center',
    maxWidth: 300,
  },

  form: {
    width: '100%',
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
    borderColor: '#E0E0E0',
    borderRadius: 14,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#222222',
    marginBottom: 17,
  },

  agreement: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 3,
    marginBottom: 24,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 1,
  },

  checkboxActive: {
    backgroundColor: '#A900E8',
    borderColor: '#A900E8',
  },

  check: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  agreementText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
    color: '#777777',
  },

  button: {
    height: 56,
    borderRadius: 15,
    backgroundColor: '#A900E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },

  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },

  loginText: {
    color: '#777777',
    fontSize: 14,
  },

  loginLink: {
    color: '#A900E8',
    fontSize: 14,
    fontWeight: '700',
  },
});