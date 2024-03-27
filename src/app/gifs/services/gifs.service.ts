import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'pnTgNxxHtcLrQTQA0pZ2FXx6DD8MMjHb';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    this.loadFirstGift();
  }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  private organizeTag(tag: string): void {
    tag = tag.trim().toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);

    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);


  }

  private loadFirstGift(): void{

    if(this._tagsHistory.length === 0) return;

    const firstGif: string = this.tagsHistory[0];
    this.searchTag(firstGif);

    console.log(firstGif);


  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeTag(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('limit', '5');

    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search?`, { params })
      .subscribe((response) => {
        this.gifList = response.data;

        console.log({ gifs: this.gifList });
      });
  }
}
