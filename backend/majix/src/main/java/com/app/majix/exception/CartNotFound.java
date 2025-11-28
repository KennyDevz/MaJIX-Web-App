package com.app.majix.exception;

public class CartNotFound extends  RuntimeException{
    public CartNotFound(){
        super("User cart not found. Please log in!");
    }

    public CartNotFound(String msg){
        super(msg);
    }
}
