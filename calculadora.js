// alert("Hola mundo");

function mostrar(e){
    let numero1 = parseInt(document.getElementById("numero1").value);
    let numero2 = parseInt(document.getElementById("numero2").value);
    let resultado = 0;
    let operacion = e.target.id;

    if (operacion == "suma"){
        resultado = numero1 + numero2;
    }
    else if (operacion == "resta"){
        resultado = numero1 - numero2;
    }
    else if (operacion == "divide"){
        resultado = numero1 / numero2;
    }
    else if(operacion == "multiplica"){
        resultado = numero1 * numero2;
    }
    else {
        alert("Funcionalidad en progeso")

    }



    let result = document.getElementById("resultado")
    result.innerHTML = resultado;

   
    
}

let butones = document.getElementById("btns");
butones.addEventListener("click", mostrar);

