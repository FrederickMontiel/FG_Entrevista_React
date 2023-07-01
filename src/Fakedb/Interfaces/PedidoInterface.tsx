export default interface Pedido{
    id:number,
    direccion:string,
    cantidad:number,
    fecha:Date,
    estado:string,

    usuarioId:number,
}