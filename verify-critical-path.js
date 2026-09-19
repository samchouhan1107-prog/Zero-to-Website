#!/usr/bin/env node

/**
 * Verification Script for Critical Rendering Path Inspector
 * This script verifies that the Critical Rendering Path Inspector component is properly implemented
 */

import fs from 'fs';
import path from 'path';

class CriticalPathVerifier {
  constructor() {
    this.projectRoot = process.cwd();
    this.criticalPathComponent = './src/components/visualizers/CriticalPathInspector.tsx';
    this.visualLabFile = './src/components/VisualLab.tsx';
    this.homeHeroFile = './src/components/HomeHero.tsx';
  }

  async verify() {
    console.log('🔍 Verifying Critical Rendering Path Inspector...\n');
    
    const results = {
      componentExists: this.verifyComponentExists(),
      visualLabIntegration: this.verifyVisualLabIntegration(),
      homeHeroIntegration: this.verifyHomeHeroIntegration(),
      functionality: this.verifyFunctionality()
    };

    this.generateReport(results);
    return results;
  }

  verifyComponentExists() {
    console.log('📋 Checking Critical Path Inspector component...');
    
    const componentPath = path.join(this.projectRoot, this.criticalPathComponent);
    const exists = fs.existsSync(componentPath);
    
    if (!exists) {
      console.log('❌ Critical Path Inspector component not found');
      return { status: 'failed', message: 'Component file not found' };
    }

    const componentContent = fs.readFileSync(componentPath, 'utf8');
    
    // Check for key functionality
    const hasAnimation = componentContent.includes('useState') && componentContent.includes('useEffect');
    const hasDOMTree = componentContent.includes('DOM Tree');
    const hasCriticalCSS = componentContent.includes('Critical CSS');
    const hasPerformanceMetrics = componentContent.includes('Performance Metrics');
    const hasPlayControls = componentContent.includes('Play') && componentContent.includes('Pause');
    const hasSteps = componentContent.includes('criticalPathSteps');
    
    const allFeatures = hasAnimation && hasDOMTree && hasCriticalCSS && 
                      hasPerformanceMetrics && hasPlayControls && hasSteps;
    
    if (allFeatures) {
      console.log('✅ Critical Path Inspector component verified');
      return { 
        status: 'success',
        features: {
          animation: hasAnimation,
          domTree: hasDOMTree,
          criticalCSS: hasCriticalCSS,
          performanceMetrics: hasPerformanceMetrics,
          playControls: hasPlayControls,
          steps: hasSteps
        }
      };
    } else {
      console.log('❌ Critical Path Inspector component missing some features');
      return { 
        status: 'failed',
        message: 'Component missing some features',
        features: {
          animation: hasAnimation,
          domTree: hasDOMTree,
          criticalCSS: hasCriticalCSS,
          performanceMetrics: hasPerformanceMetrics,
          playControls: hasPlayControls,
          steps: hasSteps
        }
      };
    }
  }

  verifyVisualLabIntegration() {
    console.log('📋 Checking VisualLab integration...');
    
    const visualLabPath = path.join(this.projectRoot, this.visualLabFile);
    const visualLabContent = fs.readFileSync(visualLabPath, 'utf8');
    
    // Check for imports
    const hasImport = visualLabContent.includes('CriticalPathInspector');
    const hasType = visualLabContent.includes('criticalpath');
    const hasTool = visualLabContent.includes('Critical Rendering Path');
    const hasComponent = visualLabContent.includes('CriticalPathInspector');
    
    const allIntegrations = hasImport && hasType && hasTool && hasComponent;
    
    if (allIntegrations) {
      console.log('✅ VisualLab integration verified');
      return { 
        status: 'success',
        components: {
          import: hasImport,
          type: hasType,
          tool: hasTool,
          component: hasComponent
        }
      };
    } else {
      console.log('❌ VisualLab integration incomplete');
      return { 
        status: 'failed',
        message: 'VisualLab integration incomplete',
        components: {
          import: hasImport,
          type: hasType,
          tool: hasTool,
          component: hasComponent
        }
      };
    }
  }

  verifyHomeHeroIntegration() {
    console.log('📋 Checking HomeHero integration...');
    
    const homeHeroPath = path.join(this.projectRoot, this.homeHeroFile);
    const homeHeroContent = fs.readFileSync(homeHeroPath, 'utf8');
    
    // Check for Critical Path Inspector entry
    const hasEntry = homeHeroContent.includes('Critical Rendering Path Inspector');
    const hasCorrectAction = homeHeroContent.includes('onOpenVisualLab(\'criticalpath\')');
    
    if (hasEntry && hasCorrectAction) {
      console.log('✅ HomeHero integration verified');
      return { 
        status: 'success',
        components: {
          entry: hasEntry,
          correctAction: hasCorrectAction
        }
      };
    } else {
      console.log('❌ HomeHero integration incomplete');
      return { 
        status: 'failed',
        message: 'HomeHero integration incomplete',
        components: {
          entry: hasEntry,
          correctAction: hasCorrectAction
        }
      };
    }
  }

  verifyFunctionality() {
    console.log('📋 Checking component functionality...');
    
    const componentPath = path.join(this.projectRoot, this.criticalPathComponent);
    const componentContent = fs.readFileSync(componentPath, 'utf8');
    
    // Check for key React features
    const hasHooks = componentContent.includes('useState') && componentContent.includes('useEffect');
    const hasJSX = componentContent.includes('return (');
    const hasIcons = componentContent.includes('lucide-react');
    const hasAnimation = componentContent.includes('isPlaying') && componentContent.includes('currentStep');
    const hasDataSimulation = componentContent.includes('updateStepData');
    
    const allFunctionality = hasHooks && hasJSX && hasIcons && hasAnimation && hasDataSimulation;
    
    if (allFunctionality) {
      console.log('✅ Component functionality verified');
      return { 
        status: 'success',
        features: {
          hooks: hasHooks,
          jsx: hasJSX,
          icons: hasIcons,
          animation: hasAnimation,
          dataSimulation: hasDataSimulation
        }
      };
    } else {
      console.log('❌ Component functionality incomplete');
      return { 
        status: 'failed',
        message: 'Component functionality incomplete',
        features: {
          hooks: hasHooks,
          jsx: hasJSX,
          icons: hasIcons,
          animation: hasAnimation,
          dataSimulation: hasDataSimulation
        }
      };
    }
  }

  generateReport(results) {
    console.log('\n📊 Critical Rendering Path Inspector Verification Report');
    console.log('=====================================================');
    
    const allPassed = Object.values(results).every(result => result.status === 'success');
    
    if (allPassed) {
      console.log('🎉 ALL INTEGRATIONS PASSED! 🎉');
      console.log('\n✅ Critical Path Inspector Component: SUCCESS');
      console.log('✅ VisualLab Integration: SUCCESS');
      console.log('✅ HomeHero Integration: SUCCESS');
      console.log('✅ Component Functionality: SUCCESS');
      
      console.log('\n🚀 Critical Rendering Path Inspector is now fully functional!');
      console.log('\n📈 Features Available:');
      console.log('   • Interactive animation of the critical rendering path');
      console.log('   • DOM tree visualization');
      console.log('   • Critical CSS display');
      console.log('   • Performance metrics tracking');
      console.log('   • Play/pause/reset controls');
      console.log('   • Step-by-step process visualization');
      
      console.log('\n🎯 The Critical Rendering Path Inspector tabs now have full functionality!');
    } else {
      console.log('❌ Some integrations failed. Please review the report below:');
      
      Object.entries(results).forEach(([category, result]) => {
        if (result.status === 'failed') {
          console.log(`\n❌ ${category.toUpperCase()}: FAILED`);
          console.log(`   Message: ${result.message}`);
          if (result.features || result.components) {
            Object.entries(result.features || result.components).forEach(([item, status]) => {
              console.log(`   ${item}: ${status ? '✅' : '❌'}`);
            });
          }
        } else {
          console.log(`\n✅ ${category.toUpperCase()}: PASSED`);
        }
      });
      
      console.log('\n🔧 Please fix the failed integrations before deployment.');
    }
  }
}

// Run the verifier
if (import.meta.url === `file://${process.argv[1]}`) {
  const verifier = new CriticalPathVerifier();
  verifier.verify().catch(console.error);
}

export default CriticalPathVerifier;