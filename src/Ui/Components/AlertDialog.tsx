import AlertDialogProps from "../../Interfaces/AlertDialogProps";

const AlertDialog = (props: AlertDialogProps) => {
    return (
        <div className="alert-dialog" style={{
            position: "relative",
        }}>
            <div className="alert-dialog-content" style={{
                    background: "#fff",
                    width: "90%",
                    borderRadius: "25px",
                }}>
                <div className="alert-dialog-header">
                    <div className="alert-dialog-title">{props.title}</div>
                    <div className="alert-dialog-close" onClick={props.onClose}>
                        <i className="fas fa-times"></i>
                    </div>
                </div>
                <div className="alert-dialog-body" >
                    {props.children}
                </div>
                <div className="alert-dialog-footer" style={{
                    position: "relative",
                }}>
                    <button className="btn btn-primary" style={{
                        position: "absolute",
                        right: "0",
                        bottom: "0",
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "0 0 25px 0",
                        border: "none",
                        background: "rgb(215 39 39)",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }} onClick={props.onClose}>Salir</button>
                </div>
            </div>
        </div>
    )
}

export default AlertDialog;