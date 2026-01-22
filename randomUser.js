class Usuario {
    constructor(nombre, email, foto) {
        this.nombre = nombre;
        this.email = email;
        this.foto = foto;
    }

    // Corregido de "mostar" a "mostrar"
    mostrar() {
        return `
        <div class="card">
            <img src="${this.foto}" alt="${this.nombre}">
            <h3>${this.nombre}</h3>
            <p>${this.email}</p>
        </div>
        `;
    }
}

const renderUsuarios = (usuarios) => {
    const contenedor = document.getElementById("usuarios");
    // Usamos el método corregido "mostrar"
    contenedor.innerHTML = usuarios.map(u => u.mostrar()).join("");
};

const obtenerUsuarios = async (cantidad = 5) => {
    try {
        const respuesta = await fetch(`https://randomuser.me/api/?results=${cantidad}`);
        const datos = await respuesta.json();
        
        // Creamos la lista de objetos tipo Usuario
        const listaUsuarios = datos.results.map(u => 
            new Usuario(u.name.first, u.email, u.picture.medium)
        );
        
        renderUsuarios(listaUsuarios);
    } catch (error) {
        console.error("Ocurrió un error al obtener los usuarios", error);
    }
};

// Vinculación con el botón corregida
const boton = document.getElementById("btnCargar");
boton.addEventListener("click", () => obtenerUsuarios(3));