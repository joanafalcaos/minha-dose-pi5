import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import logo from '../assets/images/logo/minha-dose-logo.jpeg';

export default function ResetPasswordCodeScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams(); // vem da tela anterior
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  function handleVerifyCode() {
    if (!code) {
      setError('Informe o código recebido por e-mail.');
      return;
    }

    // 👉 Simulação de verificação de código
    Alert.alert('Simulação', 'Código verificado com sucesso!');

    router.push({
      pathname: '/reset-password-new',
      params: { email, code },
    });
  }

  function handleResendCode() {
    Alert.alert('Simulação', 'Um novo código foi reenviado para o seu e-mail.');
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={logo} style={styles.logo} />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Verificação de código</Text>
        <Text style={styles.subtitle}>
          Digite o código de verificação que enviamos para o e-mail:
        </Text>
        <Text style={styles.emailText}>{email}</Text>

        <TextInput
          style={styles.input}
          placeholder="Código"
          placeholderTextColor="#666"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleVerifyCode}
          >
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.resendButton}
          onPress={handleResendCode}
        >
          <Text style={styles.resendText}>Reenviar código</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  bottomContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#002C66',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: '#333',
  },
  emailText: {
    fontSize: 13,
    color: '#002C66',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 15,
    color: '#000',
    backgroundColor: '#f8f8f8',
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  backText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#002C66',
  },
  button: {
    backgroundColor: '#002C66',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resendButton: {
    marginTop: 25,
    alignSelf: 'center',
  },
  resendText: {
    color: '#002C66',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: '#d33',
    marginTop: 4,
    marginBottom: 4,
  },
});
