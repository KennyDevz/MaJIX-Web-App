package com.app.majix.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Returns {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long returnId;
    private String reason;
    private String status;
    private String requestDate;

    //constructor
    public Returns(){

    }

    public Returns(String reason, String status, String requestDate){
        this.reason = reason;
        this.status = status;
        this.requestDate = requestDate;
    }

    //setter and getters
    public void setReturnId(Long returnId){
        this.returnId = returnId;
    }

    public void setReason(String reason){
        this.reason = reason;
    }

    public void setStatus(String status){
        this.status = status;
    }

    public void setRequestDate(String requestDate){
        this.requestDate = requestDate;
    }

    public Long getReturnId(){
        return returnId;
    }

    public String getReason(){
        return reason;
    }

    public String getStatus(){
        return status;
    }

    public String getRequestDate(){
        return requestDate;
    }
}
