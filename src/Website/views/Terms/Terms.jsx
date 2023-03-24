import React from "react";
import Main from "../../../App/components/Main";
import "./style/terms.css";

export default function Terms() {
  return (
    <Main className="grid gap-2rem terms">
      <div>
        <h1>Conditions d'utilisation</h1>
        <p>
          Les présentes Conditions d'utilisation (les "Conditions") régissent
          l'utilisation du service de raccourcissement de liens (le "Service")
          proposé par <span className="c-blue">Qlee.me</span>. Il est important
          de noter que Qlee.me est une propriété de la société{" "}
          <a className="link" href="https://www.kiwee.site">
            Kiwee.site
          </a>
          . En utilisant le Service, vous acceptez d'être lié par les présentes
          Conditions. Si vous n'acceptez pas les présentes Conditions, vous ne
          devez pas utiliser le Service.
        </p>

        <h2>1. Utilisation du Service</h2>
        <p>
          Le Service permet de raccourcir des liens de manière à les rendre plus
          facilement partageables sur les réseaux sociaux et autres plateformes
          en ligne. Vous êtes seul responsable de l'utilisation que vous faites
          des liens raccourcis créés à l'aide du Service.
        </p>

        <h2>2. Propriété intellectuelle</h2>
        <p>
          Le Service et tous les droits de propriété intellectuelle qui s'y
          rapportent, y compris toutes les marques, droits d'auteur et brevets,
          sont la propriété exclusive de <span className="c-blue">Qlee.me</span>{" "}
          et/ou de ses concédants de licence. Vous n'êtes pas autorisé à
          utiliser le Service à des fins commerciales sans l'autorisation écrite
          préalable de <span className="c-blue">Qlee.me</span>.
        </p>

        <h2>3. Exclusion de garanties</h2>
        <p>
          Le Service est fourni "en l'état" et{" "}
          <span className="c-blue">Qlee.me</span> ne donne aucune garantie,
          expresse ou implicite, quant à son utilisation ou sa disponibilité.{" "}
          <span className="c-blue">Qlee.me</span> ne garantit pas que le Service
          sera exempt d'erreurs ou de interruptions.
        </p>

        <h2>4. Limitation de responsabilité</h2>
        <p>
          En aucun cas <span className="c-blue">Qlee.me</span> ne sera
          responsable des dommages indirects, spéciaux, consécutifs ou punitifs
          découlant de l'utilisation ou de l'incapacité à utiliser le Service.
        </p>

        <h2>5. Modifications des Conditions</h2>
        <p>
          <span className="c-blue">Qlee.me</span> se réserve le droit de
          modifier les présentes Conditions à tout moment et sans préavis. Votre
          utilisation continue du Service après la publication de toute
          modification des Conditions vaut acceptation de ces modifications.
        </p>

        <h2>6. Résiliation</h2>
        <p>
          <span className="c-blue">Qlee.me</span> se réserve le droit de
          résilier votre accès au Service à tout moment et sans préavis.
        </p>

        <h2>7. Divers</h2>
        <p>
          Les présentes Conditions constituent l'intégralité de l'accord entre
          vous et <span className="c-blue">Qlee.me</span> en ce qui concerne
          l'utilisation du Service. Si une disposition des présentes Conditions
          est jugée illégale ou inapplicable, elle sera réputée non écrite sans
          affecter la validité et l'applicabilité des dispositions restantes.
        </p>
      </div>

      <div>
        <h1>Conditions de vente</h1>
        <p>
          Les présentes Conditions de vente régissent l'achat de notre service
          de paiement mensuel ou annuel (le "Service") proposé par{" "}
          <span className="c-blue">Qlee.me</span>. En achetant le Service, vous
          acceptez d'être lié par les présentes Conditions de vente. Si vous
          n'acceptez pas les présentes Conditions de vente, vous ne devez pas
          acheter le Service.
        </p>

        <h2>1. Paiement</h2>
        <p>
          Le Service est disponible soit en paiement mensuel, soit en paiement
          annuel. Le paiement sera effectué par carte bancaire ou par tout autre
          moyen de paiement accepté par <span className="c-blue">Qlee.me</span>.
          Le paiement mensuel ou annuel sera automatiquement renouvelé à la date
          d'échéance, sauf si vous annulez le Service avant cette date.
        </p>

        <h2>2. Annulation et remboursement</h2>
        <p>
          Vous pouvez annuler le Service à tout moment en nous contactant par
          email <span className="c-blue">contact@kiwee.site</span> ou en
          utilisant la fonctionnalité d'annulation disponible sur votre compte.
          Si vous annulez le Service avant la fin de la période de paiement en
          cours, vous ne serez pas remboursé pour cette période. Si vous annulez
          le Service après la fin de la période de paiement en cours, vous serez
          remboursé pour la période restante.
        </p>

        <h2>3. Modifications du Service et des Conditions de vente</h2>
        <p>
          <span className="c-blue">Qlee.me</span> se réserve le droit de
          modifier le Service ou les présentes Conditions de vente à tout moment
          et sans préavis. Si nous apportons des modifications importantes aux
          Conditions de vente ou au Service, nous vous en informerons par email.
          Votre utilisation continue du Service après la publication de toute
          modification des Conditions de vente vaut acceptation de ces
          modifications.
        </p>

        <h2>4. Limitation de responsabilité</h2>
        <p>
          En aucun cas <span className="c-blue">Qlee.me</span> ne sera
          responsable des dommages indirects, spéciaux, consécutifs ou punitifs
          découlant de l'utilisation ou de l'incapacité à utiliser le Service.
        </p>

        <h2>5. Divers</h2>
        <p>
          Les présentes Conditions de vente constituent l'intégralité de
          l'accord entre vous et <span className="c-blue">Qlee.me</span> en ce
          qui concerne l'achat du Service. Si une disposition des présentes
          Conditions de vente est jugée illégale ou inapplicable, elle sera
          réputée non écrite sans affecter la validité et l'applicabilité
        </p>
      </div>
    </Main>
  );
}
