package main
import "fmt"

func main() {
	// 声明map var map_variable map[key_data_type]value_data_type
	var myMap map[string]string // map[]
	myMap1 := make(map[string]string)
	/* 创建map */
	myMap2 := map[string]string{"France": "Paris", "Italy": "Rome", "Japan": "Tokyo", "India": "New delhi"}
	fmt.Println(myMap) // map[]
	fmt.Println(myMap1) // map[]
	fmt.Println(myMap2)
	myMap1["name"] = "cmk"
	myMap1["sex"] = "man"
	name, ok := myMap1["name"]
	fmt.Println(name) // name
	fmt.Println(ok) // true
	
	// delete() 函数用于删除集合的元素, 参数为 map 和其对应的 key delete(map, key)
	delete(myMap2, "France")
}