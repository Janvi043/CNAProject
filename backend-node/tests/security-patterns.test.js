const fs = require('fs');
const path = require('path');

console.log('🔍 DevSecOps Security Pattern Analysis');
console.log('=====================================');

const appFile = path.join(__dirname, '..', 'server.js');

if (!fs.existsSync(appFile)) {
    console.log('Server file not found');
    process.exit(1);
}

const appContent = fs.readFileSync(appFile, 'utf8');

let vulnerabilityCount = 0;

// SQL Injection

console.log('\n1. SQL Injection Pattern Detection:');

const sqlPatterns = [
    /SELECT.*\$\{/g,
    /INSERT.*\$\{/g,
    /UPDATE.*\$\{/g,
    /DELETE.*\$\{/g
];

let sqlFound = false;

sqlPatterns.forEach(pattern => {
    if (appContent.match(pattern)) {
        sqlFound = true;
    }
});

if (sqlFound) {
    console.log('🚨 SQL Injection Pattern Found');
    vulnerabilityCount++;
} else {
    console.log('✅ No SQL Injection Patterns');
}

// Weak Crypto

console.log('\n2. Weak Cryptography Detection:');

const md5Pattern = /createHash\(['"]md5['"]\)/g;

if (appContent.match(md5Pattern)) {
    console.log('🚨 MD5 Detected');
    vulnerabilityCount++;
} else {
    console.log('✅ No Weak Hashing');
}

// Path Traversal

console.log('\n3. Path Traversal Detection:');

const pathPatterns = [
    /req\.params\.filename/g,
    /res\.download\(.*filename/g
];

let pathFound = false;

pathPatterns.forEach(pattern => {
    if (appContent.match(pattern)) {
        pathFound = true;
    }
});

if (pathFound) {
    console.log('🚨 Path Traversal Pattern Found');
    vulnerabilityCount++;
} else {
    console.log('✅ No Path Traversal Patterns');
}

// XSS

console.log('\n4. XSS Detection:');

const xssPatterns = [
    /\$\{username\}/g,
    /res\.send\(.*username/g
];

let xssFound = false;

xssPatterns.forEach(pattern => {
    if (appContent.match(pattern)) {
        xssFound = true;
    }
});

if (xssFound) {
    console.log('🚨 XSS Pattern Found');
    vulnerabilityCount++;
} else {
    console.log('✅ No XSS Patterns');
}

console.log('\n=== SECURITY ANALYSIS SUMMARY ===');

if (vulnerabilityCount > 0) {
    console.log(`❌ Vulnerabilities Found: ${vulnerabilityCount}`);
    process.exit(1);
}

console.log('🎉 Security Test Passed');