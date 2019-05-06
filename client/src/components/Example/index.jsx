import React from 'react';
import { connect } from 'react-redux';

// Separar "imports" de arquivos locais dos "imports" de módulos npm
import { actionExample } from './Example.actions';
import './Example.css';

// "Dumb" component (Component sem state)
const Example = props => (
  <div>
    <h2 className="example" onClick={props.actionExample}>
      Component for Example
    </h2>
    {/*
      Condicional "rendering" no jsx
      Se props.isOnline for true, renderiza um h6 (true), se falso, h6 (falso)
    */}
    {props.isOnline === true ? <h6>True</h6> : <h6>False</h6>}
  </div>
);

// Recebe o state (store data) e retorna como props para o componente
const mapStateToProps = (state) => {
  const { isOnline } = state.example;

  return { isOnline };
};

// Argumento com actions para "disparar" ações para a store
const mapDispatchToProps = {
  actionExample,
};

// Método para conectar o componente a Redux Store
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Example);
