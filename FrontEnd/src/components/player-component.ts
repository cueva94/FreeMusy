import {Component, OnInit} from '@angular/core';
import { Cancion } from '../app/models/cancion';
import { GLOBAL } from '../app/services/global';

@Component({
	selector: 'player',
	template: `
	<div class="album-image">
    <span *ngIf="cancion.album">
        <img id="play-image-album" src="{{ url + 'obtener-imagen-album/' + cancion.album.imagen}}" />
    </span>

    <span *ngIf="!cancion.album">
        <img id="play-image-album" />
    </span>
</div>

<div class="audio-file">
    <p>Reproduciendo</p>
    <span id="play-song-title">
        {{cancion.nombre}}
    </span>
    |
    <span id="play-song-artist">
        <span *ngIf="cancion.album.artista">
            {{cancion.album.artista.nombre}}
        </span>
    </span>
    <audio controls id="player">
        <source id="mp3-source" src="{{ url + 'archivo-cancion/'+cancion.file }}" type="audio/mpeg">
        Tu navegador no es compatible con HTML5
    </audio>
</div>

	`
})

export class PlayerComponent implements OnInit{
	public url: string;
	public cancion:any;

	constructor(){
		this.url = GLOBAL.url;
   
	}

	ngOnInit(){
		console.log('player cargado');

        var cancion = JSON.parse(localStorage.getItem('sound_song')!);
		if(cancion){
			this.cancion = cancion;
		}else{
			this.cancion = new Cancion('',1,'','','','');
		}
    }
}