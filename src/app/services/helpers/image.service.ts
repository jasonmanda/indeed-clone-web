import { Injectable,Component} from "@angular/core";
import { WebConfigService } from './web-config.service';

@Injectable({
    providedIn: 'root'
  })
export  class ImageService{
    ///200 fichiers au maximum
    ///200 MB au maximum

    private  base_url=null;
    constructor(private webConfigService:WebConfigService) {
        this.base_url=this.webConfigService.data['remote_host'];
      }
    public  checkImageExtension(file_path_name:string,extension_valid:string[]=[".gif",".png",".jpeg",".jpg",".svg"]):boolean{
        let nom_fichier=file_path_name;
        let  real_ext_fichier =nom_fichier.substr(nom_fichier.lastIndexOf('\\')+1);
        real_ext_fichier=real_ext_fichier.substr(real_ext_fichier.lastIndexOf('.'));
    return  extension_valid.lastIndexOf(real_ext_fichier.toLocaleLowerCase())==-1?true:false;
    }
 
    public  checkFileNumber(file_path_name):boolean{
        if(file_path_name.length>=1 && file_path_name.length<=200){
            return true;
        }else{
            return false;
        }
    }
    public  getFileSizeMb(file):Number{
       return  (file.size/1024/1024);
    }

    public  getDocumentPath(path:string):string{
        // public/ecole/01_29_2019_16_19_47/FILE020.JPG
       return this.base_url+"api/"+path.substr(path.indexOf('/')+1 );
    }
    public  getValidExtension(extension_valid:string[]=[".gif",".png",".jpeg",".jpg",".svg"]):string{
        return extension_valid.join(", ");
    }

}