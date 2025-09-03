import { Select } from '@/components/input/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { z } from 'zod';
import { Header } from '../../components/header';
import { colors } from '../../constants/colors';

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
  }
})
