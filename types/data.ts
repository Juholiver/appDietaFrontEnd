interface RefeicoesProps{
    horario: string;
    nome: string;
    alimentos: string[];
   
}

export interface Data{
    nome: string;
    sexo: string;
    peso: number;
    altura: number;
    idade: number;
    objetivo: number;
    refeicoes: RefeicoesProps[];
    suplementos: string[];
}

