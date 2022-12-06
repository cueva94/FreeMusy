import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { GLOBAL } from '../app/services/global';
import { ActualizarServicios } from 'src/app/services/actualizar.servicios';
import { UsuarioServicios } from '../app/services/usuario.servicio';
import { CancionServicios } from '../app/services/cancion.servicios';
import { Cancion } from '../app/models/cancion';


@Component({
	selector: 'cancion-edit',
	templateUrl: '../app/views/cancion-add.html',
	providers: [UsuarioServicios,CancionServicios,ActualizarServicios]
})


export class CancionEditComponent implements OnInit{
	public titulo: string;
	public cancion!: Cancion;
	public identity;
	public token;
	public url: string;
	public alertMessage:any;
	public is_edit:any;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _UsuarioServicios: UsuarioServicios,
		private _CancionServicios: CancionServicios,
        private _ActualizarServicios: ActualizarServicios
       

	){
		this.titulo = 'Editar canción';
		this.identity = this._UsuarioServicios.getIdentity();
		this.token = this._UsuarioServicios.getToken();
		this.url = GLOBAL.url;
		this.cancion = new Cancion ('',1,'','','','');
		this.is_edit = true;
	}

	ngOnInit(){
		console.log('cancion-edit-component.ts cargado');
		
        // sacar la cancion a editar
        this.getCancion();
	}


    getCancion(){
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._CancionServicios.getCancion(id).subscribe(
				response => {
					if(!response.cancion){
						this._router.navigate(['/']);
					}else{
						this.cancion = response.cancion;
						console.log(this.cancion);
					}
				},	
				error => {
					var errorMessage = <any>error;
					if(errorMessage != null){
					   // this.alertMessage = error.errorMessage;
					}
				}	
			);
		});
	}



	onSubmit(){

	this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._CancionServicios.editCancion( id, this.cancion).subscribe(
				response => {
					
					if(!response.cancion){
						this.alertMessage = 'Error en el servidor';
					}else{
						this.alertMessage = '¡La canción se ha actualizamos correctamente!';

						if(!this.filesToUpload){

							this._router.navigate(['/album', response.cancion.album]);

						}else{
							// Subir el fichero de audio
							this._ActualizarServicios.makeFileRequest(this.url+'subir-archivo-cancion/'+id, [], this.filesToUpload, 'file')
								.then(
									(result) => {
										this._router.navigate(['/album', response.cancion.album]);
									},
									(error) => {
										console.log(error);
									}
								);
						}
					}

				},
				error => {
					var errorMessage = <any>error;

			        if(errorMessage != null){
			          var body = JSON.parse(error._body);
			         this.alertMessage = body.message;

			        }
				}	
			);

		});  

	}
    public filesToUpload!: Array<File>;
	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

}