import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { GLOBAL } from '../app/services/global';
import { UsuarioServicios } from '../app/services/usuario.servicio';
import { CancionServicios } from '../app/services/cancion.servicios';
import { AlbumServicios } from '../app/services/album.servicios';
import { Album} from '../app/models/album';
import { Cancion } from 'src/app/models/cancion';


@Component({
	selector: 'album-detail',
	templateUrl: '../app/views/album-detail.html',
	providers: [UsuarioServicios,AlbumServicios,CancionServicios ]
})

export class AlbumDetailComponent implements OnInit{
	public album!: Album;
	public canciones!: Cancion[];
	public identity;
	public url: string;
	public alertMessage:any;
	public token;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _UsuarioServicios: UsuarioServicios,
		private _AlbumServicios: AlbumServicios,
		private _CancionServicios: CancionServicios
		
	
	){
		this.token = this._UsuarioServicios.getToken();
		this.identity = this._UsuarioServicios.getIdentity();
		this.url = GLOBAL.url;
	
	;
	
	}

	ngOnInit(){
		console.log('album-detail-component.ts');

		// Llamar al metodo del api para sacar album de la  base de datos
        this.getAlbum();
	}

    getAlbum(){
        console.log('el metodo funciona');
		
		this._route.params.forEach((params: Params) => {
				let id = params['id'];
	
				this._AlbumServicios.getAlbum( id).subscribe(
					response => {
						if(!response.album){
							this._router.navigate(['/']);
						}else{
							this.album = response.album;
	
							
							// Sacar las canciones

							this._CancionServicios.getCanciones(response.album._id).subscribe(
								response => {
									if(!response.canciones){
										this.alertMessage = 'Este album no tiene canciones';
									}else{
										this.canciones = response.canciones;
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
						  var body = JSON.parse(error._body);
						  //this.alertMessage = body.message;
	
						  console.log(error);
						}
					}	
				);
	
			});
		  
		}
		public confirmado:any;
	onDeleteConfirm(id:any){
		this.confirmado = id;
	}

	onCancelSong(){
		this.confirmado = null;
	}

	onDeleteSong(id:any){
		this._CancionServicios.deleteCancion( id).subscribe(
			response => {
				if(!response.cancion){
					alert('Error ene el servidor');
				}

				this.getAlbum();
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
	}

	startPlayer(cancion: any){
		let song_player = JSON.stringify(cancion);
		let file_path = this.url + 'archivo-cancion/' + cancion.file;
		let imagen_path = this.url + 'obtener-imagen-album/' + cancion.album.imagen;

		localStorage.setItem('sound_song', song_player);

		(document.getElementById("mp3-source")as any).setAttribute("src", file_path);
		(document.getElementById("player") as any).load();
		(document.getElementById("player") as any).play();

		(document.getElementById('play-song-title') as any).innerHTML = cancion.nombre;
		(document.getElementById('play-song-artist') as any).innerHTML = cancion.album.artista.nombre;
		(document.getElementById('play-image-album')as any).setAttribute('src', imagen_path);

	}
}
    
