package controllers

import chess.Chess
import play.mvc._
import views.html._

class Application extends  Controller{

  var c: Chess = _
  var instance_counter = 0

  def startGame(): Result={

    if(instance_counter == 0){
      c = new Chess()
      instance_counter += 1
    }

    Results.ok(game.render(c.controller))
  }

  def home(): Result={
    Results.ok(index.render(""))
  }
}
