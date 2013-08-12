package models

import play.api.libs.json._
import org.joda.time.DateTime
import play.api.libs.json.JsSuccess
import play.api.libs.json.JsNumber

object CustomFormat {

  implicit object DateTimeToBsonDate extends Format[DateTime] {
    def reads(jsDate: JsValue) = {
      jsDate.\("$date").asOpt[JsNumber].map { mayBeLong => JsSuccess(new DateTime(mayBeLong.value.toLong))}.getOrElse(JsError("invalid format"))
    }

    def writes(datetime: DateTime) = {
      Json.obj("$date" -> datetime.getMillis)
    }
  }

}
