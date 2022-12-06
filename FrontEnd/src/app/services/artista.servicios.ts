import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest} from '@angular/common/http';



import { GLOBAL } from './global';
import { Artista } from '../models/artista';


@Injectable()
export class ArtistaServicios{
  
	
	public url: string;
	constructor(private http:HttpClient){
		this.url = GLOBAL.url;
	}
	getArtistas(page:any){
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			
		});

		return this.http.get<any>(this.url+'artistas/'+page,({ headers: headers }));
						 
	}

	getArtista(id: string){
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			
		});
		return this.http.get<any>(this.url+'artista/'+id,({ headers: headers })); 
						
	}

	addArtista(artista: Artista){
		let params = JSON.stringify(artista);
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			
		});

		return this.http.post<any>(this.url+'artista', params, {headers: headers})
   }

   editArtista( id:string, artista: Artista){
	let params = JSON.stringify(artista);
	let headers = new HttpHeaders({
		'Content-Type':'application/json',
		
	});

	return this.http.put<any>(this.url+'artista/'+id, params, {headers: headers})
					 
}

deleteArtista( id: string){
	let headers = new HttpHeaders({
		'Content-Type':'application/json',
	});

	return this.http.delete(this.url+'artista/'+id, ({ headers: headers }));

}

}