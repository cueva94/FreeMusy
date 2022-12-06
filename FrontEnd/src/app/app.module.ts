import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { AppRoutingModule } from './app-routing.module';

// general 

import { AppComponent } from './app.component';
import {HomeComponent } from 'src/components/home-component';


// usuario

import { UsuarioEditComponent } from 'src/components/usuario-edit-component';

// artista 

import { ArtistaAddComponent  } from 'src/components/artista-add-component';
import { ArtistaListComponent } from 'src/components/artista-list-component';
import { ArtistaEditComponent } from 'src/components/artista-edit-component';
import { ArtistaDetailComponent } from 'src/components/artista-detail.component';

// Album

import { AlbumAddComponent  } from 'src/components/album-add-component';
import { AlbumEditComponent  } from 'src/components/album-edit-component';
import { AlbumDetailComponent  } from 'src/components/album-detail-component';
import { AlbumsListComponent } from 'src/components/album-list-component';

// Cancion 

import { CancionAddComponent  } from 'src/components/cancion-add-component';
import { CancionEditComponent  } from 'src/components/cancion-edit-component';
import { PlayerComponent  } from 'src/components/player-component';


@NgModule({
  declarations: [
    AppComponent,
    UsuarioEditComponent,
    ArtistaListComponent,
    HomeComponent,
    ArtistaAddComponent,
    ArtistaEditComponent,
    ArtistaDetailComponent,
    AlbumAddComponent,
    AlbumEditComponent,
    AlbumsListComponent,
    AlbumDetailComponent,
    CancionAddComponent,
    CancionEditComponent,
    PlayerComponent,
   
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
 
  
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
