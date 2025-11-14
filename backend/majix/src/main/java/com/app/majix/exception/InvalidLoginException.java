package com.app.majix.exception;

public class InvalidLoginException extends RuntimeException{
    public InvalidLoginException() {
        super("Invalid email or password");
    }

    // 🔹 Optional: Constructor with custom message
    public InvalidLoginException(String message) {
        super(message);
    }
}
