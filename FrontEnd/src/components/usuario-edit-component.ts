import{Component,OnInit} from '@angular/core';
import { GLOBAL } from 'src/app/services/global';
import { UsuarioServicios } from '../app/services/usuario.servicio'
import{Usuario} from '../app/models/usuario'
@Component({
	selector: 'usuario-edit',
	templateUrl: '../app/views/usuario-edit.html',
	providers:[UsuarioServicios]
})

export class UsuarioEditComponent implements OnInit{
	public titulo: string;
	public usuario:Usuario;
	public identity;
	public token;
	public alertMessage:any;
	public url:string;
   

	constructor(
		private _usuarioServicios : UsuarioServicios
	){
		this.titulo = 'Actualizar mis datos';
		this.identity = this._usuarioServicios.getIdentity();
    	this.token = this._usuarioServicios.getToken();
    	this.usuario = this.identity;
    	this.url = GLOBAL.url;
	}

	ngOnInit(){
		console.log('usuario-edit-component.ts cargado');

	}

    onSubmit(){
        console.log(this.usuario)
        this._usuarioServicios.actualizarUsuario(this.usuario).subscribe(
            Response => {
            
                if(!Response.usuario){
                    this.alertMessage = 'El usuario no se ha actualizado'
                }else{
                  
                    localStorage.setItem('identity', JSON.stringify(this.usuario));

				    (document.getElementById("identity_nombre")as any).innerHTML = this.usuario.nombre;

					if(!this.filesToUpload){
						// redireccion 
					}else{

						this.makeFileRequest(this.url+'Subir-Imagen-Usuario/'+this.usuario._id, [], this.filesToUpload).then(
							(result: any) => {

								this.usuario.imagen = result.imagen;
								localStorage.setItem('identity', JSON.stringify(this.usuario));

								console.log(this.usuario);

								let imagen_path = this.url+'Obtener-Imagen-Usuario/'+this.usuario.imagen;

								(document.getElementById('image-logged') as any).setAttribute('src', imagen_path);
							}
						);




					}

					this.alertMessage = 'Datos actualizados correctamente';
                  }
            },
            error => {
          
                var errorMessage = <any>error;
                if(errorMessage != null){
                    this.alertMessage = error.errorMessage;
                }
            }
        );
    }
	public filesToUpload: Array<File> = [];

	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

	makeFileRequest(url: string, _params: Array<string>, files: Array<File>){
	
        var token = this.token;

		return new Promise(function(resolve, reject){
			var formData:any = new FormData();
			var xhr = new XMLHttpRequest();

			for(var i = 0; i < files.length; i++){
				formData.append('imagen', files[i], files[i].name);
			}

			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						resolve(JSON.parse(xhr.response));
					}else{
						reject(xhr.response);
					}
					
				}
			}

			xhr.open('POST', url, true);
			xhr.setRequestHeader('Authorization', token);
		    xhr.send(formData);
		});

	}

}

