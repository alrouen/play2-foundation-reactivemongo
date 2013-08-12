package models

import scala.concurrent.{ExecutionContext, Future}
import reactivemongo.bson.BSONObjectID
import reactivemongo.api.indexes.IndexType._
import org.joda.time.DateTime

import ExecutionContext.Implicits.global
import play.api.libs.json._
import play.api.Play.current
import play.modules.reactivemongo.ReactiveMongoPlugin
import play.modules.reactivemongo.json.BSONFormats.BSONObjectIDFormat
import play.api.libs.Codecs
import play.api.libs.json.JsSuccess
import play.modules.reactivemongo.json.collection.JSONCollection
import play.api.libs.json.JsNumber

case class User(
       _id: BSONObjectID = BSONObjectID.generate,
       name: String,
       email: String,
       password: String,
       createdOn: DateTime = new DateTime,
       updatedOn: DateTime = new DateTime
 ) {
  def cryptPassword = this.copy(password = User.hashPwd(this.password))
  def changePassword(newPassword: String) = this.copy(password = User.hashPwd(newPassword))
  def isPasswordValid(password: String): Boolean = password == User.hashPwd(password)
}

object User {
  private val seed = "play-skeleton"
  def hashPwd(password: String): String = Codecs.sha1(password + seed)

  import CustomFormat.DateTimeToBsonDate
  implicit val userFormat = Json.format[User]
}

object Users extends MongoModel[User, BSONObjectID] {
  override def collection = ReactiveMongoPlugin.db.collection[JSONCollection]("users")
  override def ensureIndexes = {
    Future.sequence(List(
      ensureIndex(List("_id"-> Ascending, "email" -> Ascending)),
      ensureIndex(List("email" -> Ascending), unique = true),
      ensureIndex(List("name" -> Ascending)),
      ensureIndex(List("updatedOn" -> Descending))
    ))
  }

  def findByName(name: String) = find(Json.obj("name" -> name))
  def findByEmail(email: String) = findOne(Json.obj("email" -> email))

  override def update(user: User) = {
    collection.save(user.copy(updatedOn = new DateTime))
  }

}


