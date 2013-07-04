package controllers

import play.api.mvc._
import play.api.Routes

object JavascriptRoutes extends Controller {

  def jsRoutes = Action { implicit request =>
    import routes.javascript._
    Ok(
      Routes.javascriptRouter("jsRoutes")(
        UserApi.getAllUsers,
        UserApi.createUser,
        UserApi.deleteUser,
        UserApi.updateUser
      )
    ).as("text/javascript")
  }

}
