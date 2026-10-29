import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';

type ProfileScreenProps = {
  onBack: () => void;
  onLogout: () => void;
};

export default function ProfileScreen({
  onBack,
  onLogout,
}: ProfileScreenProps) {
  const showComingSoon = (name: string) => {
    Alert.alert(
      name,
      'Этот раздел будет доступен в следующей версии приложения.'
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Выйти из аккаунта?',
      'Вы действительно хотите выйти?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Выйти',
          style: 'destructive',
          onPress: onLogout,
        },
      ]
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
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Профиль</Text>

          <View style={styles.headerSpace} />
        </View>

        {/* ПРОФИЛЬ */}

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>К</Text>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.name}>Канат</Text>

            <Text style={styles.city}>
              Алматы, Казахстан
            </Text>

            <Text style={styles.status}>
              Планировщик задач
            </Text>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              showComingSoon('Редактирование профиля')
            }
            activeOpacity={0.8}
          >
            <Text style={styles.editText}>Изменить</Text>
          </TouchableOpacity>
        </View>

        {/* МОЯ АКТИВНОСТЬ */}

        <Text style={styles.sectionTitle}>
          Моя активность
        </Text>

        <View style={styles.activityCard}>
          <View style={styles.activityItem}>
            <View
              style={[
                styles.activityIcon,
                styles.purpleIcon,
              ]}
            >
              <Text style={styles.activityIconText}>
                ✓
              </Text>
            </View>

            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>
                Задачи
              </Text>

              <Text style={styles.activitySubtitle}>
                Управление вашими задачами
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.activityItem}>
            <View
              style={[
                styles.activityIcon,
                styles.greenIcon,
              ]}
            >
              <Text style={styles.activityIconText}>
                ★
              </Text>
            </View>

            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>
                Достижения
              </Text>

              <Text style={styles.activitySubtitle}>
                Ваши результаты и прогресс
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </View>
        </View>

        {/* НАСТРОЙКИ */}

        <Text style={styles.sectionTitle}>
          Настройки
        </Text>

        <View style={styles.settingsCard}>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() =>
              showComingSoon('Уведомления')
            }
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.settingIcon,
                styles.blueIcon,
              ]}
            >
              <Text style={styles.settingIconText}>
                🔔
              </Text>
            </View>

            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>
                Уведомления
              </Text>

              <Text style={styles.settingSubtitle}>
                Напоминания о задачах
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() =>
              showComingSoon('Внешний вид')
            }
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.settingIcon,
                styles.orangeIcon,
              ]}
            >
              <Text style={styles.settingIconText}>
                ☀
              </Text>
            </View>

            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>
                Внешний вид
              </Text>

              <Text style={styles.settingSubtitle}>
                Светлая тема
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() =>
              showComingSoon('Язык')
            }
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.settingIcon,
                styles.pinkIcon,
              ]}
            >
              <Text style={styles.settingIconText}>
                A
              </Text>
            </View>

            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>
                Язык
              </Text>

              <Text style={styles.settingSubtitle}>
                Русский
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* О ПРИЛОЖЕНИИ */}

        <Text style={styles.sectionTitle}>
          О приложении
        </Text>

        <View style={styles.aboutCard}>
          <TouchableOpacity
            style={styles.aboutItem}
            onPress={() =>
              showComingSoon('О приложении')
            }
            activeOpacity={0.7}
          >
            <Text style={styles.aboutTitle}>
              О приложении
            </Text>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity
            style={styles.aboutItem}
            onPress={() =>
              showComingSoon('Помощь')
            }
            activeOpacity={0.7}
          >
            <Text style={styles.aboutTitle}>
              Помощь и поддержка
            </Text>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity
            style={styles.aboutItem}
            onPress={() =>
              showComingSoon('Политика конфиденциальности')
            }
            activeOpacity={0.7}
          >
            <Text style={styles.aboutTitle}>
              Политика конфиденциальности
            </Text>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* ВЫХОД */}

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutIcon}>↪</Text>

          <Text style={styles.logoutText}>
            Выйти из аккаунта
          </Text>
        </TouchableOpacity>

        <Text style={styles.version}>
          Planner v1.0.0
        </Text>

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

  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    marginBottom: 28,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#A900E8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
  },

  profileInfo: {
    flex: 1,
    marginLeft: 13,
  },

  name: {
    fontSize: 18,
    fontWeight: '800',
    color: '#222222',
  },

  city: {
    fontSize: 11,
    color: '#777777',
    marginTop: 3,
  },

  status: {
    fontSize: 10,
    color: '#A900E8',
    marginTop: 4,
    fontWeight: '600',
  },

  editButton: {
    backgroundColor: '#F2DDF8',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  editText: {
    color: '#A900E8',
    fontSize: 10,
    fontWeight: '700',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#222222',
    marginBottom: 12,
  },

  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    marginBottom: 27,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  activityItem: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
  },

  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  purpleIcon: {
    backgroundColor: '#F2DDF8',
  },

  greenIcon: {
    backgroundColor: '#E4F8EC',
  },

  activityIconText: {
    color: '#A900E8',
    fontSize: 17,
    fontWeight: '800',
  },

  activityInfo: {
    flex: 1,
    marginLeft: 12,
  },

  activityTitle: {
    fontSize: 13,
    color: '#333333',
    fontWeight: '700',
  },

  activitySubtitle: {
    fontSize: 10,
    color: '#999999',
    marginTop: 3,
  },

  arrow: {
    color: '#AAAAAA',
    fontSize: 25,
    fontWeight: '300',
  },

  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },

  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    marginBottom: 27,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  settingItem: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
  },

  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  blueIcon: {
    backgroundColor: '#E8F1FF',
  },

  orangeIcon: {
    backgroundColor: '#FFF1D9',
  },

  pinkIcon: {
    backgroundColor: '#FBE8F5',
  },

  settingIconText: {
    fontSize: 17,
  },

  settingInfo: {
    flex: 1,
    marginLeft: 12,
  },

  settingTitle: {
    fontSize: 13,
    color: '#333333',
    fontWeight: '700',
  },

  settingSubtitle: {
    fontSize: 10,
    color: '#999999',
    marginTop: 3,
  },

  aboutCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  aboutItem: {
    minHeight: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  aboutTitle: {
    fontSize: 13,
    color: '#444444',
    fontWeight: '600',
  },

  logoutButton: {
    height: 54,
    borderRadius: 15,
    backgroundColor: '#FFF0F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },

  logoutIcon: {
    color: '#E84D4D',
    fontSize: 22,
    marginRight: 8,
  },

  logoutText: {
    color: '#E84D4D',
    fontSize: 14,
    fontWeight: '700',
  },

  version: {
    textAlign: 'center',
    color: '#BBBBBB',
    fontSize: 10,
    marginTop: 15,
  },

  bottomSpace: {
    height: 20,
  },
});