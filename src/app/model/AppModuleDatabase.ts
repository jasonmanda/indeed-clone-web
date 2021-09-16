import { AppModuleNode } from "./AppModuleNode";

export abstract class AppModuleDatabase {

  public static TREE_DATA: AppModuleNode[] = [
    {
      module_name: "Accueil",
      link_module: "/",
      mod_sub_mod: "home",
    
    },
    {
      module_name: "Caisse",
      link_module: "/",
      mod_sub_mod: "caisse",
      children: [
        {
          module_name: "Règlement",
          link_module: "caisse/reglement",
          mod_sub_mod: "caisse_reglement"
        },
        {
          module_name: "Historique",
          link_module: "caisse/historique",
          mod_sub_mod: "caisse_historique"
        }


      ]
    },
    {
      module_name: "Comptabilité",
      link_module: "/",
      mod_sub_mod: "comptabilite",
      children: [
        {
          module_name: "Proformat",
          link_module: "comptabilite/proformat",
          mod_sub_mod: "comptabilite_proformat"

        }
      ]
    },
    {
      module_name: "Eleve",
      link_module: "eleve",
      mod_sub_mod: "eleve"

    },
     {
      module_name: "Gestion niveau",
      link_module: "/",
      mod_sub_mod: "niveau",
      children: [
        {
          module_name: "Classe",
          link_module: "niveaux/classe",
          mod_sub_mod: "niveau_classe"


        },
        {
          module_name: "Matière par niveau",
          link_module: "niveaux/matiere",
          mod_sub_mod: "niveau_mat_niveau"

        },
        {
          module_name: "Niveau",
          link_module: "/",
          mod_sub_mod: "niveau_niveau",
          children: [
            {

              module_name: "Frais insc.",
              link_module: "niveaux/niveau/frais_inscription",
              mod_sub_mod: "niveau_niveau_frais_inscription",
              toolTip: "Frais Inscription"

            },
            {

              module_name: "Matière",
              link_module: "niveaux/niveau/matiere",
              mod_sub_mod: "niveau_niveau_matiere"

            }

          ]

        }
      ]

    },
    {
      module_name: "Gestion notes",
      link_module: "/",
      mod_sub_mod: "note",
      children: [
        {
          module_name: "Evaluation",
          link_module: "note/evaluation",
          mod_sub_mod: "note_evaluation"

        },
        {
          module_name: "Générer note",
          link_module: "note/generer",
          mod_sub_mod: "note_generer"

        }
      ]
    },
    {
      module_name: "Gestion personnelle",
      link_module: "/",
      mod_sub_mod: "personnelle",
      children: [
        {
          module_name: "Role",
          link_module: "personnelle/role",
          mod_sub_mod: "personnelle_role"

        },
        {
          module_name: "Utilisateur",
          link_module: "personnelle/utilisateur",
          mod_sub_mod: "personnelle_utilisateur"

        }


      ]

    },
    {
      module_name: "Mes enfants",
      link_module: "mes_enfants",
      mod_sub_mod: "is_parent_grants",
 
    },
    {
      module_name: "Mon cursus",
      link_module: "cursus",
      mod_sub_mod: "is_eleve_grants",
 
    },
    {
      module_name: "Parent",
      link_module: "parent",
      mod_sub_mod: "parent"

    },
    {
      module_name: "Professeur",
      link_module: "professeur",
      mod_sub_mod: "professeur"

    },
    {
      module_name: "Réglage",
      link_module: "/",
      mod_sub_mod: "reglage",
      children: [
        {
          module_name: "Caisse",
          link_module: "reglage/caisse",
          mod_sub_mod: "reglage_caisse"
        },
        {
          module_name: "Ecole",
          link_module: "reglage/ecole",
          mod_sub_mod: "reglage_ecole"

        },

      ]
    },
    {
      module_name: "Scolarité",
      link_module: "/",
      mod_sub_mod: "scolarite",
      children: [
        {
          module_name: "Adhésion",
          link_module: "scolarite/adhesion",
          mod_sub_mod: "scolarite_adhesion"

        },
        {
          module_name: "Adh. historique",
          link_module: "scolarite/adhesion/historic",
          mod_sub_mod: "scolarite_adh_historique",
          toolTip: "Adhésion Historique"

        },
        {
          module_name: "Année Scol.",
          link_module: "scolarite/annee_scolaire",
          mod_sub_mod: "scolarite_annee_scolaire",
          toolTip: "Année Scolaire"
        }
      ]
    }

  ];

}