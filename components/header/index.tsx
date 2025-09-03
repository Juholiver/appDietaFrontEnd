import { router } from 'expo-router';
import {
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { colors } from '../../constants/colors';

interface HeaderProps {
  step: string;
  title: string;
}

export function Header({step,title}: HeaderProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
          <View style={styles.row}>
            <Pressable onPress={() => router.replace('/')}>
              <Feather name="arrow-left" size={24} color="#000" />	
            </Pressable>
            <Text style={styles.text}> {step} <Feather name="loader" size={16} color="#000" /></Text>
          </View>

          <Text style={styles.tittle}>
            {title}
          </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderBottomRightRadius:14,
    borderBottomLeftRadius:14,
    marginBottom:14,
    paddingTop:Platform.OS === 'android' ? StatusBar.currentHeight! + 34 : 34,
  },
  content: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 34,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  text:{
    fontSize:18,
    color:colors.black,
  },
  tittle:{
    fontSize:30,
    color:colors.background,
    fontWeight:'bold',
  }
});