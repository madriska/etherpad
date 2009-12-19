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

  sqlobj.createEnumType('billing_type', ['onetimepurchase', 'subscription']);
  sqlobj.createEnumType('billing_status', ['active', 'inactive']);

  sqlobj.createTable('billing_purchase', {
    id: idColspec,
    type: "billing_type",
    customer: "integer NOT NULL",
    product: "text NOT NULL",
    cost: "integer NOT NULL",
    coupon: "text NOT NULL",
    time: "timestamp",
    paidThrough: "timestamp",
    status: "billing_status"
  }, {
    type: true,
    customer: true,
    product: true
  });

  sqlobj.createEnumType('invoice_status', ['pending', 'paid', 'void', 'returned']);
  
  sqlobj.createTable('billing_invoice', {
    id: idColspec,
    time: "timestamp",
    purchase: "integer NOT NULL",
    amt: "integer NOT NULL",
    status: "invoice_status"
  }, {
    status: true
  });
  
  sqlobj.createEnumType('transaction_status', ['new', 'success', 'failure', 'pending']);

  sqlobj.createTable('billing_transaction', {
    id: idColspec,
    customer: "integer",
    time: "timestamp",
    amt: "integer",
    payInfo: "text",
    txnId: "text", // depends on gateway used?
    status: "transaction_status"
  }, {
    customer: true,
    txnId: true
  });
  
  sqlobj.createTable('billing_adjustment', {
    id: idColspec,
    transaction: "integer",
    invoice: "integer",
    time: "timestamp",
    amt: "integer"
  });
}
