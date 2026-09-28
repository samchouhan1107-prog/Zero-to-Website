// Chat Responsive Verification Script
// Quick verification that the responsive fixes are properly applied

console.log('🔍 Chat Responsive Verification Script');
console.log('=====================================');

// Check if the CSS file is loaded
function checkCSSFile() {
  const cssLinks = document.querySelectorAll('link[href*="chat-responsive.css"]');
  if (cssLinks.length > 0) {
    console.log('✅ chat-responsive.css is loaded');
    return true;
  } else {
    console.log('❌ chat-responsive.css is not loaded');
    return false;
  }
}

// Check if the TutorModal component has responsive classes
function checkTutorModalClasses() {
  const modal = document.querySelector('#tutor-modal-overlay');
  if (!modal) {
    console.log('❌ TutorModal not found (expected if not open)');
    return false;
  }

  const responsiveClasses = [
    'max-w-4xl',
    'h-[85vh]',
    'min-h-[600px]',
    'flex-1',
    'overflow-y-auto',
    'p-3',
    'sm:p-4',
    'gap-2',
    'sm:gap-3',
    'text-xs',
    'sm:text-sm',
    'min-h-[60px]',
    'min-h-[40px]',
    'overflow-x-auto',
    'grid-cols-1',
    'sm:grid-cols-2',
    'lg:grid-cols-3'
  ];

  let foundClasses = 0;
  responsiveClasses.forEach(className => {
    if (modal.classList.contains(className)) {
      console.log(`✅ Found responsive class: ${className}`);
      foundClasses++;
    } else {
      console.log(`❌ Missing responsive class: ${className}`);
    }
  });

  console.log(`📊 Responsive classes found: ${foundClasses}/${responsiveClasses.length}`);
  return foundClasses === responsiveClasses.length;
}

// Check media query support
function checkMediaQuerySupport() {
  const testElement = document.createElement('div');
  testElement.className = 'hidden sm:block';
  document.body.appendChild(testElement);

  const computedStyle = window.getComputedStyle(testElement);
  const display = computedStyle.display;

  document.body.removeChild(testElement);

  if (display !== 'none') {
    console.log('✅ Media queries are supported');
    return true;
  } else {
    console.log('❌ Media queries may not be supported');
    return false;
  }
}

// Check viewport meta tag
function checkViewportMeta() {
  const viewportMeta = document.querySelector('meta[name="viewport"]');
  if (viewportMeta) {
    const content = viewportMeta.getAttribute('content');
    if (content && content.includes('width=device-width')) {
      console.log('✅ Viewport meta tag is properly configured');
      return true;
    } else {
      console.log('❌ Viewport meta tag may not be properly configured');
      return false;
    }
  } else {
    console.log('❌ Viewport meta tag not found');
    return false;
  }
}

// Test responsive behavior
function testResponsiveBehavior() {
  console.log('\n📱 Testing responsive behavior...');

  // Test different viewport sizes
  const viewports = [
    { width: 375, height: 667, name: 'Mobile' },
    { width: 768, height: 1024, name: 'Tablet' },
    { width: 1920, height: 1080, name: 'Desktop' }
  ];

  viewports.forEach(viewport => {
    console.log(`\n📏 Testing ${viewport.name} viewport (${viewport.width}x${viewport.height})`);
    
    // Create a test element
    const testDiv = document.createElement('div');
    testDiv.style.width = viewport.width + 'px';
    testDiv.style.height = viewport.height + 'px';
    testDiv.style.overflow = 'hidden';
    testDiv.style.position = 'relative';
    
    document.body.appendChild(testDiv);
    
    // Check if responsive classes work
    const testElement = document.createElement('div');
    testElement.className = 'hidden sm:block';
    testDiv.appendChild(testElement);
    
    const computedStyle = window.getComputedStyle(testElement);
    const isHidden = computedStyle.display === 'none';
    
    console.log(`   - Hidden on mobile: ${isHidden ? '✅' : '❌'}`);
    
    document.body.removeChild(testDiv);
  });
}

// Run verification
function runVerification() {
  console.log('🚀 Starting verification...\n');
  
  const checks = [
    { name: 'CSS File', check: checkCSSFile },
    { name: 'Viewport Meta', check: checkViewportMeta },
    { name: 'Media Queries', check: checkMediaQuerySupport },
    { name: 'TutorModal Classes', check: checkTutorModalClasses }
  ];
  
  let passedChecks = 0;
  
  checks.forEach(({ name, check }) => {
    console.log(`\n🔍 Checking ${name}...`);
    if (check()) {
      passedChecks++;
    }
  });
  
  console.log(`\n📊 Verification Results: ${passedChecks}/${checks.length} checks passed`);
  
  if (passedChecks === checks.length) {
    console.log('✅ All checks passed! Responsive fixes are properly applied.');
  } else {
    console.log('❌ Some checks failed. Please review the implementation.');
  }
  
  // Test responsive behavior
  testResponsiveBehavior();
  
  return passedChecks === checks.length;
}

// Auto-run verification
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runVerification);
} else {
  runVerification();
}

// Export for manual testing
window.ChatResponsiveVerification = {
  runVerification,
  checkCSSFile,
  checkTutorModalClasses,
  checkMediaQuerySupport,
  checkViewportMeta,
  testResponsiveBehavior
};

console.log('🔧 ChatResponsiveVerification available on window object for manual testing');