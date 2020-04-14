import React, { useLayoutEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
  border: none;
  outline: none;
  padding: 0;
  background: none;

  .default {
    display: block;
  }
  .active {
    display: none;
  }

  &:active {
    .default {
      display: none;
    }
    .active {
      display: block;
    }
  }
`;

import ImageCancelOff from './img/bouton_annuler.svg';
import ImageCancelOn from './img/bouton_annuler_on.svg';
import ImageSubmitOff from './img/bouton_valider.svg';
import ImageSubmitOn from './img/bouton_valider_on.svg';
import ImageMailboxOff from './img/bouton_message.svg';
import ImageMailboxOn from './img/bouton_message_on.svg';
import ImageBill from './img/bouton_bill.svg';

export function SubmitButton(props) {
  return (
    <Wrapper type="button" {...props}>
      <ImageSubmitOff className="default"/>
      <ImageSubmitOn className="active"/>
    </Wrapper>
  );
}

export function CancelButton(props) {
  return (
    <Wrapper type="button" {...props}>
      <ImageCancelOff className="default"/>
      <ImageCancelOn className="active"/>
    </Wrapper>
  );
}

export function MailboxButton(props) {
  return (
    <Wrapper type="button" {...props}>
      <ImageMailboxOff className="default"/>
      <ImageMailboxOn className="active"/>
    </Wrapper>
  );
}

export function BillButton(props) {
  return (
    <Wrapper type="button" {...props}>
      <ImageBill/>
    </Wrapper>
  );
}
