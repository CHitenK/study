package main

import (
	"fmt"
)

func main()  {
	// 数组是一个由固定长度的特定类型元素组成的序列，一个数组可以由零个或多个元素组成，一旦声明了，数组的长度就固定了，不能动态变化。
	// len() 和 cap() 返回结果始终一样。
	// 一维数组 var 变量 = [长度] 类型 {...}
	// 一维数组 变量 := [长度] 类型 {...}
	var arr_1  = [5] int {1,2,3,4,5}
	var balance = [...] float32 {1000.0, 2.0, 3.4, 7.0, 50.0} // 不设置长度
	fmt.Println(arr_1)
	fmt.Println(balance)
	// 遍历
	var intArray [10] int
	var i int
	for i = 0; i < 10; i++ {
		intArray[i] = i
		fmt.Println(intArray[i])
	}
}