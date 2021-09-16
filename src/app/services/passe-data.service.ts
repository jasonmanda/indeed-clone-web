import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Role, RoleStepOneConfig } from '../model/Role';
import { UtilisateurStepOneConfig, Utilisateur } from '../model/Utilisateur';
import { Image } from '../model/Image';


@Injectable({
  providedIn: 'root'
})
export class PasseDataService {

  public roleStepOneConfigSubject: Subject<RoleStepOneConfig[]> = new Subject<RoleStepOneConfig[]>();
  public roleStepOneConfigObservable: Observable<RoleStepOneConfig[]> = new Observable<RoleStepOneConfig[]>();



  public utilisateurStepOneConfigSubject: Subject<UtilisateurStepOneConfig[]> = new Subject<UtilisateurStepOneConfig[]>();
  public utilisateurStepOneConfigObservable: Observable<UtilisateurStepOneConfig[]> = new Observable<UtilisateurStepOneConfig[]>();

  public anonymousTypeSubject: Subject<any> = new Subject<any>();
  public anonymousTypeObservable: Observable<any> = new Observable<any>();


  public updateInfoSubject: Subject<boolean> = new Subject<boolean>();
  public updateInfoObservable: Observable<boolean> = new Observable<boolean>();

  public mainNavSubject: Subject<boolean> = new Subject<boolean>();
  public mainNavObservable: Observable<boolean> = new Observable<boolean>();

  
  public imageSubject: Subject<Image> = new Subject<Image>();
  public imageObservable: Observable<Image> = new Observable<Image>();

  public utilisateurTypeSubject: Subject<Utilisateur> = new Subject<Utilisateur>();
  public utilisateurTypeObservable: Observable<Utilisateur> = new Observable<Utilisateur>();
  ///Ex
  constructor() {

    this.roleStepOneConfigObservable = this.roleStepOneConfigSubject.asObservable();


    this.utilisateurStepOneConfigObservable = this.utilisateurStepOneConfigSubject.asObservable();
    this.anonymousTypeObservable = this.anonymousTypeSubject.asObservable();
    this.utilisateurTypeObservable = this.utilisateurTypeSubject.asObservable();


    this.updateInfoObservable = this.updateInfoSubject.asObservable();
    this.mainNavObservable = this.mainNavSubject.asObservable();
    this.imageObservable = this.imageSubject.asObservable();
 
  }



  public myAnonymousTypeSubject(data1: any) {

    if (this.anonymousTypeSubject.observers.length > 1) {
      for (var i = 0; i < this.anonymousTypeSubject.observers.length; i++) {
        this.anonymousTypeSubject.observers.pop();
      }
    }
    this.anonymousTypeSubject.next(data1);

  }
  public myUpdateInfoSubject(data: boolean) {

    if (this.updateInfoSubject.observers.length > 1) {
      for (var i = 0; i < this.updateInfoSubject.observers.length; i++) {
        this.updateInfoSubject.observers.pop();
      }
    }
    this.updateInfoSubject.next(data);

  }


  public myMainNavSubject(data: boolean) {

    if (this.mainNavSubject.observers.length > 1) {
      for (var i = 0; i < this.mainNavSubject.observers.length; i++) {
        this.mainNavSubject.observers.pop();
      }
    }
    this.mainNavSubject.next(data);

  }
  public myImageSubject(data: Image) {

    if (this.imageSubject.observers.length > 1) {
      for (var i = 0; i < this.imageSubject.observers.length; i++) {
        this.imageSubject.observers.pop();
      }
    }
    this.imageSubject.next(data);

  }
  public myUtilisateurStepOneConfigSubject(data1: UtilisateurStepOneConfig[]) {
    if (this.utilisateurStepOneConfigSubject.observers.length > 1) {
      for (var i = 0; i < this.utilisateurStepOneConfigSubject.observers.length; i++) {
        this.utilisateurStepOneConfigSubject.observers.pop();
      }
    }
    this.utilisateurStepOneConfigSubject.next(data1);
  }


  public myRoleStepOneConfigSubject(data: RoleStepOneConfig[]) {
    if (this.roleStepOneConfigSubject.observers.length > 1) {
      for (var i = 0; i < this.roleStepOneConfigSubject.observers.length; i++) {
        this.roleStepOneConfigSubject.observers.pop();
      }
    }

    this.roleStepOneConfigSubject.next(data);
  }

  public myUtilisateurTypeSubject(data1: Utilisateur) {

    if (this.utilisateurTypeSubject.observers.length > 1) {
      for (var i = 0; i < this.utilisateurTypeSubject.observers.length; i++) {
        this.utilisateurTypeSubject.observers.pop();
      }
    }
    this.utilisateurTypeSubject.next(data1);

  }
}
