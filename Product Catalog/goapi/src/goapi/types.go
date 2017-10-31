package main

type product struct {
		category			string
		productId 			int
		productName			string
		productSize			string
		price				float64
		inStock				string
}

type order struct {
		orderId				string
		productId			string
		quantity			int

}

var orders map[string] order