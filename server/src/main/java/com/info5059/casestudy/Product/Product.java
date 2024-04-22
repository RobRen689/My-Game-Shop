package com.info5059.casestudy.Product;

import lombok.Data;
import java.math.BigDecimal;

import jakarta.persistence.Basic;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
@Data
public class Product {
    @Id
    private String id;
    private int vendorid;
    private String name;
    private BigDecimal costprice;
    private BigDecimal msrp;
    private int rop;
    private int eoq;
    private int qoh;
    private int qoo;
    @Basic(optional = true)
    @Lob
    private byte[] qrcode;
    @Basic(optional = true)
    private String qrcodetxt;
}
