import { Cv } from './Cv';
import { Document } from './Document';
 
export class Formation {


    public id_formation: number;
    public debut: Date;
    public fin: Date;
    public description: string;
    public titre_formation: string;
    public niveau_etude: string;
    public cv: Cv;
    public document: Document;
    public etat_formation: boolean;
    public created_at: Date;
    public updated_at: Date;
 
}