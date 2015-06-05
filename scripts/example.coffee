# Description:
#   Example scripts for you to examine and try out.
#
# Notes:
#   They are commented out by default, because most of them are pretty silly and
#   wouldn't be useful and amusing enough for day to day huboting.
#   Uncomment the ones you want to try and experiment with.
#
#   These are from the scripting documentation: https://github.com/github/hubot/blob/master/docs/scripting.md

module.exports = (robot) ->
  active = true
  denada = ['De nada', 'No hay porque', 'No hay de queso nomas de papa', 'Gracias hacen los monos']
  robot.hear /gracias/i, (res) ->
    res.send res.random denada
  robot.hear /xD/, (res) ->
    res.send ":stuck_out_tongue_closed_eyes:"
  robot.hear /soy (nuevo)/i, (res) ->
    name = res.match[1]
    res.send "Hola #{name}! Te recomiendo que leas este post para saber de donde obtener recursos: http://foro.adva.vg/t/post-introductorio-para-el-desarrollo-de-videojuegos/125"
  robot.respond /deactivate/i, (res)->
    active = false
    res.send "SHUTTING DOWN"
  robot.respond /activate/i, (res)->
    active = true
    res.send 'POWERING UP. BEEP BEEP BIP BEEP'
  robot.respond /status/i, (res)->
    res.send 'Status:' + active
    
  unknown = ['Eh?','Que?', 'Mmm...', 'BEEP BEEP', 'What?', 'Que decis?', 'Que queres?', 'Ahá','Segui que yo te escucho']
  robot.respond /.*/, (res) ->
    res.send res.random unknown