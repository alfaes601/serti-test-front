import { useEffect } from "react";

const Evoluciones = ({ e }) => {
    useEffect(() => {
        console.log("refresh")
    }, [])
    return (
        <div>
            {e.nombre}
            <img src={e.img} alt="Img Evolucion" />
        </div>
    )
}

export default Evoluciones;
