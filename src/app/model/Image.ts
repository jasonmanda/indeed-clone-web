import { Entreprise } from './Entreprise';
import { Personne } from './Personne';

export class Image {


     public id_image: number;
     public original_name: string;
     public path_image: string;
     public is_temp: boolean;
     public is_logo: boolean;
     public entreprise: Entreprise;
     public personne: Personne;
     public etat_image: boolean;
     public created_at: Date;
     public updated_at: Date;
 
}