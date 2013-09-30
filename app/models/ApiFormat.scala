package models

import play.api.libs.json._
import play.api.libs.json.Reads._
import play.api.libs.functional.syntax._

object ApiFormat {

  implicit val datetimeReads = Reads.jodaDateReads("yyyy-MM-dd'T'HH:mmZ") // => we override the default DateTime format
  implicit val datetimeWrites = Writes.jodaDateWrites("yyyy-MM-dd'T'HH:mmZ")

  val userApiWrites = Writes[User] {
    case u => {
      Json.obj(
        "id" -> u._id.stringify,
        "name" -> u.name,
        "email" -> u.email,
        "updatedOn" -> u.updatedOn
      )
    }
  }

  val validateNotEmptyString = Reads.verifying( (str: String) => !str.isEmpty )

  val validateCreateUser = ((
    (__ \ 'name ).read(validateNotEmptyString) and
    (__ \ 'email ).read(email) and
    (__ \ 'password).read(validateNotEmptyString) and
    (__ \ 'confirmPassword).read(validateNotEmptyString)
    ).tupled
  )

  val validateUpdateUser = ((
      (__ \ 'name ).read(validateNotEmptyString) and
      (__ \ 'email ).read(email)
      ).tupled
    )

}
