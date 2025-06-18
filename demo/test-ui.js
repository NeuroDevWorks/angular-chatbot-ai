const http = require('http');

console.log('🧪 Testing AngularAI Demo UI...\n');

// Test 1: Check if main page loads
function testMainPage() {
  return new Promise((resolve, reject) => {
    const req = http.get('http://localhost:4200', (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log('✅ Main page test:');
        console.log(`   Status: ${res.statusCode}`);
        console.log(`   Content-Type: ${res.headers['content-type']}`);
        console.log(`   Content-Length: ${res.headers['content-length']}`);
        
        // Check for key elements
        const hasTitle = data.includes('AngularAI');
        const hasAppRoot = data.includes('<app-root>') || data.includes('app-root');
        const hasScripts = data.includes('main.js');
        
        console.log(`   Contains AngularAI: ${hasTitle ? '✅' : '❌'}`);
        console.log(`   Contains app-root: ${hasAppRoot ? '✅' : '❌'}`);
        console.log(`   Contains main.js: ${hasScripts ? '✅' : '❌'}`);
        
        resolve({
          status: res.statusCode,
          hasTitle,
          hasAppRoot,
          hasScripts,
          contentLength: res.headers['content-length']
        });
      });
    });
    
    req.on('error', (err) => {
      console.log('❌ Main page test failed:', err.message);
      reject(err);
    });
    
    req.setTimeout(5000, () => {
      console.log('❌ Main page test timed out');
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

// Test 2: Check if JavaScript files load
function testJavaScript() {
  return new Promise((resolve, reject) => {
    const req = http.get('http://localhost:4200/main.js', (res) => {
      console.log('\n✅ JavaScript test:');
      console.log(`   Status: ${res.statusCode}`);
      console.log(`   Content-Type: ${res.headers['content-type']}`);
      console.log(`   Size: ${res.headers['content-length']} bytes`);
      
      resolve({
        status: res.statusCode,
        contentType: res.headers['content-type'],
        size: res.headers['content-length']
      });
    });
    
    req.on('error', (err) => {
      console.log('❌ JavaScript test failed:', err.message);
      reject(err);
    });
    
    req.setTimeout(5000, () => {
      console.log('❌ JavaScript test timed out');
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

// Test 3: Check if CSS files load
function testCSS() {
  return new Promise((resolve, reject) => {
    const req = http.get('http://localhost:4200/styles.css', (res) => {
      console.log('\n✅ CSS test:');
      console.log(`   Status: ${res.statusCode}`);
      console.log(`   Content-Type: ${res.headers['content-type']}`);
      console.log(`   Size: ${res.headers['content-length']} bytes`);
      
      resolve({
        status: res.statusCode,
        contentType: res.headers['content-type'],
        size: res.headers['content-length']
      });
    });
    
    req.on('error', (err) => {
      console.log('❌ CSS test failed:', err.message);
      reject(err);
    });
    
    req.setTimeout(5000, () => {
      console.log('❌ CSS test timed out');
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

// Run all tests
async function runTests() {
  try {
    const mainTest = await testMainPage();
    const jsTest = await testJavaScript();
    const cssTest = await testCSS();
    
    console.log('\n🎉 Test Summary:');
    console.log('================');
    
    const allPassed = 
      mainTest.status === 200 && 
      mainTest.hasTitle && 
      mainTest.hasAppRoot && 
      mainTest.hasScripts &&
      jsTest.status === 200 &&
      cssTest.status === 200;
    
    if (allPassed) {
      console.log('✅ ALL TESTS PASSED - UI is loading correctly!');
      console.log('🌐 Demo is ready at: http://localhost:4200');
    } else {
      console.log('❌ Some tests failed - check the details above');
    }
    
  } catch (error) {
    console.log('❌ Test suite failed:', error.message);
  }
}

runTests();
