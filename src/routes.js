import React from 'react';
// BrowserRouter: navegação entre páginas
// Switch: Garante chamar apenas uma rota por momento
import { BrowserRouter, Switch, Route} from 'react-router-dom';

// pages
import Main from './pages/Main';
import Repository from './pages//Repository';



// dentro do React tudo é um componente
export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/repository/:repository" component={Repository} />
      </Switch>
    </BrowserRouter>
  );
}