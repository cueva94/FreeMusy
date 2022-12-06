
import { Component,OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/services/global';
import { Usuario } from './models/usuario';
import { UsuarioServicios } from './services/usuario.servicio';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-root',
 templateUrl: './app.component.html',
 providers: [UsuarioServicios]
})
export class AppComponent implements OnInit {
 public title = 'FreeMusy';
 public usuario: Usuario
 public usuarioRegistro: Usuario


 public identity:any;
 public token:any;
 public errorMessage: any;
 public url:any;
 public alertRegistro:any;

 constructor(

  private _route: ActivatedRoute,
	private _router: Router,
  private _usuarioServicios: UsuarioServicios
  
  ){
    this.usuario = new Usuario('','','','','','ROLE_USUARIO','' );
    this.usuarioRegistro = new Usuario('','','','','','ROLE_USUARIO','' );
    this.url = GLOBAL.url;

   
 }


ngOnInit(){
    this.identity = this._usuarioServicios.getIdentity();
    this.token = this._usuarioServicios.getToken();

   }


   public onSubmit(){
        console.log(this.usuario);
    
        // Conseguir los datos del usuario identificado
        this._usuarioServicios.signup(this.usuario).subscribe(
          response => {
              let identity = response.usuario;
              this.identity = identity;
              
            
                if (!this.identity._id){
                  alert("El usuario no está correctamente identificado");
              }else{
                  // Crear elemento en el localstorage para tener al usuario sesión
                 localStorage.setItem('identity', JSON.stringify(identity));
    
                  // Conseguir el token para enviarselo a cada petición http
                  this._usuarioServicios.signup(this.usuario, true).subscribe(
                      response =>{

                        
                          let token = response.token;
                          this.token = token;
                          console.log(this.identity);
    
                          if(this.token){
                              alert("El token no se ha generado correctamente");
                          }else{
                              // Crear elemento en el localstorage para tener token disponible
                              localStorage.setItem('token', token);
                            this.usuario = new Usuario('','','','','','ROLE_USER','');
                        
                          }
                      },
                     
                    error => {
                        var errorMessage = <any>error;
    
                        if(errorMessage != null){
                          var body = JSON.parse(error._body);
                          this.errorMessage = body.message;
    
                          console.log(error);
                        }
                      }
                    );
              }
          },
          error => {
            var errorMessage = <any>error;
    
           if(errorMessage != null){
          var body = JSON.parse(error._body);
          this.errorMessage = body.message;
    
           }
          }
        );
      }

     logout(){
         localStorage.removeItem('identity');
         localStorage.removeItem('token');
         localStorage.clear();
         this.identity = null;
         this.token = null;
         this._router.navigate(['/']);

  }
  onSubmitRegistro() {
    console.log(this.usuarioRegistro);
  
    this._usuarioServicios.registro(this.usuarioRegistro).subscribe(
     Response => {
  
      let usuario = Response.usuario;
     this.usuarioRegistro = usuario;
  
     if(!usuario._id){
      this.alertRegistro = 'Error al registrarse'
     }else{
      this.alertRegistro = 'El registro se a realizado correctamente, identificate con:' + " " + this.usuarioRegistro.email;
      this.usuarioRegistro = new Usuario('','','','','','ROLE_USER','');
     }
  
     },
     error => {
      var errorMessage = <any>error;
  
     if(errorMessage != null){
      var body = JSON.parse(error._body)
        this.alertRegistro = body.message;
  
        console.log(error);
     }
     }
    );
  
  }
}  
