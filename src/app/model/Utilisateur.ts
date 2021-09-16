import { Personne } from './Personne';
 
export class Utilisateur {
    public id_utilisateur: number;
    public email: string;
    public password: string;
    public api_token: string;
    public etat_utilisateur: boolean;
    public remember_token: string;
    public personne:Personne;
    public created_at: Date;
    public updated_at: Date;
 
}


export class UtilisateurConfiguration {
    public has_id?: string;
    public id_ecole: number;
    // public image: Image;
    // public emplacement: EcoleEmplacement;
    // public ville_naiss: Ville;
    // public pays_naiss: Pays;
    // public ville: Ville;
    // public pays: Pays;
    // public arrondissement: Arrondissement;
    // public adresse: Adresse;
    // public contact: Contact;
    public personne: Personne;
    public job:string;
    public ecole_directeur_grants: string;
    public ecole_admin_grants: string;
    public ecole_prefet_grants:boolean;
    public ecole_adj_prefet_grants:boolean;
    public ecole_grants: string[];
    public niveau_grants: string[];
    public classe_grants: string[];
    public matiere_grants: string[];
    public caisse_grants: string;
    public religion: string;
    // public role: Role[];
    public user:Utilisateur;
    public emplacement_utilisateur:UtilisateurEmplacement
}
export class UtilisateurEmplacement{
    public id_utilisateur_emplacement:number;
    public id_ecole:number;
    public id_caisse:number;
    public id_utilisateur:number;
    public date_debut:Date;
    public date_fin:Date;
    
     
  
}
export interface UtilisateurTable{
    id:number;
    login:string;
    id_utilisateur:number;
    nom:string;
    prenom:string;
    role:string;
    etat_utilisateur:boolean;
}

 
export interface UtilisateurBaseTable{
    "Identifiant":number;
    "Matricule":string;
     "Nom":string;
     "Prénom":string;
     "Role":string;
 
}

export class UtilisateurStepOneConfig{
    nom_utilisateur:string;
    prenom_utilisateur:string;
    dnaiss_utilisateur:string;
    sexe_utilisateur:string;
    civilite_utilisateur:string;
    religion_utilisateur:string;
    smat_utilisateur:string;
    job_utilisateur:string;
    code_iso2_pays_naissance:string;
    ville_nom_ville_naissance:string;
    role:string;
    
}