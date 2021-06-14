package com.modimoa.backend.controller;

import com.modimoa.backend.domain.Product;
import com.modimoa.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService = new ProductService();

    @GetMapping("")
    public String getAllProducts(){

        String result = "";

        for(Product pr: productService.getAllProducts()){
            result += pr + "</br>";
        }
        return result;
    }

    @GetMapping("/{productId}")
    public String getProductByProductId(@PathVariable Long productId){

        String result = "";
        Product pr = productService.getProductByProductId(productId);
        result += pr;
        return result;
    }
}
