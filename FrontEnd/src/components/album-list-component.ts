import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { GLOBAL } from '../app/services/global';
import { UsuarioServicios } from '../app/services/usuario.servicio';
import { AlbumServicios } from '../app/services/album.servicios';
import { ActualizarServicios } from 'src/app/services/actualizar.servicios';
import { Artista } from '../app/models/artista';
import { Album} from '../app/models/album';

@Component({
	selector: 'album-list',
	templateUrl: '../app/views/album-list.html',
	providers: [UsuarioServicios,AlbumServicios, ActualizarServicios]
})

export class AlbumsListComponent implements OnInit{
	public titulo: string;
	public albums: Album []=[];
	public identity;
	public url: string;
	public next_page;
	public prev_page;
	alertMessage: any;
  

	constructor(
        private _route: ActivatedRoute,
		private _router: Router,
		private _UsuarioServicios: UsuarioServicios,
        private _ActualizarServicios: ActualizarServicios,
		private _AlbumServicios: AlbumServicios
	){
		this.titulo = 'albums';
		this.identity = this._UsuarioServicios.getIdentity();
		this.url = GLOBAL.url;
		this.next_page = 1;
		this.prev_page = 1;
	}

	ngOnInit(){
		console.log('album-list.component.ts cargado');

		// Conseguir el listado de artistas
	this.getalbums();
	}

	getalbums(){
		this._route.params.forEach((params: Params) =>{
				let page = +params['page'];
				if(!page){
					page = 1;
				}else{
					this.next_page = page+1;
					this.prev_page = page-1;

					if(this.prev_page == 0){
						this.prev_page = 1;
					}
				}

				this._AlbumServicios.getAlbums().subscribe(
					response => {
						if(!response.albums){
							this._router.navigate(['/']);
						}else{
							this.albums= response.albums;
						}
					},
					error => {
						var errorMessage = <any>error;

				        if(errorMessage != null){
				          var body = JSON.parse(error._body);
				          //this.alertMessage = body.message;

				          console.log(error);
				        }
					}	
				);
		});
	}
	
	}

	

