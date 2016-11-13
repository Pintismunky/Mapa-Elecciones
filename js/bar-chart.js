function datosBarrasprov(region){
	$.each(info,function(i) {

if (info[i].label==region.toLowerCase()){
 ccaa= info[i].data.ccaa
 prov = info[i].data.provincia
}

	});

	urlXML = "xml-provincias.php?ccaa="+ccaa+"&anio="+'2016'+"&provincia="+prov;
	$.ajax({
	type: "GET",
	url: urlXML,
	dataType: "xml",
	success: function(xml){
		var datosRegion = [];
				i=0;
				var partidos = [];
				var votos = [];
				var votos2 = [];
				var electos = [];
				$(xml).find('partido').each(function(){
					var sTitle = $(this).find('nombre').text();
					var sPublisher = $(this).find('electos').text();
					var sVotos = $(this).find('votos_numero').text();
					var sVotos2 = $(this).find('votos_porciento').text();
					sPublisher = parseInt(sPublisher);
					if(i<10){

						if(sTitle == "CatSí­queesPot"){sTitle = "CSqeP";}
						if(sTitle == "ERC - RI.cat / ESQUERRA"){sTitle = "ERC";}
						if(sTitle == "ERC-RI.cat"){sTitle = "ERC";}
						if(sTitle == "CatSíqueesPot"){sTitle = "CSqeP";}
						if(sTitle == "PODEMOS-IU-EQUO"){sTitle = "Unidos Podemos";}
						if(sTitle == "IU-EQUO-SEGOVIEMOS"){sTitle = "Unidos Podemos";}
						if(sTitle == "PODEMOS-IU-EQUO-BATZARRE"){sTitle = "Unidos Podemos";}
						if(sTitle == "IU-VERDES-SIEX: La Izquierda Plural"){sTitle = "IU-SIEX";}
						if(sTitle == "PSE-EE (PSOE)"){sTitle = "PSOE";}
						if(sTitle == "IU-V-SIEX: LA IZQUIERDA PLURAL"){sTitle = "IU-SIEX";}
						if(sTitle == "SSP-SxTF-EQUO"){sTitle = "EQUO";}

						$("<li></li>").html(sTitle + ", " + sPublisher+" , "+sVotos+" , "+sVotos2+" , "+recuperaColores(sTitle)).appendTo("#dvContent ul");
						//dataStructure.push({"itemLabel":sTitle,"votos": sPublisher,"itemValue":sPublisher});
						partidos[i] = sTitle;
						votos[i] = parseInt(sVotos);
						votos2[i] = parseInt(sVotos2);
						electos[i] = sPublisher;
						//"votos": sVotos,"itemValue":sPublisher, "colores": recuperaColores(sTitle)};
						i=i+1;
					}
					total=i;
				});

		datosRegion = {"labels": partidos, "series":[{"electos":electos, "values":votos, "porciento":votos2}]};

		graficoBarras(datosRegion);
		//console.log(datosRegion);
	}
	});
}


function datosBarrasespana(){

	var data;
			anio = "2011";
			urlXML = "xml-totalesEspana.php?&anio="+anio;
			$.ajax({
			type: "GET",
			url: urlXML,
			dataType: "xml",
			success: function(xml){

				var datosRegion = [];
				i=0;
				var partidos = [];
				var votos = [];
				var votos2 = [];
				var electos = [];
				$(xml).find('partido').each(function(){
					var sTitle = $(this).find('nombre').text();
					var sPublisher = $(this).find('electos').text();
					var sVotos = $(this).find('votos_numero').text();
					var sVotos2 = $(this).find('votos_porciento').text();
					sPublisher = parseInt(sPublisher);
					if(i<10){
						//console.log(sTitle);
						if(sTitle == "CatSíqueesPot"){sTitle = "CSqeP";}
						if(sTitle == "RC - RI.cat / ESQUERRA"){sTitle = "RC - RI.cat";}
						$("<li></li>").html(sTitle + ", " + sPublisher+" , "+sVotos+" , "+sVotos2+" , "+recuperaColores(sTitle)).appendTo("#dvContent ul");
						//dataStructure.push({"itemLabel":sTitle,"votos": sPublisher,"itemValue":sPublisher});
						partidos[i] = sTitle;
						votos[i] = parseInt(sVotos);
						votos2[i] = parseInt(sVotos2);
						electos[i] = sPublisher;
						//"votos": sVotos,"itemValue":sPublisher, "colores": recuperaColores(sTitle)};
						i=i+1;
					}
					total=i;
				});

				datosRegion = {"labels": partidos, "series":[{"electos":electos, "values":votos, "porciento":votos2}]};

				graficoBarras(datosRegion);

		}
	});
}

function graficoBarras (data){


$(".chart").replaceWith("<svg class=chart> </svg>");

var colores = [];

for(i=0;i<data.labels.length;i++){
	colores[i] = recuperaColores(data.labels[i]);
}
//console.log(data);
//console.log(data.series[0].electos[0]);

var chartWidth       = 200,
    barHeight        = 9,
    groupHeight      = barHeight * data.series.length,
    //groupHeight      = barHeight * 6,
    gapBetweenGroups = 10,
    spaceForLabels   = 150,
    spaceForLegend   = 150;


// Zip the series data together (first values, second values, etc.)
var zippedData = [];
for (var i=0; i<data.labels.length; i++) {
  for (var j=0; j<data.series.length; j++) {
    zippedData.push(data.series[j].values[i]);
  }
}

// Color scale
var color = d3.scale.ordinal()
 //.range(["#0AB1FE", "#EC0900", "#9FD400", "#663366","#cc6633","#EF0092"]);
 .range(colores);


var chartHeight = barHeight * zippedData.length + gapBetweenGroups * data.labels.length;

var x = d3.scale.linear()
    .domain([0, d3.max(zippedData)])
    .range([0, 100]);

var y = d3.scale.linear()
    .range([chartHeight + gapBetweenGroups, 0]);

var yAxis = d3.svg.axis()
    .scale(y)
    .tickFormat('')
    .tickSize(0)
    .orient("left");

// Specify the chart area and dimensions
var chart = d3.select(".chart")
    .attr("width", spaceForLabels + chartWidth + spaceForLegend)
    .attr("height", "190");

// Create bars
var bar = chart.selectAll("g")
    .data(zippedData)
    .enter().append("g")
    .attr("transform", function(d, i) {
      return "translate(" + spaceForLabels + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/data.series.length))) + ")";
    });

// Create rectangles of the correct width

bar.append("rect")
      .attr("fill", "#d5d1d1")
      .attr("class", "bar")
      .attr("width", "118")
      .attr("height", barHeight - 1)
      .attr("class", "legendBar")

bar.append("rect")
.transition()
    .delay(function (d, i) { return i*100; })
    .attr("fill", function(d,i) { return color(i); })
    .attr("class", "bar")
    .attr("width", x)
    .attr("height", barHeight - 1)

// Texto Escaños
bar.append("text")
    .attr("class", "label")
    .attr("x", function(d) { return 150; })
    .attr("y", barHeight / 3)
    .attr("dy", ".35em")
    .text(function(d,i) {
     return data.series[0].electos[i]; });

// Texto Votos
bar.append("text")
    .attr("x", function(d) { return 305; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return formatNumber.new(d); });


// Texto Porcentaje
bar.append("text")
     .attr("class", "label2")
    .attr("x", function(d) { return 200; })
    .attr("y", barHeight / 4)
    .attr("dy", ".35em")
    .text(function(d,i) {
     return data.series[0].porciento[i]; });

// Draw labels
bar.append("text")
    .attr("x", function(d) { return - 10; })
    .attr("y", groupHeight / 2)
    .attr("dy", ".35em")
    .text(function(d,i) {
      if (i % data.series.length === 0)
        return data.labels[Math.floor(i/data.series.length)];
      else
        return "";});
}



/////////////////////////////////////////////////////////////////////////////

function datosBarrasprov2(region){
	$.each(info,function(i) {

if (info[i].label==region.toLowerCase()){
 ccaa= info[i].data.ccaa
 prov = info[i].data.provincia
}

	});

	//http://resultados.elpais.com/elecciones/2016/municipales/index.xml2

	urlXML = "xml-provincias.php?ccaa="+ccaa+"&anio="+'2015'+"&provincia="+prov;
	$.ajax({
	type: "GET",
	url: urlXML,
	dataType: "xml",
	success: function(xml){
		var datosRegion = [];
				i=0;
				var partidos = [];
				var votos = [];
				var votos2 = [];
				var electos = [];
				$(xml).find('partido').each(function(){
					var sTitle = $(this).find('nombre').text();
					var sPublisher = $(this).find('electos').text();
					var sVotos = $(this).find('votos_numero').text();
					var sVotos2 = $(this).find('votos_porciento').text();
					sPublisher = parseInt(sPublisher);
					if(i<4){

						if(sTitle == "CatSí­queesPot"){sTitle = "CSqeP";}
						if(sTitle == "ERC - RI.cat / ESQUERRA"){sTitle = "ERC";}
						if(sTitle == "ERC-RI.cat"){sTitle = "ERC";}
						if(sTitle == "CatSíqueesPot"){sTitle = "CSqeP";}
						if(sTitle == "IU-VERDES-SIEX: La Izquierda Plural"){sTitle = "IU-SIEX";}
						if(sTitle == "PSE-EE (PSOE)"){sTitle = "PSOE";}
						if(sTitle == "IU-V-SIEX: LA IZQUIERDA PLURAL"){sTitle = "IU-SIEX";}
						if(sTitle == "SSP-SxTF-EQUO"){sTitle = "EQUO";}

						$("<li></li>").html(sTitle + ", " + sPublisher+" , "+sVotos+" , "+sVotos2+" , "+recuperaColores(sTitle)).appendTo("#dvContent ul");
						//dataStructure.push({"itemLabel":sTitle,"votos": sPublisher,"itemValue":sPublisher});
						partidos[i] = sTitle;
						votos[i] = parseInt(sVotos);
						votos2[i] = parseInt(sVotos2);
						electos[i] = sPublisher;
						//"votos": sVotos,"itemValue":sPublisher, "colores": recuperaColores(sTitle)};
						i=i+1;
					}
					total=i;
				});

		datosRegion = {"labels": partidos, "series":[{"electos":electos, "values":votos, "porciento":votos2}]};

		graficoBarras2(datosRegion);
	}
	});
}


function datosBarrasespana2(){
	var data;
			anio = "2011";
			urlXML = "xml-totalesEspana.php?&anio="+anio;
			$.ajax({
			type: "GET",
			url: urlXML,
			dataType: "xml",
			success: function(xml){

				var datosRegion = [];
				i=0;
				var partidos = [];
				var votos = [];
				var votos2 = [];
				var electos = [];
				$(xml).find('partido').each(function(){
					var sTitle = $(this).find('nombre').text();
					var sPublisher = $(this).find('electos').text();
					var sVotos = $(this).find('votos_numero').text();
					var sVotos2 = $(this).find('votos_porciento').text();
					sPublisher = parseInt(sPublisher);
					if(i<4){
						//console.log(sTitle);
						if(sTitle == "CatSíqueesPot"){sTitle = "CSqeP";}
                        if(sTitle == "RC - RI.cat / ESQUERRA"){sTitle = "RC - RI.cat";}
						$("<li></li>").html(sTitle + ", " + sPublisher+" , "+sVotos+" , "+sVotos2+" , "+recuperaColores(sTitle)).appendTo("#dvContent ul");
						//dataStructure.push({"itemLabel":sTitle,"votos": sPublisher,"itemValue":sPublisher});
						partidos[i] = sTitle;
						votos[i] = parseInt(sVotos);
						votos2[i] = parseInt(sVotos2);
						electos[i] = sPublisher;
						//"votos": sVotos,"itemValue":sPublisher, "colores": recuperaColores(sTitle)};
						i=i+1;
					}
					total=i;
				});

				datosRegion = {"labels": partidos, "series":[{"electos":electos, "values":votos, "porciento":votos2}]};

				graficoBarras2(datosRegion);

		}
	});

}

function graficoBarras2 (data){

$(".chart2").replaceWith("<svg class=chart2> </svg>");

var colores = [];

for(i=0;i<data.labels.length;i++){
	colores[i] = recuperaColores(data.labels[i]);
}

//console.log(data);
//console.log(data.series[0].electos[0]);

var chartWidth       = 200,
    barHeight        = 9,
    groupHeight      = barHeight * data.series.length,
    //groupHeight      = barHeight * 6,
    gapBetweenGroups = 10,
    spaceForLabels   = 150,
    spaceForLegend   = 150;


// Zip the series data together (first values, second values, etc.)
var zippedData = [];
for (var i=0; i<data.labels.length; i++) {
  for (var j=0; j<data.series.length; j++) {
    zippedData.push(data.series[j].values[i]);
  }
}


// Color scale
var color = d3.scale.ordinal()
 //.range(["#0AB1FE", "#EC0900", "#9FD400", "#663366","#cc6633","#EF0092"]);
 .range(colores);


var chartHeight = barHeight * zippedData.length + gapBetweenGroups * data.labels.length;

var x = d3.scale.linear()
    .domain([0, d3.max(zippedData)])
    .range([0, 100]);

var y = d3.scale.linear()
    .range([chartHeight + gapBetweenGroups, 0]);

var yAxis = d3.svg.axis()
    .scale(y)
    .tickFormat('')
    .tickSize(0)
    .orient("left");


// Specify the chart area and dimensions
var chart = d3.select(".chart2")
    .attr("width", spaceForLabels + chartWidth + spaceForLegend)
    .attr("height", chartHeight);

// Create bars
var bar = chart.selectAll("g")
    .data(zippedData)
    .enter().append("g")
    .attr("transform", function(d, i) {
      return "translate(" + spaceForLabels + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/data.series.length))) + ")";
    });


//Barra fondo
bar.append("rect")
      .attr("fill", "#d5d1d1")
      .attr("class", "bar")
      .attr("width", "118")
      .attr("height", barHeight - 1)
      .attr("class", "legendBar")

//Barra datos
bar.append("rect")
    .transition()
    .duration(200)
    .delay(function (d, i) {return i * 100;})
    .attr("fill", function(d,i) { return color(i); })
    .attr("class", "bar")
    .attr("width", x)
    .attr("height", barHeight - 1)

// Texto Escaños
bar.append("text")
    .attr("class", "label")
    .attr("x", function(d) { return 150; })
    .attr("y", barHeight / 3)
    .attr("dy", ".35em")
    .text(function(d,i) {
     return data.series[0].electos[i]; });

// Texto Votos
bar.append("text")
    .attr("x", function(d) { return 305; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return formatNumber.new(d); });


// Texto Porcentaje
bar.append("text")
     .attr("class", "label2")
    .attr("x", function(d) { return 200; })
    .attr("y", barHeight / 4)
    .attr("dy", ".35em")
    .text(function(d,i) {
     return data.series[0].porciento[i]; });

// Draw labels
bar.append("text")
    .attr("x", function(d) { return - 10; })
    .attr("y", groupHeight / 2)
    .attr("dy", ".35em")
    .text(function(d,i) {
      if (i % data.series.length === 0)
        return data.labels[Math.floor(i/data.series.length)];
      else
        return "";});
}
