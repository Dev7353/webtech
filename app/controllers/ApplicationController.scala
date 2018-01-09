package controllers

import javax.inject.Inject

import com.mohiva.play.silhouette.api.actions.SecuredRequest
import com.mohiva.play.silhouette.api.{ LogoutEvent, Silhouette }
import org.webjars.play.WebJarsUtil
import play.api.i18n.I18nSupport
import play.api.mvc.{ AbstractController, AnyContent, ControllerComponents }
import utils.auth.DefaultEnv

import scala.concurrent.Future
import akka.actor.{ Actor, ActorRef, ActorSystem, Props }
import akka.stream.Materializer
import chess.Chess
import com.mohiva.play.silhouette.impl.User
import model.Player
import models.daos.UserDAOImpl
import observer.Observer
import play.api.mvc._
import views.html._
import play.api.libs.json._
import play.api.libs.streams.ActorFlow
import play.libs.F.Tuple

import scala.collection.mutable.ListBuffer
import scala.swing.Reactor

/**
 * The basic application controller.
 *
 * @param components  The Play controller components.
 * @param silhouette  The Silhouette stack.
 * @param webJarsUtil The webjar util.
 * @param assets      The Play assets finder.
 */
class ApplicationController @Inject() (
  components: ControllerComponents,
  silhouette: Silhouette[DefaultEnv]
)(
  implicit
  webJarsUtil: WebJarsUtil,
  assets: AssetsFinder
) extends AbstractController(components) with I18nSupport {

  /**
   * Handles the index action.
   *
   * @return The result to display.
   */
  def index = silhouette.SecuredAction.async { implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
    var users = new ListBuffer[String]()
    for (entry <- UserDAOImpl.users.valuesIterator) {
      users += entry.fullName.get
    }
    Future.successful(Ok(views.html.home(request.identity, users)))
  }

  /**
   * Handles the Sign Out action.
   *
   * @return The result to display.
   */
  def signOut = silhouette.SecuredAction.async { implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
    val result = Redirect(routes.ApplicationController.index())
    silhouette.env.eventBus.publish(LogoutEvent(request.identity, request))
    silhouette.env.authenticatorService.discard(request.authenticator, result)
  }
}