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

import("sqlbase.sqlobj");
import("sqlbase.sqlcommon");

function run() {
  sqlobj.renameTable('pro_users', 'pro_accounts');
  sqlobj.renameTable('pro_users_auto_signin', 'pro_accounts_auto_signin');
  sqlobj.renameColumn('pro_accounts_auto_signin', 'userId', 'accountId');
  sqlobj.modifyColumn('pro_accounts_auto_signin', 'accountId', 'integer');
  sqlobj.execute('alter table pro_accounts_auto_signin add unique ("accountId");');
  sqlobj.execute('alter table pro_accounts_auto_signin alter "accountId" set not null;');
  sqlobj.createIndex('pro_accounts_auto_signin', ['accountId']);
}

