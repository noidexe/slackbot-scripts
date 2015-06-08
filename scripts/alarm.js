// Description: 
//   Alarma
// 

module.exports = function (robot) {
	robot.respond(/avisame en (.*) que tengo que (.*)/i, function(res){
		var tiempo = res.match[1];
		var evento = res.match[2];
		if (isNaN(tiempo)) {
			res.reply(tiempo + ' no es un numero. No te hagas el vivo.');
		}
		else if (evento.match(/DROP TABLE/i)) {
			res.reply('Para, Trinity! Ubicate.');
		}
		else {
			res.reply('Agendado');
			setTimeout(function() {
				res.reply('Ya es la hora de ' + evento);
			}, tiempo * 60 * 1000);
		}
	});
};