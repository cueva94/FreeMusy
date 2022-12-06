import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { GLOBAL } from '../app/services/global';
import { UsuarioServicios } from '../app/services/usuario.servicio';
import { ArtistaServicios } from '../app/services/artista.servicios';
import { AlbumServicios } from '../app/services/album.servicios';
import { Artista } from '../app/models/artista';
import { Album} from '../app/models/album';


@Component({
	selector: 'artista-detail',
	templateUrl: '../app/views/artista-detail.html',
	providers: [UsuarioServicios, ArtistaServicios,AlbumServicios ]
})

export class ArtistaDetailComponent implements OnInit{
	public albums!: Album[];
	public artista: Artista;
	public identity;
	public token;
	public url: string;
	public alertMessage:any;
	

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _UsuarioServicios: UsuarioServicios,
		private _ArtistaServicios: ArtistaServicios,
		private _AlbumServicios: AlbumServicios
	
	){
	
		this.identity = this._UsuarioServicios.getIdentity();
		this.token = this._UsuarioServicios.getToken();
		this.url = GLOBAL.url;
		this.artista = new Artista('','','','');
	;
	
	}

	ngOnInit(){
		console.log('artista-edit-component.ts cargado');

		// Llamar al metodo del api para sacar un artista en base a su id getArtist
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

						//sacar los albums del artista 
						this._AlbumServicios.getAlbums( response.artista._id).subscribe(
							response => {
								if(!response.albums){
									this.alertMessage = 'Este artista no tiene albums';
								}else{
									this.albums = response.albums;
								}
							},
							error => {
								var errorMessage = <any>error;
	
								if(errorMessage != null){
								  var body = JSON.parse(error._body);
								  //this.alertMessage = body.message;
	
								  console.log(error);
								}
							});
	

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


	public confirmado: any;
	
	onDeleteConfirm(id:any){
		this.confirmado = id;
	}

	onCancelAlbum(){
		this.confirmado = null;
	}

	onDeleteAlbum(id:any){
		this._AlbumServicios.deleteAlbum( id).subscribe(
			response => {
				if(!response.album){
					alert('Error en el servidor');
				}

				this.getArtista();
			},
			error => {
				var errorMessage = <any>error;

		        if(errorMessage != null){
		          var body = JSON.parse(error._body);
		          this.alertMessage = body.message;
		        }

			}	
			
		);
	}

	}




