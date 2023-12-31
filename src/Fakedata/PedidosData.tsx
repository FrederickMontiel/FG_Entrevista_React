import Pedido from "../Fakedb/Interfaces/PedidoInterface"

export const PedidosData: Pedido[] = [
    {
        id: 1,
        direccion: "Calle 1 # 1 - 1",
        cantidad: 1,
        fecha: new Date(),
        estado: "Entregado",
        usuarioId: 2,
    },
    {
        id: 2,
        direccion: "Calle 2 # 2 - 2",
        cantidad: 2,
        fecha: new Date(),
        estado: "Entregado",
        usuarioId: 2,
    }
]
