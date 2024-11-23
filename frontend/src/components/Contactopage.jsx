import "./styeComponents/Contactopage.css";

const Contactopage = () => {
    return (
        <div className="contenedor-contacto">
            <div className="info-empresa">
                <h2>Información de la Empresa</h2>
                <p><strong>Nombre:</strong> Pixel Negro SpA</p>
                <p><strong>Teléfono:</strong> +56 (9) 8000 9000</p>
                <p><strong>Email:</strong> contacto@unpixelnegro.cl</p>
                <p><strong>Dirección:</strong> En alguna parte de Ñuñoa, Santiago de Chile</p>
            </div>
            <div className="formulario-contacto">
                <h2>Envíanos un Mensaje</h2>
                <form>
                    <div className="campo-formulario">
                        <label htmlFor="nombre">Nombre:</label>
                        <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" required />
                    </div>
                    <div className="campo-formulario">
                        <label htmlFor="email">Correo Electrónico:</label>
                        <input type="email" id="email" name="email" placeholder="Tu correo" required />
                    </div>
                    <div className="campo-formulario">
                        <label htmlFor="mensaje">Mensaje:</label>
                        <textarea id="mensaje" name="mensaje" placeholder="Escribe tu mensaje" rows="5" required></textarea>
                    </div>
                    <button type="submit" className="btn-enviar">Enviar</button>
                </form>
            </div>
        </div>
    );
};

export default Contactopage;
