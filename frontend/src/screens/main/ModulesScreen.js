import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState, useContext } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import { ErrorMessage, Loading } from '../../components/common';
import { Header } from '../../components/layout';
import { ModuleCard } from '../../components/recommendation';
import { RecommendationContext } from '../../context/RecommendationContext'; 
import { ThemeContext } from '../../context/ThemeContext';

const ModulesScreen = ({ navigation }) => {
  const { popularModules, isLoading, loadPopularModules, rateModule } = useContext(RecommendationContext);
  const { theme } = useContext(ThemeContext);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredModules, setFilteredModules] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        await loadPopularModules();
      } catch (err) {
        setError('Failed to load modules');
      }
    };
    fetchModules();
  }, []);

  useEffect(() => {
    if (popularModules) {
      const filtered = popularModules.filter(module =>
        (module.title && module.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (module.code && module.code.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredModules(filtered);
    }
  }, [searchQuery, popularModules]);
  const handleQuickRate = (module) => {
    Alert.alert(
      `Taux ${module.code}`,
      'Ce module vous a-t-il plu ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: '👎 Je n aime pas ', onPress: () => rateModule(module.module_id, 1, 'Détestation rapide') },
        { text: '⭐ j aime', onPress: () => rateModule(module.module_id, 5, 'Rapide comme') },
      ]
    );
  };

  if (isLoading && filteredModules.length === 0) {
    return <Loading message="Chargement du catalogue..." />;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header
        title="Catalogue des modules"
        onMenuPress={() => navigation.toggleDrawer()}
      />

      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.subtitle, { color: theme.colors.gray }]}>
          Découvrez et notez les modules pour obtenir de meilleures recommandations.
        </Text>
      </View>
      <View style={[styles.searchContainer, { backgroundColor: theme.colors.card }]}>
        <Ionicons name="search" size={20} color={theme.colors.gray} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: theme.colors.text }]}
          placeholder="Rechercher par code ou titre..."
          placeholderTextColor={theme.colors.gray}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={theme.colors.gray} />
          </TouchableOpacity>
        ) : null}
      </View>

      <ScrollView style={styles.content}>
        {error && <ErrorMessage message={error} />}

        <View style={styles.stats}>
          <Text style={[styles.statsText, { color: theme.colors.gray }]}>
            {filteredModules.length} module(s) trouvés
          </Text>
        </View>

        <View style={styles.modulesList}>
          {filteredModules.map((module) => (
            <View key={module.module_id} style={{ position: 'relative' }}>
              <ModuleCard
                module={module}
                onPress={() => navigation.navigate('Modules', { screen: 'ModuleDetail', params: { moduleId: module.module_id } })}
              />
              <TouchableOpacity 
                style={styles.quickRateButton}
                onPress={() => handleQuickRate(module)}
              >
                <Ionicons name="star-outline" size={20} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {filteredModules.length === 0 && !error && (
          <View style={styles.emptyState}>
            <Ionicons name="book-outline" size={64} color={theme.colors.gray} />
            <Text style={[styles.emptyText, { color: theme.colors.text }]}>Aucun module trouvé</Text>
          </View>
        )}
        <View style={{height: 40}} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, paddingTop: 10 },
  subtitle: { fontSize: 14 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 2,
  },
  searchIcon: { marginRight: 12 },
  searchInput: { flex: 1, fontSize: 16 },
  content: { flex: 1, padding: 16 },
  stats: { marginBottom: 16 },
  statsText: { fontSize: 14, fontStyle: 'italic' },
  modulesList: { gap: 12 },
  emptyState: { alignItems: 'center', justifyContent: 'center', padding: 40 },
  emptyText: { fontSize: 18, marginTop: 16, fontWeight: '500' },
  quickRateButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 8,
    borderRadius: 20,
    elevation: 5,
    zIndex: 10
  }
});

export default ModulesScreen;