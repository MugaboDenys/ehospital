FROM tomcat:8.5-jdk8-openjdk

MAINTAINER Mugabo Denys mugabodan2020@gmail.com

COPY target/ehospital.war /usr/local/tomcat/webapps/
