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

import("sqlbase.sqlcommon");
import("sqlbase.sqlobj");

function run() {
  ['pro_domains', 'pro_users', 'pro_padmeta'].forEach(function(t) {
    if (sqlcommon.doesTableExist(t)) {
      sqlobj.dropTable(t);
    }
  });

  sqlobj.createTable('pro_domains', {
    id: sqlobj.getIdColspec(),
    subDomain: 'text UNIQUE NOT NULL',
    extDomain: 'text DEFAULT NULL',
    orgName: 'text'
  });

  sqlobj.createIndex('pro_domains', ['subDomain']);
  sqlobj.createIndex('pro_domains', ['extDomain']);

  sqlobj.createTable('pro_users', {
    id: sqlobj.getIdColspec(),
    domainId: 'integer NOT NULL',
    fullName: 'text NOT NULL',
    email: 'text NOT NULL',  // not unique because same
                             // email can be on multiple domains.
    passwordHash: 'text NOT NULL',
    createdDate: sqlobj.getDateColspec("NOT NULL"),
    lastLoginDate: sqlobj.getDateColspec("DEFAULT NULL"),
    isAdmin: sqlobj.getBoolColspec("DEFAULT 0")
  });

  sqlobj.createTable('pro_padmeta', {
    id: sqlobj.getIdColspec(),
    domainId: 'integer NOT NULL',
    localPadId: 'text NOT NULL',
    title: 'text',
    creatorId: 'integer DEFAULT NULL',
    createdDate: sqlobj.getDateColspec("NOT NULL"),
    lastEditorId: 'integer DEFAULT NULL',
    lastEditedDate: sqlobj.getDateColspec("DEFAULT NULL")
  });

  sqlobj.createIndex('pro_padmeta', ['domainId', 'localPadId']);

  var pneDomain = "<<private-network>>";
  if (!sqlobj.selectSingle('pro_domains', {subDomain: pneDomain})) {
    sqlobj.insert('pro_domains', {subDomain: pneDomain});
  }
}

