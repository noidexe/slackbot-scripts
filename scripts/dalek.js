// Description: 
//   TrollBot
//


module.exports = function (robot) {
	var active = true;
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
	robot.hear(/xD/, function(res)
	{
    if (active)
    {
      res.send(":stuck_out_tongue_closed_eyes:");
    }
	});
	
	robot.hear(/soy (nuevo)/i, function (res)
	{
		var name = res.match[1];
		res.send("Hola #{name}! Te recomiendo que leas este post para saber de donde obtener recursos: http://foro.adva.vg/t/post-introductorio-para-el-desarrollo-de-videojuegos/125");
	});
	
	robot.respond(/(.*)/i, function(res)
	{
		var command = res.match[1];
    if (command.toLowerCase()=="activate")
    {
      active = true;
      res.send('POWERING UP. BEEP BEEP BIP BEEP');
      if (inactiveTimer)
      {
        clearTimeout(inactiveTimer);
        inactiveTimer = null;
      }
      res.finish();
    }
    else if (command.toLowerCase()=="deactivate")
    {
      active = false;
      res.send("SHUTTING DOWN. Hasta la vista Baby");
      inactiveTimer = setTimeout(function() 
      {
        active = true;
				res.reply("BEEP BEEP. I'M BACK BABY");
			}, inactiveTime * 60 * 1000);
      res.finish();
    }
    else if (command.toLowerCase()=="status")
    {
      res.send('Status:' + active);
      res.finish();
    }
    else if (comand.toLowerCase()=='mitsuku')
    {
      if (res.message.text.match(/mitsuku (on)/i).length>1)
      {
        useMitsuku = true;
        res.send("Mitsuku activada");
      }
      else 
      {
        useMitsuku = false;
        res.send("Mitsuku desactivada");
      }
      res.finish();
    }
	});
  robot.respond(/.*/,function (res)
  {
      if (!useMitsuku)
      {
        var r = /(?:#{robot.alias}|#{robot.name}) (.*)/i;
        var matches = res.message.text.match(r);
        if (matches != null && matches.length > 1)
        {
          res.send(res.random(unknown));
          res.finish();
        }
      }
      else
      {
        mit.send(res.message.text).then(function(response) {
          res.send(response);
          res.finish();
        });
      }
  });
};