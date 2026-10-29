import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import TasksScreen from './tasks/TasksScreen';
import AddTaskScreen from './tasks/AddTaskScreen';
import CalendarScreen from './calendar/CalendarScreen';
import StatisticsScreen from './statistics/StatisticsScreen';
import ProfileScreen from './profile/ProfileScreen';

type Task = {
  id: number;
  title: string;
  category: string;
  time: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  date: string;
};

type HomeScreenProps = {
  userName: string;
  city: string;
  onLogout: () => void;
};

type Page =
  | 'home'
  | 'tasks'
  | 'add'
  | 'calendar'
  | 'statistics'
  | 'profile';

export default function HomeScreen({
  userName,
  city,
  onLogout,
}: HomeScreenProps) {
  const [page, setPage] = useState<Page>('home');

  /*
   * Все задачи приложения хранятся здесь.
   *
   * Позже другие экраны получают эти задачи
   * через props. Поэтому нам не придётся
   * создавать новую систему задач для каждого экрана.
   */

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Сделать домашнее задание',
      category: 'Учёба',
      time: '16:00',
      completed: true,
      priority: 'high',
      date: '2026-10-08',
    },
    {
      id: 2,
      title: 'Изучить React Native',
      category: 'Учёба',
      time: '19:00',
      completed: false,
      priority: 'high',
      date: '2026-10-08',
    },
    {
      id: 3,
      title: 'Позвонить другу',
      category: 'Личное',
      time: '20:00',
      completed: false,
      priority: 'medium',
      date: '2026-10-08',
    },
  ]);

  /*
   * Выполнено задач
   */

  const completedTasks = useMemo(() => {
    return tasks.filter((task) => task.completed).length;
  }, [tasks]);

  /*
   * Процент выполнения
   */

  const progress = useMemo(() => {
    if (tasks.length === 0) {
      return 0;
    }

    return Math.round(
      (completedTasks / tasks.length) * 100
    );
  }, [tasks.length, completedTasks]);

  /*
   * Переключение выполнения задачи
   */

  const toggleTask = (id: number) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  /*
   * Текущая дата
   */

  const today = new Date();

  const day = today.getDate();

  const monthNames = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];

  const month = monthNames[today.getMonth()];

  /*
   * Если открыта другая страница,
   * показываем её вместо главной.
   */

  if (page === 'tasks') {
    return (
      <TasksScreen
        tasks={tasks}
        setTasks={setTasks}
        onBack={() => setPage('home')}
        onAddTask={() => setPage('add')}
      />
    );
  }

  if (page === 'add') {
    return (
      <AddTaskScreen
        tasks={tasks}
        setTasks={setTasks}
        onBack={() => setPage('home')}
      />
    );
  }

  if (page === 'calendar') {
    return (
      <CalendarScreen
        tasks={tasks}
        onBack={() => setPage('home')}
      />
    );
  }

  if (page === 'statistics') {
    return (
      <StatisticsScreen
        tasks={tasks}
        onBack={() => setPage('home')}
      />
    );
  }

  if (page === 'profile') {
    return (
     <ProfileScreen
     onBack={() => setPage('home')}
     onLogout={onLogout}
/>
    );
  }

  /*
   * ГЛАВНАЯ СТРАНИЦА
   */

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <View>
            <Text style={styles.smallText}>
              Сегодня
            </Text>

            <Text style={styles.date}>
              {day} {month}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => setPage('profile')}
            activeOpacity={0.8}
          >
            <Text style={styles.profileLetter}>
              {userName.charAt(0).toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ПРИВЕТСТВИЕ */}

        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>
            Добрый день,
          </Text>

          <Text style={styles.userName}>
            {userName} 👋
          </Text>

          <Text style={styles.greetingDescription}>
            Давайте сделаем сегодняшний день
            продуктивным.
          </Text>
        </View>

        {/* ПРОГРЕСС */}

        <View style={styles.progressCard}>
          <View style={styles.progressTop}>
            <View>
              <Text style={styles.progressTitle}>
                Прогресс на сегодня
              </Text>

              <Text style={styles.progressSubtitle}>
                {completedTasks} из {tasks.length} задач
                выполнено
              </Text>
            </View>

            <Text style={styles.progressPercent}>
              {progress}%
            </Text>
          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${progress}%`,
                },
              ]}
            />
          </View>
        </View>

        {/* ЗАГОЛОВОК ЗАДАЧ */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Задачи на сегодня
          </Text>

          <TouchableOpacity
            onPress={() => setPage('tasks')}
          >
            <Text style={styles.viewAll}>
              Все
            </Text>
          </TouchableOpacity>
        </View>

        {/* ЗАДАЧИ */}

        {tasks.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>
              📝
            </Text>

            <Text style={styles.emptyTitle}>
              Пока нет задач
            </Text>

            <Text style={styles.emptyText}>
              Добавьте первую задачу на сегодня
            </Text>
          </View>
        ) : (
          tasks.slice(0, 4).map((task) => (
            <TouchableOpacity
              key={task.id}
              style={styles.taskCard}
              onPress={() => toggleTask(task.id)}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.checkbox,
                  task.completed &&
                    styles.checkboxCompleted,
                ]}
              >
                {task.completed && (
                  <Text style={styles.check}>
                    ✓
                  </Text>
                )}
              </View>

              <View style={styles.taskInfo}>
                <Text
                  style={[
                    styles.taskTitle,
                    task.completed &&
                      styles.taskTitleCompleted,
                  ]}
                >
                  {task.title}
                </Text>

                <View style={styles.taskDetails}>
                  <Text style={styles.category}>
                    {task.category}
                  </Text>

                  <Text style={styles.dot}>
                    •
                  </Text>

                  <Text style={styles.time}>
                    {task.time}
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.priority,
                  task.priority === 'high' &&
                    styles.priorityHigh,
                  task.priority === 'medium' &&
                    styles.priorityMedium,
                  task.priority === 'low' &&
                    styles.priorityLow,
                ]}
              />
            </TouchableOpacity>
          ))
        )}

        {/* БЫСТРЫЕ ДЕЙСТВИЯ */}

        <Text style={styles.sectionTitle}>
          Быстрые действия
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => setPage('add')}
            activeOpacity={0.8}
          >
            <View style={styles.actionIcon}>
              <Text style={styles.actionIconText}>
                +
              </Text>
            </View>

            <Text style={styles.actionTitle}>
              Новая задача
            </Text>

            <Text style={styles.actionDescription}>
              Добавить задачу
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => setPage('calendar')}
            activeOpacity={0.8}
          >
            <View style={styles.actionIcon}>
              <Text style={styles.actionIconText}>
                📅
              </Text>
            </View>

            <Text style={styles.actionTitle}>
              Календарь
            </Text>

            <Text style={styles.actionDescription}>
              Посмотреть планы
            </Text>
          </TouchableOpacity>
        </View>

        {/* ГОРОД */}

        <View style={styles.cityCard}>
          <Text style={styles.cityIcon}>
            📍
          </Text>

          <View>
            <Text style={styles.cityLabel}>
              Ваш город
            </Text>

            <Text style={styles.cityName}>
              {city}
            </Text>
          </View>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* КНОПКА ДОБАВЛЕНИЯ */}

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setPage('add')}
        activeOpacity={0.8}
      >
        <Text style={styles.floatingButtonText}>
          +
        </Text>
      </TouchableOpacity>

      {/* НИЖНЕЕ МЕНЮ */}

      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setPage('home')}
        >
          <Text style={styles.navIconActive}>
            🏠
          </Text>

          <Text style={styles.navTextActive}>
            Главная
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setPage('tasks')}
        >
          <Text style={styles.navIcon}>
            ✓
          </Text>

          <Text style={styles.navText}>
            Задачи
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setPage('calendar')}
        >
          <Text style={styles.navIcon}>
            📅
          </Text>

          <Text style={styles.navText}>
            Календарь
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setPage('statistics')}
        >
          <Text style={styles.navIcon}>
            📊
          </Text>

          <Text style={styles.navText}>
            Статистика
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setPage('profile')}
        >
          <Text style={styles.navIcon}>
            👤
          </Text>

          <Text style={styles.navText}>
            Профиль
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FA',
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 110,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  smallText: {
    fontSize: 13,
    color: '#888888',
    marginBottom: 3,
  },

  date: {
    fontSize: 21,
    fontWeight: '800',
    color: '#222222',
  },

  profileButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#A900E8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileLetter: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
  },

  greetingContainer: {
    marginTop: 28,
    marginBottom: 22,
  },

  greeting: {
    fontSize: 17,
    color: '#666666',
  },

  userName: {
    fontSize: 30,
    fontWeight: '800',
    color: '#222222',
    marginTop: 2,
  },

  greetingDescription: {
    fontSize: 14,
    color: '#888888',
    marginTop: 7,
    lineHeight: 20,
  },

  progressCard: {
    backgroundColor: '#A900E8',
    borderRadius: 22,
    padding: 20,
    marginBottom: 28,
  },

  progressTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },

  progressTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  progressSubtitle: {
    color: '#F1D9FA',
    fontSize: 13,
    marginTop: 5,
  },

  progressPercent: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },

  progressBackground: {
    height: 8,
    backgroundColor: '#C94EF1',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 13,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#222222',
    marginBottom: 13,
  },

  viewAll: {
    color: '#A900E8',
    fontSize: 14,
    fontWeight: '700',
  },

  taskCard: {
    minHeight: 75,
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#D0D0D0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  checkboxCompleted: {
    backgroundColor: '#A900E8',
    borderColor: '#A900E8',
  },

  check: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  taskInfo: {
    flex: 1,
  },

  taskTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333333',
  },

  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#999999',
  },

  taskDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },

  category: {
    fontSize: 12,
    color: '#A900E8',
    fontWeight: '600',
  },

  dot: {
    fontSize: 12,
    color: '#BBBBBB',
    marginHorizontal: 6,
  },

  time: {
    fontSize: 12,
    color: '#888888',
  },

  priority: {
    width: 7,
    height: 34,
    borderRadius: 5,
    marginLeft: 10,
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

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 30,
    alignItems: 'center',
    marginBottom: 28,
  },

  emptyIcon: {
    fontSize: 35,
    marginBottom: 10,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#333333',
  },

  emptyText: {
    color: '#888888',
    fontSize: 13,
    marginTop: 5,
  },

  actions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },

  actionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F7E8FC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  actionIconText: {
    color: '#A900E8',
    fontSize: 25,
    fontWeight: '700',
  },

  actionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333333',
  },

  actionDescription: {
    fontSize: 11,
    color: '#999999',
    marginTop: 4,
  },

  cityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  cityIcon: {
    fontSize: 24,
    marginRight: 12,
  },

  cityLabel: {
    fontSize: 12,
    color: '#999999',
  },

  cityName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333333',
    marginTop: 3,
  },

  bottomSpace: {
    height: 20,
  },

  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 83,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#A900E8',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  floatingButtonText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '400',
    marginTop: -2,
  },

  bottomNavigation: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 5,
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  navIcon: {
    fontSize: 18,
    color: '#888888',
    marginBottom: 3,
  },

  navIconActive: {
    fontSize: 18,
    color: '#A900E8',
    marginBottom: 3,
  },

  navText: {
    fontSize: 9,
    color: '#888888',
  },

  navTextActive: {
    fontSize: 9,
    color: '#A900E8',
    fontWeight: '700',
  },
});