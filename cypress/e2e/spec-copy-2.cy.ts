
describe('Verificar mi aplicación', () => {


  // it('Verificar login con credenciales incorrectas', () => {
  //   cy.visit('http://localhost:8100/').then(() => {
  //     cy.get('#correo').invoke('val', 'correo-inexistente@duocuc.cl');
  //     cy.get('#password').invoke('val', '1234');
  //     cy.contains('Ingresa a tu cuenta').click();
  //     cy.intercept('/home').as('route').then(() => {
  //         cy.get('ion-title').should('contain.text', 'Sistema de Asistencia DUOC');
  //         cy.get('#saludo').should('contain.text', '¡Bienvenido Juan Pérez González!');
  //     });
  //   });
  // });



  // it('Verificar login con credenciales correctas', () => {
  //   cy.wait(1000);
  //   cy.visit('http://localhost:8100/').then(() => {
  //     cy.get('#email').invoke('val', 'atorres@duocuc.cl');
  //     cy.get('#password').invoke('val', '1234');
  //     cy.wait(2000);
  //     cy.contains('Ingresar').click();
  //     cy.intercept('/inicio').as('route').then(() => {
  //         cy.wait(3000);
  //         cy.get('#bienvenida').should('contain.text', 'Sistema de asistencia DUOC');
  //         cy.get('#saludo').should('contain.text', '¡Bienvenido(a) Ana Torres!');
  //         cy.wait(2000);
  //         cy.contains('Salir').click();
  //         cy.wait(2000);
  //     });
  //   });
  // });

  // it('Verificar crear en foro', () => {
  //   cy.wait(1000);
  //   cy.visit('http://localhost:8100/').then(() => {
  //     cy.get('#email').invoke('val', 'atorres@duocuc.cl');
  //     cy.get('#password').invoke('val', '1234');
  //     cy.wait(2000);
  //     cy.contains('Ingresar').click();
  //     cy.intercept('/inicio').as('route').then(() => {
  //         cy.wait(2000);
  //         cy.get('#changer').trigger('ionChange', { detail: { value: 'foro' } });
  //         cy.get('#Titulo').type('crishtiano');
  //         cy.get('#Contenido').type('tuvieja');
  //         cy.wait(1000);
  //         cy.get('#guardar').click();
  //         cy.wait(1000);
  //     });
  //   });
  // });

  // it('Verificar editar en foro', () => {
  //   cy.wait(1000);
  //   cy.visit('http://localhost:8100/').then(() => {
  //     cy.get('#email').invoke('val', 'atorres@duocuc.cl');
  //     cy.get('#password').invoke('val', '1234');
  //     cy.wait(2000);
  //     cy.contains('Ingresar').click();
  //     cy.intercept('/inicio').as('route').then(() => {
  //         cy.wait(3000);
  //         cy.get('#changer').trigger('ionChange', { detail: { value: 'foro' } });
  //         cy.get('#editar').click()
  //         cy.get('#Titulo').type('newvaluecrishtiano');
  //         cy.get('#Contenido').type('newocntenttuvieja');
  //         cy.wait(1000);
  //         cy.get('#guardar').click();
  //         cy.wait(1000);
  //     });
  //   });
  // });

  // it('Verificar eliminar en foro', () => {
  //   cy.wait(1000);
  //   cy.visit('http://localhost:8100/').then(() => {
  //     cy.get('#email').invoke('val', 'atorres@duocuc.cl');
  //     cy.get('#password').invoke('val', '1234');
  //     cy.wait(2000);
  //     cy.contains('Ingresar').click();
  //     cy.intercept('/inicio').as('route').then(() => {
  //         cy.wait(2000);
  //         cy.get('#changer').trigger('ionChange', { detail: { value: 'foro' } });
  //         cy.get('#eliminar').click()
  //         cy.wait(1000);
  //         cy.get('#guardar').click();
  //         cy.wait(1000);
  //     });
  //   });
  // });

  it('Probar actualizacion de perfil', () => {
    cy.wait(1000);
    cy.visit('http://localhost:8100/').then(() => {
      cy.get('#email').invoke('val', 'atorres@duocuc.cl');
      cy.get('#password').invoke('val', '1234');
      cy.wait(2000);
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
          cy.wait(2000);
          cy.get('#changer').trigger('ionChange', { detail: { value: 'misdatos' } });
          cy.get('#nombre').invoke('val','');
          cy.get('#apellido').invoke('val','');
          cy.get('#nombre').type('anita');
          cy.get('#apellido').type('castillo');
          cy.get('#actualizar').click();
          cy.reload();
          cy.wait(3000);
          cy.get('#changer').trigger('ionChange', { detail: { value: 'misdatos' } });
          cy.get('#nombre').should('have.value','anita');
          cy.get('#apellido').should('have.value','castillo');

          // pa volver todo a la normalidad
          cy.get('#nombre').invoke('val','');
          cy.get('#apellido').invoke('val','');
          cy.get('#nombre').type('Ana');
          cy.get('#apellido').type('Torres');
          cy.get('#actualizar').click();
          cy.get('#changer').trigger('ionChange', { detail: { value: 'qr' } });
          
          cy.wait(1000);
      });
    });
  });


});