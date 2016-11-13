<?php
	//Inicializamos variables
	//http://resultados.elpais.com/elecciones/2011/municipales/index.xml2
	$url = 'http://resultados.elpais.com/elecciones/'.$_GET['anio'].'/generales/congreso/index.xml2';
	$ficheroMD5 = md5($url);
	$rutaCompletaAFichero = __DIR__ . '/carpetaDeXMLs/' .  $ficheroMD5 .'-'.$_GET['anio'].'.xml';
	if (file_exists($rutaCompletaAFichero)) {
		if ((filemtime($rutaCompletaAFichero)+300) < time()) { //Fichero existe y es viejo
			unlink($rutaCompletaAFichero); //Borramos el fichero
		}
	}
	if (file_exists($rutaCompletaAFichero)) {//Existe, luego es válido
		$xml = file_get_contents($rutaCompletaAFichero);
	} else { //No existe. Pues lo pedimos y lo guardamos a disco
		$xml = file_get_contents($url);
		file_put_contents($rutaCompletaAFichero, $xml);
	}
	//Devolvemos el resultado
	//header(“Content-type: text/xml”);
	echo $xml;
?>