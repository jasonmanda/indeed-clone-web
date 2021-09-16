import { Contact } from './Contact';
import { Certificat } from './Certificat';
import { Langue } from './Langue';
import { Competence } from './Competence';
import { Formation } from './Formation';
import { Personne } from './Personne';
import { Cv } from './Cv';
import { ExpPro } from './ExpPro';
 
 
export class Resume{
    public cv:Cv;//in-progress
    public exp_pro:ExpPro[]; //ok
    public formation:Formation[];//ok
    public competence:Competence[];//ok
    public langue:Langue[];
    public certificat:Certificat[];//ok
}