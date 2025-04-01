import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TelaPrincipal } from './src/telas/TelaPrincipal';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Produtos"
          component={TelaPrincipal}
          options={{ title: 'Cadastro de Produtos' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}