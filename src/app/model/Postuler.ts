import { Cv } from './Cv';
import { Offre } from './Offre';
import { Entreprise } from './Entreprise';
import { Personne } from './Personne';

export class Postuler{
    public id?:number;
    public id_postuler:number;
    public retenue:boolean;                     
    public cv:Cv;                  
    public offre:Offre;                    
    public message:string;                    
    public entreprise:Entreprise;                    
    public personne:Personne;
    public created_at: Date;
    public updated_at: Date;
     

}