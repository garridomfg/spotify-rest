import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient ) {
    
   }

   getQuery( query:string ){

    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization':'Bearer BQBdRbjyWZfyvSLldlrtwtDNI669e_1xIy1ykPhWEyaq8DCG-pJTgRPqOSXpHtC_GTMa46oWn2mYX73QwAQ'
    });

    return this.http.get(url, { headers });
   }

   getNewReleases(){

    /* const headers = new HttpHeaders({
      'Authorization':'Bearer BQCpK-caz6Kdd7VdOLW18MqNHKnVnpWmZZzIdLFCU6I38iGHedB9ZEIxaBtO5cKqWB_nVQ1dJ8hCBeewpoI'
    }); */

    return this.getQuery('browse/new-releases')
                .pipe(map(data => data['albums'].items ));
   }

   getArtistas( termino:string ){


    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
                .pipe(map(data=> data['artists'].items ));
    //return this.http.get(`https://api.spotify.com/v1/search?q=${termino}&type=artist&limit=15`, {headers})
   }

   getArtista( id:string ){

     return this.getQuery(`artists/${id}`);
               //  .pipe(map(data=> data['artists'].items ));

   }

   getTopTracks( id:string ){

     return this.getQuery(`artists/${id}/top-tracks?country=us`)
                .pipe(map(data=> data['tracks'].items ));

   }
  }

   
