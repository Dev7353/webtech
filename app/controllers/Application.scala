package controllers

import chess.Chess
import model.Player
import play.mvc._
import views.html._
import play.api.libs.json._
import play.libs.F.Tuple

import scala.collection.mutable.ListBuffer
class Application extends  Controller{

  var c: Chess = _
  var instance_counter = 0


  def login(player1: String, player2: String): Result ={
    if(instance_counter == 0){
      c = new Chess()
      instance_counter += 1
    }

    c.controller.setPlayerA(new Player(player1))
    c.controller.setPlayerB(new Player(player2))
    Results.ok(game.render(c.controller))
  }
  def startGame(): Result={
    c.loop()
    Results.ok(game.render(c.controller))
  }

  def home(): Result={
    Results.ok(index.render(""))
  }

  def getMoves(x: String, y: String):Result={
    var moves:ListBuffer[Tuple2[Int, Int]] = new ListBuffer[(Int, Int)]
    var filteredMoves:ListBuffer[Tuple2[Int, Int]] = new ListBuffer[(Int, Int)]
    if(c.controller.currentPlayer.hasFigure(c.gamefield.get((x.charAt(1).asDigit, y.charAt(1).asDigit))))
      {
        moves = c.controller.getPossibleMoves(x.charAt(1).asDigit, y.charAt(1).asDigit)
        moves.foreach((t: Tuple2[Int, Int]) =>
          if(t._1 >= 0 && t._1 < 8 && t._2 >= 0 && t._2 < 8 ){
            if(!c.controller.currentPlayer.hasFigure(c.gamefield.get(t))){
              filteredMoves += t

            }
          }
        )
      }

    val jsonMoves = Json.obj(
      "moves" -> Json.toJson(filteredMoves.toList)
    )
    Results.ok(jsonMoves.toString())
  }
  def moveFigure(cpx: String, cpy: String, x: String, y:String): Result={
    val currentPlayer = (cpx.charAt(1).asDigit, cpy.charAt(1).asDigit)
    val target = (x.charAt(1).asDigit, y.charAt(1).asDigit)
    c.controller.putFigureTo(currentPlayer, target)
    Results.ok("Ok")
  }
}
