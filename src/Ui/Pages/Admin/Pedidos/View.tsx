import  logoPng  from "../../../../Assets/Images/Icons/exit.svg"
import { useEffect, useState } from "react";
import Pedidos from "../../../../Fakedb/PedidosFake";
import "../../../../Assets/Css/Pages/AdminDashboard.css"
import Pedido from "../../../../Fakedb/Interfaces/PedidoInterface";
import moment from "moment";
import AlertDialog from "../../../Components/AlertDialog";
import Usuarios from "../../../../Fakedb/UsuariosFake";
import Usuario from "../../../../Fakedb/Interfaces/UsuarioInterface";

const AdminPedidosPage = () => {
    const [pedidos, setPedidos] = useState([] as Pedido[]);

    useEffect(()=>{
        findAllPedidos();
    },[]);

    const findAllPedidos = () => {
        setPedidos([] as Pedido[]);

        let pedidosFake:Pedidos = new Pedidos();
        let pedidos:Pedido[] = pedidosFake.findAll().reverse();

        setPedidos(pedidos);
    }

    const STATUS_DIALOG = {
        SHOWED: "SHOWED",
        CLOSED: "CLOSED"
    }

    const [statusDialog, setStatusDialog] = useState(STATUS_DIALOG.CLOSED);
    const [pedidoSelected, setPedidoSelected] = useState({} as Pedido);

    const findUser = (id:number):String => {
        let usuariosFake:Usuarios = new Usuarios();
        let usuario:Usuario = usuariosFake.findById(id);

        return usuario?.username;
    }

    const updateEstadoPedido = (e:any) => {
        e.preventDefault();

        
        setPedidoSelected({
            ...pedidoSelected,
            estado: e.target.value
        });
        
        let pedidosFake:Pedidos = new Pedidos();
        pedidosFake.updateOne(pedidoSelected?.id, {
            ...pedidoSelected,
            estado: e.target.value
        });

        findAllPedidos();
    }

    return <div className="admin-dashboard-page">
        <img src={logoPng} alt="" className="exitIcon" onClick={() =>{
            localStorage.removeItem("session");
            window.location.href = "/";
        }}></img>

        <div  style={{
            display: statusDialog === STATUS_DIALOG.SHOWED ? "block" : "none"
        }} className="alert-dialog">
            <AlertDialog title="Datos seleccionados:" onClose={()=>{
                setStatusDialog(STATUS_DIALOG.CLOSED);
            }} children={<div>
                    <div className="alert-dialog-text-container">
                        <h3>Id:</h3>
                        <p>{pedidoSelected?.id}</p>
                    </div>
                    <div className="alert-dialog-text-container">
                        <h3>Usuario:</h3>
                        <p>{findUser(pedidoSelected?.usuarioId)}</p>
                    </div>
                    <div className="alert-dialog-text-container">
                        <h3>Fecha:</h3>
                        <p>{moment(pedidoSelected?.fecha).format("DD/MM/YYYY")} <br/> {moment(pedidoSelected?.fecha).format("HH:MM:SS")}</p>
                    </div>
                    <div className="alert-dialog-text-container">
                        <h3>Capas:</h3>
                        <p>{pedidoSelected?.capas?.inferior} <br/> {pedidoSelected?.capas?.centro} <br/> {pedidoSelected?.capas?.superior}</p>
                    </div>
                    <div className="alert-dialog-text-container">
                        <h3>Cantidad:</h3>
                        <p>{pedidoSelected?.cantidad}</p>
                    </div>
                    <div className="alert-dialog-text-container">
                        <h3>Estado:</h3>
                        <select
                            className="inputSelect"
                            value={pedidoSelected?.estado}
                            onChange={(e) => {
                                updateEstadoPedido(e)
                            }}
                        >
                            <option value="En proceso">En proceso</option>
                            <option value="Enviado">Enviado</option>
                            <option value="Entregado">Entregado</option>
                        </select>
                    </div>

            </div>}/>
        </div>

        <div className="container">
            <div className="center">
                <div className="titleDiv">
                    <br/>
                    <h1>Pedidos</h1>
                    <p>Aquí aparecerán los pedidos que se han hecho</p>
                </div>
            </div>

            <div className="divRight">
                <button className="addBtn" onClick={() =>{
                    window.location.href = "/admin/pedidos/add";
                }}>Agregar</button>
            </div>

            <div className="divTable">
                <div className="divThead">
                    <div className="divTr">
                        <div className="divTd">Id</div>
                        <div className="divTd">Fecha</div>
                        <div className="divTd">Capas</div>
                        <div className="divTd">Cantidad</div>
                        <div className="divTd">Estado</div>
                    </div>
                </div>
                <div className="divTbody">
                    {
                        pedidos.map((pedido:Pedido, index:number)=>(
                            <div className="divTr" key={index} onClick={() => {
                                setStatusDialog(STATUS_DIALOG.SHOWED);
                                setPedidoSelected(pedido);
                            }}>
                                <div className="divTd">{pedido?.id}</div>
                                <div className="divTd">{moment(pedido?.fecha).format("DD/MM/YYYY")} <br/> {moment(pedido?.fecha).format("HH:MM:SS")}</div>
                                <div className="divTd">{pedido?.capas?.inferior} <br/> {pedido?.capas?.centro} <br/> {pedido?.capas?.superior}</div>
                                <div className="divTd">{pedido?.cantidad}</div>
                                <div className="divTd">{pedido?.estado}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
       
    </div>;
}

export default AdminPedidosPage;