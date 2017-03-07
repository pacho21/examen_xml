var formElement=null;
var numeroSecreto=null;
var respuestaSelect=null;
var respuestasCheckbox = [];
var nota = 0;  //nota de la prueba sobre 3 puntos (hay 3 preguntas)

var answRadio1;
var answRadio2;
var answText1;
var answText2;
var answCheck1 = [];
var answCheck2 = [];
var answSelect1;
var answSelect2;
var answMult1 = [];
var answMult2 = [];
//**************************************************************************************************** 
//Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.
window.onload = function(){ 

 //CORREGIR al apretar el botón
 formElement=document.getElementById('myform');
 formElement.onsubmit=function(){
   inicializar();
   if (comprobarContestadas()){
    corregir();
    presentarNota();
   }
   return comprobarContestadas();
 }
 
 //LEER XML de xml/preguntas.xml
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   gestionarXml(this);
  }
 };
 xhttp.open("GET", "xml/preguntas.xml", true);
 xhttp.send();
}

//****************************************************************************************************
// Recuperamos los datos del fichero XML xml/preguntas.xml
// xmlDOC es el documento leido XML. 
function gestionarXml(dadesXml){
 var xmlDoc = dadesXml.responseXML; //Parse XML to xmlDoc
//Radio1
    var tituloRadio = xmlDoc.getElementsByTagName("title")[0].innerHTML;
    var opcionesRadio = [];
    var nopt = xmlDoc.getElementById("q_01").getElementsByTagName('option').length;
    for (i = 0; i < nopt; i++) {
        opcionesRadio[i] = xmlDoc.getElementById("q_01").getElementsByTagName('option')[i].innerHTML;
    }
    ponerDatosRadio(tituloRadio, "q1", opcionesRadio, "radioDiv1");
    //ANSWER
    answRadio1 = xmlDoc.getElementById("q_01").getElementsByTagName('answer')[0].innerHTML;

//Radio2
    var tituloRadio = xmlDoc.getElementsByTagName("title")[1].innerHTML;
    var opcionesRadio = [];
    var nopt = xmlDoc.getElementById("q_02").getElementsByTagName('option').length;
    for (i = 0; i < nopt; i++) {
        opcionesRadio[i] = xmlDoc.getElementById("q_02").getElementsByTagName('option')[i].innerHTML;
    }
    ponerDatosRadio(tituloRadio, "q2", opcionesRadio, "radioDiv2");
    //ANSWER
   answRadio2 = xmlDoc.getElementById("q_02").getElementsByTagName('answer')[0].innerHTML;
//end of radio's
//TEXT
document.getElementById("q3").innerHTML = xmlDoc.getElementsByTagName("title")[2].innerHTML;
answText1 = xmlDoc.getElementById("q_03").getElementsByTagName('answer')[0].innerHTML;

document.getElementById("q4").innerHTML = xmlDoc.getElementsByTagName("title")[3].innerHTML;
var  answText1 = xmlDoc.getElementById("q_04").getElementsByTagName('answer')[0].innerHTML;

//checkbox
	var tituloCheckbox = xmlDoc.getElementsByTagName("title")[4].innerHTML;
    var opcionesCheckbox = [];
    var nopt = xmlDoc.getElementById("q_05").getElementsByTagName('option').length;
   
    for (i = 0; i < nopt; i++) {
        opcionesCheckbox[i] = xmlDoc.getElementById("q_05").getElementsByTagName('option')[i].innerHTML;
    }
    ponerDatosCheckbox(tituloCheckbox, "q5", opcionesCheckbox, "checkBoxDiv1");
    //ANSWER
    var numres = xmlDoc.getElementById("q_05").getElementsByTagName('answer').length;
        answCheck1 = xmlDoc.getElementById("q_05").getElementsByTagName('answer').innerHTML;

	//checkbox2

	var tituloCheckbox = xmlDoc.getElementsByTagName("title")[5].innerHTML;
    var opcionesCheckbox = [];
    var nopt = xmlDoc.getElementById("q_06").getElementsByTagName('option').length;
    for (i = 0; i < nopt; i++) {
        opcionesCheckbox[i] = xmlDoc.getElementById("q_06").getElementsByTagName('option')[i].innerHTML;
    }
    ponerDatosCheckbox(tituloCheckbox, "q6", opcionesCheckbox, "checkBoxDiv2");
    
    //ANSWER
    var nres = xmlDoc.getElementById("q_06").getElementsByTagName('answer').length;
    
    answCheck2 = xmlDoc.getElementById("q_06").getElementsByTagName('answer').innerHTML;

    //SELECT ------------------------------------------------------------
    var tituloSelect = xmlDoc.getElementsByTagName("title")[6].innerHTML;
    var opcionesSelect = [];
    
    var nopt = xmlDoc.getElementById("q_07").getElementsByTagName('option').length;
    for (i = 0; i < nopt; i++) {
        opcionesSelect[i] = xmlDoc.getElementById("q_07").getElementsByTagName('option')[i].innerHTML;
    }
    ponerDatosSelect(tituloSelect, "q7", opcionesSelect, 0);
    //ANSWER
    
    answSelect1 = xmlDoc.getElementById("q_07").getElementsByTagName('answer')[0].innerHTML;

    //-------------------------------------------------------------------------------------

    tituloSelect = xmlDoc.getElementsByTagName("title")[7].innerHTML;
    opcionesSelect = [];
	
    var nopt = xmlDoc.getElementById("q_08").getElementsByTagName('option').length;
    for (i = 0; i < nopt; i++) {
        opcionesSelect[i] = xmlDoc.getElementById("q_08").getElementsByTagName('option')[i].innerHTML;
    }
    ponerDatosSelect(tituloSelect, "q8", opcionesSelect, 1);
    //ANSWER
    answSelect2 = xmlDoc.getElementById("q_08").getElementsByTagName('answer')[0].innerHTML;

    //MULTIPLE ----------------------------------------------------------
    var tituloMultiple = xmlDoc.getElementsByTagName("title")[8].innerHTML;
    var opcionesMultiple = [];
    
    var nopt = xmlDoc.getElementById("q_09").getElementsByTagName('option').length;
    for (i = 0; i < nopt; i++) {
        opcionesMultiple[i] = xmlDoc.getElementById("q_09").getElementsByTagName('option')[i].innerHTML;
    }
    ponerDatosMultiple(tituloMultiple, "q9", opcionesMultiple, 2);
    //ANSWER
    
    var nres = xmlDoc.getElementById("q_09").getElementsByTagName('answer').length;
    for (i = 0; i < nres; i++) {
        answMult1[i] = xmlDoc.getElementById("q_09").getElementsByTagName('answer')[i].innerHTML;
    }

    //------------------------------------------------------

    var tituloMultiple = xmlDoc.getElementsByTagName("title")[9].innerHTML;
    var opcionesMultiple = [];
    
    var nopt = xmlDoc.getElementById("q_10").getElementsByTagName('option').length;
    for (i = 0; i < nopt; i++) {
        opcionesMultiple[i] = xmlDoc.getElementById("q_10").getElementsByTagName('option')[i].innerHTML;
    }
    ponerDatosMultiple(tituloMultiple, "q10", opcionesMultiple, 3);
    //ANSWER
    
    var nres = xmlDoc.getElementById("q_10").getElementsByTagName('answer').length;
    for (i = 0; i < nres; i++) {
        answMult2[i] = xmlDoc.getElementById("q_10").getElementsByTagName('answer')[i].innerHTML;
    }



}

function ponerDatosMultiple(tituloMultiple, IDposicion, opciones, numSelect) {
    document.getElementById(IDposicion).innerHTML = tituloMultiple;
    var select = document.getElementsByTagName("select")[numSelect];
    for (i = 0; i < opciones.length; i++) {
        var option = document.createElement("option");
        option.text = opciones[i];
        option.value = i;
        select.options.add(option);
    }
}

function ponerDatosSelect(tituloSelect, IDposicion, opciones, numSelect) {
    document.getElementById(IDposicion).innerHTML = tituloSelect;

    var select = document.getElementsByTagName("select")[numSelect];

    var option = document.createElement("option");
    option.text = "Elige una respuesta..."
    option.value = 0;
    select.options.add(option);
    for (i = 0; i < opciones.length; i++) {
        var option = document.createElement("option");
        option.text = opciones[i];
        option.value = i;
        select.options.add(option);
    }
}


function ponerDatosCheckbox(tituloCheckbox, IDposicion, opciones, divID) {
    document.getElementById(IDposicion).innerHTML = tituloCheckbox;
    var checkBoxContainer = document.getElementById(divID);

    for (i = 0; i < opciones.length; i++) {
        var input = document.createElement("input");
        var label = document.createElement("label");
        label.innerHTML = opciones[i];
        label.setAttribute("for", "check_" + i + divID);
        input.id = "check_" + i + divID;
        input.type = "checkbox";
        input.name = "check" + divID;
        checkBoxContainer.appendChild(input);
        checkBoxContainer.appendChild(label);
        checkBoxContainer.appendChild(document.createElement("br"));
    }
}

function ponerDatosRadio(tituloRadio, IDposicion, opciones, divID) {
    document.getElementById(IDposicion).innerHTML = tituloRadio;
    var radioContainer = document.getElementById(divID);

    for (i = 0; i < opciones.length; i++) {
        var input = document.createElement("input");
        var label = document.createElement("label");
        label.innerHTML = opciones[i];
        label.setAttribute("for", "rad_" + i + divID);
        input.id = "rad_" + i + divID;
        input.type = "radio";
        input.name = "rad" + divID;
        radioContainer.appendChild(input);
        radioContainer.appendChild(label);
        radioContainer.appendChild(document.createElement("br"));
    }

}

//****************************************************************************************************
//implementación de la corrección



//****************************************************************************************************
// poner los datos recibios en el HTML

function ponerDatosCheckboxHtml(t,opt){
 var checkboxContainer=document.getElementById('checkboxDiv');
 document.getElementById('tituloCheckbox').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "color_"+i);
    input.type="checkbox";
    input.name="color";
    input.id="color_"+i;;    
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
    checkboxContainer.appendChild(document.createElement("br"));
 }  
}

//****************************************************************************************************
//Gestionar la presentación de las respuestas

function inicializar(){
   document.getElementById('resultadosDiv').innerHTML = "";
   nota=0.0;
}


function corregir() {
    document.getElementById("resultados").style.display = "block";
    addCorreccionHtml("RESULTADOS", "h2");
    document.getElementById("resultados").appendChild(document.createElement("hr"));

    addCorreccionHtml("PREGUNTA 1", "h4");
    corregirRadio("radradioDiv1", answRadio1, 1);
    addSolucionHtml(answRadio1);

    addCorreccionHtml("PREGUNTA 2", "h4");
    corregirRadio("radradioDiv2", answRadio2, 2);
    addSolucionHtml(answRadio2);

    addCorreccionHtml("PREGUNTA 3", "h4");
    corregirText("text1", answText1, 3);
    addSolucionHtml(answText1);

    addCorreccionHtml("PREGUNTA 4", "h4");
    corregirText("text2", answText2, 4);
    addSolucionHtml(answText2);

    addCorreccionHtml("PREGUNTA 5", "h4");
    corregirCheckbox("checkcheckBoxDiv1", answCheck1, 5);
    addSolucionHtml(answCheck1);

    addCorreccionHtml("PREGUNTA 6", "h4");
    corregirCheckbox("checkcheckBoxDiv2", answCheck2, 6);
    addSolucionHtml(answCheck2);

    addCorreccionHtml("PREGUNTA 7", "h4");
    corregirSelect("sel1", answSelect1, 7);
    addSolucionHtml(answSelect1);

    addCorreccionHtml("PREGUNTA 8", "h4");
    corregirSelect("sel2", answSelect2, 8);
    addSolucionHtml(answSelect2);

    addCorreccionHtml("PREGUNTA 9", "h4");
    corregirMultiple("mult1", answMult1, 9);
    addSolucionHtml(answMult1);

    addCorreccionHtml("PREGUNTA 10", "h4");
    corregirMultiple("mult2", answMult2, 10);
    addSolucionHtml(answMult2);

    window.scrollTo(0, document.body.scrollHeight);
}


function corregirRadio(divID, answer, numPregunta) {
    var f = formElement;
    var rad;
    var fin = false;

    switch (divID) {
        case "radradioDiv1":
            rad = f.radradioDiv1;
            break;
        case "radradioDiv2":
            rad = f.radradioDiv2;
            break;
    }

    for (i = 0; (i < rad.length) && !(fin); i++) {
        if (rad[i].checked) {
            fin = true;
            if (i == answer) {
                addCorreccionHtml(numPregunta + "." + (i) + " --> ¡CORRECTA!", "h5");
                nota += 1;
            } else {
                addCorreccionHtml(numPregunta + "." + (i) + " --> ¡INCORRECTA!", "h5");
            }
        }
    }
}


function corregirText(IDtext, answer, numPregunta) {
    var s = document.getElementById(IDtext).value;
    //Pasamos todo a minisculas para evitar conflictos
    s = s.toLowerCase();

    if (s == answer) {
        addCorreccionHtml(numPregunta + " --> ¡CORRECTA!", "h5");
        nota += 1;
    } else {
        addCorreccionHtml(numPregunta + " --> ¡INCORRECTA!", "h5");
    }
}


function corregirCheckbox(divID, answer, numPregunta) {
    // Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo
    // guarda en un array escorrecta[]
    var f = formElement;
    var escorrecta = [];
    var chk;

    switch (divID) {
        case "checkcheckBoxDiv1":
            chk = f.checkcheckBoxDiv1;
            break;
        case "checkcheckBoxDiv2":
            chk = f.checkcheckBoxDiv2;
            break;
    }

    for (i = 0; i < chk.length; i++) {  //"checkcheckBoxDiv1" es el nombre asignado a todos los checkbox
        if (chk[i].checked) {
            escorrecta[i] = false;
            for (j = 0; j < answer.length; j++) {
                if (i == answer[j]) escorrecta[i] = true;
            }
        }
    }
    //Por cada opción que está chequedada, si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    for (i = 0; i < chk.length; i++) {
        if (chk[i].checked) {
            if (escorrecta[i]) {
                nota += 1.0 / answer.length;  //dividido por el número de respuestas correctas   
                addCorreccionHtml(numPregunta + "." + (i) + " --> ¡CORRECTA!", "h5");
            } else {
                nota -= 1.0 / answer.length;  //dividido por el número de respuestas correctas   
                addCorreccionHtml(numPregunta + "." + (i) + " --> ¡INCORRECTA!", "h5");
            }
        }
    }
}

function corregirMultiple(IDmulti, answer, numPregunta) {
    var f = formElement;
    var escorrecta = [];
    var mult = document.getElementById(IDmulti);

    for (i = 0; i < mult.length; i++) {
        if (mult[i].selected) {
            escorrecta[i] = false;
            for (j = 0; j < answer.length; j++) {
                if (i == answer[j]) escorrecta[i] = true;
            }
        }
    }
    //Por cada opción que está chequedada, si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    for (i = 0; i < mult.length; i++) {
        if (mult[i].selected) {
            if (escorrecta[i]) {
                nota += 1.0 / answer.length;  //dividido por el número de respuestas correctas   
                addCorreccionHtml(numPregunta + "." + (i) + " --> ¡CORRECTA!", "h5");
            } else {
                nota -= 1.0 / answer.length;  //dividido por el número de respuestas correctas   
                addCorreccionHtml(numPregunta + "." + (i) + " --> ¡INCORRECTA!", "h5");
            }
        }
    }
}


function corregirSelect(IDselect, answer, numPregunta) {
    var sel = document.getElementById(IDselect);
    if (sel.selectedIndex - 1 == answer) {
        addCorreccionHtml(numPregunta + "." + (sel.selectedIndex-1) + " --> ¡CORRECTA!", "h5");
        nota += 1;
    } else {
        addCorreccionHtml(numPregunta + "." + (sel.selectedIndex-1) + " --> ¡INCORRECTA!", "h5");
    }
}


function addCorreccionHtml(s, tipoH) {
    var h = document.createElement(tipoH);
    var node = document.createTextNode(s);
    h.appendChild(node);
    document.getElementById("resultados").appendChild(h);
}

function addSolucionHtml(s) {
    var p = document.createElement("p");
    p.innerHTML = ("SOLUCIÓN: " + s);
    document.getElementById("resultados").appendChild(p);
    document.getElementById("resultados").appendChild(document.createElement("hr"));
}




function presentarNota() {
    nota = nota.toFixed(2);
    addCorreccionHtml("Nota: " + nota + " puntos sobre 10", "h2");
    if (nota >= 5) {
        alert("¡ENHORABUENA! HAS APROBADO CON UN " + nota);
    } else {
        alert("LÁSTIMA! HAS SUSPENDIDO CON UN " + nota);
    }
}

function comprobarContestadas() {
    var f = formElement;
    var checked = false;
    var cnt = 0;

    //Empezamos mirando los radio
    for (i = 0; i < f.radradioDiv1.length; i++) {
        if (f.radradioDiv1[i].checked) checked = true;
    }
    if (!checked) {
        alert("¡Contesta la primera pregunta!");
        f.elements[0].focus();
        return false;
    }
    cnt += f.radradioDiv1.length;
    checked = false;

    for (i = 0; i < f.radradioDiv2.length; i++) {
        if (f.radradioDiv2[i].checked) checked = true;
    }
    if (!checked) {
        alert("¡Contesta la segunda pregunta!");
        f.elements[f.radradioDiv1.length].focus();
        return false;
    }
    cnt += f.radradioDiv2.length;
    checked = false;

    //Miramos los text
    if (document.getElementById("text1").value.length == 0) {
        alert("¡Contesta la tercera pregunta!");
        document.getElementById("text1").focus();
        return false;
    }

    if (document.getElementById("text2").value.length == 0) {
        alert("¡Contesta la cuarta pregunta!");
        document.getElementById("text2").focus();
        return false;
    }
    cnt += 2;

    //Miramos los checkbox
    for (i = 0; i < f.checkcheckBoxDiv1.length; i++) {
        if (f.checkcheckBoxDiv1[i].checked) checked = true;
    }
    if (!checked) {
        alert("¡Contesta la quinta pregunta!");
        f.elements[cnt].focus();
        return false;
    }
    cnt += f.checkcheckBoxDiv1.length;
    checked = false;

    for (i = 0; i < f.checkcheckBoxDiv2.length; i++) {
        if (f.checkcheckBoxDiv2[i].checked) checked = true;
    }
    if (!checked) {
        alert("¡Contesta la sexta pregunta!");
        f.elements[cnt].focus();
        return false;
    }
    cnt += f.checkcheckBoxDiv2.length;
    checked = false;

    //Miramos los select simple
    if (document.getElementById("sel1").selectedIndex == 0) {
        alert("¡Contesta la séptima pregunta!");
        document.getElementById("sel1").focus();
        return false;
    }

    if (document.getElementById("sel2").selectedIndex == 0) {
        alert("¡Contesta la octava pregunta!");
        document.getElementById("sel2").focus();
        return false;
    }

    //Miramos los select Mulltiple

    if (document.getElementById("mult1").selectedIndex == -1) {
        alert("¡Contesta la novena pregunta!");
        document.getElementById("mult1").focus();
        return false;
    }
    if (document.getElementById("mult2").selectedIndex == -1) {
        alert("¡Contesta la décima pregunta!");
        document.getElementById("mult2").focus();
        return false;
    }

    return true;
}

