import React from "react";
import IconoContacto from "../images/IconoContacto.png";

const Contacto = () => {
  return (
    <div className="contacto">
      <section className="contacto__img">
        <img src={IconoContacto} alt="Icono Contacto" />
      </section>

      <section className="contacto__info">
        <p>
          {" "}
          <span>Numero</span> 11-1111111111
        </p>

        <p>
          {" "}
          <span>Email</span> ejemplo@ejemplo.com
        </p>

        <p>
          {" "}
          <span>De donde soy</span> Buenos Aires, Argentina
        </p>
      </section>
    </div>
  );
};

export default Contacto;
