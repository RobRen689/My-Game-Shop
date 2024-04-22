package com.info5059.casestudy.purchaseorder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.info5059.casestudy.Product.Product;
import com.info5059.casestudy.Product.ProductRepository;

import jakarta.persistence.EntityManager;
//import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceContext;
import java.time.LocalDateTime;

@Component
public class PurchaseOrderDAO {
    @Autowired
    private ProductRepository prodRepo;

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public PurchaseOrder create(PurchaseOrder clientrep) {
        PurchaseOrder realPurchaseOrder = new PurchaseOrder();
        realPurchaseOrder.setPodate(LocalDateTime.now());
        realPurchaseOrder.setVendorid(clientrep.getVendorid());
        realPurchaseOrder.setAmount(clientrep.getAmount());
        entityManager.persist(realPurchaseOrder);

        for (PurchaseOrderLineItem item : clientrep.getItems()) {
            PurchaseOrderLineItem realItem = new PurchaseOrderLineItem();
            realItem.setPoid(realPurchaseOrder.getId());
            realItem.setProductid(item.getProductid());
            realItem.setQty(item.getQty());
            realItem.setPrice(item.getPrice());
            entityManager.persist(realItem);

            // we also need to update the QOO on the product table
            Product prod = prodRepo.getReferenceById(item.getProductid());
            prod.setQoo(prod.getQoo() + item.getQty());
            prodRepo.saveAndFlush(prod);
        }

        entityManager.flush();
        entityManager.refresh(realPurchaseOrder);
        return realPurchaseOrder;
    }
}
