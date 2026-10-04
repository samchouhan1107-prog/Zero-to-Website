#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const serverBundle = path.join(__dirname, 'dist', 'server.cjs');

if (!fs.existsSync(serverBundle)) {
  console.error('Server bundle is missing. Run "npm run build" before starting the API.');
  process.exit(1);
}

require(serverBundle);