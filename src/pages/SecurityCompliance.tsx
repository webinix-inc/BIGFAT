import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, Lock, Award, Eye, CheckCircle, AlertTriangle } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';

const SecurityCompliance = () => {
  return (
    <>
      <Helmet>
        <title>Security & Compliance - BIGFAT AI Labs</title>
        <meta
          name="description"
          content="Enterprise-grade security, SOC 2 compliance, data protection, and responsible AI practices at BIGFAT AI Labs."
        />
        <meta name="keywords" content="AI security, SOC 2, GDPR compliance, data privacy, enterprise AI security" />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ParticleBackground />
        <Navbar />
        
        <main className="py-20">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Shield className="w-6 h-6 text-primary" />
                  <span className="text-primary font-semibold">Enterprise Security</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                  Security & <span className="gradient-text">Compliance</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Bank-level security and comprehensive compliance frameworks to protect your data and ensure trustworthy AI operations
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8 mb-16">
                {/* Security Standards */}
                <div className="bg-card border rounded-2xl p-8 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mb-6">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Compliance Standards</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>SOC 2 Type II</strong>
                        <p className="text-sm text-muted-foreground">Annual third-party audits</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>GDPR Compliant</strong>
                        <p className="text-sm text-muted-foreground">EU data protection standards</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>ISO 27001</strong>
                        <p className="text-sm text-muted-foreground">Information security management</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>HIPAA Ready</strong>
                        <p className="text-sm text-muted-foreground">Healthcare data protection</p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Data Protection */}
                <div className="bg-card border rounded-2xl p-8 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-6">
                    <Lock className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Data Protection</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>End-to-End Encryption</strong>
                        <p className="text-sm text-muted-foreground">AES-256 encryption standards</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Zero-Knowledge Architecture</strong>
                        <p className="text-sm text-muted-foreground">Your data stays private</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Role-Based Access</strong>
                        <p className="text-sm text-muted-foreground">Granular permission controls</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Regular Security Audits</strong>
                        <p className="text-sm text-muted-foreground">Continuous monitoring</p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Monitoring */}
                <div className="bg-card border rounded-2xl p-8 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 flex items-center justify-center mb-6">
                    <Eye className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">24/7 Monitoring</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Real-time Threat Detection</strong>
                        <p className="text-sm text-muted-foreground">AI-powered security monitoring</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Incident Response</strong>
                        <p className="text-sm text-muted-foreground">15-minute response time</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Penetration Testing</strong>
                        <p className="text-sm text-muted-foreground">Quarterly security assessments</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Compliance Reporting</strong>
                        <p className="text-sm text-muted-foreground">Detailed audit logs</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Security Practices */}
              <div className="bg-card border rounded-2xl p-8 shadow-sm mb-16">
                <h2 className="text-2xl font-bold mb-8 text-center">Our Security Practices</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Proactive Security
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Multi-layered defense architecture</li>
                      <li>• Advanced threat intelligence</li>
                      <li>• Regular vulnerability scanning</li>
                      <li>• Security by design principles</li>
                      <li>• Employee security training</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-primary" />
                      Data Governance
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Data minimization practices</li>
                      <li>• Privacy by design approach</li>
                      <li>• Transparent data policies</li>
                      <li>• User consent management</li>
                      <li>• Data retention controls</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Trust Center */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4">Trust & Transparency</h2>
                  <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                    We believe in transparency about our security practices and are committed to maintaining the highest standards of data protection and AI safety.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">Independent Audits</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">Bug Bounty Program</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">Public Reports</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SecurityCompliance;
