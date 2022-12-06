import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest} from '@angular/common/http';


import { GLOBAL } from './global';
import { Album } from '../models/album';
import { Artista } from '../models/artista';

@Injectable()
export class AlbumServicios{
   
	public url: string;

	constructor(private http:HttpClient){
		this.url = GLOBAL.url;
	}
	getAlbums(artistaId = null){
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			
		});
		

		if(artistaId == null){
			return this.http.get<any>(this.url+'albums/',({headers:headers}) )
					
		}else{
			return this.http.get<any>(this.url+'albums/'+ artistaId , ({headers:headers}))
					
		}

	}

	getalbums(id:any){
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			
		});

		return this.http.get<any>(this.url+'artistas/',({ headers: headers }));
						 
	}
	

	getAlbum(id: string){
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			
		});
		return this.http.get<any>(this.url+'album/'+id,({ headers: headers })); 
						
	}

	addAlbum(album: Album){
		let params = JSON.stringify(album);
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			
		});

		return this.http.post<any>(this.url+'album/', params, {headers: headers})
   }

  editAlbum( id:string, album: Album){
	let params = JSON.stringify(album);
	let headers = new HttpHeaders({
		'Content-Type':'application/json',
		
	});

	return this.http.put<any>(this.url+'album/'+id, params, {headers: headers})
					 
}

deleteAlbum( id: string){
	let headers = new HttpHeaders({
		'Content-Type':'application/json',
	});

	return this.http.delete<any>(this.url+'album/'+id, ({ headers: headers }));

}

}