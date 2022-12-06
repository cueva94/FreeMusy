import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GLOBAL } from '../app/services/global';
import { UsuarioServicios } from '../app/services/usuario.servicio';
import { ArtistaServicios } from '../app/services/artista.servicios';
import { Artista } from '../app/models/artista';


@Component({
	selector: 'artista-add',
	templateUrl: '../app/views/artista-add.html',
	providers: [UsuarioServicios, ArtistaServicios]
})

export class ArtistaAddComponent implements OnInit{
	public titulo: string;
	public artista: Artista;
	public identity;
	public token;
	public url: string;
	public alertMessage:any;
    public is_edit:any;
	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _UsuarioServicios: UsuarioServicios,
		private _ArtistaServicios: ArtistaServicios
	){
		this.titulo = 'Crear nuevo artista';
		this.identity = this._UsuarioServicios.getIdentity();
		this.token = this._UsuarioServicios.getToken();
		this.url = GLOBAL.url;
		this.artista = new Artista('','','','');
		
	}

	ngOnInit(){
		console.log('artista-add-component.ts cargado');

	}

	onSubmit(){
		console.log(this.artista);
		this._ArtistaServicios.addArtista( this.artista).subscribe(
			response => {
				
				if(!response.artista){
					this.alertMessage = 'Error en el servidor';
				}else{
					this.alertMessage = '¡El artista se ha creado correctamente!';
					this.artista = response.artista;
					this._router.navigate(['/editar-artista', response.artista._id]);
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
}
