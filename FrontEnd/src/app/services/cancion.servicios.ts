import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest} from '@angular/common/http';


import { GLOBAL } from './global';
import { Cancion } from '../models/cancion';

@Injectable()
export class CancionServicios{
	public url: string;

	constructor(private http:HttpClient){
		this.url = GLOBAL.url;
	}

	getCanciones(albumId = null){
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			
		});

		if(albumId == null){
			return this.http.get<any>(this.url+'canciones', ({headers: headers}))
				
		}else{
			return this.http.get<any>(this.url+'canciones/'+albumId,({headers: headers}) )
				
		}
	}


	getCancion(id: string){
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
		});

		return this.http.get<any>(this.url+'cancion/'+id, ({headers: headers}))
						
	}

	addCancion( cancion: Cancion){
		let params = JSON.stringify(cancion);
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
	
		});

		return this.http.post<any>(this.url+'cancion', params, {headers: headers})
						 
	}

	editCancion(id:string, cancion: Cancion){
		let params = JSON.stringify(cancion);
		let headers = new HttpHeaders({
			'Content-Type':'application/json'
		});

		return this.http.put<any>(this.url+'cancion/'+id, params, {headers: headers})
						
	}



    
	deleteCancion(id: string){
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
		});

		return this.http.delete<any>(this.url+'cancion/'+id, ({headers: headers}));			 
	} 

}