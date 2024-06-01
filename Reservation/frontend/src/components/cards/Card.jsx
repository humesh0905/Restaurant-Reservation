const Card = ({ children }) => {
    return (
        <div className="col-lg-6">
            <div className="card flex-md-row mb-4 box-shadow h-md-250">
                <div className="card-body d-flex flex-column">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Card