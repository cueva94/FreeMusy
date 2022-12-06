import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { GLOBAL } from '../app/services/global';
import { UsuarioServicios } from '../app/services/usuario.servicio';
import { AlbumServicios } from '../app/services/album.servicios';
import { ActualizarServicios } from 'src/app/services/actualizar.servicios';
import { Artista } from '../app/models/artista';
import { Album} from '../app/models/album';


@Component({
	selector: 'album-edit',
	templateUrl: '../app/views/album-add.html',
	providers: [UsuarioServicios,AlbumServicios, ActualizarServicios]
})


export class AlbumEditComponent implements OnInit{
	public titulo: string;
	public token;
    public album: Album;
	public identity;
	public url: string;
	public alertMessage:any;
	public is_edit:any;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _UsuarioServicios: UsuarioServicios,
        private _ActualizarServicios: ActualizarServicios,
		private _AlbumServicios: AlbumServicios
	){
		this.titulo = 'Editar album';
		this.identity = this._UsuarioServicios.getIdentity();
		this.token = this._UsuarioServicios.getToken();
		this.url = GLOBAL.url;
		this.album = new Album('','','',2020,'','');
		this.is_edit = true;
	}

	ngOnInit(){
	console.log('album-edit-component.ts cargado');

        // Consegir un album
        this.getAlbum();
    }

    getAlbum(){
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._AlbumServicios.getAlbum( id ).subscribe(
				response => {
					
					if(!response.album){
						this._router.navigate(['/']);
					}else{
						this.album = response.album;
					}

				},
				error => {
                    var errorMessage = <any>error;
                    if(errorMessage != null){
                        this.alertMessage = error.errorMessage;
                    }
                }	
			);
		});
	}
	onSubmit(){
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._AlbumServicios.editAlbum( id, this.album).subscribe(
				response => {
					
					if(!response.album){
						this.alertMessage = 'Error en el servidor';
					}else{
						this.alertMessage = '¡El album se ha actualizado correctamente!';
						
						
						if(!this.filesToUpload){
							// Redirigir
							this._router.navigate(['/artista', response.album.artista]);
						}else{
							// Subir la imagen del alblum
							this._ActualizarServicios.makeFileRequest(this.url+'subir-imagen-album/'+id, [], this.filesToUpload, 'imagen')
								.then(
									(result) => {
										this._router.navigate(['/artista', response.album.artista]);
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
					  console.log(error);
			       
			        }
				}	
			);
		});
	}

	public filesToUpload: Array<File> = [];
	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}
}
	