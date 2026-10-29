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

type ForgetPasswordProps = {
  onBack: () => void;
};

export default function ForgetPassword({
  onBack,
}: ForgetPasswordProps) {
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);

  const handleSendCode = () => {
    if (!phone.trim()) {
      return;
    }

    setSent(true);
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
        {/* Кнопка назад */}

        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>

        {/* Иконка */}

        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>🔐</Text>
        </View>

        {/* Заголовок */}

        <Text style={styles.title}>
          Восстановление пароля
        </Text>

        <Text style={styles.subtitle}>
          Введите номер телефона, который
          использовался при регистрации
        </Text>

        {/* Форма */}

        {!sent ? (
          <View style={styles.form}>
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
              autoFocus
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleSendCode}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>
                Получить код
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.successContainer}>
            <View style={styles.successCircle}>
              <Text style={styles.successIcon}>
                ✓
              </Text>
            </View>

            <Text style={styles.successTitle}>
              Код отправлен
            </Text>

            <Text style={styles.successText}>
              Мы отправили код подтверждения
              на номер
            </Text>

            <Text style={styles.phoneText}>
              {phone}
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={onBack}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>
                Вернуться ко входу
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSent(false)}
              style={styles.changeButton}
            >
              <Text style={styles.changeText}>
                Изменить номер
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Нижняя ссылка */}

        {!sent && (
          <View style={styles.loginRow}>
            <Text style={styles.loginText}>
              Вспомнили пароль?
            </Text>

            <TouchableOpacity onPress={onBack}>
              <Text style={styles.loginLink}>
                Войти
              </Text>
            </TouchableOpacity>
          </View>
        )}
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
    paddingTop: 30,
    paddingBottom: 40,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 55,
  },

  backArrow: {
    fontSize: 32,
    lineHeight: 34,
    color: '#333333',
    marginTop: -3,
  },

  iconCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#F7E9FC',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },

  iconText: {
    fontSize: 32,
  },

  title: {
    fontSize: 27,
    fontWeight: '800',
    color: '#222222',
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: '#777777',
    textAlign: 'center',
    maxWidth: 320,
    alignSelf: 'center',
    marginBottom: 35,
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
    marginBottom: 20,
  },

  button: {
    height: 56,
    borderRadius: 15,
    backgroundColor: '#A900E8',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },

  successContainer: {
    alignItems: 'center',
    width: '100%',
  },

  successCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#E9F8EF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  successIcon: {
    color: '#2EAD63',
    fontSize: 34,
    fontWeight: '800',
  },

  successTitle: {
    fontSize: 23,
    fontWeight: '800',
    color: '#222222',
    marginBottom: 10,
  },

  successText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#777777',
    textAlign: 'center',
  },

  phoneText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
    marginTop: 5,
    marginBottom: 28,
  },

  changeButton: {
    marginTop: 18,
  },

  changeText: {
    color: '#A900E8',
    fontSize: 14,
    fontWeight: '700',
  },

  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
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