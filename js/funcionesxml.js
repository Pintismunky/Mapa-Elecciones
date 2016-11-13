
function clickProvincia(ccaa){

	tipo = "PROVINCIAS";

  cargaDatosXML(ccaa, tipo);

}

function clickCongreso(ccaa){

	tipo = "congreso";

	cargaDatosXML(ccaa, tipo);

  limpia();
	$('#provincia').text('Congreso de los Diputados');
	$("#escrutado").show();
	$('.escanos').text('350');
	$(".estadisticas").hide();
	$("#votosprov").hide();
	$("#votostotales").show();
	$("#volver").hide();
}
	function cargaDatosXML(region, tipo){

	$.each(info,function(i) {
     if (info[i].label==region.toLowerCase()){
       ccaa= info[i].data.ccaa
       prov = info[i].data.provincia
       $('#provincia').text(info[i].data.nombre);
       $('.escanos').text(info[i].data.escanos);
     }
  });

		anio = 2015;
		anio2 = 2016;

		var nombrados = "diputados";

		if(tipo == "CCAA"){
			urlXML = "xml-ccaa.php?ccaa="+ccaa+"&anio="+anio;
			urlPRUEBA2015 = "xml-ccaa.php?ccaa="+ccaa+"&anio="+anio2;
		}
		else if(tipo == "PROVINCIAS"){
			urlXML = "xml-provincias.php?ccaa="+ccaa+"&anio="+anio+"&provincia="+prov;
			urlPRUEBA2015 = "xml-provincias.php?ccaa="+ccaa+"&anio="+anio2+"&provincia="+prov;
		}
		else if(tipo == "congreso"){
			urlXML = "xml-totalesEspana.php?&anio="+anio;
			urlPRUEBA2015 = 'http://resultados.elpais.com/elecciones/2015/generales/congreso/index.xml2';
			urlVOTOS = "xml-totalesEspana.php?&anio="+anio;
		}
		else{
			urlXML = "xml-ccaa.php?ccaa="+ccaa+"&anio="+anio;
			urlPRUEBA2015 = "xml-ccaa.php?ccaa"+ccaa+"&anio="+anio2;
		}

		var datosRegion=[];


		//PRIMER AÑO

		$.ajax({
				    type: "GET",
				   	url: urlVOTOS,
				    dataType: "xml",
				    success: function(xml){

						$(xml).find('contabilizados').each(function(){
						var sTotales = $(this).find('cantidad').text();
                        $("#votostotales").text(formatNumber.new(sTotales)) ;
						});

					}
					})
				$.ajax({
				    type: "GET",
				   	url: urlPRUEBA2015,
				    dataType: "xml",
				    success: function(xml){

						$(xml).find('contabilizados').each(function(){
						var sTotales = $(this).find('cantidad').text();
                        $("#votosprov").text(formatNumber.new(sTotales)) ;
						});

					}
					})

		$.ajax({
		    type: "GET",
		    url: urlXML,
		    dataType: "xml",
		    success: function(xml){
				i=0;
				var dataStructure = [];
				var data = [];
				$(xml).find('partido').each(function(){
					var sTitle = $(this).find('nombre').text();
					var sPublisher = $(this).find('electos').text();
					var sVotos = $(this).find('votos_numero').text();
					sPublisher = parseInt(sPublisher);
					if(sPublisher>0){
						if(sTitle == "CatSí­queesPot"){sTitle = "CSqeP";}
						if(sTitle == "ERC - RI.cat / ESQUERRA"){sTitle = "ERC";}
						if(sTitle == "ERC-RI.cat"){sTitle = "ERC";}
						if(sTitle == "PODEMOS-IU-EQUO"){sTitle = "Unidos Podemos";}
						if(sTitle == "IU-EQUO-SEGOVIEMOS"){sTitle = "Unidos Podemos";}
						if(sTitle == "PODEMOS-IU-EQUO-BATZARRE"){sTitle = "Unidos Podemos";}
						if(sTitle == "CatSíqueesPot"){sTitle = "CSqeP";}
						if(sTitle == "IU-VERDES-SIEX: La Izquierda Plural"){sTitle = "IU-SIEX";}
						if(sTitle == "PSE-EE (PSOE)"){sTitle = "PSOE";}
						if(sTitle == "IU-V-SIEX: LA IZQUIERDA PLURAL"){sTitle = "IU-SIEX";}
						if(sTitle == "SSP-SxTF-EQUO"){sTitle = "EQUO";}
						$("<li></li>").html(sTitle + ", " + sPublisher+" , "+sVotos+" , "+recuperaColores(sTitle)).appendTo("#dvContent ul");
						data[i] = {"itemLabel":sTitle,"votos": sVotos,"itemValue":sPublisher, "colores": recuperaColores(sTitle)};
						i=i+1;
					}
					total=i;
				});

				datosRegion[1] = {"data":data, "label":anio};
				}
		  }).done(function(){

		  		//SEGUNDO AÑO

				data = "";

				$.ajax({
				    type: "GET",
				   	url: urlPRUEBA2015,
				    dataType: "xml",
				    success: function(xml){

						$(xml).find('escrutinio_sitio').each(function(){
							var sEscrutado = $(this).find('porciento_escrutado').text();
							var sSitio = $(this).find('nombre_sitio').text();
							$("#escrutado").text(sEscrutado + " %");
						});

                        $(xml).find('contabilizados').each(function(){
							var sParticipacion = $(this).find('porcentaje').text();
                        $("#participacion").text(sParticipacion + " %");
						});

						i=0;
						var dataStructure = [];
						var data = [];
						$(xml).find('partido').each(function(){
							var sTitle = $(this).find('nombre').text();
							var sPublisher = $(this).find('electos').text();
							var sVotos = $(this).find('votos_numero').text();
							sPublisher = parseInt(sPublisher);
							if(sPublisher>0){
							if(sTitle == "PODEMOS-IU-EQUO"){sTitle = "Unidos Podemos";}
						if(sTitle == "IU-EQUO-SEGOVIEMOS"){sTitle = "Unidos Podemos";}
						if(sTitle == "PODEMOS-IU-EQUO-BATZARRE"){sTitle = "Unidos Podemos";}
						if(sTitle == "CatSí­queesPot"){sTitle = "CSqeP";}
						if(sTitle == "ERC - RI.cat / ESQUERRA"){sTitle = "ERC";}
						if(sTitle == "ERC-RI.cat"){sTitle = "ERC";}
						if(sTitle == "CatSíqueesPot"){sTitle = "CSqeP";}
						if(sTitle == "IU-VERDES-SIEX: La Izquierda Plural"){sTitle = "IU-SIEX";}
						if(sTitle == "PSE-EE (PSOE)"){sTitle = "PSOE";}
						if(sTitle == "IU-V-SIEX: LA IZQUIERDA PLURAL"){sTitle = "IU-SIEX";}
						if(sTitle == "SSP-SxTF-EQUO"){sTitle = "EQUO";}
								$("<li></li>").html(sTitle + ", " + sPublisher+" , "+sVotos+" , "+recuperaColores(sTitle)).appendTo("#dvContent ul");
								data[i] = {"itemLabel":sTitle,"votos": sVotos,"itemValue":sPublisher, "colores": recuperaColores(sTitle)};
								i=i+1;
							}
							total=i;
						});

						datosRegion[0] = {"data":data, "label":anio2, "provincia":prov};

					}
					})
					//TOTALES//
					.done(function(){
						$("#pie-chart").empty();
						$("#pie-chart2").empty();
						pintaGrafico(datosRegion, nombrados);
						pintaGrafico2(datosRegion, nombrados);
					});
	});

	}


	function colorCambio(dataStructure){

			$(info).each(function(x){
				if(info[x].data.provincia==prov){
					if (info[x].data.color!=dataStructure[0].data[0].colores){
						info[x].data.color = dataStructure[0].data[0].colores;
					}
			 }
		  }).promise().done(function(){
				$.ajax({
					type: "POST",
					url: "json-info.php",
					data: "datosjson=" + JSON.stringify(info),
					success: function(datico){
					}
			})
		})
colorAuto();
	}


	function colorAuto(){
			$('.provincias').each(function(i) {
					id = this.id
						$(info).each(function(x){
							if(id==info[x].label){
					    $("#"+id).css('fill', info[x].data.color)
			        }
			     });
      });
	}
