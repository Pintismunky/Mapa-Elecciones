var formatNumber = {
 separador: ".", // separador para los miles
 sepDecimal: ',', // separador para los decimales
 formatear:function (num){
  num +='';
  var splitStr = num.split('.');
  var splitLeft = splitStr[0];
  var splitRight = splitStr.length > 2 ? this.sepDecimal + splitStr[1] : '';
  var regx = /(\d+)(\d{3})/;
  while (regx.test(splitLeft)) {
  splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
  }
  return this.simbol + splitLeft  +splitRight;
 },
 new:function(num, simbol){
  this.simbol = simbol ||'';
  return this.formatear(num);
 }
};

function limpia(){
$("#escrutado").show();
$("#votostotales").hide();
$("#votosprov").show();
$("#volver").show();
$('.datos').show;
$('.general').show();
$('.grafico').show();
$("#tooltip").hide();
}

$(document).ready(function() {
  $.getJSON( "js/datosprov.json" ,function(json){
    info=json
  }).done(function(){

    limpia();
    clickCongreso('espana');
    datosBarrasespana();
    datosBarrasespana2();

    $(".provincias").on('click', function () {
        limpia();
        clickProvincia(this.id);
        datosBarrasprov(this.id);
        datosBarrasprov2(this.id);
    });

    $("#volver").click(function(){
    	limpia();
    clickCongreso('espana');
    datosBarrasespana();
    datosBarrasespana2();
    $('#provincia').text('Congreso de los Diputados');
    $("#escrutado").show();
    $('.escanos').text('350');
    $("#votosprov").hide();
    $("#votostotales").show();
    $("#volver").hide();
                });
    colorAuto();
  })

         });
