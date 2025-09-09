import { Select } from '@/components/input/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { z } from 'zod';
import { Header } from '../../components/header';
import { colors } from '../../constants/colors';
import { useDataStore } from '../../store/data';

const schema = z.object({
  gender: z.string().min(1, 'Sexo é obrigatório'),
  objective: z.string().min(1, 'Objetivo é obrigatório'),
  level: z.string().min(1, 'Nível de atividade é obrigatório'),
})

type FormData = z.infer<typeof schema>

export default function Create() {

  const {control, handleSubmit, formState:{errors, isValid}} = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const setPageTwo = useDataStore(state => state.setPageTwo);

  const genderOptions = [
    {label: 'Masculino', value: 'masculino'},
    {label: 'Feminino', value: 'feminino'},
  ]

  const levelOptions = [
    { label: 'Sedentário (pouco ou nenhuma atividade física)', value: 'Sedentário' },
    { label: 'Levemente ativo (exercícios 1 a 3 vezes na semana)', value: 'Levemente ativo (exercícios 1 a 3 vezes na semana)' },
    { label: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)', value: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)' },
    { label: 'Altamente ativo (exercícios 5 a 7 dia por semana)', value: 'Altamente ativo (exercícios 5 a 7 dia por semana)' },
  ]

  const objectiveOptions = [
    { label: 'Emagrecer', value: 'emagrecer' },
    { label: 'Hipertrofia', value: 'Hipertrofia' },
    { label: 'Hipertrofia + Definição', value: 'Hipertrofia e Definição' },
    { label: 'Definição', value: 'Definição' },
  ]

  function handleCreate(data: FormData) {
    setPageTwo({
      gender: data.gender,
      objective: data.objective,
      level: data.level,
    })
    
   
    router.push('/nutrition')

  }

  return (
    <View style={styles.container}>
      <Header
        step= "Passo 2"
        title="Finalizando Dieta"
      />
    <ScrollView style={styles.content}>
      <Text style={styles.label}>Sexo :</Text>
      <Select
        name="gender"
        control={control}
        placeholder='Selecione seu sexo'
        error={errors.gender?.message}
        options={genderOptions}
      />

      <Select
        name="level"
        control={control}
        placeholder='Selecione seu nível de atividade'
        error={errors.level?.message}
        options={levelOptions}
      />

      <Select
        name="objective"
        control={control}
        placeholder='Selecione seu objetivo'
        error={errors.objective?.message}
        options={objectiveOptions}
      />

      <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
          <Text style={styles.buttonText}>Avançar</Text>
      </Pressable>

    </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  content:{
    paddingLeft: 16,
    paddingRight: 16,
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
