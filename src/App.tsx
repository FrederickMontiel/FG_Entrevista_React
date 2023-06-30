/*import React from 'react';
import logo from './logo.svg';*/
import './App.css';
import { BrowserRouter} from 'react-router-dom';
import {
  GuardConfigProvider,
  GuardedRoute,
  GuardedRoutes,
  GuardProvider,
} from 'react-router-guarded-routes'
import LoginPage from './Ui/Pages/Login/View';
import { useEffect } from 'react';
import Usuarios from './Fakedb/UsuariosFake';
import { UsuarioData } from './Fakedata/UsuariosData';
import { authMiddleware } from './Middlewares/LoginMiddleware';
import RedirectPage from './Ui/Pages/Redirect/View';
import Pedidos from './Fakedb/PedidosFake';
import { PedidosData } from './Fakedata/PedidosData';
import AdminPedidosPage from './Ui/Pages/Admin/Pedidos/View';
import AdminAddPedidoPage from './Ui/Pages/Admin/Pedidos/Add/View';

function App() {
  useEffect(()=>{

    //Esto solo integra los datos por defecto en la fake table Usuarios
    let usuariosFake = new Usuarios();
    UsuarioData.forEach(usuario => {
      if(usuariosFake.findById(usuario.id) === undefined){
        usuariosFake.create(usuario);
      }
    });

    let pedidosFake = new Pedidos();
    PedidosData.forEach(pedido => {
      if(pedidosFake.findById(pedido.id) === undefined){
        pedidosFake.create(pedido);
      }
    });
  },[]);

  return (
    <BrowserRouter>
      <GuardProvider>
        <GuardConfigProvider>
          {/*<GuardProvider fallback={<RedirectPage/>} guards={authMiddleware.noLogued}>*/}
            <GuardedRoutes>
              <GuardedRoute path="/" exact element={<LoginPage/>} />
              <GuardedRoute path="/login" exact element={<LoginPage/>} />
            </GuardedRoutes>
          {/*</GuardProvider>*/}
          <GuardProvider fallback={<RedirectPage/>} guards={authMiddleware.admin}>
            <GuardedRoutes>
              <GuardedRoute path="/admin" >
                <GuardedRoute path="/admin/pedidos" element={<AdminPedidosPage/>}/>
                <GuardedRoute path="/admin/pedidos/add" element={<AdminAddPedidoPage/>}/>
              </GuardedRoute>
            </GuardedRoutes>
          </GuardProvider>
        </GuardConfigProvider>
      </GuardProvider>
    </BrowserRouter>
  );
}

export default App;
