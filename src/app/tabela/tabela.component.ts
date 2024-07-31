import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Cadastro } from '../models/Cadastro';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {

  // Objeto do formulário
  formulario = new FormGroup({
    nome: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    entrada: new FormControl(''),
    saida: new FormControl(''),
  });

  // Variável para visibilidade dos botões
  btnCadastrar: boolean = true;

  // Modelo de cadastro
  vetor: Cadastro[] = [];

  // Variável para armazenar o indice
  indice: number = -1;

  ngOnInit(): void {
    // Carregar os dados do localStorage ao iniciar o componente
    const data = localStorage.getItem('cadastros');
    if (data) {
      this.vetor = JSON.parse(data);
    }
  }

  // Função para Cadastro
  cadastrar() {
    if (this.formulario.invalid) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const formValues = this.formulario.value;

    // Conversão de valores do formulário para número
    const entrada = Number(formValues.entrada);
    const saida = Number(formValues.saida);

    // Criação de novo objeto Cadastro
    const novoCadastro = new Cadastro(
      formValues.nome!,
      formValues.categoria!,
      entrada,
      saida
    );

    // Cadastro de produto
    this.vetor.push(novoCadastro);

    // Salvar no localStorage
    localStorage.setItem('cadastros', JSON.stringify(this.vetor));

    // Limpeza dos inputs
    this.formulario.reset();

    // Visualizar os dados da tabela
    console.table(this.vetor);
  }

  // Função para selecionar
  selecionar(indice: number) {
    // Atribuir o indice do produto selecionado
    this.indice = indice;

    // Passar os dados selecionados para o formulário
    const selectedCadastro = this.vetor[indice];
    this.formulario.setValue({
      nome: selectedCadastro.nome,
      categoria: selectedCadastro.categoria,
      entrada: selectedCadastro.qtdRestante.toString(),
      saida: '' // Campo de saída vazio
    });

    // Visibilidade dos botões
    this.btnCadastrar = false;
  }

  // Função para alterar os dados
  alterar() {
    if (this.formulario.invalid) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const formValues = this.formulario.value;

    // Conversão de valores do formulário para número
    const entrada = Number(formValues.entrada);
    const saida = Number(formValues.saida);

    // Atualizar o objeto Cadastro
    const updatedCadastro = new Cadastro(
      formValues.nome!,
      formValues.categoria!,
      entrada,
      saida
    );

    // Alterar vetor
    this.vetor[this.indice] = updatedCadastro;

    // Salvar no localStorage
    localStorage.setItem('cadastros', JSON.stringify(this.vetor));

    // Limpar os inputs
    this.formulario.reset();

    // Visibilidade dos botões
    this.btnCadastrar = true;
  }

  // Função de cancelar 
  cancelar() {
    // Limpar os inputs
    this.formulario.reset();

    // Visibilidade dos botões
    this.btnCadastrar = true;
  }

  // Função de excluir
  excluir(indice: number) {
    if (confirm('Tem certeza que deseja excluir este item?')) {
      // Remover o produto do vetor
      this.vetor.splice(indice, 1);

      // Salvar no localStorage
      localStorage.setItem('cadastros', JSON.stringify(this.vetor));

      // Limpar os inputs
      this.formulario.reset();

      // Visibilidade dos botões
      this.btnCadastrar = true;
    }
  }
}
