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
 formElement=document.getElementById("butCorregir");
  formElement.onclick=function(){
   inicializar();
   
    corregir();
    presentarNota();

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
  var nopciones;
  var inpt;
  document.getElementById('q_01').innerHTML=xmlDoc.getElementsByTagName("title")[4].innerHTML;
  answRadio1 = xmlDoc.getElementById("q_01").getElementsByTagName("answer")[0].innerHTML;/*Guardamos respuesta/s correctas para comprobación posterior.*/
  select=document.getElementById("q1");
  nopciones = xmlDoc.getElementById("q_01").getElementsByTagName("option").length;
  for (i = 0; i < nopciones; i++)
  { 
    inpt = document.createElement("input");
    inpt.type = xmlDoc.getElementsByTagName("type")[4].innerHTML;
    inpt.value=i+1;
    inpt.name=inpt.type;
    select.appendChild(inpt);
    select.innerHTML += xmlDoc.getElementById("q_01").getElementsByTagName("option")[i].innerHTML;
    select.innerHTML+="<br/>";
  } 
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


//****************************************************************************************************
//implementación de la corrección



//****************************************************************************************************
// poner los datos recibios en el HTML


//****************************************************************************************************
//Gestionar la presentación de las respuestas

function inicializar(){
   document.getElementById('resultadosDiv').innerHTML = "";
   nota=0.0;
}


function corregirText(qn,n,ans){
  var s = document.getElementById(qn).getElementsByTagName("input")[0].value;
  if (s.toUpperCase()==ans.toUpperCase())
  {
    darRespuestaHtml("Nº "+n+": <b>Correcto!</b>");
    nota +=1;
  }
  else
  {
    if (s.toUpperCase()!=ans.toUpperCase())
    {
      darRespuestaHtml("Nº "+n+": <b>Respuesta incorrecta</b>");
    }
    else
    {
      darRespuestaHtml("Nº "+n+": <b>Respuesta incorrecta</b>");
    }
  }
}


function corregirSelect(qn,n,ans){
  var sel = document.getElementById(qn);  
  if (sel.selectedIndex==ans)
  {
    darRespuestaHtml("Nº "+n+": <b>Correcto!</b>");
    nota +=1;
  }
  else {darRespuestaHtml("Nº "+n+": <b>Respuesta incorrecta</b>");}
}



function corregirMulti(qn,n,ans){
  var v=[];
  var corr=0;
  var opt = document.getElementById(qn).getElementsByTagName("option");

  for (i = 0; i < opt.length; i++)
  {
    if(opt[i].selected) 
    {
      v[i]=false;
      for (j = 0; j < ans.length; j++) 
      {
        if(i==ans[j]) {v[i]=true;}
      }
    }
  }
  for (i = 0; i < opt.length; i++) 
  {   
    if (opt[i].selected) 
    {
      if (v[i]) {nota +=1.0/ans.length; corr++;} /*dividido por el número de respuestas correctas*/   
      else {nota -=1.0/ans.length; corr--;} /*dividido por el número de respuestas correctas*/
    }
  }
  if (corr==ans.length) {darRespuestaHtml("Nº "+n+": <b>Correcto!</b>");}
  else {darRespuestaHtml("Nº "+n+": <b>Respuesta incorrecta</b>");}
}


function corregirCheckbox(qn,n,ans){
  var v=[];
  var corr=0;
  var opt = document.getElementById(qn).elements["checkbox"];

  for (i = 0; i < opt.length; i++)
  {
    if(opt[i].checked) 
    {
      v[i]=false;
      for (j = 0; j < ans.length; j++) 
      {
        if(i==ans[j]) {v[i]=true;}
      }
    }
  }

  for (i = 0; i < opt.length; i++) 
  {   
    if (opt[i].checked) 
    {
      if (v[i]) {nota +=1.0/abs.length; corr++;} /*dividido por el número de respuestas correctas*/     
      else {nota -=1.0/abs.length; corr--;} /*dividido por el número de respuestas correctas*/   
    }
  }
  if (corr==abs.length) {darRespuestaHtml("Nº "+n+": <b>Correcto!</b>");}
  else {darRespuestaHtml("Nº "+n+": <b>Respuesta incorrecta</b>");}
}


function corregirRadio(divID, answer, n) {
    var f = formElement;
    var rad;
    var fin = false;
    rad = f.radradioDiv1;

    for (i = 0; (i < rad.length) && !(fin); i++) {
        if (rad[i].checked) {
            fin = true;
            if (i == answer) {
                darRespuestaHtml("Nº "+n+": <b>Correcto!</b>");
                nota += 1;
            } else {
                darRespuestaHtml("Nº "+n+": <b>Correcto!</b>");
            }
        }
    }
}


function darRespuestaHtml(r){
  var p = document.createElement("p");
  p.innerHTML = (r);
  document.getElementById("resultadosDiv").appendChild(p);
}
/*Muestra el resultado de la nota final del ejercicio.*/

function presentarNota(){
  darRespuestaHtml("<b>Nota: "+nota+"</b> punto/s sobre 10");
}

function corregir(){
    corregirRadio("radradioDiv1", answRadio1, 1);
    corregirRadio("radradioDiv2", answRadio2, 2);
    corregirText(q3,3,answText1);
    corregirText(q4,4,answText2);
    corregirCheckbox(q5,5,answCheck1);
    corregirCheckbox(q6,6,answCheck2);
    corregirSelect(q7,7,answSelect1);
    corregirSelect(q8,8,answSelect2);
    corregirMulti(q9,9,answMult1);
    corregirMulti(q10,10,answMult2);
}