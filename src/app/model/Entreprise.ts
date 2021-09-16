import { Personne } from './Personne';
import { Ville } from './Ville';
import { Contact } from './Contact';

export class Entreprise {
    public id_entreprise: number;
    public nom: string;
    public taille: string;
    public capital: number;
    public description: string;
    public cab_recrutement: boolean;
    public etat_entreprise: boolean;
    public domaine:string;
    public created_at: Date;
    public updated_at: Date;
    public ville:Ville;
    public personne:Personne;  
    public contact:Contact;  
     
}