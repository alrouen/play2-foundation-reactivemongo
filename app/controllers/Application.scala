package controllers

import play.api._
import play.api.mvc._
import models.{Users, User}

object Application extends Controller {
  
  def index = Action {
    Ok(views.html.index(""))
  }
  
}