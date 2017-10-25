package controllers

import chess.Chess
import play.mvc._
import views.html._

class Application extends  Controller{

  var c: Chess = _

  def startGame(): Result={

    c = new Chess()
    Results.ok(index.render(c.textUi.toHtml()))
  }

  def home(): Result={
    Results.ok(index.render(""))
  }
}
