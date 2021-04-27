package main

import (
    "tasks-backend/server"
    "tasks-backend/db"
    "tasks-backend/environment"
    "tasks-backend/util"
    "tasks-backend/services"

    "log"
)

const (
    DB_USER_KEY = "DB_USER"
    DB_ADDRESS_KEY = "DB_ADDRESS"
    DB_PASSWORD_KEY = "DB_PASSWORD"
    DB_NAME_KEY = "DB_NAME"
)

func main() {
    envVars := environment.GetEnvVars(DB_USER_KEY, DB_ADDRESS_KEY, DB_PASSWORD_KEY, DB_NAME_KEY)

    hostAndPort, err := util.ParseHostAndPort(envVars[DB_ADDRESS_KEY])
    if err != nil {
        panic(err)
    }

    dbConn := db.Connection{
        hostAndPort.Port,
        hostAndPort.Host,
        envVars[DB_USER_KEY],
        envVars[DB_PASSWORD_KEY],
        envVars[DB_NAME_KEY],
    }

    taskService := services.TaskService{&dbConn}

    tasks, err := taskService.GetAll()
    if err != nil {
        log.Printf("%s", err.Error())
    } else {
        for i := range(tasks) {
            log.Printf("%+v", tasks[i])
        }
    }

    srv := server.New(&taskService)

    log.Fatal(srv.Start(server.DefaultPort))
}
