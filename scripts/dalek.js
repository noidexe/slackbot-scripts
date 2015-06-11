// Description: 
//   TrollBot
//


module.exports = function (robot) {
	var active = false;
  var inactiveTime = 30; //Tiempo en minutos
  var inactiveTimer =null;
  var mit = require('mitsuku-api')(); 
  var useMitsuku = false;
  var unknown = ['Eh?','Que?', 'Mmm...', 'BEEP BEEP', 'What?', 'Que decis?', 'Que queres?', 'Que decias?', 'Lo que?','I DON SPIK INGLISH'];
	robot.hear(/gracias/i, function(res)
	{
    var denada = ['De nada', 'No hay porque', 'No hay de queso nomas de papa', 'Gracias hacen los monos'];
      if (active)
      {
        res.send(res.random(denada));
      }
	});
  robot.hear(/soy (nuevo)/i, function (res)
	{
		var name = res.match[1];
		res.send("Hola #{name}! Te recomiendo que leas este post para saber de donde obtener recursos: http://foro.adva.vg/t/post-introductorio-para-el-desarrollo-de-videojuegos/125");
	});
}
	robot.respond(/activate/i, function(res)
	{
      active = true;
      res.send('POWERING UP. BEEP BEEP BIP BEEP');
      if (inactiveTimer)
      {
        clearTimeout(inactiveTimer);
        inactiveTimer = null;
      }
      res.finish();
  });
	robot.respond(/deactivate[ ]([0-9]*|forever)/i, function (res)
  {
      var time = inactiveTime;
      if (res.match && res.match.length>1)
      {
          if (res.match[1].toLowerCase()=='forever')
          {
            time=0;
          }
          else
          {
            time = parseInt(timeMatch[1]);
          }
      }
      active = false;
      res.send("SHUTTING DOWN. Hasta la vista Baby");
      if (time>0)
      {
        if(inactiveTimer)
          clearTimeout(inactiveTimer);
        inactiveTimer = setTimeout(function() 
        {
          active = true;
          res.reply("BEEP BEEP. I'M BACK BABY");
        }, time * 60 * 1000);
      }
      res.finish();
  });
	robot.respond(/status/i, function(res)
  {
      res.send('Status:' + active);
      res.finish();
  });
	robot.respond(/mitsuku (.*)/i, function(res)
  {
        mit.send(res.match[1]).then(function(response) {
          res.send(response);
          res.finish();
        });
  });
};