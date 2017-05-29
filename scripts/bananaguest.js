//BananaGuest JavaScript:
//Ajax:
var req = new XMLHttpRequest();
//------------------------------------Validacion de forms------------------------------------//
//Validar form login:
if (document.getElementById('btn_login') != null) document.getElementById('btn_login').onclick = function (evnt) {
    var validar = validaEntrada1();
    if (!validar) return false;
}

function validaEntrada1() {
    var user = document.getElementById('userName');
    var pass = document.getElementById('userPassword');

    var mensaje = '';

    if (user.validity.valueMissing) mensaje += '<li> Introduce tu nombre de usuario</li>';
    if (pass.validity.valueMissing) mensaje += ' <li>Introduce tu contraseña</li>';
    if (user.validity.patternMismatch) mensaje += '<li>El nombre de usuario no coincide con el patrón establecido: example.bananaguest</li>'

    document.getElementById('errores').innerHTML = mensaje;

    return (mensaje ? false : true);
}

//Validar form crear usuario:

if (document.getElementById('btn_crear') != null) {
    document.getElementById('btn_crear').onclick = function (evnt) {
        var validar = validaEntrada2();
        if (!validar) return false;
    }
}

function validaEntrada2() {
    var name = document.getElementById('name_crear');
    var user = document.getElementById('username_crear');
    var email = document.getElementById('email_crear');
    var pass = document.getElementById('password_crear');

    var mensaje = '';

    if (name.validity.valueMissing || user.validity.valueMissing || email.validity.valueMissing || pass.validity.valueMissing) {
        mensaje += '<li> Todos los campos son requeridos</li>';
    }
    if (pass.validity.tooShort) mensaje += '<li> La contraseña es demasiado corta</li>';
    if (name.validity.tooShort || name.validity.toolong) mensaje += '<li> El campo Firstname debe contener entre 2 y 10 caracteres</li>';
    if (name.validity.patternMismatch) mensaje += '<li> El campo Firstname no puede contener números</li>';
    if (email.validity.patternMismatch) mensaje += '<li> El email no es válido</li>'
    if (user.validity.patternMismatch) mensaje += '<li> El nombre de usuario no coincide con el patrón establecido: example.bananaguest</li>'

    document.getElementById('errores2').innerHTML = mensaje;

    return (mensaje ? false : true);
}
//Validar form crear proyecto:
function validateNewProject(){
    if (document.getElementById('btn_save') != null) {
        document.getElementById('btn_save').onclick = function (evnt) {
            var validar = validaEntrada3();
            if (!validar) return false;
        }
    }
}
function validaEntrada3() {
    var nombre_proyecto = document.getElementById('nombre_proyecto');
    var nombre_colab = document.getElementById('nombre_colab');
    var email_colab = document.getElementById('email_colab');
    var mensaje = '';

    if (nombre_proyecto.validity.valueMissing || nombre_colab.validity.valueMissing || email_colab.validity.valueMissing) {
        mensaje += '<li> Hay campos requeridos sin completar</li>';
    }
    if (email_colab.validity.patternMismatch) mensaje += '<li> El email no es válido</li>'
    if (nombre_colab.validity.patternMismatch) mensaje += '<li> El nombre de colaborador no puede contener números</li>';

    document.getElementById('errores3').innerHTML = mensaje;

    return (mensaje ? false : true);
}


//------------------------------------Pagina principal------------------------------------//
//Botones borrar de PROYECTOS EN CURSO:
if (document.getElementsByClassName('btn_borrar') != null) {
    var botonesborrar = document.getElementsByClassName('btn_borrar');
    for (var i = 0; i < botonesborrar.length; i++) {
        botonesborrar[i].onclick = function (evnt) {
            var id = this.getAttribute('data-id');
            var tr_eliminar = document.getElementById(id);

            var r = confirm('Desea borrar este proyecto?');
            if (r == true) {
                req.open('get', 'OK.html', true);
                req.onreadystatechange = function () {
                    if (req.readyState == 4) {
                        if (req.responseText == 'OK') {
                            tr_eliminar.parentNode.removeChild(tr_eliminar);
                        }
                    }
                }
                req.send();
            }//fin if confirm
        }
    }//fin for
}

//Botones editar de PROYECTOS EN CURSO:
if (document.getElementsByClassName('btn_editar') != null) {
    var botoneseditar = document.getElementsByClassName('btn_editar');
    for (var i = 0; i < botoneseditar.length; i++) {


        botoneseditar[i].onclick = function (evnt) {
            document.getElementById('modal_edit').className = 'modal show';

            req.open('get', 'nuevoproyecto_server.html', true);
            req.onreadystatechange = function () {
                if (req.readyState == 4) {
                    document.getElementById('modal_inner').innerHTML = req.responseText;
                      validateNewProject();
                }

            }
            req.send();
          
        }

    }
}

//modal NUEVO PROYECTO:
if (document.getElementById('btn_nuevoproyecto') != null) {
    document.getElementById('btn_nuevoproyecto').onclick = function (evnt) {
        evnt.preventDefault();

        document.getElementById('modal_nuevo').className = 'modal show';
        req.open('get', 'nuevoproyecto_server.html', true);
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                document.getElementById('modalnuevo_inner').innerHTML = req.responseText;
                validateNewProject();   
             }

        }
        req.send();
    }
}

//----recoger values input:
// if (document.getElementById('btn_submit_proyecto')){
//     document.getElementById('btn_submit_proyecto').onclick = function (evnt) {
//     var nombre = document.getElementById('nombre_proyecto').nodeValue;
//     var colaboradores = document.getElementById('nombre_colab').value;

//     document.getElementById('table_inner').innerHTML = '<tr id="fila6"><td>' + nombre + '</td><td>'+ colaboradores +'</td><td><button class="btn_borrar" data-id="fila6">Delete</button><button class="btn_editar">Edit</button></td></tr>'

//   }
// }


//CERRAR ventanas modal:
if (document.getElementById('btn_closemodal') != null && document.getElementById('btn_x') != null || document.getElementById('btn_closemodalnuevo') != null && document.getElementById('btn_xnuevo') != null) {
    document.getElementById('btn_closemodal').onclick = function (evnt) {
        document.getElementById('modal_edit').className = 'modal_edit_none';
    }
    document.getElementById('btn_x').onclick = function (evnt) {
        document.getElementById('modal_edit').className = 'modal_edit_none';
    }

    document.getElementById('btn_closemodalnuevo').onclick = function (evnt) {
        document.getElementById('modal_nuevo').className = 'modal_edit_none';
    }
    document.getElementById('btn_xnuevo').onclick = function (evnt) {
        document.getElementById('modal_nuevo').className = 'modal_edit_none';
    }
  }

    
  


//------------------------------------Pagina tareas------------------------------------//

//-----Borrado Elementos Del Proyecto-----------
var lbd = document.getElementsByClassName('del');

if(lbd) for (var i = 0; i < lbd.length; i++) {

	lbd[i].onclick=function (evnt) {
		var id=this.getAttribute('data-id');
		var elemABorrar=document.getElementById(id);
		elemABorrar.parentNode.removeChild(elemABorrar);
	}

}
//----------------------BotonEDIT projectmodal.html---------------------------------


var btns_edit=document.getElementsByClassName('pro_edit');

if(btns_edit) for(i = 0; i < btns_edit.length; i++){
    
    btns_edit[i].onclick=function (evnt){
    var url = 'proj_edit.html';
    var myWindow = window.open(url, "", "width=800,height=600");
    }
};
//----------------------Boton Modify abre propiedades proyecto-------------------------------- 
var btns_r=document.getElementsByClassName('modify');

if(btns_r) for(i = 0; i < btns_edit.length; i++){
    
    btns_r[i].onclick=function (evnt){
    var url = 'campos_proj.html';
    var myWindow = window.open(url, "", "width=800,height=600");
    }
};
/*---------------------------Boton Envia valida campos_proj---------------------------------*/


if (document.getElementById('capturar')) document.getElementById('capturar').onclick=function (evnt){
///*entra desde form-->*/document.getElementById('formR').onsubmit=function (evnt){
    var valid= validaFormR();
    if(!valid) return false;
    var url = 'OK.html';
    var myWindow = window.open(url, "", "width=800,height=600");

    };
function validaFormR(){
	var txtT = document.getElementById('tProj').value;
    var txtTP = document.getElementById('tipoP').value;
    var txtFi = document.getElementById('fI').value;
    var txtFf = document.getElementById('fF').value;
    var txtE = document.getElementById('estado').value;
    var mensaje='';
    var dateV=/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    if(!txtT || !txtTP || !txtFi || !txtFf || !txtE ) {
        mensaje="<p>Porfavor introduzca información en todos los campos</p>";
    }
    else if(txtT == "") {mensaje +="Da un nombre al proyecto";}
    else if(txtTP == "") {mensaje += 'Introduzaca tipo proyecto';}
    else if(txtFi.match(dateV)) {mensaje +="Introduzca de nuevo la fecha inicio";}
    else if(txtFf.match(dateV)) {mensaje += 'Introduzca de nuevo la fecha fin';}
    else if(txtE == "") {mensaje +="Introduzca estado del proyecto";}

    
    document.getElementById('hey').innerHTML=mensaje;

    return (mensaje ? false : true);
};

























