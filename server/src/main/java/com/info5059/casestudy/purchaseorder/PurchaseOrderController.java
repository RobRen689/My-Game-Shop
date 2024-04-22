package com.info5059.casestudy.purchaseorder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin
@RestController
public class PurchaseOrderController {
    @Autowired
    private PurchaseOrderDAO purchaseOrderDAO;
    @Autowired
    private PurchaseOrderRepository poRepository;

    @PostMapping("/api/pos")
    public ResponseEntity<PurchaseOrder> addOne(@RequestBody PurchaseOrder clientrep) { // use RequestBody here
        return new ResponseEntity<PurchaseOrder>(purchaseOrderDAO.create(clientrep), HttpStatus.OK);
    }

    @GetMapping("/api/pos")
    public ResponseEntity<Iterable<PurchaseOrder>> findAll() {
        Iterable<PurchaseOrder> pos = poRepository.findAll();
        return new ResponseEntity<Iterable<PurchaseOrder>>(pos, HttpStatus.OK);
    }

    @GetMapping("/api/pos/{vendorid}")
    public ResponseEntity<Iterable<PurchaseOrder>> findByVendorId(@PathVariable Long vendorid)
    {
        Iterable<PurchaseOrder> pos = poRepository.findByVendorid(vendorid);
        return new ResponseEntity<Iterable<PurchaseOrder>>(pos, HttpStatus.OK);
    }
}