import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpRequest} from '@angular/common/http';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  public baseURL = environment.apiUrl + 'upload/uploadMultipleFiles';

  private _headers: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this._headers = new HttpHeaders().set('Content-Type', 'multipart/form-data')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE')
      .set('Access-Control-Allow-Headers', 'Accept,Accept-Language,Content-Language,Content-Type')
      .set('Access-Control-Expose-Headers', 'Content-Length,Content-Range');
  }

  uploadFiles(files: any[]) {
    const uploadData = new FormData();
    for (let i = 0; i < files.length; i++) {
      uploadData.append('files', files[i], files[i].name);
    }

    return this.httpClient.post(this.baseURL, uploadData);

  }
}

