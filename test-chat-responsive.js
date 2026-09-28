// Chat Modal Responsive Testing Script
// This script helps test the responsive behavior of the TutorModal component

console.log('🧪 Chat Modal Responsive Testing Script');
console.log('=====================================');

// Test breakpoints
const breakpoints = [
  { name: 'Mobile Small', width: 375, height: 667 },
  { name: 'Mobile Large', width: 414, height: 736 },
  { name: 'Tablet Small', width: 768, height: 1024 },
  { name: 'Tablet Large', width: 1024, height: 768 },
  { name: 'Desktop Small', width: 1280, height: 720 },
  { name: 'Desktop Large', width: 1920, height: 1080 }
];

// CSS selectors to test
const selectors = [
  '#tutor-modal-overlay',
  '#tutor-modal-overlay .w-full.max-w-4xl',
  '#tutor-modal-overlay .flex-1.overflow-y-auto',
  '#tutor-modal-overlay .max-w-85\\%',
  '#tutor-modal-overlay .max-w-80\\%',
  '#tutor-modal-overlay .whitespace-pre-wrap',
  '#tutor-modal-overlay .text-xs',
  '#tutor-modal-overlay .text-sm',
  '#tutor-modal-overlay .min-h-\\[60px\\]',
  '#tutor-modal-overlay .min-h-\\[40px\\]',
  '#tutor-modal-overlay .overflow-x-auto',
  '#tutor-modal-overlay .grid-cols-1',
  '#tutor-modal-overlay .grid-cols-2',
  '#tutor-modal-overlay .grid-cols-3'
];

// Function to simulate viewport resize
function simulateViewport(width, height) {
  console.log(`\n📱 Testing at ${width}x${height} (${getDeviceType(width)})`);
  
  // Create a test element
  const testDiv = document.createElement('div');
  testDiv.style.width = width + 'px';
  testDiv.style.height = height + 'px';
  testDiv.style.overflow = 'hidden';
  testDiv.style.position = 'relative';
  
  // Add test content
  testDiv.innerHTML = `
    <div style="width: 100%; height: 100%; background: #f0f0f0; display: flex; align-items: center; justify-content: center;">
      <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <h3>Chat Modal Test</h3>
        <p>Viewport: ${width}x${height}</p>
        <p>Device: ${getDeviceType(width)}</p>
      </div>
    </div>
  `;
  
  document.body.appendChild(testDiv);
  
  // Test CSS rules
  testSelectors(selectors);
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(testDiv);
  }, 1000);
}

// Function to get device type
function getDeviceType(width) {
  if (width < 768) return 'Mobile';
  if (width < 1024) return 'Tablet';
  return 'Desktop';
}

// Function to test CSS selectors
function testSelectors(selectors) {
  selectors.forEach(selector => {
    const element = document.querySelector(selector);
    if (element) {
      const styles = window.getComputedStyle(element);
      console.log(`✅ ${selector}: Found element`);
      console.log(`   - Width: ${styles.width}`);
      console.log(`   - Height: ${styles.height}`);
      console.log(`   - Overflow: ${styles.overflow}`);
      console.log(`   - Display: ${styles.display}`);
    } else {
      console.log(`❌ ${selector}: Element not found`);
    }
  });
}

// Function to test responsive classes
function testResponsiveClasses() {
  console.log('\n🎨 Testing Responsive Classes:');
  
  const testClasses = [
    'hidden sm:inline',
    'hidden sm:block',
    'flex-col sm:flex-row',
    'grid-cols-1 sm:grid-cols-2',
    'text-xs sm:text-sm',
    'p-2 sm:p-3',
    'gap-2 sm:gap-3'
  ];
  
  testClasses.forEach(className => {
    const element = document.createElement('div');
    element.className = className;
    document.body.appendChild(element);
    
    const computedStyle = window.getComputedStyle(element);
    const display = computedStyle.display;
    const flexDirection = computedStyle.flexDirection;
    
    console.log(`📏 ${className}: display=${display}, flexDirection=${flexDirection}`);
    
    document.body.removeChild(element);
  });
}

// Function to test overflow behavior
function testOverflowBehavior() {
  console.log('\n🔄 Testing Overflow Behavior:');
  
  const overflowTests = [
    { selector: '#tutor-modal-overlay .whitespace-pre-wrap', property: 'overflow-wrap' },
    { selector: '#tutor-modal-overlay .max-w-85\\%', property: 'max-width' },
    { selector: '#tutor-modal-overlay .overflow-x-auto', property: 'overflow-x' }
  ];
  
  overflowTests.forEach(test => {
    const element = document.querySelector(test.selector);
    if (element) {
      const style = window.getComputedStyle(element);
      console.log(`📐 ${test.selector}: ${test.property} = ${style[test.property]}`);
    }
  });
}

// Run tests
function runTests() {
  console.log('🚀 Starting responsive tests...\n');
  
  // Test different viewports
  breakpoints.forEach(breakpoint => {
    simulateViewport(breakpoint.width, breakpoint.height);
  });
  
  // Test responsive classes
  testResponsiveClasses();
  
  // Test overflow behavior
  testOverflowBehavior();
  
  console.log('\n✅ All tests completed!');
}

// Auto-run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runTests);
} else {
  runTests();
}

// Export functions for manual testing
window.ChatModalTests = {
  simulateViewport,
  testResponsiveClasses,
  testOverflowBehavior,
  runTests
};

console.log('🔧 ChatModalTests available on window object for manual testing');