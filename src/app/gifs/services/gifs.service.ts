import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _tagsHistory: string[] = [];
  private apiKey: string = 'pnTgNxxHtcLrQTQA0pZ2FXx6DD8MMjHb';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {}

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
  }

  async searchTag(tag: string): Promise<void> {
    if (tag.trim().length === 0) return;
    this.organizeTag(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('limit', '5');

    this.http
      .get(`${this.serviceUrl}/search?`, { params })
      .subscribe((response) => {
        console.log(response);
      });

    // fetch(
    //   'https://api.giphy.com/v1/gifs/search?api_key=pnTgNxxHtcLrQTQA0pZ2FXx6DD8MMjHb&q=goku&limit=5'
    // )
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
  }
}
