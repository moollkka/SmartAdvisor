import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';
import { RecommendationContext } from '../../context/RecommendationContext';
import Card from '../../components/common/Card';
import Loading from '../../components/common/Loading';
import ModuleCard from '../../components/recommendation/ModuleCard';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const { theme, themeMode } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const {
    recommendations,
    popularModules,
    isLoading,
    loadRecommendations,
    loadPopularModules,
  } = useContext(RecommendationContext);
  
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    if (isLoading && !refreshing) return;
    
    try {
      await Promise.all([
        loadRecommendations(),
        loadPopularModules(),
      ]);
    } catch (error) {
      console.error("Erreur d'actualisation du tableau de bord :", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadInitialData();
    setRefreshing(false);
  };
  if (isLoading && !refreshing && recommendations.length === 0) {
    return <Loading />;
  }
  const displayName = user?.prenom ? `${user.prenom} ${user.nom}` : user?.name || 'Student';
  const displayField = user?.specialite || user?.field || 'General';
  const displayLevel = user?.niveau || user?.level || '';

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} />
      <ScrollView
        style={[styles.container]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary} 
          />
        }
      >
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: theme.colors.text }]}>
              Salut, {user?.prenom || 'Student'}! 👋
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.gray }]}>
              {displayField} {displayLevel ? `• ${displayLevel}` : ''}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.profileButton, { backgroundColor: theme.colors.card }]}
            onPress={() => navigation.openDrawer ? navigation.openDrawer() : navigation.navigate('Profile')}
          >
         <Ionicons name="person" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.statsContainer}>
          <Card style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(255, 193, 7, 0.2)' }]}>
              <Ionicons name="star" size={20} color="#FFC107" />
            </View>
            <View>
              <Text style={[styles.statNumber, { color: theme.colors.text }]}>
                {recommendations?.length || 0}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.gray }]}>
                Pour toi
              </Text>
            </View>
          </Card>
          
          <Card style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(76, 175, 80, 0.2)' }]}>
              <Ionicons name="trending-up" size={20} color="#4CAF50" />
            </View>
            <View>
              <Text style={[styles.statNumber, { color: theme.colors.text }]}>
                {popularModules?.length || 0}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.gray }]}>
                Tendances
              </Text>
            </View>
          </Card>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Recommender pour toi
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Recommendations')}>
              <Text style={{ color: theme.colors.primary, fontWeight: '600' }}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          
          {recommendations && recommendations.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScroll}
            >
              {recommendations.slice(0, 5).map((module) => (
                <ModuleCard
                  key={module.module_id || module.id}
                  module={module}
                  onPress={() => navigation.navigate('Modules', { screen: 'ModuleDetail', params: { moduleId: module.module_id || module.id }})}
                  style={styles.moduleCard}
                />
              ))}
            </ScrollView>
          ) : (
            <Card style={[styles.emptyCard, { backgroundColor: theme.colors.card }]}>
              <Ionicons name="school-outline" size={40} color={theme.colors.gray} />
              <Text style={[styles.emptyText, { color: theme.colors.text }]}>
               Commencez à évaluer les modules !
              </Text>
              <Text style={[styles.emptySubtext, { color: theme.colors.gray }]}>
                Nous avons besoin de vos préférences pour vous suggérer les meilleurs modules.
              </Text>
              <TouchableOpacity 
                style={[styles.emptyButton, { backgroundColor: theme.colors.primary }]}
                onPress={() => navigation.navigate('Modules')}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Parcourir les modules</Text>
              </TouchableOpacity>
            </Card>
          )}
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Populaire maintenant
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Modules')}>
              <Text style={{ color: theme.colors.primary, fontWeight: '600' }}>voir tous</Text>
            </TouchableOpacity>
          </View>
          
          {popularModules && popularModules.length > 0 ? (
            <View style={styles.popularContainer}>
              {popularModules.slice(0, 5).map((module, index) => (
                <TouchableOpacity
                  key={module.module_id || module.id}
                  style={[
                    styles.popularItem,
                    { backgroundColor: theme.colors.card },
                    index !== popularModules.length - 1 && { borderBottomWidth: 1, borderBottomColor: theme.colors.border }
                  ]}
                  onPress={() => navigation.navigate('Modules', { screen: 'ModuleDetail', params: { moduleId: module.module_id || module.id }})}
                >
                  <View style={styles.popularRank}>
                    <Text style={[styles.rankText, { color: theme.colors.primary }]}>
                      #{index + 1}
                    </Text>
                  </View>
                  <View style={styles.popularContent}>
                    <Text
                      style={[styles.popularTitle, { color: theme.colors.text }]}
                      numberOfLines={1}
                    >
                      {module.code} {module.title}
                    </Text>
                    <View style={styles.popularMeta}>
                      <Text style={[styles.popularMetaText, { color: theme.colors.gray }]}>
                        {module.credits} Credits • {module.difficulty || 'Medium'}
                      </Text>
                      <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={14} color="#FFC107" />
                        <Text style={[styles.ratingText, { color: theme.colors.text }]}>
                          {module.average_rating ? module.average_rating.toFixed(1) : 'N/A'}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={theme.colors.gray} />
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text style={{ textAlign: 'center', color: theme.colors.gray, marginTop: 10 }}>Chargement des modules populaires...</Text>
          )}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 6,
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  horizontalScroll: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  moduleCard: {
    width: 260,
    marginRight: 15,
  },
  emptyCard: {
    marginHorizontal: 20,
    padding: 25,
    alignItems: 'center',
    borderRadius: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  emptySubtext: {
    fontSize: 13,
    marginTop: 5,
    textAlign: 'center',
    marginBottom: 15,
  },
  emptyButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 5,
  },
  popularContainer: {
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  popularItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  popularRank: {
    width: 30,
    alignItems: 'center',
    marginRight: 10,
  },
  rankText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  popularContent: {
    flex: 1,
    marginRight: 10,
  },
  popularTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  popularMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularMetaText: {
    fontSize: 12,
    marginRight: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 3,
  },
});

export default DashboardScreen;