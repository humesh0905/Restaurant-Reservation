const Modal = ({ children, id }) => {
    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-labelledby={id + "Label"} aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal