package com.app.majix.exception;

public class OutOfStockException extends RuntimeException{
    public OutOfStockException(String msg){
        super(msg);
    }
}
