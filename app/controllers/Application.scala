package controllers

import chess.Chess
import model.Player
import play.mvc._
import views.html._
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

    Results.ok("Hallo")
  }
}
