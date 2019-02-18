import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor() {
    }

    language:string;
    direction:string;
    ngOnInit() {
        this.language = localStorage.getItem('lang');
        if(this.language == 'ar'){
          this.direction='rtl';
        }else{
          this.direction='ltr';
        }
    }
}
