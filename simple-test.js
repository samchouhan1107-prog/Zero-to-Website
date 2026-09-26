// Simple test to check if the server can start
try {
  console.log("Testing server dependencies...");
  
  // Check if required modules exist
  const fs = require('fs');
  const path = require('path');
  const express = require('express');
  
  console.log("✅ All dependencies are available");
  
  // Check if data directory can be created
  const DB_DIR = path.join(process.cwd(), "data");
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
    console.log("✅ Data directory created");
  } else {
    console.log("✅ Data directory already exists");
  }
  
  // Check if database can be initialized
  const DB_PATH = path.join(DB_DIR, "webzonebw.json");
  if (!fs.existsSync(DB_PATH)) {
    const defaultData = {
      users: [],
      sessions: [],
      progress: []
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(defaultData, null, 2));
    console.log("✅ Database initialized");
  } else {
    console.log("✅ Database already exists");
  }
  
  console.log("✅ All server prerequisites are ready!");
  
} catch (error) {
  console.error("❌ Error:", error.message);
}