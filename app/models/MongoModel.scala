package models

import scala.concurrent.{Future, ExecutionContext}
import play.modules.reactivemongo.json.collection.JSONCollection
import play.modules.reactivemongo.json.BSONFormats._
import reactivemongo.api._
import ExecutionContext.Implicits.global
import play.api.libs.json._
import reactivemongo.bson.BSONDocument
import reactivemongo.api.indexes.{Index, IndexType}
import org.joda.time.DateTime
import java.util.concurrent.TimeoutException
import reactivemongo.core.commands.Count

abstract class MongoModel[T: Format, ID: Format] {

  def collection: JSONCollection

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

  def count(query: JsObject = Json.obj()): Future[Int] = {
    val doc = BSONDocumentFormat.reads(query).get
    collection.db.command(Count(collectionName = collection.name, query = Some(doc)))
  }

  def findOne(query: JsObject, sort: JsObject = Json.obj()) = collection.find(query).sort(sort).one[T]

  def findAll(sort: JsObject = Json.obj()) = find(query = Json.obj(), sort = sort)

  def findById(_id: ID): Future[Option[T]] = findOne(Json.obj("_id" -> _id))

  def insert(o: T) = collection.insert(o)

  def update(o: T) = collection.save(o)

  def update(query: JsObject, toUpdate: JsObject, upsert: Boolean = false, multi: Boolean = false) = collection.update(query, toUpdate, upsert = upsert, multi = multi)

  def remove(_id: ID) = collection.remove(Json.obj("_id" -> _id))

  def drop(): Future[Boolean] = collection.drop().recover { case _ => false }

}