import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import { makeSelectStatus } from 'BOT/selectors';
import { introOK } from 'BOT/actions';

const Wrapper = styled.div`
position: fixed;
top: 0px;
bottom: 0px;
left: 0px;
right: 0px;
background: #333;
font-family: 'Gaegu', cursive;
text-transform: uppercase;
font-size: 14pt;
padding: 50px;
overflow: auto;
color: #bbb;
display: flex;
flex-flow: column nowrap;

> div {
  margin: auto;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

strong {
  color: white;
}

button {
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  background: #bbb;
  text-transform: uppercase;
}

button:hover {
  background: white;
}

p {
  text-align: center;
  margin: auto;
  padding: 10px;
  width: 80%;

  a:link, a:hover, a:visited, a:link:visited {
    color: white;
    text-decoration: underline;
  }
}
p.cookies {
  width: 50%;
  font-size: 11pt;
  line-height: 1.1em;
}
`;

function Intro({ dispatch }) {

  return (
    <Wrapper>
      <div>
      <p>
        <strong>Bienvenue, Petit Bill !</strong>
      </p>
      <p>
        Tu as ete recrute pour participer a la vie quotidienne d'<nobr>Habile Bill :</nobr>
        &nbsp;un laboratoire experimental qui cache son lot de mysteres et d'agents en mission,
        oeuvrant jour apres jour pour la brigade du Kiff.
      </p>
      <p>
        Comme tu es un petit nouveau, je vais reprendre quelques bases <nobr>avec toi.</nobr><br/>
        Bien evidement, tu ne seras pas envoye sur le terrain :
        seules les <nobr>classes A-Bill</nobr> ont l'accreditation, et tu ne fais partie que de la <nobr>classe D-Bill.</nobr>
      </p>
      <p>
        <strong>Ton boulot est donc assez simple : reste a ton poste, aux commandes du <nobr>Bill-o-Tron</nobr></strong>
        &nbsp;(l'ordinateur central des Bills, qui permet de gerer l'ensemble des machines necessaires a nos experiences),
        et <strong>reponds aux demandes du Grand Bill qu'il t'enverra <nobr>par e-mail</nobr></strong>.
      </p>
      <p>
        Le <nobr>Bill-o-Tron</nobr> peut sembler un peu enigmatique au premier abord, mais ne t'inquiete pas,
        le Grand Bill a redige <nobr><a href="https://www.facebook.com/labillotron" target="_blank">quelques trucs et astuces</a></nobr>
        &nbsp;pour t'aider si tu es bloque.
      </p>
      <p>
        Nous sommes heureux de t'accueillir dans notre grande famille et esperons que tu sauras monter en grade petit a petit.<br/>
        Des que tu es pret, installe toi a ton poste et...
      </p>
      <p>
        <button onClick={() => dispatch(introOK())}>... que l'aventure commence !</button>
      </p>
      <p className="cookies">
        En poursuivant ton aventure sur notre jeu, tu acceptes
        l'utilisation des cookies qui nous permet de recolter des
        statistiques de visites et ainsi d'ameliorer ce jeu.
      </p>
      </div>
    </Wrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  status: makeSelectStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Intro);