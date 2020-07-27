package main
import (
	"fmt"
)
/*
 数据类型
 字符串 string	只能用一对双引号（""）或反引号（``）括起来定义，不能用单引号（''）定义！
 布尔类型 bool 只有 true 和 false，默认为 false
 数字 整型 int8 uint8 int16 uint16 int32 uint32 int64 uint64
      浮点型 float32 float64
*/
func main() {
	// ### 常量 在程序编译阶段就确定下来的值，而程序在运行时无法改变该值
	// ## 单个常量的声明
	// 系统自行判断类型
	const name = "cmk"
	// 声明类型
	const myName string = "cmk" 
	// ## 多个常量声明
	const age, sex = 19, "man" // 自行判断类型
	const myAge, mySex string  = "20", "man"
	
	/* 单个变量声明 
		var 变量名称 数据类型 = 变量值
		var 变量名称 = 变量值
		变量名称 := 变量值 省略了 var 和数据类型，变量名称一定要是未声明过的。 
	*/

	/* 多个变量声明
	  var 变量名称,变量名称 ... ,数据类型 = 变量值,变量值 ...
		var 变量名称,变量名称 ... = 变量值,变量值 ...
		变量名称,变量名称 ... := 变量值,变量值 ...
	*/
	/*
	 输出方法
   fmt.Print：输出到控制台（仅只是输出）
   fmt.Println：输出到控制台并换行
   fmt.Printf：仅输出格式化的字符串和字符串变量（整型和整型变量不可以）
   fmt.Sprintf：格式化并返回一个字符串，不输出。
	*/
	fmt.Print(mySex)
	fmt.Println(name)
}