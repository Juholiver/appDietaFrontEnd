import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Feather, Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Link, router } from 'expo-router';
import { colors } from '../../constants/colors';
import { api } from '../../services/api';
import { useDataStore } from '../../store/data';
import { Data } from '../../types/data';

interface ResponseData {
    data: Data;
}

export default function Nutrition() {
  const user = useDataStore(state => state.user);
  const {data, isFetching, error} = useQuery ({
    queryKey: ['nutrition'],
    queryFn: async () => {
        try {
            if (!user) {
                throw new Error('Filed load nutrition');
            }

            const response = await api.post<ResponseData>("/create", {
                name: user.name,
                age: user.age,
                weight: user.weight,
                height: user.height,
                gender: user.gender,
                level: user.level,
                objective: user.objective,
            })

            return response.data.data;

        }catch(error){
            console.log(error);
            return { data: {} };
        }
    },
  })

  if(isFetching){
    return (
      <View style={style.loading}>
        <Text style={style.loadingText}>Estamos gerando sua dieta !...</Text>
        <Text style={style.loadingText}>Consultando IA...</Text>
      </View>
    )
  }
    if(error){
    return (
      <View style={style.loading}>
        <Text style={style.loadingText}>Falha a gerar dieta!...</Text>
        <Link href="/"><Text style={style.loadingText}>Tente novamente</Text></Link>
      </View>
    )
  }

  return (
    <View style={style.container}>
      <View style={style.containerHeader}>
        <View style={style.contentHeader}>
          <Text style={style.title}>Minha dieta</Text>
          <Pressable style={style.buttonShare}>
            <Text style={style.buttonShareText}>Compartilhar</Text>
          </Pressable>
        </View>
      </View>
      <View style ={{paddingLeft: 16, paddingRight: 16, flex:1}}>
        {data && Object.keys(data).length > 0 && (
          <>
          <Text style={style.name}>Nome: {data.nome}</Text>
          <Text style={style.objective}>Foco: {data.objetivo}</Text>

          <Text style={style.label}>Refeicões:	</Text>
          <ScrollView>
            <View style={style.foods}>
              {data.refeicoes.map((refeicao)=>(
              <>
              <View key={refeicao.nome} style={style.food}>
                  <View style={style.foodHeader}>
                    <Text style={style.foodName}>{refeicao.nome}</Text>
                    <Ionicons name="restaurant" size={16} color="black" />
                  </View>
                  <View style={style.foodContent}>
                      <Feather name="clock" size={14}color="#000"/>
                      <Text>Horario: {refeicao.horario}</Text>
                  </View>
                  <Text style={style.foodText}>Alimentos:</Text>
                  {refeicao.alimentos.map(alimentos  => (
                    <Text key={alimentos.nome} style={style.foodText}>{alimentos.nome}</Text>
                  ))}
              </View>
              </>
              ))}
            </View>
            <View style={style.supplements}>
                <Text>Dica de suplementação:</Text>
            </View>
            <View style={style.supplements}>
                {data.suplementos.map(item =>(
                  <Text key={item}>{item}</Text>
                ))}
            </View>

            <Pressable style={style.button} onPress={() => router.replace("/")}>
              <Text style={style.buttonText}>Gerar Nova Dieta</Text>
            </Pressable>
          </ScrollView>
          </>
        )}
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: colors.background,

  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  containerHeader: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    paddingTop: 50,
    paddingBottom: 20,
    marginBottom:16,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.background,
  },
  buttonShare: {
    backgroundColor: colors.blue,
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonShareText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '500',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 16,
  },
  objective:{
    fontSize: 16,
    color: colors.white,
    marginBottom: 24,
  },
  label:{
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  
  }	,
  foods:{
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 8,
    marginTop: 8,
    gap: 8,
  },
  food:{
    backgroundColor: 'rgba(208, 208, 208, 0.40)',
    padding: 14,
    borderRadius: 4,
  },
  foodHeader:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  foodName:{
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  foodContent:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap:4, 
    
  },
  foodText:{
    fontSize: 16,
    marginBottom:4,
    marginTop: 14,
  },
  supplements:{
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 8,
    marginTop: 14,
    marginBottom: 14,
  
  },
  button:{
    backgroundColor: colors.blue,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText:{
    fontSize: 16,
    color: colors.white,
    fontWeight: '500',
  },
})