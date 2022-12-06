import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { GLOBAL } from '../app/services/global';
import { UsuarioServicios } from '../app/services/usuario.servicio';
import { CancionServicios } from '../app/services/cancion.servicios';
import { Cancion } from '../app/models/cancion';


@Component({
	selector: 'cancion-add',
	templateUrl: '../app/views/cancion-add.html',
	providers: [UsuarioServicios,CancionServicios]
})


export class CancionAddComponent implements OnInit{
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
		private _CancionServicios: CancionServicios

	){
		this.titulo = 'Crear nueva canción';
		this.identity = this._UsuarioServicios.getIdentity();
		this.token = this._UsuarioServicios.getToken();
		this.url = GLOBAL.url;
		this.cancion = new Cancion ( '',1,'','','','');
		
	}

	ngOnInit(){
		console.log('cancion-add-component.ts cargado');
		
	}


	onSubmit(){

	
		this._route.params.forEach((params: Params) => {
			let album_id = params['album'];
			this.cancion.album = album_id;
		this._CancionServicios.addCancion( this.cancion).subscribe(
				response => {
					
					if(!response.cancion){

						this.alertMessage = 'Error en el servidor';

					}else{
						this.alertMessage = '¡La canción se ha creado correctamente!';

						this.cancion = response.cancion;
						
						this._router.navigate(['/editar-cancion', response.cancion._id]);
					}
					console.log(this.cancion)
				},
				error => {
					var errorMessage = <any>error;

			        if(errorMessage != null){
			          var body = JSON.parse(error._body);
			          this.alertMessage = body.message;

			          console.log(error);
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