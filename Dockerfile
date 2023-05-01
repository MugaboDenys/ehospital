FROM openjdk:8

ADD ./target/ehospital-1.0-SNAPSHOT.war  /home/denys/apache-tomcat-8.5.88/webapps

EXPOSE 8080

CMD ["catalina.sh", "run"]