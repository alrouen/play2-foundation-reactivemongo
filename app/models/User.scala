package models

import reactivemongo.bson.BSONObjectID
import org.joda.time.DateTime

import play.api.libs.json.Json
import play.api.Play.current
import play.modules.reactivemongo.ReactiveMongoPlugin
import play.modules.reactivemongo.json.collection.JSONCollection
import play.modules.reactivemongo.json.BSONFormats._
import play.api.libs.Codecs

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
  implicit val userFormat = Json.format[User]
}

object Users extends MongoModel[User, BSONObjectID] {
  override lazy val collection = ReactiveMongoPlugin.db.collection[JSONCollection]("users")
  override implicit val ec = play.api.libs.concurrent.Execution.Implicits.defaultContext

  def findByName(name: String) = find(Json.obj("name" -> name))
  def findByEmail(email: String) = findOne(Json.obj("email" -> email))

  def update(user: User) = {
    collection.save(user.copy(updatedOn = new DateTime))
  }

}


