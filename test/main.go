package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"go/ast"
	"go/parser"
	"go/token"
	"os"
	"path/filepath"
	"reflect"
	"strings"
)

type ApiMethod struct {
	functionName string
	url          string
	method       string
	reqBodyType  interface{}
	resBodyType  interface{}
}

func NewApiMethod(functionName string, endpoint string, method string, reqBody interface{}, resBody interface{}) *ApiMethod {
	return &ApiMethod{
		functionName: functionName,
		url:          endpoint,
		method:       method,
		reqBodyType:  reqBody,
		resBodyType:  resBody,
	}
}

type ApiClient struct {
	methods []*ApiMethod
}

func NewApiClient(methods []*ApiMethod) *ApiClient {
	return &ApiClient{methods: methods}
}

func main() {
	var apimethods []*ApiMethod
	// Get the current directory
	dir, _ := os.Getwd()
	// Search for all Go files in the directory
	filepath.Walk(dir, func(path string, info os.FileInfo, err error) error {
		if strings.HasSuffix(path, "_clientdesc.go") {
			fset := token.NewFileSet()
			// Parse the Go file
			f, err := parser.ParseFile(fset, path, nil, parser.AllErrors)
			if err != nil {
				fmt.Printf("Error: %v", err)
				return nil
			}
			// Traverse the AST and extract the value of the apimethods variable
			ast.Inspect(f, func(n ast.Node) bool {
				var x *ast.ValueSpec
				var ok bool
				if x, ok = n.(*ast.ValueSpec); ok {
					if x.Names[0].Name == "apimethods" {
						jsonStr := x.Values[0].(*ast.CompositeLit).Elts[0].(*ast.BasicLit).Value
						json.Unmarshal([]byte(jsonStr), &apimethods)
					}
				}
				return true
			})
		}
		return nil
	})
	// Generate the HTTP client
	apiClient := NewApiClient(apimethods)
	fmt.Println(apiClient.GenerateCode())
	// Write the generated code to a file
	clientFile, _ := os.Create("client.go")
	defer clientFile.Close()
	clientFile.WriteString(apiClient.GenerateCode())
}

func (a *ApiClient) GenerateCode() string {
	var buf bytes.Buffer
	for _, m := range a.methods {
		resType := reflect.TypeOf(m.resBodyType).Elem()
		buf.WriteString(fmt.Sprintf("func (a ApiClient) %s() (%s, error) {\n", m.functionName, resType))
		buf.WriteString("\tvar res " + resType.String() + "\n")
		buf.WriteString("\tres, err := a.MakeApiCall(m.url, m.method, m.reqBodyType, &res)\n")
		buf.WriteString("\tif err != nil {\n")
		buf.WriteString("\t\treturn nil, err\n")
		buf.WriteString("\t}\n")
		buf.WriteString("\treturn &res, nil\n")
		buf.WriteString("}\n\n")
	}
	return buf.String()
}
