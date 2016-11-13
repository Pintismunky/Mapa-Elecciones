function pintaGrafico(datosACargar, nombrados){
var div = d3.select("body").append("div").attr("class", "toolTip");
var margin = {top: -310, right: 0, bottom: 0, left: -140};
var w = parseInt(d3.select("#pie-chart").style("width")) - margin.left - margin.right;
var h = 10 - margin.top - margin.bottom;
var r = parseInt(d3.select("#pie-chart").style("font-size"));
var ir = parseInt(d3.select("#pie-chart").style("line-height"));
var textOffset = 18;
var tweenDuration = 1050;
var degree = Math.PI/180;

//datos a cargar
var lines, valueLabels, nameLabels;
var pieData = [];
var oldPieData = [];
var filteredPieData = [];

//Angulos rosco
var donut = d3.layout.pie()
 .startAngle(-90*degree)
 .endAngle(90*degree)
 .value(function(d){
  return d.itemValue;
});

var arc = d3.svg.arc()
  .startAngle(function(d){ return d.startAngle; })
  .endAngle(function(d){ return d.endAngle; })
  .innerRadius(ir)
  .outerRadius(r);

///////////////////////////////////////////////////////////
// GENERATE FAKE DATA /////////////////////////////////////
///////////////////////////////////////////////////////////

var data;
var dataStructure = datosACargar;
colorCambio(dataStructure);

///////////////////////////////////////////////////////////
// VIS y Grupos ////////////////////////////////////
///////////////////////////////////////////////////////////

var vis = d3.select("#pie-chart").append("svg:svg")
  .attr("width", w)
  .attr("height", h);



//grupo roscos
var arc_group = vis.append("svg:g")
  .attr("class", "arc")
  .attr("transform", "translate(" + (w/2) + "," + (h/2) + ")");

//grupo etiquetas
var label_group = vis.append("svg:g")
  .attr("class", "label_group")
  .attr("transform", "translate(" + (w/2) + "," + (h/2) + ")");



// llamada datos
function update(number) {

  data = dataStructure[number].data;

  oldPieData = filteredPieData;
  pieData = donut(data);

  var sliceProportion = 0; //size of this slice
  filteredPieData = pieData.filter(filterData);
  function filterData(element, index, array) {
    element.name = data[index].itemLabel;
    element.value = data[index].itemValue;
    sliceProportion += element.value;
    return (element.value > 0);
  }

    //dibuja rosco
    paths = arc_group.selectAll("path").data(filteredPieData);
    paths.enter().append("svg:path")
      .attr("stroke", "white")
      .attr("stroke-width", 0.0)
      .attr("fill", function(d,i){return data[i].colores;})
      .transition()
        .duration(tweenDuration)
        .attrTween("d", pieTween);
    paths
      .transition()
        .attr("fill", function(d,i){return data[i].colores;})
        .duration(tweenDuration)
        .attrTween("d", pieTween);
    paths.exit()
      .transition()
        .duration(tweenDuration)
        .attrTween("d", removePieTween)
      .remove();

paths.on("mousemove", function(d){
    div.style("left", d3.event.pageX+10+"px");
		  div.style("top", d3.event.pageY-25+"px");
		  div.style("display", "inline-block");
    div.html((d.data.itemLabel)+" - "+(d.data.itemValue)+" "+nombrados+" "+"<br>"+ formatNumber.new(d.data.votos)+" Votos ");
});

paths.on("mouseout", function(d){
    div.style("display", "none");
});


    valueLabels = label_group.selectAll("text.value").data(filteredPieData)
      .attr("dy", function(d){
        if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
          return 5;
        } else {
          return -7;
        }
      })
      .attr("text-anchor", function(d){
        if ( (d.startAngle+d.endAngle)/2 < Math.PI ){
          return "beginning";
        } else {
          return "end";
        }
      })
      .text(function(d){
        var percentage = (d.value/sliceProportion)*100;
        return d.data.itemValue;

      });

    valueLabels.enter().append("svg:text")
      .attr("class", "value")
      .attr("transform", function(d) {
        return "translate(" + Math.cos(((d.startAngle+d.endAngle - Math.PI)/2)) * (r+textOffset) + "," + Math.sin((d.startAngle+d.endAngle - Math.PI)/2) * (r+textOffset) + ")";
      })
      .attr("dy", function(d){
        if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
          return 5;
        } else {
          return -7;
        }
      })
      .attr("text-anchor", function(d){
        if ( (d.startAngle+d.endAngle)/2 < Math.PI ){
          return "beginning";
        } else {
          return "end";
        }
      }).text(function(d){
        var percentage = (d.value/sliceProportion)*100;
        return d.data.itemValue;
      });

    valueLabels.transition().duration(tweenDuration).attrTween("transform", textTween);

    valueLabels.exit().remove();

    //etiquetas numero
    valueLabels2 = label_group.selectAll("text.value").data(filteredPieData)
      .attr("dy", function(d){
        if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
          return 5;
        } else {
          return -7;
        }
      })
      .attr("text-anchor", function(d){
        if ( (d.startAngle+d.endAngle)/2 < Math.PI ){
          return "beginning";
        } else {
          return "end";
        }
      })
      .text(function(d){
        var percentage = (d.value/sliceProportion)*100;
        return d.data.itemValue;
      });

    valueLabels2.enter().append("svg:text")
      .attr("class", "value")
      .attr("transform", function(d) {
        return "translate(" + Math.cos(((d.startAngle+d.endAngle - Math.PI)/2)) * (r+textOffset) + "," + Math.sin((d.startAngle+d.endAngle - Math.PI)/2) * (r+textOffset) + ")";
      })
      .attr("dy", function(d){
        if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
          return 5;
        } else {
          return -7;
        }
      })
      .attr("text-anchor", function(d){
        if ( (d.startAngle+d.endAngle)/2 < Math.PI ){
          return "beginning";
        } else {
          return "end";
        }
      }).text(function(d){
        var percentage = (d.value/sliceProportion)*100;
        return d.data.itemValue;
      });

    valueLabels2.transition().duration(tweenDuration).attrTween("transform", textTween);

    valueLabels2.exit().remove();

    //etiquetas nombres
    nameLabels = label_group.selectAll("text.units").data(filteredPieData)
      .attr("dy", function(d){
        if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
          return 17;
        } else {
          return 9;
        }
      })
      .attr("text-anchor", function(d){
        if ((d.startAngle+d.endAngle)/2 < Math.PI ) {
          return "beginning";
        } else {
          return "end";
        }
      }).text(function(d){
        return d.name;
      });

    nameLabels.enter().append("svg:text")
      .attr("class", "units")
      .attr("transform", function(d) {
        return "translate(" + Math.cos(((d.startAngle+d.endAngle - Math.PI)/2)) * (r+textOffset) + "," + Math.sin((d.startAngle+d.endAngle - Math.PI)/2) * (r+textOffset) + ")";
      })
      .attr("dy", function(d){
        if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*14 ) {
          return 17;
        } else {
          return 4;
        }
      })
      .attr("text-anchor", function(d){
        if ((d.startAngle+d.endAngle)/2 < Math.PI ) {
          return "beginning";
        } else {
          return "end";
        }
      }).text(function(d){
        return d.name;
      });

    nameLabels.transition().duration(tweenDuration).attrTween("transform", textTween);

    nameLabels.exit().remove();


}

function pieTween(d, i) {
  var s0;
  var e0;
  if(oldPieData[i]){
    s0 = oldPieData[i].startAngle;
    e0 = oldPieData[i].endAngle;
  } else if (!(oldPieData[i]) && oldPieData[i-1]) {
    s0 = oldPieData[i-1].endAngle;
    e0 = oldPieData[i-1].endAngle;
  } else if(!(oldPieData[i-1]) && oldPieData.length > 0){
    s0 = oldPieData[oldPieData.length-1].endAngle;
    e0 = oldPieData[oldPieData.length-1].endAngle;
  } else {
    s0 = 0;
    e0 = 0;
  }
  var i = d3.interpolate({startAngle: s0, endAngle: e0}, {startAngle: d.startAngle, endAngle: d.endAngle});
  return function(t) {
    var b = i(t);
    return arc(b);
  };
}

function removePieTween(d, i) {
  s0 = 2 * Math.PI;
  e0 = 2 * Math.PI;
  var i = d3.interpolate({startAngle: d.startAngle, endAngle: d.endAngle}, {startAngle: s0, endAngle: e0});
  return function(t) {
    var b = i(t);
    return arc(b);
  };
}

function textTween(d, i) {
  var a;
  if(oldPieData[i]){
    a = (oldPieData[i].startAngle + oldPieData[i].endAngle - Math.PI)/2;
  } else if (!(oldPieData[i]) && oldPieData[i-1]) {
    a = (oldPieData[i-1].startAngle + oldPieData[i-1].endAngle - Math.PI)/2;
  } else if(!(oldPieData[i-1]) && oldPieData.length > 0) {
    a = (oldPieData[oldPieData.length-1].startAngle + oldPieData[oldPieData.length-1].endAngle - Math.PI)/2;
  } else {
    a = 0;
  }
  var b = (d.startAngle + d.endAngle - Math.PI)/2;

  var fn = d3.interpolateNumber(a, b);
  return function(t) {
    var val = fn(t);
    return "translate(" + Math.cos(val) * (r+textOffset) + "," + Math.sin(val) * (r+textOffset) + ")";
  };
}



update(0);
};






function pintaGrafico2(datosACargar, nombrados){
var div = d3.select("body").append("div").attr("class", "toolTip");
var margin = {top: 0, right: 20, bottom: 0, left: 140};
var w = 200;
var h = 130 - margin.top - margin.bottom;
var r = 65;
var ir = 30;
var textOffset = 18;
var tweenDuration = 1050;
var degree = Math.PI/180;

//datos a cargar
var lines, valueLabels, nameLabels;
var pieData = [];
var oldPieData = [];
var filteredPieData = [];

//Angulos rosco
var donut = d3.layout.pie()
 .startAngle(-90*degree)
 .endAngle(90*degree)
 .value(function(d){
  return d.itemValue;
});

var arc = d3.svg.arc()
  .startAngle(function(d){ return d.startAngle; })
  .endAngle(function(d){ return d.endAngle; })
  .innerRadius(ir)
  .outerRadius(r);

///////////////////////////////////////////////////////////
// GENERATE FAKE DATA /////////////////////////////////////
///////////////////////////////////////////////////////////

var data;
var dataStructure = datosACargar;
colorCambio(dataStructure);

///////////////////////////////////////////////////////////
// VIS y Grupos ////////////////////////////////////
///////////////////////////////////////////////////////////

var vis = d3.select("#pie-chart2").append("svg:svg")
  .attr("width", w)
  .attr("height", h);



//grupo roscos
var arc_group = vis.append("svg:g")
  .attr("class", "arc")
  .attr("transform", "translate(" + (w/2) + "," + (h/2) + ")");

//grupo etiquetas
var label_group = vis.append("svg:g")
  .attr("class", "label_group")
  .attr("transform", "translate(" + (w/2) + "," + (h/2) + ")");



// llamada datos
function update(number) {

  data = dataStructure[number].data;

  oldPieData = filteredPieData;
  pieData = donut(data);

  var sliceProportion = 0; //size of this slice
  filteredPieData = pieData.filter(filterData);
  function filterData(element, index, array) {
    element.name = data[index].itemLabel;
    element.value = data[index].itemValue;
    sliceProportion += element.value;
    return (element.value > 0);
  }

    //dibuja rosco
    paths = arc_group.selectAll("path").data(filteredPieData);
    paths.enter().append("svg:path")
      .attr("stroke", "white")
      .attr("stroke-width", 0.0)
      .attr("fill", function(d,i){return data[i].colores;})
      .transition()
        .duration(tweenDuration)
        .attrTween("d", pieTween);
    paths
      .transition()
        .attr("fill", function(d,i){return data[i].colores;})
        .duration(tweenDuration)
        .attrTween("d", pieTween);
    paths.exit()
      .transition()
        .duration(tweenDuration)
        .attrTween("d", removePieTween)
      .remove();

paths.on("mousemove", function(d){
    div.style("left", d3.event.pageX+10+"px");
		  div.style("top", d3.event.pageY-25+"px");
		  div.style("display", "inline-block");
    div.html((d.data.itemLabel)+" - "+(d.data.itemValue)+" "+nombrados+" "+"<br>"+ formatNumber.new(d.data.votos)+" Votos ");
});

paths.on("mouseout", function(d){
    div.style("display", "none");
});


    valueLabels = label_group.selectAll("text.value").data(filteredPieData)
      .attr("dy", function(d){
        if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
          return 5;
        } else {
          return -7;
        }
      })
      .attr("text-anchor", function(d){
        if ( (d.startAngle+d.endAngle)/2 < Math.PI ){
          return "beginning";
        } else {
          return "end";
        }
      })
      .text(function(d){
        var percentage = (d.value/sliceProportion)*100;
        return d.data.itemValue;

      });
}

function pieTween(d, i) {
  var s0;
  var e0;
  if(oldPieData[i]){
    s0 = oldPieData[i].startAngle;
    e0 = oldPieData[i].endAngle;
  } else if (!(oldPieData[i]) && oldPieData[i-1]) {
    s0 = oldPieData[i-1].endAngle;
    e0 = oldPieData[i-1].endAngle;
  } else if(!(oldPieData[i-1]) && oldPieData.length > 0){
    s0 = oldPieData[oldPieData.length-1].endAngle;
    e0 = oldPieData[oldPieData.length-1].endAngle;
  } else {
    s0 = 0;
    e0 = 0;
  }
  var i = d3.interpolate({startAngle: s0, endAngle: e0}, {startAngle: d.startAngle, endAngle: d.endAngle});
  return function(t) {
    var b = i(t);
    return arc(b);
  };
}

function removePieTween(d, i) {
  s0 = 2 * Math.PI;
  e0 = 2 * Math.PI;
  var i = d3.interpolate({startAngle: d.startAngle, endAngle: d.endAngle}, {startAngle: s0, endAngle: e0});
  return function(t) {
    var b = i(t);
    return arc(b);
  };
}

update(0);
};
