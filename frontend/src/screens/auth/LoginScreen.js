import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { useContext, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import * as Yup from 'yup';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Loading from '../../components/common/Loading';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const { login, isLoading } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Adresse e-mail invalide')
      .required('L adresse électronique est requise.'),
    password: Yup.string()
      .min(6, 'Le mot de passe doit comporter au moins 6 caractères.')
      .required('Un mot de passe est requis.'),
  });

  const handleLogin = async (values) => {
    const { email, password } = values;
    const result = await login(email, password);

    if (result.success) {
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Ionicons name="school" size={80} color={theme.colors.primary} />
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Recommandation universitaire
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.gray }]}>
            Recommandations de modules intelligents
          </Text>
        </View>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <View style={styles.formContainer}>
              <Input
                label="Email"
                placeholder="Saisissez votre adresse e-mail"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={touched.email && errors.email}
                autoCapitalize="none"
                keyboardType="email-address"
                leftIcon="mail-outline"
              />

              <Input
                label="mot de passe"
                placeholder="Saisissez votre mot de passe"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={touched.password && errors.password}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                leftIcon="lock-closed-outline"
                rightIcon={
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={24}
                      color={theme.colors.gray}
                    />
                  </TouchableOpacity>
                }
              />

              <TouchableOpacity
                style={styles.forgotPassword}
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <Text style={{ color: theme.colors.primary }}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              <Button
                title="Login"
                onPress={handleSubmit}
                disabled={!isValid || isLoading}
                loading={isLoading}
                style={styles.loginButton}
              />

              <View style={styles.registerContainer}>
                <Text style={{ color: theme.colors.gray }}>
                  Vous n'avez pas de compte ?{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    console.log('bouton S inscrire cliqué');
                    navigation.navigate('Register');
                  }}
                  activeOpacity={0.7}
                  style={{ cursor: 'pointer' }}
                  accessibilityRole="button"
                  accessibilityLabel="Register"
                >
                  <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>

        <View style={styles.demoContainer}>
          <Text style={[styles.demoTitle, { color: theme.colors.gray }]}>
           Identifiants de démonstration
          </Text>
          <Text style={[styles.demoText, { color: theme.colors.gray }]}>
            Email: admin@university.com
          </Text>
          <Text style={[styles.demoText, { color: theme.colors.gray }]}>
          mot de passe: Admin123!
          </Text>
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
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  formContainer: {
    marginBottom: 30,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  loginButton: {
    marginTop: 10,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  demoContainer: {
    marginTop: 30,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  demoText: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default LoginScreen;