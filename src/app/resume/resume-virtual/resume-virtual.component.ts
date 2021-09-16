import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import * as $ from 'jquery';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import { VilleDatabase } from 'src/app/model/VilleDatabase';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { DocumentService } from 'src/app/services/helpers/document.service';
import { BusinessReglageHelpersService } from 'src/app/services/business-helpers/business-reglage-helpers.service';
import { MatDialog } from '@angular/material/dialog';
import { ValidateSnTelValidator } from 'src/app/validator/validate-sn-tel-validator';
import { ValidateUrlValidator } from 'src/app/validator/validate-url-validator';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { Document } from 'src/app/model/Document';
import { ReglageService } from 'src/app/services/reglage.service';
import { DialogResponse } from 'src/app/model/DialogResponse';
import { SharedViewPdfComponent } from 'src/app/shared/view-pdf/shared-view-pdf.component';
import { Personne } from 'src/app/model/Personne';
import { BaseQuery } from 'src/app/model/BaseQuery';
import { ResumeService } from 'src/app/services/resume.service';
import { Resume } from 'src/app/model/Resume';
import { ExpPro } from 'src/app/model/ExpPro';
import { Formation } from 'src/app/model/Formation';
import { Certificat } from 'src/app/model/Certificat';
import { Competence } from 'src/app/model/Competence';
import { Langue } from 'src/app/model/Langue';
import { Ville } from 'src/app/model/Ville';
import { Contact } from 'src/app/model/Contact';



@Component({
  selector: 'app-resume-virtual',
  templateUrl: './resume-virtual.component.html',
  styleUrls: ['./resume-virtual.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
  ]
})
export class ResumeVirtualComponent implements OnInit {

  form_step_one: FormGroup;
  maxDate: Date = new Date();
  a_propos: FormControl = new FormControl(null, Validators.compose([Validators.required, Validators.minLength(30)]));

  facebook: FormControl = new FormControl(null, Validators.compose([Validators.pattern(/[(http(s)?)://(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)+$/), ValidateUrlValidator.facebook]));
  linkedin: FormControl = new FormControl(null, Validators.compose([Validators.pattern(/[(http(s)?)://(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)+$/), ValidateUrlValidator.linkedin]));
  mail: FormControl = new FormControl(null, Validators.compose([Validators.email]));
  numero: FormControl = new FormControl(null, Validators.compose([ValidateSnTelValidator.snValidFixMobileOk, ValidateSnTelValidator.snValidFixOk]));
  twitter: FormControl = new FormControl(null, Validators.compose([Validators.pattern(/[(http(s)?)://(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)+$/), ValidateUrlValidator.twitter]));
  website: FormControl = new FormControl(null, Validators.compose([Validators.pattern(/[(http(s)?)://(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)+$/), ValidateUrlValidator.website]));
  pret_salary_min: FormControl = new FormControl(null, Validators.compose([Validators.min(0)]));
  pret_salary_max: FormControl = new FormControl(null, Validators.compose([Validators.min(this.pret_salary_min.value)]));
  fichier: FormControl = new FormControl(null);
  nom: FormControl = new FormControl(null);// constraint remove//, Validators.required);
  prenom: FormControl = new FormControl(null);// constraint remove//, Validators.required);
  where: FormControl = new FormControl(null);// constraint remove//, Validators.required);

  listExpProfessionnelleGroup: FormArray;
  listFormationGroup: FormArray;
  listCertificatGroup: FormArray;
  listCompetenceGroup: FormArray;
  listLangueGroup: FormArray;
  ///Base declaration
  filteredOptions: Observable<string[]>[] = [];
  filteredOptions1: Observable<string[]>;
  listVilles: string[] = [];
  businessReglageHelpersService: BusinessReglageHelpersService;
  public current_user_document: Resume;
  progress_upload: boolean = false;
  progress_upload_real: boolean = true;
  documentExists: boolean = false;

  constructor(public resumeService: ResumeService, public documentService: DocumentService, public reglageService: ReglageService, public authService: AuthService, private domSanitizer: DomSanitizer, private matIconRegistry: MatIconRegistry, private fb: FormBuilder, private dialog: MatDialog) {

    this.matIconRegistry.addSvgIcon(
      'facebook',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.authService.base_host + 'assets/facebook.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'twitter',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.authService.base_host + 'assets/twitter.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'linkedin',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.authService.base_host + 'assets/linkedin.svg')
    );
    this.businessReglageHelpersService = new BusinessReglageHelpersService();
    if (localStorage.getItem("current_user_document") == null || localStorage.getItem("current_user_document") == undefined) {
      this.documentExists = false;
      localStorage.setItem("current_user_document", null);
      this.current_user_document = null;
      authService.current_user_document = null;
    } else {

      this.current_user_document = JSON.parse(localStorage.getItem("current_user_document")) as Resume;

      if (this.current_user_document == null || this.current_user_document == undefined) {
        this.documentExists = false;
      } else {
        if (this.current_user_document.cv == null || this.current_user_document.cv == undefined) {
          this.documentExists = false;
        } else {
          if (this.current_user_document.cv.document == null || this.current_user_document.cv.document == undefined) {
            this.documentExists = false;
          } else {
            this.documentExists = true;

          }
        }
      }
      authService.current_user_document = this.current_user_document;
  
    }
  }

  ngOnInit() {
    this.listVilles = VilleDatabase.DATA;

    this.loadStepOneForm();
    if(this.current_user_document!=null && this.current_user_document!=undefined){
      this.loadControls(this.current_user_document);
      
    }
    

    this.filteredOptions1 = this.where.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.listVilles))
      );

  }
  loadStepOneForm() {
    this.form_step_one = new FormGroup({
      a_propos: this.a_propos,
      listExpProfessionnelleGroup: this.loadListExpProfessionnelGroupFormArray(),
      listFormationGroup: this.loadListFormationGroupFormArray(),
      listCertificatGroup: this.loadListCertificatGroupFormArray(),
      listCompetenceGroup: this.loadListCompetenceGroupFormArray(),
      listLangueGroup: this.loadListLangueGroupFormArray(),
      facebook: this.facebook,
      linkedin: this.linkedin,
      mail: this.mail,
      numero: this.numero,
      twitter: this.twitter,
      website: this.website,
      pret_salary_min: this.pret_salary_min,
      pret_salary_max: this.pret_salary_max,
      fichier: this.fichier,
      nom: this.nom,
      prenom: this.prenom,
      where: this.where,

    });
  }
  loadListExpProfessionnelGroupFormArray(): FormArray {
    this.listExpProfessionnelleGroup = this.fb.array([]);
    return this.listExpProfessionnelleGroup;
  }
  loadListFormationGroupFormArray(): FormArray {
    this.listFormationGroup = this.fb.array([]);
    return this.listFormationGroup;
  }
  loadListCertificatGroupFormArray(): FormArray {
    this.listCertificatGroup = this.fb.array([]);
    return this.listCertificatGroup;
  }
  loadListCompetenceGroupFormArray(): FormArray {
    this.listCompetenceGroup = this.fb.array([]);
    return this.listCompetenceGroup;
  }
  loadListLangueGroupFormArray(): FormArray {
    this.listLangueGroup = this.fb.array([]);
    return this.listLangueGroup;
  }
  addExpPro() {

    (this.form_step_one.controls.listExpProfessionnelleGroup as FormArray).push(this.fb.group({
      exp_pro: new FormControl(null),
      exp_pro_deb: new FormControl(null),
      exp_pro_fin: new FormControl(null),
      nom_soc: new FormControl(null),
      where: new FormControl(null),
      poste: new FormControl(null),
      description: new FormControl(null),
    }));
    let arrayControl: FormArray = this.form_step_one.get('listExpProfessionnelleGroup') as FormArray;

    this.filteredOptions[(arrayControl.length - 1)] = arrayControl.at((arrayControl.length - 1)).get('where').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.listVilles))
      );


  }
  addFormation() {

    (this.form_step_one.controls.listFormationGroup as FormArray).push(this.fb.group({
      formation: new FormControl(null),
      formation_deb: new FormControl(null),
      formation_fin: new FormControl(null),
      titre_formation: new FormControl(null),
      description: new FormControl(null),
      niveau_etude: new FormControl("aucun"),
      document: new FormControl(null),
      fichier: new FormControl(null),
      fichier_label: new FormControl(null),

    }));



  }
  addCertificat() {

    (this.form_step_one.controls.listCertificatGroup as FormArray).push(this.fb.group({
      certificat: new FormControl(null),
      certificat_deb: new FormControl(null),
      certificat_fin: new FormControl(null),
      titre_certificat: new FormControl(null),
      description: new FormControl(null),
      uid_certificat: new FormControl(null),
      url_certificat: new FormControl(null),
      document: new FormControl(null),
      fichier: new FormControl(null),
      fichier_label: new FormControl(null),

    }));



  }

  addCompetence() {

    (this.form_step_one.controls.listCompetenceGroup as FormArray).push(this.fb.group({
      competence: new FormControl(null),
      libelle: new FormControl(null),// titre_diplome: new FormControl(),
      echelle: new FormControl(null),
      annee: new FormControl(null),
      mois: new FormControl(null),
      semaine: new FormControl(null),
      jour: new FormControl(null),

    }));



  }
  ///Open Modal  Popup
  public openMessageDialog(header: string, message: string, option_button: string): void {
    this.businessReglageHelpersService.openMessageDialog(header, message, option_button, { component: this });
  }

  importFormationFile($event) {
    let file: File = $event.file as File;
    let index: number = $event.index as number;
    let arrayControl1: FormArray = this.form_step_one.get('listFormationGroup') as FormArray;
    let arrayControl2: FormArray = this.form_step_one.get('listFormationGroup') as FormArray;

    if (this.documentService.checkDocumentExtension(file.name, [".pdf"])) {
      arrayControl1.at(index).get('fichier').setValue(null);
      arrayControl2.at(index).get('fichier_label').setValue(null);
      this.openMessageDialog("Erreur de format", "Le format supporté est le pdf", "ok");

    } else {

      arrayControl2.at(index).get('fichier_label').setValue(file.name);



      let fd = new FormData();
      fd.append("fichier", file);
      this.reglageService.documentSave(fd, "formation").subscribe((data: BaseQuery<{ document: Document }>) => {
        this.progress_upload = false;
        this.progress_upload_real = true;
        if (data.validate != null && data.validate != undefined) {
          if (data.validate) {
            // localStorage.setItem("current_user_document",JSON.stringify(data.data.document));
            // this.documentExists=true;
            arrayControl1.at(index).get('document').setValue(JSON.stringify(data.data.document));
            this.showDocument(data.data.document);
          } else {
            this.openMessageDialog("Erreur durant le téléchargement du document", data.erreur_mssg, "ok");
            // localStorage.setItem("current_user_document", null);
            // this.documentExists=false;

          }
        }
      });
    }



  }
  importCertificatFile($event) {
    let file: File = $event.file as File;
    let index: number = $event.index as number;
    let arrayControl1: FormArray = this.form_step_one.get('listCertificatGroup') as FormArray;
    let arrayControl2: FormArray = this.form_step_one.get('listCertificatGroup') as FormArray;

    if (this.documentService.checkDocumentExtension(file.name, [".pdf"])) {
      arrayControl1.at(index).get('fichier').setValue(null);
      arrayControl2.at(index).get('fichier_label').setValue(null);
      this.openMessageDialog("Erreur de format", "Le format supporté est le pdf", "ok");

    } else {

      arrayControl2.at(index).get('fichier_label').setValue(file.name);
      let fd = new FormData();
      fd.append("fichier", file);
      this.reglageService.documentSave(fd, "certificat").subscribe((data: BaseQuery<{ document: Document }>) => {
        this.progress_upload = false;
        this.progress_upload_real = true;
        if (data.validate != null && data.validate != undefined) {
          if (data.validate) {
            // localStorage.setItem("current_user_document",JSON.stringify(data.data.document));
            // this.documentExists=true;
            arrayControl1.at(index).get('document').setValue(JSON.stringify(data.data.document));
            this.showDocument(data.data.document);
          } else {
            this.openMessageDialog("Erreur durant le téléchargement du document", data.erreur_mssg, "ok");
            // localStorage.setItem("current_user_document", null);
            // this.documentExists=false;

          }
        }
      });
    }


  } 
  public _filter(value: string, options: string[]): string[] {
    if (value == null) return [];
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }
  removeExpPo($event) {
    let index = $event.index as number;
    if (this.current_user_document.exp_pro[index] != null && this.current_user_document.exp_pro[index] != undefined) {
      this.current_user_document.exp_pro[index].etat_exp_pro = false;
      this.uploadCurrentUserDocument();

    }
    (this.form_step_one.controls.listExpProfessionnelleGroup as FormArray).removeAt(index);

  }
  removeFormation($event) {
    let index = $event.index as number;
    if (this.current_user_document.formation[index] != null && this.current_user_document.formation[index] != undefined) {
      this.current_user_document.formation[index].etat_formation = false;
      this.uploadCurrentUserDocument();

    }
    (this.form_step_one.controls.listFormationGroup as FormArray).removeAt(index);
  }
  removeFormationDocument($event) {

    let arrayControl1: FormArray = this.form_step_one.get('listFormationGroup') as FormArray;

    let document: Document = JSON.parse(arrayControl1.at($event.index).get('document').value) as Document;

    if (document == null || document == undefined) {
      this.openMessageDialog("Erreur document", "Le document n'existe pas", "ok");
      return;
    }

    this.reglageService.documentDelete(document.id_document).subscribe((data: BaseQuery<{ document: any }>) => {
      this.progress_upload = false;
      this.progress_upload_real = true;
      if (data.validate != null && data.validate != undefined) {
        if (data.validate) {
          arrayControl1.at($event.index).get('document').setValue(null);
          arrayControl1.at($event.index).get('fichier').setValue(null);
          arrayControl1.at($event.index).get('fichier_label').setValue(null);

        } else {
          this.openMessageDialog("Erreur durant la suppression du document", data.erreur_mssg, "ok");
        }
      }
    });
  }
  readFormationDocument($event) {
    let arrayControl1: FormArray = this.form_step_one.get('listFormationGroup') as FormArray;

    let document: Document = JSON.parse(arrayControl1.at($event.index).get('document').value) as Document;

    if (document == null || document == undefined) {
      this.openMessageDialog("Erreur document", "Le document n'existe pas", "ok");
      return;
    }
    this.showDocument(document);
  }

  removeCertificat($event) {
    let index = $event.index as number;
    if (this.current_user_document.certificat[index] != null && this.current_user_document.certificat[index] != undefined) {
      this.current_user_document.certificat[index].etat_certificat = false;
      this.uploadCurrentUserDocument();

    }
    (this.form_step_one.controls.listCertificatGroup as FormArray).removeAt(index);
  }
  removeCertificatDocument($event) {

    let arrayControl1: FormArray = this.form_step_one.get('listCertificatGroup') as FormArray;

    let document: Document = JSON.parse(arrayControl1.at($event.index).get('document').value) as Document;

    if (document == null || document == undefined) {
      this.openMessageDialog("Erreur document", "Le document n'existe pas", "ok");
      return;
    }

    this.reglageService.documentDelete(document.id_document).subscribe((data: BaseQuery<{ document: any }>) => {
      this.progress_upload = false;
      this.progress_upload_real = true;
      if (data.validate != null && data.validate != undefined) {
        if (data.validate) {
          arrayControl1.at($event.index).get('document').setValue(null)
          arrayControl1.at($event.index).get('fichier').setValue(null);
          arrayControl1.at($event.index).get('fichier_label').setValue(null);

        } else {
          this.openMessageDialog("Erreur durant la suppression du document", data.erreur_mssg, "ok");
        }
      }
    });
  }
  readCertificatDocument($event) {
    let arrayControl1: FormArray = this.form_step_one.get('listCertificatGroup') as FormArray;

    let document: Document = JSON.parse(arrayControl1.at($event.index).get('document').value) as Document;

    if (document == null || document == undefined) {
      this.openMessageDialog("Erreur document", "Le document n'existe pas", "ok");
      return;
    }
    this.showDocument(document);
  }


  removeCompetence($event) {
    let index = $event.index as number;
    if (this.current_user_document.competence[index] != null && this.current_user_document.competence[index] != undefined) {
      this.current_user_document.competence[index].etat_competence = false;
      this.uploadCurrentUserDocument();

    }
    (this.form_step_one.controls.listCompetenceGroup as FormArray).removeAt(index);
  }

  addLangue() {
    (this.form_step_one.controls.listLangueGroup as FormArray).push(this.fb.group({
      langue: new FormControl(null),
      libelle: new FormControl(null),// titre_diplome: new FormControl(),
      echelle: new FormControl(null),

    }));



  }



  removeLangue($event) {
    let index = $event.index as number;
    if (this.current_user_document.langue[index] != null && this.current_user_document.langue[index] != undefined) {
      this.current_user_document.langue[index].etat_langue = false;
      this.uploadCurrentUserDocument();
    }
    (this.form_step_one.controls.listLangueGroup as FormArray).removeAt(index);
  }
  uploadCurrentUserDocument(){
    localStorage.setItem("current_user_document",JSON.stringify(this.current_user_document));
  }
  public readDocument() {
    let document: Resume = JSON.parse(localStorage.getItem("current_user_document")) as Resume;

    this.current_user_document = document;
    this.authService.current_user_document = this.current_user_document;
    if (document == null || document == undefined) {
      this.openMessageDialog("Erreur document", "Le document n'existe pas", "ok");
      return;
    } else if (document.cv == null || document.cv == undefined) {
      this.openMessageDialog("Erreur document", "Le document n'existe pas", "ok");
      return;
    } else if (document.cv.document == null || document.cv.document == undefined) {
      this.openMessageDialog("Erreur document", "Le document n'existe pas", "ok");
      return;
    }
    this.showDocument(document.cv.document);

  }
  ///Open Popup modal
  public openDialog(data: any, component: any, width_type_dimen: string = "px", height_type_dimen: string = "px", width?: number, height?: number): void {

    let lwidth = (width == null ? 'auto' : "" + width + width_type_dimen);
    let lheight = (height == null ? 'auto' : "" + height + height_type_dimen);

    const dialogRef = this.dialog.open(component, {
      autoFocus: false,
      closeOnNavigation: true,
      data: data,
      disableClose: true,
      // backdropClass: 'cdk-overlay-transparent-backdrop',
      height: lheight,
      // position: {
      //   top: '0',
      //   right: '0'
      // },
      width: lwidth
    });

    dialogRef.afterClosed().subscribe((data: DialogResponse) => {

    });


  }
  public showDocument(document: Document) {
    ///Image or document
    let url_pdf = this.documentService.getDocumentPath(document.path_document);
    let type_file: string = "";

    if (!this.documentService.checkDocumentExtension((document.path_document), [".pdf"])) {
      type_file = "pdf";
    } else {
      type_file = "image";
    }



    this.openDialog({ type_file: type_file, url_pdf: url_pdf, mssg: "Afficher le document" }, SharedViewPdfComponent, "px", "px", 1366, 550);

  }
  public removeDocument() {
    let document: Resume = JSON.parse(localStorage.getItem("current_user_document")) as Resume;
    if (document == null || document == undefined) {
      this.openMessageDialog("Erreur document", "Le document n'existe pas", "ok");
      return;
    } else if (document.cv == null || document.cv == undefined) {
      this.openMessageDialog("Erreur document", "Le document n'existe pas", "ok");
      return;
    } else if (document.cv.document == null || document.cv.document == undefined) {
      this.openMessageDialog("Erreur document", "Le document n'existe pas", "ok");
      return;
    }

    this.businessReglageHelpersService.removeDocument({ component: this });
  }
  ///Check the image extension and validate when user change the logo
  public cvChange(event, option) {
    this.businessReglageHelpersService.cvChange(event, option, { component: this });

  }
  onSubmit() {
    let rawValue = this.form_step_one.getRawValue();

    let personne: Personne = this.authService.current_user_info.personne;
    personne.nom_personne = rawValue.nom;
    personne.prenom_personne = rawValue.prenom;
    personne.ville.nom_ville = rawValue.where;
    this.current_user_document.cv.personne = personne;
    if(this.current_user_document.cv.contact==null||this.current_user_document.cv==undefined){
      this.current_user_document.cv.contact=new Contact();
    }

    this.current_user_document.cv.contact.facebook=rawValue.facebook;
    this.current_user_document.cv.contact.linkedin=rawValue.linkedin;
    this.current_user_document.cv.contact.mail=rawValue.mail;
    this.current_user_document.cv.contact.numero=rawValue.numero;
    this.current_user_document.cv.contact.twitter=rawValue.twitter;
    this.current_user_document.cv.contact.website=rawValue.website;



    rawValue.listExpProfessionnelleGroup.forEach(element => {
        let enter:boolean=false;
      let exp_pro = JSON.parse(element.exp_pro) as ExpPro;
      for (let i = 0; i < this.current_user_document.exp_pro.length; i++) {
       
        if (exp_pro != null && exp_pro != undefined) {
          if (exp_pro.id_exp_pro == this.current_user_document.exp_pro[i].id_exp_pro) {
            try {
              this.current_user_document.exp_pro[i].debut = new Date((element.exp_pro_deb as Moment).toDate().getFullYear() + "-" + ((element.exp_pro_deb as Moment).toDate().getMonth() + 1) + "-" + (element.exp_pro_deb as Moment).toDate().getDate());
              this.current_user_document.exp_pro[i].fin = new Date((element.exp_pro_fin as Moment).toDate().getFullYear() + "-" + ((element.exp_pro_fin as Moment).toDate().getMonth() + 1) + "-" + (element.exp_pro_fin as Moment).toDate().getDate());
            
            } catch (error) {
              
              try {
                this.current_user_document.exp_pro[i].debut = new Date(element.exp_pro_deb);
                this.current_user_document.exp_pro[i].fin = new Date(element.exp_pro_fin);
              } catch (error1) {
                console.log(error);
                console.log(error1);
              }
               
            }
            this.current_user_document.exp_pro[i].nom_soc = element.nom_soc;
            this.current_user_document.exp_pro[i].cv = this.current_user_document.cv;
            this.current_user_document.exp_pro[i].ville.nom_ville = element.where;
            this.current_user_document.exp_pro[i].poste = element.poste;
            this.current_user_document.exp_pro[i].description = element.description;
            
            enter=true;
            break;
          }
        } 

      }
      if(!enter) {
        exp_pro = new ExpPro();
        let ville = this.current_user_document.cv.personne.ville;
        ville.nom_ville = element.where;

        exp_pro.debut = new Date((element.exp_pro_deb as Moment).toDate().getFullYear() + "-" + ((element.exp_pro_deb as Moment).toDate().getMonth() + 1) + "-" + (element.exp_pro_deb as Moment).toDate().getDate());
        exp_pro.fin = new Date((element.exp_pro_fin as Moment).toDate().getFullYear() + "-" + ((element.exp_pro_fin as Moment).toDate().getMonth() + 1) + "-" + (element.exp_pro_fin as Moment).toDate().getDate());
        exp_pro.nom_soc = element.nom_soc;
        exp_pro.cv = this.current_user_document.cv;
        exp_pro.ville = ville;
        exp_pro.poste = element.poste;
        exp_pro.description = element.description;
        exp_pro.etat_exp_pro = true;
        this.current_user_document.exp_pro.push(exp_pro);
      }
    });



    rawValue.listFormationGroup.forEach(element => {
      let formation = JSON.parse(element.formation) as Formation;
      let enter:boolean=false;
      for (let i = 0; i < this.current_user_document.formation.length; i++) {
        if (formation != null && formation != undefined) {
          if (formation.id_formation == this.current_user_document.formation[i].id_formation) {
            try {
              this.current_user_document.formation[i].debut = new Date((element.formation_deb as Moment).toDate().getFullYear() + "-" + ((element.formation_deb as Moment).toDate().getMonth() + 1) + "-" + (element.formation_deb as Moment).toDate().getDate());
              this.current_user_document.formation[i].fin = new Date((element.formation_fin as Moment).toDate().getFullYear() + "-" + ((element.formation_fin as Moment).toDate().getMonth() + 1) + "-" + (element.formation_fin as Moment).toDate().getDate());
            
            } catch (error) {
              
              try {
                this.current_user_document.formation[i].debut = new Date(element.formation_deb);
                this.current_user_document.formation[i].fin = new Date(element.formation_fin);
              } catch (error1) {
                console.log(error);
                console.log(error1);
              }
               
            }
            this.current_user_document.formation[i].description = element.description;
            this.current_user_document.formation[i].titre_formation = element.titre_formation;
            this.current_user_document.formation[i].niveau_etude = element.niveau_etude;
            this.current_user_document.formation[i].cv = this.current_user_document.cv;
            this.current_user_document.formation[i].document = JSON.parse(element.document) as Document;
            enter=true;
            break;
          }
        } 

      }
      if(!enter) {
        formation = new Formation();

        formation.debut = new Date((element.formation_deb as Moment).toDate().getFullYear() + "-" + ((element.formation_deb as Moment).toDate().getMonth() + 1) + "-" + (element.formation_deb as Moment).toDate().getDate());
        formation.fin = new Date((element.formation_fin as Moment).toDate().getFullYear() + "-" + ((element.formation_fin as Moment).toDate().getMonth() + 1) + "-" + (element.formation_fin as Moment).toDate().getDate());
        formation.description = element.description;
        formation.cv = this.current_user_document.cv;
        formation.titre_formation = element.titre_formation;
        formation.niveau_etude = element.niveau_etude;
        formation.document = JSON.parse(element.document) as Document;
        formation.etat_formation = true;
        this.current_user_document.formation.push(formation);
      }
    });

    rawValue.listCertificatGroup.forEach(element => { 
      let certificat = JSON.parse(element.certificat) as Certificat;
      let enter=false;
      for (let i = 0; i < this.current_user_document.certificat.length; i++) {
        if (certificat != null && certificat != undefined) {
          if (certificat.id_certificat == this.current_user_document.certificat[i].id_certificat) {
            try {
              this.current_user_document.certificat[i].debut = new Date((element.certificat_deb as Moment).toDate().getFullYear() + "-" + ((element.certificat_deb as Moment).toDate().getMonth() + 1) + "-" + (element.certificat_deb as Moment).toDate().getDate());
              this.current_user_document.certificat[i].fin = new Date((element.certificat_fin as Moment).toDate().getFullYear() + "-" + ((element.certificat_fin as Moment).toDate().getMonth() + 1) + "-" + (element.certificat_fin as Moment).toDate().getDate());
            
            } catch (error) {
              
              try {
                this.current_user_document.certificat[i].debut = new Date(element.certificat_deb);
                this.current_user_document.certificat[i].fin = new Date(element.certificat_fin);
              } catch (error1) {
                console.log(error);
                console.log(error1);
              }
               
            }
             this.current_user_document.certificat[i].description = element.description;
            this.current_user_document.certificat[i].titre_certificat = element.titre_certificat;
            this.current_user_document.certificat[i].uid_certificat = element.uid_certificat;
            this.current_user_document.certificat[i].url_certificat = element.url_certificat;
            this.current_user_document.certificat[i].cv = this.current_user_document.cv;
            this.current_user_document.certificat[i].document = JSON.parse(element.document) as Document;
            enter=true;
            break;
          }
        }

      }
      if(!enter) {
        certificat = new Certificat();

        certificat.debut = new Date((element.certificat_deb as Moment).toDate().getFullYear() + "-" + ((element.certificat_deb as Moment).toDate().getMonth() + 1) + "-" + (element.certificat_deb as Moment).toDate().getDate());
        certificat.fin = new Date((element.certificat_fin as Moment).toDate().getFullYear() + "-" + ((element.certificat_fin as Moment).toDate().getMonth() + 1) + "-" + (element.certificat_fin as Moment).toDate().getDate());
        certificat.description = element.description;
        certificat.cv = this.current_user_document.cv;
        certificat.titre_certificat = element.titre_certificat;
        certificat.uid_certificat = element.uid_certificat;
        certificat.url_certificat = element.url_certificat;
        certificat.document = JSON.parse(element.document) as Document;
        certificat.etat_certificat = true;
        this.current_user_document.certificat.push(certificat);
      }
    });



    rawValue.listCompetenceGroup.forEach(element => {
      let competence = JSON.parse(element.competence) as Competence;
      let enter:boolean=false;
      for (let i = 0; i < this.current_user_document.competence.length; i++) {
        if (competence != null && competence != undefined) {
          if (competence.id_competence == this.current_user_document.competence[i].id_competence) {
            this.current_user_document.competence[i].annee = element.annee;
            this.current_user_document.competence[i].echelle = element.echelle;
            this.current_user_document.competence[i].libelle = element.libelle;
            this.current_user_document.competence[i].jour = element.jour;
            this.current_user_document.competence[i].mois = element.mois;
            this.current_user_document.competence[i].semaine = element.semaine;
            this.current_user_document.competence[i].cv = this.current_user_document.cv;
            enter=true;
            break;
          }
        } 

      }
      if(!enter) {
        competence = new Competence();

        competence.annee = element.annee;
        competence.cv = this.current_user_document.cv;
        competence.echelle = element.echelle;
        competence.libelle = element.libelle;
        competence.jour = element.jour;
        competence.mois = element.mois;
        competence.semaine = element.semaine;
        competence.etat_competence = true;
        this.current_user_document.competence.push(competence);
      }
    });
    rawValue.listLangueGroup.forEach(element => {
      let enter=false;
      let langue = JSON.parse(element.langue) as Langue;

      for (let i = 0; i < this.current_user_document.langue.length; i++) {
        if (langue != null && langue != undefined) {
          if (langue.id_langue == this.current_user_document.langue[i].id_langue) {
            this.current_user_document.langue[i].echelle = element.echelle;
            this.current_user_document.langue[i].libelle = element.libelle;
            this.current_user_document.langue[i].cv = this.current_user_document.cv;
            enter=true
            break;
          }
        }

      }
      if(!enter) {
        langue = new Langue();

        langue.cv = this.current_user_document.cv;
        langue.echelle = element.echelle;
        langue.libelle = element.libelle;
        langue.etat_langue = true;
        this.current_user_document.langue.push(langue);
      }
    });

 
 
    this.resumeService.resumeSave(this.current_user_document).subscribe((data: BaseQuery<Resume>) => {
      
 
      this.authService.current_user_document = data.data;
      this.authService.current_user.personne = this.authService.current_user_document.cv.personne;
      this.authService.current_user_info.personne = this.authService.current_user_document.cv.personne;
      this.current_user_document=this.authService.current_user_document;
      this.updateControls(this.current_user_document);
      localStorage.setItem("current_user_document", JSON.stringify(this.authService.current_user_document));
    });

  }
  loadControls(current_user_document: Resume) {
    try {
      this.a_propos.setValue(current_user_document.cv.description);
      this.pret_salary_min.setValue(current_user_document.cv.pret_salary_min);
      this.pret_salary_max.setValue(current_user_document.cv.pret_salary_max);

    } catch (error) {
      console.log(error);
    }
    try {
      this.facebook.setValue(current_user_document.cv.contact.facebook);
      this.linkedin.setValue(current_user_document.cv.contact.linkedin);
      this.mail.setValue(current_user_document.cv.contact.mail);
      this.numero.setValue(current_user_document.cv.contact.numero);
      this.twitter.setValue(current_user_document.cv.contact.twitter);
      this.website.setValue(current_user_document.cv.contact.website);
    } catch (error) {
      console.log(error);
    }
    try {
      this.nom.setValue(current_user_document.cv.personne.nom_personne);
      this.prenom.setValue(current_user_document.cv.personne.prenom_personne);
      this.where.setValue(current_user_document.cv.personne.ville.nom_ville);
    } catch (error) {
      console.log(error);
    }


    try {
      current_user_document.exp_pro.forEach((data: ExpPro) => {
        (this.form_step_one.controls.listExpProfessionnelleGroup as FormArray).push(this.fb.group({
          exp_pro: new FormControl(JSON.stringify(data)),
          exp_pro_deb: new FormControl(new Date(data.debut)),
          exp_pro_fin: new FormControl(new Date(data.fin)),
          nom_soc: new FormControl(data.nom_soc),
          where: new FormControl(data.ville.nom_ville),
          poste: new FormControl(data.poste),
          description: new FormControl(data.description),
        }));
      });
    } catch (error) {
      console.log(error);
    }


    try {
      current_user_document.formation.forEach((data: Formation) => {
        (this.form_step_one.controls.listFormationGroup as FormArray).push(this.fb.group({
          formation: new FormControl(JSON.stringify(data)),
          formation_deb: new FormControl(new Date(data.debut)),
          formation_fin: new FormControl(new Date(data.fin)),
          titre_formation: new FormControl(data.titre_formation),
          description: new FormControl(data.description),
          niveau_etude: new FormControl(data.niveau_etude),
          document: new FormControl(JSON.stringify(data.document)),
          fichier: new FormControl(null),
          fichier_label: new FormControl(null),

        }));

      });

    } catch (error) {
      console.log(error);
    }


    try {
      current_user_document.certificat.forEach((data: Certificat) => {
        (this.form_step_one.controls.listCertificatGroup as FormArray).push(this.fb.group({
          certificat: new FormControl(JSON.stringify(data)),
          certificat_deb: new FormControl(new Date(data.debut)),
          certificat_fin: new FormControl(new Date(data.fin)),
          titre_certificat: new FormControl(data.titre_certificat),
          description: new FormControl(data.description),
          uid_certificat: new FormControl(data.uid_certificat),
          url_certificat: new FormControl(data.url_certificat),
          document: new FormControl(JSON.stringify(data.document)),
          fichier: new FormControl(null),
          fichier_label: new FormControl(null),

        }));
      });

    } catch (error) {
      console.log(error);
    }
    try {
      current_user_document.competence.forEach((data: Competence) => {
        (this.form_step_one.controls.listCompetenceGroup as FormArray).push(this.fb.group({
          competence: new FormControl(JSON.stringify(data)),
          libelle: new FormControl(data.libelle),// titre_diplome: new FormControl(),
          echelle: new FormControl(data.echelle),
          annee: new FormControl(data.annee),
          mois: new FormControl(data.mois),
          semaine: new FormControl(data.semaine),
          jour: new FormControl(data.jour),

        }));
      });

    } catch (error) {
      console.log(error);
    }
    try {
      current_user_document.langue.forEach((data: Langue) => {
        (this.form_step_one.controls.listLangueGroup as FormArray).push(this.fb.group({
          langue: new FormControl(JSON.stringify(data)),
          libelle: new FormControl(data.libelle),// titre_diplome: new FormControl(),
          echelle: new FormControl(data.echelle),

        }));
      });

    } catch (error) {
      console.log(error);
    }

  }
  updateControls(current_user_document: Resume) {
   
    

    let i=0;
    try {
    
      current_user_document.exp_pro.forEach((data: ExpPro) => {
        (this.form_step_one.controls.listExpProfessionnelleGroup as FormArray).at(i).get('exp_pro').setValue(JSON.stringify(data));
        i++;
      });
    } catch (error) {
      console.log(error);
    }


    try {
      i=0;
      current_user_document.formation.forEach((data: Formation) => {
        (this.form_step_one.controls.listFormationGroup as FormArray).at(i).get('formation').setValue(JSON.stringify(data));
        i++;
      });
    } catch (error) {
      console.log(error);
    }


    try {
      i=0;
      current_user_document.certificat.forEach((data: Certificat) => {
        (this.form_step_one.controls.listCertificatGroup as FormArray).at(i).get('certificat').setValue(JSON.stringify(data));
        i++;
      });

    } catch (error) {
      console.log(error);
    }
    try {
      i=0;
      current_user_document.competence.forEach((data: Competence) => {
        (this.form_step_one.controls.listCompetenceGroup as FormArray).at(i).get('competence').setValue(JSON.stringify(data));
        i++;
      });

    } catch (error) {
      console.log(error);
    }
    try {
      i=0;
      current_user_document.langue.forEach((data: Langue) => {
        (this.form_step_one.controls.listLangueGroup as FormArray).at(i).get('langue').setValue(JSON.stringify(data));
        i++;
      });

    } catch (error) {
      console.log(error);
    }

  }
}
