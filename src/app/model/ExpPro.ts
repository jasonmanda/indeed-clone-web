import { Cv } from './Cv';
import { Ville } from './Ville';

export class ExpPro {


    public id_exp_pro: number;
    public debut: Date;
    public fin: Date;
    public description: string;
    public nom_soc: string;
    public poste: string;
    public cv: Cv;
    public ville: Ville;
    public etat_exp_pro: boolean;
    public created_at: Date;
    public updated_at: Date;
 
}