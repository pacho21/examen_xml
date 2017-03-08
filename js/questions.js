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
    corregirRadio1();
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
function gestionarXml(contXml){
  var xmlDoc = contXml.responseXML;
  var inpt = document.createElement("input");
  /*radio1*/
/*Pregunta tipo 'radio' nº 1.*/
  document.getElementById('q01').innerHTML=xmlDoc.getElementsByTagName("title")[0].innerHTML;
  res_rad_1 = xmlDoc.getElementById("q01").getElementsByTagName("answer")[0].innerHTML;/*Guardamos respuesta/s correctas para comprobación posterior.*/
  select=document.getElementById("in_1");
  nopciones = xmlDoc.getElementById("q01").getElementsByTagName("option").length;
  for (i = 0; i < nopciones; i++)
  { 
    inpt = document.createElement("input");
    inpt.type = xmlDoc.getElementsByTagName("type")[0].innerHTML;
    inpt.value=i+1;
    inpt.name=inpt.type;
    select.appendChild(inpt);
    select.innerHTML += xmlDoc.getElementById("q01").getElementsByTagName("option")[i].innerHTML;
    select.innerHTML+="<br/>";
  } 
  
  /*radio2*/
   document.getElementById('q02').innerHTML=xmlDoc.getElementsByTagName("title")[1].innerHTML;
  res_rad_1 = xmlDoc.getElementById("q02").getElementsByTagName("answer")[0].innerHTML;/*Guardamos respuesta/s correctas para comprobación posterior.*/
  select=document.getElementById("in_2");
  nopciones = xmlDoc.getElementById("q02").getElementsByTagName("option").length;
  for (i = 0; i < nopciones; i++)
  { 
    inpt = document.createElement("input");
    inpt.type = xmlDoc.getElementsByTagName("type")[1].innerHTML;
    inpt.value=i+1;
    inpt.name=inpt.type;
    select.appendChild(inpt);
    select.innerHTML += xmlDoc.getElementById("q01").getElementsByTagName("option")[i].innerHTML;
    select.innerHTML+="<br/>";
  }  
}

function corregirRadio1()
{
  var r=null;
  var opt = document.getElementById("in_1").elements["radio"];
  for (i = 0; i < opt.length; i++)
  {
    if(opt[i].checked) {r=i;}
  }
  if(r==res_rad_1) {alert("Nº 1: <b>Correcto!</b>"); nota +=1;}
  else {alert("Nº 1: <b>Respuesta incorrecta</b>");}
}

function inicializar(){
  var v=document.getElementById("resultadosDiv");
  v.innerHTML="";
  nota=0.0;
}