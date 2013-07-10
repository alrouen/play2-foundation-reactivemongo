package models

import scala.concurrent.{Future, ExecutionContext}
import play.modules.reactivemongo.json.collection.JSONCollection
import play.modules.reactivemongo.json.BSONFormats._
import reactivemongo.api._
import ExecutionContext.Implicits.global
import play.api.libs.json._
import reactivemongo.bson.BSONDocument
import reactivemongo.api.indexes.{Index, IndexType}

abstract class MongoModel[T: Format, ID: Format] {

  val collection: JSONCollection
  implicit val ec: ExecutionContext

  //TODO : managing indexing from MongoModel
  def ensureIndexes: Future[List[Boolean]]

  def ensureIndex(
    key: List[(String, IndexType)],
    name: Option[String] = None,
    unique: Boolean = false,
    background: Boolean = false,
    dropDups: Boolean = false,
    sparse: Boolean = false,
    version: Option[Int] = None,
    options: BSONDocument = BSONDocument()) = {
    collection.indexesManager.ensure(Index(key, name, unique, background, dropDups, sparse, version, options))
  }

  //TODO: follow-up on https://github.com/zenexity/ReactiveMongo/issues/72
  def find(query: JsObject, sort: JsObject = Json.obj(), limit: Int = Int.MaxValue): Future[List[T]] = {
    collection.find(query).sort(sort).options(QueryOpts().batchSize(limit)).cursor[JsObject].toList(limit).map(_.map { jsObj => jsObj.as[T] }.toList)
  }

  def findOne(query: JsObject, sort: JsObject = Json.obj()) = collection.find(query).sort(sort).one[T]

  def findAll(sort: JsObject = Json.obj()) = find(query = Json.obj(), sort = sort)

  def findById(id: ID): Future[Option[T]] = findOne(Json.obj("_id" -> id))

  def insert(o: T) = collection.insert(o)

  def remove(id: ID) = collection.remove(Json.obj("_id" -> id))

}