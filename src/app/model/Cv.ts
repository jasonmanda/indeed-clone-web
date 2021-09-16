import { Personne } from './Personne';
import { Document } from './Document';
import { Contact } from './Contact';

export class Cv{


    public cv_uid:string;
    public description:string; 
    public pret_salary_min:number;
    public pret_salary_max:number;
    public personne:Personne;
    public document:Document;
    public contact:Contact;
    public created_at: Date;
    public updated_at: Date;
     

}