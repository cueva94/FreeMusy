import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { GLOBAL } from '../app/services/global';
import { UsuarioServicios } from '../app/services/usuario.servicio';
import { ArtistaServicios } from '../app/services/artista.servicios';
import { Artista } from '../app/models/artista';
import { ActualizarServicios } from 'src/app/services/actualizar.servicios';


@Component({
	selector: 'artista-edit',
	templateUrl: '../app/views/artista-add.html',
	providers: [UsuarioServicios, ArtistaServicios,ActualizarServicios ]
})

export class ArtistaEditComponent implements OnInit{
	public titulo: string;
	public artista: Artista;
	public identity;
	public token;
	public url: string;
	public alertMessage:any;
	public is_edit;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _UsuarioServicios: UsuarioServicios,
		private _ActualizarServicios: ActualizarServicios,
		private _ArtistaServicios: ArtistaServicios
	){
		this.titulo = 'Editar artista';
		this.identity = this._UsuarioServicios.getIdentity();
		this.token = this._UsuarioServicios.getToken();
		this.url = GLOBAL.url;
		this.artista = new Artista('','','','');
		this.is_edit = true;
	}

	ngOnInit(){
		console.log('artista-edit-component.ts cargado');

		// Llamar al metodo del api para sacar un artista en base a su id getArtista
		this.getArtista();
	}

	getArtista(){
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._ArtistaServicios.getArtista(id).subscribe(
				response => {
					if(!response.artista){
						this._router.navigate(['/']);
					}else{
						this.artista = response.artista;
					}
				},
			        error => {
						var errorMessage = <any>error;
						if(errorMessage != null){
						
						}
			        }
				
			);

		});
	}

	onSubmit(){
		console.log(this.artista);
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

		this._ArtistaServicios.editArtista( id, this.artista).subscribe(
			response => {
				
				if(!response.artista){
					this.alertMessage = 'Error en el servidor';

				}else{
					this.alertMessage = '¡El artista se ha actualizado correctamente!';

					if(!this.filesToUpload){
							// Redirigir
							this._router.navigate(['/artista', response.artista._id]);
						}else{
							// Subir la imagen del artista
							this._ActualizarServicios.makeFileRequest(this.url+'subir-imagen-artista/'+id, [], this.filesToUpload, 'imagen')
								.then(
									(result) => {
										this._router.navigate(['/artista', response.artist._id]);
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
                   // this.alertMessage = error.errorMessage;
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

