import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { ErrorMessage, Loading } from '../../components/common';
import { Header } from '../../components/layout';

const HistoryScreen = ({ navigation }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);
      setTimeout(() => {
        const mockHistory = [
          {
            id: 1,
            date: '2024-01-15',
            moduleName: 'Algorithmique Avancée',
            rating: 4.5,
            type: 'cours',
            status: 'completed'
          },
          {
            id: 2,
            date: '2024-01-10',
            moduleName: 'Stage en Entreprise',
            rating: 4.8,
            type: 'stage',
            status: 'in_progress'
          },
          {
            id: 3,
            date: '2024-01-05',
            moduleName: 'Base de Données',
            rating: 4.2,
            type: 'cours',
            status: 'completed'
          },
        ];
        setHistory(mockHistory);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#4CAF50';
      case 'in_progress': return '#FF9800';
      case 'planned': return '#2196F3';
      default: return '#666';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Terminé';
      case 'in_progress': return 'En cours';
      case 'planned': return 'Planifié';
      default: return status;
    }
  };

  if (loading) {
    return <Loading message="Chargement de l'historique..." />;
  }

  return (
    <View style={styles.container}>
      <Header
        title="Historique"
        onMenuPress={() => navigation.toggleDrawer()}
      />

      <View style={styles.header}>
        <Text style={styles.subtitle}>
          Votre parcours d'apprentissage
        </Text>
      </View>

      <ScrollView style={styles.content}>
        {error && (
          <ErrorMessage message={error} onRetry={loadHistory} />
        )}

        {history.length === 0 && !error ? (
          <View style={styles.emptyState}>
            <Ionicons name="time-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>Aucun historique disponible</Text>
            <Text style={styles.emptySubtext}>
              Votre historique apparaîtra ici au fur et à mesure
            </Text>
          </View>
        ) : (
          <View style={styles.historyList}>
            {history.map((item) => (
              <View key={item.id} style={styles.historyItem}>
                <View style={styles.itemHeader}>
                  <Text style={styles.moduleName}>{item.moduleName}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#FFC107" />
                    <Text style={styles.rating}>{item.rating}</Text>
                  </View>
                </View>

                <View style={styles.itemDetails}>
                  <View style={styles.detailRow}>
                    <Ionicons name="calendar-outline" size={14} color="#666" />
                    <Text style={styles.detailText}>
                      {new Date(item.date).toLocaleDateString('fr-FR')}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Ionicons
                      name={item.type === 'stage' ? 'briefcase-outline' : 'book-outline'}
                      size={14}
                      color="#666"
                    />
                    <Text style={styles.detailText}>
                      {item.type === 'stage' ? 'Stage' : 'Cours'}
                    </Text>
                  </View>

                  <View style={[styles.status, { backgroundColor: getStatusColor(item.status) }]}>
                    <Text style={styles.statusText}>
                      {getStatusText(item.status)}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  historyList: {
    gap: 12,
  },
  historyItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  moduleName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9C4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  rating: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 4,
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginTop: 16,
    fontWeight: '500',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default HistoryScreen;