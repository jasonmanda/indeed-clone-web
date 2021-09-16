import { Injectable } from "@angular/core";
import { WebConfigService } from './web-config.service';

@Injectable({
    providedIn: 'root'
  })
export class DocumentService{
        private  base_url=null;
        constructor(private webConfigService:WebConfigService) {
            this.base_url=this.webConfigService.data['remote_host'];
          }
    public  checkDocumentExtension(file_path_name:string,extesion_valid:string[]=[".xls",".xlsx",".csv"]):boolean{
     
 
            let nom_fichier=file_path_name;
            let  real_ext_fichier =nom_fichier.substr(nom_fichier.lastIndexOf('\\')+1);
            real_ext_fichier=real_ext_fichier.substr(real_ext_fichier.lastIndexOf('.'));
        return  extesion_valid.lastIndexOf(real_ext_fichier.toLocaleLowerCase())==-1?true:false;
    
        
       
        
        }
        public  getDocumentPath(path:string):string{
                // public/ecole/01_29_2019_16_19_47/FILE020.JPG
               return this.base_url+"api/"+path.substr(path.indexOf('/')+1 );
            }
        public  getValidExtension(extesion_valid:string[]=[".xls",".xlsx",".csv"]):string{
                return extesion_valid.join(", ");
        }


}