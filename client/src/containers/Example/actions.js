/*      ===========  Actions ===========
  Redux "Actions" são apenas "objetos" onde possuem o "type" da action
  e outro qualquer tipo de dado (ideal colocar em uma chave "payload"),
  que vai para o reducer, onde "trata" essa action
*/
import { TOGGLE } from './actionTypes';

export const actionExample = () => {
  console.log('Example Action');

  return {
    type: TOGGLE,
  };
};
