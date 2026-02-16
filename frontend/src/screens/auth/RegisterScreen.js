import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().min(2, 'Trop court !').required('Le prénom est requis.'),
  lastName: Yup.string().min(2, 'Trop court !').required('Le nom est requis.'),
  email: Yup.string().email('Invalid email').required('email est requis.'),
  specialization: Yup.string().required('La specialite  est requis.'),
  password: Yup.string()
    .min(6, 'Le mot de passe doit comporter au moins 6 caractères.')
    .required('mot de passe est requis.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
    .required('Confirmer le mot de passe est requis'),
});

const RegisterScreen = ({ navigation }) => {
  const { register, isLoading } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (values) => {
    await register(values);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <Ionicons name="person-add-outline" size={60} color={theme.colors.primary} />
          <Text style={[styles.title, { color: theme.colors.text }]}>Creer um compte </Text>
          <Text style={[styles.subtitle, { color: theme.colors.gray }]}>Rejoignez la communauté SmartAdvisor</Text>
        </View>

        <View style={[styles.form, { backgroundColor: theme.colors.card }]}>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              specialization: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={RegisterSchema}
            onSubmit={handleRegister}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
              <>
                <View style={styles.row}>
                  <View style={{ flex: 1, marginRight: 8 }}>
                    <Input
                      label="Prenom"
                      placeholder="John"
                      value={values.firstName}
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      error={touched.firstName && errors.firstName}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Input
                      label="Nom"
                      placeholder="Doe"
                      value={values.lastName}
                      onChangeText={handleChange('lastName')}
                      onBlur={handleBlur('lastName')}
                      error={touched.lastName && errors.lastName}
                    />
                  </View>
                </View>

                <Input
                  label="Email"
                  placeholder="student@university.edu"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={touched.email && errors.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  leftIcon="mail-outline"
                />

                <Input
                  label="Specialite"
                  placeholder="Computer Science, Math..."
                  value={values.specialization}
                  onChangeText={handleChange('specialization')}
                  onBlur={handleBlur('specialization')}
                  error={touched.specialization && errors.specialization}
                  leftIcon="school-outline"
                />

                <Input
                  label="Mot de passe"
                  placeholder="••••••"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={touched.password && errors.password}
                  secureTextEntry={!showPassword}
                  leftIcon="lock-closed-outline"
                  rightIcon={
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color={theme.colors.gray} />
                    </TouchableOpacity>
                  }
                />

                <Input
                  label="Confirmer mot de passe "
                  placeholder="••••••"
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  error={touched.confirmPassword && errors.confirmPassword}
                  secureTextEntry
                  leftIcon="lock-closed-outline"
                />

                <Button
                  title="Sign Up"
                  onPress={handleSubmit}
                  loading={isLoading}
                  disabled={isLoading}
                  style={styles.registerButton}
                />
              </>
            )}
          </Formik>

          <View style={styles.loginLinkContainer}>
            <Text style={{ color: theme.colors.gray }}>Vous avez déjà un compte ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
  },
  form: {
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  registerButton: {
    marginTop: 20,
  },
  loginLinkContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RegisterScreen;