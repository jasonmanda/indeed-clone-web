import { Cv } from './Cv';

export class Competence {


    public id_competence: number;
    public annee: number;
    public echelle: number;
    public libelle: string;
    public jour: number;
    public mois: number;
    public semaine: number;
    public cv: Cv;
    public etat_competence: boolean;
    public created_at: Date;
    public updated_at: Date;
 
}