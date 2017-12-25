package controllers

import javax.inject.Inject

import akka.actor.{Actor, ActorRef, ActorSystem, Props}
import akka.stream.Materializer
import chess.Chess
import model.Player
import observer.Observer
import play.api.mvc._
import views.html._
import play.api.libs.json._
import play.api.libs.streams.ActorFlow
import play.libs.F.Tuple

import scala.collection.mutable.ListBuffer
import scala.swing.Reactor

class Application @Inject()(cc: ControllerComponents) (implicit system: ActorSystem, mat: Materializer) extends AbstractController(cc){

  var c: Chess = _
  var instance_counter = 0
  var currentPlayer: Tuple2[Int, Int] = _


  def polymerPage()= Action{
    Ok(polymerGame.render())
  }

  def login(player1: String, player2: String)= Action{
    if(instance_counter == 0){
      c = new Chess()
      instance_counter += 1
    }

    c.controller.setPlayerA(new Player(player1))
    c.controller.setPlayerB(new Player(player2))
    Ok(game.render(c.controller))
  }
  def startGame = Action{
    c.loop()
    Ok(game.render(c.controller))
  }

  def home = Action{
    Ok(index.render(""))
  }

  def getMoves(x: String, y: String)= Action{
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
    Ok(jsonMoves.toString())
  }
  def moveFigure(cpx: String, cpy: String, x: String, y:String) = Action{
    currentPlayer = (cpx.charAt(1).asDigit, cpy.charAt(1).asDigit)
    val target = (x.charAt(1).asDigit, y.charAt(1).asDigit)
    c.controller.putFigureTo(currentPlayer, target)
    Ok("Ok")
  }
  def socket = WebSocket.accept[String, String] { request =>
    ActorFlow.actorRef { out =>
      println("Connect received")
      ChessWebSocketActorFactory.create(out)
    }
  }

  object ChessWebSocketActorFactory {
    def create(out: ActorRef) = {
      Props(new ChessWebSocketActor(out))
    }
  }

  class ChessWebSocketActor(out: ActorRef) extends Actor with Observer{

    c.controller.add(this)
    def update = notifyClient

    def receive = {
      case msg: String =>
        out ! c.controller.currentPlayer.toString()
        println("[Application] Receive: "+ msg)
    }

    def notifyClient = {
      println("[Application] Notify Client")
      out ! "" + currentPlayer  + c.controller.target
    }
  }
}
