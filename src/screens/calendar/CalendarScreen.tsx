import React, { useMemo, useState } from 'react';
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

type CalendarScreenProps = {
  tasks: Task[];
  onBack: () => void;
};

const monthNames = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const weekDays = [
  'Пн',
  'Вт',
  'Ср',
  'Чт',
  'Пт',
  'Сб',
  'Вс',
];

export default function CalendarScreen({
  tasks,
  onBack,
}: CalendarScreenProps) {
  const today = new Date();

  const [selectedDate, setSelectedDate] =
    useState(today.getDate());

  const [month, setMonth] = useState(
    today.getMonth()
  );

  const [year, setYear] = useState(
    today.getFullYear()
  );

  /*
   * Первый день месяца.
   *
   * В JavaScript:
   * 0 = воскресенье
   * 1 = понедельник
   *
   * Нам нужен календарь с понедельника.
   */

  const firstDay = new Date(
    year,
    month,
    1
  ).getDay();

  const firstDayMonday =
    firstDay === 0 ? 6 : firstDay - 1;

  /*
   * Количество дней в месяце.
   */

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  /*
   * Создаём клетки календаря.
   */

  const calendarDays = useMemo(() => {
    const days: (
      | number
      | null
    )[] = [];

    for (let i = 0; i < firstDayMonday; i++) {
      days.push(null);
    }

    for (
      let day = 1;
      day <= daysInMonth;
      day++
    ) {
      days.push(day);
    }

    return days;
  }, [firstDayMonday, daysInMonth]);

  /*
   * Формируем дату в формате:
   * YYYY-MM-DD
   */

  const getDateString = (day: number) => {
    const currentMonth = String(
      month + 1
    ).padStart(2, '0');

    const currentDay = String(day).padStart(
      2,
      '0'
    );

    return `${year}-${currentMonth}-${currentDay}`;
  };

  /*
   * Задачи выбранного дня.
   */

  const selectedDateString =
    getDateString(selectedDate);

  const selectedTasks = tasks.filter(
    (task) =>
      task.date === selectedDateString
  );

  /*
   * Есть ли задачи в конкретный день.
   */

  const hasTasks = (day: number) => {
    const date = getDateString(day);

    return tasks.some(
      (task) => task.date === date
    );
  };

  /*
   * Перейти на предыдущий месяц.
   */

  const previousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }

    setSelectedDate(1);
  };

  /*
   * Перейти на следующий месяц.
   */

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }

    setSelectedDate(1);
  };

  /*
   * Вернуться к сегодняшнему дню.
   */

  const goToday = () => {
    setMonth(today.getMonth());
    setYear(today.getFullYear());
    setSelectedDate(today.getDate());
  };

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
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

          <Text style={styles.title}>
            Календарь
          </Text>

          <TouchableOpacity
            style={styles.todayButton}
            onPress={goToday}
            activeOpacity={0.8}
          >
            <Text style={styles.todayText}>
              Сегодня
            </Text>
          </TouchableOpacity>
        </View>

        {/* МЕСЯЦ */}

        <View style={styles.monthHeader}>
          <TouchableOpacity
            style={styles.monthArrow}
            onPress={previousMonth}
          >
            <Text style={styles.arrowText}>
              ‹
            </Text>
          </TouchableOpacity>

          <View style={styles.monthCenter}>
            <Text style={styles.monthTitle}>
              {monthNames[month]}
            </Text>

            <Text style={styles.year}>
              {year}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.monthArrow}
            onPress={nextMonth}
          >
            <Text
              style={[
                styles.arrowText,
                styles.rightArrow,
              ]}
            >
              ›
            </Text>
          </TouchableOpacity>
        </View>

        {/* КАЛЕНДАРЬ */}

        <View style={styles.calendarCard}>
          {/* ДНИ НЕДЕЛИ */}

          <View style={styles.weekRow}>
            {weekDays.map((day) => (
              <View
                key={day}
                style={styles.weekDay}
              >
                <Text
                  style={[
                    styles.weekDayText,
                    (day === 'Сб' ||
                      day === 'Вс') &&
                      styles.weekendText,
                  ]}
                >
                  {day}
                </Text>
              </View>
            ))}
          </View>

          {/* ЧИСЛА */}

          <View style={styles.daysGrid}>
            {calendarDays.map(
              (day, index) => {
                if (day === null) {
                  return (
                    <View
                      key={`empty-${index}`}
                      style={styles.dayCell}
                    />
                  );
                }

                const selected =
                  selectedDate === day;

                const todayDay =
                  isToday(day);

                const dayHasTasks =
                  hasTasks(day);

                return (
                  <TouchableOpacity
                    key={day}
                    style={styles.dayCell}
                    onPress={() =>
                      setSelectedDate(day)
                    }
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.dayCircle,
                        selected &&
                          styles.selectedDay,
                        todayDay &&
                          !selected &&
                          styles.todayDay,
                      ]}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          selected &&
                            styles.selectedDayText,
                          todayDay &&
                            !selected &&
                            styles.todayDayText,
                        ]}
                      >
                        {day}
                      </Text>
                    </View>

                    {dayHasTasks && (
                      <View
                        style={styles.taskDot}
                      />
                    )}
                  </TouchableOpacity>
                );
              }
            )}
          </View>
        </View>

        {/* ВЫБРАННАЯ ДАТА */}

        <View style={styles.selectedHeader}>
          <View>
            <Text style={styles.selectedLabel}>
              Выбранный день
            </Text>

            <Text style={styles.selectedTitle}>
              {selectedDate}{' '}
              {monthNames[month].toLowerCase()}
            </Text>
          </View>

          <View style={styles.taskNumber}>
            <Text style={styles.taskNumberText}>
              {selectedTasks.length}
            </Text>

            <Text style={styles.taskNumberLabel}>
              задач
            </Text>
          </View>
        </View>

        {/* ЗАДАЧИ */}

        {selectedTasks.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>
              📅
            </Text>

            <Text style={styles.emptyTitle}>
              Нет задач
            </Text>

            <Text style={styles.emptyText}>
              На этот день задач не запланировано
            </Text>
          </View>
        ) : (
          selectedTasks.map((task) => (
            <View
              key={task.id}
              style={styles.taskCard}
            >
              <View
                style={[
                  styles.status,
                  task.completed &&
                    styles.statusCompleted,
                ]}
              />

              <View style={styles.taskInfo}>
                <Text
                  style={[
                    styles.taskTitle,
                    task.completed &&
                      styles.completedTitle,
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

              {task.completed && (
                <Text style={styles.check}>
                  ✓
                </Text>
              )}
            </View>
          ))
        )}

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
    fontSize: 23,
    fontWeight: '800',
    color: '#222222',
  },

  todayButton: {
    paddingHorizontal: 12,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F2DDF8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  todayText: {
    color: '#A900E8',
    fontSize: 12,
    fontWeight: '700',
  },

  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  monthArrow: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  arrowText: {
    color: '#333333',
    fontSize: 30,
    lineHeight: 34,
    marginTop: -2,
  },

  rightArrow: {
    marginLeft: 2,
  },

  monthCenter: {
    alignItems: 'center',
  },

  monthTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#222222',
  },

  year: {
    fontSize: 13,
    color: '#888888',
    marginTop: 3,
  },

  calendarCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    marginBottom: 28,
  },

  weekRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },

  weekDay: {
    flex: 1,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },

  weekDayText: {
    fontSize: 11,
    color: '#777777',
    fontWeight: '700',
  },

  weekendText: {
    color: '#A900E8',
  },

  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  dayCell: {
    width: '14.2857%',
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  selectedDay: {
    backgroundColor: '#A900E8',
  },

  todayDay: {
    backgroundColor: '#F2DDF8',
  },

  dayText: {
    fontSize: 13,
    color: '#333333',
    fontWeight: '600',
  },

  selectedDayText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  todayDayText: {
    color: '#A900E8',
    fontWeight: '800',
  },

  taskDot: {
    position: 'absolute',
    bottom: 2,
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#A900E8',
  },

  selectedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 13,
  },

  selectedLabel: {
    fontSize: 12,
    color: '#999999',
  },

  selectedTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#222222',
    marginTop: 3,
  },

  taskNumber: {
    minWidth: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#F2DDF8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  taskNumberText: {
    color: '#A900E8',
    fontSize: 18,
    fontWeight: '800',
  },

  taskNumberLabel: {
    color: '#9A70A4',
    fontSize: 9,
    marginTop: 1,
  },

  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  status: {
    width: 6,
    height: 42,
    borderRadius: 4,
    backgroundColor: '#A900E8',
    marginRight: 13,
  },

  statusCompleted: {
    backgroundColor: '#4CBF76',
  },

  taskInfo: {
    flex: 1,
  },

  taskTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333333',
  },

  completedTitle: {
    color: '#999999',
    textDecorationLine: 'line-through',
  },

  taskDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },

  category: {
    color: '#A900E8',
    fontSize: 11,
    fontWeight: '700',
  },

  dot: {
    color: '#BBBBBB',
    marginHorizontal: 6,
    fontSize: 11,
  },

  time: {
    color: '#888888',
    fontSize: 11,
  },

  check: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E9F8EF',
    color: '#2EAD63',
    textAlign: 'center',
    paddingTop: 4,
    fontSize: 16,
    fontWeight: '800',
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 30,
    alignItems: 'center',
  },

  emptyIcon: {
    fontSize: 38,
    marginBottom: 10,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#333333',
  },

  emptyText: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'center',
    marginTop: 6,
  },

  bottomSpace: {
    height: 20,
  },
});