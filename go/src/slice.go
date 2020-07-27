package main

import (
	"fmt"
)

func main()  {
	/*
		切片是一种动态数组，比数组操作灵活，长度不是固定的，可以进行追加和删除。
		len() 和 cap() 返回结果可相同和不同。
	*/
	sli := [] int {1, 2, 3, 4, 5, 6}
	// sli[1] 输出2
	fmt.Println(sli[:]) // [1 2 3 4 5 6]
	fmt.Println(sli[1:]) // [2 3 4 5 6] 
	fmt.Println(sli[:4]) // [1 2 3 4]
	fmt.Println(sli[1:3]) // [2 3]
	fmt.Println(sli[0:3:4])
	// 追加切片
	sli = append(sli, 68)
	fmt.Println(sli[:])
}