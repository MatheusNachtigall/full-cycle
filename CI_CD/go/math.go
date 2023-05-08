package main

import "fmt"

func main() {
	fmt.Println(Soma(112, 10))
}

func Soma(a int, b int) int {
	return a + b
}

func Sub(a int, b int) int {
	return a - b
}

func Mult(a int, b int) int {
	return a * b
}

func MultX(a int, b int) int {
	return a * b * a
}

func SomaX(a int, b int) int {
	return a + b + a
}

func SomaXX(a int, b int) int {
	return a + b + a + a
}

func SomaXXX(a int, b int) int {
	return a + b + a + a + a
}

func SomaXXXX(a int, b int) int {
	return a + b + a + a + a + a
}
