import { Cv } from './Cv';
import { Offre } from './Offre';

export class Favoris{
    public id?:number;
    public id_favoris:number;
    public etat_favoris:boolean;                     
    public cv:Cv;                  
    public offre:Offre;                    
    public created_at: Date;
    public updated_at: Date;
     

}