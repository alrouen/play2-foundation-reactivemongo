import play.api.{Logger, Application, GlobalSettings}
import models.Users


object Global extends GlobalSettings {

  override def onStart(app: Application) {
    Logger.info("ensuring indexes...")
    Users.ensureIndexes
  }

}
