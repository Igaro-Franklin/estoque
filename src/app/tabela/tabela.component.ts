import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Cadastro } from '../models/Cadastro';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']  // Corrigido styleUrl para styleUrls
})
export class TabelaComponent implements OnInit {

  // Objeto do formulário
  formulario = new FormGroup({
    nome: new FormControl(''),
    categoria: new FormControl(''),
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
}
