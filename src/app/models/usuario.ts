
export class Usuario {

    email = '';
    password = '';
    nombre = '';
    apellido = '';
    preguntaSecreta = '';
    respuestaSecreta = '';
    sesionActiva = '';
  
    constructor() { }
  
    setUsuario(email: string, password: string, nombre: string, apellido: string, preguntaSecreta: string,
      respuestaSecreta: string, sesionActiva: string)
    {
      this.email = email;
      this.password = password;
      this.nombre = nombre;
      this.apellido = apellido;
      this.preguntaSecreta = preguntaSecreta;
      this.respuestaSecreta = respuestaSecreta;
      this.sesionActiva = sesionActiva;
    }
  
    static getUsuario(email: string, password: string, nombre: string, apellido: string, preguntaSecreta: string,
      respuestaSecreta: string, sesionActiva: string)
    {
      const usu = new Usuario();
      usu.setUsuario(email, password, nombre, apellido, preguntaSecreta, respuestaSecreta, sesionActiva)
      return usu;
    }
  
    validarCampoRequerido(nombreCampo: string, valor: string) {
      if (valor.trim() === '') return `El campo "${nombreCampo}" debe tener un valor.`;
      return '';
    }
  
    validaremail(email: string): string {
      return this.validarCampoRequerido('email', email);
    }
  
    validarPassword(password: string): string {
      return this.validarCampoRequerido('contraseña', password);
    }
  
    validarNombre(nombre: string): string {
      return this.validarCampoRequerido('nombre', nombre);
    }
  
    validarApellido(apellido: string): string {
      return this.validarCampoRequerido('apellido', apellido);
    }
  
    validarPreguntaSecreta(preguntaSecreta: string): string {
      return this.validarCampoRequerido('pregunta secreta', preguntaSecreta);
    }
  
    validarRespuestaSecreta(respuestaSecreta: string): string {
      return this.validarCampoRequerido('respuesta secreta', respuestaSecreta);
    }
  
    validarPropiedadesUsuario(email: string, password: string, nombre: string, apellido: string
      , preguntaSecreta: string, respuestaSecreta: string): string {
      return this.validaremail(email) 
        || this.validarPassword(password)
        || this.validarNombre(nombre)
        || this.validarApellido(apellido)
        || this.validarPreguntaSecreta(preguntaSecreta)
        || this.validarRespuestaSecreta(respuestaSecreta)
    }
  
  }