package server

import (
	"tasks-backend/services"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"fmt"
	"net/http"
	"time"
)

const (
	DefaultPort = "6868"
)

type Server struct {
	router      *gin.Engine
	taskService *services.TaskService
}

func New(taskService *services.TaskService) *Server {
	router := gin.New()
	corsConfig := cors.New(cors.Config{
		AllowOrigins:  []string{"http://localhost:8080"},
		AllowMethods:  []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete, http.MethodOptions},
		AllowHeaders:  []string{"Content-Type", "Origin"},
		ExposeHeaders: []string{"Content-Length", "Content-Type", "Access-Control-Allow-Origin"},
		MaxAge:        50 * time.Second,
	})

	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	router.Use(corsConfig)

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
