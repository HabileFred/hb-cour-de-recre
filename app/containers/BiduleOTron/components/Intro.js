import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import { makeSelectStatus } from 'BOT/selectors';
import { makeSelectLocale } from '../../LanguageProvider/selectors'
import { introOK } from 'BOT/actions';

import { changeLocale } from '../../LanguageProvider/actions';

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

function Intro({ dispatch, lang }) {

  function cac_handleResult(data) {
    if (data.status === 'ok') {
      localStorage.setItem('bot_token', data.token);
      localStorage.setItem('bot_code', data.code);
      dispatch(introOK());
    } else {
      cac_showError();
      checkAccess();
    }
  }

  function cac_checkAccessCode(data) {
    if (!data) {
      data = {
        code: document.getElementById('accessCode').value.trim(),
        token: localStorage.getItem('bot_token')
      };
    }
    fetch('/cour-de-recre/bill-o-tron/access/access.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(x => x.json()).then(cac_handleResult).catch(cac_showError);
    return false;
  }

  function cac_showError() {
    let errorMsg = document.getElementById('inputAccessCodeError')
    errorMsg.style.display = 'block'
  }

  function cac_checkAccess() {
    if (process.env.NODE_ENV !== 'production') {
      dispatch(introOK());
    } else {
      let code = localStorage.getItem('bot_code');
      let token = localStorage.getItem('bot_token');
      if (code && token) {
        cac_checkAccessCode({
          code,
          token
        });
      } else {
        let input = document.getElementById('inputAccessCode')
        code = input.value
        if (code && code.trim().length) {
          cac_checkAccessCode({ code });
        } else {
          cac_showError()
        }
      }
    }
  }

  function setLocale(locale) {
    dispatch(changeLocale(locale))
  }

  if (lang === 'fr') {
    return (
      <Wrapper>
        <div>
        <p>
          <button onClick={() => setLocale('en')}>Version anglaise</button>
        </p>
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
          Des que tu es pret, installe-toi a ton poste...
        </p>
        <p>
          Saisis ton code d'acces (tu peux <a href="https://www.a-maze-in.com" target="_blank">acheter un code sur le site d'A Maze In</a>)...
        </p>
        <p>
          <input id="inputAccessCode" type="text" size="40" placeholder="Code d'access au bill-o-tron"></input>
          <span id="inputAccessCodeError" style={{display: 'none', color: 'white', background: 'red', padding: '5px 10px', marginTop: '1em'}}>
            Desole, ce code ne semble pas etre valide.
          </span>
        </p>
        <p>
          <button onClick={() => cac_checkAccess()}>... et que l'aventure commence !</button>
        </p>
        <p className="cookies">
          En poursuivant ton aventure sur notre jeu, tu acceptes
          l'utilisation des cookies qui nous permet de recolter des
          statistiques de visites et ainsi d'ameliorer ce jeu.
        </p>
        </div>
      </Wrapper>
    );
  } else {
    // TODO Translation
    return (
      <Wrapper>
        <div>
        <p>
          <button onClick={() => setLocale('fr')}>Version francaise</button>
        </p>
        <p>
          <strong>Welcome, Small Bill !</strong>
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
          Des que tu es pret, installe-toi a ton poste...
        </p>
        <p>
          Saisis ton code d'acces (tu peux <a href="https://www.a-maze-in.com" target="_blank">acheter un code sur le site d'A Maze In</a>)...
        </p>
        <p>
          <input id="inputAccessCode" type="text" size="40" placeholder="Code d'access au bill-o-tron"></input>
          <span id="inputAccessCodeError" style={{display: 'none', color: 'white', background: 'red', padding: '5px 10px', marginTop: '1em'}}>
            Desole, ce code ne semble pas etre valide.
          </span>
        </p>
        <p>
          <button onClick={() => cac_checkAccess()}>... et que l'aventure commence !</button>
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


}

const mapStateToProps = createStructuredSelector({
  status: makeSelectStatus(),
  lang: makeSelectLocale()
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