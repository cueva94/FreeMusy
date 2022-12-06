import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { GLOBAL } from './global';
import { Artista } from '../models/artista';


@Injectable()
export class ActualizarServicios{
    public url: string;
	constructor(private http:HttpClient){
		this.url = GLOBAL.url;
		
	}

	makeFileRequest(url: string, _params: Array<string>, files: Array<File> , name:string){
	

		return new Promise(function(resolve, reject){
			var formData:any = new FormData();
			var xhr = new XMLHttpRequest();

			for(var i = 0; i < files.length; i++){
				formData.append(name, files[i], files[i].name);
			}

			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						resolve(JSON.parse(xhr.response));
					}else{
						reject(xhr.response);
					}
					
				}
			}

			xhr.open('POST', url, true);
			xhr.setRequestHeader;
		    xhr.send(formData);
		});
	}
}