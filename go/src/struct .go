package main

import (
	"fmt"
)
type Person struct {
	Name string
	Age int
}
func main(){
	// 结构体是将零个或多个任意类型的变量，组合在一起的聚合数据类型，也可以看做是数据的集合。
	var P1 Person
	P1.Name = "cmk"
	P1.Age = 12

	fmt.Println(P1)
}