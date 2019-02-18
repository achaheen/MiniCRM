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

  constructor(public el: ElementRef,private translate: TranslateService, public router: Router) {

    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|ar/) ? browserLang : 'en');

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

  ngOnInit() {
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
    dom.classList.toggle('rtl');
  }

  onLoggedout() {
    localStorage.removeItem('isLoggedin');
  }

  changeLang() {

    if(localStorage.getItem('lang') == 'en')
    {
      this.translate.use('ar');
      localStorage.setItem('lang','ar');
      this.languageTitle ='English';
    }else{
      this.translate.use('en');
      localStorage.setItem('lang','en');
      this.languageTitle ='Arabic';
    }
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
