import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

type Task = {
  id: number;
  title: string;
  category: string;
  time: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  date: string;
};

type AddTaskScreenProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onBack: () => void;
};

const categories = [
  'Личное',
  'Учёба',
  'Работа',
  'Спорт',
  'Покупки',
];

const priorities: {
  value: Task['priority'];
  label: string;
}[] = [
  {
    value: 'low',
    label: 'Низкий',
  },
  {
    value: 'medium',
    label: 'Средний',
  },
  {
    value: 'high',
    label: 'Высокий',
  },
];

export default function AddTaskScreen({
  setTasks,
  onBack,
}: AddTaskScreenProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Личное');
  const [time, setTime] = useState('');
  const [priority, setPriority] =
    useState<Task['priority']>('medium');

  const [error, setError] = useState('');

  const addTask = () => {
    if (!title.trim()) {
      setError('Введите название задачи');
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      category,
      time: time.trim() || 'Без времени',
      completed: false,
      priority,
      date: new Date()
        .toISOString()
        .split('T')[0],
    };

    setTasks((currentTasks) => [
      ...currentTasks,
      newTask,
    ]);

    onBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.content}
        >
          {/* HEADER */}

          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={onBack}
              activeOpacity={0.7}
            >
              <Text style={styles.backArrow}>
                ‹
              </Text>
            </TouchableOpacity>

            <Text style={styles.title}>
              Новая задача
            </Text>

            <View style={styles.headerSpace} />
          </View>

          {/* ИКОНКА */}

          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Text style={styles.icon}>
                +
              </Text>
            </View>

            <Text style={styles.iconTitle}>
              Создайте новую задачу
            </Text>

            <Text style={styles.iconSubtitle}>
              Заполните информацию ниже
            </Text>
          </View>

          {/* НАЗВАНИЕ */}

          <Text style={styles.label}>
            Название задачи
          </Text>

          <TextInput
            style={[
              styles.input,
              error && styles.inputError,
            ]}
            placeholder="Например, изучить React Native"
            placeholderTextColor="#999999"
            value={title}
            onChangeText={(value) => {
              setTitle(value);
              setError('');
            }}
            maxLength={100}
          />

          {error ? (
            <Text style={styles.errorText}>
              {error}
            </Text>
          ) : null}

          {/* КАТЕГОРИЯ */}

          <Text style={styles.label}>
            Категория
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {categories.map((item) => {
              const selected =
                category === item;

              return (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.categoryButton,
                    selected &&
                      styles.categoryButtonSelected,
                  ]}
                  onPress={() =>
                    setCategory(item)
                  }
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      selected &&
                        styles.categoryButtonTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* ВРЕМЯ */}

          <Text style={styles.label}>
            Время
          </Text>

          <View style={styles.timeContainer}>
            <Text style={styles.timeIcon}>
              🕐
            </Text>

            <TextInput
              style={styles.timeInput}
              placeholder="Например, 18:30"
              placeholderTextColor="#999999"
              value={time}
              onChangeText={setTime}
              keyboardType="numbers-and-punctuation"
              maxLength={5}
            />
          </View>

          {/* ПРИОРИТЕТ */}

          <Text style={styles.label}>
            Приоритет
          </Text>

          <View style={styles.priorityContainer}>
            {priorities.map((item) => {
              const selected =
                priority === item.value;

              return (
                <TouchableOpacity
                  key={item.value}
                  style={[
                    styles.priorityButton,
                    selected &&
                      styles.priorityButtonSelected,
                  ]}
                  onPress={() =>
                    setPriority(item.value)
                  }
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.priorityDot,
                      item.value === 'high' &&
                        styles.priorityHigh,
                      item.value === 'medium' &&
                        styles.priorityMedium,
                      item.value === 'low' &&
                        styles.priorityLow,
                    ]}
                  />

                  <Text
                    style={[
                      styles.priorityText,
                      selected &&
                        styles.priorityTextSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* ИНФОРМАЦИЯ */}

          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>
              💡
            </Text>

            <Text style={styles.infoText}>
              Задача будет добавлена в ваш список
              на сегодня.
            </Text>
          </View>

          {/* КНОПКА */}

          <TouchableOpacity
            style={styles.createButton}
            onPress={addTask}
            activeOpacity={0.8}
          >
            <Text style={styles.createButtonText}>
              Создать задачу
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onBack}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelButtonText}>
              Отмена
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FA',
  },

  keyboard: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 35,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  backArrow: {
    fontSize: 32,
    lineHeight: 35,
    color: '#333333',
    marginTop: -3,
  },

  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#222222',
  },

  headerSpace: {
    width: 44,
  },

  iconContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },

  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#F2DDF8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 13,
  },

  icon: {
    color: '#A900E8',
    fontSize: 38,
    fontWeight: '400',
    marginTop: -3,
  },

  iconTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#333333',
  },

  iconSubtitle: {
    fontSize: 13,
    color: '#888888',
    marginTop: 5,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 9,
    marginTop: 5,
  },

  input: {
    height: 56,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 15,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#222222',
  },

  inputError: {
    borderColor: '#E84D4D',
  },

  errorText: {
    color: '#E84D4D',
    fontSize: 12,
    marginTop: 6,
    marginBottom: 2,
  },

  horizontalList: {
    paddingBottom: 5,
  },

  categoryButton: {
    height: 42,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  categoryButtonSelected: {
    backgroundColor: '#A900E8',
    borderColor: '#A900E8',
  },

  categoryButtonText: {
    fontSize: 13,
    color: '#666666',
    fontWeight: '600',
  },

  categoryButtonTextSelected: {
    color: '#FFFFFF',
  },

  timeContainer: {
    height: 56,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  timeIcon: {
    fontSize: 20,
    marginRight: 10,
  },

  timeInput: {
    flex: 1,
    height: 56,
    fontSize: 15,
    color: '#222222',
  },

  priorityContainer: {
    flexDirection: 'row',
    gap: 8,
  },

  priorityButton: {
    flex: 1,
    height: 48,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E2E2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  priorityButtonSelected: {
    borderColor: '#A900E8',
    backgroundColor: '#FAF2FD',
  },

  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 7,
  },

  priorityHigh: {
    backgroundColor: '#E84D4D',
  },

  priorityMedium: {
    backgroundColor: '#F0A52B',
  },

  priorityLow: {
    backgroundColor: '#4CBF76',
  },

  priorityText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '600',
  },

  priorityTextSelected: {
    color: '#A900E8',
    fontWeight: '700',
  },

  infoCard: {
    backgroundColor: '#F7EAFB',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 20,
  },

  infoIcon: {
    fontSize: 20,
    marginRight: 10,
  },

  infoText: {
    flex: 1,
    color: '#76517D',
    fontSize: 12,
    lineHeight: 18,
  },

  createButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#A900E8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  cancelButton: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },

  cancelButtonText: {
    color: '#888888',
    fontSize: 14,
    fontWeight: '600',
  },
});