import React, { Dispatch, SetStateAction } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
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

type TasksScreenProps = {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  onBack: () => void;
  onAddTask: () => void;
};

export default function TasksScreen({
  tasks,
  setTasks,
  onBack,
  onAddTask,
}: TasksScreenProps) {
  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

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

  const deleteTask = (id: number) => {
    Alert.alert(
      'Удалить задачу?',
      'Эта задача будет удалена.',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: () => {
            setTasks((currentTasks) =>
              currentTasks.filter(
                (task) => task.id !== id
              )
            );
          },
        },
      ]
    );
  };

  const getPriorityText = (
    priority: Task['priority']
  ) => {
    if (priority === 'high') {
      return 'Высокий';
    }

    if (priority === 'medium') {
      return 'Средний';
    }

    return 'Низкий';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
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

          <View style={styles.headerTitleContainer}>
            <Text style={styles.title}>
              Мои задачи
            </Text>

            <Text style={styles.subtitle}>
              {completedTasks} из {tasks.length} выполнено
            </Text>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={onAddTask}
            activeOpacity={0.8}
          >
            <Text style={styles.addButtonText}>
              +
            </Text>
          </TouchableOpacity>
        </View>

        {/* ПРОГРЕСС */}

        <View style={styles.progressCard}>
          <View>
            <Text style={styles.progressTitle}>
              Выполнение
            </Text>

            <Text style={styles.progressText}>
              {tasks.length === 0
                ? 'Нет задач'
                : `${Math.round(
                    (completedTasks / tasks.length) * 100
                  )}% выполнено`}
            </Text>
          </View>

          <View style={styles.progressCircle}>
            <Text style={styles.progressPercent}>
              {tasks.length === 0
                ? 0
                : Math.round(
                    (completedTasks / tasks.length) * 100
                  )}
              %
            </Text>
          </View>
        </View>

        {/* ЗАГОЛОВОК */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Все задачи
          </Text>

          <Text style={styles.taskCount}>
            {tasks.length}
          </Text>
        </View>

        {/* СПИСОК */}

        {tasks.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>
              📝
            </Text>

            <Text style={styles.emptyTitle}>
              Задач пока нет
            </Text>

            <Text style={styles.emptyText}>
              Нажмите «+», чтобы добавить первую
              задачу
            </Text>

            <TouchableOpacity
              style={styles.emptyButton}
              onPress={onAddTask}
              activeOpacity={0.8}
            >
              <Text style={styles.emptyButtonText}>
                Добавить задачу
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          tasks.map((task) => (
            <View
              key={task.id}
              style={[
                styles.taskCard,
                task.completed &&
                  styles.taskCardCompleted,
              ]}
            >
              {/* CHECKBOX */}

              <TouchableOpacity
                style={[
                  styles.checkbox,
                  task.completed &&
                    styles.checkboxCompleted,
                ]}
                onPress={() => toggleTask(task.id)}
                activeOpacity={0.8}
              >
                {task.completed && (
                  <Text style={styles.check}>
                    ✓
                  </Text>
                )}
              </TouchableOpacity>

              {/* ИНФОРМАЦИЯ */}

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

                <View style={styles.details}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>
                      {task.category}
                    </Text>
                  </View>

                  <Text style={styles.time}>
                    🕐 {task.time}
                  </Text>
                </View>

                <View style={styles.bottomInfo}>
                  <View
                    style={[
                      styles.priorityDot,
                      task.priority === 'high' &&
                        styles.priorityHigh,
                      task.priority === 'medium' &&
                        styles.priorityMedium,
                      task.priority === 'low' &&
                        styles.priorityLow,
                    ]}
                  />

                  <Text style={styles.priorityText}>
                    Приоритет:{' '}
                    {getPriorityText(task.priority)}
                  </Text>
                </View>
              </View>

              {/* УДАЛЕНИЕ */}

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() =>
                  deleteTask(task.id)
                }
                activeOpacity={0.7}
              >
                <Text style={styles.deleteText}>
                  ×
                </Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* НИЖНЯЯ КНОПКА */}

      <TouchableOpacity
        style={styles.bottomAddButton}
        onPress={onAddTask}
        activeOpacity={0.8}
      >
        <Text style={styles.bottomAddIcon}>
          +
        </Text>

        <Text style={styles.bottomAddText}>
          Новая задача
        </Text>
      </TouchableOpacity>
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
    paddingBottom: 120,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
    color: '#333333',
    lineHeight: 35,
    marginTop: -3,
  },

  headerTitleContainer: {
    flex: 1,
    marginLeft: 14,
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#222222',
  },

  subtitle: {
    fontSize: 12,
    color: '#888888',
    marginTop: 3,
  },

  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#A900E8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '400',
    marginTop: -2,
  },

  progressCard: {
    backgroundColor: '#A900E8',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },

  progressTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },

  progressText: {
    color: '#F1D9FA',
    fontSize: 13,
    marginTop: 7,
  },

  progressCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 5,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  progressPercent: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 13,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#222222',
  },

  taskCount: {
    marginLeft: 8,
    minWidth: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: '#F0DDF7',
    color: '#A900E8',
    textAlign: 'center',
    paddingTop: 4,
    fontSize: 12,
    fontWeight: '700',
  },

  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  taskCardCompleted: {
    opacity: 0.75,
  },

  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#D0D0D0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
    marginTop: 2,
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
    lineHeight: 20,
  },

  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#999999',
  },

  details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 9,
  },

  categoryBadge: {
    backgroundColor: '#F7E8FC',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  categoryText: {
    color: '#A900E8',
    fontSize: 11,
    fontWeight: '700',
  },

  time: {
    fontSize: 11,
    color: '#888888',
    marginLeft: 10,
  },

  bottomInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  priorityDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 6,
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
    fontSize: 10,
    color: '#999999',
  },

  deleteButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFF0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },

  deleteText: {
    color: '#E84D4D',
    fontSize: 23,
    lineHeight: 25,
    fontWeight: '400',
  },

  empty: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginTop: 10,
  },

  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#333333',
  },

  emptyText: {
    fontSize: 13,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 7,
    marginBottom: 20,
  },

  emptyButton: {
    backgroundColor: '#A900E8',
    paddingHorizontal: 22,
    height: 46,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  bottomAddButton: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 20,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#A900E8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  bottomAddIcon: {
    color: '#FFFFFF',
    fontSize: 25,
    marginRight: 8,
    marginTop: -2,
  },

  bottomAddText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  bottomSpace: {
    height: 30,
  },
});