import { Ville } from './Ville';
import { Personne } from './Personne';
import { Entreprise } from './Entreprise';
export class Offre
{
    public id?:number;
    public id_offre:number;
    public cab_recrutement:boolean;
    public nom_ent:String;
    public poste:String;
    public localite:Ville; 
    public personne:Personne; 
    public entreprise:Entreprise; 
    public taille:String;
    public type_emp:String;
    public type_contrat:String;
    public salaire:number;
    public salaire_type:String;
    public salaire_min:number;
    public salaire_max:number;
    public salaire_model:boolean;
    public no_salaire:boolean;
    public avantages:string;
    public cv_require:boolean;
    public test_compet:boolean;
    public description:String;
    public date_limit:Date;
    public date_debut:Date;
    public date_immediat:boolean;
    public created_at:Date;
    public updated_at:Date;
    public etat_offre:boolean;
    public is_posted:boolean;
    public is_favorite:boolean;
    public icon_favorite:string;
    // public routerLink?:string;
    

}