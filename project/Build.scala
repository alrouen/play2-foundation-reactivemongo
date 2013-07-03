import net.litola.SassPlugin
import sbt._
import Keys._
import play.Project._

object ApplicationBuild extends Build {

  val appName         = "play2-foundation-reactivemongo"
  val appVersion      = "1.0-SNAPSHOT"

  val appDependencies = Seq(
    "org.reactivemongo" %% "play2-reactivemongo" % "0.9"
    //, "play-json-zipper"  %% "play-json-zipper"    % "0.1-SNAPSHOT"
  )

  libraryDependencies ++= Seq(
    "joda-time" % "joda-time" % "2.2"
  )

  val main = play.Project(appName, appVersion, appDependencies).settings(
    scalacOptions += "-feature",
    SassPlugin.sassOptions := Seq("--compass","-C"),
    SassPlugin.sassEntryPoints <<= (sourceDirectory in Compile)(base => ((base / "assets" ** "*.sass") +++ (base / "assets" ** "*.scss") --- base / "assets" ** "_*")),
    resourceGenerators in Compile <+= SassPlugin.sassWatcher
  )

}
