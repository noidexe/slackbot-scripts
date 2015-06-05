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

  denada = ['De nada', 'No hay porque', 'No hay de queso nomas de papa', 'Gracias hacen los monos']
  robot.hear /gracias/i, (res) ->
    res.send res.random denada