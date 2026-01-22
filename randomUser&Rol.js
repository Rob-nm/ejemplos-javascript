class Usuario {

    //Constructor
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
class UsuarioConRol extends Usuario {
    constructor(nombre, email, foto, rol) {
        super(nombre, email, foto);
        this.rol = rol;
    }
    mostrar() {
        return `
        <div class="card">
            <img src="${this.foto}" alt="${this.nombre}">
            <h3>${this.nombre} - <em>${this.rol}</em></h3>
            <h4>${this.rol}</h4>
            <p>${this.email}</p>
        </div>
        `;
    }
}


//---------------Funcion flecha para renderizar usuarios----------------------
const renderUsuarios = (usuarios) => {
    const contenedor = document.getElementById("usuarios");
    // Usamos el método corregido "mostrar"
    contenedor.innerHTML = usuarios.map(u => u.mostrar()).join("");
};
// --------------Promesa con async / await para consumir API-------------------
const obtenerUsuarios = async (cantidad = 5) => {
    try {
        const respuesta = await fetch(`https://randomuser.me/api/?results=${cantidad}`);
        const datos = await respuesta.json();
        const roles = ["Admin", "Editor", "Viewer", "Contributor", "Moderator"];
        
        datos.results.forEach((u, i) => {
           //Ususario normal

            let listaUsuarios = [];

           if (i % 2 === 0){
                listaUsuarios[i] = new Usuario(u.name.first + ''+ u.name.last, u.name.first, u.email, u.picture.medium);
           }
           else{
                listaUsuarios.push(new UsuarioConRol(
                    u.name.first + ''+ u.name.last,
                    u.name.first, 
                    u.email, 
                    u.picture.medium, 
                    roles[i % roles.length]
                ));
           }
        });


        // ---Creamos la lista de objetos tipo Usuario-------------------------
        const listaUsuarios = datos.results.map(u => 
            new Usuario(u.name.first, u.email, u.picture.medium)
        );
        
        renderUsuarios(listaUsuarios);
    } catch (error) {
        console.error("Ocurrió un error al obtener los usuarios", error);
    }
};

//---------------- Vinculación con el botón corregida------------------------
const boton = document.getElementById("btnCargar");
boton.addEventListener("click", () => obtenerUsuarios(3));