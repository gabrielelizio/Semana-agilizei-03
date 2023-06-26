

context('Dev Finances Agilizei', () => {


  beforeEach(() => {
    cy.visit ('https://dev-finance.netlify.app') //visitando a pagina
     cy.get('#data-table tbody tr').should('have.length',0)
  });


   it('Cadastrar entradas', () => {
     cy.get('#transaction > .button').click() // clicando para uma nova transação
     cy.get('#description').type('Presente') // escrevendo o tipo da nova transação
     cy.get('#amount').type(12) //escrevendo o valor da apresentação
     cy.get('#date').type('2023-06-21') //preenchendo a data da transação
     cy.get('button').contains('Salvar').click() //salvando a transação
     
     cy.get('#data-table').should('have.length',1)


    }); 
    it('Cadastrar Saídas', () => {
      
      cy.get('#transaction > .button').click() // clicando para uma nova transação
      cy.get('#description').type('aleatorio') // escrevendo o tipo da nova transação
      cy.get('#amount').type(-12) //escrevendo o valor da apresentação
      cy.get('#date').type('2023-06-21') //preenchendo a data da transação
      cy.get('button').contains('Salvar').click() //salvando a transação
      
      cy.get('#data-table').should('have.length',1)
 
 
     }); 

     it(' Remover Saídas', () => {


      const entrada = 'Mesada'
      const saida = 'KinderOvo'


      cy.get('#transaction > .button').click() 
      cy.get('#description').type(entrada) 
      cy.get('#amount').type(1000) 
      cy.get('#date').type('2023-06-21') 
      cy.get('button').contains('Salvar').click() 

      cy.get('#transaction > .button').click() 
      cy.get('#description').type(saida) 
      cy.get('#amount').type(-35) 
      cy.get('#date').type('2023-06-21') 
      cy.get('button').contains('Salvar').click() 

      //1ª estrategia para excluir a entrada. 
      //acessando a descrição para pegar a imagem da linha que contem a descrição

      cy.get('td.description')
      .contains(entrada)
      .parent()
      .find('img[onclick*=remove]')
      .click()
      //  cy.get('#totalDisplay').should('equal','**R$35**')
      //2ª Estrategia buscar todos os irmãos e buscar o que tem a img + atributo

      cy.get('td.description')
      .contains(saida)
      .siblings()
      .children('img[onclick*=remove]')
      .click()
    
      cy.get('#data-table tbody tr').should('have.length',0)
    
    });






});