import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { GLOBAL } from '../app/services/global';
import { UsuarioServicios } from '../app/services/usuario.servicio';
import { ArtistaServicios } from '../app/services/artista.servicios';
import { AlbumServicios } from '../app/services/album.servicios';
import { Artista } from '../app/models/artista';
import { Album} from '../app/models/album';


@Component({
	selector: 'album-add',
	templateUrl: '../app/views/album-add.html',
	providers: [UsuarioServicios, ArtistaServicios,AlbumServicios]
})


export class AlbumAddComponent implements OnInit{
	public titulo: string;
	public artista!: Artista;
    public album: Album;
	public identity;
	public token;
	public url: string;
	public alertMessage:any;
	public is_edit:any;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _UsuarioServicios: UsuarioServicios,
		private _ArtistaServicios: ArtistaServicios,
		private _AlbumServicios: AlbumServicios
	){
		this.titulo = 'Crear nuevo album';
		this.identity = this._UsuarioServicios.getIdentity();
		this.token = this._UsuarioServicios.getToken();
		this.url = GLOBAL.url;
		this.album = new Album('','','',2020,'','');
		
	}

	ngOnInit(){
		console.log('album-add-component.ts cargado');
		
	}


	onSubmit(){
		this._route.params.forEach((params: Params) => {
			let artista_id = params['artista'];
			this.album.artista = artista_id;

			console.log(this.album);
		this._AlbumServicios.addAlbum(this.album).subscribe(
				response => {
					
					if(!response.album){
						this.alertMessage = 'Error en el servidor';
					}else{
						this.alertMessage = '¡El album se ha creado correctamente!';
						this.album = response.album;
						
				 this._router.navigate(['/editar-album', response.album._id]);
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
	public filesToUpload: Array<File> = [];
	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

}
