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
	fmt.Println(sli[1:]) // [2 3 4 5 6] // 默认结束索引为len(sli)
	fmt.Println(sli[:4]) // [1 2 3 4] // 默认开始索引为0，
	fmt.Println(sli[1:3]) // [2 3] 截取索引为1（包含）到索引为3（不包含）
	fmt.Println(sli[0:3:4])
	// 追加切片
	sli = append(sli, 68)
	fmt.Println(sli[:])
	// 空(nil)切片 默认为nil
}