import { ModuleWithProviders } from "@angular/core";
import {Router, RouterModule, Routes} from "@angular/router";

//Import Usuario

import {HomeComponent } from 'src/components/home-component';
import { UsuarioEditComponent } from "src/components/usuario-edit-component";


//Import Artista

import { ArtistaListComponent } from 'src/components/artista-list-component';
import { ArtistaAddComponent  } from 'src/components/artista-add-component';
import { ArtistaEditComponent } from 'src/components/artista-edit-component';
import { ArtistaDetailComponent } from 'src/components/artista-detail.component';

// Import Album
import { AlbumAddComponent  } from 'src/components/album-add-component';
import { AlbumEditComponent  } from 'src/components/album-edit-component';
import { AlbumDetailComponent  } from 'src/components/album-detail-component';
import { AlbumsListComponent } from "src/components/album-list-component";

// Import Cancion 

import { CancionAddComponent  } from 'src/components/cancion-add-component';
import { CancionEditComponent  } from 'src/components/cancion-edit-component';


const appRoutes: Routes = [


    // Artista 

    {path: 'artistas/:page', component: ArtistaListComponent},
    {path:  'crear-artista', component: ArtistaAddComponent},
    {path:  'editar-artista/:id', component: ArtistaEditComponent},
    {path:  'artista/:id', component: ArtistaDetailComponent},

     // Album

    {path:  'crear-album/:artista', component: AlbumAddComponent},
    {path:  'editar-album/:id', component: AlbumEditComponent},
    {path:  'album/:id', component: AlbumDetailComponent},
    {path: 'albums', component: AlbumsListComponent},
    // cancion 

    {path:  'crear-cancion/:album', component: CancionAddComponent},
    {path:  'editar-cancion/:id', component: CancionEditComponent},
    
     // Home 
    {path: 'mis-datos', component: UsuarioEditComponent},
    {path: '**', component: HomeComponent},

];

export const appRoutingProviders: any [] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);