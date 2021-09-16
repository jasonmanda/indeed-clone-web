import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class WebConfigService {

  data: any = {};
 private _webConfig:string="WebConfig";
  constructor(private http: HttpClient) {}

  use(): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
    
      const webConfigPath = `assets/${this._webConfig}.json`;

      this.http.get<{}>(webConfigPath).subscribe(
        translation => {
          this.data = Object.assign({}, translation || {});
          resolve(this.data);
        },
        error => {
          this.data = {};
          resolve(this.data);
        }
      );
    });
  }
  public get webConfig():string{
    return this._webConfig;
  }
  public set webConfig(value:string){
    this._webConfig=value;
  }

}
