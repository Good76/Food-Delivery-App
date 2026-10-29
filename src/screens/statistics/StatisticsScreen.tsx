import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
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

type StatisticsScreenProps = {
  tasks: Task[];
  onBack: () => void;
};

export default function StatisticsScreen({
  tasks,
  onBack,
}: StatisticsScreenProps) {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const activeTasks = totalTasks - completedTasks;

  const completionPercent =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  const highPriority = tasks.filter(
    (task) => task.priority === 'high'
  ).length;

  const mediumPriority = tasks.filter(
    (task) => task.priority === 'medium'
  ).length;

  const lowPriority = tasks.filter(
    (task) => task.priority === 'low'
  ).length;

  const categories = [
    'Личное',
    'Учёба',
    'Работа',
    'Спорт',
    'Покупки',
  ];

  const categoryData = categories.map(
    (category) => ({
      name: category,
      count: tasks.filter(
        (task) => task.category === category
      ).length,
    })
  );

  const maxCategoryCount = Math.max(
    ...categoryData.map((item) => item.count),
    1
  );

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

          <Text style={styles.title}>
            Статистика
          </Text>

          <View style={styles.headerSpace} />
        </View>

        {/* ГЛАВНАЯ СТАТИСТИКА */}

        <View style={styles.mainCard}>
          <Text style={styles.mainCardTitle}>
            Выполнение задач
          </Text>

          <View style={styles.mainCardContent}>
            <View style={styles.circleContainer}>
              <View style={styles.outerCircle}>
                <View style={styles.innerCircle}>
                  <Text style={styles.percent}>
                    {completionPercent}%
                  </Text>

                  <Text style={styles.percentLabel}>
                    выполнено
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.mainStats}>
              <View style={styles.statLine}>
                <View
                  style={[
                    styles.statDot,
                    styles.purpleDot,
                  ]}
                />

                <Text style={styles.statName}>
                  Всего задач
                </Text>

                <Text style={styles.statValue}>
                  {totalTasks}
                </Text>
              </View>

              <View style={styles.statLine}>
                <View
                  style={[
                    styles.statDot,
                    styles.greenDot,
                  ]}
                />

                <Text style={styles.statName}>
                  Выполнено
                </Text>

                <Text style={styles.statValue}>
                  {completedTasks}
                </Text>
              </View>

              <View style={styles.statLine}>
                <View
                  style={[
                    styles.statDot,
                    styles.orangeDot,
                  ]}
                />

                <Text style={styles.statName}>
                  В процессе
                </Text>

                <Text style={styles.statValue}>
                  {activeTasks}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* ТРИ КАРТОЧКИ */}

        <View style={styles.cardsRow}>
          <View style={styles.smallCard}>
            <View
              style={[
                styles.smallIcon,
                styles.purpleBackground,
              ]}
            >
              <Text style={styles.smallIconText}>
                ✓
              </Text>
            </View>

            <Text style={styles.smallValue}>
              {completedTasks}
            </Text>

            <Text style={styles.smallLabel}>
              Выполнено
            </Text>
          </View>

          <View style={styles.smallCard}>
            <View
              style={[
                styles.smallIcon,
                styles.orangeBackground,
              ]}
            >
              <Text style={styles.smallIconText}>
                ◷
              </Text>
            </View>

            <Text style={styles.smallValue}>
              {activeTasks}
            </Text>

            <Text style={styles.smallLabel}>
              Осталось
            </Text>
          </View>

          <View style={styles.smallCard}>
            <View
              style={[
                styles.smallIcon,
                styles.greenBackground,
              ]}
            >
              <Text style={styles.smallIconText}>
                %
              </Text>
            </View>

            <Text style={styles.smallValue}>
              {completionPercent}%
            </Text>

            <Text style={styles.smallLabel}>
              Результат
            </Text>
          </View>
        </View>

        {/* ПРИОРИТЕТЫ */}

        <Text style={styles.sectionTitle}>
          Приоритеты
        </Text>

        <View style={styles.priorityCard}>
          <View style={styles.priorityRow}>
            <View style={styles.priorityLeft}>
              <View
                style={[
                  styles.priorityDot,
                  styles.highDot,
                ]}
              />

              <Text style={styles.priorityName}>
                Высокий
              </Text>
            </View>

            <Text style={styles.priorityCount}>
              {highPriority}
            </Text>
          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.priorityProgress,
                styles.highProgress,
                {
                  width: `${
                    totalTasks === 0
                      ? 0
                      : (highPriority /
                          totalTasks) *
                        100
                  }%`,
                },
              ]}
            />
          </View>

          <View style={styles.priorityRow}>
            <View style={styles.priorityLeft}>
              <View
                style={[
                  styles.priorityDot,
                  styles.mediumDot,
                ]}
              />

              <Text style={styles.priorityName}>
                Средний
              </Text>
            </View>

            <Text style={styles.priorityCount}>
              {mediumPriority}
            </Text>
          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.priorityProgress,
                styles.mediumProgress,
                {
                  width: `${
                    totalTasks === 0
                      ? 0
                      : (mediumPriority /
                          totalTasks) *
                        100
                  }%`,
                },
              ]}
            />
          </View>

          <View style={styles.priorityRow}>
            <View style={styles.priorityLeft}>
              <View
                style={[
                  styles.priorityDot,
                  styles.lowDot,
                ]}
              />

              <Text style={styles.priorityName}>
                Низкий
              </Text>
            </View>

            <Text style={styles.priorityCount}>
              {lowPriority}
            </Text>
          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.priorityProgress,
                styles.lowProgress,
                {
                  width: `${
                    totalTasks === 0
                      ? 0
                      : (lowPriority /
                          totalTasks) *
                        100
                  }%`,
                },
              ]}
            />
          </View>
        </View>

        {/* КАТЕГОРИИ */}

        <Text style={styles.sectionTitle}>
          Задачи по категориям
        </Text>

        <View style={styles.categoryCard}>
          {categoryData.map((item) => (
            <View
              key={item.name}
              style={styles.categoryRow}
            >
              <View style={styles.categoryNameContainer}>
                <Text style={styles.categoryName}>
                  {item.name}
                </Text>
              </View>

              <View
                style={styles.categoryBarContainer}
              >
                <View
                  style={[
                    styles.categoryBar,
                    {
                      width: `${
                        (item.count /
                          maxCategoryCount) *
                        100
                      }%`,
                    },
                  ]}
                />
              </View>

              <Text style={styles.categoryCount}>
                {item.count}
              </Text>
            </View>
          ))}
        </View>

        {/* МОТИВАЦИЯ */}

        <View style={styles.motivationCard}>
          <Text style={styles.motivationIcon}>
            ⭐
          </Text>

          <View style={styles.motivationContent}>
            <Text style={styles.motivationTitle}>
              Продолжайте в том же духе!
            </Text>

            <Text style={styles.motivationText}>
              Маленькие шаги каждый день
              приводят к большим результатам.
            </Text>
          </View>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
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
    paddingBottom: 30,
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
    fontSize: 23,
    fontWeight: '800',
    color: '#222222',
  },

  headerSpace: {
    width: 44,
  },

  mainCard: {
    backgroundColor: '#A900E8',
    borderRadius: 22,
    padding: 20,
    marginBottom: 15,
  },

  mainCardTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 20,
  },

  mainCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  circleContainer: {
    width: 130,
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
  },

  outerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 9,
    borderColor: '#E6B7F4',
    alignItems: 'center',
    justifyContent: 'center',
  },

  innerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  percent: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '900',
  },

  percentLabel: {
    color: '#F3D8FA',
    fontSize: 10,
    marginTop: 2,
  },

  mainStats: {
    flex: 1,
    marginLeft: 15,
  },

  statLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 13,
  },

  statDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },

  purpleDot: {
    backgroundColor: '#FFFFFF',
  },

  greenDot: {
    backgroundColor: '#73E29D',
  },

  orangeDot: {
    backgroundColor: '#FFC15A',
  },

  statName: {
    flex: 1,
    color: '#F4DCF9',
    fontSize: 12,
  },

  statValue: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  cardsRow: {
    flexDirection: 'row',
    gap: 9,
    marginBottom: 27,
  },

  smallCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  smallIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  purpleBackground: {
    backgroundColor: '#F2DDF8',
  },

  orangeBackground: {
    backgroundColor: '#FFF1D9',
  },

  greenBackground: {
    backgroundColor: '#E4F8EC',
  },

  smallIconText: {
    color: '#A900E8',
    fontSize: 16,
    fontWeight: '800',
  },

  smallValue: {
    fontSize: 18,
    color: '#222222',
    fontWeight: '900',
  },

  smallLabel: {
    fontSize: 10,
    color: '#888888',
    marginTop: 3,
  },

  sectionTitle: {
    fontSize: 18,
    color: '#222222',
    fontWeight: '800',
    marginBottom: 12,
  },

  priorityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 17,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    marginBottom: 25,
  },

  priorityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 7,
  },

  priorityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  priorityDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginRight: 8,
  },

  highDot: {
    backgroundColor: '#E84D4D',
  },

  mediumDot: {
    backgroundColor: '#F0A52B',
  },

  lowDot: {
    backgroundColor: '#4CBF76',
  },

  priorityName: {
    fontSize: 12,
    color: '#555555',
    fontWeight: '600',
  },

  priorityCount: {
    fontSize: 13,
    color: '#333333',
    fontWeight: '800',
  },

  progressBackground: {
    height: 7,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 14,
  },

  priorityProgress: {
    height: '100%',
    borderRadius: 4,
  },

  highProgress: {
    backgroundColor: '#E84D4D',
  },

  mediumProgress: {
    backgroundColor: '#F0A52B',
  },

  lowProgress: {
    backgroundColor: '#4CBF76',
  },

  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 17,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    marginBottom: 25,
  },

  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  categoryNameContainer: {
    width: 65,
  },

  categoryName: {
    fontSize: 11,
    color: '#555555',
    fontWeight: '600',
  },

  categoryBarContainer: {
    flex: 1,
    height: 9,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    overflow: 'hidden',
    marginHorizontal: 10,
  },

  categoryBar: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: '#A900E8',
  },

  categoryCount: {
    width: 20,
    textAlign: 'right',
    fontSize: 12,
    color: '#333333',
    fontWeight: '800',
  },

  motivationCard: {
    backgroundColor: '#F2DDF8',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  motivationIcon: {
    fontSize: 28,
    marginRight: 12,
  },

  motivationContent: {
    flex: 1,
  },

  motivationTitle: {
    color: '#7B268E',
    fontSize: 14,
    fontWeight: '800',
  },

  motivationText: {
    color: '#8D6395',
    fontSize: 11,
    lineHeight: 17,
    marginTop: 4,
  },

  bottomSpace: {
    height: 20,
  },
});