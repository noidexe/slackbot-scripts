// Description: 
//   Alarma
// 

module.exports = function (robot) {
	robot.respond(/(avisame|recordame) en ([0-9]+\.?[0-9]*) (segundo|minuto|hora|dia|segundos|minutos|horas|dias) que (.*)/i, function(res){
		var tiempo = res.match[2];
		var evento = res.match[4];
		switch(res.match[3]) {
			case 'dia':
			case 'dias':
				tiempo = tiempo * 24 * 60 * 60 * 1000;
				break;
			case 'hora':
			case 'horas':
				tiempo = tiempo * 60 * 60 * 1000;
				break;
			case 'minuto':
			case 'minutos':
				tiempo = tiempo * 60 * 1000;
				break;
			case 'segundo':
			case 'segundos':
				tiempo = tiempo * 1000;
		}
		if (isNaN(tiempo)) {
			res.reply(tiempo + ' no es un numero. No te hagas el vivo.');
		}
		else if (evento.match(/DROP TABLE/i)) {
			res.reply('Para, Trinity! Ubicate.');
		}
		else {
			res.reply('Agendado');
			setTimeout(function() {
				res.reply('Agendaste "' + evento + '". Ya es la hora.');
			}, tiempo);
		}
	});
};