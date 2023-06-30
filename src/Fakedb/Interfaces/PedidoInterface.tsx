export default interface Pedido{
    id:number,
    direccion:string,
    cantidad:number,
    fecha:Date,
    estado:string,
    //Por motivos de tiempo lo haré de esta manera
    capas:{
        inferior : string,
        centro : string,
        superior : string,
    }

    usuarioId:number,
}