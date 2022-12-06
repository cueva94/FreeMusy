import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../app/services/global';
import { UsuarioServicios } from '../app/services/usuario.servicio';
import {ArtistaServicios} from '../app/services/artista.servicios';
import { Artista } from '../app/models/artista';

@Component({
	selector: 'artista-list',
	templateUrl: '../app/views/artista-list.html',
	providers: [UsuarioServicios ,ArtistaServicios]
})

export class ArtistaListComponent implements OnInit{
	public titulo: string;
	public artistas: Artista[] = [];
	public identity;
	public url: string;
	public next_page;
	public prev_page;
	alertMessage: any;
  

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _artistaService: ArtistaServicios,
		private _userService: UsuarioServicios
	){
		this.titulo = 'Artistas';
		this.identity = this._userService.getIdentity();
		this.url = GLOBAL.url;
		this.next_page = 1;
		this.prev_page = 1;
	}

	ngOnInit(){
		console.log('artist-list.component.ts cargado');

		// Conseguir el listado de artistas
	this.getArtistas();
	}

	getArtistas(){
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

				this._artistaService.getArtistas(page).subscribe(
					response => {
						if(!response.artistas){
							this._router.navigate(['/']);
						}else{
							this.artistas = response.artistas;
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

	public confirmado: any;
	
	onDeleteConfirm(id:any){
		this.confirmado = id;
	}

	onCancelArtista(){
		this.confirmado = null;
	}

	onDeleteArtista(id:any){
		this._artistaService.deleteArtista( id).subscribe(
			() => {
				this.getArtistas();
			},
			error => {
				var errorMessage = <any>error;

				if(errorMessage != null){
				  var body = JSON.parse(error._body);
				  //this.alertMessage = body.message;
				}
			}	
			
		);
	}
}
