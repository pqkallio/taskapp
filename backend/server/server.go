package server

import (
    "tasks-backend/services"

    "github.com/gin-gonic/gin"

    "fmt"
)

const (
    DefaultPort = "6868"
)

type Server struct {
   router *gin.Engine
   taskService *services.TaskService
}

func New(taskService *services.TaskService) *Server {
    router := gin.New()

    router.Use(gin.Logger())
    router.Use(gin.Recovery())

    server := &Server{
        router,
        taskService,
    }

    return server
}

func (s *Server) Start(port string) error {
    s.initRoutes()

    address := fmt.Sprintf(":%s", port)
    return s.router.Run(address)
}
