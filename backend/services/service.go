package services

type Service interface {
    Create(interface{}) (interface{}, error)
    GetAll() ([]interface{}, error)
    Update(id uint) (interface{}, error)
    Delete(id uint) (interface{}, error)
}
