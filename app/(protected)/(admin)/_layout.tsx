import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { Tabs } from 'expo-router';
import React from "react";

export default function AdminLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: "#083474",
            headerStyle: { backgroundColor: "#083474" },
            headerTintColor: "#fff",
            tabBarStyle: {
                backgroundColor: '#FAFAFA'
            }
        }}>
            <Tabs.Screen
                name="homeAdmin"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <Entypo name="home" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="registerVaccin"
                options={{
                    title: 'Cadastro',
                    tabBarIcon: ({ color, size }) => <FontAwesome6 name="app-registration" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="vaccinsList"
                options={{
                    title: 'Vacinas',
                    tabBarIcon: ({ color, size }) => <MaterialIcons name="vaccines" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Perfil",
                    tabBarIcon: ({ color, size }) => <Ionicons name="person-circle" size={size} color={color} />
                }}
            />
        </Tabs>
    );
}