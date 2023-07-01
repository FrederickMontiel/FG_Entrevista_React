import { ChangeEvent, useState } from "react";
import  Pedido  from "../../../../../Fakedb/Interfaces/PedidoInterface";
import Pedidos from "../../../../../Fakedb/PedidosFake";

const AdminAddPedidoPage = () => {
    const [dataValues, setDataValues] = useState({
        fecha: new Date(),
    } as Pedido);

    const addPedido = (e:any) => {
        e.preventDefault();
        let pedidosFake:Pedidos = new Pedidos();
        pedidosFake.create(dataValues);
        window.location.href = "/admin/pedidos";
    }

    return <div className="add-pedido">
        <div className="add-pedido-header">
            <div className="add-pedido-title center">
                <h1>Agregar Pedido</h1>
            </div>
        </div>
        <div className="add-pedido-body">
            <div className="add-pedido-form">
                <div className="loginView__container__form__input center">
                    <div className="loginView__container__form__input_e"><input
                        className="form-input-login"
                        onChange={(e: any) => {
                            e.preventDefault();
                            setDataValues({
                                ...dataValues,
                                direccion: e.target.value
                            });
                        }} type="text" name="direccion" id="direccion" placeholder="Dirección"
                    /></div>
                </div>
                <div className="loginView__container__form__input center">
                    <div className="loginView__container__form__input_e"><input
                        className="form-input-login"
                        onChange={(e: any) => {
                            e.preventDefault();
                            setDataValues({
                                ...dataValues,
                                cantidad: e.target.value
                            });
                        }} type="number" name="cantidad" id="cantidad" placeholder="Cantidad"
                    /></div>
                </div>
                <div className="loginView__container__form__input center">
                    <div className="loginView__container__form__input_e">
                        <input
                            className="form-input-login"
                            onChange={(e) => {
                                e.preventDefault();
                                setDataValues({
                                    ...dataValues,
                                    fecha: new Date(e.target.value)
                                });
                            }} type="date" value={
                                new Date().toISOString().split("T")[0]
                            } name="fecha" id="fecha" placeholder=""
                        />
                    </div>
                </div>

                <div className="loginView__container__form__input center">
                    <div className="loginView__container__form__input_e"><select
                        className="form-input-login form-input-select"
                        value={dataValues.estado}
                        onChange={(e) => {
                            e.preventDefault();
                            setDataValues({
                                ...dataValues,
                                estado: e.target.value
                            });
                        }} name="estado" id="estado"
                    >
                        <option value="0" disabled selected>Estado</option>
                        <option value="Enviado">Enviado</option>
                        <option value="Pedido">Pedido</option>
                        <option value="Entregado">Entregado</option>
                    </select></div>
                </div>
            </div>

            <div className="add-pedido-buttons">
                <div className="add-pedido-button center">
                    <button className="button button-primary"
                    onClick={(event) => {
                        addPedido(event);
                    }}>Agregar</button>
                    <button className="button button-secondary"
                    onClick={() => {
                        window.location.href = "/admin/pedidos";}}
                    >Cancelar</button>
                </div>
            </div>
        </div>
    </div>;
}

export default AdminAddPedidoPage;