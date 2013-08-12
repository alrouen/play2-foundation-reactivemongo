package controllers

import scala.concurrent.{ExecutionContext, Future}
import ExecutionContext.Implicits.global
import play.api.mvc._
import play.api.libs.json.{JsError, Json, Writes}
import models.{Users, User}
import models.ApiFormat._
import reactivemongo.bson.BSONObjectID
import play.Logger


object UserApi extends Controller {


  def getAllUsers = Action {

    Async {
      Users.findAll(Json.obj("updatedOn" -> -1)).map { users =>
        Ok(Json.toJson(users)(Writes.seq(userApiWrites)))
          .withHeaders(CACHE_CONTROL -> "no-cache, no-store", PRAGMA -> "no-cache") // Pragma & Cache-Control to avoid caching issue on Safari & IE
      }
    }
  }

  def createUser = Action(parse.json) { request =>

    request.body.validate(validateCreateUser).map {
      case(name, email, password) => {
        Async {
          for {
            maybeUser <- Users.findByEmail(email)
            creation <- {
              maybeUser match {
                case Some(user) => {
                  Future(BadRequest(Json.obj("error" -> "emailAlreadyExisting")))
                }
                case None => {
                  val u = new User(name = name, email = email, password = password).cryptPassword
                  Users.insert(u).map { _ => Ok(Json.obj("id" -> u._id.stringify))}
                }
              }
            }
          } yield creation
        }
      }

    }.recoverTotal{ e =>
      Logger.error("create user error: "+JsError.toFlatJson(e).toString())
      BadRequest(Json.obj("error" -> JsError.toFlatJson(e))) }

  }

  def checkEmail(email: String) = Action {
    Async {
      Users.findByEmail(email).map { mayBeUser => Ok(Json.obj("email" -> email, "alreadyExist" -> mayBeUser.isDefined)) }
    }
  }

  def updateUser(id: String) = Action(parse.json) { request =>
    checkId(id) { bsonId =>
      request.body.validate(validateUpdateUser).map {
        case(name, email) => {
          Async {
            for {
              maybeUser <- Users.findById(bsonId)
              update <- {
                maybeUser match {
                  case Some(user) =>
                  {
                    if(email != user.email) {
                      Users.findByEmail(email).flatMap {
                        case Some(userWithSameEmail) => Future(BadRequest(Json.obj("error" -> "emailAlreadyExisting")))
                        case None => Users.update(user.copy(name = name, email = email)).map { _ => Ok}
                      }
                    } else {
                      Users.update(user.copy(name = name, email = email)).map { _ => Ok}
                    }
                  }
                  case None => Future(NotFound)
                }
              }
            } yield update
          }
        }
      }.recoverTotal( e => BadRequest(Json.obj("error" -> JsError.toFlatJson(e))) )
    }
  }

  def deleteUser(id: String) = Action {
    checkId(id) {bsonId =>
      Async {
        Users.remove(bsonId).map { _ => NoContent}
      }
    }
  }

  private def checkId(id: String)(f: BSONObjectID => Result) = {
    BSONObjectID.parse(id).map(f) getOrElse(BadRequest(Json.obj("error" -> "invalidId")))
  }

}
