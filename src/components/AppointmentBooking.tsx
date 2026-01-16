import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const AppointmentBooking = () => {
  return (
    <div className="text-center">
      <Calendar className="w-16 h-16 mx-auto mb-4 text-primary" />
      <h3 className="text-2xl font-bold mb-3">Book Your Appointment</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Schedule a consultation with our AI experts to discuss your project requirements,
        see live demos, and explore how we can transform your business with cutting-edge AI solutions.
      </p>
      
      <div className="space-y-2 max-w-sm mx-auto">
        <a 
          href="https://cal.com/bigfat-ai-tasbkl" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          <Button variant="hero" size="lg" className="w-full">
            Schedule Appointment
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </a>
        
        <div className="text-sm text-muted-foreground mt-3">
          <p>Available for:</p>
          <ul className="mt-1 space-y-1">
            <li>• AI Consultations</li>
            <li>• Product Demos</li>
            <li>• Project Discussions</li>
            <li>• Technical Reviews</li>
          </ul>
        </div>

        {/* What to Expect */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mt-4">
          <h3 className="text-lg font-semibold mb-3">What to Expect</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
              <span>Personalized consultation based on your needs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
              <span>Live demo of our AI solutions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
              <span>Technical discussion and roadmap planning</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
              <span>Pricing and proposal discussion</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
