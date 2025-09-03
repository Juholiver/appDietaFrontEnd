import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { z } from 'zod';
import { Header } from '../../components/header';
import { Input } from '../../components/input';
import { colors } from '../../constants/colors';
import { useDataStore } from '../../store/data';

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  weight: z.string().min(1, 'Peso é obrigatório'),
  height: z.string().min(1, 'Altura é obrigatória'),
  age: z.string().min(1, 'Idade é obrigatória'),
})

type FormData = z.infer<typeof schema>

export default function Step() {

  const {control, handleSubmit, formState:{errors, isValid}} = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const setPageOne = useDataStore(state => state.setPageOne);

  function handleCreate(data: FormData) {
    console.log("Passando dados pagina 1")
    setPageOne({
      name: data.name,
      weight: data.weight,
      height: data.height,
      age: data.age,
    });
    router.push('/create')
  }

  return (

    <View style={styles.container}>
      <Header
        step= "Passo 1"
        title="Vamos começar"
      />

      <ScrollView style={styles.content}>
        <Text style={styles.label}>Nome:</Text>
        <Input 
          name="name"
          control={control}
          placeholder="Digite seu nome"
          rules={{required: true}}
          error={errors.name?.message}
          keyboardType="default"
        />

        <Text style={styles.label}>Seu Peso Atual:</Text>
        <Input 
          name="weight"
          control={control}
          placeholder="Digite seu peso"
          rules={{required: true}}
          error={errors.weight?.message}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Seu Altura Atual:</Text>
        <Input 
          name="height"
          control={control}
          placeholder="Digite sua altura"
          rules={{required: true}}
          error={errors.height?.message}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Sua Idade:</Text>
        <Input 
          name="age"
          control={control}
          placeholder="Digite sua idade"
          rules={{required: true}}
          error={errors.age?.message}
          keyboardType="numeric"
        />

        <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
          <Text style={styles.buttonText}>Avançar</Text>
        </Pressable>
      </ScrollView>
      
    </View>

  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  button: {
    backgroundColor: colors.blue,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  }
  
})