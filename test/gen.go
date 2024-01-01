package main

import (
	"bytes"
	"encoding/json"
	"net/http"
)

type Person struct {
	Name string `json:"name"`
	Age  int    `json:"age"`
}

func (a *ApiMethod) MakeApiCall() (interface{}, error) {
	var reqBody []byte
	var err error
	if a.reqBodyType != nil {
		reqBody, err = json.Marshal(a.reqBodyType)
		if err != nil {
			return nil, err
		}
	}
	req, err := http.NewRequest(a.method, a.url, bytes.NewBuffer(reqBody))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()

	var resBody interface{}
	if a.resBodyType != nil {
		resBody = a.resBodyType
		err = json.NewDecoder(res.Body).Decode(resBody)
		if err != nil {
			return nil, err
		}
	}
	return resBody, nil
}

//func (a *ApiClient) GenerateCode() string {
//	var buf bytes.Buffer
//	for _, m := range a.methods {
//		buf.WriteString(fmt.Sprintf("func (a *ApiClient) %s() (interface{}, error) {\n", m.functionName))
//		buf.WriteString("\treturn a.MakeApiCall(m.url, m.method, m.reqBodyType, m.resBodyType)\n")
//		buf.WriteString("}\n\n")
//	}
//	return buf.String()
//}

//func (a *ApiClient) GenerateCode() string {
//	var buf bytes.Buffer
//	for _, m := range a.methods {
//		resType := reflect.TypeOf(m.resBodyType).Elem()
//		buf.WriteString(fmt.Sprintf("func (a *ApiClient) %s() (*%s, error) {\n", m.functionName, resType))
//		buf.WriteString("\tvar res " + resType.String() + "\n")
//		buf.WriteString("\tres, err := a.MakeApiCall(m.url, m.method, m.reqBodyType, &res)\n")
//		buf.WriteString("\tif err != nil {\n")
//		buf.WriteString("\t\treturn nil, err\n")
//		buf.WriteString("\t}\n")
//		buf.WriteString("\treturn &res, nil\n")
//		buf.WriteString("}\n\n")
//	}
//	return buf.String()
//}

//func main() {
//	methods := []*ApiMethod{
//		NewApiMethod("GetPerson", "https://www.example.com/person", "GET", nil, &Person{}),
//		NewApiMethod("CreatePerson", "https://www.example.com/person", "POST", &Person{}, &Person{}),
//	}
//	apiClient := NewApiClient(methods)
//	fmt.Println(apiClient.GenerateCode())
//}
