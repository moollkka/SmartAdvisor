import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState, useContext } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
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
  const [ratingLoading, setRatingLoading] = useState(null); 

  useEffect(() => {
    loadPopularModules();
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
  const handleDirectRate = async (module, ratingValue) => {
    if (ratingLoading) return;
        setRatingLoading(module.module_id);
    console.log(`⭐ module d'évaluation ${module.module_id} avec ${ratingValue} étoiles...`);

    try {
      const success = await rateModule(module.module_id, ratingValue, "Évaluation rapide");
      
      if (success) {
        showMessage({
          message: ` module d'évaluation ${ratingValue}/5 Success!`,
          type: "success",
        });
      }
    } catch (e) {
      console.error("Erreur de taux :", e);
    } finally {
      setRatingLoading(null);
    }
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

      <View style={[styles.searchContainer, { backgroundColor: theme.colors.card }]}>
        <Ionicons name="search" size={20} color={theme.colors.gray} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: theme.colors.text }]}
          placeholder="Recherche..."
          placeholderTextColor={theme.colors.gray}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.content}>
        <Text style={[styles.statsText, { color: theme.colors.gray }]}>
          {filteredModules.length} modules trouvés
        </Text>

        <View style={styles.modulesList}>
          {filteredModules.map((module) => (
            <View key={module.module_id} style={[styles.cardWrapper, { backgroundColor: theme.colors.card }]}>
              <TouchableOpacity 
                style={styles.cardContent}
                onPress={() => navigation.navigate('Modules', { screen: 'ModuleDetail', params: { moduleId: module.module_id } })}
              >
                <View style={styles.iconBox}>
                  <Text style={styles.moduleCode}>{module.code}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={[styles.moduleTitle, { color: theme.colors.text }]}>{module.title}</Text>
                  <Text style={[styles.moduleInfo, { color: theme.colors.gray }]}>
                    {module.specialite} • {module.credits} Credits
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={styles.actionRow}>
                {ratingLoading === module.module_id ? (
                  <ActivityIndicator size="small" color={theme.colors.primary} />
                ) : (
                  <>
                    <Text style={{fontSize: 12, color: theme.colors.gray, marginRight: 10}}>Rate this:</Text>
                    <TouchableOpacity 
                      style={[styles.rateBtn, { backgroundColor: '#FFEBEE' }]} 
                      onPress={() => handleDirectRate(module, 1)}
                    >
                      <Ionicons name="thumbs-down" size={16} color="#D32F2F" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.rateBtn, { backgroundColor: '#E8F5E9', marginLeft: 10 }]} 
                      onPress={() => handleDirectRate(module, 5)}
                    >
                      <Ionicons name="thumbs-up" size={16} color="#388E3C" />
                    </TouchableOpacity>
                  </>
                )}
              </View>

            </View>
          ))}
        </View>
        <View style={{height: 40}} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 12,
    borderRadius: 12,
    elevation: 2,
  },
  searchIcon: { marginRight: 12 },
  searchInput: { flex: 1, fontSize: 16 },
  content: { flex: 1, paddingHorizontal: 16 },
  statsText: { marginBottom: 10, fontSize: 14 },
  modulesList: { gap: 12 },
  
  // Card Styles
  cardWrapper: {
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconBox: {
    width: 50,
    height: 50,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  moduleCode: {
    color: '#1976D2',
    fontWeight: 'bold',
    fontSize: 12,
  },
  textContainer: { flex: 1 },
  moduleTitle: { fontSize: 16, fontWeight: 'bold' },
  moduleInfo: { fontSize: 12, marginTop: 2 },
  
  // Action Row (Voting)
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 8,
  },
  rateBtn: {
    padding: 8,
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default ModulesScreen;