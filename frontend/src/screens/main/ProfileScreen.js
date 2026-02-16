import { Ionicons } from '@expo/vector-icons';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, TextInput } from 'react-native';
import React, { useState, useContext } from 'react';
import { Card, Button } from '../../components/common';
import { Header } from '../../components/layout';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';

const ProfileScreen = ({ navigation }) => {
  const { user, logout, updateProfile } = useContext(AuthContext); // Ensure updateProfile exists in AuthContext
  const { theme } = useContext(ThemeContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    specialite: '',
    moyenne: '',
    age: ''
  });

  const handleLogout = () => {
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Déconnexion', style: 'destructive', onPress: logout },
      ]
    );
  };

  const startEditing = () => {
    setEditForm({
      specialite: user?.specialite || '',
      moyenne: user?.moyenne ? String(user.moyenne) : '',
      age: user?.age ? String(user.age) : ''
    });
    setIsEditing(true);
  };

  const saveProfile = async () => {
    if (isNaN(parseFloat(editForm.moyenne)) || parseFloat(editForm.moyenne) < 0 || parseFloat(editForm.moyenne) > 20) {
      Alert.alert('Error', 'Veuillez entrer une moyenne valide (0-20)');
      return;
    }

    const updatedData = {
      ...user,
      specialite: editForm.specialite,
      moyenne: parseFloat(editForm.moyenne),
      age: parseInt(editForm.age) || 20
    };
    const result = await updateProfile(updatedData);
    if (result.success) {
      setIsEditing(false);
    }
  };

  const profileItems = [
    { icon: 'person', label: 'Full Name', value: user?.name || `${user?.prenom} ${user?.nom}` },
    { icon: 'school', label: 'Specialty', value: user?.specialite },
    { icon: 'stats-chart', label: 'GPA / Moyenne', value: user?.moyenne?.toString() },
    { icon: 'calendar', label: 'Age', value: user?.age ? `${user?.age} years` : undefined },
    { icon: 'mail', label: 'Email', value: user?.email },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header
        title="Profil"
        onMenuPress={() => navigation.toggleDrawer()}
        showNotifications={false}
      />

      <ScrollView style={styles.content}>
        <Card style={[styles.profileCard, { backgroundColor: theme.colors.card }]}>
          <View style={styles.avatarSection}>
            <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
              <Text style={styles.avatarText}>
                {user?.prenom?.[0]}{user?.nom?.[0]}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={[styles.name, { color: theme.colors.text }]}>
                {user?.prenom} {user?.nom}
              </Text>
              <Text style={[styles.specialization, { color: theme.colors.gray }]}>
                {user?.specialite || 'Aucune spécialité'}
              </Text>
              <TouchableOpacity style={styles.editBadge} onPress={startEditing}>
                <Ionicons name="pencil" size={12} color="#fff" />
                <Text style={styles.editBadgeText}>Modifier le profil</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
        <Card style={[styles.infoCard, { backgroundColor: theme.colors.card }]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15}}>
             <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 0 }]}>Informations Personnelles</Text>
             <TouchableOpacity onPress={startEditing}>
               <Text style={{color: theme.colors.primary}}>Modifier</Text>
             </TouchableOpacity>
          </View>
          
          {profileItems.map((item, index) => (
            <View key={index} style={[styles.infoItem, { borderBottomColor: theme.colors.border }]}>
              <View style={styles.infoLabel}>
                <Ionicons name={item.icon} size={18} color={theme.colors.primary} />
                <Text style={[styles.infoLabelText, { color: theme.colors.gray }]}>{item.label}</Text>
              </View>
              <Text style={[styles.infoValue, { color: theme.colors.text }]}>{item.value || 'Non défini'}</Text>
            </View>
          ))}
        </Card>
        <Card style={[styles.menuCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Autres</Text>
          {['Notifications', 'Aide & Support', 'À propos'].map((item, index) => (
            <TouchableOpacity key={index} style={[styles.menuItem, { borderBottomColor: theme.colors.border }]}>
              <Text style={[styles.menuItemText, { color: theme.colors.text, marginLeft: 0 }]}>{item}</Text>
              <Ionicons name="chevron-forward" size={16} color={theme.colors.gray} />
            </TouchableOpacity>
          ))}
        </Card>

        <TouchableOpacity style={[styles.logoutButton, { backgroundColor: theme.colors.card }]} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#F44336" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={[styles.version, { color: theme.colors.gray }]}>SmartAdvisor v1.0.0</Text>
        </View>
      </ScrollView>

      {/* Edit Modal */}
      <Modal visible={isEditing} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Modifier le profil</Text>
            
            <Text style={[styles.label, { color: theme.colors.text }]}>Spécialité</Text>
            <TextInput 
              style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
              value={editForm.specialite}
              onChangeText={(t) => setEditForm({...editForm, specialite: t})}
              placeholder="Ex: Informatique"
              placeholderTextColor={theme.colors.gray}
            />

            <Text style={[styles.label, { color: theme.colors.text }]}>GPA / Moyenne (0-20)</Text>
            <TextInput 
              style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
              value={editForm.moyenne}
              onChangeText={(t) => setEditForm({...editForm, moyenne: t})}
              keyboardType="numeric"
              placeholder="Ex: 14.5"
              placeholderTextColor={theme.colors.gray}
            />

            <Text style={[styles.label, { color: theme.colors.text }]}>Age</Text>
            <TextInput 
              style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
              value={editForm.age}
              onChangeText={(t) => setEditForm({...editForm, age: t})}
              keyboardType="numeric"
              placeholder="Ex: 22"
              placeholderTextColor={theme.colors.gray}
            />

            <View style={styles.modalButtons}>
              <Button title="Annuler" onPress={() => setIsEditing(false)} type="outline" style={{flex: 1, marginRight: 10}} />
              <Button title="Enregistrer" onPress={saveProfile} style={{flex: 1}} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 16 },
  profileCard: { marginBottom: 16, padding: 20 },
  avatarSection: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 70, height: 70, borderRadius: 35, justifyContent: 'center', alignItems: 'center', marginRight: 20 },
  avatarText: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  profileInfo: { flex: 1 },
  name: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  specialization: { fontSize: 16, marginBottom: 8 },
  editBadge: { backgroundColor: '#2196F3', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15, alignSelf: 'flex-start' },
  editBadgeText: { color: '#fff', fontSize: 12, marginLeft: 5, fontWeight: 'bold' },
  infoCard: { marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  infoItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1 },
  infoLabel: { flexDirection: 'row', alignItems: 'center' },
  infoLabelText: { fontSize: 15, marginLeft: 10 },
  infoValue: { fontSize: 15, fontWeight: '500' },
  menuCard: { marginBottom: 16 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1 },
  menuItemText: { fontSize: 16 },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, borderRadius: 12, marginBottom: 30 },
  logoutText: { color: '#F44336', fontSize: 16, fontWeight: '600', marginLeft: 8 },
  footer: { alignItems: 'center', paddingBottom: 20 },
  version: { fontSize: 12 },
  // Modal
  modalContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContent: { borderRadius: 15, padding: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 5, marginTop: 10 },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, fontSize: 16 },
  modalButtons: { flexDirection: 'row', marginTop: 30 }
});

export default ProfileScreen;