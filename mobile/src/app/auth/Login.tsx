import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
// Importing Lucide Icons
import { ShieldCheck, Eye, EyeOff } from 'lucide-react-native';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = () => {
    console.log('Login attempt:', email);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0f172a]">
      <StatusBar style="light" />
      <Stack.Screen options={{ headerShown: false }} />

      <View className="flex-1 justify-center px-6">
        {/* Logo Section */}
        <View className="items-center mb-12">
          <View className="flex-row items-center gap-3">
            {/* Lucide Shield Icon */}
            <ShieldCheck size={40} color="#3b82f6" strokeWidth={2.5} />
            <Text className="text-4xl font-bold text-white tracking-wider">
              Life<Text className="text-white">Line</Text>
            </Text>
          </View>
        </View>

        {/* Form Section */}
        <View className="space-y-4">
          {/* Email Input */}
          <View>
            <View className="bg-[#1e293b] rounded-lg border border-slate-700 flex-row items-center px-4 py-3">
              <TextInput
                placeholder="Email"
                placeholderTextColor="#94a3b8"
                className="flex-1 text-white text-base"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password Input */}
          <View>
            <View className="bg-[#1e293b] rounded-lg border border-slate-700 flex-row items-center px-4 py-3">
              <TextInput
                placeholder="Password"
                placeholderTextColor="#94a3b8"
                className="flex-1 text-white text-base"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                {/* Lucide Eye Icons */}
                {isPasswordVisible ? (
                  <EyeOff size={20} color="#94a3b8" />
                ) : (
                  <Eye size={20} color="#94a3b8" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            onPress={() => console.log('Forgot Password')}
            className="self-start"
          >
            <Text className="text-blue-500 font-medium">Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleLogin}
            className="bg-blue-500 py-4 rounded-xl items-center mt-4 active:bg-blue-600"
          >
            <Text className="text-white font-bold text-lg">Login</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center my-6">
            <View className="flex-1 h-[1px] bg-slate-700" />
            <Text className="text-slate-400 mx-4">OR</Text>
            <View className="flex-1 h-[1px] bg-slate-700" />
          </View>

          {/* Google Button */}
          <TouchableOpacity 
            className="bg-[#1e293b] border border-slate-700 py-4 rounded-xl flex-row justify-center items-center gap-3 active:bg-slate-800"
            onPress={() => console.log('Google Login')}
          >
            {/* Using a standard Google logo image for the multi-color look */}
            <Image 
              source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" }}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
            
            <Text className="text-white font-semibold text-base">Continue with Google</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="flex-row justify-center mt-12">
          <Text className="text-slate-400">Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/auth/signup' as any)}>
            <Text className="text-blue-500 font-bold">Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;