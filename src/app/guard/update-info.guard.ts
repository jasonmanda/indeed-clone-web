import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlSegment, Route } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PasseDataService } from '../services/passe-data.service';
import { BaseQuery } from '../model/BaseQuery';
import { Utilisateur } from '../model/Utilisateur';
import { Grants } from '../model/Grants';
import { Image } from '../model/Image';
import { Entreprise } from '../model/Entreprise';
import { Document } from '../model/Document';
import { Resume } from '../model/Resume';
import { Contact } from '../model/Contact';

@Injectable({
  providedIn: 'root',
})
export class UpdateInfoGuard implements CanActivate, CanActivateChild, CanLoad {


  constructor(private authService: AuthService, private passeDataService: PasseDataService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    if (route.data.load_status == "load" && this.authService.current_user_grants.role.role_name != undefined && this.authService.current_user_grants.role.role_name != null) {
      try {
        this.check(route); 

      } catch (error) {
        localStorage.setItem("update-info", null);
        this.router.navigate(['/user/' + this.authService.current_user.id_utilisateur]);

      }

      this.updateInfo(route);
    }
    if (route.data.load_status == "no_load" && route.data.mod_sub_mod == "main") {
      try {
        this.check(route);

      } catch (error) {
        localStorage.setItem("update-info", null);
        this.router.navigate(['/']);
      }
      this.updateInfo(route);
    }

    return true;
  }
  private updateInfo(route: ActivatedRouteSnapshot) {

    let updateInfo:string=localStorage.getItem("update-info");
    if (updateInfo == null ||
      updateInfo == undefined ||
      updateInfo == "null" ||
      updateInfo == "") {
      localStorage.setItem("update-info", "in-progress");
      let id=setInterval(()=>{
        if(updateInfo=="in-progress"){
          localStorage.setItem("update-info",null);
          clearInterval(id);
        }
      },10000);
      this.authService.updateInfo().subscribe((data: BaseQuery<{
        image:Image,
        personne:Entreprise,
        utilisateur:Utilisateur,
        document:Resume,
        contact:Contact,
        grants:Grants,
      }>) => {
        localStorage.setItem("update-info", null);
        if (data.validate != null && data.validate != undefined) {
          if (data.validate) {
            this.authService.current_user = data.data.utilisateur as Utilisateur;
            this.authService.current_user_info = data.data.personne as Entreprise;
            this.authService.current_user_image = data.data.image as Image;
            this.authService.current_user_document = data.data.document as Resume;
            this.authService.current_user_contact = data.data.contact as Contact;
            this.authService.current_user_grants = data.data.grants as Grants;
      
            
            localStorage.setItem("current_user", JSON.stringify(this.authService.current_user));
            localStorage.setItem("current_user_info", JSON.stringify(this.authService.current_user_info));
            localStorage.setItem("current_user_image", JSON.stringify(this.authService.current_user_image));
            localStorage.setItem("current_user_document", JSON.stringify(this.authService.current_user_document));
            localStorage.setItem("current_user_contact", JSON.stringify(this.authService.current_user_contact));
            localStorage.setItem("current_user_grants", JSON.stringify(this.authService.current_user_grants));
            this.passeDataService.myUpdateInfoSubject(true);
            this.passeDataService.myMainNavSubject(true);
            this.passeDataService.myAnonymousTypeSubject(true);

            this.check(route);
          } else {
            localStorage.setItem("update-info", null);
            this.router.navigate(['/user/' + this.authService.current_user.id_utilisateur]);
        
          }
        } else {
          localStorage.setItem("update-info", null);
          this.router.navigate(['/user/' + this.authService.current_user.id_utilisateur]);

        }
      });
    }

  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    return this.canActivate(route, state);
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {

    let url = `/${route.path}`;
    return true;
  }
  private check(route: ActivatedRouteSnapshot): void {

    // if ((route.data.mod_sub_mod == "caisse_reglement"||route.data.mod_sub_mod == "caisse_historique") && this.authService.current_user_grants.caisse_grants.length < 1) {
    //   localStorage.setItem("update-info", null);
    //   this.router.navigate(['/user/' + this.authService.current_user.id_utilisateur + '']);

    // }
    // if (
    //   (route.data.mod_sub_mod == "niveau_classe" ||
    //     route.data.mod_sub_mod == "comptabilite_proformat" ||
    //     route.data.mod_sub_mod == "niveau_mat_niveau" ||
    //     route.data.mod_sub_mod == "niveau_niveau_frais_inscription" ||
    //     route.data.mod_sub_mod == "note_evaluation" ||
    //     route.data.mod_sub_mod == "note_generer" ||
    //     route.data.mod_sub_mod == "personnelle_utilisateur" ||
    //     route.data.mod_sub_mod == "professeur" ||
    //     route.data.mod_sub_mod == "reglage_caisse" ||
    //     route.data.mod_sub_mod == "scolarite_adh_historique" ||
    //     route.data.mod_sub_mod == "scolarite_annee_scolaire" //||


    //   )
    //   && this.authService.current_user_grants.ecole_grants.length < 1) {
    //     localStorage.setItem("update-info", null);
    //   this.router.navigate(['/user/' + this.authService.current_user.id_utilisateur + '']);

    // }
    // if ((
    //   route.data.mod_sub_mod == "niveau_classe" ||
    //   route.data.mod_sub_mod == "niveau_mat_niveau" ||
    //   route.data.mod_sub_mod == "niveau_niveau_frais_inscription" ||
    //   route.data.mod_sub_mod == "niveau_niveau_matiere" ||
    //   route.data.mod_sub_mod == "personnelle_utilisateur" ||
    //   route.data.mod_sub_mod == "professeur" ||
    //   route.data.mod_sub_mod == "scolarite_annee_scolaire" ||
    //   // route.data.mod_sub_mod == "scolarite_adh_historique" ||
    //   route.data.mod_sub_mod == "personnelle_role" ||
    //   route.data.mod_sub_mod == "reglage_caisse" ||
    //   route.data.mod_sub_mod == "reglage_ecole"

    // )
    //   && (this.authService.current_user_grants.ecole_admin_grants == null
    //     || this.authService.current_user_grants.ecole_admin_grants == undefined)) {
    //       localStorage.setItem("update-info", null);
    //   this.router.navigate(['/user/' + this.authService.current_user.id_utilisateur + '']);

    // }


    // if (
    //   (
    //     route.data.mod_sub_mod == "eleve" ||
    //     route.data.mod_sub_mod == "note_evaluation" ||
    //     route.data.mod_sub_mod == "note_generer" ||
    //     route.data.mod_sub_mod == "scolarite_adhesion" ||
    //     route.data.mod_sub_mod == "scolarite_adhesion_cv" ||
    //     route.data.mod_sub_mod == "scolarite_adhesion_insc" ||
    //     route.data.mod_sub_mod == "scolarite_adhesion_reinsc"

    //   )
    //   && this.authService.current_user_grants.niveau_grants.length < 1
    // ) {
    //   localStorage.setItem("update-info", null);
    //   this.router.navigate(['/user/' + this.authService.current_user.id_utilisateur + '']);

    // }



    // if (
    //   (
    //     route.data.mod_sub_mod == "eleve" ||
    //     route.data.mod_sub_mod == "note_generer" ||
    //     route.data.mod_sub_mod == "scolarite_adhesion" ||
    //     route.data.mod_sub_mod == "scolarite_adhesion_cv" ||
    //     route.data.mod_sub_mod == "scolarite_adhesion_insc" ||
    //     route.data.mod_sub_mod == "scolarite_adhesion_reinsc"

    //   )
    //   && (

    //     !this.authService.current_user_grants.ecole_prefet_grants &&
    //     !this.authService.current_user_grants.ecole_adj_prefet_grants

    //   )
    // ) {
    //   localStorage.setItem("update-info", null);
    //   this.router.navigate(['/user/' + this.authService.current_user.id_utilisateur + '']);

    // }
  }
}
