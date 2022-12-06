import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';
import { Artista } from '../models/artista';





@Injectable()
export class UsuarioServicios {

public url:string;
public identity:any;
public token:any;


constructor(private http:HttpClient){
    this.url = GLOBAL.url;
}
signup(usarioLogin: any, gettoken = false): Observable<any> {
 
    // Comprobar si llega el gettoken
    if (gettoken != false) {
        usarioLogin.gettoken = gettoken;
    }

    let json = JSON.stringify(usarioLogin);
    let params = json;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(this.url+'login', params, { headers });

}
registro(usuarioRegistro: any){
    let json = JSON.stringify(usuarioRegistro);
    let params = json;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<any>(this.url + 'registro', params, { headers });

}
actualizarUsuario(usuarioActualizar:any){
    let params = JSON.stringify(usuarioActualizar);
    let headers = new HttpHeaders({
            'Content-Type':'application/json',
          
        });

    return this.http.put<any>(this.url+'actualizarUsuario/'+usuarioActualizar._id,  params, {headers: headers});
                     
}


getIdentity(){
    let localIdentity = localStorage.getItem('identity');
        if (localIdentity != null) {
            var identity = JSON.parse(localIdentity);
        }
    if (identity != false) 
        this.identity = identity;
    else 
        this.identity = false;
    return this.identity;
    }


getToken(){
    let token = localStorage.getItem('token');

    if(token != 'undefined'){
        this.token = token;
    }else{
        this.token = null;
    }

    return this.token;
}

};



