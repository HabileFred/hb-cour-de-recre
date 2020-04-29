/**
 *
 * BiduleOTron
 *
 */
import React from 'react';
import styled from 'styled-components';

import { Popup } from '../Popups/Popups';
import PopupMail from './mail.svg';
import PasswordClue from './mot_de_passe_indice.svg';
import Bidule from 'BOT/components/Bidules/Bidules';

const ContentWrapper = styled.div`
position: absolute;
top: 0;
left: 0;
padding: 50px 150px 40px 110px;

text-align: center;
font-family: 'Gaegu', cursive;
text-transform: uppercase;
font-size: 14pt;
color: #4B4B4B;

strong {
  color: black;
}

p {
  line-height: 1.25em;
}

.signature {
  text-align: right;
}

.lines {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin-left: 10px;
}
`;

const HBox = styled.div`
display: flex;
flex-flow: row nowrap;
align-items: center;
justify-content: space-evenly;
`;

const BiduleCodeName = styled.div`
display: grid;
grid-template-columns: repeat(5, 1em);
`;

const Line = styled.span`
margin: 5px 0;
padding: 2px 7px;
border: 2px solid rgb(201,112,234);
border-radius: 6px;
letter-spacing: 0px;
line-height: 1.35em;
`;

const L = styled.span`
font-weight: bold;
color: rgb(201,112,234);
`;

function Mail({ mailId, playTime }) {

  switch (mailId) {
    case 'mail-connection':
      return (
        <Popup>
          <PopupMail />
          <ContentWrapper>
            <p><br/>Petit Bill,</p>
            <p>
              J'ai une mission pour toi. Je sais que tu n'es pas encore completement forme sur le <nobr>Bill-o-tron</nobr>,
              mais avec ta perspicacite, tu devrais t'en sortir.
            </p>
            <p>
              <strong>Commence par te connecter.</strong>
            </p>
            <p>Ton mot de passe est le suivant :<br/>
              <PasswordClue />
            </p>
            <p className="signature">
              Le Grand Bill
            </p>
          </ContentWrapper>
        </Popup>
      );

    case 'mail-bidule':
      return (
        <Popup>
          <PopupMail />
          <ContentWrapper>
            <p>
              Bien,<br/>
              maintenant que tu es dans le systeme, <nobr>envoie-moi un&nbsp;
              <strong style={{ borderBottom: '2px solid black'}}>bidule "aspitruc"</strong></nobr> de toute urgence !<br/>
              S'il n'y en a plus dans la Bidulotheque, il faudra en <strong>fabriquer</strong> un.
            </p>
            <p>
              Sache que les machines codent les noms de bidules en suivant la regle suivante :</p>
            <HBox>
              <span style={{ borderBottom: '1px solid black'}}>bidule "emetteur"</span>
              <div>devient</div>
              <BiduleCodeName>
                <span>3</span>
                <span>1</span>
                <span>1</span>
                <span>2</span>
                <span>1</span>
                <span>E</span>
                <span>M</span>
                <span>R</span>
                <span>T</span>
                <span>U</span>
              </BiduleCodeName>
            </HBox>
            <p>
              Prouve-moi que j'ai bien fait de te faire confiance, et fais vite.<br/>
              Je te communique ma position plus tard.
            </p>
            <p className="signature">
              Le Grand Bill
            </p>
          </ContentWrapper>
        </Popup>
      );

    case 'mail-destination':
      return (
        <Popup>
          <PopupMail />
          <ContentWrapper>
            <p className="lines">
              <Line>Il s<L>e</L>mble<L>r</L>ait que <L>t</L>u a<L>i</L>es bien construit<br/>le b<L>o</L>n bi<L>d</L>ule.</Line>
              <Line>C'est <L>b</L>ien, envoie-le moi s<L>a</L>n<L>s</L> attendre !</Line>
              <Line>Tu remarquer<L>a</L>s que chez <L>B</L>ill,<br/>on <L>s</L>ecurise tout.</Line>
              <Line><L>D</L>onc ne <L>t</L>'attends pas a c<L>e</L> que je te d<L>o</L>nne<br/>mon ad<L>r</L>esse si fac<L>i</L>lement.</Line>
              <Line>To<L>u</L>tes les infos sont dans ce mess<L>ag</L>e,<br/><L>c</L>herc<L>h</L>e un p<L>e</L>u,</Line>
              <Line>fa<L>i</L>s <L>do</L>nc p<L>r</L>euve de p<L>e</L>rspicaci<L>t</L>e.</Line>
            </p>
            <p className="signature">
              Le Grand Bill
            </p>
          </ContentWrapper>
        </Popup>
      );

    case 'mail-end':
      return (
        <Popup>
          <PopupMail />
          <ContentWrapper>
            <p>
              <strong>Merci,</strong><br/><br/>
              J'ai bien recu l'aspitruc :
              <br />
              <Bidule b={7} />
            </p>
            <p>
              Tu as accompli ta mission avec succes <nobr>en <strong>{Math.round(playTime / 60)} minutes</strong>.</nobr>
            </p>
            <p>Tu passes de <em>"Petit Bill"</em> a <em>"Moyen Bill"</em>.</p>
            <p className="signature">
              Le Grand Bill
            </p>
          </ContentWrapper>
        </Popup>
      );

    default:
      return null;
  }

}

export default Mail;
