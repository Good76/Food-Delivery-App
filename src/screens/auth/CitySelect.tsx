import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';

type CitySelectProps = {
  onBack: () => void;
  onContinue: (city: string) => void;
};

const cities = [
  'Алматы',
  'Астана',
  'Шымкент',
  'Караганда',
  'Актобе',
  'Тараз',
  'Павлодар',
  'Усть-Каменогорск',
  'Костанай',
  'Кызылорда',
];

export default function CitySelect({
  onBack,
  onContinue,
}: CitySelectProps) {
  const [selectedCity, setSelectedCity] = useState('');

  const handleContinue = () => {
    if (!selectedCity) {
      return;
    }

    onContinue(selectedCity);
  };

  return (
    <View style={styles.container}>
      {/* Верхняя часть */}

      <View style={styles.header}>
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
          Выберите город
        </Text>

        <Text style={styles.subtitle}>
          Выберите ваш город, чтобы настроить
          приложение под вас
        </Text>
      </View>

      {/* Список городов */}

      <FlatList
        data={cities}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cityList}
        renderItem={({ item }) => {
          const isSelected = selectedCity === item;

          return (
            <TouchableOpacity
              style={[
                styles.cityItem,
                isSelected && styles.cityItemSelected,
              ]}
              onPress={() => setSelectedCity(item)}
              activeOpacity={0.8}
            >
              <View style={styles.cityIcon}>
                <Text style={styles.cityIconText}>
                  📍
                </Text>
              </View>

              <Text
                style={[
                  styles.cityName,
                  isSelected && styles.cityNameSelected,
                ]}
              >
                {item}
              </Text>

              <View
                style={[
                  styles.radio,
                  isSelected && styles.radioSelected,
                ]}
              >
                {isSelected && (
                  <View style={styles.radioInner} />
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />

      {/* Кнопка */}

      <View style={styles.bottom}>
        <TouchableOpacity
          style={[
            styles.button,
            !selectedCity && styles.buttonDisabled,
          ]}
          onPress={handleContinue}
          activeOpacity={0.8}
          disabled={!selectedCity}
        >
          <Text style={styles.buttonText}>
            Продолжить
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 30,
  },

  header: {
    alignItems: 'center',
    marginBottom: 20,
  },

  backButton: {
    alignSelf: 'flex-start',
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
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
    maxWidth: 310,
  },

  cityList: {
    paddingTop: 10,
    paddingBottom: 15,
  },

  cityItem: {
    minHeight: 62,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 15,
    backgroundColor: '#FAFAFA',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 10,
  },

  cityItemSelected: {
    borderColor: '#A900E8',
    backgroundColor: '#FAF1FF',
  },

  cityIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F1E4F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  cityIconText: {
    fontSize: 18,
  },

  cityName: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },

  cityNameSelected: {
    color: '#A900E8',
    fontWeight: '700',
  },

  radio: {
    width: 23,
    height: 23,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioSelected: {
    borderColor: '#A900E8',
  },

  radioInner: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: '#A900E8',
  },

  bottom: {
    paddingTop: 10,
    paddingBottom: 25,
    backgroundColor: '#FFFFFF',
  },

  button: {
    height: 56,
    borderRadius: 15,
    backgroundColor: '#A900E8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonDisabled: {
    backgroundColor: '#D9D9D9',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});