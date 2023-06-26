/// <reference types="cypress"/>

import {format,prepareLocalStorage} from '../support/utils'

context('Dev Finances Agilizei', () => {


  beforeEach(() => {
    cy.visit ('https://dev-finance.netlify.app',{
    onBeforeLoad: (win) =>{
      prepareLocalStorage(win)
    }
     //visitando a pagina
     })
     
     
    //  cy.get('#data-table tbody tr').should('have.length',0)
  });
   it('Cadastrar entradas', () => {
     cy.get('#transaction > .button').click() // clicando para uma nova transação
     cy.get('#description').type('Presente') // escrevendo o tipo da nova transação
     cy.get('#amount').type(12) //escrevendo o valor da apresentação
     cy.get('#date').type('2023-06-21') //preenchendo a data da transação
     cy.get('button').contains('Salvar').click() //salvando a transação
     
     cy.get('#data-table tbody tr').should('have.length',3)


    }); 
    it('Cadastrar Saídas', () => {
      
      cy.get('#transaction > .button').click() // clicando para uma nova transação
      cy.get('#description').type('aleatorio') // escrevendo o tipo da nova transação
      cy.get('#amount').type(-12) //escrevendo o valor da apresentação
      cy.get('#date').type('2023-06-21') //preenchendo a data da transação
      cy.get('button').contains('Salvar').click() //salvando a transação
      
      cy.get('#data-table tbody tr').should('have.length',3)
 
     }); 

     it(' Remover Saídas', () => {


      const entrada = 'Mesada'
      const saida = 'Suco Kapo'

      //1ª estrategia para excluir a entrada. 
      //acessando a descrição para pegar a imagem da linha que contem a descrição

      cy.get('td.description')
      .contains(entrada)
      .parent()
      .find('img[onclick*=remove]')
      .click()
      //2ª Estrategia buscar todos os irmãos e buscar o que tem a img + atributo

      cy.get('td.description')
      .contains(saida)
      .siblings()
      .children('img[onclick*=remove]')
      .click()
    
      cy.get('#data-table tbody tr').should('have.length',0)
    
    });

    it('Validar Saldo com diversas transações', () => {
   
    
      //Definindo as variaveis de entrada e saída para inicilizar com 0

      let incomes = 0
      let expenses = 0
      //pegando o get do data-table para listar todos elementos da tela
      // e usar o invoke para pegar o texto e formatar
      cy.get("#data-table tbody tr")
        .each(($el, index, $list ) =>{
          cy.get($el)
          .find('.expense, .income')
          .invoke( 'text' )
          .then(text => {
            if(text.includes('-')){
              expenses = expenses +format(text)
              cy.log(expenses)
            }          else {
              incomes = incomes+format(text)
            }
            
          })
          
        })

          //função para verificar se o total encontrado no datable é igual ao valor total

          cy.get('#totalDisplay').invoke('text').then(text =>{

            let formattedTotalDisplay = format(text)
            let expectedTotal = expenses +incomes


            expect(expectedTotal).to.eq(formattedTotalDisplay)
        })
        
      
    });


});