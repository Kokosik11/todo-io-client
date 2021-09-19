import "./style.css";

const Loader = () => {
    return (
        <div className="loading-wrapper">
            <div className="loading">
                <div className="arc"></div>
                <div className="arc"></div>
                <div className="arc"></div>
            </div>
        </div>
    )
}

export default Loader;