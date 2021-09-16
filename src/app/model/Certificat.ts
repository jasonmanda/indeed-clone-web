import { Cv } from './Cv';
import { Document } from './Document';

export class Certificat {


    public id_certificat: number;
    public debut: Date;
    public fin: Date;
    public description: string;
    public titre_certificat: string;
    public uid_certificat: string;
    public url_certificat: string;
    public cv: Cv;
    public document: Document;
    public etat_certificat: boolean;
    public created_at: Date;
    public updated_at: Date;
 

}