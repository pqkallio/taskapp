package server

const (
	taskEndpoint = "tasks"
)

func (s *Server) initRoutes() {
	api := s.router.Group(taskEndpoint)
	{
		api.GET("/", s.getAllTasks())
		api.GET("", s.getAllTasks())
		api.POST("/", s.createTask())
		api.POST("", s.createTask())
		api.PUT("/:id/done", s.taskDone())
		api.PUT("/:id/done/", s.taskDone())
	}
}
