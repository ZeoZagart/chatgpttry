package main

var apimethods = []*ApiMethod{
	NewApiMethod("GetPerson", "https://www.example.com/person", "GET", nil, &Person{}),
	NewApiMethod("CreatePerson", "https://www.example.com/person", "POST", &Person{}, &Person{}),
}
