export class Role{
    public id_role:number;
    public role_name:string;
    public etat_role:boolean;
    public created_at:Date;
    public updated_at:Date;
  
}

export interface RoleTable{
        id:number;
        id_role:number;
        role_name:string;
        etat_role:boolean;
} 
export class RoleStepOneConfig{
    role_name:string;
    directeur_grants:string;
    prefet_grants:string;
    adj_prefet_grants:string;
    admin_grants:string;
    caissier_grants:string;

    
}
 