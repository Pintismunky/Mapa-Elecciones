	var idsNoticias = [
		/*{
			serie:"JUNTS PEL SI",
			dataIndex:02,
			idNoticia:68053,
			idSeccion:"economia-y-finanzas/"
		},
		{
			serie:"CATALUNYA SÍ QUE POT",
			dataIndex:2,
			idNoticia:68128,
			idSeccion:"economia-y-finanzas/"
		}*/
	]; 

	$(function() {

			var data = [ {
			label: "PP",
			data: [[1982,26.15],[1986,25.66],[1989,25.42],[1993,34.55],[1996,38.63],[2000,44.52],[2004,37.42],[2008,39.78],[2011,44.62]],
			points: { radius: 4, fillColor: '#0BB2FF' },
			color: [ "#0BB2FF"]
		},
		{
			label: "PSOE",
			data: [[1977,28.88],[1979,30.23],[1982,48.11],[1986,44.03],[1989,39.57],[1993,38.73],[1996,37.54],[2000,34.11],[2004,42.49],[2008,43.75],[2011,28.73]],
			points: { radius: 4, fillColor: '#E3001B' },
			color: [ "#E3001B"]
		},
		{
			label: "IU",
			data: [[1977,9.3],[1979,10.7],[1982,4.0],[1986,4.6],[1989,9.0],[1993,9.5],[1996,10.5],[2000,5.4],[2004,4.9],[2008,3.7],[2011,6.9]],
			points: { radius: 4, fillColor: '#33A037' },
			color: [ "#33A037"]
		},
		{
			label: "CIU",
			data: [[1977,0.9],[1979,2.7],[1982,3.6],[1986,5.0],[1989,5.0],[1993,4.9],[1996,4.6],[2000,4.2],[2004,3.2],[2008,3.0],[2011,3.1]],
			points: { radius: 4, fillColor: '#001D59' },
			color: [ "#001D59"]
		},
		{
			label: "ERC",
			data: [[1977,0.8],[1979,0.7],[1982,0.6],[1986,0.4],[1989,0.4],[1993,0.8],[1996,0.6],[2000,0.8],[2004,2.5],[2008,1.1],[2011,1.0]],
			points: { radius: 4, fillColor: '#FFB333' },
			color: [ "#FFB333"]
		},
		{
			label: "EAJ-PNV",
			data: [[1977,1.62],[1979,1.53],[1982,1.8],[1986,1.51],[1989,1.2],[1993,1.2],[1996,1.2],[2000,1.5],[2004,1.6],[2008,1.2],[2011,1.3]],
			points: { radius: 4, fillColor: '#256231' },
			color: [ "#256231"]
		},
		{
			label: "CC",
			data: [[1986,0.3],[1989,0.3],[1993,0.9],[1996,0.9],[2000,1.0],[2004,0.9],[2008,0.7],[2011,0.6]],
			points: { radius: 4, fillColor: '#FFFF01' },
			color: [ "#FFFF01"]
		},{
			label: "BNG",
			data: [[1979,0.3],[1993,0.5],[1996,0.9],[2000,1.3],[2004,0.8],[2008,0.8],[2011,0.7]],
			points: { radius: 4, fillColor: '#B0CDDF' },
			color: [ "#B0CDDF"]
		},{
			label: "UPYD",
			data: [[2008,1.2],[2011,4.7]],
			points: { radius: 4, fillColor: '#E1007A' },
			color: [ "#E1007A"]
		},{
			label: "UCD",
			data: [[1977,34.44],[1979,31.67],[1982,2.43]],
			points: { radius: 4, fillColor: '#FF6714' },
			color: [ "#FF6714"]
		}
 
		];

		
///////////////OPCIONES/////////////////
		
		var options = {
			series: {
				lines: {
				show: true,
				size: 11
				},
				points: {
				show: true
				}
			},
			legend: {
				noColumns: 10,
				position: "sw",
				margin: [-10, -45]
			},
			
			grid: {
			    hoverable: true,
			    clickable: true,
			    color: "#838383"
			},
			
			xaxis: {
			ticks: [1977, 1979, 1982,1986,1989,1993,1996,2000,2004,2008,2011],
			tickColor: "#fff"
			},
			yaxis: {
				min: 0,
				tickSize: 10,
				
			}
			
		};
///////////////OPCIONES/////////////////
	


$.plot($('#placeholder'), data, options);

//////////////////////////////TOOLTIP CON COLORES//////////////////////////////		
		
		function showTooltip(x, y, contents) {
        $('<div id="tooltip">' + contents + '</div>').css({
            position: 'absolute',
            display: 'none',
			color: "black",
            top: y - 80,
            left: x - 110,
            border: '3px solid white',
            padding: '2px',
            'background-color': "white",
            opacity: '1'
     }).appendTo("body").show();
     };
//////////////////////////////TOOLTIP CON COLORES//////////////////////////////										
				
//////////////////////////////CLICK////////

     $(function () {
		 

     var previousPoint = null;                    
     $("#placeholder").bind("plotclick", function (event, pos, item) {
                             if (item) {
                                 if (previousPoint != item.datapoint) {
                                     previousPoint = item.datapoint;
                                     $("#tooltip").remove();
                                     var x = item.datapoint[0];
                                     var y = item.datapoint[1].toFixed(2);
									 var date = (new Date(x));
                                    /*  var anyo = date.getFullYear();
									 var dia = date.getDate();
                                     var mes = date.getMonth() + 1;
                                     var fecha =dia + "-" + mes + "-" + anyo; */
									 var fecha =x;
									 
									 
									 
                                     var noticiaEncotrado = false;
                                     for (var i = 0; i < idsNoticias.length; i++) {
                                     	if (idsNoticias[i].serie == item.series.label && idsNoticias[i].dataIndex == item.dataIndex) {
                                     		showTooltip(item.pageX, item.pageY, item.series.label + " "+  " /"+ fecha + " <br/>" +  " "+ "Porcentaje:"  +  " "+ y +"%" +
                                     			"<br/><a href ='http://www.vozpopuli.com/"+ idsNoticias[i].idSeccion + idsNoticias[i].idNoticia + "-noticia'>Ver noticia relacionada</a>");
                                     		noticiaEncotrado = true;
                                     		
                                     	}	
                                     }

                                     if (!noticiaEncotrado) {
                                     	showTooltip(item.pageX, item.pageY, item.series.label + " "+  "/ "+ fecha + " <br/>" +  " "+ "Porcentaje" +  " "+ y +"%");
                                     }

                                 }
                             }
                             else {
                                 $("#tooltip").remove();
                                 previousPoint = null;
                             }
							 
							 $("#tooltip").css('border','3px solid '+item.series.color);
                         })
                     });
					 
//////////////////////////////CLICK////////					 
					 			 
//////////////////////////////HOVER////////				 
			$(function () {
  $("#placeholder").bind("plothover", function (event, pos, item) {
    if (item) {
      document.body.style.cursor = 'pointer';
    }
  });

  $("#placeholder").bind("mouseout", function () {
    document.body.style.cursor = 'default';
  });
});		 
//////////////////////////////HOVER////////				 	

		
                 });	

			 