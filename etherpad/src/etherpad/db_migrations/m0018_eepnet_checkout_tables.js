/**
 * Copyright 2009 Google Inc.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import("etherpad.utils.isPrivateNetworkEdition");
import("sqlbase.sqlobj");

function run() {
  if (isPrivateNetworkEdition()) {
    return;
  }
  
  var idColspec = "SERIAL PRIMARY KEY";

  sqlobj.createEnumType('purchase_type', ['creditcard', 'invoice', 'paypal']);

  sqlobj.createTable('checkout_purchase', {
    id: idColspec,
    invoiceId: "integer NOT NULL",
    owner: "text NOT NULL",
    email: "text NOT NULL",
    organization: "text NOT NULL",
    firstName: "text NOT NULL",
    lastName: "text NOT NULL",
    addressLine1: "text NOT NULL",
    addressLine2: "text NOT NULL",
    city: "text NOT NULL",
    state: "VARCHAR(2) NOT NULL",
    zip: "VARCHAR(10) NOT NULL",
    numUsers: "integer NOT NULL",
    date: "TIMESTAMP NOT NULL",
    cents: "integer NOT NULL",
    referral: "VARCHAR(8)",
    receiptEmail: "TEXT",
    purchaseType: "purchase_type",
    licenseKey: "text"
  }, {
    email: true,
    invoiceId: true
  });
  
  sqlobj.createTable('checkout_referral', {
    id: "text NOT NULL PRIMARY KEY",
    productPctDiscount: "integer",
    supportPctDiscount: "integer",
    totalPctDiscount: "integer",
    freeUsersCount: "integer",
    freeUsersPct: "integer"
  });
  
  // add a sample referral code.
  sqlobj.insert('checkout_referral', {
    id: 'EPCO6128',
    productPctDiscount: 50,
    supportPctDiscount: 25,
    totalPctDiscount: 15,
    freeUsersCount: 20,
    freeUsersPct: 10
  });
  
  // add a "free" referral code.
  sqlobj.insert('checkout_referral', {
    id: 'EP99FREE',
    totalPctDiscount: 99
  });
  
  sqlobj.insert('checkout_referral', {
    id: 'EPFREE68',
    totalPctDiscount: 100
  });
  
}
