import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';

import { AuthService } from '../services/auth';

import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage:any = TabsPage;
  signinPage = SigninPage;
  signupPage = SignupPage;
  isAuthenticated = false;
  @ViewChild('nav') nav:NavController;

  constructor(platform: Platform, 
              private menuCtrl: MenuController, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              private authService: AuthService) {
    firebase.initializeApp({
        apiKey: "AIzaSyAA3ga2x2zIHkAtGqHRBHNedihvjKc7zok",
        authDomain: "ionic-recipe-book-cf0fa.firebaseapp.com"
    })
    
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true;
        this.nav.setRoot(this.tabsPage);
      }
      else {
        this.isAuthenticated = false;
        this.nav.setRoot(this.signinPage);
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
  }
}

