import Pedido from "../Fakedb/Interfaces/PedidoInterface"

export const PedidosData: Pedido[] = [
    {
        id: 1,
        direccion: "Calle 1 # 1 - 1",
        cantidad: 1,
        fecha: new Date(),
        estado: "Entregado",
        capas:{
            inferior : "Cuero",
            centro : "Esponja",
            superior : "Cuero",
        },
        usuarioId: 3,
    },
    {
        id: 2,
        direccion: "Calle 2 # 2 - 2",
        cantidad: 2,
        fecha: new Date(),
        estado: "Entregado",
        capas:{
            inferior : "Cuero",
            centro : "Esponja",
            superior : "Cuero",
        },
        usuarioId: 2,
    },
]