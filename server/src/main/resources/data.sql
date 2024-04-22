-- Vendor data
INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email) VALUES ('123 Maple
    St','London','On', 'N1N-1N1','(555)555-5555','Trusted','ABC Supply Co.','abc@supply.com');
INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email) VALUES ('543
    Sycamore Ave','Toronto','On', 'N1P-1N1','(999)555-5555','Trusted','Big Bills Depot','bb@depot.com');
INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email) VALUES ('922 Oak
    St','London','On', 'N1N-1N1','(555)555-5599','Untrusted','Shady Sams','ss@underthetable.com');
INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email) VALUES ('922 Elm Ave',
    'London','On', 'N1N-2N2','(555)555-5678','Untrusted','Robert Ren','rr@mart.com');

-- Product data
INSERT INTO Product (Id,VendorId,Name,CostPrice,MSRP,ROP,EOQ,QOH,QOO,QrCode,QrCodeTxt) VALUES
    ('MK11',1,'Mortal Kombat 11 Replica',89.99,100.99,6,9,15,5,null,null);
INSERT INTO Product (Id,VendorId,Name,CostPrice,MSRP,ROP,EOQ,QOH,QOO,QrCode,QrCodeTxt) VALUES
    ('5x20',1,'Minato Aqua Figurine',115.14,131.99,5,11,20,0,null,null);
INSERT INTO Product (Id,VendorId,Name,CostPrice,MSRP,ROP,EOQ,QOH,QOO,QrCode,QrCodeTxt) VALUES
    ('KITTY',1,'Hello World Kitty Kat',29.99,35.99,40,10,100,50,null,null);
INSERT INTO Product (Id,VendorId,Name,CostPrice,MSRP,ROP,EOQ,QOH,QOO,QrCode,QrCodeTxt) VALUES
    ('BOC100',2,'Bocchi 100th Album Deluxe',100.99,120.99,30,10,50,0,null,null);
INSERT INTO Product (Id,VendorId,Name,CostPrice,MSRP,ROP,EOQ,QOH,QOO,QrCode,QrCodeTxt) VALUES
    ('FROGXD',2,'Frogger Sticker',0.99,1.99,200,50,500,50,null,null);
INSERT INTO Product (Id,VendorId,Name,CostPrice,MSRP,ROP,EOQ,QOH,QOO,QrCode,QrCodeTxt) VALUES
    ('FREE-LOL',3,'GUNDAM Freedom Limited',549.99,600.99,10,5,15,5,null,null);
INSERT INTO Product (Id,VendorId,Name,CostPrice,MSRP,ROP,EOQ,QOH,QOO,QrCode,QrCodeTxt) VALUES
    ('25x35',3,'EVA',209.99,254.89,17,8,25,3,null,null);
INSERT INTO Product (Id,VendorId,Name,CostPrice,MSRP,ROP,EOQ,QOH,QOO,QrCode,QrCodeTxt) VALUES
    ('IJNY66',3,'IJN Yamato Last Stand',498.99,610.99,20,10,40,5,null,null);
INSERT INTO Product (Id,VendorId,Name,CostPrice,MSRP,ROP,EOQ,QOH,QOO,QrCode,QrCodeTxt) VALUES
    ('USB-P',4,'USB Holder',10.99,12.99,23,10,77,11,null,null);
INSERT INTO Product (Id,VendorId,Name,CostPrice,MSRP,ROP,EOQ,QOH,QOO,QrCode,QrCodeTxt) VALUES
    ('BBS-BBS',4,'The Best Back Scratcher',17.49,21.59,5,5,25,0,null,null);
INSERT INTO Product (Id,VendorId,Name,CostPrice,MSRP,ROP,EOQ,QOH,QOO,QrCode,QrCodeTxt) VALUES
    ('NEW-LIFE',4,'Tomogachi Re-Birth',69.69,96.96,21,12,42,24,null,null);
