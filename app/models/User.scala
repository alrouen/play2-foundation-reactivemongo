package models

import reactivemongo.bson.BSONObjectID
import org.joda.time.DateTime

import play.api.libs.json.{Format, Json}
import play.api.Play.current
import play.modules.reactivemongo.ReactiveMongoPlugin
import play.modules.reactivemongo.json.collection.JSONCollection
import play.modules.reactivemongo.json.BSONFormats._

case class User(_id: BSONObjectID = BSONObjectID.generate, name: String, email: String, password: String, createdOn: DateTime = new DateTime){}

object User {
  implicit val userFormat = Json.format[User]
}

object Users extends MongoModel[User, String] {
  override lazy val collection = ReactiveMongoPlugin.db.collection[JSONCollection]("users")
  override implicit val ec = play.api.libs.concurrent.Execution.Implicits.defaultContext

  def findByName(name: String) = find(Json.obj("name" -> name))
  def findByEmail(email: String) = findOne(Json.obj("email" -> email))

}


