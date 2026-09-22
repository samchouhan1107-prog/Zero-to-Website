import React, { useState, useEffect, useRef } from 'react';
import { Globe, Code, Palette, Zap, Server, Smartphone, Cloud } from 'lucide-react';

interface TechNode {
  id: string;
  name: string;
  icon: any;
  x: number;
  y: number;
  z: number;
  connections: string[];
  color: string;
  description: string;
}

const TechGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<TechNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<TechNode | null>(null);

  const techNodes: TechNode[] = [
    {
      id: 'html',
      name: 'HTML5',
      icon: Code,
      x: 1, y: 0, z: 0,
      connections: ['css', 'js'],
      color: '#e34c26',
      description: 'Semantic structure and content markup'
    },
    {
      id: 'css',
      name: 'CSS3',
      icon: Palette,
      x: 0, y: 1, z: 0,
      connections: ['html', 'js', 'responsive'],
      color: '#1572b6',
      description: 'Styling, layout, and visual design'
    },
    {
      id: 'js',
      name: 'JavaScript',
      icon: Zap,
      x: 0, y: 0, z: 1,
      connections: ['html', 'css', 'react'],
      color: '#f7df1e',
      description: 'Dynamic behavior and interactivity'
    },
    {
      id: 'react',
      name: 'React',
      icon: Server,
      x: -1, y: 0, z: 0,
      connections: ['js', 'components'],
      color: '#61dafb',
      description: 'Component-based UI framework'
    },
    {
      id: 'responsive',
      name: 'Responsive',
      icon: Smartphone,
      x: 0, y: -1, z: 0,
      connections: ['css', 'mobile'],
      color: '#ff6b6b',
      description: 'Mobile-first design approach'
    },
    {
      id: 'components',
      name: 'Components',
      icon: Code,
      x: 0, y: 0, z: -1,
      connections: ['react', 'ui'],
      color: '#4ecdc4',
      description: 'Reusable UI building blocks'
    },
    {
      id: 'mobile',
      name: 'Mobile',
      icon: Smartphone,
      x: 0.5, y: 0.5, z: 0.5,
      connections: ['responsive', 'performance'],
      color: '#45b7d1',
      description: 'Mobile optimization and touch'
    },
    {
      id: 'performance',
      name: 'Performance',
      icon: Zap,
      x: -0.5, y: -0.5, z: -0.5,
      connections: ['mobile', 'web'],
      color: '#96ceb4',
      description: 'Speed optimization and loading'
    },
    {
      id: 'web',
      name: 'Web APIs',
      icon: Globe,
      x: 0.7, y: -0.7, z: 0,
      connections: ['performance', 'security'],
      color: '#dda0dd',
      description: 'Browser APIs and services'
    },
    {
      id: 'security',
      name: 'Security',
      icon: Shield,
      x: -0.7, y: 0.7, z: 0,
      connections: ['web', 'authentication'],
      color: '#ff8c94',
      description: 'Web security best practices'
    },
    {
      id: 'authentication',
      name: 'Auth',
      icon: User,
      x: 0, y: 0, z: 0.8,
      connections: ['security', 'backend'],
      color: '#ff6b9d',
      description: 'User authentication systems'
    },
    {
      id: 'backend',
      name: 'Backend',
      icon: Server,
      x: 0, y: 0, z: -0.8,
      connections: ['authentication', 'database'],
      color: '#c44569',
      description: 'Server-side development'
    },
    {
      id: 'database',
      name: 'Database',
      icon: Database,
      x: 0.6, y: 0.6, z: -0.6,
      connections: ['backend', 'storage'],
      color: '#786fa6',
      description: 'Data storage and management'
    },
    {
      id: 'storage',
      name: 'Storage',
      icon: Database,
      x: -0.6, y: -0.6, z: 0.6,
      connections: ['database', 'cloud'],
      color: '#f8b500',
      description: 'Data persistence solutions'
    },
    {
      id: 'cloud',
      name: 'Cloud',
      icon: Cloud,
      x: 0, y: 0.9, z: 0.4,
      connections: ['storage', 'deployment'],
      color: '#74b9ff',
      description: 'Cloud computing services'
    },
    {
      id: 'deployment',
      name: 'Deploy',
      icon: Cloud,
      x: 0, y: -0.9, z: -0.4,
      connections: ['cloud', 'devops'],
      color: '#00b894',
      description: 'Application deployment'
    },
    {
      id: 'devops',
      name: 'DevOps',
      icon: Settings,
      x: 0.8, y: 0, z: 0.6,
      connections: ['deployment', 'testing'],
      color: '#fdcb6e',
      description: 'Development operations'
    },
    {
      id: 'testing',
      name: 'Testing',
      icon: Bug,
      x: -0.8, y: 0, z: -0.6,
      connections: ['devops', 'quality'],
      color: '#e17055',
      description: 'Quality assurance'
    },
    {
      id: 'quality',
      name: 'Quality',
      icon: CheckCircle,
      x: 0, y: 0, z: 1,
      connections: ['testing', 'standards'],
      color: '#00cec9',
      description: 'Code quality standards'
    },
    {
      id: 'standards',
      name: 'Standards',
      icon: BookOpen,
      x: 0.4, y: -0.4, z: 0.8,
      connections: ['quality', 'accessibility'],
      color: '#a29bfe',
      description: 'Web standards compliance'
    },
    {
      id: 'accessibility',
      name: 'Accessibility',
      icon: Accessibility,
      x: -0.4, y: 0.4, z: -0.8,
      connections: ['standards', 'inclusion'],
      color: '#fd79a8',
      description: 'Inclusive web design'
    },
    {
      id: 'inclusion',
      name: 'Inclusion',
      icon: Users,
      x: 0, y: 0, z: 0,
      connections: ['accessibility', 'community'],
      color: '#fdcb6e',
      description: 'Diverse user experience'
    },
    {
      id: 'community',
      name: 'Community',
      icon: Users,
      x: 0.9, y: 0.3, z: 0.3,
      connections: ['inclusion', 'collaboration'],
      color: '#fd79a8',
      description: 'Developer community'
    },
    {
      id: 'collaboration',
      name: 'Collaboration',
      icon: Users,
      x: -0.9, y: -0.3, z: -0.3,
      connections: ['community', 'tools'],
      color: '#74b9ff',
      description: 'Team collaboration'
    },
    {
      id: 'tools',
      name: 'Tools',
      icon: Wrench,
      x: 0.3, y: 0.9, z: -0.3,
      connections: ['collaboration', 'automation'],
      color: '#00b894',
      description: 'Development tools'
    },
    {
      id: 'automation',
      name: 'Automation',
      icon: Zap,
      x: -0.3, y: -0.9, z: 0.3,
      connections: ['tools', 'efficiency'],
      color: '#e17055',
      description: 'Automated workflows'
    },
    {
      id: 'efficiency',
      name: 'Efficiency',
      icon: Zap,
      x: 0, y: 0, z: 1,
      connections: ['automation', 'optimization'],
      color: '#00cec9',
      description: 'Performance optimization'
    },
    {
      id: 'optimization',
      name: 'Optimization',
      icon: Zap,
      x: 0.5, y: -0.5, z: 0.7,
      connections: ['efficiency', 'scalability'],
      color: '#a29bfe',
      description: 'Code and resource optimization'
    },
    {
      id: 'scalability',
      name: 'Scalability',
      icon: Expand,
      x: -0.5, y: 0.5, z: -0.7,
      connections: ['optimization', 'architecture'],
      color: '#fd79a8',
      description: 'System scalability'
    },
    {
      id: 'architecture',
      name: 'Architecture',
      icon: Building,
      x: 0.7, y: 0.7, z: 0,
      connections: ['scalability', 'patterns'],
      color: '#74b9ff',
      description: 'System design'
    },
    {
      id: 'patterns',
      name: 'Patterns',
      icon: Layers,
      x: -0.7, y: -0.7, z: 0,
      connections: ['architecture', 'best-practices'],
      color: '#00b894',
      description: 'Design patterns'
    },
    {
      id: 'best-practices',
      name: 'Best Practices',
      icon: Star,
      x: 0, y: 0, z: 1,
      connections: ['patterns', 'standards'],
      color: '#fdcb6e',
      description: 'Industry standards'
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawGlobe = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw globe background
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.3;
      
      // Globe gradient
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
      gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.05)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0.02)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw globe outline
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();
      
      // Draw latitude lines
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.lineWidth = 1;
      for (let i = -3; i <= 3; i++) {
        const y = centerY + (i * radius / 4);
        const xRadius = Math.sqrt(radius * radius - (i * radius / 4) * (i * radius / 4));
        ctx.beginPath();
        ctx.ellipse(centerX, y, xRadius, radius / 8, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Draw longitude lines
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI * 2) / 8 + rotation.y;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radius * Math.cos(angle), radius, angle, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Draw nodes
      techNodes.forEach(node => {
        const rotatedX = node.x * Math.cos(rotation.y) - node.z * Math.sin(rotation.y);
        const rotatedZ = node.x * Math.sin(rotation.y) + node.z * Math.cos(rotation.y);
        const rotatedY = node.y * Math.cos(rotation.x) - rotatedZ * Math.sin(rotation.x);
        const finalZ = node.y * Math.sin(rotation.x) + rotatedZ * Math.cos(rotation.x);
        
        const scale = (radius + finalZ) / radius;
        const screenX = centerX + rotatedX * radius * scale;
        const screenY = centerY + rotatedY * radius * scale;
        
        if (scale > 0) {
          // Node glow effect
          const glowGradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, 20);
          glowGradient.addColorStop(0, node.color + '40');
          glowGradient.addColorStop(1, 'transparent');
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(screenX, screenY, 20, 0, Math.PI * 2);
          ctx.fill();
          
          // Node circle
          ctx.fillStyle = node.color;
          ctx.beginPath();
          ctx.arc(screenX, screenY, 8, 0, Math.PI * 2);
          ctx.fill();
          
          // Node border
          ctx.strokeStyle = hoveredNode?.id === node.id ? '#ffffff' : 'rgba(255,255,255,0.5)';
          ctx.lineWidth = hoveredNode?.id === node.id ? 3 : 1;
          ctx.beginPath();
          ctx.arc(screenX, screenY, 8, 0, Math.PI * 2);
          ctx.stroke();
          
          // Node label
          if (scale > 0.5) {
            ctx.fillStyle = '#ffffff';
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(node.name, screenX, screenY + 25);
          }
        }
      });
      
      // Draw connections
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
      ctx.lineWidth = 1;
      techNodes.forEach(node => {
        node.connections.forEach(connectionId => {
          const targetNode = techNodes.find(n => n.id === connectionId);
          if (targetNode) {
            const rotatedX1 = node.x * Math.cos(rotation.y) - node.z * Math.sin(rotation.y);
            const rotatedZ1 = node.x * Math.sin(rotation.y) + node.z * Math.cos(rotation.y);
            const rotatedY1 = node.y * Math.cos(rotation.x) - rotatedZ1 * Math.sin(rotation.x);
            const finalZ1 = node.y * Math.sin(rotation.x) + rotatedZ1 * Math.cos(rotation.x);
            
            const rotatedX2 = targetNode.x * Math.cos(rotation.y) - targetNode.z * Math.sin(rotation.y);
            const rotatedZ2 = targetNode.x * Math.sin(rotation.y) + targetNode.z * Math.cos(rotation.y);
            const rotatedY2 = targetNode.y * Math.cos(rotation.x) - rotatedZ2 * Math.sin(rotation.x);
            const finalZ2 = targetNode.y * Math.sin(rotation.x) + rotatedZ2 * Math.cos(rotation.x);
            
            const scale1 = (radius + finalZ1) / radius;
            const scale2 = (radius + finalZ2) / radius;
            
            const screenX1 = centerX + rotatedX1 * radius * scale1;
            const screenY1 = centerY + rotatedY1 * radius * scale1;
            const screenX2 = centerX + rotatedX2 * radius * scale2;
            const screenY2 = centerY + rotatedY2 * radius * scale2;
            
            if (scale1 > 0 && scale2 > 0) {
              ctx.beginPath();
              ctx.moveTo(screenX1, screenY1);
              ctx.lineTo(screenX2, screenY2);
              ctx.stroke();
            }
          }
        });
      });
    };
    
    drawGlobe();
    
    const animate = () => {
      setRotation(prev => ({
        x: prev.x + 0.005,
        y: prev.y + 0.01
      }));
      requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      let closestNode: TechNode | null = null;
      let closestDistance = Infinity;
      
      techNodes.forEach(node => {
        const rotatedX = node.x * Math.cos(rotation.y) - node.z * Math.sin(rotation.y);
        const rotatedZ = node.x * Math.sin(rotation.y) + node.z * Math.cos(rotation.y);
        const rotatedY = node.y * Math.cos(rotation.x) - rotatedZ * Math.sin(rotation.x);
        const finalZ = node.y * Math.sin(rotation.x) + rotatedZ * Math.cos(rotation.x);
        
        const scale = (radius + finalZ) / radius;
        const screenX = canvas.width / 2 + rotatedX * radius * scale;
        const screenY = canvas.height / 2 + rotatedY * radius * scale;
        
        const distance = Math.sqrt((mouseX - screenX) ** 2 + (mouseY - screenY) ** 2);
        if (distance < 20 && distance < closestDistance) {
          closestDistance = distance;
          closestNode = node;
        }
      });
      
      setHoveredNode(closestNode);
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [rotation, hoveredNode]);
  
  return (
    <div className="tech-globe-container">
      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        className="tech-globe-canvas"
      />
      {hoveredNode && (
        <div className="tech-node-tooltip">
          <div className="tooltip-header">
            <div className="tooltip-icon" style={{ backgroundColor: hoveredNode.color }}>
              <hoveredNode.icon className="w-4 h-4" />
            </div>
            <h3 className="tooltip-title">{hoveredNode.name}</h3>
          </div>
          <p className="tooltip-description">{hoveredNode.description}</p>
          <div className="tooltip-connections">
            <span>Connected to:</span>
            <div className="connections-list">
              {hoveredNode.connections.map(connId => {
                const connNode = techNodes.find(n => n.id === connId);
                return connNode ? (
                  <span key={connId} className="connection-tag" style={{ backgroundColor: connNode.color }}>
                    {connNode.name}
                  </span>
                ) : null;
              })}
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .tech-globe-container {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 600px;
          background: radial-gradient(circle at center, rgba(59, 130, 246, 0.1), transparent);
          border-radius: 50%;
          overflow: hidden;
        }
        
        .tech-globe-canvas {
          cursor: grab;
          filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.3));
        }
        
        .tech-globe-canvas:active {
          cursor: grabbing;
        }
        
        .tech-node-tooltip {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(15, 23, 42, 0.95);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 12px;
          padding: 16px;
          min-width: 280px;
          backdrop-filter: blur(10px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          z-index: 10;
        }
        
        .tooltip-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }
        
        .tooltip-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        
        .tooltip-title {
          color: #ffffff;
          font-size: 18px;
          font-weight: 600;
          margin: 0;
        }
        
        .tooltip-description {
          color: #cbd5e1;
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 12px;
        }
        
        .tooltip-connections {
          border-top: 1px solid rgba(59, 130, 246, 0.2);
          padding-top: 12px;
        }
        
        .tooltip-connections span {
          color: #94a3b8;
          font-size: 12px;
          font-weight: 500;
          margin-bottom: 8px;
          display: block;
        }
        
        .connections-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        
        .connection-tag {
          color: white;
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 12px;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default TechGlobe;