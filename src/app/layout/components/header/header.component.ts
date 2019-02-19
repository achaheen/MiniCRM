import {Component, ElementRef, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {User} from '../../../shared/model/user';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public pushRightClass: string;
  public username: string;
  languageTitle:string = 'Arabic';
  defaultLanguage:string='en';
  defaultDir:string = 'ltr';

  constructor(private translate: TranslateService, public router: Router) {
    const user: User = JSON.parse(localStorage.getItem(environment.currentUser)) as User;
    this.username = user.firstName + ' ' + user.lastName;
    this.router.events.subscribe(val => {
      if (
        val instanceof NavigationEnd &&
        window.innerWidth <= 992 &&
        this.isToggled()
      ) {
        this.toggleSidebar();
      }
    });
  }


  prepareLanguageDir(){
    console.log("prepareLanguageDir ()");
    this.defaultLanguage = localStorage.getItem('lang');
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang(this.defaultLanguage);
    this.translate.use(this.defaultLanguage);
    if (this.defaultLanguage === 'ar'){
      this.languageTitle='English';
      this.defaultDir = 'rtl';
    } else{
      this.languageTitle='Arabic';
      this.defaultDir = 'ltr';
    }

    console.log("Direction : " + this.defaultDir);
    console.log("Language : " + this.defaultLanguage );
    console.log("Language title : " + this.languageTitle);
    this.rltAndLtr();
  }
  ngOnInit() {
    this.prepareLanguageDir();
    this.pushRightClass = 'push-right';
  }

  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  rltAndLtr() {
    const dom: any = document.querySelector('body');
    dom.classList = [];
    dom.classList.add(this.defaultDir);
  }

  onLoggedout() {
    localStorage.removeItem('isLoggedin');
  }

  changeLang() {
    console.log("check language is english " + this.defaultLanguage === 'en')
    if(this.defaultLanguage === 'en'){
        this.defaultLanguage = 'ar';
        this.defaultDir = 'rtl';
        this.languageTitle = 'English';
    }else{
      this.defaultLanguage = 'en';
      this.defaultDir = 'ltr';
      this.languageTitle = 'Arabic';
    }

    this.translate.use(this.defaultLanguage);
    localStorage.setItem('lang',this.defaultLanguage);

    console.log("Direction : " + this.defaultDir);
    console.log("Language : " + this.defaultLanguage );
    console.log("Language title : " + this.languageTitle);

    this.rltAndLtr();
 //   this.updateLanguage();
  }
  //
  // updateLanguage(): void {
  //
  //   const lang = document.createAttribute('lang');
  //   lang.value = this.translate.currentLang;
  //   this.el.nativeElement.parentElement.parentElement.attributes.setNamedItem(lang);
  //
  //   const dir = document.createAttribute('dir');
  //   if(this.translate.currentLang =='ar'){
  //     dir.value = 'rtl';
  //   }else{
  //     dir.value = 'ltr';
  //   }
  //   this.el.nativeElement.parentElement.parentElement.attributes.setNamedItem(dir);
  //
  // }
}
