import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'offre' })
export class OffrePipe implements PipeTransform {

  constructor() {

  }
  transform(value: string, option: string): string {
    if (value == "Interim" && option == "type_contrat") {
      return "Intérim";
    } else if (value == "Freelance_independant" && option == "type_contrat") {
      return "Freelance/Indépendant";

    } else if (value == "Contrat_pro" && option == "type_contrat") {
      return "Contact pro";
    } else if (option == "type_contrat") {
      return value;
    }
    else if (value == "par annee" && option == "salaire_type") {
      return "Par année";
    } else if (option == "salaire_type") {
      return value;
    } else if (value == "remote_working" && option == "avantages") {
      return "Travail à distance possible";
    } else if (value == "horaire_flex" && option == "avantages") {
      return "Horaires flexibles";
    } else if (value == "part_transp" && option == "avantages") {
      return "Participation au transport";
    } else if (value == "titre_restau_panier" && option == "avantages") {
      return "Titre-restaurant / Panier";
    } else if (value == "13mois" && option == "avantages") {
      return "13ième mois";
    } else if (value == "13mois+" && option == "avantages") {
      return "13ième mois+";
    } else if (value == "vdf" && option == "avantages") {
      return "Véhicule de fonction";
    } else if (value == "rtt" && option == "avantages") {
      return "RTT(Réduction du temps de travail)";
    } else if (value == "epargne_sal" && option == "avantages") {
      return "Epargne salariale";
    } else if (value == "autre" && option == "avantages") {
      return "Autre";
    }
  }


}

