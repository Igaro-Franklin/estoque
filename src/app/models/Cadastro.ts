export class Cadastro {
    nome: string;
    categoria: string;
    entrada: number;
    saida: number;
    qtdRestante: number;

    constructor(nome: string, categoria: string, entrada: number, saida: number) {
        this.nome = nome;
        this.categoria = categoria;
        this.entrada = entrada;
        this.saida = saida;
        this.qtdRestante = entrada - saida;
    }
}
